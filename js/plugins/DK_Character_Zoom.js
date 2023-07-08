/*
Title: Character Zoom
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.2.0
Release: 11.02.2022
First release: 23.10.2020
*/

/*ru
Название: Масштабирование Персонажа
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.2.0
Релиз: 11.02.2022
Первый релиз: 23.10.2020
*/

/*:
 * @plugindesc v.1.2.0 [MV|MZ] Allows you to scale characters.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Character_Zoom
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.2.0
 Release: 11.02.2022
 First release: 23.10.2020

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Use event comments to setup scaling
 1. <zoom: zoomX zoomY>
 Replace zoomX and zoomY with the X and Y scale (percentages)
 Example: <zoom: 200 200>

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Zoom player/event/follower: ZoomCharacter scaleX scaleY character duration wait
 scaleX - Scale X in percentages. Calculated with Javascript.
 scaleY - Scale Y in percentages. Calculated with Javascript.
 character - Character ID.
 0 for Player.
 -1 for current event.
 -2 for first follower,
 -3 for second follower,
 -4 for third follower,
 -5 for fourth follower.
 Calculated with Javascript.
 duration - Animation duration. 0 for instant. Calculated with Javascript.
 wait - Wait for completion (true/false)
 Example: ZoomCharacter 200 200 -1 60 true
 Example: ZoomCharacter 200 200 $gameVariables.value(1) 0 false

 ###=========================================================================
 ## Script calls
 ###=========================================================================
 1. Zoom player: $gamePlayer.setZoom(scaleX, scaleY, duration)
 2. Zoom event: $gameMap.event(eventId).setZoom(scaleX, scaleY, duration)
 3. Zoom follower: $gamePlayer.followers(index).setZoom(scaleX, scaleY, duration)

 ###=========================================================================
 ## See also
 ###=========================================================================
 1. Events Glow (https://dk-plugins.ru/events-glow/)
 Allows highlighting events on mouse hover.

 2. Picture Choices (https://dk-plugins.ru/picture-choices/)
 Allows to use a graphic buttons instead of the choice window.

 3. Pictures Glow (https://dk-plugins.ru/pictures-glow/)
 Allows highlighting pictures on mouse hover.

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins



 * @command ZoomCharacter
 * @desc Zoom character
 *
 * @arg scaleX
 * @text Scale X
 * @desc Scale X in percentages. Calculated with Javascript.
 * @type combo
 * @option 100
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg scaleY
 * @text Scale Y
 * @desc Scale Y in percentages. Calculated with Javascript.
 * @type combo
 * @option 100
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg character
 * @text Character
 * @desc Character ID. 0 for Player. -1 for current event. Calculated with Javascript.
 * @default -1
 *
 * @arg duration
 * @text Duration
 * @desc Animation duration. 0 for instant. Calculated with Javascript.
 * @default 0
 *
 * @arg wait
 * @text Wait
 * @desc Wait for completion
 * @type boolean
 * @default true



 * @param followersAutosize
 * @text Followers autosize
 * @desc Change the size of the followers along with the size of the player ?
 * @type boolean
 * @default false

*/

/*:ru
 * @plugindesc v.1.2.0 [MV|MZ] Позволяет масштабировать персонажей.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Character_Zoom
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.2.0
 Релиз: 11.02.2022
 Первый релиз: 23.10.2020

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Используйте комментарии события, чтобы установить масштаб
 1. <zoom: zoomX zoomY>
 Замените zoomX и zoomY на масштаб по осям X и Y (указываются проценты)
 Пример: <zoom: 200 200>

 ###=========================================================================
 ## Команды плагина (RPG Maker MV)
 ###=========================================================================
 1. Масштабировать игрока/событие/последователя: ZoomCharacter scaleX scaleY character duration wait
 scaleX - Масштаб по X в процентах. Вычисляется с помощью Javascript.
 scaleY - Масштаб по Y в процентах. Вычисляется с помощью Javascript.
 character - ID персонажа.
 0 для Игрока,
 -1 для текущего события,
 -2 для первого последователя,
 -3 для второго последователя,
 -4 для третьего последователя,
 -5 для четвертого последователя,
 Вычисляется с помощью Javascript.
 duration - Длительность анимации. 0 для мгновенной смены. Вычисляется с помощью Javascript.
 wait - Ждать выполнения (true/false)
 Пример: ZoomCharacter 200 200 -1 60 true
 Пример: ZoomCharacter 200 200 $gameVariables.value(1) 0 false

 ###=========================================================================
 ## Вызовы скриптов
 ###=========================================================================
 1. Масштабировать игрока: $gamePlayer.setZoom(scaleX, scaleY, duration)
 2. Масштабировать событие: $gameMap.event(eventId).setZoom(scaleX, scaleY, duration)
 3. Масштабировать последователя: $gamePlayer.followers(index).setZoom(scaleX, scaleY, duration)

 ###=========================================================================
 ## Смотрите также
 ###=========================================================================
 1. Свечение Событий (https://dk-plugins.ru/events-glow/)
 Позволяет подсвечивать события при наведении мыши.

 2. Выбор С Изображениями (https://dk-plugins.ru/picture-choices/)
 Позволяет использовать графические кнопки вместо окна выбора.

 3. Свечение Изображений (https://dk-plugins.ru/pictures-glow/)
 Позволяет подсвечивать изображения при наведении мыши.

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins



 * @command ZoomCharacter
 * @desc Масштабировать персонажа
 *
 * @arg scaleX
 * @text Масштаб по X
 * @desc Масштаб по X в процентах. Вычисляется с помощью Javascript.
 * @type combo
 * @option 100
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg scaleY
 * @text Масштаб по Y
 * @desc Масштаб по Y в процентах. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1000
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg character
 * @text Персонаж
 * @desc ID персонажа. 0 для Игрока. -1 для текущего события. Вычисляется с помощью Javascript.
 * @default -1
 *
 * @arg duration
 * @text Длительность
 * @desc Длительность анимации. 0 для мгновенной смены. Вычисляется с помощью Javascript.
 * @default 0
 *
 * @arg wait
 * @text Ожидание
 * @desc Ждать выполнения
 * @type boolean
 * @default true



 * @param followersAutosize
 * @text Авторазмер последователей
 * @desc Изменять размер последователей вместе с размером игрока ?
 * @type boolean
 * @default false

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Character_Zoom'] = '1.2.0';

//===========================================================================
// initialize parameters
//===========================================================================

const CharacterZoomParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch(e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Character_Zoom');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);

        return acc;
    }, {});

})();

//===========================================================================
// initialize plugin commands
//===========================================================================

const CharacterZoom_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    CharacterZoom_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch (command) {
        case 'ZoomCharacter': {
            const scaleX = eval(args[0]);
            const scaleY = eval(args[1]);
            const duration = eval(args[3]);
            const wait = args[4] === 'true';
            let characterId = eval(args[2]);
            let character = null;

            if (characterId === -1) {
                characterId = this.eventId();
            }

            if (characterId > 0) {
                character = $gameMap.event(characterId);
            } else if (characterId === 0) {
                character = $gamePlayer;
            } else if (characterId < -1) {
                character = $gamePlayer.followers().follower(-characterId - 2);
            }

            character.setZoom(scaleX, scaleY, duration);

            if (wait && duration > 0) {
                this.wait(duration);
            } else {
                const sprite = SceneManager._scene._spriteset._characterSprites.find(
                    sprite => sprite._character === character);

                sprite && sprite.updateZoom();
            }
            break;
        }
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Character_Zoom', 'ZoomCharacter', function(args) {
        const scaleX = eval(args.scaleX);
        const scaleY = eval(args.scaleY);
        const duration = eval(args.duration);
        const wait = args.wait === 'true';
        let characterId = eval(args.character);
        let character = null;

        if (characterId === -1) {
            characterId = this.eventId();
        }

        if (characterId > 0) {
            character = $gameMap.event(characterId);
        } else if (characterId === 0) {
            character = $gamePlayer;
        } else if (characterId < -1) {
            character = $gamePlayer.followers().follower(-characterId - 2);
        }

        character.setZoom(scaleX, scaleY, duration);

        if (wait && duration > 0) {
            this.wait(duration);
        } else {
            const sprite = SceneManager._scene._spriteset._characterSprites.find(
                sprite => sprite._character === character);

            sprite && sprite.updateZoom();
        }
    });

}

//===========================================================================
// Game_Character
//===========================================================================

Game_Character.prototype.setZoom = function(scaleX, scaleY, scaleDuration = 0) {
    this._scale = { scaleX, scaleY, scaleDuration };
};

Game_Character.prototype.zoom = function() {
    return this._scale;
};

Game_Character.prototype.isZooming = function() {
    return !!this._scale && this._scale.duration > 0;
};

if (CharacterZoomParams.followersAutosize) {

    const CharacterZoom_Game_Player_setZoom =
        Game_Player.prototype.setZoom;
    Game_Player.prototype.setZoom = function(scaleX, scaleY, scaleDuration = 0) {
        CharacterZoom_Game_Player_setZoom.apply(this, arguments);

        if (Utils.RPGMAKER_NAME === 'MV') {
            this.followers().forEach((follower) => {
                follower.setZoom(scaleX, scaleY, scaleDuration);
            });
        } else {
            this.followers().data().forEach((follower) => {
                follower.setZoom(scaleX, scaleY, scaleDuration);
            });
        }
    };

}


//===========================================================================
// Game_Event
//===========================================================================

const CharacterZoom_Game_Event_setupPageSettings =
    Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    CharacterZoom_Game_Event_setupPageSettings.apply(this, arguments);
    this.setupZoomSettings();
};

Game_Event.prototype.setupZoomSettings = function() {
    const comment = this.__DKgetComments__().find(
        comment => /<zoom:\s*(\d+)\s+(\d+)>/.exec(comment));

    if (comment) {
        this.setZoom(Number(RegExp.$1), Number(RegExp.$2), 0);
        return true;
    }

    return false;
};

Game_Event.prototype.__DKgetComments__ = function() {
    const page = this.page();
    const list = (page ? page.list : null);

    return (list ? list.reduce((comments, command) => {
        if (command.code === 108 || command.code === 408) {
            comments.push(command.parameters[0]);
        }

        return comments;
    }, []) : []);
};

//===========================================================================
// Sprite_Character
//===========================================================================

const CharacterZoom_Sprite_Character_update =
    Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    CharacterZoom_Sprite_Character_update.apply(this, arguments);
    this.updateZoom();
};

Sprite_Character.prototype.updateZoom = function() {
    const zoom = this._character.zoom();

    if (!zoom) {
        return;
    }

    const scaleX = this.scale.x;
    const scaleY = this.scale.y;
    const scaleDuration = zoom.scaleDuration;
    let duration = zoom.duration;

    if (duration === undefined && (scaleX !== zoom.scaleX / 100 || scaleY !== zoom.scaleY / 100)) {
        duration = scaleDuration;
    }

    if (duration > 0) {
        const leftDuration = scaleDuration - duration;
        let scaleSpeedX = zoom.scaleSpeedX;
        let scaleSpeedY = zoom.scaleSpeedY;

        if (scaleSpeedX === undefined || scaleSpeedY === undefined) {
            scaleSpeedX = (zoom.scaleX / 100 - scaleX) / scaleDuration;
            scaleSpeedY = (zoom.scaleY / 100 - scaleY) / scaleDuration;
            zoom.startScaleX = scaleX;
            zoom.startScaleY = scaleY;
            zoom.scaleSpeedX = scaleSpeedX;
            zoom.scaleSpeedY = scaleSpeedY;
        }

        this.scale.set(zoom.startScaleX + scaleSpeedX * leftDuration,
            zoom.startScaleY + scaleSpeedY * leftDuration);

        zoom.duration = duration - 1;
    } else if (duration === 0) {
        this.scale.set(zoom.scaleX / 100, zoom.scaleY / 100);

        zoom.duration = 0;

        delete zoom.startScaleX;
        delete zoom.startScaleY;
        delete zoom.scaleSpeedX;
        delete zoom.scaleSpeedY;
    }
};
