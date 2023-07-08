//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.10] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x357b=['_textColorStack','isContinuePrepareShowTextCommands','anchor','clearActorNameAutoColor','adjustShowChoiceCancel','clearCommandList','setColorLock','constructor','outlineWidth','_list','mainFontFace','SWITCHES','initialize','13202varVbT','commandName','setBackground','obtainExp','TextMacros','\x1bTEXTALIGNMENT[0]','map\x20player','code','Window_Message_isTriggered','obtainEscapeString','isColorLocked','processDrawPicture','</I>','_interpreter','<LEFT>','\x1bTEXTALIGNMENT[3]','innerWidth','getTextAlignment','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','TextCodeReplace','FastForwardKey','_relativePosition','_MessageCoreSettings','MessageWindowProperties','getConfigValue','actor','indent','\x1bCOLORLOCK[1]','ParseArmorNotetags','_resetRect','Window_Base_processEscapeCharacter','_autoPositionTarget','convertEscapeCharacters','_texts','SortObjectByKeyLength','mainSprite','addLoadListener','PREVCOLOR','TextSpeed','list','choiceTextAlign','default','easeIn','setTextDelay','processAutoPosition','convertBackslashCharacters','changeValue','convertTextMacros','addContinuousShowTextCommands','textCodeCheck','processControlCharacter','maxCommands','isChoiceEnabled','STR','getChoiceListLineHeight','</WORDWRAP>','message','slice','TEXTALIGNMENT','outlineColor','value','returnPreservedFontSettings','_cancelButton','maxChoiceWidth','</LEFT>','description','instantTextSpeed','866012rdOSbG','fontFace','convertFontSettingsEscapeCharacters','Window_Options_addGeneralOptions','_data','addMessageCoreTextSpeedCommand','Window_Base_update','Window_NameBox_updatePlacement','TextCodeActions','open','type','defeat','Window_Message_terminateMessage','1uAgmHg','replace','addContinuousShowChoices','prepareShowTextCommand','updateTransform','PICTURE','FontSmallerCap','onNewPageMessageCore','windowX','Classes','none','callOkHandler','placeCancelButton','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','currencyUnit','choices','NameBoxWindowOffsetY','Rows','processMessageCoreEscapeActions','TextManager_message','bind','currentCommand','_textDelay','updateMove','NUM','TextStr','makeFontBigger','fontSize','defaultColor','AutoColorRegExp','ParseWeaponNotetags','index','helpWordWrap','refresh','onDatabaseLoaded','makeCommandList','getChoiceListMaxColumns','battle\x20enemy','MessageCore','Width','contents','clamp','<CENTER>','statusText','updateOffsetPosition','substr','getMessageWindowWidth','WordWrap','adjustShowChoiceExtension','getChoiceListTextAlign','textSizeEx','updateNameBoxMove','processStoredAutoColorChanges','processAllText','shift','Game_System_initialize','map\x20event','isHelpWindowWordWrap','itemPadding','includes','members','normalColor','ConvertTextAutoColorRegExpFriendly','Window_ChoiceList_windowX','Window_Options_isVolumeSymbol','windowWidth','ARRAYJSON','Game_Map_updateEvents','_dimmerSprite','\x1bC[%1]%2\x1bPREVCOLOR[0]','ARRAYSTRUCT','Window_Message_newPage','HIDE','faceWidth','Type','min','301jqmnuD','trim','textSizeExTextAlignment','HelpWindow','_spriteset','exit','process_VisuMZ_MessageCore_TextCodes_Replace','parameters','prototype','isArmor','setupItemChoice','numVisibleRows','processPyTextCode','LineBreakSpace','updateAutoPosition','General','_scene','213obtmKG','StretchDimmedBg','_eventId','CreateAutoColorFor','isTriggered','update','Window_Options_changeVolume','calcMoveEasing','isBusy','paintOpacity','setLastGainedItemData','processWrapBreak','convertMessageCoreEscapeReplacements','getPreservedFontSettings','follower','moveTo','processFontChangeBold','left','setChoiceListMaxColumns','test','SWITCH','setup','unshift','setMessageWindowRows','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','applyMoveEasing','isRunning','process_VisuMZ_MessageCore_AutoColor','openness','setMessageWindowWordWrap','clear','text','processActorNameAutoColorChanges','updateOverlappingY','ParseStateNotetags','getMessageWindowRows','COLORLOCK','battle\x20party','boxHeight','COMMONEVENT','setWordWrap','Items','updateDimensions','MessageWidth','getChoiceListMaxRows','ARRAYFUNC','height','changeTextColor','processFsTextCode','_autoColorActorNames','itemLineRect','makeData','preemptive','filter','Game_Map_setupEvents','getLastGainedItemData','postConvertEscapeCharacters','messageWordWrap','status','Game_Party_initialize','registerResetRect','isRTL','startY','match','textSizeExWordWrap','createContents','BOLD','52cPaJyW','outputWidth','\x1bi[%1]%2','clearFlags','AutoColor','registerCommand','Undefined','processEscapeCharacter','name','easeInOut','onProcessCharacter','clampPlacementPosition','Enemies','FontChangeValue','itemHeight','partyMemberName','setWaitMode','true','fontItalic','Center','<RIGHT>','Window_Help_refresh','setHelpWindowWordWrap','choiceLineHeight','_moveTargetX','newPage','DefaultOutlineWidth','WRAPBREAK','Scene_Boot_onDatabaseLoaded','processNewLine','setChoiceListTextAlign','ParseItemNotetags','</RIGHT>','max','textSpeed','processCustomWait','FUNC','processColorLock','addGeneralOptions','351493EKjZhc','isSceneMap','choice','Window_Message_updatePlacement','_messageWindow','drawBackCenteredPicture','ParseEnemyNotetags','exec','canMove','ParseClassNotetags','updateAutoSizePosition','drawTextEx','setupNumInput','_textDelayCount','fontBold','_autoPosRegExp','_lastGainedItemData','resetPositionX','processTextAlignmentChange','surprise','updateRelativePosition','floor','ITALIC','processAutoSize','isWeapon','format','terminateMessage','AddAutoColor','parse','initMessageCore','maxFontSizeInLine','applyData','_wordWrap','split','convertBaseEscapeCharacters','_positionType','easeOut','loadPicture','ConfigManager_makeData','</CENTER>','Window_ChoiceList_updatePlacement','convertMessageCoreEscapeActions','_messageCommonEvents','Game_Map_initialize','isChoiceVisible','_index','iconIndex','TextAlign','selectDefault','rtl','setRelativePosition','false','Window_Base_initialize','textSpeedStatusText','prepareAutoSizeEscapeCharacters','AdjustRect','outputHeight','Game_Party_gainItem','toLowerCase','right','calcWindowHeight','CENTERPICTURE','Window_Message_processEscapeCharacter','messagePositionReset','registerActorNameAutoColorChanges','messageWidth','adjustShowChoiceDefault','ConfigManager_applyData','outLineColor','<B>','TextColor','messageWindowRect','LineHeight','Window_Base_processNewLine','processPxTextCode','choiceCols','maxCols','blt','MaxCols','flushTextState','gainItem','convertShowChoiceEscapeCodes','startX','substring','<COLORLOCK>','CreateAutoColorRegExpListEntries','RelativePXPY','Default','boxWidth','convertTextAlignmentEscapeCharacters','followers','AddOption','textCodeResult','changeTextSpeed','join','scale','findTargetSprite','map','length','States','changeVolume','TightWrap','makeDeepCopy','Window_Base_changeTextColor','convertVariableEscapeCharacters','updatePlacement','<%1>','Settings','changePaintOpacity','itemRectWithPadding','CommonEvent','_centerMessageWindow','synchronizeNameBox','isMessageWindowWordWrap','toUpperCase','\x1bCOLORLOCK[0]','_moveTargetWidth','push','resetRect','addExtraShowChoices','setupChoices','[0]','Scene_Options_maxCommands','initTextAlignement','VisuMZ_0_CoreEngine','prepareWordWrapEscapeCharacters','Skills','ChoiceWindowProperties','</COLORLOCK>','commandSymbol','applyDatabaseAutoColor','\x1bBOLD[0]','_nameBoxWindow','currentExt','updateMessageCommonEvents','textColor','lastGainedObjectName','setSpeakerName','_commonEventId','quantity','maxLines','4630zQIpCa','stretchDimmerSprite','addMessageCoreCommands','add','STRUCT','center','width','addMessageCommonEvent','891836jikobZ','obtainItem','1GgJWiM','mainFontSize','_autoSizeCheck','setChoiceListLineHeight','Name','isAutoColorAffected','processCharacter','drawing','setFaceImage','messageRows','_wholeMoveDuration','preConvertEscapeCharacters','lastGainedObjectQuantity','call','processTextAlignmentX','_moveDuration','postFlushTextState','Instant','processPreviousColor','ceil','Window_NameBox_refresh','obtainEscapeParam','_moveTargetHeight','lineHeight','_moveEasingType','_moveTargetY','Match','Actors','isWordWrapEnabled','launchMessageCommonEvent','process_VisuMZ_MessageCore_TextCodes_Action','choiceRows','\x5c%1','nextEventCode','ParseAllNotetags','contentsBack','setChoiceListMaxRows','AutoColorBypassList','Window_Base_processControlCharacter','faceName','_messagePositionReset','ActionJS','FontBiggerCap','textWidth','processDrawCenteredPicture','start','refreshDimmerBitmap','ConvertParams','inBattle','Window_Message_synchronizeNameBox','indexOf','EVAL','processCommonEvent','</B>','\x1bITALIC[1]','1019nUNeYC','command101','map\x20party','372579svOHUN','processFontChangeItalic','isBreakShowTextCommands','setTextAlignment','Weapons','event','Armors','TextColor%1','ARRAYEVAL','map\x20actor','convertLockColorsEscapeCharacters','Window_Message_clearFlags','_autoSizeRegexp','addWrapBreakAfterPunctuation','prepareShowTextFollowups','Window_Base_processAllText','resetTextColor','resetWordWrap','setMessageWindowWidth','Game_Interpreter_setupChoices','drawBackPicture','onChoice','ENABLE','messageCoreWindowX','WAIT','return\x20\x27','version','setupEvents','preFlushTextState','sort','splice'];const _0x52a6=function(_0x2de365,_0x2e5f9a){_0x2de365=_0x2de365-0x6c;let _0x357b4b=_0x357b[_0x2de365];return _0x357b4b;};const _0x3abafe=_0x52a6;(function(_0x1de18b,_0x740194){const _0x33e74d=_0x52a6;while(!![]){try{const _0x5347f9=parseInt(_0x33e74d(0xae))+parseInt(_0x33e74d(0x1fb))*parseInt(_0x33e74d(0x1ee))+parseInt(_0x33e74d(0x1ab))*-parseInt(_0x33e74d(0x87))+-parseInt(_0x33e74d(0x258))*-parseInt(_0x33e74d(0x17c))+parseInt(_0x33e74d(0x145))*parseInt(_0x33e74d(0x17f))+parseInt(_0x33e74d(0x143))+parseInt(_0x33e74d(0x247))*-parseInt(_0x33e74d(0x13b));if(_0x5347f9===_0x740194)break;else _0x1de18b['push'](_0x1de18b['shift']());}catch(_0x2dfd68){_0x1de18b['push'](_0x1de18b['shift']());}}}(_0x357b,0x97151));var label=_0x3abafe(0x221),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3abafe(0x79)](function(_0x233677){const _0x343d73=_0x3abafe;return _0x233677[_0x343d73(0x7e)]&&_0x233677[_0x343d73(0x1ec)][_0x343d73(0x236)]('['+label+']');})[0x0];VisuMZ[label][_0x3abafe(0x119)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3abafe(0x174)]=function(_0x471ee1,_0x17348a){const _0x2e8c96=_0x3abafe;for(const _0x254e78 in _0x17348a){if(_0x254e78[_0x2e8c96(0x83)](/(.*):(.*)/i)){const _0x57e804=String(RegExp['$1']),_0x2cfbfc=String(RegExp['$2'])[_0x2e8c96(0x120)]()[_0x2e8c96(0x248)]();let _0x534f85,_0x4e7e92,_0x36021c;switch(_0x2cfbfc){case _0x2e8c96(0x213):_0x534f85=_0x17348a[_0x254e78]!==''?Number(_0x17348a[_0x254e78]):0x0;break;case'ARRAYNUM':_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92[_0x2e8c96(0x10f)](_0x43fd34=>Number(_0x43fd34));break;case _0x2e8c96(0x178):_0x534f85=_0x17348a[_0x254e78]!==''?eval(_0x17348a[_0x254e78]):null;break;case _0x2e8c96(0x187):_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON[_0x2e8c96(0xca)](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92['map'](_0x31f756=>eval(_0x31f756));break;case'JSON':_0x534f85=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):'';break;case _0x2e8c96(0x23d):_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON[_0x2e8c96(0xca)](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92[_0x2e8c96(0x10f)](_0x17cc12=>JSON['parse'](_0x17cc12));break;case _0x2e8c96(0xab):_0x534f85=_0x17348a[_0x254e78]!==''?new Function(JSON[_0x2e8c96(0xca)](_0x17348a[_0x254e78])):new Function('return\x200');break;case _0x2e8c96(0x71):_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92[_0x2e8c96(0x10f)](_0x525cdf=>new Function(JSON[_0x2e8c96(0xca)](_0x525cdf)));break;case _0x2e8c96(0x1e0):_0x534f85=_0x17348a[_0x254e78]!==''?String(_0x17348a[_0x254e78]):'';break;case'ARRAYSTR':_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92[_0x2e8c96(0x10f)](_0x17dd3d=>String(_0x17dd3d));break;case _0x2e8c96(0x13f):_0x36021c=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):{},_0x471ee1[_0x57e804]={},VisuMZ['ConvertParams'](_0x471ee1[_0x57e804],_0x36021c);continue;case _0x2e8c96(0x241):_0x4e7e92=_0x17348a[_0x254e78]!==''?JSON['parse'](_0x17348a[_0x254e78]):[],_0x534f85=_0x4e7e92[_0x2e8c96(0x10f)](_0x2f212f=>VisuMZ[_0x2e8c96(0x174)]({},JSON[_0x2e8c96(0xca)](_0x2f212f)));break;default:continue;}_0x471ee1[_0x57e804]=_0x534f85;}}return _0x471ee1;},(_0x1c1738=>{const _0x204714=_0x3abafe,_0x39c618=_0x1c1738[_0x204714(0x8f)];for(const _0x23608b of dependencies){if(!Imported[_0x23608b]){alert(_0x204714(0x208)[_0x204714(0xc7)](_0x39c618,_0x23608b)),SceneManager['exit']();break;}}const _0x516f0a=_0x1c1738['description'];if(_0x516f0a['match'](/\[Version[ ](.*?)\]/i)){const _0x52af4e=Number(RegExp['$1']);_0x52af4e!==VisuMZ[label][_0x204714(0x199)]&&(alert(_0x204714(0x1bd)[_0x204714(0xc7)](_0x39c618,_0x52af4e)),SceneManager['exit']());}if(_0x516f0a[_0x204714(0x83)](/\[Tier[ ](\d+)\]/i)){const _0x1f488a=Number(RegExp['$1']);_0x1f488a<tier?(alert(_0x204714(0x270)['format'](_0x39c618,_0x1f488a,tier)),SceneManager[_0x204714(0x24c)]()):tier=Math[_0x204714(0xa8)](_0x1f488a,tier);}VisuMZ[_0x204714(0x174)](VisuMZ[label][_0x204714(0x119)],_0x1c1738[_0x204714(0x24e)]);})(pluginData),PluginManager[_0x3abafe(0x8c)](pluginData[_0x3abafe(0x8f)],_0x3abafe(0x12d),_0x3c6a32=>{const _0x1726e5=_0x3abafe;VisuMZ[_0x1726e5(0x174)](_0x3c6a32,_0x3c6a32);const _0x32a2fc=_0x3c6a32[_0x1726e5(0xf6)]||$gameSystem[_0x1726e5(0x1e1)]()||0x1,_0x5579ef=_0x3c6a32['MaxRows']||$gameSystem[_0x1726e5(0x70)]()||0x1,_0x87fac8=_0x3c6a32[_0x1726e5(0xfc)]||$gameSystem[_0x1726e5(0x21f)]()||0x1,_0x487e34=_0x3c6a32[_0x1726e5(0xdd)][_0x1726e5(0xe8)]()||'default';$gameSystem[_0x1726e5(0x148)](_0x32a2fc),$gameSystem[_0x1726e5(0x169)](_0x5579ef),$gameSystem[_0x1726e5(0x26a)](_0x87fac8),$gameSystem[_0x1726e5(0xa5)](_0x487e34);}),PluginManager['registerCommand'](pluginData[_0x3abafe(0x8f)],_0x3abafe(0x1c2),_0x5009e7=>{const _0x44f14d=_0x3abafe;VisuMZ[_0x44f14d(0x174)](_0x5009e7,_0x5009e7);const _0xe06162=_0x5009e7[_0x44f14d(0x20c)]||$gameSystem[_0x44f14d(0x27b)]()||0x1,_0x121be3=_0x5009e7[_0x44f14d(0x222)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x44f14d(0x11d)]=_0x5009e7[_0x44f14d(0x9a)]||![];const _0x2b4eff=_0x5009e7[_0x44f14d(0x22a)][_0x44f14d(0xe8)]();$gameSystem[_0x44f14d(0x26f)](_0xe06162),$gameSystem[_0x44f14d(0x191)](_0x121be3);[_0x44f14d(0x98),_0x44f14d(0xe1)][_0x44f14d(0x236)](_0x2b4eff)&&$gameSystem[_0x44f14d(0x275)](eval(_0x2b4eff));const _0x42a04d=SceneManager[_0x44f14d(0x257)]['_messageWindow'];_0x42a04d&&(_0x42a04d[_0x44f14d(0x190)](),_0x42a04d[_0x44f14d(0x6e)](),_0x42a04d['createContents']());}),VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xa3)]=Scene_Boot[_0x3abafe(0x24f)][_0x3abafe(0x21d)],Scene_Boot['prototype'][_0x3abafe(0x21d)]=function(){const _0x37a2aa=_0x3abafe;VisuMZ[_0x37a2aa(0x221)][_0x37a2aa(0xa3)][_0x37a2aa(0x152)](this),this['process_VisuMZ_MessageCore_TextCodes_Action'](),this[_0x37a2aa(0x24d)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x37a2aa(0x273)]();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1cd)]=function(_0x194b7f){const _0x18c97b=_0x3abafe,_0x535047=VisuMZ[_0x18c97b(0x221)][_0x18c97b(0x119)][_0x194b7f];_0x535047[_0x18c97b(0x19c)]((_0x15bb8b,_0x5732ca)=>{const _0x3096c9=_0x18c97b;if(!_0x15bb8b||!_0x5732ca)return-0x1;return _0x5732ca[_0x3096c9(0x15f)][_0x3096c9(0x110)]-_0x15bb8b[_0x3096c9(0x15f)]['length'];});},Scene_Boot[_0x3abafe(0x24f)][_0x3abafe(0x163)]=function(){const _0x2d137e=_0x3abafe;VisuMZ[_0x2d137e(0x221)]['SortObjectByKeyLength'](_0x2d137e(0x1f6));for(const _0x6766ca of VisuMZ['MessageCore']['Settings']['TextCodeActions']){_0x6766ca[_0x2d137e(0x15f)]=_0x6766ca[_0x2d137e(0x15f)][_0x2d137e(0x120)](),_0x6766ca['textCodeCheck']=new RegExp('\x1b'+_0x6766ca[_0x2d137e(0x15f)],'gi'),_0x6766ca['textCodeResult']='\x1b'+_0x6766ca[_0x2d137e(0x15f)];if(_0x6766ca['Type']==='')_0x6766ca[_0x2d137e(0x10a)]+=_0x2d137e(0x127);}},Scene_Boot[_0x3abafe(0x24f)]['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x59c1a5=_0x3abafe;VisuMZ[_0x59c1a5(0x221)][_0x59c1a5(0x1cd)](_0x59c1a5(0x1be));for(const _0x42d52a of VisuMZ['MessageCore'][_0x59c1a5(0x119)]['TextCodeReplace']){_0x42d52a[_0x59c1a5(0x1dc)]=new RegExp('\x1b'+_0x42d52a[_0x59c1a5(0x15f)]+_0x42d52a['Type'],'gi'),_0x42d52a[_0x59c1a5(0x214)]!==''&&_0x42d52a[_0x59c1a5(0x214)]!==_0x59c1a5(0x8d)?_0x42d52a[_0x59c1a5(0x10a)]=new Function(_0x59c1a5(0x198)+_0x42d52a[_0x59c1a5(0x214)]['replace'](/\\/g,'\x1b')+'\x27'):_0x42d52a[_0x59c1a5(0x10a)]=_0x42d52a['TextJS'];}},Scene_Boot[_0x3abafe(0x24f)]['process_VisuMZ_MessageCore_TextMacros']=function(){const _0x39e03d=_0x3abafe;for(const _0x35e7af of VisuMZ['MessageCore'][_0x39e03d(0x119)]['TextMacros']){_0x35e7af[_0x39e03d(0x1dc)]=new RegExp('\x5c['+_0x35e7af[_0x39e03d(0x15f)]+'\x5c]','gi'),_0x35e7af[_0x39e03d(0x214)]!==''&&_0x35e7af[_0x39e03d(0x214)]!=='Undefined'?_0x35e7af[_0x39e03d(0x10a)]=new Function(_0x39e03d(0x198)+_0x35e7af['TextStr'][_0x39e03d(0x1fc)](/\\/g,'\x1b')+'\x27'):_0x35e7af['textCodeResult']=_0x35e7af['TextJS'];}},Scene_Boot[_0x3abafe(0x24f)][_0x3abafe(0x273)]=function(){const _0x390aff=_0x3abafe,_0x79f7fb=VisuMZ['MessageCore'][_0x390aff(0x119)]['AutoColor'];!VisuMZ[_0x390aff(0x167)]&&(VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataClasses,_0x79f7fb[_0x390aff(0x204)]),VisuMZ['MessageCore'][_0x390aff(0xc9)]($dataSkills,_0x79f7fb[_0x390aff(0x12c)]),VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataItems,_0x79f7fb[_0x390aff(0x6d)]),VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataWeapons,_0x79f7fb['Weapons']),VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataArmors,_0x79f7fb[_0x390aff(0x185)]),VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataEnemies,_0x79f7fb[_0x390aff(0x93)]),VisuMZ[_0x390aff(0x221)][_0x390aff(0xc9)]($dataStates,_0x79f7fb[_0x390aff(0x111)])),VisuMZ[_0x390aff(0x221)]['CreateAutoColorRegExpLists']();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x16a)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x3abafe(0xf3),_0x3abafe(0x17a),'<I>',_0x3abafe(0x1b7),_0x3abafe(0x1b9),_0x3abafe(0x1eb),_0x3abafe(0x225),_0x3abafe(0xd5),_0x3abafe(0x9b),_0x3abafe(0xa7),_0x3abafe(0x102),_0x3abafe(0x12e),'(((',')))','<WORDWRAP>',_0x3abafe(0x1e2),'<BR>','<LINE\x20BREAK>',_0x3abafe(0x200),_0x3abafe(0xeb),_0x3abafe(0x27f),'WAIT','SHOW',_0x3abafe(0x243),_0x3abafe(0x195),'DISABLE',_0x3abafe(0x26c),_0x3abafe(0x1a9),'ALL','ANY'],VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xc9)]=function(_0x539878,_0x4f3b80){const _0x58c526=_0x3abafe;if(_0x4f3b80<=0x0)return;const _0x129a55=_0x539878;for(const _0x13cd5f of _0x129a55){if(!_0x13cd5f)continue;VisuMZ['MessageCore'][_0x58c526(0x25b)](_0x13cd5f,_0x4f3b80);}},VisuMZ['MessageCore']['CreateAutoColorRegExpLists']=function(){const _0x5b98b6=_0x3abafe;VisuMZ[_0x5b98b6(0x221)][_0x5b98b6(0x218)]=[];for(let _0x3461d4=0x1;_0x3461d4<=0x1f;_0x3461d4++){const _0x1d2dd6=_0x5b98b6(0x186)[_0x5b98b6(0xc7)](_0x3461d4),_0x3096bf=VisuMZ[_0x5b98b6(0x221)][_0x5b98b6(0x119)][_0x5b98b6(0x8b)][_0x1d2dd6];_0x3096bf[_0x5b98b6(0x19c)]((_0x293cf7,_0xb0a7e2)=>{const _0xd64360=_0x5b98b6;if(!_0x293cf7||!_0xb0a7e2)return-0x1;return _0xb0a7e2[_0xd64360(0x110)]-_0x293cf7[_0xd64360(0x110)];}),this['CreateAutoColorRegExpListEntries'](_0x3096bf,_0x3461d4);}},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x103)]=function(_0x1aa5e4,_0xfd96a2){const _0x2d1c8c=_0x3abafe;for(const _0x113f4e of _0x1aa5e4){if(_0x113f4e[_0x2d1c8c(0x110)]<=0x0)continue;if(/^\d+$/[_0x2d1c8c(0x26b)](_0x113f4e))continue;let _0x339d14=VisuMZ[_0x2d1c8c(0x221)][_0x2d1c8c(0x239)](_0x113f4e);if(_0x113f4e[_0x2d1c8c(0x83)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x468210=new RegExp(_0x339d14,'i');else var _0x468210=new RegExp('\x5cb'+_0x339d14+'\x5cb','g');VisuMZ[_0x2d1c8c(0x221)]['AutoColorRegExp'][_0x2d1c8c(0x123)]([_0x468210,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x2d1c8c(0xc7)](_0xfd96a2,_0x113f4e)]);}},VisuMZ['MessageCore'][_0x3abafe(0x239)]=function(_0x1282a1){const _0x3afe46=_0x3abafe;return _0x1282a1=_0x1282a1[_0x3afe46(0x1fc)](/(\W)/gi,(_0x2018fc,_0x44184c)=>_0x3afe46(0x165)['format'](_0x44184c)),_0x1282a1;},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xb7)]=VisuMZ[_0x3abafe(0xb7)],VisuMZ[_0x3abafe(0xb7)]=function(_0x442579){const _0x513b27=_0x3abafe;VisuMZ[_0x513b27(0x221)][_0x513b27(0xb7)][_0x513b27(0x152)](this,_0x442579);const _0x4af1e9=VisuMZ['MessageCore'][_0x513b27(0x119)]['AutoColor'];VisuMZ[_0x513b27(0x221)][_0x513b27(0x25b)](_0x442579,_0x4af1e9['Classes']);},VisuMZ[_0x3abafe(0x221)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x200fd9){const _0xf92adb=_0x3abafe;VisuMZ['MessageCore']['ParseSkillNotetags'][_0xf92adb(0x152)](this,_0x200fd9);const _0x3bc3e8=VisuMZ[_0xf92adb(0x221)]['Settings'][_0xf92adb(0x8b)];VisuMZ[_0xf92adb(0x221)][_0xf92adb(0x25b)](_0x200fd9,_0x3bc3e8[_0xf92adb(0x12c)]);},VisuMZ['MessageCore']['ParseItemNotetags']=VisuMZ[_0x3abafe(0xa6)],VisuMZ[_0x3abafe(0xa6)]=function(_0x25af4d){const _0x2efde3=_0x3abafe;VisuMZ[_0x2efde3(0x221)]['ParseItemNotetags']['call'](this,_0x25af4d);const _0x161e10=VisuMZ['MessageCore'][_0x2efde3(0x119)][_0x2efde3(0x8b)];VisuMZ['MessageCore'][_0x2efde3(0x25b)](_0x25af4d,_0x161e10['Items']);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x219)]=VisuMZ[_0x3abafe(0x219)],VisuMZ[_0x3abafe(0x219)]=function(_0x4e8208){const _0x325f77=_0x3abafe;VisuMZ[_0x325f77(0x221)][_0x325f77(0x219)]['call'](this,_0x4e8208);const _0x56e912=VisuMZ['MessageCore'][_0x325f77(0x119)]['AutoColor'];VisuMZ[_0x325f77(0x221)][_0x325f77(0x25b)](_0x4e8208,_0x56e912[_0x325f77(0x183)]);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1c7)]=VisuMZ[_0x3abafe(0x1c7)],VisuMZ[_0x3abafe(0x1c7)]=function(_0x4f539f){const _0x399d0d=_0x3abafe;VisuMZ['MessageCore']['ParseArmorNotetags'][_0x399d0d(0x152)](this,_0x4f539f);const _0x545477=VisuMZ[_0x399d0d(0x221)]['Settings'][_0x399d0d(0x8b)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x4f539f,_0x545477[_0x399d0d(0x185)]);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xb4)]=VisuMZ[_0x3abafe(0xb4)],VisuMZ[_0x3abafe(0xb4)]=function(_0x497380){const _0x48d37a=_0x3abafe;VisuMZ[_0x48d37a(0x221)][_0x48d37a(0xb4)]['call'](this,_0x497380);const _0x26d1e5=VisuMZ[_0x48d37a(0x221)][_0x48d37a(0x119)][_0x48d37a(0x8b)];VisuMZ['MessageCore'][_0x48d37a(0x25b)](_0x497380,_0x26d1e5[_0x48d37a(0x93)]);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x27a)]=VisuMZ[_0x3abafe(0x27a)],VisuMZ['ParseStateNotetags']=function(_0x1b27a6){const _0x15e16d=_0x3abafe;VisuMZ[_0x15e16d(0x221)][_0x15e16d(0x27a)][_0x15e16d(0x152)](this,_0x1b27a6);const _0x36eeaf=VisuMZ[_0x15e16d(0x221)][_0x15e16d(0x119)][_0x15e16d(0x8b)];VisuMZ['MessageCore'][_0x15e16d(0x25b)](_0x1b27a6,_0x36eeaf[_0x15e16d(0x111)]);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x25b)]=function(_0x36efef,_0x4034ba){const _0x15c6b4=_0x3abafe;if(_0x4034ba<=0x0)return;const _0x5e1ff9=VisuMZ[_0x15c6b4(0x221)][_0x15c6b4(0x119)]['AutoColor'][_0x15c6b4(0xf4)+_0x4034ba];let _0x568d05=_0x36efef[_0x15c6b4(0x8f)][_0x15c6b4(0x248)]();if(/^\d+$/[_0x15c6b4(0x26b)](_0x568d05))return;if(VisuMZ['MessageCore']['AutoColorBypassList'][_0x15c6b4(0x236)](_0x568d05[_0x15c6b4(0x120)]()))return;_0x568d05=_0x568d05['replace'](/\\I\[(\d+)\]/gi,''),_0x568d05=_0x568d05[_0x15c6b4(0x1fc)](/\x1bI\[(\d+)\]/gi,'');if(_0x568d05[_0x15c6b4(0x110)]<=0x0)return;if(_0x568d05[_0x15c6b4(0x83)](/-----/i))return;_0x5e1ff9[_0x15c6b4(0x123)](_0x568d05);},SceneManager['isSceneBattle']=function(){const _0x25d882=_0x3abafe;return this[_0x25d882(0x257)]&&this['_scene'][_0x25d882(0x1a5)]===Scene_Battle;},SceneManager[_0x3abafe(0xaf)]=function(){const _0x26f4e8=_0x3abafe;return this[_0x26f4e8(0x257)]&&this['_scene'][_0x26f4e8(0x1a5)]===Scene_Map;},VisuMZ[_0x3abafe(0x221)]['TextManager_message']=TextManager['message'],TextManager[_0x3abafe(0x1e3)]=function(_0x368bd1){const _0x5299bc=_0x3abafe,_0xbd87c5=['levelUp','emerge',_0x5299bc(0x78),_0x5299bc(0xc1),'victory',_0x5299bc(0x1f9),'escapeStart',_0x5299bc(0x1ae),'obtainGold',_0x5299bc(0x144)];let _0x27208a=VisuMZ[_0x5299bc(0x221)][_0x5299bc(0x20e)][_0x5299bc(0x152)](this,_0x368bd1);return _0xbd87c5[_0x5299bc(0x236)](_0x368bd1)&&(_0x27208a='</WORDWRAP>'+_0x27208a),_0x27208a;},ConfigManager[_0x3abafe(0xa9)]=VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x119)][_0x3abafe(0x1d1)][_0x3abafe(0x105)],VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xd4)]=ConfigManager[_0x3abafe(0x77)],ConfigManager[_0x3abafe(0x77)]=function(){const _0x405a71=_0x3abafe,_0x440bcf=VisuMZ[_0x405a71(0x221)][_0x405a71(0xd4)][_0x405a71(0x152)](this);return _0x440bcf[_0x405a71(0xa9)]=this['textSpeed'],_0x440bcf;},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xf1)]=ConfigManager[_0x3abafe(0xcd)],ConfigManager[_0x3abafe(0xcd)]=function(_0x29a17a){const _0x25e03f=_0x3abafe;VisuMZ[_0x25e03f(0x221)][_0x25e03f(0xf1)][_0x25e03f(0x152)](this,_0x29a17a),_0x25e03f(0xa9)in _0x29a17a?this[_0x25e03f(0xa9)]=Number(_0x29a17a['textSpeed'])[_0x25e03f(0x224)](0x1,0xb):this[_0x25e03f(0xa9)]=VisuMZ[_0x25e03f(0x221)][_0x25e03f(0x119)]['TextSpeed'][_0x25e03f(0x105)];},TextManager['messageCoreTextSpeed']=VisuMZ['MessageCore']['Settings'][_0x3abafe(0x1d1)][_0x3abafe(0x149)],TextManager['instantTextSpeed']=VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x119)][_0x3abafe(0x1d1)][_0x3abafe(0x156)],VisuMZ[_0x3abafe(0x221)]['Game_System_initialize']=Game_System[_0x3abafe(0x24f)][_0x3abafe(0x1aa)],Game_System[_0x3abafe(0x24f)][_0x3abafe(0x1aa)]=function(){const _0x14ca35=_0x3abafe;VisuMZ[_0x14ca35(0x221)][_0x14ca35(0x232)]['call'](this),this[_0x14ca35(0xcb)]();},Game_System[_0x3abafe(0x24f)][_0x3abafe(0xcb)]=function(){const _0x2f9821=_0x3abafe,_0x40fea9=VisuMZ[_0x2f9821(0x221)][_0x2f9821(0x119)][_0x2f9821(0x256)],_0x461329=VisuMZ[_0x2f9821(0x221)][_0x2f9821(0x119)][_0x2f9821(0x22a)];this['_MessageCoreSettings']={'messageRows':_0x40fea9['MessageRows'],'messageWidth':_0x40fea9[_0x2f9821(0x6f)],'messageWordWrap':_0x461329['MessageWindow'],'helpWordWrap':_0x461329[_0x2f9821(0x24a)],'choiceLineHeight':_0x40fea9['ChoiceWindowLineHeight'],'choiceRows':_0x40fea9['ChoiceWindowMaxRows'],'choiceCols':_0x40fea9['ChoiceWindowMaxCols'],'choiceTextAlign':_0x40fea9['ChoiceWindowTextAlign']};},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x27b)]=function(){const _0xd6821=_0x3abafe;if(this['_MessageCoreSettings']===undefined)this[_0xd6821(0xcb)]();if(this['_MessageCoreSettings']['messageRows']===undefined)this['initMessageCore']();return this[_0xd6821(0x1c1)]['messageRows'];},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x26f)]=function(_0x24803a){const _0x69ce83=_0x3abafe;if(this[_0x69ce83(0x1c1)]===undefined)this[_0x69ce83(0xcb)]();if(this[_0x69ce83(0x1c1)][_0x69ce83(0x14e)]===undefined)this['initMessageCore']();this[_0x69ce83(0x1c1)][_0x69ce83(0x14e)]=_0x24803a||0x1;},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x229)]=function(){const _0x20d394=_0x3abafe;if(this['_MessageCoreSettings']===undefined)this[_0x20d394(0xcb)]();if(this[_0x20d394(0x1c1)][_0x20d394(0xef)]===undefined)this[_0x20d394(0xcb)]();return this[_0x20d394(0x1c1)][_0x20d394(0xef)];},Game_System['prototype'][_0x3abafe(0x191)]=function(_0x424c95){const _0x3af73f=_0x3abafe;if(this[_0x3af73f(0x1c1)]===undefined)this[_0x3af73f(0xcb)]();if(this[_0x3af73f(0x1c1)][_0x3af73f(0xef)]===undefined)this[_0x3af73f(0xcb)]();this[_0x3af73f(0x1c1)][_0x3af73f(0xef)]=_0x424c95||0x1;},Game_System[_0x3abafe(0x24f)]['isMessageWindowWordWrap']=function(){const _0x22ec1a=_0x3abafe;if(this[_0x22ec1a(0x1c1)]===undefined)this[_0x22ec1a(0xcb)]();if(this[_0x22ec1a(0x1c1)]['messageWordWrap']===undefined)this['initMessageCore']();return this[_0x22ec1a(0x1c1)]['messageWordWrap'];},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x275)]=function(_0x213513){const _0x553c9b=_0x3abafe;if(this[_0x553c9b(0x1c1)]===undefined)this[_0x553c9b(0xcb)]();if(this[_0x553c9b(0x1c1)]['messageWordWrap']===undefined)this['initMessageCore']();this[_0x553c9b(0x1c1)][_0x553c9b(0x7d)]=_0x213513;},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x234)]=function(){const _0x5cfaf5=_0x3abafe;if(this[_0x5cfaf5(0x1c1)]===undefined)this[_0x5cfaf5(0xcb)]();if(this[_0x5cfaf5(0x1c1)][_0x5cfaf5(0x21b)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x5cfaf5(0x21b)];},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x9d)]=function(_0x18e712){const _0x37eeb3=_0x3abafe;if(this[_0x37eeb3(0x1c1)]===undefined)this['initMessageCore']();if(this[_0x37eeb3(0x1c1)]['helpWordWrap']===undefined)this[_0x37eeb3(0xcb)]();this['_MessageCoreSettings'][_0x37eeb3(0x21b)]=_0x18e712;},Game_System['prototype'][_0x3abafe(0x1e1)]=function(){const _0x4035c7=_0x3abafe;if(this[_0x4035c7(0x1c1)]===undefined)this[_0x4035c7(0xcb)]();if(this[_0x4035c7(0x1c1)][_0x4035c7(0x9e)]===undefined)this[_0x4035c7(0xcb)]();return this[_0x4035c7(0x1c1)][_0x4035c7(0x9e)];},Game_System['prototype'][_0x3abafe(0x148)]=function(_0x3e0b39){const _0x1b4bd1=_0x3abafe;if(this[_0x1b4bd1(0x1c1)]===undefined)this[_0x1b4bd1(0xcb)]();if(this[_0x1b4bd1(0x1c1)][_0x1b4bd1(0x9e)]===undefined)this['initMessageCore']();this[_0x1b4bd1(0x1c1)][_0x1b4bd1(0x9e)]=_0x3e0b39||0x1;},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x70)]=function(){const _0x501eb4=_0x3abafe;if(this[_0x501eb4(0x1c1)]===undefined)this[_0x501eb4(0xcb)]();if(this['_MessageCoreSettings'][_0x501eb4(0x164)]===undefined)this[_0x501eb4(0xcb)]();return this[_0x501eb4(0x1c1)][_0x501eb4(0x164)];},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x169)]=function(_0x11cbaf){const _0x10e7d4=_0x3abafe;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x10e7d4(0x1c1)]['choiceRows']===undefined)this['initMessageCore']();this[_0x10e7d4(0x1c1)]['choiceRows']=_0x11cbaf||0x1;},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x21f)]=function(){const _0x2d3723=_0x3abafe;if(this[_0x2d3723(0x1c1)]===undefined)this['initMessageCore']();if(this[_0x2d3723(0x1c1)][_0x2d3723(0xf9)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x2d3723(0xf9)];},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x26a)]=function(_0x4d42db){const _0x3d227a=_0x3abafe;if(this[_0x3d227a(0x1c1)]===undefined)this[_0x3d227a(0xcb)]();if(this[_0x3d227a(0x1c1)]['choiceCols']===undefined)this['initMessageCore']();this[_0x3d227a(0x1c1)][_0x3d227a(0xf9)]=_0x4d42db||0x1;},Game_System[_0x3abafe(0x24f)][_0x3abafe(0x22c)]=function(){const _0x2e9e70=_0x3abafe;if(this[_0x2e9e70(0x1c1)]===undefined)this[_0x2e9e70(0xcb)]();if(this[_0x2e9e70(0x1c1)][_0x2e9e70(0x1d3)]===undefined)this['initMessageCore']();return this[_0x2e9e70(0x1c1)][_0x2e9e70(0x1d3)];},Game_System['prototype'][_0x3abafe(0xa5)]=function(_0x439835){const _0x58d555=_0x3abafe;if(this[_0x58d555(0x1c1)]===undefined)this[_0x58d555(0xcb)]();if(this[_0x58d555(0x1c1)]['choiceTextAlign']===undefined)this[_0x58d555(0xcb)]();this['_MessageCoreSettings']['choiceTextAlign']=_0x439835[_0x58d555(0xe8)]();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x7f)]=Game_Party['prototype'][_0x3abafe(0x1aa)],Game_Party['prototype'][_0x3abafe(0x1aa)]=function(){const _0x1c21c7=_0x3abafe;VisuMZ['MessageCore'][_0x1c21c7(0x7f)][_0x1c21c7(0x152)](this),this[_0x1c21c7(0xcb)]();},Game_Party['prototype']['initMessageCore']=function(){const _0x307899=_0x3abafe;this[_0x307899(0xbe)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x3abafe(0x24f)][_0x3abafe(0x7b)]=function(){const _0x4e3767=_0x3abafe;if(this[_0x4e3767(0xbe)]===undefined)this[_0x4e3767(0xcb)]();return this['_lastGainedItemData'];},Game_Party['prototype'][_0x3abafe(0x262)]=function(_0x46c81c,_0x54c79b){const _0x1ccdb7=_0x3abafe;if(this[_0x1ccdb7(0xbe)]===undefined)this[_0x1ccdb7(0xcb)]();if(!_0x46c81c)return;if(DataManager['isItem'](_0x46c81c))this[_0x1ccdb7(0xbe)][_0x1ccdb7(0x1f8)]=0x0;else{if(DataManager[_0x1ccdb7(0xc6)](_0x46c81c))this['_lastGainedItemData'][_0x1ccdb7(0x1f8)]=0x1;else DataManager[_0x1ccdb7(0x250)](_0x46c81c)&&(this['_lastGainedItemData'][_0x1ccdb7(0x1f8)]=0x2);}this[_0x1ccdb7(0xbe)]['id']=_0x46c81c['id'],this[_0x1ccdb7(0xbe)][_0x1ccdb7(0x139)]=_0x54c79b;},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xe7)]=Game_Party['prototype'][_0x3abafe(0xfe)],Game_Party[_0x3abafe(0x24f)]['gainItem']=function(_0x1c7c7b,_0x174f9e,_0x1bf820){const _0x5ec1cb=_0x3abafe;VisuMZ[_0x5ec1cb(0x221)][_0x5ec1cb(0xe7)][_0x5ec1cb(0x152)](this,_0x1c7c7b,_0x174f9e,_0x1bf820),_0x174f9e>0x0&&this[_0x5ec1cb(0x262)](_0x1c7c7b,_0x174f9e);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xd9)]=Game_Map['prototype'][_0x3abafe(0x1aa)],Game_Map[_0x3abafe(0x24f)][_0x3abafe(0x1aa)]=function(){const _0x4f4975=_0x3abafe;VisuMZ[_0x4f4975(0x221)][_0x4f4975(0xd9)][_0x4f4975(0x152)](this),this[_0x4f4975(0xd8)]=[];},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x7a)]=Game_Map[_0x3abafe(0x24f)][_0x3abafe(0x19a)],Game_Map[_0x3abafe(0x24f)][_0x3abafe(0x19a)]=function(){const _0x31a19d=_0x3abafe;VisuMZ['MessageCore']['Game_Map_setupEvents'][_0x31a19d(0x152)](this),this['_messageCommonEvents']=[];},VisuMZ['MessageCore'][_0x3abafe(0x23e)]=Game_Map[_0x3abafe(0x24f)]['updateEvents'],Game_Map['prototype']['updateEvents']=function(){const _0x39c49e=_0x3abafe;VisuMZ[_0x39c49e(0x221)]['Game_Map_updateEvents'][_0x39c49e(0x152)](this),this[_0x39c49e(0x134)]();},Game_Map[_0x3abafe(0x24f)][_0x3abafe(0x142)]=function(_0x4385ec){const _0x457b29=_0x3abafe;this[_0x457b29(0xd8)]=this[_0x457b29(0xd8)]||[];const _0x5f4a24=this[_0x457b29(0x1b8)]['_eventId'],_0x11c1a8=new Game_MessageCommonEvent(_0x4385ec,_0x5f4a24);this[_0x457b29(0xd8)]['push'](_0x11c1a8);},Game_Map[_0x3abafe(0x24f)]['updateMessageCommonEvents']=function(){const _0x4facbc=_0x3abafe;this[_0x4facbc(0xd8)]=this[_0x4facbc(0xd8)]||[];for(const _0x233780 of this['_messageCommonEvents']){!_0x233780[_0x4facbc(0x1b8)]?this[_0x4facbc(0xd8)]['remove'](_0x233780):_0x233780['update']();}},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x17d)]=function(_0x3a4ac7){const _0x5bff3e=_0x3abafe;if($gameMessage[_0x5bff3e(0x260)]())return![];return this[_0x5bff3e(0x1fe)](_0x3a4ac7),this[_0x5bff3e(0x1db)](_0x3a4ac7),this[_0x5bff3e(0x18d)](_0x3a4ac7),this[_0x5bff3e(0x97)](_0x5bff3e(0x1e3)),!![];},Game_Interpreter[_0x3abafe(0x24f)]['prepareShowTextCommand']=function(_0x199081){const _0x45a8db=_0x3abafe;$gameMessage[_0x45a8db(0x14d)](_0x199081[0x0],_0x199081[0x1]),$gameMessage[_0x45a8db(0x1ad)](_0x199081[0x2]),$gameMessage['setPositionType'](_0x199081[0x3]),$gameMessage[_0x45a8db(0x137)](_0x199081[0x4]);},Game_Interpreter[_0x3abafe(0x24f)]['addContinuousShowTextCommands']=function(_0x3d743d){const _0x333949=_0x3abafe;while(this[_0x333949(0x19f)]()){this['_index']++;this['currentCommand']()[_0x333949(0x1b2)]===0x191&&$gameMessage[_0x333949(0x13e)](this['currentCommand']()[_0x333949(0x24e)][0x0]);if(this[_0x333949(0x181)]())break;}},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x19f)]=function(){const _0x488262=_0x3abafe;return this['nextEventCode']()===0x65&&$gameSystem[_0x488262(0x27b)]()>0x4?!![]:this['nextEventCode']()===0x191;},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x181)]=function(){const _0x33cfc4=_0x3abafe;return $gameMessage[_0x33cfc4(0x1cc)]['length']>=$gameSystem[_0x33cfc4(0x27b)]()&&this[_0x33cfc4(0x166)]()!==0x191;},Game_Interpreter['prototype'][_0x3abafe(0x18d)]=function(_0x550fc1){const _0x2cda8e=_0x3abafe;switch(this[_0x2cda8e(0x166)]()){case 0x66:this[_0x2cda8e(0xdb)]++,this[_0x2cda8e(0x126)](this[_0x2cda8e(0x210)]()[_0x2cda8e(0x24e)]);break;case 0x67:this[_0x2cda8e(0xdb)]++,this[_0x2cda8e(0xba)](this[_0x2cda8e(0x210)]()['parameters']);break;case 0x68:this[_0x2cda8e(0xdb)]++,this[_0x2cda8e(0x251)](this[_0x2cda8e(0x210)]()[_0x2cda8e(0x24e)]);break;}},VisuMZ['MessageCore'][_0x3abafe(0x192)]=Game_Interpreter['prototype']['setupChoices'],Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x126)]=function(_0x162c01){const _0x26ceb7=_0x3abafe;_0x162c01=this[_0x26ceb7(0x1fd)](),VisuMZ[_0x26ceb7(0x221)][_0x26ceb7(0x192)]['call'](this,_0x162c01);},Game_Interpreter['prototype'][_0x3abafe(0x1fd)]=function(){const _0x4776d5=_0x3abafe,_0x1f6882=this[_0x4776d5(0xdb)],_0x26f55b=[];let _0x2a3489=0x0;this['_index']++;while(this[_0x4776d5(0xdb)]<this[_0x4776d5(0x1a7)][_0x4776d5(0x110)]){if(this['currentCommand']()[_0x4776d5(0x1c5)]===this['_indent']){if(this[_0x4776d5(0x210)]()[_0x4776d5(0x1b2)]===0x194&&this[_0x4776d5(0x166)]()!==0x66)break;else{if(this[_0x4776d5(0x210)]()[_0x4776d5(0x1b2)]===0x66)this['adjustShowChoiceExtension'](_0x2a3489,this[_0x4776d5(0x210)](),_0x1f6882),this[_0x4776d5(0xdb)]-=0x2;else this[_0x4776d5(0x210)]()[_0x4776d5(0x1b2)]===0x192&&(this[_0x4776d5(0x210)]()[_0x4776d5(0x24e)][0x0]=_0x2a3489,_0x2a3489++);}}this[_0x4776d5(0xdb)]++;}return this[_0x4776d5(0xdb)]=_0x1f6882,this[_0x4776d5(0x210)]()[_0x4776d5(0x24e)];},Game_Interpreter['prototype'][_0x3abafe(0x22b)]=function(_0xc3a5a2,_0x684e81,_0x167dab){const _0x34af5=_0x3abafe;this[_0x34af5(0xf0)](_0xc3a5a2,_0x684e81,_0x167dab),this[_0x34af5(0x1a2)](_0xc3a5a2,_0x684e81,_0x167dab),this[_0x34af5(0x125)](_0x684e81,_0x167dab);},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0xf0)]=function(_0x108a2f,_0x442cea,_0x1eb2b0){const _0x28aa50=_0x3abafe;if(_0x442cea['parameters'][0x2]<0x0)return;const _0x4c622a=_0x442cea[_0x28aa50(0x24e)][0x2]+_0x108a2f;this[_0x28aa50(0x1a7)][_0x1eb2b0]['parameters'][0x2]=_0x4c622a;},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x1a2)]=function(_0x481b00,_0x53ec02,_0x404a8a){const _0x4e80ce=_0x3abafe;if(_0x53ec02[_0x4e80ce(0x24e)][0x1]>=0x0){var _0x576ec6=_0x53ec02[_0x4e80ce(0x24e)][0x1]+_0x481b00;this[_0x4e80ce(0x1a7)][_0x404a8a][_0x4e80ce(0x24e)][0x1]=_0x576ec6;}else _0x53ec02['parameters'][0x1]===-0x2&&(this[_0x4e80ce(0x1a7)][_0x404a8a][_0x4e80ce(0x24e)][0x1]=_0x53ec02['parameters'][0x1]);},Game_Interpreter[_0x3abafe(0x24f)][_0x3abafe(0x125)]=function(_0x246559,_0x489233){const _0x3223f4=_0x3abafe;for(const _0x42501b of _0x246559[_0x3223f4(0x24e)][0x0]){this[_0x3223f4(0x1a7)][_0x489233]['parameters'][0x0][_0x3223f4(0x123)](_0x42501b);}this[_0x3223f4(0x1a7)][_0x3223f4(0x19d)](this['_index']-0x1,0x2);};function Game_MessageCommonEvent(){const _0x80d9c=_0x3abafe;this[_0x80d9c(0x1aa)](...arguments);}Game_MessageCommonEvent[_0x3abafe(0x24f)][_0x3abafe(0x1aa)]=function(_0x396c53,_0x43394c){const _0x5348bc=_0x3abafe;this[_0x5348bc(0x138)]=_0x396c53,this[_0x5348bc(0x25a)]=_0x43394c||0x0,this[_0x5348bc(0x21c)]();},Game_MessageCommonEvent[_0x3abafe(0x24f)][_0x3abafe(0x184)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent[_0x3abafe(0x24f)][_0x3abafe(0x1d2)]=function(){const _0x3b8772=_0x3abafe;return this[_0x3b8772(0x184)]()[_0x3b8772(0x1d2)];},Game_MessageCommonEvent[_0x3abafe(0x24f)][_0x3abafe(0x21c)]=function(){const _0x4ae234=_0x3abafe;this[_0x4ae234(0x1b8)]=new Game_Interpreter(),this[_0x4ae234(0x1b8)][_0x4ae234(0x26d)](this[_0x4ae234(0x1d2)](),this[_0x4ae234(0x25a)]);},Game_MessageCommonEvent[_0x3abafe(0x24f)][_0x3abafe(0x25d)]=function(){const _0x3a4461=_0x3abafe;this['_interpreter']&&(this[_0x3a4461(0x1b8)][_0x3a4461(0x272)]()?this['_interpreter'][_0x3a4461(0x25d)]():this['clear']());},Game_MessageCommonEvent['prototype']['clear']=function(){const _0x30f93b=_0x3abafe;this[_0x30f93b(0x1b8)]=null;},Scene_Message[_0x3abafe(0x24f)][_0x3abafe(0xf5)]=function(){const _0x411d91=_0x3abafe,_0xd357ae=Math['min'](Graphics['width'],$gameSystem[_0x411d91(0x229)]()),_0x6aadf3=$gameSystem[_0x411d91(0x27b)](),_0x56af9e=this[_0x411d91(0xea)](_0x6aadf3,![]),_0x279a91=(Graphics['boxWidth']-_0xd357ae)/0x2,_0x4a2ed9=0x0;return new Rectangle(_0x279a91,_0x4a2ed9,_0xd357ae,_0x56af9e);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x128)]=Scene_Options['prototype'][_0x3abafe(0x1de)],Scene_Options[_0x3abafe(0x24f)][_0x3abafe(0x1de)]=function(){const _0x4f37c3=_0x3abafe;let _0x53c035=VisuMZ[_0x4f37c3(0x221)][_0x4f37c3(0x128)]['call'](this);const _0x401d35=VisuMZ['MessageCore'][_0x4f37c3(0x119)];if(_0x401d35[_0x4f37c3(0x1d1)][_0x4f37c3(0x109)]&&_0x401d35['TextSpeed'][_0x4f37c3(0xe5)])_0x53c035++;return _0x53c035;},VisuMZ['MessageCore'][_0x3abafe(0xe2)]=Window_Base['prototype'][_0x3abafe(0x1aa)],Window_Base['prototype'][_0x3abafe(0x1aa)]=function(_0x41122f){const _0x458ef4=_0x3abafe;this[_0x458ef4(0xcb)](_0x41122f),VisuMZ[_0x458ef4(0x221)][_0x458ef4(0xe2)][_0x458ef4(0x152)](this,_0x41122f);},Window_Base[_0x3abafe(0x24f)]['initMessageCore']=function(_0x1afe19){const _0x3040e2=_0x3abafe;this[_0x3040e2(0x129)](),this[_0x3040e2(0x190)](),this[_0x3040e2(0x80)](_0x1afe19);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x129)]=function(){const _0x4468a9=_0x3abafe;this[_0x4468a9(0x182)](_0x4468a9(0x1d4));},Window_Base[_0x3abafe(0x24f)]['setTextAlignment']=function(_0x31598e){this['_textAlignment']=_0x31598e;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1bc)]=function(){return this['_textAlignment'];},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x18e)]=Window_Base[_0x3abafe(0x24f)]['processAllText'],Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x230)]=function(_0x540452){const _0x38e7fe=_0x3abafe;VisuMZ['MessageCore'][_0x38e7fe(0x18e)][_0x38e7fe(0x152)](this,_0x540452);if(_0x540452[_0x38e7fe(0x14c)])this['setTextAlignment'](_0x38e7fe(0x1d4));},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x190)]=function(){const _0x330364=_0x3abafe;this[_0x330364(0x6c)](![]);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x161)]=function(){const _0x4cffb5=_0x3abafe;return this[_0x4cffb5(0xce)];},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x6c)]=function(_0x205069){return this['_wordWrap']=_0x205069,'';},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x80)]=function(_0x19611b){const _0x353d6d=_0x3abafe;this[_0x353d6d(0x1c8)]=JsonEx[_0x353d6d(0x114)](_0x19611b);},Window_Base[_0x3abafe(0x24f)]['resetFontSettings']=function(){const _0x4125c0=_0x3abafe;this[_0x4125c0(0x223)][_0x4125c0(0x1ef)]=$gameSystem[_0x4125c0(0x1a8)](),this[_0x4125c0(0x223)][_0x4125c0(0x216)]=$gameSystem[_0x4125c0(0x146)](),this[_0x4125c0(0x223)]['fontBold']=![],this[_0x4125c0(0x223)]['fontItalic']=![],this[_0x4125c0(0x18f)]();},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x18f)]=function(){const _0xa36e41=_0x3abafe;this[_0xa36e41(0x73)](ColorManager[_0xa36e41(0x238)]()),this['changeOutlineColor'](ColorManager[_0xa36e41(0x1e6)]());const _0x26f90a=VisuMZ[_0xa36e41(0x221)]['Settings'][_0xa36e41(0x256)];_0x26f90a['DefaultOutlineWidth']===undefined&&(_0x26f90a[_0xa36e41(0xa1)]=0x3),this[_0xa36e41(0x223)][_0xa36e41(0x1a6)]=_0x26f90a['DefaultOutlineWidth'],this[_0xa36e41(0x1a4)](![]);},Window_Base['prototype'][_0x3abafe(0x1a4)]=function(_0x131dec){this['_colorLock']=_0x131dec;},Window_Base['prototype'][_0x3abafe(0x1b5)]=function(){return this['_colorLock'];},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x14a)]=function(){return![];},Window_Base[_0x3abafe(0x24f)]['getPreservedFontSettings']=function(){const _0x12209d=_0x3abafe,_0x462bb5=[_0x12209d(0x1ef),_0x12209d(0x216),'fontBold','fontItalic',_0x12209d(0x135),_0x12209d(0xf2),'outlineWidth',_0x12209d(0x261)];let _0x29ea2f={};for(const _0x510f63 of _0x462bb5){_0x29ea2f[_0x510f63]=this[_0x12209d(0x223)][_0x510f63];}return _0x29ea2f;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1e8)]=function(_0x335547){const _0x2ceecd=_0x3abafe;for(const _0x12bd30 in _0x335547){this[_0x2ceecd(0x223)][_0x12bd30]=_0x335547[_0x12bd30];}},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1f4)]=Window_Base[_0x3abafe(0x24f)]['update'],Window_Base[_0x3abafe(0x24f)]['update']=function(){const _0x1ad917=_0x3abafe;VisuMZ[_0x1ad917(0x221)][_0x1ad917(0x1f4)]['call'](this),this[_0x1ad917(0x212)]();},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xb6)]=function(){return![];},Window_Base[_0x3abafe(0x24f)]['updateMove']=function(){const _0x105ccf=_0x3abafe;this[_0x105ccf(0x154)]>0x0&&(this[_0x105ccf(0xb6)]()&&(this['x']=this[_0x105ccf(0x271)](this['x'],this[_0x105ccf(0x9f)]),this['y']=this[_0x105ccf(0x271)](this['y'],this['_moveTargetY']),this[_0x105ccf(0x141)]=this[_0x105ccf(0x271)](this[_0x105ccf(0x141)],this[_0x105ccf(0x122)]),this[_0x105ccf(0x72)]=this[_0x105ccf(0x271)](this[_0x105ccf(0x72)],this['_moveTargetHeight']),this[_0x105ccf(0x92)]()),this[_0x105ccf(0x154)]--);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x92)]=function(_0xdaeb33,_0x153613){const _0x5f2cf4=_0x3abafe;!_0xdaeb33&&(this[_0x5f2cf4(0x141)]=Math[_0x5f2cf4(0x246)](this['width'],Graphics[_0x5f2cf4(0x141)]),this[_0x5f2cf4(0x72)]=Math['min'](this[_0x5f2cf4(0x72)],Graphics['height']));if(!_0x153613){const _0xf2637e=-(Math[_0x5f2cf4(0xc3)](Graphics[_0x5f2cf4(0x141)]-Graphics[_0x5f2cf4(0x106)])/0x2),_0x47fded=_0xf2637e+Graphics['width']-this[_0x5f2cf4(0x141)],_0x50c692=-(Math[_0x5f2cf4(0xc3)](Graphics[_0x5f2cf4(0x72)]-Graphics[_0x5f2cf4(0x27e)])/0x2),_0x10185a=_0x50c692+Graphics[_0x5f2cf4(0x72)]-this[_0x5f2cf4(0x72)];this['x']=this['x'][_0x5f2cf4(0x224)](_0xf2637e,_0x47fded),this['y']=this['y'][_0x5f2cf4(0x224)](_0x50c692,_0x10185a);}},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x271)]=function(_0x5ce5d9,_0x178509){const _0xe22ebb=_0x3abafe,_0x33a2ac=this[_0xe22ebb(0x154)],_0xd69abb=this[_0xe22ebb(0x14f)],_0x16e218=this[_0xe22ebb(0x25f)]((_0xd69abb-_0x33a2ac)/_0xd69abb),_0x1bc06b=this[_0xe22ebb(0x25f)]((_0xd69abb-_0x33a2ac+0x1)/_0xd69abb),_0x5db26b=(_0x5ce5d9-_0x178509*_0x16e218)/(0x1-_0x16e218);return _0x5db26b+(_0x178509-_0x5db26b)*_0x1bc06b;},Window_Base['prototype'][_0x3abafe(0x25f)]=function(_0x3698c7){const _0x43ded2=_0x3abafe,_0x1d33c6=0x2;switch(this[_0x43ded2(0x15d)]){case 0x0:return _0x3698c7;case 0x1:return this[_0x43ded2(0x1d5)](_0x3698c7,_0x1d33c6);case 0x2:return this[_0x43ded2(0xd2)](_0x3698c7,_0x1d33c6);case 0x3:return this[_0x43ded2(0x90)](_0x3698c7,_0x1d33c6);default:return Imported[_0x43ded2(0x12a)]?VisuMZ['applyMoveEasing'](_0x3698c7,this[_0x43ded2(0x15d)]):_0x3698c7;}},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x267)]=function(_0x1e073c,_0x596b9e,_0x1a8a71,_0x379f80,_0x593e09,_0x3fa42a){const _0x377f2c=_0x3abafe;this[_0x377f2c(0x9f)]=_0x1e073c,this[_0x377f2c(0x15e)]=_0x596b9e,this[_0x377f2c(0x122)]=_0x1a8a71||this[_0x377f2c(0x141)],this[_0x377f2c(0x15b)]=_0x379f80||this[_0x377f2c(0x72)],this['_moveDuration']=_0x593e09||0x1;if(this[_0x377f2c(0x154)]<=0x0)this[_0x377f2c(0x154)]=0x1;this[_0x377f2c(0x14f)]=this['_moveDuration'],this[_0x377f2c(0x15d)]=_0x3fa42a||0x0;},Window_Base[_0x3abafe(0x24f)]['moveBy']=function(_0x3191f0,_0x3ae179,_0x14a0f6,_0x590587,_0x406326,_0xb8e4f8){const _0x199e6b=_0x3abafe;this['_moveTargetX']=this['x']+_0x3191f0,this[_0x199e6b(0x15e)]=this['y']+_0x3ae179,this[_0x199e6b(0x122)]=this[_0x199e6b(0x141)]+(_0x14a0f6||0x0),this[_0x199e6b(0x15b)]=this[_0x199e6b(0x72)]+(_0x590587||0x0),this[_0x199e6b(0x154)]=_0x406326||0x1;if(this['_moveDuration']<=0x0)this[_0x199e6b(0x154)]=0x1;this[_0x199e6b(0x14f)]=this[_0x199e6b(0x154)],this[_0x199e6b(0x15d)]=_0xb8e4f8||0x0;},Window_Base['prototype']['resetRect']=function(_0x1bc251,_0x16d7da){const _0x5e7faa=_0x3abafe;this[_0x5e7faa(0x267)](this[_0x5e7faa(0x1c8)]['x'],this[_0x5e7faa(0x1c8)]['y'],this[_0x5e7faa(0x1c8)][_0x5e7faa(0x141)],this['_resetRect'][_0x5e7faa(0x72)],_0x1bc251,_0x16d7da);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x115)]=Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x73)],Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x73)]=function(_0x18447a){const _0x197f7c=_0x3abafe;if(this[_0x197f7c(0x1b5)]())return;_0x18447a=_0x18447a[_0x197f7c(0x1fc)](/\,/g,''),this[_0x197f7c(0x19e)]=this[_0x197f7c(0x19e)]||[],this[_0x197f7c(0x19e)][_0x197f7c(0x26e)](this['contents'][_0x197f7c(0x135)]),VisuMZ[_0x197f7c(0x221)][_0x197f7c(0x115)][_0x197f7c(0x152)](this,_0x18447a);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x157)]=function(_0x2275d5){const _0x133511=_0x3abafe;this[_0x133511(0x15a)](_0x2275d5);if(this[_0x133511(0x1b5)]())return;_0x2275d5[_0x133511(0x14c)]&&(this[_0x133511(0x19e)]=this[_0x133511(0x19e)]||[],this['contents'][_0x133511(0x135)]=this['_textColorStack'][_0x133511(0x231)]()||ColorManager[_0x133511(0x238)]());},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1cb)]=function(_0x3b3364){const _0x49dcf6=_0x3abafe;return _0x3b3364=this[_0x49dcf6(0x1da)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x1d8)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x116)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x150)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0xff)](_0x3b3364),_0x3b3364=this['convertFontSettingsEscapeCharacters'](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x107)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x189)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0xd0)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0xd7)](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x264)](_0x3b3364),_0x3b3364=this['postConvertEscapeCharacters'](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x116)](_0x3b3364),_0x3b3364=this['processAutoColorWords'](_0x3b3364),_0x3b3364=this[_0x49dcf6(0x12b)](_0x3b3364),_0x3b3364;},Window_Base['prototype'][_0x3abafe(0x1da)]=function(_0x2ca7d3){const _0x2aaff5=_0x3abafe;for(const _0x685ffc of VisuMZ[_0x2aaff5(0x221)][_0x2aaff5(0x119)][_0x2aaff5(0x1af)]){_0x2ca7d3[_0x2aaff5(0x83)](_0x685ffc[_0x2aaff5(0x1dc)])&&(_0x2ca7d3=_0x2ca7d3[_0x2aaff5(0x1fc)](_0x685ffc[_0x2aaff5(0x1dc)],_0x685ffc[_0x2aaff5(0x10a)][_0x2aaff5(0x20f)](this)));}return _0x2ca7d3;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1d8)]=function(_0x4075b1){return _0x4075b1=_0x4075b1['replace'](/\\/g,'\x1b'),_0x4075b1=_0x4075b1['replace'](/\x1b\x1b/g,'\x5c'),_0x4075b1;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x116)]=function(_0x1c7dd5){const _0x388f68=_0x3abafe;for(;;){if(_0x1c7dd5[_0x388f68(0x83)](/\\V\[(\d+)\]/gi))_0x1c7dd5=_0x1c7dd5[_0x388f68(0x1fc)](/\\V\[(\d+)\]/gi,(_0x2f7b25,_0x3ebd23)=>this['convertBackslashCharacters'](String($gameVariables[_0x388f68(0x1e7)](parseInt(_0x3ebd23)))));else{if(_0x1c7dd5[_0x388f68(0x83)](/\x1bV\[(\d+)\]/gi))_0x1c7dd5=_0x1c7dd5[_0x388f68(0x1fc)](/\x1bV\[(\d+)\]/gi,(_0x5e1da7,_0x387105)=>this[_0x388f68(0x1d8)](String($gameVariables[_0x388f68(0x1e7)](parseInt(_0x387105)))));else break;}}return _0x1c7dd5;},Window_Base['prototype']['preConvertEscapeCharacters']=function(_0x320570){const _0x485cf2=_0x3abafe;return this[_0x485cf2(0xee)](),_0x320570;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x7c)]=function(_0x54efc0){return _0x54efc0;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xff)]=function(_0x55bc23){const _0x3151e3=_0x3abafe;return _0x55bc23=_0x55bc23[_0x3151e3(0x1fc)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x55bc23=_0x55bc23['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x55bc23=_0x55bc23['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x55bc23;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1f0)]=function(_0x18239b){const _0x52c967=_0x3abafe;return _0x18239b=_0x18239b[_0x52c967(0x1fc)](/<B>/gi,'\x1bBOLD[1]'),_0x18239b=_0x18239b[_0x52c967(0x1fc)](/<\/B>/gi,_0x52c967(0x131)),_0x18239b=_0x18239b[_0x52c967(0x1fc)](/<I>/gi,_0x52c967(0x17b)),_0x18239b=_0x18239b[_0x52c967(0x1fc)](/<\/I>/gi,'\x1bITALIC[0]'),_0x18239b;},Window_Base[_0x3abafe(0x24f)]['convertTextAlignmentEscapeCharacters']=function(_0x3b631c){const _0x22dfa9=_0x3abafe;return _0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<\/LEFT>/gi,_0x22dfa9(0x1b0)),_0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<\/CENTER>/gi,_0x22dfa9(0x1b0)),_0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<RIGHT>/gi,_0x22dfa9(0x1ba)),_0x3b631c=_0x3b631c[_0x22dfa9(0x1fc)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x3b631c;},Window_Base[_0x3abafe(0x24f)]['convertLockColorsEscapeCharacters']=function(_0x110399){const _0x910d91=_0x3abafe;return _0x110399=_0x110399[_0x910d91(0x1fc)](/<COLORLOCK>/gi,_0x910d91(0x1c6)),_0x110399=_0x110399['replace'](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x110399=_0x110399[_0x910d91(0x1fc)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x110399=_0x110399[_0x910d91(0x1fc)](/\)\)\)/gi,_0x910d91(0x121)),_0x110399;},Window_Base['prototype'][_0x3abafe(0xd0)]=function(_0xa27c98){const _0x2d2bb4=_0x3abafe;return _0xa27c98=_0xa27c98['replace'](/\x1bN\[(\d+)\]/gi,(_0x470a7d,_0x456152)=>this['actorName'](parseInt(_0x456152))),_0xa27c98=_0xa27c98[_0x2d2bb4(0x1fc)](/\x1bP\[(\d+)\]/gi,(_0x49ae0d,_0x2e9a84)=>this[_0x2d2bb4(0x96)](parseInt(_0x2e9a84))),_0xa27c98=_0xa27c98[_0x2d2bb4(0x1fc)](/\x1bG/gi,TextManager[_0x2d2bb4(0x209)]),_0xa27c98;},Window_Base['prototype'][_0x3abafe(0xd7)]=function(_0x546bbe){const _0x255d2e=_0x3abafe;for(const _0x45598d of VisuMZ[_0x255d2e(0x221)][_0x255d2e(0x119)][_0x255d2e(0x1f6)]){_0x546bbe['match'](_0x45598d[_0x255d2e(0x1dc)])&&(_0x546bbe=_0x546bbe[_0x255d2e(0x1fc)](_0x45598d[_0x255d2e(0x1dc)],_0x45598d[_0x255d2e(0x10a)]),_0x546bbe=this[_0x255d2e(0x116)](_0x546bbe));}return _0x546bbe;},Window_Base['prototype'][_0x3abafe(0x264)]=function(_0x11c7b6){const _0x5b269a=_0x3abafe;for(const _0x2adb4d of VisuMZ[_0x5b269a(0x221)][_0x5b269a(0x119)][_0x5b269a(0x1be)]){_0x11c7b6[_0x5b269a(0x83)](_0x2adb4d['textCodeCheck'])&&(_0x11c7b6=_0x11c7b6['replace'](_0x2adb4d[_0x5b269a(0x1dc)],_0x2adb4d[_0x5b269a(0x10a)]['bind'](this)),_0x11c7b6=this[_0x5b269a(0x116)](_0x11c7b6));}return _0x11c7b6;},Window_Base['prototype']['actorName']=function(_0x3b8d28){const _0x288f74=_0x3abafe,_0x49c1a1=_0x3b8d28>=0x1?$gameActors[_0x288f74(0x1c4)](_0x3b8d28):null,_0x34acfd=_0x49c1a1?_0x49c1a1[_0x288f74(0x8f)]():'',_0x5a41cf=Number(VisuMZ[_0x288f74(0x221)]['Settings'][_0x288f74(0x8b)]['Actors']);return this[_0x288f74(0x14a)]()&&_0x5a41cf!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x288f74(0xc7)](_0x5a41cf,_0x34acfd):_0x34acfd;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x96)]=function(_0x1aec0a){const _0x2b0590=_0x3abafe,_0x472c5d=_0x1aec0a>=0x1?$gameParty['members']()[_0x1aec0a-0x1]:null,_0x234ab0=_0x472c5d?_0x472c5d['name']():'',_0x845555=Number(VisuMZ[_0x2b0590(0x221)][_0x2b0590(0x119)][_0x2b0590(0x8b)][_0x2b0590(0x160)]);return this[_0x2b0590(0x14a)]()&&_0x845555!==0x0?_0x2b0590(0x240)[_0x2b0590(0xc7)](_0x845555,_0x234ab0):_0x234ab0;},Window_Base[_0x3abafe(0x24f)]['processAutoColorWords']=function(_0x45667a){const _0xe2cdc9=_0x3abafe;return this[_0xe2cdc9(0x14a)]()&&(_0x45667a=this[_0xe2cdc9(0x22f)](_0x45667a),_0x45667a=this[_0xe2cdc9(0x278)](_0x45667a)),_0x45667a;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x22f)]=function(_0x3186cf){const _0x1a7a0e=_0x3abafe;for(autoColor of VisuMZ[_0x1a7a0e(0x221)]['AutoColorRegExp']){_0x3186cf=_0x3186cf[_0x1a7a0e(0x1fc)](autoColor[0x0],autoColor[0x1]);}return _0x3186cf;},Window_Base['prototype'][_0x3abafe(0x1a1)]=function(){const _0x112372=_0x3abafe;this[_0x112372(0x75)]=[];},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xee)]=function(){const _0x26a8d1=_0x3abafe;this[_0x26a8d1(0x1a1)]();const _0x1c1689=VisuMZ[_0x26a8d1(0x221)]['Settings'][_0x26a8d1(0x8b)],_0xc59448=_0x1c1689[_0x26a8d1(0x160)];if(_0xc59448<=0x0)return;for(const _0x57b2c9 of $gameActors[_0x26a8d1(0x1f2)]){if(!_0x57b2c9)continue;const _0x2a3b3f=_0x57b2c9['name']();if(_0x2a3b3f[_0x26a8d1(0x248)]()[_0x26a8d1(0x110)]<=0x0)continue;if(/^\d+$/[_0x26a8d1(0x26b)](_0x2a3b3f))continue;if(_0x2a3b3f[_0x26a8d1(0x83)](/-----/i))continue;let _0x23b60d=VisuMZ[_0x26a8d1(0x221)]['ConvertTextAutoColorRegExpFriendly'](_0x2a3b3f);const _0x4f458c=new RegExp('\x5cb'+_0x23b60d+'\x5cb','g'),_0x3f86da='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x26a8d1(0xc7)](_0xc59448,_0x2a3b3f);this[_0x26a8d1(0x75)][_0x26a8d1(0x123)]([_0x4f458c,_0x3f86da]);}},Window_Base['prototype'][_0x3abafe(0x278)]=function(_0x5b1b60){const _0x2fd2e9=_0x3abafe;this[_0x2fd2e9(0x75)]===undefined&&this[_0x2fd2e9(0xee)]();for(autoColor of this[_0x2fd2e9(0x75)]){_0x5b1b60=_0x5b1b60['replace'](autoColor[0x0],autoColor[0x1]);}return _0x5b1b60;},Window_Base[_0x3abafe(0x24f)]['databaseObjectName']=function(_0x1669d1,_0x582810,_0x4d7ef0){const _0x1c8f11=_0x3abafe;if(!_0x1669d1)return'';const _0x1c27c9=_0x1669d1[_0x582810];let _0x4e2845='';if(_0x1c27c9&&_0x4d7ef0&&_0x1c27c9['iconIndex']){const _0x2c1f14='\x1bi[%1]%2';_0x4e2845=_0x2c1f14[_0x1c8f11(0xc7)](_0x1c27c9[_0x1c8f11(0xdc)],_0x1c27c9[_0x1c8f11(0x8f)]);}else _0x1c27c9?_0x4e2845=_0x1c27c9[_0x1c8f11(0x8f)]:_0x4e2845='';return this['isAutoColorAffected']()&&(_0x4e2845=this[_0x1c8f11(0x130)](_0x4e2845,_0x1669d1)),_0x4e2845;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x136)]=function(_0xf22c2a){const _0x1cabea=_0x3abafe,_0x1ea5c6=$gameParty['getLastGainedItemData']();if(_0x1ea5c6['id']<0x0)return'';let _0xae2089=null;if(_0x1ea5c6[_0x1cabea(0x1f8)]===0x0)_0xae2089=$dataItems[_0x1ea5c6['id']];if(_0x1ea5c6[_0x1cabea(0x1f8)]===0x1)_0xae2089=$dataWeapons[_0x1ea5c6['id']];if(_0x1ea5c6['type']===0x2)_0xae2089=$dataArmors[_0x1ea5c6['id']];if(!_0xae2089)return'';return _0xf22c2a?_0x1cabea(0x89)[_0x1cabea(0xc7)](_0xae2089['iconIndex'],_0xae2089[_0x1cabea(0x8f)]):_0xae2089['name'];},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x151)]=function(){const _0x24c7d8=_0x3abafe,_0x2b2ca3=$gameParty['getLastGainedItemData']();if(_0x2b2ca3['id']<=0x0)return'';return _0x2b2ca3[_0x24c7d8(0x139)];},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x130)]=function(_0x37570b,_0x4572fe){const _0x230e50=_0x3abafe,_0xf7bc51=VisuMZ[_0x230e50(0x221)][_0x230e50(0x119)][_0x230e50(0x8b)];let _0x55494e=0x0;if(_0x4572fe===$dataActors)_0x55494e=_0xf7bc51[_0x230e50(0x160)];if(_0x4572fe===$dataClasses)_0x55494e=_0xf7bc51[_0x230e50(0x204)];if(_0x4572fe===$dataSkills)_0x55494e=_0xf7bc51[_0x230e50(0x12c)];if(_0x4572fe===$dataItems)_0x55494e=_0xf7bc51[_0x230e50(0x6d)];if(_0x4572fe===$dataWeapons)_0x55494e=_0xf7bc51[_0x230e50(0x183)];if(_0x4572fe===$dataArmors)_0x55494e=_0xf7bc51[_0x230e50(0x185)];if(_0x4572fe===$dataEnemies)_0x55494e=_0xf7bc51['Enemies'];if(_0x4572fe===$dataStates)_0x55494e=_0xf7bc51['States'];return _0x55494e>0x0&&(_0x37570b='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x230e50(0xc7)](_0x55494e,_0x37570b)),_0x37570b;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x12b)]=function(_0xcf8e38){const _0x46f7e7=_0x3abafe;_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0xbba17,_0x489ae4)=>this[_0x46f7e7(0x6c)](!![])),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x1b3e60,_0xfb2815)=>this[_0x46f7e7(0x6c)](![])),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x17a60e,_0x41c67f)=>this['setWordWrap'](![]));if(_0xcf8e38['match'](Window_Message[_0x46f7e7(0x18b)]))this[_0x46f7e7(0x6c)](![]);else _0xcf8e38['match'](Window_Message[_0x46f7e7(0xbd)])&&this[_0x46f7e7(0x6c)](![]);if(!this[_0x46f7e7(0x161)]())return _0xcf8e38;if(_0xcf8e38[_0x46f7e7(0x110)]<=0x0)return _0xcf8e38;return VisuMZ[_0x46f7e7(0x221)][_0x46f7e7(0x119)][_0x46f7e7(0x22a)][_0x46f7e7(0x254)]?(_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/[\n\r]+/g,'\x20'),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/[\n\r]+/g,''),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0xcf8e38=this[_0x46f7e7(0x18c)](_0xcf8e38),_0xcf8e38=_0xcf8e38[_0x46f7e7(0xcf)]('\x20')[_0x46f7e7(0x10c)]('\x1bWrapBreak[0]'),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0xcf8e38=_0xcf8e38[_0x46f7e7(0x1fc)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0xcf8e38;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x18c)]=function(_0x51f8e3){return _0x51f8e3;},VisuMZ['MessageCore'][_0x3abafe(0xf7)]=Window_Base[_0x3abafe(0x24f)]['processNewLine'],Window_Base['prototype'][_0x3abafe(0xa4)]=function(_0x4c569e){const _0x2b9cf9=_0x3abafe;VisuMZ[_0x2b9cf9(0x221)][_0x2b9cf9(0xf7)][_0x2b9cf9(0x152)](this,_0x4c569e),this[_0x2b9cf9(0x153)](_0x4c569e);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x16b)]=Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1dd)],Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1dd)]=function(_0x5e1cc8,_0xd6daeb){const _0x48b3b0=_0x3abafe;VisuMZ['MessageCore'][_0x48b3b0(0x16b)]['call'](this,_0x5e1cc8,_0xd6daeb),_0xd6daeb==='\x1bWrapBreak[0]'&&this[_0x48b3b0(0x263)](_0x5e1cc8);},Window_Base['prototype']['obtainEscapeString']=function(_0x5c2b32){const _0xfe05b9=_0x3abafe;var _0x33827b=/^\<(.*?)\>/[_0xfe05b9(0xb5)](_0x5c2b32[_0xfe05b9(0x277)]['slice'](_0x5c2b32['index']));return _0x33827b?(_0x5c2b32['index']+=_0x33827b[0x0][_0xfe05b9(0x110)],String(_0x33827b[0x0][_0xfe05b9(0x1e4)](0x1,_0x33827b[0x0][_0xfe05b9(0x110)]-0x1))):'';},VisuMZ[_0x3abafe(0x221)]['Window_Base_processEscapeCharacter']=Window_Base['prototype'][_0x3abafe(0x8e)],Window_Base[_0x3abafe(0x24f)]['processEscapeCharacter']=function(_0xcd7beb,_0x36a76f){const _0x47c50f=_0x3abafe;switch(_0xcd7beb){case'C':_0x36a76f[_0x47c50f(0x14c)]?VisuMZ[_0x47c50f(0x221)][_0x47c50f(0x1c9)]['call'](this,_0xcd7beb,_0x36a76f):this[_0x47c50f(0x15a)](_0x36a76f);break;case'I':case'{':case'}':VisuMZ[_0x47c50f(0x221)]['Window_Base_processEscapeCharacter']['call'](this,_0xcd7beb,_0x36a76f);break;case'FS':this['processFsTextCode'](_0x36a76f);break;case'PX':this[_0x47c50f(0xf8)](_0x36a76f);break;case'PY':this[_0x47c50f(0x253)](_0x36a76f);break;case _0x47c50f(0x86):this[_0x47c50f(0x268)](this[_0x47c50f(0x15a)](_0x36a76f));break;case _0x47c50f(0xeb):this[_0x47c50f(0x171)](_0x36a76f);break;case _0x47c50f(0x27c):this[_0x47c50f(0xac)](_0x36a76f);break;case'COMMONEVENT':this[_0x47c50f(0x179)](_0x36a76f);break;case _0x47c50f(0xc4):this[_0x47c50f(0x180)](this[_0x47c50f(0x15a)](_0x36a76f));break;case _0x47c50f(0x200):this['processDrawPicture'](_0x36a76f);break;case _0x47c50f(0x1d0):this[_0x47c50f(0x157)](_0x36a76f);break;case _0x47c50f(0x1e5):this[_0x47c50f(0xc0)](_0x36a76f);break;case _0x47c50f(0x197):this[_0x47c50f(0xaa)](_0x36a76f);break;case _0x47c50f(0xa2):this['processWrapBreak'](_0x36a76f);break;default:this[_0x47c50f(0x20d)](_0xcd7beb,_0x36a76f);}},Window_Base['prototype'][_0x3abafe(0x20d)]=function(_0x50aca8,_0x26329d){const _0x1e9d11=_0x3abafe;for(const _0x39a878 of VisuMZ[_0x1e9d11(0x221)][_0x1e9d11(0x119)][_0x1e9d11(0x1f6)]){if(_0x39a878['Match']===_0x50aca8){if(_0x39a878[_0x1e9d11(0x245)]==='')this[_0x1e9d11(0x15a)](_0x26329d);_0x39a878[_0x1e9d11(0x16e)][_0x1e9d11(0x152)](this,_0x26329d);if(this['constructor']===Window_Message){const _0x1f40f3=_0x39a878[_0x1e9d11(0x11c)]||0x0;if(_0x1f40f3>0x0)this[_0x1e9d11(0x162)](_0x1f40f3);}}}},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x215)]=function(){const _0x35eb78=_0x3abafe;this[_0x35eb78(0x223)][_0x35eb78(0x216)]+=VisuMZ[_0x35eb78(0x221)][_0x35eb78(0x119)][_0x35eb78(0x256)][_0x35eb78(0x94)],this[_0x35eb78(0x223)][_0x35eb78(0x216)]=Math[_0x35eb78(0x246)](this['contents'][_0x35eb78(0x216)],VisuMZ[_0x35eb78(0x221)][_0x35eb78(0x119)][_0x35eb78(0x256)][_0x35eb78(0x16f)]);},Window_Base['prototype']['makeFontSmaller']=function(){const _0x141356=_0x3abafe;this['contents'][_0x141356(0x216)]-=VisuMZ['MessageCore']['Settings'][_0x141356(0x256)][_0x141356(0x94)],this['contents'][_0x141356(0x216)]=Math[_0x141356(0xa8)](this['contents'][_0x141356(0x216)],VisuMZ[_0x141356(0x221)][_0x141356(0x119)][_0x141356(0x256)][_0x141356(0x201)]);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x74)]=function(_0x394b60){const _0x1cd777=_0x3abafe,_0x825791=this[_0x1cd777(0x15a)](_0x394b60);this[_0x1cd777(0x223)]['fontSize']=_0x825791[_0x1cd777(0x224)](VisuMZ[_0x1cd777(0x221)]['Settings'][_0x1cd777(0x256)]['FontSmallerCap'],VisuMZ[_0x1cd777(0x221)][_0x1cd777(0x119)][_0x1cd777(0x256)][_0x1cd777(0x16f)]);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xcc)]=function(_0x40718d){const _0x110ed9=_0x3abafe;let _0x5c6568=this['contents'][_0x110ed9(0x216)];const _0x146290=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x35b825=_0x146290[_0x110ed9(0xb5)](_0x40718d);if(!_0x35b825)break;const _0xe9007f=String(_0x35b825[0x1])['toUpperCase']();if(_0xe9007f==='{')this['makeFontBigger']();else{if(_0xe9007f==='}')this['makeFontSmaller']();else _0xe9007f==='FS'&&(this[_0x110ed9(0x223)][_0x110ed9(0x216)]=parseInt(_0x35b825[0x3])[_0x110ed9(0x224)](VisuMZ[_0x110ed9(0x221)][_0x110ed9(0x119)][_0x110ed9(0x256)][_0x110ed9(0x201)],VisuMZ['MessageCore'][_0x110ed9(0x119)][_0x110ed9(0x256)][_0x110ed9(0x16f)]));}this[_0x110ed9(0x223)][_0x110ed9(0x216)]>_0x5c6568&&(_0x5c6568=this[_0x110ed9(0x223)][_0x110ed9(0x216)]);}return _0x5c6568;},Window_Base['prototype'][_0x3abafe(0xf8)]=function(_0xaba80){const _0x1a44d3=_0x3abafe;_0xaba80['x']=this['obtainEscapeParam'](_0xaba80),VisuMZ[_0x1a44d3(0x221)][_0x1a44d3(0x119)]['General'][_0x1a44d3(0x104)]&&(_0xaba80['x']+=_0xaba80[_0x1a44d3(0x100)]);},Window_Base[_0x3abafe(0x24f)]['processPyTextCode']=function(_0x135f7c){const _0x405993=_0x3abafe;_0x135f7c['y']=this[_0x405993(0x15a)](_0x135f7c),VisuMZ[_0x405993(0x221)][_0x405993(0x119)][_0x405993(0x256)][_0x405993(0x104)]&&(_0x135f7c['y']+=_0x135f7c[_0x405993(0x82)]);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x268)]=function(_0x58bd7b){const _0x5627d6=_0x3abafe;this[_0x5627d6(0x223)][_0x5627d6(0xbc)]=!!_0x58bd7b;},Window_Base[_0x3abafe(0x24f)]['processFontChangeItalic']=function(_0x3b1522){const _0x16832b=_0x3abafe;this[_0x16832b(0x223)][_0x16832b(0x99)]=!!_0x3b1522;},Window_Base[_0x3abafe(0x24f)]['processTextAlignmentChange']=function(_0xa5cbda){const _0x2e28ba=_0x3abafe,_0x2228e4=this[_0x2e28ba(0x15a)](_0xa5cbda);if(!_0xa5cbda[_0x2e28ba(0x14c)])return;switch(_0x2228e4){case 0x0:this['setTextAlignment'](_0x2e28ba(0x1d4));return;case 0x1:this['setTextAlignment'](_0x2e28ba(0x269));break;case 0x2:this[_0x2e28ba(0x182)](_0x2e28ba(0x140));break;case 0x3:this[_0x2e28ba(0x182)](_0x2e28ba(0xe9));break;}this['processTextAlignmentX'](_0xa5cbda);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x153)]=function(_0x87f6ae){const _0x4ef28a=_0x3abafe;if(!_0x87f6ae[_0x4ef28a(0x14c)])return;if(_0x87f6ae[_0x4ef28a(0xdf)])return;if(this[_0x4ef28a(0x1bc)]()==='default')return;let _0x475958=_0x87f6ae[_0x4ef28a(0x277)]['indexOf']('\x1bTEXTALIGNMENT',_0x87f6ae[_0x4ef28a(0x21a)]+0x1),_0x4f4cdd=_0x87f6ae['text'][_0x4ef28a(0x177)]('\x0a',_0x87f6ae[_0x4ef28a(0x21a)]+0x1);if(_0x475958<0x0)_0x475958=_0x87f6ae['text'][_0x4ef28a(0x110)]+0x1;if(_0x4f4cdd>0x0)_0x475958=Math['min'](_0x475958,_0x4f4cdd);const _0x2b2e45=_0x87f6ae[_0x4ef28a(0x277)][_0x4ef28a(0x101)](_0x87f6ae['index'],_0x475958),_0x39f7b1=this[_0x4ef28a(0x249)](_0x2b2e45)['width'],_0x4764c8=_0x87f6ae[_0x4ef28a(0x141)]||this[_0x4ef28a(0x1bb)],_0x1e38e7=this[_0x4ef28a(0x1a5)]===Window_Message&&$gameMessage[_0x4ef28a(0x16c)]()!=='';switch(this['getTextAlignment']()){case _0x4ef28a(0x269):_0x87f6ae['x']=_0x87f6ae[_0x4ef28a(0x100)];break;case _0x4ef28a(0x140):_0x87f6ae['x']=_0x87f6ae[_0x4ef28a(0x100)],_0x87f6ae['x']+=Math[_0x4ef28a(0xc3)]((_0x4764c8-_0x39f7b1)/0x2);_0x1e38e7&&(_0x87f6ae['x']-=_0x87f6ae[_0x4ef28a(0x100)]/0x2);break;case _0x4ef28a(0xe9):_0x87f6ae['x']=_0x4764c8-_0x39f7b1+_0x87f6ae['startX'];_0x1e38e7&&(_0x87f6ae['x']-=_0x87f6ae[_0x4ef28a(0x100)]);break;}},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x249)]=function(_0x5eaf38){const _0x5e4f76=_0x3abafe;_0x5eaf38=_0x5eaf38[_0x5e4f76(0x1fc)](/\x1b!/g,''),_0x5eaf38=_0x5eaf38[_0x5e4f76(0x1fc)](/\x1b\|/g,''),_0x5eaf38=_0x5eaf38[_0x5e4f76(0x1fc)](/\x1b\./g,'');const _0x2bd0be=this['createTextState'](_0x5eaf38,0x0,0x0,0x0),_0x30fb39=this[_0x5e4f76(0x265)]();return _0x2bd0be[_0x5e4f76(0x14c)]=![],this[_0x5e4f76(0x230)](_0x2bd0be),this[_0x5e4f76(0x1e8)](_0x30fb39),{'width':_0x2bd0be[_0x5e4f76(0x88)],'height':_0x2bd0be[_0x5e4f76(0xe6)]};},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x263)]=function(_0x57afa2){const _0x191b58=_0x3abafe,_0x46bccb=(_0x57afa2[_0x191b58(0xdf)]?-0x1:0x1)*this[_0x191b58(0x170)]('\x20');_0x57afa2['x']+=_0x46bccb;if(this[_0x191b58(0x15a)](_0x57afa2)>0x0)_0x57afa2['x']+=_0x46bccb;if(_0x57afa2['rtl'])return;let _0x139033=_0x57afa2[_0x191b58(0x277)][_0x191b58(0x177)]('\x1bWrapBreak[0]',_0x57afa2[_0x191b58(0x21a)]+0x1),_0x363ec9=_0x57afa2[_0x191b58(0x277)][_0x191b58(0x177)]('\x0a',_0x57afa2['index']+0x1);if(_0x139033<0x0)_0x139033=_0x57afa2['text'][_0x191b58(0x110)]+0x1;if(_0x363ec9>0x0)_0x139033=Math['min'](_0x139033,_0x363ec9);const _0x207b6c=_0x57afa2['text'][_0x191b58(0x101)](_0x57afa2['index'],_0x139033),_0x5dc8ef=this[_0x191b58(0x84)](_0x207b6c)[_0x191b58(0x141)];let _0x13cc40=_0x57afa2[_0x191b58(0x141)]||this[_0x191b58(0x1bb)];if(this[_0x191b58(0x1a5)]===Window_Message){const _0x34a840=$gameMessage[_0x191b58(0x16c)]()===''?0x0:ImageManager[_0x191b58(0x244)]+0x14;_0x13cc40-=_0x34a840,VisuMZ[_0x191b58(0x221)][_0x191b58(0x119)]['WordWrap'][_0x191b58(0x113)]&&(_0x13cc40-=_0x34a840);}let _0x105e59=![];if(_0x57afa2['x']+_0x5dc8ef>_0x57afa2[_0x191b58(0x100)]+_0x13cc40)_0x105e59=!![];if(_0x5dc8ef===0x0)_0x105e59=!![];_0x105e59&&(_0x57afa2[_0x191b58(0x277)]=_0x57afa2['text']['slice'](0x0,_0x57afa2[_0x191b58(0x21a)])+'\x0a'+_0x57afa2[_0x191b58(0x277)][_0x191b58(0x228)](_0x57afa2[_0x191b58(0x21a)]));},Window_Base['prototype'][_0x3abafe(0x84)]=function(_0x40312a){const _0x85971=_0x3abafe,_0x5d2cab=this['createTextState'](_0x40312a,0x0,0x0,0x0),_0x186795=this['getPreservedFontSettings']();return _0x5d2cab[_0x85971(0x14c)]=![],this[_0x85971(0x6c)](![]),this[_0x85971(0x230)](_0x5d2cab),this[_0x85971(0x6c)](!![]),this[_0x85971(0x1e8)](_0x186795),{'width':_0x5d2cab[_0x85971(0x88)],'height':_0x5d2cab['outputHeight']};},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x179)]=function(_0x41f63d){const _0x344705=_0x3abafe;return this[_0x344705(0x15a)](_0x41f63d);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x1b6)]=function(_0x40f01e){const _0x59c7b1=_0x3abafe,_0x5c69ad=this[_0x59c7b1(0x1b4)](_0x40f01e)[_0x59c7b1(0xcf)](',');if(!_0x40f01e[_0x59c7b1(0x14c)])return;const _0x2f7dd2=_0x5c69ad[0x0][_0x59c7b1(0x248)](),_0x223ed2=_0x5c69ad[0x1]||0x0,_0x303408=_0x5c69ad[0x2]||0x0,_0xeda0f0=ImageManager[_0x59c7b1(0xd3)](_0x2f7dd2),_0x1aa31f=this[_0x59c7b1(0x223)]['paintOpacity'];_0xeda0f0['addLoadListener'](this[_0x59c7b1(0x193)][_0x59c7b1(0x20f)](this,_0xeda0f0,_0x40f01e['x'],_0x40f01e['y'],_0x223ed2,_0x303408,_0x1aa31f));},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0x193)]=function(_0x1b374a,_0x3a20f5,_0x7b1c6d,_0x511898,_0x50444c,_0x3c2f04){const _0x4f542f=_0x3abafe;_0x511898=_0x511898||_0x1b374a[_0x4f542f(0x141)],_0x50444c=_0x50444c||_0x1b374a['height'],this[_0x4f542f(0x168)]['paintOpacity']=_0x3c2f04,this[_0x4f542f(0x168)][_0x4f542f(0xfb)](_0x1b374a,0x0,0x0,_0x1b374a[_0x4f542f(0x141)],_0x1b374a[_0x4f542f(0x72)],_0x3a20f5,_0x7b1c6d,_0x511898,_0x50444c),this['contentsBack'][_0x4f542f(0x261)]=0xff;},Window_Base['prototype'][_0x3abafe(0x171)]=function(_0x13b2cc){const _0x11a7af=_0x3abafe,_0x1e1d61=this['obtainEscapeString'](_0x13b2cc)[_0x11a7af(0xcf)](',');if(!_0x13b2cc[_0x11a7af(0x14c)])return;const _0x413daf=_0x1e1d61[0x0][_0x11a7af(0x248)](),_0x21edac=ImageManager[_0x11a7af(0xd3)](_0x413daf),_0x7f7e17=JsonEx['makeDeepCopy'](_0x13b2cc),_0x1ea00c=this['contents'][_0x11a7af(0x261)];_0x21edac[_0x11a7af(0x1cf)](this[_0x11a7af(0xb3)][_0x11a7af(0x20f)](this,_0x21edac,_0x7f7e17,_0x1ea00c));},Window_Base['prototype'][_0x3abafe(0xb3)]=function(_0x201183,_0x239cd0,_0x5c71cf){const _0x1bcf38=_0x3abafe,_0x2e8f13=_0x239cd0[_0x1bcf38(0x141)]||this['innerWidth'],_0x21f87a=this[_0x1bcf38(0xdb)]!==undefined?this[_0x1bcf38(0x95)]():this['innerHeight'],_0x537df3=_0x2e8f13/_0x201183[_0x1bcf38(0x141)],_0x1a9791=_0x21f87a/_0x201183[_0x1bcf38(0x72)],_0x184fe8=Math[_0x1bcf38(0x246)](_0x537df3,_0x1a9791,0x1),_0x2ff355=this[_0x1bcf38(0xdb)]!==undefined?(this[_0x1bcf38(0x11b)](0x0)[_0x1bcf38(0x72)]-this[_0x1bcf38(0x15c)]())/0x2:0x0,_0x3b0a27=_0x201183[_0x1bcf38(0x141)]*_0x184fe8,_0x403e79=_0x201183[_0x1bcf38(0x72)]*_0x184fe8,_0x147333=Math[_0x1bcf38(0xc3)]((_0x2e8f13-_0x3b0a27)/0x2)+_0x239cd0[_0x1bcf38(0x100)],_0x5504fb=Math['floor']((_0x21f87a-_0x403e79)/0x2)+_0x239cd0[_0x1bcf38(0x82)]-_0x2ff355*0x2;this[_0x1bcf38(0x168)]['paintOpacity']=_0x5c71cf,this[_0x1bcf38(0x168)][_0x1bcf38(0xfb)](_0x201183,0x0,0x0,_0x201183['width'],_0x201183[_0x1bcf38(0x72)],_0x147333,_0x5504fb,_0x3b0a27,_0x403e79),this[_0x1bcf38(0x168)][_0x1bcf38(0x261)]=0xff;},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xac)]=function(_0x3fca0a){const _0x4aac76=_0x3abafe,_0x53242=this[_0x4aac76(0x15a)](_0x3fca0a);if(_0x3fca0a[_0x4aac76(0x14c)])this[_0x4aac76(0x1a4)](_0x53242>0x0);},Window_Base[_0x3abafe(0x24f)][_0x3abafe(0xaa)]=function(_0x2c224c){const _0x4db063=_0x3abafe,_0x2fc28e=this[_0x4db063(0x15a)](_0x2c224c);this[_0x4db063(0x1a5)]===Window_Message&&_0x2c224c[_0x4db063(0x14c)]&&this['startWait'](_0x2fc28e);},Window_Help[_0x3abafe(0x24f)][_0x3abafe(0x190)]=function(){const _0x4461ab=_0x3abafe;this[_0x4461ab(0x6c)]($gameSystem[_0x4461ab(0x234)]());},Window_Help['prototype']['isAutoColorAffected']=function(){return!![];},VisuMZ[_0x3abafe(0x221)]['Window_Help_refresh']=Window_Help[_0x3abafe(0x24f)]['refresh'],Window_Help[_0x3abafe(0x24f)][_0x3abafe(0x21c)]=function(){const _0x32555f=_0x3abafe;this['clearActorNameAutoColor'](),VisuMZ[_0x32555f(0x221)][_0x32555f(0x9c)][_0x32555f(0x152)](this),this['resetWordWrap']();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1f1)]=Window_Options['prototype'][_0x3abafe(0xad)],Window_Options[_0x3abafe(0x24f)][_0x3abafe(0xad)]=function(){const _0x194d56=_0x3abafe;VisuMZ['MessageCore'][_0x194d56(0x1f1)]['call'](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x3abafe(0x13d)]=function(){const _0x11e2b2=_0x3abafe;VisuMZ[_0x11e2b2(0x221)]['Settings'][_0x11e2b2(0x1d1)][_0x11e2b2(0x109)]&&this[_0x11e2b2(0x1f3)]();},Window_Options[_0x3abafe(0x24f)][_0x3abafe(0x1f3)]=function(){const _0x1982bc=_0x3abafe,_0x5171db=TextManager['messageCoreTextSpeed'],_0x475515=_0x1982bc(0xa9);this['addCommand'](_0x5171db,_0x475515);},VisuMZ[_0x3abafe(0x221)]['Window_Options_statusText']=Window_Options['prototype'][_0x3abafe(0x226)],Window_Options[_0x3abafe(0x24f)][_0x3abafe(0x226)]=function(_0x33431d){const _0x5551f6=_0x3abafe,_0x2cf26f=this[_0x5551f6(0x12f)](_0x33431d);if(_0x2cf26f===_0x5551f6(0xa9))return this[_0x5551f6(0xe3)]();return VisuMZ[_0x5551f6(0x221)]['Window_Options_statusText'][_0x5551f6(0x152)](this,_0x33431d);},VisuMZ['MessageCore'][_0x3abafe(0x23b)]=Window_Options[_0x3abafe(0x24f)]['isVolumeSymbol'],Window_Options[_0x3abafe(0x24f)]['isVolumeSymbol']=function(_0x2f88d6){const _0x49ee93=_0x3abafe;if(_0x2f88d6==='textSpeed')return!![];return VisuMZ['MessageCore'][_0x49ee93(0x23b)][_0x49ee93(0x152)](this,_0x2f88d6);},Window_Options[_0x3abafe(0x24f)][_0x3abafe(0xe3)]=function(){const _0x104b86=_0x3abafe,_0x1d5934=this[_0x104b86(0x1c3)](_0x104b86(0xa9));return _0x1d5934>0xa?TextManager[_0x104b86(0x1ed)]:_0x1d5934;},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x25e)]=Window_Options[_0x3abafe(0x24f)][_0x3abafe(0x112)],Window_Options[_0x3abafe(0x24f)][_0x3abafe(0x112)]=function(_0xd00872,_0xe05b09,_0x2cc3f4){const _0x7114a=_0x3abafe;if(_0xd00872===_0x7114a(0xa9))return this[_0x7114a(0x10b)](_0xd00872,_0xe05b09,_0x2cc3f4);VisuMZ[_0x7114a(0x221)]['Window_Options_changeVolume']['call'](this,_0xd00872,_0xe05b09,_0x2cc3f4);},Window_Options['prototype']['changeTextSpeed']=function(_0x4c4565,_0x43d1b9,_0x45ed6d){const _0x4a100c=_0x3abafe,_0x539d7d=this['getConfigValue'](_0x4c4565),_0x2a295a=0x1,_0x1f4518=_0x539d7d+(_0x43d1b9?_0x2a295a:-_0x2a295a);_0x1f4518>0xb&&_0x45ed6d?this[_0x4a100c(0x1d9)](_0x4c4565,0x1):this[_0x4a100c(0x1d9)](_0x4c4565,_0x1f4518['clamp'](0x1,0xb));},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x173)]=function(){const _0x2e288e=_0x3abafe;Window_Base[_0x2e288e(0x24f)][_0x2e288e(0x173)][_0x2e288e(0x152)](this),VisuMZ[_0x2e288e(0x221)][_0x2e288e(0x119)][_0x2e288e(0x256)][_0x2e288e(0x259)]&&this[_0x2e288e(0x13c)]();},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x13c)]=function(){const _0x26c20e=_0x3abafe;this[_0x26c20e(0x23f)]['x']=Math['round'](this[_0x26c20e(0x141)]/0x2),this[_0x26c20e(0x23f)][_0x26c20e(0x1a0)]['x']=0.5,this[_0x26c20e(0x23f)][_0x26c20e(0x10d)]['x']=Graphics[_0x26c20e(0x141)];},VisuMZ['MessageCore'][_0x3abafe(0x18a)]=Window_Message['prototype'][_0x3abafe(0x8a)],Window_Message[_0x3abafe(0x24f)]['clearFlags']=function(){const _0x4b631d=_0x3abafe;VisuMZ[_0x4b631d(0x221)]['Window_Message_clearFlags']['call'](this),this[_0x4b631d(0x1a1)](),this[_0x4b631d(0x190)](),this[_0x4b631d(0x1a4)](![]),this[_0x4b631d(0x182)](_0x4b631d(0x1d4)),this[_0x4b631d(0x1d6)](VisuMZ[_0x4b631d(0x221)]['Settings'][_0x4b631d(0x256)]['MessageTextDelay']);},Window_Message['prototype'][_0x3abafe(0x190)]=function(){const _0x5ac334=_0x3abafe;this[_0x5ac334(0x6c)]($gameSystem[_0x5ac334(0x11f)]());},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x14a)]=function(){return!![];},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x1d6)]=function(_0x4ba567){const _0x538a6e=_0x3abafe,_0x591ea1=0xb-ConfigManager[_0x538a6e(0xa9)];_0x4ba567=Math['round'](_0x4ba567*_0x591ea1),this[_0x538a6e(0xbb)]=_0x4ba567,this[_0x538a6e(0x211)]=_0x4ba567;},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1b3)]=Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x25c)],Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x25c)]=function(){const _0x4eb67d=_0x3abafe;return VisuMZ[_0x4eb67d(0x221)][_0x4eb67d(0x1b3)]['call'](this)||Input['isPressed'](VisuMZ['MessageCore'][_0x4eb67d(0x119)][_0x4eb67d(0x256)][_0x4eb67d(0x1bf)]);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xb1)]=Window_Message['prototype']['updatePlacement'],Window_Message['prototype'][_0x3abafe(0x117)]=function(){const _0x1223a5=_0x3abafe;let _0x204f1e=this['y'];VisuMZ['MessageCore'][_0x1223a5(0xb1)]['call'](this);if(this[_0x1223a5(0x1ca)])this['y']=_0x204f1e;this[_0x1223a5(0x92)]();},VisuMZ['MessageCore'][_0x3abafe(0x242)]=Window_Message[_0x3abafe(0x24f)]['newPage'],Window_Message['prototype'][_0x3abafe(0xa0)]=function(_0x42faf9){const _0x2db4ef=_0x3abafe;this[_0x2db4ef(0x202)](_0x42faf9),VisuMZ[_0x2db4ef(0x221)]['Window_Message_newPage']['call'](this,_0x42faf9),this[_0x2db4ef(0x85)]();},Window_Message['prototype'][_0x3abafe(0x202)]=function(_0x5949ed){const _0x48278d=_0x3abafe;this[_0x48278d(0xe4)](_0x5949ed),this[_0x48278d(0x6e)]();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1fa)]=Window_Message['prototype']['terminateMessage'],Window_Message[_0x3abafe(0x24f)][_0x3abafe(0xc8)]=function(){const _0x1c3553=_0x3abafe;VisuMZ[_0x1c3553(0x221)][_0x1c3553(0x1fa)][_0x1c3553(0x152)](this),this[_0x1c3553(0x8a)]();if(this['_messagePositionReset'])this[_0x1c3553(0xed)]();},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x6e)]=function(){const _0x2c8d68=_0x3abafe;this[_0x2c8d68(0x141)]=$gameSystem[_0x2c8d68(0x229)](),this[_0x2c8d68(0x141)]=Math['min'](Graphics[_0x2c8d68(0x141)],this['width']);const _0x4152dd=$gameSystem['getMessageWindowRows']();this[_0x2c8d68(0x72)]=SceneManager[_0x2c8d68(0x257)][_0x2c8d68(0xea)](_0x4152dd,![]),this[_0x2c8d68(0x72)]=Math[_0x2c8d68(0x246)](Graphics['height'],this['height']);if($gameTemp[_0x2c8d68(0x11d)])this[_0x2c8d68(0xbf)]();},Window_Message['prototype']['resetPositionX']=function(){const _0x2cc26c=_0x3abafe;this['x']=(Graphics[_0x2cc26c(0x106)]-this[_0x2cc26c(0x141)])/0x2,$gameTemp[_0x2cc26c(0x11d)]=undefined,this[_0x2cc26c(0x92)]();},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x212)]=function(){const _0x51b4c3=_0x3abafe,_0x59f76b={'x':this['x'],'y':this['y']};Window_Base['prototype']['updateMove'][_0x51b4c3(0x152)](this),this[_0x51b4c3(0x22e)](_0x59f76b);},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0xb6)]=function(){return!![];},Window_Message[_0x3abafe(0x24f)]['updateNameBoxMove']=function(_0x2ad377){const _0x2318fd=_0x3abafe;this[_0x2318fd(0x132)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x2ad377['x'],this[_0x2318fd(0x132)]['y']+=this['y']-_0x2ad377['y']);},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x124)]=function(_0x61089b,_0x23524d){const _0x5e2f19=_0x3abafe;this[_0x5e2f19(0x267)](this[_0x5e2f19(0x1c8)]['x'],this[_0x5e2f19(0xd1)]*(Graphics[_0x5e2f19(0x27e)]-this[_0x5e2f19(0x72)])/0x2,this['_resetRect'][_0x5e2f19(0x141)],this[_0x5e2f19(0x1c8)][_0x5e2f19(0x72)],_0x61089b,_0x23524d);},Window_Message['prototype'][_0x3abafe(0x179)]=function(_0x40b43c){const _0x569975=_0x3abafe,_0x4d7198=Window_Base['prototype']['processCommonEvent']['call'](this,_0x40b43c);this[_0x569975(0x162)](_0x4d7198);},Window_Message['prototype'][_0x3abafe(0x162)]=function(_0x118a57){const _0x54b8a9=_0x3abafe;if($gameParty[_0x54b8a9(0x175)]()){}else $gameMap[_0x54b8a9(0x142)](_0x118a57);},Window_Message['prototype'][_0x3abafe(0x14b)]=function(_0x378471){const _0x5c26e2=_0x3abafe;this[_0x5c26e2(0xbb)]--,this[_0x5c26e2(0xbb)]<=0x0&&(this['onProcessCharacter'](_0x378471),Window_Base[_0x5c26e2(0x24f)][_0x5c26e2(0x14b)]['call'](this,_0x378471));},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x91)]=function(_0x2d2aab){const _0x5cd9dc=_0x3abafe;this[_0x5cd9dc(0xbb)]=this['_textDelay'];if(this['_textDelay']<=0x0)this['_showFast']=!![];},VisuMZ[_0x3abafe(0x221)]['Window_Message_processEscapeCharacter']=Window_Message['prototype'][_0x3abafe(0x8e)],Window_Message[_0x3abafe(0x24f)]['processEscapeCharacter']=function(_0x4017e0,_0x4e4af1){const _0x5caea2=_0x3abafe;!_0x4e4af1[_0x5caea2(0x14c)]?Window_Base[_0x5caea2(0x24f)]['processEscapeCharacter'][_0x5caea2(0x152)](this,_0x4017e0,_0x4e4af1):VisuMZ[_0x5caea2(0x221)][_0x5caea2(0xec)][_0x5caea2(0x152)](this,_0x4017e0,_0x4e4af1);},Window_Message[_0x3abafe(0x24f)]['prepareAutoSizeEscapeCharacters']=function(_0x28accc){const _0x493ac8=_0x3abafe;let _0x5da10e=_0x28accc['text'];_0x5da10e=_0x5da10e['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x58fb31=_0x52a6;return this[_0x58fb31(0xc5)](_0x5da10e,!![],!![]),this[_0x58fb31(0x1d7)](_0x58fb31(0x205)),'';}),_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x52f635=_0x493ac8;return this[_0x52f635(0xc5)](_0x5da10e,!![],![]),this['processAutoPosition'](_0x52f635(0x205)),'';}),_0x5da10e=_0x5da10e['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x31866e=_0x493ac8;return this[_0x31866e(0xc5)](_0x5da10e,![],!![]),this[_0x31866e(0x1d7)](_0x31866e(0x205)),'';});if(SceneManager['isSceneBattle']())_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x12b3a2,_0x226767)=>{const _0x1771b1=_0x493ac8;return this[_0x1771b1(0xc5)](_0x5da10e,!![],!![]),this[_0x1771b1(0x1d7)]('battle\x20actor',Number(_0x226767)||0x1),'';}),_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x40b4e3,_0x4fc866)=>{const _0x30c2ea=_0x493ac8;return this[_0x30c2ea(0xc5)](_0x5da10e,!![],!![]),this[_0x30c2ea(0x1d7)](_0x30c2ea(0x27d),Number(_0x4fc866)||0x0),'';}),_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x479086,_0x538d57)=>{const _0x51697e=_0x493ac8;return this['processAutoSize'](_0x5da10e,!![],!![]),this[_0x51697e(0x1d7)]('battle\x20enemy',Number(_0x538d57)||0x0),'';});else SceneManager[_0x493ac8(0xaf)]()&&(_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0xc1aab2,_0x4134bd)=>{const _0x306137=_0x493ac8;return this['processAutoSize'](_0x5da10e,!![],!![]),this[_0x306137(0x1d7)](_0x306137(0x1b1),0x0),'';}),_0x5da10e=_0x5da10e[_0x493ac8(0x1fc)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x55abd3,_0x4bb098)=>{const _0x3cbfe6=_0x493ac8;return this['processAutoSize'](_0x5da10e,!![],!![]),this[_0x3cbfe6(0x1d7)](_0x3cbfe6(0x188),Number(_0x4bb098)||0x1),'';}),_0x5da10e=_0x5da10e['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x339d98,_0x87f83d)=>{const _0x34a3c1=_0x493ac8;return this[_0x34a3c1(0xc5)](_0x5da10e,!![],!![]),this[_0x34a3c1(0x1d7)](_0x34a3c1(0x17e),Number(_0x87f83d)||0x0),'';}),_0x5da10e=_0x5da10e['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x288719,_0x4bc3d6)=>{const _0x254863=_0x493ac8;return this['processAutoSize'](_0x5da10e,!![],!![]),this['processAutoPosition'](_0x254863(0x233),Number(_0x4bc3d6)||0x0),'';}));_0x28accc[_0x493ac8(0x277)]=_0x5da10e;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message['_autoPosRegExp']=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x3abafe(0x24f)][_0x3abafe(0xc5)]=function(_0x4964a9,_0x37169e,_0x5a8417){const _0x291fea=_0x3abafe;_0x4964a9=_0x4964a9['replace'](Window_Message[_0x291fea(0x18b)],''),_0x4964a9=_0x4964a9['replace'](Window_Message[_0x291fea(0xbd)],''),this[_0x291fea(0x147)]=!![];const _0x284e0f=this[_0x291fea(0x22d)](_0x4964a9);if(_0x37169e){let _0x5db74c=_0x284e0f[_0x291fea(0x141)]+$gameSystem['windowPadding']()*0x2+0x6;const _0xc94ee6=$gameMessage['faceName']()!=='',_0x335348=ImageManager[_0x291fea(0x244)],_0x77e3a1=0x14;_0x5db74c+=_0xc94ee6?_0x335348+_0x77e3a1:0x4,$gameSystem[_0x291fea(0x191)](_0x5db74c);}if(_0x5a8417){let _0x318222=Math[_0x291fea(0x158)](_0x284e0f[_0x291fea(0x72)]/this['lineHeight']());$gameSystem[_0x291fea(0x26f)](_0x318222);}this['updateAutoSizePosition'](),this[_0x291fea(0x147)]=![],this[_0x291fea(0x16d)]=!![];},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0xb8)]=function(){const _0x238e0f=_0x3abafe;this['updateDimensions'](),this['updatePlacement'](),this[_0x238e0f(0xbf)](),this[_0x238e0f(0x1ff)](),this[_0x238e0f(0x223)][_0x238e0f(0x276)](),this[_0x238e0f(0x85)]();},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x1d7)]=function(_0x256b9d,_0xa7f0d3){const _0x325505=_0x3abafe;switch(_0x256b9d['toLowerCase']()[_0x325505(0x248)]()){case'battle\x20actor':this[_0x325505(0x1ca)]=$gameActors['actor'](_0xa7f0d3);break;case'battle\x20party':this['_autoPositionTarget']=$gameParty[_0x325505(0x237)]()[_0xa7f0d3-0x1];break;case _0x325505(0x220):this['_autoPositionTarget']=$gameTroop[_0x325505(0x237)]()[_0xa7f0d3-0x1];break;case _0x325505(0x1b1):this['_autoPositionTarget']=$gamePlayer;break;case'map\x20actor':const _0x3df0e3=$gameActors[_0x325505(0x1c4)](_0xa7f0d3)[_0x325505(0x21a)]();_0x3df0e3===0x0?this[_0x325505(0x1ca)]=$gamePlayer:this[_0x325505(0x1ca)]=$gamePlayer[_0x325505(0x108)]()['follower'](_0x3df0e3-0x1);break;case _0x325505(0x17e):_0xa7f0d3===0x1?this['_autoPositionTarget']=$gamePlayer:this[_0x325505(0x1ca)]=$gamePlayer[_0x325505(0x108)]()[_0x325505(0x266)](_0xa7f0d3-0x2);break;case'map\x20event':this[_0x325505(0x1ca)]=$gameMap[_0x325505(0x184)](_0xa7f0d3);break;}this[_0x325505(0x1ca)]&&this['updateAutoPosition']();},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x176)]=Window_Message['prototype'][_0x3abafe(0x11e)],Window_Message[_0x3abafe(0x24f)][_0x3abafe(0x11e)]=function(){const _0x2a8d03=_0x3abafe;this[_0x2a8d03(0x255)](),VisuMZ[_0x2a8d03(0x221)][_0x2a8d03(0x176)][_0x2a8d03(0x152)](this);},Window_Message['prototype'][_0x3abafe(0x255)]=function(){const _0x2eab4a=_0x3abafe;if(!this[_0x2eab4a(0x1ca)])return;const _0x1cb7a6=SceneManager[_0x2eab4a(0x257)];if(!_0x1cb7a6)return;if(!_0x1cb7a6['_spriteset'])return;const _0x2f0359=_0x1cb7a6[_0x2eab4a(0x24b)][_0x2eab4a(0x10e)](this[_0x2eab4a(0x1ca)]);if(!_0x2f0359)return;let _0x3d0f76=_0x2f0359['x'];_0x3d0f76-=this['width']/0x2,_0x3d0f76-=(Graphics[_0x2eab4a(0x141)]-Graphics[_0x2eab4a(0x106)])/0x2;let _0x1f3d41=_0x2f0359['y'];_0x1f3d41-=this[_0x2eab4a(0x72)],_0x1f3d41-=(Graphics[_0x2eab4a(0x72)]-Graphics[_0x2eab4a(0x27e)])/0x2,_0x2f0359[_0x2eab4a(0x1ce)]?_0x1f3d41-=_0x2f0359[_0x2eab4a(0x1ce)]()[_0x2eab4a(0x72)]+0x18:_0x1f3d41-=_0x2f0359[_0x2eab4a(0x72)]+0x8,this['x']=Math['round'](_0x3d0f76),this['y']=Math['round'](_0x1f3d41),this[_0x2eab4a(0x92)](!![],![]),this[_0x2eab4a(0x132)]['updatePlacement']();},Window_Message[_0x3abafe(0x24f)]['messagePositionReset']=function(){const _0x99b3b2=_0x3abafe;this[_0x99b3b2(0x16d)]=![],this[_0x99b3b2(0x1ca)]=undefined,$gameSystem[_0x99b3b2(0xcb)](),this[_0x99b3b2(0xb8)](),this[_0x99b3b2(0x274)]=0x0;},Window_Message['prototype'][_0x3abafe(0x150)]=function(_0x45b912){const _0x5c9d36=_0x3abafe;return Window_Base[_0x5c9d36(0x24f)][_0x5c9d36(0x150)]['call'](this,_0x45b912);},Window_Message[_0x3abafe(0x24f)]['postConvertEscapeCharacters']=function(_0x4848f8){const _0x16c144=_0x3abafe;return Window_Base[_0x16c144(0x24f)]['postConvertEscapeCharacters']['call'](this,_0x4848f8);},Window_Message[_0x3abafe(0x24f)][_0x3abafe(0xfd)]=function(_0x587158){const _0x1e7cde=_0x3abafe;this[_0x1e7cde(0x19b)](_0x587158),Window_Base[_0x1e7cde(0x24f)]['flushTextState']['call'](this,_0x587158),this[_0x1e7cde(0x155)](_0x587158);},Window_Message['prototype']['preFlushTextState']=function(_0x5a8d1e){},Window_Message['prototype'][_0x3abafe(0x155)]=function(_0x5a2297){},Window_NameBox[_0x3abafe(0x24f)]['isAutoColorAffected']=function(){return![];},Window_NameBox['prototype'][_0x3abafe(0x18f)]=function(){const _0x3d7526=_0x3abafe;Window_Base[_0x3d7526(0x24f)]['resetTextColor'][_0x3d7526(0x152)](this),this['changeTextColor'](this[_0x3d7526(0x217)]());},Window_NameBox['prototype'][_0x3abafe(0x217)]=function(){const _0x3c2dfb=_0x3abafe,_0x4ba8eb=VisuMZ[_0x3c2dfb(0x221)][_0x3c2dfb(0x119)][_0x3c2dfb(0x256)]['NameBoxWindowDefaultColor'];return ColorManager['textColor'](_0x4ba8eb);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x1f5)]=Window_NameBox[_0x3abafe(0x24f)][_0x3abafe(0x117)],Window_NameBox[_0x3abafe(0x24f)][_0x3abafe(0x117)]=function(){const _0x33a95f=_0x3abafe;VisuMZ[_0x33a95f(0x221)][_0x33a95f(0x1f5)][_0x33a95f(0x152)](this),this[_0x33a95f(0xc2)](),this[_0x33a95f(0x227)](),this['clampPlacementPosition'](),this[_0x33a95f(0x279)]();},Window_NameBox[_0x3abafe(0x24f)][_0x3abafe(0x150)]=function(_0x66de52){const _0x2fb281=_0x3abafe;return _0x66de52=_0x66de52[_0x2fb281(0x1fc)](/<LEFT>/gi,this[_0x2fb281(0xe0)][_0x2fb281(0x20f)](this,0x0)),_0x66de52=_0x66de52[_0x2fb281(0x1fc)](/<CENTER>/gi,this['setRelativePosition']['bind'](this,0x5)),_0x66de52=_0x66de52[_0x2fb281(0x1fc)](/<RIGHT>/gi,this['setRelativePosition'][_0x2fb281(0x20f)](this,0xa)),_0x66de52=_0x66de52['replace'](/<POSITION:[ ](\d+)>/gi,(_0x37d2cf,_0x5ef20e)=>this[_0x2fb281(0xe0)](parseInt(_0x5ef20e))),_0x66de52=_0x66de52['replace'](/<\/LEFT>/gi,''),_0x66de52=_0x66de52[_0x2fb281(0x1fc)](/<\/CENTER>/gi,''),_0x66de52=_0x66de52[_0x2fb281(0x1fc)](/<\/RIGHT>/gi,''),Window_Base[_0x2fb281(0x24f)]['preConvertEscapeCharacters']['call'](this,_0x66de52);},Window_NameBox['prototype'][_0x3abafe(0xe0)]=function(_0x2a1210){return this['_relativePosition']=_0x2a1210,'';},Window_NameBox[_0x3abafe(0x24f)]['updateRelativePosition']=function(){const _0x292177=_0x3abafe;if($gameMessage[_0x292177(0x81)]())return;this[_0x292177(0x1c0)]=this['_relativePosition']||0x0;const _0x580ea8=this[_0x292177(0xb2)],_0x34068a=Math[_0x292177(0xc3)](_0x580ea8[_0x292177(0x141)]*this[_0x292177(0x1c0)]/0xa);this['x']=_0x580ea8['x']+_0x34068a-Math[_0x292177(0xc3)](this['width']/0x2),this['x']=this['x']['clamp'](_0x580ea8['x'],_0x580ea8['x']+_0x580ea8[_0x292177(0x141)]-this['width']);},Window_NameBox['prototype']['updateOffsetPosition']=function(){const _0x4b179f=_0x3abafe;if($gameMessage['isRTL']())return;this['_relativePosition']=this[_0x4b179f(0x1c0)]||0x0;const _0x4d8eb3=VisuMZ[_0x4b179f(0x221)][_0x4b179f(0x119)][_0x4b179f(0x256)]['NameBoxWindowOffsetX'],_0x334d93=VisuMZ[_0x4b179f(0x221)][_0x4b179f(0x119)][_0x4b179f(0x256)]['NameBoxWindowOffsetY'],_0x2fc488=(0x5-this[_0x4b179f(0x1c0)])/0x5;this['x']+=Math[_0x4b179f(0xc3)](_0x4d8eb3*_0x2fc488),this['y']+=_0x334d93;},Window_NameBox[_0x3abafe(0x24f)][_0x3abafe(0x279)]=function(){const _0x7428e3=_0x3abafe,_0x4fa94d=this[_0x7428e3(0xb2)],_0x17280b=_0x4fa94d['y'],_0x2b9807=VisuMZ[_0x7428e3(0x221)][_0x7428e3(0x119)]['General'][_0x7428e3(0x20b)];_0x17280b>this['y']&&_0x17280b<this['y']+this[_0x7428e3(0x72)]-_0x2b9807&&(this['y']=_0x4fa94d['y']+_0x4fa94d['height']);},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0x159)]=Window_NameBox[_0x3abafe(0x24f)][_0x3abafe(0x21c)],Window_NameBox['prototype']['refresh']=function(){const _0x6e5699=_0x3abafe;this[_0x6e5699(0x1c0)]=0x0,VisuMZ['MessageCore'][_0x6e5699(0x159)]['call'](this);},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x161)]=function(){return![];},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x14a)]=function(){return!![];},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x15c)]=function(){const _0x4b22fe=_0x3abafe;return $gameSystem[_0x4b22fe(0x1e1)]();},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0xfa)]=function(){const _0x32f2ad=_0x3abafe;return $gameSystem[_0x32f2ad(0x21f)]();},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x172)]=function(){const _0x2f45f9=_0x3abafe;this['updateBackground'](),this[_0x2f45f9(0x21c)](),this[_0x2f45f9(0xde)](),this[_0x2f45f9(0x1f7)](),this['activate']();},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x21c)]=function(){const _0x45dcbc=_0x3abafe;this[_0x45dcbc(0x1a3)](),this[_0x45dcbc(0x21e)](),this[_0x45dcbc(0xb2)]&&(this['updatePlacement'](),this['placeCancelButton']()),this[_0x45dcbc(0x85)](),Window_Selectable[_0x45dcbc(0x24f)][_0x45dcbc(0x21c)]['call'](this);},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x21e)]=function(){const _0x41b5bb=_0x3abafe,_0x537c8f=$gameMessage['choices']();let _0x4a0947=0x0;for(const _0x3c582e of _0x537c8f){if(this[_0x41b5bb(0xda)](_0x3c582e)){const _0x2cad91=_0x3c582e,_0x92ef99=this[_0x41b5bb(0x1df)](_0x3c582e);this['addCommand'](_0x2cad91,_0x41b5bb(0xb0),_0x92ef99,_0x4a0947);}_0x4a0947++;}},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0xda)]=function(_0x1fb1ab){const _0x170f9b=_0x3abafe;if(_0x1fb1ab[_0x170f9b(0x83)](/<HIDE>/i))return![];if(_0x1fb1ab[_0x170f9b(0x83)](/<SHOW>/i))return!![];if(_0x1fb1ab[_0x170f9b(0x83)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x310e6e=JSON['parse']('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x4b32ab of _0x310e6e){if(!$gameSwitches['value'](_0x4b32ab))return![];}return!![];}if(_0x1fb1ab[_0x170f9b(0x83)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x39a779=JSON[_0x170f9b(0xca)]('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x15a296 of _0x39a779){if(!$gameSwitches['value'](_0x15a296))return![];}return!![];}if(_0x1fb1ab['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16c6a6=JSON['parse']('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x34d1fe of _0x16c6a6){if($gameSwitches[_0x170f9b(0x1e7)](_0x34d1fe))return!![];}return![];}if(_0x1fb1ab[_0x170f9b(0x83)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xf34333=JSON[_0x170f9b(0xca)]('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x543529 of _0xf34333){if(!$gameSwitches[_0x170f9b(0x1e7)](_0x543529))return!![];}return![];}if(_0x1fb1ab[_0x170f9b(0x83)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43267a=JSON[_0x170f9b(0xca)]('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x2a09b0 of _0x43267a){if(!$gameSwitches[_0x170f9b(0x1e7)](_0x2a09b0))return!![];}return![];}if(_0x1fb1ab['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7b0789=JSON[_0x170f9b(0xca)]('['+RegExp['$1'][_0x170f9b(0x83)](/\d+/g)+']');for(const _0x3d786b of _0x7b0789){if($gameSwitches['value'](_0x3d786b))return![];}return!![];}return!![];},Window_ChoiceList[_0x3abafe(0x24f)]['isChoiceEnabled']=function(_0x3fe681){const _0xe71224=_0x3abafe;if(_0x3fe681[_0xe71224(0x83)](/<DISABLE>/i))return![];if(_0x3fe681[_0xe71224(0x83)](/<ENABLE>/i))return!![];if(_0x3fe681[_0xe71224(0x83)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40ed22=JSON[_0xe71224(0xca)]('['+RegExp['$1'][_0xe71224(0x83)](/\d+/g)+']');for(const _0x5e0108 of _0x40ed22){if(!$gameSwitches[_0xe71224(0x1e7)](_0x5e0108))return![];}return!![];}if(_0x3fe681['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c3aba=JSON[_0xe71224(0xca)]('['+RegExp['$1'][_0xe71224(0x83)](/\d+/g)+']');for(const _0x42dc9f of _0x1c3aba){if(!$gameSwitches[_0xe71224(0x1e7)](_0x42dc9f))return![];}return!![];}if(_0x3fe681['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59e20d=JSON[_0xe71224(0xca)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xae7936 of _0x59e20d){if($gameSwitches['value'](_0xae7936))return!![];}return![];}if(_0x3fe681['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4866b1=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x91efc6 of _0x4866b1){if(!$gameSwitches[_0xe71224(0x1e7)](_0x91efc6))return!![];}return![];}if(_0x3fe681[_0xe71224(0x83)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1beabb=JSON['parse']('['+RegExp['$1'][_0xe71224(0x83)](/\d+/g)+']');for(const _0x4ed0a5 of _0x1beabb){if(!$gameSwitches[_0xe71224(0x1e7)](_0x4ed0a5))return!![];}return![];}if(_0x3fe681[_0xe71224(0x83)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4c6f7c=JSON[_0xe71224(0xca)]('['+RegExp['$1'][_0xe71224(0x83)](/\d+/g)+']');for(const _0xebc778 of _0x4c6f7c){if($gameSwitches[_0xe71224(0x1e7)](_0xebc778))return![];}return!![];}return!![];},VisuMZ[_0x3abafe(0x221)][_0x3abafe(0xd6)]=Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x117)],Window_ChoiceList['prototype']['updatePlacement']=function(){const _0xee3092=_0x3abafe;VisuMZ[_0xee3092(0x221)][_0xee3092(0xd6)][_0xee3092(0x152)](this),this[_0xee3092(0x92)]();},Window_ChoiceList['prototype'][_0x3abafe(0x207)]=function(){const _0x49dfa1=_0x3abafe;if(!this['_cancelButton'])return;const _0x339af8=0x8,_0x49935a=this[_0x49dfa1(0x1e9)],_0x5140a8=this['x']+this[_0x49dfa1(0x141)],_0x5ba244=Math[_0x49dfa1(0xc3)]((Graphics['width']-Graphics[_0x49dfa1(0x106)])/0x2);_0x5140a8>=Graphics[_0x49dfa1(0x106)]+_0x5ba244-_0x49935a['width']+_0x339af8?_0x49935a['x']=-_0x49935a['width']-_0x339af8:_0x49935a['x']=this[_0x49dfa1(0x141)]+_0x339af8,_0x49935a['y']=this[_0x49dfa1(0x72)]/0x2-_0x49935a['height']/0x2;},VisuMZ['MessageCore'][_0x3abafe(0x23a)]=Window_ChoiceList['prototype'][_0x3abafe(0x203)],Window_ChoiceList[_0x3abafe(0x24f)]['windowX']=function(){const _0x5bfad2=_0x3abafe;return this['_messageWindow']?this[_0x5bfad2(0x196)]():VisuMZ['MessageCore'][_0x5bfad2(0x23a)]['call'](this);},Window_ChoiceList['prototype']['messageCoreWindowX']=function(){const _0x46ec89=_0x3abafe,_0x369379=$gameMessage['choicePositionType']();if(_0x369379===0x1)return(Graphics[_0x46ec89(0x106)]-this[_0x46ec89(0x23c)]())/0x2;else return _0x369379===0x2?this[_0x46ec89(0xb2)]['x']+this['_messageWindow'][_0x46ec89(0x141)]-this['windowWidth']():this['_messageWindow']['x'];},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x23c)]=function(){const _0x2d9393=_0x3abafe,_0x42a5b0=(this[_0x2d9393(0x1ea)]()+this['colSpacing']())*this[_0x2d9393(0xfa)]()+this['padding']*0x2;return Math[_0x2d9393(0x246)](_0x42a5b0,Graphics['width']);},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x252)]=function(){const _0x3c4a67=_0x3abafe,_0x7b9623=Math[_0x3c4a67(0x158)]($gameMessage[_0x3c4a67(0x20a)]()[_0x3c4a67(0x110)]/this[_0x3c4a67(0xfa)]());return Math[_0x3c4a67(0x246)](_0x7b9623,this[_0x3c4a67(0x13a)]());},Window_ChoiceList[_0x3abafe(0x24f)][_0x3abafe(0x13a)]=function(){const _0x48e3b7=_0x3abafe,_0x33dd7f=this[_0x48e3b7(0xb2)],_0x348098=_0x33dd7f?_0x33dd7f['y']:0x0,_0x340661=_0x33dd7f?_0x33dd7f['height']:0x0,_0x2b981a=Graphics[_0x48e3b7(0x27e)]/0x2;return _0x348098<_0x2b981a&&_0x348098+_0x340661>_0x2b981a?0x4:$gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x3abafe(0x24f)]['maxChoiceWidth']=function(){const _0x4508d2=_0x3abafe;let _0x4404d7=0x60;for(const _0x3098b3 of this['_list']){const _0x3459a2=_0x3098b3[_0x4508d2(0x8f)],_0x194c08=this[_0x4508d2(0x22d)](_0x3459a2)[_0x4508d2(0x141)],_0x208458=Math[_0x4508d2(0x158)](_0x194c08)+this[_0x4508d2(0x235)]()*0x2;_0x4404d7<_0x208458&&(_0x4404d7=_0x208458);}return _0x4404d7;},Window_ChoiceList[_0x3abafe(0x24f)]['drawItem']=function(_0x222ddf){const _0x383a16=_0x3abafe,_0x7735ed=this[_0x383a16(0x76)](_0x222ddf),_0x5085e8=$gameSystem['getChoiceListTextAlign']()!==_0x383a16(0x1d4)?_0x383a16(0x118)[_0x383a16(0xc7)]($gameSystem[_0x383a16(0x22c)]()):'',_0x106693=_0x5085e8+this[_0x383a16(0x1ac)](_0x222ddf);this[_0x383a16(0x11a)](this['isCommandEnabled'](_0x222ddf)),this[_0x383a16(0xb9)](_0x106693,_0x7735ed['x'],_0x7735ed['y'],_0x7735ed[_0x383a16(0x141)]);},Window_ChoiceList['prototype'][_0x3abafe(0x206)]=function(){const _0x3b5443=_0x3abafe;$gameMessage[_0x3b5443(0x194)](this[_0x3b5443(0x133)]()),this['_messageWindow'][_0x3b5443(0xc8)](),this['close']();};