//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Battle_Troops.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.15) alert("OcRam core v1.15 or greater is required!");

OcRam.addPlugin("Battle_Troops", "1.02");

/*:
 * @target MZ
 * @plugindesc v1.02 This plugin provides dynamic troops. 
 * Example: init battle with 1-4 random enemies from "Forest pool"!
 * @url https://ocram-codes.net
 * @author OcRam
 * @base OcRam_Battle_Core
 * @orderAfter OcRam_Battle_Core
 * @orderBefore OcRam_Battle_Scope
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command initBattlePool
 * @text Init Battle (pool)
 * @desc Init battle from pool.
 *
 * @arg fixedEnemyIdArray
 * @type enemy[]
 * @default ["1", "1"]
 * @text Enemies (fixed)
 * @desc Enemy ids in battle.
 *
 * @arg poolName
 * @type text
 * @default MyPoolName
 * @text Pool name
 * @desc Name of the enemy pool (defined in plugin parameters).
 *
 * @arg minEnemies
 * @type number
 * @min 1
 * @max 16
 * @default 1
 * @text Min enemies
 * @desc Minimum amount of enemies.
 *
 * @arg maxEnemies
 * @type number
 * @min 1
 * @max 16
 * @default 1
 * @text Max enemies
 * @desc Maximum amount of enemies.
 *
 * @command initBattleFixed
 * @text Init Battle (fixed)
 * @desc Init battle via direct enemy ids.
 *
 * @arg fixedEnemyIdArray
 * @type enemy[]
 * @default ["1", "1"]
 * @text Enemies (fixed)
 * @desc Enemy ids in battle.
 *
 * @command initBattleRandom
 * @text Init Battle (random)
 * @desc Init battle with random amount of enemies from these enemy ids + fixed enemies.
 *
 * @arg fixedEnemyIdArray
 * @type enemy[]
 * @default ["1", "1"]
 * @text Enemies (fixed)
 * @desc Enemy ids in battle.
 *
 * @arg enemyIdArray
 * @type enemy[]
 * @default ["1", "2", "3"]
 * @text Enemies (random)
 * @desc RANDOM enemy ids in battle.
 *
 * @arg minEnemies
 * @type number
 * @min 1
 * @max 16
 * @default 1
 * @text Min enemies
 * @desc Minimum amount of enemies (total).
 *
 * @arg maxEnemies
 * @type number
 * @min 1
 * @max 16
 * @default 1
 * @text Max enemies
 * @desc Maximum amount of enemies (total).
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * @param Dynamic Troops
 * @type boolean
 * @desc Use Dynamic Troops?
 * @default true
 *
 * @param Enemy Pools
 * @parent Dynamic Troops
 * @type struct<Pools>[]
 * @desc Get enemies from named pool. (ie: init_battle 1-2 from_pool Desert)
 * @default ["{\"Name\":\"Forest\",\"Enemy IDs\":\"1,2,3\"}","{\"Name\":\"Desert\",\"Enemy IDs\":\"4,5,6\"}"]
 *
 * @param Enemy Pos Variance
 * @parent Dynamic Troops
 * @type number
 * @desc Give enemy position variance in pixels.
 * @default 32
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
 * 
 * NOTE: This plugin requires OcRam_Battle_Core and OcRam_Core -plugins!
 * 
 * Ever tired to create troops for all possible enemy variations?
 * Or needed to form random encounter with 1-4 enemies from this enemy pool?
 * This plugin will save you from creating thousands of troops!
 *
 * NOTE: For "Dynamic Troops" maximum number of enemies is 16.
 * Important: initBattle plugin command must be called BEFORE battle process!
 * Else will default standard style of troops.
 *
 * Battle field will be initialized like this:
 * r1c1    r1c2    r1c3    r1c4    a1  a5  a9
 *  r2c1    r2c2    r2c3    r2c4    a2  a6  a10
 *   r3c1    r3c2    r3c3    r3c4    a3  a7  a11
 *    r4c1    r4c2    r4c3    r4c4    a4  a8  a12
 *
 * Plugin Commands
 * ----------------------------------------------------------------------------
 * MV example: OcRam_Battle_Core/initBattlePool "My Pool" 1 3
 * initBattlePool       Init enemies for this battle
 * >> fixedEnemyIdArray Fixed enemy ids for this battle
 * >> poolName          Name of the enemy pool
 * >> minEnemies        Minimum amount of enemies
 * >> maxEnemies        Maximum amount of enemies
 *
 * MV example: OcRam_Battle_Core/initBattleFixed ["1", "1", "2"]
 * initBattleFixed      Init enemies for this battle
 * >> fixedEnemyIdArray Enemy ids for this battle
 *
 * MV example: OcRam_Battle_Core/initBattleRandom ["1"] ["2", "3"] 1 3
 * initBattleRandom     Init enemies for this battle
 * >> fixedEnemyIdArray Fixed enemy ids for this battle
 * >> enemyIdArray      Random enemy ids for this battle
 * >> minEnemies        Minimum amount of enemies (total)
 * >> maxEnemies        Maximum amount of enemies (total)
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
 * 2021/10/21 v1.00 - Initial release
 * 2022/04/30 v1.01 - RETRO support for RPG Maker MV!
 * 2022/07/10 v1.02 - OcRam.Battle_Troops.initBattleFixed and initBattleRandom
 *                    JS calls for more dynamic parameter input.
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * -
 */
/*~struct~Pools:
 *
 * @param name
 * @text Name
 * @type Text
 * @desc The name of the pool that can be accessed via plugin commands.
 * @default
 *
 * @param enemies
 * @text Enemy IDs
 * @type enemy[]
 * @desc Enemy IDs included in this named pool.
 * @default ["1", "2", "3"]
 * 
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    // Battle Core parameters...
    const _battlefieldTop = OcRam.getFloat(OcRam.Battle_Core.parameters['Battlefield Top']) || 0.48;
    const _battlefieldBottom = OcRam.getFloat(OcRam.Battle_Core.parameters['Battlefield Bottom']) || 0.68;
    const _otherBattleWindowType = Number(this.parameters['Other Battle Windows']);

    // Dynamic troop parameters...
    //const _excludeEnemies = this.parameters['Exclude Enemies'] || [];
    const _enemyPools = OcRam.getJSONArray(this.parameters['Enemy Pools']);
    const _enemyPosVariance = Number(this.parameters['Enemy Pos Variance']);

    let _troopPosX = [0, 0, 0, 0, 0, 0, 0, 0]; let _troopPosY = [0, 0, 0, 0, 0, 0, 0, 0];
    //let _troopPosX12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; let _troopPosY12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //let _troopPosX16 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; let _troopPosY16 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let _troopMembers = null; let _oldStyleTroops = true; let _forceIds = "";

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        } return array;
    };

    const rndBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const setTroopPositions = (enemyCount) => {
        let tmpPosX = null, tmpPosY = null;
        let row1Y = 0, row2Y = 0, row3Y = 0, row4Y = 0;
        const rowMinX = Graphics.width * 0.08, rowMaxX = Graphics.width * 0.68;
        const rowSpace = (rowMaxX - rowMinX) / 4, ra = rowMinX * 0.5;
        if (enemyCount < 10) { // 3 rows, 3 cols
            const rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
            row1Y = (Graphics.height * _battlefieldTop) | 0;
            row2Y = (Graphics.height * (_battlefieldTop + rstep)) | 0;
            row3Y = (Graphics.height * _battlefieldBottom) | 0;
            tmpPosX = [
                rowMinX, rowMinX + ra, rowMinX + rowSpace,
                rowMinX + rowSpace + ra, rowMinX + rowSpace * 2, (rowMinX + rowSpace * 2) + ra,
                rowMinX + rowSpace * 3, (rowMinX + rowSpace * 3) + ra, (rowMinX + rowSpace * 3) + ra * 2
            ];
            tmpPosY = [row1Y, row2Y, row3Y, row1Y, row2Y, row3Y, row1Y, row2Y, row3Y];
        } else {
            if (enemyCount < 13) { // 3 rows, 4 cols
                const rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
                row1Y = (Graphics.height * _battlefieldTop) | 0;
                row2Y = (Graphics.height * (_battlefieldTop + rstep)) | 0;
                row3Y = (Graphics.height * _battlefieldBottom) | 0;
                tmpPosX = [
                    rowMinX, rowMinX + ra, rowMinX + ra * 2, rowMinX + rowSpace,
                    rowMinX + rowSpace + ra, rowMinX + rowSpace + ra * 2, rowMinX + rowSpace * 2, (rowMinX + rowSpace * 2) + ra,
                    (rowMinX + rowSpace * 2) + ra * 2, rowMinX + rowSpace * 3, (rowMinX + rowSpace * 3) + ra, (rowMinX + rowSpace * 3) + ra * 2
                ];
                tmpPosY = [row1Y, row2Y, row3Y, row1Y, row2Y, row3Y, row1Y, row2Y, row3Y, row1Y, row2Y, row3Y];
            } else { // 4 rows, 4 cols
                const rstep = (_battlefieldBottom - _battlefieldTop) * 0.33;
                row1Y = (Graphics.height * _battlefieldTop) | 0;
                row2Y = (Graphics.height * (_battlefieldTop + rstep)) | 0;
                row3Y = (Graphics.height * (_battlefieldTop + rstep * 2)) | 0;
                row4Y = (Graphics.height * _battlefieldBottom) | 0;
                tmpPosX = [
                    rowMinX, rowMinX + ra, rowMinX + ra * 2, rowMinX + ra * 3,
                    rowMinX + rowSpace, rowMinX + rowSpace + ra, rowMinX + rowSpace + ra * 2, rowMinX + rowSpace + ra * 3,
                    rowMinX + rowSpace * 2, (rowMinX + rowSpace * 2) + ra, (rowMinX + rowSpace * 2) + ra * 2, (rowMinX + rowSpace * 2) + ra * 3,
                    rowMinX + rowSpace * 3, (rowMinX + rowSpace * 3) + ra, (rowMinX + rowSpace * 3) + ra * 2, (rowMinX + rowSpace * 3) + ra * 3
                ];
                tmpPosY = [row1Y, row2Y, row3Y, row4Y, row1Y, row2Y, row3Y, row4Y, row1Y, row2Y, row3Y, row4Y, row1Y, row2Y, row3Y, row4Y];
            }
        }
        _troopPosX = tmpPosX; _troopPosY = tmpPosY;
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.initBattleFixed = fixed_ids => {
        _troopMembers = [];
        fixed_ids.forEach(itm => {
            const n = Number(itm); if (n) _troopMembers.push(n);
        }); if (_troopMembers.length > 0) _oldStyleTroops = false;
    };

    this.initBattleRandom = (fixed_enemies, rnd_enemies, min, max) => {

        _troopMembers = [];
        max = Number(max); min = Number(min);

        fixed_enemies.forEach(itm => { // First get fixed enemies
            const n = Number(itm); if (n) _troopMembers.push(n);
        }); 

        if (_troopMembers.length < max) { // We need more troops?
            const rc = Math.randomBetween(min, max);
            if (rc > _troopMembers.length) { // Yes we do need more troops!
                const rnd_count = rc - _troopMembers.length;
                const rnd_arr = [];
                while (rnd_arr.length < rnd_count) {
                    rnd_arr.push(Number(rnd_enemies[Math.randomBetween(0, rnd_enemies.length - 1)]));
                } rnd_arr.forEach(itm => { _troopMembers.push(itm); });
            }
        }

        if (_troopMembers.length > 0) _oldStyleTroops = false;

    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(Game_Troop, "setup", function (troopId) {

        let rstep = 0; $gameMessage.setBackground(_otherBattleWindowType);

        if (_oldStyleTroops) { // Old style members init
            _this["Game_Troop_setup"].apply(this, arguments);
            if (this._enemies.length < 10) {
                rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
            } else {
                if (this._enemies.length < 13) {
                    rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
                } else {
                    rstep = (_battlefieldBottom - _battlefieldTop) * 0.33;
                }
            }
        } else {

            setTroopPositions(_troopMembers.length);

            this.clear();
            this._troopId = troopId;
            this._enemies = [];

            const max_variant = _enemyPosVariance;
            const min_variant = -(max_variant * 0.5);

            let enemyId = 0; let x = 0; let y = 0; let j = 0;
            let enemy = null; let troop_pos = null;

            // Init arrays
            if (_troopMembers.length < 10) {
                rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
                troop_pos = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            } else {
                if (_troopMembers.length < 13) {
                    rstep = (_battlefieldBottom - _battlefieldTop) * 0.5;
                    troop_pos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                } else {
                    rstep = (_battlefieldBottom - _battlefieldTop) * 0.33;
                    troop_pos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
                }
            } troop_pos = shuffleArray(troop_pos);

            //let cur_col = 4;

            // DYNAMIC members init
            for (let i = 0; i < _troopMembers.length; i++) {
                enemyId = Number(_troopMembers[i]);
                if ($dataEnemies[enemyId]) {
                    const arr_pos = troop_pos[j++];
                    x = Math.floor(_troopPosX[arr_pos] + ((max_variant * Math.random()) + min_variant));
                    y = Math.floor(_troopPosY[arr_pos] + ((max_variant * Math.random()) + min_variant));
                    enemy = new Game_Enemy(enemyId, x, y);
                    enemy.x = x; enemy.y = y;
                    this._enemies.push(enemy);
                    /*if (member.hidden) { enemy.hide(); }*/
                }
            }

            this.makeUniqueNames();

            // Reset init_battle objects
            _oldStyleTroops = true; _troopMembers = null;

        }

        const rowMinX = Graphics.width * 0.08, rowMaxX = Graphics.width * 0.68;
        const rowSpace = (rowMaxX - rowMinX) / 4, ra = rowMinX * 0.5;
        const h = Graphics.height;

        this._enemies.forEach(enemy => {

            const ex = enemy.x; const ey = enemy.y;

            if (ey <= h * (_battlefieldTop + rstep) - _enemyPosVariance) {
                enemy._row = 1;
            } else if (ey <= h * (_battlefieldTop + rstep * 2) - _enemyPosVariance) {
                enemy._row = 2;
            } else if (ey <= h * (_battlefieldTop + rstep * 3) - _enemyPosVariance) {
                enemy._row = 3;
            } else {
                enemy._row = 4;
            }

            if (ex <= (rowMinX) + (ra * enemy._row) - _enemyPosVariance) {
                enemy._col = 4;
            } else if (ex <= (rowMinX + rowSpace) + (ra * enemy._row) - _enemyPosVariance) {
                enemy._col = 3;
            } else if (ex <= (rowMinX + rowSpace * 2) + (ra * enemy._row) - _enemyPosVariance) {
                enemy._col = 2;
            } else {
                enemy._col = 1;
            }

            //console.log(">>>>>", enemy, enemy._col, enemy._row);

        });

    });

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "initBattlePool", function (args) {

        _this.debug("Plugin command: initBattlePool", args);

        const pn = args.poolName;
        const pool = _enemyPools.find(pool => pool.name == pn);
        let rnd_enemies = [];
        try {
            rnd_enemies = JSON.parse(pool.enemies);
        } catch (e) {
            return;
        }

        _troopMembers = [];

        const fixed_enemies = JSON.parse(args.fixedEnemyIdArray);
        const max = Number(args.maxEnemies);

        fixed_enemies.forEach(itm => { // First get fixed enemies
            const n = Number(itm); if (n) _troopMembers.push(n);
        });

        if (_troopMembers.length < max) { // We need more troops?
            const min = Number(args.minEnemies);
            const rc = Math.randomBetween(min, max);
            if (rc > _troopMembers.length) { // Yes we do need more troops!
                const rnd_count = rc - _troopMembers.length;
                const rnd_arr = [];
                while (rnd_arr.length < rnd_count) {
                    rnd_arr.push(Number(rnd_enemies[Math.randomBetween(0, rnd_enemies.length - 1)]));
                } rnd_arr.forEach(itm => { _troopMembers.push(itm); });
            }
        }

        if (_troopMembers.length > 0) _oldStyleTroops = false;

    });

    PluginManager.registerCommand("OcRam_" + this.name, "initBattleFixed", function (args) {
        _this.debug("Plugin command: initBattleFixed", args);
        _this.initBattleFixed(JSON.parse(args.fixedEnemyIdArray));
    });

    PluginManager.registerCommand("OcRam_" + this.name, "initBattleRandom", function (args) {
        _this.debug("Plugin command: initBattleRandom", args); _troopMembers = [];
        _this.initBattleRandom(JSON.parse(args.fixedEnemyIdArray), JSON.parse(args.enemyIdArray), Number(args.minEnemies), Number(args.maxEnemies));
    });

}.bind(OcRam.Battle_Troops)());