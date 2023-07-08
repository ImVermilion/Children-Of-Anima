//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.05;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.05] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Turn Order Display
 * 
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
 * 
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
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
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x54e9=['fontSize','opacity','Game_Battler_tpbSpeed','UpdateFrames','TurnOrderCTBGraphicIconIndex','updateTpbCastTimeCTB','TotalHorzSprites','item','IconIndex','ceil','max','BattleSystemCTB','isActiveTpb','blt','createBorderSprite','Game_Battler_tpbAcceleration','Scene_Battle_createAllWindows','numActions','initTpbChargeTime','getCurrentTurnOrderPositionCTB','_graphicIconIndex','_ctbTurnOrderFaceIndex','Enemies','addInnerChild','sort','Order','addChild','requestMotionRefresh','_dupe','_graphicHue','BorderThickness','_turnOrderInnerSprite','EscapeFailPenalty','Game_Battler_updateTpbCastTime','currentAction','bitmapWidth','NUM','BattleManager_processTurn','fontFace','getColor','Scene_Boot_onDatabaseLoaded','isAlive','note','clearTurnOrderCTBGraphics','maxBattleMembers','checkOpacity','isBattleSystemCTBTurnOrderVisible','_subject','_phase','%1BgColor2','EnemyBattlerFaceName','11rEqmqN','Game_Battler_applyTpbPenalty','_graphicSprite','Armor-%1-%2','createTurnOrderCTBGraphicFaceName','_isAppeared','startActorInput','updateSelectionEffect','TpbBaseSpeedCalcJS','name','_blendColor','Game_BattlerBase_appear','_ctbTurnOrderIconIndex','isAnyBattlerReadyCTB','Game_Battler_onRestrict','setCtbAfterSpeed','createGraphicSprite','updateTurnOrderCTB','battler','%1Mute','setHue','EnemyBattlerFontFace','_index','ready','battlerHue','isAttack','createBackgroundSprite','createAllWindows','round','requestFauxAnimation','Rush','tpbSpeed','ARRAYJSON','clearTpbChargeTimeCTB','placeGauge','concat','clearTpbChargeTime','iconHeight','initMembers','createCTBTurnOrderWindow','isSideView','tpbRequiredCastTime','CtbTurnOrderEnemyIcon','BattleManager_endAction','_ctbTurnOrderFaceName','createRateJS','After','CTB','anchor','updateOpacity','_fadeDuration','constructor','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','battlerName','postEndActionCTB','padding','Window_StatusBase_placeGauge','_graphicSv','height','return\x200','setItem','version','face','isPassCTB','ARRAYSTRUCT','min','length','rotateCTBSprites','setCtbCastTime','members','repositionLogWindowCTB','setTurnOrderCTB','createInitialPositions','faceHeight','_logWindow','description','mainFontFace','Game_Battler_initTpbChargeTime','children','updateTurn','isActing','EnemyBattlerType','563YkIHPe','createLetterSprite','updateBattleContainerOrder','updateTpb','_graphicEnemy','BattleManager_startBattle','351cPRWIK','Game_Battler_tpbRequiredCastTime','updateTpbChargeTimeCTB','isCtbCastingState','%1SystemBorder','DisplayOffsetX','toUpperCase','speed','reduce','_tpbState','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','_position','ctbStopped','applyItemUserEffect','svactor','isHorz','startAction','includes','top','Effect','push','changeIconGraphicBitmap','RepositionTopForHelp','_plural','_fadeTarget','turn','%1FlashColor','86HQsUBF','isEnemy','SubjectDistance','_letter','createOrderJS','CtbTurnOrderActorIcon','Mechanics','clamp','MAX_SAFE_INTEGER','Class-%1-%2','rotateCTBSprite','changeCtbCastTime','isSceneBattle','FaceName','startFade','traitObjects','ARRAYSTR','_turnOrderContainer','containerWindow','185167PZUzuc','JSON','prototype','_forcing','(?:GAUGE|TIME|SPEED)','_ctbTurnOrderVisible','_graphicType','parameters','bind','changeEnemyGraphicBitmap','subject','Actor-%1-%2','tpbRelativeSpeed','ParseSkillNotetags','updatePadding','%1\x20%2\x20%3','loadSvEnemy','Enemy','skills','Actor','BattleManager_battleSys','ShowMarkerBg','gradientFillRect','createTestBitmap','isCtbChargingState','ConvertParams','updateGraphicHue','_graphicFaceIndex','faceIndex','match','updateTurnOrder','Cast','STR','_homeX','updateVisibility','TpbAccelerationJS','process_VisuMZ_BattleSystemCTB_JS_Notetags','_homeY','charging','center','DisplayPosition','_actionBattlers','onTpbCharged','onDatabaseLoaded','OrderDirection','Game_Action_applyItemUserEffect','checkPosition','map','1ngIJXr','addLoadListener','changeSvActorGraphicBitmap','_isAlive','getNextSubject','EnemyBattlerFaceIndex','BattleManager_updateAllTpbBattlers','Charge','BattlerRelativeSpeedJS','isAppeared','_ctbAfterSpeed','ScreenBuffer','isTpb','getCtbCastTimeRate','setCtbChargeTime','call','updateTpbChargeTime','fillRect','_unit','256702YZxFFC','hide','TpbCastTimeJS','getStateTooltipBattler','Enemy-%1-%2','_tpbChargeTime','createTurnOrderCTBGraphicFaceIndex','BattleManager_startActorInput','removeCurrentAction','endAction','getBattleSystem','Game_Battler_clearTpbChargeTime','tpbBaseSpeed','processTurnCTB','bitmap','_letterSprite','processTurn','updatePosition','width','updateGraphic','_autoBattle','_windowLayer','filter','appear','%1TextColor','update','24835nbENIu','processTurnOrderChangeCTB','RepositionTopHelpY','applyGlobal','applyCTBPenalty','TurnOrderCTBGraphicFaceName','find','CtbTurnOrderClearEnemyGraphic','EVAL','changeCtbChargeTime','create','Skill-%1-%2','Game_Battler_tpbBaseSpeed','_backgroundSprite','isDead','ARRAYFUNC','MIN_SAFE_INTEGER','Game_Battler_tpbRelativeSpeed','aliveMembers','loadSvActor','indexOf','CtbTurnOrderEnemyFace','EnemyBattlerIcon','processUpdateGraphic','OrderJS','_ctbTurnOrderWindow','TurnOrderCTBGraphicFaceIndex','enemy','_tpbCastTime','Parse_Notetags_CreateJS','tpbAcceleration','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','%1SystemBg','InitialGaugeJS','compareBattlerSprites','exit','TurnOrderCTBGraphicType','STRUCT','applyTpbPenalty','FaceIndex','registerCommand','Game_System_initialize','_positionDuration','bitmapHeight','floor','_positionTargetX','allBattleMembers','applyItemBattleSystemCTBUserEffect','initTpbChargeTimeCTB','updateTpbBattler','rotateDupeNumber','EnemyBattlerFontSize','startBattle','isRestricted','attackSpeed','trim','defaultPosition','containerPosition','ctbTicksToGoal','changeFaceGraphicBitmap','ParseAllNotetags','loadEnemy','process_VisuMZ_BattleSystemCTB_CreateRegExp','Window_Help_setItem','Delay','hasSvBattler','time','canMove','_positionTargetY','RegExp','visible','actor','ticksLeft','%1FlashDuration','CtbTurnOrderClearActorGraphic','_onRestrictBypassCtbReset','right','setBlendColor','Game_Battler_updateTpbChargeTime','setCTBGraphicIconIndex','faceWidth','TotalVertSprites','Visible','prepare','createKeyJS','parse','svBattlerName','tpbChargeTime','onRestrict','_ctbTurnOrderGraphicType','updateTurnCTB','BattleManager_updateTurn','ctbTicksToGoalAddedCastTime','ActorBattlerType','isActor','format','setupTextPopup','icon','setText','34321GmrxoN','updateTpbCastTime','initialize','updateAllTpbBattlersCTB','Actors','updateAllTpbBattlers','isCTB','loadSystem','preEndActionCTB','applyGlobalBattleSystemCTBEffects','onCtbOrderChange','ARRAYEVAL','2140GXjlqf','status','ARRAYNUM','addChildAt','createChildren','battleSys','SpriteThin','SpriteLength','Game_BattlerBase_hide','createTurnOrderCTBGraphicType','%1PopupText','_graphicFaceName','drawText','initBattleSystemCTB','isInputting','State-%1-%2','Game_Action_applyGlobal','Settings','TurnOrder','%1AnimationID','ParseItemNotetags','clear','applyBattleSystemCTBUserEffect','BattleManager_isActiveTpb','#000000','_statusWindow','createTurnOrderCTBGraphicIconIndex','_scene','createBattlerSprites','RepositionLogWindow','isValid','139289LRCkWU','windowRect','updateLetter','bottom','casting'];const _0x1317=function(_0x562b13,_0x2d96cb){_0x562b13=_0x562b13-0x1e1;let _0x54e987=_0x54e9[_0x562b13];return _0x54e987;};const _0x1d2acc=_0x1317;(function(_0x53b16c,_0x57e55a){const _0x1aa9d6=_0x1317;while(!![]){try{const _0x17b377=parseInt(_0x1aa9d6(0x2f3))*parseInt(_0x1aa9d6(0x22d))+-parseInt(_0x1aa9d6(0x345))*parseInt(_0x1aa9d6(0x34b))+-parseInt(_0x1aa9d6(0x29c))*parseInt(_0x1aa9d6(0x366))+parseInt(_0x1aa9d6(0x2bb))+parseInt(_0x1aa9d6(0x379))*-parseInt(_0x1aa9d6(0x200))+parseInt(_0x1aa9d6(0x213))+parseInt(_0x1aa9d6(0x290));if(_0x17b377===_0x57e55a)break;else _0x53b16c['push'](_0x53b16c['shift']());}catch(_0x127897){_0x53b16c['push'](_0x53b16c['shift']());}}}(_0x54e9,0x215e5));var label='BattleSystemCTB',tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine','VisuMZ_1_BattleCore'],pluginData=$plugins[_0x1d2acc(0x229)](function(_0x3944d1){const _0x4e11d1=_0x1d2acc;return _0x3944d1[_0x4e11d1(0x29d)]&&_0x3944d1[_0x4e11d1(0x33e)][_0x4e11d1(0x35c)]('['+label+']');})[0x0];VisuMZ[label][_0x1d2acc(0x2ad)]=VisuMZ[label][_0x1d2acc(0x2ad)]||{},VisuMZ['ConvertParams']=function(_0x304baa,_0x45cc98){const _0x5deac7=_0x1d2acc;for(const _0xdd5905 in _0x45cc98){if(_0xdd5905['match'](/(.*):(.*)/i)){const _0xa53af3=String(RegExp['$1']),_0x12a8ad=String(RegExp['$2'])[_0x5deac7(0x351)]()[_0x5deac7(0x264)]();let _0x42b8ba,_0x22a0dc,_0x1febed;switch(_0x12a8ad){case _0x5deac7(0x2e4):_0x42b8ba=_0x45cc98[_0xdd5905]!==''?Number(_0x45cc98[_0xdd5905]):0x0;break;case _0x5deac7(0x29e):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x1dfc24=>Number(_0x1dfc24));break;case _0x5deac7(0x235):_0x42b8ba=_0x45cc98[_0xdd5905]!==''?eval(_0x45cc98[_0xdd5905]):null;break;case _0x5deac7(0x29b):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x4e73b9=>eval(_0x4e73b9));break;case _0x5deac7(0x37a):_0x42b8ba=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):'';break;case _0x5deac7(0x313):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x3d94de=>JSON['parse'](_0x3d94de));break;case'FUNC':_0x42b8ba=_0x45cc98[_0xdd5905]!==''?new Function(JSON['parse'](_0x45cc98[_0xdd5905])):new Function(_0x5deac7(0x32e));break;case _0x5deac7(0x23c):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x3035d7=>new Function(JSON[_0x5deac7(0x282)](_0x3035d7)));break;case _0x5deac7(0x1f0):_0x42b8ba=_0x45cc98[_0xdd5905]!==''?String(_0x45cc98[_0xdd5905]):'';break;case _0x5deac7(0x376):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON[_0x5deac7(0x282)](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x4bd5d3=>String(_0x4bd5d3));break;case _0x5deac7(0x252):_0x1febed=_0x45cc98[_0xdd5905]!==''?JSON['parse'](_0x45cc98[_0xdd5905]):{},_0x42b8ba=VisuMZ['ConvertParams']({},_0x1febed);break;case _0x5deac7(0x333):_0x22a0dc=_0x45cc98[_0xdd5905]!==''?JSON['parse'](_0x45cc98[_0xdd5905]):[],_0x42b8ba=_0x22a0dc[_0x5deac7(0x1ff)](_0x486051=>VisuMZ[_0x5deac7(0x1e9)]({},JSON['parse'](_0x486051)));break;default:continue;}_0x304baa[_0xa53af3]=_0x42b8ba;}}return _0x304baa;},(_0x524c33=>{const _0x57552c=_0x1d2acc,_0x426cce=_0x524c33[_0x57552c(0x2fc)];for(const _0x4830d6 of dependencies){if(!Imported[_0x4830d6]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x426cce,_0x4830d6)),SceneManager[_0x57552c(0x250)]();break;}}const _0x5d1360=_0x524c33['description'];if(_0x5d1360[_0x57552c(0x1ed)](/\[Version[ ](.*?)\]/i)){const _0x169d18=Number(RegExp['$1']);_0x169d18!==VisuMZ[label][_0x57552c(0x330)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x57552c(0x28c)](_0x426cce,_0x169d18)),SceneManager[_0x57552c(0x250)]());}if(_0x5d1360[_0x57552c(0x1ed)](/\[Tier[ ](\d+)\]/i)){const _0x138b5b=Number(RegExp['$1']);_0x138b5b<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x57552c(0x28c)](_0x426cce,_0x138b5b,tier)),SceneManager['exit']()):tier=Math['max'](_0x138b5b,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x524c33[_0x57552c(0x380)]);})(pluginData),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],_0x1d2acc(0x36b),_0x5e958d=>{const _0x2c50cf=_0x1d2acc;VisuMZ['ConvertParams'](_0x5e958d,_0x5e958d);const _0x2798b7=_0x5e958d[_0x2c50cf(0x294)],_0x5e3ce0=_0x5e958d[_0x2c50cf(0x2c8)];for(const _0x215b51 of _0x2798b7){const _0x4eded4=$gameActors[_0x2c50cf(0x274)](_0x215b51);if(!_0x4eded4)continue;_0x4eded4[_0x2c50cf(0x286)]='icon',_0x4eded4['_ctbTurnOrderIconIndex']=_0x5e3ce0;}}),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],'CtbTurnOrderActorFace',_0x543729=>{const _0x344a11=_0x1d2acc;VisuMZ[_0x344a11(0x1e9)](_0x543729,_0x543729);const _0x38ba4a=_0x543729[_0x344a11(0x294)],_0x13b1f2=_0x543729['FaceName'],_0xf75614=_0x543729[_0x344a11(0x254)];for(const _0xdfcdd5 of _0x38ba4a){const _0x5a4aaa=$gameActors['actor'](_0xdfcdd5);if(!_0x5a4aaa)continue;_0x5a4aaa['_ctbTurnOrderGraphicType']=_0x344a11(0x331),_0x5a4aaa[_0x344a11(0x31f)]=_0x13b1f2,_0x5a4aaa[_0x344a11(0x2d5)]=_0xf75614;}}),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],_0x1d2acc(0x277),_0x61a0be=>{const _0x33a1ce=_0x1d2acc;VisuMZ['ConvertParams'](_0x61a0be,_0x61a0be);const _0x4e5abe=_0x61a0be[_0x33a1ce(0x294)];for(const _0x2d3444 of _0x4e5abe){const _0x159b79=$gameActors[_0x33a1ce(0x274)](_0x2d3444);if(!_0x159b79)continue;_0x159b79[_0x33a1ce(0x2eb)]();}}),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],_0x1d2acc(0x31d),_0x2a483b=>{const _0x2d372c=_0x1d2acc;VisuMZ['ConvertParams'](_0x2a483b,_0x2a483b);const _0x5a98dd=_0x2a483b['Enemies'],_0x1b1b27=_0x2a483b[_0x2d372c(0x2c8)];for(const _0x3e5872 of _0x5a98dd){const _0x72c652=$gameTroop[_0x2d372c(0x338)]()[_0x3e5872];if(!_0x72c652)continue;_0x72c652[_0x2d372c(0x286)]='icon',_0x72c652[_0x2d372c(0x2ff)]=_0x1b1b27;}}),PluginManager['registerCommand'](pluginData['name'],_0x1d2acc(0x242),_0x273b05=>{const _0x4d7162=_0x1d2acc;VisuMZ[_0x4d7162(0x1e9)](_0x273b05,_0x273b05);const _0x493648=_0x273b05[_0x4d7162(0x2d6)],_0x3bd8dc=_0x273b05[_0x4d7162(0x373)],_0x2d73b5=_0x273b05[_0x4d7162(0x254)];for(const _0xb3add6 of _0x493648){const _0x3313d8=$gameTroop[_0x4d7162(0x338)]()[_0xb3add6];if(!_0x3313d8)continue;_0x3313d8[_0x4d7162(0x286)]=_0x4d7162(0x331),_0x3313d8[_0x4d7162(0x31f)]=_0x3bd8dc,_0x3313d8[_0x4d7162(0x2d5)]=_0xb3add6;}}),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],_0x1d2acc(0x234),_0x5038d8=>{const _0x229156=_0x1d2acc;VisuMZ[_0x229156(0x1e9)](_0x5038d8,_0x5038d8);const _0x223389=_0x5038d8[_0x229156(0x2d6)];for(const _0x5d3100 of _0x223389){const _0x27fab5=$gameTroop[_0x229156(0x338)]()[_0x5d3100];if(!_0x27fab5)continue;_0x27fab5[_0x229156(0x2eb)]();}}),PluginManager[_0x1d2acc(0x255)](pluginData[_0x1d2acc(0x2fc)],'SystemTurnOrderVisibility',_0x41a486=>{const _0x4c095d=_0x1d2acc;VisuMZ[_0x4c095d(0x1e9)](_0x41a486,_0x41a486);const _0x1b40c1=_0x41a486[_0x4c095d(0x27f)];$gameSystem['setBattleSystemCTBTurnOrderVisible'](_0x1b40c1);}),VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2e8)]=Scene_Boot['prototype'][_0x1d2acc(0x1fb)],Scene_Boot[_0x1d2acc(0x37b)][_0x1d2acc(0x1fb)]=function(){const _0x275ae3=_0x1d2acc;this['process_VisuMZ_BattleSystemCTB_CreateRegExp'](),VisuMZ[_0x275ae3(0x2cb)][_0x275ae3(0x2e8)][_0x275ae3(0x20f)](this),this['process_VisuMZ_BattleSystemCTB_JS_Notetags']();},VisuMZ[_0x1d2acc(0x2cb)]['RegExp']={},Scene_Boot[_0x1d2acc(0x37b)][_0x1d2acc(0x26b)]=function(){const _0x1ec680=_0x1d2acc,_0x2dc8f3=VisuMZ[_0x1ec680(0x2cb)][_0x1ec680(0x272)],_0x4b0d98=_0x1ec680(0x355),_0x29a092=[_0x1ec680(0x207),_0x1ec680(0x1ef),_0x1ec680(0x321)];for(const _0x23b1bf of _0x29a092){const _0x49759e=_0x4b0d98[_0x1ec680(0x28c)](_0x23b1bf['toUpperCase']()[_0x1ec680(0x264)](),'(?:CTB)',_0x1ec680(0x37d)),_0x172ed4=new RegExp(_0x49759e,'i');VisuMZ[_0x1ec680(0x2cb)][_0x1ec680(0x272)][_0x23b1bf]=_0x172ed4;}VisuMZ[_0x1ec680(0x2cb)][_0x1ec680(0x272)][_0x1ec680(0x245)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x1d2acc(0x37b)][_0x1d2acc(0x1f4)]=function(){const _0x587c0e=_0x1d2acc;if(VisuMZ[_0x587c0e(0x269)])return;const _0x4a1f36=$dataSkills[_0x587c0e(0x316)]($dataItems);for(const _0x2721dd of _0x4a1f36){if(!_0x2721dd)continue;VisuMZ[_0x587c0e(0x2cb)][_0x587c0e(0x24a)](_0x2721dd);}},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x386)]=VisuMZ[_0x1d2acc(0x386)],VisuMZ[_0x1d2acc(0x386)]=function(_0x59b4d2){const _0x33d00d=_0x1d2acc;VisuMZ[_0x33d00d(0x2cb)][_0x33d00d(0x386)][_0x33d00d(0x20f)](this,_0x59b4d2),VisuMZ[_0x33d00d(0x2cb)]['Parse_Notetags_CreateJS'](_0x59b4d2);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2b0)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x1d2acc(0x2b0)]=function(_0xd2fb66){const _0x52fc34=_0x1d2acc;VisuMZ[_0x52fc34(0x2cb)][_0x52fc34(0x2b0)][_0x52fc34(0x20f)](this,_0xd2fb66),VisuMZ[_0x52fc34(0x2cb)][_0x52fc34(0x24a)](_0xd2fb66);},VisuMZ[_0x1d2acc(0x2cb)]['Parse_Notetags_CreateJS']=function(_0x18cc17){const _0x3335a0=_0x1d2acc,_0x5573cd=['Charge',_0x3335a0(0x1ef),'After'];for(const _0x525583 of _0x5573cd){VisuMZ[_0x3335a0(0x2cb)][_0x3335a0(0x320)](_0x18cc17,_0x525583);}VisuMZ[_0x3335a0(0x2cb)]['createOrderJS'](_0x18cc17,_0x3335a0(0x2d9));},VisuMZ[_0x1d2acc(0x2cb)]['JS']={},VisuMZ[_0x1d2acc(0x2cb)]['createRateJS']=function(_0x25f166,_0x3ae4d5){const _0x2df885=_0x1d2acc,_0x2b870a=_0x25f166['note'];if(_0x2b870a[_0x2df885(0x1ed)](VisuMZ[_0x2df885(0x2cb)][_0x2df885(0x272)][_0x3ae4d5])){const _0x5248f9=String(RegExp['$1']),_0x16cef0=_0x2df885(0x24c)[_0x2df885(0x28c)](_0x5248f9,_0x3ae4d5),_0x46eafb=VisuMZ['BattleSystemCTB'][_0x2df885(0x281)](_0x25f166,_0x3ae4d5);VisuMZ['BattleSystemCTB']['JS'][_0x46eafb]=new Function(_0x16cef0);}},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x36a)]=function(_0x2a059b,_0x319ab8){const _0x13b6dc=_0x1d2acc,_0x4392e2=_0x2a059b[_0x13b6dc(0x2ea)];if(_0x4392e2[_0x13b6dc(0x1ed)](VisuMZ['BattleSystemCTB']['RegExp']['OrderJS'])){const _0x4d1fb9=String(RegExp['$1']),_0x2f4918=_0x13b6dc(0x327)[_0x13b6dc(0x28c)](_0x4d1fb9,_0x319ab8),_0xcfcdbc=VisuMZ[_0x13b6dc(0x2cb)][_0x13b6dc(0x281)](_0x2a059b,_0x319ab8);VisuMZ['BattleSystemCTB']['JS'][_0xcfcdbc]=new Function(_0x2f4918);}},VisuMZ['BattleSystemCTB'][_0x1d2acc(0x281)]=function(_0x3ec2ff,_0x109aa8){const _0x5cab75=_0x1d2acc;let _0x575095='';if($dataActors[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x384)[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataClasses[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x36f)[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataSkills[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x238)['format'](_0x3ec2ff['id'],_0x109aa8);if($dataItems[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095='Item-%1-%2'[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataWeapons[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095='Weapon-%1-%2'[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataArmors[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x2f6)[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataEnemies[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x217)[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);if($dataStates[_0x5cab75(0x35c)](_0x3ec2ff))_0x575095=_0x5cab75(0x2ab)[_0x5cab75(0x28c)](_0x3ec2ff['id'],_0x109aa8);return _0x575095;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x1e4)]=BattleManager['battleSys'],BattleManager[_0x1d2acc(0x2a1)]=function(){const _0x52cabd=_0x1d2acc;if(this[_0x52cabd(0x296)]())return _0x52cabd(0x322);return VisuMZ[_0x52cabd(0x2cb)][_0x52cabd(0x1e4)][_0x52cabd(0x20f)](this);},BattleManager[_0x1d2acc(0x296)]=function(){const _0x22dd29=_0x1d2acc;return $gameSystem[_0x22dd29(0x21d)]()===_0x22dd29(0x322);},VisuMZ[_0x1d2acc(0x2cb)]['BattleManager_isTpb']=BattleManager[_0x1d2acc(0x20c)],BattleManager[_0x1d2acc(0x20c)]=function(){const _0x11ecb5=_0x1d2acc;if(this['isCTB']())return!![];return VisuMZ['BattleSystemCTB']['BattleManager_isTpb'][_0x11ecb5(0x20f)](this);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2b3)]=BattleManager[_0x1d2acc(0x2cc)],BattleManager[_0x1d2acc(0x2cc)]=function(){const _0xe3b9db=_0x1d2acc;if(this[_0xe3b9db(0x296)]())return![];return VisuMZ[_0xe3b9db(0x2cb)][_0xe3b9db(0x2b3)][_0xe3b9db(0x20f)](this);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x288)]=BattleManager['updateTurn'],BattleManager[_0x1d2acc(0x342)]=function(_0x62cb4b){const _0x22ea21=_0x1d2acc;this['isCTB']()?this[_0x22ea21(0x287)](_0x62cb4b):VisuMZ[_0x22ea21(0x2cb)][_0x22ea21(0x288)][_0x22ea21(0x20f)](this,_0x62cb4b);},BattleManager[_0x1d2acc(0x287)]=function(_0x5032ae){const _0x5307ae=_0x1d2acc;$gameParty[_0x5307ae(0x2db)]();for(;;){if(this[_0x5307ae(0x300)]())break;_0x5032ae&&this[_0x5307ae(0x348)](),!this[_0x5307ae(0x2ef)]&&(this[_0x5307ae(0x2ef)]=this[_0x5307ae(0x204)]()),this[_0x5307ae(0x2ef)]&&(this[_0x5307ae(0x223)](),this[_0x5307ae(0x304)]());}},VisuMZ[_0x1d2acc(0x2cb)]['BattleManager_processTurn']=BattleManager[_0x1d2acc(0x223)],BattleManager[_0x1d2acc(0x223)]=function(){const _0x8ffb5c=_0x1d2acc;this[_0x8ffb5c(0x296)]()?this['processTurnCTB']():VisuMZ[_0x8ffb5c(0x2cb)][_0x8ffb5c(0x2e5)][_0x8ffb5c(0x20f)](this);},BattleManager[_0x1d2acc(0x220)]=function(){const _0x110083=_0x1d2acc,_0x3c64e2=this[_0x110083(0x2ef)],_0x56f320=_0x3c64e2[_0x110083(0x2e2)]();_0x56f320?(_0x56f320[_0x110083(0x280)](),_0x56f320[_0x110083(0x2ba)]()?(this[_0x110083(0x35b)](),_0x3c64e2[_0x110083(0x21b)]()):(_0x3c64e2[_0x110083(0x21b)](),_0x3c64e2[_0x110083(0x302)](0x0),this[_0x110083(0x21c)](),this['_subject']=null)):(_0x3c64e2[_0x110083(0x302)](0x0),this[_0x110083(0x21c)](),this[_0x110083(0x2ef)]=null);},BattleManager[_0x1d2acc(0x300)]=function(){const _0x16c192=_0x1d2acc;if(this['_subject'])return!![];if(this[_0x16c192(0x2f0)]!==_0x16c192(0x364))return!![];if(this[_0x16c192(0x2aa)]())return!![];if(this[_0x16c192(0x227)])return![];const _0x197386=this['allBattleMembers']()[_0x16c192(0x229)](_0x51fd5a=>_0x51fd5a&&_0x51fd5a[_0x16c192(0x209)]());return _0x197386['some'](_0x306491=>_0x306491['isPassCTB']());},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x332)]=function(){const _0xfeea3c=_0x1d2acc;if(this['isTpbCharged']())return!![];if(this['isTpbReady']())return!![];if(this[_0xfeea3c(0x343)]())return!![];return![];},VisuMZ['BattleSystemCTB'][_0x1d2acc(0x206)]=BattleManager[_0x1d2acc(0x295)],BattleManager[_0x1d2acc(0x295)]=function(){const _0x4b7dad=_0x1d2acc;this[_0x4b7dad(0x296)]()?this[_0x4b7dad(0x293)]():VisuMZ[_0x4b7dad(0x2cb)]['BattleManager_updateAllTpbBattlers']['call'](this);},BattleManager[_0x1d2acc(0x293)]=function(){const _0x3f8898=_0x1d2acc,_0x1aa670=this[_0x3f8898(0x25b)]();_0x1aa670[_0x3f8898(0x2d8)]((_0x3ea4df,_0x701800)=>{const _0x12ef45=_0x3f8898;return _0x3ea4df[_0x12ef45(0x267)](0x1)-_0x701800[_0x12ef45(0x267)](0x1);});for(const _0x1ef518 of _0x1aa670){this[_0x3f8898(0x25e)](_0x1ef518);}},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x34a)]=BattleManager[_0x1d2acc(0x261)],BattleManager['startBattle']=function(){const _0x411454=_0x1d2acc;VisuMZ[_0x411454(0x2cb)][_0x411454(0x34a)]['call'](this),this['updateTurnOrderCTB'](!![]);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x31e)]=BattleManager['endAction'],BattleManager[_0x1d2acc(0x21c)]=function(){const _0x5e9926=_0x1d2acc;this['preEndActionCTB'](),VisuMZ['BattleSystemCTB'][_0x5e9926(0x31e)][_0x5e9926(0x20f)](this),this[_0x5e9926(0x329)]();},BattleManager[_0x1d2acc(0x298)]=function(){const _0x256f02=_0x1d2acc;if(!this[_0x256f02(0x296)]())return;this[_0x256f02(0x2ef)]&&this['_subject'][_0x256f02(0x2d1)]()<=0x0&&this[_0x256f02(0x336)]();},BattleManager['postEndActionCTB']=function(){const _0x5a81ed=_0x1d2acc;if(!this['isCTB']())return;this[_0x5a81ed(0x304)](),this[_0x5a81ed(0x2ef)]&&this[_0x5a81ed(0x223)]();},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x21a)]=BattleManager[_0x1d2acc(0x2f9)],BattleManager['startActorInput']=function(){const _0x3dc306=_0x1d2acc;this[_0x3dc306(0x304)](),VisuMZ['BattleSystemCTB'][_0x3dc306(0x21a)][_0x3dc306(0x20f)](this);},BattleManager[_0x1d2acc(0x304)]=function(_0x496501){const _0x3290d3=_0x1d2acc;if(!this[_0x3290d3(0x296)]())return;const _0x5df3e4=SceneManager[_0x3290d3(0x2b7)][_0x3290d3(0x246)];if(!_0x5df3e4)return;_0x5df3e4[_0x3290d3(0x1ee)](_0x496501);},BattleManager['rotateCTBSprites']=function(){const _0x54fcee=_0x1d2acc;if(!this[_0x54fcee(0x296)]())return;const _0x3537cc=SceneManager[_0x54fcee(0x2b7)][_0x54fcee(0x246)];if(!_0x3537cc)return;_0x3537cc[_0x54fcee(0x370)](this[_0x54fcee(0x2ef)]);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x256)]=Game_System['prototype']['initialize'],Game_System[_0x1d2acc(0x37b)][_0x1d2acc(0x292)]=function(){const _0x1c202b=_0x1d2acc;VisuMZ[_0x1c202b(0x2cb)][_0x1c202b(0x256)][_0x1c202b(0x20f)](this),this['initBattleSystemCTB']();},Game_System['prototype'][_0x1d2acc(0x2a9)]=function(){this['_ctbTurnOrderVisible']=!![];},Game_System[_0x1d2acc(0x37b)]['isBattleSystemCTBTurnOrderVisible']=function(){const _0x2c245a=_0x1d2acc;return this[_0x2c245a(0x37e)]===undefined&&this[_0x2c245a(0x2a9)](),this[_0x2c245a(0x37e)];},Game_System[_0x1d2acc(0x37b)]['setBattleSystemCTBTurnOrderVisible']=function(_0x372747){const _0x5f5f97=_0x1d2acc;this[_0x5f5f97(0x37e)]===undefined&&this[_0x5f5f97(0x2a9)](),this[_0x5f5f97(0x37e)]=_0x372747;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x1fd)]=Game_Action[_0x1d2acc(0x37b)]['applyItemUserEffect'],Game_Action[_0x1d2acc(0x37b)][_0x1d2acc(0x358)]=function(_0x403afe){const _0x43df9b=_0x1d2acc;VisuMZ[_0x43df9b(0x2cb)]['Game_Action_applyItemUserEffect'][_0x43df9b(0x20f)](this,_0x403afe),this[_0x43df9b(0x2b2)](_0x403afe);},Game_Action['prototype']['applyBattleSystemCTBUserEffect']=function(_0x4a49c5){const _0x4bce83=_0x1d2acc;if(!SceneManager[_0x4bce83(0x372)]())return;if(!BattleManager[_0x4bce83(0x296)]())return;if(this[_0x4bce83(0x2c7)]())this[_0x4bce83(0x25c)](_0x4a49c5);},Game_Action[_0x1d2acc(0x37b)][_0x1d2acc(0x25c)]=function(_0x379757){const _0x2c7459=_0x1d2acc,_0x15b6d8=this['item']()[_0x2c7459(0x2ea)];if(_0x379757[_0x2c7459(0x1e8)]()){const _0x2f660c=VisuMZ[_0x2c7459(0x2cb)][_0x2c7459(0x281)](this[_0x2c7459(0x2c7)](),_0x2c7459(0x207));if(VisuMZ[_0x2c7459(0x2cb)]['JS'][_0x2f660c]){const _0x57900b=VisuMZ[_0x2c7459(0x2cb)]['JS'][_0x2f660c][_0x2c7459(0x20f)](this,this['subject'](),_0x379757);_0x379757[_0x2c7459(0x20e)](_0x57900b);}_0x15b6d8[_0x2c7459(0x1ed)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x379757['setCtbChargeTime'](Number(RegExp['$1'])*0.01),_0x15b6d8[_0x2c7459(0x1ed)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x379757[_0x2c7459(0x236)](Number(RegExp['$1'])*0.01);}else{if(_0x379757[_0x2c7459(0x34e)]()){const _0x367146=VisuMZ[_0x2c7459(0x2cb)][_0x2c7459(0x281)](this['item'](),_0x2c7459(0x1ef));if(VisuMZ[_0x2c7459(0x2cb)]['JS'][_0x367146]){const _0x4f8bc0=VisuMZ[_0x2c7459(0x2cb)]['JS'][_0x367146]['call'](this,this[_0x2c7459(0x383)](),_0x379757);_0x379757[_0x2c7459(0x337)](_0x4f8bc0);}_0x15b6d8['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x379757[_0x2c7459(0x337)](Number(RegExp['$1'])*0.01),_0x15b6d8['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x379757[_0x2c7459(0x371)](Number(RegExp['$1'])*0.01);}}const _0x550ede=VisuMZ[_0x2c7459(0x2cb)][_0x2c7459(0x281)](this[_0x2c7459(0x2c7)](),_0x2c7459(0x2d9));if(VisuMZ['BattleSystemCTB']['JS'][_0x550ede]){const _0x33a141=VisuMZ[_0x2c7459(0x2cb)]['JS'][_0x550ede][_0x2c7459(0x20f)](this,this[_0x2c7459(0x383)](),_0x379757);_0x379757[_0x2c7459(0x33a)](_0x33a141);}_0x15b6d8[_0x2c7459(0x1ed)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)&&_0x379757[_0x2c7459(0x33a)](Number(RegExp['$1'])),_0x15b6d8[_0x2c7459(0x1ed)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&_0x379757['changeTurnOrderByCTB'](Number(RegExp['$1']));},VisuMZ['BattleSystemCTB'][_0x1d2acc(0x2ac)]=Game_Action[_0x1d2acc(0x37b)][_0x1d2acc(0x230)],Game_Action['prototype']['applyGlobal']=function(){const _0x25d951=_0x1d2acc;VisuMZ[_0x25d951(0x2cb)][_0x25d951(0x2ac)][_0x25d951(0x20f)](this),this[_0x25d951(0x299)]();},Game_Action[_0x1d2acc(0x37b)][_0x1d2acc(0x299)]=function(){const _0x5c3fcf=_0x1d2acc;if(!this[_0x5c3fcf(0x2c7)]())return;if(!BattleManager[_0x5c3fcf(0x296)]())return;const _0x3496ab=this[_0x5c3fcf(0x2c7)]()[_0x5c3fcf(0x2ea)];let _0x35eb55=0x0;this[_0x5c3fcf(0x37c)]&&(_0x35eb55=this[_0x5c3fcf(0x383)]()[_0x5c3fcf(0x218)]);const _0x2ade1c=VisuMZ[_0x5c3fcf(0x2cb)]['createKeyJS'](this[_0x5c3fcf(0x2c7)](),'After');VisuMZ[_0x5c3fcf(0x2cb)]['JS'][_0x2ade1c]&&(_0x35eb55+=VisuMZ['BattleSystemCTB']['JS'][_0x2ade1c][_0x5c3fcf(0x20f)](this,this[_0x5c3fcf(0x383)](),this[_0x5c3fcf(0x383)]()));let _0x56e964=this[_0x5c3fcf(0x2c7)]()[_0x5c3fcf(0x352)]>0x0?this[_0x5c3fcf(0x2c7)]()[_0x5c3fcf(0x352)]:0x0;if(this[_0x5c3fcf(0x30c)]())_0x56e964+=this[_0x5c3fcf(0x383)]()[_0x5c3fcf(0x263)]();_0x35eb55+=(_0x56e964/0xfa0)[_0x5c3fcf(0x36d)](0x0,0x1);this[_0x5c3fcf(0x2c7)]()['note']['match'](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x35eb55+=Number(RegExp['$1'])*0.01);const _0x79d1e1=this[_0x5c3fcf(0x383)]()[_0x5c3fcf(0x375)]()[_0x5c3fcf(0x316)](this['subject']()[_0x5c3fcf(0x1e2)]()),_0x109566=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x7d1ae9=_0x79d1e1[_0x5c3fcf(0x1ff)](_0x2c60ac=>_0x2c60ac&&_0x2c60ac[_0x5c3fcf(0x2ea)][_0x5c3fcf(0x1ed)](_0x109566)?Number(RegExp['$1'])*0.01:0x0);_0x35eb55=_0x7d1ae9[_0x5c3fcf(0x353)]((_0x25546c,_0x4eaedc)=>_0x25546c+_0x4eaedc,_0x35eb55),this['subject']()[_0x5c3fcf(0x302)](_0x35eb55);},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x20e)]=function(_0x30865b){const _0x54513a=_0x1d2acc;this[_0x54513a(0x218)]=_0x30865b;},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x236)]=function(_0xd3f47){const _0x2b2bb3=_0x1d2acc;this[_0x2b2bb3(0x20e)](this[_0x2b2bb3(0x218)]+_0xd3f47);},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x337)]=function(_0x33962a){const _0x70ce42=_0x1d2acc,_0x412be9=this[_0x70ce42(0x31c)]();this[_0x70ce42(0x249)]=_0x412be9*_0x33962a;},Game_BattlerBase[_0x1d2acc(0x37b)]['changeCtbCastTime']=function(_0x56a444){const _0x1ca2ca=_0x1d2acc,_0x5c3b6f=this[_0x1ca2ca(0x31c)](),_0x176f81=_0x5c3b6f*_0x56a444;this['_tpbCastTime']=this[_0x1ca2ca(0x249)]+_0x176f81;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2fe)]=Game_BattlerBase[_0x1d2acc(0x37b)]['appear'],Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x22a)]=function(){const _0x22754d=_0x1d2acc;VisuMZ[_0x22754d(0x2cb)][_0x22754d(0x2fe)][_0x22754d(0x20f)](this),BattleManager['updateTurnOrderCTB']();},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2a4)]=Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x214)],Game_BattlerBase['prototype'][_0x1d2acc(0x214)]=function(){const _0x51d501=_0x1d2acc;VisuMZ[_0x51d501(0x2cb)][_0x51d501(0x2a4)][_0x51d501(0x20f)](this),BattleManager['updateTurnOrderCTB']();},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x2eb)]=function(){const _0x5a2f17=_0x1d2acc;delete this[_0x5a2f17(0x286)],delete this[_0x5a2f17(0x31f)],delete this[_0x5a2f17(0x2d5)],delete this[_0x5a2f17(0x2ff)];},Game_BattlerBase['prototype'][_0x1d2acc(0x251)]=function(){const _0x469b8b=_0x1d2acc;return this[_0x469b8b(0x286)]===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x469b8b(0x2a5)]()),this[_0x469b8b(0x286)];},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x2a5)]=function(){const _0x4fbfb2=_0x1d2acc;return Window_CTB_TurnOrder['Settings'][_0x4fbfb2(0x344)];},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x232)]=function(){const _0x55cb1e=_0x1d2acc;return this[_0x55cb1e(0x31f)]===undefined&&(this[_0x55cb1e(0x31f)]=this[_0x55cb1e(0x2f7)]()),this[_0x55cb1e(0x31f)];},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x2f7)]=function(){const _0x30217f=_0x1d2acc;return Window_CTB_TurnOrder[_0x30217f(0x2ad)][_0x30217f(0x2f2)];},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x247)]=function(){const _0x142bf9=_0x1d2acc;return this[_0x142bf9(0x2d5)]===undefined&&(this[_0x142bf9(0x2d5)]=this[_0x142bf9(0x219)]()),this[_0x142bf9(0x2d5)];},Game_BattlerBase['prototype'][_0x1d2acc(0x219)]=function(){const _0x437fbd=_0x1d2acc;return Window_CTB_TurnOrder[_0x437fbd(0x2ad)][_0x437fbd(0x205)];},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x2c4)]=function(){const _0x400d8a=_0x1d2acc;return this[_0x400d8a(0x2ff)]===undefined&&(this['_ctbTurnOrderIconIndex']=this['createTurnOrderCTBGraphicIconIndex']()),this['_ctbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x1d2acc(0x2b6)]=function(){const _0x241043=_0x1d2acc;return Window_CTB_TurnOrder[_0x241043(0x2ad)][_0x241043(0x243)];},Game_BattlerBase['prototype'][_0x1d2acc(0x27c)]=function(_0x44bff7){const _0x40c4a7=_0x1d2acc;this[_0x40c4a7(0x2ff)]=_0x44bff7;},Game_BattlerBase[_0x1d2acc(0x37b)]['ctbTicksToGoal']=function(_0x2b6e76,_0x55b5f5){const _0x5a424f=_0x1d2acc;if(this[_0x5a424f(0x23b)]())return Number[_0x5a424f(0x36e)];if(!this[_0x5a424f(0x209)]())return Number['MAX_SAFE_INTEGER'];if(_0x2b6e76===0x1&&!_0x55b5f5){if(this===BattleManager['_subject'])return Number[_0x5a424f(0x23d)]/0xa;if(this===BattleManager[_0x5a424f(0x274)]())return Number['MIN_SAFE_INTEGER']/0xa;if(BattleManager[_0x5a424f(0x1f9)]&&BattleManager[_0x5a424f(0x1f9)][_0x5a424f(0x35c)](this)){let _0x487208=Number[_0x5a424f(0x23d)]/0x1388;return _0x487208+=BattleManager[_0x5a424f(0x1f9)][_0x5a424f(0x241)](this)*0x5,_0x487208;}}return _0x2b6e76-=this[_0x5a424f(0x284)](),_0x2b6e76/=this[_0x5a424f(0x24b)](),_0x2b6e76+=this[_0x5a424f(0x289)](),_0x2b6e76;},Game_BattlerBase[_0x1d2acc(0x37b)][_0x1d2acc(0x289)]=function(){const _0x57f1d0=_0x1d2acc;return this[_0x57f1d0(0x354)]===_0x57f1d0(0x2bf)?(this[_0x57f1d0(0x31c)]()-this[_0x57f1d0(0x249)])/this[_0x57f1d0(0x24b)]():0x0;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x340)]=Game_Battler['prototype']['initTpbChargeTime'],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2d2)]=function(_0x4ec10b){const _0x8d6355=_0x1d2acc;BattleManager[_0x8d6355(0x296)]()?this[_0x8d6355(0x25d)](_0x4ec10b):VisuMZ[_0x8d6355(0x2cb)][_0x8d6355(0x340)][_0x8d6355(0x20f)](this,_0x4ec10b);},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x25d)]=function(_0x16375f){const _0x8206a7=_0x1d2acc,_0xfccc3b=VisuMZ[_0x8206a7(0x2cb)][_0x8206a7(0x2ad)][_0x8206a7(0x36c)];let _0xd3cc8e=this[_0x8206a7(0x385)]()*eval(_0xfccc3b[_0x8206a7(0x24e)]);const _0x46df39=this[_0x8206a7(0x375)]()[_0x8206a7(0x316)](this[_0x8206a7(0x1e2)]()),_0x2e6b26=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0xc772e=_0x46df39[_0x8206a7(0x1ff)](_0x4e7dd6=>_0x4e7dd6&&_0x4e7dd6[_0x8206a7(0x2ea)][_0x8206a7(0x1ed)](_0x2e6b26)?Number(RegExp['$1'])*0.01:0x0);_0xd3cc8e=_0xc772e[_0x8206a7(0x353)]((_0x5b681f,_0x347285)=>_0x5b681f+_0x347285,_0xd3cc8e),this[_0x8206a7(0x354)]=_0x8206a7(0x1f6),this[_0x8206a7(0x218)]=(_0x16375f?0x1:_0xd3cc8e)[_0x8206a7(0x36d)](0x0,0x1),this[_0x8206a7(0x262)]()&&(this[_0x8206a7(0x218)]=0x0);},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x1e8)]=function(){const _0x1bd22a=_0x1d2acc;return this[_0x1bd22a(0x354)]===_0x1bd22a(0x1f6);},Game_Battler['prototype'][_0x1d2acc(0x34e)]=function(){const _0x16ce80=_0x1d2acc;return this['_tpbState']===_0x16ce80(0x2bf)&&this[_0x16ce80(0x2e2)]()&&this['currentAction']()[_0x16ce80(0x2c7)]()&&this[_0x16ce80(0x2e2)]()[_0x16ce80(0x2c7)]()[_0x16ce80(0x352)]<0x0;},Game_BattlerBase['prototype'][_0x1d2acc(0x20d)]=function(){const _0x90e78e=_0x1d2acc;return this[_0x90e78e(0x34e)]()?this[_0x90e78e(0x249)]/this[_0x90e78e(0x31c)]():0x0;},Game_Battler['prototype'][_0x1d2acc(0x357)]=function(){const _0x5c0854=_0x1d2acc;return!this[_0x5c0854(0x270)]();},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x302)]=function(_0x25bc90){this['_ctbAfterSpeed']=_0x25bc90;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x301)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x285)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x285)]=function(){const _0x2becb8=_0x1d2acc;this[_0x2becb8(0x278)]=BattleManager[_0x2becb8(0x296)](),VisuMZ[_0x2becb8(0x2cb)]['Game_Battler_onRestrict'][_0x2becb8(0x20f)](this),this[_0x2becb8(0x278)]=undefined;},VisuMZ['BattleSystemCTB'][_0x1d2acc(0x21e)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x317)],Game_Battler[_0x1d2acc(0x37b)]['clearTpbChargeTime']=function(){const _0x2435b4=_0x1d2acc;BattleManager['isCTB']()?this['clearTpbChargeTimeCTB']():VisuMZ[_0x2435b4(0x2cb)][_0x2435b4(0x21e)][_0x2435b4(0x20f)](this);},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x314)]=function(){const _0x33ac81=_0x1d2acc;if(this['_onRestrictBypassCtbReset'])return;this[_0x33ac81(0x354)]=_0x33ac81(0x1f6),this['_tpbChargeTime']-=0x1,this[_0x33ac81(0x218)]+=this[_0x33ac81(0x20a)]||0x0;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2f4)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x253)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x253)]=function(){const _0x519376=_0x1d2acc;BattleManager['isCTB']()?this[_0x519376(0x231)]():VisuMZ[_0x519376(0x2cb)][_0x519376(0x2f4)][_0x519376(0x20f)](this);},Game_Battler['prototype']['applyCTBPenalty']=function(){const _0x1011ce=_0x1d2acc;this[_0x1011ce(0x354)]=_0x1011ce(0x1f6),this[_0x1011ce(0x218)]+=VisuMZ[_0x1011ce(0x2cb)][_0x1011ce(0x2ad)][_0x1011ce(0x36c)][_0x1011ce(0x2e0)]||0x0;},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2c2)]=Game_Battler[_0x1d2acc(0x37b)]['tpbSpeed'],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x312)]=function(){const _0x7850dc=_0x1d2acc;return BattleManager['isCTB']()?VisuMZ[_0x7850dc(0x2cb)]['Settings'][_0x7850dc(0x36c)]['TpbSpeedCalcJS'][_0x7850dc(0x20f)](this,this):VisuMZ[_0x7850dc(0x2cb)][_0x7850dc(0x2c2)]['call'](this);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x239)]=Game_Battler['prototype'][_0x1d2acc(0x21f)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x21f)]=function(){const _0x20ebad=_0x1d2acc;return BattleManager[_0x20ebad(0x296)]()?VisuMZ['BattleSystemCTB'][_0x20ebad(0x2ad)][_0x20ebad(0x36c)][_0x20ebad(0x2fb)][_0x20ebad(0x20f)](this,this):VisuMZ[_0x20ebad(0x2cb)]['Game_Battler_tpbBaseSpeed'][_0x20ebad(0x20f)](this);},VisuMZ[_0x1d2acc(0x2cb)]['Game_Battler_tpbRelativeSpeed']=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x385)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x385)]=function(){const _0x51feb2=_0x1d2acc;return BattleManager['isCTB']()?VisuMZ[_0x51feb2(0x2cb)][_0x51feb2(0x2ad)]['Mechanics'][_0x51feb2(0x208)][_0x51feb2(0x20f)](this,this):VisuMZ[_0x51feb2(0x2cb)][_0x51feb2(0x23e)][_0x51feb2(0x20f)](this);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2cf)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x24b)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x24b)]=function(){const _0x1d0ce6=_0x1d2acc;if(BattleManager[_0x1d0ce6(0x296)]()){let _0x1f58fc=VisuMZ[_0x1d0ce6(0x2cb)][_0x1d0ce6(0x2ad)][_0x1d0ce6(0x36c)][_0x1d0ce6(0x1f3)][_0x1d0ce6(0x20f)](this,this);const _0xfd9aaf=0x0;return _0x1f58fc+_0xfd9aaf;}else return VisuMZ[_0x1d0ce6(0x2cb)]['Game_Battler_tpbAcceleration'][_0x1d0ce6(0x20f)](this);},VisuMZ['BattleSystemCTB'][_0x1d2acc(0x34c)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x31c)],Game_Battler['prototype']['tpbRequiredCastTime']=function(){const _0x3dcea7=_0x1d2acc;return BattleManager['isCTB']()?VisuMZ['BattleSystemCTB']['Settings']['Mechanics'][_0x3dcea7(0x215)][_0x3dcea7(0x20f)](this,this):VisuMZ[_0x3dcea7(0x2cb)][_0x3dcea7(0x34c)]['call'](this);},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2d3)]=function(){const _0x4b52e0=_0x1d2acc,_0x27bbe1=SceneManager['_scene'][_0x4b52e0(0x246)];if(!_0x27bbe1)return-0x1;const _0x1e39be=_0x27bbe1[_0x4b52e0(0x377)];if(!_0x1e39be)return-0x1;const _0x16015c=_0x1e39be[_0x4b52e0(0x233)](_0x24023a=>_0x24023a['battler']()===this);return _0x1e39be['indexOf'](_0x16015c);},Game_Battler[_0x1d2acc(0x37b)]['changeTurnOrderByCTB']=function(_0x5ad1fc){const _0x4baad2=_0x1d2acc;if(!BattleManager[_0x4baad2(0x296)]())return;if(!SceneManager[_0x4baad2(0x372)]())return;if(this===BattleManager[_0x4baad2(0x274)]())return;if(this===BattleManager[_0x4baad2(0x2ef)])return;const _0x3bdde1=this[_0x4baad2(0x2d3)]();if(_0x3bdde1<0x0)return;this[_0x4baad2(0x33a)](_0x3bdde1+_0x5ad1fc);},Game_Battler['prototype'][_0x1d2acc(0x33a)]=function(_0x4d9284){const _0x4b4fb2=_0x1d2acc;if(!BattleManager[_0x4b4fb2(0x296)]())return;if(!SceneManager[_0x4b4fb2(0x372)]())return;if(this===BattleManager[_0x4b4fb2(0x274)]())return;if(this===BattleManager['_subject'])return;_0x4d9284=Math['max'](_0x4d9284,0x1),this['processTurnOrderChangeCTB'](_0x4d9284);},Game_Battler['prototype'][_0x1d2acc(0x22e)]=function(_0x445478){const _0x11c66a=_0x1d2acc;if(!BattleManager[_0x11c66a(0x296)]())return;if(!SceneManager[_0x11c66a(0x372)]())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x11c66a(0x2ef)])return;const _0x43fb4b=SceneManager[_0x11c66a(0x2b7)][_0x11c66a(0x246)];if(!_0x43fb4b)return;const _0x14d799=_0x43fb4b[_0x11c66a(0x377)];if(!_0x14d799)return;const _0x29952b=this[_0x11c66a(0x2d3)]();_0x29952b!==_0x445478&&this[_0x11c66a(0x29a)](_0x445478-_0x29952b);let _0x5294ad=_0x445478,_0x120afb=_0x445478;_0x29952b>_0x445478?_0x5294ad-=0x1:_0x120afb+=0x1;const _0x5e4f59=_0x14d799[_0x5294ad][_0x11c66a(0x275)](!![]),_0x409009=_0x14d799[_0x120afb][_0x11c66a(0x275)](!![]),_0x419676=(_0x5e4f59+_0x409009)/0x2;let _0x16415d=_0x419676*this[_0x11c66a(0x24b)]();if(this[_0x11c66a(0x354)]==='charging')this['_tpbChargeTime']=0x1-_0x16415d;else this[_0x11c66a(0x354)]===_0x11c66a(0x2bf)&&(this['_tpbCastTime']=this['tpbRequiredCastTime']()-_0x16415d);BattleManager[_0x11c66a(0x1f9)]=[],BattleManager[_0x11c66a(0x304)]();},Game_Battler['prototype'][_0x1d2acc(0x29a)]=function(_0x4330b2){const _0x2f334a=_0x1d2acc,_0x4134e1=VisuMZ[_0x2f334a(0x2cb)][_0x2f334a(0x2ad)][_0x2f334a(0x35e)],_0x3137b4=_0x4330b2>0x0?_0x2f334a(0x26d):_0x2f334a(0x311);if(_0x4134e1[_0x2f334a(0x2af)[_0x2f334a(0x28c)](_0x3137b4)]){const _0x414465=_0x4134e1[_0x2f334a(0x2af)[_0x2f334a(0x28c)](_0x3137b4)],_0x3407da=_0x4134e1['%1Mirror'[_0x2f334a(0x28c)](_0x3137b4)],_0x1dedea=_0x4134e1[_0x2f334a(0x306)[_0x2f334a(0x28c)](_0x3137b4)];$gameTemp[_0x2f334a(0x310)]([this],_0x414465,_0x3407da,_0x1dedea);}if(this[_0x2f334a(0x305)]()&&_0x4134e1[_0x2f334a(0x2a6)['format'](_0x3137b4)][_0x2f334a(0x335)]>0x0){const _0x2eb817=_0x4134e1[_0x2f334a(0x2a6)[_0x2f334a(0x28c)](_0x3137b4)],_0x1a8d4c={'textColor':ColorManager[_0x2f334a(0x2e7)](_0x4134e1[_0x2f334a(0x22b)[_0x2f334a(0x28c)](_0x3137b4)]),'flashColor':_0x4134e1[_0x2f334a(0x365)['format'](_0x3137b4)],'flashDuration':_0x4134e1[_0x2f334a(0x276)[_0x2f334a(0x28c)](_0x3137b4)]};this[_0x2f334a(0x28d)](_0x2eb817,_0x1a8d4c);}},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x27b)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x210)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x210)]=function(){const _0x41cdab=_0x1d2acc;BattleManager[_0x41cdab(0x296)]()?this[_0x41cdab(0x34d)]():VisuMZ['BattleSystemCTB'][_0x41cdab(0x27b)][_0x41cdab(0x20f)](this);},Game_Battler['prototype'][_0x1d2acc(0x34d)]=function(){const _0x1e0195=_0x1d2acc;this[_0x1e0195(0x354)]===_0x1e0195(0x1f6)&&(this['_tpbChargeTime']+=this[_0x1e0195(0x24b)](),this[_0x1e0195(0x218)]>=0x1&&this[_0x1e0195(0x1fa)]());},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2e1)]=Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x291)],Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x291)]=function(){const _0x39811d=_0x1d2acc;BattleManager[_0x39811d(0x296)]()?this[_0x39811d(0x2c5)]():VisuMZ[_0x39811d(0x2cb)][_0x39811d(0x2e1)][_0x39811d(0x20f)](this);},Game_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2c5)]=function(){const _0x19b6ff=_0x1d2acc;this[_0x19b6ff(0x354)]==='casting'&&(this['_tpbCastTime']+=this[_0x19b6ff(0x24b)](),this['_tpbCastTime']>=this[_0x19b6ff(0x31c)]()&&(this[_0x19b6ff(0x354)]=_0x19b6ff(0x30a)));},Game_Actor[_0x1d2acc(0x37b)][_0x1d2acc(0x2a5)]=function(){const _0x36fa44=_0x1d2acc,_0x418e1d=this[_0x36fa44(0x274)]()[_0x36fa44(0x2ea)];if(_0x418e1d[_0x36fa44(0x1ed)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x36fa44(0x331);else{if(_0x418e1d[_0x36fa44(0x1ed)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x36fa44(0x28e);}return Window_CTB_TurnOrder[_0x36fa44(0x2ad)][_0x36fa44(0x28a)];},Game_Actor[_0x1d2acc(0x37b)][_0x1d2acc(0x232)]=function(){const _0x1efa43=_0x1d2acc,_0x710eaf=this[_0x1efa43(0x274)]()[_0x1efa43(0x2ea)];if(_0x710eaf['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor['prototype']['TurnOrderCTBGraphicFaceIndex']=function(){const _0x51c958=_0x1d2acc,_0x479f23=this[_0x51c958(0x274)]()['note'];if(_0x479f23[_0x51c958(0x1ed)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x51c958(0x1ec)]();},Game_Actor[_0x1d2acc(0x37b)]['createTurnOrderCTBGraphicIconIndex']=function(){const _0x4b1e05=_0x1d2acc,_0x480f82=this[_0x4b1e05(0x274)]()[_0x4b1e05(0x2ea)];if(_0x480f82[_0x4b1e05(0x1ed)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x4b1e05(0x2ad)]['ActorBattlerIcon'];},Game_Enemy[_0x1d2acc(0x37b)][_0x1d2acc(0x2a5)]=function(){const _0x2a6b94=_0x1d2acc,_0x2920a0=this[_0x2a6b94(0x248)]()[_0x2a6b94(0x2ea)];if(_0x2920a0['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x2a6b94(0x331);else{if(_0x2920a0['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_CTB_TurnOrder[_0x2a6b94(0x2ad)][_0x2a6b94(0x344)];},Game_Enemy[_0x1d2acc(0x37b)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x488d4d=_0x1d2acc,_0x4ab612=this[_0x488d4d(0x248)]()[_0x488d4d(0x2ea)];if(_0x4ab612['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_CTB_TurnOrder[_0x488d4d(0x2ad)][_0x488d4d(0x2f2)];},Game_Enemy['prototype'][_0x1d2acc(0x219)]=function(){const _0x5184c3=_0x1d2acc,_0x402fd6=this[_0x5184c3(0x248)]()[_0x5184c3(0x2ea)];if(_0x402fd6['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x5184c3(0x2ad)]['EnemyBattlerFaceIndex'];},Game_Enemy['prototype']['createTurnOrderCTBGraphicIconIndex']=function(){const _0x2f64c6=_0x1d2acc,_0x1a3889=this[_0x2f64c6(0x248)]()['note'];if(_0x1a3889[_0x2f64c6(0x1ed)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x2f64c6(0x2ad)]['EnemyBattlerIcon'];},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2d0)]=Scene_Battle['prototype'][_0x1d2acc(0x30e)],Scene_Battle[_0x1d2acc(0x37b)][_0x1d2acc(0x30e)]=function(){const _0x486589=_0x1d2acc;VisuMZ[_0x486589(0x2cb)][_0x486589(0x2d0)][_0x486589(0x20f)](this),this['createCTBTurnOrderWindow']();},Scene_Battle[_0x1d2acc(0x37b)][_0x1d2acc(0x31a)]=function(){const _0x4d5dee=_0x1d2acc;if(!BattleManager[_0x4d5dee(0x296)]())return;this[_0x4d5dee(0x246)]=new Window_CTB_TurnOrder();const _0x4d46ca=this['getChildIndex'](this[_0x4d5dee(0x228)]);this[_0x4d5dee(0x29f)](this[_0x4d5dee(0x246)],_0x4d46ca),this[_0x4d5dee(0x339)](),BattleManager[_0x4d5dee(0x304)](!![]);},Scene_Battle[_0x1d2acc(0x37b)][_0x1d2acc(0x339)]=function(){const _0x3ae49d=_0x1d2acc,_0x3770e5=Window_CTB_TurnOrder[_0x3ae49d(0x2ad)];if(_0x3770e5[_0x3ae49d(0x1f8)]!==_0x3ae49d(0x35d))return;if(!_0x3770e5[_0x3ae49d(0x2b9)])return;if(!this['_logWindow'])return;const _0x30ad3a=this[_0x3ae49d(0x246)]['y']-Math['round']((Graphics[_0x3ae49d(0x32d)]-Graphics['boxHeight'])/0x2),_0xf700ea=_0x30ad3a+this[_0x3ae49d(0x246)][_0x3ae49d(0x32d)];this[_0x3ae49d(0x33d)]['y']=_0xf700ea+_0x3770e5['ScreenBuffer'];};function Sprite_CTB_TurnOrder_Battler(){const _0x18105b=_0x1d2acc;this[_0x18105b(0x292)](...arguments);}Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]=Object['create'](Sprite_Clickable[_0x1d2acc(0x37b)]),Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x326)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x292)]=function(_0x13769f,_0x3e8d8b,_0x10e17d){const _0x3ba45a=_0x1d2acc;this[_0x3ba45a(0x319)](_0x13769f,_0x3e8d8b,_0x10e17d),Sprite_Clickable[_0x3ba45a(0x37b)][_0x3ba45a(0x292)][_0x3ba45a(0x20f)](this),this[_0x3ba45a(0x2a0)]();},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x319)]=function(_0x3a905c,_0x5ed4f6,_0x27f2b8){const _0x2f3afe=_0x1d2acc;this[_0x2f3afe(0x212)]=_0x3a905c,this[_0x2f3afe(0x309)]=_0x5ed4f6,this[_0x2f3afe(0x2dc)]=_0x27f2b8;const _0x107b48=Window_CTB_TurnOrder[_0x2f3afe(0x2ad)],_0x5ba445=this['isHorz'](),_0x41ad00=this['defaultPosition']();this[_0x2f3afe(0x257)]=0x0,this[_0x2f3afe(0x25a)]=_0x5ba445?_0x107b48[_0x2f3afe(0x2a2)]*_0x41ad00:0x0,this[_0x2f3afe(0x271)]=_0x5ba445?0x0:_0x107b48['SpriteThin']*_0x41ad00,this[_0x2f3afe(0x325)]=0x0,this['_fadeTarget']=0xff,this[_0x2f3afe(0x203)]=!![],this['_isAppeared']=!![];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]['createChildren']=function(){const _0x2fa6c5=_0x1d2acc;this[_0x2fa6c5(0x33b)](),this[_0x2fa6c5(0x30d)](),this['createGraphicSprite'](),this[_0x2fa6c5(0x2ce)](),this[_0x2fa6c5(0x346)]();},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]['createInitialPositions']=function(){const _0x18b225=_0x1d2acc;this['x']=this[_0x18b225(0x25a)],this['y']=this[_0x18b225(0x271)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x35a)]=function(){const _0x205b20=_0x1d2acc,_0x3f8879=Window_CTB_TurnOrder[_0x205b20(0x2ad)],_0x21f551=[_0x205b20(0x35d),_0x205b20(0x2be)][_0x205b20(0x35c)](_0x3f8879[_0x205b20(0x1f8)]);return _0x21f551;},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2e3)]=function(){const _0xbe46=_0x1d2acc,_0x50cd69=Window_CTB_TurnOrder[_0xbe46(0x2ad)];return this['isHorz']()?_0x50cd69['SpriteThin']:_0x50cd69[_0xbe46(0x2a3)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x258)]=function(){const _0x2b39a4=_0x1d2acc,_0x260841=Window_CTB_TurnOrder['Settings'];return this[_0x2b39a4(0x35a)]()?_0x260841['SpriteLength']:_0x260841[_0x2b39a4(0x2a2)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x1e7)]=function(){const _0x56d8a2=_0x1d2acc;this[_0x56d8a2(0x221)]=new Bitmap(0x48,0x24);const _0x28e519=this['battler']()?this[_0x56d8a2(0x305)]()[_0x56d8a2(0x2fc)]():_0x56d8a2(0x388)[_0x56d8a2(0x28c)](this[_0x56d8a2(0x212)],this[_0x56d8a2(0x309)],this[_0x56d8a2(0x2dc)]);this['bitmap']['drawText'](_0x28e519,0x0,0x0,0x48,0x24,_0x56d8a2(0x1f7));},Sprite_CTB_TurnOrder_Battler['prototype']['createBackgroundSprite']=function(){const _0x5d41df=_0x1d2acc;if(!Window_CTB_TurnOrder[_0x5d41df(0x2ad)][_0x5d41df(0x1e5)])return;const _0x7eb6ea=Window_CTB_TurnOrder[_0x5d41df(0x2ad)],_0xbbe28e=this[_0x5d41df(0x212)]===$gameParty?'Actor':_0x5d41df(0x1e1),_0x32700b=_0x5d41df(0x24d)[_0x5d41df(0x28c)](_0xbbe28e),_0x448975=new Sprite();_0x448975['anchor']['x']=this[_0x5d41df(0x323)]['x'],_0x448975[_0x5d41df(0x323)]['y']=this[_0x5d41df(0x323)]['y'];if(_0x7eb6ea[_0x32700b])_0x448975[_0x5d41df(0x221)]=ImageManager[_0x5d41df(0x297)](_0x7eb6ea[_0x32700b]);else{const _0x22dda9=this[_0x5d41df(0x2e3)](),_0x263c04=this[_0x5d41df(0x258)]();_0x448975[_0x5d41df(0x221)]=new Bitmap(_0x22dda9,_0x263c04);const _0x313e8c=ColorManager[_0x5d41df(0x2e7)](_0x7eb6ea['%1BgColor1'[_0x5d41df(0x28c)](_0xbbe28e)]),_0xfa3613=ColorManager[_0x5d41df(0x2e7)](_0x7eb6ea[_0x5d41df(0x2f1)['format'](_0xbbe28e)]);_0x448975['bitmap'][_0x5d41df(0x1e6)](0x0,0x0,_0x22dda9,_0x263c04,_0x313e8c,_0xfa3613,!![]);}this[_0x5d41df(0x23a)]=_0x448975,this[_0x5d41df(0x2da)](this[_0x5d41df(0x23a)]),this[_0x5d41df(0x225)]=this['_backgroundSprite'][_0x5d41df(0x225)],this[_0x5d41df(0x32d)]=this['_backgroundSprite'][_0x5d41df(0x32d)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x303)]=function(){const _0x881acd=_0x1d2acc,_0x68b678=new Sprite();_0x68b678[_0x881acd(0x323)]['x']=this['anchor']['x'],_0x68b678[_0x881acd(0x323)]['y']=this[_0x881acd(0x323)]['y'],this[_0x881acd(0x2f5)]=_0x68b678,this[_0x881acd(0x2da)](this[_0x881acd(0x2f5)]),this[_0x881acd(0x244)]();},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2ce)]=function(){const _0x551087=_0x1d2acc;if(!Window_CTB_TurnOrder[_0x551087(0x2ad)]['ShowMarkerBorder'])return;const _0x5cc54a=Window_CTB_TurnOrder[_0x551087(0x2ad)],_0x10b24a=this[_0x551087(0x212)]===$gameParty?_0x551087(0x1e3):_0x551087(0x1e1),_0x1c2d36=_0x551087(0x34f)[_0x551087(0x28c)](_0x10b24a),_0x3f0242=new Sprite();_0x3f0242[_0x551087(0x323)]['x']=this[_0x551087(0x323)]['x'],_0x3f0242[_0x551087(0x323)]['y']=this[_0x551087(0x323)]['y'];if(_0x5cc54a[_0x1c2d36])_0x3f0242[_0x551087(0x221)]=ImageManager[_0x551087(0x297)](_0x5cc54a[_0x1c2d36]);else{let _0x5d8ec2=this['bitmapWidth'](),_0x859506=this[_0x551087(0x258)](),_0x26639f=_0x5cc54a[_0x551087(0x2de)];_0x3f0242['bitmap']=new Bitmap(_0x5d8ec2,_0x859506);const _0x51aa62=_0x551087(0x2b4),_0x171a28=ColorManager[_0x551087(0x2e7)](_0x5cc54a['%1BorderColor'[_0x551087(0x28c)](_0x10b24a)]);_0x3f0242[_0x551087(0x221)][_0x551087(0x211)](0x0,0x0,_0x5d8ec2,_0x859506,_0x51aa62),_0x5d8ec2-=0x2,_0x859506-=0x2,_0x3f0242[_0x551087(0x221)][_0x551087(0x211)](0x1,0x1,_0x5d8ec2,_0x859506,_0x171a28),_0x5d8ec2-=_0x26639f*0x2,_0x859506-=_0x26639f*0x2,_0x3f0242[_0x551087(0x221)][_0x551087(0x211)](0x1+_0x26639f,0x1+_0x26639f,_0x5d8ec2,_0x859506,_0x51aa62),_0x5d8ec2-=0x2,_0x859506-=0x2,_0x26639f+=0x1,_0x3f0242[_0x551087(0x221)]['clearRect'](0x1+_0x26639f,0x1+_0x26639f,_0x5d8ec2,_0x859506);}this[_0x551087(0x23a)]=_0x3f0242,this[_0x551087(0x2da)](this['_backgroundSprite']);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x346)]=function(){const _0x4a2848=_0x1d2acc,_0x5c51fc=Window_CTB_TurnOrder[_0x4a2848(0x2ad)];if(!_0x5c51fc['EnemyBattlerDrawLetter'])return;if(this[_0x4a2848(0x212)]===$gameParty)return;const _0x9fb5c2=this['bitmapWidth'](),_0x338406=this[_0x4a2848(0x258)](),_0x365f39=new Sprite();_0x365f39['anchor']['x']=this[_0x4a2848(0x323)]['x'],_0x365f39[_0x4a2848(0x323)]['y']=this[_0x4a2848(0x323)]['y'],_0x365f39[_0x4a2848(0x221)]=new Bitmap(_0x9fb5c2,_0x338406),this[_0x4a2848(0x222)]=_0x365f39,this[_0x4a2848(0x2da)](this[_0x4a2848(0x222)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x305)]=function(){const _0x5732da=_0x1d2acc;return this[_0x5732da(0x212)]?this[_0x5732da(0x212)][_0x5732da(0x338)]()[this[_0x5732da(0x309)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x275)]=function(_0x59fa34){const _0x9c8986=_0x1d2acc,_0x529a66=this[_0x9c8986(0x305)]();if(!_0x529a66)return Number[_0x9c8986(0x36e)];const _0x21bfa5=0x1*(this[_0x9c8986(0x2dc)]+0x1);return _0x529a66[_0x9c8986(0x267)](_0x21bfa5,_0x59fa34);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]['update']=function(){const _0x163ad7=_0x1d2acc;Sprite_Clickable['prototype']['update'][_0x163ad7(0x20f)](this),this['checkPosition'](),this['updatePosition'](),this[_0x163ad7(0x2ed)](),this[_0x163ad7(0x324)](),this[_0x163ad7(0x226)](),this[_0x163ad7(0x1ea)](),this['updateLetter'](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x1fe)]=function(){const _0x3855ad=_0x1d2acc,_0x4f2ad5=this[_0x3855ad(0x266)]();if(this['_position']===_0x4f2ad5)return;this[_0x3855ad(0x356)]=_0x4f2ad5;const _0x552a9a=Window_CTB_TurnOrder['Settings'],_0xe3578a=this[_0x3855ad(0x35a)](),_0x935421=_0x552a9a[_0x3855ad(0x1fc)],_0x311701=_0x552a9a[_0x3855ad(0x368)],_0x2f816e=SceneManager[_0x3855ad(0x2b7)]['_ctbTurnOrderWindow'];if(!_0x2f816e)return;this['_positionDuration']=_0x552a9a[_0x3855ad(0x2c3)],this[_0x3855ad(0x25a)]=_0xe3578a?_0x552a9a['SpriteThin']*_0x4f2ad5:0x0,this['_positionTargetY']=_0xe3578a?0x0:_0x552a9a['SpriteThin']*_0x4f2ad5,_0x4f2ad5>0x0&&(this[_0x3855ad(0x25a)]+=_0xe3578a?_0x311701:0x0,this['_positionTargetY']+=_0xe3578a?0x0:_0x311701),_0x935421?this[_0x3855ad(0x25a)]=_0xe3578a?_0x2f816e['width']-this['_positionTargetX']-_0x552a9a[_0x3855ad(0x2a2)]:0x0:this[_0x3855ad(0x271)]=_0xe3578a?0x0:_0x2f816e[_0x3855ad(0x32d)]-this['_positionTargetY']-_0x552a9a[_0x3855ad(0x2a2)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x224)]=function(){const _0x40661b=_0x1d2acc;if(this[_0x40661b(0x325)]>0x0)return;if(this[_0x40661b(0x257)]>0x0){const _0x14a64f=this[_0x40661b(0x257)];this['x']=(this['x']*(_0x14a64f-0x1)+this[_0x40661b(0x25a)])/_0x14a64f,this['y']=(this['y']*(_0x14a64f-0x1)+this[_0x40661b(0x271)])/_0x14a64f,this[_0x40661b(0x257)]--;}this[_0x40661b(0x257)]<=0x0&&(this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'],this['opacity']<=0x0&&!this['_isBattleOver']&&this[_0x40661b(0x374)](0xff));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x265)]=function(){const _0x27303d=_0x1d2acc;return Window_CTB_TurnOrder[_0x27303d(0x2ad)][_0x27303d(0x2c6)]*0x14;},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x378)]=function(){const _0x276942=_0x1d2acc;return SceneManager['_scene'][_0x276942(0x246)];},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x266)]=function(){const _0x3efb69=_0x1d2acc;if(!this['containerWindow']())return this[_0x3efb69(0x265)]();const _0x420855=this[_0x3efb69(0x378)]()[_0x3efb69(0x377)];return _0x420855[_0x3efb69(0x241)](this);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x25f)]=function(){const _0x5bee02=_0x1d2acc,_0x24fb63=Window_CTB_TurnOrder[_0x5bee02(0x2ad)],_0xe51187=this['isHorz'](),_0x28b4a3=_0xe51187?_0x24fb63[_0x5bee02(0x2c6)]:_0x24fb63[_0x5bee02(0x27e)];this[_0x5bee02(0x2dc)]-=0x1,this[_0x5bee02(0x2dc)]<0x0&&(this[_0x5bee02(0x2dc)]=_0x28b4a3-0x1,this[_0x5bee02(0x374)](0x0));},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x374)]=function(_0x856f92){const _0x423093=_0x1d2acc,_0x4788b7=Window_CTB_TurnOrder['Settings'];this[_0x423093(0x325)]=_0x4788b7[_0x423093(0x2c3)],this[_0x423093(0x363)]=_0x856f92;},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]['checkOpacity']=function(){const _0x10db30=_0x1d2acc,_0x4be068=this['battler']();if(!_0x4be068)return;if(this[_0x10db30(0x203)]===_0x4be068[_0x10db30(0x2e9)]()&&this[_0x10db30(0x2f8)]===_0x4be068[_0x10db30(0x209)]())return;this[_0x10db30(0x203)]=_0x4be068['isAlive'](),this[_0x10db30(0x2f8)]=_0x4be068[_0x10db30(0x209)]();let _0x5a6907=this[_0x10db30(0x203)]&&this[_0x10db30(0x2f8)]?0xff:0x0;this[_0x10db30(0x374)](_0x5a6907);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x324)]=function(){const _0x1568b5=_0x1d2acc;if(this[_0x1568b5(0x325)]>0x0){const _0x48c0ad=this[_0x1568b5(0x325)];this[_0x1568b5(0x2c1)]=(this[_0x1568b5(0x2c1)]*(_0x48c0ad-0x1)+this[_0x1568b5(0x363)])/_0x48c0ad,this[_0x1568b5(0x325)]--,this['_fadeDuration']<=0x0&&(this[_0x1568b5(0x1fe)](),this['_positionDuration']=0x0,this[_0x1568b5(0x224)](),this[_0x1568b5(0x2c1)]=this[_0x1568b5(0x363)]);}if(this['_isBattleOver'])return;($gameTroop[_0x1568b5(0x23f)]()['length']<=0x0||$gameParty['aliveMembers']()[_0x1568b5(0x335)]<=0x0)&&(this['_isBattleOver']=!![],this[_0x1568b5(0x374)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x226)]=function(){const _0x1ce016=_0x1d2acc,_0x7960c5=this['battler']();if(!_0x7960c5)return;const _0x2b1ef0=Window_CTB_TurnOrder[_0x1ce016(0x2ad)],_0x153fc3=this[_0x1ce016(0x212)]===$gameParty?_0x1ce016(0x1e3):_0x1ce016(0x1e1);let _0x781570=_0x7960c5[_0x1ce016(0x251)]();if(_0x7960c5['isActor']()&&_0x781570===_0x1ce016(0x248))_0x781570=_0x1ce016(0x331);else _0x7960c5[_0x1ce016(0x367)]()&&_0x781570===_0x1ce016(0x359)&&(_0x781570=_0x1ce016(0x248));if(this[_0x1ce016(0x37f)]!==_0x781570)return this['processUpdateGraphic']();switch(this[_0x1ce016(0x37f)]){case _0x1ce016(0x331):if(this['_graphicFaceName']!==_0x7960c5['TurnOrderCTBGraphicFaceName']())return this[_0x1ce016(0x244)]();if(this[_0x1ce016(0x1eb)]!==_0x7960c5[_0x1ce016(0x247)]())return this['processUpdateGraphic']();break;case _0x1ce016(0x28e):if(this[_0x1ce016(0x2d4)]!==_0x7960c5[_0x1ce016(0x2c4)]())return this['processUpdateGraphic']();break;case _0x1ce016(0x248):if(_0x7960c5[_0x1ce016(0x26e)]()){if(this['_graphicSv']!==_0x7960c5[_0x1ce016(0x283)]())return this[_0x1ce016(0x244)]();}else{if(this['_graphicEnemy']!==_0x7960c5['battlerName']())return this['processUpdateGraphic']();}break;case'svactor':if(_0x7960c5[_0x1ce016(0x28b)]()){if(this['_graphicSv']!==_0x7960c5[_0x1ce016(0x328)]())return this[_0x1ce016(0x244)]();}else{if(this[_0x1ce016(0x349)]!==_0x7960c5[_0x1ce016(0x328)]())return this[_0x1ce016(0x244)]();}break;}},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x244)]=function(){const _0x4032bf=_0x1d2acc,_0x175934=this[_0x4032bf(0x305)]();if(!_0x175934)return;this['_graphicType']=_0x175934['TurnOrderCTBGraphicType']();if(_0x175934[_0x4032bf(0x28b)]()&&this[_0x4032bf(0x37f)]===_0x4032bf(0x248))this[_0x4032bf(0x37f)]=_0x4032bf(0x331);else _0x175934[_0x4032bf(0x367)]()&&this[_0x4032bf(0x37f)]===_0x4032bf(0x359)&&(this['_graphicType']='enemy');let _0x1066d0;switch(this['_graphicType']){case _0x4032bf(0x331):this['_graphicFaceName']=_0x175934[_0x4032bf(0x232)](),this['_graphicFaceIndex']=_0x175934[_0x4032bf(0x247)](),_0x1066d0=ImageManager['loadFace'](this[_0x4032bf(0x2a7)]),_0x1066d0[_0x4032bf(0x201)](this[_0x4032bf(0x268)][_0x4032bf(0x381)](this,_0x1066d0));break;case'icon':this[_0x4032bf(0x2d4)]=_0x175934['createTurnOrderCTBGraphicIconIndex'](),_0x1066d0=ImageManager[_0x4032bf(0x297)]('IconSet'),_0x1066d0[_0x4032bf(0x201)](this[_0x4032bf(0x360)][_0x4032bf(0x381)](this,_0x1066d0));break;case _0x4032bf(0x248):if(_0x175934[_0x4032bf(0x26e)]())this[_0x4032bf(0x32c)]=_0x175934[_0x4032bf(0x283)](),_0x1066d0=ImageManager[_0x4032bf(0x240)](this['_graphicSv']),_0x1066d0[_0x4032bf(0x201)](this[_0x4032bf(0x202)]['bind'](this,_0x1066d0));else $gameSystem[_0x4032bf(0x31b)]()?(this['_graphicEnemy']=_0x175934[_0x4032bf(0x328)](),_0x1066d0=ImageManager[_0x4032bf(0x389)](this[_0x4032bf(0x349)]),_0x1066d0[_0x4032bf(0x201)](this['changeEnemyGraphicBitmap'][_0x4032bf(0x381)](this,_0x1066d0))):(this[_0x4032bf(0x349)]=_0x175934[_0x4032bf(0x328)](),_0x1066d0=ImageManager[_0x4032bf(0x26a)](this[_0x4032bf(0x349)]),_0x1066d0[_0x4032bf(0x201)](this[_0x4032bf(0x382)][_0x4032bf(0x381)](this,_0x1066d0)));break;case _0x4032bf(0x359):this[_0x4032bf(0x32c)]=_0x175934[_0x4032bf(0x328)](),_0x1066d0=ImageManager[_0x4032bf(0x240)](this[_0x4032bf(0x32c)]),_0x1066d0[_0x4032bf(0x201)](this[_0x4032bf(0x202)][_0x4032bf(0x381)](this,_0x1066d0));break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x268)]=function(_0x350261){const _0x53ebd0=_0x1d2acc,_0x4a1b3e=this[_0x53ebd0(0x1eb)],_0xb33542=this['bitmapWidth'](),_0x3c916d=this[_0x53ebd0(0x258)](),_0x2dfa35=Math[_0x53ebd0(0x2ca)](_0xb33542,_0x3c916d);this['_graphicSprite'][_0x53ebd0(0x221)]=new Bitmap(_0xb33542,_0x3c916d);const _0x1f159f=this[_0x53ebd0(0x2f5)]['bitmap'],_0x3310d0=ImageManager[_0x53ebd0(0x27d)],_0x293131=ImageManager[_0x53ebd0(0x33c)],_0x1f97b2=_0x2dfa35/Math['max'](_0x3310d0,_0x293131),_0x560ffd=ImageManager[_0x53ebd0(0x27d)],_0xa006da=ImageManager['faceHeight'],_0x700e80=_0x4a1b3e%0x4*_0x3310d0+(_0x3310d0-_0x560ffd)/0x2,_0x2688c6=Math[_0x53ebd0(0x259)](_0x4a1b3e/0x4)*_0x293131+(_0x293131-_0xa006da)/0x2,_0x40b2ae=(_0xb33542-_0x3310d0*_0x1f97b2)/0x2,_0xcabbee=(_0x3c916d-_0x293131*_0x1f97b2)/0x2;_0x1f159f[_0x53ebd0(0x2cd)](_0x350261,_0x700e80,_0x2688c6,_0x560ffd,_0xa006da,_0x40b2ae,_0xcabbee,_0x2dfa35,_0x2dfa35);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x360)]=function(_0x5df3c8){const _0x5eb79f=_0x1d2acc,_0x5d12b8=this['_graphicIconIndex'],_0x2613b2=this[_0x5eb79f(0x2e3)](),_0x218bad=this[_0x5eb79f(0x258)]();this[_0x5eb79f(0x2f5)][_0x5eb79f(0x221)]=new Bitmap(_0x2613b2,_0x218bad);const _0x2cfa81=this[_0x5eb79f(0x2f5)][_0x5eb79f(0x221)],_0x533395=ImageManager['iconWidth'],_0x40010d=ImageManager[_0x5eb79f(0x318)],_0x1ef387=Math[_0x5eb79f(0x334)](_0x533395,_0x40010d,_0x2613b2,_0x218bad),_0x25dbe5=_0x5d12b8%0x10*_0x533395,_0x4fcf52=Math[_0x5eb79f(0x259)](_0x5d12b8/0x10)*_0x40010d,_0x28b8cc=Math[_0x5eb79f(0x259)](Math[_0x5eb79f(0x2ca)](_0x2613b2-_0x1ef387,0x0)/0x2),_0x3e26b0=Math[_0x5eb79f(0x259)](Math[_0x5eb79f(0x2ca)](_0x218bad-_0x1ef387,0x0)/0x2);_0x2cfa81[_0x5eb79f(0x2cd)](_0x5df3c8,_0x25dbe5,_0x4fcf52,_0x533395,_0x40010d,_0x28b8cc,_0x3e26b0,_0x1ef387,_0x1ef387);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x202)]=function(_0x262968){const _0x2f0700=_0x1d2acc,_0x2e31b9=this[_0x2f0700(0x2e3)](),_0x34ba97=this[_0x2f0700(0x258)](),_0x2b2df3=Math['min'](_0x2e31b9,_0x34ba97);this[_0x2f0700(0x2f5)][_0x2f0700(0x221)]=new Bitmap(_0x2e31b9,_0x34ba97);const _0x912f47=this[_0x2f0700(0x2f5)][_0x2f0700(0x221)],_0x496213=0x9,_0xc183ab=0x6,_0x1034f9=_0x262968[_0x2f0700(0x225)]/_0x496213,_0x199c55=_0x262968[_0x2f0700(0x32d)]/_0xc183ab,_0x35df5e=Math[_0x2f0700(0x334)](0x1,_0x2b2df3/_0x1034f9,_0x2b2df3/_0x199c55),_0x20c510=_0x1034f9*_0x35df5e,_0x2d923d=_0x199c55*_0x35df5e,_0x16619e=Math[_0x2f0700(0x30f)]((_0x2e31b9-_0x20c510)/0x2),_0xbc9e07=Math[_0x2f0700(0x30f)]((_0x34ba97-_0x2d923d)/0x2);_0x912f47[_0x2f0700(0x2cd)](_0x262968,0x0,0x0,_0x1034f9,_0x199c55,_0x16619e,_0xbc9e07,_0x20c510,_0x2d923d);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)]['changeEnemyGraphicBitmap']=function(_0x2a670e){const _0x55bd1b=_0x1d2acc,_0x5e2f9b=Window_CTB_TurnOrder[_0x55bd1b(0x2ad)],_0x19f94a=this[_0x55bd1b(0x2e3)](),_0x397d88=this[_0x55bd1b(0x258)](),_0x1c0da2=Math[_0x55bd1b(0x334)](_0x19f94a,_0x397d88);this[_0x55bd1b(0x2f5)][_0x55bd1b(0x221)]=new Bitmap(_0x19f94a,_0x397d88);const _0x1b5b29=this[_0x55bd1b(0x2f5)][_0x55bd1b(0x221)],_0x3cf665=Math[_0x55bd1b(0x334)](0x1,_0x1c0da2/_0x2a670e[_0x55bd1b(0x225)],_0x1c0da2/_0x2a670e[_0x55bd1b(0x32d)]),_0x4e6bb0=_0x2a670e[_0x55bd1b(0x225)]*_0x3cf665,_0x30d1da=_0x2a670e[_0x55bd1b(0x32d)]*_0x3cf665,_0x3ea67a=Math[_0x55bd1b(0x30f)]((_0x19f94a-_0x4e6bb0)/0x2),_0x5ed9b5=Math[_0x55bd1b(0x30f)]((_0x397d88-_0x30d1da)/0x2);_0x1b5b29[_0x55bd1b(0x2cd)](_0x2a670e,0x0,0x0,_0x2a670e[_0x55bd1b(0x225)],_0x2a670e[_0x55bd1b(0x32d)],_0x3ea67a,_0x5ed9b5,_0x4e6bb0,_0x30d1da);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x1ea)]=function(){const _0x187202=_0x1d2acc,_0x20072e=this[_0x187202(0x305)]();if(!_0x20072e)return;if(!_0x20072e[_0x187202(0x367)]())return;if(this['_graphicHue']===_0x20072e[_0x187202(0x30b)]())return;this[_0x187202(0x2dd)]=_0x20072e['battlerHue']();if(_0x20072e[_0x187202(0x26e)]())this[_0x187202(0x2dd)]=0x0;this[_0x187202(0x2f5)][_0x187202(0x307)](this['_graphicHue']);},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2bd)]=function(){const _0x30b235=_0x1d2acc;if(!this[_0x30b235(0x222)])return;const _0x330cff=this[_0x30b235(0x305)]();if(!_0x330cff)return;if(this[_0x30b235(0x369)]===_0x330cff['_letter']&&this[_0x30b235(0x362)]===_0x330cff['_plural'])return;this[_0x30b235(0x369)]=_0x330cff[_0x30b235(0x369)],this[_0x30b235(0x362)]=_0x330cff[_0x30b235(0x362)];const _0x346d43=Window_CTB_TurnOrder[_0x30b235(0x2ad)],_0x489cd0=this['isHorz'](),_0x197f15=this[_0x30b235(0x2e3)](),_0x4c2af0=this[_0x30b235(0x258)](),_0x53391d=this[_0x30b235(0x222)][_0x30b235(0x221)];_0x53391d[_0x30b235(0x2b1)]();if(!this[_0x30b235(0x362)])return;_0x53391d[_0x30b235(0x2e6)]=_0x346d43[_0x30b235(0x308)]||$gameSystem[_0x30b235(0x33f)](),_0x53391d[_0x30b235(0x2c0)]=_0x346d43[_0x30b235(0x260)]||0x10,_0x489cd0?_0x53391d['drawText'](this[_0x30b235(0x369)][_0x30b235(0x264)](),0x0,_0x4c2af0/0x2,_0x197f15,_0x4c2af0/0x2,_0x30b235(0x1f7)):_0x53391d[_0x30b235(0x2a8)](this[_0x30b235(0x369)][_0x30b235(0x264)](),0x0,0x2,_0x197f15-0x8,_0x4c2af0-0x4,_0x30b235(0x279));},Sprite_CTB_TurnOrder_Battler[_0x1d2acc(0x37b)][_0x1d2acc(0x2fa)]=function(){const _0x1c0f7c=_0x1d2acc,_0x188a08=this['battler']();if(!_0x188a08)return;const _0x52bcf2=_0x188a08['battler']();if(!_0x52bcf2)return;const _0x3f8301=_0x52bcf2['mainSprite']();if(!_0x3f8301)return;this[_0x1c0f7c(0x27a)](_0x3f8301[_0x1c0f7c(0x2fd)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x1d2acc(0x216)]=function(){const _0x45f7e2=_0x1d2acc;return this[_0x45f7e2(0x305)]();},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x26c)]=Window_Help[_0x1d2acc(0x37b)][_0x1d2acc(0x32f)],Window_Help[_0x1d2acc(0x37b)][_0x1d2acc(0x32f)]=function(_0x1ed6b6){const _0x3ff867=_0x1d2acc;BattleManager['isCTB']()&&_0x1ed6b6&&_0x1ed6b6[_0x3ff867(0x2ea)]&&_0x1ed6b6[_0x3ff867(0x2ea)][_0x3ff867(0x1ed)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i)?this[_0x3ff867(0x28f)](String(RegExp['$1'])):VisuMZ[_0x3ff867(0x2cb)][_0x3ff867(0x26c)][_0x3ff867(0x20f)](this,_0x1ed6b6);},VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x32b)]=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0x1d2acc(0x37b)][_0x1d2acc(0x315)]=function(_0x4072c3,_0x4033b9,_0x3dea77,_0x1b4188){const _0x366729=_0x1d2acc;if(BattleManager['isCTB']()&&_0x4033b9===_0x366729(0x26f))return;VisuMZ[_0x366729(0x2cb)][_0x366729(0x32b)][_0x366729(0x20f)](this,_0x4072c3,_0x4033b9,_0x3dea77,_0x1b4188);};function Window_CTB_TurnOrder(){const _0x9c2c74=_0x1d2acc;this[_0x9c2c74(0x292)](...arguments);}Window_CTB_TurnOrder['prototype']=Object[_0x1d2acc(0x237)](Window_Base['prototype']),Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x326)]=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x1d2acc(0x2cb)][_0x1d2acc(0x2ad)][_0x1d2acc(0x2ae)],Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x292)]=function(){const _0x305c7b=_0x1d2acc,_0x4c1473=this[_0x305c7b(0x2bc)]();this['_homeX']=_0x4c1473['x'],this[_0x305c7b(0x1f5)]=_0x4c1473['y'],Window_Base['prototype']['initialize'][_0x305c7b(0x20f)](this,_0x4c1473),this[_0x305c7b(0x2b8)](),this[_0x305c7b(0x1f2)](),this[_0x305c7b(0x2c1)]=0x0;},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x2bc)]=function(){const _0x5ed57f=_0x1d2acc,_0x20142e=Window_CTB_TurnOrder[_0x5ed57f(0x2ad)],_0x470b88=SceneManager[_0x5ed57f(0x2b7)][_0x5ed57f(0x2b5)][_0x5ed57f(0x32d)],_0x21137b=SceneManager[_0x5ed57f(0x2b7)]['_helpWindow']['height'],_0x17a4ba=_0x20142e[_0x5ed57f(0x368)];let _0x26016b=0x0,_0x589bdd=0x0,_0x769a82=0x0,_0x457f71=0x0;switch(_0x20142e[_0x5ed57f(0x1f8)]){case _0x5ed57f(0x35d):_0x26016b=_0x20142e['SpriteThin']*_0x20142e[_0x5ed57f(0x2c6)]+_0x17a4ba,_0x589bdd=_0x20142e[_0x5ed57f(0x2a3)],_0x769a82=Math[_0x5ed57f(0x2c9)]((Graphics['width']-_0x26016b)/0x2),_0x457f71=_0x20142e[_0x5ed57f(0x20b)];break;case'bottom':_0x26016b=_0x20142e['SpriteThin']*_0x20142e[_0x5ed57f(0x2c6)]+_0x17a4ba,_0x589bdd=_0x20142e['SpriteLength'],_0x769a82=Math[_0x5ed57f(0x2c9)]((Graphics[_0x5ed57f(0x225)]-_0x26016b)/0x2),_0x457f71=Graphics[_0x5ed57f(0x32d)]-_0x470b88-_0x589bdd-_0x20142e[_0x5ed57f(0x20b)];break;case'left':_0x26016b=_0x20142e[_0x5ed57f(0x2a3)],_0x589bdd=_0x20142e[_0x5ed57f(0x2a2)]*_0x20142e[_0x5ed57f(0x27e)]+_0x17a4ba,_0x769a82=_0x20142e[_0x5ed57f(0x20b)],_0x457f71=Math['ceil']((Graphics[_0x5ed57f(0x32d)]-_0x470b88+_0x21137b-_0x589bdd)/0x2);break;case _0x5ed57f(0x279):_0x26016b=_0x20142e['SpriteLength'],_0x589bdd=_0x20142e['SpriteThin']*_0x20142e[_0x5ed57f(0x27e)]+_0x17a4ba,_0x769a82=Graphics['width']-_0x26016b-_0x20142e['ScreenBuffer'],_0x457f71=Math[_0x5ed57f(0x2c9)]((Graphics[_0x5ed57f(0x32d)]-_0x470b88+_0x21137b-_0x589bdd)/0x2);break;}return _0x769a82+=_0x20142e[_0x5ed57f(0x350)],_0x457f71+=_0x20142e['DisplayOffsetY'],new Rectangle(_0x769a82,_0x457f71,_0x26016b,_0x589bdd);},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x387)]=function(){const _0x3e8284=_0x1d2acc;this[_0x3e8284(0x32a)]=0x0;},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x35a)]=function(){const _0x5dba1a=_0x1d2acc,_0x2f2725=Window_CTB_TurnOrder['Settings'],_0x3b2393=['top',_0x5dba1a(0x2be)]['includes'](_0x2f2725['DisplayPosition']);return _0x3b2393;},Window_CTB_TurnOrder['prototype'][_0x1d2acc(0x2b8)]=function(){const _0x410a9b=_0x1d2acc,_0x5d9a1b=Window_CTB_TurnOrder[_0x410a9b(0x2ad)],_0x12c8d2=this[_0x410a9b(0x35a)](),_0x1f4b7d=_0x12c8d2?_0x5d9a1b[_0x410a9b(0x2c6)]:_0x5d9a1b[_0x410a9b(0x27e)];this[_0x410a9b(0x2df)]=new Sprite(),this[_0x410a9b(0x2d7)](this[_0x410a9b(0x2df)]),this[_0x410a9b(0x377)]=[];for(let _0x3491c5=0x0;_0x3491c5<$gameParty[_0x410a9b(0x2ec)]();_0x3491c5++){for(let _0x45e342=0x0;_0x45e342<_0x1f4b7d;_0x45e342++){const _0x4c4a04=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x3491c5,_0x45e342);this[_0x410a9b(0x2df)]['addChild'](_0x4c4a04),this[_0x410a9b(0x377)][_0x410a9b(0x35f)](_0x4c4a04);}}for(let _0xd16a16=0x0;_0xd16a16<0x8;_0xd16a16++){for(let _0x52ad4a=0x0;_0x52ad4a<_0x1f4b7d;_0x52ad4a++){const _0x29649e=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0xd16a16,_0x52ad4a);this[_0x410a9b(0x2df)][_0x410a9b(0x2da)](_0x29649e),this['_turnOrderContainer']['push'](_0x29649e);}}},Window_CTB_TurnOrder['prototype'][_0x1d2acc(0x22c)]=function(){const _0x1657e9=_0x1d2acc;Window_Base[_0x1657e9(0x37b)]['update'][_0x1657e9(0x20f)](this),this['updatePosition'](),this[_0x1657e9(0x347)](),this[_0x1657e9(0x1f2)]();},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x224)]=function(){const _0x131875=_0x1d2acc,_0x56a849=Window_CTB_TurnOrder[_0x131875(0x2ad)];if(_0x56a849['DisplayPosition']!==_0x131875(0x35d))return;if(!_0x56a849[_0x131875(0x361)])return;const _0x4c9439=SceneManager[_0x131875(0x2b7)]['_helpWindow'];if(!_0x4c9439)return;_0x4c9439[_0x131875(0x273)]?(this['x']=this[_0x131875(0x1f1)]+(_0x56a849['RepositionTopHelpX']||0x0),this['y']=this[_0x131875(0x1f5)]+(_0x56a849[_0x131875(0x22f)]||0x0)):(this['x']=this[_0x131875(0x1f1)],this['y']=this[_0x131875(0x1f5)]);const _0x376110=SceneManager[_0x131875(0x2b7)][_0x131875(0x228)];this['x']+=_0x376110['x'],this['y']+=_0x376110['y'];},Window_CTB_TurnOrder['prototype'][_0x1d2acc(0x347)]=function(){const _0x21c53e=_0x1d2acc;if(!this[_0x21c53e(0x2df)])return;const _0x2c7cbf=this[_0x21c53e(0x2df)][_0x21c53e(0x341)];if(!_0x2c7cbf)return;_0x2c7cbf[_0x21c53e(0x2d8)](this['compareBattlerSprites'][_0x21c53e(0x381)](this));},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x24f)]=function(_0x50061f,_0x377f1f){const _0x39a7fa=_0x1d2acc,_0x5e295f=this['isHorz'](),_0x5ef62d=Window_CTB_TurnOrder[_0x39a7fa(0x2ad)][_0x39a7fa(0x1fc)];if(_0x5e295f&&!_0x5ef62d)return _0x50061f['x']-_0x377f1f['x'];else{if(_0x5e295f&&_0x5ef62d)return _0x377f1f['x']-_0x50061f['x'];else{if(!_0x5e295f&&_0x5ef62d)return _0x50061f['y']-_0x377f1f['y'];else{if(!_0x5e295f&&!_0x5ef62d)return _0x377f1f['y']-_0x50061f['y'];}}}},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x1f2)]=function(){const _0xd1f57d=_0x1d2acc;this[_0xd1f57d(0x273)]=$gameSystem[_0xd1f57d(0x2ee)]();},Window_CTB_TurnOrder[_0x1d2acc(0x37b)]['updateTurnOrder']=function(_0xaac050){const _0x4a7a51=_0x1d2acc;this[_0x4a7a51(0x377)][_0x4a7a51(0x2d8)]((_0x2310a4,_0x169b4a)=>{const _0x4a137e=_0x4a7a51;return _0x2310a4[_0x4a137e(0x275)]()-_0x169b4a[_0x4a137e(0x275)]();});if(!_0xaac050)return;for(const _0x3e4e33 of this['_turnOrderContainer']){if(!_0x3e4e33)continue;_0x3e4e33['update'](),_0x3e4e33['_positionDuration']=0x0;}},Window_CTB_TurnOrder[_0x1d2acc(0x37b)][_0x1d2acc(0x370)]=function(_0x181b91){const _0x93979b=_0x1d2acc;for(const _0x50f486 of this[_0x93979b(0x377)]){if(!_0x50f486)continue;if(_0x50f486['battler']()!==_0x181b91)continue;_0x50f486['rotateDupeNumber']();}};