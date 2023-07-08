//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Input_EX.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Input_EX", "1.00");

/*:
 * @target MZ
 * @plugindesc v1.00 Input Extensions. Add MAXIMUM support for all kind of gamepads! Enable rumble, right analog stick and much more!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Followers
 * @orderAfter OcRam_Local_Coop
 * @orderBefore OcRam_Map_Items
 * @orderBefore OcRam_Misc
 * @
 *
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Button Common Events
 * @type boolean
 * @desc Enable button common events while on map or battle scene?
 * @default true
 *
 * @param L1 button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'L1' is pressed.
 * @default 0
 *
 * @param R1 button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'R1' is pressed.
 * @default 0
 *
 * @param L2 button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'L2' is pressed.
 * @default 0
 *
 * @param R2 button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'R2' is pressed.
 * @default 0
 *
 * @param Select button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Select' is pressed.
 * @default 0
 *
 * @param Start button CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Start' is pressed.
 * @default 0
 *
 * @param Left analog pressed CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Left analog button' is pressed.
 * @default 0
 *
 * @param Right analog pressed CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Right analog button' is pressed.
 * @default 0
 *
 * @param Mouse wheel up CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Mouse scroll up' is triggered.
 * @default 0
 *
 * @param Mouse wheel down CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Mouse scroll down' is triggered.
 * @default 0
 *
 * @param Mouse wheel press CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Mouse wheel' is pressed (middle button).
 * @default 0
 *
 * @param Mouse extra button1 CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Mouse extra button1' is pressed.
 * @default 0
 *
 * @param Mouse extra button2 CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when 'Mouse extra button2' is pressed.
 * @default 0
 *
 * @param Help CE
 * @parent Button Common Events
 * @type common_event
 * @desc Run this event when F1 is pressed.
 * @default 0
 * 
 * @param Indicator Structs
 * @type boolean
 * @desc Group for 'Indicator Structs' which are shown in 'Scene_Input_Options'.
 * @default true
 *
 * @param Left Analog Stick Horz
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["LEFT analog stick horizontally (To move left/right)","ahorz","541","290","3","Push","Pushed"]
 *
 * @param Left Analog Stick Vert
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["LEFT analog stick vertically (To move up/down)","avert","568","265","3","Push","Pushed"]
 *
 * @param Right Analog Stick Horz
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["RIGHT analog stick horizontally (To look left/right)","ahorz","785","290","3","Push","Pushed"]
 *
 * @param Right Analog Stick Vert
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["RIGHT analog stick vertically (To look up/down)","avert","812","265","3","Push","Pushed"]
 *
 * @param A button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["A (OK / Interact)","abutton","914","248","3","Press","Pressed"]
 *
 * @param B button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["B (Cancel / Use map item)","abutton","976","190","3","Press","Pressed"]
 *
 * @param X button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["X (Dash)","abutton","852","190","3","Press","Pressed"]
 *
 * @param Y button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Y (Menu)","abutton","913","133","3","Press","Pressed"]
 *
 * @param Start button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Start button (join game)","ss_button","717","173","3","Press","Pressed"]
 *
 * @param Select button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Select button (toggle map item slot)","ss_button","612","173","3","Press","Pressed"]
 *
 * @param L1 button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Shoulder button: L1 (Previous actor)","sbutton_1","471","57","3","Press","Pressed"]
 *
 * @param R1 button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Shoulder button: R1 (Next actor)","sbutton_1","743","57","3","Press","Pressed"]
 *
 * @param L2 button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Shoulder button: L2 (Previous map item)","sbutton_2","490","35","3","Press","Pressed"]
 *
 * @param R2 button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Shoulder button: R2 (Next map item)","sbutton_2","762","35","3","Press","Pressed"]
 *
 * @param Left analog button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Analog left button","abutton","564","287","3","Press","Pressed"]
 *
 * @param Right analog button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Analog right button","abutton","808","287","3","Press","Pressed"]
 *
 * @param D-Pad Up
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["D-Pad UP","dpad_up","464","130","3","Press","Pressed"]
 *
 * @param D-Pad Down
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["D-Pad DOWN","dpad_down","464","252","3","Press","Pressed"]
 *
 * @param D-Pad Left
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["D-Pad LEFT","dpad_left","403","190","3","Press","Pressed"]
 *
 * @param D-Pad Right
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["D-Pad RIGHT","dpad_right","525","190","3","Press","Pressed"]
 *
 * @param Mouse primary button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse primary button (OK / Interact)","mb1","482","129","3","Click","Clicked"]
 *
 * @param Mouse secondary button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse secondary button (Cancel / Use map item)","mb2","586","84","3","Click","Clicked"]
 *
 * @param Mouse mid button
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse mid button (OK / Interact)","mw_press","555","111","3","Click","Clicked"]
 *
 * @param Mouse extra button1
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse extra button1","mb3","536","295","3","Click","Clicked"]
 *
 * @param Mouse extra button2
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse extra button2","mb4","474","217","3","Click","Clicked"]
 *
 * @param Mouse wheel up
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse wheel up (Previous map item)","mw_up","555","111","3","Scroll","Scrolled"]
 *
 * @param Mouse wheel down
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Mouse wheel down (Next map item)","mw_down","555","111","3","Scroll","Scrolled"]
 *
 * @param KB Up
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Move Up","kb_button","516","52","3","Press","Pressed"]
 *
 * @param KB Down
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Move Down","kb_button","516","148","3","Press","Pressed"]
 *
 * @param KB Left
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Move Left","kb_button","516","244","3","Press","Pressed"]
 *
 * @param KB Right
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Move Right","kb_button","516","340","3","Press","Pressed"]
 *
 * @param KB OK
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["OK / Interact","kb_button","756","52","3","Press","Pressed"]
 *
 * @param KB Cancel
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Cancel / Use map item","kb_button","756","148","3","Press","Pressed"]
 *
 * @param KB Dash
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Dash","kb_button","756","244","3","Press","Pressed"]
 *
 * @param KB Menu
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Menu","kb_button","756","340","3","Press","Pressed"]
 *
 * @param KB L1
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["L1 (Previous actor)","kb_button","996","52","3","Press","Pressed"]
 *
 * @param KB R1
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["R1 (Next actor)","kb_button","996","148","3","Press","Pressed"]
 *
 * @param KB L2
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["L2 (Previous map item)","kb_button","996","244","3","Press","Pressed"]
 *
 * @param KB R2
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["R2 (Next map item)","kb_button","996","340","3","Press","Pressed"]
 *
 * @param KB Select
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Select","kb_button","644","436","3","Press","Pressed"]
 *
 * @param KB Start
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["Start","kb_button","852","436","3","Press","Pressed"]
 *
 * @param KB A-Left
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["A-Left","kb_button","420","436","3","Press","Pressed"]
 *
 * @param KB A-Right
 * @parent Indicator Structs
 * @type text[]
 * @desc Array structure: [message,bitmap,x,y,color,push,pushed] (bitmaps must be in './img/pictures/input_ex' folder)
 * @default ["A-Right","kb_button","996","436","3","Press","Pressed"]
 *
 * @param Labels
 * @type boolean
 * @desc Group for all 'labels'.
 * @default true
 * 
 * @param Cancel
 * @parent Labels
 * @type text
 * @desc 'Cancel' command caption
 * @default Cancel
 *
 * @param KeyboardP1
 * @parent Labels
 * @type text
 * @desc 'Keyboard (Layout 1)' command caption
 * @default Keyboard (Layout 1)
 *
 * @param KeyboardP2
 * @parent Labels
 * @type text
 * @desc 'Keyboard (Layout 2)' command caption
 * @default Keyboard (Layout 2)
 *
 * @param Mouse
 * @parent Labels
 * @type text
 * @desc 'Mouse' command caption
 * @default Mouse
 *
 * @param Input options caption
 * @parent Labels
 * @type text
 * @desc 'Input Options' caption
 * @default [Input Options...]
 *
 * @param Reseted mapping
 * @parent Labels
 * @type text
 * @desc Caption for 'Reseted mapping'?
 * @default RESETED mapping for:
 *
 * @param Saved mapping
 * @parent Labels
 * @type text
 * @desc Caption for 'Saved mapping'?
 * @default Saved mapping for:
 * 
 * @param Test input
 * @parent Labels
 * @type text
 * @desc Caption for 'Test input'?
 * @default Test input
 *
 * @param Reset mapping
 * @parent Labels
 * @type text
 * @desc Caption for 'Reset mapping'?
 * @default Reset to defaults
 *
 * @param Remap input
 * @parent Labels
 * @type text
 * @desc Caption for 'Remap input'?
 * @default Remap input
 *
 * @param Rumble not available
 * @parent Labels
 * @type text
 * @desc Rumble not available message?
 * @default RUMBLE feature wasn't available for this gamepad!
 *
 * @param Rumble confirm
 * @parent Labels
 * @type text
 * @desc Rumble ok/cancel message?
 * @default 'OK' = ENABLE RUMBLE / 'Cancel' = DISABLE RUMBLE
 *
 * @param Rumble enabled
 * @parent Labels
 * @type text
 * @desc Rumble enabled message?
 * @default RUMBLE IS ENABLED!
 *
 * @param Rumble disabled
 * @parent Labels
 * @type text
 * @desc Rumble disabled message?
 * @default RUMBLE IS DISABLED!
 *
 * @param Cancel message
 * @parent Labels
 * @type text
 * @desc Cancel message for testing / remapping.
 * @default Press 'Cancel' button for 3 seconds to exit!
 *
 * @param Cancel in message
 * @parent Labels
 * @type text
 * @desc 'Cancel in' message for testing / remapping.
 * @default Cancel in $1 second(s)...
 *
 * @param Not enough buttons
 * @parent Labels
 * @type text
 * @desc 'Not enough buttons' message for remapping.
 * @default Not enough buttons for: $1
 *
 * @param Mapping cancelled
 * @parent Labels
 * @type text
 * @desc Mapping cancelled message.
 * @default Remapping was cancelled!
 *
 * @param No changes made
 * @parent Labels
 * @type text
 * @desc 'No changes made' message.
 * @default No changes were made...
 *
 * @param Default keys
 * @type boolean
 * @desc Use these key codes as 'default' and when mapping is 'reseted'. SHOULDN'T USE CODES: 17 or 18!
 * @default true
 *
 * @param KB1 key codes
 * @parent Default keys
 * @type number[]
 * @min 0
 * @max 255
 * @desc Key codes for [Up,Down,Left,Right,OK,Cancel,Dash,Menu, L1,R1,L2,R2,Select,Start,AL,AR]
 * @default ["38","40","37","39","13","96","16","8","34","33","36","35","46","45","97","98"]
 *
 * @param KB1 key names
 * @parent Default keys
 * @type text[]
 * @desc Key names for [Up,Down,Left,Right,OK,Cancel,Dash,Menu, L1,R1,L2,R2,Select,Start,AL,AR]
 * @default ["8679","8681","8678","8680","Ent","NP0","Sft","Bsp","PDn","PUp","Hom","End","Del","Ins","NP1","NP2"]
 * 
 * @param KB2 key codes
 * @parent Default keys
 * @type number[]
 * @min 0
 * @max 255
 * @desc Key codes for [Up,Down,Left,Right,OK,Cancel,Dash,Menu, L1,R1,L2,R2,Select,Start,AL,AR]
 * @default ["87","83","65","68","32","70","9","27","50","49","81","69","88","90","51","52"]
 *
 * @param KB2 key names
 * @parent Default keys
 * @type text[]
 * @desc Key names for [Up,Down,Left,Right,OK,Cancel,Dash,Menu, L1,R1,L2,R2,Select,Start,AL,AR]
 * @default ["W","S","A","D","Spc","F","Tab","Esc","2","1","Q","E","X","Z","3","4"]
 * 
 * @param Enable right analog
 * @type boolean
 * @desc Enables RIGHT analog stick (to look around)
 * @default true
 *
 * @param Right analog while move
 * @parent Enable right analog
 * @type boolean
 * @desc Enables RIGHT analog stick while moving?
 * @default false
 *
 * @param Required gamepad buttons
 * @type select
 * @option 0: [No button check]
 * @value 0
 * @option 4: Action buttons
 * @value 4
 * @option 8: Shoulder buttons (L1, R1, L2, R2)
 * @value 8
 * @option 10: Select and start buttons
 * @value 10
 * @option 12: Left and Right analog buttons
 * @value 12
 * @option 15: Standard gamepad (ie. XBox controller)
 * @value 15
 * @desc Minimum amount of buttons gamepads should have? Each option includes always previous ones.
 * 0 = Not in use
 * @default 0
 *
 * @param Action for req not met
 * @parent Required gamepad buttons
 * @type select
 * @option Console warn
 * @value 0
 * @option Alert
 * @value 1
 * @option Alert and Block input
 * @value 2
 * @option Block input
 * @value 3
 * @desc Action taken if gamepad doesn't have enough buttons?
 * @default 0
 *
 * @param Text Colors
 * @type boolean
 * @desc Text colors to be used...
 * @default true
 * 
 * @param Inactive text
 * @parent Text Colors
 * @type text
 * @desc Text HEX-color for inactive/disabled text.
 * @default #444444
 *
 * @param Active text
 * @parent Text Colors
 * @type text
 * @desc Text HEX-color for active/highlighted text.
 * @default #ffffff
 *
 * @param System 'Normal' color
 * @parent Text Colors
 * @type number
 * @min 0
 * @max 31
 * @decimals 0
 * @desc System color index for 'normal' text.
 * @default 0
 *
 * @param System 'OK' color
 * @parent Text Colors
 * @type number
 * @min 0
 * @max 31
 * @decimals 0
 * @desc System color index for 'OK' text.
 * @default 3
 *
 * @param System 'Warning' color
 * @parent Text Colors
 * @type number
 * @min 0
 * @max 31
 * @decimals 0
 * @desc System color index for 'Warning' text.
 * @default 2
 * 
 * @param Add Input to options
 * @type boolean
 * @desc Show 'Input Options' command in 'Options'?
 * @default true
 *
 * @param Enable rumble
 * @type boolean
 * @desc Decide if rumble feature is available at all. If false rumble will be ALWAYS OFF.
 * @default true
 *
 * @param Disable KB input
 * @type boolean
 * @desc Disables keyboard input once and for all! (unless enabled again via JS)
 * @default false
 *
 * @param Disable touch input
 * @type boolean
 * @desc Disables touch and mouse input once and for all! (unless enabled again via JS)
 * @default false
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
 * In RPG Maker core script input handles only 'standard' gamepads. Buttons 
 * may vary depending on gamepad manufacturer and D-Pad may even have analog
 * signal, which RPG Maker normally can't handle at all.
 *
 * Not to mention about all 'extra' buttons in gamepads like: L1, R1, L2, R2,
 * Left analog stick press, Right analog stick press and Select + Start!
 *
 * Keyboard has also same amount of extended buttons and may have ALTERNATIVE
 * layout for using 'wasd' for example! (alternative layout can be used
 * by another player (aka shared keyboard) if OcRam_Local_Coop is in use!)
 *
 * Also mouse can "nowdays" have a wheel and/or extra buttons! For maximum 
 * compatibility mouse wheel 'nodge left/right' is bound to simulate mouse
 * extra buttons 1 and 2. Quite often mouse has either extra buttons or it 
 * supports mouse wheel left/right (deltaX) feature.
 *
 * Now you can bind Common Events for EACH of these extra buttons!!!
 *
 * NOTE: Using Common Events will override OcRam built-in functionality for
 * that button. If you wish to keep built-in functionality use JS or plugin
 * commands inside CE (see 'OcRam built-in functionality for each button').
 *
 * And whatabout gamepad RUMBLE?!?! Want to give feedback that player can FEEL?
 * Explosions and BIG "ROAARS" FEELS better with some RUMBLE on your hands!
 *
 * Add MAXIMUM support for all kind of gamepads! All players can now have their
 * devices REMAPPED! This plugin allows UNLIMITED AMOUNT of remapped devices!
 * (Mouse/Touch input can't be remapped and only 'test' command is available)
 *
 * Rumble, enable/disable inputs, input remapping, common events and enable 
 * right analog to look around are available even without other OcRam -plugins.
 * *** OcRam_Core is still required in order to use this plugin ***
 *
 * To utilize this plugin even further see more about:
 *      - OcRam_Followers  (L1/R1 for actor toggle)
 *      - OcRam_Local_Coop (Start to join and Start /w OK to leave game)
 *                         (and KB layout 2 for shared keyboard!)
 *      - OcRam_Map_Items  (L2/R2 for item toggle and use them with 1 button)
 *                         ('Select' to select item slot between 1 and 2)
 *                         * NOT RELEASED YET *
 * Features:
 * - Time for gamepads to RUMBLE!
 * - NEW 'Scene_Input_Options' to bind and/or test buttons and option to 
 *   enable / disable gamepad rumble feature!
 * - Available gamepad buttons: Action buttons (ABXY),
 *   L1/R1/L2/R2, Select/Start and analog stick press left/right
 * - Axis mapping for 2 analog sticks (left and right)
 * - Remapping can also enable 'analog' D-Pad (where available)
 * - Enable RIGHT analog stick for looking around!
 *   (optionally even while moving!)
 * - Extended amount of keyboard buttons (for L1/R1/L2/R2, Select/Start
 *   and analog press left/right)!
 * - 2 different KB layouts! (layout 2 can be utilized by OcRam_Local_Coop)
 * - Plugin parameters to customize all captions
 * - Plugin parameter to disable touch and mouse input
 * - Plugin parameter to disable keyboard input
 * - Additional JS to enable/disable kb/gamepads/touchinput at anytime!
 * - Mouse input:
 *   - Mouse primary button = Move to cursor (or Interact / OK)
 *   - Mouse secondary button = Cancel / Menu
 *   - Scroll wheel up = 'L2' or Common Event
 *   - Scroll wheel down = 'R2' or Common Event
 *   - Wheel left (or Mouse extra button1) = 'L1' or Common Event
 *   - Wheel right (or Mouse extra button2) = 'R1' or Common Event
 *   - Wheel press (middle button) = 'Select' or Common Event
 *     (In OcRam_Events middle button is also used for 'throw'.
 *      Carried event prevents 'Menu' and 'Select' temporarely)
 * - Common events for all 'extra' buttons, which are:
 *   - Mouse extra buttons (1 and 2), Mouse wheel up/down/press,
 *   - L1, R1, L2, R2, Analog press left/right, Select and Start
 * - Auto disable gamepads where are too few buttons?
 *   (ie. joysticks with only 4 buttons isn't good thing if your project
 *    relies on shoulder buttons or select + start for example)
 * - F1 for "help" >> Runs common event if you wish to enable this!
 *
 * * Default buttons/axes works directly only with 'STANDARD' GAMEPADS
 *   (ie. XBox controller) - Otherwise remap is recommended in options.
 *
 *   Remapped gamepads are saved in configuration file. This will ensure
 *   that all players can have same button order for any gamepad!
 *
 *   See https://w3c.github.io/gamepad/ for more info
 *
 * NOTE: Since you can TOTALLY and UTTERLY block ALL input from all players,
 *       please make sure that it's intended and allow input at some point.
 *       (unless you want to annoy players really bad muahahha-haha!)
 *
 * NOTE 2: Please make sure ./img/pictures/input_ex contains all required 
 *         assets (specially after deployment or new installations!)
 *
 * NOTE 3: Default Input key mappers are modified! (Please look at the 
 *         "Default keys" plugin parameters)
 *
 * NOTE 4: Keyboard 'Menu' button still cancels textboxes, menus,
 *         other scenes and drops lifted events (OcRam_Events). 
 *         But it's NOT using any map items (OcRam_Map_Items).
 *
 * Download demo -project from: https://ocram-codes.net
 * ps. You may use and edit all ./img/pictures/input_ex files how you like!
 *
 * PLEASE NOTE THAT ALL ASSETS IN OCRAM DEMO -PROJECT ARE DESIGNED FOR 
 * 1104 x 624 RESOLUTION (And possibly you'll need to create/edit assets and 
 * adjust plugin parameters if any other resolution is used!)
 *
 * ----------------------------------------------------------------------------
 * About support for MV
 * ============================================================================
 *
 *      NWJS in MV (game.exe) doesn't support mouse navigation (extra) buttons.
 *      Same thing about gamepad rumble feature (gamepad.vibrationActuator).
 *      Tested an MV project in browser and everything worked just fine there.
 *
 *      If these features are needed you have to update your NWJS for MV.
 *      ********** REMEMBER TO: Make backups before any updates! **************
 * 
 *      At least in NWJS v0.48.4 everything seemed to work. There are good
 *      instructions in RPG Maker forums how to update NWJS for RPG Maker MV.
 *      Example: https://forums.rpgmakerweb.com/index.php?threads/nwjs.131620/
 *
 *      NWJS has up to v0.49.2 good support for different kind of plugins. If
 *      version is updated above that, there's bigger chance that something
 *      might get broken!
 *
 * ----------------------------------------------------------------------------
 * OcRam built-in functionality for each button
 * ============================================================================
 * L1 (previous actor) = $gameMap.focusToPreviousActor(input_from);
 * R1 (next actor) = $gameMap.focusToNextActor(input_from);
 *
 * // OcRam_Map_Items (not released yet)
 * L2 (next map item) = OcRam.Map_Items.nextMapItem(player);
 * R2 (previous map item) = OcRam.Map_Items.previousMapItem(player);
 * 
 * Select (toggle map item slot) = OcRam.Map_Items.toggleMapItemSlot(player);
 *
 * Start (join game) = OcRam.Local_Coop.assignDevice(device_index);
 *                     // And to drop player (based on device_index)
 *                     OcRam.Local_Coop.dropDevice(device_index);
 *
 * TIP: You might want to 'enable' Common Event only while in map or battle
 *      scene depending on Common Event purpose!
 *
 * OcRam.scene() && OcRam.scene().isMap() // For map scene check
 * OcRam.scene() && OcRam.scene().isBattle() // For battle scene check
 *
 * ----------------------------------------------------------------------------
 * JavaScript
 * ============================================================================
 *
 * OcRam.Input_EX.disableAllInput() // Disables all input
 * OcRam.Input_EX.enableAllInput() // Enables all input
 *
 * Input.enableGamepads() // Enables gamepad input
 * Input.disableGamepads() // Disables gamepad input
 *
 * Input.enableKeyboard() // Enables keyboard input
 * Input.disableKeyboard() // Disables keyboard input
 *
 * Input.dualRumble(duration, weak, strong, player);
 * // duration >> given in milliseconds
 * // weak & strong >> force multiplier between 0.0 - 1.0
 * // player >> 1 to 4, 0 = ALL players
 *
 * TouchInput.enableTouchInput() // Enables touch/mouse input
 * TouchInput.disableTouchInput() // Disables touch/mouse input
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
 * COMMERCIAL USE: (Standard license: 10 EUR, No-credits license: 50 EUR)
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
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2022/11/11 v1.00 - Initial release
 *                    
 * ----------------------------------------------------------------------------
 * RMMZ overrides (destructive declarations) are listed here
 * ============================================================================
 * TouchInput._setupEventHandlers (If touch/mouse is disabled)
 * Input._setupEventHandlers (If keyboard is disabled)
 * 
 * @requiredAssets
 * img/pictures/input_ex/input_ex.png
 * @requiredAssets
 * img/pictures/input_ex/gamepad_remap.png
 * @requiredAssets
 * img/pictures/input_ex/kb_remap.png
 * @requiredAssets
 * img/pictures/input_ex/kb_button.png
 * @requiredAssets
 * img/pictures/input_ex/mouse_remap.png
 * @requiredAssets
 * img/pictures/input_ex/abutton.png
 * @requiredAssets
 * img/pictures/input_ex/ahorz.png
 * @requiredAssets
 * img/pictures/input_ex/avert.png
 * @requiredAssets
 * img/pictures/input_ex/sbutton_1.png
 * @requiredAssets
 * img/pictures/input_ex/sbutton_2.png
 * @requiredAssets
 * img/pictures/input_ex/dpad_up.png
 * @requiredAssets
 * img/pictures/input_ex/dpad_down.png
 * @requiredAssets
 * img/pictures/input_ex/dpad_left.png
 * @requiredAssets
 * img/pictures/input_ex/dpad_right.png
 * @requiredAssets
 * img/pictures/input_ex/ss_button.png
 */

OcRam.getShortKey = (key_name, key_code) => {
    if (!key_name || !key_code) return ""; 
    switch (key_name.toLowerCase()) {
        case "arrowup": return String.fromCharCode(8679); break;
        case "arrowdown": return String.fromCharCode(8681); break;
        case "arrowleft": return String.fromCharCode(8678); break;
        case "arrowright": return String.fromCharCode(8680); break;
        case "shift": return "Sft"; break;
        case "escape": return "Esc"; break;
        case "backspace": return "Bsp"; break;
        case "pageup": return "PUp"; break;
        case "pagedown": return "PDn"; break;
        case "home": return "Hom"; break;
        case "insert": return "Ins"; break;
        case "delete": return "Del"; break;
        case "control": return "Ctr"; break;
        case "enter": return "Ent"; break;
        case "scrolllock": return "Scl"; break;
        case "pause": return "||"; break;
        case "altgraph": return "AGr"; break;
        case "capslock": return "Cap"; break;
        case "contextmenu": return "Ctx"; break;
        case "audiovolumeup": return "V+"; break;
        case "audiovolumedown": return "V-"; break;
        case "audiovolumemute": return "V0"; break;
        case "mediaplaypause": return "||>"; break;
        case "mediastop": return "Sto"; break;
        case "mediatrackprevious": return "<<"; break;
        case "mediatracknext": return ">>"; break;
        case " ": return "Spc"; break;
        default:
            if (key_code > 95 && key_code < 112) {
                return "NP" + key_name.toUpperCase();
            } else {
                return key_name.toUpperCase();
            } break;
    }
};

function Scene_Input_Options() {
    this.initialize(...arguments);
}

Scene_Input_Options.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Input_Options.prototype.constructor = Scene_Input_Options;

Scene_Input_Options.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    this._iStructs = OcRam.Input_EX.getIndicatorStructs();
    this._kbButtonNames = []; this._kbButtonNames.length = 32;
    this._kbButtonNames2 = []; this._kbButtonNames2.length = 32;
    for (const itm in Input.keyMapper) {
        this._kbButtonNames[Input.keyMapper[itm]] = Number(itm);
    } for (const itm in Input.keyMapper2) {
        this._kbButtonNames2[Input.keyMapper2[itm]] = Number(itm);
    } if (Imported.OcRam_Local_Coop) {
        this._wasJoinAllowed = OcRam.Local_Coop.isJoinAllowed();
        OcRam.Local_Coop.dropLastPlayer();
        OcRam.Local_Coop.dropLastPlayer();
        OcRam.Local_Coop.dropLastPlayer();
        OcRam.Local_Coop.dropLastPlayer();
        OcRam.Local_Coop.allowJoin(false);
    }
};

Scene_Input_Options.prototype.createBackground = function (bg_name) {
    let new_bg = false;
    if (!this._backgroundSprite) {
        this._backgroundSprite = new Sprite(); new_bg = true;
    } const bg_img = OcRam.Input_EX.bitmaps()[bg_name] || ImageManager.loadPicture('input_ex/input_ex');
    if (bg_img) {
        this._backgroundSprite.bitmap = bg_img;
        this._backgroundFilter = null;
        this._backgroundSprite.filters = [];
        this.scaleSprite(this._backgroundSprite);
        this.centerSprite(this._backgroundSprite);
    } else {
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._backgroundSprite.filters = [this._backgroundFilter];
    } if (new_bg) this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(255);
};

Scene_Input_Options.prototype.setBackground = function (bg_name) {
    this.createBackground(bg_name);
};

Scene_Input_Options.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindows(); this.createMainWindow();
};

Scene_Input_Options.prototype.createMainWindow = function () {

    this._inputDevicesWindow = new Window_InputDevices(this.inputDevicesRect());
    this._inputDevicesWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._inputDevicesWindow); this._inputDevicesWindow.activate();

    this._inputDevicesWindow.setHandler("kb_1", this._inputDevicesWindow.kb_1.bind(this));
    this._inputDevicesWindow.setHandler("kb_2", this._inputDevicesWindow.kb_2.bind(this));
    this._inputDevicesWindow.setHandler("mouse", this._inputDevicesWindow.mouse.bind(this));

    if (this._connectedGamepads) {
        this._connectedGamepads.forEach(gi => {
            this._inputDevicesWindow.setHandler("gamepad_" + gi, this._inputDevicesWindow["gamepad_" + gi].bind(this, gi));
        });
    }

};

Scene_Input_Options.prototype.createStatusWindows = function () {
    this._inputWarningWindow = new Window_InputEXWarning(this.inputWarningRect());
    this.addWindow(this._inputWarningWindow);
    this._inputStatusWindow = new Window_InputEXStatus(this.inputStatusRect());
    this.addWindow(this._inputStatusWindow);
};

Scene_Input_Options.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
    if (Imported.OcRam_Local_Coop) {
        if (this._wasJoinAllowed) OcRam.Local_Coop.allowJoin(true);
    }
};

Scene_Input_Options.prototype.inputStatusRect = function () {
    return new Rectangle(320, Graphics.height - 110, Graphics.width - 320, 60);
};

Scene_Input_Options.prototype.inputWarningRect = function () {
    return new Rectangle(320, Graphics.height - 70, Graphics.width - 320, 60);
};

Scene_Input_Options.prototype.inputDevicesRect = function () {
    return new Rectangle(0, 0, 320, Graphics.height);
};

Scene_Input_Options.prototype.inputTestCalibrateRect = function () {
    let h = 0;
    if (OcRam.isMZ()) {
        const padding = Window_Base.prototype.itemPadding();
        h = this.calcWindowHeight(4, true) + padding;
    } else {
        h = this.calcWindowHeight(4, true);
    }
    return new Rectangle(Graphics.width * 0.5 - 160, Graphics.height * 0.5 - h * 0.5, 320, h);
};

Scene_Input_Options.prototype.promptFunc = function (input_src) {
    this._promptFuncWindow = new Window_TestCalibrate(this.inputTestCalibrateRect(), input_src);
    this._promptFuncWindow.setHandler("cancel", this._promptFuncWindow.cancelTestCalibrate.bind(this));
    this._promptFuncWindow.setHandler("test", this._promptFuncWindow.test.bind(this, input_src));
    this._promptFuncWindow.setHandler("calibrate", this._promptFuncWindow.calibrate.bind(this, input_src));
    this._promptFuncWindow.setHandler("reset", this._promptFuncWindow.reset.bind(this, input_src));
    this.addWindow(this._promptFuncWindow); this._promptFuncWindow.activate();
};

Scene_Input_Options.prototype.testMouse = function (buttons_pressed) {
    if (!this._testSprites) this._testSprites = []; let i = 0;
    buttons_pressed.forEach(button_pressed => {
        const fi = this._testSprites.find(itm => itm._buttonIndex == i);
        if (button_pressed) { // Button is pressed?
            if (!fi) { // Indicator not found?
                const s = new Sprite();
                let struct = this._iStructs["Mouse primary button"];
                switch (i) {
                    case 0: struct = this._iStructs["Mouse primary button"]; break; // MB0
                    case 1: struct = this._iStructs["Mouse secondary button"]; break; // MB1
                    case 2: struct = this._iStructs["Mouse mid button"]; break; // MW_PRESSED
                    case 3: struct = this._iStructs["Mouse extra button1"]; break; // MB3
                    case 4: struct = this._iStructs["Mouse extra button2"]; break; // MB4
                    case 5: struct = this._iStructs["Mouse wheel up"]; break; // MW_UP
                    case 6: struct = this._iStructs["Mouse wheel down"]; break; // MW_DOWN
                } s.bitmap = ImageManager.loadPicture(struct[1]);
                s.x = struct[2]; s.y = struct[3]; s._buttonIndex = i;
                this._testSprites.push(s); this.addChild(s);
            }
        } else { // Button is not pressed?
            if (fi) { this.removeChild(fi); this._testSprites.remove(fi); }
        } i++;
    });
};

Scene_Input_Options.prototype.drawKeys = function (kb_index) {
    const buttons = kb_index == 2 ? Input.remappedKb2Keys : Input.remappedKb1Keys;
    for (const k in buttons) {
        const ktxt = buttons[k]; let struct = null;
        switch (k) {
            case 'up': struct = this._iStructs["KB Up"]; break;
            case 'down': struct = this._iStructs["KB Down"]; break;
            case 'left': struct = this._iStructs["KB Left"]; break;
            case 'right': struct = this._iStructs["KB Right"]; break;
            case 'ok': struct = this._iStructs["KB OK"]; break;
            case 'cancel': struct = this._iStructs["KB Cancel"]; break;
            case 'shift': struct = this._iStructs["KB Dash"]; break;
            case 'escape': struct = this._iStructs["KB Menu"]; break;
            case 'pageup': struct = this._iStructs["KB L1"]; break;
            case 'pagedown': struct = this._iStructs["KB R1"]; break;
            case 'home': struct = this._iStructs["KB L2"]; break;
            case 'end': struct = this._iStructs["KB R2"]; break;
            case 'select': struct = this._iStructs["KB Select"]; break;
            case 'start': struct = this._iStructs["KB Start"]; break;
            case 'aleft': struct = this._iStructs["KB A-Left"]; break;
            case 'aright': struct = this._iStructs["KB A-Right"]; break;
        } if (struct) {
            const b = ImageManager.loadPicture(struct[1]);
            const w = this._backgroundSprite.bitmap.width; const h = this._backgroundSprite.bitmap.height;
            const bm = new Bitmap(w, h); bm.blt(this._backgroundSprite.bitmap, 0, 0, w, h, 0, 0);
            bm.fontSize = 16; bm.textColor = OcRam.Input_EX.parameters['Inactive text'] || "#444444";
            bm.drawText(('' + ktxt), Number(struct[2]), Number(struct[3]), b.width, b.height, "center");
            this._backgroundSprite.bitmap = bm;
        }
    }
};

Scene_Input_Options.prototype.testKeyboard = function (kb_index) {

    if (!this._testSprites) this._testSprites = []; let i = 0;
    
    [ // Get Input states...
        Input.isPressed('up'),
        Input.isPressed('down'),
        Input.isPressed('left'),
        Input.isPressed('right'),
        Input.isPressed('ok'),
        Input.isPressed('cancel'),
        Input.isPressed('shift'),
        Input.isPressed('escape'),
        Input.isPressed('pageup'),
        Input.isPressed('pagedown'),
        Input.isPressed('home'),
        Input.isPressed('end'),
        Input.isPressed('select'),
        Input.isPressed('start'),
        Input.isPressed('aleft'),
        Input.isPressed('aright')
    ].forEach(button => {
        const fi = this._testSprites.find(itm => itm._buttonIndex == i);
        if (button) {
            if (!fi) {
                const s = new Sprite(); let kname = "";
                let struct = this._iStructs["KB Up"];
                switch (i) {
                    case 0: struct = this._iStructs["KB Up"]; kname = "up"; break;
                    case 1: struct = this._iStructs["KB Down"]; kname = "down"; break; 
                    case 2: struct = this._iStructs["KB Left"]; kname = "left"; break;
                    case 3: struct = this._iStructs["KB Right"]; kname = "right"; break;
                    case 4: struct = this._iStructs["KB OK"]; kname = "ok"; break;
                    case 5: struct = this._iStructs["KB Cancel"]; kname = "cancel"; break;
                    case 6: struct = this._iStructs["KB Dash"]; kname = "shift"; break;
                    case 7: struct = this._iStructs["KB Menu"]; kname = "escape"; break;
                    case 8: struct = this._iStructs["KB L1"]; kname = "pageup"; break;
                    case 9: struct = this._iStructs["KB R1"]; kname = "pagedown"; break;
                    case 10: struct = this._iStructs["KB L2"]; kname = "home"; break;
                    case 11: struct = this._iStructs["KB R2"]; kname = "end"; break;
                    case 12: struct = this._iStructs["KB Select"]; kname = "select"; break;
                    case 13: struct = this._iStructs["KB Start"]; kname = "start"; break;
                    case 14: struct = this._iStructs["KB A-Left"]; kname = "aleft"; break;
                    case 15: struct = this._iStructs["KB A-Right"]; kname = "aright"; break;
                } s.bitmap = ImageManager.loadPicture(struct[1]);
                const w = s.bitmap.width; const h = s.bitmap.height;
                const bm = new Bitmap(w, h); bm.blt(s.bitmap, 0, 0, w, h, 0, 0);
                bm.fontSize = 16; bm.textColor = OcRam.Input_EX.parameters['Active text'] || "#ffffff";
                const ktxt = kb_index == 2 ? Input.remappedKb2Keys[kname] : Input.remappedKb1Keys[kname];
                bm.drawText(ktxt, 0, 0, w, h, "center");
                s.bitmap = bm; s.x = struct[2]; s.y = struct[3]; s._buttonIndex = i;
                this._testSprites.push(s); this.addChild(s);
            }
        } else {
            if (fi) { this.removeChild(fi); this._testSprites.remove(fi); }
        } i++;
    });

};

Scene_Input_Options.prototype.clearKBSprites = function () {
    for (let i = 0; i < 14; i++) {
        const fi = this._testSprites.find(itm => itm._buttonIndex == i);
        if (fi) { this.removeChild(fi); this._testSprites.remove(fi); }
    }
};

Scene_Input_Options.prototype.testGamepad = function (buttons_pressed, axes, dpad_axes, org_axes) {
    
    if (!this._testSprites) this._testSprites = []; let i = 0; let j = -1;

    const aha = [
        Math.abs(axes[0]) > 0.5 ? axes[0] : false,
        Math.abs(axes[1]) > 0.5 ? axes[1] : false,
        Math.abs(axes[2]) > 0.5 ? axes[2] : false,
        Math.abs(axes[3]) > 0.5 ? axes[3] : false,
        false,
        false,
        false,
        false
    ]; if (dpad_axes && dpad_axes.length > 3) {
        aha[4] = org_axes[dpad_axes[0][0]] == dpad_axes[0][1];
        aha[5] = org_axes[dpad_axes[1][0]] == dpad_axes[1][1];
        aha[6] = org_axes[dpad_axes[2][0]] == dpad_axes[2][1];
        aha[7] = org_axes[dpad_axes[3][0]] == dpad_axes[3][1];
    }

    aha.forEach(button => {
        const fi = this._testSprites.find(itm => itm._buttonIndex == j);
        if (button) {
            if (!fi) { // Indicator not found?
                const s = new Sprite();
                let struct = this._iStructs["Left Analog Stick Horz"];
                switch (j) {
                    case -1: struct = this._iStructs["Left Analog Stick Horz"]; break; // Left Analog Stick Horz
                    case -2: struct = this._iStructs["Left Analog Stick Vert"]; break; // Left Analog Stick Vert
                    case -3: struct = this._iStructs["Right Analog Stick Horz"]; break; // Right Analog Stick Horz
                    case -4: struct = this._iStructs["Right Analog Stick Vert"]; break; // Right Analog Stick Vert
                    case -5: struct = this._iStructs["D-Pad Up"]; break; // UP ('analog' DPad)
                    case -6: struct = this._iStructs["D-Pad Down"]; break; // DOWN ('analog' DPad)
                    case -7: struct = this._iStructs["D-Pad Left"]; break; // LEFT ('analog' DPad)
                    case -8: struct = this._iStructs["D-Pad Right"]; break; // RIGHT ('analog' DPad)
                } s.bitmap = ImageManager.loadPicture(struct[1]);
                const w = s.bitmap.width; const h = s.bitmap.height;
                if (j == -1 || j == -3) {
                    const bm = new Bitmap(w, h);
                    if (button < 0) { // Left
                        bm.blt(s.bitmap, 0, 0, w * 0.5, h, 0, 0);
                    } else { // Right
                        bm.blt(s.bitmap, w * 0.5, 0, w * 0.5, h, w * 0.5, 0);
                    } s.bitmap = bm;
                } if (j == -2 || j == -4) {
                    const bm = new Bitmap(w, h);
                    if (button < 0) { // Up
                        bm.blt(s.bitmap, 0, 0, w, h * 0.5, 0, 0);
                    } else { // Down
                        bm.blt(s.bitmap, 0, h * 0.5, w, h * 0.5, 0, h * 0.5);
                    } s.bitmap = bm;
                } s.x = struct[2]; s.y = struct[3]; s._buttonIndex = j;
                this._testSprites.push(s); this.addChild(s);
            }
        } else {
            if (fi) { this.removeChild(fi); this._testSprites.remove(fi); }
        } j--;
    });

    buttons_pressed.forEach(button => {
        const fi = this._testSprites.find(itm => itm._buttonIndex == i);
        if (button && button.pressed) { // Button is pressed?
            if (!fi) { // Indicator not found?
                const s = new Sprite();
                let struct = this._iStructs["A button"];
                switch (i) {
                    case 0: struct = this._iStructs["A button"]; break; // OK
                    case 1: struct = this._iStructs["B button"]; break; // Cancel
                    case 2: struct = this._iStructs["X button"]; break; // Dash
                    case 3: struct = this._iStructs["Y button"]; break; // Menu
                    case 4: struct = this._iStructs["L1 button"]; break; // L1
                    case 5: struct = this._iStructs["R1 button"]; break; // R1
                    case 6: struct = this._iStructs["L2 button"]; break; // L2
                    case 7: struct = this._iStructs["R2 button"]; break; // R2
                    case 8: struct = this._iStructs["Select button"]; break; // Select
                    case 9: struct = this._iStructs["Start button"]; break; // Start
                    case 10: struct = this._iStructs["Left analog button"]; break; // Left analog button
                    case 11: struct = this._iStructs["Right analog button"]; break; // Right analog button
                    case 12: struct = this._iStructs["D-Pad Up"]; break; // UP
                    case 13: struct = this._iStructs["D-Pad Down"]; break; // DOWN
                    case 14: struct = this._iStructs["D-Pad Left"]; break; // LEFT
                    case 15: struct = this._iStructs["D-Pad Right"]; break; // RIGHT
                } s.bitmap = ImageManager.loadPicture(struct[1]);
                s.x = struct[2]; s.y = struct[3]; s._buttonIndex = i;
                this._testSprites.push(s); this.addChild(s);
            }
        } else { // Button is not pressed?
            if (fi) { this.removeChild(fi); this._testSprites.remove(fi); }
        } i++;
    });

};

// Select input device...
function Window_InputDevices() {
    this.initialize(...arguments);
}

Window_InputDevices.prototype = Object.create(Window_Command.prototype);
Window_InputDevices.prototype.constructor = Window_InputDevices;

Window_InputDevices.prototype.initialize = function (rect) {
    this._cursorRect = new Rectangle();
    Window_Command.prototype.initialize.call(this, rect);
    this.contents.fontSize = 17;
    this.setBackgroundType(2);
    this.refresh();
};

Window_InputDevices.prototype.refresh = function (index) {
    this.clearCommandList(); this.makeCommandList(index);
    Window_Selectable.prototype.refresh.call(this);
};

Window_InputDevices.prototype.kb_1 = function () { this.promptFunc("kb_1"); };
Window_InputDevices.prototype.kb_2 = function () { this.promptFunc("kb_2"); };
Window_InputDevices.prototype.mouse = function () { this.promptFunc("mouse"); };

Window_InputDevices.prototype.addConnectedInputDevices = function () {

    const s = OcRam.scene(); if (!s) return;
    s._connectedGamepads = [];

    if (navigator.getGamepads) {
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            for (const gamepad of gamepads) {
                if (gamepad && gamepad.connected) {
                    const name = OcRam.Input_EX.formatGamepadName(gamepad.id, (gamepad.buttons.length < 10 || gamepad.axes.length < 4));
                    this.addCommand(name, "gamepad_" + gamepad.index);
                    Window_InputDevices.prototype["gamepad_" + gamepad.index] = function (gamepad_index) {
                        this.promptFunc("gamepad_" + gamepad_index);
                    }; s._connectedGamepads.push(gamepad.index);
                }
            }
        }
    }

};

Window_InputDevices.prototype.makeCommandList = function () {
    if (!OcRam.Input_EX.keyboardDisabled()) {
        this.addCommand(OcRam.Input_EX.parameters['KeyboardP1'] || "Keyboard (Layout 1)", "kb_1");
        this.addCommand(OcRam.Input_EX.parameters['KeyboardP2'] || "Keyboard (Layout 2)", "kb_2");
    } if (!OcRam.Input_EX.touchDisabled()) {
        this.addCommand(OcRam.Input_EX.parameters['Mouse'] || "Mouse", "mouse");
    } this.addConnectedInputDevices();
};

Window_InputDevices.prototype.maxCols = function () { return 1; };

// Test or calibrate window
function Window_TestCalibrate() {
    this.initialize(...arguments);
}

Window_TestCalibrate.prototype = Object.create(Window_Command.prototype);
Window_TestCalibrate.prototype.constructor = Window_TestCalibrate;

Window_TestCalibrate.prototype.initialize = function (rect, input_src) {
    this._cursorRect = new Rectangle();
    Window_Command.prototype.initialize.call(this, rect);
    this.contents.fontSize = 17;
    this.setBackgroundType(2);
    this.refresh(0, input_src);
};

Window_TestCalibrate.prototype.refresh = function (index, input_src) {
    this.clearCommandList(); this.makeCommandList(index, input_src);
    Window_Selectable.prototype.refresh.call(this);
};

Window_TestCalibrate.prototype.test = function (input_src) {
    if (input_src.indexOf("gamepad_") > -1) {
        const s = OcRam.scene(); if (s) s.setBackground('input_ex/gamepad_remap');
        Input.testGamepad(Number(input_src.replace("gamepad_", "")));
    } else {
        if (input_src.indexOf("mouse") > -1) {
            const s = OcRam.scene(); if (s) s.setBackground('input_ex/mouse_remap');
            TouchInput.testMouse();
        } else if (input_src.indexOf("kb") > -1) {
            const s = OcRam.scene(); if (s) s.setBackground('input_ex/kb_remap');
            const idx = Number(input_src.replace("kb_", ""));
            Input._pollGamepads = () => { }; // Disable Gamepads!
            Input.testKeyboard(idx); requestAnimationFrame(() => { this.drawKeys(idx); });
        }
    } this._promptFuncWindow.close();
};

Window_TestCalibrate.prototype.calibrate = function (input_src) {
    if (input_src.indexOf("gamepad_") > -1) {
        const s = OcRam.scene(); if (s) s.setBackground('input_ex/gamepad_remap');
        Input.remapGamepad(Number(input_src.replace("gamepad_", "")));
        this._promptFuncWindow.close();
    } else {
        if (input_src.indexOf("kb_") > -1) {
            const s = OcRam.scene(); if (s) s.setBackground('input_ex/kb_remap');
            const idx = Number(input_src.replace("kb_", ""));
            Input.remapKeyboard(idx);
            this._promptFuncWindow.close();
        } else {
            this._promptFuncWindow.close();
            this._inputDevicesWindow.activate();
        }
    }
};

Window_TestCalibrate.prototype.reset = function (input_src) {
    if (input_src.indexOf("gamepad_") > -1) {
        const idx = Number(input_src.replace("gamepad_", ""));
        if (navigator.getGamepads) {
            const gamepad = navigator.getGamepads()[idx];
            this._inputStatusWindow.updateStatus((OcRam.Input_EX.parameters['Reseted mapping'] ||
                "RESETED mapping for:") + " " + OcRam.Input_EX.formatGamepadName(gamepad.id), OcRam.Input_EX.warningColor());
        } Input.removeMapping(idx);
    } else if (input_src.indexOf("kb_") > -1) {
        const idx = Number(input_src.replace("kb_", ""));
        if (idx == 2) {
            OcRam.Input_EX.resetDefaultKB2_KeyCodes();
            this._inputStatusWindow.updateStatus((OcRam.Input_EX.parameters['Reseted mapping'] ||
                "RESETED mapping for:") + " Keyboard (Layout 2)", OcRam.Input_EX.warningColor());
        } else {
            OcRam.Input_EX.resetDefaultKB1_KeyCodes();
            this._inputStatusWindow.updateStatus((OcRam.Input_EX.parameters['Reseted mapping'] ||
                "RESETED mapping for:") + " Keyboard (Layout 1)", OcRam.Input_EX.warningColor());
        } ConfigManager.save();
    } this._promptFuncWindow.close();
    this._inputDevicesWindow.activate();
};

Window_TestCalibrate.prototype.cancelTestCalibrate = function () {
    this._promptFuncWindow.close();
    this._inputDevicesWindow.activate();
};

Window_TestCalibrate.prototype.makeCommandList = function (index, input_src) {
    const s = OcRam.scene(); s._inputStatusWindow.updateStatus("");
    s._inputWarningWindow.updateWarning("");
    this.addCommand(OcRam.Input_EX.parameters['Test input'] || "Test input", "test");
    if (input_src != "mouse") {
        this.addCommand(OcRam.Input_EX.parameters['Remap input'] || "Remap input", "calibrate");
        this.addCommand(OcRam.Input_EX.parameters['Reset mapping'] || "Reset to defaults", "reset");
    } this.addCommand(OcRam.Input_EX.parameters['Cancel'] || "Cancel", "cancel");
};

Window_TestCalibrate.prototype.maxCols = function () { return 1; };

// Status text display
function Window_InputEXStatus() {
    this.initialize(...arguments);
}

Window_InputEXStatus.prototype = Object.create(Window_Base.prototype);
Window_InputEXStatus.prototype.constructor = Window_InputEXStatus;

Window_InputEXStatus.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.fontSize = 17;
    this.setBackgroundType(2);
    this.updateStatus("");
};

Window_InputEXStatus.prototype.updateStatus = function (text, color, bitmap, x, y) {
    this.contents.clearRect(0, 0, this.contents.width, this.contents.height);
    this.changeTextColor(ColorManager.textColor(color || OcRam.Input_EX.normalColor()));
    this.drawText(text, 0, 0, this.contents.width, "center");
    const s = OcRam.scene(); if (s && s._buttonSprite) s.removeChild(s._buttonSprite);
    if (s && bitmap) {
        s._buttonSprite = new Sprite();
        s._buttonSprite.bitmap = ImageManager.loadPicture(bitmap);
        s._buttonSprite.x = x;
        s._buttonSprite.y = y;
        s.addChild(s._buttonSprite);
    }
};

// Status text display
function Window_InputEXWarning() {
    this.initialize(...arguments);
}

Window_InputEXWarning.prototype = Object.create(Window_Base.prototype);
Window_InputEXWarning.prototype.constructor = Window_InputEXWarning;

Window_InputEXWarning.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.fontSize = 17;
    this.setBackgroundType(2);
    this.updateWarning("");
};

Window_InputEXWarning.prototype.updateWarning = function (text, color) {
    this.contents.clearRect(0, 0, this.contents.width, this.contents.height);
    this.changeTextColor(ColorManager.textColor(color || OcRam.Input_EX.okColor()));
    this.drawText(text, 0, 0, this.contents.width, "center");
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this;

    const _disableTouchInput = OcRam.getBoolean(this.parameters['Disable touch input']);
    const _rumbleEnabled = OcRam.getBoolean(this.parameters['Enable rumble']);
    const _buttonCE_Enabled = OcRam.getBoolean(this.parameters['Button Common Events']);
    const _disableKeyboardInput = OcRam.getBoolean(this.parameters['Disable KB input']);
    const _enableRightAnalog = OcRam.getBoolean(this.parameters['Enable right analog']);
    const _rightAnalogWhileMove = OcRam.getBoolean(this.parameters['Right analog while move']);
    const _addToOptions = OcRam.getBoolean(this.parameters['Add Input to options']);
    const _inputOptionsCaption = this.parameters['Input options caption'] || "[Input Options...]";
    const _cancelMessage = this.parameters['Cancel message'] || "Press 'Cancel' for 3 seconds to exit!";
    const _cancelInMessage = this.parameters['Cancel in message'] || "Cancel in $1 second(s)...";
    const _notEnoughButtonsFor = this.parameters['Not enough buttons'] || "Not enough buttons for: $1";
    const _mappingCancelled = this.parameters['Mapping cancelled'] || "Remapping was cancelled!";
    const _noChangesWereMade = this.parameters['No changes made'] || "No changes were made...";

    const _sysColorIdxOK = Number(this.parameters["System 'OK' color"]); this.okColor = () => _sysColorIdxOK;
    const _sysColorIdxNormal = Number(this.parameters["System 'Normal' color"]); this.normalColor = () => _sysColorIdxNormal;
    const _sysColorIdxWarning = Number(this.parameters["System 'Warning' color"]); this.warningColor = () => _sysColorIdxWarning;

    // 15 all buttons, 12 includes all extended butttons, 10 excludes analog stick presses, 8 excludes Select+Start, 4 includes ONLY action buttons
    const _minimumAmountOfButtonsRequired = Number(this.parameters['Required gamepad buttons']);
    const _buttonReqNotMetAction = Number(this.parameters['Action for req not met']);

    const _rightAnalogThreshold = 0.5; // Fixed decimal as for left analog stick...
    const _calibrationThreshold = 0.8; // Calibration threshold must be higher to avoid errors in user input

    let _keyboardDisabled = _disableKeyboardInput;
    let _touchDisabled = _disableTouchInput;
    const _bannedGamepads = [];

    const _kbButtonTextOffsetXY = [10, 10];

    const _preLoadBitmaps = ['input_ex/input_ex', 'input_ex/gamepad_remap', 'input_ex/kb_remap', 'input_ex/mouse_remap'];

    const _unsupportedGamepads = []; //https://w3c.github.io/gamepad

    const _buttonCE = (_buttonCE_Enabled) ?
        [
            Number(this.parameters['L1 button CE'] || 0),
            Number(this.parameters['R1 button CE'] || 0),
            Number(this.parameters['L2 button CE'] || 0),
            Number(this.parameters['R2 button CE'] || 0),
            Number(this.parameters['Select button CE'] || 0),
            Number(this.parameters['Start button CE'] || 0),
            Number(this.parameters['Left analog pressed CE'] || 0),
            Number(this.parameters['Right analog pressed CE'] || 0),
            Number(this.parameters['Mouse wheel up CE'] || 0),
            Number(this.parameters['Mouse wheel down CE'] || 0),
            Number(this.parameters['Mouse wheel press CE'] || 0),
            Number(this.parameters['Mouse extra button1 CE'] || 0),
            Number(this.parameters['Mouse extra button2 CE'] || 0)
        ] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const _kbCE = {};
    for (let i = 0; i < _buttonCE.length; i++) {
        if (_buttonCE[i]) {
            let p = '';
            switch (i) {
                case 0: p = "pageup"; break; // L1
                case 1: p = "pagedown"; break; // R1
                case 2: p = "home"; break; // L2
                case 3: p = "end"; break; // R2
                case 4: p = "select"; break; // Select
                case 5: p = "start"; break; // Start
                case 6: p = "aleft"; break; // Analog left press
                case 7: p = "aright"; break; // Analog right press
            } if (p) {
                _kbCE[p] = _buttonCE[i];
            }
        }
    } Input.checkCommonEventsKB = function (state2, player_index) {
        const s = OcRam.scene(); if (!s || (!s.isMap() && !s.isBattle())) return;
        if (state2) {
            for (const p in _kbCE) {
                if (this._currentState2[p]) {
                    if (Imported.OcRam_Local_Coop) {
                        OcRam.Local_Coop.setPlayerInTurn(player_index);
                    } OcRam.runCE(Number(_kbCE[p]));
                }
            }
        } else {
            for (const p in _kbCE) {
                if (this._currentState[p]) {
                    if (Imported.OcRam_Local_Coop) {
                        OcRam.Local_Coop.setPlayerInTurn(1);
                    } OcRam.runCE(Number(_kbCE[p]));
                }
            }
        }
    };

    if (!_buttonCE[0] && !_buttonCE[1]) { // Toggle actor buttons on gamepad...
        Input.checkActorToggle = function (buttons, last_state, gamepad_index) {
            if (buttons[Input.gamepadMapperInv['pagedown']]) { // R1
                if (!last_state[Input.gamepadMapperInv['pagedown']] && buttons[Input.gamepadMapperInv['pagedown']].pressed) {
                    if ($gameMap._mapId) { $gameMap.focusToNextActor(gamepad_index); return; }
                }
            } if (buttons[Input.gamepadMapperInv['pageup']]) { // L1
                if (!last_state[Input.gamepadMapperInv['pageup']] && buttons[Input.gamepadMapperInv['pageup']].pressed) {
                    if ($gameMap._mapId) { $gameMap.focusToPreviousActor(gamepad_index); return; }
                }
            }
        };
        Input.checkActorToggleKB = function (state2) {
            if (!$gameMap || !$gameMap._mapId) return;
            if (state2) {
                if (this._currentState2['pagedown']) $gameMap.focusToNextActor(-2);
                if (this._currentState2['pageup']) $gameMap.focusToPreviousActor(-2);
            } else {
                if (this._currentState['pagedown']) $gameMap.focusToNextActor(-1);
                if (this._currentState['pageup']) $gameMap.focusToPreviousActor(-1);
            }
        };
    } else if (!_buttonCE[0]) { // L1 has common event...
        Input.checkActorToggle = function (buttons, last_state, gamepad_index) {
            if (buttons[Input.gamepadMapperInv['pagedown']]) { // R1
                if (!last_state[Input.gamepadMapperInv['pagedown']] && buttons[Input.gamepadMapperInv['pagedown']].pressed) {
                    if ($gameMap._mapId) { $gameMap.focusToNextActor(gamepad_index); return; }
                }
            }
        };
        Input.checkActorToggleKB = function (state2) {
            if (!$gameMap._mapId) return;
            if (state2) {
                if (this._currentState2['pagedown']) $gameMap.focusToNextActor(-2);
            } else {
                if (this._currentState['pagedown']) $gameMap.focusToNextActor(-1);
            }
        };
    } else if (!_buttonCE[1]) { // R1 has common event...
        Input.checkActorToggle = function (buttons, last_state, gamepad_index) {
            if (buttons[Input.gamepadMapperInv['pageup']]) { // L1
                if (!last_state[Input.gamepadMapperInv['pageup']] && buttons[Input.gamepadMapperInv['pageup']].pressed) {
                    if ($gameMap._mapId) { $gameMap.focusToPreviousActor(gamepad_index); return; }
                }
            }
        };
        Input.checkActorToggleKB = function (state2) {
            if (!$gameMap._mapId) return;
            if (state2) {
                if (this._currentState2['pageup']) $gameMap.focusToPreviousActor(-2);
            } else {
                if (this._currentState['pageup']) $gameMap.focusToPreviousActor(-1);
            }
        };
    } else { // L1 and R1 has common event >> Must be handled in common event...
        Input.checkActorToggle = () => { };
        Input.checkActorToggleKB = () => { };
    }

    const _validateIndicatorStruct = param => {
        if (!this.parameters[param]) return [param, "abutton", 320, 320, 3, "Push", "Pushed"];
        const struct = JSON.parse(this.parameters[param]);
        if (!struct || struct.length < 6) return [param, "abutton", 320, 320, 3, "Push", "Pushed"];
        const ret = struct; if (!struct[0]) ret = param;
        if (!struct[1]) struct[1] = "abutton"; struct[1] = "input_ex/" + struct[1];
        if (struct[2]) ret[2] = Number(struct[2]);
        if (_preLoadBitmaps.indexOf(struct[1]) < 0) _preLoadBitmaps.push(struct[1]);
        if (struct[3]) ret[3] = Number(struct[3]);
        if (struct[4]) ret[4] = Number(struct[4]);
        if (!struct[5]) struct[5] = "Push"; if (!struct[6]) struct[6] = "Pushed";
        return ret;
    }; const _indicatorStructs = {};

    [ // Validate all indicator structs from plugin paramater arrays...
        'Left Analog Stick Horz', 'Left Analog Stick Vert', 'Right Analog Stick Horz', 'Right Analog Stick Vert',
        'A button', 'B button', 'Y button', 'X button', 'L1 button', 'R1 button', 'L2 button', 'R2 button',
        'Select button', 'Start button', 'Left analog button', 'Right analog button', 'D-Pad Up', 'D-Pad Down', 'D-Pad Left', 'D-Pad Right',
        'Mouse primary button', 'Mouse secondary button', 'Mouse extra button1', 'Mouse extra button2', 'Mouse mid button', 'Mouse wheel up', 'Mouse wheel down',
        'KB Up', 'KB Down', 'KB Left', 'KB Right', 'KB OK', 'KB Cancel', 'KB Dash', 'KB Menu', 'KB L1', 'KB R1', 'KB L2', 'KB R2',
        'KB Select', 'KB Start', 'KB A-Left', 'KB A-Right'
    ].forEach(struct => { _indicatorStructs[struct] = _validateIndicatorStruct(struct); });
    
    let checkButtonCE = [
        () => false, () => false, () => false, () => false,
        () => false, () => false, () => false, () => false,
        () => false, () => false, () => false, () => false, () => false
    ];

    let _remappedKb1 = {}; let _remappedKb2 = {};
    Input.remappedKb1Keys = {}; Input.remappedKb2Keys = {};

    let _lastWarning = ""; // To be used when cancel sequence has been cancelled >.<
    let _remappedGamepads = {}; // Example of gamepad mapping struct below!
    //_remappedGamepads["Saitek Cyborg V.1 Game Pad (Vendor: xxx Product: yyy)"] = {};
    //_remappedGamepads["Saitek Cyborg V.1 Game Pad (Vendor: xxx Product: yyy)"]["dpad_axes"] = [[5, -1], [5, -0.717555], [5, 0.147555], [5, 0.727555]]
    //_remappedGamepads["Saitek Cyborg V.1 Game Pad (Vendor: xxx Product: yyy)"]["axes"] = [0, 1, 2, 5];
    //_remappedGamepads["Saitek Cyborg V.1 Game Pad (Vendor: xxx Product: yyy)"]["buttons"] = [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    /* gamepad.id = "Xbox 360 Controller (XInput STANDARD GAMEPAD)"; */ // Reminder for OcRam...
    
    for (let i = 0; i < 8; i++) { // Gamepad extra button CE's
        if (_buttonCE[i]) { // Attach common events to buttons (only if defined)
            checkButtonCE[i] = (buttons, last_state, player_index) => {
                const s = OcRam.scene(); if (!s || (!s.isMap() && !s.isBattle())) return;
                if (buttons[i + 4] && !last_state[i + 4] && buttons[i + 4].pressed) {
                    if (Imported.OcRam_Local_Coop) {
                        OcRam.Local_Coop.setPlayerInTurn(player_index);
                    } OcRam.runCE(_buttonCE[i]);
                } return true;
            };
        }
    }

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const makeAlert = msg => { alert(msg); };

    const addToUnsupported = gamepad => {
        if (_unsupportedGamepads.indexOf(gamepad.id) > -1) return; // already added
        const msg = "Gamepad '" + this.formatGamepadName(gamepad.id) + "' is UNSUPPORTED!\nRequired " +
            _minimumAmountOfButtonsRequired + " buttons, but gamepad has " + gamepad.buttons.length + " buttons.";
        switch (_buttonReqNotMetAction) {
            case 0: console.warn(msg); break;
            case 1: case 2: makeAlert(msg); break;
        } _unsupportedGamepads.push(gamepad.id);
    };

    const getHorzVertDir = (horz, vert) => { // Just in case [horz, vert] needs to be converted to single digit...
        if (horz == 4 && vert == 2) return 1;
        if (horz == 6 && vert == 2) return 3;
        if (horz == 4 && vert == 8) return 7;
        if (horz == 6 && vert == 8) return 9;
    };

    let getDevicePlayer = () => 1;
    if (Imported.OcRam_Local_Coop) {
        getDevicePlayer = device_index => { // To whom this device belongs?
            const result = OcRam.Local_Coop.getDevicePlayer(device_index);
            return result < 1 ? 1 : result;
        };
    }

    let getPlayerDevice = () => 1;
    if (Imported.OcRam_Local_Coop) {
        getPlayerDevice = player_number => { // Which device this player uses?
            const result = OcRam.Local_Coop.getPlayerDevice(player_number - 1);
            return result < 0 ? -1 : result;
        };
    }

    const doDualRumble = (gamepad, duration, weak, strong) => {
        if (!_rumbleEnabled || !gamepad || !gamepad.vibrationActuator) return;
        if (_remappedGamepads[gamepad.id] && !_remappedGamepads[gamepad.id]["rumble"]) return;
        gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: duration || 200,
            weakMagnitude: weak || 0,
            strongMagnitude: strong || 1.0
        });
    };

    const indicateWarning = (text, color, do_not_set_last) => {
        _this.debug(text); const s = OcRam.scene(); if (!s) return;
        const w = s._inputWarningWindow; if (!w) return;
        w.updateWarning(text, color);
        if (!do_not_set_last) _lastWarning = text;
    };

    const indicateNextMapping = (text, bitmap, x, y, color, verb) => {
        const s = OcRam.scene(); if (!s) return;
        const w = s._inputStatusWindow; if (!w) return;
        w.updateStatus((verb ? verb + ": " : "") + text, (color === undefined || color === null) ? 3 : color, bitmap, x, y);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.getRemappedGamepads = () => _remappedGamepads;
    this.keyboardDisabled = () => _keyboardDisabled;
    this.touchDisabled = () => _touchDisabled;
    this.getIndicatorStructs = () => _indicatorStructs;
    this.getKBButtonOffsetXY = () => _kbButtonTextOffsetXY;

    this.resetDefaultKB1_KeyCodes = () => {

        let kbc = this.parameters['KB1 key codes'] ?
            OcRam.getArray(this.parameters['KB1 key codes']) :
            [38, 40, 37, 39, 13, 96, 16, 8, 34, 33, 36, 35, 46, 45, 97, 98];
        if (kbc.length != 16) kbc = [38, 40, 37, 39, 13, 96, 16, 8, 34, 33, 36, 35, 46, 45, 97, 98];

        let kbn = this.parameters['KB1 key names'] ?
            OcRam.getArray(this.parameters['KB1 key names']) :
            ["8679", "8681", "8678", "8680", "Ent", "NP0", "Sft", "Bsp", "PDn", "PUp", "Hom", "End", "Del", "Ins", "NP1", "NP2"];
        if (kbn.length != 16) kbn = ["8679", "8681", "8678", "8680", "Ent", "NP0", "Sft", "Bsp", "PDn", "PUp", "Hom", "End", "Del", "Ins", "NP1", "NP2"];

        kbn = kbn.map(itm => itm.length > 3 ? String.fromCharCode(Number(itm)) : itm);

        Input.defaultKeyMapper = { // * = NOT CONFIGURABLE! // 'debug' & 'control' ALWAYS DISABLED ON REMAP !!!!
            // ============== DEBUGGING / FIXED SPECIAL BUTTONS ==============
            120: "debug",   // * F9 *       *       (Debug)
            18: "control",  // * Ctrl *     *       (Debug walk through) (!! Alt-GR = 17 + 18)
            // =============== PRIMARY/PLAYER 1 MAPPINGS BELOW ===============
            [kbc[0]]: "up",       // Up arrow     Up      (Move up)       String.fromCharCode(8679);
            [kbc[1]]: "down",     // Down arrow   Down    (Move down)     String.fromCharCode(8681);
            [kbc[2]]: "left",     // Left arrow   Left    (Move left)     String.fromCharCode(8678);
            [kbc[3]]: "right",    // Right arrow  Rght    (Move right)    String.fromCharCode(8680);
            [kbc[4]]: "ok",       // Enter        Ent     (OK)
            [kbc[5]]: "cancel",   // NP0          NP0     (Cancel)
            [kbc[6]]: "shift",    // Shift        Sft     (Dash)
            [kbc[7]]: "escape",   // Backspace    Bck     (Menu / Escape)
            [kbc[8]]: "pagedown", // Pagedown     PDn     (L1)
            [kbc[9]]: "pageup",   // Pageup       PUp     (R1)
            [kbc[10]]: "home",    // Home         Hom     (L2)
            [kbc[11]]: "end",     // End          End     (R2)
            [kbc[12]]: "start",   // Delete       Del     (Start)
            [kbc[13]]: "select",  // Insert       Ins     (Select)
            [kbc[14]]: "aleft",   // NP1          NP1     (A-Left)
            [kbc[15]]: "aright"   // NP2          NP2     (A-Right)
        }; Input.remappedKb1Keys = {
            "debug": "F9",
            "control": "Ctr",
            "up": kbn[0],
            "down": kbn[1],
            "left": kbn[2],
            "right": kbn[3],
            "ok": kbn[4],
            "cancel": kbn[5],
            "shift": kbn[6],
            "escape": kbn[7],
            "pagedown": kbn[8],
            "pageup": kbn[9],
            "home": kbn[10],
            "end": kbn[11],
            "start": kbn[12],
            "select": kbn[13],
            "aleft": kbn[14],
            "aright": kbn[15]
        }; Input.keyMapper = Input.defaultKeyMapper;

    }; this.resetDefaultKB1_KeyCodes();

    this.resetDefaultKB2_KeyCodes = () => {

        let kbc = this.parameters['KB2 key codes'] ?
            OcRam.getArray(this.parameters['KB2 key codes']) :
            [87, 83, 65, 68, 32, 70, 9, 27, 50, 49, 81, 69, 88, 90, 51, 52];
        if (kbc.length != 16) kbc = [87, 83, 65, 68, 32, 70, 9, 27, 50, 49, 81, 69, 88, 90, 51, 52];

        let kbn = this.parameters['KB2 key names'] ?
            OcRam.getArray(this.parameters['KB2 key names']) :
            ["W", "S", "A", "D", "Spc", "F", "Tab", "Esc", "2", "1", "Q", "E", "X", "Z", "3", "4"];
        if (kbn.length != 16) kbn = ["W", "S", "A", "D", "Spc", "F", "Tab", "Esc", "2", "1", "Q", "E", "X", "Z", "3", "4"];

        kbn = kbn.map(itm => itm.length > 3 ? String.fromCharCode(Number(itm)) : itm);

        Input.defaultKeyMapper2 = {  // ALTERNATIVE/PLAYER 2-4 DEFAULT MAPPINGS BELOW
            [kbc[0]]: "up",       // W   (Move up)
            [kbc[1]]: "down",     // S   (Move down)
            [kbc[2]]: "left",     // A   (Move left)
            [kbc[3]]: "right",    // D   (Move right)
            [kbc[4]]: "ok",       // Spc (OK)
            [kbc[5]]: "cancel",   // F   (Cancel)
            [kbc[6]]: "shift",    // Tab (Dash)
            [kbc[7]]: "escape",   // Esc (Menu / Escape)
            [kbc[8]]: "pagedown", // 2   (L1)
            [kbc[9]]: "pageup",   // 1   (R1)
            [kbc[10]]: "home",    // E   (L2)
            [kbc[11]]: "end",     // Q   (R2)
            [kbc[12]]: "start",   // X   (Start)
            [kbc[13]]: "select",  // Z   (Select)
            [kbc[14]]: "aleft",   // 3   (A-Left)
            [kbc[15]]: "aright"   // 4   (A-Right)
        }; Input.remappedKb2Keys = {
            "up": kbn[0],
            "down": kbn[1],
            "left": kbn[2],
            "right": kbn[3],
            "ok": kbn[4],
            "cancel": kbn[5],
            "shift": kbn[6],
            "escape": kbn[7],
            "pagedown": kbn[8],
            "pageup": kbn[9],
            "home": kbn[10],
            "end": kbn[11],
            "start": kbn[12],
            "select": kbn[13],
            "aleft": kbn[14],
            "aright": kbn[15]
        }; Input.keyMapper2 = Input.defaultKeyMapper2;

    }; this.resetDefaultKB2_KeyCodes();

    const _bitMaps = {};
    this.preLoadResources = () => {
        _preLoadBitmaps.forEach(bm => {
            const tmp = ImageManager.loadPicture(bm);
            _bitMaps[bm] = tmp; this.debug("Preloaded bitmap:", tmp);
        }); // Get bitmaps for cache...
    }; requestAnimationFrame(() => { this.preLoadResources(); });
    this.bitmaps = () => _bitMaps;

    this.formatGamepadName = (name_in, warning) => {
        let name = (name_in + "(").split("(")[0];
        if (name == "") name = name_in;
        if (warning) { // Not enough buttons / axes!
            name = "! " + name + " !";
        } if (name.length > 32) name = name.left(32) + "...";
        return name;
    };

    this.enableAllInput = () => {
        Input.enableKeyboard();
        Input.enableGamepads();
        TouchInput.enableTouchInput();
    };

    this.disableAllInput = () => {
        Input.disableKeyboard();
        Input.disableGamepads();
        TouchInput.disableTouchInput();
    };

    this.bannedGamepads = () => _bannedGamepads;

    this.openOptions = () => {

        const s = OcRam.scene();

        if (s) {
            if (s.isTitle()) {
                s._commandWindow.close();
                SceneManager.push(Scene_Input_Options);
                return;
            } else if (s.isMap()) {
                SceneManager.push(Scene_Input_Options);
                return;
            }
        } SceneManager.goto(Scene_Input_Options);

    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    Input.dualRumble = (duration, weak, strong, player) => { // Player 1 - 4, 0 = All players
        if (!_rumbleEnabled) return;
        if (navigator.getGamepads) {
            const gamepads = navigator.getGamepads();
            if (gamepads) {
                for (const gamepad of gamepads) {
                    if (gamepad && gamepad.connected) {
                        if (player) {
                            const pd = getPlayerDevice(player);
                            if (pd === null || pd === undefined) return;
                            const dp = getDevicePlayer(gamepad.index);
                            if (pd == gamepad.index || (pd < 0 && dp == 1)) {
                                doDualRumble(gamepad, duration, weak, strong);
                            }
                        } else {
                            doDualRumble(gamepad, duration, weak, strong);
                        }
                    }
                }
            }
        }
    };

    Input.resetRumble = (player) => { // Player 1 - 4, 0 = All players
        if (!_rumbleEnabled) return;
        if (navigator.getGamepads) {
            const gamepads = navigator.getGamepads();
            if (gamepads) {
                for (const gamepad of gamepads) {
                    if (gamepad && gamepad.connected) {
                        if (player) {
                            const pd = getPlayerDevice(player);
                            if (pd === null || pd === undefined) return;
                            const dp = getDevicePlayer(gamepad.index);
                            if (pd == gamepad.index || (pd < 0 && dp == 1)) {
                                gamepad.vibrationActuator.reset();
                            }
                        } else {
                            gamepad.vibrationActuator.reset();
                        }
                    }
                }
            }
        }
    };

    Input.enableKeyboard = function () {
        _keyboardDisabled = false;
        if (!document.onkeydown) document.addEventListener("keydown", this._onKeyDown.bind(this));
        if (!document.onkeyup) document.addEventListener("keyup", this._onKeyUp.bind(this));
    };

    Input.disableKeyboard = () => {
        _keyboardDisabled = true;
        document.removeEventListener("keydown");
        document.removeEventListener("keyup");
    };

    if (_minimumAmountOfButtonsRequired) { // Check button amounts at all?
        const _org_updateGamepadState = Input._updateGamepadState;
        if (_buttonReqNotMetAction == 3) { // Just block gamepads with too few buttons...
            Input._updateGamepadState = function (gamepad) {
                if (gamepad.buttons.length < _minimumAmountOfButtonsRequired) return;
                _org_updateGamepadState.apply(this, arguments);
            };
        } else if (_buttonReqNotMetAction == 2) { // Block AND alert gamepads with too few buttons...
            Input._updateGamepadState = function (gamepad) {
                if (gamepad.buttons.length < _minimumAmountOfButtonsRequired) {
                    addToUnsupported(gamepad); return;
                } _org_updateGamepadState.apply(this, arguments);
            };
        } else {
            Input._updateGamepadState = function (gamepad) { // DON'T Block, but alert or log gamepads with too few buttons...
                if (gamepad.buttons.length < _minimumAmountOfButtonsRequired) addToUnsupported(gamepad);
                _org_updateGamepadState.apply(this, arguments);
            };
        }
    }
    
    this._org_pollgamepads = Input._pollGamepads;
    Input.enableGamepads = function () {
        Input._pollGamepads = function () {
            _this._org_pollgamepads.call(this);
        };
    };

    Input.disableGamepads = function () {
        Input._pollGamepads = () => { };
    };

    /*TouchInput._onWheel = function (event) {
        this._newState.wheelX += event.deltaX;
        this._newState.wheelY += event.deltaY;
        event.preventDefault();
    };*/

    TouchInput.enableTouchInput = function () {
        _touchDisabled = false;
        const pf = { passive: false };
        if (!document.onmousedown) document.addEventListener("mousedown", this._onMouseDown.bind(this));
        if (!document.onmousemove) document.addEventListener("mousemove", this._onMouseMove.bind(this));
        if (!document.onmouseup) document.addEventListener("mouseup", this._onMouseUp.bind(this));
        if (!document.onwheel) document.addEventListener("wheel", this._onWheel.bind(this), pf);
        if (!document.ontouchstart) document.addEventListener("touchstart", this._onTouchStart.bind(this), pf);
        if (!document.ontouchmove) document.addEventListener("touchmove", this._onTouchMove.bind(this), pf);
        if (!document.ontouchend) document.addEventListener("touchend", this._onTouchEnd.bind(this));
        if (!document.ontouchcancel) document.addEventListener("touchcancel", this._onTouchCancel.bind(this));
    };

    TouchInput.disableTouchInput = () => {
        _touchDisabled = true;
        document.removeEventListener("mousedown");
        document.removeEventListener("mousemove");
        document.removeEventListener("mouseup");
        document.removeEventListener("wheel");
        document.removeEventListener("touchstart");
        document.removeEventListener("touchmove");
        document.removeEventListener("touchend");
        document.removeEventListener("touchcancel");
    };

    Input.removeMapping = function (gamepad_index) {
        if (!navigator.getGamepads()[gamepad_index]) return;
        const gamepad = navigator.getGamepads()[gamepad_index];
        if (!gamepad) return; const id = gamepad.id;
        if (_remappedGamepads[id]) {
            _this.debug("Saved remappings:", _remappedGamepads);
            delete _remappedGamepads[id]; ConfigManager.save();
        }
    };

    // Here we can see a lot of recursion and some other wonders of JS! \o/
    Input.testKeyboard = function (kb_index) {

        indicateWarning(_cancelMessage, _this.warningColor());

        let cancel_handle = 0; let cancel_flag = false;
        let secs_to_go = 3; const s = OcRam.scene();

        Input.clear();

        if (s) {
            if (kb_index == 1) {
                s._oldMapper = Input.keyMapper2;
                Input.keyMapper2 = {};
            } else {
                s._oldMapper = Input.keyMapper;
                Input.keyMapper = {};
            }
        }

        const cancelCalibration = () => {

            const cp = Input.isPressed('cancel');

            if (cp) {
                if (!cancel_handle) {
                    if (cancel_flag) return;
                    _this.debug("START CANCEL TIMER");
                    cancel_handle = setInterval(() => {
                        if (--secs_to_go < 1) {
                            cancel_flag = true;
                        } indicateWarning(_cancelInMessage.replace("$1", secs_to_go), 2, true);
                    }, 1000);
                }
            } else {
                if (cancel_handle) {
                    Input._currentState['cancel'] = false;
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                    indicateWarning(_lastWarning, _this.warningColor());
                }
            }
            if (cancel_flag) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                } indicateNextMapping("");
                indicateWarning("");
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            } else {
                return false;
            }
        };

        const testButtons = () => {
            if (cancelCalibration()) {
                s.clearKBSprites();
                if (kb_index == 1) {
                    Input.keyMapper2 = s._oldMapper;
                } else {
                    Input.keyMapper = s._oldMapper;
                } Input._pollGamepads = function () { // Restore _pollGamepads
                    _this._org_pollgamepads.call(this);
                }; return;
            } s.testKeyboard(kb_index);
            requestAnimationFrame(() => { testButtons(); });
        }; testButtons();

    };

    // In case someone wonders why "gamepad" is declared so many times over and over again...
    // Answer is simple: You'll need to poll current state (for each frame) from browser to get pressed buttons and/or axes...
    Input.testGamepad = function (gamepad_index) {

        const gp_rm = _remappedGamepads[navigator.getGamepads()[gamepad_index].id];
        const rm_axes = gp_rm ? gp_rm["dpad_axes"] : null;
        const s = OcRam.scene(); let cancel_handle = 0;
        let cancel_flag = false; let secs_to_go = 3;

        indicateWarning(_cancelMessage, _this.warningColor());

        const cancelTest = (gamepad) => {

            if (!gamepad) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                } indicateNextMapping(""); indicateWarning("");
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            }

            const buttons = gamepad.buttons; const gamepad_id = gamepad.id;
            const cb_idx = _remappedGamepads[gamepad_id] ? _remappedGamepads[gamepad_id]['buttons'][1] : 1;
            if (buttons[cb_idx] && buttons[cb_idx].pressed) {
                Input._gamepadStates[gamepad.index][1] = true;
                if (!cancel_handle) {
                    if (cancel_flag) return;
                    _this.debug("START CANCEL TIMER");
                    cancel_handle = setInterval(() => {
                        if (--secs_to_go < 1) {
                            cancel_flag = true;
                        } indicateWarning(_cancelInMessage.replace("$1", secs_to_go), 2, true);
                    }, 1000);
                }
            } else {
                if (!buttons[cb_idx].pressed) {
                    if (cancel_handle) {
                        Input._gamepadStates[gamepad.index][1] = false;
                        _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                        clearInterval(cancel_handle); cancel_handle = 0;
                        indicateWarning(_lastWarning, _this.warningColor());
                    }
                }
            }
            if (cancel_flag) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                }
                indicateNextMapping(""); indicateWarning("");
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            } else {
                return false;
            }
        };

        const mainLoop = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            if (cancelTest(gamepad)) { // Remove new 'test' functions and clear indicators...
                const eb = { pressed: false, value: 0 };
                s.testGamepad([eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb, eb], [0, 0, 0, 0, 0, 0, 0, 0], false); return;
            } const buttons = Input.remapButtons(gamepad.id, gamepad.buttons);
            const axes = Input.remapAxes(gamepad.id, gamepad.axes);
            s.testGamepad(buttons, axes, rm_axes, gamepad.axes);
            requestAnimationFrame(() => { mainLoop() });
        }; mainLoop();

    };

    TouchInput.testMouse = function () {

        const s = OcRam.scene(); let cancel_handle = 0;
        let cancel_flag = false; let secs_to_go = 3;

        indicateWarning(_cancelMessage, _this.warningColor());

        // But1, But2, Mid But, Wheel left (OR button 3), Wheel right (OR button 4), Wheel up, Wheel down
        let buttons = [false, false, false, false, false, false, false];

        let mouse_down_func = event => {
            buttons[5] = false; buttons[6] = false;
            if (event.button === 0) buttons[0] = true;
            else if (event.button === 2) buttons[1] = true;
            else if (event.button === 1) buttons[2] = true;
            else if (event.button === 3) buttons[3] = true;
            else if (event.button === 4) buttons[4] = true;
            else indicateNextMapping("Mouse button " + event.button + " (no binding) was pressed!");
        };

        let mouse_up_func = event => {
            buttons[5] = false; buttons[6] = false;
            if (event.button === 0) buttons[0] = false;
            else if (event.button === 2) buttons[1] = false;
            else if (event.button === 1) buttons[2] = false;
            else if (event.button === 3) buttons[3] = false;
            else if (event.button === 4) buttons[4] = false;
            else indicateNextMapping("Mouse button " + event.button + " (no binding) was released!");
        };

        let mwdh = 0; let mwuh = 0; let mwrh = 0; let mwlh = 0;
        let mouse_wheel_func = event => {
            buttons[4] = false; buttons[3] = false;
            buttons[5] = false; buttons[6] = false;
            if (event.deltaY < 0) {
                buttons[5] = true; if (mwdh) clearTimeout(mwdh);
                mwdh = setTimeout(() => { buttons[5] = false; }, 200);
            }
            else if (event.deltaY > 0) {
                buttons[6] = true; if (mwuh) clearTimeout(mwuh);
                mwuh = setTimeout(() => { buttons[6] = false; }, 200);
            }
            if (event.deltaX < 0) {
                buttons[4] = true;
                if (mwlh) clearTimeout(mwlh);
                mwlh = setTimeout(() => { buttons[4] = false; }, 200);
            }
            else if (event.deltaX > 0) {
                buttons[3] = true;
                if (mwrh) clearTimeout(mwrh);
                mwrh = setTimeout(() => { buttons[3] = false; }, 200);
            }
        };

        // Register new 'test' functions
        document.addEventListener("mousedown", mouse_down_func);
        document.addEventListener("mouseup", mouse_up_func);
        document.addEventListener("wheel", mouse_wheel_func);

        const cancelTest = () => {
            if (buttons[1]) {
                if (!cancel_handle) {
                    if (cancel_flag) return;
                    _this.debug("START CANCEL TIMER");
                    cancel_handle = setInterval(() => {
                        if (--secs_to_go < 1) {
                            cancel_flag = true;
                        } indicateWarning(_cancelInMessage.replace("$1", secs_to_go), 2, true);
                    }, 1000);
                }
            } else {
                if (!buttons[1]) {
                    if (cancel_handle) {
                        _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                        clearInterval(cancel_handle); cancel_handle = 0;
                        indicateWarning(_lastWarning, _this.warningColor());
                    }
                }
            }
            if (cancel_flag) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                }
                indicateNextMapping(""); indicateWarning("");
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            } else {
                return false;
            }
        };

        const mainLoop = () => {
            if (cancelTest()) { // Remove new 'test' functions and clear indicators...
                document.removeEventListener("mousedown", mouse_down_func);
                document.removeEventListener("mouseup", mouse_up_func);
                document.removeEventListener("wheel", mouse_wheel_func);
                s.testMouse([false, false, false, false, false, false, false]); return;
            } s.testMouse(buttons);
            requestAnimationFrame(() => { mainLoop() });
        }; mainLoop();

    };

    const drawMappedKey = (struct, key) => {
        const s = OcRam.scene(); if (!s || !s._backgroundSprite || !s._backgroundSprite.bitmap) return;
        const b = ImageManager.loadPicture(struct[1]);
        const sbm = s._backgroundSprite.bitmap;
        const w = sbm.width; const h = sbm.height;
        const bm = new Bitmap(w, h); bm.blt(sbm, 0, 0, w, h, 0, 0);
        bm.fontSize = 16; bm.textColor = _this.parameters['Inactive text'] || "#444444";
        bm.drawText(('' + key), Number(struct[2]), Number(struct[3]), b.width, b.height, "center");
        s._backgroundSprite.bitmap = bm;
    };

    Input.remapKeyboard = function (kb_index) {

        indicateWarning(_cancelMessage, _this.warningColor()); const prev_warning = _lastWarning;

        let cancel_handle = 0; let cancel_flag = false;
        let secs_to_go = 3; let buttons_done = 0;
        let timer_h = 0; let _registeredKeys = [];
        let _currentStruct = _indicatorStructs['KB Up'];

        indicateNextMapping.apply(this, _currentStruct);

        const buttons = [ // Get Input states...
            'up', 'down', 'left', 'right',
            'ok', 'cancel', 'shift', 'escape',
            'pageup', 'pagedown', 'home', 'end',
            'select', 'start', 'aleft', 'aright'
        ]; const bindings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        const key_down_func = event => {

            if (Input._shouldPreventDefault(event.keyCode)) event.preventDefault();
            if (event.keyCode === 144) this.clear(); // Numlock

            if ((event.keyCode > 111 && event.keyCode < 124) || event.keyCode === 17 || event.keyCode === 18) {
                indicateWarning("Reserved key F1 - F12, ALT or Control!", _this.warningColor());
                if (!timer_h) timer_h = setTimeout(() => { indicateWarning(prev_warning, _this.warningColor()); timer_h = 0; }, 2000); return;
            } const kc = event.keyCode;

            if (kb_index == 1) { // LAYOUT 1
                if (Input.keyMapper2[kc]) { // Key is in use for layout2?
                    indicateWarning("Key already in use for KB layout 2!", _this.warningColor());
                    if (!timer_h) timer_h = setTimeout(() => { indicateWarning(prev_warning, _this.warningColor()); timer_h = 0; }, 2000); return;
                } if (bindings.indexOf(kc) < 0) {
                    bindings[buttons_done++] = kc; _registeredKeys.push(OcRam.getShortKey(event.key, event.keyCode));
                    drawMappedKey(_currentStruct, _registeredKeys[_registeredKeys.length - 1]);
                    switch (buttons_done) {
                        case 1: _currentStruct = _indicatorStructs['KB Down']; break;
                        case 2: _currentStruct = _indicatorStructs['KB Left']; break;
                        case 3: _currentStruct = _indicatorStructs['KB Right']; break;
                        case 4: _currentStruct = _indicatorStructs['KB OK']; break;
                        case 5: _currentStruct = _indicatorStructs['KB Cancel']; break;
                        case 6: _currentStruct = _indicatorStructs['KB Dash']; break;
                        case 7: _currentStruct = _indicatorStructs['KB Menu']; break;
                        case 8: _currentStruct = _indicatorStructs['KB L1']; break;
                        case 9: _currentStruct = _indicatorStructs['KB R1']; break;
                        case 10: _currentStruct = _indicatorStructs['KB L2']; break;
                        case 11: _currentStruct = _indicatorStructs['KB R2']; break;
                        case 12: _currentStruct = _indicatorStructs['KB Select']; break;
                        case 13: _currentStruct = _indicatorStructs['KB Start']; break;
                        case 14: _currentStruct = _indicatorStructs['KB A-Left']; break;
                        case 15: _currentStruct = _indicatorStructs['KB A-Right']; break;
                    } indicateNextMapping.apply(this, _currentStruct);
                } else { // Key is in use for this layout?
                    //indicateWarning("Key already in use for this layout!");
                    //setTimeout(() => { indicateWarning(prev); }, 2000); return;
                }
            } else if (kb_index == 2) { // LAYOUT 2
                if (Input.keyMapper[kc]) { // Key is in use for layout1?
                    indicateWarning("Key already in use for KB layout 1!", _this.warningColor());
                    if (!timer_h) timer_h = setTimeout(() => { indicateWarning(prev_warning, _this.warningColor()); timer_h = 0; }, 2000); return;
                } if (bindings.indexOf(kc) < 0) {
                    bindings[buttons_done++] = kc; _registeredKeys.push(OcRam.getShortKey(event.key, event.keyCode));
                    drawMappedKey(_currentStruct, _registeredKeys[_registeredKeys.length - 1]);
                    switch (buttons_done) {
                        case 1: _currentStruct = _indicatorStructs['KB Down']; break;
                        case 2: _currentStruct = _indicatorStructs['KB Left']; break;
                        case 3: _currentStruct = _indicatorStructs['KB Right']; break;
                        case 4: _currentStruct = _indicatorStructs['KB OK']; break;
                        case 5: _currentStruct = _indicatorStructs['KB Cancel']; break;
                        case 6: _currentStruct = _indicatorStructs['KB Dash']; break;
                        case 7: _currentStruct = _indicatorStructs['KB Menu']; break;
                        case 8: _currentStruct = _indicatorStructs['KB L1']; break;
                        case 9: _currentStruct = _indicatorStructs['KB R1']; break;
                        case 10: _currentStruct = _indicatorStructs['KB L2']; break;
                        case 11: _currentStruct = _indicatorStructs['KB R2']; break;
                        case 12: _currentStruct = _indicatorStructs['KB Select']; break;
                        case 13: _currentStruct = _indicatorStructs['KB Start']; break;
                        case 14: _currentStruct = _indicatorStructs['KB A-Left']; break;
                        case 15: _currentStruct = _indicatorStructs['KB A-Right']; break;
                    } indicateNextMapping.apply(this, _currentStruct);
                } else { // Key is in use for this layout?
                    //indicateWarning("Key already in use for this layout!");
                    //setTimeout(() => { indicateWarning(prev); }, 2000); return;
                }
            }

        };

        const save_config = () => {
            document.removeEventListener("keydown", key_down_func); clearTimeout();
            indicateNextMapping("Keyboard (layout " + kb_index + ") remapping saved!", null, 0, 0, _this.okColor());
            if (kb_index == 1) {
                _remappedKb1 = {
                    // ============== DEBUGGING / FIXED SPECIAL BUTTONS ==============
                    120: "debug",   // * F9 *       *       (Debug)
                    18: "control",  // * Ctrl *     *       (Debug walk through) (!! Alt-GR = 17 + 18)
                    // NEW BUTTONS
                    [bindings[0]]: buttons[0], [bindings[1]]: buttons[1], [bindings[2]]: buttons[2], [bindings[3]]: buttons[3],
                    [bindings[4]]: buttons[4], [bindings[5]]: buttons[5], [bindings[6]]: buttons[6], [bindings[7]]: buttons[7],
                    [bindings[8]]: buttons[8], [bindings[9]]: buttons[9], [bindings[10]]: buttons[10], [bindings[11]]: buttons[11],
                    [bindings[12]]: buttons[12], [bindings[13]]: buttons[13], [bindings[14]]: buttons[14], [bindings[15]]: buttons[15]
                }; Input.keyMapper = _remappedKb1
                Input.remappedKb1Keys = {
                    'up': _registeredKeys[0], 'down': _registeredKeys[1], 'left': _registeredKeys[2], 'right': _registeredKeys[3],
                    'ok': _registeredKeys[4], 'cancel': _registeredKeys[5], 'shift': _registeredKeys[6], 'escape': _registeredKeys[7],
                    'pageup': _registeredKeys[8], 'pagedown': _registeredKeys[9], 'home': _registeredKeys[10], 'end': _registeredKeys[11],
                    'select': _registeredKeys[12], 'start': _registeredKeys[13], 'aleft': _registeredKeys[14], 'aright': _registeredKeys[15]
                }; _this.debug("SAVED LAYOUT 1", _remappedKb1, Input.remappedKb1Keys);
            } else {
                _remappedKb2 = { // NEW BUTTONS for layout 2
                    [bindings[0]]: [buttons[0]], [bindings[1]]: [buttons[1]], [bindings[2]]: [buttons[2]], [bindings[3]]: [buttons[3]],
                    [bindings[4]]: [buttons[4]], [bindings[5]]: [buttons[5]], [bindings[6]]: [buttons[6]], [bindings[7]]: [buttons[7]],
                    [bindings[8]]: [buttons[8]], [bindings[9]]: [buttons[9]], [bindings[10]]: [buttons[10]], [bindings[11]]: [buttons[11]],
                    [bindings[12]]: [buttons[12]], [bindings[13]]: [buttons[13]], [bindings[14]]: [buttons[14]], [bindings[15]]: [buttons[15]]
                }; Input.keyMapper2 = _remappedKb2
                Input.remappedKb2Keys = {
                    'up': _registeredKeys[0], 'down': _registeredKeys[1], 'left': _registeredKeys[2], 'right': _registeredKeys[3],
                    'ok': _registeredKeys[4], 'cancel': _registeredKeys[5], 'shift': _registeredKeys[6], 'escape': _registeredKeys[7],
                    'pageup': _registeredKeys[8], 'pagedown': _registeredKeys[9], 'home': _registeredKeys[10], 'end': _registeredKeys[11],
                    'select': _registeredKeys[12], 'start': _registeredKeys[13], 'aleft': _registeredKeys[14], 'aright': _registeredKeys[15]
                }; _this.debug("SAVED LAYOUT 2", _remappedKb1, Input.remappedKb2Keys);
            } indicateWarning("");

            ConfigManager.save();

            const s = OcRam.scene(); if (s) {
                if (s._inputDevicesWindow) {
                    s.setBackground('input_ex/input_ex');
                    s._inputDevicesWindow.activate();
                }
            }
        };

        document.addEventListener("keydown", key_down_func);

        const cancelCalibration = () => {

            const cp = Input.isPressed('cancel');

            if (cp) {
                if (!cancel_handle) {
                    if (cancel_flag) return;
                    _this.debug("START CANCEL TIMER");
                    cancel_handle = setInterval(() => {
                        if (--secs_to_go < 1) {
                            cancel_flag = true;
                        } indicateWarning(_cancelInMessage.replace("$1", secs_to_go), 2, true);
                    }, 1000);
                }
            } else {
                if (cancel_handle) {
                    Input._currentState['cancel'] = false;
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                    indicateWarning(_lastWarning, _this.warningColor()); return false;
                }
            }
            if (cancel_flag) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                } indicateNextMapping(_noChangesWereMade, null, 0, 0, _this.warningColor());
                indicateWarning(_mappingCancelled, _this.warningColor());
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            } else {
                return false;
            }
        };

        const getButtons = () => {
            if (cancelCalibration()) {
                document.removeEventListener("keydown", key_down_func);
                clearTimeout(); return;
            } if (buttons_done > 15) { save_config(); return; }
            requestAnimationFrame(() => { getButtons(); });
        }; getButtons();

    };

    Input.remapGamepad = function (gamepad_index, item) {

        if (!navigator.getGamepads) return;
        if (!navigator.getGamepads()[gamepad_index]) return;

        indicateWarning(_cancelMessage, _this.warningColor());

        let default_axe_values = navigator.getGamepads()[gamepad_index].axes;

        let new_left_axes = [];
        let new_right_axes = [];
        let new_act_buttons = [];
        let new_shoulder_buttons = [];
        let new_ss_buttons = [];
        let new_analog_buttons = [];
        let new_d_pad_buttons = [];
        let new_d_pad_axes = [];
        let cancel_handle = 0;
        let cancel_flag = false;
        let secs_to_go = 3;

        const cancelCalibration = (gamepad) => {
            const buttons = gamepad.buttons; const gamepad_id = gamepad.id;
            const cb_idx = (new_act_buttons.length > 1) ? new_act_buttons[1] : _remappedGamepads[gamepad_id] ? _remappedGamepads[gamepad_id]['buttons'][1] : 1;
            if (buttons[cb_idx] && buttons[cb_idx].pressed) {
                Input._gamepadStates[gamepad.index][1] = true;
                if (!cancel_handle) {
                    if (cancel_flag) return;
                    _this.debug("START CANCEL TIMER");
                    cancel_handle = setInterval(() => {
                        if (--secs_to_go < 1) {
                            cancel_flag = true;
                        } indicateWarning(_cancelInMessage.replace("$1", secs_to_go), 2, true);
                    }, 1000);
                }
            } else {
                if (!buttons[cb_idx].pressed) {
                    if (cancel_handle) {
                        Input._gamepadStates[gamepad.index][1] = false;
                        _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                        clearInterval(cancel_handle); cancel_handle = 0;
                        indicateWarning(_lastWarning, _this.warningColor());
                    }
                }
            }
            if (cancel_flag) {
                if (cancel_handle) {
                    _this.debug("STOP CANCEL TIMER"); secs_to_go = 3;
                    clearInterval(cancel_handle); cancel_handle = 0;
                }
                indicateNextMapping(_noChangesWereMade, null, 0, 0, _this.warningColor());
                indicateWarning(_mappingCancelled, _this.warningColor());
                const s = OcRam.scene(); if (s) {
                    if (s._inputDevicesWindow) {
                        s.setBackground('input_ex/input_ex');
                        s._inputDevicesWindow.activate();
                    }
                } return true;
            } else {
                return false;
            }
        };

        const rumbleCheck = (gamepad, cb) => {
            if (!_rumbleEnabled) {
                _remappedGamepads[gamepad.id]["rumble"] = false;
                setTimeout(() => { indicateWarning(""); }, 1000);
                cb.call(this); return;
            }
            if (gamepad && gamepad.vibrationActuator) {
                indicateNextMapping(_this.parameters['Rumble confirm'] || "'OK' = ENABLE RUMBLE / 'Cancel' = DISABLE RUMBLE");
                const waitForInput = () => {
                    const gamepad = navigator.getGamepads()[gamepad_index];
                    const buttons = gamepad.buttons;
                    const ok_pressed = buttons[new_act_buttons[0]] && buttons[new_act_buttons[0]].pressed;
                    const cancel_pressed = buttons[new_act_buttons[1]] && buttons[new_act_buttons[1]].pressed;
                    if (ok_pressed) {
                        Input._gamepadStates[gamepad.index][0] = true;
                        indicateWarning(_this.parameters['Rumble enabled'] || "RUMBLE IS ENABLED!", _this.okColor());
                        _remappedGamepads[gamepad.id]["rumble"] = true;
                        cb.call(this); doDualRumble(gamepad, 2000, 1, 1); return;
                    } else if (cancel_pressed) {
                        Input._gamepadStates[gamepad.index][1] = true;
                        indicateWarning(_this.parameters['Rumble disabled'] || "RUMBLE IS DISABLED!", _this.warningColor());
                        _remappedGamepads[gamepad.id]["rumble"] = false;
                        cb.call(this); return;
                    } else {
                        requestAnimationFrame(() => { waitForInput(); });
                    }
                }; waitForInput();
            } else { // Rumble NOT available for this gamepad!
                indicateWarning(_this.parameters['Rumble not available'] || "RUMBLE feature wasn't available for this gamepad!", _this.warningColor());
                _remappedGamepads[gamepad.id]["rumble"] = false; cb.call(this); return;
            }
        };

        const saveConfig = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            if (!_remappedGamepads[gamepad.id]) {
                _remappedGamepads[gamepad.id] = {};
            } _remappedGamepads[gamepad.id]["axes"] = new_left_axes.concat(new_right_axes);
            _remappedGamepads[gamepad.id]["buttons"] = new_act_buttons
                .concat(new_shoulder_buttons)
                .concat(new_ss_buttons)
                .concat(new_analog_buttons)
                .concat(new_d_pad_buttons);
            const buttons = gamepad.buttons;
            const remaining_buttons = (buttons.length - (_remappedGamepads[gamepad.id]["buttons"].length)) + 16;
            if (remaining_buttons > 0) for (let i = 16; i < remaining_buttons; i++) _remappedGamepads[gamepad.id]["buttons"].push(i);
            if (new_d_pad_axes.length > 3) {
                _remappedGamepads[gamepad.id]["dpad_axes"] = new_d_pad_axes;
            } else {
                _remappedGamepads[gamepad.id]["dpad_axes"] = false;
            } rumbleCheck(gamepad, () => {
                _this.debug("Saved remappings:", _remappedGamepads);
                const s = OcRam.scene(); if (s) {
                    s.setBackground('input_ex/input_ex');
                    if (s._inputStatusWindow) s._inputStatusWindow.updateStatus((_this.parameters['Saved mapping'] ||
                        "Saved mapping for:") + " " + _this.formatGamepadName(gamepad.id), _this.okColor());
                    if (s._inputDevicesWindow) s._inputDevicesWindow.activate();
                } ConfigManager.save();
            });
        };

        let dpad_buts_done = 0; let new_dpad_values = [];
        let buts_disabled = false; let axes_disabled = false;

        const getDPad = (init_dpad) => {

            if (init_dpad) {
                indicateNextMapping.apply(this, _indicatorStructs['D-Pad Up']);
            } const gamepad = navigator.getGamepads()[gamepad_index];
            if (cancelCalibration(gamepad)) return;

            if (!buts_disabled) { // D-Pad input has 'digital' signal
                const buttons = gamepad.buttons;
                for (let i = 0; i < buttons.length; i++) {
                    if (buttons[i].pressed) {
                        if (new_d_pad_buttons.indexOf(i) < 0 && new_analog_buttons.indexOf(i) < 0 &&
                            new_ss_buttons.indexOf(i) < 0 && new_shoulder_buttons.indexOf(i) < 0 && new_act_buttons.indexOf(i) < 0) {
                            switch (dpad_buts_done) {
                                case 0: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Down']); break;
                                case 1: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Left']); break;
                                case 2: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Right']); break;
                            } new_d_pad_buttons.push(i); axes_disabled = true; dpad_buts_done++;
                        }
                    }
                }
                if (axes_disabled) {
                    if (dpad_buts_done < 4) {
                        requestAnimationFrame(() => { getDPad() });
                    } else {
                        _this.debug("NEW D-PAD BUTTONS: [" + new_d_pad_buttons[0] + ", " + new_d_pad_buttons[1] + ", " + new_d_pad_buttons[2] + ", " + new_d_pad_buttons[3] + "]");
                        saveConfig(); return;
                    }
                }
            }

            if (!axes_disabled) { // D-Pad input has 'analog' signal...
                const axes = gamepad.axes;
                for (let i = 0; i < axes.length; i++) {
                    const v = axes[i];
                    if (v <= 1 && v >= -1 && v != default_axe_values[i]) {
                        if (new_left_axes.indexOf(i) < 0 && new_right_axes.indexOf(i) < 0 && new_dpad_values.indexOf(v) < 0) {
                            switch (dpad_buts_done) {
                                case 0: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Down']); break;
                                case 1: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Left']); break;
                                case 2: indicateNextMapping.apply(this, _indicatorStructs['D-Pad Right']); break;
                            } new_d_pad_axes.push([i, v]); new_dpad_values.push(v); buts_disabled = true; dpad_buts_done++;
                        }
                    }
                }
                if (dpad_buts_done < 4) {
                    requestAnimationFrame(() => { getDPad() });
                } else {
                    new_d_pad_buttons = [12, 13, 14, 15]; // Use dummy buttons... RPG Maker wants 'em...
                    _this.debug("NEW D-PAD AXES: [" + new_d_pad_axes[0][0] + ":" + new_d_pad_axes[0][1].toFixed(2) + ", " +
                        new_d_pad_axes[1][0] + ":" + new_d_pad_axes[1][1].toFixed(2) + ", " + new_d_pad_axes[2][0] + ":" +
                        new_d_pad_axes[2][1].toFixed(2) + ", " + new_d_pad_axes[3][0] + ":" + new_d_pad_axes[3][1].toFixed(2) + "]");
                    saveConfig(); return;
                }
            }

        };

        const getAnalogButtons = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            const buttons = gamepad.buttons; if (cancelCalibration(gamepad)) return;
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].pressed) {
                    if (new_analog_buttons.indexOf(i) < 0 && new_ss_buttons.indexOf(i) < 0 &&
                        new_shoulder_buttons.indexOf(i) < 0 && new_act_buttons.indexOf(i) < 0) {
                        indicateNextMapping.apply(this, _indicatorStructs['Right analog button']);
                        new_analog_buttons.push(i);
                    }
                }
            } if (new_analog_buttons.length < 2) {
                requestAnimationFrame(() => { getAnalogButtons() });
            } else {
                _this.debug("NEW Analog BUTTONS: [" + new_analog_buttons[0] + ", " + new_analog_buttons[1] + "]");
                getDPad(true);
            }
        };

        const getSelectAndStartButtons = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            const buttons = gamepad.buttons; if (cancelCalibration(gamepad)) return;
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].pressed) {
                    if (new_ss_buttons.indexOf(i) < 0 && new_shoulder_buttons.indexOf(i) < 0 && new_act_buttons.indexOf(i) < 0) {
                        indicateNextMapping.apply(this, _indicatorStructs['Start button']);
                        new_ss_buttons.push(i);
                    }
                }
            } if (new_ss_buttons.length < 2) {
                requestAnimationFrame(() => { getSelectAndStartButtons() });
            } else {
                _this.debug("NEW Select and Start BUTTONS: [" + new_ss_buttons[0] + ", " + new_ss_buttons[1] + "]");
                if (gamepad.buttons.length > 9) {
                    indicateNextMapping.apply(this, _indicatorStructs['Left analog button']);
                    getAnalogButtons();
                } else {
                    indicateWarning(_notEnoughButtonsFor.replace("$1", "AL/AR"), _this.warningColor());
                    getDPad(true);
                }
            }
        };

        let s_buts_done = 0;

        const getShoulderButtons = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            const buttons = gamepad.buttons; if (cancelCalibration(gamepad)) return;
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].pressed) {
                    if (new_shoulder_buttons.indexOf(i) < 0 && new_act_buttons.indexOf(i) < 0) {
                        switch (s_buts_done) {
                            case 0: indicateNextMapping.apply(this, _indicatorStructs['R1 button']); s_buts_done++; break;
                            case 1: indicateNextMapping.apply(this, _indicatorStructs['L2 button']); s_buts_done++; break;
                            case 2: indicateNextMapping.apply(this, _indicatorStructs['R2 button']); break;
                        } new_shoulder_buttons.push(i);
                    }
                }
            } if (new_shoulder_buttons.length < 4) {
                requestAnimationFrame(() => { getShoulderButtons() });
            } else {
                _this.debug("NEW SHOULDER BUTTONS: [" + new_shoulder_buttons[0] + ", " + new_shoulder_buttons[1] +
                    ", " + new_shoulder_buttons[2] + ", " + new_shoulder_buttons[3] + "]");
                if (gamepad.buttons.length > 8) {
                    indicateNextMapping.apply(this, _indicatorStructs['Select button']);
                    getSelectAndStartButtons();
                } else {
                    indicateWarning(_notEnoughButtonsFor.replace("$1", "Start/Select"), _this.warningColor());
                    getDPad(true);
                }
            }
        };

        let a_buts_done = 0;

        const getActButtons = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            const buttons = gamepad.buttons; if (cancelCalibration(gamepad)) return;
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].pressed) {
                    if (new_act_buttons.indexOf(i) < 0) {
                        switch (a_buts_done) {
                            case 0: indicateNextMapping.apply(this, _indicatorStructs['B button']); break;
                            case 1: indicateNextMapping.apply(this, _indicatorStructs['X button']); break;
                            case 2: indicateNextMapping.apply(this, _indicatorStructs['Y button']); break;
                        } new_act_buttons.push(i); a_buts_done++;
                    }
                }
            } if (new_act_buttons.length < 4) {
                requestAnimationFrame(() => { getActButtons() });
            } else {
                _this.debug("NEW ACTION BUTTONS: [" + new_act_buttons[0] + ", " + new_act_buttons[1] +
                    ", " + new_act_buttons[2] + ", " + new_act_buttons[3] + "]");
                if (gamepad.buttons.length > 7) {
                    indicateNextMapping.apply(this, _indicatorStructs['L1 button']);
                    getShoulderButtons();
                } else {
                    indicateWarning(_notEnoughButtonsFor.replace("$1", "L/R"), _this.warningColor());
                    getDPad(true);
                }
            }
        };

        const getRightStick = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            if (cancelCalibration(gamepad)) return;
            const axes = gamepad.axes;
            for (let i = 0; i < axes.length; i++) {
                const v = Math.abs(axes[i]);
                if (v <= 1 && v >= -1 && v > _calibrationThreshold && v != default_axe_values[i]) {
                    if (new_right_axes.indexOf(i) < 0 && new_left_axes.indexOf(i) < 0) {
                        indicateNextMapping.apply(this, _indicatorStructs['Right Analog Stick Vert']);
                        new_right_axes.push(i);
                    }
                }
            } if (new_right_axes.length < 2) {
                requestAnimationFrame(() => { getRightStick() });
            } else {
                _this.debug("NEW RIGHT AXES: [" + new_right_axes[0] + ", " + new_right_axes[1] + "]");
                if (gamepad.buttons.length > 3) {
                    indicateNextMapping.apply(this, _indicatorStructs['A button']);
                    getActButtons();
                } else {
                    indicateWarning(_notEnoughButtonsFor.replace("$1", "ABXY"), _this.warningColor());
                    getDPad(true);
                }

            }
        };

        const getLeftStick = () => {
            const gamepad = navigator.getGamepads()[gamepad_index];
            if (cancelCalibration(gamepad)) return;
            const axes = gamepad.axes;
            for (let i = 0; i < axes.length; i++) {
                const v = Math.abs(axes[i]);
                if (v <= 1 && v >= -1 && v > _calibrationThreshold && v != default_axe_values[i]) {
                    if (new_left_axes.indexOf(i) < 0) {
                        indicateNextMapping.apply(this, _indicatorStructs['Left Analog Stick Vert']);
                        new_left_axes.push(i);
                    }
                }
            } if (new_left_axes.length < 2) {
                requestAnimationFrame(() => { getLeftStick() });
            } else {
                _this.debug("NEW LEFT AXES: [" + new_left_axes[0] + ", " + new_left_axes[1] + "]");
                if (axes.length > 3) {
                    indicateNextMapping.apply(this, _indicatorStructs['Right Analog Stick Horz']);
                    getRightStick();
                } else {
                    if (gamepad.buttons.length > 3) {
                        indicateWarning("NOT ENOUGH AXES FOR RIGHT ANALOG STICK!", _this.warningColor());
                        indicateNextMapping.apply(this, _indicatorStructs['A button']);
                        getActButtons();
                    } else {
                        indicateWarning(_notEnoughButtonsFor.replace("$1", "ABXY")); getDPad(true);
                    }
                }
            }
        };

        if (item) { // Remap just single item

        } else { // Remap whole input device
            indicateNextMapping.apply(this, _indicatorStructs['Left Analog Stick Horz']); getLeftStick();
        }

    };

    // If gamepad is remapped get mapped buttons
    Input.remapButtons = (gamepad_id, buttons) => {
        const gp_rm = _remappedGamepads[gamepad_id];
        if (gp_rm) {
            const rm_buts = gp_rm["buttons"];
            const result = [];
            for (let i = 0; i < buttons.length; i++) {
                result.push(buttons[rm_buts[i]]);
            } return result;
        } else {
            return buttons;
        }
    };

    // If gamepad is remapped get mapped axes
    Input.remapAxes = (gamepad_id, axes) => {
        const gp_rm = _remappedGamepads[gamepad_id];
        if (gp_rm) {
            const rm_axes = gp_rm["axes"];
            return [axes[rm_axes[0]], axes[rm_axes[1]], axes[rm_axes[2]], axes[rm_axes[3]]];
        } else {
            return axes;
        }
    };

    // For gamepads where D-Pad is actually defined as 'analog' input?!
    Input.checkDPadAxes = function (gamepad_id, axes) {
        const gp_rm = _remappedGamepads[gamepad_id];
        if (gp_rm) {
            const rm_axes = gp_rm["dpad_axes"];
            if (rm_axes) { // 0 = Up, 1 = Down, 2 = Left, 3 = Right
                return [
                    axes[rm_axes[0][0]] == rm_axes[0][1],
                    axes[rm_axes[1][0]] == rm_axes[1][1],
                    axes[rm_axes[2][0]] == rm_axes[2][1],
                    axes[rm_axes[3][0]] == rm_axes[3][1]
                ];
            }
        } return false;
    };

    // Common event handlers active ONLY if CE is defined in plugin parameters!
    Input.checkCommonEvents = function (buttons, last_state, player_idx) {
        for (let i = 0; i < 8; i++) checkButtonCE[i](buttons, last_state, player_idx);
    };

    ConfigManager.readString = function (config, name, defaultValue) {
        if (name in config) {
            return (config[name] + '');
        } else {
            return (defaultValue + '');
        }
    };

    Object.defineProperty(ConfigManager, 'remappedGamepads', {
        get: function () {
            return JSON.parse(this.remappedGamepads);
        },
        set: function (value) {
            _remappedGamepads = JSON.parse(value) || {};
        },
        configurable: true
    });

    Object.defineProperty(ConfigManager, 'remappedKb1Keys', {
        get: function () {
            return JSON.parse(this.remappedKb1Keys);
        },
        set: function (value) {
            Input.remappedKb1Keys = JSON.parse(value) || Input.remappedKb1Keys;
        },
        configurable: true
    });

    Object.defineProperty(ConfigManager, 'remappedKb2Keys', {
        get: function () {
            return JSON.parse(this.remappedKb2Keys);
        },
        set: function (value) {
            Input.remappedKb2Keys = JSON.parse(value) || Input.remappedKb2Keys;
        },
        configurable: true
    });

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    this.extend(Scene_Menu, "initialize", function (index) {
        _this.preLoadResources(); _this["Scene_Menu_initialize"].apply(this, arguments);
    });

    this.extend(Input, "clear", function () {
        this._currentState2 = {}; this._previousState2 = {};
        _this["Input_clear"].apply(this, arguments);
    });

    if (!Imported.OcRam_Local_Coop) { // KB2 used only as alternative KB layout...
        this.extend(Input, "_onKeyDown", function (event) {
            _this["Input__onKeyDown"].apply(this, arguments);
            const buttonName = this.keyMapper2[event.keyCode];
            if (!this._currentState[buttonName] && buttonName) this._currentState[buttonName] = true;
            this.checkCommonEventsKB(false, 1);
        });
        this.extend(Input, "_onKeyUp", function (event) {
            _this["Input__onKeyUp"].apply(this, arguments);
            const buttonName = this.keyMapper2[event.keyCode];
            if (buttonName) this._currentState[buttonName] = false;
        });
    }

    this.extend(TouchInput, "_onMouseDown", function (event) {
        _this["TouchInput__onMouseDown"].apply(this, arguments);
        const s = OcRam.scene(); if (!s || (!s.isMap() && !s.isBattle())) return;
        switch (event.button) {
            case 1: if (_buttonCE[10]) OcRam.runCE(Number(_buttonCE[10])); break; // 'Select'
            case 3: if (_buttonCE[11]) OcRam.runCE(Number(_buttonCE[11])); break; // 'L1'
            case 4: if (_buttonCE[12]) OcRam.runCE(Number(_buttonCE[12])); break; // 'R1'
        }
    });

    this.extend(TouchInput, "_onWheel", function (event) {
        _this["TouchInput__onWheel"].apply(this, arguments);
        const s = OcRam.scene(); if (!s || (!s.isMap() && !s.isBattle())) return;
        if (event.deltaY < 0) { // UP
            if (_buttonCE[8]) OcRam.runCE(Number(_buttonCE[8])); // 'L2'
        } else if (event.deltaY > 0) { // DOWN
            if (_buttonCE[9]) OcRam.runCE(Number(_buttonCE[9])); // 'R2'
        }
        if (event.deltaX < 0) { // LEFT
            if (_buttonCE[11]) OcRam.runCE(Number(_buttonCE[11])); // 'L1'
        } else if (event.deltaX > 0) { // RIGHT
            if (_buttonCE[12]) OcRam.runCE(Number(_buttonCE[12])); // 'R1'
        }
    });

    this.extend(ConfigManager, "makeData", function () {
        let config = _this["ConfigManager_makeData"].apply(this, arguments);
        config.remappedGamepads = JSON.stringify(_remappedGamepads);
        config.remappedKb1 = JSON.stringify(_remappedKb1);
        config.remappedKb2 = JSON.stringify(_remappedKb2);
        config.remappedKb1Keys = JSON.stringify(Input.remappedKb1Keys);
        config.remappedKb2Keys = JSON.stringify(Input.remappedKb2Keys);
        return config;
    });

    this.extend(ConfigManager, "applyData", function (config) {
        this.remappedGamepads = this.readString(config, 'remappedGamepads', JSON.stringify(_remappedGamepads));
        this.remappedKb1 = this.readString(config, 'remappedKb1', JSON.stringify(_remappedKb1));
        this.remappedKb2 = this.readString(config, 'remappedKb2', JSON.stringify(_remappedKb2));
        this.remappedKb1Keys = this.readString(config, 'remappedKb1Keys', JSON.stringify(Input.remappedKb1Keys));
        this.remappedKb2Keys = this.readString(config, 'remappedKb2Keys', JSON.stringify(Input.remappedKb2Keys));
        _this["ConfigManager_applyData"].apply(this, arguments);
    });

    if (_enableRightAnalog) {

        if (_rightAnalogWhileMove) {
            Input.rightAnalogOK = state => true;
        } else {
            Input.rightAnalogOK = function (state) {
                return !(state[12] || state[13] || state[14] || state[15]);
            };
        }

        if (Imported.OcRam_Movement) {
            Input.setRADir = function (player) { player.setDirection(this._dir8); }
        } else {
            Input.setRADir = function (player) { player.setDirection(this._dir4); }
        }

        Input.checkRightAnalog = function (gamepad, axes) {

            if (OcRam.Events.p2pp()) return;

            const player_index = OcRam.Local_Coop.getDevicePlayer(gamepad.index);
            const player = player_index < 1 ? $gamePlayer : $allPlayers[player_index - 1] || $gamePlayer;
            if (!player) return; if (!this.rightAnalogOK(this._gamepadStates[gamepad.index])) return;

            if (axes[3] < 0 && axes[3] < -_rightAnalogThreshold) {
                this._raVDir = 8;
            } else if (axes[3] > 0 && axes[3] > _rightAnalogThreshold) {
                this._raVDir = 2;
            } else if (this._raVDir) {
                this._raVDir = 0;
            }

            if (axes[2] < 0 && axes[2] < -_rightAnalogThreshold) {
                this._raHDir = 4;
            } else if (axes[2] > 0 && axes[2] > _rightAnalogThreshold) {
                this._raHDir = 6;
            } else if (this._raHDir) {
                this._raHDir = 0;
            }

            if (this._raHDir || this._raVDir) {
                this._dir4 = this._raHDir || this._raVDir;
                this._dir8 = this._raHDir && this._raVDir ? getHorzVertDir(this._raHDir, this._raVDir) : this._dir4;
                this.setRADir(player);
            }

        };

    }

    if (_addToOptions) {

        Window_Options.prototype.commandInputOptions = function () {
            this._commandWindow.close();
            SceneManager.push(Scene_Input_Options);
        };

        this.extend(Window_Options, "makeCommandList", function () {
            _this["Window_Options_makeCommandList"].apply(this, arguments);
            this.addInputOptions();
        });

        this.extend(Window_Options, "statusText", function (index) {
            const symbol = this.commandSymbol(index); if (this.isOptionsSymbol(symbol)) return "";
            return _this["Window_Options_statusText"].apply(this, arguments);
        });

        this.extend(Window_Options, "processOk", function () {
            const symbol = this.commandSymbol(this.index());
            if (this.isOptionsSymbol(symbol)) {
                _this.openOptions(); return;
            } _this["Window_Options_processOk"].apply(this, arguments);
        });

        Window_Options.prototype.isOptionsSymbol = function (symbol) {
            return symbol.includes("Options");
        };

        Window_Options.prototype.addInputOptions = function () {
            this.addCommand(_inputOptionsCaption, "inputOptions");
            if (!this._handlers) this._handlers = {};
            this.setHandler("inputOptions", this.commandInputOptions.bind(this));
        };

        Scene_Options.prototype.maxCommands = function () {
            return Imported.OcRam_Indicators ? 11 : 8; // Increase this value when adding option items.
        };

    }

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    // Disable some input devices?
    if (_disableTouchInput) {
        TouchInput._setupEventHandlers = function () {
            window.addEventListener("blur", this._onLostFocus.bind(this));
        };
    } if (_disableKeyboardInput) {
        Input._setupEventHandlers = function () {
            window.addEventListener("blur", this._onLostFocus.bind(this));
        };
    }

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { this.preLoadResources(); };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    /*PluginManager.registerCommand(this.name, "cmd", args => {
        doSomething(args.param);
    });*/

}.bind(OcRam.Input_EX)());