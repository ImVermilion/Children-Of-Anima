//=============================================================================
// VisuStella MZ - WeaknessPopups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 * 
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
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
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

const _0x3e31=['JSON','addChild','isSceneBattle','Element75','355682zQzLyY','filter','createWeaknessPopups','_battler','startSpeedX','center','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_battleField','_fadeDuration','anchor','22ewCmJn','WeaknessPopups','263317FDuHqH','rgba(1,\x201,\x201,\x201)','parameters','ARRAYNUM','createWeaknessPopupType','Element175','opacity','Settings','updateOpacity','#ffffff','loadWeaknessPopupBitmap','isDamage','exit','10993dSsGxt','destroy','getWeaknessPopupData','offsetXvariance','ARRAYSTR','opaqueDuration','_data','initPosition','fontFace','bitmap','deltaSpeedX','none','height','1tkNQZp','_baseY','Element105','Element110','offsetYvariance','37226qJLssv','create','filename','initMembers','Element150','width','drawText','executeDamage','_spriteset','_weaknessPopupsContainer','_scaleDuration','includes','935365ImiEvR','targetScaleY','ARRAYJSON','Element200','ConvertParams','Element90','752570BsuAnI','25XuoQCV','createWeaknessPopupsContainer','constructor','updateWeaknessPopupsContainer','ARRAYFUNC','createBattleField','startSpeedY','Element25','TEXT','calcElementRate','call','ElementNegative','createWeaknessPopup','scale','targetScaleX','_opaqueDuration','_speedY','max','update','outlineSize','enabled','map','prototype','getColor','Element0','FUNC','_targetScaleX','_scene','trim','randomInt','updatePosition','createBitmapImage','parse','startScaleY','#%1','match','adjustFlippedBattlefield','fontItalic','result','Spriteset_Battle_update','ARRAYEVAL','updateScaling','description','text','textColor','Spriteset_Battle_createBattleField','_damageContainer','_speedX','1tnGMNn','createWeaknessPopupsForCritical','critical','startScaleX','bitmapHeight','fontBold','removeChild','DefaultPopupSettings','loadSystem','Spriteset_Battle_adjustFlippedBattlefield','initialize','fontSize','name','STR','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','deltaSpeedY','EVAL','_targetScaleY','createWeaknessPopupsForElementRate','ARRAYSTRUCT','Element101','525521JRAJCc','Game_Action_executeDamage','outlineColor','Critical','format'];const _0x5bd0=function(_0x5b2665,_0x1b40e0){_0x5b2665=_0x5b2665-0x1e1;let _0x3e318f=_0x3e31[_0x5b2665];return _0x3e318f;};const _0x4a7f48=_0x5bd0;(function(_0x30b4a4,_0x1e4f63){const _0x4435f3=_0x5bd0;while(!![]){try{const _0x44bf98=parseInt(_0x4435f3(0x211))+-parseInt(_0x4435f3(0x21d))+parseInt(_0x4435f3(0x248))*-parseInt(_0x4435f3(0x237))+parseInt(_0x4435f3(0x24f))*parseInt(_0x4435f3(0x23c))+parseInt(_0x4435f3(0x21b))*parseInt(_0x4435f3(0x22a))+parseInt(_0x4435f3(0x24e))+-parseInt(_0x4435f3(0x208))*parseInt(_0x4435f3(0x1f3));if(_0x44bf98===_0x1e4f63)break;else _0x30b4a4['push'](_0x30b4a4['shift']());}catch(_0x5e048e){_0x30b4a4['push'](_0x30b4a4['shift']());}}}(_0x3e31,0x87e01));var label=_0x4a7f48(0x21c),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4a7f48(0x212)](function(_0x1fe470){const _0x43c4a9=_0x4a7f48;return _0x1fe470['status']&&_0x1fe470[_0x43c4a9(0x1ed)][_0x43c4a9(0x247)]('['+label+']');})[0x0];VisuMZ[label][_0x4a7f48(0x224)]=VisuMZ[label][_0x4a7f48(0x224)]||{},VisuMZ[_0x4a7f48(0x24c)]=function(_0x3d4f9a,_0x4f4f3b){const _0x15e860=_0x4a7f48;for(const _0x529c20 in _0x4f4f3b){if(_0x529c20[_0x15e860(0x1e6)](/(.*):(.*)/i)){const _0x45dbfc=String(RegExp['$1']),_0x20e920=String(RegExp['$2'])['toUpperCase']()[_0x15e860(0x26b)]();let _0x571e9b,_0x558001,_0x2d54f4;switch(_0x20e920){case'NUM':_0x571e9b=_0x4f4f3b[_0x529c20]!==''?Number(_0x4f4f3b[_0x529c20]):0x0;break;case _0x15e860(0x220):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001[_0x15e860(0x264)](_0x537bfc=>Number(_0x537bfc));break;case _0x15e860(0x203):_0x571e9b=_0x4f4f3b[_0x529c20]!==''?eval(_0x4f4f3b[_0x529c20]):null;break;case _0x15e860(0x1eb):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001[_0x15e860(0x264)](_0x4a7283=>eval(_0x4a7283));break;case _0x15e860(0x20d):_0x571e9b=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):'';break;case _0x15e860(0x24a):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001[_0x15e860(0x264)](_0x1c9623=>JSON[_0x15e860(0x1e3)](_0x1c9623));break;case _0x15e860(0x268):_0x571e9b=_0x4f4f3b[_0x529c20]!==''?new Function(JSON['parse'](_0x4f4f3b[_0x529c20])):new Function('return\x200');break;case _0x15e860(0x253):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001[_0x15e860(0x264)](_0x1d6eb3=>new Function(JSON[_0x15e860(0x1e3)](_0x1d6eb3)));break;case _0x15e860(0x200):_0x571e9b=_0x4f4f3b[_0x529c20]!==''?String(_0x4f4f3b[_0x529c20]):'';break;case _0x15e860(0x22e):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001['map'](_0x338211=>String(_0x338211));break;case'STRUCT':_0x2d54f4=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):{},_0x571e9b=VisuMZ[_0x15e860(0x24c)]({},_0x2d54f4);break;case _0x15e860(0x206):_0x558001=_0x4f4f3b[_0x529c20]!==''?JSON[_0x15e860(0x1e3)](_0x4f4f3b[_0x529c20]):[],_0x571e9b=_0x558001['map'](_0x306fde=>VisuMZ[_0x15e860(0x24c)]({},JSON[_0x15e860(0x1e3)](_0x306fde)));break;default:continue;}_0x3d4f9a[_0x45dbfc]=_0x571e9b;}}return _0x3d4f9a;},(_0x8f11c=>{const _0xbc5eb9=_0x4a7f48,_0x335ba0=_0x8f11c[_0xbc5eb9(0x1ff)];for(const _0x567c48 of dependencies){if(!Imported[_0x567c48]){alert(_0xbc5eb9(0x201)[_0xbc5eb9(0x20c)](_0x335ba0,_0x567c48)),SceneManager['exit']();break;}}const _0x41d834=_0x8f11c[_0xbc5eb9(0x1ed)];if(_0x41d834['match'](/\[Version[ ](.*?)\]/i)){const _0x57601d=Number(RegExp['$1']);_0x57601d!==VisuMZ[label]['version']&&(alert(_0xbc5eb9(0x217)[_0xbc5eb9(0x20c)](_0x335ba0,_0x57601d)),SceneManager[_0xbc5eb9(0x229)]());}if(_0x41d834[_0xbc5eb9(0x1e6)](/\[Tier[ ](\d+)\]/i)){const _0x42708d=Number(RegExp['$1']);_0x42708d<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x335ba0,_0x42708d,tier)),SceneManager[_0xbc5eb9(0x229)]()):tier=Math[_0xbc5eb9(0x260)](_0x42708d,tier);}VisuMZ[_0xbc5eb9(0x24c)](VisuMZ[label]['Settings'],_0x8f11c[_0xbc5eb9(0x21f)]);})(pluginData),ColorManager[_0x4a7f48(0x266)]=function(_0x2210a0){const _0x1309ca=_0x4a7f48;return _0x2210a0=String(_0x2210a0),_0x2210a0[_0x1309ca(0x1e6)](/#(.*)/i)?_0x1309ca(0x1e5)[_0x1309ca(0x20c)](String(RegExp['$1'])):this[_0x1309ca(0x1ef)](Number(_0x2210a0));},SceneManager[_0x4a7f48(0x20f)]=function(){const _0x24fb93=_0x4a7f48;return this[_0x24fb93(0x26a)]&&this[_0x24fb93(0x26a)][_0x24fb93(0x251)]===Scene_Battle;},VisuMZ[_0x4a7f48(0x21c)][_0x4a7f48(0x209)]=Game_Action[_0x4a7f48(0x265)][_0x4a7f48(0x243)],Game_Action[_0x4a7f48(0x265)][_0x4a7f48(0x243)]=function(_0x2f41f7,_0x58eae5){const _0x13a450=_0x4a7f48;VisuMZ[_0x13a450(0x21c)][_0x13a450(0x209)][_0x13a450(0x259)](this,_0x2f41f7,_0x58eae5),this[_0x13a450(0x213)](_0x2f41f7,_0x58eae5);},Game_Action['prototype']['createWeaknessPopups']=function(_0x4b3b65,_0x10cee8){const _0x3bcedc=_0x4a7f48;if(!SceneManager[_0x3bcedc(0x20f)]())return;if(!this[_0x3bcedc(0x228)]())return;this[_0x3bcedc(0x1f4)](_0x4b3b65,_0x10cee8),this[_0x3bcedc(0x205)](_0x4b3b65,_0x10cee8);},Game_Action['prototype'][_0x4a7f48(0x1f4)]=function(_0x153f32,_0x5c601b){const _0x4160fd=_0x4a7f48,_0x5e535d=_0x153f32[_0x4160fd(0x1e9)]();if(!_0x5e535d[_0x4160fd(0x1f5)])return;const _0x583fb0=SceneManager[_0x4160fd(0x26a)][_0x4160fd(0x244)];if(!_0x583fb0)return;_0x583fb0['createWeaknessPopupType'](_0x153f32,_0x4160fd(0x20b));},Game_Action[_0x4a7f48(0x265)][_0x4a7f48(0x205)]=function(_0x49099e,_0x2697ab){const _0x1c3de0=_0x4a7f48,_0x3885e8=SceneManager[_0x1c3de0(0x26a)][_0x1c3de0(0x244)];if(!_0x3885e8)return;const _0x49710c=this[_0x1c3de0(0x258)](_0x49099e);let _0x5ec07e=_0x1c3de0(0x235);if(_0x49710c===0x0)_0x5ec07e=_0x1c3de0(0x267);else{if(_0x49710c<0x0)_0x5ec07e=_0x1c3de0(0x25a);else{if(_0x49710c>=0x2)_0x5ec07e=_0x1c3de0(0x24b);else{if(_0x49710c>=1.75)_0x5ec07e=_0x1c3de0(0x222);else{if(_0x49710c>=1.5)_0x5ec07e=_0x1c3de0(0x240);else{if(_0x49710c>=1.25)_0x5ec07e='Element125';else{if(_0x49710c>=1.1)_0x5ec07e=_0x1c3de0(0x23a);else{if(_0x49710c>=1.05)_0x5ec07e=_0x1c3de0(0x239);else{if(_0x49710c>=1.01)_0x5ec07e=_0x1c3de0(0x207);else{if(_0x49710c<=0.25)_0x5ec07e=_0x1c3de0(0x256);else{if(_0x49710c<=0.5)_0x5ec07e=_0x1c3de0(0x210);else{if(_0x49710c<=0.75)_0x5ec07e=_0x1c3de0(0x24d);else{if(_0x49710c<=0.9)_0x5ec07e='Element95';else _0x49710c<=0.99&&(_0x5ec07e='Element99');}}}}}}}}}}}}_0x3885e8['createWeaknessPopupType'](_0x49099e,_0x5ec07e);};function Sprite_WeaknessPopup(){const _0x23308a=_0x4a7f48;this[_0x23308a(0x1fd)](...arguments);}Sprite_WeaknessPopup['prototype']=Object[_0x4a7f48(0x23d)](Sprite[_0x4a7f48(0x265)]),Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x251)]=Sprite_WeaknessPopup,Sprite_WeaknessPopup[_0x4a7f48(0x265)]['initialize']=function(_0x4535ff,_0x359046){const _0x4bc546=_0x4a7f48;this['_battler']=_0x4535ff,this[_0x4bc546(0x230)]=_0x359046,this[_0x4bc546(0x23f)](),Sprite['prototype']['initialize'][_0x4bc546(0x259)](this),this['createBitmap'](),this[_0x4bc546(0x231)]();},Sprite_WeaknessPopup[_0x4a7f48(0x265)]['createBitmap']=function(){const _0xbc110c=_0x4a7f48;this[_0xbc110c(0x230)][_0xbc110c(0x23e)]?this[_0xbc110c(0x227)]():this[_0xbc110c(0x1e2)]();},Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x227)]=function(){const _0x5251a2=_0x4a7f48;this['bitmap']=ImageManager[_0x5251a2(0x1fb)](this[_0x5251a2(0x230)]['filename']);},Sprite_WeaknessPopup['prototype']['createBitmapImage']=function(){const _0x428748=_0x4a7f48;this['bitmap']=new Bitmap(this[_0x428748(0x230)]['bitmapWidth'],this[_0x428748(0x230)][_0x428748(0x1f7)]),this[_0x428748(0x233)][_0x428748(0x232)]=this['_data'][_0x428748(0x232)],this[_0x428748(0x233)][_0x428748(0x1fe)]=this['_data']['fontSize'],this[_0x428748(0x233)][_0x428748(0x1f8)]=this[_0x428748(0x230)][_0x428748(0x1f8)],this[_0x428748(0x233)][_0x428748(0x1e8)]=this[_0x428748(0x230)]['fontItalic'],this[_0x428748(0x233)][_0x428748(0x1ef)]=ColorManager[_0x428748(0x266)](this['_data'][_0x428748(0x1ef)]),this[_0x428748(0x233)][_0x428748(0x262)]=this[_0x428748(0x230)][_0x428748(0x262)],this[_0x428748(0x233)][_0x428748(0x20a)]=this[_0x428748(0x230)][_0x428748(0x20a)],this[_0x428748(0x233)][_0x428748(0x242)](this['_data'][_0x428748(0x1ee)],0x0,0x0,this[_0x428748(0x233)]['width'],this['bitmap'][_0x428748(0x236)],_0x428748(0x216));},Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x23f)]=function(){const _0x52cb8c=_0x4a7f48;this[_0x52cb8c(0x1f2)]=this['_data'][_0x52cb8c(0x215)],this[_0x52cb8c(0x25f)]=this[_0x52cb8c(0x230)][_0x52cb8c(0x255)],this[_0x52cb8c(0x25e)]=this['_data'][_0x52cb8c(0x22f)],this['_fadeDuration']=this['_data']['fadeDuration'],this[_0x52cb8c(0x246)]=this['_data']['scaleDuration'];},Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x231)]=function(){const _0x156113=_0x4a7f48;this['x']=this['_battler']['_baseX']||this[_0x156113(0x214)]['x'],this['x']+=this['_data']['offsetX'],this['y']=this[_0x156113(0x214)][_0x156113(0x238)]||this[_0x156113(0x214)]['y'],this['y']-=this[_0x156113(0x214)]['height']*this['_battler']['scale']['y'],this['y']+=this[_0x156113(0x230)]['offsetY'];const _0xa625bf=this['_data'][_0x156113(0x22d)]||0x0,_0x31c6f7=this[_0x156113(0x230)][_0x156113(0x23b)]||0x0;this['x']+=Math[_0x156113(0x26c)](_0xa625bf*0x2)-_0xa625bf,this['y']+=Math[_0x156113(0x26c)](_0x31c6f7*0x2)-_0x31c6f7,this[_0x156113(0x21a)]['x']=0.5,this[_0x156113(0x21a)]['y']=0.5,this[_0x156113(0x25c)]['x']=this['_data'][_0x156113(0x1f6)],this['scale']['y']=this[_0x156113(0x230)][_0x156113(0x1e4)],this[_0x156113(0x269)]=this[_0x156113(0x230)][_0x156113(0x25d)],this[_0x156113(0x204)]=this['_data'][_0x156113(0x249)];},Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x261)]=function(){const _0x5b698b=_0x4a7f48;Sprite['prototype'][_0x5b698b(0x261)]['call'](this),this[_0x5b698b(0x1e1)](),this[_0x5b698b(0x1ec)](),this[_0x5b698b(0x225)]();},Sprite_WeaknessPopup['prototype'][_0x4a7f48(0x1e1)]=function(){const _0x17cadd=_0x4a7f48;this['x']+=this['_speedX'],this['y']+=this['_speedY'],this[_0x17cadd(0x1f2)]+=this[_0x17cadd(0x230)][_0x17cadd(0x234)],this[_0x17cadd(0x25f)]+=this[_0x17cadd(0x230)][_0x17cadd(0x202)];},Sprite_WeaknessPopup['prototype'][_0x4a7f48(0x1ec)]=function(){const _0x5d76c2=_0x4a7f48;if(this['_scaleDuration']>0x0){const _0xea86a9=this['_scaleDuration'];this[_0x5d76c2(0x25c)]['x']=(this[_0x5d76c2(0x25c)]['x']*(_0xea86a9-0x1)+this[_0x5d76c2(0x269)])/_0xea86a9,this[_0x5d76c2(0x25c)]['y']=(this[_0x5d76c2(0x25c)]['y']*(_0xea86a9-0x1)+this['_targetScaleY'])/_0xea86a9,this[_0x5d76c2(0x246)]--;}else this[_0x5d76c2(0x25c)]['x']=0x1,this[_0x5d76c2(0x25c)]['y']=0x1;},Sprite_WeaknessPopup[_0x4a7f48(0x265)][_0x4a7f48(0x225)]=function(){const _0x47b1e4=_0x4a7f48;if(this[_0x47b1e4(0x25e)]-->0x0)return;if(this['_fadeDuration']>0x0){const _0x2eb6ea=this[_0x47b1e4(0x219)];this[_0x47b1e4(0x223)]=(this[_0x47b1e4(0x223)]*(_0x2eb6ea-0x1)+0x0)/_0x2eb6ea,this[_0x47b1e4(0x219)]--;}else{const _0x17ec7e=this['parent'];_0x17ec7e&&(_0x17ec7e[_0x47b1e4(0x1f9)](this),this[_0x47b1e4(0x22b)]());}},VisuMZ['WeaknessPopups'][_0x4a7f48(0x1f0)]=Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x254)],Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x254)]=function(){const _0x2be61a=_0x4a7f48;VisuMZ[_0x2be61a(0x21c)][_0x2be61a(0x1f0)][_0x2be61a(0x259)](this),this[_0x2be61a(0x250)]();},Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x250)]=function(){const _0x26d35a=_0x4a7f48;if(this[_0x26d35a(0x245)])return;this[_0x26d35a(0x245)]=new Sprite(),this[_0x26d35a(0x245)]['x']=this['_battleField']['x'],this['_weaknessPopupsContainer']['y']=this['_battleField']['y'],this['addChild'](this['_weaknessPopupsContainer']);},VisuMZ[_0x4a7f48(0x21c)][_0x4a7f48(0x1fc)]=Spriteset_Battle[_0x4a7f48(0x265)]['adjustFlippedBattlefield'],Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x1e7)]=function(){const _0x20230c=_0x4a7f48;VisuMZ[_0x20230c(0x21c)][_0x20230c(0x1fc)][_0x20230c(0x259)](this);!this[_0x20230c(0x245)]&&this[_0x20230c(0x250)]();if(!this['isFlipped']())return;this['_weaknessPopupsContainer'][_0x20230c(0x25c)]['x']=-0x1,this[_0x20230c(0x245)]['x']=this[_0x20230c(0x218)]['x']+this[_0x20230c(0x218)][_0x20230c(0x241)];},VisuMZ[_0x4a7f48(0x21c)][_0x4a7f48(0x1ea)]=Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x261)],Spriteset_Battle['prototype'][_0x4a7f48(0x261)]=function(){const _0x1dbc4e=_0x4a7f48;VisuMZ[_0x1dbc4e(0x21c)][_0x1dbc4e(0x1ea)][_0x1dbc4e(0x259)](this),this[_0x1dbc4e(0x252)]();},Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x252)]=function(){const _0x11c4ce=_0x4a7f48;if(!this[_0x11c4ce(0x245)])return;if(!this[_0x11c4ce(0x1f1)])return;this[_0x11c4ce(0x245)]['x']=this[_0x11c4ce(0x1f1)]['x'],this['_weaknessPopupsContainer']['y']=this[_0x11c4ce(0x1f1)]['y'];},Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x221)]=function(_0xeca304,_0x3132d8){const _0x132f25=_0x4a7f48;if(!_0xeca304)return;if(!this['_weaknessPopupsContainer'])return;const _0x294b00=this[_0x132f25(0x22c)](_0x3132d8);if(!_0x294b00)return;if(!_0x294b00[_0x132f25(0x263)])return;this[_0x132f25(0x25b)](_0xeca304,_0x294b00);},VisuMZ[_0x4a7f48(0x21c)][_0x4a7f48(0x1fa)]=function(){const _0x193a95=_0x4a7f48;return{'enabled':!![],'filename':'','text':_0x193a95(0x257),'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':'Impact','fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0x193a95(0x226),'outlineSize':0x5,'outlineColor':_0x193a95(0x21e),'offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x22c)]=function(_0xb369e2){const _0x4c8369=_0x4a7f48,_0x7ad21d=VisuMZ[_0x4c8369(0x21c)]['Settings'];if(!_0x7ad21d)return null;return _0x7ad21d[_0xb369e2];},Spriteset_Battle[_0x4a7f48(0x265)][_0x4a7f48(0x25b)]=function(_0x1aa3b9,_0x4b48f9){const _0x36401a=_0x4a7f48;if(!_0x1aa3b9)return;if(!_0x4b48f9)return;if(!_0x4b48f9[_0x36401a(0x263)])return;if(!this[_0x36401a(0x245)])return;const _0x3ac565=this['findTargetSprite'](_0x1aa3b9);if(!_0x3ac565)return;const _0xdf189f=new Sprite_WeaknessPopup(_0x3ac565,_0x4b48f9);this[_0x36401a(0x245)][_0x36401a(0x20e)](_0xdf189f);};