//------------------------------------------------------------------------------
// OcRam plugins - OcRam_Local_Coop.js
//==============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Local_Coop", "1.08");

/*:
 * @target MZ
 * @plugindesc v1.08 Local Co-op -plugin up to 4 players from OcRam.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Passages
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command playerIndicators
 * @text Player indicators
 * @desc Show player indicators?
 *
 * @arg show
 * @type boolean
 * @default true
 * @text Show
 * @desc Show player indicators? (Setting will be saved)
 *
 * @command dropPlayer
 * @text Drop player
 * @desc Drop player 2 - 4
 *
 * @arg player
 * @type number
 * @min 2
 * @max 4
 * @default 4
 * @text Player
 * @desc Which player to drop?
 *
 * @command maxPlayers
 * @text Maximum number of players
 * @desc Maximum number of players (1 - 4)
 *
 * @arg max
 * @type number
 * @min 1
 * @max 4
 * @default 4
 * @text Max
 * @desc Maximum number of players? (Setting will be saved)
 *
 * @command swapPlayers
 * @text Swap players
 * @desc Swaps given players
 *
 * @arg p1
 * @type number
 * @min 1
 * @max 4
 * @default 1
 * @text 1. player
 * @desc 1. player to swap
 *
 * @arg p2
 * @type number
 * @min 1
 * @max 4
 * @default 2
 * @text 2. player
 * @desc 2. player to swap
 *
 * @command screenEdgeBlock
 * @text Screen edge block
 * @desc Block movement on screen edges?
 *
 * @arg block
 * @type boolean
 * @default true
 * @text Block
 * @desc Block movement on screen edges? (Setting will be saved)
 *
 * @command playersCollide
 * @text Players collide
 * @desc Players collide?
 *
 * @arg collides
 * @type boolean
 * @default true
 * @text Collides
 * @desc Players collide? (Setting will be saved)
 *
 * @command allowActorToggling
 * @text Allow actor toggling
 * @desc Allow actor toggling? (Requires OcRam_Followers)
 *
 * @arg allowToggle
 * @type boolean
 * @default true
 * @text Allow toggle
 * @desc Allow actor toggling? (Setting will be saved)
 *
 * @command forceToggle
 * @text Force toggle
 * @desc Force toggle. (ignores if toggling is allowed or not)
 *
 * @arg action
 * @type select
 * @option Previous
 * @value -2
 * @option Next
 * @value -1
 * @option Party member 2
 * @value 1
 * @option Party member 3
 * @value 2
 * @option Party member 4
 * @value 3
 * @option Party member 5
 * @value 4
 * @option Party member 6
 * @value 5
 * @option Party member 7
 * @value 6
 * @option Party member 8
 * @value 7
 * @option Party member 9
 * @value 8
 * @option Party member 10
 * @value 9
 * @option Party member 11
 * @value 10
 * @option Party member 12
 * @value 11
 * @default -1
 * @text Toggle
 * @desc Force toggle. (ignores if toggling is allowed or not)
 *
 * @command allowJoin
 * @text Allow join
 * @desc Prevent (false) or allow (true) players to join game.
 *
 * @arg allow
 * @type boolean
 * @default true
 * @text Allow
 * @desc Prevent (false) or allow (true) players to join game.
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Show turns
 * @type boolean
 * @desc Shows who's turn it is at the moment
 * @default true
 *
 * @param Player indicator
 * @type boolean
 * @desc Shows indicator above each player? NOTE: Requires OcRam_Indicators!
 * @default true
 *
 * @param Player speaker
 * @type boolean
 * @desc Shows player who started the event after "Speaker name"
 * @default true
 * 
 * @param Speaker format
 * @parent Player speaker
 * @type text
 * @desc How player text is formated after "Speaker name"
 * @default \[P$1\]
 *
 * @param Player colors
 * @type boolean
 * @desc Indicate all players with unique color?
 * @default true
 * 
 * @param Player1 color
 * @parent Player colors
 * @type number
 * @desc Player1 color (System color index)
 * @min 0
 * @max 255
 * @default 1
 * 
 * @param Player2 color
 * @parent Player colors
 * @type number
 * @desc Player2 color (System color index)
 * @min 0
 * @max 255
 * @default 2
 * 
 * @param Player3 color
 * @parent Player colors
 * @type number
 * @desc Player3 color (System color index)
 * @min 0
 * @max 255
 * @default 3
 * 
 * @param Player4 color
 * @parent Player colors
 * @type number
 * @desc Player4 color (System color index)
 * @min 0
 * @max 255
 * @default 6
 *
 * @param Show info text
 * @type boolean
 * @desc true = Show info text on screen (join / drop). false = Not in use
 * @default true
 *
 * @param Info text fade time
 * @parent Show info text
 * @type number
 * @desc How many frames until fade? Default 120
 * @default 120
 *
 * @param Info text Y-Offset
 * @parent Show info text
 * @type number
 * @min -9999
 * @max 9999
 * @desc Info text Y-Offset in pixels
 * @default 0
 *
 * @param KB2 key codes
 * @type number[]
 * @min 0
 * @max 255
 * @desc Key codes for [up][down][left][right][ok][cancel][dash][menu][select][start][l1][r1][l2][r2][al][ar]
 * @default ["87","83","65","68","32","70","9","27","50","49","69","81","88","90","51","52"]
 *
 * @param Player in turn variable id
 * @type variable
 * @desc 0 = not in use, 1-n = variable id to check which player is on turn
 * @default 0
 *
 * @param Max number of players
 * @type number
 * @desc How many players is maximum (values 1-4)
 * @min 1
 * @max 4
 * @default 4
 * 
 * @param Player enter CE
 * @type common_event
 * @desc Which common event should be executed when new player enters the game
 * @default 0
 *
 * @param Player leave CE
 * @type common_event
 * @desc Which common event should be executed when player leaves the game
 * @default 0
 * 
 * @param Players collide
 * @type boolean
 * @desc Will players collide?
 * @default false
 * 
 * @param Map edge block
 * @type boolean
 * @desc If on/true force players to be on same screen.
 * @default true
 *
 * @param Init devices
 * @type number[]
 * @min -2
 * @max 255
 * @desc Assign player devices on new game. -2 keyboard, 0 and above is gamepad index.
 * @default []
 *
 * @param Force devices
 * @type boolean
 * @desc Force players to assigned devices?
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
 * This plugin allows up to 4 players to control their own party member(s)!
 * One of the main goals for Local Co-op was to make it feel like it is 
 * part of RPG Maker itself!
 * 
 * By default player joins the game by pressing "start" button and 
 * leaves it by pressing "start + ok".
 * 
 * NOTE: "Speaker name" features are only available in MZ!
 * 
 * Key features:
 * - Gamepad support for all players (autodrop player if gamepad is unplugged)
 * - Shared keyboard for 2 players
 * - Each player gets it's own followers to control
 * - Hide followers >> Only followers controlled by player are shown!
 * - Re-assign all battle members when player joins or leaves the game
 * - Actors can be assigned to any player via menu "Formation" command normally
 * - Auto detect the player and member who started the event (all things for 
 *   player will be applied to player who started the event)
 * - And textboxes, choice lists, menu, shop, name input, battle commands 
 *   etc... are controlled by player who is in turn or started the event!
 * - Auto-swap \P[1] with the member who started the event
 * - All textboxes (and choice lists followed by it) are controlled by player 
 *   who controls (speaker name: \P[x]) designated member!
 * - Each player may have unique color (to make it easier to spot own chars)
 * - Shows current player (with own color) after "speaker name" (or attached
 *   extra mini window in choice list)
 * - On Map: Floor damage / state damages applies for each players "sub party"
 *   NOTE: If followers don't follow (feature provided by OcRam_Followers) 
 *         each character takes damage individually!
 * - Allowing/preventing players to join game via JS or plugin command
 * 
 * Integrations to other plugins
 *      OcRam_Events:
 *        - Lift, Drop & Throw system
 *        - Pull & Push system
 *        - Autofill speaker data (via \P[x] notation)
 *      OcRam_Followers:
 *        - Toggle character (if followers follow = false, toggles also player)
 *        - Ghosts / Gone/Hidden mode when dead (NOTE: all PLAYERS are forced
 *          to ghosts if "Gone/Hidden" mode is used for playability reasons)
 *      OcRam_Indicators:
 *        - Player indicators (the ones floating above them)
 *      OcRam_Lights:
 *        - Player lights for ALL players :)
 *      OcRam_Input_EX
 *        - Allow players to REMAP their buttons!
 *      RETRO (by Drakkonis):
 *        - Use this plugin also in MV!
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ============================================================================
 *
 * General help:
 *      1. Give plugin desired parameters.
 *      2. Extra players (2 - 4) will control battle members in following order
 *         Maximum amount of battle members supported by this plugin is 12!
 *         (12 is divisible by 1, 2, 3 and 4 + can't imagine any larger party)
 *           1 player - Battle member index array will be:
 *             P1 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 *           2 players - Battle member index array will be:
 *             P1 [0, 2, 4, 6, 8, 10]
 *             P2 [1, 3, 5, 7, 9, 11]
 *           3 players - Battle member index array will be:
 *             P1 [0, 3, 6, 9]
 *             P2 [1, 4, 7, 10]
 *             P3 [2, 5, 8, 11]
 *           4 players - Battle member index array will be:
 *             P1 [0, 4, 8]
 *             P2 [1, 5, 9]
 *             P3 [2, 6, 10]
 *             P4 [3, 7, 11]
 *      3. Join with start button
 *      4. Drop with start + OK (P1 can't drop)
 *      
 *      5. Switch/max battle member features requires OcRam_Followers plugin!
 *      
 *         Switch between battle members via LB/RB and/or with defined keys 
 *         on Keyboard + max battle members can be raised up to 12 actors
 *         
 *         Switching battle members:
 *           When followers follow is turned OFF:
 *              - Only "current player" can switch actor
 *              - When switched: Player who controls this actor becomes 
 *                "current player" and camera is focused to this actor
 *           When followers follow is turned ON (default):
 *              - Any player can toggle their own actors at any time
 *      
 *      NOTE: Player indicators requires OcRam_Indicators plugin!
 *      
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * MV example: OcRam_Local_Coop/playerIndicators true
 * playerIndicators       * Show player indicators? (Requires OcRam_Indicators)
 * >> show                true = show indicators, false = hide indicators
 * 
 * MV example: OcRam_Local_Coop/dropPlayer 2
 * dropPlayer             Drop desired player
 * >> player              Player number 2-4
 * 
 * MV example: OcRam_Local_Coop/screenEdgeBlock true
 * screenEdgeBlock        * Block players on screen edge?
 * >> block               true = Block at the edge, false = don't block
 * 
 * MV example: OcRam_Local_Coop/maxPlayers 2
 * maxPlayers             * Maximum number of players
 * >> max                 Max players 1-4
 * 
 * MV example: OcRam_Local_Coop/swapPlayers 1 2
 * swapPlayers            Swap players X and Y
 * >> p1                  First player to swap 1-4
 * >> p2                  Second player to swap 1-4
 * 
 * MV example: OcRam_Local_Coop/playersCollide true
 * playersCollide         * Does players collide?
 * >> collide             true = Players collide, false = They don't?
 * 
 * MV example: OcRam_Local_Coop/allowActorToggling true
 * allowActorToggling     * Allow actor toggling?
 * >> allowToggle         true = Allow toggling, false = Block toggling
 * 
 * MV example: OcRam_Local_Coop/forceToggle 0
 * forceToggle            Force actor toggle next/prev
 * >> action              -2 = prev, -1 = next, 0 - 11 = party member index
 * 
 * MV example: OcRam_Local_Coop/allowJoin true
 * allowJoin              * Allow players to join game?
 * >> allow               true = Allow join, false = Prevent join
 * 
 * * = this setting will be also saved!
 * 
 * ----------------------------------------------------------------------------
 * Script commands and objects
 * ============================================================================
 * $allPlayers // Array where all player objects are stored
 * OcRam.playerCharacter() // Character who started the event!
 * OcRam.Local_Coop.getActualPlayer() // Used when followers follow = false
 * OcRam.Local_Coop.dropDevice(indx) // Drop player based on device
 * OcRam.Local_Coop.dropPlayer(2 - 4) // Drop player
 * OcRam.Local_Coop.memberArray() // Member assignments for players
 * OcRam.Local_Coop.getPlayerCount() // How many players there is currently?
 * OcRam.Local_Coop.swapPlayers(1, 2) // Swap given players
 * OcRam.Local_Coop.setPlayerInTurn(p_idx, req_anim_frame) // Set "player"
 * OcRam.Local_Coop.setMemberInTurn(mi_idx, req_anim_frame) // Set "player" 
 *                                                             by member index
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
 * COMMERCIAL USE: (Standard license: 20 EUR, No-credits license: 60 EUR)
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
 * 2021/06/04 v1.00 - Initial release
 * 2021/06/10 v1.01 - Support for diagonal char sheets
 * 2021/10/21 v1.02 - Plugin meta data (order/base) is now editor compatible!
 * 2021/10/26 v1.03 - OcRam.Local_Coop.assignDevice(device_index) to assign
 *                    new player via JS!
 *                    NEW JS call: setForcedDevices(true/false) - Forces 
 *                    current devices to all players (join/drop are disabled)
 *                    NEW plugin parameters "Init devices" and "Force devices"
 *                    to assign (and force) devices to players!
 *                    (Credits to Ithariam)
 * 2022/01/23 v1.04 - OcRam_Movement "follower gap" compatibility patch
 *                    Local_Coop forces "Event through fix" = ON
 *                    + it won't clear input anymore (huge improvement)
 *                    Pixel move "on touch" events and damage floor triggers
 *                    only once per 4 steps (like ment to be).
 *                    "Player Touch" trigger now works for P2-4 also...
 *                    "Event Touch" trigger now works for P2-4 also...
 *                    When OcRam pixel movement is used - Fades always when
 *                    boarding vehicles (to avoid pixel rounding errors)
 *                    Player join is disabled while $gameMap interpreter 
 *                    is busy / in vehicle (to avoid some weird issues)
 *                    Actor toggle function now refreshes _myActor data for
 *                    all players! (toggling is provided by OcRam_Followers)
 * 2022/04/22 v1.05 - Compatibility patch for OcRam_Followers "dead followers"
 *                    OcRam.Local_Coop.refreshPrecedingCharacters()
 *                    + trigger that refresh on $gameParty.removeActor()
 *                    Floor/state damage now applies for each players sub party
 *                    NOTE: If followers don't follow (OcRam_Followers) each
 *                    character takes damage individually!
 *                    OcRam.Local_Coop.getMaxPlayers() // Max no. of players
 *                    Max number of players can't exceed party size no longer.
 *                    NEW JS call OcRam.Local_Coop.allowJoin() or via
 *                    plugin command. To allow/prevent player joining.
 *                    This setting will be saved to Game_System object.
 *                    Info text (player join/left) Y-Offset in pixels
 * 2022/07/10 v1.06 - Fixed some problems with Alpha NET Multiplayer
 *                    (Credits to Blitzx101)
 *                    OcRam_Passages + tall sprites fix
 * 2022/08/14 v1.07 - Fixed several bugs when party had no actors at all.
 *                    (Credits to Equinox-ThiefofHearts)
 *                    Also fixed a 'locked move' bug when joined same time as 
 *                    any character was moved by that input device.
 * 2022/11/11 v1.08 - OcRam.Local_Coop.getDevicePlayer(device_index) and
 *                    getPlayerDevice(player_number)
 *                    MAJOR REVAMP on key mapping to support OcRam_Input_EX!
 *                    (and allows special keys such as TAB, ESC etc...)
 *                    Start / Select buttons are obsolete (handled in core)!
 *                    Leave game with "Start" + Confirm /w "OK"
 *                    "Keyboard2" parameter replaced with "KB2 key codes"
 *                    "Teleport to player" jumps only if close enough.
 *                    "getAssignedFollowers" "teleports" followers to player
 *                    only when needed (map transfer, player join/leave).
 *                    TIP: Use OcRam_Input_EX to let player remap all keys!
 *                         "KB2 key codes" is obsolete if Input_EX is used.
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive) methods are listed here
 * ============================================================================
 * Input._updateGamepadState
 * Game_Followers.prototype.updateMove
 * Scene_Map.prototype.processMapTouch
 * Game_Character.prototype.turnTowardPlayer
 * Game_Character.prototype.turnAwayFromPlayer
 * Game_Character.prototype.moveTowardPlayer
 * Game_Character.prototype.moveAwayFromPlayer
 * Game_Followers.prototype.jumpAll
 * Game_Party.prototype.onPlayerWalk
 * Game_Actor.prototype.onPlayerWalk
 * Game_Actor.prototype.turnEndOnMap // "Step check" is done else where...
 * Game_Map.prototype.togglePlayer // If Imported.OcRam_Followers
 * OcRam.Events.okPressed // If Imported.OcRam_Events
 * OcRam.Events.midPressed // If Imported.OcRam_Events
 * OcRam.Events.cancelPressed // If Imported.OcRam_Events
 */

// ----------------------------------------------------------------------------
// rpg_sprites.js - New destination sprite class for extra players
// ============================================================================

function Sprite_Destination2() {
    this.initialize(...arguments);
}

Sprite_Destination2.prototype = Object.create(Sprite_Destination.prototype);
Sprite_Destination2.prototype.constructor = Sprite_Destination2;

Sprite_Destination2.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if ($gameTemp.isDestinationValid2()) {
        this.updatePosition();
        this.updateAnimation();
        this.visible = true;
    } else {
        this._frameCount = 0;
        this.visible = false;
    }
};

Sprite_Destination2.prototype.updatePosition = function () {
    const tileWidth = $gameMap.tileWidth();
    const tileHeight = $gameMap.tileHeight();
    const x = $gameTemp.destinationX2();
    const y = $gameTemp.destinationY2();
    this.x = ($gameMap.adjustX(x) + 0.5) * tileWidth;
    this.y = ($gameMap.adjustY(y) + 0.5) * tileHeight;
};

// ------------------------------------------------------------------------------
// New text layer sprite
// ==============================================================================
function Sprite_Text_OC() {
    this.initialize.apply(this, arguments);
}

Sprite_Text_OC.prototype = Object.create(Sprite.prototype);
Sprite_Text_OC.prototype.constructor = Sprite_Text_OC;

Sprite_Text_OC.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._frameCount = 0;
    this._maxFrames = 120;
    this._infoTextYOffset = -72 + Number(OcRam.Local_Coop.parameters["Info text Y-Offset"] || 0);
    this._framesPreCalculated = this._maxFrames * 0.5;
    this._displayText = "";
    this.x = 0; this.y = 0;
};

Sprite_Text_OC.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this._displayText != "") {
        this.visible = true;
        this.updateAnimation();
    } else {
        this.visible = false;
        this._frameCount = 0;
    }
};

Sprite_Text_OC.prototype.writeText = function (pstrText) {
    this._w = Graphics.boxWidth;
    this._h = Graphics.boxHeight;
    this.bitmap = new Bitmap(this._w, this._h);
    this.bitmap.textColor = "#ffffff";
    this.bitmap.outlineColor = "#000000";
    this.bitmap.outlineWidth = 6;
    this._fontSize = 48;
    this.anchor.x = 0; this.anchor.y = 0;
    this._displayText = pstrText;
    this._frameCount = 0;
};

Sprite_Text_OC.prototype.updateAnimation = function () {
    this._frameCount++;
    if (this._frameCount > this._maxFrames) {
        this._displayText = "";
    } else {
        if (this._frameCount > this._framesPreCalculated) {
            const calculated = this._frameCount - this._framesPreCalculated;
            this.opacity = 200 - (calculated / this._maxFrames * 200);
            this.bitmap.fontSize = (this._fontSize - calculated * 0.25) * (1 - (calculated / this._maxFrames));
            this.bitmap.clearRect(0, 0, this._w, this._h);
        } else {
            this.opacity = 200;
            this.bitmap.fontSize = this._fontSize;
        } this.bitmap.drawText(this._displayText, 0, (Graphics.boxHeight * 0.5) + this._infoTextYOffset, Graphics.boxWidth, 32, "center");
    }
};

Sprite_Text_OC.prototype.hide = function () {
    this.visible = false;
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _showPlayerTurns = OcRam.getBoolean(this.parameters['Show turns']);
    const _playerSpeaker = OcRam.getBoolean(this.parameters['Player speaker']);
    const _speakerFormat = (this.parameters['Speaker format'] || '');
    const _playerColors = OcRam.getBoolean(this.parameters['Player colors']) ? [
        Number(this.parameters['Player1 color']),
        Number(this.parameters['Player2 color']),
        Number(this.parameters['Player3 color']),
        Number(this.parameters['Player4 color'])
    ] : [0, 0, 0, 0];
    const _showInfoText = OcRam.getBoolean(this.parameters['Show info text']);
    const _textFadeTime = Number(this.parameters['Info text fade time']) || 120;
    const _playerInTurnVarId = Number(this.parameters['Player in turn variable id']) || 0;
    const _playerEnterCE = Number(this.parameters['Player enter CE']) || 0;
    const _playerLeaveCE = Number(this.parameters['Player leave CE']) || 0;
    const _toggleSE = Imported.OcRam_Followers ? String(OcRam.Followers.parameters['Toggle SE']) : '';

    let _playerIndicator = OcRam.getBoolean(this.parameters['Player indicator']);
    let _maxNumberOfPlayersOrg = Number(this.parameters['Max number of players']) || 4;
    let _maxNumberOfPlayers = _maxNumberOfPlayersOrg;
    let _playersCollide = OcRam.getBoolean(this.parameters['Players collide']);
    let _mapEdgeBlock = OcRam.getBoolean(this.parameters['Map edge block']);
    let _allowTogling = Imported.OcRam_Followers ? OcRam.getBoolean(OcRam.Followers.parameters['Actor toggling']) : false;
    let _forceDevices = OcRam.getBoolean(this.parameters['Force devices']);
    let _initDevices = OcRam.getArray(this.parameters['Init devices']);
    let _displayJoined = true;
    let _noPlayers = false;

    this.debug("Imported.OcRam_Followers:", !!Imported.OcRam_Followers, _allowTogling);

    let _playerDevices = [-1, null, null, null]; // Player input devices // null = NOT plugged in
    let _playerInTurn = 0; // Player in turn? 0 = P1, 1 = P2 etc...
    let _playerCount = 1; // How many players there is in game?
    let _partyInBattle = false;
    let _screenWidth = 0; let _screenHeight = 0;
    let _sceneTextLayer = null; // Draw info texts here
    let _currentPlayer = 1; // For toggling between actors
    let _canMove = false; let _isFading = false;

    let _pit = 1; // When followers follow = false - this is actual player in turn
    let _currentLeader = 1; // When followers follow = false, who is current leader 'P1'?
    let _POKK = [false, false]; // Player KB OK without "prevent ok"

    let _preventClear = false;
    let _followersAreHidden = false;
    let _playerOpacity = 255;
    let _preventJoin = false;

    const _pixelMoveEnabled = Imported.OcRam_Movement && OcRam.Movement.pixelMoveEnabled();
    if (!Imported.OcRam_Movement) Game_CharacterBase.prototype.pos_OC = function (x, y) { return this.pos(x, y); };
    const _deadFollowersType = Imported.OcRam_Followers ? Number(OcRam.Followers.parameters["Dead followers are"] || 0) : 0;

    const _memberArray = [ // Member array matrix for faster code...
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 1, 3],
        [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]
    ];

    _maxNumberOfPlayers = (_maxNumberOfPlayers > 4) ? 4 : (_maxNumberOfPlayers < 1) ? 1 : _maxNumberOfPlayers;

    // 2D arrays for player inputs
    Input._currentState2 = [[], [], [], []];

    let _kb2 = this.parameters['KB2 key codes'] ?
        OcRam.getArray(this.parameters['KB2 key codes']) :
        [87, 83, 65, 68, 32, 70, 9, 27, 50, 49, 69, 81, 88, 90, 51, 52];
    if (_kb2.length != 16) _kb2 = [87, 83, 65, 68, 32, 70, 9, 27, 50, 49, 69, 81, 88, 90, 51, 52];

    Input.defaultKeyMapper2 = {  // ALTERNATIVE/PLAYER 2-4 MAPPINGS BELOW
        [_kb2[0]]: "up",       // W            W   (Move up)
        [_kb2[1]]: "down",     // S            S   (Move down)
        [_kb2[2]]: "left",     // A            A   (Move left)
        [_kb2[3]]: "right",    // D            D   (Move right)
        [_kb2[4]]: "ok",       // Space        Spc (OK)
        [_kb2[5]]: "cancel",   // F            F   (Cancel)
        [_kb2[6]]: "shift",    // Tab          Tab (Dash)
        [_kb2[7]]: "escape",   // Escape       Esc (Menu / Escape)
        [_kb2[8]]: "pagedown", // 2            2   (L1)
        [_kb2[9]]: "pageup",   // 1            1   (R1)
        [_kb2[10]]: "home",    // E            E   (L2)
        [_kb2[11]]: "end",     // Q            Q   (R2)
        [_kb2[12]]: "start",   // X            X   (Start)
        [_kb2[13]]: "select",  // Z            Z   (Select)
        [_kb2[14]]: "aleft",   // 3            3   (A-Left)
        [_kb2[15]]: "aright"   // 4            4   (A-Right)
    }; Input.keyMapper2 = Input.defaultKeyMapper2;

    let followersFollow = () => { return true; };

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    // Initial devices for players
    const initPlayers = () => {
        if ($gameTemp) {
            let old_force = _forceDevices;
            _displayJoined = false; _forceDevices = false;
            _initDevices.forEach(itm => {
                assignDevice(Number(itm));
            }); _displayJoined = true; _forceDevices = old_force;
        } else {
            setTimeout(() => {
                initPlayers();
            }, 500);
        }
    };

    // Set player in turn variable
    const setPlayerInTurnVar = player_in_turn => {
        if (_playerInTurnVarId > 0) {
            $gameVariables.setValue(_playerInTurnVarId, player_in_turn);
        }
    };

    // Get actual play in turn (on world map) - Keep orginal players as they are...
    const getRealPlayer = orginal_index => {
        let act_curpla = (orginal_index) + 1;
        if (_playerCount == 2) { // Two players
            if (_currentPlayer == 2 && act_curpla == 2) act_curpla = 1;
        } else if (_playerCount == 3) { // Three players
            if (_currentPlayer == 2) {
                if (act_curpla == 3) act_curpla = 1;
                if (act_curpla == 2) act_curpla = 3;
            } else if (_currentPlayer == 3) {
                if (act_curpla == 2) act_curpla = 1;
                if (act_curpla == 3) act_curpla = 2;
            }
        } else if (_playerCount == 4) { // Four players
            if (_currentPlayer == 2) {
                if (act_curpla == 4) act_curpla = 1;
                if (act_curpla == 3) act_curpla = 4;
                if (act_curpla == 2) act_curpla = 3;
            } else if (_currentPlayer == 3) {
                if (act_curpla == 2) {
                    act_curpla = 4;
                } else if (act_curpla == 4) {
                    act_curpla = 2;
                } if (act_curpla == 3) act_curpla = 1;
            } else if (_currentPlayer == 4) {
                if (act_curpla == 2) act_curpla = 1;
                if (act_curpla == 3) act_curpla = 2;
                if (act_curpla == 4) act_curpla = 3;
            }
        } return act_curpla;
    };

    // Update directions for desired player
    const updateDirs = (p_follower, current_state) => {

        let dir = 0;

        // Main directions
        if (current_state['up']) dir = 8;
        if (current_state['down']) dir = 2;
        if (current_state['left']) dir = 4;
        if (current_state['right']) dir = 6;
        setDir4(p_follower, dir);

        // Diagonal directions
        if (current_state['up'] && current_state['left']) dir = 7;
        if (current_state['up'] && current_state['right']) dir = 9;
        if (current_state['down'] && current_state['left']) dir = 1;
        if (current_state['down'] && current_state['right']) dir = 3;
        setDir8(p_follower, dir);

    };

    const updateDirsGamepad = (p_follower, current_state) => {

        let dir = 0;

        // Main directions
        if (current_state[12]) dir = 8;
        if (current_state[13]) dir = 2;
        if (current_state[14]) dir = 4;
        if (current_state[15]) dir = 6;
        setDir4(p_follower, dir);

        // Diagonal directions
        if (current_state[12] && current_state[14]) dir = 7;
        if (current_state[12] && current_state[15]) dir = 9;
        if (current_state[13] && current_state[14]) dir = 1;
        if (current_state[13] && current_state[15]) dir = 3;
        setDir8(p_follower, dir);

    };

    // To whom this device belongs?
    const getDevicePlayer = device_index => {
        if (_playerDevices[0] == device_index) return 1;
        if (_playerDevices[1] == device_index) return 2;
        if (_playerDevices[2] == device_index) return 3;
        if (_playerDevices[3] == device_index) return 4;
        return -1; // Not specifically assigned to anyone - usually should default to P1
    };

    // How many players there currently is?
    const getPlayerCount = () => {
        let p_count = 0;
        if (_playerDevices[0] != null) p_count++;
        if (_playerDevices[1] != null) p_count++;
        if (_playerDevices[2] != null) p_count++;
        if (_playerDevices[3] != null) p_count++;
        return p_count;
    };

    const refreshFollowingActors = () => {
        if (_playerCount > 1) {
            $allPlayers.forEach(p => {
                if (p) {
                    p._followingActors = [];
                    p._followingCharacters.forEach(f => {
                        if (f) p._followingActors.push(f.getActor());
                    });
                }
            });
        } else {
            $gamePlayer._followingActors = [];
            $gamePlayer._followingCharacters.forEach(f => {
                if (f) $gamePlayer._followingActors.push(f.getActor());
            });
        } $allPlayers.forEach(p => {
            if (p) p._myActor = p.getActor();
        });
    };

    if (Imported.OcRam_Passages) { // OcRam_Passages tall sprite fix...

        Game_Character.prototype.passagesTallSpriteRefreshFunc = function () {
            this._followingCharacters.forEach(f => {
                f._higherLevel = this._higherLevel;
                if (SceneManager._scene._spriteset !== undefined) {
                    const hs = f.getPassagesCharSprite();
                    if (hs) hs._showHigherSprite = f._higherLevel;
                    f.updatePassagesEvent();
                }
            });
        };

        this.extend(Game_Follower, "refreshBushDepth", function () {
            if (this._deviceIndex_OC) {
                const old_lvl = this._higherLevel;
                Game_CharacterBase.prototype.refreshBushDepth.call(this);
                if (old_lvl != this._higherLevel) this.passagesTallSpriteRefreshFunc();
            } else {
                Game_CharacterBase.prototype.refreshBushDepth.call(this);
            }
        });

    }

    // For faster follower update we need to know who is following who?
    const refreshPrecedingCharacters = () => {
        const visible_followers = $gamePlayer._followers._data.filter(f => f.isVisible());
        switch (_playerCount) {
            case 2:
                $gamePlayer._followingCharacters = [];
                $allPlayers[1]._followingCharacters = [];
                visible_followers.forEach(f => {
                    if (!f._playerIndex_OC) {
                        if (f._memberIndex % 2 == 0) {
                            $gamePlayer._followingCharacters.push(f); f._leaderCharacter = $allPlayers[0];
                        } else {
                            $allPlayers[1]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[1];
                        }
                    }
                }); break;
            case 3:
                $gamePlayer._followingCharacters = [];
                $allPlayers[1]._followingCharacters = [];
                $allPlayers[2]._followingCharacters = [];
                visible_followers.forEach(f => {
                    if (!f._playerIndex_OC) {
                        if (f._memberIndex % 3 == 0) {
                            $gamePlayer._followingCharacters.push(f); f._leaderCharacter = $allPlayers[0];
                        } else {
                            if (f._memberIndex % 3 == 1) {
                                $allPlayers[1]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[1];
                            } else {
                                $allPlayers[2]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[2];
                            }
                        }
                    }
                }); break;
            case 4:
                $gamePlayer._followingCharacters = [];
                $allPlayers[1]._followingCharacters = [];
                $allPlayers[2]._followingCharacters = [];
                $allPlayers[3]._followingCharacters = [];
                visible_followers.forEach(f => {
                    if (!f._playerIndex_OC) {
                        if (f._memberIndex % 4 == 0) {
                            $gamePlayer._followingCharacters.push(f); f._leaderCharacter = $allPlayers[0];
                        } else {
                            if (f._memberIndex % 2 != 1) {
                                $allPlayers[1]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[1];
                            } else if (f._memberIndex % 3 == 1) {
                                $allPlayers[2]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[2];
                            } else {
                                $allPlayers[3]._followingCharacters.push(f); f._leaderCharacter = $allPlayers[3];
                            }
                        }
                    }
                }); break;
            default:
                $gamePlayer._followingCharacters = visible_followers; break;
        } refreshFollowingActors();
    };

    let _oldMapId = 0;

    // Assign devices to followers, exclude P1 from this (it is not a follower)
    const getAssignedFollowers = (force_teleport) => {

        if ($gamePlayer !== null) {

            if ($gamePlayer._followers._data[0]) {
                $gamePlayer._followers._data[0]._playerIndex_OC = 0;
                $gamePlayer._followers._data[0]._deviceIndex_OC = null;
            } if ($gamePlayer._followers._data[1]) {
                $gamePlayer._followers._data[1]._playerIndex_OC = 0;
                $gamePlayer._followers._data[1]._deviceIndex_OC = null;
            } if ($gamePlayer._followers._data[2]) {
                $gamePlayer._followers._data[2]._playerIndex_OC = 0;
                $gamePlayer._followers._data[2]._deviceIndex_OC = null;
            }

            $allPlayers[0] = $gamePlayer;
            $allPlayers[1] = null; $allPlayers[2] = null; $allPlayers[3] = null;

            if (_playerDevices[1] != null) {
                $gamePlayer._followers._data[0]._playerIndex_OC = 1;
                $gamePlayer._followers._data[0]._deviceIndex_OC = _playerDevices[1];
                $allPlayers[1] = $gamePlayer._followers._data[0];
            }

            if (_playerDevices[2] != null) {
                $gamePlayer._followers._data[1]._playerIndex_OC = 2;
                $gamePlayer._followers._data[1]._deviceIndex_OC = _playerDevices[2];
                $allPlayers[2] = $gamePlayer._followers._data[1];
            }

            if (_playerDevices[3] != null) {
                $gamePlayer._followers._data[2]._playerIndex_OC = 3;
                $gamePlayer._followers._data[2]._deviceIndex_OC = _playerDevices[3];
                $allPlayers[3] = $gamePlayer._followers._data[2];
            }

            refreshPrecedingCharacters();

            if ($gameMap) {
                if ((_oldMapId != $gameMap._mapId) || force_teleport) teleportFollowersToPlayers();
                _oldMapId = $gameMap._mapId;
            }

        } Input.OC_resetControllers(true);

    };

    const teleportFollowersToPlayers = () => {
        if (!followersFollow()) return;
        if (OcRam._menuCalled || OcRam._justTransferedAny) return;
        $allPlayers.forEach(p => {
            if (p) {
                if (p._followingCharacters) {
                    p._followingCharacters.forEach(f => {
                        if (f.rangeTo(p) > 4) {
                            f.locate(p._x, p._y);
                        } else {
                            f.jumpTo(p._x, p._y);
                        } f._pixelMovementDisabled = p._pixelMovementDisabled;
                        f._higherLevel = p._higherLevel;
                    });
                }
            }
        });
    };

    const getGamepad = idx => {
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            let gp = null;
            for (const gamepad of gamepads) {
                if (gamepad.index == idx) gp = gamepad; break;
            } return gp;
        } else {
            return null;
        }
    };

    // Assign device and return zero based player index
    const assignDevice = device_index => {
        if (_forceDevices || _preventJoin) return;
        if ($gameMap && $gameMap._interpreter.isRunning() || $gamePlayer.isInVehicle()) return;
        if ($gamePlayer && $gamePlayer._liftedEvent) return;
        if (OcRam.followers().find(f => f._liftedEvent)) return;
        const player_index = getDevicePlayer(device_index); let try_index = 0;
        if (player_index < 0) {
            if (_maxNumberOfPlayers < (_playerCount + 1)) { _this.debug("Max number of players reached!", "No more players allowed!"); return -1; }
            if (_playerDevices[1] == null && try_index == 0) try_index = 1;
            if (_playerDevices[2] == null && try_index == 0) try_index = 2;
            if (_playerDevices[3] == null && try_index == 0) try_index = 3;
            if (try_index != 0) {
                Input.clear();
                _playerDevices[try_index] = device_index; if (_displayJoined) showTextOnScreen("Player " + (try_index + 1) + " joined the game!");
                _playerCount = getPlayerCount(); _this.debug("Player count is now:", _playerCount);
                getAssignedFollowers(true); if (_playerEnterCE > 0) $gameTemp.reserveCommonEvent(_playerEnterCE);
                $gameTemp._reservePlayerIndexJoined = try_index;
                $allPlayers[try_index].setMoveSpeed(4);
                if (Imported.OcRam_Indicators && OcRam.scene().isMap()) {
                    requestAnimationFrame(() => {
                        if ($allPlayers[0] && !$allPlayers[0]._label) $allPlayers[0].addLabel("P1", null, ColorManager.textColor(_playerColors[0]));
                        if ($allPlayers[try_index]) $allPlayers[try_index].addLabel("P" + (try_index + 1), null, ColorManager.textColor(_playerColors[try_index]));
                    });
                } $gamePlayer.refresh(); return try_index;
            } else {
                _this.debug("No more player slots available for device index:", device_index); return -1;
            }
        } else {
            return player_index - 1;
        }
    };

    // Reset player toggling must be called when dropping off player...
    const resetPlayerToggle = () => {
        if (_currentPlayer == 1 || !$gameMap._mapId) return;
        $gameMap.focusToNextActor(_playerDevices[0]);
        if (_currentPlayer != 1) $gameMap.focusToNextActor(_playerDevices[0]);
        if (_currentPlayer != 1) $gameMap.focusToNextActor(_playerDevices[0]);
        _this.debug("resetPlayerToggle - Player in turn:", _currentPlayer);
    };

    // Drop player starting from P4
    const dropLastPlayer = () => {
        if (_playerDevices[3] != null) {
            dropDevice(_playerDevices[3]);
        } else {
            if (_playerDevices[2] != null) {
                dropDevice(_playerDevices[2]);
            } else {
                if (_playerDevices[1] != null) {
                    dropDevice(_playerDevices[1]);
                }
            }
        }
    };

    const updateFollowerVisibility = () => {
        if (_followersAreHidden) {
            $gamePlayer.hideFollowers();
            $gamePlayer.refresh();
        }
    };

    // Drop player and return zero based player index
    const dropDevice = device_index => {

        if (_forceDevices || OcRam.Events.p2pp()) return;

        resetPlayerToggle();

        if (_playerDevices[1] == device_index) {
            if ($allPlayers[1] != null && followersFollow()) {
                $allPlayers[1]._x = $gamePlayer._x; $allPlayers[1]._realX = $gamePlayer._realX;
                $allPlayers[1]._y = $gamePlayer._y; $allPlayers[1]._realY = $gamePlayer._realY;
                $allPlayers[1]._deviceIndex_OC = 0; $allPlayers[1]._playerIndex_OC = 0;
            } if (device_index < 0) { $gameTemp.clearDestination2(); }
            if (Imported.OcRam_Indicators) {
                if ($allPlayers[1]) $allPlayers[1].removeLabel();
                if ($allPlayers[2]) $allPlayers[2].removeLabel();
                if ($allPlayers[3]) $allPlayers[3].removeLabel();
            } $allPlayers[1] = $allPlayers[2]; _playerDevices[1] = _playerDevices[2];
            $allPlayers[2] = $allPlayers[3]; _playerDevices[2] = _playerDevices[3];
            $allPlayers[3] = null; _playerDevices[3] = null;
            showTextOnScreen("Player 2 left the game!");
            _playerCount = getPlayerCount(); _this.debug("Player count is now:", _playerCount);
            getAssignedFollowers(true); if (_playerLeaveCE > 0) $gameTemp.reserveCommonEvent(_playerLeaveCE);
            $gameTemp._reservePlayerIndexLeft = 1; if (Imported.OcRam_Indicators && _playerCount < 2) {
                if ($allPlayers[0] && $allPlayers[0]._label) $allPlayers[0].removeLabel();
            } refreshPrecedingCharacters();
            if (Imported.OcRam_Indicators && _playerIndicator) {
                if ($allPlayers[1]) $allPlayers[1].addLabel("P2", null, ColorManager.textColor(_playerColors[1]));
                if ($allPlayers[2]) $allPlayers[2].addLabel("P3", null, ColorManager.textColor(_playerColors[2]));
            } updateFollowerVisibility(); return 1;
        }

        if (_playerDevices[2] == device_index) {
            if ($allPlayers[2] != null && followersFollow()) {
                $allPlayers[2]._x = $gamePlayer._x; $allPlayers[2]._realX = $gamePlayer._realX;
                $allPlayers[2]._y = $gamePlayer._y; $allPlayers[2]._realY = $gamePlayer._realY;
                $allPlayers[2]._deviceIndex_OC = 0; $allPlayers[2]._playerIndex_OC = 0;
            } if (device_index < 0) { $gameTemp.clearDestination2(); }
            if (Imported.OcRam_Indicators) {
                if ($allPlayers[2]) $allPlayers[2].removeLabel();
                if ($allPlayers[3]) $allPlayers[3].removeLabel();
            } $allPlayers[2] = $allPlayers[3]; _playerDevices[2] = _playerDevices[3];
            $allPlayers[3] = null; _playerDevices[3] = null;
            showTextOnScreen("Player 3 left the game!");
            _playerCount = getPlayerCount(); _this.debug("Player count is now ", _playerCount);
            getAssignedFollowers(true); if (_playerLeaveCE > 0) $gameTemp.reserveCommonEvent(_playerLeaveCE);
            $gameTemp._reservePlayerIndexLeft = 2; if (Imported.OcRam_Indicators && _playerCount < 2) {
                if ($allPlayers[0] && $allPlayers[0]._label) $allPlayers[0].removeLabel();
            } refreshPrecedingCharacters();
            if (Imported.OcRam_Indicators && _playerIndicator) {
                if ($allPlayers[1]) $allPlayers[1].addLabel("P2", null, ColorManager.textColor(_playerColors[1]));
            } updateFollowerVisibility(); return 2;
        }

        if (_playerDevices[3] == device_index) {
            if ($allPlayers[3] != null && followersFollow()) {
                $allPlayers[3]._x = $gamePlayer._x; $allPlayers[3]._realX = $gamePlayer._realX;
                $allPlayers[3]._y = $gamePlayer._y; $allPlayers[3]._realY = $gamePlayer._realY;
                $allPlayers[3]._deviceIndex_OC = 0; $allPlayers[3]._playerIndex_OC = 0;
                if (Imported.OcRam_Indicators && $allPlayers[3]) $allPlayers[3].removeLabel();
            } if (device_index < 0) { $gameTemp.clearDestination2(); }
            if (Imported.OcRam_Indicators && $allPlayers[3]) $allPlayers[3].removeLabel();
            $allPlayers[3] = null; _playerDevices[3] = null;
            showTextOnScreen("Player 4 left the game!");
            _playerCount = getPlayerCount(); _this.debug("Player count is now ", _playerCount);
            getAssignedFollowers(true); if (_playerLeaveCE > 0) $gameTemp.reserveCommonEvent(_playerLeaveCE);
            $gameTemp._reservePlayerIndexLeft = 3; if (Imported.OcRam_Indicators && _playerCount < 2) {
                if ($allPlayers[0] && $allPlayers[0]._label) $allPlayers[0].removeLabel();
            } updateFollowerVisibility(); refreshPrecedingCharacters(); return 3;
        }

        if (Imported.OcRam_Indicators && _playerCount < 2) {
            if ($allPlayers[0] && $allPlayers[0]._label) $allPlayers[0].removeLabel();
        }

        refreshPrecedingCharacters(); teleportFollowersToPlayers();

        updateFollowerVisibility(); return -1;

    };

    // This will make follower move
    const setDir4 = (follower_obj, dir) => { follower_obj.dir4_OC = dir; };
    const setDir8 = (follower_obj, dir) => { follower_obj.dir8_OC = dir; };

    const getPlayerByInputDevice = input_device => {
        let pc = 1; let f = false;
        _playerDevices.find(id => {
            if (id == input_device) { f = true; return true; } pc++;
        }); return f ? pc : 1; // If found player device return it's index else it's P1
    };

    // For future update
    const showTextOnScreen = (text_to_show, battle_msg) => {

        if (!_showInfoText) return;

        if (_sceneTextLayer != null) {
            _sceneTextLayer._maxFrames = (battle_msg) ? (_textFadeTime * 0.666) : _textFadeTime;
            _sceneTextLayer._framesPreCalculated = _sceneTextLayer._maxFrames * 0.5;
            _sceneTextLayer.writeText(text_to_show);
        } _this.debug("showTextOnScreen", "('" + text_to_show + "')");

    };

    // Zero based player index as parameter
    const swapPlayers = (p1, p2) => {
        if (_playerDevices[p1] == null || _playerDevices[p2] == null) return;
        const p_tmp = _playerDevices[p1];
        _playerDevices[p1] = _playerDevices[p2];
        _playerDevices[p2] = p_tmp;
        Input.OC_resetControllers(true);
        getAssignedFollowers();
        _this.debug("Swapped players", p1 + " and " + p2);
    };

    // Returns true if number between -2 and 2
    const numberNearZero = number_to_check => {
        return ((number_to_check) < 3 && (number_to_check) > -3) ? true : false;
    };

    const getActualPlayer = () => {
        let pit = Number($gameVariables.value(_playerInTurnVarId));
        if (!followersFollow()) {
            if (pit == 1 && pit != _pit) { pit = _pit; }
            else if (pit == _pit) { pit = 1; }
        } return pit;
    };

    const getPlayerColor = p => {
        return _playerColors[p - 1];
    };

    const changeMaxPlayer = max => {
        const new_max = Number(max);
        while (_playerCount > new_max) {
            dropLastPlayer();
        } if (_maxNumberOfPlayers != new_max) {
            _maxNumberOfPlayers = new_max;
            refreshPrecedingCharacters(); teleportFollowersToPlayers();
        }
    };

    const teleOnLoad = m => {
        if (m._playerIndex_OC) return false;
        if ($gamePlayer._followingCharacters.find(f => { f._memberIndex == m._memberIndex; })) return false;
        return _memberArray[_playerCount][m._memberIndex] == 1;
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================

    // Get player from device index
    this.getDevicePlayer = device_index => {
        return getDevicePlayer(device_index);
    };

    // Get player from device index
    this.getPlayerDevice = player_index => {
        return _playerDevices[player_index];
    };

    // Prevent player joins?
    this.allowJoin = allow => {
        _preventJoin = !allow;
    };

    this.isJoinAllowed = () => !_preventJoin;

    // Refresh refreshPrecedingCharacters?
    this.refreshPrecedingCharacters = () => {
        refreshPrecedingCharacters();
    };

    // Assign device to player
    this.assignDevice = index => {
        assignDevice(index);
    };

    // Force current devices to all players
    this.setForcedDevices = value => {
        _forceDevices = OcRam.getBoolean(value);
    }

    // Force toggle to party member X
    this.forceToggle = member_index => {

        // Check that member exists...
        if (member_index < 0) return;
        if (member_index > OcRam.followers().length) return;

        const f = OcRam.followers()[member_index];
        if (f) {
            if (!followersFollow()) {

                $gameParty.swapOrder_OC(0, f._memberIndex);

                _currentLeader++;
                if (_currentLeader > _playerCount) {
                    _currentLeader = 1;
                    switch (_playerCount) {
                        case 2: swapPlayers(0, 1); break;
                        case 3: swapPlayers(0, 1); swapPlayers(1, 2); break;
                        case 4: swapPlayers(0, 1); swapPlayers(1, 2); swapPlayers(2, 3); break;
                    }
                } else {
                    swapPlayers(0, _currentLeader - 1);
                } _pit = _currentLeader; setPlayerInTurnVar(_pit);

                if (Imported.OcRam_Indicators) {
                    f.removeLabel();
                    $allPlayers[0].addLabel("P" + _pit, null, ColorManager.textColor(_playerColors[_pit - 1]));
                }

                if (_showPlayerTurns) showTextOnScreen("Player " + _pit + " turn!", true);

            } else {
                const leader = f._leaderCharacter;
                if (leader) $gameParty.swapOrder_OC(leader._memberIndex || 0, f._memberIndex);
            }
        }

    };

    // Made public so that OcRam_Followers may call this...
    this.teleOnLoad = () => {
        if (followersFollow()) {
            refreshPrecedingCharacters();
            $gamePlayer._followers._data.forEach(f => {
                if (f) {
                    if (teleOnLoad(f)) {
                        f.locate($gamePlayer._x, $gamePlayer._y);
                    }
                }
            });
        } refreshPrecedingCharacters();
    };

    // Change max players
    this.changeMaxPlayer = max => { changeMaxPlayer(max); };

    // Used when followers follow = false
    this.getActualPlayer = () => {
        return getActualPlayer();
    };

    // Drop device >> Re-assigned to P1
    this.dropDevice = index => {
        dropDevice(index);
    };

    // Drop device by player
    this.dropPlayer = p => {
        p = Number(p); // Who would it be?
        if (p < 2) return; if (p > 4) return; // Accept only 2 - 4
        const di = _playerDevices[p - 1]; // Get players device
        if (di === null || di === undefined) return; // ??
        dropDevice(Number(di)); // Drop the device
    };

    // System color index for this player
    this.getPlayerColor = p => getPlayerColor(p);

    // Can players move?
    this.canPlayerMove = () => {
        return _canMove;
    };

    // Auto apply "player" object
    this.autoApply = () => {
        if (_playerInTurnVarId) {
            if (!$gameMap || !$gameMap._interpreter) return;
            const interpreter = $gameMap._interpreter; if (!_preventClear) Input.clearAll();
            const pi = $gameVariables.value(_playerInTurnVarId);
            if (pi == 1 || pi == 0) {
                interpreter.applyTo(1);
            } else {
                const found_follower = $gamePlayer._followers._data.find(f => {
                    if (f._playerIndex_OC == pi - 1) return true;
                }); interpreter.applyTo(Number(found_follower._memberIndex) + 1);
            }
        } else {
            alert('OcRam.Local_Coop.autoApply feature requires "Player in turn variable"!');
        }
    };

    // Does anyone has lifted events?
    if (Imported.OcRam_Events) {
        this.anyLiftedEvents = () => {
            if ($gamePlayer._liftedEvent) return true;
            return !!OcRam.followers().find(f => {
                if (f._liftedEvent) return true;
            });
        };
    } else {
        this.anyLiftedEvents = () => {
            return !!($gamePlayer._liftedEvent);
        };
    }

    // Forces turn to any player
    this.setPlayerInTurn = (player_index, request_anim_frame) => {

        if (player_index < 1) player_index = 1;
        if (player_index > 4) player_index = 4;

        if (request_anim_frame) {
            requestAnimationFrame(() => {
                this.setPlayerInTurn(player_index);
            });
        } else {
            this.debug("OcRam.Local_Coop.setPlayerInTurn(" + player_index + ");", "$allPlayers:", $allPlayers);
            _playerInTurn = player_index - 1;
            if (_playerInTurn == 0) {
                $tempGamePlayer_OC = null;
            } else {
                $tempGamePlayer_OC = $allPlayers[_playerInTurn];
            } if (!$tempGamePlayer_OC) _playerInTurn = 0;
            setPlayerInTurnVar(player_index);
        }

    };

    // Force player turn based on played party member!
    this.setMemberInTurn = (mi, request_anim_frame) => {
        Input.clearAll();
        if (request_anim_frame) {
            this.setMemberInTurn(mi);
        } else {
            if (mi < 2) {
                this.setPlayerInTurn(1);
            } else {
                this.setPlayerInTurn(Number(OcRam.followers()[mi - 2]._playerIndex_OC) + 1);
            }
        }
    };

    // Gets internal player member assignments
    this.memberArray = () => _memberArray[_playerCount];

    this.dropLastPlayer = () => { dropLastPlayer(); };

    // How many players there are currently in game?
    this.getPlayerCount = () => {
        return _playerCount;
    };

    this.getMaxPlayers = () => {
        return _maxNumberOfPlayers;
    };

    // Swaps desired players maybe?
    this.swapPlayers = (p1, p2) => {
        swapPlayers(p1 - 1, p2 - 1);
    };

    // Used with OcRam_Movement for example... Really complex async stuff with timeouts across several plugins, 
    // with all different behaviours == makes my head explode :')
    this.resetCurrentPlayer = dont_reset_steps => {
        const p_in_turn = $allPlayers[_playerInTurn];
        if ( p_in_turn) p_in_turn._preventNextOk = true;
        if (_playerDevices[0] == -1) $gameTemp.clearDestination2();
        _playerInTurn = 0; $tempGamePlayer_OC = null;
        setPlayerInTurnVar(1); _canMove = true;
        if (!p_in_turn) return;
        if (dont_reset_steps) {
            requestAnimationFrame(() => {
                p_in_turn._stepsToTrigger = 4;
                p_in_turn._preventNextOk = false;
            }); $gameTemp.clearDestination2(); return;
        } setTimeout(function () { // cool down for next ok
            if (p_in_turn) p_in_turn._preventNextOk = false;
        }, 1000); $gameTemp.clearDestination2();
    };

    // Override OcRam_Core logics... To get player who started the event...
    OcRam.playerCharacter = () => {
        return $tempGamePlayer_OC || $gamePlayer;
    };

    if (!Imported.OcRam_Followers) {

        // ------------------------------------------------------------------------------
        // OcRam_Followers NOT imported!
        // ==============================================================================

        _this.debug("OcRam_Followers NOT imported! >> Importing some methods from it...");

        Game_Interpreter.prototype.applyTo = function (index) {
            const ev = this.event();
            if (ev) {
                ev._applyToChar = $gamePlayer;
                if (index == 1) {
                    ev._applyToChar = $gamePlayer;
                } else {
                    if (index < OcRam.followers().length + 2) {
                        ev._applyToChar = OcRam.followers()[index - 2];
                    }
                }
            }
        };

        // Set Movement Route
        this.extend(Game_Interpreter, "command205", function (params) {
            if (params[0] && params[0] < 0) {
                const obj = this.event()._applyToChar;
                if (obj) params[0] = OcRam.getGameObjectId(obj);
            } return _this["Game_Interpreter_command205"].apply(this, arguments);
        });

        // Show Animation
        this.extend(Game_Interpreter, "command212", function (params) {
            if (params[0] && params[0] < 0) {
                const obj = this.event()._applyToChar;
                if (obj) params[0] = OcRam.getGameObjectId(obj);
            } return _this["Game_Interpreter_command212"].apply(this, arguments);
        });

        // Show Balloon Icon
        this.extend(Game_Interpreter, "command213", function (params) {
            if (params[0] && params[0] < 0) {
                const obj = this.event()._applyToChar;
                if (obj) params[0] = OcRam.getGameObjectId(obj);
            } return _this["Game_Interpreter_command213"].apply(this, arguments);
        });

        // Game_Interpreter.character for follower control
        this.extend(Game_Interpreter, "character", function (param) {
            if ($gameParty.inBattle()) {
                return null;
            } else if (param < 0) {
                if (param == -1) {
                    return $gamePlayer;
                } else {
                    return OcRam.followers()[-(param) - 2];
                }
            } else {
                return _this["Game_Interpreter_character"].apply(this, arguments);
            }
        });

        Game_Map.prototype.focusToNextActor = () => { /* Toggling requires OcRam_Followers */ };
        Game_Map.prototype.focusToPreviousActor = () => { /* Toggling requires OcRam_Followers */ };

    } else { // Yay we got OcRam_Followers plugin!

        followersFollow = () => { return OcRam.Followers.isFollowing(); };

        const getFirstIndx = (p, ma) => {
            let i = 0;
            ma.some(itm => {
                if (itm == p) return true; i++;
            }); return i;
        };

        const getLastIndx = (p, ma) => {
            const len = OcRam.followers().length; if (ma[len] == p) return len;
            if (ma.length > 1 && ma[len - 1] == p) return len - 1;
            if (ma.length > 2 && ma[len - 2] == p) return len - 2;
            if (ma.length > 3 && ma[len - 3] == p) return len - 3;
        };

        // Toggles battle mambers!
        Game_Map.prototype.togglePlayer = function (invert, input_from) {

            let p = getPlayerByInputDevice(input_from); p = p < 1 ? 1 : p;
            if ($allPlayers[p - 1] && $allPlayers[p - 1]._liftedEvent) return;

            if (p > 4) p = 4;
            let pc = _playerCount;
            if (pc > 4) pc = 4; if (pc < 1) pc = 1;
            const ma = _memberArray[pc];

            const fnf = !followersFollow();
            if (fnf && _playerCount > 1) {
                if (input_from > -1) {
                    if (_playerDevices[0] != -1 && input_from != _playerDevices[0]) return;
                } else {
                    if (input_from != -1 && input_from != _playerDevices[0]) return;
                }
            }

            if ($gameParty.inBattle() || $gameMessage.isBusy() || OcRam._menuCalled || !_allowTogling) return;
            if ($gamePlayer._followers.visibleFollowers().length < 1) return;

            const this_se = { name: _toggleSE, volume: 90, pitch: 100, pan: 0, pos: 0 };
            AudioManager.playSe(this_se); $gameTemp.clearDestination();

            const follower_count = OcRam.followers().length;

            if (fnf && _playerCount > 1) { // Also change camera focus!
                let old = 0; _currentLeader++;
                if (_currentLeader > _playerCount) {
                    _currentLeader = 1;
                    switch (_playerCount) {
                        case 2: swapPlayers(0, 1); break;
                        case 3: swapPlayers(0, 1); swapPlayers(1, 2); break;
                        case 4: swapPlayers(0, 1); swapPlayers(1, 2); swapPlayers(2, 3); break;
                    }
                } else {
                    swapPlayers(0, _currentLeader - 1);
                } if (invert) { // PgUp, 1 (NEXT)
                    for (let i = follower_count; i > -1; i--) {
                        old = 0; $gameParty.swapOrder_OC(old, i); old = i;
                    }
                } else { // PgDwn, 2 (PREV)
                    for (let i = 0; i < follower_count; i++) {
                        old = follower_count;
                        $gameParty.swapOrder_OC(i, old); old = i;
                    }
                }  _pit++; if (_pit > _playerCount) _pit = 1; //setPlayerInTurnVar(_pit);
                if (_showPlayerTurns) showTextOnScreen("Player " + _pit + " turn!", true);
            } else {
                let old = getFirstIndx(p, ma);
                if (invert) { // PgUp
                    for (let i = follower_count; i > -1; i--) {
                        old = getFirstIndx(p, ma);
                        if (ma[i] == p) {
                            $gameParty.swapOrder_OC(old, i); old = i;
                        }
                    }
                } else { // PgDwn
                    for (let i = 0; i < follower_count; i++) {
                        old = getLastIndx(p, ma);
                        if (ma[i] == p) {
                            $gameParty.swapOrder_OC(i, old); old = i;
                        }
                    }
                }
            }

            OcRam.followers().forEach(f => {
                if (f._blinkHandle && !f._playerIndex_OC) clearTimeout(f._blinkHandle);
            });

            const char = p == 1 ? $gamePlayer : OcRam.followers()[p - 2];

            if (!followersFollow() && Imported.OcRam_Indicators && _playerIndicator) {
                $allPlayers.forEach(p => {
                    if (p && p._label) p.removeLabel();
                }); if (_playerCount > 1) $allPlayers[0].addLabel("P" + _pit, null, ColorManager.textColor(_playerColors[_pit - 1]));
            }

            char.startToBlink_OC();

            $allPlayers.forEach(p => {
                if (p) p._myActor = p.getActor();
            });

        };

    }

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    Game_Follower.prototype.isDashing = function () {
        return this._dashing;
    };

    Game_Follower.prototype.isPlayer = function () { return !!this._playerIndex_OC; }; //true; };

    Game_Follower.prototype.isOnDamageFloor = function () {
        return $gameMap.isDamageFloor(this.x, this.y) && !$gamePlayer.isInAirship();
    };

    Game_Follower.prototype.isInAirship = function () {
        return $gamePlayer.isInAirship();
    };

    if (Imported.OcRam_Passages) {
        Game_Follower.prototype.startMapEvent = function (x, y, triggers, normal) {
            if (!$gameMap.isEventRunning()) {
                const this_hl = (this !== undefined) ? this._higherLevel : false;
                setPlayerInTurnVar(getRealPlayer(this._playerIndex_OC));
                for (const event of $gameMap.eventsXy(x, y)) {
                    event.refresh();
                    if (
                        event.isTriggerIn(triggers) &&
                        event.isNormalPriority() === normal
                    ) {
                        const ev_cmts = event.getComments(); let trigger_always = false;
                        for (let i = 0; i < ev_cmts.length; i++) {
                            if (ev_cmts[i].parameters[0] == "<trigger_always>") trigger_always = true;
                        } if (event._higherLevel == this_hl || trigger_always) {
                            const list = event.list();
                            if (list && list.length > 1) {
                                this._preventNextOk = true; //$gameTemp.clearDestination2();
                                $tempGamePlayer_OC = this; // Object where to apply $gamePlayer stuff...
                                if ((event._trigger < 1 || event._trigger > 2)) {
                                    if (OcRam.listHasStopCodes(list)) {
                                        _preventClear = false; _playerInTurn = this._playerIndex_OC; Input.clearAll(this);
                                    } else {
                                        _preventClear = true; _playerInTurn = this._playerIndex_OC; // Just don't clear input
                                    }
                                } else {
                                    if (OcRam.listHasStopCodes(list)) {
                                        _preventClear = false; _playerInTurn = this._playerIndex_OC; Input.clearAll(this);
                                    } else { _preventClear = true; this._preventNextOk = false; }
                                } event.start();
                            }
                        }
                    }
                }
            }
        };
    } else {
        Game_Follower.prototype.startMapEvent = function (x, y, triggers, normal) {
            if (!$gameMap.isEventRunning()) {
                setPlayerInTurnVar(getRealPlayer(this._playerIndex_OC));
                for (const event of $gameMap.eventsXy(x, y)) {
                    event.refresh();
                    if (
                        event.isTriggerIn(triggers) &&
                        event.isNormalPriority() === normal
                    ) {
                        const list = event.list();
                        if (list && list.length > 1) {
                            this._preventNextOk = true; //$gameTemp.clearDestination2();
                            $tempGamePlayer_OC = this; // Object where to apply $gamePlayer stuff...
                            if ((event._trigger < 1 || event._trigger > 2)) {
                                if (OcRam.listHasStopCodes(list)) {
                                    _preventClear = false; _playerInTurn = this._playerIndex_OC; Input.clearAll(this);
                                } else {
                                    _preventClear = true; _playerInTurn = this._playerIndex_OC; // Just don't clear input
                                }
                            } else {
                                if (OcRam.listHasStopCodes(list)) {
                                    _preventClear = false; _playerInTurn = this._playerIndex_OC; Input.clearAll(this);
                                } else { _preventClear = true; this._preventNextOk = false; }
                            } event.start();
                        }
                    }
                }
            }
        };
    }

    Input.clearAll = function (pFollower) {
        if (pFollower) {
            pFollower.dir4_OC = 0; pFollower.dir8_OC = 0;
            pFollower._okIsPressed = false;
        } _canMove = false;
        TouchInput._mousePressed2 = false;
        TouchInput._mouseCancel2 = false;
        //TouchInput._mousePressed = false;
        this._currentState2 = {};
        this._previousState2 = {};
        if (!_preventClear) {
            this._latestButton = null;
            this._pressedTime = 0;
            this._dir4 = 0;
            this._dir8 = 0;
            this._preferredAxis = '';
            this._date = 0;
            this._currentState = {};
            this._gamepadStates = [];
            this._previousState = {};
        } else {
            /*requestAnimationFrame(() => {
                _preventClear = false;
            });*/
            return;
        }
    };

    // Move follower by input
    Game_Follower.prototype.moveByInput = function () {

        //if (this._playerIndex_OC) $gamePlayer._followers.update();

        if (this._deviceIndex_OC == -1) {

            // This followers is controlled via kb or mouse

            if (!this.isMoving() && this.canMove()) {

                let direction = this.getInputDirection();

                if (direction > 0) {
                    if ($gameTemp.isDestinationValid2()) this.triggerTouchAction();
                    $gameTemp.clearDestination2();
                } else if ($gameTemp.isDestinationValid2()) {
                    direction = this.findDirectionTo($gameTemp.destinationX2(), $gameTemp.destinationY2());
                }

                if (direction > 0) {
                    this.executeMove(direction);
                    if (!this.isMovementSucceeded()) {
                        if ($gameTemp.isDestinationValid2()) this.triggerTouchAction();
                        $gameTemp.clearDestination2();
                    }
                } else { // Reached destination
                    if ($gameTemp.isDestinationValid2()) this.triggerTouchAction();
                    $gameTemp.clearDestination2();
                }

            }

        } else {

            // This followers is controlled via gamepad
            if (!this.isMoving() && this.canMove()) {
                const direction = this.getInputDirection();
                if (direction > 0) this.executeMove(direction);
            }

        }

    };

    // Move follower by input (from kb, mouse or gamepad)
    if (_pixelMoveEnabled) { // In case OcRam_Movement is not imported
        Game_Follower.prototype.executeMove = function (direction) {
            if (direction % 2 !== 0) {
                const hv = OcRam.Movement.getHorzVert(direction);
                this.moveDiagonally(hv[0], hv[1]);
            } else {
                this.moveStraight(direction);
            };
            if (this._playerIndex_OC) {
                this._prevSteps[3] = this._prevSteps[2];
                this._prevSteps[2] = this._prevSteps[1];
                this._prevSteps[1] = this._prevSteps[0];
                this._prevSteps[0] = [this._x, this._y];
            }
        };
    } else {
        Game_Follower.prototype.executeMove = function (direction) {
            if (direction % 2 !== 0) {
                const hv = OcRam.Movement.getHorzVert(direction);
                this.moveDiagonally(hv[0], hv[1]);
            } else {
                this.moveStraight(direction);
            };
        };
    }

    // Get direction from input (from kb, mouse or gamepad)
    Game_Follower.prototype.getInputDirection = function () {

        let ret = Imported.OcRam_Movement ? this.dir8_OC : this.dir4_OC;

        if (this._deviceIndex_OC < 0) { // KB1 and KB2

            this._okIsPressed = Input.isPressed2('ok') && !this._preventNextOk;
            this._cancelIsPressed = Input.isPressed2('cancel');
            this._shiftIsPressed = TouchInput.isPressed2() || Input.isPressed2('shift');
            this._menuIsPressed = TouchInput.isCancel2() || Input.isPressed2('menu');

            const y = Input.isPressed2('up') ? 8 : Input.isPressed2('down') ? 2 : 0;
            const x = Input.isPressed2('left') ? 4 : Input.isPressed2('right') ? 6 : 0;

            if (x != 0 && y != 0) {
                if (Imported.OcRam_Movement) {
                    ret = OcRam.Movement.getHorzVertDir(x, y);
                } else {
                    ret = x;
                }
            } else {
                ret = x != 0 ? x : y;
            }

        }

        if (this._okIsPressed && !this._preventNextOk) {
            this.checkEventTriggerHere([0]);
            if (!_pixelMoveEnabled || this._stepsToTrigger < 1) {
                this.checkEventTriggerThere([0, 1, 2]);
            } else {
                this.checkEventTriggerThere([0]);
            }
        }

        if (this._menuIsPressed) {
            this._menuIsPressed = false;
            if (!$gameParty.inBattle() && !_this.anyLiftedEvents()) {
                _playerInTurn = this._playerIndex_OC;
                OcRam._menuCalled = true;
                Input.OC_resetControllers(true);
                SceneManager.push(Scene_Menu); _canMove = false;
                Window_MenuCommand.initCommandPosition();
            }
        }

        return ret;

    };

    Input.isPressedEX = function (playerIndex, key) {
        if (playerIndex == 0) { // P1 keyboard
            return this.isPressed(key);
        } else {
            if (_playerDevices[playerIndex] != null) {
                if (this._currentState2[_playerDevices[playerIndex]] != undefined) {
                    return this._currentState2[_playerDevices[playerIndex]][this.gamepadMapperInv[key]];
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    };

    Game_Follower.prototype.isNormal = function () {
        return $gamePlayer._vehicleType === "walk" && !this.isMoveRouteForcing();
    };

    if (!Game_Follower.prototype.canMove) {
        Game_Follower.prototype.canMove = function () {
            if ($gameMap.isEventRunning() || $gameMessage.isBusy()) return false;
            if (this.isMoveRouteForcing() || $gamePlayer.areFollowersGathering()) return false;
            /*if (this._vehicleGettingOn || this._vehicleGettingOff) {
                return false;
            }*/
            if ($gamePlayer.isInVehicle() && !$gamePlayer.vehicle().canMove()) return false;
            return _canMove;
        };
    } else {
        this.extend(Game_Follower, "canMove", function () {
            const ret = _this["Game_Follower_canMove"].apply(this, arguments);
            const ev = $gameMap.event($gameMap._interpreter.eventId());
            if (!ev) return ret; if (ev._trigger < 1 || ev._trigger > 2) return _canMove ? ret : false;
            if (OcRam.listHasStopCodes($gameMap._interpreter._list)) return false;
            return ev.isThrough() ? true : false;
            /*if (!_canMove) return false;
            return _this["Game_Follower_canMove"].apply(this, arguments);*/
        });
    }

    Game_Follower.prototype.triggerAction = function () {
        if (this.canMove()) {
            if (this.triggerButtonAction()) {
                return true;
            }
            if (this.triggerTouchAction()) {
                return true;
            }
        }
        return false;
    };

    Game_Follower.prototype.triggerButtonAction = function () {
        if (this._okIsPressed && !this._preventNextOk) {
            /*if (this.getOnOffVehicle()) {
                return true;
            }*/
            this.checkEventTriggerHere([0]);
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
            if (!_pixelMoveEnabled || this._stepsToTrigger < 1) {
                this.checkEventTriggerThere([0, 1, 2]);
            } else {
                this.checkEventTriggerThere([0]);
            }
            if ($gameMap.setupStartingEvent()) {
                return true;
            }
        } return false;
    };

    Game_Follower.prototype.triggerTouchAction = function () {
        if ($gameTemp.isDestinationValid2()) {
            const direction = this.direction();
            const x1 = this.x;
            const y1 = this.y;
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            const x3 = $gameMap.roundXWithDirection(x2, direction);
            const y3 = $gameMap.roundYWithDirection(y2, direction);
            const destX = $gameTemp.destinationX2();
            const destY = $gameTemp.destinationY2();
            if (destX === x1 && destY === y1) {
                return this.triggerTouchActionD1(x1, y1);
            } else if (destX === x2 && destY === y2) {
                return this.triggerTouchActionD2(x2, y2);
            } else if (destX === x3 && destY === y3) {
                return this.triggerTouchActionD3(x2, y2);
            }
        } return false;
    };

    Game_Follower.prototype.triggerTouchActionD1 = function (x1, y1) {
        /*if ($gameMap.airship().pos(x1, y1)) {
            if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
                return true;
            }
        }*/
        this.checkEventTriggerHere([0]);
        return $gameMap.setupStartingEvent();
    };

    Game_Follower.prototype.checkEventTriggerTouch = function (x, y) {
        if ($gamePlayer.canStartLocalEvents()) {
            this.startMapEvent(x, y, [1, 2], true);
        }
    };

    Game_Follower.prototype.triggerTouchActionD2 = function (x2, y2) {

        /*if ($gameMap.boat().pos(x2, y2) || $gameMap.ship().pos(x2, y2)) {
            if (TouchInput.isTriggered() && this.getOnVehicle()) {
                return true;
            }
        }
        if (this.isInBoat() || this.isInShip()) {
            if (TouchInput.isTriggered() && this.getOffVehicle()) {
                return true;
            }
        }*/

        if (!_pixelMoveEnabled || this._stepsToTrigger < 1) {
            this.checkEventTriggerThere([0, 1, 2]);
        } else {
            this.checkEventTriggerThere([0]);
        } return $gameMap.setupStartingEvent();

    };

    Game_Follower.prototype.triggerTouchActionD3 = function (x2, y2) {
        if ($gameMap.isCounter(x2, y2)) {
            if (!_pixelMoveEnabled || this._stepsToTrigger < 1) {
                this.checkEventTriggerThere([0, 1, 2]);
            } else {
                this.checkEventTriggerThere([0]);
            }
        } return $gameMap.setupStartingEvent();
    };

    Game_Follower.prototype.updateNonmoving = function (wasMoving, sceneActive) {
        if (!this._playerIndex_OC) return;
        if (!$gameMap.isEventRunning()) {
            if (wasMoving) {
                $gameParty.onPlayerWalk(this);
                this.checkEventTriggerHere([1, 2]);
                if ($gameMap.setupStartingEvent()) {
                    return;
                }
            } if (sceneActive && this.triggerAction()) {
                return;
            }
        }
    };

    Game_Follower.prototype.checkEventTriggerHere = function (triggers) {
        if ($gamePlayer.canStartLocalEvents()) {
            this.startMapEvent(this.x, this.y, triggers, false);
        }
    };

    Game_Follower.prototype.checkEventTriggerThere = function (triggers) {
        if ($gamePlayer.canStartLocalEvents()) {
            const direction = this.direction();
            const x1 = this.x;
            const y1 = this.y;
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            this.startMapEvent(x2, y2, triggers, true);
            if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(x2, y2)) {
                const x3 = $gameMap.roundXWithDirection(x2, direction);
                const y3 = $gameMap.roundYWithDirection(y2, direction);
                this.startMapEvent(x3, y3, triggers, true);
            }
        }
    };

    Game_Character.prototype.getClosestPlayer = function () {
        let pd = Math.abs(this.x - $gamePlayer.x) + Math.abs(this.y - $gamePlayer.y); let o = $gamePlayer;
        $gamePlayer._followers.visibleFollowers().forEach(follower => {
            if (follower._playerIndex_OC > 0 || !followersFollow()) {
                const tmp = Math.abs(this.x - follower.x) + Math.abs(this.y - follower.y);
                if (tmp < pd) { pd = tmp; o = follower; }
            }
        }); return o;
    };

    Game_Temp.prototype.setDestination2 = function (x, y) {
        if ($gameMap.isEventRunning() || $gameMessage.isBusy()) return;
        this._destinationX2 = x;
        this._destinationY2 = y;
    };

    Game_Temp.prototype.clearDestination2 = function () {
        this._destinationX2 = null;
        this._destinationY2 = null;
    };

    Game_Temp.prototype.isDestinationValid2 = function () {
        return this._destinationX2 !== null;
    };

    Game_Temp.prototype.destinationX2 = function () {
        return this._destinationX2;
    };

    Game_Temp.prototype.destinationY2 = function () {
        return this._destinationY2;
    };

    Game_Player.prototype.isVisible = function () {
        return true;
    };

    Game_Temp._reservePlayerIndexJoined = 0;
    Game_Temp._reservePlayerIndexLeft = 0;

    Input.isPressed2 = function (keyName) {
        if (this._isEscapeCompatible(keyName) && this.isPressed2('escape')) {
            return true;
        } else {
            const is_pressed = !!this._currentState2[keyName];
            if (is_pressed) this._latestButton = keyName;
            return is_pressed;
        }
    };

    TouchInput.isPressed2 = function () {
        return this._mousePressed2;
    };

    TouchInput.isCancel2 = function () {
        return this._mouseCancel2;
    };

    Input.OC_resetControllers = function (clear_p1_also) {
        if ($gameTemp != null) $gameTemp.clearDestination2();
        this._currentState2 = {}; this._previousState2 = {};
        //if (_preventClear) return; if (clear_p1_also) this.clear();
        if (clear_p1_also) this.clear();
    };

    const _preventGPStart = {};

    // New method where dir-pad is enabled
    Input._updateGamepadState_OC = function (gamepad, player_idx) {

        const lastState = this._gamepadStates[gamepad.index] || [];
        const newState = [];
        const buttons = this.remapButtons(gamepad.id, gamepad.buttons);
        const axes = this.remapAxes(gamepad.id, gamepad.axes);
        const threshold = 0.5;

        if (buttons[Input.gamepadMapperInv["start"]].pressed) {
            if (!$gameTemp) return;
            if (buttons[Input.gamepadMapperInv["ok"]].pressed) {
                dropDevice(gamepad.index); _preventGPStart[gamepad.index] = true;
            } else if (!_preventGPStart[gamepad.index]) assignDevice(gamepad.index); return;
        } if (_preventGPStart[gamepad.index]) _preventGPStart[gamepad.index] = false;

        newState[12] = false; newState[13] = false;
        newState[14] = false; newState[15] = false;

        for (let i = 0; i < buttons.length; i++) newState[i] = buttons[i].pressed;

        const dpad_axes = Input.checkDPadAxes(gamepad.id, gamepad.axes);
        if (dpad_axes) {
            newState[12] = dpad_axes[0]; newState[13] = dpad_axes[1];
            newState[14] = dpad_axes[2]; newState[15] = dpad_axes[3];
        }

        if (axes[1] < -threshold) { // V-Axis
            newState[12] = true; // up
        } else if (axes[1] > threshold) {
            newState[13] = true; // down
        }

        if (axes[0] < -threshold) { // H-Axis
            newState[14] = true; // left
        } else if (axes[0] > threshold) {
            newState[15] = true; // right
        }

        this.remapButtons(gamepad.id, newState);

        for (let j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                const buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                }
            }
        }

        this._gamepadStates[gamepad.index] = newState;

        // These are for extended input
        this.checkRightAnalog(gamepad, axes); // Right analog to look around
        this.checkMapItems(buttons, lastState, 1); // L2 and R2 for map item toggle
        this.checkActorToggle(buttons, lastState, gamepad.index); // L1 and R1 for actor toggle
        this.checkCommonEvents(buttons, lastState, 1); // Bound common events (used in OcRam_Input_EX)

    };

    // New method to control follower and where dir-pad is enabled
    Input._updateGamepadState2_OC = function (gamepad, player_idx) {

        const p_follower = $allPlayers[player_idx - 1];

        if (p_follower == null) return;

        const lastState = this._gamepadStates[gamepad.index] || [];
        const newState = [];
        const buttons = this.remapButtons(gamepad.id, gamepad.buttons);
        const axes = this.remapAxes(gamepad.id, gamepad.axes);
        const threshold = 0.5;

        if (buttons[Input.gamepadMapperInv["start"]].pressed) {
            if (!$gameTemp) return;
            if (buttons[Input.gamepadMapperInv["ok"]].pressed) {
                dropDevice(gamepad.index); _preventGPStart[gamepad.index] = true;
            } else if (!_preventGPStart[gamepad.index]) assignDevice(gamepad.index); return;
        } if (_preventGPStart[gamepad.index]) _preventGPStart[gamepad.index] = false;

        newState[12] = false; newState[13] = false;
        newState[14] = false; newState[15] = false;

        for (let i = 0; i < buttons.length; i++) newState[i] = buttons[i].pressed;

        const dpad_axes = Input.checkDPadAxes(gamepad.id, gamepad.axes);
        if (dpad_axes) {
            newState[12] = dpad_axes[0]; newState[13] = dpad_axes[1];
            newState[14] = dpad_axes[2]; newState[15] = dpad_axes[3];
        }

        if (axes[1] < -threshold) { // V-Axis
            newState[12] = true; // up
        } else if (axes[1] > threshold) {
            newState[13] = true; // down
        }

        if (axes[0] < -threshold) { // H-Axis
            newState[14] = true; // left
        } else if (axes[0] > threshold) {
            newState[15] = true; // right
        }

        this._currentState2[gamepad.index] = newState;
        
        if ($tempGamePlayer_OC == null) {
            if (!(buttons[0].pressed)) {
                p_follower._preventNextOk = false;
                p_follower._okIsPressed = false;
            } if (!(p_follower._preventNextOk)) p_follower._okIsPressed = buttons[0].pressed;
            p_follower._cancelIsPressed = buttons[1].pressed;
            p_follower._shiftIsPressed = buttons[2].pressed;
            p_follower._menuIsPressed = buttons[3].pressed;
        }

        updateDirsGamepad(p_follower, newState);

        this._gamepadStates[gamepad.index] = newState;

        // These are for extended input
        this.checkRightAnalog(gamepad, axes); // Right analog to look around
        this.checkMapItems(buttons, lastState, 1); // L2 and R2 for map item toggle
        this.checkActorToggle(buttons, lastState, gamepad.index); // L1 and R1 for actor toggle
        this.checkCommonEvents(buttons, lastState, player_idx); // Bound common events (used in OcRam_Input_EX)

    };

    // For choice name box...
    Window_ChoiceList.prototype.setNameBoxWindow = function (nameBoxWindow) {
        this._nameBoxWindow = nameBoxWindow;
    };

    Window_ChoiceList.prototype.synchronizeNameBox = function () {
        this._nameBoxWindow.openness = this.openness;
    };

    Window_ChoiceList.prototype.updateSpeakerName = function () {

        if (_playerCount < 2) {
            this._nameBoxWindow.setName(""); return;
        }

        const player = getActualPlayer();
        const c = getPlayerColor(player);
        const text = (_speakerFormat + '').replace('$1', player);
        this._nameBoxWindow.setName("\\C[" + c + "]" + text + "\\C[0]");

    };

    Scene_Message.prototype.createNameBoxWindowForChoices = function () {
        this._nameBoxWindowForChoices = new Window_NameBox();
        this._nameBoxWindowForChoices.updateBackground = function () {
            this.setBackgroundType($gameMessage._choiceBackground);
        }; this.addWindow(this._nameBoxWindowForChoices);
    };

    if (_deadFollowersType == 2) { // Used to teleport revived character to player
        Game_Actor.prototype.setHp = function (value) {
            const prev_hp = this._hp;
            Game_BattlerBase.prototype.setHp.call(this, value);
            if (!followersFollow()) return;
            if (prev_hp == 0 && this._hp > 0) { // Revived!
                const character = this.getCharacter();
                const leader = character._leaderCharacter || $gamePlayer;
                _this.debug("TELEPORT ", character, "to", leader);
                character.locate(leader._x, leader._y);
            }
        };
    }

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Hide/Show followers
    this.extend(Game_Followers, "hide", function () {
        _followersAreHidden = true;
        _this["Game_Followers_hide"].apply(this, arguments);
    }); this.extend(Game_Followers, "show", function () {
        _followersAreHidden = false;
        _this["Game_Followers_show"].apply(this, arguments);
    });

    this.extend(Game_Interpreter, "setup", function () {
        _this["Game_Interpreter_setup"].apply(this, arguments);
        const ev = this.event(); if (!ev) return;
        if (ev._trigger < 3 && ev.page().list && ev.page().list.length > 1) {
            $gameTemp.clearDestination2(); _this.autoApply();
        }
    });

    // Create text layer for info messages
    this.extend(Scene_Base, "createWindowLayer", function () {
        _this["Scene_Base_createWindowLayer"].apply(this, arguments);
        _sceneTextLayer = new Sprite_Text_OC(); _sceneTextLayer.z = 999;
        this._windowLayer.addChild(_sceneTextLayer); refreshPrecedingCharacters();
    });

    // Create destination sprite for followers also
    this.extend(Spriteset_Map, "createDestination", function () {
        _this["Spriteset_Map_createDestination"].apply(this, arguments);
        this._destinationSprite2 = new Sprite_Destination2();
        this._destinationSprite2.z = 9999 + 2;
        this._tilemap.addChild(this._destinationSprite2);
    });

    this.unlockEvent = (ev) => {
        this.debug("unlockEvent", _playerInTurn, $tempGamePlayer_OC, $allPlayers); if (ev) ev._applyToChar = null;
        if (ev._trigger == 0 && OcRam.listHasStopCodes(ev.list()) && followersFollow()) Input.OC_resetControllers(true);
        $tempGamePlayer_OC = null; _this.setPlayerInTurn(1, false); _canMove = true; return;
    };

    const _OcRam_CE_End = OcRam.onCE_End;
    OcRam.onCE_End = function (CE) { // First time extending my own core this way! LOL
        _OcRam_CE_End.apply(this, arguments);
        _this.unlockEvent(CE);
    };

    // Reset _playerInTurn on scene_map (gives control back to P1)
    this.extend(Game_Event, "unlock", function () {
        _this.unlockEvent(this); _this["Game_Event_unlock"].apply(this, arguments);
    });

    // Reset some flags on player transfer
    this.extend(Game_Player, "performTransfer", function () {
        if (this.isTransferring()) {
            _canMove = false;
            _this["Game_Player_performTransfer"].apply(this, arguments);
            setTimeout(function () { // Give time for gamepad iterations
                _canMove = true;
            }, 200);
        }
    });

    if (Imported.OcRam_Movement && OcRam.Movement.pixelMoveEnabled()) {

        this.extend(Game_Follower, "moveStraight", function (d) {
            _this["Game_Follower_moveStraight"].apply(this, arguments);
            if (this._deviceIndex_OC != null) {
                if (this._stepsToTrigger > 0) this._stepsToTrigger--;
                if (this.isMoving()) $gamePlayer._followers.updateMove(this);
            }
        });

        this.extend(Game_Follower, "moveDiagonally", function (h, v) {
            _this["Game_Follower_moveDiagonally"].apply(this, arguments);
            if (this._deviceIndex_OC != null) {
                if (this._stepsToTrigger > 0) this._stepsToTrigger--;
                if (this.isMoving()) $gamePlayer._followers.updateMove(this);
            }
        });

    } else {

        this.extend(Game_Follower, "moveStraight", function (d) {
            if (this._deviceIndex_OC != null) {
                if (this.canPass(this._x, this._y, d)) $gamePlayer._followers.updateMove(this);
            } _this["Game_Follower_moveStraight"].apply(this, arguments);
        });

        this.extend(Game_Follower, "moveDiagonally", function (h, v) {
            if (this._deviceIndex_OC != null) {
                if (this.canPassDiagonally(this._x, this._y, h, v)) $gamePlayer._followers.updateMove(this);
            } _this["Game_Follower_moveDiagonally"].apply(this, arguments);
        });

    }

    // Check battle system and init variables
    this.extend(Scene_Map, "isReady", function () {
        const tmp_rdy = _this["Scene_Map_isReady"].apply(this, arguments);
        _partyInBattle = false; getAssignedFollowers();
        if (tmp_rdy && $gameMap != undefined && $gameMap != null) {
            setTimeout(function () { // Wait for gamepad iterations
                _canMove = true;
                _playerInTurn = 0;
                setPlayerInTurnVar(_currentPlayer); 
            }, 120);
            $allPlayers[0] = $gamePlayer;
            _screenWidth = Math.ceil(Graphics.boxWidth / $gameMap.tileWidth());
            _screenHeight = Math.ceil(Graphics.boxHeight / $gameMap.tileHeight());
            $gameTemp.clearDestination2();
            _this.debug("Scene_Map.isReady(true)");
        } return tmp_rdy;
    });

    // Check battle end and if battle ended - reset player to P1
    this.extend(BattleManager, "checkBattleEnd", function () {
        const ret = _this["BattleManager_checkBattleEnd"].apply(this, arguments);
        if (ret) {
            Input.OC_resetControllers(true);
            _this.setPlayerInTurn(1);
        } return ret;
    });

    // Check player turns... depending on battle system (this is for DTB/STB)
    this.extend(BattleManager, "startActorInput", function () {

        if (!this._currentActor) { //if (!this.isTpb())

            _this["BattleManager_startActorInput"].apply(this, arguments);

        } else {

            Input.OC_resetControllers(true);

            const members = $gameParty.battleMembers();
            let actor = this._currentActor;
            const currentIndex = members.indexOf(actor);
            const p = Number(_memberArray[_playerCount][currentIndex]) || 1;
            if (p > 4) p = 4;

            _this.debug("P" + p + " turn!", "actor", actor, "currentIndex", currentIndex);

            _this.setPlayerInTurn(p);

            if (_playerCount > 1) {
                if (_showPlayerTurns) showTextOnScreen("Player " + p + " turn!", true);
            }

            _this["BattleManager_startActorInput"].apply(this, arguments);

        }

    });

    Input.checkActorToggleKB = function (state2, input_from) {
        if (!$gameMap._mapId) return;
        if (state2) {
            if (this._currentState2['pagedown']) $gameMap.focusToNextActor(input_from);
            if (this._currentState2['pageup']) $gameMap.focusToPreviousActor(input_from);
        } else {
            if (this._currentState['pagedown']) $gameMap.focusToNextActor(input_from);
            if (this._currentState['pageup']) $gameMap.focusToPreviousActor(input_from);
        }
    };

    this.extend(Input, "_onKeyDown", function (event) {

        const buttonName = this.keyMapper2[event.keyCode] || this.keyMapper[event.keyCode];
        const layout1 = !this.keyMapper2[event.keyCode]; const dit = _playerDevices[_playerInTurn];
        const kb2f = !!_playerDevices.find(d => d == -2);

        if (layout1) {
            if (dit == -1) {
                _this["Input__onKeyDown"].apply(this, arguments);
                this.checkCommonEventsKB(false, 1); return;
            } else {
                return;
            }
        }

        if (this._shouldPreventDefault(event.keyCode)) event.preventDefault();
        if (event.keyCode === 144 || event.keyCode === 0) this.clear(); // Numlock || QtWebEngine on OS X

        if (!layout1 && dit == -2 && !OcRam.Events.p2pp()) { // Act as main character for this moment...
            this._currentState[buttonName] = true; // Always listen join / leave (start + ok)
            if (this._currentState["start"]) {
                if (this._currentState["ok"]) { dropDevice(-2); }
                else { assignDevice(-2); } return;
            } this.checkActorToggleKB(false, -2);
            this.checkMapItemsKB(false, 1);
            this.checkCommonEventsKB(false, 1);
            return;
        } else if (kb2f && !followersFollow()) { return; }

        this._currentState2[buttonName] = true;

        // Always listen join / leave (start + ok)
        if (this._currentState2["start"]) {
            if (this._currentState2["ok"]) { dropDevice(-2); }
            else { assignDevice(-2); } return;
        }

        // For players 2-4
        const dp = getDevicePlayer(-2);
        const p_follower = $allPlayers[dp - 1];
        if (OcRam.Events.p2pp()) p_follower._preventNextOk = false;
        if (p_follower) {
            this.checkActorToggleKB(true, -2);
            this.checkMapItemsKB(true, dp);
            this.checkCommonEventsKB(true, dp);
            if ($tempGamePlayer_OC == null) {
                if (!(this._currentState2["ok"])) {
                    p_follower._preventNextOk = false;
                    p_follower._okIsPressed = false;
                } if (!(p_follower._preventNextOk)) p_follower._okIsPressed = this._currentState2["ok"];
                p_follower._cancelIsPressed = this._currentState2["cancel"];
                p_follower._shiftIsPressed = this._currentState2["shift"];
                p_follower._menuIsPressed = this._currentState2["escape"];
            } updateDirs(p_follower, this._currentState2);
        } else { // Use it as extended KB layout...
            this._currentState = this._currentState2;
            this.checkActorToggleKB(false, -1);
            this.checkMapItemsKB(false, 1);
            this.checkCommonEventsKB(false, 1);
        }

    });

    this.extend(Input, "_onKeyUp", function (event) {

        const buttonName = this.keyMapper2[event.keyCode] || this.keyMapper[event.keyCode];
        const layout1 = !this.keyMapper2[event.keyCode]; const dit = _playerDevices[_playerInTurn];
        const kb2f = !!_playerDevices.find(d => d == -2);

        if (layout1 && dit == -1) {
            if (dit == -1) {
                _this["Input__onKeyUp"].apply(this, arguments); return;
            } else {
                return;
            }
        }

        if (!layout1 && dit == -2 && !OcRam.Events.p2pp()) { // Act as main character for this moment...
            this._currentState[buttonName] = false; return;
        } else if (kb2f && !followersFollow()) { return; }
        this._currentState2[buttonName] = false;

        const p_follower = $allPlayers[getDevicePlayer(-2) - 1];
        if (p_follower) {
            if ($tempGamePlayer_OC == null) {
                if (!(this._currentState2["ok"])) {
                    p_follower._preventNextOk = false;
                    p_follower._okIsPressed = false;
                } if (!(p_follower._preventNextOk)) p_follower._okIsPressed = this._currentState2["ok"];
                p_follower._cancelIsPressed = this._currentState2["cancel"];
                p_follower._shiftIsPressed = this._currentState2["shift"];
                p_follower._menuIsPressed = this._currentState2["escape"];
            } updateDirs(p_follower, this._currentState2);
        } else { // Use it as extended KB layout...
            this._currentState = this._currentState2;
        }

    });

    this.extend(TouchInput, "_onMouseDown", function (event) {
        if (_playerDevices[_playerInTurn] == -1) {
            _this["TouchInput__onMouseDown"].apply(this, arguments);
        } else { // Handle followers
            if (!$gameParty.inBattle()) {
                if (!followersFollow() && _playerDevices[0] != -1) return;
                const player_obj = $allPlayers[getDevicePlayer(-1) - 1];
                if (player_obj != null) {
                    if (player_obj.isVisible()) {
                        const x = Graphics.pageToCanvasX(event.pageX);
                        const y = Graphics.pageToCanvasY(event.pageY);
                        if (Graphics.isInsideCanvas(x, y)) {
                            this.x2 = x; this.y2 = y;
                            if (event.button === 0) {
                                $gameTemp.setDestination2($gameMap.canvasToMapX(TouchInput.x2), $gameMap.canvasToMapY(TouchInput.y2));
                                player_obj.triggerTouchAction(); this._mousePressed2 = true;
                                setTimeout(() => {
                                    this._mousePressed = false;
                                }, 100);
                            } else if (event.button === 1) {
                                if (player_obj._deviceIndex_OC = -1) {
                                    this._mouseMidPressed = true;
                                    if ($gameMap) {
                                        if (player_obj._liftedEvent) {
                                            const dx = ((TouchInput.x / OcRam.twh[0]) | 0) + $gameMap.displayX();
                                            const dy = ((TouchInput.y / OcRam.twh[1]) | 0) + $gameMap.displayY();
                                            let d = player_obj.findDirectionTo(dx, dy);
                                            if (d % 2) {
                                                d = OcRam.getHorzVert(d)[0];
                                            } player_obj.setDirection(d);
                                            return;
                                        } else {
                                            $gameTemp.setDestination2($gameMap.canvasToMapX(TouchInput.x2), $gameMap.canvasToMapY(TouchInput.y2));
                                            player_obj.triggerTouchAction(); TouchInput._mouseMidPressed = true; OcRam._mouseMidPressed = true;
                                        }
                                    } this._mousePressed2 = true;
                                    setTimeout(() => {
                                        this._mousePressed = false;
                                    }, 100);
                                }
                            } else if (event.button === 2) {
                                this._mouseCancel2 = true;
                            }
                        }
                    }
                }
            }
        }
    });

    this.extend(TouchInput, "_onMouseUp", function (event) {
        this._mousePressed2 = false; // P2-4 isn't pressing this button anymore
        this._mouseCancel2 = false; // P2-4 isn't pressing this button anymore
        _this["TouchInput__onMouseUp"].apply(this, arguments);
    });

    this.extend(TouchInput, "_onMouseMove", function (event) {
        if (_playerDevices[_playerInTurn] == -1) {
            _this["TouchInput__onMouseMove"].apply(this, arguments);
        } else { // Handle followers
            if (!$gameParty.inBattle()) {
                if (this.isPressed2()) {
                    const x = Graphics.pageToCanvasX(event.pageX);
                    const y = Graphics.pageToCanvasY(event.pageY);
                    if (Graphics.isInsideCanvas(x, y)) {
                        this.x2 = x; this.y2 = y;
                        this._onTrigger(this.x2, this.y2);
                    }
                }
            }
        }
    });

    // Check that all players fit in screen
    this.extend(Game_Player, "updateScroll", function (lastScrolledX, lastScrolledY) {

        if (!_mapEdgeBlock || !followersFollow() || $gamePlayer.isInVehicle()) {
            _this["Game_Player_updateScroll"].apply(this, arguments); return;
        }

        if (!$gameMap.isLoopHorizontal()) {
            if (lastScrolledX < this.scrolledX()) {
                if ($allPlayers[1] != null && ($gameMap._displayX > $allPlayers[1]._x)) return;
                if ($allPlayers[2] != null && ($gameMap._displayX > $allPlayers[2]._x)) return;
                if ($allPlayers[3] != null && ($gameMap._displayX > $allPlayers[3]._x)) return;
            } else if (lastScrolledX > this.scrolledX()) {
                const mw = $gameMap._displayX + _screenWidth - 1;
                if ($allPlayers[1] != null && (mw < $allPlayers[1]._x)) return;
                if ($allPlayers[2] != null && (mw < $allPlayers[2]._x)) return;
                if ($allPlayers[3] != null && (mw < $allPlayers[3]._x)) return;
            }
        }

        if (!$gameMap.isLoopVertical()) {
            if (lastScrolledY < this.scrolledY()) {
                if ($allPlayers[1] != null && ($gameMap._displayY > $allPlayers[1]._y)) return;
                if ($allPlayers[2] != null && ($gameMap._displayY > $allPlayers[2]._y)) return;
                if ($allPlayers[3] != null && ($gameMap._displayY > $allPlayers[3]._y)) return;
            } else if (lastScrolledY > this.scrolledY()) {
                const mh = $gameMap._displayY + _screenHeight - 1;
                if ($allPlayers[1] != null && (mh < $allPlayers[1]._y)) return;
                if ($allPlayers[2] != null && (mh < $allPlayers[2]._y)) return;
                if ($allPlayers[3] != null && (mh < $allPlayers[3]._y)) return;
            }
        }

        _this["Game_Player_updateScroll"].apply(this, arguments);

    });

    // Map border collision test
    this.extend(Game_CharacterBase, "canPass", function (x, y, d) {

        if (!_mapEdgeBlock || !followersFollow()) return _this["Game_CharacterBase_canPass"].apply(this, arguments);

        if (this.isPlayer()) {
            if (d != 8 && d != 2 && !$gameMap.isLoopHorizontal()) {
                const x2 = $gameMap.roundXWithDirection(x, d);
                if ($gameMap._displayX > x2 || ($gameMap._displayX + _screenWidth - 1) < x2) return false;
            } if (d != 4 && d != 6 && !$gameMap.isLoopVertical()) {
                const y2 = $gameMap.roundYWithDirection(y, d);
                if ($gameMap._displayY > y2 || ($gameMap._displayY + _screenHeight - 1) < y2) return false;
            }
        }

        return _this["Game_CharacterBase_canPass"].apply(this, arguments);

    });

    // Player collision test
    this.extend(Game_CharacterBase, "isCollidedWithCharacters", function (x, y) {
        if (_playersCollide && this.isPlayer()) {
            return _this["Game_CharacterBase_isCollidedWithCharacters"].apply(this, arguments)
                || $gamePlayer._x == x && $gamePlayer._y == y ||
                $gamePlayer._followers.visibleFollowers().some(function (f) {
                    return f._x == x && f._y == y && (f._playerIndex_OC || !followersFollow());
                });
        } else {
            return _this["Game_CharacterBase_isCollidedWithCharacters"].apply(this, arguments);
        }
    });

    // Warp to P1 when adding new member
    this.extend(Game_Party, "addActor", function (actorId) {
        _this["Game_Party_addActor"].apply(this, arguments);
        const new_index = $gamePlayer._followers.visibleFollowers().length - 1;
        if (new_index < 4 && new_index > -1) {
            _this.debug("addActor new_member:", new_index);
            $gamePlayer._followers._data[new_index]._x = $gamePlayer._x;
            $gamePlayer._followers._data[new_index]._realX = $gamePlayer._realX;
            $gamePlayer._followers._data[new_index]._y = $gamePlayer._y;
            $gamePlayer._followers._data[new_index]._realY = $gamePlayer._realY;
        } const bml = $gamePlayer._followers.visibleFollowers().length + 1;
        if (_maxNumberOfPlayers < _maxNumberOfPlayersOrg) {
            changeMaxPlayer(bml);
        } else {
            refreshPrecedingCharacters();
        }
    });

    this.extend(Game_Party, "removeActor", function (actorId) {
        if (this._actors.includes(actorId)) {
            const bml = $gamePlayer._followers.visibleFollowers().length;
            if (bml > 0) {
                if (_maxNumberOfPlayers > bml) {
                    changeMaxPlayer(bml);
                } else {
                    refreshPrecedingCharacters();
                } _noPlayers = false;
            } else {
                _noPlayers = true;
            }
        } _this["Game_Party_removeActor"].apply(this, arguments);
    });

    this.extend(Game_Follower, "isVisible", function () {
        if (this._playerIndex_OC) return true;
        return _this["Game_Follower_isVisible"].apply(this, arguments);
    });

    this.extend(Game_Follower, "update", function () {

        if (!this.isVisible()) {
            this.setOpacity(0); return;
        }

        if (this._playerIndex_OC > 0) {
            const wasMoving = this.isMoving();
            this.setThrough($gamePlayer.isThrough() || $gamePlayer.areFollowersGathering());
            Game_Character.prototype.update.call(this);
            //this.setMoveSpeed($gamePlayer.realMoveSpeed());
            this.setBlendMode($gamePlayer.blendMode());
            this.setWalkAnime(true);
            this.setStepAnime($gamePlayer.hasStepAnime());
            this.setDirectionFix($gamePlayer.isDirectionFixed());
            this.setTransparent($gamePlayer.isTransparent());
            if (!this.isMoving()) {
                this.updateNonmoving(wasMoving);
            } this._dashing = (this._shiftIsPressed && !this._liftedEvent);
            this.moveByInput(); this.updateLifted();
            if (!this._blinkHandle) {
                this.setOpacity(_playerOpacity - (this.actor().isDead() ? 128 : 0));
            } else {
                this.setOpacity(this._opacityBeforeBlink - (this.actor().isDead() ? 128 : 0));
            }
        } else { // "NPC" followers
            if (_deadFollowersType == 1) { // GHOST FOLLOWERS!
                _this["Game_Follower_update"].apply(this, arguments);
                if (!this._blinkHandle) {
                    this.setOpacity(_playerOpacity - (this.actor().isDead() ? 128 : 0));
                } else {
                    this.setOpacity(this._opacityBeforeBlink - (this.actor().isDead() ? 128 : 0));
                }
            } else {
                _this["Game_Follower_update"].apply(this, arguments);
                if (!this._blinkHandle) {
                    this.setOpacity(_playerOpacity);
                } else {
                    this.setOpacity(this._opacityBeforeBlink);
                }
            } if (this._leaderCharacter) this.setMoveSpeed(this._leaderCharacter.realMoveSpeed());
        }
    });

    this.extend(Game_Followers, "gather", function () {

        if (!followersFollow()) return;

        let allNearZero = true;
        let use_fade = _playerCount > 1 && $gamePlayer._followers.visibleFollowers().length > 0;

        for (let i = 0; i < $gamePlayer._followers._data.length; i++) {
            if ($gamePlayer._followers._data[i].isVisible()) {
                if (!numberNearZero($gamePlayer._x - $gamePlayer._followers._data[i]._x)) allNearZero = false;
                if (!numberNearZero($gamePlayer._y - $gamePlayer._followers._data[i]._y)) allNearZero = false;
            }
        }

        if (use_fade) use_fade = (use_fade && !allNearZero) || $tempGamePlayer_OC || $gamePlayer._vehicleGettingOn;

        if (use_fade) {

            $gamePlayer._followers._gathering = true; _isFading = true;

            $gameScreen.startFadeOut(24); // If this is changed remember timeouts also

            let this_tmp_obj = null;

            if ($tempGamePlayer_OC != null) this_tmp_obj = $tempGamePlayer_OC;

            setTimeout(function () { // Wait for fade out

                if (this_tmp_obj != null) {
                    $gamePlayer._x = this_tmp_obj._x;
                    $gamePlayer._y = this_tmp_obj._y;
                    $gamePlayer._realX = this_tmp_obj._realX;
                    $gamePlayer._realY = this_tmp_obj._realY;
                }

                for (let i = 0; i < $gamePlayer._followers._data.length; i++) {
                    $gamePlayer._followers._data[i]._x = $gamePlayer._x;
                    $gamePlayer._followers._data[i]._y = $gamePlayer._y;
                    $gamePlayer._followers._data[i]._realX = $gamePlayer._realX;
                    $gamePlayer._followers._data[i]._realY = $gamePlayer._realY;
                }

                $gameScreen.startFadeIn(24);
                _this["Game_Followers_gather"].apply(this, arguments);

            }, 800);

            setTimeout(function () { // Wait for fade in
                $gamePlayer._followers._gathering = false;
                _canMove = true;
                _isFading = false;
            }, 1000);

        } else {
            _this["Game_Followers_gather"].apply(this, arguments);
        }

    });

    // For map turn effects for each player and their followers...
    this.extend(Game_Actor, "initialize", function () {
        _this["Game_Actor_initialize"].apply(this, arguments);
        this._turnSteps = 0;
    });

    // Enable choices / shop only for player in turn
    this.extend(Window_Selectable, "update", function () {
        if (_playerDevices[_playerInTurn] == -1 || !OcRam.isMZ()) {
            _this["Window_Selectable_update"].apply(this, arguments);
        } else {
            this.processCursorMove(); this.processHandling();
            Window_Scrollable.prototype.update.call(this);
        }
    });

    if (!OcRam.isMZ()) { // For MV...
        this.extend(Window_Selectable, "processTouch", function () {
            if (_playerDevices[_playerInTurn] == -1) {
                _this["Window_Selectable_processTouch"].apply(this, arguments);
            } else this._touching = false;
        });
    }

    // Is there player comment, if found >> is it for player 1?
    this.extend(Game_Player, "startMapEvent", function (x, y, triggers, normal) {
        _preventClear = true; // No stop code check for P1 is needed (done else where)
        setPlayerInTurnVar(_currentPlayer); $tempGamePlayer_OC = null;
        _this["Game_Player_startMapEvent"].apply(this, arguments);
    });

    if (!Imported.OcRam_Events) { // Do this ONLY if Events is not imported!

        if (OcRam.Events.version < 1.03) alert("OcRam_Events v1.03 or greater is required!");

        this.extend(Game_Interpreter, "command101", function (params) {

            // 0 = "Actor1"
            // 1 = face index
            // 2 = window / dim
            // 3 = dim / bottom
            // 4 = name

            const old_values = [params[0], params[1], params[4]];

            if ((params[4] + '').left(2) == "\\P" && (params[0] + '') == '') {

                let id = (params[4] + '').replaceAll('\\P[', '').replaceAll(']', '');

                const mi = OcRam.playerCharacter()._memberIndex;
                if (mi) { // Is P2-4 ?
                    if (id == 1) {
                        id = OcRam.playerCharacter()._memberIndex + 1;
                    } else if (id == (OcRam.playerCharacter()._memberIndex + 1)) {
                        id = 1; // Swap 1 and this member
                    }
                }

                const member = $gameParty.battleMembers()[id - 1];

                if (member) {
                    params[0] = member._faceName;
                    params[1] = member._faceIndex;
                    params[4] = member._name;
                }

            }

            if (_playerSpeaker && _playerCount > 1) {
                switch (this.nextEventCode()) {
                    case 102: // Show Choices
                    case 103: // Input Number
                    case 104: // Select Item
                        break;
                    default:
                        const player = getActualPlayer();
                        const c = getPlayerColor(player);
                        const text = (_speakerFormat + '').replace('$1', player);
                        params[4] = params[4] + " \\C[" + c + "]" + text + "\\C[0]";
                }
            }

            // Reset in case that party member changes...
            requestAnimationFrame(() => {
                params[0] = old_values[0]; params[1] = old_values[1]; params[4] = old_values[2];
            });

            return _this["Game_Interpreter_command101"].apply(this, arguments);

        });
    }
    
    // For choice name box
    this.extend(Window_ChoiceList, "start", function () {
        _this["Window_ChoiceList_start"].apply(this, arguments);
        this.updateSpeakerName(); this._nameBoxWindow.start();
    });

    this.extend(Window_ChoiceList, "update", function () {
        _this["Window_ChoiceList_update"].apply(this, arguments); this.synchronizeNameBox();
    });

    this.extend(Scene_Message, "createAllWindows", function () {
        this.createNameBoxWindowForChoices();
        _this["Scene_Message_createAllWindows"].apply(this, arguments);
    });

    this.extend(Scene_Message, "associateWindows", function () {
        _this["Scene_Message_associateWindows"].apply(this, arguments);
        this._choiceListWindow.setNameBoxWindow(this._nameBoxWindowForChoices);
        this._nameBoxWindowForChoices.setMessageWindow(this._choiceListWindow);
    });

    if (Imported.OcRam_Movement) {
        this.extend(Game_Follower, "jump", function () {
            if (this._playerIndex_OC && (this._x % 1 != 0 || this._y % 1 != 0)) this.centerToTile();
            _this["Game_Follower_jump"].apply(this, arguments);
            if (this._playerIndex_OC) $gamePlayer._followers.jumpAll(this);
        });
    }

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    Game_Actor.prototype.turnEndOnMap = function () {
        if (_noPlayers) return;
        this.onTurnEnd();
        if (this.result().hpDamage > 0) {
            this.performMapDamage();
        } requestAnimationFrame(() => {
            if ($gameParty.allBattleMembersAreDead()) SceneManager.goto(Scene_Gameover);
        });
    };

    Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
        if (!$gameMap.isEventRunning()) {
            const pf = $allPlayers.find(p => p && p.pos_OC(x, y)) || $gamePlayer;
            if (this._trigger === 2 && pf.pos_OC(x, y)) {
                pf._stepsToTrigger = 0; // This is not triggered by player so steps doesn't matter...
                $tempGamePlayer_OC = pf; // Object where to apply $gamePlayer stuff...
                _playerInTurn = pf._playerIndex_OC || 0; // Just ensuring null/undefined == 0
                setPlayerInTurnVar(pf._playerIndex_OC + 1); // For player specific stuff...
                if (!this.isJumping() && this.isNormalPriority()) {
                    this.start();
                }
            }
        }
    };

    Game_Followers.prototype.areMoving = function () { // Get only player 1 followers...
        const fcs = $gamePlayer._followingCharacters || this.visibleFollowers();
        return fcs.some(follower => follower.isMoving());
    };

    // From OcRam_Core
    Game_Map.prototype.currentActorId = function () {
        if (_playerCount > 1 && $tempGamePlayer_OC) {
            return $tempGamePlayer_OC.getActor().actorId();
        } else {
            return $gameParty.leader().actorId();
        }
    };

    // Check damage floor trigger only once per tile
    if (_pixelMoveEnabled) {
        Game_Party.prototype.onPlayerWalk = function (follower) { // Only "player" characters will trigger this.
            if (_noPlayers) return;
            const p = follower || $gamePlayer;
            if (followersFollow()) {
                for (const actor of p._followingActors) {
                    if (actor) actor.onPlayerWalk(p);
                }
            } if (p._myActor) p._myActor.onPlayerWalk(p);
        }; let _stateTicked = false;
        Game_Actor.prototype.onPlayerWalk = function (p) {
            if (_noPlayers) return;
            p = p || $gamePlayer;
            this._turnSteps++; this.clearResult();
            this.checkFloorEffect(p);
            if (p.isNormal()) {
                if (!_stateTicked && this._turnSteps % (5 * this.stepsForTurn()) == 0) {
                    _stateTicked = true; requestAnimationFrame(() => { _stateTicked = false; });
                    p.getActor().turnEndOnMap();
                    if (p._followingActors && followersFollow()) {
                        p._followingActors.forEach(a => {
                            a.turnEndOnMap();
                        });
                    } for (const state of this.states()) {
                        this.updateStateSteps(state);
                    } this.showAddedStates();
                    this.showRemovedStates();
                    this._turnSteps = 0;
                }
            }
        }; Game_Actor.prototype.checkFloorEffect = function (p) {
            p = p || $gamePlayer;
            if (p._stepsToTrigger < 1) {
                if (p.isOnDamageFloor()) {
                    if (followersFollow()) {
                        for (const actor of p._followingActors) {
                            actor.executeFloorDamage();
                        }
                    } if (p._myActor) p._myActor.executeFloorDamage();
                    p._stepsToTrigger = 4;
                }
            }
        };
    } else {
        Game_Party.prototype.onPlayerWalk = function (follower) {
            if (_noPlayers) return;
            const p = follower || $gamePlayer;
            p._myActor.onPlayerWalk(p);
        }; Game_Actor.prototype.onPlayerWalk = function (p) {
            if (_noPlayers) return;
            p = p || $gamePlayer;
            this._turnSteps++; this.clearResult();
            this.checkFloorEffect(p);
            if (p.isNormal()) {
                if (this._turnSteps % this.stepsForTurn() == 0) {
                    p.getActor().turnEndOnMap();
                    if (p._followingActors && followersFollow()) {
                        p._followingActors.forEach(a => {
                            a.turnEndOnMap();
                        });
                    } for (const state of this.states()) {
                        this.updateStateSteps(state);
                    } this.showAddedStates();
                    this.showRemovedStates();
                }
            }
        }; Game_Actor.prototype.checkFloorEffect = function (p) {
            p = p || $gamePlayer;
            if (p.isOnDamageFloor()) {
                if (followersFollow()) {
                    for (const actor of p._followingActors) {
                        actor.executeFloorDamage();
                    }
                } p._myActor.executeFloorDamage();
            }
        };
    }

    // Jump all only if followers are following!
    Game_Followers.prototype.jumpAll = function (character) {
        if (!followersFollow()) return;
        if (!character) character = $gamePlayer; // No character? Then it's P1...
        if (character.isJumping()) {
            for (const follower of character._followingCharacters) {
                if (!follower._playerIndex_OC) {
                    const sx = character.deltaXFrom(follower.x);
                    const sy = character.deltaYFrom(follower.y);
                    follower.jump(sx, sy);
                }
            }
        }
    };

    // Turn/Move Towards/Away NEAREST player
    Game_Character.prototype.turnTowardPlayer = function () {
        if ($tempGamePlayer_OC) {
            this.turnTowardCharacter($tempGamePlayer_OC);
        } else {
            this.turnTowardCharacter(this.getClosestPlayer() || $gamePlayer);
        }
    }; Game_Character.prototype.turnAwayFromPlayer = function () {
        this.turnAwayFromCharacter(this.getClosestPlayer() || $gamePlayer);
    }; Game_Character.prototype.moveTowardPlayer = function () {
        this.moveTowardCharacter(this.getClosestPlayer() || $gamePlayer);
    }; Game_Character.prototype.moveAwayFromPlayer = function () {
        this.moveAwayFromCharacter(this.getClosestPlayer() || $gamePlayer);
    };

    // Check input for P1, if not present check followers
    Scene_Map.prototype.processMapTouch = function () {
        if (TouchInput.isTriggered() || this._touchCount > 0) {
            if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
                if (this._touchCount === 0 || this._touchCount >= 15) {
                    this.onMapTouch();
                } this._touchCount++;
            } else {
                if (TouchInput.isPressed2()) {
                    $gameTemp.setDestination2($gameMap.canvasToMapX(TouchInput.x2), $gameMap.canvasToMapY(TouchInput.y2));
                } else {
                    this._touchCount = 0;
                }
            }
        }
    };

    Input._updateGamepadState = function (gamepad) {

        const gpi = gamepad.index;
        const player_idx = getDevicePlayer(gpi); // To whom this device belongs to?
        const p2pp = OcRam.Events.p2pp();

        if (_playerDevices[_playerInTurn] == gpi || (player_idx == -1 && _playerDevices[_playerInTurn] == -1)) {
            if (!_partyInBattle && p2pp) {
                if (p2pp._deviceIndex_OC == gpi) this._updateGamepadState2_OC(gamepad, p2pp._playerIndex_OC + 1);
            } else {
                this._updateGamepadState_OC(gamepad, player_idx); // "Player in turn" simulates "P1"
            }
        } else {
            if (!_partyInBattle) { // Update other gamepads only on Map_Scene (if this player not in turn)
                if (followersFollow()) {
                    this._updateGamepadState2_OC(gamepad, player_idx);
                } else {
                    if (_playerDevices[0] == gpi) this._updateGamepadState2_OC(gamepad, player_idx);
                }
            }
        }

    };

    if (Imported.OcRam_Movement) {
        let _followerGap = Number(OcRam.Movement.parameters['Follower gap'] || 1) - 1;
        this.resetSteps = (gap) => {
            if (gap) _followerGap = Number(gap).clamp(1, 4) - 1;
            if (OcRam.Movement.pixelMoveEnabled()) {
                const pc = OcRam.playerCharacter();
                pc._prevSteps[0] = [pc._x, pc._y];
                pc._prevSteps[1] = pc._prevSteps[0];
                pc._prevSteps[2] = pc._prevSteps[0];
                pc._prevSteps[3] = pc._prevSteps[0];
                if (!followersFollow()) return;
                pc._followingCharacters.forEach(f => {
                    if (f._prevSteps) {
                        if (f._x != pc._x || f._y != pc._y) f.jumpTo(pc);
                    }
                });
            }
        }; if (OcRam.Movement.pixelMoveEnabled()) {
            Game_Follower.prototype.chaseCharacter = function (character) {
                //const ot = this._through; this._through = true; // In case P2-4 has started the gather
                let sx = 0; let sy = 0;
                if (character._prevSteps) {
                    if (character._pixelMovementDisabled) {
                        sx = this.deltaXFrom(character._prevSteps[0][0]);
                        sy = this.deltaYFrom(character._prevSteps[0][1]);
                    } else {
                        sx = this.deltaXFrom(character._prevSteps[_followerGap][0]);
                        sy = this.deltaYFrom(character._prevSteps[_followerGap][1]);
                    }
                } else {
                    sx = this.deltaXFrom(character.x);
                    sy = this.deltaYFrom(character.y);
                } if ((sy > -0.25 && sy < 0.25) && (sx > -0.25 && sx < 0.25)) return;
                if (sx !== 0 && sy !== 0) {
                    this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
                } else if (sx !== 0) {
                    this.moveStraight(sx > 0 ? 4 : 6);
                } else if (sy !== 0) {
                    this.moveStraight(sy > 0 ? 8 : 2);
                } //this._through = ot; //this.setMoveSpeed($gamePlayer.realMoveSpeed());
                this._prevSteps[3] = this._prevSteps[2];
                this._prevSteps[2] = this._prevSteps[1];
                this._prevSteps[1] = this._prevSteps[0];
                this._prevSteps[0] = [this._x, this._y];
            };
        }
    } else {
        Game_Follower.prototype.chaseCharacter = function (character) {
            const ot = this._through; this._through = true; // In case P2-4 has started the gather
            const sx = this.deltaXFrom(character.x);
            const sy = this.deltaYFrom(character.y);
            if (sx !== 0 && sy !== 0) {
                this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
            } else if (sx !== 0) {
                this.moveStraight(sx > 0 ? 4 : 6);
            } else if (sy !== 0) {
                this.moveStraight(sy > 0 ? 8 : 2);
            } this._through = ot;
            //this.setMoveSpeed(this._leaderCharacter.realMoveSpeed());
        };
    }

    // Update follower move only on NOT signed members and special cases for gather (with and without fade)
    Game_Followers.prototype.updateMove = function (character) {

        if (!followersFollow()) return;

        if (this.areGathering()) {
            if (!_isFading) {
                if (!character) character = $gamePlayer; // No character? Then it's P1...
                for (const follower of this._data) {
                    const sx = $gamePlayer.deltaXFrom(follower.x);
                    const sy = $gamePlayer.deltaYFrom(follower.y);
                    follower.jump(sx, sy);
                }
            } // If all members are scattered... then fade out then in...
        } else {
            if (!character) character = $gamePlayer; // No character? Then it's P1...
            for (let i = character._followingCharacters.length - 1; i > -1; i--) {
                const precedingCharacter = (i > 0) ? character._followingCharacters[i - 1] : character;
                character._followingCharacters[i].chaseCharacter(precedingCharacter);
            }
        }

    };

    if (Imported.OcRam_Events) {
        const gamepadPlayerIndex = idx => {
            if (_playerDevices[3] != null && _playerDevices[3] == idx) return 3;
            if (_playerDevices[2] != null && _playerDevices[2] == idx) return 2;
            if (_playerDevices[1] != null && _playerDevices[1] == idx) return 1;
            return 0;
        }; OcRam.Events.okPressed = ev => {
            if (!ev._linkedPlayer || ev._linkedPlayer._deviceIndex_OC == -1) {
                let gp_ok = Input.isPressed("ok");
                if (navigator.getGamepads) {
                    const gamepads = navigator.getGamepads();
                    if (gamepads) {
                        for (const gamepad of gamepads) {
                            if (gamepad) {
                                if (gamepad && gamepad.connected && !gamepadPlayerIndex(gamepad.index)) {
                                    if (Input._gamepadStates[gamepad.index] && Input._gamepadStates[gamepad.index][0]) gp_ok = true;
                                }
                            }
                        }
                    }
                } return TouchInput._mousePressed || TouchInput._mouseMidPressed || gp_ok;
            } else {
                if (ev._linkedPlayer._deviceIndex_OC == -1) { // Swapped mouse + kb
                    return TouchInput._mousePressed2 || Input.isPressed2("ok");
                } else {
                    const pc = ev._linkedPlayer; let gp_ok = false;
                    if (pc._deviceIndex_OC > -1 && navigator.getGamepads) {
                        if (Input._gamepadStates[pc._deviceIndex_OC][0]) gp_ok = true;
                    } return ((pc._deviceIndex_OC < 0 && Input.isPressed2("ok")) || pc._okIsPressed) || gp_ok;
                }
            }
        }; OcRam.Events.midPressed = ev => {
            if (!ev._linkedPlayer) {
                return Input.isPressed("ok") || TouchInput._mouseMidPressed;
            } else {
                if (ev._linkedPlayer._deviceIndex_OC == -1) { // Swapped mouse + kb
                    return ev._linkedPlayer._okIsPressed || TouchInput._mouseMidPressed;
                } else {
                    return ev._linkedPlayer._okIsPressed;
                }
            }
        }; OcRam.Events.cancelPressed = ev => {
            if (!ev._linkedPlayer) {
                return Input.isTriggered("cancel") || TouchInput.isCancelled();
            } else {
                if (ev._linkedPlayer._deviceIndex_OC == -1) { // Swapped mouse + kb
                    return TouchInput._mouseCancel2;
                } else {
                    return ev._linkedPlayer._cancelIsPressed;
                }
            }
        };
    }

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () {
        _this.dropPlayer(4); _this.dropPlayer(3); _this.dropPlayer(2);
        _playerDevices = [-1, null, null, null]; OcRam.Local_Coop.resetCurrentPlayer();
        $gameTemp._reservePlayerIndexLeft = 0; _POKK = [false, false];
        _playerIndicator = OcRam.getBoolean(this.parameters['Player indicator']);
        _allowTogling = OcRam.getBoolean(this.parameters['Actor toggling']);
        _maxNumberOfPlayers = Number(this.parameters['Max number of players']);
        _playersCollide = OcRam.getBoolean(this.parameters['Players collide']);
        _mapEdgeBlock = OcRam.getBoolean(this.parameters['Map edge block']);
        _followersAreHidden = false;
        _preventJoin = false;
    };

    this.loadPluginData = gs => {
        $gameTemp._reservePlayerIndexLeft = 0;
        _playerIndicator = (gs._playerIndicator !== null && gs._playerIndicator !== undefined) ? gs._playerIndicator : OcRam.getBoolean(this.parameters['Player indicator']);
        _allowTogling = (gs._allowTogling !== null && gs._allowTogling !== undefined) ? gs._allowTogling : OcRam.getBoolean(this.parameters['Actor toggling']);
        _maxNumberOfPlayers = gs._maxNumberOfPlayers || Number(this.parameters['Max number of players']);
        _playersCollide = (gs._playersCollide !== null && gs._playersCollide !== undefined) ? gs._playersCollide : OcRam.getBoolean(this.parameters['Players collide']);
        _mapEdgeBlock = (gs._mapEdgeBlock !== null && gs._mapEdgeBlock !== undefined) ? gs._mapEdgeBlock : OcRam.getBoolean(this.parameters['Map edge block']);
        _followersAreHidden = gs._followersAreHidden || false;
        _preventJoin = gs._preventJoin || false;
        if (!Imported.OcRam_Followers) requestAnimationFrame(() => { this.teleOnLoad(); });
    };

    this.savePluginData = gs => {
        $gamePlayer._leaderCharacter = null;
        $gamePlayer._followingCharacters = [];
        $gamePlayer._followers._data.forEach(f => {
            f._leaderCharacter = null;
            f._followingCharacters = [];
        }); gs._playerIndicator = _playerIndicator;
        gs._allowTogling = _allowTogling;
        gs._maxNumberOfPlayers = _maxNumberOfPlayers;
        gs._playersCollide = _playersCollide;
        gs._mapEdgeBlock = _mapEdgeBlock;
        gs._followersAreHidden = _followersAreHidden;
        gs._preventJoin = _preventJoin;
        requestAnimationFrame(() => {
            refreshPrecedingCharacters();
        });
    };

    this.onMapStart = sm => {
        _noPlayers = ($gamePlayer._followers.visibleFollowers().length > 0) ? false : true;
        if (Imported.OcRam_Indicators && _playerCount > 1 && _playerIndicator) {
            let i = 0;
            if (followersFollow()) {
                $allPlayers.forEach(p => {
                    if (p && !p._label) {
                        p.addLabel("P" + (i + 1), null, ColorManager.textColor(_playerColors[i++]));
                    }
                });
            } else {
                $allPlayers[0].addLabel("P" + _pit, null, ColorManager.textColor(_playerColors[_pit - 1]));
            }
        } $gamePlayer._myActor = $gamePlayer.getActor();
    };

    this.onMapTerminate = sm => {
        if (Imported.OcRam_Indicators) {
            $allPlayers.forEach(p => {
                if (p && p._label) p.removeLabel();
            });
        }
    };
    
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = dm => { initPlayers(); };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "playerIndicators", function (args) {
        _this.debug("Plugin command: playerIndicators", args);
        const show = OcRam.getBoolean(args.show);
        if (show) {
            let i = 0;
            $allPlayers.forEach(p => {
                if (p && !p._label) {
                    p.addLabel("P" + (i + 1), null, ColorManager.textColor(_playerColors[i++]));
                }
            });
        } else {
            $allPlayers.forEach(p => { if (p && p._label) p.removeLabel(); });
        } _playerIndicator = show;
    });

    PluginManager.registerCommand("OcRam_" + this.name, "dropPlayer", function (args) {
        _this.debug("Plugin command: dropPlayer", args);
        _this.dropPlayer(Number(args.player));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "maxPlayers", function (args) {
        _this.debug("Plugin command: maxPlayers", args);
        changeMaxPlayer(Number(args.max));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "swapPlayers", function (args) {
        _this.debug("Plugin command: swapPlayers", args);
        swapPlayers(Number(args.p1) - 1, Number(args.p2) - 1);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "playersCollide", function (args) {
        _this.debug("Plugin command: playersCollide", args);
        _playersCollide = OcRam.getBoolean(args.collides);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "allowJoin", function (args) {
        _this.debug("Plugin command: allowJoin", args);
        _this.allowJoin(OcRam.getBoolean(args.allow));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "allowActorToggling", function (args) {
        _this.debug("Plugin command: allowActorToggling", args);
        _allowTogling = OcRam.getBoolean(args.allowToggle);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "forceToggle", function (args) {
        _this.debug("Plugin command: forceToggle", args); // forceToggle: -2 prev, -1 nxt, 0-n = battle member
        const action = Number(args.action);
        switch (action) {
            case -1: togglePlayer(true); break;
            case -2: togglePlayer(false); break;
            default: _this.forceToggle(action); break;
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "screenEdgeBlock", function (args) {
        _this.debug("Plugin command: screenEdgeBlock", args);
        _mapEdgeBlock = OcRam.getBoolean(args.block);
    });

}.bind(OcRam.Local_Coop)());

window.addEventListener("gamepaddisconnected", function (e) {
    //console.log(e.gamepad.index, e.gamepad.id);
    const gamepad_index = e.gamepad.index;
    if (gamepad_index < 0) return;
    OcRam.Local_Coop.dropDevice(gamepad_index);
});