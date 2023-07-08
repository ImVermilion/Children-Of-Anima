//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.09] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0xa818=['onExpireStateGlobalJS','center','drawActorStateTurns','addPassiveStates','drawActorStateData','description','_stateOrigin','format','onEraseDebuffJS','Window_SkillStatus_refresh','addStateTurns','Game_Actor_skillTypes','DEF','number','isActor','Game_BattlerBase_overwriteBuffTurns','onEraseBuff','skillTypeWindowRectSkillsStatesCore','createItemWindow','Sprite_Gauge_currentMaxValue','addPassiveStatesByPluginParameters','useDigitGrouping','return\x200','windowPadding','ShowData','isAlive','skillTypes','_stateData','drawActorIconsAllTurnCounters','ShowJS','push','statePassiveConditionJS','setPassiveStateSlipDamageJS','isStateRemoved','ARRAYNUM','getStateData','getClassIdWithName','getCurrentStateActiveUser','_costSettings','initialize','checkSkillTypeMatch','concat','autoRemovalTiming','GaugeCurrentJS','addDebuff','mainAreaTop','note','ceil','tpCost','onAddBuffGlobalJS','Enemy','ignore','indexOf','addWindow','addCommand','isStateResist','reset','slipTp','_stateIDs','Sprite_Gauge_currentValue','checkShowHideBattleNotetags','decreaseBuff','applyBuffTurnManipulationEffects','isBuffExpired','mainFontFace','DataOffsetX','commandName','none','skillEnableJS','_battler','constructor','floor','Costs','drawText','allIcons','filter','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','placeExactGauge','setStypeId','skillCostSeparator','process_VisuMZ_SkillsStatesCore_State_Notetags','buff','onExpireStateCustomJS','hasSkill','clear','changeOutlineColor','user','index','value','enemyId','Game_BattlerBase_eraseState','Global','isGroupDefeatStateAffected','applySkillsStatesCoreEffects','canUse','contents','_stateDisplay','ReapplyRules','clearStateData','isPartyAllAffectedByGroupDefeatStates','VisuMZ_1_ItemsEquipsCore','updatedLayoutStyle','width','itemLineRect','addBuffTurns','states','_stypeIDs','shopStatusWidth','passiveStates','_skillTypeWindow','Window_SkillType_initialize','onExpireStateJS','createTurnDisplaySprite','isStateAddable','113PxHLqq','add','Scene_Skill_statusWindowRect','Scene_Skill_skillTypeWindowRect','Game_Troop_setup','Window_SkillList_maxCols','allowCreateShopStatusWindow','57251acimvA','parameters','Game_BattlerBase_decreaseBuff','_buffTurns','onExpireDebuffGlobalJS','Parse_Notetags_State_ApplyRemoveLeaveJS','stateTurns','skillTpCost','<troop-%1>','Actor','callUpdateHelp','getStypeIdWithName','updateTurnDisplaySprite','onRegenerateCustomStateDamageOverTime','onAddBuff','Sprite_StateIcon_updateFrame','clearStateOrigin','DataFontSize','height','max','skillMpCost','split','lineHeight','eraseBuff','stateMaximumTurns','removeStatesByCategory','Window_StatusBase_drawActorIcons','Game_BattlerBase_skillMpCost','MDF','resetStateCounts','Game_Battler_isStateAddable','initMembers','makeCurrentTroopUniqueID','TurnOffsetX','maxCols','ColorPositive','_stypeId','ParseSkillNotetags','active','convertGaugeTypeSkillsStatesCore','makeAdditionalSkillCostText','191368QZZGlZ','itemAt','Sprite_Gauge_setup','Game_BattlerBase_recoverAll','calcWindowHeight','endAction','Game_BattlerBase_buffIconIndex','match','uiHelpPosition','450451LHQcVD','209015bJDuuU','resetTextColor','DataOffsetY','death','TurnFontSize','onExpireDebuffJS','setActor','commandNameWindowDrawBackground','equips','stateColor','_skillIDs','_scene','log','onEraseStateGlobalJS','debuffColor','Param','ANY','_statusWindow','isBuffAffected','innerWidth','LayoutStyle','totalStateCategory','paramValueByName','isPassiveStateStackable','getStateReapplyRulings','textSizeEx','1147iCXint','stateData','getSkillTypes','LUK','makeCommandName','iconIndex','icon','_classIDs','Scene_Boot_onDatabaseLoaded','meetsSkillConditionsGlobalJS','increaseBuff','GroupDigits','mainFontSize','onAddDebuffJS','VisuMZ_2_ClassChangeSystem','totalStateCategoryAffected','updateStatesActionEnd','currentValueSkillsStatesCore','Game_Action_applyItemUserEffect','isPlaytest','Buffs','CanPayJS','statusWindowRect','item','_states','CmdStyle','updateHelp','MultiplierJS','Game_BattlerBase_die','BattleManager_endAction','call','MAXHP','isDebuffAffected','meetsPassiveStateConditions','applyDebuffTurnManipulationEffects','onAddStateMakeCustomSlipValues','_currentTroopUniqueID','onExpireBuffGlobalJS','helpWindowRect','normalColor','meetsSkillConditions','frameCount','IconStypeMagic','SkillSceneAdjustSkillList','onRemoveState','_shopStatusWindow','recoverAll','Skills','uiMenuStyle','removeBuffsAuto','ARRAYEVAL','Parse_Notetags_Skill_Cost','bitmap','includes','boxWidth','States','VisuMZ_1_MainMenuCore','drawItemStyleIcon','Game_BattlerBase_meetsSkillConditions','length','addDebuffTurns','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','adjustItemWidthByShopStatus','hasState','_stored_debuffColor','eraseState','statusWidth','Window_SkillList_includes','onAddStateCustomJS','IconStypeNorm','NUM','gaugeRate','_stateTurns','setStateTurns','multiclasses','applyStateTurnManipulationEffects','slipMp','slice','setupSkillsStatesCore','TextJS','isStateExpired','onAddDebuff','Game_Battler_addBuff','stateHpSlipDamageJS','currentDisplayedValue','checkCacheKey','gainSilentTp','GaugeMaxJS','fillRect','StackBuffMax','currentClass','stateId','79861zRqLIK','setItem','CoreEngine','onExpireState','%1\x20%2\x20%3','replace','prototype','iconText','addPassiveStatesFromOtherPlugins','parse','STRUCT','1KUdXif','addPassiveStatesByNotetag','Game_BattlerBase_skillTpCost','checkShowHideSkillNotetags','meetsSkillConditionsEnableJS','_subject','getCurrentStateOriginKey','ColorDebuff','retrieveStateColor','keys','shopStatusWindowRect','AGI','onAddBuffJS','onEraseDebuff','gradientFillRect','TurnOffsetY','meetsPassiveStateConditionSwitches','isSkillUsableForAutoBattle','helpAreaHeight','hasStateCategory','createShopStatusWindow','trim','checkShowHideJS','actorId','currentMaxValueSkillsStatesCore','changeTextColor','skillTypeWindowRect','buttonAssistText1','meetsStateCondition','meetsPassiveStateGlobalConditionJS','addPassiveStatesTraitSets','version','PassiveStates','loadBitmap','getStateRetainType','stateEraseJS','JSON','isStateRestrict','stateExpireJS','itemWindowRectSkillsStatesCore','updateCommandNameWindow','getColorDataFromPluginParameters','toUpperCase','process_VisuMZ_SkillsStatesCore_Notetags','rgba(0,\x200,\x200,\x201)','ARRAYSTRUCT','onEraseBuffGlobalJS','meetsPassiveStateConditionJS','helpAreaTop','innerHeight','slipHp','sort','_buffs','mpCost','getStateOrigin','drawItem','passiveStateObjects','onExpireBuffJS','process_VisuMZ_SkillsStatesCore_Skill_Notetags','_actor','isBuffOrDebuffAffected','convertTargetToStateOriginKey','drawActorBuffRates','clearStateRetainType','getStateIdWithName','drawActorBuffTurns','regenerateAll','overwriteBuffTurns','Game_Battler_addState','Game_BattlerBase_initMembers','Game_BattlerBase_resetStateCounts','ConvertParams','Game_BattlerBase_clearStates','includesSkillsStatesCore','MAXMP','<member-%1>','Game_BattlerBase_increaseBuff','commandStyle','_stateMaxTurns','skills','setStateData','Sprite_Gauge_redraw','buffColor','commandNameWindowCenter','updateFrame','_result','drawSkillCost','setStateDisplay','ParseClassIDs','Game_BattlerBase_states','onAddStateGlobalJS','recover\x20all','applyStateCategoryRemovalEffects','ATK','enemy','Window_SkillList_updateHelp','stateHpSlipHealJS','Game_Battler_addDebuff','onAddDebuffGlobalJS','stateMpSlipDamageJS','#%1','Name','statusWindowRectSkillsStatesCore','HiddenSkillTypes','setDebuffTurns','mainCommandWidth','canClearState','helpWindowRectSkillsStatesCore','ColorNeutral','STR','Sprite_Gauge_initMembers','clearStateDisplay','categories','isStateAffected','name','success','GaugeDrawJS','\x5cI[%1]%2','11fRjFBP','drawIcon','commandStyleCheck','skillId','createAllSkillCostText','state','itemTextAlign','isMaxBuffAffected','commandNameWindowDrawText','getStateOriginByKey','remove','PassiveConditionJS','Scene_Skill_createItemWindow','iconHeight','addChild','setStatusWindow','toLowerCase','isSkillCostShown','_categoryWindow','ARRAYSTR','Scene_Skill_itemWindowRect','isRightInputMode','3nwoMtD','Window_SkillList_setActor','DisplayedParams','_stored_state-%1-color','Parse_Notetags_State_Category','resetFontSettings','SkillsStatesCore','isStateCategoryAffected','getSkillIdWithName','exit','paramBuffRate','isUseSkillsStatesCoreUpdatedLayout','_itemWindow','opacity','right','checkSkillConditionsSwitchNotetags','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','actions','currentValue','convertPassiveStates','Parse_Notetags_State_SlipEffectJS','checkShowHideSwitchNotetags','EnableLayout','createSkillCostText','drawItemStyleIconText','drawActorIcons','learnSkill','checkShowHideNotetags','ALL','drawExtendedSkillsStatesCoreStatus','ListWindowCols','initMembersSkillsStatesCore','actor','fontSize','FUNC','Game_BattlerBase_eraseBuff','setup','itemWindowRect','Scene_Skill_helpWindowRect','currentMaxValue','regenerateAllSkillsStatesCore','POSITIVE','24597KmccrA','ShowTurns','stateTpSlipDamageJS','statesByCategory','Parse_Notetags_State_PassiveJS','onExpireBuff','magicSkills','priority','inBattle','stateMpSlipHealJS','skill','buffIconIndex','_commandNameWindow','iconWidth','text','drawTextEx','Settings','getCurrentTroopUniqueID','SkillMenuStatusRect','buffTurns','changePaintOpacity','gainMp','Window_StatusBase_placeGauge','Game_BattlerBase_refresh','isLearnedSkill','refresh','Game_Actor_forgetSkill','anchor','damage','greater','ColorNegative','_colorCache','removeStatesAuto','heal','fontFace','VisuMZ_1_ElementStatusCore','ParseStateNotetags','MaxTurns','_stateRetainType','buffLength','map','1XEZsvg','setStateOrigin','stateAddJS','Sprite_StateIcon_loadBitmap','fontBold','onAddState','makeSuccess','clearStates','skillVisibleJS','Parse_Notetags_Skill_JS','stateTpSlipHealJS','ShowShopStatus','Game_Unit_isAllDead','shift','gaugeLineHeight','_turnDisplaySprite','shopStatusWindowRectSkillsStatesCore','onExpireDebuff','applyItemUserEffect','removeState','mainAreaHeight','maxItems','placeGauge','setBuffTurns','groupDefeat','ActionEndUpdate','menuActor','checkSkillConditionsNotetags','_cache','isUseModernControls','round','scrollTo','onEraseStateJS','CalcJS','meetsPassiveStateConditionClasses','ParseAllNotetags','_stored_buffColor','VisuMZ_0_CoreEngine','clamp','Game_Actor_learnSkill','_currentActor','textColor','drawExtendedParameter','buttonAssistSwitch','outlineColor','isAllDead','onDatabaseLoaded'];const _0x5cc3=function(_0x2ebc78,_0x2fc231){_0x2ebc78=_0x2ebc78-0x1ae;let _0xa8185d=_0xa818[_0x2ebc78];return _0xa8185d;};const _0x24ad3f=_0x5cc3;(function(_0x35a67a,_0x4d4fe7){const _0x58d989=_0x5cc3;while(!![]){try{const _0x5bafee=parseInt(_0x58d989(0x344))*parseInt(_0x58d989(0x2f0))+parseInt(_0x58d989(0x1fc))*-parseInt(_0x58d989(0x3a0))+-parseInt(_0x58d989(0x320))+parseInt(_0x58d989(0x226))*-parseInt(_0x58d989(0x1e6))+-parseInt(_0x58d989(0x3ab))*-parseInt(_0x58d989(0x32a))+parseInt(_0x58d989(0x2f7))+-parseInt(_0x58d989(0x329))*-parseInt(_0x58d989(0x24f));if(_0x5bafee===_0x4d4fe7)break;else _0x35a67a['push'](_0x35a67a['shift']());}catch(_0x225882){_0x35a67a['push'](_0x35a67a['shift']());}}}(_0xa818,0x235aa));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x24ad3f(0x2c9)](function(_0x5ac362){const _0x1f9095=_0x24ad3f;return _0x5ac362['status']&&_0x5ac362[_0x1f9095(0x283)][_0x1f9095(0x379)]('['+label+']');})[0x0];VisuMZ[label][_0x24ad3f(0x236)]=VisuMZ[label][_0x24ad3f(0x236)]||{},VisuMZ[_0x24ad3f(0x1b7)]=function(_0x49c044,_0x1ece5b){const _0x820325=_0x24ad3f;for(const _0x18f2ce in _0x1ece5b){if(_0x18f2ce[_0x820325(0x327)](/(.*):(.*)/i)){const _0x120eb7=String(RegExp['$1']),_0x4cdbbe=String(RegExp['$2'])[_0x820325(0x3d5)]()[_0x820325(0x3c0)]();let _0x502142,_0x329ac2,_0xff1b45;switch(_0x4cdbbe){case _0x820325(0x38a):_0x502142=_0x1ece5b[_0x18f2ce]!==''?Number(_0x1ece5b[_0x18f2ce]):0x0;break;case _0x820325(0x2a0):_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0x271152=>Number(_0x271152));break;case'EVAL':_0x502142=_0x1ece5b[_0x18f2ce]!==''?eval(_0x1ece5b[_0x18f2ce]):null;break;case _0x820325(0x376):_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0x9fe9bb=>eval(_0x9fe9bb));break;case _0x820325(0x3cf):_0x502142=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):'';break;case'ARRAYJSON':_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON['parse'](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0xbdadac=>JSON[_0x820325(0x3a9)](_0xbdadac));break;case _0x820325(0x21e):_0x502142=_0x1ece5b[_0x18f2ce]!==''?new Function(JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce])):new Function(_0x820325(0x294));break;case'ARRAYFUNC':_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0x581e25=>new Function(JSON['parse'](_0x581e25)));break;case _0x820325(0x1dd):_0x502142=_0x1ece5b[_0x18f2ce]!==''?String(_0x1ece5b[_0x18f2ce]):'';break;case _0x820325(0x1f9):_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0x50b0ce=>String(_0x50b0ce));break;case _0x820325(0x3aa):_0xff1b45=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):{},_0x49c044[_0x120eb7]={},VisuMZ[_0x820325(0x1b7)](_0x49c044[_0x120eb7],_0xff1b45);continue;case _0x820325(0x3d8):_0x329ac2=_0x1ece5b[_0x18f2ce]!==''?JSON[_0x820325(0x3a9)](_0x1ece5b[_0x18f2ce]):[],_0x502142=_0x329ac2[_0x820325(0x24e)](_0x37e99c=>VisuMZ[_0x820325(0x1b7)]({},JSON[_0x820325(0x3a9)](_0x37e99c)));break;default:continue;}_0x49c044[_0x120eb7]=_0x502142;}}return _0x49c044;},(_0x48e881=>{const _0x588382=_0x24ad3f,_0x467bed=_0x48e881[_0x588382(0x1e2)];for(const _0x84bc8f of dependencies){if(!Imported[_0x84bc8f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x588382(0x285)](_0x467bed,_0x84bc8f)),SceneManager[_0x588382(0x205)]();break;}}const _0x49713a=_0x48e881[_0x588382(0x283)];if(_0x49713a['match'](/\[Version[ ](.*?)\]/i)){const _0x5ad9c8=Number(RegExp['$1']);_0x5ad9c8!==VisuMZ[label][_0x588382(0x3ca)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x588382(0x285)](_0x467bed,_0x5ad9c8)),SceneManager[_0x588382(0x205)]());}if(_0x49713a[_0x588382(0x327)](/\[Tier[ ](\d+)\]/i)){const _0x572ad3=Number(RegExp['$1']);_0x572ad3<tier?(alert(_0x588382(0x2ca)[_0x588382(0x285)](_0x467bed,_0x572ad3,tier)),SceneManager['exit']()):tier=Math[_0x588382(0x30a)](_0x572ad3,tier);}VisuMZ[_0x588382(0x1b7)](VisuMZ[label][_0x588382(0x236)],_0x48e881[_0x588382(0x2f8)]);})(pluginData),VisuMZ['SkillsStatesCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x24ad3f(0x3a6)][_0x24ad3f(0x27d)],Scene_Boot['prototype'][_0x24ad3f(0x27d)]=function(){const _0x29937c=_0x24ad3f;VisuMZ['SkillsStatesCore'][_0x29937c(0x34c)][_0x29937c(0x362)](this),this[_0x29937c(0x3d6)]();},Scene_Boot['prototype'][_0x24ad3f(0x3d6)]=function(){const _0x346868=_0x24ad3f;if(VisuMZ[_0x346868(0x272)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x346868(0x2ce)]();},Scene_Boot['prototype'][_0x24ad3f(0x3e5)]=function(){const _0x524d99=_0x24ad3f;for(const _0x4e3a1a of $dataSkills){if(!_0x4e3a1a)continue;VisuMZ[_0x524d99(0x202)][_0x524d99(0x377)](_0x4e3a1a),VisuMZ['SkillsStatesCore'][_0x524d99(0x258)](_0x4e3a1a);}},Scene_Boot['prototype'][_0x24ad3f(0x2ce)]=function(){const _0x2d6fe2=_0x24ad3f;for(const _0x313582 of $dataStates){if(!_0x313582)continue;VisuMZ[_0x2d6fe2(0x202)][_0x2d6fe2(0x200)](_0x313582),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_PassiveJS'](_0x313582),VisuMZ[_0x2d6fe2(0x202)][_0x2d6fe2(0x210)](_0x313582),VisuMZ[_0x2d6fe2(0x202)][_0x2d6fe2(0x2fc)](_0x313582);}},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x31c)]=VisuMZ[_0x24ad3f(0x31c)],VisuMZ['ParseSkillNotetags']=function(_0x30ea7a){const _0x4d5076=_0x24ad3f;VisuMZ[_0x4d5076(0x202)][_0x4d5076(0x31c)]['call'](this,_0x30ea7a),VisuMZ[_0x4d5076(0x202)][_0x4d5076(0x377)](_0x30ea7a),VisuMZ[_0x4d5076(0x202)]['Parse_Notetags_Skill_JS'](_0x30ea7a);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x24a)]=VisuMZ[_0x24ad3f(0x24a)],VisuMZ[_0x24ad3f(0x24a)]=function(_0x57a182){const _0x5e4fe4=_0x24ad3f;VisuMZ[_0x5e4fe4(0x202)][_0x5e4fe4(0x24a)][_0x5e4fe4(0x362)](this,_0x57a182),VisuMZ['SkillsStatesCore'][_0x5e4fe4(0x200)](_0x57a182),VisuMZ[_0x5e4fe4(0x202)][_0x5e4fe4(0x22a)](_0x57a182),VisuMZ['SkillsStatesCore'][_0x5e4fe4(0x210)](_0x57a182),VisuMZ[_0x5e4fe4(0x202)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x57a182);},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x377)]=function(_0x1f2abd){const _0x57331a=_0x24ad3f,_0x557892=_0x1f2abd[_0x57331a(0x2ac)];_0x557892[_0x57331a(0x327)](/<MP COST:[ ](\d+)>/i)&&(_0x1f2abd[_0x57331a(0x3e0)]=Number(RegExp['$1'])),_0x557892['match'](/<TP COST:[ ](\d+)>/i)&&(_0x1f2abd[_0x57331a(0x2ae)]=Number(RegExp['$1']));},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x2c2)]={},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x257)]={},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x258)]=function(_0x51d5df){const _0x3a8f08=_0x24ad3f,_0x54315c=_0x51d5df[_0x3a8f08(0x2ac)];if(_0x54315c[_0x3a8f08(0x327)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x5a8252=String(RegExp['$1']),_0x45d936=_0x3a8f08(0x381)['format'](_0x5a8252);VisuMZ['SkillsStatesCore'][_0x3a8f08(0x2c2)][_0x51d5df['id']]=new Function(_0x3a8f08(0x230),_0x45d936);}if(_0x54315c[_0x3a8f08(0x327)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0xbe8624=String(RegExp['$1']),_0x431109=_0x3a8f08(0x20c)[_0x3a8f08(0x285)](_0xbe8624);VisuMZ['SkillsStatesCore']['skillVisibleJS'][_0x51d5df['id']]=new Function('skill',_0x431109);}},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x200)]=function(_0x14d8dc){const _0x177f6d=_0x24ad3f;_0x14d8dc[_0x177f6d(0x1e0)]=[_0x177f6d(0x218),_0x177f6d(0x33a)];const _0x37fe14=_0x14d8dc[_0x177f6d(0x2ac)],_0x1cf402=_0x37fe14[_0x177f6d(0x327)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x1cf402)for(const _0x354f5b of _0x1cf402){_0x354f5b['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x36a802=String(RegExp['$1'])[_0x177f6d(0x3d5)]()[_0x177f6d(0x3c0)]()[_0x177f6d(0x30c)](',');for(const _0x15165f of _0x36a802){_0x14d8dc['categories'][_0x177f6d(0x29c)](_0x15165f[_0x177f6d(0x3c0)]());}}if(_0x37fe14[_0x177f6d(0x327)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x2abb85=RegExp['$1'][_0x177f6d(0x30c)](/[\r\n]+/);for(const _0x1f8535 of _0x2abb85){_0x14d8dc[_0x177f6d(0x1e0)][_0x177f6d(0x29c)](_0x1f8535['toUpperCase']()[_0x177f6d(0x3c0)]());}}_0x37fe14['match'](/<POSITIVE STATE>/i)&&_0x14d8dc[_0x177f6d(0x1e0)][_0x177f6d(0x29c)](_0x177f6d(0x225)),_0x37fe14[_0x177f6d(0x327)](/<NEGATIVE STATE>/i)&&_0x14d8dc[_0x177f6d(0x1e0)][_0x177f6d(0x29c)]('NEGATIVE');},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x29d)]={},VisuMZ[_0x24ad3f(0x202)]['Parse_Notetags_State_PassiveJS']=function(_0x4a1ffc){const _0x5ba9d4=_0x24ad3f,_0x29b8c4=_0x4a1ffc[_0x5ba9d4(0x2ac)];if(_0x29b8c4['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x27d6d8=String(RegExp['$1']),_0x241d91='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5ba9d4(0x285)](_0x27d6d8);VisuMZ[_0x5ba9d4(0x202)][_0x5ba9d4(0x29d)][_0x4a1ffc['id']]=new Function(_0x5ba9d4(0x1eb),_0x241d91);}},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x397)]={},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1d0)]={},VisuMZ['SkillsStatesCore']['stateMpSlipDamageJS']={},VisuMZ[_0x24ad3f(0x202)]['stateMpSlipHealJS']={},VisuMZ[_0x24ad3f(0x202)]['stateTpSlipDamageJS']={},VisuMZ[_0x24ad3f(0x202)]['stateTpSlipHealJS']={},VisuMZ[_0x24ad3f(0x202)]['Parse_Notetags_State_SlipEffectJS']=function(_0xefa88b){const _0xee7865=_0x24ad3f,_0x38267c=_0xefa88b['note'],_0x54fe53='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x38267c[_0xee7865(0x327)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x1aeb84=String(RegExp['$1']),_0x33cada=_0x54fe53[_0xee7865(0x285)](_0x1aeb84,_0xee7865(0x242),-0x1,_0xee7865(0x3dd));VisuMZ['SkillsStatesCore'][_0xee7865(0x397)][_0xefa88b['id']]=new Function(_0xee7865(0x39f),_0x33cada);}else{if(_0x38267c['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x560fa9=String(RegExp['$1']),_0x2196e8=_0x54fe53['format'](_0x560fa9,_0xee7865(0x247),0x1,_0xee7865(0x3dd));VisuMZ[_0xee7865(0x202)]['stateHpSlipHealJS'][_0xefa88b['id']]=new Function('stateId',_0x2196e8);}}if(_0x38267c['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x2e121e=String(RegExp['$1']),_0x274c19=_0x54fe53[_0xee7865(0x285)](_0x2e121e,_0xee7865(0x242),-0x1,_0xee7865(0x390));VisuMZ[_0xee7865(0x202)][_0xee7865(0x1d3)][_0xefa88b['id']]=new Function(_0xee7865(0x39f),_0x274c19);}else{if(_0x38267c['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x5c713f=String(RegExp['$1']),_0x1a6be0=_0x54fe53['format'](_0x5c713f,'heal',0x1,_0xee7865(0x390));VisuMZ[_0xee7865(0x202)][_0xee7865(0x22f)][_0xefa88b['id']]=new Function(_0xee7865(0x39f),_0x1a6be0);}}if(_0x38267c['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x1b6382=String(RegExp['$1']),_0x526b71=_0x54fe53[_0xee7865(0x285)](_0x1b6382,_0xee7865(0x242),-0x1,_0xee7865(0x2b7));VisuMZ[_0xee7865(0x202)]['stateTpSlipDamageJS'][_0xefa88b['id']]=new Function(_0xee7865(0x39f),_0x526b71);}else{if(_0x38267c[_0xee7865(0x327)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x4cb8e9=String(RegExp['$1']),_0x5b921d=_0x54fe53[_0xee7865(0x285)](_0x4cb8e9,_0xee7865(0x247),0x1,_0xee7865(0x2b7));VisuMZ[_0xee7865(0x202)][_0xee7865(0x259)][_0xefa88b['id']]=new Function('stateId',_0x5b921d);}}},VisuMZ[_0x24ad3f(0x202)]['stateAddJS']={},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x3ce)]={},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x3d1)]={},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2fc)]=function(_0x5212c3){const _0xc821e5=_0x24ad3f,_0x349178=_0x5212c3['note'],_0x58253a='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x349178[_0xc821e5(0x327)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x26b541=String(RegExp['$1']),_0x5eae1b=_0x58253a[_0xc821e5(0x285)](_0x26b541);VisuMZ[_0xc821e5(0x202)][_0xc821e5(0x251)][_0x5212c3['id']]=new Function(_0xc821e5(0x39f),_0x5eae1b);}if(_0x349178[_0xc821e5(0x327)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x59dafc=String(RegExp['$1']),_0x400be5=_0x58253a['format'](_0x59dafc);VisuMZ[_0xc821e5(0x202)][_0xc821e5(0x3ce)][_0x5212c3['id']]=new Function('stateId',_0x400be5);}if(_0x349178['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x1130dc=String(RegExp['$1']),_0x558ed8=_0x58253a[_0xc821e5(0x285)](_0x1130dc);VisuMZ[_0xc821e5(0x202)][_0xc821e5(0x3d1)][_0x5212c3['id']]=new Function('stateId',_0x558ed8);}},DataManager['getClassIdWithName']=function(_0x7b999d){const _0x11f0f1=_0x24ad3f;_0x7b999d=_0x7b999d['toUpperCase']()['trim'](),this[_0x11f0f1(0x34b)]=this[_0x11f0f1(0x34b)]||{};if(this[_0x11f0f1(0x34b)][_0x7b999d])return this[_0x11f0f1(0x34b)][_0x7b999d];for(const _0x3788ce of $dataClasses){if(!_0x3788ce)continue;let _0x48edf7=_0x3788ce[_0x11f0f1(0x1e2)];_0x48edf7=_0x48edf7[_0x11f0f1(0x3a5)](/\x1I\[(\d+)\]/gi,''),_0x48edf7=_0x48edf7[_0x11f0f1(0x3a5)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x48edf7[_0x11f0f1(0x3d5)]()['trim']()]=_0x3788ce['id'];}return this[_0x11f0f1(0x34b)][_0x7b999d]||0x0;},DataManager[_0x24ad3f(0x346)]=function(_0x533455){const _0x3008ed=_0x24ad3f;this[_0x3008ed(0x2e8)]=this[_0x3008ed(0x2e8)]||{};if(this[_0x3008ed(0x2e8)][_0x533455['id']])return this[_0x3008ed(0x2e8)][_0x533455['id']];this['_stypeIDs'][_0x533455['id']]=[_0x533455['stypeId']];if(_0x533455[_0x3008ed(0x2ac)][_0x3008ed(0x327)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x275914=JSON[_0x3008ed(0x3a9)]('['+RegExp['$1'][_0x3008ed(0x327)](/\d+/g)+']');this[_0x3008ed(0x2e8)][_0x533455['id']]=this['_stypeIDs'][_0x533455['id']][_0x3008ed(0x2a7)](_0x275914);}else{if(_0x533455['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x5bbcca=RegExp['$1'][_0x3008ed(0x30c)](',');for(const _0x2650db of _0x5bbcca){const _0x251427=DataManager[_0x3008ed(0x302)](_0x2650db);if(_0x251427)this[_0x3008ed(0x2e8)][_0x533455['id']][_0x3008ed(0x29c)](_0x251427);}}}return this['_stypeIDs'][_0x533455['id']];},DataManager[_0x24ad3f(0x302)]=function(_0x5a1f63){const _0x2b9b94=_0x24ad3f;_0x5a1f63=_0x5a1f63[_0x2b9b94(0x3d5)]()[_0x2b9b94(0x3c0)](),this[_0x2b9b94(0x2e8)]=this['_stypeIDs']||{};if(this[_0x2b9b94(0x2e8)][_0x5a1f63])return this[_0x2b9b94(0x2e8)][_0x5a1f63];for(let _0x5e77c5=0x1;_0x5e77c5<0x64;_0x5e77c5++){if(!$dataSystem['skillTypes'][_0x5e77c5])continue;let _0x1bd1f7=$dataSystem['skillTypes'][_0x5e77c5][_0x2b9b94(0x3d5)]()[_0x2b9b94(0x3c0)]();_0x1bd1f7=_0x1bd1f7[_0x2b9b94(0x3a5)](/\x1I\[(\d+)\]/gi,''),_0x1bd1f7=_0x1bd1f7['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2b9b94(0x2e8)][_0x1bd1f7]=_0x5e77c5;}return this[_0x2b9b94(0x2e8)][_0x5a1f63]||0x0;},DataManager['getSkillIdWithName']=function(_0x3f3261){const _0x5d9cfc=_0x24ad3f;_0x3f3261=_0x3f3261[_0x5d9cfc(0x3d5)]()[_0x5d9cfc(0x3c0)](),this['_skillIDs']=this[_0x5d9cfc(0x334)]||{};if(this[_0x5d9cfc(0x334)][_0x3f3261])return this[_0x5d9cfc(0x334)][_0x3f3261];for(const _0x3cbe32 of $dataSkills){if(!_0x3cbe32)continue;this[_0x5d9cfc(0x334)][_0x3cbe32[_0x5d9cfc(0x1e2)][_0x5d9cfc(0x3d5)]()[_0x5d9cfc(0x3c0)]()]=_0x3cbe32['id'];}return this[_0x5d9cfc(0x334)][_0x3f3261]||0x0;},DataManager[_0x24ad3f(0x1b0)]=function(_0x1b5b0b){const _0x15734c=_0x24ad3f;_0x1b5b0b=_0x1b5b0b['toUpperCase']()[_0x15734c(0x3c0)](),this[_0x15734c(0x2b8)]=this[_0x15734c(0x2b8)]||{};if(this[_0x15734c(0x2b8)][_0x1b5b0b])return this['_stateIDs'][_0x1b5b0b];for(const _0x1d02c5 of $dataStates){if(!_0x1d02c5)continue;this[_0x15734c(0x2b8)][_0x1d02c5[_0x15734c(0x1e2)]['toUpperCase']()[_0x15734c(0x3c0)]()]=_0x1d02c5['id'];}return this[_0x15734c(0x2b8)][_0x1b5b0b]||0x0;},DataManager[_0x24ad3f(0x30f)]=function(_0x1b6783){const _0x18660a=_0x24ad3f;this[_0x18660a(0x1be)]=this[_0x18660a(0x1be)]||{};if(this[_0x18660a(0x1be)][_0x1b6783])return this[_0x18660a(0x1be)][_0x1b6783];return $dataStates[_0x1b6783]['note'][_0x18660a(0x327)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x18660a(0x1be)][_0x1b6783]=Number(RegExp['$1']):this['_stateMaxTurns'][_0x1b6783]=VisuMZ[_0x18660a(0x202)][_0x18660a(0x236)][_0x18660a(0x37b)]['MaxTurns'],this[_0x18660a(0x1be)][_0x1b6783];},ColorManager[_0x24ad3f(0x3d4)]=function(_0x2aead3,_0x281e00){const _0xdad496=_0x24ad3f;return _0x281e00=String(_0x281e00),this[_0xdad496(0x245)]=this[_0xdad496(0x245)]||{},_0x281e00[_0xdad496(0x327)](/#(.*)/i)?this['_colorCache'][_0x2aead3]=_0xdad496(0x1d4)[_0xdad496(0x285)](String(RegExp['$1'])):this[_0xdad496(0x245)][_0x2aead3]=this['textColor'](Number(_0x281e00)),this['_colorCache'][_0x2aead3];},ColorManager['getColor']=function(_0x1db79a){const _0xe76fd=_0x24ad3f;return _0x1db79a=String(_0x1db79a),_0x1db79a['match'](/#(.*)/i)?'#%1'[_0xe76fd(0x285)](String(RegExp['$1'])):this[_0xe76fd(0x278)](Number(_0x1db79a));},ColorManager[_0x24ad3f(0x333)]=function(_0x1299b9){const _0x45b90a=_0x24ad3f;if(typeof _0x1299b9==='number')_0x1299b9=$dataStates[_0x1299b9];const _0x1639ad=_0x45b90a(0x1ff)[_0x45b90a(0x285)](_0x1299b9['id']);this['_colorCache']=this[_0x45b90a(0x245)]||{};if(this[_0x45b90a(0x245)][_0x1639ad])return this['_colorCache'][_0x1639ad];const _0x76b4ce=this[_0x45b90a(0x3b3)](_0x1299b9);return this[_0x45b90a(0x3d4)](_0x1639ad,_0x76b4ce);},ColorManager[_0x24ad3f(0x3b3)]=function(_0x703f48){const _0x5c45a6=_0x24ad3f,_0x2362db=_0x703f48[_0x5c45a6(0x2ac)];if(_0x2362db[_0x5c45a6(0x327)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2362db['match'](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x5c45a6(0x236)][_0x5c45a6(0x37b)][_0x5c45a6(0x31a)];else return _0x2362db[_0x5c45a6(0x327)](/<NEGATIVE STATE>/i)?VisuMZ['SkillsStatesCore']['Settings'][_0x5c45a6(0x37b)][_0x5c45a6(0x244)]:VisuMZ[_0x5c45a6(0x202)][_0x5c45a6(0x236)]['States'][_0x5c45a6(0x1dc)];}},ColorManager[_0x24ad3f(0x1c2)]=function(){const _0x3546c4=_0x24ad3f,_0x3d17ff=_0x3546c4(0x273);this['_colorCache']=this[_0x3546c4(0x245)]||{};if(this[_0x3546c4(0x245)][_0x3d17ff])return this[_0x3546c4(0x245)][_0x3d17ff];const _0x40d821=VisuMZ[_0x3546c4(0x202)]['Settings']['Buffs']['ColorBuff'];return this['getColorDataFromPluginParameters'](_0x3d17ff,_0x40d821);},ColorManager[_0x24ad3f(0x338)]=function(){const _0x5d4381=_0x24ad3f,_0x611f35=_0x5d4381(0x384);this['_colorCache']=this[_0x5d4381(0x245)]||{};if(this[_0x5d4381(0x245)][_0x611f35])return this[_0x5d4381(0x245)][_0x611f35];const _0x1a60bc=VisuMZ[_0x5d4381(0x202)][_0x5d4381(0x236)][_0x5d4381(0x358)][_0x5d4381(0x3b2)];return this[_0x5d4381(0x3d4)](_0x611f35,_0x1a60bc);},VisuMZ[_0x24ad3f(0x202)]['BattleManager_endAction']=BattleManager[_0x24ad3f(0x325)],BattleManager['endAction']=function(){const _0x3ff8f2=_0x24ad3f;this[_0x3ff8f2(0x354)](),VisuMZ['SkillsStatesCore'][_0x3ff8f2(0x361)][_0x3ff8f2(0x362)](this);},BattleManager[_0x24ad3f(0x354)]=function(){const _0x47690f=_0x24ad3f,_0x278109=VisuMZ[_0x47690f(0x202)][_0x47690f(0x236)]['States'];if(!_0x278109)return;if(_0x278109[_0x47690f(0x268)]===![])return;if(!this[_0x47690f(0x3b0)])return;this[_0x47690f(0x3b0)][_0x47690f(0x354)]();},Game_Battler[_0x24ad3f(0x3a6)]['updateStatesActionEnd']=function(){const _0x34804b=_0x24ad3f;for(const _0x5484a1 of this[_0x34804b(0x35c)]){const _0x4a401a=$dataStates[_0x5484a1];if(!_0x4a401a)continue;if(_0x4a401a[_0x34804b(0x2a8)]!==0x1)continue;this[_0x34804b(0x38c)][_0x5484a1]>0x0&&this[_0x34804b(0x38c)][_0x5484a1]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x24ad3f(0x3a6)]['updateStateTurns']=function(){const _0x5a58d2=_0x24ad3f,_0x24c2b7=VisuMZ[_0x5a58d2(0x202)][_0x5a58d2(0x236)][_0x5a58d2(0x37b)];for(const _0xe3748a of this[_0x5a58d2(0x35c)]){const _0x3934c6=$dataStates[_0xe3748a];if(_0x24c2b7&&_0x24c2b7[_0x5a58d2(0x268)]!==![]){if(_0x3934c6&&_0x3934c6[_0x5a58d2(0x2a8)]===0x1)continue;}this[_0x5a58d2(0x38c)][_0xe3748a]>0x0&&this[_0x5a58d2(0x38c)][_0xe3748a]--;}},VisuMZ[_0x24ad3f(0x202)]['Game_Action_applyItemUserEffect']=Game_Action[_0x24ad3f(0x3a6)][_0x24ad3f(0x261)],Game_Action['prototype'][_0x24ad3f(0x261)]=function(_0x59158b){const _0x77f3ff=_0x24ad3f;VisuMZ[_0x77f3ff(0x202)][_0x77f3ff(0x356)]['call'](this,_0x59158b),this['applySkillsStatesCoreEffects'](_0x59158b);},Game_Action[_0x24ad3f(0x3a6)][_0x24ad3f(0x2db)]=function(_0x3d59df){const _0x52f339=_0x24ad3f;this[_0x52f339(0x1cc)](_0x3d59df),this[_0x52f339(0x38f)](_0x3d59df),this[_0x52f339(0x2bc)](_0x3d59df),this[_0x52f339(0x366)](_0x3d59df);},Game_Action['prototype'][_0x24ad3f(0x1cc)]=function(_0x388fa4){const _0x5e3ade=_0x24ad3f;if(_0x388fa4[_0x5e3ade(0x2e7)]()[_0x5e3ade(0x37f)]<=0x0)return;const _0x76333d=this[_0x5e3ade(0x35b)]()[_0x5e3ade(0x2ac)];if(_0x76333d[_0x5e3ade(0x327)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x482f0f=String(RegExp['$1']);_0x388fa4['removeStatesByCategoryAll']();}const _0x475621=_0x76333d[_0x5e3ade(0x327)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x475621)for(const _0x55260e of _0x475621){_0x55260e['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x28e4a9=String(RegExp['$1']),_0x12c63b=Number(RegExp['$2']);_0x388fa4[_0x5e3ade(0x310)](_0x28e4a9,_0x12c63b);}},Game_Action[_0x24ad3f(0x3a6)][_0x24ad3f(0x38f)]=function(_0xfe0731){const _0x22ea94=_0x24ad3f,_0x40515a=this['item']()[_0x22ea94(0x2ac)],_0x57d9a5=_0x40515a[_0x22ea94(0x327)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x57d9a5)for(const _0x127455 of _0x57d9a5){let _0x5ab44e=0x0,_0x2dbe62=0x0;if(_0x127455[_0x22ea94(0x327)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x5ab44e=Number(RegExp['$1']),_0x2dbe62=Number(RegExp['$2']);else _0x127455['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x5ab44e=DataManager[_0x22ea94(0x1b0)](RegExp['$1']),_0x2dbe62=Number(RegExp['$2']));_0xfe0731[_0x22ea94(0x38d)](_0x5ab44e,_0x2dbe62),this[_0x22ea94(0x255)](_0xfe0731);}const _0x1bfe66=_0x40515a[_0x22ea94(0x327)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1bfe66)for(const _0x12b67d of _0x1bfe66){let _0x102bd8=0x0,_0x392f6e=0x0;if(_0x12b67d['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x102bd8=Number(RegExp['$1']),_0x392f6e=Number(RegExp['$2']);else _0x12b67d[_0x22ea94(0x327)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x102bd8=DataManager[_0x22ea94(0x1b0)](RegExp['$1']),_0x392f6e=Number(RegExp['$2']));_0xfe0731[_0x22ea94(0x288)](_0x102bd8,_0x392f6e),this[_0x22ea94(0x255)](_0xfe0731);}},Game_Action['prototype'][_0x24ad3f(0x2bc)]=function(_0x11e986){const _0x459083=_0x24ad3f,_0xf52098=[_0x459083(0x363),_0x459083(0x1ba),_0x459083(0x1cd),_0x459083(0x28a),'MAT',_0x459083(0x313),_0x459083(0x3b6),_0x459083(0x347)],_0x490b60=this[_0x459083(0x35b)]()['note'],_0x3be822=_0x490b60[_0x459083(0x327)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x3be822)for(const _0x55b7ce of _0x3be822){_0x55b7ce[_0x459083(0x327)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4a2d04=_0xf52098[_0x459083(0x2b2)](String(RegExp['$1'])[_0x459083(0x3d5)]()),_0x454247=Number(RegExp['$2']);_0x4a2d04>=0x0&&(_0x11e986[_0x459083(0x266)](_0x4a2d04,_0x454247),this[_0x459083(0x255)](_0x11e986));}const _0x5068fc=_0x490b60[_0x459083(0x327)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x5068fc)for(const _0x2db5ca of _0x3be822){_0x2db5ca[_0x459083(0x327)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x22ad44=_0xf52098[_0x459083(0x2b2)](String(RegExp['$1'])[_0x459083(0x3d5)]()),_0x429cf9=Number(RegExp['$2']);_0x22ad44>=0x0&&(_0x11e986['addBuffTurns'](_0x22ad44,_0x429cf9),this[_0x459083(0x255)](_0x11e986));}},Game_Action[_0x24ad3f(0x3a6)][_0x24ad3f(0x366)]=function(_0x11811f){const _0x2539a3=_0x24ad3f,_0x596d99=[_0x2539a3(0x363),'MAXMP',_0x2539a3(0x1cd),_0x2539a3(0x28a),'MAT','MDF',_0x2539a3(0x3b6),_0x2539a3(0x347)],_0x416533=this[_0x2539a3(0x35b)]()[_0x2539a3(0x2ac)],_0xa0c300=_0x416533[_0x2539a3(0x327)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0xa0c300)for(const _0x3a8ba8 of _0xa0c300){_0x3a8ba8[_0x2539a3(0x327)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x10c8d2=_0x596d99[_0x2539a3(0x2b2)](String(RegExp['$1'])[_0x2539a3(0x3d5)]()),_0xd08e0c=Number(RegExp['$2']);_0x10c8d2>=0x0&&(_0x11811f[_0x2539a3(0x1d8)](_0x10c8d2,_0xd08e0c),this[_0x2539a3(0x255)](_0x11811f));}const _0x5fbdd2=_0x416533[_0x2539a3(0x327)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x5fbdd2)for(const _0x5b68c8 of _0xa0c300){_0x5b68c8[_0x2539a3(0x327)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x4abbc3=_0x596d99[_0x2539a3(0x2b2)](String(RegExp['$1'])['toUpperCase']()),_0x2d63ef=Number(RegExp['$2']);_0x4abbc3>=0x0&&(_0x11811f[_0x2539a3(0x380)](_0x4abbc3,_0x2d63ef),this[_0x2539a3(0x255)](_0x11811f));}},VisuMZ[_0x24ad3f(0x202)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x316)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x316)]=function(){const _0x4d8a75=_0x24ad3f;this[_0x4d8a75(0x26b)]={},this[_0x4d8a75(0x21b)](),VisuMZ['SkillsStatesCore'][_0x4d8a75(0x1b5)][_0x4d8a75(0x362)](this);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x21b)]=function(){const _0x1b582b=_0x24ad3f;this['_stateRetainType']='',this['_stateData']={},this[_0x1b582b(0x2de)]={},this[_0x1b582b(0x284)]={};},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x399)]=function(_0x5c9a8d){const _0x3ebf99=_0x24ad3f;return this[_0x3ebf99(0x26b)]=this[_0x3ebf99(0x26b)]||{},this[_0x3ebf99(0x26b)][_0x5c9a8d]!==undefined;},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x23d)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x23f)],Game_BattlerBase['prototype'][_0x24ad3f(0x23f)]=function(){const _0x40faa9=_0x24ad3f;this[_0x40faa9(0x26b)]={},VisuMZ['SkillsStatesCore'][_0x40faa9(0x23d)]['call'](this);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2d8)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x385)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x385)]=function(_0x21011e){const _0x31d189=_0x24ad3f;let _0x5b2c0f=this[_0x31d189(0x1e1)](_0x21011e);VisuMZ[_0x31d189(0x202)][_0x31d189(0x2d8)][_0x31d189(0x362)](this,_0x21011e);if(_0x5b2c0f&&!this['isStateAffected'](_0x21011e))this[_0x31d189(0x370)](_0x21011e);},Game_BattlerBase[_0x24ad3f(0x3a6)]['onRemoveState']=function(_0x3941f1){const _0x4d649f=_0x24ad3f;this[_0x4d649f(0x2e0)](_0x3941f1),this['clearStateDisplay'](_0x3941f1),this[_0x4d649f(0x307)](_0x3941f1);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1b6)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x314)],Game_BattlerBase['prototype'][_0x24ad3f(0x314)]=function(_0xde5214){const _0x258100=_0x24ad3f,_0x466b20=$dataStates[_0xde5214],_0x1d1f51=this['stateTurns'](_0xde5214),_0x480813=this[_0x258100(0x342)](_0x466b20)[_0x258100(0x1f6)]()['trim']();switch(_0x480813){case _0x258100(0x2b1):if(_0x1d1f51<=0x0)VisuMZ[_0x258100(0x202)]['Game_BattlerBase_resetStateCounts'][_0x258100(0x362)](this,_0xde5214);break;case _0x258100(0x2b6):VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts']['call'](this,_0xde5214);break;case _0x258100(0x243):VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts'][_0x258100(0x362)](this,_0xde5214),this[_0x258100(0x38c)][_0xde5214]=Math[_0x258100(0x30a)](this['_stateTurns'][_0xde5214],_0x1d1f51);break;case _0x258100(0x2f1):VisuMZ[_0x258100(0x202)][_0x258100(0x1b6)][_0x258100(0x362)](this,_0xde5214),this['_stateTurns'][_0xde5214]+=_0x1d1f51;break;default:VisuMZ[_0x258100(0x202)][_0x258100(0x1b6)][_0x258100(0x362)](this,_0xde5214);break;}},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x342)]=function(_0x260a06){const _0x2e1925=_0x24ad3f,_0x1d4f38=_0x260a06[_0x2e1925(0x2ac)];return _0x1d4f38[_0x2e1925(0x327)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x2e1925(0x202)][_0x2e1925(0x236)]['States'][_0x2e1925(0x2df)];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x28d)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1b3)],Game_BattlerBase[_0x24ad3f(0x3a6)]['overwriteBuffTurns']=function(_0x35c3ba,_0x49cbaf){const _0x291805=_0x24ad3f,_0x528093=VisuMZ[_0x291805(0x202)][_0x291805(0x236)][_0x291805(0x358)][_0x291805(0x2df)],_0x12ee18=this[_0x291805(0x239)](_0x35c3ba);switch(_0x528093){case _0x291805(0x2b1):if(_0x12ee18<=0x0)this[_0x291805(0x2fa)][_0x35c3ba]=_0x49cbaf;break;case _0x291805(0x2b6):this[_0x291805(0x2fa)][_0x35c3ba]=_0x49cbaf;break;case _0x291805(0x243):this[_0x291805(0x2fa)][_0x35c3ba]=Math[_0x291805(0x30a)](_0x12ee18,_0x49cbaf);break;case _0x291805(0x2f1):this[_0x291805(0x2fa)][_0x35c3ba]+=_0x49cbaf;break;default:VisuMZ[_0x291805(0x202)][_0x291805(0x28d)]['call'](this,_0x35c3ba,_0x49cbaf);break;}const _0x2917f6=VisuMZ[_0x291805(0x202)][_0x291805(0x236)][_0x291805(0x358)]['MaxTurns'];this['_buffTurns'][_0x35c3ba]=this[_0x291805(0x2fa)][_0x35c3ba][_0x291805(0x275)](0x0,_0x2917f6);},Game_BattlerBase['prototype'][_0x24ad3f(0x2da)]=function(){const _0x49cd75=_0x24ad3f;if(this['_cache']['groupDefeat']!==undefined)return this[_0x49cd75(0x26b)][_0x49cd75(0x267)];this['_cache']['groupDefeat']=![];const _0x1fac9b=this['states']();for(const _0x3ba140 of _0x1fac9b){if(!_0x3ba140)continue;if(_0x3ba140[_0x49cd75(0x2ac)][_0x49cd75(0x327)](/<GROUP DEFEAT>/i)){this[_0x49cd75(0x26b)][_0x49cd75(0x267)]=!![];break;}}return this[_0x49cd75(0x26b)][_0x49cd75(0x267)];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1b8)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x256)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x256)]=function(){const _0x52ab05=_0x24ad3f;this[_0x52ab05(0x3cd)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x52ab05(0x202)][_0x52ab05(0x1b8)][_0x52ab05(0x362)](this),this[_0x52ab05(0x21b)]());},Game_BattlerBase[_0x24ad3f(0x3a6)]['clearStatesWithStateRetain']=function(){const _0x2fdd7a=_0x24ad3f,_0x5bcbed=this[_0x2fdd7a(0x2e7)]();for(const _0x5c5f75 of _0x5bcbed){if(_0x5c5f75&&this[_0x2fdd7a(0x1da)](_0x5c5f75))this[_0x2fdd7a(0x385)](_0x5c5f75['id']);}this[_0x2fdd7a(0x26b)]={};},Game_BattlerBase[_0x24ad3f(0x3a6)]['canClearState']=function(_0x2444b1){const _0x34e5d7=_0x24ad3f,_0x45c4d7=this['getStateRetainType']();if(_0x45c4d7!==''){const _0x3cd283=_0x2444b1[_0x34e5d7(0x2ac)];if(_0x45c4d7==='death'&&_0x3cd283[_0x34e5d7(0x327)](/<NO DEATH CLEAR>/i))return![];if(_0x45c4d7===_0x34e5d7(0x1cb)&&_0x3cd283[_0x34e5d7(0x327)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x2444b1['id']);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3cd)]=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x24ad3f(0x3a6)]['setStateRetainType']=function(_0x736f46){this['_stateRetainType']=_0x736f46;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1af)]=function(){const _0x685a93=_0x24ad3f;this[_0x685a93(0x24c)]='';},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x360)]=Game_BattlerBase['prototype']['die'],Game_BattlerBase[_0x24ad3f(0x3a6)]['die']=function(){const _0xb5ddad=_0x24ad3f;this['setStateRetainType'](_0xb5ddad(0x32d)),VisuMZ['SkillsStatesCore'][_0xb5ddad(0x360)][_0xb5ddad(0x362)](this),this['clearStateRetainType']();},VisuMZ[_0x24ad3f(0x202)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x24ad3f(0x3a6)]['recoverAll'],Game_BattlerBase['prototype'][_0x24ad3f(0x372)]=function(){const _0x2108c5=_0x24ad3f;this['setStateRetainType'](_0x2108c5(0x1cb)),VisuMZ[_0x2108c5(0x202)][_0x2108c5(0x323)][_0x2108c5(0x362)](this),this[_0x2108c5(0x1af)]();},Game_BattlerBase[_0x24ad3f(0x3a6)]['canPaySkillCost']=function(_0x3a404a){const _0x435991=_0x24ad3f;for(settings of VisuMZ[_0x435991(0x202)]['Settings'][_0x435991(0x2c6)]){const _0x540221=settings[_0x435991(0x270)]['call'](this,_0x3a404a);if(!settings[_0x435991(0x359)][_0x435991(0x362)](this,_0x3a404a,_0x540221))return![];}return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)]['paySkillCost']=function(_0x39884c){const _0x5798ee=_0x24ad3f;for(settings of VisuMZ[_0x5798ee(0x202)][_0x5798ee(0x236)][_0x5798ee(0x2c6)]){const _0x46f1c1=settings[_0x5798ee(0x270)][_0x5798ee(0x362)](this,_0x39884c);settings['PayJS'][_0x5798ee(0x362)](this,_0x39884c,_0x46f1c1);}},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x37e)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x36c)],Game_BattlerBase['prototype'][_0x24ad3f(0x36c)]=function(_0x5bd6e7){const _0xd51868=_0x24ad3f;if(!_0x5bd6e7)return![];if(!VisuMZ[_0xd51868(0x202)][_0xd51868(0x37e)]['call'](this,_0x5bd6e7))return![];if(!this[_0xd51868(0x26a)](_0x5bd6e7))return![];if(!this[_0xd51868(0x3af)](_0x5bd6e7))return![];if(!this['meetsSkillConditionsGlobalJS'](_0x5bd6e7))return![];return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x26a)]=function(_0x141661){const _0x907a8f=_0x24ad3f;if(!this[_0x907a8f(0x20b)](_0x141661))return![];return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x20b)]=function(_0x38433e){const _0x50bec0=_0x24ad3f,_0x43a7af=_0x38433e[_0x50bec0(0x2ac)];if(_0x43a7af[_0x50bec0(0x327)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17dc0c=JSON[_0x50bec0(0x3a9)]('['+RegExp['$1'][_0x50bec0(0x327)](/\d+/g)+']');for(const _0x2f956d of _0x17dc0c){if(!$gameSwitches['value'](_0x2f956d))return![];}return!![];}if(_0x43a7af[_0x50bec0(0x327)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ee174=JSON[_0x50bec0(0x3a9)]('['+RegExp['$1'][_0x50bec0(0x327)](/\d+/g)+']');for(const _0x52f1a0 of _0x4ee174){if(!$gameSwitches[_0x50bec0(0x2d6)](_0x52f1a0))return![];}return!![];}if(_0x43a7af['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x8a696f=JSON[_0x50bec0(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5c467d of _0x8a696f){if($gameSwitches[_0x50bec0(0x2d6)](_0x5c467d))return!![];}return![];}if(_0x43a7af[_0x50bec0(0x327)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x275c48=JSON[_0x50bec0(0x3a9)]('['+RegExp['$1'][_0x50bec0(0x327)](/\d+/g)+']');for(const _0x21f9fe of _0x275c48){if(!$gameSwitches[_0x50bec0(0x2d6)](_0x21f9fe))return!![];}return![];}if(_0x43a7af[_0x50bec0(0x327)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3464bb=JSON[_0x50bec0(0x3a9)]('['+RegExp['$1'][_0x50bec0(0x327)](/\d+/g)+']');for(const _0x32620f of _0x3464bb){if(!$gameSwitches[_0x50bec0(0x2d6)](_0x32620f))return!![];}return![];}if(_0x43a7af[_0x50bec0(0x327)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1aa498=JSON['parse']('['+RegExp['$1'][_0x50bec0(0x327)](/\d+/g)+']');for(const _0x49bf05 of _0x1aa498){if($gameSwitches[_0x50bec0(0x2d6)](_0x49bf05))return![];}return!![];}return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3af)]=function(_0x1c68c2){const _0x3af583=_0x24ad3f,_0x1bbfa3=_0x1c68c2[_0x3af583(0x2ac)],_0x1abdc2=VisuMZ[_0x3af583(0x202)][_0x3af583(0x2c2)];return _0x1abdc2[_0x1c68c2['id']]?_0x1abdc2[_0x1c68c2['id']][_0x3af583(0x362)](this,_0x1c68c2):!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x34d)]=function(_0x1f79dc){const _0x4d0a85=_0x24ad3f;return VisuMZ[_0x4d0a85(0x202)]['Settings'][_0x4d0a85(0x373)]['SkillConditionJS'][_0x4d0a85(0x362)](this,_0x1f79dc);},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x312)]=Game_BattlerBase[_0x24ad3f(0x3a6)]['skillMpCost'],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x30b)]=function(_0x19fb48){const _0x42c791=_0x24ad3f;for(settings of VisuMZ[_0x42c791(0x202)][_0x42c791(0x236)][_0x42c791(0x2c6)]){if(settings[_0x42c791(0x1d5)][_0x42c791(0x3d5)]()==='MP')return settings['CalcJS'][_0x42c791(0x362)](this,_0x19fb48);}return VisuMZ[_0x42c791(0x202)][_0x42c791(0x312)]['call'](this,_0x19fb48);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x3ad)]=Game_BattlerBase['prototype'][_0x24ad3f(0x2fe)],Game_BattlerBase['prototype'][_0x24ad3f(0x2fe)]=function(_0x39fd62){const _0x473936=_0x24ad3f;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x473936(0x2c6)]){if(settings[_0x473936(0x1d5)][_0x473936(0x3d5)]()==='TP')return settings[_0x473936(0x270)]['call'](this,_0x39fd62);}return VisuMZ[_0x473936(0x202)][_0x473936(0x3ad)][_0x473936(0x362)](this,_0x39fd62);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x383)]=function(_0x2bda6f){const _0x322fe8=_0x24ad3f;if(typeof _0x2bda6f==='number')_0x2bda6f=$dataStates[_0x2bda6f];return this[_0x322fe8(0x2e7)]()[_0x322fe8(0x379)](_0x2bda6f);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1c9)]=Game_BattlerBase['prototype'][_0x24ad3f(0x2e7)],Game_BattlerBase['prototype'][_0x24ad3f(0x2e7)]=function(){const _0xd395b7=_0x24ad3f;let _0x147d59=VisuMZ[_0xd395b7(0x202)][_0xd395b7(0x1c9)]['call'](this);return this['addPassiveStates'](_0x147d59),_0x147d59;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x281)]=function(_0x189046){const _0x491744=_0x24ad3f,_0x332132=this[_0x491744(0x2ea)]();for(state of _0x332132){if(!state)continue;if(!this[_0x491744(0x341)](state)&&_0x189046['includes'](state))continue;_0x189046[_0x491744(0x29c)](state);}_0x332132['length']>0x0&&_0x189046[_0x491744(0x3de)]((_0x5c6a6d,_0x34be74)=>{const _0x2a2280=_0x491744,_0x9aeef2=_0x5c6a6d[_0x2a2280(0x22d)],_0x42f39f=_0x34be74['priority'];if(_0x9aeef2!==_0x42f39f)return _0x42f39f-_0x9aeef2;return _0x5c6a6d-_0x34be74;});},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x341)]=function(_0x20dfd0){const _0x5935d1=_0x24ad3f;return _0x20dfd0[_0x5935d1(0x2ac)][_0x5935d1(0x327)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype'][_0x24ad3f(0x20f)]=function(){const _0x5364b6=_0x24ad3f,_0x4b0034=[];for(const _0x93bbef of this[_0x5364b6(0x26b)][_0x5364b6(0x2ea)]){const _0x376d21=$dataStates[_0x93bbef];if(!_0x376d21)continue;if(!this[_0x5364b6(0x365)](_0x376d21))continue;_0x4b0034[_0x5364b6(0x29c)](_0x376d21);}return _0x4b0034;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x365)]=function(_0x6edeed){const _0x42aa3c=_0x24ad3f;if(!this[_0x42aa3c(0x271)](_0x6edeed))return![];if(!this[_0x42aa3c(0x3bb)](_0x6edeed))return![];if(!this[_0x42aa3c(0x3da)](_0x6edeed))return![];if(!this[_0x42aa3c(0x3c8)](_0x6edeed))return![];return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x271)]=function(_0x53840f){return!![];},Game_Actor['prototype'][_0x24ad3f(0x271)]=function(_0x141935){const _0x4a1183=_0x24ad3f,_0x5bc50e=_0x141935[_0x4a1183(0x2ac)];if(_0x5bc50e[_0x4a1183(0x327)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x15d018=String(RegExp['$1'])[_0x4a1183(0x30c)](',')[_0x4a1183(0x24e)](_0x1f87ee=>_0x1f87ee[_0x4a1183(0x3c0)]()),_0x53ea9b=VisuMZ[_0x4a1183(0x202)][_0x4a1183(0x1c8)](_0x15d018);return _0x53ea9b[_0x4a1183(0x379)](this[_0x4a1183(0x39e)]());}if(_0x5bc50e['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x2d0eb0=String(RegExp['$1'])[_0x4a1183(0x30c)](',')['map'](_0x1bcb12=>_0x1bcb12[_0x4a1183(0x3c0)]()),_0x4bde95=VisuMZ['SkillsStatesCore'][_0x4a1183(0x1c8)](_0x2d0eb0);let _0x59c201=[this[_0x4a1183(0x39e)]()];return Imported[_0x4a1183(0x352)]&&this[_0x4a1183(0x38e)]&&(_0x59c201=this[_0x4a1183(0x38e)]()),_0x4bde95[_0x4a1183(0x2c9)](_0x1b9625=>_0x59c201[_0x4a1183(0x379)](_0x1b9625))[_0x4a1183(0x37f)]>0x0;}return Game_BattlerBase[_0x4a1183(0x3a6)][_0x4a1183(0x271)]['call'](this,_0x141935);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1c8)]=function(_0x185cdd){const _0x158c8b=_0x24ad3f,_0x493094=[];for(let _0xb0b408 of _0x185cdd){_0xb0b408=(String(_0xb0b408)||'')[_0x158c8b(0x3c0)]();const _0x2f13ca=/^\d+$/['test'](_0xb0b408);_0x2f13ca?_0x493094[_0x158c8b(0x29c)](Number(_0xb0b408)):_0x493094[_0x158c8b(0x29c)](DataManager[_0x158c8b(0x2a2)](_0xb0b408));}return _0x493094[_0x158c8b(0x24e)](_0xcc0b34=>$dataClasses[Number(_0xcc0b34)])[_0x158c8b(0x1f0)](null);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3bb)]=function(_0x2a1603){const _0xefc446=_0x24ad3f,_0x37f806=_0x2a1603[_0xefc446(0x2ac)];if(_0x37f806[_0xefc446(0x327)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2fa280=JSON[_0xefc446(0x3a9)]('['+RegExp['$1'][_0xefc446(0x327)](/\d+/g)+']');for(const _0x3bff92 of _0x2fa280){if(!$gameSwitches['value'](_0x3bff92))return![];}return!![];}if(_0x37f806['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd02108=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x401717 of _0xd02108){if(!$gameSwitches[_0xefc446(0x2d6)](_0x401717))return![];}return!![];}if(_0x37f806[_0xefc446(0x327)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x274d0f=JSON[_0xefc446(0x3a9)]('['+RegExp['$1'][_0xefc446(0x327)](/\d+/g)+']');for(const _0x16d48b of _0x274d0f){if($gameSwitches['value'](_0x16d48b))return!![];}return![];}if(_0x37f806[_0xefc446(0x327)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1f2453=JSON['parse']('['+RegExp['$1'][_0xefc446(0x327)](/\d+/g)+']');for(const _0x35f910 of _0x1f2453){if(!$gameSwitches[_0xefc446(0x2d6)](_0x35f910))return!![];}return![];}if(_0x37f806[_0xefc446(0x327)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x521aab=JSON[_0xefc446(0x3a9)]('['+RegExp['$1'][_0xefc446(0x327)](/\d+/g)+']');for(const _0x530506 of _0x521aab){if(!$gameSwitches[_0xefc446(0x2d6)](_0x530506))return!![];}return![];}if(_0x37f806[_0xefc446(0x327)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x221ea3=JSON[_0xefc446(0x3a9)]('['+RegExp['$1'][_0xefc446(0x327)](/\d+/g)+']');for(const _0x222f89 of _0x221ea3){if($gameSwitches[_0xefc446(0x2d6)](_0x222f89))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x24ad3f(0x3da)]=function(_0x10da73){const _0x2c002f=_0x24ad3f,_0x4b6d73=VisuMZ[_0x2c002f(0x202)][_0x2c002f(0x29d)];if(_0x4b6d73[_0x10da73['id']]&&!_0x4b6d73[_0x10da73['id']][_0x2c002f(0x362)](this,_0x10da73))return![];return!![];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c8)]=function(_0x2ac2c0){const _0x43d900=_0x24ad3f;return VisuMZ[_0x43d900(0x202)][_0x43d900(0x236)][_0x43d900(0x3cb)][_0x43d900(0x1f1)][_0x43d900(0x362)](this,_0x2ac2c0);},Game_BattlerBase[_0x24ad3f(0x3a6)]['passiveStates']=function(){const _0x58785f=_0x24ad3f;if(this[_0x58785f(0x399)](_0x58785f(0x2ea)))return this[_0x58785f(0x20f)]();return this[_0x58785f(0x26b)][_0x58785f(0x2ea)]=[],this[_0x58785f(0x3a8)](),this[_0x58785f(0x3ac)](),this[_0x58785f(0x292)](),this[_0x58785f(0x20f)]();},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3a8)]=function(){const _0xa546c1=_0x24ad3f;if(Imported[_0xa546c1(0x249)])this[_0xa546c1(0x3c9)]();},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3e3)]=function(){return[];},Game_BattlerBase['prototype']['addPassiveStatesByNotetag']=function(){const _0x1eaadf=_0x24ad3f,_0x38a988=this[_0x1eaadf(0x3e3)]();for(const _0x5aaebd of _0x38a988){if(!_0x5aaebd)continue;const _0x1e0189=_0x5aaebd[_0x1eaadf(0x2ac)][_0x1eaadf(0x327)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1e0189)for(const _0x197977 of _0x1e0189){_0x197977[_0x1eaadf(0x327)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x3eeb11=RegExp['$1'];if(_0x3eeb11[_0x1eaadf(0x327)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x554034=JSON[_0x1eaadf(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x1eaadf(0x26b)][_0x1eaadf(0x2ea)]=this[_0x1eaadf(0x26b)][_0x1eaadf(0x2ea)][_0x1eaadf(0x2a7)](_0x554034);}else{const _0x44899f=_0x3eeb11[_0x1eaadf(0x30c)](',');for(const _0x2b7cb1 of _0x44899f){const _0x357362=DataManager[_0x1eaadf(0x1b0)](_0x2b7cb1);if(_0x357362)this[_0x1eaadf(0x26b)][_0x1eaadf(0x2ea)][_0x1eaadf(0x29c)](_0x357362);}}}}},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x292)]=function(){const _0x365521=_0x24ad3f,_0x36bb67=VisuMZ['SkillsStatesCore'][_0x365521(0x236)]['PassiveStates'][_0x365521(0x2d9)];this[_0x365521(0x26b)][_0x365521(0x2ea)]=this[_0x365521(0x26b)][_0x365521(0x2ea)][_0x365521(0x2a7)](_0x36bb67);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x2fd)]=function(_0x25aae5){const _0x3e3097=_0x24ad3f;if(typeof _0x25aae5!==_0x3e3097(0x28b))_0x25aae5=_0x25aae5['id'];return this[_0x3e3097(0x38c)][_0x25aae5]||0x0;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x38d)]=function(_0x43a258,_0x308c5a){const _0x11c1a8=_0x24ad3f;if(typeof _0x43a258!==_0x11c1a8(0x28b))_0x43a258=_0x43a258['id'];if(this[_0x11c1a8(0x1e1)](_0x43a258)){const _0xa3a3dc=DataManager[_0x11c1a8(0x30f)](_0x43a258);this[_0x11c1a8(0x38c)][_0x43a258]=_0x308c5a['clamp'](0x0,_0xa3a3dc);if(this['_stateTurns'][_0x43a258]<=0x0)this[_0x11c1a8(0x262)](_0x43a258);}},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x288)]=function(_0x5214ec,_0x4a89a8){const _0x11954d=_0x24ad3f;if(typeof _0x5214ec!==_0x11954d(0x28b))_0x5214ec=_0x5214ec['id'];this['isStateAffected'](_0x5214ec)&&(_0x4a89a8+=this[_0x11954d(0x2fd)](_0x5214ec),this[_0x11954d(0x38d)](_0x5214ec,_0x4a89a8));},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x30e)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x30e)]=function(_0x10bfb6){const _0x54a6f9=_0x24ad3f,_0x1112f9=this['_buffs'][_0x10bfb6];VisuMZ['SkillsStatesCore'][_0x54a6f9(0x21f)][_0x54a6f9(0x362)](this,_0x10bfb6);if(_0x1112f9>0x0)this[_0x54a6f9(0x28e)](_0x10bfb6);if(_0x1112f9<0x0)this['onEraseDebuff'](_0x10bfb6);},VisuMZ[_0x24ad3f(0x202)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase['prototype'][_0x24ad3f(0x34e)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x34e)]=function(_0x182a00){const _0x509399=_0x24ad3f;VisuMZ[_0x509399(0x202)][_0x509399(0x1bc)][_0x509399(0x362)](this,_0x182a00);if(!this[_0x509399(0x3e7)](_0x182a00))this['eraseBuff'](_0x182a00);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2f9)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x2bb)],Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x2bb)]=function(_0x5bfac6){const _0x19cc2e=_0x24ad3f;VisuMZ['SkillsStatesCore']['Game_BattlerBase_decreaseBuff'][_0x19cc2e(0x362)](this,_0x5bfac6);if(!this[_0x19cc2e(0x3e7)](_0x5bfac6))this[_0x19cc2e(0x30e)](_0x5bfac6);},Game_BattlerBase[_0x24ad3f(0x3a6)]['onEraseBuff']=function(_0x5b0c55){},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3b8)]=function(_0x271c85){},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ed)]=function(_0x40613b){const _0x3ae94d=_0x24ad3f;return this[_0x3ae94d(0x3df)][_0x40613b]===VisuMZ[_0x3ae94d(0x202)]['Settings'][_0x3ae94d(0x358)][_0x3ae94d(0x39d)];},Game_BattlerBase['prototype']['isMaxDebuffAffected']=function(_0x2c0501){const _0x149ead=_0x24ad3f;return this[_0x149ead(0x3df)][_0x2c0501]===-VisuMZ[_0x149ead(0x202)]['Settings'][_0x149ead(0x358)]['StackDebuffMax'];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x326)]=Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x231)],Game_BattlerBase[_0x24ad3f(0x3a6)]['buffIconIndex']=function(_0x5ed471,_0x2d62dc){const _0x2cd439=_0x24ad3f;return _0x5ed471=_0x5ed471[_0x2cd439(0x275)](-0x2,0x2),VisuMZ[_0x2cd439(0x202)][_0x2cd439(0x326)][_0x2cd439(0x362)](this,_0x5ed471,_0x2d62dc);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x206)]=function(_0x213126){const _0x1d253b=_0x24ad3f,_0x3e2381=this[_0x1d253b(0x3df)][_0x213126];return VisuMZ[_0x1d253b(0x202)]['Settings']['Buffs'][_0x1d253b(0x35f)][_0x1d253b(0x362)](this,_0x213126,_0x3e2381);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x239)]=function(_0x8bdeb1){const _0x200efb=_0x24ad3f;return this[_0x200efb(0x2fa)][_0x8bdeb1]||0x0;},Game_BattlerBase[_0x24ad3f(0x3a6)]['debuffTurns']=function(_0x5403bc){const _0x4cd11c=_0x24ad3f;return this[_0x4cd11c(0x239)](_0x5403bc);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x266)]=function(_0x36301f,_0x1a994e){const _0x27661d=_0x24ad3f;if(this[_0x27661d(0x33c)](_0x36301f)){const _0x2aad3f=VisuMZ['SkillsStatesCore'][_0x27661d(0x236)][_0x27661d(0x358)][_0x27661d(0x24b)];this[_0x27661d(0x2fa)][_0x36301f]=_0x1a994e[_0x27661d(0x275)](0x0,_0x2aad3f);}},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x2e6)]=function(_0x2389e3,_0x40ef29){const _0x4c18c9=_0x24ad3f;this['isBuffAffected'](_0x2389e3)&&(_0x40ef29+=this['buffTurns'](stateId),this[_0x4c18c9(0x38d)](_0x2389e3,_0x40ef29));},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1d8)]=function(_0x215074,_0x304ea1){const _0x2fe229=_0x24ad3f;if(this['isDebuffAffected'](_0x215074)){const _0x2ffd66=VisuMZ[_0x2fe229(0x202)][_0x2fe229(0x236)][_0x2fe229(0x358)][_0x2fe229(0x24b)];this[_0x2fe229(0x2fa)][_0x215074]=_0x304ea1[_0x2fe229(0x275)](0x0,_0x2ffd66);}},Game_BattlerBase['prototype'][_0x24ad3f(0x380)]=function(_0x2a2a6c,_0x3bee0b){const _0x308d20=_0x24ad3f;this[_0x308d20(0x364)](_0x2a2a6c)&&(_0x3bee0b+=this[_0x308d20(0x239)](stateId),this['setStateTurns'](_0x2a2a6c,_0x3bee0b));},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x345)]=function(_0x9d3342){const _0x2a4627=_0x24ad3f;if(typeof _0x9d3342!==_0x2a4627(0x28b))_0x9d3342=_0x9d3342['id'];return this[_0x2a4627(0x299)]=this[_0x2a4627(0x299)]||{},this[_0x2a4627(0x299)][_0x9d3342]=this[_0x2a4627(0x299)][_0x9d3342]||{},this['_stateData'][_0x9d3342];},Game_BattlerBase['prototype'][_0x24ad3f(0x2a1)]=function(_0x2757f2,_0x556c41){const _0xfa7fe9=_0x24ad3f;if(typeof _0x2757f2!==_0xfa7fe9(0x28b))_0x2757f2=_0x2757f2['id'];const _0x4a6a21=this[_0xfa7fe9(0x345)](_0x2757f2);return _0x4a6a21[_0x556c41];},Game_BattlerBase['prototype'][_0x24ad3f(0x1c0)]=function(_0x5d4ec1,_0x36c64a,_0x5e7867){const _0x5b4e8f=_0x24ad3f;if(typeof _0x5d4ec1!==_0x5b4e8f(0x28b))_0x5d4ec1=_0x5d4ec1['id'];const _0x200f9e=this[_0x5b4e8f(0x345)](_0x5d4ec1);_0x200f9e[_0x36c64a]=_0x5e7867;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x2e0)]=function(_0x4c9189){const _0x434b41=_0x24ad3f;if(typeof _0x4c9189!=='number')_0x4c9189=_0x4c9189['id'];this[_0x434b41(0x299)]=this[_0x434b41(0x299)]||{},this['_stateData'][_0x4c9189]={};},Game_BattlerBase['prototype']['getStateDisplay']=function(_0x1b2f26){const _0x5df89f=_0x24ad3f;if(typeof _0x1b2f26!=='number')_0x1b2f26=_0x1b2f26['id'];return this['_stateDisplay']=this[_0x5df89f(0x2de)]||{},this[_0x5df89f(0x2de)][_0x1b2f26]===undefined&&(this[_0x5df89f(0x2de)][_0x1b2f26]=''),this['_stateDisplay'][_0x1b2f26];},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1c7)]=function(_0xf4b9dd,_0x247002){const _0x3228bf=_0x24ad3f;if(typeof _0xf4b9dd!==_0x3228bf(0x28b))_0xf4b9dd=_0xf4b9dd['id'];this[_0x3228bf(0x2de)]=this[_0x3228bf(0x2de)]||{},this[_0x3228bf(0x2de)][_0xf4b9dd]=_0x247002;},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1df)]=function(_0x5dc0e6){const _0x53f84e=_0x24ad3f;if(typeof _0x5dc0e6!==_0x53f84e(0x28b))_0x5dc0e6=_0x5dc0e6['id'];this['_stateDisplay']=this[_0x53f84e(0x2de)]||{},this[_0x53f84e(0x2de)][_0x5dc0e6]='';},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3e1)]=function(_0x16ee28){const _0x1dea0a=_0x24ad3f;if(typeof _0x16ee28!==_0x1dea0a(0x28b))_0x16ee28=_0x16ee28['id'];this[_0x1dea0a(0x284)]=this['_stateOrigin']||{},this[_0x1dea0a(0x284)][_0x16ee28]=this[_0x1dea0a(0x284)][_0x16ee28]||_0x1dea0a(0x2d4);const _0x4aa369=this[_0x1dea0a(0x284)][_0x16ee28];return this['getStateOriginByKey'](_0x4aa369);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x250)]=function(_0x17a756,_0x14f370){const _0x210cda=_0x24ad3f;this['_stateOrigin']=this[_0x210cda(0x284)]||{};const _0x389910=_0x14f370?this[_0x210cda(0x3e8)](_0x14f370):this[_0x210cda(0x3b1)]();this['_stateOrigin'][_0x17a756]=_0x389910;},Game_BattlerBase[_0x24ad3f(0x3a6)]['clearStateOrigin']=function(_0x31755b){const _0x3e02d9=_0x24ad3f;this['_stateOrigin']=this[_0x3e02d9(0x284)]||{},delete this['_stateOrigin'][_0x31755b];},Game_BattlerBase['prototype'][_0x24ad3f(0x3b1)]=function(){const _0x316dd3=_0x24ad3f,_0x48dc9c=this[_0x316dd3(0x2a3)]();return this['convertTargetToStateOriginKey'](_0x48dc9c);},Game_BattlerBase[_0x24ad3f(0x3a6)]['getCurrentStateActiveUser']=function(){const _0x230f6f=_0x24ad3f;if($gameParty['inBattle']()){if(BattleManager['_subject'])return BattleManager[_0x230f6f(0x3b0)];else{if(BattleManager['_currentActor'])return BattleManager[_0x230f6f(0x277)];}}else{const _0x4433af=SceneManager[_0x230f6f(0x335)];if(![Scene_Map,Scene_Item][_0x230f6f(0x379)](_0x4433af['constructor']))return $gameParty[_0x230f6f(0x269)]();}return this;},Game_BattlerBase['prototype']['convertTargetToStateOriginKey']=function(_0x1e8231){const _0x428391=_0x24ad3f;if(!_0x1e8231)return _0x428391(0x2d4);if(_0x1e8231[_0x428391(0x28c)]())return'<actor-%1>'[_0x428391(0x285)](_0x1e8231[_0x428391(0x3c2)]());else{const _0xb19f44='<enemy-%1>'[_0x428391(0x285)](_0x1e8231[_0x428391(0x2d7)]()),_0x232f87=_0x428391(0x1bb)[_0x428391(0x285)](_0x1e8231[_0x428391(0x2d5)]()),_0x1742c8=_0x428391(0x2ff)[_0x428391(0x285)]($gameTroop[_0x428391(0x237)]());return _0x428391(0x3a4)['format'](_0xb19f44,_0x232f87,_0x1742c8);}return'user';},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ef)]=function(_0x4e3c59){const _0x290a4f=_0x24ad3f;if(_0x4e3c59===_0x290a4f(0x2d4))return this;else{if(_0x4e3c59['match'](/<actor-(\d+)>/i))return $gameActors[_0x290a4f(0x21c)](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x4e3c59[_0x290a4f(0x327)](/<troop-(\d+)>/i)){const _0x2dadca=Number(RegExp['$1']);if(_0x2dadca===$gameTroop[_0x290a4f(0x237)]()){if(_0x4e3c59[_0x290a4f(0x327)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x4e3c59[_0x290a4f(0x327)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x24ad3f(0x202)]['Game_Battler_addState']=Game_Battler[_0x24ad3f(0x3a6)]['addState'],Game_Battler[_0x24ad3f(0x3a6)]['addState']=function(_0x1fe66e){const _0x2ce547=_0x24ad3f,_0x55d1a1=this['isStateAddable'](_0x1fe66e);VisuMZ[_0x2ce547(0x202)][_0x2ce547(0x1b4)][_0x2ce547(0x362)](this,_0x1fe66e);if(_0x55d1a1&&this[_0x2ce547(0x383)]($dataStates[_0x1fe66e])){this[_0x2ce547(0x254)](_0x1fe66e);;}},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x315)]=Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x2ef)],Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x2ef)]=function(_0x3578f8){const _0x1c43a3=_0x24ad3f,_0x18e8ca=$dataStates[_0x3578f8];if(_0x18e8ca&&_0x18e8ca['note'][_0x1c43a3(0x327)](/<NO DEATH CLEAR>/i))return!this[_0x1c43a3(0x2b5)](_0x3578f8)&&!this[_0x1c43a3(0x3d0)](_0x3578f8)&&!this[_0x1c43a3(0x1c5)][_0x1c43a3(0x29f)](_0x3578f8);return VisuMZ[_0x1c43a3(0x202)][_0x1c43a3(0x315)][_0x1c43a3(0x362)](this,_0x3578f8);},Game_Battler['prototype']['onAddState']=function(_0x5cda59){const _0x1c521b=_0x24ad3f;this[_0x1c521b(0x250)](_0x5cda59),this['onAddStateMakeCustomSlipValues'](_0x5cda59),this[_0x1c521b(0x388)](_0x5cda59),this[_0x1c521b(0x1ca)](_0x5cda59);},Game_Battler[_0x24ad3f(0x3a6)]['onRemoveState']=function(_0x5a68f9){const _0xa25ff7=_0x24ad3f;Game_BattlerBase[_0xa25ff7(0x3a6)][_0xa25ff7(0x370)][_0xa25ff7(0x362)](this,_0x5a68f9),this['onEraseStateCustomJS'](_0x5a68f9),this[_0xa25ff7(0x337)](_0x5a68f9);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x246)]=function(_0x16c0b3){const _0x2be05e=_0x24ad3f;for(const _0x51342e of this[_0x2be05e(0x2e7)]()){this[_0x2be05e(0x394)](_0x51342e['id'])&&_0x51342e[_0x2be05e(0x2a8)]===_0x16c0b3&&(this[_0x2be05e(0x262)](_0x51342e['id']),this[_0x2be05e(0x3a3)](_0x51342e['id']),this['onExpireStateGlobalJS'](_0x51342e['id']));}},Game_Battler['prototype'][_0x24ad3f(0x3a3)]=function(_0x316c5e){const _0x5e11c6=_0x24ad3f;this[_0x5e11c6(0x2d0)](_0x316c5e);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x388)]=function(_0x503e2e){const _0x215c9c=_0x24ad3f,_0x2c6a40=VisuMZ[_0x215c9c(0x202)][_0x215c9c(0x251)];if(_0x2c6a40[_0x503e2e])_0x2c6a40[_0x503e2e][_0x215c9c(0x362)](this,_0x503e2e);},Game_Battler[_0x24ad3f(0x3a6)]['onEraseStateCustomJS']=function(_0x284cd2){const _0x51fd57=_0x24ad3f,_0x384bc8=VisuMZ[_0x51fd57(0x202)][_0x51fd57(0x3ce)];if(_0x384bc8[_0x284cd2])_0x384bc8[_0x284cd2]['call'](this,_0x284cd2);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x2d0)]=function(_0x53d069){const _0x410e9a=_0x24ad3f,_0x13cfdd=VisuMZ['SkillsStatesCore'][_0x410e9a(0x3d1)];if(_0x13cfdd[_0x53d069])_0x13cfdd[_0x53d069]['call'](this,_0x53d069);},Game_Battler[_0x24ad3f(0x3a6)]['onAddStateGlobalJS']=function(_0x2ea7fa){const _0x308e97=_0x24ad3f;try{VisuMZ[_0x308e97(0x202)][_0x308e97(0x236)][_0x308e97(0x37b)]['onAddStateJS'][_0x308e97(0x362)](this,_0x2ea7fa);}catch(_0xd96323){if($gameTemp[_0x308e97(0x357)]())console[_0x308e97(0x336)](_0xd96323);}},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x337)]=function(_0x3d08ef){const _0x59d298=_0x24ad3f;try{VisuMZ[_0x59d298(0x202)][_0x59d298(0x236)][_0x59d298(0x37b)][_0x59d298(0x26f)]['call'](this,_0x3d08ef);}catch(_0x3946b0){if($gameTemp[_0x59d298(0x357)]())console[_0x59d298(0x336)](_0x3946b0);}},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x27e)]=function(_0x58d3ca){const _0x481af3=_0x24ad3f;try{VisuMZ[_0x481af3(0x202)][_0x481af3(0x236)]['States'][_0x481af3(0x2ed)][_0x481af3(0x362)](this,_0x58d3ca);}catch(_0x3556ae){if($gameTemp[_0x481af3(0x357)]())console[_0x481af3(0x336)](_0x3556ae);}},Game_Battler['prototype'][_0x24ad3f(0x229)]=function(_0x2a0879){const _0x3fadf6=_0x24ad3f;return _0x2a0879=_0x2a0879[_0x3fadf6(0x3d5)]()[_0x3fadf6(0x3c0)](),this[_0x3fadf6(0x2e7)]()[_0x3fadf6(0x2c9)](_0x4e4754=>_0x4e4754['categories'][_0x3fadf6(0x379)](_0x2a0879));},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x310)]=function(_0x101fd9,_0x324b66){const _0x35628f=_0x24ad3f;_0x101fd9=_0x101fd9[_0x35628f(0x3d5)]()['trim'](),_0x324b66=_0x324b66||0x0;const _0x520a85=this[_0x35628f(0x229)](_0x101fd9),_0x4983a4=[];for(const _0x1cc730 of _0x520a85){if(!_0x1cc730)continue;if(_0x324b66<=0x0)return;_0x4983a4[_0x35628f(0x29c)](_0x1cc730['id']),this['_result'][_0x35628f(0x1e3)]=!![],_0x324b66--;}while(_0x4983a4[_0x35628f(0x37f)]>0x0){this[_0x35628f(0x262)](_0x4983a4[_0x35628f(0x25c)]());}},Game_Battler[_0x24ad3f(0x3a6)]['removeStatesByCategoryAll']=function(_0x1ebdb7){const _0x38bae6=_0x24ad3f;_0x1ebdb7=_0x1ebdb7[_0x38bae6(0x3d5)]()[_0x38bae6(0x3c0)]();const _0x3c2d9f=this[_0x38bae6(0x229)](_0x1ebdb7),_0x44a7ce=[];for(const _0x7cf278 of _0x3c2d9f){if(!_0x7cf278)continue;_0x44a7ce['push'](_0x7cf278['id']),this[_0x38bae6(0x1c5)]['success']=!![];}while(_0x44a7ce[_0x38bae6(0x37f)]>0x0){this[_0x38bae6(0x262)](_0x44a7ce[_0x38bae6(0x25c)]());}},Game_Battler['prototype'][_0x24ad3f(0x203)]=function(_0x34e142){return this['totalStateCategoryAffected'](_0x34e142)>0x0;},Game_Battler['prototype'][_0x24ad3f(0x3be)]=function(_0x16741c){const _0x39c293=_0x24ad3f;return this[_0x39c293(0x33f)](_0x16741c)>0x0;},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x353)]=function(_0x57e7fe){const _0x72f72e=_0x24ad3f,_0x123ac2=this[_0x72f72e(0x229)](_0x57e7fe)[_0x72f72e(0x2c9)](_0x203a65=>this[_0x72f72e(0x1e1)](_0x203a65['id']));return _0x123ac2[_0x72f72e(0x37f)];},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x33f)]=function(_0x17a261){const _0x56297a=_0x24ad3f,_0x4ed1a8=this[_0x56297a(0x229)](_0x17a261);return _0x4ed1a8[_0x56297a(0x37f)];},VisuMZ[_0x24ad3f(0x202)]['Game_Battler_addBuff']=Game_Battler['prototype']['addBuff'],Game_Battler['prototype']['addBuff']=function(_0x139868,_0x4fcd4a){const _0x3bd443=_0x24ad3f;VisuMZ['SkillsStatesCore'][_0x3bd443(0x396)]['call'](this,_0x139868,_0x4fcd4a),this[_0x3bd443(0x33c)](_0x139868)&&this[_0x3bd443(0x305)](_0x139868,_0x4fcd4a);},VisuMZ[_0x24ad3f(0x202)]['Game_Battler_addDebuff']=Game_Battler[_0x24ad3f(0x3a6)]['addDebuff'],Game_Battler['prototype'][_0x24ad3f(0x2aa)]=function(_0xada490,_0x5755c3){const _0xeed91e=_0x24ad3f;VisuMZ[_0xeed91e(0x202)][_0xeed91e(0x1d1)][_0xeed91e(0x362)](this,_0xada490,_0x5755c3),this[_0xeed91e(0x364)](_0xada490)&&this[_0xeed91e(0x395)](_0xada490,_0x5755c3);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x375)]=function(){const _0x544406=_0x24ad3f;for(let _0x4c1f27=0x0;_0x4c1f27<this[_0x544406(0x24d)]();_0x4c1f27++){if(this[_0x544406(0x2bd)](_0x4c1f27)){const _0x3354ad=this[_0x544406(0x3df)][_0x4c1f27];this['removeBuff'](_0x4c1f27);if(_0x3354ad>0x0)this[_0x544406(0x22b)](_0x4c1f27);if(_0x3354ad<0x0)this[_0x544406(0x260)](_0x4c1f27);}}},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x305)]=function(_0x26e192,_0x526ef1){const _0xaef22f=_0x24ad3f;this[_0xaef22f(0x2af)](_0x26e192,_0x526ef1);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x395)]=function(_0x3ea3fa,_0x8c8b8b){this['onAddDebuffGlobalJS'](_0x3ea3fa,_0x8c8b8b);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x28e)]=function(_0x92682e){const _0x4e9945=_0x24ad3f;Game_BattlerBase[_0x4e9945(0x3a6)][_0x4e9945(0x28e)]['call'](this,_0x92682e),this[_0x4e9945(0x3d9)](_0x92682e);},Game_Battler[_0x24ad3f(0x3a6)]['onEraseDebuff']=function(_0x184f52){const _0x4241b9=_0x24ad3f;Game_BattlerBase[_0x4241b9(0x3a6)]['onEraseDebuff']['call'](this,_0x184f52),this['onEraseDebuffGlobalJS'](_0x184f52);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x22b)]=function(_0xc05a04){const _0x3d7d69=_0x24ad3f;this[_0x3d7d69(0x369)](_0xc05a04);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x260)]=function(_0x4400d6){const _0x3ab503=_0x24ad3f;this[_0x3ab503(0x2fb)](_0x4400d6);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x2af)]=function(_0x296c2e,_0x635c3e){const _0x31d793=_0x24ad3f;VisuMZ[_0x31d793(0x202)][_0x31d793(0x236)][_0x31d793(0x358)][_0x31d793(0x3b7)][_0x31d793(0x362)](this,_0x296c2e,_0x635c3e);},Game_Battler['prototype'][_0x24ad3f(0x1d2)]=function(_0x393af6,_0xecadd3){const _0x10ccea=_0x24ad3f;VisuMZ['SkillsStatesCore']['Settings'][_0x10ccea(0x358)][_0x10ccea(0x351)][_0x10ccea(0x362)](this,_0x393af6,_0xecadd3);},Game_BattlerBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x3d9)]=function(_0x3c506b){const _0x50f767=_0x24ad3f;VisuMZ[_0x50f767(0x202)]['Settings'][_0x50f767(0x358)]['onEraseBuffJS'][_0x50f767(0x362)](this,_0x3c506b);},Game_BattlerBase['prototype']['onEraseDebuffGlobalJS']=function(_0xe24962){const _0x14b1bd=_0x24ad3f;VisuMZ[_0x14b1bd(0x202)][_0x14b1bd(0x236)]['Buffs'][_0x14b1bd(0x286)][_0x14b1bd(0x362)](this,_0xe24962);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x369)]=function(_0x3f3c17){const _0x58e1e7=_0x24ad3f;VisuMZ['SkillsStatesCore']['Settings'][_0x58e1e7(0x358)][_0x58e1e7(0x3e4)][_0x58e1e7(0x362)](this,_0x3f3c17);},Game_Battler['prototype']['onExpireDebuffGlobalJS']=function(_0x1887a8){const _0x10c747=_0x24ad3f;VisuMZ[_0x10c747(0x202)][_0x10c747(0x236)][_0x10c747(0x358)][_0x10c747(0x32f)][_0x10c747(0x362)](this,_0x1887a8);},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x367)]=function(_0x530849){const _0x4a3565=_0x24ad3f,_0x2bab88=VisuMZ['SkillsStatesCore'],_0x283c3c=[_0x4a3565(0x397),_0x4a3565(0x1d0),_0x4a3565(0x1d3),_0x4a3565(0x22f),_0x4a3565(0x228),'stateTpSlipHealJS'];for(const _0x23f5fd of _0x283c3c){_0x2bab88[_0x23f5fd][_0x530849]&&_0x2bab88[_0x23f5fd][_0x530849][_0x4a3565(0x362)](this,_0x530849);}},VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll']=Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x1b2)],Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x1b2)]=function(){const _0x26621e=_0x24ad3f;VisuMZ[_0x26621e(0x202)]['Game_Battler_regenerateAll'][_0x26621e(0x362)](this),this[_0x26621e(0x29e)](),this[_0x26621e(0x224)]();},Game_Battler['prototype']['setPassiveStateSlipDamageJS']=function(){const _0x471bf9=_0x24ad3f;for(const _0x250e10 of this[_0x471bf9(0x2ea)]()){if(!_0x250e10)continue;this['onAddStateMakeCustomSlipValues'](_0x250e10['id']);}},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x224)]=function(){const _0x87982f=_0x24ad3f;if(!this[_0x87982f(0x297)]())return;const _0x5f540c=this[_0x87982f(0x2e7)]();for(const _0x1f4fe9 of _0x5f540c){if(!_0x1f4fe9)continue;this['onRegenerateCustomStateDamageOverTime'](_0x1f4fe9);}},Game_Battler[_0x24ad3f(0x3a6)][_0x24ad3f(0x304)]=function(_0x30e8df){const _0x3bee71=_0x24ad3f,_0x3f68ca=this[_0x3bee71(0x2a1)](_0x30e8df['id'],_0x3bee71(0x3dd))||0x0,_0x37ae46=-this['maxSlipDamage'](),_0x505d91=Math['max'](_0x3f68ca,_0x37ae46);if(_0x505d91!==0x0)this['gainHp'](_0x505d91);const _0x170aff=this[_0x3bee71(0x2a1)](_0x30e8df['id'],'slipMp')||0x0;if(_0x170aff!==0x0)this[_0x3bee71(0x23b)](_0x170aff);const _0x1d2500=this[_0x3bee71(0x2a1)](_0x30e8df['id'],_0x3bee71(0x2b7))||0x0;if(_0x1d2500!==0x0)this[_0x3bee71(0x39a)](_0x1d2500);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x289)]=Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x298)],Game_Actor['prototype'][_0x24ad3f(0x298)]=function(){const _0x7d0de7=_0x24ad3f,_0x153059=VisuMZ['SkillsStatesCore']['Game_Actor_skillTypes']['call'](this),_0x29f2c4=VisuMZ['SkillsStatesCore'][_0x7d0de7(0x236)][_0x7d0de7(0x373)];let _0x166c8a=_0x29f2c4[_0x7d0de7(0x1d7)];return $gameParty[_0x7d0de7(0x22e)]()&&(_0x166c8a=_0x166c8a[_0x7d0de7(0x2a7)](_0x29f2c4['BattleHiddenSkillTypes'])),_0x153059[_0x7d0de7(0x2c9)](_0x293470=>!_0x166c8a[_0x7d0de7(0x379)](_0x293470));},Game_Actor[_0x24ad3f(0x3a6)]['usableSkills']=function(){const _0x5e4fe5=_0x24ad3f;return this['skills']()[_0x5e4fe5(0x2c9)](_0x56ff9e=>this[_0x5e4fe5(0x3bc)](_0x56ff9e));},Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x3bc)]=function(_0x988024){const _0x52e6dd=_0x24ad3f;if(!this[_0x52e6dd(0x2dc)](_0x988024))return![];const _0x36a4b6=this[_0x52e6dd(0x298)](),_0x54b77c=DataManager[_0x52e6dd(0x346)](_0x988024),_0x2b55b0=_0x36a4b6[_0x52e6dd(0x2c9)](_0x252651=>_0x54b77c[_0x52e6dd(0x379)](_0x252651));return _0x2b55b0['length']>0x0;},Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x3e3)]=function(){const _0x2d1838=_0x24ad3f;let _0x5efeda=[this[_0x2d1838(0x21c)](),this[_0x2d1838(0x39e)]()];_0x5efeda=_0x5efeda[_0x2d1838(0x2a7)](this[_0x2d1838(0x332)]()[_0x2d1838(0x2c9)](_0x13f4e2=>_0x13f4e2));for(const _0xcd001d of this['_skills']){const _0x414674=$dataSkills[_0xcd001d];if(_0x414674)_0x5efeda[_0x2d1838(0x29c)](_0x414674);}return _0x5efeda;},Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x292)]=function(){const _0x342044=_0x24ad3f;Game_Battler[_0x342044(0x3a6)][_0x342044(0x292)][_0x342044(0x362)](this);const _0x51ad4a=VisuMZ[_0x342044(0x202)][_0x342044(0x236)][_0x342044(0x3cb)][_0x342044(0x300)];this[_0x342044(0x26b)]['passiveStates']=this['_cache']['passiveStates'][_0x342044(0x2a7)](_0x51ad4a);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x276)]=Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x216)],Game_Actor[_0x24ad3f(0x3a6)][_0x24ad3f(0x216)]=function(_0x145174){const _0x585010=_0x24ad3f;VisuMZ[_0x585010(0x202)]['Game_Actor_learnSkill'][_0x585010(0x362)](this,_0x145174),this['_cache']={};},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x240)]=Game_Actor[_0x24ad3f(0x3a6)]['forgetSkill'],Game_Actor[_0x24ad3f(0x3a6)]['forgetSkill']=function(_0x2537f2){const _0xb58c64=_0x24ad3f;VisuMZ[_0xb58c64(0x202)][_0xb58c64(0x240)][_0xb58c64(0x362)](this,_0x2537f2),this[_0xb58c64(0x26b)]={};},Game_Enemy[_0x24ad3f(0x3a6)][_0x24ad3f(0x3e3)]=function(){const _0x5f9a7e=_0x24ad3f;let _0x31bfc3=[this[_0x5f9a7e(0x1ce)]()];return _0x31bfc3['concat'](this[_0x5f9a7e(0x1bf)]());},Game_Enemy[_0x24ad3f(0x3a6)][_0x24ad3f(0x292)]=function(){const _0x580163=_0x24ad3f;Game_Battler[_0x580163(0x3a6)][_0x580163(0x292)][_0x580163(0x362)](this);const _0x1a007e=VisuMZ[_0x580163(0x202)][_0x580163(0x236)]['PassiveStates'][_0x580163(0x2b0)];this[_0x580163(0x26b)][_0x580163(0x2ea)]=this['_cache'][_0x580163(0x2ea)]['concat'](_0x1a007e);},Game_Enemy['prototype']['skills']=function(){const _0x2288eb=_0x24ad3f,_0x507fe8=[];for(const _0x4d4b19 of this[_0x2288eb(0x1ce)]()[_0x2288eb(0x20d)]){const _0x29d841=$dataSkills[_0x4d4b19[_0x2288eb(0x1e9)]];if(_0x29d841&&!_0x507fe8[_0x2288eb(0x379)](_0x29d841))_0x507fe8['push'](_0x29d841);}return _0x507fe8;},Game_Enemy[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c7)]=function(_0x8d5b03){const _0x21407a=_0x24ad3f;return this[_0x21407a(0x383)]($dataStates[_0x8d5b03]);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x25b)]=Game_Unit[_0x24ad3f(0x3a6)][_0x24ad3f(0x27c)],Game_Unit[_0x24ad3f(0x3a6)][_0x24ad3f(0x27c)]=function(){const _0x394b32=_0x24ad3f;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ['SkillsStatesCore'][_0x394b32(0x25b)][_0x394b32(0x362)](this);},Game_Unit[_0x24ad3f(0x3a6)][_0x24ad3f(0x2e1)]=function(){const _0x5a449a=_0x24ad3f,_0x2f54d6=this['aliveMembers']();for(const _0x37e486 of _0x2f54d6){if(!_0x37e486[_0x5a449a(0x2da)]())return![];}return!![];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2f4)]=Game_Troop[_0x24ad3f(0x3a6)][_0x24ad3f(0x220)],Game_Troop[_0x24ad3f(0x3a6)][_0x24ad3f(0x220)]=function(_0x1c37b9){const _0x554108=_0x24ad3f;VisuMZ['SkillsStatesCore']['Game_Troop_setup'][_0x554108(0x362)](this,_0x1c37b9),this[_0x554108(0x317)]();},Game_Troop['prototype'][_0x24ad3f(0x317)]=function(){this['_currentTroopUniqueID']=Graphics['frameCount'];},Game_Troop['prototype'][_0x24ad3f(0x237)]=function(){const _0x2ba56e=_0x24ad3f;return this[_0x2ba56e(0x368)]=this[_0x2ba56e(0x368)]||Graphics[_0x2ba56e(0x36d)],this[_0x2ba56e(0x368)];},Scene_Skill[_0x24ad3f(0x3a6)]['isBottomHelpMode']=function(){const _0x594e18=_0x24ad3f;if(ConfigManager[_0x594e18(0x374)]&&ConfigManager[_0x594e18(0x328)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x594e18(0x2e3)]()[_0x594e18(0x327)](/LOWER/i);else Scene_ItemBase[_0x594e18(0x3a6)]['isRightInputMode']['call'](this);}},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x1fb)]=function(){const _0x135617=_0x24ad3f;if(ConfigManager[_0x135617(0x374)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else return this[_0x135617(0x207)]()?this[_0x135617(0x2e3)]()[_0x135617(0x327)](/RIGHT/i):Scene_ItemBase[_0x135617(0x3a6)]['isRightInputMode'][_0x135617(0x362)](this);},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x2e3)]=function(){const _0x488dc5=_0x24ad3f;return VisuMZ[_0x488dc5(0x202)][_0x488dc5(0x236)][_0x488dc5(0x373)][_0x488dc5(0x33e)];},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x26c)]=function(){const _0x35948a=_0x24ad3f;return this[_0x35948a(0x1f8)]&&this['_categoryWindow'][_0x35948a(0x26c)]();},Scene_Skill['prototype'][_0x24ad3f(0x207)]=function(){const _0x51873b=_0x24ad3f;return VisuMZ[_0x51873b(0x202)][_0x51873b(0x236)][_0x51873b(0x373)][_0x51873b(0x212)];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x222)]=Scene_Skill['prototype'][_0x24ad3f(0x36a)],Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x36a)]=function(){const _0x9085c2=_0x24ad3f;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x9085c2(0x1db)]():VisuMZ['SkillsStatesCore'][_0x9085c2(0x222)][_0x9085c2(0x362)](this);},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x1db)]=function(){const _0x47031b=_0x24ad3f,_0x2b676b=0x0,_0xaf0df1=this[_0x47031b(0x3db)](),_0x775ba6=Graphics[_0x47031b(0x37a)],_0x27be57=this[_0x47031b(0x3bd)]();return new Rectangle(_0x2b676b,_0xaf0df1,_0x775ba6,_0x27be57);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2f3)]=Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c5)],Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c5)]=function(){const _0x46ab2d=_0x24ad3f;return this[_0x46ab2d(0x207)]()?this[_0x46ab2d(0x28f)]():VisuMZ[_0x46ab2d(0x202)][_0x46ab2d(0x2f3)][_0x46ab2d(0x362)](this);},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x28f)]=function(){const _0x331e8d=_0x24ad3f,_0x427e1d=this[_0x331e8d(0x1d9)](),_0x5ce4a6=this[_0x331e8d(0x324)](0x3,!![]),_0x4adc65=this['isRightInputMode']()?Graphics[_0x331e8d(0x37a)]-_0x427e1d:0x0,_0x479518=this[_0x331e8d(0x2ab)]();return new Rectangle(_0x4adc65,_0x479518,_0x427e1d,_0x5ce4a6);},VisuMZ[_0x24ad3f(0x202)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x35a)],Scene_Skill['prototype'][_0x24ad3f(0x35a)]=function(){const _0x444cb7=_0x24ad3f;return this[_0x444cb7(0x207)]()?this[_0x444cb7(0x1d6)]():VisuMZ[_0x444cb7(0x202)][_0x444cb7(0x2f2)]['call'](this);},Scene_Skill[_0x24ad3f(0x3a6)]['statusWindowRectSkillsStatesCore']=function(){const _0x365299=_0x24ad3f,_0x363e71=Graphics[_0x365299(0x37a)]-this[_0x365299(0x1d9)](),_0x375976=this[_0x365299(0x2eb)][_0x365299(0x309)],_0x27befb=this[_0x365299(0x1fb)]()?0x0:Graphics[_0x365299(0x37a)]-_0x363e71,_0x5ed8c0=this['mainAreaTop']();return new Rectangle(_0x27befb,_0x5ed8c0,_0x363e71,_0x375976);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1f2)]=Scene_Skill[_0x24ad3f(0x3a6)]['createItemWindow'],Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x290)]=function(){const _0x282074=_0x24ad3f;VisuMZ['SkillsStatesCore'][_0x282074(0x1f2)][_0x282074(0x362)](this),this['allowCreateShopStatusWindow']()&&this['createShopStatusWindow']();},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1fa)]=Scene_Skill['prototype']['itemWindowRect'],Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x221)]=function(){const _0x724063=_0x24ad3f;if(this[_0x724063(0x207)]())return this[_0x724063(0x3d2)]();else{const _0x58bbbe=VisuMZ[_0x724063(0x202)][_0x724063(0x1fa)][_0x724063(0x362)](this);return this[_0x724063(0x2f6)]()&&this[_0x724063(0x382)]()&&(_0x58bbbe['width']-=this[_0x724063(0x2e9)]()),_0x58bbbe;}},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x3d2)]=function(){const _0x941176=_0x24ad3f,_0xdae19c=Graphics[_0x941176(0x37a)]-this[_0x941176(0x2e9)](),_0x219543=this[_0x941176(0x263)]()-this[_0x941176(0x33b)][_0x941176(0x309)],_0x17c83f=this[_0x941176(0x1fb)]()?Graphics[_0x941176(0x37a)]-_0xdae19c:0x0,_0x5bc8fc=this['_statusWindow']['y']+this['_statusWindow'][_0x941176(0x309)];return new Rectangle(_0x17c83f,_0x5bc8fc,_0xdae19c,_0x219543);},Scene_Skill['prototype'][_0x24ad3f(0x2f6)]=function(){const _0x58d1d7=_0x24ad3f;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x58d1d7(0x207)]()?!![]:VisuMZ['SkillsStatesCore'][_0x58d1d7(0x236)][_0x58d1d7(0x373)][_0x58d1d7(0x25a)];},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x382)]=function(){const _0x5cfc0c=_0x24ad3f;return VisuMZ[_0x5cfc0c(0x202)]['Settings'][_0x5cfc0c(0x373)][_0x5cfc0c(0x36f)];},Scene_Skill['prototype'][_0x24ad3f(0x3bf)]=function(){const _0x17a434=_0x24ad3f,_0xedc3c0=this[_0x17a434(0x3b5)]();this[_0x17a434(0x371)]=new Window_ShopStatus(_0xedc3c0),this[_0x17a434(0x2b3)](this[_0x17a434(0x371)]),this['_itemWindow'][_0x17a434(0x1f5)](this[_0x17a434(0x371)]);},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x3b5)]=function(){const _0x24a23f=_0x24ad3f;return this[_0x24a23f(0x207)]()?this[_0x24a23f(0x25f)]():VisuMZ[_0x24a23f(0x202)]['Settings'][_0x24a23f(0x373)][_0x24a23f(0x238)][_0x24a23f(0x362)](this);},Scene_Skill[_0x24ad3f(0x3a6)][_0x24ad3f(0x25f)]=function(){const _0x236cdb=_0x24ad3f,_0x2ee1ed=this[_0x236cdb(0x2e9)](),_0x3804c3=this['_itemWindow'][_0x236cdb(0x309)],_0x3a4c26=this['isRightInputMode']()?0x0:Graphics[_0x236cdb(0x37a)]-this['shopStatusWidth'](),_0xfe7bf1=this[_0x236cdb(0x208)]['y'];return new Rectangle(_0x3a4c26,_0xfe7bf1,_0x2ee1ed,_0x3804c3);},Scene_Skill['prototype']['shopStatusWidth']=function(){const _0x44da59=_0x24ad3f;return Imported[_0x44da59(0x2e2)]?Scene_Shop[_0x44da59(0x3a6)][_0x44da59(0x386)]():0x0;},Scene_Skill['prototype'][_0x24ad3f(0x3c6)]=function(){const _0x244994=_0x24ad3f;return this[_0x244994(0x2eb)]&&this['_skillTypeWindow'][_0x244994(0x31d)]?TextManager[_0x244994(0x27a)]:'';},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x1de)]=Sprite_Gauge['prototype'][_0x24ad3f(0x316)],Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x316)]=function(){const _0x124f72=_0x24ad3f;VisuMZ[_0x124f72(0x202)][_0x124f72(0x1de)][_0x124f72(0x362)](this),this[_0x124f72(0x2a4)]=null;},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x322)]=Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x220)],Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x220)]=function(_0x2a8d2f,_0x21c7dd){const _0x30fa21=_0x24ad3f;this[_0x30fa21(0x392)](_0x2a8d2f,_0x21c7dd),_0x21c7dd=_0x21c7dd[_0x30fa21(0x1f6)](),VisuMZ[_0x30fa21(0x202)][_0x30fa21(0x322)][_0x30fa21(0x362)](this,_0x2a8d2f,_0x21c7dd);},Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x392)]=function(_0x301110,_0x5d6c69){const _0x2cccdc=_0x24ad3f,_0x3ee650=VisuMZ[_0x2cccdc(0x202)]['Settings'][_0x2cccdc(0x2c6)][_0x2cccdc(0x2c9)](_0x2a3db7=>_0x2a3db7[_0x2cccdc(0x1d5)][_0x2cccdc(0x3d5)]()===_0x5d6c69[_0x2cccdc(0x3d5)]());_0x3ee650[_0x2cccdc(0x37f)]>=0x1?this[_0x2cccdc(0x2a4)]=_0x3ee650[0x0]:this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x2b9)]=Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x20e)],Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x20e)]=function(){const _0x40d451=_0x24ad3f;return this['_battler']&&this['_costSettings']?this[_0x40d451(0x355)]():VisuMZ[_0x40d451(0x202)][_0x40d451(0x2b9)][_0x40d451(0x362)](this);},Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x355)]=function(){const _0x1e5aae=_0x24ad3f;return this[_0x1e5aae(0x2a4)][_0x1e5aae(0x2a9)][_0x1e5aae(0x362)](this['_battler']);},VisuMZ[_0x24ad3f(0x202)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x223)],Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x223)]=function(){const _0x5efac2=_0x24ad3f;return this[_0x5efac2(0x2c3)]&&this['_costSettings']?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x5efac2(0x202)][_0x5efac2(0x291)][_0x5efac2(0x362)](this);},Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c3)]=function(){const _0x31b660=_0x24ad3f;return this[_0x31b660(0x2a4)][_0x31b660(0x39b)]['call'](this[_0x31b660(0x2c3)]);},VisuMZ[_0x24ad3f(0x202)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x38b)],Sprite_Gauge['prototype']['gaugeRate']=function(){const _0x102afb=_0x24ad3f,_0xf960d3=VisuMZ[_0x102afb(0x202)]['Sprite_Gauge_gaugeRate'][_0x102afb(0x362)](this);return _0xf960d3['clamp'](0x0,0x1);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1c1)]=Sprite_Gauge[_0x24ad3f(0x3a6)]['redraw'],Sprite_Gauge[_0x24ad3f(0x3a6)]['redraw']=function(){const _0x587838=_0x24ad3f;this[_0x587838(0x2c3)]&&this[_0x587838(0x2a4)]?(this[_0x587838(0x378)][_0x587838(0x2d2)](),this['redrawSkillsStatesCore']()):VisuMZ['SkillsStatesCore'][_0x587838(0x1c1)]['call'](this);},Sprite_Gauge[_0x24ad3f(0x3a6)][_0x24ad3f(0x398)]=function(){const _0x56cbc9=_0x24ad3f;let _0x12b770=this[_0x56cbc9(0x20e)]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x56cbc9(0x293)]()&&(_0x12b770=VisuMZ[_0x56cbc9(0x34f)](_0x12b770)),_0x12b770;},Sprite_Gauge[_0x24ad3f(0x3a6)]['redrawSkillsStatesCore']=function(){const _0x2e1eb1=_0x24ad3f;this[_0x2e1eb1(0x2a4)][_0x2e1eb1(0x1e4)][_0x2e1eb1(0x362)](this);},Sprite_Gauge[_0x24ad3f(0x3a6)]['drawFullGauge']=function(_0x3b5604,_0x5679a2,_0x4189b9,_0x4d0fff,_0x2fff5f,_0x2a8704){const _0x3d9927=_0x24ad3f,_0x2e9f2c=this[_0x3d9927(0x38b)](),_0x1831bf=Math[_0x3d9927(0x2c5)]((_0x2fff5f-0x2)*_0x2e9f2c),_0x26244d=_0x2a8704-0x2,_0x2dcd6d=this['gaugeBackColor']();this[_0x3d9927(0x378)][_0x3d9927(0x39c)](_0x4189b9,_0x4d0fff,_0x2fff5f,_0x2a8704,_0x2dcd6d),this[_0x3d9927(0x378)][_0x3d9927(0x3b9)](_0x4189b9+0x1,_0x4d0fff+0x1,_0x1831bf,_0x26244d,_0x3b5604,_0x5679a2);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x252)]=Sprite_StateIcon[_0x24ad3f(0x3a6)]['loadBitmap'],Sprite_StateIcon['prototype'][_0x24ad3f(0x3cc)]=function(){const _0x5d28fb=_0x24ad3f;VisuMZ[_0x5d28fb(0x202)]['Sprite_StateIcon_loadBitmap'][_0x5d28fb(0x362)](this),this[_0x5d28fb(0x2ee)]();},Sprite_StateIcon[_0x24ad3f(0x3a6)][_0x24ad3f(0x2ee)]=function(){const _0x4c19e9=_0x24ad3f,_0x31426e=Window_Base['prototype'][_0x4c19e9(0x30d)]();this[_0x4c19e9(0x25e)]=new Sprite(),this[_0x4c19e9(0x25e)][_0x4c19e9(0x378)]=new Bitmap(ImageManager[_0x4c19e9(0x233)],_0x31426e),this[_0x4c19e9(0x25e)]['anchor']['x']=this[_0x4c19e9(0x241)]['x'],this[_0x4c19e9(0x25e)][_0x4c19e9(0x241)]['y']=this[_0x4c19e9(0x241)]['y'],this['addChild'](this[_0x4c19e9(0x25e)]),this['contents']=this[_0x4c19e9(0x25e)][_0x4c19e9(0x378)];},VisuMZ['SkillsStatesCore'][_0x24ad3f(0x306)]=Sprite_StateIcon[_0x24ad3f(0x3a6)][_0x24ad3f(0x1c4)],Sprite_StateIcon[_0x24ad3f(0x3a6)][_0x24ad3f(0x1c4)]=function(){const _0x2dfde8=_0x24ad3f;VisuMZ['SkillsStatesCore'][_0x2dfde8(0x306)][_0x2dfde8(0x362)](this),this[_0x2dfde8(0x303)]();},Sprite_StateIcon[_0x24ad3f(0x3a6)]['drawText']=function(_0x390b92,_0xf76654,_0x3a89b5,_0x231b73,_0x45866f){const _0x36e775=_0x24ad3f;this['contents']['drawText'](_0x390b92,_0xf76654,_0x3a89b5,_0x231b73,this[_0x36e775(0x2dd)]['height'],_0x45866f);},Sprite_StateIcon['prototype'][_0x24ad3f(0x303)]=function(){const _0x12a2cd=_0x24ad3f;this[_0x12a2cd(0x201)](),this[_0x12a2cd(0x2dd)][_0x12a2cd(0x2d2)]();const _0x402893=this['_battler'];if(!_0x402893)return;const _0x7a485f=_0x402893['states']()['filter'](_0x3d207b=>_0x3d207b[_0x12a2cd(0x349)]>0x0),_0x511c36=[...Array(0x8)[_0x12a2cd(0x3b4)]()][_0x12a2cd(0x2c9)](_0x3a68a9=>_0x402893[_0x12a2cd(0x2cf)](_0x3a68a9)!==0x0),_0x2f3ded=this['_animationIndex'],_0x52001c=_0x7a485f[_0x2f3ded];if(_0x52001c)Window_Base[_0x12a2cd(0x3a6)][_0x12a2cd(0x280)][_0x12a2cd(0x362)](this,_0x402893,_0x52001c,0x0,0x0),Window_Base[_0x12a2cd(0x3a6)][_0x12a2cd(0x282)][_0x12a2cd(0x362)](this,_0x402893,_0x52001c,0x0,0x0);else{const _0x647813=_0x511c36[_0x2f3ded-_0x7a485f[_0x12a2cd(0x37f)]];if(!_0x647813)return;Window_Base['prototype'][_0x12a2cd(0x1b1)]['call'](this,_0x402893,_0x647813,0x0,0x0),Window_Base['prototype']['drawActorBuffRates'][_0x12a2cd(0x362)](this,_0x402893,_0x647813,0x0,0x0);}},Sprite_StateIcon[_0x24ad3f(0x3a6)]['resetFontSettings']=function(){const _0x2eb1d8=_0x24ad3f;this[_0x2eb1d8(0x2dd)][_0x2eb1d8(0x248)]=$gameSystem[_0x2eb1d8(0x2be)](),this[_0x2eb1d8(0x2dd)][_0x2eb1d8(0x21d)]=$gameSystem[_0x2eb1d8(0x350)](),this[_0x2eb1d8(0x32b)]();},Sprite_StateIcon[_0x24ad3f(0x3a6)]['resetTextColor']=function(){const _0x4bc124=_0x24ad3f;this[_0x4bc124(0x3c4)](ColorManager[_0x4bc124(0x36b)]()),this[_0x4bc124(0x2d3)](ColorManager[_0x4bc124(0x27b)]());},Sprite_StateIcon[_0x24ad3f(0x3a6)]['changeTextColor']=function(_0x5204fc){const _0x2bc0c1=_0x24ad3f;this[_0x2bc0c1(0x2dd)]['textColor']=_0x5204fc;},Sprite_StateIcon[_0x24ad3f(0x3a6)][_0x24ad3f(0x2d3)]=function(_0x961473){const _0x1cf475=_0x24ad3f;this[_0x1cf475(0x2dd)]['outlineColor']=_0x961473;},Window_Base['prototype'][_0x24ad3f(0x1c6)]=function(_0x3e511c,_0x577063,_0x4e5291,_0xa937ef,_0x18acdb){const _0x2700c9=_0x24ad3f,_0x56ece0=this['createAllSkillCostText'](_0x3e511c,_0x577063),_0xd35223=this[_0x2700c9(0x343)](_0x56ece0,_0x4e5291,_0xa937ef,_0x18acdb),_0x5ed015=_0x4e5291+_0x18acdb-_0xd35223['width'];this['drawTextEx'](_0x56ece0,_0x5ed015,_0xa937ef,_0x18acdb),this['resetFontSettings']();},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ea)]=function(_0x184c09,_0x1ffe0f){const _0x37a8d8=_0x24ad3f;let _0x55d833='';for(settings of VisuMZ[_0x37a8d8(0x202)][_0x37a8d8(0x236)][_0x37a8d8(0x2c6)]){if(!this[_0x37a8d8(0x1f7)](_0x184c09,_0x1ffe0f,settings))continue;if(_0x55d833[_0x37a8d8(0x37f)]>0x0)_0x55d833+=this[_0x37a8d8(0x2cd)]();_0x55d833+=this[_0x37a8d8(0x213)](_0x184c09,_0x1ffe0f,settings);}_0x55d833=this[_0x37a8d8(0x31f)](_0x184c09,_0x1ffe0f,_0x55d833);if(_0x1ffe0f['note'][_0x37a8d8(0x327)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x55d833[_0x37a8d8(0x37f)]>0x0)_0x55d833+=this['skillCostSeparator']();_0x55d833+=String(RegExp['$1']);}return _0x55d833;},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x31f)]=function(_0x4d56a2,_0x410d66,_0x3f9b82){return _0x3f9b82;},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x1f7)]=function(_0xdf306e,_0x483c9f,_0x821ea6){const _0x1bd77c=_0x24ad3f,_0x4fcd9b=_0x821ea6[_0x1bd77c(0x270)][_0x1bd77c(0x362)](_0xdf306e,_0x483c9f);return _0x821ea6[_0x1bd77c(0x29b)]['call'](_0xdf306e,_0x483c9f,_0x4fcd9b,_0x821ea6);},Window_Base[_0x24ad3f(0x3a6)]['createSkillCostText']=function(_0x5b7659,_0x5369c8,_0x50daa9){const _0x4b802c=_0x24ad3f,_0x3c2f15=_0x50daa9[_0x4b802c(0x270)]['call'](_0x5b7659,_0x5369c8);return _0x50daa9[_0x4b802c(0x393)][_0x4b802c(0x362)](_0x5b7659,_0x5369c8,_0x3c2f15,_0x50daa9);},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x2cd)]=function(){return'\x20';},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x215)]=function(_0x234e07,_0x498427,_0x5f4585,_0x1a8390){const _0x1c2876=_0x24ad3f;if(!_0x234e07)return;VisuMZ[_0x1c2876(0x202)][_0x1c2876(0x311)]['call'](this,_0x234e07,_0x498427,_0x5f4585,_0x1a8390),this['drawActorIconsAllTurnCounters'](_0x234e07,_0x498427,_0x5f4585,_0x1a8390);},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x29a)]=function(_0x2ac37f,_0xa46089,_0x479e38,_0xfe2d78){const _0x50e161=_0x24ad3f;_0xfe2d78=_0xfe2d78||0x90;const _0x2c5ad1=ImageManager[_0x50e161(0x233)],_0x5a1c98=_0x2ac37f[_0x50e161(0x2c8)]()[_0x50e161(0x391)](0x0,Math[_0x50e161(0x2c5)](_0xfe2d78/_0x2c5ad1)),_0x371b1b=_0x2ac37f['states']()[_0x50e161(0x2c9)](_0x6fd3c3=>_0x6fd3c3[_0x50e161(0x349)]>0x0),_0x3ddc02=[...Array(0x8)[_0x50e161(0x3b4)]()][_0x50e161(0x2c9)](_0x3e0792=>_0x2ac37f[_0x50e161(0x2cf)](_0x3e0792)!==0x0),_0x3196ba=[];let _0x407624=_0xa46089;for(let _0x560884=0x0;_0x560884<_0x5a1c98[_0x50e161(0x37f)];_0x560884++){this[_0x50e161(0x201)]();const _0x49767d=_0x371b1b[_0x560884];if(_0x49767d)!_0x3196ba[_0x50e161(0x379)](_0x49767d)&&this['drawActorStateTurns'](_0x2ac37f,_0x49767d,_0x407624,_0x479e38),this[_0x50e161(0x282)](_0x2ac37f,_0x49767d,_0x407624,_0x479e38),_0x3196ba[_0x50e161(0x29c)](_0x49767d);else{const _0x2c94fe=_0x3ddc02[_0x560884-_0x371b1b[_0x50e161(0x37f)]];this['drawActorBuffTurns'](_0x2ac37f,_0x2c94fe,_0x407624,_0x479e38),this[_0x50e161(0x1ae)](_0x2ac37f,_0x2c94fe,_0x407624,_0x479e38);}_0x407624+=_0x2c5ad1;}},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x280)]=function(_0x1de48d,_0x32b5a6,_0x2b6ba4,_0x4b474f){const _0x6b2b7f=_0x24ad3f;if(!VisuMZ[_0x6b2b7f(0x202)]['Settings'][_0x6b2b7f(0x37b)][_0x6b2b7f(0x227)])return;if(!_0x1de48d[_0x6b2b7f(0x1e1)](_0x32b5a6['id']))return;if(_0x32b5a6[_0x6b2b7f(0x2a8)]===0x0)return;if(_0x32b5a6[_0x6b2b7f(0x2ac)]['match'](/<HIDE STATE TURNS>/i))return;const _0x430028=_0x1de48d[_0x6b2b7f(0x2fd)](_0x32b5a6['id']),_0x26a035=ImageManager['iconWidth'],_0x1f16ef=ColorManager[_0x6b2b7f(0x333)](_0x32b5a6);this[_0x6b2b7f(0x3c4)](_0x1f16ef),this[_0x6b2b7f(0x2d3)](_0x6b2b7f(0x3d7)),this[_0x6b2b7f(0x2dd)]['fontBold']=!![],this['contents'][_0x6b2b7f(0x21d)]=VisuMZ['SkillsStatesCore'][_0x6b2b7f(0x236)][_0x6b2b7f(0x37b)][_0x6b2b7f(0x32e)],_0x2b6ba4+=VisuMZ[_0x6b2b7f(0x202)][_0x6b2b7f(0x236)]['States'][_0x6b2b7f(0x318)],_0x4b474f+=VisuMZ[_0x6b2b7f(0x202)][_0x6b2b7f(0x236)]['States']['TurnOffsetY'],this[_0x6b2b7f(0x2c7)](_0x430028,_0x2b6ba4,_0x4b474f,_0x26a035,_0x6b2b7f(0x20a)),this[_0x6b2b7f(0x2dd)]['fontBold']=![],this['resetFontSettings']();},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x282)]=function(_0x42c159,_0x4fec0b,_0x4b15b3,_0xbde1c3){const _0x3ea914=_0x24ad3f;if(!VisuMZ[_0x3ea914(0x202)][_0x3ea914(0x236)]['States'][_0x3ea914(0x296)])return;const _0x585ed2=ImageManager[_0x3ea914(0x233)],_0x12ce69=ImageManager[_0x3ea914(0x1f3)]/0x2,_0x4ef5be=ColorManager['normalColor']();this[_0x3ea914(0x3c4)](_0x4ef5be),this[_0x3ea914(0x2d3)](_0x3ea914(0x3d7)),this[_0x3ea914(0x2dd)][_0x3ea914(0x253)]=!![],this['contents'][_0x3ea914(0x21d)]=VisuMZ['SkillsStatesCore']['Settings'][_0x3ea914(0x37b)][_0x3ea914(0x308)],_0x4b15b3+=VisuMZ[_0x3ea914(0x202)][_0x3ea914(0x236)]['States'][_0x3ea914(0x2bf)],_0xbde1c3+=VisuMZ[_0x3ea914(0x202)]['Settings'][_0x3ea914(0x37b)]['DataOffsetY'];const _0x2424db=String(_0x42c159['getStateDisplay'](_0x4fec0b['id']));this[_0x3ea914(0x2c7)](_0x2424db,_0x4b15b3,_0xbde1c3,_0x585ed2,'center'),this[_0x3ea914(0x2dd)][_0x3ea914(0x253)]=![],this[_0x3ea914(0x201)]();},Window_Base[_0x24ad3f(0x3a6)]['drawActorBuffTurns']=function(_0x35871f,_0x341792,_0x1b6df1,_0x11666e){const _0x22979b=_0x24ad3f;if(!VisuMZ[_0x22979b(0x202)][_0x22979b(0x236)][_0x22979b(0x358)][_0x22979b(0x227)])return;const _0xb3d2ad=_0x35871f[_0x22979b(0x2cf)](_0x341792);if(_0xb3d2ad===0x0)return;const _0x49acb9=_0x35871f[_0x22979b(0x239)](_0x341792),_0x180929=ImageManager['iconWidth'],_0xdae471=_0xb3d2ad>0x0?ColorManager[_0x22979b(0x1c2)]():ColorManager[_0x22979b(0x338)]();this[_0x22979b(0x3c4)](_0xdae471),this['changeOutlineColor'](_0x22979b(0x3d7)),this['contents'][_0x22979b(0x253)]=!![],this[_0x22979b(0x2dd)][_0x22979b(0x21d)]=VisuMZ[_0x22979b(0x202)][_0x22979b(0x236)][_0x22979b(0x358)]['TurnFontSize'],_0x1b6df1+=VisuMZ[_0x22979b(0x202)][_0x22979b(0x236)][_0x22979b(0x358)][_0x22979b(0x318)],_0x11666e+=VisuMZ['SkillsStatesCore'][_0x22979b(0x236)][_0x22979b(0x358)][_0x22979b(0x3ba)],this[_0x22979b(0x2c7)](_0x49acb9,_0x1b6df1,_0x11666e,_0x180929,_0x22979b(0x20a)),this[_0x22979b(0x2dd)][_0x22979b(0x253)]=![],this[_0x22979b(0x201)]();},Window_Base[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ae)]=function(_0xe3ed12,_0x5cb836,_0x5cd95b,_0x109da7){const _0x4bc7ad=_0x24ad3f;if(!VisuMZ[_0x4bc7ad(0x202)][_0x4bc7ad(0x236)][_0x4bc7ad(0x358)][_0x4bc7ad(0x296)])return;const _0x23ccd4=_0xe3ed12[_0x4bc7ad(0x206)](_0x5cb836),_0x576984=_0xe3ed12[_0x4bc7ad(0x2cf)](_0x5cb836),_0x4d9cc7=ImageManager[_0x4bc7ad(0x233)],_0x469132=ImageManager[_0x4bc7ad(0x1f3)]/0x2,_0x45eaa2=_0x576984>0x0?ColorManager['buffColor']():ColorManager[_0x4bc7ad(0x338)]();this['changeTextColor'](_0x45eaa2),this[_0x4bc7ad(0x2d3)](_0x4bc7ad(0x3d7)),this['contents']['fontBold']=!![],this['contents'][_0x4bc7ad(0x21d)]=VisuMZ[_0x4bc7ad(0x202)][_0x4bc7ad(0x236)][_0x4bc7ad(0x358)][_0x4bc7ad(0x308)],_0x5cd95b+=VisuMZ[_0x4bc7ad(0x202)][_0x4bc7ad(0x236)]['Buffs'][_0x4bc7ad(0x2bf)],_0x109da7+=VisuMZ[_0x4bc7ad(0x202)][_0x4bc7ad(0x236)]['Buffs'][_0x4bc7ad(0x32c)];const _0x3cd016='%1%'['format'](Math[_0x4bc7ad(0x26d)](_0x23ccd4*0x64));this[_0x4bc7ad(0x2c7)](_0x3cd016,_0x5cd95b,_0x109da7,_0x4d9cc7,_0x4bc7ad(0x27f)),this['contents'][_0x4bc7ad(0x253)]=![],this[_0x4bc7ad(0x201)]();},VisuMZ[_0x24ad3f(0x202)]['Window_StatusBase_placeGauge']=Window_StatusBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x265)],Window_StatusBase[_0x24ad3f(0x3a6)][_0x24ad3f(0x265)]=function(_0x326025,_0x357757,_0x2a6852,_0x2c6ca2){const _0x8641ea=_0x24ad3f;if(_0x326025['isActor']())_0x357757=this[_0x8641ea(0x31e)](_0x326025,_0x357757);this[_0x8641ea(0x2cb)](_0x326025,_0x357757,_0x2a6852,_0x2c6ca2);},Window_StatusBase[_0x24ad3f(0x3a6)]['placeExactGauge']=function(_0x2ddbfe,_0x56ae62,_0x1f580f,_0x1f8958){const _0x9d3a6=_0x24ad3f;if([_0x9d3a6(0x2c1),'untitled'][_0x9d3a6(0x379)](_0x56ae62['toLowerCase']()))return;VisuMZ[_0x9d3a6(0x202)][_0x9d3a6(0x23c)]['call'](this,_0x2ddbfe,_0x56ae62,_0x1f580f,_0x1f8958);},Window_StatusBase['prototype']['convertGaugeTypeSkillsStatesCore']=function(_0x1e60d8,_0x47b69d){const _0x2d82d7=_0x24ad3f,_0x3c613d=_0x1e60d8[_0x2d82d7(0x39e)]()[_0x2d82d7(0x2ac)];if(_0x47b69d==='hp'&&_0x3c613d['match'](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x47b69d==='mp'&&_0x3c613d[_0x2d82d7(0x327)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x47b69d==='tp'&&_0x3c613d[_0x2d82d7(0x327)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x47b69d;}},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x311)]=Window_StatusBase['prototype']['drawActorIcons'],Window_StatusBase[_0x24ad3f(0x3a6)]['drawActorIcons']=function(_0x4efba3,_0x1e094b,_0x271aad,_0x2966f2){const _0x5a5f30=_0x24ad3f;if(!_0x4efba3)return;Window_Base[_0x5a5f30(0x3a6)][_0x5a5f30(0x215)][_0x5a5f30(0x362)](this,_0x4efba3,_0x1e094b,_0x271aad,_0x2966f2);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2ec)]=Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x2a5)],Window_SkillType['prototype'][_0x24ad3f(0x2a5)]=function(_0x597b66){const _0x598ec4=_0x24ad3f;VisuMZ[_0x598ec4(0x202)]['Window_SkillType_initialize']['call'](this,_0x597b66),this['createCommandNameWindow'](_0x597b66);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0x45f45d){const _0x70c837=_0x24ad3f,_0x4dc0da=new Rectangle(0x0,0x0,_0x45f45d[_0x70c837(0x2e4)],_0x45f45d['height']);this[_0x70c837(0x232)]=new Window_Base(_0x4dc0da),this[_0x70c837(0x232)][_0x70c837(0x209)]=0x0,this[_0x70c837(0x1f4)](this['_commandNameWindow']),this[_0x70c837(0x3d3)]();},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x301)]=function(){const _0x44cca6=_0x24ad3f;Window_Command[_0x44cca6(0x3a6)]['callUpdateHelp'][_0x44cca6(0x362)](this);if(this[_0x44cca6(0x232)])this[_0x44cca6(0x3d3)]();},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x3d3)]=function(){const _0x5957b3=_0x24ad3f,_0x159527=this['_commandNameWindow'];_0x159527['contents']['clear']();const _0x4e32e1=this['commandStyleCheck'](this[_0x5957b3(0x2d5)]());if(_0x4e32e1===_0x5957b3(0x34a)&&this['maxItems']()>0x0){const _0x20ccee=this[_0x5957b3(0x2e5)](this[_0x5957b3(0x2d5)]());let _0x59debf=this[_0x5957b3(0x2c0)](this[_0x5957b3(0x2d5)]());_0x59debf=_0x59debf[_0x5957b3(0x3a5)](/\\I\[(\d+)\]/gi,''),_0x159527[_0x5957b3(0x201)](),this[_0x5957b3(0x331)](_0x59debf,_0x20ccee),this[_0x5957b3(0x1ee)](_0x59debf,_0x20ccee),this[_0x5957b3(0x1c3)](_0x59debf,_0x20ccee);}},Window_SkillType[_0x24ad3f(0x3a6)]['commandNameWindowDrawBackground']=function(_0xc1dbdc,_0x44f63b){},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ee)]=function(_0x3118bf,_0x4a2bd1){const _0x34f76f=_0x24ad3f,_0x15a4e1=this[_0x34f76f(0x232)];_0x15a4e1['drawText'](_0x3118bf,0x0,_0x4a2bd1['y'],_0x15a4e1[_0x34f76f(0x33d)],_0x34f76f(0x27f));},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x1c3)]=function(_0x1b0f45,_0x155c11){const _0x5a4231=_0x24ad3f,_0x1ca012=this['_commandNameWindow'],_0x1116ec=$gameSystem[_0x5a4231(0x295)](),_0x612b5=_0x155c11['x']+Math['floor'](_0x155c11[_0x5a4231(0x2e4)]/0x2)+_0x1116ec;_0x1ca012['x']=_0x1ca012[_0x5a4231(0x2e4)]/-0x2+_0x612b5,_0x1ca012['y']=Math[_0x5a4231(0x2c5)](_0x155c11[_0x5a4231(0x309)]/0x2);},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x26c)]=function(){const _0x1eb424=_0x24ad3f;return Imported[_0x1eb424(0x274)]&&Window_Command['prototype']['isUseModernControls'][_0x1eb424(0x362)](this);},Window_SkillType['prototype']['makeCommandList']=function(){const _0x41f6a6=_0x24ad3f;if(!this[_0x41f6a6(0x3e6)])return;const _0x287cf4=this[_0x41f6a6(0x3e6)][_0x41f6a6(0x298)]();for(const _0x1f602a of _0x287cf4){const _0x6f5bb6=this[_0x41f6a6(0x348)](_0x1f602a);this[_0x41f6a6(0x2b4)](_0x6f5bb6,_0x41f6a6(0x230),!![],_0x1f602a);}},Window_SkillType['prototype'][_0x24ad3f(0x348)]=function(_0xb5e935){const _0x3b0900=_0x24ad3f;let _0xd70349=$dataSystem[_0x3b0900(0x298)][_0xb5e935];if(_0xd70349['match'](/\\I\[(\d+)\]/i))return _0xd70349;if(this[_0x3b0900(0x1bd)]()==='text')return _0xd70349;const _0x3bd104=VisuMZ[_0x3b0900(0x202)][_0x3b0900(0x236)][_0x3b0900(0x373)],_0x9f5720=$dataSystem[_0x3b0900(0x22c)][_0x3b0900(0x379)](_0xb5e935),_0x541800=_0x9f5720?_0x3bd104[_0x3b0900(0x36e)]:_0x3bd104[_0x3b0900(0x389)];return _0x3b0900(0x1e5)[_0x3b0900(0x285)](_0x541800,_0xd70349);},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x1ec)]=function(){const _0x5d5676=_0x24ad3f;return VisuMZ['SkillsStatesCore'][_0x5d5676(0x236)][_0x5d5676(0x373)]['CmdTextAlign'];},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x3e2)]=function(_0x5b092e){const _0x21164e=_0x24ad3f,_0x219728=this['commandStyleCheck'](_0x5b092e);if(_0x219728===_0x21164e(0x3a7))this[_0x21164e(0x214)](_0x5b092e);else _0x219728===_0x21164e(0x34a)?this[_0x21164e(0x37d)](_0x5b092e):Window_Command['prototype'][_0x21164e(0x3e2)][_0x21164e(0x362)](this,_0x5b092e);},Window_SkillType[_0x24ad3f(0x3a6)]['commandStyle']=function(){const _0x25ca2c=_0x24ad3f;return VisuMZ[_0x25ca2c(0x202)][_0x25ca2c(0x236)]['Skills'][_0x25ca2c(0x35d)];},Window_SkillType['prototype'][_0x24ad3f(0x1e8)]=function(_0x1a6394){const _0x2e45dd=_0x24ad3f;if(_0x1a6394<0x0)return'text';const _0x189731=this[_0x2e45dd(0x1bd)]();if(_0x189731!=='auto')return _0x189731;else{if(this[_0x2e45dd(0x264)]()>0x0){const _0x1845ce=this[_0x2e45dd(0x2c0)](_0x1a6394);if(_0x1845ce[_0x2e45dd(0x327)](/\\I\[(\d+)\]/i)){const _0x272024=this[_0x2e45dd(0x2e5)](_0x1a6394),_0x245a68=this[_0x2e45dd(0x343)](_0x1845ce)[_0x2e45dd(0x2e4)];return _0x245a68<=_0x272024[_0x2e45dd(0x2e4)]?'iconText':_0x2e45dd(0x34a);}}}return _0x2e45dd(0x234);},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x214)]=function(_0x4d6a20){const _0x4b9438=_0x24ad3f,_0x5b7c49=this['itemLineRect'](_0x4d6a20),_0xd8d272=this['commandName'](_0x4d6a20),_0x516a80=this[_0x4b9438(0x343)](_0xd8d272)['width'];this[_0x4b9438(0x23a)](this['isCommandEnabled'](_0x4d6a20));const _0x43fb5e=this[_0x4b9438(0x1ec)]();if(_0x43fb5e==='right')this[_0x4b9438(0x235)](_0xd8d272,_0x5b7c49['x']+_0x5b7c49[_0x4b9438(0x2e4)]-_0x516a80,_0x5b7c49['y'],_0x516a80);else{if(_0x43fb5e===_0x4b9438(0x27f)){const _0x43d474=_0x5b7c49['x']+Math[_0x4b9438(0x2c5)]((_0x5b7c49[_0x4b9438(0x2e4)]-_0x516a80)/0x2);this[_0x4b9438(0x235)](_0xd8d272,_0x43d474,_0x5b7c49['y'],_0x516a80);}else this[_0x4b9438(0x235)](_0xd8d272,_0x5b7c49['x'],_0x5b7c49['y'],_0x516a80);}},Window_SkillType[_0x24ad3f(0x3a6)][_0x24ad3f(0x37d)]=function(_0x55ad64){const _0x2b1817=_0x24ad3f;this[_0x2b1817(0x2c0)](_0x55ad64)[_0x2b1817(0x327)](/\\I\[(\d+)\]/i);const _0x2cc819=Number(RegExp['$1'])||0x0,_0x9d3569=this[_0x2b1817(0x2e5)](_0x55ad64),_0x3b506e=_0x9d3569['x']+Math[_0x2b1817(0x2c5)]((_0x9d3569['width']-ImageManager[_0x2b1817(0x233)])/0x2),_0xa29783=_0x9d3569['y']+(_0x9d3569[_0x2b1817(0x309)]-ImageManager[_0x2b1817(0x1f3)])/0x2;this[_0x2b1817(0x1e7)](_0x2cc819,_0x3b506e,_0xa29783);},VisuMZ[_0x24ad3f(0x202)]['Window_SkillStatus_refresh']=Window_SkillStatus['prototype'][_0x24ad3f(0x23f)],Window_SkillStatus[_0x24ad3f(0x3a6)][_0x24ad3f(0x23f)]=function(){const _0x262a2e=_0x24ad3f;VisuMZ[_0x262a2e(0x202)][_0x262a2e(0x287)][_0x262a2e(0x362)](this);if(this['_actor'])this[_0x262a2e(0x219)]();},Window_SkillStatus[_0x24ad3f(0x3a6)][_0x24ad3f(0x219)]=function(){const _0x1fde7e=_0x24ad3f;if(!Imported[_0x1fde7e(0x274)])return;if(!Imported[_0x1fde7e(0x37c)])return;const _0xb90619=this[_0x1fde7e(0x25d)]();let _0x5777c7=this['colSpacing']()/0x2+0xb4+0xb4+0xb4,_0x24d481=this[_0x1fde7e(0x33d)]-_0x5777c7-0x2;if(_0x24d481>=0x12c){const _0x24e58a=VisuMZ[_0x1fde7e(0x3a2)][_0x1fde7e(0x236)][_0x1fde7e(0x339)][_0x1fde7e(0x1fe)],_0x246949=Math['floor'](_0x24d481/0x2)-0x18;let _0x4bb48d=_0x5777c7,_0x16f057=Math['floor']((this[_0x1fde7e(0x3dc)]-Math[_0x1fde7e(0x2ad)](_0x24e58a['length']/0x2)*_0xb90619)/0x2),_0x5b010b=0x0;for(const _0x5e97ff of _0x24e58a){this[_0x1fde7e(0x279)](_0x4bb48d,_0x16f057,_0x246949,_0x5e97ff),_0x5b010b++,_0x5b010b%0x2===0x0?(_0x4bb48d=_0x5777c7,_0x16f057+=_0xb90619):_0x4bb48d+=_0x246949+0x18;}}this['resetFontSettings']();},Window_SkillStatus['prototype'][_0x24ad3f(0x279)]=function(_0x10c6d2,_0x194052,_0x507162,_0x1abaa6){const _0x20f430=_0x24ad3f,_0x56b818=this['gaugeLineHeight']();this[_0x20f430(0x201)](),this['drawParamText'](_0x10c6d2,_0x194052,_0x507162,_0x1abaa6,!![]),this[_0x20f430(0x32b)](),this[_0x20f430(0x2dd)]['fontSize']-=0x8;const _0x387907=this[_0x20f430(0x3e6)][_0x20f430(0x340)](_0x1abaa6,!![]);this[_0x20f430(0x2dd)]['drawText'](_0x387907,_0x10c6d2,_0x194052,_0x507162,_0x56b818,'right');},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x387)]=Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x379)],Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x379)]=function(_0x38a0f7){return this['includesSkillsStatesCore'](_0x38a0f7);},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x2f5)]=Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x319)],Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x319)]=function(){const _0x2d857a=_0x24ad3f;return SceneManager[_0x2d857a(0x335)][_0x2d857a(0x2c4)]===Scene_Battle?VisuMZ[_0x2d857a(0x202)][_0x2d857a(0x2f5)][_0x2d857a(0x362)](this):VisuMZ[_0x2d857a(0x202)][_0x2d857a(0x236)][_0x2d857a(0x373)][_0x2d857a(0x21a)];},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1fd)]=Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x330)],Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x330)]=function(_0xba0009){const _0x170f1e=_0x24ad3f,_0x5a9757=this[_0x170f1e(0x3e6)]!==_0xba0009;VisuMZ[_0x170f1e(0x202)][_0x170f1e(0x1fd)][_0x170f1e(0x362)](this,_0xba0009),_0x5a9757&&(this[_0x170f1e(0x33b)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x170f1e(0x33b)][_0x170f1e(0x3a1)](this[_0x170f1e(0x321)](0x0)));},Window_SkillList['prototype'][_0x24ad3f(0x2cc)]=function(_0x3dcda1){const _0x117fe8=_0x24ad3f;if(this[_0x117fe8(0x31b)]===_0x3dcda1)return;this[_0x117fe8(0x31b)]=_0x3dcda1,this[_0x117fe8(0x23f)](),this[_0x117fe8(0x26e)](0x0,0x0),this[_0x117fe8(0x33b)]&&this[_0x117fe8(0x33b)][_0x117fe8(0x2c4)]===Window_ShopStatus&&this[_0x117fe8(0x33b)][_0x117fe8(0x3a1)](this[_0x117fe8(0x321)](0x0));},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x1b9)]=function(_0x11e810){const _0xc1f5e3=_0x24ad3f;if(!_0x11e810)return VisuMZ['SkillsStatesCore'][_0xc1f5e3(0x387)][_0xc1f5e3(0x362)](this,_0x11e810);if(!this[_0xc1f5e3(0x2a6)](_0x11e810))return![];if(!this[_0xc1f5e3(0x217)](_0x11e810))return![];if(!this[_0xc1f5e3(0x3c1)](_0x11e810))return![];return!![];},Window_SkillList['prototype'][_0x24ad3f(0x2a6)]=function(_0x367412){const _0x834bcc=_0x24ad3f;return DataManager[_0x834bcc(0x346)](_0x367412)[_0x834bcc(0x379)](this['_stypeId']);},Window_SkillList[_0x24ad3f(0x3a6)]['checkShowHideNotetags']=function(_0x238441){const _0x29983e=_0x24ad3f;if(!this[_0x29983e(0x2ba)](_0x238441))return![];if(!this[_0x29983e(0x211)](_0x238441))return![];if(!this[_0x29983e(0x3ae)](_0x238441))return![];return!![];},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x2ba)]=function(_0x5d9a1c){const _0x5cc779=_0x24ad3f,_0x2fd510=_0x5d9a1c[_0x5cc779(0x2ac)];if(_0x2fd510['match'](/<HIDE IN BATTLE>/i)&&$gameParty[_0x5cc779(0x22e)]())return![];else return _0x2fd510[_0x5cc779(0x327)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x5cc779(0x22e)]()?![]:!![];},Window_SkillList['prototype']['checkShowHideSwitchNotetags']=function(_0x2c3b8e){const _0x207647=_0x24ad3f,_0x351fcc=_0x2c3b8e['note'];if(_0x351fcc['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b4cca=JSON[_0x207647(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2d016a of _0x5b4cca){if(!$gameSwitches[_0x207647(0x2d6)](_0x2d016a))return![];}return!![];}if(_0x351fcc[_0x207647(0x327)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c6605=JSON['parse']('['+RegExp['$1'][_0x207647(0x327)](/\d+/g)+']');for(const _0x3cd68f of _0x2c6605){if(!$gameSwitches['value'](_0x3cd68f))return![];}return!![];}if(_0x351fcc[_0x207647(0x327)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xc723eb=JSON[_0x207647(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x518176 of _0xc723eb){if($gameSwitches[_0x207647(0x2d6)](_0x518176))return!![];}return![];}if(_0x351fcc[_0x207647(0x327)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x206c6d=JSON[_0x207647(0x3a9)]('['+RegExp['$1'][_0x207647(0x327)](/\d+/g)+']');for(const _0x1a0b55 of _0x206c6d){if(!$gameSwitches['value'](_0x1a0b55))return!![];}return![];}if(_0x351fcc[_0x207647(0x327)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f850c=JSON[_0x207647(0x3a9)]('['+RegExp['$1'][_0x207647(0x327)](/\d+/g)+']');for(const _0x561a2c of _0x3f850c){if(!$gameSwitches[_0x207647(0x2d6)](_0x561a2c))return!![];}return![];}if(_0x351fcc[_0x207647(0x327)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d30fc=JSON[_0x207647(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x304bee of _0x2d30fc){if($gameSwitches[_0x207647(0x2d6)](_0x304bee))return![];}return!![];}return!![];},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x3ae)]=function(_0xdaa0f5){const _0x1eb9b0=_0x24ad3f,_0x4d8d7e=_0xdaa0f5[_0x1eb9b0(0x2ac)];if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x314d88=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0xa1b214 of _0x314d88){if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0xa1b214))return![];}return!![];}else{if(_0x4d8d7e['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xa9d0c2=RegExp['$1']['split'](',');for(const _0x5dae23 of _0xa9d0c2){const _0x24367c=DataManager['getSkillIdWithName'](_0x5dae23);if(!_0x24367c)continue;if(!this[_0x1eb9b0(0x3e6)]['isLearnedSkill'](_0x24367c))return![];}return!![];}}if(_0x4d8d7e['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16cfd5=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x3f16f2 of _0x16cfd5){if(!this['_actor'][_0x1eb9b0(0x23e)](_0x3f16f2))return![];}return!![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4f4fc6=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x4602ff of _0x4f4fc6){const _0x315ecd=DataManager['getSkillIdWithName'](_0x4602ff);if(!_0x315ecd)continue;if(!this[_0x1eb9b0(0x3e6)]['isLearnedSkill'](_0x315ecd))return![];}return!![];}}if(_0x4d8d7e['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x541427=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x33827a of _0x541427){if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x33827a))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xd086c=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x28cbfa of _0xd086c){const _0x1a32bc=DataManager[_0x1eb9b0(0x204)](_0x28cbfa);if(!_0x1a32bc)continue;if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x1a32bc))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23c8cd=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x3badb3 of _0x23c8cd){if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x3badb3))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2e9bd8=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x187551 of _0x2e9bd8){const _0x242230=DataManager['getSkillIdWithName'](_0x187551);if(!_0x242230)continue;if(!this['_actor']['isLearnedSkill'](_0x242230))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x39a0bb=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x130822 of _0x39a0bb){if(!this['_actor'][_0x1eb9b0(0x23e)](_0x130822))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x721614=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x9eef37 of _0x721614){const _0x398ffb=DataManager[_0x1eb9b0(0x204)](_0x9eef37);if(!_0x398ffb)continue;if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x398ffb))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b309b=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x32589d of _0x3b309b){if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x32589d))return![];}return!![];}else{if(_0x4d8d7e['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5e86a5=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x40c343 of _0x5e86a5){const _0x5b07fd=DataManager['getSkillIdWithName'](_0x40c343);if(!_0x5b07fd)continue;if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x23e)](_0x5b07fd))return![];}return!![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4bae87=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x5e79bf of _0x4bae87){if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x5e79bf))return![];}return!![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x12bca8=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x38d29a of _0x12bca8){const _0x46712a=DataManager[_0x1eb9b0(0x204)](_0x38d29a);if(!_0x46712a)continue;if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x46712a))return![];}return!![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x248f42=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0xcbb4a2 of _0x248f42){if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0xcbb4a2))return![];}return!![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4a8630=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x50200d of _0x4a8630){const _0x32ba88=DataManager[_0x1eb9b0(0x204)](_0x50200d);if(!_0x32ba88)continue;if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x32ba88))return![];}return!![];}}if(_0x4d8d7e['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51fc5d=JSON['parse']('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x4bf15f of _0x51fc5d){if(this['_actor'][_0x1eb9b0(0x2d1)](_0x4bf15f))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x249883=RegExp['$1']['split'](',');for(const _0x27e5ce of _0x249883){const _0x129e17=DataManager['getSkillIdWithName'](_0x27e5ce);if(!_0x129e17)continue;if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x129e17))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e85b3=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x43419f of _0x5e85b3){if(!this['_actor'][_0x1eb9b0(0x2d1)](_0x43419f))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x41a06f=RegExp['$1']['split'](',');for(const _0x445e89 of _0x41a06f){const _0x5c6765=DataManager['getSkillIdWithName'](_0x445e89);if(!_0x5c6765)continue;if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x5c6765))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2111ea=JSON['parse']('['+RegExp['$1'][_0x1eb9b0(0x327)](/\d+/g)+']');for(const _0x34336e of _0x2111ea){if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x34336e))return!![];}return![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e1ab5=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x288f42 of _0x1e1ab5){const _0x555dfb=DataManager['getSkillIdWithName'](_0x288f42);if(!_0x555dfb)continue;if(!this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x555dfb))return!![];}return![];}}if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58dee7=JSON[_0x1eb9b0(0x3a9)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x411df6 of _0x58dee7){if(this[_0x1eb9b0(0x3e6)]['hasSkill'](_0x411df6))return![];}return!![];}else{if(_0x4d8d7e[_0x1eb9b0(0x327)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2cdb98=RegExp['$1'][_0x1eb9b0(0x30c)](',');for(const _0x75d2b7 of _0x2cdb98){const _0x36ff46=DataManager['getSkillIdWithName'](_0x75d2b7);if(!_0x36ff46)continue;if(this[_0x1eb9b0(0x3e6)][_0x1eb9b0(0x2d1)](_0x36ff46))return![];}return!![];}}return!![];},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x3c1)]=function(_0x5d3529){const _0x197271=_0x24ad3f,_0x5a5816=_0x5d3529['note'],_0x46ad65=VisuMZ['SkillsStatesCore']['skillVisibleJS'];return _0x46ad65[_0x5d3529['id']]?_0x46ad65[_0x5d3529['id']][_0x197271(0x362)](this,_0x5d3529):!![];},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x1c6)]=function(_0x11b56c,_0x53f6cd,_0x54d24d,_0x167911){const _0x4e21ea=_0x24ad3f;Window_Base[_0x4e21ea(0x3a6)][_0x4e21ea(0x1c6)][_0x4e21ea(0x362)](this,this[_0x4e21ea(0x3e6)],_0x11b56c,_0x53f6cd,_0x54d24d,_0x167911);},Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x1f5)]=function(_0x52b200){const _0x3d69f4=_0x24ad3f;this[_0x3d69f4(0x33b)]=_0x52b200,this[_0x3d69f4(0x301)]();},VisuMZ[_0x24ad3f(0x202)][_0x24ad3f(0x1cf)]=Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x35e)],Window_SkillList[_0x24ad3f(0x3a6)][_0x24ad3f(0x35e)]=function(){const _0x3793e1=_0x24ad3f;VisuMZ[_0x3793e1(0x202)][_0x3793e1(0x1cf)][_0x3793e1(0x362)](this),this[_0x3793e1(0x33b)]&&this[_0x3793e1(0x33b)][_0x3793e1(0x2c4)]===Window_ShopStatus&&this[_0x3793e1(0x33b)][_0x3793e1(0x3a1)](this[_0x3793e1(0x35b)]());};