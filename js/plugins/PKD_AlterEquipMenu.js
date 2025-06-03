/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:
 * @plugindesc (v.1.1)[PRO] Alternative Equipment Menu
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * This plugin change default equipment menu layout to alternative one.
 * You can configurate windows positions and equipment slots
 * in Plugin Parameters.
 *
 * Plugin have resources: img\pAlterEquipMenu, you can edit them for your purposes
 * 
 * Extra Notetags for Actors:
 * <pEquipImg:NAME> - actor picture for equipment scene (stats window background)
 * Recommended size: 248x400px (for default resolution)
 *
 * <pEquipBodyImg:NAME> - actor silhouette for equipment slots background
 * Recommended size: 280x440px (for default resolution)
 *
 * Both are optional and should be in pictures folder
 * Example: <pEquipImg:Actor1_2>
 *
 * <pEquipSlotHide:N,N,...> - hide equip slots N for this Actor
 *
 * Example: <pEquipSlotHide:1> - Hide Weapon slot
 * Example: <pEquipSlotHide:1,4> - Hide Weapon and Body slots
 *
 * <pEquipSlotPos:N,X,Y> - custom position X,Y for slot N for this Actor
 *
 * !Warning: Multiple notes allowed
 *
 * Example: <pEquipSlotPos:1,20,40> - Weapon slot will be in position 20, 40
 *
 *
 * If you want use plugin with VisuMZ_1_ItemsEquipsCore plugin,
 * you should configurate VisuMZ_1_ItemsEquipsCore plugin parameters
 * for adjust windows positions for not overlapping or disable
 * VisuMZ_1_ItemsEquipsCore extra windows and status menu
 *
 * ---------------------------------------------------------------------------
 * Contains resources designed and drawn
 * by Ekaterina N. Stadnikova (MOSCOW RUSSIA)
 * https://stadnikova-ekaterina.itch.io/
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 *  @param slotsPositions:structA
 *  @text Slots
 *  @type struct<XY>[]
 *  @desc Equip slots positions. Index = Database: Types -> Equipment Types index
 *  @default ["{\"x:int\":\"20\",\"y:int\":\"200\"}","{\"x:int\":\"210\",\"y:int\":\"200\"}","{\"x:int\":\"110\",\"y:int\":\"52\"}","{\"x:int\":\"110\",\"y:int\":\"120\"}","{\"x:int\":\"210\",\"y:int\":\"52\"}","{\"x:int\":\"130\",\"y:int\":\"350\"}","{\"x:int\":\"110\",\"y:int\":\"210\"}","{\"x:int\":\"210\",\"y:int\":\"140\"}","{\"x:int\":\"20\",\"y:int\":\"80\"}","{\"x:int\":\"20\",\"y:int\":\"300\"}"]
 * 
 *  @param slotSize:i
 *  @parent slotsPositions:structA
 *  @text Slot Size
 *  @type number
 *  @desc Equip slot size
 *  @min 12
 *  @default 48
 *  
 *  @param disabledSlotIconIndex:i
 *  @parent slotsPositions:structA
 *  @text Disabled Icon
 *  @type number
 *  @desc Disabled slot icon index (when Actor have sealed slot, this icons will be drawn in it)
 *  @min 0
 *  @default 21
 * 
 *  @param windowSkins:struct
 *  @text Window Skins
 *  @type struct<windowSkins>
 *  @desc [PRO] Windowskin images configuration for windows
 *  @default {"slotWindow:str":"Window","statusWindow:str":"Window","itemsWindow:str":"Window","commandsWindow:str":"Window"}
 * 
 *  @param isUseCustomPos:bool
 *  @text Is Use Custom Positions?
 *  @type boolean
 *  @on Yes
 *  @off No
 *  @desc [PRO] Use custom windows positions? From parameters below
 *  @default false
 * 
 *  @param slotsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Slots Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"310\",\"h:int\":\"468\"}"}
 * 
 *  @param statusWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Status Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param itemsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Items Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"559\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param helpWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Help Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"520\"}","size:struct":"{\"w:int\":\"808\",\"h:int\":\"96\"}"}
 * 
 *  @param commandsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Commands Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"498\",\"h:int\":\"68\"}"}
 * 
 * @param equipSceneBackgroundImage
 * @text Background Image
 * @type file
 * @require 1
 * @dir img/pAlterEquipMenu/
 * @default
 * @desc Background image for whole equip scene. [Optional]
 * 
 * @param isDrawActorImgFore:b
 * @text Actor Image Foreground
 * @desc Is draw actor image foreground (dimmer) in stats window?
 * @type boolean
 * @default true
 * 
 * @param actorImgFore:j
 * @text Settings
 * @parent isDrawActorImgFore:b
 * @type note
 * @default "\"opacity\": 130\n\"color\": \"#000000\""
 * @desc Actor image foreground dimmer settings. "Parameter" : value. You can change values after :
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.1)[PRO] Альтернативное меню экипировки
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * Плагин изменяет стандартное меню экипировки на алтернативное. Позиции окон и 
 * слотов экипировки можно изменить через параметры плагина.
 *
 *
 * Плагин имеет ресурсы: img\pAlterEquipMenu (можно редактировать по надобности)
 *
 * Доп. заметки для персонажей: 
 *
 * <pEquipImg:NAME> - изображение персонажа (задник для статистики)
 * Рекомендованный размер картинки: 248x400px (для стандартного разрешения)

 * <pEquipBodyImg:NAME> - силуэт тела персонажа (задник для слотов)
 * Рекомендованный размер картинки: 280x440px (для стандартного разрешения)
 *
 * Изображения должны быть в папке pictures
 * Пример: <pEquipImg:Actor1_2>

 * <pEquipSlotHide:N,N,...> - Спрятать слоты N для данного персонажа
 *
 * Пример: <pEquipSlotHide:1> - Спрятать слот 1 (оружие)
 * Пример: <pEquipSlotHide:1,4> - Спрятать слоты 1 и 4 (оружие и тело)
 *
 * <pEquipSlotPos:N,X,Y> - задать позицию X, Y для слота N
 *
 * !Можно использовать несколько раз!
 *
 * Пример: <pEquipSlotPos:1,20,40> - Слот 1 (оружие) будет в позиции 20, 40 (пиксели)
 *
 *
 * Если Вы хотите использовать данный плагин вместе с VisuMZ_1_ItemsEquipsCore, то
 * Вам необходимо настроить плагин VisuMZ_1_ItemsEquipsCore через его параметры. Изменить
 * позиции окон или отключить доп. окна (новое статус меню)
 *
 * ---------------------------------------------------------------------------
 * Плагин содержит графику от Екатерины Стадниковой
 * https://stadnikova-ekaterina.itch.io/
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 *  @param slotsPositions:structA
 *  @text Slots
 *  @type struct<XY>[]
 *  @desc Позиция слота экипировки. Индекс = БД: Типы -> индекс типа экипировки
 *  @default ["{\"x:int\":\"20\",\"y:int\":\"200\"}","{\"x:int\":\"210\",\"y:int\":\"200\"}","{\"x:int\":\"110\",\"y:int\":\"52\"}","{\"x:int\":\"110\",\"y:int\":\"120\"}","{\"x:int\":\"210\",\"y:int\":\"52\"}","{\"x:int\":\"130\",\"y:int\":\"350\"}","{\"x:int\":\"110\",\"y:int\":\"210\"}","{\"x:int\":\"210\",\"y:int\":\"140\"}","{\"x:int\":\"20\",\"y:int\":\"80\"}","{\"x:int\":\"20\",\"y:int\":\"300\"}"]
 * 
 *  @param slotSize:i
 *  @parent slotsPositions:structA
 *  @text Slot Size
 *  @type number
 *  @desc Размер слота экипировки
 *  @min 12
 *  @default 48
 * 
 *  @param disabledSlotIconIndex:i
 *  @parent slotsPositions:structA
 *  @text Disabled Icon
 *  @type number
 *  @desc Номер иконки для недоступного слота (когда у персонажа слот закрыт)
 *  @min 0
 *  @default 21
 * 
 *  @param windowSkins:struct
 *  @text Window Skins
 *  @type struct<windowSkins>
 *  @desc [PRO] Скины для окон
 *  @default {"slotWindow:str":"Window","statusWindow:str":"Window","itemsWindow:str":"Window","commandsWindow:str":"Window"}
 * 
 *  @param isUseCustomPos:bool
 *  @text Is Use Custom Positions?
 *  @type boolean
 *  @on Yes
 *  @off No
 *  @desc [PRO] Использовать свои настройки позиций для окон?
 *  @default false
 * 
 *  @param slotsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Slots Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"310\",\"h:int\":\"468\"}"}
 * 
 *  @param statusWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Status Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param itemsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Items Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"559\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param helpWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Help Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"520\"}","size:struct":"{\"w:int\":\"808\",\"h:int\":\"96\"}"}
 * 
 *  @param commandsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Commands Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"498\",\"h:int\":\"68\"}"}
 * 
 * @param equipSceneBackgroundImage
 * @text Background Image
 * @type file
 * @require 1
 * @dir img/pAlterEquipMenu/
 * @default
 * @desc Опционально. Фоновое изображение для всей сцены.
 * 
 * @param isDrawActorImgFore:b
 * @text Actor Image Foreground
 * @desc Рисовать затемнение под хар-ками? (Над избр. персонажа)
 * @type boolean
 * @default true
 * 
 * @param actorImgFore:j
 * @text Settings
 * @parent isDrawActorImgFore:b
 * @type note
 * @default "\"opacity\": 130\n\"color\": \"#000000\""
 * @desc Настройки затемнения. Параметр : значение. Значение после : можно менять.
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
*/

/*~struct~XY:

 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
*/

/*~struct~windowSkins:
  @param slotWindow:str
  @text Slots Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param statusWindow:str
  @text Status Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param itemsWindow:str
  @text Items Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param commandsWindow:str
  @text Commands Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window
*/

/*~struct~windowPos:

 @param position:struct
 @text Position
 @type struct<XY>
 @desc
 @default {}

 @param size:struct
 @text Size
 @type struct<WH>
 @desc
 @default {}

 @param transparent:bool
 @text Is Transparent?
 @type boolean
 @default false

*/



var Imported = Imported || {};
Imported.PKD_AlterEquipMenu = true;

var PKD_AlterEquipMenu = {};
PKD_AlterEquipMenu.Version = 110;

//?VERSION
PKD_AlterEquipMenu.isPro = function() { return false; };

// * For parameters
PKD_AlterEquipMenu.PP = {};
PKD_AlterEquipMenu.Utils = {};

// * Загрзука параметров
PKD_AlterEquipMenu.LoadPluginSettings = () => {
    PKD_AlterEquipMenu.PP._loader = new PKD_AlterEquipMenu.KDParamLoaderLite("PKD_AlterEquipMenu");
};



// Generated by CoffeeScript 2.6.1
(function() {
  if (window.KDCore != null) {
    return;
  }
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  return String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
})();


// Generated by CoffeeScript 2.6.1
// * Класс аналог KDCore.ParamLoader, но упрощённый, чтобы всю библиотеку не тащить
(function() {
  var KDParamLoaderLite;
  KDParamLoaderLite = (function() {
    class KDParamLoaderLite {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.pParametersUnsafe(this.pluginName);
        if (!this.isLoaded()) {
          return;
        }
        this.params = this.parseParameters(this.paramsRaw);
        return;
      }

      isLoaded() {
        return this.paramsRaw != null;
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        if (!this.isLoaded()) {
          return false;
        } else {
          return this.params[paramName] != null;
        }
      }

      // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        var value;
        if (this.isHasParameter(paramName)) {
          value = this.params[paramName];
          if (value != null) {
            return value;
          }
        }
        return def;
      }

      parseParamItem(type, item) {
        var e;
        try {
          if (type == null) {
            return item;
          }
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
            case "css":
              if (window.KDCore != null) {
                return item.toCss();
              } else {
                return item;
              }
              break;
            case "color":
              if (window.KDCore != null) {
                return KDCore.Color.FromHex(item);
              } else {
                return item;
              }
              break;
            case "json":
            case "j":
              return this.parseJson(item);
            default:
              return item;
          }
        } catch (error) {
          e = error;
          console.warn(e);
          return item;
        }
      }

      parseArray(items, type) {
        var e, elements, i, len, p, parsed;
        try {
          elements = [];
          parsed = JsonEx.parse(items);
          for (i = 0, len = parsed.length; i < len; i++) {
            p = parsed[i];
            try {
              elements.push(this.parseParamItem(type, p));
            } catch (error) {
              e = error;
              console.warn(e);
            }
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        return elements;
      }

      parseStruct(item) {
        var e, parsed;
        try {
          parsed = JsonEx.parse(item);
          if (parsed != null) {
            return this.parseParameters(parsed);
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        return null;
      }

      parseStructArray(items) {
        var e, elements, i, len, p, parsed;
        try {
          elements = [];
          parsed = JsonEx.parse(items);
          for (i = 0, len = parsed.length; i < len; i++) {
            p = parsed[i];
            try {
              elements.push(this.parseStruct(p));
            } catch (error) {
              e = error;
              console.warn(e);
            }
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        return elements;
      }

      parseNote(item) {
        var e, parsed;
        try {
          parsed = JsonEx.parse(item);
          if (parsed != null) {
            return parsed;
          }
        } catch (error) {
          e = error;
          console.warn(e);
        }
        return item;
      }

      parseJson(item) {
        var cx, e, element, elements, i, json, key, len, parsed, value;
        try {
          json = {};
          parsed = JsonEx.parse(item);
          elements = parsed.split('\n');
          for (i = 0, len = elements.length; i < len; i++) {
            element = elements[i];
            cx = "{" + element + "}";
            try {
              item = JsonEx.parse(cx);
              for (key in item) {
                value = item[key];
                json[key] = value;
              }
            } catch (error) {
              e = error;
              console.warn("Parameter " + element + " have syntax errors, ignored");
            }
          }
          return json;
        } catch (error) {
          e = error;
          console.warn(e);
          return null; // * Чтобы default value был возвращён
        }
      }

    };

    KDParamLoaderLite.Version = 200;

    return KDParamLoaderLite;

  }).call(this);
  PKD_AlterEquipMenu.KDParamLoaderLite = KDParamLoaderLite;
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PluginManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PluginManager;
  // * Не возвращает {}, а возвращает null, чтобы можно было проверить isLoaded
  _.pParametersUnsafe = function(name) {
    return this._parameters[name.toLowerCase()];
  };
})();

// ■ END PluginManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = PKD_AlterEquipMenu.PP;
  _.getSlotSize = function() {
    return this._loader.getParam("slotSize", 48);
  };
  _.getSlotsPositions = function() {
    return this._loader.getParam("slotsPositions", [
      {
        x: 20,
        y: 200
      },
      {
        x: 210,
        y: 200
      },
      {
        x: 110,
        y: 52
      },
      {
        x: 110,
        y: 120
      },
      {
        x: 210,
        y: 52
      },
      {
        x: 130,
        y: 350
      },
      {
        x: 110,
        y: 210
      },
      {
        x: 210,
        y: 140
      },
      {
        x: 20,
        y: 80
      },
      {
        x: 20,
        y: 300
      }
    ]);
  };
  _.getDisabledSlotIconIndex = function() {
    return this._loader.getParam('disabledSlotIconIndex', 21);
  };
  //?[VERSION]
  _.getWindowSkins = function() {
    return null;
  };
  //?[VERSION]
  _.isUseCustomWindowPositions = function() {
    return false;
  };
  _.equipSceneBackgroundImage = function() {
    return this._loader.getParam("equipSceneBackgroundImage", "");
  };
  _.isDrawActorImageForeground = function() {
    return this._loader.getParam('isDrawActorImgFore', true);
  };
  _.actorImageForegroundSettings = function() {
    return this._loader.getParam("actorImgFore", {
      opacity: 130,
      color: "#000000"
    });
  };
})();

// ■ END Parameters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[FROM KDCore]

  //@[DEFINES]
  _ = PKD_AlterEquipMenu.Utils;
  _.hasMeta = function(symbol, obj) {
    return (obj.meta != null) && (obj.meta[symbol] != null);
  };
  _.getValueFromMeta = function(symbol, obj) {
    if (!_.hasMeta(symbol, obj)) {
      return null;
    }
    return obj.meta[symbol];
  };
  // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
  // * Пример использования loadImageAsync(a, b).then(метод)
  // в метод будет передан bitmap первым аргументом
  _.loadImageAsync = async function(folder, filename) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var b;
      b = ImageManager.loadBitmap("img/" + folder + "/", filename);
      return b.addLoadListener(function() {
        return resolve(b);
      });
    });
    return (await promise);
  };
  _.isMV = function() {
    return Utils.RPGMAKER_NAME === 'MV';
  };
})();

// ■ END Parameters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
PKD_AlterEquipMenu.isPro = function() {
  return true;
};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__loadWindowskin, ALIAS__setActor, _;
  //@[DEFINES]
  _ = Window_EquipStatus.prototype;
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.statusWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    this._createStatsIconsLayer();
  };
  //@[ALIAS]
  ALIAS__setActor = _.setActor;
  _.setActor = function() {
    ALIAS__setActor.call(this, ...arguments);
    this.pDrawActorImage();
  };
  //$[OVER]
  _.itemPadding = function() {
    return 20;
  };
  //$[OVER]
  _.paramY = function(index) {
    var btw, startY, step;
    startY = 10;
    step = 32;
    btw = 6;
    if (index === 0) {
      return startY;
    } else {
      return startY + ((step + btw) * index);
    }
  };
  //$[OVER]
  _.paramX = function() {
    return 70;
  };
  //$[OVER]
  _.drawActorName = function() {}; // * EMPTY
  
  //$[OVER]
  _.drawActorFace = function() {
    return this.pDrawActorImageForeground();
  };
  //$[OVER]
  _.drawParamName = function() {}; // * EMPTY
})();

// ■ END Window_EquipStatus.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_AlterEquipMenu.PP;
  _.getWindowSkins = function() {
    return this._loader.getParam("windowSkins", null);
  };
  _.isUseCustomWindowPositions = function() {
    return this._loader.getParam("isUseCustomPos", false);
  };
  _.dummyRect = function() {
    return new Rectangle(0, 0, 200, 200);
  };
  _.getWindowRect = function(key) {
    var config, e, position, r, size, transparent;
    try {
      config = this._loader.getParam(key, null);
      if (config == null) {
        return this.dummyRect();
      }
      ({position, size, transparent} = config);
      r = new Rectangle(position.x, position.y, size.w, size.h);
      r.transparent = transparent;
      return r;
    } catch (error) {
      e = error;
      console.warn(e);
      return this.dummyRect();
    }
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawItem, _;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = Window_EquipStatus.prototype;
  //$[OVER]
  _.windowWidth = function() {
    return 252;
  };
  
  //@[ALIAS]
  ALIAS__drawItem = _.drawItem;
  _.drawItem = function(x, y, paramId) {
    x = -this.paramX() - this.standardPadding();
    y = this.paramY(paramId - 2);
    return ALIAS__drawItem.call(this, x, y, paramId);
  };
})();

// ■ END Window_EquipStatus.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //TODO: Вынести в KDCore методы получения массива значений из параметра с запятыми и массива значений из нескольких одинаковых параметров!
  _.pGetEquipImg = function() {
    var e, img;
    try {
      return img = PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipImg', this.actor());
    } catch (error) {
      e = error;
      console.warn(e);
      return "";
    }
  };
  _.pGetEquipBodyImg = function() {
    var e, img;
    try {
      return img = PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipBodyImg', this.actor());
    } catch (error) {
      e = error;
      console.warn(e);
      return "";
    }
  };
  _.pGetHiddenSlotIndexes = function() {
    var e, items, slots;
    try {
      slots = PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipSlotHide', this.actor());
      if (String.any(slots)) {
        if (slots.contains(',')) {
          items = slots.split(',').map(function(i) {
            return parseInt(i);
          });
          return items || [];
        } else {
          return [parseInt(slots)];
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return [];
  };
  _.pGetCustomSlotPosition = function(index) {
    var e, j, k, len, len1, line, lines, p, positions;
    try {
      positions = [];
      if (PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipSlotPos', this.actor()) != null) {
        lines = this.actor().note.split("\n");
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          if (!line.contains(",")) {
            continue;
          }
          if (!line.contains("<pEquipSlotPos:")) {
            continue;
          }
          positions.push(this._pExtractSlotPositionDataFromLine(line));
        }
        for (k = 0, len1 = positions.length; k < len1; k++) {
          p = positions[k];
          if ((p != null) && p.index === index) {
            return {
              x: p.x,
              y: p.y
            };
          }
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return null;
  };
  _._pExtractSlotPositionDataFromLine = function(line) {
    var e, items;
    try {
      //console.log "parse"
      //console.log line
      if (!line.contains("<pEquipSlotPos:")) {
        return;
      }
      line = line.replace("<pEquipSlotPos:", "");
      line = line.replace(">", "");
      items = line.split(',').map(function(i) {
        return parseInt(i);
      });
      return {
        //console.log items
        index: items[0] || 0,
        x: items[1] || 0,
        y: items[2] || 0
      };
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForAEMPlugin = function(filename) {
    return this.loadBitmap('img/pAlterEquipMenu/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_AlterEquipMenu.LoadPluginSettings();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCommandWindow, ALIAS__createItemWindow, ALIAS__createSlotWindow, ALIAS__createStatusWindow, _;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__createItemWindow = _.createItemWindow;
  _.createItemWindow = function() {
    var height, r, width, x, y;
    ALIAS__createItemWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('itemsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._itemWindow);
      x = this._statusWindow.x + this._statusWindow.width;
      y = this._statusWindow.y;
      width = this.statusWidth();
      height = this._statusWindow.height;
    }
    this._pApplyNewWindowSize(this._itemWindow, x, y, width, height);
  };
  //@[ALIAS]
  ALIAS__createStatusWindow = _.createStatusWindow;
  _.createStatusWindow = function() {
    var height, r, width, x, y;
    ALIAS__createStatusWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('statusWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._statusWindow);
      x = this.equipSlotsWidth();
      y += 72;
      width = this.statusWidth();
      height = Graphics.boxHeight - this._helpWindow.height - this._helpWindow.y - 72;
    }
    this._pApplyNewWindowSize(this._statusWindow, x, y, width, height);
  };
  //@[ALIAS]
  ALIAS__createSlotWindow = _.createSlotWindow;
  _.createSlotWindow = function() {
    var height, r, width, x, y;
    ALIAS__createSlotWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('slotsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._slotWindow);
      x = 0;
      y = this._commandWindow.y;
      width = this.equipSlotsWidth();
      height = Graphics.boxHeight - this._helpWindow.height;
    }
    this._pApplyNewWindowSize(this._slotWindow, x, y, width, height);
  };
  
  //@[ALIAS]
  ALIAS__createCommandWindow = _.createCommandWindow;
  _.createCommandWindow = function() {
    var height, r, width, x, y;
    ALIAS__createCommandWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('commandsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._commandWindow);
      x = this.equipSlotsWidth();
      width = this.statusWidth() * 2;
    }
    this._pApplyNewWindowSize(this._commandWindow, x, y, width, height);
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__commandWindowRect, ALIAS__create, ALIAS__createBackground, ALIAS__createItemWindow, ALIAS__helpWindowRect, ALIAS__itemWindowRect, ALIAS__slotWindowRect, ALIAS__statusWindowRect, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__createBackground = _.createBackground;
  _.createBackground = function() {
    ALIAS__createBackground.call(this, ...arguments);
    return this._pCreateBackgroundImage();
  };
  //@[ALIAS]
  ALIAS__create = _.create;
  _.create = function() {
    ALIAS__create.call(this, ...arguments);
    return this._pApplyWindowVisibility();
  };
  //$[OVER]
  _.onSlotOk = function() {
    this._itemWindow.activate();
    return this._itemWindow.select(0);
  };
  //$[OVER]
  _.hideItemWindow = function() {
    this._slotWindow.activate();
    return this._itemWindow.deselect();
  };
  //$[OVER]
  _.statusWidth = function() {
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      return 252;
    } else {
      return 249;
    }
  };
  //@[ALIAS]
  ALIAS__createItemWindow = _.createItemWindow;
  _.createItemWindow = function() {
    ALIAS__createItemWindow.call(this, ...arguments);
    this._itemWindow.show();
  };
  //@[ALIAS]
  ALIAS__helpWindowRect = _.helpWindowRect;
  _.helpWindowRect = function() {
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('helpWindowPos');
    } else {
      return ALIAS__helpWindowRect.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__statusWindowRect = _.statusWindowRect;
  _.statusWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('statusWindowPos');
    } else {
      rect = ALIAS__statusWindowRect.call(this, ...arguments);
      rect.x = this.equipSlotsWidth();
      rect.y += this.calcWindowHeight(1, true);
      rect.height -= this.calcWindowHeight(1, true);
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__commandWindowRect = _.commandWindowRect;
  _.commandWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('commandsWindowPos');
    } else {
      rect = ALIAS__commandWindowRect.call(this, ...arguments);
      rect.x = this.equipSlotsWidth();
      rect.width = Graphics.boxWidth - this.equipSlotsWidth();
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__slotWindowRect = _.slotWindowRect;
  _.slotWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('slotsWindowPos');
    } else {
      rect = ALIAS__slotWindowRect.call(this, ...arguments);
      rect.x = 0;
      rect.y = this._commandWindow.y;
      rect.width = this.equipSlotsWidth();
      rect.height += this._commandWindow.height;
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__itemWindowRect = _.itemWindowRect;
  _.itemWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('itemsWindowPos');
    } else {
      rect = ALIAS__itemWindowRect.call(this, ...arguments);
      rect.x = this._statusWindow.x + this._statusWindow.width;
      rect.y = this._statusWindow.y;
      rect.width = this.statusWidth();
      rect.height = this._statusWindow.height;
      return rect;
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  _._pApplyNewWindowSize = function(wnd, x, y, width, height) {
    var e;
    try {
      wnd.move(x, y, width, height);
      wnd.updatePadding();
      wnd.createContents();
      if (wnd.refresh != null) {
        return wnd.refresh();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  _.equipSlotsWidth = function() {
    return Graphics.width - 506;
  };
  _._pCreateBackgroundImage = function() {
    var imageName;
    imageName = PKD_AlterEquipMenu.PP.equipSceneBackgroundImage();
    if (String.any(imageName)) {
      this._pBackground = new Sprite(new Bitmap(Graphics.width, Graphics.height));
      this.__pBackBitmap = ImageManager.loadPictureForAEMPlugin(imageName);
      if (this.__pBackBitmap.isReady()) {
        this._pDrawBackgroundImage();
      } else {
        this.__pBackBitmap.addLoadListener(() => {
          return this._pDrawBackgroundImage();
        });
      }
      return this.addChild(this._pBackground);
    }
  };
  _._pDrawBackgroundImage = function() {
    if (this.__pBackBitmap == null) {
      return;
    }
    this._pBackground.bitmap.drawOnMe(this.__pBackBitmap, 0, 0, Graphics.width, Graphics.height);
  };
  _._pApplyWindowVisibility = function() {
    var e, r;
    try {
      r = PKD_AlterEquipMenu.PP.getWindowRect('helpWindowPos');
      if (r.transparent === true) {
        this._helpWindow.setBackgroundType(2);
      }
      r = PKD_AlterEquipMenu.PP.getWindowRect('itemsWindowPos');
      if (r.transparent === true) {
        this._itemWindow.setBackgroundType(2);
      }
      r = PKD_AlterEquipMenu.PP.getWindowRect('statusWindowPos');
      if (r.transparent === true) {
        this._statusWindow.setBackgroundType(2);
      }
      r = PKD_AlterEquipMenu.PP.getWindowRect('slotsWindowPos');
      if (r.transparent === true) {
        this._slotWindow.setBackgroundType(2);
      }
      r = PKD_AlterEquipMenu.PP.getWindowRect('commandsWindowPos');
      if (r.transparent === true) {
        return this._commandWindow.setBackgroundType(2);
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadWindowskin, _;
  //@[DEFINES]
  _ = Window_EquipItem.prototype;
  //$[OVER]
  _.maxCols = function() {
    return 1;
  };
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.itemsWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
})();

// ■ END Window_EquipItem.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipSlot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___createAllParts, ALIAS___createContentsBackSprite, ALIAS___createCursorSprite, ALIAS___updateCursor, ALIAS__cursorDown, ALIAS__cursorUp, ALIAS__initialize, ALIAS__isEnabled, ALIAS__loadWindowskin, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Window_EquipSlot.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    return this.pDrawActorNameBackground();
  };
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.slotWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this, ...arguments);
    this.pDrawActorName();
    this.pDrawActorBody();
  };
  if (PKD_AlterEquipMenu.Utils.isMV()) {
    //@[ALIAS]
    ALIAS___createAllParts = _._createAllParts;
    _._createAllParts = function() {
      ALIAS___createAllParts.call(this, ...arguments);
      this._createActorBodySprLayer();
      this._actorBodySprLayer.move(this.standardPadding(), this.standardPadding());
      this.addChildAt(this._actorBodySprLayer, 1);
      this._createExtraCursor();
      return this.addChildAt(this._extraCursor, 3);
    };
  } else {
    //@[ALIAS]
    ALIAS___createContentsBackSprite = _._createContentsBackSprite;
    _._createContentsBackSprite = function() {
      this._createActorBodySprLayer();
      this._clientArea.addChild(this._actorBodySprLayer);
      return ALIAS___createContentsBackSprite.call(this, ...arguments);
    };
    
    //@[ALIAS]
    ALIAS___createCursorSprite = _._createCursorSprite;
    _._createCursorSprite = function() {
      ALIAS___createCursorSprite.call(this, ...arguments);
      this._createExtraCursor();
      this._clientArea.addChild(this._extraCursor);
    };
  }
  //@[ALIAS]
  ALIAS___updateCursor = _._updateCursor;
  _._updateCursor = function() {
    var cursorSprite, x, y;
    ALIAS___updateCursor.call(this, ...arguments);
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      cursorSprite = this._windowCursorSprite;
    } else {
      cursorSprite = this._cursorSprite;
    }
    this._extraCursor.visible = cursorSprite.visible && this.active;
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      x = this._cursorRect.x + this._extraCursor.width / 2 + this.pSlotSize() / 2;
    } else {
      x = this._cursorRect.x + this.pSlotSize() / 2 - this._extraCursor.width / 2;
    }
    y = this._cursorRect.y - 5;
    return this._extraCursor.move(x, y);
  };
  //$[OVER]
  _.cursorRight = function() {
    return this.cursorDown(...arguments);
  };
  
  //$[OVER]
  _.cursorLeft = function() {
    return this.cursorUp(...arguments);
  };
  //@[ALIAS]
  ALIAS__cursorUp = _.cursorUp;
  _.cursorUp = function() {
    ALIAS__cursorUp.call(this, ...arguments);
    if (this.pIsHiddenSlot(this.index())) {
      this.cursorUp(true);
    }
  };
  //@[ALIAS]
  ALIAS__cursorDown = _.cursorDown;
  _.cursorDown = function() {
    ALIAS__cursorDown.call(this, ...arguments);
    if (this.pIsHiddenSlot(this.index())) {
      this.cursorDown(true);
    }
  };
  //$[OVER]
  _.drawItem = function(index) {
    if (this.pIsHiddenSlot(index)) {
        return;
    }

    if (PKD_AlterEquipMenu.Utils.isMV()) {
        this.pDrawItemSlotBack(index);
    }

    // 🔽 Dibujar el nombre del slot
    const rect = this.itemRect(index);
    const slotName = this.slotName(index); // obtiene el nombre según base de datos
    const textX = rect.x;
    const textY = rect.y - 28; // 18 píxeles encima del slot
    const textW = rect.width;

    this.contents.fontSize = 16;
    this.changeTextColor("#FFFFFF"); // blanco puro

    this.drawText(slotName, textX, textY, textW, 'center');
    this.resetFontSettings();

    return this.pDrawSlotItem(index);
};


  //$[OVER]
  _.drawItemBackground = function(index) {
    var bitmap, width, x, y;
    if (this.pIsHiddenSlot(index)) {
      return;
    }
    ({x, y, width} = this.itemRect(index));
    bitmap = ImageManager.loadPictureForAEMPlugin("SlotBackground");
    if (bitmap.isReady()) {
      this.contentsBack.drawOnMe(bitmap, x, y, width, width);
    } else {
      PKD_AlterEquipMenu.Utils.loadImageAsync("pAlterEquipMenu", "SlotBackground").then((bitmap) => {
        return this.contentsBack.drawOnMe(bitmap, x, y, width, width);
      });
    }
  };
  
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(index) {
    if (this.pIsHiddenSlot(index)) {
      // * Если слот невидимый, то нельзя его использовать
      return false;
    }
    return ALIAS__isEnabled.call(this, ...arguments);
  };
  
  //$[OVER]
  _.itemRect = function(index) {
    var customPos, p, positions, size;
    size = this.pSlotSize();
    positions = this.pSlotsPositions();
    p = positions[index];
    if (p == null) {
      p = {
        x: 0,
        y: 0
      };
    }
    customPos = this.pGetCustomPositionForSlot(index);
    if (customPos != null) {
      p = customPos;
    }
    return new Rectangle(p.x, p.y, size, size);
  };
})();

// ■ END Window_EquipSlot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipSlot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = Window_EquipSlot.prototype;
  _.pSlotSize = function() {
    return PKD_AlterEquipMenu.PP.getSlotSize();
  };
  //?[VERSION]
  _.pSlotsPositions = function() {
    return [];
  };
  _.pDrawActorBody = function() {
    var bodyImage;
    if (this._actor == null) {
      return;
    }
    bodyImage = this._actor.pGetEquipBodyImg();
    if (String.any(bodyImage)) {
      return this._pDrawActorBodyProcess('pictures', bodyImage);
    } else {
      return this._pDrawActorBodyProcess('pAlterEquipMenu', 'DefaultBody');
    }
  };
  _._pDrawActorBodyProcess = function(folder, image) {
    if (this._actorBodySpr == null) {
      this._actorBodySpr = new Sprite();
      this._actorBodySprLayer.addChild(this._actorBodySpr);
    }
    PKD_AlterEquipMenu.Utils.loadImageAsync(folder, image).then((bitmap) => {
      return this._actorBodySpr.bitmap = bitmap;
    });
  };
  _.pDrawActorName = function() {
    if (this._actor == null) {
      return;
    }
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      return this.drawText(this._actor.name(), 0, -this.textPadding(), this.contents.width, 'center');
    } else {
      return this.drawText(this._actor.name(), 0, 4, this.contents.width, 'center');
    }
  };
  _.pDrawActorNameBackground = function() {
    var nameBackground;
    nameBackground = new Sprite();
    nameBackground.bitmap = ImageManager.loadPictureForAEMPlugin('NameBackground');
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      this._windowBackSprite.addChild(nameBackground);
      nameBackground.x += this.textPadding();
      nameBackground.y += this.textPadding();
    } else {
      this._contentsBackSprite.addChild(nameBackground);
    }
  };
  if (PKD_AlterEquipMenu.Utils.isMV()) {
    _.itemAt = function(index) {
      if (this._actor != null) {
        return this._actor.equips()[index];
      } else {
        return null;
      }
    };
  }
  _.pDrawSlotItem = function(index) {
    var e, isEnabled, item, rect;
    if (!this._actor) {
      return;
    }
    try {
      item = this.itemAt(index);
      rect = this.itemRect(index);
      isEnabled = this.isEnabled(index);
      this.changePaintOpacity(isEnabled);
      this.pDrawItemSlotIcon(item, rect, isEnabled);
      this.changePaintOpacity(true);
      return this.resetFontSettings();
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.pDrawItemSlotIcon = function(item, rect, isEnabled) {
    var diff, size;
    size = this.pSlotSize();
    diff = (size - 32) / 2;
    if (item != null) {
      return this.drawIcon(item.iconIndex, rect.x + diff, rect.y + diff);
    } else if (!isEnabled) {
      return this.drawIcon(this.disableIconIndex(), rect.x + diff, rect.y + diff);
    }
  };
  _.disableIconIndex = function() {
    return PKD_AlterEquipMenu.PP.getDisabledSlotIconIndex() || 0;
  };
  _._createActorBodySprLayer = function() {
    return this._actorBodySprLayer = new Sprite();
  };
  _._createExtraCursor = function() {
    this._extraCursor = new Sprite(ImageManager.loadPictureForAEMPlugin('SelectedSlot'));
    return this._extraCursor.visible = false;
  };
  //?MV only
  _.pDrawItemSlotBack = function(index) {
    var c1, c2, h, rect, w, x, y;
    rect = this.itemRect(index);
    c1 = "rgba(32, 32, 32, 0.5)";
    c2 = "rgba(32, 32, 32, 0.35)";
    x = rect.x;
    y = rect.y;
    w = rect.width;
    h = rect.height;
    this.contents.gradientFillRect(x, y, w, h, c1, c2, true);
  };
  _.pIsHiddenSlot = function(index) {
    var e, slots;
    try {
      if (this._actor == null) {
        return false;
      }
      slots = this._actor.pGetHiddenSlotIndexes();
      return slots.contains(index + 1);
    } catch (error) {
      e = error;
      console.warn(e);
      return false;
    }
  };
  _.pGetCustomPositionForSlot = function(index) {
    var e;
    try {
      if (this._actor == null) {
        return null;
      }
      return this._actor.pGetCustomSlotPosition(index + 1);
    } catch (error) {
      e = error;
      console.warn(e);
      return {
        x: 0,
        y: 0
      };
    }
  };
})();

// ■ END Window_EquipSlot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipSlot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_EquipSlot.prototype;
  //?[VERSION]
  _.pSlotsPositions = function() {
    return PKD_AlterEquipMenu.PP.getSlotsPositions();
  };
})();

// ■ END Window_EquipSlot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[ENCODE]

  //@[DEFINES]
  _ = Window_EquipStatus.prototype;
  _._createStatsIconsLayer = function() {
    var i, j, x, y;
    this._statsIcons = new Sprite();
    this._statsIcons.bitmap = new Bitmap(this.contents.width, this.contents.height);
    for (i = j = 0; j < 6; i = ++j) {
      x = this.itemPadding();
      y = this.paramY(i);
      this.pDrawParamIcon(x, y, 2 + i);
    }
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      this._windowContentsSprite.addChild(this._statsIcons);
    } else {
      this._contentsSprite.addChild(this._statsIcons);
    }
  };
  _.pDrawActorImage = function() {
    var e, image;
    if (this._actor == null) {
      return;
    }
    try {
      image = this._actor.pGetEquipImg();
      if (String.any(image)) {
        return PKD_AlterEquipMenu.Utils.loadImageAsync("pictures", image).then(this._pDrawActorImageBody.bind(this));
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _._pDrawActorImageBody = function(bitmap) {
    this.contentsBack.clear();
    return this.contentsBack.drawOnMe(bitmap, 0, 0);
  };
  _.pDrawActorImageForeground = function() {
    var color, e, opacity, settings;
    if (!PKD_AlterEquipMenu.PP.isDrawActorImageForeground()) {
      return;
    }
    settings = PKD_AlterEquipMenu.PP.actorImageForegroundSettings();
    if (settings == null) {
      return;
    }
    try {
      ({opacity, color} = settings);
      this.contents.paintOpacity = opacity;
      this.contents.fillRect(0, 0, this.width, this.height, color);
      return this.contents.paintOpacity = 255;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.pDrawParamIcon = function(x, y, paramId) {
    var image;
    image = "Param_" + paramId;
    PKD_AlterEquipMenu.Utils.loadImageAsync("pAlterEquipMenu", image).then(this.pDrawParamIconBody.bind(this, x, y));
  };
  _.pDrawParamIconBody = function(x, y, bitmap) {
    return this._statsIcons.bitmap.drawOnMe(bitmap, x, y);
  };
})();

// ■ END Window_EquipStatus.coffee
//---------------------------------------------------------------------------

//Plugin PKD_AlterEquipMenu builded by PKD PluginBuilder 2.2 - 29.11.2022