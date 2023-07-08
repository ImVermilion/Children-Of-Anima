//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.09;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.09] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * - VisuMZ_1_BattleCore
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * ---
 *
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 *
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * Version 1.09: January 15, 2021
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
 * @default true
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
 * @param VictoryAftermath
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 * 
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x50ed=['DigitGroupingStandardText','Data','ARRAYJSON','filter','victoryContinueFmt','Bypass','items','LvFmt','map','_victorySteps','victoryDisplayItem','Scene_Battle_update','version','drawRewardStrip','_itemGainWindow','drawExpGauge','drawLevelUpQuote','SystemBypassVictoryMusic','bypassVictoryPhase','scale','isRepeated','ShowDelayMS','updateVictoryPhase','MAX\x20LEVEL','ExtDisplayedParams','cancel','206390bsAlhi','_victoryTempActorsB','createVictorySteps','nextVictoryLevelUpActor','textWidth','processVictoryAftermath','checkVictoryAftermathAutoBattleAutoSkip','Settings','Template','bitmap','toUpperCase','drawCircle','drawText','prototype','playSe','max','LvUpPan','drawActorAdditionalRewards','createActorSprite','isShowNew','ARRAYSTR','createGaugeSprite','allowUpdateBattleAniSpeed','victoryDisplayLvFmt','closeCommandWindows','drawParamDiffValue','param','ConvertParams','drawItemDarkRect','isVictoryContinueReady','measureTextWidth','AftermathActorDisplay','getVictoryAftermathBackColor','setActor','gainTempExp','VisuMZ_2_SkillLearnSystem','padding','isActor','updateContentsOpacity','gaugeBackColor','isBattleMember','isBypassVictoryAftermathPhase','AbilityPoints','findNewSkills','getAdditionalRewardsText','_victoryWindows','JobPoints','min','center','NewQuotes','performVictory','maxLvGaugeColor2','height','STR','hideSubInputWindows','currentLevelExp','_effectType','GroupDigits','_showFace','drawActorNameStrip','makeItemGainWindow','rgba(0,\x200,\x200,\x200.4)','gradientFillRect','25121mDaSgP','itemCount','AftermathText','AutoBattleAutoSkip','makeDeepCopy','addChild','(+%1)','1xfonAb','_victoryAftermathCopy','earnedJobPoints','BattleManager_initMembers','x%1','ItemsEquipsCore','WaitBossCollapse','fontFace','getInputButtonString','drawParamName','ARRAYSTRUCT','contents','victoryKeyCancel','maxLvGaugeColor1','ClassChangeSystem','_victoryRewardsWindow','_victoryAftermathLevelUpQuotes','gaugeColor2','SystemBypassVictoryPhase','isBypassVictoryAftermathMotion','_currentlevel','BattleManager_isBusy','createVictoryStepRewards','changeExp','_victoryLevelUpBuffer','setActionState','setup','BackRectColor','nextLevelExp','playVictoryLevelUpSFX','blt','processVictoryAftermathParty','drawLevelMessage','placeActorGauges','description','shouldDisplayLevelUp','LvUpSfx','290593BgWwJh','playVictoryBgm','finishVictoryPhase','victoryNameBitmap','parameters','MessageWidth','lineHeight','ARRAYNUM','_victoryLevelUpWindow','_victoryBgm','107615DCjErp','439bINZQP','VisuMZ_0_CoreEngine','_rewardSets','collapse','drawActorName','getColor','HideLevelDiff','bind','Game_Actor_shouldDisplayLevelUp','victoryDisplayTitle','_delayDuration','690186fBLinQ','SystemBypassVictoryMotion','_actorId','exit','drawBackgroundElements','_victoryAftermathNewSkillQuotes','drawItemBackground','clearRect','createBitmap','BattleVictoryJS','prepareVictoryAftermathTransition','exp','drawPartyExpGauges','_data','makeVictoryCopy','processVictoryStep','isBypassVictoryAftermathMusic','earnedClassPoints','anchor','normalColor','_statusWindow','victoryDisplayLvUp','processVictoryAftermathMusic','_spriteset','makeFontBigger','ContinueFmt','playVictoryMe','registerCommand','_victoryStep','trim','createVictoryAftermathWindows','left','_victoryLevelUpSFX','drawItemNumber','return\x200','initialize','ItemQuantityFmt','bossCollapse','split','drawNewLearnedSkills','_scene','isContinueReady','maxVisibleItems','_fullWidth','systemColor','changeTextColor','rgba(0,\x200,\x200,\x201)','paintOpacity','indexOf','Enable','_opacitySpeed','actor','currentExp','createSubWindow','round','bypassVictoryMusic','toLowerCase','index','quoteLevelSkill','Bgm','#%1','drawExpValues','members','Vocab','_victoryAftermathSettings','battlerSprites','textSizeEx','processVictoryAftermathTransition','select','145mtCaZd','note','KeyCancel','ActorID','volume','includes','QoL','DrawBackRect','BustPosY','victoryRewardBitmap','isFastForwarded','faceHeight','pitch','format','isVictoryPhase','_drawParamDiff','BustScale','rgba(0,\x200,\x200,\x200.8)','ActorQuotesLevelUpAdd','_colorCache','VisuMZ_1_OptionsCore','Game_Actor_performVictory','_victoryPhase','MirrorContents','General','drawParamChanges','innerWidth','_victoryTempActorsA','victoryNewSkillFmt','translucentOpacity','EVAL','VisuMZ_1_ItemsEquipsCore','drawItemGainTitle','CoreEngine','drawParamBeforeValue','_actor','beforeActor','setupVictoryAftermathQuotes','WaitRegularCollapse','updateVictorySteps','drawTextEx','gaugeHeight','newSkillQuotes','LevelUpQuotes','loadPicture','drawActorLevel','_additionalSprites','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UpdateDuration','ClassPoints','_mainWindow','faceWidth','skipVictoryAftermathTransition','length','victory-level-up-color','processVictoryAftermathRewards','_showBust','ARRAYEVAL','drawParamAfterValue','_duration','isArmor','itemHeight','classPointsFull','ActorQuotesNewSkillAdd','BustPosX','paramValueFontSize','updateExpGain','fillRect','shift','71409qoxsjH','_victoryContinueWindow','Game_Actor_setup','createVictoryStepLevelUps','isWeapon','refresh','levelups','width','getQuoteWidth','_tempActorExpGain','victoryContinueMessageWindowRect','_rewards','VisuMZ_1_MainMenuCore','initMembers','updateOpacity','parse','makeRewards','Show','dimColor2','(%1)','activate','createVictoryRewardsWindow','victoryFullScreenWindowRect','itemPadding','createVictoryContinueMessageWindow','drawNewLearnedSkillsBackground','bypassVictoryMotion','getQuoteText','ShowParamDiff','endBattle','ShowBust','levelUpQuotes','_autoBattleVictorySkip','colSpacing','clamp','call','rewards','paramchangeTextColor','FadeInSpeed','boxWidth','NUM','FUNC','floor','skills','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','actor%1-gauge','isMaxLevel','NewSkillQuotes','match','expRate','contentsOpacity','hideWindowsForVictoryAftermath','createVictoryLevelUpWindow','gaugeColor1','resetFontSettings','_victoryActorIndex','VisuMZ_1_MessageCore','constructor','ShowFace','LvUpColor','isPressed','removeBattleStates','isSceneBattle','setDelayDuration','STRUCT','isBusy','updatePadding','Game_System_initialize','_actorSprite','NewSkill','victoryLevelUpColor','isVictoryLevelUpPhaseEnabled','getColorDataFromPluginParameters','opacity','_showLevelUp','initVictoryAftermath','Rewards','getMenuImage','isCollapsing','sort','drawRewards','push','ARRAYFUNC','_subWindow','VictoryAftermath','victoryAftermathSettings','Scene_Battle_allowUpdateBattleAniSpeed','name','removeVictoryLevelUpBuffer','skillPointsFull','makeItemList','level','powerUpColor','clear','LvUp','mirrorContents','SkillLearnSystem','SkillPoints','onVictoryStepLevelUpMember','show','drawNewLearnedSkillsList','randomInt','processBattleCoreJS','LevelUp','LvUpVolume','concat','right','battleMembers','fontSize','mainFontFace','_phase','maxBattleMembers','addChildToBack','expGaugeColor1','_index','loadFaceImages','paramValueByName','Game_Actor_isBattleMember','actorParams','setBackgroundType','create','textColor','_victoryUpdateDuration','1KDycBE','update','classPointsAbbr','some','_autoBattle','pan','jobPointsAbbr','1RitgjQ','move'];const _0x2886=function(_0x125de7,_0x2c2cb7){_0x125de7=_0x125de7-0x8a;let _0x50ed9f=_0x50ed[_0x125de7];return _0x50ed9f;};const _0x4462e2=_0x2886;(function(_0x548551,_0x28a2a1){const _0x4ce80b=_0x2886;while(!![]){try{const _0x2325cb=parseInt(_0x4ce80b(0x19a))+-parseInt(_0x4ce80b(0x190))*parseInt(_0x4ce80b(0x16b))+-parseInt(_0x4ce80b(0x109))*parseInt(_0x4ce80b(0x125))+parseInt(_0x4ce80b(0x1eb))*-parseInt(_0x4ce80b(0x19b))+parseInt(_0x4ce80b(0x164))*parseInt(_0x4ce80b(0x102))+-parseInt(_0x4ce80b(0x230))+parseInt(_0x4ce80b(0x1a6));if(_0x2325cb===_0x28a2a1)break;else _0x548551['push'](_0x548551['shift']());}catch(_0x3a1e39){_0x548551['push'](_0x548551['shift']());}}}(_0x50ed,0x2e99b));var label=_0x4462e2(0xdb),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x4db7df){const _0x1af798=_0x4462e2;return _0x4db7df['status']&&_0x4db7df[_0x1af798(0x18d)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4462e2(0x12c)]=VisuMZ[label][_0x4462e2(0x12c)]||{},VisuMZ[_0x4462e2(0x140)]=function(_0x4d4fdf,_0x50fcb3){const _0x4b8cb7=_0x4462e2;for(const _0x43778e in _0x50fcb3){if(_0x43778e['match'](/(.*):(.*)/i)){const _0x465231=String(RegExp['$1']),_0x311bfb=String(RegExp['$2'])[_0x4b8cb7(0x12f)]()[_0x4b8cb7(0x1c3)]();let _0x8c928a,_0x34a3b8,_0x5ab268;switch(_0x311bfb){case _0x4b8cb7(0xaf):_0x8c928a=_0x50fcb3[_0x43778e]!==''?Number(_0x50fcb3[_0x43778e]):0x0;break;case _0x4b8cb7(0x197):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON['parse'](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8[_0x4b8cb7(0x113)](_0x51c6e3=>Number(_0x51c6e3));break;case _0x4b8cb7(0x209):_0x8c928a=_0x50fcb3[_0x43778e]!==''?eval(_0x50fcb3[_0x43778e]):null;break;case _0x4b8cb7(0x224):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8[_0x4b8cb7(0x113)](_0x5afcf9=>eval(_0x5afcf9));break;case'JSON':_0x8c928a=_0x50fcb3[_0x43778e]!==''?JSON['parse'](_0x50fcb3[_0x43778e]):'';break;case _0x4b8cb7(0x10d):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8[_0x4b8cb7(0x113)](_0x331d70=>JSON[_0x4b8cb7(0x96)](_0x331d70));break;case _0x4b8cb7(0xb0):_0x8c928a=_0x50fcb3[_0x43778e]!==''?new Function(JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e])):new Function(_0x4b8cb7(0x1c8));break;case _0x4b8cb7(0xd9):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8['map'](_0x3bd52c=>new Function(JSON[_0x4b8cb7(0x96)](_0x3bd52c)));break;case _0x4b8cb7(0x15a):_0x8c928a=_0x50fcb3[_0x43778e]!==''?String(_0x50fcb3[_0x43778e]):'';break;case _0x4b8cb7(0x139):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8[_0x4b8cb7(0x113)](_0x57cbae=>String(_0x57cbae));break;case _0x4b8cb7(0xc7):_0x5ab268=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):{},_0x8c928a=VisuMZ[_0x4b8cb7(0x140)]({},_0x5ab268);break;case _0x4b8cb7(0x175):_0x34a3b8=_0x50fcb3[_0x43778e]!==''?JSON[_0x4b8cb7(0x96)](_0x50fcb3[_0x43778e]):[],_0x8c928a=_0x34a3b8[_0x4b8cb7(0x113)](_0x474f81=>VisuMZ[_0x4b8cb7(0x140)]({},JSON['parse'](_0x474f81)));break;default:continue;}_0x4d4fdf[_0x465231]=_0x8c928a;}}return _0x4d4fdf;},(_0x3b6c77=>{const _0x55211f=_0x4462e2,_0x4fb970=_0x3b6c77[_0x55211f(0xde)];for(const _0x56e9d6 of dependencies){if(!Imported[_0x56e9d6]){alert(_0x55211f(0x21a)[_0x55211f(0x1f8)](_0x4fb970,_0x56e9d6)),SceneManager[_0x55211f(0x1a9)]();break;}}const _0x15ab63=_0x3b6c77[_0x55211f(0x18d)];if(_0x15ab63[_0x55211f(0xb7)](/\[Version[ ](.*?)\]/i)){const _0x1330b4=Number(RegExp['$1']);_0x1330b4!==VisuMZ[label][_0x55211f(0x117)]&&(alert(_0x55211f(0xb3)[_0x55211f(0x1f8)](_0x4fb970,_0x1330b4)),SceneManager[_0x55211f(0x1a9)]());}if(_0x15ab63[_0x55211f(0xb7)](/\[Tier[ ](\d+)\]/i)){const _0x4dc266=Number(RegExp['$1']);_0x4dc266<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4fb970,_0x4dc266,tier)),SceneManager['exit']()):tier=Math[_0x55211f(0x134)](_0x4dc266,tier);}VisuMZ[_0x55211f(0x140)](VisuMZ[label][_0x55211f(0x12c)],_0x3b6c77[_0x55211f(0x194)]);})(pluginData),PluginManager[_0x4462e2(0x1c1)](pluginData[_0x4462e2(0xde)],_0x4462e2(0x1fd),_0x5e720b=>{const _0x21555f=_0x4462e2;VisuMZ[_0x21555f(0x140)](_0x5e720b,_0x5e720b);const _0x398cd8=$gameActors[_0x21555f(0x1d9)](_0x5e720b[_0x21555f(0x1ee)]),_0x62fa03=_0x5e720b[_0x21555f(0x156)];if(_0x398cd8)while(_0x62fa03['length']>0x0){_0x398cd8['levelUpQuotes']()[_0x21555f(0xd8)](_0x62fa03[_0x21555f(0x22f)]());}}),PluginManager['registerCommand'](pluginData[_0x4462e2(0xde)],_0x4462e2(0x22a),_0x150dd5=>{const _0x135946=_0x4462e2;VisuMZ[_0x135946(0x140)](_0x150dd5,_0x150dd5);const _0x36b595=$gameActors[_0x135946(0x1d9)](_0x150dd5[_0x135946(0x1ee)]),_0x470166=_0x150dd5[_0x135946(0x156)];if(_0x36b595)while(_0x470166['length']>0x0){_0x36b595['newSkillQuotes']()[_0x135946(0xd8)](_0x470166[_0x135946(0x22f)]());}}),PluginManager[_0x4462e2(0x1c1)](pluginData[_0x4462e2(0xde)],'ActorQuotesLevelUpClear',_0x36fd14=>{const _0xa5c50c=_0x4462e2;VisuMZ[_0xa5c50c(0x140)](_0x36fd14,_0x36fd14);const _0x2ad00c=$gameActors[_0xa5c50c(0x1d9)](_0x36fd14['ActorID']);if(_0x2ad00c)while(_0x2ad00c['levelUpQuotes']()['length']>0x0){_0x2ad00c[_0xa5c50c(0xa6)]()[_0xa5c50c(0x22f)]();}}),PluginManager[_0x4462e2(0x1c1)](pluginData['name'],'ActorQuotesNewSkillClear',_0x5945f2=>{const _0x34a7a8=_0x4462e2;VisuMZ[_0x34a7a8(0x140)](_0x5945f2,_0x5945f2);const _0x57a50b=$gameActors[_0x34a7a8(0x1d9)](_0x5945f2['ActorID']);if(_0x57a50b)while(_0x57a50b[_0x34a7a8(0x215)]()[_0x34a7a8(0x220)]>0x0){_0x57a50b['newSkillQuotes']()[_0x34a7a8(0x22f)]();}}),PluginManager[_0x4462e2(0x1c1)](pluginData['name'],_0x4462e2(0x1a7),_0x2ecf21=>{const _0x1c0489=_0x4462e2;VisuMZ[_0x1c0489(0x140)](_0x2ecf21,_0x2ecf21),$gameSystem[_0x1c0489(0xdc)]()[_0x1c0489(0xa1)]=_0x2ecf21[_0x1c0489(0x110)];}),PluginManager[_0x4462e2(0x1c1)](pluginData['name'],_0x4462e2(0x11c),_0x51fccb=>{const _0x181e14=_0x4462e2;VisuMZ[_0x181e14(0x140)](_0x51fccb,_0x51fccb),$gameSystem['victoryAftermathSettings']()[_0x181e14(0x1dd)]=_0x51fccb[_0x181e14(0x110)];}),PluginManager['registerCommand'](pluginData[_0x4462e2(0xde)],_0x4462e2(0x17d),_0x344d38=>{const _0x4e57c1=_0x4462e2;VisuMZ[_0x4e57c1(0x140)](_0x344d38,_0x344d38),$gameSystem[_0x4e57c1(0xdc)]()[_0x4e57c1(0x11d)]=_0x344d38[_0x4e57c1(0x110)];}),TextManager[_0x4462e2(0x10f)]=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)][_0x4462e2(0x1e5)][_0x4462e2(0x1bf)],TextManager['victoryKeyOk']=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)][_0x4462e2(0x1e5)]['KeyOK'],TextManager[_0x4462e2(0x177)]=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)][_0x4462e2(0x1e5)][_0x4462e2(0x1ed)],TextManager['victoryDisplayLvFmt']=VisuMZ[_0x4462e2(0xdb)]['Settings'][_0x4462e2(0x1e5)][_0x4462e2(0x112)],TextManager[_0x4462e2(0x1bb)]=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)]['Vocab'][_0x4462e2(0xe5)],TextManager[_0x4462e2(0x115)]=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)][_0x4462e2(0x1e5)]['RewardItems'],TextManager[_0x4462e2(0x1a4)]=VisuMZ['VictoryAftermath'][_0x4462e2(0x12c)][_0x4462e2(0x1e5)]['Victory'],TextManager[_0x4462e2(0x207)]=VisuMZ['VictoryAftermath'][_0x4462e2(0x12c)]['Vocab'][_0x4462e2(0xcc)],TextManager['quoteLevelUp']=function(_0x3eb631){const _0xd3c922=_0x4462e2,_0x421cc9=VisuMZ['VictoryAftermath'][_0xd3c922(0x12c)][_0xd3c922(0xee)][_0xd3c922(0x216)];if(!_0x3eb631)return _0x421cc9[Math['randomInt'](_0x421cc9[_0xd3c922(0x220)])];if(!_0x3eb631[_0xd3c922(0x14a)]())return _0x421cc9[Math['randomInt'](_0x421cc9[_0xd3c922(0x220)])];const _0x558947=_0x3eb631[_0xd3c922(0xa6)]();if(_0x558947[_0xd3c922(0x220)]>0x0)return _0x558947[Math[_0xd3c922(0xec)](_0x558947[_0xd3c922(0x220)])];return _0x421cc9[Math[_0xd3c922(0xec)](_0x421cc9['length'])];},TextManager[_0x4462e2(0x1e0)]=function(_0x585d29){const _0x14927e=_0x4462e2,_0x7daa21=VisuMZ[_0x14927e(0xdb)][_0x14927e(0x12c)][_0x14927e(0xee)][_0x14927e(0xb6)];if(!_0x585d29)return _0x7daa21[Math['randomInt'](_0x7daa21[_0x14927e(0x220)])];if(!_0x585d29[_0x14927e(0x14a)]())return _0x7daa21[Math[_0x14927e(0xec)](_0x7daa21[_0x14927e(0x220)])];const _0x1e3f89=_0x585d29[_0x14927e(0x215)]();if(_0x1e3f89[_0x14927e(0x220)]>0x0)return _0x1e3f89[Math[_0x14927e(0xec)](_0x1e3f89[_0x14927e(0x220)])];return _0x7daa21[Math[_0x14927e(0xec)](_0x7daa21['length'])];},ColorManager[_0x4462e2(0xcf)]=function(_0x2875bf,_0x27c4e5){const _0x3ef81c=_0x4462e2;return _0x27c4e5=String(_0x27c4e5),this[_0x3ef81c(0x1fe)]=this[_0x3ef81c(0x1fe)]||{},_0x27c4e5[_0x3ef81c(0xb7)](/#(.*)/i)?this[_0x3ef81c(0x1fe)][_0x2875bf]=_0x3ef81c(0x1e2)['format'](String(RegExp['$1'])):this[_0x3ef81c(0x1fe)][_0x2875bf]=this[_0x3ef81c(0x100)](Number(_0x27c4e5)),this['_colorCache'][_0x2875bf];},ColorManager[_0x4462e2(0x1a0)]=function(_0x536764){const _0x5d921c=_0x4462e2;return _0x536764=String(_0x536764),_0x536764[_0x5d921c(0xb7)](/#(.*)/i)?'#%1'[_0x5d921c(0x1f8)](String(RegExp['$1'])):this[_0x5d921c(0x100)](Number(_0x536764));},ColorManager['victoryLevelUpColor']=function(){const _0x337e9d=_0x4462e2,_0x2f1b52=_0x337e9d(0x221);this['_colorCache']=this[_0x337e9d(0x1fe)]||{};if(this['_colorCache'][_0x2f1b52])return this[_0x337e9d(0x1fe)][_0x2f1b52];const _0x393f76=VisuMZ[_0x337e9d(0xdb)][_0x337e9d(0x12c)][_0x337e9d(0x1e5)][_0x337e9d(0xc2)];return this[_0x337e9d(0xcf)](_0x2f1b52,_0x393f76);},SoundManager[_0x4462e2(0x188)]=function(){const _0x1427b7=_0x4462e2;if(this[_0x1427b7(0x183)])return;if(!this[_0x1427b7(0x1c6)]){const _0x5e5e45=VisuMZ[_0x1427b7(0xdb)][_0x1427b7(0x12c)][_0x1427b7(0x1e5)];this['_victoryLevelUpSFX']={'name':_0x5e5e45[_0x1427b7(0x18f)]||'','volume':_0x5e5e45[_0x1427b7(0xef)]??0x5a,'pitch':_0x5e5e45['LvUpPitch']??0x64,'pan':_0x5e5e45[_0x1427b7(0x135)]??0x0};}this[_0x1427b7(0x1c6)][_0x1427b7(0xde)]!==''&&(AudioManager[_0x1427b7(0x133)](this['_victoryLevelUpSFX']),this[_0x1427b7(0x183)]=!![],setTimeout(this[_0x1427b7(0xdf)][_0x1427b7(0x1a2)](this),0xc8));},SoundManager['removeVictoryLevelUpBuffer']=function(){this['_victoryLevelUpBuffer']=![];},SoundManager[_0x4462e2(0x191)]=function(){const _0x404363=_0x4462e2;if(!this[_0x404363(0x199)]){const _0x1ae234=VisuMZ[_0x404363(0xdb)][_0x404363(0x12c)]['General'];if(_0x1ae234[_0x404363(0x1ef)]===undefined)_0x1ae234[_0x404363(0x1ef)]=0x5a;if(_0x1ae234[_0x404363(0x1f7)]===undefined)_0x1ae234[_0x404363(0x1f7)]=0x64;if(_0x1ae234[_0x404363(0x107)]===undefined)_0x1ae234['pan']=0x0;this[_0x404363(0x199)]={'name':_0x1ae234[_0x404363(0x1e1)]||'','volume':_0x1ae234[_0x404363(0x1ef)]||0x0,'pitch':_0x1ae234['pitch']||0x0,'pan':_0x1ae234[_0x404363(0x107)]||0x0};}this[_0x404363(0x199)][_0x404363(0xde)]!==''&&AudioManager['playBgm'](this[_0x404363(0x199)]);},BattleManager[_0x4462e2(0x101)]=VisuMZ['VictoryAftermath'][_0x4462e2(0x12c)][_0x4462e2(0x203)][_0x4462e2(0x21b)]||0x1,VisuMZ['VictoryAftermath'][_0x4462e2(0x16e)]=BattleManager[_0x4462e2(0x94)],BattleManager[_0x4462e2(0x94)]=function(){const _0x394881=_0x4462e2;VisuMZ[_0x394881(0xdb)][_0x394881(0x16e)]['call'](this),this['_victoryPhase']=![],this[_0x394881(0xbe)]=-0x1,this[_0x394881(0xa7)]=![];},VisuMZ['VictoryAftermath'][_0x4462e2(0x180)]=BattleManager[_0x4462e2(0xc8)],BattleManager[_0x4462e2(0xc8)]=function(){const _0x2ec812=_0x4462e2;return this[_0x2ec812(0x1f9)]()?!![]:VisuMZ['VictoryAftermath'][_0x2ec812(0x180)]['call'](this);},BattleManager[_0x4462e2(0x1f9)]=function(){const _0x336493=_0x4462e2;return this[_0x336493(0xf5)]==='battleEnd'&&this[_0x336493(0x201)];},BattleManager['processVictory']=function(){const _0x1376c4=_0x4462e2;this[_0x1376c4(0xed)](_0x1376c4(0x1af)),this['processPostBattleCommonEvents']('Victory'),this[_0x1376c4(0x12a)]();},BattleManager[_0x4462e2(0x12a)]=function(){const _0x53e432=_0x4462e2;this[_0x53e432(0x18a)](),this['processVictoryAftermathMusic'](),this[_0x53e432(0x222)](),this[_0x53e432(0x1b0)]();},BattleManager[_0x4462e2(0x18a)]=function(){const _0x391d9f=_0x4462e2;$gameParty[_0x391d9f(0xc4)](),$gameParty[_0x391d9f(0x157)]();},BattleManager[_0x4462e2(0x1bc)]=function(){const _0x2cf4b8=_0x4462e2;if(this['isBypassVictoryAftermathMusic']())return;this[_0x2cf4b8(0x1c0)](),SoundManager[_0x2cf4b8(0x191)]();},BattleManager[_0x4462e2(0x1b6)]=function(){const _0x48f043=_0x4462e2;return $gameSystem[_0x48f043(0xdc)]()[_0x48f043(0x1dd)]||$gameSystem[_0x48f043(0xdc)]()[_0x48f043(0x11d)];},BattleManager[_0x4462e2(0x222)]=function(){const _0x441878=_0x4462e2;this['makeTempActors'](),this[_0x441878(0x97)](),this['gainRewards']();},BattleManager['makeTempActors']=function(){const _0x1c77a5=_0x4462e2;this[_0x1c77a5(0x206)]=$gameParty[_0x1c77a5(0xf2)]()[_0x1c77a5(0x113)](_0x59bbee=>_0x59bbee[_0x1c77a5(0x1b4)]()),this[_0x1c77a5(0x126)]=JsonEx[_0x1c77a5(0x168)](this[_0x1c77a5(0x206)]);},BattleManager[_0x4462e2(0x1b0)]=function(){const _0x463711=_0x4462e2;this[_0x463711(0x12b)](),this[_0x463711(0xa4)](0x0),this[_0x463711(0x201)]=!![],this[_0x463711(0x14e)]()?this[_0x463711(0x21f)]():this[_0x463711(0x1e9)]();},BattleManager[_0x4462e2(0x12b)]=function(){const _0x430544=_0x4462e2,_0x3e9463=VisuMZ[_0x430544(0xdb)]['Settings']['General'];_0x3e9463[_0x430544(0x167)]===undefined&&(_0x3e9463[_0x430544(0x167)]=!![]),_0x3e9463[_0x430544(0x167)]===!![]&&(this[_0x430544(0xa7)]=this[_0x430544(0x106)]);},BattleManager[_0x4462e2(0x14e)]=function(){const _0x353030=_0x4462e2;if(this[_0x353030(0xa7)])return!![];return $gameSystem[_0x353030(0xdc)]()[_0x353030(0x11d)];},BattleManager['skipVictoryAftermathTransition']=function(){const _0x1fe4f0=_0x4462e2,_0x10b778=VisuMZ[_0x1fe4f0(0xdb)][_0x1fe4f0(0x12c)]['General'],_0x2acc28=SceneManager[_0x1fe4f0(0x1ce)];setTimeout(_0x2acc28[_0x1fe4f0(0x192)][_0x1fe4f0(0x1a2)](_0x2acc28),_0x10b778['ShowDelayMS']);},BattleManager['processVictoryAftermathTransition']=function(){const _0x4f230c=_0x4462e2,_0x4b4873=VisuMZ[_0x4f230c(0xdb)][_0x4f230c(0x12c)][_0x4f230c(0x203)],_0x59920d=SceneManager[_0x4f230c(0x1ce)];this[_0x4f230c(0x90)]=this[_0x4f230c(0x92)][_0x4f230c(0x1b1)]/(BattleManager[_0x4f230c(0x101)]||0x1),Window_StatusBase[_0x4f230c(0x132)][_0x4f230c(0xfa)](),setTimeout(_0x59920d[_0x4f230c(0xba)][_0x4f230c(0x1a2)](_0x59920d),_0x4b4873['HideDelayMS']),setTimeout(_0x59920d[_0x4f230c(0x1c4)][_0x4f230c(0x1a2)](_0x59920d),_0x4b4873[_0x4f230c(0x120)]);},BattleManager[_0x4462e2(0x128)]=function(){const _0x5982d1=_0x4462e2;for(;;){this[_0x5982d1(0xbe)]++;if(this[_0x5982d1(0xbe)]>=$gameParty[_0x5982d1(0xf6)]())return null;const _0x53cded=$gameParty[_0x5982d1(0xf2)]()[this['_victoryActorIndex']],_0x180873=this[_0x5982d1(0x126)][this[_0x5982d1(0xbe)]];if(_0x53cded[_0x5982d1(0xe2)]!==_0x180873[_0x5982d1(0xe2)])return _0x53cded;}return null;},VisuMZ[_0x4462e2(0xdb)]['Game_System_initialize']=Game_System[_0x4462e2(0x132)][_0x4462e2(0x1c9)],Game_System[_0x4462e2(0x132)][_0x4462e2(0x1c9)]=function(){const _0xf44256=_0x4462e2;VisuMZ[_0xf44256(0xdb)][_0xf44256(0xca)][_0xf44256(0xaa)](this),this[_0xf44256(0xd2)]();},Game_System[_0x4462e2(0x132)]['initVictoryAftermath']=function(){const _0x3b6ea2=_0x4462e2;this[_0x3b6ea2(0x1e6)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x4462e2(0x132)][_0x4462e2(0xdc)]=function(){const _0x3666e8=_0x4462e2;if(this[_0x3666e8(0x1e6)]===undefined)this['initVictoryAftermath']();return this[_0x3666e8(0x1e6)];},VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x232)]=Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x185)],Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x185)]=function(_0x2c0935){const _0x101b45=_0x4462e2;VisuMZ[_0x101b45(0xdb)][_0x101b45(0x232)]['call'](this,_0x2c0935),this[_0x101b45(0x210)]();},Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x210)]=function(){const _0x417578=_0x4462e2;this[_0x417578(0x17b)]=[],this[_0x417578(0x1ab)]=[];const _0x31d2f8=this[_0x417578(0x1d9)]()[_0x417578(0x1ec)];_0x31d2f8[_0x417578(0xb7)](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this['_victoryAftermathLevelUpQuotes']=String(RegExp['$1'])['split'](/<NEW QUOTE>[\r\n]+/i)),_0x31d2f8[_0x417578(0xb7)](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)&&(this[_0x417578(0x1ab)]=String(RegExp['$1'])[_0x417578(0x1cc)](/<NEW QUOTE>[\r\n]+/i));},Game_Actor['prototype'][_0x4462e2(0xa6)]=function(){const _0x497f91=_0x4462e2;if(this['_victoryAftermathLevelUpQuotes']===undefined)this['setupVictoryAftermathQuotes']();return this[_0x497f91(0x17b)];},Game_Actor[_0x4462e2(0x132)]['newSkillQuotes']=function(){const _0x2e1a88=_0x4462e2;if(this[_0x2e1a88(0x1ab)]===undefined)this['setupVictoryAftermathQuotes']();return this['_victoryAftermathNewSkillQuotes'];},Game_Actor[_0x4462e2(0x132)][_0x4462e2(0xb8)]=function(){const _0x47da84=_0x4462e2;if(this[_0x47da84(0xb5)]())return 0x1;const _0xbc208e=this[_0x47da84(0x187)]()-this[_0x47da84(0x15c)](),_0x209e73=this[_0x47da84(0x1da)]()-this[_0x47da84(0x15c)]();return(_0x209e73/_0xbc208e)[_0x47da84(0xa9)](0x0,0x1);},VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x1a3)]=Game_Actor[_0x4462e2(0x132)]['shouldDisplayLevelUp'],Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x18e)]=function(){const _0x239083=_0x4462e2;return SceneManager[_0x239083(0xc5)]()?![]:VisuMZ[_0x239083(0xdb)][_0x239083(0x1a3)]['call'](this);},Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x1b4)]=function(){const _0x38a6e4=_0x4462e2,_0x5945bd=JsonEx[_0x38a6e4(0x168)](this);return _0x5945bd[_0x38a6e4(0x16c)]=!![],_0x5945bd;},VisuMZ['VictoryAftermath'][_0x4462e2(0xfc)]=Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x14d)],Game_Actor['prototype'][_0x4462e2(0x14d)]=function(){const _0x11f92b=_0x4462e2;return this[_0x11f92b(0x16c)]?!![]:VisuMZ[_0x11f92b(0xdb)]['Game_Actor_isBattleMember'][_0x11f92b(0xaa)](this);},VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x200)]=Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x157)],Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x157)]=function(){const _0x2c76a0=_0x4462e2;this['isBypassVictoryAftermathMotion']()?this[_0x2c76a0(0x184)]('done'):VisuMZ['VictoryAftermath'][_0x2c76a0(0x200)][_0x2c76a0(0xaa)](this);},Game_Actor['prototype'][_0x4462e2(0x17e)]=function(){const _0x205dda=_0x4462e2;return $gameSystem[_0x205dda(0xdc)]()[_0x205dda(0xa1)]||$gameSystem[_0x205dda(0xdc)]()[_0x205dda(0x11d)];},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0xba)]=function(){const _0x24f835=_0x4462e2;if(this['_spriteset'][_0x24f835(0xd5)]())return setTimeout(this[_0x24f835(0xba)]['bind'](this),0x7d0);if(!SceneManager[_0x24f835(0xc5)]())return;this['setVisibleUI'](![]),this[_0x24f835(0x13d)](),this[_0x24f835(0x15b)](),this[_0x24f835(0x1ba)]['y']=Graphics['height']*0xa;},Scene_Battle['prototype'][_0x4462e2(0x1c4)]=function(){const _0x3823f1=_0x4462e2;if(this[_0x3823f1(0x1bd)][_0x3823f1(0xd5)]())return setTimeout(this['createVictoryAftermathWindows'][_0x3823f1(0x1a2)](this),0x7d0);this[_0x3823f1(0x152)]=[],this['createVictorySteps'](),this[_0x3823f1(0x9f)](),this[_0x3823f1(0x212)]();},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x127)]=function(){const _0x4caf4c=_0x4462e2;this[_0x4caf4c(0x114)]=[],this[_0x4caf4c(0x181)](),this[_0x4caf4c(0x8a)]();},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x181)]=function(){const _0x4543bc=_0x4462e2;this[_0x4543bc(0x114)]['push']('rewards');},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x8a)]=function(){const _0x59c48b=_0x4462e2;if(!this['isVictoryLevelUpPhaseEnabled']())return;for(const _0xfce7aa of $gameParty[_0x59c48b(0xf2)]()){if(!_0xfce7aa)continue;const _0x410659=BattleManager[_0x59c48b(0x206)][_0xfce7aa[_0x59c48b(0x1df)]()];_0xfce7aa[_0x59c48b(0xe2)]>_0x410659[_0x59c48b(0xe2)]&&this[_0x59c48b(0xe9)](_0xfce7aa);}},Scene_Battle[_0x4462e2(0x132)]['onVictoryStepLevelUpMember']=function(_0x10a9f7){const _0x40015b=_0x4462e2;Imported['VisuMZ_1_MainMenuCore']&&Window_VictoryLevelUp[_0x40015b(0x223)]&&ImageManager[_0x40015b(0x217)](_0x10a9f7[_0x40015b(0xd4)]()),this[_0x40015b(0x114)][_0x40015b(0xd8)]('levelups');},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0xce)]=function(){const _0x38faed=_0x4462e2;return VisuMZ[_0x38faed(0xdb)][_0x38faed(0x12c)][_0x38faed(0xee)][_0x38faed(0x1d7)];},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x212)]=function(){const _0x42b5bf=_0x4462e2;this[_0x42b5bf(0x1c2)]=this['_victorySteps'][_0x42b5bf(0x22f)]()||'',this['processVictoryStep']();},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x1b5)]=function(){const _0x5f021f=_0x4462e2;switch(this[_0x5f021f(0x1c2)][_0x5f021f(0x1de)]()[_0x5f021f(0x1c3)]()){case _0x5f021f(0xab):this[_0x5f021f(0x9c)](),this['_victoryContinueWindow'][_0x5f021f(0xc6)](BattleManager[_0x5f021f(0x101)]);break;case'levelups':this[_0x5f021f(0xbb)](),this['setupVictoryLevelUpNextActor'](),this['_victoryContinueWindow'][_0x5f021f(0xc6)](0x0);break;default:this[_0x5f021f(0x192)]();break;}this[_0x5f021f(0x169)](this[_0x5f021f(0x231)]);},Scene_Battle[_0x4462e2(0x132)]['victoryContinueMessageWindowRect']=function(){const _0x1eac35=_0x4462e2,_0x5c321e=Window_Base[_0x1eac35(0x132)][_0x1eac35(0x196)](),_0x4fa8d2=Math[_0x1eac35(0x1dc)](Graphics[_0x1eac35(0x8e)]/0x2)-0x64,_0xb5d813=Math[_0x1eac35(0x1dc)](Graphics['height']-_0x5c321e*1.25),_0x42448e=Math[_0x1eac35(0x1dc)](Graphics[_0x1eac35(0x8e)]/0x2),_0x4b5007=_0x5c321e;return new Rectangle(_0x4fa8d2,_0xb5d813,_0x42448e,_0x4b5007);},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x9d)]=function(){const _0x54c7ef=_0x4462e2,_0x356dc3=0x0,_0x2d1b8b=0x0,_0x4cc8f2=Graphics[_0x54c7ef(0x8e)],_0x1b4814=Graphics[_0x54c7ef(0x159)];return new Rectangle(_0x356dc3,_0x2d1b8b,_0x4cc8f2,_0x1b4814);},Scene_Battle['prototype'][_0x4462e2(0x9f)]=function(){const _0x178e15=_0x4462e2;if(this[_0x178e15(0x231)])return;const _0x16424b=this[_0x178e15(0x91)](),_0x381d3e=new Window_VictoryContinueMessage(_0x16424b);this[_0x178e15(0x169)](_0x381d3e),this['_victoryWindows'][_0x178e15(0xd8)](_0x381d3e),this[_0x178e15(0x231)]=_0x381d3e;},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x9c)]=function(){const _0x4821d1=_0x4462e2;if(this[_0x4821d1(0x17a)])return;const _0x2e4d8b=this[_0x4821d1(0x9d)](),_0x410998=new Window_VictoryRewards(_0x2e4d8b);this[_0x4821d1(0x169)](_0x410998),this[_0x4821d1(0x152)][_0x4821d1(0xd8)](_0x410998),this[_0x4821d1(0x17a)]=_0x410998;},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0xbb)]=function(){const _0x1c920d=_0x4462e2;if(this[_0x1c920d(0x198)])return;const _0x531588=this['victoryFullScreenWindowRect'](),_0x16fda9=new Window_VictoryLevelUp(_0x531588);this[_0x1c920d(0x169)](_0x16fda9),this['_victoryWindows'][_0x1c920d(0xd8)](_0x16fda9),this[_0x1c920d(0x198)]=_0x16fda9;},Scene_Battle['prototype']['setupVictoryLevelUpNextActor']=function(){const _0x41e6c1=_0x4462e2,_0x302f03=BattleManager['nextVictoryLevelUpActor']();this[_0x41e6c1(0x198)]['setActor'](_0x302f03);},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x192)]=function(){const _0x2dff39=_0x4462e2;BattleManager['replayBgmAndBgs'](),BattleManager[_0x2dff39(0x201)]=![];};Imported[_0x4462e2(0x1ff)]&&(VisuMZ[_0x4462e2(0xdb)]['Scene_Battle_allowUpdateBattleAniSpeed']=Scene_Battle[_0x4462e2(0x132)]['allowUpdateBattleAniSpeed'],Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x13b)]=function(){const _0x40d9da=_0x4462e2;if(BattleManager[_0x40d9da(0x1f9)]())return![];return VisuMZ['VictoryAftermath'][_0x40d9da(0xdd)]['call'](this);});;Scene_Battle[_0x4462e2(0x132)]['isVictoryContinueReady']=function(){const _0x5675b2=_0x4462e2;return this[_0x5675b2(0x231)]&&this[_0x5675b2(0x231)][_0x5675b2(0x1cf)]();},VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x116)]=Scene_Battle['prototype'][_0x4462e2(0x103)],Scene_Battle['prototype'][_0x4462e2(0x103)]=function(){const _0x57cb16=_0x4462e2;VisuMZ[_0x57cb16(0xdb)][_0x57cb16(0x116)][_0x57cb16(0xaa)](this),this[_0x57cb16(0x121)]();},Scene_Battle[_0x4462e2(0x132)][_0x4462e2(0x121)]=function(){const _0x123e5f=_0x4462e2;if(!BattleManager[_0x123e5f(0x1f9)]())return;if(!this[_0x123e5f(0x142)]())return;(Input[_0x123e5f(0x11f)]('ok')||Input['isRepeated']('cancel')||TouchInput[_0x123e5f(0x11f)]())&&(Input[_0x123e5f(0xe4)](),TouchInput[_0x123e5f(0xe4)](),this[_0x123e5f(0x212)]());},Sprite_Enemy[_0x4462e2(0x132)][_0x4462e2(0xd5)]=function(){const _0xe5c940=_0x4462e2,_0x32303e=VisuMZ[_0xe5c940(0xdb)]['Settings']['General'];if(this[_0xe5c940(0x15d)]===_0xe5c940(0x19e)){if(_0x32303e[_0xe5c940(0x211)]!==undefined)return _0x32303e[_0xe5c940(0x211)];}else{if(this[_0xe5c940(0x15d)]===_0xe5c940(0x1cb)){if(_0x32303e[_0xe5c940(0x171)]!==undefined)return _0x32303e[_0xe5c940(0x171)];}}return[_0xe5c940(0x19e),_0xe5c940(0x1cb)][_0xe5c940(0x1f0)]();},Sprite_Battler[_0x4462e2(0x132)][_0x4462e2(0xd5)]=function(){return![];},Spriteset_Battle[_0x4462e2(0x132)]['isCollapsing']=function(){const _0x11cc56=_0x4462e2;return this[_0x11cc56(0x1e7)]()[_0x11cc56(0x105)](_0x564570=>_0x564570[_0x11cc56(0xd5)]());};function Sprite_VictoryGauge(){this['initialize'](...arguments);}Sprite_VictoryGauge['prototype']=Object[_0x4462e2(0xff)](Sprite[_0x4462e2(0x132)]),Sprite_VictoryGauge['prototype'][_0x4462e2(0xc0)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x4462e2(0x132)]['initialize']=function(_0x597e61,_0x2c09cf,_0x42336f){const _0x1c9b76=_0x4462e2;this[_0x1c9b76(0xf9)]=_0x597e61,this[_0x1c9b76(0x21d)]=_0x2c09cf,this[_0x1c9b76(0x1d1)]=_0x42336f,Sprite[_0x1c9b76(0x132)]['initialize']['call'](this),this[_0x1c9b76(0x94)](),this['createBitmap'](),this[_0x1c9b76(0x8c)](),this[_0x1c9b76(0x95)]();},Sprite_VictoryGauge['prototype'][_0x4462e2(0x94)]=function(){const _0x43fe96=_0x4462e2;this[_0x43fe96(0x226)]=BattleManager['_victoryUpdateDuration'],this[_0x43fe96(0x17f)]=this[_0x43fe96(0x1d9)]()[_0x43fe96(0xe2)],this['_showLevelUp']=![];},Sprite_VictoryGauge['prototype'][_0x4462e2(0x1ae)]=function(){const _0x4f3dfc=_0x4462e2;this[_0x4f3dfc(0x12e)]=new Bitmap(this[_0x4f3dfc(0x1d1)],this[_0x4f3dfc(0x196)]()*0x2);},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x196)]=function(){const _0x3aed4b=_0x4462e2;return Window_Base[_0x3aed4b(0x132)]['lineHeight']();},Sprite_VictoryGauge[_0x4462e2(0x132)]['actor']=function(){const _0x2c8235=_0x4462e2;return BattleManager[_0x2c8235(0x206)][this[_0x2c8235(0xf9)]];},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x103)]=function(){const _0x556df5=_0x4462e2;Sprite[_0x556df5(0x132)]['update'][_0x556df5(0xaa)](this),this[_0x556df5(0x22d)](),this[_0x556df5(0x95)]();},Sprite_VictoryGauge['prototype']['updateExpGain']=function(){const _0x1a39ee=_0x4462e2;if(this[_0x1a39ee(0x226)]<=0x0)return;const _0x335cde=this[_0x1a39ee(0x1d9)]();this['_duration']--;this[_0x1a39ee(0x1f5)]()&&(this[_0x1a39ee(0x226)]=0x0);if(this[_0x1a39ee(0x226)]<=0x0){const _0x4d86c8=$gameActors[_0x1a39ee(0x1d9)](_0x335cde[_0x1a39ee(0x1a8)]);_0x335cde[_0x1a39ee(0x182)](_0x4d86c8[_0x1a39ee(0x1da)](),![]);}else _0x335cde[_0x1a39ee(0x147)](BattleManager['_tempActorExpGain']);this[_0x1a39ee(0x17f)]!==_0x335cde['level']&&(this[_0x1a39ee(0x17f)]=_0x335cde[_0x1a39ee(0xe2)],this['_showLevelUp']=!![],SoundManager['playVictoryLevelUpSFX']()),this[_0x1a39ee(0x8c)]();},Game_Actor[_0x4462e2(0x132)][_0x4462e2(0x147)]=function(_0x1fe1ae){const _0x2d3280=_0x4462e2,_0x28d7e3=this[_0x2d3280(0x1da)]()+_0x1fe1ae*this['finalExpRate']();this[_0x2d3280(0x182)](_0x28d7e3,this[_0x2d3280(0x18e)]());},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x1f5)]=function(){const _0x505bab=_0x4462e2;return SceneManager[_0x505bab(0x1ce)][_0x505bab(0x142)]();},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x95)]=function(){const _0x2542fa=_0x4462e2;this[_0x2542fa(0xd0)]=this[_0x2542fa(0x21d)][_0x2542fa(0xb9)];},Sprite_VictoryGauge[_0x4462e2(0x132)]['refresh']=function(){const _0x3dc279=_0x4462e2;this[_0x3dc279(0x12e)][_0x3dc279(0xe4)](),this[_0x3dc279(0xbd)](),this[_0x3dc279(0x19f)](),this[_0x3dc279(0x218)](),this[_0x3dc279(0x136)](),this[_0x3dc279(0x11a)](),this['drawExpValues']();},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0xbd)]=function(){const _0x4378d1=_0x4462e2;this['bitmap'][_0x4378d1(0x172)]=$gameSystem[_0x4378d1(0xf4)](),this[_0x4378d1(0x12e)][_0x4378d1(0xf3)]=$gameSystem['mainFontSize'](),this[_0x4378d1(0x12e)]['textColor']=ColorManager[_0x4378d1(0x1b9)]();},Sprite_VictoryGauge['prototype']['drawActorName']=function(){const _0x2da16d=_0x4462e2;this[_0x2da16d(0xbd)]();const _0x5707ca=this['lineHeight'](),_0x287437=Math[_0x2da16d(0x1dc)](_0x5707ca/0x2),_0x42a710=0x0,_0x123351=this[_0x2da16d(0x12e)][_0x2da16d(0x8e)]-_0x5707ca,_0xda5ad0=_0x2da16d(0x1c5),_0x2ccb1f=this[_0x2da16d(0x1d9)]()[_0x2da16d(0xde)]();this[_0x2da16d(0x12e)][_0x2da16d(0x131)](_0x2ccb1f,_0x287437,_0x42a710,_0x123351,_0x5707ca,_0xda5ad0);},Sprite_VictoryGauge[_0x4462e2(0x132)]['drawActorLevel']=function(){const _0x28627e=_0x4462e2;this[_0x28627e(0xbd)]();const _0x18c718=this[_0x28627e(0x196)](),_0x10f639=Math['round'](_0x18c718/0x2),_0x11316b=0x0,_0x23ba39=this[_0x28627e(0x12e)][_0x28627e(0x8e)]-_0x18c718,_0x2e2a1e=this['getAdditionalRewardsText']()===''?'right':_0x28627e(0x155),_0x49f990=TextManager[_0x28627e(0x13c)]['format'](this[_0x28627e(0x1d9)]()[_0x28627e(0xe2)]);this[_0x28627e(0xd1)]&&(this[_0x28627e(0x12e)][_0x28627e(0x100)]=ColorManager[_0x28627e(0xe3)]()),this[_0x28627e(0x12e)][_0x28627e(0x131)](_0x49f990,_0x10f639,_0x11316b,_0x23ba39,_0x18c718,_0x2e2a1e);},Sprite_VictoryGauge['prototype'][_0x4462e2(0x151)]=function(){const _0x464554=_0x4462e2,_0x5f1d54=$gameParty[_0x464554(0x1e4)]()[this[_0x464554(0xf9)]];if(!_0x5f1d54)return'';if(Imported['VisuMZ_X_Template']&&VisuMZ[_0x464554(0x12d)]['Settings'][_0x464554(0x153)][_0x464554(0x144)])return VisuMZ[_0x464554(0x12d)][_0x464554(0x12c)]['JobPoints'][_0x464554(0x166)][_0x464554(0x1f8)](_0x5f1d54[_0x464554(0x16d)](),TextManager[_0x464554(0x108)],TextManager['jobPointsFull']);if(Imported['VisuMZ_2_ClassChangeSystem']){const _0x13b04b=VisuMZ[_0x464554(0x179)]['Settings'];if(_0x13b04b['ClassPoints']['AftermathActorDisplay'])return _0x13b04b[_0x464554(0x21c)][_0x464554(0x166)][_0x464554(0x1f8)](_0x5f1d54[_0x464554(0x1b7)](),TextManager[_0x464554(0x104)],TextManager[_0x464554(0x229)]);if(_0x13b04b[_0x464554(0x153)][_0x464554(0x144)])return _0x13b04b[_0x464554(0x153)][_0x464554(0x166)][_0x464554(0x1f8)](_0x5f1d54[_0x464554(0x16d)](),TextManager[_0x464554(0x108)],TextManager['jobPointsFull']);}if(Imported[_0x464554(0x148)]){const _0x2759ff=VisuMZ[_0x464554(0xe7)][_0x464554(0x12c)];if(_0x2759ff[_0x464554(0x14f)][_0x464554(0x144)])return _0x2759ff[_0x464554(0x14f)][_0x464554(0x166)][_0x464554(0x1f8)](_0x5f1d54['earnedAbilityPoints'](),TextManager['abilityPointsAbbr'],TextManager['abilityPointsFull']);if(_0x2759ff[_0x464554(0xe8)][_0x464554(0x144)])return _0x2759ff[_0x464554(0xe8)][_0x464554(0x166)][_0x464554(0x1f8)](_0x5f1d54['earnedSkillPoints'](),TextManager['skillPointsAbbr'],TextManager[_0x464554(0xe0)]);}return'';},Sprite_VictoryGauge['prototype'][_0x4462e2(0x136)]=function(){const _0x3de62d=_0x4462e2;this[_0x3de62d(0xbd)]();const _0x3732d1=this[_0x3de62d(0x196)](),_0x3ba420=Math[_0x3de62d(0x1dc)](_0x3732d1/0x2),_0x4cc700=0x0,_0x2228f8=this[_0x3de62d(0x12e)][_0x3de62d(0x8e)]-_0x3732d1,_0xcedd17=_0x3de62d(0xf1);let _0x33120=this['getAdditionalRewardsText']();this[_0x3de62d(0x12e)]['drawText'](_0x33120,_0x3ba420,_0x4cc700,_0x2228f8,_0x3732d1,_0xcedd17);},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x11a)]=function(){const _0xb0427a=_0x4462e2,_0x27efad=this['lineHeight'](),_0x29f697=this[_0xb0427a(0x12e)][_0xb0427a(0x8e)]-_0x27efad,_0x17c68c=Sprite_Gauge['prototype'][_0xb0427a(0x214)](),_0x303bef=Math[_0xb0427a(0x1dc)](_0x27efad/0x2),_0x519574=_0x27efad*0x2-_0x17c68c-0x2,_0x48c68a=Math[_0xb0427a(0xb1)]((_0x29f697-0x2)*this[_0xb0427a(0x1d9)]()[_0xb0427a(0xb8)]()),_0x1b5aac=_0x17c68c-0x2,_0x3af31d=this[_0xb0427a(0x14c)](),_0x3acd80=this['gaugeColor1'](),_0x2da658=this[_0xb0427a(0x17c)]();this[_0xb0427a(0x12e)][_0xb0427a(0x22e)](_0x303bef,_0x519574,_0x29f697,_0x17c68c,_0x3af31d),this[_0xb0427a(0x12e)][_0xb0427a(0x163)](_0x303bef+0x1,_0x519574+0x1,_0x48c68a,_0x1b5aac,_0x3acd80,_0x2da658);},Sprite_VictoryGauge['prototype'][_0x4462e2(0x14c)]=function(){const _0x3f7620=_0x4462e2;return ColorManager[_0x3f7620(0x14c)]();},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0xbc)]=function(){const _0x30f0bf=_0x4462e2;return this[_0x30f0bf(0x1d9)]()[_0x30f0bf(0xb5)]()?Imported[_0x30f0bf(0x19c)]?ColorManager[_0x30f0bf(0x178)]():ColorManager[_0x30f0bf(0x100)](0xe):Imported[_0x30f0bf(0x19c)]?ColorManager[_0x30f0bf(0xf8)]():ColorManager[_0x30f0bf(0x100)](0x1e);},Sprite_VictoryGauge[_0x4462e2(0x132)][_0x4462e2(0x17c)]=function(){const _0xa8fe53=_0x4462e2;return this['actor']()[_0xa8fe53(0xb5)]()?Imported[_0xa8fe53(0x19c)]?ColorManager[_0xa8fe53(0x158)]():ColorManager[_0xa8fe53(0x100)](0x6):Imported[_0xa8fe53(0x19c)]?ColorManager['expGaugeColor2']():ColorManager[_0xa8fe53(0x100)](0x1f);},Sprite_VictoryGauge['prototype'][_0x4462e2(0x1e3)]=function(){const _0x5b7fd1=_0x4462e2;this[_0x5b7fd1(0xbd)]();const _0x4a66fc=this[_0x5b7fd1(0x196)](),_0x22f69c=_0x4a66fc,_0x579b24=_0x4a66fc;let _0x38b762=this['bitmap']['width']-_0x4a66fc*0x2;const _0x22fb00=this['actor']();let _0xe8194e=Math[_0x5b7fd1(0x1dc)](_0x22fb00[_0x5b7fd1(0x1da)]()-_0x22fb00[_0x5b7fd1(0x15c)]()),_0x16189f='/'+Math[_0x5b7fd1(0x1dc)](_0x22fb00['nextLevelExp']()-_0x22fb00[_0x5b7fd1(0x15c)]());Imported[_0x5b7fd1(0x19c)]&&VisuMZ[_0x5b7fd1(0x20c)][_0x5b7fd1(0x12c)][_0x5b7fd1(0x1f1)][_0x5b7fd1(0x10b)]&&(_0xe8194e=VisuMZ[_0x5b7fd1(0x15e)](_0xe8194e),_0x16189f=VisuMZ['GroupDigits'](_0x16189f));this['_showLevelUp']?(this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x100)]=ColorManager[_0x5b7fd1(0xcd)](),this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x131)](TextManager[_0x5b7fd1(0x1bb)],_0x22f69c,_0x579b24,_0x38b762,_0x4a66fc,_0x5b7fd1(0x1c5))):this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x131)](TextManager[_0x5b7fd1(0x1b1)],_0x22f69c,_0x579b24,_0x38b762,_0x4a66fc,_0x5b7fd1(0x1c5));this['resetFontSettings']();if(_0x22fb00[_0x5b7fd1(0xb5)]()){this['bitmap'][_0x5b7fd1(0x131)](_0x5b7fd1(0x122),_0x22f69c,_0x579b24,_0x38b762,_0x4a66fc,_0x5b7fd1(0xf1));return;}this[_0x5b7fd1(0x12e)][_0x5b7fd1(0xf3)]-=0x8,this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x100)]=ColorManager['textColor'](0x8),this['bitmap'][_0x5b7fd1(0x131)](_0x16189f,_0x22f69c,_0x579b24,_0x38b762,_0x4a66fc,_0x5b7fd1(0xf1)),_0x38b762-=this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x143)](_0x16189f),this[_0x5b7fd1(0xbd)](),this[_0x5b7fd1(0x12e)][_0x5b7fd1(0x131)](_0xe8194e,_0x22f69c,_0x579b24,_0x38b762,_0x4a66fc,_0x5b7fd1(0xf1));};function Window_VictoryContinueMessage(){const _0x5aec44=_0x4462e2;this[_0x5aec44(0x1c9)](...arguments);}Window_VictoryContinueMessage[_0x4462e2(0x132)]=Object[_0x4462e2(0xff)](Window_Base[_0x4462e2(0x132)]),Window_VictoryContinueMessage[_0x4462e2(0x132)]['constructor']=Window_VictoryContinueMessage,Window_VictoryContinueMessage['prototype']['initialize']=function(_0x32ef07){const _0x199134=_0x4462e2;Window_Base[_0x199134(0x132)][_0x199134(0x1c9)][_0x199134(0xaa)](this,_0x32ef07),this[_0x199134(0xfe)](0x2),this[_0x199134(0x8c)]();},Window_VictoryContinueMessage[_0x4462e2(0x132)][_0x4462e2(0xc6)]=function(_0x52a6a8){const _0x2c95e2=_0x4462e2;this[_0x2c95e2(0x1a5)]=_0x52a6a8,this['contentsOpacity']=0x0;},Window_VictoryContinueMessage[_0x4462e2(0x132)]['updatePadding']=function(){const _0x3120f4=_0x4462e2;this[_0x3120f4(0x149)]=0x0;},Window_VictoryContinueMessage[_0x4462e2(0x132)]['update']=function(){const _0x4b7618=_0x4462e2;Window_Base[_0x4b7618(0x132)][_0x4b7618(0x103)][_0x4b7618(0xaa)](this),this[_0x4b7618(0x14b)]();},Window_VictoryContinueMessage[_0x4462e2(0x132)][_0x4462e2(0x14b)]=function(){const _0x490fde=_0x4462e2;this[_0x490fde(0x1a5)]>0x0&&this[_0x490fde(0x1f5)]()&&(this[_0x490fde(0x1a5)]=0x0,Input['clear'](),TouchInput[_0x490fde(0xe4)]());if(this['_delayDuration']-->0x0)return;this[_0x490fde(0xb9)]+=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryContinueMessage['prototype'][_0x4462e2(0x1f5)]=function(){const _0x255a1b=_0x4462e2;return Input[_0x255a1b(0xc3)]('ok')||Input[_0x255a1b(0xc3)](_0x255a1b(0x124))||TouchInput[_0x255a1b(0xc3)]();},Window_VictoryContinueMessage['prototype']['refresh']=function(){const _0x1eccc5=_0x4462e2;this[_0x1eccc5(0x176)][_0x1eccc5(0xe4)]();const _0x48ee2f=TextManager['victoryContinueFmt'];let _0x37bcb5=TextManager['victoryKeyOk'],_0x417d9b=TextManager[_0x1eccc5(0x177)];Imported[_0x1eccc5(0x19c)]&&(_0x37bcb5=TextManager[_0x1eccc5(0x173)]('ok'),_0x417d9b=TextManager['getInputButtonString'](_0x1eccc5(0x124)));const _0x513f2d=_0x48ee2f['format'](_0x37bcb5,_0x417d9b),_0x188613=this[_0x1eccc5(0x1e8)](_0x513f2d)['width'],_0x30fd55=Math[_0x1eccc5(0x1dc)]((this[_0x1eccc5(0x205)]-_0x188613)/0x2);this['drawTextEx'](_0x513f2d,_0x30fd55,0x0,_0x188613);},Window_VictoryContinueMessage['prototype']['isContinueReady']=function(){return this['_delayDuration']<=0x0;};function Window_VictoryRewards(){const _0x447ab2=_0x4462e2;this[_0x447ab2(0x1c9)](...arguments);}Window_VictoryRewards['_opacitySpeed']=VisuMZ[_0x4462e2(0xdb)][_0x4462e2(0x12c)][_0x4462e2(0x203)][_0x4462e2(0xad)],Window_VictoryRewards[_0x4462e2(0x132)]=Object[_0x4462e2(0xff)](Window_StatusBase[_0x4462e2(0x132)]),Window_VictoryRewards['prototype'][_0x4462e2(0xc0)]=Window_VictoryRewards,Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x1c9)]=function(_0x5766f9){const _0x12847d=_0x4462e2;Window_StatusBase['prototype']['initialize'][_0x12847d(0xaa)](this,_0x5766f9),this[_0x12847d(0xfe)](0x2),this[_0x12847d(0xb9)]=0x0,this[_0x12847d(0x8c)]();},Window_VictoryRewards[_0x4462e2(0x132)]['updatePadding']=function(){const _0x225d97=_0x4462e2;this[_0x225d97(0x149)]=0x0;},Window_VictoryRewards['prototype'][_0x4462e2(0x103)]=function(){const _0x9157bd=_0x4462e2;Window_StatusBase['prototype']['update']['call'](this),this[_0x9157bd(0x14b)]();},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x14b)]=function(){const _0x577f97=_0x4462e2;SceneManager['_scene'][_0x577f97(0x1c2)]===_0x577f97(0xab)?this[_0x577f97(0xb9)]+=Window_VictoryRewards[_0x577f97(0x1d8)]:this['contentsOpacity']-=Window_VictoryRewards[_0x577f97(0x1d8)];},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0xe6)]=function(){const _0x1734c6=_0x4462e2;return VisuMZ[_0x1734c6(0xdb)][_0x1734c6(0x12c)][_0x1734c6(0x203)][_0x1734c6(0x202)];},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x8c)]=function(){const _0x1a8fc5=_0x4462e2;Window_StatusBase[_0x1a8fc5(0x132)][_0x1a8fc5(0x8c)][_0x1a8fc5(0xaa)](this),this[_0x1a8fc5(0x176)][_0x1a8fc5(0xe4)](),this[_0x1a8fc5(0xbd)](),this['drawBackgroundElements'](),this[_0x1a8fc5(0xd7)](),this[_0x1a8fc5(0x20b)](),this[_0x1a8fc5(0x161)](),this[_0x1a8fc5(0x1b2)]();},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x1aa)]=function(){const _0x438042=_0x4462e2,_0x24a4bb=this[_0x438042(0x196)](),_0x38545c=0x0,_0x159215=_0x24a4bb*2.5,_0x247e38=_0x438042(0x1fc),_0x17fece=_0x438042(0x162),_0x14a62a=ColorManager[_0x438042(0x1b9)]();this[_0x438042(0x176)][_0x438042(0x163)](_0x38545c,_0x159215,this[_0x438042(0x8e)],this['height']-_0x159215-_0x24a4bb*1.5,_0x247e38,_0x17fece),this[_0x438042(0x176)][_0x438042(0x22e)](0x0,_0x159215-0x1,this[_0x438042(0x8e)],0x2,_0x14a62a),this[_0x438042(0x176)][_0x438042(0x22e)](0x0,this[_0x438042(0x159)]-_0x24a4bb*1.5-0x1,this['width'],0x2,_0x14a62a);const _0x418aed=this[_0x438042(0xe6)](),_0x1d67b0=_0x418aed?Math['round'](this['width']/0x2+0x28):0x64,_0x257edc=_0x159215-_0x24a4bb*0.75,_0x81017f=TextManager[_0x438042(0x1a4)];this[_0x438042(0x1be)](),this['makeFontBigger'](),this[_0x438042(0x131)](_0x81017f,_0x1d67b0,_0x257edc,this[_0x438042(0x8e)]);},Window_VictoryRewards[_0x4462e2(0x19d)]=VisuMZ['VictoryAftermath'][_0x4462e2(0x12c)][_0x4462e2(0xd3)],Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0xd7)]=function(){const _0x5b6235=_0x4462e2;this[_0x5b6235(0xbd)]();const _0x9197bf=this[_0x5b6235(0xe6)](),_0x327e9c=this[_0x5b6235(0x196)](),_0x92443b=Math[_0x5b6235(0xb1)](_0x327e9c/0x2),_0x34df63=_0x9197bf?Math[_0x5b6235(0x1dc)](this['width']/0x2+0x28):0x64,_0x5a5bab=Math[_0x5b6235(0x1dc)](_0x327e9c*3.5),_0x2d3075=Math[_0x5b6235(0x1dc)](this['width']/0x2-0x8c),_0x5466d9=_0x2d3075-_0x92443b-0x50;let _0x1f8329=_0x5a5bab;for(const _0xdeaa9 of Window_VictoryRewards['_rewardSets']){if(!_0xdeaa9[_0x5b6235(0x98)]())continue;this[_0x5b6235(0x118)](_0x34df63,_0x1f8329,_0x2d3075),this[_0x5b6235(0x1d3)](ColorManager['systemColor']()),this[_0x5b6235(0x131)](_0xdeaa9['Text'](),_0x34df63+_0x92443b,_0x1f8329,_0x5466d9),this[_0x5b6235(0x1d3)](ColorManager['normalColor']()),this[_0x5b6235(0x131)](_0xdeaa9[_0x5b6235(0x10c)](),_0x34df63+_0x92443b,_0x1f8329,_0x5466d9,_0x5b6235(0xf1)),_0x1f8329+=_0x327e9c;}},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x118)]=function(_0x5a6791,_0x49acac,_0x26ad30){const _0x179390=_0x4462e2,_0x450a47=this[_0x179390(0x196)]()-0x2,_0xf966bc=Math['floor'](_0x450a47/0x2),_0x402ea9=_0x179390(0x1d4),_0x1f7e4a=ColorManager[_0x179390(0x99)](),_0x58573d=0x50,_0x55d83f=_0x26ad30-_0xf966bc-_0x58573d;!ImageManager[_0x179390(0x1f4)]&&(ImageManager[_0x179390(0x1f4)]=new Bitmap(_0x26ad30,_0x450a47),ImageManager['victoryRewardBitmap'][_0x179390(0x1d5)]=this['translucentOpacity'](),ImageManager['victoryRewardBitmap'][_0x179390(0x130)](_0xf966bc,_0xf966bc,_0xf966bc,_0x402ea9),ImageManager['victoryRewardBitmap'][_0x179390(0x1ad)](_0xf966bc,0x0,_0x450a47,_0x450a47),ImageManager[_0x179390(0x1f4)][_0x179390(0x22e)](_0xf966bc,0x0,_0x55d83f,_0x450a47,_0x402ea9),ImageManager[_0x179390(0x1f4)]['gradientFillRect'](_0xf966bc+_0x55d83f,0x0,_0x58573d,_0x450a47,_0x402ea9,_0x1f7e4a)),this['contents']['blt'](ImageManager[_0x179390(0x1f4)],0x0,0x0,_0x26ad30,_0x450a47,_0x5a6791,_0x49acac,_0x26ad30,_0x450a47);},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x20b)]=function(){const _0x44f923=_0x4462e2;this[_0x44f923(0xbd)]();if(BattleManager['_rewards'][_0x44f923(0x111)][_0x44f923(0x220)]<=0x0)return;const _0x5f28c4=this[_0x44f923(0xe6)](),_0x2bde07=this[_0x44f923(0x196)](),_0x2375f6=_0x5f28c4?0x8c:Math[_0x44f923(0x1dc)](this[_0x44f923(0x8e)]/0x2+0x28),_0x18fe41=Math[_0x44f923(0x1dc)](_0x2bde07*0x3),_0x4a10bb=Math[_0x44f923(0x1dc)](this[_0x44f923(0x8e)]/0x2-0x8c),_0x26b388=TextManager[_0x44f923(0x115)],_0x6c785c=ColorManager[_0x44f923(0x1b9)]();this[_0x44f923(0x1be)](),this[_0x44f923(0x131)](_0x26b388,_0x2375f6,_0x18fe41,_0x4a10bb,_0x44f923(0x1c5));const _0x1c6268=_0x5f28c4?0x64:Math['round'](this[_0x44f923(0x8e)]/0x2),_0x5152ac=_0x18fe41+_0x2bde07*1.5,_0x332822=Math['round'](this[_0x44f923(0x8e)]/0x2)-0x64;this[_0x44f923(0x176)]['fillRect'](_0x1c6268,_0x5152ac,_0x332822,0x2,_0x6c785c);},Window_VictoryRewards[_0x4462e2(0x132)]['makeItemGainWindow']=function(){const _0x231aef=_0x4462e2,_0x5d647c=this[_0x231aef(0xe6)](),_0x32d694=this[_0x231aef(0x196)](),_0x4df0fb=_0x5d647c?0x64:Math[_0x231aef(0x1dc)](this['width']/0x2+0x28),_0xe0733d=Math[_0x231aef(0x1dc)](_0x32d694*0x5),_0x5ad986=Math['round'](this[_0x231aef(0x8e)]/0x2-0x8c),_0x58190e=this[_0x231aef(0x159)]-_0xe0733d-_0x32d694*0x2,_0x41f66c=new Rectangle(_0x4df0fb,_0xe0733d,_0x5ad986,_0x58190e);this[_0x231aef(0x119)]=new Window_VictoryItem(_0x41f66c,this),this['addChild'](this['_itemGainWindow']);},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x1b2)]=function(){const _0x1131aa=_0x4462e2;this[_0x1131aa(0xbd)]();const _0x262222=this['mirrorContents'](),_0x3c7522=this['lineHeight'](),_0xae6fa3=$gameParty[_0x1131aa(0xf6)](),_0x42e41a=_0x262222?Math[_0x1131aa(0x1dc)](this['width']/0x2+0x28):0x64,_0x17221e=this[_0x1131aa(0x159)]-1.5-_0x3c7522*0x2*(_0xae6fa3+0x1),_0x5ed831=Math[_0x1131aa(0x1dc)](this['width']/0x2-0x8c);let _0x3af6ed=_0x17221e;for(let _0x695178=0x0;_0x695178<_0xae6fa3;_0x695178++){if(!$gameParty[_0x1131aa(0x1e4)]()[_0x695178])continue;this[_0x1131aa(0x160)](_0x42e41a,_0x3af6ed,_0x5ed831),this[_0x1131aa(0x18c)](_0x695178,_0x42e41a,_0x3af6ed,_0x5ed831),_0x3af6ed+=_0x3c7522*0x2;}},Window_VictoryRewards['prototype'][_0x4462e2(0x160)]=function(_0x517c0f,_0x391c80,_0x386886){const _0x31d44a=_0x4462e2,_0x20de6c=this[_0x31d44a(0x196)]()-0x2,_0x1e8c74=Math[_0x31d44a(0xb1)](_0x20de6c/0x2),_0xb49e82=_0x31d44a(0x1d4),_0x28d272=ColorManager[_0x31d44a(0x99)](),_0x4245f9=_0x386886-_0x20de6c;!ImageManager['victoryNameBitmap']&&(ImageManager[_0x31d44a(0x193)]=new Bitmap(_0x386886,_0x20de6c),ImageManager[_0x31d44a(0x193)][_0x31d44a(0x1d5)]=this[_0x31d44a(0x208)](),ImageManager[_0x31d44a(0x193)][_0x31d44a(0x130)](_0x1e8c74,_0x1e8c74,_0x1e8c74,_0xb49e82),ImageManager[_0x31d44a(0x193)][_0x31d44a(0x130)](_0x1e8c74+_0x4245f9,_0x1e8c74,_0x1e8c74,_0xb49e82),ImageManager['victoryNameBitmap'][_0x31d44a(0x1ad)](_0x1e8c74,0x0,_0x4245f9,_0x20de6c),ImageManager['victoryNameBitmap'][_0x31d44a(0x22e)](_0x1e8c74,0x0,_0x4245f9,_0x20de6c,_0xb49e82)),this['contents'][_0x31d44a(0x189)](ImageManager['victoryNameBitmap'],0x0,0x0,_0x386886,_0x20de6c,_0x517c0f,_0x391c80,_0x386886,_0x20de6c);},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x18c)]=function(_0x5ab71b,_0x51c932,_0x59af39,_0x54a949){const _0x439abe=_0x4462e2,_0x445655=_0x439abe(0xb4)[_0x439abe(0x1f8)](_0x5ab71b),_0x3154a8=this[_0x439abe(0x13a)](_0x445655,_0x5ab71b,_0x54a949);_0x3154a8[_0x439abe(0x10a)](_0x51c932,_0x59af39),_0x3154a8[_0x439abe(0xea)]();},Window_VictoryRewards[_0x4462e2(0x132)][_0x4462e2(0x13a)]=function(_0x542527,_0x57e30c,_0x30ba69){const _0x15fb9c=_0x4462e2,_0x5cd3d1=this[_0x15fb9c(0x219)];if(_0x5cd3d1[_0x542527])return _0x5cd3d1[_0x542527];else{const _0x24b9fb=new Sprite_VictoryGauge(_0x57e30c,this,_0x30ba69);return _0x5cd3d1[_0x542527]=_0x24b9fb,this['addInnerChild'](_0x24b9fb),_0x24b9fb;}};function Window_VictoryItem(){this['initialize'](...arguments);}Window_VictoryItem[_0x4462e2(0x132)]=Object[_0x4462e2(0xff)](Window_ItemList['prototype']),Window_VictoryItem['prototype']['constructor']=Window_VictoryItem,Window_VictoryItem[_0x4462e2(0x132)]['initialize']=function(_0x6f7ae,_0x156981){const _0x2836f1=_0x4462e2;this['_mainWindow']=_0x156981,Window_ItemList[_0x2836f1(0x132)][_0x2836f1(0x1c9)][_0x2836f1(0xaa)](this,_0x6f7ae),this[_0x2836f1(0xfe)](0x2),this['refresh'](),this[_0x2836f1(0x14b)](),this[_0x2836f1(0x1b3)]['length']>this[_0x2836f1(0x1d0)]()&&(this[_0x2836f1(0x9b)](),this[_0x2836f1(0x1ea)](0x0));},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x228)]=function(){const _0x1c8f0b=_0x4462e2;return Window_Base['prototype']['itemHeight'][_0x1c8f0b(0xaa)](this);},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0xc9)]=function(){const _0x27ed3a=_0x4462e2;this[_0x27ed3a(0x149)]=0x0;},Window_VictoryItem[_0x4462e2(0x132)]['maxCols']=function(){return 0x1;},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0xa8)]=function(){return 0x0;},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x103)]=function(){const _0x4052a8=_0x4462e2;Window_ItemList[_0x4052a8(0x132)][_0x4052a8(0x103)][_0x4052a8(0xaa)](this),this[_0x4052a8(0x14b)]();},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x14b)]=function(){const _0xcb30a1=_0x4462e2;this[_0xcb30a1(0xb9)]=this[_0xcb30a1(0x21d)]['contentsOpacity'];},Window_VictoryItem['prototype'][_0x4462e2(0xe1)]=function(){const _0x5f06fb=_0x4462e2,_0x26eff9=BattleManager['_rewards'][_0x5f06fb(0x111)];_0x26eff9[_0x5f06fb(0xd6)]((_0x2ec639,_0x122ed5)=>_0x2ec639['id']-_0x122ed5['id']);const _0x498ce6=_0x26eff9['filter'](_0x24015b=>DataManager['isItem'](_0x24015b)),_0x3bb214=_0x26eff9[_0x5f06fb(0x10e)](_0x3dff00=>DataManager[_0x5f06fb(0x8b)](_0x3dff00)),_0x309344=_0x26eff9[_0x5f06fb(0x10e)](_0x5aafbf=>DataManager[_0x5f06fb(0x227)](_0x5aafbf));this[_0x5f06fb(0x1b3)]=_0x498ce6['concat'](_0x3bb214)[_0x5f06fb(0xf0)](_0x309344),this[_0x5f06fb(0x1b3)]=this[_0x5f06fb(0x1b3)][_0x5f06fb(0x10e)]((_0x4a0de3,_0x1bc4db,_0x2a479a)=>_0x2a479a[_0x5f06fb(0x1d6)](_0x4a0de3)===_0x1bc4db);},Window_VictoryItem[_0x4462e2(0x132)]['isEnabled']=function(_0x5dc184){return!![];},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x138)]=function(){return![];},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x165)]=function(_0x4d1037){const _0x64bb3=_0x4462e2;return BattleManager[_0x64bb3(0x92)][_0x64bb3(0x111)]['filter'](_0x5832=>_0x5832===_0x4d1037)['length'];},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x1ac)]=function(_0x33c59f){},Window_VictoryItem[_0x4462e2(0x132)][_0x4462e2(0x1c7)]=function(_0x1e705a,_0x2ad7e3,_0x388d1c,_0x1ceda2){const _0x2565d0=_0x4462e2;let _0x2a3744=_0x2565d0(0x16f);Imported[_0x2565d0(0x20a)]&&(_0x2a3744=VisuMZ[_0x2565d0(0x170)][_0x2565d0(0x12c)]['ItemScene'][_0x2565d0(0x1ca)]);let _0x29e1dc=_0x2a3744['format'](this[_0x2565d0(0x165)](_0x1e705a));this[_0x2565d0(0x131)](_0x29e1dc,_0x2ad7e3,_0x388d1c,_0x1ceda2,_0x2565d0(0xf1));};function Window_VictoryLevelUp(){const _0x1dd8f5=_0x4462e2;this[_0x1dd8f5(0x1c9)](...arguments);}Window_VictoryLevelUp[_0x4462e2(0x1d8)]=Window_VictoryRewards[_0x4462e2(0x1d8)],Window_VictoryLevelUp[_0x4462e2(0x223)]=VisuMZ[_0x4462e2(0xdb)]['Settings'][_0x4462e2(0xee)][_0x4462e2(0xa5)],Window_VictoryLevelUp['prototype']=Object[_0x4462e2(0xff)](Window_StatusBase[_0x4462e2(0x132)]),Window_VictoryLevelUp[_0x4462e2(0x132)]['constructor']=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x1c9)]=function(_0x5da5ff){const _0x299de8=_0x4462e2;Window_StatusBase[_0x299de8(0x132)][_0x299de8(0x1c9)]['call'](this,_0x5da5ff),this[_0x299de8(0xfe)](0x2),this[_0x299de8(0xb9)]=0x0,this['refresh'](),this[_0x299de8(0x137)](),this[_0x299de8(0x1db)]();},Window_VictoryLevelUp['prototype'][_0x4462e2(0xc9)]=function(){const _0x22c046=_0x4462e2;this[_0x22c046(0x149)]=0x0;},Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x103)]=function(){const _0x3ee9b7=_0x4462e2;Window_StatusBase[_0x3ee9b7(0x132)][_0x3ee9b7(0x103)][_0x3ee9b7(0xaa)](this),this[_0x3ee9b7(0x14b)]();},Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x14b)]=function(){const _0x328b91=_0x4462e2;SceneManager[_0x328b91(0x1ce)][_0x328b91(0x1c2)]===_0x328b91(0x8d)?this[_0x328b91(0xb9)]+=Window_VictoryLevelUp[_0x328b91(0x1d8)]:this[_0x328b91(0xb9)]-=Window_VictoryLevelUp['_opacitySpeed'],this[_0x328b91(0xcb)]&&(this[_0x328b91(0xcb)][_0x328b91(0xd0)]=this[_0x328b91(0xb9)]);},Window_VictoryLevelUp['prototype'][_0x4462e2(0x8c)]=function(){const _0x46e861=_0x4462e2;Window_StatusBase['prototype'][_0x46e861(0x8c)][_0x46e861(0xaa)](this),this[_0x46e861(0x176)]['clear'](),this[_0x46e861(0xbd)](),this['drawBackgroundElements']();},Window_VictoryLevelUp['prototype']['drawBackgroundElements']=function(){const _0x2dbfed=_0x4462e2,_0x13db46=this['lineHeight'](),_0x373455='rgba(0,\x200,\x200,\x200.8)',_0x3dd848=_0x2dbfed(0x162),_0x3a7a35=ColorManager[_0x2dbfed(0x1b9)](),_0x4ef526=SceneManager[_0x2dbfed(0x1ce)][_0x2dbfed(0x231)]['x'],_0x4c4f26=Math[_0x2dbfed(0x1dc)](this[_0x2dbfed(0x8e)]/0x2);this[_0x2dbfed(0x176)][_0x2dbfed(0x163)](_0x4ef526,0x0,_0x4c4f26,this[_0x2dbfed(0x159)],_0x3dd848,_0x373455,!![]),this[_0x2dbfed(0x176)]['fillRect'](_0x4ef526-0x1,0x0,0x2,this[_0x2dbfed(0x159)],_0x3a7a35),this[_0x2dbfed(0x176)][_0x2dbfed(0x22e)](_0x4ef526+_0x4c4f26-0x1,0x0,0x2,this[_0x2dbfed(0x159)],_0x3a7a35);const _0x3bbc67=_0x13db46,_0x4a7846=_0x13db46*0x1;this[_0x2dbfed(0x176)][_0x2dbfed(0x163)](0x0,_0x3bbc67,this[_0x2dbfed(0x8e)],_0x4a7846,_0x373455,_0x3dd848),this['contents'][_0x2dbfed(0x22e)](0x0,_0x3bbc67-0x1,this[_0x2dbfed(0x8e)],0x2,_0x3a7a35),this[_0x2dbfed(0x176)][_0x2dbfed(0x22e)](0x0,_0x3bbc67+_0x4a7846-0x1,this['width'],0x2,_0x3a7a35);const _0x37e8d6=this[_0x2dbfed(0x159)]-_0x13db46*5.5,_0x12ecea=_0x13db46*0x4;this[_0x2dbfed(0x176)]['gradientFillRect'](0x0,_0x37e8d6,this[_0x2dbfed(0x8e)],_0x12ecea,_0x373455,_0x3dd848),this[_0x2dbfed(0x176)][_0x2dbfed(0x163)](0x0,_0x37e8d6,this[_0x2dbfed(0x8e)],_0x12ecea,_0x3dd848,_0x373455),this[_0x2dbfed(0x176)]['fillRect'](0x0,_0x37e8d6-0x2,this[_0x2dbfed(0x8e)],0x2,_0x3a7a35),this[_0x2dbfed(0x176)][_0x2dbfed(0x22e)](0x0,_0x37e8d6+_0x12ecea,this[_0x2dbfed(0x8e)],0x2,_0x3a7a35);},Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x137)]=function(){const _0x13cc2e=_0x4462e2,_0x37e89b=VisuMZ[_0x13cc2e(0xdb)]['Settings'][_0x13cc2e(0xee)];this['_actorSprite']=new Sprite(),this['_actorSprite'][_0x13cc2e(0x1b8)]['x']=0.5,this[_0x13cc2e(0xcb)][_0x13cc2e(0x1b8)]['y']=0x1,this['_actorSprite'][_0x13cc2e(0xd0)]=0x0,this[_0x13cc2e(0xcb)]['x']=Math[_0x13cc2e(0x1dc)](eval(_0x37e89b[_0x13cc2e(0x22b)])),this['_actorSprite']['y']=Math[_0x13cc2e(0x1dc)](eval(_0x37e89b[_0x13cc2e(0x1f3)])),this[_0x13cc2e(0xcb)]['scale']['x']=_0x37e89b[_0x13cc2e(0x1fb)],this[_0x13cc2e(0xcb)][_0x13cc2e(0x11e)]['y']=_0x37e89b[_0x13cc2e(0x1fb)],this[_0x13cc2e(0xf7)](this[_0x13cc2e(0xcb)]);},Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x1db)]=function(){const _0x3c0bb8=_0x4462e2,_0x15530a=new Rectangle(0x0,0x0,this[_0x3c0bb8(0x8e)],this[_0x3c0bb8(0x159)]);this['_subWindow']=new Window_VictoryLevelUpActor(_0x15530a,this),this['addChild'](this[_0x3c0bb8(0xda)]);},Window_VictoryLevelUp[_0x4462e2(0x132)][_0x4462e2(0x146)]=function(_0x57ea4b){const _0x1c4b3f=_0x4462e2;Imported[_0x1c4b3f(0x93)]&&Window_VictoryLevelUp[_0x1c4b3f(0x223)]&&(this['_actorSprite']['bitmap']=ImageManager[_0x1c4b3f(0x217)](_0x57ea4b[_0x1c4b3f(0xd4)]())),SoundManager[_0x1c4b3f(0x188)](),this[_0x1c4b3f(0xda)]['setActor'](_0x57ea4b);};function Window_VictoryLevelUpActor(){const _0x125f1f=_0x4462e2;this[_0x125f1f(0x1c9)](...arguments);}Window_VictoryLevelUpActor['_opacitySpeed']=Window_VictoryRewards[_0x4462e2(0x1d8)],Window_VictoryLevelUpActor[_0x4462e2(0x1fa)]=VisuMZ[_0x4462e2(0xdb)]['Settings'][_0x4462e2(0xee)][_0x4462e2(0xa3)],Window_VictoryLevelUpActor[_0x4462e2(0x15f)]=VisuMZ['VictoryAftermath'][_0x4462e2(0x12c)][_0x4462e2(0xee)][_0x4462e2(0xc1)],Window_VictoryLevelUpActor[_0x4462e2(0x132)]=Object[_0x4462e2(0xff)](Window_StatusBase[_0x4462e2(0x132)]),Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0xc0)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x4462e2(0x132)]['initialize']=function(_0x323a4f,_0x7661f0){const _0x567844=_0x4462e2;this[_0x567844(0x21d)]=_0x7661f0,Window_StatusBase[_0x567844(0x132)][_0x567844(0x1c9)]['call'](this,_0x323a4f),this[_0x567844(0xfe)](0x2),this[_0x567844(0xb9)]=0x0,this[_0x567844(0x20e)]=null,this[_0x567844(0x8c)]();},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0xc9)]=function(){const _0x2d30d9=_0x4462e2;this[_0x2d30d9(0x149)]=0x0;},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x103)]=function(){const _0x48abd6=_0x4462e2;Window_StatusBase[_0x48abd6(0x132)][_0x48abd6(0x103)][_0x48abd6(0xaa)](this),this[_0x48abd6(0x14b)]();},Window_VictoryLevelUpActor[_0x4462e2(0x132)]['updateContentsOpacity']=function(){const _0x4542ac=_0x4462e2;this[_0x4542ac(0xb9)]=this[_0x4542ac(0x21d)][_0x4542ac(0xb9)];},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0x146)]=function(_0x185c6b){const _0x196855=_0x4462e2;this[_0x196855(0x20e)]=_0x185c6b,this['refresh']();},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x20f)]=function(){const _0xfa86c2=_0x4462e2,_0x43688c=this[_0xfa86c2(0x20e)]['index']();return BattleManager[_0xfa86c2(0x126)][_0x43688c];},Window_VictoryLevelUpActor[_0x4462e2(0x132)]['afterActor']=function(){const _0x47b6fd=_0x4462e2,_0x56f78c=this['_actor'][_0x47b6fd(0x1df)]();return BattleManager[_0x47b6fd(0x206)][_0x56f78c];},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x8c)]=function(){const _0x194bff=_0x4462e2;Window_StatusBase['prototype'][_0x194bff(0x8c)][_0x194bff(0xaa)](this),this[_0x194bff(0x176)][_0x194bff(0xe4)](),this['resetFontSettings']();if(!this[_0x194bff(0x20e)])return;this[_0x194bff(0x18b)](),this[_0x194bff(0x204)](),this['drawNewLearnedSkills'](),this[_0x194bff(0x11b)]();},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0x18b)]=function(){const _0x20dac4=_0x4462e2,_0x47658e=this[_0x20dac4(0x196)](),_0x31a3c9=TextManager['levelUp'][_0x20dac4(0x1f8)](this[_0x20dac4(0x20e)]['name'](),TextManager[_0x20dac4(0xe2)],this[_0x20dac4(0x20e)][_0x20dac4(0xe2)]),_0x1c5ae0=this[_0x20dac4(0x1e8)](_0x31a3c9)[_0x20dac4(0x8e)],_0x5f066c=SceneManager[_0x20dac4(0x1ce)][_0x20dac4(0x231)]['x']+Math['round']((this[_0x20dac4(0x8e)]/0x2-_0x1c5ae0)/0x2),_0x245386=_0x47658e;this['drawTextEx'](_0x31a3c9,_0x5f066c,_0x245386,_0x1c5ae0);},Window_VictoryLevelUpActor[_0x4462e2(0x132)]['drawItemDarkRect']=function(_0x15a5dc,_0x352095,_0x3b18ef,_0x135fbd,_0x5623fc){const _0x290e56=_0x4462e2;if(VisuMZ['VictoryAftermath']['Settings']['LevelUp'][_0x290e56(0x1f2)]===![])return;_0x5623fc=Math[_0x290e56(0x134)](_0x5623fc||0x1,0x1);while(_0x5623fc--){_0x135fbd=_0x135fbd||this[_0x290e56(0x196)](),this[_0x290e56(0x176)][_0x290e56(0x1d5)]=0xa0;const _0x4c8fd5=ColorManager['getVictoryAftermathBackColor']();this[_0x290e56(0x176)]['fillRect'](_0x15a5dc+0x1,_0x352095+0x1,_0x3b18ef-0x2,_0x135fbd-0x2,_0x4c8fd5),this[_0x290e56(0x176)][_0x290e56(0x1d5)]=0xff;}},ColorManager[_0x4462e2(0x145)]=function(){const _0x24078c=_0x4462e2,_0x221779=VisuMZ['VictoryAftermath'][_0x24078c(0x12c)][_0x24078c(0xee)];let _0x244a26=_0x221779[_0x24078c(0x186)]!==undefined?_0x221779[_0x24078c(0x186)]:0x13;return ColorManager[_0x24078c(0x1a0)](_0x244a26);},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x204)]=function(){const _0x97c60c=_0x4462e2,_0x3d974a=this[_0x97c60c(0x196)](),_0x164273='→',_0x57c71d=this[_0x97c60c(0xfd)](),_0x59d368=_0x3d974a*0x2,_0x4b1347=this[_0x97c60c(0x159)]-_0x3d974a*5.5,_0x16c627=this[_0x97c60c(0x129)](_0x164273)+this[_0x97c60c(0x9e)]()*0x2,_0x50a91d=Window_VictoryLevelUpActor[_0x97c60c(0x1fa)]?0x4:0x3,_0x1a521f=Math[_0x97c60c(0x1dc)]((this['width']/0x2-_0x16c627-this[_0x97c60c(0x9e)]()*0x2)/_0x50a91d),_0x1db3d7=_0x4b1347-_0x59d368,_0x4ca09f=VisuMZ[_0x97c60c(0xdb)][_0x97c60c(0x12c)][_0x97c60c(0xee)][_0x97c60c(0x1a1)],_0x3858cc=SceneManager['_scene']['_victoryContinueWindow']['x']+this['itemPadding'](),_0x1d9c1e=_0x3858cc+_0x1a521f,_0x16dd6d=_0x1d9c1e+_0x1a521f,_0x14671e=_0x16dd6d+_0x16c627,_0x4050f0=_0x14671e+_0x1a521f;let _0x3e0462=Math['round'](_0x59d368+(_0x1db3d7-(_0x57c71d[_0x97c60c(0x220)]+(_0x4ca09f?0x0:0x1))*_0x3d974a)/0x2),_0x286afe=0x2;!_0x4ca09f&&(this['resetFontSettings'](),VisuMZ[_0x97c60c(0x170)]&&(this[_0x97c60c(0x176)][_0x97c60c(0xf3)]=Window_EquipStatus[_0x97c60c(0x132)][_0x97c60c(0x22c)]()),this[_0x97c60c(0x141)](_0x3858cc,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this[_0x97c60c(0x174)](_0x97c60c(0xe2),_0x3858cc,_0x3e0462,_0x1a521f),this[_0x97c60c(0x141)](_0x1d9c1e,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this[_0x97c60c(0x20d)](_0x97c60c(0xe2),_0x1d9c1e,_0x3e0462,_0x1a521f),this[_0x97c60c(0x141)](_0x16dd6d,_0x3e0462,_0x16c627,_0x3d974a,_0x286afe),this[_0x97c60c(0x1d3)](ColorManager[_0x97c60c(0x1d2)]()),this['drawText'](_0x164273,_0x16dd6d,_0x3e0462,_0x16c627,_0x97c60c(0x155)),this[_0x97c60c(0x141)](_0x14671e,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this[_0x97c60c(0x225)]('level',_0x14671e,_0x3e0462,_0x1a521f),Window_VictoryLevelUpActor[_0x97c60c(0x1fa)]&&(this[_0x97c60c(0x141)](_0x4050f0,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this[_0x97c60c(0x13e)](_0x97c60c(0xe2),_0x4050f0,_0x3e0462,_0x1a521f)),_0x3e0462+=_0x3d974a,_0x286afe=_0x286afe===0x2?0x1:0x2);for(const _0x555a8a of _0x57c71d){this[_0x97c60c(0xbd)](),VisuMZ['ItemsEquipsCore']&&(this[_0x97c60c(0x176)][_0x97c60c(0xf3)]=Window_EquipStatus[_0x97c60c(0x132)][_0x97c60c(0x22c)]()),this['drawItemDarkRect'](_0x3858cc,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this['drawParamName'](_0x555a8a,_0x3858cc,_0x3e0462,_0x1a521f),this[_0x97c60c(0x141)](_0x1d9c1e,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this[_0x97c60c(0x20d)](_0x555a8a,_0x1d9c1e,_0x3e0462,_0x1a521f),this[_0x97c60c(0x141)](_0x16dd6d,_0x3e0462,_0x16c627,_0x3d974a,_0x286afe),this['changeTextColor'](ColorManager[_0x97c60c(0x1d2)]()),this[_0x97c60c(0x131)](_0x164273,_0x16dd6d,_0x3e0462,_0x16c627,_0x97c60c(0x155)),this[_0x97c60c(0x141)](_0x14671e,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this['drawParamAfterValue'](_0x555a8a,_0x14671e,_0x3e0462,_0x1a521f),Window_VictoryLevelUpActor['_drawParamDiff']&&(this[_0x97c60c(0x141)](_0x4050f0,_0x3e0462,_0x1a521f,_0x3d974a,_0x286afe),this['drawParamDiffValue'](_0x555a8a,_0x4050f0,_0x3e0462,_0x1a521f)),_0x3e0462+=_0x3d974a,_0x286afe=_0x286afe===0x2?0x1:0x2;}},Window_VictoryLevelUpActor[_0x4462e2(0x132)]['actorParams']=function(){const _0x5bd1aa=_0x4462e2;return Imported[_0x5bd1aa(0x19c)]?VisuMZ[_0x5bd1aa(0x20c)][_0x5bd1aa(0x12c)]['Param'][_0x5bd1aa(0x123)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x174)]=function(_0x3c2582,_0x33eafe,_0x6ed57,_0x5a7063){const _0x297080=_0x4462e2;this[_0x297080(0x1d3)](ColorManager[_0x297080(0x1d2)]());let _0x3974b5='';_0x3c2582===_0x297080(0xe2)?_0x3974b5=TextManager[_0x297080(0xe2)]:_0x3974b5=TextManager[_0x297080(0x13f)](_0x3c2582),this[_0x297080(0x131)](_0x3974b5,_0x33eafe+this[_0x297080(0x9e)](),_0x6ed57,_0x5a7063-this['itemPadding']()*0x2);},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x20d)]=function(_0x989095,_0xfac34b,_0x183e93,_0x32a71d){const _0x3ed5de=_0x4462e2,_0x28e8a1=this[_0x3ed5de(0x20f)]();let _0x55e410='';_0x989095==='level'?_0x55e410=_0x28e8a1[_0x3ed5de(0xe2)]:_0x55e410=Imported[_0x3ed5de(0x19c)]?_0x28e8a1['paramValueByName'](_0x989095,!![]):_0x28e8a1[_0x3ed5de(0x13f)](_0x989095),this[_0x3ed5de(0x1d3)](ColorManager[_0x3ed5de(0x1b9)]()),this['drawText'](_0x55e410,_0xfac34b+this[_0x3ed5de(0x9e)](),_0x183e93,_0x32a71d-this[_0x3ed5de(0x9e)]()*0x2,_0x3ed5de(0xf1));},Window_VictoryLevelUpActor['prototype']['drawParamAfterValue']=function(_0x2c6f30,_0x5f2d89,_0x34ae62,_0x2e75f3){const _0x24aea1=_0x4462e2,_0x38675e=this[_0x24aea1(0x20f)](),_0x5519e4=this[_0x24aea1(0x20e)];let _0x3c0174=0x0,_0x11a360=0x0;_0x2c6f30===_0x24aea1(0xe2)?(_0x3c0174=_0x38675e[_0x24aea1(0xe2)],_0x11a360=_0x5519e4['level']):(_0x3c0174=Imported[_0x24aea1(0x19c)]?_0x38675e['paramValueByName'](_0x2c6f30,![]):_0x38675e[_0x24aea1(0x13f)](_0x2c6f30),_0x11a360=Imported[_0x24aea1(0x19c)]?_0x5519e4[_0x24aea1(0xfb)](_0x2c6f30,![]):_0x5519e4['param'](_0x2c6f30));let _0x4c7f5a=_0x11a360;const _0x502266=_0x11a360-_0x3c0174;this[_0x24aea1(0x1d3)](ColorManager[_0x24aea1(0xac)](_0x502266)),this['drawText'](_0x4c7f5a,_0x5f2d89+this[_0x24aea1(0x9e)](),_0x34ae62,_0x2e75f3-this[_0x24aea1(0x9e)]()*0x2,_0x24aea1(0xf1));},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0x13e)]=function(_0x3f81d3,_0x29203c,_0x48257d,_0x111c92){const _0x5b5de1=_0x4462e2,_0x39a134=this[_0x5b5de1(0x20f)](),_0x22b401=this['_actor'];let _0x554943=0x0,_0x569df5=0x0;_0x3f81d3===_0x5b5de1(0xe2)?(_0x554943=_0x39a134[_0x5b5de1(0xe2)],_0x569df5=_0x22b401[_0x5b5de1(0xe2)]):(_0x554943=Imported['VisuMZ_0_CoreEngine']?_0x39a134['paramValueByName'](_0x3f81d3,![]):_0x39a134['param'](_0x3f81d3),_0x569df5=Imported['VisuMZ_0_CoreEngine']?_0x22b401[_0x5b5de1(0xfb)](_0x3f81d3,![]):_0x22b401[_0x5b5de1(0x13f)](_0x3f81d3));const _0x1bf6ac=_0x569df5-_0x554943;let _0x337786=_0x1bf6ac;if(_0x554943%0x1!==0x0)_0x337786=Math[_0x5b5de1(0x1dc)](_0x1bf6ac*0x64)+'%';_0x1bf6ac!==0x0&&(this['changeTextColor'](ColorManager[_0x5b5de1(0xac)](_0x1bf6ac)),_0x337786=(_0x1bf6ac>=0x0?_0x5b5de1(0x16a):_0x5b5de1(0x9a))[_0x5b5de1(0x1f8)](_0x337786),this[_0x5b5de1(0x131)](_0x337786,_0x29203c+this[_0x5b5de1(0x9e)](),_0x48257d,_0x111c92-this['itemPadding']()*0x2,_0x5b5de1(0x1c5)));},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x1cd)]=function(){const _0x38448b=_0x4462e2;this[_0x38448b(0xbd)]();const _0x3ff787=this['findNewSkills']();if(_0x3ff787['length']<=0x0)return;const _0x5690de=VisuMZ[_0x38448b(0xdb)][_0x38448b(0x12c)][_0x38448b(0xee)]['MaxSkills'];while(_0x3ff787[_0x38448b(0x220)]>_0x5690de){_0x3ff787['pop']();}this['drawNewLearnedSkillsBackground'](_0x3ff787),this[_0x38448b(0xeb)](_0x3ff787);},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0x150)]=function(){const _0x58f210=_0x4462e2,_0x8ebb36=this[_0x58f210(0x20f)]()[_0x58f210(0xb2)]();return this[_0x58f210(0x20e)]['findNewSkills'](_0x8ebb36);},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0xa0)]=function(_0x51c4d7){const _0x211d7a=_0x4462e2,_0x6b7f3f=this[_0x211d7a(0x196)](),_0x2bae9f=_0x211d7a(0x1fc),_0x121534='rgba(0,\x200,\x200,\x200.4)',_0x53511e=ColorManager[_0x211d7a(0x1b9)](),_0x434cd3=Math[_0x211d7a(0x1dc)](this[_0x211d7a(0x8e)]/0x2)-0x64-_0x6b7f3f*0x2,_0x409cff=(_0x51c4d7[_0x211d7a(0x220)]+0x1)*_0x6b7f3f,_0x167abf=_0x6b7f3f,_0x2846cc=this[_0x211d7a(0x159)]-_0x6b7f3f*6.5-_0x409cff;this[_0x211d7a(0x176)][_0x211d7a(0x22e)](_0x167abf-0x2,_0x2846cc-0x2,_0x434cd3+0x4,_0x409cff+0x4,_0x53511e),this[_0x211d7a(0x176)][_0x211d7a(0x1ad)](_0x167abf,_0x2846cc,_0x434cd3,_0x409cff),this[_0x211d7a(0x176)]['gradientFillRect'](_0x167abf,_0x2846cc,_0x434cd3,_0x409cff,_0x2bae9f,_0x121534);},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0xeb)]=function(_0x6ebf58){const _0x5ba350=_0x4462e2,_0x37c7d6=this[_0x5ba350(0x196)](),_0x4efafc='rgba(0,\x200,\x200,\x200.8)',_0x3677c0='rgba(0,\x200,\x200,\x200.4)',_0x448680=ColorManager['normalColor'](),_0x17d8b6=Math[_0x5ba350(0x1dc)](this['width']/0x2)-0x64-(_0x37c7d6+this['itemPadding']())*0x2,_0x122104=(_0x6ebf58[_0x5ba350(0x220)]+0x1)*_0x37c7d6;let _0x2dd7d8=_0x37c7d6+this['itemPadding'](),_0xd7d58a=this[_0x5ba350(0x159)]-_0x37c7d6*6.5-_0x122104;const _0x40267d=TextManager[_0x5ba350(0x207)]['format'](this[_0x5ba350(0x20e)][_0x5ba350(0xde)]()),_0x4299f4=this[_0x5ba350(0x1e8)](_0x40267d)[_0x5ba350(0x8e)],_0x1b2201=Math[_0x5ba350(0x1dc)](_0x2dd7d8+(_0x17d8b6-_0x4299f4)/0x2);this['drawTextEx'](_0x40267d,_0x1b2201,_0xd7d58a,_0x4299f4),_0xd7d58a+=_0x37c7d6,this[_0x5ba350(0x176)][_0x5ba350(0x22e)](_0x2dd7d8,_0xd7d58a-0x1,_0x17d8b6,0x2,_0x448680);for(const _0x5e3928 of _0x6ebf58){if(!_0x5e3928)continue;this['resetFontSettings'](),this['drawItemName'](_0x5e3928,_0x2dd7d8+this[_0x5ba350(0x9e)](),_0xd7d58a,_0x17d8b6-this[_0x5ba350(0x9e)]()*0x2),_0xd7d58a+=_0x37c7d6;}},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0x11b)]=function(){const _0xcacf2=_0x4462e2,_0x514e70=this[_0xcacf2(0x196)](),_0x3a064d=Window_VictoryLevelUpActor[_0xcacf2(0x15f)],_0x5d5c38=this['getQuoteWidth'](),_0x4d4fc2=_0x514e70*0x4,_0x9941b4=Math[_0xcacf2(0x1dc)]((this[_0xcacf2(0x8e)]-_0x5d5c38)/0x2),_0x186cb1=_0x9941b4+(_0x3a064d?ImageManager[_0xcacf2(0x21e)]+0x14:0x0),_0x59c510=this[_0xcacf2(0x159)]-_0x514e70*5.5;let _0x332ba3=this[_0xcacf2(0xa2)]();_0x3a064d&&this['drawActorFace'](this[_0xcacf2(0x20e)],_0x9941b4,_0x59c510,ImageManager['faceWidth'],ImageManager[_0xcacf2(0x1f6)]),this[_0xcacf2(0x213)](_0x332ba3,_0x186cb1,_0x59c510,_0x5d5c38-_0x186cb1);},Window_VictoryLevelUpActor[_0x4462e2(0x132)][_0x4462e2(0x8f)]=function(){const _0x7767b=_0x4462e2;let _0x3f18e2=Graphics[_0x7767b(0xae)];return Imported[_0x7767b(0xbf)]&&(_0x3f18e2=Math[_0x7767b(0x154)](_0x3f18e2,VisuMZ['MessageCore'][_0x7767b(0x12c)]['General'][_0x7767b(0x195)])),_0x3f18e2-this['itemPadding']()*0x2;},Window_VictoryLevelUpActor['prototype'][_0x4462e2(0xa2)]=function(){const _0x58f849=_0x4462e2;return this[_0x58f849(0x150)]()['length']>0x0?TextManager[_0x58f849(0x1e0)](this[_0x58f849(0x20e)])['format'](this[_0x58f849(0x20e)][_0x58f849(0xde)]()):TextManager['quoteLevelUp'](this['_actor'])[_0x58f849(0x1f8)](this[_0x58f849(0x20e)]['name']());};