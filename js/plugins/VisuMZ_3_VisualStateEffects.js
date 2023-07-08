//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * States can adjust the opacity of a battler to make them semi-transparent.
 * * Hovering effects that can be visibly applied to trait objects.
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
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * 
 * ---
 * 
 * <Visual Opacity: x>
 * <Visual Opacity: x%>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, change the opacity of their main
 *   battler sprite to 'x' or 'x%'.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - To change the whole battler's opacity including everything from the UI
 *   elements, State Icons, etc., use the Action Sequence Plugin Command to
 *   visually alter the whole opacity level instead.
 * - The Visual Opacity level will compound with the opacity level adjusted by
 *   the Action Sequence Plugin Command. Keep this in mind when using both of
 *   them together.
 * 
 * ---
 * 
 * <Visual Rainbow: +x>
 * <Visual Rainbow: -x>
 * 
 * - Used for: State Notetags
 * - When a battler is affected by this state, the battler has a colorful
 *   rainbow shifting effect.
 * - Replace 'x' with a number representing how fast the colors shift for the
 *   battler. Higher numbers are faster. Lower numbers are slower.
 * - This does NOT affect UI elements like the HP Gauges, State Icons, or their
 *   positioning markers such as the battler's shadow as this is only to used
 *   to represent a change in their opacity through a state.
 * - The Visual Rainbow shift will be stacked on top of any battlers/enemies
 *   that already have a hue change.
 * 
 * ---
 *
 * === Hover-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
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
 * Version 1.10: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Rainbow: +x> and <Visual Rainbow: -x>
 * 
 * Version 1.09: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Yanfly.
 * *** <Visual Opacity: x> and <Visual Opacity: x%>
 * 
 * Version 1.08: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Requires updated Core Engine. Fix made by Yanfly.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** <State Motion: x> now works for sideview enemies. Keep in mind the state
 *    motion does not apply to the active battler during the Input phase. Fix
 *    made by Yanfly.
 * 
 * Version 1.06: November 8, 2020
 * * Bug Fixes!
 * ** <Add Animation: x> and <Erase Animation: x> notetags now work properly.
 *    Fix by Arisu.
 * 
 * Version 1.05: November 1, 2020
 * * Feature Update!
 * ** Upon dying, state removal popups are no longer shown to prevent massive
 *    clutter of the screen. Update by Irina.
 * 
 * Version 1.04: October 25, 2020
 * * Bug Fixes!
 * ** Zooming in should no longer display faint outlines around state sprites.
 *    Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility with the Battle Core's new <Battler Sprite Grounded>
 *    notetag. Added by Irina.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Motion Locked Battlers at the start of battle no longer show their entire
 *    sprite sheet. Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the new
 *    distortion effects.
 * 
 * Version 1.01: September 6, 2020
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
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
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
//=============================================================================

const _0x4303=['hover','%1FlashColor','EnemyStateIcon','Sprite_Actor_setBattler','_dragonbonesSpriteContainer','textColor','height','Erase','Sprite_Actor_refreshMotion','Game_BattlerBase_initMembers','updateVisualStateTone','_mainSprite','createVisualRepeatingStateAnimationCycle','ShowAnimations','call','createStateSprite','CycleTime','setupVisualBuffDebuffEffect','830653wOJhOY','ActorStateIcon','514THbfbK','visualStateTone','Sprite_Enemy_setBattler','Sprite_Actor_createStateSprite','onRemoveState','updateDragonbonesTimeScale','createVisualHoveringData','BuffDebuff','base','EVAL','bind','1OZSNzF','getVisualStateTone','_stateIconSprite','Game_BattlerBase_decreaseBuff','Game_BattlerBase_increaseBuff','createVisualStateTone','max','initVisualHoverEffect','refresh','requestFauxAnimation','ICON_DEBUFF_START','note','Sprite_Enemy_createStateIconSprite','VisualStateEffects','length','MatchTurnCountColor','_hue','stateMotionIndex','refreshMotion','round','IconSet','updateVisualStateEffectsIcons','min','exit','576549WbLAEf','updateRepeatingVisualStateAnimation','ICON_BUFF_START','addChild','updateDistortionOpacity','isActing','isStateAffected','_frame','getStateOverlayIndex','391106NOblrC','param','motion','animation','Game_Battler_onAddState','891559buAKPQ','isActor','split','ARRAYFUNC','150438tAdnRL','visualStateToneTargetSprite','createVisualBattlerOpacity','STR','Game_BattlerBase_die','extraPositionY','FlashDuration','cos','increaseBuff','_hoverRand','checkCacheKey','Sprite_Battler_updateDragonbonesTimeScale','filter','_stateSprite','165923htEkru','opacity','speed','AnimationMirror','Game_BattlerBase_refresh','addLoadListener','JSON','General','trim','isDead','getVisualRepeatingStateAnimation','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','toLowerCase','map','states','updateFrame','die','_stateMotionLocked','initVisualStateEffects','ARRAYSTR','updateVisualStateEffectsOverlay','_cache','Sprite_Enemy_update','Game_Battler_onRemoveState','createStateIconSprite','parse','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Sprite_Actor_update','_customStateMotion','visible','FlashColor','prototype','battleUIOffsetX','Add','ARRAYJSON','hoverData','setupBuffDebuffPopup','ConvertParams','VisuMZ_1_BattleCore','State','ARRAYEVAL','Sprite_Battler_extraPositionY','_dragonbones','parameters','Sprite_SvEnemy_refreshMotion','isInputting','setupVisualStateEffectsPopup','setupStateAnimation','deathStateId','setBattler','%1TextColor','toUpperCase','floor','rate','iconIndex','flashColor','Debuff','smooth','Sprite_Battler_updateOpacity','customizeStatePopup','update','updateOpacity','flashDuration','_hoverMinimum','_svBattlerSprite','clamp','bitmap','updateVisualStateEffects','ARRAYNUM','updateVisualStateRainbow','_visualStateAnimationIndex','Buff','_visualStateAnimationRepeatDuration','hasSvBattler','visualRepeatingStateAnimation','ShowPopups','frameCount','getStateMotionLock','deathHover','traitObjects','startMotion','push','%1%2Animation','setupVisualStateEffect','includes','setupIconTextPopup','_actor','format','name','loadSystem','_die_bypass_visualStateEffects','isBattlerGrounded','stateOverlayIndex','onAddState','RepeatMirror','Settings','battler','visualStateRainbow','_battler','setColorTone','visualRepeatingStateAniCycle','getVisualRepeatingStateAnimationCycle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','visualBattlerOpacity','getStateMotionIndex','decreaseBuff','stateMotionLock','createVisualStateRainbow','isSceneBattle','426PMYdsk','initMembers','match','battleUIOffsetY','return\x200','_distortionSprite','constructor','isSpriteVisible','Sprite_Actor_updateFrame','AnimationMute','%1PopupFmt'];const _0x2709=function(_0x56967b,_0x5982f1){_0x56967b=_0x56967b-0x129;let _0x430304=_0x4303[_0x56967b];return _0x430304;};const _0x56f66d=_0x2709;(function(_0x3c2535,_0x411f5e){const _0x1f23f5=_0x2709;while(!![]){try{const _0x41f1c5=parseInt(_0x1f23f5(0x1e6))+-parseInt(_0x1f23f5(0x1c6))+-parseInt(_0x1f23f5(0x1cf))+-parseInt(_0x1f23f5(0x1a3))*parseInt(_0x1f23f5(0x184))+-parseInt(_0x1f23f5(0x1d8))+parseInt(_0x1f23f5(0x1d4))+-parseInt(_0x1f23f5(0x1ae))*-parseInt(_0x1f23f5(0x1a1));if(_0x41f1c5===_0x411f5e)break;else _0x3c2535['push'](_0x3c2535['shift']());}catch(_0x3c4558){_0x3c2535['push'](_0x3c2535['shift']());}}}(_0x4303,0x868a6));var label=_0x56f66d(0x1bb),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x56f66d(0x13d),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x56f66d(0x1e4)](function(_0x53b1c9){const _0x517c0e=_0x56f66d;return _0x53b1c9['status']&&_0x53b1c9['description'][_0x517c0e(0x16b)]('['+label+']');})[0x0];VisuMZ[label][_0x56f66d(0x176)]=VisuMZ[label][_0x56f66d(0x176)]||{},VisuMZ[_0x56f66d(0x13c)]=function(_0x255810,_0x49a2d0){const _0x6c83b8=_0x56f66d;for(const _0x10362a in _0x49a2d0){if(_0x10362a[_0x6c83b8(0x186)](/(.*):(.*)/i)){const _0x2a8983=String(RegExp['$1']),_0x1fb0e7=String(RegExp['$2'])[_0x6c83b8(0x14a)]()['trim']();let _0x1b141e,_0x1de8ce,_0x5eba39;switch(_0x1fb0e7){case'NUM':_0x1b141e=_0x49a2d0[_0x10362a]!==''?Number(_0x49a2d0[_0x10362a]):0x0;break;case _0x6c83b8(0x15b):_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0xd939de=>Number(_0xd939de));break;case _0x6c83b8(0x1ac):_0x1b141e=_0x49a2d0[_0x10362a]!==''?eval(_0x49a2d0[_0x10362a]):null;break;case _0x6c83b8(0x13f):_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0x273cab=>eval(_0x273cab));break;case _0x6c83b8(0x1ec):_0x1b141e=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):'';break;case _0x6c83b8(0x139):_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON['parse'](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0x2b104d=>JSON[_0x6c83b8(0x130)](_0x2b104d));break;case'FUNC':_0x1b141e=_0x49a2d0[_0x10362a]!==''?new Function(JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a])):new Function(_0x6c83b8(0x188));break;case _0x6c83b8(0x1d7):_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0x35b5bd=>new Function(JSON[_0x6c83b8(0x130)](_0x35b5bd)));break;case _0x6c83b8(0x1db):_0x1b141e=_0x49a2d0[_0x10362a]!==''?String(_0x49a2d0[_0x10362a]):'';break;case _0x6c83b8(0x12a):_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0x1c6ed1=>String(_0x1c6ed1));break;case'STRUCT':_0x5eba39=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):{},_0x1b141e=VisuMZ[_0x6c83b8(0x13c)]({},_0x5eba39);break;case'ARRAYSTRUCT':_0x1de8ce=_0x49a2d0[_0x10362a]!==''?JSON[_0x6c83b8(0x130)](_0x49a2d0[_0x10362a]):[],_0x1b141e=_0x1de8ce[_0x6c83b8(0x1f3)](_0x64270d=>VisuMZ[_0x6c83b8(0x13c)]({},JSON[_0x6c83b8(0x130)](_0x64270d)));break;default:continue;}_0x255810[_0x2a8983]=_0x1b141e;}}return _0x255810;},(_0x2d3cea=>{const _0x1222da=_0x56f66d,_0x3416bd=_0x2d3cea['name'];for(const _0x4b056c of dependencies){if(!Imported[_0x4b056c]){alert(_0x1222da(0x1f1)[_0x1222da(0x16e)](_0x3416bd,_0x4b056c)),SceneManager['exit']();break;}}const _0x2f1562=_0x2d3cea['description'];if(_0x2f1562[_0x1222da(0x186)](/\[Version[ ](.*?)\]/i)){const _0x829b34=Number(RegExp['$1']);_0x829b34!==VisuMZ[label]['version']&&(alert(_0x1222da(0x17d)['format'](_0x3416bd,_0x829b34)),SceneManager[_0x1222da(0x1c5)]());}if(_0x2f1562[_0x1222da(0x186)](/\[Tier[ ](\d+)\]/i)){const _0x47bf9d=Number(RegExp['$1']);_0x47bf9d<tier?(alert(_0x1222da(0x131)[_0x1222da(0x16e)](_0x3416bd,_0x47bf9d,tier)),SceneManager['exit']()):tier=Math[_0x1222da(0x1b4)](_0x47bf9d,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2d3cea[_0x1222da(0x142)]);})(pluginData),VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x198)]=Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x185)],Game_BattlerBase['prototype']['initMembers']=function(){const _0x313787=_0x56f66d;this['_cache']={},VisuMZ[_0x313787(0x1bb)]['Game_BattlerBase_initMembers'][_0x313787(0x19d)](this);},VisuMZ['VisualStateEffects'][_0x56f66d(0x1ea)]=Game_BattlerBase[_0x56f66d(0x136)]['refresh'],Game_BattlerBase['prototype'][_0x56f66d(0x1b6)]=function(){const _0x259980=_0x56f66d;this[_0x259980(0x12c)]={},VisuMZ[_0x259980(0x1bb)][_0x259980(0x1ea)][_0x259980(0x19d)](this);},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1e2)]=function(_0x160d8a){const _0x5c1ae5=_0x56f66d;return this[_0x5c1ae5(0x12c)]=this['_cache']||{},this[_0x5c1ae5(0x12c)][_0x160d8a]!==undefined;},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x1b2)]=Game_BattlerBase['prototype']['increaseBuff'],Game_BattlerBase['prototype'][_0x56f66d(0x1e0)]=function(_0x14910b){const _0x5545aa=_0x56f66d;VisuMZ[_0x5545aa(0x1bb)][_0x5545aa(0x1b2)][_0x5545aa(0x19d)](this,_0x14910b),this[_0x5545aa(0x1a0)](_0x14910b,!![]);},VisuMZ['VisualStateEffects'][_0x56f66d(0x1b1)]=Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x180)],Game_BattlerBase[_0x56f66d(0x136)]['decreaseBuff']=function(_0x406611){const _0x2b12bb=_0x56f66d;VisuMZ['VisualStateEffects'][_0x2b12bb(0x1b1)][_0x2b12bb(0x19d)](this,_0x406611),this[_0x2b12bb(0x1a0)](_0x406611,![]);},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1a0)]=function(_0x272d5a,_0x468d4d){const _0x342ea6=_0x56f66d;if(!SceneManager['isSceneBattle']())return;if(!this[_0x342ea6(0x177)]())return;const _0x375512=VisuMZ[_0x342ea6(0x1bb)]['Settings'][_0x342ea6(0x1aa)],_0x3e3bb5=_0x468d4d?_0x342ea6(0x15e):_0x342ea6(0x14f);_0x375512[_0x342ea6(0x162)]&&this[_0x342ea6(0x177)]()[_0x342ea6(0x13b)](_0x272d5a,_0x468d4d);if(_0x375512[_0x342ea6(0x19c)]){const _0x37503e=[this],_0x5c5199=_0x375512[_0x342ea6(0x169)[_0x342ea6(0x16e)](_0x3e3bb5,_0x272d5a)]||0x0,_0x2c0571=_0x375512[_0x342ea6(0x1e9)],_0xdffd28=_0x375512[_0x342ea6(0x18d)];$gameTemp[_0x342ea6(0x1b7)](_0x37503e,_0x5c5199,_0x2c0571,_0xdffd28);}},Game_BattlerBase['prototype'][_0x56f66d(0x16a)]=function(_0x70e711,_0x560fa1){const _0xe13730=_0x56f66d;if(!SceneManager[_0xe13730(0x183)]())return;if(_0x70e711===this[_0xe13730(0x147)]())return;if(_0x560fa1&&!this['isStateAffected'](_0x70e711))return;if(!_0x560fa1&&this[_0xe13730(0x1cc)](_0x70e711))return;if(!this[_0xe13730(0x177)]())return;const _0x44678c=VisuMZ['VisualStateEffects'][_0xe13730(0x176)][_0xe13730(0x13e)],_0x5e0b06=$dataStates[_0x70e711];if(!_0x5e0b06)return;_0x44678c[_0xe13730(0x162)]&&!_0x5e0b06[_0xe13730(0x1b9)]['match'](/<HIDE STATE POPUP>/i)&&this[_0xe13730(0x177)]()[_0xe13730(0x145)](_0x70e711,_0x560fa1),VisuMZ[_0xe13730(0x1bb)][_0xe13730(0x146)](this,_0x5e0b06,_0x560fa1);},VisuMZ[_0x56f66d(0x1bb)]['setupStateAnimation']=function(_0x4fbb89,_0x5118ce,_0x3e185f){const _0x3040df=_0x56f66d,_0x1a30d3=VisuMZ[_0x3040df(0x1bb)][_0x3040df(0x176)][_0x3040df(0x13e)],_0x170567=_0x1a30d3[_0x3040df(0x1e9)],_0x1b7d5e=_0x1a30d3[_0x3040df(0x18d)],_0x4efdda=_0x5118ce[_0x3040df(0x1b9)];if(_0x3e185f&&_0x4efdda[_0x3040df(0x186)](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x280a40=Number(RegExp['$1']);$gameTemp['requestFauxAnimation']([_0x4fbb89],_0x280a40,_0x170567,_0x1b7d5e);}if(!_0x3e185f&&_0x4efdda['match'](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x154e16=Number(RegExp['$1']);$gameTemp[_0x3040df(0x1b7)]([_0x4fbb89],_0x154e16,_0x170567,_0x1b7d5e);}},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1f0)]=function(){const _0x53cb3a=_0x56f66d,_0x32e4e5=_0x53cb3a(0x161);if(this['checkCacheKey'](_0x32e4e5))return this['_cache'][_0x32e4e5];return this[_0x53cb3a(0x12c)][_0x32e4e5]=this['createVisualRepeatingStateAnimation'](),this['_cache'][_0x32e4e5];},Game_BattlerBase[_0x56f66d(0x136)]['createVisualRepeatingStateAnimation']=function(){const _0x3e2f10=_0x56f66d;let _0x257683=[];for(const _0x5c20f7 of this['states']()){if(!_0x5c20f7)continue;_0x5c20f7[_0x3e2f10(0x1b9)]['match'](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x257683[_0x3e2f10(0x168)](Number(RegExp['$1'])||0x0);}return _0x257683;},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x17c)]=function(){const _0x3e30ba=_0x56f66d,_0x5ca742=_0x3e30ba(0x17b);if(this[_0x3e30ba(0x1e2)](_0x5ca742))return this[_0x3e30ba(0x12c)][_0x5ca742];return this['_cache'][_0x5ca742]=this['createVisualRepeatingStateAnimationCycle'](),this[_0x3e30ba(0x12c)][_0x5ca742];},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x19b)]=function(){const _0x4c4988=_0x56f66d;let _0x4ada9b=[];for(const _0x342077 of this[_0x4c4988(0x1f4)]()){if(!_0x342077)continue;_0x342077['note']['match'](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)?_0x4ada9b['push'](Number(RegExp['$1'])||0x0):_0x4ada9b[_0x4c4988(0x168)](VisuMZ[_0x4c4988(0x1bb)][_0x4c4988(0x176)][_0x4c4988(0x13e)][_0x4c4988(0x19f)]);}return _0x4ada9b;},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1bf)]=function(){const _0x50d389=_0x56f66d,_0x2f50cc=_0x50d389(0x1bf);if(this['checkCacheKey'](_0x2f50cc))return this['_cache'][_0x2f50cc];return this[_0x50d389(0x12c)][_0x2f50cc]=this[_0x50d389(0x17f)](),this['_cache'][_0x2f50cc];},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x17f)]=function(){const _0x4daecf=_0x56f66d,_0x3cdd4f=this['states']();for(const _0x16c93d of _0x3cdd4f){if(!_0x16c93d)continue;if(_0x16c93d['note'][_0x4daecf(0x186)](/<STATE MOTION:[ ](.*)>/i))return this[_0x4daecf(0x133)]=String(RegExp['$1'])[_0x4daecf(0x1f2)]()['trim'](),0x4;else{if(_0x16c93d[_0x4daecf(0x1d1)]!==0x0)return _0x16c93d[_0x4daecf(0x1d1)];}}return 0x0;},Game_BattlerBase[_0x56f66d(0x136)]['stateMotionLock']=function(){const _0x2fcd16=_0x56f66d,_0x259831=_0x2fcd16(0x181);if(this[_0x2fcd16(0x1e2)](_0x259831))return this[_0x2fcd16(0x12c)][_0x259831];return this[_0x2fcd16(0x12c)][_0x259831]=this[_0x2fcd16(0x164)](),this[_0x2fcd16(0x12c)][_0x259831];},Game_BattlerBase['prototype'][_0x56f66d(0x164)]=function(){const _0x37e5e3=_0x56f66d,_0x2ad547=this[_0x37e5e3(0x1f4)]();for(const _0x4f7dde of _0x2ad547){if(!_0x4f7dde)continue;if(_0x4f7dde[_0x37e5e3(0x1b9)][_0x37e5e3(0x186)](/<STATE MOTION (?:LOCK|LOCKED)>/i))return!![];}return![];},Game_BattlerBase[_0x56f66d(0x136)]['stateOverlayIndex']=function(){const _0x386e74=_0x56f66d,_0x46a08a=_0x386e74(0x173);if(this[_0x386e74(0x1e2)](_0x46a08a))return this[_0x386e74(0x12c)][_0x46a08a];return this[_0x386e74(0x12c)][_0x46a08a]=this[_0x386e74(0x1ce)](),this[_0x386e74(0x12c)][_0x46a08a];},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1ce)]=function(){const _0x440070=this['states']();for(const _0x1555ee of _0x440070){if(!_0x1555ee)continue;if(_0x1555ee['overlay']!==0x0)return _0x1555ee['overlay'];}return 0x0;},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1af)]=function(){const _0x4eadb8=_0x56f66d,_0x2e7291=_0x4eadb8(0x1a4);if(this[_0x4eadb8(0x1e2)](_0x2e7291))return this['_cache'][_0x2e7291];return this[_0x4eadb8(0x12c)][_0x2e7291]=this[_0x4eadb8(0x1b3)](),this[_0x4eadb8(0x12c)][_0x2e7291];},Game_BattlerBase[_0x56f66d(0x136)]['createVisualStateTone']=function(){const _0x3f8299=_0x56f66d;for(const _0x415ddd of this[_0x3f8299(0x1f4)]()){if(!_0x415ddd)continue;if(_0x415ddd['note'][_0x3f8299(0x186)](/<STATE TONE:[ ](.*)>/i)){let _0x3c45e8=String(RegExp['$1'])[_0x3f8299(0x1ee)]()[_0x3f8299(0x1d6)](',')[_0x3f8299(0x1f3)](_0x8332d0=>Number(_0x8332d0)||0x0);while(_0x3c45e8[_0x3f8299(0x1bc)]<0x4)_0x3c45e8[_0x3f8299(0x168)](0x0);return _0x3c45e8[0x0]=_0x3c45e8[0x0]['clamp'](-0xff,0xff),_0x3c45e8[0x1]=_0x3c45e8[0x1]['clamp'](-0xff,0xff),_0x3c45e8[0x2]=_0x3c45e8[0x2][_0x3f8299(0x158)](-0xff,0xff),_0x3c45e8[0x3]=_0x3c45e8[0x3]['clamp'](0x0,0xff),_0x3c45e8;}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x13a)]=function(){const _0xbe74cf=_0x56f66d,_0xb6db61=_0xbe74cf(0x13a);if(this['checkCacheKey'](_0xb6db61))return this[_0xbe74cf(0x12c)][_0xb6db61];return this[_0xbe74cf(0x12c)][_0xb6db61]=this[_0xbe74cf(0x1a9)](),this['_cache'][_0xb6db61];},Game_BattlerBase[_0x56f66d(0x136)]['createVisualHoveringData']=function(){const _0x18cd10=_0x56f66d,_0x593e36=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x4e8308={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0xe7113f of this[_0x18cd10(0x166)]()){if(!_0xe7113f)continue;if(_0xe7113f[_0x18cd10(0x1b9)][_0x18cd10(0x186)](_0x593e36)){_0x4e8308[_0x18cd10(0x18f)]=!![];const _0x31ecee=String(RegExp['$1']);_0x31ecee['match'](/BASE:[ ](.*)/i)&&(_0x4e8308[_0x18cd10(0x1ab)]=Number(RegExp['$1'])||0x0);_0x31ecee[_0x18cd10(0x186)](/SPEED:[ ](.*)/i)&&(_0x4e8308[_0x18cd10(0x1e8)]=Number(RegExp['$1'])||0x0);_0x31ecee[_0x18cd10(0x186)](/RATE:[ ](.*)/i)&&(_0x4e8308['rate']=Number(RegExp['$1'])||0x0);if(_0x31ecee[_0x18cd10(0x186)](/DEATH: HOVER/i))_0x4e8308['deathHover']=!![];else _0x31ecee[_0x18cd10(0x186)](/DEATH: FLOOR/i)&&(_0x4e8308[_0x18cd10(0x165)]=![]);break;}}return _0x4e8308;},VisuMZ[_0x56f66d(0x1bb)]['Game_Battler_onAddState']=Game_Battler['prototype'][_0x56f66d(0x174)],Game_Battler[_0x56f66d(0x136)][_0x56f66d(0x174)]=function(_0xfdb5e6){const _0x446916=_0x56f66d;VisuMZ[_0x446916(0x1bb)][_0x446916(0x1d3)][_0x446916(0x19d)](this,_0xfdb5e6),this[_0x446916(0x16a)](_0xfdb5e6,!![]);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x1dc)]=Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1f6)],Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x1f6)]=function(){const _0xcfe766=_0x56f66d;this[_0xcfe766(0x171)]=!![],VisuMZ[_0xcfe766(0x1bb)][_0xcfe766(0x1dc)]['call'](this),this[_0xcfe766(0x171)]=undefined;},VisuMZ['VisualStateEffects'][_0x56f66d(0x12e)]=Game_Battler[_0x56f66d(0x136)]['onRemoveState'],Game_Battler[_0x56f66d(0x136)][_0x56f66d(0x1a7)]=function(_0x58a2be){const _0x39f794=_0x56f66d;if(!this['_die_bypass_visualStateEffects'])this[_0x39f794(0x16a)](_0x58a2be,![]);VisuMZ[_0x39f794(0x1bb)][_0x39f794(0x12e)][_0x39f794(0x19d)](this,_0x58a2be);},VisuMZ[_0x56f66d(0x1bb)]['Sprite_Battler_initMembers']=Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x185)],Sprite_Battler['prototype'][_0x56f66d(0x185)]=function(){const _0x21f7a7=_0x56f66d;VisuMZ[_0x21f7a7(0x1bb)]['Sprite_Battler_initMembers']['call'](this),this[_0x21f7a7(0x129)](),this[_0x21f7a7(0x1b5)]();},Sprite_Battler[_0x56f66d(0x136)]['initVisualStateEffects']=function(){const _0xb71713=_0x56f66d;this[_0xb71713(0x15f)]=0x0,this['_visualStateAnimationIndex']=0x0;},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x13b)]=function(_0x4b7df1,_0x4b0b62){const _0x1e0366=_0x56f66d,_0x3dc59b=VisuMZ[_0x1e0366(0x1bb)][_0x1e0366(0x176)]['BuffDebuff'],_0x579330=_0x4b0b62?_0x1e0366(0x15e):'Debuff',_0x4cc399=_0x4b0b62?Game_BattlerBase[_0x1e0366(0x1c8)]:Game_BattlerBase[_0x1e0366(0x1b8)],_0x3aee0d=_0x4cc399+_0x4b7df1,_0x125051=TextManager[_0x1e0366(0x1d0)](_0x4b7df1),_0x61beae=_0x3dc59b[_0x1e0366(0x18e)[_0x1e0366(0x16e)](_0x579330)];if(_0x61beae['length']<=0x0)return;let _0x5bd0f2=_0x61beae['format'](_0x125051);const _0x1926bb={'textColor':_0x3dc59b[_0x1e0366(0x149)['format'](_0x579330)]||0x0,'flashColor':_0x3dc59b[_0x1e0366(0x190)['format'](_0x579330)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x3dc59b['%1FlashDuration'[_0x1e0366(0x16e)](_0x579330)]||0x0},_0x2af69c=ImageManager[_0x1e0366(0x170)](_0x1e0366(0x1c2));_0x2af69c[_0x1e0366(0x1eb)](this[_0x1e0366(0x16c)][_0x1e0366(0x1ad)](this,_0x3aee0d,_0x5bd0f2,_0x1926bb));},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x145)]=function(_0x1a6f34,_0x525ddd){const _0x7e15ee=_0x56f66d,_0x5e0b11=VisuMZ[_0x7e15ee(0x1bb)][_0x7e15ee(0x176)][_0x7e15ee(0x13e)],_0x9375c2=$dataStates[_0x1a6f34];if(!_0x9375c2)return;const _0x1d6ecd=_0x525ddd?_0x7e15ee(0x138):_0x7e15ee(0x196),_0x5f1522=_0x9375c2[_0x7e15ee(0x14d)];if(_0x5f1522<=0x0)return;const _0x2d4722=_0x5e0b11[_0x7e15ee(0x18e)[_0x7e15ee(0x16e)](_0x1d6ecd)];if(_0x2d4722[_0x7e15ee(0x1bc)]<=0x0)return;let _0x19b12a=_0x2d4722[_0x7e15ee(0x16e)](_0x9375c2[_0x7e15ee(0x16f)]);const _0xa98648={'textColor':_0x5e0b11['TextColor']||0x0,'flashColor':_0x5e0b11[_0x7e15ee(0x135)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x5e0b11[_0x7e15ee(0x1de)]||0x0};_0x5e0b11[_0x7e15ee(0x1bd)]&&(_0xa98648['textColor']=ColorManager['stateColor'](_0x9375c2));VisuMZ[_0x7e15ee(0x1bb)][_0x7e15ee(0x152)](_0x9375c2,_0xa98648);const _0x14ac80=ImageManager[_0x7e15ee(0x170)](_0x7e15ee(0x1c2));_0x14ac80['addLoadListener'](this[_0x7e15ee(0x16c)][_0x7e15ee(0x1ad)](this,_0x5f1522,_0x19b12a,_0xa98648));},VisuMZ['VisualStateEffects']['customizeStatePopup']=function(_0x5030fe,_0x3998ef){const _0x32bf1a=_0x56f66d,_0x4d8894=_0x5030fe[_0x32bf1a(0x1b9)];if(_0x4d8894[_0x32bf1a(0x186)](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x2abedd=String(RegExp['$1'])[_0x32bf1a(0x1ee)]()[_0x32bf1a(0x1d6)](/[\r\n]+/);for(const _0x408e1f of _0x2abedd){_0x408e1f[_0x32bf1a(0x186)](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x3998ef[_0x32bf1a(0x194)]=String(RegExp['$1'])[_0x32bf1a(0x1ee)]());if(_0x408e1f['match'](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){_0x3998ef['flashColor']=String(RegExp['$1'])[_0x32bf1a(0x1ee)]()[_0x32bf1a(0x1d6)](',')[_0x32bf1a(0x1f3)](_0x28f698=>Number(_0x28f698));while(_0x3998ef['flashColor']['length']<=0x4){_0x3998ef[_0x32bf1a(0x14e)][_0x32bf1a(0x168)](0x0);};_0x3998ef[_0x32bf1a(0x155)]=_0x3998ef[_0x32bf1a(0x155)]||0x1;}_0x408e1f[_0x32bf1a(0x186)](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x3998ef[_0x32bf1a(0x155)]=Number(RegExp['$1']));}}},Sprite_Battler[_0x56f66d(0x136)]['updateRepeatingVisualStateAnimation']=function(){const _0xf2efa4=_0x56f66d;if(!this[_0xf2efa4(0x179)])return;if(!this[_0xf2efa4(0x179)][_0xf2efa4(0x18b)]())return;if(this[_0xf2efa4(0x15f)]>0x0){this[_0xf2efa4(0x15f)]--;return;}const _0x1b2773=this[_0xf2efa4(0x179)][_0xf2efa4(0x1f0)](),_0x21201a=this[_0xf2efa4(0x179)][_0xf2efa4(0x17c)]();if(_0x1b2773[_0xf2efa4(0x1bc)]<=0x0)return;this[_0xf2efa4(0x15d)]>=_0x1b2773[_0xf2efa4(0x1bc)]&&(this[_0xf2efa4(0x15d)]=0x0);const _0x695c91=_0x1b2773[this[_0xf2efa4(0x15d)]],_0x58d503=VisuMZ['VisualStateEffects'][_0xf2efa4(0x176)]['State'],_0x3ded47=[this['_battler']],_0x469ee8=_0x58d503[_0xf2efa4(0x175)],_0x528103=_0x58d503['RepeatMute'];$gameTemp[_0xf2efa4(0x1b7)](_0x3ded47,_0x695c91,_0x469ee8,_0x528103);const _0x3356b6=_0x21201a[this[_0xf2efa4(0x15d)]]||_0x58d503[_0xf2efa4(0x19f)];this[_0xf2efa4(0x15f)]=_0x3356b6,this[_0xf2efa4(0x15d)]++;},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x15a)]=function(){const _0x10d621=_0x56f66d;this[_0x10d621(0x1b0)]&&this['updateVisualStateEffectsIcons'](),this[_0x10d621(0x1e5)]&&this[_0x10d621(0x12b)](),this[_0x10d621(0x1c7)](),this['updateVisualStateTone'](),this['updateVisualStateRainbow']();},Sprite_Battler['prototype'][_0x56f66d(0x1c3)]=function(){const _0x16bd0b=_0x56f66d;if(!this[_0x16bd0b(0x179)])return;const _0x8ce6fd=VisuMZ[_0x16bd0b(0x1bb)][_0x16bd0b(0x176)]['General'],_0x4d4073=this[_0x16bd0b(0x1b0)];_0x4d4073[_0x16bd0b(0x134)]=this[_0x16bd0b(0x179)][_0x16bd0b(0x1d5)]()?_0x8ce6fd[_0x16bd0b(0x1a2)]:_0x8ce6fd[_0x16bd0b(0x191)],this[_0x16bd0b(0x179)][_0x16bd0b(0x1d5)]()&&(_0x4d4073['x']=0x0,this[_0x16bd0b(0x179)][_0x16bd0b(0x137)]&&(_0x4d4073['x']+=this[_0x16bd0b(0x179)]['battleUIOffsetX']()),_0x4d4073['y']=-Math[_0x16bd0b(0x1c1)]((this['height']+0x28)*0.9),_0x4d4073['y']<0x14-this['y']&&(_0x4d4073['y']=0x14-this['y']),this['_battler'][_0x16bd0b(0x187)]&&(_0x4d4073['y']+=this[_0x16bd0b(0x179)][_0x16bd0b(0x187)]()));},Sprite_Battler[_0x56f66d(0x136)]['updateVisualStateEffectsOverlay']=function(){const _0x2f05ec=_0x56f66d;if(!this[_0x2f05ec(0x179)])return;const _0x35e09d=VisuMZ[_0x2f05ec(0x1bb)]['Settings'][_0x2f05ec(0x1ed)],_0xd89cfc=this[_0x2f05ec(0x1e5)];_0xd89cfc['visible']=this['_battler'][_0x2f05ec(0x1d5)]()?_0x35e09d['ActorOverlay']:_0x35e09d['EnemyOverlay'];this[_0x2f05ec(0x157)]&&(this[_0x2f05ec(0x157)]['_stateSprite'][_0x2f05ec(0x134)]=![]);this['_battler']['isEnemy']()&&!this[_0x2f05ec(0x179)][_0x2f05ec(0x160)]()&&(this['_stateIconSprite']?_0xd89cfc['y']=this['_stateIconSprite']['y']+_0xd89cfc[_0x2f05ec(0x195)]:_0xd89cfc['y']=-this[_0x2f05ec(0x195)]+_0xd89cfc[_0x2f05ec(0x195)]);;},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x199)]=function(){const _0x470444=_0x56f66d;if(!this['_battler'])return;const _0x4dfdf5=this[_0x470444(0x1d9)](),_0x789dd3=this['_battler'][_0x470444(0x1af)]();_0x4dfdf5&&_0x4dfdf5['setColorTone'](_0x789dd3),this[_0x470444(0x193)]&&this[_0x470444(0x193)][_0x470444(0x17a)](_0x789dd3);},Sprite_Battler['prototype'][_0x56f66d(0x1d9)]=function(){return this['_mainSprite']||this;},VisuMZ[_0x56f66d(0x1bb)]['Sprite_Battler_updateDragonbonesTimeScale']=Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x1a8)],Sprite_Battler[_0x56f66d(0x136)]['updateDragonbonesTimeScale']=function(){const _0x20164d=_0x56f66d;if(!this[_0x20164d(0x141)])return;this[_0x20164d(0x179)][_0x20164d(0x181)]()?this[_0x20164d(0x141)][_0x20164d(0x1d2)]['timeScale']=0x0:VisuMZ[_0x20164d(0x1bb)][_0x20164d(0x1e3)][_0x20164d(0x19d)](this);},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x1b5)]=function(){this['_hoverMinimum']=-0x1;},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x140)]=Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x1dd)],Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x1dd)]=function(){const _0x5f00df=_0x56f66d;let _0x32a5=VisuMZ[_0x5f00df(0x1bb)][_0x5f00df(0x140)][_0x5f00df(0x19d)](this);return _0x32a5-=Math['floor'](this['hoverHeight']()),_0x32a5;},Sprite_Battler[_0x56f66d(0x136)]['hoverHeight']=function(){const _0x450c97=_0x56f66d;if(this['constructor']===Sprite_SvEnemy)return 0x0;if(!this['_battler'])return 0x0;if(this['_battler']['isBattlerGrounded']&&this[_0x450c97(0x179)][_0x450c97(0x172)]())return 0x0;const _0x537a29=this[_0x450c97(0x179)][_0x450c97(0x13a)]();let _0x450500=0x0;this[_0x450c97(0x1e1)]=this[_0x450c97(0x1e1)]||Math[_0x450c97(0x14b)](Math['random']()*0x2710);const _0x3cd509=Graphics[_0x450c97(0x163)]+this[_0x450c97(0x1e1)],_0xdb47fa=_0x537a29['speed'],_0x54f0bd=_0x537a29[_0x450c97(0x14c)];let _0x53aab0=_0x537a29[_0x450c97(0x18f)];if(_0x53aab0&&this['_battler'][_0x450c97(0x1ef)]())_0x53aab0=_0x537a29[_0x450c97(0x165)];if(_0x53aab0){_0x450500+=Math[_0x450c97(0x1df)](_0x3cd509/(_0xdb47fa||0x1))*_0x54f0bd,_0x450500+=_0x537a29[_0x450c97(0x1ab)];if(this['_hoverMinimum']<0x0)this[_0x450c97(0x156)]=_0x450500;const _0xd72963=this[_0x450c97(0x156)]+_0xdb47fa/Math[_0x450c97(0x1b4)](0x1,_0x54f0bd**1.5);this[_0x450c97(0x156)]=Math[_0x450c97(0x1c4)](_0xd72963,_0x450500);}else{const _0x1f13a9=this[_0x450c97(0x156)]-_0xdb47fa/Math[_0x450c97(0x1b4)](0x1,_0x54f0bd/0x2);this[_0x450c97(0x156)]=Math[_0x450c97(0x1b4)](_0x1f13a9,0x0);}return Math['max'](0x0,this['_hoverMinimum']);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x151)]=Sprite_Battler['prototype'][_0x56f66d(0x154)],Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x154)]=function(){const _0x4c4e43=_0x56f66d;VisuMZ['VisualStateEffects'][_0x4c4e43(0x151)][_0x4c4e43(0x19d)](this),this[_0x4c4e43(0x1ca)]();},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x1ca)]=function(){const _0x35a244=_0x56f66d;if(!this[_0x35a244(0x189)])return;if(!this[_0x35a244(0x179)])return;if(this['constructor']===Sprite_SvEnemy)return;const _0x3fd975=this['_battler'][_0x35a244(0x17e)]();if(this[_0x35a244(0x189)]['opacity']!==_0x3fd975){const _0x12cab6=0x8;this[_0x35a244(0x189)][_0x35a244(0x1e7)]>_0x3fd975?this[_0x35a244(0x189)][_0x35a244(0x1e7)]=Math[_0x35a244(0x1b4)](this['_distortionSprite']['opacity']-_0x12cab6,_0x3fd975):this[_0x35a244(0x189)]['opacity']=Math[_0x35a244(0x1c4)](this[_0x35a244(0x189)]['opacity']+_0x12cab6,_0x3fd975);}},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x17e)]=function(){const _0x19b1b0=_0x56f66d,_0xb7aa4c='visualBattlerOpacity';if(this[_0x19b1b0(0x1e2)](_0xb7aa4c))return this[_0x19b1b0(0x12c)][_0xb7aa4c];return this[_0x19b1b0(0x12c)][_0xb7aa4c]=this[_0x19b1b0(0x1da)](),this['_cache'][_0xb7aa4c];},Game_BattlerBase[_0x56f66d(0x136)]['createVisualBattlerOpacity']=function(){const _0xb1307b=_0x56f66d;for(const _0x3b6b2a of this[_0xb1307b(0x1f4)]()){if(!_0x3b6b2a)continue;if(_0x3b6b2a[_0xb1307b(0x1b9)][_0xb1307b(0x186)](/<VISUAL OPACITY:[ ](\d+)([%％])>/i)){const _0x217e05=Number(RegExp['$1'])*0.01;return Math['round'](_0x217e05*0xff)[_0xb1307b(0x158)](0x0,0xff);}if(_0x3b6b2a[_0xb1307b(0x1b9)][_0xb1307b(0x186)](/<VISUAL OPACITY:[ ](\d+)>/i))return Number(RegExp['$1'])[_0xb1307b(0x158)](0x0,0xff);}return 0xff;},Sprite_Battler[_0x56f66d(0x136)][_0x56f66d(0x15c)]=function(){const _0x15239d=_0x56f66d;if(!this[_0x15239d(0x179)])return;const _0xb4131e=this[_0x15239d(0x179)]['visualStateRainbow']();if(_0xb4131e===0x0&&this[_0x15239d(0x189)][_0x15239d(0x1be)]!==0x0)this[_0x15239d(0x189)]['setHue'](0x0);else{let _0x4661dd=this[_0x15239d(0x189)][_0x15239d(0x1be)]+_0xb4131e;_0x4661dd%=0x168,this[_0x15239d(0x189)]['setHue'](_0x4661dd);}},Game_BattlerBase['prototype'][_0x56f66d(0x178)]=function(){const _0xf24eb=_0x56f66d,_0x380932=_0xf24eb(0x178);if(this[_0xf24eb(0x1e2)](_0x380932))return this['_cache'][_0x380932];return this[_0xf24eb(0x12c)][_0x380932]=this['createVisualStateRainbow'](),this[_0xf24eb(0x12c)][_0x380932];},Game_BattlerBase[_0x56f66d(0x136)][_0x56f66d(0x182)]=function(){const _0x2f395b=_0x56f66d;for(const _0x45423c of this[_0x2f395b(0x1f4)]()){if(!_0x45423c)continue;if(_0x45423c['note'][_0x2f395b(0x186)](/<VISUAL RAINBOW:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},VisuMZ[_0x56f66d(0x1bb)]['Sprite_Actor_createStateSprite']=Sprite_Actor['prototype'][_0x56f66d(0x19e)],Sprite_Actor[_0x56f66d(0x136)]['createStateSprite']=function(){const _0x4ddccd=_0x56f66d;VisuMZ[_0x4ddccd(0x1bb)][_0x4ddccd(0x1a6)]['call'](this),this['createStateIconSprite']();},Sprite_Actor[_0x56f66d(0x136)]['createStateIconSprite']=function(){const _0x2e54d8=_0x56f66d;if(this[_0x2e54d8(0x18a)]!==Sprite_Actor)return;this['_stateIconSprite']=new Sprite_StateIcon(),this[_0x2e54d8(0x1c9)](this[_0x2e54d8(0x1b0)]),this[_0x2e54d8(0x1b0)][_0x2e54d8(0x159)][_0x2e54d8(0x150)]=![];},VisuMZ['VisualStateEffects']['Sprite_Actor_refreshMotion']=Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x1c0)],Sprite_Actor['prototype'][_0x56f66d(0x1c0)]=function(){const _0x1b691a=_0x56f66d,_0x4b7f40=this[_0x1b691a(0x16d)];if(!_0x4b7f40)return;const _0x2948fd=_0x4b7f40['stateMotionIndex']();if(_0x2948fd>=0x4){if(!_0x4b7f40[_0x1b691a(0x144)]()&&!_0x4b7f40[_0x1b691a(0x1cb)]())return this[_0x1b691a(0x167)](_0x4b7f40['_customStateMotion']);}VisuMZ[_0x1b691a(0x1bb)][_0x1b691a(0x197)][_0x1b691a(0x19d)](this);},VisuMZ[_0x56f66d(0x1bb)]['Sprite_SvEnemy_refreshMotion']=Sprite_SvEnemy['prototype'][_0x56f66d(0x1c0)],Sprite_SvEnemy['prototype'][_0x56f66d(0x1c0)]=function(){const _0x32b909=_0x56f66d,_0x38b560=this[_0x32b909(0x16d)];if(!_0x38b560)return;const _0x1a7634=_0x38b560[_0x32b909(0x1bf)]();if(_0x1a7634>=0x4){if(!_0x38b560[_0x32b909(0x144)]()&&!_0x38b560[_0x32b909(0x1cb)]())return this[_0x32b909(0x167)](_0x38b560[_0x32b909(0x133)]);}VisuMZ[_0x32b909(0x1bb)][_0x32b909(0x143)][_0x32b909(0x19d)](this);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x192)]=Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x148)],Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x148)]=function(_0x254304){const _0x5babdc=_0x56f66d;VisuMZ[_0x5babdc(0x1bb)]['Sprite_Actor_setBattler'][_0x5babdc(0x19d)](this,_0x254304);if(this[_0x5babdc(0x1b0)])this[_0x5babdc(0x1b0)]['setup'](_0x254304);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x132)]=Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x153)],Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x153)]=function(){const _0x1dad7a=_0x56f66d;VisuMZ[_0x1dad7a(0x1bb)][_0x1dad7a(0x132)][_0x1dad7a(0x19d)](this),this[_0x1dad7a(0x15a)]();},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x18c)]=Sprite_Actor[_0x56f66d(0x136)][_0x56f66d(0x1f5)],Sprite_Actor['prototype'][_0x56f66d(0x1f5)]=function(){const _0x219d4a=_0x56f66d;if(this[_0x219d4a(0x179)][_0x219d4a(0x181)]()&&this[_0x219d4a(0x19a)]&&this[_0x219d4a(0x19a)]['bitmap']){if(this[_0x219d4a(0x1f7)])return;this['_stateMotionLocked']=this['_mainSprite'][_0x219d4a(0x1cd)]['width']>0x0;}else this[_0x219d4a(0x1f7)]=![];VisuMZ['VisualStateEffects'][_0x219d4a(0x18c)][_0x219d4a(0x19d)](this);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x1ba)]=Sprite_Enemy[_0x56f66d(0x136)][_0x56f66d(0x12f)],Sprite_Enemy['prototype'][_0x56f66d(0x12f)]=function(){const _0x447341=_0x56f66d;this['createStateSprite'](),VisuMZ[_0x447341(0x1bb)]['Sprite_Enemy_createStateIconSprite'][_0x447341(0x19d)](this);},Sprite_Enemy[_0x56f66d(0x136)][_0x56f66d(0x19e)]=function(){const _0x1166dc=_0x56f66d;this['_stateSprite']=new Sprite_StateOverlay(),this[_0x1166dc(0x1c9)](this[_0x1166dc(0x1e5)]);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x1a5)]=Sprite_Enemy[_0x56f66d(0x136)][_0x56f66d(0x148)],Sprite_Enemy['prototype']['setBattler']=function(_0x1768d0){const _0x20b068=_0x56f66d;VisuMZ[_0x20b068(0x1bb)][_0x20b068(0x1a5)][_0x20b068(0x19d)](this,_0x1768d0);if(this[_0x20b068(0x1e5)])this['_stateSprite']['setup'](_0x1768d0);},VisuMZ[_0x56f66d(0x1bb)][_0x56f66d(0x12d)]=Sprite_Enemy['prototype'][_0x56f66d(0x153)],Sprite_Enemy[_0x56f66d(0x136)]['update']=function(){const _0x60a7fc=_0x56f66d;VisuMZ[_0x60a7fc(0x1bb)][_0x60a7fc(0x12d)][_0x60a7fc(0x19d)](this),this[_0x60a7fc(0x15a)]();};