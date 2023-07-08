//------------------------------------------------------------------------------
// OcRam plugins - OcRam_Followers.js
//==============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Followers", "1.09");

/*:
 * @target MZ
 * @plugindesc v1.09 Toggle actors with hotkey(s) + apply move route, balloons, animations to followers and much more!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderBefore OcRam_Lights
 * @orderBefore OcRam_Passages
 * @orderBefore OcRam_Local_Coop
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * 
 * @command followersFollow
 * @text Followers follow
 * @desc Set followers follow flag.
 *
 * @arg followersFollow
 * @type boolean
 * @default true
 * @text Follow
 * @desc true = Followers will follow player. false = followers will stay still.
 *
 * @command allowToggle
 * @text Allow toggle
 * @desc Enable / Disable actor toggling.
 *
 * @arg allowToggle
 * @type boolean
 * @default true
 * @text Allow toggle
 * @desc true = Allow actor toggling. false = Disable actor toggling.
 *
 * @command maxBattleMembers
 * @text Max battle members
 * @desc Set maximum number of battle members
 *
 * @arg maxBattleMembers
 * @type number
 * @min 1
 * @max 12
 * @default 4
 * @text Max members
 * @desc Maximum number of battle members.
 *
 * @command saveFormation
 * @text Save current formation
 * @desc Saves current formation for "Restore formation" command.
 *
 * @command restoreFormation
 * @text Restore saved formation
 * @desc Restores saved formation.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Actor toggling
 * @type boolean
 * @desc Allow actor toggling (default - can be changed via plugin command or JS)?
 * @default true
 *
 * @param Focus blink time
 * @parent Actor toggling
 * @type number
 * @desc Time in milliseconds for blinking when actor gains focus.
 * @min 0
 * @max 9999
 * @default 374
 *
 * @param Focus blink opacity
 * @parent Actor toggling
 * @type number
 * @desc Opacity for blinking when actor gets focus.
 * @min 0
 * @max 255
 * @default 128
 *
 * @param Toggle SE
 * @parent Actor toggling
 * @type file
 * @dir audio/se
 * @desc This SE will be played to indicate actor toggle.
 * @default Cursor3
 *
 * @param Max battle members
 * @desc Initial maximum number of battle members.
 * Example 4 = 1 player + 3 followers
 * @type number
 * @min 1
 * @max 12
 * @default 4
 *
 * @param Dead followers are
 * @type select
 * @option Default aka. "Zombies"
 * @value 0
 * @option Ghosts
 * @value 1
 * @option Gone/Hidden
 * @value 2
 * @desc "Gone/Hidden" = Please ensure that required members are alive in your actor toggling puzzles!
 * @default 0
 *
 * @param Ghosts in battle
 * @type boolean
 * @desc Are followers ghosts at START of battle... or just corpses? (applies only if Ghost/Gone/Hidden mode is 'on')
 * @default true
 * 
 * @param Ghosts interact
 * @type boolean
 * @desc Can ghosts interact with events?
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
 * Features of this plugin:
 *      - Dead followers handling (default aka. "zombie", ghost or gone/hidden)
 *      - Actor toggling (battle members) with designated hotkey(s).
 *      - Enable or disable followers follow (QoL for cutscenes)!
 *      - Commands to (re)locate followers!
 *      - Apply move routes, balloons and animations to any follower!
 *      - Know the actor who started the event!
 *      - Automated party member face images via "Name" box! (\P[n] & \N[n])
 *      - Assign/override party formations + Save/restore formation
 *      - Change maximum number of battle members
 *      - Lost Vikings style puzzles (where you need to toggle characters)
 *      - Extendable even more with OcRam_Local_Coop (toggle player)!
 *
 * More about dead followers:
 *      "Default" has zero impact on core functionality.
 *      "Ghosts" has some aliases made and partial override on face draw.
 *      "Gone/Hidden" has most impact on core functionality AND 
 *                    dead followers are no longer playable until revived.
 *                    (meaning you can't have dead character as a player,
 *                    without local-coop)
 *
 * If "Ghosts" or "Gone/Hidden" mode is used and battlers are dead they are
 * always GHOSTS when battle starts (they just observe - until revived).
 * After battle has started "dead" motion is played normally in all cases.
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * MV example: OcRam_Followers/allowToggle true
 * allowToggle         Allow actor togling?
 * >> allowToggle      true = Allow toggling, false = Don't allow toggling
 * 
 * MV example: OcRam_Followers/followersFollow true
 * followersFollow     Do followers follow or stand still?
 * >> followersFollow  true = Followers follow, false = Followers stands still
 * 
 * MV example: OcRam_Followers/maxBattleMembers 4
 * maxBattleMembers    Set new maximum to battle members
 * >> maxBattleMembers Accepted values 1-12
 * 
 * MV example: OcRam_Followers/saveFormation
 * saveFormation       Will save current game party formation
 * 
 * MV example: OcRam_Followers/restoreFormation
 * restoreFormation    Will restore saved game party formation
 *
 * ----------------------------------------------------------------------------
 * Script commands and objects
 * ============================================================================
 * $gameMap.currentActorId()        Get actorId who initiated event.
 * $gameMap.focusToNextActor()      Focus camera to next party member
 * $gameMap.focusToPreviousActor()  Focus camera to previous party member
 *
 * OcRam.Followers.saveFormation()          Save current formation
 * OcRam.Followers.restoreFormation()       Restore saved formation
 * OcRam.Followers.follow(v)                Return/Set followers follow flag
 * OcRam.Followers.allowToggling(v)         Return/Enable or disable toggling
 * OcRam.Followers.locate(index, x, y)      Relocate player/follower
 * OcRam.Followers.lockFormation(bool)      Locks/Unlocks current formation
 * OcRam.Followers.clipMembers()            Reform party from current 
 *                                          battle members
 *
 * OcRam.Followers.assignActors(actor_ids)  Actor ids as [] array!
 *    NOTE: Will add actor if it's not in party! This method won't
 *          remove any actors (unlike reformParty -method)!
 *
 * OcRam.Followers.reformParty(actor_ids)   Reform party (param as [] array!)
 *    NOTE: Formation and game party is totally overwritten with new actors!
 *    Example: after reformParty([1,2]) you will have only 2 actors!
 *
 * Game_Interpreter.applyTo(index)  Apply move route/balloon/anim to char X
 *    Example: this.applyTo(1); // 1st follower will now act as "Game player"
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
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/10/25 v1.00 - Initial release
 * 2020/10/28 v1.01 - New JS call OcRam.Followers.clipMembers
 *                    New JS call OcRam.Followers.lockFormation
 *                    Fixed some bugs on save/load/game over/to title commands
 *                    New plugin parameter Toggle SE!
 * 2021/03/07 v1.02 - Game_Interpreter.applyTo now resets target char properly!
 *                    If followers follow is disabled so is "Gather" command!
 *                    Max battle members UBOUND lowered to 12 from 99
 *                    Uses internal "actor autofill speaker data" feature ONLY
 *                    if OcRam_Events -plugin is not found.
 *                    Game_Party is now properly saved and loaded!
 * 2021/04/02 v1.03 - Game_Event.touchedByActor moved to OcRam_Core
 *                    Fixed bug on load when followers follow: OFF didn't
 *                    load followers xy pos correctly!
 * 2021/06/04 v1.04 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Compatibility patch for OcRam_Local_Coop!
 *                    Won't toggle charactes, if any event is interacted!
 * 2021/10/21 v1.05 - Plugin meta data (order/base) is now editor compatible!
 * 2021/12/01 v1.06 - Toggle actors > Character emotions works now as intended.
 * 2022/04/22 v1.07 - NEW plugin parameter "Dead followers are"!
 *                    NEW plugin parameter "Ghosts interact"
 *                    Compatibility fix for OcRam_Battle_Core v1.3
 *                    In Local_Coop: If dead followers are "Gone/Hidden" all 
 *                    PLAYERS who are dead - will be forced to ghosts.
 * 2022/07/10 v1.08 - Fixed undefined 'faceName' bug when reviving in "not
 *                    full party" (Credits TrueDekay)
 *                    _applyToChar of undefined bug fixed when showing balloon
 *                    icon for player in CE (Credits Equinox-ThiefofHearts)
 *                    Also fixed "Set Movement Route" + "Show Animation" in CE
 * 2022/11/11 v1.09 - Toggle cooldown no longer needed...
 *                    KB toggle actors now handled via default buttons 'pageup'
 *                    and 'pagedown' which can be remapped with OcRam_Input_EX
 *                    OcRam.Followers.isFollowing() // faster than .follows()
 *
 * ----------------------------------------------------------------------------
 * RMMZ CORE function overrides (destructive) are listed here
 * ============================================================================
 * Game_Party.prototype.maxBattleMembers
 * Game_Follower.prototype.isVisible // If "Dead followers are" > 0
 */

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _showDeadFollowersType = Number(this.parameters['Dead followers are'] || 0);
    const _battleGhosts = OcRam.getBoolean(this.parameters['Ghosts in battle']);
    const _ghostsInteract = OcRam.getBoolean(this.parameters['Ghosts interact']);
    const _blinkOpacity = Number(this.parameters['Focus blink opacity']) || 128;
    const _blinkTime = Number(this.parameters['Focus blink time']) || 374;
    const _toggleSE = String(this.parameters['Toggle SE']);
    let _allowTogling = OcRam.getBoolean(this.parameters['Actor toggling']);
    let _maxBattleMembers = Number(this.parameters['Max battle members']);

    let _lockFormation = false;
    let _followersFollow = true; //let _blinkHandle = null;
    let _oldParty = null; let _oldMaxMembers = null;
    let _playerOpacity = 255;
    let _thisBlinkOpacity = _blinkOpacity;

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const refreshParty = () => {
        if ($gamePlayer && $gamePlayer.followers()) {
            $gamePlayer.refresh();
            $gamePlayer.update();
            $gamePlayer.followers().refresh();
            $gamePlayer.followers().update();
        }
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================

    // Kind of overload to character.locate(...)
    this.locate = (index, x, y, d) => {
        if (index == 0) {
            $gamePlayer.locate(x, y);
            $gamePlayer.setDirection(d);
        } else {
            if (index < OcRam.followers().length + 1) {
                const character = OcRam.followers()[index - 1];
                character.locate(x, y);
                character.setDirection(d);
            }
        }
    };

    // Followers follow? For scene and/or "Lost Vikings" style dungeons...
    this.follow = v => {
        if (v === undefined) return _followersFollow;
        _followersFollow = v;
        return _followersFollow;
    };

    // Slightly more faster...
    this.isFollowing = () => _followersFollow;

    // Allow actor toggling?
    this.allowToggling = v => {
        if (v === undefined) return _allowTogling;
        _allowTogling = v;
        return _allowTogling;
    };

    // Get/Set maximum battle members
    this.maxBattleMembers = v => {
        if (v === undefined) return _maxBattleMembers;
        _maxBattleMembers = v; refreshParty();
        return _maxBattleMembers;
    };

    // Force PARTY to be same as battle members! (clips non-battle members away)
    this.clipMembers = () => {
        let ida = [];
        $gameParty.battleMembers().forEach(actr => {
            ida.push(actr.actorId());
        }); this.reformParty(ida);
    };

    // Lock current formation
    this.lockFormation = v => {
        if (v === undefined) return _lockFormation;
        _lockFormation = OcRam.getBoolean(v);
        return _lockFormation;
    };

    // Pass actor id ARRAY and boolean value if MAX battle members can be resized!
    // NOTE: This method will REMOVE/ADD actors based on given array!
    this.reformParty = (actor_ids, change_max) => {

        if (!Array.isArray(actor_ids)) {
            alert("OcRam." + this.name + ".reformParty(...actor ids must be an array!)");
        } if (actor_ids.length < 1) {
            alert("OcRam." + this.name + ".reformParty(...must have at least 1 valid actor id!)");
        } if (!actor_ids.find(i => {
            try {
                if ($dataActors[i]) return true;
            } catch (ex) { /* not valid */ }
        })) alert("OcRam." + this.name + ".reformParty(...must have at least 1 valid actor id!)");

        $gameParty._actors = actor_ids;
        if (change_max) this.maxBattleMembers(actor_ids.length);

        refreshParty();

    };

    // Will add actor if it's not in party! This method won't remove any actors(unlike reformParty - method)!
    this.assignActors = actor_ids => {

        if (!Array.isArray(actor_ids)) {
            alert("OcRam." + this.name + ".reformParty(...actor ids must be an array!)");
        } if (actor_ids.length < 1) {
            alert("OcRam." + this.name + ".reformParty(...must have at least 1 valid actor id!)");
        } if (!actor_ids.find(i => {
            try {
                if ($dataActors[i]) return true;
            } catch (ex) { /* not valid */ }
        })) alert("OcRam." + this.name + ".reformParty(...must have at least 1 valid actor id!)");

        let filtered = $gameParty._actors.filter(i => {
            if (!actor_ids.find(j => {
                if (i == j) return true;
            })) return true;
        });

        filtered.forEach(i => { actor_ids.push(i); });
        $gameParty._actors = actor_ids; refreshParty();

    };

    // Save current formation
    this.saveFormation = () => {
        _oldParty = $gameParty._actors;
        _oldMaxMembers = _maxBattleMembers;
    };

    // Restore current formation
    this.restoreFormation = () => {
        if (_oldParty) {
            if (_oldMaxMembers) _maxBattleMembers = _oldMaxMembers;
            $gameParty._actors = _oldParty;
            _oldParty = null; _oldMaxMembers = null;
            refreshParty();
        }
    };

    // Check if toggle cooldown is active, left here for backward compatibility...
    this.hasToggleCooldown = () => {
        return false;
    };

    this.ghostsEnabled = () => !!_showDeadFollowersType;

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Game_Player.prototype.actor = function () { // Get actor for game player
        return $gameParty.battleMembers()[0];
    };

    // Which character will be "$gamePlayer" on point of this event?
    Game_Interpreter.prototype.applyTo = function (index) {
        const ev = this.event();
        if (ev) {
            ev._applyToChar = null;
            if (index == 1) {
                ev._applyToChar = $gamePlayer;
            } else {
                if (index < OcRam.followers().length + 2) {
                    ev._applyToChar = OcRam.followers()[index - 2];
                }
            }
        }
    };

    // Blinks character
    Game_Character.prototype.doBlink_OC = function () {
        if (++this._blinkCount < 10) {
            _thisBlinkOpacity = this.actor().isDead() && _showDeadFollowersType == 1 ? _blinkOpacity * 0.5 : _blinkOpacity;
            this._blinkHandle = setTimeout(() => {
                if (this._blinkCount % 2) {
                    this._opacity = _thisBlinkOpacity;
                } else {
                    this._opacity = this._opacityBeforeBlink;
                } this.doBlink_OC();
            }, _blinkTime);
        } else {
            this._opacity = this._opacityBeforeBlink;
            this._blinkCount = 0;
        }
    };

    // Start blinking
    Game_Character.prototype.startToBlink_OC = function () {
        this._opacityBeforeBlink = this.actor().isDead() && _showDeadFollowersType == 1 ? 128 : _playerOpacity;
        if (this._blinkHandle) {
            this._opacity = this._opacityBeforeBlink;
            clearTimeout(this._blinkHandle);
        } this._blinkCount = 2; this.doBlink_OC();
    };

    // Focus camera to next actor
    Game_Map.prototype.focusToNextActor = function (input_from) {
        this.togglePlayer(false, input_from);
    };

    // Focus camera toprevious actor
    Game_Map.prototype.focusToPreviousActor = function (input_from) {
        this.togglePlayer(true, input_from);
    };

    // Toggles battle mambers!
    Game_Map.prototype.togglePlayer = function (invert) {

        if ($gamePlayer._liftedEvent) return;

        if ($gameParty.inBattle() || $gameMessage.isBusy() || _this._menuCalled || !_allowTogling) return;
        if ($gamePlayer._followers.visibleFollowers().length < 1) return;

        const this_se = { name: _toggleSE, volume: 90, pitch: 100, pan: 0, pos: 0 };
        AudioManager.playSe(this_se); $gameTemp.clearDestination();

        const follower_count = OcRam.followers().length;

        if (invert) {
            for (let i = follower_count - 1; i > -1; i--) {
                $gameParty.swapOrder_OC(i + 1, i);
            }
        } else {
            for (let i = 0; i < follower_count; i++) {
                $gameParty.swapOrder_OC(i, i + 1);
            }
        } $gamePlayer.startToBlink_OC();

    };

    // Swap characters on map
    Game_Party.prototype.swapOrder_OC = function (index1, index2) {
        const actor1 = index1 == 0 ? $gamePlayer : OcRam.followers()[index1 - 1];
        const actor2 = index2 == 0 ? $gamePlayer : OcRam.followers()[index2 - 1];
        const actor_tmp = { ...actor1 };
        if (!_followersFollow) {
            actor1.locate_OC(actor2._x, actor2._y, actor2._direction);
            actor2.locate_OC(actor_tmp._x, actor_tmp._y, actor_tmp._direction);
            requestAnimationFrame(() => {
                $gamePlayer.center($gamePlayer._x, $gamePlayer._y);
            });
        } $gameParty.swapOrder(index1, index2);
        if (Imported.OcRam_Events) {
            requestAnimationFrame(() => {
                const emo1 = actor1.getActor()._currentEMotion || "";
                const emo2 = actor2.getActor()._currentEMotion || "";
                actor1.setEMotion(emo1); actor2.setEMotion(emo2);
            });
        }
    };

    // Kind of overload to locate
    Game_Character.prototype.locate_OC = function (x, y, dir) {
        Game_Character.prototype.locate.call(this, x, y);
        this.setDirection(dir);
    };

    Window_Base.prototype.deadOpacity = function () {
        return 64;
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (_ghostsInteract && this.ghostsEnabled()) {
        this.extend(Game_Message, "setFaceImage", function (faceName, faceIndex) {
            const actor = $gameActors._data.find(a => {
                return a && (a._faceName == faceName && a._faceIndex == faceIndex);
            }); const s = OcRam.scene(); const w = s ? s._messageWindow : null;
            if (w) w.changePaintOpacity(true, false);
            if (actor && (faceName == actor._faceName && faceIndex == actor._faceIndex) && !actor._hp) {
                _this.debug("GHOSTED FACE for", actor);
                if (w) w.changePaintOpacity(false, true);
            } _this["Game_Message_setFaceImage"].apply(this, arguments);
        });
    }

    this.extend(Scene_Boot, "isReady", function () {
        let ret = _this["Scene_Boot_isReady"].apply(this, arguments);
        if (ret) { // Boot is ready and database is loaded...
            if (!Imported.OcRam_Local_Coop) { // Blinking "animation"
                if (_showDeadFollowersType == 1) { // GHOST FOLLOWERS!
                    _this.extend(Game_Follower, "update", function () { // Get orginal opacity if blinking
                        _this["Game_Follower_update"].apply(this, arguments);
                        if (!this._blinkHandle) {
                            this.setOpacity(_playerOpacity - (this.actor().isDead() ? 128 : 0));
                        } else {
                            this.setOpacity($gamePlayer._opacityBeforeBlink - (this.actor().isDead() ? 128 : 0));
                        }
                    });
                } else {
                    _this.extend(Game_Follower, "update", function () { // Get orginal opacity if blinking
                        _this["Game_Follower_update"].apply(this, arguments);
                        if (!this._blinkHandle) {
                            this.setOpacity($gamePlayer.opacity());
                        } else {
                            this.setOpacity($gamePlayer._opacityBeforeBlink);
                        }
                    });
                }
            }
        } return ret;
    });

    if (_showDeadFollowersType && !_ghostsInteract) { // GHOSTS CAN'T interact...
        this.extend(Game_Event, "start", function () {
            if (OcRam.playerCharacter().actor().isDead()) {
                this.unlock(); return;
            } _this["Game_Event_start"].apply(this, arguments);
        });
    }

    if (_battleGhosts && _showDeadFollowersType) {

        let battle_just_started = false;

        this.extend(Window_Base, "changePaintOpacity", function (enabled, ghost_face) {
            if (ghost_face) {
                this.contents.paintOpacity = this.deadOpacity(); return;
            } _this["Window_Base_changePaintOpacity"].apply(this, arguments);
        });

        this.extend(Scene_Battle, "start", function () {
            _this["Scene_Battle_start"].apply(this, arguments);
            battle_just_started = true;
            setTimeout(() => { battle_just_started = false; }, 1000);
        });

        this.extend(Sprite_Actor, "startMotion", function (motionType) {
            const actor = this._actor;
            const stateMotion = actor.stateMotionIndex();
            if (stateMotion === 3 && actor._ghosted) return;
            if (motionType == "dead") {
                if (battle_just_started) motionType = "walk";
                actor._ghosted = battle_just_started;
            } else {
                actor._ghosted = false;
            } _this["Sprite_Actor_startMotion"].call(this, motionType);
        });

        /*Window_BattleStatus.prototype.drawItemImage = function (index) {
            //console.log("Window_BattleStatus.prototype.drawItemImage", index)
            const actor = this.actor(index);
            const rect = this.faceRect(index);
            //this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
        };*/

        this.extend(Sprite_Actor, "setBattler", function (battler) {
            if (!battle_just_started) {
                _this["Sprite_Actor_setBattler"].apply(this, arguments); const actor = this._actor;
                if (!actor || actor._ghosted) this.opacity = !battler || battler.isDead() ? 128 : _playerOpacity;
                //if (OcRam.scene()._actorWindow && battler) OcRam.scene()._actorWindow.drawItem(battler._index || 0);
                return;
            }
            if (_showDeadFollowersType > 0) {
                if (!this._battler && battler) {
                    const a = battler.actor ? battler.actor() : battler.enemy();
                    a._ghosted = true; if (battler.initFlyingMeta) battler.initFlyingMeta();
                }
            } _this["Sprite_Actor_setBattler"].apply(this, arguments);
            this.opacity = !battler || battler.isDead() ? 128 : _playerOpacity;
        });

    }  

    // If followers don't follow controlled character is alone...
    this.extend(Game_Party, "battleMembers", function () {
        if (_followersFollow || !this.inBattle()) {
            return _this["Game_Party_battleMembers"].apply(this, arguments);
        } else {
            return [$gameParty.allMembers()[0]];
        }
    });

    // Do NOT gather if followers don't follow...
    this.extend(Game_Followers, "gather", function () {
        if (_followersFollow) _this["Game_Followers_gather"].apply(this, arguments);
    });

    // Reset temporary "$gamePlayer"
    this.extend(Game_Event, "unlock", function () { // Always reset _applyToChar variable!
        requestAnimationFrame(() => { this._applyToChar = null; });
        return _this["Game_Event_unlock"].apply(this, arguments);
    });

    // Toggle actor buttons on keyboard...
    this.extend(Input, "_onKeyDown", function (event) { // Hook to keyboard toggle keys
        _this["Input__onKeyDown"].apply(this, arguments);
        this.checkActorToggleKB(false);
    });

    Input.checkActorToggleKB = function (state2) {
        if (!$gameMap._mapId) return;
        if (state2) {
            if (this._currentState2['pagedown']) $gameMap.focusToNextActor(-2);
            if (this._currentState2['pageup']) $gameMap.focusToPreviousActor(-2);
        } else {
            if (this._currentState['pagedown']) $gameMap.focusToNextActor(-1);
            if (this._currentState['pageup']) $gameMap.focusToPreviousActor(-1);
        }
    };

    // Toggle actor buttons on gamepad...
    Input.checkActorToggle = function (buttons, last_state, gamepad_index) {
        if (buttons[Input.gamepadMapperInv['pagedown']]) { // R1
            if (!last_state[Input.gamepadMapperInv['pagedown']] && buttons[Input.gamepadMapperInv['pagedown']].pressed) {
                if ($gameMap._mapId) { $gameMap.focusToPreviousActor(gamepad_index); return; }
            }
        } if (buttons[Input.gamepadMapperInv['pageup']]) { // L1
            if (!last_state[Input.gamepadMapperInv['pageup']] && buttons[Input.gamepadMapperInv['pageup']].pressed) {
                if ($gameMap._mapId) { $gameMap.focusToPreviousActor(gamepad_index); return; }
            }
        }
    };

    if (!Imported.OcRam_Events) {
        // Show text auto-face based on name with \P[n] + \N[n]
        this.extend(Game_Interpreter, "command101", function (params) {

            // 0 = "Actor1"
            // 1 = face index
            // 2 = window / dim
            // 3 = dim / bottom
            // 4 = name

            const old_values = [params[0], params[1]];

            if ((params[4] + '').left(2) == "\\P" && (params[0] + '') == '') {

                const id = (params[4] + '').replaceAll('\\P[', '').replaceAll(']', '');
                const member = $gameParty.battleMembers()[id - 1];

                if (member) {
                    params[0] = member._faceName;
                    params[1] = member._faceIndex;
                }

                // Reset in case that party member changes...
                requestAnimationFrame(() => {
                    params[0] = old_values[0]; params[1] = old_values[1];
                });

            } else if ((params[4] + '').left(2) == "\\N" && (params[0] + '') == '') {

                const id = (params[4] + '').replaceAll('\\N[', '').replaceAll(']', '');
                const member = $gameActors._data[id];

                if (member) {
                    params[0] = member.faceName;
                    params[1] = member.faceIndex;
                }

                // Reset in case that party member changes...
                requestAnimationFrame(() => {
                    params[0] = old_values[0]; params[1] = old_values[1];
                });

            }

            return _this["Game_Interpreter_command101"].apply(this, arguments);

        });
    }

    // Is followers follow disabled?
    this.extend(Game_Followers, "updateMove", function () {
        if (!_followersFollow) return;
        _this["Game_Followers_updateMove"].apply(this, arguments);
    });

    // Set Movement Route
    this.extend(Game_Interpreter, "command205", function (params) {
        if (params[0] && params[0] < 0) {
            const obj = !this.event() ? null : this.event()._applyToChar;
            if (obj) params[0] = OcRam.getGameObjectId(obj);
        } return _this["Game_Interpreter_command205"].apply(this, arguments);
    });

    // Show Animation
    this.extend(Game_Interpreter, "command212", function (params) {
        if (params[0] && params[0] < 0) {
            const obj = !this.event() ? null : this.event()._applyToChar;
            if (obj) params[0] = OcRam.getGameObjectId(obj);
        } return _this["Game_Interpreter_command212"].apply(this, arguments);
    });

    // Show Balloon Icon
    this.extend(Game_Interpreter, "command213", function (params) {
        if (params[0] && params[0] < 0) {
            const obj = !this.event() ? null : this.event()._applyToChar;
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

    // Check if formation is locked
    this.extend(Window_MenuCommand, "isFormationEnabled", function () {
        return _this["Window_MenuCommand_isFormationEnabled"].apply(this, arguments) && !_lockFormation;
    });

    if (_showDeadFollowersType == 1) { // Update ghost transparency!
        this.extend(Game_Party, "swapOrder", function (index1, index2) {
            _this["Game_Party_swapOrder"].apply(this, arguments);
            $gamePlayer.setOpacity(_playerOpacity - ($gamePlayer.actor().isDead() ? 128 : 0));
        });
    }

    if (_showDeadFollowersType == 2) { // No dead followers plz...
        Game_Party.prototype.sortDeadBattleMembers = function () {
            if (!this._actors) return; let i = 0;
            const sorted_battle_members = this.battleMembers().sort((a, b) => {
                if (a.hp < 1) return 1; if (b.hp < 1) return -1; return 0;
            }); let all_dead = true;
            sorted_battle_members.forEach(member => {
                if (member.hp > 0) all_dead = false;
                this._actors[i++] = member._actorId;
            }); _this.debug("sortDeadMembers", sorted_battle_members, this._actors);
            $gamePlayer.refresh(); $gameMap.requestRefresh();
            if (OcRam.isMZ()) $gameTemp.requestBattleRefresh();
            const s = OcRam.scene();
            if (s && s._statusWindow) s._statusWindow.refresh()
            if (Imported.OcRam_Local_Coop) OcRam.Local_Coop.refreshPrecedingCharacters();
            if (all_dead) SceneManager.goto(Scene_Gameover);
        };
        this.extend(Game_Party, "swapOrder", function (index1, index2) {
            const a1 = $gameActors.actor(this._actors[index1]);
            const a2 = $gameActors.actor(this._actors[index2]);
            const a = a1.getCharacter(); const b = a2.getCharacter();
            if (a && a.isPlayer() && a2.isDead()) {
                _this.debug("Dead followers are not allowed as player!"); return;
            } if (b && b.isPlayer() && a1.isDead()) {
                _this.debug("Dead followers are not allowed as player!"); return;
            }
            /*if (a && !a.isPlayer() && !a1.isDead()) {
                requestAnimationFrame(() => { a.locate($gamePlayer._x, $gamePlayer._y); });
            } if (b && !b.isPlayer() && !a2.isDead()) {
                requestAnimationFrame(() => { b.locate($gamePlayer._x, $gamePlayer._y); });
            }*/
            _this["Game_Party_swapOrder"].apply(this, arguments); if (!_followersFollow) return;
            /*if (a && a.isVisible()) {
                //console.log(a, "(a) SHOULD relocate to:", $gamePlayer._x, $gamePlayer._y);
                requestAnimationFrame(() => { a.locate($gamePlayer._x, $gamePlayer._y); });
            }
            if (b && b.isVisible()) {
                //console.log(b, "(b) SHOULD relocate to:", $gamePlayer._x, $gamePlayer._y);
                requestAnimationFrame(() => { b.locate($gamePlayer._x, $gamePlayer._y); });
            }*/
            this.sortDeadBattleMembers();
        });
        this.extend(Game_BattlerBase, "die", function () {
            _this["Game_BattlerBase_die"].apply(this, arguments);
            if ($gameParty) $gameParty.sortDeadBattleMembers();
        });
        this.extend(Game_BattlerBase, "revive", function () {
            _this["Game_BattlerBase_revive"].apply(this, arguments);
            if ($gameParty) $gameParty.sortDeadBattleMembers();
            if ($gameParty.inBattle()) {
                const character = this.getCharacter();
                if (character && OcRam.scene()._statusWindow && OcRam.scene()._statusWindow.drawItemImage) {
                    const actor = this.actor(character._memberIndex);
                    if (actor) OcRam.scene()._statusWindow.drawItemImage(character._memberIndex);
                }
            }
        });
        if (Imported.OcRam_Local_Coop) {
            Game_Follower.prototype.isVisible = function () {
                if (!this.actor()) return false; // Check _playerIndex_OC only when local co-op is imported.
                return ($gamePlayer.followers().isVisible() || this._playerIndex_OC) && this.actor().hp > 0;
            };
        } else {
            Game_Follower.prototype.isVisible = function () {
                if (!this.actor()) return false;
                return ($gamePlayer.followers().isVisible()) && this.actor().hp > 0;
            };
        }
    } else {
        this.extend(Game_BattlerBase, "revive", function () {
            _this["Game_BattlerBase_revive"].apply(this, arguments);
            if ($gameParty.inBattle()) {
                const character = this.getCharacter();
                if (character && OcRam.scene()._statusWindow && OcRam.scene()._statusWindow.drawItemImage) {
                    const actor = this.actor(character._memberIndex);
                    if (actor) OcRam.scene()._statusWindow.drawItemImage(character._memberIndex);
                }
            }
        });
    }

    if (_showDeadFollowersType > 0) {
        if (OcRam.isMZ()) {
            this.extend(Window_StatusBase, "drawActorFace", function (actor, x, y, width, height) {
                if (!actor) return;
                if (actor.isBattleMember) this.changePaintOpacity(actor.isBattleMember(), actor.hp ? false : true);
                _this["Window_StatusBase_drawActorFace"].apply(this, arguments);
            });
        } else {
            this.extend(Window_Status, "drawActorFace", function (actor, x, y, width, height) {
                if (!actor) return;
                if (actor.isBattleMember) this.changePaintOpacity(actor.isBattleMember(), actor.hp ? false : true);
                _this["Window_Status_drawActorFace"].apply(this, arguments);
            });
        }
    }

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    Game_Party.prototype.maxBattleMembers = function () {
        return _maxBattleMembers;
    };

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => {
        _followersFollow = true;
        _allowTogling = OcRam.getBoolean(this.parameters['Actor toggling']);
        _maxBattleMembers = Number(this.parameters['Max battle members']);
    };
    this.loadPluginData = gs => {
        _followersFollow = !!gs._followersFollow;
        _allowTogling = !!gs._allowTogling;
        _maxBattleMembers = gs._maxBattleMembers;
        _oldParty = gs._oldParty;
        _oldMaxMembers = gs._oldMaxMembers;
        _lockFormation = gs._lockFormation;
        $gameParty._actors = gs._currentMembers;
        const xs = []; const ys = [];
        OcRam.followers().forEach(f => {
            xs.push(f._x | 0); ys.push(f._y | 0);
        }); setTimeout(() => {
            let i = 0; OcRam.followers().forEach(f => {
                f.locate(xs[i], ys[i++]);
            });
            if (Imported.OcRam_Local_Coop) OcRam.Local_Coop.teleOnLoad();
        }, 222);
    };
    this.savePluginData = gs => {
        gs._followersFollow = _followersFollow;
        gs._allowTogling = _allowTogling;
        gs._maxBattleMembers = _maxBattleMembers;
        gs._oldParty = _oldParty;
        gs._oldMaxMembers = _oldMaxMembers;
        gs._currentMembers = $gameParty._actors;
        gs._lockFormation = _lockFormation;
    };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "followersFollow", function (args) {
        _this.debug("Plugin command: followersFollow", args); _this.follow(OcRam.getBoolean(args.followersFollow));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "allowToggle", function (args) {
        _this.debug("Plugin command: allowToggle", args); _this.allowToggling(OcRam.getBoolean(args.allowToggle));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "maxBattleMembers", function (args) {
        _this.debug("Plugin command: maxBattleMembers", args);
        _this.maxBattleMembers(Number(args.maxBattleMembers));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "saveFormation", function (args) {
        _this.debug("Plugin command: saveFormation", args); _this.saveFormation();
    });

    PluginManager.registerCommand("OcRam_" + this.name, "restoreFormation", function (args) {
        _this.debug("Plugin command: restoreFormation", args); _this.restoreFormation();
    });

}.bind(OcRam.Followers)());