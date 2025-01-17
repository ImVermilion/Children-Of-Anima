/*
 * Copyright (c) 2024 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */


/*:
 * @plugindesc (v.1.1)[PRO] Map Enhancer
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/map-enhancer/

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * GUIDE:
 * https://gist.github.com/KageDesu/8696344b17602c9e160e483a11cb752a
 *
 * ---------------------------------------------------------------------------
 
 *
 * If you like my Plugins, want more and offten updates, please support me
 * on one of the following platforms:
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param PKD_MapEnhancer
 * @text Map Enhancer Settings
 * 
 * 

 * 
 * 
 * @param openEditorKey
 * @parent PKD_MapEnhancer
 * @text Open Editor Key
 * @type select
 * @option F1
 * @option F3
 * @option F6
 * @option F7
 * @option F10
 * @option F11
 * @default F10
 * 
 * 
 * 

 * 
 * 
 * @param editorHelpLanguageIndex:int
 * @parent PKD_MapEnhancer
 * @text Help Language Index
 * @type select
 * @option English
 * @value 0
 * @option Русский
 * @value 1
 * @option 中文
 * @value 2
 * @default 0
 * @desc Editor Help Language Index
 * 
 * 

 * 
 * 
 * @param editorWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text Editor Window Size
 * @type struct<WindowSize>
 * @default {"width:int":"540","height:int":"800"}
 * 
 * 

 * 
 * 
 * @param helpWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text Help Window Size
 * @type struct<WindowSize>
 * @default {"width:int":"820","height:int":"240"}
 * 
 * 

 * 
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*:ru
 * @plugindesc (v.1.1)[PRO] Map Enhancer
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/map-enhancer/

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * РУКОВОДСТВО:
 * https://gist.github.com/KageDesu/8696344b17602c9e160e483a11cb752a
 *
 * ---------------------------------------------------------------------------
 
 *
 * Если вам нравятся мои плагины, вы хотите больше и частых обновлений,
 * пожалуйста, поддержите меня на одной из следующих платформ:
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param PKD_MapEnhancer
 * @text Map Enhancer Settings
 * 
 * 

 * 
 * 
 * @param openEditorKey
 * @parent PKD_MapEnhancer
 * @text Клавиша открытия редактора
 * @type select
 * @option F1
 * @option F3
 * @option F6
 * @option F7
 * @option F10
 * @option F11
 * @default F10
 * 
 * 
 * 

 * 
 * 
 * @param editorHelpLanguageIndex:int
 * @parent PKD_MapEnhancer
 * @text Индекс языка помощи
 * @type select
 * @option English
 * @value 0
 * @option Русский
 * @value 1
 * @option 中文
 * @value 2
 * @default 0
 * @desc Индекс языка помощи редактора
 * 
 * 

 * 
 * 
 * @param editorWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text Размер окна редактора
 * @type struct<WindowSize>
 * @default {"width:int":"540","height:int":"800"}
 * 
 * 

 * 
 * 
 * @param helpWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text Размер окна помощи
 * @type struct<WindowSize>
 * @default {"width:int":"820","height:int":"240"}
 * 
 * 

 * 
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*:zh-cn
 * @plugindesc (v.1.1)[PRO] Map Enhancer
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/map-enhancer/

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * 指南:
 * https://gist.github.com/KageDesu/8696344b17602c9e160e483a11cb752a
 *
 * ---------------------------------------------------------------------------
 
 *
 * 如果 您喜欢我的插件，想要更多和更频繁的更新，请在以下平台上支持我：
 *
 * Boosty:
 *     https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 * 
 * @param PKD_MapEnhancer
 * @text Map Enhancer Settings
 * 
 * 

 * 
 * 
 * @param openEditorKey
 * @parent PKD_MapEnhancer
 * @text 打开编辑器键
 * @type select
 * @option F1
 * @option F3
 * @option F6
 * @option F7
 * @option F10
 * @option F11
 * @default F10
 * 
 * 
 * 

 * 
 * 
 * @param editorHelpLanguageIndex:int
 * @parent PKD_MapEnhancer
 * @text 帮助语言索引
 * @type select
 * @option English
 * @value 0
 * @option Русский
 * @value 1
 * @option 中文
 * @value 2
 * @default 0
 * @desc 编辑器帮助语言索引
 * 
 * 

 * 
 * 
 * @param editorWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text 编辑器窗口大小
 * @type struct<WindowSize>
 * @default {"width:int":"540","height:int":"800"}
 * 
 * 

 * 
 * 
 * @param helpWindowSize:struct
 * @parent PKD_MapEnhancer
 * @text 帮助窗口大小
 * @type struct<WindowSize>
 * @default {"width:int":"820","height:int":"240"}
 * 
 * 

 * 
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*~struct~WindowSize:

@param width:int
@text Width
@type number
@default 816
@min 100




@param height:int
@text Height
@type number
@default 624
@min 100

*/

/*~struct~WindowSize:ru

@param width:int
@text Ширина
@type number
@default 816
@min 100




@param height:int
@text Высота
@type number
@default 624
@min 100

*/

/*~struct~WindowSize:zh-ch

@param width:int
@text 宽度
@type number
@default 816
@min 100




@param height:int
@text 高度
@type number
@default 624
@min 100

*/




var Imported;
(function (Imported) {
    Imported.PKD_MapEnhancer = true;
})(Imported || (Imported = {}));
//%[IDEA] Regions placement Mode! (Mode 4)
//%[IDEA] Список объектов в режиме слоёв (чтобы было видно наглядно какие объекты на слое и кнопка удалить напротив каждого)
//%[IDEA] Zoom Screen - как инструмент для увеличения экрана, чтобы можно было более точно работать с объектами
//%[IDEA] .GIF support
//%[IDEA] Spine support
//%[IDEA] Вызовы скриптов для добавления объектов и коллизий на карту, очистки карты, перезагрузки условий слоев
//%[IDEA] Возможность переназначать клавиши
//%[IDEA] Фильтры для объектов? Тень, обводка и т.д.
//%[IDEA] Добавить возможность менять размер объектов в списке (меньше клетки + больше столбцов)
// - сделать кнопку в самом редакторе (перключение между двумя видами, большие и маленькие плитки), рядом с кнопкой выбора папки
var PKD_MapEnhancer;
(function (PKD_MapEnhancer) {
    PKD_MapEnhancer.Version = "1.1";
    /**
     * Get NUI file from plugin
     * @param {string} name - Name of file
     * @returns {any} - File content
    */
    function GetNUIFile(name) {
        return window["$PKD_MapEnhancer_" + name];
    }
    PKD_MapEnhancer.GetNUIFile = GetNUIFile;
    /**
     * Link object to plugin scope level
     * @param {any} obj - Object to link
     * @param {string} name? - Name of object (optional)
     * @returns {void}
     *
    */
    function Link(obj, name) {
        try {
            if ((name === null || name === void 0 ? void 0 : name.length) > 0) {
                PKD_MapEnhancer[name] = obj;
            }
            else {
                let _name = obj.name;
                if ((_name === null || _name === void 0 ? void 0 : _name.length) > 0) {
                    PKD_MapEnhancer[obj.name] = obj;
                }
                else {
                    console.warn("You try link object with empty name");
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    PKD_MapEnhancer.Link = Link;
})(PKD_MapEnhancer || (PKD_MapEnhancer = {}));


(function(){



var KDNUI;
(function (KDNUI) {
    /**
     * The version of the KDNUI Library.
     * @type {string}
     */
    KDNUI.Version = "1.5";
    /**
     * Add NUI file to the list of files to be loaded.
     * @type {string} - The folder where the file is located.
     * @type {string} - The name of the file (without extension).
     */
    function RegisterNUIFile(folder, filnename) {
        let _name = "$" + folder + "_" + filnename;
        let src = folder + "/" + filnename + ".json";
        /* @ts-ignore */
        DataManager._databaseFiles.push({ name: _name, src: src });
    }
    KDNUI.RegisterNUIFile = RegisterNUIFile;
    /**
     * Creates a `KNSprite` instance from a given scheme and optionally attaches it to a parent or owner.
     *
     * @param scheme - The scheme to create the sprite from. It can be either a `NUIScheme` or a record of `NUIScheme`.
     * @param owner - (Optional) The owner object to bind the sprite to.
     * @param parent - (Optional) The parent `Sprite` to attach the created sprite to.
     * @returns The created `KNSprite` instance or `null` if creation fails.
     *
     * @remarks
     * - If the `scheme` contains a `type`, it uses `KNBuilder.Make` to create the sprite.
     * - If the `scheme` is a record of `NUIScheme`, it uses `KNBuilder.Factory` to create the sprite.
     * - If a `parent` is provided, the created sprite is added as a child to the parent.
     * - If no `parent` is provided but an `owner` with an `addChild` method is provided, the sprite is added as a child to the owner.
     * - The created sprite's bindings are refreshed with the owner.
     * - If an error occurs during creation, a warning is logged and a new `KNSprite` instance is returned.
     */
    function FromScheme(scheme, owner, parent) {
        try {
            let element;
            if (KDX.any(scheme) && KDX.any(scheme['type'])) {
                element = KNBuilder.Make(scheme, owner, parent);
            }
            else if (KDX.any(scheme)) {
                element = KNBuilder.Factory(scheme, owner, 100)[0];
            }
            if (KDX.any(element)) {
                if (KDX.any(parent)) {
                    parent.addChild(element);
                }
                else {
                    if (KDX.any(owner) && owner['addChild']) {
                        owner['addChild'](element);
                    }
                }
                element.refreshBindings(owner, true);
                return element;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return new KNSprite();
    }
    KDNUI.FromScheme = FromScheme;
})(KDNUI || (KDNUI = {}));
(function () {
    if (Utils.RPGMAKER_NAME.includes("MV"))
        return;
    // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
    // * Данный фикс, возвращает старое поведение
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Bitmap.ts
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    (() => {
        //@[DEFINES]
        const _ = Bitmap.prototype;
        if (Bitmap['_isExtenedByKDNUI'])
            return;
        Bitmap['_isExtenedByKDNUI'] = true;
        //@[ALIAS]
        /*@ts-ignore*/
        const ALIAS___startLoading = _._startLoading;
        _['_startLoading'] = function (...args) {
            /*@ts-ignore*/
            if (Utils.hasEncryptedImages()) {
                ALIAS___startLoading.call(this, ...args);
            }
            else {
                this._image = new Image();
                this._image.onload = this._onLoad.bind(this);
                this._image.onerror = this._onError.bind(this);
                this._destroyCanvas();
                this._loadingState = 'loading';
                this._image.src = this._url;
            }
        };
    })();
    // ■ END Bitmap.ts
    //---------------------------------------------------------------------------
})();
/**
* All available NUI elements types.
*/
var KNItemsTypes;
(function (KNItemsTypes) {
    KNItemsTypes["rect"] = "rect";
    KNItemsTypes["circle"] = "circle";
    KNItemsTypes["plane"] = "plane";
    KNItemsTypes["text"] = "text";
    KNItemsTypes["image"] = "image";
    KNItemsTypes["group"] = "group";
    KNItemsTypes["screen"] = "screen";
    KNItemsTypes["textPro"] = "textPro";
    KNItemsTypes["button"] = "button";
    KNItemsTypes["imageButton"] = "imageButton";
    KNItemsTypes["list"] = "list";
    KNItemsTypes["face"] = "face";
    KNItemsTypes["gauge"] = "gauge";
})(KNItemsTypes || (KNItemsTypes = {}));
var KNSpriteEffects;
(function (KNSpriteEffects) {
    KNSpriteEffects["Blur"] = "blur";
    KNSpriteEffects["Shadow"] = "shadow";
    KNSpriteEffects["Outline"] = "outline";
    KNSpriteEffects["Glow"] = "glow";
    KNSpriteEffects["Tint"] = "tint";
    KNSpriteEffects["Desaturate"] = "desaturate";
})(KNSpriteEffects || (KNSpriteEffects = {}));
var KBitmap;
(function (KBitmap) {
    let _loadedIconsCache = {};
    let _emptyBitmap = null;
    /**
     * Draws an icon onto the specified bitmap at the given coordinates.
     *
     * @param inputBitmap - The bitmap on which the icon will be drawn.
     * @param icon - The icon to draw, which can be either an icon index (number) or a Bitmap.
     * @param x - The x-coordinate where the icon will be drawn.
     * @param y - The y-coordinate where the icon will be drawn.
     * @param size - The size of the icon to draw. Defaults to 32.
     *
     * @throws Will log a warning to the console if an error occurs during the drawing process.
     */
    function DrawIcon(inputBitmap, icon, x, y, size = 32) {
        try {
            let bitmapToDraw = null;
            if (icon instanceof Bitmap) {
                bitmapToDraw = icon;
            }
            else {
                bitmapToDraw = GetIconBitmap(icon);
            }
            DrawInside(inputBitmap, bitmapToDraw, x, y, size, size);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KBitmap.DrawIcon = DrawIcon;
    /**
     * Draws a bitmap inside another bitmap at the specified coordinates.
     *
     * @param inputBitmap - The bitmap where the other bitmap will be drawn.
     * @param bitmapToDraw - The bitmap to draw inside the input bitmap.
     * @param x - The x-coordinate where the bitmap will be drawn.
     * @param y - The y-coordinate where the bitmap will be drawn.
     * @param sw - The width to scale the drawn bitmap to. Defaults to the width of the bitmap to draw.
     * @param sh - The height to scale the drawn bitmap to. Defaults to the height of the bitmap to draw.
     *
     * @throws Will log a warning to the console if an error occurs during the drawing process.
     */
    function DrawInside(inputBitmap, bitmapToDraw, x, y, sw = 0, sh = 0) {
        try {
            if (sw <= 0)
                sw = bitmapToDraw.width;
            if (sh <= 0)
                sh = bitmapToDraw.height;
            inputBitmap.blt(bitmapToDraw, 0, 0, bitmapToDraw.width, bitmapToDraw.height, x, y, sw, sh);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KBitmap.DrawInside = DrawInside;
    /**
     * Fills the input bitmap with the contents of another bitmap.
     *
     * @param inputBitmap - The bitmap to be filled.
     * @param bitmapToFill - The bitmap used to fill the input bitmap.
     */
    function FillWith(inputBitmap, bitmapToFill) {
        try {
            DrawInside(inputBitmap, bitmapToFill, 0, 0, inputBitmap.width, inputBitmap.height);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KBitmap.FillWith = FillWith;
    /**
     * Draws the specified text on the given bitmap at the specified position.
     *
     * @param inputBitmap - The bitmap on which the text will be drawn.
     * @param text - The text to be drawn on the bitmap.
     * @param position - The position where the text will be aligned. Can be 'center', 'left', or 'right'.
     *
     * @throws Will log a warning to the console if an error occurs during the drawing process.
     */
    function DrawTextFull(inputBitmap, text, position) {
        try {
            inputBitmap.drawText(text, 0, 0, inputBitmap.width, inputBitmap.height, position);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KBitmap.DrawTextFull = DrawTextFull;
    /**
     * Returns a singleton instance of an empty Bitmap.
     * If the instance does not exist, it creates a new Bitmap.
     *
     * @returns {Bitmap} A singleton instance of an empty Bitmap.
     */
    function GetEmptyBitmap() {
        if (!_emptyBitmap) {
            _emptyBitmap = new Bitmap();
        }
        return _emptyBitmap;
    }
    KBitmap.GetEmptyBitmap = GetEmptyBitmap;
    /**
     * Retrieves the bitmap for a specified icon index. If the icon is not already cached,
     * it loads the icon from the system icon set, caches it, and then returns the bitmap.
     * If an error occurs during this process, an empty bitmap is returned.
     *
     * @param {number} iconIndex - The index of the icon to retrieve.
     * @returns {Bitmap} The bitmap of the specified icon, or an empty bitmap if an error occurs.
     */
    function GetIconBitmap(iconIndex) {
        try {
            if (!_loadedIconsCache[iconIndex]) {
                let iconset = ImageManager.loadSystem("IconSet");
                let pw = 0;
                let ph = 0;
                if (KDX.isMV()) {
                    /* @ts-ignore */
                    pw = Window_Base._iconWidth;
                    /* @ts-ignore */
                    ph = Window_Base._iconHeight;
                }
                else {
                    pw = ImageManager.iconWidth;
                    ph = ImageManager.iconHeight;
                }
                let sx = iconIndex % 16 * pw;
                let sy = Math.floor(iconIndex / 16) * ph;
                let iconBitmap = new Bitmap(pw, ph);
                iconBitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
                _loadedIconsCache[iconIndex] = iconBitmap;
            }
            return _loadedIconsCache[iconIndex];
        }
        catch (error) {
            console.warn(error);
            return GetEmptyBitmap();
        }
    }
})(KBitmap || (KBitmap = {}));
var KColor;
(function (KColor) {
    /**
     * Generates a random hexadecimal color code.
     *
     * @returns A string representing a random color code in the format "#RRGGBB".
     */
    function Random() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    KColor.Random = Random;
    /**
     * Generates a lighter shade of the given hex color by a specified factor.
     *
     * @param {string} hex - The hex color code to lighten.
     * @param {number} [factor=0.2] - The factor by which to lighten the color. Default is 0.2.
     * @returns {string} The hex color code of the lighter shade.
     * @throws Will log a warning and return `#000000` if the input hex color is invalid.
     */
    function LighterColor(hex, factor = 0.2) {
        try {
            let [r, g, b] = HexToColor(hex);
            r = Math.min(255, r + 255 * factor);
            g = Math.min(255, g + 255 * factor);
            b = Math.min(255, b + 255 * factor);
            return HexFromColor(r, g, b);
        }
        catch (error) {
            console.warn(error);
            return `#000000`;
        }
    }
    KColor.LighterColor = LighterColor;
    /**
     * Darkens a given hex color by a specified factor.
     *
     * @param {string} hex - The hex color code to be darkened.
     * @param {number} [factor=0.2] - The factor by which to darken the color. Default is 0.2.
     * @returns {string} - The darkened hex color code.
     *
     * @throws Will log a warning and return `#000000` if the input hex color is invalid.
     */
    function DarkerColor(hex, factor = 0.2) {
        try {
            let [r, g, b] = HexToColor(hex);
            r = Math.max(0, r - 255 * factor);
            g = Math.max(0, g - 255 * factor);
            b = Math.max(0, b - 255 * factor);
            return HexFromColor(r, g, b);
        }
        catch (error) {
            console.warn(error);
            return `#000000`;
        }
    }
    KColor.DarkerColor = DarkerColor;
    /**
     * Converts RGB color values to a hexadecimal color string.
     *
     * @param r - The red component of the color, an integer between 0 and 255.
     * @param g - The green component of the color, an integer between 0 and 255.
     * @param b - The blue component of the color, an integer between 0 and 255.
     * @returns A string representing the hexadecimal color, prefixed with '#'.
     *          If an error occurs, returns "#000000".
     */
    function HexFromColor(r, g, b) {
        try {
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
        catch (error) {
            console.warn(error);
            return "#000000";
        }
    }
    KColor.HexFromColor = HexFromColor;
    /**
     * Converts a short hexadecimal color code to a long hexadecimal color code.
     *
     * @param hex - The short hexadecimal color code (e.g., "#RGB").
     * @returns The long hexadecimal color code (e.g., "#RRGGBB"). If the input is already a long hexadecimal color code, it returns the input as is.
     *
     * @throws Will log a warning and return "#000000" if an error occurs during conversion.
     */
    function ToLongHex(hex) {
        try {
            if (hex.length == 4) {
                let r = hex[1];
                let g = hex[2];
                let b = hex[3];
                return `#${r}${r}${g}${g}${b}${b}`;
            }
            return hex;
        }
        catch (error) {
            console.warn(error);
            return "#000000";
        }
    }
    KColor.ToLongHex = ToLongHex;
    /**
     * Converts a hexadecimal color string to an RGB array.
     *
     * @param {string} hex - The hexadecimal color string (e.g., "#FFFFFF" or "FFFFFF").
     * @returns {number[]} An array containing the RGB values [r, g, b].
     *                      If the conversion fails, returns [0, 0, 0].
     * @throws Will log a warning to the console if the conversion fails.
     */
    function HexToColor(hex) {
        try {
            let _hex = ToLongHex(hex);
            let r = parseInt(_hex.substring(1, 3), 16);
            let g = parseInt(_hex.substring(3, 5), 16);
            let b = parseInt(_hex.substring(5, 7), 16);
            return [r, g, b];
        }
        catch (error) {
            console.warn(error);
            return [0, 0, 0];
        }
    }
    KColor.HexToColor = HexToColor;
    /**
     * Converts a hexadecimal color string to a color number.
     *
     * @param hex - The hexadecimal color string (e.g., "#RRGGBB" or "RRGGBB").
     * @returns The color number representation of the given hexadecimal color.
     */
    function HexToColorNumber(hex) {
        let [r, g, b] = HexToColor(hex);
        return r << 16 | g << 8 | b;
    }
    KColor.HexToColorNumber = HexToColorNumber;
    /**
     * Converts a hexadecimal color code to a CSS color string.
     *
     * @param {string} hex - The hexadecimal color code to convert.
     * @param {number} [alpha] - Optional alpha value for the color (0 to 1).
     * @returns {string} The CSS color string in `rgb` or `rgba` format.
     * @throws Will log a warning and return `rgb(0,0,0)` if the conversion fails.
     */
    function HexToCss(hex, alpha) {
        try {
            if (alpha) {
                return `rgba(${HexToColor(hex).join(",")},${alpha})`;
            }
            return `rgb(${HexToColor(hex).join(",")})`;
        }
        catch (error) {
            console.warn(error);
            return `rgb(0,0,0)`;
        }
    }
    KColor.HexToCss = HexToCss;
})(KColor || (KColor = {}));
var KNBuilder;
(function (KNBuilder) {
    function Factory(schemes, owner, extraRefreshAfterMs = 0) {
        let items = [];
        for (let key in schemes) {
            let item = Make(schemes[key], owner);
            if (KDX.any(item)) {
                items.push(item);
            }
        }
        // * Refresh all bindings
        for (let item of items) {
            item.refreshBindings(owner, true);
        }
        // * Обновить привязки через MS ещё раз
        if (extraRefreshAfterMs > 0) {
            setTimeout(() => {
                try {
                    for (let item of items) {
                        item === null || item === void 0 ? void 0 : item.refreshBindings(owner, true);
                    }
                }
                catch (error) {
                    console.warn(error);
                }
            }, extraRefreshAfterMs);
        }
        return items;
    }
    KNBuilder.Factory = Factory;
    function Make(scheme, owner, parent) {
        if (!scheme)
            return null;
        if (!scheme.type)
            return null;
        try {
            if (!isShouldCreate(scheme, owner))
                return null;
            let { type, parameters } = extractTypeAndParameters(scheme);
            //console.log(type);
            //console.log(parameters);
            let item = createItemByType(type, parameters);
            if (!item)
                return null;
            // * Parent нужен чтобы работали настройки положения (center, %) и т.д.
            if (KDX.any(parent)) {
                parent.addChild(item);
            }
            else {
                // * Owner - это не только главный родитель, но и к кому мы прописываем все поля по ID
                if (KDX.any(owner) && owner instanceof Sprite) {
                    owner.addChild(item);
                }
            }
            // * Сохраняем схему (но только этого элемента, без "детей")
            item.setJsonSchema(Object.assign({}, scheme, { children: [] }));
            // * Константы доступны не только у каждого элемента в схеме, но и у общего родителя
            if (KDX.any(scheme.constants)) {
                item.addUIConstants(scheme.constants);
                if (KDX.any(owner) && owner instanceof KNSprite) {
                    owner.addUIConstants(scheme.constants);
                }
            }
            // * Обновляем все связи (переменные) в элементе
            item.refreshBindings(owner, true);
            // * Применяем эффекты
            if (KDX.any(scheme.effects)) {
                try {
                    ApplyEffects(item, scheme.effects);
                }
                catch (error) {
                    console.warn(error);
                }
            }
            // * Если есть дети, то создаем их
            if (KDX.any(scheme.childrens)) {
                for (let childScheme of scheme.childrens) {
                    // * Дети всегда имеют родителя - этот элемент (а не owner)
                    Make(childScheme, owner, item);
                }
            }
            // * Если у элемента есть ID, то сохраняем его в общий объект
            if (KDX.any(scheme.id)) {
                item['id'] = scheme.id;
                if (KDX.any(owner)) {
                    owner[scheme.id] = item;
                }
            }
            // * Если у элемента есть родитель, то добавляем его в родительский элемент
            try {
                if (KDX.any(scheme.parent)) {
                    let parent = scheme.parent;
                    if (KDX.any(owner) && owner[parent] && owner[parent] instanceof Sprite) {
                        owner[parent].addChild(item);
                    }
                }
            }
            catch (error) {
                console.warn(error);
            }
            // * Обновляем все связи (переменные) в элементе ещё раз (после всех детей)
            item.refreshBindings(owner, true);
            // * Применяем анимации
            if (KDX.any(scheme.animations)) {
                try {
                    applyAnimations(item, scheme.animations);
                }
                catch (error) {
                    console.warn(error);
                }
            }
            return item;
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KNBuilder.Make = Make;
    function extractTypeAndParameters(scheme) {
        let type = scheme.type;
        let parameters = {};
        try {
            // * Shortcut type:X;parameters:Y
            if (type.includes("type:")) {
                //console.log("Convert shortcut");
                let shortcutData = NBindingsConverter.ConvertShortcut(scheme.type);
                //console.log(shortcutData);
                if (shortcutData) {
                    type = shortcutData.type;
                    parameters = shortcutData.parameters;
                }
            }
            else {
                parameters = scheme.parameters;
            }
            if (typeof parameters === "string" && KString.any(parameters)) {
                //console.log("Convert parameters");
                parameters = NBindingsConverter.ConvertShortcut(parameters);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return { type: type, parameters: parameters };
    }
    function isShouldCreate(scheme, owner) {
        if (!KDX.any(scheme.createIf))
            return true;
        if (typeof scheme.createIf === "boolean")
            return scheme.createIf;
        if (typeof scheme.createIf === "string" && KString.any(scheme.createIf)) {
            let value = NBindingsConverter.ConvertBindingValue(owner, scheme.createIf);
            if (!value) {
                return false;
            }
        }
        return true;
    }
    function createItemByType(type, parameters = {}) {
        switch (type) {
            case "rect": return new KNSprite_BaseRect(parameters);
            case "circle": return new KNSprite_BaseCircle(parameters);
            case "plane": return new KNSprite_Plane(parameters);
            case "text": return new KNSprite_Text(parameters);
            case "image": return new KNSprite_Image(parameters);
            case "group": return new KNSprite_Group(parameters);
            case "screen": return new KNSprite_Screen();
            case "textPro": return new KNSprite_TextPro(parameters);
            case "button": return new KNSprite_Button(parameters);
            case "imageButton": return new KNSprite_ImageButton(parameters);
            case "list": return new KNSprite_ItemsList(parameters);
            case "face": return new KNSprite_ActorFace(parameters);
            case "gauge": return new KNSprite_Gauge(parameters);
            default: {
                console.warn("Unknown NUI element type: " + type);
                return null;
            }
        }
    }
    function ApplyEffects(item, effects) {
        try {
            if (!KDX.any(item))
                return;
            if (!KDX.any(effects))
                return;
            for (let effect of effects) {
                if (KString.isString(effect)) {
                    try {
                        let effectData = NBindingsConverter.ConvertShortcut(effect);
                        if (effectData['color'] && KString.isString(effectData['color'])) {
                            effectData['color'] = KColor.HexToColorNumber(effectData['color']);
                        }
                        if (effectData['shadow']) {
                            item.addShadowEffect(effectData);
                            continue;
                        }
                        if (effectData['blur']) {
                            item.addBlurEffect(effectData);
                            continue;
                        }
                        if (effectData['outline']) {
                            item.addOutlineEffect(effectData);
                            continue;
                        }
                        if (effectData['glow']) {
                            item.addGlowEffect(effectData);
                            continue;
                        }
                        if (effectData['tint']) {
                            item.addTintEffect(effectData);
                        }
                        if (effectData['desaturate']) {
                            item.addDesaturateEffect();
                        }
                    }
                    catch (error) {
                        console.warn(error);
                    }
                }
                else {
                    try {
                        item.addEffect(effect);
                    }
                    catch (error) {
                        console.warn(error);
                    }
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    KNBuilder.ApplyEffects = ApplyEffects;
    function applyAnimations(item, animations) {
        try {
            if (KDX.any(animations)) {
                for (let animation of animations) {
                    item.addAnimationRule(animation);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
})(KNBuilder || (KNBuilder = {}));
class KSprite extends Sprite {
    constructor(bitmap) {
        super(bitmap);
        this._alphaCheckThreshold = 100;
    }
    static FromRect(width, height, color = "#FFFFFF") {
        let sprite = new KSprite(new Bitmap(width, height));
        sprite.fillAll(color);
        return sprite;
    }
    getGlobalPositionNew() {
        let bounds = this.getBounds();
        let p = { x: bounds.x, y: bounds.y };
        return p;
    }
    getLocalPosition() {
        let bounds = this.getLocalBounds();
        let p = { x: bounds.x, y: bounds.y };
        return p;
    }
    getGlobalRect() {
        let bounds = this.getBounds();
        return new Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
    }
    getLocalRect() {
        let localBounds = this.getLocalBounds();
        let globalBounds = this.getBounds();
        return new Rectangle(localBounds.x, localBounds.y, globalBounds.width, globalBounds.height);
    }
    toLocalPoint(point) {
        return this.worldTransform.applyInverse(point);
    }
    toGlobalPoint(point) {
        return this.worldTransform.apply(point);
    }
    isContainGlobalPoint(point) {
        let rect = this.getGlobalRect();
        return rect.contains(point.x, point.y);
    }
    isCursorInside() {
        return this.isContainGlobalPoint(TouchInput);
    }
    isNeedCheckAlphaPixels() {
        return false;
    }
    isHoveredByCursor() {
        if (!this.isNeedCheckAlphaPixels())
            return this.isCursorInside();
        if (!this.bitmap)
            return false;
        if (!this.bitmap.isReady())
            return false;
        try {
            let localPoint = this.toLocalPoint(new Point(TouchInput.x, TouchInput.y));
            let localBounds = this.getLocalBounds();
            let x = Math.floor(localPoint.x - localBounds.x);
            let y = Math.floor(localPoint.y - localBounds.y);
            if (x < 0 || y < 0)
                return false;
            if (x >= this.bitmap.width || y >= this.bitmap.height)
                return false;
            let alpha = Number(this.bitmap.getAlphaPixel(x, y));
            return alpha > this._alphaCheckThreshold;
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    }
    removeFromParent() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
    isVisible() {
        return this.worldVisible == true;
    }
    fillAll(color = "#FFFFFF") {
        if (this.bitmap) {
            this.bitmap.fillAll(color);
        }
    }
    setCommonAnchor(x, y) {
        try {
            if (y === undefined)
                y = x;
            this.anchor.set(x, y);
            // * Set the anchor for each children
            for (let child of this.children) {
                if (!child)
                    continue;
                if (child['setCommonAnchor']) {
                    child['setCommonAnchor'](x, y);
                }
                else {
                    if (!child['anchor'])
                        continue;
                    /*@ts-ignore*/
                    child.anchor.set(x, y);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    onBitmapLoaded(callback) {
        if (this.bitmap && this.bitmap.isReady()) {
            callback();
        }
        else {
            this.bitmap.addLoadListener(() => {
                callback();
            });
        }
    }
}
var KDNUI;
(function (KDNUI) {
    let EasingFunc;
    (function (EasingFunc) {
        EasingFunc["Linear"] = "linear";
        EasingFunc["EaseInQuad"] = "easeInQuad";
        EasingFunc["EaseOutQuad"] = "easeOutQuad";
        EasingFunc["EaseInOutQuad"] = "easeInOutQuad";
        EasingFunc["EaseInCubic"] = "easeInCubic";
        EasingFunc["EaseOutCubic"] = "easeOutCubic";
        EasingFunc["EaseInOutCubic"] = "easeInOutCubic";
    })(EasingFunc = KDNUI.EasingFunc || (KDNUI.EasingFunc = {}));
    class EasingFuncs {
        /**
         * Linear easing function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static linear(t, b, c, d) {
            return c * t / d + b;
        }
        /**
         * Ease in quadratic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeInQuad(t, b, c, d) {
            t /= d;
            return c * t * t + b;
        }
        /**
         * Ease out quadratic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeOutQuad(t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
        }
        /**
         * Ease in and out quadratic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        /**
         * Ease in cubic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeInCubic(t, b, c, d) {
            t /= d;
            return c * t * t * t + b;
        }
        /**
         * Ease out cubic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeOutCubic(t, b, c, d) {
            t = t / d - 1;
            return c * (t * t * t + 1) + b;
        }
        /**
         * Ease in and out cubic function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        static easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }
    }
    KDNUI.EasingFuncs = EasingFuncs;
})(KDNUI || (KDNUI = {}));
var NUtils;
(function (NUtils) {
    function GetSpriteRealSize(forField, sprite) {
        try {
            if (!sprite) {
                return 0;
            }
            if (forField == "width" || forField == "x") {
                if (sprite["realWidth"])
                    return sprite["realWidth"]();
                else
                    return sprite.width;
            }
            if (forField == "height" || forField == "y") {
                if (sprite["realHeight"])
                    return sprite["realHeight"]();
                else
                    return sprite.height;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    NUtils.GetSpriteRealSize = GetSpriteRealSize;
    function ConvertDimension(value) {
        try {
            if (typeof value == "string") {
                value = NBindingsConverter.ConvertAllDimensionValues(value);
                if (KString.any(value))
                    return Number(value);
            }
            else {
                return value;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    NUtils.ConvertDimension = ConvertDimension;
})(NUtils || (NUtils = {}));
var KDNUI;
(function (KDNUI) {
    class AnimationKeyFrame {
        /**
         * Creates an instance of AnimationKeyFrame.
         * @param startValue The starting value of the animation.
         * @param endValue The ending value of the animation.
         * @param duration The duration of the animation in seconds.
         * @param func The easing function name.
         */
        constructor(startValue, endValue, duration = 1, func = 'linear') {
            this.startValue = startValue;
            this.endValue = endValue;
            this._t = 0;
            this._d = duration * 60; // Convert to Frames
            this._c = this.endValue - this.startValue; // Change
            this.func = func || 'linear';
        }
        /**
         * Resets the animation timer.
         */
        reset() {
            this._t = 0;
        }
        /**
         * Updates the animation timer.
         */
        update() {
            if (this._t < this._d) {
                this._t += 1;
            }
        }
        /**
         * Checks if the animation has ended.
         * @returns True if the animation has ended, otherwise false.
         */
        isEnd() {
            return this._t >= this._d || this._d <= 0;
        }
        /**
         * Gets the current value of the animation.
         * @returns The current value of the animation.
         */
        getValue() {
            if (this._d <= 0) {
                return this.endValue;
            }
            else {
                return this.easingFunc()(this._t, this.startValue, this._c, this._d);
            }
        }
        /**
         * Gets the easing function based on the function name.
         * @returns {KDNUI.IEasingFunction} The easing function.
         */
        easingFunc() {
            if (this.func && KDNUI.EasingFuncs[this.func]) {
                return KDNUI.EasingFuncs[this.func];
            }
            else {
                console.warn(`Easing func ${this.func} not found!`);
                return this.linear;
            }
        }
        /**
         * Default linear easing function.
         * @param t Current time
         * @param b Start value
         * @param c Change in value
         * @param d Duration
         * @returns The calculated value
         */
        linear(t, b, c, d) {
            return c * t / d + b;
        }
    }
    KDNUI.AnimationKeyFrame = AnimationKeyFrame;
})(KDNUI || (KDNUI = {}));
var KDNUI;
(function (KDNUI) {
    class AnimationKeyLine {
        /**
         * Creates an instance of AnimationKeyLine.
         * @param keyFramesList The list of keyframes.
         * @param totalDuration The total duration of the animation.
         * @param func The easing function name.
         */
        constructor(keyFramesList, totalDuration = 1, func = 'linear') {
            this.totalDuration = totalDuration;
            this.keyFrames = this._parseKeyFrames(keyFramesList, func);
            this.repeatsLeftBase = 0;
            this.repeatsLeft = 0;
            this.keyIndex = 0;
            this._relativeValue = 0;
            this._isStarted = false;
        }
        /**
         * Sets the relative value.
         * @param _relativeValue The relative value.
         */
        setRelativeValue(_relativeValue) {
            this._relativeValue = _relativeValue;
        }
        /**
         * Sets the number of repeats.
         * @param repeatsLeftBase The number of repeats.
         */
        setRepeatsCount(repeatsLeftBase) {
            this.repeatsLeftBase = repeatsLeftBase;
            this.repeatsLeft = repeatsLeftBase;
        }
        /**
         * Sets the animation to loop indefinitely.
         */
        setLoop() {
            this.setRepeatsCount(-1);
        }
        /**
         * Starts the animation with an optional delay.
         * @param startDelay The delay before starting the animation.
         */
        start(startDelay = 0) {
            if (startDelay === 0) {
                this._isStarted = true;
            }
            else {
                this._startTimer = startDelay * 60;
            }
        }
        /**
         * Pauses the animation.
         */
        pause() {
            this._isStarted = false;
            this._startTimer = null;
        }
        /**
         * Checks if the animation has started.
         * @returns True if the animation has started, otherwise false.
         */
        isStarted() {
            return this._isStarted === true;
        }
        /**
         * Completes the animation.
         */
        complete() {
            this.keyIndex = this.keyFrames.length;
            this.repeatsLeft = 0;
        }
        /**
         * Resets the animation.
         */
        reset() {
            this.repeatsLeft = this.repeatsLeftBase;
            this._resetKeyframes();
        }
        /**
         * Updates the animation.
         */
        update() {
            if (this._startTimer != null) {
                this._updateStartTimer();
            }
            if (!this.isStarted())
                return;
            if (this.isEnd()) {
                if (this.repeatsLeft === 0) {
                    return; // No repeats at all
                }
                else if (this.repeatsLeft < 0) { // Infinite Loop
                    this._resetKeyframes();
                }
                else {
                    this.repeatsLeft -= 1;
                    this._resetKeyframes();
                }
            }
            this.keyFrames[this.keyIndex].update();
            if (this.keyFrames[this.keyIndex].isEnd()) {
                this.keyIndex++;
            }
        }
        /**
         * Checks if the animation has ended.
         * @returns True if the animation has ended, otherwise false.
         */
        isEnd() {
            return this.keyIndex > this.keyFrames.length - 1;
        }
        /**
         * Gets the current value of the animation.
         * @returns The current value of the animation.
         */
        getValue() {
            let value;
            if (this.isEnd()) {
                value = this.keyFrames[this.keyFrames.length - 1].getValue();
            }
            else {
                value = this.keyFrames[this.keyIndex].getValue();
            }
            return value + this._relativeValue;
        }
        /**
         * Parses the keyframes.
         * @param keyframes The keyframes to parse.
         * @param func The easing function name.
         * @returns The parsed keyframes.
         */
        _parseKeyFrames(keyframes, func) {
            const keyframesOutput = [];
            const endValues = [];
            const keys = [];
            let index = 0;
            try {
                for (const key in keyframes) {
                    if (keyframes.hasOwnProperty(key)) {
                        let startValue;
                        if (endValues.length > 0) {
                            startValue = endValues[index - 1];
                        }
                        else {
                            startValue = 0;
                        }
                        const value = NUtils.ConvertDimension(keyframes[key]);
                        const endValue = value;
                        let duration;
                        if (key === "0") {
                            duration = 0;
                        }
                        else {
                            const prevKey = keys[index - 1];
                            duration = this._calculateDuration(prevKey, key);
                        }
                        const kf = new KDNUI.AnimationKeyFrame(startValue, endValue, duration, func);
                        keys[index] = key;
                        endValues[index] = value;
                        keyframesOutput.push(kf);
                        index++;
                    }
                }
            }
            catch (e) {
                console.warn(e);
            }
            return keyframesOutput;
        }
        /**
         * Calculates the duration between two keyframes.
         * @param rateA The start rate.
         * @param rateB The end rate.
         * @returns The calculated duration.
         */
        _calculateDuration(rateA, rateB) {
            try {
                const rateANum = Number(rateA) / 100.0;
                const rateBNum = Number(rateB) / 100.0;
                const timeA = this.totalDuration * rateANum;
                const timeB = this.totalDuration * rateBNum;
                const d = timeB - timeA;
                return d;
            }
            catch (e) {
                console.warn(e);
                return 0;
            }
        }
        /**
         * Resets the keyframes.
         */
        _resetKeyframes() {
            try {
                this.keyIndex = 0;
                for (const f of this.keyFrames) {
                    f.reset();
                }
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Updates the start timer.
         */
        _updateStartTimer() {
            try {
                if (this._startTimer == null)
                    return;
                this._startTimer -= 1;
                if (this._startTimer <= 0) {
                    this._isStarted = true;
                    this._startTimer = null;
                }
            }
            catch (e) {
                console.warn(e);
            }
        }
    }
    KDNUI.AnimationKeyLine = AnimationKeyLine;
})(KDNUI || (KDNUI = {}));
var KDNUI;
(function (KDNUI) {
    class AnimationRule {
        /**
         * Creates an instance of AnimationRule.
         * @param animationConfig The animation configuration.
         * @param obj The object to apply the animation to.
         */
        constructor(animationConfig, obj) {
            if (typeof animationConfig === "string") {
                animationConfig = NBindingsConverter.ConvertShortcut(animationConfig);
            }
            this.animationConfig = Object.assign(AnimationRule.DefaultConfig(), animationConfig);
            const { condition } = this.animationConfig;
            if (KString.any(condition)) {
                if (eval(condition) === false) {
                    return;
                }
            }
            const { keyframes, duration, func, repeats, delay } = this.animationConfig;
            this.prepareKeyFrames(keyframes, obj);
            this.keyLine = new KDNUI.AnimationKeyLine(keyframes, duration, func);
            this.keyLine.setRepeatsCount(repeats !== null && repeats !== void 0 ? repeats : 0);
            if (obj && this.animationConfig.field === "_scaleFactor") {
                this.prepareObject(obj);
            }
            if (this.animationConfig.relative === true && obj) {
                this.keyLine.setRelativeValue(obj[this.animationConfig.field]);
            }
            this.keyLine.start(delay);
            if (obj && delay <= 0) {
                this.applyAnimation(obj);
            }
        }
        // * DefaultSettings in JSON format (for easy copy-paste)
        /**
         * Gets the default configuration for the animation.
         * @returns The default configuration.
         */
        static DefaultConfig() {
            return {
                "field": "opacity",
                "duration": 1,
                "func": "linear",
                "delay": 0,
                "repeats": 0,
                "relative": false,
                "keyframes": {
                    "0": 0,
                    "100": 255
                },
                "condition": null
            };
        }
        /**
         * Prepares the keyframes for the animation.
         * @param keyframes The keyframes to prepare.
         * @param obj The object to apply the animation to.
         */
        prepareKeyFrames(keyframes, obj) {
            for (const key in keyframes) {
                if (keyframes.hasOwnProperty(key)) {
                    if (keyframes[key] === "@") {
                        if (obj && obj[this.animationConfig.field] != null) {
                            keyframes[key] = obj[this.animationConfig.field];
                        }
                        else {
                            keyframes[key] = 0;
                        }
                    }
                }
            }
        }
        /**
         * Sets the end callback for the animation.
         * @param onEndCallback The callback to call when the animation ends.
         */
        setEndCallback(onEndCallback) {
            this.onEndCallback = onEndCallback;
        }
        /**
         * Checks if there is an end callback.
         * @returns True if there is an end callback, otherwise false.
         */
        isHaveEndCallback() {
            try {
                // Callback works only for single-shot animations
                if (this.animationConfig.repeats !== 0) {
                    return false;
                }
                return this.onEndCallback != null;
            }
            catch (e) {
                console.warn(e);
                return false;
            }
        }
        /**
         * Updates the animation.
         */
        update() {
            var _a;
            if (!this.keyLine)
                return;
            this.keyLine.update();
            if (this.isHaveEndCallback() && this.keyLine.isEnd()) {
                try {
                    (_a = this.onEndCallback) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                catch (e) {
                    console.warn(e);
                }
                this.onEndCallback = null;
            }
        }
        /**
         * Applies the animation to the object.
         * @param obj The object to apply the animation to.
         */
        applyAnimation(obj) {
            try {
                if (!obj || !this.keyLine)
                    return;
                obj[this.animationConfig.field] = this.keyLine.getValue();
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Prepares the object for the animation.
         * @param obj The object to prepare.
         */
        prepareObject(obj) {
            try {
                if (obj && obj.onBeforeChangeScaleFactor) {
                    obj.onBeforeChangeScaleFactor();
                }
            }
            catch (e) {
                console.warn(e);
            }
        }
    }
    KDNUI.AnimationRule = AnimationRule;
})(KDNUI || (KDNUI = {}));
class KFilteredSprite extends KSprite {
    constructor() {
        super();
        this._activeFilters = {};
    }
    addEffect(effectSettings) {
        try {
            switch (effectSettings.type) {
                case KNSpriteEffects.Blur:
                    this.addBlurEffect(effectSettings.settings);
                    break;
                case KNSpriteEffects.Shadow:
                    this.addShadowEffect(effectSettings.settings);
                    break;
                case KNSpriteEffects.Outline:
                    this.addOutlineEffect(effectSettings.settings);
                    break;
                case KNSpriteEffects.Glow:
                    this.addGlowEffect(effectSettings.settings);
                    break;
                case KNSpriteEffects.Tint:
                    this.addTintEffect(effectSettings.settings);
                    break;
                case KNSpriteEffects.Desaturate:
                    this.addDesaturateEffect();
                    break;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    addBlurEffect(settings = {}) {
        try {
            if (!PIXI.filters['BlurFilter']) {
                console.warn("The blur effect is not available in the current version of PIXI.js.");
                return;
            }
            let strength = settings.strength || 8;
            let quality = settings.quality || 4;
            let filterObject = new PIXI.filters.BlurFilter(strength, quality);
            this._addFilter(KNSpriteEffects.Blur, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    // * MZ only
    addShadowEffect(settings = {}) {
        try {
            if (!PIXI.filters['DropShadowFilter']) {
                console.warn("The shadow effect is not available in the current version of PIXI.js.");
                return;
            }
            if (KDX.isMV()) {
                console.warn("The shadow effect is not available in MV.");
                return;
            }
            let rotation = settings.rotation || 45;
            let color = settings.color || 0x000000;
            let alpha = settings.alpha || 0.5;
            let distance = settings.distance || 5;
            let shadowOnly = settings.shadowOnly || false;
            let blur = settings.blur || 2;
            let quality = settings.quality || 3;
            /*@ts-ignore*/
            let filterObject = new PIXI.filters.DropShadowFilter({
                rotation,
                color,
                alpha,
                distance,
                shadowOnly,
                blur,
                quality
            });
            this._addFilter(KNSpriteEffects.Shadow, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    // * MZ only
    addOutlineEffect(settings = {}) {
        try {
            if (!PIXI.filters['OutlineFilter']) {
                console.warn("The outline effect is not available in the current version of PIXI.js.");
                return;
            }
            if (KDX.isMV()) {
                console.warn("The outline effect is not available in MV.");
                return;
            }
            let thickness = settings.thickness || 1;
            let color = settings.color || 0xffffff;
            let quality = settings.quality || 0.1;
            let knockout = settings.knockout || false;
            /*@ts-ignore*/
            let filterObject = new PIXI.filters.OutlineFilter(thickness, color, quality, true, knockout);
            this._addFilter(KNSpriteEffects.Outline, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    addGlowEffect(settings = {}) {
        try {
            if (!PIXI.filters['GlowFilter']) {
                console.warn("The glow effect is not available in the current version of PIXI.js.");
                return;
            }
            let color = settings.color || 0xffffff;
            let distance = settings.distance || 10;
            let outerStrength = settings.outerStrength || 4;
            let innerStrength = settings.innerStrength || 0;
            let quality = settings.quality || 0.1;
            let knockout = settings.knockout || false;
            /*@ts-ignore*/
            let filterObject = new PIXI.filters.GlowFilter({ distance, outerStrength, innerStrength, color, quality, knockout });
            this._addFilter(KNSpriteEffects.Glow, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    addTintEffect(settings = {}) {
        try {
            if (!PIXI.filters['ColorOverlayFilter']) {
                console.warn("The tint effect is not available in the current version of PIXI.js.");
                return;
            }
            let color = settings.color || 0xffffff;
            let alpha = settings.alpha || 0.5;
            /*@ts-ignore*/
            let filterObject = new PIXI.filters.ColorOverlayFilter(color, alpha);
            this._addFilter(KNSpriteEffects.Tint, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    addDesaturateEffect() {
        try {
            if (!PIXI.filters['ColorMatrixFilter']) {
                console.warn("The desaturate effect is not available in the current version of PIXI.js.");
                return;
            }
            let filterObject = new PIXI.filters.ColorMatrixFilter();
            filterObject.desaturate();
            this._addFilter(KNSpriteEffects.Desaturate, filterObject);
        }
        catch (error) {
            console.warn(error);
        }
    }
    removeEffect(effectType) {
        try {
            this._removeFilter(effectType);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _removeFilter(filter) {
        try {
            let filterObj = this._activeFilters[filter];
            if (filterObj) {
                if (KDX.isMV()) {
                    /*@ts-ignore*/
                    this._filters = this._filters.filter(f => f !== filterObj);
                }
                else {
                    this.filters = this.filters.filter(f => f !== filterObj);
                }
            }
            delete this._activeFilters[filter];
        }
        catch (error) {
            console.warn(error);
        }
    }
    _addFilter(filter, filterObject) {
        try {
            if (this._activeFilters[filter]) {
                this._removeFilter(filter);
            }
            if (KDX.isMV()) {
                /*@ts-ignore*/
                if (!this._filters) {
                    this._filters = [];
                }
            }
            else {
                if (!this.filters) {
                    this.filters = [];
                }
            }
            if (KDX.isMV()) {
                /*@ts-ignore*/
                this._filters.push(filterObject);
            }
            else {
                this.filters.push(filterObject);
            }
            this._activeFilters[filter] = filterObject;
        }
        catch (error) {
            console.warn(error);
        }
    }
}
let globalHandledSprite = null;
class KHandledSprite extends KFilteredSprite {
    static GlobalHandledSprite() {
        return globalHandledSprite;
    }
    static DeactivateGlobalHandledSprite(reference = null) {
        if (globalHandledSprite && globalHandledSprite != reference) {
            globalHandledSprite._deactivateHandler();
        }
    }
    constructor() {
        super();
        this._handledIndex = 0;
        this._handleManagerActive = false;
        this._handlerActive = false;
    }
    get handledIndex() {
        return this._handledIndex;
    }
    set handledIndex(value) {
        this._handledIndex = value;
    }
    addChild(child) {
        super.addChild(child);
        if (child instanceof KHandledSprite) {
            if (child.isSupportKeyboardHandle()) {
                child.handledIndex = this._pGetAllHandlers().length - 1;
            }
        }
        return child;
    }
    destroy(options) {
        this._deactivateHandler();
        super.destroy(options);
    }
    update() {
        super.update();
        if (this.isHandlerActive()) {
            this._handleKeyboardInputs();
        }
    }
    // * This should be TRUE if element can be selected (activated) or navigated by keyboard
    isSupportKeyboardHandle() {
        return false;
    }
    isVerticalKeyboardNavigation() {
        return true;
    }
    isFreeKeyboardNavigation() {
        return false;
    }
    isHandlerActive() {
        return this._handleManagerActive || this._handlerActive;
    }
    isAnyHandlerSelected() {
        return globalHandledSprite != null;
    }
    activateHandlerManagment() {
        if (this.isFreeKeyboardNavigation()) {
            this._handleUpAction = this._freeSelectionUpHandler.bind(this);
            this._handleDownAction = this._freeSelectionDownHandler.bind(this);
            this._handleLeftAction = this._freeSelectionLeftHandler.bind(this);
            this._handleRightAction = this._freeSelectionRightHandler.bind(this);
        }
        else {
            this._handleUpAction = this._selectPreviousHandlerItem.bind(this);
            this._handleDownAction = this._selectNextHandlerItem.bind(this);
        }
        this._handleManagerActive = true;
    }
    deactivateHandlerManagment() {
        this._handleManagerActive = false;
        if (globalHandledSprite == this) {
            this._deactivateHandler();
        }
        this._handleUpAction = null;
        this._handleDownAction = null;
        this._handleLeftAction = null;
        this._handleRightAction = null;
    }
    _handleKeyboardInputs() {
        try {
            if (Input.isTriggered('left')) {
                this._handleKeyLeft();
            }
            else if (Input.isTriggered('right')) {
                this._handleKeyRight();
            }
            else if (Input.isTriggered('up')) {
                this._handleKeyUp();
            }
            else if (Input.isTriggered('down')) {
                this._handleKeyDown();
            }
            else if (Input.isTriggered('ok')) {
                this._handleKeyOk();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _handleKeyLeft(ignoreNavigation = false) {
        try {
            if (this.isVerticalKeyboardNavigation() || ignoreNavigation) {
                if (this._handleLeftAction) {
                    this._handleLeftAction();
                    this._onActionHandled();
                }
            }
            else {
                this._handleKeyUp(true);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _handleKeyRight(ignoreNavigation = false) {
        try {
            if (this.isVerticalKeyboardNavigation() || ignoreNavigation) {
                if (this._handleRightAction) {
                    this._handleRightAction();
                    this._onActionHandled();
                }
            }
            else {
                this._handleKeyDown(true);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _handleKeyUp(ignoreNavigation = false) {
        try {
            if (this.isVerticalKeyboardNavigation() || ignoreNavigation) {
                if (this._handleUpAction) {
                    this._handleUpAction();
                    this._onActionHandled();
                }
            }
            else {
                this._handleKeyLeft(true);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _handleKeyDown(ignoreNavigation = false) {
        try {
            if (this.isVerticalKeyboardNavigation() || ignoreNavigation) {
                if (this._handleDownAction) {
                    this._handleDownAction();
                    this._onActionHandled();
                }
            }
            else {
                this._handleKeyRight(true);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _handleKeyOk() {
        try {
            if (this._handleOkAction) {
                this._handleOkAction();
                this._onActionHandled();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _onActionHandled() {
        Input.clear();
    }
    _selectPreviousHandlerItem() {
        if (!this.isAnyHandlerSelected()) {
            this._trySelectHandler(0);
        }
        else {
            this._trySelectHandler(this._selectedHandlerIndex() - 1);
        }
    }
    _selectedHandlerIndex() {
        return globalHandledSprite.handledIndex;
    }
    _trySelectHandler(index) {
        let handlers = this._pGetAllHandlers();
        let handler = handlers.find(h => h.handledIndex == index);
        if (handler) {
            handler._activateHandler();
        }
        this._onActionHandled();
    }
    _pGetAllHandlers() {
        let handlers = [];
        for (let child of this.children) {
            if (child instanceof KHandledSprite) {
                if (child.isSupportKeyboardHandle()) {
                    handlers.push(child);
                }
            }
        }
        return handlers;
    }
    _selectNextHandlerItem() {
        if (!this.isAnyHandlerSelected()) {
            this._trySelectHandler(0);
        }
        else {
            this._trySelectHandler(this._selectedHandlerIndex() + 1);
        }
    }
    _activateHandler() {
        if (globalHandledSprite && globalHandledSprite != this) {
            globalHandledSprite._deactivateHandler();
        }
        globalHandledSprite = this;
        this._handlerActive = true;
        this._activateHandlerVisually();
    }
    _activateHandlerVisually() {
        this.addGlowEffect({ distance: 15, outerStrength: 4 });
    }
    _deactivateHandler() {
        if (globalHandledSprite == this) {
            globalHandledSprite = null;
        }
        this._handlerActive = false;
        this._deactivateHandlerVisually();
    }
    _deactivateHandlerVisually() {
        this.removeEffect(KNSpriteEffects.Glow);
    }
    _getClosestItemToYx(x, y, fromItems) {
        let items = [];
        if (y >= 0) {
            items = fromItems.filter(i => i.y > y);
        }
        else {
            items = fromItems.filter(i => i.y < Math.abs(y));
        }
        if (items.length == 0) {
            return null;
        }
        let itemsInRow = items.filter(i => i.x == x);
        if (itemsInRow.length > 0) {
            itemsInRow.sort((a, b) => a.y - b.y);
            return itemsInRow[0];
        }
        else {
            let distances = [];
            let rY = Math.abs(y);
            let index = 0;
            for (let item of items) {
                distances.push([index, Math.abs(item.x - x) + Math.abs(item.y - rY)]);
                index++;
            }
            distances.sort((a, b) => a[1] - b[1]);
            return items[distances[0][0]];
        }
    }
    _getClosestItemToXy(x, y, fromItems) {
        let items = [];
        if (x >= 0) {
            items = fromItems.filter(i => i.x > x);
        }
        else {
            items = fromItems.filter(i => i.x < Math.abs(x));
        }
        if (items.length == 0) {
            return null;
        }
        let itemsInRow = items.filter(i => i.y == y);
        if (itemsInRow.length > 0) {
            itemsInRow.sort((a, b) => a.x - b.x);
            return itemsInRow[0];
        }
        else {
            let distances = [];
            let rX = Math.abs(x);
            let index = 0;
            for (let item of items) {
                distances.push([index, Math.abs(item.x - rX) + Math.abs(item.y - y)]);
                index++;
            }
            distances.sort((a, b) => a[1] - b[1]);
            return items[distances[0][0]];
        }
    }
    _freeSelectionUpHandler() {
        try {
            let allItems = this._pGetAllHandlers();
            if (allItems.length == 0) {
                return;
            }
            if (this.isAnyHandlerSelected()) {
                let item = this._getClosestItemToYx(globalHandledSprite.x, -globalHandledSprite.y, allItems);
                if (item) {
                    item._activateHandler();
                }
            }
            else {
                allItems[0]._activateHandler();
            }
        }
        catch (error) {
            console.warn(error);
        }
        this._onActionHandled();
    }
    _freeSelectionDownHandler() {
        try {
            let allItems = this._pGetAllHandlers();
            if (allItems.length == 0) {
                return;
            }
            if (this.isAnyHandlerSelected()) {
                let item = this._getClosestItemToYx(globalHandledSprite.x, globalHandledSprite.y, allItems);
                if (item) {
                    item._activateHandler();
                }
            }
            else {
                allItems[0]._activateHandler();
            }
        }
        catch (error) {
            console.warn(error);
        }
        this._onActionHandled();
    }
    _freeSelectionLeftHandler() {
        try {
            let allItems = this._pGetAllHandlers();
            if (allItems.length == 0) {
                return;
            }
            if (this.isAnyHandlerSelected()) {
                let item = this._getClosestItemToXy(-globalHandledSprite.x, globalHandledSprite.y, allItems);
                if (item) {
                    item._activateHandler();
                }
            }
            else {
                allItems[0]._activateHandler();
            }
        }
        catch (error) {
            console.warn(error);
        }
        this._onActionHandled();
    }
    _freeSelectionRightHandler() {
        try {
            let allItems = this._pGetAllHandlers();
            if (allItems.length == 0) {
                return;
            }
            if (this.isAnyHandlerSelected()) {
                let item = this._getClosestItemToXy(globalHandledSprite.x, globalHandledSprite.y, allItems);
                if (item) {
                    item._activateHandler();
                }
            }
            else {
                allItems[0]._activateHandler();
            }
        }
        catch (error) {
            console.warn(error);
        }
        this._onActionHandled();
    }
}
var NBindingsConverter;
(function (NBindingsConverter) {
    function ConvertBindingValue(sourceElement, bindingValue, element = null) {
        try {
            // * ["%1 %2", value1, value2]
            if (Array.isArray(bindingValue)) {
                let bindingValuesArray = bindingValue;
                let sourceText = bindingValuesArray[0];
                if (!KString.any(sourceText))
                    return "";
                for (let i = 1; i < bindingValuesArray.length; i++) {
                    if (KString.any(bindingValuesArray[i])) {
                        try {
                            let value = _convertSingleBindingValue(sourceElement, bindingValuesArray[i], element);
                            if (KString.any(value)) {
                                sourceText = sourceText.replace(`%${i}`, value);
                            }
                        }
                        catch (error) {
                            console.warn(error);
                        }
                    }
                }
                return sourceText;
            }
            else {
                return _convertSingleBindingValue(sourceElement, bindingValue, element);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return bindingValue.toString();
    }
    NBindingsConverter.ConvertBindingValue = ConvertBindingValue;
    function _convertSingleBindingValue(sourceElement, bindingValue, element = null) {
        try {
            if (typeof bindingValue != "string") {
                return bindingValue;
            }
            // * CONVERT DIMENSION VALUES (HDP and DP)
            bindingValue = ConvertAllDimensionValues(bindingValue);
            // * FORCE EVAL
            if (bindingValue[0] == '@') {
                let evalString = bindingValue.replace("@", "");
                return eval(evalString);
            }
            // * EXTRA $ calculations (POST EVAL)
            if (bindingValue[0] == '~') {
                if (bindingValue.includes("$")) {
                    let regex = new RegExp("(\\$[\\w+.]*)", "g");
                    let result = regex.exec(bindingValue);
                    if (result) {
                        let captured = result[1];
                        if (KDX.any(captured)) {
                            let resultValue = _convertSingleBindingValue$(sourceElement, captured, element);
                            if (!KDX.any(resultValue)) {
                                return null;
                            }
                            if (typeof resultValue == "function") {
                                return resultValue;
                            }
                            else {
                                if (KDX.any(resultValue)) {
                                    bindingValue = bindingValue.replace(captured, resultValue);
                                    return ConvertBindingValue(sourceElement, bindingValue, element);
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                    }
                }
                else {
                    let evalString = bindingValue.replace("~", "");
                    return eval(evalString);
                }
            }
            // * DEFAULT OLD STYLE SIMPLE $
            if (bindingValue.includes('$')) {
                return _convertSingleBindingValue$(sourceElement, bindingValue, element);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return bindingValue;
    }
    function ConvertAllDimensionValues(value) {
        if (value.includes('hdp')) {
            let regex = new RegExp("(\\d+)hdp", "g");
            let result = regex.exec(value);
            while (result) {
                let dpValue = parseInt(result[1]);
                let converted = ConvertDimenstionToPixels(dpValue, true);
                value = value.replace(result[0], converted.toString());
                result = regex.exec(value);
            }
        }
        if (value.includes('dp')) {
            let regex = new RegExp("(\\d+)dp", "g");
            let result = regex.exec(value);
            while (result) {
                let dpValue = parseInt(result[1]);
                let converted = ConvertDimenstionToPixels(dpValue, false);
                value = value.replace(result[0], converted.toString());
                result = regex.exec(value);
            }
        }
        return value;
    }
    NBindingsConverter.ConvertAllDimensionValues = ConvertAllDimensionValues;
    function _convertSingleBindingValue$(sourceElement, bindingValue, element) {
        try {
            let field = bindingValue.replace("$", "");
            if (field.includes(".")) { // * example: $parent.width
                let parts = field.split(".");
                // * Только одно вхождение (одна точка)
                field = parts[0];
                let subField = parts[1];
                if (!KString.any(field) && KString.any(subField)) {
                    if (element) {
                        return _convertSingleBindingValue$(element, "$" + subField, element);
                    }
                    else {
                        return null;
                    }
                }
                if (KString.any(field) && !KString.any(subField)) {
                    return _convertSingleBindingValue$(sourceElement, "$" + field, element);
                }
                if (sourceElement) {
                    let subData = _getSourceElementFieldValue(sourceElement, field);
                    return _convertSingleBindingValue$(subData, "$" + subField, element);
                }
                else {
                    return null;
                }
            }
            else {
                return _getSourceElementFieldValue(sourceElement, field);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    function _getSourceElementFieldValue(sourceElement, field) {
        try {
            if (sourceElement && sourceElement[field]) {
                if (typeof sourceElement[field] == "function") {
                    return sourceElement[field]();
                }
                else {
                    return sourceElement[field];
                }
            }
            else {
                return null; // * We can't find value
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    function ConvertDimenstionToPixels(value = 0, isHalf = false) {
        try {
            if (Graphics.width == 816 && Graphics.height == 624) {
                return value;
            }
            let modX = Graphics.width / 816;
            let modY = Graphics.height / 624;
            let mod = (modX + modY) / 2;
            if (mod == 0)
                return 0;
            if (isHalf) {
                if (mod < 1) {
                    let d = 1 - mod;
                    mod += d / 2;
                }
                else if (mod > 1) {
                    let d = mod - 1;
                    mod = 1 + (d / 2);
                }
            }
            return Math.round(value * mod);
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    NBindingsConverter.ConvertDimenstionToPixels = ConvertDimenstionToPixels;
    function ConvertPercentageValues(value, forField, spriteParent) {
        try {
            if (value.includes("%")) {
                let regex = new RegExp("(\\d+)%", "g");
                let result = regex.exec(value);
                while (result) {
                    let percentageValue = parseInt(result[1]);
                    let resultValue = 0;
                    if (spriteParent) {
                        let parentRefSize = NUtils.GetSpriteRealSize(forField, spriteParent);
                        resultValue = parentRefSize * (percentageValue / 100.0);
                    }
                    value = value.replace(result[0], resultValue.toString());
                    result = regex.exec(value);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return value;
    }
    NBindingsConverter.ConvertPercentageValues = ConvertPercentageValues;
    /**
     * Converts a shortcut string to a configuration object.
     * @param shortcut The shortcut string to convert.
     * @param outerSep The outer separator (default is ";").
     * @param innerSep The inner separator (default is ":").
     * @returns The configuration object.
     */
    function ConvertShortcut(shortcut, outerSep = ";", innerSep = ":") {
        try {
            const config = {};
            const values = shortcut.split(outerSep);
            for (const value of values) {
                if (!String(value).trim())
                    continue;
                const pair = value.split(innerSep);
                const valueName = pair[0];
                let valueData = pair[1];
                if (valueData && valueData.includes("=")) {
                    valueData = _convertValueDataFromShortcut(valueData);
                }
                else {
                    if (valueData == null) {
                        valueData = true;
                    }
                    else {
                        if (isFinite(valueData))
                            valueData = Number(valueData);
                    }
                }
                config[valueName] = valueData;
            }
            return config;
        }
        catch (e) {
            console.warn(e);
            return {};
        }
    }
    NBindingsConverter.ConvertShortcut = ConvertShortcut;
    /**
     * Converts a value data string from a shortcut format to an object.
     * @param valueData The value data string to convert.
     * @returns The converted object.
     */
    function _convertValueDataFromShortcut(valueData) {
        try {
            if (valueData.includes("|")) {
                const data = {};
                const outerItems = valueData.split("|");
                for (const item of outerItems) {
                    const p = item.split("=");
                    const n = p.shift();
                    let v = p;
                    if (v.length === 0) {
                        v = true;
                    }
                    else {
                        if (v.length === 1) {
                            v = v[0];
                            if (isFinite(v))
                                v = Number(v);
                        }
                        else {
                            v = _convertValueDataFromShortcut(v.join("="));
                        }
                    }
                    if (n)
                        data[n] = v;
                }
                return data;
            }
            const data = ConvertShortcut(valueData, ",", "=");
            return data;
        }
        catch (e) {
            console.warn(e);
            return {};
        }
    }
})(NBindingsConverter || (NBindingsConverter = {}));
let globalUnderMouseSprite = null;
function IsAnyKNButtonUnderMouse() {
    if (!globalUnderMouseSprite) {
        return false;
    }
    if (globalUnderMouseSprite) {
        if (!globalUnderMouseSprite.parent) {
            globalUnderMouseSprite = null;
            return false;
        }
        if (!globalUnderMouseSprite.worldVisible) {
            return false;
        }
    }
    return true;
}
class KClickableSprite extends KHandledSprite {
    constructor() {
        super(...arguments);
        this._isHovered = false;
        this._isPressed = false;
        this._isDisabled = false;
    }
    static GlobalUnderMouseSprite() {
        return globalUnderMouseSprite;
    }
    static DeactivateGlobalUnderMouseSprite(reference = null) {
        if (globalUnderMouseSprite && globalUnderMouseSprite != reference) {
            globalUnderMouseSprite._clearClickState();
        }
        else {
            globalUnderMouseSprite = null;
        }
    }
    _activateHandler() {
        KClickableSprite.DeactivateGlobalUnderMouseSprite(this);
        super._activateHandler();
    }
    isCanHandleTouch() {
        return false;
    }
    isClickEnabled() {
        return this.worldVisible;
    }
    isDisabled() {
        return this._isDisabled;
    }
    isPressed() {
        return this._isPressed;
    }
    isHovered() {
        return this._isHovered;
    }
    isFocused() {
        return this.isHandlerActive();
    }
    update() {
        super.update();
        if (this.isCanHandleTouch()) {
            this._updateTouch();
        }
    }
    onMouseEnter() {
        this._activateHandler();
        //console.log("Mouse enter");
    }
    onMouseExit() {
        this._deactivateHandler();
        //console.log("Mouse exit");
    }
    onClick() {
        this._handleKeyOk();
        //console.log("Click");
    }
    onPress() {
        //console.log("Press");
    }
    onReleased() {
        //console.log("Released");
    }
    setClickHandler(handler) {
        this._handleOkAction = handler;
    }
    _handleKeyOk() {
        if (this.isDisabled()) {
            return;
        }
        if (this.isClickEnabled()) {
            super._handleKeyOk();
        }
    }
    _updateTouch() {
        if (this.isClickEnabled()) {
            if (this.isHoveredByCursor()) {
                /*@ts-ignore*/
                if (!this.isHovered() && !TouchInput.isPressed()) {
                    this._isHovered = true;
                    if (!this.isDisabled()) {
                        this.onMouseEnter();
                    }
                    globalUnderMouseSprite = this;
                    KHandledSprite.DeactivateGlobalHandledSprite(this);
                }
            }
            else {
                if (this.isHovered()) {
                    this._clearClickState();
                    if (!this.isDisabled()) {
                        this.onMouseExit();
                    }
                }
            }
            if (TouchInput.isPressed() && this.isHovered() && !this.isDisabled()) {
                if (!this.isPressed()) {
                    this._isPressed = true;
                    this.onPress();
                }
            }
            if (TouchInput.isReleased() && this.isPressed() && !this.isDisabled()) {
                this._isPressed = false;
                this.onReleased();
                if (this.isHovered()) {
                    this.onClick();
                }
            }
        }
        else {
            this._clearClickState();
        }
    }
    _clearClickState() {
        this._isHovered = false;
        this._isPressed = false;
        if (globalUnderMouseSprite == this) {
            globalUnderMouseSprite = null;
        }
    }
    destroy(options) {
        this._clearClickState();
        super.destroy(options);
    }
}
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Map.prototype;
    //@[ALIAS]
    const ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
    _.isAnyButtonPressed = function () {
        if (IsAnyKNButtonUnderMouse()) {
            return true;
        }
        return ALIAS__isAnyButtonPressed.call(this);
    };
    //@[ALIAS]
    const ALIAS__start = _.start;
    _.start = function () {
        globalUnderMouseSprite = null;
        ALIAS__start.call(this);
    };
    if (Utils.RPGMAKER_NAME.includes("MV")) {
        //@[ALIAS]
        const ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function () {
            if (IsAnyKNButtonUnderMouse()) {
                return;
            }
            ALIAS__processMapTouch.call(this);
        };
    }
})();
// ■ END Scene_Map.ts
//---------------------------------------------------------------------------
class KNSprite extends KClickableSprite {
    constructor() {
        super();
        this._scaleFactor = null;
        this._isNotHaveBounds = false;
        this._requiredFuncs = null;
        this._loadListeners = null;
        this._animationRules = null;
        this._uiJsonSchema = null;
        this._dataBindingsCache = null;
        this._uiConstants = null;
    }
    isNotHaveBounds() {
        return this._isNotHaveBounds == true;
    }
    isLoaded() {
        return true;
    }
    isShouldAlwaysKeepCentered() {
        return this._anchoredCenterX != null;
    }
    realWidth() {
        try {
            if (this.isNotHaveBounds()) {
                return 0;
            }
            if (this.width == 0) {
                let child = this.children[0];
                if (child) {
                    if (child["realWidth"])
                        return child["realWidth"]();
                    else
                        return child.width;
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return this.width;
    }
    realHeight() {
        try {
            if (this.isNotHaveBounds()) {
                return 0;
            }
            if (this.height == 0) {
                let child = this.children[0];
                if (child) {
                    if (child["realHeight"])
                        return child["realHeight"]();
                    else
                        return child.height;
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return this.height;
    }
    setJsonSchema(schema) {
        this._uiJsonSchema = schema;
    }
    getJsonSchema() {
        return this._uiJsonSchema;
    }
    addUIConstants(constants) {
        if (!this._uiConstants) {
            this._uiConstants = {};
        }
        this._uiConstants = Object.assign(this._uiConstants, constants);
    }
    uiConstant(key) {
        if (!this._uiConstants) {
            this._uiConstants = {};
        }
        return this._uiConstants[key];
    }
    dataBindings() {
        if (!this._dataBindingsCache) {
            this._dataBindingsCache = {
                x: (v) => this.setPosition(v, this.y),
                y: (v) => this.setPosition(this.x, v),
                position: (v) => this.setPosition(v.x, v.y),
                visible: (v) => { this.visible = v; },
                opacity: (v) => { if (v) {
                    this.opacity = v;
                } },
                scale: (v) => { if (v) {
                    this.scale.set(v);
                } },
                rotation: (v) => { if (v) {
                    this.rotation = v;
                } },
                physicalBounds: (v) => { this._isNotHaveBounds = !v; },
                anchor: (v) => { if (v) {
                    this.setCommonAnchor(v);
                } },
                animation: (v) => { if (v) {
                    this.addAnimationRule(v);
                } },
                centeredScale: (v) => { if (v) {
                    this.setCenteredScale(v);
                } }
            };
        }
        return this._dataBindingsCache;
    }
    refreshBindings(dataObject = null, resursive = true) {
        let _isUseDataObjectForChildrens = true;
        if (!dataObject) {
            dataObject = this;
            _isUseDataObjectForChildrens = false;
        }
        if (this._uiJsonSchema) {
            let { bindings } = this._uiJsonSchema;
            if (bindings) {
                for (let key in this.dataBindings()) {
                    if (!bindings[key]) {
                        continue;
                    }
                    try {
                        let value = NBindingsConverter.ConvertBindingValue(dataObject, bindings[key], this);
                        this.callBinding(key, value);
                    }
                    catch (error) {
                        console.warn(error);
                    }
                }
            }
        }
        if (resursive) {
            for (let child of this.children) {
                if (!child)
                    continue;
                try {
                    if (child['refreshBindings']) {
                        if (_isUseDataObjectForChildrens) {
                            child['refreshBindings'](dataObject, resursive);
                        }
                        else {
                            child['refreshBindings'](null, resursive);
                        }
                    }
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
    }
    callBinding(key, value) {
        try {
            let bindings = this.dataBindings();
            if (bindings[key]) {
                bindings[key](value);
            }
            else {
                console.warn("Binding not found", key);
            }
        }
        catch (error) {
            console.warn("Binding call error", error);
        }
    }
    addAnimationRule(rule) {
        try {
            if (!this._animationRules) {
                this._animationRules = [];
            }
            let animationRule = new KDNUI.AnimationRule(rule, this);
            this._animationRules.push(animationRule);
            return animationRule;
        }
        catch (error) {
            console.warn(error);
            return null;
        }
    }
    setAnimationRule(rule) {
        try {
            this._animationRules = []; // * Clear all rules
            if (rule) {
                return this.addAnimationRule(rule);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    addLoadListener(func) {
        try {
            if (this.isLoaded()) {
                func();
            }
            else {
                this._addLoadListener(func);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    setCenteredScale(value) {
        if (!this.isLoaded()) {
            this.requireFunc("setCenteredScale", arguments);
            return;
        }
        this._refreshAnchoredCenter();
        this._scaleFactor = value;
    }
    // * For Animation Rule (callback)
    onBeforeChangeScaleFactor() {
        try {
            if (this.isShouldAlwaysKeepCentered()) {
                this._refreshAnchoredCenter();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    // * Examples: setPosition(10, 10), setPosition("center") - for both x and y
    setPosition(x, y, bindedObject) {
        try {
            if (!this.isLoaded()) {
                this.requireFunc("setPosition", arguments);
                return;
            }
            if (typeof x == "string") {
                if (y == null || y == undefined) { // * If single string argument X, then Y = X
                    y = x;
                }
                x = this.convertStringSizeValue(x, "x", bindedObject);
            }
            if (y == null || y == undefined) {
                y = this.y;
            }
            if (typeof y == "string") {
                y = this.convertStringSizeValue(y, "y", bindedObject);
            }
            if (!isNaN(x) && !isNaN(y)) {
                this.move(x, y);
            }
            else {
                console.warn("Invalid position values X, Y ", x, y);
            }
        }
        catch (error) {
            console.warn(error);
            this.move(0, 0);
        }
    }
    update() {
        super.update();
        this._updateAnimationRules();
        if (this._scaleFactor != null) {
            this._updateScaleFactor(); // * For Centered Scale
        }
    }
    convertStringSizeValue(value, forField, owner) {
        try {
            if (typeof value == "number") {
                return value;
            }
            /* @ts-ignore */
            if (isFinite(value)) {
                return Number(value);
            }
            if (typeof value != "string") {
                return 0;
            }
            if (value[0] == '$' || value[0] == '@') {
                let v = NBindingsConverter.ConvertBindingValue(owner, value, this);
                return this.convertStringSizeValue(v, forField, owner);
            }
            if (value.includes("prevX")) {
                value = value.replace("prevX", this.getPreviousChildData("x"));
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("prevY")) {
                value = value.replace("prevY", this.getPreviousChildData("y"));
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("prevHeight")) {
                value = value.replace("prevHeight", this.getPreviousChildData("height"));
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("prevWidth")) {
                value = value.replace("prevWidth", this.getPreviousChildData("width"));
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("prevEndX")) {
                value = value.replace("prevEndX", "prevX + prevWidth");
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("prevEndY")) {
                value = value.replace("prevEndY", "prevY + prevHeight");
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("end")) {
                value = value.replace("end", "100%");
            }
            if (value.includes("begin")) {
                if (forField == "y") {
                    value = value.replace("begin", "-height");
                }
                else {
                    value = value.replace("begin", "-width");
                }
            }
            if (value.includes("right")) {
                value = value.replace("right", "100% - width");
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("left")) {
                value = value.replace("left", "0");
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("top")) {
                value = value.replace("top", "0");
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes("bottom")) {
                value = value.replace("bottom", "100% - height");
                return this.convertStringSizeValue(value, forField, owner);
            }
            // * Replace all %
            if (value.includes("%")) {
                if (this.parent) {
                    value = NBindingsConverter.ConvertPercentageValues(value, forField, this.parent);
                }
                else {
                    value = NBindingsConverter.ConvertPercentageValues(value, forField, this);
                }
            }
            // * Replace HDP and DP
            value = NBindingsConverter.ConvertAllDimensionValues(value);
            if (value.includes('center')) {
                let v = this.convertStringSizeValue('50%', forField, owner);
                let exValue = NUtils.GetSpriteRealSize(forField, this);
                exValue = v - (exValue / 2);
                value = value.replace('center', exValue.toString());
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes('height')) {
                let exValue = NUtils.GetSpriteRealSize('height', this);
                value = value.replace('height', exValue.toString());
                return this.convertStringSizeValue(value, forField, owner);
            }
            if (value.includes('width')) {
                let exValue = NUtils.GetSpriteRealSize('width', this);
                value = value.replace('width', exValue.toString());
                return this.convertStringSizeValue(value, forField, owner);
            }
            let v = eval(value);
            return this.convertStringSizeValue(v, forField, owner);
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    getPreviousChildData(forField) {
        try {
            if (!this.parent)
                return 0;
            if (this.parent.children.length <= 1)
                return 0;
            let myIndex = this.parent.children.indexOf(this);
            let prevChild = this.parent.children[myIndex - 1];
            if (!prevChild)
                return 0;
            if (forField == "x") {
                return prevChild.x;
            }
            if (forField == "y") {
                return prevChild.y;
            }
            return NUtils.GetSpriteRealSize(forField, prevChild);
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    requireFunc(funcName, args) {
        try {
            if (!this._requiredFuncs) {
                this._requiredFuncs = [];
            }
            this._requiredFuncs.push([funcName, args]);
        }
        catch (error) {
            console.warn(error);
        }
    }
    executeRequiredFuncs() {
        var _a;
        try {
            if (!this._requiredFuncs) {
                return;
            }
            for (let i = 0; i < this._requiredFuncs.length; i++) {
                let funcName = this._requiredFuncs[i][0];
                let args = this._requiredFuncs[i][1];
                try {
                    (_a = this[funcName]) === null || _a === void 0 ? void 0 : _a.apply(this, args);
                }
                catch (error) {
                    console.warn(error);
                }
            }
            this._requiredFuncs = null;
        }
        catch (error) {
            console.warn(error);
        }
    }
    executeLoadListeners() {
        try {
            if (!this._loadListeners) {
                return;
            }
            for (let i = 0; i < this._loadListeners.length; i++) {
                try {
                    this._loadListeners[i]();
                }
                catch (error) {
                    console.warn(error);
                }
            }
            this._loadListeners = null;
        }
        catch (error) {
            console.warn(error);
        }
    }
    _addLoadListener(func) {
        try {
            if (!this._loadListeners) {
                this._loadListeners = [];
            }
            this._loadListeners.push(func);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateAnimationRules() {
        try {
            if (!this._animationRules) {
                return;
            }
            for (let i = 0; i < this._animationRules.length; i++) {
                this._animationRules[i].update();
                this._animationRules[i].applyAnimation(this);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshAnchoredCenter() {
        try {
            if (this._lastCenterBaseX != this.x || this._lastCenterBaseY != this.y) {
                this._lastCenterBaseX = this.x;
                this._lastCenterBaseY = this.y;
            }
            this._anchoredCenterX = this._lastCenterBaseX + (this.realWidth() / 2);
            this._anchoredCenterY = this._lastCenterBaseY + (this.realHeight() / 2);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshRelativeToCenterPosition() {
        try {
            if (this._anchoredCenterX != null) {
                this.x = this._anchoredCenterX - (this.realWidth() * this.scale.x / 2);
                this.y = this._anchoredCenterY - (this.realHeight() * this.scale.y / 2);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateScaleFactor() {
        try {
            if (this.scale.x != this._scaleFactor || this.scale.y != this._scaleFactor) {
                this.scale.set(this._scaleFactor);
                if (this.isShouldAlwaysKeepCentered()) {
                    this._refreshRelativeToCenterPosition();
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
}
// * NUI 1.2
// * rev 10.09.24
// * "type": "face"
class KNSprite_ActorFace extends KNSprite {
    /**
     * Creates an instance of Sprite_ActorFace.
     * @param settings The settings for the sprite.
     */
    constructor(settings) {
        super();
        this.settings = Object.assign({}, KNSprite_ActorFace.DefaultSettings(), settings);
        this._create();
        this.draw(this.settings.faceName, this.settings.faceIndex);
        this.flipX(this.settings.mirror);
    }
    /**
     * Checks if the sprite is loaded.
     * @returns True if the sprite is loaded, otherwise false.
     */
    isLoaded() {
        return true;
    }
    /**
     * Gets the default settings for the sprite.
     * @returns The default settings.
     */
    static DefaultSettings() {
        return {
            "faceName": "",
            "faceIndex": 0,
            "size": 144,
            "mirror": false
        };
    }
    /**
     * Gets the real width of the sprite.
     * @returns The real width.
     */
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.size;
    }
    /**
     * Gets the real height of the sprite.
     * @returns The real height.
     */
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.size;
    }
    /**
     * Gets the data bindings for the sprite.
     * @returns The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            size: (v) => this.setSize(v),
            faceName: (v) => this.draw(v, this.settings.faceIndex),
            faceIndex: (v) => this.draw(this.settings.faceName, v),
            mirror: (v) => this.flipX(v)
        });
    }
    /**
     * Sets the size of the sprite.
     * @param size The size to set.
     */
    setSize(size = 144) {
        try {
            size = this.convertStringSizeValue(size, 'width', this);
            if (size != null)
                this.settings.size = size;
            this._onResize();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the face image.
     * @param faceName The name of the face image.
     * @param faceIndex The index of the face image.
     */
    draw(faceName = "", faceIndex = 0) {
        try {
            this.settings.faceName = faceName;
            this.settings.faceIndex = faceIndex;
            if (faceName === "") {
                this.image.bitmap.clear();
                return;
            }
            this._drawFaceImage(faceName);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Flips the sprite horizontally.
     * @param isMirror Whether to flip the sprite.
     */
    flipX(isMirror) {
        try {
            if (isMirror) {
                this.image.scale.x = -1;
                this.image.x = this.settings.size;
            }
            else {
                this.image.scale.x = 1;
                this.image.x = 0;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the sprite.
     */
    _create() {
        try {
            this.image = new KSprite(new Bitmap(1, 1));
            this.addChild(this.image);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the face image.
     * @param faceName The name of the face image.
     */
    _drawFaceImage(faceName) {
        try {
            this._srcBitmap = ImageManager.loadFace(faceName);
            this._srcBitmap.addLoadListener(this._onBitmapLoaded.bind(this));
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Called when the bitmap is loaded.
     */
    _onBitmapLoaded() {
        try {
            this._onResize();
            this.executeRequiredFuncs();
            this.executeLoadListeners();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Resizes the sprite.
     */
    _onResize() {
        try {
            this.image.bitmap = new Bitmap(this.realWidth(), this.realHeight());
            if (!this._srcBitmap)
                return;
            const b = this._srcBitmap;
            let fw, fh;
            if (KDX.isMZ()) {
                fw = ImageManager.faceWidth;
                fh = ImageManager.faceHeight;
            }
            else {
                /* @ts-ignore */
                fw = Window_Base._faceWidth;
                /* @ts-ignore */
                fh = Window_Base._faceHeight;
            }
            const size = this.settings.size;
            const sx = (this.settings.faceIndex % 4) * fw;
            const sy = Math.floor(this.settings.faceIndex / 4) * fh;
            this.image.bitmap.blt(b, sx, sy, fw, fh, 0, 0, size, size);
            this.setFrame(0, 0, size, size);
            this.flipX(this.settings.mirror);
        }
        catch (e) {
            console.warn(e);
        }
    }
}
// * NUI 1.0
// * rev 10.09.24
// * "type": "circle"
class KNSprite_BaseCircle extends KNSprite {
    constructor(settings) {
        super();
        this._settings = Object.assign({}, KNSprite_BaseCircle.DefaultSettings(), settings);
        this._create();
        this._applySettings();
    }
    // * DefaultSettings in JSON format (for easy copy-paste)
    /**
     * Returns the default settings for the base circle sprite.
     * @returns {BaseCircleSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "width": 100,
            "height": 100,
            "fillColor": "#FFFFFF",
            "fillAlpha": 1,
            "strokeWidth": 4,
            "strokeColor": "#000000",
            "strokeAlpha": 1
        };
    }
    /**
     * Gets the current settings of the base circle sprite.
     * @returns {BaseCircleSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Applies the current settings to the sprite.
     */
    refresh() {
        try {
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Returns an object with data bindings for width, height, size, stroke, and fill.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            stroke: (v) => { if (v)
                this.setStroke(v.color, v.width, v.alpha); },
            fill: (v) => { if (v)
                this.setFill(v.color, v.alpha); }
        });
    }
    /**
     * Sets the size of the base circle sprite.
     * @param {number | string} [width=100] - The width of the sprite.
     * @param {number | string} [height=100] - The height of the sprite.
     */
    setSize(width = 100, height = 100) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            if (_width != null)
                this._settings.width = _width;
            if (_height != null)
                this._settings.height = _height;
            this.refresh();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Sets the stroke properties of the base circle sprite.
     * @param {string} [color="#FFFFFF"] - The stroke color.
     * @param {number} [width=0] - The stroke width.
     * @param {number} [alpha=1] - The stroke alpha.
     */
    setStroke(color = "#FFFFFF", width = 0, alpha = 1) {
        this._settings.strokeColor = color;
        this._settings.strokeWidth = width;
        this._settings.strokeAlpha = alpha;
        this.refresh();
    }
    /**
     * Sets the fill properties of the base circle sprite.
     * @param {string} [color="#FFFFFF"] - The fill color.
     * @param {number} [alpha=1] - The fill alpha.
     */
    setFill(color = "#FFFFFF", alpha = 1) {
        this._settings.fillColor = color;
        this._settings.fillAlpha = alpha;
        this.refresh();
    }
    /**
     * Creates the graphics object and adds it as a child.
     * @private
     */
    _create() {
        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
    }
    /**
     * Applies the current settings to the base circle sprite.
     * @private
     */
    _applySettings() {
        if (!this._settings)
            return;
        if (!this._graphics)
            return;
        this._graphics.clear();
        try {
            this._drawBaseCircle();
        }
        catch (error) {
            console.warn(error);
        }
        this._applySize();
    }
    /**
     * Draws the base circle with the current settings.
     * @private
     */
    _drawBaseCircle() {
        // * Fill circle
        this._graphics.beginFill(KColor.HexToColorNumber(this._settings.fillColor), this._settings.fillAlpha);
        this._graphics.drawEllipse(0, 0, this._settings.width / 2, this._settings.height / 2);
        this._graphics.endFill();
        if (this._settings.strokeWidth > 0) {
            // * Stroke circle
            this._graphics.lineStyle(this._settings.strokeWidth, KColor.HexToColorNumber(this._settings.strokeColor), this._settings.strokeAlpha);
            this._graphics.drawEllipse(0, 0, this._settings.width / 2, this._settings.height / 2);
        }
    }
    /**
     * Applies the size settings to the base circle sprite and its graphics object.
     * @private
     */
    _applySize() {
        this.width = this._settings.width;
        this.height = this._settings.height;
        // * Круг (элипс) рисуется от центра, что не удобно  при расчёте координат, поэтому сдвигаем в левый вверхний угол
        this._graphics.position.set(this._settings.width / 2, this._settings.height / 2);
    }
}
// * NUI 1.0
// * rev 09.09.24
// * "type": "rect"
class KNSprite_BaseRect extends KNSprite {
    constructor(settings) {
        super();
        this._settings = Object.assign({}, KNSprite_BaseRect.DefaultSettings(), settings);
        this._create();
        this._applySettings();
    }
    // * DefaultSettings in JSON format (for easy copy-paste)
    /**
     * Returns the default settings for the base rectangle sprite.
     * @returns {BaseRectSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "width": 100,
            "height": 100,
            "corners": 0,
            "fillGradient": null,
            "gradientStart": { "x": 0, "y": 0 },
            "gradientEnd": { "x": 0, "y": 100 },
            "fillColor": "#FFFFFF",
            "fillAlpha": 1,
            "strokeWidth": 4,
            "strokeColor": "#000000",
            "strokeAlpha": 1
        };
    }
    /**
     * Returns the default gradient settings.
     * @returns {Record<string, string>} The default gradient settings.
     */
    static DefaultGradientSettings() {
        return {
            "0": "#9ff",
            "1": "#033"
        };
    }
    /**
     * Returns the default corner settings.
     * @returns {RectCorners} The default corner settings.
     */
    static DefaultCornerSettings() {
        return {
            "topLeft": 0,
            "topRight": 0,
            "bottomRight": 0,
            "bottomLeft": 0
        };
    }
    /**
     * Gets the current settings of the base rectangle sprite.
     * @returns {BaseRectSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Checks if the sprite has a gradient fill.
     * @returns {boolean} True if the sprite has a gradient fill, otherwise false.
     */
    isHaveGradient() {
        return this._settings.fillGradient != null;
    }
    /**
     * Applies the current settings to the sprite.
     */
    refresh() {
        try {
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Returns an object with data bindings for width, height, size, stroke, fill, gradient start, and gradient end.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            stroke: (v) => { if (v)
                this.setStroke(v.color, v.width, v.alpha); },
            fill: (v) => { if (v)
                this.setFill(v.color, v.alpha); },
            gradientStart: (v) => { if (v)
                this.setGradientStartEnd(v, this.settings.gradientEnd); },
            gradientEnd: (v) => { if (v)
                this.setGradientStartEnd(this.settings.gradientStart, v); }
        });
    }
    /**
     * Sets the size of the base rectangle sprite.
     * @param {number | string} [width=100] - The width of the sprite.
     * @param {number | string} [height=100] - The height of the sprite.
     */
    setSize(width = 100, height = 100) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            if (_width != null)
                this._settings.width = _width;
            if (_height != null)
                this._settings.height = _height;
            this.refresh();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Sets the stroke properties of the base rectangle sprite.
     * @param {string} [color="#FFFFFF"] - The stroke color.
     * @param {number} [width=0] - The stroke width.
     * @param {number} [alpha=1] - The stroke alpha.
     */
    setStroke(color = "#FFFFFF", width = 0, alpha = 1) {
        this._settings.strokeColor = color;
        this._settings.strokeWidth = width;
        this._settings.strokeAlpha = alpha;
        this.refresh();
    }
    /**
     * Sets the fill properties of the base rectangle sprite.
     * @param {string} [color="#FFFFFF"] - The fill color.
     * @param {number} [alpha=1] - The fill alpha.
     */
    setFill(color = "#FFFFFF", alpha = 1) {
        this._settings.fillColor = color;
        this._settings.fillAlpha = alpha;
        this._settings.fillGradient = null;
        this.refresh();
    }
    /**
     * Sets the gradient start and end points for the base rectangle sprite.
     * @param {{ x: number, y: number }} start - The start point of the gradient.
     * @param {{ x: number, y: number }} end - The end point of the gradient.
     */
    setGradientStartEnd(start, end) {
        try {
            if (start) {
                start.x = this.convertStringSizeValue(start.x, 'width', this);
                start.y = this.convertStringSizeValue(start.y, 'height', this);
            }
            if (end) {
                end.x = this.convertStringSizeValue(end.x, 'width', this);
                end.y = this.convertStringSizeValue(end.y, 'height', this);
            }
            this._settings.gradientStart = start;
            this._settings.gradientEnd = end;
            this.refresh();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Creates the graphics object and adds it as a child.
     * @private
     */
    _create() {
        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
    }
    /**
     * Applies the current settings to the base rectangle sprite.
     * @private
     */
    _applySettings() {
        if (!this._settings)
            return;
        if (!this._graphics)
            return;
        this._graphics.clear();
        try {
            this._applyGradient();
            this._drawCornerRect();
        }
        catch (error) {
            console.warn(error);
        }
        this._applySize();
    }
    /**
     * Applies the gradient fill to the base rectangle sprite.
     * @private
     */
    _applyGradient() {
        try {
            if (!this.isHaveGradient())
                return;
            if (KDX.isMV())
                return;
            let gradientFillSettings = Object.assign({}, KNSprite_BaseRect.DefaultGradientSettings(), this._settings.fillGradient);
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let gradient = ctx.createLinearGradient(this._settings.gradientStart.x, this._settings.gradientStart.y, this._settings.gradientEnd.x, this._settings.gradientEnd.y);
            for (let key in gradientFillSettings) {
                let color = this._convertGradientStopColor(gradientFillSettings[key]);
                gradient.addColorStop(Number(key), color);
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, this._settings.width, this._settings.height);
            let texture = PIXI.Texture.from(canvas);
            this._graphics.beginTextureFill({ texture: texture });
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Converts a gradient stop color to a CSS color string.
     * @param {string} color - The color to convert.
     * @returns {string} The converted color.
     * @private
     */
    _convertGradientStopColor(color) {
        if (!KString.any(color))
            return "#000000";
        try {
            if (color.includes("%")) {
                let [hex, opacity] = color.split("%");
                return KColor.HexToCss(hex, parseFloat(opacity));
            }
            else {
                return color;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return "#000000";
    }
    /**
     * Draws the rectangle with rounded corners.
     * @private
     */
    _drawCornerRect() {
        try {
            if (typeof this._settings.corners == "number") {
                this._drawRoundRect(this._settings.corners);
            }
            else {
                let corners = Object.assign({}, KNSprite_BaseRect.DefaultCornerSettings(), this.settings.corners);
                this._drawAllCornersRect(corners);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Draws a rounded rectangle.
     * @param {number} radius - The radius of the corners.
     * @private
     */
    _drawRoundRect(radius) {
        if (!this.isHaveGradient()) {
            this._graphics.beginFill(KColor.HexToColorNumber(this._settings.fillColor), this._settings.fillAlpha);
        }
        this._graphics.drawRoundedRect(0, 0, this._settings.width, this._settings.height, radius);
        if (this._settings.strokeWidth > 0) {
            let strokeWidth = this._settings.strokeWidth;
            // * Draw Stroke Around the Rect
            this._graphics.lineStyle(this._settings.strokeWidth, KColor.HexToColorNumber(this._settings.strokeColor), this._settings.strokeAlpha);
            this._graphics.drawRoundedRect(-strokeWidth / 2, -strokeWidth / 2, this._settings.width + strokeWidth / 2, this._settings.height + strokeWidth / 2, radius);
        }
        if (!this.isHaveGradient()) {
            this._graphics.endFill();
        }
    }
    /**
     * Draws a rectangle with different corner radii.
     * @param {RectCorners} corners - The radii of the corners.
     * @private
     */
    _drawAllCornersRect(corners) {
        if (!this.isHaveGradient()) {
            this._graphics.beginFill(KColor.HexToColorNumber(this._settings.fillColor), this._settings.fillAlpha);
        }
        this._drawRoundedRectComplex(0, 0, this._settings.width, this._settings.height, corners.topLeft, corners.topRight, corners.bottomRight, corners.bottomLeft);
        if (this._settings.strokeWidth > 0) {
            let strokeWidth = this._settings.strokeWidth;
            // * Draw Stroke Around the Rect
            this._graphics.lineStyle(this._settings.strokeWidth, KColor.HexToColorNumber(this._settings.strokeColor), this._settings.strokeAlpha);
            this._drawRoundedRectComplex(-strokeWidth / 2, -strokeWidth / 2, this._settings.width + strokeWidth / 2, this._settings.height + strokeWidth / 2, corners.topLeft, corners.topRight, corners.bottomRight, corners.bottomLeft);
            // this._graphics.closePath();
        }
        if (!this.isHaveGradient()) {
            this._graphics.endFill();
        }
    }
    /**
     * Draws a complex rounded rectangle with different corner radii.
     * @param {number} x - The x-coordinate of the rectangle.
     * @param {number} y - The y-coordinate of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {number} radiusTL - The radius of the top-left corner.
     * @param {number} radiusTR - The radius of the top-right corner.
     * @param {number} radiusBR - The radius of the bottom-right corner.
     * @param {number} radiusBL - The radius of the bottom-left corner.
     * @private
     */
    _drawRoundedRectComplex(x, y, width, height, radiusTL, radiusTR, radiusBR, radiusBL) {
        this._graphics.moveTo(x + radiusTL, y);
        this._graphics.lineTo(x + width - radiusTR, y);
        if (radiusTR > 0)
            this._graphics.quadraticCurveTo(x + width, y, x + width, y + radiusTR);
        this._graphics.lineTo(x + width, y + height - radiusBR);
        if (radiusBR > 0)
            this._graphics.quadraticCurveTo(x + width, y + height, x + width - radiusBR, y + height);
        this._graphics.lineTo(x + radiusBL, y + height);
        if (radiusBL > 0)
            this._graphics.quadraticCurveTo(x, y + height, x, y + height - radiusBL);
        this._graphics.lineTo(x, y + radiusTL);
        if (radiusTL > 0)
            this._graphics.quadraticCurveTo(x, y, x + radiusTL, y);
    }
    /**
     * Applies the size settings to the base rectangle sprite and its graphics object.
     * @private
     */
    _applySize() {
        this.width = this._settings.width;
        this.height = this._settings.height;
    }
}
class KNSprite_Button extends KNSprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._isForcePressed = false;
        this._settings = Object.assign(KNSprite_Button.DefaultSettings(), _settings);
        this._create();
        this._applySettings();
    }
    static DefaultSettings() {
        return {
            "imageName": "",
            "folderName": "pictures",
            "imageMargins": 20,
            "width": 160,
            "height": 60,
            "clickSe": "Cursor1",
            "desaturateWhenDisabled": false,
            "tint": "",
            "tintAlpha": 0.5,
            "overTint": "#FFFFDD",
            "overTintAlpha": 0.5,
            "activeTint": "#AAAAAA",
            "activeTintAlpha": 0.5,
            "disabledTint": "#AAAAAA",
            "disabledTintAlpha": 0.5,
            "keyboardKey": "",
            "keyboardHandled": true,
            "enabled": true,
        };
    }
    isCanHandleTouch() {
        return true;
    }
    isSupportKeyboardHandle() {
        return this._settings.keyboardHandled == true;
    }
    isClickEnabled() {
        return super.isClickEnabled() && this.opacity != 0;
    }
    onPress() {
        super.onPress();
        this._refreshTint();
    }
    onReleased() {
        super.onReleased();
        this._refreshTint();
    }
    onMouseEnter() {
        super.onMouseEnter();
        this._refreshTint();
    }
    onMouseExit() {
        super.onMouseExit();
        this._refreshTint();
    }
    onClick() {
        try {
            if (this.isDisabled())
                return;
            if (this.isClickEnabled()) {
                KAudio.PlaySE(this._settings.clickSe);
            }
            super.onClick();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Gets the current settings of the Button.
     * @returns {ButtonSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Returns an object with data bindings for width, height, and size.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            style: (v) => { if (KDX.any(v))
                this.setStyle(v); },
            enable: (v) => { if (KDX.any(v))
                this.setEnabledState(v); },
            handler: (v) => { this.addClickHandler(v); }
        });
    }
    setStyle(style) {
        this._settings = Object.assign(this._settings, style);
        this._applySettings();
    }
    /**
     * Sets the size of the sprite button.
     *
     * @param {number | string} [width=160] - The width of the button. Can be a number or a string.
     * @param {number | string} [height=60] - The height of the button. Can be a number or a string.
     *
     * @throws {Error} Will throw an error if the width or height cannot be converted.
     */
    setSize(width = 160, height = 60) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            if (_width != null)
                this._settings.width = _width;
            if (_height != null)
                this._settings.height = _height;
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return this._settings.width;
    }
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return this._settings.height;
    }
    update() {
        super.update();
        if (this.isClickEnabled()) {
            this._updateButtonKeyboardHandling();
        }
    }
    isEnabled() {
        return !this.isDisabled();
    }
    setEnabledState(enabled) {
        try {
            this._settings.enabled = enabled;
            if (enabled) {
                this._enable();
            }
            else {
                this._disable();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    addClickHandler(handler) {
        this._handleOkAction = handler;
    }
    // * Only visual
    simulateClickEffect() {
        this._isForcePressed = true;
        setTimeout(() => {
            try {
                this._isForcePressed = false;
                this._refreshTint();
            }
            catch (error) {
                console.warn(error);
            }
        }, 100);
        this._refreshTint();
    }
    enable() {
        this.setEnabledState(true);
    }
    disable() {
        this.setEnabledState(false);
    }
    _create() {
        this._buttonPlane = new KNSprite_Plane({
            "width": this._settings.width,
            "height": this._settings.height,
            "margins": this._settings.imageMargins,
            "imageName": this._settings.imageName,
            "folderName": this._settings.folderName,
        });
        this.addChild(this._buttonPlane);
    }
    _applySettings() {
        try {
            this._onResize();
            this._refreshTint();
            this._refreshState();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _onResize() {
        try {
            this.width = this._settings.width;
            this.height = this._settings.height;
            this._buttonPlane.setSize(this._settings.width, this._settings.height);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshTint() {
        try {
            if (this.isPressed() || this._isForcePressed) {
                this._applyTint(this._settings.activeTint, this._settings.activeTintAlpha);
            }
            else if (this.isHovered()) {
                this._applyTint(this._settings.overTint, this._settings.overTintAlpha);
            }
            else {
                this._applyTint(this._settings.tint, this._settings.tintAlpha);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _applyTint(color, alpha = 0.5) {
        try {
            if (!KString.any(color)) {
                this.removeEffect(KNSpriteEffects.Tint);
                return;
            }
            else {
                let tintColor = KColor.HexToColorNumber(color);
                this.addTintEffect({
                    "color": tintColor,
                    "alpha": alpha
                });
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshState() {
        try {
            this.setEnabledState(this._settings.enabled);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _enable() {
        this._isDisabled = false;
        try {
            if (this._settings.desaturateWhenDisabled) {
                this.removeEffect(KNSpriteEffects.Desaturate);
            }
            this._refreshTint();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _disable() {
        try {
            this._isDisabled = true;
            if (this._settings.desaturateWhenDisabled) {
                this.addDesaturateEffect();
            }
            else if (KString.any(this._settings.disabledTint)) {
                this._applyTint(this._settings.disabledTint, this._settings.disabledTintAlpha);
            }
            else {
                this._applyTint(this._settings.tint, this._settings.tintAlpha);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateButtonKeyboardHandling() {
        if (KString.any(this._settings.keyboardKey)) {
            if (Input.isTriggered(this._settings.keyboardKey)) {
                try {
                    Input.clear();
                    this.onClick();
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
    }
    _activateHandlerVisually() {
        try {
            if (this.isDisabled()) {
                super._activateHandlerVisually();
                return;
            }
            this._applyTint(this._settings.overTint, this._settings.overTintAlpha);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _deactivateHandlerVisually() {
        try {
            if (this.isDisabled()) {
                super._deactivateHandlerVisually();
                return;
            }
            this._refreshTint();
        }
        catch (error) {
            console.warn(error);
        }
    }
}
// * NUI 1.1
// * rev 11.09.24
// * "type": "gauge"
class KNSprite_Gauge extends KNSprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._settings = Object.assign({}, KNSprite_Gauge.DefaultSettings(), _settings);
        this._loaded = false;
        this._lastValue = 1;
        this._create();
        this._applySettings();
    }
    /**
     * Returns the default settings for the gauge sprite.
     * @returns {GaugeSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "fillMode": "color",
            "fillColor": "#ffffff",
            "fillOpacity": 255,
            "imageName": "",
            "folderName": "pictures",
            "margins": 2,
            "width": "auto",
            "height": "auto",
            "mask": "",
            "backColor": "#000000",
            "backImage": "",
            "backOpacity": 255,
            "vertical": false
        };
    }
    /**
     * Checks if the gauge sprite is loaded.
     * @returns {boolean} True if loaded, otherwise false.
     */
    isLoaded() {
        try {
            return this._loaded === true;
        }
        catch (e) {
            console.warn(e);
        }
        return false;
    }
    /**
     * Gets the real width of the gauge sprite.
     * @returns {number} The real width.
     */
    realWidth() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this._settings.width !== "auto") {
                return this._settings.width;
            }
            else if (this._gaugeSpr) {
                return this._gaugeSpr.realWidth();
            }
        }
        catch (e) {
            console.warn(e);
        }
        return this.width;
    }
    /**
     * Gets the real height of the gauge sprite.
     * @returns {number} The real height.
     */
    realHeight() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this._settings.height !== "auto") {
                return this._settings.height;
            }
            else if (this._gaugeSpr) {
                return this._gaugeSpr.realHeight();
            }
        }
        catch (e) {
            console.warn(e);
        }
        return this.height;
    }
    /**
     * Returns an object with data bindings for width, height, size, rate, fillImage, fillColor, and fillOpacity.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this._settings.height); },
            height: (v) => { if (v)
                this.setSize(this._settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            rate: (v) => { if (v)
                this.draw(v); },
            fillImage: (v) => { if (v)
                this.setFillImage(v); },
            fillColor: (v) => { if (v)
                this.setFillColor(v); },
            fillOpacity: (v) => { if (v)
                this.setFillOpacity(v); }
        });
    }
    /**
     * Draws the gauge with the specified percentage.
     * @param {number} [percent=1] - The percentage to draw.
     */
    draw(percent = 1) {
        try {
            if (!this.isLoaded()) {
                this.requireFunc('draw', arguments);
                return;
            }
            this._lastValue = percent;
            this._drawGauge(percent);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Sets the fill opacity of the gauge.
     * @param {number} opacity - The fill opacity.
     */
    setFillOpacity(opacity) {
        try {
            this._settings.fillOpacity = opacity;
            if (this._fillLayer) {
                this._fillLayer.opacity = opacity;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Sets the fill color of the gauge.
     * @param {string} color - The fill color.
     */
    setFillColor(color) {
        try {
            this._settings.fillColor = color;
            if (this._fillColorBitmap) {
                this._createColorGaugeFillColorBitmap();
                this._drawGauge(this._lastValue);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Sets the fill image of the gauge.
     * @param {string} imageName - The name of the fill image.
     */
    setFillImage(imageName) {
        try {
            this._settings.imageName = imageName;
            this._applySettings();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Sets the size of the gauge sprite.
     * @param {number | string} [width="auto"] - The width of the sprite.
     * @param {number | string} [height="auto"] - The height of the sprite.
     */
    setSize(width = "auto", height = "auto") {
        try {
            if (width !== "auto") {
                width = this.convertStringSizeValue(width, 'width', this);
            }
            if (height !== "auto") {
                height = this.convertStringSizeValue(height, 'height', this);
            }
            if (width)
                this._settings.width = width;
            if (height)
                this._settings.height = height;
            this._applySettings();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the base layer sprite.
     * @private
     */
    _create() {
        this._gaugeBaseLayer = new KSprite();
        this.addChild(this._gaugeBaseLayer);
    }
    /**
     * Applies the current settings to the gauge sprite.
     * @private
     */
    _applySettings() {
        try {
            this._loaded = false;
            this._destroyExistGauge();
            this._createGaugeFromSettings();
            this.draw(this._lastValue);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Destroys the existing gauge sprite.
     * @private
     */
    _destroyExistGauge() {
        try {
            if (!this._gaugeSpr)
                return;
            this._gaugeSpr.removeFromParent();
            this._gaugeSpr = null;
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the gauge sprite based on the current settings.
     * @private
     */
    _createGaugeFromSettings() {
        try {
            this._gaugeSpr = new KNSprite();
            this._gaugeBaseLayer.addChild(this._gaugeSpr);
            switch (this._settings.fillMode) {
                case "image":
                    this._createImageGauge();
                    break;
                case "plane":
                    this._createPlaneGauge();
                    break;
                case "color":
                    this._createColorGauge();
                    break;
                default:
                    console.warn("Unknown Gauge fillMode: " + this._settings.fillMode);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the image gauge.
     * @private
     */
    _createImageGauge() {
        try {
            this._gaugeSourceImage = new KNSprite_Image({
                imageName: this._settings.imageName,
                folderName: this._settings.folderName,
                width: this._settings.width,
                height: this._settings.height
            });
            this._gaugeSourceImage.addLoadListener(this._onGaugeFillImageLoaded.bind(this));
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Handles the event when the gauge fill image is loaded.
     * @private
     */
    _onGaugeFillImageLoaded() {
        try {
            let width = this._gaugeSourceImage.realWidth();
            let height = this._gaugeSourceImage.realHeight();
            this._addBackground(width, height);
            this._fillLayer = new KSprite(new Bitmap(width, height));
            this._fillLayer.opacity = this._settings.fillOpacity;
            this._gaugeSpr.addChild(this._fillLayer);
            this._addMask();
            this._onGaugeLoadedAndReady();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Handles the event when the gauge is loaded and ready.
     * @private
     */
    _onGaugeLoadedAndReady() {
        try {
            this._loaded = true;
            this.width = this.realWidth();
            this.height = this.realHeight();
            this.executeRequiredFuncs();
            this.executeLoadListeners();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the plane gauge.
     * @private
     */
    _createPlaneGauge() {
        try {
            // * Нельзя создать Plane Gauge с auto размером, поэтому задаём стандартные значения
            if (this._settings.width === "auto")
                this._settings.width = 80;
            if (this._settings.height === "auto")
                this._settings.height = 20;
            this._addBackground(this._settings.width, this._settings.height);
            this._fillLayer = new KNSprite_Plane({
                imageName: this._settings.imageName,
                folderName: this._settings.folderName,
                width: this._settings.width,
                height: this._settings.height,
                margins: this._settings.margins
            });
            this._fillLayer.opacity = this._settings.fillOpacity;
            this._gaugeSpr.addChild(this._fillLayer);
            this._addMask();
            this._onGaugeLoadedAndReady();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the color gauge.
     * @private
     */
    _createColorGauge() {
        try {
            // * Нельзя создать цветную Gauge с auto размером, поэтому задаём стандартные значения
            if (this._settings.width === "auto")
                this._settings.width = 80;
            if (this._settings.height === "auto")
                this._settings.height = 20;
            this._addBackground(this._settings.width, this._settings.height);
            this._fillLayer = new KSprite(new Bitmap(this._settings.width, this._settings.height));
            this._fillLayer.opacity = this._settings.fillOpacity;
            this._createColorGaugeFillColorBitmap();
            this._gaugeSpr.addChild(this._fillLayer);
            this._addMask();
            this._onGaugeLoadedAndReady();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the fill color bitmap for the color gauge.
     * @private
     */
    _createColorGaugeFillColorBitmap() {
        try {
            this._fillColorBitmap = new Bitmap(this._settings.width, this._settings.height);
            this._fillColorBitmap.fillAll(this._settings.fillColor);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Adds the background to the gauge sprite.
     * @param {number} width - The width of the background.
     * @param {number} height - The height of the background.
     * @private
     */
    _addBackground(width, height) {
        try {
            if (!this._gaugeSpr)
                return;
            let background = null;
            if (KString.any(this._settings.backImage)) {
                background = this._createGaugeBackgroundImage();
            }
            else if (KString.any(this._settings.backColor)) {
                background = this._createGaugeBackgroundColor(width, height, this._settings.backColor);
            }
            if (background) {
                if (this._settings.backOpacity) {
                    background.opacity = this._settings.backOpacity;
                }
                this._gaugeSpr.addChild(background);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Adds the mask to the gauge sprite.
     * @private
     */
    _addMask() {
        try {
            if (!this._gaugeSpr)
                return;
            if (!KString.any(this._settings.mask))
                return;
            const gaugeMask = new KNSprite_Image({
                imageName: this._settings.mask,
                folderName: this._settings.folderName,
                width: this._settings.width,
                height: this._settings.height
            });
            this._gaugeSpr.mask = gaugeMask.image;
            this._gaugeSpr.addChild(gaugeMask);
        }
        catch (e) {
            console.warn(e);
            this._gaugeSpr.mask = null;
        }
    }
    /**
     * Creates the background color for the gauge sprite.
     * @param {number} width - The width of the background.
     * @param {number} height - The height of the background.
     * @param {string} color - The color of the background.
     * @returns {KSprite} The background sprite.
     * @private
     */
    _createGaugeBackgroundColor(width, height, color) {
        try {
            const background = new KSprite(new Bitmap(width, height));
            background.fillAll(color);
            return background;
        }
        catch (e) {
            console.warn(e);
            return new KSprite();
        }
    }
    /**
     * Creates the background image for the gauge sprite.
     * @returns {KNSprite_Image} The background image sprite.
     * @private
     */
    _createGaugeBackgroundImage() {
        try {
            return new KNSprite_Image({
                imageName: this._settings.backImage,
                folderName: this._settings.folderName,
                width: this._settings.width,
                height: this._settings.height
            });
        }
        catch (e) {
            console.warn(e);
            return new KNSprite();
        }
    }
    /**
     * Draws the gauge with the specified percentage.
     * @param {number} percent - The percentage to draw.
     * @private
     */
    _drawGauge(percent) {
        try {
            if (!this._fillLayer)
                return;
            if (this._settings.vertical == true) {
                this._drawVertical(percent);
            }
            else {
                this._drawHorizontal(percent);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the horizontal gauge based on the fill mode and percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawHorizontal(percent) {
        try {
            switch (this._settings.fillMode) {
                case "image":
                    this._drawImageGauge(percent);
                    break;
                case "plane":
                    this._drawPlaneGauge(percent);
                    break;
                case "color":
                    this._drawColorGauge(percent);
                    break;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the image gauge with the specified percentage.
     * @param {number} percent - The percentage to draw.
     * @private
     */
    _drawImageGauge(percent) {
        try {
            this._fillLayer.bitmap.clear();
            const fillBitmap = this._gaugeSourceImage.image.bitmap;
            this._drawGaugeBitmapBased(percent, fillBitmap);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the gauge based on the specified bitmap and percentage.
     * @param {number} percent - The percentage to draw.
     * @param {Bitmap} fillBitmap - The bitmap to use for drawing.
     * @private
     */
    _drawGaugeBitmapBased(percent, fillBitmap) {
        try {
            const w = this.realWidth() * percent;
            const h = this.realHeight();
            this._fillLayer.bitmap.blt(fillBitmap, 0, 0, w, h, 0, 0);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the horizontal color gauge based on the percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawColorGauge(percent) {
        try {
            this._fillLayer.bitmap.clear();
            const fillBitmap = this._fillColorBitmap;
            this._drawGaugeBitmapBased(percent, fillBitmap);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the horizontal plane gauge based on the percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawPlaneGauge(percent) {
        try {
            const w = this.realWidth() * percent;
            const h = this.realHeight();
            if (this._fillLayer['setSize'])
                this._fillLayer['setSize'](w, h);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the vertical gauge based on the fill mode and percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawVertical(percent) {
        try {
            switch (this._settings.fillMode) {
                case "image":
                    this._drawImageGaugeVertical(percent);
                    break;
                case "plane":
                    this._drawPlaneGaugeVertical(percent);
                    break;
                case "color":
                    this._drawColorGaugeVertical(percent);
                    break;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the vertical image gauge based on the percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawImageGaugeVertical(percent) {
        try {
            this._fillLayer.bitmap.clear();
            const fillBitmap = this._gaugeSourceImage.image.bitmap;
            this._drawGaugeBitmapBasedVertical(percent, fillBitmap);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the vertical gauge based on the bitmap and percentage.
     * @param {number} percent - The percentage to fill the gauge.
     * @param {Bitmap} fillBitmap - The bitmap to use for the gauge.
     */
    _drawGaugeBitmapBasedVertical(percent, fillBitmap) {
        try {
            const w = this.realWidth();
            const h = this.realHeight() * percent;
            this._fillLayer.bitmap.blt(fillBitmap, 0, 0, w, h, 0, 0);
            this._fillLayer.y = this.realHeight() - h;
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the vertical color gauge based on the percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawColorGaugeVertical(percent) {
        try {
            this._fillLayer.bitmap.clear();
            const fillBitmap = this._fillColorBitmap;
            this._drawGaugeBitmapBasedVertical(percent, fillBitmap);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the vertical plane gauge based on the percentage.
     * @param {number} percent - The percentage to fill the gauge.
     */
    _drawPlaneGaugeVertical(percent) {
        try {
            const w = this.realWidth();
            const h = this.realHeight() * percent;
            if (this._fillLayer['setSize'])
                this._fillLayer['setSize'](w, h);
            this._fillLayer.y = this.realHeight() - h;
        }
        catch (e) {
            console.warn(e);
        }
    }
}
//NUI 1.0
//rev 11.09.24
//"type": "group"
class KNSprite_Group extends KNSprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._isNeedWaitLoadingChild = false;
        this._settings = Object.assign({}, KNSprite_Group.DefaultSettings(), _settings);
        if (this._settings.horizontalNavigation === true) {
            this.isVerticalKeyboardNavigation = () => false;
        }
        if (this._settings.freeNavigation === true) {
            this.isFreeKeyboardNavigation = () => true;
        }
        this._applySettings();
        this._onResize();
    }
    /**
     * Gets the current settings of the image sprite.
     * @returns {GroupSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Returns the default settings for the sprite group.
     * @returns {GroupSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "keyboardHandling": false,
            "horizontalNavigation": false,
            "freeNavigation": false,
            "width": "auto",
            "height": "auto"
        };
    }
    /**
     * Returns an object with data bindings for width, height, and size.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this._settings.height); },
            height: (v) => { if (v)
                this.setSize(this._settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); }
        });
    }
    /**
     * Updates the sprite group.
     */
    update() {
        super.update();
        try {
            if (this._isNeedWaitLoadingChild === true) {
                this.refreshBindings(this._dataObjectRef, true);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Refreshes the bindings for the sprite group.
     * @param {object} dataObject - The data object to bind.
     * @param {boolean} recursive - Whether to refresh bindings recursively.
     */
    refreshBindings(dataObject, recursive) {
        super.refreshBindings(dataObject, recursive);
        for (const c of this.children) {
            if (c instanceof KNSprite) {
                if (!c.isLoaded()) {
                    this._startWaitLoading(dataObject);
                    return;
                }
            }
        }
        this._isNeedWaitLoadingChild = false;
    }
    /**
     * Starts waiting for a child to load.
     * @param {object} dataObjectRef - The data object reference.
     */
    _startWaitLoading(dataObjectRef) {
        try {
            this._dataObjectRef = dataObjectRef;
            this._isNeedWaitLoadingChild = true;
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Sets the size of the sprite group.
     * @param {number | string} [width="auto"] - The width of the sprite group.
     * @param {number | string} [height="auto"] - The height of the sprite group.
     */
    setSize(width = 'auto', height = 'auto') {
        try {
            if (width !== "auto") {
                width = this.convertStringSizeValue(width, 'width', this);
            }
            if (height !== "auto") {
                height = this.convertStringSizeValue(height, 'height', this);
            }
            if (width != null)
                this._settings.width = width;
            if (height != null)
                this._settings.height = height;
            this._onResize();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Gets the real width of the sprite group.
     * @returns {number} The real width.
     */
    realWidth() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this._settings.width === "auto") {
                return this._calculateMax("x", "width");
            }
        }
        catch (e) {
            console.warn(e);
        }
        return this._settings.width;
    }
    /**
     * Gets the real height of the sprite group.
     * @returns {number} The real height.
     */
    realHeight() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this._settings.height === "auto") {
                return this._calculateMax("y", "height");
            }
        }
        catch (e) {
            console.warn(e);
        }
        return this._settings.height;
    }
    /**
     * Calculates the maximum size of the sprite group.
     * @param {'x' | 'y'} axis - The axis to calculate.
     * @param {string} b - The size property to calculate.
     * @returns {number} The maximum size.
     */
    _calculateMax(axis, b) {
        let value = 0;
        try {
            for (const child of this.children) {
                const size = child[axis] + NUtils.GetSpriteRealSize(b, child);
                if (size > value)
                    value = size;
            }
            if (value < 0)
                value = 0;
        }
        catch (e) {
            console.warn(e);
            return 0;
        }
        return value;
    }
    /**
     * Applies the current settings to the sprite group.
     * @private
     */
    _applySettings() {
        try {
            if (this._settings.keyboardHandling === true) {
                this.activateHandlerManagment();
            }
            else {
                this.deactivateHandlerManagment();
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Resizes the sprite group based on its real width and height.
     * @private
     */
    _onResize() {
        try {
            this.width = this.realWidth();
            this.height = this.realHeight();
        }
        catch (e) {
            console.warn(e);
        }
    }
}
// * NUI 1.0
// * rev 07.10.24
// * "type": "image"
/**
 * Represents an image sprite used in the NUI system.
 * @class
 * @extends KNSprite
 */
class KNSprite_Image extends KNSprite {
    /**
     * Constructs a new instance of the NUI_Sprite_Image class.
     * @param _settings - The optional settings for the image sprite.
     */
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._isLoaded = false;
        this._settings = Object.assign({}, KNSprite_Image.DefaultSettings(), _settings);
        this._create();
        this._onResize();
        this.draw(this._settings.imageName);
    }
    // * DefaultSettings in JSON format (for easy copy-paste)
    /**
     * Returns the default settings for the image sprite.
     * @returns {ImageSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "width": "auto",
            "height": "auto",
            "imageName": "",
            "folderName": "pictures",
            "keepAspect": false,
            "useAspectSize": false
        };
    }
    /**
     * Gets the current settings of the image sprite.
     * @returns {ImageSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Gets the image sprite.
     * @returns {KSprite} The image sprite.
     */
    get image() {
        return this._image;
    }
    /**
     * Checks if the image sprite is loaded.
     * @returns {boolean} True if loaded, otherwise false.
     */
    isLoaded() {
        try {
            /*if(this.settings.width != 'auto' && this.settings.height != 'auto') {
                return true;
            }*/
            return this._isLoaded == true;
        }
        catch (error) {
            console.warn(error);
        }
        return false;
    }
    /**
     * Gets the real width of the image sprite.
     * @returns {number} The real width.
     */
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        if (this.settings.useAspectSize == true && this._aspectWidth) {
            return this._aspectWidth;
        }
        if (this.settings.width == 'auto') {
            if (this._srcBitmap) {
                return this._srcBitmap.width;
            }
            else {
                if (this._image.bitmap && this._image.bitmap.isReady()) {
                    return this._image.bitmap.width;
                }
            }
        }
        else {
            return this.settings.width;
        }
        return this.width;
    }
    /**
     * Gets the real height of the image sprite.
     * @returns {number} The real height.
     */
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        if (this.settings.useAspectSize == true && this._aspectHeight) {
            return this._aspectHeight;
        }
        if (this.settings.height == 'auto') {
            if (this._srcBitmap) {
                return this._srcBitmap.height;
            }
            else {
                if (this._image.bitmap && this._image.bitmap.isReady()) {
                    return this._image.bitmap.height;
                }
            }
        }
        else {
            return this.settings.height;
        }
        return this.height;
    }
    /**
     * Sets the image for the sprite.
     * @param {string} imageName - The name of the image.
     * @param {string} [folderName] - The name of the folder containing the image.
     */
    setImage(imageName, folderName) {
        if (KString.any(folderName)) {
            this._settings.folderName = folderName;
        }
        this.draw(imageName);
    }
    isHoveredByCursor() {
        if (this.image) {
            return this.image.isHoveredByCursor();
        }
        else {
            return super.isHoveredByCursor();
        }
    }
    /**
     * Returns an object with data bindings for width, height, size, image, and icon.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            image: (v) => { this.draw(v); },
            icon: (v) => { this.drawIcon(v); }
        });
    }
    /**
     * Sets the size of the image sprite.
     * @param {number | string} [width='auto'] - The width of the sprite.
     * @param {number | string} [height='auto'] - The height of the sprite.
     */
    setSize(width = 'auto', height = 'auto') {
        try {
            if (width != 'auto')
                width = this.convertStringSizeValue(width, 'width', this);
            if (height != 'auto')
                height = this.convertStringSizeValue(height, 'height', this);
            if (width != null)
                this._settings.width = width;
            if (height != null)
                this._settings.height = height;
            this._onResize();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Draws an icon on the sprite.
     * @param {number} iconIndex - The index of the icon.
     */
    drawIcon(iconIndex) {
        try {
            if (typeof (iconIndex) == 'number') {
                this.draw(iconIndex);
            }
            else {
                this.draw("");
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Draws an image or icon on the sprite.
     * @param {string | number} [imageName=""] - The name of the image or the index of the icon.
     */
    draw(imageName = "") {
        if (typeof (imageName) == 'string' && KString.any(imageName)) {
            this._drawImage(imageName);
            return;
        }
        if (typeof (imageName) == 'number' && imageName >= 0) {
            this._drawIcon(imageName);
            return;
        }
        this._srcBitmap = null;
        this._onResize();
    }
    /**
     * Draws an icon on the sprite.
     * @param {number} iconIndex - The index of the icon.
     * @private
     */
    _drawIcon(iconIndex) {
        try {
            let size = this.settings.width == 'auto' ? 32 : this.settings.width;
            this.settings.height = size;
            this._srcBitmap = new Bitmap(size, size);
            KBitmap.DrawIcon(this._srcBitmap, iconIndex, 0, 0, size);
            this._isLoaded = true;
            this._onResize();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Draws an image on the sprite.
     * @param {string} imageName - The name of the image.
     * @private
     */
    _drawImage(imageName) {
        this._isLoaded = false;
        this._srcBitmap = ImageManager.loadBitmap('img/' + this.settings.folderName + '/', imageName, 0, false);
        this._srcBitmap.addLoadListener(() => {
            this._isLoaded = true;
            this._onResize();
            this.executeRequiredFuncs();
            this.executeLoadListeners();
        });
    }
    /**
     * Creates the image sprite and adds it as a child.
     * @private
     */
    _create() {
        this._image = new KSprite(new Bitmap(1, 1));
        this._image.isNeedCheckAlphaPixels = () => true;
        this.addChild(this._image);
    }
    /**
     * Resizes the image sprite.
     * @private
     */
    _onResize() {
        try {
            this._aspectWidth = null;
            this._aspectHeight = null;
            this._image.bitmap = new Bitmap(this.realWidth(), this.realHeight());
            if (!this._srcBitmap)
                return;
            let fw = this.realWidth();
            let fh = this.realHeight();
            if (this.settings.keepAspect) {
                let aspect = this._calculateAspect(this._image.bitmap.width, this._image.bitmap.height, this._srcBitmap.width, this._srcBitmap.height);
                fw = aspect.width;
                fh = aspect.height;
                if (fh < this._image.bitmap.height) {
                    this._aspectHeight = fh;
                }
                else {
                    this._aspectHeight = this._image.bitmap.height;
                }
                if (fw < this._image.bitmap.width) {
                    this._aspectWidth = fw;
                }
                else {
                    this._aspectWidth = this._image.bitmap.width;
                }
            }
            this._image.bitmap.blt(this._srcBitmap, 0, 0, this._srcBitmap.width, this._srcBitmap.height, 0, 0, fw, fh);
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Calculates the aspect ratio for resizing.
     * @param {number} containerWidth - The width of the container.
     * @param {number} containerHeight - The height of the container.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @returns {{ width: number, height: number }} The calculated width and height.
     * @private
     */
    _calculateAspect(containerWidth, containerHeight, width, height) {
        let aspect = width / height;
        let containerAspectRatio = containerWidth / containerHeight;
        if (aspect > containerAspectRatio) {
            width = containerWidth;
            height = width / aspect;
        }
        else {
            height = containerHeight;
            width = height * aspect;
        }
        return { width, height };
    }
}
class KNSprite_ImageButton extends KNSprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._isSimulation = false;
        this._settings = Object.assign(KNSprite_ImageButton.DefaultSettings(), _settings);
        this._create();
        this._applySettings();
    }
    static DefaultSettings() {
        return {
            "folderName": "pictures",
            "imageName": "",
            "hoverImageName": "",
            "pressedImageName": "",
            "disabledImageName": "",
            "isCheckAlpha": false,
            "width": 160,
            "height": 60,
            "clickSe": "Cursor1",
            "desaturateWhenDisabled": false,
            "tint": "",
            "tintAlpha": 0.5,
            "overTint": "",
            "overTintAlpha": 0.5,
            "activeTint": "",
            "activeTintAlpha": 0.5,
            "disabledTint": "",
            "disabledTintAlpha": 0.5,
            "keyboardKey": "",
            "keyboardHandled": true,
            "enabled": true,
        };
    }
    isCanHandleTouch() {
        return true;
    }
    isSupportKeyboardHandle() {
        return this._settings.keyboardHandled == true;
    }
    isClickEnabled() {
        return super.isClickEnabled() && this.opacity != 0;
    }
    onPress() {
        super.onPress();
        this._refreshVisualState();
    }
    onReleased() {
        super.onReleased();
        this._refreshVisualState();
    }
    onMouseEnter() {
        super.onMouseEnter();
        this._refreshVisualState();
    }
    onMouseExit() {
        super.onMouseExit();
        this._refreshVisualState();
    }
    isHoveredByCursor() {
        if (this._buttonImage && this._buttonImage.visible && this._buttonImage.isHoveredByCursor()) {
            return true;
        }
        if (this._hoveredImage && this._hoveredImage.visible && this._hoveredImage.isHoveredByCursor()) {
            return true;
        }
        if (this._pressedImage && this._pressedImage.visible && this._pressedImage.isHoveredByCursor()) {
            return true;
        }
        if (this._disabledImage && this._disabledImage.visible && this._disabledImage.isHoveredByCursor()) {
            return true;
        }
        return false;
    }
    onClick() {
        try {
            if (this.isDisabled())
                return;
            if (this.isClickEnabled()) {
                KAudio.PlaySE(this._settings.clickSe);
            }
            super.onClick();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Gets the current settings of the Button.
     * @returns {ImageButtonSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Returns an object with data bindings for width, height, and size.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            style: (v) => { if (KDX.any(v))
                this.setStyle(v); },
            enable: (v) => { if (KDX.any(v))
                this.setEnabledState(v); },
            handler: (v) => { this.addClickHandler(v); },
            image: (v) => { if (KDX.any(v))
                this.setImage(v); },
            // * Не используются, т.к. этих кнопок может не быть созданно, будет путанница
            //hoveredImage: (v: string) => {  if(KDX.any(v)) this.setHoveredImage(v) },
            //pressedImage: (v: string) => {  if(KDX.any(v)) this.setPressedImage(v) },
            //disabledImage: (v: string) => {  if(KDX.any(v)) this.setDisabledImage(v) }
        });
    }
    setStyle(style) {
        this._settings = Object.assign(this._settings, style);
        this._applySettings();
    }
    setImage(imageName) {
        var _a;
        try {
            this._settings.imageName = imageName;
            (_a = this._buttonImage) === null || _a === void 0 ? void 0 : _a.setImage(imageName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setHoveredImage(imageName) {
        var _a;
        try {
            this._settings.hoverImageName = imageName;
            (_a = this._hoveredImage) === null || _a === void 0 ? void 0 : _a.setImage(imageName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setPressedImage(imageName) {
        var _a;
        try {
            this._settings.pressedImageName = imageName;
            (_a = this._pressedImage) === null || _a === void 0 ? void 0 : _a.setImage(imageName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setDisabledImage(imageName) {
        var _a;
        try {
            this._settings.disabledImageName = imageName;
            (_a = this._disabledImage) === null || _a === void 0 ? void 0 : _a.setImage(imageName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Sets the size of the sprite button.
     *
     * @param {number | string} [width=160] - The width of the button. Can be a number or a string.
     * @param {number | string} [height=60] - The height of the button. Can be a number or a string.
     *
     * @throws {Error} Will throw an error if the width or height cannot be converted.
     */
    setSize(width = 160, height = 60) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            if (_width != null)
                this._settings.width = _width;
            if (_height != null)
                this._settings.height = _height;
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return this._settings.width;
    }
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return this._settings.height;
    }
    update() {
        super.update();
        if (this.isClickEnabled()) {
            this._updateButtonKeyboardHandling();
        }
    }
    isEnabled() {
        return !this.isDisabled();
    }
    setEnabledState(enabled) {
        try {
            this._settings.enabled = enabled;
            if (enabled) {
                this._enable();
            }
            else {
                this._disable();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    addClickHandler(handler) {
        this._handleOkAction = handler;
    }
    // * Only visual
    simulateClickEffect() {
        this._isSimulation = true;
        setTimeout(() => {
            try {
                this._isSimulation = false;
                this._refreshVisualState();
            }
            catch (error) {
                console.warn(error);
            }
        }, 100);
        this._refreshVisualState();
    }
    enable() {
        this.setEnabledState(true);
    }
    disable() {
        this.setEnabledState(false);
    }
    _create() {
        this._buttonImage = new KNSprite_Image({
            "folderName": this._settings.folderName,
            "imageName": this._settings.imageName,
            "width": this._settings.width,
            "height": this._settings.height,
        });
        this.addChild(this._buttonImage);
        if (KString.any(this._settings.hoverImageName)) {
            this._hoveredImage = new KNSprite_Image({
                "folderName": this._settings.folderName,
                "imageName": this._settings.hoverImageName,
                "width": this._settings.width,
                "height": this._settings.height,
            });
            this.addChild(this._hoveredImage);
        }
        if (KString.any(this._settings.pressedImageName)) {
            this._pressedImage = new KNSprite_Image({
                "folderName": this._settings.folderName,
                "imageName": this._settings.pressedImageName,
                "width": this._settings.width,
                "height": this._settings.height,
            });
            this.addChild(this._pressedImage);
        }
        if (KString.any(this._settings.disabledImageName)) {
            this._disabledImage = new KNSprite_Image({
                "folderName": this._settings.folderName,
                "imageName": this._settings.disabledImageName,
                "width": this._settings.width,
                "height": this._settings.height,
            });
            this.addChild(this._disabledImage);
        }
        if (this._settings.isCheckAlpha == true) {
            this._buttonImage.isNeedCheckAlphaPixels = () => true;
            if (this._hoveredImage)
                this._hoveredImage.isNeedCheckAlphaPixels = () => true;
            if (this._pressedImage)
                this._pressedImage.isNeedCheckAlphaPixels = () => true;
            if (this._disabledImage)
                this._disabledImage.isNeedCheckAlphaPixels = () => true;
        }
    }
    _applySettings() {
        try {
            this._onResize();
            this._refreshVisualState();
            this._refreshState();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _onResize() {
        try {
            this.width = this._settings.width;
            this.height = this._settings.height;
            if (this._buttonImage) {
                this._buttonImage.setSize(this._settings.width, this._settings.height);
            }
            if (this._hoveredImage) {
                this._hoveredImage.setSize(this._settings.width, this._settings.height);
            }
            if (this._pressedImage) {
                this._pressedImage.setSize(this._settings.width, this._settings.height);
            }
            if (this._disabledImage) {
                this._disabledImage.setSize(this._settings.width, this._settings.height);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshVisualState() {
        try {
            this._refreshImage();
            this._refreshTint();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshImage() {
        if (this._isSimulation == true) {
            if (this._pressedImage) {
                this._showPressedImage();
            }
            else {
                this._showHoveredImage();
            }
            return;
        }
        if (this.isPressed()) {
            this._showPressedImage();
        }
        else if (this.isHovered()) {
            this._showHoveredImage();
        }
        else {
            this._hideAllButtonImages();
            this._buttonImage.visible = true;
        }
    }
    _hideAllButtonImages() {
        if (this._buttonImage) {
            this._buttonImage.visible = false;
        }
        if (this._hoveredImage) {
            this._hoveredImage.visible = false;
        }
        if (this._pressedImage) {
            this._pressedImage.visible = false;
        }
        if (this._disabledImage) {
            this._disabledImage.visible = false;
        }
    }
    _showHoveredImage() {
        this._hideAllButtonImages();
        if (this._hoveredImage) {
            this._hoveredImage.visible = true;
        }
        else {
            this._buttonImage.visible = true;
        }
    }
    _showPressedImage() {
        this._hideAllButtonImages();
        if (this._pressedImage) {
            this._pressedImage.visible = true;
        }
        else {
            this._buttonImage.visible = true;
        }
    }
    _showDisabledImage() {
        this._hideAllButtonImages();
        if (this._disabledImage) {
            this._disabledImage.visible = true;
        }
        else {
            this._buttonImage.visible = true;
        }
    }
    _refreshTint() {
        if (this.isPressed() || this._isSimulation) {
            this._applyTint(this._settings.activeTint, this._settings.activeTintAlpha);
        }
        else if (this.isHovered()) {
            this._applyTint(this._settings.overTint, this._settings.overTintAlpha);
        }
        else {
            this._applyTint(this._settings.tint, this._settings.tintAlpha);
        }
    }
    _applyTint(color, alpha = 0.5) {
        try {
            if (!KString.any(color)) {
                this.removeEffect(KNSpriteEffects.Tint);
                return;
            }
            else {
                let tintColor = KColor.HexToColorNumber(color);
                this.addTintEffect({
                    "color": tintColor,
                    "alpha": alpha
                });
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshState() {
        try {
            this.setEnabledState(this._settings.enabled);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _enable() {
        this._isDisabled = false;
        try {
            if (this._settings.desaturateWhenDisabled) {
                this.removeEffect(KNSpriteEffects.Desaturate);
            }
            this._refreshVisualState();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _disable() {
        try {
            this._isDisabled = true;
            this._showDisabledImage();
            if (this._settings.desaturateWhenDisabled) {
                this.addDesaturateEffect();
            }
            else if (KString.any(this._settings.disabledTint)) {
                this._applyTint(this._settings.disabledTint, this._settings.disabledTintAlpha);
            }
            else {
                this._applyTint(this._settings.tint, this._settings.tintAlpha);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateButtonKeyboardHandling() {
        if (KString.any(this._settings.keyboardKey)) {
            if (Input.isTriggered(this._settings.keyboardKey)) {
                try {
                    Input.clear();
                    this.onClick();
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
    }
    _activateHandlerVisually() {
        try {
            if (this.isDisabled()) {
                super._activateHandlerVisually();
                return;
            }
            this._applyTint(this._settings.overTint, this._settings.overTintAlpha);
            this._showHoveredImage();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _deactivateHandlerVisually() {
        try {
            if (this.isDisabled()) {
                super._deactivateHandlerVisually();
                return;
            }
            this._refreshVisualState();
        }
        catch (error) {
            console.warn(error);
        }
    }
}
//NUI 1.0
//rev 10.10.24
//type: "list"
class KNSprite_ItemsList extends KNSprite {
    constructor(settings = {}) {
        super();
        this._settings = Object.assign(KSelectableItemsList.DefaultSettings(), settings);
        this._applySettings();
    }
    get settings() {
        return this._settings;
    }
    get list() {
        return this._list;
    }
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.width;
    }
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.height;
    }
    /**
     * Returns an object with data bindings for width, height, size, text, and style settings.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.realHeight()); },
            height: (v) => { if (v)
                this.setSize(this.realWidth(), v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            maxCols: (v) => { if (v)
                this.setMaxCols(v); }
        });
    }
    setSize(width, height) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            this.settings.width = _width;
            this.settings.height = _height;
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    setMaxCols(value) {
        try {
            this.settings.maxCols = value;
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _applySettings() {
        let storedListData = this._destroyList();
        /*@ts-ignore*/
        this._list = new KSelectableItemsList(0, 0, this.settings);
        /*@ts-ignore*/
        this.addChild(this._list);
        this._restoreData(storedListData);
    }
    _destroyList() {
        if (!this.list)
            return null;
        let storedData = {
            listItems: this.list.getAllItems(),
            activeState: this.list.isOpenAndActive(),
            selectedIdx: this.list.index(),
            /*@ts-ignore*/
            handlers: this.list._handlers
        };
        /*@ts-ignore*/
        this.removeChild(this.list);
        this._list = null;
        return storedData;
    }
    _restoreData(data) {
        if (!data)
            return;
        if (!this.list)
            return;
        this._list.setItems(data.listItems);
        if (data.activeState) {
            this._list.activate(data.selectedIdx);
        }
        for (let key in data.handlers) {
            this._list.setHandler(key, data.handlers[key]);
        }
    }
}
//Класс который позволяет сделать список (на основе Window_Selectable), но из Sprite элементов, а не Draw на Bitmap
class KSelectableItemsList extends Window_Selectable {
    constructor(x = 0, y = 0, settings = {}) {
        let _settings = Object.assign(KSelectableItemsList.DefaultSettings(), settings);
        if (KDX.isMV()) {
            /*@ts-ignore*/
            super(x, y, _settings.width, _settings.height);
        }
        else {
            super(new Rectangle(x, y, _settings.width, _settings.height));
        }
        this._settings = _settings;
        this._itemsSet = [];
        this._lastSelectedIndexForCallback = -1;
        this._prevSelectedIndex = -1;
        this._createItemsContainer();
        this._createWindowContentMask();
        this.setBackgroundType(this._settings.backgroundType);
    }
    get settings() {
        return this._settings;
    }
    get padding() {
        if (this.settings) {
            return this.settings.itemsPadding;
        }
        else {
            return 12;
        }
    }
    get width() {
        if (this.settings) {
            return this.settings.width;
        }
        else {
            return 240;
        }
    }
    get height() {
        if (this.settings) {
            return this.settings.height;
        }
        else {
            return 420;
        }
    }
    static DefaultSettings() {
        return {
            "width": 240,
            "height": 420,
            "maxCols": 1,
            "isHaveSelectionEffect": false,
            "selectionEffects": ["glow;distance:12;outerStrength:3"],
            "scaleItemsWidth": false,
            "scaleItemsHeight": false,
            "isDrawDefaultItemBack": false,
            "defaultItemHeight": 0,
            "backgroundType": 2,
            "itemsPadding": 12,
            "isHaveInOutAnimation": false,
            "isHorizontal": false,
            "inAnimation": "field:x;duration:0.15;keyframes:0=0,100=4",
            "outAnimation": "field:x;duration:0.15;keyframes:0=4,100=0"
        };
    }
    isHoveredByCursor() {
        return this.getAllItems().some((item) => item.isHoveredByCursor());
    }
    setSelectionHandler(callback) {
        this.setHandler('onSelectionChanged', callback);
    }
    setOkHandler(callback) {
        this.setHandler('ok', callback);
    }
    setCancelHandler(callback) {
        this.setHandler('cancel', callback);
    }
    getAllItems() {
        return this._itemsSet || [];
    }
    maxCols() {
        if (!this.settings)
            return 1;
        if (this.settings.isHorizontal) {
            return this.maxItems();
        }
        return this.settings.maxCols;
    }
    maxItems() {
        return this.getAllItems().length;
    }
    clear() {
        this.setItems([]);
    }
    selectedItem() {
        return this._itemsSet[this.index()];
    }
    itemAt(index) {
        return this._itemsSet[index];
    }
    lineHeight() {
        try {
            if (!this.settings)
                return 36; // * For super class
            if (this.settings.defaultItemHeight && this.settings.defaultItemHeight > 0) {
                return this.settings.defaultItemHeight;
            }
            if (this.maxItems() > 0) {
                return this.itemAt(0).realHeight();
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 36;
    }
    activate(index) {
        try {
            if (index !== undefined) {
                this.refresh();
                this.safeSelect(index);
            }
        }
        catch (error) {
            console.warn(error);
        }
        super.activate();
    }
    select(index) {
        super.select(index);
        if (this._lastSelectedIndexForCallback !== index) {
            try {
                this.callHandler('onSelectionChanged');
            }
            catch (error) {
                console.warn(error);
            }
            this._lastSelectedIndexForCallback = index;
        }
    }
    safeSelect(index) {
        try {
            if (this.maxItems() > index) {
                this.select(index);
            }
            else {
                if (this.maxItems() > 0) {
                    this.select(0);
                }
                else {
                    this.select(-1);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    setItems(items) {
        try {
            this._prevSelectedIndex = -1;
            this._itemsSet = items;
            this._itemsContainer.removeChildren();
            this.setTopRow(0);
            this.refresh();
            items.forEach((item, index) => this._addNewItemToList(item, index));
        }
        catch (error) {
            console.warn(error);
            this.setItems([]);
        }
    }
    isCursorVisible() {
        if (KDX.isMV()) {
            return super.isCursorVisible();
        }
        else {
            /*@ts-ignore*/
            return this.cursorVisible;
        }
    }
    processTouch() {
        if (KDX.isMV()) {
            if (this.isOpenAndActive()) {
                if (!TouchInput.isPressed() && this.isTouchedInsideFrame()) {
                    this.onTouch(false);
                }
            }
            super.processTouch();
        }
        else {
            super.processTouch();
        }
    }
    update() {
        super.update();
        /*@ts-ignore*/
        this._itemsContainer.y = -this._scrollY;
        this._updateItemsSelectionState();
    }
    _createItemsContainer() {
        this._windowItemsContentLayer = new KSprite();
        this._windowItemsContentLayer.move(this.padding, this.padding);
        this.addChild(this._windowItemsContentLayer);
        this._itemsContainer = new KSprite();
        this._windowItemsContentLayer.addChild(this._itemsContainer);
        try {
            if (this['_downArrowSprite']) {
                this.addChild(this['_downArrowSprite']);
            }
            if (this['_upArrowSprite']) {
                this.addChild(this['_upArrowSprite']);
            }
            if (!this.settings.isDrawDefaultItemBack) {
                if (this['_contentsBackSprite']) {
                    this['_contentsBackSprite'].visible = false;
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _createWindowContentMask() {
        try {
            let maskBitmap = new Bitmap(this.width - this.padding * 2, this.height - this.padding * 2);
            maskBitmap.fillAll('#ffffff');
            let maskSprite = new KSprite(maskBitmap);
            /*@ts-ignore*/
            this._windowItemsContentLayer.mask = maskSprite;
            this._windowItemsContentLayer.addChild(maskSprite);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateItemsSelectionState() {
        try {
            if (!this.isOpenAndActive() || this.index() < 0 || !this.isCursorVisible) {
                this._disableSelectionForAll();
                return;
            }
            this._selectItemAtIndex(this.index());
        }
        catch (error) {
            console.warn(error);
        }
    }
    _disableSelectionForAll() {
        try {
            if (this._prevSelectedIndex == -2) {
                return;
            }
            this._prevSelectedIndex = -2;
            this.getAllItems().forEach((item) => this._deselectItem(item));
        }
        catch (error) {
            console.warn(error);
        }
    }
    _selectItemAtIndex(index) {
        try {
            if (this._prevSelectedIndex == index) {
                return;
            }
            let item = this.itemAt(index);
            if (item) {
                this._selectItem(item);
                this._prevSelectedIndex = index;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _selectItem(item) {
        if (!item)
            return;
        try {
            if (this._prevSelectedIndex >= 0) {
                this._deselectItem(this.itemAt(this._prevSelectedIndex));
            }
            item.activateInList();
            this._playItemInAnimation(item);
            this._selectItemVisually(item);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _deselectItem(item) {
        if (!item)
            return;
        try {
            item.deactivateInList();
            this._playItemOutAnimation(item);
            this._deselectItemVisually(item);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _selectItemVisually(item) {
        try {
            if (!this.settings.isHaveSelectionEffect)
                return;
            if (!this.settings.selectionEffects)
                return;
            if (this.settings.selectionEffects.length == 0)
                return;
            KNBuilder.ApplyEffects(item, this.settings.selectionEffects);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _playItemInAnimation(item) {
        try {
            if (!this.settings.isHaveInOutAnimation)
                return;
            if (KString.any(this.settings.inAnimation)) {
                this._playItemAnimation(item, this.settings.inAnimation);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _playItemOutAnimation(item) {
        try {
            if (!this.settings.isHaveInOutAnimation)
                return;
            if (KString.any(this.settings.outAnimation)) {
                this._playItemAnimation(item, this.settings.outAnimation);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _playItemAnimation(item, animation) {
        try {
            let child = item.children[0];
            if (!child)
                return;
            if (!child.setAnimationRule)
                return;
            child.setAnimationRule(animation);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _deselectItemVisually(item) {
        try {
            if (!this.settings.isHaveSelectionEffect)
                return;
            item.filters = [];
        }
        catch (error) {
            console.warn(error);
        }
    }
    _addNewItemToList(item, index) {
        if (!item)
            return;
        try {
            let rect = this.itemRect(index);
            item.move(rect.x, rect.y);
            if (this.settings.scaleItemsHeight) {
                item.scale.y = rect.height / item.realHeight();
            }
            if (this.settings.scaleItemsWidth) {
                item.scale.x = rect.width / item.realWidth();
            }
            this._itemsContainer.addChild(item);
        }
        catch (error) {
            console.warn(error);
        }
    }
    //$[OVER]
    // * We don't need Default Cursor of Window_Selectable
    _updateCursor() {
        if (KDX.isMZ()) {
            /*@ts-ignore*/
            this._cursorSprite.visible = false;
        }
        else {
            /*@ts-ignore*/
            this.setCursorRect(0, 0, 0, 0);
        }
    }
}
// * NUI 1.0
// * rev 10.09.24
// * "type": "plane"
/**
 * Represents a NineSlicePlane sprite used in NUI system.
 */
class KNSprite_Plane extends KNSprite {
    /**
     * Constructs a new instance of the KNSprite_Plane class.
     * @param _settings - The settings for the plane sprite.
     */
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._settings = Object.assign({}, KNSprite_Plane.DefaultSettings(), _settings);
        this._create();
        this._applySettings();
    }
    // * DefaultSettings in JSON format (for easy copy-paste)
    /**
     * Returns the default settings for the plane sprite.
     * @returns {PlaneSpriteSettings} The default settings.
     */
    static DefaultSettings() {
        return {
            "width": 100,
            "height": 100,
            "margins": 20,
            "imageName": "",
            "folderName": "pictures"
        };
    }
    /**
     * Gets the current settings of the plane sprite.
     * @returns {PlaneSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    /**
     * Gets the real width of the sprite.
     * @returns {number} The real width.
     */
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.width;
    }
    /**
     * Gets the real height of the sprite.
     * @returns {number} The real height.
     */
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return this.settings.height;
    }
    /**
     * Applies the current settings to the sprite.
     */
    refresh() {
        try {
            this._applySettings();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Returns an object with data bindings for width, height, and size.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.settings.height); },
            height: (v) => { if (v)
                this.setSize(this.settings.width, v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
        });
    }
    /**
     * Sets the size of the sprite.
     * @param {number | string} [width=100] - The width of the sprite.
     * @param {number | string} [height=100] - The height of the sprite.
     */
    setSize(width = 100, height = 100) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            if (_width != null)
                this._settings.width = _width;
            if (_height != null)
                this._settings.height = _height;
            this.refresh();
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Creates the plane container and adds it as a child.
     * @private
     */
    _create() {
        this._planeContainer = new KSprite();
        this.addChild(this._planeContainer);
    }
    /**
     * Applies the current settings to the plane sprite.
     * @private
     */
    _applySettings() {
        if (!this._settings)
            return;
        try {
            if (this._plane) {
                this._planeContainer.removeChild(this._plane);
                this._plane.destroy();
            }
            let margins = this._getMargins();
            let textureSource = ImageManager.loadBitmap('img/' + this._settings.folderName + "/", this._settings.imageName, 0, false);
            textureSource.addLoadListener(() => {
                let texture = new PIXI.Texture(textureSource.baseTexture);
                if (KDX.isMV()) {
                    /*@ts-ignore*/
                    this._plane = new PIXI.mesh.NineSlicePlane(texture, margins.left, margins.top, margins.right, margins.bottom);
                }
                else {
                    this._plane = new PIXI.NineSlicePlane(texture, margins.left, margins.top, margins.right, margins.bottom);
                }
                this._planeContainer.addChild(this._plane);
                this._applySize();
            });
        }
        catch (error) {
            console.warn(error);
        }
        this._applySize();
    }
    /**
     * Returns the margins for the plane sprite.
     * @returns {PlaneMargins} The margins.
     * @private
     */
    _getMargins() {
        let margins = this._settings.margins;
        if (typeof margins === "number") {
            return {
                left: margins,
                top: margins,
                right: margins,
                bottom: margins
            };
        }
        else {
            return margins;
        }
    }
    /**
     * Applies the size settings to the plane sprite and its container.
     * @private
     */
    _applySize() {
        this.width = this._settings.width;
        this.height = this._settings.height;
        if (!this._plane)
            return;
        this._plane.width = this._settings.width;
        this._plane.height = this._settings.height;
    }
}
//NUI 1.0
//rev 11.09.24
//"type": "screen"
class KNSprite_Screen extends KNSprite_Group {
    constructor() {
        super({
            width: Graphics.width,
            height: Graphics.height
        });
    }
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        return Graphics.width;
    }
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        return Graphics.height;
    }
}
//NUI 1.0
//rev 24.09.24
//"type": "text"
class KNSprite_Text extends KNSprite {
    /**
         * Creates an instance of Sprite_UIText2.
         * @param _settings The parameters for the sprite.
         * @param _userTextStyle The user-defined text style.
         */
    constructor(settings = {}, _userTextStyle = {}) {
        super();
        this._userTextStyle = _userTextStyle;
        this._settings = KNSprite_Text.DefaultSettings();
        this._applySettings(settings);
        this._createTextSprite();
        if (KString.any(settings.text)) {
            this.drawText(settings.text);
        }
    }
    /**
     * Checks if the image sprite is loaded.
     * @returns {boolean} True if loaded, otherwise false.
     */
    isLoaded() {
        try {
            /*if(this.settings.width != 'auto' && this.settings.height != 'auto') {
                return true;
            }*/
            return !!this._textSpr;
        }
        catch (error) {
            console.warn(error);
        }
        return false;
    }
    /**
     * Gets the current settings of the image sprite.
     * @returns {TextSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    static DefaultSettings() {
        return {
            "size": { "width": 60, "height": 20 },
            "alignment": "center",
            "font": {
                "face": null,
                "size": 18,
                "italic": false,
                "bold": false,
                "weight": 0
            },
            "margins": { "x": 0, "y": 0 },
            "outline": { "color": null, "width": 2 },
            "textColor": "#FFFFFF",
            "shadow": {
                "color": "#000",
                "opacity": 0,
                "margins": { "x": 1, "y": 1 }
            },
            "text": "",
            "multiline": false,
            "verticalCentered": true,
            "actualWidth": false,
            "actualHeight": false
        };
    }
    /**
     * Returns an object with data bindings for width, height, size, text, and style settings.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.realHeight()); },
            height: (v) => { if (v)
                this.setSize(this.realWidth(), v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            text: (v) => { this.drawText(v); },
            style: (v) => { if (v)
                this.setStyle(v, {}); },
            textColor: (v) => { if (v)
                this.setTextColor(v); },
            fontSize: (v) => { if (v)
                this.setFontSize(v); }
        });
    }
    setSize(width, height) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            this.setStyle({ size: { width: _width, height: _height } }, {});
        }
        catch (error) {
            console.warn(error);
        }
    }
    setStyle(newStyleInOldFormat, newStyleInPixiFormat) {
        try {
            this._textStyle = this._convertToPixiStyle(newStyleInOldFormat, newStyleInPixiFormat);
            this._textSpr.style = this._textStyle;
            this.drawText(this._textSpr.text);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setFontSize(size) {
        try {
            let font = Object.assign({}, this._settings.font);
            if (typeof size == "string") {
                size = this.convertStringSizeValue(size, 'height', this);
            }
            font.size = size;
            this.setStyle({ font }, {});
            this.drawText(this._settings.text);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setTextColor(color) {
        try {
            this.setStyle({ textColor: color }, {});
        }
        catch (error) {
            console.warn(error);
        }
    }
    getMetrics() {
        return PIXI.TextMetrics.measureText(this._textSpr.text, this._textSpr.style);
    }
    drawText(text) {
        try {
            if (!KString.any(text)) {
                text = "";
            }
            this._settings.text = text;
            this._drawText(text);
        }
        catch (error) {
            console.warn(error);
        }
    }
    realWidth() {
        if (this.isNotHaveBounds())
            return 0;
        if (this._textSpr && this._settings.actualWidth == true) {
            return this.getMetrics().width;
        }
        if (this._settings.size.width > 0) {
            return this._settings.size.width;
        }
        return super.realWidth();
    }
    realHeight() {
        if (this.isNotHaveBounds())
            return 0;
        if (this._textSpr && this._settings.actualHeight == true) {
            return this.getMetrics().height;
        }
        if (this._settings.size.height > 0) {
            return this._settings.size.height;
        }
        return super.realHeight();
    }
    /**
         * Applies the parameters to the sprite.
         * @param settings The parameters to apply.
         */
    _applySettings(settings) {
        try {
            this._textStyle = this._convertToPixiStyle(settings, {});
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
         * Converts the old style parameters to the new (PIXI) style.
         * @param settings The old style parameters.
         * @param style The new style parameters.
         * @returns The converted text style.
         */
    _convertToPixiStyle(settings = {}, style) {
        try {
            this._settings = Object.assign(this._settings, settings);
            let _textStyle = (Object.assign({}, this._userTextStyle, style));
            if (KString.any(this._settings.font.face)) {
                _textStyle.fontFamily = this._settings.font.face;
            }
            _textStyle.fontSize = this._settings.font.size;
            if (this._settings.font.italic === true) {
                _textStyle.fontStyle = 'italic';
            }
            if (this._settings.font.bold === true) {
                _textStyle.fontWeight = 'bold';
            }
            if (this._settings.font.weight && this._settings.font.weight > 0) {
                _textStyle.fontWeight = this._settings.font.weight.toString();
            }
            if (KString.any(this._settings.outline.color) && this._settings.outline.width > 0) {
                _textStyle.stroke = this._settings.outline.color;
                _textStyle.strokeThickness = this._settings.outline.width;
            }
            _textStyle.fill = this._settings.textColor;
            if (this._settings.shadow && this._settings.shadow.opacity > 0) {
                const { color, opacity, margins } = this._settings.shadow;
                _textStyle.dropShadow = true;
                _textStyle.dropShadowAngle = margins.y;
                _textStyle.dropShadowColor = color;
                _textStyle.dropShadowDistance = margins.x;
                _textStyle.dropShadowAlpha = opacity / 255.0;
            }
            if (this._settings.multiline === true) {
                _textStyle.align = this._settings.alignment || 'left';
                _textStyle.wordWrap = true;
                if (this._settings.font.size) {
                    _textStyle.lineHeight = this._settings.font.size + 2;
                }
                if (this.realWidth() > 0) {
                    _textStyle.wordWrapWidth = this.realWidth();
                }
            }
            return _textStyle;
        }
        catch (e) {
            console.warn(e);
            return new PIXI.TextStyle();
        }
    }
    /**
     * Creates the text sprite.
     */
    _createTextSprite() {
        try {
            const style = new PIXI.TextStyle(this._textStyle);
            this._textSpr = new PIXI.Text('', style);
            this.addChild(this._textSpr);
            this.executeRequiredFuncs();
            this.executeLoadListeners();
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Draws the text.
     * @param text The text to draw.
     */
    _drawText(text) {
        try {
            if (!this.isLoaded()) {
                this.requireFunc("_drawText", text);
                return;
            }
            if (typeof text !== "string") {
                text = String(text);
            }
            try {
                text = TextProParser.ConvertControlCharacters(text);
            }
            catch (error) {
                console.warn(error);
            }
            this._textSpr.text = text;
            const { width: w, height: h } = this._settings.size;
            // * Fix for a bug with 0 font size
            if (this._textSpr.style.fontSize == 0) {
                this._textSpr.style.fontSize = 18;
            }
            let textMetrics;
            try {
                textMetrics = PIXI.TextMetrics.measureText(text, this._textSpr.style);
            }
            catch (error) {
                console.warn(error);
                return;
            }
            const { height, maxLineWidth } = textMetrics;
            if (this._settings.verticalCentered === true) {
                this._textSpr.y = (h - height) / 2;
            }
            else {
                this._textSpr.y = 0;
            }
            if (this._settings.alignment === 'center') {
                this._textSpr.x = (w - maxLineWidth) / 2;
            }
            else if (this._settings.alignment === 'right') {
                this._textSpr.x = (w - maxLineWidth);
            }
            else {
                this._textSpr.x = 0;
            }
            this._textSpr.x += this._settings.margins.x;
            this._textSpr.y += this._settings.margins.y;
        }
        catch (e) {
            console.warn(e);
        }
    }
}
//NUI 1.3
//rev 07.10.24
//"type": "textPro"
class KNSprite_TextPro extends KNSprite {
    /**
         * Creates an instance of Sprite_UIText2.
         * @param _settings The parameters for the sprite.
         * @param _userTextStyle The user-defined text style.
         */
    constructor(settings = {}, _userTextStyle = {}) {
        super();
        this._userTextStyle = _userTextStyle;
        this._settings = Object.assign(KNSprite_TextPro.DefaultSettings(), settings);
        this._textsContainer = new KNSprite_Group();
        this._textLines = [];
        this.addChild(this._textsContainer);
        if (KString.any(settings.text)) {
            this.drawText(settings.text);
        }
    }
    /**
     * Gets the current settings of the image sprite.
     * @returns {TextProSpriteSettings} The current settings.
     */
    get settings() {
        return this._settings;
    }
    static DefaultSettings() {
        return {
            "size": { "width": 60, "height": 20 },
            "alignment": "center",
            "font": {
                "face": null,
                "size": 18,
                "italic": false,
                "bold": false,
                "weight": 0
            },
            "margins": { "x": 0, "y": 0 },
            "outline": { "color": null, "width": 2 },
            "textColor": "#FFFFFF",
            "shadow": {
                "color": "#000",
                "opacity": 0,
                "margins": { "x": 1, "y": 1 }
            },
            "text": "",
            "multiline": false,
            "verticalCentered": true,
            "verticalAlignment": "top",
            "verticalSpacing": 4,
            "actualSize": false,
            "trimWidth": false,
            "trimHeight": false,
            "iconPadding": {
                "left": 2,
                "right": 2,
                "top": 0,
                "bottom": 0
            },
            "iconSize": 1, // % of font size, 1 = 100%
            "isStaticIconSize": false // * If true, icon size will be iconSize in PX, otherwise it will be iconSize in % of font size
        };
    }
    realWidth() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this.settings.actualSize == true) {
                return this._textsContainer.realWidth();
            }
            return this.settings.size.width;
        }
        catch (error) {
            console.warn(error);
            return 0;
        }
    }
    realHeight() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this.settings.actualSize == true) {
                return this._textsContainer.realHeight();
            }
            return this.settings.size.height;
        }
        catch (error) {
            console.warn(error);
            return 0;
        }
    }
    /**
     * Returns an object with data bindings for width, height, size, text, and style settings.
     * @returns {Record<string, any>} The data bindings.
     */
    dataBindings() {
        return Object.assign(super.dataBindings(), {
            width: (v) => { if (v)
                this.setSize(v, this.realHeight()); },
            height: (v) => { if (v)
                this.setSize(this.realWidth(), v); },
            size: (v) => { if (v)
                this.setSize(v.width, v.height); },
            text: (v) => { this.drawText(v); },
            style: (v) => { if (v)
                this.setStyle(v, {}); },
            textColor: (v) => { if (v)
                this.setTextColor(v); },
            fontSize: (v) => { if (v)
                this.setFontSize(v); },
            iconSize: (v) => { if (v)
                this.setIconSize(v); },
            verticalSpacing: (v) => { if (v)
                this.setVerticalSpacing(v); }
        });
    }
    setSize(width, height) {
        try {
            let _width = this.convertStringSizeValue(width, 'width', this);
            let _height = this.convertStringSizeValue(height, 'height', this);
            this.setStyle({ size: { width: _width, height: _height } }, {});
        }
        catch (error) {
            console.warn(error);
        }
    }
    setTextColor(color) {
        try {
            this.setStyle({ textColor: color }, {});
        }
        catch (error) {
            console.warn(error);
        }
    }
    setIconSize(size) {
        if (typeof size == "string") {
            size = this.convertStringSizeValue(size, 'height', this);
        }
        this.setStyle({ iconSize: size }, {});
    }
    setVerticalSpacing(spacing) {
        if (typeof spacing == "string") {
            spacing = this.convertStringSizeValue(spacing, 'height', this);
        }
        this.setStyle({ verticalSpacing: spacing }, {});
    }
    setFontSize(size) {
        try {
            let font = Object.assign({}, this._settings.font);
            if (typeof size == "string") {
                size = this.convertStringSizeValue(size, 'height', this);
            }
            font.size = size;
            this.setStyle({ font }, {});
        }
        catch (error) {
            console.warn(error);
        }
    }
    setStyle(style, userStyle) {
        try {
            this._settings = Object.assign(this._settings, style);
            this._userTextStyle = Object.assign(this._userTextStyle, userStyle);
            this.drawText(this.settings.text);
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Draws the specified text on the sprite.
     *
     * @param text - The text to be drawn. If the text is not provided or is invalid, an empty string will be used.
     * @throws Will log a warning to the console if an error occurs during the drawing process.
     */
    drawText(text) {
        try {
            if (!KString.any(text)) {
                text = "";
            }
            this._settings.text = text;
            this._createTextSprites();
            this._applyAlignment();
            this._applyMargins();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _createTextSprites() {
        try {
            this._clearTextSprites();
            let textConfigs = TextProParser.ParseText(this.settings);
            let elements = TextProElementsBuilder.Build(textConfigs, this.settings, this._userTextStyle);
            if (this.settings.multiline == true || this.settings.trimWidth == true) {
                let lines = this._separateTextToLines(elements);
                for (let line of lines) {
                    this._textLines.push(line);
                    this._textsContainer.addChild(line);
                    this._refreshTextElementsVerticalPosition(line);
                    this._applyLineAligmnent(line);
                }
            }
            else {
                this._textLines.push(elements);
                this._textsContainer.addChild(elements);
                this._refreshTextElementsVerticalPosition(elements);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _clearTextSprites() {
        try {
            this._textsContainer.move(0, 0);
            this._textsContainer.removeChildren();
            this._textLines = [];
        }
        catch (error) {
            console.warn(error);
        }
    }
    _separateTextToLines(allTextElements) {
        const lines = [];
        try {
            const maxLineWidth = this.settings.size.width;
            const maxHeight = this.settings.size.height;
            let currentWidth = 0;
            const currentHeight = () => {
                return lines.reduce((sum, line) => sum + line.realHeight(), 0);
            };
            const elements = [];
            for (const child of allTextElements.children) {
                elements.push(child);
            }
            let line = new KNSprite_Group({});
            lines.push(line);
            for (const el of elements) {
                currentWidth += el.realWidth();
                if (currentWidth > maxLineWidth) {
                    currentWidth = 0;
                    if (this.settings.multiline === false)
                        break;
                    const newHeight = currentHeight() + el.realHeight();
                    if (newHeight > maxHeight) {
                        if (this.settings.trimHeight === true)
                            break;
                    }
                    line = new KNSprite_Group({});
                    line.addChild(el);
                    el.setPosition(0, this._textElementVerticalPosition());
                    lines.push(line);
                    line.y += line.realHeight() + this.settings.verticalSpacing;
                }
                else {
                    line.addChild(el);
                    el.setPosition("prevEndX", this._textElementVerticalPosition());
                }
            }
        }
        catch (e) {
            console.warn(e);
        }
        return lines;
    }
    _refreshTextElementsVerticalPosition(elements) {
        try {
            for (let child of elements.children) {
                child.setPosition(child.x, this._textElementVerticalPosition());
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    /**
     * Gets the vertical position for the text element.
     * @returns The vertical position for the text element.
     * @private
     */
    _textElementVerticalPosition() {
        try {
            if (this.settings.verticalCentered) {
                return "center";
            }
        }
        catch (e) {
            console.warn(e);
        }
        return 0;
    }
    _applyLineAligmnent(line) {
        try {
            line.setPosition(this.settings.alignment, line.y);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _applyAlignment() {
        try {
            this._textsContainer.setPosition(this.settings.alignment, this.settings.verticalAlignment);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _applyMargins() {
        try {
            this._textsContainer.x += this.settings.margins.x;
            this._textsContainer.y += this.settings.margins.y;
        }
        catch (error) {
            console.warn(error);
        }
    }
}
class TextProElementsBuilder {
    /**
     * Creates an instance of TextProElementsBuilder.
     * @param configs The configuration for the text elements.
     * @param settings The settings for the TextPro sprite.
     * @param userTextStyle The user-defined text style.
     */
    constructor(configs, settings, userTextStyle) {
        this.configs = configs;
        this.settings = settings;
        this.userTextStyle = userTextStyle;
        this._elements = new KNSprite_Group();
        this._buildElements();
    }
    /**
     * Gets the elements created by the builder.
     * @returns The elements created by the builder.
     */
    getElements() {
        return this._elements;
    }
    /**
     * Builds the elements based on the provided configurations.
     * @param configs The configuration for the text elements.
     * @param settings The settings for the TextPro sprite.
     * @param userTextStyle The user-defined text style.
     * @returns The elements created by the builder.
     */
    static Build(configs, settings, userTextStyle) {
        const builder = new TextProElementsBuilder(configs, settings, userTextStyle);
        return builder.getElements();
    }
    /**
     * Builds the elements based on the configurations.
     * @private
     */
    _buildElements() {
        try {
            for (const config of this.configs) {
                if (config.iconIndex !== undefined && config.iconIndex >= 0) {
                    this._createIconElement(config, this._elements);
                }
                else {
                    this._createTextElement(config, this._elements);
                }
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates an icon element based on the configuration.
     * @param config The configuration for the icon element.
     * @param line The line to add the icon element to.
     * @private
     */
    _createIconElement(config, line) {
        try {
            let iconSize;
            if (this.settings.isStaticIconSize) {
                iconSize = this.settings.iconSize;
            }
            else {
                if (config.fontSize && config.fontSize > 0) {
                    iconSize = config.fontSize * this.settings.iconSize;
                }
                else {
                    iconSize = this.settings.font.size * this.settings.iconSize;
                }
            }
            const icon = new KNSprite_Image({
                imageName: config.iconIndex,
                width: iconSize,
                height: iconSize
            });
            const paddingGroup = new KNSprite_Group({
                width: iconSize + this.settings.iconPadding.left + this.settings.iconPadding.right,
                height: iconSize + this.settings.iconPadding.top + this.settings.iconPadding.bottom
            });
            paddingGroup.addChild(icon);
            icon.setPosition("center", "center");
            line.addChild(paddingGroup);
            paddingGroup.setPosition("prevEndX", this._textElementVerticalPosition());
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates a text element based on the configuration.
     * @param config The configuration for the text element.
     * @param line The line to add the text element to.
     * @private
     */
    _createTextElement(config, line) {
        try {
            const textSettings = Object.assign({}, this.settings);
            textSettings.text = config.text;
            if (config.fontSize && config.fontSize > 0) {
                textSettings.font.size = config.fontSize;
            }
            if (config.color && KString.any(config.color)) {
                textSettings.textColor = config.color;
            }
            textSettings.alignment = "left";
            textSettings.multiline = false;
            textSettings.verticalCentered = false;
            textSettings.actualSize = true;
            textSettings.margins = { x: 0, y: 0 };
            const text = new KNSprite_Text(textSettings, this.userTextStyle);
            line.addChild(text);
            text.setPosition("prevEndX", this._textElementVerticalPosition());
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Gets the vertical position for the text element.
     * @returns The vertical position for the text element.
     * @private
     */
    _textElementVerticalPosition() {
        try {
            if (this.settings.verticalCentered) {
                return "center";
            }
        }
        catch (e) {
            console.warn(e);
        }
        return 0;
    }
}
class TextProParser {
    /**
     * Converts control characters in the input text.
     * @param inputText The input text to convert.
     * @returns The converted text.
     */
    static ConvertControlCharacters(inputText) {
        try {
            if (KString.any(inputText)) {
                return Window_Base.prototype.convertEscapeCharacters.call({
                    actorName: function () {
                        return Window_Base.prototype.actorName.call(null, ...arguments);
                    },
                    partyMemberName: function () {
                        return Window_Base.prototype.partyMemberName.call(null, ...arguments);
                    }
                }, inputText);
            }
            else {
                return "";
            }
        }
        catch (e) {
            console.warn(e);
            return "";
        }
    }
    /**
     * Creates an instance of TextProParser.
     * @param settings The settings for the TextPro sprite.
     */
    constructor(settings) {
        this._textsConfigs = [];
        this.settings = settings;
        if (KDX.isMV()) {
            if (!window["__kdSharedTextProTextColorSourceWindow"]) {
                /*@ts-ignore*/
                window["__kdSharedTextProTextColorSourceWindow"] = new Window_Base(0, 0, 0, 0);
            }
        }
        this._parseAllText();
    }
    /**
     * Parses the text based on the provided settings.
     * @param settings The settings for the TextPro sprite.
     * @returns The parsed text configurations.
     */
    static ParseText(settings) {
        const parser = new TextProParser(settings);
        return parser.getConfigs();
    }
    /**
     * Checks if the character is a control separator.
     * @param char The character to check.
     * @returns True if the character is a control separator, otherwise false.
     */
    static isControlSeparator(char) {
        return '\x1b' === char;
    }
    /**
     * Gets the parsed text configurations.
     * @returns The parsed text configurations.
     */
    getConfigs() {
        return this._textsConfigs;
    }
    /**
     * Parses all the text based on the settings.
     * @private
     */
    _parseAllText() {
        try {
            const preparedText = TextProParser.ConvertControlCharacters(this.settings.text);
            const textState = this._makeInitialTextState(preparedText);
            this._processAllText(textState);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Creates the initial text state.
     * @param text The text to create the state for.
     * @returns The initial text state.
     * @private
     */
    _makeInitialTextState(text) {
        return {
            text: text,
            buffer: "",
            index: 0,
            color: "", // * "" default
            fontSize: -1, // * -1 default
            iconIndex: -1, // * -1 none
        };
    }
    /**
     * Processes all the text based on the text state.
     * @param textState The text state to process.
     * @private
     */
    _processAllText(textState) {
        try {
            while (textState.index < textState.text.length) {
                this._processCharacter(textState);
            }
            this._saveTextConfig(textState);
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Processes a single character in the text state.
     * @param textState The text state to process.
     * @private
     */
    _processCharacter(textState) {
        try {
            const c = textState.text[textState.index++];
            if (c.charCodeAt(0) < 0x20) {
                this._saveTextConfig(textState);
                this._processControlCharacter(textState, c);
            }
            else {
                textState.buffer += c;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Saves the current text configuration.
     * @param textState The text state to save.
     * @private
     */
    _saveTextConfig(textState) {
        try {
            if (textState.buffer.length > 0 || textState.iconIndex > 0) {
                this._textsConfigs.push({
                    text: textState.buffer,
                    color: textState.color,
                    fontSize: textState.fontSize,
                    iconIndex: textState.iconIndex
                });
                textState.buffer = "";
                textState.iconIndex = -1;
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Processes a control character in the text state.
     * @param textState The text state to process.
     * @param c The control character to process.
     * @private
     */
    _processControlCharacter(textState, c) {
        try {
            if (TextProParser.isControlSeparator(c)) {
                const code = this._obtainEscapeCode(textState);
                this._processEscapeCharacter(code, textState);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Obtains the escape code from the text state.
     * @param textState The text state to obtain the escape code from.
     * @returns The escape code.
     * @private
     */
    _obtainEscapeCode(textState) {
        try {
            const regExp = /^[$.|^!><{}\\]|^[A-Z]+/i;
            const arr = regExp.exec(textState.text.slice(textState.index));
            if (arr) {
                textState.index += arr[0].length;
                return arr[0].toUpperCase();
            }
            else {
                return "";
            }
        }
        catch (e) {
            console.warn(e);
            return "";
        }
    }
    /**
     * Processes an escape character in the text state.
     * @param code The escape code to process.
     * @param textState The text state to process.
     * @private
     */
    _processEscapeCharacter(code, textState) {
        try {
            let currentFontSize = textState.fontSize;
            switch (code) {
                case "C":
                    const colorIndex = this._obtainEscapeParam(textState);
                    if (colorIndex > 0) {
                        if (KDX.isMV()) {
                            textState.color = window["__kdSharedTextProTextColorSourceWindow"].textColor(colorIndex);
                        }
                        else {
                            textState.color = ColorManager.textColor(colorIndex);
                        }
                    }
                    else {
                        textState.color = "";
                    }
                    break;
                case "I":
                    const iconIndex = this._obtainEscapeParam(textState);
                    if (iconIndex > 0) {
                        textState.iconIndex = iconIndex;
                        // * Icon is a separate sprite, so save the current text as separate
                        this._saveTextConfig(textState);
                    }
                    else {
                        textState.iconIndex = -1;
                    }
                    break;
                case "FS":
                    const fontSize = this._obtainEscapeParam(textState);
                    textState.fontSize = fontSize;
                    break;
                case "{": // * Make font bigger by 1
                    currentFontSize = textState.fontSize;
                    if (currentFontSize === -1) {
                        currentFontSize = this.settings.font.size;
                    }
                    textState.fontSize = currentFontSize + 1;
                    break;
                case "}":
                    currentFontSize = textState.fontSize;
                    if (currentFontSize === -1) {
                        currentFontSize = this.settings.font.size;
                    }
                    textState.fontSize = currentFontSize - 1;
                    break;
                default:
                    console.warn("KNSprite_TextPro: Unknown escape code: " + code);
            }
        }
        catch (e) {
            console.warn(e);
        }
    }
    /**
     * Obtains the escape parameter from the text state.
     * @param textState The text state to obtain the escape parameter from.
     * @returns The escape parameter.
     * @private
     */
    _obtainEscapeParam(textState) {
        try {
            const regExp = /^\[\d+\]/;
            const arr = regExp.exec(textState.text.slice(textState.index));
            if (arr) {
                textState.index += arr[0].length;
                return parseInt(arr[0].slice(1));
            }
            else {
                return 0;
            }
        }
        catch (e) {
            console.warn(e);
            return 0;
        }
    }
}


var KDX;
(function (KDX) {
    /**
     * The version of the KDX Library.
     * @type {string}
     */
    KDX.Version = "0.1";
    /**
     * Checks if the RPG Maker version is MV.
     * @returns {boolean} True if the RPG Maker version is MV, otherwise false.
     */
    /* @ts-ignore */
    KDX.isMV = () => Utils.RPGMAKER_NAME.includes("MV");
    /**
     * Checks if the RPG Maker version is MZ.
     * @returns {boolean} True if the RPG Maker version is MZ, otherwise false.
     */
    KDX.isMZ = () => !KDX.isMV();
    /**
     * Checks if a value is not null and not undefined
     *
     * @param {any} value - The value to check.
     * @returns {boolean} True if the value is not null and not undefined
     */
    KDX.any = (value) => (value === null || value === undefined) ? false : true;
})(KDX || (KDX = {}));
var KArray;
(function (KArray) {
    /**
     * Deletes all occurrences of a specified item from an array.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array from which to delete items.
     * @param {T} item - The item to delete from the array.
     * @returns {T[]} A new array with all occurrences of the specified item removed.
     */
    function deleteAll(array, item) {
        return array.filter((i) => i !== item);
    }
    KArray.deleteAll = deleteAll;
    /**
     * Returns a random item from an array.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array from which to select a random item.
     * @returns {T} A random item from the array.
     */
    function randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    KArray.randomItem = randomItem;
    /**
     * Shuffles the elements of an array in place.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to shuffle.
     * @returns {T[]} The shuffled array.
     */
    function shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    KArray.shuffle = shuffle;
    /**
     * Finds an item in an array by a specified key and value.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to search.
     * @param {string} key - The key to match.
     * @param {any} value - The value to match.
     * @returns {T | null} The found item, or null if no item matches.
     */
    function getByKey(array, key, value) {
        try {
            return array.find((i) => i[key] === value);
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KArray.getByKey = getByKey;
    /**
     * Finds an item in an array by its 'id' property.
     *
     * @template T - The type of elements in the array.
     * @param {T[]} array - The array to search.
     * @param {any} value - The value of the 'id' property to match.
     * @returns {T | null} The found item, or null if no item matches.
     */
    function getById(array, value) {
        return getByKey(array, "id", value);
    }
    KArray.getById = getById;
})(KArray || (KArray = {}));
var KNumber;
(function (KNumber) {
    /**
    * Clamps a number within a specified range.
    *
    * @param {number} value - The value to clamp.
    * @param {number} min - The minimum value.
    * @param {number} max - The maximum value.
    * @returns {number} The clamped value.
    */
    KNumber.clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * Generates a random number between the specified minimum and maximum values (inclusive).
     *
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {number} A random number between the minimum and maximum values.
     */
    KNumber.random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Checks if the given number is greater than zero.
     *
     * @param {number} number - The number to be checked.
     * @returns {boolean} `true` if the number is greater than zero, `false` otherwise.
     */
    KNumber.any = (number) => {
        if (number === null || number === undefined) {
            return false;
        }
        return number > 0;
    };
})(KNumber || (KNumber = {}));
var KString;
(function (KString) {
    /**
         * Generates a random string of the specified length.
         * @param {number} length - The length of the generated string.
         * @returns {string} The generated string.
         */
    KString.randomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    /**
     * Replaces all occurrences of a substring in a string with a specified replacement.
     *
     * @param {string} source - The source string.
     * @param {string} search - The substring to search for.
     * @param {string} replacement - The replacement string.
     * @returns {string} The modified string with all occurrences of the substring replaced.
     */
    KString.replaceAll = (source, search, replacement) => {
        return source.split(search).join(replacement);
    };
    /**
     * Checks if a string is not null, not undefined, and has a length greater than 0 (after trimming).
     *
     * @param {string} str - The string to check.
     * @returns {boolean} True if the string is not null, not undefined, and has a length greater than 0 (after trimming), otherwise false.
     */
    KString.any = (str) => {
        if (str === null || str === undefined) {
            return false;
        }
        // * For compatibility with old verions of KDCore library
        if (typeof str === "boolean") {
            return str == true;
        }
        try {
            if (typeof str == "string") {
                return str.length > 0 || str.trim().length > 0;
            }
            else {
                return true;
            }
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    };
    /**
     * Checks if the provided value is of type string.
     *
     * @param value - The value to check.
     * @returns `true` if the value is a string, otherwise `false`.
     */
    KString.isString = (value) => {
        return typeof value === "string";
    };
})(KString || (KString = {}));
(function () {
    // * RPG Maker MV only
    if (!Utils.RPGMAKER_NAME.includes("MV"))
        return;
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ TouchInput.ts
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    (() => {
        //@[DEFINES]
        const _ = TouchInput;
        //@[ALIAS]
        /*@ts-ignore*/
        const ALIAS___onMouseMove = _._onMouseMove;
        _['_onMouseMove'] = function (event) {
            ALIAS___onMouseMove.call(this, event);
            let x = Graphics.pageToCanvasX(event.pageX);
            let y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this['_x'] = x;
                this['_y'] = y;
            }
        };
    })();
    // ■ END TouchInput.ts
    //---------------------------------------------------------------------------
})();
var KAudio;
(function (KAudio) {
    /**
     * Plays a sound effect (SE) with the specified parameters.
     *
     * @param name - The name of the sound effect file to play.
     * @param pitch - The pitch of the sound effect. Defaults to 100.
     * @param volume - The volume of the sound effect. Defaults to 100.
     *
     * @remarks
     * If the provided name is empty or invalid, the function will not attempt to play the sound effect.
     */
    function PlaySE(name, pitch = 100, volume = 100) {
        if (!KString.any(name))
            return;
        let audioData = {
            name: name,
            pitch: pitch,
            volume: volume,
            pan: 0,
            pos: 0
        };
        AudioManager.playStaticSe(audioData);
    }
    KAudio.PlaySE = PlaySE;
})(KAudio || (KAudio = {}));
var KGameEvents;
(function (KGameEvents) {
    // * Return whole line that contains the commentCode
    /**
     * Retrieves a specific comment line from a game event based on the provided comment code.
     *
     * @param commentCode - The code to search for within the comment lines.
     * @param event - The game event from which to retrieve the comment line.
     * @returns The comment line containing the specified code, or `null` if not found.
     *
     * @remarks
     * This function searches through the event's page list to find a comment line that includes the specified comment code.
     * It looks for comment codes 108 and 408, which are typically used for comments in RPG Maker events.
     * If the event or its page list is not available, or if no matching comment line is found, the function returns `null`.
     *
     * @throws Will log a warning to the console if an error occurs during the search process.
     */
    function GetCommentLine(commentCode, event) {
        try {
            if (!event)
                return null;
            let page = event.page();
            if (!page)
                return null;
            let list = page.list;
            if (!list)
                return null;
            for (let i = 0; i < list.length; i++) {
                if (!list[i])
                    continue;
                if (list[i].code === 108 || list[i].code === 408) {
                    let line = list[i].parameters[0];
                    if (line && line.includes(commentCode)) {
                        return line;
                    }
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KGameEvents.GetCommentLine = GetCommentLine;
    // * For commentCode:value
    /**
     * Retrieves the value associated with a specific comment code from a game event.
     * Pattern commentCode:value
     *
     * @param commentCode - The code of the comment to search for.
     * @param event - The game event object to search within.
     * @returns The value associated with the comment code, or null if not found.
     */
    function GetCommentCodeValue(commentCode, event) {
        try {
            let line = GetCommentLine(commentCode, event);
            if (!line)
                return null;
            let value = line.split(":")[1].trim();
            return value;
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    KGameEvents.GetCommentCodeValue = GetCommentCodeValue;
})(KGameEvents || (KGameEvents = {}));
var KGameItems;
(function (KGameItems) {
    /**
     * Checks if the given object has a meta property with the specified symbol.
     *
     * @param symbol - The symbol to check for in the meta property.
     * @param obj - The object to check for the meta property.
     * @returns `true` if the object has a meta property with the specified symbol, otherwise `false`.
     * @throws Will log a warning to the console if an error occurs during the check.
     */
    function IsHaveMeta(symbol, obj) {
        try {
            return obj && obj.meta && obj.meta.hasOwnProperty(symbol);
        }
        catch (error) {
            console.warn(error);
        }
        return false;
    }
    KGameItems.IsHaveMeta = IsHaveMeta;
    /**
     * Retrieves the metadata associated with a given symbol from an object.
     *
     * @param symbol - The key for the metadata to retrieve.
     * @param obj - The object containing the metadata.
     * @param defaultValue - The value to return if the symbol is not present or an error occurs.
     * @returns The metadata value. If the symbol is not present or an error occurs, returns the default value.
     */
    function GetMeta(symbol, obj, defaultValue = null) {
        try {
            if (!IsHaveMeta(symbol, obj))
                return defaultValue;
            return obj.meta[symbol];
        }
        catch (error) {
            console.warn(error);
        }
        return defaultValue;
    }
    KGameItems.GetMeta = GetMeta;
    /**
     * Retrieves the metadata associated with the given symbol from the specified object
     * and converts it to a number.
     *
     * @param symbol - The key for the metadata to retrieve.
     * @param obj - The object from which to retrieve the metadata.
     * @param defaultValue - The value to return if the symbol is not present or an error occurs.
     * @returns The metadata value as a number. If the symbol is not present or an error occurs, returns the default value.
     */
    function GetMetaAsNumber(symbol, obj, defaultValue = 0) {
        try {
            return Number(GetMeta(symbol, obj, defaultValue));
        }
        catch (error) {
            console.warn(error);
        }
        return defaultValue;
    }
    KGameItems.GetMetaAsNumber = GetMetaAsNumber;
})(KGameItems || (KGameItems = {}));
var KInput;
(function (KInput) {
    /**
     * Simulates a virtual click on the specified button.
     *
     * @param buttonName - The name of the button to simulate a click on.
     *
     * This function checks if the environment is MV (RPG Maker MV) and if the `Input.virtualClick` method is not already extended.
     * If both conditions are met, it extends the MV Input system to support virtual clicks.
     *
     * @remarks
     * The function uses a TypeScript ignore comment to bypass type checking for the `Input.virtualClick` method.
     */
    function VirtualClick(buttonName) {
        try {
            if (KDX.isMV() && !KDX.any(Input['virtualClick'])) {
                _extendMvInput();
            }
            /* @ts-ignore */
            Input.virtualClick(buttonName);
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput.VirtualClick = VirtualClick;
    function IsCancel() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
    }
    KInput.IsCancel = IsCancel;
    function _extendMvInput() {
        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ Input.ts
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        (() => {
            //@[DEFINES]
            const _ = Input;
            _['virtualClick'] = function (buttonName) {
                this._virtualButton = buttonName;
            };
            //@[ALIAS]
            const ALIAS__clear = _.clear;
            _.clear = function () {
                ALIAS__clear.call(this);
                this._virtualButton = null;
            };
            //@[ALIAS]
            const ALIAS__update = _.update;
            _.update = function () {
                ALIAS__update.call(this);
                try {
                    if (KString.any(this._virtualButton)) {
                        this._latestButton = this._virtualButton;
                        this._pressedTime = 0;
                        this._virtualButton = null;
                    }
                }
                catch (error) {
                    console.warn(error);
                }
            };
        })();
        // ■ END Input.ts
        //---------------------------------------------------------------------------
    }
    function _extend() {
        // * If Input is extended by KDCore or KDX
        if (KDX.any(Input['KeyMapperPKD']))
            return;
        try {
            let KeyMapperPKD = {};
            //Numbers
            for (let i = 48; i <= 57; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i);
            }
            //Letters Upper
            for (let i = 65; i <= 90; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
            }
            //Letters Lower
            for (let i = 97; i <= 122; i++) {
                KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
            }
            Input['KeyMapperPKD'] = KeyMapperPKD;
        }
        catch (error) {
            console.warn(error);
        }
    }
    function _onKeyDown(event) {
        try {
            _extend();
            /* @ts-ignore */
            let symbol = Input.KeyMapperPKD[event.keyCode];
            if (symbol) {
                /* @ts-ignore */
                Input._currentState[symbol] = true;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput._onKeyDown = _onKeyDown;
    function _onKeyUp(event) {
        try {
            _extend();
            /* @ts-ignore */
            let symbol = Input.KeyMapperPKD[event.keyCode];
            if (symbol) {
                /* @ts-ignore */
                Input._currentState[symbol] = false;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    KInput._onKeyUp = _onKeyUp;
})(KInput || (KInput = {}));
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Input;
    //@[ALIAS]
    /* @ts-ignore */
    const ALIAS___onKeyDown = _._onKeyDown;
    /* @ts-ignore */
    _._onKeyDown = function (event) {
        let t = this;
        ALIAS___onKeyDown.call(this, event);
        try {
            if (Input.keyMapper[event.keyCode]) {
                return;
            }
            KInput._onKeyDown(event);
        }
        catch (error) {
            console.warn(error);
        }
    };
    //@[ALIAS]
    /* @ts-ignore */
    const ALIAS___onKeyUp = _._onKeyUp;
    /* @ts-ignore */
    _._onKeyUp = function (event) {
        let t = this;
        ALIAS___onKeyUp.call(this, event);
        try {
            if (Input.keyMapper[event.keyCode]) {
                return;
            }
            KInput._onKeyUp(event);
        }
        catch (error) {
            console.warn(error);
        }
    };
})();
// ■ END Input.ts
//---------------------------------------------------------------------------
var KPoint;
(function (KPoint) {
    /**
     * Clones a given Point object.
     *
     * @param {IPoint} p - The Point object to be cloned.
     * @returns {IPoint} A new Point object with the same x and y coordinates as the input.
     */
    function Clone(p) {
        return new PIXI.Point(p.x, p.y);
    }
    KPoint.Clone = Clone;
    /**
     * Checks if two Point objects have the same coordinates.
     *
     * @param {IPoint} p1 - The first Point object.
     * @param {IPoint} p2 - The second Point object.
     * @returns {boolean} True if both points have the same coordinates, false otherwise.
     */
    function IsSame(p1, p2) {
        return p1.x == p2.x && p1.y == p2.y;
    }
    KPoint.IsSame = IsSame;
    /**
     * Converts a Point object to a string representation.
     *
     * @param {IPoint} p - The Point object to be converted.
     * @returns {string} A string representation of the Point object.
     */
    function ToPrint(p) {
        return `(${p.x}, ${p.y})`;
    }
    KPoint.ToPrint = ToPrint;
    /**
     * Converts a Point object from screen coordinates to map coordinates.
     *
     * @param {IPoint} p - The Point object in screen coordinates.
     * @returns {IPoint} A new Point object in map coordinates.
     */
    function ConvertFromScreenToMap(p) {
        return new PIXI.Point($gameMap.canvasToMapX(p.x), $gameMap.canvasToMapY(p.y));
    }
    KPoint.ConvertFromScreenToMap = ConvertFromScreenToMap;
    /**
     * Converts a Point object from map coordinates to screen coordinates.
     *
     * @param {IPoint} p - The Point object in map coordinates.
     * @returns {IPoint} A new Point object in screen coordinates.
     */
    function ConvertFromMapToScreen(p) {
        let x = $gameMap.adjustX(p.x);
        let tw = $gameMap.tileWidth();
        x = Math.round(x * tw + tw / 2);
        let y = $gameMap.adjustY(p.y);
        let th = $gameMap.tileHeight();
        y = Math.round(y * th + th);
        return new PIXI.Point(x, y);
    }
    KPoint.ConvertFromMapToScreen = ConvertFromMapToScreen;
    /**
     * Rounds the coordinates of a Point object to the nearest integer.
     *
     * @param {IPoint} p - The Point object to be rounded.
     * @returns {IPoint} A new Point object with rounded coordinates.
     */
    function Round(p) {
        return new PIXI.Point(Math.round(p.x), Math.round(p.y));
    }
    KPoint.Round = Round;
    /**
     * Calculates the distance between two Point objects.
     *
     * @param {IPoint} p1 - The first Point object.
     * @param {IPoint} p2 - The second Point object.
     * @returns {number} The distance between the two points.
     */
    function Distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    KPoint.Distance = Distance;
    /**
     * Checks if a Point object is inside a given rectangle.
     *
     * @param {IPoint} p - The Point object to check.
     * @param {PIXI.Rectangle} rect - The rectangle to check against.
     * @returns {boolean} True if the point is inside the rectangle, false otherwise.
     */
    function IsInsideRect(p, rect) {
        return rect.contains(p.x, p.y);
    }
    KPoint.IsInsideRect = IsInsideRect;
    /**
     * Checks if a Point object is inside a given circle.
     *
     * @param {IPoint} p - The Point object to check.
     * @param {IPoint} center - The center of the circle.
     * @param {number} radius - The radius of the circle.
     * @returns {boolean} True if the point is inside the circle, false otherwise.
     */
    function IsInsideCircle(p, center, radius) {
        return Distance(p, center) <= radius;
    }
    KPoint.IsInsideCircle = IsInsideCircle;
})(KPoint || (KPoint = {}));
var KUtils;
(function (KUtils) {
    /**
     * Calls a specified callback function after a given delay.
     *
     * @param callback - The function to be called after the delay.
     * @param delay - The delay in milliseconds before the callback is executed.
     * @returns The ID of the timeout, which can be used to cancel the timeout with clearTimeout.
     *
     * @throws Will log a warning to the console if the callback throws an error.
     */
    function CallWithDelay(callback, delay) {
        if (!callback)
            return;
        return setTimeout(() => {
            try {
                callback();
            }
            catch (error) {
                console.warn(error);
            }
        }, delay);
    }
    KUtils.CallWithDelay = CallWithDelay;
    function IsMapScene() {
        return SceneManager._scene instanceof Scene_Map;
    }
    KUtils.IsMapScene = IsMapScene;
    function IsBattleScene() {
        return SceneManager._scene instanceof Scene_Battle;
    }
    KUtils.IsBattleScene = IsBattleScene;
})(KUtils || (KUtils = {}));
var KDX;
(function (KDX) {
    class ParamLoader {
        /**
         * Creates an instance of ParamLoader.
         * @param _pluginName The name of the plugin.
         */
        constructor(_pluginName) {
            this._pluginName = _pluginName;
            this._ppNameToParseNext = "";
            this._paramsRaw = this.getPluginParametersByRoot(this._pluginName);
            this._params = this.parseParameters(this._paramsRaw);
        }
        /**
         * Gets the plugin parameters by the root name.
         * @param rootName The root name of the plugin.
         * @returns The plugin parameters if found, otherwise calls PluginManager.parameters.
         */
        getPluginParametersByRoot(rootName) {
            /* @ts-ignore */
            let allParametersRaw = PluginManager._parameters;
            for (const property in allParametersRaw) {
                if (allParametersRaw.hasOwnProperty(property)) {
                    const pluginParameters = allParametersRaw[property];
                    if (pluginParameters[rootName]) {
                        return pluginParameters;
                    }
                }
            }
            return PluginManager.parameters(rootName);
        }
        /**
         * Parses the parameters from the plugin.
         * @param paramSet The raw parameter set.
         * @returns The parsed parameters.
         */
        parseParameters(paramSet) {
            const params = {};
            for (const key in paramSet) {
                if (paramSet.hasOwnProperty(key)) {
                    this._ppNameToParseNext = key;
                    const clearKey = this.parseKey(key);
                    const typeKey = this.parseKeyType(key);
                    params[clearKey] = this.parseParamItem(typeKey, paramSet[key]);
                }
            }
            return params;
        }
        /**
         * Parses the key to remove the type.
         * @param keyRaw The raw key.
         * @returns The parsed key.
         */
        parseKey(keyRaw) {
            return keyRaw.split(":")[0];
        }
        /**
         * Parses the key to get the type.
         * @param keyRaw The raw key.
         * @returns The type of the key.
         */
        parseKeyType(keyRaw) {
            return keyRaw.split(":")[1];
        }
        /**
         * Writes a detailed error message to the console.
         */
        writeDetailedError() {
            try {
                if (!KString.any(this._ppNameToParseNext))
                    return;
                console.warn(`Please, check Plugin Parameter ${this._ppNameToParseNext} in plugin ${this._pluginName}`);
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Checks if the parameters are loaded.
         * @returns True if the parameters are loaded, otherwise false.
         */
        isLoaded() {
            return !!this._paramsRaw && this._paramsRaw.hasOwnProperty(this._pluginName);
        }
        /**
         * Checks if a parameter exists.
         * @param paramName The name of the parameter.
         * @returns True if the parameter exists, otherwise false.
         */
        isHasParameter(paramName) {
            return this._params.hasOwnProperty(paramName);
        }
        /**
         * Gets the value of a parameter.
         * @param paramName The name of the parameter.
         * @param def The default value if the parameter is not found.
         * @returns The value of the parameter or the default value.
         */
        getParam(paramName, def) {
            if (this.isHasParameter(paramName)) {
                const value = this._params[paramName];
                if (value != null)
                    return value;
            }
            return def;
        }
        /**
         * Parses a parameter item based on its type.
         * @param type The type of the parameter.
         * @param item The parameter item.
         * @returns The parsed parameter item.
         */
        parseParamItem(type, item) {
            if (!type)
                return item;
            try {
                switch (type) {
                    case "int":
                    case "i":
                        return Number(item);
                    case "intA":
                        return this.parseArray(item, "int");
                    case "bool":
                    case "b":
                    case "e":
                        return eval(item);
                    case "struct":
                    case "s":
                        return this.parseStruct(item);
                    case "structA":
                        return this.parseStructArray(item);
                    case "str":
                        return item;
                    case "strA":
                        return this.parseArray(item, "str");
                    case "note":
                        return this.parseNote(item);
                    case "json":
                    case "j":
                        return this.parseJson(item);
                    case "jA":
                        return this.parseArray(item, "json");
                    default:
                        return item;
                }
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return item;
            }
        }
        /**
         * Parses an array of items.
         * @param items The items to parse.
         * @param type The type of the items.
         * @returns The parsed array.
         */
        parseArray(items, type) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(this.parseParamItem(type, p));
                    }
                    catch (e) {
                        console.warn(e);
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a struct item.
         * @param item The item to parse.
         * @returns The parsed struct.
         */
        parseStruct(item) {
            try {
                if (!item || !KString.any(item))
                    return null;
                const parsed = JsonEx.parse(item);
                return parsed ? this.parseParameters(parsed) : null;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return null;
            }
        }
        /**
         * Parses an array of struct items.
         * @param items The items to parse.
         * @returns The parsed array of structs.
         */
        parseStructArray(items) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(this.parseStruct(p));
                    }
                    catch (e) {
                        console.warn(e);
                        this.writeDetailedError();
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a note item.
         * @param item The item to parse.
         * @returns The parsed note.
         */
        parseNote(item) {
            try {
                const parsed = JsonEx.parse(item);
                return parsed ? parsed : item;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return item;
            }
        }
        /**
         * Parses a JSON item.
         * @param item The item to parse.
         * @returns The parsed JSON.
         */
        parseJson(item) {
            try {
                const json = {};
                const parsed = JsonEx.parse(item);
                const elements = parsed.split('\n');
                for (const element of elements) {
                    const cx = `{${element}}`;
                    try {
                        const item = JsonEx.parse(cx);
                        for (const key in item) {
                            if (item.hasOwnProperty(key)) {
                                json[key] = item[key];
                            }
                        }
                    }
                    catch (e) {
                        console.warn(`Parameter ${element} has syntax errors, ignored`);
                    }
                }
                return json;
            }
            catch (e) {
                console.warn(e);
                this.writeDetailedError();
                return null; // To return default value
            }
        }
    }
    KDX.ParamLoader = ParamLoader;
})(KDX || (KDX = {}));
var KDX;
(function (KDX) {
    class TimedUpdate {
        /**
         * Creates an instance of TimedUpdate.
         * @param interval The interval in frames.
         * @param method The method to call on update.
         */
        constructor(interval, method) {
            this.interval = interval;
            this.method = method;
            this._timer = 0;
            this._once = false;
        }
        /**
         * Sets the number of repeats and the callback after completion.
         * @param repeatsLeft The number of repeats left.
         * @param afterCallback The callback to call after completion.
         */
        setAfter(repeatsLeft, afterCallback) {
            this._repeatsLeft = repeatsLeft;
            this._afterCallback = afterCallback;
        }
        /**
         * Updates the timer and calls the method if the interval is reached.
         */
        update() {
            if (this.interval == null)
                return;
            if (this._timer++ >= this.interval) {
                this.call();
                this._timer = 0;
                if (this._repeatsLeft != null) {
                    this._repeatsLeft -= 1;
                    if (this._repeatsLeft <= 0) {
                        if (this._afterCallback)
                            this._afterCallback();
                    }
                }
                if (this._once)
                    this.stop();
            }
        }
        /**
         * Sets the update to be called only once.
         */
        once() {
            this._once = true;
        }
        /**
         * Sets the method to call on update.
         * @param method The method to call on update.
         */
        onUpdate(method) {
            this.method = method;
        }
        /**
         * Stops the update.
         */
        stop() {
            this.interval = null;
        }
        /**
         * Checks if the update is still active.
         * @returns True if the update is active, otherwise false.
         */
        isAlive() {
            return this.interval != null;
        }
        /**
         * Randomizes the interval within a given range.
         * @param min The minimum value to add to the interval.
         * @param max The maximum value to add to the interval.
         */
        applyTimeRange(min, max) {
            if (!this.isAlive())
                return;
            const value = KNumber.random(min, max);
            this.interval += value;
        }
        /**
         * Calls the method.
         */
        call() {
            try {
                if (this.method)
                    this.method();
            }
            catch (e) {
                console.warn(e);
            }
        }
    }
    KDX.TimedUpdate = TimedUpdate;
})(KDX || (KDX = {}));


/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/pixi-filters@5.3.0/dist/browser/pixi-filters.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * pixi-filters - v5.3.0
 * Compiled Thu, 15 Feb 2024 16:39:05 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,t,r,n){"use strict";class i extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n"),this.gamma=1,this.saturation=1,this.contrast=1,this.brightness=1,this.red=1,this.green=1,this.blue=1,this.alpha=1,Object.assign(this,e)}apply(e,t,r,n){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,r,n)}}class o extends t.Filter{constructor(e=4,r=3,n=!1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",n?"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n":"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}"),this._kernels=[],this._blur=4,this._quality=3,this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new t.Point,this.pixelSize=1,this._clamp=n,Array.isArray(e)?this.kernels=e:(this._blur=e,this.quality=r)}apply(e,t,r,n){const i=this._pixelSize.x/t._frame.width,o=this._pixelSize.y/t._frame.height;let s;if(1===this._quality||0===this._blur)s=this._kernels[0]+.5,this.uniforms.uOffset[0]=s*i,this.uniforms.uOffset[1]=s*o,e.applyFilter(this,t,r,n);else{const a=e.getFilterTexture();let l,u=t,c=a;const f=this._quality-1;for(let t=0;t<f;t++)s=this._kernels[t]+.5,this.uniforms.uOffset[0]=s*i,this.uniforms.uOffset[1]=s*o,e.applyFilter(this,u,c,1),l=u,u=c,c=l;s=this._kernels[f]+.5,this.uniforms.uOffset[0]=s*i,this.uniforms.uOffset[1]=s*o,e.applyFilter(this,u,r,n),e.returnFilterTexture(a)}}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce(((e,t)=>e+t+.5),0))}_generateKernels(){const e=this._blur,t=this._quality,r=[e];if(e>0){let n=e;const i=e/t;for(let e=1;e<t;e++)n-=i,r.push(n)}this._kernels=r,this._updatePadding()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get clamp(){return this._clamp}set pixelSize(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)}get pixelSize(){return this._pixelSize}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get blur(){return this._blur}set blur(e){this._blur=e,this._generateKernels()}}var s="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}";class a extends t.Filter{constructor(e=.5){super(s,"\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n"),this.threshold=e}get threshold(){return this.uniforms.threshold}set threshold(e){this.uniforms.threshold=e}}const l=class extends t.Filter{constructor(e){super(s,"uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n"),this.bloomScale=1,this.brightness=1,this._resolution=t.settings.FILTER_RESOLUTION,"number"==typeof e&&(e={threshold:e});const r=Object.assign(l.defaults,e);this.bloomScale=r.bloomScale,this.brightness=r.brightness;const{kernels:n,blur:i,quality:u,pixelSize:c,resolution:f}=r;this._extractFilter=new a(r.threshold),this._extractFilter.resolution=f,this._blurFilter=n?new o(n):new o(i,u),this.pixelSize=c,this.resolution=f}apply(e,t,r,n,i){const o=e.getFilterTexture();this._extractFilter.apply(e,t,o,1,i);const s=e.getFilterTexture();this._blurFilter.apply(e,o,s,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=s,e.applyFilter(this,t,r,n),e.returnFilterTexture(s),e.returnFilterTexture(o)}get resolution(){return this._resolution}set resolution(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.blur}set blur(e){this._blurFilter.blur=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){this._blurFilter.pixelSize=e}};let u=l;u.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:t.settings.FILTER_RESOLUTION};class c extends t.Filter{constructor(e=8){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor(coord / size) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod(coord, size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, 4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the grid position\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    // sample the color at grid position\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // brightness of the color as it's perceived by the human eye\n    float gray = 0.3 * color.r + 0.59 * color.g + 0.11 * color.b;\n\n    // determine the character to use\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n"),this.size=e}get size(){return this.uniforms.pixelSize}set size(e){this.uniforms.pixelSize=e}}class f extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n"),this._thickness=2,this._angle=0,this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),Object.assign(this,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},e),this.padding=1}_updateTransform(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)}get rotation(){return this._angle/t.DEG_TO_RAD}set rotation(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()}get thickness(){return this._thickness}set thickness(e){this._thickness=e,this._updateTransform()}get lightColor(){return t.utils.rgb2hex(this.uniforms.lightColor)}set lightColor(e){t.utils.hex2rgb(e,this.uniforms.lightColor)}get lightAlpha(){return this.uniforms.lightAlpha}set lightAlpha(e){this.uniforms.lightAlpha=e}get shadowColor(){return t.utils.rgb2hex(this.uniforms.shadowColor)}set shadowColor(e){t.utils.hex2rgb(e,this.uniforms.shadowColor)}get shadowAlpha(){return this.uniforms.shadowAlpha}set shadowAlpha(e){this.uniforms.shadowAlpha=e}}class d extends t.Filter{constructor(e=2,i=4,o=t.settings.FILTER_RESOLUTION,s=5){let a,l;super(),"number"==typeof e?(a=e,l=e):e instanceof t.Point?(a=e.x,l=e.y):Array.isArray(e)&&(a=e[0],l=e[1]),this.blurXFilter=new n.BlurFilterPass(!0,a,i,o,s),this.blurYFilter=new n.BlurFilterPass(!1,l,i,o,s),this.blurYFilter.blendMode=t.BLEND_MODES.SCREEN,this.defaultFilter=new r.AlphaFilter}apply(e,t,r,n){const i=e.getFilterTexture();this.defaultFilter.apply(e,t,r,n),this.blurXFilter.apply(e,t,i,1),this.blurYFilter.apply(e,i,r,0),e.returnFilterTexture(i)}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e}}const h=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n"),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,h.defaults,e)}apply(e,t,r,n){const{width:i,height:o}=t.filterFrame;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=o,e.applyFilter(this,t,r,n)}get radius(){return this.uniforms.radius}set radius(e){this.uniforms.radius=e}get strength(){return this.uniforms.strength}set strength(e){this.uniforms.strength=e}get center(){return this.uniforms.center}set center(e){this.uniforms.center=e}};let m=h;m.defaults={center:[.5,.5],radius:100,strength:1};var g,v;(v=v||{}).stringify=(g={"visit_linear-gradient":function(e){return g.visit_gradient(e)},"visit_repeating-linear-gradient":function(e){return g.visit_gradient(e)},"visit_radial-gradient":function(e){return g.visit_gradient(e)},"visit_repeating-radial-gradient":function(e){return g.visit_gradient(e)},visit_gradient:function(e){var t=g.visit(e.orientation);return t&&(t+=", "),e.type+"("+t+g.visit(e.colorStops)+")"},visit_shape:function(e){var t=e.value,r=g.visit(e.at),n=g.visit(e.style);return n&&(t+=" "+n),r&&(t+=" at "+r),t},"visit_default-radial":function(e){var t="",r=g.visit(e.at);return r&&(t+=r),t},"visit_extent-keyword":function(e){var t=e.value,r=g.visit(e.at);return r&&(t+=" at "+r),t},"visit_position-keyword":function(e){return e.value},visit_position:function(e){return g.visit(e.value.x)+" "+g.visit(e.value.y)},"visit_%":function(e){return e.value+"%"},visit_em:function(e){return e.value+"em"},visit_px:function(e){return e.value+"px"},visit_literal:function(e){return g.visit_color(e.value,e)},visit_hex:function(e){return g.visit_color("#"+e.value,e)},visit_rgb:function(e){return g.visit_color("rgb("+e.value.join(", ")+")",e)},visit_rgba:function(e){return g.visit_color("rgba("+e.value.join(", ")+")",e)},visit_color:function(e,t){var r=e,n=g.visit(t.length);return n&&(r+=" "+n),r},visit_angular:function(e){return e.value+"deg"},visit_directional:function(e){return"to "+e.value},visit_array:function(e){var t="",r=e.length;return e.forEach((function(e,n){t+=g.visit(e),n<r-1&&(t+=", ")})),t},visit:function(e){if(!e)return"";if(e instanceof Array)return g.visit_array(e,"");if(e.type){var t=g["visit_"+e.type];if(t)return t(e);throw Error("Missing visitor visit_"+e.type)}throw Error("Invalid node.")}},function(e){return g.visit(e)}),(v=v||{}).parse=function(){var e={linearGradient:/^(\-(webkit|o|ms|moz)\-)?(linear\-gradient)/i,repeatingLinearGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-linear\-gradient)/i,radialGradient:/^(\-(webkit|o|ms|moz)\-)?(radial\-gradient)/i,repeatingRadialGradient:/^(\-(webkit|o|ms|moz)\-)?(repeating\-radial\-gradient)/i,sideOrCorner:/^to (left (top|bottom)|right (top|bottom)|left|right|top|bottom)/i,extentKeywords:/^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,positionKeywords:/^(left|center|right|top|bottom)/i,pixelValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,percentageValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,emValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,angleValue:/^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,startCall:/^\(/,endCall:/^\)/,comma:/^,/,hexColor:/^\#([0-9a-fA-F]+)/,literalColor:/^([a-zA-Z]+)/,rgbColor:/^rgb/i,rgbaColor:/^rgba/i,number:/^(([0-9]*\.[0-9]+)|([0-9]+\.?))/},t="";function r(e){var r=new Error(t+": "+e);throw r.source=t,r}function n(){var e=h(i);return t.length>0&&r("Invalid input not EOF"),e}function i(){return o("linear-gradient",e.linearGradient,a)||o("repeating-linear-gradient",e.repeatingLinearGradient,a)||o("radial-gradient",e.radialGradient,l)||o("repeating-radial-gradient",e.repeatingRadialGradient,l)}function o(t,n,i){return s(n,(function(n){var o=i();return o&&(y(e.comma)||r("Missing comma before color stops")),{type:t,orientation:o,colorStops:h(m)}}))}function s(t,n){var i=y(t);if(i){y(e.startCall)||r("Missing (");var o=n(i);return y(e.endCall)||r("Missing )"),o}}function a(){return x("directional",e.sideOrCorner,1)||x("angular",e.angleValue,1)}function l(){var r,n,i=u();return i&&((r=[]).push(i),n=t,y(e.comma)&&((i=u())?r.push(i):t=n)),r}function u(){var e=function(){var e=x("shape",/^(circle)/i,0);return e&&(e.style=p()||c()),e}()||function(){var e=x("shape",/^(ellipse)/i,0);return e&&(e.style=v()||c()),e}();if(e)e.at=f();else{var t=c();if(t){e=t;var r=f();r&&(e.at=r)}else{var n=d();n&&(e={type:"default-radial",at:n})}}return e}function c(){return x("extent-keyword",e.extentKeywords,1)}function f(){if(x("position",/^at/,0)){var e=d();return e||r("Missing positioning value"),e}}function d(){var e={x:v(),y:v()};if(e.x||e.y)return{type:"position",value:e}}function h(t){var n=t(),i=[];if(n)for(i.push(n);y(e.comma);)(n=t())?i.push(n):r("One extra comma");return i}function m(){var t=x("hex",e.hexColor,1)||s(e.rgbaColor,(function(){return{type:"rgba",value:h(g)}}))||s(e.rgbColor,(function(){return{type:"rgb",value:h(g)}}))||x("literal",e.literalColor,0);return t||r("Expected color definition"),t.length=v(),t}function g(){return y(e.number)[1]}function v(){return x("%",e.percentageValue,1)||x("position-keyword",e.positionKeywords,1)||p()}function p(){return x("px",e.pixelValue,1)||x("em",e.emValue,1)}function x(e,t,r){var n=y(t);if(n)return{type:e,value:n[r]}}function y(e){var r,n;return(n=/^[\n\r\t\s]+/.exec(t))&&C(n[0].length),(r=e.exec(t))&&C(r[0].length),r}function C(e){t=t.substr(e)}return function(e){return t=e.toString(),n()}}();var p=v.parse;v.stringify;var x={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},y={red:0,orange:60,yellow:120,green:180,blue:240,purple:300};var C={name:"rgb",min:[0,0,0],max:[255,255,255],channel:["red","green","blue"],alias:["RGB"]},_={name:"hsl",min:[0,0,0],max:[360,100,100],channel:["hue","saturation","lightness"],alias:["HSL"],rgb:function(e){var t,r,n,i,o,s=e[0]/360,a=e[1]/100,l=e[2]/100;if(0===a)return[o=255*l,o,o];t=2*l-(r=l<.5?l*(1+a):l+a-l*a),i=[0,0,0];for(var u=0;u<3;u++)(n=s+1/3*-(u-1))<0?n++:n>1&&n--,o=6*n<1?t+6*(r-t)*n:2*n<1?r:3*n<2?t+(r-t)*(2/3-n)*6:t,i[u]=255*o;return i}};function b(e){Array.isArray(e)&&e.raw&&(e=String.raw(...arguments));var t,r=function(e){var t,r,n=[],i=1;if("string"==typeof e)if(x[e])n=x[e].slice(),r="rgb";else if("transparent"===e)i=0,r="rgb",n=[0,0,0];else if(/^#[A-Fa-f0-9]+$/.test(e)){var o=e.slice(1);i=1,(l=o.length)<=4?(n=[parseInt(o[0]+o[0],16),parseInt(o[1]+o[1],16),parseInt(o[2]+o[2],16)],4===l&&(i=parseInt(o[3]+o[3],16)/255)):(n=[parseInt(o[0]+o[1],16),parseInt(o[2]+o[3],16),parseInt(o[4]+o[5],16)],8===l&&(i=parseInt(o[6]+o[7],16)/255)),n[0]||(n[0]=0),n[1]||(n[1]=0),n[2]||(n[2]=0),r="rgb"}else if(t=/^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(e)){var s=t[1],a="rgb"===s;r=o=s.replace(/a$/,"");var l="cmyk"===o?4:"gray"===o?1:3;n=t[2].trim().split(/\s*[,\/]\s*|\s+/).map((function(e,t){if(/%$/.test(e))return t===l?parseFloat(e)/100:"rgb"===o?255*parseFloat(e)/100:parseFloat(e);if("h"===o[t]){if(/deg$/.test(e))return parseFloat(e);if(void 0!==y[e])return y[e]}return parseFloat(e)})),s===o&&n.push(1),i=a||void 0===n[l]?1:n[l],n=n.slice(0,l)}else e.length>10&&/[0-9](?:\s|\/)/.test(e)&&(n=e.match(/([0-9]+)/g).map((function(e){return parseFloat(e)})),r=e.match(/([a-z])/gi).join("").toLowerCase());else isNaN(e)?Array.isArray(e)||e.length?(n=[e[0],e[1],e[2]],r="rgb",i=4===e.length?e[3]:1):e instanceof Object&&(null!=e.r||null!=e.red||null!=e.R?(r="rgb",n=[e.r||e.red||e.R||0,e.g||e.green||e.G||0,e.b||e.blue||e.B||0]):(r="hsl",n=[e.h||e.hue||e.H||0,e.s||e.saturation||e.S||0,e.l||e.lightness||e.L||e.b||e.brightness]),i=e.a||e.alpha||e.opacity||1,null!=e.opacity&&(i/=100)):(r="rgb",n=[e>>>16,(65280&e)>>>8,255&e]);return{space:r,values:n,alpha:i}}(e);if(!r.space)return[];const n="h"===r.space[0]?_.min:C.min,i="h"===r.space[0]?_.max:C.max;return(t=Array(3))[0]=Math.min(Math.max(r.values[0],n[0]),i[0]),t[1]=Math.min(Math.max(r.values[1],n[1]),i[1]),t[2]=Math.min(Math.max(r.values[2],n[2]),i[2]),"h"===r.space[0]&&(t=_.rgb(t)),t.push(Math.min(Math.max(r.alpha,0),1)),t}function S(e){switch(typeof e){case"string":return function(e){const t=b(e);if(!t)throw new Error(`Unable to parse color "${e}" as RGBA.`);return[t[0]/255,t[1]/255,t[2]/255,t[3]]}(e);case"number":return t.utils.hex2rgb(e);default:return e}}function T(e){const t=p(function(e){let t=e.replace(/\s{2,}/gu," ");return t=t.replace(/;/g,""),t=t.replace(/ ,/g,","),t=t.replace(/\( /g,"("),t=t.replace(/ \)/g,")"),t.trim()}(e));if(0===t.length)throw new Error("Invalid CSS gradient.");if(1!==t.length)throw new Error("Unsupported CSS gradient (multiple gradients is not supported).");const r=t[0],n=function(e){const t={"linear-gradient":0,"radial-gradient":1};if(!(e in t))throw new Error(`Unsupported gradient type "${e}"`);return t[e]}(r.type),i=function(e){const t=function(e){const t=[];for(let r=0;r<e.length;r++){const n=e[r];let i=-1;"literal"===n.type&&n.length&&"type"in n.length&&"%"===n.length.type&&"value"in n.length&&(i=parseFloat(n.length.value)/100),t.push(i)}const r=e=>{for(let r=e;r<t.length;r++)if(-1!==t[r])return{indexDelta:r-e,offset:t[r]};return{indexDelta:t.length-1-e,offset:1}};let n=0;for(let e=0;e<t.length;e++){const i=t[e];if(-1!==i)n=i;else if(0===e)t[e]=0;else if(e+1===t.length)t[e]=1;else{const i=r(e),o=(i.offset-n)/(1+i.indexDelta);for(let r=0;r<=i.indexDelta;r++)t[e+r]=n+(r+1)*o;e+=i.indexDelta,n=t[e]}}return t.map(A)}(e),r=[];for(let n=0;n<e.length;n++){const i=F(e[n]);r.push({offset:t[n],color:i.slice(0,3),alpha:i[3]})}return r}(r.colorStops),o=function(e){if(void 0===e)return 0;if("type"in e&&"value"in e)switch(e.type){case"angular":return parseFloat(e.value);case"directional":return function(e){const t={left:270,top:0,bottom:180,right:90,"left top":315,"top left":315,"left bottom":225,"bottom left":225,"right top":45,"top right":45,"right bottom":135,"bottom right":135};if(!(e in t))throw new Error(`Unsupported directional value "${e}"`);return t[e]}(e.value)}return 0}(r.orientation);return{type:n,stops:i,angle:o}}function F(e){return S(function(e){switch(e.type){case"hex":return`#${e.value}`;case"literal":return e.value;default:return`${e.type}(${e.value.join(",")})`}}(e))}function A(e){return e.toString().length>6?parseFloat(e.toString().substring(0,6)):e}C.hsl=function(e){var t,r,n=e[0]/255,i=e[1]/255,o=e[2]/255,s=Math.min(n,i,o),a=Math.max(n,i,o),l=a-s;return a===s?t=0:n===a?t=(i-o)/l:i===a?t=2+(o-n)/l:o===a&&(t=4+(n-i)/l),(t=Math.min(60*t,360))<0&&(t+=360),r=(s+a)/2,[t,100*(a===s?0:r<=.5?l/(a+s):l/(2-a-s)),100*r]};var z=Object.defineProperty,w=Object.defineProperties,P=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,D=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,O=(e,t,r)=>t in e?z(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,R=(e,t)=>{for(var r in t||(t={}))D.call(t,r)&&O(e,r,t[r]);if(M)for(var r of M(t))k.call(t,r)&&O(e,r,t[r]);return e};const E=class extends t.Filter{constructor(e){var t,r;let n;if(n=e&&"css"in e?((e,t)=>w(e,P(t)))(R({},T(e.css||"")),{alpha:null!=(t=e.alpha)?t:E.defaults.alpha,maxColors:null!=(r=e.maxColors)?r:E.defaults.maxColors}):R(R({},E.defaults),e),!n.stops||n.stops.length<2)throw new Error("ColorGradientFilter requires at least 2 color stops.");super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform vec4 inputSize;\nuniform vec4 outputFrame;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vFilterCoord = vTextureCoord * inputSize.xy / outputFrame.zw;\n}\n","const float PI = 3.1415926538;\nconst float PI_2 = PI*2.;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\nuniform sampler2D uSampler;\n\nconst int TYPE_LINEAR = 0;\nconst int TYPE_RADIAL = 1;\nconst int TYPE_CONIC = 2;\nconst int MAX_STOPS = 32;\n\nuniform int uNumStops;\nuniform float uAlphas[3*MAX_STOPS];\nuniform vec3 uColors[MAX_STOPS];\nuniform float uOffsets[MAX_STOPS];\nuniform int uType;\nuniform float uAngle;\nuniform float uAlpha;\nuniform int uMaxColors;\nuniform bool uReplace;\n\nstruct ColorStop {\n    float offset;\n    vec3 color;\n    float alpha;\n};\n\nmat2 rotate2d(float angle){\n    return mat2(cos(angle), -sin(angle),\n    sin(angle), cos(angle));\n}\n\nfloat projectLinearPosition(vec2 pos, float angle){\n    vec2 center = vec2(0.5);\n    vec2 result = pos - center;\n    result = rotate2d(angle) * result;\n    result = result + center;\n    return clamp(result.x, 0., 1.);\n}\n\nfloat projectRadialPosition(vec2 pos) {\n    float r = distance(vFilterCoord, vec2(0.5));\n    return clamp(2.*r, 0., 1.);\n}\n\nfloat projectAnglePosition(vec2 pos, float angle) {\n    vec2 center = pos - vec2(0.5);\n    float polarAngle=atan(-center.y, center.x);\n    return mod(polarAngle + angle, PI_2) / PI_2;\n}\n\nfloat projectPosition(vec2 pos, int type, float angle) {\n    if (type == TYPE_LINEAR) {\n        return projectLinearPosition(pos, angle);\n    } else if (type == TYPE_RADIAL) {\n        return projectRadialPosition(pos);\n    } else if (type == TYPE_CONIC) {\n        return projectAnglePosition(pos, angle);\n    }\n\n    return pos.y;\n}\n\nvoid main(void) {\n    // current/original color\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n\n    // skip calculations if gradient alpha is 0\n    if (0.0 == uAlpha) {\n        gl_FragColor = currentColor;\n        return;\n    }\n\n    // project position\n    float y = projectPosition(vFilterCoord, uType, radians(uAngle));\n\n    // check gradient bounds\n    float offsetMin = uOffsets[0];\n    float offsetMax = 0.0;\n\n    for (int i = 0; i < MAX_STOPS; i++) {\n        if (i == uNumStops-1){ // last index\n            offsetMax = uOffsets[i];\n        }\n    }\n\n    if (y  < offsetMin || y > offsetMax) {\n        gl_FragColor = currentColor;\n        return;\n    }\n\n    // limit colors\n    if (uMaxColors > 0) {\n        float stepSize = 1./float(uMaxColors);\n        float stepNumber = float(floor(y/stepSize));\n        y = stepSize * (stepNumber + 0.5);// offset by 0.5 to use color from middle of segment\n    }\n\n    // find color stops\n    ColorStop from;\n    ColorStop to;\n\n    for (int i = 0; i < MAX_STOPS; i++) {\n        if (y >= uOffsets[i]) {\n            from = ColorStop(uOffsets[i], uColors[i], uAlphas[i]);\n            to = ColorStop(uOffsets[i+1], uColors[i+1], uAlphas[i+1]);\n        }\n\n        if (i == uNumStops-1){ // last index\n            break;\n        }\n    }\n\n    // mix colors from stops\n    vec4 colorFrom = vec4(from.color * from.alpha, from.alpha);\n    vec4 colorTo = vec4(to.color * to.alpha, to.alpha);\n\n    float segmentHeight = to.offset - from.offset;\n    float relativePos = y - from.offset;// position from 0 to [segmentHeight]\n    float relativePercent = relativePos / segmentHeight;// position in percent between [from.offset] and [to.offset].\n\n    float gradientAlpha = uAlpha * currentColor.a;\n    vec4 gradientColor = mix(colorFrom, colorTo, relativePercent) * gradientAlpha;\n\n    if (uReplace == false) {\n        // mix resulting color with current color\n        gl_FragColor = gradientColor + currentColor*(1.-gradientColor.a);\n    } else {\n        // replace with gradient color\n        gl_FragColor = gradientColor;\n    }\n}\n"),this._stops=[],this.autoFit=!1,Object.assign(this,n)}get stops(){return this._stops}set stops(e){const t=function(e){return[...e].sort(((e,t)=>e.offset-t.offset))}(e),r=new Float32Array(3*t.length);for(let e=0;e<t.length;e++){const n=S(t[e].color),i=3*e;r[i+0]=n[0],r[i+1]=n[1],r[i+2]=n[2]}this.uniforms.uColors=r,this.uniforms.uOffsets=t.map((e=>e.offset)),this.uniforms.uAlphas=t.map((e=>e.alpha)),this.uniforms.uNumStops=t.length,this._stops=t}set type(e){this.uniforms.uType=e}get type(){return this.uniforms.uType}set angle(e){this.uniforms.uAngle=e-90}get angle(){return this.uniforms.uAngle+90}set alpha(e){this.uniforms.uAlpha=e}get alpha(){return this.uniforms.uAlpha}set maxColors(e){this.uniforms.uMaxColors=e}get maxColors(){return this.uniforms.uMaxColors}set replace(e){this.uniforms.uReplace=e}get replace(){return this.uniforms.uReplace}};let j=E;j.LINEAR=0,j.RADIAL=1,j.CONIC=2,j.defaults={type:E.LINEAR,stops:[{offset:0,color:16711680,alpha:1},{offset:1,color:255,alpha:1}],alpha:1,angle:90,maxColors:0,replace:!1};class I extends t.Filter{constructor(e,t=!1,r=1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}"),this.mix=1,this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._nearest=!1,this._scaleMode=null,this._colorMap=null,this._scaleMode=null,this.nearest=t,this.mix=r,this.colorMap=e}apply(e,t,r,n){this.uniforms._mix=this.mix,e.applyFilter(this,t,r,n)}get colorSize(){return this._size}get colorMap(){return this._colorMap}set colorMap(e){!e||(e instanceof t.Texture||(e=t.Texture.from(e)),null!=e&&e.baseTexture&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=t.MIPMAP_MODES.OFF,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e)}get nearest(){return this._nearest}set nearest(e){this._nearest=e,this._scaleMode=e?t.SCALE_MODES.NEAREST:t.SCALE_MODES.LINEAR;const r=this._colorMap;r&&r.baseTexture&&(r.baseTexture._glTextures={},r.baseTexture.scaleMode=this._scaleMode,r.baseTexture.mipmap=t.MIPMAP_MODES.OFF,r._updateID++,r.baseTexture.emit("update",r.baseTexture))}updateColorMap(){const e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)}destroy(e=!1){this._colorMap&&this._colorMap.destroy(e),super.destroy()}}class L extends t.Filter{constructor(e=0,t=1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n"),this._color=0,this._alpha=1,this.uniforms.color=new Float32Array(3),this.color=e,this.alpha=t}set color(e){const r=this.uniforms.color;"number"==typeof e?(t.utils.hex2rgb(e,r),this._color=e):(r[0]=e[0],r[1]=e[1],r[2]=e[2],this._color=t.utils.rgb2hex(r))}get color(){return this._color}set alpha(e){this.uniforms.alpha=e,this._alpha=e}get alpha(){return this._alpha}}class V extends t.Filter{constructor(e=16711680,t=0,r=.4){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n"),this._originalColor=16711680,this._newColor=0,this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=e,this.newColor=t,this.epsilon=r}set originalColor(e){const r=this.uniforms.originalColor;"number"==typeof e?(t.utils.hex2rgb(e,r),this._originalColor=e):(r[0]=e[0],r[1]=e[1],r[2]=e[2],this._originalColor=t.utils.rgb2hex(r))}get originalColor(){return this._originalColor}set newColor(e){const r=this.uniforms.newColor;"number"==typeof e?(t.utils.hex2rgb(e,r),this._newColor=e):(r[0]=e[0],r[1]=e[1],r[2]=e[2],this._newColor=t.utils.rgb2hex(r))}get newColor(){return this._newColor}set epsilon(e){this.uniforms.epsilon=e}get epsilon(){return this.uniforms.epsilon}}class N extends t.Filter{constructor(e,t=200,r=200){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n"),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),void 0!==e&&(this.matrix=e),this.width=t,this.height=r}get matrix(){return this.uniforms.matrix}set matrix(e){e.forEach(((e,t)=>{this.uniforms.matrix[t]=e}))}get width(){return 1/this.uniforms.texelSize[0]}set width(e){this.uniforms.texelSize[0]=1/e}get height(){return 1/this.uniforms.texelSize[1]}set height(e){this.uniforms.texelSize[1]=1/e}}class G extends t.Filter{constructor(){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")}}const B=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n"),this.time=0,this.seed=0,this.uniforms.dimensions=new Float32Array(2),Object.assign(this,B.defaults,e)}apply(e,t,r,n){const{width:i,height:o}=t.filterFrame;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=o,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,t,r,n)}set curvature(e){this.uniforms.curvature=e}get curvature(){return this.uniforms.curvature}set lineWidth(e){this.uniforms.lineWidth=e}get lineWidth(){return this.uniforms.lineWidth}set lineContrast(e){this.uniforms.lineContrast=e}get lineContrast(){return this.uniforms.lineContrast}set verticalLine(e){this.uniforms.verticalLine=e}get verticalLine(){return this.uniforms.verticalLine}set noise(e){this.uniforms.noise=e}get noise(){return this.uniforms.noise}set noiseSize(e){this.uniforms.noiseSize=e}get noiseSize(){return this.uniforms.noiseSize}set vignetting(e){this.uniforms.vignetting=e}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(e){this.uniforms.vignettingAlpha=e}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(e){this.uniforms.vignettingBlur=e}get vignettingBlur(){return this.uniforms.vignettingBlur}};let X=B;X.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0};class q extends t.Filter{constructor(e=1,t=5,r=!0){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\nuniform bool grayscale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   vec3 colorRGB = vec3(color);\n\n   if (grayscale)\n   {\n       colorRGB = vec3(color.r + color.g + color.b) / 3.0;\n   }\n\n   gl_FragColor = vec4(colorRGB * 10.0 - 5.0 + pattern(), color.a);\n}\n"),this.scale=e,this.angle=t,this.grayscale=r}get scale(){return this.uniforms.scale}set scale(e){this.uniforms.scale=e}get angle(){return this.uniforms.angle}set angle(e){this.uniforms.angle=e}get grayscale(){return this.uniforms.grayscale}set grayscale(e){this.uniforms.grayscale=e}}var K=Object.defineProperty,W=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,Z=(e,t,r)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,U=(e,t)=>{for(var r in t||(t={}))Y.call(t,r)&&Z(e,r,t[r]);if(W)for(var r of W(t))$.call(t,r)&&Z(e,r,t[r]);return e};const H=class extends t.Filter{constructor(e){super(),this.angle=45,this._distance=5,this._resolution=t.settings.FILTER_RESOLUTION;const r=e?U(U({},H.defaults),e):H.defaults,{kernels:n,blur:i,quality:s,pixelSize:a,resolution:l}=r;this._offset=new t.ObservablePoint(this._updatePadding,this),this._tintFilter=new t.Filter("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}"),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.uniforms.shift=this._offset,this._tintFilter.resolution=l,this._blurFilter=n?new o(n):new o(i,s),this.pixelSize=a,this.resolution=l;const{shadowOnly:u,rotation:c,distance:f,offset:d,alpha:h,color:m}=r;this.shadowOnly=u,void 0!==c&&void 0!==f?(this.rotation=c,this.distance=f):this.offset=d,this.alpha=h,this.color=m}apply(e,t,r,n){const i=e.getFilterTexture();this._tintFilter.apply(e,t,i,1),this._blurFilter.apply(e,i,r,n),!0!==this.shadowOnly&&e.applyFilter(this,t,r,0),e.returnFilterTexture(i)}_updatePadding(){const e=Math.max(Math.abs(this._offset.x),Math.abs(this._offset.y));this.padding=e+2*this.blur}_updateShift(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))}set offset(e){this._offset.copyFrom(e),this._updatePadding()}get offset(){return this._offset}get resolution(){return this._resolution}set resolution(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)}get distance(){return this._distance}set distance(e){t.utils.deprecation("5.3.0","DropShadowFilter distance is deprecated, use offset"),this._distance=e,this._updatePadding(),this._updateShift()}get rotation(){return this.angle/t.DEG_TO_RAD}set rotation(e){t.utils.deprecation("5.3.0","DropShadowFilter rotation is deprecated, use offset"),this.angle=e*t.DEG_TO_RAD,this._updateShift()}get alpha(){return this._tintFilter.uniforms.alpha}set alpha(e){this._tintFilter.uniforms.alpha=e}get color(){return t.utils.rgb2hex(this._tintFilter.uniforms.color)}set color(e){t.utils.hex2rgb(e,this._tintFilter.uniforms.color)}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.blur}set blur(e){this._blurFilter.blur=e,this._updatePadding()}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){this._blurFilter.pixelSize=e}};let Q=H;Q.defaults={offset:{x:4,y:4},color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:t.settings.FILTER_RESOLUTION};class J extends t.Filter{constructor(e=5){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n"),this.strength=e}get strength(){return this.uniforms.strength}set strength(e){this.uniforms.strength=e}}const ee=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n"),this.offset=100,this.fillMode=ee.TRANSPARENT,this.average=!1,this.seed=0,this.minSize=8,this.sampleSize=512,this._slices=0,this._offsets=new Float32Array(1),this._sizes=new Float32Array(1),this._direction=-1,this.uniforms.dimensions=new Float32Array(2),this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=t.Texture.from(this._canvas,{scaleMode:t.SCALE_MODES.NEAREST}),Object.assign(this,ee.defaults,e)}apply(e,t,r,n){const{width:i,height:o}=t.filterFrame;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=o,this.uniforms.aspect=o/i,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,t,r,n)}_randomizeSizes(){const e=this._sizes,t=this._slices-1,r=this.sampleSize,n=Math.min(this.minSize/r,.9/this._slices);if(this.average){const r=this._slices;let i=1;for(let o=0;o<t;o++){const t=i/(r-o),s=Math.max(t*(1-.6*Math.random()),n);e[o]=s,i-=s}e[t]=i}else{let r=1;const i=Math.sqrt(1/this._slices);for(let o=0;o<t;o++){const t=Math.max(i*r*Math.random(),n);e[o]=t,r-=t}e[t]=r}this.shuffle()}shuffle(){const e=this._sizes;for(let t=this._slices-1;t>0;t--){const r=Math.random()*t>>0,n=e[t];e[t]=e[r],e[r]=n}}_randomizeOffsets(){for(let e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)}refresh(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()}redraw(){const e=this.sampleSize,t=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,e);let n,i=0;for(let t=0;t<this._slices;t++){n=Math.floor(256*this._offsets[t]);const o=this._sizes[t]*e,s=n>0?n:0,a=n<0?-n:0;r.fillStyle=`rgba(${s}, ${a}, 0, 1)`,r.fillRect(0,i>>0,e,o+1>>0),i+=o}t.baseTexture.update(),this.uniforms.displacementMap=t}set sizes(e){const t=Math.min(this._slices,e.length);for(let r=0;r<t;r++)this._sizes[r]=e[r]}get sizes(){return this._sizes}set offsets(e){const t=Math.min(this._slices,e.length);for(let r=0;r<t;r++)this._offsets[r]=e[r]}get offsets(){return this._offsets}get slices(){return this._slices}set slices(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())}get direction(){return this._direction}set direction(e){if(this._direction===e)return;this._direction=e;const r=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(r),this.uniforms.cosDir=Math.cos(r)}get red(){return this.uniforms.red}set red(e){this.uniforms.red=e}get green(){return this.uniforms.green}set green(e){this.uniforms.green=e}get blue(){return this.uniforms.blue}set blue(e){this.uniforms.blue=e}destroy(){var e;null==(e=this.texture)||e.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null}};let te=ee;te.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},te.TRANSPARENT=0,te.ORIGINAL=1,te.LOOP=2,te.CLAMP=3,te.MIRROR=4;var re="varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\nuniform float alpha;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    if (knockout) {\n      float resultAlpha = (outerGlowAlpha + innerGlowAlpha) * alpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      vec4 outerGlowColor = outerGlowStrength * glowColor.rgba * alpha;\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n";const ne=class extends t.Filter{constructor(e){const t=Object.assign({},ne.defaults,e),{outerStrength:r,innerStrength:n,color:i,knockout:o,quality:s,alpha:a}=t,l=Math.round(t.distance);super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",re.replace(/__ANGLE_STEP_SIZE__/gi,`${(1/s/l).toFixed(7)}`).replace(/__DIST__/gi,`${l.toFixed(0)}.0`)),this.uniforms.glowColor=new Float32Array([0,0,0,1]),this.uniforms.alpha=1,Object.assign(this,{color:i,outerStrength:r,innerStrength:n,padding:l,knockout:o,alpha:a})}get color(){return t.utils.rgb2hex(this.uniforms.glowColor)}set color(e){t.utils.hex2rgb(e,this.uniforms.glowColor)}get outerStrength(){return this.uniforms.outerStrength}set outerStrength(e){this.uniforms.outerStrength=e}get innerStrength(){return this.uniforms.innerStrength}set innerStrength(e){this.uniforms.innerStrength=e}get knockout(){return this.uniforms.knockout}set knockout(e){this.uniforms.knockout=e}get alpha(){return this.uniforms.alpha}set alpha(e){this.uniforms.alpha=e}};let ie=ne;ie.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1,alpha:1};var oe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n";const se=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",oe.replace("${perlin}","vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n")),this.parallel=!0,this.time=0,this._angle=0,this.uniforms.dimensions=new Float32Array(2);const r=Object.assign(se.defaults,e);this._angleLight=new t.Point,this.angle=r.angle,this.gain=r.gain,this.lacunarity=r.lacunarity,this.alpha=r.alpha,this.parallel=r.parallel,this.center=r.center,this.time=r.time}apply(e,t,r,n){const{width:i,height:o}=t.filterFrame;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=o,this.uniforms.aspect=o/i,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,r,n)}get angle(){return this._angle}set angle(e){this._angle=e;const r=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(r),this._angleLight.y=Math.sin(r)}get gain(){return this.uniforms.gain}set gain(e){this.uniforms.gain=e}get lacunarity(){return this.uniforms.lacunarity}set lacunarity(e){this.uniforms.lacunarity=e}get alpha(){return this.uniforms.alpha}set alpha(e){this.uniforms.alpha=e}};let ae=se;ae.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1};class le extends t.Filter{constructor(){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\n// https://en.wikipedia.org/wiki/Luma_(video)\nconst vec3 weight = vec3(0.299, 0.587, 0.114);\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(\n        vec3(color.r * weight.r + color.g * weight.g  + color.b * weight.b),\n        color.a\n    );\n}\n")}}const ue=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float uHue;\nuniform float uAlpha;\nuniform bool uColorize;\nuniform float uSaturation;\nuniform float uLightness;\n\n// https://en.wikipedia.org/wiki/Luma_(video)\nconst vec3 weight = vec3(0.299, 0.587, 0.114);\n\nfloat getWeightedAverage(vec3 rgb) {\n    return rgb.r * weight.r + rgb.g * weight.g + rgb.b * weight.b;\n}\n\n// https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=3195243#gistcomment-3195243\nconst vec3 k = vec3(0.57735, 0.57735, 0.57735);\n\nvec3 hueShift(vec3 color, float angle) {\n    float cosAngle = cos(angle);\n    return vec3(\n    color * cosAngle +\n    cross(k, color) * sin(angle) +\n    k * dot(k, color) * (1.0 - cosAngle)\n    );\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    vec4 result = color;\n\n    // colorize\n    if (uColorize) {\n        result.rgb = vec3(getWeightedAverage(result.rgb), 0., 0.);\n    }\n\n    // hue\n    result.rgb = hueShift(result.rgb, uHue);\n\n    // saturation\n    // https://github.com/evanw/glfx.js/blob/master/src/filters/adjust/huesaturation.js\n    float average = (result.r + result.g + result.b) / 3.0;\n\n    if (uSaturation > 0.) {\n        result.rgb += (average - result.rgb) * (1. - 1. / (1.001 - uSaturation));\n    } else {\n        result.rgb -= (average - result.rgb) * uSaturation;\n    }\n\n    // lightness\n    result.rgb = mix(result.rgb, vec3(ceil(uLightness)) * color.a, abs(uLightness));\n\n    // alpha\n    gl_FragColor = mix(color, result, uAlpha);\n}\n"),this._hue=0;const t=Object.assign({},ue.defaults,e);Object.assign(this,t)}get hue(){return this._hue}set hue(e){this._hue=e,this.uniforms.uHue=this._hue*(Math.PI/180)}get alpha(){return this.uniforms.uAlpha}set alpha(e){this.uniforms.uAlpha=e}get colorize(){return this.uniforms.uColorize}set colorize(e){this.uniforms.uColorize=e}get lightness(){return this.uniforms.uLightness}set lightness(e){this.uniforms.uLightness=e}get saturation(){return this.uniforms.uSaturation}set saturation(e){this.uniforms.uSaturation=e}};let ce=ue;ce.defaults={hue:0,saturation:0,lightness:0,colorize:!1,alpha:1};class fe extends t.Filter{constructor(e=[0,0],r=5,n=0){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n"),this.kernelSize=5,this.uniforms.uVelocity=new Float32Array(2),this._velocity=new t.ObservablePoint(this.velocityChanged,this),this.setVelocity(e),this.kernelSize=r,this.offset=n}apply(e,t,r,n){const{x:i,y:o}=this.velocity;this.uniforms.uKernelSize=0!==i||0!==o?this.kernelSize:0,e.applyFilter(this,t,r,n)}set velocity(e){this.setVelocity(e)}get velocity(){return this._velocity}setVelocity(e){if(Array.isArray(e)){const[t,r]=e;this._velocity.set(t,r)}else this._velocity.copyFrom(e)}velocityChanged(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=1+(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)}set offset(e){this.uniforms.uOffset=e}get offset(){return this.uniforms.uOffset}}var de="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n";class he extends t.Filter{constructor(e,t=.05,r=e.length){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",de.replace(/%maxColors%/g,r.toFixed(0))),this._replacements=[],this._maxColors=0,this.epsilon=t,this._maxColors=r,this.uniforms.originalColors=new Float32Array(3*r),this.uniforms.targetColors=new Float32Array(3*r),this.replacements=e}set replacements(e){const r=this.uniforms.originalColors,n=this.uniforms.targetColors,i=e.length;if(i>this._maxColors)throw new Error(`Length of replacements (${i}) exceeds the maximum colors length (${this._maxColors})`);r[3*i]=-1;for(let o=0;o<i;o++){const i=e[o];let s=i[0];"number"==typeof s?s=t.utils.hex2rgb(s):i[0]=t.utils.rgb2hex(s),r[3*o]=s[0],r[3*o+1]=s[1],r[3*o+2]=s[2];let a=i[1];"number"==typeof a?a=t.utils.hex2rgb(a):i[1]=t.utils.rgb2hex(a),n[3*o]=a[0],n[3*o+1]=a[1],n[3*o+2]=a[2]}this._replacements=e}get replacements(){return this._replacements}refresh(){this.replacements=this._replacements}get maxColors(){return this._maxColors}set epsilon(e){this.uniforms.epsilon=e}get epsilon(){return this.uniforms.epsilon}}const me=class extends t.Filter{constructor(e,t=0){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n"),this.seed=0,this.uniforms.dimensions=new Float32Array(2),"number"==typeof e?(this.seed=e,e=void 0):this.seed=t,Object.assign(this,me.defaults,e)}apply(e,t,r,n){var i,o;this.uniforms.dimensions[0]=null==(i=t.filterFrame)?void 0:i.width,this.uniforms.dimensions[1]=null==(o=t.filterFrame)?void 0:o.height,this.uniforms.seed=this.seed,e.applyFilter(this,t,r,n)}set sepia(e){this.uniforms.sepia=e}get sepia(){return this.uniforms.sepia}set noise(e){this.uniforms.noise=e}get noise(){return this.uniforms.noise}set noiseSize(e){this.uniforms.noiseSize=e}get noiseSize(){return this.uniforms.noiseSize}set scratch(e){this.uniforms.scratch=e}get scratch(){return this.uniforms.scratch}set scratchDensity(e){this.uniforms.scratchDensity=e}get scratchDensity(){return this.uniforms.scratchDensity}set scratchWidth(e){this.uniforms.scratchWidth=e}get scratchWidth(){return this.uniforms.scratchWidth}set vignetting(e){this.uniforms.vignetting=e}get vignetting(){return this.uniforms.vignetting}set vignettingAlpha(e){this.uniforms.vignettingAlpha=e}get vignettingAlpha(){return this.uniforms.vignettingAlpha}set vignettingBlur(e){this.uniforms.vignettingBlur=e}get vignettingBlur(){return this.uniforms.vignettingBlur}};let ge=me;ge.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3};var ve="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterClamp;\n\nuniform float uAlpha;\nuniform vec2 uThickness;\nuniform vec4 uColor;\nuniform bool uKnockout;\n\nconst float DOUBLE_PI = 2. * 3.14159265358979323846264;\nconst float ANGLE_STEP = ${angleStep};\n\nfloat outlineMaxAlphaAtPos(vec2 pos) {\n    if (uThickness.x == 0. || uThickness.y == 0.) {\n        return 0.;\n    }\n\n    vec4 displacedColor;\n    vec2 displacedPos;\n    float maxAlpha = 0.;\n\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ANGLE_STEP) {\n        displacedPos.x = vTextureCoord.x + uThickness.x * cos(angle);\n        displacedPos.y = vTextureCoord.y + uThickness.y * sin(angle);\n        displacedColor = texture2D(uSampler, clamp(displacedPos, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, displacedColor.a);\n    }\n\n    return maxAlpha;\n}\n\nvoid main(void) {\n    vec4 sourceColor = texture2D(uSampler, vTextureCoord);\n    vec4 contentColor = sourceColor * float(!uKnockout);\n    float outlineAlpha = uAlpha * outlineMaxAlphaAtPos(vTextureCoord.xy) * (1.-sourceColor.a);\n    vec4 outlineColor = vec4(vec3(uColor) * outlineAlpha, outlineAlpha);\n    gl_FragColor = contentColor + outlineColor;\n}\n";const pe=class extends t.Filter{constructor(e=1,t=0,r=.1,n=1,i=!1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",ve.replace(/\$\{angleStep\}/,pe.getAngleStep(r))),this._thickness=1,this._alpha=1,this._knockout=!1,this.uniforms.uThickness=new Float32Array([0,0]),this.uniforms.uColor=new Float32Array([0,0,0,1]),this.uniforms.uAlpha=n,this.uniforms.uKnockout=i,Object.assign(this,{thickness:e,color:t,quality:r,alpha:n,knockout:i})}static getAngleStep(e){const t=Math.max(e*pe.MAX_SAMPLES,pe.MIN_SAMPLES);return(2*Math.PI/t).toFixed(7)}apply(e,t,r,n){this.uniforms.uThickness[0]=this._thickness/t._frame.width,this.uniforms.uThickness[1]=this._thickness/t._frame.height,this.uniforms.uAlpha=this._alpha,this.uniforms.uKnockout=this._knockout,e.applyFilter(this,t,r,n)}get alpha(){return this._alpha}set alpha(e){this._alpha=e}get color(){return t.utils.rgb2hex(this.uniforms.uColor)}set color(e){t.utils.hex2rgb(e,this.uniforms.uColor)}get knockout(){return this._knockout}set knockout(e){this._knockout=e}get thickness(){return this._thickness}set thickness(e){this._thickness=e,this.padding=e}};let xe=pe;xe.MIN_SAMPLES=1,xe.MAX_SAMPLES=100;class ye extends t.Filter{constructor(e=10){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n"),this.size=e}get size(){return this.uniforms.size}set size(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e}}class Ce extends t.Filter{constructor(e=0,t=[0,0],r=5,n=-1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n"),this._angle=0,this.angle=e,this.center=t,this.kernelSize=r,this.radius=n}apply(e,t,r,n){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,t,r,n)}set angle(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180}get angle(){return this._angle}get center(){return this.uniforms.uCenter}set center(e){this.uniforms.uCenter=e}get radius(){return this.uniforms.uRadius}set radius(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e}}const _e=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n"),this.time=0,this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,_e.defaults,e)}apply(e,t,r,n){var i,o;this.uniforms.dimensions[0]=null==(i=t.filterFrame)?void 0:i.width,this.uniforms.dimensions[1]=null==(o=t.filterFrame)?void 0:o.height,this.uniforms.time=this.time,e.applyFilter(this,t,r,n)}set mirror(e){this.uniforms.mirror=e}get mirror(){return this.uniforms.mirror}set boundary(e){this.uniforms.boundary=e}get boundary(){return this.uniforms.boundary}set amplitude(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]}get amplitude(){return this.uniforms.amplitude}set waveLength(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]}get waveLength(){return this.uniforms.waveLength}set alpha(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]}get alpha(){return this.uniforms.alpha}};let be=_e;be.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0};class Se extends t.Filter{constructor(e=[-10,0],t=[0,10],r=[0,0]){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n"),this.red=e,this.green=t,this.blue=r}get red(){return this.uniforms.red}set red(e){this.uniforms.red=e}get green(){return this.uniforms.green}set green(e){this.uniforms.green=e}get blue(){return this.uniforms.blue}set blue(e){this.uniforms.blue=e}}const Te=class extends t.Filter{constructor(e=[0,0],t,r=0){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n"),this.center=e,Object.assign(this,Te.defaults,t),this.time=r}apply(e,t,r,n){this.uniforms.time=this.time,e.applyFilter(this,t,r,n)}get center(){return this.uniforms.center}set center(e){this.uniforms.center=e}get amplitude(){return this.uniforms.amplitude}set amplitude(e){this.uniforms.amplitude=e}get wavelength(){return this.uniforms.wavelength}set wavelength(e){this.uniforms.wavelength=e}get brightness(){return this.uniforms.brightness}set brightness(e){this.uniforms.brightness=e}get speed(){return this.uniforms.speed}set speed(e){this.uniforms.speed=e}get radius(){return this.uniforms.radius}set radius(e){this.uniforms.radius=e}};let Fe=Te;Fe.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1};class Ae extends t.Filter{constructor(e,t=0,r=1){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n"),this._color=0,this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,r]),this.texture=e,this.color=t}apply(e,t,r,n){var i,o;this.uniforms.dimensions[0]=null==(i=t.filterFrame)?void 0:i.width,this.uniforms.dimensions[1]=null==(o=t.filterFrame)?void 0:o.height,e.applyFilter(this,t,r,n)}get texture(){return this.uniforms.uLightmap}set texture(e){this.uniforms.uLightmap=e}set color(e){const r=this.uniforms.ambientColor;"number"==typeof e?(t.utils.hex2rgb(e,r),this._color=e):(r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],this._color=t.utils.rgb2hex(r))}get color(){return this._color}get alpha(){return this.uniforms.ambientColor[3]}set alpha(e){this.uniforms.ambientColor[3]=e}}class ze extends t.Filter{constructor(e){var r,n;super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n"),this.uniforms.blur=e.blur,this.uniforms.gradientBlur=e.gradientBlur,this.uniforms.start=null!=(r=e.start)?r:new t.Point(0,window.innerHeight/2),this.uniforms.end=null!=(n=e.end)?n:new t.Point(600,window.innerHeight/2),this.uniforms.delta=new t.Point(30,30),this.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),this.updateDelta()}updateDelta(){this.uniforms.delta.x=0,this.uniforms.delta.y=0}get blur(){return this.uniforms.blur}set blur(e){this.uniforms.blur=e}get gradientBlur(){return this.uniforms.gradientBlur}set gradientBlur(e){this.uniforms.gradientBlur=e}get start(){return this.uniforms.start}set start(e){this.uniforms.start=e,this.updateDelta()}get end(){return this.uniforms.end}set end(e){this.uniforms.end=e,this.updateDelta()}}class we extends ze{updateDelta(){const e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,r=Math.sqrt(e*e+t*t);this.uniforms.delta.x=e/r,this.uniforms.delta.y=t/r}}class Pe extends ze{updateDelta(){const e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,r=Math.sqrt(e*e+t*t);this.uniforms.delta.x=-t/r,this.uniforms.delta.y=e/r}}const Me=class extends t.Filter{constructor(e,r,n,i){super(),"number"==typeof e&&(t.utils.deprecation("5.3.0","TiltShiftFilter constructor arguments is deprecated, use options."),e={blur:e,gradientBlur:r,start:n,end:i}),e=Object.assign({},Me.defaults,e),this.tiltShiftXFilter=new we(e),this.tiltShiftYFilter=new Pe(e)}apply(e,t,r,n){const i=e.getFilterTexture();this.tiltShiftXFilter.apply(e,t,i,1),this.tiltShiftYFilter.apply(e,i,r,n),e.returnFilterTexture(i)}get blur(){return this.tiltShiftXFilter.blur}set blur(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e}get gradientBlur(){return this.tiltShiftXFilter.gradientBlur}set gradientBlur(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e}get start(){return this.tiltShiftXFilter.start}set start(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e}get end(){return this.tiltShiftXFilter.end}set end(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e}};let De=Me;De.defaults={blur:100,gradientBlur:600,start:void 0,end:void 0};const ke=class extends t.Filter{constructor(e){super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n"),Object.assign(this,ke.defaults,e)}get offset(){return this.uniforms.offset}set offset(e){this.uniforms.offset=e}get radius(){return this.uniforms.radius}set radius(e){this.uniforms.radius=e}get angle(){return this.uniforms.angle}set angle(e){this.uniforms.angle=e}};let Oe=ke;Oe.defaults={radius:200,angle:4,padding:20,offset:new t.Point};var Re="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Ee=Object.getOwnPropertySymbols,je=Object.prototype.hasOwnProperty,Ie=Object.prototype.propertyIsEnumerable;const Le=class extends t.Filter{constructor(e){const t=Object.assign(Le.defaults,e),{maxKernelSize:r}=t,n=((e,t)=>{var r={};for(var n in e)je.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&Ee)for(var n of Ee(e))t.indexOf(n)<0&&Ie.call(e,n)&&(r[n]=e[n]);return r})(t,["maxKernelSize"]);super("attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",Re.replace("${maxKernelSize}",r.toFixed(1))),Object.assign(this,n)}get center(){return this.uniforms.uCenter}set center(e){this.uniforms.uCenter=e}get strength(){return this.uniforms.uStrength}set strength(e){this.uniforms.uStrength=e}get innerRadius(){return this.uniforms.uInnerRadius}set innerRadius(e){this.uniforms.uInnerRadius=e}get radius(){return this.uniforms.uRadius}set radius(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e}};let Ve=Le;return Ve.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32},e.AdjustmentFilter=i,e.AdvancedBloomFilter=u,e.AsciiFilter=c,e.BevelFilter=f,e.BloomFilter=d,e.BulgePinchFilter=m,e.CRTFilter=X,e.ColorGradientFilter=j,e.ColorMapFilter=I,e.ColorOverlayFilter=L,e.ColorReplaceFilter=V,e.ConvolutionFilter=N,e.CrossHatchFilter=G,e.DotFilter=q,e.DropShadowFilter=Q,e.EmbossFilter=J,e.GlitchFilter=te,e.GlowFilter=ie,e.GodrayFilter=ae,e.GrayscaleFilter=le,e.HslAdjustmentFilter=ce,e.KawaseBlurFilter=o,e.MotionBlurFilter=fe,e.MultiColorReplaceFilter=he,e.OldFilmFilter=ge,e.OutlineFilter=xe,e.PixelateFilter=ye,e.RGBSplitFilter=Se,e.RadialBlurFilter=Ce,e.ReflectionFilter=be,e.ShockwaveFilter=Fe,e.SimpleLightmapFilter=Ae,e.TiltShiftAxisFilter=ze,e.TiltShiftFilter=De,e.TiltShiftXFilter=we,e.TiltShiftYFilter=Pe,e.TwistFilter=Oe,e.ZoomBlurFilter=Ve,Object.defineProperty(e,"__esModule",{value:!0}),e}({},PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=/sm/a81fbc95f2d06fc9441bd5eab12f497356ae9e2687efa16d4866f79acc7b17b0.map

var PP;
(function (PP) {
    let _loader;
    /**
        * Load plugin settings
    */
    function LoadPluginSettings() {
        _loader = new KDX.ParamLoader("PKD_MapEnhancer");
    }
    PP.LoadPluginSettings = LoadPluginSettings;
    /**
        * Get parameter from plugin settings
        * @param {string} paramName - Name of parameter
        * @param {any} defaultValue - Default value if not found
        * @returns {any} - Value of parameter
    */
    function getLoaderParam(paramName, defaultValue) {
        try {
            if (!_loader) {
                LoadPluginSettings();
            }
            return _loader.getParam(paramName, defaultValue);
        }
        catch (error) {
            console.warn(error);
            return null;
        }
    }
    function OpenEditorKey() {
        return getLoaderParam('openEditorKey', 'F10');
    }
    PP.OpenEditorKey = OpenEditorKey;
    function EditorHelpLanguageIndex() {
        return getLoaderParam('editorHelpLanguageIndex', 0);
    }
    PP.EditorHelpLanguageIndex = EditorHelpLanguageIndex;
    function EditorWindowSize() {
        return getLoaderParam('editorWindowSize', {
            width: 540,
            height: 800,
        });
    }
    PP.EditorWindowSize = EditorWindowSize;
    function HelpWindowSize() {
        return getLoaderParam('helpWindowSize', {
            width: 820,
            height: 240,
        });
    }
    PP.HelpWindowSize = HelpWindowSize;
})(PP || (PP = {}));




//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MVPatch.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    if (KDX.isMV()) {
        Graphics['resize'] = function (width, height) {
            this._width = width;
            this._height = height;
            this._updateRenderer();
            this._updateAllElements();
        };
    }
})();
// ■ END MVPatch.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    DataManager._databaseFiles.push(
    /*@ts-ignore*/
    { name: "$PKD_MapEnhancerDB", src: "PKD_MapEnhancer/MapObjectsDatabase.json" }, 
    /*@ts-ignore*/
    { name: "$PKD_MapEnhancerCollisionsDB", src: "PKD_MapEnhancer/CollisionsDatabase.json" }, 
    /*@ts-ignore*/
    { name: "$PKD_MapEnhancerLayersDB", src: "PKD_MapEnhancer/LayersDatabase.json" });
    /**
     * Register NUI file for load with Database
     * @param {string} filnename - NUI file name WITHOUT extension
     */
    function pkdRegisterLocalNUIFile(filnename) {
        KDNUI.RegisterNUIFile("PKD_MapEnhancer", filnename);
    }
    pkdRegisterLocalNUIFile("NUI_EditorWindow");
    pkdRegisterLocalNUIFile("NUI_DropDown");
    pkdRegisterLocalNUIFile("NUI_ListItem");
    pkdRegisterLocalNUIFile("NUI_EditorItemsList");
    pkdRegisterLocalNUIFile("NUI_EditorObjectsModeSection");
    pkdRegisterLocalNUIFile("NUI_EditorCollisionsModeSection");
    pkdRegisterLocalNUIFile("NUI_EditorLayersModeSection");
    pkdRegisterLocalNUIFile("NUI_MapUI");
    //@[ALIAS]
    const ALIAS__loadDataFile = DataManager.loadDataFile;
    DataManager.loadDataFile = function (name, src) {
        if (src.includes("PKD_MapEnhancer")) {
            src = src.replace("Test_", "");
        }
        ALIAS__loadDataFile.call(this, name, src);
    };
})();
// ■ END DataManager.ts
//---------------------------------------------------------------------------


var EMCollisionsManager;
(function (EMCollisionsManager) {
    let _collisionsCache = {};
    function GetAllStoredCollisions() {
        if (window["$PKD_MapEnhancerCollisionsDB"]) {
            return window["$PKD_MapEnhancerCollisionsDB"];
        }
        return [];
    }
    EMCollisionsManager.GetAllStoredCollisions = GetAllStoredCollisions;
    function GetStoredCollisionsDataForMap(mapId) {
        try {
            if (EMapEditorManager.IsActive()) {
                // * If we are in editor mode, we should always get from database
                _collisionsCache = {};
            }
            if (!_collisionsCache[mapId]) {
                let allCollisions = GetAllStoredCollisions();
                let collistionsForMap = allCollisions.filter((c) => c.mapId === mapId);
                _collisionsCache[mapId] = collistionsForMap;
            }
            return _collisionsCache[mapId];
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMCollisionsManager.GetStoredCollisionsDataForMap = GetStoredCollisionsDataForMap;
    function GetCollisionsUniqueIndexesForMap(mapId) {
        let allCollisions = GetCollisionsDataForMapOnlyWithVisibleLayers(mapId);
        let collisionPositions = allCollisions.map((c) => { return { x: c.position.x, y: c.position.y }; });
        let uniqueIndexes = [];
        for (let c in collisionPositions) {
            let i = collisionPositions[c];
            uniqueIndexes.push(GetUniqeIndexForPosition(i.x, i.y));
        }
        return uniqueIndexes;
    }
    EMCollisionsManager.GetCollisionsUniqueIndexesForMap = GetCollisionsUniqueIndexesForMap;
    function GetCollisionsDataForMapOnlyWithVisibleLayers(mapId) {
        let allCollisions = GetStoredCollisionsDataForMap(mapId);
        let visibleLayers = [];
        for (let collisionData of allCollisions) {
            if (!visibleLayers.includes(collisionData.layerIndex)) {
                if (EMLayersManager.IsLayerConditionTrue(collisionData.layerIndex, mapId, true)) {
                    visibleLayers.push(collisionData.layerIndex);
                }
            }
        }
        return allCollisions.filter((c) => visibleLayers.includes(c.layerIndex));
    }
    EMCollisionsManager.GetCollisionsDataForMapOnlyWithVisibleLayers = GetCollisionsDataForMapOnlyWithVisibleLayers;
    function GetStoredCollisionsPositionsForMap(mapId) {
        let allCollisions = GetStoredCollisionsDataForMap(mapId);
        return allCollisions.map((c) => c.position);
    }
    EMCollisionsManager.GetStoredCollisionsPositionsForMap = GetStoredCollisionsPositionsForMap;
    function IsMapHaveAnyCollision(mapId) {
        let allCollisions = GetStoredCollisionsDataForMap(mapId);
        return allCollisions.length > 0;
    }
    EMCollisionsManager.IsMapHaveAnyCollision = IsMapHaveAnyCollision;
    function GetUniqeIndexForPosition(x, y) {
        return x * $gameMap.width() * y + x;
    }
    EMCollisionsManager.GetUniqeIndexForPosition = GetUniqeIndexForPosition;
    function AddCollision(mapId, position, layerIndex) {
        try {
            let allCollisions = GetAllStoredCollisions();
            // * Check if already exists
            let index = allCollisions.findIndex((c) => c.mapId === mapId && c.position.x === position.x && c.position.y === position.y && c.layerIndex === layerIndex);
            if (index >= 0) {
                return;
            }
            allCollisions.push({ mapId: mapId, position: position, layerIndex: layerIndex });
            window["$PKD_MapEnhancerCollisionsDB"] = allCollisions;
        }
        catch (error) {
            console.warn(error);
        }
        try {
            WriteToFile();
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMCollisionsManager.AddCollision = AddCollision;
    function DeleteAllCollisionsForMap(mapId, layerIndex) {
        try {
            let allCollisions = GetAllStoredCollisions();
            let indexes = allCollisions.filter((c) => c.mapId === mapId && c.layerIndex === layerIndex);
            for (let i = 0; i < indexes.length; i++) {
                let index = allCollisions.indexOf(indexes[i]);
                allCollisions.splice(index, 1);
            }
            window["$PKD_MapEnhancerCollisionsDB"] = allCollisions;
            try {
                WriteToFile();
            }
            catch (error) {
                console.warn(error);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMCollisionsManager.DeleteAllCollisionsForMap = DeleteAllCollisionsForMap;
    function DeleteCollision(mapId, position, layerIndex) {
        try {
            let allCollisions = GetAllStoredCollisions();
            let index = allCollisions.findIndex((c) => c.mapId === mapId && c.position.x === position.x && c.position.y === position.y && c.layerIndex === layerIndex);
            if (index >= 0) {
                allCollisions.splice(index, 1);
                window["$PKD_MapEnhancerCollisionsDB"] = allCollisions;
                try {
                    WriteToFile();
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMCollisionsManager.DeleteCollision = DeleteCollision;
    function WriteToFile() {
        try {
            if (Utils.isNwjs()) {
                /*@ts-ignore*/
                let fs = require('fs');
                /*@ts-ignore*/
                const path = require('path');
                /*@ts-ignore*/
                const root = path.join(process.cwd(), 'data/PKD_MapEnhancer');
                const filename = path.join(root, "CollisionsDatabase.json");
                fs.writeFileSync(filename, JSON.stringify(window['$PKD_MapEnhancerCollisionsDB']));
            }
            else {
                console.warn("EMCollisionsManager: WriteToFile: Not implemented for web");
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    window['EMCollisionsManager'] = EMCollisionsManager;
})(EMCollisionsManager || (EMCollisionsManager = {}));


var EMLayersManager;
(function (EMLayersManager) {
    let _layersCache = {};
    let _layersConditionsCachePerMap = {};
    // * Conditions results cache for current Map ID
    let _layersConditionsResultsCache = {};
    function OnNewMapLoaded() {
        _layersConditionsResultsCache = {};
    }
    EMLayersManager.OnNewMapLoaded = OnNewMapLoaded;
    function GetAllStoredLayers() {
        if (window["$PKD_MapEnhancerLayersDB"]) {
            return window["$PKD_MapEnhancerLayersDB"];
        }
        return [];
    }
    EMLayersManager.GetAllStoredLayers = GetAllStoredLayers;
    function GetStoredLayersDataForMap(mapId) {
        try {
            if (EMapEditorManager.IsActive()) {
                // * If we are in editor mode, we should always get from database
                _layersCache = {};
            }
            if (!_layersCache[mapId]) {
                let allLayers = GetAllStoredLayers();
                let layersForMap = allLayers.filter((c) => c.mapId === mapId);
                _layersCache[mapId] = layersForMap;
            }
            return _layersCache[mapId];
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMLayersManager.GetStoredLayersDataForMap = GetStoredLayersDataForMap;
    function IsMapHaveAnyLayerCondition(mapId) {
        if (!mapId) {
            mapId = $gameMap.mapId();
        }
        let allLayers = GetStoredLayersDataForMap(mapId);
        return allLayers.length > 0;
    }
    EMLayersManager.IsMapHaveAnyLayerCondition = IsMapHaveAnyLayerCondition;
    function IsLayerConditionTrue(layerIndex, mapId, isForceCheck) {
        try {
            if (!mapId) {
                mapId = $gameMap.mapId();
            }
            if (!IsMapHaveAnyLayerCondition(mapId)) {
                return true;
            }
            if (isForceCheck == true) {
                _layersConditionsResultsCache[layerIndex] = null;
            }
            return getLayerConditionResult(layerIndex, mapId);
        }
        catch (error) {
            console.warn(error);
        }
        return true;
    }
    EMLayersManager.IsLayerConditionTrue = IsLayerConditionTrue;
    function getLayerConditionResult(layerIndex, mapId) {
        try {
            if (EMapEditorManager.IsActive()) {
                // * If we are in editor mode, we should always get from database
                _layersConditionsResultsCache = {};
                return true;
            }
            if (_layersConditionsResultsCache[layerIndex] == null || _layersConditionsResultsCache[layerIndex] == undefined) {
                _layersConditionsResultsCache[layerIndex] = getLayerConditionStatus(layerIndex, mapId);
                setTimeout(() => {
                    _layersConditionsResultsCache[layerIndex] = null;
                    delete _layersConditionsResultsCache[layerIndex];
                }, 1000);
            }
            return _layersConditionsResultsCache[layerIndex];
        }
        catch (error) {
            console.warn(error);
        }
        return true;
    }
    function getLayerConditionStatus(layerIndex, mapId) {
        try {
            let layerCondition = getLayerConditionText(layerIndex, mapId);
            if (!KString.any(layerCondition)) {
                return true;
            }
            return eval(layerCondition);
        }
        catch (error) {
            console.warn(error);
        }
        return true;
    }
    function getLayerConditionText(layerIndex, mapId) {
        try {
            if (EMapEditorManager.IsActive()) {
                // * If we are in editor mode, we should always get from database
                _layersConditionsCachePerMap[mapId] = {};
            }
            if (!_layersConditionsCachePerMap[mapId]) {
                _layersConditionsCachePerMap[mapId] = {};
            }
            if (!_layersConditionsCachePerMap[mapId][layerIndex]) {
                let allLayers = GetStoredLayersDataForMap(mapId);
                let layer = allLayers.find((c) => c.layerIndex === layerIndex);
                if (layer) {
                    _layersConditionsCachePerMap[mapId][layerIndex] = layer.condition;
                }
                else {
                    return "";
                }
            }
            return _layersConditionsCachePerMap[mapId][layerIndex];
        }
        catch (error) {
            console.warn(error);
        }
        return "";
    }
    function ModifyLayerCondition(layerIndex, mapId, condition) {
        try {
            let allLayers = GetAllStoredLayers();
            let layer = allLayers.find((c) => c.layerIndex === layerIndex && c.mapId === mapId);
            if (layer) {
                layer.condition = condition;
            }
            else {
                allLayers.push({
                    mapId: mapId,
                    layerIndex: layerIndex,
                    condition: condition
                });
            }
            allLayers = clearLayersWithEmptyCondition(allLayers);
            window["$PKD_MapEnhancerLayersDB"] = allLayers;
        }
        catch (error) {
            console.warn(error);
        }
        try {
            WriteToFile();
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMLayersManager.ModifyLayerCondition = ModifyLayerCondition;
    function clearLayersWithEmptyCondition(layers) {
        return layers.filter((c) => KString.any(c.condition));
    }
    function Refresh() {
        _layersConditionsResultsCache = {};
    }
    EMLayersManager.Refresh = Refresh;
    function WriteToFile() {
        try {
            if (Utils.isNwjs()) {
                /*@ts-ignore*/
                let fs = require('fs');
                /*@ts-ignore*/
                const path = require('path');
                /*@ts-ignore*/
                const root = path.join(process.cwd(), 'data/PKD_MapEnhancer');
                const filename = path.join(root, "LayersDatabase.json");
                fs.writeFileSync(filename, JSON.stringify(window['$PKD_MapEnhancerLayersDB']));
            }
            else {
                console.warn("EMLayersManager: WriteToFile: Not implemented for web");
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    function GetLayerInfo(layerIndex) {
        try {
            let mapId = $gameMap.mapId();
            let allLayers = GetAllStoredLayers();
            let layer = allLayers.find((c) => c.layerIndex === layerIndex && c.mapId === mapId);
            let collisions = EMCollisionsManager.GetStoredCollisionsDataForMap(mapId);
            collisions = collisions.filter((c) => c.layerIndex === layerIndex);
            let objects = EMObjectsManager.GetAllConfigsForMap(mapId);
            objects = objects.filter((c) => c.layerIndex === layerIndex);
            let conditionText = '';
            if (layer) {
                conditionText = layer.condition;
            }
            return {
                layerIndex: layerIndex,
                objectsCount: objects.length,
                collidersCount: collisions.length,
                regionsCount: 0,
                condition: conditionText
            };
        }
        catch (error) {
            console.warn(error);
        }
        return {
            layerIndex: layerIndex,
            objectsCount: 0,
            collidersCount: 0,
            regionsCount: 0,
            condition: ""
        };
    }
    EMLayersManager.GetLayerInfo = GetLayerInfo;
    window['EMLayersManager'] = EMLayersManager;
})(EMLayersManager || (EMLayersManager = {}));


var EMObjectsManager;
(function (EMObjectsManager) {
    function IsSpritesAreLoaded() {
        try {
            console.log("EMObjectsManager: IsSpritesAreLoaded");
            let allSprites = GetAllSprites();
            let isLoaded = allSprites.every((sprite) => {
                return sprite.isLoaded();
            });
            return isLoaded;
        }
        catch (error) {
            console.warn(error);
        }
        return true;
    }
    EMObjectsManager.IsSpritesAreLoaded = IsSpritesAreLoaded;
    function GetAllStoredConfigs() {
        if (window['$PKD_MapEnhancerDB']) {
            return window['$PKD_MapEnhancerDB'];
        }
        return [];
    }
    EMObjectsManager.GetAllStoredConfigs = GetAllStoredConfigs;
    function AddStoredConfig(config) {
        try {
            let configs = GetAllStoredConfigs();
            //if we have already config with same uniqueId, we should only replace values
            let configWithSameUniqueId = configs.find((c) => c.uniqueId === config.uniqueId);
            if (configWithSameUniqueId) {
                let index = configs.indexOf(configWithSameUniqueId);
                configs[index] = config;
            }
            else {
                configs.push(config);
            }
            window['$PKD_MapEnhancerDB'] = configs;
            try {
                WriteStoredConfigsToFile();
            }
            catch (error) {
                console.warn(error);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.AddStoredConfig = AddStoredConfig;
    function WriteStoredConfigsToFile() {
        try {
            if (Utils.isNwjs()) {
                /*@ts-ignore*/
                let fs = require('fs');
                /*@ts-ignore*/
                const path = require('path');
                /*@ts-ignore*/
                const root = path.join(process.cwd(), 'data/PKD_MapEnhancer');
                const filename = path.join(root, "MapObjectsDatabase.json");
                fs.writeFileSync(filename, JSON.stringify(window['$PKD_MapEnhancerDB']));
            }
            else {
                console.warn("EMObjectsManager: WriteStoredConfigsToFile: Not implemented for web");
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    function DeleteStoredConfig(uniqueId, isWriteToFile) {
        try {
            let configs = GetAllStoredConfigs();
            let configWithSameUniqueId = configs.find((c) => c.uniqueId === uniqueId);
            if (configWithSameUniqueId) {
                let index = configs.indexOf(configWithSameUniqueId);
                configs.splice(index, 1);
                window['$PKD_MapEnhancerDB'] = configs;
                try {
                    if (isWriteToFile) {
                        WriteStoredConfigsToFile();
                    }
                }
                catch (error) {
                    console.warn(error);
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.DeleteStoredConfig = DeleteStoredConfig;
    function RemoveAllObjectsForLayer(layerIndex) {
        try {
            let configsToDelete = GetAllStoredConfigs().filter((config) => {
                return config.layerIndex === layerIndex;
            });
            let sprites = GetAllSprites();
            sprites.forEach((sprite) => {
                if (sprite.getLayerIndex() === layerIndex) {
                    sprite.removeFromParent();
                }
            });
            DeleteStoredConfigs(configsToDelete.map((config) => config.uniqueId));
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.RemoveAllObjectsForLayer = RemoveAllObjectsForLayer;
    function DeleteStoredConfigs(uniqueIds) {
        try {
            for (let i = 0; i < uniqueIds.length; i++) {
                DeleteStoredConfig(uniqueIds[i], false);
            }
            WriteStoredConfigsToFile();
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.DeleteStoredConfigs = DeleteStoredConfigs;
    function GetAllInGameConfigs() {
        try {
            /*@ts-ignore*/
            return $gameSystem.pkdMEGetConfigs();
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMObjectsManager.GetAllInGameConfigs = GetAllInGameConfigs;
    function SaveInGameConfig(config) {
        try {
            let configs = GetAllInGameConfigs();
            //if we have already config with same uniqueId, we should only replace values
            let configWithSameUniqueId = configs.find((c) => c.uniqueId === config.uniqueId);
            if (configWithSameUniqueId) {
                let index = configs.indexOf(configWithSameUniqueId);
                configs[index] = config;
            }
            else {
                configs.push(config);
            }
            /*@ts-ignore*/
            $gameSystem.pkdMESetConfigs(configs);
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.SaveInGameConfig = SaveInGameConfig;
    function DeleteInGameConfig(uniqueId) {
        try {
            let configs = GetAllInGameConfigs();
            let configWithSameUniqueId = configs.find((c) => c.uniqueId === uniqueId);
            if (configWithSameUniqueId) {
                let index = configs.indexOf(configWithSameUniqueId);
                configs.splice(index, 1);
                /*@ts-ignore*/
                $gameSystem.pkdMESetConfigs(configs);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMObjectsManager.DeleteInGameConfig = DeleteInGameConfig;
    function GetAllConfigsForMap(mapId = 0) {
        try {
            let allConfigs = GetAllInGameConfigs().concat(GetAllStoredConfigs());
            return allConfigs = allConfigs.filter((config) => {
                return config.mapId === mapId;
            });
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMObjectsManager.GetAllConfigsForMap = GetAllConfigsForMap;
    function GetAllSprites() {
        try {
            /*@ts-ignore*/
            let sprites = SceneManager._scene._spriteset._tilemap.children.filter((child) => {
                return child instanceof Sprite_EMObject;
            });
            return sprites;
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMObjectsManager.GetAllSprites = GetAllSprites;
    function CreateSpritesForMap(tilemap) {
        console.log("EMObjectsManager: CreateSpritesForMap");
        let configs = GetAllConfigsForMap($gameMap.mapId());
        configs.forEach((config) => {
            let sprite = Sprite_EMObject.FromConfig(config);
            tilemap.addChild(sprite);
        });
    }
    EMObjectsManager.CreateSpritesForMap = CreateSpritesForMap;
    function GetAllPlacedObjectsOnLayer(layerIndex) {
        try {
            let sprites = GetAllSprites();
            return sprites.filter((sprite) => {
                return !sprite.isInEditMode() && sprite.getLayerIndex() === layerIndex;
            });
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMObjectsManager.GetAllPlacedObjectsOnLayer = GetAllPlacedObjectsOnLayer;
    function GetAllObjectsExpectLayer(layerIndex) {
        try {
            let sprites = GetAllSprites();
            return sprites.filter((sprite) => {
                return !sprite.isInEditMode() && sprite.getLayerIndex() != layerIndex;
            });
        }
        catch (error) {
            console.warn(error);
        }
        return [];
    }
    EMObjectsManager.GetAllObjectsExpectLayer = GetAllObjectsExpectLayer;
    window['EMObjectsManager'] = EMObjectsManager;
})(EMObjectsManager || (EMObjectsManager = {}));


//TODO: from JSON? or Parameter?
const ToolsKeys = {
    grid: 'g',
    scale: 's',
    rotation: 'r',
    zIndex: 'shift',
    layerIndex: 'e',
    flip: 'f',
    resetCursor: 'c',
    xAxis: 'cancel',
    yAsix: 'y',
    globalRotation: 'shift',
    highlightLayer: 'h',
    focusLayer: 't',
    blendMode: 'b',
    hue: 'u',
    clone: 'shift',
    showCollisions: 'c',
    animationSpeed: 'a',
    opacity: 'o'
};


//$[ENCODE]
var EMWindowsManager;
(function (EMWindowsManager) {
    let _editorWindow = null;
    let _helpWindow = null;
    function IsEditorAvailable() {
        return !_editorWindow && Utils.isNwjs() && Utils.isOptionValid('test') && !IsEnhancerEditorWindow() && !IsHelpWindow();
    }
    EMWindowsManager.IsEditorAvailable = IsEditorAvailable;
    function IsEditorStarted() {
        return !!_editorWindow;
    }
    EMWindowsManager.IsEditorStarted = IsEditorStarted;
    function IsEnhancerEditorWindow() {
        return !_editorWindow && (window['isEnhancerEditorWindow']);
    }
    EMWindowsManager.IsEnhancerEditorWindow = IsEnhancerEditorWindow;
    function IsHelpWindow() {
        return !_helpWindow && (window['isHelpWindow']);
    }
    EMWindowsManager.IsHelpWindow = IsHelpWindow;
    function OpenEditorWindow() {
        if (IsEditorStarted()) {
            _editorWindow.restore();
            _helpWindow === null || _helpWindow === void 0 ? void 0 : _helpWindow.restore();
            return;
        }
        if (!IsEditorAvailable()) {
            console.error("Editor is not available");
            alert("Editor is available only in Playtest mode");
            return;
        }
        console.log("Open Editor Window");
        _createWindow();
    }
    EMWindowsManager.OpenEditorWindow = OpenEditorWindow;
    function CloseAllWindows() {
        try {
            if (_editorWindow) {
                _editorWindow.minimize();
            }
            if (_helpWindow) {
                _helpWindow.minimize();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    EMWindowsManager.CloseAllWindows = CloseAllWindows;
    function OnCommandFromEditor(command, data) {
        console.log("Command from Editor: ", command, data);
        switch (command) {
            case 'test':
                console.log("Test command from Editor");
                break;
            case 'focus':
                nw.Window.get().focus();
                console.log("Focus command from Editor");
                break;
            case 'selectObject':
                let { imageName, folderName } = data;
                EMapEditorManager.SelectObjectFromEditor(imageName, folderName);
                break;
            case 'layerConditionChange':
                let { layerIndex, condition } = data;
                EMLayersManager.ModifyLayerCondition(layerIndex, $gameMap.mapId(), condition);
                break;
            case 'removeAllObjectsForLayer':
                EMObjectsManager.RemoveAllObjectsForLayer(data); // data is layerIndex
                EMWindowsManager.SendCommandToEditor('layerInfo', EMLayersManager.GetLayerInfo(data));
            case 'removeAllCollidersForLayer':
                EMCollisionsManager.DeleteAllCollisionsForMap($gameMap.mapId(), EMapEditorManager.CurrentLayerIndex()); // data is layerIndex
                Sprite_CollisionGrid.RefreshGrid();
            default:
                console.error("Unknown command from Editor: ", command);
                break;
        }
    }
    EMWindowsManager.OnCommandFromEditor = OnCommandFromEditor;
    function SendCommandToEditor(command, data) {
        var _a, _b;
        if (!_editorWindow) {
            console.error("Editor window is not set");
            return;
        }
        console.log("Command to Editor: ", command, data);
        (_a = _editorWindow.window['EM_EditorWindowHandler']) === null || _a === void 0 ? void 0 : _a.OnCommandFromGame(command, data);
        (_b = _helpWindow === null || _helpWindow === void 0 ? void 0 : _helpWindow.window['EM_HelpWindowHandler']) === null || _b === void 0 ? void 0 : _b.OnCommandFromGame(command, data);
    }
    EMWindowsManager.SendCommandToEditor = SendCommandToEditor;
    function _createWindow() {
        _createEnhancerEditorWindow();
    }
    function _createEnhancerEditorWindow() {
        let size = PP.EditorWindowSize();
        nw.Window.open('index.html', {
            width: size.width,
            height: size.height,
            resizable: true,
            show_in_taskbar: true,
            new_instance: false
        }, function (new_win) {
            _editorWindow = new_win;
            _editorWindow.closeDevTools();
            new_win.on('loaded', _onEditorWindowLoaded);
        });
    }
    function _onEditorWindowLoaded() {
        console.log('Editor window loaded');
        window.moveBy(-PP.EditorWindowSize().width / 2, 0);
        _editorWindow.moveTo(window.screenX + window.outerWidth + 8, window.screenY - PP.HelpWindowSize().height / 2);
        _editorWindow.window['isEnhancerEditorWindow'] = true;
        _editorWindow.window.EM_EditorWindowHandler.Init(window);
        _createHelpWindow();
    }
    function _createHelpWindow() {
        let size = PP.HelpWindowSize();
        nw.Window.open('index.html', {
            width: size.width,
            height: size.height,
            resizable: true,
            show_in_taskbar: true,
            new_instance: false
        }, function (new_win) {
            _helpWindow = new_win;
            _helpWindow.closeDevTools();
            new_win.on('loaded', _onHelpWindowLoaded);
        });
    }
    function _onHelpWindowLoaded() {
        console.log('Help window loaded');
        window.moveBy(0, -PP.HelpWindowSize().height / 2);
        _helpWindow.moveTo(window.screenX, window.screenY + window.outerHeight + 2);
        _helpWindow.window['isHelpWindow'] = true;
        _helpWindow.window.EM_HelpWindowHandler.Init(window);
        _setOnCloseListeners();
    }
    function _setOnCloseListeners() {
        // * When we close main window, Editor and Help windows should be closed too
        window.onbeforeunload = () => {
            if (_editorWindow) {
                _editorWindow.close();
            }
            if (_helpWindow) {
                _helpWindow.close();
            }
        };
        if (KDX.isMV()) {
            let win = nw.Window.get();
            win.on('close', () => {
                if (_editorWindow) {
                    _editorWindow.close();
                }
                if (_helpWindow) {
                    _helpWindow.close();
                }
                win.close(true);
            });
        }
    }
    window['EMWindowsManager'] = EMWindowsManager;
})(EMWindowsManager || (EMWindowsManager = {}));


//$[ENCODE]
var EMapEditorManager;
(function (EMapEditorManager) {
    let _isObjectCanBeChanged = true;
    const _cameraMoveSpeed = 0.1;
    let _isActive = false;
    let _currentMode = "none";
    let _startX = null;
    let _startY = null;
    let _prevMouseX = 0;
    let _prevMouseY = 0;
    let _currentLayerIndex = 0;
    let _currentObjectForPlacementSprite = null;
    let _currentObjectForPlacementSpriteForEdit = null;
    let _currentObjectForPlacementFolder = null;
    let _currentObjectForPlacementImageName = null;
    let _hoveredByCursorObject = null;
    let _clickedForDeleteObject = null;
    // * When true, other layers shoul be be transparent
    let _curretLayerIsFocused = false;
    let _currentLayerIsHighlighted = false;
    function CurrentLayerIndex() {
        return _currentLayerIndex;
    }
    EMapEditorManager.CurrentLayerIndex = CurrentLayerIndex;
    function IsActive() {
        return _isActive;
    }
    EMapEditorManager.IsActive = IsActive;
    function IsNoneMode() {
        return IsActive() && _currentMode == "none";
    }
    EMapEditorManager.IsNoneMode = IsNoneMode;
    function IsObjectMode() {
        return IsActive() && _currentMode == "object";
    }
    EMapEditorManager.IsObjectMode = IsObjectMode;
    function IsCollisionsMode() {
        return IsActive() && _currentMode == "collisions";
    }
    EMapEditorManager.IsCollisionsMode = IsCollisionsMode;
    function IsLayersMode() {
        return IsActive() && _currentMode == "layers";
    }
    EMapEditorManager.IsLayersMode = IsLayersMode;
    function Activate() {
        if (IsActive()) {
            return;
        }
        if (!(SceneManager._scene instanceof Scene_Map)) {
            console.warn("Editor can be activated only on Scene_Map");
            return;
        }
        console.log("Activate editor");
        $gamePlayer.setTransparent(true);
        if (EMWindowsManager.IsEditorStarted()) {
            EMWindowsManager.OpenEditorWindow();
        }
        else if (EMWindowsManager.IsEditorAvailable()) {
            EMWindowsManager.OpenEditorWindow();
        }
        _currentMode = "none";
        _isActive = true;
        Sprite_EMEditorMapUI.Create();
        console.log("Editor activated, current mode: " + _currentMode);
    }
    EMapEditorManager.Activate = Activate;
    function Deactivate() {
        if (!IsActive()) {
            return;
        }
        console.log("Deactivate editor");
        $gamePlayer.setTransparent(false);
        _switchModeTo('none');
        _isActive = false;
        Sprite_EMEditorMapUI.Destroy();
        if (_currentObjectForPlacementSprite) {
            _currentObjectForPlacementSprite.removeFromParent();
            _currentObjectForPlacementSprite = null;
        }
        EMWindowsManager.CloseAllWindows();
        // * We should update collisions indexes
        $gameMap.requestRefresh();
        $gamePlayer.center($gamePlayer.x, $gamePlayer.y);
        console.log("Editor deactivated");
    }
    EMapEditorManager.Deactivate = Deactivate;
    function SelectObjectFromEditor(imageName, folderName) {
        if (!IsActive()) {
            return;
        }
        if (_currentObjectForPlacementFolder == folderName && _currentObjectForPlacementImageName == imageName) {
            return;
        }
        SetObjectForPlacement(folderName, imageName);
    }
    EMapEditorManager.SelectObjectFromEditor = SelectObjectFromEditor;
    function SetObjectForPlacement(folderName, imageName) {
        if (!IsActive()) {
            return;
        }
        _currentObjectForPlacementFolder = folderName;
        _currentObjectForPlacementImageName = imageName;
        let newObjectSprite = Sprite_EMObject.New(imageName, folderName);
        if (_currentObjectForPlacementSprite) {
            newObjectSprite.copyParametersFrom(_currentObjectForPlacementSprite);
            if (_currentObjectForPlacementSprite.isInEditMode()) {
                _currentObjectForPlacementSprite.removeFromParent();
            }
        }
        _currentObjectForPlacementSprite = newObjectSprite;
        _currentObjectForPlacementSprite.setLayer(_currentLayerIndex);
        _currentObjectForPlacementSprite.addToTilemap();
        _currentObjectForPlacementSprite.edit();
        if (!IsObjectMode()) {
            _switchModeTo("object");
        }
    }
    EMapEditorManager.SetObjectForPlacement = SetObjectForPlacement;
    function EditObject(object) {
        if (!IsActive()) {
            return;
        }
        _currentObjectForPlacementFolder = object.getConfig().folderName;
        _currentObjectForPlacementImageName = object.getConfig().imageName;
        _currentObjectForPlacementSprite = object;
        _currentObjectForPlacementSprite.edit();
        _currentObjectForPlacementSpriteForEdit = object;
        if (!IsObjectMode()) {
            _switchModeTo("object");
        }
    }
    function CloneObject(object) {
        if (!IsActive()) {
            return;
        }
        if (!object) {
            return;
        }
        _currentObjectForPlacementSprite = object;
        _currentObjectForPlacementFolder = object.getConfig().folderName;
        _currentObjectForPlacementImageName = object.getConfig().imageName;
        SetObjectForPlacement(_currentObjectForPlacementFolder, _currentObjectForPlacementImageName);
    }
    function DeleteObject(object) {
        if (!IsActive()) {
            return;
        }
        if (!object) {
            return;
        }
        object.removeFromParent();
        EMObjectsManager.DeleteStoredConfig(object.getConfig().uniqueId, true);
    }
    function CancelObjectPlacement() {
        if (!IsActive()) {
            return;
        }
        // * Return object to its original state (if it was in edit mode)
        if (_currentObjectForPlacementSpriteForEdit) {
            try {
                let config = _currentObjectForPlacementSpriteForEdit.getConfig();
                let sprite = Sprite_EMObject.FromConfig(config);
                /*@ts-ignore*/
                let tilemap = SceneManager._scene._spriteset._tilemap;
                tilemap.addChild(sprite);
            }
            catch (error) {
                console.warn(error);
            }
            _currentObjectForPlacementSpriteForEdit = null;
        }
        if (_currentObjectForPlacementSprite) {
            _currentObjectForPlacementSprite.removeFromParent();
            _currentObjectForPlacementSprite = null;
        }
        _currentObjectForPlacementImageName = "";
        _currentObjectForPlacementFolder = "";
        _switchModeTo("none");
    }
    EMapEditorManager.CancelObjectPlacement = CancelObjectPlacement;
    function RefreshObjectChange(value) {
        if (!IsObjectMode()) {
            return;
        }
        if (value == 0) {
            return;
        }
        ;
        if (_isObjectCanBeChanged == false) {
            return;
        }
        let currentIndex = EditorResourcesManager.GetImageIndex(_currentObjectForPlacementFolder, _currentObjectForPlacementImageName);
        let newIndex = currentIndex + value;
        let newImageName = EditorResourcesManager.GetImageName(_currentObjectForPlacementFolder, newIndex);
        if (KString.any(newImageName)) {
            SetObjectForPlacement(_currentObjectForPlacementFolder, newImageName);
            _isObjectCanBeChanged = false;
            EMWindowsManager.SendCommandToEditor('changeObject', newIndex);
            setTimeout(() => {
                _isObjectCanBeChanged = true;
            }, 1);
        }
    }
    EMapEditorManager.RefreshObjectChange = RefreshObjectChange;
    function OnCurrentObjectPlaced() {
        if (!IsActive()) {
            return;
        }
        if (_currentObjectForPlacementSprite) {
            _currentObjectForPlacementSpriteForEdit = null;
            _currentObjectForPlacementSprite.finalize();
            EMObjectsManager.AddStoredConfig(_currentObjectForPlacementSprite.getConfig());
            SetObjectForPlacement(_currentObjectForPlacementFolder, _currentObjectForPlacementImageName);
        }
    }
    EMapEditorManager.OnCurrentObjectPlaced = OnCurrentObjectPlaced;
    function _autoHighlightObjectsForCurrentLayer() {
        if (!IsActive()) {
            return;
        }
        let objects = EMObjectsManager.GetAllPlacedObjectsOnLayer(_currentLayerIndex);
        Sprite_EMEditorMapUI.HighlightObjects(objects, true);
        _currentLayerIsHighlighted = false;
    }
    function HighlightObjectsForCurrentLayer() {
        if (!IsActive()) {
            return;
        }
        if (_currentLayerIsHighlighted) {
            Sprite_EMEditorMapUI.ClearHighlight();
            _currentLayerIsHighlighted = false;
            Sprite_CollisionGrid.SetHighlightCurrentLayer(false);
        }
        else {
            let objects = EMObjectsManager.GetAllPlacedObjectsOnLayer(_currentLayerIndex);
            Sprite_EMEditorMapUI.HighlightObjects(objects, false);
            _currentLayerIsHighlighted = true;
            Sprite_CollisionGrid.SetHighlightCurrentLayer(true);
        }
    }
    EMapEditorManager.HighlightObjectsForCurrentLayer = HighlightObjectsForCurrentLayer;
    function FocusCurrentLayer() {
        if (!IsActive()) {
            return;
        }
        if (_curretLayerIsFocused) {
            _clearTransparency();
            Sprite_CollisionGrid.SetFocusCurrentLayer(false);
        }
        else {
            let objects = EMObjectsManager.GetAllObjectsExpectLayer(_currentLayerIndex);
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i];
                object.makeTransparent();
            }
            Sprite_CollisionGrid.SetFocusCurrentLayer(true);
            _curretLayerIsFocused = true;
        }
    }
    EMapEditorManager.FocusCurrentLayer = FocusCurrentLayer;
    function _clearTransparency() {
        if (_curretLayerIsFocused) {
            let objects = EMObjectsManager.GetAllObjectsExpectLayer(_currentLayerIndex);
            for (let i = 0; i < objects.length; i++) {
                let object = objects[i];
                object.resetTransparency();
            }
            _curretLayerIsFocused = false;
        }
    }
    function ChangeLayer(value) {
        if (!IsActive()) {
            return;
        }
        if (value == 0) {
            return;
        }
        _clearTransparency();
        _currentLayerIndex += value;
        if (_currentLayerIndex < 0) {
            _currentLayerIndex = 0;
        }
        _onLayerChanged();
    }
    EMapEditorManager.ChangeLayer = ChangeLayer;
    function _switchModeTo(mode) {
        _clearTransparency();
        if (IsCollisionsMode()) {
            _clearCollisionGrids();
        }
        Sprite_EMEditorMapUI.ClearHighlight();
        _currentMode = mode;
        console.log("Switch mode to: " + mode);
        EMWindowsManager.SendCommandToEditor('switchMode', mode);
        if (IsCollisionsMode()) {
            _initCollisionsMode();
        }
        if (IsLayersMode()) {
            EMWindowsManager.SendCommandToEditor('layerInfo', EMLayersManager.GetLayerInfo(_currentLayerIndex));
        }
    }
    function _clearCollisionGrids() {
        try {
            Sprite_CollisionGrid.RemoveGrid();
            Sprite_MapGrid.RemoveGrid();
            Sprite_DefaultCollisionsGrid.RemoveGrid();
            Sprite_MapGridCursor.Remove();
        }
        catch (error) {
            console.warn(error);
        }
    }
    function _initCollisionsMode() {
        Sprite_MapGrid.CreateGrid();
        Sprite_DefaultCollisionsGrid.CreateGrid();
        Sprite_CollisionGrid.CreateGrid();
        Sprite_MapGridCursor.CreateGridCursor();
    }
    function _onLayerChanged() {
        Sprite_EMEditorMapUI.Refresh();
        _autoHighlightObjectsForCurrentLayer();
        if (_currentObjectForPlacementSprite) {
            _currentObjectForPlacementSprite.setLayer(_currentLayerIndex);
        }
        if (IsLayersMode()) {
            EMWindowsManager.SendCommandToEditor('layerInfo', EMLayersManager.GetLayerInfo(_currentLayerIndex));
        }
    }
    function Update() {
        if (_isActive) {
            _updateModeSwitchKeys();
            _updateAnyModeHotkeys();
            if (IsNoneMode()) {
                _updateCloseEditorHotKeys();
                _updateCameraDrag();
                _updateCameraMoveByArrows();
                _updateLayersChange();
                _updateObjectsHightlightAndSelection();
            }
            else if (IsObjectMode()) {
                _updateObjectModeHotKeys();
            }
            else if (IsCollisionsMode()) {
                _updateLayersChange();
                _updateCameraMoveByArrows();
                _updateCollisionsMode();
            }
            else if (IsLayersMode()) {
                _updateCameraDrag();
                _updateLayersChange();
                _updateCameraMoveByArrows();
                _updateLayersMode();
            }
        }
    }
    EMapEditorManager.Update = Update;
    function _updateModeSwitchKeys() {
        if (!IsNoneMode() && Input.isTriggered('1')) {
            if (IsObjectMode()) {
                CancelObjectPlacement(); // * -> Switch to none
            }
            else {
                _switchModeTo("none");
            }
            return;
        }
        if (!IsCollisionsMode() && Input.isTriggered('2')) {
            if (IsObjectMode()) {
                CancelObjectPlacement();
            }
            _switchModeTo("collisions");
        }
        if (!IsLayersMode() && Input.isTriggered('3')) {
            if (IsObjectMode()) {
                CancelObjectPlacement();
            }
            _switchModeTo("layers");
        }
    }
    function _updateCloseEditorHotKeys() {
        if (Input.isTriggered('menu')) {
            Deactivate();
        }
    }
    // * We press mouse button and drag camera
    //TODO: Сделать более плавное движение камеры
    function _updateCameraDrag() {
        if (TouchInput.isPressed()) {
            if (!_startX) {
                _startX = TouchInput.x;
                _startY = TouchInput.y;
                _prevMouseX = TouchInput.x;
                _prevMouseY = TouchInput.y;
            }
            if (_prevMouseX != TouchInput.x || _prevMouseY != TouchInput.y) {
                let deltaX = TouchInput.x - _startX;
                let deltaY = TouchInput.y - _startY;
                // * Move camera
                $gameMap._displayX -= deltaX / $gameMap.tileWidth() * _cameraMoveSpeed;
                $gameMap._displayY -= deltaY / $gameMap.tileHeight() * _cameraMoveSpeed;
                _prevMouseX = TouchInput.x;
                _prevMouseY = TouchInput.y;
            }
            else {
                _startX = TouchInput.x;
                _startY = TouchInput.y;
            }
        }
        else {
            _startX = null;
            _startY = null;
        }
    }
    function _updateCameraMoveByArrows() {
        if (TouchInput.isPressed()) {
            return;
        }
        ;
        if (window['mz3d']) {
            _updateCameraMoveByArrowsForMz3D();
            return;
        }
        const moveSpeed = 0.1;
        if (Input.isPressed('down')) {
            $gameMap._displayY += moveSpeed;
        }
        if (Input.isPressed('up')) {
            $gameMap._displayY -= moveSpeed;
        }
        if (Input.isPressed('right')) {
            $gameMap._displayX += moveSpeed;
        }
        if (Input.isPressed('left')) {
            $gameMap._displayX -= moveSpeed;
        }
    }
    let _cameraPanDeltaX = 0;
    let _cameraPanDeltaY = 0;
    function _updateCameraMoveByArrowsForMz3D() {
        let panX = 0;
        let panY = 0;
        if (Input.isPressed('down')) {
            panY = 0.1;
        }
        if (Input.isPressed('up')) {
            panY = -0.1;
        }
        if (Input.isPressed('right')) {
            panX = 0.1;
        }
        if (Input.isPressed('left')) {
            panX = -0.1;
        }
        _cameraPanDeltaX += panX;
        _cameraPanDeltaY += panY;
        /*@ts-ignore*/
        mz3d.command("pan " + _cameraPanDeltaX + " " + _cameraPanDeltaY);
        return;
    }
    function _updateLayersChange() {
        ChangeLayer(_getValueFromScrollWheel());
    }
    function _updateObjectsHightlightAndSelection() {
        let hoverCandidates = [];
        let objects = EMObjectsManager.GetAllPlacedObjectsOnLayer(_currentLayerIndex);
        for (let i = 0; i < objects.length; i++) {
            let object = objects[i];
            if (object.isHoveredByCursor()) {
                hoverCandidates.push(object);
            }
        }
        // * If we have hovered objects, select one with the highest z-index
        if (hoverCandidates.length > 0) {
            /*@ts-ignore*/
            hoverCandidates.sort((a, b) => b.z - a.z);
            let hoveredObject = hoverCandidates[0];
            if (_hoveredByCursorObject != hoveredObject) {
                if (_hoveredByCursorObject) {
                    Sprite_PhantomOutline.HideForHover();
                }
                _hoveredByCursorObject = hoveredObject;
                //console.log("Hovered object: ", _hoveredByCursorObject);
                Sprite_PhantomOutline.ShowForHover(_hoveredByCursorObject);
            }
        }
        else {
            if (_hoveredByCursorObject) {
                Sprite_PhantomOutline.HideForHover();
                //console.log("Hovered object: null");
                _hoveredByCursorObject = null;
            }
        }
        if (TouchInput.isTriggered()) {
            if (_hoveredByCursorObject) {
                Sprite_PhantomOutline.HideForHover();
                if (Input.isPressed(ToolsKeys.clone)) {
                    Input.clear();
                    CloneObject(_hoveredByCursorObject);
                }
                else {
                    EditObject(_hoveredByCursorObject);
                }
            }
        }
        else {
            if (TouchInput.isCancelled()) {
                if (_clickedForDeleteObject == _hoveredByCursorObject) {
                    DeleteObject(_hoveredByCursorObject);
                    _hoveredByCursorObject = null;
                    Sprite_PhantomOutline.HideForHover();
                }
                else {
                    _clickedForDeleteObject = _hoveredByCursorObject;
                    // * We have 200 ms to click again to delete object
                    setTimeout(() => {
                        _clickedForDeleteObject = null;
                    }, 200);
                }
            }
        }
    }
    ;
    function _updateAnyModeHotkeys() {
        if (Input.isTriggered(ToolsKeys.focusLayer)) {
            FocusCurrentLayer();
            return;
        }
        if (Input.isTriggered(ToolsKeys.highlightLayer)) {
            HighlightObjectsForCurrentLayer();
            return;
        }
    }
    function _updateLayersMode() {
    }
    function _updateObjectModeHotKeys() {
    }
    function _getValueFromScrollWheel() {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            return 1;
        }
        else if (TouchInput.wheelY <= -threshold) {
            return -1;
        }
        return 0;
    }
    function _updateCollisionsMode() {
        if (TouchInput.isPressed()) {
            Sprite_MapGridCursor.OnClick();
        }
        else if (TouchInput.isCancelled()) {
            Sprite_MapGridCursor.OnCancel();
        }
        if (Input.isTriggered(ToolsKeys.showCollisions)) {
            Sprite_DefaultCollisionsGrid.ToggleVisibility();
        }
    }
    window['EMapEditorManager'] = EMapEditorManager;
})(EMapEditorManager || (EMapEditorManager = {}));


var EditorResourcesManager;
(function (EditorResourcesManager) {
    const IgnoreFolderList = ['EditorUI'];
    const DummyFolder = 'Trees';
    const RootPath = "img/PKD_MapEnhancer/Assets";
    function GetFoldersList() {
        if (!Utils.isNwjs()) {
            return [DummyFolder];
        }
        // * Get all folders from RootPath folder
        /*@ts-ignore*/
        const fs = require('fs');
        /*@ts-ignore*/
        const path = require('path');
        /*@ts-ignore*/
        const root = path.join(process.cwd(), RootPath);
        if (!fs.existsSync(root)) {
            return [DummyFolder];
        }
        const files = fs.readdirSync(root);
        const folders = files.filter(f => fs.statSync(path.join(root, f)).isDirectory());
        // * Remove ignored folders
        for (let i = 0; i < IgnoreFolderList.length; i++) {
            const index = folders.indexOf(IgnoreFolderList[i]);
            if (index >= 0) {
                folders.splice(index, 1);
            }
        }
        return folders;
    }
    EditorResourcesManager.GetFoldersList = GetFoldersList;
    function GetFilesListInFolder(folder) {
        if (!Utils.isNwjs()) {
            if (folder == DummyFolder) {
                return ["tree", "tree2", "tree3"];
            }
        }
        // * Get all files from folder
        /*@ts-ignore*/
        const fs = require('fs');
        /*@ts-ignore*/
        const path = require('path');
        /*@ts-ignore*/
        const root = path.join(process.cwd(), RootPath, folder);
        if (!fs.existsSync(root)) {
            return [];
        }
        const files = fs.readdirSync(root);
        // * Filter only images (.png) and remove .png extension
        return files.filter(f => f.endsWith('.png')).map(f => f.replace('.png', ''));
    }
    EditorResourcesManager.GetFilesListInFolder = GetFilesListInFolder;
    function GetImageName(folder, index) {
        let files = GetFilesListInFolder(folder);
        return files[index];
    }
    EditorResourcesManager.GetImageName = GetImageName;
    function GetImageIndex(folder, imageName) {
        let files = GetFilesListInFolder(folder);
        return files.indexOf(imageName);
    }
    EditorResourcesManager.GetImageIndex = GetImageIndex;
})(EditorResourcesManager || (EditorResourcesManager = {}));


// * Данный класс работает только в окне редактора, инициализирует окно редактора и запускает сцену редактора карты
// * Хранит ссылку на основное окно для оптарвки сообщений
var EM_EditorWindowHandler;
(function (EM_EditorWindowHandler) {
    let _rootWindow = null;
    function Init(rootWindow) {
        _rootWindow = rootWindow;
    }
    EM_EditorWindowHandler.Init = Init;
    function FocusRootWindow() {
        SendCommandToGameWindow('focus', null);
    }
    EM_EditorWindowHandler.FocusRootWindow = FocusRootWindow;
    function StartEditorScene() {
        var _a;
        DataManager.setupNewGame();
        let size = PP.EditorWindowSize();
        const w = size.width;
        const h = size.height;
        /*@ts-ignore*/
        Graphics.resize(w, h);
        /*@ts-ignore*/
        Graphics.defaultScale = 1;
        Graphics.boxWidth = w - 8;
        Graphics.boxHeight = h - 8;
        document.title = "Enhancer Editor for [" + $dataSystem.gameTitle + "]";
        SceneManager.goto(Scene_Editor);
        (_a = Scene_Editor.Instance()) === null || _a === void 0 ? void 0 : _a.setMode('none');
    }
    EM_EditorWindowHandler.StartEditorScene = StartEditorScene;
    function SendCommandToGameWindow(command, data) {
        var _a;
        if (!_rootWindow) {
            console.error("Root window is not set");
            return;
        }
        (_a = _rootWindow['EMWindowsManager']) === null || _a === void 0 ? void 0 : _a.OnCommandFromEditor(command, data);
    }
    EM_EditorWindowHandler.SendCommandToGameWindow = SendCommandToGameWindow;
    function OnCommandFromGame(command, data) {
        var _a, _b, _c, _d;
        console.log("Command from Game: ", command, data);
        switch (command) {
            case 'test':
                console.log("Test command from Game");
                break;
            case 'switchMode':
                console.log("New Mode from Game: ", data);
                if (data == 'none') {
                    (_a = Scene_Editor.Instance()) === null || _a === void 0 ? void 0 : _a.changeCurrentObjectFromGame(-1);
                }
                (_b = Scene_Editor.Instance()) === null || _b === void 0 ? void 0 : _b.setMode(data);
                break;
            case 'changeObject':
                (_c = Scene_Editor.Instance()) === null || _c === void 0 ? void 0 : _c.changeCurrentObjectFromGame(data);
                break;
            case 'layerInfo':
                (_d = Scene_Editor.Instance()) === null || _d === void 0 ? void 0 : _d.changeLayerInfoFromGame(data);
                break;
            default:
                console.error("Unknown command from Game: ", command);
                break;
        }
    }
    EM_EditorWindowHandler.OnCommandFromGame = OnCommandFromGame;
    window['EM_EditorWindowHandler'] = EM_EditorWindowHandler;
})(EM_EditorWindowHandler || (EM_EditorWindowHandler = {}));


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Game_Map.prototype;
    let _currentMapUniqueCollisionIndexes = [];
    //TODO: Script call for force refresh
    function _refreshCollisionIndexes() {
        let mapId = $gameMap.mapId();
        _currentMapUniqueCollisionIndexes = EMCollisionsManager.GetCollisionsUniqueIndexesForMap(mapId);
    }
    //@[ALIAS]
    const ALIAS__setup = _.setup;
    _.setup = function (...args) {
        ALIAS__setup.call(this, ...args);
        EMLayersManager.OnNewMapLoaded();
        _refreshCollisionIndexes();
    };
    //@[ALIAS]
    const ALIAS__refresh = _.refresh;
    _.refresh = function (...args) {
        ALIAS__refresh.call(this, ...args);
        EMLayersManager.Refresh();
        _refreshCollisionIndexes();
    };
    //@[ALIAS]
    const ALIAS__isEventRunning = _.isEventRunning;
    _.isEventRunning = function (...args) {
        if (EMapEditorManager.IsActive()) {
            return true;
        }
        return ALIAS__isEventRunning.call(this, ...args);
    };
    //@[ALIAS]
    const ALIAS__isPassable = _.isPassable;
    _.isPassable = function (x, y, d) {
        let result = ALIAS__isPassable.call(this, x, y, d);
        if (!result) {
            return false;
        }
        if (EMCollisionsManager.IsMapHaveAnyCollision($gameMap.mapId())) {
            let uniqueIndex = EMCollisionsManager.GetUniqeIndexForPosition(x, y);
            result = !_currentMapUniqueCollisionIndexes.includes(uniqueIndex);
        }
        return result;
    };
})();
// ■ END Game_Map.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Game_System.prototype;
    /*@ts-ignore*/
    _.pkdMEGetConfigs = function () {
        return this._pkdMEConfigs || [];
    };
    /*@ts-ignore*/
    _.pkdMESetConfigs = function (configs) {
        this._pkdMEConfigs = configs;
    };
})();
// ■ END Game_System.ts
//---------------------------------------------------------------------------


class HelpTextBuilder {
    constructor() {
        this._content = new KNSprite_Group();
    }
    static New() {
        return new HelpTextBuilder();
    }
    AddKey(key) {
        let keyItem = KDNUI.FromScheme(this._keyScheme(key.toUpperCase()));
        this._addElement(keyItem);
        return this;
    }
    AddKeyHold(key) {
        let keyItem = KDNUI.FromScheme(this._keyScheme("[" + key.toUpperCase() + "]"));
        this._addElement(keyItem);
        return this;
    }
    AddKeyWs(key) {
        let keyItem = KDNUI.FromScheme(this._keyScheme(key.toUpperCase()));
        this._addElement(keyItem, false);
        return this;
    }
    _addElement(element, withSeparator = true) {
        if (withSeparator && this._isHaveAnyItemAlready()) {
            this.AddText("+", "#ECDFCC");
        }
        this._content.addChild(element);
        element.refreshBindings(null, true);
        this._refreshAllElements();
    }
    AddShiftKey() {
        let keyItem = KDNUI.FromScheme(this._shiftKeyScheme());
        this._addElement(keyItem);
        return this;
    }
    AddText(text, color = "#F97300") {
        if (text != '+') {
            text = " " + text;
        }
        let textItem = KDNUI.FromScheme(this._textScheme(text, color));
        console.log(textItem.realWidth());
        this._addElement(textItem, false);
        console.log(textItem.realWidth());
        textItem.refreshBindings(null, true);
        console.log(textItem.realWidth());
        return this;
    }
    AddObjectIcon() {
        let item = KDNUI.FromScheme(this._iconScheme('object'));
        this._addElement(item);
        return this;
    }
    AddMoveAny() {
        let item = KDNUI.FromScheme(this._iconScheme('moveAny'));
        this._addElement(item);
        return this;
    }
    AddMoveRect() {
        let item = KDNUI.FromScheme(this._iconScheme('moveRect'));
        this._addElement(item);
        return this;
    }
    AddMouseScroll() {
        let item = KDNUI.FromScheme(this._iconScheme('mouse_scroll'));
        this._addElement(item);
        return this;
    }
    AddMouseClick(key) {
        let item = KDNUI.FromScheme(this._iconScheme('mouse_click_' + key));
        this._addElement(item);
        return this;
    }
    AddMouseHold(key) {
        let item = KDNUI.FromScheme(this._iconScheme('mouse_hold_' + key));
        this._addElement(item);
        return this;
    }
    Build() {
        return this._content;
    }
    _isHaveAnyItemAlready() {
        return this._content.children.length > 0;
    }
    _refreshAllElements() {
        this._content.refreshBindings(null, true);
    }
    _keyScheme(key) {
        return {
            "type": "image",
            "parameters": {
                "imageName": "buttonA",
                "folderName": "PKD_MapEnhancer/EditorUI"
            },
            "bindings": {
                "x": "prevEndX + 4hdp",
                "width": "36hdp",
                "height": "36hdp"
            },
            "childrens": [
                {
                    "type": "text",
                    "parameters": {
                        "text": key,
                        "color": "#ECDFCC"
                    },
                    "bindings": {
                        "width": "100%",
                        "height": "90%",
                        "fontSize": "60%"
                    }
                }
            ]
        };
    }
    _textScheme(text, color) {
        let fontSize = "22hdp";
        if (text.length > 10) {
            fontSize = "20hdp";
            if (text.length > 20) {
                fontSize = "18hdp";
                if (text.length > 30) {
                    fontSize = "14hdp";
                }
            }
        }
        return {
            "type": "text",
            "parameters": {
                "size": {
                    "width": 120,
                    "height": 36
                },
                "alignment": "left",
                "text": text,
                "textColor": color,
                "actualWidth": true,
                "outline": {
                    "color": "#000000",
                    "width": 2
                }
            },
            "bindings": {
                "x": "prevEndX + 2hdp",
                "height": "100%",
                "fontSize": fontSize
            }
        };
    }
    _shiftKeyScheme() {
        return {
            "type": "image",
            "parameters": {
                "imageName": "buttonA",
                "folderName": "PKD_MapEnhancer/EditorUI"
            },
            "bindings": {
                "position": {
                    "x": "prevEndX + 4hdp",
                    "y": "2hdp"
                },
                "width": "54hdp",
                "height": "34hdp"
            },
            "childrens": [
                {
                    "type": "text",
                    "parameters": {
                        "text": "[shift]",
                        "color": "#ECDFCC"
                    },
                    "bindings": {
                        "width": "100%",
                        "height": "100%",
                        "fontSize": "60%"
                    }
                }
            ]
        };
    }
    _iconScheme(imageName) {
        return {
            "type": "image",
            "parameters": {
                "imageName": imageName,
                "folderName": "PKD_MapEnhancer/EditorUI"
            },
            "bindings": {
                "x": "prevEndX + 4hdp",
                "width": "36hdp",
                "height": "36hdp"
            }
        };
    }
}


var HelpTextStrings;
(function (HelpTextStrings) {
    HelpTextStrings["MoveCamera"] = "Move camera";
    HelpTextStrings["EditObject"] = "Edit object";
    HelpTextStrings["DuplicateObject"] = "Duplicate object";
    HelpTextStrings["RemoveObject"] = "Remove object";
    HelpTextStrings["RemoveSelected"] = "Remove selected";
    HelpTextStrings["ChangeGroup"] = "Change group";
    HelpTextStrings["HighlightGroup"] = "Highlight group";
    HelpTextStrings["ChangeObject"] = "Change object";
    HelpTextStrings["LockYAxis"] = "Lock Y axis";
    HelpTextStrings["LockXAxis"] = "Lock X axis";
    HelpTextStrings["Grid"] = "Grid";
    HelpTextStrings["Scale"] = "Scale";
    HelpTextStrings["Rotate"] = "Rotate";
    HelpTextStrings["ChangePivot"] = "Change pivot";
    HelpTextStrings["Flip"] = "Flip";
    HelpTextStrings["ChangeZIndex"] = "Change Z";
    HelpTextStrings["ResetToCursor"] = "Reset to cursor";
    HelpTextStrings["Focus"] = "Focus Group";
    HelpTextStrings["Cancel"] = "Cancel";
    HelpTextStrings["Place"] = "Place Object";
    HelpTextStrings["PrecisionMove"] = "Precision move";
    HelpTextStrings["BlendMode"] = "Blend mode";
    HelpTextStrings["HUE"] = "Hue mode";
    HelpTextStrings["Reset"] = "Reset";
    HelpTextStrings["ModeNone"] = "Select object for placing";
    HelpTextStrings["ModeObject"] = "Object placing mode";
    HelpTextStrings["ModeCollisions"] = "Collisions mode";
    HelpTextStrings["ShowCollisions"] = "Show collisions";
    HelpTextStrings["AddCollision"] = "Add collision";
    HelpTextStrings["RemoveCollision"] = "Remove collision";
    HelpTextStrings["ChangeMode"] = "Change Mode";
    HelpTextStrings["CloseEditor"] = "Close Editor";
    HelpTextStrings["ModeGroups"] = "Groups mode";
    HelpTextStrings["AnimationSpeed"] = "Animation Speed";
    HelpTextStrings["Opacity"] = "Opacity";
    HelpTextStrings["DeleteAllCollisions"] = "Delete All Collisions in Current Group";
    HelpTextStrings["DeleteAllObjects"] = "Delete All Objects in Current Group";
})(HelpTextStrings || (HelpTextStrings = {}));
var HelpVocabulary;
(function (HelpVocabulary) {
    let stringsEN = {
        [HelpTextStrings.MoveCamera]: "Move camera",
        [HelpTextStrings.EditObject]: "Edit object",
        [HelpTextStrings.DuplicateObject]: "Duplicate",
        [HelpTextStrings.RemoveObject]: "Remove object",
        [HelpTextStrings.RemoveSelected]: "Remove (*)",
        [HelpTextStrings.ChangeGroup]: "Change group",
        [HelpTextStrings.HighlightGroup]: "Highlight group",
        [HelpTextStrings.ChangeObject]: "Change object",
        [HelpTextStrings.LockYAxis]: "Lock Y axis",
        [HelpTextStrings.LockXAxis]: "Lock X axis",
        [HelpTextStrings.Grid]: "Grid",
        [HelpTextStrings.Scale]: "Scale",
        [HelpTextStrings.Rotate]: "Rotate",
        [HelpTextStrings.ChangePivot]: "Change pivot",
        [HelpTextStrings.Flip]: "Flip",
        [HelpTextStrings.ChangeZIndex]: "Change Z",
        [HelpTextStrings.ResetToCursor]: "Reset to cursor",
        [HelpTextStrings.Focus]: "Focus Group",
        [HelpTextStrings.Cancel]: "Cancel",
        [HelpTextStrings.Place]: "Place Object",
        [HelpTextStrings.PrecisionMove]: "Precision move",
        [HelpTextStrings.BlendMode]: "Blend mode",
        [HelpTextStrings.HUE]: "Hue mode",
        [HelpTextStrings.Reset]: "Reset",
        [HelpTextStrings.ModeNone]: "Select object for placing",
        [HelpTextStrings.ModeObject]: "Object placing mode",
        [HelpTextStrings.ShowCollisions]: "Show collisions",
        [HelpTextStrings.AddCollision]: "Add collision",
        [HelpTextStrings.RemoveCollision]: "Remove collision",
        [HelpTextStrings.ModeCollisions]: "Collisions mode",
        [HelpTextStrings.ChangeMode]: "Change Mode",
        [HelpTextStrings.CloseEditor]: "Close Editor",
        [HelpTextStrings.ModeGroups]: "Groups mode",
        [HelpTextStrings.AnimationSpeed]: "Animation Speed",
        [HelpTextStrings.Opacity]: "Opacity",
        [HelpTextStrings.DeleteAllCollisions]: "Delete All Collisions in Current Group",
        [HelpTextStrings.DeleteAllObjects]: "Delete All Objects in Current Group"
    };
    let stringsRU = {
        [HelpTextStrings.MoveCamera]: "Камера",
        [HelpTextStrings.EditObject]: "Изменить объект",
        [HelpTextStrings.DuplicateObject]: "Копия",
        [HelpTextStrings.RemoveObject]: "Удалить",
        [HelpTextStrings.RemoveSelected]: "Удалить (*)",
        [HelpTextStrings.ChangeGroup]: "Сменить группу",
        [HelpTextStrings.HighlightGroup]: "Подсветить группу",
        [HelpTextStrings.ChangeObject]: "Изменить объект",
        [HelpTextStrings.LockYAxis]: "Заблокировать Y",
        [HelpTextStrings.LockXAxis]: "Заблокировать X",
        [HelpTextStrings.Grid]: "Сетка",
        [HelpTextStrings.Scale]: "Масштаб",
        [HelpTextStrings.Rotate]: "Поворот",
        [HelpTextStrings.ChangePivot]: "Основание",
        [HelpTextStrings.Flip]: "Отразить",
        [HelpTextStrings.ChangeZIndex]: "Z",
        [HelpTextStrings.ResetToCursor]: "Сбросить",
        [HelpTextStrings.Focus]: "Фокус слоя",
        [HelpTextStrings.Cancel]: "Отмена",
        [HelpTextStrings.Place]: "Поместить",
        [HelpTextStrings.PrecisionMove]: "Точное перемещение",
        [HelpTextStrings.BlendMode]: "Режим смешивания",
        [HelpTextStrings.HUE]: "Цветовой режим",
        [HelpTextStrings.Reset]: "Сброс",
        [HelpTextStrings.ModeNone]: "Выберите объект",
        [HelpTextStrings.ModeObject]: "Режим размещения",
        [HelpTextStrings.ShowCollisions]: "Показать коллизии",
        [HelpTextStrings.AddCollision]: "Добавить",
        [HelpTextStrings.RemoveCollision]: "Удалить",
        [HelpTextStrings.ModeCollisions]: "Режим коллизий",
        [HelpTextStrings.ChangeMode]: "Сменить режим",
        [HelpTextStrings.CloseEditor]: "Закрыть редактор",
        [HelpTextStrings.ModeGroups]: "Режим слоев",
        [HelpTextStrings.AnimationSpeed]: "Скорость анимации",
        [HelpTextStrings.Opacity]: "Прозрачность",
        [HelpTextStrings.DeleteAllCollisions]: "Удалить все коллизии в группе",
        [HelpTextStrings.DeleteAllObjects]: "Удалить все объекты в группе"
    };
    let stringsCH = {
        [HelpTextStrings.MoveCamera]: "移动相机",
        [HelpTextStrings.EditObject]: "编辑对象",
        [HelpTextStrings.DuplicateObject]: "复制对象",
        [HelpTextStrings.RemoveObject]: "删除对象",
        [HelpTextStrings.RemoveSelected]: "删除选定",
        [HelpTextStrings.ChangeGroup]: "更改组",
        [HelpTextStrings.HighlightGroup]: "高亮显示组",
        [HelpTextStrings.ChangeObject]: "更改对象",
        [HelpTextStrings.LockYAxis]: "锁定Y轴",
        [HelpTextStrings.LockXAxis]: "锁定X轴",
        [HelpTextStrings.Grid]: "网格",
        [HelpTextStrings.Scale]: "缩放",
        [HelpTextStrings.Rotate]: "旋转",
        [HelpTextStrings.ChangePivot]: "更改中心点",
        [HelpTextStrings.Flip]: "翻转",
        [HelpTextStrings.ChangeZIndex]: "更改Z",
        [HelpTextStrings.ResetToCursor]: "重置到光标",
        [HelpTextStrings.Focus]: "焦点层",
        [HelpTextStrings.Cancel]: "取消",
        [HelpTextStrings.Place]: "放置对象",
        [HelpTextStrings.PrecisionMove]: "精确移动",
        [HelpTextStrings.BlendMode]: "混合模式",
        [HelpTextStrings.HUE]: "色调模式",
        [HelpTextStrings.Reset]: "重置",
        [HelpTextStrings.ModeNone]: "选择对象",
        [HelpTextStrings.ModeObject]: "对象放置模式",
        [HelpTextStrings.ShowCollisions]: "显示碰撞",
        [HelpTextStrings.AddCollision]: "添加碰撞",
        [HelpTextStrings.RemoveCollision]: "删除碰撞",
        [HelpTextStrings.ModeCollisions]: "碰撞模式",
        [HelpTextStrings.ChangeMode]: "更改模式",
        [HelpTextStrings.CloseEditor]: "关闭编辑器",
        [HelpTextStrings.ModeGroups]: "组模式",
        [HelpTextStrings.AnimationSpeed]: "动画速度",
        [HelpTextStrings.Opacity]: "不透明度",
        [HelpTextStrings.DeleteAllCollisions]: "删除当前组中的所有碰撞",
        [HelpTextStrings.DeleteAllObjects]: "删除当前组中的所有对象"
    };
    let allStrings = [
        stringsEN,
        stringsRU,
        stringsCH
    ];
    function GetLocalizedString(text) {
        let currentLanguageId = PP.EditorHelpLanguageIndex();
        return allStrings[currentLanguageId][text];
    }
    HelpVocabulary.GetLocalizedString = GetLocalizedString;
})(HelpVocabulary || (HelpVocabulary = {}));


var EM_HelpWindowHandler;
(function (EM_HelpWindowHandler) {
    let _rootWindow = null;
    function Init(rootWindow) {
        _rootWindow = rootWindow;
    }
    EM_HelpWindowHandler.Init = Init;
    function StartHelpScene() {
        DataManager.setupNewGame();
        let size = PP.HelpWindowSize();
        const w = size.width;
        const h = size.height;
        /*@ts-ignore*/
        Graphics.resize(w, h);
        /*@ts-ignore*/
        Graphics.defaultScale = 1;
        Graphics.boxWidth = w - 8;
        Graphics.boxHeight = h - 8;
        document.title = "Editor Help Window for [" + $dataSystem.gameTitle + "]";
        SceneManager.goto(Scene_EHelpWindow);
    }
    EM_HelpWindowHandler.StartHelpScene = StartHelpScene;
    function OnCommandFromGame(command, data) {
        console.log("Command from Game: ", command, data);
        switch (command) {
            case 'test':
                console.log("Test command from Game");
                break;
            case 'switchMode':
                showHelpForMode(data);
                break;
            case 'changeObject':
                // * Nothing to do
                break;
            default:
                console.error("Unknown command from Game: ", command);
                break;
        }
    }
    EM_HelpWindowHandler.OnCommandFromGame = OnCommandFromGame;
    function showHelpForMode(mode) {
        switch (mode) {
            case 'none':
                showHelpForNoneMode();
                break;
            case 'object':
                showHelpForObjectMode();
                break;
            case 'collisions':
                showHelpForCollisionsMode();
                break;
            case 'layers':
                showHelpForLayersMode();
                break;
            default:
                let helpScene = Scene_EHelpWindow.Instance();
                helpScene === null || helpScene === void 0 ? void 0 : helpScene.makeGrid(3, 4); // * Empty grid
                console.warn("Unknown mode: " + mode);
                break;
        }
    }
    function showHelpForNoneMode() {
        let helpScene = Scene_EHelpWindow.Instance();
        if (!helpScene)
            return;
        helpScene.makeGrid(3, 4);
        let moveCameraText = HelpVocabulary.GetLocalizedString(HelpTextStrings.MoveCamera);
        let element = HelpTextBuilder.New().AddMouseHold('l').AddText(moveCameraText).Build();
        helpScene.addElementToGrid(element);
        // * Arrow Keys
        let precisionMoveText = HelpVocabulary.GetLocalizedString(HelpTextStrings.PrecisionMove);
        element = HelpTextBuilder.New().AddKeyWs('↑').AddKeyWs('↓').AddKeyWs('←').AddKeyWs('→').AddText(precisionMoveText).Build();
        helpScene.addElementToGrid(element);
        let changeLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeGroup);
        element = HelpTextBuilder.New().AddMouseScroll().AddText(changeLayerText).Build();
        helpScene.addElementToGrid(element);
        let editObjectText = HelpVocabulary.GetLocalizedString(HelpTextStrings.EditObject);
        element = HelpTextBuilder.New().AddMouseClick('l').AddObjectIcon().AddText(editObjectText).Build();
        helpScene.addElementToGrid(element);
        let removeObjectText = HelpVocabulary.GetLocalizedString(HelpTextStrings.RemoveObject);
        element = HelpTextBuilder.New().AddMouseClick('r').AddMouseClick('r').AddObjectIcon().AddText(removeObjectText).Build();
        helpScene.addElementToGrid(element);
        let dubplicateObjectText = HelpVocabulary.GetLocalizedString(HelpTextStrings.DuplicateObject);
        element = HelpTextBuilder.New().AddMouseClick('l').AddShiftKey().AddObjectIcon().AddText(dubplicateObjectText).Build();
        helpScene.addElementToGrid(element);
        //%[IDEA] Remove many objects in selection rectangle
        /*let removeSelectedText = HelpVocabulary.GetLocalizedString(HelpTextStrings.RemoveSelected);
        element = HelpTextBuilder.New().AddMouseHold('r').AddShiftKey().AddObjectIcon().AddText(removeSelectedText).Build();
        helpScene.addElementToGrid(element);*/
        let highlightLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.HighlightGroup);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.highlightLayer).AddText(highlightLayerText).Build();
        helpScene.addElementToGrid(element);
        let focusLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Focus);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.focusLayer).AddText(focusLayerText).Build();
        helpScene.addElementToGrid(element);
        let closeEditor = HelpVocabulary.GetLocalizedString(HelpTextStrings.CloseEditor);
        element = HelpTextBuilder.New().AddKey('ESC').AddText(closeEditor).Build();
        helpScene.addElementToGrid(element);
    }
    EM_HelpWindowHandler.showHelpForNoneMode = showHelpForNoneMode;
    function showHelpForObjectMode() {
        let helpScene = Scene_EHelpWindow.Instance();
        if (!helpScene)
            return;
        let element;
        helpScene.makeGrid(3, 6);
        let placeObject = HelpVocabulary.GetLocalizedString(HelpTextStrings.Place);
        element = HelpTextBuilder.New().AddMouseClick('l').AddText(placeObject).Build();
        helpScene.addElementToGrid(element);
        let changeObject = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeObject);
        element = HelpTextBuilder.New().AddMouseScroll().AddText(changeObject).Build();
        helpScene.addElementToGrid(element);
        let cancel = HelpVocabulary.GetLocalizedString(HelpTextStrings.Cancel);
        element = HelpTextBuilder.New().AddMouseClick('r').AddText(cancel).Build();
        helpScene.addElementToGrid(element);
        let changeLayer = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeGroup);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.layerIndex).AddMouseScroll().AddText(changeLayer).Build();
        helpScene.addElementToGrid(element);
        let grid = HelpVocabulary.GetLocalizedString(HelpTextStrings.Grid);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.grid).AddMouseScroll().AddText(grid).Build();
        helpScene.addElementToGrid(element);
        let scale = HelpVocabulary.GetLocalizedString(HelpTextStrings.Scale);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.scale).AddMouseScroll().AddText(scale).Build();
        helpScene.addElementToGrid(element);
        let rotate = HelpVocabulary.GetLocalizedString(HelpTextStrings.Rotate);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.rotation).AddMouseScroll().AddText(rotate).Build();
        helpScene.addElementToGrid(element);
        let changeZIndex = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeZIndex);
        element = HelpTextBuilder.New().AddShiftKey().AddMouseScroll().AddText(changeZIndex).Build();
        helpScene.addElementToGrid(element);
        let lockX = HelpVocabulary.GetLocalizedString(HelpTextStrings.LockXAxis);
        let keyText = ToolsKeys.xAxis;
        // * Little convert from RPG Maker Input Key Name
        if (keyText == 'cancel')
            keyText = 'x';
        element = HelpTextBuilder.New().AddKeyHold(keyText).AddMouseScroll().AddText(lockX).Build();
        helpScene.addElementToGrid(element);
        let lockY = HelpVocabulary.GetLocalizedString(HelpTextStrings.LockYAxis);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.yAsix).AddMouseScroll().AddText(lockY).Build();
        helpScene.addElementToGrid(element);
        let flip = HelpVocabulary.GetLocalizedString(HelpTextStrings.Flip);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.flip).AddText(flip).Build();
        helpScene.addElementToGrid(element);
        let resetCursor = HelpVocabulary.GetLocalizedString(HelpTextStrings.ResetToCursor);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.resetCursor).AddText(resetCursor).Build();
        helpScene.addElementToGrid(element);
        let highlightLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.HighlightGroup);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.highlightLayer).AddText(highlightLayerText).Build();
        helpScene.addElementToGrid(element);
        let focusLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Focus);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.focusLayer).AddText(focusLayerText).Build();
        helpScene.addElementToGrid(element);
        let blendModeText = HelpVocabulary.GetLocalizedString(HelpTextStrings.BlendMode);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.blendMode).AddMouseScroll().AddText(blendModeText).Build();
        helpScene.addElementToGrid(element);
        let hueModeText = HelpVocabulary.GetLocalizedString(HelpTextStrings.HUE);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.hue).AddMouseScroll().AddText(hueModeText).Build();
        helpScene.addElementToGrid(element);
        let opacityText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Opacity);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.opacity).AddMouseScroll().AddText(opacityText).Build();
        helpScene.addElementToGrid(element);
        let animationSpeed = HelpVocabulary.GetLocalizedString(HelpTextStrings.AnimationSpeed);
        element = HelpTextBuilder.New().AddKeyHold(ToolsKeys.animationSpeed).AddMouseScroll().AddText(animationSpeed).Build();
        helpScene.addElementToGrid(element);
        // * Arrow Keys
        let precisionMoveText = HelpVocabulary.GetLocalizedString(HelpTextStrings.PrecisionMove);
        element = HelpTextBuilder.New().AddKeyWs('↑').AddKeyWs('↓').AddKeyWs('←').AddKeyWs('→').AddText(precisionMoveText).Build();
        helpScene.addElementToGrid(element);
    }
    EM_HelpWindowHandler.showHelpForObjectMode = showHelpForObjectMode;
    function showHelpForCollisionsMode() {
        let helpScene = Scene_EHelpWindow.Instance();
        if (!helpScene)
            return;
        let element;
        helpScene.makeGrid(2, 4);
        let placeObject = HelpVocabulary.GetLocalizedString(HelpTextStrings.AddCollision);
        element = HelpTextBuilder.New().AddMouseClick('l').AddText(placeObject).Build();
        helpScene.addElementToGrid(element);
        let cancel = HelpVocabulary.GetLocalizedString(HelpTextStrings.RemoveCollision);
        element = HelpTextBuilder.New().AddMouseClick('r').AddText(cancel).Build();
        helpScene.addElementToGrid(element);
        // * Arrow Keys
        let precisionMoveText = HelpVocabulary.GetLocalizedString(HelpTextStrings.PrecisionMove);
        element = HelpTextBuilder.New().AddKeyWs('↑').AddKeyWs('↓').AddKeyWs('←').AddKeyWs('→').AddText(precisionMoveText).Build();
        helpScene.addElementToGrid(element);
        let changeLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeGroup);
        element = HelpTextBuilder.New().AddMouseScroll().AddText(changeLayerText).Build();
        helpScene.addElementToGrid(element);
        let highlightLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.HighlightGroup);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.highlightLayer).AddText(highlightLayerText).Build();
        helpScene.addElementToGrid(element);
        let focusLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Focus);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.focusLayer).AddText(focusLayerText).Build();
        helpScene.addElementToGrid(element);
        let showCollisionsText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ShowCollisions);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.showCollisions).AddText(showCollisionsText).Build();
        helpScene.addElementToGrid(element);
    }
    EM_HelpWindowHandler.showHelpForCollisionsMode = showHelpForCollisionsMode;
    function showHelpForLayersMode() {
        let helpScene = Scene_EHelpWindow.Instance();
        if (!helpScene)
            return;
        let element;
        helpScene.makeGrid(2, 4);
        let moveCameraText = HelpVocabulary.GetLocalizedString(HelpTextStrings.MoveCamera);
        element = HelpTextBuilder.New().AddMouseHold('l').AddText(moveCameraText).Build();
        helpScene.addElementToGrid(element);
        // * Arrow Keys
        let precisionMoveText = HelpVocabulary.GetLocalizedString(HelpTextStrings.PrecisionMove);
        element = HelpTextBuilder.New().AddKeyWs('↑').AddKeyWs('↓').AddKeyWs('←').AddKeyWs('→').AddText(precisionMoveText).Build();
        helpScene.addElementToGrid(element);
        let changeLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeGroup);
        element = HelpTextBuilder.New().AddMouseScroll().AddText(changeLayerText).Build();
        helpScene.addElementToGrid(element);
        let highlightLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.HighlightGroup);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.highlightLayer).AddText(highlightLayerText).Build();
        helpScene.addElementToGrid(element);
        let focusLayerText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Focus);
        element = HelpTextBuilder.New().AddKey(ToolsKeys.focusLayer).AddText(focusLayerText).Build();
        helpScene.addElementToGrid(element);
    }
    EM_HelpWindowHandler.showHelpForLayersMode = showHelpForLayersMode;
    window['EM_HelpWindowHandler'] = EM_HelpWindowHandler;
})(EM_HelpWindowHandler || (EM_HelpWindowHandler = {}));


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SceneManager.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = SceneManager;
    //@[ALIAS]
    /*@ts-ignore*/
    const ALIAS__isGameActive = _.isGameActive;
    /*@ts-ignore*/
    _.isGameActive = function () {
        if (EMapEditorManager.IsActive()) {
            return true;
        }
        if (EMWindowsManager.IsHelpWindow()) {
            return true;
        }
        if (EMWindowsManager.IsEnhancerEditorWindow()) {
            return true;
        }
        return ALIAS__isGameActive.call(this);
    };
    //@[ALIAS]
    const ALIAS__onKeyDown = _.onKeyDown;
    _.onKeyDown = function (event) {
        ALIAS__onKeyDown.call(this, event);
        if (!event.ctrlKey && !event.altKey) {
            try {
                if (event.key == PP.OpenEditorKey()) {
                    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                        EMapEditorManager.Activate();
                    }
                    else {
                        console.error("Editor is available only in Playtest mode");
                    }
                    return;
                }
            }
            catch (error) {
                console.warn(error);
            }
        }
    };
})();
// ■ END SceneManager.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Boot.prototype;
    //@[ALIAS]
    const ALIAS__start = _.start;
    _.start = function () {
        PP.LoadPluginSettings();
        if (EMWindowsManager.IsEnhancerEditorWindow()) {
            console.log("Editor Window is opened");
            Scene_Base.prototype.start.call(this);
            SoundManager.preloadImportantSounds();
            EM_EditorWindowHandler.StartEditorScene();
        }
        else if (EMWindowsManager.IsHelpWindow()) {
            console.log("Help Window is opened");
            Scene_Base.prototype.start.call(this);
            SoundManager.preloadImportantSounds();
            EM_HelpWindowHandler.StartHelpScene();
        }
        else {
            ALIAS__start.call(this);
        }
    };
})();
// ■ END Scene_Boot.ts
//---------------------------------------------------------------------------


class Scene_EHelpWindow extends Scene_Base {
    constructor() {
        super(...arguments);
        this._elementsGrid = [];
        this._currentGridElementIndex = 0;
    }
    static Instance() {
        if (SceneManager._scene instanceof Scene_EHelpWindow) {
            return SceneManager._scene;
        }
        return null;
    }
    create() {
        super.create();
        this._rootElement = KDNUI.FromScheme(this._rootElementScheme(), this);
        this.addChild(this._rootElement);
    }
    start() {
        super.start();
        EM_HelpWindowHandler.showHelpForNoneMode();
    }
    _rootElementScheme() {
        return {
            "type": "screen",
            "childrens": [
                {
                    "type": "rect",
                    "parameters": {
                        "fillColor": "#1E201E",
                        "strokeWidth": 0
                    },
                    "bindings": {
                        "width": "100%",
                        "height": "100%"
                    }
                }
            ]
        };
    }
    fillGridForTest() {
        let elementWidth = this._elementsGrid[0].realWidth();
        let elementHeight = this._elementsGrid[0].realHeight();
        for (let i = 0; i < this._elementsGrid.length; i++) {
            let color = KColor.Random();
            let element = new KNSprite_BaseRect({
                width: elementWidth,
                height: elementHeight,
                fillColor: color,
                strokeWidth: 0
            });
            this.addElementToGrid(element);
        }
    }
    makeGrid(a, b) {
        this._clearGrid();
        let elementWidth = Graphics.width / a;
        let elementHeight = Graphics.height / b;
        let x = 0;
        let y = 0;
        for (let i = 0; i < (a * b); i++) {
            let element = new KNSprite_Group();
            element.setPosition(x, y);
            element.setSize(elementWidth, elementHeight);
            this.addChild(element);
            this._elementsGrid.push(element);
            x += elementWidth;
            if (x >= Graphics.width) {
                x = 0;
                y += elementHeight;
            }
        }
    }
    _clearGrid() {
        this._currentGridElementIndex = 0;
        if (!this._elementsGrid) {
            return;
        }
        ;
        for (let element of this._elementsGrid) {
            element.removeFromParent();
        }
        this._elementsGrid = [];
    }
    addElementToGrid(element) {
        let gridElement = this._elementsGrid[this._currentGridElementIndex];
        if (gridElement == null) {
            console.error("No grid element found for index: " + this._currentGridElementIndex);
            return;
        }
        gridElement.addChild(element);
        element.setPosition("left", "center");
        this._currentGridElementIndex++;
    }
}


class Scene_Editor extends Scene_Base {
    constructor() {
        super(...arguments);
        this._currentModeTitle = "";
    }
    static Instance() {
        if (SceneManager._scene instanceof Scene_Editor) {
            return SceneManager._scene;
        }
        return null;
    }
    create() {
        super.create();
        this._currentModeTitle = HelpVocabulary.GetLocalizedString(HelpTextStrings.ModeNone);
        this._rootElement = KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_EditorWindow"), this);
        this.addChild(this._rootElement);
        this._contentParent = this["contentGroup"];
        this.refresh();
        // * By default backspace is not working in HTML Input field
        /*@ts-ignore*/
        Input._shouldPreventDefault = function () { return false; };
    }
    setMode(mode) {
        let localizedModeTitle = "";
        switch (mode) {
            case 'none':
                localizedModeTitle = HelpVocabulary.GetLocalizedString(HelpTextStrings.ModeNone);
                this.setActiveSection(this._objectsModeSection);
                break;
            case 'object':
                localizedModeTitle = HelpVocabulary.GetLocalizedString(HelpTextStrings.ModeObject);
                this.setActiveSection(this._objectsModeSection);
                break;
            case 'collisions':
                localizedModeTitle = HelpVocabulary.GetLocalizedString(HelpTextStrings.ModeCollisions);
                this.setActiveSection(this._collisionsModeSection);
                break;
            case 'layers':
                localizedModeTitle = HelpVocabulary.GetLocalizedString(HelpTextStrings.ModeGroups);
                this.setActiveSection(this._layersModeSection);
                break;
            default:
                console.warn("Unknown mode: " + mode);
                localizedModeTitle = "???";
                break;
        }
        this._currentModeTitle = localizedModeTitle;
        this.refresh();
    }
    changeCurrentObjectFromGame(index) {
        let currentSection = this._contentParent.children[0];
        if (currentSection instanceof Sprite_Editor_EMObjectsSection) {
            currentSection.changeCurrentObjectFromGame(index);
        }
    }
    changeLayerInfoFromGame(layerInfo) {
        let currentSection = this._contentParent.children[0];
        if (currentSection instanceof Sprite_Editor_EMLayersSection) {
            currentSection.setLayerInfo(layerInfo);
        }
    }
    currentModeText() {
        return this._currentModeTitle;
    }
    refresh() {
        var _a;
        this._rootElement.refreshBindings(this);
        (_a = this._section) === null || _a === void 0 ? void 0 : _a.refreshAllElements();
    }
    start() {
        super.start();
        this._objectsModeSection = new Sprite_Editor_EMObjectsSection(this._contentParent);
        this._collisionsModeSection = new Sprite_Editor_EMCollisionsSection(this._contentParent);
        this._layersModeSection = new Sprite_Editor_EMLayersSection(this._contentParent);
        this.setActiveSection(this._objectsModeSection);
    }
    setActiveSection(content) {
        if (this._section == content) {
            return;
        }
        if (this._section) {
            this._section.deactivate();
        }
        this._section = content;
        // * Remove all childrens from contentGroup
        this._contentParent.removeChildren();
        /*@ts-ignore*/
        this._contentParent.addChild(content);
        this.refresh();
        this._section.activate();
    }
    update() {
        super.update();
        if (Input.isTriggered('t')) {
            console.log("Test command to Game");
        }
    }
}


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Map.prototype;
    //@[ALIAS]
    const ALIAS__isReady = _.isReady;
    _.isReady = function () {
        let result = ALIAS__isReady.call(this);
        return result && EMObjectsManager.IsSpritesAreLoaded();
    };
    //@[ALIAS]
    const ALIAS__update = _.update;
    _.update = function (...args) {
        ALIAS__update.call(this, ...args);
        /*if(Input.isTriggered('n')) {
            EMapEditorManager.Activate();
        }*/
        EMapEditorManager.Update();
    };
})();
// ■ END Scene_Map.ts
//---------------------------------------------------------------------------


class SpriteAnimator {
    constructor(sprite, frames, speed) {
        this._frameIndex = 0;
        this._animationFrames = frames;
        this._animationSpeed = speed;
        this._animationTimer = 0;
        this._sprite = sprite;
        this._frameHeight = this._sprite.height;
        this._frameWidth = this._sprite.width / this._animationFrames;
        this._animationTimer = this._animationSpeed; // * To start from first frame
        this._sprite.setFrame(0, 0, this._frameWidth, this._frameHeight);
    }
    setAnimationSpeed(speed = 8) {
        this._animationSpeed = speed;
    }
    update() {
        this._animationTimer++;
        if (this._animationTimer >= this._animationSpeed) {
            this._animationTimer = 0;
            this._sprite.setFrame(this._frameWidth * this._frameIndex, 0, this._frameWidth, this._frameHeight);
            this._frameIndex++;
            if (this._frameIndex >= this._animationFrames) {
                this._frameIndex = 0;
            }
        }
    }
    static GetAnimationData(imageName) {
        // * Animated image name pattern: NAME!3, where 3 - frames count
        let regex = /(.*)!([0-9]+)/;
        let match = imageName.match(regex);
        if (match) {
            let frames = parseInt(match[2]);
            return { frames, speed: 8 };
        }
        return null;
    }
}


class Sprite_CollisionGrid extends KSprite {
    constructor() {
        super();
        this._outlineColor = "rgba(255, 0, 0, 0.5)";
        this._fillColor = "rgba(255, 0, 0, 0.2)";
        this._transparentOutlineColor = "rgba(255, 0, 255, 0.2)";
        this._transparentFillColor = "rgba(255, 0, 255, 0.1)";
        this._highlightOutlineColor = "rgba(0, 255, 0, 0.5)";
        this._highlightFillColor = "rgba(0, 255, 0, 0.2)";
        this._isFocusCurrentLayer = false;
        this._isHighlightCurrentLayer = false;
        this._create();
        /*@ts-ignore*/
        this.z = 1000;
    }
    static CreateGrid() {
        if (!this._currentGrid) {
            this._currentGrid = new Sprite_CollisionGrid();
            /*@ts-ignore*/
            SceneManager._scene._spriteset._tilemap.addChild(this._currentGrid);
        }
    }
    static RemoveGrid() {
        if (this._currentGrid) {
            this._currentGrid.destroy();
            this._currentGrid = null;
        }
    }
    static RefreshGrid() {
        if (this._currentGrid) {
            this._currentGrid._refreshCollisions();
        }
    }
    static SetFocusCurrentLayer(value) {
        if (this._currentGrid) {
            this._currentGrid._isFocusCurrentLayer = value;
        }
        this.RefreshGrid();
    }
    static SetHighlightCurrentLayer(value) {
        if (this._currentGrid) {
            this._currentGrid._isHighlightCurrentLayer = value;
        }
        this.RefreshGrid();
    }
    update() {
        super.update();
        if (this.visible) {
            this._updatePosition();
        }
    }
    _updatePosition() {
        let x = $gameMap.displayX() * $gameMap.tileWidth();
        let y = $gameMap.displayY() * $gameMap.tileHeight();
        this.x = -x;
        this.y = -y;
    }
    _create() {
        let width = $gameMap.width() * $gameMap.tileWidth();
        let height = $gameMap.height() * $gameMap.tileHeight();
        this.bitmap = new Bitmap(width, height);
        this._createCollisionsLayer();
        this._refreshCollisions();
    }
    _createCollisionsLayer() {
        this._collisionsLayer = new KSprite();
        this.addChild(this._collisionsLayer);
    }
    _refreshCollisions() {
        this._collisionsLayer.removeChildren();
        this._drawStoredCollisions();
    }
    _drawStoredCollisions() {
        let collisions = EMCollisionsManager.GetStoredCollisionsDataForMap($gameMap.mapId());
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let outlineColor;
        let fillColor;
        let activeLayer = EMapEditorManager.CurrentLayerIndex();
        collisions.forEach((c) => {
            let x = c.position.x * tw;
            let y = c.position.y * th;
            if (this._isFocusCurrentLayer && c.layerIndex !== activeLayer) {
                outlineColor = this._transparentOutlineColor;
                fillColor = this._transparentFillColor;
            }
            else if (this._isHighlightCurrentLayer && c.layerIndex === activeLayer) {
                outlineColor = this._highlightOutlineColor;
                fillColor = this._highlightFillColor;
            }
            else {
                outlineColor = this._outlineColor;
                fillColor = this._fillColor;
            }
            this._addCollisionCell(x, y, outlineColor, fillColor);
        });
    }
    _addCollisionCell(x, y, outerColor, innerColor) {
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let cell = new Bitmap(tw, th);
        if (KString.any(outerColor)) {
            cell.fillRect(0, 0, tw, 2, outerColor);
            cell.fillRect(0, 0, 2, th, outerColor);
            cell.fillRect(0, th - 2, tw, 2, outerColor);
            cell.fillRect(tw - 2, 0, 2, th, outerColor);
        }
        if (KString.any(innerColor)) {
            cell.fillRect(0, 0, tw, th, innerColor);
        }
        let sprite = new KSprite();
        sprite.bitmap = cell;
        sprite.x = x;
        sprite.y = y;
        this._collisionsLayer.addChild(sprite);
    }
}


class Sprite_ConfirmButton extends KNSprite {
    constructor(titleText, clickHandler, _width = 300, _height = 80) {
        super();
        this._width = _width;
        this._height = _height;
        this._isConfirmButtonsVisible = false;
        this._create();
        this.setText(titleText);
        this._onConfirmHandler = clickHandler;
        this._button.setClickHandler(this._onButtonClick.bind(this));
        this._yesButton.setClickHandler(this.onYesButtonClick.bind(this));
        this._noButton.setClickHandler(this._onNoButtonClick.bind(this));
    }
    _onButtonClick() {
        this._isConfirmButtonsVisible = true;
        this.refreshBindings(this, true);
        this._playConfirmEnterAnimation();
    }
    _playConfirmEnterAnimation() {
        let rule = this._confirmGroup.addAnimationRule({
            field: "x",
            duration: 0.25,
            relative: true,
            // * Shake effect
            keyframes: {
                "0": 0,
                "10": -10,
                "20": 10,
                "50": 0,
                "60": -10,
                "90": 10,
                "100": 0
            }
        });
        this._confirmGroup.addAnimationRule({
            field: "opacity",
            duration: 0.25,
            keyframes: {
                "0": 0,
                "100": 255
            }
        });
        rule.setEndCallback(() => {
            this.refreshBindings(this, true);
        });
    }
    _onNoButtonClick() {
        this._isConfirmButtonsVisible = false;
        this.refreshBindings(this, true);
    }
    onYesButtonClick() {
        this._onNoButtonClick();
        if (this._onConfirmHandler)
            this._onConfirmHandler();
    }
    reset() {
        if (this.isConfirmButtonsVisible()) {
            this._onNoButtonClick();
        }
    }
    setText(text) {
        try {
            this._text.drawText(text);
        }
        catch (error) {
            console.warn(error);
        }
    }
    isConfirmButtonsVisible() {
        return this._isConfirmButtonsVisible == true;
    }
    isMainButtonsVisible() {
        return !this.isConfirmButtonsVisible();
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
    }
    _scheme() {
        //let _width = NUtils.ConvertDimension("300hdp");
        //let _height = NUtils.ConvertDimension("80hdp");
        return {
            type: KNItemsTypes.rect,
            parameters: {
                width: this._width,
                height: this._height,
                strokeWidth: 0,
                fillColor: "#3C3D37",
                strokeColor: "#FFFFFF"
            },
            childrens: [
                {
                    type: KNItemsTypes.button,
                    id: "_button",
                    parameters: {
                        folderName: 'PKD_MapEnhancer/EditorUI',
                        imageName: "buttonA",
                        margins: 12
                    },
                    bindings: {
                        size: {
                            width: "100%",
                            height: "100%"
                        },
                        position: {
                            x: "center",
                            y: "center"
                        },
                        visible: "$isMainButtonsVisible"
                    },
                    childrens: [
                        {
                            type: KNItemsTypes.text,
                            id: "_text",
                            parameters: {
                                text: "Confirm",
                                textColor: "#FFFFFF"
                            },
                            bindings: {
                                size: {
                                    width: "100%",
                                    height: "100%"
                                },
                                fontSize: "20hdp"
                            }
                        }
                    ]
                },
                {
                    type: KNItemsTypes.group,
                    id: "_confirmGroup",
                    bindings: {
                        size: {
                            width: "100%",
                            height: "100%"
                        },
                        position: {
                            x: "center",
                            y: "center"
                        },
                        visible: "$isConfirmButtonsVisible"
                    },
                    childrens: [
                        // * NO , "Are you sure?" , YES
                        this._confirmButton("_noButton"),
                        {
                            type: KNItemsTypes.text,
                            id: "_confirmText",
                            parameters: {
                                text: "Are you sure?",
                                textColor: "#FFFFFF"
                            },
                            bindings: {
                                size: {
                                    width: "50%",
                                    height: "100%"
                                },
                                position: {
                                    x: "prevEndX + 4",
                                    y: 0
                                },
                                fontSize: "20hdp"
                            }
                        },
                        this._confirmButton("_yesButton")
                    ]
                }
            ]
        };
    }
    _confirmButton(id) {
        let text = "☓";
        let xPosition = "0";
        let tintColor = "#FF0000";
        if (id == "_yesButton") {
            text = "✓";
            xPosition = "right";
            tintColor = "#00FF00";
        }
        return {
            type: KNItemsTypes.button,
            id: id,
            parameters: {
                folderName: 'PKD_MapEnhancer/EditorUI',
                imageName: "buttonA",
                tint: tintColor,
                tintAlpha: 0.15
            },
            bindings: {
                size: {
                    width: "25%",
                    height: "80%"
                },
                position: {
                    x: xPosition,
                    y: "center"
                }
            },
            childrens: [
                {
                    type: KNItemsTypes.text,
                    parameters: {
                        text: text,
                        textColor: "#FFFFFF"
                    },
                    bindings: {
                        size: {
                            width: "100%",
                            height: "100%"
                        },
                        fontSize: "16hdp"
                    }
                }
            ]
        };
    }
}


class Sprite_DefaultCollisionsGrid extends KSprite {
    constructor() {
        super();
        this._create();
        /*@ts-ignore*/
        this.z = 999;
        this.visible = false;
    }
    static CreateGrid() {
        if (!this._currentGrid) {
            this._currentGrid = new Sprite_DefaultCollisionsGrid();
            /*@ts-ignore*/
            SceneManager._scene._spriteset._tilemap.addChild(this._currentGrid);
        }
    }
    static RemoveGrid() {
        if (this._currentGrid) {
            this._currentGrid.destroy();
            this._currentGrid = null;
        }
    }
    static RefreshGrid() {
        if (this._currentGrid) {
            this._currentGrid._refreshCollisions();
        }
    }
    static ToggleVisibility() {
        if (this._currentGrid) {
            this._currentGrid.visible = !this._currentGrid.visible;
        }
    }
    update() {
        super.update();
        if (this.visible) {
            this._updatePosition();
        }
    }
    _updatePosition() {
        let x = $gameMap.displayX() * $gameMap.tileWidth();
        let y = $gameMap.displayY() * $gameMap.tileHeight();
        this.x = -x;
        this.y = -y;
    }
    _create() {
        let width = $gameMap.width() * $gameMap.tileWidth();
        let height = $gameMap.height() * $gameMap.tileHeight();
        this.bitmap = new Bitmap(width, height);
        this._createCollisionsLayer();
        this._refreshCollisions();
    }
    _createCollisionsLayer() {
        this._collisionsLayer = new KSprite();
        this.addChild(this._collisionsLayer);
    }
    _refreshCollisions() {
        // * Remove all children from collisions layer
        this._collisionsLayer.removeChildren();
        this._drawDefaultMapCollisions();
    }
    _drawDefaultMapCollisions() {
        let storedCollisions = EMCollisionsManager.GetStoredCollisionsPositionsForMap($gameMap.mapId());
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        for (let x = 0; x < $gameMap.width(); x++) {
            for (let y = 0; y < $gameMap.height(); y++) {
                // * Ignore point if it in stored collisions
                let isStored = storedCollisions.some((c) => c.x === x && c.y === y);
                if (isStored) {
                    continue;
                }
                let isPassable = this._isMapCellPassable(x, y);
                if (!isPassable) {
                    let cx = x * tw;
                    let cy = y * th;
                    this._addCollisionCell(cx, cy, null, "rgba(255, 255, 0, 0.5)");
                }
            }
        }
    }
    _isMapCellPassable(x, y) {
        // * We should check all directions (2, 4, 6, 8)
        let passable = false;
        for (let i = 2; i <= 8; i += 2) {
            if ($gameMap.checkPassage(x, y, i)) {
                passable = true;
                break;
            }
        }
        return passable;
    }
    _addCollisionCell(x, y, outerColor, innerColor) {
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let cell = new Bitmap(tw, th);
        if (KString.any(outerColor)) {
            cell.fillRect(0, 0, tw, 2, outerColor);
            cell.fillRect(0, 0, 2, th, outerColor);
            cell.fillRect(0, th - 2, tw, 2, outerColor);
            cell.fillRect(tw - 2, 0, 2, th, outerColor);
        }
        if (KString.any(innerColor)) {
            cell.fillRect(0, 0, tw, th, innerColor);
        }
        let sprite = new KSprite();
        sprite.bitmap = cell;
        sprite.x = x;
        sprite.y = y;
        this._collisionsLayer.addChild(sprite);
    }
}


class Sprite_EMEditorMapUI extends KNSprite {
    constructor() {
        super();
        this._hightlightTime = 20;
        this._highlightedObjects = [];
        this._highlightAutoTurnOffThread = null;
        this._extraContent = null;
        this._create();
    }
    static Create() {
        this.Destroy();
        let sprite = new Sprite_EMEditorMapUI();
        SceneManager._scene.addChild(sprite);
        this._instance = sprite;
    }
    static Destroy() {
        if (this._instance) {
            this._instance.removeFromParent();
        }
        this._instance = null;
    }
    static Refresh() {
        try {
            if (this._instance) {
                this._instance.refresh();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    static HighlightObjects(objects, autoTurnOff = true) {
        try {
            if (this._instance) {
                this._instance.highlightObjects(objects, autoTurnOff);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    static ClearHighlight() {
        this.HighlightObjects([], false);
    }
    highlightObjects(objects, autoTurnOff = true) {
        var _a;
        try {
            this.clearHighlightedObjects();
            (_a = this._highlightAutoTurnOffThread) === null || _a === void 0 ? void 0 : _a.stop();
            this._highlightAutoTurnOffThread = null;
            objects.forEach((object) => {
                let hObject = new Sprite_PhantomOutline(object, '#FFFF00');
                this.addChild(hObject);
                this._highlightedObjects.push(hObject);
            });
            if (autoTurnOff) {
                this._highlightAutoTurnOffThread = new KDX.TimedUpdate(this._hightlightTime, () => {
                    this.clearHighlightedObjects();
                });
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    clearHighlightedObjects() {
        try {
            if (this._highlightedObjects.length > 0) {
                this._highlightedObjects.forEach((hObject) => {
                    hObject.removeFromParent();
                });
            }
            this._highlightedObjects = [];
        }
        catch (error) {
            console.warn(error);
            this._highlightedObjects = [];
        }
    }
    update() {
        var _a;
        super.update();
        (_a = this._highlightAutoTurnOffThread) === null || _a === void 0 ? void 0 : _a.update();
    }
    refresh() {
        this.refreshBindings(this);
    }
    layerIndex() {
        return EMapEditorManager.CurrentLayerIndex();
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_MapUI"), this);
        this._createChangeModeHelpText();
        this.refreshBindings(this);
    }
    _createChangeModeHelpText() {
        var _a;
        let changeModeHelpText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangeMode);
        let element = HelpTextBuilder.New().AddKeyWs('1').AddKeyWs('2').AddKeyWs('3').AddText(changeModeHelpText).Build();
        (_a = this._extraContent) === null || _a === void 0 ? void 0 : _a.addChild(element);
        element.refreshBindings(null, true);
        this.refreshBindings(this, true);
        element.setPosition('right - width / 2', 0);
    }
}


const DefaultEMObjectConfig = {
    uniqueId: '',
    mapId: 0,
    layerIndex: 0,
    imageName: '',
    folderName: '',
    isFlipped: false,
    linkedX: -1,
    linkedY: -1,
    zIndex: 3,
    globalScale: 1,
    globalRotation: 0,
    localRotation: 0,
    blendMode: 0,
    hue: 0,
    animationSpeed: 5, // * Only for animated objects
    opacity: 255
};
class Sprite_EMObject extends KSprite {
    constructor(_config) {
        super();
        this._config = _config;
        this._pressedEditButtons = [];
        this._extraMovementByX = 0;
        this._extraMovementByY = 0;
        this._config = Object.assign({}, DefaultEMObjectConfig, _config);
        this._initialize();
        this._create();
    }
    static FromConfig(config) {
        return new Sprite_EMObject(config);
    }
    static New(imageName, folderName = 'Trees', uniqueId = '') {
        if (!KString.any(uniqueId)) {
            uniqueId = $gameMap.mapId() + "_" + folderName + "/" + imageName + "#" + KString.randomString(10);
        }
        return new Sprite_EMObject({
            uniqueId: uniqueId,
            mapId: $gameMap.mapId(),
            imageName: imageName,
            folderName: folderName,
        });
    }
    static Phantom(sprite) {
        let clone = Sprite_EMObject.New(sprite._config.imageName, sprite._config.folderName, "phantom");
        clone.copyParametersFrom(sprite);
        clone._config.opacity = 255;
        clone._config.blendMode = 0;
        clone._objectImage.blendMode = 0;
        clone.refresh();
        /*@ts-ignore*/
        clone._updatePosition = () => { };
        return clone;
    }
    copyParametersFrom(sprite) {
        // * Copy all parameters from another sprite, except linkedX and linkedY and imageName and folderName and uniqueId
        this._config.globalScale = sprite._config.globalScale;
        this._config.globalRotation = sprite._config.globalRotation;
        this._config.localRotation = sprite._config.localRotation;
        this._config.zIndex = sprite._config.zIndex;
        this._config.isFlipped = sprite._config.isFlipped;
        this._config.layerIndex = sprite._config.layerIndex;
        this._config.mapId = sprite._config.mapId;
        this._config.blendMode = sprite._config.blendMode;
        this._config.hue = sprite._config.hue;
        this._config.animationSpeed = sprite._config.animationSpeed;
        this._config.opacity = sprite._config.opacity;
        this._alignmentGrid = sprite._alignmentGrid;
        this._extraMovementByX = sprite._extraMovementByX;
        this._extraMovementByY = sprite._extraMovementByY;
        this._disabledCursorMoveByXAxis = sprite._disabledCursorMoveByXAxis;
        this._disabledCursorMoveByYAxis = sprite._disabledCursorMoveByYAxis;
        this.refresh();
    }
    makeTransparent() {
        if (this.isInEditMode()) {
            return;
        }
        this.opacity = 100;
    }
    resetTransparency() {
        this.opacity = 255;
    }
    addToTilemap() {
        if (SceneManager._scene instanceof Scene_Map) {
            /*@ts-ignore*/
            SceneManager._scene._spriteset._tilemap.addChild(this);
        }
    }
    isLoaded() {
        return this._objectImage.bitmap.isReady();
    }
    isHoveredByCursor() {
        try {
            if (!this.isCursorInside())
                return false;
            let localPoint = this._objectImage.toLocalPoint(new Point(TouchInput.x, TouchInput.y));
            let localBounds = this._objectImage.getLocalBounds();
            let x = Math.floor(localPoint.x - localBounds.x);
            let y = Math.floor(localPoint.y - localBounds.y);
            if (x < 0 || y < 0)
                return false;
            if (x >= this._objectImage.bitmap.width || y >= this._objectImage.bitmap.height)
                return false;
            let alpha = Number(this._objectImage.bitmap.getAlphaPixel(x, y));
            return alpha > 100;
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    }
    update() {
        super.update();
        if (this._spriteAnimator) {
            this._spriteAnimator.update();
        }
        this._updatePosition();
        if (EMapEditorManager.IsObjectMode() && this.isInEditMode()) {
            this._updateEditingHotkeys();
            this._refreshValuesFromConfig();
        }
        this._updateVisibilityByLayerCondition();
    }
    edit() {
        this._inEditMode = true;
        this._unlinkFromMap();
    }
    isInEditMode() {
        return this._inEditMode == true;
    }
    finalize() {
        this._inEditMode = false;
        this._updateEditingTools(); // * Disable all tools
        this._linkToMap();
        this.refresh();
    }
    refresh() {
        this._refreshValuesFromConfig();
    }
    getConfig() {
        return this._config;
    }
    destroy() {
        super.destroy(...arguments);
        if (this._3dModel) {
            this._3dModel.dispose();
        }
    }
    removeFromParent() {
        super.removeFromParent();
        if (this._3dModel) {
            this._3dModel.dispose();
        }
    }
    _unlinkFromMap() {
        if (this._config.linkedX != -1 && this._config.linkedY != -1) {
            this._extraMovementByX = this.x - TouchInput.x;
            this._extraMovementByY = this.y - TouchInput.y;
        }
    }
    _updateVisibilityByLayerCondition() {
        if (EMapEditorManager.IsActive()) {
            this.visible = true;
            return;
        }
        else {
            this.visible = EMLayersManager.IsLayerConditionTrue(this.getLayerIndex());
        }
    }
    isAnyEditButtonPressed() {
        return this._pressedEditButtons.length > 0;
    }
    isAnyOtherButtonPressedThen(button) {
        // * Нажата ли какая-то другая кнопка, кроме указанной
        return this._pressedEditButtons.length > 0 && !this._pressedEditButtons.includes(button);
    }
    _linkToMap() {
        this._config.linkedX = (TouchInput.x + this._extraMovementByX) + $gameMap._displayX * this._tileWidth;
        this._config.linkedY = (TouchInput.y + this._extraMovementByY) + $gameMap._displayY * this._tileHeight;
    }
    resetCursorPosition() {
        this._extraMovementByX = 0;
        this._extraMovementByY = 0;
    }
    realWidth() {
        if (this._objectImage) {
            return this._objectImage.width;
        }
        else {
            return this.width;
        }
    }
    realHeight() {
        if (this._objectImage) {
            return this._objectImage.height;
        }
        else {
            return this.height;
        }
    }
    screenX() {
        var value = this._config.linkedX;
        value -= $gameMap._displayX * this._tileWidth;
        if (value + this.width < 0 && $gameMap.isLoopHorizontal()) {
            value += this._mapWidth;
        }
        return Math.ceil(value);
    }
    screenY() {
        var value = this._config.linkedY;
        value -= $gameMap._displayY * this._tileHeight;
        if (value + this.height < 0 && $gameMap.isLoopVertical()) {
            value += this._mapHeight;
        }
        return Math.ceil(value);
    }
    setLayer(layerIndex) {
        this._config.layerIndex = layerIndex;
    }
    getLayerIndex() {
        return this._config.layerIndex;
    }
    getCurrentScale() {
        let scale = this._config.globalScale;
        // * 0.0 format string
        return parseFloat(scale.toFixed(1));
    }
    getCurrentZIndex() {
        return 'Z: ' + this._config.zIndex;
    }
    getCurrentBlendModeName() {
        let blendMode = this._config.blendMode;
        // Blend mode  (0 = normal, 1 = add, 2 = multiply, 3 = screen)
        switch (blendMode) {
            case 0: return 'Normal';
            case 1: return 'Add';
            case 2: return 'Multiply';
            case 3: return 'Screen';
        }
    }
    getCurrentHue() {
        return this._config.hue + "°";
    }
    getCurrentAnimationSpeed() {
        return this._config.animationSpeed + "x";
    }
    getCurrentOpacity() {
        return this._config.opacity;
    }
    getCurrentRotation() {
        let rotation;
        if (Input.isPressed(ToolsKeys.globalRotation)) {
            rotation = this._config.globalRotation;
        }
        else
            rotation = this._config.localRotation;
        // * Convert from Rad to Deg
        rotation = rotation * (180 / Math.PI);
        rotation = parseFloat(rotation.toFixed(1));
        return rotation + "°";
    }
    _initialize() {
        this._tileWidth = $gameMap.tileWidth();
        this._tileHeight = $gameMap.tileHeight();
        this._mapWidth = $gameMap.width() * this._tileWidth;
        this._mapHeight = $gameMap.height() * this._tileHeight;
    }
    _create() {
        this._createImageObject();
        this._readConfig();
    }
    _createImageObject() {
        this._objectImage = new KSprite(ImageManager.loadBitmap('img/PKD_MapEnhancer/Assets/' + this._config.folderName + "/", this._config.imageName, 0, false));
        this.addChild(this._objectImage);
        this._objectImage.anchor.x = 0.5;
        this._objectImage.anchor.y = 0.5;
        this._objectImage.bitmap.addLoadListener(this._onImageLoaded.bind(this));
    }
    _readConfig() {
        try {
            this._refreshValuesFromConfig();
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updatePosition() {
        if (!this.isInEditMode()) {
            this.x = this.screenX();
            this.y = this.screenY();
        }
        else {
            if (this._alignmentGrid) {
                let alignedPosition = Sprite_GuideGrid.GetAlignedPosition({ x: TouchInput.x, y: TouchInput.y });
                this._extraMovementByX = alignedPosition.x - TouchInput.x;
                this._extraMovementByY = alignedPosition.y - TouchInput.y;
            }
            if (!this._disabledCursorMoveByXAxis) {
                this.x = TouchInput.x + this._extraMovementByX;
            }
            if (!this._disabledCursorMoveByYAxis) {
                this.y = TouchInput.y + this._extraMovementByY;
            }
        }
        this._updateModel();
    }
    _refreshValuesFromConfig() {
        /*@ts-ignore*/
        this.z = this._config.zIndex;
        this.scale.x = this._config.globalScale;
        this.scale.y = this._config.globalScale;
        this.rotation = this._config.globalRotation;
        this._objectImage.rotation = this._config.localRotation;
        this._objectImage.scale.x = this._config.isFlipped ? -1 : 1;
        this._objectImage.blendMode = this._config.blendMode;
        this._objectImage.opacity = this._config.opacity;
        this._refreshHueFilter();
        if (this._spriteAnimator) {
            this._spriteAnimator.setAnimationSpeed(this._config.animationSpeed);
        }
    }
    _refreshHueFilter() {
        if (this._config.hue == 0) {
            this.filters = [];
            return;
        }
        this.filters = [
            /*@ts-ignore*/
            new PIXI.filters.HslAdjustmentFilter({ hue: this._config.hue })
        ];
    }
    _updateEditingHotkeys() {
        this._updateEditingTools();
        if (!this.isAnyEditButtonPressed()) {
            if (Input.isTriggered(ToolsKeys.flip)) {
                this._config.isFlipped = !this._config.isFlipped;
                return;
            }
            if (Input.isTriggered(ToolsKeys.resetCursor)) {
                this.resetCursorPosition();
                return;
            }
            if (TouchInput.isCancelled()) {
                EMapEditorManager.CancelObjectPlacement();
                TouchInput.clear();
                return;
            }
            EMapEditorManager.RefreshObjectChange(this._getValueFromScrollWheel());
        }
        if (TouchInput.isTriggered()) {
            setTimeout(() => {
                EMapEditorManager.OnCurrentObjectPlaced();
            }, 1); // * Next frame, because will be infinite loop
            return;
        }
    }
    _updateEditingTools() {
        this._updateXYAxisGuidlines();
        this._updateGridTool();
        this._updateScaleTool();
        this._updateRotationTool();
        this._updateOpacityTool();
        this._updateLayerIndexChange();
        this._updateZIndexChange();
        this._updateBlendModeTool();
        this._updateHueTool();
        this._updateAnimationSpeedTool();
        this._updateKeyboardMovement();
    }
    _updateXYAxisGuidlines() {
        this._handleButtonPressAction(ToolsKeys.xAxis, // * X key == 'cancel'
        () => {
            Sprite_GuideLine.ShowHorizontal();
            this._disabledCursorMoveByYAxis = true;
            this._extraMovementByX += this._getValueFromScrollWheel();
        }, () => {
            this._disabledCursorMoveByYAxis = false;
            Sprite_GuideLine.HideHorizontal();
        });
        this._handleButtonPressAction(ToolsKeys.yAsix, () => {
            Sprite_GuideLine.ShowVertical();
            this._disabledCursorMoveByXAxis = true;
            this._extraMovementByY += this._getValueFromScrollWheel();
        }, () => {
            this._disabledCursorMoveByXAxis = false;
            Sprite_GuideLine.HideVertical();
        });
    }
    _updateGridTool() {
        this._handleButtonPressAction(ToolsKeys.grid, () => {
            Sprite_GuideGrid.Show();
            Sprite_GuideGrid.ChangeSize(this._getValueFromScrollWheel());
            this._alignmentGrid = true;
        }, () => {
            Sprite_GuideGrid.Hide();
            this._alignmentGrid = false;
        });
    }
    _updateScaleTool() {
        this._handleButtonPressAction(ToolsKeys.scale, () => {
            Sprite_ToolGrid.ShowScaleFor(this);
            this._config.globalScale += this._getValueFromScrollWheel() * 0.1;
            this._config.globalScale += this._getValueFromScrollWheel() * 0.1;
            if (TouchInput.isCancelled()) {
                this._config.globalScale = 1;
            }
        }, () => {
            Sprite_ToolGrid.HideScaleGrid();
        });
    }
    _updateRotationTool() {
        this._handleButtonPressAction(ToolsKeys.rotation, () => {
            Sprite_ToolGrid.ShowRotationFor(this);
            if (Input.isPressed(ToolsKeys.globalRotation)) {
                Sprite_RotationAnchor.ShowFor(this);
                this._config.globalRotation += this._getValueFromScrollWheel() * 0.1;
                if (TouchInput.isCancelled()) {
                    this._config.globalRotation = 0;
                }
            }
            else {
                Sprite_RotationAnchor.ShowFor(this._objectImage);
                this._config.localRotation += this._getValueFromScrollWheel() * 0.1;
                if (TouchInput.isCancelled()) {
                    this._config.localRotation = 0;
                }
            }
        }, () => {
            Sprite_ToolGrid.HideRotationGrid();
            Sprite_RotationAnchor.Hide();
        });
    }
    _updateOpacityTool() {
        this._handleButtonPressAction(ToolsKeys.opacity, () => {
            Sprite_ToolGrid.ShowOpacityFor(this);
            // * Change opacity from 0 to 255
            this._config.opacity += this._getValueFromScrollWheel() * 10;
            if (this._config.opacity < 0) {
                this._config.opacity = 0;
            }
            else if (this._config.opacity > 255) {
                this._config.opacity = 255;
            }
            if (TouchInput.isCancelled()) {
                this._config.opacity = 255;
            }
        }, () => {
            Sprite_ToolGrid.HideOpacityGrid();
        });
    }
    _updateZIndexChange() {
        this._handleButtonPressAction(ToolsKeys.zIndex, () => {
            Sprite_ToolGrid.ShowZIndexFor(this);
            Sprite_PhantomOutline.ShowForZIndex(this);
            this._config.zIndex += this._getValueFromScrollWheel();
        }, () => {
            Sprite_PhantomOutline.HideForZIndex();
            Sprite_ToolGrid.HideZIndexGrid();
        });
    }
    _updateKeyboardMovement() {
        if (this.isAnyEditButtonPressed()) {
            return;
        }
        if (Input.isPressed('left')) {
            this._extraMovementByX -= 1;
        }
        if (Input.isPressed('right')) {
            this._extraMovementByX += 1;
        }
        if (Input.isPressed('up')) {
            this._extraMovementByY -= 1;
        }
        if (Input.isPressed('down')) {
            this._extraMovementByY += 1;
        }
    }
    _updateLayerIndexChange() {
        this._handleButtonPressAction(ToolsKeys.layerIndex, () => {
            EMapEditorManager.ChangeLayer(this._getValueFromScrollWheel());
        }, () => {
        });
    }
    _updateBlendModeTool() {
        this._handleButtonPressAction(ToolsKeys.blendMode, () => {
            Sprite_ToolGrid.ShowBlendModeFor(this);
            Sprite_PhantomOutline.ShowForBlend(this);
            this._config.blendMode += this._getValueFromScrollWheel();
            if (this._config.blendMode < 0) {
                this._config.blendMode = 0;
            }
            else if (this._config.blendMode > 3) {
                this._config.blendMode = 3;
            }
        }, () => {
            Sprite_PhantomOutline.HideForBlend();
            Sprite_ToolGrid.HideBlendModeGrid();
        });
    }
    _updateHueTool() {
        this._handleButtonPressAction(ToolsKeys.hue, () => {
            Sprite_ToolGrid.ShowHueModeFor(this);
            this._config.hue += this._getValueFromScrollWheel() * 10;
            if (this._config.hue < -180) {
                this._config.hue = -180;
            }
            else if (this._config.hue > 180) {
                this._config.hue = 180;
            }
            if (TouchInput.isCancelled()) {
                this._config.hue = 0;
            }
        }, () => {
            Sprite_ToolGrid.HideHueModeGrid();
        });
    }
    _updateAnimationSpeedTool() {
        if (!this._spriteAnimator) {
            if (Input.isTriggered(ToolsKeys.animationSpeed)) {
                console.warn("This object has no animation data");
                SoundManager.playBuzzer();
            }
            return;
        }
        this._handleButtonPressAction(ToolsKeys.animationSpeed, () => {
            Sprite_ToolGrid.ShowAnimationSpeedFor(this);
            this._config.animationSpeed += this._getValueFromScrollWheel();
            if (this._config.animationSpeed < 1) {
                this._config.animationSpeed = 1;
            }
        }, () => {
            Sprite_ToolGrid.HideAnimationSpeedGrid();
        });
    }
    _handleButtonPressAction(button, actionOnPressed, actionOnReleased) {
        if (this._isOnlyPressed(button)) {
            actionOnPressed();
            this._onButtonIsPressed(button);
        }
        else {
            actionOnReleased();
            this._onButtonIsReleased(button);
        }
    }
    _isOnlyPressed(button) {
        return this.isInEditMode() && Input.isPressed(button) && !this.isAnyOtherButtonPressedThen(button);
    }
    _onButtonIsPressed(button) {
        if (!this._pressedEditButtons.includes(button)) {
            this._pressedEditButtons.push(button);
        }
    }
    _onButtonIsReleased(button) {
        this._pressedEditButtons = KArray.deleteAll(this._pressedEditButtons, button);
    }
    _getValueFromScrollWheel() {
        const threshold = 20;
        if (TouchInput.wheelY >= threshold) {
            return 1;
        }
        else if (TouchInput.wheelY <= -threshold) {
            return -1;
        }
        return 0;
    }
    _onImageLoaded() {
        this._objectImage.y = -this._objectImage.height / 2;
        this._checkIfImageIsAnimated();
        if (this._isMz3D()) {
            this._create3dObject();
        }
    }
    _isMz3D() {
        if (window['mz3d']) {
            return true;
        }
        else {
            return false;
        }
    }
    _create3dObject() {
        /*@ts-ignore*/
        let model = new mz3d.Model();
        let imageWidth = this._objectImage.bitmap.width;
        let imageHeight = this._objectImage.bitmap.height;
        /*@ts-ignore*/
        model.setMeshForShape(mz3d.enumShapes.SPRITE);
        model.setMaterial(
        /*@ts-ignore*/
        mz3d.getMapEnhancerImage("img/PKD_MapEnhancer/Assets/" +
            this._config.folderName, this._config.imageName + ".png")).then(() => {
            model.cropTexture(0, 0, imageWidth, imageHeight);
        });
        this._3dModel = model;
        this._updateModel();
    }
    _updateModel() {
        if (!this._3dModel)
            return;
        this._3dModel.setEnabled(this.visible);
        if (!this._3dModel.isEnabled())
            return;
        // convert to tile coordinates
        let modelX = ($gameMap._displayX * $gameMap.tileWidth() + this.x) / $gameMap.tileWidth();
        let modelY = ($gameMap._displayY * $gameMap.tileHeight() + this.y) / $gameMap.tileHeight();
        this._3dModel.x = modelX;
        this._3dModel.y = modelY;
        let imageWidth = this._objectImage.bitmap.width;
        let imageHeight = this._objectImage.bitmap.height;
        this._3dModel.scaling.set(imageWidth / $gameMap.tileWidth() * this._config.globalScale, imageHeight / $gameMap.tileHeight() * this._config.globalScale, 1);
    }
    _checkIfImageIsAnimated() {
        try {
            let data = SpriteAnimator.GetAnimationData(this._config.imageName);
            if (data) {
                this._createAnimator(data.frames, data.speed);
            }
        }
        catch (error) {
            console.warn(error);
            this._spriteAnimator = null;
        }
    }
    _createAnimator(frames, speed) {
        try {
            let animator = new SpriteAnimator(this._objectImage, frames, speed);
            this._spriteAnimator = animator;
            this._spriteAnimator.setAnimationSpeed(this._config.animationSpeed);
        }
        catch (error) {
            console.warn(error);
            this._spriteAnimator = null;
        }
    }
}


class Sprite_Editor_DropDown extends KNSprite {
    constructor() {
        super();
        this._currentButtonCaption = "Test";
        this._iconName = "folder";
        this._create();
    }
    deactivate() {
        var _a;
        (_a = this['dropDownButton']) === null || _a === void 0 ? void 0 : _a.disable();
    }
    activate() {
        var _a;
        (_a = this['dropDownButton']) === null || _a === void 0 ? void 0 : _a.enable();
    }
    setButtonCaption(caption) {
        this._currentButtonCaption = caption;
        this.refreshBindings(this);
    }
    setClickHandler(handler) {
        var _a;
        (_a = this['dropDownButton']) === null || _a === void 0 ? void 0 : _a.addClickHandler(handler);
    }
    currentButtonCaptionText() {
        return this._currentButtonCaption;
    }
    iconName() {
        return this._iconName;
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_DropDown"), this);
        this.refreshBindings(this);
    }
}


class Sprite_Editor_EMCollisionsSection extends KNSprite {
    //%[IDEA] Рисовать небольшую карту коллизий (размер camera viewport)
    //%[IDEA] Обновлять текст на кнопке, указывая на кол-во коллизий и группу (которые будут удалены)
    constructor(_parentSizeData) {
        super();
        this._parentSizeData = _parentSizeData;
        this._create();
    }
    activate() {
        var _a;
        (_a = this._deleteAllButton) === null || _a === void 0 ? void 0 : _a.reset();
        this.refreshAllElements();
    }
    deactivate() {
    }
    refreshAllElements() {
        var _a;
        this.refreshBindings();
        (_a = this._deleteAllButton) === null || _a === void 0 ? void 0 : _a.refreshBindings(this._deleteAllButton);
    }
    realHeight() {
        if (this._parentSizeData) {
            return this._parentSizeData.realHeight();
        }
        else {
            return this.height;
        }
    }
    realWidth() {
        if (this._parentSizeData) {
            return this._parentSizeData.realWidth();
        }
        else {
            return this.width;
        }
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_EditorCollisionsModeSection"), this);
        this.refreshBindings(null);
        this._createDeleteAllButton();
    }
    _createDeleteAllButton() {
        if (this._deleteAllButtonContainer) {
            let deleteAllButtonTitleText = HelpVocabulary.GetLocalizedString(HelpTextStrings.DeleteAllCollisions);
            this._deleteAllButton = new Sprite_ConfirmButton(deleteAllButtonTitleText, this._onDeleteAllCollisions.bind(this), this._deleteAllButtonContainer.realWidth(), this._deleteAllButtonContainer.realHeight());
            this._deleteAllButtonContainer.addChild(this._deleteAllButton);
        }
        this.refreshAllElements();
    }
    _onDeleteAllCollisions() {
        console.log("Delete all collisions");
        EM_EditorWindowHandler.SendCommandToGameWindow('removeAllCollidersForLayer', {});
    }
}


class Sprite_Editor_EMLayersSection extends KNSprite {
    constructor(_parentSizeData) {
        super();
        this._parentSizeData = _parentSizeData;
        this._layerInfo = null;
        this._root = null;
        this._inputElement = null;
        this._create();
    }
    setLayerInfo(info) {
        //console.log("Set layer info", info);
        this._layerInfo = info;
        this.refreshAllElements();
    }
    layerIndex() {
        if (this._layerInfo) {
            return this._layerInfo.layerIndex;
        }
        else
            return 0;
    }
    layerObjectsCount() {
        if (this._layerInfo) {
            return this._layerInfo.objectsCount;
        }
        else
            return 0;
    }
    layerCollidersCount() {
        if (this._layerInfo) {
            return this._layerInfo.collidersCount;
        }
        else
            return 0;
    }
    layerRegionsCount() {
        if (this._layerInfo) {
            return this._layerInfo.regionsCount;
        }
        else
            return 0;
    }
    layerConditionText() {
        if (this._layerInfo) {
            return this._layerInfo.condition;
        }
        else
            return "";
    }
    activate() {
        var _a;
        (_a = this._deleteAllButton) === null || _a === void 0 ? void 0 : _a.reset();
        this._lastLayerConditionText = '';
        this.refreshAllElements();
        this._inputElement.style.display = 'block';
        this._autosaveInterval = setInterval(() => {
            this._sendLayerConditionToGame();
        }, 500);
    }
    deactivate() {
        this._sendLayerConditionToGame();
        this.refreshAllElements();
        this._inputElement.style.display = 'none';
        clearInterval(this._autosaveInterval);
    }
    refreshAllElements() {
        var _a;
        this.refreshBindings(this, true);
        if (this._inputElement)
            this._inputElement.value = this.layerConditionText();
        (_a = this._deleteAllButton) === null || _a === void 0 ? void 0 : _a.refreshBindings(this._deleteAllButton);
    }
    realHeight() {
        if (this._parentSizeData) {
            return this._parentSizeData.realHeight();
        }
        else {
            return this.height;
        }
    }
    realWidth() {
        if (this._parentSizeData) {
            return this._parentSizeData.realWidth();
        }
        else {
            return this.width;
        }
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_EditorLayersModeSection"), this);
        this.refreshBindings(this);
        this._addHtmlInputElement();
        this._createDeleteAllButton();
    }
    _addHtmlInputElement() {
        const input = document.createElement('input');
        input.style.position = 'absolute';
        let styleSettings = this._root.uiConstant('inputStyle');
        input.style.left = styleSettings.left;
        input.style.bottom = styleSettings.bottom;
        input.style.width = styleSettings.width;
        input.style.height = styleSettings.height;
        input.style.zIndex = '100';
        input.style.fontSize = styleSettings.fontSize;
        input.value = this.layerConditionText();
        input.addEventListener('input', this._saveInputValue.bind(this));
        // * add to body
        document.body.appendChild(input);
        this._inputElement = input;
        this._inputElement.style.display = 'none';
    }
    _saveInputValue(e) {
        const input = e.target;
        if (this._layerInfo)
            this._layerInfo.condition = input.value;
    }
    _sendLayerConditionToGame() {
        if (this._lastLayerConditionText != this.layerConditionText()) {
            this._lastLayerConditionText = this.layerConditionText();
            EM_EditorWindowHandler.SendCommandToGameWindow('layerConditionChange', {
                layerIndex: this.layerIndex(),
                condition: this.layerConditionText()
            });
        }
    }
    _createDeleteAllButton() {
        if (this._deleteAllButtonContainer) {
            let deleteAllButtonTitleText = HelpVocabulary.GetLocalizedString(HelpTextStrings.DeleteAllObjects);
            this._deleteAllButton = new Sprite_ConfirmButton(deleteAllButtonTitleText, this._onDeleteAllObjects.bind(this), this._deleteAllButtonContainer.realWidth(), this._deleteAllButtonContainer.realHeight());
            this._deleteAllButtonContainer.addChild(this._deleteAllButton);
        }
        this.refreshAllElements();
    }
    _onDeleteAllObjects() {
        console.log("Delete all objects");
        EM_EditorWindowHandler.SendCommandToGameWindow('removeAllObjectsForLayer', this.layerIndex());
    }
}


class Sprite_Editor_EMObjectsSection extends KNSprite {
    constructor(_parentSizeData) {
        super();
        this._parentSizeData = _parentSizeData;
        this._allFolders = [];
        this._currentFolder = "";
        this._currentImages = [];
        this._loadFolders();
        this._create();
    }
    refreshAllElements() {
        this.refreshBindings();
        this._dropDown.refreshBindings(this._dropDown);
    }
    realHeight() {
        if (this._parentSizeData) {
            return this._parentSizeData.realHeight();
        }
        else {
            return this.height;
        }
    }
    realWidth() {
        if (this._parentSizeData) {
            return this._parentSizeData.realWidth();
        }
        else {
            return this.width;
        }
    }
    activate() {
        this._list.activate();
    }
    deactivate() {
    }
    changeCurrentObjectFromGame(index) {
        console.log("Change object from game: ", index);
        this._list.selectItemInList(index);
    }
    _loadFolders() {
        this._allFolders = EditorResourcesManager.GetFoldersList();
        this._currentFolder = this._allFolders[0];
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_EditorObjectsModeSection"), this);
        this.refreshBindings(null);
        this._createDropDownMenu();
        this._createItemsList();
        this._refreshDropDownMenu();
        this._refreshItemsList();
    }
    _createDropDownMenu() {
        var _a;
        let dropDown = new Sprite_Editor_DropDown();
        (_a = this._dropDownGroup) === null || _a === void 0 ? void 0 : _a.addChild(dropDown);
        dropDown.refreshBindings(dropDown);
        this._dropDown = dropDown;
        this._dropDown.setClickHandler(this._onFolderSelect.bind(this));
    }
    _onFolderSelect() {
        this._dropDown.deactivate();
        this._refreshFoldersList();
        this.activate();
    }
    _createItemsList() {
        var _a;
        let list = new Sprite_Editor_List();
        (_a = this._listGroup) === null || _a === void 0 ? void 0 : _a.addChild(list);
        this._list = list;
    }
    _onItemSelected() {
        this._list.activate();
        let item = this._list.selectedItem();
        console.log("Selected item: ", item === null || item === void 0 ? void 0 : item.currentItemName());
        console.log("Ok");
        EM_EditorWindowHandler.SendCommandToGameWindow("selectObject", {
            imageName: item.currentItemName(),
            folderName: this._currentFolder
        });
        EM_EditorWindowHandler.FocusRootWindow();
    }
    _onCancelOnItem() {
        console.log("Cancel");
        this._list.activate();
    }
    _refreshDropDownMenu() {
        this._dropDown.setButtonCaption(this._currentFolder);
        this._dropDown.refreshBindings(this._dropDown);
    }
    _refreshItemsList() {
        this._currentImages = EditorResourcesManager.GetFilesListInFolder(this._currentFolder);
        this._list.setupItems(this._currentImages.map(item => {
            let listItem = new Sprite_Editor_ListItem();
            listItem.setItem("Assets/" + this._currentFolder, item);
            return listItem;
        }));
        this._list.setOkHandler(this._onItemSelected.bind(this));
        this._list.setCancelHandler(this._onCancelOnItem.bind(this));
    }
    _refreshFoldersList() {
        this._list.setupItems(this._allFolders.map(item => {
            let listItem = new Sprite_Editor_ListItem();
            //%[IDEA] Show small images with content on folder, not just folder
            listItem.setItem("EditorUI", "folder", item);
            return listItem;
        }));
        this._list.setOkHandler(this._onFolderSelected.bind(this));
        this._list.setCancelHandler(this._onCancelOnFolder.bind(this));
    }
    _onFolderSelected() {
        let item = this._list.selectedItem();
        if (!item) {
            this._list.activate();
        }
        else {
            let itemName = item.currentItemName();
            this._currentFolder = itemName;
            this._onCancelOnFolder();
        }
    }
    _onCancelOnFolder() {
        this._refreshDropDownMenu();
        this._refreshItemsList();
        this.activate();
        this._dropDown.activate();
    }
}


class Sprite_Editor_List extends KNSprite {
    constructor() {
        super();
        this._items = [];
        this._create();
    }
    realHeight() {
        if (this.parent) {
            return this.parent['realHeight']();
        }
        else {
            return this.height;
        }
    }
    realWidth() {
        if (this.parent) {
            return this.parent['realWidth']();
        }
        else {
            return this.width;
        }
    }
    maxCols() {
        if (!this._items || this._items.length == 0) {
            return 1;
        }
        else {
            let itemWidth = this._items[0].realWidth();
            let listWidth = this.realWidth();
            return Math.floor(listWidth / itemWidth);
        }
    }
    selectedItem() {
        return this._list.list.selectedItem();
    }
    setupItems(items) {
        this._items = items;
        this._list.list.setItems(items);
        this.refreshBindings(this);
    }
    setOkHandler(handler) {
        let _handler = () => {
            this.activateItemInList(this._list.list.selectedItem());
            handler();
        };
        this._list.list.setOkHandler(_handler);
    }
    setCancelHandler(handler) {
        let _handler = () => {
            this.activateItemInList(null);
            handler();
        };
        this._list.list.setCancelHandler(_handler);
    }
    activateItemInList(item) {
        // * Deselect all items
        this._items.forEach(i => i.onDeslectedByUserInList());
        item === null || item === void 0 ? void 0 : item.onSelectedByUserInList();
    }
    selectItemInList(index) {
        try {
            this._list.list.select(index);
            if (index >= 0) {
                this.activateItemInList(this._list.list.selectedItem());
            }
            else {
                this.activateItemInList(null);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    activate() {
        this._list.list.activate();
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_EditorItemsList"), this);
        this.refreshBindings(this);
    }
}


class Sprite_Editor_ListItem extends KNSprite {
    constructor() {
        super();
        this._isActive = false;
        this._isSelectedInList = false;
        this._itemName = "Test";
        this._create();
    }
    setActivatedInListState(value) { }
    ;
    realWidth() {
        return this._root.realWidth();
    }
    realHeight() {
        return this._root.realHeight();
    }
    isSelectedInList() {
        return this._isSelectedInList == true;
    }
    isActive() {
        return this._isActive == true;
    }
    onSelectedByUserInList() {
        this._isActive = true;
        this.refreshBindings(this);
    }
    onDeslectedByUserInList() {
        this._isActive = false;
        this.refreshBindings(this);
    }
    activateInList() {
        this._isSelectedInList = true;
        this.refreshBindings(this);
    }
    deactivateInList() {
        this._isSelectedInList = false;
        this.refreshBindings(this);
    }
    currentItemName() {
        return this._itemName;
    }
    update() {
        super.update();
        if (this._spriteAnimator) {
            this._spriteAnimator.update();
        }
    }
    setItem(folderName, imageName, itemName) {
        let itemData = {
            "folderName": "PKD_MapEnhancer/" + folderName,
            "imageName": imageName,
            "keepAspect": true,
            "useAspectSize": true
        };
        let image = new KNSprite_Image(itemData);
        let contentParent = this['contentParent'];
        if (!contentParent)
            return;
        contentParent.addChild(image);
        image.setSize("auto", "100%");
        image.setPosition("center", "center");
        if (!KString.any(itemName)) {
            itemName = imageName;
        }
        this._itemName = itemName;
        this.refreshBindings(this);
        image.addLoadListener(() => {
            this._checkIfImageIsAnimated(imageName, image);
        });
    }
    _checkIfImageIsAnimated(imageName, image) {
        try {
            let data = SpriteAnimator.GetAnimationData(imageName);
            if (data) {
                this._createAnimator(data.frames, data.speed, image.image);
                if (this._spriteAnimator) {
                    image.realWidth = () => {
                        try {
                            /*@ts-ignore*/
                            return image.image._frame.width;
                        }
                        catch (error) {
                            console.warn(error);
                        }
                        return image.image.width;
                    };
                    image.setPosition("center", "center");
                    this.refreshBindings(this);
                }
            }
        }
        catch (error) {
            console.warn(error);
            this._spriteAnimator = null;
        }
    }
    _createAnimator(frames, speed, imageSprite) {
        try {
            let animator = new SpriteAnimator(imageSprite, frames, speed);
            this._spriteAnimator = animator;
        }
        catch (error) {
            console.warn(error);
            this._spriteAnimator = null;
        }
    }
    _create() {
        KDNUI.FromScheme(PKD_MapEnhancer.GetNUIFile("NUI_ListItem"), this);
        this.refreshBindings(this);
    }
}


class Sprite_GuideGrid extends Sprite {
    constructor() {
        super();
        this._tileWidth = $gameMap.tileWidth();
        this._tileHeight = $gameMap.tileHeight();
        this._defaultOpacity = 200; //TODO: Parameter
        this._drawGrid();
        this.opacity = this._defaultOpacity;
    }
    static Show() {
        if (this._currentGrid) {
            if (!this._currentGrid.visible) {
                this._currentGrid.visible = true;
            }
        }
        else {
            this._currentGrid = new Sprite_GuideGrid();
            SceneManager._scene.addChild(this._currentGrid);
        }
    }
    static Hide() {
        if (this._currentGrid) {
            this._currentGrid.visible = false;
        }
    }
    static ChangeSize(value) {
        if (this._currentGrid && value != 0) {
            this._currentGrid._tileWidth += value;
            this._currentGrid._tileHeight += value;
            if (this._currentGrid._tileWidth < Sprite_GuideGrid._minimumTileSize || this._currentGrid._tileWidth > $gameMap.tileWidth()) {
                this._currentGrid._tileWidth -= value;
            }
            if (this._currentGrid._tileHeight < Sprite_GuideGrid._minimumTileSize || this._currentGrid._tileHeight > $gameMap.tileHeight()) {
                this._currentGrid._tileHeight -= value;
            }
            this._currentGrid._drawGrid();
        }
    }
    static GetAlignedPosition({ x, y }) {
        if (this._currentGrid) {
            let tileWidth = this._currentGrid._tileWidth;
            let tileHeight = this._currentGrid._tileHeight;
            x = Math.floor(x / tileWidth) * tileWidth;
            y = Math.floor(y / tileHeight) * tileHeight;
            return { x, y };
        }
    }
    _drawGrid() {
        let bitmap = new Bitmap(Graphics.width, Graphics.height);
        let ctx = bitmap.context;
        ctx.strokeStyle = '#000000'; //TODO: Parameter
        ctx.lineWidth = 1;
        for (let x = 0; x < Graphics.width; x += this._tileWidth) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, Graphics.height);
            ctx.stroke();
        }
        for (let y = 0; y < Graphics.height; y += this._tileHeight) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(Graphics.width, y);
            ctx.stroke();
        }
        ctx.closePath();
        this.bitmap = bitmap;
    }
}
Sprite_GuideGrid._minimumTileSize = 8;


//%[IDEA] Сейчас сбрасываются линии, если ставить новый предмет, надо сделать чтобы сохранялись
class Sprite_GuideLine extends Sprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._create();
    }
    static ShowVertical() {
        if (this._currentVerticalGuideline) {
            if (!this._currentVerticalGuideline.visible) {
                this._currentVerticalGuideline.visible = true;
                this._currentVerticalGuideline.x = TouchInput.x;
            }
        }
        else {
            this._currentVerticalGuideline = new Sprite_GuideLine({
                width: 4, //TODO: HDP
                height: Graphics.height,
                color: '#00ff00'
            });
            SceneManager._scene.addChild(this._currentVerticalGuideline);
            this._currentVerticalGuideline.x = TouchInput.x;
        }
    }
    static ShowHorizontal() {
        if (this._currentHorizontalGuideline) {
            if (!this._currentHorizontalGuideline.visible) {
                this._currentHorizontalGuideline.visible = true;
                this._currentHorizontalGuideline.y = TouchInput.y;
            }
        }
        else {
            this._currentHorizontalGuideline = new Sprite_GuideLine({
                width: Graphics.width,
                height: 4, //TODO: HDP
                color: '#ff0000'
            });
            SceneManager._scene.addChild(this._currentHorizontalGuideline);
            this._currentHorizontalGuideline.y = TouchInput.y;
        }
    }
    static HideVertical() {
        if (this._currentVerticalGuideline) {
            this._currentVerticalGuideline.visible = false;
        }
    }
    static HideHorizontal() {
        if (this._currentHorizontalGuideline) {
            this._currentHorizontalGuideline.visible = false;
        }
    }
    static DestroyAll() {
        if (this._currentVerticalGuideline) {
            this._currentVerticalGuideline.destroy();
            this._currentVerticalGuideline = null;
        }
        if (this._currentHorizontalGuideline) {
            this._currentHorizontalGuideline.destroy();
            this._currentHorizontalGuideline = null;
        }
    }
    _create() {
        const bitmap = new Bitmap(this._settings.width, this._settings.height);
        bitmap.fillAll(this._settings.color);
        this.bitmap = bitmap;
        //TODO: Shadow effect from PIXI
    }
}


class Sprite_MapGrid extends KSprite {
    constructor() {
        super();
        this._create();
        /*@ts-ignore*/
        this.z = 100;
    }
    static CreateGrid() {
        if (!this._currentGrid) {
            this._currentGrid = new Sprite_MapGrid();
            /*@ts-ignore*/
            SceneManager._scene._spriteset._tilemap.addChild(this._currentGrid);
        }
    }
    static RemoveGrid() {
        if (this._currentGrid) {
            this._currentGrid.destroy();
            this._currentGrid = null;
        }
    }
    update() {
        super.update();
        if (this.visible) {
            this._updatePosition();
        }
    }
    _updatePosition() {
        let x = $gameMap.displayX() * $gameMap.tileWidth();
        let y = $gameMap.displayY() * $gameMap.tileHeight();
        this.x = -x;
        this.y = -y;
    }
    _create() {
        let width = $gameMap.width() * $gameMap.tileWidth();
        let height = $gameMap.height() * $gameMap.tileHeight();
        this.bitmap = new Bitmap(width, height);
        this._drawBaseGrid();
    }
    _drawBaseGrid() {
        let bitmap = this.bitmap;
        bitmap.clear();
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let w = $gameMap.width();
        let h = $gameMap.height();
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                bitmap.fillRect(x * tw, y * th, tw, 2, "rgba(255, 255, 255, 0.5)");
                bitmap.fillRect(x * tw, y * th, 2, th, "rgba(255, 255, 255, 0.5)");
            }
        }
    }
}


class Sprite_MapGridCursor extends KSprite {
    constructor() {
        super();
        this._create();
        /*@ts-ignore*/
        this.z = 2000;
    }
    static CreateGridCursor() {
        if (!this._currentSprite) {
            this._currentSprite = new Sprite_MapGridCursor();
            /*@ts-ignore*/
            SceneManager._scene._spriteset._tilemap.addChild(this._currentSprite);
        }
    }
    static Remove() {
        if (this._currentSprite) {
            this._currentSprite.destroy();
            this._currentSprite = null;
        }
    }
    static OnClick() {
        if (this._currentSprite) {
            this._currentSprite._onTouchPress();
        }
    }
    static OnCancel() {
        if (this._currentSprite) {
            this._currentSprite._onTouchCancel();
        }
    }
    update() {
        super.update();
        if (this.visible) {
            this._updatePosition();
            this._updateCellUnderMouse();
            this._updateTools();
        }
    }
    _updatePosition() {
        let x = $gameMap.displayX() * $gameMap.tileWidth();
        let y = $gameMap.displayY() * $gameMap.tileHeight();
        this.x = -x;
        this.y = -y;
    }
    _updateCellUnderMouse() {
        let mx = TouchInput.x;
        let my = TouchInput.y;
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let mapPoint = KPoint.ConvertFromScreenToMap({ x: mx, y: my });
        let x = mapPoint.x;
        let y = mapPoint.y;
        this._cellUnderMouse.x = x * tw;
        this._cellUnderMouse.y = y * th;
        this._underMouseMapPosition = mapPoint;
    }
    _create() {
        let width = $gameMap.width() * $gameMap.tileWidth();
        let height = $gameMap.height() * $gameMap.tileHeight();
        this.bitmap = new Bitmap(width, height);
        this._createCellUnderMouse();
    }
    _createCellUnderMouse() {
        let tw = $gameMap.tileWidth();
        let th = $gameMap.tileHeight();
        let color = "rgba(0, 255, 255, 0.5)";
        let cell = new Bitmap(tw, th);
        const width = 4;
        cell.fillRect(0, 0, tw, width, color);
        cell.fillRect(0, 0, width, th, color);
        cell.fillRect(0, th - width, tw, width, color);
        cell.fillRect(tw - width, 0, width, th, color);
        this._cellUnderMouse = new KSprite();
        this._cellUnderMouse.bitmap = cell;
        this.addChild(this._cellUnderMouse);
    }
    _updateTools() {
        if (TouchInput.isPressed()) {
            this._onTouchPress();
        }
        else if (TouchInput.isCancelled()) {
            this._onTouchCancel();
        }
    }
    _onTouchPress() {
        let x = this._underMouseMapPosition.x;
        let y = this._underMouseMapPosition.y;
        EMCollisionsManager.AddCollision($gameMap.mapId(), { x: x, y: y }, EMapEditorManager.CurrentLayerIndex());
        Sprite_CollisionGrid.RefreshGrid();
    }
    _onTouchCancel() {
        let x = this._underMouseMapPosition.x;
        let y = this._underMouseMapPosition.y;
        EMCollisionsManager.DeleteCollision($gameMap.mapId(), { x: x, y: y }, EMapEditorManager.CurrentLayerIndex());
        Sprite_CollisionGrid.RefreshGrid();
    }
}


class Sprite_PhantomOutline extends KSprite {
    constructor(_emObject, _outlineColor = "#FFFFFF") {
        super();
        this._emObject = _emObject;
        this._outlineColor = _outlineColor;
        this._create();
    }
    update() {
        super.update();
        if (this._emObject) {
            this.x = this._emObject.x;
            this.y = this._emObject.y;
        }
        else {
            this.destroy();
        }
    }
    static ShowForZIndex(sprite) {
        if (this._currentIndexOutline) {
            this._currentIndexOutline.x = sprite.x;
            this._currentIndexOutline.y = sprite.y;
        }
        else {
            this._currentIndexOutline = new Sprite_PhantomOutline(sprite, '#00FF00');
            SceneManager._scene.addChild(this._currentIndexOutline);
        }
    }
    static ShowForBlend(sprite) {
        if (this._currentBlendOutline) {
            this._currentBlendOutline.x = sprite.x;
            this._currentBlendOutline.y = sprite.y;
        }
        else {
            this._currentBlendOutline = new Sprite_PhantomOutline(sprite, '#FFFFFF');
            SceneManager._scene.addChild(this._currentBlendOutline);
        }
    }
    static ShowForHover(sprite) {
        if (!this._currentHoverOutline) {
            this._currentHoverOutline = new Sprite_PhantomOutline(sprite, '#FFF0FF');
            SceneManager._scene.addChild(this._currentHoverOutline);
        }
    }
    static HideForZIndex() {
        if (this._currentIndexOutline) {
            this._currentIndexOutline.removeFromParent();
            this._currentIndexOutline.destroy();
            this._currentIndexOutline = null;
        }
    }
    static HideForBlend() {
        if (this._currentBlendOutline) {
            this._currentBlendOutline.removeFromParent();
            this._currentBlendOutline.destroy();
            this._currentBlendOutline = null;
        }
    }
    static HideForHover() {
        if (this._currentHoverOutline) {
            this._currentHoverOutline.removeFromParent();
            this._currentHoverOutline.destroy();
            this._currentHoverOutline = null;
        }
    }
    _create() {
        let child = Sprite_EMObject.Phantom(this._emObject);
        child.opacity = 200;
        if (KDX.isMZ()) {
            /*@ts-ignore*/
            let outlineFilter = new PIXI.filters.OutlineFilter(2, KColor.HexToColorNumber(this._outlineColor), 0.5, true, true);
            this.filters = [outlineFilter];
        }
        else {
            /*@ts-ignore*/
            let glowFilter = new PIXI.filters.GlowFilter({
                distance: 15,
                outerStrength: 2,
                color: KColor.HexToColorNumber(this._outlineColor),
            });
            this.filters = [glowFilter];
        }
        this.addChild(child);
    }
}


// * Circle with a cross in the middle to indicate the rotation anchor point of a sprite.
class Sprite_RotationAnchor extends Sprite {
    constructor() {
        super();
        this._circleRadius = 12;
        this._create();
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
    }
    _create() {
        this._graphics = new PIXI.Graphics();
        this.addChild(this._graphics);
        this._drawCircle();
    }
    _drawCircle() {
        this._graphics.clear();
        this._graphics.beginFill(0x000000, 0.8);
        this._graphics.drawCircle(0, 0, this._circleRadius);
        this._graphics.endFill();
        this._graphics.lineStyle(2, 0xffffff, 1);
        this._graphics.moveTo(-this._circleRadius, 0);
        this._graphics.lineTo(this._circleRadius, 0);
        this._graphics.moveTo(0, -this._circleRadius);
        this._graphics.lineTo(0, this._circleRadius);
    }
    static ShowFor(sprite) {
        if (this._currentAnchor) {
            if (sprite != this._currentAnchor.parent) {
                sprite.addChild(this._currentAnchor);
            }
        }
        else {
            this._currentAnchor = new Sprite_RotationAnchor();
        }
    }
    static Hide() {
        if (this._currentAnchor) {
            this._currentAnchor.destroy();
            this._currentAnchor = null;
        }
    }
}


class Sprite_ToolGrid extends Sprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._drawGrid();
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    }
    static ShowScaleFor(sprite) {
        if (this._currentScaleGrid) {
            return;
        }
        this._currentScaleGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#ffff00',
            lineWidth: 1,
            cellSize: 16
        });
        Sprite_ToolValueText.ShowValueFor('scale', {
            color: '#ffff00',
            valueGetter: sprite.getCurrentScale.bind(sprite),
            showResetHelp: true,
            showPivotChangeHelp: false
        });
    }
    static ShowRotationFor(sprite) {
        if (this._currentRotationGrid) {
            return;
        }
        this._currentRotationGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#00ff00',
            lineWidth: 1,
            cellSize: 12
        });
        Sprite_ToolValueText.ShowValueFor('rotation', {
            color: '#00ff00',
            valueGetter: sprite.getCurrentRotation.bind(sprite),
            showResetHelp: true,
            showPivotChangeHelp: true
        });
    }
    static ShowZIndexFor(sprite) {
        if (this._currentZIndexGrid) {
            return;
        }
        this._currentZIndexGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#ffffff',
            lineWidth: 2,
            cellSize: 0
        });
        Sprite_ToolValueText.ShowValueFor('zIndex', {
            color: '#ffffff',
            valueGetter: sprite.getCurrentZIndex.bind(sprite),
            showResetHelp: false,
            showPivotChangeHelp: false
        });
    }
    static ShowBlendModeFor(sprite) {
        if (this._currentBlendModeGrid) {
            return;
        }
        this._currentBlendModeGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#ffffff',
            lineWidth: 2,
            cellSize: 0
        });
        Sprite_ToolValueText.ShowValueFor('blendMode', {
            color: '#ffffff',
            valueGetter: sprite.getCurrentBlendModeName.bind(sprite),
            showResetHelp: false,
            showPivotChangeHelp: false
        });
    }
    static ShowHueModeFor(sprite) {
        if (this._currentHueGrid) {
            return;
        }
        this._currentHueGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#ffffff',
            lineWidth: 2,
            cellSize: 0
        });
        Sprite_ToolValueText.ShowValueFor('hue', {
            color: '#ffffff',
            valueGetter: sprite.getCurrentHue.bind(sprite),
            showResetHelp: true,
            showPivotChangeHelp: false
        });
    }
    static ShowOpacityFor(sprite) {
        if (this._currentOpacityGrid) {
            return;
        }
        this._currentOpacityGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#cccfff',
            lineWidth: 2,
            cellSize: 0
        });
        Sprite_ToolValueText.ShowValueFor('opacity', {
            color: '#cccfff',
            valueGetter: sprite.getCurrentOpacity.bind(sprite),
            showResetHelp: true,
            showPivotChangeHelp: false
        });
    }
    static ShowAnimationSpeedFor(sprite) {
        if (this._currentAnimationSpeedGrid) {
            return;
        }
        this._currentAnimationSpeedGrid = Sprite_ToolGrid._createFor(sprite, {
            width: sprite.realWidth(),
            height: sprite.realHeight(),
            color: '#ffffff',
            lineWidth: 2,
            cellSize: 0
        });
        Sprite_ToolValueText.ShowValueFor('animationSpeed', {
            color: '#ffffff',
            valueGetter: sprite.getCurrentAnimationSpeed.bind(sprite),
            showResetHelp: false,
            showPivotChangeHelp: false
        });
    }
    static _createFor(sprite, settings) {
        let grid = new Sprite_ToolGrid(settings);
        grid._linkedTo = sprite;
        /*@ts-ignore*/
        grid.z = sprite.z;
        sprite.parent.addChild(grid);
        return grid;
    }
    static HideScaleGrid() {
        Sprite_ToolValueText.HideValue('scale');
        if (this._currentScaleGrid) {
            this._currentScaleGrid.destroy();
            this._currentScaleGrid = null;
        }
    }
    static HideRotationGrid() {
        Sprite_ToolValueText.HideValue('rotation');
        if (this._currentRotationGrid) {
            this._currentRotationGrid.destroy();
            this._currentRotationGrid = null;
        }
    }
    static HideZIndexGrid() {
        Sprite_ToolValueText.HideValue('zIndex');
        if (this._currentZIndexGrid) {
            this._currentZIndexGrid.destroy();
            this._currentZIndexGrid = null;
        }
    }
    static HideBlendModeGrid() {
        Sprite_ToolValueText.HideValue('blendMode');
        if (this._currentBlendModeGrid) {
            this._currentBlendModeGrid.destroy();
            this._currentBlendModeGrid = null;
        }
    }
    static HideHueModeGrid() {
        Sprite_ToolValueText.HideValue('hue');
        if (this._currentHueGrid) {
            this._currentHueGrid.destroy();
            this._currentHueGrid = null;
        }
    }
    static HideAnimationSpeedGrid() {
        Sprite_ToolValueText.HideValue('animationSpeed');
        if (this._currentAnimationSpeedGrid) {
            this._currentAnimationSpeedGrid.destroy();
            this._currentAnimationSpeedGrid = null;
        }
    }
    static HideOpacityGrid() {
        Sprite_ToolValueText.HideValue('opacity');
        if (this._currentOpacityGrid) {
            this._currentOpacityGrid.destroy();
            this._currentOpacityGrid = null;
        }
    }
    _drawGrid() {
        let width = this._settings.width * Sprite_ToolGrid._initialScaleFactor;
        let height = this._settings.height * Sprite_ToolGrid._initialScaleFactor;
        let bitmap = new Bitmap(width, height);
        let ctx = bitmap.context;
        ctx.strokeStyle = this._settings.color;
        ctx.lineWidth = this._settings.lineWidth;
        if (this._settings.cellSize === 0) {
            // * Draw just borders
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width - 2, 0);
            ctx.lineTo(width - 2, height - 1);
            ctx.lineTo(0, height - 1);
            ctx.lineTo(0, 0);
            ctx.stroke();
        }
        else {
            for (let x = 0; x < width; x += this._settings.cellSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += this._settings.cellSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        }
        ctx.closePath();
        this.bitmap = bitmap;
    }
    update() {
        super.update();
        this._updatePosition();
    }
    _updatePosition() {
        if (!this._linkedTo)
            return;
        this.x = this._linkedTo.x;
        this.y = this._linkedTo.y - 1; // * Below the object
    }
}
Sprite_ToolGrid._initialScaleFactor = 1.5;


class Sprite_ToolValueText extends KSprite {
    constructor(_settings) {
        super();
        this._settings = _settings;
        this._createValueText();
        this._createExtraHelpKeys();
    }
    static ShowValueFor(instanceId, config) {
        if (this._valueTextInstances[instanceId]) {
            return;
        }
        this._valueTextInstances[instanceId] = new Sprite_ToolValueText(config);
        SceneManager._scene.addChild(this._valueTextInstances[instanceId]);
    }
    static HideValue(instanceId) {
        if (this._valueTextInstances[instanceId]) {
            this._valueTextInstances[instanceId].destroy();
            this._valueTextInstances[instanceId] = null;
            delete this._valueTextInstances[instanceId];
        }
    }
    _textElementScheme(color) {
        return {
            "type": "group",
            "id": "_elementsContainer",
            "bindings": {
                "width": "66hdp",
                "height": "24hdp",
                "x": 40,
                "y": 20
            },
            "childrens": [
                {
                    "type": "rect",
                    "parameters": {
                        "fillColor": color,
                        "corners": 0,
                        "strokeWidth": 0
                    },
                    "bindings": {
                        "width": "100%",
                        "height": "100%"
                    },
                    "childrens": [
                        {
                            "type": "text",
                            "id": "_textSpr",
                            "parameters": {
                                "textColor": "#000000"
                            },
                            "bindings": {
                                "width": "100%",
                                "height": "100%",
                                "fontSize": "78%"
                            }
                        }
                    ]
                }
            ]
        };
    }
    _createValueText() {
        KDNUI.FromScheme(this._textElementScheme(this._settings.color), this);
    }
    _createExtraHelpKeys() {
        var _a, _b;
        if (this._settings.showResetHelp) {
            let resetText = HelpVocabulary.GetLocalizedString(HelpTextStrings.Reset);
            let element = HelpTextBuilder.New().AddMouseClick('r').AddText(resetText).Build();
            (_a = this._elementsContainer) === null || _a === void 0 ? void 0 : _a.addChild(element);
            element.setPosition(0, "prevEndY + 4hdp");
        }
        if (this._settings.showPivotChangeHelp) {
            let changePivotText = HelpVocabulary.GetLocalizedString(HelpTextStrings.ChangePivot);
            let element = HelpTextBuilder.New().AddShiftKey().AddText(changePivotText).Build();
            (_b = this._elementsContainer) === null || _b === void 0 ? void 0 : _b.addChild(element);
            element.setPosition(0, "prevEndY + 4hdp");
        }
    }
    update() {
        super.update();
        this._updatePosition();
        this._updateValueText();
    }
    _updatePosition() {
        this.x = TouchInput.x;
        this.y = TouchInput.y;
    }
    _updateValueText() {
        var _a;
        (_a = this._textSpr) === null || _a === void 0 ? void 0 : _a.drawText(this._settings.valueGetter().toString());
    }
}
Sprite_ToolValueText._valueTextInstances = {};


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Spriteset_Map.prototype;
    //@[ALIAS]
    const ALIAS__createCharacters = _.createCharacters;
    _.createCharacters = function (...args) {
        let t = this;
        ALIAS__createCharacters.call(this, ...args);
        EMObjectsManager.CreateSpritesForMap(t._tilemap);
    };
})();
// ■ END Spriteset_Map.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Tilemap.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Tilemap.prototype;
    /*@ts-ignore*/
    //@[ALIAS]
    const ALIAS___compareChildOrder = _._compareChildOrder;
    /*@ts-ignore*/
    _._compareChildOrder = function (a, b) {
        if (Imported['PKD_AnimaX']) {
            return ALIAS___compareChildOrder.call(this, a, b);
        }
        if ($gameMap) {
            if (a.z !== b.z) {
                return a.z - b.z;
            }
            else if (a.y !== b.y) {
                return a.y - b.y;
            }
            else if (a.x !== b.x) {
                return a.x - b.x;
            }
            else {
                return a.spriteId - b.spriteId;
            }
        }
        else
            return ALIAS___compareChildOrder.call(this, a, b);
    };
})();
// ■ END Tilemap.ts
//---------------------------------------------------------------------------


})();