//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.21;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.21] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
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
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * - Damage popups have also been rewritten to show all changed aspects instead
 * of just one. Previously with RPG Maker MZ, if an action would deal both HP
 * and MP damage, only one of them would show. Now, everything is separated and
 * both HP and MP changes will at a time.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
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
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 * 
 * <Battle UI Offset: +x, +y>
 * <Battle UI Offset: -x, -y>
 * 
 * <Battle UI Offset X: +x>
 * <Battle UI Offset X: -x>
 * 
 * <Battle UI Offset Y: +y>
 * <Battle UI Offset Y: -y>
 * 
 * - Used for: Actor and Enemy Notetags
 * - Adjusts the offset of HP Gauges and State Icons above the heads of actors
 *   and enemies.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 *  Combat Log
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * <Battle Portrait Offset: +x, +y>
 * <Battle Portrait Offset: -x, -y>
 * 
 * <Battle Portrait Offset X: +x>
 * <Battle Portrait Offset X: -x>
 * 
 * <Battle Portrait Offset Y: +y>
 * <Battle Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" and "Border" Battle Layouts.
 * - Offsets the X and Y coordinates for the battle portrait.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to physical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Magic Reduction: x>
 * <Magic Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Magic Penetration: x>
 * <Magic Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - This applies to magical attacks.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 * 
 * <Auto Action Sequence>
 * 
 * - Used for: Skill, Item Notetags
 * - If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
 *   plugin will prevent custom action sequences from happening for the skill
 *   or item, and instead, use an Automatic Action Sequence instead.
 * - Ignore this if you have "Auto Notetag" disabled or set to false.
 * 
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 * 
 * <Battler Sprite Grounded>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to jumping and/or floating due to
 *   Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate>
 *
 * <JS Post-Regenerate>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 * 
 * === Battle Layout-Related Notetags ===
 * 
 * These tags will change the battle layout for a troop regardless of how the
 * plugin parameters are set up normally. Insert these tags in either the
 * noteboxes of maps or the names of troops for them to take effect. If both
 * are present for a specific battle, then priority goes to the setting found
 * in the troop name.
 * 
 * ---
 * 
 * <Layout: type>
 * <Battle Layout: type>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle layout style used for this specific map or battle.
 * - Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 * 
 * === Action Sequences - Angle ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 * 
 *   Copy to Combat Log?:
 *   - Copies text to the Combat Log.
 *   - Requires VisuMZ_4_CombatLog
 * 
 *     Combat Log Icon:
 *     - What icon would you like to bind to this entry?
 *     - Requires VisuMZ_4_CombatLog
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 * 
 * === Action Sequences - Horror Effects ===
 * 
 * These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 * 
 * ---
 *
 * HORROR: Clear All Filters
 * - Clear all Horror Effects filters on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove Horror Effects for.
 *
 * ---
 *
 * HORROR: Glitch Create
 * - Creates the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Glitch Slices:
 *   - Glitch slices to be used with the target.
 *
 *   Glitch Offset:
 *   - Default offset value.
 *
 *   Glitch Animated?:
 *   - Animate the glitch effect?
 *
 *   Glitch Frequency:
 *   - If animated, how frequent to make the glitch effect?
 *   - Lower = often     Higher = rarer
 *
 *   Glitch Strength:
 *   - If animated, how strong is the glitch effect?
 *   - Lower = weaker     Higher = stronger
 *
 * ---
 *
 * HORROR: Glitch Remove
 * - Removes the glitch effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: Noise Create
 * - Creates the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   Noise Rate:
 *   - Noise rate to be used with the target.
 *
 *   Noise Animated:
 *   - Animate the noise for the target?
 *
 * ---
 *
 * HORROR: Noise Remove
 * - Removes the noise effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 *
 * HORROR: TV Create
 * - Creates the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to create the Horror Effect for.
 *
 *   TV Line Thickness:
 *   - Default TV line thickness
 *   - Lower = thinner     Higher = thicker
 *
 *   TV Corner Size:
 *   - Default TV line corner size
 *   - Lower = smaller     Higher = bigger
 *
 *   TV Animated:
 *   - Animate the TV?
 *
 *   TV Speed:
 *   - Speed used to animate the TV if animated
 *   - Lower = slower     Higher = faster
 *
 * ---
 *
 * HORROR: TV Remove
 * - Removes the TV effect on the target battler(s).
 *
 *   Targets:
 *   - Select unit(s) to remove the Horror Effect for.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 * 
 * MECH: BTB Brave Points
 * - Alters the target(s) Brave Points to an exact value.
 * - Requires VisuMZ_2_BattleSystemBTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Alter Brave Points By:
 *   - Alters the target(s) Brave Points.
 *   - Positive for gaining BP.
 *   - Negative for losing BP.
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 * 
 * MECH: CTB Order
 * - Alters the CTB Turn Order.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Turn Order for.
 * 
 *   Change Order By:
 *   - Changes turn order for target(s) by this amount.
 *   - Positive increases wait. Negative decreases wait.
 * 
 * ---
 * 
 * MECH: CTB Speed
 * - Alters the CTB Speed.
 * - Requires VisuMZ_2_BattleSystemCTB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the CTB Speed for.
 * 
 *   Charge Rate:
 *   - Changes made to the CTB Speed if it is currently charging.
 * 
 *   Cast Rate:
 *   - Changes made to the CTB Speed if it is currently casting.
 * 
 * ---
 * 
 * MECH: Custom Damage Formula
 * - Changes the current action's damage formula to custom.
 * - This will assume the MANUAL damage style.
 * 
 *   Formula:
 *   - Changes the current action's damage formula to custom.
 *   - Use 'default' to revert the damage formula.
 * 
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: STB Exploit Effect
 * - Utilize the STB Exploitation mechanics!
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Target(s) Exploited?:
 *   - Exploit the below targets?
 * 
 *     Targets:
 *     - Select unit(s) to become exploited.
 * 
 *     Force Exploitation:
 *     - Force the exploited status?
 * 
 *   User Exploiter?:
 *   - Allow the user to become the exploiter?
 * 
 *     Force Exploitation:
 *     - Force the exploiter status?
 * 
 * ---
 * 
 * MECH: STB Extra Action
 * - Adds an extra action for the currently active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Extra Actions:
 *   - How many extra actions should the active battler gain?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: STB Remove Excess Actions
 * - Removes excess actions from the active battler.
 * - Requires VisuMZ_2_BattleSystemSTB!
 * 
 *   Remove Actions:
 *   - How many actions to remove from the active battler?
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * MECH: Variable Popup
 * - Causes the unit(s) to display a popup using the data stored inside
 *   a variable.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Variable:
 *   - Get data from which variable to display as a popup?
 * 
 *   Digit Grouping:
 *   - Use digit grouping to separate numbers?
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 * 
 * MOTION: Clear Freeze Frame
 * - Clears any freeze frames from the unit(s).
 * 
 *   Targets:
 *   - Select which unit(s) to clear freeze frames for.
 * 
 * ---
 * 
 * MOTION: Freeze Motion Frame
 * - Forces a freeze frame instantly at the selected motion.
 * - Automatically clears with a new motion.
 * 
 *   Targets:
 *   - Select which unit(s) to freeze motions for.
 * 
 *   Motion Type:
 *   - Freeze this motion for the unit(s).
 * 
 *   Frame Index:
 *   - Which frame do you want to freeze the motion on?
 *   - Frame index values start at 0.
 * 
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 * 
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change opacity.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Scale/Grow/Shrink
 * - Causes the unit(s) to scale, grow, or shrink?.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change the scale of.
 *
 *   Scale X:
 *   Scale Y:
 *   - What target scale value do you want?
 *   - 1.0 is normal size.
 *
 *   Duration:
 *   - Duration in frames to scale for.
 *
 *   Scale Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Scale?:
 *   - Wait for scaling to complete before performing next command?
 *
 * ---
 *
 * MOVE: Skew/Distort
 * - Causes the unit(s) to skew.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to skew.
 *
 *   Skew X:
 *   Skew Y:
 *   - What variance to skew?
 *   - Use small values for the best results.
 *
 *   Duration:
 *   - Duration in frames to skew for.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew to complete before performing next command?
 *
 * ---
 *
 * MOVE: Spin/Rotate
 * - Causes the unit(s) to spin.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to spin.
 *
 *   Angle:
 *   - How many degrees to spin?
 *
 *   Duration:
 *   - Duration in frames to spin for.
 *
 *   Spin Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Revert Angle on Finish:
 *   - Upon finishing the spin, revert the angle back to 0.
 *
 *   Wait For Spin?:
 *   - Wait for spin to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Scale
 * - Waits for scaling to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Skew
 * - Waits for skewing to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Spin
 * - Waits for spinning to complete before performing next command.
 *
 * ---
 * 
 * === Action Sequences - Projectiles ===
 * 
 * Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * ---
 *
 * PROJECTILE: Animation
 * - Create an animation projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Animation ID:
 *     - Determine which animation to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Icon
 * - Create an icon projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Icon:
 *     - Determine which icon to use as a projectile.
 *       - You may use JavaScript code.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 *
 * PROJECTILE: Picture
 * - Create a picture projectile and fire it at a target.
 * - Requires VisuMZ_3_ActSeqProjectiles!
 *
 *   Coordinates:
 *
 *     Start Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should start from.
 *         - Target - Start from battler target(s)
 *         - Point - Start from a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) to start the projectile from.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to start the projectile at.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *     Goal Location:
 *     - Settings to determine where the projectile(s) start from.
 *
 *       Type:
 *       - Select where the projectile should go to.
 *         - Target - Goal is battler target(s)
 *         - Point - Goal is a point on the screen
 *
 *         Target(s):
 *         - Select which unit(s) for projectile to go to.
 *
 *           Centralize:
 *           - Create one projectile at the center of the targets?
 *           - Or create a projectile for each target?
 *
 *         Point X:
 *         Point Y:
 *         - Insert the X/Y coordinate to send the projectile to.
 *         - You may use JavaScript code.
 *
 *       Offset X:
 *       Offset Y:
 *       - Insert how many pixels to offset the X/Y coordinate by.
 *       - You may use JavaScript code.
 *
 *   Settings:
 *
 *     Picture Filename:
 *     - Determine which picture to use as a projectile.
 *
 *     Duration:
 *     - Duration for the projectile(s) to travel.
 *
 *     Wait For Projectile?:
 *     - Wait for projectile(s) to reach their destination before going onto
 *       the next command?
 *
 *     Extra Settings:
 *     - Add extra settings to the projectile?
 *
 *       Auto Angle?:
 *       - Automatically angle the projectile to tilt the direction
 *         it's moving?
 *
 *       Angle Offset:
 *       - Alter the projectile's tilt by this many degrees.
 *
 *       Arc Peak:
 *       - This is the height of the project's trajectory arc in pixels.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the projectile?
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Easing:
 *       - Select which easing type to apply to the projectile's trajectory.
 *
 *       Hue:
 *       - Adjust the hue of the projectile.
 *       - Insert a number between 0 and 360.
 *
 *       Scale:
 *       - Adjust the size scaling of the projectile.
 *       - Use decimals for exact control.
 *
 *       Spin Speed:
 *       - Determine how much angle the projectile spins per frame.
 *       - Does not work well with "Auto Angle".
 *
 * ---
 * 
 * === Action Sequences - Skew ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Sets how much to offset the sprites by horizontally/vertically.
 * 
 *   Shift X:
 *   Shift Y:
 *   - Sets how much to shift the sprites by horizontally/vertically.
 * 
 *   Shift Y:
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events (on Map)
 * 
 *   Pre-Battle Event:
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *   - These common events only run on the map scene. They're not meant to run
 *     in the battle scene.
 *   - If the "Defeat Event" has a common event attached to it, then random
 *     encounters will be changed to allow defeat without being sent to the
 *     Game Over scene. Instead, the game will send the player to the map scene
 *     where the Defeat Event will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 * 
 *   Command Window Width:
 *   - Determine the window width for the Party and Actor Command Windows.
 *   - Affects Default and List Battle Layout styles.
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battleback Scaling Settings
 * ============================================================================
 *
 * By default, the battlebacks in RPG Maker MZ scale as if the screen size is
 * a static 816x624 resolution, which isn't always the case. These settings
 * here allow you to dictate how you want the battlebacks to scale for the
 * whole game. These settings CANNOT be changed midgame or per battle.
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default scaling style used for battlebacks.
 *   - MZ (MZ's default style)
 *   - 1:1 (No Scaling)
 *   - Scale To Fit (Scale to screen size)
 *   - Scale Down (Scale Downward if Larger than Screen)
 *   - Scale Up (Scale Upward if Smaller than Screen)
 * 
 *   JS: 1:1:
 *   JS: Scale To Fit:
 *   JS: Scale Down:
 *   JS: Scale Up:
 *   JS: 1:1:
 *   JS: 1:1:
 *   - This code gives you control over the scaling for this style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Chant Style:
 *   - What determines the chant motion?
 *   - Hit type or skill type?
 * 
 *   Offset X:
 *   - Offsets X position where actor is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where actor is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Priority: Active:
 *   - Place the active actor on top of actor and enemy sprites.
 * 
 *   Priority: Actors:
 *   - Prioritize actors over enemies when placing sprites on top of each other
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 * 
 *   Offset X:
 *   - Offsets X position where enemy is positioned.
 *   - Negative values go left. Positive values go right.
 * 
 *   Offset Y:
 *   - Offsets Y position where enemy is positioned.
 *   - Negative values go up. Positive values go down.
 * 
 *   Smooth Image:
 *   - Smooth out the battler images or pixelate them?
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 * 
 *   Name: Offset X:
 *   Name: Offset Y:
 *   - Offset the enemy name's position by this much.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 *     Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 * 
 * Quality of Life
 * 
 *   Auto Notetag:
 *   - Automatically apply the <Custom Action Sequence> notetag effect to any
 *     item or skill that has a Common Event?
 *   - Any item or skill without a Common Event attached to it will use the
 *     Automatic Action Sequences instead.
 *   - The <Auto Action Sequence> notetag will disable this effect for that
 *     particular skill or item.
 * 
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.21: January 8, 2021
 * * Bug Fixes!
 * ** "MOVE: Home Reset" Plugin Command Action Sequence should work properly.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Notetag snuck in by Arisu
 * *** <Auto Action Sequence>
 * **** Used for those who have the "Auto Notetag" Plugin Parameter enabled and
 *      just want to use an automatic Action Sequence instead.
 * ** New Plugin Parameter snuck in by Arisu!
 * *** Plugin Parameters > Action Sequences > Quality of Life > Auto Notetag
 * **** Automatically apply the <Custom Action Sequence> notetag effect to any
 *      item or skill that has a Common Event?
 * **** Any item or skill without a Common Event attached to it will use the
 *      Automatic Action Sequences instead.
 * **** The <Auto Action Sequence> notetag will disable this effect for that
 *      particular skill or item.
 * ** Arisu, you're going to be responsible for any bugs these may cause.
 * *** Bring it!!!!
 * **** And handling any bug report emails that are sent because this was
 *      turned on by accident.
 * ***** Please read the documentation, guys!
 * 
 * Version 1.20: January 1, 2021
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors that have received damage
 *    will return back to place after flinching. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Battle Portrait Offset: +x, +y>
 * *** <Battle Portrait Offset X: +x>
 * *** <Battle Portrait Offset Y: +y>
 * **** This is used with the "Portrait" and "Border" Battle Layouts.
 * **** Offsets the X and Y coordinates for the battle portrait.
 * 
 * Version 1.19: December 25, 2020
 * * Bug Fixes!
 * ** Removing a state from a Sideview Enemy during the middle of their a non-
 *    looping motion will no longer reset their motion to neutral.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** Action Sequence "PROJECTILE: Icon" now supports code for the "Icon"
 *    parameter. Update made by Yanfly.
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** For TPB Active or ATB Active, inputting actors will no longer step back
 *    after an enemy's action is finished. Fix made by Yanfly and Shiro.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** Action Sequence "BTLOG: Add Text" is updated for the convenience of a new
 *    option to quickly copy the displayed text to the VisuStella MZ Combat Log
 *    if that plugin is installed. Added by Yanfly.
 * 
 * Version 1.17: December 11, 2020
 * * Bug Fixes!
 * ** Common Events in TPB Active that cause forced actions will no longer
 *    cause currently inputting actors that match the forced action battler to
 *    crash the game. Fix made by Yanfly and Shiro.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * ** Action Sequence "MOVE: Move To Target(s)" is now changed so that if the
 *    "Melee Distance" value is set to 0, battlers will no longer stand a half
 *    body distance away. Added by Yanfly.
 * 
 * Version 1.16: December 4, 2020
 * * Bug Fixes!
 * ** Bug fixes made for the RPG Maker MZ base code. If a battler has no
 *    actions, then their action speed will not be Infinity. Fix by Olivia.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Completely replacing the whole party at once will no longer cause the
 *    battle system to crash. Fix made by Olivia.
 * ** Pre-Battle Common Events will no longer cancel out any win/lose branches.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Custom Action Sequences will no longer close the Actor Command Input
 *    window unless absolutely necessary (like for Show Message events) during
 *    Active TPB/ATB. Change made by Arisu.
 * 
 * Version 1.14: November 22, 2020
 * * Feature Update!
 * ** Natural Miss and Evasion motions now have flinch distance.
 *    Added by Yanfly.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Bug Fixes!
 * ** Failsafes added to prevent common events from running if they're empty.
 *    Fix made by Irina.
 * ** Skip Party Command will now work properly with TPB-based battle systems.
 *    Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** In preparation for upcoming VisuStella MZ plugins.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added clarity for the Plugin Parameters for the Common Events settings
 *    found in the mechanics section. The common events are only meant to run
 *    in the map scene and not for the battle scene. Update made by Irina.
 * * Feature Update!
 * ** The Plugin Parameter for Mechanics, Common Events (on Map), Defeat Event
 *    now has updated functionality. If this has a common event attached to it,
 *    then losing to random encounters will no longer send the player to the
 *    Game Over scene, but instead, send the player back to the map scene,
 *    where the Defeat Common Event will run. Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Action Sequence Plugin Command added by Olivia:
 * *** MECH: Custom Damage Formula
 * **** Changes the current action's damage formula to custom.
 *      This will assume the MANUAL damage style.
 * ** New Notetag added by Irina:
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Battleback Scaling Settings
 * **** These settings allow you to adjust how battlebacks scale to the screen
 *      in the game.
 * *** <Battler Sprite Grounded>
 * **** Prevents the enemy from being able to jumping and/or floating due to
 *      Action Sequences but still able to move. Useful for rooted enemies.
 * 
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** Exiting out of the Options menu scene or Party menu scene will no longer
 *    cause party members to reset their starting position. Fix made by Arisu
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** There was a documentation error with <JS Pre-Regenerate> and
 *    <JS Post-Regenerate>. Fix made by Yanfly.
 * *** Before, these were written as <JS Pre-Regenerate Turn> and
 *     <JS Post-Regenerate Turn>. The "Turn" part of the notetag has been
 *     removed in the documentation.
 * * Feature Update!
 * ** Damage sprites on actors are now centered relative to the actor's anchor.
 *    Change made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Command added by Yanfly:
 * *** MECH: Variable Popup
 * **** Causes the unit(s) to display a popup using the data stored inside
 *      a variable.
 * 
 * Version 1.08: October 11, 2020
 * * Bug Fixes!
 * ** Dead party members at the start of battle no longer start offscreen.
 *    Fix made by Arisu.
 * ** Removed party members from battle no longer count as moving battlers.
 *    Fix made by Yanfly.
 * ** Using specific motions should now have the weapons showing and not
 *    showing properly. Fix made by Yanfly.
 * 
 * Version 1.07: October 4, 2020
 * * Bug Fixes!
 * ** Adding and removing actors will now refresh the battle status display.
 *    Fix made by Irina.
 * ** Adding new states that would change the affected battler's state motion
 *    will automatically refresh the battler's motion. Fix made by Irina.
 * ** Boss Collapse animation fixed and will sink into the ground.
 *    Fix made by Irina.
 * ** Failsafes added for certain animation types. Fix made by Yanfly.
 * ** Freeze Motion for thrust, swing, and missile animations will now show the
 *    weapons properly. Fix made by Yanfly.
 * ** The Guard command will no longer display the costs of the Attack command.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Updated help file for newly added plugin parameters.
 * * Feature Updates!
 * ** When using the Change Battleback event command in battle, the game client
 *    will wait until both battlebacks are loaded before changing the both of
 *    them so that the appearance is synched together. Change made by Yanfly.
 * * New Features!
 * ** New plugin parameters added by Irina!
 * *** Plugin Parameters > Actor Battler Settings > Chant Style
 * **** What determines the chant motion? Hit type or skill type?
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Enemy Battler Plugin Parameter "Shadow Visible" should now work again.
 *    Fix made by Irina.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins. Added by Yanfly.
 * * Documentation Update!
 * ** Updated the help file for all the new plugin parameters.
 * * Feature Update!
 * ** Action Sequence "MECH: HP, MP, TP" will now automatically collapse an
 *    enemy if it has been killed by the effect.
 * ** All battle systems for front view will now have damage popups appear
 *    in front of the status window instead of just the Portrait battle layout.
 *    Update made by Yanfly.
 * * New Features!
 * ** New Action Sequence Plugin Commands from Irina!
 * *** MOTION: Clear Freeze Frame
 * *** MOTION: Freeze Motion Frame
 * **** You can freeze a battler's sprite's motion with a specific frame.
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Battle Layout: type> to change the battle layout style used for
 *     specific maps and/or troops.
 * ** New plugin parameters added by Yanfly!
 * *** Plugin Parameters > Battle Layout Settings > Command Window Width
 * **** This plugin parameter lets you adjust the window width for Party and
 *      Actor Command windows in the Default and List Battle Layout styles.
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset X
 * *** Plugin Parameters > Enemy Battler Settings > Name: Offset Y
 * **** These plugin parameters allow you to offset the position of the enemy
 *      name positions on the screen by a specific amount.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Actors now use their casting or charging animations again during TPB/ATB.
 *    Fix made by Yanfly.
 * ** Defeat requirement for enemies will no longer crash the game if turned on
 *    after creating
 * ** Escaping animation no longer has actors stay in place. Fixed by Yanfly.
 * ** Failsafes added for newly added weapon types that have not been adjusted
 *    in the Database > System 2 tab. Fixed by Irina.
 * ** Shadows now appear under the actor sprites. Fix made by Yanfly.
 * ** Victory during TPB will no longer cancel the victory animations of
 *    actors that will have their turn after. Fixed by Yanfly.
 * * Documentation Update!
 * ** All Anchor Plugin Parameter descriptions now state to use values between
 *    0 and 1 to be safe. Update made by Yanfly.
 * * Feature Update!
 * ** During Active TPB / ATB, canceling out of the actor command window will
 *    go directly into the party window without having to sort through all of
 *    the available active actors.
 * ** Going from the Party Command Window's Fight command will immediately
 *    return back to the actor command window that was canceled from.
 * * New Features!
 * ** Action Sequence Plugin Command "MOVE: Spin/Rotate" has been updated.
 * *** A new parameter has been added: "Revert Angle on Finish"
 * *** Added by Yanfly.
 * ** New plugin parameters have been added to Damage Settings.
 * *** Appear Position: Selects where you want popups to appear relative to the
 *     battler. Head, Center, Base. Added by Yanfly.
 * *** Offset X: Sets how much to offset the sprites by vertically.
 *     Added by Yanfly.
 * *** Offset Y: Sets how much to offset the sprites by horizontally.
 *     Added by Yanfly.
 * ** New plugin parameters have been added to Actor Battler Settings.
 * *** Priority: Active - Place the active actor on top of actor and
 *     enemy sprites. Added by Yanfly.
 * *** Priority: Actors - Prioritize actors over enemies when placing 
 *     sprites on top of each other. Added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Active Battler Sprites now remain on top and won't be hidden behind
 *    other sprites for better visual clarity. Fix made by Arisu.
 * ** Collapsing battlers will now show the dead motion properly. Fix made by
 *    Olivia.
 * ** Dead battlers can no longer be given immortality. Fix made by Olivia.
 * ** Going into the Options menu with no battleback set will no longer set a
 *    battle snapshot.
 * ** HP Gauges for Sideview Enemies are no longer flipped! Fix made by Yanfly.
 * ** Moving a dead battler would no longer reset their animation. Fix made by
 *    Olivia.
 * ** Pre-Battle Common Events now work with events instead of just random
 *    encounters. Fix made by Yanfly.
 * ** Sideview Enemy shadows no longer twitch. Fix made by Irina.
 * * Documentation Updates!
 * ** Added further explanations for Anchor X and Anchor Y plugin parameters.
 *    This is because there's a lot of confusion for users who aren't familiar
 *    with how sprites work. Added by Irina.
 * ** <Magic Reduction: x> notetag updated to say magical damage instead of
 *    physical damage. Fix made by Yanfly.
 * * New Features!
 * ** Additional Action Sequence Plugin Commands have been added in preparation
 *    of upcoming plugins! Additions made by Irina.
 * *** Action Sequences - Angle (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Camera (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Skew (for VisuMZ_3_ActSeqCamera)
 * *** Action Sequences - Zoom (for VisuMZ_3_ActSeqCamera)
 * ** Additional Action Sequence Plugin Commands have been made available now
 *    and added to Battle Core! Additions made by Irina.
 * *** MOVE: Scale/Grow/Shrink
 * *** MOVE: Skew/Distort
 * *** MOVE: Spin/Rotate
 * *** MOVE: Wait For Scale
 * *** MOVE: Wait For Skew
 * *** MOVE: Wait For Spin
 * ** Plugin Parameters Additions. Additions made by Irina.
 * *** Plugin Params > Actor Battler Settings > Offset X
 * *** Plugin Params > Actor Battler Settings > Offset Y
 * *** Plugin Params > Actor Battler Settings > Smooth Image
 * *** Plugin Params > Enemy Battler Settings > Offset X
 * *** Plugin Params > Enemy Battler Settings > Offset Y
 * *** Plugin Params > Enemy Battler Settings > Smooth Image
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Animated Battlers will refresh their motions from the death motion once
 *    they're revived instead of waiting for their next input phase. Fix made
 *    by Yanfly.
 * ** Battle Log speed sometimes went by too fast for certain enabled messages.
 *    Wait timers are now added to them, like state results, buff results, and
 *    debuff results. Fix made by Yanfly.
 * ** Boss Collapse animation now works properly. Fix made by Yanfly.
 * ** Freeze fix for TPB (Wait) if multiple actors get a turn at the same time.
 *    Fix made by Olivia.
 * ** Pressing cancel on a target window after selecting a single skill no
 *    longer causes the status window to twitch.
 * ** Sideview Enemies had a split frame of being visible if they were to start
 *    off hidden in battle. Fix made by Shaz.
 * * Compatibility Update:
 * ** Battle Core's Sprite_Damage.setup() function is now separated fro the
 *    default to allow for better compatibility. Made by Yanfly.
 * * Documentation Update:
 * ** Inserted more information for "Damage Popups" under "Major Changes"
 * * New Features!
 * ** <Magic Penetration: x>, <Magic Penetration: x%> notetags added.
 * ** <Magic Reduction: x>, <Magic Reduction: x%> notetags added.
 * ** <Battle UI Offset: +x, +y>, <Battle UI Offset X: +x>, and
 *    <Battle UI Offset Y: +y> notetags added for adjusting the positions of
 *    HP Gauges and State Icons.
 * *** Notetags added by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** Failsafes added for parsing battle targets. Fix made by Yanfly.
 * ** Immortality is no longer ignored by skills/items with the Normal Attack
 *    state effect. Fix made by Yanfly.
 * ** Miss and Evasion sound effects work again! Fix made by Yanfly.
 * ** Selecting "Escape" from the Actor Command Window will now have the
 *    Inputting Battler show its escape motion. Fix made by Yanfly.
 * ** Wait for Movement now applies to SV Enemies. Fix made by Yanfly.
 * * New Features!
 * ** Plugin Command "ACSET: Finish Action" now has an option to turn off the
 *    Immortality of targets. Feature added by Yanfly.
 * * Optimization Update
 * ** Uses less resources when making checks for Pre-Battle Battle Start events
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAngle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAngle
 * @text Action Sequences - Angle
 * @desc Allows you to have control over the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeAngle
 * @text ANGLE: Change Angle
 * @desc Changes the camera angle.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc Change the camera angle to this many degrees.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_Reset
 * @text ANGLE: Reset Angle
 * @desc Reset any angle settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera angle.
 * @default 60
 *
 * @arg EasingType:str
 * @text Angle Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForAngle:eval
 * @text Wait For Angle?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for angle changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Angle_WaitForAngle
 * @text ANGLE: Wait For Angle
 * @desc Waits for angle changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 * 
 * @arg CopyCombatLog:eval
 * @text Copy to Combat Log?
 * @type boolean
 * @on Copy Text
 * @off Don't Copy
 * @desc Copies text to the Combat Log.
 * Requires VisuMZ_4_CombatLog
 * @default true
 *
 * @arg CombatLogIcon:num
 * @text Combat Log Icon
 * @parent CopyCombatLog:eval
 * @desc What icon would you like to bind to this entry?
 * Requires VisuMZ_4_CombatLog
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakCamera
 * @text Action Sequences - Camera
 * @desc Allows you to have control over the camera.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceHorror
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakHorror
 * @text Action Sequences - Horror Effects
 * @desc These Action Sequences are Horror Effects-related.
 * Requires VisuMZ_2_HorrorEffects!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_Clear
 * @text HORROR: Clear All Filters
 * @desc Clear all Horror Effects filters on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove Horror Effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchCreate
 * @text HORROR: Glitch Create
 * @desc Creates the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg slices:num
 * @text Glitch Slices
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Glitch slices to be used with the target.
 * @default 10
 *
 * @arg offset:num
 * @text Glitch Offset
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc Default offset value.
 * @default 100
 *
 * @arg animated:eval
 * @text Glitch Animated?
 * @parent FilterGlitch
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the glitch effect?
 * @default true
 *
 * @arg aniFrequency:num
 * @text Glitch Frequency
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @arg aniStrength:num
 * @text Glitch Strength
 * @parent FilterGlitch
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_GlitchRemove
 * @text HORROR: Glitch Remove
 * @desc Removes the glitch effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseCreate
 * @text HORROR: Noise Create
 * @desc Creates the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg noise:num
 * @text Noise Rate
 * @parent FilterNoise
 * @desc Noise rate to be used with the target.
 * @default 0.3
 *
 * @arg animated:eval
 * @text Noise Animated
 * @parent FilterNoise
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the noise for the target?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_NoiseRemove
 * @text HORROR: Noise Remove
 * @desc Removes the noise effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVCreate
 * @text HORROR: TV Create
 * @desc Creates the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create the Horror Effect for.
 * @default ["user"]
 *
 * @arg lineWidth:num
 * @text TV Line Thickness
 * @parent FilterTV
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 *
 * @arg vignetting:num
 * @text TV Corner Size
 * @parent FilterTV
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @arg animated:eval
 * @text TV Animated
 * @parent FilterTV
 * @type boolean
 * @on Animate
 * @off Static
 * @desc Animate the TV?
 * @default true
 *
 * @arg aniSpeed:num
 * @text TV Speed
 * @parent FilterTV
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Horror_TVRemove
 * @text HORROR: TV Remove
 * @desc Removes the TV effect on the target battler(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to remove the Horror Effect for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceImpact
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakImpact
 * @text Action Sequences - Impact
 * @desc These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ColorBreak
 * @text IMPACT: Color Break
 * @desc Breaks the colors on the screen before reassembling.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Intensity:eval
 * @text Intensity
 * @desc What is the intensity of the color break effect?
 * @default 60
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the color break effect?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurScreen
 * @text IMPACT: Motion Blur Screen
 * @desc Creates a motion blur on the whole screen.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.1
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionBlurTarget
 * @text IMPACT: Motion Blur Target(s)
 * @desc Creates a motion blur on selected target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion blur effects for.
 * @default ["user"]
 *
 * @arg Angle:eval
 * @text Angle
 * @desc Determine what angle to make the motion blur at.
 * @default Math.randomInt(360)
 *
 * @arg Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @arg Duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailCreate
 * @text IMPACT: Motion Trail Create
 * @desc Creates a motion trail effect for the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to create motion trail effects for.
 * @default ["user"]
 *
 * @arg delay:num
 * @text Delay
 * @type Number
 * @min 1
 * @desc How many frames to delay by when creating a motion trail?
 * The higher the delay, the less after images there are.
 * @default 1
 *
 * @arg duration:num
 * @text Duration
 * @type Number
 * @min 1
 * @desc How many frames should the motion trail last?
 * What do you want to be its duration?
 * @default 30
 *
 * @arg hue:num
 * @text Hue
 * @type Number
 * @min 0
 * @max 255
 * @desc What do you want to be the hue for the motion trail?
 * @default 0
 *
 * @arg opacityStart:num
 * @text Starting Opacity
 * @type Number
 * @min 0
 * @max 255
 * @desc What starting opacity value do you want for the motion
 * trail? Opacity values decrease over time.
 * @default 200
 *
 * @arg tone:eval
 * @text Tone
 * @desc What tone do you want for the motion trail?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_MotionTrailRemove
 * @text IMPACT: Motion Trail Remove
 * @desc Removes the motion trail effect from the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to clear motion trail effects for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwavePoint
 * @text IMPACT: Shockwave at Point
 * @desc Creates a shockwave at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to create a shockwave at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveEachTargets
 * @text IMPACT: Shockwave from Each Target(s)
 * @desc Creates a shockwave at each of the target(s) location(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ShockwaveCenterTargets
 * @text IMPACT: Shockwave from Target(s) Center
 * @desc Creates a shockwave from the center of the target(s).
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a shockwave from.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a shockwave from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the shockwave Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Amp:eval
 * @text Amplitude
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @arg Wave:eval
 * @text Wavelength
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the shockwave?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurPoint
 * @text IMPACT: Zoom Blur at Point
 * @desc Creates a zoom blur at the designated coordinates.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Coordinates
 * 
 * @arg X:eval
 * @text Point: X
 * @parent Coordinates
 * @desc What x coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg Y:eval
 * @text Point: Y
 * @parent Coordinates
 * @desc What y coordinate do you want to focus the zoom at?
 * You can use JavaScript code.
 * @default (Graphics.height - 200) / 2
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Impact_ZoomBlurTargetCenter
 * @text IMPACT: Zoom Blur at Target(s) Center
 * @desc Creates a zoom blur at the center of targets.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to start a zoom blur from.
 * @default ["user"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to start a zoom blur from.
 * @default middle center
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur X point by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent TargetLocation:str
 * @desc How much to offset the zoom blur Y point by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Strength:eval
 * @text Zoom Strength
 * @desc What is the strength of the zoom effect?
 * Use a number between 0 and 1.
 * @default 0.5
 * 
 * @arg Radius:eval
 * @text Visible Radius
 * @desc How much of a radius should be visible from the center?
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc What is the duration of the zoom blur?
 * @default 60
 *
 * @arg EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutSine
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_BtbGain
 * @text MECH: BTB Brave Points
 * @desc Alters the target(s) Brave Points to an exact value.
 * Requires VisuMZ_2_BattleSystemBTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 * 
 * @arg BravePoints:eval
 * @text Alter Brave Points By
 * @desc Alters the target(s) Brave Points.
 * Positive for gaining BP. Negative for losing BP.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbOrder
 * @text MECH: CTB Order
 * @desc Alters the CTB Turn Order.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Turn Order for.
 * @default ["all targets"]
 *
 * @arg ChangeOrderBy:eval
 * @text Change Order By
 * @parent Charging
 * @desc Changes turn order for target(s) by this amount.
 * Positive increases wait. Negative decreases wait.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CtbSpeed
 * @text MECH: CTB Speed
 * @desc Alters the CTB Speed.
 * Requires VisuMZ_2_BattleSystemCTB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the CTB Speed for.
 * @default ["all targets"]
 *
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the CTB Speed if it is currently charging.
 * @default -0.00
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the CTB Speed if it is currently casting.
 * @default -0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_CustomDmgFormula
 * @text MECH: Custom Damage Formula
 * @desc Changes the current action's damage formula to custom.
 * This will assume the MANUAL damage style.
 * 
 * @arg Formula:str
 * @text Formula
 * @desc Changes the current action's damage formula to custom.
 * Use 'default' to revert the damage formula.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_FtbAction
 * @text MECH: FTB Action Count
 * @desc Alters the subject team's available Action Count.
 * Requires VisuMZ_2_BattleSystemFTB!
 * 
 * @arg ActionCount:eval
 * @text Action Count
 * @desc Alters the subject team's available Action Count.
 * Positive for gaining actions. Negative for losing actions.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExploit
 * @text MECH: STB Exploit Effect
 * @desc Utilize the STB Exploitation mechanics!
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Exploited:eval
 * @text Target(s) Exploited?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Exploit the below targets?
 * @default true
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to become exploited.
 * @default ["all targets"]
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploited status?
 * @default false
 * 
 * @arg Exploiter:eval
 * @text User Exploiter?
 * @type boolean
 * @on Exploit
 * @off Don't
 * @desc Allow the user to become the exploiter?
 * @default true
 * 
 * @arg ForceExploited:eval
 * @text Force Exploitation
 * @type boolean
 * @on Force
 * @off Don't
 * @desc Force the exploiter status?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbExtraAction
 * @text MECH: STB Extra Action
 * @desc Adds an extra action for the currently active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Extra Actions
 * @parent Charging
 * @desc How many extra actions should the active battler gain?
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_StbRemoveExcessActions
 * @text MECH: STB Remove Excess Actions
 * @desc Removes excess actions from the active battler.
 * Requires VisuMZ_2_BattleSystemSTB!
 * 
 * @arg Actions:eval
 * @text Remove Actions
 * @parent Charging
 * @desc How many actions to remove from the active battler?
 * You may use JavaScript code.
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_VariablePopup
 * @text MECH: Variable Popup
 * @desc Causes the unit(s) to display a popup using the data
 * stored inside a variable.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Variable:num
 * @text Variable ID
 * @type variable
 * @desc Get data from which variable to display as a popup?
 * @default 1
 * 
 * @arg DigitGrouping:eval
 * @text Digit Grouping
 * @parent Variable:num
 * @type boolean
 * @on Group Digits
 * @off Don't Group
 * @desc Use digit grouping to separate numbers?
 * Requires VisuMZ_0_CoreEngine!
 * @default true
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Variable:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_ClearFreezeFrame
 * @text MOTION: Clear Freeze Frame
 * @desc Clears any freeze frames from the unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to clear freeze frames for.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_FreezeMotionFrame
 * @text MOTION: Freeze Motion Frame
 * @desc Forces a freeze frame instantly at the selected motion.
 * Automatically clears with a new motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to freeze motions for.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Freeze this motion for the unit(s).
 * @default attack
 * 
 * @arg Frame:num
 * @text Frame Index
 * @desc Which frame do you want to freeze the motion on?
 * Frame index values start at 0.
 * @default 2
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change opacity.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Scale
 * @text MOVE: Scale/Grow/Shrink
 * @desc Causes the unit(s) to scale, grow, or shrink?.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change the scale of.
 * @default ["user"]
 * 
 * @arg ScaleX:eval
 * @text Scale X
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg ScaleY:eval
 * @text Scale Y
 * @desc What target scale value do you want?
 * 1.0 is normal size.
 * @default 1.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to scale for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Scale Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForScale:eval
 * @text Wait For Scale?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for scaling to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Skew
 * @text MOVE: Skew/Distort
 * @desc Causes the unit(s) to skew.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to skew.
 * @default ["user"]
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc X variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Y variance to skew?
 * Use small values for the best results.
 * @default 0.00
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to skew for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Spin
 * @text MOVE: Spin/Rotate
 * @desc Causes the unit(s) to spin.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to spin.
 * @default ["user"]
 * 
 * @arg Angle:eval
 * @text Angle
 * @desc How many degrees to spin?
 * @default 360
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to spin for.
 * @default 12
 *
 * @arg EasingType:str
 * @text Spin Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg RevertAngle:eval
 * @text Revert Angle on Finish
 * @type boolean
 * @on Revert
 * @off Don't
 * @desc Revert angle after spinning?
 * @default true
 * 
 * @arg WaitForSpin:eval
 * @text Wait For Spin?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for spin to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForScale
 * @text MOVE: Wait For Scale
 * @desc Waits for scaling to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSkew
 * @text MOVE: Wait For Skew
 * @desc Waits for skewing to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForSpin
 * @text MOVE: Wait For Spin
 * @desc Waits for spinning to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceProjectile
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakProjectile
 * @text Action Sequences - Projectiles
 * @desc Create projectiles on the screen and fire them off at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Animation
 * @text PROJECTILE: Animation
 * @desc Create an animation projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Settings
 * @type animation
 * @desc Determine which animation to use as a projectile.
 * @default 77
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExAni>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Icon
 * @text PROJECTILE: Icon
 * @desc Create an icon projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Icon:eval
 * @text Icon Index
 * @parent Settings
 * @desc Determine which icon to use as a projectile.
 * You may use JavaScript code.
 * @default 118
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Projectile_Picture
 * @text PROJECTILE: Picture
 * @desc Create a picture projectile and fire it at a target.
 * Requires VisuMZ_3_ActSeqProjectiles!
 * 
 * @arg Coordinates
 *
 * @arg Start:struct
 * @text Start Location
 * @parent Coordinates
 * @type struct<ProjectileStart>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"user\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 *
 * @arg Goal:struct
 * @text Goal Location
 * @parent Coordinates
 * @type struct<ProjectileGoal>
 * @desc Settings to determine where the projectile(s) start from.
 * @default {"Type:str":"target","Targets:arraystr":"[\"all targets\"]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"}
 * 
 * @arg Settings
 *
 * @arg Picture:str
 * @text Picture Filename
 * @parent Settings
 * @type file
 * @dir img/pictures/
 * @desc Determine which picture to use as a projectile.
 * @default Untitled
 * 
 * @arg Duration:eval
 * @text Duration
 * @parent Settings
 * @desc Duration for the projectile(s) to travel.
 * @default 20
 * 
 * @arg WaitForProjectile:eval
 * @text Wait For Projectile?
 * @parent Settings
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for projectile(s) to reach their destination before
 * going onto the next command?
 * @default true
 * 
 * @arg Extra:struct
 * @text Extra Settings
 * @type struct<ProjectileExtra>
 * @desc Add extra settings to the projectile?
 * @default {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceSkew
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSkew
 * @text Action Sequences - Skew
 * @desc Allows you to have control over the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_ChangeSkew
 * @text SKEW: Change Skew
 * @desc Changes the camera skew.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg SkewX:eval
 * @text Skew X
 * @desc Change the camera skew X to this value.
 * @default 0
 * 
 * @arg SkewY:eval
 * @text Skew Y
 * @desc Change the camera skew Y to this value.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_Reset
 * @text SKEW: Reset Skew
 * @desc Reset any skew settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset camera skew.
 * @default 60
 *
 * @arg EasingType:str
 * @text Skew Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForSkew:eval
 * @text Wait For Skew?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for skew changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Skew_WaitForSkew
 * @text SKEW: Wait For Skew
 * @desc Waits for skew changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakZoom
 * @text Action Sequences - Zoom
 * @desc Allows you to have control over the screen zoom.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Change Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Reset
 * @text ZOOM: Reset Zoom
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
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
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param Battleback:struct
 * @text Battleback Scaling
 * @type struct<Battleback>
 * @desc Settings that adjust how battlebacks scale.
 * @default {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
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
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupPosition:str
 * @text Appear Position
 * @parent Popups
 * @type select
 * @option Head - At the top of the battler.
 * @value head
 * @option Center - At the center of the battler.
 * @value center
 * @option Base - At the foot of the battler.
 * @value base
 * @desc Selects where you want popups to appear relative to the battler.
 * @default base
 *
 * @param PopupOffsetX:num
 * @text Offset X
 * @parent Popups
 * @desc Sets how much to offset the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param PopupOffsetY:num
 * @text Offset Y
 * @parent Popups
 * @desc Sets how much to offset the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * Negative values go left. Positive values go right.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * Negative values go up. Positive values go down.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events (on Map)
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure on map.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent ListStyle
 * @type number
 * @min 1
 * @desc Determine the window width for the Party and Actor Command
 * Windows. Affects Default and List Battle Layout styles.
 * @default 192
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Battleback Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battleback:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option MZ (MZ's default style)
 * @value MZ
 * @option 1:1 (No Scaling)
 * @value 1:1
 * @option Scale To Fit (Scale to screen size)
 * @value ScaleToFit
 * @option Scale Down (Scale Downward if Larger than Screen)
 * @value ScaleDown
 * @option Scale Up (Scale Upward if Smaller than Screen)
 * @value ScaleUp
 * @desc The default scaling style used for battlebacks.
 * @default MZ
 *
 * @param jsOneForOne:func
 * @text JS: 1:1
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;"
 *
 * @param jsScaleToFit:func
 * @text JS: Scale To Fit
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScaleDown:func
 * @text JS: Scale Down
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 * @param jsScale Up:func
 * @text JS: Scale Up
 * @type note
 * @desc This code gives you control over the scaling for this style.
 * @default "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;"
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @option combat log
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param ChantStyle:eval
 * @text Chant Style
 * @parent SvBattlers
 * @type boolean
 * @on Magical Hit Type
 * @off Magical Skill Type
 * @desc What determines the chant motion?
 * Hit type or skill type?
 * @default true
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent SvBattlers
 * @desc Offsets X position where actor is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent SvBattlers
 * @desc Offsets Y position where actor is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param PrioritySortActive:eval
 * @text Priority: Active
 * @parent SvBattlers
 * @type boolean
 * @on Active Actor over All Else
 * @off Active Actor is Sorted Normally
 * @desc Place the active actor on top of actor and enemy sprites.
 * @default false
 *
 * @param PrioritySortActors:eval
 * @text Priority: Actors
 * @parent SvBattlers
 * @type boolean
 * @on Actors over Enemies
 * @off Sort by Y Position
 * @desc Prioritize actors over enemies when placing sprites on top
 * of each other.
 * @default true
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent SvBattlers
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default false
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Visual
 * @desc Offsets X position where enemy is positioned.
 * Negative values go left. Positive values go right.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Visual
 * @desc Offsets Y position where enemy is positioned.
 * Negative values go up. Positive values go down.
 * @default 0
 *
 * @param SmoothImage:eval
 * @text Smooth Image
 * @parent Visual
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Smooth out the battler images or pixelate them?
 * @default true
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param LastSelected:eval
 * @text Any: Last Selected
 * @parent SelectWindow
 * @type boolean
 * @on Last Selected
 * @off FV/SV Priority
 * @desc Prioritize last selected enemy over front view or sideview settings?
 * @default true
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param NameOffsetX:num
 * @text Name: Offset X
 * @parent SelectWindow
 * @desc Offset the enemy name's X position by this much.
 * @default 0
 *
 * @param NameOffsetY:num
 * @text Name: Offset Y
 * @parent SelectWindow
 * @desc Offset the enemy name's Y position by this much.
 * @default 0
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param QoL
 * @text Quality of Life
 *
 * @param AutoNotetag:eval
 * @text Auto Notetag
 * @parent QoL
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically apply the <Custom Action Sequence> notetag
 * effect to any item or skill that has a Common Event?
 * @default false
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Start Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileStart:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Start from battler target(s)
 * @value target
 * @option Point - Start from a point on the screen
 * @value point
 * @desc Select where the projectile should start from.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to start the projectile from.
 * @default ["user"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Create one projectile at the center of the targets?
 * Or create a projectile for each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to start the projectile at.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Goal Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileGoal:
 * 
 * @param Type:str
 * @text Type
 * @type select
 * @option Target - Goal is battler target(s)
 * @value target
 * @option Point - Goal is a point on the screen
 * @value point
 * @desc Select where the projectile should go to.
 * @default target
 * 
 * @param Targets:arraystr
 * @text Target(s)
 * @parent Type:str
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for projectile to go to.
 * @default ["all targets"]
 * 
 * @param TargetCenter:eval
 * @text Centralize
 * @parent Targets:arraystr
 * @type boolean
 * @on Center Projectile
 * @off Create Each
 * @desc Set goal in the center of targets?
 * Or create a projectile to go to each target?
 * @default false
 * 
 * @param PointX:eval
 * @text Point X
 * @parent Type:str
 * @desc Insert the X coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @param PointY:eval
 * @text Point Y
 * @parent Type:str
 * @desc Insert the Y coordinate to send the projectile to.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @param OffsetX:eval
 * @text Offset X
 * @desc Insert how many pixels to offset the X coordinate by.
 * You may use JavaScript code.
 * @default +0
 * 
 * @param OffsetY:eval
 * @text Offset Y
 * @desc Insert how many pixels to offset the Y coordinate by.
 * You may use JavaScript code.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExAni:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Projectile Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ProjectileExtra:
 * 
 * @param AutoAngle:eval
 * @text Auto Angle?
 * @parent Settings
 * @type boolean
 * @on Automatically Angle
 * @off Normal
 * @desc Automatically angle the projectile to tilt the direction it's moving?
 * @default true
 * 
 * @param AngleOffset:eval
 * @text Angle Offset
 * @desc Alter the projectile's tilt by this many degrees.
 * @default +0
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Settings
 * @desc This is the height of the project's trajectory arc
 * in pixels.
 * @default 0
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the projectile?
 * @default 0
 *
 * @param EasingType:str
 * @text Easing
 * @parent Settings
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type to apply to the projectile's trajectory.
 * @default Linear
 * 
 * @param Hue:eval
 * @text Hue
 * @parent Settings
 * @desc Adjust the hue of the projectile.
 * Insert a number between 0 and 360.
 * @default 0
 * 
 * @param Scale:eval
 * @text Scale
 * @parent Settings
 * @desc Adjust the size scaling of the projectile.
 * Use decimals for exact control.
 * @default 1.0
 * 
 * @param Spin:eval
 * @text Spin Speed
 * @parent Settings
 * @desc Determine how much angle the projectile spins per frame.
 * Does not work well with "Auto Angle".
 * @default +0.0
 *
 */
//=============================================================================

const _0xc1bd=['AutoMeleeSolo','sort','toUpperCase','Scene_Battle_itemWindowRect','POST-','Scene_Battle_stop','cancelTargetSelectionVisibility','Window_ItemList_maxCols','Window_BattleStatus_initialize','updateBattleProcess','requestMotionRefresh','Window_ActorCommand_initialize','wtypeId','innerWidth','_pattern','onTurnEnd','AlphaFilter','maxItems','currentValue','_battleCoreBattleStartEvent','animationBaseDelay','weaponImageId','bind','_skewWholeDuration','addSkillTypeCommand','displayMiss','_animation','performWeaponAnimation','actionSplicePoint','State-%1-%2','NameOffsetY','validTargets','PreEndTurnJS','onEscapeSuccess','EscapeFailureJS','Window_Options_statusText','ITEM','turnCount','_enemySprites','width','physical','refresh','_action','makeData','Immortal','_tpbState','commandNameWindowDrawBackground','isAnyoneChangingOpacity','canUse','_autoBattleWindow','ShowCounter','FaceDirection','ParseWeaponNotetags','#%1','itemTextAlign','HelpOptions','ActionStart','_enemies','createLowerLayer','ActSeq_Projectile_Animation','needsSelection','skillTypes','StyleOFF','canAttackBattleCore','_effectsContainer','performAction','shadow','ResetFocus','Game_Interpreter_PluginCommand','getSkillTypes','registerCommand','BattleStartEvent','clearMotion','_actions','isEffecting','addChildAt','battlerSmoothImage','battleGrow','CommandVisible','ActSeq_Mechanics_StbExtraAction','loadEnemy','Scene_Map_launchBattle','traitSet','_targetSkewY','command119','open','PreEndActionJS','ESCAPE','CastCertain','freezeMotion','pow','update','sleep','hpDamage','Strength','snapForBackground','ShowFacesListStyle','MDF','applyBattleCoreJS','logActionList','displayHpDamage','Window_BattleLog_performAction','updateBossCollapse','status','EscapeSuccess','_createCursorArea','_forcing','_weather','trim','some','forceMotion','DistanceAdjust','friendsUnit','isForRandom','canMove','AutoBattle','atbInterrupt','isImmortal','filterArea','_enemyNameContainer','updateBorderSprite','makeTargetsBattleCore','JSON','_angleEasing','WaitForOpacity','useItem','_visualHpGauge_JustDied','JS\x20%1END\x20TURN','checkAutoCustomActionSequenceNotetagEffect','Style','displayCounter','isFrameVisible','ActSeq_Motion_WaitMotionFrame','hpHealingFmt','ShowMpDmg','weatherPower','addNewState','optDisplayTp','setupIconTextPopup','updateBattlebackBitmap2','Scene_Battle_createCancelButton','TextAlign','isPlaytest','isNextSceneBattleTransitionable','isTpbMainPhase','finalizeScale','BTestBypass','waitForJump','setHelpWindowItem','_offsetY','Window_Options_addGeneralOptions','EscapeFail','type','Scene_Battle_start','text\x20target','repeatTargets','createStateIconSprite','DefaultStyle','mainSprite','CriticalColor','itemWindowRect','_cache','Game_Actor_setup','isAnyoneGrowing','VisuMZ_2_HorrorEffects','Sprite_Enemy_initVisibility','setBattlerBattleCore','ActSeq_Set_FinishAction','allowCollapse','Sprite_StateIcon_updateFrame','parseForcedGameTroopSettingsBattleCore','_target','ShowPortraits','getColor','onRegeneratePlayStateAnimation','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','compareBattlerSprites','_methods','_distortionSprite','endAction','cameraOffsetDuration','1TIHFlo','startBattle','performRecovery','VisuMZ_4_CombatLog','changeTurnOrderByCTB','ForceRandom','_battlerHue','ActionItemMsg','boxHeight','Targets1','Window_BattleLog_displayCurrentState','gainTp','origin','createInnerPortrait','ActSeq_Animation_ChangeBattlePortrait','finishActorInput','isGuardWaiting','performMoveToTargets','result','HelpFight','Window_BattleLog_performActionEnd','transform','applyVariance','onActorOk','isAtbCastingState','attackAnimationId2','_growWholeDuration','call','changePaintOpacity','Scene_Battle_selectNextCommand','_multipliers','_skewEasing','SmoothImage','base','front\x20center','magicReflection','getNextDamagePopup','freezeFrame','25umXBNL','putActiveBattlerOnTop','addSingleSkillCommand','MotionIdle','PopupShiftY','_indent','getBattlePortrait','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','Name','startAction','statusWindowRect','wholeActionSet','WaitForSkew','destroyDamageSprite','skewBattler','updateMotionCount','466617IoWpPk','Scene_Battle_createActorCommandWindow','CmdIconItem','createBattleUIOffsetY','TargetLocation','svBattlerAnchorY','NameOffsetX','opacityStart','PreDamageAsUserJS','statusWindowRectXPStyle','attackAnimationId1','battler','WaitForMovement','MOTIONS','registerDefeatedEnemy','command283','spell','battleMembers','Enemy-%1-%2','MP_Flat','traitObjects','guardSkillId','redraw','Buffs','updateStateSpriteBattleCore','OverallFormulaJS','Scene_Battle_onEnemyOk','cameraDuration','FaceAway','Window_BattleStatus_drawItemImage','addGeneralOptions','VisuMZ_2_DragonbonesUnion','addItemCommand','mainSpriteWidth','showEnemyAttackAnimation','isAppeared','ActionCenteredName','Window_BattleLog_popBaseLine','displayCurrentState','_targetGrowX','placeTimeGauge','dead','ElementStatusCore','EmergeText','abnormal','performMiss','ActSeq_BattleLog_PushBaseLine','WaitForZoom','makeCommandList','updateBattlebackBitmap','statusWindowRectBorderStyle','ShowSubstitute','SvMotionIdleMass-%1-%2','EasingType','AGI','targetObjects','Setting','EscapeSuccessJS','popBaseLine','ActionEnd','softDamageCap','Scene_Battle_createHelpWindow','resizeWindowBorderStyle','VisuMZ_2_PartySystem','_back2Sprite','ActSeq_Movement_HomeReset','ActSeq_Mechanics_AtbGauge','addEscapeCommand','fight','ActSeq_Impact_ZoomBlurTargetCenter','ArPenFlat','createAnimationContainer','messageSpeed','actorId','growBattler','ActSeq_BattleLog_UI','maxCols','HpGauge','StartTurnShow','_homeY','random','ActSeq_Movement_MoveToPoint','members','Game_Battler_startTpbTurn','isPartyCommandWindowDisabled','PostDamage%1JS','victory','CriticalDmgRate','ParseActorNotetags','Window_BattleLog_performMiss','isGuard','isFlipped','jumpBattler','AddHpGaugeOption','setup','_totalValue','mmp','changeAtbCastTime','setupBattleCoreData','RegExp','CreateActionSequenceTargets','addCommand','removeAnimationFromContainer','ActSeq_Mechanics_Immortal','updateActors','isForRandomBattleCore','startSpin','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','actorCommandWindowRect','isInputting','loadSvActor','updateShadowPosition','bossCollapse','_forceAction','Sprite_Battler_updateMain','innerHeight','isWaiting','isSideView','SkillItemMiddleLayout','WaitForEffect','%1Apply%2JS','BattleManager_endBattle','isOnCurrentMap','selectPreviousCommand','clearElementChanges','DefaultSoftCap','sliceMax','Game_System_initialize','itemLineRect','enemyNames','opponentsUnit','_motionType','JumpToLabel','changeWeather','_item','PostEndTurnJS','setBattleSkew','commandNameWindowCenter','ActSeq_Mechanics_Collapse','battleCommandIcon','Interrupt','skill','mainSpriteHeight','makeActionOrders','addChild','createMainSprite','Scene_Map_initialize','getItemDamageAmountLabelOriginal','ConvertParams','attachSpritesToDistortionSprite','logWindowRect','clearHorrorEffects','parent','ActSeq_BattleLog_AddText','ActSeq_Impact_MotionTrailRemove','BattleManager_startAction','windowAreaHeight','isSpriteVisible','blt','+%1\x20MP','CmdTextAutoBattle','duration','critical','DamageFlat','Window_BattleLog_performCounter','VisuMZ_3_ActSeqProjectiles','initBattlePortrait','isSkill','message1','prototype','_speed','battleCommandName','_dimmerSprite','PostEndBattleJS','ShowFailure','getStypeIdWithName','isStateResist','spinBattler','aliveMembers','applyItem','battleAngle','setSvBattlerSprite','inHomePosition','setupDamagePopup','Game_BattlerBase_initMembers','commandNameWindowDrawText','_hpGaugeSprite','ActSeq_BattleLog_DisplayAction','ActSeq_Motion_FreezeMotionFrame','Armor-%1-%2','_targetIndex','movement','Window_BattleLog_displayTpDamage','ShowHpDmg','selectNextCommand','performSubstitute','14871JrFIMq','AutoBattleCancel','createEnemies','BattleVictoryJS','startMove','actor%1-portrait','create','FUNC','isAnimationShownOnBattlePortrait','_borderPortraitTargetX','customDamageFormula','isPreviousSceneBattleTransitionable','clamp','_createClientArea','setFrame','22090RWdHFl','isActor','addFightCommand','moveBattlerDistance','addOptionsCommand','isSpinning','Game_Action_isForRandom','AnchorY','ShowCritical','fillRect','EFFECT_COMMON_EVENT','callOptions','PreStartActionJS','_createCursorSprite','BattleManager_startBattle','stepForward','isSceneBattle','_jumpDuration','dataId','ActSeq_Skew_WaitForSkew','Window_BattleLog_performSubstitute','refreshActorPortrait','Scene_Battle_helpWindowRect','inputtingAction','CalcActionSpeedJS','canAttack','process_VisuMZ_BattleCore_TraitObject_Notetags','JS\x20ESCAPE\x20FAILURE','commandAutoBattle','parse','abs','CriticalDmgFlat','mpDamage','isFightCommandEnabled','battleLayoutStyle','SkillItemStandardCols','_waitMode','chantStyle','skills','#ffffff','applySoftDamageCap','_angleWholeDuration','<CENTER>%1','commandStyleCheck','Actor-%1-%2','actions','addDebuff','makeBattleCommand','_tpbSceneChangeCacheActor','startTurn','drawItem','ActSeq_Mechanics_CtbSpeed','_wtypeIDs','MaxLines','makeTargets','createKeyJS','Elements','floor','stbGainInstant','constructor','Scene_Battle_startEnemySelection','cameraClamp','Battleback','BattleCore','extraHeight','_growX','Window_BattleLog_update','dimColor1','createContents','repeats','autoSelectLastSelected','isAnyoneSpinning','AttackAnimation','Window_PartyCommand_initialize','checkCacheKey','randomInt','_motionCount','value','startAttackWeaponAnimation','visible','Wave','extraPositionY','makeActionList','_requestRefresh','ActSeq_Projectile_Picture','createAutoBattleWindow','top','evade','AutoBattleMsg','isBattleSys','currentExt','getNextSubject','displayItemMessage','MAXMP','_flashDuration','ActSeq_Mechanics_FtbAction','addState','_regionBattleback2','ActorCmd','_active','PreApply%1JS','DistanceX','autoSelectPriority','ActSeq_Element_ForceElements','-%1','isQueueOptionsMenu','getBattlePortraitOffsetY','prev\x20target','Game_Interpreter_terminate','isMagicSkill','checkTpbInputOpen','subject','applyDamageCaps','_skewY','alive\x20actors\x20not\x20target','Pre','hasBeenDefeatedBefore','Parse_Notetags_Action','visualHpGauge','commandFight','adjustWeaponSpriteOffset','ActSeq_Animation_ShowAnimation','startActorCommandSelection','setupBattlebackBattleCore','updateStateSprite','onSelectAction','boxWidth','regionId','isForFriend','isRightInputMode','slices','Settings','attack','removeBuffsAuto','placeBasicGauges','Game_Action_itemEffectAddNormalState','_floatHeight','addPartyCommand','setupActionSet','createDistortionSprite','ceil','updateMain','StepDistanceX','swing','center','updateEventMain','ARRAYSTRUCT','isDead','createBattleFieldBattleCore','Mirror','updateGrow','flashColor','updateCustomActionSequence','replace','ActSeq_Movement_Spin','Window_BattleLog_displayCritical','skillWindowRect','isMeleeSingleTargetAction','isClicked','battleSys','_effectDuration','updateShadowVisibility','displayFailure','Game_BattlerBase_refresh','maxBattleMembers','onEnemyCancel','processBattleCoreJS','AS\x20TARGET','_growEasing','onEnemyOk','ShowAddedState','setSTBExploited','WaitForAnimation','addChildToBack','ChargeRate','unshift','casting','OffsetAdjust','okTargetSelectionVisibility','_flinched','Game_Battler_makeSpeed','Window_BattleLog_performMagicEvasion','%1Damage%2JS','Game_Map_setupBattleback','_actionBattlers','SkillsStatesCore','ActionSequence','_baseX','isBuffAffected','createStateSprite','alive\x20battlers','ActSeq_Zoom_WaitForZoom','hide','Direction','toLowerCase','onDisabledPartyCommandSelection','updateInterpreter','guard','SvWeaponMass-%1-%2','createHelpWindowBattleCore','launchBattle','alive\x20battlers\x20not\x20target','usePremadeActionSequence','weapons','ActionSkillMsg2','isFastForward','autoBattleStyle','ActSeq_ChangeSkew','Sprite_Actor_createStateSprite','Game_Party_addActor','performActionEnd','STRUCT','_motionSpeed','setWaitMode','showPortraits','centerFrontViewSprite','DamageStyles','splice','_skewDuration','SkipPartyCmd','CmdIconAutoBattle','CoreEngine','onSkewEnd','isDTB','AdjustRect','statusWindowRectDefaultStyle','ActSeq_Movement_WaitForSkew','Scene_Battle_terminate','swapEnemyIDs','setupTextPopup','process_VisuMZ_BattleCore_Notetags','isSkillItemWindowsMiddle','startPartyCommandSelection','auto','pushBaseLine','ShowReflect','requestRefresh','setupMotionBlurImpactFilter','_forcedBattleLayout','notFocusValid','JS\x20%1START\x20BATTLE','indexOf','updateStatusWindowPosition','updateBitmap','drawTextEx','BackColor','JS\x20%1APPLY\x20%2','isNonSubmenuCancel','setVisibleUI','battleStatusWindowAnimationContainer','ActSeq_Zoom_Reset','249141ZALond','updateBorderStyle','Sprite_Actor_updateShadow','randomTargets','DefaultDamageStyle','itemCri','rowSpacing','ActSeq_Movement_WaitForFloat','clearBattlerMotionTrailData','createCommandNameWindow','measureTextWidth','currentSymbol','basicGaugesY','isBypassDamageCap','Actions','battleback2Name','MotionAni','BaseTroopIDs','motionIdle','onDatabaseLoaded','startDamagePopup','performEvasion','StepDuration','eraseState','PostRegenerateJS','process_VisuMZ_BattleCore_BaseTroops','ActSeq_Movement_FaceDirection','isTpb','isPreviousScene','setBattlerFacePoint','JS\x20%1START\x20TURN','WaitCount1','Window_BattleLog_clear','icon','displayType','anchorY','battleProjectiles','processPostBattleCommonEvents','HomePosJS','evalDamageFormulaBattleCore','isTickBased','smooth','drawText','emerge','contentsOpacity','battlelog','Game_BattlerBase_die','addText','iconWidth','resetFontSettings','changeBattlerOpacity','weatherType','displayChangedBuffs','createActorCommandWindowBattleCore','clearWeaponAnimation','startJump','match','NameFontSize','isVisualHpGaugeDisplayed','criticalDmgRate','ActSeq_Movement_Jump','itemHeight','ActSeq_Camera_FocusTarget','alive\x20friends','faceRect','isPhysical','waitForMovement','drawActorFace','_floatEasing','onBattleStart','ActSeq_Horror_NoiseRemove','PortraitScale','drawIcon','regenerateAllBattleCore','StartTurnMsg','_targetAngle','isBattleCoreTargetScope','turn','Spriteset_Battle_createBattleField','processDefeat','command3011','ShowEnemyGauge','updateWaitMode','alive\x20actors','CmdStyle','refreshDimmerBitmap','destroy','updateBattlerContainer','DamageDisplay','changeBattlebacks','TimeScale','animationNextDelay','autoMeleeSingleTargetActionSet','ShowHide','AutoBattleOK','activate','createPartyCommandWindowBattleCore','setHelpWindow','_angleDuration','removeChild','_actor','frameVisible','setupShockwaveImpactFilter','Duration','canGuard','DistanceY','adjustPosition_1for1','_actorWindow','Sprite_Actor_update','ARRAYFUNC','PostStartActionJS','removeBuff','_attackAnimationId','ATTACK','createCommandVisibleJS','processBorderActor','actorCommandEscape','startOpacity','Sprite_Enemy_updateStateSprite','faceWidth','_spriteset','HelpSkillType','Game_Map_battleback1Name','DigitGrouping','VisuMZ_1_SkillsStatesCore','ParseStateNotetags','commandStyle','updatePhase','process_VisuMZ_BattleCore_DamageStyles','dying','thrust','battleSkew','Window_BattleLog_performCollapse','createHpGaugeSprite','ActSeq_Movement_WaitForMovement','Game_BattlerBase_canGuard','shift','autoBattleUseSkills','isAnyoneSkewing','initBattleCore','process_VisuMZ_BattleCore_jsFunctions','setBattleAngle','gradientFillRect','setBackgroundType','statusText','ActSeq_Zoom_Scale','PopupPosition','isItem','TextColor','setHandler','command301_PreBattleEvent','version','Exploiter','processRandomizedData','backColor','createBattleUIOffsetX','drawItemImageListStyle','Game_Enemy_setup','user','isMagical','isAnyoneMoving','PreApplyAsTargetJS','isBattlerGrounded','battleCoreResumeLaunchBattle','float','WaitForProjectile','clearFreezeMotionForWeapons','process_VisuMZ_BattleCore_Action_Notetags','displayAction','Game_Action_makeTargets','PostDamageJS','callUpdateHelp','adjustPosition_ScaleDown','BattleManager_isTpbMainPhase','Game_Action_isForFriend','_mainSprite','autoBattle','name','Game_Battler_performActionStart','performMagicEvasion','makeActionListAutoAttack','createTargetsJS','ShowAddedBuff','damageOffsetY','HelpAutoBattle','_updateCursorArea','updatePosition','AutoNotetag','_forcedBattlers','ActSeq_Target_NextTarget','_partyCommandWindow','Scene_Battle_onActorOk','animationId','filters','needsActorInputCancel','moveToStartPositionBattleCore','addTextToCombatLog','Shadow','prepareBorderActor','iconHeight','sortEnemies','isTriggered','Game_Interpreter_command301','RevertAngle','GroupDigits','drawItemImageXPStyle','isGrowing','Scene_Battle_commandFight','die','_animationCount','requestMotion','statusTextAutoBattleStyle','_effectType','performJump','formula','Window_BattleLog_displayFailure','all\x20targets','_svBattlerSprite','makeDeepCopy','maxLines','Sprite_Actor_updateFrame','createWeather','isAnyoneFloating','setMoveEasingType','itemRect','Scene_Battle_createPartyCommandWindow','isSkipPartyCommandWindow','Formula','dragonbonesData','return\x200','updateScale','createShadowSprite','_cursorArea','performReflection','Scene_Battle_startPartyCommandSelection','battleEnd','addBuff','focus','battleCorePreBattleCommonEvent','ActSeq_Horror_GlitchCreate','XPActorDefaultHeight','compareEnemySprite','WaitForNewLine','Game_Action_itemEffectAddAttackState','battleback1Name','Radius','mainSpriteScaleY','actor','_borderPortraitSprite','Game_Temp_requestAnimation','Window_BattleLog_performActionStart','_itemWindow','BattleManager_startTurn','setHue','ActSeq_Mechanics_BtbGain','Game_Battler_performMiss','isAutoBattleCommandAdded','zoomDuration','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','autoMeleeMultiTargetActionSet','skillId','_motion','FlinchDuration','animationShouldMirror','apply','VisuMZ_3_ActSeqCamera','CopyCombatLog','_handlers','autoBattleStart','_canLose','_back1Sprite','STR','jump','index','actorCommandSingleSkill','callNextMethod','getConfigValue','startWeaponAnimation','_opacityEasing','Sprite_Battler_setHome','buffAdd','description','Window_BattleLog_pushBaseLine','animation','startTpbTurn','battleFloat','ActSeq_Impact_MotionBlurScreen','Post','isMeleeMultiTargetAction','FocusY','arPenRate','Scene_Battle_updateBattleProcess','gainHp','Scene_Battle_startActorSelection','stop','forceAction','close','singleSkill','textColor','PreDamageAsTargetJS','glitch','windowPadding','521921eKZetY','adjustPosition_ScaleUp','hpAffected','Game_Action_apply','_defeatedEnemies','displayMpDamage','_stypeIDs','updateHelp','updatePositionBattleCore','GuardFormulaJS','makeAutoBattleActions','createEmptyBitmap','FlinchDistanceX','CriticalHitFlat','ActSeq_Animation_CastAnimation','_enemyID','_actionInputIndex','max','removeHorrorEffect','ActiveTpbOptionsMessage','timeScale','iconText','note','SceneManager_isSceneChanging','EnableDamageCap','_targetFloatHeight','_angleRevertOnFinish','concat','battleJump','resizeWindowXPStyle','command339','Window_BattleLog_popupDamage','updateSpin','isBattlerFlipped','getMenuImage','PRE-','processVictory','exit','setBattlerMotionTrailData','clearResult','HP_Rate','isForFriendBattleCore','autoBattleAtStart','XPActorCommandLines','AUTO\x20BATTLE','%1EndTurnJS','ActSeq_Mechanics_AddState','clearForcedGameTroopSettingsBattleCore','okButtonText','ActSeq_Mechanics_CustomDmgFormula','NewPopupBottom','VisuMZ_1_MainMenuCore','move','battleZoom','damageStyle','uiInputPosition','CriticalDuration','loadPicture','ActSeq_BattleLog_PopBaseLine','FrontViewSelect','ConfigManager_applyData','setCustomDamageFormula','createBattleFieldContainer','updateAction','battleCoreTpbMainPhase','isEscapeCommandEnabled','BattleDefeatJS','requestDragonbonesAnimation','onAllActionsEnd','regenerateAll','_borderPortraitDuration','Game_Action_itemHit','process_VisuMZ_BattleCore_Failsafes','AutoBattleRect','opacity','AsTarget','options','_preemptive','nameY','drawSkillCost','createEffectActionSet','Game_Troop_setup','createDigits','_homeX','_inputting','ActSeq_Motion_RefreshMotion','_statusWindow','criticalHitRate','performCounter','_jumpWholeDuration','Intensity','command357','reverse','Game_Interpreter_command283','CriticalHitRateJS','_customDamageFormula','start','MAT','ActSeq_BattleLog_WaitForNewLine','_emptyBitmap','VisuMZ_1_ElementStatusCore','_subject','PopupOffsetY','ActSeq_Mechanics_ActionEffect','battleUIOffsetX','clearBattleCoreData','_updateCursorFilterArea','Game_Battler_performEvasion','missed','addAutoBattleCommands','endAnimation','ATK','ActSeq_Movement_WaitForScale','ShowWeapon','sortDamageSprites','_lastPluginCommandInterpreter','_stateIconSprite','PreStartTurnJS','ParseArmorNotetags','actionBattleCoreJS','Scale','canEscape','sliceMin','portrait','hasSvBattler','Scene_Battle_onActorCancel','removeState','scope','bitmapHeight','itemEffectAddNormalState','dead\x20battlers','PostApply%1JS','isBattleFlipped','PortraitScaleBorderStyle','setText','bgType','ShowTpDmg','initVisibility','lineRect','_lines','ActSeq_Mechanics_AddBuffDebuff','updateHpGaugePosition','Game_Enemy_transform','AllowRandomSpeed','loadBitmap','_enemyWindow','performFlinch','ActionCount','isAtbChargingState','Spriteset_Battle_updateActors','_freezeMotionData','JS\x20%1END\x20BATTLE','ActSeq_Movement_WaitForOpacity','_appeared','States','motionSpeed','_damagePopupArray','JS\x20%1END\x20ACTION','PreRegenerateJS','clearFreezeMotion','updateStart','Scene_Battle_updateStatusWindowPosition','escape','adjustFlippedBattlefield','addBattleCoreAutoBattleStyleCommand','Scene_Boot_onDatabaseLoaded','ShowActorGauge','HP_Flat','_growDuration','addAttackCommand','applyHardDamageCap','attackSkillId','_floatWholeDuration','CheckSkillCommandShowSwitches','canGuardBattleCore','angle','drawItemStyleIconText','charged','SvBattlerMass-%1-%2','playEnemyDamage','drawLineText','Sprite_Actor_updateBitmap','BattleLayout','isBusy','svShadow','alive\x20enemies','_damages','not\x20focus','StepDistanceY','getAttackMotion','VisuMZ_2_BattleSystemBTB','Scene_Battle_windowAreaHeight','drawItemImage','DamageStyleList','refreshMotion','ScaleUp','PreEndBattleJS','canAddSkillCommand','updateOpacity','waitCount','_animationSprites','ScaleY','frontviewSpriteY','_padding','isDamagePopupRequested','collapse','setupZoomBlurImpactFilter','fontSize','ARRAYNUM','_callSceneOptions','_reflectionTarget','battlerSprites','split','Window_BattleLog_performReflection','MANUAL','Scene_Options_maxCommands','surprise','isDeathStateAffected','drawItemStatus','updateBattlebackBitmap1','bottom','cancelButtonText','Sprite_Enemy_updateCollapse','Sprite_Enemy_setBattler','placeGauge','DTB','selectNextActor','createAnimationSprite','Parse_Notetags_TraitObjects','log','addShowHpGaugeCommand','isAutoBattleCommandEnabled','createSeparateDamagePopups','VisuMZ_2_BattleSystemSTB','isDebuffAffected','loadSystem','OffsetY','startEnemySelection','getInputButtonString','terminate','SvMotionIdleSolo-%1-%2','hitFlat','_updateClientArea','executeDamage','targetActionSet','ArRedRate','_weaponSprite','ActSeq_Impact_ShockwaveCenterTargets','setAttack','PreApplyJS','ActSeq_Impact_MotionBlurTarget','actorCommandAutoBattle','displayEvasion','ScaleX','PopupOffsetX','isFriendly','BattleCmdList','isDying','DEF','refreshCursor','isActing','makeSpeed','isDisplayEmergedEnemies','performActionMotions','setupBattleback','isAnyProjectilePresent','collapseType','AutoBattleBgType','isAlive','startGrow','BattleLogRectJS','dead\x20enemies','ActSeq_Movement_FaceTarget','isChanting','isConfused','damageFlat','isCustomActionSequence','right','addGuardCommand','_text','Actor','Game_Action_executeDamage','Window_BattleLog_displayMiss','Game_BattlerBase_eraseState','ActSeq_BattleLog_Refresh','_interpreter','format','_list','displayCritical','_shadowSprite','head','WaitForFloat','STYPES','setBattleCameraPoint','MotionSpeed','DigitGroupingDamageSprites','ActSeq_Mechanics_ArmorPenetration','filter','CommandWidth','PartyCmd','Scene_ItemBase_applyItem','custom','VisuMZ_3_ActSeqImpact','ShowRemovedBuff','MIN_SAFE_INTEGER','processEscape','BattleManager_startInput','ChantStyle','calcWindowHeight','pages','displayStartMessages','onAngleEnd','walk','createDamageSprite','COMBATLOG','ParseSkillNotetags','MotionFrameWait','_lastEnemy','Opacity','SkewX','_createDamageContainer','Debuffs','updateShadow','loop','gainCurrentActionsFTB','isUndecided','isAutoBattle','ActSeq_Mechanics_TextPopup','softDamageCapRate','removeDamageSprite','_baseY','stepFlinch','onGrowEnd','ActSeq_Movement_WaitForSpin','_battleCoreNoElement','invokeMagicReflection','_helpWindow','makeTargetSelectionMoreVisible','svBattlerData','Sprite_Battler_setBattler','moveBattlerToPoint','BattleManager_onEscapeFailure','commandSymbol','svAnchorY','1qsXYZP','_isBattlerFlipped','arRedRate','VisuMZ_2_BattleSystemCTB','isOpen','createAllWindows','ActSeq_Target_RandTarget','command301','alive\x20friends\x20not\x20target','updateCancel','updateRefresh','isTurnBased','border','battleCommands','Game_Interpreter_updateWaitMode','makeDamageValue','clone','damageContainer','ARRAYEVAL','isCertainHit','alive\x20battlers\x20not\x20user','active','skillItemWindowRectMiddle','isBorderStylePortraitShown','push','skew','commandEscape','onEncounterBattleCore','setupBattleCore','ActSeq_Target_CurrentIndex','Game_Action_isForOpponent','onEncounter','ParseItemNotetags','drawGauge','WaitCount','Game_Battler_onBattleStart','bitmap','onOpacityEnd','isForOpponentBattleCore','addAnimationSpriteToContainer','_enemyId','_scene','scale','requestAnimation','_additionalSprites','arPenFlat','Spriteset_Battle_createLowerLayer','startActorSelection','addActor','updateForceAction','WaitForAngle','refreshStatusWindow','map','_commandNameWindow','performActionStart','createBorderStylePortraitSprite','Scene_Battle_createAllWindows','Angle','displayReflectionPlayBack','_phase','skillItemWindowRectBorderStyle','IconSet','ForceExploiter','ShowCurrentState','stateMotionIndex','isItemCommandEnabled','ActSeq_Motion_ClearFreezeFrame','createString','removedBuffs','MAXHP','_enemy','evalDamageFormula','getEnemyIdWithName','Filename','BattleManager_selectNextCommand','ActSeq_Movement_WaitForJump','ActSeq_ChangeAngle','initMembersBattleCore','anchorX','_immortal','%1StartTurnJS','hasSkill','autoSelect','MotionType','_iconIndex','clearRect','initMembers','_opacityDuration','isCommandEnabled','battleAnimation','Game_BattlerBase_addNewState','Game_Battler_onTurnEnd','applyEasing','Sprite_Weapon_loadBitmap','text','_dragonbonesSpriteContainer','setupWeaponAnimation','displayTpDamage','spriteId','Mechanics','removeImmortal','displayReflection','Sprite_Battler_startMove','getSkillIdWithName','_armorPenetration','applyImmortal','initialize','ActionEffect','isOpponent','ActSeq_Camera_FocusPoint','adjustPosition_ScaleToFit','Game_Action_evalDamageFormula','ActSeq_Movement_Float','updateCollapse','PreStartBattleJS','ARRAYJSON','alive\x20opponents\x20not\x20target','AddOption','Game_Action_clear','Window_ActorCommand_setup','addLoadListener','_cursorSprite','StartName','_battleCoreForcedElements','_duration','PopupDuration','setImmortal','counterAttack','Turns','updateFrame','createDamageContainer','VisuMZ_0_CoreEngine','startFloat','Window_SkillList_maxCols','ReflectPlayback','addDamageSprite','Sprite_Enemy_updateBossCollapse','actorCommandCancelTPB','isCustomBattleScope','MessageWait','setBattler','VisuMZ_2_BattleSystemATB','getItemDamageAmountLabelBattleCore','_baseLineStack','getChildIndex','BattleManager_processVictory','showNormalAnimation','_battleLayoutStyle','ActSeq_Camera_WaitForCamera','textSizeEx','ShowAddedDebuff','battleDisplayText','anchor','CalcEscapeRatioJS','placeActorName','Game_BattlerBase_canAttack','flashDuration','ActSeq_Element_NullElements','charging','loadBattleback1','drawItemStatusXPStyle','ALL\x20SKILLS','ActSeq_Animation_AttackAnimation','requestFauxAnimation','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','repositionCancelButtonBorderStyle','IconStypeNorm','onActorCancel','loadSvEnemy','ActSeq_Mechanics_HpMpTp','min','BattleManager_processDefeat','_colorType','list','setLastPluginCommandInterpreter','EVAL','PreDamageJS','_tpbNeedsPartyCommand','_surprise','addImmortal','FlashColor','cancelActorInput','_targetOpacity','pattern','setBattleCameraOffset','ActSeq_DB_DragonbonesMotionAni','Game_Battler_performDamage','forceSelect','ActSeq_Movement_Skew','AnchorX','item','contents','isDuringNonLoopingMotion','Scene_Battle_logWindowRect','Game_Battler_forceAction','process_VisuMZ_BattleCore_CreateRegExp','showHelpWindow','ActSeq_Motion_PerformAction','JS\x20ESCAPE\x20SUCCESS','battleCamera','updateFloat','updateEffectContainers','getLastPluginCommandInterpreter','SkewY','_regionBattleback1','Parse_Notetags_Targets','_floatDuration','canUseItemCommand','_branch','Width','helpAreaHeight','PreApplyAsUserJS','stypeId','CommandAddAutoBattle','power','alive\x20actors\x20not\x20user','setupCriticalEffect','Window_BattleLog_displayMpDamage','ActSeq_Mechanics_DeathBreak','setBattlePortrait','canBattlerMove','ActSeq_Mechanics_RemoveBuffDebuff','ext','Amp','setBattleZoom','Targets','deathStateId','Sprite_Battler_updatePosition','playReflection','alive\x20friends\x20not\x20user','BattleManager_updatePhase','PostEndActionJS','inBattle','Weapon-%1-%2','_stateSprite','updateAngleCalculations','removeActor','createMiss','trueRandomTarget','svAnchorX','OffsetX','Window_BattleLog_performEvasion','_svBattlerData','Window_BattleLog_displayEvasion','getBattlePortraitFilename','drawSingleSkillCost','cancel','default','isMoving','processRefresh','battleEffect','getTraitSetKeys','Height','ParseEnemyNotetags','damageRate','damage','createActorCommandWindow','Game_Battler_clearMotion','alive\x20opponents','setHome','performDamage','length','Damage','battleUIOffsetY','forceEscapeSprite','isActiveTpb','FlashDuration','isEnemy','isPartyTpbInputtable','Sprite_Actor_setActorHome','Sprite_Battler_damageOffsetY','setupRgbSplitImpactFilter','Window_BattleEnemy_initialize','_battlerName','getDamageStyle','commandName','_skillIDs','_animationContainer','createBattleField','moveToStartPosition','CheckMapBattleEventValid','processForcedAction','_battleField','Sprite_Battler_initMembers','ScaleDown','createChildSprite','isSkewing','getBattlePortraitOffsetX','ParseClassNotetags','addSkillCommands','isAnyoneJumping','isShownOnBattlePortrait','isAttack','_targetSkewX','BattleManager_onEncounter','ActSeq_Angle_Reset','onJumpEnd','helpWindowRectBorderStyle','setCursorRect','refreshRequest','effect','Game_Action_needsSelection','createPartyCommandWindow','ShowRemovedState','createActionSequenceProjectile','_targetGrowY','noise','actionEffect','BattleManager_inputtingAction','ActSeq_Movement_Opacity','COMBAT\x20LOG','forceWeaponAnimation','CmdIconOptions','%1StartActionJS','Game_Party_removeActor','_growY','battleCameraData','_battlePortrait','becomeSTBExploited','isOptionsCommandAdded','Spriteset_Battle_update','WaitForCamera','applyData','attackMotions','getAttackWeaponAnimationId','occasion','round','isChangingOpacity','PostStartBattleJS','_commonEventQueue','addedDebuffs','ClearBattleLog','_windowLayer','ActSeq_Animation_ActionAnimation','CommandAddOptions','includes','itemHit','PostStartTurnJS','Text','updateFlip','Targets2','createHelpWindow','DefaultHardCap','_checkOn','CastPhysical','showAnimation','_jumpHeight','ReflectAnimation','dead\x20friends','_executedValue','drawItemStatusListStyle','ActSeq_Camera_Offset','Game_Actor_makeActionList','Window_BattleLog_performDamage','refreshBattlerMotions','attackStates','_currentActor','delay','svBattlerShadowVisible','JS\x20%1START\x20ACTION','isSceneChanging','isOptionsCommandEnabled','ActSeq_Camera_Clamp','getItemDamageAmountTextOriginal','evaded','updateShadowBattleCore','animationWait','ActSeq_Impact_ColorBreak','enemy','_damageContainer','51016hJmihm','currentAction','message4','reserveCommonEvent','CastAnimation','updateTargetPosition','updateVisibility','helpWindowRect','isHidden','partyCommandWindowRectBorderStyle','shouldPopupDamage','_targets','BravePoints','updateJump','addCombatLogCommand','waitForFloat','floatBattler','_preBattleCommonEvent','slice','displaySubstitute','battleSpin','createJS','DefaultSoftScaler','onBattleStartBattleCore','Game_Map_battleback2Name','_actorCommandWindow','performActionEndMembers','isSideButtonLayout','PostApplyAsTargetJS','ActSeq_Mechanics_DamagePopup','updateCommandNameWindow','setBattlerFlip','selectNextCommandTpb','remove','dead\x20actors','mainSpriteScaleX','missile','BattleManager_makeActionOrders','isCharging','Window_BattleLog_refresh','Sprite_Battler_isMoving','_opacityWholeDuration','canInput','Shadow2','BattleManager_cancelActorInput','_jumpMaxHeight','itemEffectAddAttackState','_flashColor','PerformAction','clearDamagePopup','_escapeRatio','ActSeq_Movement_BattleStep','useDigitGrouping','_skewX','LastSelected','_enemyIDs','isLearnedSkill','Item-%1-%2','CmdIconEscape','AllowCollapse','performCastAnimation','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ActSeq_Mechanics_WaitForEffect','IconStypeMagic','WaitCount2','5711BxVGXg','makeHpDamageText','getNextSubjectFromPool','dimColor2','displayBuffs','adjustPosition','deadMembers','HelpEscape','PrioritySortActors','front\x20base','_skillWindow','waitForAnimation','parameters','ActSeq_Set_SetupAction','CalcEscapeRaiseJS','chant','Point','_battler','JS\x20%1DAMAGE\x20%2','_logWindow','join','setupChild','_flipScaleX','drawBackgroundRect','padding','partyCommandWindowRect','autoBattleWindowRect','isJumping','StartTurnWait','Sprite_Battler_update','Sprite_Battleback_adjustPosition','Linear','BattleLog','Index','Enemy','reduce','setActorHome','_weaponImageId','BattleManager_initMembers','drawItemStyleIcon','weaponTypes','UNTITLED','drawItemImagePortraitStyle','_allTargets','Frame','callOkHandler','createCancelButton','ActionAnimation','battleMove','performMoveToPoint','ActSeq_Angle_WaitForAngle','Window_BattleEnemy_show','\x5cI[%1]%2','playEnemyAttack','Skill-%1-%2','getHardDamageCap','ShowPopup','maxCommands','TPB','iconIndex','isBattleMember','getDefeatedEnemies','onMoveEnd','Scene_Battle_startActorCommandSelection','lineHeight','Sprite_Actor_moveToStartPosition','dead\x20opponents','PopupShiftX','PrioritySortActive','damageOffsetX','Game_Battler_regenerateAll','_battlerContainer','getWtypeIdWithName','Sprite_Enemy_update','_autoBattle','PostDamageAsUserJS','createEnemyNameContainer','isForOpponent','performAttack','battleSpriteSkew','Game_Battler_clearDamagePopup','addSingleSkillCommands','ActSeq_Movement_FacePoint','Sprite_Enemy_createStateIconSprite','invokeAction','hardDamageCap','prepareCustomActionSequence','SkillItemBorderCols','retreat','current\x20target','wait','performCollapse','applyFreezeMotionFrames','svBattlerAnchorX','show','height','effects','Scene_Battle_selectPreviousCommand','Class-%1-%2','commandOptions','substitute','ApplyImmortal','addAutoBattleCommand','isBattleTest','startSkew','ActSeq_Mechanics_Multipliers','ScaleToFit','criticalHitFlat','makeTargetSprites','DamageType%1','makeActions','partyCommandWindowRectDefaultStyle','Sprite_Actor_setBattler','onEscapeFailure','_currentAngle','recoverAll','clear','stepBack','waitForNewLine','startMotion','allBattleMembers','_updateFilterArea','Scene_Battle_onEnemyCancel','_cancelButton','ActSeq_Set_WholeActionSet','ActSeq_Horror_NoiseCreate','setupHpGaugeSprite','placeStateIcon','ActSeq_Movement_MoveBy','Sprite_Enemy_loadBitmap','BattleEndEvent','resize','CmdTextAlign','isCancelled'];const _0x4eda=function(_0x492dc5,_0x91b8fb){_0x492dc5=_0x492dc5-0xbb;let _0xc1bdf2=_0xc1bd[_0x492dc5];return _0xc1bdf2;};const _0x2e20ee=_0x4eda;(function(_0x5eaf8c,_0x1c770f){const _0x584794=_0x4eda;while(!![]){try{const _0x29efb8=parseInt(_0x584794(0x62f))+-parseInt(_0x584794(0x12d))+parseInt(_0x584794(0x7e1))+-parseInt(_0x584794(0x13c))*-parseInt(_0x584794(0x7d1))+-parseInt(_0x584794(0x670))*-parseInt(_0x584794(0x4bd))+parseInt(_0x584794(0x7ab))*-parseInt(_0x584794(0x237))+-parseInt(_0x584794(0x365));if(_0x29efb8===_0x1c770f)break;else _0x5eaf8c['push'](_0x5eaf8c['shift']());}catch(_0x3f99e8){_0x5eaf8c['push'](_0x5eaf8c['shift']());}}}(_0xc1bd,0x46b7d));var label=_0x2e20ee(0x17b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2e20ee(0x48e)](function(_0x2c9f46){const _0x331a78=_0x2e20ee;return _0x2c9f46[_0x331a78(0x75d)]&&_0x2c9f46[_0x331a78(0x350)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2e20ee(0x1bf)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x2e20ee(0xfd)]=function(_0x2cb63f,_0x30eafa){const _0x499e28=_0x2e20ee;for(const _0x5c15e6 in _0x30eafa){if(_0x5c15e6['match'](/(.*):(.*)/i)){const _0x505191=String(RegExp['$1']),_0x31ffe3=String(RegExp['$2'])[_0x499e28(0x6f8)]()[_0x499e28(0x762)]();let _0x419d8a,_0xe17ab,_0x24a946;switch(_0x31ffe3){case'NUM':_0x419d8a=_0x30eafa[_0x5c15e6]!==''?Number(_0x30eafa[_0x5c15e6]):0x0;break;case _0x499e28(0x435):_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab[_0x499e28(0x4f1)](_0x4fdd47=>Number(_0x4fdd47));break;case _0x499e28(0x56c):_0x419d8a=_0x30eafa[_0x5c15e6]!==''?eval(_0x30eafa[_0x5c15e6]):null;break;case _0x499e28(0x4cf):_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab[_0x499e28(0x4f1)](_0xf6798b=>eval(_0xf6798b));break;case _0x499e28(0x770):_0x419d8a=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):'';break;case _0x499e28(0x530):_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab[_0x499e28(0x4f1)](_0x284df2=>JSON[_0x499e28(0x159)](_0x284df2));break;case _0x499e28(0x134):_0x419d8a=_0x30eafa[_0x5c15e6]!==''?new Function(JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6])):new Function(_0x499e28(0x31c));break;case _0x499e28(0x2a4):_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON['parse'](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab['map'](_0x510070=>new Function(JSON[_0x499e28(0x159)](_0x510070)));break;case _0x499e28(0x346):_0x419d8a=_0x30eafa[_0x5c15e6]!==''?String(_0x30eafa[_0x5c15e6]):'';break;case'ARRAYSTR':_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON['parse'](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab['map'](_0x465ac4=>String(_0x465ac4));break;case _0x499e28(0x20f):_0x24a946=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):{},_0x2cb63f[_0x505191]={},VisuMZ[_0x499e28(0xfd)](_0x2cb63f[_0x505191],_0x24a946);continue;case _0x499e28(0x1ce):_0xe17ab=_0x30eafa[_0x5c15e6]!==''?JSON[_0x499e28(0x159)](_0x30eafa[_0x5c15e6]):[],_0x419d8a=_0xe17ab['map'](_0x4b20c4=>VisuMZ['ConvertParams']({},JSON[_0x499e28(0x159)](_0x4b20c4)));break;default:continue;}_0x2cb63f[_0x505191]=_0x419d8a;}}return _0x2cb63f;},(_0x4d887c=>{const _0x86062c=_0x2e20ee,_0x317c74=_0x4d887c[_0x86062c(0x2e8)];for(const _0x179636 of dependencies){if(!Imported[_0x179636]){alert(_0x86062c(0x339)[_0x86062c(0x483)](_0x317c74,_0x179636)),SceneManager[_0x86062c(0x38a)]();break;}}const _0x62e4d9=_0x4d887c['description'];if(_0x62e4d9[_0x86062c(0x26f)](/\[Version[ ](.*?)\]/i)){const _0x3e2e8f=Number(RegExp['$1']);_0x3e2e8f!==VisuMZ[label][_0x86062c(0x2ce)]&&(alert(_0x86062c(0x561)[_0x86062c(0x483)](_0x317c74,_0x3e2e8f)),SceneManager[_0x86062c(0x38a)]());}if(_0x62e4d9[_0x86062c(0x26f)](/\[Tier[ ](\d+)\]/i)){const _0x20dcaa=Number(RegExp['$1']);_0x20dcaa<tier?(alert(_0x86062c(0xd4)['format'](_0x317c74,_0x20dcaa,tier)),SceneManager[_0x86062c(0x38a)]()):tier=Math['max'](_0x20dcaa,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x86062c(0x1bf)],_0x4d887c[_0x86062c(0x67c)]);})(pluginData),VisuMZ['CreateActionSequenceTargets']=function(_0x38ab6e){const _0x3617d1=_0x2e20ee;let _0x358157=[];for(const _0x59816d of _0x38ab6e){_0x358157=_0x358157[_0x3617d1(0x380)](VisuMZ['ConvertActionSequenceTarget'](_0x59816d));}return _0x358157['filter'](_0x24e2e0=>_0x24e2e0);},VisuMZ['ConvertActionSequenceTarget']=function(_0x3573f7){const _0xaea612=_0x2e20ee,_0x6e5148=BattleManager[_0xaea612(0x6e8)]()['filter'](_0x256f87=>_0x256f87&&_0x256f87[_0xaea612(0x804)]()),_0x1b6656=BattleManager[_0xaea612(0x3ca)],_0x2771f4=BattleManager[_0xaea612(0x7a1)],_0xcdab68=BattleManager[_0xaea612(0x69b)]?BattleManager[_0xaea612(0x69b)][_0xaea612(0x641)](0x0):_0x6e5148;_0x3573f7=_0x3573f7[_0xaea612(0x1fe)]()[_0xaea612(0x762)]();if(_0x3573f7===_0xaea612(0x2d5))return[_0x1b6656];else{if(_0x3573f7===_0xaea612(0x6c9))return[_0x2771f4];else{if(_0x3573f7===_0xaea612(0x1a7)){if(_0x2771f4){const _0x3d582d=_0xcdab68[_0xaea612(0x22d)](_0x2771f4);return _0x3d582d>=0x0?[_0xcdab68[_0x3d582d-0x1]||_0x2771f4]:[_0x2771f4];}}else{if(_0x3573f7===_0xaea612(0x790)){if(_0x2771f4){const _0x28f1ba=_0xcdab68[_0xaea612(0x22d)](_0x2771f4);return _0x28f1ba>=0x0?[_0xcdab68[_0x28f1ba+0x1]||_0x2771f4]:[_0x2771f4];}}else{if(_0x3573f7===_0xaea612(0x30f))return _0xcdab68;else{if(_0x3573f7===_0xaea612(0x324))return[_0x1b6656]['concat'](_0xcdab68);else{if(_0x3573f7===_0xaea612(0x420))return _0x6e5148['filter'](_0x2b240f=>_0x2b240f!==_0x1b6656&&!_0xcdab68['includes'](_0x2b240f)&&_0x2b240f[_0xaea612(0x22b)]());}}}}}}if(_0x1b6656){if(_0x3573f7===_0xaea612(0x276))return _0x1b6656['friendsUnit']()[_0xaea612(0x11b)]();else{if(_0x3573f7===_0xaea612(0x5a2))return _0x1b6656[_0xaea612(0x766)]()['aliveMembers']()[_0xaea612(0x48e)](_0x51c280=>_0x51c280!==_0x1b6656);else{if(_0x3573f7===_0xaea612(0x4c5))return _0x1b6656[_0xaea612(0x766)]()[_0xaea612(0x11b)]()[_0xaea612(0x48e)](_0x5bed6a=>_0x5bed6a!==_0x2771f4);else{if(_0x3573f7===_0xaea612(0x619))return _0x1b6656[_0xaea612(0x766)]()['deadMembers']();else{if(_0x3573f7[_0xaea612(0x26f)](/FRIEND INDEX (\d+)/i)){const _0x421c9f=Number(RegExp['$1']);return[_0x1b6656[_0xaea612(0x766)]()[_0xaea612(0xbb)]()[_0x421c9f]];}}}}}if(_0x3573f7===_0xaea612(0x5bf))return _0x1b6656[_0xaea612(0xeb)]()[_0xaea612(0x11b)]();else{if(_0x3573f7===_0xaea612(0x531))return _0x1b6656['opponentsUnit']()[_0xaea612(0x11b)]()['filter'](_0x91e0ca=>_0x91e0ca!==_0x2771f4);else{if(_0x3573f7===_0xaea612(0x6b2))return _0x1b6656[_0xaea612(0xeb)]()[_0xaea612(0x676)]();else{if(_0x3573f7[_0xaea612(0x26f)](/OPPONENT INDEX (\d+)/i)){const _0x595c14=Number(RegExp['$1']);return[_0x1b6656[_0xaea612(0xeb)]()[_0xaea612(0xbb)]()[_0x595c14]];}}}}}if(_0x3573f7===_0xaea612(0x28a))return $gameParty[_0xaea612(0x11b)]();else{if(_0x3573f7===_0xaea612(0x594))return $gameParty[_0xaea612(0x11b)]()[_0xaea612(0x48e)](_0x450cb6=>_0x450cb6!==_0x1b6656);else{if(_0x3573f7===_0xaea612(0x1ae))return $gameParty[_0xaea612(0x11b)]()[_0xaea612(0x48e)](_0x5cae46=>_0x5cae46!==_0x2771f4);else{if(_0x3573f7===_0xaea612(0x651))return $gameParty['deadMembers']();else{if(_0x3573f7[_0xaea612(0x26f)](/ACTOR INDEX (\d+)/i)){const _0x26fecd=Number(RegExp['$1']);return[$gameParty[_0xaea612(0xbb)]()[_0x26fecd]];}else{if(_0x3573f7[_0xaea612(0x26f)](/ACTOR ID (\d+)/i)){const _0x26e4d2=Number(RegExp['$1']);return[$gameActors[_0xaea612(0x32e)](_0x26e4d2)];}}}}}}if(_0x3573f7===_0xaea612(0x41e))return $gameTroop[_0xaea612(0x11b)]();else{if(_0x3573f7==='alive\x20enemies\x20not\x20user')return $gameTroop['aliveMembers']()['filter'](_0x4696cc=>_0x4696cc!==_0x1b6656);else{if(_0x3573f7==='alive\x20enemies\x20not\x20target')return $gameTroop[_0xaea612(0x11b)]()['filter'](_0x4aee1c=>_0x4aee1c!==_0x2771f4);else{if(_0x3573f7===_0xaea612(0x474))return $gameTroop[_0xaea612(0x676)]();else{if(_0x3573f7[_0xaea612(0x26f)](/ENEMY INDEX (\d+)/i)){const _0x34b639=Number(RegExp['$1']);return[$gameTroop[_0xaea612(0xbb)]()[_0x34b639]];}else{if(_0x3573f7[_0xaea612(0x26f)](/ENEMY ID (\d+)/i)){const _0x55ff16=Number(RegExp['$1']);return $gameTroop['aliveMembers']()[_0xaea612(0x48e)](_0x57f0a1=>_0x57f0a1['enemyId']()===_0x55ff16);}}}}}}if(_0x3573f7===_0xaea612(0x1fa))return _0x6e5148[_0xaea612(0x48e)](_0x14f32c=>_0x14f32c[_0xaea612(0x471)]());else{if(_0x3573f7===_0xaea612(0x4d1))return _0x6e5148[_0xaea612(0x48e)](_0x20beba=>_0x20beba[_0xaea612(0x471)]()&&_0x20beba!==_0x1b6656);else{if(_0x3573f7===_0xaea612(0x205))return _0x6e5148[_0xaea612(0x48e)](_0x35c9d3=>_0x35c9d3[_0xaea612(0x471)]()&&_0x35c9d3!==_0x2771f4);else{if(_0x3573f7===_0xaea612(0x3e7))return _0x6e5148[_0xaea612(0x48e)](_0x56204a=>_0x56204a[_0xaea612(0x1cf)]());}}}return[];},PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x67d),_0x1a837e=>{const _0x297fc3=_0x2e20ee;if(!SceneManager[_0x297fc3(0x14c)]())return;VisuMZ[_0x297fc3(0xfd)](_0x1a837e,_0x1a837e);const _0x4e4973=$gameTemp[_0x297fc3(0x587)](),_0x44e41a=BattleManager['_action'],_0x140cbb=BattleManager[_0x297fc3(0x3ca)],_0x36ff9a=BattleManager[_0x297fc3(0x69b)]?BattleManager[_0x297fc3(0x69b)][_0x297fc3(0x641)](0x0):[],_0x3a027c=BattleManager[_0x297fc3(0x683)];if(!_0x4e4973||!_0x44e41a||!_0x140cbb)return;if(!_0x44e41a[_0x297fc3(0x57b)]())return;if(_0x1a837e['DisplayAction'])_0x3a027c[_0x297fc3(0x2df)](_0x140cbb,_0x44e41a[_0x297fc3(0x57b)]());_0x1a837e[_0x297fc3(0x6d5)]&&_0x3a027c[_0x297fc3(0x4d5)](_0x297fc3(0x526),_0x140cbb,_0x36ff9a,!![]);if(_0x1a837e[_0x297fc3(0x72e)])_0x3a027c[_0x297fc3(0x4d5)](_0x297fc3(0x4f3),_0x140cbb,_0x44e41a);if(_0x1a837e[_0x297fc3(0x7ed)])_0x3a027c[_0x297fc3(0x4d5)](_0x297fc3(0x279));if(_0x1a837e[_0x297fc3(0x633)])_0x3a027c[_0x297fc3(0x4d5)](_0x297fc3(0x66b),_0x140cbb,_0x44e41a);if(_0x1a837e['WaitForAnimation'])_0x3a027c['push']('waitForAnimation');_0x4e4973[_0x297fc3(0x211)]('battlelog');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x6ec),_0x49bf8b=>{const _0xd73a9b=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x49bf8b,_0x49bf8b);const _0x1d6201=$gameTemp[_0xd73a9b(0x587)](),_0x2f28df=BattleManager[_0xd73a9b(0x720)],_0x2b1f7a=BattleManager['_subject'],_0x2e3cfd=BattleManager[_0xd73a9b(0x69b)]?BattleManager[_0xd73a9b(0x69b)][_0xd73a9b(0x641)](0x0):[],_0x155ff0=BattleManager['_logWindow'];if(!_0x1d6201||!_0x2f28df||!_0x2b1f7a)return;if(!_0x2f28df[_0xd73a9b(0x57b)]())return;if(_0x49bf8b[_0xd73a9b(0x65f)])_0x155ff0['push'](_0xd73a9b(0x737),_0x2b1f7a,_0x2f28df);if(_0x49bf8b[_0xd73a9b(0x4df)]>0x0)_0x155ff0[_0xd73a9b(0x4d5)](_0xd73a9b(0x42c),_0x49bf8b[_0xd73a9b(0x4df)]);if(_0x49bf8b[_0xd73a9b(0x69f)])_0x155ff0[_0xd73a9b(0x4d5)](_0xd73a9b(0x616),_0x2b1f7a,_0x2e3cfd,_0x2f28df[_0xd73a9b(0x57b)]()[_0xd73a9b(0x2f7)]);if(_0x49bf8b[_0xd73a9b(0x1e8)])_0x155ff0[_0xd73a9b(0x4d5)](_0xd73a9b(0x67b));for(const _0x345de3 of _0x2e3cfd){if(!_0x345de3)continue;if(_0x49bf8b[_0xd73a9b(0x528)])_0x155ff0[_0xd73a9b(0x4d5)](_0xd73a9b(0x5f0),_0x2b1f7a,_0x345de3);}if(_0x49bf8b[_0xd73a9b(0x6d5)])_0x155ff0[_0xd73a9b(0x4d5)](_0xd73a9b(0x526),_0x2b1f7a,_0x2e3cfd,![]);_0x1d6201['setWaitMode'](_0xd73a9b(0x264));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Set_TargetActionSet',_0x8a3b98=>{const _0xe52efb=_0x2e20ee;if(!SceneManager[_0xe52efb(0x14c)]())return;VisuMZ[_0xe52efb(0xfd)](_0x8a3b98,_0x8a3b98);const _0x26fb63=$gameTemp[_0xe52efb(0x587)](),_0x129237=BattleManager[_0xe52efb(0x720)],_0xc328cd=BattleManager[_0xe52efb(0x3ca)],_0x11135d=BattleManager['_allTargets']?BattleManager['_allTargets']['slice'](0x0):[],_0x1a1349=BattleManager['_logWindow'];if(!_0x26fb63||!_0x129237||!_0xc328cd)return;if(!_0x129237[_0xe52efb(0x57b)]())return;for(const _0x318d04 of _0x11135d){if(!_0x318d04)continue;if(_0x8a3b98['PerformAction'])_0x1a1349[_0xe52efb(0x4d5)](_0xe52efb(0x737),_0xc328cd,_0x129237);if(_0x8a3b98[_0xe52efb(0x256)]>0x0)_0x1a1349[_0xe52efb(0x4d5)](_0xe52efb(0x42c),_0x8a3b98[_0xe52efb(0x256)]);if(_0x8a3b98[_0xe52efb(0x69f)])_0x1a1349[_0xe52efb(0x4d5)](_0xe52efb(0x616),_0xc328cd,[_0x318d04],_0x129237[_0xe52efb(0x57b)]()[_0xe52efb(0x2f7)]);if(_0x8a3b98['WaitCount2']>0x0)_0x1a1349[_0xe52efb(0x4d5)](_0xe52efb(0x42c),_0x8a3b98[_0xe52efb(0x66f)]);if(_0x8a3b98[_0xe52efb(0x528)])_0x1a1349[_0xe52efb(0x4d5)]('actionEffect',_0xc328cd,_0x318d04);}if(_0x8a3b98[_0xe52efb(0x6d5)])_0x1a1349['push']('applyImmortal',_0xc328cd,_0x11135d,![]);_0x26fb63['setWaitMode'](_0xe52efb(0x264));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x79d),_0x5a4c2a=>{const _0x156c6e=_0x2e20ee;if(!SceneManager[_0x156c6e(0x14c)]())return;VisuMZ['ConvertParams'](_0x5a4c2a,_0x5a4c2a);const _0x225f5d=$gameTemp['getLastPluginCommandInterpreter'](),_0x211cbc=BattleManager[_0x156c6e(0x720)],_0x13d901=BattleManager[_0x156c6e(0x3ca)],_0x40eef4=BattleManager[_0x156c6e(0x69b)]?BattleManager[_0x156c6e(0x69b)]['slice'](0x0):[],_0x4f20e9=BattleManager[_0x156c6e(0x683)];if(!_0x225f5d||!_0x211cbc||!_0x13d901)return;if(!_0x211cbc[_0x156c6e(0x57b)]())return;if(_0x5a4c2a[_0x156c6e(0x6d5)])_0x4f20e9[_0x156c6e(0x4d5)](_0x156c6e(0x526),_0x13d901,_0x40eef4,![]);if(_0x5a4c2a[_0x156c6e(0x329)])_0x4f20e9[_0x156c6e(0x4d5)](_0x156c6e(0x6e6));if(_0x5a4c2a[_0x156c6e(0xe0)])_0x4f20e9[_0x156c6e(0x4d5)]('waitForEffect');if(_0x5a4c2a[_0x156c6e(0x608)])_0x4f20e9['push']('clear');if(_0x5a4c2a[_0x156c6e(0x81c)])_0x4f20e9['push'](_0x156c6e(0x20e),_0x13d901);if(_0x5a4c2a['WaitForMovement'])_0x4f20e9[_0x156c6e(0x4d5)]('waitForMovement');_0x225f5d[_0x156c6e(0x211)](_0x156c6e(0x264));}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x509),_0x4ab7c0=>{const _0x58f564=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x58f564(0x340)])return;VisuMZ[_0x58f564(0xfd)](_0x4ab7c0,_0x4ab7c0);const _0x1ec184=$gameTemp[_0x58f564(0x587)](),_0x5dbbb5=_0x4ab7c0[_0x58f564(0x4ef)];if(!_0x1ec184)return;$gameScreen[_0x58f564(0x2c4)](_0x4ab7c0[_0x58f564(0x4f6)],_0x4ab7c0[_0x58f564(0x29e)],_0x4ab7c0['EasingType']);if(_0x5dbbb5)_0x1ec184[_0x58f564(0x211)]('battleAngle');}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x5e4),_0x546aef=>{const _0x2a2997=_0x2e20ee;if(!SceneManager[_0x2a2997(0x14c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x2a2997(0xfd)](_0x546aef,_0x546aef);const _0x282b4c=$gameTemp['getLastPluginCommandInterpreter'](),_0x249768=_0x546aef[_0x2a2997(0x4ef)];if(!_0x282b4c)return;$gameScreen[_0x2a2997(0x2c4)](0x0,_0x546aef['Duration'],_0x546aef[_0x2a2997(0x816)]);if(_0x249768)_0x282b4c[_0x2a2997(0x211)]('battleAngle');}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x6a2),_0x2e746e=>{const _0x25945a=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x25945a(0x340)])return;const _0x2d5754=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x2d5754)return;_0x2d5754[_0x25945a(0x211)](_0x25945a(0x11d));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x60a),_0x19cac5=>{const _0x3c6975=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3c6975(0xfd)](_0x19cac5,_0x19cac5);const _0x1e7cd5=$gameTemp['getLastPluginCommandInterpreter'](),_0x254c35=BattleManager[_0x3c6975(0x720)],_0x5530f5=BattleManager['_subject'],_0x13b496=VisuMZ['CreateActionSequenceTargets'](_0x19cac5[_0x3c6975(0x59e)]),_0x4a420b=_0x19cac5[_0x3c6975(0x1d1)],_0x2059cc=BattleManager[_0x3c6975(0x683)];if(!_0x1e7cd5||!_0x254c35||!_0x5530f5)return;if(!_0x254c35[_0x3c6975(0x57b)]())return;let _0xb0d35c=_0x254c35[_0x3c6975(0x57b)]()[_0x3c6975(0x2f7)];if(_0xb0d35c<0x0)_0xb0d35c=_0x5530f5[_0x3c6975(0x7eb)]();$gameTemp['requestAnimation'](_0x13b496,_0xb0d35c,_0x4a420b),_0x19cac5[_0x3c6975(0x1e8)]&&_0x1e7cd5[_0x3c6975(0x211)]('battleAnimation');}),PluginManager['registerCommand'](pluginData['name'],_0x2e20ee(0x55f),_0x5e0d76=>{const _0x2c5807=_0x2e20ee;if(!SceneManager[_0x2c5807(0x14c)]())return;VisuMZ[_0x2c5807(0xfd)](_0x5e0d76,_0x5e0d76);const _0x52e9c4=$gameTemp[_0x2c5807(0x587)](),_0x4945fe=BattleManager[_0x2c5807(0x3ca)],_0x3c1242=VisuMZ['CreateActionSequenceTargets'](_0x5e0d76['Targets']),_0x1bc9c3=_0x5e0d76['Mirror'],_0x4271ca=BattleManager['_logWindow'];if(!_0x52e9c4||!_0x4945fe)return;const _0x430ba2=_0x4945fe[_0x2c5807(0x7eb)]();$gameTemp[_0x2c5807(0x4e8)](_0x3c1242,_0x430ba2,_0x1bc9c3),_0x5e0d76[_0x2c5807(0x1e8)]&&_0x52e9c4[_0x2c5807(0x211)](_0x2c5807(0x516));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x373),_0x2164b4=>{const _0x2b2d32=_0x2e20ee;if(!SceneManager[_0x2b2d32(0x14c)]())return;VisuMZ[_0x2b2d32(0xfd)](_0x2164b4,_0x2164b4);const _0x16e95d=$gameTemp[_0x2b2d32(0x587)](),_0x21350f=BattleManager['_action'],_0x4f08dc=_0x2164b4[_0x2b2d32(0x1d1)],_0x324059=VisuMZ[_0x2b2d32(0xcd)](_0x2164b4[_0x2b2d32(0x59e)]);if(!_0x16e95d||!_0x21350f)return;if(!_0x21350f['item']())return;for(const _0x99ccc of _0x324059){if(!_0x99ccc)continue;_0x99ccc[_0x2b2d32(0x66b)](_0x21350f,_0x4f08dc);}if(_0x2164b4[_0x2b2d32(0x1e8)])_0x16e95d[_0x2b2d32(0x211)](_0x2b2d32(0x516));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x7b9),_0x109412=>{const _0x2c84da=_0x2e20ee;VisuMZ[_0x2c84da(0xfd)](_0x109412,_0x109412);const _0x29a9c2=$gameTemp['getLastPluginCommandInterpreter'](),_0x190535=VisuMZ[_0x2c84da(0xcd)](_0x109412[_0x2c84da(0x59e)]),_0x588caf=_0x109412[_0x2c84da(0x506)];if(!_0x588caf)return;for(const _0x8663a of _0x190535){if(!_0x8663a)continue;if(!_0x8663a[_0x2c84da(0x13d)]())continue;_0x8663a[_0x2c84da(0x598)](_0x588caf);}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x1b5),_0x3679b0=>{const _0x1c8bd8=_0x2e20ee;if(!SceneManager[_0x1c8bd8(0x14c)]())return;VisuMZ[_0x1c8bd8(0xfd)](_0x3679b0,_0x3679b0);const _0x5260ad=$gameTemp[_0x1c8bd8(0x587)](),_0x3c2a76=VisuMZ[_0x1c8bd8(0xcd)](_0x3679b0[_0x1c8bd8(0x59e)]),_0x3d046e=_0x3679b0['AnimationID'],_0x2b5db5=_0x3679b0[_0x1c8bd8(0x1d1)];if(!_0x5260ad)return;$gameTemp[_0x1c8bd8(0x4e8)](_0x3c2a76,_0x3d046e,_0x2b5db5);if(_0x3679b0['WaitForAnimation'])_0x5260ad['setWaitMode'](_0x1c8bd8(0x516));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Animation_WaitForAnimation',_0x3ce304=>{const _0x22600c=_0x2e20ee;if(!SceneManager[_0x22600c(0x14c)]())return;const _0x25ca3f=$gameTemp[_0x22600c(0x587)]();if(!_0x25ca3f)return;_0x25ca3f['setWaitMode'](_0x22600c(0x516));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x102),_0x374f12=>{const _0x5e9ec0=_0x2e20ee;if(!SceneManager[_0x5e9ec0(0x14c)]())return;VisuMZ['ConvertParams'](_0x374f12,_0x374f12);const _0x5e440c=BattleManager[_0x5e9ec0(0x683)],_0x276278=_0x374f12[_0x5e9ec0(0x341)]&&Imported[_0x5e9ec0(0x7ae)];_0x5e440c[_0x5e9ec0(0x266)](_0x374f12[_0x5e9ec0(0x60f)]),_0x276278&&Imported['VisuMZ_4_CombatLog']&&$gameSystem[_0x5e9ec0(0x2fb)](_0x374f12[_0x5e9ec0(0x60f)]||'',_0x374f12['CombatLogIcon']||0x0);}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_BattleLog_Clear',_0x483733=>{const _0x48556d=_0x2e20ee;if(!SceneManager[_0x48556d(0x14c)]())return;const _0x35355d=BattleManager[_0x48556d(0x683)];_0x35355d[_0x48556d(0x6e4)]();}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x124),_0x4bec1a=>{const _0x26cd17=_0x2e20ee;if(!SceneManager[_0x26cd17(0x14c)]())return;const _0x28e599=$gameTemp[_0x26cd17(0x587)](),_0x39af14=BattleManager[_0x26cd17(0x720)],_0x24465f=BattleManager['_subject'],_0x45251f=BattleManager['_logWindow'];if(!_0x28e599||!_0x39af14||!_0x24465f)return;if(!_0x39af14[_0x26cd17(0x57b)]())return;_0x45251f[_0x26cd17(0x2df)](_0x24465f,_0x39af14[_0x26cd17(0x57b)]()),_0x28e599['setWaitMode'](_0x26cd17(0x264));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x39f),_0x3cef53=>{const _0x3c65b2=_0x2e20ee;if(!SceneManager[_0x3c65b2(0x14c)]())return;const _0x194134=BattleManager[_0x3c65b2(0x683)];_0x194134['popBaseLine']();}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x80f),_0x131ad0=>{const _0x56a7fe=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;const _0x2866d6=BattleManager[_0x56a7fe(0x683)];_0x2866d6['pushBaseLine']();}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x481),_0x233350=>{const _0x3b20c7=_0x2e20ee;if(!SceneManager[_0x3b20c7(0x14c)]())return;const _0xda7f4d=BattleManager[_0x3b20c7(0x683)];_0xda7f4d['refresh']();}),PluginManager['registerCommand'](pluginData['name'],_0x2e20ee(0x82c),_0x9ebe95=>{const _0x3d56a0=_0x2e20ee;if(!SceneManager[_0x3d56a0(0x14c)]())return;VisuMZ[_0x3d56a0(0xfd)](_0x9ebe95,_0x9ebe95),SceneManager[_0x3d56a0(0x4e6)][_0x3d56a0(0x234)](_0x9ebe95[_0x3d56a0(0x294)]);}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_BattleLog_WaitForBattleLog',_0x46004a=>{const _0x185d12=_0x2e20ee;if(!SceneManager[_0x185d12(0x14c)]())return;const _0x2b7028=$gameTemp[_0x185d12(0x587)]();_0x2b7028[_0x185d12(0x211)](_0x185d12(0x264));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3c7),_0x10ccc2=>{const _0x9f14bf=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;const _0x479163=$gameTemp['getLastPluginCommandInterpreter'](),_0x11e79a=BattleManager['_logWindow'];_0x11e79a[_0x9f14bf(0x6e6)](),_0x479163[_0x9f14bf(0x211)]('battlelog');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x627),_0x11ea21=>{const _0xded3bf=_0x2e20ee;if(!SceneManager[_0xded3bf(0x14c)]())return;if(!Imported[_0xded3bf(0x340)])return;VisuMZ[_0xded3bf(0xfd)](_0x11ea21,_0x11ea21);const _0x255713=$gameScreen[_0xded3bf(0x5f9)]();_0x255713[_0xded3bf(0x179)]=_0x11ea21[_0xded3bf(0x819)];}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x52a),_0x395ebf=>{const _0x1abc02=_0x2e20ee;if(!SceneManager[_0x1abc02(0x14c)]())return;if(!Imported[_0x1abc02(0x340)])return;VisuMZ['ConvertParams'](_0x395ebf,_0x395ebf);const _0x262deb=$gameTemp['getLastPluginCommandInterpreter'](),_0x545b5c=_0x395ebf[_0x1abc02(0x5fe)];$gameScreen[_0x1abc02(0x48a)](_0x395ebf['FocusX'],_0x395ebf[_0x1abc02(0x358)],_0x395ebf[_0x1abc02(0x29e)],_0x395ebf['EasingType']);if(_0x545b5c)_0x262deb[_0x1abc02(0x211)](_0x1abc02(0x584));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x275),_0x32c750=>{const _0x3e366b=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x3e366b(0x340)])return;VisuMZ['ConvertParams'](_0x32c750,_0x32c750);const _0x473d5f=$gameTemp[_0x3e366b(0x587)](),_0x370658=VisuMZ[_0x3e366b(0xcd)](_0x32c750['Targets']),_0x1f8428=_0x32c750[_0x3e366b(0x5fe)];$gameScreen['setBattleCameraTargets'](_0x370658,_0x32c750[_0x3e366b(0x29e)],_0x32c750[_0x3e366b(0x816)]);if(_0x1f8428)_0x473d5f[_0x3e366b(0x211)]('battleCamera');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x61c),_0x25c9b4=>{const _0x254aa2=_0x2e20ee;if(!SceneManager[_0x254aa2(0x14c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x254aa2(0xfd)](_0x25c9b4,_0x25c9b4);const _0x189198=$gameTemp[_0x254aa2(0x587)](),_0x109e47=_0x25c9b4[_0x254aa2(0x5fe)];$gameScreen[_0x254aa2(0x575)](_0x25c9b4['OffsetX'],_0x25c9b4[_0x254aa2(0x451)],_0x25c9b4[_0x254aa2(0x29e)],_0x25c9b4[_0x254aa2(0x816)]);if(_0x109e47)_0x189198[_0x254aa2(0x211)](_0x254aa2(0x584));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Camera_Reset',_0x4cce5e=>{const _0x454896=_0x2e20ee;if(!SceneManager[_0x454896(0x14c)]())return;if(!Imported[_0x454896(0x340)])return;VisuMZ[_0x454896(0xfd)](_0x4cce5e,_0x4cce5e);const _0x23a3dc=$gameTemp['getLastPluginCommandInterpreter'](),_0x2fcfd4=_0x4cce5e[_0x454896(0x739)],_0x49b934=_0x4cce5e['ResetOffset'],_0x2a9bea=_0x4cce5e['WaitForCamera'];if(_0x2fcfd4){const _0x40e9da=Math[_0x454896(0x603)](Graphics[_0x454896(0x71d)]/0x2),_0x38ea9b=Math['round'](Graphics[_0x454896(0x6cf)]/0x2);$gameScreen['setBattleCameraPoint'](_0x40e9da,_0x38ea9b,_0x4cce5e['Duration'],_0x4cce5e['EasingType']);}_0x49b934&&$gameScreen['setBattleCameraOffset'](0x0,0x0,_0x4cce5e[_0x454896(0x29e)],_0x4cce5e[_0x454896(0x816)]);if(_0x2a9bea)_0x23a3dc[_0x454896(0x211)](_0x454896(0x584));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x551),_0x4f255f=>{const _0x584b87=_0x2e20ee;if(!SceneManager[_0x584b87(0x14c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0xa0b291=$gameTemp[_0x584b87(0x587)]();if(!_0xa0b291)return;_0xa0b291[_0x584b87(0x211)](_0x584b87(0x584));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x576),_0x23f79b=>{const _0x12293d=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x12293d(0x800)])return;VisuMZ[_0x12293d(0xfd)](_0x23f79b,_0x23f79b);const _0x62e839=VisuMZ['CreateActionSequenceTargets'](_0x23f79b[_0x12293d(0x59e)]),_0x46e4f0=_0x23f79b[_0x12293d(0x247)][_0x12293d(0x1fe)]()[_0x12293d(0x762)]();for(const _0x40af63 of _0x62e839){if(!_0x40af63)continue;_0x40af63[_0x12293d(0x3a8)](_0x46e4f0);}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_DB_DragonbonesTimeScale',_0x5a5b02=>{const _0x43efe9=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x43efe9(0x800)])return;VisuMZ['ConvertParams'](_0x5a5b02,_0x5a5b02);const _0x142388=VisuMZ['CreateActionSequenceTargets'](_0x5a5b02['Targets']),_0xc53514=_0x5a5b02[_0x43efe9(0x291)];for(const _0x4055a8 of _0x142388){if(!_0x4055a8)continue;_0x4055a8[_0x43efe9(0x31b)]()[_0x43efe9(0x379)]=_0xc53514;}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Element_AddElements',_0x4a8f51=>{const _0x27c7c2=_0x2e20ee;if(!SceneManager[_0x27c7c2(0x14c)]())return;if(!Imported[_0x27c7c2(0x3c9)])return;VisuMZ[_0x27c7c2(0xfd)](_0x4a8f51,_0x4a8f51);const _0x29a027=BattleManager[_0x27c7c2(0x720)],_0x40ff48=_0x4a8f51[_0x27c7c2(0x174)];if(!_0x29a027)return;_0x29a027['_battleCoreAddedElements']=_0x40ff48;}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Element_Clear',_0x128daa=>{const _0x1b194e=_0x2e20ee;if(!SceneManager[_0x1b194e(0x14c)]())return;if(!Imported[_0x1b194e(0x3c9)])return;const _0x3685c5=BattleManager['_action'];if(!_0x3685c5)return;_0x3685c5[_0x1b194e(0xe5)]();}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x1a3),_0x203ff4=>{const _0x499b0d=_0x2e20ee;if(!SceneManager[_0x499b0d(0x14c)]())return;if(!Imported[_0x499b0d(0x3c9)])return;VisuMZ[_0x499b0d(0xfd)](_0x203ff4,_0x203ff4);const _0xfbf1d1=BattleManager[_0x499b0d(0x720)],_0x40b3a0=_0x203ff4[_0x499b0d(0x174)];if(!_0xfbf1d1)return;_0xfbf1d1[_0x499b0d(0x538)]=_0x40b3a0;}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x55a),_0x38c1c7=>{const _0x5b0fc1=_0x2e20ee;if(!SceneManager[_0x5b0fc1(0x14c)]())return;if(!Imported[_0x5b0fc1(0x3c9)])return;const _0x35d435=BattleManager['_action'];if(!_0x35d435)return;_0x35d435[_0x5b0fc1(0x4b3)]=!![];}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Horror_Clear',_0x551d62=>{const _0x39b0ca=_0x2e20ee;if(!Imported[_0x39b0ca(0x79a)])return;if(!SceneManager[_0x39b0ca(0x14c)]())return;VisuMZ['ConvertParams'](_0x551d62,_0x551d62);const _0x23c03f=VisuMZ[_0x39b0ca(0xcd)](_0x551d62[_0x39b0ca(0x59e)]);for(const _0x28556c of _0x23c03f){if(!_0x28556c)continue;_0x28556c[_0x39b0ca(0x377)](_0x39b0ca(0x5ef)),_0x28556c[_0x39b0ca(0x377)](_0x39b0ca(0x363)),_0x28556c[_0x39b0ca(0x377)]('tv'),_0x28556c[_0x39b0ca(0x100)]();}$gamePlayer['refresh']();}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x326),_0x58f319=>{const _0x4f76a5=_0x2e20ee;if(!Imported['VisuMZ_2_HorrorEffects'])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4f76a5(0xfd)](_0x58f319,_0x58f319);const _0x2a0c08=VisuMZ['CreateActionSequenceTargets'](_0x58f319[_0x4f76a5(0x59e)]),_0x375a33=_0x4f76a5(0x363);_0x58f319[_0x4f76a5(0x3df)]=Math['ceil'](_0x58f319[_0x4f76a5(0x1be)]/0x2),_0x58f319[_0x4f76a5(0xe7)]=_0x58f319[_0x4f76a5(0x1be)],_0x58f319[_0x4f76a5(0x5e8)]=!![];for(const _0x1369d8 of _0x2a0c08){if(!_0x1369d8)continue;_0x1369d8['setHorrorEffectSettings'](_0x375a33,_0x58f319);}$gamePlayer[_0x4f76a5(0x71f)]();}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Horror_GlitchRemove',_0x5bb3f0=>{const _0x3b0869=_0x2e20ee;if(!Imported[_0x3b0869(0x79a)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x3b0869(0xfd)](_0x5bb3f0,_0x5bb3f0);const _0x1fd2ff=VisuMZ[_0x3b0869(0xcd)](_0x5bb3f0[_0x3b0869(0x59e)]);for(const _0xfeaf2f of _0x1fd2ff){if(!_0xfeaf2f)continue;_0xfeaf2f['removeHorrorEffect'](_0x3b0869(0x363));}$gamePlayer[_0x3b0869(0x71f)]();}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x6ed),_0x4142ef=>{const _0x5c31f8=_0x2e20ee;if(!Imported[_0x5c31f8(0x79a)])return;if(!SceneManager[_0x5c31f8(0x14c)]())return;VisuMZ[_0x5c31f8(0xfd)](_0x4142ef,_0x4142ef);const _0x1bedc=VisuMZ[_0x5c31f8(0xcd)](_0x4142ef['Targets']),_0x5e87d7='noise';for(const _0x513c92 of _0x1bedc){if(!_0x513c92)continue;_0x513c92['setHorrorEffectSettings'](_0x5e87d7,_0x4142ef);}$gamePlayer['refresh']();}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x27d),_0x19c417=>{const _0x5edb6f=_0x2e20ee;if(!Imported[_0x5edb6f(0x79a)])return;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x5edb6f(0xfd)](_0x19c417,_0x19c417);const _0x2ad482=VisuMZ[_0x5edb6f(0xcd)](_0x19c417[_0x5edb6f(0x59e)]);for(const _0x26e02e of _0x2ad482){if(!_0x26e02e)continue;_0x26e02e[_0x5edb6f(0x377)](_0x5edb6f(0x5ef));}$gamePlayer[_0x5edb6f(0x71f)]();}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Horror_TVCreate',_0xcc1ed0=>{const _0x295d91=_0x2e20ee;if(!Imported[_0x295d91(0x79a)])return;if(!SceneManager[_0x295d91(0x14c)]())return;VisuMZ[_0x295d91(0xfd)](_0xcc1ed0,_0xcc1ed0);const _0x32329d=VisuMZ[_0x295d91(0xcd)](_0xcc1ed0[_0x295d91(0x59e)]),_0xf1094a='tv';for(const _0xf301cb of _0x32329d){if(!_0xf301cb)continue;_0xf301cb['setHorrorEffectSettings'](_0xf1094a,_0xcc1ed0);}$gamePlayer[_0x295d91(0x71f)]();}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Horror_TVRemove',_0x1dccec=>{const _0x43620d=_0x2e20ee;if(!Imported[_0x43620d(0x79a)])return;if(!SceneManager[_0x43620d(0x14c)]())return;VisuMZ[_0x43620d(0xfd)](_0x1dccec,_0x1dccec);const _0x158e4f=VisuMZ[_0x43620d(0xcd)](_0x1dccec[_0x43620d(0x59e)]);for(const _0x46b76b of _0x158e4f){if(!_0x46b76b)continue;_0x46b76b[_0x43620d(0x377)]('tv');}$gamePlayer['refresh']();}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x62c),_0x4a21c4=>{const _0x1f4bd5=_0x2e20ee;if(!SceneManager[_0x1f4bd5(0x14c)]())return;if(!Imported[_0x1f4bd5(0x493)])return;const _0x11eee4=SceneManager[_0x1f4bd5(0x4e6)][_0x1f4bd5(0x2af)];if(!_0x11eee4)return;VisuMZ[_0x1f4bd5(0xfd)](_0x4a21c4,_0x4a21c4);const _0x237f41=_0x4a21c4[_0x1f4bd5(0x3bf)]||0x1,_0x1f5c97=_0x4a21c4['Duration']||0x1,_0x6ffcf3=_0x4a21c4['EasingType']||_0x1f4bd5(0x68f);_0x11eee4[_0x1f4bd5(0x5cc)](_0x237f41,_0x1f5c97,_0x6ffcf3);}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x355),_0x4df9c0=>{const _0x538136=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x538136(0x493)])return;const _0x4540fe=SceneManager[_0x538136(0x4e6)][_0x538136(0x2af)];if(!_0x4540fe)return;VisuMZ['ConvertParams'](_0x4df9c0,_0x4df9c0);const _0x5caa48=Number(_0x4df9c0[_0x538136(0x4f6)])||0x0,_0x29637d=Number(_0x4df9c0['Rate']),_0x411c7f=_0x4df9c0['Duration']||0x1,_0x5828f4=_0x4df9c0['EasingType']||'Linear';_0x4540fe['setupMotionBlurImpactFilter'](_0x5caa48,_0x29637d,_0x411c7f,_0x5828f4);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x45f),_0x8d1950=>{const _0x57f841=_0x2e20ee;if(!SceneManager[_0x57f841(0x14c)]())return;if(!Imported[_0x57f841(0x493)])return;const _0x5dd5a4=SceneManager[_0x57f841(0x4e6)][_0x57f841(0x2af)];if(!_0x5dd5a4)return;VisuMZ[_0x57f841(0xfd)](_0x8d1950,_0x8d1950);const _0x4e720f=Number(_0x8d1950[_0x57f841(0x4f6)])||0x0,_0x2e2654=Number(_0x8d1950['Rate']),_0x55d741=_0x8d1950[_0x57f841(0x29e)]||0x1,_0x56d7d5=_0x8d1950[_0x57f841(0x816)]||_0x57f841(0x68f),_0x592f6d=VisuMZ[_0x57f841(0xcd)](_0x8d1950[_0x57f841(0x59e)]);for(const _0x1c2e2a of _0x592f6d){if(!_0x1c2e2a)continue;if(!_0x1c2e2a['battler']())continue;_0x1c2e2a['battler']()[_0x57f841(0x229)](_0x4e720f,_0x2e2654,_0x55d741,_0x56d7d5);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Impact_MotionTrailCreate',_0x292bd0=>{const _0x45086a=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x45086a(0x493)])return;VisuMZ[_0x45086a(0xfd)](_0x292bd0,_0x292bd0);const _0x451879={'delay':_0x292bd0[_0x45086a(0x622)],'duration':_0x292bd0[_0x45086a(0x10a)],'hue':_0x292bd0['hue'],'opacityStart':_0x292bd0[_0x45086a(0x7e8)],'tone':_0x292bd0['tone'],'visible':!![]},_0x4616a3=VisuMZ[_0x45086a(0xcd)](_0x292bd0['Targets']);for(const _0x37f60f of _0x4616a3){if(!_0x37f60f)continue;_0x37f60f[_0x45086a(0x38b)](_0x451879);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x103),_0x5e6c7a=>{const _0x38ef22=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x38ef22(0x493)])return;VisuMZ['ConvertParams'](_0x5e6c7a,_0x5e6c7a);const _0xf40280=VisuMZ[_0x38ef22(0xcd)](_0x5e6c7a['Targets']);for(const _0x25a5f6 of _0xf40280){if(!_0x25a5f6)continue;_0x25a5f6[_0x38ef22(0x23f)]();}}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Impact_ShockwavePoint',_0x3adbca=>{const _0x730417=_0x2e20ee;if(!Imported[_0x730417(0x493)])return;const _0x5c01b6=SceneManager['_scene'][_0x730417(0x2af)];if(!_0x5c01b6)return;VisuMZ[_0x730417(0xfd)](_0x3adbca,_0x3adbca);const _0x33c168=_0x3adbca['X']||0x0,_0x1d0faa=_0x3adbca['Y']||0x0,_0x3bb46e=_0x3adbca[_0x730417(0x59c)]||0x0,_0x4d5d22=_0x3adbca[_0x730417(0x18c)]||0x0,_0x7adc24=_0x3adbca[_0x730417(0x29e)]||0x1;_0x5c01b6[_0x730417(0x29d)](_0x33c168,_0x1d0faa,_0x3bb46e,_0x4d5d22,_0x7adc24);}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Impact_ShockwaveEachTargets',_0x36acae=>{const _0x51b8d9=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x51b8d9(0x493)])return;const _0x5ed952=SceneManager[_0x51b8d9(0x4e6)][_0x51b8d9(0x2af)];if(!_0x5ed952)return;VisuMZ[_0x51b8d9(0xfd)](_0x36acae,_0x36acae);const _0xbf6a2f=VisuMZ[_0x51b8d9(0xcd)](_0x36acae[_0x51b8d9(0x59e)]),_0x58da42=_0x36acae[_0x51b8d9(0x7e5)],_0xf04244=_0x36acae[_0x51b8d9(0x5ad)]||0x0,_0x59e397=_0x36acae[_0x51b8d9(0x451)]||0x0,_0x401541=_0x36acae[_0x51b8d9(0x59c)]||0x0,_0xfefa82=_0x36acae[_0x51b8d9(0x18c)]||0x0,_0x385694=_0x36acae[_0x51b8d9(0x29e)]||0x1;for(const _0x4c2e96 of _0xbf6a2f){if(!_0x4c2e96)continue;if(!_0x4c2e96[_0x51b8d9(0x7ec)]())continue;const _0x553e1f=_0x4c2e96[_0x51b8d9(0x7ec)]();let _0x256650=_0x553e1f['_baseX'],_0x26f600=_0x553e1f['_baseY'];_0x256650+=(Graphics[_0x51b8d9(0x71d)]-Graphics[_0x51b8d9(0x1ba)])/0x2,_0x26f600+=(Graphics[_0x51b8d9(0x6cf)]-Graphics[_0x51b8d9(0x7b3)])/0x2;if(_0x58da42[_0x51b8d9(0x26f)](/front/i))_0x256650+=(_0x4c2e96[_0x51b8d9(0x5c8)]()?0x1:-0x1)*_0x553e1f[_0x51b8d9(0x802)]()/0x2;else _0x58da42[_0x51b8d9(0x26f)](/back/i)&&(_0x256650+=(_0x4c2e96[_0x51b8d9(0x5c8)]()?-0x1:0x1)*_0x553e1f['mainSpriteWidth']()/0x2);if(_0x58da42['match'](/head/i))_0x26f600-=_0x553e1f[_0x51b8d9(0xf7)]();else _0x58da42['match'](/center/i)&&(_0x26f600-=_0x553e1f[_0x51b8d9(0xf7)]()/0x2);_0x256650+=_0xf04244,_0x26f600+=_0x59e397,_0x5ed952[_0x51b8d9(0x29d)](_0x256650,_0x26f600,_0x401541,_0xfefa82,_0x385694);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x45c),_0x2ecd81=>{const _0x29bd89=_0x2e20ee;if(!SceneManager[_0x29bd89(0x14c)]())return;if(!Imported[_0x29bd89(0x493)])return;const _0x107df1=SceneManager['_scene'][_0x29bd89(0x2af)];if(!_0x107df1)return;VisuMZ[_0x29bd89(0xfd)](_0x2ecd81,_0x2ecd81);const _0x4146a7=VisuMZ[_0x29bd89(0xcd)](_0x2ecd81['Targets']),_0x13ae32=_0x2ecd81[_0x29bd89(0x7e5)],_0x11a716=_0x2ecd81[_0x29bd89(0x5ad)]||0x0,_0x2f968d=_0x2ecd81[_0x29bd89(0x451)]||0x0,_0x46eb37=_0x2ecd81[_0x29bd89(0x59c)]||0x0,_0x3cadd6=_0x2ecd81[_0x29bd89(0x18c)]||0x0,_0x54fff4=_0x2ecd81['Duration']||0x1,_0x2a0bb4=Math['min'](..._0x4146a7['map'](_0x286ee4=>_0x286ee4['battler']()[_0x29bd89(0x1f7)]-_0x286ee4[_0x29bd89(0x7ec)]()['mainSpriteWidth']()/0x2)),_0x2051e9=Math[_0x29bd89(0x376)](..._0x4146a7['map'](_0x3bead1=>_0x3bead1[_0x29bd89(0x7ec)]()[_0x29bd89(0x1f7)]+_0x3bead1[_0x29bd89(0x7ec)]()[_0x29bd89(0x802)]()/0x2)),_0x3c6384=Math[_0x29bd89(0x567)](..._0x4146a7['map'](_0x42895f=>_0x42895f[_0x29bd89(0x7ec)]()[_0x29bd89(0x4af)]-_0x42895f[_0x29bd89(0x7ec)]()['mainSpriteHeight']())),_0x1106b5=Math[_0x29bd89(0x376)](..._0x4146a7['map'](_0x16eb7f=>_0x16eb7f[_0x29bd89(0x7ec)]()['_baseY'])),_0x4cb096=_0x4146a7[_0x29bd89(0x48e)](_0x466ec8=>_0x466ec8[_0x29bd89(0x13d)]())[_0x29bd89(0x5c2)],_0x3f6e86=_0x4146a7['filter'](_0x4cad63=>_0x4cad63[_0x29bd89(0x5c8)]())[_0x29bd89(0x5c2)];let _0xadd1e5=0x0,_0x46064a=0x0;if(_0x13ae32[_0x29bd89(0x26f)](/front/i))_0xadd1e5=_0x4cb096>=_0x3f6e86?_0x2a0bb4:_0x2051e9;else{if(_0x13ae32['match'](/middle/i))_0xadd1e5=(_0x2a0bb4+_0x2051e9)/0x2,melee=-0x1;else _0x13ae32[_0x29bd89(0x26f)](/back/i)&&(_0xadd1e5=_0x4cb096>=_0x3f6e86?_0x2051e9:_0x2a0bb4);}if(_0x13ae32[_0x29bd89(0x26f)](/head/i))_0x46064a=_0x3c6384;else{if(_0x13ae32[_0x29bd89(0x26f)](/center/i))_0x46064a=(_0x3c6384+_0x1106b5)/0x2;else _0x13ae32['match'](/base/i)&&(_0x46064a=_0x1106b5);}_0xadd1e5+=(Graphics[_0x29bd89(0x71d)]-Graphics['boxWidth'])/0x2,_0x46064a+=(Graphics[_0x29bd89(0x6cf)]-Graphics['boxHeight'])/0x2,_0xadd1e5+=_0x11a716,_0x46064a+=_0x2f968d,_0x107df1[_0x29bd89(0x29d)](_0xadd1e5,_0x46064a,_0x46eb37,_0x3cadd6,_0x54fff4);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Impact_ZoomBlurPoint',_0x1cd8ab=>{const _0x59b7b8=_0x2e20ee;if(!Imported[_0x59b7b8(0x493)])return;const _0x318387=SceneManager[_0x59b7b8(0x4e6)][_0x59b7b8(0x2af)];if(!_0x318387)return;VisuMZ[_0x59b7b8(0xfd)](_0x1cd8ab,_0x1cd8ab);const _0x4ba3e7=_0x1cd8ab['X']||0x0,_0x111eb1=_0x1cd8ab['Y']||0x0,_0x3c129a=_0x1cd8ab[_0x59b7b8(0x754)]||0x0,_0x2d4478=_0x1cd8ab[_0x59b7b8(0x32c)]||0x0,_0xfdb8e3=_0x1cd8ab['Duration']||0x1,_0x4dc77f=_0x1cd8ab['EasingType']||_0x59b7b8(0x68f);_0x318387[_0x59b7b8(0x433)](_0x3c129a,_0x4ba3e7,_0x111eb1,_0x2d4478,_0xfdb8e3,_0x4dc77f);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x826),_0x3b5589=>{const _0x28c458=_0x2e20ee;if(!Imported['VisuMZ_3_ActSeqImpact'])return;const _0xe27b03=SceneManager['_scene'][_0x28c458(0x2af)];if(!_0xe27b03)return;VisuMZ[_0x28c458(0xfd)](_0x3b5589,_0x3b5589);const _0x4a6767=VisuMZ[_0x28c458(0xcd)](_0x3b5589[_0x28c458(0x59e)]),_0x172f93=_0x3b5589[_0x28c458(0x7e5)],_0x3fa4de=_0x3b5589[_0x28c458(0x5ad)]||0x0,_0x125888=_0x3b5589[_0x28c458(0x451)]||0x0,_0x129fee=_0x3b5589[_0x28c458(0x754)]||0x0,_0x4046d9=_0x3b5589[_0x28c458(0x32c)]||0x0,_0x155bf5=_0x3b5589[_0x28c458(0x29e)]||0x1,_0x56555b=_0x3b5589['EasingType']||_0x28c458(0x68f),_0x48f089=Math[_0x28c458(0x567)](..._0x4a6767[_0x28c458(0x4f1)](_0x2ee996=>_0x2ee996['battler']()[_0x28c458(0x1f7)]-_0x2ee996[_0x28c458(0x7ec)]()['mainSpriteWidth']()/0x2)),_0xa40826=Math[_0x28c458(0x376)](..._0x4a6767['map'](_0xf70899=>_0xf70899[_0x28c458(0x7ec)]()['_baseX']+_0xf70899[_0x28c458(0x7ec)]()[_0x28c458(0x802)]()/0x2)),_0x4bbb91=Math[_0x28c458(0x567)](..._0x4a6767[_0x28c458(0x4f1)](_0x3d7a60=>_0x3d7a60['battler']()[_0x28c458(0x4af)]-_0x3d7a60[_0x28c458(0x7ec)]()[_0x28c458(0xf7)]())),_0x29ffba=Math[_0x28c458(0x376)](..._0x4a6767[_0x28c458(0x4f1)](_0x3c7dd5=>_0x3c7dd5[_0x28c458(0x7ec)]()['_baseY'])),_0x2de80a=_0x4a6767[_0x28c458(0x48e)](_0x2dcd6d=>_0x2dcd6d[_0x28c458(0x13d)]())[_0x28c458(0x5c2)],_0xf6eb97=_0x4a6767[_0x28c458(0x48e)](_0x2dc24f=>_0x2dc24f[_0x28c458(0x5c8)]())['length'];let _0x914d0a=0x0,_0x4ebf18=0x0;if(_0x172f93[_0x28c458(0x26f)](/front/i))_0x914d0a=_0x2de80a>=_0xf6eb97?_0x48f089:_0xa40826;else{if(_0x172f93[_0x28c458(0x26f)](/middle/i))_0x914d0a=(_0x48f089+_0xa40826)/0x2,melee=-0x1;else _0x172f93[_0x28c458(0x26f)](/back/i)&&(_0x914d0a=_0x2de80a>=_0xf6eb97?_0xa40826:_0x48f089);}if(_0x172f93['match'](/head/i))_0x4ebf18=_0x4bbb91;else{if(_0x172f93[_0x28c458(0x26f)](/center/i))_0x4ebf18=(_0x4bbb91+_0x29ffba)/0x2;else _0x172f93[_0x28c458(0x26f)](/base/i)&&(_0x4ebf18=_0x29ffba);}_0x914d0a+=(Graphics[_0x28c458(0x71d)]-Graphics[_0x28c458(0x1ba)])/0x2,_0x4ebf18+=(Graphics[_0x28c458(0x6cf)]-Graphics[_0x28c458(0x7b3)])/0x2,_0x914d0a+=_0x3fa4de,_0x4ebf18+=_0x125888,_0xe27b03[_0x28c458(0x433)](_0x129fee,_0x914d0a,_0x4ebf18,_0x4046d9,_0x155bf5,_0x56555b);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3cc),_0x47c808=>{const _0x329099=_0x2e20ee;if(!SceneManager[_0x329099(0x14c)]())return;VisuMZ[_0x329099(0xfd)](_0x47c808,_0x47c808);const _0x316c72=$gameTemp[_0x329099(0x587)](),_0x1379f2=BattleManager[_0x329099(0x720)],_0x39a56a=BattleManager['_subject'],_0x1077fe=BattleManager[_0x329099(0x683)];if(!_0x316c72||!_0x1379f2||!_0x39a56a)return;if(!_0x1379f2[_0x329099(0x57b)]())return;const _0x380b14=VisuMZ['CreateActionSequenceTargets'](_0x47c808['Targets']);for(const _0x5a55e9 of _0x380b14){if(!_0x5a55e9)continue;_0x1077fe[_0x329099(0x4d5)]('actionEffect',_0x39a56a,_0x5a55e9);}_0x316c72[_0x329099(0x211)](_0x329099(0x264));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3f1),_0x4d9862=>{const _0x5a8700=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x4d9862,_0x4d9862);const _0x2efb22=[_0x5a8700(0x502),_0x5a8700(0x199),_0x5a8700(0x3d4),'DEF',_0x5a8700(0x3c6),_0x5a8700(0x757),_0x5a8700(0x817),'LUK'],_0x90e8dd=_0x4d9862[_0x5a8700(0x7f8)],_0x51d804=_0x4d9862[_0x5a8700(0x4a6)],_0x266b3b=_0x4d9862[_0x5a8700(0x53d)],_0xa95a45=VisuMZ[_0x5a8700(0xcd)](_0x4d9862['Targets']);for(const _0x2da95c of _0xa95a45){if(!_0x2da95c)continue;for(const _0x3c24f6 of _0x90e8dd){const _0x46c087=_0x2efb22[_0x5a8700(0x22d)](_0x3c24f6[_0x5a8700(0x6f8)]()[_0x5a8700(0x762)]());_0x46c087>=0x0&&_0x46c087<=0x7&&_0x2da95c[_0x5a8700(0x323)](_0x46c087,_0x266b3b);}for(const _0x5db480 of _0x51d804){const _0x567ed0=_0x2efb22[_0x5a8700(0x22d)](_0x5db480[_0x5a8700(0x6f8)]()[_0x5a8700(0x762)]());_0x567ed0>=0x0&&_0x567ed0<=0x7&&_0x2da95c[_0x5a8700(0x16a)](_0x567ed0,_0x266b3b);}}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x393),_0x1b8eaa=>{const _0x37237b=_0x2e20ee;if(!SceneManager[_0x37237b(0x14c)]())return;VisuMZ['ConvertParams'](_0x1b8eaa,_0x1b8eaa);const _0x53cc6f=_0x1b8eaa['States'],_0x49942f=VisuMZ[_0x37237b(0xcd)](_0x1b8eaa['Targets']);for(const _0x49ff84 of _0x49942f){if(!_0x49ff84)continue;for(const _0x44f5be of _0x53cc6f){_0x49ff84[_0x37237b(0x19c)](_0x44f5be);}}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x48d),_0xcc5a9b=>{const _0x45b153=_0x2e20ee;if(!SceneManager[_0x45b153(0x14c)]())return;VisuMZ[_0x45b153(0xfd)](_0xcc5a9b,_0xcc5a9b);const _0x55b4ff=BattleManager[_0x45b153(0x720)],_0x3a9bb0={'arPenRate':_0xcc5a9b['ArPenRate'],'arPenFlat':_0xcc5a9b[_0x45b153(0x827)],'arRedRate':_0xcc5a9b[_0x45b153(0x45a)],'arRedFlat':_0xcc5a9b['ArRedFlat']};_0x55b4ff[_0x45b153(0x525)]=_0x3a9bb0;}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x823),_0x29c38f=>{const _0x57c7ea=_0x2e20ee;if(!SceneManager[_0x57c7ea(0x14c)]())return;if(!Imported[_0x57c7ea(0x54a)])return;VisuMZ['ConvertParams'](_0x29c38f,_0x29c38f);const _0x511d93=VisuMZ['CreateActionSequenceTargets'](_0x29c38f['Targets']),_0x4078ae=_0x29c38f['ChargeRate'],_0x184696=_0x29c38f[_0x57c7ea(0x1ea)],_0xa18aaa=_0x29c38f[_0x57c7ea(0xf5)];for(const _0x2bb8f0 of _0x511d93){if(!_0x2bb8f0)continue;if(_0x2bb8f0[_0x57c7ea(0x3f9)]())_0x2bb8f0['changeAtbChargeTime'](_0x4078ae);else{if(_0x2bb8f0[_0x57c7ea(0x7c3)]()){_0x2bb8f0[_0x57c7ea(0xca)](_0x184696);if(_0xa18aaa)_0x2bb8f0[_0x57c7ea(0x76a)]();}}}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x335),_0x5d8b4c=>{const _0x47e615=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x47e615(0x423)])return;VisuMZ[_0x47e615(0xfd)](_0x5d8b4c,_0x5d8b4c);const _0x241b04=VisuMZ['CreateActionSequenceTargets'](_0x5d8b4c[_0x47e615(0x59e)]),_0x9d854b=_0x5d8b4c[_0x47e615(0x63b)];for(const _0x3e18bb of _0x241b04){if(!_0x3e18bb)continue;_0x3e18bb['gainBravePoints'](_0x9d854b);}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0xf3),_0x49d517=>{const _0x3ebf5b=_0x2e20ee;if(!SceneManager[_0x3ebf5b(0x14c)]())return;VisuMZ[_0x3ebf5b(0xfd)](_0x49d517,_0x49d517);const _0x6b765d=$gameTemp[_0x3ebf5b(0x587)](),_0x5c9b4c=BattleManager['_action'],_0x2e170e=BattleManager[_0x3ebf5b(0x3ca)];if(!_0x6b765d||!_0x5c9b4c||!_0x2e170e)return;if(!_0x5c9b4c[_0x3ebf5b(0x57b)]())return;const _0x15899f=VisuMZ[_0x3ebf5b(0xcd)](_0x49d517[_0x3ebf5b(0x59e)]);for(const _0x23180b of _0x15899f){if(!_0x23180b)continue;_0x49d517['ForceDeath']&&(_0x23180b[_0x3ebf5b(0x521)](),_0x23180b[_0x3ebf5b(0x19c)](_0x23180b['deathStateId']())),_0x23180b[_0x3ebf5b(0x43e)]()&&_0x23180b[_0x3ebf5b(0x6cb)]();}_0x6b765d[_0x3ebf5b(0x211)]('battleEffect');}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_CtbOrder',_0x230086=>{const _0x256425=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x256425(0x4c0)])return;VisuMZ[_0x256425(0xfd)](_0x230086,_0x230086);const _0x4a29d9=VisuMZ[_0x256425(0xcd)](_0x230086[_0x256425(0x59e)]),_0x5ceb26=_0x230086['ChangeOrderBy'];for(const _0xc09551 of _0x4a29d9){if(!_0xc09551)continue;_0xc09551[_0x256425(0x7af)](_0x5ceb26);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x16f),_0x2eb7ff=>{const _0x1b982f=_0x2e20ee;if(!SceneManager[_0x1b982f(0x14c)]())return;if(!Imported[_0x1b982f(0x4c0)])return;VisuMZ['ConvertParams'](_0x2eb7ff,_0x2eb7ff);const _0x82d581=VisuMZ['CreateActionSequenceTargets'](_0x2eb7ff[_0x1b982f(0x59e)]),_0x36d79f=_0x2eb7ff[_0x1b982f(0x1ea)],_0x6e8161=_0x2eb7ff[_0x1b982f(0x1ea)];for(const _0x1dd088 of _0x82d581){if(!_0x1dd088)continue;if(_0x1dd088[_0x1b982f(0x723)]===_0x1b982f(0x55b))_0x1dd088['changeCtbChargeTime'](_0x36d79f);else _0x1dd088[_0x1b982f(0x723)]===_0x1b982f(0x1ec)&&_0x1dd088['changeCtbCastTime'](_0x6e8161);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x396),_0x3186a2=>{const _0x3f78d9=_0x2e20ee;if(!SceneManager[_0x3f78d9(0x14c)]())return;VisuMZ[_0x3f78d9(0xfd)](_0x3186a2,_0x3186a2);const _0x1e1d09=BattleManager[_0x3f78d9(0x720)];if(!_0x1e1d09)return;let _0xbb8e6a=_0x3186a2['Formula'];_0x1e1d09[_0x3f78d9(0x3a2)](_0xbb8e6a);}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x64c),_0x5213e1=>{const _0x4a57ad=_0x2e20ee;if(!SceneManager[_0x4a57ad(0x14c)]())return;VisuMZ[_0x4a57ad(0xfd)](_0x5213e1,_0x5213e1);const _0x4dcc68=VisuMZ['CreateActionSequenceTargets'](_0x5213e1[_0x4a57ad(0x59e)]);for(const _0x22234d of _0x4dcc68){if(!_0x22234d)continue;if(_0x22234d[_0x4a57ad(0x639)]())_0x22234d[_0x4a57ad(0x24b)]();}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x597),_0x39b689=>{const _0x327f61=_0x2e20ee;if(!SceneManager[_0x327f61(0x14c)]())return;VisuMZ[_0x327f61(0xfd)](_0x39b689,_0x39b689);const _0x372efc=$gameTemp[_0x327f61(0x587)](),_0x251b8c=BattleManager[_0x327f61(0x3ca)],_0x35003a=_0x39b689[_0x327f61(0xed)];if(!_0x372efc)return;if(!_0x251b8c)return;_0x251b8c&&_0x251b8c[_0x327f61(0x1cf)]()&&_0x35003a['toUpperCase']()[_0x327f61(0x762)]()!==_0x327f61(0x699)&&_0x372efc['command119']([_0x35003a]);}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x19b),_0x547a50=>{const _0x700e8b=_0x2e20ee;if(!SceneManager[_0x700e8b(0x14c)]())return;if(!Imported['VisuMZ_2_BattleSystemFTB'])return;VisuMZ['ConvertParams'](_0x547a50,_0x547a50);const _0x58afb4=_0x547a50[_0x700e8b(0x3f8)];BattleManager[_0x700e8b(0x3ca)]&&BattleManager[_0x700e8b(0x3ca)][_0x700e8b(0x766)]()[_0x700e8b(0x4a9)](_0x58afb4);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x566),_0x3a248b=>{const _0x44aad7=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x44aad7(0xfd)](_0x3a248b,_0x3a248b);const _0x39038d=VisuMZ[_0x44aad7(0xcd)](_0x3a248b[_0x44aad7(0x59e)]),_0x5db9cd=_0x3a248b[_0x44aad7(0x38d)],_0x2c8d57=_0x3a248b[_0x44aad7(0x40c)],_0x2e38f4=_0x3a248b['MP_Rate'],_0x24bf0a=_0x3a248b[_0x44aad7(0x7f4)],_0x374f36=_0x3a248b['TP_Rate'],_0xa2255b=_0x3a248b['TP_Flat'],_0x311804=_0x3a248b[_0x44aad7(0x6a8)];for(const _0x1ad307 of _0x39038d){if(!_0x1ad307)continue;const _0x859bfd=_0x1ad307[_0x44aad7(0x471)](),_0x55cff2=Math['round'](_0x5db9cd*_0x1ad307['mhp']+_0x2c8d57),_0x1c2001=Math['round'](_0x2e38f4*_0x1ad307[_0x44aad7(0xc9)]+_0x24bf0a),_0x21a305=Math['round'](_0x374f36*_0x1ad307['maxTp']()+_0xa2255b);if(_0x55cff2!==0x0)_0x1ad307[_0x44aad7(0x35b)](_0x55cff2);if(_0x1c2001!==0x0)_0x1ad307['gainMp'](_0x1c2001);if(_0x21a305!==0x0)_0x1ad307[_0x44aad7(0x7b6)](_0x21a305);if(_0x311804)_0x1ad307[_0x44aad7(0x24b)]();_0x859bfd&&_0x1ad307['isDead']()&&_0x1ad307[_0x44aad7(0x6cb)]();}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0xd0),_0x2c5546=>{const _0x4ca878=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4ca878(0xfd)](_0x2c5546,_0x2c5546);const _0x4b2a02=VisuMZ[_0x4ca878(0xcd)](_0x2c5546[_0x4ca878(0x59e)]);for(const _0x2ec110 of _0x4b2a02){if(!_0x2ec110)continue;_0x2ec110[_0x4ca878(0x53b)](_0x2c5546[_0x4ca878(0x722)]);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x6d9),_0x3bfb39=>{const _0x23743d=_0x2e20ee;if(!SceneManager[_0x23743d(0x14c)]())return;VisuMZ['ConvertParams'](_0x3bfb39,_0x3bfb39);const _0x41b77e=BattleManager[_0x23743d(0x720)],_0x37a14f={'criticalHitRate':_0x3bfb39['CriticalHitRate'],'criticalHitFlat':_0x3bfb39[_0x23743d(0x372)],'criticalDmgRate':_0x3bfb39[_0x23743d(0xc0)],'criticalDmgFlat':_0x3bfb39[_0x23743d(0x15b)],'damageRate':_0x3bfb39['DamageRate'],'damageFlat':_0x3bfb39[_0x23743d(0x10c)],'hitRate':_0x3bfb39['HitRate'],'hitFlat':_0x3bfb39['HitFlat']};_0x41b77e[_0x23743d(0x7c9)]=_0x37a14f;}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x59a),_0x1b950d=>{const _0x3fb618=_0x2e20ee;if(!SceneManager[_0x3fb618(0x14c)]())return;VisuMZ[_0x3fb618(0xfd)](_0x1b950d,_0x1b950d);const _0x336961=[_0x3fb618(0x502),_0x3fb618(0x199),_0x3fb618(0x3d4),_0x3fb618(0x467),_0x3fb618(0x3c6),_0x3fb618(0x757),_0x3fb618(0x817),'LUK'],_0x383e63=_0x1b950d[_0x3fb618(0x7f8)],_0x2e83b3=_0x1b950d[_0x3fb618(0x4a6)],_0x4841d3=VisuMZ[_0x3fb618(0xcd)](_0x1b950d[_0x3fb618(0x59e)]);for(const _0x510674 of _0x4841d3){if(!_0x510674)continue;for(const _0x2bf9b1 of _0x383e63){const _0xecb32d=_0x336961[_0x3fb618(0x22d)](_0x2bf9b1[_0x3fb618(0x6f8)]()['trim']());_0xecb32d>=0x0&&_0xecb32d<=0x7&&_0x510674[_0x3fb618(0x1f8)](_0xecb32d)&&_0x510674[_0x3fb618(0x2a6)](_0xecb32d);}for(const _0x1c3177 of _0x2e83b3){const _0x13ec7d=_0x336961[_0x3fb618(0x22d)](_0x1c3177[_0x3fb618(0x6f8)]()['trim']());_0x13ec7d>=0x0&&_0x13ec7d<=0x7&&_0x510674[_0x3fb618(0x44f)](_0x13ec7d)&&_0x510674[_0x3fb618(0x2a6)](_0x13ec7d);}}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Mechanics_RemoveState',_0x3922c2=>{const _0x2d3706=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x2d3706(0xfd)](_0x3922c2,_0x3922c2);const _0x5d1f7d=_0x3922c2[_0x2d3706(0x3ff)],_0x52adc1=VisuMZ[_0x2d3706(0xcd)](_0x3922c2['Targets']);for(const _0x5e64b3 of _0x52adc1){if(!_0x5e64b3)continue;for(const _0x2c7e70 of _0x5d1f7d){_0x5e64b3[_0x2d3706(0x3e3)](_0x2c7e70);}}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Mechanics_StbExploit',_0x25aa77=>{const _0x653876=_0x2e20ee;if(!SceneManager[_0x653876(0x14c)]())return;if(!Imported[_0x653876(0x44e)])return;VisuMZ[_0x653876(0xfd)](_0x25aa77,_0x25aa77);const _0x59ad34=_0x25aa77['Exploited'],_0x22c8bf=VisuMZ[_0x653876(0xcd)](_0x25aa77['Targets']),_0x575d02=_0x25aa77['ForceExploited'],_0x4632b9=_0x25aa77[_0x653876(0x2cf)],_0x8b591d=_0x25aa77[_0x653876(0x4fb)],_0x180f94=BattleManager[_0x653876(0x720)];if(_0x59ad34)for(const _0x20be37 of _0x22c8bf){if(!_0x20be37)continue;if(_0x20be37===user)continue;if(_0x575d02)_0x20be37[_0x653876(0x1e7)](![]);_0x20be37[_0x653876(0x5fb)](BattleManager[_0x653876(0x3ca)],_0x180f94);}if(_0x4632b9&&BattleManager[_0x653876(0x3ca)]){if(_0x8b591d)BattleManager[_0x653876(0x3ca)][_0x653876(0x1e7)](![]);const _0x421439=_0x22c8bf[0x0];BattleManager['performSTBExploiter'](_0x421439,_0x180f94);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x745),_0x5a2e59=>{const _0x5f4842=_0x2e20ee;if(!SceneManager[_0x5f4842(0x14c)]())return;if(!Imported[_0x5f4842(0x44e)])return;VisuMZ['ConvertParams'](_0x5a2e59,_0x5a2e59);const _0x458df8=_0x5a2e59[_0x5f4842(0x245)];BattleManager[_0x5f4842(0x3ca)]&&BattleManager['_subject'][_0x5f4842(0x176)](_0x458df8);}),PluginManager['registerCommand'](pluginData['name'],'ActSeq_Mechanics_StbRemoveExcessActions',_0x40ec0c=>{const _0x28e47f=_0x2e20ee;if(!SceneManager[_0x28e47f(0x14c)]())return;if(!Imported[_0x28e47f(0x44e)])return;VisuMZ['ConvertParams'](_0x40ec0c,_0x40ec0c);let _0x455a37=_0x40ec0c[_0x28e47f(0x245)];if(BattleManager['_subject']){BattleManager[_0x28e47f(0x3ca)][_0x28e47f(0x73f)]=BattleManager[_0x28e47f(0x3ca)][_0x28e47f(0x73f)]||[];while(_0x455a37--){if(BattleManager[_0x28e47f(0x3ca)][_0x28e47f(0x73f)][_0x28e47f(0x5c2)]<=0x0)break;BattleManager['_subject'][_0x28e47f(0x73f)][_0x28e47f(0x2bf)]();}}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x4ac),_0x4a9dbb=>{const _0xbda64e=_0x2e20ee;if(!SceneManager[_0xbda64e(0x14c)]())return;VisuMZ['ConvertParams'](_0x4a9dbb,_0x4a9dbb);const _0x433997=VisuMZ['CreateActionSequenceTargets'](_0x4a9dbb[_0xbda64e(0x59e)]),_0x15a86c=_0x4a9dbb[_0xbda64e(0x60f)],_0x499bc0={'textColor':ColorManager['getColor'](_0x4a9dbb[_0xbda64e(0x2cb)]),'flashColor':_0x4a9dbb[_0xbda64e(0x571)],'flashDuration':_0x4a9dbb[_0xbda64e(0x5c7)]};for(const _0x3d9282 of _0x433997){if(!_0x3d9282)continue;_0x3d9282[_0xbda64e(0x221)](_0x15a86c,_0x499bc0);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Mechanics_VariablePopup',_0x554215=>{const _0xb208d8=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x554215,_0x554215);const _0x559a18=VisuMZ[_0xb208d8(0xcd)](_0x554215['Targets']);let _0x3c60ff=$gameVariables[_0xb208d8(0x189)](_0x554215['Variable']);Imported[_0xb208d8(0x540)]&&_0x554215[_0xb208d8(0x2b2)]&&(_0x3c60ff=VisuMZ[_0xb208d8(0x303)](_0x3c60ff));const _0x2c0bb0=String(_0x3c60ff),_0xa112b4={'textColor':ColorManager[_0xb208d8(0x7a3)](_0x554215['TextColor']),'flashColor':_0x554215[_0xb208d8(0x571)],'flashDuration':_0x554215[_0xb208d8(0x5c7)]};for(const _0x351c2e of _0x559a18){if(!_0x351c2e)continue;_0x351c2e['setupTextPopup'](_0x2c0bb0,_0xa112b4);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x66d),_0x22b346=>{const _0x59d342=_0x2e20ee;if(!SceneManager[_0x59d342(0x14c)]())return;const _0x2bf0fe=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x2bf0fe)return;_0x2bf0fe[_0x59d342(0x211)](_0x59d342(0x5b7));}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x4ff),_0x52dfc2=>{const _0x3e89fa=_0x2e20ee;if(!SceneManager[_0x3e89fa(0x14c)]())return;VisuMZ[_0x3e89fa(0xfd)](_0x52dfc2,_0x52dfc2);const _0x1da0dd=VisuMZ[_0x3e89fa(0xcd)](_0x52dfc2[_0x3e89fa(0x59e)]);for(const _0x518be1 of _0x1da0dd){if(!_0x518be1)continue;_0x518be1[_0x3e89fa(0x404)]();}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x125),_0x258a32=>{const _0x173a37=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x173a37(0xfd)](_0x258a32,_0x258a32);const _0x5e19ca=VisuMZ[_0x173a37(0xcd)](_0x258a32[_0x173a37(0x59e)]),_0x1145e2=_0x258a32['MotionType'][_0x173a37(0x1fe)]()[_0x173a37(0x762)](),_0x112190=_0x258a32[_0x173a37(0x3d6)],_0x19b542=_0x258a32[_0x173a37(0x69c)];for(const _0x2c6836 of _0x5e19ca){if(!_0x2c6836)continue;_0x2c6836['freezeMotion'](_0x1145e2,_0x112190,_0x19b542);}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Motion_MotionType',_0x35e7dc=>{const _0x453343=_0x2e20ee;if(!SceneManager[_0x453343(0x14c)]())return;VisuMZ['ConvertParams'](_0x35e7dc,_0x35e7dc);const _0x1b146a=VisuMZ[_0x453343(0xcd)](_0x35e7dc[_0x453343(0x59e)]),_0x183932=_0x35e7dc[_0x453343(0x510)][_0x453343(0x1fe)]()[_0x453343(0x762)](),_0x4dc788=_0x35e7dc[_0x453343(0x3d6)];for(const _0x4acd4e of _0x1b146a){if(!_0x4acd4e)continue;_0x183932==='attack'?_0x4acd4e[_0x453343(0x6be)]():_0x4acd4e[_0x453343(0x309)](_0x183932);if(!_0x4dc788)_0x4acd4e[_0x453343(0x34c)](0x0);else{if(_0x4dc788&&[_0x453343(0x2b9),_0x453343(0x1cb),'missle'][_0x453343(0x60c)](_0x183932)){}}}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x582),_0x5c8512=>{const _0x2739d8=_0x2e20ee;if(!SceneManager[_0x2739d8(0x14c)]())return;VisuMZ[_0x2739d8(0xfd)](_0x5c8512,_0x5c8512);const _0x1b1ff6=BattleManager[_0x2739d8(0x720)];if(!_0x1b1ff6)return;if(!_0x1b1ff6[_0x2739d8(0x57b)]())return;const _0x3ed468=VisuMZ[_0x2739d8(0xcd)](_0x5c8512[_0x2739d8(0x59e)]);for(const _0x31aeaa of _0x3ed468){if(!_0x31aeaa)continue;_0x31aeaa['performAction'](_0x1b1ff6);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3ba),_0xe9c1ee=>{const _0x5723c5=_0x2e20ee;if(!SceneManager[_0x5723c5(0x14c)]())return;VisuMZ[_0x5723c5(0xfd)](_0xe9c1ee,_0xe9c1ee);const _0x1a44c6=VisuMZ[_0x5723c5(0xcd)](_0xe9c1ee[_0x5723c5(0x59e)]);for(const _0x3f4c5a of _0x1a44c6){if(!_0x3f4c5a)continue;if(!_0x3f4c5a['battler']())continue;_0x3f4c5a[_0x5723c5(0x7ec)]()[_0x5723c5(0x427)]();}}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x77a),_0x424950=>{const _0x17a103=_0x2e20ee;if(!SceneManager[_0x17a103(0x14c)]())return;VisuMZ[_0x17a103(0xfd)](_0x424950,_0x424950);const _0x12c16e=$gameTemp[_0x17a103(0x587)](),_0x137daf=_0x424950[_0x17a103(0x4a1)]*Sprite_Battler[_0x17a103(0x210)];_0x12c16e[_0x17a103(0x6ca)](_0x137daf);}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x662),_0x42ddf0=>{const _0x50b7d6=_0x2e20ee;if(!SceneManager[_0x50b7d6(0x14c)]())return;VisuMZ['ConvertParams'](_0x42ddf0,_0x42ddf0);const _0x50f065=$gameTemp[_0x50b7d6(0x587)](),_0x4a04ac=BattleManager[_0x50b7d6(0x720)];if(!_0x50f065||!_0x4a04ac)return;if(!_0x4a04ac[_0x50b7d6(0x57b)]())return;const _0x49625e=VisuMZ['CreateActionSequenceTargets'](_0x42ddf0[_0x50b7d6(0x59e)]);for(const _0x277f0e of _0x49625e){if(!_0x277f0e)continue;_0x277f0e[_0x50b7d6(0x4f3)](_0x4a04ac);}if(_0x42ddf0[_0x50b7d6(0x7ed)])_0x50f065[_0x50b7d6(0x211)](_0x50b7d6(0x6a0));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x251),_0x18cba2=>{const _0x33c48c=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x33c48c(0xde)]())return;VisuMZ[_0x33c48c(0xfd)](_0x18cba2,_0x18cba2);const _0x31d285=VisuMZ['CreateActionSequenceTargets'](_0x18cba2[_0x33c48c(0x59e)]);let _0xbb4ac9=_0x18cba2[_0x33c48c(0x1fd)][_0x33c48c(0x26f)](/back/i);for(const _0x5b2804 of _0x31d285){if(!_0x5b2804)continue;if(_0x18cba2['Direction']['match'](/rand/i))_0xbb4ac9=Math[_0x33c48c(0x187)](0x2);_0x5b2804[_0x33c48c(0x64e)](!!_0xbb4ac9);}}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x6c2),_0x2038f1=>{const _0x171273=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!$gameSystem[_0x171273(0xde)]())return;VisuMZ['ConvertParams'](_0x2038f1,_0x2038f1);const _0x164657=VisuMZ[_0x171273(0xcd)](_0x2038f1[_0x171273(0x59e)]);let _0x511244=_0x2038f1[_0x171273(0x680)];const _0x4c735f=_0x2038f1[_0x171273(0x7fd)];for(const _0x561967 of _0x164657){if(!_0x561967)continue;let _0x2aeb83=_0x561967['battler']()['_baseX'],_0x2e4ffc=_0x561967[_0x171273(0x7ec)]()[_0x171273(0x4af)];if(_0x511244[_0x171273(0x26f)](/home/i))_0x2aeb83=_0x561967['battler']()[_0x171273(0x3b8)],_0x2e4ffc=_0x561967[_0x171273(0x7ec)]()[_0x171273(0x830)];else{if(_0x511244[_0x171273(0x26f)](/center/i))_0x2aeb83=Graphics[_0x171273(0x1ba)]/0x2,_0x2e4ffc=Graphics[_0x171273(0x7b3)]/0x2;else _0x511244['match'](/point (\d+), (\d+)/i)&&(_0x2aeb83=Number(RegExp['$1']),_0x2e4ffc=Number(RegExp['$2']));}_0x561967[_0x171273(0x254)](Math[_0x171273(0x603)](_0x2aeb83),Math[_0x171273(0x603)](_0x2e4ffc),!!_0x4c735f);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x475),_0x269ef7=>{const _0x127ebf=_0x2e20ee;if(!SceneManager[_0x127ebf(0x14c)]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x127ebf(0xfd)](_0x269ef7,_0x269ef7);const _0x59b75c=VisuMZ[_0x127ebf(0xcd)](_0x269ef7[_0x127ebf(0x7b4)]),_0x1c46fb=VisuMZ['CreateActionSequenceTargets'](_0x269ef7[_0x127ebf(0x611)]),_0x2b295f=_0x1c46fb[_0x127ebf(0x4f1)](_0x47d8ab=>_0x47d8ab&&_0x47d8ab[_0x127ebf(0x7ec)]()?_0x47d8ab[_0x127ebf(0x7ec)]()['_baseX']:0x0)/(_0x1c46fb[_0x127ebf(0x5c2)]||0x1),_0x598b2b=_0x1c46fb['map'](_0x41a23a=>_0x41a23a&&_0x41a23a[_0x127ebf(0x7ec)]()?_0x41a23a[_0x127ebf(0x7ec)]()[_0x127ebf(0x4af)]:0x0)/(_0x1c46fb['length']||0x1),_0x14dae3=_0x269ef7[_0x127ebf(0x7fd)];for(const _0x2a5b87 of _0x59b75c){if(!_0x2a5b87)continue;_0x2a5b87[_0x127ebf(0x254)](Math['round'](_0x2b295f),Math[_0x127ebf(0x603)](_0x598b2b),!!_0x14dae3);}}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x52d),_0x1b1570=>{const _0x41f7dc=_0x2e20ee;if(!SceneManager[_0x41f7dc(0x14c)]())return;VisuMZ[_0x41f7dc(0xfd)](_0x1b1570,_0x1b1570);const _0x1c7a04=$gameTemp['getLastPluginCommandInterpreter'](),_0x3377f6=VisuMZ[_0x41f7dc(0xcd)](_0x1b1570[_0x41f7dc(0x59e)]),_0x2f6317=_0x1b1570['Height'],_0x44a410=_0x1b1570[_0x41f7dc(0x29e)],_0x10f66b=_0x1b1570[_0x41f7dc(0x816)],_0xc5aa85=_0x1b1570[_0x41f7dc(0x488)];if(!_0x1c7a04)return;for(const _0x16e98a of _0x3377f6){if(!_0x16e98a)continue;_0x16e98a['floatBattler'](_0x2f6317,_0x44a410,_0x10f66b);}if(_0xc5aa85)_0x1c7a04[_0x41f7dc(0x211)](_0x41f7dc(0x354));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x822),_0x3f4010=>{const _0x19c179=_0x2e20ee;if(!SceneManager[_0x19c179(0x14c)]())return;VisuMZ[_0x19c179(0xfd)](_0x3f4010,_0x3f4010);const _0x34cb99=$gameTemp[_0x19c179(0x587)]();if(!_0x34cb99)return;const _0x4b0f86=VisuMZ[_0x19c179(0xcd)](_0x3f4010[_0x19c179(0x59e)]);for(const _0x5aa6db of _0x4b0f86){if(!_0x5aa6db)continue;_0x5aa6db[_0x19c179(0x20e)](),_0x5aa6db['performActionEndMembers']();}if(_0x3f4010[_0x19c179(0x7ed)])_0x34cb99[_0x19c179(0x211)]('battleMove');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x273),_0x4ff0a2=>{const _0x4f5443=_0x2e20ee;if(!SceneManager[_0x4f5443(0x14c)]())return;VisuMZ[_0x4f5443(0xfd)](_0x4ff0a2,_0x4ff0a2);const _0x232c75=$gameTemp[_0x4f5443(0x587)](),_0x59cf28=VisuMZ[_0x4f5443(0xcd)](_0x4ff0a2[_0x4f5443(0x59e)]),_0x40e948=_0x4ff0a2[_0x4f5443(0x5b9)],_0x571d53=_0x4ff0a2[_0x4f5443(0x29e)],_0xc70c36=_0x4ff0a2['WaitForJump'];if(!_0x232c75)return;for(const _0x2c74e1 of _0x59cf28){if(!_0x2c74e1)continue;_0x2c74e1[_0x4f5443(0xc5)](_0x40e948,_0x571d53);}if(_0xc70c36)_0x232c75[_0x4f5443(0x211)](_0x4f5443(0x381));}),PluginManager['registerCommand'](pluginData['name'],_0x2e20ee(0x6f0),_0x53c0ac=>{const _0x36df7a=_0x2e20ee;if(!SceneManager[_0x36df7a(0x14c)]())return;if(!$gameSystem[_0x36df7a(0xde)]())return;VisuMZ[_0x36df7a(0xfd)](_0x53c0ac,_0x53c0ac);const _0x26e977=$gameTemp[_0x36df7a(0x587)](),_0x355caa=VisuMZ[_0x36df7a(0xcd)](_0x53c0ac[_0x36df7a(0x59e)]),_0x21414c=_0x53c0ac[_0x36df7a(0x765)],_0x5d2734=_0x53c0ac[_0x36df7a(0x1a1)],_0x263a9a=_0x53c0ac[_0x36df7a(0x2a0)],_0x3faca7=_0x53c0ac[_0x36df7a(0x29e)],_0x4be75a=_0x53c0ac['FaceDirection'],_0x3c0d3f=_0x53c0ac[_0x36df7a(0x816)],_0xea8ef8=_0x53c0ac[_0x36df7a(0x510)],_0xa42da2=_0x53c0ac[_0x36df7a(0x7ed)];if(!_0x26e977)return;for(const _0x30e4f1 of _0x355caa){if(!_0x30e4f1)continue;let _0x21c2f1=_0x5d2734,_0x27dd54=_0x263a9a;if(_0x21414c['match'](/horz/i))_0x21c2f1*=_0x30e4f1[_0x36df7a(0x13d)]()?-0x1:0x1;if(_0x21414c['match'](/vert/i))_0x27dd54*=_0x30e4f1[_0x36df7a(0x13d)]()?-0x1:0x1;_0x30e4f1['moveBattlerDistance'](_0x21c2f1,_0x27dd54,_0x3faca7,_0x4be75a,_0x3c0d3f),_0x30e4f1[_0x36df7a(0x309)](_0xea8ef8);}if(_0xa42da2)_0x26e977[_0x36df7a(0x211)](_0x36df7a(0x6a0));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x832),_0x9e57ea=>{const _0x2f6074=_0x2e20ee;if(!SceneManager[_0x2f6074(0x14c)]())return;if(!$gameSystem[_0x2f6074(0xde)]())return;VisuMZ[_0x2f6074(0xfd)](_0x9e57ea,_0x9e57ea);const _0x3fc490=$gameTemp[_0x2f6074(0x587)](),_0x21b2b0=VisuMZ[_0x2f6074(0xcd)](_0x9e57ea[_0x2f6074(0x59e)]),_0x54f142=_0x9e57ea['Destination'],_0x4d1089=_0x9e57ea[_0x2f6074(0x1ed)],_0x1d09d7=_0x9e57ea[_0x2f6074(0x5ad)],_0x1e1efc=_0x9e57ea[_0x2f6074(0x451)],_0x517f0c=_0x9e57ea[_0x2f6074(0x29e)],_0x3a0f32=_0x9e57ea[_0x2f6074(0x729)],_0x384a5a=_0x9e57ea[_0x2f6074(0x816)],_0x4bc214=_0x9e57ea['MotionType'],_0x4f6351=_0x9e57ea['WaitForMovement'];if(!_0x3fc490)return;for(const _0x4f0cf3 of _0x21b2b0){if(!_0x4f0cf3)continue;let _0x4ce120=_0x4f0cf3['battler']()[_0x2f6074(0x1f7)],_0x5e97fa=_0x4f0cf3['battler']()[_0x2f6074(0x4af)];if(_0x54f142[_0x2f6074(0x26f)](/home/i))_0x4ce120=_0x4f0cf3[_0x2f6074(0x7ec)]()[_0x2f6074(0x3b8)],_0x5e97fa=_0x4f0cf3[_0x2f6074(0x7ec)]()[_0x2f6074(0x830)];else{if(_0x54f142[_0x2f6074(0x26f)](/center/i))_0x4ce120=Graphics['boxWidth']/0x2,_0x5e97fa=Graphics[_0x2f6074(0x7b3)]/0x2;else _0x54f142[_0x2f6074(0x26f)](/point (\d+), (\d+)/i)&&(_0x4ce120=Number(RegExp['$1']),_0x5e97fa=Number(RegExp['$2']));}if(_0x4d1089['match'](/horz/i))_0x4ce120+=_0x4f0cf3[_0x2f6074(0x13d)]()?-_0x1d09d7:_0x1d09d7;if(_0x4d1089[_0x2f6074(0x26f)](/vert/i))_0x5e97fa+=_0x4f0cf3[_0x2f6074(0x13d)]()?-_0x1e1efc:_0x1e1efc;_0x4f0cf3[_0x2f6074(0x4b9)](_0x4ce120,_0x5e97fa,_0x517f0c,_0x3a0f32,_0x384a5a,-0x1),_0x4f0cf3[_0x2f6074(0x309)](_0x4bc214);}if(_0x4f6351)_0x3fc490[_0x2f6074(0x211)]('battleMove');}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Movement_MoveToTarget',_0x5754ea=>{const _0x1d575c=_0x2e20ee;if(!SceneManager[_0x1d575c(0x14c)]())return;if(!$gameSystem[_0x1d575c(0xde)]())return;VisuMZ['ConvertParams'](_0x5754ea,_0x5754ea);const _0x32ec05=$gameTemp['getLastPluginCommandInterpreter'](),_0x371c0d=VisuMZ[_0x1d575c(0xcd)](_0x5754ea['Targets1']),_0x2a8e65=VisuMZ[_0x1d575c(0xcd)](_0x5754ea['Targets2']),_0xfbf800=_0x5754ea[_0x1d575c(0x7e5)];let _0x307aa4=_0x5754ea['MeleeDistance'];const _0xa23597=_0x5754ea[_0x1d575c(0x1ed)],_0x445f68=_0x5754ea[_0x1d575c(0x5ad)],_0x320aa4=_0x5754ea[_0x1d575c(0x451)],_0x633fbc=_0x5754ea['Duration'],_0x4f07f6=_0x5754ea[_0x1d575c(0x729)],_0x527047=_0x5754ea['EasingType'],_0x1e58e6=_0x5754ea[_0x1d575c(0x510)],_0x48463b=_0x5754ea[_0x1d575c(0x7ed)],_0x5be03d=Math[_0x1d575c(0x567)](..._0x2a8e65['map'](_0x4ec5ef=>_0x4ec5ef['battler']()[_0x1d575c(0x1f7)]-_0x4ec5ef['battler']()['mainSpriteWidth']()/0x2)),_0x3860b5=Math[_0x1d575c(0x376)](..._0x2a8e65['map'](_0x29cedf=>_0x29cedf['battler']()[_0x1d575c(0x1f7)]+_0x29cedf[_0x1d575c(0x7ec)]()[_0x1d575c(0x802)]()/0x2)),_0x3482fd=Math['min'](..._0x2a8e65['map'](_0x3ee72a=>_0x3ee72a[_0x1d575c(0x7ec)]()[_0x1d575c(0x4af)]-_0x3ee72a['battler']()[_0x1d575c(0xf7)]())),_0xa2a25e=Math[_0x1d575c(0x376)](..._0x2a8e65[_0x1d575c(0x4f1)](_0x2b8313=>_0x2b8313[_0x1d575c(0x7ec)]()[_0x1d575c(0x4af)])),_0x15ba74=_0x2a8e65[_0x1d575c(0x48e)](_0x1d32c1=>_0x1d32c1[_0x1d575c(0x13d)]())[_0x1d575c(0x5c2)],_0x198a3b=_0x2a8e65[_0x1d575c(0x48e)](_0x28f434=>_0x28f434[_0x1d575c(0x5c8)]())[_0x1d575c(0x5c2)];let _0x51e3b3=0x0,_0x1c6e1c=0x0;if(_0xfbf800[_0x1d575c(0x26f)](/front/i))_0x51e3b3=_0x15ba74>=_0x198a3b?_0x5be03d:_0x3860b5;else{if(_0xfbf800[_0x1d575c(0x26f)](/middle/i))_0x51e3b3=(_0x5be03d+_0x3860b5)/0x2,_0x307aa4=-0x1;else _0xfbf800[_0x1d575c(0x26f)](/back/i)&&(_0x51e3b3=_0x15ba74>=_0x198a3b?_0x3860b5:_0x5be03d);}if(_0xfbf800[_0x1d575c(0x26f)](/head/i))_0x1c6e1c=_0x3482fd;else{if(_0xfbf800[_0x1d575c(0x26f)](/center/i))_0x1c6e1c=(_0x3482fd+_0xa2a25e)/0x2;else _0xfbf800[_0x1d575c(0x26f)](/base/i)&&(_0x1c6e1c=_0xa2a25e);}if(!_0x32ec05)return;for(const _0x176061 of _0x371c0d){if(!_0x176061)continue;let _0x18ee74=_0x51e3b3,_0x4efc50=_0x1c6e1c;if(_0xa23597[_0x1d575c(0x26f)](/horz/i))_0x18ee74+=_0x176061[_0x1d575c(0x13d)]()?-_0x445f68:_0x445f68;if(_0xa23597['match'](/vert/i))_0x4efc50+=_0x176061[_0x1d575c(0x13d)]()?-_0x320aa4:_0x320aa4;_0x176061[_0x1d575c(0x4b9)](_0x18ee74,_0x4efc50,_0x633fbc,_0x4f07f6,_0x527047,_0x307aa4),_0x176061[_0x1d575c(0x309)](_0x1e58e6);}if(_0x48463b)_0x32ec05[_0x1d575c(0x211)](_0x1d575c(0x6a0));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x5f2),_0x38b75c=>{const _0x227847=_0x2e20ee;if(!SceneManager[_0x227847(0x14c)]())return;VisuMZ['ConvertParams'](_0x38b75c,_0x38b75c);const _0x3692f9=$gameTemp[_0x227847(0x587)](),_0xee79a0=VisuMZ['CreateActionSequenceTargets'](_0x38b75c[_0x227847(0x59e)]),_0x145e1d=_0x38b75c[_0x227847(0x4a3)],_0x14e097=_0x38b75c[_0x227847(0x29e)],_0xb6d728=_0x38b75c[_0x227847(0x816)],_0x1d2226=_0x38b75c[_0x227847(0x772)];if(!_0x3692f9)return;for(const _0x3106d8 of _0xee79a0){if(!_0x3106d8)continue;_0x3106d8[_0x227847(0x269)](_0x145e1d,_0x14e097,_0xb6d728);}if(_0x1d2226)_0x3692f9['setWaitMode']('battleOpacity');}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Movement_Scale',_0x24df49=>{const _0xa6affc=_0x2e20ee;if(!SceneManager[_0xa6affc(0x14c)]())return;VisuMZ[_0xa6affc(0xfd)](_0x24df49,_0x24df49);const _0x367d78=$gameTemp[_0xa6affc(0x587)](),_0x125bb3=VisuMZ['CreateActionSequenceTargets'](_0x24df49['Targets']),_0x5e8deb=_0x24df49[_0xa6affc(0x462)],_0x255ae0=_0x24df49[_0xa6affc(0x42e)],_0x4cccc8=_0x24df49[_0xa6affc(0x29e)],_0x13de66=_0x24df49[_0xa6affc(0x816)],_0x1a3d72=_0x24df49['WaitForScale'];if(!_0x367d78)return;for(const _0x58f0bb of _0x125bb3){if(!_0x58f0bb)continue;_0x58f0bb[_0xa6affc(0x82b)](_0x5e8deb,_0x255ae0,_0x4cccc8,_0x13de66);}if(_0x1a3d72)_0x367d78[_0xa6affc(0x211)](_0xa6affc(0x743));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x579),_0x39b62b=>{const _0x3656a7=_0x2e20ee;if(!SceneManager[_0x3656a7(0x14c)]())return;VisuMZ[_0x3656a7(0xfd)](_0x39b62b,_0x39b62b);const _0x4e1a8b=$gameTemp[_0x3656a7(0x587)](),_0x12833c=VisuMZ[_0x3656a7(0xcd)](_0x39b62b['Targets']),_0x4c62c6=_0x39b62b[_0x3656a7(0x4a4)],_0x1cc737=_0x39b62b[_0x3656a7(0x588)],_0x42d50b=_0x39b62b[_0x3656a7(0x29e)],_0x47d92e=_0x39b62b['EasingType'],_0x3750cd=_0x39b62b[_0x3656a7(0x7dd)];if(!_0x4e1a8b)return;for(const _0x19ae77 of _0x12833c){if(!_0x19ae77)continue;_0x19ae77[_0x3656a7(0x7df)](_0x4c62c6,_0x1cc737,_0x42d50b,_0x47d92e);}if(_0x3750cd)_0x4e1a8b[_0x3656a7(0x211)]('battleSpriteSkew');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x1d6),_0x3c8caf=>{const _0x23192c=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x23192c(0xfd)](_0x3c8caf,_0x3c8caf);const _0x594f1a=$gameTemp['getLastPluginCommandInterpreter'](),_0x24f077=VisuMZ[_0x23192c(0xcd)](_0x3c8caf['Targets']),_0x2922d8=_0x3c8caf[_0x23192c(0x4f6)],_0x564ab7=_0x3c8caf[_0x23192c(0x29e)],_0x59b93f=_0x3c8caf['EasingType'],_0x458efd=_0x3c8caf[_0x23192c(0x302)],_0x552d29=_0x3c8caf['WaitForSpin'];if(!_0x594f1a)return;for(const _0xd0f06d of _0x24f077){if(!_0xd0f06d)continue;_0xd0f06d['spinBattler'](_0x2922d8,_0x564ab7,_0x59b93f,_0x458efd);}if(_0x552d29)_0x594f1a['setWaitMode']('battleSpin');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x23e),_0x504962=>{const _0x28c971=_0x2e20ee;if(!SceneManager[_0x28c971(0x14c)]())return;const _0xa0a1d8=$gameTemp[_0x28c971(0x587)]();if(!_0xa0a1d8)return;_0xa0a1d8[_0x28c971(0x211)](_0x28c971(0x354));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x508),_0x2825e2=>{const _0x5213d4=_0x2e20ee;if(!SceneManager[_0x5213d4(0x14c)]())return;const _0x10f13f=$gameTemp[_0x5213d4(0x587)]();if(!_0x10f13f)return;_0x10f13f['setWaitMode'](_0x5213d4(0x381));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x2bd),_0x1fb73f=>{const _0x5cc941=_0x2e20ee;if(!SceneManager[_0x5cc941(0x14c)]())return;const _0x16cda1=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x16cda1)return;_0x16cda1['setWaitMode']('battleMove');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3fd),_0x4a4255=>{const _0x5de05c=_0x2e20ee;if(!SceneManager[_0x5de05c(0x14c)]())return;const _0x5bf403=$gameTemp[_0x5de05c(0x587)]();if(!_0x5bf403)return;_0x5bf403[_0x5de05c(0x211)]('battleOpacity');}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x3d5),_0x5d9d3b=>{const _0x471ca0=_0x2e20ee;if(!SceneManager[_0x471ca0(0x14c)]())return;const _0x9fd727=$gameTemp[_0x471ca0(0x587)]();if(!_0x9fd727)return;_0x9fd727[_0x471ca0(0x211)](_0x471ca0(0x743));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x21e),_0x262571=>{const _0x409c69=_0x2e20ee;if(!SceneManager[_0x409c69(0x14c)]())return;const _0x532ce0=$gameTemp[_0x409c69(0x587)]();if(!_0x532ce0)return;_0x532ce0[_0x409c69(0x211)](_0x409c69(0x6bf));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x4b2),_0x1e267a=>{const _0x2076fd=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;const _0x19537e=$gameTemp['getLastPluginCommandInterpreter']();if(!_0x19537e)return;_0x19537e['setWaitMode'](_0x2076fd(0x643));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x731),_0x4b4d90=>{const _0x444917=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ[_0x444917(0xfd)](_0x4b4d90,_0x4b4d90);const _0x1009f9=$gameTemp[_0x444917(0x587)](),_0x1c9719=_0x4b4d90[_0x444917(0x2dc)];if(!_0x1009f9)return;const _0x70919d=BattleManager[_0x444917(0x2af)];if(!_0x70919d)return;_0x70919d[_0x444917(0x5ed)](_0x4b4d90);if(_0x1c9719)_0x1009f9[_0x444917(0x211)](_0x444917(0x25b));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Projectile_Icon',_0x11d86c=>{const _0x8b436f=_0x2e20ee;if(!SceneManager[_0x8b436f(0x14c)]())return;if(!Imported[_0x8b436f(0x10e)])return;VisuMZ[_0x8b436f(0xfd)](_0x11d86c,_0x11d86c);const _0x5f2b79=$gameTemp[_0x8b436f(0x587)](),_0x4d9fd5=_0x11d86c[_0x8b436f(0x2dc)];if(!_0x5f2b79)return;const _0x1dd44e=BattleManager[_0x8b436f(0x2af)];if(!_0x1dd44e)return;_0x1dd44e[_0x8b436f(0x5ed)](_0x11d86c);if(_0x4d9fd5)_0x5f2b79[_0x8b436f(0x211)]('battleProjectiles');}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x190),_0x4209cc=>{const _0x386826=_0x2e20ee;if(!SceneManager[_0x386826(0x14c)]())return;if(!Imported['VisuMZ_3_ActSeqProjectiles'])return;VisuMZ['ConvertParams'](_0x4209cc,_0x4209cc);const _0x38cc09=$gameTemp[_0x386826(0x587)](),_0x30d0fc=_0x4209cc[_0x386826(0x2dc)];if(!_0x38cc09)return;const _0xa0d28d=BattleManager[_0x386826(0x2af)];if(!_0xa0d28d)return;_0xa0d28d[_0x386826(0x5ed)](_0x4209cc);if(_0x30d0fc)_0x38cc09[_0x386826(0x211)](_0x386826(0x25b));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x20b),_0x48bff4=>{const _0x3e2a08=_0x2e20ee;if(!SceneManager[_0x3e2a08(0x14c)]())return;if(!Imported[_0x3e2a08(0x340)])return;VisuMZ['ConvertParams'](_0x48bff4,_0x48bff4);const _0x40088d=$gameTemp['getLastPluginCommandInterpreter'](),_0x4bfa24=_0x48bff4['WaitForSkew'];if(!_0x40088d)return;$gameScreen[_0x3e2a08(0xf1)](_0x48bff4[_0x3e2a08(0x4a4)],_0x48bff4[_0x3e2a08(0x588)],_0x48bff4['Duration'],_0x48bff4[_0x3e2a08(0x816)]);if(_0x4bfa24)_0x40088d[_0x3e2a08(0x211)](_0x3e2a08(0x2ba));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],'ActSeq_Skew_Reset',_0x1af7bc=>{const _0x24b5d0=_0x2e20ee;if(!SceneManager[_0x24b5d0(0x14c)]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x24b5d0(0xfd)](_0x1af7bc,_0x1af7bc);const _0x5af5f2=$gameTemp[_0x24b5d0(0x587)](),_0x1ee556=_0x1af7bc[_0x24b5d0(0x7dd)];if(!_0x5af5f2)return;$gameScreen[_0x24b5d0(0xf1)](0x0,0x0,_0x1af7bc['Duration'],_0x1af7bc[_0x24b5d0(0x816)]);if(_0x1ee556)_0x5af5f2[_0x24b5d0(0x211)](_0x24b5d0(0x2ba));}),PluginManager['registerCommand'](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x14f),_0x1653ca=>{const _0x23b69b=_0x2e20ee;if(!SceneManager[_0x23b69b(0x14c)]())return;if(!Imported[_0x23b69b(0x340)])return;const _0x314b22=$gameTemp[_0x23b69b(0x587)]();if(!_0x314b22)return;_0x314b22['setWaitMode'](_0x23b69b(0x2ba));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x4da),_0x29f120=>{const _0x28ea83=_0x2e20ee;if(!SceneManager[_0x28ea83(0x14c)]())return;VisuMZ[_0x28ea83(0xfd)](_0x29f120,_0x29f120);const _0xb87473=$gameTemp['getLastPluginCommandInterpreter'](),_0x33d5d5=_0x29f120[_0x28ea83(0x691)],_0x558cac=_0x29f120[_0x28ea83(0xed)];if(!_0xb87473)return;BattleManager['_targetIndex']=_0x33d5d5,BattleManager[_0x28ea83(0x7a1)]=BattleManager[_0x28ea83(0x69b)]?BattleManager[_0x28ea83(0x69b)][BattleManager['_targetIndex']]||null:null,BattleManager[_0x28ea83(0x7a1)]&&_0x558cac[_0x28ea83(0x6f8)]()[_0x28ea83(0x762)]()!==_0x28ea83(0x699)&&_0xb87473[_0x28ea83(0x74a)]([_0x558cac]);}),PluginManager['registerCommand'](pluginData['name'],_0x2e20ee(0x2f4),_0x40a304=>{const _0x115c0a=_0x2e20ee;if(!SceneManager[_0x115c0a(0x14c)]())return;VisuMZ['ConvertParams'](_0x40a304,_0x40a304);const _0x17b834=$gameTemp[_0x115c0a(0x587)](),_0x1d2dfd=_0x40a304['JumpToLabel'];if(!_0x17b834)return;BattleManager[_0x115c0a(0x127)]++,BattleManager[_0x115c0a(0x7a1)]=BattleManager[_0x115c0a(0x69b)][BattleManager[_0x115c0a(0x127)]]||null,BattleManager[_0x115c0a(0x7a1)]&&_0x1d2dfd['toUpperCase']()[_0x115c0a(0x762)]()!==_0x115c0a(0x699)&&_0x17b834[_0x115c0a(0x74a)]([_0x1d2dfd]);}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],'ActSeq_Target_PrevTarget',_0x54a95e=>{const _0x56d456=_0x2e20ee;if(!SceneManager[_0x56d456(0x14c)]())return;VisuMZ[_0x56d456(0xfd)](_0x54a95e,_0x54a95e);const _0x3ce725=$gameTemp[_0x56d456(0x587)](),_0x35ad18=_0x54a95e[_0x56d456(0xed)];if(!_0x3ce725)return;BattleManager['_targetIndex']--,BattleManager[_0x56d456(0x7a1)]=BattleManager[_0x56d456(0x69b)][BattleManager['_targetIndex']]||null,BattleManager[_0x56d456(0x7a1)]&&_0x35ad18[_0x56d456(0x6f8)]()['trim']()!==_0x56d456(0x699)&&_0x3ce725[_0x56d456(0x74a)]([_0x35ad18]);}),PluginManager['registerCommand'](pluginData['name'],_0x2e20ee(0x4c3),_0x380099=>{const _0x5bcc18=_0x2e20ee;if(!SceneManager[_0x5bcc18(0x14c)]())return;VisuMZ[_0x5bcc18(0xfd)](_0x380099,_0x380099);const _0x49e8b2=$gameTemp['getLastPluginCommandInterpreter'](),_0x5dac3b=_0x380099[_0x5bcc18(0x7b0)],_0x564488=_0x380099['JumpToLabel'];if(!_0x49e8b2)return;const _0x136eca=BattleManager[_0x5bcc18(0x127)];for(;;){BattleManager[_0x5bcc18(0x127)]=Math['randomInt'](BattleManager[_0x5bcc18(0x69b)]['length']);if(!_0x5dac3b)break;if(BattleManager[_0x5bcc18(0x127)]!==_0x136eca)break;if(BattleManager[_0x5bcc18(0x69b)]['length']<=0x1){BattleManager[_0x5bcc18(0x127)]=0x0;break;}}BattleManager[_0x5bcc18(0x7a1)]=BattleManager[_0x5bcc18(0x69b)][BattleManager[_0x5bcc18(0x127)]]||null,BattleManager[_0x5bcc18(0x7a1)]&&_0x564488[_0x5bcc18(0x6f8)]()[_0x5bcc18(0x762)]()!==_0x5bcc18(0x699)&&_0x49e8b2[_0x5bcc18(0x74a)]([_0x564488]);}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x2c8),_0x1b587d=>{const _0x21037c=_0x2e20ee;if(!SceneManager[_0x21037c(0x14c)]())return;if(!Imported[_0x21037c(0x340)])return;VisuMZ[_0x21037c(0xfd)](_0x1b587d,_0x1b587d);const _0x135a08=$gameTemp['getLastPluginCommandInterpreter'](),_0x59cf9b=_0x1b587d[_0x21037c(0x810)];if(!_0x135a08)return;$gameScreen[_0x21037c(0x59d)](_0x1b587d[_0x21037c(0x3dd)],_0x1b587d['Duration'],_0x1b587d[_0x21037c(0x816)]);if(_0x59cf9b)_0x135a08[_0x21037c(0x211)](_0x21037c(0x39a));}),PluginManager[_0x2e20ee(0x73c)](pluginData['name'],_0x2e20ee(0x236),_0x1b0a5f=>{const _0x139ba4=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x139ba4(0x340)])return;VisuMZ[_0x139ba4(0xfd)](_0x1b0a5f,_0x1b0a5f);const _0x5b6601=$gameTemp[_0x139ba4(0x587)](),_0x13b116=_0x1b0a5f[_0x139ba4(0x810)];if(!_0x5b6601)return;$gameScreen['setBattleZoom'](0x1,_0x1b0a5f[_0x139ba4(0x29e)],_0x1b0a5f[_0x139ba4(0x816)]);if(_0x13b116)_0x5b6601[_0x139ba4(0x211)](_0x139ba4(0x39a));}),PluginManager[_0x2e20ee(0x73c)](pluginData[_0x2e20ee(0x2e8)],_0x2e20ee(0x1fb),_0x164fd4=>{const _0x4fbfe3=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;const _0x18000a=$gameTemp[_0x4fbfe3(0x587)]();if(!_0x18000a)return;_0x18000a['setWaitMode'](_0x4fbfe3(0x39a));}),VisuMZ['BattleCore'][_0x2e20ee(0x40a)]=Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x24a)],Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x24a)]=function(){const _0x349c66=_0x2e20ee;this[_0x349c66(0x3ad)](),this['process_VisuMZ_BattleCore_PluginParams'](),this[_0x349c66(0x2b7)](),this[_0x349c66(0x580)](),VisuMZ[_0x349c66(0x17b)][_0x349c66(0x40a)][_0x349c66(0x7c6)](this),this[_0x349c66(0x222)](),this['process_VisuMZ_BattleCore_BaseTroops']();},Scene_Boot['prototype'][_0x2e20ee(0x222)]=function(){const _0x4a48ef=_0x2e20ee;if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_BattleCore_Action_Notetags'](),this[_0x4a48ef(0x156)](),this[_0x4a48ef(0x2c3)]();},Scene_Boot[_0x2e20ee(0x112)]['process_VisuMZ_BattleCore_Failsafes']=function(){const _0x30d641=_0x2e20ee,_0x2e345e=$dataSystem[_0x30d641(0x698)][_0x30d641(0x5c2)];for(let _0x240a62=0x0;_0x240a62<_0x2e345e;_0x240a62++){const _0x300aab=$dataSystem['attackMotions'][_0x240a62];if(_0x300aab)continue;$dataSystem[_0x30d641(0x600)][_0x240a62]=JsonEx[_0x30d641(0x311)]($dataSystem[_0x30d641(0x600)][0x0]);}},Scene_Boot[_0x2e20ee(0x112)]['process_VisuMZ_BattleCore_PluginParams']=function(){const _0x5984d9=_0x2e20ee,_0x3118ce=VisuMZ[_0x5984d9(0x17b)][_0x5984d9(0x1bf)];_0x3118ce['Damage'][_0x5984d9(0x2c9)]===undefined&&(_0x3118ce['Damage']['PopupPosition']=_0x5984d9(0x7cc)),_0x3118ce['Actor'][_0x5984d9(0x7cb)]===undefined&&(_0x3118ce[_0x5984d9(0x47d)][_0x5984d9(0x7cb)]=![]),_0x3118ce[_0x5984d9(0x692)]['SmoothImage']===undefined&&(_0x3118ce[_0x5984d9(0x692)][_0x5984d9(0x7cb)]=!![]),_0x3118ce['Actor'][_0x5984d9(0x6b4)]===undefined&&(_0x3118ce[_0x5984d9(0x47d)]['PrioritySortActive']=![]),_0x3118ce[_0x5984d9(0x47d)][_0x5984d9(0x678)]===undefined&&(_0x3118ce[_0x5984d9(0x47d)]['PrioritySortActors']=!![]);},VisuMZ[_0x2e20ee(0x214)]={},Scene_Boot[_0x2e20ee(0x112)]['process_VisuMZ_BattleCore_DamageStyles']=function(){const _0x337806=_0x2e20ee;for(const _0x1febca of VisuMZ[_0x337806(0x17b)][_0x337806(0x1bf)]['Damage'][_0x337806(0x426)]){if(!_0x1febca)continue;const _0x2853a0=_0x1febca['Name']['toUpperCase']()['trim']();VisuMZ[_0x337806(0x214)][_0x2853a0]=_0x1febca;}},VisuMZ[_0x2e20ee(0x17b)]['RegExp']={},Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x580)]=function(){const _0xd19c4f=_0x2e20ee,_0x3e23f9=VisuMZ[_0xd19c4f(0x17b)][_0xd19c4f(0xcc)],_0x2ff676='<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>',_0x390aa0=[[_0xd19c4f(0x1af),_0xd19c4f(0x388)],[_0xd19c4f(0x356),_0xd19c4f(0x6fa)]],_0x422d8f=[[_0xd19c4f(0xe1),_0xd19c4f(0x232)],[_0xd19c4f(0x1f2),_0xd19c4f(0x682)]],_0x14f04a=[['',''],['AsUser','AS\x20USER'],[_0xd19c4f(0x3b0),_0xd19c4f(0x1e3)]];for(const _0x538dec of _0x422d8f){for(const _0x369cc1 of _0x14f04a){for(const _0x3d9909 of _0x390aa0){const _0xb2e64f=_0x538dec[0x0]['format'](_0x3d9909[0x0],_0x369cc1[0x0]),_0x38712a=_0x538dec[0x1][_0xd19c4f(0x483)](_0x3d9909[0x1],_0x369cc1[0x1])[_0xd19c4f(0x762)](),_0x4e25e5=new RegExp(_0x2ff676[_0xd19c4f(0x483)](_0x38712a),'i');_0x3e23f9[_0xb2e64f]=_0x4e25e5;}}}const _0x38d05c=[[_0xd19c4f(0x5f6),_0xd19c4f(0x624)],['%1EndActionJS',_0xd19c4f(0x402)]];for(const _0x265730 of _0x38d05c){for(const _0x21d509 of _0x390aa0){const _0x5b7e90=_0x265730[0x0][_0xd19c4f(0x483)](_0x21d509[0x0]),_0x43a7ad=_0x265730[0x1]['format'](_0x21d509[0x1]),_0x5257db=new RegExp(_0x2ff676['format'](_0x43a7ad),'i');_0x3e23f9[_0x5b7e90]=_0x5257db;}}const _0x1a836c=[['%1StartBattleJS',_0xd19c4f(0x22c)],['%1EndBattleJS',_0xd19c4f(0x3fc)],['BattleVictoryJS','JS\x20BATTLE\x20VICTORY'],[_0xd19c4f(0x3a7),'JS\x20BATTLE\x20DEFEAT'],[_0xd19c4f(0x81a),_0xd19c4f(0x583)],[_0xd19c4f(0x718),_0xd19c4f(0x157)],[_0xd19c4f(0x50d),_0xd19c4f(0x255)],[_0xd19c4f(0x392),_0xd19c4f(0x775)],['%1RegenerateJS','JS\x20%1REGENERATE']];for(const _0x54cec4 of _0x1a836c){for(const _0x278a52 of _0x390aa0){const _0x227bb4=_0x54cec4[0x0]['format'](_0x278a52[0x0]),_0x5b20f2=_0x54cec4[0x1][_0xd19c4f(0x483)](_0x278a52[0x1]),_0xca33c8=new RegExp(_0x2ff676[_0xd19c4f(0x483)](_0x5b20f2),'i');_0x3e23f9[_0x227bb4]=_0xca33c8;}}},Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x2de)]=function(){const _0xa69ef2=_0x2e20ee,_0x4ab591=$dataSkills['concat']($dataItems);for(const _0x2e2843 of _0x4ab591){if(!_0x2e2843)continue;VisuMZ[_0xa69ef2(0x17b)]['Parse_Notetags_Action'](_0x2e2843);}},Scene_Boot['prototype'][_0x2e20ee(0x156)]=function(){const _0xe778c8=_0x2e20ee,_0x54eb38=$dataActors[_0xe778c8(0x380)]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates);for(const _0x475a1e of _0x54eb38){if(!_0x475a1e)continue;VisuMZ[_0xe778c8(0x17b)][_0xe778c8(0x449)](_0x475a1e);}},Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x250)]=function(){const _0x377cc4=_0x2e20ee,_0x3282f0=VisuMZ[_0x377cc4(0x17b)]['Settings'][_0x377cc4(0x520)][_0x377cc4(0x248)],_0x1f2504=[];for(const _0x4c62e7 of _0x3282f0){const _0x22d2e7=$dataTroops[_0x4c62e7];if(_0x22d2e7)_0x1f2504[_0x377cc4(0x4d5)](JsonEx['makeDeepCopy'](_0x22d2e7));}for(const _0x40caf4 of $dataTroops){if(!_0x40caf4)continue;for(const _0x4b7414 of _0x1f2504){if(_0x4b7414['id']===_0x40caf4['id'])continue;_0x40caf4['pages']=_0x40caf4['pages'][_0x377cc4(0x380)](_0x4b7414[_0x377cc4(0x49a)]);}}},Scene_Boot[_0x2e20ee(0x112)][_0x2e20ee(0x2c3)]=function(){const _0x2b1d1e=_0x2e20ee,_0x2c8cfb=$dataSkills[_0x2b1d1e(0x380)]($dataItems);for(const _0x5dce13 of _0x2c8cfb){if(!_0x5dce13)continue;VisuMZ[_0x2b1d1e(0x17b)][_0x2b1d1e(0x58a)](_0x5dce13);}},VisuMZ[_0x2e20ee(0x17b)]['ParseActorNotetags']=VisuMZ['ParseActorNotetags'],VisuMZ[_0x2e20ee(0xc1)]=function(_0x4dfd08){const _0x2a2f69=_0x2e20ee;VisuMZ[_0x2a2f69(0x17b)][_0x2a2f69(0xc1)]&&VisuMZ[_0x2a2f69(0x17b)]['ParseActorNotetags'][_0x2a2f69(0x7c6)](this,_0x4dfd08),VisuMZ[_0x2a2f69(0x17b)][_0x2a2f69(0x449)](_0x4dfd08);},VisuMZ['BattleCore'][_0x2e20ee(0x5dd)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x2e20ee(0x5dd)]=function(_0x162172){const _0x2573bd=_0x2e20ee;VisuMZ[_0x2573bd(0x17b)][_0x2573bd(0x5dd)]&&VisuMZ[_0x2573bd(0x17b)][_0x2573bd(0x5dd)][_0x2573bd(0x7c6)](this,_0x162172),VisuMZ['BattleCore'][_0x2573bd(0x449)](_0x162172);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4a0)]=VisuMZ[_0x2e20ee(0x4a0)],VisuMZ[_0x2e20ee(0x4a0)]=function(_0xd81f15){const _0x35255f=_0x2e20ee;VisuMZ[_0x35255f(0x17b)][_0x35255f(0x4a0)]&&VisuMZ[_0x35255f(0x17b)][_0x35255f(0x4a0)][_0x35255f(0x7c6)](this,_0xd81f15),VisuMZ[_0x35255f(0x17b)]['Parse_Notetags_Action'](_0xd81f15),VisuMZ[_0x35255f(0x17b)][_0x35255f(0x58a)](_0xd81f15);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4dd)]=VisuMZ[_0x2e20ee(0x4dd)],VisuMZ[_0x2e20ee(0x4dd)]=function(_0x53b5db){const _0x3eb773=_0x2e20ee;VisuMZ[_0x3eb773(0x17b)][_0x3eb773(0x4dd)]&&VisuMZ[_0x3eb773(0x17b)][_0x3eb773(0x4dd)][_0x3eb773(0x7c6)](this,_0x53b5db),VisuMZ[_0x3eb773(0x17b)][_0x3eb773(0x1b1)](_0x53b5db),VisuMZ[_0x3eb773(0x17b)]['Parse_Notetags_Targets'](_0x53b5db);},VisuMZ['BattleCore'][_0x2e20ee(0x72a)]=VisuMZ[_0x2e20ee(0x72a)],VisuMZ[_0x2e20ee(0x72a)]=function(_0x3275d3){const _0xc4c391=_0x2e20ee;VisuMZ[_0xc4c391(0x17b)][_0xc4c391(0x72a)]&&VisuMZ[_0xc4c391(0x17b)][_0xc4c391(0x72a)]['call'](this,_0x3275d3),VisuMZ['BattleCore'][_0xc4c391(0x449)](_0x3275d3);},VisuMZ['BattleCore'][_0x2e20ee(0x3db)]=VisuMZ[_0x2e20ee(0x3db)],VisuMZ['ParseArmorNotetags']=function(_0x371525){const _0x3e5081=_0x2e20ee;VisuMZ[_0x3e5081(0x17b)][_0x3e5081(0x3db)]&&VisuMZ[_0x3e5081(0x17b)][_0x3e5081(0x3db)][_0x3e5081(0x7c6)](this,_0x371525),VisuMZ[_0x3e5081(0x17b)][_0x3e5081(0x449)](_0x371525);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5ba)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x2e20ee(0x5ba)]=function(_0x40e9bb){const _0x30362e=_0x2e20ee;VisuMZ['BattleCore'][_0x30362e(0x5ba)]&&VisuMZ[_0x30362e(0x17b)][_0x30362e(0x5ba)][_0x30362e(0x7c6)](this,_0x40e9bb),VisuMZ['BattleCore'][_0x30362e(0x449)](_0x40e9bb);},VisuMZ[_0x2e20ee(0x17b)]['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ[_0x2e20ee(0x2b4)]=function(_0x5d530e){const _0x24015f=_0x2e20ee;VisuMZ[_0x24015f(0x17b)][_0x24015f(0x2b4)]&&VisuMZ['BattleCore']['ParseStateNotetags']['call'](this,_0x5d530e),VisuMZ[_0x24015f(0x17b)][_0x24015f(0x449)](_0x5d530e);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1b1)]=function(_0x343b15){const _0x370fd0=_0x2e20ee,_0x160b2d=[_0x370fd0(0x45e),'PostApplyJS',_0x370fd0(0x56d),_0x370fd0(0x2e1),_0x370fd0(0x148),_0x370fd0(0x2a5),_0x370fd0(0x74c),'PostEndActionJS'];for(const _0x12f612 of _0x160b2d){VisuMZ[_0x370fd0(0x17b)][_0x370fd0(0x644)](_0x343b15,_0x12f612);}const _0xbcec84=_0x343b15[_0x370fd0(0x37b)];_0xbcec84[_0x370fd0(0x26f)](/<ALWAYS CRITICAL/i)&&(_0x343b15[_0x370fd0(0x5bc)][_0x370fd0(0x10b)]=!![]),_0xbcec84[_0x370fd0(0x26f)](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)&&(_0x343b15[_0x370fd0(0x181)]=Math[_0x370fd0(0x376)](0x1,Number(RegExp['$1']))),_0xbcec84[_0x370fd0(0x26f)](/<TARGET:[ ](.*)>/i)&&(_0x343b15[_0x370fd0(0x3e4)]=String(RegExp['$1'])[_0x370fd0(0x6f8)]()['trim']());},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x449)]=function(_0x1b5587){const _0x54de5a=_0x2e20ee,_0x572222=[_0x54de5a(0x590),'PostApplyAsUserJS',_0x54de5a(0x7e9),_0x54de5a(0x6bb),_0x54de5a(0x2d8),_0x54de5a(0x64b),_0x54de5a(0x362),'PostDamageAsTargetJS',_0x54de5a(0x148),_0x54de5a(0x2a5),_0x54de5a(0x74c),_0x54de5a(0x5a4),_0x54de5a(0x52f),_0x54de5a(0x605),_0x54de5a(0x429),_0x54de5a(0x116),_0x54de5a(0x130),_0x54de5a(0x3a7),_0x54de5a(0x81a),'EscapeFailureJS','PreStartTurnJS',_0x54de5a(0x60e),_0x54de5a(0x716),_0x54de5a(0xf0),'PreRegenerateJS',_0x54de5a(0x24f)];for(const _0x1085ec of _0x572222){VisuMZ['BattleCore'][_0x54de5a(0x644)](_0x1b5587,_0x1085ec);}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x58a)]=function(_0x3acecb){const _0x362976=_0x2e20ee,_0x523540=_0x3acecb[_0x362976(0x37b)];if(_0x523540[_0x362976(0x26f)](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x348daf=String(RegExp['$1']),_0x5587c9=VisuMZ[_0x362976(0x17b)][_0x362976(0x173)](_0x3acecb,'Targets');VisuMZ[_0x362976(0x17b)][_0x362976(0x2ec)](_0x348daf,_0x5587c9);}if(_0x523540['match'](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x5c0e57=String(RegExp['$1']),_0x574e08=VisuMZ[_0x362976(0x17b)][_0x362976(0x173)](_0x3acecb,_0x362976(0x744));VisuMZ[_0x362976(0x17b)][_0x362976(0x2a9)](_0x5c0e57,_0x574e08);}},VisuMZ[_0x2e20ee(0x17b)]['JS']={},VisuMZ[_0x2e20ee(0x17b)]['createJS']=function(_0x4d6efd,_0x2b7599){const _0x20a234=_0x2e20ee,_0x5833f8=_0x4d6efd[_0x20a234(0x37b)];if(_0x5833f8[_0x20a234(0x26f)](VisuMZ[_0x20a234(0x17b)]['RegExp'][_0x2b7599])){const _0x15756d=RegExp['$1'],_0x4a2a38=_0x20a234(0x66c)[_0x20a234(0x483)](_0x15756d),_0x528859=VisuMZ[_0x20a234(0x17b)]['createKeyJS'](_0x4d6efd,_0x2b7599);VisuMZ[_0x20a234(0x17b)]['JS'][_0x528859]=new Function(_0x4a2a38);}},VisuMZ[_0x2e20ee(0x17b)]['createKeyJS']=function(_0x502551,_0x47b70a){const _0x14d2ca=_0x2e20ee;let _0x59c820='';if($dataActors['includes'](_0x502551))_0x59c820=_0x14d2ca(0x168)['format'](_0x502551['id'],_0x47b70a);if($dataClasses[_0x14d2ca(0x60c)](_0x502551))_0x59c820=_0x14d2ca(0x6d2)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);if($dataSkills['includes'](_0x502551))_0x59c820=_0x14d2ca(0x6a6)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);if($dataItems[_0x14d2ca(0x60c)](_0x502551))_0x59c820=_0x14d2ca(0x668)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);if($dataWeapons['includes'](_0x502551))_0x59c820=_0x14d2ca(0x5a6)['format'](_0x502551['id'],_0x47b70a);if($dataArmors[_0x14d2ca(0x60c)](_0x502551))_0x59c820=_0x14d2ca(0x126)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);if($dataEnemies[_0x14d2ca(0x60c)](_0x502551))_0x59c820=_0x14d2ca(0x7f3)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);if($dataStates[_0x14d2ca(0x60c)](_0x502551))_0x59c820=_0x14d2ca(0x713)[_0x14d2ca(0x483)](_0x502551['id'],_0x47b70a);return _0x59c820;},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2ec)]=function(_0x4d41f0,_0x4a61a2){const _0x4eef4b=_0x2e20ee,_0x94869d=_0x4eef4b(0x7d8)[_0x4eef4b(0x483)](_0x4d41f0);VisuMZ[_0x4eef4b(0x17b)]['JS'][_0x4a61a2]=new Function(_0x94869d);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2a9)]=function(_0x42f466,_0x2ea79f){const _0x125abb=_0x2e20ee,_0x13e2fa=_0x125abb(0x7a5)[_0x125abb(0x483)](_0x42f466);VisuMZ[_0x125abb(0x17b)]['JS'][_0x2ea79f]=new Function(_0x13e2fa);},TextManager['autoBattle']=VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1bf)][_0x2e20ee(0x490)][_0x2e20ee(0x109)],TextManager[_0x2e20ee(0x343)]=VisuMZ[_0x2e20ee(0x17b)]['Settings']['AutoBattle'][_0x2e20ee(0x537)],TextManager[_0x2e20ee(0x20a)]=VisuMZ['BattleCore']['Settings']['AutoBattle']['StyleName'],TextManager[_0x2e20ee(0x1b2)]=VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1bf)][_0x2e20ee(0x82e)][_0x2e20ee(0x7d9)],ColorManager['getColor']=function(_0x4cbad7){const _0x386f8e=_0x2e20ee;return _0x4cbad7=String(_0x4cbad7),_0x4cbad7[_0x386f8e(0x26f)](/#(.*)/i)?_0x386f8e(0x72b)[_0x386f8e(0x483)](String(RegExp['$1'])):this[_0x386f8e(0x361)](Number(_0x4cbad7));},DataManager[_0x2e20ee(0x5cf)]=function(_0x566545){const _0x5df123=_0x2e20ee;if(_0x566545['note'][_0x5df123(0x26f)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x528471=String(RegExp['$1'])['toUpperCase']()['trim']();if(_0x528471===_0x5df123(0x43b))return'MANUAL';if(VisuMZ['DamageStyles'][_0x528471])return _0x528471;}const _0x2f1f53=VisuMZ[_0x5df123(0x17b)][_0x5df123(0x1bf)]['Damage'][_0x5df123(0x23b)]['toUpperCase']()[_0x5df123(0x762)]();if(VisuMZ['DamageStyles'][_0x2f1f53])return _0x2f1f53;return _0x5df123(0x43b);},DataManager[_0x2e20ee(0x118)]=function(_0xf3f6c3){const _0x1594f3=_0x2e20ee;_0xf3f6c3=_0xf3f6c3[_0x1594f3(0x6f8)]()[_0x1594f3(0x762)](),this[_0x1594f3(0x36b)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0xf3f6c3])return this[_0x1594f3(0x36b)][_0xf3f6c3];for(let _0x3fe080=0x1;_0x3fe080<0x64;_0x3fe080++){if(!$dataSystem[_0x1594f3(0x733)][_0x3fe080])continue;let _0x4f7f40=$dataSystem['skillTypes'][_0x3fe080][_0x1594f3(0x6f8)]()['trim']();_0x4f7f40=_0x4f7f40[_0x1594f3(0x1d5)](/\x1I\[(\d+)\]/gi,''),_0x4f7f40=_0x4f7f40[_0x1594f3(0x1d5)](/\\I\[(\d+)\]/gi,''),this[_0x1594f3(0x36b)][_0x4f7f40]=_0x3fe080;}return this[_0x1594f3(0x36b)][_0xf3f6c3]||0x0;},DataManager['getSkillIdWithName']=function(_0x5c12ac){const _0x567eaf=_0x2e20ee;_0x5c12ac=_0x5c12ac[_0x567eaf(0x6f8)]()[_0x567eaf(0x762)](),this[_0x567eaf(0x5d1)]=this['_skillIDs']||{};if(this['_skillIDs'][_0x5c12ac])return this[_0x567eaf(0x5d1)][_0x5c12ac];for(const _0x57e908 of $dataSkills){if(!_0x57e908)continue;this['_skillIDs'][_0x57e908[_0x567eaf(0x2e8)][_0x567eaf(0x6f8)]()[_0x567eaf(0x762)]()]=_0x57e908['id'];}return this[_0x567eaf(0x5d1)][_0x5c12ac]||0x0;},DataManager[_0x2e20ee(0x505)]=function(_0x34c863){const _0x41764c=_0x2e20ee;_0x34c863=_0x34c863[_0x41764c(0x6f8)]()[_0x41764c(0x762)](),this[_0x41764c(0x666)]=this[_0x41764c(0x666)]||{};if(this[_0x41764c(0x666)][_0x34c863])return this['_enemyIDs'][_0x34c863];for(const _0x1682bc of $dataEnemies){if(!_0x1682bc)continue;this[_0x41764c(0x666)][_0x1682bc[_0x41764c(0x2e8)][_0x41764c(0x6f8)]()[_0x41764c(0x762)]()]=_0x1682bc['id'];}return this[_0x41764c(0x666)][_0x34c863]||0x0;},DataManager[_0x2e20ee(0x6b8)]=function(_0x15d3b8){const _0x3f1a34=_0x2e20ee;_0x15d3b8=_0x15d3b8[_0x3f1a34(0x6f8)]()['trim'](),this['_wtypeIDs']=this[_0x3f1a34(0x170)]||{};if(this[_0x3f1a34(0x170)][_0x15d3b8])return this[_0x3f1a34(0x170)][_0x15d3b8];for(let _0x2af34c=0x1;_0x2af34c<0x64;_0x2af34c++){if(!$dataSystem['weaponTypes'][_0x2af34c])continue;let _0xbc8439=$dataSystem['weaponTypes'][_0x2af34c][_0x3f1a34(0x6f8)]()[_0x3f1a34(0x762)]();_0xbc8439=_0xbc8439[_0x3f1a34(0x1d5)](/\x1I\[(\d+)\]/gi,''),_0xbc8439=_0xbc8439[_0x3f1a34(0x1d5)](/\\I\[(\d+)\]/gi,''),this[_0x3f1a34(0x170)][_0xbc8439]=_0x2af34c;}return this[_0x3f1a34(0x170)]['BARE\x20HANDS']=0x0,this['_wtypeIDs'][_0x15d3b8]||0x0;},DataManager[_0x2e20ee(0x554)]=function(_0x34ec56){const _0x38ff4d=_0x2e20ee,_0xf248f3=_0x38ff4d(0x6a4);let _0x319cb9=_0x34ec56[_0x38ff4d(0x6ab)],_0x31b1f3=_0x34ec56[_0x38ff4d(0x2e8)];const _0x35a0bc=_0x34ec56[_0x38ff4d(0x37b)];return _0x35a0bc[_0x38ff4d(0x26f)](/<DISPLAY ICON: (\d+)>/i)&&(_0x319cb9=Number(RegExp['$1'])),_0x35a0bc[_0x38ff4d(0x26f)](/<DISPLAY TEXT: (.*)>/i)&&(_0x31b1f3=String(RegExp['$1'])),_0xf248f3[_0x38ff4d(0x483)](_0x319cb9,_0x31b1f3);},DataManager[_0x2e20ee(0x114)]=function(_0x4c049d){const _0x2bee83=_0x2e20ee;return _0x4c049d['note'][_0x2bee83(0x26f)](/<COMMAND TEXT: (.*)>/i)?String(RegExp['$1']):_0x4c049d['name'];},DataManager[_0x2e20ee(0xf4)]=function(_0x4d355c){const _0x1e7c26=_0x2e20ee;return _0x4d355c[_0x1e7c26(0x37b)][_0x1e7c26(0x26f)](/<COMMAND ICON: (\d+)>/i)?Number(RegExp['$1']):_0x4d355c[_0x1e7c26(0x6ab)];},DataManager[_0x2e20ee(0x220)]=function(_0x4ed365){const _0x3fb184=_0x2e20ee,_0x55408e=$dataEnemies[_0x4ed365];if(_0x55408e){if(_0x55408e['note'][_0x3fb184(0x26f)](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x35cb56=String(RegExp['$1'])[_0x3fb184(0x439)](/[\r\n]+/)['remove'](''),_0x3c8710=this[_0x3fb184(0x2d0)](_0x35cb56);_0x4ed365=this[_0x3fb184(0x505)](_0x3c8710)||_0x4ed365,_0x4ed365=DataManager[_0x3fb184(0x220)](_0x4ed365);}}return _0x4ed365;},DataManager['processRandomizedData']=function(_0x40739d){const _0x18b3ea=_0x2e20ee;let _0x45ddba=0x0;const _0x39e274={};for(const _0x5e0a94 of _0x40739d){if(_0x5e0a94[_0x18b3ea(0x26f)](/(.*):[ ](\d+)/i)){const _0x1daa7a=String(RegExp['$1'])['trim'](),_0x532823=Number(RegExp['$2']);_0x39e274[_0x1daa7a]=_0x532823,_0x45ddba+=_0x532823;}else{if(_0x5e0a94[_0x18b3ea(0x26f)](/(.*):[ ](\d+\.?\d+)/i)){const _0x195ec5=String(RegExp['$1'])[_0x18b3ea(0x762)](),_0x178ce5=Number(RegExp['$2']);_0x39e274[_0x195ec5]=_0x178ce5,_0x45ddba+=_0x178ce5;}else _0x5e0a94!==''&&(_0x39e274[_0x5e0a94]=0x1,_0x45ddba++);}}if(_0x45ddba<=0x0)return'';let _0x296559=Math[_0x18b3ea(0x831)]()*_0x45ddba;for(const _0x1c8f58 in _0x39e274){_0x296559-=_0x39e274[_0x1c8f58];if(_0x296559<=0x0)return _0x1c8f58;}return'';},DataManager[_0x2e20ee(0x776)]=function(_0x2c62a8){const _0x5ca7e0=_0x2e20ee;if(!_0x2c62a8)return![];if(!VisuMZ[_0x5ca7e0(0x17b)]['Settings'][_0x5ca7e0(0x1f6)][_0x5ca7e0(0x2f2)])return![];if(_0x2c62a8[_0x5ca7e0(0x37b)][_0x5ca7e0(0x26f)](/<AUTO ACTION SEQUENCE>/i))return![];for(const _0x536762 of _0x2c62a8[_0x5ca7e0(0x6d0)]){if(!_0x536762)continue;if(_0x536762['code']===Game_Action[_0x5ca7e0(0x146)])return!![];}return![];},ConfigManager['autoBattleAtStart']=![],ConfigManager[_0x2e20ee(0x2c0)]=![],ConfigManager['visualHpGauge']=!![],VisuMZ['BattleCore']['ConfigManager_makeData']=ConfigManager[_0x2e20ee(0x721)],ConfigManager[_0x2e20ee(0x721)]=function(){const _0x106140=_0x2e20ee,_0x2a60ed=VisuMZ[_0x106140(0x17b)]['ConfigManager_makeData'][_0x106140(0x7c6)](this);return _0x2a60ed[_0x106140(0x38f)]=this[_0x106140(0x38f)],_0x2a60ed[_0x106140(0x2c0)]=this[_0x106140(0x2c0)],_0x2a60ed[_0x106140(0x1b2)]=this[_0x106140(0x1b2)],_0x2a60ed;},VisuMZ[_0x2e20ee(0x17b)]['ConfigManager_applyData']=ConfigManager[_0x2e20ee(0x5ff)],ConfigManager['applyData']=function(_0x4dc374){const _0x5c2f78=_0x2e20ee;VisuMZ[_0x5c2f78(0x17b)][_0x5c2f78(0x3a1)]['call'](this,_0x4dc374),'autoBattleAtStart'in _0x4dc374?this['autoBattleAtStart']=_0x4dc374[_0x5c2f78(0x38f)]:this[_0x5c2f78(0x38f)]=![],_0x5c2f78(0x2c0)in _0x4dc374?this[_0x5c2f78(0x2c0)]=_0x4dc374[_0x5c2f78(0x2c0)]:this[_0x5c2f78(0x2c0)]=![],_0x5c2f78(0x1b2)in _0x4dc374?this[_0x5c2f78(0x1b2)]=_0x4dc374[_0x5c2f78(0x1b2)]:this[_0x5c2f78(0x1b2)]=!![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x696)]=BattleManager[_0x2e20ee(0x513)],BattleManager[_0x2e20ee(0x513)]=function(){const _0x27b870=_0x2e20ee;VisuMZ[_0x27b870(0x17b)]['BattleManager_initMembers'][_0x27b870(0x7c6)](this),this[_0x27b870(0x2f3)]=[];},BattleManager[_0x2e20ee(0x4f0)]=function(){const _0x43e5a6=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;const _0x17650a=SceneManager[_0x43e5a6(0x4e6)]['_statusWindow'];if(_0x17650a)_0x17650a[_0x43e5a6(0x228)]();},BattleManager[_0x2e20ee(0x1db)]=function(){const _0x51262d=_0x2e20ee;if(BattleManager[_0x51262d(0x252)]())return _0x51262d(0x6aa);return _0x51262d(0x446);},BattleManager[_0x2e20ee(0x195)]=function(_0x371e47){const _0x410b18=_0x2e20ee;return _0x371e47=_0x371e47[_0x410b18(0x6f8)]()[_0x410b18(0x762)](),this[_0x410b18(0x1db)]()===_0x371e47;},BattleManager[_0x2e20ee(0x21b)]=function(){const _0x57e5e9=_0x2e20ee;return this[_0x57e5e9(0x195)](_0x57e5e9(0x446));},BattleManager['isTurnBased']=function(){const _0x36f94a=_0x2e20ee;return this[_0x36f94a(0x21b)]();},BattleManager[_0x2e20ee(0x25f)]=function(){const _0x1a8df1=_0x2e20ee;return!this[_0x1a8df1(0x4c8)]();},BattleManager['isTeamBased']=function(){const _0x2f8be2=_0x2e20ee;return!this[_0x2f8be2(0x4c8)]()&&!this[_0x2f8be2(0x25f)]();},BattleManager[_0x2e20ee(0x1e2)]=function(_0x2fa7db){const _0x1b66c5=_0x2e20ee;$gameParty[_0x1b66c5(0x1e2)](_0x2fa7db),$gameTroop[_0x1b66c5(0x1e2)](_0x2fa7db);},VisuMZ['BattleCore'][_0x2e20ee(0x14a)]=BattleManager[_0x2e20ee(0x7ac)],BattleManager[_0x2e20ee(0x7ac)]=function(){const _0x3af31a=_0x2e20ee;this[_0x3af31a(0x6ba)]=ConfigManager['autoBattleAtStart'],this['processBattleCoreJS'](_0x3af31a(0x52f)),VisuMZ[_0x3af31a(0x17b)][_0x3af31a(0x14a)][_0x3af31a(0x7c6)](this),this['processBattleCoreJS'](_0x3af31a(0x605));},BattleManager[_0x2e20ee(0x25c)]=function(_0x2a8ef7){const _0x498350=_0x2e20ee,_0x287c05=VisuMZ['BattleCore'][_0x498350(0x1bf)]['Mechanics'];_0x287c05[_0x498350(0x6f2)]&&VisuMZ['BattleCore'][_0x498350(0x5d5)](_0x287c05[_0x498350(0x6f2)])&&$gameTemp[_0x498350(0x632)](_0x287c05[_0x498350(0x6f2)]);const _0x50598b='%1Event'[_0x498350(0x483)](_0x2a8ef7);_0x287c05[_0x50598b]&&VisuMZ[_0x498350(0x17b)][_0x498350(0x5d5)](_0x287c05[_0x50598b])&&$gameTemp[_0x498350(0x632)](_0x287c05[_0x50598b]);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x54e)]=BattleManager[_0x2e20ee(0x389)],BattleManager[_0x2e20ee(0x389)]=function(){const _0x4085c5=_0x2e20ee;this['processBattleCoreJS'](_0x4085c5(0x130)),VisuMZ['BattleCore']['BattleManager_processVictory'][_0x4085c5(0x7c6)](this),this[_0x4085c5(0x25c)]('Victory');},VisuMZ['BattleCore'][_0x2e20ee(0x568)]=BattleManager[_0x2e20ee(0x286)],BattleManager[_0x2e20ee(0x286)]=function(){const _0xae90b4=_0x2e20ee;this[_0xae90b4(0x1e2)](_0xae90b4(0x3a7)),VisuMZ[_0xae90b4(0x17b)][_0xae90b4(0x568)][_0xae90b4(0x7c6)](this),this[_0xae90b4(0x25c)]('Defeat');},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0xe2)]=BattleManager['endBattle'],BattleManager['endBattle']=function(_0x195550){const _0x1b9305=_0x2e20ee;this[_0x1b9305(0x6ba)]=![],this[_0x1b9305(0x1e2)](_0x1b9305(0x429)),VisuMZ[_0x1b9305(0x17b)][_0x1b9305(0xe2)]['call'](this,_0x195550),this[_0x1b9305(0x1e2)](_0x1b9305(0x116));},VisuMZ['BattleCore'][_0x2e20ee(0x333)]=BattleManager[_0x2e20ee(0x16d)],BattleManager[_0x2e20ee(0x16d)]=function(){const _0x9cf72d=_0x2e20ee;if(this[_0x9cf72d(0x4c8)]())this['processBattleCoreJS'](_0x9cf72d(0x3da));VisuMZ[_0x9cf72d(0x17b)][_0x9cf72d(0x333)][_0x9cf72d(0x7c6)](this);if(this[_0x9cf72d(0x4c8)]())this[_0x9cf72d(0x1e2)](_0x9cf72d(0x60e));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x104)]=BattleManager[_0x2e20ee(0x7da)],BattleManager[_0x2e20ee(0x7da)]=function(){const _0x5726f8=_0x2e20ee,_0x96e96d=this[_0x5726f8(0x3ca)][_0x5726f8(0x630)]();if(_0x96e96d)_0x96e96d['actionBattleCoreJS']('PreStartActionJS');VisuMZ[_0x5726f8(0x17b)]['BattleManager_startAction']['call'](this);if(_0x96e96d)_0x96e96d[_0x5726f8(0x3dc)](_0x5726f8(0x2a5));},VisuMZ['BattleCore']['BattleManager_endAction']=BattleManager[_0x2e20ee(0x7a9)],BattleManager[_0x2e20ee(0x7a9)]=function(){const _0x3c70cc=_0x2e20ee,_0x28cd1=this[_0x3c70cc(0x720)];_0x28cd1&&_0x28cd1[_0x3c70cc(0x3dc)](_0x3c70cc(0x74c)),VisuMZ['BattleCore']['BattleManager_endAction'][_0x3c70cc(0x7c6)](this),_0x28cd1&&_0x28cd1[_0x3c70cc(0x3dc)](_0x3c70cc(0x5a4)),this['refreshBattlerMotions'](this[_0x3c70cc(0x6e8)]());},BattleManager[_0x2e20ee(0x61f)]=function(_0x3eae2c){const _0x4c792c=_0x2e20ee;for(const _0x4682bd of _0x3eae2c){if(!_0x4682bd)continue;if(!_0x4682bd[_0x4c792c(0x7ec)]())continue;_0x4682bd[_0x4c792c(0x7ec)]()[_0x4c792c(0x427)]();}},BattleManager[_0x2e20ee(0x3a4)]=function(){const _0x3a1528=_0x2e20ee;!this[_0x3a1528(0x683)][_0x3a1528(0x41c)]()&&this[_0x3a1528(0x7a9)]();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x3a9)]=function(){const _0x34a935=_0x2e20ee;this[_0x34a935(0x38c)](),this[_0x34a935(0x1c1)]();},BattleManager['makeEscapeRatio']=function(){const _0x199330=_0x2e20ee;this[_0x199330(0x661)]=VisuMZ['BattleCore']['Settings']['Mechanics'][_0x199330(0x556)][_0x199330(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)]['BattleManager_onEscapeSuccess']=BattleManager['onEscapeSuccess'],BattleManager[_0x2e20ee(0x717)]=function(){const _0xead7ce=_0x2e20ee;this[_0xead7ce(0x1e2)](_0xead7ce(0x81a)),BattleManager['_spriteset'][_0xead7ce(0x496)](),VisuMZ[_0xead7ce(0x17b)]['BattleManager_onEscapeSuccess'][_0xead7ce(0x7c6)](this),this[_0xead7ce(0x25c)](_0xead7ce(0x75e));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4ba)]=BattleManager['onEscapeFailure'],BattleManager[_0x2e20ee(0x6e1)]=function(){const _0x26a6ce=_0x2e20ee;this[_0x26a6ce(0x1e2)](_0x26a6ce(0x718));const _0x489956=this[_0x26a6ce(0x661)];VisuMZ[_0x26a6ce(0x17b)][_0x26a6ce(0x4ba)][_0x26a6ce(0x7c6)](this),this[_0x26a6ce(0x661)]=_0x489956+VisuMZ['BattleCore']['Settings'][_0x26a6ce(0x520)][_0x26a6ce(0x67e)][_0x26a6ce(0x7c6)](this),this['processPostBattleCommonEvents'](_0x26a6ce(0x78d));},BattleManager[_0x2e20ee(0x49b)]=function(){const _0x1fbd8d=_0x2e20ee;let _0x5dce50=![];if(this[_0x1fbd8d(0x46b)]())for(const _0x12c636 of $gameTroop[_0x1fbd8d(0xea)]()){this[_0x1fbd8d(0x683)][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x266),TextManager[_0x1fbd8d(0x262)][_0x1fbd8d(0x483)](_0x12c636)),this['_logWindow']['push'](_0x1fbd8d(0x6ca)),_0x5dce50=!![];}if(this[_0x1fbd8d(0x3b2)])this[_0x1fbd8d(0x683)][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x266),TextManager['preemptive'][_0x1fbd8d(0x483)]($gameParty[_0x1fbd8d(0x2e8)]())),this[_0x1fbd8d(0x683)][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x6ca));else this[_0x1fbd8d(0x56f)]&&(this['_logWindow'][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x266),TextManager[_0x1fbd8d(0x43d)][_0x1fbd8d(0x483)]($gameParty[_0x1fbd8d(0x2e8)]())),this[_0x1fbd8d(0x683)]['push']('wait'));_0x5dce50&&(this[_0x1fbd8d(0x683)][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x6ca)),this['_logWindow'][_0x1fbd8d(0x4d5)](_0x1fbd8d(0x6e4))),this[_0x1fbd8d(0x252)]()&&this['isSkipPartyCommandWindow']()&&(this['_tpbNeedsPartyCommand']=![]);},BattleManager[_0x2e20ee(0x46b)]=function(){const _0x1b4cf3=_0x2e20ee;if(BattleManager[_0x1b4cf3(0x6ba)])return![];return VisuMZ[_0x1b4cf3(0x17b)][_0x1b4cf3(0x1bf)][_0x1b4cf3(0x692)][_0x1b4cf3(0x80c)];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x497)]=BattleManager['startInput'],BattleManager['startInput']=function(){const _0x338fc0=_0x2e20ee;VisuMZ['BattleCore'][_0x338fc0(0x497)][_0x338fc0(0x7c6)](this),this['isDTB']()&&this[_0x338fc0(0x319)]()&&!this['_surprise']&&$gameParty[_0x338fc0(0x659)]()&&this[_0x338fc0(0x12b)]();},BattleManager['isSkipPartyCommandWindow']=function(){const _0x324e58=_0x2e20ee;return VisuMZ['BattleCore']['Settings'][_0x324e58(0x490)][_0x324e58(0x217)];},BattleManager[_0x2e20ee(0x1aa)]=function(){const _0x1792c2=_0x2e20ee;this[_0x1792c2(0x5c9)]()&&this[_0x1792c2(0x12b)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6af)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1b6)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1b6)]=function(){const _0x5adb8b=_0x2e20ee;VisuMZ['BattleCore']['Scene_Battle_startActorCommandSelection'][_0x5adb8b(0x7c6)](this),BattleManager[_0x5adb8b(0x252)]()&&BattleManager[_0x5adb8b(0x56e)]&&(BattleManager[_0x5adb8b(0x56e)]=![],this['actorCommandCancelTPB']());},BattleManager[_0x2e20ee(0x4b4)]=function(_0x35fab3,_0x3f41b6){const _0x1a06cc=_0x2e20ee;this['_action'][_0x1a06cc(0x437)]=_0x3f41b6,this['_logWindow'][_0x1a06cc(0x522)](_0x3f41b6),this[_0x1a06cc(0x683)][_0x1a06cc(0x4f7)](_0x35fab3,this['_action']),this[_0x1a06cc(0x720)]['apply'](_0x35fab3),this[_0x1a06cc(0x683)]['displayActionResults'](_0x35fab3,_0x35fab3);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x654)]=BattleManager[_0x2e20ee(0xf8)],BattleManager['makeActionOrders']=function(){const _0x5de526=_0x2e20ee;VisuMZ[_0x5de526(0x17b)][_0x5de526(0x654)]['call'](this),this[_0x5de526(0x1f4)]=this['_actionBattlers'][_0x5de526(0x48e)](_0x2cd233=>_0x2cd233&&_0x2cd233['isAppeared']());},VisuMZ['BattleCore']['BattleManager_updatePhase']=BattleManager[_0x2e20ee(0x2b6)],BattleManager[_0x2e20ee(0x2b6)]=function(_0xf1200e){const _0x247b76=_0x2e20ee;if(this[_0x247b76(0x4f8)]===_0x247b76(0x492))this['updateCustomActionSequence']();else this[_0x247b76(0x4f8)]==='forceAction'?this[_0x247b76(0x4ee)]():VisuMZ[_0x247b76(0x17b)][_0x247b76(0x5a3)][_0x247b76(0x7c6)](this,_0xf1200e);},BattleManager[_0x2e20ee(0x6c6)]=function(){const _0x30e76e=_0x2e20ee;this[_0x30e76e(0x69b)]=this[_0x30e76e(0x63a)][_0x30e76e(0x641)](0x0),this[_0x30e76e(0x127)]=0x0,this[_0x30e76e(0x7a1)]=this[_0x30e76e(0x69b)][0x0]||null,this[_0x30e76e(0x4f8)]=_0x30e76e(0x492);},BattleManager[_0x2e20ee(0x1d4)]=function(){const _0x2f626c=_0x2e20ee;!this[_0x2f626c(0x1cd)]()&&!this['_logWindow']['isBusy']()&&(this[_0x2f626c(0x4f8)]='action');},BattleManager[_0x2e20ee(0x35e)]=function(_0x16c31b){const _0x43a3d0=_0x2e20ee;this[_0x43a3d0(0x1f4)]['remove'](_0x16c31b);if(_0x16c31b===this[_0x43a3d0(0x3ca)])return;const _0x1cb3ba=JsonEx['makeDeepCopy'](_0x16c31b['currentAction']());this[_0x43a3d0(0x2f3)][_0x43a3d0(0x4d5)]([_0x16c31b,_0x1cb3ba]);},BattleManager[_0x2e20ee(0x5d6)]=function(){},BattleManager[_0x2e20ee(0x405)]=function(){const _0x59f07e=_0x2e20ee;if(this[_0x59f07e(0x252)]())this[_0x59f07e(0x4f8)]=_0x59f07e(0x284);else this['_forcedBattlers'][_0x59f07e(0x5c2)]>0x0?this['_phase']=_0x59f07e(0x284):this['startInput']();},BattleManager[_0x2e20ee(0x197)]=function(){const _0x30c900=_0x2e20ee;for(;;){const _0x140fa6=this[_0x30c900(0x672)]();if(!_0x140fa6)return null;if(_0x140fa6[_0x30c900(0x6ac)]()&&_0x140fa6[_0x30c900(0x471)]())return _0x140fa6;}},BattleManager[_0x2e20ee(0x672)]=function(){const _0xc21369=_0x2e20ee;if(this[_0xc21369(0x2f3)][_0xc21369(0x5c2)]>0x0){const _0x19bbae=this['_forcedBattlers'][_0xc21369(0x2bf)](),_0x33ed4a=_0x19bbae[0x0];return _0x33ed4a['_actions']=_0x33ed4a[_0xc21369(0x73f)]||[],_0x33ed4a[_0xc21369(0x73f)][0x0]=_0x19bbae[0x1],_0x33ed4a;}else return this['_actionBattlers']['shift']();},VisuMZ['BattleCore'][_0x2e20ee(0x57f)]=Game_Battler['prototype'][_0x2e20ee(0x35e)],Game_Battler[_0x2e20ee(0x112)]['forceAction']=function(_0x5cbf9e,_0xeab20a){const _0x2ff3a0=_0x2e20ee;VisuMZ[_0x2ff3a0(0x17b)][_0x2ff3a0(0x57f)]['call'](this,_0x5cbf9e,_0xeab20a),this[_0x2ff3a0(0x73f)][this[_0x2ff3a0(0x73f)][_0x2ff3a0(0x5c2)]-0x1][_0x2ff3a0(0xda)]=!![];},Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x383)]=function(_0x4879fa){return this['iterateBattler'](_0x4879fa[0x0],_0x4879fa[0x1],_0x91ac55=>{const _0x370ef0=_0x4eda;!_0x91ac55[_0x370ef0(0x43e)]()&&(_0x91ac55['forceAction'](_0x4879fa[0x2],_0x4879fa[0x3]),BattleManager[_0x370ef0(0x35e)](_0x91ac55));}),!![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1f0)]=Game_Battler[_0x2e20ee(0x112)]['makeSpeed'],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x46a)]=function(){const _0x4144f4=_0x2e20ee;VisuMZ[_0x4144f4(0x17b)][_0x4144f4(0x1f0)][_0x4144f4(0x7c6)](this),this[_0x4144f4(0x73f)][_0x4144f4(0x5c2)]<=0x0&&(this[_0x4144f4(0x113)]=Number[_0x4144f4(0x495)]);},VisuMZ[_0x2e20ee(0x17b)]['BattleManager_selectNextCommand']=BattleManager[_0x2e20ee(0x12b)],BattleManager[_0x2e20ee(0x12b)]=function(){const _0x32fcee=_0x2e20ee;this[_0x32fcee(0x252)]()?this[_0x32fcee(0x64f)]():VisuMZ['BattleCore'][_0x32fcee(0x507)]['call'](this);},BattleManager[_0x2e20ee(0x64f)]=function(){const _0x533d6f=_0x2e20ee;if(this['_currentActor']){if(this['_currentActor'][_0x533d6f(0x12b)]())return;this['finishActorInput'](),this['checkTpbInputClose'](),!this[_0x533d6f(0x3ca)]&&!this[_0x533d6f(0x621)]&&SceneManager[_0x533d6f(0x4e6)][_0x533d6f(0x6ff)]();}else!this[_0x533d6f(0x3ca)]&&this[_0x533d6f(0x447)]();},BattleManager['checkTpbInputClose']=function(){const _0x5116d3=_0x2e20ee;(!this[_0x5116d3(0x5c9)]()||this[_0x5116d3(0x2f9)]())&&(this['_tpbSceneChangeCacheActor']&&(!$gameParty['battleMembers']()[_0x5116d3(0x60c)](this[_0x5116d3(0x16c)])&&(this[_0x5116d3(0x16c)]=null)),!this[_0x5116d3(0x16c)]?(this['cancelActorInput'](),this['_currentActor']=null,this[_0x5116d3(0x3b9)]=![]):(this[_0x5116d3(0x621)]=this['_tpbSceneChangeCacheActor'],this[_0x5116d3(0x621)]['_tpbState']=_0x5116d3(0x416),this[_0x5116d3(0x3b9)]=!![],this[_0x5116d3(0x16c)]=null));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2e4)]=BattleManager[_0x2e20ee(0x786)],BattleManager[_0x2e20ee(0x786)]=function(){const _0x1a9d93=_0x2e20ee;return this[_0x1a9d93(0x4f8)]===_0x1a9d93(0x492)?this[_0x1a9d93(0x3a5)]():VisuMZ['BattleCore'][_0x1a9d93(0x2e4)][_0x1a9d93(0x7c6)](this);},BattleManager[_0x2e20ee(0x3a5)]=function(){const _0x51fa0b=_0x2e20ee;return this[_0x51fa0b(0x5c6)]();},VisuMZ['BattleCore'][_0x2e20ee(0x65b)]=BattleManager[_0x2e20ee(0x572)],BattleManager[_0x2e20ee(0x572)]=function(){const _0x4fd855=_0x2e20ee;this[_0x4fd855(0x252)]()&&this['_phase']===_0x4fd855(0x322)&&(this[_0x4fd855(0x621)]=null),VisuMZ['BattleCore']['BattleManager_cancelActorInput'][_0x4fd855(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5f1)]=BattleManager['inputtingAction'],BattleManager[_0x2e20ee(0x153)]=function(){const _0x41d859=_0x2e20ee,_0x1506b1=this[_0x41d859(0x621)];if(_0x1506b1&&!_0x1506b1[_0x41d859(0x153)]()){const _0x152889=_0x1506b1[_0x41d859(0x375)];_0x1506b1[_0x41d859(0x73f)][_0x152889]=new Game_Action(_0x1506b1);}return VisuMZ[_0x41d859(0x17b)][_0x41d859(0x5f1)][_0x41d859(0x7c6)](this);},SceneManager[_0x2e20ee(0x14c)]=function(){const _0x5659f3=_0x2e20ee;return this['_scene']&&this[_0x5659f3(0x4e6)][_0x5659f3(0x177)]===Scene_Battle;},SceneManager[_0x2e20ee(0x3e9)]=function(){const _0x2a2a71=_0x2e20ee;return Spriteset_Battle[_0x2a2a71(0x112)]['isFlipped']();},SceneManager[_0x2e20ee(0x138)]=function(){const _0x30f2c5=_0x2e20ee;if(SceneManager[_0x30f2c5(0x253)](Scene_Options))return!![];return![];},SceneManager[_0x2e20ee(0x785)]=function(){if(SceneManager['isNextScene'](Scene_Options))return!![];return![];},VisuMZ[_0x2e20ee(0x17b)]['Game_Temp_requestAnimation']=Game_Temp[_0x2e20ee(0x112)][_0x2e20ee(0x4e8)],Game_Temp[_0x2e20ee(0x112)][_0x2e20ee(0x4e8)]=function(_0x325bf0,_0x4c0d80,_0x43d321){const _0x1d3d5b=_0x2e20ee;_0x325bf0=_0x325bf0['filter']((_0x26af20,_0x542eed,_0x4cc43f)=>_0x4cc43f[_0x1d3d5b(0x22d)](_0x26af20)===_0x542eed),SceneManager[_0x1d3d5b(0x14c)]()&&SceneManager[_0x1d3d5b(0x3e9)]()&&(_0x43d321=!_0x43d321),VisuMZ[_0x1d3d5b(0x17b)][_0x1d3d5b(0x330)][_0x1d3d5b(0x7c6)](this,_0x325bf0,_0x4c0d80,_0x43d321),SceneManager[_0x1d3d5b(0x14c)]()&&BattleManager[_0x1d3d5b(0x2af)]['processAnimationRequests']();},Game_Temp[_0x2e20ee(0x112)][_0x2e20ee(0x56b)]=function(_0x5800de){const _0x325330=_0x2e20ee;this[_0x325330(0x3d8)]=_0x5800de;},Game_Temp[_0x2e20ee(0x112)][_0x2e20ee(0x587)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x2e20ee(0x112)][_0x2e20ee(0x394)]=function(){const _0x5eb18e=_0x2e20ee;this[_0x5eb18e(0x22a)]=undefined;},Game_Temp[_0x2e20ee(0x112)]['applyForcedGameTroopSettingsBattleCore']=function(_0xc9198f){const _0x2ec81d=_0x2e20ee;$gameMap&&$dataMap&&$dataMap[_0x2ec81d(0x37b)]&&this[_0x2ec81d(0x7a0)]($dataMap[_0x2ec81d(0x37b)]);const _0x3157c0=$dataTroops[_0xc9198f];_0x3157c0&&this[_0x2ec81d(0x7a0)](_0x3157c0[_0x2ec81d(0x2e8)]);},Game_Temp['prototype'][_0x2e20ee(0x7a0)]=function(_0x5a1b88){const _0x2dfed2=_0x2e20ee;if(!_0x5a1b88)return;if(_0x5a1b88[_0x2dfed2(0x26f)](/<(?:BATTLELAYOUT|BATTLE LAYOUT|LAYOUT):[ ](.*)>/i)){const _0x35ce3b=String(RegExp['$1']);if(_0x35ce3b[_0x2dfed2(0x26f)](/DEFAULT/i))this['_forcedBattleLayout']='default';else{if(_0x35ce3b[_0x2dfed2(0x26f)](/LIST/i))this[_0x2dfed2(0x22a)]='list';else{if(_0x35ce3b[_0x2dfed2(0x26f)](/XP/i))this[_0x2dfed2(0x22a)]='xp';else{if(_0x35ce3b[_0x2dfed2(0x26f)](/PORTRAIT/i))this['_forcedBattleLayout']='portrait';else _0x35ce3b[_0x2dfed2(0x26f)](/BORDER/i)&&(this[_0x2dfed2(0x22a)]=_0x2dfed2(0x4c9));}}}}},VisuMZ['BattleCore'][_0x2e20ee(0xe8)]=Game_System[_0x2e20ee(0x112)][_0x2e20ee(0x527)],Game_System[_0x2e20ee(0x112)][_0x2e20ee(0x527)]=function(){const _0x5c68bb=_0x2e20ee;VisuMZ['BattleCore'][_0x5c68bb(0xe8)][_0x5c68bb(0x7c6)](this),this[_0x5c68bb(0x2c2)]();},Game_System[_0x2e20ee(0x112)][_0x2e20ee(0x2c2)]=function(){const _0x523784=_0x2e20ee;this[_0x523784(0x369)]=this['_defeatedEnemies']||[];},Game_System[_0x2e20ee(0x112)][_0x2e20ee(0x6ad)]=function(){const _0x2824d6=_0x2e20ee;if(this['_defeatedEnemies']===undefined)this['initBattleCore']();return this[_0x2824d6(0x369)];},Game_System['prototype'][_0x2e20ee(0x7ef)]=function(_0x7138b5){const _0x14a992=_0x2e20ee;if(this[_0x14a992(0x369)]===undefined)this[_0x14a992(0x2c2)]();if(!_0x7138b5)return;if(this[_0x14a992(0x369)][_0x14a992(0x60c)](_0x7138b5))return;this['_defeatedEnemies'][_0x14a992(0x4d5)](_0x7138b5),this[_0x14a992(0x369)]['sort']((_0x1b19d2,_0x130713)=>_0x1b19d2-_0x130713);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x517)]=Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x77e)],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x77e)]=function(_0x294dd3){const _0x2fb5b9=_0x2e20ee,_0x511859=this[_0x2fb5b9(0x471)](),_0x27eb59=this['stateMotionIndex']();VisuMZ[_0x2fb5b9(0x17b)][_0x2fb5b9(0x517)][_0x2fb5b9(0x7c6)](this,_0x294dd3),this['isEnemy']()&&_0x511859&&this[_0x2fb5b9(0x1cf)]()&&(this[_0x2fb5b9(0x774)]=!this[_0x2fb5b9(0x1b0)](),$gameSystem['registerDefeatedEnemy'](this['enemyId']())),SceneManager[_0x2fb5b9(0x14c)]()&&_0x27eb59!==this[_0x2fb5b9(0x4fd)]()&&(this[_0x2fb5b9(0x7ec)]()&&this['battler']()['refreshMotion']());},Game_Enemy[_0x2e20ee(0x112)]['hasBeenDefeatedBefore']=function(){const _0x380db1=_0x2e20ee;return $gameSystem['getDefeatedEnemies']()['includes'](this[_0x380db1(0x4e5)]);},VisuMZ[_0x2e20ee(0x17b)]['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x2e20ee(0x112)]['eraseState'],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x24e)]=function(_0x51419e){const _0x3cf783=_0x2e20ee;VisuMZ['BattleCore'][_0x3cf783(0x480)][_0x3cf783(0x7c6)](this,_0x51419e),this[_0x3cf783(0x5c8)]()&&_0x51419e===this['deathStateId']()&&this[_0x3cf783(0x471)]()&&(this[_0x3cf783(0x774)]=![]),SceneManager[_0x3cf783(0x14c)]()&&this['requestMotionRefresh']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x533)]=Game_Action[_0x2e20ee(0x112)]['clear'],Game_Action[_0x2e20ee(0x112)]['clear']=function(){const _0x3ed864=_0x2e20ee;VisuMZ[_0x3ed864(0x17b)][_0x3ed864(0x533)][_0x3ed864(0x7c6)](this),this[_0x3ed864(0x525)]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x3ed864(0x7c9)]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0},this[_0x3ed864(0x3c4)]=_0x3ed864(0x5b4);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x4cc)]=function(_0xf3d1f3,_0x3a9554){const _0x3f1fab=_0x2e20ee;return VisuMZ['BattleCore'][_0x3f1fab(0x1bf)][_0x3f1fab(0x5c3)][_0x3f1fab(0x7fa)][_0x3f1fab(0x7c6)](this,_0xf3d1f3,_0x3a9554);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x7c1)]=function(_0x5dc423,_0x19b9c9){const _0x412bbf=_0x2e20ee;return VisuMZ[_0x412bbf(0x17b)]['Settings'][_0x412bbf(0x5c3)]['VarianceFormulaJS'][_0x412bbf(0x7c6)](this,_0x5dc423,_0x19b9c9);},Game_Action[_0x2e20ee(0x112)]['applyGuard']=function(_0x4f8f88,_0x4fa19c){const _0x5b179b=_0x2e20ee;return VisuMZ[_0x5b179b(0x17b)][_0x5b179b(0x1bf)][_0x5b179b(0x5c3)][_0x5b179b(0x36e)][_0x5b179b(0x7c6)](this,_0x4f8f88,_0x4fa19c);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x3ac)]=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x60d)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x60d)]=function(_0x101c6a){const _0xb0ee29=_0x2e20ee,_0x1db8ac=this['item']()['note'];if(_0x1db8ac[_0xb0ee29(0x26f)](/<ALWAYS HIT>/i))return 0x1;else{if(_0x1db8ac[_0xb0ee29(0x26f)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x3e3661=VisuMZ[_0xb0ee29(0x17b)][_0xb0ee29(0x3ac)][_0xb0ee29(0x7c6)](this,_0x101c6a);return _0x3e3661=this[_0xb0ee29(0x7c9)]['hitRate']*_0x3e3661+this[_0xb0ee29(0x7c9)][_0xb0ee29(0x456)],_0x3e3661;}}},Game_Action['prototype'][_0x2e20ee(0x23c)]=function(_0x33ae32){const _0x25fd63=_0x2e20ee;if(!this[_0x25fd63(0x57b)]()[_0x25fd63(0x5bc)][_0x25fd63(0x10b)])return 0x0;let _0x52326b=VisuMZ[_0x25fd63(0x17b)][_0x25fd63(0x1bf)]['Damage'][_0x25fd63(0x3c3)][_0x25fd63(0x7c6)](this,_0x33ae32);return _0x52326b=this[_0x25fd63(0x7c9)][_0x25fd63(0x3bc)]*_0x52326b+this['_multipliers'][_0x25fd63(0x6db)],_0x52326b;},Game_Action[_0x2e20ee(0x112)]['applyCritical']=function(_0x4c792a){const _0x4d9721=_0x2e20ee;return _0x4c792a=VisuMZ['BattleCore'][_0x4d9721(0x1bf)]['Damage']['CriticalHitMultiplier'][_0x4d9721(0x7c6)](this,_0x4c792a),_0x4c792a=this[_0x4d9721(0x7c9)][_0x4d9721(0x272)]*_0x4c792a+this[_0x4d9721(0x7c9)]['criticalDmgFlat'],_0x4c792a;},VisuMZ['BattleCore']['Game_Action_evalDamageFormula']=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x504)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x504)]=function(_0x5486d5){const _0x52e940=_0x2e20ee;if(this['_customDamageFormula']!==_0x52e940(0x5b4))return this[_0x52e940(0x137)](_0x5486d5);else return DataManager['getDamageStyle'](this[_0x52e940(0x57b)]())===_0x52e940(0x43b)?VisuMZ['BattleCore']['Game_Action_evalDamageFormula'][_0x52e940(0x7c6)](this,_0x5486d5):this[_0x52e940(0x25e)](_0x5486d5);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x3a2)]=function(_0x240a42){const _0x5ba128=_0x2e20ee;this[_0x5ba128(0x3c4)]=_0x240a42;},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x137)]=function(_0x21c317){const _0x51ac4d=_0x2e20ee,_0x14b9a3=this[_0x51ac4d(0x57b)](),_0x1967f9=_0x14b9a3[_0x51ac4d(0x5bc)][_0x51ac4d(0x30d)];_0x14b9a3['damage'][_0x51ac4d(0x30d)]=this[_0x51ac4d(0x3c4)];let _0x213059=VisuMZ[_0x51ac4d(0x17b)][_0x51ac4d(0x52c)][_0x51ac4d(0x7c6)](this,_0x21c317);return _0x14b9a3[_0x51ac4d(0x5bc)]['formula']=_0x1967f9,_0x213059;},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x39b)]=function(){const _0x4cb0b3=_0x2e20ee;if(this[_0x4cb0b3(0x57b)]()[_0x4cb0b3(0x37b)][_0x4cb0b3(0x26f)](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x57947a=String(RegExp['$1'])['toUpperCase']()[_0x4cb0b3(0x762)]();return _0x57947a;}return _0x4cb0b3(0x43b);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x25e)]=function(_0x54a94b){const _0x2462df=_0x2e20ee,_0x1cb711=DataManager[_0x2462df(0x5cf)](this[_0x2462df(0x57b)]()),_0x56f2e4=VisuMZ[_0x2462df(0x214)][_0x1cb711];try{return _0x56f2e4[_0x2462df(0x31a)][_0x2462df(0x7c6)](this,_0x54a94b);}catch(_0x1893a8){if($gameTemp[_0x2462df(0x784)]())console['log'](_0x1893a8);return VisuMZ[_0x2462df(0x17b)][_0x2462df(0x52c)][_0x2462df(0x7c6)](this);}},Game_Action[_0x2e20ee(0x112)]['applyArmorModifiers']=function(_0x4bf39d,_0x2d0834){const _0x1cfe46=_0x2e20ee;if(this[_0x1cfe46(0x4d0)]())return _0x2d0834;const _0x345a88=this['subject'](),_0x5deeda=_0x4bf39d;let _0x56930b=[],_0x57ee18=[];_0x56930b[_0x1cfe46(0x4d5)](this[_0x1cfe46(0x525)][_0x1cfe46(0x4ea)],this['_armorPenetration']['arRedFlat']),_0x57ee18[_0x1cfe46(0x4d5)](this[_0x1cfe46(0x525)][_0x1cfe46(0x359)],this['_armorPenetration'][_0x1cfe46(0x4bf)]);const _0x487eb9=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x2e5d26=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x21a14d=this[_0x1cfe46(0x278)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x2f892f=this[_0x1cfe46(0x278)]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;return _0x56930b=_0x56930b['concat'](_0x5deeda[_0x1cfe46(0x7f5)]()[_0x1cfe46(0x4f1)](_0x3608c1=>_0x3608c1&&_0x3608c1[_0x1cfe46(0x37b)][_0x1cfe46(0x26f)](_0x487eb9)?Number(RegExp['$1']):0x0)),_0x57ee18=_0x57ee18[_0x1cfe46(0x380)](_0x5deeda['traitObjects']()[_0x1cfe46(0x4f1)](_0x5133ef=>_0x5133ef&&_0x5133ef[_0x1cfe46(0x37b)][_0x1cfe46(0x26f)](_0x2e5d26)?Number(RegExp['$1'])/0x64:0x0)),_0x56930b=_0x56930b[_0x1cfe46(0x380)](_0x345a88[_0x1cfe46(0x7f5)]()['map'](_0x55fe1c=>_0x55fe1c&&_0x55fe1c[_0x1cfe46(0x37b)]['match'](_0x21a14d)?Number(RegExp['$1']):0x0)),_0x57ee18=_0x57ee18[_0x1cfe46(0x380)](_0x345a88['traitObjects']()[_0x1cfe46(0x4f1)](_0xfd98ab=>_0xfd98ab&&_0xfd98ab[_0x1cfe46(0x37b)][_0x1cfe46(0x26f)](_0x2f892f)?Number(RegExp['$1'])/0x64:0x0)),this[_0x1cfe46(0x57b)]()['note'][_0x1cfe46(0x26f)](_0x21a14d)&&_0x56930b[_0x1cfe46(0x4d5)](Number(RegExp['$1'])),this[_0x1cfe46(0x57b)]()[_0x1cfe46(0x37b)][_0x1cfe46(0x26f)](_0x2f892f)&&_0x57ee18[_0x1cfe46(0x4d5)](Number(RegExp['$1'])),_0x2d0834=_0x56930b[_0x1cfe46(0x693)]((_0x3a2499,_0x1dd47b)=>_0x3a2499-_0x1dd47b,_0x2d0834),_0x2d0834>0x0&&(_0x2d0834=_0x57ee18[_0x1cfe46(0x693)]((_0x137492,_0x2375bc)=>_0x137492*(0x1-_0x2375bc),_0x2d0834)),_0x2d0834;},VisuMZ[_0x2e20ee(0x17b)]['Game_Action_executeDamage']=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x458)],Game_Action['prototype'][_0x2e20ee(0x458)]=function(_0x31505f,_0x8a5d5d){const _0x4dce64=_0x2e20ee;_0x8a5d5d=_0x8a5d5d*this['_multipliers'][_0x4dce64(0x5bb)],_0x8a5d5d+=this[_0x4dce64(0x7c9)][_0x4dce64(0x478)]*(_0x8a5d5d>=0x0?0x1:-0x1),_0x8a5d5d=this['applyBattleCoreJS']('PreDamage%1JS',_0x31505f,_0x8a5d5d,![]),_0x8a5d5d=this[_0x4dce64(0x1ac)](_0x8a5d5d),_0x8a5d5d=Math[_0x4dce64(0x603)](_0x8a5d5d),this[_0x4dce64(0x61a)]=_0x8a5d5d,this['_totalValue']=this['_totalValue']||0x0,this['_totalValue']+=_0x8a5d5d,VisuMZ[_0x4dce64(0x17b)][_0x4dce64(0x47e)][_0x4dce64(0x7c6)](this,_0x31505f,_0x8a5d5d),this['applyBattleCoreJS'](_0x4dce64(0xbe),_0x31505f,_0x8a5d5d,!![]);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x1ac)]=function(_0x23af78){const _0x4362e9=_0x2e20ee;if(this[_0x4362e9(0x244)]())return _0x23af78;return _0x23af78=this[_0x4362e9(0x164)](_0x23af78),_0x23af78=this[_0x4362e9(0x40f)](_0x23af78),_0x23af78;},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x244)]=function(){const _0x482581=_0x2e20ee,_0x301d46=/<BYPASS DAMAGE CAP>/i;if(this['item']()[_0x482581(0x37b)][_0x482581(0x26f)](_0x301d46))return!![];if(this[_0x482581(0x1ab)]()[_0x482581(0x7f5)]()['some'](_0x412ab5=>_0x412ab5&&_0x412ab5[_0x482581(0x37b)][_0x482581(0x26f)](_0x301d46)))return!![];return!VisuMZ[_0x482581(0x17b)][_0x482581(0x1bf)][_0x482581(0x5c3)][_0x482581(0x37d)];},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x164)]=function(_0x22627f){const _0x775d90=_0x2e20ee;if(!VisuMZ['BattleCore'][_0x775d90(0x1bf)]['Damage']['EnableSoftCap'])return _0x22627f;const _0x26c895=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x775d90(0x57b)]()[_0x775d90(0x37b)][_0x775d90(0x26f)](_0x26c895))return!![];if(this['subject']()[_0x775d90(0x7f5)]()[_0x775d90(0x763)](_0x13554d=>_0x13554d&&_0x13554d['note']['match'](_0x26c895)))return!![];const _0x129861=_0x22627f<0x0?-0x1:0x1;_0x22627f=Math[_0x775d90(0x15a)](_0x22627f);let _0xd0c53b=this[_0x775d90(0x1ab)]()[_0x775d90(0x4ad)]();this[_0x775d90(0x57b)]()[_0x775d90(0x37b)]['match'](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0xd0c53b+=Number(RegExp['$1'])/0x64);_0xd0c53b=_0xd0c53b[_0x775d90(0x139)](0.01,0x1);const _0x11a175=this[_0x775d90(0x6a7)](),_0x29538f=_0xd0c53b*_0x11a175;if(_0x22627f>_0x29538f&&_0x11a175>_0x29538f){_0x22627f-=_0x29538f;const _0x3689dc=VisuMZ[_0x775d90(0x17b)][_0x775d90(0x1bf)]['Damage'][_0x775d90(0x645)],_0x405adc=Math[_0x775d90(0x376)](0x1-_0x22627f/((_0x11a175-_0x29538f)*_0x3689dc+_0x22627f),0.01);_0x22627f*=_0x405adc,_0x22627f+=_0x29538f;}return _0x22627f*_0x129861;},Game_Action['prototype'][_0x2e20ee(0x6a7)]=function(){const _0x5e0e96=_0x2e20ee;return this[_0x5e0e96(0x57b)]()[_0x5e0e96(0x37b)][_0x5e0e96(0x26f)](/<DAMAGE CAP:[ ](\d+)>/i)?Number(RegExp['$1']):this[_0x5e0e96(0x1ab)]()[_0x5e0e96(0x6c5)]();},Game_Action['prototype'][_0x2e20ee(0x40f)]=function(_0x218da3){const _0x5438a6=_0x2e20ee;let _0x2f58f6=this['getHardDamageCap']();return _0x218da3[_0x5438a6(0x139)](-_0x2f58f6,_0x2f58f6);},VisuMZ[_0x2e20ee(0x17b)]['Game_Action_apply']=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x33f)],Game_Action['prototype'][_0x2e20ee(0x33f)]=function(_0x40e91a){const _0x4baa81=_0x2e20ee;this[_0x4baa81(0x758)](_0x4baa81(0x1a0),_0x40e91a,0x0,!![]),VisuMZ[_0x4baa81(0x17b)][_0x4baa81(0x368)][_0x4baa81(0x7c6)](this,_0x40e91a),this[_0x4baa81(0x758)](_0x4baa81(0x3e8),_0x40e91a,this[_0x4baa81(0x61a)]||0x0,!![]);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x758)]=function(_0x1ee279,_0x27d1de,_0x5eee7d,_0x533b79){const _0xd5869b=_0x2e20ee;_0x5eee7d=_0x5eee7d||0x0;const _0x2dbbfd=_0x5eee7d,_0x32f94a=VisuMZ[_0xd5869b(0x17b)][_0xd5869b(0x1bf)][_0xd5869b(0x520)],_0x403e1b=_0x1ee279[_0xd5869b(0x483)]('');if(_0x32f94a[_0x403e1b]){_0x5eee7d=_0x32f94a[_0x403e1b][_0xd5869b(0x7c6)](this,_0x5eee7d,_0x27d1de);if(_0x533b79)_0x5eee7d=_0x2dbbfd;}let _0x38e53c=VisuMZ['BattleCore'][_0xd5869b(0x173)](this[_0xd5869b(0x57b)](),_0x1ee279[_0xd5869b(0x483)](''));if(VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c]){_0x5eee7d=VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c]['call'](this,this[_0xd5869b(0x1ab)](),_0x27d1de,this[_0xd5869b(0x57b)](),_0x5eee7d);if(_0x533b79)_0x5eee7d=_0x2dbbfd;}for(const _0x559fe6 of this['subject']()[_0xd5869b(0x7f5)]()){if(!_0x559fe6)continue;_0x38e53c=VisuMZ[_0xd5869b(0x17b)][_0xd5869b(0x173)](_0x559fe6,_0x1ee279[_0xd5869b(0x483)]('AsUser'));if(VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c]){_0x5eee7d=VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c][_0xd5869b(0x7c6)](this,this[_0xd5869b(0x1ab)](),_0x27d1de,_0x559fe6,_0x5eee7d);if(_0x533b79)_0x5eee7d=_0x2dbbfd;}}for(const _0x5879ff of _0x27d1de[_0xd5869b(0x7f5)]()){if(!_0x5879ff)continue;_0x38e53c=VisuMZ[_0xd5869b(0x17b)]['createKeyJS'](_0x5879ff,_0x1ee279[_0xd5869b(0x483)](_0xd5869b(0x3b0)));if(VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c]){_0x5eee7d=VisuMZ[_0xd5869b(0x17b)]['JS'][_0x38e53c][_0xd5869b(0x7c6)](this,this[_0xd5869b(0x1ab)](),_0x27d1de,_0x5879ff,_0x5eee7d);if(_0x533b79)_0x5eee7d=_0x2dbbfd;}}return _0x5eee7d;},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x3dc)]=function(_0x31a320){const _0x487697=_0x2e20ee,_0x4474f2=this[_0x487697(0xc8)]||0x0,_0x37a219=VisuMZ['BattleCore']['Settings'][_0x487697(0x520)],_0xd079fb=_0x31a320['format']('');_0x37a219[_0xd079fb]&&_0x37a219[_0xd079fb][_0x487697(0x7c6)](this,_0x4474f2);let _0x229fc0=VisuMZ[_0x487697(0x17b)][_0x487697(0x173)](this['item'](),_0x31a320);VisuMZ[_0x487697(0x17b)]['JS'][_0x229fc0]&&VisuMZ[_0x487697(0x17b)]['JS'][_0x229fc0][_0x487697(0x7c6)](this,this[_0x487697(0x1ab)](),this[_0x487697(0x1ab)](),this['item'](),_0x4474f2);for(const _0x5767e3 of this[_0x487697(0x1ab)]()[_0x487697(0x7f5)]()){if(!_0x5767e3)continue;_0x229fc0=VisuMZ['BattleCore'][_0x487697(0x173)](_0x5767e3,_0x31a320),VisuMZ[_0x487697(0x17b)]['JS'][_0x229fc0]&&VisuMZ['BattleCore']['JS'][_0x229fc0][_0x487697(0x7c6)](this,this['subject'](),this[_0x487697(0x1ab)](),_0x5767e3,_0x4474f2);}},Game_Action['prototype']['speed']=function(){const _0x530879=_0x2e20ee;return VisuMZ[_0x530879(0x17b)]['Settings'][_0x530879(0x520)][_0x530879(0x154)]['call'](this);},Game_Action[_0x2e20ee(0x112)]['allowRandomSpeed']=function(){const _0x24ec5e=_0x2e20ee;return VisuMZ[_0x24ec5e(0x17b)]['Settings'][_0x24ec5e(0x520)][_0x24ec5e(0x3f4)];},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x547)]=function(){const _0x689e3b=_0x2e20ee;return this[_0x689e3b(0x57b)]()[_0x689e3b(0x37b)][_0x689e3b(0x26f)](/<JS TARGETS>/i);},Game_Action['prototype']['isBattleCoreTargetScope']=function(){const _0x45de5e=_0x2e20ee;if(!this[_0x45de5e(0x760)]&&this[_0x45de5e(0x1ab)]()[_0x45de5e(0x477)]())return![];if(this[_0x45de5e(0x547)]())return!![];return typeof this[_0x45de5e(0x57b)]()['scope']==='string';},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4db)]=Game_Action[_0x2e20ee(0x112)]['isForOpponent'],Game_Action[_0x2e20ee(0x112)]['isForOpponent']=function(){const _0x11650a=_0x2e20ee;return this['isBattleCoreTargetScope']()&&!this['isCustomBattleScope']()?this[_0x11650a(0x4e3)]():VisuMZ[_0x11650a(0x17b)][_0x11650a(0x4db)][_0x11650a(0x7c6)](this);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x4e3)]=function(){const _0x334106=_0x2e20ee,_0x567c8e=this[_0x334106(0x57b)]()['scope'];return _0x567c8e[_0x334106(0x26f)](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ['BattleCore']['Game_Action_isForFriend']=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x1bc)],Game_Action['prototype'][_0x2e20ee(0x1bc)]=function(){const _0x4307d2=_0x2e20ee;return this[_0x4307d2(0x283)]()&&!this[_0x4307d2(0x547)]()?this[_0x4307d2(0x38e)]():VisuMZ[_0x4307d2(0x17b)][_0x4307d2(0x2e5)][_0x4307d2(0x7c6)](this);},Game_Action['prototype'][_0x2e20ee(0x38e)]=function(){const _0xff8292=_0x2e20ee,_0x21b9ee=this['item']()[_0xff8292(0x3e4)];return _0x21b9ee[_0xff8292(0x26f)](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x142)]=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x767)],Game_Action['prototype']['isForRandom']=function(){const _0x148b6=_0x2e20ee;return this[_0x148b6(0x283)]()&&!this['isCustomBattleScope']()?this[_0x148b6(0xd2)]():VisuMZ['BattleCore'][_0x148b6(0x142)]['call'](this);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0xd2)]=function(){const _0x5b5354=_0x2e20ee,_0x3092a6=this[_0x5b5354(0x57b)]()[_0x5b5354(0x3e4)];return _0x3092a6[_0x5b5354(0x26f)](/(?:RAND|RANDOM)/i);},VisuMZ['BattleCore'][_0x2e20ee(0x5ea)]=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x732)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x732)]=function(){const _0x1dda0c=_0x2e20ee;return this[_0x1dda0c(0x283)]()&&!this[_0x1dda0c(0x547)]()?this['needsSelectionBattleCore']():VisuMZ['BattleCore'][_0x1dda0c(0x5ea)][_0x1dda0c(0x7c6)](this);},Game_Action[_0x2e20ee(0x112)]['needsSelectionBattleCore']=function(){const _0x5c40b1=_0x2e20ee,_0xe13935=this[_0x5c40b1(0x57b)]()[_0x5c40b1(0x3e4)];if(_0xe13935[_0x5c40b1(0x26f)](/RANDOM/i))return![];return VisuMZ[_0x5c40b1(0x17b)][_0x5c40b1(0x5ea)][_0x5c40b1(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)]['Game_Action_makeTargets']=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x172)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x172)]=function(){const _0x2d0ac5=_0x2e20ee;return this['isBattleCoreTargetScope']()?this[_0x2d0ac5(0x76f)]():VisuMZ['BattleCore'][_0x2d0ac5(0x2e0)]['call'](this);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x76f)]=function(){const _0x358e0a=_0x2e20ee;let _0x2206ac=[];const _0x7a7673=String(this[_0x358e0a(0x57b)]()[_0x358e0a(0x3e4)]),_0x30da70=VisuMZ['BattleCore'][_0x358e0a(0x173)](this['item'](),'Targets');if(VisuMZ[_0x358e0a(0x17b)]['JS'][_0x30da70]){const _0x509506=VisuMZ['BattleCore'][_0x358e0a(0x173)](this[_0x358e0a(0x57b)](),'Targets');return _0x2206ac=VisuMZ[_0x358e0a(0x17b)]['JS'][_0x509506][_0x358e0a(0x7c6)](this,this[_0x358e0a(0x1ab)](),_0x2206ac),this['repeatTargets'](_0x2206ac);}if(_0x7a7673['match'](/(\d+) RANDOM ANY/i)){let _0x58096d=Number(RegExp['$1']);while(_0x58096d--){const _0x322df1=Math[_0x358e0a(0x187)](0x2)===0x0?this['opponentsUnit']():this[_0x358e0a(0x766)]();_0x2206ac[_0x358e0a(0x4d5)](_0x322df1[_0x358e0a(0x5ab)]());}return this['repeatTargets'](_0x2206ac);}if(_0x7a7673[_0x358e0a(0x26f)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x53f84d=Number(RegExp['$1']);while(_0x53f84d--){_0x2206ac['push'](this['opponentsUnit']()['trueRandomTarget']());}return this[_0x358e0a(0x791)](_0x2206ac);}if(_0x7a7673[_0x358e0a(0x26f)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x57ee50=Number(RegExp['$1']);while(_0x57ee50--){_0x2206ac[_0x358e0a(0x4d5)](this[_0x358e0a(0x766)]()[_0x358e0a(0x5ab)]());}return this[_0x358e0a(0x791)](_0x2206ac);}if(_0x7a7673[_0x358e0a(0x26f)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x2206ac[_0x358e0a(0x4d5)](...this[_0x358e0a(0x766)]()[_0x358e0a(0x11b)]()['filter'](_0xf86b9e=>_0xf86b9e!==this[_0x358e0a(0x1ab)]())),this[_0x358e0a(0x791)](_0x2206ac);return VisuMZ[_0x358e0a(0x17b)][_0x358e0a(0x2e0)][_0x358e0a(0x7c6)](this);},Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x23a)]=function(_0x3bc276){const _0x3bbb76=_0x2e20ee,_0x19204f=[];for(let _0x23de4d=0x0;_0x23de4d<this['numTargets']();_0x23de4d++){_0x19204f[_0x3bbb76(0x4d5)](_0x3bc276['trueRandomTarget']());}return _0x19204f;},VisuMZ['BattleCore'][_0x2e20ee(0x32a)]=Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x65d)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x65d)]=function(_0x48c278,_0x5d2857){const _0x45fd62=_0x2e20ee,_0x31dbbe=_0x48c278[_0x45fd62(0x76b)]();this['subject']()[_0x45fd62(0x620)]()[_0x45fd62(0x60c)](_0x48c278['deathStateId']())&&_0x48c278['setImmortal'](![]),VisuMZ['BattleCore'][_0x45fd62(0x32a)][_0x45fd62(0x7c6)](this,_0x48c278,_0x5d2857),_0x48c278[_0x45fd62(0x53b)](_0x31dbbe);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1c3)]=Game_Action['prototype'][_0x2e20ee(0x3e6)],Game_Action[_0x2e20ee(0x112)][_0x2e20ee(0x3e6)]=function(_0x32433d,_0x356c97){const _0x43046e=_0x2e20ee,_0x5e5874=_0x32433d[_0x43046e(0x76b)]();_0x356c97[_0x43046e(0x14e)]===_0x32433d['deathStateId']()&&_0x32433d['setImmortal'](![]),VisuMZ[_0x43046e(0x17b)][_0x43046e(0x1c3)]['call'](this,_0x32433d,_0x356c97),_0x32433d[_0x43046e(0x53b)](_0x5e5874);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x121)]=Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x513)],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x513)]=function(){const _0x223e57=_0x2e20ee;VisuMZ['BattleCore'][_0x223e57(0x121)]['call'](this),this['initMembersBattleCore']();},Game_BattlerBase['prototype'][_0x2e20ee(0x50a)]=function(){const _0x49b5a1=_0x2e20ee;this[_0x49b5a1(0x50c)]=![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1df)]=Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x71f)],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x71f)]=function(){const _0xef2557=_0x2e20ee;this[_0xef2557(0x797)]={},VisuMZ[_0xef2557(0x17b)]['Game_BattlerBase_refresh'][_0xef2557(0x7c6)](this);},Game_BattlerBase['prototype'][_0x2e20ee(0x186)]=function(_0x1c5a42){const _0x123df0=_0x2e20ee;return this[_0x123df0(0x797)]=this[_0x123df0(0x797)]||{},this['_cache'][_0x1c5a42]!==undefined;},Game_BattlerBase[_0x2e20ee(0x112)]['hardDamageCap']=function(){const _0x45df3c=_0x2e20ee;if(this[_0x45df3c(0x797)][_0x45df3c(0x6c5)]!==undefined)return this[_0x45df3c(0x797)]['hardDamageCap'];const _0x3d0b0e=/<DAMAGE CAP:[ ](\d+)>/i,_0x5ee6cc=this[_0x45df3c(0x7f5)]()[_0x45df3c(0x4f1)](_0x2e2240=>_0x2e2240&&_0x2e2240[_0x45df3c(0x37b)][_0x45df3c(0x26f)](_0x3d0b0e)?Number(RegExp['$1']):0x0);let _0x40106d=_0x5ee6cc[_0x45df3c(0x5c2)]>0x0?Math[_0x45df3c(0x376)](..._0x5ee6cc):0x0;if(_0x40106d<=0x0)_0x40106d=VisuMZ[_0x45df3c(0x17b)][_0x45df3c(0x1bf)][_0x45df3c(0x5c3)][_0x45df3c(0x613)];return this[_0x45df3c(0x797)][_0x45df3c(0x6c5)]=_0x40106d,this[_0x45df3c(0x797)][_0x45df3c(0x6c5)];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x4ad)]=function(){const _0xd7042c=_0x2e20ee;if(this[_0xd7042c(0x797)]['softDamageCap']!==undefined)return this['_cache'][_0xd7042c(0x81d)];let _0xdb1493=VisuMZ[_0xd7042c(0x17b)][_0xd7042c(0x1bf)][_0xd7042c(0x5c3)][_0xd7042c(0xe6)];const _0x38e05e=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x1e6a85=this['traitObjects']()[_0xd7042c(0x4f1)](_0x5be376=>_0x5be376&&_0x5be376['note'][_0xd7042c(0x26f)](_0x38e05e)?Number(RegExp['$1'])/0x64:0x0);return _0xdb1493=_0x1e6a85[_0xd7042c(0x693)]((_0x3dfeb7,_0x99642a)=>_0x3dfeb7+_0x99642a,_0xdb1493),this[_0xd7042c(0x797)][_0xd7042c(0x81d)]=_0xdb1493,this[_0xd7042c(0x797)][_0xd7042c(0x81d)][_0xd7042c(0x139)](0.01,0x1);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x265)]=Game_BattlerBase['prototype'][_0x2e20ee(0x307)],Game_BattlerBase['prototype'][_0x2e20ee(0x307)]=function(){const _0x4ccab4=_0x2e20ee;VisuMZ['BattleCore'][_0x4ccab4(0x265)][_0x4ccab4(0x7c6)](this),SceneManager[_0x4ccab4(0x14c)]()&&this[_0x4ccab4(0x309)](_0x4ccab4(0x80a));},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x7ec)]=function(){const _0x14f4d6=_0x2e20ee;if(!SceneManager[_0x14f4d6(0x14c)]())return null;if(!SceneManager[_0x14f4d6(0x4e6)][_0x14f4d6(0x2af)])return null;return SceneManager[_0x14f4d6(0x4e6)]['_spriteset']['findTargetSprite'](this);},Game_BattlerBase[_0x2e20ee(0x112)]['svBattlerAnchorX']=function(){const _0x339f20=_0x2e20ee;return VisuMZ[_0x339f20(0x17b)]['Settings'][_0x339f20(0x47d)][_0x339f20(0x57a)];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x7e6)]=function(){const _0x3eb460=_0x2e20ee;return VisuMZ[_0x3eb460(0x17b)][_0x3eb460(0x1bf)][_0x3eb460(0x47d)]['AnchorY'];},Game_BattlerBase['prototype'][_0x2e20ee(0x623)]=function(){const _0x17a581=_0x2e20ee;return this[_0x17a581(0x13d)]&&this[_0x17a581(0x13d)]()?VisuMZ[_0x17a581(0x17b)][_0x17a581(0x1bf)]['Actor'][_0x17a581(0x2fc)]:VisuMZ['BattleCore'][_0x17a581(0x1bf)][_0x17a581(0x692)][_0x17a581(0x2fc)];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x742)]=function(){return!![];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x3cd)]=function(){return 0x0;},Game_BattlerBase[_0x2e20ee(0x112)]['battleUIOffsetY']=function(){return 0x0;},Game_BattlerBase['prototype'][_0x2e20ee(0x2d2)]=function(_0x2e4fad){if(!_0x2e4fad)return 0x0;let _0xbf1289=0x0;const _0xe34050=_0x2e4fad['note'];return _0xe34050['match'](/<BATTLE UI OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0xbf1289+=Number(RegExp['$1'])),_0xe34050['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0xbf1289+=Number(RegExp['$1'])),_0xbf1289;},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x7e4)]=function(_0x574f5b){const _0x25015e=_0x2e20ee;if(!_0x574f5b)return 0x0;let _0x5db5a6=0x0;const _0x538c1c=_0x574f5b[_0x25015e(0x37b)];return _0x538c1c[_0x25015e(0x26f)](/<BATTLE UI OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x5db5a6+=Number(RegExp['$1'])),_0x538c1c['match'](/<BATTLE UI OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x5db5a6+=Number(RegExp['$2'])),_0x5db5a6;},VisuMZ[_0x2e20ee(0x17b)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x119)],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x119)]=function(_0x27b771){const _0x5c8837=_0x2e20ee;if(_0x27b771===this[_0x5c8837(0x59f)]()&&this[_0x5c8837(0x76b)]())return!![];return VisuMZ[_0x5c8837(0x17b)]['Game_BattlerBase_isStateResist']['call'](this,_0x27b771);},Game_BattlerBase['prototype'][_0x2e20ee(0x76b)]=function(){const _0x5593b5=_0x2e20ee;return this[_0x5593b5(0x50c)];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x53b)]=function(_0xd07c5f){const _0x309146=_0x2e20ee;_0xd07c5f?this[_0x309146(0x570)]():this[_0x309146(0x521)]();},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x570)]=function(){const _0x59b1b7=_0x2e20ee;if(this[_0x59b1b7(0x1cf)]())return;this[_0x59b1b7(0x50c)]=!![];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x521)]=function(){const _0x54a0b6=_0x2e20ee,_0x1006a6=this[_0x54a0b6(0x471)]();this[_0x54a0b6(0x50c)]=![],this[_0x54a0b6(0x71f)](),this[_0x54a0b6(0x1cf)]()&&_0x1006a6&&(this[_0x54a0b6(0x6cb)](),this[_0x54a0b6(0x700)]());},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x558)]=Game_BattlerBase['prototype']['canAttack'],Game_BattlerBase['prototype'][_0x2e20ee(0x155)]=function(){const _0x5817fa=_0x2e20ee;if(!this['canAttackBattleCore']())return![];return VisuMZ[_0x5817fa(0x17b)][_0x5817fa(0x558)][_0x5817fa(0x7c6)](this);},Game_BattlerBase['prototype'][_0x2e20ee(0x735)]=function(){const _0x11326c=_0x2e20ee;for(const _0x4da155 of this[_0x11326c(0x7f5)]()){if(!_0x4da155)continue;if(_0x4da155[_0x11326c(0x37b)]['match'](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}return!![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2be)]=Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x29f)],Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x29f)]=function(){const _0xd348ab=_0x2e20ee;if(!this[_0xd348ab(0x413)]())return![];return VisuMZ[_0xd348ab(0x17b)][_0xd348ab(0x2be)][_0xd348ab(0x7c6)](this);},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x413)]=function(){const _0x38bd90=_0x2e20ee;for(const _0x2c92af of this[_0x38bd90(0x7f5)]()){if(!_0x2c92af)continue;if(_0x2c92af['note'][_0x38bd90(0x26f)](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}return!![];},Game_BattlerBase[_0x2e20ee(0x112)][_0x2e20ee(0x58c)]=function(){const _0x56e2c9=_0x2e20ee;for(const _0x510503 of this[_0x56e2c9(0x7f5)]()){if(!_0x510503)continue;if(_0x510503[_0x56e2c9(0x37b)][_0x56e2c9(0x26f)](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x2e20ee(0x17b)]['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0x2e20ee(0x3aa)],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x3aa)]=function(){const _0xe50d14=_0x2e20ee;if(SceneManager[_0xe50d14(0x14c)]()&&$gameTroop[_0xe50d14(0x71b)]()<=0x0)return;this[_0xe50d14(0x1e2)](_0xe50d14(0x403)),VisuMZ[_0xe50d14(0x17b)][_0xe50d14(0x6b6)][_0xe50d14(0x7c6)](this),this[_0xe50d14(0x280)](),this[_0xe50d14(0x1e2)](_0xe50d14(0x24f));},Game_Battler[_0x2e20ee(0x112)]['regenerateAllBattleCore']=function(){const _0x4d31fc=_0x2e20ee;if(SceneManager[_0x4d31fc(0x14c)]())for(const _0x3acc16 of this['traitObjects']()){if(!_0x3acc16)continue;this[_0x4d31fc(0x7a4)](_0x3acc16);}},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x7a4)]=function(_0x4e139b){const _0x323dc1=_0x2e20ee;if(!Imported[_0x323dc1(0x540)])return;if(!SceneManager['isSceneBattle']())return;if(this['isDead']())return;if(this[_0x323dc1(0x637)]())return;if(_0x4e139b[_0x323dc1(0x37b)][_0x323dc1(0x26f)](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x274d9b=Number(RegExp['$1']);$gameTemp[_0x323dc1(0x560)]([this],_0x274d9b,![],![]);}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0xbc)]=Game_Battler[_0x2e20ee(0x112)]['startTpbTurn'],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x353)]=function(){const _0x296196=_0x2e20ee;this['processBattleCoreJS'](_0x296196(0x3da)),VisuMZ[_0x296196(0x17b)][_0x296196(0xbc)]['call'](this),this[_0x296196(0x1e2)](_0x296196(0x60e));},VisuMZ['BattleCore'][_0x2e20ee(0x518)]=Game_Battler[_0x2e20ee(0x112)]['onTurnEnd'],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x705)]=function(){const _0x5e6208=_0x2e20ee;this[_0x5e6208(0x1e2)](_0x5e6208(0x716)),VisuMZ[_0x5e6208(0x17b)][_0x5e6208(0x518)]['call'](this),this[_0x5e6208(0x1e2)](_0x5e6208(0xf0));},Game_Battler[_0x2e20ee(0x112)]['processBattleCoreJS']=function(_0x1807fb){const _0x6fdedc=_0x2e20ee,_0x10fc3f=VisuMZ[_0x6fdedc(0x17b)]['Settings'][_0x6fdedc(0x520)];if(_0x10fc3f[_0x1807fb])_0x10fc3f[_0x1807fb][_0x6fdedc(0x7c6)](this);for(const _0x471947 of this[_0x6fdedc(0x7f5)]()){if(!_0x471947)continue;key=VisuMZ[_0x6fdedc(0x17b)]['createKeyJS'](_0x471947,_0x1807fb),VisuMZ[_0x6fdedc(0x17b)]['JS'][key]&&VisuMZ[_0x6fdedc(0x17b)]['JS'][key][_0x6fdedc(0x7c6)](this,this,this,_0x471947,0x0);}},Game_Battler['prototype'][_0x2e20ee(0x161)]=function(){const _0x4fd72a=_0x2e20ee;return VisuMZ[_0x4fd72a(0x17b)][_0x4fd72a(0x1bf)][_0x4fd72a(0x47d)][_0x4fd72a(0x498)]||![];},Game_Battler['prototype']['isChanting']=function(){const _0xc36bb1=_0x2e20ee;if(this[_0xc36bb1(0xdd)]()){if(this[_0xc36bb1(0x161)]()){if(this['_actions'][_0xc36bb1(0x763)](_0x6cca21=>_0x6cca21[_0xc36bb1(0x57b)]()&&_0x6cca21['isMagical']()))return!![];}else{if(this[_0xc36bb1(0x73f)]['some'](_0x3ffe55=>_0x3ffe55['item']()&&_0x3ffe55['isMagicSkill']()))return!![];}}if(BattleManager[_0xc36bb1(0x252)]()&&this[_0xc36bb1(0x723)]==='casting')return this[_0xc36bb1(0x161)]()?this[_0xc36bb1(0x630)]()&&this['currentAction']()['item']()&&this[_0xc36bb1(0x630)]()[_0xc36bb1(0x2d6)]():this[_0xc36bb1(0x630)]()&&this['currentAction']()[_0xc36bb1(0x57b)]()&&this[_0xc36bb1(0x630)]()[_0xc36bb1(0x1a9)]();return![];},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x655)]=function(){const _0x4836dc=_0x2e20ee;if(BattleManager[_0x4836dc(0x252)]()&&this[_0x4836dc(0x723)]===_0x4836dc(0x1ec))return this[_0x4836dc(0x161)]()?this[_0x4836dc(0x630)]()&&this[_0x4836dc(0x630)]()['item']()&&!this['currentAction']()['isMagical']():this[_0x4836dc(0x630)]()&&this['currentAction']()[_0x4836dc(0x57b)]()&&!this[_0x4836dc(0x630)]()['isMagicSkill']();return![];},VisuMZ[_0x2e20ee(0x17b)]['Game_Battler_clearDamagePopup']=Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x660)],Game_Battler[_0x2e20ee(0x112)]['clearDamagePopup']=function(){const _0x341f04=_0x2e20ee;VisuMZ[_0x341f04(0x17b)][_0x341f04(0x6c0)][_0x341f04(0x7c6)](this),this[_0x341f04(0x401)]=[];},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x431)]=function(){const _0x510932=_0x2e20ee;if(!this[_0x510932(0x401)])this[_0x510932(0x660)]();return this[_0x510932(0x401)]['length']>0x0;},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x24b)]=function(){const _0x50005c=_0x2e20ee;if(!SceneManager['isSceneBattle']())return;if(!this[_0x50005c(0x401)])this[_0x50005c(0x660)]();this[_0x50005c(0x44d)]();const _0x1e9bee=this['battler']();if(_0x1e9bee)_0x1e9bee[_0x50005c(0x120)]();},Game_Battler['prototype'][_0x2e20ee(0x44d)]=function(){const _0x101cc4=_0x2e20ee,_0x1e56aa=this['result']();if(_0x1e56aa[_0x101cc4(0x3d1)]||_0x1e56aa[_0x101cc4(0x629)]){const _0x199612=JsonEx[_0x101cc4(0x311)](_0x1e56aa);_0x199612['hpAffected']=![],_0x199612['mpDamage']=0x0,this[_0x101cc4(0x401)][_0x101cc4(0x4d5)](_0x199612);}if(_0x1e56aa[_0x101cc4(0x367)]){const _0x1ce550=JsonEx['makeDeepCopy'](_0x1e56aa);_0x1ce550['missed']=![],_0x1ce550[_0x101cc4(0x629)]=![],_0x1ce550[_0x101cc4(0x15c)]=0x0,this[_0x101cc4(0x401)][_0x101cc4(0x4d5)](_0x1ce550);}if(_0x1e56aa[_0x101cc4(0x15c)]!==0x0){const _0x1943e6=JsonEx['makeDeepCopy'](_0x1e56aa);_0x1943e6[_0x101cc4(0x3d1)]=![],_0x1943e6[_0x101cc4(0x629)]=![],_0x1943e6['hpAffected']=![],this['_damagePopupArray'][_0x101cc4(0x4d5)](_0x1943e6);}},Game_Battler['prototype']['getNextDamagePopup']=function(){const _0x2509b4=_0x2e20ee;if(!this['_damagePopupArray'])this[_0x2509b4(0x660)]();return VisuMZ[_0x2509b4(0x17b)][_0x2509b4(0x1bf)][_0x2509b4(0x5c3)][_0x2509b4(0x397)]?this[_0x2509b4(0x401)][_0x2509b4(0x2bf)]():this[_0x2509b4(0x401)]['pop']();},Game_Battler['prototype'][_0x2e20ee(0x221)]=function(_0x5bfa4e,_0x139850){const _0x36e01e=_0x2e20ee;if(!SceneManager[_0x36e01e(0x14c)]())return;if(!this[_0x36e01e(0x7ec)]())return;if(_0x5bfa4e['length']<=0x0)return;_0x139850=_0x139850||{},_0x139850[_0x36e01e(0x361)]=_0x139850['textColor']||_0x36e01e(0x163),_0x139850['flashColor']=_0x139850[_0x36e01e(0x1d3)]||[0x0,0x0,0x0,0x0],_0x139850['flashDuration']=_0x139850[_0x36e01e(0x559)]||0x0,this[_0x36e01e(0x7ec)]()['setupTextPopup'](_0x5bfa4e,_0x139850);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x780)]=function(_0x50da53,_0xee6730,_0x46fc5f){const _0x32f1f3=_0x2e20ee;if(!SceneManager[_0x32f1f3(0x14c)]())return;if(!this[_0x32f1f3(0x7ec)]())return;if(_0xee6730[_0x32f1f3(0x5c2)]<=0x0)return;_0x46fc5f=_0x46fc5f||{},_0x46fc5f[_0x32f1f3(0x361)]=_0x46fc5f[_0x32f1f3(0x361)]||'#ffffff',_0x46fc5f['flashColor']=_0x46fc5f[_0x32f1f3(0x1d3)]||[0x0,0x0,0x0,0x0],_0x46fc5f[_0x32f1f3(0x559)]=_0x46fc5f['flashDuration']||0x0,this['battler']()[_0x32f1f3(0x780)](_0x50da53,_0xee6730,_0x46fc5f);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x22b)]=function(){const _0x54db6f=_0x2e20ee;if(this[_0x54db6f(0x637)]())return![];if(this['isAlive']()&&this[_0x54db6f(0x804)]())return!![];if(this[_0x54db6f(0x5c8)]()&&this[_0x54db6f(0x3e1)]()){if(this[_0x54db6f(0x1cf)]()&&this['allowCollapse']())return![];}else{if(this['isDead']())return![];}return!![];},VisuMZ['BattleCore'][_0x2e20ee(0x5be)]=Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x73e)],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x73e)]=function(){const _0x5b2d4c=_0x2e20ee;VisuMZ['BattleCore']['Game_Battler_clearMotion'][_0x5b2d4c(0x7c6)](this),this[_0x5b2d4c(0x404)]();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x599)]=function(){return!![];},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x2d9)]=function(){return![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4e0)]=Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x27c)],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x27c)]=function(_0x4dcc0f){const _0x50fb6e=_0x2e20ee;VisuMZ[_0x50fb6e(0x17b)][_0x50fb6e(0x4e0)][_0x50fb6e(0x7c6)](this,_0x4dcc0f),this[_0x50fb6e(0x646)](_0x4dcc0f);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x646)]=function(_0x12cd20){const _0x1393cf=_0x2e20ee;this[_0x1393cf(0x64e)](![]);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2e9)]=Game_Battler[_0x2e20ee(0x112)]['performActionStart'],Game_Battler[_0x2e20ee(0x112)]['performActionStart']=function(_0x31fc06){const _0x750fcf=_0x2e20ee;VisuMZ[_0x750fcf(0x17b)][_0x750fcf(0x2e9)]['call'](this,_0x31fc06);if(!_0x31fc06['isGuard']()){const _0x2a2eac=this['battler']();if(_0x2a2eac)_0x2a2eac[_0x750fcf(0x14b)]();}this[_0x750fcf(0x64e)](![]);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x649)]=function(){const _0x4dc4fb=_0x2e20ee,_0xd05233=this['_flinched'];this[_0x4dc4fb(0x1ef)]=![];if(BattleManager['isActiveTpb']()&&this[_0x4dc4fb(0xd6)]()){const _0x3f271c=this[_0x4dc4fb(0x7ec)]();if(_0x3f271c&&_0xd05233)_0x3f271c[_0x4dc4fb(0x14b)]();return;}const _0x4d7391=this[_0x4dc4fb(0x7ec)]();if(_0x4d7391)_0x4d7391[_0x4dc4fb(0x6e5)]();this[_0x4dc4fb(0x64e)](![]),this[_0x4dc4fb(0x700)]();},Game_Battler['prototype'][_0x2e20ee(0x46c)]=function(_0x255ced){const _0x26caa5=_0x2e20ee;if(_0x255ced[_0x26caa5(0x5e1)]())this[_0x26caa5(0x6be)]();else{if(_0x255ced['isGuard']())this[_0x26caa5(0x309)](_0x26caa5(0x201));else{if(_0x255ced['isMagical']())this[_0x26caa5(0x309)](_0x26caa5(0x7f1));else{if(_0x255ced[_0x26caa5(0x110)]())_0x255ced[_0x26caa5(0x57b)]()[_0x26caa5(0x5bc)][_0x26caa5(0x78e)]>0x0?this[_0x26caa5(0x6be)]():this[_0x26caa5(0x309)](_0x26caa5(0xf6));else _0x255ced[_0x26caa5(0x2ca)]()&&this['requestMotion'](_0x26caa5(0x57b));}}}},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x422)]=function(){const _0x4cc749=_0x2e20ee;return $dataSystem[_0x4cc749(0x600)][0x0];},Game_Battler['prototype'][_0x2e20ee(0x601)]=function(){const _0x545d92=_0x2e20ee,_0x2523a8=this[_0x545d92(0x422)]();return _0x2523a8?_0x2523a8['weaponImageId']:0x0;},Game_Battler['prototype'][_0x2e20ee(0x12c)]=function(_0x41b17e){const _0x456c89=_0x2e20ee;if(!$gameSystem[_0x456c89(0xde)]())return;const _0x3bf9b8=this[_0x456c89(0x7ec)](),_0x57b9bb=_0x41b17e['battler']();if(!_0x3bf9b8||!_0x57b9bb)return;const _0x3fe3f3=_0x57b9bb[_0x456c89(0x1f7)],_0x41a15a=_0x57b9bb[_0x456c89(0x4af)];this[_0x456c89(0x4b9)](_0x3fe3f3,_0x41a15a,0x0,![],_0x456c89(0x68f),-0x1),_0x3bf9b8['updatePosition']();const _0x5a5dd9=VisuMZ[_0x456c89(0x17b)][_0x456c89(0x1bf)][_0x456c89(0x1f6)];let _0x51fe4e=(_0x57b9bb['width']+_0x3bf9b8[_0x456c89(0x71d)])/0x2;_0x51fe4e*=this['isActor']()?0x1:-0x1;let _0x5cb0e1=_0x5a5dd9[_0x456c89(0x421)]*(this['isActor']()?0x1:-0x1);_0x41b17e['moveBattlerDistance'](_0x51fe4e,_0x5cb0e1,0x0,![],'Linear'),_0x57b9bb['updatePosition']();},Game_Battler['prototype'][_0x2e20ee(0x309)]=function(_0x57597a){const _0x4a1e27=_0x2e20ee;if(SceneManager[_0x4a1e27(0x14c)]()){const _0x4ea375=this[_0x4a1e27(0x7ec)]();_0x4ea375&&(_0x4ea375[_0x4a1e27(0x764)](_0x57597a),[_0x4a1e27(0x1cb),'thrust',_0x4a1e27(0x653)]['includes'](_0x57597a)&&this['performWeaponAnimation']());}this['clearFreezeMotion']();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x711)]=function(){},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x34c)]=function(_0x547824){const _0x1c5b60=_0x2e20ee;if(SceneManager[_0x1c5b60(0x14c)]()){const _0x27af69=this[_0x1c5b60(0x7ec)]();if(_0x27af69)_0x27af69[_0x1c5b60(0x5f4)](_0x547824);}},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x18a)]=function(){const _0x10f374=_0x2e20ee;if(SceneManager[_0x10f374(0x14c)]()){const _0x140abd=this['getAttackWeaponAnimationId']();this[_0x10f374(0x34c)](_0x140abd);}},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x66b)]=function(_0x25926d,_0x2407c0){const _0x2c81c0=_0x2e20ee;if(!_0x25926d)return;if(!_0x25926d['item']())return;if(_0x25926d[_0x2c81c0(0x5e1)]())return;if(_0x25926d[_0x2c81c0(0xc3)]())return;if(_0x25926d[_0x2c81c0(0x2ca)]())return;let _0x36460b=0x0;const _0x32be90=VisuMZ[_0x2c81c0(0x17b)]['Settings'][_0x2c81c0(0x1f6)],_0xe56faa=_0x25926d[_0x2c81c0(0x57b)]()[_0x2c81c0(0x37b)];if(_0xe56faa[_0x2c81c0(0x26f)](/<CAST ANIMATION: (\d+)>/i))_0x36460b=Number(RegExp['$1']);else{if(_0xe56faa[_0x2c81c0(0x26f)](/<NO CAST ANIMATION>/i))return;else{if(_0x25926d[_0x2c81c0(0x4d0)]())_0x36460b=_0x32be90[_0x2c81c0(0x74e)];else{if(_0x25926d['isPhysical']())_0x36460b=_0x32be90[_0x2c81c0(0x615)];else _0x25926d[_0x2c81c0(0x2d6)]()&&(_0x36460b=_0x32be90['CastMagical']);}}}_0x36460b>0x0&&$gameTemp[_0x2c81c0(0x4e8)]([this],_0x36460b,!!_0x2407c0);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x320)]=function(){const _0xafe73e=_0x2e20ee;SoundManager[_0xafe73e(0x5a1)]();let _0x4afea9=VisuMZ[_0xafe73e(0x17b)][_0xafe73e(0x1bf)]['ActionSequence'][_0xafe73e(0x618)];_0x4afea9>0x0&&$gameTemp['requestAnimation']([this],_0x4afea9);},VisuMZ['BattleCore'][_0x2e20ee(0x577)]=Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5c1)],Game_Battler['prototype'][_0x2e20ee(0x5c1)]=function(){const _0x240a8d=_0x2e20ee;VisuMZ[_0x240a8d(0x17b)][_0x240a8d(0x577)][_0x240a8d(0x7c6)](this),this[_0x240a8d(0x3f7)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x336)]=Game_Battler['prototype'][_0x2e20ee(0x80e)],Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x80e)]=function(){const _0x1540bd=_0x2e20ee;VisuMZ['BattleCore']['Game_Battler_performMiss'][_0x1540bd(0x7c6)](this),this[_0x1540bd(0x3f7)]();},VisuMZ['BattleCore'][_0x2e20ee(0x3d0)]=Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x24c)],Game_Battler['prototype'][_0x2e20ee(0x24c)]=function(){const _0x2cbb78=_0x2e20ee;VisuMZ[_0x2cbb78(0x17b)][_0x2cbb78(0x3d0)]['call'](this),this[_0x2cbb78(0x3f7)]();},Game_Battler['prototype'][_0x2e20ee(0x3f7)]=function(){const _0x5a1222=_0x2e20ee;if(!$gameSystem[_0x5a1222(0xde)]())return;if(this[_0x5a1222(0x1ef)])return;this['_flinched']=!![];const _0x4de564=this[_0x5a1222(0x7ec)]();if(_0x4de564)_0x4de564[_0x5a1222(0x4b0)]();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x700)]=function(){const _0x36984f=_0x2e20ee;if(this[_0x36984f(0x1cf)]()&&this[_0x36984f(0xec)]!==_0x36984f(0x80a)){this[_0x36984f(0x309)]('dead');return;}if(this[_0x36984f(0x1cf)]()&&this[_0x36984f(0xec)]===_0x36984f(0x80a))return;if(!!this[_0x36984f(0x3fb)])return;if(this[_0x36984f(0x5c8)]()){if(!this[_0x36984f(0x57d)]())this[_0x36984f(0x7ec)]()[_0x36984f(0x427)]();this[_0x36984f(0x404)]();return;}if(this['_motionType']===_0x36984f(0xbf))return;if(this['_motionType']===_0x36984f(0x407)&&!BattleManager[_0x36984f(0xd6)]())return;if(this['_motionType']===_0x36984f(0x201)&&!BattleManager[_0x36984f(0xd6)]())return;this[_0x36984f(0x73e)]();if(this[_0x36984f(0x7ec)]()&&BattleManager[_0x36984f(0xd6)]()){this[_0x36984f(0x7ec)]()[_0x36984f(0x427)](),this['clearFreezeMotion']();return;}},Game_Enemy[_0x2e20ee(0x112)]['isDuringNonLoopingMotion']=function(){const _0x525fb5=_0x2e20ee;if(!this['hasSvBattler']())return![];const _0xfdff2a=this[_0x525fb5(0x7ec)]();if(!_0xfdff2a)return![];const _0x2eac28=_0xfdff2a[_0x525fb5(0x310)];if(!_0x2eac28)return![];const _0xe2d5ec=_0x2eac28[_0x525fb5(0x33c)];return _0xe2d5ec&&!_0xe2d5ec['loop'];},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x386)]=function(){const _0x10b69f=_0x2e20ee;return this[_0x10b69f(0x4be)];},Game_Battler['prototype'][_0x2e20ee(0x64e)]=function(_0x183b7b){const _0x29e032=_0x2e20ee;if(!$gameSystem[_0x29e032(0xde)]())return;this[_0x29e032(0x4be)]=_0x183b7b;const _0x4f2118=this[_0x29e032(0x7ec)]();if(_0x4f2118)_0x4f2118[_0x29e032(0x610)]();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x254)]=function(_0x1e38a9,_0x437abf,_0x4a3942){const _0x1844df=_0x2e20ee;if(!$gameSystem[_0x1844df(0xde)]())return;const _0x28af67=this['battler']();if(!_0x28af67)return;if(_0x1e38a9===_0x28af67[_0x1844df(0x1f7)])return;let _0x2395f6=![];if(this[_0x1844df(0x13d)]()){if(_0x1e38a9>_0x28af67[_0x1844df(0x1f7)])_0x2395f6=!![];if(_0x1e38a9<_0x28af67[_0x1844df(0x1f7)])_0x2395f6=![];}else{if(this[_0x1844df(0x5c8)]()){if(_0x1e38a9>_0x28af67[_0x1844df(0x1f7)])_0x2395f6=![];if(_0x1e38a9<_0x28af67[_0x1844df(0x1f7)])_0x2395f6=!![];}};this[_0x1844df(0x64e)](_0x4a3942?!_0x2395f6:_0x2395f6),_0x28af67['updateFlip']();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x13f)]=function(_0x5be92e,_0x2ef8a3,_0x152067,_0x13645b,_0x2870eb){const _0x42f6c2=_0x2e20ee;if(!$gameSystem[_0x42f6c2(0xde)]())return;const _0x191729=this['battler']();if(!_0x191729)return;if(_0x13645b)this[_0x42f6c2(0x254)](_0x5be92e+_0x191729['_baseX'],_0x2ef8a3+_0x191729[_0x42f6c2(0x4af)],![]);_0x5be92e+=_0x191729[_0x42f6c2(0x1f7)]-_0x191729[_0x42f6c2(0x3b8)],_0x2ef8a3+=_0x191729['_baseY']-_0x191729['_homeY'],_0x191729[_0x42f6c2(0x131)](_0x5be92e,_0x2ef8a3,_0x152067);if(Imported[_0x42f6c2(0x540)])_0x191729[_0x42f6c2(0x316)](_0x2870eb||'Linear');},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x4b9)]=function(_0x1a5a62,_0x241bc8,_0x2e6062,_0x2739c0,_0x13bcd9,_0x1b7130){const _0x545a74=_0x2e20ee;if(!$gameSystem['isSideView']())return;const _0x4a8946=this[_0x545a74(0x7ec)]();if(!_0x4a8946)return;_0x1b7130=_0x1b7130||0x0;if(_0x1b7130>0x0){if(_0x4a8946[_0x545a74(0x1f7)]>_0x1a5a62)_0x1a5a62+=_0x4a8946['width']/0x2+_0x1b7130;if(_0x4a8946['_baseX']<_0x1a5a62)_0x1a5a62-=_0x4a8946[_0x545a74(0x71d)]/0x2+_0x1b7130;}if(_0x2739c0)this[_0x545a74(0x254)](_0x1a5a62,_0x241bc8,![]);_0x1a5a62-=_0x4a8946[_0x545a74(0x3b8)],_0x241bc8-=_0x4a8946[_0x545a74(0x830)],_0x4a8946[_0x545a74(0x131)](_0x1a5a62,_0x241bc8,_0x2e6062);if(Imported[_0x545a74(0x540)])_0x4a8946[_0x545a74(0x316)](_0x13bcd9||_0x545a74(0x68f));},Game_Battler['prototype'][_0x2e20ee(0x63f)]=function(_0x1c50c5,_0x185823,_0x3752f5){const _0x440f72=_0x2e20ee;if(!$gameSystem[_0x440f72(0xde)]())return;const _0x10feb4=this[_0x440f72(0x7ec)]();if(!_0x10feb4)return;_0x10feb4[_0x440f72(0x541)](_0x1c50c5,_0x185823,_0x3752f5);},Game_Battler['prototype'][_0x2e20ee(0xc5)]=function(_0x424da4,_0x2184bb){const _0x508a92=_0x2e20ee;if(!$gameSystem[_0x508a92(0xde)]())return;const _0x37a42f=this[_0x508a92(0x7ec)]();if(!_0x37a42f)return;_0x37a42f[_0x508a92(0x26e)](_0x424da4,_0x2184bb);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x11a)]=function(_0x5d0c7e,_0x5fc11e,_0x37cfb5,_0x45e6bc){const _0x39d8e0=_0x2e20ee;if(!$gameSystem[_0x39d8e0(0xde)]())return;const _0x4a29bf=this[_0x39d8e0(0x7ec)]();if(!_0x4a29bf)return;_0x4a29bf[_0x39d8e0(0xd3)](_0x5d0c7e,_0x5fc11e,_0x37cfb5,_0x45e6bc);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x7df)]=function(_0x3892b3,_0x50c150,_0x2c940d,_0x4222a6){const _0x2f74f=_0x2e20ee;if(!$gameSystem[_0x2f74f(0xde)]())return;const _0x40d91=this[_0x2f74f(0x7ec)]();if(!_0x40d91)return;this['isActor']()&&(_0x3892b3*=-0x1,_0x50c150*=-0x1),_0x40d91[_0x2f74f(0x6d8)](_0x3892b3,_0x50c150,_0x2c940d,_0x4222a6);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x82b)]=function(_0x2a965d,_0x161336,_0x468d66,_0x27e348){const _0x4b7bc4=_0x2e20ee;if(!$gameSystem[_0x4b7bc4(0xde)]())return;const _0x30562c=this[_0x4b7bc4(0x7ec)]();if(!_0x30562c)return;_0x30562c[_0x4b7bc4(0x472)](_0x2a965d,_0x161336,_0x468d66,_0x27e348);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x269)]=function(_0x304f35,_0x2853d8,_0x2c36db){const _0x53ef6d=_0x2e20ee;if(!$gameSystem[_0x53ef6d(0xde)]())return;const _0x58f9ca=this[_0x53ef6d(0x7ec)]();if(!_0x58f9ca)return;_0x58f9ca[_0x53ef6d(0x2ac)](_0x304f35,_0x2853d8,_0x2c36db);},Game_Battler[_0x2e20ee(0x112)]['clearFreezeMotion']=function(){const _0x28afe5=_0x2e20ee,_0x45b884=!!this[_0x28afe5(0x3fb)];this[_0x28afe5(0x3fb)]=undefined,_0x45b884&&(this['requestMotionRefresh'](),this[_0x28afe5(0x2dd)]());},Game_Battler[_0x2e20ee(0x112)]['clearFreezeMotionForWeapons']=function(){const _0x35229f=_0x2e20ee;if(!SceneManager[_0x35229f(0x14c)]())return;const _0x2df61d=this[_0x35229f(0x7ec)]();if(!_0x2df61d)return;let _0x339aa6=this[_0x35229f(0x13d)]()?_0x2df61d[_0x35229f(0x45b)]:_0x2df61d[_0x35229f(0x310)][_0x35229f(0x45b)];_0x339aa6&&_0x339aa6[_0x35229f(0xc7)](0x0);},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x74f)]=function(_0x1c07b3,_0x2c84ea,_0x248dd8){const _0x52dbe3=_0x2e20ee;if(this[_0x52dbe3(0x5c8)]()&&!this[_0x52dbe3(0x3e1)]())return;let _0x4a9c07=0x0;if(this[_0x52dbe3(0x13d)]()){const _0x59a223=this[_0x52dbe3(0x207)]();_0x4a9c07=_0x59a223[0x0]?_0x59a223[0x0][_0x52dbe3(0x702)]:0x0;}else this['isEnemy']()&&(_0x4a9c07=this[_0x52dbe3(0x4b7)]()[_0x52dbe3(0x702)]||0x0);const _0x4f2e89=$dataSystem[_0x52dbe3(0x600)][_0x4a9c07];_0x1c07b3===_0x52dbe3(0x1c0)&&(_0x1c07b3=[_0x52dbe3(0x2b9),_0x52dbe3(0x1cb),'missile'][_0x4f2e89['type']]||_0x52dbe3(0x1cb)),this['_freezeMotionData']={'motionType':_0x1c07b3,'weaponImageId':_0x2c84ea?_0x4f2e89[_0x52dbe3(0x70b)]:0x0,'pattern':_0x248dd8};},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x464)]=function(_0x3b5d76){const _0x341949=_0x2e20ee;if(!_0x3b5d76)return![];return _0x3b5d76[_0x341949(0x766)]()===this[_0x341949(0x766)]();},Game_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x529)]=function(_0x4fdf05){const _0x499073=_0x2e20ee;if(!_0x4fdf05)return![];return _0x4fdf05[_0x499073(0xeb)]()===this[_0x499073(0x766)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x798)]=Game_Actor['prototype'][_0x2e20ee(0xc7)],Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0xc7)]=function(_0x3323b0){const _0x362da6=_0x2e20ee;VisuMZ[_0x362da6(0x17b)][_0x362da6(0x798)]['call'](this,_0x3323b0),this[_0x362da6(0x10f)]();},Game_Actor['prototype'][_0x2e20ee(0x10f)]=function(){const _0xc95c2e=_0x2e20ee;this[_0xc95c2e(0x5fa)]='',this[_0xc95c2e(0x32e)]()&&this[_0xc95c2e(0x32e)]()[_0xc95c2e(0x37b)]['match'](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0xc95c2e(0x5fa)]=String(RegExp['$1']));},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x5b1)]=function(){const _0x4e5299=_0x2e20ee;if(this[_0x4e5299(0x7d7)]()!=='')return this[_0x4e5299(0x7d7)]();else{if(Imported['VisuMZ_1_MainMenuCore']&&this[_0x4e5299(0x387)]()!=='')return this[_0x4e5299(0x387)]();}return'';},Game_Actor['prototype'][_0x2e20ee(0x7d7)]=function(){const _0x45a9e0=_0x2e20ee;if(this[_0x45a9e0(0x5fa)]===undefined)this[_0x45a9e0(0x10f)]();return this[_0x45a9e0(0x5fa)];},Game_Actor['prototype'][_0x2e20ee(0x598)]=function(_0x29c975){const _0x368a45=_0x2e20ee;if(this['_battlePortrait']===undefined)this[_0x368a45(0x10f)]();this[_0x368a45(0x5fa)]=_0x29c975;if(SceneManager['isSceneBattle']()&&$gameParty['battleMembers']()[_0x368a45(0x60c)](this)){const _0x536bd9=SceneManager['_scene']['_statusWindow'];if(_0x536bd9)_0x536bd9['refreshActorPortrait'](this);}},Game_Actor[_0x2e20ee(0x112)]['isSpriteVisible']=function(){return!![];},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x4ab)]=function(){const _0x4f9876=_0x2e20ee;if(!this[_0x4f9876(0x477)]()&&BattleManager[_0x4f9876(0x6ba)])return!![];return Game_Battler[_0x4f9876(0x112)][_0x4f9876(0x4ab)][_0x4f9876(0x7c6)](this);},VisuMZ['BattleCore']['Game_Actor_makeActionList']=Game_Actor['prototype'][_0x2e20ee(0x18e)],Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x18e)]=function(){const _0x1abcb5=_0x2e20ee;if(BattleManager[_0x1abcb5(0x6ba)]&&!ConfigManager[_0x1abcb5(0x2c0)])return this[_0x1abcb5(0x2eb)]();else{return VisuMZ[_0x1abcb5(0x17b)][_0x1abcb5(0x61d)][_0x1abcb5(0x7c6)](this);;}},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x2eb)]=function(){const _0x2a8aa8=_0x2e20ee,_0x48cd6e=[],_0x3e86cf=new Game_Action(this);return _0x3e86cf[_0x2a8aa8(0x45d)](),_0x48cd6e[_0x2a8aa8(0x4d5)](_0x3e86cf),_0x48cd6e;},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x4ca)]=function(){const _0x5b2fe4=_0x2e20ee;return this['currentClass']()[_0x5b2fe4(0x37b)][_0x5b2fe4(0x26f)](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?String(RegExp['$1'])[_0x5b2fe4(0x439)](/[\r\n]+/):VisuMZ[_0x5b2fe4(0x17b)]['Settings']['ActorCmd'][_0x5b2fe4(0x465)];},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x6cd)]=function(){const _0x41fbec=_0x2e20ee;if(this['_cache'][_0x41fbec(0x5ac)]!==undefined)return this[_0x41fbec(0x797)]['svAnchorX'];return this[_0x41fbec(0x32e)]()[_0x41fbec(0x37b)][_0x41fbec(0x26f)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x41fbec(0x797)][_0x41fbec(0x5ac)]=eval(RegExp['$1']),this[_0x41fbec(0x797)][_0x41fbec(0x4bc)]=eval(RegExp['$2'])):this[_0x41fbec(0x797)][_0x41fbec(0x5ac)]=Game_Battler['prototype'][_0x41fbec(0x6cd)][_0x41fbec(0x7c6)](this),this['_cache'][_0x41fbec(0x5ac)];},Game_Actor[_0x2e20ee(0x112)]['svBattlerAnchorY']=function(){const _0x3bec48=_0x2e20ee;if(this[_0x3bec48(0x797)][_0x3bec48(0x4bc)]!==undefined)return this['_cache'][_0x3bec48(0x4bc)];return this['actor']()[_0x3bec48(0x37b)][_0x3bec48(0x26f)](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x3bec48(0x797)]['svAnchorX']=eval(RegExp['$1']),this[_0x3bec48(0x797)]['svAnchorY']=eval(RegExp['$2'])):this[_0x3bec48(0x797)][_0x3bec48(0x4bc)]=Game_Battler['prototype'][_0x3bec48(0x7e6)][_0x3bec48(0x7c6)](this),this[_0x3bec48(0x797)][_0x3bec48(0x4bc)];},Game_Actor[_0x2e20ee(0x112)]['svBattlerShadowVisible']=function(){const _0x367c37=_0x2e20ee;if(this[_0x367c37(0x797)][_0x367c37(0x41d)]!==undefined)return this['_cache']['svShadow'];if(this[_0x367c37(0x32e)]()[_0x367c37(0x37b)][_0x367c37(0x26f)](/<SIDEVIEW SHOW SHADOW>/i))this[_0x367c37(0x797)]['svShadow']=!![];else this[_0x367c37(0x32e)]()[_0x367c37(0x37b)]['match'](/<SIDEVIEW HIDE SHADOW>/i)?this[_0x367c37(0x797)][_0x367c37(0x41d)]=![]:this[_0x367c37(0x797)][_0x367c37(0x41d)]=Game_Battler[_0x367c37(0x112)][_0x367c37(0x623)]['call'](this);return this[_0x367c37(0x797)][_0x367c37(0x41d)];},Game_Actor['prototype']['battlerSmoothImage']=function(){const _0x1399ff=_0x2e20ee;return VisuMZ['BattleCore'][_0x1399ff(0x1bf)]['Actor'][_0x1399ff(0x7cb)];},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x711)]=function(){const _0x16a84f=_0x2e20ee,_0x1e0159=this[_0x16a84f(0x207)](),_0x4b62ec=_0x1e0159[0x0]?_0x1e0159[0x0]['wtypeId']:0x0,_0x14cf2a=$dataSystem[_0x16a84f(0x600)][_0x4b62ec];_0x14cf2a&&this[_0x16a84f(0x34c)](_0x14cf2a[_0x16a84f(0x70b)]);},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x737)]=function(_0x1a3df5){const _0x487d77=_0x2e20ee;Game_Battler[_0x487d77(0x112)][_0x487d77(0x737)]['call'](this,_0x1a3df5),this['performActionMotions'](_0x1a3df5);},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x422)]=function(){const _0x1771f2=_0x2e20ee,_0x56eec6=this[_0x1771f2(0x207)](),_0xb343ef=_0x56eec6[0x0]?_0x56eec6[0x0]['wtypeId']:0x0;return $dataSystem['attackMotions'][_0xb343ef];},Game_Actor['prototype'][_0x2e20ee(0x3cd)]=function(){const _0x124fb6=_0x2e20ee;let _0x44bf89=_0x124fb6(0x3cd);if(this['checkCacheKey'](_0x44bf89))return this[_0x124fb6(0x797)][_0x44bf89];return this[_0x124fb6(0x797)][_0x44bf89]=this[_0x124fb6(0x2d2)](this[_0x124fb6(0x32e)]()),this['_cache'][_0x44bf89];},Game_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x5c4)]=function(){const _0x309031=_0x2e20ee;let _0x1e5cea=_0x309031(0x5c4);if(this['checkCacheKey'](_0x1e5cea))return this[_0x309031(0x797)][_0x1e5cea];return this[_0x309031(0x797)][_0x1e5cea]=this[_0x309031(0x7e4)](this[_0x309031(0x32e)]()),this[_0x309031(0x797)][_0x1e5cea];},VisuMZ['BattleCore'][_0x2e20ee(0x2d4)]=Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0xc7)],Game_Enemy['prototype']['setup']=function(_0x3c9783,_0x2a1b2d,_0x2ba35c){const _0x536543=_0x2e20ee;_0x3c9783=DataManager[_0x536543(0x220)](_0x3c9783),VisuMZ['BattleCore'][_0x536543(0x2d4)]['call'](this,_0x3c9783,_0x2a1b2d,_0x2ba35c),Imported[_0x536543(0x3c9)]&&this['initElementStatusCore'](),this['clearBattleCoreData'](),this['setupBattleCoreData'](),Imported[_0x536543(0x3c9)]&&this[_0x536543(0x6e3)]();},Game_Enemy[_0x2e20ee(0x112)]['clearBattleCoreData']=function(){const _0x216d65=_0x2e20ee,_0x8f4f96=VisuMZ[_0x216d65(0x17b)][_0x216d65(0x1bf)][_0x216d65(0x692)];this[_0x216d65(0x2a7)]=_0x8f4f96[_0x216d65(0x184)],this[_0x216d65(0x5af)]={};},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0xcb)]=function(){const _0x2b0db6=_0x2e20ee,_0x3bcb91=VisuMZ[_0x2b0db6(0x17b)][_0x2b0db6(0x1bf)][_0x2b0db6(0x692)],_0x450c8d=this[_0x2b0db6(0x62d)]()[_0x2b0db6(0x37b)];this['_svBattlerData']={'name':'','wtypeId':_0x3bcb91['WtypeId'],'collapse':_0x3bcb91[_0x2b0db6(0x66a)],'motionIdle':_0x3bcb91[_0x2b0db6(0x7d4)],'width':_0x3bcb91[_0x2b0db6(0x58e)]||0x40,'height':_0x3bcb91['Height']||0x40,'anchorX':_0x3bcb91[_0x2b0db6(0x57a)]||0x0,'anchorY':_0x3bcb91['AnchorY']||0x0,'shadow':_0x3bcb91[_0x2b0db6(0x2fc)]};_0x450c8d[_0x2b0db6(0x26f)](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x2b0db6(0x2a7)]=Number(RegExp['$1']));const _0x1d54cd=this[_0x2b0db6(0x5af)];if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW BATTLER: (.*)>/i))_0x1d54cd['name']=String(RegExp['$1']);else{if(_0x450c8d['match'](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){const _0x82e207=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x2b0db6(0x650)]('');_0x1d54cd[_0x2b0db6(0x2e8)]=DataManager[_0x2b0db6(0x2d0)](_0x82e207);}}_0x450c8d['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0x1d54cd[_0x2b0db6(0x50b)]=eval(RegExp['$1']),_0x1d54cd[_0x2b0db6(0x25a)]=eval(RegExp['$2']));if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW COLLAPSE>/i))_0x1d54cd[_0x2b0db6(0x432)]=!![];else _0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW NO COLLAPSE>/i)&&(_0x1d54cd[_0x2b0db6(0x432)]=![]);if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW SHOW SHADOW>/i))_0x1d54cd['shadow']=!![];else _0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW HIDE SHADOW>/i)&&(_0x1d54cd['shadow']=![]);if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW IDLE MOTION: (.*)>/i))_0x1d54cd[_0x2b0db6(0x249)]=String(RegExp['$1'])['toLowerCase']()[_0x2b0db6(0x762)]();else{if(_0x450c8d['match'](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){const _0x52102f=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x2b0db6(0x650)]('');_0x1d54cd['motionIdle']=DataManager[_0x2b0db6(0x2d0)](_0x52102f);}}_0x450c8d['match'](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)&&(_0x1d54cd[_0x2b0db6(0x71d)]=Number(RegExp['$1']),_0x1d54cd[_0x2b0db6(0x6cf)]=Number(RegExp['$2']));if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW WEAPON: (.*)>/i))_0x1d54cd['wtypeId']=DataManager[_0x2b0db6(0x6b8)](RegExp['$1']);else{if(_0x450c8d[_0x2b0db6(0x26f)](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x634af0=String(RegExp['$1'])[_0x2b0db6(0x439)](/[\r\n]+/)[_0x2b0db6(0x650)](''),_0x44b22d=DataManager['processRandomizedData'](_0x634af0);_0x1d54cd[_0x2b0db6(0x702)]=DataManager['getWtypeIdWithName'](_0x44b22d);}}if(Imported[_0x2b0db6(0x3c9)]){const _0x210b9e=this[_0x2b0db6(0x5b8)]();for(const _0x374b92 of _0x210b9e){const _0x365116=this[_0x2b0db6(0x748)](_0x374b92)[_0x2b0db6(0x7d9)][_0x2b0db6(0x6f8)]()['trim'](),_0x36415e=_0x374b92[_0x2b0db6(0x6f8)]()[_0x2b0db6(0x762)]();if(_0x450c8d[_0x2b0db6(0x26f)](VisuMZ[_0x2b0db6(0x80b)][_0x2b0db6(0xcc)]['SvBattlerSolo-%1-%2'['format'](_0x36415e,_0x365116)]))_0x1d54cd[_0x2b0db6(0x2e8)]=String(RegExp['$1']);else{if(_0x450c8d[_0x2b0db6(0x26f)](VisuMZ[_0x2b0db6(0x80b)]['RegExp'][_0x2b0db6(0x417)['format'](_0x36415e,_0x365116)])){const _0x35c19a=String(RegExp['$1'])[_0x2b0db6(0x439)](/[\r\n]+/)[_0x2b0db6(0x650)]('');_0x1d54cd[_0x2b0db6(0x2e8)]=DataManager[_0x2b0db6(0x2d0)](_0x35c19a);}}if(_0x450c8d['match'](VisuMZ[_0x2b0db6(0x80b)][_0x2b0db6(0xcc)]['SvWeaponSolo-%1-%2'[_0x2b0db6(0x483)](_0x36415e,_0x365116)]))_0x1d54cd[_0x2b0db6(0x702)]=DataManager['getWtypeIdWithName'](RegExp['$1']);else{if(_0x450c8d[_0x2b0db6(0x26f)](VisuMZ[_0x2b0db6(0x80b)][_0x2b0db6(0xcc)][_0x2b0db6(0x202)[_0x2b0db6(0x483)](_0x36415e,_0x365116)])){const _0x2d2b6d=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x2b0db6(0x650)](''),_0x56fbb5=DataManager['processRandomizedData'](_0x2d2b6d);_0x1d54cd[_0x2b0db6(0x702)]=DataManager[_0x2b0db6(0x6b8)](_0x56fbb5);}}if(_0x450c8d['match'](VisuMZ[_0x2b0db6(0x80b)][_0x2b0db6(0xcc)][_0x2b0db6(0x455)[_0x2b0db6(0x483)](_0x36415e,_0x365116)]))_0x1d54cd[_0x2b0db6(0x249)]=String(RegExp['$1'])[_0x2b0db6(0x1fe)]()[_0x2b0db6(0x762)]();else{if(_0x450c8d[_0x2b0db6(0x26f)](VisuMZ['ElementStatusCore'][_0x2b0db6(0xcc)][_0x2b0db6(0x815)['format'](_0x36415e,_0x365116)])){const _0x3ae818=String(RegExp['$1'])[_0x2b0db6(0x439)](/[\r\n]+/)[_0x2b0db6(0x650)]('');_0x1d54cd[_0x2b0db6(0x249)]=DataManager['processRandomizedData'](_0x3ae818);}}}}},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x7eb)]=function(){const _0x5757ee=_0x2e20ee;return this[_0x5757ee(0x2a7)]||0x0;},Game_Enemy['prototype'][_0x2e20ee(0x7c4)]=function(){return 0x0;},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x599)]=function(){const _0x521e91=_0x2e20ee;if(this['enemy']()[_0x521e91(0x37b)][_0x521e91(0x26f)](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x521e91(0x112)][_0x521e91(0x599)][_0x521e91(0x7c6)](this);},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x2d9)]=function(){const _0x445159=_0x2e20ee;if(this[_0x445159(0x62d)]()['note'][_0x445159(0x26f)](/<BATTLER SPRITE GROUNDED>/i))return!![];return![];},Game_Enemy['prototype'][_0x2e20ee(0x162)]=function(){const _0x117785=_0x2e20ee,_0x4cc8a4=[];for(const _0xa659f6 of this[_0x117785(0x62d)]()[_0x117785(0x169)]){const _0x2c7906=$dataSkills[_0xa659f6[_0x117785(0x33b)]];if(_0x2c7906&&!_0x4cc8a4[_0x117785(0x60c)](_0x2c7906))_0x4cc8a4[_0x117785(0x4d5)](_0x2c7906);}return _0x4cc8a4;},Game_Enemy['prototype']['battleUIOffsetX']=function(){const _0x145f0d=_0x2e20ee;let _0x59ed98=_0x145f0d(0x3cd);if(this[_0x145f0d(0x186)](_0x59ed98))return this['_cache'][_0x59ed98];return this[_0x145f0d(0x797)][_0x59ed98]=this[_0x145f0d(0x2d2)](this[_0x145f0d(0x62d)]()),this['_cache'][_0x59ed98];},Game_Enemy['prototype'][_0x2e20ee(0x5c4)]=function(){const _0x14f80f=_0x2e20ee;let _0x523090=_0x14f80f(0x5c4);if(this['checkCacheKey'](_0x523090))return this[_0x14f80f(0x797)][_0x523090];return this[_0x14f80f(0x797)][_0x523090]=this[_0x14f80f(0x7e4)](this[_0x14f80f(0x62d)]()),this[_0x14f80f(0x797)][_0x523090];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x4b7)]=function(){const _0x1b9992=_0x2e20ee;if(this[_0x1b9992(0x5af)]!==undefined)return this[_0x1b9992(0x5af)];return this[_0x1b9992(0xcb)](),this[_0x1b9992(0x5af)];},Game_Enemy[_0x2e20ee(0x112)]['hasSvBattler']=function(){const _0x2a0505=_0x2e20ee;return this[_0x2a0505(0x4b7)]()[_0x2a0505(0x2e8)]!=='';},Game_Enemy[_0x2e20ee(0x112)]['svBattlerName']=function(){const _0x2ba0d8=_0x2e20ee;return this[_0x2ba0d8(0x4b7)]()[_0x2ba0d8(0x2e8)];},Game_Enemy['prototype'][_0x2e20ee(0x742)]=function(){const _0x583173=_0x2e20ee;return this[_0x583173(0x3e1)]()?VisuMZ[_0x583173(0x17b)][_0x583173(0x1bf)][_0x583173(0x47d)][_0x583173(0x7cb)]:VisuMZ[_0x583173(0x17b)][_0x583173(0x1bf)][_0x583173(0x692)][_0x583173(0x7cb)];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x737)]=function(_0x3cbb23){const _0x1fb3b3=_0x2e20ee;Game_Battler[_0x1fb3b3(0x112)][_0x1fb3b3(0x737)][_0x1fb3b3(0x7c6)](this,_0x3cbb23);if(this[_0x1fb3b3(0x3e1)]())this[_0x1fb3b3(0x46c)](_0x3cbb23);},Game_Enemy['prototype'][_0x2e20ee(0x6be)]=function(){const _0x34d111=_0x2e20ee,_0x348d80=this[_0x34d111(0x4b7)]()[_0x34d111(0x702)]||0x0,_0x8e8da3=$dataSystem[_0x34d111(0x600)][_0x348d80];if(_0x8e8da3){if(_0x8e8da3[_0x34d111(0x78e)]===0x0)this[_0x34d111(0x309)](_0x34d111(0x2b9));else{if(_0x8e8da3[_0x34d111(0x78e)]===0x1)this['requestMotion']('swing');else _0x8e8da3[_0x34d111(0x78e)]===0x2&&this['requestMotion'](_0x34d111(0x653));}}},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x711)]=function(){const _0x1aede9=_0x2e20ee,_0x356439=this['svBattlerData']()[_0x1aede9(0x702)]||0x0,_0x155bec=$dataSystem[_0x1aede9(0x600)][_0x356439];_0x155bec&&this[_0x1aede9(0x34c)](_0x155bec[_0x1aede9(0x70b)]);},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x422)]=function(){const _0x57344=_0x2e20ee,_0x4d90a6=this[_0x57344(0x4b7)]()[_0x57344(0x702)]||0x0;return $dataSystem['attackMotions'][_0x4d90a6];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x5c1)]=function(){const _0x38315e=_0x2e20ee;Game_Battler[_0x38315e(0x112)][_0x38315e(0x5c1)][_0x38315e(0x7c6)](this),this[_0x38315e(0x106)]()&&this[_0x38315e(0x3e1)]()&&this[_0x38315e(0x309)](_0x38315e(0x5bc)),SoundManager[_0x38315e(0x418)]();},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x24c)]=function(){const _0x44297e=_0x2e20ee;Game_Battler['prototype']['performEvasion'][_0x44297e(0x7c6)](this),this[_0x44297e(0x309)](_0x44297e(0x193));},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x2ea)]=function(){const _0x2e735f=_0x2e20ee;Game_Battler[_0x2e735f(0x112)][_0x2e735f(0x2ea)][_0x2e735f(0x7c6)](this),this[_0x2e735f(0x309)](_0x2e735f(0x193));},Game_Enemy[_0x2e20ee(0x112)]['performCounter']=function(){const _0x26a03a=_0x2e20ee;Game_Battler[_0x26a03a(0x112)][_0x26a03a(0x3bd)]['call'](this),this[_0x26a03a(0x6be)]();},Game_Enemy[_0x2e20ee(0x112)]['allowCollapse']=function(){const _0x197d81=_0x2e20ee;if(this[_0x197d81(0x3e1)]()){if(this[_0x197d81(0x46f)]()>=0x1)return!![];return this[_0x197d81(0x4b7)]()[_0x197d81(0x432)];}else return!![];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x6cd)]=function(){const _0x48c0ee=_0x2e20ee;return this[_0x48c0ee(0x4b7)]()['anchorX'];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x7e6)]=function(){const _0x3fabf1=_0x2e20ee;return this[_0x3fabf1(0x4b7)]()[_0x3fabf1(0x25a)];},Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x623)]=function(){const _0x4a99ae=_0x2e20ee;return this[_0x4a99ae(0x4b7)]()[_0x4a99ae(0x738)];},VisuMZ['BattleCore'][_0x2e20ee(0x3f3)]=Game_Enemy[_0x2e20ee(0x112)]['transform'],Game_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x7c0)]=function(_0x3547cf){const _0xd4d9fa=_0x2e20ee;VisuMZ[_0xd4d9fa(0x17b)][_0xd4d9fa(0x3f3)][_0xd4d9fa(0x7c6)](this,_0x3547cf),this[_0xd4d9fa(0x3ce)](),this[_0xd4d9fa(0xcb)]();const _0x39ffcf=this[_0xd4d9fa(0x7ec)]();if(_0x39ffcf)_0x39ffcf[_0xd4d9fa(0x549)](this);},Game_Unit[_0x2e20ee(0x112)][_0x2e20ee(0x1e2)]=function(_0x273348){const _0x408fd6=_0x2e20ee;for(const _0x4609b5 of this[_0x408fd6(0xbb)]()){if(_0x4609b5)_0x4609b5['processBattleCoreJS'](_0x273348);}},Game_Unit[_0x2e20ee(0x112)][_0x2e20ee(0x5ab)]=function(){const _0x50bcd3=_0x2e20ee,_0x5421f5=this[_0x50bcd3(0x11b)]();return _0x5421f5[Math[_0x50bcd3(0x187)](_0x5421f5[_0x50bcd3(0x5c2)])];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x20d)]=Game_Party[_0x2e20ee(0x112)][_0x2e20ee(0x4ed)],Game_Party['prototype']['addActor']=function(_0x55cf3f){const _0x12abf2=_0x2e20ee;VisuMZ[_0x12abf2(0x17b)][_0x12abf2(0x20d)][_0x12abf2(0x7c6)](this,_0x55cf3f),BattleManager[_0x12abf2(0x4f0)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5f7)]=Game_Party['prototype'][_0x2e20ee(0x5a9)],Game_Party[_0x2e20ee(0x112)][_0x2e20ee(0x5a9)]=function(_0x6b698a){const _0x3ec61a=_0x2e20ee;VisuMZ[_0x3ec61a(0x17b)][_0x3ec61a(0x5f7)]['call'](this,_0x6b698a),BattleManager[_0x3ec61a(0x4f0)]();},VisuMZ['BattleCore'][_0x2e20ee(0x3b6)]=Game_Troop['prototype']['setup'],Game_Troop[_0x2e20ee(0x112)]['setup']=function(_0x5127ed){const _0x47eafa=_0x2e20ee;$gameTemp[_0x47eafa(0x394)](),$gameTemp['applyForcedGameTroopSettingsBattleCore'](_0x5127ed),VisuMZ[_0x47eafa(0x17b)][_0x47eafa(0x3b6)][_0x47eafa(0x7c6)](this,_0x5127ed);},VisuMZ[_0x2e20ee(0x17b)]['Game_Map_setupBattleback']=Game_Map[_0x2e20ee(0x112)][_0x2e20ee(0x46d)],Game_Map[_0x2e20ee(0x112)][_0x2e20ee(0x46d)]=function(){const _0x3bfd50=_0x2e20ee;VisuMZ[_0x3bfd50(0x17b)][_0x3bfd50(0x1f3)]['call'](this),this['setupBattlebackBattleCore']();},Game_Map[_0x2e20ee(0x112)][_0x2e20ee(0x1b7)]=function(){const _0x306243=_0x2e20ee;this[_0x306243(0x589)]={},this[_0x306243(0x19d)]={};if(!$dataMap)return;const _0x490e0a=$dataMap[_0x306243(0x37b)];if(!_0x490e0a)return;const _0x2a9ad6=_0x490e0a[_0x306243(0x26f)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x2a9ad6)for(const _0xc506d of _0x2a9ad6){_0xc506d[_0x306243(0x26f)](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x2cf754=Number(RegExp['$1']),_0x271519=Number(RegExp['$2']),_0x3f9c9c=_0x271519===0x1?this[_0x306243(0x589)]:this[_0x306243(0x19d)],_0x2cb008=String(RegExp['$3']);_0x3f9c9c[_0x2cf754]=_0x2cb008;}},VisuMZ['BattleCore']['Game_Map_battleback1Name']=Game_Map[_0x2e20ee(0x112)][_0x2e20ee(0x32b)],Game_Map[_0x2e20ee(0x112)][_0x2e20ee(0x32b)]=function(){const _0x33264c=_0x2e20ee;if(!BattleManager['isBattleTest']()){const _0x2360ba=$gamePlayer[_0x33264c(0x1bb)]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x33264c(0x589)]&&this[_0x33264c(0x589)][_0x2360ba])return this['_regionBattleback1'][_0x2360ba];}return VisuMZ[_0x33264c(0x17b)][_0x33264c(0x2b1)]['call'](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x647)]=Game_Map['prototype']['battleback2Name'],Game_Map[_0x2e20ee(0x112)]['battleback2Name']=function(){const _0x10c9cc=_0x2e20ee;if(!BattleManager[_0x10c9cc(0x6d7)]()){const _0xa90d11=$gamePlayer['regionId']($gamePlayer['x'],$gamePlayer['y']);if(this[_0x10c9cc(0x589)]&&this['_regionBattleback2'][_0xa90d11])return this['_regionBattleback2'][_0xa90d11];}return VisuMZ['BattleCore'][_0x10c9cc(0x647)][_0x10c9cc(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x73a)]=Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x3c0)],Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x3c0)]=function(_0x180a74){const _0x2b1084=_0x2e20ee;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x2b1084(0x17b)]['Game_Interpreter_PluginCommand'][_0x2b1084(0x7c6)](this,_0x180a74);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4cb)]=Game_Interpreter['prototype'][_0x2e20ee(0x289)],Game_Interpreter['prototype'][_0x2e20ee(0x289)]=function(){const _0x16dafe=_0x2e20ee;if(SceneManager[_0x16dafe(0x14c)]())switch(this[_0x16dafe(0x160)]){case _0x16dafe(0x11d):if(Imported[_0x16dafe(0x340)]){if($gameScreen[_0x16dafe(0x5f9)]()['angleDuration']>0x0)return!![];this[_0x16dafe(0x160)]='';}break;case'battleAnimation':if(BattleManager[_0x16dafe(0x2af)]['isAnimationPlaying']())return!![];this[_0x16dafe(0x160)]='';break;case _0x16dafe(0x584):if(Imported[_0x16dafe(0x340)]){if($gameScreen[_0x16dafe(0x5f9)]()[_0x16dafe(0x7fc)]>0x0)return!![];if($gameScreen[_0x16dafe(0x5f9)]()[_0x16dafe(0x7aa)]>0x0)return!![];this['_waitMode']='';}break;case _0x16dafe(0x5b7):if(BattleManager[_0x16dafe(0x2af)][_0x16dafe(0x740)]())return!![];this[_0x16dafe(0x160)]='';break;case _0x16dafe(0x354):if(BattleManager[_0x16dafe(0x2af)][_0x16dafe(0x315)]())return!![];this[_0x16dafe(0x160)]='';break;case'battleJump':if(BattleManager[_0x16dafe(0x2af)]['isAnyoneJumping']())return!![];this['_waitMode']='';break;case _0x16dafe(0x264):if(BattleManager[_0x16dafe(0x683)][_0x16dafe(0x41c)]())return!![];this[_0x16dafe(0x160)]='';break;case'battleMove':if(BattleManager[_0x16dafe(0x2af)]['isAnyoneMoving']())return!![];this[_0x16dafe(0x160)]='';break;case'battleOpacity':if(BattleManager[_0x16dafe(0x2af)][_0x16dafe(0x725)]())return!![];this[_0x16dafe(0x160)]='';break;case _0x16dafe(0x743):if(BattleManager[_0x16dafe(0x2af)][_0x16dafe(0x799)]())return!![];this[_0x16dafe(0x160)]='';break;case _0x16dafe(0x6bf):if(BattleManager['_spriteset'][_0x16dafe(0x2c1)]())return!![];this[_0x16dafe(0x160)]='';break;case'battleProjectiles':if(Imported[_0x16dafe(0x10e)]){if(BattleManager['_spriteset'][_0x16dafe(0x46e)]())return!![];this[_0x16dafe(0x160)]='';}break;case _0x16dafe(0x2ba):if(Imported[_0x16dafe(0x340)]){if($gameScreen[_0x16dafe(0x5f9)]()['skewDuration']>0x0)return!![];this[_0x16dafe(0x160)]='';}break;case _0x16dafe(0x643):if(BattleManager[_0x16dafe(0x2af)][_0x16dafe(0x183)]())return!![];this[_0x16dafe(0x160)]='';break;case _0x16dafe(0x39a):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen['battleCameraData']()[_0x16dafe(0x338)]>0x0)return!![];this['_waitMode']='';}break;}return VisuMZ['BattleCore'][_0x16dafe(0x4cb)][_0x16dafe(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x301)]=Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x4c4)],Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x4c4)]=function(_0x1fee10){const _0x560442=_0x2e20ee;return!$gameParty[_0x560442(0x5a5)]()?this[_0x560442(0x2cd)](_0x1fee10):VisuMZ[_0x560442(0x17b)][_0x560442(0x301)][_0x560442(0x7c6)](this,_0x1fee10);},Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x287)]=function(_0x2d663f){const _0x1ed639=_0x2e20ee;return VisuMZ[_0x1ed639(0x17b)][_0x1ed639(0x301)][_0x1ed639(0x7c6)](this,_0x2d663f),BattleManager['setEventCallback'](_0x419181=>{const _0x55f138=_0x1ed639;this[_0x55f138(0x58d)][this[_0x55f138(0x7d6)]]=_0x419181;}),!![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5d5)]=function(_0x5aaebd){const _0x562926=_0x2e20ee,_0x519ccb=$dataCommonEvents[_0x5aaebd];if(!_0x519ccb)return![];if(_0x519ccb[_0x562926(0x56a)][_0x562926(0x5c2)]<=0x1)return![];return!![];},Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x2cd)]=function(_0x14e578){const _0x39ee98=_0x2e20ee,_0x2d1993=VisuMZ[_0x39ee98(0x17b)]['Settings'][_0x39ee98(0x520)],_0xc6f886=_0x2d1993['BattleStartEvent'],_0x1e6600=$dataCommonEvents[_0xc6f886];if(_0x1e6600&&VisuMZ[_0x39ee98(0x17b)][_0x39ee98(0x5d5)](_0xc6f886)){const _0x59dd0b=this[_0x39ee98(0xe3)]()?this['_eventId']:0x0,_0x31db50=_0x1e6600[_0x39ee98(0x56a)];this[_0x39ee98(0x685)](_0x31db50,_0x59dd0b),this[_0x39ee98(0x484)]=JsonEx[_0x39ee98(0x311)](this['_list']);const _0x4f0f74={'code':0xbc3,'indent':0x0,'parameters':JsonEx['makeDeepCopy'](_0x14e578)};return this[_0x39ee98(0x484)][_0x39ee98(0x215)](this['_index']+0x1,0x0,_0x4f0f74),!![];}else return VisuMZ[_0x39ee98(0x17b)][_0x39ee98(0x301)]['call'](this,_0x14e578);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5e3)]=BattleManager[_0x2e20ee(0x4dc)],BattleManager[_0x2e20ee(0x4dc)]=function(){const _0x33621d=_0x2e20ee;VisuMZ[_0x33621d(0x17b)][_0x33621d(0x5e3)][_0x33621d(0x7c6)](this),this['onEncounterBattleCore']();},BattleManager[_0x2e20ee(0x4d8)]=function(){const _0x5390da=_0x2e20ee,_0x180579=VisuMZ[_0x5390da(0x17b)][_0x5390da(0x1bf)][_0x5390da(0x520)],_0xf820ef=_0x180579[_0x5390da(0x73d)];_0xf820ef&&VisuMZ['BattleCore'][_0x5390da(0x5d5)](_0xf820ef)&&(this['_battleCoreBattleStartEvent']=!![],$gameTemp[_0x5390da(0x632)](_0x180579[_0x5390da(0x73d)]),$gameMap[_0x5390da(0x200)](),$gameMap[_0x5390da(0x482)][_0x5390da(0x640)]=!![]),_0x180579['DefeatEvent']>0x0&&(this[_0x5390da(0x344)]=!![]);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x747)]=Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x204)],Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x204)]=function(){const _0x398765=_0x2e20ee;BattleManager[_0x398765(0x709)]?this['battleCorePreBattleCommonEvent']():VisuMZ[_0x398765(0x17b)]['Scene_Map_launchBattle'][_0x398765(0x7c6)](this);},Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x325)]=function(){const _0x250060=_0x2e20ee;this[_0x250060(0x19f)]=!![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x37c)]=SceneManager[_0x2e20ee(0x625)],SceneManager['isSceneChanging']=function(){const _0x37f6fb=_0x2e20ee;if(BattleManager[_0x37f6fb(0x709)])return![];return VisuMZ[_0x37f6fb(0x17b)]['SceneManager_isSceneChanging'][_0x37f6fb(0x7c6)](this);},VisuMZ['BattleCore'][_0x2e20ee(0x1a8)]=Game_Interpreter['prototype'][_0x2e20ee(0x454)],Game_Interpreter[_0x2e20ee(0x112)]['terminate']=function(){const _0x5521d3=_0x2e20ee;VisuMZ[_0x5521d3(0x17b)]['Game_Interpreter_terminate'][_0x5521d3(0x7c6)](this),this[_0x5521d3(0x640)]&&(this[_0x5521d3(0x640)]=undefined,SceneManager['_scene']['battleCoreResumeLaunchBattle']());},Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x2da)]=function(){BattleManager['_battleCoreBattleStartEvent']=undefined,this['stop']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0xfb)]=Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x527)],Scene_Map[_0x2e20ee(0x112)][_0x2e20ee(0x527)]=function(){const _0x5479c9=_0x2e20ee;VisuMZ[_0x5479c9(0x17b)]['Scene_Map_initialize'][_0x5479c9(0x7c6)](this),$gameTemp[_0x5479c9(0x394)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x491)]=Scene_ItemBase[_0x2e20ee(0x112)][_0x2e20ee(0x11c)],Scene_ItemBase[_0x2e20ee(0x112)][_0x2e20ee(0x11c)]=function(){const _0x1803d8=_0x2e20ee;VisuMZ[_0x1803d8(0x17b)][_0x1803d8(0x491)][_0x1803d8(0x7c6)](this),this[_0x1803d8(0x57b)]()[_0x1803d8(0x37b)][_0x1803d8(0x26f)](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x1803d8(0x606)]=[]),DataManager['checkAutoCustomActionSequenceNotetagEffect'](this[_0x1803d8(0x57b)]())&&($gameTemp[_0x1803d8(0x606)]=[]);},VisuMZ[_0x2e20ee(0x17b)]['Scene_Options_maxCommands']=Scene_Options[_0x2e20ee(0x112)][_0x2e20ee(0x6a9)],Scene_Options[_0x2e20ee(0x112)][_0x2e20ee(0x6a9)]=function(){const _0x2e2f50=_0x2e20ee;let _0x592f9f=VisuMZ[_0x2e2f50(0x17b)][_0x2e2f50(0x43c)]['call'](this);const _0x4c322f=VisuMZ[_0x2e2f50(0x17b)]['Settings'];if(_0x4c322f[_0x2e2f50(0x769)][_0x2e2f50(0x532)]&&_0x4c322f[_0x2e2f50(0x769)]['AdjustRect'])_0x592f9f+=0x2;if(_0x4c322f['HpGauge'][_0x2e2f50(0x532)]&&_0x4c322f[_0x2e2f50(0x82e)][_0x2e2f50(0x21c)])_0x592f9f+=0x1;return _0x592f9f;},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x78f)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x3c5)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x3c5)]=function(){const _0x5863fa=_0x2e20ee;SceneManager[_0x5863fa(0x138)]()?(Scene_Message['prototype'][_0x5863fa(0x3c5)][_0x5863fa(0x7c6)](this),this[_0x5863fa(0x2af)]&&this[_0x5863fa(0x2af)][_0x5863fa(0x751)]()):VisuMZ[_0x5863fa(0x17b)][_0x5863fa(0x78f)][_0x5863fa(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6fb)]=Scene_Battle['prototype']['stop'],Scene_Battle[_0x2e20ee(0x112)]['stop']=function(){const _0x4ead9f=_0x2e20ee;SceneManager[_0x4ead9f(0x785)]()?Scene_Message['prototype'][_0x4ead9f(0x35d)][_0x4ead9f(0x7c6)](this):VisuMZ[_0x4ead9f(0x17b)][_0x4ead9f(0x6fb)][_0x4ead9f(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x21f)]=Scene_Battle[_0x2e20ee(0x112)]['terminate'],Scene_Battle['prototype'][_0x2e20ee(0x454)]=function(){const _0x4a9fee=_0x2e20ee;SceneManager[_0x4a9fee(0x785)]()?Scene_Message[_0x4a9fee(0x112)]['terminate'][_0x4a9fee(0x7c6)](this):VisuMZ[_0x4a9fee(0x17b)][_0x4a9fee(0x21f)][_0x4a9fee(0x7c6)](this);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1bd)]=function(){const _0x5c3656=_0x2e20ee;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5c3656(0x39c)]!==undefined)return ConfigManager[_0x5c3656(0x39c)];else{if(this['battleLayoutStyle']()==='border')return![];else{return Scene_Message[_0x5c3656(0x112)][_0x5c3656(0x1bd)][_0x5c3656(0x7c6)](this);;}}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x4f5)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x4c2)],Scene_Battle[_0x2e20ee(0x112)]['createAllWindows']=function(){const _0xf432de=_0x2e20ee;this[_0xf432de(0x6bc)](),VisuMZ[_0xf432de(0x17b)][_0xf432de(0x4f5)][_0xf432de(0x7c6)](this),this[_0xf432de(0x191)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x782)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x69e)],Scene_Battle[_0x2e20ee(0x112)]['createCancelButton']=function(){const _0x38e647=_0x2e20ee;VisuMZ[_0x38e647(0x17b)][_0x38e647(0x782)]['call'](this),this[_0x38e647(0x15e)]()===_0x38e647(0x4c9)&&this['repositionCancelButtonBorderStyle']();},Scene_Battle[_0x2e20ee(0x112)]['setVisibleUI']=function(_0x50b213){const _0xc61e90=_0x2e20ee;_0x50b213?(this['_windowLayer']['x']=(Graphics[_0xc61e90(0x71d)]-Graphics[_0xc61e90(0x1ba)])/0x2,this[_0xc61e90(0x609)]['y']=(Graphics[_0xc61e90(0x6cf)]-Graphics[_0xc61e90(0x7b3)])/0x2):(this[_0xc61e90(0x609)]['x']=Graphics[_0xc61e90(0x71d)]*0xa,this[_0xc61e90(0x609)]['y']=Graphics['height']*0xa);},VisuMZ['BattleCore'][_0x2e20ee(0x7c8)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x12b)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x12b)]=function(){const _0x4c2262=_0x2e20ee,_0x1f4362=BattleManager[_0x4c2262(0x32e)]();VisuMZ[_0x4c2262(0x17b)][_0x4c2262(0x7c8)][_0x4c2262(0x7c6)](this);if(_0x1f4362){if(_0x1f4362===BattleManager['actor']())return;if(_0x1f4362===BattleManager['_subject'])return;if(_0x1f4362[_0x4c2262(0x7ec)]())_0x1f4362[_0x4c2262(0x7ec)]()[_0x4c2262(0x6e5)]();}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6d1)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xe4)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xe4)]=function(){const _0x215a6d=_0x2e20ee,_0x100177=BattleManager[_0x215a6d(0x32e)]();if(_0x100177&&_0x100177[_0x215a6d(0x7ec)])_0x100177[_0x215a6d(0x7ec)]()[_0x215a6d(0x6e5)]();VisuMZ['BattleCore'][_0x215a6d(0x6d1)][_0x215a6d(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x57e)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xff)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xff)]=function(){const _0x441192=_0x2e20ee;if(VisuMZ[_0x441192(0x17b)][_0x441192(0x1bf)][_0x441192(0x690)][_0x441192(0x473)])return VisuMZ[_0x441192(0x17b)][_0x441192(0x1bf)][_0x441192(0x690)][_0x441192(0x473)]['call'](this);return VisuMZ[_0x441192(0x17b)][_0x441192(0x57e)][_0x441192(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)]['Scene_Battle_createPartyCommandWindow']=Scene_Battle['prototype'][_0x2e20ee(0x5eb)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x5eb)]=function(){const _0x3d358c=_0x2e20ee;VisuMZ[_0x3d358c(0x17b)][_0x3d358c(0x318)]['call'](this),this['createPartyCommandWindowBattleCore']();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x297)]=function(){const _0x23587e=_0x2e20ee,_0x5e90fb=this[_0x23587e(0x2f5)];_0x5e90fb[_0x23587e(0x2cc)]('autoBattle',this['commandAutoBattle'][_0x23587e(0x70c)](this)),_0x5e90fb[_0x23587e(0x2cc)]('options',this[_0x23587e(0x6d3)][_0x23587e(0x70c)](this));const _0x5ed51b=this[_0x23587e(0x15e)]();switch(_0x5ed51b){case'xp':case _0x23587e(0x3e0):return this[_0x23587e(0x2f5)][_0x23587e(0x2c6)](0x1);break;}},Scene_Battle['prototype'][_0x2e20ee(0x158)]=function(){const _0xfa702f=_0x2e20ee;BattleManager[_0xfa702f(0x6ba)]=!![],$gameParty[_0xfa702f(0x6de)](),this[_0xfa702f(0x12b)](),BattleManager[_0xfa702f(0x252)]()&&(BattleManager[_0xfa702f(0x3b9)]=![]);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x6d3)]=function(){const _0xdd78fe=_0x2e20ee;this['isQueueOptionsMenu']()?(this[_0xdd78fe(0x436)]=!![],this[_0xdd78fe(0x683)][_0xdd78fe(0x4d5)](_0xdd78fe(0x266),VisuMZ[_0xdd78fe(0x17b)][_0xdd78fe(0x1bf)][_0xdd78fe(0x490)][_0xdd78fe(0x378)])):this['callOptions']();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1a5)]=function(){const _0x28baea=_0x2e20ee;return BattleManager[_0x28baea(0x5c6)]();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x147)]=function(){const _0x2cf28b=_0x2e20ee;this['_callSceneOptions']=![],this[_0x2cf28b(0x2af)][_0x2cf28b(0x751)](),this['_windowLayer']['visible']=![];if(BattleManager[_0x2cf28b(0x6d7)]())($dataSystem['battleback1Name']||$dataSystem[_0x2cf28b(0x246)])&&SceneManager[_0x2cf28b(0x755)]();else($gameMap['battleback1Name']()||$gameMap[_0x2cf28b(0x246)]())&&SceneManager['snapForBackground']();SceneManager[_0x2cf28b(0x4d5)](Scene_Options),BattleManager[_0x2cf28b(0x252)]()&&(BattleManager[_0x2cf28b(0x16c)]=BattleManager[_0x2cf28b(0x32e)]());},VisuMZ['BattleCore'][_0x2e20ee(0x35a)]=Scene_Battle['prototype'][_0x2e20ee(0x6ff)],Scene_Battle['prototype'][_0x2e20ee(0x6ff)]=function(){const _0x5d4b1e=_0x2e20ee;VisuMZ[_0x5d4b1e(0x17b)][_0x5d4b1e(0x35a)][_0x5d4b1e(0x7c6)](this);if(this[_0x5d4b1e(0x436)]&&!BattleManager[_0x5d4b1e(0x3ca)])this[_0x5d4b1e(0x147)]();},Scene_Battle['prototype']['createAutoBattleWindow']=function(){const _0xf1a454=_0x2e20ee,_0x2ef212=this[_0xf1a454(0x68a)]();this[_0xf1a454(0x727)]=new Window_AutoBattleCancel(_0x2ef212),this[_0xf1a454(0x727)][_0xf1a454(0x1fc)](),this['addChild'](this[_0xf1a454(0x727)]);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x68a)]=function(){const _0x5d4cd2=_0x2e20ee;return VisuMZ[_0x5d4cd2(0x17b)]['Settings'][_0x5d4cd2(0x769)][_0x5d4cd2(0x3ae)][_0x5d4cd2(0x7c6)](this);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xbd)]=function(){const _0x3ad219=_0x2e20ee;return VisuMZ[_0x3ad219(0x17b)]['Settings'][_0x3ad219(0x490)]['DisablePartyCmd'];},VisuMZ['BattleCore']['Scene_Battle_startPartyCommandSelection']=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x224)],Scene_Battle['prototype'][_0x2e20ee(0x224)]=function(){const _0x18e0d6=_0x2e20ee;this[_0x18e0d6(0xbd)]()?this[_0x18e0d6(0x1ff)]():VisuMZ[_0x18e0d6(0x17b)][_0x18e0d6(0x321)][_0x18e0d6(0x7c6)](this);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1ff)]=function(){const _0x8a89de=_0x2e20ee;if(BattleManager['isDTB']())this['selectNextCommand']();else BattleManager[_0x8a89de(0x252)]()&&VisuMZ[_0x8a89de(0x17b)][_0x8a89de(0x321)][_0x8a89de(0x7c6)](this);},VisuMZ['BattleCore'][_0x2e20ee(0x306)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1b3)],Scene_Battle['prototype'][_0x2e20ee(0x1b3)]=function(){const _0x45c8cf=_0x2e20ee;BattleManager['isTpb']()?this[_0x45c8cf(0x1b6)]():VisuMZ[_0x45c8cf(0x17b)][_0x45c8cf(0x306)][_0x45c8cf(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype'][_0x2e20ee(0x5bd)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x5bd)]=function(){const _0x4a7492=_0x2e20ee;VisuMZ[_0x4a7492(0x17b)][_0x4a7492(0x7e2)][_0x4a7492(0x7c6)](this),this['createActorCommandWindowBattleCore']();},Scene_Battle['prototype'][_0x2e20ee(0x26c)]=function(){const _0x20d8b2=_0x2e20ee,_0x3bed5a=this['_actorCommandWindow'];_0x3bed5a[_0x20d8b2(0x2cc)]('escape',this[_0x20d8b2(0x2ab)][_0x20d8b2(0x70c)](this)),_0x3bed5a[_0x20d8b2(0x2cc)](_0x20d8b2(0x2e7),this[_0x20d8b2(0x460)]['bind'](this)),_0x3bed5a[_0x20d8b2(0x2cc)]('singleSkill',this[_0x20d8b2(0x349)][_0x20d8b2(0x70c)](this)),BattleManager[_0x20d8b2(0x252)]()&&(this[_0x20d8b2(0xbd)]()?delete _0x3bed5a[_0x20d8b2(0x342)][_0x20d8b2(0x5b3)]:_0x3bed5a['setHandler']('cancel',this[_0x20d8b2(0x546)][_0x20d8b2(0x70c)](this)));},Scene_Battle[_0x2e20ee(0x112)]['actorCommandEscape']=function(){const _0x4ae937=_0x2e20ee;this[_0x4ae937(0x4d7)]();},Scene_Battle[_0x2e20ee(0x112)]['actorCommandAutoBattle']=function(){const _0x4573a4=_0x2e20ee;BattleManager['actor']()[_0x4573a4(0x36f)](),BattleManager[_0x4573a4(0x7ba)](),BattleManager[_0x4573a4(0x447)](),this['changeInputWindow']();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x349)]=function(){const _0x1a8894=_0x2e20ee,_0x4c0a30=BattleManager[_0x1a8894(0x153)]();_0x4c0a30['setSkill'](this[_0x1a8894(0x648)][_0x1a8894(0x196)]()),this[_0x1a8894(0x1b9)]();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x546)]=function(){const _0x2e0507=_0x2e20ee;this[_0x2e0507(0x2f5)][_0x2e0507(0xc7)](),this[_0x2e0507(0x648)][_0x2e0507(0x35f)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x81e)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x612)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x612)]=function(){const _0x4f9989=_0x2e20ee;VisuMZ[_0x4f9989(0x17b)][_0x4f9989(0x81e)][_0x4f9989(0x7c6)](this),this[_0x4f9989(0x203)]();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x203)]=function(){const _0x65e955=_0x2e20ee;this[_0x65e955(0x648)][_0x65e955(0x298)](this[_0x65e955(0x4b5)]),this[_0x65e955(0x2f5)][_0x65e955(0x298)](this['_helpWindow']);},Scene_Battle['prototype'][_0x2e20ee(0x15e)]=function(){const _0x1deede=_0x2e20ee;if($gameTemp[_0x1deede(0x22a)]!==undefined)return $gameTemp[_0x1deede(0x22a)];if(this[_0x1deede(0x550)])return this[_0x1deede(0x550)];return this[_0x1deede(0x550)]=VisuMZ[_0x1deede(0x17b)]['Settings'][_0x1deede(0x41b)][_0x1deede(0x777)][_0x1deede(0x1fe)]()[_0x1deede(0x762)](),this['_battleLayoutStyle'];},VisuMZ['BattleCore'][_0x2e20ee(0x424)]=Scene_Battle[_0x2e20ee(0x112)]['windowAreaHeight'],Scene_Battle['prototype'][_0x2e20ee(0x105)]=function(){const _0x12fa32=_0x2e20ee,_0x529198=this[_0x12fa32(0x15e)]();switch(_0x529198){case _0x12fa32(0x56a):return this[_0x12fa32(0x499)](Math[_0x12fa32(0x376)](0x1,$gameParty[_0x12fa32(0x1e0)]()),!![]);break;default:return VisuMZ['BattleCore'][_0x12fa32(0x424)][_0x12fa32(0x7c6)](this);break;}},VisuMZ[_0x2e20ee(0x17b)]['Scene_Battle_helpWindowRect']=Scene_Battle[_0x2e20ee(0x112)]['helpWindowRect'],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x636)]=function(){const _0x3cbc0d=_0x2e20ee,_0x25da82=this[_0x3cbc0d(0x15e)]();switch(_0x25da82){case _0x3cbc0d(0x4c9):return this['helpWindowRectBorderStyle']();break;case _0x3cbc0d(0x5b4):case _0x3cbc0d(0x56a):case'xp':case _0x3cbc0d(0x3e0):default:return VisuMZ[_0x3cbc0d(0x17b)][_0x3cbc0d(0x152)][_0x3cbc0d(0x7c6)](this);break;}},Scene_Battle[_0x2e20ee(0x112)]['statusWindowRect']=function(){const _0x1f7872=_0x2e20ee,_0x261f30=this['battleLayoutStyle']();switch(_0x261f30){case'xp':case _0x1f7872(0x3e0):return this[_0x1f7872(0x7ea)]();break;case'border':return this['statusWindowRectBorderStyle']();break;case'default':case _0x1f7872(0x56a):default:return this[_0x1f7872(0x21d)]();break;}},VisuMZ[_0x2e20ee(0x17b)]['Scene_Battle_partyCommandWindowRect']=Scene_Battle['prototype'][_0x2e20ee(0x689)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x689)]=function(){const _0x4a0aba=_0x2e20ee,_0x61d496=this[_0x4a0aba(0x15e)]();switch(_0x61d496){case'xp':case _0x4a0aba(0x3e0):return this['partyCommandWindowRectXPStyle']();break;case _0x4a0aba(0x4c9):return this[_0x4a0aba(0x638)]();case _0x4a0aba(0x5b4):case _0x4a0aba(0x56a):default:return this[_0x4a0aba(0x6df)]();break;}},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x6df)]=function(){const _0x28a6b9=_0x2e20ee,_0xc4d3d4=VisuMZ[_0x28a6b9(0x17b)]['Settings'][_0x28a6b9(0x41b)],_0x23cc76=_0xc4d3d4[_0x28a6b9(0x48f)]||0xc0,_0x5c2618=this[_0x28a6b9(0x105)](),_0x50b803=this[_0x28a6b9(0x1bd)]()?Graphics['boxWidth']-_0x23cc76:0x0,_0x1b04d7=Graphics[_0x28a6b9(0x7b3)]-_0x5c2618;return new Rectangle(_0x50b803,_0x1b04d7,_0x23cc76,_0x5c2618);},Scene_Battle['prototype'][_0x2e20ee(0xd5)]=function(){const _0x48536b=_0x2e20ee;return this[_0x48536b(0x689)]();},VisuMZ['BattleCore'][_0x2e20ee(0x406)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x22e)],Scene_Battle['prototype'][_0x2e20ee(0x22e)]=function(){const _0x1c83d0=_0x2e20ee,_0x49f320=this[_0x1c83d0(0x15e)]();switch(_0x49f320){case'xp':case _0x1c83d0(0x3e0):case _0x1c83d0(0x4c9):break;case _0x1c83d0(0x5b4):case _0x1c83d0(0x56a):default:VisuMZ[_0x1c83d0(0x17b)][_0x1c83d0(0x406)][_0x1c83d0(0x7c6)](this);break;}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x35c)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x4ec)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x4ec)]=function(){const _0x26c922=_0x2e20ee;VisuMZ[_0x26c922(0x17b)][_0x26c922(0x35c)][_0x26c922(0x7c6)](this),this[_0x26c922(0x4b6)]();},VisuMZ['BattleCore'][_0x2e20ee(0x178)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x452)],Scene_Battle['prototype']['startEnemySelection']=function(){const _0x205951=_0x2e20ee;VisuMZ[_0x205951(0x17b)][_0x205951(0x178)][_0x205951(0x7c6)](this),this[_0x205951(0x3f6)][_0x205951(0x50f)](),this[_0x205951(0x4b6)]();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x4b6)]=function(){const _0x285fca=_0x2e20ee,_0x266cff=this['battleLayoutStyle']();['xp',_0x285fca(0x3e0),_0x285fca(0x4c9)][_0x285fca(0x60c)](_0x266cff)&&this[_0x285fca(0x648)][_0x285fca(0x35f)](),(_0x266cff===_0x285fca(0x4c9)||this[_0x285fca(0x223)]())&&(this[_0x285fca(0x67a)][_0x285fca(0x35f)](),this[_0x285fca(0x332)]['close']());},VisuMZ['BattleCore'][_0x2e20ee(0x2f6)]=Scene_Battle['prototype']['onActorOk'],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x7c2)]=function(){const _0x5c368d=_0x2e20ee;VisuMZ['BattleCore']['Scene_Battle_onActorOk'][_0x5c368d(0x7c6)](this),this[_0x5c368d(0x1ee)]();},Scene_Battle['prototype']['isNonSubmenuCancel']=function(){const _0x3d941e=_0x2e20ee;return[_0x3d941e(0x1c0),_0x3d941e(0x201),_0x3d941e(0x360)][_0x3d941e(0x60c)](this[_0x3d941e(0x648)][_0x3d941e(0x242)]());},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x3e2)]=Scene_Battle[_0x2e20ee(0x112)]['onActorCancel'],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x564)]=function(){const _0x424504=_0x2e20ee;this[_0x424504(0x233)]()?(this[_0x424504(0x3bb)][_0x424504(0x6ce)](),this[_0x424504(0x2a2)]['hide'](),this[_0x424504(0x648)][_0x424504(0x296)]()):VisuMZ[_0x424504(0x17b)][_0x424504(0x3e2)][_0x424504(0x7c6)](this),this['cancelTargetSelectionVisibility']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x7fb)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1e5)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1e5)]=function(){const _0x498c0f=_0x2e20ee;VisuMZ[_0x498c0f(0x17b)][_0x498c0f(0x7fb)][_0x498c0f(0x7c6)](this),this[_0x498c0f(0x1ee)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6ea)]=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1e1)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1e1)]=function(){const _0x2a4d1c=_0x2e20ee;this[_0x2a4d1c(0x233)]()?(this['_statusWindow'][_0x2a4d1c(0x6ce)](),this['_enemyWindow'][_0x2a4d1c(0x1fc)](),this['_actorCommandWindow']['activate']()):VisuMZ[_0x2a4d1c(0x17b)][_0x2a4d1c(0x6ea)][_0x2a4d1c(0x7c6)](this),this['cancelTargetSelectionVisibility']();},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1ee)]=function(){const _0x2b3fd2=_0x2e20ee,_0x588b6f=this[_0x2b3fd2(0x15e)]();(_0x588b6f===_0x2b3fd2(0x4c9)||this['isSkillItemWindowsMiddle']())&&(this[_0x2b3fd2(0x67a)]['open'](),this[_0x2b3fd2(0x67a)][_0x2b3fd2(0x4d2)]&&this['_skillWindow'][_0x2b3fd2(0x6ce)](),this[_0x2b3fd2(0x332)]['open'](),this[_0x2b3fd2(0x332)][_0x2b3fd2(0x4d2)]&&this['_itemWindow'][_0x2b3fd2(0x6ce)]());},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x6fc)]=function(){const _0x4ce494=_0x2e20ee,_0x34c3dd=this['battleLayoutStyle']();['xp',_0x4ce494(0x3e0),'border'][_0x4ce494(0x60c)](_0x34c3dd)&&this[_0x4ce494(0x648)][_0x4ce494(0x74b)](),this['okTargetSelectionVisibility']();},Scene_Battle['prototype'][_0x2e20ee(0x21d)]=function(){const _0xa5d741=_0x2e20ee,_0x56fa87=VisuMZ[_0xa5d741(0x17b)][_0xa5d741(0x1bf)][_0xa5d741(0x41b)],_0x4e656c=Window_BattleStatus[_0xa5d741(0x112)][_0xa5d741(0x17c)](),_0x140b2c=Graphics[_0xa5d741(0x1ba)]-(_0x56fa87[_0xa5d741(0x48f)]||0xc0),_0x58bf4a=this[_0xa5d741(0x105)]()+_0x4e656c,_0x5b2063=this[_0xa5d741(0x1bd)]()?0x0:Graphics[_0xa5d741(0x1ba)]-_0x140b2c,_0x127dfb=Graphics[_0xa5d741(0x7b3)]-_0x58bf4a+_0x4e656c;return new Rectangle(_0x5b2063,_0x127dfb,_0x140b2c,_0x58bf4a);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x7ea)]=function(){const _0x57d6a9=_0x2e20ee,_0x1397cc=Window_BattleStatus[_0x57d6a9(0x112)][_0x57d6a9(0x17c)](),_0x23224a=Graphics[_0x57d6a9(0x1ba)],_0x1bffb1=this[_0x57d6a9(0x105)]()+_0x1397cc,_0x477149=0x0,_0x4176a7=Graphics[_0x57d6a9(0x7b3)]-_0x1bffb1+_0x1397cc;return new Rectangle(_0x477149,_0x4176a7,_0x23224a,_0x1bffb1);},Scene_Battle[_0x2e20ee(0x112)]['partyCommandWindowRectXPStyle']=function(){const _0x463a72=_0x2e20ee,_0x25275c=Graphics[_0x463a72(0x1ba)]/0x2,_0x37cbc2=this['calcWindowHeight'](VisuMZ[_0x463a72(0x17b)][_0x463a72(0x1bf)][_0x463a72(0x41b)][_0x463a72(0x390)],!![]),_0x17cc5b=Math[_0x463a72(0x603)]((Graphics[_0x463a72(0x1ba)]-_0x25275c)/0x2),_0x8ec7ef=Graphics[_0x463a72(0x7b3)]-_0x37cbc2-this[_0x463a72(0x7ea)]()[_0x463a72(0x6cf)];return new Rectangle(_0x17cc5b,_0x8ec7ef,_0x25275c,_0x37cbc2);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x5e6)]=function(){const _0x315500=_0x2e20ee,_0x4953fe=Graphics['width'],_0x456254=Math[_0x315500(0x603)]((Graphics[_0x315500(0x1ba)]-_0x4953fe)/0x2),_0x288497=this[_0x315500(0x58f)](),_0x3247f9=(Graphics[_0x315500(0x6cf)]-Graphics['boxHeight'])/-0x2;return new Rectangle(_0x456254,_0x3247f9,_0x4953fe,_0x288497);},Scene_Battle[_0x2e20ee(0x112)]['statusWindowRectBorderStyle']=function(){const _0x592e7a=_0x2e20ee,_0x49d895=Graphics[_0x592e7a(0x71d)],_0xdbc530=Math[_0x592e7a(0x603)]((Graphics[_0x592e7a(0x1ba)]-_0x49d895)/0x2),_0x21f84d=this[_0x592e7a(0x499)](0x4,!![]),_0x1a9aa3=Graphics[_0x592e7a(0x7b3)]-_0x21f84d+(Graphics[_0x592e7a(0x6cf)]-Graphics[_0x592e7a(0x7b3)])/0x2;return new Rectangle(_0xdbc530,_0x1a9aa3,_0x49d895,_0x21f84d);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x638)]=function(){const _0x37fcee=_0x2e20ee,_0x5cbb12=Math[_0x37fcee(0x175)](Graphics[_0x37fcee(0x71d)]/0x3),_0x5427a1=this[_0x37fcee(0x1bd)]()?(Graphics[_0x37fcee(0x71d)]+Graphics['boxWidth'])/0x2-_0x5cbb12:(Graphics['width']-Graphics[_0x37fcee(0x1ba)])/-0x2,_0x47b168=this['helpWindowRectBorderStyle'](),_0x3108ab=_0x47b168['y']+_0x47b168[_0x37fcee(0x6cf)],_0x4f4841=this[_0x37fcee(0x813)](),_0x1839d2=_0x4f4841['y']-_0x3108ab;return new Rectangle(_0x5427a1,_0x3108ab,_0x5cbb12,_0x1839d2);},Scene_Battle[_0x2e20ee(0x112)]['skillItemWindowRectBorderStyle']=function(){const _0x43df0c=_0x2e20ee,_0x15d1cf=Math[_0x43df0c(0x1c8)](Graphics[_0x43df0c(0x71d)]/0x3),_0x4d5df4=Math[_0x43df0c(0x603)]((Graphics[_0x43df0c(0x1ba)]-_0x15d1cf)/0x2),_0x1bb6c9=this[_0x43df0c(0x638)](),_0x446775=_0x1bb6c9['y'],_0x127b03=_0x1bb6c9['height'];return new Rectangle(_0x4d5df4,_0x446775,_0x15d1cf,_0x127b03);},Scene_Battle['prototype'][_0x2e20ee(0x562)]=function(){const _0xe28630=_0x2e20ee;this[_0xe28630(0x6eb)]['y']=this[_0xe28630(0x4b5)]['y']+this[_0xe28630(0x4b5)][_0xe28630(0x6cf)],this[_0xe28630(0x1bd)]()?this[_0xe28630(0x15e)]()===_0xe28630(0x4c9)?this[_0xe28630(0x6eb)]['x']=0x8:this[_0xe28630(0x6eb)]['x']=-this['_cancelButton'][_0xe28630(0x71d)]-0x4:this[_0xe28630(0x6eb)]['x']=Graphics['width']-(Graphics[_0xe28630(0x71d)]-Graphics[_0xe28630(0x1ba)])/0x2-this[_0xe28630(0x6eb)]['width']-0x4;},VisuMZ['BattleCore']['Scene_Battle_skillWindowRect']=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1d8)],Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x1d8)]=function(){const _0x54f118=_0x2e20ee;if(this[_0x54f118(0x15e)]()===_0x54f118(0x4c9))return this[_0x54f118(0x4f9)]();else return this[_0x54f118(0x223)]()?this['skillItemWindowRectMiddle']():VisuMZ[_0x54f118(0x17b)]['Scene_Battle_skillWindowRect'][_0x54f118(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)]['Scene_Battle_itemWindowRect']=Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x796)],Scene_Battle[_0x2e20ee(0x112)]['itemWindowRect']=function(){const _0x9e2d15=_0x2e20ee;if(this['battleLayoutStyle']()===_0x9e2d15(0x4c9))return this[_0x9e2d15(0x4f9)]();else return this[_0x9e2d15(0x223)]()?this[_0x9e2d15(0x4d3)]():VisuMZ[_0x9e2d15(0x17b)][_0x9e2d15(0x6f9)][_0x9e2d15(0x7c6)](this);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x223)]=function(){const _0x2f9ffe=_0x2e20ee;return VisuMZ[_0x2f9ffe(0x17b)][_0x2f9ffe(0x1bf)][_0x2f9ffe(0x41b)][_0x2f9ffe(0xdf)];},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x4d3)]=function(){const _0xbfbb2b=_0x2e20ee,_0x115cc4=Sprite_Button[_0xbfbb2b(0x112)]['blockWidth']()*0x2+0x4;let _0x578b09=Graphics[_0xbfbb2b(0x1ba)]-_0x115cc4;Imported[_0xbfbb2b(0x540)]&&SceneManager[_0xbfbb2b(0x64a)]()&&(_0x578b09+=_0x115cc4);const _0xc23177=this['helpAreaBottom'](),_0x2f462b=Graphics[_0xbfbb2b(0x7b3)]-_0xc23177-this[_0xbfbb2b(0x7db)]()['height']+Window_BattleStatus[_0xbfbb2b(0x112)][_0xbfbb2b(0x17c)](),_0x1ed85a=0x0;return new Rectangle(_0x1ed85a,_0xc23177,_0x578b09,_0x2f462b);},Scene_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x6bc)]=function(){const _0x31ffa6=_0x2e20ee;this[_0x31ffa6(0x76d)]=new Sprite(),this['_enemyNameContainer']['x']=this['_windowLayer']['x'],this[_0x31ffa6(0x76d)]['y']=this[_0x31ffa6(0x609)]['y'];const _0x450b2e=this['children']['indexOf'](this[_0x31ffa6(0x609)]);this[_0x31ffa6(0x741)](this[_0x31ffa6(0x76d)],_0x450b2e);for(let _0x355f19=0x0;_0x355f19<0x8;_0x355f19++){const _0x5e4174=new Window_EnemyName(_0x355f19);this['_enemyNameContainer'][_0x31ffa6(0xf9)](_0x5e4174);}},Sprite_Battler['_motionSpeed']=VisuMZ[_0x2e20ee(0x17b)]['Settings'][_0x2e20ee(0x47d)][_0x2e20ee(0x48b)],VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5d8)]=Sprite_Battler['prototype'][_0x2e20ee(0x513)],Sprite_Battler[_0x2e20ee(0x112)]['initMembers']=function(){const _0x116914=_0x2e20ee;VisuMZ[_0x116914(0x17b)]['Sprite_Battler_initMembers'][_0x116914(0x7c6)](this),this[_0x116914(0x50a)]();if(this['constructor']===Sprite_Enemy)this[_0x116914(0x31e)]();this[_0x116914(0x1c7)]();},Sprite_Battler[_0x2e20ee(0x112)]['initMembersBattleCore']=function(){const _0x436fcd=_0x2e20ee;this['_baseX']=0x0,this[_0x436fcd(0x4af)]=0x0,this[_0x436fcd(0x1c4)]=0x0,this[_0x436fcd(0x37e)]=0x0,this[_0x436fcd(0x58b)]=0x0,this['_floatWholeDuration']=0x0,this['_floatEasing']=_0x436fcd(0x68f),this[_0x436fcd(0x617)]=0x0,this['_jumpMaxHeight']=0x0,this[_0x436fcd(0x14d)]=0x0,this['_jumpWholeDuration']=0x0,this[_0x436fcd(0x573)]=0xff,this[_0x436fcd(0x514)]=0x0,this[_0x436fcd(0x658)]=0x0,this[_0x436fcd(0x34d)]=_0x436fcd(0x68f),this[_0x436fcd(0x6e2)]=0x0,this[_0x436fcd(0x282)]=0x0,this[_0x436fcd(0x299)]=0x0,this[_0x436fcd(0x165)]=0x0,this[_0x436fcd(0x771)]=_0x436fcd(0x68f),this[_0x436fcd(0x37f)]=!![],this[_0x436fcd(0x664)]=0x0,this[_0x436fcd(0x1ad)]=0x0,this[_0x436fcd(0x5e2)]=0x0,this[_0x436fcd(0x749)]=0x0,this[_0x436fcd(0x216)]=0x0,this[_0x436fcd(0x70d)]=0x0,this[_0x436fcd(0x7ca)]=_0x436fcd(0x68f),this['_growX']=0x1,this['_growY']=0x1,this[_0x436fcd(0x808)]=0x1,this[_0x436fcd(0x5ee)]=0x1,this[_0x436fcd(0x40d)]=0x0,this['_growWholeDuration']=0x0,this[_0x436fcd(0x1e4)]=_0x436fcd(0x68f),this[_0x436fcd(0x686)]=0x1;},Sprite_Battler['prototype'][_0x2e20ee(0x31e)]=function(){const _0x185328=_0x2e20ee;this[_0x185328(0x486)]=new Sprite(),this[_0x185328(0x486)][_0x185328(0x4e1)]=ImageManager[_0x185328(0x450)](_0x185328(0x65a)),this[_0x185328(0x486)][_0x185328(0x4e1)][_0x185328(0x260)]=VisuMZ['BattleCore'][_0x185328(0x1bf)][_0x185328(0x47d)][_0x185328(0x7cb)],this[_0x185328(0x486)][_0x185328(0x555)]['x']=0.5,this[_0x185328(0x486)]['anchor']['y']=0.5,this[_0x185328(0x486)]['y']=-0x2,this[_0x185328(0x486)][_0x185328(0x18b)]=![],this[_0x185328(0xf9)](this[_0x185328(0x486)]);},Sprite_Battler['prototype'][_0x2e20ee(0x1c7)]=function(){const _0x42cde1=_0x2e20ee;this['_distortionSprite']=new Sprite(),this[_0x42cde1(0x7a8)][_0x42cde1(0x555)]['x']=0.5,this[_0x42cde1(0x7a8)]['anchor']['y']=0.5,this[_0x42cde1(0xf9)](this[_0x42cde1(0x7a8)]);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0xfe)]=function(){const _0x585038=_0x2e20ee;if(!this[_0x585038(0x7a8)])return;if(this[_0x585038(0x486)]){const _0x589e1a=this[_0x585038(0x54d)](this[_0x585038(0x7a8)]);this[_0x585038(0x741)](this[_0x585038(0x486)],_0x589e1a),this[_0x585038(0x1dd)]();}this[_0x585038(0x310)]&&this['_distortionSprite'][_0x585038(0xf9)](this[_0x585038(0x310)]),this[_0x585038(0x45b)]&&this[_0x585038(0x7a8)][_0x585038(0xf9)](this['_weaponSprite']),this['_mainSprite']&&this[_0x585038(0x7a8)][_0x585038(0xf9)](this[_0x585038(0x2e6)]),this[_0x585038(0x51c)]&&this[_0x585038(0x7a8)][_0x585038(0xf9)](this[_0x585038(0x51c)]);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x1dd)]=function(){const _0x58891d=_0x2e20ee;if(!this[_0x58891d(0x486)])return;if(this[_0x58891d(0x681)]&&this[_0x58891d(0x681)][_0x58891d(0x623)]()){const _0x57dc3c=this[_0x58891d(0x486)][_0x58891d(0x4e1)];this[_0x58891d(0x486)]['setFrame'](0x0,0x0,_0x57dc3c[_0x58891d(0x71d)],_0x57dc3c['height']);}else this[_0x58891d(0x486)]['setFrame'](0x0,0x0,0x0,0x0);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x4ce)]=function(){const _0x2f5ac0=_0x2e20ee;return SceneManager[_0x2f5ac0(0x14c)]()?SceneManager[_0x2f5ac0(0x4e6)][_0x2f5ac0(0x2af)][_0x2f5ac0(0x62e)]:this[_0x2f5ac0(0x101)];},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x221)]=function(_0x49d24f,_0x17e3f2){const _0x198a90=_0x2e20ee;if(!this[_0x198a90(0x681)][_0x198a90(0x106)]())return;const _0x3ed114=VisuMZ[_0x198a90(0x17b)][_0x198a90(0x1bf)][_0x198a90(0x5c3)],_0x3deb78=new Sprite_Damage();_0x3deb78[_0x198a90(0x539)]=_0x3ed114[_0x198a90(0x53a)],this[_0x198a90(0x3d7)](_0x3deb78),_0x3deb78[_0x198a90(0x221)](_0x49d24f,_0x17e3f2),this['addDamageSprite'](_0x3deb78);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x780)]=function(_0xc451ef,_0x3fb2ac,_0x39c633){const _0x377ded=_0x2e20ee;if(!this[_0x377ded(0x681)]['isSpriteVisible']())return;const _0x51c63a=VisuMZ[_0x377ded(0x17b)][_0x377ded(0x1bf)][_0x377ded(0x5c3)],_0x3b1187=new Sprite_Damage();_0x3b1187[_0x377ded(0x539)]=_0x51c63a[_0x377ded(0x53a)],this[_0x377ded(0x3d7)](_0x3b1187),_0x3b1187['setupIconTextPopup'](_0xc451ef,_0x3fb2ac,_0x39c633),this['addDamageSprite'](_0x3b1187);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x120)]=function(){const _0x4844c5=_0x2e20ee;if(!this[_0x4844c5(0x681)]['isDamagePopupRequested']())return;while(this[_0x4844c5(0x681)]['isDamagePopupRequested']()){this[_0x4844c5(0x681)][_0x4844c5(0x106)]()&&this[_0x4844c5(0x49e)]();}this[_0x4844c5(0x681)]['clearDamagePopup'](),this[_0x4844c5(0x681)][_0x4844c5(0x38c)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x49e)]=function(){const _0x1229c0=_0x2e20ee,_0x232d82=VisuMZ['BattleCore']['Settings']['Damage'],_0x848007=new Sprite_Damage();_0x848007['_duration']=_0x232d82[_0x1229c0(0x53a)],this[_0x1229c0(0x3d7)](_0x848007),_0x848007[_0x1229c0(0xc7)](this['_battler']),_0x848007['setupBattleCore'](this['_battler']),this[_0x1229c0(0x544)](_0x848007);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x544)]=function(_0x400758){const _0x43b86a=_0x2e20ee;this[_0x43b86a(0x41f)][_0x43b86a(0x4d5)](_0x400758);if(this[_0x43b86a(0x5e0)]())SceneManager[_0x43b86a(0x4e6)][_0x43b86a(0x3bb)][_0x43b86a(0x544)](_0x400758,this[_0x43b86a(0x681)]);else{this[_0x43b86a(0x4ce)]()[_0x43b86a(0xf9)](_0x400758);if(SceneManager[_0x43b86a(0x3e9)]())_0x400758[_0x43b86a(0x4e7)]['x']=-0x1;}},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5e0)]=function(){const _0x347412=_0x2e20ee;return!$gameSystem[_0x347412(0xde)]()&&this['_battler']&&this[_0x347412(0x681)][_0x347412(0x13d)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x3d7)]=function(_0x67d570){const _0x5c0ec1=_0x2e20ee,_0x52840d=VisuMZ[_0x5c0ec1(0x17b)][_0x5c0ec1(0x1bf)][_0x5c0ec1(0x5c3)],_0x3b69d6=SceneManager[_0x5c0ec1(0x3e9)]()?-0x1:0x1;let _0x474e79=this['x'],_0x59a834=this['y'];const _0x3fa131=SceneManager[_0x5c0ec1(0x4e6)]['_statusWindow'];if(_0x3fa131&&this[_0x5c0ec1(0x101)]===_0x3fa131){_0x474e79+=_0x3fa131['x']-this[_0x5c0ec1(0x6b5)]();const _0x3a6f0e=_0x3fa131[_0x5c0ec1(0x6b0)]()*0x3/0x4;_0x59a834=_0x3fa131['y']+_0x3a6f0e,_0x59a834=Math[_0x5c0ec1(0x567)](_0x59a834,_0x3fa131['y']+this['y']-this[_0x5c0ec1(0x6cf)]+_0x3a6f0e);}_0x67d570['x']=Math[_0x5c0ec1(0x603)](_0x474e79+this[_0x5c0ec1(0x6b5)]()*_0x3b69d6),_0x67d570['y']=Math[_0x5c0ec1(0x603)](_0x59a834+this['damageOffsetY']());if(_0x52840d[_0x5c0ec1(0x397)])for(const _0x2a8335 of this['_damages']){_0x2a8335['x']+=_0x52840d[_0x5c0ec1(0x6b3)]*_0x3b69d6,_0x2a8335['y']+=_0x52840d[_0x5c0ec1(0x7d5)];}else{const _0xd85f15=this['_damages'][this[_0x5c0ec1(0x41f)]['length']-0x1];_0xd85f15&&(_0x67d570['x']=_0xd85f15['x']+_0x52840d['PopupShiftX']*_0x3b69d6,_0x67d570['y']=_0xd85f15['y']+_0x52840d[_0x5c0ec1(0x7d5)]);}},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Battler_damageOffsetX']=Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x6b5)],Sprite_Battler[_0x2e20ee(0x112)]['damageOffsetX']=function(){const _0x28c365=_0x2e20ee;let _0x45f31f=VisuMZ[_0x28c365(0x17b)]['Sprite_Battler_damageOffsetX'][_0x28c365(0x7c6)](this),_0x3a1b8c=VisuMZ[_0x28c365(0x17b)]['Settings'][_0x28c365(0x5c3)][_0x28c365(0x463)]||0x0;return Math[_0x28c365(0x603)](_0x45f31f+_0x3a1b8c);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5cb)]=Sprite_Battler[_0x2e20ee(0x112)]['damageOffsetY'],Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x2ee)]=function(){const _0x35878f=_0x2e20ee;let _0x48a1f8=VisuMZ[_0x35878f(0x17b)][_0x35878f(0x5cb)][_0x35878f(0x7c6)](this);switch(VisuMZ[_0x35878f(0x17b)]['Settings'][_0x35878f(0x5c3)]['PopupPosition']){case _0x35878f(0x487):_0x48a1f8-=this[_0x35878f(0x6cf)]*this[_0x35878f(0x4e7)]['y'];break;case _0x35878f(0x1cc):_0x48a1f8-=this[_0x35878f(0x6cf)]*this[_0x35878f(0x4e7)]['y']*0.5;break;}let _0xacc0f6=VisuMZ[_0x35878f(0x17b)][_0x35878f(0x1bf)][_0x35878f(0x5c3)][_0x35878f(0x3cb)]||0x0;return Math['round'](_0x48a1f8+_0xacc0f6);},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x6b5)]=function(){const _0x59942c=_0x2e20ee;return Sprite_Battler[_0x59942c(0x112)][_0x59942c(0x6b5)][_0x59942c(0x7c6)](this);},Sprite_Actor['prototype'][_0x2e20ee(0x2ee)]=function(){const _0xe7df8=_0x2e20ee;return Sprite_Battler['prototype'][_0xe7df8(0x2ee)][_0xe7df8(0x7c6)](this);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x7de)]=function(_0x1e3653){const _0x3189ad=_0x2e20ee;this[_0x3189ad(0x5e0)]()?SceneManager[_0x3189ad(0x4e6)][_0x3189ad(0x3bb)]['removeDamageSprite'](_0x1e3653):(this[_0x3189ad(0x4ce)]()['removeChild'](_0x1e3653),this[_0x3189ad(0x41f)][_0x3189ad(0x650)](_0x1e3653),_0x1e3653[_0x3189ad(0x28d)]());},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x34e)]=Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5c0)],Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5c0)]=function(_0x50f026,_0x16c6da){const _0x17c3e4=_0x2e20ee,_0x406ea2=VisuMZ[_0x17c3e4(0x17b)][_0x17c3e4(0x1bf)];if(this[_0x17c3e4(0x177)]===Sprite_Actor)_0x50f026+=_0x406ea2[_0x17c3e4(0x47d)][_0x17c3e4(0x5ad)]||0x0,_0x16c6da+=_0x406ea2[_0x17c3e4(0x47d)][_0x17c3e4(0x451)]||0x0;else this[_0x17c3e4(0x177)]===Sprite_Enemy&&(_0x50f026+=_0x406ea2[_0x17c3e4(0x692)][_0x17c3e4(0x5ad)]||0x0,_0x16c6da+=_0x406ea2[_0x17c3e4(0x692)][_0x17c3e4(0x451)]||0x0);VisuMZ['BattleCore']['Sprite_Battler_setHome'][_0x17c3e4(0x7c6)](this,_0x50f026,_0x16c6da);},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Battler_update']=Sprite_Battler['prototype'][_0x2e20ee(0x751)],Sprite_Battler['prototype'][_0x2e20ee(0x751)]=function(){const _0x50d187=_0x2e20ee;VisuMZ[_0x50d187(0x17b)][_0x50d187(0x68d)][_0x50d187(0x7c6)](this),!this['_battler']&&this['_hpGaugeSprite']&&(this[_0x50d187(0x123)][_0x50d187(0x18b)]=![]);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0xdb)]=Sprite_Battler['prototype'][_0x2e20ee(0x1c9)],Sprite_Battler['prototype'][_0x2e20ee(0x1c9)]=function(){const _0x4f2a08=_0x2e20ee;this[_0x4f2a08(0x31d)](),this['updateSkew'](),this[_0x4f2a08(0x385)](),this[_0x4f2a08(0x610)](),this[_0x4f2a08(0x3f2)](),VisuMZ[_0x4f2a08(0x17b)][_0x4f2a08(0xdb)][_0x4f2a08(0x7c6)](this);if(this[_0x4f2a08(0x177)]===Sprite_Enemy)this['updateShadow']();},VisuMZ['BattleCore'][_0x2e20ee(0x5a0)]=Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x2f1)],Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x2f1)]=function(){const _0x20f8fc=_0x2e20ee;VisuMZ[_0x20f8fc(0x17b)][_0x20f8fc(0x5a0)][_0x20f8fc(0x7c6)](this),this[_0x20f8fc(0x36d)](),this[_0x20f8fc(0x42b)]();},Sprite_Battler['prototype'][_0x2e20ee(0x36d)]=function(){const _0x5267ab=_0x2e20ee;this[_0x5267ab(0x1f7)]=this['x'],this[_0x5267ab(0x4af)]=this['y'],this['updateFloat'](),this[_0x5267ab(0x63c)](),this['x']+=this['extraPositionX'](),this['y']+=this[_0x5267ab(0x18d)](),this['x']=Math['round'](this['x']),this['y']=Math['round'](this['y']);},Sprite_Battler[_0x2e20ee(0x112)]['extraPositionX']=function(){let _0x5c4680=0x0;return _0x5c4680;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x18d)]=function(){const _0x4a721d=_0x2e20ee;let _0x1dc867=0x0;this[_0x4a721d(0x681)]&&!this[_0x4a721d(0x681)]['isBattlerGrounded']()&&(_0x1dc867-=this[_0x4a721d(0x1c4)],_0x1dc867-=this[_0x4a721d(0x617)]);if(this[_0x4a721d(0x7a8)]&&this[_0x4a721d(0x177)]!==Sprite_SvEnemy){const _0x29bfda=this[_0x4a721d(0x7a8)][_0x4a721d(0x4e7)]['y'];_0x1dc867-=(_0x29bfda-0x1)*this[_0x4a721d(0x6cf)];}return _0x1dc867;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x610)]=function(){const _0x3cdae6=_0x2e20ee,_0x46f2ff=this[_0x3cdae6(0x681)]&&this[_0x3cdae6(0x681)][_0x3cdae6(0x386)]();this['_flipScaleX']=(_0x46f2ff?-0x1:0x1)*Math[_0x3cdae6(0x15a)](this['scale']['x']);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x541)]=function(_0x2ecb3b,_0x295923,_0x3e99ba){const _0x2465f8=_0x2e20ee;if(!this['canMove']())return;if(this[_0x2465f8(0x37e)]===_0x2ecb3b)return;this['_targetFloatHeight']=_0x2ecb3b,this[_0x2465f8(0x58b)]=_0x295923,this[_0x2465f8(0x411)]=_0x295923,this[_0x2465f8(0x27b)]=_0x3e99ba||_0x2465f8(0x68f);if(_0x295923<=0x0)this['_floatHeight']=_0x2ecb3b;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x585)]=function(){const _0x4972f7=_0x2e20ee;if(this[_0x4972f7(0x58b)]<=0x0)return;const _0x506c54=this[_0x4972f7(0x58b)],_0x2d645e=this[_0x4972f7(0x411)],_0x3851b4=this[_0x4972f7(0x27b)];Imported[_0x4972f7(0x540)]?this[_0x4972f7(0x1c4)]=this['applyEasing'](this[_0x4972f7(0x1c4)],this[_0x4972f7(0x37e)],_0x506c54,_0x2d645e,_0x3851b4):this[_0x4972f7(0x1c4)]=(this['_floatHeight']*(_0x506c54-0x1)+this[_0x4972f7(0x37e)])/_0x506c54;this['_floatDuration']--;if(this[_0x4972f7(0x58b)]<=0x0)this['onFloatEnd']();},Sprite_Battler[_0x2e20ee(0x112)]['onFloatEnd']=function(){const _0x38434e=_0x2e20ee;this[_0x38434e(0x1c4)]=this[_0x38434e(0x37e)];},Sprite_Battler[_0x2e20ee(0x112)]['isFloating']=function(){const _0xc8b583=_0x2e20ee;return this[_0xc8b583(0x58b)]>0x0;},Sprite_Battler['prototype']['startJump']=function(_0x341e95,_0x4bd535){const _0x380d43=_0x2e20ee;if(!this[_0x380d43(0x768)]())return;if(_0x4bd535<=0x0)return;this[_0x380d43(0x65c)]=_0x341e95,this[_0x380d43(0x14d)]=_0x4bd535,this[_0x380d43(0x3be)]=_0x4bd535;},Sprite_Battler['prototype'][_0x2e20ee(0x63c)]=function(){const _0x20e20f=_0x2e20ee;if(this[_0x20e20f(0x14d)]<=0x0)return;const _0x210a7d=this[_0x20e20f(0x3be)]-this[_0x20e20f(0x14d)],_0x11c33d=this[_0x20e20f(0x3be)]/0x2,_0x19386b=this['_jumpMaxHeight'],_0x4ddeac=-_0x19386b/Math['pow'](_0x11c33d,0x2);this[_0x20e20f(0x617)]=_0x4ddeac*Math[_0x20e20f(0x750)](_0x210a7d-_0x11c33d,0x2)+_0x19386b,this[_0x20e20f(0x14d)]--;if(this['_jumpDuration']<=0x0)return this['onJumpEnd']();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5e5)]=function(){const _0x3d1650=_0x2e20ee;this[_0x3d1650(0x617)]=0x0;},Sprite_Battler['prototype'][_0x2e20ee(0x68b)]=function(){return this['_jumpDuration']>0x0;},Sprite_Battler[_0x2e20ee(0x112)]['startOpacity']=function(_0x15d152,_0x5a6b0a,_0x2cf04f){const _0x4af4a3=_0x2e20ee;if(this[_0x4af4a3(0x573)]===_0x15d152)return;this[_0x4af4a3(0x573)]=_0x15d152,this[_0x4af4a3(0x514)]=_0x5a6b0a,this['_opacityWholeDuration']=_0x5a6b0a,this['_opacityEasing']=_0x2cf04f||_0x4af4a3(0x68f);if(_0x5a6b0a<=0x0)this[_0x4af4a3(0x3af)]=_0x15d152;},Sprite_Battler['prototype'][_0x2e20ee(0x42b)]=function(){const _0x5b4849=_0x2e20ee;if(this[_0x5b4849(0x514)]<=0x0)return;const _0xfc398d=this[_0x5b4849(0x514)],_0x55f07a=this[_0x5b4849(0x658)],_0x5756c3=this[_0x5b4849(0x34d)];Imported['VisuMZ_0_CoreEngine']?this[_0x5b4849(0x3af)]=this[_0x5b4849(0x519)](this[_0x5b4849(0x3af)],this[_0x5b4849(0x573)],_0xfc398d,_0x55f07a,_0x5756c3):this[_0x5b4849(0x3af)]=(this[_0x5b4849(0x3af)]*(_0xfc398d-0x1)+this['_targetOpacity'])/_0xfc398d;this['_opacityDuration']--;if(this[_0x5b4849(0x514)]<=0x0)this[_0x5b4849(0x4e2)]();},Sprite_Battler['prototype'][_0x2e20ee(0x4e2)]=function(){const _0x3ee206=_0x2e20ee;this[_0x3ee206(0x3af)]=this[_0x3ee206(0x573)];},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x604)]=function(){const _0x19ce33=_0x2e20ee;return this[_0x19ce33(0x514)]>0x0;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x4a7)]=function(){const _0x54ba8b=_0x2e20ee;this[_0x54ba8b(0x486)][_0x54ba8b(0x18b)]=this[_0x54ba8b(0x681)]['hasSvBattler'](),this[_0x54ba8b(0xd8)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0xd8)]=function(){const _0x2c2b72=_0x2e20ee;if(!this[_0x2c2b72(0x486)])return;this['_shadowSprite']['y']=Math['round'](-this[_0x2c2b72(0x18d)]()-0x2);},Sprite_Battler['prototype'][_0x2e20ee(0x31d)]=function(){const _0xa93a44=_0x2e20ee;if(this[_0xa93a44(0x177)]===Sprite_SvEnemy)return;this['updateGrow'](),this[_0xa93a44(0x787)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x787)]=function(){const _0x2533ba=_0x2e20ee,_0x670a12=this[_0x2533ba(0x7a8)];_0x670a12&&(_0x670a12[_0x2533ba(0x4e7)]['x']=this[_0x2533ba(0x652)](),_0x670a12[_0x2533ba(0x4e7)]['y']=this[_0x2533ba(0x32d)]());},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x652)]=function(){let _0x3ea0dc=0x1;return _0x3ea0dc*=this['_flipScaleX'],_0x3ea0dc*=this['_growX'],_0x3ea0dc;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x32d)]=function(){return 0x1*this['_growY'];},Sprite_Battler[_0x2e20ee(0x112)]['mainSpriteWidth']=function(){const _0x1b2ce8=_0x2e20ee;return this['width']*this[_0x1b2ce8(0x652)]();},Sprite_Battler[_0x2e20ee(0x112)]['mainSpriteHeight']=function(){const _0x376733=_0x2e20ee;return this[_0x376733(0x6cf)]*this[_0x376733(0x32d)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x472)]=function(_0x285008,_0x586fe7,_0x1ad503,_0x3246f7){const _0x30ce6b=_0x2e20ee;if(!this['canMove']())return;if(!this[_0x30ce6b(0x7a8)])return;if(this['_targetGrowX']===_0x285008&&this[_0x30ce6b(0x5ee)]===_0x586fe7)return;this['_targetGrowX']=_0x285008,this['_targetGrowY']=_0x586fe7,this['_growDuration']=_0x1ad503,this['_growWholeDuration']=_0x1ad503,this['_growEasing']=_0x3246f7||_0x30ce6b(0x68f),_0x1ad503<=0x0&&(this[_0x30ce6b(0x17d)]=this['_targetGrowX'],this[_0x30ce6b(0x5f8)]=this[_0x30ce6b(0x5ee)]);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x1d2)]=function(){const _0x1da57c=_0x2e20ee;if(this[_0x1da57c(0x40d)]<=0x0)return;if(!this['_distortionSprite'])return;const _0x2af4d3=this[_0x1da57c(0x40d)],_0x193960=this[_0x1da57c(0x7c5)],_0x433bdd=this[_0x1da57c(0x1e4)];Imported[_0x1da57c(0x540)]?(this[_0x1da57c(0x17d)]=this[_0x1da57c(0x519)](this[_0x1da57c(0x17d)],this[_0x1da57c(0x808)],_0x2af4d3,_0x193960,_0x433bdd),this[_0x1da57c(0x5f8)]=this[_0x1da57c(0x519)](this[_0x1da57c(0x5f8)],this[_0x1da57c(0x5ee)],_0x2af4d3,_0x193960,_0x433bdd)):(this['_growX']=(this[_0x1da57c(0x17d)]*(_0x2af4d3-0x1)+this[_0x1da57c(0x808)])/_0x2af4d3,this['_growY']=(this[_0x1da57c(0x5f8)]*(_0x2af4d3-0x1)+this[_0x1da57c(0x5ee)])/_0x2af4d3);this['_growDuration']--;if(this['_growDuration']<=0x0)this[_0x1da57c(0x4b1)]();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x4b1)]=function(){const _0x4e1705=_0x2e20ee;this[_0x4e1705(0x17d)]=this[_0x4e1705(0x808)],this[_0x4e1705(0x5f8)]=this[_0x4e1705(0x5ee)];},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x305)]=function(){const _0x1bd2d1=_0x2e20ee;return this[_0x1bd2d1(0x40d)]>0x0;},Sprite_Battler['prototype'][_0x2e20ee(0x6d8)]=function(_0x377f50,_0x1157bf,_0x117267,_0x56cf18){const _0x37aa0b=_0x2e20ee;if(!this[_0x37aa0b(0x768)]())return;if(!this[_0x37aa0b(0x7a8)])return;if(this[_0x37aa0b(0x5e2)]===_0x377f50&&this['_targetSkewY']===_0x1157bf)return;this[_0x37aa0b(0x5e2)]=_0x377f50,this[_0x37aa0b(0x749)]=_0x1157bf,this[_0x37aa0b(0x216)]=_0x117267,this[_0x37aa0b(0x70d)]=_0x117267,this[_0x37aa0b(0x7ca)]=_0x56cf18||_0x37aa0b(0x68f),_0x117267<=0x0&&(this[_0x37aa0b(0x7a8)][_0x37aa0b(0x4d6)]['x']=this[_0x37aa0b(0x5e2)],this[_0x37aa0b(0x7a8)][_0x37aa0b(0x4d6)]['y']=this[_0x37aa0b(0x749)]);},Sprite_Battler[_0x2e20ee(0x112)]['updateSkew']=function(){const _0x2ca677=_0x2e20ee;if(this[_0x2ca677(0x216)]<=0x0)return;if(!this[_0x2ca677(0x7a8)])return;const _0x56885a=this[_0x2ca677(0x216)],_0x3928d3=this[_0x2ca677(0x70d)],_0x37026f=this['_skewEasing'],_0x34b5c4=this[_0x2ca677(0x7a8)];Imported['VisuMZ_0_CoreEngine']?(_0x34b5c4[_0x2ca677(0x4d6)]['x']=this[_0x2ca677(0x519)](_0x34b5c4[_0x2ca677(0x4d6)]['x'],this['_targetSkewX'],_0x56885a,_0x3928d3,_0x37026f),_0x34b5c4[_0x2ca677(0x4d6)]['y']=this[_0x2ca677(0x519)](_0x34b5c4[_0x2ca677(0x4d6)]['y'],this[_0x2ca677(0x749)],_0x56885a,_0x3928d3,_0x37026f)):(_0x34b5c4[_0x2ca677(0x4d6)]['x']=(_0x34b5c4['skew']['x']*(_0x56885a-0x1)+this[_0x2ca677(0x5e2)])/_0x56885a,_0x34b5c4[_0x2ca677(0x4d6)]['y']=(_0x34b5c4[_0x2ca677(0x4d6)]['y']*(_0x56885a-0x1)+this[_0x2ca677(0x749)])/_0x56885a);this['_skewDuration']--;if(this[_0x2ca677(0x216)]<=0x0)this['onSkewEnd']();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x21a)]=function(){const _0x53c528=_0x2e20ee;this[_0x53c528(0x7a8)][_0x53c528(0x4d6)]['x']=this[_0x53c528(0x5e2)],this['_distortionSprite'][_0x53c528(0x4d6)]['y']=this[_0x53c528(0x749)];},Sprite_Battler['prototype'][_0x2e20ee(0x5db)]=function(){const _0x2a1371=_0x2e20ee;return this[_0x2a1371(0x216)]>0x0;},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0xd3)]=function(_0x1d2636,_0x3c2b64,_0x4ff66d,_0x1f60a2){const _0x11bde0=_0x2e20ee;if(!this[_0x11bde0(0x768)]())return;if(!this['_distortionSprite'])return;if(this['_targetAngle']===_0x1d2636)return;this['_targetAngle']=_0x1d2636,this[_0x11bde0(0x299)]=_0x3c2b64,this['_angleWholeDuration']=_0x3c2b64,this['_angleEasing']=_0x4ff66d||_0x11bde0(0x68f),this['_angleRevertOnFinish']=_0x1f60a2,this[_0x11bde0(0x37f)]===undefined&&(this['_angleRevertOnFinish']=!![]),_0x3c2b64<=0x0&&(this[_0x11bde0(0x6e2)]=_0x1d2636,this['_angleRevertOnFinish']&&(this[_0x11bde0(0x282)]=0x0,this['_currentAngle']=0x0));},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x385)]=function(){this['updateAngleCalculations'](),this['applyAngleChange']();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5a8)]=function(){const _0x4cb220=_0x2e20ee;if(this[_0x4cb220(0x299)]<=0x0)return;const _0x188d1a=this['_angleDuration'],_0x301f54=this[_0x4cb220(0x165)],_0x2e2855=this[_0x4cb220(0x771)];Imported[_0x4cb220(0x540)]?this[_0x4cb220(0x6e2)]=this[_0x4cb220(0x519)](this[_0x4cb220(0x6e2)],this[_0x4cb220(0x282)],_0x188d1a,_0x301f54,_0x2e2855):this[_0x4cb220(0x6e2)]=(this[_0x4cb220(0x6e2)]*(_0x188d1a-0x1)+this[_0x4cb220(0x282)])/_0x188d1a;this['_angleDuration']--;if(this[_0x4cb220(0x299)]<=0x0)this[_0x4cb220(0x49c)]();},Sprite_Battler[_0x2e20ee(0x112)]['onAngleEnd']=function(){const _0x451a17=_0x2e20ee;this[_0x451a17(0x6e2)]=this[_0x451a17(0x282)],this[_0x451a17(0x37f)]&&(this[_0x451a17(0x282)]=0x0,this[_0x451a17(0x6e2)]=0x0);},Sprite_Battler['prototype']['isSpinning']=function(){const _0x4d9d6e=_0x2e20ee;return this[_0x4d9d6e(0x299)]>0x0;},Sprite_Battler['prototype']['applyAngleChange']=function(){const _0xc359b8=_0x2e20ee;if(!this[_0xc359b8(0x7a8)])return;const _0xc63469=this[_0xc359b8(0x6e2)],_0xfd3b01=this[_0xc359b8(0x4e7)]['x'],_0x3b1d3e=this[_0xc359b8(0x681)]['isActor']()?-0x1:0x1;this[_0xc359b8(0x7a8)][_0xc359b8(0x414)]=_0xc63469*_0xfd3b01*_0x3b1d3e;const _0x2a1a2e=this[_0xc359b8(0x7a8)][_0xc359b8(0x4e7)]['y'];this[_0xc359b8(0x7a8)]['y']=this['height']*-0.5*(0x2-_0x2a1a2e);const _0x5222a5=[this[_0xc359b8(0x2e6)],this[_0xc359b8(0x310)],this[_0xc359b8(0x51c)]];for(const _0x410073 of _0x5222a5){if(!_0x410073)continue;_0x410073['y']=this[_0xc359b8(0x6cf)]*0.5;}this[_0xc359b8(0x486)]&&(this[_0xc359b8(0x486)][_0xc359b8(0x4e7)]['x']=this[_0xc359b8(0x7a8)][_0xc359b8(0x4e7)]['x'],this[_0xc359b8(0x486)][_0xc359b8(0x4e7)]['y']=this[_0xc359b8(0x7a8)][_0xc359b8(0x4e7)]['y']);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x20c)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x1f9)],Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x1f9)]=function(){const _0x3625f2=_0x2e20ee;VisuMZ['BattleCore'][_0x3625f2(0x20c)][_0x3625f2(0x7c6)](this),VisuMZ['BattleCore'][_0x3625f2(0x1bf)][_0x3625f2(0x82e)][_0x3625f2(0x40b)]&&this[_0x3625f2(0x2bc)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6c3)]=Sprite_Enemy[_0x2e20ee(0x112)]['createStateIconSprite'],Sprite_Enemy[_0x2e20ee(0x112)]['createStateIconSprite']=function(){const _0x49d993=_0x2e20ee;VisuMZ['BattleCore'][_0x49d993(0x1bf)][_0x49d993(0x82e)][_0x49d993(0x288)]&&this[_0x49d993(0x2bc)](),VisuMZ['BattleCore'][_0x49d993(0x6c3)]['call'](this);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x2bc)]=function(){const _0x4e31f3=_0x2e20ee;if(!ConfigManager[_0x4e31f3(0x1b2)])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x387236=VisuMZ['BattleCore'][_0x4e31f3(0x1bf)][_0x4e31f3(0x82e)],_0xeb9426=new Sprite_HpGauge();_0xeb9426[_0x4e31f3(0x555)]['x']=_0x387236[_0x4e31f3(0x57a)],_0xeb9426[_0x4e31f3(0x555)]['y']=_0x387236[_0x4e31f3(0x143)],_0xeb9426[_0x4e31f3(0x4e7)]['x']=_0xeb9426[_0x4e31f3(0x4e7)]['y']=_0x387236[_0x4e31f3(0x3dd)],this[_0x4e31f3(0x123)]=_0xeb9426,this[_0x4e31f3(0xf9)](this[_0x4e31f3(0x123)]);},VisuMZ['BattleCore'][_0x2e20ee(0x4b8)]=Sprite_Battler[_0x2e20ee(0x112)]['setBattler'],Sprite_Battler[_0x2e20ee(0x112)]['setBattler']=function(_0x1741b1){const _0x334b0a=_0x2e20ee;VisuMZ[_0x334b0a(0x17b)][_0x334b0a(0x4b8)][_0x334b0a(0x7c6)](this,_0x1741b1),this[_0x334b0a(0x6ee)](_0x1741b1);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x6ee)]=function(_0xa576b){const _0x1f5441=_0x2e20ee;if(!_0xa576b)return;if(!this[_0x1f5441(0x123)])return;if(_0xa576b[_0x1f5441(0x13d)]()){}else{if(_0xa576b[_0x1f5441(0x5c8)]()){if(this[_0x1f5441(0x177)]===Sprite_SvEnemy&&!_0xa576b[_0x1f5441(0x3e1)]())return;}}this['_hpGaugeSprite']['setup'](_0xa576b,'hp');},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x3f2)]=function(){const _0x25ecbb=_0x2e20ee;if(!this['_battler'])return;if(!this[_0x25ecbb(0x123)])return;const _0x2a4452=VisuMZ[_0x25ecbb(0x17b)][_0x25ecbb(0x1bf)][_0x25ecbb(0x82e)],_0x5ead3f=this[_0x25ecbb(0x123)];_0x5ead3f[_0x25ecbb(0x18b)]=this[_0x25ecbb(0x271)]();const _0x7bf6dd=_0x2a4452[_0x25ecbb(0x5ad)],_0x2e458b=_0x2a4452['OffsetY'];_0x5ead3f['x']=_0x7bf6dd,_0x5ead3f['x']+=this[_0x25ecbb(0x681)]['battleUIOffsetX'](),_0x5ead3f['y']=-this[_0x25ecbb(0x6cf)]+_0x2e458b,_0x5ead3f['y']+=this[_0x25ecbb(0x681)]['battleUIOffsetY']();},Sprite_Battler['prototype'][_0x2e20ee(0x271)]=function(){const _0x4700f8=_0x2e20ee;if(!this[_0x4700f8(0x681)])return![];if(this[_0x4700f8(0x681)][_0x4700f8(0x13d)]())return!![];const _0x4ffc7c=this['_battler']['enemy']()[_0x4700f8(0x37b)];if(_0x4ffc7c[_0x4700f8(0x26f)](/<SHOW HP GAUGE>/i))return!![];if(_0x4ffc7c[_0x4700f8(0x26f)](/<HIDE HP GAUGE>/i))return![];const _0x981f2b=VisuMZ['BattleCore'][_0x4700f8(0x1bf)][_0x4700f8(0x82e)];if(_0x981f2b['RequiresDefeat']){if(_0x981f2b[_0x4700f8(0x788)]&&BattleManager[_0x4700f8(0x6d7)]())return!![];if(this[_0x4700f8(0x681)][_0x4700f8(0x774)])return![];return this[_0x4700f8(0x681)][_0x4700f8(0x1b0)]();}return!![];},VisuMZ['BattleCore']['Sprite_Battler_isMoving']=Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x5b5)],Sprite_Battler['prototype'][_0x2e20ee(0x5b5)]=function(){const _0x19dd47=_0x2e20ee;if(!this[_0x19dd47(0x681)])return![];return VisuMZ['BattleCore'][_0x19dd47(0x657)]['call'](this);},VisuMZ['BattleCore']['Sprite_Battler_startMove']=Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x131)],Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x131)]=function(_0x7f24e4,_0x46aad9,_0x4d9f98){const _0x34210c=_0x2e20ee;this['canMove']()&&VisuMZ[_0x34210c(0x17b)][_0x34210c(0x523)]['call'](this,_0x7f24e4,_0x46aad9,_0x4d9f98);},Sprite_Battler[_0x2e20ee(0x112)]['canMove']=function(){const _0x362e44=_0x2e20ee;if(this[_0x362e44(0x681)]&&this[_0x362e44(0x681)][_0x362e44(0x1cf)]())return![];if(this['_battler']&&!this[_0x362e44(0x681)][_0x362e44(0x599)]())return![];return $gameSystem['isSideView']();},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x14b)]=function(){},Sprite_Battler['prototype'][_0x2e20ee(0x6e5)]=function(){const _0x180ff0=_0x2e20ee;this[_0x180ff0(0x131)](0x0,0x0,0xc);},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x6c8)]=function(){},Sprite_Battler[_0x2e20ee(0x112)][_0x2e20ee(0x4b0)]=function(){const _0x571152=_0x2e20ee,_0x30d252=VisuMZ['BattleCore'][_0x571152(0x1bf)][_0x571152(0x47d)],_0x3a3709=this[_0x571152(0x681)]&&this[_0x571152(0x681)]['isActor']()?0x1:-0x1,_0x3e5e8a=this[_0x571152(0x1f7)]-this[_0x571152(0x3b8)]+_0x3a3709*_0x30d252[_0x571152(0x371)],_0x5d37d7=this[_0x571152(0x4af)]-this[_0x571152(0x830)]+_0x3a3709*_0x30d252['FlinchDistanceY'],_0x5204c8=_0x30d252[_0x571152(0x33d)];this[_0x571152(0x131)](_0x3e5e8a,_0x5d37d7,_0x5204c8);},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Actor_initMembers']=Sprite_Actor['prototype']['initMembers'],Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x513)]=function(){const _0x26c6b8=_0x2e20ee;VisuMZ[_0x26c6b8(0x17b)]['Sprite_Actor_initMembers'][_0x26c6b8(0x7c6)](this),this[_0x26c6b8(0xfe)]();},Sprite_Actor[_0x2e20ee(0x112)]['mainSprite']=function(){const _0x13dc52=_0x2e20ee;return this[_0x13dc52(0x7a8)]||this[_0x13dc52(0x2e6)]||this;},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Actor_moveToStartPosition']=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x5d4)],Sprite_Actor['prototype'][_0x2e20ee(0x5d4)]=function(){},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x2fa)]=function(_0x1198da){const _0x186aee=_0x2e20ee;if(SceneManager[_0x186aee(0x138)]())return;if(!_0x1198da)return;if(!_0x1198da['canMove']())return;VisuMZ[_0x186aee(0x17b)][_0x186aee(0x6b1)]['call'](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5ca)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x694)],Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x694)]=function(_0x429d3b){const _0x2f8ec3=_0x2e20ee;VisuMZ[_0x2f8ec3(0x17b)]['Settings'][_0x2f8ec3(0x47d)][_0x2f8ec3(0x25d)]?VisuMZ['BattleCore'][_0x2f8ec3(0x1bf)][_0x2f8ec3(0x47d)][_0x2f8ec3(0x25d)][_0x2f8ec3(0x7c6)](this,_0x429d3b):VisuMZ[_0x2f8ec3(0x17b)][_0x2f8ec3(0x5ca)]['call'](this,_0x429d3b);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6e0)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x549)],Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x549)]=function(_0x4ecc23){const _0x12f65f=_0x2e20ee;VisuMZ['BattleCore'][_0x12f65f(0x6e0)][_0x12f65f(0x7c6)](this,_0x4ecc23),this['setBattlerBattleCore'](_0x4ecc23);},Sprite_Actor['prototype'][_0x2e20ee(0x79c)]=function(_0x3b892c){const _0x2f2f34=_0x2e20ee;if(!_0x3b892c)return;if(!this[_0x2f2f34(0x2e6)])return;this['_mainSprite'][_0x2f2f34(0x555)]['x']=this[_0x2f2f34(0x29b)][_0x2f2f34(0x6cd)](),this[_0x2f2f34(0x2e6)][_0x2f2f34(0x555)]['y']=this['_actor'][_0x2f2f34(0x7e6)](),this[_0x2f2f34(0x1dd)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2a3)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x751)],Sprite_Actor[_0x2e20ee(0x112)]['update']=function(){const _0x1085b4=_0x2e20ee;VisuMZ[_0x1085b4(0x17b)][_0x1085b4(0x2a3)]['call'](this),this['_actor']&&(this[_0x1085b4(0x1b8)](),this['updateStyleOpacity']());},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x41a)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x22f)],Sprite_Actor['prototype']['updateBitmap']=function(){const _0x4f9df6=_0x2e20ee;VisuMZ[_0x4f9df6(0x17b)][_0x4f9df6(0x41a)]['call'](this),this[_0x4f9df6(0x2e6)]&&this['_mainSprite']['bitmap']&&this[_0x4f9df6(0x681)]&&(this[_0x4f9df6(0x2e6)][_0x4f9df6(0x4e1)]['smooth']!==this[_0x4f9df6(0x681)][_0x4f9df6(0x742)]()&&(this[_0x4f9df6(0x2e6)]['bitmap']['smooth']=this['_battler'][_0x4f9df6(0x742)]()));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x239)]=Sprite_Actor['prototype'][_0x2e20ee(0x4a7)],Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x4a7)]=function(){const _0x14b0cf=_0x2e20ee;VisuMZ[_0x14b0cf(0x17b)][_0x14b0cf(0x239)][_0x14b0cf(0x7c6)](this),this['updateShadowBattleCore']();},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x62a)]=function(){const _0x2d45a7=_0x2e20ee;if(!this[_0x2d45a7(0x2e6)])return;if(!this['_shadowSprite'])return;this[_0x2d45a7(0x1dd)](),this[_0x2d45a7(0xd8)]();},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x1b8)]=function(){const _0x2d315c=_0x2e20ee;this['_stateSprite'][_0x2d315c(0x4e7)]['x']=0x1/(this[_0x2d315c(0x4e7)]['x']||0.001),this['_stateSprite'][_0x2d315c(0x4e7)]['y']=0x1/(this[_0x2d315c(0x4e7)]['y']||0.001);},Sprite_Actor[_0x2e20ee(0x112)]['updateStyleOpacity']=function(){const _0x550737=_0x2e20ee;if(!$gameSystem[_0x550737(0xde)]()&&this[_0x550737(0x177)]===Sprite_Actor){const _0x3ae7e5=Scene_Battle[_0x550737(0x112)]['battleLayoutStyle']();['default','list',_0x550737(0x3e0),_0x550737(0x4c9)][_0x550737(0x60c)](_0x3ae7e5)&&(this['opacity']=0x0);}},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x427)]=function(){const _0x5a8f24=_0x2e20ee,_0x1e0726=this['_actor'];if(_0x1e0726){const _0xe021c6=_0x1e0726['stateMotionIndex']();if(_0x1e0726[_0x5a8f24(0xd6)]()||_0x1e0726[_0x5a8f24(0x469)]())this[_0x5a8f24(0x6e7)](_0x5a8f24(0x49d));else{if(_0xe021c6===0x3)this['startMotion'](_0x5a8f24(0x80a));else{if(_0xe021c6===0x2)this[_0x5a8f24(0x6e7)](_0x5a8f24(0x752));else{if(this[_0x5a8f24(0x5c5)])this[_0x5a8f24(0x6e7)](_0x5a8f24(0x407));else{if(_0x1e0726[_0x5a8f24(0x655)]())this[_0x5a8f24(0x6e7)](_0x5a8f24(0x6ca));else{if(_0x1e0726[_0x5a8f24(0x476)]())this[_0x5a8f24(0x6e7)](_0x5a8f24(0x67f));else{if(_0x1e0726[_0x5a8f24(0xc3)]()||_0x1e0726[_0x5a8f24(0x7bb)]())this['startMotion']('guard');else{if(_0xe021c6===0x1)this[_0x5a8f24(0x6e7)](_0x5a8f24(0x80d));else{if(_0x1e0726[_0x5a8f24(0x466)]())this[_0x5a8f24(0x6e7)](_0x5a8f24(0x2b8));else{if(_0x1e0726[_0x5a8f24(0x4aa)]())this[_0x5a8f24(0x6e7)]('walk');else _0x1e0726[_0x5a8f24(0x630)]()?this[_0x5a8f24(0x6e7)](_0x5a8f24(0x6ca)):this[_0x5a8f24(0x6e7)](_0x5a8f24(0x49d));}}}}}}}}}}},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x6c8)]=function(){const _0xde8e5e=_0x2e20ee,_0x17cec8=0xa,_0x563dfe=0x12c*_0x17cec8,_0x5e27f3=0x1e*_0x17cec8;this[_0xde8e5e(0x131)](_0x563dfe,0x0,_0x5e27f3);},Sprite_Actor['prototype']['onMoveEnd']=function(){const _0x20fd3e=_0x2e20ee;Sprite_Battler['prototype'][_0x20fd3e(0x6ae)][_0x20fd3e(0x7c6)](this);},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x400)]=function(){const _0xb78e3b=_0x2e20ee;return Sprite_Battler[_0xb78e3b(0x210)];},Sprite_Weapon[_0x2e20ee(0x112)][_0x2e20ee(0x62b)]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Actor[_0x2e20ee(0x112)]['setupMotion']=function(){},Sprite_Actor['prototype'][_0x2e20ee(0x51d)]=function(){},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x7e0)]=function(){const _0x1ad7f6=_0x2e20ee;if(this['_motion']&&++this[_0x1ad7f6(0x188)]>=this[_0x1ad7f6(0x400)]()){if(this[_0x1ad7f6(0x33c)][_0x1ad7f6(0x4a8)])this[_0x1ad7f6(0x704)]=(this[_0x1ad7f6(0x704)]+0x1)%0x4;else this[_0x1ad7f6(0x704)]<0x2?this[_0x1ad7f6(0x704)]++:this[_0x1ad7f6(0x427)]();this[_0x1ad7f6(0x188)]=0x0;}},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x764)]=function(_0x1c9448){const _0x4eee98=_0x2e20ee;if(_0x1c9448===_0x4eee98(0xbf))this[_0x4eee98(0x614)]=!![];if(this[_0x4eee98(0x681)]&&this['_battler'][_0x4eee98(0x1cf)]()){this[_0x4eee98(0x33c)]=Sprite_Actor[_0x4eee98(0x7ee)][_0x4eee98(0x80a)];return;}const _0x13cc89=Sprite_Actor[_0x4eee98(0x7ee)][_0x1c9448];this[_0x4eee98(0x33c)]=_0x13cc89,this[_0x4eee98(0x188)]=0x0,this[_0x4eee98(0x704)]=0x0;},Sprite_Actor[_0x2e20ee(0x112)]['forceWeaponAnimation']=function(_0x3c279a){const _0x448650=_0x2e20ee;this[_0x448650(0x1b4)](),this[_0x448650(0x45b)][_0x448650(0xc7)](_0x3c279a),this[_0x448650(0x29b)][_0x448650(0x26d)]();},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x1b4)]=function(){const _0xdde571=_0x2e20ee;let _0x1be5fd=-0x10,_0x50a490=this[_0xdde571(0x6cf)]*0.5;const _0x44d9ea=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x441f10=this['_battler']['traitObjects']()[_0xdde571(0x4f1)](_0x234f00=>_0x234f00&&_0x234f00[_0xdde571(0x37b)][_0xdde571(0x26f)](_0x44d9ea)?Number(RegExp['$1']):0x0),_0x2a35b9=this[_0xdde571(0x681)][_0xdde571(0x7f5)]()[_0xdde571(0x4f1)](_0x261cea=>_0x261cea&&_0x261cea[_0xdde571(0x37b)][_0xdde571(0x26f)](_0x44d9ea)?Number(RegExp['$2']):0x0);_0x1be5fd=_0x441f10['reduce']((_0x322014,_0x40def4)=>_0x322014+_0x40def4,_0x1be5fd),_0x50a490=_0x2a35b9['reduce']((_0x1ed8e3,_0x5c9502)=>_0x1ed8e3+_0x5c9502,_0x50a490),this[_0xdde571(0x45b)]['x']=_0x1be5fd,this[_0xdde571(0x45b)]['y']=_0x50a490,this[_0xdde571(0x45b)][_0xdde571(0x751)]();},Sprite_Weapon[_0x2e20ee(0x112)]['setup']=function(_0x2adb05){const _0x26462b=_0x2e20ee;this[_0x26462b(0x695)]=_0x2adb05,this[_0x26462b(0x308)]=-0x1,this[_0x26462b(0x704)]=0x0,this[_0x26462b(0x3f5)](),this[_0x26462b(0x53e)]();},Sprite_Actor['prototype'][_0x2e20ee(0x634)]=function(){},Sprite_Actor[_0x2e20ee(0x112)]['stepForward']=function(){const _0x470a00=_0x2e20ee,_0x574c8b=VisuMZ[_0x470a00(0x17b)][_0x470a00(0x1bf)][_0x470a00(0x1f6)],_0x2cd014=_0x574c8b[_0x470a00(0x1ca)],_0x570e88=_0x574c8b[_0x470a00(0x421)],_0xf8a560=_0x574c8b[_0x470a00(0x24d)];this[_0x470a00(0x131)](-_0x2cd014,-_0x570e88,_0xf8a560);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x313)]=Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x53e)],Sprite_Actor[_0x2e20ee(0x112)]['updateFrame']=function(){const _0xd1f082=_0x2e20ee;this['applyFreezeMotionFrames'](),VisuMZ[_0xd1f082(0x17b)][_0xd1f082(0x313)][_0xd1f082(0x7c6)](this);},Sprite_Actor[_0x2e20ee(0x112)][_0x2e20ee(0x6cc)]=function(){const _0x2effc9=_0x2e20ee;if(this[_0x2effc9(0x681)]&&this['_battler']['_freezeMotionData']){const _0x32c0c6=this[_0x2effc9(0x681)][_0x2effc9(0x3fb)];this[_0x2effc9(0x33c)]=Sprite_Actor[_0x2effc9(0x7ee)][_0x32c0c6['motionType']],this[_0x2effc9(0x704)]=_0x32c0c6[_0x2effc9(0x574)];const _0x53c89a=this[_0x2effc9(0x45b)];_0x53c89a['freezeFrame'](_0x32c0c6['weaponImageId'],_0x32c0c6[_0x2effc9(0x574)]),this['adjustWeaponSpriteOffset']();}},Sprite_Weapon[_0x2e20ee(0x112)][_0x2e20ee(0x7d0)]=function(_0x524abb,_0x57b068){const _0x1174d6=_0x2e20ee;this[_0x1174d6(0x695)]=_0x524abb,this[_0x1174d6(0x308)]=-Infinity,this[_0x1174d6(0x704)]=_0x57b068,this['loadBitmap'](),this[_0x1174d6(0x53e)]();},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x513)]=function(){const _0x1adf4b=_0x2e20ee;Sprite_Battler[_0x1adf4b(0x112)][_0x1adf4b(0x513)][_0x1adf4b(0x7c6)](this),this['_enemy']=null,this[_0x1adf4b(0x3fe)]=![],this[_0x1adf4b(0x5ce)]='',this[_0x1adf4b(0x7b1)]=0x0,this[_0x1adf4b(0x30b)]=null,this[_0x1adf4b(0x1dc)]=0x0,this['_shake']=0x0,this[_0x1adf4b(0xfa)](),this[_0x1adf4b(0x792)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6b9)]=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x751)],Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x751)]=function(){const _0x5e72cc=_0x2e20ee;VisuMZ[_0x5e72cc(0x17b)][_0x5e72cc(0x6b9)]['call'](this),this['updateShadowVisibility']();},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0xfa)]=function(){const _0x52d0e1=_0x2e20ee;this[_0x52d0e1(0x2e6)]=new Sprite(),this[_0x52d0e1(0x2e6)][_0x52d0e1(0x555)]['x']=0.5,this[_0x52d0e1(0x2e6)][_0x52d0e1(0x555)]['y']=0x1,this[_0x52d0e1(0xf9)](this[_0x52d0e1(0x2e6)]),this[_0x52d0e1(0xfe)]();},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x794)]=function(){const _0x49e956=_0x2e20ee;return this['_distortionSprite']||this[_0x49e956(0x2e6)]||this;},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x3f5)]=function(_0x5b6d1f){const _0x53f583=_0x2e20ee;this[_0x53f583(0x4e1)]=new Bitmap(0x1,0x1),$gameSystem[_0x53f583(0xde)]()?this['_mainSprite'][_0x53f583(0x4e1)]=ImageManager[_0x53f583(0x565)](_0x5b6d1f):this[_0x53f583(0x2e6)]['bitmap']=ImageManager[_0x53f583(0x746)](_0x5b6d1f),this[_0x53f583(0x2e6)]['bitmap'][_0x53f583(0x535)](this['createEmptyBitmap'][_0x53f583(0x70c)](this));},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x370)]=function(){const _0x452ba5=_0x2e20ee,_0x41467b=this[_0x452ba5(0x2e6)][_0x452ba5(0x4e1)];_0x41467b&&(this[_0x452ba5(0x4e1)]=new Bitmap(_0x41467b[_0x452ba5(0x71d)],_0x41467b[_0x452ba5(0x6cf)]));},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Enemy_setHue']=Sprite_Enemy['prototype']['setHue'],Sprite_Enemy['prototype'][_0x2e20ee(0x334)]=function(_0x54d7d3){const _0x48943a=_0x2e20ee;this[_0x48943a(0x2e6)]&&this[_0x48943a(0x2e6)][_0x48943a(0x334)](_0x54d7d3);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x79b)]=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x3ee)],Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x3ee)]=function(){const _0x524907=_0x2e20ee;this[_0x524907(0x79e)]()?VisuMZ[_0x524907(0x17b)][_0x524907(0x79b)][_0x524907(0x7c6)](this):(this[_0x524907(0x3fe)]=!this[_0x524907(0x503)]['isHidden'](),!this[_0x524907(0x3fe)]&&(this[_0x524907(0x3af)]=0x0));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x443)]=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x52e)],Sprite_Enemy[_0x2e20ee(0x112)]['updateCollapse']=function(){const _0x495efe=_0x2e20ee;if(this['allowCollapse']())VisuMZ[_0x495efe(0x17b)][_0x495efe(0x443)][_0x495efe(0x7c6)](this);},Sprite_Enemy[_0x2e20ee(0x112)]['updateFrame']=function(){const _0x3a4fa1=_0x2e20ee;Sprite_Battler[_0x3a4fa1(0x112)][_0x3a4fa1(0x53e)][_0x3a4fa1(0x7c6)](this);const _0xcb66bf=this['mainSprite']()||this;if(!_0xcb66bf)return;!_0xcb66bf[_0x3a4fa1(0x4e1)]&&(_0xcb66bf[_0x3a4fa1(0x4e1)]=new Bitmap(this[_0x3a4fa1(0x71d)],this['height'])),this[_0x3a4fa1(0x30b)]===_0x3a4fa1(0xd9)?this['_mainSprite']['setFrame'](0x0,0x0,this[_0x3a4fa1(0x2e6)][_0x3a4fa1(0x71d)],this[_0x3a4fa1(0x1dc)]):_0xcb66bf[_0x3a4fa1(0x13b)](0x0,0x0,_0xcb66bf[_0x3a4fa1(0x4e1)][_0x3a4fa1(0x71d)],this[_0x3a4fa1(0x4e1)][_0x3a4fa1(0x6cf)]);},VisuMZ[_0x2e20ee(0x17b)]['Sprite_Enemy_updateBossCollapse']=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x75c)],Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x75c)]=function(){const _0x292d80=_0x2e20ee;if(this[_0x292d80(0x79e)]())VisuMZ[_0x292d80(0x17b)][_0x292d80(0x545)][_0x292d80(0x7c6)](this);},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x5b5)]=function(){const _0xc3bc7e=_0x2e20ee;return Sprite_Battler[_0xc3bc7e(0x112)]['isMoving'][_0xc3bc7e(0x7c6)](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2ad)]=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x1b8)],Sprite_Enemy[_0x2e20ee(0x112)]['updateStateSprite']=function(){const _0x47d203=_0x2e20ee;VisuMZ[_0x47d203(0x17b)]['Sprite_Enemy_updateStateSprite'][_0x47d203(0x7c6)](this),this['updateStateSpriteBattleCore']();},Sprite_Enemy['prototype'][_0x2e20ee(0x7f9)]=function(){const _0x508879=_0x2e20ee;this[_0x508879(0x3d9)]['x']=0x0,this[_0x508879(0x3d9)]['x']+=this['_battler'][_0x508879(0x3cd)](),this[_0x508879(0x3d9)]['y']=-this['bitmap'][_0x508879(0x6cf)]-this[_0x508879(0x3d9)][_0x508879(0x6cf)],this[_0x508879(0x3d9)]['y']+=this[_0x508879(0x681)][_0x508879(0x5c4)](),this['_stateIconSprite'][_0x508879(0x4e7)]['x']=0x1/(this[_0x508879(0x4e7)]['x']||0.001),this[_0x508879(0x3d9)][_0x508879(0x4e7)]['y']=0x1/(this[_0x508879(0x4e7)]['y']||0.001),this[_0x508879(0x3e1)]()&&(this[_0x508879(0x310)][_0x508879(0x5a7)][_0x508879(0x4e7)]['x']=-0x1/(this[_0x508879(0x4e7)]['x']||0.001),this[_0x508879(0x310)][_0x508879(0x5a7)]['scale']['y']=0x1/(this['scale']['y']||0.001));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x444)]=Sprite_Enemy['prototype']['setBattler'],Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x549)]=function(_0x3b7126){const _0x320477=_0x2e20ee;VisuMZ[_0x320477(0x17b)][_0x320477(0x444)]['call'](this,_0x3b7126),this[_0x320477(0x11e)](_0x3b7126);},Sprite_Enemy['prototype']['setSvBattlerSprite']=function(_0x2f3d4e){const _0x3be744=_0x2e20ee;!this[_0x3be744(0x310)]&&(this[_0x3be744(0x310)]=new Sprite_SvEnemy(_0x2f3d4e),this[_0x3be744(0xfe)]()),this[_0x3be744(0x310)]['setBattler'](_0x2f3d4e);},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x3e1)]=function(){const _0x310c6e=_0x2e20ee;return this['_enemy']&&this[_0x310c6e(0x503)][_0x310c6e(0x3e1)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6f1)]=Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x3f5)],Sprite_Enemy['prototype'][_0x2e20ee(0x3f5)]=function(_0x428861){const _0x3ba30f=_0x2e20ee;if(this[_0x3ba30f(0x3e1)]()){const _0x31ab44=this['_enemy'][_0x3ba30f(0x4b7)]();this[_0x3ba30f(0x4e1)]=new Bitmap(_0x31ab44[_0x3ba30f(0x71d)],_0x31ab44[_0x3ba30f(0x6cf)]);}else VisuMZ[_0x3ba30f(0x17b)][_0x3ba30f(0x6f1)][_0x3ba30f(0x7c6)](this,_0x428861);},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x79e)]=function(){const _0x53ab46=_0x2e20ee;return this['hasSvBattler']()?this[_0x53ab46(0x503)][_0x53ab46(0x79e)]():!![];},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x427)]=function(){const _0x5c4050=_0x2e20ee;this[_0x5c4050(0x3e1)]()&&this[_0x5c4050(0x310)][_0x5c4050(0x427)]();},Sprite_Enemy['prototype']['forceMotion']=function(_0x109096){const _0x508168=_0x2e20ee;if(this[_0x508168(0x3e1)]())this['_svBattlerSprite'][_0x508168(0x764)](_0x109096);},Sprite_Enemy[_0x2e20ee(0x112)][_0x2e20ee(0x5f4)]=function(_0x2ee0a4){const _0x515685=_0x2e20ee;if(this[_0x515685(0x3e1)]())this[_0x515685(0x310)][_0x515685(0x5f4)](_0x2ee0a4);},Sprite_Enemy['prototype'][_0x2e20ee(0x14b)]=function(){const _0x3e67d6=_0x2e20ee,_0x398708=VisuMZ[_0x3e67d6(0x17b)]['Settings'][_0x3e67d6(0x1f6)],_0x42096b=_0x398708[_0x3e67d6(0x1ca)],_0x3c5d65=_0x398708[_0x3e67d6(0x421)],_0x9a6395=_0x398708[_0x3e67d6(0x24d)];this[_0x3e67d6(0x131)](_0x42096b,_0x3c5d65,_0x9a6395);};function Sprite_SvEnemy(){const _0x10181e=_0x2e20ee;this[_0x10181e(0x527)](...arguments);}Sprite_SvEnemy[_0x2e20ee(0x112)]=Object['create'](Sprite_Actor[_0x2e20ee(0x112)]),Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x177)]=Sprite_SvEnemy,Sprite_SvEnemy[_0x2e20ee(0x112)]['initialize']=function(_0x472c4b){const _0x4133c8=_0x2e20ee;Sprite_Actor[_0x4133c8(0x112)][_0x4133c8(0x527)][_0x4133c8(0x7c6)](this,_0x472c4b),this['scale']['x']=-0x1,this[_0x4133c8(0x5a7)]['scale']['x']=-0x1;},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x31e)]=function(){},Sprite_SvEnemy['prototype']['moveToStartPosition']=function(){},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x694)]=function(_0x1c08e0){},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x4a7)]=function(){},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0xd8)]=function(){},Sprite_SvEnemy['prototype'][_0x2e20ee(0x1b8)]=function(){const _0xd93d2e=_0x2e20ee;this[_0xd93d2e(0x5a7)][_0xd93d2e(0x18b)]=![];},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x22f)]=function(){const _0x22d670=_0x2e20ee;Sprite_Battler['prototype']['updateBitmap'][_0x22d670(0x7c6)](this);const _0x3bfbea=this[_0x22d670(0x29b)]['svBattlerName']();this[_0x22d670(0x5ce)]!==_0x3bfbea&&(this[_0x22d670(0x5ce)]=_0x3bfbea,this[_0x22d670(0x2e6)][_0x22d670(0x4e1)]=ImageManager[_0x22d670(0xd7)](_0x3bfbea)),this[_0x22d670(0x2e6)]&&this[_0x22d670(0x2e6)][_0x22d670(0x4e1)]&&this['_battler']&&(this[_0x22d670(0x2e6)][_0x22d670(0x4e1)][_0x22d670(0x260)]!==this[_0x22d670(0x681)][_0x22d670(0x742)]()&&(this['_mainSprite'][_0x22d670(0x4e1)][_0x22d670(0x260)]=this[_0x22d670(0x681)][_0x22d670(0x742)]()));},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x6c8)]=function(){},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x131)]=function(_0x4e8b4b,_0x3e936e,_0x464d56){const _0x457879=_0x2e20ee;if(this['parent'])this[_0x457879(0x101)][_0x457879(0x131)](_0x4e8b4b,_0x3e936e,_0x464d56);},Sprite_SvEnemy['prototype'][_0x2e20ee(0x427)]=function(){const _0x5066b1=_0x2e20ee,_0x1f6b3a=this[_0x5066b1(0x29b)];if(_0x1f6b3a){const _0x2a516b=_0x1f6b3a['stateMotionIndex']();if(_0x1f6b3a[_0x5066b1(0xd6)]()||_0x1f6b3a[_0x5066b1(0x469)]())this['startMotion'](_0x5066b1(0x49d));else{if(_0x2a516b===0x3)this['startMotion'](_0x5066b1(0x80a));else{if(_0x2a516b===0x2)this[_0x5066b1(0x6e7)](_0x5066b1(0x752));else{if(_0x1f6b3a['isChanting']())this['startMotion']('chant');else{if(_0x1f6b3a['isGuard']()||_0x1f6b3a[_0x5066b1(0x7bb)]())this[_0x5066b1(0x6e7)](_0x5066b1(0x201));else{if(_0x2a516b===0x1)this[_0x5066b1(0x6e7)](_0x5066b1(0x80d));else{if(_0x1f6b3a[_0x5066b1(0x466)]())this[_0x5066b1(0x6e7)](_0x5066b1(0x2b8));else _0x1f6b3a[_0x5066b1(0x4aa)]()?this[_0x5066b1(0x6e7)](_0x5066b1(0x49d)):this[_0x5066b1(0x6e7)](_0x1f6b3a[_0x5066b1(0x4b7)]()[_0x5066b1(0x249)]||_0x5066b1(0x49d));}}}}}}}},Sprite_SvEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x11f)]=function(){const _0x28e28e=_0x2e20ee;return this['parent']?this[_0x28e28e(0x101)]['_offsetX']===0x0&&this[_0x28e28e(0x101)][_0x28e28e(0x78b)]===0x0:!![];},Sprite_SvEnemy[_0x2e20ee(0x112)]['updateFlip']=function(){},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x4d9)]=function(_0x2000d5){const _0x2e432b=_0x2e20ee,_0x37bbe0=_0x2000d5[_0x2e432b(0x7cf)]()||_0x2000d5[_0x2e432b(0x7bd)]();if(_0x37bbe0[_0x2e432b(0x3d1)]||_0x37bbe0[_0x2e432b(0x629)])this[_0x2e432b(0x569)]=0x0,this[_0x2e432b(0x5aa)]();else{if(_0x37bbe0[_0x2e432b(0x367)])this['_colorType']=_0x37bbe0['hpDamage']>=0x0?0x0:0x1,this['createDigits'](_0x37bbe0[_0x2e432b(0x753)]);else _0x2000d5['isAlive']()&&_0x37bbe0['mpDamage']!==0x0&&(this[_0x2e432b(0x569)]=_0x37bbe0[_0x2e432b(0x15c)]>=0x0?0x2:0x3,this[_0x2e432b(0x3b7)](_0x37bbe0['mpDamage']));}_0x37bbe0['critical']&&this[_0x2e432b(0x595)]();},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0xc7)]=function(_0x3f9985){},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x3b7)]=function(_0x4ead93){const _0x3514b8=_0x2e20ee;let _0x435146=this[_0x3514b8(0x500)](_0x4ead93);const _0x4ce4c7=this['fontSize'](),_0x26a9b2=Math[_0x3514b8(0x175)](_0x4ce4c7*0.75);for(let _0x436093=0x0;_0x436093<_0x435146[_0x3514b8(0x5c2)];_0x436093++){const _0x49a9f8=this[_0x3514b8(0x5da)](_0x26a9b2,_0x4ce4c7);_0x49a9f8[_0x3514b8(0x4e1)][_0x3514b8(0x261)](_0x435146[_0x436093],0x0,0x0,_0x26a9b2,_0x4ce4c7,_0x3514b8(0x1cc)),_0x49a9f8['x']=(_0x436093-(_0x435146[_0x3514b8(0x5c2)]-0x1)/0x2)*_0x26a9b2,_0x49a9f8['dy']=-_0x436093;}},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x500)]=function(_0x4841f8){const _0x58189f=_0x2e20ee;let _0x2d71cb=Math['abs'](_0x4841f8)['toString']();this['useDigitGrouping']()&&(_0x2d71cb=VisuMZ['GroupDigits'](_0x2d71cb));const _0x3a8d52=VisuMZ[_0x58189f(0x17b)][_0x58189f(0x1bf)][_0x58189f(0x5c3)];let _0x5f2810='',_0x39ab56='';switch(this[_0x58189f(0x569)]){case 0x0:_0x5f2810=_0x3a8d52['hpDamageFmt']||_0x58189f(0x1a4),_0x39ab56=TextManager['hp'];if(_0x4841f8===0x0)_0x5f2810='%1';break;case 0x1:_0x5f2810=_0x3a8d52[_0x58189f(0x77b)]||'+%1',_0x39ab56=TextManager['hp'];break;case 0x2:_0x5f2810=_0x3a8d52['mpDamageFmt']||'-%1\x20MP',_0x39ab56=TextManager['mp'];break;case 0x3:_0x5f2810=_0x3a8d52['mpHealingFmt']||_0x58189f(0x108),_0x39ab56=TextManager['mp'];break;}return _0x5f2810[_0x58189f(0x483)](_0x2d71cb,_0x39ab56)[_0x58189f(0x762)]();},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x663)]=function(){const _0x5301c1=_0x2e20ee;return Imported[_0x5301c1(0x540)]?VisuMZ['CoreEngine'][_0x5301c1(0x1bf)]['QoL'][_0x5301c1(0x48c)]:![];},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x595)]=function(){const _0x19ae64=_0x2e20ee,_0x69a102=VisuMZ[_0x19ae64(0x17b)][_0x19ae64(0x1bf)][_0x19ae64(0x5c3)];this[_0x19ae64(0x65e)]=_0x69a102[_0x19ae64(0x795)][_0x19ae64(0x641)](0x0),this['_flashDuration']=_0x69a102[_0x19ae64(0x39d)];},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x221)]=function(_0x33c66a,_0x5de8e0){const _0x1b53d7=_0x2e20ee;this[_0x1b53d7(0x65e)]=_0x5de8e0[_0x1b53d7(0x1d3)]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx[_0x1b53d7(0x311)](this[_0x1b53d7(0x65e)]),this[_0x1b53d7(0x19a)]=_0x5de8e0[_0x1b53d7(0x559)]||0x0;const _0x5a6c89=this['fontSize'](),_0x29b13d=Math[_0x1b53d7(0x175)](_0x5a6c89*0x1e),_0xab8844=this['createChildSprite'](_0x29b13d,_0x5a6c89);_0xab8844[_0x1b53d7(0x4e1)][_0x1b53d7(0x361)]=ColorManager['getColor'](_0x5de8e0[_0x1b53d7(0x361)]),_0xab8844[_0x1b53d7(0x4e1)][_0x1b53d7(0x261)](_0x33c66a,0x0,0x0,_0x29b13d,_0x5a6c89,'center'),_0xab8844['dy']=0x0;},Sprite_Damage[_0x2e20ee(0x112)][_0x2e20ee(0x780)]=function(_0xce521c,_0x319a91,_0x344606){const _0x2bfa42=_0x2e20ee,_0x213eeb=Math['max'](this[_0x2bfa42(0x434)](),ImageManager[_0x2bfa42(0x2fe)]),_0x32b05e=Math[_0x2bfa42(0x175)](_0x213eeb*0x1e),_0x53b314=this['createChildSprite'](_0x32b05e,_0x213eeb),_0x367c2c=ImageManager['iconWidth']/0x2,_0x27fe12=_0x53b314[_0x2bfa42(0x4e1)][_0x2bfa42(0x241)](_0x319a91+'\x20');_0x53b314[_0x2bfa42(0x4e1)][_0x2bfa42(0x361)]=ColorManager['getColor'](_0x344606[_0x2bfa42(0x361)]),_0x53b314[_0x2bfa42(0x4e1)][_0x2bfa42(0x261)](_0x319a91,_0x367c2c,0x0,_0x32b05e-_0x367c2c,_0x213eeb,'center');const _0x4e0180=Math[_0x2bfa42(0x603)]((_0x213eeb-ImageManager[_0x2bfa42(0x2fe)])/0x2),_0x5dd1a4=_0x32b05e/0x2-ImageManager[_0x2bfa42(0x267)]-_0x27fe12/0x2+_0x367c2c/0x2,_0x15ab24=ImageManager[_0x2bfa42(0x450)](_0x2bfa42(0x4fa)),_0x2bcc65=ImageManager[_0x2bfa42(0x267)],_0x321bfc=ImageManager[_0x2bfa42(0x2fe)],_0x2370e6=_0xce521c%0x10*_0x2bcc65,_0x4263ac=Math[_0x2bfa42(0x175)](_0xce521c/0x10)*_0x321bfc;_0x53b314['bitmap'][_0x2bfa42(0x107)](_0x15ab24,_0x2370e6,_0x4263ac,_0x2bcc65,_0x321bfc,_0x5dd1a4,_0x4e0180),this['_flashColor']=_0x344606[_0x2bfa42(0x1d3)]||[0x0,0x0,0x0,0x0],this['_flashColor']=JsonEx['makeDeepCopy'](this['_flashColor']),this[_0x2bfa42(0x19a)]=_0x344606['flashDuration']||0x0,_0x53b314['dy']=0x0;},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x79f)]=Sprite_StateIcon['prototype']['updateFrame'],Sprite_StateIcon['prototype'][_0x2e20ee(0x53e)]=function(){const _0x364cf0=_0x2e20ee;VisuMZ[_0x364cf0(0x17b)][_0x364cf0(0x79f)][_0x364cf0(0x7c6)](this),this[_0x364cf0(0x18b)]=this[_0x364cf0(0x511)]>0x0?!![]:![];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x51a)]=Sprite_Weapon['prototype']['loadBitmap'],Sprite_Weapon[_0x2e20ee(0x112)][_0x2e20ee(0x3f5)]=function(){const _0x21f134=_0x2e20ee;VisuMZ[_0x21f134(0x17b)]['Sprite_Weapon_loadBitmap'][_0x21f134(0x7c6)](this),this[_0x21f134(0x4e1)]&&(this[_0x21f134(0x4e1)][_0x21f134(0x260)]=VisuMZ['BattleCore'][_0x21f134(0x1bf)][_0x21f134(0x47d)][_0x21f134(0x7cb)]);};function Sprite_HpGauge(){this['initialize'](...arguments);}Sprite_HpGauge['prototype']=Object[_0x2e20ee(0x133)](Sprite_Gauge['prototype']),Sprite_HpGauge[_0x2e20ee(0x112)][_0x2e20ee(0x177)]=Sprite_HpGauge,Sprite_HpGauge['prototype'][_0x2e20ee(0x527)]=function(){const _0x2d954d=_0x2e20ee;Sprite_Gauge['prototype'][_0x2d954d(0x527)]['call'](this);},Sprite_HpGauge[_0x2e20ee(0x112)]['gaugeX']=function(){return 0x0;},Sprite_HpGauge['prototype'][_0x2e20ee(0x7f7)]=function(){const _0x5f2e3a=_0x2e20ee;this[_0x5f2e3a(0x4e1)][_0x5f2e3a(0x6e4)]();const _0x53af6d=this[_0x5f2e3a(0x708)]();!isNaN(_0x53af6d)&&this[_0x5f2e3a(0x4de)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x68e)]=Sprite_Battleback[_0x2e20ee(0x112)]['adjustPosition'],Sprite_Battleback[_0x2e20ee(0x112)][_0x2e20ee(0x675)]=function(){const _0x3c6d5f=_0x2e20ee,_0x5dac68=VisuMZ[_0x3c6d5f(0x17b)][_0x3c6d5f(0x1bf)][_0x3c6d5f(0x17a)];if(!_0x5dac68)return VisuMZ['BattleCore']['Sprite_Battleback_adjustPosition'][_0x3c6d5f(0x7c6)](this);const _0x4c7a3b=String(_0x5dac68[_0x3c6d5f(0x793)])||'MZ';switch(_0x4c7a3b){case'MZ':VisuMZ[_0x3c6d5f(0x17b)]['Sprite_Battleback_adjustPosition'][_0x3c6d5f(0x7c6)](this);break;case'1:1':this['adjustPosition_1for1']();break;case _0x3c6d5f(0x6da):this[_0x3c6d5f(0x52b)]();break;case _0x3c6d5f(0x5d9):this[_0x3c6d5f(0x2e3)]();break;case _0x3c6d5f(0x428):this['adjustPosition_ScaleUp']();break;}},Sprite_Battleback[_0x2e20ee(0x112)][_0x2e20ee(0x2a1)]=function(){const _0x544615=_0x2e20ee;this[_0x544615(0x71d)]=Graphics['width'],this[_0x544615(0x6cf)]=Graphics['height'];const _0x25671a=0x1;this[_0x544615(0x4e7)]['x']=_0x25671a,this[_0x544615(0x4e7)]['y']=_0x25671a,this['x']=0x0,this['y']=0x0;},Sprite_Battleback[_0x2e20ee(0x112)][_0x2e20ee(0x52b)]=function(){const _0x47595a=_0x2e20ee;this[_0x47595a(0x71d)]=Graphics['width'],this[_0x47595a(0x6cf)]=Graphics[_0x47595a(0x6cf)];const _0x241b57=this['width']/this[_0x47595a(0x4e1)]['width'],_0x26f4f1=this[_0x47595a(0x6cf)]/this[_0x47595a(0x4e1)][_0x47595a(0x6cf)],_0x7aabe4=Math[_0x47595a(0x376)](_0x241b57,_0x26f4f1);this[_0x47595a(0x4e7)]['x']=_0x7aabe4,this[_0x47595a(0x4e7)]['y']=_0x7aabe4,this['x']=(Graphics['width']-this[_0x47595a(0x71d)])/0x2,this['y']=Graphics[_0x47595a(0x6cf)]-this[_0x47595a(0x6cf)];},Sprite_Battleback['prototype'][_0x2e20ee(0x2e3)]=function(){const _0x511e46=_0x2e20ee;this['width']=Graphics['width'],this[_0x511e46(0x6cf)]=Graphics[_0x511e46(0x6cf)];const _0x544286=Math[_0x511e46(0x567)](0x1,this[_0x511e46(0x71d)]/this[_0x511e46(0x4e1)]['width']),_0x2576b8=Math[_0x511e46(0x567)](0x1,this[_0x511e46(0x6cf)]/this[_0x511e46(0x4e1)][_0x511e46(0x6cf)]),_0x4e5ac7=Math['max'](_0x544286,_0x2576b8);this[_0x511e46(0x4e7)]['x']=_0x4e5ac7,this['scale']['y']=_0x4e5ac7,this['x']=(Graphics['width']-this['width'])/0x2,this['y']=Graphics[_0x511e46(0x6cf)]-this[_0x511e46(0x6cf)];},Sprite_Battleback[_0x2e20ee(0x112)][_0x2e20ee(0x366)]=function(){const _0x2a9e87=_0x2e20ee;this[_0x2a9e87(0x71d)]=Graphics['width'],this['height']=Graphics[_0x2a9e87(0x6cf)];const _0x26898b=Math[_0x2a9e87(0x376)](0x1,this[_0x2a9e87(0x71d)]/this['bitmap'][_0x2a9e87(0x71d)]),_0x6ab739=Math[_0x2a9e87(0x376)](0x1,this['height']/this['bitmap'][_0x2a9e87(0x6cf)]),_0xc96069=Math[_0x2a9e87(0x376)](_0x26898b,_0x6ab739);this[_0x2a9e87(0x4e7)]['x']=_0xc96069,this[_0x2a9e87(0x4e7)]['y']=_0xc96069,this['x']=(Graphics['width']-this['width'])/0x2,this['y']=Graphics['height']-this[_0x2a9e87(0x6cf)];},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xc4)]=function(){const _0x76455f=_0x2e20ee;if(!$gameSystem[_0x76455f(0xde)]())return![];return![];},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x70a)]=function(){return 0x0;},Spriteset_Battle['prototype'][_0x2e20ee(0x292)]=function(){return 0x0;},VisuMZ['BattleCore'][_0x2e20ee(0x4eb)]=Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x730)],Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x730)]=function(){const _0x1a3f70=_0x2e20ee;VisuMZ[_0x1a3f70(0x17b)]['Spriteset_Battle_createLowerLayer']['call'](this),this[_0x1a3f70(0x314)]();},VisuMZ['BattleCore'][_0x2e20ee(0x5fd)]=Spriteset_Battle['prototype']['update'],Spriteset_Battle[_0x2e20ee(0x112)]['update']=function(){const _0x100645=_0x2e20ee;VisuMZ[_0x100645(0x17b)][_0x100645(0x5fd)][_0x100645(0x7c6)](this),this['updateWeather']();},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x314)]=function(){const _0x1ce3b1=_0x2e20ee;this[_0x1ce3b1(0x761)]=new Weather(),this['_battleField'][_0x1ce3b1(0xf9)](this[_0x1ce3b1(0x761)]);},Spriteset_Battle['prototype']['updateWeather']=function(){const _0x58f45b=_0x2e20ee;this[_0x58f45b(0x761)][_0x58f45b(0x78e)]=$gameScreen[_0x58f45b(0x26a)](),this[_0x58f45b(0x761)][_0x58f45b(0x593)]=$gameScreen[_0x58f45b(0x77d)]();},Game_Interpreter['prototype']['command236']=function(_0x38b287){const _0xfc10a9=_0x2e20ee;$gameScreen[_0xfc10a9(0xee)](_0x38b287[0x0],_0x38b287[0x1],_0x38b287[0x2]);if(_0x38b287[0x3])this['wait'](_0x38b287[0x2]);return!![];},VisuMZ[_0x2e20ee(0x17b)]['Game_Interpreter_command283']=Game_Interpreter[_0x2e20ee(0x112)][_0x2e20ee(0x7f0)],Game_Interpreter['prototype'][_0x2e20ee(0x7f0)]=function(_0x22798d){const _0x590545=_0x2e20ee;return SceneManager[_0x590545(0x14c)]()?(SceneManager[_0x590545(0x4e6)][_0x590545(0x2af)]['changeBattlebacks'](_0x22798d[0x0],_0x22798d[0x1]),!![]):VisuMZ['BattleCore'][_0x590545(0x3c2)][_0x590545(0x7c6)](this,_0x22798d);},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x812)]=function(_0x4e505c,_0x35d725){const _0x1b1ca8=_0x2e20ee;_0x4e505c[_0x1b1ca8(0x4e1)]=_0x35d725;},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x290)]=function(_0x4b5661,_0x455016){const _0x1fee80=_0x2e20ee;_0x4b5661=_0x4b5661||'',_0x455016=_0x455016||'';_0x4b5661===''&&_0x455016===''&&(_0x4b5661=this[_0x1fee80(0x345)][_0x1fee80(0x32b)](),_0x455016=this['_back2Sprite'][_0x1fee80(0x246)]());const _0x37290f=ImageManager[_0x1fee80(0x55c)](_0x4b5661),_0x4e5670=ImageManager['loadBattleback2'](_0x455016);_0x37290f[_0x1fee80(0x535)](this[_0x1fee80(0x440)][_0x1fee80(0x70c)](this,this[_0x1fee80(0x345)],this[_0x1fee80(0x821)],_0x37290f,_0x4e5670));},Spriteset_Battle[_0x2e20ee(0x112)]['updateBattlebackBitmap1']=function(_0x4410b6,_0x33f593,_0x35c59a,_0x13f81d){const _0x3f72d3=_0x2e20ee;_0x13f81d['addLoadListener'](this[_0x3f72d3(0x781)][_0x3f72d3(0x70c)](this,_0x4410b6,_0x33f593,_0x35c59a,_0x13f81d));},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x781)]=function(_0x1d0898,_0x149c57,_0x1e5017,_0x27db19){const _0xaaad88=_0x2e20ee;_0x1d0898[_0xaaad88(0x4e1)]=_0x1e5017,_0x149c57['bitmap']=_0x27db19,_0x1d0898[_0xaaad88(0x675)](),_0x149c57['adjustPosition']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x285)]=Spriteset_Battle[_0x2e20ee(0x112)]['createBattleField'],Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x5d3)]=function(){const _0x4770bd=_0x2e20ee;VisuMZ[_0x4770bd(0x17b)][_0x4770bd(0x285)][_0x4770bd(0x7c6)](this),this[_0x4770bd(0x1d0)]();},Spriteset_Battle['prototype']['createBattleFieldBattleCore']=function(){const _0x233a4f=_0x2e20ee;this[_0x233a4f(0x3a3)](),this['createAnimationContainer'](),this[_0x233a4f(0x53f)](),this[_0x233a4f(0x408)]();},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x3a3)]=function(){const _0x2d8a1a=_0x2e20ee;this['_battlerContainer']=new Sprite(),this[_0x2d8a1a(0x5d7)][_0x2d8a1a(0xf9)](this[_0x2d8a1a(0x6b7)]);},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x828)]=function(){const _0x40a018=_0x2e20ee;this[_0x40a018(0x5d2)]=new Sprite(),this[_0x40a018(0x5d7)]['addChild'](this['_animationContainer']);},Spriteset_Battle['prototype']['createDamageContainer']=function(){const _0x369d7f=_0x2e20ee;this[_0x369d7f(0x62e)]=new Sprite(),this[_0x369d7f(0x62e)]['x']=this[_0x369d7f(0x5d7)]['x'],this[_0x369d7f(0x62e)]['y']=this[_0x369d7f(0x5d7)]['y'],this[_0x369d7f(0xf9)](this['_damageContainer']);},Spriteset_Battle[_0x2e20ee(0x112)]['adjustFlippedBattlefield']=function(){const _0x708750=_0x2e20ee;if(!this[_0x708750(0xc4)]())return;this['_battlerContainer'][_0x708750(0x4e7)]['x']=-0x1,this[_0x708750(0x6b7)]['x']=this[_0x708750(0x5d7)]['width'],this[_0x708750(0x5d2)][_0x708750(0x4e7)]['x']=-0x1,this['_animationContainer']['x']=this[_0x708750(0x5d7)][_0x708750(0x71d)],this[_0x708750(0x62e)][_0x708750(0x4e7)]['x']=-0x1,this[_0x708750(0x62e)]['x']=this[_0x708750(0x5d7)]['x']+this[_0x708750(0x5d7)][_0x708750(0x71d)];},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x12f)]=function(){const _0x4b6410=_0x2e20ee;Imported[_0x4b6410(0x540)]&&VisuMZ[_0x4b6410(0x219)][_0x4b6410(0x1bf)]['UI']['RepositionEnemies']&&this['repositionEnemiesByResolution']();const _0x5d33bc=$gameTroop[_0x4b6410(0xbb)](),_0x2eabea=[];for(const _0x1ad396 of _0x5d33bc){_0x2eabea[_0x4b6410(0x4d5)](new Sprite_Enemy(_0x1ad396));}_0x2eabea[_0x4b6410(0x6f7)](this[_0x4b6410(0x328)]['bind'](this));for(const _0x3b4d53 of _0x2eabea){this[_0x4b6410(0x6b7)][_0x4b6410(0xf9)](_0x3b4d53);}this[_0x4b6410(0x71c)]=_0x2eabea;},Spriteset_Battle[_0x2e20ee(0x112)]['createActors']=function(){const _0x19e859=_0x2e20ee;this['_actorSprites']=[];for(let _0x396575=0x0;_0x396575<$gameParty[_0x19e859(0x1e0)]();_0x396575++){const _0x33290b=$gameParty[_0x19e859(0x7f2)]()[_0x396575],_0x14d6e9=new Sprite_Actor();_0x14d6e9[_0x19e859(0x2fa)](_0x33290b),_0x14d6e9[_0x19e859(0x549)](_0x33290b),_0x14d6e9[_0x19e859(0x751)](),this['_actorSprites'][_0x19e859(0x4d5)](_0x14d6e9),this[_0x19e859(0x6b7)][_0x19e859(0xf9)](_0x14d6e9);}},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x448)]=function(_0x492c81,_0x780ef2,_0x45841d,_0x3d636e){const _0x34fbd6=_0x2e20ee,_0x69dc38=this['isMVAnimation'](_0x780ef2),_0x2aef14=new(_0x69dc38?Sprite_AnimationMV:Sprite_Animation)(),_0x10178f=this[_0x34fbd6(0x6dc)](_0x492c81);this[_0x34fbd6(0x33e)](_0x492c81[0x0])&&(_0x45841d=!_0x45841d),_0x2aef14[_0x34fbd6(0x818)]=_0x492c81,_0x2aef14[_0x34fbd6(0xc7)](_0x10178f,_0x780ef2,_0x45841d,_0x3d636e),this[_0x34fbd6(0x4e4)](_0x2aef14);},Spriteset_Battle['prototype'][_0x2e20ee(0x4e4)]=function(_0x4f2c74){const _0x5724eb=_0x2e20ee;this['isAnimationShownOnBattlePortrait'](_0x4f2c74)?this[_0x5724eb(0x235)]()['addChild'](_0x4f2c74):this[_0x5724eb(0x5d2)]['addChild'](_0x4f2c74),this[_0x5724eb(0x42d)][_0x5724eb(0x4d5)](_0x4f2c74);},Spriteset_Battle['prototype'][_0x2e20ee(0x135)]=function(_0x236c81){const _0x3c8074=_0x2e20ee;if(!_0x236c81)return![];if(!_0x236c81[_0x3c8074(0x710)])return![];if(_0x236c81['_animation'][_0x3c8074(0x259)]!==0x0)return![];if(!_0x236c81['targetObjects'][0x0])return![];if(!_0x236c81[_0x3c8074(0x818)][0x0]['isActor']())return![];if($gameSystem[_0x3c8074(0xde)]())return![];if(!this[_0x3c8074(0x235)]())return![];return Window_BattleStatus[_0x3c8074(0x112)][_0x3c8074(0x15e)]()===_0x3c8074(0x3e0);},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x235)]=function(){const _0x20a8c2=_0x2e20ee;if(!SceneManager['_scene'])return;if(!SceneManager[_0x20a8c2(0x4e6)][_0x20a8c2(0x3bb)])return;if(!SceneManager[_0x20a8c2(0x4e6)]['_statusWindow']['_effectsContainer'])return;return SceneManager[_0x20a8c2(0x4e6)][_0x20a8c2(0x3bb)][_0x20a8c2(0x736)];},Spriteset_Battle['prototype']['removeAnimation']=function(_0x5bd2aa){const _0x17c426=_0x2e20ee;this['removeAnimationFromContainer'](_0x5bd2aa);for(const _0x9829e7 of _0x5bd2aa[_0x17c426(0x818)]){_0x9829e7[_0x17c426(0x3d3)]&&_0x9829e7['endAnimation']();}_0x5bd2aa[_0x17c426(0x28d)]();},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xcf)]=function(_0x3b9ecd){const _0x3e13e5=_0x2e20ee;this[_0x3e13e5(0x42d)][_0x3e13e5(0x650)](_0x3b9ecd),this[_0x3e13e5(0x135)](_0x3b9ecd)?this['battleStatusWindowAnimationContainer']()[_0x3e13e5(0x29a)](_0x3b9ecd):this['_animationContainer'][_0x3e13e5(0x29a)](_0x3b9ecd);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x3fa)]=Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xd1)],Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0xd1)]=function(){const _0x53ac90=_0x2e20ee;VisuMZ[_0x53ac90(0x17b)][_0x53ac90(0x3fa)][_0x53ac90(0x7c6)](this),this[_0x53ac90(0x28e)]();},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x28e)]=function(){const _0x4ba25b=_0x2e20ee;this[_0x4ba25b(0x6b7)]['children'][_0x4ba25b(0x6f7)](this['compareBattlerSprites'][_0x4ba25b(0x70c)](this)),this[_0x4ba25b(0x7d2)]();},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x7a6)]=function(_0x5080ce,_0x41cb10){const _0x23a74a=_0x2e20ee;if(VisuMZ[_0x23a74a(0x17b)][_0x23a74a(0x1bf)][_0x23a74a(0x47d)][_0x23a74a(0x678)]){if(_0x5080ce[_0x23a74a(0x681)]&&_0x41cb10[_0x23a74a(0x681)]){if(_0x5080ce[_0x23a74a(0x681)][_0x23a74a(0x13d)]()&&_0x41cb10[_0x23a74a(0x681)][_0x23a74a(0x5c8)]())return 0x1;else{if(_0x41cb10[_0x23a74a(0x681)][_0x23a74a(0x13d)]()&&_0x5080ce[_0x23a74a(0x681)][_0x23a74a(0x5c8)]())return-0x1;}}}return _0x5080ce[_0x23a74a(0x4af)]!==_0x41cb10[_0x23a74a(0x4af)]?_0x5080ce[_0x23a74a(0x4af)]-_0x41cb10[_0x23a74a(0x4af)]:_0x41cb10['spriteId']-_0x5080ce[_0x23a74a(0x51f)];},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x7d2)]=function(){const _0x5745f0=_0x2e20ee;if(!VisuMZ[_0x5745f0(0x17b)]['Settings'][_0x5745f0(0x47d)][_0x5745f0(0x6b4)])return;const _0x3676c2=BattleManager[_0x5745f0(0x3ca)];if(_0x3676c2){if(_0x3676c2[_0x5745f0(0x13d)]()&&!$gameSystem[_0x5745f0(0xde)]())return;const _0x249c91=_0x3676c2[_0x5745f0(0x7ec)]();if(_0x249c91&&_0x3676c2[_0x5745f0(0x13d)]())this[_0x5745f0(0x6b7)][_0x5745f0(0xf9)](_0x249c91);}},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x496)]=function(){const _0x486707=_0x2e20ee;for(const _0x251129 of $gameParty[_0x486707(0x11b)]()){if(!_0x251129)continue;if(!_0x251129['battler']())continue;_0x251129['battler']()[_0x486707(0x5c5)]=!![],_0x251129[_0x486707(0x7ec)]()['retreat']();}},Spriteset_Battle[_0x2e20ee(0x112)]['isBusy']=function(){return![];},Spriteset_Battle[_0x2e20ee(0x112)]['isAnyoneFloating']=function(){const _0x433b6f=_0x2e20ee;return this[_0x433b6f(0x438)]()[_0x433b6f(0x763)](_0x52b183=>_0x52b183['isFloating']());},Spriteset_Battle[_0x2e20ee(0x112)]['isAnyoneJumping']=function(){const _0x43eed3=_0x2e20ee;return this[_0x43eed3(0x438)]()[_0x43eed3(0x763)](_0x2cf4e8=>_0x2cf4e8[_0x43eed3(0x68b)]());},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x799)]=function(){const _0x48e434=_0x2e20ee;return this[_0x48e434(0x438)]()[_0x48e434(0x763)](_0x188337=>_0x188337[_0x48e434(0x305)]());},Spriteset_Battle['prototype']['isAnyoneSkewing']=function(){const _0x25129d=_0x2e20ee;return this[_0x25129d(0x438)]()[_0x25129d(0x763)](_0x381d98=>_0x381d98[_0x25129d(0x5db)]());},Spriteset_Battle[_0x2e20ee(0x112)][_0x2e20ee(0x183)]=function(){const _0x2c736a=_0x2e20ee;return this[_0x2c736a(0x438)]()['some'](_0x20bffe=>_0x20bffe[_0x2c736a(0x141)]());},Spriteset_Battle['prototype'][_0x2e20ee(0x725)]=function(){const _0x3a667e=_0x2e20ee;return this[_0x3a667e(0x438)]()[_0x3a667e(0x763)](_0x43b726=>_0x43b726['isChangingOpacity']());},VisuMZ['BattleCore']['Window_ItemList_maxCols']=Window_ItemList[_0x2e20ee(0x112)]['maxCols'],Window_ItemList['prototype']['maxCols']=function(){const _0x1df45b=_0x2e20ee;return SceneManager[_0x1df45b(0x14c)]()?SceneManager['_scene'][_0x1df45b(0x15e)]()===_0x1df45b(0x4c9)?VisuMZ['BattleCore']['Settings']['BattleLayout'][_0x1df45b(0x6c7)]:VisuMZ[_0x1df45b(0x17b)][_0x1df45b(0x1bf)]['BattleLayout']['SkillItemStandardCols']:VisuMZ[_0x1df45b(0x17b)][_0x1df45b(0x6fd)][_0x1df45b(0x7c6)](this);},VisuMZ['BattleCore'][_0x2e20ee(0x542)]=Window_SkillList['prototype'][_0x2e20ee(0x82d)],Window_SkillList[_0x2e20ee(0x112)][_0x2e20ee(0x82d)]=function(){const _0x2d17c7=_0x2e20ee;return SceneManager[_0x2d17c7(0x14c)]()?SceneManager[_0x2d17c7(0x4e6)][_0x2d17c7(0x15e)]()===_0x2d17c7(0x4c9)?VisuMZ[_0x2d17c7(0x17b)][_0x2d17c7(0x1bf)]['BattleLayout'][_0x2d17c7(0x6c7)]:VisuMZ['BattleCore'][_0x2d17c7(0x1bf)][_0x2d17c7(0x41b)][_0x2d17c7(0x15f)]:VisuMZ['BattleCore'][_0x2d17c7(0x542)]['call'](this);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x78c)]=Window_Options['prototype'][_0x2e20ee(0x7ff)],Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x7ff)]=function(){const _0x27ad9d=_0x2e20ee;VisuMZ[_0x27ad9d(0x17b)][_0x27ad9d(0x78c)]['call'](this),this[_0x27ad9d(0x3d2)](),this['addShowHpGaugeCommand']();},Window_Options['prototype'][_0x2e20ee(0x3d2)]=function(){const _0x45ca18=_0x2e20ee;VisuMZ[_0x45ca18(0x17b)][_0x45ca18(0x1bf)][_0x45ca18(0x769)]['AddOption']&&(this['addBattleCoreAutoBattleStartupCommand'](),this[_0x45ca18(0x409)]());},Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x44b)]=function(){const _0x3e4003=_0x2e20ee;if(!VisuMZ[_0x3e4003(0x17b)]['Settings']['HpGauge'][_0x3e4003(0xc6)])return;const _0x1f172a=TextManager[_0x3e4003(0x1b2)],_0x227339=_0x3e4003(0x1b2);this[_0x3e4003(0xce)](_0x1f172a,_0x227339);},Window_Options['prototype']['addBattleCoreAutoBattleStartupCommand']=function(){const _0x3073d7=_0x2e20ee,_0x398a02=TextManager[_0x3073d7(0x343)],_0x39e5ac=_0x3073d7(0x38f);this['addCommand'](_0x398a02,_0x39e5ac);},Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x409)]=function(){const _0x57f925=_0x2e20ee,_0x1ed1bc=TextManager[_0x57f925(0x20a)],_0x4f8e31='autoBattleUseSkills';this['addCommand'](_0x1ed1bc,_0x4f8e31);},VisuMZ[_0x2e20ee(0x17b)]['Window_Options_statusText']=Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x2c7)],Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x2c7)]=function(_0x5381b5){const _0x450e9b=_0x2e20ee,_0x428a2e=this['commandSymbol'](_0x5381b5);return _0x428a2e===_0x450e9b(0x2c0)?this[_0x450e9b(0x30a)]():VisuMZ[_0x450e9b(0x17b)][_0x450e9b(0x719)]['call'](this,_0x5381b5);},Window_Options[_0x2e20ee(0x112)][_0x2e20ee(0x30a)]=function(){const _0xa17cef=_0x2e20ee,_0x306cdc=VisuMZ['BattleCore']['Settings'][_0xa17cef(0x769)],_0x3d9197=this[_0xa17cef(0x34b)]('autoBattleUseSkills');return _0x3d9197?_0x306cdc['StyleON']:_0x306cdc[_0xa17cef(0x734)];},Window_ShopStatus['prototype'][_0x2e20ee(0x54b)]=function(){const _0x22b3ca=_0x2e20ee,_0x3a1ff6=DataManager[_0x22b3ca(0x5cf)](this[_0x22b3ca(0xef)]),_0x21989c=VisuMZ['DamageStyles'][_0x3a1ff6];if(!_0x21989c)return this[_0x22b3ca(0xfc)]();const _0x237142=_0x22b3ca(0x6dd)[_0x22b3ca(0x483)](this[_0x22b3ca(0xef)][_0x22b3ca(0x5bc)][_0x22b3ca(0x78e)]),_0x36e7dd=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x22b3ca(0xef)][_0x22b3ca(0x5bc)][_0x22b3ca(0x78e)]];return _0x21989c[_0x237142]['format'](_0x36e7dd);},Window_ShopStatus[_0x2e20ee(0x112)]['getItemDamageAmountTextBattleCore']=function(){const _0x30c6e4=_0x2e20ee,_0x294250=DataManager[_0x30c6e4(0x5cf)](this['_item']),_0x51c61b=VisuMZ[_0x30c6e4(0x214)][_0x294250];if(!_0x51c61b)return this[_0x30c6e4(0x628)]();return _0x51c61b[_0x30c6e4(0x28f)][_0x30c6e4(0x7c6)](this);},VisuMZ['BattleCore'][_0x2e20ee(0x185)]=Window_PartyCommand['prototype'][_0x2e20ee(0x527)],Window_PartyCommand['prototype'][_0x2e20ee(0x527)]=function(_0x5de6a0){const _0x38f825=_0x2e20ee;VisuMZ[_0x38f825(0x17b)][_0x38f825(0x185)]['call'](this,_0x5de6a0),this[_0x38f825(0x240)](_0x5de6a0);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x240)]=function(_0x2b3262){const _0x628bfd=_0x2e20ee,_0x3cba6d=new Rectangle(0x0,0x0,_0x2b3262[_0x628bfd(0x71d)],_0x2b3262[_0x628bfd(0x6cf)]);this[_0x628bfd(0x4f2)]=new Window_Base(_0x3cba6d),this[_0x628bfd(0x4f2)]['opacity']=0x0,this[_0x628bfd(0xf9)](this['_commandNameWindow']),this[_0x628bfd(0x64d)]();},Window_PartyCommand[_0x2e20ee(0x112)]['callUpdateHelp']=function(){const _0x340f06=_0x2e20ee;Window_Command[_0x340f06(0x112)][_0x340f06(0x2e2)][_0x340f06(0x7c6)](this);if(this[_0x340f06(0x4f2)])this['updateCommandNameWindow']();},Window_PartyCommand['prototype']['updateCommandNameWindow']=function(){const _0x2b4e65=_0x2e20ee,_0x2e35cc=this[_0x2b4e65(0x4f2)];_0x2e35cc[_0x2b4e65(0x57c)][_0x2b4e65(0x6e4)]();const _0x55ed00=this['commandStyleCheck'](this['index']());if(_0x55ed00===_0x2b4e65(0x258)&&this[_0x2b4e65(0x707)]()>0x0){const _0x5046e9=this[_0x2b4e65(0xe9)](this[_0x2b4e65(0x348)]());let _0x48ecdd=this['commandName'](this[_0x2b4e65(0x348)]());_0x48ecdd=_0x48ecdd['replace'](/\\I\[(\d+)\]/gi,''),_0x2e35cc[_0x2b4e65(0x268)](),this['commandNameWindowDrawBackground'](_0x48ecdd,_0x5046e9),this[_0x2b4e65(0x122)](_0x48ecdd,_0x5046e9),this[_0x2b4e65(0xf2)](_0x48ecdd,_0x5046e9);}},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x724)]=function(_0x37b68a,_0xdea21d){},Window_PartyCommand[_0x2e20ee(0x112)]['commandNameWindowDrawText']=function(_0x1cc9f3,_0x938087){const _0x209621=_0x2e20ee,_0x5c72f6=this[_0x209621(0x4f2)];_0x5c72f6[_0x209621(0x261)](_0x1cc9f3,0x0,_0x938087['y'],_0x5c72f6[_0x209621(0x703)],_0x209621(0x1cc));},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0xf2)]=function(_0x175cff,_0x88133d){const _0x1018e0=_0x2e20ee,_0x3d7778=this['_commandNameWindow'],_0x2a120b=$gameSystem['windowPadding'](),_0x2ab106=_0x88133d['x']+Math[_0x1018e0(0x175)](_0x88133d['width']/0x2)+_0x2a120b;_0x3d7778['x']=_0x3d7778[_0x1018e0(0x71d)]/-0x2+_0x2ab106,_0x3d7778['y']=Math[_0x1018e0(0x175)](_0x88133d['height']/0x2);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x811)]=function(){const _0x3b6880=_0x2e20ee;this[_0x3b6880(0x13e)](),this['addAutoBattleCommand'](),this['addCustomCommands'](),this[_0x3b6880(0x140)](),this[_0x3b6880(0x824)]();},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x13e)]=function(){const _0x3ab09a=_0x2e20ee,_0x47fd7c=this[_0x3ab09a(0x2b5)](),_0x17d7cf=VisuMZ['BattleCore'][_0x3ab09a(0x1bf)]['PartyCmd']['CmdIconFight'],_0x213ec4=_0x47fd7c===_0x3ab09a(0x51b)?TextManager['fight']:_0x3ab09a(0x6a4)[_0x3ab09a(0x483)](_0x17d7cf,TextManager[_0x3ab09a(0x825)]),_0x3eebf6=this[_0x3ab09a(0x15d)]();this['addCommand'](_0x213ec4,_0x3ab09a(0x825),_0x3eebf6);},Window_PartyCommand[_0x2e20ee(0x112)]['isFightCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x6d6)]=function(){const _0x5d48e5=_0x2e20ee;if(!this[_0x5d48e5(0x337)]())return;const _0xc89eb3=this[_0x5d48e5(0x2b5)](),_0x2e99a5=VisuMZ[_0x5d48e5(0x17b)][_0x5d48e5(0x1bf)][_0x5d48e5(0x490)][_0x5d48e5(0x218)],_0x314fe0=_0xc89eb3===_0x5d48e5(0x51b)?TextManager['autoBattle']:'\x5cI[%1]%2'['format'](_0x2e99a5,TextManager[_0x5d48e5(0x2e7)]),_0x48b105=this[_0x5d48e5(0x44c)]();this[_0x5d48e5(0xce)](_0x314fe0,_0x5d48e5(0x2e7),_0x48b105);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x337)]=function(){const _0x37745a=_0x2e20ee;return VisuMZ[_0x37745a(0x17b)][_0x37745a(0x1bf)][_0x37745a(0x490)][_0x37745a(0x592)];},Window_PartyCommand[_0x2e20ee(0x112)]['isAutoBattleCommandEnabled']=function(){return!![];},Window_PartyCommand[_0x2e20ee(0x112)]['addCustomCommands']=function(){},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x140)]=function(){const _0x10188d=_0x2e20ee;if(!this[_0x10188d(0x5fc)]())return;const _0x3c6e1=this[_0x10188d(0x2b5)](),_0x1e7541=VisuMZ[_0x10188d(0x17b)]['Settings'][_0x10188d(0x490)][_0x10188d(0x5f5)],_0x3d085f=_0x3c6e1===_0x10188d(0x51b)?TextManager[_0x10188d(0x3b1)]:_0x10188d(0x6a4)[_0x10188d(0x483)](_0x1e7541,TextManager[_0x10188d(0x3b1)]),_0x422298=this['isOptionsCommandEnabled']();this[_0x10188d(0xce)](_0x3d085f,_0x10188d(0x3b1),_0x422298);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x5fc)]=function(){const _0x18b5d9=_0x2e20ee;return VisuMZ['BattleCore'][_0x18b5d9(0x1bf)][_0x18b5d9(0x490)][_0x18b5d9(0x60b)];},Window_PartyCommand['prototype'][_0x2e20ee(0x626)]=function(){return!![];},Window_PartyCommand['prototype'][_0x2e20ee(0x824)]=function(){const _0x55d725=_0x2e20ee,_0x54a184=this[_0x55d725(0x2b5)](),_0x559a95=VisuMZ[_0x55d725(0x17b)][_0x55d725(0x1bf)][_0x55d725(0x490)][_0x55d725(0x669)],_0x3eb8ff=_0x54a184===_0x55d725(0x51b)?TextManager[_0x55d725(0x407)]:_0x55d725(0x6a4)['format'](_0x559a95,TextManager[_0x55d725(0x407)]),_0x34f4ad=this[_0x55d725(0x3a6)]();this[_0x55d725(0xce)](_0x3eb8ff,'escape',_0x34f4ad);},Window_PartyCommand['prototype'][_0x2e20ee(0x3a6)]=function(){const _0x47915b=_0x2e20ee;return BattleManager[_0x47915b(0x3de)]();},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x72c)]=function(){const _0x29b34e=_0x2e20ee;return VisuMZ[_0x29b34e(0x17b)][_0x29b34e(0x1bf)]['PartyCmd'][_0x29b34e(0x6f4)];},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x16e)]=function(_0x455746){const _0x12f7df=_0x2e20ee,_0x2567f6=this[_0x12f7df(0x167)](_0x455746);if(_0x2567f6===_0x12f7df(0x37a))this['drawItemStyleIconText'](_0x455746);else _0x2567f6===_0x12f7df(0x258)?this[_0x12f7df(0x697)](_0x455746):Window_Command[_0x12f7df(0x112)][_0x12f7df(0x16e)][_0x12f7df(0x7c6)](this,_0x455746);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x2b5)]=function(){const _0x2d5471=_0x2e20ee;return VisuMZ[_0x2d5471(0x17b)]['Settings'][_0x2d5471(0x490)][_0x2d5471(0x28b)];},Window_PartyCommand[_0x2e20ee(0x112)]['commandStyleCheck']=function(_0x13aab7){const _0x535a59=_0x2e20ee;if(_0x13aab7<0x0)return _0x535a59(0x51b);const _0x1c3352=this[_0x535a59(0x2b5)]();if(_0x1c3352!==_0x535a59(0x225))return _0x1c3352;else{if(this[_0x535a59(0x707)]()>0x0){const _0x38a0e0=this[_0x535a59(0x5d0)](_0x13aab7);if(_0x38a0e0[_0x535a59(0x26f)](/\\I\[(\d+)\]/i)){const _0xf74263=this['itemLineRect'](_0x13aab7),_0x326d36=this[_0x535a59(0x552)](_0x38a0e0)[_0x535a59(0x71d)];return _0x326d36<=_0xf74263[_0x535a59(0x71d)]?_0x535a59(0x37a):_0x535a59(0x258);}}}return _0x535a59(0x51b);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x415)]=function(_0x40baf1){const _0x29795b=_0x2e20ee,_0x2e771e=this[_0x29795b(0xe9)](_0x40baf1),_0x4a3140=this[_0x29795b(0x5d0)](_0x40baf1),_0x21d6b5=this[_0x29795b(0x552)](_0x4a3140)[_0x29795b(0x71d)];this[_0x29795b(0x7c7)](this[_0x29795b(0x515)](_0x40baf1));const _0x2b9fc2=this[_0x29795b(0x72c)]();if(_0x2b9fc2===_0x29795b(0x47a))this[_0x29795b(0x230)](_0x4a3140,_0x2e771e['x']+_0x2e771e[_0x29795b(0x71d)]-_0x21d6b5,_0x2e771e['y'],_0x21d6b5);else{if(_0x2b9fc2===_0x29795b(0x1cc)){const _0x465014=_0x2e771e['x']+Math[_0x29795b(0x175)]((_0x2e771e[_0x29795b(0x71d)]-_0x21d6b5)/0x2);this[_0x29795b(0x230)](_0x4a3140,_0x465014,_0x2e771e['y'],_0x21d6b5);}else this['drawTextEx'](_0x4a3140,_0x2e771e['x'],_0x2e771e['y'],_0x21d6b5);}},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x697)]=function(_0x3c0e17){const _0x47aa81=_0x2e20ee;this[_0x47aa81(0x5d0)](_0x3c0e17)[_0x47aa81(0x26f)](/\\I\[(\d+)\]/i);const _0x3b4786=Number(RegExp['$1'])||0x0,_0x5917ce=this['itemLineRect'](_0x3c0e17),_0x2316a2=_0x5917ce['x']+Math[_0x47aa81(0x175)]((_0x5917ce[_0x47aa81(0x71d)]-ImageManager['iconWidth'])/0x2),_0x4029d7=_0x5917ce['y']+(_0x5917ce['height']-ImageManager[_0x47aa81(0x2fe)])/0x2;this['drawIcon'](_0x3b4786,_0x2316a2,_0x4029d7);},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x1fc)]=function(){},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x296)]=function(){const _0x54a1bd=_0x2e20ee;Window_Command[_0x54a1bd(0x112)]['activate']['call'](this);const _0x32c848=this[_0x54a1bd(0x15e)]();_0x32c848===_0x54a1bd(0x4c9)&&this[_0x54a1bd(0x581)]();},Window_PartyCommand[_0x2e20ee(0x112)][_0x2e20ee(0x15e)]=function(){const _0xa6e47e=_0x2e20ee;if(this[_0xa6e47e(0x550)])return this['_battleLayoutStyle'];return this[_0xa6e47e(0x550)]=SceneManager['_scene'][_0xa6e47e(0x15e)](),this[_0xa6e47e(0x550)];},Window_PartyCommand['prototype']['updateHelp']=function(){const _0x2a26f5=_0x2e20ee,_0x3c2962=VisuMZ[_0x2a26f5(0x17b)][_0x2a26f5(0x1bf)]['PartyCmd'],_0x5b9eb3=this[_0x2a26f5(0x242)]();switch(_0x5b9eb3){case'fight':this['_helpWindow'][_0x2a26f5(0x3eb)](_0x3c2962[_0x2a26f5(0x7be)]);break;case _0x2a26f5(0x2e7):this[_0x2a26f5(0x4b5)]['setText'](_0x3c2962['HelpAutoBattle']);break;case _0x2a26f5(0x3b1):this['_helpWindow'][_0x2a26f5(0x3eb)](_0x3c2962[_0x2a26f5(0x72d)]);break;case _0x2a26f5(0x407):this[_0x2a26f5(0x4b5)][_0x2a26f5(0x3eb)](_0x3c2962[_0x2a26f5(0x677)]);break;default:this[_0x2a26f5(0x4b5)][_0x2a26f5(0x3eb)]('');break;}},VisuMZ['BattleCore'][_0x2e20ee(0x701)]=Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x527)],Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x527)]=function(_0x458a45){const _0x871187=_0x2e20ee;VisuMZ[_0x871187(0x17b)][_0x871187(0x701)][_0x871187(0x7c6)](this,_0x458a45),this[_0x871187(0x240)](_0x458a45);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x240)]=function(_0x26cb1d){const _0x542600=_0x2e20ee,_0x424ac4=new Rectangle(0x0,0x0,_0x26cb1d[_0x542600(0x71d)],_0x26cb1d[_0x542600(0x6cf)]);this['_commandNameWindow']=new Window_Base(_0x424ac4),this[_0x542600(0x4f2)][_0x542600(0x3af)]=0x0,this[_0x542600(0xf9)](this['_commandNameWindow']),this[_0x542600(0x64d)]();},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x2e2)]=function(){const _0x486724=_0x2e20ee;Window_Command[_0x486724(0x112)]['callUpdateHelp']['call'](this);if(this[_0x486724(0x4f2)])this[_0x486724(0x64d)]();},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x64d)]=function(){const _0x42d814=_0x2e20ee,_0x20a445=this['_commandNameWindow'];_0x20a445[_0x42d814(0x57c)]['clear']();const _0x39225b=this['commandStyleCheck'](this[_0x42d814(0x348)]());if(_0x39225b===_0x42d814(0x258)&&this['maxItems']()>0x0){const _0xa4b834=this[_0x42d814(0xe9)](this[_0x42d814(0x348)]());let _0x4fb9ff=this['commandName'](this[_0x42d814(0x348)]());_0x4fb9ff=_0x4fb9ff['replace'](/\\I\[(\d+)\]/gi,''),_0x20a445[_0x42d814(0x268)](),this[_0x42d814(0x724)](_0x4fb9ff,_0xa4b834),this[_0x42d814(0x122)](_0x4fb9ff,_0xa4b834),this['commandNameWindowCenter'](_0x4fb9ff,_0xa4b834);}},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x724)]=function(_0xbb2ce9,_0x2f139b){},Window_ActorCommand[_0x2e20ee(0x112)]['commandNameWindowDrawText']=function(_0x4dfc99,_0x455e9e){const _0x170182=_0x2e20ee,_0x95ea0f=this['_commandNameWindow'];_0x95ea0f[_0x170182(0x261)](_0x4dfc99,0x0,_0x455e9e['y'],_0x95ea0f[_0x170182(0x703)],_0x170182(0x1cc));},Window_ActorCommand['prototype'][_0x2e20ee(0xf2)]=function(_0x26a648,_0x384558){const _0x38f9a9=_0x2e20ee,_0x215b6d=this['_commandNameWindow'],_0x3f08c9=$gameSystem[_0x38f9a9(0x364)](),_0x33a636=_0x384558['x']+Math[_0x38f9a9(0x175)](_0x384558['width']/0x2)+_0x3f08c9;_0x215b6d['x']=_0x215b6d[_0x38f9a9(0x71d)]/-0x2+_0x33a636,_0x215b6d['y']=Math['floor'](_0x384558[_0x38f9a9(0x6cf)]/0x2);},Window_ActorCommand[_0x2e20ee(0x112)]['makeCommandList']=function(){const _0x3fdc03=_0x2e20ee;if(!this[_0x3fdc03(0x29b)])return;const _0x2b7845=this[_0x3fdc03(0x29b)][_0x3fdc03(0x4ca)]();for(const _0xe88502 of _0x2b7845){this[_0x3fdc03(0x16b)](_0xe88502['toUpperCase']()[_0x3fdc03(0x762)]());}},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x16b)]=function(_0x243b56){const _0x3c252d=_0x2e20ee;_0x243b56===_0x3c252d(0x2a8)&&this[_0x3c252d(0x40e)]();[_0x3c252d(0x489),'SKILLS']['includes'](_0x243b56)&&this['addSkillCommands']();_0x243b56==='GUARD'&&this[_0x3c252d(0x47b)]();_0x243b56===_0x3c252d(0x71a)&&this[_0x3c252d(0x801)]();_0x243b56===_0x3c252d(0x74d)&&this[_0x3c252d(0x824)]();_0x243b56===_0x3c252d(0x391)&&this[_0x3c252d(0x6d6)]();if(_0x243b56['match'](/STYPE: (\d+)/i)){const _0x582d00=Number(RegExp['$1']);this['addSkillTypeCommand'](_0x582d00);}else{if(_0x243b56[_0x3c252d(0x26f)](/STYPE: (.*)/i)){const _0x54cfd5=DataManager['getStypeIdWithName'](RegExp['$1']);this[_0x3c252d(0x70e)](_0x54cfd5);}}_0x243b56===_0x3c252d(0x55e)&&this[_0x3c252d(0x6c1)]();if(_0x243b56['match'](/SKILL: (\d+)/i)){const _0x5dc835=Number(RegExp['$1']);this[_0x3c252d(0x7d3)]($dataSkills[_0x5dc835]);}else{if(_0x243b56[_0x3c252d(0x26f)](/SKILL: (.*)/i)){const _0x1087dc=DataManager[_0x3c252d(0x524)](RegExp['$1']);this['addSingleSkillCommand']($dataSkills[_0x1087dc]);}}_0x243b56==='PARTY'&&Imported[_0x3c252d(0x820)]&&this[_0x3c252d(0x1c5)](),[_0x3c252d(0x49f),_0x3c252d(0x5f3)][_0x3c252d(0x60c)](_0x243b56)&&Imported[_0x3c252d(0x7ae)]&&this[_0x3c252d(0x63d)]();},Window_ActorCommand[_0x2e20ee(0x112)]['addAttackCommand']=function(){const _0x3c35aa=_0x2e20ee,_0x37891c=$dataSkills[this[_0x3c35aa(0x29b)][_0x3c35aa(0x410)]()];if(!_0x37891c)return;if(!this['canAddSkillCommand'](_0x37891c))return;const _0x2bce85=this['commandStyle'](),_0x516d69=DataManager[_0x3c35aa(0x114)](_0x37891c),_0x5e3d59=DataManager[_0x3c35aa(0xf4)](_0x37891c),_0x56d1dc=_0x2bce85===_0x3c35aa(0x51b)?_0x516d69:_0x3c35aa(0x6a4)[_0x3c35aa(0x483)](_0x5e3d59,_0x516d69);this['addCommand'](_0x56d1dc,_0x3c35aa(0x1c0),this[_0x3c35aa(0x29b)][_0x3c35aa(0x155)]());},Window_ActorCommand['prototype'][_0x2e20ee(0x47b)]=function(){const _0x4a7731=_0x2e20ee,_0x1122ab=$dataSkills[this['_actor'][_0x4a7731(0x7f6)]()];if(!_0x1122ab)return;if(!this[_0x4a7731(0x42a)](_0x1122ab))return;const _0x52253e=this[_0x4a7731(0x2b5)](),_0x5cbe63=DataManager[_0x4a7731(0x114)](_0x1122ab),_0x3ab483=DataManager[_0x4a7731(0xf4)](_0x1122ab),_0x1f0f54=_0x52253e===_0x4a7731(0x51b)?_0x5cbe63:_0x4a7731(0x6a4)[_0x4a7731(0x483)](_0x3ab483,_0x5cbe63);this['addCommand'](_0x1f0f54,_0x4a7731(0x201),this[_0x4a7731(0x29b)][_0x4a7731(0x29f)]());},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x801)]=function(){const _0xd4728d=_0x2e20ee,_0x30d372=this[_0xd4728d(0x2b5)](),_0x10a30e=VisuMZ[_0xd4728d(0x17b)]['Settings'][_0xd4728d(0x19e)][_0xd4728d(0x7e3)],_0x49a3e4=_0x30d372==='text'?TextManager[_0xd4728d(0x57b)]:_0xd4728d(0x6a4)[_0xd4728d(0x483)](_0x10a30e,TextManager[_0xd4728d(0x57b)]),_0x2cfad4=this[_0xd4728d(0x4fe)]();this[_0xd4728d(0xce)](_0x49a3e4,'item',_0x2cfad4);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x4fe)]=function(){const _0x3e5fee=_0x2e20ee;return this[_0x3e5fee(0x29b)]&&this[_0x3e5fee(0x29b)][_0x3e5fee(0x58c)]();},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x5de)]=function(){const _0x31181d=_0x2e20ee,_0x2236e7=this['_actor'][_0x31181d(0x733)]();for(const _0x635fef of _0x2236e7){this[_0x31181d(0x70e)](_0x635fef);}},Window_ActorCommand[_0x2e20ee(0x112)]['addSkillTypeCommand']=function(_0x24acf9){const _0x2090b1=_0x2e20ee;let _0x5cda99=$dataSystem[_0x2090b1(0x733)][_0x24acf9];if(!_0x5cda99)return;let _0x1e396d=_0x5cda99;const _0x544cfc=this[_0x2090b1(0x2b5)]();if(_0x544cfc==='text')_0x1e396d=_0x1e396d[_0x2090b1(0x1d5)](/\x1I\[(\d+)\]/gi,''),_0x1e396d=_0x1e396d[_0x2090b1(0x1d5)](/\\I\[(\d+)\]/gi,'');else{if(!_0x5cda99[_0x2090b1(0x26f)](/\\I\[(\d+)\]/i)){const _0x3aa749=Imported[_0x2090b1(0x2b3)]?VisuMZ[_0x2090b1(0x1f5)][_0x2090b1(0x1bf)]['Skills']:VisuMZ[_0x2090b1(0x17b)][_0x2090b1(0x1bf)][_0x2090b1(0x19e)],_0xfdb351=$dataSystem['magicSkills'][_0x2090b1(0x60c)](_0x24acf9),_0x1c3446=_0xfdb351?_0x3aa749[_0x2090b1(0x66e)]:_0x3aa749[_0x2090b1(0x563)];_0x1e396d=_0x2090b1(0x6a4)[_0x2090b1(0x483)](_0x1c3446,_0x5cda99);}}this['addCommand'](_0x1e396d,_0x2090b1(0xf6),!![],_0x24acf9);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x6c1)]=function(){const _0x33f396=_0x2e20ee,_0xde1435=this[_0x33f396(0x29b)][_0x33f396(0x733)](),_0x4a34be=this[_0x33f396(0x29b)][_0x33f396(0x162)]();for(const _0x278f00 of _0x4a34be){if(!_0x278f00)continue;if(Imported[_0x33f396(0x2b3)]){const _0x3abc4c=_0xde1435[_0x33f396(0x48e)](_0x35da91=>DataManager[_0x33f396(0x73b)](_0x278f00)[_0x33f396(0x60c)](_0x35da91));if(_0x3abc4c[_0x33f396(0x5c2)]<=0x0)continue;}else{if(!_0xde1435[_0x33f396(0x60c)](_0x278f00[_0x33f396(0x591)]))continue;}this['addSingleSkillCommand'](_0x278f00);}},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x7d3)]=function(_0x29ce14){const _0x23bcfd=_0x2e20ee;if(!_0x29ce14)return;if(!this['canAddSkillCommand'](_0x29ce14))return;const _0xd4bf3a=this[_0x23bcfd(0x2b5)](),_0x944411=DataManager[_0x23bcfd(0x114)](_0x29ce14),_0x57c5d3=DataManager[_0x23bcfd(0xf4)](_0x29ce14),_0x3c38eb=_0xd4bf3a===_0x23bcfd(0x51b)?_0x944411:_0x23bcfd(0x6a4)[_0x23bcfd(0x483)](_0x57c5d3,_0x944411),_0x34de53=this[_0x23bcfd(0x29b)][_0x23bcfd(0x726)](_0x29ce14);this[_0x23bcfd(0xce)](_0x3c38eb,'singleSkill',_0x34de53,_0x29ce14['id']);},Window_ActorCommand[_0x2e20ee(0x112)]['canAddSkillCommand']=function(_0x13cf6c){const _0x579e72=_0x2e20ee,_0xd73e22=_0x13cf6c[_0x579e72(0x37b)];if(_0xd73e22[_0x579e72(0x26f)](/<COMMAND REQUIRE LEARN>/i)){if(!this[_0x579e72(0x29b)][_0x579e72(0x667)](_0x13cf6c['id']))return![];}if(_0xd73e22['match'](/<COMMAND REQUIRE ACCESS>/i)){if(!this[_0x579e72(0x29b)][_0x579e72(0x50e)](_0x13cf6c['id']))return![];}const _0x23df08=VisuMZ['BattleCore'][_0x579e72(0x173)](_0x13cf6c,'CommandVisible');if(VisuMZ[_0x579e72(0x17b)]['JS'][_0x23df08]){if(!VisuMZ[_0x579e72(0x17b)]['JS'][_0x23df08][_0x579e72(0x7c6)](this,this['_actor'],_0x13cf6c))return![];}return VisuMZ[_0x579e72(0x17b)][_0x579e72(0x412)](_0x13cf6c);},VisuMZ['BattleCore'][_0x2e20ee(0x412)]=function(_0xac2221){const _0x519e5e=_0x2e20ee,_0x49e2b1=_0xac2221[_0x519e5e(0x37b)];if(_0x49e2b1['match'](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24bce8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x414fe7 of _0x24bce8){if(!$gameSwitches[_0x519e5e(0x189)](_0x414fe7))return![];}return!![];}if(_0x49e2b1[_0x519e5e(0x26f)](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fd176=JSON['parse']('['+RegExp['$1'][_0x519e5e(0x26f)](/\d+/g)+']');for(const _0x2fb59b of _0x3fd176){if(!$gameSwitches[_0x519e5e(0x189)](_0x2fb59b))return![];}return!![];}if(_0x49e2b1[_0x519e5e(0x26f)](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29f900=JSON[_0x519e5e(0x159)]('['+RegExp['$1'][_0x519e5e(0x26f)](/\d+/g)+']');for(const _0xfce1a0 of _0x29f900){if($gameSwitches[_0x519e5e(0x189)](_0xfce1a0))return!![];}return![];}if(_0x49e2b1[_0x519e5e(0x26f)](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x166802=JSON[_0x519e5e(0x159)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x31301d of _0x166802){if(!$gameSwitches[_0x519e5e(0x189)](_0x31301d))return!![];}return![];}if(_0x49e2b1['match'](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x54ff06=JSON[_0x519e5e(0x159)]('['+RegExp['$1'][_0x519e5e(0x26f)](/\d+/g)+']');for(const _0x2777e3 of _0x54ff06){if(!$gameSwitches['value'](_0x2777e3))return!![];}return![];}if(_0x49e2b1[_0x519e5e(0x26f)](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x437ebe=JSON[_0x519e5e(0x159)]('['+RegExp['$1'][_0x519e5e(0x26f)](/\d+/g)+']');for(const _0x210f7e of _0x437ebe){if($gameSwitches[_0x519e5e(0x189)](_0x210f7e))return![];}return!![];}return!![];},Window_ActorCommand[_0x2e20ee(0x112)]['addEscapeCommand']=function(){const _0x16c2c6=_0x2e20ee,_0x3926c5=this[_0x16c2c6(0x2b5)](),_0x3699ae=VisuMZ['BattleCore'][_0x16c2c6(0x1bf)]['PartyCmd'][_0x16c2c6(0x669)],_0x19f2e7=_0x3926c5===_0x16c2c6(0x51b)?TextManager[_0x16c2c6(0x407)]:_0x16c2c6(0x6a4)[_0x16c2c6(0x483)](_0x3699ae,TextManager[_0x16c2c6(0x407)]),_0x418f9e=this[_0x16c2c6(0x3a6)]();this[_0x16c2c6(0xce)](_0x19f2e7,'escape',_0x418f9e);},Window_ActorCommand['prototype'][_0x2e20ee(0x3a6)]=function(){const _0xbcc41e=_0x2e20ee;return BattleManager[_0xbcc41e(0x3de)]();},Window_ActorCommand['prototype'][_0x2e20ee(0x6d6)]=function(){const _0x3321b3=_0x2e20ee,_0x454849=this[_0x3321b3(0x2b5)](),_0x2d6b1a=VisuMZ[_0x3321b3(0x17b)][_0x3321b3(0x1bf)][_0x3321b3(0x490)]['CmdIconAutoBattle'],_0x1a4d76=_0x454849===_0x3321b3(0x51b)?TextManager['autoBattle']:_0x3321b3(0x6a4)['format'](_0x2d6b1a,TextManager[_0x3321b3(0x2e7)]),_0x247c83=this[_0x3321b3(0x44c)]();this['addCommand'](_0x1a4d76,_0x3321b3(0x2e7),_0x247c83);},Window_ActorCommand['prototype'][_0x2e20ee(0x44c)]=function(){return!![];},Window_ActorCommand['prototype']['itemTextAlign']=function(){const _0xbc6d45=_0x2e20ee;return VisuMZ[_0xbc6d45(0x17b)][_0xbc6d45(0x1bf)]['ActorCmd'][_0xbc6d45(0x6f4)];},Window_ActorCommand[_0x2e20ee(0x112)]['drawItem']=function(_0x1a422c){const _0x642dbb=_0x2e20ee,_0x4f1725=this[_0x642dbb(0x167)](_0x1a422c);if(_0x4f1725==='iconText')this['drawItemStyleIconText'](_0x1a422c);else _0x4f1725===_0x642dbb(0x258)?this[_0x642dbb(0x697)](_0x1a422c):Window_Command['prototype']['drawItem'][_0x642dbb(0x7c6)](this,_0x1a422c);this['drawSingleSkillCost'](_0x1a422c);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x2b5)]=function(){const _0x5535c0=_0x2e20ee;return VisuMZ[_0x5535c0(0x17b)][_0x5535c0(0x1bf)][_0x5535c0(0x19e)][_0x5535c0(0x28b)];},Window_ActorCommand['prototype']['commandStyleCheck']=function(_0x5d049c){const _0x2aa97d=_0x2e20ee;if(_0x5d049c<0x0)return'text';const _0x31d492=this[_0x2aa97d(0x2b5)]();if(_0x31d492!==_0x2aa97d(0x225))return _0x31d492;else{if(this['maxItems']()>0x0){const _0x3e8870=this['commandName'](_0x5d049c);if(_0x3e8870[_0x2aa97d(0x26f)](/\\I\[(\d+)\]/i)){const _0x4ad942=this[_0x2aa97d(0xe9)](_0x5d049c),_0x57c54b=this[_0x2aa97d(0x552)](_0x3e8870)[_0x2aa97d(0x71d)];return _0x57c54b<=_0x4ad942['width']?'iconText':'icon';}}}return _0x2aa97d(0x51b);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x415)]=function(_0xabcd67){const _0x4c38e9=_0x2e20ee,_0x592c50=this[_0x4c38e9(0xe9)](_0xabcd67),_0x23ad2d=this['commandName'](_0xabcd67),_0x346dec=this[_0x4c38e9(0x552)](_0x23ad2d)[_0x4c38e9(0x71d)];this[_0x4c38e9(0x7c7)](this[_0x4c38e9(0x515)](_0xabcd67));const _0x51fd23=this[_0x4c38e9(0x72c)]();if(_0x51fd23===_0x4c38e9(0x47a))this[_0x4c38e9(0x230)](_0x23ad2d,_0x592c50['x']+_0x592c50[_0x4c38e9(0x71d)]-_0x346dec,_0x592c50['y'],_0x346dec);else{if(_0x51fd23==='center'){const _0xe50ea7=_0x592c50['x']+Math[_0x4c38e9(0x175)]((_0x592c50[_0x4c38e9(0x71d)]-_0x346dec)/0x2);this[_0x4c38e9(0x230)](_0x23ad2d,_0xe50ea7,_0x592c50['y'],_0x346dec);}else this[_0x4c38e9(0x230)](_0x23ad2d,_0x592c50['x'],_0x592c50['y'],_0x346dec);}},Window_ActorCommand['prototype'][_0x2e20ee(0x697)]=function(_0x433c98){const _0x154df5=_0x2e20ee;this[_0x154df5(0x5d0)](_0x433c98)[_0x154df5(0x26f)](/\\I\[(\d+)\]/i);const _0x541a38=Number(RegExp['$1'])||0x0,_0x299d7b=this['itemLineRect'](_0x433c98),_0x47a3af=_0x299d7b['x']+Math[_0x154df5(0x175)]((_0x299d7b[_0x154df5(0x71d)]-ImageManager[_0x154df5(0x267)])/0x2),_0x5c31d8=_0x299d7b['y']+(_0x299d7b[_0x154df5(0x6cf)]-ImageManager[_0x154df5(0x2fe)])/0x2;this[_0x154df5(0x27f)](_0x541a38,_0x47a3af,_0x5c31d8);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x5b2)]=function(_0x3ab05c){const _0x5745c9=_0x2e20ee,_0x3240cb=this[_0x5745c9(0x4bb)](_0x3ab05c);if(![_0x5745c9(0x1c0),_0x5745c9(0x201),_0x5745c9(0x360)][_0x5745c9(0x60c)](_0x3240cb))return;const _0x1d2bbe=this[_0x5745c9(0xe9)](_0x3ab05c);let _0x38fe8a=null;if(_0x3240cb==='attack')_0x38fe8a=$dataSkills[this[_0x5745c9(0x29b)]['attackSkillId']()];else _0x3240cb===_0x5745c9(0x201)?_0x38fe8a=$dataSkills[this[_0x5745c9(0x29b)][_0x5745c9(0x7f6)]()]:_0x38fe8a=$dataSkills[this[_0x5745c9(0x484)][_0x3ab05c][_0x5745c9(0x59b)]];this['drawSkillCost'](this[_0x5745c9(0x29b)],_0x38fe8a,_0x1d2bbe['x'],_0x1d2bbe['y'],_0x1d2bbe[_0x5745c9(0x71d)]);},Window_ActorCommand['prototype'][_0x2e20ee(0x3b4)]=function(_0x50b21d,_0x358912,_0x2df05d,_0x29ec23,_0x443bc8){const _0x1ef476=_0x2e20ee;if(!_0x358912)return;Imported['VisuMZ_1_SkillsStatesCore']?Window_Command[_0x1ef476(0x112)][_0x1ef476(0x3b4)][_0x1ef476(0x7c6)](this,_0x50b21d,_0x358912,_0x2df05d,_0x29ec23,_0x443bc8):Window_SkillList[_0x1ef476(0x112)][_0x1ef476(0x3b4)][_0x1ef476(0x7c6)](this,_0x358912,_0x2df05d,_0x29ec23,_0x443bc8);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x1fc)]=function(){},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x296)]=function(){const _0x8bdd1=_0x2e20ee;Window_Command[_0x8bdd1(0x112)][_0x8bdd1(0x296)][_0x8bdd1(0x7c6)](this);const _0xa4fde9=this['battleLayoutStyle']();_0xa4fde9===_0x8bdd1(0x4c9)&&this[_0x8bdd1(0x581)]();},Window_ActorCommand['prototype'][_0x2e20ee(0x15e)]=function(){const _0xdf27f=_0x2e20ee;if(this[_0xdf27f(0x550)])return this['_battleLayoutStyle'];return this[_0xdf27f(0x550)]=SceneManager['_scene'][_0xdf27f(0x15e)](),this[_0xdf27f(0x550)];},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x534)]=Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0xc7)],Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0xc7)]=function(_0x1f570d){const _0x583679=_0x2e20ee,_0x5c8161=this[_0x583679(0x15e)]();if(_0x1f570d&&['xp',_0x583679(0x3e0)][_0x583679(0x60c)](_0x5c8161))this[_0x583679(0x382)](_0x1f570d);else _0x1f570d&&['border'][_0x583679(0x60c)](_0x5c8161)&&(this[_0x583679(0x81f)](_0x1f570d),this['showHelpWindow']());VisuMZ[_0x583679(0x17b)][_0x583679(0x534)]['call'](this,_0x1f570d),_0x1f570d&&$gameTroop['aliveMembers']()[_0x583679(0x5c2)]>0x0&&_0x1f570d[_0x583679(0x7ec)]()&&_0x1f570d[_0x583679(0x7ec)]()['stepForward']();},Window_ActorCommand['prototype'][_0x2e20ee(0x382)]=function(_0x3df81d){const _0x4aaf45=_0x2e20ee,_0xca7b1c=Math[_0x4aaf45(0x603)](Graphics[_0x4aaf45(0x1ba)]/0x3),_0x3ddacc=Math[_0x4aaf45(0x603)](Graphics[_0x4aaf45(0x1ba)]/$gameParty[_0x4aaf45(0x7f2)]()[_0x4aaf45(0x5c2)]),_0x3dcf05=Math[_0x4aaf45(0x567)](_0xca7b1c,_0x3ddacc),_0x4f4105=this['fittingHeight'](VisuMZ['BattleCore'][_0x4aaf45(0x1bf)][_0x4aaf45(0x41b)]['XPActorCommandLines']),_0x46dbd3=_0x3ddacc*_0x3df81d[_0x4aaf45(0x348)]()+(_0x3ddacc-_0x3dcf05)/0x2,_0x280ce1=SceneManager[_0x4aaf45(0x4e6)][_0x4aaf45(0x3bb)]['y']-_0x4f4105;this['move'](_0x46dbd3,_0x280ce1,_0x3dcf05,_0x4f4105),this[_0x4aaf45(0x180)](),this[_0x4aaf45(0x2c6)](0x1);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x81f)]=function(_0x229efc){const _0x5af210=_0x2e20ee,_0x2ea430=SceneManager[_0x5af210(0x4e6)][_0x5af210(0x638)]();this[_0x5af210(0x399)](_0x2ea430['x'],_0x2ea430['y'],_0x2ea430[_0x5af210(0x71d)],_0x2ea430[_0x5af210(0x6cf)]),this[_0x5af210(0x180)](),this[_0x5af210(0x2c6)](0x0);},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x28c)]=function(){const _0x58de86=_0x2e20ee;if(this[_0x58de86(0x115)]){const _0x3a73b3=this[_0x58de86(0x115)][_0x58de86(0x4e1)],_0x153eb1=this[_0x58de86(0x71d)]-0x8,_0x4270fa=this['height'],_0x24bdee=this[_0x58de86(0x688)],_0x434bf4=ColorManager[_0x58de86(0x17f)](),_0x2915ed=ColorManager[_0x58de86(0x673)]();this[_0x58de86(0x115)]['x']=0x4,_0x3a73b3[_0x58de86(0x6f3)](_0x153eb1,_0x4270fa),_0x3a73b3[_0x58de86(0x2c5)](0x0,0x0,_0x153eb1,_0x24bdee,_0x2915ed,_0x434bf4,!![]),_0x3a73b3[_0x58de86(0x145)](0x0,_0x24bdee,_0x153eb1,_0x4270fa-_0x24bdee*0x2,_0x434bf4),_0x3a73b3['gradientFillRect'](0x0,_0x4270fa-_0x24bdee,_0x153eb1,_0x24bdee,_0x434bf4,_0x2915ed,!![]),this[_0x58de86(0x115)]['setFrame'](0x0,0x0,_0x153eb1,_0x4270fa);}},Window_ActorCommand[_0x2e20ee(0x112)][_0x2e20ee(0x36c)]=function(){const _0xb89b38=_0x2e20ee;if(!this[_0xb89b38(0x29b)])return;const _0x871459=VisuMZ[_0xb89b38(0x17b)]['Settings']['ActorCmd'],_0x4f64d3=this['currentSymbol']();switch(_0x4f64d3){case _0xb89b38(0x1c0):this[_0xb89b38(0x78a)]($dataSkills[this[_0xb89b38(0x29b)]['attackSkillId']()]);break;case _0xb89b38(0x201):this['setHelpWindowItem']($dataSkills[this[_0xb89b38(0x29b)]['guardSkillId']()]);break;case _0xb89b38(0xf6):const _0x9f1166=_0x871459[_0xb89b38(0x2b0)],_0x200ed3=_0x9f1166[_0xb89b38(0x483)]($dataSystem['skillTypes'][this[_0xb89b38(0x196)]()]);this[_0xb89b38(0x4b5)][_0xb89b38(0x3eb)](_0x200ed3);break;case _0xb89b38(0x360):this[_0xb89b38(0x78a)]($dataSkills[this[_0xb89b38(0x196)]()]);break;case _0xb89b38(0x57b):this[_0xb89b38(0x4b5)]['setText'](_0x871459['HelpItem']);break;case _0xb89b38(0x407):this[_0xb89b38(0x4b5)][_0xb89b38(0x3eb)](_0x871459['HelpEscape']);break;case _0xb89b38(0x2e7):this[_0xb89b38(0x4b5)][_0xb89b38(0x3eb)](_0x871459[_0xb89b38(0x2ef)]);break;default:this[_0xb89b38(0x4b5)][_0xb89b38(0x3eb)]('');break;}},VisuMZ['BattleCore'][_0x2e20ee(0x6fe)]=Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x527)],Window_BattleStatus['prototype']['initialize']=function(_0x5b5406){const _0x275e7c=_0x2e20ee;VisuMZ[_0x275e7c(0x17b)][_0x275e7c(0x6fe)]['call'](this,_0x5b5406),this[_0x275e7c(0x2c2)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x2c2)]=function(){const _0x3022e4=_0x2e20ee;this[_0x3022e4(0x29c)]=this[_0x3022e4(0x779)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x15e)]=function(){const _0x6941bc=_0x2e20ee;if(this['_battleLayoutStyle'])return this[_0x6941bc(0x550)];return this[_0x6941bc(0x550)]=SceneManager['_scene'][_0x6941bc(0x15e)](),this['_battleLayoutStyle'];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x779)]=function(){const _0x248798=_0x2e20ee,_0x378399=this[_0x248798(0x15e)]();switch(_0x378399){case _0x248798(0x56a):case _0x248798(0x4c9):return!![];break;case'default':case'xp':case _0x248798(0x3e0):default:return![];break;}},Window_BattleStatus['prototype'][_0x2e20ee(0x17c)]=function(){return this['isFrameVisible']()?0x0:0xa;},Window_BattleStatus['prototype'][_0x2e20ee(0x82d)]=function(){const _0x4e820b=_0x2e20ee,_0x8507e4=this[_0x4e820b(0x15e)]();switch(_0x8507e4){case _0x4e820b(0x56a):return 0x1;break;case'xp':case'portrait':return $gameParty[_0x4e820b(0x7f2)]()[_0x4e820b(0x5c2)];break;case'default':default:return $gameParty['maxBattleMembers']();break;}},Window_BattleStatus[_0x2e20ee(0x112)]['itemHeight']=function(){const _0x61d07c=_0x2e20ee,_0x3b2b12=this[_0x61d07c(0x15e)]();switch(_0x3b2b12){case _0x61d07c(0x56a):return Window_StatusBase['prototype'][_0x61d07c(0x274)][_0x61d07c(0x7c6)](this);break;case'default':case'xp':case'portrait':default:return this['innerHeight'];break;}},Window_BattleStatus['prototype'][_0x2e20ee(0x23d)]=function(){const _0x3370ed=_0x2e20ee,_0x420cb0=this['battleLayoutStyle']();switch(_0x420cb0){case _0x3370ed(0x56a):return Window_StatusBase[_0x3370ed(0x112)][_0x3370ed(0x23d)][_0x3370ed(0x7c6)](this);break;case _0x3370ed(0x5b4):case'xp':case _0x3370ed(0x3e0):default:return 0x0;break;}},Window_BattleStatus[_0x2e20ee(0x112)]['updatePadding']=function(){const _0x41dae3=_0x2e20ee;this[_0x41dae3(0x779)]()?Window_StatusBase[_0x41dae3(0x112)]['updatePadding'][_0x41dae3(0x7c6)](this):this[_0x41dae3(0x688)]=0x8;},Window_BattleStatus['prototype'][_0x2e20ee(0x228)]=function(){const _0x2649f3=_0x2e20ee;this[_0x2649f3(0x18f)]=!![];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x751)]=function(){const _0x1c7f69=_0x2e20ee;Window_StatusBase[_0x1c7f69(0x112)][_0x1c7f69(0x751)]['call'](this),this['updateRefresh'](),this['updateEffectContainers']();if(this['battleLayoutStyle']()===_0x1c7f69(0x4c9))this[_0x1c7f69(0x238)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x4c7)]=function(){const _0x4f0d10=_0x2e20ee;this[_0x4f0d10(0x18f)]&&(this['_requestRefresh']=![],this[_0x4f0d10(0x71f)]());},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x6ce)]=function(){const _0x1d8cde=_0x2e20ee;Window_StatusBase[_0x1d8cde(0x112)][_0x1d8cde(0x6ce)][_0x1d8cde(0x7c6)](this);if(!$gameSystem[_0x1d8cde(0xde)]())this[_0x1d8cde(0x71f)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x1fc)]=function(){const _0x44fe90=_0x2e20ee;if(this[_0x44fe90(0x177)]===Window_BattleStatus)return;Window_StatusBase[_0x44fe90(0x112)][_0x44fe90(0x1fc)][_0x44fe90(0x7c6)](this);},Window_BattleStatus['prototype']['drawBackgroundRect']=function(_0x56a303){const _0x110acf=_0x2e20ee,_0x23fcfc=this[_0x110acf(0x15e)]();switch(_0x23fcfc){case'xp':case'portrait':break;case _0x110acf(0x5b4):case _0x110acf(0x56a):case _0x110acf(0x4c9):default:return Window_StatusBase[_0x110acf(0x112)][_0x110acf(0x687)][_0x110acf(0x7c6)](this,_0x56a303);break;}},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x7fe)]=Window_BattleStatus[_0x2e20ee(0x112)]['drawItemImage'],Window_BattleStatus['prototype'][_0x2e20ee(0x425)]=function(_0x565747){const _0x576319=_0x2e20ee,_0x482f2f=this[_0x576319(0x15e)]();switch(_0x482f2f){case _0x576319(0x56a):this[_0x576319(0x2d3)](_0x565747);break;case'xp':this[_0x576319(0x304)](_0x565747);break;case _0x576319(0x3e0):this[_0x576319(0x69a)](_0x565747);break;case _0x576319(0x5b4):case'border':default:VisuMZ[_0x576319(0x17b)][_0x576319(0x7fe)][_0x576319(0x7c6)](this,_0x565747);break;}},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x43f)]=function(_0x2d9fbb){const _0x1b3063=_0x2e20ee,_0x5d31c2=this['battleLayoutStyle']();if(!$gameSystem['isSideView']())this[_0x1b3063(0x213)](_0x2d9fbb);switch(_0x5d31c2){case _0x1b3063(0x56a):this[_0x1b3063(0x61b)](_0x2d9fbb);break;case'xp':case _0x1b3063(0x3e0):case _0x1b3063(0x5b4):case _0x1b3063(0x4c9):default:this[_0x1b3063(0x55d)](_0x2d9fbb);break;}},Window_BattleStatus[_0x2e20ee(0x112)]['refreshCursor']=function(){const _0x135efa=_0x2e20ee,_0x2be3ed=this['battleLayoutStyle']();if(['xp']['includes'](_0x2be3ed)&&!$gameSystem[_0x135efa(0xde)]()){this[_0x135efa(0x5e7)](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x135efa(0x112)][_0x135efa(0x468)][_0x135efa(0x7c6)](this);},Window_BattleStatus[_0x2e20ee(0x112)]['centerFrontViewSprite']=function(_0x31733e){const _0x3daeba=_0x2e20ee,_0x286c87=this[_0x3daeba(0x32e)](_0x31733e)[_0x3daeba(0x7ec)]();if(!_0x286c87)return;const _0x30786a=this[_0x3daeba(0x15e)](),_0x4bb249=this[_0x3daeba(0x317)](_0x31733e);let _0x2852e0=Math[_0x3daeba(0x603)](_0x4bb249['x']+_0x4bb249['width']/0x2);['list']['includes'](_0x30786a)&&(_0x2852e0=_0x4bb249[_0x3daeba(0x71d)]/$gameParty['battleMembers']()['length'],_0x2852e0*=_0x31733e,_0x2852e0+=_0x4bb249[_0x3daeba(0x71d)]/$gameParty[_0x3daeba(0x7f2)]()[_0x3daeba(0x5c2)]/0x2);let _0x1ce546=Math[_0x3daeba(0x603)](this[_0x3daeba(0x42f)](_0x31733e,_0x286c87,_0x4bb249));_0x286c87[_0x3daeba(0x5c0)](_0x2852e0,_0x1ce546),this[_0x3daeba(0x741)](_0x286c87,0x1),_0x286c87[_0x3daeba(0x6ce)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x42f)]=function(_0x2e4da8,_0x5c2024,_0x403d59){const _0x186492=_0x2e20ee,_0x142b2f=VisuMZ[_0x186492(0x17b)]['Settings'][_0x186492(0x41b)],_0x4dbea7=this[_0x186492(0x15e)]();if(_0x4dbea7==='xp'){const _0x56806f=_0x142b2f['XPSpriteYLocation'];switch(_0x56806f[_0x186492(0x1fe)]()[_0x186492(0x762)]()){case _0x186492(0x441):return _0x403d59['height']-_0x5c2024['_shadowSprite']['height']/0x4;break;case'center':const _0x4031e4=_0x142b2f[_0x186492(0x327)];return(_0x403d59['height']+(_0x5c2024[_0x186492(0x6cf)]||_0x4031e4))/0x2;break;case _0x186492(0x192):return 0x0;case _0x186492(0x2e8):default:return this[_0x186492(0x3b3)](_0x403d59);break;}}else{if(_0x4dbea7==='portrait'){}}return _0x5c2024['height'];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x2d3)]=function(_0x3e6ecb){const _0x18fa86=_0x2e20ee;if(!VisuMZ[_0x18fa86(0x17b)]['Settings'][_0x18fa86(0x41b)]['ShowFacesListStyle'])return;const _0xa3efbe=this['actor'](_0x3e6ecb),_0x1cf304=this[_0x18fa86(0x317)](_0x3e6ecb);_0x1cf304[_0x18fa86(0x71d)]=ImageManager[_0x18fa86(0x2ae)],_0x1cf304[_0x18fa86(0x6cf)]-=0x2,this[_0x18fa86(0x27a)](_0xa3efbe,_0x1cf304['x']+0x1,_0x1cf304['y']+0x1,_0x1cf304['width'],_0x1cf304[_0x18fa86(0x6cf)]);},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x61b)]=function(_0xa22bc3){const _0x31daa9=_0x2e20ee,_0x3c72c6=$dataSystem['optDisplayTp']?0x4:0x3,_0x5c75fa=_0x3c72c6*0x80+(_0x3c72c6-0x1)*0x8+0x4,_0x59fe60=this[_0x31daa9(0x32e)](_0xa22bc3),_0x426f1b=this[_0x31daa9(0x317)](_0xa22bc3);let _0x175f9e=_0x426f1b['x']+this[_0x31daa9(0x688)];VisuMZ[_0x31daa9(0x17b)][_0x31daa9(0x1bf)]['BattleLayout'][_0x31daa9(0x756)]?_0x175f9e=_0x426f1b['x']+ImageManager[_0x31daa9(0x2ae)]+0x8:_0x175f9e+=ImageManager['iconWidth'];const _0x5004b9=Math[_0x31daa9(0x603)](Math[_0x31daa9(0x567)](_0x426f1b['x']+_0x426f1b[_0x31daa9(0x71d)]-_0x5c75fa,_0x175f9e)),_0x29ed3c=Math['round'](_0x426f1b['y']+(_0x426f1b[_0x31daa9(0x6cf)]-Sprite_Name[_0x31daa9(0x112)][_0x31daa9(0x3e5)]())/0x2),_0x39612b=Math[_0x31daa9(0x603)](_0x5004b9-ImageManager[_0x31daa9(0x267)]/0x2-0x4),_0x1b3611=Math[_0x31daa9(0x603)](_0x426f1b['y']+(_0x426f1b[_0x31daa9(0x6cf)]-ImageManager[_0x31daa9(0x2fe)])/0x2+ImageManager[_0x31daa9(0x2fe)]/0x2);let _0x5637d6=_0x5004b9+0x88;const _0x171a0f=_0x29ed3c;this[_0x31daa9(0x809)](_0x59fe60,_0x5004b9-0x4,_0x29ed3c),this['placeActorName'](_0x59fe60,_0x5004b9,_0x29ed3c),this['placeStateIcon'](_0x59fe60,_0x39612b,_0x1b3611),this[_0x31daa9(0x445)](_0x59fe60,'hp',_0x5637d6+0x88*0x0,_0x171a0f),this[_0x31daa9(0x445)](_0x59fe60,'mp',_0x5637d6+0x88*0x1,_0x171a0f),$dataSystem[_0x31daa9(0x77f)]&&this[_0x31daa9(0x445)](_0x59fe60,'tp',_0x5637d6+0x88*0x2,_0x171a0f);},Window_BattleStatus['prototype'][_0x2e20ee(0x304)]=function(_0x2ffdd6){const _0x524945=_0x2e20ee;if(!$gameSystem['isSideView']())return;VisuMZ[_0x524945(0x17b)]['Window_BattleStatus_drawItemImage'][_0x524945(0x7c6)](this,_0x2ffdd6);},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x55d)]=function(_0x896dce){const _0x5655e6=_0x2e20ee,_0x1478c1=this[_0x5655e6(0x32e)](_0x896dce),_0x284b42=this[_0x5655e6(0x317)](_0x896dce),_0xe2e14e=Math['round'](_0x284b42['x']+(_0x284b42[_0x5655e6(0x71d)]-0x80)/0x2),_0x29c709=this['nameY'](_0x284b42);let _0x80b9dd=_0xe2e14e-ImageManager[_0x5655e6(0x267)]/0x2-0x4,_0x3434a3=_0x29c709+ImageManager[_0x5655e6(0x2fe)]/0x2;_0x80b9dd-ImageManager[_0x5655e6(0x267)]/0x2<_0x284b42['x']&&(_0x80b9dd=_0xe2e14e+ImageManager[_0x5655e6(0x267)]/0x2-0x4,_0x3434a3=_0x29c709-ImageManager[_0x5655e6(0x2fe)]/0x2);const _0x18975e=_0xe2e14e,_0x837ef0=this[_0x5655e6(0x243)](_0x284b42);this[_0x5655e6(0x809)](_0x1478c1,_0xe2e14e,_0x29c709),this[_0x5655e6(0x557)](_0x1478c1,_0xe2e14e,_0x29c709),this[_0x5655e6(0x6ef)](_0x1478c1,_0x80b9dd,_0x3434a3),this[_0x5655e6(0x1c2)](_0x1478c1,_0x18975e,_0x837ef0);},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x212)]=function(_0x1bcb7a){const _0x2a7201=_0x2e20ee;if(!VisuMZ[_0x2a7201(0x17b)][_0x2a7201(0x1bf)][_0x2a7201(0x41b)][_0x2a7201(0x7a2)])return![];if(_0x1bcb7a['getBattlePortrait']())return!![];return Imported[_0x2a7201(0x398)]&&_0x1bcb7a['getMenuImage']();},Game_Actor[_0x2e20ee(0x112)]['getBattlePortraitOffsetX']=function(){const _0x4c19f0=_0x2e20ee;if(this[_0x4c19f0(0x32e)]()['note']['match'](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x4c19f0(0x32e)]()[_0x4c19f0(0x37b)][_0x4c19f0(0x26f)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor['prototype'][_0x2e20ee(0x1a6)]=function(){const _0x5935d7=_0x2e20ee;if(this[_0x5935d7(0x32e)]()['note'][_0x5935d7(0x26f)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x5935d7(0x32e)]()[_0x5935d7(0x37b)][_0x5935d7(0x26f)](/<BATTLE (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$2']);}return 0x0;},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x69a)]=function(_0x582c65){const _0x3b5d91=_0x2e20ee,_0x2ad47d=this[_0x3b5d91(0x32e)](_0x582c65);if(this[_0x3b5d91(0x212)](_0x2ad47d)){const _0x3b3a0b=_0x3b5d91(0x132)[_0x3b5d91(0x483)](_0x2ad47d[_0x3b5d91(0x82a)]()),_0x5eb4c2=this[_0x3b5d91(0x7b8)](_0x3b3a0b,Sprite),_0x44ab69=_0x2ad47d['getBattlePortraitFilename']();_0x44ab69!==''?_0x5eb4c2[_0x3b5d91(0x4e1)]=ImageManager[_0x3b5d91(0x39e)](_0x44ab69):_0x5eb4c2[_0x3b5d91(0x4e1)]=ImageManager[_0x3b5d91(0x3c8)];const _0x4176d9=this[_0x3b5d91(0x317)](_0x582c65);_0x5eb4c2[_0x3b5d91(0x555)]['x']=0.5,_0x5eb4c2[_0x3b5d91(0x555)]['y']=0x1;let _0x4a4830=Math['round'](_0x4176d9['x']+_0x4176d9[_0x3b5d91(0x71d)]/0x2)+this[_0x3b5d91(0x688)];_0x4a4830+=_0x2ad47d['getBattlePortraitOffsetX']();let _0x2bcfbb=Math[_0x3b5d91(0x603)](this[_0x3b5d91(0x6cf)]);_0x2bcfbb+=_0x2ad47d['getBattlePortraitOffsetY'](),_0x5eb4c2['move'](_0x4a4830,_0x2bcfbb);const _0xfadb9c=VisuMZ[_0x3b5d91(0x17b)][_0x3b5d91(0x1bf)][_0x3b5d91(0x41b)][_0x3b5d91(0x27e)];_0x5eb4c2['scale']['x']=_0xfadb9c,_0x5eb4c2[_0x3b5d91(0x4e7)]['y']=_0xfadb9c,_0x5eb4c2['show']();}else{const _0x26dd36=this[_0x3b5d91(0x277)](_0x582c65);this[_0x3b5d91(0x27a)](_0x2ad47d,_0x26dd36['x'],_0x26dd36['y'],_0x26dd36[_0x3b5d91(0x71d)],_0x26dd36['height']);}},Window_BattleStatus[_0x2e20ee(0x112)]['createInnerPortrait']=function(_0x1e07b4,_0xcccd6c){const _0x53c226=_0x2e20ee,_0x59344c=this[_0x53c226(0x4e9)];if(_0x59344c[_0x1e07b4])return _0x59344c[_0x1e07b4];else{const _0x21369b=new _0xcccd6c();return _0x59344c[_0x1e07b4]=_0x21369b,this[_0x53c226(0x1e9)](_0x21369b),this[_0x53c226(0x1e9)](this['_cursorArea']),_0x21369b;}},Window_BattleStatus['prototype'][_0x2e20ee(0x13a)]=function(){const _0x463fd1=_0x2e20ee;this[_0x463fd1(0x75f)](),this['_createEffectsContainer'](),Window_StatusBase[_0x463fd1(0x112)][_0x463fd1(0x13a)][_0x463fd1(0x7c6)](this),this[_0x463fd1(0x4a5)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x75f)]=function(){const _0x5de316=_0x2e20ee;this['_cursorArea']=new Sprite(),this[_0x5de316(0x31f)]['filters']=[new PIXI[(_0x5de316(0x2f8))][(_0x5de316(0x706))]()],this[_0x5de316(0x31f)][_0x5de316(0x76c)]=new Rectangle(),this['_cursorArea'][_0x5de316(0x399)](this[_0x5de316(0x430)],this[_0x5de316(0x430)]),this[_0x5de316(0xf9)](this[_0x5de316(0x31f)]);},Window_BattleStatus['prototype']['_createEffectsContainer']=function(){const _0x5d48a3=_0x2e20ee;this['_effectsContainer']=new Sprite(),this[_0x5d48a3(0xf9)](this[_0x5d48a3(0x736)]);},Window_BattleStatus['prototype'][_0x2e20ee(0x4a5)]=function(){const _0xac0b73=_0x2e20ee;this[_0xac0b73(0x62e)]=new Sprite(),this[_0xac0b73(0xf9)](this[_0xac0b73(0x62e)]);},Window_BattleStatus['prototype'][_0x2e20ee(0x149)]=function(){const _0x379461=_0x2e20ee;this[_0x379461(0x536)]=new Sprite();for(let _0x4f45f5=0x0;_0x4f45f5<0x9;_0x4f45f5++){this['_cursorSprite']['addChild'](new Sprite());}this['_cursorArea'][_0x379461(0xf9)](this[_0x379461(0x536)]);},Window_BattleStatus[_0x2e20ee(0x112)]['_updateClientArea']=function(){const _0x2dd350=_0x2e20ee;Window_StatusBase[_0x2dd350(0x112)][_0x2dd350(0x457)][_0x2dd350(0x7c6)](this),this[_0x2dd350(0x2f0)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x2f0)]=function(){const _0x39ca5a=_0x2e20ee,_0x5a5f36=this[_0x39ca5a(0x430)];this[_0x39ca5a(0x31f)]['move'](_0x5a5f36,_0x5a5f36),this[_0x39ca5a(0x31f)]['x']=_0x5a5f36-this[_0x39ca5a(0x7b7)]['x'],this[_0x39ca5a(0x31f)]['y']=_0x5a5f36-this[_0x39ca5a(0x7b7)]['y'],this[_0x39ca5a(0x703)]>0x0&&this['innerHeight']>0x0?this[_0x39ca5a(0x31f)]['visible']=this[_0x39ca5a(0x4c1)]():this['_cursorArea'][_0x39ca5a(0x18b)]=![];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x6e9)]=function(){const _0x45774c=_0x2e20ee;Window_StatusBase['prototype'][_0x45774c(0x6e9)][_0x45774c(0x7c6)](this),this[_0x45774c(0x3cf)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x3cf)]=function(){const _0x4aef06=_0x2e20ee,_0x3a8683=this[_0x4aef06(0x31f)]['worldTransform'][_0x4aef06(0x33f)](new Point(0x0,0x0)),_0x5704fe=this['_cursorArea'][_0x4aef06(0x76c)];_0x5704fe['x']=_0x3a8683['x']+this['origin']['x'],_0x5704fe['y']=_0x3a8683['y']+this[_0x4aef06(0x7b7)]['y'],_0x5704fe[_0x4aef06(0x71d)]=this[_0x4aef06(0x703)],_0x5704fe[_0x4aef06(0x6cf)]=this[_0x4aef06(0xdc)];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x151)]=function(_0x25f920){const _0x5317c9=_0x2e20ee;if(this[_0x5317c9(0x15e)]()!=='portrait')return;this[_0x5317c9(0x69a)](_0x25f920[_0x5317c9(0x348)]());},Window_BattleStatus[_0x2e20ee(0x112)]['addDamageSprite']=function(_0x41614d,_0x1db4a5){const _0x11b59d=_0x2e20ee;if(!this[_0x11b59d(0x62e)])return;if(!_0x41614d)return;if(!_0x1db4a5)return;const _0x6df69d=this[_0x11b59d(0x317)](_0x1db4a5['index']());_0x6df69d['x']+=_0x6df69d['width']/0x2+this[_0x11b59d(0x688)],_0x41614d['x']=_0x6df69d['x'],_0x41614d['y']=_0x6df69d['y'],this['_damageContainer']['addChild'](_0x41614d);},Window_BattleStatus['prototype'][_0x2e20ee(0x4ae)]=function(_0xf7bfa1){const _0x24e3ba=_0x2e20ee;if(!this[_0x24e3ba(0x62e)])return;if(!_0xf7bfa1)return;this['_damageContainer'][_0x24e3ba(0x29a)](_0xf7bfa1);},Window_BattleStatus[_0x2e20ee(0x112)]['updateBorderStyle']=function(){const _0x1bcb9f=_0x2e20ee;if(!this[_0x1bcb9f(0x4d4)]())return;if(!this[_0x1bcb9f(0x32f)])this[_0x1bcb9f(0x4f4)]();this[_0x1bcb9f(0x2fd)](),this[_0x1bcb9f(0x76e)]();},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x4d4)]=function(){const _0x52958f=_0x2e20ee;if(this[_0x52958f(0x177)]!==Window_BattleStatus)return![];if(!SceneManager[_0x52958f(0x14c)]())return![];return VisuMZ[_0x52958f(0x17b)][_0x52958f(0x1bf)][_0x52958f(0x41b)]['ShowPortraitsBorderStyle'];},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x4f4)]=function(){const _0x374ea0=_0x2e20ee;this[_0x374ea0(0x32f)]=new Sprite();const _0x55a43f=SceneManager[_0x374ea0(0x4e6)],_0x53c244=_0x55a43f['children'][_0x374ea0(0x22d)](_0x55a43f[_0x374ea0(0x609)]);_0x55a43f[_0x374ea0(0x741)](this['_borderPortraitSprite'],_0x53c244),this[_0x374ea0(0x32f)]['anchor']['x']=0.5,this[_0x374ea0(0x32f)][_0x374ea0(0x555)]['y']=0x1;const _0x21c191=VisuMZ[_0x374ea0(0x17b)]['Settings'][_0x374ea0(0x41b)][_0x374ea0(0x3ea)];this[_0x374ea0(0x32f)][_0x374ea0(0x4e7)]['x']=_0x21c191,this[_0x374ea0(0x32f)][_0x374ea0(0x4e7)]['y']=_0x21c191,this['_borderPortraitSprite']['y']=this['y']+this[_0x374ea0(0x6cf)],this[_0x374ea0(0x3ab)]=0x0;},Window_BattleStatus['prototype']['prepareBorderActor']=function(){const _0x181886=_0x2e20ee;this[_0x181886(0x32f)][_0x181886(0x18b)]=BattleManager[_0x181886(0xd6)]();const _0x12247f=BattleManager[_0x181886(0x32e)]();if(_0x12247f===this['_borderPortraitSprite'][_0x181886(0x32e)])return;this[_0x181886(0x32f)][_0x181886(0x32e)]=_0x12247f||this[_0x181886(0x32f)][_0x181886(0x32e)];if(!_0x12247f)return;else{if(_0x12247f[_0x181886(0x5b1)]()===''){this[_0x181886(0x32f)][_0x181886(0x4e1)]=ImageManager[_0x181886(0x3c8)];return;}else{const _0x436a67=ImageManager[_0x181886(0x39e)](_0x12247f[_0x181886(0x5b1)]());_0x436a67[_0x181886(0x535)](this[_0x181886(0x2aa)][_0x181886(0x70c)](this,_0x436a67));}}},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x2aa)]=function(_0x321564){const _0xb2bc33=_0x2e20ee;this[_0xb2bc33(0x3ab)]=0x14,this[_0xb2bc33(0x32f)][_0xb2bc33(0x4e1)]=_0x321564;SceneManager['_scene'][_0xb2bc33(0x1bd)]()?(this[_0xb2bc33(0x32f)]['x']=0x0,this['_borderPortraitTargetX']=Math[_0xb2bc33(0x1c8)](_0x321564['width']/0x2)):(this[_0xb2bc33(0x32f)]['x']=this['width'],this[_0xb2bc33(0x136)]=this[_0xb2bc33(0x71d)]*0x3/0x4);this[_0xb2bc33(0x32f)]['opacity']=0x0,this[_0xb2bc33(0x32f)]['y']=this['y']+this[_0xb2bc33(0x6cf)];const _0x42e02e=BattleManager[_0xb2bc33(0x32e)]();_0x42e02e&&(this[_0xb2bc33(0x136)]+=_0x42e02e[_0xb2bc33(0x5dc)](),this[_0xb2bc33(0x32f)]['y']+=_0x42e02e[_0xb2bc33(0x1a6)]());},Window_BattleStatus[_0x2e20ee(0x112)][_0x2e20ee(0x76e)]=function(){const _0x2959ce=_0x2e20ee;if(this[_0x2959ce(0x3ab)]>0x0){const _0x1858ea=this[_0x2959ce(0x3ab)],_0x4b43e6=this[_0x2959ce(0x32f)];_0x4b43e6['x']=(_0x4b43e6['x']*(_0x1858ea-0x1)+this['_borderPortraitTargetX'])/_0x1858ea,_0x4b43e6[_0x2959ce(0x3af)]=(_0x4b43e6['opacity']*(_0x1858ea-0x1)+0xff)/_0x1858ea,this[_0x2959ce(0x3ab)]--;}},Window_BattleStatus['prototype'][_0x2e20ee(0x586)]=function(){const _0x40e760=_0x2e20ee;return;this[_0x40e760(0x736)]&&(this['_effectsContainer']['x']=this['x'],this[_0x40e760(0x736)]['y']=this['y']),this['_damageContainer']&&(this[_0x40e760(0x62e)]['x']=this['x'],this[_0x40e760(0x62e)]['y']=this['y']);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5cd)]=Window_BattleEnemy['prototype'][_0x2e20ee(0x527)],Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x527)]=function(_0x4c4781){const _0x357c64=_0x2e20ee;this[_0x357c64(0x4a2)]=null,VisuMZ[_0x357c64(0x17b)]['Window_BattleEnemy_initialize']['call'](this,_0x4c4781);},Window_BattleEnemy['prototype'][_0x2e20ee(0x82d)]=function(){const _0xcbface=_0x2e20ee;return this[_0xcbface(0x707)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x6a3)]=Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x6ce)],Window_BattleEnemy['prototype'][_0x2e20ee(0x6ce)]=function(){const _0x3e6271=_0x2e20ee;VisuMZ[_0x3e6271(0x17b)][_0x3e6271(0x6a3)][_0x3e6271(0x7c6)](this),this['y']=Graphics[_0x3e6271(0x6cf)]*0xa;},Window_BattleEnemy[_0x2e20ee(0x112)]['validTargets']=function(){return $gameTroop['aliveMembers']()['slice'](0x0);},Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x71f)]=function(){const _0x252372=_0x2e20ee;this[_0x252372(0x72f)]=this[_0x252372(0x715)](),this[_0x252372(0x2ff)](),Window_Selectable[_0x252372(0x112)][_0x252372(0x71f)][_0x252372(0x7c6)](this);},Window_BattleEnemy[_0x2e20ee(0x112)]['sortEnemies']=function(){const _0x2a0ebb=_0x2e20ee;this[_0x2a0ebb(0x72f)]['sort']((_0x5e068a,_0x3dbe6e)=>{const _0x276b47=_0x2a0ebb;return _0x5e068a[_0x276b47(0x7ec)]()[_0x276b47(0x1f7)]===_0x3dbe6e[_0x276b47(0x7ec)]()[_0x276b47(0x1f7)]?_0x5e068a['battler']()['_baseY']-_0x3dbe6e[_0x276b47(0x7ec)]()[_0x276b47(0x4af)]:_0x5e068a[_0x276b47(0x7ec)]()[_0x276b47(0x1f7)]-_0x3dbe6e[_0x276b47(0x7ec)]()[_0x276b47(0x1f7)];}),SceneManager[_0x2a0ebb(0x3e9)]()&&this[_0x2a0ebb(0x72f)][_0x2a0ebb(0x3c1)]();},Window_BattleEnemy[_0x2e20ee(0x112)]['autoSelect']=function(){const _0x36383e=_0x2e20ee,_0xc02302=VisuMZ[_0x36383e(0x17b)]['Settings'][_0x36383e(0x692)];_0xc02302[_0x36383e(0x665)]?this[_0x36383e(0x182)]():this[_0x36383e(0x1a2)]();},Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x182)]=function(){const _0x5d1357=_0x2e20ee;if(this[_0x5d1357(0x4a2)]&&this[_0x5d1357(0x72f)][_0x5d1357(0x60c)](this[_0x5d1357(0x4a2)])){const _0x45ccc=this[_0x5d1357(0x72f)][_0x5d1357(0x22d)](this[_0x5d1357(0x4a2)]);this[_0x5d1357(0x578)](_0x45ccc);}else this[_0x5d1357(0x1a2)]();},Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x1a2)]=function(){const _0x17a32b=_0x2e20ee,_0x13e9df=VisuMZ['BattleCore'][_0x17a32b(0x1bf)]['Enemy'];let _0xd3d277=![];$gameSystem[_0x17a32b(0xde)]()?_0xd3d277=_0x13e9df['SideviewSelect']:_0xd3d277=_0x13e9df[_0x17a32b(0x3a0)],this[_0x17a32b(0x578)](_0xd3d277?this['maxItems']()-0x1:0x0);},Window_BattleEnemy[_0x2e20ee(0x112)][_0x2e20ee(0x69d)]=function(){const _0x27b26b=_0x2e20ee;Window_Selectable[_0x27b26b(0x112)]['callOkHandler'][_0x27b26b(0x7c6)](this),this[_0x27b26b(0x4a2)]=this[_0x27b26b(0x62d)]();},Window_BattleItem[_0x2e20ee(0x112)][_0x2e20ee(0x60c)]=function(_0x5970d0){const _0x7ce1bc=_0x2e20ee;if(!_0x5970d0)return![];return _0x5970d0[_0x7ce1bc(0x602)]===0x0||_0x5970d0[_0x7ce1bc(0x602)]===0x1;};function Window_AutoBattleCancel(){const _0x5a9a15=_0x2e20ee;this[_0x5a9a15(0x527)](...arguments);}Window_AutoBattleCancel[_0x2e20ee(0x112)]=Object[_0x2e20ee(0x133)](Window_Base[_0x2e20ee(0x112)]),Window_AutoBattleCancel['prototype'][_0x2e20ee(0x177)]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x2e20ee(0x112)]['initialize']=function(_0x4ea795){const _0x14a359=_0x2e20ee;Window_Base[_0x14a359(0x112)][_0x14a359(0x527)][_0x14a359(0x7c6)](this,_0x4ea795),this[_0x14a359(0x2c6)](this[_0x14a359(0x3ec)]()),this[_0x14a359(0x71f)]();},Window_AutoBattleCancel[_0x2e20ee(0x112)][_0x2e20ee(0x3ec)]=function(){const _0x592c2d=_0x2e20ee;return VisuMZ[_0x592c2d(0x17b)][_0x592c2d(0x1bf)][_0x592c2d(0x769)][_0x592c2d(0x470)];},Window_AutoBattleCancel['prototype'][_0x2e20ee(0x71f)]=function(){const _0x506e2f=_0x2e20ee;this[_0x506e2f(0x57c)]['clear']();const _0x56c305=VisuMZ[_0x506e2f(0x17b)]['Settings']['AutoBattle'][_0x506e2f(0x194)],_0x4b4b2f=_0x56c305[_0x506e2f(0x483)](this[_0x506e2f(0x395)](),this['cancelButtonText']()),_0x1f9651=this[_0x506e2f(0x552)](_0x4b4b2f)['width'],_0xd6d683=Math[_0x506e2f(0x175)]((this[_0x506e2f(0x703)]-_0x1f9651)/0x2);this[_0x506e2f(0x230)](_0x4b4b2f,_0xd6d683,0x0,_0x1f9651);},Window_AutoBattleCancel['prototype'][_0x2e20ee(0x395)]=function(){const _0x4d179a=_0x2e20ee;return Imported['VisuMZ_0_CoreEngine']?TextManager[_0x4d179a(0x453)]('ok'):VisuMZ[_0x4d179a(0x17b)][_0x4d179a(0x1bf)][_0x4d179a(0x769)][_0x4d179a(0x295)];},Window_AutoBattleCancel[_0x2e20ee(0x112)][_0x2e20ee(0x442)]=function(){const _0x13217a=_0x2e20ee;return Imported[_0x13217a(0x540)]?TextManager[_0x13217a(0x453)]('cancel'):VisuMZ[_0x13217a(0x17b)][_0x13217a(0x1bf)]['AutoBattle'][_0x13217a(0x12e)];},Window_AutoBattleCancel[_0x2e20ee(0x112)][_0x2e20ee(0x751)]=function(){const _0xff5745=_0x2e20ee;Window_Base[_0xff5745(0x112)][_0xff5745(0x751)]['call'](this),this['updateVisibility'](),this['updateCancel']();},Window_AutoBattleCancel[_0x2e20ee(0x112)][_0x2e20ee(0x635)]=function(){const _0x4dec9d=_0x2e20ee;this[_0x4dec9d(0x18b)]=BattleManager[_0x4dec9d(0x6ba)];},Window_AutoBattleCancel['prototype'][_0x2e20ee(0x4c6)]=function(){const _0x5d521b=_0x2e20ee;if(!BattleManager[_0x5d521b(0x6ba)])return;(Input['isTriggered']('ok')||Input[_0x5d521b(0x300)]('cancel')||TouchInput[_0x5d521b(0x1da)]()||TouchInput[_0x5d521b(0x6f5)]())&&(SoundManager['playCancel'](),BattleManager[_0x5d521b(0x6ba)]=![],Input[_0x5d521b(0x6e4)](),TouchInput[_0x5d521b(0x6e4)]());};function Window_EnemyName(){const _0x1f6e58=_0x2e20ee;this[_0x1f6e58(0x527)](...arguments);}Window_EnemyName[_0x2e20ee(0x112)]=Object[_0x2e20ee(0x133)](Window_Base[_0x2e20ee(0x112)]),Window_EnemyName['prototype']['constructor']=Window_EnemyName,Window_EnemyName['prototype']['initialize']=function(_0x55754b){const _0x54649d=_0x2e20ee;this[_0x54649d(0x374)]=_0x55754b,this[_0x54649d(0x47c)]='';const _0x3a3e83=new Rectangle(0x0,0x0,Graphics[_0x54649d(0x1ba)],this[_0x54649d(0x6b0)]()*0x4);Window_Base['prototype']['initialize'][_0x54649d(0x7c6)](this,_0x3a3e83),this[_0x54649d(0x2c6)](0x2),this[_0x54649d(0x263)]=0x0;},Window_EnemyName[_0x2e20ee(0x112)]['updatePadding']=function(){const _0x196e46=_0x2e20ee;this[_0x196e46(0x688)]=0x0;},Window_EnemyName[_0x2e20ee(0x112)]['enemy']=function(){const _0x2fac46=_0x2e20ee;return $gameTroop[_0x2fac46(0xbb)]()[this[_0x2fac46(0x374)]];},Window_EnemyName[_0x2e20ee(0x112)][_0x2e20ee(0x751)]=function(){const _0x53ae28=_0x2e20ee;Window_Base[_0x53ae28(0x112)][_0x53ae28(0x751)][_0x53ae28(0x7c6)](this);if(this[_0x53ae28(0x62d)]()&&this['enemy']()['name']()!==this[_0x53ae28(0x47c)])this['refresh']();this[_0x53ae28(0x42b)](),this[_0x53ae28(0x2f1)]();},Window_EnemyName['prototype'][_0x2e20ee(0x42b)]=function(){const _0x4c9320=_0x2e20ee;if(!this[_0x4c9320(0x62d)]()){if(this[_0x4c9320(0x263)]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x4c9320(0x62d)]()[_0x4c9320(0x1cf)]()){if(this[_0x4c9320(0x263)]>0x0)this[_0x4c9320(0x263)]-=0x10;}else{if(SceneManager[_0x4c9320(0x4e6)]['_enemyWindow']&&SceneManager[_0x4c9320(0x4e6)][_0x4c9320(0x3f6)][_0x4c9320(0x4d2)]&&SceneManager[_0x4c9320(0x4e6)]['_enemyWindow'][_0x4c9320(0x72f)][_0x4c9320(0x60c)](this[_0x4c9320(0x62d)]())){if(this[_0x4c9320(0x263)]<0xff)this[_0x4c9320(0x263)]+=0x10;}else this['contentsOpacity']>0x0&&(this[_0x4c9320(0x263)]-=0x10);}}},Window_EnemyName[_0x2e20ee(0x112)][_0x2e20ee(0x2f1)]=function(){const _0x2320cc=_0x2e20ee;if(!this['enemy']())return;SceneManager[_0x2320cc(0x3e9)]()?this['x']=Graphics[_0x2320cc(0x1ba)]-this['enemy']()[_0x2320cc(0x7ec)]()[_0x2320cc(0x1f7)]:this['x']=this[_0x2320cc(0x62d)]()[_0x2320cc(0x7ec)]()[_0x2320cc(0x1f7)];this['x']-=Math[_0x2320cc(0x603)](this['width']/0x2),this['y']=this[_0x2320cc(0x62d)]()[_0x2320cc(0x7ec)]()['_baseY']-Math[_0x2320cc(0x603)](this[_0x2320cc(0x6b0)]()*1.5);const _0x729316=VisuMZ[_0x2320cc(0x17b)][_0x2320cc(0x1bf)][_0x2320cc(0x692)];this['x']+=_0x729316[_0x2320cc(0x7e7)]||0x0,this['y']+=_0x729316[_0x2320cc(0x714)]||0x0;},Window_EnemyName[_0x2e20ee(0x112)][_0x2e20ee(0x268)]=function(){const _0x3f1566=_0x2e20ee;Window_Base[_0x3f1566(0x112)][_0x3f1566(0x268)][_0x3f1566(0x7c6)](this),this[_0x3f1566(0x57c)][_0x3f1566(0x434)]=VisuMZ['BattleCore'][_0x3f1566(0x1bf)][_0x3f1566(0x692)][_0x3f1566(0x270)];},Window_EnemyName[_0x2e20ee(0x112)][_0x2e20ee(0x71f)]=function(){const _0x238f2f=_0x2e20ee;this[_0x238f2f(0x57c)][_0x238f2f(0x6e4)]();if(!this[_0x238f2f(0x62d)]())return;this['_text']=this[_0x238f2f(0x62d)]()[_0x238f2f(0x2e8)]();const _0x58231b=this[_0x238f2f(0x552)](this[_0x238f2f(0x47c)])[_0x238f2f(0x71d)],_0x6023ca=Math['round']((this['innerWidth']-_0x58231b)/0x2);this[_0x238f2f(0x230)](this[_0x238f2f(0x47c)],_0x6023ca,0x0,_0x58231b+0x8);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x312)]=function(){const _0x1d4300=_0x2e20ee;return VisuMZ[_0x1d4300(0x17b)][_0x1d4300(0x1bf)][_0x1d4300(0x690)][_0x1d4300(0x171)];},Window_BattleLog['prototype'][_0x2e20ee(0x829)]=function(){const _0x25881c=_0x2e20ee;return VisuMZ[_0x25881c(0x17b)][_0x25881c(0x1bf)][_0x25881c(0x690)][_0x25881c(0x548)];},Window_BattleLog['prototype'][_0x2e20ee(0x2d1)]=function(){const _0x3eaa0e=_0x2e20ee;return VisuMZ[_0x3eaa0e(0x17b)][_0x3eaa0e(0x1bf)]['BattleLog'][_0x3eaa0e(0x231)];},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x209)]=function(){return![];},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x5f0)]=function(_0x47e581,_0x1cf86f){const _0x598326=_0x2e20ee;this[_0x598326(0x1eb)]('actionSplicePoint'),BattleManager[_0x598326(0x6c4)](_0x47e581,_0x1cf86f),this[_0x598326(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x712)]=function(){const _0x4bcf5f=_0x2e20ee;this[_0x4bcf5f(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)]['push']=function(_0x529576){const _0x571d42=_0x2e20ee,_0xe128c9=Array[_0x571d42(0x112)][_0x571d42(0x641)]['call'](arguments,0x1),_0x1fe6f3={'name':_0x529576,'params':_0xe128c9},_0x5a4877=this[_0x571d42(0x7a7)]['map'](_0x4c08dc=>_0x4c08dc[_0x571d42(0x2e8)])[_0x571d42(0x22d)](_0x571d42(0x712));_0x5a4877>=0x0?this[_0x571d42(0x7a7)][_0x571d42(0x215)](_0x5a4877,0x0,_0x1fe6f3):this[_0x571d42(0x7a7)][_0x571d42(0x4d5)](_0x1fe6f3);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x1eb)]=function(_0xc2dcc4){const _0x1d5579=_0x2e20ee,_0x32f1ce=Array[_0x1d5579(0x112)][_0x1d5579(0x641)]['call'](arguments,0x1);this[_0x1d5579(0x7a7)][_0x1d5579(0x1eb)]({'name':_0xc2dcc4,'params':_0x32f1ce});},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x759)]=function(){const _0x2c9c33=_0x2e20ee;if(!$gameTemp[_0x2c9c33(0x784)]())return;console[_0x2c9c33(0x44a)](this[_0x2c9c33(0x7a7)][_0x2c9c33(0x4f1)](_0x2e990e=>_0x2e990e['name'])[_0x2c9c33(0x684)]('\x0a'));},VisuMZ['BattleCore'][_0x2e20ee(0x656)]=Window_BattleLog[_0x2e20ee(0x112)]['refresh'],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x71f)]=function(){const _0xe8f624=_0x2e20ee;this[_0xe8f624(0x18f)]=!![];},VisuMZ['BattleCore'][_0x2e20ee(0x17e)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x751)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x751)]=function(){const _0x263ed3=_0x2e20ee;VisuMZ[_0x263ed3(0x17b)][_0x263ed3(0x17e)][_0x263ed3(0x7c6)](this);if(this[_0x263ed3(0x18f)])this[_0x263ed3(0x5b6)]();},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x5b6)]=function(){const _0x24c875=_0x2e20ee;this[_0x24c875(0x18f)]=![],VisuMZ['BattleCore']['Window_BattleLog_refresh'][_0x24c875(0x7c6)](this);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x419)]=function(_0x1ac632){const _0x3e9c80=_0x2e20ee;let _0x1714a8=VisuMZ[_0x3e9c80(0x17b)][_0x3e9c80(0x1bf)]['BattleLog'][_0x3e9c80(0x783)]['toLowerCase']()['trim'](),_0xcab0c9=this[_0x3e9c80(0x3f0)][_0x1ac632];if(_0xcab0c9[_0x3e9c80(0x26f)](/<LEFT>/i))_0x1714a8='left';else{if(_0xcab0c9['match'](/<CENTER>/i))_0x1714a8=_0x3e9c80(0x1cc);else _0xcab0c9[_0x3e9c80(0x26f)](/<RIGHT>/i)&&(_0x1714a8=_0x3e9c80(0x47a));}_0xcab0c9=_0xcab0c9[_0x3e9c80(0x1d5)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0xcab0c9=_0xcab0c9['replace'](/\\I\[0\]/gi,'');const _0x2c5fc1=this[_0x3e9c80(0x3ef)](_0x1ac632);this[_0x3e9c80(0x57c)][_0x3e9c80(0x512)](_0x2c5fc1['x'],_0x2c5fc1['y'],_0x2c5fc1[_0x3e9c80(0x71d)],_0x2c5fc1[_0x3e9c80(0x6cf)]);const _0x46b1d3=this['textSizeEx'](_0xcab0c9)[_0x3e9c80(0x71d)];let _0x52a2da=_0x2c5fc1['x'];if(_0x1714a8==='center')_0x52a2da+=(_0x2c5fc1[_0x3e9c80(0x71d)]-_0x46b1d3)/0x2;else _0x1714a8===_0x3e9c80(0x47a)&&(_0x52a2da+=_0x2c5fc1['width']-_0x46b1d3);this['drawTextEx'](_0xcab0c9,_0x52a2da,_0x2c5fc1['y'],_0x46b1d3+0x8);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x266)]=function(_0x5d445c){const _0x3a6cfa=_0x2e20ee;this[_0x3a6cfa(0x3f0)][_0x3a6cfa(0x4d5)](_0x5d445c),this[_0x3a6cfa(0x71f)](),this[_0x3a6cfa(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)]['updateWaitMode']=function(){const _0x19c43d=_0x2e20ee;let _0x37eb63=![];switch(this[_0x19c43d(0x160)]){case _0x19c43d(0x5e9):_0x37eb63=this[_0x19c43d(0x2af)][_0x19c43d(0x740)]();break;case _0x19c43d(0x128):_0x37eb63=this[_0x19c43d(0x2af)][_0x19c43d(0x2d7)]();break;case'animation':_0x37eb63=this[_0x19c43d(0x2af)]['isAnimationPlaying']();break;case _0x19c43d(0x2db):_0x37eb63=this[_0x19c43d(0x2af)][_0x19c43d(0x315)]();break;case'jump':_0x37eb63=this[_0x19c43d(0x2af)][_0x19c43d(0x5df)]();break;case'opacity':_0x37eb63=this[_0x19c43d(0x2af)][_0x19c43d(0x725)]();break;}return!_0x37eb63&&(this['_waitMode']=''),_0x37eb63;},Window_BattleLog['prototype']['waitForAnimation']=function(){const _0x44fda1=_0x2e20ee;this[_0x44fda1(0x211)](_0x44fda1(0x352));},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x63e)]=function(){const _0x2f1709=_0x2e20ee;this[_0x2f1709(0x211)](_0x2f1709(0x2db));},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x789)]=function(){const _0x1e9a8c=_0x2e20ee;this['setWaitMode'](_0x1e9a8c(0x347));},Window_BattleLog[_0x2e20ee(0x112)]['waitForOpacity']=function(){const _0xaf8875=_0x2e20ee;this[_0xaf8875(0x211)]('opacity');},Window_BattleLog[_0x2e20ee(0x112)]['startTurn']=function(){const _0x89509e=_0x2e20ee,_0x357cf8=VisuMZ[_0x89509e(0x17b)][_0x89509e(0x1bf)][_0x89509e(0x690)];if(!_0x357cf8[_0x89509e(0x82f)])return;this['push'](_0x89509e(0x266),_0x357cf8[_0x89509e(0x281)][_0x89509e(0x483)]($gameTroop[_0x89509e(0x71b)]())),this[_0x89509e(0x4d5)](_0x89509e(0x42c),_0x357cf8[_0x89509e(0x68c)]),this[_0x89509e(0x4d5)](_0x89509e(0x6e4));},Window_BattleLog[_0x2e20ee(0x112)]['startAction']=function(_0x5eda50,_0x5431d6,_0xffd4aa){const _0x1d7f27=_0x2e20ee;this['isCustomActionSequence'](_0x5431d6)?BattleManager[_0x1d7f27(0x6c6)]():this['usePremadeActionSequence'](_0x5eda50,_0x5431d6,_0xffd4aa);},Window_BattleLog['prototype'][_0x2e20ee(0x479)]=function(_0x27f09e){const _0x1f8f34=_0x2e20ee;if(!SceneManager['isSceneBattle']())return![];if(!_0x27f09e)return![];if(!_0x27f09e['item']())return![];if(_0x27f09e[_0x1f8f34(0x57b)]()[_0x1f8f34(0x37b)][_0x1f8f34(0x26f)](/<CUSTOM ACTION SEQUENCE>/i))return!![];if(DataManager[_0x1f8f34(0x776)](_0x27f09e[_0x1f8f34(0x57b)]()))return!![];return![];},Window_BattleLog['prototype'][_0x2e20ee(0x206)]=function(_0x160c83,_0x59402b,_0xa9f2cb){const _0x13b233=_0x2e20ee,_0x20050e=_0x59402b[_0x13b233(0x57b)]();this[_0x13b233(0x1c6)](_0x160c83,_0x59402b,_0xa9f2cb),this['createEffectActionSet'](_0x160c83,_0x59402b,_0xa9f2cb),this['finishActionSet'](_0x160c83,_0x59402b,_0xa9f2cb);},Window_BattleLog[_0x2e20ee(0x112)]['displayAction']=function(_0x5eea33,_0x91778f){const _0x8b9421=_0x2e20ee,_0x5e54a7=VisuMZ[_0x8b9421(0x17b)][_0x8b9421(0x1bf)][_0x8b9421(0x690)];_0x5e54a7[_0x8b9421(0x805)]&&this[_0x8b9421(0x4d5)](_0x8b9421(0x266),_0x8b9421(0x166)[_0x8b9421(0x483)](DataManager[_0x8b9421(0x554)](_0x91778f)));if(DataManager[_0x8b9421(0x110)](_0x91778f)){if(_0x5e54a7['ActionSkillMsg1'])this[_0x8b9421(0x198)](_0x91778f[_0x8b9421(0x111)],_0x5eea33,_0x91778f);if(_0x5e54a7[_0x8b9421(0x208)])this['displayItemMessage'](_0x91778f['message2'],_0x5eea33,_0x91778f);}else{if(_0x5e54a7[_0x8b9421(0x7b2)])this[_0x8b9421(0x198)](TextManager[_0x8b9421(0x773)],_0x5eea33,_0x91778f);}},Window_BattleLog['prototype'][_0x2e20ee(0x1c6)]=function(_0x5f9f50,_0x313ad5,_0x132b59){const _0x29e41e=_0x2e20ee,_0x7d0084=_0x313ad5[_0x29e41e(0x57b)]();this[_0x29e41e(0x2df)](_0x5f9f50,_0x7d0084),this[_0x29e41e(0x4d5)](_0x29e41e(0x526),_0x5f9f50,_0x132b59,!![]),this['push'](_0x29e41e(0x4f3),_0x5f9f50,_0x313ad5),this[_0x29e41e(0x4d5)](_0x29e41e(0x279)),this[_0x29e41e(0x4d5)]('performCastAnimation',_0x5f9f50,_0x313ad5),this[_0x29e41e(0x4d5)](_0x29e41e(0x67b));},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x3b5)]=function(_0xc9fef2,_0x277d0b,_0xc1fcde){const _0x2f89e7=_0x2e20ee;if(this['isMeleeSingleTargetAction'](_0x277d0b))this[_0x2f89e7(0x293)](_0xc9fef2,_0x277d0b,_0xc1fcde);else{if(this[_0x2f89e7(0x357)](_0x277d0b))this['autoMeleeMultiTargetActionSet'](_0xc9fef2,_0x277d0b,_0xc1fcde);else _0x277d0b[_0x2f89e7(0x767)]()?this[_0x2f89e7(0x459)](_0xc9fef2,_0x277d0b,_0xc1fcde):this['wholeActionSet'](_0xc9fef2,_0x277d0b,_0xc1fcde);}},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x1d9)]=function(_0x57bffb){const _0x5a27cd=_0x2e20ee;if(!_0x57bffb[_0x5a27cd(0x278)]())return![];if(!_0x57bffb['isForOne']())return![];if(!_0x57bffb[_0x5a27cd(0x6bd)]())return![];return VisuMZ[_0x5a27cd(0x17b)][_0x5a27cd(0x1bf)][_0x5a27cd(0x1f6)][_0x5a27cd(0x6f6)];},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x293)]=function(_0x1ebc18,_0x21d4aa,_0x3fb224){const _0x3efddb=_0x2e20ee,_0x36df36=_0x1ebc18['getAttackMotion']()[_0x3efddb(0x78e)]<0x2,_0x21d1ae=0x14,_0x1f41ed=0x30;_0x36df36&&(this[_0x3efddb(0x4d5)](_0x3efddb(0x30c),[_0x1ebc18],_0x1f41ed,_0x21d1ae),this[_0x3efddb(0x4d5)](_0x3efddb(0x7bc),_0x1ebc18,_0x3fb224,_0x3efddb(0x679),_0x21d1ae,!![],_0x3efddb(0x68f),!![]),this[_0x3efddb(0x4d5)]('requestMotion',[_0x1ebc18],_0x3efddb(0x49d)),this[_0x3efddb(0x4d5)](_0x3efddb(0x279)));_0x21d4aa[_0x3efddb(0x57b)]()[_0x3efddb(0x2f7)]<0x0?this['targetActionSet'](_0x1ebc18,_0x21d4aa,_0x3fb224):this[_0x3efddb(0x7dc)](_0x1ebc18,_0x21d4aa,_0x3fb224);if(_0x36df36){const _0x72bf72=_0x1ebc18[_0x3efddb(0x7ec)]();this[_0x3efddb(0x4d5)](_0x3efddb(0x30c),[_0x1ebc18],_0x1f41ed,_0x21d1ae),this[_0x3efddb(0x4d5)](_0x3efddb(0x6a1),_0x1ebc18,_0x72bf72['_homeX'],_0x72bf72['_homeY'],_0x21d1ae,![],_0x3efddb(0x68f)),this[_0x3efddb(0x4d5)](_0x3efddb(0x309),[_0x1ebc18],_0x3efddb(0x193)),this[_0x3efddb(0x4d5)](_0x3efddb(0x279)),this[_0x3efddb(0x4d5)](_0x3efddb(0x309),[_0x1ebc18],_0x3efddb(0x49d));}},Window_BattleLog[_0x2e20ee(0x112)]['isMeleeMultiTargetAction']=function(_0x10a8a9){const _0x460f3c=_0x2e20ee;if(!_0x10a8a9[_0x460f3c(0x278)]())return![];if(!_0x10a8a9['isForAll']())return![];if(!_0x10a8a9[_0x460f3c(0x6bd)]())return![];return VisuMZ[_0x460f3c(0x17b)][_0x460f3c(0x1bf)][_0x460f3c(0x1f6)]['AutoMeleeAoE'];},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x33a)]=function(_0x26df85,_0x58c7fe,_0x2c1fc1){const _0x2633d9=_0x2e20ee,_0x18df1c=_0x26df85[_0x2633d9(0x422)]()[_0x2633d9(0x78e)]<0x2,_0x3b2ba2=0x14,_0x23b52a=0x30;_0x18df1c&&(this['push'](_0x2633d9(0x30c),[_0x26df85],_0x23b52a,_0x3b2ba2),this['push']('performMoveToTargets',_0x26df85,_0x2c1fc1,_0x2633d9(0x7cd),_0x3b2ba2,!![],_0x2633d9(0x68f),!![]),this['push'](_0x2633d9(0x309),[_0x26df85],_0x2633d9(0x49d)),this['push'](_0x2633d9(0x279)));this[_0x2633d9(0x7dc)](_0x26df85,_0x58c7fe,_0x2c1fc1);if(_0x18df1c){const _0x199acd=_0x26df85[_0x2633d9(0x7ec)]();this[_0x2633d9(0x4d5)](_0x2633d9(0x30c),[_0x26df85],_0x23b52a,_0x3b2ba2),this[_0x2633d9(0x4d5)]('performMoveToPoint',_0x26df85,_0x199acd[_0x2633d9(0x3b8)],_0x199acd[_0x2633d9(0x830)],_0x3b2ba2,![],'Linear'),this['push']('requestMotion',[_0x26df85],_0x2633d9(0x193)),this[_0x2633d9(0x4d5)](_0x2633d9(0x279)),this[_0x2633d9(0x4d5)](_0x2633d9(0x309),[_0x26df85],_0x2633d9(0x49d));}},Window_BattleLog['prototype'][_0x2e20ee(0x459)]=function(_0x257939,_0x437b24,_0x21572d){const _0x3681ed=_0x2e20ee,_0x3d77a2=_0x437b24['item']();for(const _0x569082 of _0x21572d){if(!_0x569082)continue;this[_0x3681ed(0x4d5)](_0x3681ed(0x737),_0x257939,_0x437b24),this[_0x3681ed(0x4d5)]('waitCount',Sprite_Battler[_0x3681ed(0x210)]),this[_0x3681ed(0x4d5)](_0x3681ed(0x616),_0x257939,[_0x569082],_0x3d77a2[_0x3681ed(0x2f7)]),this[_0x3681ed(0x4d5)]('waitCount',0x18),this[_0x3681ed(0x4d5)](_0x3681ed(0x5f0),_0x257939,_0x569082);}this[_0x3681ed(0x4d5)](_0x3681ed(0x526),_0x257939,_0x21572d,![]);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x7dc)]=function(_0x30e07d,_0x184dbb,_0xa446f1){const _0x2bcf2c=_0x2e20ee,_0x47b632=_0x184dbb['item']();this['push'](_0x2bcf2c(0x737),_0x30e07d,_0x184dbb),this[_0x2bcf2c(0x4d5)](_0x2bcf2c(0x42c),Sprite_Battler[_0x2bcf2c(0x210)]),this[_0x2bcf2c(0x4d5)](_0x2bcf2c(0x616),_0x30e07d,_0xa446f1[_0x2bcf2c(0x4cd)](),_0x47b632[_0x2bcf2c(0x2f7)]),this[_0x2bcf2c(0x4d5)](_0x2bcf2c(0x67b));for(const _0x5d4684 of _0xa446f1){if(!_0x5d4684)continue;this[_0x2bcf2c(0x4d5)](_0x2bcf2c(0x5f0),_0x30e07d,_0x5d4684);}this['push'](_0x2bcf2c(0x526),_0x30e07d,_0xa446f1,![]);},Window_BattleLog[_0x2e20ee(0x112)]['finishActionSet']=function(_0x2ddad7,_0x211463,_0x5efd35){const _0x46bba5=_0x2e20ee,_0x1ab10d=_0x211463[_0x46bba5(0x57b)]();this[_0x46bba5(0x4d5)](_0x46bba5(0x526),_0x2ddad7,_0x5efd35,![]),this[_0x46bba5(0x4d5)](_0x46bba5(0x6e6)),this[_0x46bba5(0x4d5)]('waitForEffect'),this['push']('clear'),this[_0x46bba5(0x4d5)](_0x46bba5(0x20e),_0x2ddad7),this[_0x46bba5(0x4d5)](_0x46bba5(0x279));},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x7a9)]=function(_0x20111f){},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x7b5)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x807)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x807)]=function(_0x33a503){const _0x1e30de=_0x2e20ee;if(!VisuMZ[_0x1e30de(0x17b)][_0x1e30de(0x1bf)]['BattleLog'][_0x1e30de(0x4fc)])return;VisuMZ[_0x1e30de(0x17b)][_0x1e30de(0x7b5)][_0x1e30de(0x7c6)](this,_0x33a503);},Window_BattleLog['prototype'][_0x2e20ee(0x778)]=function(_0x71220){const _0xb38693=_0x2e20ee;this[_0xb38693(0x4d5)](_0xb38693(0x3bd),_0x71220);VisuMZ['BattleCore']['Settings'][_0xb38693(0x1f6)]['CounterPlayback']&&this['push'](_0xb38693(0x616),_0x71220,[BattleManager[_0xb38693(0x3ca)]],-0x1);if(!VisuMZ[_0xb38693(0x17b)][_0xb38693(0x1bf)][_0xb38693(0x690)][_0xb38693(0x728)])return;this[_0xb38693(0x4d5)](_0xb38693(0x266),TextManager[_0xb38693(0x53c)][_0xb38693(0x483)](_0x71220[_0xb38693(0x2e8)]()));},Window_BattleLog['prototype'][_0x2e20ee(0x522)]=function(_0x2a2c1e){const _0x2d56b4=_0x2e20ee;this['push'](_0x2d56b4(0x320),_0x2a2c1e);if(!VisuMZ[_0x2d56b4(0x17b)]['Settings'][_0x2d56b4(0x690)][_0x2d56b4(0x227)])return;this['push']('addText',TextManager[_0x2d56b4(0x7ce)]['format'](_0x2a2c1e[_0x2d56b4(0x2e8)]()));},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x4f7)]=function(_0x389c96,_0x5aeb46){const _0x27afa8=_0x2e20ee;if(VisuMZ[_0x27afa8(0x17b)][_0x27afa8(0x1bf)]['ActionSequence'][_0x27afa8(0x543)]){const _0x324c2d=_0x5aeb46[_0x27afa8(0x57b)]();this[_0x27afa8(0x4d5)](_0x27afa8(0x616),_0x389c96,[_0x389c96],_0x324c2d[_0x27afa8(0x2f7)]);}},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x642)]=function(_0x4025e4,_0x375f18){const _0x144520=_0x2e20ee;this[_0x144520(0x4d5)]('performSubstitute',_0x4025e4,_0x375f18);if(!VisuMZ[_0x144520(0x17b)]['Settings']['BattleLog'][_0x144520(0x814)])return;const _0x1fbcc2=_0x4025e4['name'](),_0x55b830=TextManager[_0x144520(0x6d4)][_0x144520(0x483)](_0x1fbcc2,_0x375f18[_0x144520(0x2e8)]());this['push']('addText',_0x55b830);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x30e)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x1de)],Window_BattleLog[_0x2e20ee(0x112)]['displayFailure']=function(_0x1a3087){const _0x233116=_0x2e20ee;if(!VisuMZ['BattleCore']['Settings']['BattleLog'][_0x233116(0x117)])return;VisuMZ['BattleCore']['Window_BattleLog_displayFailure']['call'](this,_0x1a3087);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x1d7)]=Window_BattleLog['prototype'][_0x2e20ee(0x485)],Window_BattleLog['prototype'][_0x2e20ee(0x485)]=function(_0x116642){const _0x379393=_0x2e20ee;if(!VisuMZ['BattleCore'][_0x379393(0x1bf)][_0x379393(0x690)][_0x379393(0x144)])return;VisuMZ['BattleCore'][_0x379393(0x1d7)][_0x379393(0x7c6)](this,_0x116642);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x47f)]=Window_BattleLog[_0x2e20ee(0x112)]['displayMiss'],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x70f)]=function(_0x540cc7){const _0x3d4a1f=_0x2e20ee;!VisuMZ[_0x3d4a1f(0x17b)][_0x3d4a1f(0x1bf)][_0x3d4a1f(0x690)]['ShowMissEvasion']?this['push']('performMiss',_0x540cc7):VisuMZ[_0x3d4a1f(0x17b)][_0x3d4a1f(0x47f)][_0x3d4a1f(0x7c6)](this,_0x540cc7);},VisuMZ['BattleCore'][_0x2e20ee(0x5b0)]=Window_BattleLog['prototype'][_0x2e20ee(0x461)],Window_BattleLog['prototype'][_0x2e20ee(0x461)]=function(_0x2b5937){const _0x12d1a7=_0x2e20ee;!VisuMZ[_0x12d1a7(0x17b)]['Settings'][_0x12d1a7(0x690)]['ShowMissEvasion']?_0x2b5937['result']()[_0x12d1a7(0x71e)]?this[_0x12d1a7(0x4d5)](_0x12d1a7(0x24c),_0x2b5937):this['push'](_0x12d1a7(0x2ea),_0x2b5937):VisuMZ[_0x12d1a7(0x17b)][_0x12d1a7(0x5b0)][_0x12d1a7(0x7c6)](this,_0x2b5937);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x75a)]=function(_0x3d8321){const _0x46472b=_0x2e20ee;_0x3d8321[_0x46472b(0x7bd)]()[_0x46472b(0x367)]&&(_0x3d8321[_0x46472b(0x7bd)]()[_0x46472b(0x753)]>0x0&&!_0x3d8321[_0x46472b(0x7bd)]()['drain']&&this[_0x46472b(0x4d5)]('performDamage',_0x3d8321),_0x3d8321[_0x46472b(0x7bd)]()[_0x46472b(0x753)]<0x0&&this[_0x46472b(0x4d5)]('performRecovery',_0x3d8321),VisuMZ['BattleCore']['Settings'][_0x46472b(0x690)][_0x46472b(0x12a)]&&this[_0x46472b(0x4d5)]('addText',this[_0x46472b(0x671)](_0x3d8321)));},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x596)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x36a)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x36a)]=function(_0x24422b){const _0x5709b8=_0x2e20ee;if(!VisuMZ['BattleCore'][_0x5709b8(0x1bf)][_0x5709b8(0x690)][_0x5709b8(0x77c)])return;VisuMZ['BattleCore'][_0x5709b8(0x596)][_0x5709b8(0x7c6)](this,_0x24422b);},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x129)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x51e)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x51e)]=function(_0x17aa12){const _0x43d029=_0x2e20ee;if(!VisuMZ['BattleCore'][_0x43d029(0x1bf)]['BattleLog'][_0x43d029(0x3ed)])return;VisuMZ[_0x43d029(0x17b)][_0x43d029(0x129)][_0x43d029(0x7c6)](this,_0x17aa12);},Window_BattleLog[_0x2e20ee(0x112)]['displayAddedStates']=function(_0x11189a){const _0x283a5b=_0x2e20ee,_0x590eb8=_0x11189a[_0x283a5b(0x7bd)](),_0x1804a0=_0x590eb8['addedStateObjects']();for(const _0x4fea0c of _0x1804a0){const _0x10ae45=_0x11189a[_0x283a5b(0x13d)]()?_0x4fea0c[_0x283a5b(0x111)]:_0x4fea0c['message2'];_0x10ae45&&VisuMZ[_0x283a5b(0x17b)][_0x283a5b(0x1bf)]['BattleLog'][_0x283a5b(0x1e6)]&&(this[_0x283a5b(0x4d5)](_0x283a5b(0x81b)),this[_0x283a5b(0x4d5)]('pushBaseLine'),this['push'](_0x283a5b(0x266),_0x10ae45['format'](_0x11189a[_0x283a5b(0x2e8)]())),this[_0x283a5b(0x4d5)]('wait')),_0x4fea0c['id']===_0x11189a[_0x283a5b(0x59f)]()&&this[_0x283a5b(0x4d5)](_0x283a5b(0x6cb),_0x11189a);}},Window_BattleLog[_0x2e20ee(0x112)]['displayRemovedStates']=function(_0x17db82){const _0x6ab4e=_0x2e20ee;if(!VisuMZ[_0x6ab4e(0x17b)][_0x6ab4e(0x1bf)]['BattleLog'][_0x6ab4e(0x5ec)])return;const _0x3042ab=_0x17db82['result'](),_0x2ace95=_0x3042ab['removedStateObjects']();for(const _0x279d6e of _0x2ace95){_0x279d6e[_0x6ab4e(0x631)]&&(this[_0x6ab4e(0x4d5)](_0x6ab4e(0x81b)),this[_0x6ab4e(0x4d5)](_0x6ab4e(0x226)),this['push'](_0x6ab4e(0x266),_0x279d6e[_0x6ab4e(0x631)][_0x6ab4e(0x483)](_0x17db82[_0x6ab4e(0x2e8)]())),this[_0x6ab4e(0x4d5)]('wait'));}},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x26b)]=function(_0x502999){const _0x1fbd32=_0x2e20ee,_0x5da8db=VisuMZ['BattleCore']['Settings'][_0x1fbd32(0x690)],_0x98d0c0=_0x502999['result']();if(_0x5da8db[_0x1fbd32(0x2ed)])this['displayBuffs'](_0x502999,_0x98d0c0['addedBuffs'],TextManager[_0x1fbd32(0x34f)]);if(_0x5da8db[_0x1fbd32(0x553)])this[_0x1fbd32(0x674)](_0x502999,_0x98d0c0[_0x1fbd32(0x607)],TextManager['debuffAdd']);if(_0x5da8db[_0x1fbd32(0x494)])this[_0x1fbd32(0x674)](_0x502999,_0x98d0c0[_0x1fbd32(0x501)],TextManager['buffRemove']);},Window_BattleLog[_0x2e20ee(0x112)]['displayBuffs']=function(_0xf1c2b3,_0x7e06be,_0x27ef8b){const _0x5de72e=_0x2e20ee;for(const _0x531994 of _0x7e06be){const _0x3b2f71=_0x27ef8b[_0x5de72e(0x483)](_0xf1c2b3['name'](),TextManager['param'](_0x531994));this['push'](_0x5de72e(0x81b)),this['push'](_0x5de72e(0x226)),this['push'](_0x5de72e(0x266),_0x3b2f71),this[_0x5de72e(0x4d5)]('wait');}},VisuMZ['BattleCore'][_0x2e20ee(0x257)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x6e4)],Window_BattleLog['prototype'][_0x2e20ee(0x6e4)]=function(){const _0x18848e=_0x2e20ee;VisuMZ[_0x18848e(0x17b)][_0x18848e(0x257)][_0x18848e(0x7c6)](this),this['callNextMethod']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x351)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x226)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x226)]=function(){const _0x30693d=_0x2e20ee;VisuMZ['BattleCore']['Window_BattleLog_pushBaseLine'][_0x30693d(0x7c6)](this),this[_0x30693d(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x806)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x81b)],Window_BattleLog['prototype'][_0x2e20ee(0x81b)]=function(){const _0x3fdf94=_0x2e20ee;VisuMZ[_0x3fdf94(0x17b)][_0x3fdf94(0x806)][_0x3fdf94(0x7c6)](this),this[_0x3fdf94(0x71f)](),this[_0x3fdf94(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)]['Window_BattleLog_popupDamage']=Window_BattleLog['prototype']['popupDamage'],Window_BattleLog[_0x2e20ee(0x112)]['popupDamage']=function(_0xe29204){const _0x519d5d=_0x2e20ee;VisuMZ[_0x519d5d(0x17b)][_0x519d5d(0x384)][_0x519d5d(0x7c6)](this,_0xe29204),this[_0x519d5d(0x34a)]();},Window_BattleLog['prototype']['waitForNewLine']=function(){const _0x5be44c=_0x2e20ee;let _0xd44c65=0x0;this['_baseLineStack'][_0x5be44c(0x5c2)]>0x0&&(_0xd44c65=this[_0x5be44c(0x54c)][this[_0x5be44c(0x54c)][_0x5be44c(0x5c2)]-0x1]),this[_0x5be44c(0x3f0)]['length']>_0xd44c65?this[_0x5be44c(0x6ca)]():this['callNextMethod']();},VisuMZ[_0x2e20ee(0x17b)]['Window_BattleLog_performActionStart']=Window_BattleLog[_0x2e20ee(0x112)]['performActionStart'],Window_BattleLog[_0x2e20ee(0x112)]['performActionStart']=function(_0x2f0e90,_0x4549db){const _0x55b129=_0x2e20ee;VisuMZ['BattleCore'][_0x55b129(0x331)][_0x55b129(0x7c6)](this,_0x2f0e90,_0x4549db),this[_0x55b129(0x34a)]();},VisuMZ['BattleCore']['Window_BattleLog_performAction']=Window_BattleLog['prototype'][_0x2e20ee(0x737)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x737)]=function(_0x46989b,_0x2d60d0){const _0x5643ab=_0x2e20ee;VisuMZ[_0x5643ab(0x17b)][_0x5643ab(0x75b)][_0x5643ab(0x7c6)](this,_0x46989b,_0x2d60d0),this['callNextMethod']();},VisuMZ['BattleCore'][_0x2e20ee(0x7bf)]=Window_BattleLog['prototype'][_0x2e20ee(0x20e)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x20e)]=function(_0x299f2d){const _0xafba26=_0x2e20ee;VisuMZ[_0xafba26(0x17b)][_0xafba26(0x7bf)][_0xafba26(0x7c6)](this,_0x299f2d);for(const _0x413221 of BattleManager[_0xafba26(0x6e8)]()){if(!_0x413221)continue;if(_0x413221['isDead']())continue;_0x413221[_0xafba26(0x649)]();}this[_0xafba26(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)]['Window_BattleLog_performDamage']=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x5c1)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x5c1)]=function(_0x186de3){const _0x27c4f8=_0x2e20ee;VisuMZ[_0x27c4f8(0x17b)][_0x27c4f8(0x61e)][_0x27c4f8(0x7c6)](this,_0x186de3),this[_0x27c4f8(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0xc2)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x80e)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x80e)]=function(_0x503298){const _0xe2e5d1=_0x2e20ee;VisuMZ[_0xe2e5d1(0x17b)][_0xe2e5d1(0xc2)][_0xe2e5d1(0x7c6)](this,_0x503298),this[_0xe2e5d1(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)]['Window_BattleLog_performRecovery']=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x7ad)],Window_BattleLog['prototype'][_0x2e20ee(0x7ad)]=function(_0x17ce69){const _0x1a1719=_0x2e20ee;VisuMZ[_0x1a1719(0x17b)]['Window_BattleLog_performRecovery'][_0x1a1719(0x7c6)](this,_0x17ce69),this[_0x1a1719(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x5ae)]=Window_BattleLog['prototype'][_0x2e20ee(0x24c)],Window_BattleLog[_0x2e20ee(0x112)]['performEvasion']=function(_0x32170f){const _0x4ee4f2=_0x2e20ee;VisuMZ[_0x4ee4f2(0x17b)][_0x4ee4f2(0x5ae)][_0x4ee4f2(0x7c6)](this,_0x32170f),this[_0x4ee4f2(0x34a)]();},VisuMZ['BattleCore'][_0x2e20ee(0x1f1)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x2ea)],Window_BattleLog['prototype'][_0x2e20ee(0x2ea)]=function(_0x5836a7){const _0x45a324=_0x2e20ee;VisuMZ['BattleCore'][_0x45a324(0x1f1)][_0x45a324(0x7c6)](this,_0x5836a7),this['callNextMethod']();},VisuMZ[_0x2e20ee(0x17b)]['Window_BattleLog_performCounter']=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x3bd)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x3bd)]=function(_0x3f98f1){const _0x8f8f4c=_0x2e20ee;VisuMZ[_0x8f8f4c(0x17b)][_0x8f8f4c(0x10d)][_0x8f8f4c(0x7c6)](this,_0x3f98f1),this[_0x8f8f4c(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x43a)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x320)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x320)]=function(_0x265abb){const _0xcd1e8a=_0x2e20ee;VisuMZ[_0xcd1e8a(0x17b)]['Window_BattleLog_performReflection'][_0xcd1e8a(0x7c6)](this,_0x265abb),this['callNextMethod']();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x150)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x12c)],Window_BattleLog[_0x2e20ee(0x112)]['performSubstitute']=function(_0x101d98,_0x4c21b5){const _0x2d3681=_0x2e20ee;VisuMZ['BattleCore'][_0x2d3681(0x150)][_0x2d3681(0x7c6)](this,_0x101d98,_0x4c21b5),this[_0x2d3681(0x34a)]();},VisuMZ[_0x2e20ee(0x17b)][_0x2e20ee(0x2bb)]=Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x6cb)],Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x6cb)]=function(_0x370917){const _0x4732c9=_0x2e20ee;VisuMZ[_0x4732c9(0x17b)]['Window_BattleLog_performCollapse'][_0x4732c9(0x7c6)](this,_0x370917),this[_0x4732c9(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)]['performCastAnimation']=function(_0x2b44fd,_0x21f7bc){const _0xeb1777=_0x2e20ee;_0x2b44fd[_0xeb1777(0x66b)](_0x21f7bc),this[_0xeb1777(0x34a)]();},Window_BattleLog['prototype'][_0x2e20ee(0x803)]=function(_0x58a3b5,_0x2c0598){const _0x48d11d=_0x2e20ee,_0x5a6258=_0x58a3b5[_0x48d11d(0x7eb)]();_0x5a6258<=0x0?SoundManager[_0x48d11d(0x6a5)]():this[_0x48d11d(0x54f)](_0x2c0598,_0x5a6258);},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x526)]=function(_0x32c06a,_0x47f43c,_0x1b5447){const _0x501777=_0x2e20ee,_0x42e013=[_0x32c06a]['concat'](_0x47f43c);for(const _0x327f2b of _0x42e013){if(!_0x327f2b)continue;_0x327f2b[_0x501777(0x53b)](_0x1b5447);}this[_0x501777(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x42c)]=function(_0x5e3242){this['_waitCount']=_0x5e3242;},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x309)]=function(_0x49def3,_0x3ea37a){const _0x4a8ebb=_0x2e20ee;for(const _0x493eb3 of _0x49def3){if(!_0x493eb3)continue;_0x493eb3['requestMotion'](_0x3ea37a);}this[_0x4a8ebb(0x34a)]();},Window_BattleLog['prototype'][_0x2e20ee(0x6a1)]=function(_0x81eabe,_0x12f6d5,_0xad8999,_0x4252cd,_0x38b8e9,_0x4f79e8){const _0x22878e=_0x2e20ee;_0x81eabe[_0x22878e(0x4b9)](_0x12f6d5,_0xad8999,_0x4252cd,_0x38b8e9,_0x4f79e8,-0x1),this[_0x22878e(0x34a)]();},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x7bc)]=function(_0x425068,_0x3d8605,_0x328435,_0x55cb33,_0x3cbcc2,_0x31026a,_0x42fd67){const _0x2212f9=_0x2e20ee,_0x50c81e=Math[_0x2212f9(0x567)](..._0x3d8605[_0x2212f9(0x4f1)](_0x2ddccf=>_0x2ddccf['battler']()[_0x2212f9(0x1f7)]-_0x2ddccf[_0x2212f9(0x7ec)]()[_0x2212f9(0x802)]()/0x2)),_0x3873ea=Math[_0x2212f9(0x376)](..._0x3d8605[_0x2212f9(0x4f1)](_0x53d61c=>_0x53d61c[_0x2212f9(0x7ec)]()[_0x2212f9(0x1f7)]+_0x53d61c[_0x2212f9(0x7ec)]()[_0x2212f9(0x802)]()/0x2)),_0x45f421=Math['min'](..._0x3d8605[_0x2212f9(0x4f1)](_0x1c0fc4=>_0x1c0fc4[_0x2212f9(0x7ec)]()[_0x2212f9(0x4af)]-_0x1c0fc4[_0x2212f9(0x7ec)]()[_0x2212f9(0xf7)]())),_0x11f27d=Math[_0x2212f9(0x376)](..._0x3d8605[_0x2212f9(0x4f1)](_0x5019bb=>_0x5019bb['battler']()[_0x2212f9(0x4af)])),_0x2b4eda=_0x3d8605['filter'](_0x156fa0=>_0x156fa0['isActor']())['length'],_0x2d8bd5=_0x3d8605[_0x2212f9(0x48e)](_0x421028=>_0x421028['isEnemy']())[_0x2212f9(0x5c2)];let _0x5888e6=0x0,_0x15fac7=0x0;if(_0x328435[_0x2212f9(0x26f)](/front/i))_0x5888e6=_0x2b4eda>=_0x2d8bd5?_0x50c81e:_0x3873ea;else{if(_0x328435[_0x2212f9(0x26f)](/middle/i))_0x5888e6=(_0x50c81e+_0x3873ea)/0x2,_0x42fd67=-0x1;else _0x328435[_0x2212f9(0x26f)](/back/i)&&(_0x5888e6=_0x2b4eda>=_0x2d8bd5?_0x3873ea:_0x50c81e);}if(_0x328435[_0x2212f9(0x26f)](/head/i))_0x15fac7=_0x45f421;else{if(_0x328435[_0x2212f9(0x26f)](/center/i))_0x15fac7=(_0x45f421+_0x11f27d)/0x2;else _0x328435[_0x2212f9(0x26f)](/base/i)&&(_0x15fac7=_0x11f27d);}_0x425068[_0x2212f9(0x4b9)](_0x5888e6,_0x15fac7,_0x55cb33,_0x3cbcc2,_0x31026a,_0x42fd67),this['callNextMethod']();},Window_BattleLog[_0x2e20ee(0x112)][_0x2e20ee(0x30c)]=function(_0xf518fc,_0x467b43,_0x3eb9d8){const _0x56228b=_0x2e20ee;for(const _0x439091 of _0xf518fc){if(!_0x439091)continue;_0x439091[_0x56228b(0xc5)](_0x467b43,_0x3eb9d8);}this[_0x56228b(0x34a)]();};