//=============================================================================
// JLP_CustomKeyboardInput.js
//=============================================================================

/*:
 * @plugindesc [Version 1.0]
 * 
 * @author Jilmer John Cariaso
 *
 * @help This plugin will allow you to change the default keyboard input keys.
 * ============================================================================
 * Help
 * ============================================================================
 * Each key on the keyboard are represented a number, we can call it 'keyCode'.
 * We will use this keyCode as an identifier to each key in keyboard. It is not
 * recommended to memorize them all, instead, use the debug feature of this
 * plugin so can easily identify the 'keyCode' of each key you press.
 * 
 * 1. While play-testing your game, open the console by pressing F8.
 * 2. Type anywhere on your screen, and you will see the 'keyCode' of the key 
 *    you are pressing.
 * 
 * For quick reference, here are the known keyCode for each key.
 * 8 - Backspace
 * 9 - Tab
 * 13 - Enter
 * 16 - Shift
 * 17 - Ctrl
 * 27 - Esc
 * 32 - Space
 * 33 - Page Up
 * 34 - Page Down
 * 37 - Left Arrow
 * 38 - Up Arrow
 * 39 - Right Arrow
 * 40 - Down Arrow
 * 45 - Ins
 * 65 - A
 * 68 - D
 * 69 - E
 * 81 - Q
 * 83 - S
 * 87 - W
 * 88 - X
 * 90 - Z
 * 96 - Num 0
 * 98 - Num 2
 * 100 - Num 4
 * 102 - Num 6
 * 104 - Num 8
 * 120 - F9
 *  
 * ============================================================================
 * Feature(s)
 * ============================================================================
 * - Customize the default inputs.
 * - Debug mode, which allows you to see the pressed key details.
 * - W,A,S,D was already configured in the plugin parameters for convinience.
 * - Q,E are now the new page up and page down.
 * - Included Backspace as back button.
 * 
 * ============================================================================
 * Change Log
 * ============================================================================
 * 09/??/2020 - v1.0
 * - Initial release.
 * 
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * 1. This plugin may be used in free or commercial games as long as it was
 *    downloaded from my official itch.io page.
 * 
 * 2. Please give a credit to the creator of this plugin: "J.J. Cariaso" or
 *    "Hammerklavier" (whichever) and must show to your "Credits" section of 
 *    your game.
 * 
 * 3. you may NOT distribute/sell this plugin.
 * 
 * 4. You may edit this code BUT you must ALSO tell the creator if you're going
 *    to fix a bug/issue, so it can be fixed for everyone else that's using this 
 *    plugin.
 * 
 * 5. The creator will not take responsiblity for misusing this plugin. It was
 * created for RPG Maker MZ, and might not work for RPG Maker MV.
 * 
 * @param Debug?
 * @type boolean
 * @desc Show key pressed details in debug.
 * @default true
 * 
 * @param Tab
 * @type number[]
 * @desc Default [9]
 * @default ["9"]
 * 
 * @param Okay/Confirm
 * @type number[]
 * @desc Default [13, 37, 90]
 * @default ["13", "37", "90"]
 * 
 * @param Shift
 * @type number[]
 * @desc Default [16]
 * @default ["16"]
 * 
 * @param Control
 * @type number[]
 * @desc Default [17]
 * @default ["17"]
 * 
 * @param Escape/Back
 * @type number[]
 * @desc Default [8, 27, 45, 88, 96]
 * @default ["8", "27", "45", "88", "96"]
 * 
 * @param Page Up
 * @type number[]
 * @desc Default [33, 81]
 * @default ["33", "81"]
 * 
 * @param Page Down
 * @type number[]
 * @desc Default [34, 69]
 * @default ["34", "69"]
 * 
 * @param Left
 * @type number[]
 * @desc Default [37, 65, 100]
 * @default ["37", "65", "100"]
 * 
 * @param Up
 * @type number[]
 * @desc Default [38, 87, 104]
 * @default ["38", "87", "104"]
 * 
 * @param Right
 * @type number[]
 * @desc Default [39, 68, 102]
 * @default ["39", "68", "102"]
 * 
 * @param Down
 * @type number[]
 * @desc Default [40, 83, 98]
 * @default ["40", "83", "98"]
 * 
 * @param Debug Key
 * @type number[]
 * @desc Default [120]
 * @default ["120"]
 * 
 */


(function() {

    const params       = PluginManager.parameters('JLP_CustomKeyboardInput');
    const isDebug      = (params['Debug?'] === 'true');
    const tabKeys      = JSON.parse(params['Tab'] || []);
    const okKeys       = JSON.parse(params['Okay/Confirm'] || []);
    const shiftKeys    = JSON.parse(params['Shift'] || []);
    const controlKeys  = JSON.parse(params['Control'] || []);
    const escapeKeys   = JSON.parse(params['Escape/Back'] || []);
    const pageUpKeys   = JSON.parse(params['Page Up'] || []);
    const pageDownKeys = JSON.parse(params['Page Down'] || []);
    const leftKeys     = JSON.parse(params['Left'] || []);
    const upKeys       = JSON.parse(params['Up'] || []);
    const rightKeys    = JSON.parse(params['Right'] || []);
    const downKeys     = JSON.parse(params['Down'] || []);
    const debugKeys    = JSON.parse(params['Debug Key'] || []);

    Input.keyMapper = {};

    for (var i = 0; i < tabKeys.length; i++) {
        Input.keyMapper[parseInt(tabKeys[i])] = 'tab';
    }
    for (var i = 0; i < okKeys.length; i++) {
        Input.keyMapper[parseInt(okKeys[i])] = 'ok';
    }
    for (var i = 0; i < shiftKeys.length; i++) {
        Input.keyMapper[parseInt(shiftKeys[i])] = 'shift';
    }
    for (var i = 0; i < controlKeys.length; i++) {
        Input.keyMapper[parseInt(controlKeys[i])] = 'control';
    }
    for (var i = 0; i < escapeKeys.length; i++) {
        Input.keyMapper[parseInt(escapeKeys[i])] = 'escape';
    }
    for (var i = 0; i < pageUpKeys.length; i++) {
        Input.keyMapper[parseInt(pageUpKeys[i])] = 'pageup';
    }
    for (var i = 0; i < pageDownKeys.length; i++) {
        Input.keyMapper[parseInt(pageDownKeys[i])] = 'pagedown';
    }
    for (var i = 0; i < leftKeys.length; i++) {
        Input.keyMapper[parseInt(leftKeys[i])] = 'left';
    }
    for (var i = 0; i < upKeys.length; i++) {
        Input.keyMapper[parseInt(upKeys[i])] = 'up';
    }
    for (var i = 0; i < rightKeys.length; i++) {
        Input.keyMapper[parseInt(rightKeys[i])] = 'right';
    }
    for (var i = 0; i < downKeys.length; i++) {
        Input.keyMapper[parseInt(downKeys[i])] = 'down';
    }
    for (var i = 0; i < debugKeys.length; i++) {
        Input.keyMapper[parseInt(debugKeys[i])] = 'debug';
    }

    console.log('TEST', Input.keyMapper);

    const onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        onKeyDown.call(this, event);

        if (isDebug) {
            console.log('Button Pressed Details (key:', event.key, ', keyCode:', event.keyCode, ')');
        }
    };

})();