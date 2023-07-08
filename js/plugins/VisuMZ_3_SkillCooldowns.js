//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x404d=['onWarmupReady','zOkAN','updateWarmups','aiMbq','guardSkillId','_subject','_updatedSkillCooldowns','onWarmupReadyJS','replace','wivel','BsIHU','yjqob','trim','paySkillCooldown','ARRAYEVAL','onBattleEnd','applyChangeGlobalCooldownEffects','clearCooldowns','ceil','RATE','warmup','Game_Action_applyItemUserEffect','getSkillTypes','clamp','paySkillCost','SkillCooldowns','members','applyCDWUmodifiers','<STYPE\x20%1\x20%2\x20%3:[\x20]%4>','drawSkillWarmup','<GLOBAL\x20%1\x20%2:[\x20]%3>','tgzCJ','inBattle','applyStypeCooldowns','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ARRAYSTRUCT','cooldownJS','IvDUY','FontColor','hGuDN','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','actor','drawTextEx','pXQGg','UnAgb','registerCommand','kLNRp','nsEEl','areSkillCooldownsReady','OfLJb','name','onTurnEnd','getSkillIdWithName','call','\x5cC[%1]','isBypassWarmups','initMembers','kEzZC','processTurn','Stype_%1_%2_%3','kqdud','cmCoD','bnTfP','ARRAYNUM','item','applyChangeCooldownEffects','FMHcz','QXvWR','Warmup','applyChangeStypeCooldownEffects','applyClearCooldownEffects','KMmCj','match','vJfmq','Skill_%1_%2_%3','textSizeEx','notetag3','(\x5cd+)([%％])','FLAT','applyItemUserEffect','rawWarmup','qVhSj','ARRAYFUNC','exit','COOLDOWN','shzbM','filter','traitObjects','(\x5cd+\x5c.?\x5cd+)','applyChangeStypeWarmupEffects','areSkillWarmupsReady','Step1','WARMUP','AEFtQ','HWEqm','eoUXM','Game_BattlerBase_meetsSkillConditions','weLPz','Ncsqv','JXCSX','tLmlu','TGsCc','updateCooldowns','prepareSkillWarmups','toUpperCase','TNlre','Cooldown','EnemySkillCooldown','Preemptive','XnnXq','onCooldownReady','notetag2','Settings','onWarmupUpdateJS','prepareUpdateSkillCooldowns','clearWarmups','STRUCT','_skillCooldowns','BMHdG','XBcmN','subject','FSFlj','Show','Game_BattlerBase_paySkillCost','HhTWV','applySkillCooldownEffects','AXPzv','includes','ZxoXS','\x5cI[%1]','applyCDWUnotetagsFlat','process_VisuMZ_SkillsStatesCore_Skill_JS','EnemyGlobalCooldown','DmLyu','OperateValues','TOzRO','kUiiT','drawSkillCooldown','PLUS','qBQGI','ActorStypeCooldown','_instantCast','Msdhv','TextFmt','ARRAYJSON','applyGlobalCooldowns','Step3','skillTypes','cooldown','warmupJS','FontSize','skills','drawSkillCost','Scene_Boot_process_VisuMZ_SkillsStatesCore_Skill_JS','map','nelJJ','Window_Base_drawSkillCost','prototype','initSkillCooldowns','TUviD','WAIT','notetag1','onCooldownUpdateJS','ZzNDb','SKFQp','XuTNv','resetFontSettings','fanNf','setWarmup','applyChangeWarmupEffects','STR','PaOUa','YnSWE','vjxHX','vBmZl','YiCEc','applyWarmup','applyCDWUnotetagsRate','mXOyJ','IvqVh','max','\x5cFS[%1]','Icon','ConvertParams','Game_BattlerBase_initMembers','LCUoy','vgNPi','jVQip','meetsSkillConditions','attackSkillId','kyKRE','<SKILL\x20%1\x20%2\x20%3:[\x20]%4>','addWarmup','Step4','GfBpt','onCooldownUpdate','zooIB','Game_Battler_onTurnEnd','BtXXX','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ActorGlobalCooldown','JSON','BattleManager_processTurn','addCooldown','_skillWarmups','zKcXJ','jGLbl','EVAL','isBypassCooldowns','OnReadyJS','description','DUTds','getStypeIdWithName','eSjzd','Game_Battler_onBattleEnd','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','vZoBo','TTZmo','parse','applyCooldown','pOvNG','Global_%1_%2','PXtFS','version','VUvwd','VisuMZ_1_MessageCore','yZlAU','YBppt','UHkfM','onCooldownReadyJS','\x5cHexColor<%1>','oqtIJ','Game_Battler_onBattleStart','note','width','setCooldown','MaxTurns','vfQIu','NUM','format','TfxjJ','OnUpdateJS','KVAzp','RegExp','Nvart','Step2','notetag4','VKsrj'];(function(_0x414d84,_0x404d0b){const _0x573020=function(_0x760820){while(--_0x760820){_0x414d84['push'](_0x414d84['shift']());}};_0x573020(++_0x404d0b);}(_0x404d,0x17b));const _0x5730=function(_0x414d84,_0x404d0b){_0x414d84=_0x414d84-0x0;let _0x573020=_0x404d[_0x414d84];return _0x573020;};const _0x489946=_0x5730;var label=_0x489946('0x8e'),tier=tier||0x0,dependencies=['VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x489946('0xcb')](function(_0x120708){const _0x1e81d7=_0x489946;return _0x120708['status']&&_0x120708[_0x1e81d7('0x4f')][_0x1e81d7('0xf4')]('['+label+']');})[0x0];VisuMZ[label][_0x489946('0xe5')]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x34138f,_0x4a7d79){const _0x51e6a8=_0x489946;for(const _0x46739f in _0x4a7d79){if(_0x46739f[_0x51e6a8('0xbd')](/(.*):(.*)/i)){if(_0x51e6a8('0x52')!==_0x51e6a8('0xb')){const _0x4bec28=String(RegExp['$1']),_0x3cde16=String(RegExp['$2'])[_0x51e6a8('0xdd')]()['trim']();let _0x4bdff2,_0x470536,_0x353ab1;switch(_0x3cde16){case _0x51e6a8('0x6b'):_0x4bdff2=_0x4a7d79[_0x46739f]!==''?Number(_0x4a7d79[_0x46739f]):0x0;break;case _0x51e6a8('0xb4'):_0x470536=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0xfb4529=>Number(_0xfb4529));break;case _0x51e6a8('0x4c'):_0x4bdff2=_0x4a7d79[_0x46739f]!==''?eval(_0x4a7d79[_0x46739f]):null;break;case _0x51e6a8('0x83'):_0x470536=_0x4a7d79[_0x46739f]!==''?JSON['parse'](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0x3fbedf=>eval(_0x3fbedf));break;case _0x51e6a8('0x46'):_0x4bdff2=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):'';break;case _0x51e6a8('0xd'):_0x470536=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0x59c007=>JSON[_0x51e6a8('0x57')](_0x59c007));break;case'FUNC':_0x4bdff2=_0x4a7d79[_0x46739f]!==''?new Function(JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f])):new Function('return\x200');break;case _0x51e6a8('0xc7'):_0x470536=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0x278c5c=>new Function(JSON['parse'](_0x278c5c)));break;case _0x51e6a8('0x27'):_0x4bdff2=_0x4a7d79[_0x46739f]!==''?String(_0x4a7d79[_0x46739f]):'';break;case'ARRAYSTR':_0x470536=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0x5eddae=>String(_0x5eddae));break;case _0x51e6a8('0xe9'):_0x353ab1=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):{},_0x4bdff2=VisuMZ[_0x51e6a8('0x34')]({},_0x353ab1);break;case _0x51e6a8('0x98'):_0x470536=_0x4a7d79[_0x46739f]!==''?JSON[_0x51e6a8('0x57')](_0x4a7d79[_0x46739f]):[],_0x4bdff2=_0x470536[_0x51e6a8('0x17')](_0x3f6e60=>VisuMZ[_0x51e6a8('0x34')]({},JSON['parse'](_0x3f6e60)));break;default:continue;}_0x34138f[_0x4bec28]=_0x4bdff2;}else{function _0x54a2ed(){const _0x41de4f=_0x51e6a8;_0x3f1ed1=_0x47a09a[_0x41de4f('0xa9')](_0x5629b4['$1']),_0x240fb1=_0x3f5c43(_0x194360['$2']);}}}}return _0x34138f;},(_0x2ce5ee=>{const _0x27cf71=_0x489946,_0x4c55de=_0x2ce5ee['name'];for(const _0x56314e of dependencies){if(_0x27cf71('0x2b')!=='vBmZl'){function _0x4990af(){const _0xe5fc87=_0x27cf71;if(!_0x58ebdc[_0xe5fc87('0x8e')]['Game_BattlerBase_meetsSkillConditions'][_0xe5fc87('0xaa')](this,_0x39a24c))return![];if(!this[_0xe5fc87('0xcf')](_0x23cd09))return![];if(!this[_0xe5fc87('0xa5')](_0x5ad140))return![];return!![];}}else{if(!Imported[_0x56314e]){if('tgzCJ'===_0x27cf71('0x94')){alert(_0x27cf71('0x97')['format'](_0x4c55de,_0x56314e)),SceneManager[_0x27cf71('0xc8')]();break;}else{function _0x2dd76e(){const _0x27ffdb=_0x27cf71,_0x4e510f=_0x27ffdb('0xb0')[_0x27ffdb('0x6c')](_0x19a9bd,_0x219f29,_0x1dc192);let _0x59aaa5=_0x6bfde7[_0x27ffdb('0x10')][_0x5669aa(_0xccbce1)][_0x27ffdb('0xdd')]()[_0x27ffdb('0x81')]();_0x59aaa5=_0x59aaa5['replace'](/\x1I\[(\d+)\]/gi,''),_0x59aaa5=_0x59aaa5[_0x27ffdb('0x7d')](/\\I\[(\d+)\]/gi,''),_0x3eacfe[_0x4e510f]=_0x149f92[_0x4e510f]||{};const _0x25a396=_0x27ffdb('0x91');_0x19ee90[_0x4e510f][_0x27ffdb('0x1e')]=_0x5d55d6[_0x4e510f][_0x27ffdb('0x1e')]||new _0x47495b(_0x25a396[_0x27ffdb('0x6c')](_0x2c263d,_0x5778ef,_0x5ca7a9,_0xd72c97),'i'),_0x378138[_0x4e510f]['notetag2']=_0x27dcfa[_0x4e510f]['notetag2']||new _0x4e41a7(_0x25a396[_0x27ffdb('0x6c')](_0x59aaa5,_0x44ae88,_0x146184,_0x4b94eb),'i'),_0x1dcb1d[_0x4e510f]['notetag3']=_0xd68d76[_0x4e510f]['notetag3']||new _0x1e756a(_0x25a396[_0x27ffdb('0x6c')](_0x32ca8f,_0x4990ed,_0x443e53,_0x326172),'i'),_0x405f06[_0x4e510f][_0x27ffdb('0x73')]=_0x2285cc[_0x4e510f][_0x27ffdb('0x73')]||new _0x55ec6b(_0x25a396[_0x27ffdb('0x6c')](_0x59aaa5,_0x5efef6,_0x2e398e,_0xe2cb87),'i');}}}}}const _0x51a8a5=_0x2ce5ee[_0x27cf71('0x4f')];if(_0x51a8a5[_0x27cf71('0xbd')](/\[Version[ ](.*?)\]/i)){if(_0x27cf71('0xd9')===_0x27cf71('0xae')){function _0x3436f4(){this['applyCooldown'](_0xdd84d8['id'],_0x764229);}}else{const _0x46e8fc=Number(RegExp['$1']);_0x46e8fc!==VisuMZ[label][_0x27cf71('0x5c')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x27cf71('0x6c')](_0x4c55de,_0x46e8fc)),SceneManager[_0x27cf71('0xc8')]());}}if(_0x51a8a5[_0x27cf71('0xbd')](/\[Tier[ ](\d+)\]/i)){const _0x1f5ac2=Number(RegExp['$1']);if(_0x1f5ac2<tier)alert(_0x27cf71('0x44')['format'](_0x4c55de,_0x1f5ac2,tier)),SceneManager['exit']();else{if('CTgvK'===_0x27cf71('0x60')){function _0x532918(){const _0x2ab5d4=_0x27cf71,_0x371ea6=_0x3e069a[_0x35c0a0];if(!_0x371ea6)return _0x3dd499;const _0x3d5f43=this[_0x2ab5d4('0xf7')](_0x371ea6,_0x2b3088,_0x2ab5d4('0x7')),_0x427bda=this[_0x2ab5d4('0x2e')](_0x371ea6,_0x494108,_0x2ab5d4('0x88')),_0x35846a=this[_0x2ab5d4('0xf7')](_0x371ea6,_0x479b2e,_0x2ab5d4('0xc3'));return _0x5aec24[_0x2ab5d4('0x87')]((_0x1cf8ab+_0x3d5f43)*_0x427bda+_0x35846a);}}else tier=Math[_0x27cf71('0x31')](_0x1f5ac2,tier);}}VisuMZ[_0x27cf71('0x34')](VisuMZ[label]['Settings'],_0x2ce5ee['parameters']);})(pluginData),VisuMZ['OperateValues']=function(_0x3f0182,_0x317f22,_0x7e6b51){switch(_0x7e6b51){case'=':return _0x317f22;break;case'+':return _0x3f0182+_0x317f22;break;case'-':return _0x3f0182-_0x317f22;break;case'*':return _0x3f0182*_0x317f22;break;case'/':return _0x3f0182/_0x317f22;break;case'%':return _0x3f0182%_0x317f22;break;}return _0x3f0182;},PluginManager[_0x489946('0xa2')](pluginData[_0x489946('0xa7')],'ActorSkillCooldown',_0x14e50d=>{const _0x386f32=_0x489946;if(!$gameParty[_0x386f32('0x95')]())return;VisuMZ[_0x386f32('0x34')](_0x14e50d,_0x14e50d);const _0x510600=_0x14e50d[_0x386f32('0xd0')],_0x59eb0b=_0x14e50d[_0x386f32('0x72')],_0x4f75e1=_0x14e50d[_0x386f32('0xf')],_0x1fd07b=_0x14e50d[_0x386f32('0x3e')];for(const _0xf1bf5c of _0x510600){const _0x2b70d2=$gameActors[_0x386f32('0x9e')](_0xf1bf5c);if(!_0x2b70d2)continue;for(const _0x45ad14 of _0x59eb0b){let _0x3068c9=_0x2b70d2[_0x386f32('0x11')](_0x45ad14);_0x3068c9=VisuMZ[_0x386f32('0x3')](_0x3068c9,_0x1fd07b,_0x4f75e1),_0x2b70d2[_0x386f32('0x68')](_0x45ad14,_0x3068c9);}}}),PluginManager[_0x489946('0xa2')](pluginData[_0x489946('0xa7')],_0x489946('0x9'),_0x53f4fb=>{const _0x4a9bc1=_0x489946;if(!$gameParty[_0x4a9bc1('0x95')]())return;VisuMZ['ConvertParams'](_0x53f4fb,_0x53f4fb);const _0x3082b4=_0x53f4fb['Step1'],_0x7cadc=_0x53f4fb[_0x4a9bc1('0x72')],_0x14ce9f=_0x53f4fb[_0x4a9bc1('0xf')],_0x473cf3=_0x53f4fb[_0x4a9bc1('0x3e')];for(const _0xc24cab of _0x3082b4){const _0x1d6030=$gameActors[_0x4a9bc1('0x9e')](_0xc24cab);if(!_0x1d6030)continue;for(const _0x16e704 of _0x7cadc){if(_0x4a9bc1('0x55')===_0x4a9bc1('0x55'))for(const _0x957027 of _0x1d6030[_0x4a9bc1('0x14')]()){if(!_0x957027)continue;if(!DataManager[_0x4a9bc1('0x8b')](_0x957027)['includes'](_0x16e704))continue;const _0x30307c=_0x957027['id'];let _0x9d2a91=_0x1d6030[_0x4a9bc1('0x11')](_0x30307c);_0x9d2a91=VisuMZ[_0x4a9bc1('0x3')](_0x9d2a91,_0x473cf3,_0x14ce9f),_0x1d6030[_0x4a9bc1('0x68')](_0x30307c,_0x9d2a91);}else{function _0x295341(){const _0x1eac03=_0x4a9bc1,_0x5984da=_0x561ce8(_0x1800b6['$1']),_0x2180cc=_0x1eac03('0x54')[_0x1eac03('0x6c')](_0x5984da);_0x4c7eba[_0x1eac03('0x8e')][_0x1eac03('0x99')][_0x20bfa2['id']]=new _0x56a11e(_0x2180cc);}}}}}),PluginManager[_0x489946('0xa2')](pluginData[_0x489946('0xa7')],_0x489946('0x45'),_0x46d02e=>{const _0x3d287f=_0x489946;if(!$gameParty[_0x3d287f('0x95')]())return;VisuMZ[_0x3d287f('0x34')](_0x46d02e,_0x46d02e);const _0xd1e878=_0x46d02e[_0x3d287f('0xd0')],_0x3292e4=_0x46d02e[_0x3d287f('0x72')],_0x2d8936=_0x46d02e['Step3'];for(const _0x401423 of _0xd1e878){const _0x3472fd=$gameActors['actor'](_0x401423);if(!_0x3472fd)continue;for(const _0x3b4ed8 of _0x3472fd[_0x3d287f('0x14')]()){if(!_0x3b4ed8)continue;const _0x3a4895=_0x3b4ed8['id'];let _0x2cb94c=_0x3472fd['cooldown'](_0x3a4895);_0x2cb94c=VisuMZ[_0x3d287f('0x3')](_0x2cb94c,_0x2d8936,_0x3292e4),_0x3472fd[_0x3d287f('0x68')](_0x3a4895,_0x2cb94c);}}}),PluginManager['registerCommand'](pluginData['name'],_0x489946('0xe0'),_0x1a99de=>{const _0x51962d=_0x489946;if(!$gameParty['inBattle']())return;VisuMZ[_0x51962d('0x34')](_0x1a99de,_0x1a99de);const _0x1cb833=_0x1a99de['Step1'],_0x4c8cc8=_0x1a99de[_0x51962d('0x72')],_0x4093ec=_0x1a99de[_0x51962d('0xf')],_0x1d7005=_0x1a99de[_0x51962d('0x3e')];for(const _0x1031d9 of _0x1cb833){const _0x3096f7=$gameTroop[_0x51962d('0x8f')]()[_0x1031d9];if(!_0x3096f7)continue;for(const _0x24629b of _0x4c8cc8){if(_0x51962d('0x76')==='zOkAN'){let _0x21a189=_0x3096f7[_0x51962d('0x11')](_0x24629b);_0x21a189=VisuMZ['OperateValues'](_0x21a189,_0x1d7005,_0x4093ec),_0x3096f7[_0x51962d('0x68')](_0x24629b,_0x21a189);}else{function _0x27488e(){_0x4b0405=_0x413232(_0x33e19d['$1']),_0x37ba05=_0x5c91d4(_0x3ee020['$2']);}}}}}),PluginManager[_0x489946('0xa2')](pluginData[_0x489946('0xa7')],'EnemyStypeCooldown',_0xd50df4=>{const _0x5d1865=_0x489946;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0xd50df4,_0xd50df4);const _0x516a7e=_0xd50df4['Step1'],_0x4ef73e=_0xd50df4[_0x5d1865('0x72')],_0x33cd7f=_0xd50df4[_0x5d1865('0xf')],_0x7b759f=_0xd50df4[_0x5d1865('0x3e')];for(const _0x1a7a23 of _0x516a7e){const _0x2843cb=$gameTroop[_0x5d1865('0x8f')]()[_0x1a7a23];if(!_0x2843cb)continue;for(const _0x493a12 of _0x4ef73e){if(_0x5d1865('0xee')==='ulduM'){function _0x53ab69(){const _0x535a4e=_0x5d1865,_0x394eb0=_0x2fe428(_0x37a172['$1']);for(const _0x2c87e2 of this[_0x535a4e('0xed')]()[_0x535a4e('0x14')]()){_0x2c87e2&&this[_0x535a4e('0xed')]()[_0x535a4e('0x48')](_0x2c87e2['id'],_0x394eb0);}}}else for(const _0x4b8939 of _0x2843cb[_0x5d1865('0x14')]()){if(!_0x4b8939)continue;if(!DataManager[_0x5d1865('0x8b')](_0x4b8939)[_0x5d1865('0xf4')](_0x493a12))continue;const _0x19fe9c=_0x4b8939['id'];let _0x3c440c=_0x2843cb['cooldown'](_0x19fe9c);_0x3c440c=VisuMZ['OperateValues'](_0x3c440c,_0x7b759f,_0x33cd7f),_0x2843cb['setCooldown'](_0x19fe9c,_0x3c440c);}}}}),PluginManager['registerCommand'](pluginData[_0x489946('0xa7')],_0x489946('0x1'),_0x1ed051=>{const _0x3ec774=_0x489946;if(!$gameParty[_0x3ec774('0x95')]())return;VisuMZ['ConvertParams'](_0x1ed051,_0x1ed051);const _0x557f6e=_0x1ed051[_0x3ec774('0xd0')],_0x5abbcc=_0x1ed051[_0x3ec774('0x72')],_0x4b9d12=_0x1ed051[_0x3ec774('0xf')];for(const _0x22204c of _0x557f6e){const _0x5053aa=$gameTroop['members']()[_0x22204c];if(!_0x5053aa)continue;for(const _0x2327ad of _0x5053aa['skills']()){if(!_0x2327ad)continue;const _0x52024a=_0x2327ad['id'];let _0xf47a04=_0x5053aa[_0x3ec774('0x11')](_0x52024a);_0xf47a04=VisuMZ[_0x3ec774('0x3')](_0xf47a04,_0x4b9d12,_0x5abbcc),_0x5053aa['setCooldown'](_0x52024a,_0xf47a04);}}}),VisuMZ[_0x489946('0x8e')][_0x489946('0x99')]={},VisuMZ[_0x489946('0x8e')]['warmupJS']={},VisuMZ['SkillCooldowns'][_0x489946('0x1f')]={},VisuMZ[_0x489946('0x8e')][_0x489946('0xe6')]={},VisuMZ[_0x489946('0x8e')][_0x489946('0x62')]={},VisuMZ['SkillCooldowns'][_0x489946('0x7c')]={},VisuMZ[_0x489946('0x8e')][_0x489946('0x16')]=Scene_Boot[_0x489946('0x1a')][_0x489946('0x0')],Scene_Boot[_0x489946('0x1a')][_0x489946('0x0')]=function(_0x4bb73c){const _0x4fe025=_0x489946;VisuMZ['SkillCooldowns'][_0x4fe025('0x16')][_0x4fe025('0xaa')](this,_0x4bb73c);const _0x508cbf=_0x4bb73c[_0x4fe025('0x66')],_0x2b5eb4='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20',_0x116124='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x508cbf['match'](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){if('GDrXx'==='GDrXx'){const _0x58a693=String(RegExp['$1']),_0x224103=_0x4fe025('0x54')[_0x4fe025('0x6c')](_0x58a693);VisuMZ[_0x4fe025('0x8e')]['cooldownJS'][_0x4bb73c['id']]=new Function(_0x224103);}else{function _0x5cbdd9(){const _0x31b1da=_0x4fe025;if(_0x17b113){const _0x201abb=_0x2d8c1f[_0x31b1da('0x8b')](_0x2a75f6);_0x201abb['includes'](_0x516ffa)&&_0xf3317[_0x31b1da('0x48')](_0x4779b3['id'],_0x4fd698);}}}}if(_0x508cbf['match'](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){if('ystKO'===_0x4fe025('0x20')){function _0x3d02ab(){const _0x486c0e=_0x4fe025,_0xa64b48=_0xeea9af[_0x486c0e('0x8e')]['Settings']['Warmup'][_0x486c0e('0xe1')]||0x0;this[_0x486c0e('0x77')](_0xa64b48);}}else{const _0x3d7005=String(RegExp['$1']),_0x359660=_0x4fe025('0x9d')[_0x4fe025('0x6c')](_0x3d7005);VisuMZ['SkillCooldowns'][_0x4fe025('0x12')][_0x4bb73c['id']]=new Function(_0x359660);}}if(_0x508cbf[_0x4fe025('0xbd')](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){if('QXvWR'!==_0x4fe025('0xb8')){function _0x4831c0(){const _0x287afe=_0x4fe025;_0x59b9ea=_0x12b1f3[_0x287afe('0xa9')](_0x4ed8d9['$1']),_0x344d78=_0x10af7f(_0x225a8c['$2']);}}else{const _0x441c13=String(RegExp['$1']),_0x3dfa15=_0x2b5eb4[_0x4fe025('0x6c')](_0x441c13);VisuMZ['SkillCooldowns'][_0x4fe025('0x1f')][_0x4bb73c['id']]=new Function(_0x3dfa15);}}if(_0x508cbf[_0x4fe025('0xbd')](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){if('PaOUa'!==_0x4fe025('0x28')){function _0x458116(){const _0x23931d=_0x4fe025;if(this[_0x23931d('0x7a')])this[_0x23931d('0x7a')][_0x23931d('0xe7')]();_0x3bc90d[_0x23931d('0x8e')][_0x23931d('0x47')][_0x23931d('0xaa')](this);}}else{const _0xb4ba8f=String(RegExp['$1']),_0x2cd430=_0x116124[_0x4fe025('0x6c')](_0xb4ba8f);VisuMZ[_0x4fe025('0x8e')][_0x4fe025('0xe6')][_0x4bb73c['id']]=new Function(_0x2cd430);}}if(_0x508cbf[_0x4fe025('0xbd')](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){if(_0x4fe025('0x2f')!==_0x4fe025('0xa0')){const _0x1bf2ce=String(RegExp['$1']),_0x1f29c5=_0x2b5eb4[_0x4fe025('0x6c')](_0x1bf2ce);VisuMZ['SkillCooldowns'][_0x4fe025('0x62')][_0x4bb73c['id']]=new Function(_0x1f29c5);}else{function _0x2f6038(){_0x24715b=_0x1fb2c9(_0x785bea['$1']),_0x124d0f=_0x2accd0(_0x37689d['$2']);}}}if(_0x508cbf[_0x4fe025('0xbd')](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){if(_0x4fe025('0x71')===_0x4fe025('0x6f')){function _0x2addfa(){var _0x377308=_0x5f0040(_0x23e1d6['$1'])/0x64;_0x68ce66*=_0x377308;}}else{const _0xcda63e=String(RegExp['$1']),_0x2e125d=_0x116124[_0x4fe025('0x6c')](_0xcda63e);VisuMZ[_0x4fe025('0x8e')][_0x4fe025('0x7c')][_0x4bb73c['id']]=new Function(_0x2e125d);}}},VisuMZ['SkillCooldowns'][_0x489946('0x47')]=BattleManager[_0x489946('0xaf')],BattleManager[_0x489946('0xaf')]=function(){const _0x2742cd=_0x489946;if(this[_0x2742cd('0x7a')])this[_0x2742cd('0x7a')][_0x2742cd('0xe7')]();VisuMZ[_0x2742cd('0x8e')][_0x2742cd('0x47')][_0x2742cd('0xaa')](this);},VisuMZ[_0x489946('0x8e')]['Game_Action_applyItemUserEffect']=Game_Action[_0x489946('0x1a')][_0x489946('0xc4')],Game_Action[_0x489946('0x1a')][_0x489946('0xc4')]=function(_0x4cc228){const _0x586928=_0x489946;VisuMZ['SkillCooldowns'][_0x586928('0x8a')][_0x586928('0xaa')](this,_0x4cc228),this['applySkillCooldownEffects'](_0x4cc228);},Game_Action[_0x489946('0x1a')][_0x489946('0xf2')]=function(_0x2e3b1b){const _0x1ba81d=_0x489946;this['applyClearCooldownEffects'](_0x2e3b1b),this['applyChangeCooldownEffects'](_0x2e3b1b),this[_0x1ba81d('0xba')](_0x2e3b1b),this[_0x1ba81d('0x85')](_0x2e3b1b),this[_0x1ba81d('0x26')](_0x2e3b1b),this[_0x1ba81d('0xce')](_0x2e3b1b),this['applyChangeGlobalWarmupEffects'](_0x2e3b1b);},Game_Action['prototype'][_0x489946('0xbb')]=function(_0x283f9d){const _0x2d0f06=_0x489946,_0x96ebca=this['item']()[_0x2d0f06('0x66')];if(_0x96ebca[_0x2d0f06('0xbd')](/<CLEAR USER COOLDOWNS>/i)){if(_0x2d0f06('0xda')!==_0x2d0f06('0xda')){function _0x4c94d5(){const _0x385b66=_0x2d0f06;if(!_0x138dcf['inBattle']())return;const _0x20c055=_0x2dfb44[_0x385b66('0x8e')][_0x385b66('0xe5')][_0x385b66('0xb9')];if(_0x20c055[_0x385b66('0x6e')])_0x20c055['OnUpdateJS'][_0x385b66('0xaa')](this,_0xec05cc);_0x19658b[_0x385b66('0x8e')][_0x385b66('0xe6')][_0x10a48f]&&_0x202f7f[_0x385b66('0x8e')][_0x385b66('0xe6')][_0x527452][_0x385b66('0xaa')](this,_0x4b15ad);}}else this[_0x2d0f06('0xed')]()[_0x2d0f06('0x86')]();}_0x96ebca[_0x2d0f06('0xbd')](/<CLEAR TARGET COOLDOWNS>/i)&&_0x283f9d['clearCooldowns']();_0x96ebca[_0x2d0f06('0xbd')](/<CLEAR USER WARMUPS>/i)&&this[_0x2d0f06('0xed')]()['clearWarmups']();if(_0x96ebca[_0x2d0f06('0xbd')](/<CLEAR TARGET WARMUPS>/i)){if(_0x2d0f06('0x64')!==_0x2d0f06('0x64')){function _0x7364cb(){var _0x36b625=_0x5610a4(_0x3fc0f0['$1']);_0x4a7f45*=_0x36b625;}}else _0x283f9d[_0x2d0f06('0xe8')]();}},Game_Action[_0x489946('0x1a')]['applyChangeCooldownEffects']=function(_0x57e789){const _0x439449=_0x489946,_0x46f2fa=this[_0x439449('0xb5')]()[_0x439449('0x66')],_0x3e10f5=_0x46f2fa[_0x439449('0xbd')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x3e10f5)for(const _0x39c4dc of _0x3e10f5){let _0x586f11=0x0,_0x5c2b09=0x0;if(_0x39c4dc['match'](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x586f11=Number(RegExp['$1']),_0x5c2b09=Number(RegExp['$2']);else _0x39c4dc[_0x439449('0xbd')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x586f11=DataManager[_0x439449('0xa9')](RegExp['$1']),_0x5c2b09=Number(RegExp['$2']));this[_0x439449('0xed')]()[_0x439449('0x48')](_0x586f11,_0x5c2b09);}const _0x187c88=_0x46f2fa['match'](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x187c88)for(const _0x30ccf7 of _0x187c88){let _0x1773de=0x0,_0x53466e=0x0;if(_0x30ccf7[_0x439449('0xbd')](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x1773de=Number(RegExp['$1']),_0x53466e=Number(RegExp['$2']);else _0x30ccf7[_0x439449('0xbd')](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x1773de=DataManager[_0x439449('0xa9')](RegExp['$1']),_0x53466e=Number(RegExp['$2']));_0x57e789['addCooldown'](_0x1773de,_0x53466e);}},Game_Action[_0x489946('0x1a')][_0x489946('0xba')]=function(_0x2b4add){const _0x543e3b=_0x489946,_0x41862d=this[_0x543e3b('0xb5')]()[_0x543e3b('0x66')],_0x56cec4=_0x41862d[_0x543e3b('0xbd')](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x56cec4)for(const _0x145962 of _0x56cec4){if(_0x543e3b('0x9a')!==_0x543e3b('0x61')){let _0x42a322=0x0,_0x21464e=0x0;if(_0x145962[_0x543e3b('0xbd')](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x42a322=Number(RegExp['$1']),_0x21464e=Number(RegExp['$2']);else{if(_0x145962['match'](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if('dUOwz'==='dUOwz')_0x42a322=DataManager[_0x543e3b('0xa9')](RegExp['$1']),_0x21464e=Number(RegExp['$2']);else{function _0x4dde0e(){const _0xd67ec5=_0x543e3b;_0x5cd95d=this[_0xd67ec5('0x90')](_0x56b361,_0x32e5c7,_0xd67ec5('0xd1')),this[_0xd67ec5('0x25')](_0x3235b0,_0x5a567e[_0xd67ec5('0x31')](_0x20822d,this['warmup'](_0x528d2d)));}}}}for(const _0x21bf49 of this[_0x543e3b('0xed')]()['skills']()){if(_0x543e3b('0xd2')===_0x543e3b('0xd2')){if(_0x21bf49){const _0x3b6b53=DataManager[_0x543e3b('0x8b')](_0x21bf49);_0x3b6b53['includes'](_0x42a322)&&this[_0x543e3b('0xed')]()[_0x543e3b('0x48')](_0x21bf49['id'],_0x21464e);}}else{function _0x476f73(){const _0x2771f7=_0x543e3b;if(this['_skillWarmups']===_0x37bb19)this[_0x2771f7('0x1b')]();if(this[_0x2771f7('0xac')]())return 0x0;return this[_0x2771f7('0x49')][_0x3dd66c]||0x0;}}}}else{function _0x3a2a61(){_0x2e9d5a=_0x3c99f0(_0x385fbd['$1']),_0x324976=_0x24ab28(_0x507727['$2']);}}}const _0x433814=_0x41862d['match'](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x433814)for(const _0x5a6c1c of _0x433814){if(_0x543e3b('0x43')===_0x543e3b('0x43')){let _0x42209e=0x0,_0x4fe101=0x0;if(_0x5a6c1c['match'](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x42209e=Number(RegExp['$1']),_0x4fe101=Number(RegExp['$2']);else{if(_0x5a6c1c[_0x543e3b('0xbd')](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x543e3b('0x2')==='LTOFX'){function _0x412734(){const _0x342465=_0x543e3b,_0x188063=_0x2c9cc8(_0x238a69['$1']);for(const _0x5c7688 of _0x290cc0[_0x342465('0x14')]()){_0x5c7688&&_0x4dfb49[_0x342465('0x48')](_0x5c7688['id'],_0x188063);}}}else _0x42209e=DataManager[_0x543e3b('0xa9')](RegExp['$1']),_0x4fe101=Number(RegExp['$2']);}}for(const _0x1a96d7 of _0x2b4add['skills']()){if(_0x1a96d7){if(_0x543e3b('0xbe')!=='xrBYN'){const _0x236448=DataManager[_0x543e3b('0x8b')](_0x1a96d7);if(_0x236448[_0x543e3b('0xf4')](_0x42209e)){if('nelJJ'!==_0x543e3b('0x18')){function _0x60c709(){const _0x271d22=_0x543e3b;_0x1d3f01=_0x2546aa[_0x271d22('0xa9')](_0x1a6d51['$1']),_0x3bcb83=_0x4989d9(_0x3b31b4['$2']);}}else _0x2b4add[_0x543e3b('0x48')](_0x1a96d7['id'],_0x4fe101);}}else{function _0xbd8db8(){const _0x1d4855=_0x543e3b;this[_0x1d4855('0x58')](_0x5979a9['id'],_0x46ef42);}}}}}else{function _0x25e658(){const _0x3e8b72=_0x543e3b;_0x55599e[_0x3e8b72('0x8e')]['warmupJS'][_0x2a3b78['id']]['call'](this,_0x5f490d);}}}},Game_Action[_0x489946('0x1a')]['applyChangeGlobalCooldownEffects']=function(_0x429b3d){const _0x252a22=_0x489946,_0x5b0ed8=this['item']()[_0x252a22('0x66')];if(_0x5b0ed8[_0x252a22('0xbd')](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x2aa48a=Number(RegExp['$1']);for(const _0xb459c of this[_0x252a22('0xed')]()[_0x252a22('0x14')]()){if(_0xb459c){if(_0x252a22('0xf3')!==_0x252a22('0xf3')){function _0x492827(){_0x3c3b84=_0x20513d(_0x30b8b9['$1']),_0x48f7ba=_0x554875(_0x12891b['$2']);}}else this[_0x252a22('0xed')]()[_0x252a22('0x48')](_0xb459c['id'],_0x2aa48a);}}}if(_0x5b0ed8[_0x252a22('0xbd')](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x252a22('0x24')===_0x252a22('0x59')){function _0x18026f(){const _0x1aa8bc=_0x252a22;let _0x42edaf=0x0,_0x47d2c4=0x0;if(_0x5ee1c4[_0x1aa8bc('0xbd')](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x42edaf=_0x4b11ec(_0x1ba0f6['$1']),_0x47d2c4=_0x3ca7a0(_0xc0c844['$2']);else _0x3d4609[_0x1aa8bc('0xbd')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x42edaf=_0x166cd7[_0x1aa8bc('0xa9')](_0xf9bdd3['$1']),_0x47d2c4=_0x44eacb(_0x11a22c['$2']));_0x137cdf[_0x1aa8bc('0x3d')](_0x42edaf,_0x47d2c4);}}else{const _0x39bfcf=Number(RegExp['$1']);for(const _0x1df9cb of _0x429b3d[_0x252a22('0x14')]()){_0x1df9cb&&_0x429b3d[_0x252a22('0x48')](_0x1df9cb['id'],_0x39bfcf);}}}},Game_Action[_0x489946('0x1a')][_0x489946('0x26')]=function(_0x1935e0){const _0x479961=_0x489946,_0x5db005=this[_0x479961('0xb5')]()[_0x479961('0x66')],_0x35f1c5=_0x5db005[_0x479961('0xbd')](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x35f1c5)for(const _0x1c7537 of _0x35f1c5){if(_0x479961('0x7e')===_0x479961('0xb2')){function _0x2bff84(){_0x4d1918=_0x2631a6(_0x5839d7['$1']),_0x3c2f9e=_0x2718be(_0x2525c2['$2']);}}else{let _0x36c076=0x0,_0xb9434a=0x0;if(_0x1c7537[_0x479961('0xbd')](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x479961('0x37')===_0x479961('0x21')){function _0x1a9d98(){const _0x3abfc0=_0x479961,_0x33c297=_0x186388(_0x21b978['$1']),_0x2505d6=_0x2d4368[_0x3abfc0('0x6c')](_0x33c297);_0x52ea64[_0x3abfc0('0x8e')][_0x3abfc0('0x62')][_0x1c24be['id']]=new _0x9f15c7(_0x2505d6);}}else _0x36c076=Number(RegExp['$1']),_0xb9434a=Number(RegExp['$2']);}else _0x1c7537['match'](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x36c076=DataManager[_0x479961('0xa9')](RegExp['$1']),_0xb9434a=Number(RegExp['$2']));this[_0x479961('0xed')]()[_0x479961('0x3d')](_0x36c076,_0xb9434a);}}const _0x57d798=_0x5db005[_0x479961('0xbd')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x57d798){if(_0x479961('0xca')===_0x479961('0x4')){function _0x45fdd1(){const _0x25af15=_0x479961,_0xad8d6d=_0x78eaed(_0x38dc05['$1']);for(const _0x2ecf23 of _0x2459a1[_0x25af15('0x14')]()){_0x2ecf23&&_0x2ee1b5[_0x25af15('0x3d')](_0x2ecf23['id'],_0xad8d6d);}}}else for(const _0x226cbf of _0x57d798){let _0x3fe706=0x0,_0x1025e3=0x0;if(_0x226cbf[_0x479961('0xbd')](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x3fe706=Number(RegExp['$1']),_0x1025e3=Number(RegExp['$2']);else _0x226cbf[_0x479961('0xbd')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x3fe706=DataManager[_0x479961('0xa9')](RegExp['$1']),_0x1025e3=Number(RegExp['$2']));_0x1935e0[_0x479961('0x3d')](_0x3fe706,_0x1025e3);}}},Game_Action[_0x489946('0x1a')][_0x489946('0xce')]=function(_0x2023f6){const _0x2002e5=_0x489946,_0x4a7702=this[_0x2002e5('0xb5')]()['note'],_0x57d320=_0x4a7702[_0x2002e5('0xbd')](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x57d320){if(_0x2002e5('0x5f')!==_0x2002e5('0x5'))for(const _0x3d0e90 of _0x57d320){if(_0x2002e5('0x5d')!==_0x2002e5('0xb3')){let _0x29d082=0x0,_0x58779b=0x0;if(_0x3d0e90[_0x2002e5('0xbd')](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x29d082=Number(RegExp['$1']),_0x58779b=Number(RegExp['$2']);else{if(_0x3d0e90['match'](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x2002e5('0xa3')!==_0x2002e5('0xa3')){function _0x17003a(){var _0x2079b5=_0x12100b(_0x386520['$1']);_0x15d6cf+=_0x2079b5;}}else _0x29d082=DataManager['getSkillIdWithName'](RegExp['$1']),_0x58779b=Number(RegExp['$2']);}}for(const _0x37d86b of this[_0x2002e5('0xed')]()['skills']()){if(_0x2002e5('0xb7')===_0x2002e5('0xb7')){if(_0x37d86b){if(_0x2002e5('0x56')==='qlAsc'){function _0x598930(){const _0x4aa98d=_0x2002e5;_0x1b1eba+=_0x4aa98d('0xab')[_0x4aa98d('0x6c')](_0x45ea13);}}else{const _0x31393e=DataManager[_0x2002e5('0x8b')](_0x37d86b);_0x31393e[_0x2002e5('0xf4')](_0x29d082)&&this[_0x2002e5('0xed')]()[_0x2002e5('0x3d')](_0x37d86b['id'],_0x58779b);}}}else{function _0x2df86f(){const _0x177628=_0x2002e5;for(const _0x9a941f of this[_0x177628('0x14')]()){_0x9a941f&&this[_0x177628('0x58')](_0x9a941f['id'],_0x505ccc);}}}}}else{function _0x3f37e5(){const _0x3a5c7d=_0x2002e5;if(!_0x560a76['inBattle']())return;const _0x317ed5=_0xc964cf[_0x3a5c7d('0x8e')][_0x3a5c7d('0xe5')]['Cooldown'];if(_0x317ed5[_0x3a5c7d('0x4e')])_0x317ed5[_0x3a5c7d('0x4e')][_0x3a5c7d('0xaa')](this,_0x2051e0);_0x36d0b8[_0x3a5c7d('0x8e')][_0x3a5c7d('0x62')][_0x199d3a]&&_0x3791c2['SkillCooldowns'][_0x3a5c7d('0x62')][_0x1775d1][_0x3a5c7d('0xaa')](this,_0x2551cd);}}}else{function _0x452fc6(){const _0x183717=_0x2002e5;this[_0x183717('0x49')]={};}}}const _0x35b204=_0x4a7702[_0x2002e5('0xbd')](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x35b204){if('BsIHU'===_0x2002e5('0x7f'))for(const _0x419840 of _0x35b204){let _0x1c3712=0x0,_0x4a31da=0x0;if(_0x419840[_0x2002e5('0xbd')](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if('HhTWV'===_0x2002e5('0xf1'))_0x1c3712=Number(RegExp['$1']),_0x4a31da=Number(RegExp['$2']);else{function _0x5e5739(){const _0x2da569=_0x2002e5;return this[_0x2da569('0xc5')](_0x208758['id'])<=0x0;}}}else{if(_0x419840[_0x2002e5('0xbd')](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x2002e5('0x78')!==_0x2002e5('0xd6'))_0x1c3712=DataManager[_0x2002e5('0xa9')](RegExp['$1']),_0x4a31da=Number(RegExp['$2']);else{function _0x4884cd(){const _0x2e745e=_0x2002e5;if(this[_0x2e745e('0xea')]===_0x235700)this['initSkillCooldowns']();this[_0x2e745e('0xea')][_0x797da9]=this['_skillCooldowns'][_0x3b8175]||0x0,this['setCooldown'](_0x472096,this[_0x2e745e('0xea')][_0x5516be]+_0x4adf9b);}}}}for(const _0x1179d6 of _0x2023f6[_0x2002e5('0x14')]()){if(_0x1179d6){if(_0x2002e5('0x6a')!==_0x2002e5('0x41')){const _0x16a510=DataManager[_0x2002e5('0x8b')](_0x1179d6);if(_0x16a510['includes'](_0x1c3712)){if(_0x2002e5('0xec')!==_0x2002e5('0x38'))_0x2023f6['addWarmup'](_0x1179d6['id'],_0x4a31da);else{function _0x3e4ca2(){this['drawSkillCooldown'](_0x45ba7a,_0x1dce50,_0x1c56f0,_0xf1b020,_0x45024b);}}}}else{function _0x4ce74d(){const _0xfe3422=_0x2002e5;if(_0x241dda>0x0)this[_0xfe3422('0xe3')](_0x50387a);delete this[_0xfe3422('0xea')][_0x461988];}}}}}else{function _0x3d3e02(){const _0x268a32=_0x2002e5;return this[_0x268a32('0xc5')](_0x4bd260)+this[_0x268a32('0x11')](_0x713c2e);}}}},Game_Action[_0x489946('0x1a')]['applyChangeGlobalWarmupEffects']=function(_0x1ee4ec){const _0x496867=_0x489946,_0x38b963=this[_0x496867('0xb5')]()['note'];if(_0x38b963['match'](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){if('zKcXJ'===_0x496867('0x4a')){const _0x227193=Number(RegExp['$1']);for(const _0x17812c of this[_0x496867('0xed')]()['skills']()){if(_0x17812c){if(_0x496867('0xd4')===_0x496867('0x30')){function _0x476319(){const _0x20ece8=_0x496867;_0xa5b87c=_0x38ac06[_0x20ece8('0xa9')](_0x2de837['$1']),_0x2f4006=_0x37a2b0(_0x41f449['$2']);}}else this[_0x496867('0xed')]()['addWarmup'](_0x17812c['id'],_0x227193);}}}else{function _0x2b1e09(){const _0x106fea=_0x496867;let _0x3d7d04=_0x567fbd[_0x106fea('0x11')](_0x175b36);_0x3d7d04=_0x714000[_0x106fea('0x3')](_0x3d7d04,_0x4f23bc,_0xd348e8),_0x269b8f[_0x106fea('0x68')](_0x53f198,_0x3d7d04);}}}if(_0x38b963['match'](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x49c34e=Number(RegExp['$1']);for(const _0x528471 of _0x1ee4ec['skills']()){if(_0x528471){if(_0x496867('0xd7')==='kFDUu'){function _0x33118b(){const _0xa9ee29=_0x496867;this[_0xa9ee29('0xed')]()[_0xa9ee29('0x86')]();}}else _0x1ee4ec[_0x496867('0x3d')](_0x528471['id'],_0x49c34e);}}}},VisuMZ['SkillCooldowns'][_0x489946('0x35')]=Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xad')],Game_BattlerBase[_0x489946('0x1a')]['initMembers']=function(){const _0x3dacb2=_0x489946;VisuMZ[_0x3dacb2('0x8e')][_0x3dacb2('0x35')]['call'](this),this[_0x3dacb2('0x1b')]();},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x1b')]=function(){const _0x37cc3f=_0x489946;this['clearCooldowns'](),this[_0x37cc3f('0xe8')]();},Game_BattlerBase[_0x489946('0x1a')]['clearCooldowns']=function(){const _0x3081a6=_0x489946;this[_0x3081a6('0xea')]={};},Game_BattlerBase['prototype'][_0x489946('0x11')]=function(_0xde38ee){const _0x4d37f9=_0x489946;if(this['_skillCooldowns']===undefined)this[_0x4d37f9('0x1b')]();if(this[_0x4d37f9('0x4d')]())return 0x0;return this[_0x4d37f9('0xea')][_0xde38ee]||0x0;},Game_BattlerBase['prototype'][_0x489946('0x4d')]=function(_0x252747){const _0x1e28af=_0x489946;if(!$gameParty['inBattle']())return!![];if(this[_0x1e28af('0x3a')]()===_0x252747)return!![];if(this['guardSkillId']()===_0x252747)return!![];const _0x31f5ad=$dataSkills[_0x252747];if(_0x31f5ad&&_0x31f5ad[_0x1e28af('0x66')][_0x1e28af('0xbd')](/<BYPASS COOLDOWNS>/i))return!![];if(_0x31f5ad&&_0x31f5ad[_0x1e28af('0xa7')][_0x1e28af('0xdd')]()===_0x1e28af('0x1d'))return!![];return![];},Game_BattlerBase[_0x489946('0x1a')]['onCooldownUpdate']=function(_0x67dc8a){const _0x152d74=_0x489946;if(!$gameParty[_0x152d74('0x95')]())return;const _0x4524de=VisuMZ[_0x152d74('0x8e')][_0x152d74('0xe5')][_0x152d74('0xdf')];if(_0x4524de[_0x152d74('0x6e')])_0x4524de[_0x152d74('0x6e')][_0x152d74('0xaa')](this,_0x67dc8a);if(VisuMZ[_0x152d74('0x8e')][_0x152d74('0x1f')][_0x67dc8a]){if(_0x152d74('0x1c')!==_0x152d74('0x3f'))VisuMZ[_0x152d74('0x8e')][_0x152d74('0x1f')][_0x67dc8a][_0x152d74('0xaa')](this,_0x67dc8a);else{function _0x4c64a3(){const _0x5933fb=_0x152d74;if(_0x4e4f2d){const _0x23eb36=_0x115e3e['getSkillTypes'](_0x24170d);_0x23eb36[_0x5933fb('0xf4')](_0x20d080)&&this[_0x5933fb('0xed')]()[_0x5933fb('0x3d')](_0xf1e88c['id'],_0x1608ff);}}}}},Game_BattlerBase['prototype']['onCooldownReady']=function(_0x33b3b8){const _0x58ad76=_0x489946;if(!$gameParty['inBattle']())return;const _0x3ae2d2=VisuMZ[_0x58ad76('0x8e')][_0x58ad76('0xe5')]['Cooldown'];if(_0x3ae2d2[_0x58ad76('0x4e')])_0x3ae2d2['OnReadyJS'][_0x58ad76('0xaa')](this,_0x33b3b8);VisuMZ[_0x58ad76('0x8e')]['onCooldownReadyJS'][_0x33b3b8]&&VisuMZ[_0x58ad76('0x8e')][_0x58ad76('0x62')][_0x33b3b8][_0x58ad76('0xaa')](this,_0x33b3b8);},Game_BattlerBase['prototype']['setCooldown']=function(_0x32f944,_0x1bcf75){const _0x100480=_0x489946;if(this[_0x100480('0xea')]===undefined)this[_0x100480('0x1b')]();if(this[_0x100480('0x4d')](_0x32f944))return;_0x1bcf75=Math[_0x100480('0x87')](_0x1bcf75),_0x1bcf75=_0x1bcf75[_0x100480('0x8c')](0x0,VisuMZ[_0x100480('0x8e')][_0x100480('0xe5')][_0x100480('0xdf')][_0x100480('0x69')]);const _0x2be3c7=this[_0x100480('0x11')](_0x32f944);;this[_0x100480('0xea')][_0x32f944]=_0x1bcf75;if(this[_0x100480('0xea')][_0x32f944]<=0x0){if(_0x2be3c7>0x0)this['onCooldownReady'](_0x32f944);delete this[_0x100480('0xea')][_0x32f944];}},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x48')]=function(_0x1245f7,_0x5945f2){const _0x380e0f=_0x489946;if(this[_0x380e0f('0xea')]===undefined)this[_0x380e0f('0x1b')]();this[_0x380e0f('0xea')][_0x1245f7]=this[_0x380e0f('0xea')][_0x1245f7]||0x0,this[_0x380e0f('0x68')](_0x1245f7,this[_0x380e0f('0xea')][_0x1245f7]+_0x5945f2);},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x58')]=function(_0x2c2928,_0x42b762){const _0x497aeb=_0x489946;_0x42b762=this[_0x497aeb('0x90')](_0x2c2928,_0x42b762,_0x497aeb('0xc9')),this[_0x497aeb('0x68')](_0x2c2928,Math[_0x497aeb('0x31')](_0x42b762,this['cooldown'](_0x2c2928)));},Game_BattlerBase[_0x489946('0x1a')]['applyStypeCooldowns']=function(_0x55a608,_0x1112db){const _0x1d1cb2=_0x489946;for(const _0xe23448 of this[_0x1d1cb2('0x14')]()){if('HIjzo'===_0x1d1cb2('0x2c')){function _0x4e2eb0(){const _0xa3fc73=_0x1d1cb2;if(!_0x17d8d7['inBattle']())return;const _0x3382ad=_0x4ff560[_0xa3fc73('0x8e')][_0xa3fc73('0xe5')][_0xa3fc73('0xdf')];if(_0x3382ad[_0xa3fc73('0x6e')])_0x3382ad[_0xa3fc73('0x6e')]['call'](this,_0x4bffaa);_0x3220d[_0xa3fc73('0x8e')][_0xa3fc73('0x1f')][_0x3553c2]&&_0x5aa838[_0xa3fc73('0x8e')][_0xa3fc73('0x1f')][_0x56da65][_0xa3fc73('0xaa')](this,_0x12cdb5);}}else{if(_0xe23448){const _0x489f7a=DataManager[_0x1d1cb2('0x8b')](_0xe23448);_0x489f7a[_0x1d1cb2('0xf4')](_0x55a608)&&this[_0x1d1cb2('0x58')](_0xe23448['id'],_0x1112db);}}}},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xe')]=function(_0x144615){const _0x32c9b2=_0x489946;for(const _0x17ad6e of this[_0x32c9b2('0x14')]()){_0x17ad6e&&this[_0x32c9b2('0x58')](_0x17ad6e['id'],_0x144615);}},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xdb')]=function(_0x311bd3){const _0x259821=_0x489946;_0x311bd3=_0x311bd3||0x1;for(const _0x3f3258 in this[_0x259821('0xea')]){if(_0x259821('0xde')!==_0x259821('0xde')){function _0xb8a88c(){const _0x58f095=_0x259821;let _0x1488d3=0x0,_0x2cf684=0x0;if(_0x589ae4[_0x58f095('0xbd')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x1488d3=_0x1d435b(_0x5196f8['$1']),_0x2cf684=_0x3a7a6d(_0x5e8f6a['$2']);else _0x4b7149[_0x58f095('0xbd')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x1488d3=_0x5d2532[_0x58f095('0xa9')](_0x2ec094['$1']),_0x2cf684=_0x558a70(_0xe8d0f6['$2']));this['subject']()[_0x58f095('0x48')](_0x1488d3,_0x2cf684);}}else{const _0x1313ea=this[_0x259821('0xea')][_0x3f3258]||0x0;this[_0x259821('0xea')][_0x3f3258]-=_0x311bd3,this['onCooldownUpdate'](_0x3f3258);if(this[_0x259821('0xea')][_0x3f3258]<=0x0){if(_0x1313ea>0x0)this[_0x259821('0xe3')](_0x3f3258);delete this['_skillCooldowns'][_0x3f3258];}}}},Game_BattlerBase['prototype'][_0x489946('0xe8')]=function(){const _0x17cd38=_0x489946;this[_0x17cd38('0x49')]={};},Game_BattlerBase[_0x489946('0x1a')]['warmup']=function(_0x1376a5){const _0x64d95d=_0x489946;return this[_0x64d95d('0xc5')](_0x1376a5)+this[_0x64d95d('0x11')](_0x1376a5);},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xc5')]=function(_0x4742e1){const _0x5ec3ca=_0x489946;if(this[_0x5ec3ca('0x49')]===undefined)this['initSkillCooldowns']();if(this[_0x5ec3ca('0xac')]())return 0x0;return this[_0x5ec3ca('0x49')][_0x4742e1]||0x0;},Game_BattlerBase[_0x489946('0x1a')]['isBypassWarmups']=function(_0x1c1de9){const _0x48fbce=_0x489946;if(this[_0x48fbce('0x3a')]()===_0x1c1de9)return!![];if(this[_0x48fbce('0x79')]()===_0x1c1de9)return!![];const _0x3b4e30=$dataSkills[_0x1c1de9];if(_0x3b4e30&&_0x3b4e30[_0x48fbce('0x66')][_0x48fbce('0xbd')](/<BYPASS WARMUPS>/i))return!![];if(_0x3b4e30&&_0x3b4e30[_0x48fbce('0xa7')]['toUpperCase']()===_0x48fbce('0x1d'))return!![];return![];},Game_BattlerBase['prototype']['onWarmupUpdate']=function(_0x3d582e){const _0x40741f=_0x489946;if(!$gameParty[_0x40741f('0x95')]())return;const _0x1343e2=VisuMZ[_0x40741f('0x8e')][_0x40741f('0xe5')][_0x40741f('0xb9')];if(_0x1343e2[_0x40741f('0x6e')])_0x1343e2[_0x40741f('0x6e')][_0x40741f('0xaa')](this,_0x3d582e);if(VisuMZ[_0x40741f('0x8e')][_0x40741f('0xe6')][_0x3d582e]){if(_0x40741f('0xe2')===_0x40741f('0x2a')){function _0x14a654(){const _0x17c197=_0x40741f;this['applyClearCooldownEffects'](_0x51efdc),this[_0x17c197('0xb6')](_0xc05cb3),this['applyChangeStypeCooldownEffects'](_0x12ba04),this[_0x17c197('0x85')](_0x140046),this[_0x17c197('0x26')](_0xed5214),this[_0x17c197('0xce')](_0x1383bf),this['applyChangeGlobalWarmupEffects'](_0x2af663);}}else VisuMZ[_0x40741f('0x8e')][_0x40741f('0xe6')][_0x3d582e][_0x40741f('0xaa')](this,_0x3d582e);}},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x75')]=function(_0x149507){const _0xfd518a=_0x489946;if(!$gameParty['inBattle']())return;const _0x238b53=VisuMZ['SkillCooldowns'][_0xfd518a('0xe5')][_0xfd518a('0xb9')];if(_0x238b53[_0xfd518a('0x4e')])_0x238b53[_0xfd518a('0x4e')]['call'](this,_0x149507);},Game_BattlerBase[_0x489946('0x1a')]['setWarmup']=function(_0x2bef5c,_0x49eba4){const _0x41d4f3=_0x489946;if(this[_0x41d4f3('0x49')]===undefined)this['initSkillCooldowns']();if(this[_0x41d4f3('0xac')](_0x2bef5c))return;_0x49eba4=Math[_0x41d4f3('0x87')](_0x49eba4),_0x49eba4=_0x49eba4[_0x41d4f3('0x8c')](0x0,VisuMZ['SkillCooldowns']['Settings']['Warmup'][_0x41d4f3('0x69')]);const _0xcbf377=this[_0x41d4f3('0xc5')](_0x2bef5c);;this['_skillWarmups'][_0x2bef5c]=_0x49eba4;if(this[_0x41d4f3('0x49')][_0x2bef5c]<=0x0){if(_0xcbf377>0x0)this[_0x41d4f3('0x75')](_0x2bef5c);delete this[_0x41d4f3('0x49')][_0x2bef5c];}},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x3d')]=function(_0x4e79bc,_0x4fb83c){const _0x395ead=_0x489946;if(this['_skillWarmups']===undefined)this['initSkillCooldowns']();this[_0x395ead('0x49')][_0x4e79bc]=this[_0x395ead('0x49')][_0x4e79bc]||0x0;if(this[_0x395ead('0x89')](_0x4e79bc)<=0x0)return;this['setWarmup'](_0x4e79bc,this['_skillWarmups'][_0x4e79bc]+_0x4fb83c);},Game_BattlerBase['prototype'][_0x489946('0x2d')]=function(_0x1dd8fd,_0x4a5145){const _0x554bd6=_0x489946;_0x4a5145=this[_0x554bd6('0x90')](_0x1dd8fd,_0x4a5145,'WARMUP'),this[_0x554bd6('0x25')](_0x1dd8fd,Math['max'](_0x4a5145,this[_0x554bd6('0x89')](_0x1dd8fd)));},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x77')]=function(_0x30b230){const _0x56c951=_0x489946;_0x30b230=_0x30b230||0x1;for(const _0x5b3e8d in this[_0x56c951('0x49')]){if('xCzDC'!==_0x56c951('0x8')){const _0x5cc7a8=this['_skillWarmups'][_0x5b3e8d]||0x0;this[_0x56c951('0x49')][_0x5b3e8d]-=_0x30b230;if(this[_0x56c951('0x49')][_0x5b3e8d]<=0x0){if(_0x56c951('0x3b')!==_0x56c951('0x3b')){function _0x477fe6(){const _0xe2f549=_0x56c951;_0x295088['SkillCooldowns'][_0xe2f549('0xf0')][_0xe2f549('0xaa')](this,_0x113f70),this['paySkillCooldown'](_0x102767);}}else{if(_0x5cc7a8>0x0)this[_0x56c951('0x75')](_0x5b3e8d);delete this[_0x56c951('0x49')][_0x5b3e8d];}}}else{function _0x83ce78(){var _0x191bdf=_0x47fbcf(_0x92f45a['$1']);_0x3cec18*=_0x191bdf;}}}},VisuMZ[_0x489946('0x8e')][_0x489946('0xd5')]=Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x39')],Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x39')]=function(_0x28a70f){const _0x4cbb44=_0x489946;if(!VisuMZ[_0x4cbb44('0x8e')]['Game_BattlerBase_meetsSkillConditions'][_0x4cbb44('0xaa')](this,_0x28a70f))return![];if(!this[_0x4cbb44('0xcf')](_0x28a70f))return![];if(!this['areSkillCooldownsReady'](_0x28a70f))return![];return!![];},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xcf')]=function(_0x435257){return this['rawWarmup'](_0x435257['id'])<=0x0;},Game_BattlerBase[_0x489946('0x1a')][_0x489946('0xa5')]=function(_0x4a25dc){const _0x202946=_0x489946;return this[_0x202946('0x11')](_0x4a25dc['id'])<=0x0;},VisuMZ[_0x489946('0x8e')][_0x489946('0xf0')]=Game_BattlerBase[_0x489946('0x1a')][_0x489946('0x8d')],Game_BattlerBase['prototype'][_0x489946('0x8d')]=function(_0x47cbad){const _0x457dc=_0x489946;VisuMZ[_0x457dc('0x8e')]['Game_BattlerBase_paySkillCost'][_0x457dc('0xaa')](this,_0x47cbad),this[_0x457dc('0x82')](_0x47cbad);},Game_BattlerBase['prototype'][_0x489946('0x82')]=function(_0x4aa815){const _0x466f05=_0x489946;if(!$gameParty['inBattle']())return;const _0x25f6c4=_0x4aa815[_0x466f05('0x66')];if(_0x25f6c4[_0x466f05('0xbd')](/<COOLDOWN:[ ](\d+)>/i)){if(_0x466f05('0x22')===_0x466f05('0xd8')){function _0x36b82f(){const _0x297c8c=_0x466f05;if(!_0x3d9893[_0x297c8c('0x95')]())return;const _0x4edf2e=_0x16f485[_0x297c8c('0x8e')][_0x297c8c('0xe5')]['Warmup'];if(_0x4edf2e[_0x297c8c('0x4e')])_0x4edf2e[_0x297c8c('0x4e')][_0x297c8c('0xaa')](this,_0x410662);}}else this[_0x466f05('0x58')](_0x4aa815['id'],Number(RegExp['$1']));}if(VisuMZ['SkillCooldowns'][_0x466f05('0x99')][_0x4aa815['id']]){if(_0x466f05('0xa4')==='nsEEl')VisuMZ[_0x466f05('0x8e')][_0x466f05('0x99')][_0x4aa815['id']][_0x466f05('0xaa')](this,_0x4aa815);else{function _0x30eabc(){const _0x2d984f=_0x466f05;_0x143941&&this[_0x2d984f('0xed')]()['addCooldown'](_0x55e46e['id'],_0x2e24ab);}}}const _0x390cc0=_0x25f6c4['match'](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x390cc0){if(_0x466f05('0x9c')!==_0x466f05('0xa6'))for(const _0x212807 of _0x390cc0){let _0x4c1634=0x0,_0x48848e=0x0;if(_0x212807[_0x466f05('0xbd')](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x4c1634=Number(RegExp['$1']),_0x48848e=Number(RegExp['$2']);else _0x212807[_0x466f05('0xbd')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x4c1634=DataManager[_0x466f05('0xa9')](RegExp['$1']),_0x48848e=Number(RegExp['$2']));const _0x59c5f2=$dataSkills[_0x4c1634];_0x59c5f2&&this[_0x466f05('0x58')](_0x59c5f2['id'],_0x48848e);}else{function _0xd6b79b(){var _0x59b984=_0x541b11(_0xdd904d['$1'])/0x64;_0x5a2687*=_0x59b984;}}}const _0x188a53=_0x25f6c4[_0x466f05('0xbd')](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x188a53)for(const _0x24e1a6 of _0x188a53){let _0x578d27=0x0,_0x4a8d45=0x0;if(_0x24e1a6[_0x466f05('0xbd')](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x578d27=Number(RegExp['$1']),_0x4a8d45=Number(RegExp['$2']);else _0x24e1a6['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x578d27=DataManager[_0x466f05('0x51')](RegExp['$1']),_0x4a8d45=Number(RegExp['$2']));this[_0x466f05('0x96')](_0x578d27,_0x4a8d45);}if(_0x25f6c4[_0x466f05('0xbd')](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){if(_0x466f05('0x5b')==='MEMWH'){function _0x49545a(){const _0x31fa9a=_0x466f05,_0xec09cc=this[_0x31fa9a('0xea')][_0x30b507]||0x0;this[_0x31fa9a('0xea')][_0x3f7203]-=_0x7698cf,this[_0x31fa9a('0x40')](_0x5b955);if(this[_0x31fa9a('0xea')][_0x517ebb]<=0x0){if(_0xec09cc>0x0)this[_0x31fa9a('0xe3')](_0x26fb55);delete this[_0x31fa9a('0xea')][_0x806260];}}}else{const _0x45b602=Number(RegExp['$1']);this['applyGlobalCooldowns'](_0x45b602);}}},Game_BattlerBase[_0x489946('0x1a')]['applyCDWUmodifiers']=function(_0x36cad0,_0x118d76,_0x142c3c){const _0xa16a11=_0x489946,_0x4e44ff=$dataSkills[_0x36cad0];if(!_0x4e44ff)return _0x118d76;const _0x4fa08a=this['applyCDWUnotetagsFlat'](_0x4e44ff,_0x142c3c,_0xa16a11('0x7')),_0x29b29c=this[_0xa16a11('0x2e')](_0x4e44ff,_0x142c3c,_0xa16a11('0x88')),_0x18eb96=this[_0xa16a11('0xf7')](_0x4e44ff,_0x142c3c,_0xa16a11('0xc3'));return Math[_0xa16a11('0x87')]((_0x118d76+_0x4fa08a)*_0x29b29c+_0x18eb96);},VisuMZ[_0x489946('0x8e')][_0x489946('0x70')]={},Game_BattlerBase[_0x489946('0x1a')]['applyCDWUnotetagsFlat']=function(_0x5860f5,_0xefd53,_0x250763){const _0x5f4ff0=_0x489946,_0x320c6b=_0x5860f5['id'],_0x5d68e8=_0x5860f5[_0x5f4ff0('0xa7')]['trim'](),_0x45a138=VisuMZ[_0x5f4ff0('0x8e')][_0x5f4ff0('0x70')],_0x565aa9=_0x5f4ff0('0xbf')[_0x5f4ff0('0x6c')](_0x320c6b,_0xefd53,_0x250763);_0x45a138[_0x565aa9]=_0x45a138[_0x565aa9]||{};const _0x4167ec='<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>';_0x45a138[_0x565aa9][_0x5f4ff0('0x1e')]=_0x45a138[_0x565aa9][_0x5f4ff0('0x1e')]||new RegExp(_0x4167ec[_0x5f4ff0('0x6c')](_0x320c6b,_0xefd53,_0x250763),'i'),_0x45a138[_0x565aa9][_0x5f4ff0('0xe4')]=_0x45a138[_0x565aa9][_0x5f4ff0('0xe4')]||new RegExp(_0x4167ec[_0x5f4ff0('0x6c')](_0x5d68e8,_0xefd53,_0x250763),'i');const _0x211562=DataManager[_0x5f4ff0('0x8b')](_0x5860f5);for(const _0x6fc93a of _0x211562){if(_0x5f4ff0('0xd3')===_0x5f4ff0('0xd3')){const _0x20dd47=_0x5f4ff0('0xb0')[_0x5f4ff0('0x6c')](_0x6fc93a,_0xefd53,_0x250763);let _0x5b40ce=$dataSystem[_0x5f4ff0('0x10')][Number(_0x6fc93a)][_0x5f4ff0('0xdd')]()['trim']();_0x5b40ce=_0x5b40ce[_0x5f4ff0('0x7d')](/\x1I\[(\d+)\]/gi,''),_0x5b40ce=_0x5b40ce['replace'](/\\I\[(\d+)\]/gi,''),_0x45a138[_0x20dd47]=_0x45a138[_0x20dd47]||{};const _0x3b4125='<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>';_0x45a138[_0x20dd47][_0x5f4ff0('0x1e')]=_0x45a138[_0x20dd47][_0x5f4ff0('0x1e')]||new RegExp(_0x3b4125['format'](_0x6fc93a,_0xefd53,_0x250763),'i'),_0x45a138[_0x20dd47][_0x5f4ff0('0xe4')]=_0x45a138[_0x20dd47][_0x5f4ff0('0xe4')]||new RegExp(_0x3b4125[_0x5f4ff0('0x6c')](_0x5b40ce,_0xefd53,_0x250763),'i');}else{function _0x41dba6(){const _0x89d53b=_0x5f4ff0,_0x1851dd=_0x1805c7(_0x3e8389['$1']);_0x1851dd<_0x51457c?(_0x27851a(_0x89d53b('0x44')[_0x89d53b('0x6c')](_0x56c7c8,_0x1851dd,_0x2aa8c0)),_0x5a0f15[_0x89d53b('0xc8')]()):_0x1fe380=_0x53113a['max'](_0x1851dd,_0x23ce9d);}}}const _0x43c9fa='<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>',_0x4cd7a7=_0x5f4ff0('0x5a')['format'](_0xefd53,_0x250763);_0x45a138[_0x4cd7a7]=_0x45a138[_0x4cd7a7]||new RegExp(_0x43c9fa['format'](_0xefd53,_0x250763),'i');const _0x52b96b=(_0x2225c1,_0xa535b9)=>{const _0x2992a5=_0x5f4ff0;if(_0x2992a5('0xf5')!==_0x2992a5('0xf5')){function _0x4a5d94(){const _0x1290d=_0x2992a5,_0x5d57f5=_0x626538(_0x407515['$1']),_0x1fdac4='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1290d('0x6c')](_0x5d57f5);_0x4a95d7[_0x1290d('0x8e')][_0x1290d('0x12')][_0x5a0236['id']]=new _0x1bd3fb(_0x1fdac4);}}else{if(!_0xa535b9)return _0x2225c1;const _0x15fa3e=_0xa535b9[_0x2992a5('0x66')];if(_0x15fa3e[_0x2992a5('0xbd')](_0x45a138[_0x565aa9][_0x2992a5('0x1e')])){if(_0x2992a5('0x36')!=='AaXqK'){var _0x536d45=Number(RegExp['$1']);_0x2225c1+=_0x536d45;}else{function _0x1d6e4e(){_0x1787df=_0x573c61['getStypeIdWithName'](_0x2a4824['$1']),_0x2e1761=_0xf6109e(_0x4cad78['$2']);}}}if(_0x15fa3e[_0x2992a5('0xbd')](_0x45a138[_0x565aa9][_0x2992a5('0xe4')])){if(_0x2992a5('0xc6')===_0x2992a5('0xc6')){var _0x536d45=Number(RegExp['$1']);_0x2225c1+=_0x536d45;}else{function _0x13772c(){const _0x2f0945=_0x2992a5,_0x16baa4=this[_0x2f0945('0x49')][_0x369df2]||0x0;this[_0x2f0945('0x49')][_0x5cc02b]-=_0x285995;if(this['_skillWarmups'][_0x50ac9c]<=0x0){if(_0x16baa4>0x0)this[_0x2f0945('0x75')](_0xe3b022);delete this['_skillWarmups'][_0x57f646];}}}}for(const _0x171c59 of _0x211562){const _0x2a4c2e=_0x2992a5('0xb0')[_0x2992a5('0x6c')](_0x171c59,_0xefd53,_0x250763);if(_0x15fa3e['match'](_0x45a138[_0x2a4c2e]['notetag1'])){var _0x536d45=Number(RegExp['$1']);_0x2225c1+=_0x536d45;}if(_0x15fa3e[_0x2992a5('0xbd')](_0x45a138[_0x2a4c2e][_0x2992a5('0xe4')])){if('IUNtm'!=='bNCiX'){var _0x536d45=Number(RegExp['$1']);_0x2225c1+=_0x536d45;}else{function _0x564c37(){const _0x10523a=_0x2992a5;_0x31d1e9=_0x4bd697[_0x10523a('0xa9')](_0x2f38eb['$1']),_0x47f6c4=_0x584384(_0x29dfe7['$2']);}}}}if(_0x15fa3e['match'](_0x45a138[_0x4cd7a7])){var _0x536d45=Number(RegExp['$1']);_0x2225c1+=_0x536d45;}return _0x2225c1;}};return this[_0x5f4ff0('0xcc')]()['reduce'](_0x52b96b,0x0);},Game_BattlerBase['prototype']['applyCDWUnotetagsRate']=function(_0x2daa4a,_0x3dfb0d,_0x6c1342){const _0xcb30e6=_0x489946,_0x589f78=_0x2daa4a['id'],_0xd95d3c=_0x2daa4a[_0xcb30e6('0xa7')][_0xcb30e6('0x81')](),_0x16fbbc=VisuMZ['SkillCooldowns'][_0xcb30e6('0x70')],_0x2ced4f=_0xcb30e6('0xc2'),_0x235e13=_0xcb30e6('0xcd'),_0x39685f=_0xcb30e6('0xbf')[_0xcb30e6('0x6c')](_0x589f78,_0x3dfb0d,_0x6c1342);_0x16fbbc[_0x39685f]=_0x16fbbc[_0x39685f]||{};const _0x2ea7ef=_0xcb30e6('0x3c');_0x16fbbc[_0x39685f][_0xcb30e6('0x1e')]=_0x16fbbc[_0x39685f]['notetag1']||new RegExp(_0x2ea7ef[_0xcb30e6('0x6c')](_0x589f78,_0x3dfb0d,_0x6c1342,_0x2ced4f),'i'),_0x16fbbc[_0x39685f][_0xcb30e6('0xe4')]=_0x16fbbc[_0x39685f][_0xcb30e6('0xe4')]||new RegExp(_0x2ea7ef[_0xcb30e6('0x6c')](_0xd95d3c,_0x3dfb0d,_0x6c1342,_0x2ced4f),'i'),_0x16fbbc[_0x39685f][_0xcb30e6('0xc1')]=_0x16fbbc[_0x39685f][_0xcb30e6('0xc1')]||new RegExp(_0x2ea7ef[_0xcb30e6('0x6c')](_0x589f78,_0x3dfb0d,_0x6c1342,_0x235e13),'i'),_0x16fbbc[_0x39685f][_0xcb30e6('0x73')]=_0x16fbbc[_0x39685f][_0xcb30e6('0x73')]||new RegExp(_0x2ea7ef['format'](_0xd95d3c,_0x3dfb0d,_0x6c1342,_0x235e13),'i');const _0x291adc=DataManager[_0xcb30e6('0x8b')](_0x2daa4a);for(const _0x32d12d of _0x291adc){const _0x4112f0=_0xcb30e6('0xb0')[_0xcb30e6('0x6c')](_0x32d12d,_0x3dfb0d,_0x6c1342);let _0x87f8dd=$dataSystem[_0xcb30e6('0x10')][Number(_0x32d12d)]['toUpperCase']()[_0xcb30e6('0x81')]();_0x87f8dd=_0x87f8dd[_0xcb30e6('0x7d')](/\x1I\[(\d+)\]/gi,''),_0x87f8dd=_0x87f8dd[_0xcb30e6('0x7d')](/\\I\[(\d+)\]/gi,''),_0x16fbbc[_0x4112f0]=_0x16fbbc[_0x4112f0]||{};const _0x5f2f30='<STYPE\x20%1\x20%2\x20%3:[\x20]%4>';_0x16fbbc[_0x4112f0][_0xcb30e6('0x1e')]=_0x16fbbc[_0x4112f0]['notetag1']||new RegExp(_0x5f2f30[_0xcb30e6('0x6c')](_0x32d12d,_0x3dfb0d,_0x6c1342,_0x2ced4f),'i'),_0x16fbbc[_0x4112f0][_0xcb30e6('0xe4')]=_0x16fbbc[_0x4112f0][_0xcb30e6('0xe4')]||new RegExp(_0x5f2f30[_0xcb30e6('0x6c')](_0x87f8dd,_0x3dfb0d,_0x6c1342,_0x2ced4f),'i'),_0x16fbbc[_0x4112f0][_0xcb30e6('0xc1')]=_0x16fbbc[_0x4112f0]['notetag3']||new RegExp(_0x5f2f30[_0xcb30e6('0x6c')](_0x32d12d,_0x3dfb0d,_0x6c1342,_0x235e13),'i'),_0x16fbbc[_0x4112f0][_0xcb30e6('0x73')]=_0x16fbbc[_0x4112f0][_0xcb30e6('0x73')]||new RegExp(_0x5f2f30[_0xcb30e6('0x6c')](_0x87f8dd,_0x3dfb0d,_0x6c1342,_0x235e13),'i');}const _0x5dce2d=_0xcb30e6('0x93'),_0x5975f7=_0xcb30e6('0x5a')[_0xcb30e6('0x6c')](_0x3dfb0d,_0x6c1342);_0x16fbbc[_0x5975f7]=_0x16fbbc[_0x5975f7]||{},_0x16fbbc[_0x5975f7][_0xcb30e6('0x1e')]=_0x16fbbc[_0x5975f7][_0xcb30e6('0x1e')]||new RegExp(_0x5dce2d[_0xcb30e6('0x6c')](_0x3dfb0d,_0x6c1342,_0x2ced4f),'i'),_0x16fbbc[_0x5975f7][_0xcb30e6('0xe4')]=_0x16fbbc[_0x5975f7][_0xcb30e6('0xe4')]||new RegExp(_0x5dce2d[_0xcb30e6('0x6c')](_0x3dfb0d,_0x6c1342,_0x235e13),'i');const _0x1a693e=(_0x28a2fb,_0x59b812)=>{const _0x51f6b5=_0xcb30e6;if('BMHdG'===_0x51f6b5('0xeb')){if(!_0x59b812)return _0x28a2fb;const _0x2f6468=_0x59b812['note'];if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x39685f][_0x51f6b5('0x1e')])){if('siluO'!==_0x51f6b5('0xb1')){var _0x59f5de=Number(RegExp['$1'])/0x64;_0x28a2fb*=_0x59f5de;}else{function _0x145a7f(){const _0x1684f7=_0x51f6b5;_0x21ffa8('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x985c86,_0x3b14ea)),_0x199417[_0x1684f7('0xc8')]();}}}if(_0x2f6468['match'](_0x16fbbc[_0x39685f][_0x51f6b5('0xe4')])){var _0x59f5de=Number(RegExp['$1'])/0x64;_0x28a2fb*=_0x59f5de;}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x39685f]['notetag3'])){var _0x59f5de=Number(RegExp['$1']);_0x28a2fb*=_0x59f5de;}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x39685f][_0x51f6b5('0x73')])){var _0x59f5de=Number(RegExp['$1']);_0x28a2fb*=_0x59f5de;}for(const _0x2e2b35 of _0x291adc){const _0x1978fb=_0x51f6b5('0xb0')[_0x51f6b5('0x6c')](_0x2e2b35,_0x3dfb0d,_0x6c1342);if(_0x2f6468['match'](_0x16fbbc[_0x1978fb]['notetag1'])){var _0x59f5de=Number(RegExp['$1'])/0x64;_0x28a2fb*=_0x59f5de;}if(_0x2f6468['match'](_0x16fbbc[_0x1978fb][_0x51f6b5('0xe4')])){var _0x59f5de=Number(RegExp['$1'])/0x64;_0x28a2fb*=_0x59f5de;}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x1978fb][_0x51f6b5('0xc1')])){var _0x59f5de=Number(RegExp['$1']);_0x28a2fb*=_0x59f5de;}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x1978fb][_0x51f6b5('0x73')])){var _0x59f5de=Number(RegExp['$1']);_0x28a2fb*=_0x59f5de;}}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x5975f7][_0x51f6b5('0x1e')])){var _0x59f5de=Number(RegExp['$1'])/0x64;_0x28a2fb*=_0x59f5de;}if(_0x2f6468[_0x51f6b5('0xbd')](_0x16fbbc[_0x5975f7]['notetag2'])){var _0x59f5de=Number(RegExp['$1']);_0x28a2fb*=_0x59f5de;}return _0x28a2fb;}else{function _0x479244(){this['applyWarmup'](_0x13aec4,_0x652d63(_0x2a26e2['$1']));}}};return this[_0xcb30e6('0xcc')]()['reduce'](_0x1a693e,0x1);},VisuMZ[_0x489946('0x8e')][_0x489946('0x65')]=Game_Battler[_0x489946('0x1a')]['onBattleStart'],Game_Battler[_0x489946('0x1a')]['onBattleStart']=function(_0x3d2273){const _0x289919=_0x489946;VisuMZ[_0x289919('0x8e')][_0x289919('0x65')]['call'](this,_0x3d2273),this[_0x289919('0x86')](),this[_0x289919('0xe8')](),this['prepareSkillWarmups'](_0x3d2273);},Game_Battler[_0x489946('0x1a')][_0x489946('0xdc')]=function(_0x3f243a){const _0x2565b2=_0x489946;for(const _0x38a6c5 of this[_0x2565b2('0x14')]()){if(!_0x38a6c5)continue;const _0x1e46d6=_0x38a6c5['id'],_0x282a32=_0x38a6c5['note'];if(_0x282a32[_0x2565b2('0xbd')](/<WARMUP:[ ](\d+)>/i)){if('mjcCO'===_0x2565b2('0xbc')){function _0x432cba(){const _0x3bf0bf=_0x2565b2;this[_0x3bf0bf('0xed')]()[_0x3bf0bf('0x3d')](_0x2e972b['id'],_0x3367e0);}}else this[_0x2565b2('0x2d')](_0x1e46d6,Number(RegExp['$1']));}if(VisuMZ[_0x2565b2('0x8e')][_0x2565b2('0x12')][_0x38a6c5['id']]){if(_0x2565b2('0xa1')!==_0x2565b2('0x74'))VisuMZ[_0x2565b2('0x8e')][_0x2565b2('0x12')][_0x38a6c5['id']][_0x2565b2('0xaa')](this,_0x38a6c5);else{function _0x36623c(){const _0x2ffbfa=_0x2565b2;if(_0x5572b6){const _0x5d4bf4=_0x2846da[_0x2ffbfa('0x8b')](_0xbf33bf);_0x5d4bf4[_0x2ffbfa('0xf4')](_0x4f388c)&&_0x142ee6[_0x2ffbfa('0x3d')](_0x42bd03['id'],_0x52c169);}}}}}if(_0x3f243a){const _0x2ea929=VisuMZ[_0x2565b2('0x8e')]['Settings'][_0x2565b2('0xb9')][_0x2565b2('0xe1')]||0x0;this['updateWarmups'](_0x2ea929);}},Game_Battler[_0x489946('0x1a')][_0x489946('0xe7')]=function(){const _0x1fbf8b=_0x489946;if(this[_0x1fbf8b('0x7b')])return;if(this[_0x1fbf8b('0xa')])return;this['_updatedSkillCooldowns']=!![],this[_0x1fbf8b('0xdb')](),this[_0x1fbf8b('0x77')]();},VisuMZ[_0x489946('0x8e')][_0x489946('0x42')]=Game_Battler[_0x489946('0x1a')]['onTurnEnd'],Game_Battler[_0x489946('0x1a')][_0x489946('0xa8')]=function(){const _0x549e59=_0x489946;this['_updatedSkillCooldowns']=![],VisuMZ[_0x549e59('0x8e')][_0x549e59('0x42')]['call'](this);},VisuMZ[_0x489946('0x8e')]['Game_Battler_onBattleEnd']=Game_Battler[_0x489946('0x1a')][_0x489946('0x84')],Game_Battler[_0x489946('0x1a')][_0x489946('0x84')]=function(){const _0x91b477=_0x489946;VisuMZ[_0x91b477('0x8e')][_0x91b477('0x53')][_0x91b477('0xaa')](this),this['clearCooldowns'](),this['clearWarmups']();},VisuMZ[_0x489946('0x8e')]['Window_Base_drawSkillCost']=Window_Base['prototype'][_0x489946('0x15')],Window_Base['prototype'][_0x489946('0x15')]=function(_0x51878f,_0x446e37,_0x563f5c,_0x1022bc,_0x185615){const _0xb3a1a2=_0x489946,_0x16cae1=VisuMZ[_0xb3a1a2('0x8e')]['Settings'];if(_0x16cae1[_0xb3a1a2('0xb9')][_0xb3a1a2('0xef')]&&_0x51878f[_0xb3a1a2('0xc5')](_0x446e37['id'])>0x0){if('YnSWE'===_0xb3a1a2('0x29'))this[_0xb3a1a2('0x92')](_0x51878f,_0x446e37,_0x563f5c,_0x1022bc,_0x185615);else{function _0x40926d(){const _0x20ce94=_0xb3a1a2;_0x512678[_0x20ce94('0x3d')](_0x5a1fef['id'],_0x26be40);}}}else _0x16cae1[_0xb3a1a2('0xdf')][_0xb3a1a2('0xef')]&&_0x51878f[_0xb3a1a2('0x11')](_0x446e37['id'])>0x0?this[_0xb3a1a2('0x6')](_0x51878f,_0x446e37,_0x563f5c,_0x1022bc,_0x185615):VisuMZ[_0xb3a1a2('0x8e')][_0xb3a1a2('0x19')]['call'](this,_0x51878f,_0x446e37,_0x563f5c,_0x1022bc,_0x185615);},Window_Base[_0x489946('0x1a')][_0x489946('0x92')]=function(_0xf03970,_0x37f92e,_0x56b786,_0x3423a2,_0x374efc){const _0x59cd64=_0x489946,_0x2b6156=VisuMZ[_0x59cd64('0x8e')][_0x59cd64('0xe5')][_0x59cd64('0xb9')];let _0x5b80b9='';_0x5b80b9+=_0x59cd64('0x32')[_0x59cd64('0x6c')](_0x2b6156[_0x59cd64('0x13')]);const _0x2dd3a1=_0x2b6156[_0x59cd64('0x9b')];if(_0x2dd3a1[_0x59cd64('0xbd')](/#(.*)/i)&&Imported[_0x59cd64('0x5e')]){if(_0x59cd64('0x6d')===_0x59cd64('0x6d'))_0x5b80b9+=_0x59cd64('0x63')[_0x59cd64('0x6c')](String(RegExp['$1']));else{function _0xa2b2f7(){_0x43d771=_0x3077b3(_0x24f947['$1']),_0x39a90f=_0x316b91(_0x1ec65e['$2']);}}}else{if(_0x59cd64('0x4b')===_0x59cd64('0x80')){function _0x1bdb7d(){const _0x153599=_0x59cd64,_0x171ffc=_0x492267[_0x153599('0x8b')](_0x5594df);_0x171ffc[_0x153599('0xf4')](_0x3fc0fa)&&this[_0x153599('0xed')]()['addWarmup'](_0x16cc32['id'],_0x24d28f);}}else _0x5b80b9+=_0x59cd64('0xab')[_0x59cd64('0x6c')](_0x2dd3a1);}const _0x2d1ac4=_0xf03970[_0x59cd64('0x89')](_0x37f92e['id']),_0x10a707=_0x2b6156['Icon']>0x0?_0x59cd64('0xf6')[_0x59cd64('0x6c')](_0x2b6156[_0x59cd64('0x33')]):'';_0x5b80b9+=_0x2b6156[_0x59cd64('0xc')][_0x59cd64('0x6c')](_0x2d1ac4,_0x10a707);const _0xdc001c=this['textSizeEx'](_0x5b80b9,_0x56b786,_0x3423a2,_0x374efc),_0x334d16=_0x56b786+_0x374efc-_0xdc001c[_0x59cd64('0x67')];this['drawTextEx'](_0x5b80b9,_0x334d16,_0x3423a2,_0x374efc),this[_0x59cd64('0x23')]();},Window_Base[_0x489946('0x1a')]['drawSkillCooldown']=function(_0x1263cc,_0x325c9a,_0x411df7,_0xc0988a,_0x598d91){const _0x5386ac=_0x489946,_0x3b8116=VisuMZ[_0x5386ac('0x8e')][_0x5386ac('0xe5')][_0x5386ac('0xdf')];let _0xbdd6d2='';_0xbdd6d2+=_0x5386ac('0x32')['format'](_0x3b8116[_0x5386ac('0x13')]);const _0x33f801=_0x3b8116['FontColor'];if(_0x33f801[_0x5386ac('0xbd')](/#(.*)/i)&&Imported[_0x5386ac('0x5e')]){if('NCPMH'==='fSAXU'){function _0x4e3bd8(){const _0x2dc0a3=_0x5386ac,_0x38f2bf=_0x4c00aa[_0x2dc0a3('0x8e')][_0x2dc0a3('0xe5')];if(_0x38f2bf[_0x2dc0a3('0xb9')][_0x2dc0a3('0xef')]&&_0x481204[_0x2dc0a3('0xc5')](_0x36c6d2['id'])>0x0)this[_0x2dc0a3('0x92')](_0x5dbbdd,_0x29f256,_0x3019dd,_0xaae6d9,_0x2d4358);else _0x38f2bf[_0x2dc0a3('0xdf')][_0x2dc0a3('0xef')]&&_0x330a4e[_0x2dc0a3('0x11')](_0x45a209['id'])>0x0?this[_0x2dc0a3('0x6')](_0x247dc9,_0xcd9606,_0x57634b,_0xc0e07a,_0x1876fa):_0x3717d4[_0x2dc0a3('0x8e')][_0x2dc0a3('0x19')][_0x2dc0a3('0xaa')](this,_0x500f31,_0x3a7b8a,_0x108592,_0x4ede3b,_0x48b140);}}else _0xbdd6d2+=_0x5386ac('0x63')['format'](String(RegExp['$1']));}else{if(_0x5386ac('0x50')!==_0x5386ac('0x50')){function _0x1c27de(){const _0x270623=_0x5386ac;_0x37c2af[_0x270623('0x8e')]['onCooldownReadyJS'][_0x29c3d6]['call'](this,_0x208480);}}else _0xbdd6d2+=_0x5386ac('0xab')[_0x5386ac('0x6c')](_0x33f801);}const _0xd35a88=_0x1263cc[_0x5386ac('0x11')](_0x325c9a['id']),_0x140abe=_0x3b8116['Icon']>0x0?'\x5cI[%1]'[_0x5386ac('0x6c')](_0x3b8116[_0x5386ac('0x33')]):'';_0xbdd6d2+=_0x3b8116[_0x5386ac('0xc')][_0x5386ac('0x6c')](_0xd35a88,_0x140abe);const _0x5896aa=this[_0x5386ac('0xc0')](_0xbdd6d2,_0x411df7,_0xc0988a,_0x598d91),_0x19718e=_0x411df7+_0x598d91-_0x5896aa[_0x5386ac('0x67')];this[_0x5386ac('0x9f')](_0xbdd6d2,_0x19718e,_0xc0988a,_0x598d91),this[_0x5386ac('0x23')]();};