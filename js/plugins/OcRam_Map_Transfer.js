//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Map_Transfer.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.15) alert("OcRam core v1.15 or greater is required!");

OcRam.addPlugin("Map_Transfer", "1.03");

/*:
 * @target MZ
 * @plugindesc v1.03 This plugin performs automatic player transfer between maps + NEW "Scroll" transition type!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Time_System
 * @orderAfter OcRam_Weather_System
 * @orderAfter OcRam_Movement
 * @orderAfter OcRam_Passages
 * @orderAfter OcRam_Layers
 * @orderAfter OcRam_Local_Coop
 * @orderAfter OcRam_Star_Tile_Fix
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Transfer type
 * @type select
 * @option Fade to black
 * @value 0
 * @option Fade to white
 * @value 1
 * @option Instant
 * @value 2
 * @option Scroll
 * @value 3
 * @desc Transfer type on map transfers!
 * @default 3
 *
 * @param Scroll speed
 * @type select
 * @option Slowest
 * @value 0.1
 * @option Slow
 * @value 0.2
 * @option Normal
 * @value 0.25
 * @option Fast
 * @value 0.5
 * @desc Scroll speed if "Scroll" type transfer is used.
 * @default 0.25
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
 * Give map notetags to tell maps which map they are connected to. Make your 
 * transfers easier - especially if there are several connection points 
 * between maps!
 * 
 * Also new type of "SCROLL" transfer for Zelda like map transfers!
 * (Requires little bit more mapping patience, but it can be worth it!)
 *
 * NOTE1: "SCROLL" type is only available for linked maps (via notetags)
 * 
 * NOTE2: Plugin order for this plugin is REALLY low.
 * 
 * NOTE3: LOOPPING MAPS (EDGES) ARE NOT SUPPORTED!
 *        (Example horizontally loopped map can't have right/left edges...)
 * 
 * ----------------------------------------------------------------------------
 * Notetags
 * ============================================================================
 * [EDGE] = left, top, right or bottom
 * [TYPE] = 0: Fade to black, 1: Fade to white, 2: Instant, 3: Scroll
 *          TIP: You may ommit type with * or EMPTY string (will use default)
 * 
 * If [OFFSET] first char is A-letter it means it is ABSOLUTE position.
 *      Semi-absolute:          A7 (depending scroll dir it can be x or y)
 *      Totally absolute:       A4_6 (Transfers to x:4 y:6 or to y:4 x:6
 *                                    depending on transfer direction)
 * 
 * Right-Left transfers can't have X offset (relative nor semi-absolute)
 * Top-Bottom transfers can't have Y offset (relative nor semi-absolute)
 * 
 * You may have as many maps connected to each side as you want... But in some
 * point it might get harder to manage all connections.
 * 
 * To seperate connections use slash (/)
 * 
 * NOTE: When using "Scrolling" type of map transfer, map size must be at 
 *       least same as game screen size.
 * 
 * ----------------------------------------------------------------------------
 * 
 * <map_transfer:
 * [EDGE]:[MAP_ID],[TYPE]/[EDGE]:[MAP_ID],[TYPE],[OFFSET]/
 * [EDGE]:[MAP_ID],[TYPE],[START-END],[OFFSET]>
 * 
 * <map_transfer:[EDGE]:[MAP_ID],[TYPE]>
 * >> Most simple relative transfer with no offsets (maps are ~same size).
 * 
 * <map_transfer:[EDGE]:[MAP_ID],[TYPE],[OFFSET]>
 * >> Simple transfer with offset (or absolute pos).
 * 
 * <map_transfer:[EDGE]:[MAP_ID],[TYPE],[START-END],[OFFSET]>
 * >> If larger map is connected to several smaller maps. Example X 0 - 9
 *    is connected to map 1 and X 10 - 20 are connected to map 2.
 *    When transfered to map 2 >> X - 10 is automatically adjusted.
 *
 * ----------------------------------------------------------------------------
 * 
 * Example when player enters RIGHT side of current map. Player is transfered
 * LEFT side to target map. Y will remain same, but X will be 0. This is the
 * most simple setup (both maps same size and no need to adjust X/Y)
 * <map_transfer:right:3>
 * 
 * ----------------------------------------------------------------------------
 * 
 * Connect all sides example (simple relative connections with defaults):
 * <map_transfer:left:1/top:2/right:3/bottom:4>
 * _________________________________________________
 * |               |               |               |
 * |               |    mapId 2    |               |
 * |_______________|_______________|_______________|
 * |               |               |               |
 * |    mapId 1    |    CURRENT    |    mapId 3    |
 * |_______________|_______________|_______________|
 * |               |               |               |
 * |               |    mapId 4    |               |
 * |_______________|_______________|_______________|
 * 
 * Left side is connected to map id 1 / Top side is connected map id 2 etc...
 * 
 * ----------------------------------------------------------------------------
 * __________________
 * |                |   Example 2: Smaller map is connected to larger map
 * |          map:1 |   and needs to have offset adjusted.
 * |____________|___| <-- = Map 1 notetag = <map_transfer:bottom:3,,20-40>
 * |       _|_  |   | <-- = Map 3 notetag = <map_transfer:top:1,,20/left:2>
 * | map:2  | map:3 | <-- = Map 2 notetag = <map_transfer:right:3>
 * ==================
 * (totally 40 tiles wide)
 * 
 * ----------------------------------------------------------------------------
 * 
 * Another complex example:
 * <map_transfer:left:20,,0-12,A7/left:22,,13-26/right:23,0>
 * 
 * Left side is connected to map id 20 and 22
 *      Between 0-12 Y coord target map will be 20 and target pos is
 *      ABSOLUTE 7 (y because this is horizontal transfer)
 *      Between 13-26 Y coord target map will be 22 and target pos is
 *      relative +-0 (y because this is horizontal transfer)
 * 
 * Right side is relative connection to map id 23 with "fade to black"
 * 
 * Top and bottom sides are not linked to any map.
 * 
 * TIP! You may break notetag with new lines like this:
 * <map_transfer:
 * left:20,*,0-12,A7/
 * left:22,*,13-26/
 * right:23>
 * 
 * ----------------------------------------------------------------------------
 * No plugin Commands nor usefull JS calls
 * ============================================================================
 * OcRam.Map_Transfer.isTransfering() returns true if transfer is in progress.
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
 * 2022/01/23 v1.00 - Initial release
 * 2022/01/24 v1.01 - *HOT FIX* Removed invalid plugin command meta
 * 2022/04/22 v1.02 - OcRam_Weather_System is no longer needed by this plugin
 *                    for scrolling map transfers (Credits DLHubb)
 * 2022/07/10 v1.03 - Since RMMZ v1.5.0 no need to wait extra frame on map
 *                    transfer (caused extra flickering and is now fixed)
 *                    Now pre-loads event graphics from next map!
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * - No overrides -
 */

var $dataMap_Next = null;

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...
    const _transferType = Number(this.parameters['Transfer type'] || 0);
    const _scrollSpeed = OcRam.getFloat(this.parameters['Scroll speed'] || 0.25);

    let _doSnap = false; let pic_sprite = null;
    let _prevMapSnap = null; let _thisMapSnap = null;
    let _picMapSnap = null;
    let _currentMapTransfers = null;
    let _currentMapTransfersIndex = 0;
    let _transferReserved = false;
    let _oldDisplayX = 0; let _oldDisplayY = 0;
    let _gpOldTransparent = false;
    let _gpOldThrough = false;
    let _oldShowTime = false;
    let _preventNormalTransfer = false;

    const _oldStartFlash = Game_Screen.prototype.startFlash;

    // For pre-loaded event GFX...
    let _tmpChars = []; let _tmpCharsLoaded = [];

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    let _layerData = [];
    const addLayerData = (name, z, data) => {
        _layerData.push({ name: name, z: z, data: data });
    };
    const getLayerData = (name, z) => {
        return _layerData.find(ld => {
            if (ld.name == name && ld.z == z) return true;
        })
    }; this.getLayerData = (name, z) => { return getLayerData(name, z); };
    const clearLayerData = () => { _layerData = []; };

    const parseMapTransferObject = meta => {

        _currentMapTransfers = null; if (!$dataMap || !$dataMap.meta || !$dataMap.meta.map_transfer) return;
        //[side]:[map_id],[start-end],[offset]/[side]:[map_id],[offset]/[side]:[map_id]

        // maps, starts, ends, offsets
        const left_data = [[], [], [], [], []];
        const top_data = [[], [], [], [], []];
        const right_data = [[], [], [], [], []];
        const bottom_data = [[], [], [], [], []];
        const arr_data = (meta + "/").split("/");
        let row_data = ""; let side = ""; let params = "";

        arr_data.forEach(data => {
            row_data = (data + ":").split(":");
            side = row_data[0].toLowerCase().replace("\n", "");
            // [map_id] [starts-ends] [offset] || [map_id] [offset]
            params = (row_data[1].toLowerCase() + ",,,,").split(",");
            const map_id = Number(params[0]);
            const fade_type = (params[1] == "" || params[1] == "*") ? _transferType : Number(params[1]);
            const b_start_end = params[2].indexOf("-") > -1;
            const se = b_start_end ? params[2].split("-") : [0, 9999];
            const offset = b_start_end ? params[3] : params[2];
            if (map_id) {
                switch (side) {
                    case "left":
                        left_data[0].push(map_id); // map id
                        left_data[1].push(fade_type); // type
                        left_data[2].push(Number(se[0] || 0)); // starts
                        left_data[3].push(Number(se[1] || 0)); // ends
                        left_data[4].push(offset); // offsets
                        break;
                    case "top":
                        top_data[0].push(map_id); // map id
                        top_data[1].push(fade_type); // type
                        top_data[2].push(Number(se[0] || 0)); // starts
                        top_data[3].push(Number(se[1] || 0)); // ends
                        top_data[4].push(offset); // offsets
                        break;
                    case "right":
                        right_data[0].push(map_id); // map id
                        right_data[1].push(fade_type); // type
                        right_data[2].push(Number(se[0] || 0)); // starts
                        right_data[3].push(Number(se[1] || 0)); // ends
                        right_data[4].push(offset); // offsets
                        break;
                    case "bottom":
                        bottom_data[0].push(map_id); // map id
                        bottom_data[1].push(fade_type); // type
                        bottom_data[2].push(Number(se[0] || 0)); // starts
                        bottom_data[3].push(Number(se[1] || 0)); // ends
                        bottom_data[4].push(offset); // offsets
                        break;
                }
            }

        });

        _currentMapTransfers = {
            left: {
                mapIds: left_data[0], types: left_data[1], starts: left_data[2], ends: left_data[3], offsets: left_data[4]
            }, top: {
                mapIds: top_data[0], types: top_data[1], starts: top_data[2], ends: top_data[3], offsets: top_data[4]
            }, right: {
                mapIds: right_data[0], types: right_data[1], starts: right_data[2], ends: right_data[3], offsets: right_data[4]
            }, bottom: {
                mapIds: bottom_data[0], types: bottom_data[1], starts: bottom_data[2], ends: bottom_data[3], offsets: bottom_data[4]
            }
        };

        _this.debug("Parsed map transfer object >>", meta, " to ", _currentMapTransfers);

    };

    let _fromDir = 0;

    const doPicSnap = () => {

        _picMapSnap = new Bitmap(Graphics.width, Graphics.height);
        const picture_bitmaps = OcRam.scene()._spriteset._pictureContainer.children.filter(p => !!p._pictureName);

        picture_bitmaps.forEach(pic => {
            const bm = pic._bitmap;
            _picMapSnap.blt(bm, 0, 0, bm.width, bm.height, pic.x, pic.y, bm.width, bm.height);
        });

        //_picMapSnap.drawText("To debug something", 10, 10, Graphics.width, 100, "left");

    };

    const doTransfer = (mapId, type, side, offset, cx, cy, instant) => {

        _transferReserved = true; // Set transfer reserved flag
        const filename = "Map%1.json".format(mapId.padZero(3));

        DataManager.loadDataFileCB("$dataMap_Next", filename, (xhr, name, src, url) => {

            if (!_currentMapTransfers) {
                setTimeout(() => {
                    _transferReserved = false; restoreLayers();
                }, 400); return;
            } window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad(window[name]);

            // Preload all event GFX and cache for next map transfer, but only once...
            for (const event of $dataMap_Next.events.filter(event => !!event)) {
                const pages = event.pages;
                for (let i = pages.length - 1; i >= 0; i--) {
                    const page = pages[i]; const img = page.image;
                    if (img && img.characterName) {
                        if (_tmpCharsLoaded.indexOf(img.characterName) < 0) {
                            _tmpCharsLoaded.push(img.characterName);
                            _tmpChars.push(ImageManager.loadCharacter(img.characterName));
                        }
                    }
                }
            }

            let x = cx; let y = cy; let dir = 0;
            const absolute = (offset + "").indexOf("a") > -1;
            let offset_dxy = (absolute) ? 0 : Number(offset || 0);

            let abs_xy = [0, -999];
            if (absolute) {
                abs_xy[0] = Number((offset.replace("a", "") + "_").split("_")[0] || 0);
                abs_xy[1] = Number((offset.replace("a", "") + "_").split("_")[1] || -999);
            }

            const offset_n = (absolute) ? abs_xy[0] :
                (side == "left" || side == "right") ? y + Number(offset || 0) : x + Number(offset || 0);
            _oldDisplayY = 0; _oldDisplayX = 0;

            const start_from = Number(_currentMapTransfers[side].starts[_currentMapTransfersIndex] || 0);
            if (start_from) offset_dxy = -start_from;

            switch (side) { // Switch coordinates based on scroll direction
                case "left": x = (type == 3) ? $dataMap_Next.width : abs_xy[1] > -999 ? abs_xy[1] : $dataMap_Next.width - 1; dir = 4; y = offset_n; break;
                case "top": y = (type == 3) ? $dataMap_Next.height : abs_xy[1] > -999 ? abs_xy[1] : $dataMap_Next.height - 1; dir = 8; x = offset_n; break;
                case "right": x = (type == 3) ? -1 : abs_xy[1] > -999 ? abs_xy[1] : 0; dir = 6; y = offset_n; break;
                case "bottom": y = (type == 3) ? y = -1 : abs_xy[1] > -999 ? abs_xy[1] : 0; dir = 2; x = offset_n; break;
            }

            // Center player based on next map! (Important especially when transferring from bigger to smaller maps)
            if (type == 3) {
                if ((side == "left" || side == "right") && ($dataMap_Next.height < $dataMap.height) && (y + offset_n) > ($dataMap_Next.height - (OcRam._screenTHeight * 0.5))) $gameMap._displayY = ($dataMap_Next.height - OcRam._screenTHeight) | start_from;
                if ((side == "top" || side == "bottom") && ($dataMap_Next.width < $dataMap.width) && (x + offset_n) > ($dataMap_Next.width - (OcRam._screenTWidth * 0.5))) $gameMap._displayX = ($dataMap_Next.width - OcRam._screenTWidth) | start_from;
            }

            switch (side) { // Must be switched again because we need to calc x/y coordinates - which will have effect on next display x/y
                case "left": _oldDisplayY = $gameMap._displayY + offset_dxy; break;
                case "top": _oldDisplayX = $gameMap._displayX + offset_dxy; break;
                case "right": _oldDisplayY = $gameMap._displayY + offset_dxy; break;
                case "bottom": _oldDisplayX = $gameMap._displayX + offset_dxy; break;
            }

            _this.debug("Auto-Transfer:", side, "Offset raw/n/dxy:", offset, offset_n, offset_dxy, "Next map:", $dataMap_Next);
            _this.debug("$gamePlayer.reserveTransfer:", mapId, x, y, dir, type);

            if (type < 2) { // Fade
                $gamePlayer.reserveTransfer(mapId, x, y, dir, type); _doSnap = false; _transferReserved = false; _preventNormalTransfer = true;
            } else { // Scroll
                if (Imported.OcRam_Layers) {
                    clearLayerData();
                    OcRam.Layers.getDynamicLayers().forEach(l => {
                        addLayerData(l._imgName, l._z, [{ ...l._sprite.origin }, (l._scrollX), (l._scrollY), (dir)]);
                        l._scrollX = 0; l._scrollY = 0;
                    });
                }
                if (type == 3) {
                    _fromDir = dir; _doSnap = true;
                    if (Imported.OcRam_Time_System) {
                        _oldShowTime = $gameSystem.isClockShown();
                        $gameSystem.hideMapClock();
                    } if (OcRam.scene() && OcRam.scene()._mapNameWindow) {
                        OcRam.scene()._mapNameWindow.close();
                        OcRam.scene()._mapNameWindow.contentsOpacity = 0;
                    } $gameScreen.clearFlash(); $gameScreen.updateFlash();
                    $gameScreen.startFlash = () => { };
                    doPicSnap();
                    setTimeout(() => {
                        if (OcRam.scene()) {
                            OcRam.scene()._spriteset._pictureContainer.opacity = 0;
                            _prevMapSnap = Bitmap.snap(OcRam.scene());
                            OcRam.scene()._spriteset._pictureContainer.opacity = 1;
                            OcRam.scene()._spriteset.update();
                        } $gamePlayer.reserveTransfer(mapId, x, y, dir, 2);
                    }, instant ? 20 : 250);
                } else { // Instant
                    _doSnap = false; _preventNormalTransfer = true;
                    setTimeout(() => { $gamePlayer.reserveTransfer(mapId, x, y, dir, type == 3 ? 2 : type); }, instant ? 1 : 250);
                    setTimeout(() => { _transferReserved = false; restoreLayers(); }, 400);
                }
            }

        });

    };

    const transferIfNeeded = (character, instant) => {
        if (_preventNormalTransfer || _transferReserved) return;
        _currentMapTransfersIndex = 0; const x = character._x;
        const y = character._y; let found = false;
        if (x == 0) {
            if (character._direction != 4 && character._direction != 7 && character._direction != 1) return;
            _currentMapTransfers.left.starts.find(s => {
                if (s <= y && _currentMapTransfers.left.ends[_currentMapTransfersIndex] >= y) {
                    found = true; return true;
                } _currentMapTransfersIndex++;
            }); if (found) {
                if ($gameMap.isLoopHorizontal()) {
                    console.warn("Map is loopped horizontally thus map transfer left/right is disabled!"); return;
                } doTransfer(
                    _currentMapTransfers.left.mapIds[_currentMapTransfersIndex], _currentMapTransfers.left.types[_currentMapTransfersIndex],
                    "left", _currentMapTransfers.left.offsets[_currentMapTransfersIndex],
                    x, y - (_currentMapTransfers.left.starts[_currentMapTransfersIndex] || 0), instant
                );
            } return;
        } if (x == $gameMap.width() - 1) {
            if (character._direction != 6 && character._direction != 9 && character._direction != 3) return;
            _currentMapTransfers.right.starts.find(s => {
                if (s <= y && _currentMapTransfers.right.ends[_currentMapTransfersIndex] >= y) {
                    found = true; return true;
                } _currentMapTransfersIndex++;
            }); if (found) {
                if ($gameMap.isLoopHorizontal()) {
                    console.warn("Map is loopped horizontally thus map transfer left/right is disabled!"); return;
                } doTransfer(
                    _currentMapTransfers.right.mapIds[_currentMapTransfersIndex], _currentMapTransfers.right.types[_currentMapTransfersIndex],
                    "right", _currentMapTransfers.right.offsets[_currentMapTransfersIndex],
                    x, y - (_currentMapTransfers.left.starts[_currentMapTransfersIndex] || 0), instant
                );
            } return;
        }
        if (character._y == 0) {
            if (character._direction < 7) return;
            _currentMapTransfers.top.starts.find(s => {
                if (s <= x && _currentMapTransfers.top.ends[_currentMapTransfersIndex] >= x) {
                    found = true; return true;
                } _currentMapTransfersIndex++;
            }); if (found) {
                if ($gameMap.isLoopVertical()) {
                    console.warn("Map is loopped vertically thus map transfer top/bottom is disabled!"); return;
                } doTransfer(
                    _currentMapTransfers.top.mapIds[_currentMapTransfersIndex], _currentMapTransfers.top.types[_currentMapTransfersIndex],
                    "top", _currentMapTransfers.top.offsets[_currentMapTransfersIndex],
                    x - (_currentMapTransfers.left.starts[_currentMapTransfersIndex] || 0), y, instant
                );
            } return;
        } if (character._y == $gameMap.height() - 1) {
            if (character._direction > 3) return;
            _currentMapTransfers.bottom.starts.find(s => {
                if (s <= x && _currentMapTransfers.bottom.ends[_currentMapTransfersIndex] >= x) {
                    found = true; return true;
                } _currentMapTransfersIndex++;
            }); if (found) {
                if ($gameMap.isLoopVertical()) {
                    console.warn("Map is loopped vertically thus map transfer top/bottom is disabled!"); return;
                } doTransfer(
                    _currentMapTransfers.bottom.mapIds[_currentMapTransfersIndex], _currentMapTransfers.bottom.types[_currentMapTransfersIndex],
                    "bottom", _currentMapTransfers.bottom.offsets[_currentMapTransfersIndex],
                    x - (_currentMapTransfers.left.starts[_currentMapTransfersIndex] || 0), y, instant
                );
            } return;
        }
    }

    const saveStates = () => {
        _gpOldTransparent = $gamePlayer._transparent;
        _gpOldThrough = $gamePlayer._through;
        $gamePlayer.setTransparent(true);
        $gamePlayer.setThrough(true);
    };

    const restoreStates = (d) => {
        _transferReserved = false;
        if (_oldShowTime && Imported.OcRam_Time_System) $gameSystem.showMapClock();
        $gamePlayer.setTransparent(_gpOldTransparent);
        const oldPM = $gamePlayer._pixelMovementDisabled;
        OcRam.followers().forEach(f => {
            if (f._playerIndex_OC || !oldPM) {
                f.setDirection(d); f.forceMoveForward();
            }
        }); $gamePlayer.setDirection(d);
        $gamePlayer.forceMoveForward();
        OcRam.followers().forEach(f => {
            if (f._playerIndex_OC) f.setThrough(_gpOldThrough);
            f._pixelMovementDisabled = oldPM;
        });
    };

    const restoreLayers = () => {
        if (Imported.OcRam_Layers) {
            OcRam.Layers.getDynamicLayers().forEach(l => {
                const ld = getLayerData(l._imgName, l._z);
                if (ld) { // Get previous layer origin and try to ensure "seemless" transition
                    l._scrollX = ld.data[1]; l._scrollY = ld.data[2];
                    if (l._scrollX) l.scrollX = function () { this._x += this._scrollX; };
                    if (l._scrollY) l.scrollY = function () { this._y += this._scrollY; };
                }
            });
        }
    };

    const killSprites = (d, s, s2) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (s) {
                    OcRam.scene()._spriteset.removeChild(s);
                    s.destroy();
                } if (s2) {
                    OcRam.scene()._spriteset.removeChild(s2);
                    s2.destroy();
                } if (pic_sprite) {
                    OcRam.scene()._spriteset.removeChild(pic_sprite);
                    pic_sprite.destroy();
                } _prevMapSnap.destroy(); _thisMapSnap.destroy(); _picMapSnap.destroy();
                restoreStates(d); restoreLayers();
                $gameScreen.startFlash = _oldStartFlash;
                _tmpChars = []; _tmpCharsLoaded = [];
            });
        });
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.isTransfering = () => _transferReserved;

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    DataManager.loadDataFileCB = function (name, src, cb, cb_err) {
        const xhr = new XMLHttpRequest();
        const url = "data/" + src;
        window[name] = null;
        xhr.open("GET", url);
        xhr.overrideMimeType("application/json");
        xhr.onload = () => cb(xhr, name, src, url);
        xhr.onerror = () => cb_err(xhr, name, src, url);
        xhr.send();
    };

    if (!Imported.OcRam_Movement) {
        Game_Follower.prototype.forceMoveForward = function () {
            const ot = this._through;
            this.setThrough(true);
            this.moveForward();
            this.setThrough(ot);
        };
    }

    Game_Map.prototype.scrollTransfer = function (d, s, s2) {

        if (!s) { killSprites(d, s, s2); return; }

        switch (d) {
            case 8:
                if (s) s.y += (_scrollSpeed * OcRam.twh[1]); s.update();
                if (s2) s2.y += (_scrollSpeed * OcRam.twh[1]); s.update();
                if (s2.y < 0) {
                    requestAnimationFrame(() => {
                        if (s) this.scrollTransfer(d, s, s2);
                    }); return;
                } else {
                    killSprites(d, s, s2); return;
                } break;
            case 6:
                if (s) s.x -= (_scrollSpeed * OcRam.twh[0]); s.update();
                if (s2) s2.x -= (_scrollSpeed * OcRam.twh[0]); s2.update();
                if (s2.x > 0) {
                    requestAnimationFrame(() => {
                        if (s) this.scrollTransfer(d, s, s2);
                    }); return;
                } else {
                    killSprites(d, s, s2); return;
                } break;
            case 4:
                if (s) s.x += (_scrollSpeed * OcRam.twh[0]); s.update();
                if (s2) s2.x += (_scrollSpeed * OcRam.twh[0]); s2.update();
                if (s2.x < 0) {
                    requestAnimationFrame(() => {
                        if (s) this.scrollTransfer(d, s, s2);
                    }); return;
                } else {
                    killSprites(d, s, s2); return;
                } break;
            case 2:
                if (s) s.y -= (_scrollSpeed * OcRam.twh[1]); s.update();
                if (s2) s2.y -= (_scrollSpeed * OcRam.twh[1]); s2.update();
                if (s2.y > 0) {
                    requestAnimationFrame(() => {
                        if (s) this.scrollTransfer(d, s, s2);
                    }); return;
                } else {
                    killSprites(d, s, s2); return;
                } break;
            default: killSprites(d, s, s2); return;
                console.warn("MAP TRANSFER WITH UNKNOWN DIR FROM! (Shouldn't happen!)"); return; break;
        }

    };

    Game_Map.prototype.startScrollTransfer = function (sprite, dir, ss) {

        $gameScreen.clearPictures();

        const s = OcRam.scene();
        if (Imported.OcRam_Weather_System) {
            OcRam.Weather_System.randomizeParticles();
        } else {
            if (s) {
                const ss = s._weatherContainer || s._spriteset;
                ss.updateWeather(); ss.update();
            }
        }

        _thisMapSnap = Bitmap.snap(s);
        let sprite2 = new Sprite();
        sprite2.bitmap = _thisMapSnap;
        if (sprite2) sprite2.x = 0;
        if (sprite2) sprite2.y = 0;

        switch (dir) {
            case 8:
                sprite.y = 0; sprite2.y = -Graphics.height;
                ss.addChild(sprite); ss.addChild(sprite2); ss.addChild(pic_sprite);
                this.scrollTransfer(dir, sprite, sprite2); break;
            case 6:
                sprite.x = 0; sprite2.x = Graphics.width;
                ss.addChild(sprite); ss.addChild(sprite2); ss.addChild(pic_sprite);
                this.scrollTransfer(dir, sprite, sprite2); break;
            case 4:
                sprite.x = 0; sprite2.x = -Graphics.width;
                ss.addChild(sprite); ss.addChild(sprite2); ss.addChild(pic_sprite);
                this.scrollTransfer(dir, sprite, sprite2); break;
            case 2:
                sprite.y = 0; sprite2.y = Graphics.height;
                ss.addChild(sprite); ss.addChild(sprite2); ss.addChild(pic_sprite);
                this.scrollTransfer(dir, sprite, sprite2); break;
            default: return; break;
        }

    };

    const findTargetSprite = game_battler => {
        if (!OcRam.scene()._spriteset) return null;
        return OcRam.scene()._spriteset.findTargetSprite(game_battler);
    };

    Game_Map.prototype.initScrollTransfer = function () {

        if (!_doSnap || !_prevMapSnap) {
            _doSnap = false; return;
        } _doSnap = false;

        _this.debug("initScrollTransfer:", _prevMapSnap, "OLD DISP X, Y:", _oldDisplayX, _oldDisplayY);

        const dir = _fromDir || 6; const ss = OcRam.scene()._spriteset;

        const character_sprites = ss._characterSprites;
        if (character_sprites) {
            for (const cs of character_sprites) {
                cs.show(); cs._hidden = false;
                cs.visible = true; cs.update();
            } ss._tilemap.update();
        }

        switch (dir) {
            case 2: this._displayY = 0;
                this._displayX = _oldDisplayX; break;
            case 6: this._displayX = 0;
                this._displayY = _oldDisplayY; break;
            case 8: this._displayY = $gameMap.height() - OcRam._screenTHeight;
                this._displayX = _oldDisplayX; break;
            case 4: this._displayX = $gameMap.width() - OcRam._screenTWidth;
                this._displayY = _oldDisplayY; break;
            default: return; break;
        } saveStates(); $gameMap.update();

        if (Imported.OcRam_Passages) {
            OcRam.Passages.initSprites();
            /*$gameMap.events().forEach(e => {
                e.update(); e.updatePassagesEvent();
            });*/
        } if (Imported.OcRam_Star_Tile_Fix) OcRam.Star_Tile_Fix.initSprites();

        // Previous map
        let sprite = new Sprite(); sprite.bitmap = _prevMapSnap;
        if (sprite) sprite.x = 0; if (sprite) sprite.y = 0;
        if (Imported.OcRam_Passages) {
            SceneManager._scene._spriteset._layerContainer_OC.x = -this._displayX * OcRam.twh[0];
            SceneManager._scene._spriteset._layerContainer_OC.y = -this._displayY * OcRam.twh[1];
            SceneManager._scene._spriteset._layerContainer_OC.update();
        } if (Imported.OcRam_Layers) {
            OcRam.Layers.getParallaxLayers().forEach(l => {
                l.initLayer(); l.update();
            }); OcRam.Layers.getDynamicLayers().forEach(l => {
                l.initLayer(); l.update();
            });
        } $gameScreen.clearFlash(); $gameScreen.updateFlash(); ss.update();

        // Pictures
        pic_sprite = new Sprite(); pic_sprite.bitmap = _picMapSnap;
        if (pic_sprite) { pic_sprite.x = 0; pic_sprite.y = 0; }

        this.startScrollTransfer(sprite, dir, ss);
        
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Do not move characters until map scroll is done
    this.extend(Game_CharacterBase, "canPass", function () {
        if (_transferReserved) return false;
        return _this["Game_CharacterBase_canPass"].apply(this, arguments);
    }); this.extend(Game_CharacterBase, "setDirection", function () {
        //if (_transferReserved) return false;
        _this["Game_CharacterBase_setDirection"].apply(this, arguments);
        if (!this.isPlayer()) return;
        if (!_currentMapTransfers) return; transferIfNeeded(this, true);
    });

    // To check if player needs to enter next map...
    this.extend(Game_Player, "refreshBushDepth", function () {
        _this["Game_Player_refreshBushDepth"].apply(this, arguments);
        if (!_currentMapTransfers) return; transferIfNeeded(this);
    });

    // DO NOT CALL MENU IF SCROLL TRANSFER IN PROGRESS!
    this.extend(Scene_Map, "callMenu", function () {
        if (_transferReserved) {
            this.menuCalling = false; return false;
        } _this["Scene_Map_callMenu"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { _preventNormalTransfer = false; };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => {
        _preventNormalTransfer = false;
        parseMapTransferObject($dataMap.meta.map_transfer);
        if (_doSnap && $gameMap) $gameMap.initScrollTransfer();
    }; this.onDatabaseLoaded = sm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    /*PluginManager.registerCommand("OcRam_" + this.name, "command", function (args) {
        _this.debug("Plugin command: command", args);
    });*/

}.bind(OcRam.Map_Transfer)());