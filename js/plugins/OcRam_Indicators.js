//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Indicators.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Indicators", "1.06");

/*:
 * @target MZ
 * @plugindesc v1.06 This plugin provides various indicators. Event labels, loot messages, action indicators etc...
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderBefore OcRam_Passages
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * 
 * @command show
 * @text Show indicators
 * @desc Show labels/messages and/or action tooltips
 *
 * @arg indicatorType
 * @type select
 * @option Labels
 * @value 0
 * @option Notifications
 * @value 1
 * @option Action tooltips
 * @value 2
 * @option ALL INDICATORS
 * @value 3
 * @default 0
 * @text Type
 * @desc Indicator type to show?
 *
 * @command hide
 * @text Hide indicators
 * @desc Hide labels/messages and/or action tooltips
 *
 * @arg indicatorType
 * @type select
 * @option Labels
 * @value 0
 * @option Notifications
 * @value 1
 * @option Action tooltips
 * @value 2
 * @option ALL INDICATORS
 * @value 3
 * @default 0
 * @text Type
 * @desc Indicator type to show?
 *
 * @command minorMessage
 * @text Minor message
 * @desc Show minor message on screen. Default struct is used for font, outline width, fade and padding.
 *
 * @arg message
 * @text Message
 * @type text
 * @default Hello world!
 * @desc Message shown to player.
 *
 * @arg BG
 * @type select
 * @option No BG
 * @value 0
 * @option BG1
 * @value 1
 * @option BG2
 * @value 2
 * @option BG3
 * @value 3
 * @option BG4
 * @value 4
 * @default 1
 * @text Background
 * @desc Background image for message.
 *
 * @arg icon
 * @text Icon index
 * @type icon
 * @default 0
 * @desc Icon index for this message. (0 = No icon)
 *
 * @arg fontColor
 * @text Font color
 * @type text
 * @default #ffffffff
 * @desc Font color as HEX RGB(A).
 *
 * @arg outlineColor
 * @text Outline color
 * @type text
 * @default #00000000
 * @desc Outline color as HEX RGB(A).
 *
 * @arg se
 * @text SE
 * @type struct<SoundData>
 * @default
 * @desc Sound effect when message is shown.
 *
 * @arg gameObjectId
 * @text Object Id
 * @type number
 * @default 0
 * @desc -1 = player, -2 to -99 = follower, -100 to -n vehicle, 0 = SCREEN, 1 to n = Event id
 *
 * @command majorMessage
 * @text Major message
 * @desc Show major message on screen. Default struct is used for font, outline width, fade and padding.
 *
 * @arg message
 * @text Message
 * @type text
 * @default Hello world!
 * @desc Message shown to player.
 *
 * @arg BG
 * @type select
 * @option No BG
 * @value 0
 * @option BG1
 * @value 1
 * @option BG2
 * @value 2
 * @option BG3
 * @value 3
 * @option BG4
 * @value 4
 * @default 1
 * @text Background
 * @desc Background image for message.
 *
 * @arg icon
 * @text Icon index
 * @type icon
 * @default 0
 * @desc Icon index for this message. (0 = No icon)
 *
 * @arg fontColor
 * @text Font color
 * @type text
 * @default #ffffffff
 * @desc Font color as HEX RGB(A).
 *
 * @arg outlineColor
 * @text Outline color
 * @type text
 * @default #00000000
 * @desc Outline color as HEX RGB(A).
 *
 * @arg se
 * @text SE
 * @type struct<SoundData>
 * @default
 * @desc Sound effect when message is shown.
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Labels
 * @type boolean
 * @desc Use labels?
 * @default true
 *
 * @param Font face
 * @parent Labels
 * @type text
 * @desc Font face which will be used in labels.
 * @default rmmz-mainfont
 *
 * @param Font size
 * @parent Labels
 * @desc Font size in pixels, which will be used in labels.
 * @type number
 * @max 48
 * @min 6
 * @default 16
 *
 * @param Font color
 * @parent Labels
 * @type text
 * @desc Font color (in hex format), which will be used in labels.
 * @default #ffffff
 *
 * @param Outline size
 * @parent Labels
 * @type number
 * @desc Outline size in pixels, which will be used in labels.
 * @max 16
 * @min 0
 * @default 8
 *
 * @param Outline color
 * @parent Labels
 * @type text
 * @desc Outline color (in hex format), which will be used in labels.
 * @default #000000
 *
 * @param Top most layer
 * @parent Labels
 * @type boolean
 * @desc true = Show labels above scenemap (but below RM messages). false = Add labels to scenemap
 * @default true
 *
 * @param Indicators
 * @type boolean
 * @desc Parameters for indicators
 * @default true
 * 
 * @param Font face (i)
 * @parent Indicators
 * @type text
 * @desc Font face which will be used in indicators.
 * @default rmmz-mainfont
 *
 * @param Font size (i)
 * @parent Indicators
 * @desc Font size in pixels, which will be used in indicators.
 * @type number
 * @max 48
 * @min 6
 * @default 24
 * 
 * @param Outline size (i)
 * @parent Indicators
 * @type number
 * @desc Outline size in pixels, which will be used in labels.
 * @max 16
 * @min 0
 * @default 4
 *
 * @param X offset (i)
 * @parent Indicators
 * @desc Adjust text X offset of all indicators.
 * @type number
 * @max 99
 * @min -99
 * @default 0
 * 
 * @param Y offset (i)
 * @parent Indicators
 * @desc Adjust text Y offset of all indicators.
 * @type number
 * @max 99
 * @min -99
 * @default 0
 * 
 * @param Radius
 * @parent Indicators
 * @desc Radius in tiles when indicators are shown.
 * @type number
 * @max 48
 * @min 1
 * @default 1
 *
 * @param Require facing
 * @parent Indicators
 * @desc Before indicator is shown player must face event.
 * @type boolean
 * @default true
 * 
 * @param Templates
 * @parent Indicators
 * @desc Indicator templates.
 * @type struct<IndicatorData>[]
 * @default ["{\"Id\":\"1\",\"Text\":\"Open\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"143\"}","{\"Id\":\"2\",\"Text\":\"Push\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"143\"}","{\"Id\":\"3\",\"Text\":\"Pull\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"143\"}","{\"Id\":\"4\",\"Text\":\"Pull/Push\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"143\"}","{\"Id\":\"5\",\"Text\":\"Lift\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"143\"}","{\"Id\":\"6\",\"Text\":\"Talk\",\"BG\":\"1\",\"FontColor\":\"#ffffff\",\"OutlineColor\":\"#000000\",\"Icon\":\"4\"}"]
 *
 * @param Message defaults
 * @type boolean
 * @desc Message default values
 * @default true
 *
 * @param Minor message
 * @parent Message defaults
 * @type struct<MinorData>
 * @desc Default message struct for minor messages.
 * @default {"OffsetY":"-24","FontSize":"24","FontName":"rmmz-mainfont","OutlineWidth":"2","Padding":"4","FadeTime":"120"}
 *
 * @param Major1 message
 * @parent Message defaults
 * @type struct<MajorData>
 * @desc Default message struct for major 1 messages.
 * @default {"VerticalAlign":"1","OffsetY":"-96","FontSize":"32","FontName":"rmmz-mainfont","OutlineWidth":"4","FadeTime":"240"}
 *
 * @param Major2 message
 * @parent Message defaults
 * @type struct<MajorData>
 * @desc Default message struct for major 2 messages.
 * @default {"VerticalAlign":"1","OffsetY":"-96","FontSize":"32","FontName":"rmmz-mainfont","OutlineWidth":"4","FadeTime":"240"}
 *
 * @param Major3 message
 * @parent Message defaults
 * @type struct<MajorData>
 * @desc Default message struct for major 3 messages.
 * @default {"VerticalAlign":"2","OffsetY":"-24","FontSize":"32","FontName":"rmmz-mainfont","OutlineWidth":"4","FadeTime":"320"}
 *
 * @param Major4 message
 * @parent Message defaults
 * @type struct<MajorData>
 * @desc Default message struct for major 4 messages.
 * @default {"VerticalAlign":"0","OffsetY":"24","FontSize":"32","FontName":"rmmz-mainfont","OutlineWidth":"4","FadeTime":"320"}
 *
 * @param Use automated messages
 * @type boolean
 * @desc Use automated messages
 * @default true
 *
 * @param Gain item
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain items.
 * @default {"MessageType":"0","Message":"{$name} +{$value}","ForeColor":"#f0f0ff","OutlineColor":"#000080","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"-1","BG":"1","BoundTo":"2"}
 *
 * @param Lose item
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when lose items.
 * @default {"MessageType":"0","Message":"{$name} {$value}","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"-1","BG":"2","BoundTo":"2"}
 *
 * @param Gain gold
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain gold.
 * @default {"MessageType":"0","Message":"Gold: +{$value}","ForeColor":"#f0f000","OutlineColor":"#404000","SE":"{\"SoundName\":\"Coin\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"313","BG":"1","BoundTo":"2"}
 *
 * @param Lose gold
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when lose gold.
 * @default {"MessageType":"0","Message":"Gold: {$value}","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Coin\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"313","BG":"2","BoundTo":"2"}
 *
 * @param Gain HP
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain HP.
 * @default {"MessageType":"0","Message":"{$name}: HP +{$value}","ForeColor":"#aaffaa","OutlineColor":"#008000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"162","BG":"1","BoundTo":"2"}
 *
 * @param Lose HP
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when lose HP.
 * @default {"MessageType":"0","Message":"{$name}: HP {$value}","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"162","BG":"2","BoundTo":"2"}
 *
 * @param Gain MP
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain MP.
 * @default {"MessageType":"0","Message":"{$name}: MP +{$value}","ForeColor":"#aaffaa","OutlineColor":"#008000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"165","BG":"1","BoundTo":"2"}
 *
 * @param Lose MP
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when lose MP.
 * @default {"MessageType":"0","Message":"{$name}: MP {$value}","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"165","BG":"2","BoundTo":"2"}
 *
 * @param Gain Exp
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain experience.
 * @default {"MessageType":"0","Message":"{$name}: +{$value} xp","ForeColor":"#ffeeaa","OutlineColor":"#806000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"160","BG":"1","BoundTo":"2"}
 *
 * @param Lose Exp
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when lose experience.
 * @default {"MessageType":"0","Message":"{$name}: {$value} xp","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Cursor1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"160","BG":"2","BoundTo":"2"}
 *
 * @param Level up
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when gain level up.
 * @default {"MessageType":"1","Message":"Level up: {$name} (lv{$value})","ForeColor":"#ffffff","OutlineColor":"#000000","SE":"{\"SoundName\":\"Applause1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"73","BG":"1","BoundTo":"0"}
 *
 * @param Level down
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when level down.
 * @default {"MessageType":"2","Message":"Level down: {$name} (lv{$value})","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Bell1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"74","BG":"2","BoundTo":"0"}
 *
 * @param Gain skill
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when actor gains NEW skill.
 * @default {"MessageType":"1","Message":"{$name} learned {$value}","ForeColor":"#ffffff","OutlineColor":"#000000","SE":"{\"SoundName\":\"Applause1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"73","BG":"1","BoundTo":"0"}
 *
 * @param Lose skill
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when actor loses skill.
 * @default {"MessageType":"2","Message":"{$name} forgot {$value}","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Bell1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"74","BG":"2","BoundTo":"0"}
 * 
 * @param Gain party member
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when NEW party member joins the party!
 * @default {"MessageType":"1","Message":"{$name} has joined!","ForeColor":"#ffffff","OutlineColor":"#000000","SE":"{\"SoundName\":\"Applause1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"73","BG":"1","BoundTo":"0"}
 *
 * @param Lose party member
 * @parent Use automated messages
 * @type struct<MessageData>
 * @desc Message struct when party member has left the party!
 * @default {"MessageType":"2","Message":"{$name} has left!","ForeColor":"#ffaaaa","OutlineColor":"#800000","SE":"{\"SoundName\":\"Bell1\",\"SoundVolume\":\"90\",\"SoundPitch\":\"100\",\"SoundPan\":\"0\"}","Icon":"74","BG":"2","BoundTo":"0"}
 *
 * @param Menu on major messages
 * @type boolean
 * @desc Allow menu while any major messages are shown? If menu is called (and it's enabled) it will clear any major messages!
 * @default false
 *
 * @param Show indicator options
 * @type boolean
 * @desc Show options for: Show/hide labels, indicators and/or notifications!
 * @default true
 *
 * @param Auto disable in battle
 * @type boolean
 * @desc Auto disable indicators while in battle?
 * @default true
 *
 * @param Auto disable in menu
 * @type boolean
 * @desc Auto disable indicators while in menu?
 * @default true
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * OcRam_Labels has evolved to OcRam_Indicators and swallowed also 
 * OcRam_Messages (as known in MV) in the process!
 *
 * Event label is often used to indicate name, purpose or role of the event? 
 * Also loot notifications indicates that player got something?
 * Quest notifications / New chapter messages indicates player progress etc...
 * And not to mention tooltips that indicates what will happen on interact.
 *
 * All of these features together gives you OcRam_Indicators!
 *
 * This plugin also provides some extra options for player to choose if 
 * labels, messages and/or indicators are shown! But you as game developer
 * can of course can hide these options with plugin parameter!
 *
 * There are 3 types of indicators:
 *      - Labels (show label above event also may have proximity sensor)
 *          - Used to make finding specific places and characters easier
 *          - Only on gamemap & plain text (no icons)
 *          - NOT dependent on event page - Hidden only when event is...
 *      - Messages (temporary fading messages)
 *          - Used for loot messages, new chapter messages etc...
 *          - May have icons
 *          - Can be used via JS: $gameScreen.showMessage(...)
 *            or event.showMessage(...) // for minor messages only!
 *          - Messages are divided into 2 sub types 
 *              - Minor (text - simoultanous and fading, only on gamemap)
 *              - Major (fullscreen, queued (1 at the time) + blocks menu)
 *      - Action tooltips (indicates action on interact)
 *          - Show indicator when near this event - Use plugin parameters 
 *            to change "near" behaviour (radius, must face event etc...)
 *          - Indicators are event PAGE specific!
 *          - Usable only via templates (check plugin parameters)
 *          - Only on gamemap & may have icons
 *
 * Indicator & message backgrounds loaded from .\img\ocram -folder!
 * IN 'MAJOR' MESSAGES - WIDTH SHOULD BE SAME AS YOUR GAME RESOLUTION WIDTH!
 * TIP: Transparent pixels can be used to adjust BG image!
 *
 * Action indicator examples: Speak/Examine/Lift/Repair/Hack/Lockpick/
 * Push'n'Pull/Open/Close/Shop/Exit/etc...
 *
 * ----------------------------------------------------------------------------
 * Notetags
 * ============================================================================
 * <label:2:My Event>   is a event notetag which shows label with in 2 tiles
 * <label:My event>     is a event notetag which shows label
 *
 * ----------------------------------------------------------------------------
 * Event COMMENTS:
 * ----------------------------------------------------------------------------
 * <indicator:1>        Create action indicator with template id 1
 *
 * ----------------------------------------------------------------------------
 * Plugin Commands
 * ============================================================================
 * SE_OBJ (please note double quotes and numbers without them):
 * {"SoundName":"Cursor1","SoundVolume":90,"SoundPitch":100,"SoundPan":0}
 * 
 * Indicator types:
 *      0 = Labels
 *      1 = Notifications (minor / major messages)
 *      2 = Action indicators
 *      3 = ALL
 *      
 * Game object ids:
 *      -102 = Boat
 *      -101 = Ship
 *      -100 = Airship
 *      -2 to -99 = Followers
 *      -1 = Player (and followers)
 *      > 0 = Event id
 * 
 * MV example: OcRam_Indicators/show 3
 * show             Labels/Minor/Major/All messages/Tooltips/ALL indicators
 * >> indicatorType Indicator type to show? See "Indicator types"
 * 
 * MV example: OcRam_Indicators/hide 3
 * hide             Labels/Minor/Major/All messages/Tooltips/ALL indicators
 * >> indicatorType Indicator type to show? See "Indicator types"
 * 
 * MV example: OcRam_Indicators/minorMessage 
 * "Hello world!" 2 3 #ffffffff #ffffffff SE_OBJ -1
 * minorMessage     Show fading minor message
 * >> message       Message shown to player.
 * >> BG            BG image. 0 = No BG, 1 to 4 = ./img/ocram/minorx.png
 * >> icon          Icon index for this message. (0 = No icon)
 * >> fontColor     Font color as HEX RGB(A).
 * >> outlineColor  Outline color as HEX RGB(A).
 * >> se            See "SE object"
 * >> gameObjectId  See "Game object ids"
 * 
 * MV example: OcRam_Indicators/majorMessage
 * "Hello world!" 2 3 #ffffffff #ffffffff SE_OBJ
 * majorMessage     Show fading major message
 * >> message       Message shown to player.
 * >> BG            BG image. 0 = No BG, 1 to 4 = ./img/ocram/majorx.png
 * >> icon          Icon index for this message. (0 = No icon)
 * >> fontColor     Font color as HEX RGB(A).
 * >> outlineColor  Outline color as HEX RGB(A).
 * >> se            See "SE object"
 * 
 * ----------------------------------------------------------------------------
 * JS calls
 * ============================================================================
 * OcRam.Indicators.clearAllLabels(); // Clear all labels NOW
 * OcRam.Indicators.clearAllIndicators(); // Clear all indicators NOW
 * Game_CharacterBase.addIndicator(text, icon, bg_index, fcolor, bcolor);
 * Game_CharacterBase.addLabel(text, radius);
 * Game_CharacterBase.removeLabel();
 * Game_CharacterBase.removeIndicator();
 *
 * // Totally custom JS message
 * let type = 1; // types: 0 = Minor, 1 = Major bg1, 2 = Major bg2...
 * let se = { name: 'Cursor1', volume: 90, pitch: 100, pan: 0, pos: 0 };
 * let icon = 0; // System icon index / 0 = not in use
 * let bg_index = 1; // Background index 0 to 4, 0 = No bg
 * let outline_width = 2; // Text outline width in pixels
 * let fade = 180; // fade time in frames
 * let padding = 0; // padding in pixels - major has NO EFFECT
 * let vert_align = "center"; // Align bottom/center/top - minor has NO EFFECT
 * $gameScreen.showMessage(
 *     "Hello world!", type, se, "#ffffff",
 *     "#ff0000", icon, "Chiller", 64, bg_index,
 *     outline_width, fade, padding, vert_align
 * );
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2021/04/02 v1.00 - Initial release
 * 2021/06/04 v1.01 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    HIDE Action indicator if event == transparent
 *                    Compatibilty patch for OcRam_Local_Coop!
 * 2021/10/21 v1.02 - Indicators are now compatible with copy events feature
 *                    Hide/Show indicator plugin commands now actually works...
 *                    Alignment fixes with smaller fonts
 *                    Custom fonts defined in parameters will now be embedded!
 *                    (doesn't require font installation to system anymore)
 * 2021/12/01 v1.03 - More font alignment issues fixed. NEW plugin parameters 
 *                    indicator text "Y offset" & "X offset"
 *                    Better RETRO support with MV (rmmz-font vs. GameFont)
 * 2022/04/22 v1.04 - Fixed bug when event was not found for the indicator...
 *                    New plugin parameters: Disable all indicators while 
 *                    player is in menu- or battle scene? (Credits to Raggon)
 * 2022/07/10 v1.05 - "Auto disable in menu" works again (not sure if 1.5.0
 *                    broke this, but it's now fixed)
 * 2022/11/11 v1.06 - Fixed bug when spawned event bitmap was not yet loaded
 *                    and/or if event update was called before that
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * - No overrides -
 *
 * @requiredAssets
 * img/ocram/major_message_bg1
 * @requiredAssets
 * img/ocram/major_message_bg2
 * @requiredAssets
 * img/ocram/major_message_bg3
 * @requiredAssets
 * img/ocram/major_message_bg4
 * @requiredAssets
 * img/ocram/indicator_bg1
 * @requiredAssets
 * img/ocram/indicator_bg2
 * @requiredAssets
 * img/ocram/indicator_bg3
 * @requiredAssets
 * img/ocram/indicator_bg4
 * @requiredAssets
 * img/ocram/minor_bg1
 * @requiredAssets
 * img/ocram/minor_bg2
 * @requiredAssets
 * img/ocram/minor_bg3
 * @requiredAssets
 * img/ocram/minor_bg4
 */
/*~struct~MessageData:
 *
 * @param MessageType
 * @type select
 * @option [Not in use]
 * @value -1
 * @option Minor
 * @value 0
 * @option Major1
 * @value 1
 * @option Major2
 * @value 2
 * @option Major3
 * @value 3
 * @option Major4
 * @value 4
 * @desc Message type.
 * @default 0
 *
 * @param Message
 * @type text
 * @desc Message shown to player. Use {$value}, {$name} for actual values to replace.
 * @default No caption: {$value} {$name}
 *
 * @param ForeColor
 * @type text
 * @desc Font fill color.
 * @default #ffffff
 *
 * @param OutlineColor
 * @type text
 * @desc Font outline color.
 * @default #000000
 *
 * @param SE
 * @type struct<SoundData>
 * @desc SE to play when this message is shown
 * @default {"SoundName":"Cursor1","SoundVolume":"90","SoundPitch":"100","SoundPan":"0"}
 *
 * @param Icon
 * @type number
 * @min -1
 * @desc -1 automatic, 0 = Not in use, greater than 0 = icon index.
 * @default -1
 *
 * @param BG
 * @type number
 * @min 0
 * @max 4
 * @desc 0 = Not in use, 1 - 4 = background index.
 * @default 1
 * 
 * @param BoundTo
 * @type select
 * @option Middle of the Screen
 * @value 0
 * @option Player
 * @value 1
 * @option Event
 * @value 2
 * @desc To where this message is bound to? (NOTE: Major messages will ignore this parameter)
 * @default 2
 * 
 */
/*~struct~SoundData:
 *
 * @param SoundName
 * @type file
 * @dir audio/se
 * @desc SE to play when this message is shown
 * @default Cursor1
 *
 * @param SoundVolume
 * @type number
 * @desc SE volume
 * @default 90
 *
 * @param SoundPitch
 * @type number
 * @desc SE pitch
 * @default 100
 *
 * @param SoundPan
 * @type number
 * @desc SE pan
 * @default 0
 *
 */
/*~struct~MajorData:
 *
 * @param VerticalAlign
 * @type select
 * @option Top
 * @value 0
 * @option Center
 * @value 1
 * @option Bottom
 * @value 2
 * @desc Align this message to.
 * @default 1
 *
 * @param OffsetY
 * @type text
 * @desc Y offset for this message in pixels.
 * @default -96
 *
 * @param FontSize
 * @type number
 * @desc Font size for this message
 * @default 32
 *
 * @param FontName
 * @type text
 * @desc Font face/family name for this message.
 * @default rmmz-mainfont
 *
 * @param OutlineWidth
 * @type number
 * @desc Font outline width for this message.
 * @default 6
 *
 * @param FadeTime
 * @type number
 * @desc Fade time for this message.
 * @default 240
 *
 */
/*~struct~MinorData:
 *
 * @param OffsetY
 * @min -9999
 * @max 9999
 * @type number
 * @desc Y offset for minor message in pixels.
 * @default -24
 *
 * @param FontSize
 * @type number
 * @desc Font size of minor message
 * @default 24
 *
 * @param FontName
 * @type text
 * @desc Font face/family name
 * @default rmmz-mainfont
 *
 * @param OutlineWidth
 * @type number
 * @desc Font outline width.
 * @default 2
 * 
 * @param Padding
 * @type number
 * @desc Font outline width.
 * @default 4
 *
 * @param FadeTime
 * @type number
 * @desc Fade time for minor message.
 * @default 120
 *
 */
/*~struct~IndicatorData:
 *
 * @param Id
 * @type number
 * @desc UNIQUE indicator id. Referred to this in event comments!
 * @default 1
 * 
 * @param Text
 * @type text
 * @desc Indicator text
 * @default Action tooltip
 *
 * @param BG
 * @type select
 * @option BG1
 * @value 1
 * @option BG2
 * @value 2
 * @option BG3
 * @value 3
 * @option BG4
 * @value 4
 * @desc Background.
 * @default 1
 *
 * @param FontColor
 * @type text
 * @desc Font color of indicator
 * @default #ffffff
 *
 * @param OutlineColor
 * @type text
 * @desc Font outline color of indicator
 * @default #000000
 *
 * @param Icon
 * @type number
 * @desc Icon index
 * @default 4
 *
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Regulators for message structs
    // ==============================================================================
    let _messageStructs = []; let _messageStruct = null;

    const getSystemFont = () => {
        return OcRam.isMZ() ? "rmmz-mainfont" : "GameFont";
    };

    const isSystemFont = fn => {
        return fn == "rmmz-mainfont" || fn == "GameFont";
    };

    const regulateValue = (v, min, max) => { // validate min - max
        return (v < min) ? min : (v > max) ? max : v;
    };

    const regulateMinorStruct = (msg_struct) => {
        if (!msg_struct) msg_struct = {};
        msg_struct.OffsetY = (msg_struct.OffsetY === undefined || msg_struct.OffsetY == null) ? 0 : msg_struct.OffsetY | 0;
        msg_struct.FontSize = msg_struct.FontSize | 0 || 24;
        msg_struct.FontSize = regulateValue(msg_struct.FontSize, 6, 256);
        msg_struct.FontName = msg_struct.FontName || getSystemFont();
        msg_struct.OutlineWidth = msg_struct.OutlineWidth | 0 || 2;
        msg_struct.OutlineWidth = regulateValue(msg_struct.OutlineWidth, 0, 32);
        msg_struct.Padding = msg_struct.Padding | 0 || 4;
        msg_struct.Padding = regulateValue(msg_struct.Padding, 0, 32);
        msg_struct.FadeTime = msg_struct.FadeTime || 120;
        msg_struct.FadeTime = regulateValue(msg_struct.FadeTime, 16, 1000);
        _messageStructs.push(msg_struct);
    };

    const regulateMajorStruct = (msg_struct) => {

        if (!msg_struct) msg_struct = {};

        msg_struct.VerticalAlign = msg_struct.VerticalAlign || 1;
        msg_struct.VerticalAlign = regulateValue(msg_struct.VerticalAlign, 0, 2);
        msg_struct.OffsetY = (msg_struct.OffsetY === undefined || msg_struct.OffsetY == null) ? -96 : msg_struct.OffsetY | 0;
        msg_struct.FontSize = msg_struct.FontSize | 0 || 48;
        msg_struct.FontSize = regulateValue(msg_struct.FontSize, 6, 256);
        msg_struct.FontName = msg_struct.FontName || getSystemFont();
        msg_struct.OutlineWidth = msg_struct.OutlineWidth | 0 || 6;
        msg_struct.OutlineWidth = regulateValue(msg_struct.OutlineWidth, 0, 32);
        msg_struct.FadeTime = msg_struct.FadeTime || 240;
        msg_struct.FadeTime = regulateValue(msg_struct.FadeTime, 16, 1000);

        msg_struct.OffsetY = msg_struct.OffsetY | 0;
        msg_struct.FadeTime = msg_struct.FadeTime | 0;
        msg_struct.FontSize = msg_struct.FontSize | 0;
        msg_struct.VerticalAlign = msg_struct.VerticalAlign | 0;
        msg_struct.OutlineWidth = msg_struct.OutlineWidth | 0;

        _messageStructs.push(msg_struct);
    };

    const regulateMessageStruct = msg_struct => {
        if (!msg_struct) msg_struct = {};
        msg_struct.MessageType = msg_struct.MessageType || 0;
        msg_struct.MessageType = regulateValue(msg_struct.MessageType, -1, 4);
        msg_struct.Message = msg_struct.Message || "No caption: {$name} {$value}";
        msg_struct.ForeColor = msg_struct.ForeColor || '#ffffff';
        msg_struct.OutlineColor = msg_struct.OutlineColor || '#000000';
        msg_struct.Icon = msg_struct.Icon == undefined ? -1 : msg_struct.Icon = msg_struct.Icon | 0;
        msg_struct.SE = msg_struct.SE || { name: 'Cursor1', volume: 90, pitch: 0, pan: 0, pos: 0 };
    };

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================

    const _this = this; // Refers to this plugin - To be used in subscopes...

    // Shared
    const _mostTop = OcRam.getBoolean(this.parameters['Top most layer']);

    // Labels
    let _useLabels = OcRam.getBoolean(this.parameters['Labels']);
    const _fontFace = (this.parameters['Font face'] + '') || getSystemFont();
    const _fontSize = Number(this.parameters['Font size']).clamp(6, 48);
    const _fontColor = (this.parameters['Font color'] + '') || '#ffffff';
    const _outlineSize = Number(this.parameters['Outline size']).clamp(0, 16);
    const _outlineColor = (this.parameters['Outline color'] + '') || '#000000';
    const _labelFont = _fontSize + "px " + _fontFace; const _labels = [];
    const _allowMenuOnMajor = OcRam.getBoolean(this.parameters['Menu on major messages']);

    let _useIndicators = OcRam.getBoolean(this.parameters['Indicators']);
    const _showIndicatorOptions = OcRam.getBoolean(this.parameters['Show indicator options']);
    const _fontFaceI = (this.parameters['Font face (i)'] + '') || getSystemFont();
    const _fontSizeI = Number(this.parameters['Font size (i)']).clamp(6, 48);
    const _xOffsetI = Number(this.parameters['X offset (i)'] || 0);
    const _yOffsetI = Number(this.parameters['Y offset (i)'] || 0);
    const _outlineSizeI = Number(this.parameters['Outline size (i)']).clamp(0, 16);
    const _indicatorRadius = Number(this.parameters['Radius']).clamp(1, 48);
    const _indicators = []; //const _indicatorFont = _fontSizeI + "px " + _fontFaceI;
    const _indicatorTemplates = OcRam.getJSONArray(this.parameters['Templates']);
    const _requireFacing = OcRam.getBoolean(this.parameters['Require facing']);

    const _disableWhileInMenu = OcRam.getBoolean(this.parameters['Auto disable in menu']);
    const _disableWhileInBattle = OcRam.getBoolean(this.parameters['Auto disable in battle']);
    let _autoDisable = false;

    _indicatorTemplates.forEach(i => {
        i.Id = i.Id | 0; i.Icon = i.Icon | 0; i.BG = i.BG | 0;
    });

    // Auto-Messages
    let _useNotifications = OcRam.getBoolean(this.parameters['Use automated messages']);;
    const _gainItem = OcRam.getJSON(this.parameters['Gain item']); regulateMessageStruct(_gainItem);
    const _loseItem = OcRam.getJSON(this.parameters['Lose item']); regulateMessageStruct(_loseItem);
    const _gainGold = OcRam.getJSON(this.parameters['Gain gold']); regulateMessageStruct(_gainGold);
    const _loseGold = OcRam.getJSON(this.parameters['Lose gold']); regulateMessageStruct(_loseGold);
    const _gainHP = OcRam.getJSON(this.parameters['Gain HP']); regulateMessageStruct(_gainHP);
    const _loseHP = OcRam.getJSON(this.parameters['Lose HP']); regulateMessageStruct(_loseHP);
    const _gainMP = OcRam.getJSON(this.parameters['Gain MP']); regulateMessageStruct(_gainMP);
    const _loseMP = OcRam.getJSON(this.parameters['Lose MP']); regulateMessageStruct(_loseMP);
    const _gainExp = OcRam.getJSON(this.parameters['Gain Exp']); regulateMessageStruct(_gainExp);
    const _loseExp = OcRam.getJSON(this.parameters['Lose Exp']); regulateMessageStruct(_loseExp);
    const _gainLevel = OcRam.getJSON(this.parameters['Level up']); regulateMessageStruct(_gainLevel);
    const _loseLevel = OcRam.getJSON(this.parameters['Level down']); regulateMessageStruct(_loseLevel);
    let _gainSkill = OcRam.getJSON(this.parameters['Gain skill']); if (!_gainSkill) _gainSkill = {}; regulateMessageStruct(_gainSkill);
    let _loseSkill = OcRam.getJSON(this.parameters['Lose skill']); if (!_loseSkill) _loseSkill = {}; regulateMessageStruct(_loseSkill);
    let _gainPartyMember = OcRam.getJSON(this.parameters['Gain party member']); if (!_gainPartyMember) _gainPartyMember = {}; regulateMessageStruct(_gainPartyMember);
    let _losePartyMember = OcRam.getJSON(this.parameters['Lose party member']); if (!_losePartyMember) _losePartyMember = {}; regulateMessageStruct(_losePartyMember);

    // Get default values for messages!
    _messageStruct = OcRam.getJSON(this.parameters['Minor message']); regulateMinorStruct(_messageStruct);
    _messageStruct = OcRam.getJSON(this.parameters['Major1 message']); regulateMajorStruct(_messageStruct);
    _messageStruct = OcRam.getJSON(this.parameters['Major2 message']); regulateMajorStruct(_messageStruct);
    _messageStruct = OcRam.getJSON(this.parameters['Major3 message']); regulateMajorStruct(_messageStruct);
    _messageStruct = OcRam.getJSON(this.parameters['Major4 message']); regulateMajorStruct(_messageStruct);
    const _msgBG = [ // Pre-load message backgrounds
        ImageManager.loadOcRamBitmap('major_message_bg1', 0),
        ImageManager.loadOcRamBitmap('major_message_bg2', 0),
        ImageManager.loadOcRamBitmap('major_message_bg3', 0),
        ImageManager.loadOcRamBitmap('major_message_bg4', 0)
    ]; const _minorBG = [ // Pre-load message backgrounds
        ImageManager.loadOcRamBitmap('minor_bg1', 0),
        ImageManager.loadOcRamBitmap('minor_bg2', 0),
        ImageManager.loadOcRamBitmap('minor_bg3', 0),
        ImageManager.loadOcRamBitmap('minor_bg4', 0)
    ]; const _indicatorBG = [ // Pre-load message backgrounds
        ImageManager.loadOcRamBitmap('indicator_bg1', 0),
        ImageManager.loadOcRamBitmap('indicator_bg2', 0),
        ImageManager.loadOcRamBitmap('indicator_bg3', 0),
        ImageManager.loadOcRamBitmap('indicator_bg4', 0)
    ]; let _minorMessages = 0; let _minorStack = 0; let _majorMessages = 0;
    let _forcedMsgToEventId = 0; const _messageTimeouts = [];
    _this.debug("DEFAULT MESSAGE VALUES:", _messageStructs);

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ============================================================================== 

    // Parse SE object - so it can be passed to message class
    const parseSE = se_struct => {
        const raw = OcRam.getJSON(se_struct); if (!raw) return {};
        const se = { name: raw.SoundName, volume: raw.SoundVolume, pitch: raw.SoundPitch, pan: raw.SoundPan, pos: 0 };
        return se;
    };

    // Wrapper for automated messages!
    const showAutoMsg = (msg, type, se, fc, oc, ico, bg, oid) => {
        if (type < 0 || type > 4 || !_useNotifications) return; // No message are shown
        _this.debug("showAutoMsg", msg, type, se, fc, oc, ico, bg, oid);
        showTextOnScreen(msg, type, se, fc, oc, ico, null, null, bg, null, null, null, null, oid);
    };

    // Get object for automated message!
    const getObjId = bound_to => {
        if (!$gameMap) return 0; let ret = 0;
        switch (bound_to | 0) {
            case 0: _this.debug(bound_to, "null"); break;
            case 1: ret = OcRam.getGameObjectId(OcRam.playerCharacter()); _this.debug(bound_to, OcRam.playerCharacter()); break;
            case 2: ret = $gameMap._interpreter.event() ? $gameMap._interpreter.event()._eventId : 0; _this.debug(bound_to, $gameMap._interpreter.event()); break;
        } return ret | 0;
    };

    // Internal show message interface
    const showTextOnScreen = (text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding, align, event_id) => {
        if (type < 0 || type > 4 || !_useNotifications || _autoDisable) return; // No message are shown
        if (type > 0) {
            if (_majorMessages < 1) {
                if (!se) se = {};
                if (!text_color) text_color = "#ffffff";
                if (!b_color) b_color = "#000000";
                if (!font) font = _messageStructs[type].FontName;
                if (!font_size) font_size = _messageStructs[type].FontSize;
                if (border === undefined || border == null) border = _messageStructs[type].OutlineWidth | 0;
                if (!fade) fade = _messageStructs[type].FadeTime | 0;
                if (align === undefined || align == null) align = _messageStructs[type].VerticalAlign | 0;
                if (bg_index === null || isNaN(bg_index)) bg_index = type;
                bg_index = Number(bg_index);
                new OcRam_Major_Message(text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, align); // Self destructing class? OMG!?
            } else { // Waiting for previous major(s) to end...
                setTimeout(() => {
                    showTextOnScreen(text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding, align, event_id);
                }, 200);
            }
        } else {
            if (OcRam.scene().isMap() && OcRam.scene().children && OcRam.scene().children.length) {
                if (!se) se = {};
                if (!text_color) text_color = "#ffffff";
                if (!b_color) b_color = "#000000";
                if (!font) font = _messageStructs[0].FontName;
                if (!font_size) font_size = _messageStructs[0].FontSize;
                if (border === undefined || border == null) border = _messageStructs[0].OutlineWidth;
                if (!fade) fade = _messageStructs[0].FadeTime;
                if (!padding) padding = _messageStructs[0].Padding;
                if (isNaN(bg_index)) bg_index = 1;
                bg_index = Number(bg_index);
                _forcedMsgToEventId = event_id || 0;
                new OcRam_Minor_Message(text_to_show, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding); // Self destructing class? OMG!?
            } else {
                setTimeout(() => {
                    showTextOnScreen(text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding, align, event_id);
                }, 200);
            }
        }
    };

    const processIndicatorComments = ev => {
        ev.removeIndicator();
        let cmts = ev.getComments();
        if (cmts && cmts.length > 0) {
            cmts.forEach(c => {
                if (("" + c.parameters[0]).left(11) == "<indicator:") {
                    const id = Number(("" + c.parameters[0]).replace("<indicator:", "").replace(">", ""));
                    const indicator = getIndicator(id);
                    if (indicator) {
                        requestAnimationFrame(() => {
                            _this.debug("Indicator attached!", ev, indicator);
                            ev.addIndicator(indicator.Text, indicator.Icon, indicator.BG, indicator.FontColor, indicator.OutlineColor);
                        });
                    } else {
                        console.warn("Indicator with id " + id + " not found!", ev);
                    }
                }
            });
        }
    };

    const getIndicator = id => {
        return _indicatorTemplates.find(i => i.Id == id);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.clearAllLabels = () => {
        _labels.forEach(label => {
            label.clear(); this.clearAllLabels();
        });
    };

    this.clearAllIndicators = () => {
        _indicators.forEach(i => {
            i.clear(); this.clearAllIndicators();
        });
    };

    this.showAllLabels = () => {
        if (!$gameMap) return;
        $gameMap.events().forEach(game_ev => {
            const ev = game_ev._eventBase || game_ev.event();
            const meta_data = game_ev._eventBase ? OcRam.extractMetadata(ev.note) : ev.meta;
            if (ev) {
                if (meta_data.label) {
                    if (meta_data.label.indexOf(':') < 0) {
                        game_ev.addLabel(meta_data.label, 0);
                    } else {
                        const radius = (meta_data.label + ':').split(':')[0];
                        const label_tag = meta_data.label.right((meta_data.label).length - (radius + ':').length);
                        game_ev.addLabel(label_tag, radius);
                    }
                }
            }
        });
    };

    this.showAllIndicators = () => {
        if (!$gameMap) return;
        $gameMap.events().forEach(ev => {
            if (ev) processIndicatorComments(ev);
        });
    };

    // For debugging purposes...
    this.getMessageDefaults = () => _messageStructs;
    this.minorMessageCount = () => _minorMessages;
    this.majorMessageCount = () => _majorMessages;

    // ------------------------------------------------------------------------------
    // Plugin Classes - Class_Name
    // ==============================================================================
    class OcRam_Label extends Sprite {

        constructor(char_base, title, radius, color) {

            super();

            let base = OcRam.scene();

            if (!_mostTop) {
                if (base) base = base._spriteset;
                if (base) base = base._baseSprite;
            } if (!base) return;
            
            this._characterBase = char_base;

            if (this._characterBase._label) {
                base.removeChild(this._characterBase._label);
                _labels.remove(this._characterBase._label);
            }

            if (!_mostTop) {
                base.addChild(this);
            } else {
                base.addChildAt(this, 1);
            }

            this._characterBase._label = this;
            this._characterBase.updateLabel = () => {
                this.update();
            };

            const cs = OcRam.getSpriteByEventId(
                this._characterBase._eventId
            ); if (!cs) { this.clear(); return; }

            this._charHeight = cs.bitmap.height * 0.125;

            this._width = (title + '').width(_labelFont) + _outlineSize;
            this._height = _fontSize + _outlineSize;
            this._preCalced = [this._width * 0.5, this._charHeight + this._height];
            this.anchor.x = 0;
            this.anchor.y = 0;

            this._labelTitle = title;
            this._labelRadius = radius || 0;

            this.bitmap = new Bitmap(this._width, this._height);

            // Make font
            this.bitmap.fontFace = _fontFace;
            this.bitmap.fontSize = _fontSize;
            this.bitmap.fontItalic = false;
            this.bitmap.fontBold = false;
            this.bitmap.font = this.bitmap._makeFontNameText();

            this.bitmap.textColor = color || _fontColor;
            this.bitmap.outlineColor = _outlineColor;
            this.bitmap.outlineWidth = _outlineSize;
            this.bitmap.clearRect(0, 0, this._width, this._height);
            this.bitmap.drawText(this._labelTitle, 0, _outlineSize * 0.5, this._width, _fontSize, "center");
            this._hidden = false;

            if (this._labelRadius) {
                this.update = () => {
                    if (!this._characterBase._transparent && this._characterBase.isPlayerInRadius(this._labelRadius) && !this._hidden) {
                        this.x = this._characterBase.screenX() - this._preCalced[0];
                        this.y = this._characterBase.screenY() - this._preCalced[1];
                        if (!this.visible) this.visible = true;
                    } else {
                        this.visible = false;
                    }
                };
            } else {
                this.update = () => {
                    if (!this._characterBase._transparent && !this._hidden) {
                        this.x = this._characterBase.screenX() - this._preCalced[0];
                        this.y = this._characterBase.screenY() - this._preCalced[1];
                        if (!this.visible) this.visible = true;
                    } else {
                        if (this.visible) this.visible = false;
                    }
                };
            }

            this.update();

        }

        hide() {
            this._hidden = true;
        }

        show() {
            this._hidden = false;
        }

        update() {
            if (!this._characterBase._transparent && !this._hidden) {
                this.x = this._characterBase.screenX() - this._preCalced[0];
                this.y = this._characterBase.screenY() - this._preCalced[1];
                if (!this.visible) this.visible = true;
            } else {
                if (this.visible) this.visible = false;
            }
        }

        clear() {

            this._characterBase.updateLabel = () => { };

            let base = OcRam.scene();
            if (!_mostTop) {
                if (base) base = base._spriteset;
                if (base) base = base._baseSprite;
            } if (base) base.removeChild(this._characterBase._label);

            _labels.remove(this._characterBase._label);
            this._characterBase._label = undefined;

        }

    }

    /** Indicators */
    class OcRam_Indicator extends Sprite {

        constructor(char_base, title, icon, bg_index, fcolor, bcolor) {

            super(); let base = OcRam.scene(); if (!base) return;

            this._characterBase = char_base;

            if (this._characterBase._indicator) {
                base.removeChild(this._characterBase._indicator);
                _indicators.remove(this._characterBase._indicator);
            }

            base.addChildAt(this, 1); 

            this._characterBase._indicator = this;
            this._characterBase.updateIndicator = () => {
                this.update();
            };

            let timeout = 0; this._preCalced = [0, 0];

            const waitBM = () => {

                const cs = OcRam.getSpriteByEventId(
                    this._characterBase._eventId
                ); if (!cs) { this.clear(); return; } // No sprite at all?

                if (!cs.bitmap) { // Wait for bitmap
                    requestAnimationFrame(() => {
                        if (++timeout > 20) return; waitBM();
                    }); return;
                }

                this._charHeight = cs.bitmap.height * 0.125;
                if (this._charHeight < 2) this._charHeight = OcRam.twh[1];

                const icon_w = ImageManager.iconWidth;
                const padding = 6;

                _this.debug("NEW INDICATOR", char_base, title, icon, bg_index, fcolor, bcolor, cs);

                this._text = title;

                const font = isSystemFont(_fontFaceI) ? getSystemFont() : "ocram-indicator";
                this._width = (this._text + '').width(_fontSizeI + "px " + font) + (padding * 2);
                this._width += icon_w + _xOffsetI + padding * 2;

                this._height = (font + (padding * 2)) | 0;
                if (this._height < ImageManager.iconHeight + (padding * 2)) {
                    this._height = ImageManager.iconHeight + (padding * 2);
                } const text_offset = _fontSizeI * 0.5 + _yOffsetI + 1;

                this._preCalced = [this._width * 0.5, this._charHeight + this._height];
                this.anchor.x = 0;
                this.anchor.y = 0;
                this.bitmap = new Bitmap(this._width, this._height);

                // Make font
                this.bitmap.fontFace = font;
                this.bitmap.fontSize = _fontSizeI;
                this.bitmap.fontItalic = false;
                this.bitmap.fontBold = false;
                this.bitmap.font = this.bitmap._makeFontNameText();

                // Draw text
                this.bitmap.textColor = fcolor;
                this.bitmap.outlineColor = bcolor;
                this.bitmap.outlineWidth = _outlineSizeI;
                this.bitmap.clearRect(0, 0, this._width, this._height);
                const fnt_50 = ((this._text + '').height(this.bitmap.font) + _outlineSizeI * 2 + padding * 2) * 0.5;

                // Background
                if (_indicatorBG) {
                    if (bg_index < 1) bg_index = 1; if (bg_index > 4) bg_index = 4;
                    const tmp_bg = _indicatorBG[bg_index - 1];
                    this.bitmap.blt(tmp_bg, 0, 0, 20, tmp_bg.height, 0, 0, 20, this._height); // Left side
                    this.bitmap.blt(tmp_bg, 20, 0, tmp_bg.width - 40, tmp_bg.height, 20, 0, this._width - 40, this._height); // 'Body'
                    this.bitmap.blt(tmp_bg, tmp_bg.width - 20, 0, 20, tmp_bg.height, this._width - 20, 0, 20, this._height); // Right side
                }

                if (icon) { // Draw icon + text
                    const ico_50 = (this._height * 0.5) - (ImageManager.iconHeight * 0.5); OcRam.drawIcon(this.bitmap, icon, padding, ico_50);
                    this.bitmap.drawText(this._text, icon_w + padding * 1.5 + _xOffsetI, text_offset, this._width - icon_w - (padding * 3), this._height - fnt_50, "center");
                } else { // Draw only text
                    this.bitmap.drawText(this._text, padding * 2 + _xOffsetI, text_offset, this._width - (padding * 5), this._height - fnt_50, "center");
                }

                if (!_requireFacing) {
                    this.update = () => {
                        const pc = this._characterBase.isPlayerInRadius(_indicatorRadius);
                        if (pc && !this._characterBase._transparent && !this._started && pc._higherLevel == this._characterBase._higherLevel) {
                            this.x = this._characterBase.screenX() - this._preCalced[0];
                            this.y = this._characterBase.screenY() - this._preCalced[1];
                            if (!this.visible) {
                                if (this._characterBase._label) this._characterBase._label.hide();
                                this.visible = true;
                            }
                        } else {
                            if (this.visible) {
                                if (this._characterBase._label) this._characterBase._label.show();
                                this.visible = false;
                            }
                        }
                    };
                }

                this.update();

            }; waitBM();

        }

        update() {
            const pc = this._characterBase.isPlayerInRadius(_indicatorRadius);
            if (pc && pc.isFacing(this._characterBase) && !this._characterBase._transparent && !this._started && pc._higherLevel == this._characterBase._higherLevel) {
                this.x = this._characterBase.screenX() - this._preCalced[0];
                this.y = this._characterBase.screenY() - this._preCalced[1];
                if (!this.visible) {
                    if (this._characterBase._label) this._characterBase._label.hide();
                    this.visible = true;
                }
            } else {
                if (this.visible) {
                    if (this._characterBase._label) this._characterBase._label.show();
                    this.visible = false;
                }
            }
        }

        clear() {
            this._characterBase.updateIndicator = () => { };
            let base = OcRam.scene();
            if (base) base.removeChild(this._characterBase._indicator);
            _indicators.remove(this._characterBase._indicator);
            this._characterBase._indicator = undefined;
        }

    }

    /** Minor message */
    class OcRam_Minor_Message extends Sprite {

        constructor(text_to_show, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding) {

            super(); font_size = font_size | 0;

            let base = OcRam.scene(); if (!base) return;
            base.addChildAt(this, base.children.length > 2 ? base.children.length - 2 : base.children.length > 0 ? base.children.length - 1 : 0);

            font_size = font_size | 0; padding = padding | 0; border = border | 0;

            if (!isSystemFont(font)) font = "ocram-minor";

            _this.debug("NEW MINOR", text_to_show, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, padding, _forcedMsgToEventId);

            const icon_w = ImageManager.iconWidth + padding * 2;

            this._text = text_to_show;
            this._width = (this._text + '').width(font_size + "px " + font) + (padding * 3);
            if (icon) this._width += icon_w + 2;
            this._height = (font_size + (padding * 2)) | 0;
            if (this._height < ImageManager.iconHeight + (padding * 2)) {
                this._height = ImageManager.iconHeight + (padding * 2);
            }

            this.anchor.x = 0; this.anchor.y = 0;
            this.bitmap = new Bitmap(this._width, this._height);

            // Make font
            this.bitmap.fontFace = font;
            this.bitmap.fontSize = font_size;
            this.bitmap.fontItalic = false;
            this.bitmap.fontBold = false;
            this.bitmap.font = this.bitmap._makeFontNameText();

            this.bitmap.textColor = text_color;
            this.bitmap.outlineColor = b_color;
            this.bitmap.outlineWidth = border;
            this.bitmap.clearRect(0, 0, this._width, this._height);

            if (bg_index != 0 && _minorBG) {
                if (bg_index < 1) bg_index = 1; if (bg_index > 4) bg_index = 4;
                const tmp_bg = _minorBG[bg_index - 1];
                this.bitmap.blt(tmp_bg, 0, 0, 20, tmp_bg.height, 0, 0, 20, this._height); // Left side
                this.bitmap.blt(tmp_bg, 20, 0, tmp_bg.width - 40, tmp_bg.height, 20, 0, this._width - 40, this._height); // 'Body'
                this.bitmap.blt(tmp_bg, tmp_bg.width - 20, 0, 20, tmp_bg.height, this._width - 20, 0, 20, this._height); // Right side
            }

            const fnt_50 = ((this._text + '').height(font_size + "px " + font) + border * 2 + padding * 2) * 0.5;
            const text_offset = font_size * 0.5 - padding * 0.5 + 1;

            if (icon) { // Draw icon + text
                const ico_50 = (this._height * 0.5) - (ImageManager.iconHeight * 0.5);
                OcRam.drawIcon(this.bitmap, icon, padding, ico_50);
                this.bitmap.drawText(this._text, icon_w + padding - 2, text_offset, this._width - icon_w - (padding * 2), this._height - fnt_50, "center");
            } else { // Draw only text
                this.bitmap.drawText(this._text, padding * 2, text_offset, this._width - (padding * 4), this._height - fnt_50, "center");
            }

            this._timeRemaining = fade; // Wait for xxx frames...
            this._timeToFade = (fade * 0.333) | 0;
            this._faderStep = 255 / this._timeToFade;
            this._width50 = this._width * 0.5;
            this._boundToEvent = null;

            let queue_timeout = 0;

            if (_forcedMsgToEventId) {
                const bound_to_event = OcRam.getGameObject(_forcedMsgToEventId);
                this._boundToEvent = bound_to_event;
                if (bound_to_event) {
                    if (!this._boundToEvent._minorMessages) this._boundToEvent._minorMessages = 0;
                    if (!this._boundToEvent._minorStack) this._boundToEvent._minorStack = 0;
                    this._boundToEvent._minorMessages++; this._MsgIndex = this._boundToEvent._minorMessages;
                    queue_timeout = 500 * (this._boundToEvent._minorMessages - 1);
                    this._baseY = (this._boundToEvent.screenY() - this._height) + _messageStructs[0].OffsetY;
                    this._baseX = (this._boundToEvent.screenX() - this._width50);
                } else { // We have no player nor event wtf?!
                    console.warn("NEW_MINOR_MESSAGE (and minor messages should be bound to event): No event NOR player is found?!", this);
                    this._baseY = ((Graphics.height * 0.5) - (this._height * 0.5) + _messageStructs[0].OffsetY);
                    this._baseX = (Graphics.width * 0.5) - (this._width * 0.5);
                }
            } else {
                queue_timeout = 500 * (++_minorMessages - 1);
                this._baseY = ((Graphics.height * 0.5) - (this._height * 0.5) + _messageStructs[0].OffsetY);
                this._baseX = (Graphics.width * 0.5) - (this._width * 0.5);
            }

            this.x = this._baseX; this.y = this._baseY;
            this.opacity = 0;

            if (this._boundToEvent) { // Where minor messages will be bound to?! Again optimization...
                this._yAdjust = this._height * 0.5 - _messageStructs[0].OffsetY;
                this.subUpdate = () => {
                    if (this._boundToEvent._minorStack > this._preMinorMessages) {
                        this._yAdjust += ((this._boundToEvent._minorStack - this._preMinorMessages) * this._height);
                        this._preMinorMessages = this._boundToEvent._minorStack - 0;
                    } this.y = this._boundToEvent.screenY_OC() - this._yAdjust;
                    this.x = this._boundToEvent.screenX_OC() - this._width50;
                };
            } else {
                this.subUpdate = () => {
                    if (_minorStack > this._preMinorMessages) {
                        this._baseY = this._baseY - ((_minorStack - this._preMinorMessages) * this._height);
                        this._preMinorMessages = _minorStack - 0;
                    } this.y = this._baseY;
                };
            }

            let h = 0; h = setTimeout(() => {
                _messageTimeouts.remove(h);
                if (this._boundToEvent) {
                    this._preMinorMessages = this._boundToEvent._minorStack++;
                } else {
                    this._preMinorMessages = _minorStack++;
                }
                if (se) AudioManager.playSe(se); // playSe: command250
                this.update = () => {
                    if (--this._timeRemaining < 0) {
                        this.clear();
                    } else {
                        if (this._timeRemaining < this._timeToFade) this.opacity -= this._faderStep;
                        this.subUpdate(); if (this._timeRemaining > this._timeToFade) this.opacity = 255;
                    }
                };
            }, queue_timeout); _messageTimeouts.push(h);

        }

        update() { }

        clear() {
            let base = OcRam.scene(); 
            if (this._boundToEvent) {
                this._boundToEvent._minorMessages--;
                if (this._boundToEvent._minorMessages < 1) { this._boundToEvent._minorStack = 0; }
            } else {
                _minorMessages--;
                if (_minorMessages < 1) { _minorStack = 0; }
            } if (base) base.removeChild(this);
        }

    }

    /** Major message */
    class OcRam_Major_Message extends Sprite {

        constructor(text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, align) {

            super(); font_size = font_size | 0;

            let base = OcRam.scene();
            if (!base) return; _majorMessages++;
            base.addChildAt(this, base.children.length > 0 ? base.children.length - 1 : 0);
            
            const bm = bg_index > 0 ? _msgBG[bg_index - 1] : _msgBG[1];

            let aligned_y;

            switch (align) {
                case 0: aligned_y = _messageStructs[type].OffsetY | 0; break; // Top
                case 1: aligned_y = ((Graphics.height * 0.5) - (bm.height * 0.5)) + (_messageStructs[type].OffsetY | 0); break; // Center
                case 2: aligned_y = (Graphics.height - bm.height) + (_messageStructs[type].OffsetY | 0); break; // Bottom
            } if (bg_index < 0) bg_index = 0; if (bg_index > 4) bg_index = 4;

            _this.debug("NEW MAJOR", text_to_show, type, se, text_color, b_color, icon, font, font_size, bg_index, border, fade, align);
            _this.debug(">>>>>", "aligned_y:", aligned_y, "OffsetY:", _messageStructs[type].OffsetY);

            this._text = text_to_show;
            this._width = Graphics.width;
            this._height = Graphics.height;
            this.anchor.x = 0; this.anchor.y = 0;
            this.bitmap = new Bitmap(this._width, this._height);

            // Make font
            this.bitmap.fontFace = font;
            this.bitmap.fontSize = font_size;
            this.bitmap.fontItalic = false;
            this.bitmap.fontBold = false;
            this.bitmap.font = this.bitmap._makeFontNameText();

            this.bitmap.textColor = text_color;
            this.bitmap.outlineColor = b_color;
            this.bitmap.outlineWidth = border;
            this.bitmap.clearRect(0, 0, this._width, this._height);
            if (bg_index != 0 && bm) this.bitmap.blt(bm, 0, 0, this._width, bm.height, 0, aligned_y, this._width, bm.height);
            this.bitmap.drawText(this._text, 0, aligned_y, this._width, bm.height, "center");

            this._timeRemaining = fade || 180; // Wait for xxx frames...
            this._timeToFade = (fade * 0.333) | 0; this._faderStep = 255 / this._timeToFade;
            this.x = 0; this.y = 0; this.opacity = 255; if (se) AudioManager.playSe(se); // playSe: command250

        }

        update() {
            if (--this._timeRemaining < 0) this.clear();
            if (this._timeRemaining < this._timeToFade) this.opacity -= this._faderStep;
        }

        clear() {
            let base = OcRam.scene(); _majorMessages--;
            if (base) base.removeChild(this);
        }

    }

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_CharacterBase.prototype.addLabel = function (title, radius, color) {
        if (_useLabels && !this._erased) _labels.push(new OcRam_Label(this, title, radius, color));
    };

    Game_CharacterBase.prototype.addIndicator = function (title, icon, bg_index, fcolor, bcolor) {
        if (_useIndicators) _indicators.push(new OcRam_Indicator(this, title, icon, bg_index, fcolor, bcolor));
    };

    // All characters has updateLabel - No need to do extra iffing this way...
    Game_CharacterBase.prototype.updateLabel = () => { };
    Game_CharacterBase.prototype.updateIndicator = () => { };

    Game_CharacterBase.prototype.removeLabel = function () {
        this._labelTitle = ''; this._labelRadius = 0;
        if (this._label) {
            this._label.clear();
            delete this._label;
        }
    };

    Game_CharacterBase.prototype.removeIndicator = function () {
        if (this._indicator) {
            this._indicator.clear();
            delete this._indicator;
        }
    };

    // Show message on screen NOW!
    Game_Screen.prototype.showMessage = function (msg, type, se, c1, c2, icon, font, font_size, bg_index, border, fade, padding, align) {
        if (bg_index === undefined && type != 0) bg_index = type;
        showTextOnScreen(msg, type, se, c1, c2, icon, font, font_size, bg_index, border, fade, padding, align);
    };

    // Show message on character NOW!
    Game_Character.prototype.showMessage = function (msg, type, se, c1, c2, icon, font, font_size, bg_index, border, fade, padding, align) {
        if (bg_index === undefined && type != 0) bg_index = type;
        showTextOnScreen(msg, type, se, c1, c2, icon, font, font_size, bg_index, border, fade, padding, align, !type ? OcRam.getGameObjectId(this) : null);
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(Scene_Boot, "loadGameFonts", function () {
        _this["Scene_Boot_loadGameFonts"].apply(this, arguments);
        if (!isSystemFont(_fontFace)) FontManager.load("ocram-label", _fontFace);
        if (!isSystemFont(_fontFaceI)) FontManager.load("ocram-indicator", _fontFaceI);
        if (!isSystemFont(_messageStructs[0].FontName)) FontManager.load("ocram-minor", _messageStructs[0].FontName);
        if (!isSystemFont(_messageStructs[1].FontName)) FontManager.load("ocram-major1", _messageStructs[1].FontName);
        if (!isSystemFont(_messageStructs[2].FontName)) FontManager.load("ocram-major2", _messageStructs[2].FontName);
        if (!isSystemFont(_messageStructs[3].FontName)) FontManager.load("ocram-major3", _messageStructs[3].FontName);
        if (!isSystemFont(_messageStructs[4].FontName)) FontManager.load("ocram-major4", _messageStructs[4].FontName);
    });

    this.extend(Game_Event, "unlock", function () {
        if (this._indicator && !this._liftedEvent) this._indicator._started = false;
        _this["Game_Event_unlock"].apply(this, arguments);
    });

    this.extend(Game_Event, "start", function () {
        if (this._indicator) this._indicator._started = true;
        _this["Game_Event_start"].apply(this, arguments);
    });

    this.extend(Game_Event, "setupPage", function () {
        _this["Game_Event_setupPage"].apply(this, arguments);
        processIndicatorComments(this);
    });

    this.extend(Game_CharacterBase, "update", function () {
        _this["Game_CharacterBase_update"].apply(this, arguments);
        this.updateLabel(); this.updateIndicator(); // Just call update methods >> all characters have these
    });
    
    this.extend(Game_Interpreter, "command214", function () { // Erase Event
        this.event().removeLabel();
        return _this["Game_Interpreter_command214"].apply(this, arguments);
    });

    this.extend(Scene_Map, "callMenu", function () { // DO NOT CALL MENU IF MAJOR MESSAGE IS SHOWN!
        _autoDisable = _disableWhileInMenu;
        if (_majorMessages) {
            if (!_allowMenuOnMajor) { this.menuCalling = false; return false; }
        } _this["Scene_Map_callMenu"].apply(this, arguments);
    });

    // AUTOMATED MESSAGES
    this.extend(Game_Party, "gainGold", function (amount) { // Gain/Lose Gold
        _this["Game_Party_gainGold"].apply(this, arguments);
        if (amount == 0) return; let oid = _gainGold.MessageType != 0 ? 0 : _gainGold.BoundTo;
        let ico = _gainGold.Icon == -1 ? 313 : Number(_gainGold.Icon);
        if (amount > 0) {
            const msg = _gainGold.Message.replaceAll("{$value}", amount).replaceAll("{$name}", "");
            showAutoMsg(msg, _gainGold.MessageType, parseSE(_gainGold.SE), _gainGold.ForeColor, _gainGold.OutlineColor, ico, _gainGold.BG, getObjId(oid));
        } else {
            oid = _loseGold.MessageType != 0 ? 0 : _loseGold.BoundTo;
            const msg = _loseGold.Message.replaceAll("{$value}", amount).replaceAll("{$name}", "");
            showAutoMsg(msg, _loseGold.MessageType, parseSE(_loseGold.SE), _loseGold.ForeColor, _loseGold.OutlineColor, ico, _loseGold.BG, getObjId(oid));
        }
    });

    let _justEquippedItem = false; // DO NOT SHOW "LOSE ITEM" MESSAGES ON EQUIPS!
    this.extend(Game_Actor, "changeEquip", function (newItem, oldItem) {
        _justEquippedItem = true; _this["Game_Actor_changeEquip"].apply(this, arguments); _justEquippedItem = false;
    });

    this.extend(Game_Party, "gainItem", function (item, amount, includeEquip) { // Gain/Lose Item
        _this["Game_Party_gainItem"].apply(this, arguments); if (_justEquippedItem) return;
        let oid = _gainItem.MessageType != 0 ? 0 : _gainItem.BoundTo;
        if (item == undefined || item.name == undefined || amount === 0) return;
        let ico = _gainItem.Icon == -1 ? item.iconIndex : Number(_gainItem.Icon);
        if (amount > 0) {
            const msg = _gainItem.Message.replaceAll("{$name}", item.name).replaceAll("{$value}", amount);
            showAutoMsg(msg, _gainItem.MessageType, parseSE(_gainItem.SE), _gainItem.ForeColor, _gainItem.OutlineColor, ico, _gainItem.BG, getObjId(oid));
        } else {
            oid = _loseItem.MessageType != 0 ? 0 : _loseItem.BoundTo;
            const msg = _loseItem.Message.replaceAll("{$name}", item.name).replaceAll("{$value}", amount);
            showAutoMsg(msg, _loseItem.MessageType, parseSE(_loseItem.SE), _loseItem.ForeColor, _loseItem.OutlineColor, ico, _loseItem.BG, getObjId(oid));
        }
    });

    this.extend(Game_Interpreter, "command315", function () { // Gain/Lose XP
        _this["Game_Interpreter_command315"].apply(this, arguments);
        const params = this._list[this._index].parameters;
        let amount = params[4]; amount = (params[2] == 1) ? -amount : amount;
        if (amount == 0) return true; let msg = "";
        let oid = _gainExp.MessageType != 0 ? 0 : _gainExp.BoundTo;
        // _params[0] = variableId
        // _params[1] = actorId
        // _params[2] = 0 = inc // 1 = dec
        // _params[3] = variableId
        // _params[4] = amount
        // _params[5] = show levelup?
        let colors = [_gainExp.ForeColor, _gainExp.OutlineColor];
        let t = _gainExp.MessageType; let sfx = parseSE(_loseExp.SE);
        let bgi = _gainExp.BG;
        let ico = _gainExp.Icon == -1 ? 160 : Number(_gainExp.Icon);
        if (amount < 0) {
            oid = _loseExp.MessageType != 0 ? 0 : _loseExp.BoundTo;
            colors = [_loseExp.ForeColor, _loseExp.OutlineColor];
            t = _loseExp.MessageType; ico = _loseExp.Icon == -1 ? 160 : Number(_loseExp.Icon);
            msg = _loseExp.Message.replace("{$value}", amount); bgi = _loseExp.BG;
        } else {
            msg = _gainExp.Message.replace("{$value}", amount);
            sfx = parseSE(_gainExp.SE);
        } if (params[1] == 0) { // All or has specific actor?
            msg = msg.replace("{$name}", "All");
        } else {
            let actor_name = "no name?";
            $dataActors.forEach(actor => {
                if (actor) {
                    if (actor.id == params[1]) { actor_name = actor.name; return; }
                }
            }); msg = msg.replace("{$name}", actor_name);
        } showAutoMsg(msg, t, sfx, colors[0], colors[1], ico, bgi, getObjId(oid));
        return true;
    });

    this.extend(Game_Actor, "levelUp", function () { // Gain/Lose Level
        _this["Game_Actor_levelUp"].apply(this, arguments); let msg = "";
        let oid = _gainLevel.MessageType != 0 ? 0 : _gainLevel.BoundTo;
        msg = _gainLevel.Message.replace("{$name}", this._name);
        msg = msg.replace("{$value}", this._level); let ico = _gainLevel.Icon == -1 ? 73 : Number(_gainLevel.Icon);
        showAutoMsg(msg, _gainLevel.MessageType, parseSE(_gainLevel.SE), _gainLevel.ForeColor, _gainLevel.OutlineColor, ico, _gainLevel.BG, getObjId(oid));
    }); this.extend(Game_Actor, "levelDown", function () {
        _this["Game_Actor_levelDown"].apply(this, arguments); let msg = "";
        let oid = _loseLevel.MessageType != 0 ? 0 : _loseLevel.BoundTo;
        msg = _loseLevel.Message.replace("{$name}", this._name);
        msg = msg.replace("{$value}", this._level); let ico = _gainLevel.Icon == -1 ? 74 : Number(_gainLevel.Icon);
        showAutoMsg(msg, _loseLevel.MessageType, parseSE(_loseLevel.SE), _loseLevel.ForeColor, _loseLevel.OutlineColor, ico, _loseLevel.BG, getObjId(oid));
    });

    this.extend(Game_Interpreter, "command311", function () { // Gain/Lose HP
        const params = this._list[this._index].parameters;
        const value = this.operateValue(params[2], params[3], params[4]);
        let oid = _gainHP.MessageType != 0 ? 0 : _gainHP.BoundTo;
        let ico = _gainHP.Icon == -1 ? 162 : Number(_gainHP.Icon);
        let msg = (value > 0) ? _gainHP.Message : _loseHP.Message;
        if (params[1] == 0) { // All or has specific actor?
            msg = msg.replace("{$name}", "All");
        } else {
            let actor_name = "no name?";
            $dataActors.forEach(actor => {
                if (actor) {
                    if (actor.id == params[1]) { actor_name = actor.name; return; }
                }
            }); msg = msg.replace("{$name}", actor_name);
        } if (value > 0) {
            msg = msg.replace("{$value}", value); 
            showAutoMsg(msg, _gainHP.MessageType, parseSE(_gainHP.SE), _gainHP.ForeColor, _gainHP.OutlineColor, ico, _gainHP.BG, getObjId(oid));
        } else {
            oid = _loseHP.MessageType != 0 ? 0 : _loseHP.BoundTo;
            msg = msg.replace("{$value}", value); ico = _loseHP.Icon == -1 ? 162 : Number(_loseHP.Icon);
            showAutoMsg(msg, _loseHP.MessageType, parseSE(_loseHP.SE), _loseHP.ForeColor, _loseHP.OutlineColor, ico, _loseHP.BG, getObjId(oid));
        } return _this["Game_Interpreter_command311"].apply(this, arguments);
    });

    this.extend(Game_Interpreter, "command312", function () { // Gain/Lose MP
        const params = this._list[this._index].parameters;
        let oid = _gainMP.MessageType != 0 ? 0 : _gainMP.BoundTo;
        let ico = _gainMP.Icon == -1 ? 165 : Number(_gainMP.Icon);
        const value = this.operateValue(params[2], params[3], params[4]);
        let msg = (value > 0) ? _gainMP.Message : _loseMP.Message;
        if (params[1] == 0) { // All or has specific actor?
            msg = msg.replace("{$name}", "All");
        } else {
            let actor_name = "no name?";
            $dataActors.forEach(actor => {
                if (actor) {
                    if (actor.id == params[1]) { actor_name = actor.name; return; }
                }
            }); msg = msg.replace("{$name}", actor_name);
        } if (value > 0) {
            msg = msg.replace("{$value}", value);
            showAutoMsg(msg, _gainMP.MessageType, parseSE(_gainMP.SE), _gainMP.ForeColor, _gainMP.OutlineColor, ico, _gainMP.BG, getObjId(oid));
        } else {
            oid = _loseMP.MessageType != 0 ? 0 : _loseMP.BoundTo;
            msg = msg.replace("{$value}", value); ico = _loseMP.Icon == -1 ? 165 : Number(_loseMP.Icon);
            showAutoMsg(msg, _loseMP.MessageType, parseSE(_loseMP.SE), _loseMP.ForeColor, _loseMP.OutlineColor, ico, _loseMP.BG, getObjId(oid));
        } return _this["Game_Interpreter_command312"].apply(this, arguments);
    });


    this.extend(Game_Actor, "learnSkill", function (skillId) { // Gain skill / Note to myself delete this: 17 = Blood suck!
        if (!this.isLearnedSkill(skillId) && !OcRam.scene().isBoot() && !OcRam.scene().isTitle()) {
            const actor_name = this._name;
            const skill = $dataSkills[skillId];
            if (skill) {
                const skill_name = skill.name;
                const oid = _gainSkill.MessageType != 0 ? 0 : _gainSkill.BoundTo;
                const ico = _gainSkill.Icon == -1 ? skill.iconIndex : Number(_gainSkill.Icon);
                let msg = _gainSkill.Message || '{$name} learned {$value}';
                msg = msg.replace("{$name}", actor_name); msg = msg.replace("{$value}", skill_name);
                showAutoMsg(msg, _gainSkill.MessageType, parseSE(_gainSkill.SE), _gainSkill.ForeColor, _gainSkill.OutlineColor, ico, _gainSkill.BG, getObjId(oid));
            }
        }; _this["Game_Actor_learnSkill"].apply(this, arguments);
    });

    this.extend(Game_Actor, "forgetSkill", function (skillId) { // Lose skill
        if (this.isLearnedSkill(skillId) && !OcRam.scene().isBoot() && !OcRam.scene().isTitle()) {
            const actor_name = this._name;
            const skill = $dataSkills[skillId];
            if (skill) {
                const skill_name = skill.name;
                const oid = _loseSkill.MessageType != 0 ? 0 :_loseSkill.BoundTo;
                const ico = _loseSkill.Icon == -1 ? skill.iconIndex : Number(_loseSkill.Icon);
                let msg = _loseSkill.Message || '{$name} forgot {$value}';
                msg = msg.replace("{$name}", actor_name); msg = msg.replace("{$value}", skill_name);
                showAutoMsg(msg, _loseSkill.MessageType, parseSE(_loseSkill.SE), _loseSkill.ForeColor, _loseSkill.OutlineColor, ico, _loseSkill.BG, getObjId(oid));
            }
        } _this["Game_Actor_forgetSkill"].apply(this, arguments);
    });

    this.extend(Game_Party, "addActor", function (actorId) { // Gain NEW party member
        if (!this._actors.includes(actorId)) {
            const actor = $dataActors[actorId];
            if (actor) {
                const actor_name = actor.name;
                const oid = _gainPartyMember.MessageType != 0 ? 0 :_gainPartyMember.BoundTo;
                const ico = _gainPartyMember.Icon == -1 ? 0 : Number(_gainPartyMember.Icon);
                let msg = _gainPartyMember.Message || '{$name} has joined the party!';
                msg = msg.replace("{$name}", actor_name); msg = msg.replace("{$value}", "");
                showAutoMsg(msg, _gainPartyMember.MessageType, parseSE(_gainPartyMember.SE), _gainPartyMember.ForeColor, _gainPartyMember.OutlineColor, ico, _gainPartyMember.BG, getObjId(oid));
            }
        } return _this["Game_Party_addActor"].apply(this, arguments);
    });

    this.extend(Game_Party, "removeActor", function (actorId) { // Lose EXISITNG party member
        if (this._actors.includes(actorId)) {
            const actor = $dataActors[actorId];
            if (actor) {
                const actor_name = actor.name;
                const oid = _losePartyMember.MessageType != 0 ? 0 : _losePartyMember.BoundTo;
                const ico = _losePartyMember.Icon == -1 ? 0 : Number(_losePartyMember.Icon);
                let msg = _losePartyMember.Message || '{$name} has joined the party!';
                msg = msg.replace("{$name}", actor_name); msg = msg.replace("{$value}", "");
                showAutoMsg(msg, _losePartyMember.MessageType, parseSE(_losePartyMember.SE), _losePartyMember.ForeColor, _losePartyMember.OutlineColor, ico, _losePartyMember.BG, getObjId(oid));
            }
        } return _this["Game_Party_removeActor"].apply(this, arguments);
    });

    /*this.extend(Game_Interpreter, "command326", function () { // Gain/Lose TP
        const params = this._list[this._index].parameters;
        return _this["Game_Interpreter_command326"].apply(this, arguments);
    });

    this.extend(Game_Interpreter, "command313", function () { // Gain/Lose State
        const params = this._list[this._index].parameters;
        return _this["Game_Interpreter_command313"].apply(this, arguments);
    });*/

    if (_showIndicatorOptions) {

        // ------------------------------------------------------------------------------
        // Indicator OPTIONS!
        // ==============================================================================

        Object.defineProperty(ConfigManager, 'showLabels', {
            get: function () {
                return _useLabels;
            },
            set: function (value) {
                _useLabels = value;
                if (!_useLabels) _this.clearAllLabels();
            },
            configurable: true
        });

        Object.defineProperty(ConfigManager, 'showIndicators', {
            get: function () {
                return _useIndicators;
            },
            set: function (value) {
                _useIndicators = value;
                if (!_useIndicators) _this.clearAllIndicators();
            },
            configurable: true
        });

        Object.defineProperty(ConfigManager, 'showNotifications', {
            get: function () {
                return _useNotifications;
            },
            set: function (value) {
                _useNotifications = value;
            },
            configurable: true
        });

        this.extend(ConfigManager, "makeData", function () {
            let config = _this["ConfigManager_makeData"].apply(this, arguments);
            config.showLabels = this.showLabels;
            config.showIndicators = this.showIndicators;
            config.showNotifications = this.showNotifications;
            return config;
        });

        this.extend(ConfigManager, "applyData", function (config) {
            this.showLabels = this.readFlag(config, 'showLabels', true);
            this.showIndicators = this.readFlag(config, 'showIndicators', true);
            this.showNotifications = this.readFlag(config, 'showNotifications', true);
            _this["ConfigManager_applyData"].apply(this, arguments);
        });

        this.extend(Window_Options, "makeCommandList", function () {
            _this["Window_Options_makeCommandList"].apply(this, arguments);
            this.addIndicatorOptions();
        });

        Window_Options.prototype.addIndicatorOptions = function () {
            this.addCommand("Labels", "showLabels");
            this.addCommand("Indicators", "showIndicators");
            this.addCommand("Notifications", "showNotifications");
        };

    }
    
    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    // - No overrides -

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearMessages = () => {
        _minorMessages = 0; _minorStack = 0; _majorMessages = 0;
        if ($gameMap) {
            $gameMap.events().forEach(ev => {
                if (ev._minorMessages) ev._minorMessages = null;
            });
        }
    };
    this.clearPluginData = () => {
        this.clearAllLabels(); this.clearAllIndicators(); this.clearMessages(); _autoDisable = false;
    };
    this.loadPluginData = gs => {
        _useLabels = gs._useLabels;
        _useIndicators = gs._useIndicators;
        _useNotifications = gs._useNotifications;
    };
    this.savePluginData = gs => {
        gs._useLabels = _useLabels;
        gs._useIndicators = _useIndicators;
        gs._useNotifications = _useNotifications;
        this.clearAllLabels(); this.clearAllIndicators();
    }; this.onMapLoaded = sm => { }; // 1st
    this.createLowerBattleLayer = sb => { _autoDisable = _disableWhileInBattle; }; // 2nd
    this.createLowerMapLayer = sm => { }; // 2nd
    this.onMapStart = sm => {
        this.clearMessages(); _autoDisable = false;
        if (_useLabels) this.showAllLabels();
        if (_useIndicators) this.showAllIndicators();
    }; // 3rd
    this.onMapTerminate = sm => {
        this.clearMessages();
        let tmp = []; _messageTimeouts.forEach(i => { tmp.push(i); });
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] | 0) clearTimeout(tmp[i] | 0);
            _messageTimeouts.remove(tmp[i]);
        }
    };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "show", function (args) {
        _this.debug("Plugin command: show", args);
        switch (Number(args.indicatorType)) {
            case 0: _useLabels = true; _this.showAllLabels(); break; // Labels
            case 1: _useNotifications = true; break; // automessages
            case 2: _useIndicators = true; _this.showAllIndicators(); break; // Action tooltips
            case 3:
                _useLabels = true; _this.showAllLabels();
                _useIndicators = true; _this.showAllIndicators();
                _useNotifications = true;
                break; // ALL
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "hide", function(args) {
        _this.debug("Plugin command: hide", args);
        switch (Number(args.indicatorType)) {
            case 0: _useLabels = false; _this.clearAllLabels(); break; // Labels
            case 1: _useNotifications = false; break; // automessages
            case 2: _useIndicators = false; _this.clearAllIndicators(); break; // Action tooltips
            case 3:
                _useLabels = false; _this.clearAllLabels();
                _useIndicators = false; _this.clearAllIndicators();
                _useNotifications = false;
                break; // ALL
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "minorMessage", function (args) {
        _this.debug("Plugin command: minorMessage", args, parseSE(args.se));
        $gameScreen.showMessage(args.message, 0, parseSE(args.se), args.fontColor, args.outlineColor, args.icon, null, null, Number(args.BG), args.gameObjectId);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "majorMessage", function (args) {
        _this.debug("Plugin command: majorMessage", args);
        $gameScreen.showMessage(args.message, Number(args.BG) || 1, parseSE(args.se), args.fontColor, args.outlineColor, args.icon, null, null, Number(args.BG));
    });

}.bind(OcRam.Indicators)());