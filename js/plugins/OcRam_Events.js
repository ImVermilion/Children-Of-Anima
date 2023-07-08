//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Events.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Events", "1.09");

/*:
 * @target MZ
 * @plugindesc v1.09 This plugin gives you possibility to copy/spawn events and automatizes 
 * some of your eventing!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Time_System
 * @orderAfter OcRam_Weather_System
 * @orderBefore OcRam_Audio
 * @orderBefore OcRam_Lights
 * @orderBefore OcRam_Followers
 * @orderBefore OcRam_Passages
 * @orderBefore OcRam_Local_Coop
 * @orderBefore OcRam_NPC_Scheduling
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command copyEvent
 * @text Copy Event
 * @desc Copy event from event bases over given event id in current map.
 *
 * @arg baseName
 * @type text
 * @default Fire1
 * @text Event base
 * @desc Event base to copy.
 *
 * @arg eventId
 * @type number
 * @default 0
 * @text Event id
 * @desc Overwrites this event data with given event base.
 *
 * @command spawnEvent
 * @text Spawn Event
 * @desc Spawn event from event bases to given position.
 *
 * @arg baseName
 * @type text
 * @default Fire1
 * @text Event base
 * @desc Event base to spawn.
 *
 * @arg location
 * @type text
 * @default [x,y]
 * @text Location
 * @desc Spawn event to this point.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Event base map id
 * @type number
 * @desc In which map event bases are located?
 * @default 1
 *
 * @param Autofill speaker
 * @type boolean
 * @desc Autofill speaker name and it's face based on current event 
 * (or based on actor via speaker name with \P[n] \N[n]).
 * @default true
 *
 * @param Dim messages
 * @parent Autofill speaker
 * @type boolean
 * @desc Autofill speaker data also in Dim messages?
 * @default false
 *
 * @param Transparent messages
 * @parent Autofill speaker
 * @type boolean
 * @desc Autofill speaker data also in transparent messages?
 * @default false
 *
 * @param Object characters
 * @parent Autofill speaker
 * @type boolean
 * @desc Autofill speaker data also with "object characters" 
 * (!prefixed)?
 * @default false
 *
 * @param Auto show balloons
 * @type boolean
 * @desc Will play balloon animation randomly based on character emotion with given parameters.
 * @default false
 *
 * @param Emotion balloons
 * @parent Auto show balloons
 * @type text[]
 * @desc [emotion]:[balloon_id] example angry:5
 * @default ['happy:3','angry:5','sweat:6','push:6','pull:6','lift:6']
 *
 * @param Min time
 * @parent Auto show balloons
 * @type number
 * @desc Minimum time in seconds until another auto-emo-balloon.
 * @default 5
 *
 * @param Max time
 * @parent Auto show balloons
 * @type number
 * @desc Maximum time in seconds until another auto-emo-balloon.
 * @default 15
 *
 * @param Allow throw region
 * @type number
 * @min -1
 * @max 255
 * @desc Allowed region id to allow throw PASS check - no 'landing'. Like cliffs, obstacles, etc... (-1 = not in use)
 * @default 6
 * 
 * @param Allow landing region
 * @type number
 * @min -1
 * @max 255
 * @desc Allowed region id to allow LANDING AND throw PASS check. Like water/lava etc.... (-1 = not in use)
 * @default 7
 *
 * @param Push emotion
 * @type text
 * @desc DEFAULT emotion for pushing objects! (Use to change some/all of these: charsheet, face and auto balloons!)
 * @default push
 *
 * @param Pull emotion
 * @type text
 * @desc DEFAULT emotion for pulling objects! (Use to change some/all of these: charsheet, face and auto balloons!)
 * @default pull
 *
 * @param Lift emotion
 * @type text
 * @desc DEFAULT emotion for lifting objects! (Use to change some/all of these: charsheet, face and auto balloons!)
 * @default lift
 * 
 * @param Use OcRam_Parallels
 * @type boolean
 * @desc Use OcRam_Parallels to optimize some parallel events!
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
 * Streamline your eventing by creating event bases! Only 1 place to make
 * changes globally! -OR- Need to spawn events (like loot, projectiles etc...)?
 * Then just use "spawn event" commands provided by this plugin!
 * 
 * When event base is copied over target event, this plugin provides 
 * ability to preserve target image. This is optimal for events with same 
 * logic but varying graphics.
 *
 * NOTE: To use preserve img feature ALL images in *event base* must be in
 * SAME charsheet! (Source event may have different charsheet than target 
 * event has, just check that "characterIndexes" follows same logic).
 * Leave target event graphics to "None" to ignore "Preserve image" feature.
 * 
 * All event bases are in memory - always ready to be (ab)used!
 *
 * Event base = Event name in the map dedicated to event bases! This map
 * can be assigned with (Event base map id) plugin parameter.
 * 
 * Event copy pre/post JS (executes when triggered) simply:
 *     Add 2 script commands:
 *         1st is executed before "base" command list
 *         2nd is executed after "base" command list
 *                    
 * This plugin has replaced OcRam_Parallels -plugin!
 * ----------------------------------------------------------------------------
 * Sometimes autorun event is not enough to do the job. Usually these events
 * are erased and will not be called again after menu nor battle scene.
 * And then parallel events are executed in EVERY frame! That is not very
 * efficient way - if task needs to be done only once...
 *
 * If some events needs to be called (refreshed) on scene start (after other
 * scenes like menu/battle) OR... when VARIABLE or SWITCH has been changed -
 * This plugin is Your answer.
 *
 * ----------------------------------------------------------------------------
 * OPTIONAL System #1: EMotions aka. Event Motions (and Emotions)
 * ----------------------------------------------------------------------------
 * Used to streamline your eventing:
 *
 *      1. Leave "Face" and "Speaker name" empty and this plugin will autofill
 *         them for you! (Possibility to disable autofill feature "for now" or
 *         temporarily only for next *Show text* command)
 *
 *      2. IF Speaker name is empty, will be filled with [Event Name]
 *
 *      3. IF Face is empty, it will be filled with emotional face.
 *         Example: Character is people1.png and current emotion is
 *         "laugh" then plugin will try to find ./faces/people1_laugh.png
 *         Also character sheet is updated to: people1_laugh.png (if found)
 *         (other examples: Limbing, Sneaking, Cheering etc...)
 *
 *      4. Also can play automated balloon animation to reflect event's
 *         current emotion! (check plugin parameters)
 *
 *      5. SPECIAL CASE: If speaker name is \P[n] or \N[n] will apply
 *         EMotions from this ACTOR instead of EVENT!
 *        
 *      6. Only actor EMotions will persist over transfer/load etc...
 *         Event EMotions are cleared on map transfer! (must be manually
 *         saved and loaded via variables etc...) (but persist over save)
 *
 * - Set EMotions with JS call
 * - You may still use autofill feature, even if emotions are not in use!
 *
 * NOTE: All "Speaker name" features are only available in MZ!
 *
 * ----------------------------------------------------------------------------
 * OPTIONAL System #2: Pull & Push System
 * ----------------------------------------------------------------------------
 * Make ANY event pullable and/or pushable EASILY with event comments 
 * (event page specific)!
 *
 * KEEP 'OK' button down > when moved towards event = push & move away = pull!
 * With mouse: left button push / middle button pull (3-button mouse required)
 *
 * NOTE: While pushing or pulling player can't activate other events!
 *       If any traps and/or similar events is needed to trigger use parallel
 *       processing (check demo -project for details)!
 *
 * Event position for pullable and/or pushable objects are autosaved!
 * (event._savePosition = false; // will bypass save position method!)
 *
 * TIP: Use Direction fix, stepping and walking animation for various effects!
 *
 *      Example "rolling stones":        Example "statues":
 *      - Direction fix: OFF             - Direction fix: ON
 *      - Walk animation: ON             - Walk animation: OFF
 *      - Stepping: OFF                  - Stepping: OFF
 *
 * TIP: Use *Exit Event Processing* command if you want to do conditioned
 *      pull/push for example must have some special equipment, actor etc...
 *      Also event PAGES can be used for this.
 *
 * // To override some defaults for this event (event page JS)
 * const ev = this.event(); ev._eventMoveSpeed = 3;
 * ev._eventPushEmo = 'push'; ev._eventPullEmo = 'pull';
 * ev._eventMoveBGS = {name:'Quake1',volume:90,pitch:100,pan:0,pos:0};
 *
 * ----------------------------------------------------------------------------
 * OPTIONAL System #3: Lift, Drop & Throw System
 * ----------------------------------------------------------------------------
 * Make ANY event liftable and throwable (and even breakable/exploding etc...)
 * EASILY with event comments (event page specific)!
 *
 * "Allow region id" plugin parameter allows throw to PASS these region ids 
 * and allows DROP action to drop lifted object off the cliff, bridge etc...
 * (and automatically detects "Underpass region ids" with OcRam_Passages!)
 *
 * "Allow landing" regions will allow throwable items to land on these tiles.
 * Commonly used for tiles like water, lava etc...
 *
 * Event position for liftable and/or throwable objects are autosaved!
 * (event._savePosition = false; // will bypass save position method!)
 *
 * TIP: Use *Exit Event Processing* command if you want to do conditioned
 *      lift/throw for example must have some special equipment, actor etc...
 *      Also event PAGES can be used for this.
 *
 * OK button = lift when lifted Cancel/Menu will put down and OK = THROW!
 * With mouse: Left click = Lift, Middle click = Throw, Right click = Drop
 *
 * // To override some defaults for this event (event page JS)
 * const ev = this.event();
 * ev._eventMoveSpeed = 3;
 * ev._eventLiftEmo = 'sweat';
 *
 *
 * Download OcRam MZ demo -project to learn more! (check plugin versions!)
 * https://ocram-codes.net/download.aspx?zip=OcRam_Demo_Project&folder=mz
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * MV example: OcRam_Events/copyEvent Torch 1
 * copyEvent    Copy event from event bases over given event id in current map.
 * >> baseName  Event base to copy.
 * >> eventId   Overwrites this event data with given event base.
 * 
 * MV example: OcRam_Events/spawEvent LootChest [10,14]
 * spawnEvent   Spawn event from event bases to given position.
 * >> baseName  Event base to spawn.
 * >> location  Spawn event to this point.
 *
 * ----------------------------------------------------------------------------
 * Event notetags:
 * ----------------------------------------------------------------------------
 * <event_base:Fire1>   Will copy event base 'Fire1' over this event.
 * <save_position>      Saves event position when ever leaving the map!
 * <parallax>           Fix event to parallax image!
 *
 * ----------------------------------------------------------------------------
 * Event COMMENTS:
 * ----------------------------------------------------------------------------
 * <force_autofill>  will force autofill feature "ON" while on this event page
 * 
 * <no_autofill>     will force autofill feature "OFF" while on this event page
 *
 * <when_landed>     When event is thrown or dropped from heights and this
 *                   page triggers >> event commands after this comment are
 *                   run instantly and then cleared. Use this to play SE's,
 *                   animations, re-spawns etc...
 *                   
 * To handle parallel events:
 * ----------------------------------------------------------------------------
 * <run:once>              run parallel event ONCE - in scene start
 *                         (after transfer, menu, battle etc...)
 *
 * <run:onvar:1,2,5>       run parallel event ONCE - if one of the defined
 *                         variables has been changed.
 *
 * <run:onswitch:1,4,76>   run parallel event ONCE - if one of the defined
 *                         switches has been changed.
 *                   
 * IMPORTANT! These comments must be the LAST ROW of the event page:
 * ----------------------------------------------------------------------------
 * <push>            Creates push system below this comment.
 * <pull>            Creates pull system below this comment.
 * <push&pull>       Creates push & pull system below this comment.
 * <lift:2:A:B>      Creates lift & throw system below this comment and object
 *                   can be thrown 2 tiles + trigger self switch A when landed
 *                   on normal ground and B if landed on "Allow landing region"
 *                   <lift : throw_dist : landed_selfswitch : alt_selfswitch>
 *                   TIP: Use throw distance 0 to create non-throwable object!
 *                   NOTE: "Drop" action won't trigger 'landed_selfswitch'
 *                   UNLES IT'S DROPPED OFF THE CLIFF/BRIDGE etc... MUAHAHHAA!
 *                   alt_selfswitch = Landed on "Allow landing region"
 * 
 * ----------------------------------------------------------------------------
 * Usefull script commands and objects
 * ============================================================================
 *
 * this.event().copy('Torch'); // Copy 'Torch' base over 'this' event.
 * $gameMap.spawnEvent('Bee', [x,y]); // Spawn 'Bee' base to this point.
 * OcRam.Events.getBases(); // ALL event bases are here! (Array)
 * OcRam.Events.lastSpawnedId(); // Event id of the last spawned event
 *
 * // Will not autofill face nor speaker name:
 * OcRam.Events.preventAutoFill() // in NEXT *Show message*
 * OcRam.Events.preventAutoFill(true) // in this event page for ANY message!
 * OcRam.Events.disableAutoFill() // Autofill feature disabled for now...
 * OcRam.Events.enableAutoFill() // Autofill feature enabled for now...
 *
 * character.setEMotion('laugh') // Set event emotion to 'laugh'
 * character.setEMotion() // Resets event emotion to default
 * character._currentEMotion // Get current emotion for character
 *
 * character.frontXY() // Get [x,y] in front of character
 * character.behindXY() // Get [x,y] behind the character
 * character.leftXY() // Get [x,y] left-side of the character
 * character.rightXY() // Get [x,y] right-side of the character
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
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2021/03/07 v1.00 - Initial release
 * 2021/04/02 v1.01 - Push/Pull System with mouse support*!
 *                    Lift/Drop/Throw System with mouse support*!
 *                    * = 3-button mouses! (With 2 buttons throw/pull is N/A)
 *                    NEW: Event NOTETAG <save_position> (ev._savePosition)
 * 2021/06/04 v1.02 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Lift, drop & throw system bug fix (rounding in XY
 *                    coordinates) (Credits to Yin for reports)
 *                    Compatibility patch for OcRam_Local_Coop!
 * 2021/06/10 v1.03 - "Copy event" retains original direction (for more 
 *                    possibilities with retain graphics feature).
 *                    Compatibility patch for diagonal sprite sheets.
 *                    Fixed 'list' of undefined when starting push/pull after
 *                    any scene (Credits to Nicke)
 *                    Pull & Push system diagonal start is now always blocked
 * 2021/10/21 v1.04 - Copy event will preserve direction only when page index
 *                    is 0. This way it will not interfere previously copied
 *                    graphics (example breaked pot would load intact pot).
 *                    GFX + direction preserve features can be ignored with
 *                    "None" picture on target event (with <event_base:x> tag).
 *                    Game_Character.walkStairsDown(to_dir,map_id,x,y,dir,fade)
 *                    Game_Character.walkStairsUp(to_dir,map_id,x,y,dir,fade)
 *                    Event copy pre/post JS (executes when triggered) simply
 *                    add 2 script commands (1st is executed before base list
 *                    and 2nd is executed after base list)
 * 2021/12/01 v1.05 - Fixed some bugs in walkStairsDown/Up functionality.
 *                    New event comment <no_autofill> to disable autofill 
 *                    feature while on this event page.
 * 2022/01/23 v1.06 - Fix events to parallax via <parallax> event comment!
 *                    (No scroll nor looping maps support) (Credits to Gabezin)
 * 2022/04/22 v1.07 - Fixed crash bug when speaker name \N[x] was used...
 *                    "Event on touch" now works with OcRam_Movement
 *                    Fixed _currentEMotion bug if player had no actor 
 *                    assigned (Credits TrueDekay)
 * 2022/07/10 v1.08 - Copy event now preserves orginal name (event._orgName)
 * 2022/11/11 v1.09 - Support for diagonal 'EMotions' (remember: add ! suffix)
 *                    IN MV use <speaker>...</speaker> tag in MESSAGE field to
 *                    'simulate' speaker name as it is in MZ!
 *                    
 *                    TODO: Local_Coop >> initPullPush + updatePullPush
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive) methods are listed here
 * ============================================================================
 * Game_Event.event() // IF event is copied!
 * Game_Map.events() // IF VisuMZ.EventsMoveCore is found!
 */

// ------------------------------------------------------------------------------
// New class to avoid overwrite of initialize and event methods of Game_Event!
// ==============================================================================

function Game_SpawnedEvent_OC() {
    this.initialize.apply(this, arguments);
}

Game_SpawnedEvent_OC.prototype = Object.create(Game_Event.prototype);
Game_SpawnedEvent_OC.prototype.constructor = Game_SpawnedEvent_OC;

Game_SpawnedEvent_OC.prototype.initialize = function (mapId, eventId, template, xy) {
    Game_Character.prototype.initialize.call(this);
    this._eventBase = template;
    this._mapId = mapId;
    this._eventId = eventId;
    this.locate(xy[0], xy[1]);
    this.refresh();
};

Game_SpawnedEvent_OC.prototype.event = function () {
    return this._eventBase;
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _eventBaseMapId = Number(OcRam.Events.parameters['Event base map id']);
    const _autoFillSpeaker = OcRam.getBoolean(this.parameters['Autofill speaker']);
    const _autoDimMessages = OcRam.getBoolean(this.parameters['Dim messages']);
    const _autoTransparentMessages = OcRam.getBoolean(this.parameters['Transparent messages']);
    const _autoEmotionBalloons = OcRam.getBoolean(this.parameters['Auto show balloons']);
    const _autoEmotionObjects = OcRam.getBoolean(this.parameters['Object characters']);

    const _emotionBalloons = OcRam.getArray(this.parameters['Emotion balloons']);
    const _emotionBalloonMinTime = Number(this.parameters['Min time']);
    const _emotionBalloonMaxTime = Number(this.parameters['Max time']);
    const _useParallelsFeature = OcRam.getBoolean(this.parameters['Use OcRam_Parallels']);

    const _defaultPullEmo = this.parameters['Pull emotion'] || '';
    const _defaultPushEmo = this.parameters['Push emotion'] || '';
    const _defaultLiftEmo = this.parameters['Lift emotion'] || '';

    const _allowedThrowRegionId = Number(this.parameters['Allow throw region']) < 1 ? -1 : Number(this.parameters['Allow throw region']);
    const _allowedLandingRegionId = Number(this.parameters['Allow landing region']) < 1 ? -1 : Number(this.parameters['Allow landing region']);

    let _eventBases = [];
    let _parallelVariableEvents = [];
    let _parallelSwitchEvents = [];

    let _preventAutoFillNextMessage = false;
    let _preventAutoFillThisEvent = false;
    let _preventAutoFillForNow = !_autoFillSpeaker;
    let _forcedAutoFill = false;

    let _lastSpawnedId = 0; let _spawnedEvents = [];

    // REALLY innovative way to do things! RPG Maker is AWESOME!
    const _jsonPullPushSystem = OcRam.getJSON('[{"code":111,"indent":0,"parameters":[12,"OcRam.playerCharacter()._liftedEvent || $gamePlayer.isInVehicle() || this.event().isDiagonallyStarted()"]},{"code":115,"indent":1,"parameters":[]},{"code":0,"indent":1,"parameters":[]},{"code":412,"indent":0,"parameters":[]},{"code":355,"indent":0,"parameters":["this.event().initPullPush();"]},{"code":111,"indent":0,"parameters":[12,"(Imported.OcRam_Local_Coop && OcRam.Local_Coop.getPlayerCount() > 1) || (Imported.OcRam_Movement && OcRam.Movement.pixelMoveEnabled())"]},{"code":230,"indent":1,"parameters":[20]},{"code":0,"indent":1,"parameters":[]},{"code":411,"indent":0,"parameters":[]},{"code":111,"indent":1,"parameters":[12,"Imported.OcRam_Followers"]},{"code":111,"indent":2,"parameters":[12,"OcRam.Followers.follow()"]},{"code":217,"indent":3,"parameters":[]},{"code":0,"indent":3,"parameters":[]},{"code":412,"indent":2,"parameters":[]},{"code":0,"indent":2,"parameters":[]},{"code":411,"indent":1,"parameters":[]},{"code":217,"indent":2,"parameters":[]},{"code":0,"indent":2,"parameters":[]},{"code":412,"indent":1,"parameters":[]},{"code":0,"indent":1,"parameters":[]},{"code":412,"indent":0,"parameters":[]},{"code":355,"indent":0,"parameters":["this.event().adjustPlayerPos();"]},{"code":230,"indent":0,"parameters":[9]},{"code":112,"indent":0,"parameters":[]},{"code":355,"indent":1,"parameters":["this.event().updatePullPush();"]},{"code":111,"indent":1,"parameters":[12,"OcRam.Events.okPressed(this.event())"]},{"code":111,"indent":2,"parameters":[12,"!this.event().isMoving()"]},{"code":230,"indent":3,"parameters":[1]},{"code":0,"indent":3,"parameters":[]},{"code":412,"indent":2,"parameters":[]},{"code":0,"indent":2,"parameters":[]},{"code":411,"indent":1,"parameters":[]},{"code":113,"indent":2,"parameters":[]},{"code":0,"indent":2,"parameters":[]},{"code":412,"indent":1,"parameters":[]},{"code":0,"indent":1,"parameters":[]},{"code":413,"indent":0,"parameters":[]},{"code":355,"indent":0,"parameters":["this.event().finishPullPush();"]},{"code":230,"indent":0,"parameters":[9]},{"code":0,"indent":0,"parameters":[]}]');
    const _jsonLiftThrowSystem = OcRam.getJSON('[{"code":111,"indent":0,"parameters":[12,"!OcRam.playerCharacter()._liftedEvent && !$gamePlayer.isInVehicle() && !this.event()._liftDisabled"]},{"code":355,"indent":1,"parameters":["const pc = OcRam.playerCharacter(); const ev = this.event();"]},{"code":655,"indent":1,"parameters":["if (!ev._eventMoveSpeed) ev._eventMoveSpeed = 3;"]},{"code":655,"indent":1,"parameters":["pc.setMoveSpeed(ev._eventMoveSpeed); ev.setMoveSpeed(4);"]},{"code":655,"indent":1,"parameters":["OcRam.Passages.setFloorLevel(ev, pc._higherLevel ? \'high\' : \'low\');"]},{"code":655,"indent":1,"parameters":["if (pc._x < ev._x) ev._x -= 0.5;"]},{"code":655,"indent":1,"parameters":["if (pc._x > ev._x) ev._x += 0.5;"]},{"code":655,"indent":1,"parameters":["if (pc._y < ev._y) ev._y -= 0.5;"]},{"code":655,"indent":1,"parameters":["if (pc._y > ev._y) ev._y += 0.5;"]},{"code":230,"indent":1,"parameters":[10]},{"code":355,"indent":1,"parameters":["const pc = OcRam.playerCharacter(); const ev = this.event();"]},{"code":655,"indent":1,"parameters":["ev.setMoveSpeed(ev._eventMoveSpeed); pc.setLiftedEvent(ev);"]},{"code":0,"indent":1,"parameters":[]},{"code":412,"indent":0,"parameters":[]},{"code":0,"indent":0,"parameters":[]}]');
    let _liftPullPushEvents = []; let _fastForward = true;

    // For pull & push system x/y shift
    const SA_Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
    const SA_Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================

    // Get base from memory...
    const getBase = base => {
        return _eventBases.find(item => {
            return (item && item.name == base);
        });
    };

    // Get event bases from datamap to memory!
    const initEventBases = function () {
        const mapId = _eventBaseMapId;
        const filename = "Map%1.json".format(mapId.padZero(3));
        const xhr = new XMLHttpRequest(); const url = "data/" + filename;
        xhr.open("GET", url); xhr.overrideMimeType("application/json");
        xhr.onload = () => {
            _eventBases = JSON.parse(xhr.responseText).events;
        }; xhr.onerror = () => {
            console.warn("initEventBases from mapId " + mapId + " FAILED!");
        }; xhr.send();
    };

    // Get balloon id by emotion name
    const getEmotionBalloonByName = emotion => {
        let ret = -1;
        _emotionBalloons.forEach(s => {
            const ename = (s + ":").split(":")[0];
            if (ename == emotion) {
                ret = Number((s + ":").split(":")[1]);
            }
        }); return ret;
    };

    if (!OcRam.isMZ()) { // For MV...
        const OLD_Err_Printer = Graphics.printLoadingError;
        Graphics.printLoadingError = function (url) {
            if (this._skipResLoadErr_OC) {
                ResourceHandler._reloaders = []; SceneManager.resume();
                Graphics._skipResLoadErr_OC = false; return;
            } OLD_Err_Printer.call(this, arguments);
        };
    }

    // "Hack" for image manager to ignore "failed" faces on Game_Interpreter...
    const waitForBitmap = url => {

        let bm; bm = ImageManager._cache[url]; if (!bm) return;

        if (bm && (bm.isReady() || bm.isError())) {
            if (bm.isError()) {
                bm.isError = () => { return false; };
                bm.isReady = () => { return true; };
                ImageManager._cache[url].destroy();
                if (!OcRam.isMZ()) {
                    ResourceHandler._reloaders = []; SceneManager.resume();
                    Graphics._skipResLoadErr_OC = false;
                } console.warn(url + " not found!");
            }
        } else {
            setTimeout(() => {
                Graphics._skipResLoadErr_OC = true; waitForBitmap(url);
            }, 100);
        }
    };

    // Get actor face based on speaker name \P and \N
    const command101_ActorFace = (is_battle_member, params, next_event_code) => {
        const old_values = [params[0], params[1], params[4]];
        let id = is_battle_member ? (params[4] + '').replaceAll('\\P[', '').replaceAll(']', '') :
            (params[4] + '').replaceAll('\\N[', '').replaceAll(']', '');
        if (!id) return;
        if (Imported.OcRam_Local_Coop && is_battle_member) {
            const mi = OcRam.playerCharacter()._memberIndex;
            if (mi) { // Is P2-4 ?
                if (id == 1) {
                    id = OcRam.playerCharacter()._memberIndex + 1;
                } else if (id == (OcRam.playerCharacter()._memberIndex + 1)) {
                    id = 1; // Swap 1 and this member
                }
            }
        } const member = is_battle_member ? $gameParty.battleMembers()[id - 1] : $gameActors._data[id];
        if (member) {
            const em = member._currentEMotion || "";
            const face_name = (em != "") ? member._faceName + "_" + em : member._faceName;
            const url = "img/faces/" + face_name + ".png"; const bitmap = ImageManager._cache[url];
            if (bitmap && !bitmap.isError()) {
                params[0] = face_name;
                params[1] = member._faceIndex;
                params[4] = member._name;
            } else {
                params[0] = member._faceName;
                params[1] = member._faceIndex;
                params[4] = member._name;
            }
        }

        if (Imported.OcRam_Local_Coop && OcRam.Local_Coop.getPlayerCount() > 1) {
            let player = OcRam.Local_Coop.getActualPlayer();
            if (is_battle_member) {
                if (player != OcRam.Local_Coop.memberArray()[id - 1]) {
                    player = OcRam.Local_Coop.memberArray()[id - 1];
                    Input.OC_resetControllers(true);
                    OcRam.Local_Coop.setPlayerInTurn(player);
                    player = OcRam.Local_Coop.getActualPlayer();
                }
            } if (OcRam.Local_Coop.parameters['Player speaker']) {
                switch (next_event_code) {
                    case 102: // Show Choices
                    case 103: // Input Number
                    case 104: // Select Item
                        break;
                    default:
                        
                        const c = OcRam.Local_Coop.getPlayerColor(player);
                        const text = (OcRam.Local_Coop.parameters['Speaker format'] + '').replace('$1', player);
                        params[4] = params[4] + " \\C[" + c + "]" + text + "\\C[0]";
                }
            }
        }

        // Reset in case that party member changes...
        requestAnimationFrame(() => {
            params[0] = old_values[0]; params[1] = old_values[1]; params[4] = old_values[2];
        });

    };

    // Used for throw block check (events only with commands: 'none', comment and play se/me/bgs are considered 'non-startable')
    const hasStartableEvents = (pc, ev) => {

        let ret = false; if (pc._higherLevel != ev._higherLevel) return ret;

        const x1 = pc._x; const y1 = pc._y;
        const x2 = $gameMap.roundXWithDirection(x1, pc.direction());
        const y2 = $gameMap.roundYWithDirection(y1, pc.direction());

        for (const event of $gameMap.eventsXy(x1, y1)) {
            if (event._eventId != ev._eventId && event.isTriggerIn([0, 1, 2])) {
                if (event.page().list && event.page().list.length > 0) { // Has list?
                    event.page().list.some(li => {
                        switch (li.code) {
                            case 0: case 108: break; // none, comment, play se/me/bgs
                            default: ret = true; break;
                        } if (ret) return;
                    });
                }
            } if (ret) break;
        }

        for (const event of $gameMap.eventsXy(x2, y2)) {
            if (event._eventId != ev._eventId && event.isTriggerIn([0, 1, 2])) {
                if (event.page().list && event.page().list.length > 0) { // Has list?
                    event.page().list.some(li => {
                        switch (li.code) {
                            case 0: case 108: break; // none, comment, play se/me/bgs
                            default: ret = true; break;
                        } if (ret) return;
                    });
                }
            } if (ret) break;
        } return ret;

    };

    // Trigger 'landed' self switch
    const hitLandedSS = ev => {
        ev._pageIndex = -2; _liftPullPushEvents.remove(ev);
        if ($gameMap.regionId(ev._x, ev._y) == _allowedLandingRegionId) {
            if (ev._landedSelfSwitch2 && ev._landedSelfSwitch2 != "") {
                ev._isJustLanded = true;
                OcRam.setSelfSwitch(ev._eventId | 0, ev._landedSelfSwitch2, true);
            }
        } else {
            if (ev._landedSelfSwitch && ev._landedSelfSwitch != "") {
                ev._isJustLanded = true;
                OcRam.setSelfSwitch(ev._eventId | 0, ev._landedSelfSwitch, true);
            }
        }
    };

    const isLoopped = () => {
        return !!$dataMap.scrollType;
    };

    const isParallaxScrolled = () => {
        return !!($dataMap._parallaxSx || $dataMap._parallaxSy);
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    let _oldPMove = false;
    this.pixelMove = (value, pc) => {
        if (Imported.OcRam_Local_Coop) {
            if (Imported.OcRam_Movement) {
                const fcs = pc._followingCharacters || OcRam.followers();
                if (value) {
                    pc._pixelMovementDisabled = _oldPMove;
                    fcs.forEach(f => {
                        f._pixelMovementDisabled = pc._pixelMovementDisabled;
                    });
                } else {
                    _oldPMove = pc._pixelMovementDisabled; pc._pixelMovementDisabled = true;
                    fcs.forEach(f => {
                        f._pixelMovementDisabled = pc._pixelMovementDisabled;
                    });
                }
            }
        } else {
            if (Imported.OcRam_Movement) {
                if (value) {
                    $gamePlayer._pixelMovementDisabled = _oldPMove;
                    OcRam.followers().forEach(f => {
                        f._pixelMovementDisabled = $gamePlayer._pixelMovementDisabled;
                    });
                } else {
                    _oldPMove = $gamePlayer._pixelMovementDisabled; $gamePlayer._pixelMovementDisabled = true;
                    OcRam.followers().forEach(f => {
                        f._pixelMovementDisabled = $gamePlayer._pixelMovementDisabled;
                    });
                }
            }
        }
    };

    // For OcRam_Local_Coop compatibility!
    this.okPressed = ev => {
        return Input.isPressed("ok") || TouchInput._mousePressed || TouchInput._mouseMidPressed;
    }; this.midPressed = ev => {
        return Input.isPressed("ok") || TouchInput._mouseMidPressed;
    }; this.cancelPressed = ev => {
        return Input.isTriggered("cancel") || TouchInput.isCancelled();
    };

    // Update moving (push/pull) BGS
    this.updateMovingBGS = ev => {
        if (ev._startedMoveBGS) return;
        if (ev._eventMoveBGS && ev._eventMoveBGS != AudioManager._currentBgs) {
            if (Imported.OcRam_Audio) { // Use dynamic audio as defined in OcRam_Audio
                AudioManager.playBgs(
                    {
                        name: ev._eventMoveBGS.name,
                        volume: ev._eventMoveBGS.volume,
                        pitch: ev._eventMoveBGS.pitch,
                        pan: ev._eventMoveBGS.pan,
                        AEX: {
                            type: "d",
                            distance: 20,
                            radius: 1,
                            pan: true,
                            forced: true,
                            started: false,
                            dynamic: true,
                            commandIndex: 0,
                            eventId: ev._eventId
                        }
                    });
            } else { // Use core audio (1 channel...)
                AudioManager.playBgs(ev._eventMoveBGS);
            } ev._startedMoveBGS = true;
        }
    };

    // Stop moving (push/pull) BGS
    this.stopMovingBGS = ev => {
        if (ev._eventMoveBGS) {
            if (Imported.OcRam_Audio) { // Use dynamic audio as defined in OcRam_Audio
                AudioManager.stopBgs(false, ev._eventMoveBGS.name);
            } else { // Use core audio (1 channel...)
                AudioManager.stopBgs();
            } ev._startedMoveBGS = false;
        }
    };

    // Get event base from memory by event name
    this.getBase = base => { return getBase(base); };

    // Get ALL base events
    this.getBases = () => { return _eventBases; };

    // Prevent autofill feature?
    this.preventAutoFill = for_this_event => {
        if (for_this_event) {
            _preventAutoFillThisEvent = true;
        } else {
            _preventAutoFillNextMessage = true;
        }
    };

    // Prevent/enable autofill for now
    this.disableAutoFill = () => {
        _preventAutoFillForNow = true;
    }; this.enableAutoFill = () => {
        _preventAutoFillForNow = false;
    };

    // Last spawned id to get spawned event
    this.lastSpawnedId = () => {
        return _lastSpawnedId;
    };

    // Region id to allow throw pass
    this.allowedThrowRegionId = () => {
        return _allowedThrowRegionId;
    };

    // Region id to allow throw pass + LANDING
    this.allowedLandingRegionId = () => {
        return _allowedLandingRegionId;
    };

    // Enable/Disable 'fast forward'
    this.fastForward = ff => {
        _fastForward = OcRam.getBoolean(ff);
        return _fastForward;
    };

    // Debugging purposes
    this.getLiftPullPushEvents = () => _liftPullPushEvents;

    // Only for development use for this plugin - don't know if comes handy otherwise
    this.listToJSON = (event_id, page) => {
        return JSON.stringify($gameMap.getEventById(event_id).event().pages[page].list)
            .replaceAll("\\\"\\\"", "\\\'\\\'")
            .replaceAll("\\\"ok\\\"", "\\\'ok\\\'")
            .replaceAll("\\\"up\\\"", "\\\'up\\\'")
            .replaceAll("\\\"down\\\"", "\\\'down\\\'")
            .replaceAll("\\\"left\\\"", "\\\'left\\\'")
            .replaceAll("\\\"right\\\"", "\\\'right\\\'")
            .replaceAll("\\\"low\\\"", "\\\'low\\\'")
            .replaceAll("\\\"high\\\"", "\\\'high\\\'")
            .replaceAll("\\\"auto\\\"", "\\\'auto\\\'");
    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    const _oldScrollX = Game_CharacterBase.prototype.scrolledX;
    const _oldScrollY = Game_CharacterBase.prototype.scrolledY;

    Game_Map.prototype.adjustParallaxX = function (x, origin) {
        // For now doesn't support scrolling parallax nor looping maps (events can't be at 2 places at same time)
        return x - $gameMap.parallaxOx() / OcRam.twh[0];
    };

    Game_Map.prototype.adjustParallaxY = function (y) {
        // For now doesn't support scrolling parallax nor looping maps (events can't be at 2 places at same time)
        return y - $gameMap.parallaxOy() / OcRam.twh[1];
    };

    // Walk stairs feature
    let _oldThrough = false; let _stairedCharacter = false;
    Game_Character.prototype.walkStairsDown = function (to_dir, map_id, x, y, dir, fade, se) {
        _oldThrough = this._through;
        this.setDirection(to_dir);
        this.setThrough(true);
        if (this._followingCharacters) {
            if (!this._followers) { // Local co-op support
                $gamePlayer._followers.updateMove(this);
            } else {
                this._followers.updateMove();
            }
        } else if (this._followers) {
            this._followers.updateMove();
        } this._depth = 0;
        _stairedCharacter = $gameMap._interpreter.event();
        if (se) AudioManager.playSe(se);
        this.moveStairSteps(to_dir, true, 0, map_id, x, y, dir, fade, se);
    };

    Game_Character.prototype.walkStairsUp = function (to_dir, map_id, x, y, dir, fade, se) {
        _oldThrough = this._through;
        this.setDirection(to_dir);
        this.setThrough(true);
        if (this._followingCharacters) {
            if (!this._followers) { // Local co-op support
                $gamePlayer._followers.updateMove(this);
            } else {
                this._followers.updateMove();
            }
        } else if (this._followers) {
            this._followers.updateMove();
        } this._depth = 0;
        _stairedCharacter = $gameMap._interpreter.event();
        if (se) AudioManager.playSe(se);
        this.moveStairSteps(to_dir, false, 0, map_id, x, y, dir, fade, se);
    };

    Game_Character.prototype.moveStairSteps = function (to_dir, down, steps_taken, map_id, x, y, dir, fade, se) {


        /*if (se) {
            for (const bfr of AudioManager._seBuffers) {
                if (bfr.name == se.name) bfr.volume = 0;
            }AudioManager.playSe(se);
        }*/

        if (!down) {
            this._depth = 0;
            switch (to_dir) {
                case 8: this._y -= 0.25; break;
                case 2: this._y += 0.25; break;
                case 4:
                    this._x += (steps_taken > 0) ? -0.2 : -0.5;
                    this._y += (steps_taken > 0) ? -0.2 : 0;
                    break;
                case 6:
                    this._x += (steps_taken > 0) ? 0.2 : 0.5;
                    this._y += (steps_taken > 0) ? -0.2 : 0;
                    break;
            }
        } else {
            switch (to_dir) {
                case 8: this._y -= 0.25; break;
                case 2: this._y += 0.25; break;
                case 4:
                    this._x += (steps_taken > 0) ? -0.2 : -0.5;
                    if (steps_taken > 0) this._depth += (OcRam.twh[1] * 0.2) | 0;
                    break;
                case 6:
                    this._x += (steps_taken > 0) ? 0.2 : 0.5;
                    if (steps_taken > 0) this._depth += (OcRam.twh[1] * 0.2) | 0;
                    break;
            }
        }
        
        //if (down) { this.scale.x -= 0.1; this.scale.y -= 0.1; }

        if (fade == 2) { // instant
            if (steps_taken < 4) { // need more steps
                setTimeout(() => {
                    this.moveStairSteps(to_dir, down, ++steps_taken, map_id, x, y, dir, fade, se);
                    if (steps_taken == 4) {
                        if (se) AudioManager.playSe(se);
                        this.setThrough(_oldThrough); _oldThrough = false;
                        $gamePlayer.reserveTransfer(map_id, x, y, dir, fade, se);
                        setTimeout(() => {
                            this._depth = 0; if (_stairedCharacter) _stairedCharacter._priorityType = 1; _stairedCharacter = false;
                        }, 60);
                    }
                }, 300);
            }
        } else { // fade
            if (steps_taken < 3) { // need more steps
                setTimeout(() => {
                    this.moveStairSteps(to_dir, down, ++steps_taken, map_id, x, y, dir, fade, se);
                    if (steps_taken == 2) {
                        if (se) AudioManager.playSe(se);
                        this.setThrough(_oldThrough); _oldThrough = false;
                        $gamePlayer.reserveTransfer(map_id, x, y, dir, fade, se);
                        setTimeout(() => {
                            this._depth = 0; if (_stairedCharacter) _stairedCharacter._priorityType = 1; _stairedCharacter = false;
                        }, 600);
                    }
                }, 300);
            }
        }
        
    };

    // Special alias for TEMPORARY OVERWRITE
    const SA_Game_Player_updateDashing = Game_Player.prototype.updateDashing;
    const SA_Game_Follower_updateDashing = Game_Follower.prototype.updateDashing;

    // Dummy update - does nothing - to avoid extra iffing!
    Game_Event.prototype.updateLift = function () { };

    // Will be overwritten if OcRam_Passages is imported!
    Game_Character.prototype.checkThrowPass = function (x, y) {
        const x1 = this._direction == 6 ? x + 1 : this._direction == 4 ? x - 1 : x;
        const y1 = this._direction == 2 ? y + 1 : this._direction == 8 ? y - 1 : y;
        const nxt_rid = $gameMap.regionId(x1, y1); const ths_rid = $gameMap.regionId(x, y);
        const hne = !($gameMap.eventsXyNt(x1, y1).find(e => { return e._priorityType == 1; }));
        return (this.isMapPassable(x, y, this._direction) && hne) ||
            nxt_rid == _allowedThrowRegionId ||
            nxt_rid == _allowedLandingRegionId ||
            ths_rid == _allowedThrowRegionId ||
            ths_rid == _allowedLandingRegionId;
    };

    // ------------------------------------------------------------------------------
    // Lift, Drop & Throw System
    // ==============================================================================

    Game_Character.prototype.setLiftedEvent = function (ev) { // Set lifted event!

        if (this._liftedEvent) return; // Can't lift twice at the same time!
        if ($gamePlayer.isInVehicle()) return; // Can't lift while in vehicle!

        ev._liftedEvent = true;

        _this.pixelMove(false, this); ev._pixelMovementDisabled = true;
        this._liftedEvent = ev; // Player and lifted event gets 'married'
        ev._isJustLanded = false;
        ev._linkedPlayer = OcRam.playerCharacter() === $gamePlayer ? null : this;

        this._emotionBeforeMove = this._currentEMotion || '';
        requestAnimationFrame(() => {
            if (("" + ev._eventLiftEmo) != "") this.setEMotion(ev._eventLiftEmo);
        });

        if (Imported.OcRam_Movement) {
            this._x = Math.round(this._x);
            this._y = Math.round(this._y);
            OcRam.Movement.resetSteps();
        }

        this._initDone = false;
        setTimeout(() => {
            this._initDone = true;
        }, 220);

        if (this.isFollower()) {
            Game_Follower.prototype.updateDashing = function () {
                this._dashing = false; // No dashing while lifted something!
            };
        } else {
            Game_Player.prototype.updateDashing = function () {
                this._dashing = false; // No dashing while lifted something!
            };
        }

        // Now updateLifted should do something...
        this.updateLifted = () => {

            const ev = this._liftedEvent; if (!ev) return;

            if (TouchInput.isCancelled()) {
                const dx = ((TouchInput.x / OcRam.twh[0]) | 0) + $gameMap.displayX();
                const dy = ((TouchInput.y / OcRam.twh[1]) | 0) + $gameMap.displayY();
                let d = this.findDirectionTo(dx, dy);
                if (d % 2) {
                    d = OcRam.getHorzVert(d)[0];
                } this.setDirection(d);
            }

            switch (this._direction) {
                case 2: // Down - special check (to avoid bad graphical glitch while wall-hugging)!
                    if (ev._prevDir != this._direction) {
                        ev._realX = this._realX;
                        ev._realY = this.checkThrowPass(this._x, this._y) ? this._realY + 0.5 : this._realY;
                        ev._x = ev._realX; ev._y = ev._realY;
                    } else {
                        ev._x = this._x; ev._y = this.checkThrowPass(this._x, this._y) ? this._y + 0.5 : this._y;
                    } ev._prevDir = this._direction;
                    break;
                case 8: case 7: case 9: // Up
                    if (ev._prevDir != this._direction) {
                        ev._realX = this._realX;
                        ev._realY = this._realY - 0.5;
                        ev._x = ev._realX; ev._y = ev._realY;
                    } else {
                        ev._x = this._x; ev._y = this._y - 0.5;
                    } ev._prevDir = this._direction;
                    break;
                case 4: case 1: // Left
                    if (ev._prevDir != 4) {
                        ev._realX = this._realX - 0.5;
                        ev._realY = this._realY;
                        ev._x = ev._realX; ev._y = ev._realY;
                    } else {
                        ev._x = this._x - 0.5; ev._y = this._y;
                    } ev._prevDir = 4;
                    break;
                case 6: case 3: // Right
                    if (ev._prevDir != 6) {
                        ev._realX = this._realX + 0.5;
                        ev._realY = this._realY;
                        ev._x = ev._realX; ev._y = ev._realY;
                    } else {
                        ev._x = this._x + 0.5; ev._y = this._y;
                    } ev._prevDir = 6;
                    break;
            } if (!ev._directionFix) ev._direction = this._direction | 0;

            if (this._liftedEvent._higherLevel !== this._higherLevel) {
                this._liftedEvent._higherLevel = undefined;
                this._liftedEvent.setFloorLevel(this._higherLevel ? "high" : "low");
            }

            if (this._initDone) {
                if (_this.midPressed(ev)) {
                    if (!hasStartableEvents(this, ev)) this.throw();
                } else if (_this.cancelPressed(ev)) {
                    this.drop();
                }
            }

        };

    };

    // Throw something!
    Game_Character.prototype.throw = function () {

        if (!this._liftedEvent) return;
        if ($gameMessage.isBusy()) return;

        const ev = this._liftedEvent;
        ev._liftDisabled = true;
        this.updateLifted = () => { }; // updateLifted does nothing when thrown
        this.setEMotion(this._emotionBeforeMove);

        const distance = Math.abs(ev._throwDistance);
        if (distance < 1) { // Throw is not allowed for this event!
            this.drop(); return;
        }
        
        // Check for throw to pass...
        const x_y = this.XY();
        switch (this._direction) {
            case 8:
                for (let i = 0; i < distance; i++) {
                    if (this.checkThrowPass(x_y[0], x_y[1])) {
                        x_y[1]--;
                    } else { break; }
                } break;
            case 2:
                for (let i = 0; i < distance; i++) {
                    if (this.checkThrowPass(x_y[0], x_y[1])) {
                        x_y[1]++;
                    } else { break; }
                } break;
            case 4:
                for (let i = 0; i < distance; i++) {
                    if (this.checkThrowPass(x_y[0], x_y[1])) {
                        x_y[0]--;
                    } else { break; }
                } break;
            case 6:
                for (let i = 0; i < distance; i++) {
                    if (this.checkThrowPass(x_y[0], x_y[1])) {
                        x_y[0]++;
                    } else { break; }
                } break;
        }

        // Allow throw down the cliffs more than allowed amount throw tiles.
        if ($gameMap.regionId(x_y[0], x_y[1]) == _allowedThrowRegionId) {
            switch (this._direction) {
                case 2: case 4: case 6:
                    let i = 0; while (i++ < 200 && ($gameMap.regionId(x_y[0], ++x_y[1]) == _allowedThrowRegionId)) { /* funny loop :d */ } break;
                case 8: break;
            }
        }

        const events = $gameMap.eventsXyNt(x_y[0], x_y[1]);
        const collided_with_chars = events.some(event => event.isNormalPriority());
        const rid = $gameMap.regionId(x_y[0], x_y[1]);

        // Take steps back if landed on NON-allowedLanding region!
        if (rid != _allowedLandingRegionId && (rid == _allowedThrowRegionId || !$gameMap.isTilePassable(x_y[0], x_y[1]) || collided_with_chars)) {
            switch (this._direction) {
                case 8: while (this._y != x_y[1] && $gameMap.regionId(x_y[0], ++x_y[1]) == _allowedThrowRegionId) { /* funny loop :p */ } break;
                case 2: while (this._y != x_y[1] && $gameMap.regionId(x_y[0], --x_y[1]) == _allowedThrowRegionId) { /* funny loop :p */ } break;
                case 4: while (this._x != x_y[0] && $gameMap.regionId(++x_y[0], x_y[1]) == _allowedThrowRegionId) { /* funny loop :p */ } break;
                case 6: while (this._x != x_y[0] && $gameMap.regionId(--x_y[0], x_y[1]) == _allowedThrowRegionId) { /* funny loop :p */ } break;
            }
        }

        // Check if landed on "Allow throw PASS zone" >> move back while is passable
        // "Allow landing" >> like water/lava ALSO allows pass
        TouchInput._mousePressed = false; TouchInput._mouseMidPressed = false;

        ev.jumpTo(x_y[0], x_y[1]); this.finishLift(ev, true);

    };

    // Drop something
    Game_Character.prototype.drop = function (in_place) {

        if (!this._liftedEvent) return;
        if ($gameMessage.isBusy()) return;

        const ev = this._liftedEvent;
        ev._liftDisabled = true;
        this.updateLifted = () => { }; // updateLifted does nothing when dropped
        this.setEMotion(this._emotionBeforeMove);

        ev.setMoveSpeed(4);

        if (in_place) { // Player must 'divorce' from event... transfer or vehicle get on...
            ev._moveSpeed = 5; let bxy = this.behindXY(); ev._x = bxy[0]; ev._y = bxy[1];
            let _oldThrough = ev._through; ev._through = true;
            setTimeout(() => { // It's time to 'divorce' from event...
                if (ev) ev._through = _oldThrough;
            }, 1500); this.finishLift(ev, false, false);
            return; // Process no further...
        }

        let force_lower = false;
        let tx = this.checkThrowPass(this._x, this._y) ? $gameMap.roundXWithDirection(this._x, this._direction) | 0 : this._x;
        let ty = this.checkThrowPass(this._x, this._y) ? $gameMap.roundYWithDirection(this._y, this._direction) | 0 : this._y;
        if (Imported.OcRam_Passages) {
            if (this._higherLevel && $gameMap.regionId(tx, ty) == OcRam.Passages.parameters['Underpass Region ID']) {
                ty++; force_lower = true;
            }
        } ev._oldMoveSpeed = ev._moveSpeed;

        // CHECK HERE FOR DROP OFF THE CLIFF + force to lower floor level and hit break switch!
        if (!force_lower && $gameMap.regionId(tx, ty) == _allowedThrowRegionId) {
            switch (this._direction) {
                case 2: case 4: case 6:
                    let i = 0; ev._moveSpeed = 5;
                    while (i++ < 200 && ($gameMap.regionId(tx, ++ty) == _allowedThrowRegionId)) { /* funny loop :d */ }
                    force_lower = true; break;
                case 8: ty = this._y; break;
            }
        } else if (!force_lower && $gameMap.regionId(tx, ty) == _allowedLandingRegionId) {
            force_lower = true;
        } ev._x = tx; ev._y = ty;

        this.finishLift(ev, false, force_lower);

        OcRam.followers().forEach(f => {
            f.setEMotion(f.getActor()._currentEMotion);
        });

    };

    // Lifted event is now thrown or dropped!
    Game_Character.prototype.finishLift = function (ev, thrown, force_lower, recursive) {
        if (!recursive) { // Done only once and done IMMEDIATLY!!
            if (Imported.OcRam_Movement) {
                $tempGamePlayer_OC = this;
                OcRam.Movement.resetFollowerGap();
                $tempGamePlayer_OC = null;
            } this.setMoveSpeed(4); _this.pixelMove(true, this);
            if (ev._indicator) ev._indicator._started = false;
            if (this.isFollower()) {
                Game_Follower.prototype.updateDashing = function () {
                    return SA_Game_Follower_updateDashing.call(this);
                };
            } else {
                Game_Player.prototype.updateDashing = function () {
                    return SA_Game_Player_updateDashing.call(this);
                };
            } this.finishLift(ev, thrown, force_lower, true);
        } else { // Wait for event movement to STOP!
            if (ev.isMoving()) {
                setTimeout(() => {
                    this.finishLift(ev, thrown, force_lower, true);
                }, 100); return;
            } else { // Event movement has stopped!
                if (Imported.OcRam_Passages) {
                    const rid = ev.regionId();
                    if (rid == OcRam.Passages.parameters['Cover Autotile Region ID'] || rid == OcRam.Passages.parameters['Cover Region ID']) {
                        /* Keep current floor level... */
                    } else {
                        ev._higherLevel = undefined; ev.setFloorLevel("auto");
                    }
                } if (thrown) {
                    hitLandedSS(ev);
                } else {
                    if (force_lower) {
                        ev._moveSpeed = ev._oldMoveSpeed; hitLandedSS(ev);
                    }
                } this._landedSelfSwitch = ""; this._landedSelfSwitch2 = "";
                ev._linkedPlayer = null; this._liftedEvent = null;
                if (Imported.OcRam_Local_Coop) OcRam.Local_Coop.resetCurrentPlayer();
                setTimeout(() => {
                    ev._liftDisabled = false;
                }, 200);
            }
        }
    };

    // ------------------------------------------------------------------------------
    // Pull & Push System
    // ==============================================================================

    let _p2pp = null; // Player 2 (or above) pushing / pulling - for Local Co-op
    this.p2pp = () => { return _p2pp; };

    const SA_Game_Event_isCollidedWithCharacters = Game_Event.prototype.isCollidedWithCharacters;

    const followersFollow = () => {
        if (Imported.OcRam_Followers) {
            return OcRam.Followers.follow();
        } else {
            return true;
        }
    };

    Game_Character.prototype.initPullPush = function () { // Setup pull / push event

        const pc = OcRam.playerCharacter();
        this._linkedPlayer = pc === $gamePlayer ? null : OcRam.playerCharacter();
        if (this._linkedPlayer) _p2pp = this._linkedPlayer;

        if (followersFollow()) {
            if (Imported.OcRam_Local_Coop) {
                for (let i = 0; i < 4; i++) {
                    if ($allPlayers[i]) {
                        $allPlayers[i]._followingCharacters.forEach(f => {
                            if ($allPlayers[i]._x != f._x || $allPlayers[i]._y != f._y) f.jumpTo($allPlayers[i]._x, $allPlayers[i]._y);
                        });
                    }
                }
            } else if (Imported.OcRam_Movement && OcRam.Movement.pixelMoveEnabled()) {
                OcRam.followers().forEach(f => {
                    if ($gamePlayer._x != f._x || $gamePlayer._y != f._y) f.jumpTo($gamePlayer._x, $gamePlayer._y);
                });
            }
        }

        this._pixelMovementDisabled = true;
        _this.fastForward(false);
        _this.pixelMove(false, pc);
        if (Imported.OcRam_Movement && OcRam.Movement.pixelMoveEnabled()) {
            pc._x = Math.round(pc._x);
            pc._y = Math.round(pc._y);
        } pc._emotionBeforeMove = pc._currentEMotion;
        if (!this._eventMoveSpeed) this._eventMoveSpeed = 3;
        this.setMoveSpeed(this._eventMoveSpeed);
        this._pushPullType = 0;

    };

    // Pull & push system X/Y adjust
    Game_Character.prototype.adjustPlayerPos = function () {

        const pc = OcRam.playerCharacter(); pc._directionFix = true;

        if (followersFollow()) {
            $gamePlayer.hideFollowers(); $gamePlayer.refresh();
        }
        
        const d = pc.direction(); pc._adjX = 0; pc._adjY = 0;
        const tadj_x = (d != 4 && d != 6) ? 0 : (this._x > pc._x) ? OcRam.twh50[0] * 0.75 : -(OcRam.twh50[0] * 0.75);
        const tadj_y = (d != 2 && d != 8) ? 0 : (this._y > pc._y) ? OcRam.twh50[0] * 0.75 : -(OcRam.twh50[0] * 0.75);
        const xs = Math.abs((tadj_x / 9) | 0); const ys = Math.abs((tadj_y / 9) | 0);
        pc.screenX = function () {
            if (tadj_x < 0 && this._adjX > tadj_x) this._adjX -= xs;
            if (tadj_x > 0 && this._adjX < tadj_x) this._adjX += xs;
            return (SA_Game_CharacterBase_screenX.call(this) + this._adjX);
        }; pc.screenY = function () {
            if (tadj_y < 0 && this._adjY > tadj_y) this._adjY -= ys;
            if (tadj_y > 0 && this._adjY < tadj_y) this._adjY += ys;
            return (SA_Game_CharacterBase_screenY.call(this) + this._adjY);
        };

        pc.setMoveSpeed(this._eventMoveSpeed);

        this.isCollidedWithCharacters = function (x, y) {
            return Game_Character.prototype.isCollidedWithCharacters.call(this, x, y);
        };

        if (this._linkedPlayer && pc._deviceIndex_OC < 0) {
            Input._currentState2["ok"] = true;
            pc._preventNextOk = false;
            pc._okIsPressed = true;
        }

    };

    // UPDATE pull push event
    Game_Character.prototype.updatePullPush = function () {

        const pc = this._linkedPlayer || $gamePlayer; const p1 = !this._linkedPlayer;
        const kbm = (p1 || this._linkedPlayer._deviceIndex_OC == -1);
        const d = pc.direction();
        const id = kbm ? Input.dir4 : pc.getInputDirection();
        const mp = kbm ? TouchInput._mousePressed : false;
        const mm = kbm ? TouchInput._mouseMidPressed : false;

        if (
            d == id || mp
        ) { if (this._allowPush) this._pushPullType = 1; } else if (
            d == (10 - id) || mm
        ) { if (this._allowPull) this._pushPullType = 2; } else {
            this._pushPullType = 0;
        }

        if (this._pushPullType == 1) { // PUSH OBJECT
            requestAnimationFrame(() => {
                if (this._higherLevel != pc._higherLevel)
                    OcRam.Passages.setFloorLevel(pc, this._higherLevel ? "high" : "low");
            }); _this.updateMovingBGS(this);
            if (pc._currentEMotion != this._pushMoveEmo) pc.setEMotion(this._pushMoveEmo);
            /* Event move away from player (skip)
             * player (skip, wait)
             *      wait 1 frame
             *      1 step forward
             */ this.moveAwayFromCharacter(pc);
            $gameMap._interpreter.command205([-1, { "list": [{ "code": 15, "parameters": [1], "indent": null }, { "code": 12, "indent": null }, { "code": 0 }], "repeat": false, "skippable": true, "wait": true }]);
        }
        
        if (this._pushPullType == 2) {
            requestAnimationFrame(() => { // PULL OBJECT
                if (this._higherLevel != pc._higherLevel)
                    OcRam.Passages.setFloorLevel(this, pc._higherLevel ? "high" : "low");
            }); _this.updateMovingBGS(this);
            if (pc._currentEMotion != this._pullMoveEmo) pc.setEMotion(this._pullMoveEmo);
            /* player 1 step backward (skip)
             * this (skip, wait)
             *      wait 1 frame
             *      move toward player
            */ const rx = $gameMap.roundXWithDirection(pc._x | 0); const ry = $gameMap.roundYWithDirection(pc._y | 0);
            if (pc.canPass(rx, ry, 10 - d)) {
                $gameMap._interpreter.command205([-1, { "list": [{ "code": 13, "indent": null }, { "code": 0 }], "repeat": false, "skippable": true, "wait": false }]);
                $gameMap._interpreter.command205([0, { "list": [{ "code": 15, "parameters": [1], "indent": null }, { "code": 45, "parameters": ["this.moveTowardCharacter(this._linkedPlayer || $gamePlayer)"], "indent": null }, { "code": 0 }], "repeat": false, "skippable": true, "wait": true }]);
            }
        }

        if (this._pushPullType == 0) { // Pull / push emo + stop moving bgs
            pc.setEMotion(this._emotionBeforeMove);
            _this.stopMovingBGS(this);
        }

    };

    // Animate "detach" from pull & push event
    Game_Character.prototype.detachFromEv = function (frames, stepX, stepY) {
        if (frames < 1) {
            this._adjX = 0; this._adjY = 0;
            this.screenX = function () {
                return SA_Game_CharacterBase_screenX.call(this);
            }; this.screenY = function () {
                return SA_Game_CharacterBase_screenY.call(this);
            };
        } else {
            frames--;
            if (this._adjX < 0) this._adjX += stepX;
            if (this._adjX > 0) this._adjX -= stepX;
            if (this._adjY < 0) this._adjY += stepY;
            if (this._adjY > 0) this._adjY -= stepY;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.detachFromEv(frames, stepX, stepY);
                });
            });
        }
    };

    Game_Character.prototype.finishPullPush = function () {

        const pc = this._linkedPlayer || $gamePlayer; //OcRam.playerCharacter();

        pc.screenX = function () { // Begin to animate "detach"
            return (SA_Game_CharacterBase_screenX.call(this) + this._adjX);
        }; pc.screenY = function () {
            return (SA_Game_CharacterBase_screenY.call(this) + this._adjY);
        };

        const xs = ((OcRam.twh50[0] * 0.75) / 9) | 0;
        const ys = ((OcRam.twh50[1] * 0.75) / 9) | 0;
        pc.detachFromEv(9, xs, ys);

        pc._directionFix = false; pc._moveSpeed = 4;

        $gamePlayer.showFollowers(); $gamePlayer.refresh(); // Player Followers ON

        _this.stopMovingBGS(this);

        if (followersFollow()) {
            if (Imported.OcRam_Local_Coop) {
                const x = pc._x;
                const y = pc._y;
                pc._followingCharacters.forEach(f => {
                    f._direction = pc._direction;
                    OcRam.Passages.setFloorLevel(f, pc._higherLevel ? "high" : "low");
                    f.locate(x, y);
                });
            } else {
                OcRam.followers().forEach(f => {
                    f._direction = pc._direction;
                    OcRam.Passages.setFloorLevel(f, pc._higherLevel ? "high" : "low");
                    f.locate(pc._x, pc._y);
                });
            }
        }

        this._pushPullType = 0;
        pc.setEMotion(pc._emotionBeforeMove);
        OcRam.followers().forEach(f => {
            f.setEMotion(f.getActor()._currentEMotion);
        });

        this._linkedPlayer = null; _p2pp = null;
        _this.fastForward(true); _this.pixelMove(true, pc);

        if (Imported.OcRam_Local_Coop) OcRam.Local_Coop.resetCurrentPlayer();

        this.isCollidedWithCharacters = function (x, y) {
            return SA_Game_Event_isCollidedWithCharacters.call(this, x, y);
        };

    };
    
    // ------------------------------------------------------------------------------
    // Copy, Spawn, Save position and EMotion systems
    // ==============================================================================

    // Spawn TEMPORARY event from event bases!
    Game_Map.prototype.spawnEvent = function (base, xy) {
        const b = getBase(base);
        if (!b) {
            console.warn("Event base (" + base + ") NOT FOUND!"); return;
        } const t = OcRam.deepCopy(b); if (!t) return; _lastSpawnedId++;
        const ev = new Game_SpawnedEvent_OC(this._mapId, _lastSpawnedId, t, xy);
        this._events[_lastSpawnedId] = ev;
        if (SceneManager._scene) {
            const scene_map = SceneManager._scene._spriteset;
            if (scene_map) {
                const ns = new Sprite_Character(ev);
                scene_map._characterSprites.push(ns);
                scene_map._tilemap.addChild(ns);
            }
        } ev._pageIndex = -2; ev.refresh();
    };

    // Copy event "alias"
    Game_Map.prototype.copyEvent = function (event_id, base) {
        const ev = this.getEventById(event_id); if (ev) ev.copyEvent(base);
    };

    // Actual copy event
    Game_Event.prototype.copyEvent = function (base) {

        const b = getBase(base);
        if (!b) {
            console.warn("Event base (" + base + ") NOT FOUND!");
            this._eventBase = undefined; return;
        } const t = OcRam.deepCopy(b);
        if (!t) { this._eventBase = undefined; return; }
        let old_image = ""; let old_index = 0; let old_tileid = 0; let old_dir = 0;
        this._originalX = this.event().x | 0; this._originalY = this.event().y | 0;

        // Get before and after event base JS evals...
        const list = this.page() ? this.page().list : null;
        if (list && list.length > 0) {
            if (list[0].code == 355) { // 1st line is JS! (getting pre base js eval)
                let js_text = list[0].parameters[0] + "\n"; let i = 0;
                while (list[++i].code == 655) { // JS continues...
                    js_text += list[i].parameters[0] + "\n";
                } this._jsBeforeBase = js_text;
                if (list[i].code == 355) { // 2nd line is JS! (getting after base js eval)
                    js_text = list[i].parameters[0] + "\n";
                    while (list[++i].code == 655) { // JS continues...
                        js_text += list[i].parameters[0] + "\n";
                    } this._jsAfterBase = js_text;
                }
            }
        }

        // Has orginal event any images to offer?
        if (this.event() && this.event().pages && this.event().pages[0]) {
            const img = this.event().pages[0].image;
            old_image = img.characterName;
            old_index = img.characterIndex;
            old_dir = this.direction();
            if (img.tileId) old_tileid = img.tileId;
        } this._eventBase = t;
        this._eventBase._orgName = this.event().name;

        this._eventBase.pages.forEach(itm => { // Replace base image with original image
            if (old_image != "" && itm.image.characterName != "") {
                itm.image.characterName = old_image;
                itm.image.characterIndex = old_index;
            } else if (old_tileid && itm.image.tileId) {
                itm.image.tileId = old_tileid;
            }
        });

        // Overwrite event() -method
        this.event = function () {
            return this._eventBase;
        }; this._pageIndex = -2; this.refresh();

        // Retain original direction, but only when on 1st page!
        if (old_image != "" && this._pageIndex == 0) {
            const old_df = this._directionFix; this._directionFix = false;
            this.setDirection(old_dir); this._directionFix = old_df;
        }

    };

    if (_useParallelsFeature) { // Use "Parallels feature"
        Game_Event.prototype.setupParallel_OC = function () {
            this._run_once = true; // Setup parallel once again...
            this._interpreter = new Game_Interpreter();
            if (!this._interpreter.isRunning()) {
                this._interpreter.setup(this.list(), this._eventId);
            }
        };
    }

    // Set emotion character sheet for this character
    Game_Character.prototype.setEMotion = function (emotion) {
        this._currentEMotion = emotion;
        let fallback_img = this._originalCharacterName || this._characterName;
        const actor = this.getActor(); // If it's actor then update actor also
        if (actor) {
            actor._currentEMotion = emotion;
            if (!actor._originalCharacterName) actor._characterName;
            fallback_img = actor._originalCharacterName || actor._characterName;
        } if (!emotion || emotion === "undefined" || emotion === "undefined!") {
            if (_autoEmotionBalloons) if (this._eBalloonTimer) clearTimeout(this._eBalloonTimer); // Clear previous _eBalloonTimer...
            this.setImage(fallback_img, this._characterIndex);
        } else {
            OcRam.isUrlAvailable(
                "img/characters/" + fallback_img + "_" + emotion + ".png",
                () => { // Succeeded callback
                    this.setImage(fallback_img + "_" + emotion, this._characterIndex);
                },
                () => { // Error callback
                    this.setImage(fallback_img, this._characterIndex);
                    _this.debug("Couldn't find character " + fallback_img + "_" + emotion);
                }
            ); if (_autoEmotionBalloons) this.setEMotionBalloon(emotion);
        }
    };

    // Update auto "EMotion" balloon
    Game_Character.prototype.updateEMotionBalloonWait = function () {
        this._eBalloonTimer = setTimeout(() => {
            this._eBalloonWait--;
            if (this._eBalloonWait < 1) {
                this.showBalloon(this._eBalloonId, false);
                this._eBalloonWait = Math.randomBetween(_emotionBalloonMinTime, _emotionBalloonMaxTime);
            } this.updateEMotionBalloonWait();
        }, 1000);
    }; Game_Player.prototype.updateEMotionBalloonWait = function () {
        if (this._vehicleType != "walk") {
            this._eBalloonTimer = setTimeout(() => {
                this.updateEMotionBalloonWait();
            }, 1000); return;
        } // Show emotion balloons only while walking...
        Game_Character.prototype.updateEMotionBalloonWait.call(this, arguments);
    }; Game_Follower.prototype.updateEMotionBalloonWait = function () {
        if ($gamePlayer._vehicleType != "walk") {
            this._eBalloonTimer = setTimeout(() => {
                this.updateEMotionBalloonWait();
            }, 1000); return;
        } // Show emotion balloons only while walking...
        Game_Character.prototype.updateEMotionBalloonWait.call(this, arguments);
    };

    // Set "EMotion" balloon
    Game_Character.prototype.setEMotionBalloon = function (emotion) {
        if (this._eBalloonTimer) clearTimeout(this._eBalloonTimer); // Clear previous _eBalloonTimer...
        const balloon_id = getEmotionBalloonByName(emotion);
        this._eBalloonId = balloon_id; if (balloon_id < 0) return;
        this._eBalloonWait = 1; this.updateEMotionBalloonWait();
    };

    // When interpreter setups an event - Make some "EMotions" preload for it
    Game_Interpreter.prototype.loadEMotionImages = function () {
        const list = this._list.slice(0, 200);
        _forcedAutoFill = false; let cur_emo = ""; this._index = 0; 
        for (const command of list) {
            switch (command.code) {
                case 108: // Comment
                    if (command.parameters[0] && command.parameters[0] == "<force_autofill>") {
                        _this.debug("Forced autofill!"); _forcedAutoFill = true;
                    } if (command.parameters[0] && command.parameters[0] == "<no_autofill>") {
                        _this.debug("Prevent autofill!"); _forcedAutoFill = false; _preventAutoFillThisEvent = true;
                        this._index = 0; return;
                    } break;
                case 101: // Show Text
                    const ev = this.event(); if (!ev) {
                        ImageManager.loadFace(command.parameters[0]); this._index = 0; return;
                    } const n2l = (command.parameters[4] + '').left(3);
                    let cn = ev._originalCharacterName || ev._characterName || "";
                    if ((command.parameters[0] + '') == '') {
                        if (n2l == "\\P\[") { // Oh... it's actor we are talking about...
                            const id = (command.parameters[4] + '').replaceAll('\\P[', '').replaceAll(']', '');
                            const member = $gameParty.battleMembers()[id - 1]; if (!member) break; cn = member.faceName();
                            if (!cur_emo || cur_emo == "") cur_emo = member._currentEMotion;
                        } else if (n2l == "\\N\[") { // Oh... it's actor we are talking about...
                            const id = (command.parameters[4] + '').replaceAll('\\N[', '').replaceAll(']', '');
                            const member = $gameActors._data[id]; if (!member) break; cn = member._faceName;
                            if (!cur_emo || cur_emo == "") cur_emo = member._currentEMotion;
                        } else { // Event
                            if (!cur_emo || cur_emo == "") {
                                cur_emo = ev._tempEMotion;
                            } else {
                                if (!ev._tempEMotion || ev._tempEMotion == "") ev._tempEMotion = cur_emo;
                            }
                        }
                    } const em = cur_emo || ""; cur_emo = "";
                    const emo_name = (em != "") ? cn + "_" + em : cn;
                    const url = "img/faces/" + emo_name + ".png";
                    if (emo_name == cn) {
                        try {
                            ImageManager.loadFace(emo_name);
                        } catch (e) { } waitForBitmap(url); // Let's hack some stuff there - if needed...
                    } else {
                        OcRam.isUrlAvailable(
                            url,
                            () => { ImageManager.loadFace(emo_name); },
                            () => { /* Error callback - Browser already warns about this... */ }
                        );
                    } break;
                case 355: // Then we need to parse some JS...
                    let script = command.parameters[0] + "\n";
                    while (this.nextEventCode() === 655) {
                        this._index++;
                        script += this.currentCommand().parameters[0] + "\n";
                    } if (script.indexOf("\.setEMotion\(") != -1) {
                        cur_emo = /\.setEMotion\((.*?)\)/.exec(script)[1];
                        cur_emo = cur_emo || "";
                        if (cur_emo != "") {
                            cur_emo = cur_emo.replaceAll(/\'/ig, "");
                            cur_emo = cur_emo.replaceAll(/\"/ig, "");
                            cur_emo = cur_emo.replaceAll(/\´/ig, "");
                        }
                    } break;
            }
        } this._index = 0;
    };

    // Save event positions
    Game_Map.prototype.saveTaggedEventPositions = function () {

        if (!$gameSystem) return; // Wtf?!?! + ensure that we have proper array...
        if (!$gameSystem._savedEventPositions) $gameSystem._savedEventPositions = [];

        $gameMap.events().forEach(ev => {
            if (!ev._savePosition) return;
            const itm = $gameSystem._savedEventPositions.find(sp => {
                return sp[0] == this._mapId && sp[1] == this._eventId;
            }); if (itm) { // Update event coordinates + floor level
                itm._x = ev._x; itm._y = ev._y;
                itm._higherLevel = ev._higherLevel;
            } else { // Add event coordinates + floor level
                $gameSystem._savedEventPositions.push([this._mapId, ev._eventId, ev._x, ev._y, ev._higherLevel]);
            }
        });

    };

    // Load event positions
    Game_Map.prototype.loadTaggedEventPositions = function () {

        if (!$gameSystem) return; // Wtf?!?! + ensure that we have proper array...
        if (!$gameSystem._savedEventPositions) $gameSystem._savedEventPositions = [];

        $gameSystem._savedEventPositions.filter(sp => {
            return sp[0] == this._mapId;
        }).forEach(sp => {
            const ev = this.getEventById(sp[1]);
            if (ev) {
                ev.locate(sp[2] | 0, sp[3] | 0);
                ev._higherLevel = sp[4];
            }
        });

    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (!Imported.OcRam_Movement) { // Already declared in OcRam_Movement.js

        const _specialAliases = [
            Game_Map.prototype.autotileType,
            Game_Map.prototype.checkLayeredTilesFlags,
            Game_Map.prototype.eventIdXy,
            Game_Map.prototype.eventsXy,
            Game_Map.prototype.eventsXyNt,
            Game_Map.prototype.regionId,
            Game_Map.prototype.terrainTag,
            Game_Map.prototype.tileEventsXy,
            Game_Player.prototype.startMapEvent,
            Game_Vehicle.prototype.isLandOk
        ]; // Only parameters are manipulated... We need integers NOT floats...

        Game_Map.prototype.autotileType = function (x, y) {
            return _specialAliases[0].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.checkLayeredTilesFlags = function (x, y, bit) {
            return _specialAliases[1].call(this, Math.round(x), Math.round(y), bit);
        }; Game_Map.prototype.eventIdXy = function (x, y) {
            return _specialAliases[2].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.eventsXy = function (x, y) {
            return _specialAliases[3].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.eventsXyNt = function (x, y) {
            return _specialAliases[4].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.regionId = function (x, y) {
            return _specialAliases[5].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.terrainTag = function (x, y) {
            return _specialAliases[6].call(this, Math.round(x), Math.round(y));
        }; Game_Map.prototype.tileEventsXy = function (x, y) {
            return _specialAliases[7].call(this, Math.round(x), Math.round(y));
        }; Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
            return _specialAliases[8].call(this, Math.round(x), Math.round(y), triggers, normal);
        }; Game_Vehicle.prototype.isLandOk = function (x, y, d) {
            return _specialAliases[9].call(this, Math.round(x), Math.round(y), d);
        };

    }

    if (_useParallelsFeature) {

        // For parallels feature
        this.extend(Game_Variables, "setValue", function (variableId, value) {
            _parallelVariableEvents.forEach(ev => {
                if (ev.parallel_variables.indexOf(variableId) > -1) ev.setupParallel_OC();
            }); _this["Game_Variables_setValue"].apply(this, arguments);
        });

        // For parallels feature
        this.extend(Game_Switches, "setValue", function (switchId, value) {
            _parallelSwitchEvents.forEach(ev => {
                if (ev.parallel_switches.indexOf(switchId) > -1) ev.setupParallel_OC();
            }); _this["Game_Switches_setValue"].apply(this, arguments);
        });

        // For parallels feature
        this.extend(Game_Event, "updateParallel", function () {
            if (this._interpreter) {
                if (this._run_once) { // Run only once per scene start (including after menu / battle etc...)
                    _this["Game_Event_updateParallel"].apply(this, arguments);
                    this._interpreter = null;
                } else { // Run normally
                    _this["Game_Event_updateParallel"].apply(this, arguments);
                }
            }
        });

    }

    // Prevent fast forward on push & pull mechanics!
    this.extend(Scene_Map, "isFastForward", function () {
        if (!_fastForward) return false;
        return _this["Scene_Map_isFastForward"].apply(this, arguments);
    });

    // Preload lift, pull & push character sheets!
    const preLoadPPL = (ev, type, rec_counter) => {

        const pc = OcRam.playerCharacter(); if (!pc) {
            setTimeout(() => {
                if ((rec_counter | 0) < 10) preLoadPPL(ev, type, (rec_counter | 0) + 1);
            }, 200); return;
        } const pn = pc._characterName; if (!pn || pn == '') {
            setTimeout(() => {
                if ((rec_counter | 0) < 10) preLoadPPL(ev, type, (rec_counter | 0) + 1);
            }, 200); return;
        }

        if (type == 4) { // Lift
            if (_defaultLiftEmo && !ev._eventLiftEmo) ev._eventLiftEmo = _defaultLiftEmo;
            try {
                if (ev._eventLiftEmo) ImageManager.loadCharacter(pn + "_" + ev._eventLiftEmo);
            } catch (e) { } waitForBitmap("img/characters/" + pn + "_" + ev._eventLiftEmo + ".png");
        } else if (type == 1) { // Pull & Push
            if (_defaultPushEmo && !ev._pushMoveEmo) ev._pushMoveEmo = _defaultPushEmo;
            try {
                if (ev._pushMoveEmo) ImageManager.loadCharacter(pn + "_" + ev._pushMoveEmo);
            } catch (e) { } waitForBitmap("img/characters/" + pn + "_" + ev._pushMoveEmo + ".png");
            if (_defaultPullEmo && !ev._pullMoveEmo) ev._pullMoveEmo = _defaultPullEmo;
            try {
                if (ev._pullMoveEmo) ImageManager.loadCharacter(pn + "_" + ev._pullMoveEmo);
            } catch (e) { } waitForBitmap("img/characters/" + pn + "_" + ev._pullMoveEmo + ".png");
        } else if (type == 2) { // Push only
            if (_defaultPushEmo && !ev._pushMoveEmo) ev._pushMoveEmo = _defaultPushEmo;
            try {
                if (ev._pushMoveEmo) ImageManager.loadCharacter(pn + "_" + ev._pushMoveEmo);
            } catch (e) { } waitForBitmap("img/characters/" + pn + "_" + ev._pushMoveEmo + ".png");
        } else if (type == 3) { // Pull only
            if (_defaultPullEmo && !ev._pullMoveEmo) ev._pullMoveEmo = _defaultPullEmo;
            try {
                if (ev._pullMoveEmo) ImageManager.loadCharacter(pn + "_" + ev._pullMoveEmo);
            } catch (e) { } waitForBitmap("img/characters/" + pn + "_" + ev._pullMoveEmo + ".png");
        }

    };

    // Get comments!
    this.extend(Game_Event, "setupPage", function () {

        _this["Game_Event_setupPage"].apply(this, arguments);

        // Clear lift, pull & push systems are found for this event!
        _liftPullPushEvents = _liftPullPushEvents.filter(itm => itm._eventId != this._eventId);

        this._allowPull = null; this._allowPush = null;

        // Then setup NEW lift, push & pull systems (if found)!
        let cmts = this.getComments();

        this.scrolledX = _oldScrollX;
        this.scrolledY = _oldScrollY;
        this._fixedToParallax = false;

        if (cmts && cmts.length > 0) {
            cmts.forEach(c => {
                if (("" + c.parameters[0]) == "<push&pull>") {
                    this._allowPull = true; this._allowPush = true;
                    this._savePosition = true; preLoadPPL(this, 1);
                    _liftPullPushEvents.push(this);
                    _jsonPullPushSystem.forEach(cmd => {
                        this.page().list.push(cmd);
                    });
                } else if (("" + c.parameters[0]) == "<push>") {
                    this._allowPull = false; this._allowPush = true;
                    this._savePosition = true; preLoadPPL(this, 2);
                    _liftPullPushEvents.push(this);
                    _jsonPullPushSystem.forEach(cmd => {
                        this.page().list.push(cmd);
                    });
                } else if (("" + c.parameters[0]) == "<pull>") {
                    this._allowPull = true; this._allowPush = false;
                    this._savePosition = true; preLoadPPL(this, 3);
                    _liftPullPushEvents.push(this);
                    _jsonPullPushSystem.forEach(cmd => {
                        this.page().list.push(cmd);
                    });
                } else if (("" + c.parameters[0]).left(5) == "<lift") {
                    const params = (c.parameters[0].getOpenTags("lift") + ":::").split(":");
                    this._savePosition = true; preLoadPPL(this, 4);
                    this._throwDistance = Number(params[0]);
                    this._landedSelfSwitch = params[1] || "A";
                    this._landedSelfSwitch2 = params[2] || this._landedSelfSwitch;
                    _liftPullPushEvents.push(this);
                    this.regionId = function () {
                        return $gameMap.regionId(this._x | 0, this._y | 0);
                    }; _jsonLiftThrowSystem.forEach(cmd => {
                        this.page().list.push(cmd);
                    });
                } else if (("" + c.parameters[0]) == "<when_landed>") {
                    const cid = c.commandIndex + 1;
                    const list = this.page().list;
                    const arr_tmp = [];
                    for (let i = cid; i < list.length; i++) {
                        if (list[i].code == 108 && ("" + list[i].parameters[0]).left(5) == "<lift") {
                            _liftPullPushEvents.push(this); break;
                        } else {
                            arr_tmp.push({ ...list[i] });
                            list[i] = { ...c };
                        }
                    } this._whenLandedList = arr_tmp;
                    if (this._isJustLanded) {
                        if ($gameMap && $gameMap._interpreter) {
                            $gameMap._interpreter.setup(this._whenLandedList, this._eventId);
                        } this._isJustLanded = false;
                    }
                } else if (c.parameters[0] && c.parameters[0] == "<parallax>") {
                    if (isLoopped() || isParallaxScrolled()) {
                        console.warn("Loopping maps and scrolling parallaxes are not currently supported!");
                    } else {
                        this._fixedToParallax = true;
                        this.scrolledX = function () {
                            return $gameMap.adjustParallaxX(this._realX);
                        }; this.scrolledY = function () {
                            return $gameMap.adjustParallaxY(this._realY);
                        };
                    }
                }
            });
        }

    });


    this.extend(Game_Player, "canMove", function () {
        if (_stairedCharacter) return false;
        return _this["Game_Player_canMove"].apply(this, arguments);
    });

    if (!Game_Follower.prototype.canMove) { // For local co-op compatibility
        this.extend(Game_Follower, "canMove", function () {
            if (_stairedCharacter) return false;
            if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
                return false;
            }
            if (this.isMoveRouteForcing() || $gamePlayer.areFollowersGathering()) {
                return false;
            }
            if (this._vehicleGettingOn || this._vehicleGettingOff) {
                return false;
            }
            if ($gamePlayer.isInVehicle() && !$gamePlayer.vehicle().canMove()) {
                return false;
            }
            return true;
        });
    }

    // Walk stairs feature
    this.extend(Sprite_Character, "updateCharacterFrame", function () {
        if (this._character._depth) {
            const pw = this.patternWidth();
            const ph = this.patternHeight();
            const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
            const sy = (this.characterBlockY() + this.characterPatternY()) * ph;
            this.updateHalfBodySprites();
            this.setFrame(sx, sy, pw, ph - this._character._depth);
        } else {
            _this["Sprite_Character_updateCharacterFrame"].apply(this, arguments);
        }
    });

    // Update player
    this.extend(Game_Player, "update", function () {
        _this["Game_Player_update"].apply(this, arguments); this.updateLifted();
    });

    // DO NOT CALL MENU IF PLAYER HAS LIFTED SOMETHING!
    this.extend(Scene_Map, "callMenu", function () {
        if (OcRam.Local_Coop.anyLiftedEvents()) {
            this.menuCalling = false; return false;
        } _this["Scene_Map_callMenu"].apply(this, arguments);
    });

    // Refresh emotions!
    this.extend(Game_Player, "performTransfer", function () {
        if (this.isTransferring()) {
            if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
                _liftPullPushEvents = []; // Clear lift, pull & push systems
            }
        } _this["Game_Player_performTransfer"].apply(this, arguments);
        requestAnimationFrame(() => {
            const a = this.getActor();
            if (a) this.setEMotion(a._currentEMotion);
            OcRam.followers().forEach(f => {
                f.setEMotion(f.getActor()._currentEMotion);
            });
        });
    });

    // Save TAGGED event positions on transfer (it doesn't matter if it's same map) & Drop any objects when transfering...
    this.extend(Game_Player, "reserveTransfer", function (mapId, x, y, d, fadeType) {
        //$gamePlayer.drop(true); OcRam.followers().forEach(f => { f.drop(true); });
        if ($gameMap) $gameMap.saveTaggedEventPositions();
        _this["Game_Player_reserveTransfer"].apply(this, arguments);
    });

    // Drop any objects when entering vehicle...
    this.extend(Game_Player, "updateVehicle", function () {
        _this["Game_Player_updateVehicle"].apply(this, arguments);
        if (this._vehicleGettingOn) {
            $gamePlayer.drop(true); OcRam.followers().forEach(f => { f.drop(true); });
        }
    });

    // Initialize event bases!
    this.extend(Scene_Boot, "onDatabaseLoaded", function () {
        initEventBases(); _this["Scene_Boot_onDatabaseLoaded"].apply(this, arguments);
    });

    // Search for events that must be copied
    this.extend(Game_Event, "initialize", function (mapId, eventId, base) {
        if (base) { // THIS IS SPAWNED EVENT!
            this._eventBase = base; // Overwrite event() -method
            this.event = function () {
                return this._eventBase;
            };
        } _this["Game_Event_initialize"].apply(this, arguments);
        this._originalCharacterName = (this._characterName);
        if (_lastSpawnedId < this._eventId + 1) _lastSpawnedId = this._eventId + 1;
        if (this._eventBase) return; const note = this.event().meta;
        if (note && note.event_base) this.copyEvent(note.event_base);
        if (note.save_position) this._savePosition = true;
    });

    // Reset "prevent auto fill" flag for this event
    this.extend(Game_Event, "unlock", function () {
        _this["Game_Event_unlock"].apply(this, arguments);
        _preventAutoFillThisEvent = false;
    });

    // Preload "EMotions" + eval JS before list
    this.extend(Game_Interpreter, "setup", function () {
        _this["Game_Interpreter_setup"].apply(this, arguments);
        this.loadEMotionImages();
        const ev = this.event();
        if (ev && ev._jsBeforeBase) {
            try { eval(ev._jsBeforeBase); } catch (e) { }
        }
    });

    // Eval JS after event base
    this.extend(Game_Interpreter, "terminate", function () {
        const ev = this.event();
        if (ev && ev._jsAfterBase) {
            try { eval(ev._jsAfterBase); } catch (e) { }
        } _this["Game_Interpreter_terminate"].apply(this, arguments);
    });

    // Autofill name/face based on this event or name with \P[n] + \N[n] (with emotions!)
    this.extend(Game_Interpreter, "command101", function (params) {

        const ev = !$gameMap ? null : $gameMap.getEventById(this._eventId);

        if (!OcRam.isMZ()) { // In MV "simulate" speaker name via <speaker>NameOfTheSpeaker</speaker> tag in text field
            $gameMessage.setSpeakerName(''); let speaker_name = "";
            if (this.nextEventCode() === 401) {
                const nxt_cmd = this._list[this._index + 1];
                let txt = nxt_cmd.parameters[0];
                speaker_name = (txt + '').getClosedTags("speaker")[0] || '';
                if (speaker_name) {
                    if (!$gameMessage.isBusy()) {
                        nxt_cmd.parameters[0] = (txt + '').replaceAll(/\<speaker\>.*?\<\/speaker\>/gi, "");
                        requestAnimationFrame(() => { nxt_cmd.parameters[0] = txt; });
                    }
                } else {
                    speaker_name = (ev && !ev.isObjectCharacter()) ? ev.event().name || '' : '';
                }
            } else {
                speaker_name = (ev && !ev.isObjectCharacter()) ? ev.event().name || '' : '';
            } params[4] = speaker_name;
            $gameMessage.setSpeakerName(speaker_name || '');
        }

        const old_values = [params[0], params[1], params[4]];

        if (!_forcedAutoFill) {
            if (params[2] == 1 && !_autoDimMessages) { // Check if dim messages are ignored?
                return _this["Game_Interpreter_command101"].apply(this, arguments);
            } if (params[2] == 2 && !_autoTransparentMessages) { // Check if transparent messages are ignored?
                return _this["Game_Interpreter_command101"].apply(this, arguments);
            } if (_preventAutoFillNextMessage || _preventAutoFillThisEvent || _preventAutoFillForNow) {
                _preventAutoFillNextMessage = false; // NO AUTOFILL THIS TIME!
                return _this["Game_Interpreter_command101"].apply(this, arguments);
            }
        }

        // 0 = face "Actor1", 1 = face index, 2 = window / dim, 3 = top / bottom, 4 = name
        const n2l = (params[4] + '').left(3);
        if (n2l == "\\P\[" && ((params[0] + '') == '')) {
            // Party member index =======================================================
            command101_ActorFace(true, params, this.nextEventCode());
            return _this["Game_Interpreter_command101"].apply(this, arguments);
        } else if (n2l == "\\N\[" && (params[0] + '') == '') { // Actor index
            // Actor index ==============================================================
            command101_ActorFace(false, params, this.nextEventCode());
            return _this["Game_Interpreter_command101"].apply(this, arguments);
        } else { // TRY TO GET FACE AND NAME BASED ON THIS EVENT! =======================

            // Auto fill "object characters"?
            if (!_forcedAutoFill && ev && ev.isObjectCharacter() && !_autoEmotionObjects) {
                return _this["Game_Interpreter_command101"].apply(this, arguments);
            }

            // No event! Called in battle or other scene that has no map?
            if (!$gameMap || !$dataMap || !ev) return _this["Game_Interpreter_command101"].apply(this, arguments);
            if (params[4] == "" || params[4] === undefined) params[4] = ev.event().name; // No name??
            requestAnimationFrame(() => { params[4] = old_values[2]; });

            if (params[0] != "") return _this["Game_Interpreter_command101"].apply(this, arguments); // If has face already just do normal stuff
            const cn = ev._originalCharacterName || ev._characterName || "";
            if (cn == "") return _this["Game_Interpreter_command101"].apply(this, arguments); // Event charsheet is empty...

            //No face??
            const em = ev._currentEMotion || "";
            const face_name = (em != "") ? cn + "_" + em : cn;
            const url = "img/faces/" + face_name + ".png";
            const bitmap = ImageManager._cache[url];

            if (bitmap && !bitmap.isError()) {
                params[0] = face_name; params[1] = ev._characterIndex;
                _this.debug("SUCCES... face_name " + face_name);
                requestAnimationFrame(() => { params[0] = old_values[0]; params[1] = old_values[1]; });
                return _this["Game_Interpreter_command101"].apply(this, arguments);
            } else {
                if (cn == face_name) { // "Emotion" face is same as default face >> Auto FAIL!
                    _this.debug("Not found! face_name " + face_name);
                    return _this["Game_Interpreter_command101"].apply(this, arguments);
                } else {
                    if (ImageManager._cache["img/faces/" + cn + ".png"]) { // Is there even DEFAULT FACE?!?!?
                        params[0] = cn; params[1] = ev._characterIndex;
                        _this.debug("SUCCES... after 1 fail... face_name " + cn);
                        requestAnimationFrame(() => { params[0] = old_values[0]; params[1] = old_values[1]; });
                        return _this["Game_Interpreter_command101"].apply(this, arguments);
                    } else { // TOTAL FAILURE!!!
                        console.warn("You should probably check event: " + ev.event().name + " trying to load face: " + face_name);
                        return _this["Game_Interpreter_command101"].apply(this, arguments);
                    }
                }
            }

        }

    });

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    if (VisuMZ.EventsMoveCore) { // Temporary "fix?" for OcRam spawn and VisuMZ_EventsMoveCore
        Game_Map.prototype.events = function () {
            return this._events.filter(event => !!event);
        };
    }

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => {
        _parallelVariableEvents = [];
        _parallelSwitchEvents = [];
        _spawnedEvents = [];
        _liftPullPushEvents = [];
        $gamePlayer._liftedEvent = null;
    }; this.loadPluginData = gs => {
        _spawnedEvents = gs._spawnedEvents;
        if ($gameMap) {
            if (gs._liftedEventId) {
                const ev = $gameMap.getEventById(gs._liftedEventId);
                if (ev) {
                    ev._eventMoveSpeed = gs._liftedEventMoveSpeed;
                    ev._moveSpeed = gs._liftedEventMoveSpeed;
                }
            } _liftPullPushEvents = [];
            gs._liftPullPushEvents.forEach(eid => {
                _liftPullPushEvents.push($gameMap.getEventById(eid));
            }); _liftPullPushEvents.forEach(ev => { if (!ev._eventBase) ev._pageIndex = -2; });
        } if (gs._actorEMotions) {
            let i = 0;
            $gameActors._data.forEach(a => {
                if (a) {
                    const c = a.getCharacter();
                    if (c) c.setEMotion(gs._actorEMotions[i] || ""); i++;
                }
            });
        } if ($gameMap) {
            $gameMap.events().forEach(ev => {
                if (ev && ev._currentEMotion) {
                    ev.setEMotion(ev._currentEMotion);
                }
            });
        }
    }; this.savePluginData = gs => {
        if ($gameMap) $gameMap.saveTaggedEventPositions();
        gs._spawnedEvents = []; gs._liftPullPushEvents = [];
        _liftPullPushEvents.forEach(ev => {
            gs._liftPullPushEvents.push(ev._eventId);
        }); _spawnedEvents.forEach(se => {
            gs._spawnedEvents.push({ ...se });
        }); gs._actorEMotions = [];
        $gameActors._data.forEach(a => {
            if (a) gs._actorEMotions.push(a._currentEMotion);
        });
    }; this.onMapStart = sm => {

        if (OcRam._justTransfered) { // Re-init lift, pull & push systems!
            $allPlayers.forEach(p => {
                if (p && p._liftedEvent) {
                    p._liftedEvent._linkedPlayer = null;
                    p._liftedEvent = null;
                }
            });
        } else {
            _liftPullPushEvents.forEach(ev => {
                if (!ev._eventBase) { ev._pageIndex = -2; ev.refresh(); }
            });
        }

        if (_useParallelsFeature) { // If parallel
            _parallelVariableEvents = []; _parallelSwitchEvents = []; let arr = [];
            $gameMap.events().forEach(ev => {
                if (ev._eventBase) {
                    ev.event = function () {
                        return this._eventBase;
                    };
                } if (ev._trigger === 4) { // Get parallel events
                    ev._run_once = false;
                    ev.getStringComments().forEach(cmt => {
                        if (cmt == "<run:once>") {
                            _this.debug("<run:once> tag found!");
                            ev.setupParallel_OC();
                        } else if (cmt.substring(0, 11) == "<run:onvar:") {
                            arr = (":" + cmt.replace(">", "")).split(":");
                            ev.parallel_variables = eval("[" + arr[arr.length - 1] + "]");
                            _this.debug("<run:onvar> tag found!", ev.parallel_variables);
                            _parallelVariableEvents.push(ev);
                            ev.setupParallel_OC();
                        } else if (cmt.substring(0, 14) == "<run:onswitch:") {
                            arr = (":" + cmt.replace(">", "")).split(":");
                            ev.parallel_switches = eval("[" + arr[arr.length - 1] + "]");
                            _this.debug("<run:onswitch> tag found!", ev.parallel_switches);
                            _parallelSwitchEvents.push(ev);
                            ev.setupParallel_OC();
                        }
                    });
                }
            });
        } else { // No parallels in use... still need to loop events.
            $gameMap.events().forEach(ev => {
                if (ev._eventBase) {
                    ev.event = function () {
                        return this._eventBase;
                    };
                }
            });
        } // Get spawned events!
        _spawnedEvents.forEach(ev => {
            this._events[ev._eventId] = ev;
            ev._eventBase = OcRam.deepCopy(ev._eventBase);
            if (SceneManager._scene) {
                const scene_map = SceneManager._scene._spriteset;
                if (scene_map) {
                    const ns = new Sprite_Character(ev);
                    scene_map._characterSprites.push(ns);
                    scene_map._tilemap.addChild(ns);
                }
            } ev._pageIndex = -2; ev.refresh();
        });

    }; this.onMapTerminate = sm => {
        const ev = $gamePlayer._liftedEvent;
        if (ev) { $gamePlayer.drop(true); ev.locate($gamePlayer._x, $gamePlayer._y); }
        OcRam.followers().forEach(f => {
            const fev = f._liftedEvent; if (fev) { f.drop(true); fev.locate(f._x, f._y); }
        });
    }; this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => {
        if ($gameMap && !OcRam._menuCalled && OcRam._justTransfered) $gameMap.loadTaggedEventPositions();
    };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "copyEvent", function (args) {
        _this.debug("Plugin command: copyEvent", args);
        if (args.baseName != '') {
            if ($gameMap) $gameMap.copyEvent(Number(args.eventId), args.baseName);
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "spawnEvent", function (args) {
        _this.debug("Plugin command: spawnEvent", args);
        let loc = args.location;
        try {
            loc = eval(loc);
        } catch (e) { }
        if (args.baseName != '') {
            if ($gameMap) $gameMap.spawnEvent(args.baseName, loc);
        }
    });

}.bind(OcRam.Events)());