/*
 * Copyright (c) 2024 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */


/*:
 * @plugindesc (v.1.0)[PRO] Treasure Chest
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/treasure-chest

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * GUIDE:
 * https://gist.github.com/KageDesu/fb29ba6d328a04461ada175f7780bb1b
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
 * @param PKD_TreasureChest
 * 
 * 

 * 
 * 
 * @param openChestMode
 * @parent PKD_TreasureChest
 * @text Open Chest Mode
 * @type select
 * @option On separate Scene
 * @value scene
 * @option Direct on Map
 * @value map
 * @default scene
 * 
 * 

 * 
 * 
 * @param isAutocloseChest:b
 * @parent PKD_TreasureChest
 * @text Auto Close Chest
 * @type boolean
 * @default true
 * @desc Automatically close chest (if no more items)
 * 
 * 

 * 
 * 
 * @param autocloseDelay:int
 * @parent isAutocloseChest:b
 * @text Auto Close Delay (ms)
 * @type number
 * @default 500
 * 
 * 

 * 
 * 
 * @param takeAll:b
 * @parent PKD_TreasureChest
 * @text Take All Button
 * @type boolean
 * @default true
 * @desc Show Take All button
 * 
 * 

 * 
 * 
 * @param takeAllKeyboardKey
 * @parent takeAll:b
 * @text Keyboard Key
 * @default control
 * 
 * 

 * 
 * 
 * @param takeAllgamepadKey
 * @parent takeAll:b
 * @text Gamepad Key
 * @option X
 * @option Y
 * @option LB
 * @option RB
 * @default X
 * 
 * 

 * 
 * 
 * @param takeAllSe
 * @parent takeAll:b
 * @text Sound Effect
 * @type file
 * @dir audio/se
 * @require 1
 * @default Reflection
 * 
 * 

 * 
 * 
 * @param goldGroup
 * @parent PKD_TreasureChest
 * @text Gold
 * 
 * 

 * 
 * 
 * @param goldIconIndex:int
 * @parent goldGroup
 * @text Icon Index
 * @type number
 * @default 314
 * 
 * 

 * 
 * 
 * @param goldImageName
 * @parent goldGroup
 * @text Image Name
 * @type file
 * @dir img/pictures
 * @require 1
 * @default
 * @desc Image for gold icon, leave empty for default icon
 * 
 * 

 * 
 * 
 * @param goldPickSe
 * @parent goldGroup
 * @text Pick Sound Effect
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeGoldFromChest
 * 
 * 

 * 
 * 
 * @param goldName
 * @parent goldGroup
 * @text Name
 * @default Gold
 * 
 * 

 * 
 * 
 * @param itemPickSe
 * @parent PKD_TreasureChest
 * @text Item Pick Sound Effect
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeItemFromChest
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

@command PrepareChest
@text Treasure Chest
@desc Configure treasure chest and open it




@arg backgroundImage
@text Background Image
@desc Background image for treasure chest
@type file
@required 1
@dir img/PKD_TreasureChest/
@default defaultChestBackground




@arg isRemoveAfterClose:b
@text Remove after close
@desc Remove chest after close (one-time)
@type boolean
@default false




@arg items:structA
@text Items
@type struct<ChestItems>[]
@default []




@arg weapons:structA
@text Weapons
@type struct<ChestWeapons>[]
@default []




@arg armors:structA
@text Armors
@type struct<ChestArmors>[]
@default []




@arg gold:struct
@text Gold
@type struct<ChestAppearConfig>
@default {}

@command ClearChest
@text Remove Chest
@desc Remove chest data from memory (for current event)



@command EMPTY_HOLDER
@text ‏
@desc
@default


 */
/*:ru
 * @plugindesc (v.1.0)[PRO] Treasure Chest
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/treasure-chest

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * РУКОВОДСТВО:
 * https://gist.github.com/KageDesu/fb29ba6d328a04461ada175f7780bb1b
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
 * @param PKD_TreasureChest
 * 
 * 

 * 
 * 
 * @param openChestMode
 * @parent PKD_TreasureChest
 * @text Режим открытия сундука
 * @type select
 * @option On separate Scene
 * @value scene
 * @option Direct on Map
 * @value map
 * @default scene
 * 
 * 

 * 
 * 
 * @param isAutocloseChest:b
 * @parent PKD_TreasureChest
 * @text Автозакрытие сундука
 * @type boolean
 * @default true
 * @desc Автоматически закрывать сундук (если нет предметов больше)
 * 
 * 

 * 
 * 
 * @param autocloseDelay:int
 * @parent isAutocloseChest:b
 * @text Задержка автозакрытия (мс)
 * @type number
 * @default 500
 * 
 * 

 * 
 * 
 * @param takeAll:b
 * @parent PKD_TreasureChest
 * @text Кнопка "Взять все"
 * @type boolean
 * @default true
 * @desc Показывать кнопку Взять Всё
 * 
 * 

 * 
 * 
 * @param takeAllKeyboardKey
 * @parent takeAll:b
 * @text Клавиша на клавиатуре
 * @default control
 * 
 * 

 * 
 * 
 * @param takeAllgamepadKey
 * @parent takeAll:b
 * @text Кнопка геймпада
 * @option X
 * @option Y
 * @option LB
 * @option RB
 * @default X
 * 
 * 

 * 
 * 
 * @param takeAllSe
 * @parent takeAll:b
 * @text Звуковой эффект
 * @type file
 * @dir audio/se
 * @require 1
 * @default Reflection
 * 
 * 

 * 
 * 
 * @param goldGroup
 * @parent PKD_TreasureChest
 * @text Золото
 * 
 * 

 * 
 * 
 * @param goldIconIndex:int
 * @parent goldGroup
 * @text Индекс иконки
 * @type number
 * @default 314
 * 
 * 

 * 
 * 
 * @param goldImageName
 * @parent goldGroup
 * @text Имя изображения
 * @type file
 * @dir img/pictures
 * @require 1
 * @default
 * @desc Изображение для иконки золота, оставьте пустым для иконки по умолчанию
 * 
 * 

 * 
 * 
 * @param goldPickSe
 * @parent goldGroup
 * @text Звук подбора
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeGoldFromChest
 * 
 * 

 * 
 * 
 * @param goldName
 * @parent goldGroup
 * @text Название
 * @default Gold
 * 
 * 

 * 
 * 
 * @param itemPickSe
 * @parent PKD_TreasureChest
 * @text Звук подбора предмета
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeItemFromChest
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

@command PrepareChest
@text Сундук с сокровищами
@desc Настройка сундука с сокровищами и его открытие




@arg backgroundImage
@text Фоновое изображение
@desc Фоновое изображение для сундука с сокровищами
@type file
@required 1
@dir img/PKD_TreasureChest/
@default defaultChestBackground




@arg isRemoveAfterClose:b
@text Удалить после закрытия
@desc Удалить сундук после закрытия (одноразовый)
@type boolean
@default false




@arg items:structA
@text Предметы
@type struct<ChestItems>[]
@default []




@arg weapons:structA
@text Оружие
@type struct<ChestWeapons>[]
@default []




@arg armors:structA
@text Броня
@type struct<ChestArmors>[]
@default []




@arg gold:struct
@text Золото
@type struct<ChestAppearConfig>
@default {}

@command ClearChest
@text Удалить сундук
@desc Удалить данные сундука из памяти (для текущего события)



@command EMPTY_HOLDER
@text ‏
@desc
@default


 */
/*:zh-cn
 * @plugindesc (v.1.0)[PRO] Treasure Chest
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/treasure-chest

 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * 指南:
 * https://gist.github.com/KageDesu/fb29ba6d328a04461ada175f7780bb1b
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
 * @param PKD_TreasureChest
 * 
 * 

 * 
 * 
 * @param openChestMode
 * @parent PKD_TreasureChest
 * @text 打开宝箱模式
 * @type select
 * @option On separate Scene
 * @value scene
 * @option Direct on Map
 * @value map
 * @default scene
 * 
 * 

 * 
 * 
 * @param isAutocloseChest:b
 * @parent PKD_TreasureChest
 * @text 自动关闭宝箱
 * @type boolean
 * @default true
 * @desc 自动关闭宝箱（如果没有更多物品）
 * 
 * 

 * 
 * 
 * @param autocloseDelay:int
 * @parent isAutocloseChest:b
 * @text 自动关闭延迟 (毫秒)
 * @type number
 * @default 500
 * 
 * 

 * 
 * 
 * @param takeAll:b
 * @parent PKD_TreasureChest
 * @text “全部拿走”按钮
 * @type boolean
 * @default true
 * @desc 显示“全部拿走”按钮
 * 
 * 

 * 
 * 
 * @param takeAllKeyboardKey
 * @parent takeAll:b
 * @text 键盘键
 * @default control
 * 
 * 

 * 
 * 
 * @param takeAllgamepadKey
 * @parent takeAll:b
 * @text 游戏手柄键
 * @option X
 * @option Y
 * @option LB
 * @option RB
 * @default X
 * 
 * 

 * 
 * 
 * @param takeAllSe
 * @parent takeAll:b
 * @text 音效
 * @type file
 * @dir audio/se
 * @require 1
 * @default Reflection
 * 
 * 

 * 
 * 
 * @param goldGroup
 * @parent PKD_TreasureChest
 * @text 金币
 * 
 * 

 * 
 * 
 * @param goldIconIndex:int
 * @parent goldGroup
 * @text 图标索引
 * @type number
 * @default 314
 * 
 * 

 * 
 * 
 * @param goldImageName
 * @parent goldGroup
 * @text 图片名称
 * @type file
 * @dir img/pictures
 * @require 1
 * @default
 * @desc 金币图标，留空为默认图标
 * 
 * 

 * 
 * 
 * @param goldPickSe
 * @parent goldGroup
 * @text 拾取音效
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeGoldFromChest
 * 
 * 

 * 
 * 
 * @param goldName
 * @parent goldGroup
 * @text 名称
 * @default Gold
 * 
 * 

 * 
 * 
 * @param itemPickSe
 * @parent PKD_TreasureChest
 * @text 物品拾取音效
 * @type file
 * @dir audio/se
 * @require 1
 * @default takeItemFromChest
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

@command PrepareChest
@text 宝箱
@desc 配置宝箱并打开它




@arg backgroundImage
@text 背景图像
@desc 宝箱的背景图像
@type file
@required 1
@dir img/PKD_TreasureChest/
@default defaultChestBackground




@arg isRemoveAfterClose:b
@text 关闭后删除
@desc 关闭后删除 (一次性)
@type boolean
@default false




@arg items:structA
@text 物品
@type struct<ChestItems>[]
@default []




@arg weapons:structA
@text 武器
@type struct<ChestWeapons>[]
@default []




@arg armors:structA
@text 盔甲
@type struct<ChestArmors>[]
@default []




@arg gold:struct
@text 金币
@type struct<ChestAppearConfig>
@default {}

@command ClearChest
@text 删除宝箱
@desc 从内存中删除宝箱数据 (对于当前事件)



@command EMPTY_HOLDER
@text ‏
@desc
@default


 */
/*~struct~ChestItems:

@param itemID:int
@text Item ID
@type item
@default 7




@param config:struct
@text Config
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestAppearConfig:

@param minAmount:int
@text Min Amount
@type number
@default 1
@min 0




@param maxAmount:int
@text Max Amount
@type number
@default 1




@param variableAmount:int
@text Amount from variable
@type variable
@default 0




@param chance:int
@text Chance
@type number
@default 100
@min 1
@max 100




@param chanceFromVariable:int
@text Chance from variable
@type variable
@default 0




@param conditionSwitch:int
@text Condition Switch
@type switch
@default 0
@desc Leave 0 to not use




@param conditionScript
@text Condition Script
@default
@desc Leave empty to not use

*/

/*~struct~ChestWeapons:

@param weaponID:int
@text Weapon ID
@type weapon
@default 1




@param config:struct
@text Config
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestArmors:

@param armorID:int
@text Armor ID
@type armor
@default 2




@param config:struct
@text Config
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestItems:ru

@param itemID:int
@text ID предмета
@type item
@default 7




@param config:struct
@text Конфигурация
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestAppearConfig:ru

@param minAmount:int
@text Минимальное количество
@type number
@default 1
@min 0




@param maxAmount:int
@text Максимальное количество
@type number
@default 1




@param variableAmount:int
@text Количество из переменной
@type variable
@default 0




@param chance:int
@text Шанс
@type number
@default 100
@min 1
@max 100




@param chanceFromVariable:int
@text Шанс из переменной
@type variable
@default 0




@param conditionSwitch:int
@text Условие: Перключатель
@type switch
@default 0
@desc Оставьте 0, чтобы не использовать




@param conditionScript
@text Условие: Скрипт
@default
@desc Оставьте пустым, чтобы не использовать

*/

/*~struct~ChestWeapons:ru

@param weaponID:int
@text ID оружия
@type weapon
@default 1




@param config:struct
@text Конфигурация
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestArmors:ru

@param armorID:int
@text ID брони
@type armor
@default 2




@param config:struct
@text Конфигурация
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestItems:zh-ch

@param itemID:int
@text 物品ID
@type item
@default 7




@param config:struct
@text 配置
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestAppearConfig:zh-ch

@param minAmount:int
@text 最小数量
@type number
@default 1
@min 0




@param maxAmount:int
@text 最大数量
@type number
@default 1




@param variableAmount:int
@text 从变量中获取数量
@type variable
@default 0




@param chance:int
@text 机会
@type number
@default 100
@min 1
@max 100




@param chanceFromVariable:int
@text 从变量中获取机会
@type variable
@default 0




@param conditionSwitch:int
@text 条件开关
@type switch
@default 0
@desc 留空不使用




@param conditionScript
@text 条件脚本
@default
@desc 留空不使用

*/

/*~struct~ChestWeapons:zh-ch

@param weaponID:int
@text 武器ID
@type weapon
@default 1




@param config:struct
@text 配置
@type struct<ChestAppearConfig>
@default {}

*/

/*~struct~ChestArmors:zh-ch

@param armorID:int
@text 盔甲ID
@type armor
@default 2




@param config:struct
@text 配置
@type struct<ChestAppearConfig>
@default {}

*/




var Imported;
(function (Imported) {
    Imported.PKD_TreasureChest = true;
})(Imported || (Imported = {}));
//%[IDEA] Разные стили для сундуков (NUI файлы, перечисляем в параметрах плагина)
//%[IDEA] Max Stack (in chest) parameter per Item (note)
var PKD_TreasureChest;
(function (PKD_TreasureChest) {
    PKD_TreasureChest.Version = "1.0";
    /**
     * Get NUI file from plugin
     * @param {string} name - Name of file
     * @returns {NUIScheme} - File content
    */
    function GetNUIFile(name) {
        return window["$PKD_TreasureChest_" + name];
    }
    PKD_TreasureChest.GetNUIFile = GetNUIFile;
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
                PKD_TreasureChest[name] = obj;
            }
            else {
                let _name = obj.name;
                if ((_name === null || _name === void 0 ? void 0 : _name.length) > 0) {
                    PKD_TreasureChest[obj.name] = obj;
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
    PKD_TreasureChest.Link = Link;
})(PKD_TreasureChest || (PKD_TreasureChest = {}));


(function(){



//build: 9 
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
    uiConstant(key, defaultValue = undefined) {
        if (!this._uiConstants) {
            this._uiConstants = {};
        }
        if (KDX.any(this._uiConstants[key])) {
            return this._uiConstants[key];
        }
        else {
            return defaultValue;
        }
    }
    dataBindings() {
        if (!this._dataBindingsCache) {
            this._dataBindingsCache = {
                x: (v) => this.setPosition(v, this.y),
                y: (v) => this.setPosition(this.x, v),
                position: (v) => this.setPosition(v.x, v.y),
                visible: (v) => { this.visible = v; },
                opacity: (v) => { if (KDX.any(v)) {
                    this.opacity = v;
                } },
                scale: (v) => { if (KDX.any(v)) {
                    this.scale.set(v);
                } },
                rotation: (v) => { if (KDX.any(v)) {
                    this.rotation = v;
                } },
                physicalBounds: (v) => { this._isNotHaveBounds = !v; },
                anchor: (v) => { if (KDX.any(v)) {
                    this.setCommonAnchor(v);
                } },
                animation: (v) => { if (v) {
                    this.addAnimationRule(v);
                } },
                centeredScale: (v) => { if (KDX.any(v)) {
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
                    if (!KDX.any(bindings[key])) {
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
            // * For compatibility with old format
            size: (v) => this.setSize(v),
            faceSize: (v) => this.setSize(v),
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
            "outAnimation": "field:x;duration:0.15;keyframes:0=4,100=0",
            "isPlayOkSound": true,
            "isPlayCursorSound": true
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
    playOkSound() {
        if (this.settings.isPlayOkSound == true) {
            super.playOkSound();
        }
    }
    playCursorSound() {
        if (this.settings.isPlayCursorSound == true) {
            super.playCursorSound();
        }
    }
    clearActivatedStateForItems() {
        try {
            this.getAllItems().forEach((item) => item === null || item === void 0 ? void 0 : item.setActivatedInListState(false));
        }
        catch (error) {
            console.warn(error);
        }
    }
    setActiveStateForItem(item, value) {
        try {
            this.clearActivatedStateForItems();
            item === null || item === void 0 ? void 0 : item.setActivatedInListState(value);
        }
        catch (error) {
            console.warn(error);
        }
    }
    setActiveStateForCurrentItem(value = true) {
        this.setActiveStateForItem(this.selectedItem(), value);
    }
    setActiveStateForItemAt(index, value = true) {
        this.setActiveStateForItem(this.itemAt(index), value);
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
//rev 07.12.24
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
    get textColor() {
        return this._settings.textColor;
    }
    set textColor(value) {
        this.setTextColor(value);
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
            "actualHeight": false,
            "isLoadFontFromFile": false
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
            fontSize: (v) => { if (KDX.any(v))
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
            this._settings.textColor = color;
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
                this._loadFont();
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
    _loadFont() {
        try {
            if (this._settings.isLoadFontFromFile != true)
                return;
            if (!KString.any(this._settings.font.face))
                return;
            //@ts-ignore
            if (KNSprite_Text._loadedFonts.includes(this._settings.font.face))
                return;
            if (KDX.isMV()) {
                let url = "fonts/" + Utils.encodeURI(this._settings.font.face) + ".ttf";
                var style = document.createElement('style');
                var head = document.getElementsByTagName('head');
                var rule = '@font-face { font-family: "' + this._settings.font.face + '"; src: url("' + url + '"); }';
                style.type = 'text/css';
                head.item(0).appendChild(style);
                style.sheet.insertRule(rule, 0);
            }
            else {
                //@ts-ignore
                FontManager.load(this._settings.font.face, this._settings.font.face + ".ttf");
            }
            KNSprite_Text._loadedFonts.push(this._settings.font.face);
        }
        catch (error) {
            console.warn(error);
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
KNSprite_Text._loadedFonts = [];
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
            "actualWidth": false,
            "actualHeight": false,
            "trimWidth": false,
            "trimHeight": false,
            "iconPadding": {
                "left": 2,
                "right": 2,
                "top": 0,
                "bottom": 0
            },
            "iconSize": 1,
            "isStaticIconSize": false,
            "isLoadFontFromFile": false
        };
    }
    realWidth() {
        try {
            if (this.isNotHaveBounds())
                return 0;
            if (this.settings.actualWidth == true) {
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
            if (this.settings.actualHeight == true) {
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
            fontSize: (v) => { if (KDX.any(v))
                this.setFontSize(v); },
            iconSize: (v) => { if (KDX.any(v))
                this.setIconSize(v); },
            verticalSpacing: (v) => { if (KDX.any(v))
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
            textSettings.actualWidth = true;
            textSettings.actualHeight = true;
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
let _pkdTempWindowBaseForConvertEscapeCharacters = null;
class TextProParser {
    /**
     * Converts control characters in the input text.
     * @param inputText The input text to convert.
     * @returns The converted text.
     */
    static ConvertControlCharacters(inputText) {
        try {
            if (KString.any(inputText)) {
                if (!_pkdTempWindowBaseForConvertEscapeCharacters) {
                    if (KDX.isMV()) {
                        //@ts-ignore
                        _pkdTempWindowBaseForConvertEscapeCharacters = new Window_Base(0, 0, 0, 0);
                    }
                    else {
                        _pkdTempWindowBaseForConvertEscapeCharacters = new Window_Base(new Rectangle(0, 0, 0, 0));
                    }
                }
                return _pkdTempWindowBaseForConvertEscapeCharacters.convertEscapeCharacters(inputText);
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


//build: 2 
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
    // * В версии RPG Maker MV не отслеживаются координаты курсора, если мы просто двигаем мышкой
    // * Данный код исправляет эту проблему, чтобы можно было отслеживать координаты курсора, даже если мышь не нажата
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
            this._paramsRaw = this.getPluginParametersByRoot(this._pluginName);
            this._params = KDX.ParamParser.ParseParameters(this._paramsRaw, this._pluginName);
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
    }
    KDX.ParamLoader = ParamLoader;
})(KDX || (KDX = {}));
var KDX;
(function (KDX) {
    let ParamParser;
    (function (ParamParser) {
        let _ppNameToParseNext = "";
        let _pluginName = "";
        /**
         * Parses the parameters from the plugin.
         * @param paramSet The raw parameter set.
         * @returns The parsed parameters.
         */
        function ParseParameters(paramSet, _pluginNameForInfo) {
            _pluginName = _pluginNameForInfo;
            const params = {};
            for (const key in paramSet) {
                if (paramSet.hasOwnProperty(key)) {
                    _ppNameToParseNext = key;
                    const clearKey = parseKey(key);
                    const typeKey = parseKeyType(key);
                    params[clearKey] = parseParamItem(typeKey, paramSet[key]);
                }
            }
            return params;
        }
        ParamParser.ParseParameters = ParseParameters;
        /**
         * Parses the key to remove the type.
         * @param keyRaw The raw key.
         * @returns The parsed key.
         */
        function parseKey(keyRaw) {
            return keyRaw.split(":")[0];
        }
        /**
         * Parses the key to get the type.
         * @param keyRaw The raw key.
         * @returns The type of the key.
         */
        function parseKeyType(keyRaw) {
            return keyRaw.split(":")[1];
        }
        /**
         * Writes a detailed error message to the console.
         */
        function writeDetailedError() {
            try {
                if (!KString.any(_ppNameToParseNext))
                    return;
                console.warn(`Please, check Plugin Parameter ${_ppNameToParseNext} in plugin ${_pluginName}`);
            }
            catch (e) {
                console.warn(e);
            }
        }
        /**
         * Parses a parameter item based on its type.
         * @param type The type of the parameter.
         * @param item The parameter item.
         * @returns The parsed parameter item.
         */
        function parseParamItem(type, item) {
            if (!type)
                return item;
            try {
                switch (type) {
                    case "int":
                    case "i":
                        return Number(item);
                    case "intA":
                        return parseArray(item, "int");
                    case "bool":
                    case "b":
                    case "e":
                        return eval(item);
                    case "struct":
                    case "s":
                        return parseStruct(item);
                    case "structA":
                        return parseStructArray(item);
                    case "str":
                        return item;
                    case "strA":
                        return parseArray(item, "str");
                    case "note":
                        return parseNote(item);
                    case "json":
                    case "j":
                        return parseJson(item);
                    case "jA":
                        return parseArray(item, "json");
                    default:
                        return item;
                }
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return item;
            }
        }
        /**
         * Parses an array of items.
         * @param items The items to parse.
         * @param type The type of the items.
         * @returns The parsed array.
         */
        function parseArray(items, type) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(parseParamItem(type, p));
                    }
                    catch (e) {
                        console.warn(e);
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a struct item.
         * @param item The item to parse.
         * @returns The parsed struct.
         */
        function parseStruct(item) {
            try {
                if (!item || !KString.any(item))
                    return null;
                const parsed = JsonEx.parse(item);
                return parsed ? ParseParameters(parsed, _pluginName) : null;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return null;
            }
        }
        /**
         * Parses an array of struct items.
         * @param items The items to parse.
         * @returns The parsed array of structs.
         */
        function parseStructArray(items) {
            try {
                const elements = [];
                const parsed = JsonEx.parse(items);
                for (const p of parsed) {
                    try {
                        elements.push(parseStruct(p));
                    }
                    catch (e) {
                        console.warn(e);
                        writeDetailedError();
                    }
                }
                return elements;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return [];
            }
        }
        /**
         * Parses a note item.
         * @param item The item to parse.
         * @returns The parsed note.
         */
        function parseNote(item) {
            try {
                const parsed = JsonEx.parse(item);
                return parsed ? parsed : item;
            }
            catch (e) {
                console.warn(e);
                writeDetailedError();
                return item;
            }
        }
        /**
         * Parses a JSON item.
         * @param item The item to parse.
         * @returns The parsed JSON.
         */
        function parseJson(item) {
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
                writeDetailedError();
                return null; // To return default value
            }
        }
    })(ParamParser = KDX.ParamParser || (KDX.ParamParser = {}));
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


const RemoveTreasureChest = function (mapId, eventId) {
    try {
        ChestsManager.RemoveChestData({
            mapId: mapId,
            eventId: eventId,
            items: [] // * Clear all items
        });
    }
    catch (error) {
        console.warn(error);
    }
};
const RemoveAllTreasureChests = function () {
    try {
        ChestsManager.ClearAllChestsData();
    }
    catch (error) {
        console.warn(error);
    }
};
const RemoveTreasureChestsForMapId = function (mapId) {
    try {
        ChestsManager.ClearAllChestsDataForMapId(mapId);
    }
    catch (error) {
        console.warn(error);
    }
};
const RemoveTreasureChestsOnCurrentMap = function () {
    try {
        ChestsManager.ClearAllChestsDataForMapId($gameMap.mapId());
    }
    catch (error) {
        console.warn(error);
    }
};
const IsTreasureChestExists = function (mapId, eventId) {
    return ChestsManager.GetChestsData().some((c) => {
        return c.mapId === mapId && c.eventId === eventId;
    });
};
const GetTreasureChestItemsLeftCount = function (mapId, eventId) {
    const chest = ChestsManager.GetChestsData().find((c) => {
        return c.mapId === mapId && c.eventId === eventId;
    });
    return chest ? chest.items.length : 0;
};
const TakeAllFromTreasureChest = function (mapId, eventId) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest) {
            ChestsManager.TakeAllItemsFromChest(chest);
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
const ClearItemsInTreasureChest = function (mapId, eventId) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest) {
            chest.removeAllItems();
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
const PutWeaponToTreasureChest = function (mapId, eventId, weaponId) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest) {
            chest.addItem({
                itemType: 'weapon',
                itemId: weaponId,
                amount: 1
            });
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
const PutArmorToTreasureChest = function (mapId, eventId, armorId) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest) {
            chest.addItem({
                itemType: 'armor',
                itemId: armorId,
                amount: 1
            });
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
const PutItemToTreasureChest = function (mapId, eventId, itemId, amount) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest && amount > 0) {
            chest.addItem({
                itemType: 'item',
                itemId: itemId,
                amount: amount
            });
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
const PutGoldToTreasureChest = function (mapId, eventId, amount) {
    try {
        const chest = ChestsManager.GetChest(mapId, eventId);
        if (chest && amount > 0) {
            chest.addItem({
                itemType: 'gold',
                itemId: 0,
                amount: amount
            });
            ChestsManager.SaveChest(chest);
        }
    }
    catch (error) {
        console.warn(error);
    }
};
window['RemoveTreasureChest'] = RemoveTreasureChest;
window['RemoveAllTreasureChests'] = RemoveAllTreasureChests;
window['RemoveTreasureChestsForMapId'] = RemoveTreasureChestsForMapId;
window['RemoveTreasureChestsOnCurrentMap'] = RemoveTreasureChestsOnCurrentMap;
window['IsTreasureChestExists'] = IsTreasureChestExists;
window['GetTreasureChestItemsLeftCount'] = GetTreasureChestItemsLeftCount;
window['ClearItemsInTreasureChest'] = ClearItemsInTreasureChest;
window['PutWeaponToTreasureChest'] = PutWeaponToTreasureChest;
window['PutArmorToTreasureChest'] = PutArmorToTreasureChest;
window['PutItemToTreasureChest'] = PutItemToTreasureChest;
window['PutGoldToTreasureChest'] = PutGoldToTreasureChest;
window['TakeAllFromTreasureChest'] = TakeAllFromTreasureChest;


var PP;
(function (PP) {
    let _loader;
    /**
        * Load plugin settings
    */
    function LoadPluginSettings() {
        _loader = new KDX.ParamLoader("PKD_TreasureChest");
        PKD_TreasureChestPluginCommands.RegisterPluginCommands();
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
    function openChestMode() {
        return getLoaderParam('openChestMode', 'scene');
    }
    PP.openChestMode = openChestMode;
    function isAutocloseChest() {
        return getLoaderParam('isAutocloseChest', true);
    }
    PP.isAutocloseChest = isAutocloseChest;
    function autocloseDelay() {
        return getLoaderParam('autocloseDelay', 500);
    }
    PP.autocloseDelay = autocloseDelay;
    function takeAll() {
        return getLoaderParam('takeAll', true);
    }
    PP.takeAll = takeAll;
    function takeAllKeyboardKey() {
        return getLoaderParam('takeAllKeyboardKey', 'control');
    }
    PP.takeAllKeyboardKey = takeAllKeyboardKey;
    function takeAllGamepadKey() {
        let key = getLoaderParam('takeAllgamepadKey', 'X').toUpperCase();
        return {
            "X": "shift",
            "Y": "menu",
            "LB": "pageup",
            "RB": "pagedown",
        }[key] || '';
    }
    PP.takeAllGamepadKey = takeAllGamepadKey;
    function takeAllSe() {
        return getLoaderParam('takeAllSe', 'Reflection');
    }
    PP.takeAllSe = takeAllSe;
    function itemPickSe() {
        return getLoaderParam('itemPickSe', 'takeItemFromChest');
    }
    PP.itemPickSe = itemPickSe;
    function goldPickSe() {
        return getLoaderParam('goldPickSe', 'takeGoldFromChest');
    }
    PP.goldPickSe = goldPickSe;
    function goldIconIndex() {
        return getLoaderParam('goldIconIndex', 314);
    }
    PP.goldIconIndex = goldIconIndex;
    function goldImageName() {
        return getLoaderParam('goldImageName', 'pouch_t');
    }
    PP.goldImageName = goldImageName;
    function goldName() {
        return getLoaderParam('goldName', 'Gold');
    }
    PP.goldName = goldName;
})(PP || (PP = {}));
PKD_TreasureChest.Link(PP, "PP");


var PKD_TreasureChestPluginCommands;
(function (PKD_TreasureChestPluginCommands) {
    const PluginName = "PKD_TreasureChest";
    function RegisterPluginCommands() {
        if (KDX.isMV()) {
            return;
        }
        registerCommand_ClearChest();
        registerCommand_PrepareChest();
    }
    PKD_TreasureChestPluginCommands.RegisterPluginCommands = RegisterPluginCommands;
    function registerCommand_ClearChest() {
        // * Don't use => function because it will break the 'this' context
        PluginManager.registerCommand(PluginName, "ClearChest", function () {
            try {
                //const interpreter = this as Game_Interpreter;
                this['clearChest']();
            }
            catch (error) {
                console.warn(error);
            }
        });
    }
    function registerCommand_PrepareChest() {
        // * Don't use => function because it will break the 'this' context
        PluginManager.registerCommand(PluginName, "PrepareChest", function (args) {
            try {
                const parameters = (KDX.ParamParser.ParseParameters(args, PluginName));
                this['prepareChest']();
                if (KString.any(parameters.backgroundImage)) {
                    this['setBackgroundForChest'](parameters.backgroundImage);
                }
                if (parameters.isRemoveAfterClose) {
                    this['removeChestAfterClose']();
                }
                if (KDX.any(parameters.gold)) {
                    let goldAmount = evaluateAppear(parameters.gold);
                    if (goldAmount > 0) {
                        this['putGoldToChest'](goldAmount, 100, true);
                    }
                }
                if (KDX.any(parameters.items)) {
                    parameters.items.forEach(item => {
                        let amount = evaluateAppear(item.config);
                        if (amount > 0) {
                            this['putItemToChest'](item.itemID, amount, 100, true);
                        }
                    });
                }
                if (KDX.any(parameters.weapons)) {
                    parameters.weapons.forEach(weapon => {
                        let amount = evaluateAppear(weapon.config);
                        if (amount > 0) {
                            this['putWeaponToChest'](weapon.weaponID, amount, 100, true);
                        }
                    });
                }
                if (KDX.any(parameters.armors)) {
                    parameters.armors.forEach(armor => {
                        let amount = evaluateAppear(armor.config);
                        if (amount > 0) {
                            this['putArmorToChest'](armor.armorID, amount, 100, true);
                        }
                    });
                }
            }
            catch (error) {
                console.warn(error);
            }
            try {
                this['openChest']();
            }
            catch (error) {
                console.warn(error);
            }
        });
    }
    function evaluateAppear(config) {
        if (!KDX.any(config))
            return 1;
        let amount = 0;
        try {
            if (config.variableAmount > 0) {
                amount = $gameVariables.value(config.variableAmount);
            }
            else {
                amount = Math.floor(Math.random() * (config.maxAmount - config.minAmount + 1)) + config.minAmount;
            }
            if (config.chanceFromVariable > 0) {
                let chance = $gameVariables.value(config.chanceFromVariable);
                if (Math.random() * 100 > chance) {
                    return 0;
                }
            }
            else {
                if (Math.random() * 100 > config.chance) {
                    return 0;
                }
            }
            if (config.conditionSwitch > 0) {
                if (!$gameSwitches.value(config.conditionSwitch)) {
                    return 0;
                }
            }
            if (KString.any(config.conditionScript)) {
                if (!eval(config.conditionScript)) {
                    return 0;
                }
            }
        }
        catch (error) {
            console.warn(error);
            return 0;
        }
        return amount;
    }
})(PKD_TreasureChestPluginCommands || (PKD_TreasureChestPluginCommands = {}));


class Chest {
    constructor(data) {
        this._data = data;
    }
    getData() {
        return this._data;
    }
    addItem(item) {
        this._data.items.push(item);
    }
    removeItem(item) {
        let itemInArray = this._data.items.find((i) => {
            return i.itemId === item.itemId && i.itemType === item.itemType && i.amount === item.amount;
        });
        if (itemInArray) {
            this._data.items = KArray.deleteAll(this._data.items, itemInArray);
        }
    }
    getBackgroundImage() {
        return this._data.background;
    }
    removeAllItems() {
        this._data.items = [];
    }
    getAllItems() {
        return this._data.items;
    }
    isHaveItems() {
        return this._data.items.length > 0;
    }
}
PKD_TreasureChest.Link(Chest, "Chest");


// * Данный класс используется в Game_Interpreter, чтобы сформировать набор предметов для сундука.
// * Если сундук был создан ранее, то он будет открыт без изменений.
var ChestBuilder;
(function (ChestBuilder) {
    let _currentChest = null;
    let _isRemoveChest = false;
    function IsShouldRemoveChest() {
        return _isRemoveChest == true;
    }
    ChestBuilder.IsShouldRemoveChest = IsShouldRemoveChest;
    function PrepareChest(mapId, eventId) {
        _isRemoveChest = false;
        let chest = ChestsManager.GetChest(mapId, eventId);
        if (chest) {
            _currentChest = null;
        }
        else {
            _currentChest = new Chest({
                mapId: mapId,
                eventId: eventId,
                items: []
            });
        }
    }
    ChestBuilder.PrepareChest = PrepareChest;
    function PutWeapon(id, amount, chance, condition) {
        addToChest('weapon', id, amount, chance, condition);
    }
    ChestBuilder.PutWeapon = PutWeapon;
    function PutArmor(id, amount, chance, condition) {
        addToChest('armor', id, amount, chance, condition);
    }
    ChestBuilder.PutArmor = PutArmor;
    function PutItem(id, amount, chance, condition) {
        addToChest('item', id, amount, chance, condition);
    }
    ChestBuilder.PutItem = PutItem;
    function PutGold(amount, chance, condition) {
        addToChest('gold', 0, amount, chance, condition);
    }
    ChestBuilder.PutGold = PutGold;
    function SetBackground(image) {
        if (!_currentChest)
            return;
        _currentChest.getData().background = image;
    }
    ChestBuilder.SetBackground = SetBackground;
    function SaveChest() {
        if (_currentChest) {
            ChestsManager.SaveChest(_currentChest);
        }
    }
    ChestBuilder.SaveChest = SaveChest;
    function SetAutoRemoveChest() {
        _isRemoveChest = true;
    }
    ChestBuilder.SetAutoRemoveChest = SetAutoRemoveChest;
    function addToChest(itemType, id, amount = 1, chance = 100, condition = true) {
        if (!_currentChest)
            return;
        if (typeof condition === 'string') {
            if (!eval(condition))
                return;
        }
        else if (typeof condition === 'boolean') {
            if (!condition)
                return;
        }
        if (Math.random() > chance / 100.0)
            return;
        if (amount <= 0)
            return;
        _currentChest.addItem({
            itemType: itemType,
            itemId: id,
            amount: amount
        });
    }
})(ChestBuilder || (ChestBuilder = {}));
PKD_TreasureChest.Link(ChestBuilder, "ChestBuilder");


class ChestLootScene extends Scene_MenuBase {
    static set currentChest(data) {
        this._currentChest = data;
    }
    needsCancelButton() {
        return false;
    }
    needsPageButtons() {
        return false;
    }
    create() {
        super.create();
        Sprite_TreasureChest.ShowChest(ChestLootScene._currentChest);
    }
    update() {
        super.update();
        if (!Sprite_TreasureChest.IsChestOpen()) {
            this.popScene();
        }
    }
}
ChestLootScene._currentChest = null;
PKD_TreasureChest.Link(ChestLootScene, "ChestLootScene");


var ChestsManager;
(function (ChestsManager) {
    function GetChest(mapId, eventId) {
        const chests = GetChestsData();
        const chest = chests.find((c) => {
            return c.mapId === mapId && c.eventId === eventId;
        });
        return chest ? new Chest(chest) : null;
    }
    ChestsManager.GetChest = GetChest;
    function SaveChest(chest) {
        RemoveChestData(chest.getData());
        AddChestData(chest.getData());
    }
    ChestsManager.SaveChest = SaveChest;
    function GetChestsData() {
        /*@ts-ignore*/
        return $gameSystem.pkdGetTreasureChests();
    }
    ChestsManager.GetChestsData = GetChestsData;
    function AddChestData(data) {
        /*@ts-ignore*/
        $gameSystem.pkdAddTreasureChest(data);
    }
    ChestsManager.AddChestData = AddChestData;
    function RemoveChestData(data) {
        /*@ts-ignore*/
        $gameSystem.pkdRemoveTreasureChest(data);
    }
    ChestsManager.RemoveChestData = RemoveChestData;
    function ClearAllChestsData() {
        /*@ts-ignore*/
        $gameSystem.pkdClearAllTreasureChestsData();
    }
    ChestsManager.ClearAllChestsData = ClearAllChestsData;
    function ClearAllChestsDataForMapId(mapId) {
        /*@ts-ignore*/
        $gameSystem.pkdClearAllTreasureChestsDataForMapId(mapId);
    }
    ChestsManager.ClearAllChestsDataForMapId = ClearAllChestsDataForMapId;
    function AddChestItemToPlayer(item) {
        try {
            if (!KDX.any(item))
                return;
            if (item.itemType === 'gold') {
                $gameParty.gainGold(item.amount);
                return;
            }
            let itemData = ConvertChestItemDataToItem(item);
            if (itemData) {
                $gameParty.gainItem(itemData, item.amount, true);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    ChestsManager.AddChestItemToPlayer = AddChestItemToPlayer;
    function ConvertChestItemDataToItem(item) {
        try {
            if (!KDX.any(item))
                return null;
            switch (item.itemType) {
                case 'weapon':
                    return $dataWeapons[item.itemId];
                case 'armor':
                    return $dataArmors[item.itemId];
                case 'item':
                    return $dataItems[item.itemId];
                case 'gold':
                    return null;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return null;
    }
    ChestsManager.ConvertChestItemDataToItem = ConvertChestItemDataToItem;
    function TakeAllItemsFromChest(chest) {
        const items = chest.getAllItems();
        items.forEach((item) => {
            AddChestItemToPlayer(item);
        });
        chest.removeAllItems();
    }
    ChestsManager.TakeAllItemsFromChest = TakeAllItemsFromChest;
})(ChestsManager || (ChestsManager = {}));
PKD_TreasureChest.Link(ChestsManager, "ChestsManager");


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = DataManager;
    /**
     * Register NUI file for load with Database
     * @param {string} filnename - NUI file name WITHOUT extension
     */
    function pkdRegisterLocalNUIFile(filnename) {
        KDNUI.RegisterNUIFile("PKD_TreasureChest", filnename);
    }
    pkdRegisterLocalNUIFile('NUI_ChestItem');
    pkdRegisterLocalNUIFile('NUI_TreasureChest');
    //@[ALIAS]
    const ALIAS__loadDataFile = _.loadDataFile;
    _.loadDataFile = function (name, src) {
        if (src.includes("PKD_TreasureChest")) {
            src = src.replace("Test_", "");
        }
        ALIAS__loadDataFile.call(this, name, src);
    };
})();
// ■ END DataManager.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Game_Interpreter.prototype;
    _['clearChest'] = function () {
        try {
            const mapId = $gameMap.mapId();
            const eventId = this._eventId;
            ChestsManager.RemoveChestData({
                mapId: mapId,
                eventId: eventId,
                items: [] // * Clear all items
            });
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['prepareChest'] = function () {
        try {
            const mapId = $gameMap.mapId();
            const eventId = this._eventId;
            ChestBuilder.PrepareChest(mapId, eventId);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['putWeaponToChest'] = function (id, amount, chance, condition) {
        try {
            ChestBuilder.PutWeapon(id, amount, chance, condition);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['putArmorToChest'] = function (id, amount, chance, condition) {
        try {
            ChestBuilder.PutArmor(id, amount, chance, condition);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['putItemToChest'] = function (id, amount, chance, condition) {
        try {
            ChestBuilder.PutItem(id, amount, chance, condition);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['putGoldToChest'] = function (amount, chance, condition) {
        try {
            ChestBuilder.PutGold(amount, chance, condition);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['setBackgroundForChest'] = function (image) {
        try {
            ChestBuilder.SetBackground(image);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['removeChestAfterClose'] = function () {
        try {
            ChestBuilder.SetAutoRemoveChest();
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['openChest'] = function () {
        try {
            ChestBuilder.SaveChest();
            const mapId = $gameMap.mapId();
            const eventId = this._eventId;
            let chest = ChestsManager.GetChest(mapId, eventId);
            if (chest == null) {
                console.warn('Chest not found, are you sure you have prepared it before put items? (this.prepareChest())');
                chest = new Chest({
                    mapId: mapId,
                    eventId: eventId,
                    items: []
                });
            }
            if (PP.openChestMode() == 'scene') {
                ChestLootScene.currentChest = chest;
                SceneManager.push(ChestLootScene);
            }
            else {
                Sprite_TreasureChest.ShowChest(chest);
                this.setWaitMode('_treasureChest');
            }
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['isChestHaveItems'] = function () {
        try {
            const mapId = $gameMap.mapId();
            const eventId = this._eventId;
            const chest = ChestsManager.GetChest(mapId, eventId);
            return chest ? chest.isHaveItems() : false;
        }
        catch (error) {
            console.warn(error);
            return false;
        }
    };
})();
// ■ END Game_Interpreter.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Game_Interpreter.prototype;
    //@[ALIAS]
    const ALIAS__updateWaitMode = _.updateWaitMode;
    _.updateWaitMode = function () {
        let t = this;
        if (t._waitMode === '_treasureChest') {
            return Sprite_TreasureChest.IsChestOpen();
        }
        return ALIAS__updateWaitMode.call(this);
    };
})();
// ■ END Game_Interpreter.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Game_Map.prototype;
    //@[ALIAS]
    const ALIAS__isEventRunning = _.isEventRunning;
    _.isEventRunning = function () {
        if (Sprite_TreasureChest.IsChestOpen()) {
            return true;
        }
        return ALIAS__isEventRunning.call(this);
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
    _['pkdGetTreasureChests'] = function () {
        if (!KDX.any(this._pkdGetTreasureChestsData)) {
            this._pkdGetTreasureChestsData = [];
        }
        return this._pkdGetTreasureChestsData;
    };
    _['pkdAddTreasureChest'] = function (data) {
        this.pkdGetTreasureChests();
        if (!KDX.any(data))
            return;
        this._pkdGetTreasureChestsData.push(data);
    };
    _['pkdRemoveTreasureChest'] = function (data) {
        this.pkdGetTreasureChests();
        if (!KDX.any(data))
            return;
        try {
            let item = this._pkdGetTreasureChestsData.find((chest) => {
                return chest.mapId === data.mapId && chest.eventId === data.eventId;
            });
            this._pkdGetTreasureChestsData = KArray.deleteAll(this._pkdGetTreasureChestsData, item);
        }
        catch (error) {
            console.warn(error);
        }
    };
    _['pkdClearAllTreasureChestsData'] = function () {
        this._pkdGetTreasureChestsData = [];
    };
    _['pkdClearAllTreasureChestsDataForMapId'] = function (mapId) {
        this._pkdGetTreasureChestsData = this._pkdGetTreasureChestsData.filter((chest) => {
            return chest.mapId !== mapId;
        });
    };
})();
// ■ END Game_System.ts
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
        ALIAS__start.call(this);
        PP.LoadPluginSettings();
    };
})();
// ■ END Scene_Boot.ts
//---------------------------------------------------------------------------


//$[ENCODE]
class Sprite_ChestItem extends KNSprite {
    constructor(_chestItem) {
        super();
        this._chestItem = _chestItem;
        this._isSelected = false;
        this._create();
    }
    get itemData() {
        return this._chestItem;
    }
    realWidth() {
        if (this._itemMain) {
            let padding = this.uiConstant('padding');
            let p = NUtils.ConvertDimension(padding.x);
            return this._itemMain.realWidth() + p;
        }
        else
            return super.realWidth();
    }
    realHeight() {
        if (this._itemMain) {
            let padding = this.uiConstant('padding');
            let p = NUtils.ConvertDimension(padding.y);
            if (KDX.isMV()) {
                p += NUtils.ConvertDimension('10hdp');
            }
            return this._itemMain.realHeight() + p;
        }
        else
            return super.realHeight();
    }
    isHaveItem() {
        return !!this._chestItem;
    }
    isGold() {
        if (this.isHaveItem()) {
            return this._chestItem.itemType === 'gold';
        }
        else {
            return false;
        }
    }
    itemName() {
        try {
            if (!this.isHaveItem())
                return "";
            if (this.isGold()) {
                return PP.goldName();
            }
            let item = this._getGameItem();
            if (item) {
                return item.name;
            }
        }
        catch (error) {
            console.warn(error);
            return "error";
        }
        return '???';
    }
    itemAmountText() {
        let amount = this.itemAmount();
        if (amount <= 1)
            return "";
        return amount.toString();
    }
    itemAmount() {
        if (!this.isHaveItem())
            return 0;
        return this._chestItem.amount;
    }
    itemImage() {
        try {
            if (!this.isHaveItem())
                return 0;
            if (this.isGold()) {
                let iconIndex = PP.goldIconIndex();
                let goldImage = PP.goldImageName();
                if (KString.any(goldImage)) {
                    return goldImage;
                }
                else {
                    return iconIndex;
                }
            }
            let item = this._getGameItem();
            if (item) {
                if (KGameItems.IsHaveMeta('imageForChest', item)) {
                    return KGameItems.GetMeta('imageForChest', item);
                }
                return item.iconIndex;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    itemPickSound() {
        try {
            if (!this.isHaveItem())
                return "";
            if (this.isGold()) {
                return PP.goldPickSe();
            }
            let item = this._getGameItem();
            if (item) {
                if (KGameItems.IsHaveMeta('pickFromChestSE', item)) {
                    return KGameItems.GetMeta('pickFromChestSE', item);
                }
                else {
                    return PP.itemPickSe();
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return "";
    }
    activateInList() {
        var _a;
        this._isSelected = true;
        (_a = this._selectedImage) === null || _a === void 0 ? void 0 : _a.refreshBindings(this, false);
    }
    deactivateInList() {
        var _a;
        this._isSelected = false;
        (_a = this._selectedImage) === null || _a === void 0 ? void 0 : _a.refreshBindings(this, false);
    }
    isSelectedInList() {
        return this._isSelected;
    }
    // * Not used
    setActivatedInListState(value) { }
    pickUp(silent = false) {
        if (!this.isHaveItem())
            return;
        if (!silent) {
            KAudio.PlaySE(this.itemPickSound());
        }
        this._chestItem = null;
        this._playPickUpAnimation(() => {
            this.refreshBindings(this, true);
        });
    }
    _getGameItem() {
        return ChestsManager.ConvertChestItemDataToItem(this._chestItem);
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
    }
    _scheme() {
        return PKD_TreasureChest.GetNUIFile('NUI_ChestItem');
    }
    _playPickUpAnimation(callback) {
        let animationRule = this.uiConstant('pickUpAnimation');
        if (KDX.any(animationRule) && this._itemContentGroup) {
            let animation = this._itemContentGroup.setAnimationRule(animationRule);
            animation.setEndCallback(callback);
        }
        else {
            callback();
        }
    }
}
PKD_TreasureChest.Link(Sprite_ChestItem, "Sprite_ChestItem");


//$[ENCODE]
class Sprite_TreasureChest extends KSprite {
    static ShowChest(chest) {
        this.CloseChest();
        this._treasureChestSprite = new Sprite_TreasureChest(chest);
        SceneManager._scene.addChild(this._treasureChestSprite);
    }
    static CloseChest() {
        if (this._treasureChestSprite) {
            this._treasureChestSprite.removeFromParent();
            this._treasureChestSprite.destroy();
            this._treasureChestSprite = null;
            Input.clear();
            TouchInput.clear();
        }
    }
    static IsChestOpen() {
        return !!this._treasureChestSprite;
    }
    constructor(_currentChest) {
        super();
        this._currentChest = _currentChest;
        this._autocloseThread = 0;
        this._isCanAutoclose = true;
        this._create();
    }
    chest() {
        return this._currentChest;
    }
    backgroundImageName() {
        let image = this.chest().getBackgroundImage();
        if (KString.any(image)) {
            return image;
        }
        else {
            return "defaultChestBackground";
        }
    }
    _create() {
        var _a, _b;
        KDNUI.FromScheme(this._scheme(), this);
        this._isCanAutoclose = PP.isAutocloseChest();
        if (!this.chest().isHaveItems()) {
            this._isCanAutoclose = false;
        }
        try {
            (_a = this._closeButton) === null || _a === void 0 ? void 0 : _a.addClickHandler(() => {
                this._closeChest();
            });
            (_b = this._takeAllButton) === null || _b === void 0 ? void 0 : _b.addClickHandler(() => {
                this._takeAll();
            });
        }
        catch (error) {
            console.warn(error);
        }
        this._createItemsList();
    }
    isTakeAllButtonAvailable() {
        return PP.takeAll();
    }
    update() {
        super.update();
        this._updateAutoclose();
        this._updateKeyboardInput();
        if (KInput.IsCancel()) {
            this._closeChest();
        }
    }
    _scheme() {
        return PKD_TreasureChest.GetNUIFile('NUI_TreasureChest');
    }
    _createItemsList() {
        if (!KDX.any(this._itemsList))
            return;
        try {
            this._itemsList.list.setOkHandler(this._onItemClick.bind(this));
            this._itemsList.list.setSelectionHandler(this._onItemSelect.bind(this));
            let items = this.chest().getAllItems();
            let minItemsCount = this._itemsList.uiConstant('minVisibleCelsCount');
            let itemElements = [];
            if (minItemsCount > 0) {
                if (items.length > minItemsCount) {
                    minItemsCount = items.length;
                }
                for (let i = 0; i < minItemsCount; i++) {
                    let item = items[i];
                    if (item) {
                        itemElements.push(new Sprite_ChestItem(item));
                    }
                    else {
                        itemElements.push(new Sprite_ChestItem(null));
                    }
                }
            }
            else {
                itemElements = items.map((item) => {
                    return new Sprite_ChestItem(item);
                });
            }
            this._itemsList.list.setItems(itemElements);
            if (itemElements.length > 0 && this.chest().isHaveItems()) {
                this._itemsList.list.activate(0);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _onItemClick() {
        try {
            let item = this._itemsList.list.selectedItem();
            if (item && item.isHaveItem()) {
                let itemData = item.itemData;
                ChestsManager.AddChestItemToPlayer(itemData);
                this.chest().removeItem(itemData);
                item.pickUp();
                this._onItemSelect();
            }
        }
        catch (error) {
            console.warn(error);
        }
        if (this.chest().isHaveItems()) {
            this._itemsList.list.activate();
        }
    }
    _onItemSelect() {
        var _a, _b;
        try {
            let item = this._itemsList.list.selectedItem();
            if (item) {
                (_a = this._itemNameText) === null || _a === void 0 ? void 0 : _a.drawText(item.itemName());
            }
            else {
                (_b = this._itemNameText) === null || _b === void 0 ? void 0 : _b.drawText("");
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _closeChest() {
        try {
            if (ChestBuilder.IsShouldRemoveChest()) {
                ChestsManager.RemoveChestData(this.chest().getData());
            }
            else {
                ChestsManager.SaveChest(this.chest());
            }
        }
        catch (error) {
            console.warn(error);
        }
        Sprite_TreasureChest.CloseChest();
    }
    _takeAll() {
        var _a;
        try {
            if (!this.isTakeAllButtonAvailable())
                return;
            if (this.chest().isHaveItems()) {
                if (!this._itemsList.list)
                    return;
                KAudio.PlaySE(PP.takeAllSe());
                this._itemsList.list.deactivate();
                (_a = this._itemNameText) === null || _a === void 0 ? void 0 : _a.drawText("");
                this._itemsList.list.getAllItems().forEach((item) => {
                    if (!item.isHaveItem())
                        return;
                    ChestsManager.AddChestItemToPlayer(item.itemData);
                    this.chest().removeItem(item.itemData);
                    item.pickUp(true);
                });
            }
            else {
                this._closeChest();
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _updateAutoclose() {
        if (!this._isCanAutoclose)
            return;
        if (this.chest().getAllItems().length == 0) {
            if (this._autocloseThread == 0) {
                this._autocloseThread = setTimeout(() => {
                    this._closeChest();
                }, PP.autocloseDelay());
            }
        }
        else {
            if (this._autocloseThread != 0) {
                clearTimeout(this._autocloseThread);
                this._autocloseThread = 0;
            }
        }
    }
    _updateKeyboardInput() {
        if (Input.isTriggered(PP.takeAllKeyboardKey()) || Input.isTriggered(PP.takeAllGamepadKey())) {
            this._takeAll();
        }
    }
}
PKD_TreasureChest.Link(Sprite_TreasureChest, "Sprite_TreasureChest");


})();