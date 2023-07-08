//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Title_Shuffler.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.14) alert("OcRam core v1.14 or greater is required!");

OcRam.addPlugin("Title_Shuffler", "1.02");

/*:
 * @target MZ
 * @plugindesc v1.02 This plugin allows you to create several title screens and shuffle them (and can even randomize weathers with OcRam_Weather_System for each title)!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Weather_System
 * @orderAfter OcRam_Layers
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
 * @param Title pool
 * @type struct<Title>[]
 * @desc These layers are applied to title screen.
 * @default []
 *
 * @param Shuffle time
 * @type number
 * @min 0
 * @max 3600
 * @desc How many seconds each randomized title lasts (max 1h 3600 sec)? 0 = Randomized only on Scene_Title.start
 * @default 30
 *
 * @param Transition time
 * @type number
 * @min 0
 * @max 9999
 * @desc How many frames transition lasts?
 * @default 120
 *
 * @param Always new title
 * @type boolean
 * @desc Won't randomize 2 same titles in row. If title pool count is less than 2, this feature is automatically disabled.
 * @default true
 *
 * @param Persistant title
 * @type boolean
 * @desc Won't randomize title after other scenes (except new game).
 * @default true
 *
 * @param Debug title index
 * @type number
 * @min -1
 * @max 99999
 * @desc Always select this title index (for debugging use). Should be -1, if not debugged.
 * @default -1
 *
 * @param Show splash screen
 * @type boolean
 * @desc IF USED ..\img\titles2\splash.png MUST BE FOUND!
 * @default false
 *
 * @param Splash duration
 * @parent Show splash screen
 * @type number
 * @min 500
 * @max 10000
 * @desc Splash screen shown duration in milliseconds.
 * @default 3000
 *
 * @param Splash SE
 * @parent Show splash screen
 * @type file
 * @dir audio/se
 * @desc Splash screen SE to play when shown.
 * @default 
 *
 * @param Splash SE volume
 * @parent Show splash screen
 * @type number
 * @min 0
 * @max 100
 * @desc Splash screen SE volume.
 * @default 90
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
 * How cool would it be to show different locations from the game world in 
 * title screen?! OcRam_Layers and OcRam_Weather_System is highly recommended 
 * to utilize full potential of this plugin!
 * 
 * Integration to OcRam_Layers will give more depth in title screen and can be
 * used together with Weather System to create some cool weather effects!
 * 
 * TIP: To have any weather more propable than other add it to array several 
 * times example: [3, 3, 3, 4, 0] now weather id 3 has (3 out of 5 chance).
 * And of course add desired title several times to increase it's propability!
 * 
 * NOTE: This plugin will override ANY title layers and title weathers defined
 *       in OcRam_Layers and OcRam_Weather_System!
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
 * 2021/12/01 v1.00 - Initial release for v1.00
 * 2022/01/23 v1.01 - Won't fade out/in screen again nor play title BGS 
 *                    anymore even if new game is started exactly same time 
 *                    with new title or during title screen fade in/out.
 * 2022/04/22 v1.02 - New feature - Splash screen (image + sound effect)! 
 *                    Also works as a small pre-loader for title screen!
 * 
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 * -
 * 
 * @requiredAssets
 * img/titles2/splash.png
 */
/*~struct~Title:
 *
 * @param backSprite1
 * @type file
 * @dir img/titles1
 * @text Backsprite1
 * @desc Back sprite 1
 * @default
 *
 * @param backSprite2
 * @dir img/titles2
 * @type file
 * @text Backsprite2
 * @desc Back sprite 2 (above weather and layers)
 * @default
 *
 * @param layers
 * @type struct<TitleLayers>[]
 * @text Layers
 * @desc These layers will be applied to title screen.
 * @default []
 *
 * @param weathers
 * @type struct<Weather>[]
 * @text Weathers
 * @desc All possible weathers that can occur? (Requires OcRam_Weather_System)
 * @default []
 *
 * @param bgm
 * @type struct<BGM>
 * @text BGM
 * @desc Background music for this title. Empty = System default
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param bgs1
 * @type struct<BGS>
 * @text BGS1
 * @desc BGS1 channel (Warning also Core Weather channel)
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 * @param bgs2
 * @type struct<BGS>
 * @text BGS2
 * @desc BGS2 channel (Warning also Weather channel)
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 *
 */
/*~struct~BGS:
 *
 * @param name
 * @dir audio/bgs
 * @type file
 * @text File
 * @desc Name of the BGS file.
 * @default
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @text Volume
 * @desc Volume of the BGS file.
 * @default 90
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @text Pitch
 * @desc Pitch of the BGS file.
 * @default 100
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @text Pan
 * @desc BGS panning.
 * @default 0
 */
/*~struct~BGM:
 *
 * @param name
 * @dir audio/bgm
 * @type file
 * @text File
 * @desc Name of the BGM file.
 * @default
 *
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @text Volume
 * @desc Volume of the BGM file.
 * @default 90
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @text Pitch
 * @desc Pitch of the BGM file.
 * @default 100
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @text Pan
 * @desc BGM panning.
 * @default 0
 */
/*~struct~Weather:
 *
 * @param weatherId
 * @text Built-in weather
 * @desc Built-in weather.
 * @type select
 * @option None
 * @value 0
 * @option Rain
 * @value -1
 * @option Storm
 * @value -2
 * @option Snow
 * @value -3
 * @option Fireflies
 * @value -4
 * @option Wind (right)
 * @value -5
 * @option Wind (left)
 * @value -6
 * @option Fall
 * @value -7
 * @option Raise
 * @value -8
 * @option Fall (above)
 * @value -9
 * @option Raise (above)
 * @value -10
 * @option Fireworks
 * @value -11
 * @default 0
 * 
 * @param customWeatherId
 * @text *OR* Custom Weather Id
 * @type number
 * @min 0
 * @desc NOTE: If custom weather id is set above 0 "Built-in weather" will be ignored !!!
 * @default 0
 *
 * @param weatherMinPower
 * @type number
 * @min 1
 * @max 9
 * @text Weather min power
 * @desc Minimum weather power
 * @default 1
 *
 * @param weatherMaxPower
 * @type number
 * @min 1
 * @max 9
 * @text Weather max power
 * @desc Maximum weather power
 * @default 9
 *
 * @param weatherParticle
 * @type text
 * @text Weather particle
 * @desc Weather particle image name. Used only in OcRam_Weather_System 'support' weathers.
 * @default default_particle
 *
 * @param weatherSpeed
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3
 * @text Weather speed
 * @desc Weather particle speed. Used only in OcRam_Weather_System 'support' weathers.
 * @default 1.00
 *
 * @param weatherRotation
 * @type number
 * @decimals 2
 * @min -3
 * @max 3
 * @text Weather rotation
 * @desc Weather rotation speed. Used only in OcRam_Weather_System 'support' weathers.
 * @default 1.00
 *
 * @param weatherDynamic
 * @type boolean
 * @text Dynamic weather
 * @desc Does weather power effect in speed and rotation also?
 * @default true
 */
/*~struct~TitleLayers:
 *
 * @param zIndex
 * @type select
 * @option Behind title bg1
 * @value 0
 * @option Above title bg1
 * @value 1
 * @option Above all
 * @value 2
 * @text Z-Index
 * @desc What is the z-index of this layer?
 * @default 1
 *
 * @param imageName
 * @type file
 * @dir img/pictures
 * @desc The name of the image set as layer background.
 * @text Image name
 * @default my_image
 *
 * @param opacity
 * @type number
 * @max 255
 * @min 0
 * @desc Opacity for this template.
 * @text Opacity
 * @default 255
 *
 * @param fader
 * @type number
 * @max 255.00
 * @min 0.01
 * @decimals 2
 * @text Fader
 * @desc Gain X opacity per frame
 * @default 255.00
 *
 * @param scrollX
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @text ScrollX
 * @desc Scroll layer horizontally n pixels per frame.
 * @default 0.000
 *
 * @param scrollY
 * @type number
 * @max 9999
 * @min -9999
 * @decimals 3
 * @text ScrollY
 * @desc Scroll layer vertically n pixels per frame.
 * @default 0.000
 *
 * @param animFrames
 * @type number
 * @decimals 0
 * @max 99
 * @min 0
 * @text Anim Frames
 * @desc How many animation frames this layer has? (see help for naming image files)
 * @default 0
 *
 * @param animRate
 * @type number
 * @decimals 0
 * @max 99999
 * @min 0
 * @text Anim Rate
 * @desc How many ms there is between animation frames?
 * @default 0
 *
 * @param offsetX
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text OffsetX
 * @desc Layer horizontal offset.
 *
 * @param offsetY
 * @type number
 * @decimals 0
 * @max 99999
 * @min -99999
 * @default 0
 * @text OffsetY
 * @desc Layer vertical offset.
 * 
 * @
~*/ // End of structs

function Scene_Splash() {
    this.initialize(...arguments);
}

Scene_Splash.prototype = Object.create(Scene_Base.prototype);
Scene_Splash.prototype.constructor = Scene_Splash;

Scene_Splash.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._duration = Number(OcRam.Title_Shuffler.parameters['Splash duration'] || 500);
    if (this._duration < 500) this._duration = 500;
    if (this._duration > 10000) this._duration = 10000;
};

Scene_Splash.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
};

Scene_Splash.prototype.isTitle = () => true;

Scene_Splash.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
};

Scene_Splash.prototype.isBusy = function () {
    return Scene_Base.prototype.isBusy.call(this);
};

Scene_Splash.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
    if (this._gameTitleSprite) {
        this._gameTitleSprite.bitmap.destroy();
    }
};

Scene_Splash.prototype.createBackground = function () {
    this._backSprite1 = new Sprite(
        ImageManager.loadTitle2("splash")
    ); this.addChild(this._backSprite1);
};

Scene_Splash.prototype.adjustBackground = function () {
    this.scaleSprite(this._backSprite1);
    this.centerSprite(this._backSprite1);
};

if (!OcRam.isMZ()) {
    Scene_Splash.prototype.centerSprite = function (sprite) {
        sprite.x = Graphics.width / 2;
        sprite.y = Graphics.height / 2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
    };
}

Scene_Splash.prototype.playSplashSE = function () {
    AudioManager.stopBgm(); AudioManager.stopBgs(); AudioManager.stopMe();
    const se_name = OcRam.Title_Shuffler.parameters['Splash SE'] || '';
    const se_vol = Number(OcRam.Title_Shuffler.parameters['Splash SE volume']) || 0;
    if (se_name && se_vol) {
        AudioManager.playSe({
            name: se_name,
            volume: se_vol,
            pitch: 100,
            pan: 0, pos: 0
        });
    }
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _titlePoolRaw = OcRam.getJSON(this.parameters['Title pool']) || [];
    const _shuffleTime = Number(this.parameters['Shuffle time']);
    const _transitionTime = Number(this.parameters['Transition time']);
    let _alwaysNewTitle = OcRam.getBoolean(this.parameters['Always new title']);
    const _persistantTitleParam = OcRam.getBoolean(this.parameters['Persistant title']);
    const _debugTitleIndex = Number(this.parameters['Debug title index']);
    const _showSplashScreen = OcRam.getBoolean(this.parameters['Show splash screen']);
    
    if (_showSplashScreen) {
        Scene_Boot.prototype.startNormalGame = function () {
            this.checkPlayerLocation();
            SceneManager.goto(Scene_Splash);
        };
    }

    let _titlePool = []; let _ivHandle = 0;
    let _prevTitleIndex = -1; let _persistantTitle = null;
    let _forceBackSprite2ToTop = true; let _preBGM = "";
    let _currentTitleIndex = 0; let _newGameStarted = false;

    // Get raw title objects from title pool and parse them!
    _titlePoolRaw.forEach(tl => {
        const json_title = JSON.parse(tl);
        let tmp_arr = JSON.parse(json_title.layers);
        json_title.layers = tmp_arr;
        tmp_arr = [];
        json_title.layers.forEach(l => {
            tmp_arr.push(JSON.parse(l));
        }); json_title.layers = tmp_arr;
        json_title.layers.forEach(l => {
            l.zIndex = Number(l.zIndex);
            l.opacity = Number(l.opacity);
            l.fader = OcRam.getFloat(l.fader);
            l.scrollX = OcRam.getFloat(l.scrollX);
            l.scrollY = OcRam.getFloat(l.scrollY);
            l.offsetX = OcRam.getFloat(l.offsetX);
            l.offsetY = OcRam.getFloat(l.offsetY);
        }); json_title.weathers = OcRam.getJSONArray(json_title.weathers);
        tmp_arr = [];
        json_title.weathers.forEach(w => {
            w.weatherId = Number(w.weatherId);
            w.customWeatherId = Number(w.customWeatherId);
            w.weatherMinPower = Number(w.weatherMinPower);
            w.weatherMaxPower = Number(w.weatherMaxPower);
            w.weatherSpeed = OcRam.getFloat(w.weatherSpeed);
            w.weatherRotation = OcRam.getFloat(w.weatherRotation);
            w.weatherDynamic = OcRam.getBoolean(w.weatherDynamic);
            w.weatherParticle = "" + w.weatherParticle;
            ImageManager.loadOcRamBitmap(w.weatherParticle);
            tmp_arr.push(w);
        }); json_title.weathers = tmp_arr;
        json_title.weatherMinPower = Number(json_title.weatherMinPower);
        json_title.weatherMaxPower = Number(json_title.weatherMaxPower);
        json_title.backSprite1 = (json_title.backSprite1 + "").trim().toLowerCase();
        _titlePool.push(json_title);
    });

    Scene_Splash.prototype.start = function () {

        Scene_Base.prototype.start.call(this);

        if (OcRam.Misc && OcRam.getBoolean(OcRam.Misc.parameters['Start full screen'])) Graphics._requestFullScreen();

        SceneManager.clearStack();

        this.adjustBackground();
        this.startFadeIn(this.slowFadeSpeed(), false);

        DataManager.setupNewGame();

        _titlePool.forEach(title => {
            const bgm = OcRam.getJSON(title.bgm);
            if (bgm) { AudioManager.playBgm({ name: bgm.name, volume: 0, pitch: 100, pan: 0, pos: 0 }); AudioManager.stopBgm(); }
            const bgs1 = OcRam.getJSON(title.bgs1); const bgs2 = OcRam.getJSON(title.bgs2);
            if (bgs1) { AudioManager.playBgs({ name: bgs1.name, volume: 0, pitch: 100, pan: 0, pos: 0 }); AudioManager.stopBgs(); }
            if (bgs2) { AudioManager.playBgs({ name: bgs2.name, volume: 0, pitch: 100, pan: 0, pos: 0 }); AudioManager.stopBgs(); }
            const bm1 = title.backSprite1 ? ImageManager.loadTitle1(title.backSprite1) : null;
            const bm2 = title.backSprite2 ? ImageManager.loadTitle2(title.backSprite2) : null;
            if (bm1 && bm2) { } // Guess what this does?
        });

        const bgm = { ...$dataSystem.titleBgm };
        bgm.volume = 0; AudioManager.playBgm(bgm); AudioManager.stopBgm();
        const bm1 = ImageManager.loadTitle1($dataSystem.title1Name);
        const bm2 = ImageManager.loadTitle2($dataSystem.title2Name);
        if (bm1 && bm2) { } // Guess what this does?

        this._toh = setTimeout(() => {

            this.startFadeOut(this.slowFadeSpeed(), false);

            setTimeout(() => {
                SceneManager.goto(Scene_Title);
                Window_TitleCommand.initCommandPosition();
            }, (this.slowFadeSpeed() / 60) * 1000);

        }, this._duration);

        this.playSplashSE();

    };

    const preLoadTitles = () => {
        _titlePool.forEach(title => {
            const t1 = ImageManager.loadTitle1(title.backSprite1);
            const t2 = ImageManager.loadTitle2(title.backSprite2);
        });
    }; preLoadTitles(); 

    if (_titlePool.length < 2) _alwaysNewTitle = false;

    if (!OcRam.isMZ()) { // Some MV Compatibility code

        this.debug("MV detected!")

        Scene_Title.prototype.adjustBackground = function () {
            this.scaleSprite(this._backSprite1);
            this.scaleSprite(this._backSprite2);
            this.centerSprite(this._backSprite1);
            this.centerSprite(this._backSprite2);
        };

        Scene_Base.prototype.scaleSprite = function (sprite) {
            const ratioX = Graphics.width / sprite.bitmap.width;
            const ratioY = Graphics.height / sprite.bitmap.height;
            const scale = Math.max(ratioX, ratioY, 1.0);
            sprite.scale.x = scale;
            sprite.scale.y = scale;
        };

        Spriteset_Base.prototype.pictureContainerRect = function () {
            return new Rectangle(0, 0, Graphics.width, Graphics.height);
        };

    }

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    const waitAnimFrames = (cb, count) => {
        if (count) {
            requestAnimationFrame(() => {
                waitAnimFrames(cb, --count);
            }); return;
        } cb.call();
    };

    const validateAudio = json_audio => {
        let ret = json_audio;
        try {
            ret = JSON.parse(ret);
            ret.volume = Number(ret.volume);
            ret.pitch = Number(ret.pitch);
            ret.pan = Number(ret.pan);
            return ret;
        } catch (e) {
            return { name: "", volume: 90, pitch: 100, pan: 0 };
        }
    };

    this.getTitleWeather = () => {
        return _titlePool[_currentTitleIndex];
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(Scene_Title, "start", function () {
        if (!OcRam.isMZ()) preLoadTitles();
        if (_ivHandle) clearInterval(_ivHandle);
        if (_shuffleTime > (_transitionTime / 60)) {
            _ivHandle = setInterval(() => {
                if (!SceneManager.isGameActive()) return;
                if (_newGameStarted) { _newGameStarted = false; return; }
                if (OcRam.scene()) {
                    _persistantTitle = null;
                    this.randomizeTitle();
                }
            }, _shuffleTime * 1000);
        } _this["Scene_Title_start"].apply(this, arguments);
        requestAnimationFrame(() => {
            this.randomizeTitle(true);
        });
    });

    if (!OcRam.isMZ()) {
        this.extend(Scene_Title, "commandNewGame", function () {
            _newGameStarted = true;
            const container = this._spriteset || this;
            this._backSprite2.opacity = 0;
            if (this._backSprite2) container.removeChild(this._backSprite2);
            _this["Scene_Title_commandNewGame"].apply(this, arguments);
        });
    } else {
        this.extend(Scene_Title, "commandNewGame", function () {
            _newGameStarted = true; _this["Scene_Title_commandNewGame"].apply(this, arguments);
        });
    }

    this.extend(Scene_Title, "terminate", function () {
        if (_ivHandle) clearInterval(_ivHandle);
        _this["Scene_Title_terminate"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Scene_Title.prototype.modifyBackground = function (obj_title) { // NEW

        const container = this._spriteset || this;

        // Background and layers
        if (this._backSprite1) container.removeChild(this._backSprite1);
        this._backSprite1 = new Sprite(
            ImageManager.loadTitle1(obj_title.backSprite1 || "")
        ); container.addChild(this._backSprite1);

        if (_forceBackSprite2ToTop) {
            if (this._backSprite2) this.removeChild(this._backSprite2);
            this._backSprite2 = new Sprite(
                ImageManager.loadTitle2(obj_title.backSprite2 || "")
            );
            this._backSprite2.z = 101;
            this.addChild(this._backSprite2);
        } else {
            if (this._backSprite2) container.removeChild(this._backSprite2);
            this._backSprite2 = new Sprite(
                ImageManager.loadTitle2(obj_title.backSprite2 || "")
            );
            this._backSprite2.z = 101;
            container.addChild(this._backSprite2);
        }

        if (Imported.OcRam_Layers) OcRam.Layers.setTitleLayers(obj_title.layers);

        // Foreground and pictures
        if (this._gameTitleSprite) container.removeChild(this._gameTitleSprite);
        if (this._spriteset && this._spriteset._pictureContainer) this._spriteset.removeChild(this._spriteset._pictureContainer);

        this._gameTitleSprite = new Sprite(
            new Bitmap(Graphics.width, Graphics.height)
        );

        container.addChild(this._gameTitleSprite);
        if ($dataSystem.optDrawTitle) {
            this.drawGameTitle();
        } this.drawTitleInfo();

        if (this._spriteset) {
            this._spriteset.createPictures_OC();
        }

        this.adjustBackground();

        if (!OcRam.isMZ() && this._spriteset) this._spriteset.reCreateScreenSprites();

        if (!this._spriteset) { // Re-init window layer if not spriteset...

            if (Imported.OcRam_Weather_System && this.createWeatherContainer) {
                if (this._weatherContainer) {
                    this.removeChild(this._weatherContainer);
                    this._weatherContainer = null;
                    this.createWeatherContainer();
                }
            } this.removeChild(this._windowLayer);
            this.createWindowLayer(); this.createCommandWindow();

        }

    };

    Scene_Title.prototype.applyNewTitle = function (obj_title, no_transition) {

        _this.debug("applyNewTitle:", obj_title);
        
        if (!obj_title) return;

        const bgm = validateAudio(obj_title.bgm);

        if (bgm.name) {
            if (_preBGM != bgm.name) {
                _preBGM = bgm.name;
                const this_bgm = { name: bgm.name, volume: bgm.volume, pitch: bgm.pitch, pan: bgm.pan, pos: 0 };
                AudioManager.playBgm(this_bgm);
            }
        } else {
            if (_preBGM != $dataSystem.titleBgm.name) {
                _preBGM = $dataSystem.titleBgm.name;
                AudioManager.playBgm($dataSystem.titleBgm);
            }
        }

        if (!no_transition) $gameScreen.startFadeOut(1);
        if (Imported.OcRam_Layers) {
            OcRam.Layers.clearOnNewTitle();
        } $gameScreen.clearPictures();

        if (Imported.OcRam_Weather_System) {
            let rnd_weather = obj_title.weathers[Math.randomBetween(0, obj_title.weathers.length - 1)];
            let rnd_power = Math.randomBetween(rnd_weather.weatherMinPower, rnd_weather.weatherMaxPower);
            if (!_persistantTitle[1]) {
                _persistantTitle[1] = rnd_weather; _persistantTitle[2] = rnd_power;
            } else {
                rnd_weather = _persistantTitle[1];
                rnd_power = Number(_persistantTitle[2]);
                OcRam.Weather_System.setTitleWeather(0, 0);
            } OcRam.Weather_System.setTitleWeather(rnd_weather, rnd_power);
        }

        requestAnimationFrame(() => { // Give some time for "clearOnNewTitle"
            this.modifyBackground(obj_title);
            if (!no_transition) {
                $gameScreen.startFadeIn(_transitionTime * 0.5);
                if (!OcRam.isMZ()) this.startFadeIn(_transitionTime * 0.5, false);
            }
        });
        
        const bgs1 = validateAudio(obj_title.bgs1);
        const bgs2 = validateAudio(obj_title.bgs2);

        AudioManager._keepBGS23 = false;

        setTimeout(() => {
            if (AudioManager._currentBgs2 && AudioManager._currentBgs2.name) return;
            if (bgs1.name) {
                const this_bgs = { name: bgs1.name, volume: bgs1.volume, pitch: bgs1.pitch, pan: bgs1.pan, pos: 0 };
                AudioManager.playBgs2(this_bgs);
            } else {
                AudioManager.stopBgs2();
            } if (AudioManager._currentBgs3 && AudioManager._currentBgs3.name) return;
            if (bgs2.name) {
                const this_bgs = { name: bgs2.name, volume: bgs2.volume, pitch: bgs2.pitch, pan: bgs2.pan, pos: 0 };
                AudioManager.playBgs3(this_bgs);
            } else {
                AudioManager.stopBgs3();
            } AudioManager._keepBGS23 = true;
        }, 500);

    };

    Scene_Title.prototype.randomizeTitle = function (no_transition) {

        _currentTitleIndex = Math.randomBetween(0, _titlePool.length - 1);

        if (_alwaysNewTitle) {
            while (_prevTitleIndex == _currentTitleIndex) {
                _currentTitleIndex = Math.randomBetween(0, _titlePool.length - 1);
            }
        } _prevTitleIndex = _currentTitleIndex;

        if (Number(_debugTitleIndex) > -1 && _debugTitleIndex < _titlePool.length) _currentTitleIndex = _debugTitleIndex;

        if (_persistantTitleParam) {
            if (!_persistantTitle) {
                _persistantTitle = [_currentTitleIndex, null, null];
            } else {
                _currentTitleIndex = Number(_persistantTitle[0]);
            }
        } else {
            _persistantTitle = [_currentTitleIndex, null, null];
        }
        
        const rnd_title = _titlePool[_currentTitleIndex];
        if (!no_transition) { // Do transition
            $gameScreen.startFadeOut(_transitionTime * 0.5);
            if (!OcRam.isMZ()) this.startFadeOut(_transitionTime * 0.5, false);
            waitAnimFrames(() => {
                if (_newGameStarted) {
                    _newGameStarted = false; return;
                } this.applyNewTitle(rnd_title, no_transition);
            }, _transitionTime);
        } else {
            this.applyNewTitle(rnd_title, no_transition);
        }

    };

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => {
        _newGameStarted = false;
        _titlePool.forEach(title => {
            _persistantTitle = null;
            ImageManager.loadTitle1(title.backSprite1);
            ImageManager.loadTitle2(title.backSprite2);
        });
    }; this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = sm => { };

}.bind(OcRam.Title_Shuffler)());