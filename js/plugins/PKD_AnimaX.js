/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 *
 */

/*:
 * @plugindesc (v.1.3)[BASIC] Characters animations system
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 *
 * Detailed guide: http://kdworkshop.net/animax-plugin-guide/
 * (!better read guid and download Demo)
 *
 * Plugin working directory: img\charactersAA\
 *
 * Add animations for characers in Plugin Parameters
 *
 * === Animations:
 *
 * For Actor, add Note: <xAnima:NAME>
 * For equipments (weapons), add Note: <xAnimaSet:NAME>
 * For event, add Comment: XA:NAME
 * 
 * === Extra layers:
 *
 * For equipments (weapons), add Note:
 * <xAnimaLayer:NAME>
 * <xAnimaLayerRelative:NAME>
 *
 * === Using with Alpha ABS Z:
 * Alpha ABS Z should be Below this plugin in Plugin Manager
 *
 * === Using with Alpha NET Z:
 * All plugin command automatically synchronizes via Network
 *
 * If you want execute plugin command in force local mode
 * use this script call BEFORE (above) plugin command:
 * PKD_ANIMAX.SetLocalMode();
 *
 *------------------------------------------------------------------
 * === Script Calls:
 *
 * PKD_ANIMAX.ChangePlayerAnimationSet("profileName"); //Change player animation set (profile)
 * PKD_ANIMAX.ResetPlayerAnimationSet(); // Reset player animation set to default (from Actor's Note)
 *
 * PKD_ANIMAX.ChangeEventAnimationSet(eventId, "profileName");
 * PKD_ANIMAX.ResetEventAnimationSet(eventId);
 *
 * Example: PKD_ANIMAX.ChangeEventAnimationSet(3, "Wolf");
 *
 * PKD_ANIMAX.PlayAnimationAction("actionName", charId, isLoop, isWaitEnd);
 *      Start playing animation action "actionName" for character (charId)
 *      "actionName" - action Name form Actions List (plugin paramters) or empty string (clear all actions)
 *      charId - Character -> Event ID or 0 - for Player, -1 - current Event (if used inside Event commands)
 *      isLoop - if true, animation will be looped while character is not moving
 *      isWait - if true, next event commands will wait animation to complete (if used inside Event commands)
 *
 * Example: PKD_ANIMAX.PlayAnimationAction("Attack", 0, false, true); 
 *
 * PKD_ANIMAX.PlayIndependentAction("profileName", "actionName", charId, isLoop, isWaitEnd);
 *      // Start playing animation action "actionName" from "profileName" for character
 *          that have another AnimaX profile or not have AnimaX at all
 * 
 * Example: PKD_ANIMAX.PlayIndependentAction("Wolf", "Defense", 54, true, true);
 *
 * PKD_ANIMAX.StopAnimationAction(charId); //Stop any looping animation action for character
 *
 * PKD_ANIMAX.AddLayer(charId, "layerName", isRelative); 
 *      Add extra layer on character
 *      "layerName" - layer name (ID) form Animation Layers List (plugin parameters)
 *      isRelative -  If false - layer will be loaded from CommonLayers folder,
 *                    if true - layer will be loaded from character AnimaX folder
 *
 * Example: PKD_ANIMAX.AddLayer(33, "Wings", false);
 *
 * PKD_ANIMAX.RemoveLayer(charId, "layerName"); //Remove extra layer from character
 * PKD_ANIMAX.RemoveAllLayers(charId); //Remove all layers from character
 * ---------------------------------------------------------------------------
 * === Plugin have Plugin commands
 *
 * If you using RPG Maker MZ, plugin commands list available in Plugin Command event command
 *
 * For RPG Maker MV users:
 *
    - ChangePlayerAnimationSet ANIMATION_SET_NAME

        Where ANIMATION_SET_NAME -
            animation settings from Animations List plugin parameter

    - ResetPlayerAnimationSet

    - ChangeEventAnimationSet EVENT_ID ANIMATION_SET_NAME

    - ResetEventAnimationSet EVENT_ID

    - PlayAnimationAction ACTION_NAME CHAR_ID IS_LOOP IS_WAIT

        Where ACTION_NAME - animation action name
        (should be defined for character current animation)
        CHAR_ID - 0 for player, -1 for this event or number = event ID
        IS_LOOP - true of false
        IS_WAIT - true of false
        (wait until animation is end before next event command)

    - PlayIndependentAction ANIMATION_SET_NAME ACTION_NAME CHAR_ID IS_LOOP IS_WAIT
            Start playing animation action ACTION_NAME from ANIMATION_SET_NAME for character
                that have another AnimaX profile or not have AnimaX at all

    - StopAnimationAction CHAR_ID

    - AddAnimaLayer CHAR_ID LAYER_NAME IS_RELATIVE

    - RemoveAnimaLayer CHAR_ID LAYER_NAME

    - ClearAnimaLayers CHAR_ID

 *      See guide on my site for better understanding plugin commands
 *
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
 *
 *
 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc XAnima System Animations List
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc XAnima System animation layers list
 * 
 * @param isUseAltPreload:b
 * @text Is Use Alt. Preload?
 * @type boolean
 * @default false
 * @desc If true - plugin will preload all images from folder charactersAA (not works in browser)
 * 
 * @param isUseWebp:b
 * @text Is Use .Webp?
 * @type boolean
 * @default false
 * @desc Is use alternative .webp format for images in folder charactersAA? All images should be in .webp, not .png
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command ChangePlayerAnimationSet
 * @text Change Player Animation
 * @desc Change player animation set
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Reset Player Animation
 * @desc Reset player animation set to default (from Actor's Note)
 * 
 * @command ChangeEventAnimationSet
 * @text Change Event Animation
 * @desc Change Event animation set
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ResetEventAnimationSet
 * @text Reset Event Animation
 * @desc Reset Event animation set to default (from Event page Comment or Empty)
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @command PlayAnimationAction
 * @text Play Anima Action
 * @desc Start playing animation action for character
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin parameters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * @command PlayIndependentAnimationAction
 * @text Play Independent Anima Action
 * @desc Start playing independent animation action for character (with or without AnimaX)
 * 
 * @arg animationSetName
 * @text Animation ID
 * @desc Animation ID form Animation List (plugin parameters)
 * @type text
 * @default
 * 
 * @arg actionName
 * @text Action Name
 * @desc Action Name form Actions List (plugin parameters) or empty string (clear all actions)
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 *  @arg isLoop
 *  @text Is Looping?
 *  @type boolean
 *  @default false
 *  @desc Animation will be looped while character is not moving, event commands is continue
 * 
 *  @arg isWait
 *  @text Is Wait?
 *  @type boolean
 *  @default true
 *  @desc Next event commands will wait animation to complete
 * 
 * @command StopAnimationAction
 * @text Stop Anima Action
 * @desc Stop looping animation action for character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Animation target. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @command AddPart
 * @text Add Layer
 * @desc Add extra layer on character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Layer ID form Animation Layers List (plugin parameters)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Relative?
 * @type boolean
 * @desc If false - layer will be loaded from CommonLayers folder, if true - layer will be loaded from character AnimaX folder
 * @default false
 * 
 * @command RemovePart
 * @text Remove Layer
 * @desc Remove extra layer from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Layer ID
 * @desc Added layer ID form Animation Layers List (plugin parameters)
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Clear layers
 * @desc Remove all layers from character
 * 
 * @arg eventId
 * @text Character ID
 * @desc Character with AnimaX animation. Event ID. 0 - Player, -1 - current event ID
 * @type number
 * @min -1
 * @default -1
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.3)[BASIC] Система анимаций персонажей
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/animax
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 *
 * Документация: http://kdworkshop.net/animax-plugin-guide/
 * (!У плагина есть Демка!)
 *
 * Папка с изображениями анимаций: img\charactersAA\
 *
 * Профили анимаций добавляются в параметрах плагина
 *
 * === АНИМАЦИИ:
 *
 * Для персонажа, добавить заметку: <xAnima:NAME>
 * Для экипировки, добавить заметку: <xAnimaSet:NAME>
 * Для событий, добавить КОММЕНТАРИЙ: XA:NAME
 * 
 * === ДОП. СЛОИ:
 *
 * Для экипировки, добавить заметку:
 * <xAnimaLayer:NAME>
 * <xAnimaLayerRelative:NAME>
 *
 * === Использование с Alpha ABS Z:
 * Альфа ABS Z должна быть под этим плагином в менеджере плагинов
 *
 * === Использование с Alpha NET Z:
 *   Все команды плагина автоматически синхронизируются по сети
 *
 *  Если нужно воспроизвести анимацию СТРОГО локально 
 *  используйте этот вызов скрипта ВЫШЕ (перед) команды плагина
 *  PKD_ANIMAX.SetLocalMode();
 *
 *------------------------------------------------------------------
 * === Вызовы скриптов:
 *
 * PKD_ANIMAX.ChangePlayerAnimationSet("profileName"); //Сменить профиль анимации игрока
 * PKD_ANIMAX.ResetPlayerAnimationSet(); // Сбросить до стандартного профиля (из заметки)
 *
 * PKD_ANIMAX.ChangeEventAnimationSet(eventId, "profileName");
 * PKD_ANIMAX.ResetEventAnimationSet(eventId);
 *
 * Пример: PKD_ANIMAX.ChangeEventAnimationSet(3, "Wolf");
 *
 * PKD_ANIMAX.PlayAnimationAction("actionName", charId, isLoop, isWaitEnd);
 *      Воспроизвести анимационное действие для персонажа
 *      "actionName" - имя действия или пустая строка (чтобы остановить текущее)
 *      charId - Персонаж -> Номер события или 0 - игрок, -1 - текущее событие
 *      isLoop - Если true, зациклить анимацию (пока персонаж не двигается)
 *      isWait - Если true, ждать завершения анимации
 *
 * Пример: PKD_ANIMAX.PlayAnimationAction("Attack", 0, false, true); 
 *
 * PKD_ANIMAX.PlayIndependentAction("profileName", "actionName", charId, isLoop, isWaitEnd);
 *      // Воспроизвести анимационное действие (из другого профиля) для персонажа (у которого может
            и не быть своего профиля анимации)
 * 
 * Пример: PKD_ANIMAX.PlayIndependentAction("Wolf", "Defense", 54, true, true);
 *
 * PKD_ANIMAX.StopAnimationAction(charId); //Закончить все зацикленные анимации у персонажа
 *
 * PKD_ANIMAX.AddLayer(charId, "layerName", isRelative); 
 *      Добавить доп. слой
 *      "layerName" - Имя слоя (ID) из Animation Layers List (параметр плагина)
 *      isRelative -  Если false - будет общий слой, из CommonLayers папки,
 *                    Если true - слой будет из папки с анимациеями персонажа (профиля)
 *
 * Пример: PKD_ANIMAX.AddLayer(33, "Wings", false);
 *
 * PKD_ANIMAX.RemoveLayer(charId, "layerName"); //Удалить доп. слой у персонажа
 * PKD_ANIMAX.RemoveAllLayers(charId); //Удалить все доп. слои у персонажа
 * ---------------------------------------------------------------------------
 * === Плагин имеет команды плагина
 *
 * Если вы используете RPG Maker MZ, список команд плагина доступен в команде события Plugin Command
 *
 * Для RPG Maker MV:
 *
    - ChangePlayerAnimationSet ANIMATION_SET_NAME

        Сменить профиль анимации игрока
        Где ANIMATION_SET_NAME -
            имя профиля из Animations List (параметр плагина)

    - ResetPlayerAnimationSet

    - ChangeEventAnimationSet EVENT_ID ANIMATION_SET_NAME

    - ResetEventAnimationSet EVENT_ID

    - PlayAnimationAction ACTION_NAME CHAR_ID IS_LOOP IS_WAIT

        // Воспроизвести анимационное действие для персонажа

        Where ACTION_NAME - имя действия
        CHAR_ID - Персонаж -> Номер события или 0 - игрок, -1 - текущее событие
        IS_LOOP - true или false, если true, зациклить анимацию (пока персонаж не двигается)
        IS_WAIT - true или false, если true, ждать завершения анимации
 
    - PlayIndependentAction ANIMATION_SET_NAME ACTION_NAME CHAR_ID IS_LOOP IS_WAIT
            // Воспроизвести анимационное действие (из другого профиля) для персонажа (у которого может
            и не быть своего профиля анимации)

    - StopAnimationAction CHAR_ID

    - AddAnimaLayer CHAR_ID LAYER_NAME IS_RELATIVE

    - RemoveAnimaLayer CHAR_ID LAYER_NAME

    - ClearAnimaLayers CHAR_ID

 *      Смотрите руководство на моем сайте для лучшего понимания команд плагина
 *
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 *
 *
 * @param xAnimations:structA
 * @text Animations List
 * @type struct<LAnimaX>[]
 * @default []
 * @desc Список анимаций (профилей)
 * 
 * @param xAnimaParts:structA
 * @text Animation Layers List
 * @type struct<LAnimaXPart>[]
 * @default []
 * @desc Список дополнительный слоёв (частей)
 * 
 * @param isUseAltPreload:b
 * @text Is Use Alt. Preload?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - все изображения из папки charactersAA будут загружены в память (не работает в браузере)
 * 
 * @param isUseWebp:b
 * @text Is Use .Webp?
 * @type boolean
 * @default false
 * @desc Исползовать .webp формат изображений в папке charactersAA? Все файлы должны быть .webp, а не .png
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command ChangePlayerAnimationSet
 * @text Изменить профиль анимации игрока
 * @desc
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @command ResetPlayerAnimationSet
 * @text Сбросить профиль игрока
 * @desc Сбросить до базового (который был указан в заметке персонажа)
 * 
 * @command ChangeEventAnimationSet
 * @text Изменить профиль анимации события
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @command ResetEventAnimationSet
 * @text Сбросить профиль события
 * @desc Сбросить до базового (из комментария на странице или пустого)
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @command PlayAnimationAction
 * @text Анимационное действие
 * @desc
 * 
 * @arg actionName
 * @text Название действия
 * @desc Название действия из Actions List (параметр плагина) или пусто - чтобы отменить все
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 *  @arg isLoop
 *  @text Зациклить?
 *  @type boolean
 *  @default false
 *  @desc Анимация действия будет зацикленна пока событие (персонаж) не сдвинуться с места
 * 
 *  @arg isWait
 *  @text Ждать окончания?
 *  @type boolean
 *  @default true
 *  @desc Следующая команда события будет ждать окончания анимации действия
 * 
 * @command PlayIndependentAnimationAction
 * @text Анимационное действие (независимое)
 * @desc Независиме анимационное действие для персонажа (с AnimaX или без него)
 * 
 * @arg animationSetName
 * @text Профиль
 * @desc ID (имя) профиля из Animation List (параметр плагина)
 * @type text
 * @default
 * 
 * @arg actionName
 * @text Название действия
 * @desc Название действия из Actions List (параметр плагина) или пусто - чтобы отменить все
 * @type text
 * @default
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg isLoop
 *  @text Зациклить?
 *  @type boolean
 *  @default false
 *  @desc Анимация действия будет зацикленна пока событие (персонаж) не сдвинуться с места
 * 
 *  @arg isWait
 *  @text Ждать окончания?
 *  @type boolean
 *  @default true
 *  @desc Следующая команда события будет ждать окончания анимации действия
 * 
 * @command StopAnimationAction
 * @text Остановить действие
 * @desc Остановить любое зацикленное анимационное действие
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @command AddPart
 * @text Добавить слой
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Имя слоя
 * @desc Имя слоя из Animation Layers List (параметр плагина)
 * @type text
 * @default
 * 
 * @arg isRelative
 * @text Относительно?
 * @type boolean
 * @desc Если ВЫКЛ - слой будет из папки Common Layers, если ВКЛ - из папки профиля
 * @default false
 * 
 * @command RemovePart
 * @text Удалить слой
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @arg layerName
 * @text Имя слоя
 * @desc
 * @type text
 * @default
 * 
 * @command ClearParts
 * @text Удалить все слои
 * @desc
 * 
 * @arg eventId
 * @text Номер события
 * @desc Цифра - номер события. 0 - Игрок, -1 - текущее событие
 * @type number
 * @min -1
 * @default -1
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LAnimaXPart:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for layer (also folder Name)
  
 * @param isLowerBodyPart:b
 * @text Is Lower Body Layer?
 * @type boolean
 * @default false
 * @desc If true - this layer will be half transparent when character in bushes
 
 * @param sortingLevel:i
 * @text Sorting order
 * @type number
 * @default 0
 * @min -100
 * @desc Layer sorting order
 *
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Layer offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Layer offset by Y coordinate
 *
 * @param layerRule:struct
 * @text Layer Settings
 * @type struct<LAnimaXPartDirLevel>
 * @default {"noDir:b":"false","dirD:b":"false","dirL:b":"false","dirR:b":"false","dirU:b":"false","8wayGroup":"","dirDL:b":"false","dirDR:b":"false","dirUR:b":"false","dirUL:b":"false"}
 * @desc Setting of layer direciton sprites positions
 *
 * @param baseRule:struct
 * @text Base Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Default animation layer settings. Using for all action without own rules

 * @param moveRule:struct
 * @text Move Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for moving

 * @param idleRule:struct
 * @text Idle Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for idle

 * @param dashRule:struct
 * @text Dashing Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc [Optional] Animation layer settings for dashing

 * @param actionRules:structA
 * @text Actions Rules
 * @type struct<LAnimaXPartActionRule>[]
 * @default []
 * @desc [Optional] Animation layer settings for actions
*/

/*~struct~LAnimaXPartActionRule:

 * @param actionName
 * @text Action Name
 * @default
 * @desc Name of action that rules for

 * @param fileName
 * @text Extra File Name
 * @default 
 * @desc Filename for this action, leave empty to use filename same as Action Name

 * @param enabled:b
 * @text Is Enabled?
 * @type boolean
 * @default true
 * @desc If false - this layer will hide completly when this action is playing

 * @param actionRule:struct
 * @text Rule
 * @type struct<LAnimaXPartDefRule>
 * @default {"isHaveDirections:b":"true","isHaveFrames:b":"true"}
 * @desc Layer settings only for this action

*/

/*~struct~LAnimaXPartDefRule:

 * @param isHaveDirections:b
 * @text Is change direction?
 * @type boolean
 * @default true
 * @desc Layer have direction related sprites _D, _U, _R, _L ?
 
 * @param isHaveFrames:b
 * @text Is have frames?
 * @type boolean
 * @default true
 * @desc If false - layer have only one frame (0 - zero), if true - layer have same frame count as parent animation

 * @param isSpritesheet:b
 * @text Is Spritesheet?
 * @type boolean
 * @default false
 * @desc Animation layer will be on single file (spritesheet)

*/

/*~struct~LAnimaXPartDirLevel:

 * @param noDir:b
 * @text Default
 * @type boolean
 * @on Below
 * @off Above
 * @default false
 * @desc Is layer sprite with no directions will be below character sprite?

 * @param dirD:b
 * @text Down (_D)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down direction sprites will be below character sprite?

 * @param dirL:b
 * @text Left (_L)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left direction sprites will be below character sprite?

 * @param dirR:b
 * @text Right (_R)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Right direction sprites will be below character sprite?

 * @param dirU:b
 * @text Up (_U)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up direction sprites will be below character sprite?

 * @param 8wayGroup
 * @text Diagonal Settings

 * @param dirDL:b
 * @parent 8wayGroup
 * @text Down Left (_DL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Down Left direction sprites will be below character sprite?

 * @param dirDR:b
 * @parent 8wayGroup
 * @text Down Right (_DR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Left Right direction sprites will be below character sprite?

 * @param dirUR:b
 * @parent 8wayGroup
 * @text Up Right (_UR)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Right direction sprites will be below character sprite?

 * @param dirUL:b
 * @parent 8wayGroup
 * @text Up Left (_UL)
 * @type boolean
  * @on Below
 * @off Above
 * @default false
 * @desc Is layer Up Left direction sprites will be below character sprite?

*/

/*~struct~LAnimaX:
 * @param id
 * @text ID
 * @default
 * @desc Unique ID for animation (also folder Name)
 * 
 * @param base:s
 * @text Base
 * @type struct<LAnimaXSet>
 * @default
 * @desc Base animation set (for movement)
 * 
 * @param ABSZe
 * @text AABS Z
 * @default Only for Alpha ABS Z
 *
 * @param inBattle:s
 * @parent ABSZe
 * @text In Battle
 * @type struct<LAnimaXSet>
 * @default
 * @desc Battle state animation set
 * 
 * @param dead:s
 * @parent ABSZe
 * @text Dead
 * @type struct<LAnimaXSet>
 * @default
 * @desc Dead state animation set
 *
 * @param actions:structA
 * @text Actions
 * @type struct<LAnimaXAction>[]
 * @default []
 * @desc Actions List
*/
/*~struct~LAnimaXSet:
 * @param move:s
 * @text Movement
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Movement animation settings
 * 
 * @param idle:s
 * @text Idle
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Idle animation settings [Optional]
 *
 * @param dash:s
 * @text Dashing
 * @type struct<LAnimaXParameters>
 * @default
 * @desc [PRO] Dashing animation settings [Optional]
 * 
 * @param moveToIdleDelay:i
 * @text Idle Delay
 * @type number
 * @default 30
 * @min 0
 * @desc Speed of change from movement to idle when character is not moving
*/
/*~struct~LAnimaXAction:
 * @param name
 * @text Action Name
 * @default Action
 * @desc Name for aciton
 * 
 * @param animation:s
 * @text Settings
 * @type struct<LAnimaXParameters>
 * @default
 * @desc Action animation settings
 *
 * @param Behaviour
 *
 * @param seOnStart
 * @parent Behaviour
 * @text SE on start
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Optional] Sound at the beginning of the action
 *
 * @param seDelay:i
 * @parent seOnStart
 * @text Delay
 * @type number
 * @default 0
 * @min 0
 * @desc Delay (in frames, 60 = 1 sec) of sound at the beginning of action
 *
 * @param seOnEnd
 * @parent Behaviour
 * @text SE on end
 * @type file
 * @dir audio/se
 * @required 1
 * @default
 * @desc [Optional] Sound at the end of the action
 *
 *
 * @param scOnStart
 * @parent Behaviour
 * @text Script Call on start
 * @default
 * @desc [Optional] Script call at the beginning of the action
 *
 * @param scDelay:i
 * @parent scOnStart
 * @text Delay
 * @type number
 * @default 0
 * @min 0
 * @desc Delay (in frames, 60 = 1 sec) of script call at the beginning of action*
 *
 * @param scOnEnd
 * @parent Behaviour
 * @text Script Call on end
 * @default
 * @desc [Optional] Script call at the end of the action
 *
 *
*/
/*~struct~LAnimaXParameters:
 * @param isOneDirection:b
 * @text One Direction?
 * @type boolean
 * @default false
 * @desc Animation will use only one direciton (without _D, _L, _R, _U frames)
 * 
 * @param frames:i
 * @text Frames Count
 * @type number
 * @default 3
 * @min 1
 * @desc Frames count
 * 
 * @param speed:i
 * @text Speed
 * @type number
 * @default 15
 * @min 1
 * @desc Frames change speed in frames
 * 
 * @param expandFirstFrame:i
 * @text Repeat first frame times
 * @type number
 * @default 0
 * @min 0
 * @max 100
 * @desc Times to repeat first frame (make only first frame dalayed)
 * 
 * @param is8Way:b
 * @text Is Support Diagonal?
 * @type boolean
 * @default false
 * @desc Animation will support 8 way diagonal movement, require _DL, _DR, _UL, _UR frames images
 * 
 * @param dx:int
 * @text Offset X
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc Animation offset by X coordinate
 * 
 * @param dy:int
 * @text Offset Y
 * @min -100
 * @max 100
 * @type number
 * @default 0
 * @desc Animation offset by Y coordinate
 *
 * @param isSpritesheet:bool
 * @text Is Spritesheet?
 * @type boolean
 * @default false
 * @desc Animations will be on single file (spritesheet)
*/


var Imported = Imported || {};
Imported.PKD_AnimaX = true;

var PKD_ANIMAX = {};
PKD_ANIMAX.version = 130; // 1.3.0

// * Загрузка доп. методо поддержки плагинов
PKD_ANIMAX.ApplyExtensions = () => {
  if (Imported.Alpha_NETZ == true) {
    PKD_ANIMAX.ApplyNETZPatch();
  }
};

// * Алтернативный способ предзагрузки (все изображения)
PKD_ANIMAX.PreloadAllImages = () => {
  if (!PKD_ANIMAX.IsUseAltPreload()) {
    return;
  }
  if (!Utils.isNwjs()) {
    console.warn('AnimaX alternative preload NOT works in Browser');
    return;
  }

  PKD_ANIMAX.WalkIn();
};

PKD_ANIMAX.WalkIn = () => {

  const fs = require('fs');
  const path = require('path');


  let base = path.dirname(process.mainModule.filename);
  base = path.join(base, 'img/charactersAA/');

  PKD_ANIMAX._basePath = base;

  var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };

  walk(base, ImageManager.loadAllAnimaX);
};


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 07.08.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.8';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
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
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
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
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
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

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
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

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
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
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
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
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
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
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        this.updateMovingAnimation();
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 07.08.2023

PKD_ANIMAX.RegisterPluginCommnads4MV = () => {

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'ChangePlayerAnimationSet') {
            try {
                let animSetId = args[0];
                if(String.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetPlayerAnimationSet') {
            try {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ChangeEventAnimationSet') {
            try {
                let charaId = parseInt(args[0]);
                let animSetId = args[1];
                if(String.any(animSetId)) {
                    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animSetId);
                }
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ResetEventAnimationSet') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'PlayAnimationAction') {
            try {
                let actionName = args[0];
                let charaId = parseInt(args[1]);
                let isLoop = eval(args[2]);
                let isWait = eval(args[3]);
                PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'PlayIndependentAction') {
            try {
                let animSetId = args[0];
                let actionName = args[1];
                let charaId = parseInt(args[2]);
                let isLoop = eval(args[3]);
                let isWait = eval(args[4]);
                PKD_ANIMAX.PluginCommand_PlayIndependentAction(animSetId, actionName, charaId, isLoop, isWait);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'StopAnimationAction') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'AddAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                let isRelative = eval(args[2]);
                PKD_ANIMAX.PluginCommand_AddPart(charaId, layerName, isRelative);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'RemoveAnimaLayer') {
            try {
                let charaId = parseInt(args[0]);
                let layerName = args[1];
                PKD_ANIMAX.PluginCommand_RemovePart(charaId, layerName);
            } catch (e) {
                console.warn(e);
            }
        } else if (command === 'ClearAnimaLayers') {
            try {
                let charaId = parseInt(args[0]);
                PKD_ANIMAX.PluginCommand_ClearParts(charaId);
            } catch (e) {
                console.warn(e);
            }
        }
    };


};

PKD_ANIMAX.RegisterPluginCommnads4MZ = () => {

    const pluginName = "PKD_AnimaX";

    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName);
    PKD_ANIMAX.RegisterPluginCommnadsForName(pluginName + "_MZ");

};

PKD_ANIMAX.RegisterPluginCommnadsForName = (pluginName) => {

    PluginManager.registerCommand(pluginName, 'ChangePlayerAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            if(String.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetPlayerAnimationSet', args => {
        try {
            PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ChangeEventAnimationSet', args => {
        try {
            let animationSetName = args.animationSetName;
            let charaId = parseInt(args.eventId);
            if(String.any(animationSetName)) {
                PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, animationSetName);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ResetEventAnimationSet', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(charaId, null);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayAnimationAction', args => {
        try {
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'PlayIndependentAnimationAction', args => {
        try {
            let animationSetName = args.animationSetName;
            let actionName = args.actionName;
            let charaId = parseInt(args.eventId);
            let isLoop = eval(args.isLoop);
            let isWait = eval(args.isWait);
            PKD_ANIMAX.PluginCommand_PlayIndependentAction(animationSetName, actionName, charaId, isLoop, isWait);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'StopAnimationAction', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'AddPart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            let isRelative = eval(args.isRelative);
            PKD_ANIMAX.PluginCommand_AddPart(charaId, partId, isRelative);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'RemovePart', args => {
        try {
            let charaId = parseInt(args.eventId);
            let partId = args.layerName;
            PKD_ANIMAX.PluginCommand_RemovePart(charaId, partId);
        } catch (e) {
            console.warn(e);
        }
    });

    PluginManager.registerCommand(pluginName, 'ClearParts', args => {
        try {
            let charaId = parseInt(args.eventId);
            PKD_ANIMAX.PluginCommand_ClearParts(charaId);
        } catch (e) {
            console.warn(e);
        }
    });

};

(function () {

    PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet = (charaId, animationSetName) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId, true);
            if(char) {
                char.setExternalAnimaX(animationSetName, false)
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_PlayAnimationAction = (actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                if(!String.any(actionName)) {
                    char.resetXAnima();
                    if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                        PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                    }
                } else {
                    if(char.startAnimaXCustomAction(actionName, isLoop, isWait)) {
                        if(isWait == true && isLoop == false) {
                            PKD_ANIMAX.SetInterpreterToWait(char);
                        }
                    }
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_StopAnimationAction = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char)
            {
                char.resetXAnima();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkAnimaXAction(null, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_AddPart = (charaId, partId, isRelative) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.addNewXAnimPart(partId, isRelative);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, isRelative, true);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_RemovePart = (charaId, partId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.removeXAnimPart(partId);
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkChangePart(partId, false, false);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.PluginCommand_ClearParts = (charaId) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId);
            if(char) {
                char.clearXAnimParts();
                if(PKD_ANIMAX.IsNetworkGame() && !PKD_ANIMAX.InLocalMode()) {
                    PKD_ANIMAX.SendNetworkClearAllParts();
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

    PKD_ANIMAX.GetProperCharacter = (charId, isForceGet = false) => {
        var char = null;
        if(PKD_ANIMAX.IsNetworkGame()) {
            $gameTemp._lastAxNetworkChar = null;
        }
        try {
            if (!charId || charId == 0) {
                char = $gamePlayer;
            } else if (charId < 0) {
                let int = $gameMap._interpreter;
                charId = int.eventId();
                if (charId > 0) {
                    char = $gameMap.event(charId);
                } else {
                    return null;
                }
            } else {
                char = $gameMap.event(charId);
            }
            if (!char) return null;
            if(!isForceGet) // * If Force mode we can take Char without AnimaX
                if (!char.isAnimX()) return null;
            if(PKD_ANIMAX.IsNetworkGame()) {
                if(char == $gamePlayer) {
                    $gameTemp._lastAxNetworkChar = 0;
                } else { // * Иначе событие на карте
                    $gameTemp._lastAxNetworkChar = char.eventId();
                }
            }
            return char;
        } catch (e) {
            console.warn(e, "Can't find character with ID " + charId + " for PlayAnimationAction");
        }
    };

    PKD_ANIMAX.SetInterpreterToWait = (char) => {
        let int = $gameMap._interpreter;
        int.xAnimaTarget = char;
        int._waitMode = 'xAnima';
    };

    PKD_ANIMAX.PluginCommand_PlayIndependentAction = (profileId, actionName, charaId, isLoop, isWait) => {
        try {
            let char = PKD_ANIMAX.GetProperCharacter(charaId, true);
            if(char) {
                if(String.any(actionName)) {
                    char.setExternalAnimaX(profileId, true)
                    PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
                }
            }
            $gameTemp.netAnimaXLocal = null;
        } catch (e) {
            console.warn(e);
        }
    };

})();

(function(){
    ImageManager._axLoadWepbBitmapMV = function(folder, filename, hue, smooth) {
        if (filename) {
            var path = folder + encodeURIComponent(filename) + '.webp';
            var bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    ImageManager._axLoadWepbBitmapMZ = function(folder, filename) {
        if (filename) {
            const url = folder + Utils.encodeURI(filename) + ".webp";
            return this.loadBitmapFromUrl(url);
        } else {
            return this._emptyBitmap;
        }
    };
})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ANIMAX.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ANIMAX;
  _.ChangePlayerAnimationSet = function(animSetId) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(0, animSetId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ResetPlayerAnimationSet = function() {
    var e;
    try {
      return _.ChangePlayerAnimationSet(null);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeEventAnimationSet = function(eventId, animSetId) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ChangeCharaAnimationSet(eventId, animSetId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ResetEventAnimationSet = function(eventId) {
    var e;
    try {
      return _.ChangeEventAnimationSet(eventId, null);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.PlayAnimationAction = function(actionName, charaId = 0, isLoop = false, isWait = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_PlayAnimationAction(actionName, charaId, isLoop, isWait);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.StopAnimationAction = function(charaId = 0) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_StopAnimationAction(charaId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.AddLayer = function(charaId, layerName, isRelative = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_AddPart(charaId, layerName, isRelative);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.RemoveLayer = function(charaId, layerName) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_RemovePart(charaId, layerName);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.RemoveAllLayers = function(charaId = 0) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_ClearParts(charaId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.PlayIndependentAction = function(profileName, actionName, charaId = 0, isLoop = false, isWait = false) {
    var e;
    try {
      return PKD_ANIMAX.PluginCommand_PlayIndependentAction(profileName, actionName, charaId, isLoop, isWait);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_ANIMAX.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.LoadPluginSettings = function() {
  var a, animList, i, len, partsList;
  PKD_ANIMAX.Params = new KDCore.ParamLoader("xAnimations:structA");
  animList = PKD_ANIMAX.Params.getParam("xAnimations", []);
  for (i = 0, len = animList.length; i < len; i++) {
    a = animList[i];
    a.actions = XAnimaTools.convertActionsFromParameters(a.actions);
  }
  PKD_ANIMAX.Animations = animList;
  partsList = PKD_ANIMAX.Params.getParam("xAnimaParts", []);
  PKD_ANIMAX.AnimationParts = partsList;
  if (KDCore.isMV()) {
    PKD_ANIMAX.RegisterPluginCommnads4MV();
  } else {
    PKD_ANIMAX.RegisterPluginCommnads4MZ();
  }
};

PKD_ANIMAX.IsUseAltPreload = function() {
  return PKD_ANIMAX.Params.getParam('isUseAltPreload', false);
};

PKD_ANIMAX.IsUseWebp = function() {
  return PKD_ANIMAX.Params.getParam('isUseWebp', false);
};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageCache.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___musBeHeld, _;
  if (!KDCore.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = ImageCache.prototype;
  // * AnimaX изображения нельзя удалять при переполнении памяти
  //@[ALIAS]
  ALIAS___musBeHeld = _._mustBeHeld;
  _._mustBeHeld = function(item) {
    if (item.bitmap.url.contains('charactersAA')) {
      return true;
    }
    if (item.bitmap.url.contains('Alpha')) {
      return true;
    }
    //return true if item.bitmap.url.contains('AABS')
    return ALIAS___musBeHeld.call(this, item);
  };
})();

// ■ END ImageCache.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
PKD_ANIMAX.IsNetworkGame = function() {
  return Imported.Alpha_NETZ === true && ANNetwork.isConnected();
};

// * Некоторые команды плагина не будут автоматически синхронизированы
// * Действует только ОДИН РАЗ (автоснятие флага), надо перед каждой командой ставить
PKD_ANIMAX.SetLocalMode = function() {
  return $gameTemp.netAnimaXLocal = true;
};

PKD_ANIMAX.InLocalMode = function() {
  return $gameTemp.netAnimaXLocal === true;
};

PKD_ANIMAX.ApplyNETZPatch = function() {
  var _alias_nAPI_onCustomCommand3434343;
  PKD_ANIMAX.SendNetworkFlagAnimaXRefresh = function(actorId) {
    var data;
    data = {
      actorId,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:refreshXAnima", data);
  };
  PKD_ANIMAX.SendNetworkPlayerExternalAnimaX = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      animaX: $gameSystem.lastPlayerAnimaXExternProfile,
      mapId: $gameMap.mapId()
    };
    return nAPI.sendCustomCommand("animaX:playerExternal", data);
  };
  PKD_ANIMAX.SendNetworkAnimaXAction = function(name, isLoop, isWait) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      name: name,
      isLoop,
      isWait
    };
    nAPI.sendCustomCommand("animaX:action", data);
  };
  PKD_ANIMAX.SendNetworkChangePart = function(partId, isRelative, isAdd) {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId(),
      partId,
      isRelative,
      isAdd
    };
    nAPI.sendCustomCommand("animaX:changePart", data);
  };
  PKD_ANIMAX.SendNetworkClearAllParts = function() {
    var data;
    data = {
      actorId: $gameParty.leader().actorId(),
      charId: $gameTemp._lastAxNetworkChar,
      mapId: $gameMap.mapId()
    };
    nAPI.sendCustomCommand("animaX:clearAllParts", data);
  };
  _alias_nAPI_onCustomCommand3434343 = nAPI.onCustomCommand;
  nAPI.onCustomCommand = function(name, data) {
    var actorId, animaX, e, mapId, ref, ref1;
    _alias_nAPI_onCustomCommand3434343.call(this, ...arguments);
    try {
      if (name === "animaX:refreshXAnima") {
        ({actorId, mapId} = data);
        //return unless $gameMap.mapId() == mapId
        // * Через поле, чтобы не было цикла отправки команды
        if ((ref = $gameActors.actor(actorId)) != null) {
          ref._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:playerExternal") {
        ({actorId, animaX, mapId} = data);
        // * Для себя не нужно, так как используется другая gameSystem переменная
        if (actorId === $gameParty.leader().actorId()) {
          return;
        }
        if ($gameSystem.netAnimaXExternelProfiles == null) {
          $gameSystem.netAnimaXExternelProfiles = {};
        }
        $gameSystem.netAnimaXExternelProfiles[actorId] = animaX;
        if ((ref1 = $gameActors.actor(actorId)) != null) {
          ref1._isNeedAnimaXRefresh = true;
        }
      } else if (name === "animaX:action") {
        PKD_ANIMAX.onAnimaXActionFromNetwork(data);
        return;
      } else if (name === "animaX:changePart") {
        PKD_ANIMAX.onAnimaXChangePartFromNetwork(data);
        return;
      } else if (name === "animaX:clearAllParts") {
        PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork(data);
        return;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXActionFromNetwork = function(data) {
    var actorId, char, charId, e, isLoop, isWait, mapId, name;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      if ($gameMap.mapId() !== mapId) {
        return;
      }
      ({charId, name, isLoop, isWait} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (String.any(name)) {
        return char.startAnimaXCustomAction(name, isLoop, isWait);
      } else {
        return char.resetXAnima();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXChangePartFromNetwork = function(data) {
    var actorId, char, charId, e, isAdd, isRelative, mapId, partId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId, partId, isRelative, isAdd} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      if (char == null) {
        return;
      }
      if (isAdd === true) {
        return char.addNewXAnimPart(partId, isRelative);
      } else {
        return char.removeXAnimPart(partId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  PKD_ANIMAX.onAnimaXClearAllPartsFromNetwork = function(data) {
    var actorId, char, charId, e, mapId;
    try {
      ({actorId, mapId} = data);
      if (actorId === $gameParty.leader().actorId()) {
        return;
      }
      ({charId} = data);
      if (charId === 0) {
        char = $gameMap.networkCharacterByActorId(actorId);
      } else {
        // * Нельзя брать событие не на той же карте
        if ($gameMap.mapId() !== mapId) {
          return;
        }
        char = $gameMap.event(charId);
      }
      return char != null ? char.clearXAnimParts() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ NETCharacter.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__refresh, ALIAS__update, _;
    //@[DEFINES]
    _ = NETCharacter.prototype;
    //@[ALIAS]
    ALIAS__refresh = _.refresh;
    _.refresh = function() {
      ALIAS__refresh.call(this);
      return this.refreshAnimaX();
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this);
      if (this.isAnimX()) {
        return this._updateAnimX();
      }
    };
    _.getCurrentAnimaXProfile = function() {
      var equipAnimaXSet;
      if (this.isAnimX()) {
        equipAnimaXSet = this._getEquipmentAnimaXSet();
        if (String.any(equipAnimaXSet)) {
          return equipAnimaXSet;
        }
      }
      return this.getInitialXProfile();
    };
    _.getInitialXProfile = function() {
      var actor;
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return null;
      }
      if (($gameSystem.netAnimaXExternelProfiles != null) && String.any($gameSystem.netAnimaXExternelProfiles[actor.actorId()])) {
        return $gameSystem.netAnimaXExternelProfiles[actor.actorId()];
      } else {
        return KDCore.Utils.getValueFromMeta('xAnima', actor.actor());
      }
    };
    // * Если хост выходит из игры, то на клиенте из-за обновления AnimaX вылетает ошибка
    // * так как данные игрока удаляются, поэтому доп. try catch
    _.getBattlerForAnimaX = function() {
      var actor, e;
      try {
        actor = this.actor();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        actor = $gameParty.leader();
        // * Чтобы не было спама ошибки в консоль (временное решение)
        //TODO: Временное решение
        // * Т.к. если хост выходит игра заканчивается (относительно NETZ 0.7)
        if (this.isAnimX()) {
          this.getBattlerForAnimaX = function() {
            return $gameParty.leader();
          };
        }
      }
      return actor;
    };
    //TODO: Временное решение
    _.isDashingForAnimaX = function() {
      return this._moveSpeed > 4;
    };
  })();
  (function() {    // ■ END NETCharacter.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Actor.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS___fillNetworkObserver, _;
    
    //@[DEFINES]
    _ = Game_Actor.prototype;
    
    //@[ALIAS]
    ALIAS___fillNetworkObserver = _._fillNetworkObserver;
    _._fillNetworkObserver = function() {
      ALIAS___fillNetworkObserver.call(this);
      // * Эти все поля для обновления Visual Equipment
      this.netDataObserver.readField(this, '_isNeedAnimaXRefresh');
      this.netDataObserver.readField(this, 'axLayersByEquips');
      this.netDataObserver.readField(this, 'axLayersByEquipsRelative');
      this.netDataObserver.readField(this, 'axPreviousLayers');
    };
  })();
  return (function() {    // ■ END Game_Actor.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Game_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Game_Map.prototype;
    
    // * Этот метод появился только в NETZ 0.7
    if (_.networkCharacterByActorId == null) {
      _.networkCharacterByActorId = function(actorId) {
        return this.netChars().find(function(c) {
          return c.playerData().actorId === actorId;
        });
      };
    }
  })();
};

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    PKD_ANIMAX.LoadPluginSettings();
    PKD_ANIMAX.ApplyExtensions();
    PKD_ANIMAX.PreloadAllImages();
    return ALIAS__loadDatabase.call(this);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initMembers, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    // * Слои которые надо снять, после обновления экипировки
    this.axPreviousLayers = [];
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    this.refreshAnimaXLayers();
    this.requestRefreshAnimaX();
  };
})();

// ■ END Game_Actor.coffee
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
  _.requestRefreshAnimaX = function() {
    return this._isNeedAnimaXRefresh = true;
  };
  _.isNeedAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh === true;
  };
  _.onAnimaXRefresh = function() {
    return this._isNeedAnimaXRefresh = null;
  };
  _.getAnimaXEquipmentSet = function() {
    var e, equipSet, i, len, ref;
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipSet = KDCore.Utils.getValueFromMeta('xAnimaSet', e);
      if (String.any(equipSet)) {
        return equipSet;
      }
    }
    return null;
  };
  // * Чтобы не удалялись части, которые добавленны параметром плагина
  // * используется массив axPreviousLayers, в котором храняться части
  // * которые были в прошлый раз, но в этот их уже нету - т.е. их надо удалить
  _.refreshAnimaXLayers = function() {
    var e, equipLayer, i, len, ref;
    this.axPreviousLayers = [...this.axLayersByEquips, ...this.axLayersByEquipsRelative];
    this.axLayersByEquips = [];
    this.axLayersByEquipsRelative = [];
    ref = this.equips();
    for (i = 0, len = ref.length; i < len; i++) {
      e = ref[i];
      if (e == null) {
        continue;
      }
      equipLayer = KDCore.Utils.getValueFromMeta('xAnimaLayer', e);
      this._registerLayerByEquip(equipLayer, false);
      equipLayer = KDCore.Utils.getValueFromMeta('xAnimaLayerRelative', e);
      this._registerLayerByEquip(equipLayer, true);
    }
  };
  _._registerLayerByEquip = function(name, isRelative) {
    if (!String.any(name)) {
      return;
    }
    this.axPreviousLayers.delete(name);
    if (isRelative === true) {
      this.axLayersByEquipsRelative.push(name);
    } else {
      this.axLayersByEquips.push(name);
    }
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Character.prototype;
  (function() {    // * Система анимации XAnima и ABS
    // -----------------------------------------------------------------------
    // * Предзагрузить действие
    _.preloadAnimaXAction = function(actionParams, isWaiting) {
      var animaSet;
      if (actionParams == null) {
        return;
      }
      animaSet = this.createAnimaXActionSet(actionParams);
      if (animaSet != null) {
        animaSet.preLoad();
      }
      this._axPreloadedActions[actionParams.name] = animaSet;
    };
    // * Создать AnimaXSet из параметров плагина анимации
    _.createAnimaXActionSet = function(actionParams) {
      var animaSet, name;
      name = actionParams.name;
      animaSet = XAnimaTools.createXAnimaSetForAction(this.animXId(), actionParams);
      animaSet.preLoad();
      return animaSet;
    };
    _.isAnimaXActionIsPreloaded = function(actionName) {
      return this.getPreloadAnimaXActionSet(actionName) != null;
    };
    _.getPreloadAnimaXActionSet = function(actionName) {
      return this._axPreloadedActions[actionName];
    };
    _.refreshAnimaX = function() {
      var animaXProfile;
      animaXProfile = this.getCurrentAnimaXProfile();
      if ((this._currentAnimaXProfile != null) && (animaXProfile == null)) {
        this._currentAnimaXProfile = null;
        if (this.isAnimX()) {
          this.clearAnimaX();
        }
        return;
      }
      if (this._currentAnimaXProfile === animaXProfile) {

      } else {
        this.createNewAnimaXForCharacter(animaXProfile);
      }
    };
    _.createNewAnimaXForCharacter = function(animaXProfile) {
      var animaX;
      animaX = XAnimaTools.getXAnimaParamsForState('base', animaXProfile);
      if (animaX == null) {
        if (String.any(animaXProfile)) {
          console.warn("Can't find Base animation settings for " + animaXProfile);
        }
        return;
      }
      this._currentAnimaXProfile = animaXProfile;
      this.initAnimaX(animaXProfile, animaX);
      this.registerAnimaXActions(animaXProfile);
      this.refreshAnimaXLayers();
    };
    // * Получить профиль анимации (для загрузки)
    _.getCurrentAnimaXProfile = function() {
      return null;
    };
    // * Получить начальный профиль персонажа (без экипировки)
    _.getInitialXProfile = function() {
      return null;
    };
    // * Регистрация действий (названий) и предзагрузка
    _.registerAnimaXActions = function(animaXProfile) {
      var action, actionList, i, len;
      actionList = XAnimaTools.getXAnimaActionList(animaXProfile);
      for (i = 0, len = actionList.length; i < len; i++) {
        action = actionList[i];
        this.registerAnimaXAction(action.name);
        if (this.isAnimaXAADefaultAction(action.name)) {
          this.preloadAnimaXAction(action);
        }
      }
    };
    // * Набор имён стандартных действий (нужны для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Проверка обновления состояния анимации на Battler
    _._updateAnimXRefresh = function() {
      var b;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return;
      }
      if (b.isNeedAnimaXRefresh()) {
        this.refreshAnimaX();
        this.refreshAnimaXLayers();
        b.onAnimaXRefresh();
      }
    };
    _.getBattlerForAnimaX = function() {
      return null;
    };
    // * Получить набор экипировки для Анимации
    _._getEquipmentAnimaXSet = function() {
      var b, equipmentXSet;
      b = this.getBattlerForAnimaX();
      if (b == null) {
        return null;
      }
      equipmentXSet = b.getAnimaXEquipmentSet();
      if (equipmentXSet != null) {
        return this.getInitialXProfile() + "_" + equipmentXSet;
      }
      return null;
    };
    // * Обновить слои с учётом экипировки
    return _.refreshAnimaXLayers = function() {
      var actor, e, i, j, k, l, len, len1, len2, ref, ref1, ref2;
      if (!this.isAnimX()) {
        return;
      }
      actor = this.getBattlerForAnimaX();
      if (actor == null) {
        return;
      }
      try {
        ref = actor.axLayersByEquips;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          this.addNewXAnimPart(l, false);
        }
        ref1 = actor.axLayersByEquipsRelative;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          l = ref1[j];
          this.addNewXAnimPart(l, true);
        }
        ref2 = actor.axPreviousLayers;
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          l = ref2[k];
          this.removeXAnimPart(l);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
    };
  })();
  (function() {    // * Действия
    // -----------------------------------------------------------------------
    _.startAnimaXAA_Attack = function() {
      return this.startAnimaXCustomAction('Attack', false, true);
    };
    return _.startAnimaXAA_Defense = function() {
      return this.startAnimaXCustomAction('Defense', true, false);
    };
  })();
})();

// ■ END Game_Character.coffee
//---------------------------------------------------------------------------


function _0xe1aa(_0x3ec14a, _0x30d1a8) {
    var _0x127bb1 = _0x127b();
    return _0xe1aa = function (_0xe1aac1, _0x36b3ed) {
        _0xe1aac1 = _0xe1aac1 - 0x13a;
        var _0x3e662f = _0x127bb1[_0xe1aac1];
        return _0x3e662f;
    }, _0xe1aa(_0x3ec14a, _0x30d1a8);
}
(function (_0x53b8fd, _0x59c427) {
    var _0x5f3ada = _0xe1aa, _0x4715a7 = _0x53b8fd();
    while (!![]) {
        try {
            var _0x40789d = parseInt(_0x5f3ada(0x18d)) / 0x1 * (-parseInt(_0x5f3ada(0x175)) / 0x2) + parseInt(_0x5f3ada(0x14d)) / 0x3 + parseInt(_0x5f3ada(0x15c)) / 0x4 * (-parseInt(_0x5f3ada(0x1cf)) / 0x5) + parseInt(_0x5f3ada(0x1c2)) / 0x6 * (-parseInt(_0x5f3ada(0x1ec)) / 0x7) + -parseInt(_0x5f3ada(0x1d1)) / 0x8 * (parseInt(_0x5f3ada(0x1d5)) / 0x9) + parseInt(_0x5f3ada(0x1a2)) / 0xa * (-parseInt(_0x5f3ada(0x186)) / 0xb) + parseInt(_0x5f3ada(0x160)) / 0xc * (parseInt(_0x5f3ada(0x144)) / 0xd);
            if (_0x40789d === _0x59c427)
                break;
            else
                _0x4715a7['push'](_0x4715a7['shift']());
        } catch (_0xa2834f) {
            _0x4715a7['push'](_0x4715a7['shift']());
        }
    }
}(_0x127b, 0xebe9a), (function () {
    var _0x3b97fb = _0xe1aa, _0x3483db;
    _0x3483db = Game_Character[_0x3b97fb(0x19d)], (function () {
        var _0x418a9e = _0x3b97fb;
        _0x418a9e(0x151) === _0x418a9e(0x1b6) ? _0x5abf5c['\x55\x74\x69\x6c\x73'][_0x418a9e(0x147)](_0x510c5b) : (_0x3483db['\x69\x73\x41\x6e\x69\x6d\x58'] = function () {
            var _0x5d7785 = _0x418a9e;
            if (_0x5d7785(0x15a) !== _0x5d7785(0x191))
                return this[_0x5d7785(0x161)] === !![];
            else
                return;
        }, _0x3483db['\x61\x6e\x69\x6d\x58\x49\x64'] = function () {
            var _0x47e237 = _0x418a9e;
            return _0x47e237(0x158) !== _0x47e237(0x158) ? (_0x5c2ebd = _0x1c18c5, _0x32fdf0[_0x47e237(0x1cc)](_0x12a0f0)) : this[_0x47e237(0x1eb)];
        }, _0x3483db[_0x418a9e(0x1e5)] = function () {
            return this['\x5f\x61\x78\x49\x64\x6c\x65']() != null;
        }, _0x3483db['\x69\x73\x48\x61\x76\x65\x44\x61\x73\x68\x41\x6e\x69\x6d\x61\x58'] = function () {
            var _0x36b966 = _0x418a9e;
            return this[_0x36b966(0x168)]() != null;
        }, _0x3483db['\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58\x53\x74\x61\x74\x65'] = function (_0x183680) {
            var _0x4c9f59 = _0x418a9e;
            return this[_0x4c9f59(0x140)][_0x183680] != null;
        }, _0x3483db[_0x418a9e(0x198)] = function () {
            var _0xb3df26 = _0x418a9e;
            return this[_0xb3df26(0x1de)]() && this[_0xb3df26(0x150)]()[_0xb3df26(0x1bf)]();
        }, _0x3483db['\x69\x73\x49\x6e\x4d\x6f\x76\x65\x6d\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58'] = function () {
            var _0x29432a = _0x418a9e;
            return _0x29432a(0x17f) !== _0x29432a(0x17f) ? this[_0x29432a(0x1af)]() || this[_0x29432a(0x1ef)]() : this[_0x29432a(0x18c)] === this['\x5f\x61\x78\x4d\x6f\x76\x65\x6d\x65\x6e\x74']();
        }, _0x3483db[_0x418a9e(0x1d9)] = function () {
            var _0x9b81f0 = _0x418a9e;
            return _0x9b81f0(0x182) === _0x9b81f0(0x182) ? this['\x69\x73\x49\x6e\x4d\x6f\x76\x65\x6d\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58']() || this[_0x9b81f0(0x1ef)]() : this[_0x9b81f0(0x18c)] = this[_0x9b81f0(0x168)]();
        }, _0x3483db[_0x418a9e(0x1ca)] = function () {
            var _0xf4231d = _0x418a9e;
            return this[_0xf4231d(0x18c)] === this[_0xf4231d(0x190)]();
        }, _0x3483db['\x69\x73\x49\x6e\x44\x61\x73\x68\x69\x6e\x67\x41\x6e\x69\x6d\x61\x58'] = function () {
            var _0x4f05c0 = _0x418a9e;
            return this[_0x4f05c0(0x18c)] === this[_0x4f05c0(0x168)]();
        }, _0x3483db[_0x418a9e(0x1e4)] = function () {
            var _0x4a793e = _0x418a9e;
            return _0x4a793e(0x19f) !== _0x4a793e(0x181) ? this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72'] = 0x0 : _0x1fab61 != null && _0x588c9a > 0x0 ? _0x161652['\x55\x74\x69\x6c\x73'][_0x4a793e(0x16d)](function () {
                return _0x63cf74(_0x48a6f0);
            }, _0x4b8d80 * 0x10) : _0x3f1284(_0x125355);
        }, _0x3483db[_0x418a9e(0x19e)] = function () {
            var _0x136785 = _0x418a9e, _0x328040;
            try {
                return this[_0x136785(0x1bd)]();
            } catch (_0x3ab2e2) {
                return _0x328040 = _0x3ab2e2, KDCore[_0x136785(0x1cc)](_0x328040);
            }
        }, _0x3483db[_0x418a9e(0x1bd)] = function () {
            var _0x3bcde2 = _0x418a9e, _0x448fb7, _0x4f96d3, _0x273d5b, _0x451265, _0x43f78b;
            try {
                if (this['\x5f\x61\x78\x43\x75\x72\x72\x65\x6e\x74'] == null)
                    return;
                ({
                    actionName: _0x448fb7,
                    behav: _0x4f96d3
                } = this[_0x3bcde2(0x18c)]);
                if (_0x4f96d3 == null) {
                    if (_0x3bcde2(0x1c0) === _0x3bcde2(0x1c0))
                        return;
                    else
                        _0x275812 = _0xa71ca1[_0x3bcde2(0x14c)]();
                }
                ({
                    seOnEnd: _0x43f78b,
                    scOnEnd: _0x451265
                } = _0x4f96d3);
                if (String[_0x3bcde2(0x1b4)](_0x43f78b)) {
                    if ('\x66\x6e\x67\x54\x70' !== _0x3bcde2(0x167))
                        return this[_0x3bcde2(0x165)]['\x70\x75\x73\x68'](_0x29c42f);
                    else
                        KDCore[_0x3bcde2(0x164)][_0x3bcde2(0x147)](_0x43f78b);
                }
                try {
                    if (String[_0x3bcde2(0x1b4)](_0x451265))
                        return eval(_0x451265);
                } catch (_0x22eb1c) {
                    if (_0x3bcde2(0x180) !== '\x62\x74\x77\x78\x79')
                        return _0x273d5b = _0x22eb1c, KDCore[_0x3bcde2(0x1cc)](_0x273d5b);
                    else {
                        var _0x1b2eb1;
                        try {
                            return this[_0x3bcde2(0x1bd)]();
                        } catch (_0xb4d5ea) {
                            return _0x1b2eb1 = _0xb4d5ea, _0x394790[_0x3bcde2(0x1cc)](_0x1b2eb1);
                        }
                    }
                }
            } catch (_0x1abb61) {
                return _0x273d5b = _0x1abb61, KDCore[_0x3bcde2(0x1cc)](_0x273d5b);
            }
        }, _0x3483db[_0x418a9e(0x1ae)] = function () {
            var _0x501f2b = _0x418a9e, _0x3f07ae;
            if (this[_0x501f2b(0x1d9)]()) {
                if (_0x501f2b(0x15d) === _0x501f2b(0x15d))
                    return ![];
                else
                    return;
            }
            if (!this[_0x501f2b(0x198)]())
                return ![];
            return _0x3f07ae = this[_0x501f2b(0x150)](), _0x3f07ae[_0x501f2b(0x1bf)]() && _0x3f07ae['\x69\x73\x57\x61\x69\x74']();
        }, _0x3483db[_0x418a9e(0x166)] = function (_0x52644b) {
            var _0x5bf9b2 = _0x418a9e;
            return '\x47\x75\x75\x59\x79' !== _0x5bf9b2(0x17e) ? this[_0x5bf9b2(0x165)][_0x5bf9b2(0x1a5)](_0x52644b) : this[_0x5bf9b2(0x13a)]();
        }, _0x3483db[_0x418a9e(0x150)] = function () {
            var _0x1fcad0 = _0x418a9e;
            if (_0x1fcad0(0x16a) === '\x6e\x4a\x4a\x76\x53')
                return;
            else
                return this[_0x1fcad0(0x18c)];
        }, _0x3483db[_0x418a9e(0x17b)] = function (_0x49f75a) {
            var _0x548b6d = _0x418a9e, _0xbe4f2c;
            try {
                return this['\x5f\x61\x78\x43\x75\x72\x72\x65\x6e\x74'] = _0x49f75a, this['\x5f\x70\x72\x6f\x63\x65\x73\x73\x41\x6e\x69\x6d\x61\x41\x63\x74\x69\x6f\x6e\x53\x74\x61\x72\x74\x42\x65\x68\x61\x76'](_0x49f75a[_0x548b6d(0x141)], _0x49f75a[_0x548b6d(0x1ab)]);
            } catch (_0x26a2eb) {
                return _0xbe4f2c = _0x26a2eb, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0xbe4f2c), this['\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61\x53\x74\x61\x74\x65']();
            }
        }, _0x3483db[_0x418a9e(0x1da)] = function () {
            var _0x12476c = _0x418a9e, _0x2f2313, _0x6f5f66, _0x4b6623, _0x5e338a, _0x486412, _0x146964, _0x5bb373;
            try {
                if (_0x12476c(0x153) === '\x79\x6c\x41\x52\x63')
                    return ![];
                else {
                    if (this[_0x12476c(0x18c)] == null)
                        return;
                    ({
                        actionName: _0x2f2313,
                        behav: _0x6f5f66
                    } = this[_0x12476c(0x18c)]);
                    if (_0x6f5f66 == null)
                        return;
                    ({
                        seOnStart: _0x5bb373,
                        seDelay: _0x146964,
                        scOnStart: _0x486412,
                        scDelay: _0x5e338a
                    } = _0x6f5f66);
                    try {
                        if (String['\x61\x6e\x79'](_0x5bb373)) {
                            if (_0x12476c(0x1b1) === _0x12476c(0x1b1)) {
                                if (_0x146964 != null && _0x146964 > 0x0)
                                    _0x12476c(0x14a) !== _0x12476c(0x14a) ? !this[_0x12476c(0x1ef)]() && this[_0x12476c(0x1dc)]() : KDCore[_0x12476c(0x164)]['\x63\x61\x6c\x6c\x44\x65\x6c\x61\x79\x65\x64'](function () {
                                        var _0x429f12 = _0x12476c;
                                        return KDCore[_0x429f12(0x164)][_0x429f12(0x147)](_0x5bb373);
                                    }, _0x146964 * 0x10);
                                else {
                                    if (_0x12476c(0x19a) !== _0x12476c(0x185))
                                        KDCore[_0x12476c(0x164)][_0x12476c(0x147)](_0x5bb373);
                                    else
                                        return this[_0x12476c(0x190)]() != null;
                                }
                            } else
                                return;
                        }
                    } catch (_0x235f94) {
                        _0x4b6623 = _0x235f94, KDCore[_0x12476c(0x1cc)](_0x4b6623);
                    }
                    try {
                        if ('\x69\x4e\x6a\x42\x43' === '\x69\x4e\x6a\x42\x43') {
                            if (String[_0x12476c(0x1b4)](_0x486412))
                                return _0x5e338a != null && _0x5e338a > 0x0 ? KDCore[_0x12476c(0x164)][_0x12476c(0x16d)](function () {
                                    var _0x9d3d1f = _0x12476c;
                                    return '\x46\x50\x53\x61\x4a' === _0x9d3d1f(0x18f) ? eval(_0x486412) : (this['\x5f\x61\x78\x43\x75\x72\x72\x65\x6e\x74'] = _0x5bbca9, this[_0x9d3d1f(0x1da)](_0x1f753b[_0x9d3d1f(0x141)], _0xcbdb54['\x62\x65\x68\x61\x76']));
                                }, _0x5e338a * 0x10) : eval(_0x486412);
                        } else {
                            this[_0x12476c(0x1e8)](), this[_0x12476c(0x1ed)] = !![], this[_0x12476c(0x192)] = null;
                            return;
                        }
                    } catch (_0x505e7a) {
                        return _0x4b6623 = _0x505e7a, KDCore[_0x12476c(0x1cc)](_0x4b6623);
                    }
                }
            } catch (_0x269ba0) {
                return _0x4b6623 = _0x269ba0, KDCore[_0x12476c(0x1cc)](_0x4b6623);
            }
        }, _0x3483db['\x73\x77\x69\x74\x63\x68\x54\x6f\x58\x41\x6e\x69\x6d\x61\x53\x74\x61\x74\x65'] = function (_0x1ef349) {
            var _0x4e2aeb = _0x418a9e;
            if (_0x4e2aeb(0x16f) === _0x4e2aeb(0x16f)) {
                if (this[_0x4e2aeb(0x143)](_0x1ef349)) {
                    if (_0x4e2aeb(0x1e0) !== _0x4e2aeb(0x1ac))
                        this[_0x4e2aeb(0x1ea)] = _0x1ef349, !this[_0x4e2aeb(0x198)]() && this[_0x4e2aeb(0x174)]();
                    else
                        return _0x42fe5c[_0x4e2aeb(0x149)] = _0x3393aa, _0x54050e[_0x4e2aeb(0x1c7)] = _0x783f30, this[_0x4e2aeb(0x17b)](_0x47b2aa), _0x7d24a3[_0x4e2aeb(0x1b5)]() && !_0x3ba324[_0x4e2aeb(0x184)]() && _0x45a435[_0x4e2aeb(0x196)](_0x15faaa, _0xd0e3cf, _0x12148a), _0x4a7260[_0x4e2aeb(0x13e)] = null, !![];
                } else
                    '\x6f\x4e\x75\x50\x4a' !== '\x6f\x4e\x75\x50\x4a' ? (this['\x61\x6e\x69\x6d\x61\x58\x50\x61\x72\x74\x73'][_0x54a374] = null, delete this[_0x4e2aeb(0x1c4)][_0x3fe339], this[_0x4e2aeb(0x156)] = !![]) : this[_0x4e2aeb(0x163)]();
            } else
                this[_0x4e2aeb(0x1ea)] = _0x290a6e, !this[_0x4e2aeb(0x198)]() && this['\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61']();
        }, _0x3483db[_0x418a9e(0x154)] = function (_0x3ca677, _0x419d0f) {
            var _0x8dae83 = _0x418a9e;
            if (_0x8dae83(0x19c) !== _0x8dae83(0x1d8)) {
                this['\x5f\x61\x78\x49\x64'] = _0x3ca677, this[_0x8dae83(0x13d)] = ![], this[_0x8dae83(0x199)](), this['\x5f\x61\x78\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x41\x63\x74\x69\x6f\x6e\x73\x4c\x69\x73\x74'] = [], this['\x5f\x61\x78\x50\x72\x65\x6c\x6f\x61\x64\x65\x64\x41\x63\x74\x69\x6f\x6e\x73'] = {}, this[_0x8dae83(0x140)] = {}, this['\x5f\x61\x78\x53\x74\x61\x74\x65'] = '\x62\x61\x73\x65', this['\x72\x65\x67\x69\x73\x74\x65\x72\x41\x6e\x69\x6d\x61\x58\x53\x74\x61\x74\x65'](this[_0x8dae83(0x1ea)], _0x419d0f);
                if (this[_0x8dae83(0x140)][this[_0x8dae83(0x1ea)]] == null) {
                    if (_0x8dae83(0x15f) === _0x8dae83(0x172)) {
                        this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72']++;
                        if (this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72'] >= this[_0x8dae83(0x16b)]())
                            return this['\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x49\x64\x6c\x65']();
                    } else
                        return;
                }
                this[_0x8dae83(0x174)](), this['\x5f\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58'] = !![], this[_0x8dae83(0x150)]()[_0x8dae83(0x1bc)]();
            } else
                this['\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61']();
        }, _0x3483db['\x64\x65\x6c\x65\x74\x65\x41\x6e\x69\x6d\x61\x58'] = function () {
            var _0x3d76b5 = _0x418a9e;
            if ('\x65\x77\x49\x75\x46' === _0x3d76b5(0x1ba))
                this[_0x3d76b5(0x174)]();
            else {
                var _0x3a28c3;
                try {
                    if ('\x4a\x45\x4b\x6a\x75' === _0x3d76b5(0x1c1)) {
                        var _0x5e3cf8;
                        try {
                            if (!this[_0x3d76b5(0x1de)]())
                                return;
                            return this[_0x3d76b5(0x199)](), this[_0x3d76b5(0x165)] = [], this[_0x3d76b5(0x16c)] = {}, this[_0x3d76b5(0x140)] = {}, this[_0x3d76b5(0x161)] = ![], this['\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58\x50\x72\x6f\x66\x69\x6c\x65'] = null, this['\x5f\x61\x78\x49\x73\x44\x65\x73\x74\x72\x6f\x79\x65\x64'] = !![], this['\x5f\x5f\x6c\x61\x73\x74\x45\x76\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58\x45\x78\x74\x65\x72\x6e\x50\x72\x6f\x66\x69\x6c\x65'] = null;
                        } catch (_0x45ff83) {
                            return _0x5e3cf8 = _0x45ff83, _0x55d2b5[_0x3d76b5(0x1cc)](_0x5e3cf8);
                        }
                    } else {
                        if (!this['\x69\x73\x41\x6e\x69\x6d\x58']())
                            return;
                        return this[_0x3d76b5(0x199)](), this['\x5f\x61\x78\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x41\x63\x74\x69\x6f\x6e\x73\x4c\x69\x73\x74'] = [], this[_0x3d76b5(0x16c)] = {}, this[_0x3d76b5(0x140)] = {}, this[_0x3d76b5(0x161)] = ![], this[_0x3d76b5(0x1b3)] = null, this[_0x3d76b5(0x13d)] = !![], this[_0x3d76b5(0x148)] = null;
                    }
                } catch (_0x152870) {
                    return _0x3a28c3 = _0x152870, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x3a28c3);
                }
            }
        }, _0x3483db[_0x418a9e(0x1e3)] = function (_0x4e4041, _0x1106a4) {
            var _0x116dfd = _0x418a9e, _0xbf7f45, _0x5a8472, _0x1447fb, _0x5b6f10;
            try {
                if (_0x1106a4 == null) {
                    if (_0x116dfd(0x155) === _0x116dfd(0x157))
                        this[_0x116dfd(0x1cb)]();
                    else
                        return;
                }
                _0x5b6f10 = this[_0x116dfd(0x193)](0x0, _0x4e4041, _0x1106a4[_0x116dfd(0x1d7)]);
                if (_0x5b6f10 == null)
                    return;
                _0x5b6f10[_0x116dfd(0x1bc)](), _0x1447fb = null, _0xbf7f45 = null, _0x1447fb = this[_0x116dfd(0x193)](0x1, _0x4e4041, _0x1106a4[_0x116dfd(0x170)]);
                if (_0x1447fb != null) {
                    if ('\x49\x50\x4a\x79\x7a' === _0x116dfd(0x18e)) {
                        if (_0x323fda['\x61\x6e\x79'](_0x27a69f))
                            return _0x4b8e7b(_0xe57996);
                    } else
                        _0x1447fb[_0x116dfd(0x1bc)]();
                }
                if (_0x1447fb != null && _0x1106a4[_0x116dfd(0x14e)] != null) {
                    if (_0x116dfd(0x13b) === _0x116dfd(0x146))
                        return _0x1a1660 = _0x101631, _0x13e8ab[_0x116dfd(0x1cc)](_0x156732);
                    else
                        _0x1447fb[_0x116dfd(0x14e)] = _0x1106a4[_0x116dfd(0x14e)];
                }
                _0xbf7f45 = this['\x5f\x63\x72\x65\x61\x74\x65\x41\x6e\x69\x6d\x61\x58\x53\x65\x74\x46\x72\x6f\x6d\x50\x61\x72\x61\x6d\x73'](0x3, _0x4e4041, _0x1106a4[_0x116dfd(0x1a1)]), _0xbf7f45 != null && _0xbf7f45['\x70\x72\x65\x4c\x6f\x61\x64'](), this[_0x116dfd(0x17d)](_0x4e4041, _0x5b6f10, _0x1447fb, _0xbf7f45);
            } catch (_0x16f52b) {
                if (_0x116dfd(0x16e) !== _0x116dfd(0x1b2))
                    _0x5a8472 = _0x16f52b, console[_0x116dfd(0x1e2)](_0x5a8472), this[_0x116dfd(0x140)][_0x4e4041] = null;
                else
                    return this['\x5f\x61\x78\x43\x75\x72\x72\x65\x6e\x74'] === this[_0x116dfd(0x15b)]();
            }
        }, _0x3483db[_0x418a9e(0x163)] = function () {
            var _0x2018f3 = _0x418a9e;
            this[_0x2018f3(0x1ea)] = _0x2018f3(0x1b9), !this[_0x2018f3(0x198)]() && this[_0x2018f3(0x174)]();
        }, _0x3483db[_0x418a9e(0x174)] = function () {
            var _0x26da72 = _0x418a9e;
            if (this[_0x26da72(0x198)]()) {
                this[_0x26da72(0x19e)]();
                if (this[_0x26da72(0x192)] != null) {
                    if (_0x26da72(0x159) !== _0x26da72(0x1a6)) {
                        this[_0x26da72(0x1e8)](), this['\x5f\x5f\x61\x78\x53\x68\x6f\x75\x6c\x64\x52\x65\x6c\x6f\x61\x64\x42\x69\x74\x6d\x61\x70\x73'] = !![], this[_0x26da72(0x192)] = null;
                        return;
                    } else
                        return;
                }
            }
            this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72'] = 0x0, this[_0x26da72(0x1cb)]();
        }, _0x3483db[_0x418a9e(0x1a8)] = function (_0x14ed66) {
            var _0x2de09c = _0x418a9e;
            return this['\x5f\x61\x78\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x41\x63\x74\x69\x6f\x6e\x73\x4c\x69\x73\x74'][_0x2de09c(0x1e9)](_0x14ed66);
        }, _0x3483db[_0x418a9e(0x176)] = function () {
            var _0x4803c5 = _0x418a9e;
            return this[_0x4803c5(0x156)] = ![], this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72'] = 0x0, this[_0x4803c5(0x161)] = ![];
        }, _0x3483db['\x5f\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x73\x46\x6f\x72\x53\x74\x61\x74\x65'] = function (_0x417b33, _0xdbcd1d, _0x45ef6a, _0x1820ec) {
            var _0x5b7008 = _0x418a9e;
            if ('\x45\x4d\x53\x75\x49' !== _0x5b7008(0x1df))
                _0x30695a['\x6d\x6f\x76\x65\x54\x6f\x49\x64\x6c\x65\x44\x65\x6c\x61\x79'] = _0x20a820[_0x5b7008(0x14e)];
            else {
                this['\x5f\x61\x78\x53\x74\x61\x74\x65\x73'][_0x417b33] = {}, _0xdbcd1d[_0x5b7008(0x1bc)](), this[_0x5b7008(0x140)][_0x417b33]['\x6d\x6f\x76\x65\x53\x65\x74'] = _0xdbcd1d;
                _0x45ef6a != null ? (_0x45ef6a[_0x5b7008(0x1c7)] = !![], _0x45ef6a[_0x5b7008(0x1bc)](), this[_0x5b7008(0x140)][_0x417b33][_0x5b7008(0x197)] = _0x45ef6a) : this[_0x5b7008(0x140)][_0x417b33][_0x5b7008(0x197)] = null;
                if (_0x1820ec != null) {
                    if (_0x5b7008(0x1b8) === '\x4e\x6e\x6f\x46\x77')
                        return this[_0x5b7008(0x140)][this[_0x5b7008(0x1ea)]][_0x5b7008(0x197)];
                    else
                        this['\x5f\x61\x78\x53\x74\x61\x74\x65\x73'][_0x417b33][_0x5b7008(0x188)] = _0x1820ec, _0x1820ec['\x70\x72\x65\x4c\x6f\x61\x64']();
                } else {
                    if (_0x5b7008(0x1e1) !== _0x5b7008(0x1a7))
                        this[_0x5b7008(0x140)][_0x417b33][_0x5b7008(0x188)] = null;
                    else
                        return _0x3e0307(_0x485f32);
                }
            }
        }, _0x3483db[_0x418a9e(0x193)] = function (_0x461d16, _0x5404ab, _0x5ca3d3) {
            var _0x4c47d3 = _0x418a9e, _0x4a16e1, _0x319c4b;
            _0x4a16e1 = null;
            try {
                if (_0x461d16 === 0x0) {
                    if (_0x5ca3d3 != null)
                        _0x4a16e1 = XAnimaTools[_0x4c47d3(0x1c9)](this[_0x4c47d3(0x1d2)](), _0x5404ab, _0x5ca3d3);
                    else {
                        if (this[_0x4c47d3(0x192)] === !![]) {
                            if (_0x4c47d3(0x18a) !== _0x4c47d3(0x1a3))
                                _0x4a16e1 = XAnimaTools[_0x4c47d3(0x14c)]();
                            else
                                return _0x35cc6c['\x55\x74\x69\x6c\x73'][_0x4c47d3(0x16d)](function () {
                                    return _0x579830(_0x1a52f3);
                                }, _0x26942d * 0x10);
                        }
                    }
                } else {
                    if (_0x461d16 === 0x1) {
                        if (_0x5ca3d3 != null) {
                            if (_0x4c47d3(0x1c3) === _0x4c47d3(0x142))
                                return _0x19de9d(_0x4fc17d);
                            else
                                _0x4a16e1 = XAnimaTools[_0x4c47d3(0x177)](this[_0x4c47d3(0x1d2)](), _0x5404ab, _0x5ca3d3);
                        }
                    } else {
                        if (_0x461d16 === 0x3) {
                            if (_0x4c47d3(0x1d3) === _0x4c47d3(0x1e7))
                                return;
                            else {
                                if (_0x5ca3d3 != null) {
                                    if (_0x4c47d3(0x1c5) === '\x6f\x59\x64\x78\x70')
                                        _0x4a16e1 = XAnimaTools['\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x46\x6f\x72\x44\x61\x73\x68\x69\x6e\x67'](this[_0x4c47d3(0x1d2)](), _0x5404ab, _0x5ca3d3);
                                    else
                                        return this[_0x4c47d3(0x156)] = ![], this[_0x4c47d3(0x1db)] = 0x0, this[_0x4c47d3(0x161)] = ![];
                                }
                            }
                        }
                    }
                }
            } catch (_0x11d1e2) {
                _0x319c4b = _0x11d1e2, console[_0x4c47d3(0x1e2)](_0x319c4b), _0x4a16e1 = null;
            }
            return _0x4a16e1;
        }, _0x3483db[_0x418a9e(0x194)] = function () {
            var _0x3b427f = _0x418a9e;
            if (_0x3b427f(0x1cd) !== '\x78\x46\x78\x6e\x41') {
                this[_0x3b427f(0x189)]();
                if (this[_0x3b427f(0x1ae)]()) {
                    if (_0x3b427f(0x17c) === '\x47\x64\x74\x68\x77')
                        return;
                    else
                        return _0x1503d4 = _0x31cf54, _0x20c8f2[_0x3b427f(0x1cc)](_0x2878d2);
                }
                this['\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x69\x6e\x67\x41\x6e\x69\x6d\x58']();
                if (!this[_0x3b427f(0x13d)] && this[_0x3b427f(0x1e5)]() && this[_0x3b427f(0x1d9)]())
                    return this['\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x65\x49\x64\x6c\x65\x41\x6e\x69\x6d\x61\x58']();
            } else
                return _0x49f691 = _0x455e37, _0x220980[_0x3b427f(0x1cc)](_0x2ec5cb), this['\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61\x53\x74\x61\x74\x65']();
        }, _0x3483db[_0x418a9e(0x13f)] = function () {
            var _0x13b1b1 = _0x418a9e;
            if (!this[_0x13b1b1(0x173)]()) {
                if (_0x13b1b1(0x1bb) === _0x13b1b1(0x1bb))
                    return;
                else
                    _0x4ba12e = _0x163664, _0x535d08['\x77\x61\x72\x6e'](_0x21230d), this[_0x13b1b1(0x140)][_0x557056] = null;
            }
            if (this[_0x13b1b1(0x1ce)]()) {
                if ('\x53\x62\x76\x4a\x78' === _0x13b1b1(0x178))
                    this[_0x13b1b1(0x18b)]();
                else
                    return this['\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x65\x49\x64\x6c\x65\x41\x6e\x69\x6d\x61\x58']();
            }
            this[_0x13b1b1(0x1db)] = 0x0;
            if (!this[_0x13b1b1(0x1d9)]()) {
                if (_0x13b1b1(0x1c6) !== _0x13b1b1(0x1c6))
                    return;
                else
                    return this[_0x13b1b1(0x174)]();
            }
        }, _0x3483db['\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x69\x6e\x67\x44\x61\x73\x68\x69\x6e\x67\x41\x6e\x69\x6d\x58'] = function () {
            var _0x4177dd = _0x418a9e;
            if ('\x46\x69\x59\x69\x4c' === _0x4177dd(0x1d6)) {
                if (this['\x69\x73\x44\x61\x73\x68\x69\x6e\x67\x46\x6f\x72\x41\x6e\x69\x6d\x61\x58']())
                    !this['\x69\x73\x49\x6e\x44\x61\x73\x68\x69\x6e\x67\x41\x6e\x69\x6d\x61\x58']() && this[_0x4177dd(0x1dc)]();
                else {
                    if (this[_0x4177dd(0x1ef)]()) {
                        if (_0x4177dd(0x1b7) !== _0x4177dd(0x1ad))
                            this[_0x4177dd(0x1cb)]();
                        else
                            return _0x1c74cc = _0x4f5c6d, _0x667d68['\x77\x61\x72\x6e\x69\x6e\x67'](_0x5c69d4), null;
                    }
                }
            } else
                this[_0x4177dd(0x1ea)] = '\x62\x61\x73\x65', !this[_0x4177dd(0x198)]() && this[_0x4177dd(0x174)]();
        }, _0x3483db[_0x418a9e(0x1d4)] = function () {
            var _0x2dbe4f = _0x418a9e;
            if (!this[_0x2dbe4f(0x173)]()) {
                if (_0x2dbe4f(0x17a) !== _0x2dbe4f(0x1e6)) {
                    this['\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72']++;
                    if (this[_0x2dbe4f(0x1db)] >= this[_0x2dbe4f(0x16b)]())
                        return this['\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x49\x64\x6c\x65']();
                } else {
                    if (!this[_0x2dbe4f(0x173)]()) {
                        this[_0x2dbe4f(0x1db)]++;
                        if (this[_0x2dbe4f(0x1db)] >= this['\x5f\x67\x65\x74\x41\x6e\x69\x6d\x61\x58\x4d\x6f\x76\x65\x54\x6f\x49\x64\x6c\x65\x44\x65\x6c\x61\x79']())
                            return this['\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x49\x64\x6c\x65']();
                    }
                }
            }
        }, _0x3483db[_0x418a9e(0x16b)] = function () {
            var _0x481d5f = _0x418a9e;
            return this[_0x481d5f(0x190)]()[_0x481d5f(0x14e)];
        }, _0x3483db[_0x418a9e(0x15b)] = function () {
            var _0x397485 = _0x418a9e;
            if (_0x397485(0x1dd) !== _0x397485(0x1a0))
                return this['\x5f\x61\x78\x53\x74\x61\x74\x65\x73'][this[_0x397485(0x1ea)]]['\x6d\x6f\x76\x65\x53\x65\x74'];
            else
                _0x22ca0d['\x70\x72\x65\x4c\x6f\x61\x64']();
        }, _0x3483db['\x5f\x61\x78\x49\x64\x6c\x65'] = function () {
            var _0x1cdcd5 = _0x418a9e;
            if ('\x53\x41\x6c\x4a\x64' === _0x1cdcd5(0x152)) {
                var _0x4d45ef;
                try {
                    if (_0x1cdcd5(0x1c8) !== '\x75\x6e\x47\x4d\x51')
                        this[_0x1cdcd5(0x163)]();
                    else
                        return this[_0x1cdcd5(0x140)][this[_0x1cdcd5(0x1ea)]][_0x1cdcd5(0x197)];
                } catch (_0x2d5bb8) {
                    return _0x4d45ef = _0x2d5bb8, KDCore[_0x1cdcd5(0x1cc)](_0x4d45ef), null;
                }
            } else
                return;
        }, _0x3483db['\x5f\x61\x78\x44\x61\x73\x68\x69\x6e\x67'] = function () {
            var _0x1e5d8b = _0x418a9e;
            return _0x1e5d8b(0x162) !== _0x1e5d8b(0x162) ? (_0x2383fa = _0x15cc8a, _0x183218['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2ff382)) : this[_0x1e5d8b(0x140)][this[_0x1e5d8b(0x1ea)]][_0x1e5d8b(0x188)];
        }, _0x3483db[_0x418a9e(0x13a)] = function () {
            var _0x588c18 = _0x418a9e;
            return this[_0x588c18(0x18c)] = this[_0x588c18(0x190)]();
        }, _0x3483db[_0x418a9e(0x1cb)] = function () {
            var _0x31f843 = _0x418a9e;
            return _0x31f843(0x171) === _0x31f843(0x171) ? this[_0x31f843(0x18c)] = this[_0x31f843(0x15b)]() : this['\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68'] === !![];
        }, _0x3483db[_0x418a9e(0x1dc)] = function () {
            var _0x26143a = _0x418a9e;
            return this[_0x26143a(0x18c)] = this[_0x26143a(0x168)]();
        }, _0x3483db['\x63\x6c\x65\x61\x72\x41\x6e\x69\x6d\x61\x58'] = function () {
            var _0x229aa2 = _0x418a9e;
            if (_0x229aa2(0x15e) !== _0x229aa2(0x15e))
                return this[_0x229aa2(0x18c)] === this[_0x229aa2(0x190)]();
            else
                this[_0x229aa2(0x174)](), this['\x5f\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58'] = ![], this[_0x229aa2(0x154)](null, null);
        }, _0x3483db['\x69\x73\x41\x6e\x69\x6d\x58\x50\x61\x72\x74\x73\x43\x68\x61\x6e\x67\x65\x64'] = function () {
            return this['\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68'] === !![];
        }, _0x3483db['\x6f\x6e\x41\x6e\x69\x6d\x58\x50\x61\x72\x74\x73\x52\x65\x66\x72\x65\x73\x68\x65\x64'] = function () {
            var _0x4d294d = _0x418a9e;
            return '\x53\x4b\x49\x45\x48' === _0x4d294d(0x179) ? this['\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68'] = ![] : this[_0x4d294d(0x18c)] = this[_0x4d294d(0x190)]();
        }, _0x3483db[_0x418a9e(0x1b0)] = function (_0x3a0630, _0x1f09f6 = ![]) {
            var _0xc1a2f6 = _0x418a9e;
            if (_0xc1a2f6(0x1d0) !== _0xc1a2f6(0x1d0))
                _0x449019 = this['\x67\x65\x74\x50\x72\x65\x6c\x6f\x61\x64\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x53\x65\x74'](_0x2c3113);
            else {
                var _0xda4d46;
                if (this['\x61\x6e\x69\x6d\x61\x58\x50\x61\x72\x74\x73'][_0x3a0630] != null) {
                    if ('\x57\x52\x61\x46\x78' === _0xc1a2f6(0x14f))
                        return;
                    else
                        _0x30eabb[_0xc1a2f6(0x164)]['\x63\x61\x6c\x6c\x44\x65\x6c\x61\x79\x65\x64'](function () {
                            var _0x3b68aa = _0xc1a2f6;
                            return _0x376198[_0x3b68aa(0x164)]['\x70\x6c\x61\x79\x53\x45'](_0x4c2d48);
                        }, _0xf09817 * 0x10);
                }
                _0xda4d46 = XAnimaTools[_0xc1a2f6(0x183)](this[_0xc1a2f6(0x1d2)](), _0x3a0630, _0x1f09f6);
                if (_0xda4d46 == null) {
                    if (_0xc1a2f6(0x1aa) === _0xc1a2f6(0x187))
                        return this[_0xc1a2f6(0x156)] = ![];
                    else
                        return;
                }
                this[_0xc1a2f6(0x1c4)][_0x3a0630] = _0xda4d46, this['\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68'] = !![];
            }
        }, _0x3483db[_0x418a9e(0x14b)] = function (_0x3b628a) {
            var _0x1ccf31 = _0x418a9e;
            _0x1ccf31(0x19b) === '\x48\x4d\x75\x56\x6d' ? (this[_0x1ccf31(0x1c4)][_0x3b628a] = null, delete this[_0x1ccf31(0x1c4)][_0x3b628a], this[_0x1ccf31(0x156)] = !![]) : this[_0x1ccf31(0x140)][_0xa14733][_0x1ccf31(0x188)] = null;
        }, _0x3483db['\x63\x6c\x65\x61\x72\x58\x41\x6e\x69\x6d\x50\x61\x72\x74\x73'] = function () {
            var _0x3eaea5 = _0x418a9e;
            this[_0x3eaea5(0x1c4)] = {}, this['\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68'] = !![];
        }, _0x3483db[_0x418a9e(0x1ee)] = function (_0x1327d9, _0x524f01 = ![], _0x321c50 = ![]) {
            var _0x2373f3 = _0x418a9e, _0x4020d0, _0x2d30e5;
            if (!this[_0x2373f3(0x166)](_0x1327d9))
                return ![];
            if (this[_0x2373f3(0x1a4)](_0x1327d9))
                '\x73\x4b\x44\x66\x4b' !== _0x2373f3(0x169) ? _0x39e63e = _0x1ab0c2[_0x2373f3(0x1a9)](this[_0x2373f3(0x1d2)](), _0x143d71, _0x41d904) : _0x2d30e5 = this[_0x2373f3(0x1be)](_0x1327d9);
            else {
                if ('\x70\x7a\x48\x78\x6e' !== _0x2373f3(0x145))
                    _0x4020d0 = XAnimaTools[_0x2373f3(0x13c)](_0x1327d9, this[_0x2373f3(0x1d2)]()), _0x2d30e5 = this[_0x2373f3(0x195)](_0x4020d0);
                else
                    return this['\x5f\x61\x78\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x41\x63\x74\x69\x6f\x6e\x73\x4c\x69\x73\x74'][_0x2373f3(0x1a5)](_0x466c8a);
            }
            if (_0x2d30e5 != null)
                return _0x2d30e5['\x77\x61\x69\x74\x41\x63\x74\x69\x6f\x6e\x45\x6e\x64'] = _0x321c50, _0x2d30e5['\x69\x73\x4c\x6f\x6f\x70'] = _0x524f01, this[_0x2373f3(0x17b)](_0x2d30e5), PKD_ANIMAX['\x49\x73\x4e\x65\x74\x77\x6f\x72\x6b\x47\x61\x6d\x65']() && !PKD_ANIMAX['\x49\x6e\x4c\x6f\x63\x61\x6c\x4d\x6f\x64\x65']() && PKD_ANIMAX['\x53\x65\x6e\x64\x4e\x65\x74\x77\x6f\x72\x6b\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e'](_0x1327d9, _0x524f01, _0x321c50), $gameTemp['\x6e\x65\x74\x41\x6e\x69\x6d\x61\x58\x4c\x6f\x63\x61\x6c'] = null, !![];
            return ![];
        });
    }());
}()));
function _0x127b() {
    var _0x40e76b = [
        '\x54\x73\x62\x58\x61',
        '\x66\x59\x6e\x71\x45',
        '\x70\x6c\x61\x79\x53\x45',
        '\x5f\x5f\x6c\x61\x73\x74\x45\x76\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58\x45\x78\x74\x65\x72\x6e\x50\x72\x6f\x66\x69\x6c\x65',
        '\x77\x61\x69\x74\x41\x63\x74\x69\x6f\x6e\x45\x6e\x64',
        '\x4a\x72\x47\x76\x70',
        '\x72\x65\x6d\x6f\x76\x65\x58\x41\x6e\x69\x6d\x50\x61\x72\x74',
        '\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x46\x6f\x72\x49\x6e\x64\x65\x70\x65\x6e\x64\x65\x6e\x74\x41\x63\x74\x69\x6f\x6e',
        '\x32\x33\x39\x32\x33\x35\x30\x54\x53\x69\x66\x41\x67',
        '\x6d\x6f\x76\x65\x54\x6f\x49\x64\x6c\x65\x44\x65\x6c\x61\x79',
        '\x57\x52\x61\x46\x78',
        '\x67\x65\x74\x43\x75\x72\x72\x65\x6e\x74\x41\x6e\x69\x6d\x58',
        '\x4b\x6e\x65\x5a\x6b',
        '\x53\x41\x6c\x4a\x64',
        '\x63\x7a\x57\x52\x64',
        '\x69\x6e\x69\x74\x41\x6e\x69\x6d\x61\x58',
        '\x7a\x59\x41\x74\x4f',
        '\x5f\x78\x41\x6e\x69\x6d\x61\x50\x61\x72\x74\x73\x52\x65\x71\x75\x69\x72\x65\x52\x65\x66\x72\x65\x73\x68',
        '\x61\x61\x72\x49\x75',
        '\x6b\x68\x48\x4b\x7a',
        '\x6d\x4b\x6f\x75\x65',
        '\x52\x56\x55\x46\x63',
        '\x5f\x61\x78\x4d\x6f\x76\x65\x6d\x65\x6e\x74',
        '\x35\x38\x34\x34\x69\x7a\x78\x6d\x62\x6f',
        '\x6e\x67\x67\x6c\x58',
        '\x62\x73\x6f\x71\x4e',
        '\x44\x50\x58\x46\x57',
        '\x31\x31\x34\x30\x49\x4e\x4e\x56\x59\x6f',
        '\x5f\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58',
        '\x4b\x54\x41\x57\x4f',
        '\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61\x53\x74\x61\x74\x65',
        '\x55\x74\x69\x6c\x73',
        '\x5f\x61\x78\x41\x76\x61\x69\x6c\x61\x62\x6c\x65\x41\x63\x74\x69\x6f\x6e\x73\x4c\x69\x73\x74',
        '\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x57\x69\x74\x68\x4e\x61\x6d\x65',
        '\x66\x6e\x67\x54\x70',
        '\x5f\x61\x78\x44\x61\x73\x68\x69\x6e\x67',
        '\x73\x4b\x44\x66\x4b',
        '\x65\x42\x6a\x42\x67',
        '\x5f\x67\x65\x74\x41\x6e\x69\x6d\x61\x58\x4d\x6f\x76\x65\x54\x6f\x49\x64\x6c\x65\x44\x65\x6c\x61\x79',
        '\x5f\x61\x78\x50\x72\x65\x6c\x6f\x61\x64\x65\x64\x41\x63\x74\x69\x6f\x6e\x73',
        '\x63\x61\x6c\x6c\x44\x65\x6c\x61\x79\x65\x64',
        '\x61\x78\x58\x57\x46',
        '\x53\x76\x55\x6e\x4f',
        '\x69\x64\x6c\x65',
        '\x79\x7a\x65\x4b\x52',
        '\x66\x75\x72\x71\x65',
        '\x69\x73\x4d\x6f\x76\x69\x6e\x67',
        '\x72\x65\x73\x65\x74\x58\x41\x6e\x69\x6d\x61',
        '\x34\x78\x64\x56\x58\x6e\x64',
        '\x5f\x69\x6e\x69\x74\x4d\x65\x6d\x62\x65\x72\x73\x41\x6e\x69\x6d\x61\x58',
        '\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x46\x6f\x72\x49\x64\x6c\x65',
        '\x53\x62\x76\x4a\x78',
        '\x53\x4b\x49\x45\x48',
        '\x59\x6c\x69\x50\x6a',
        '\x73\x74\x61\x72\x74\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e',
        '\x47\x64\x74\x68\x77',
        '\x5f\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x73\x46\x6f\x72\x53\x74\x61\x74\x65',
        '\x54\x49\x64\x73\x67',
        '\x5a\x4f\x66\x58\x65',
        '\x7a\x58\x6b\x48\x6b',
        '\x42\x58\x4f\x44\x59',
        '\x6c\x4a\x53\x4f\x54',
        '\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x50\x61\x72\x74',
        '\x49\x6e\x4c\x6f\x63\x61\x6c\x4d\x6f\x64\x65',
        '\x43\x55\x64\x54\x73',
        '\x31\x30\x33\x31\x34\x37\x4b\x58\x70\x49\x77\x45',
        '\x41\x4f\x56\x6f\x73',
        '\x64\x61\x73\x68\x53\x65\x74',
        '\x5f\x75\x70\x64\x61\x74\x65\x41\x6e\x69\x6d\x58\x52\x65\x66\x72\x65\x73\x68',
        '\x79\x56\x46\x53\x58',
        '\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x69\x6e\x67\x44\x61\x73\x68\x69\x6e\x67\x41\x6e\x69\x6d\x58',
        '\x5f\x61\x78\x43\x75\x72\x72\x65\x6e\x74',
        '\x33\x38\x31\x39\x31\x39\x58\x65\x67\x77\x6d\x4f',
        '\x4d\x67\x64\x65\x43',
        '\x46\x50\x53\x61\x4a',
        '\x5f\x61\x78\x49\x64\x6c\x65',
        '\x54\x78\x4e\x69\x75',
        '\x5f\x5f\x61\x78\x53\x68\x6f\x75\x6c\x64\x52\x65\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x41\x66\x74\x65\x72\x41\x63\x74\x69\x6f\x6e',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x6e\x69\x6d\x61\x58\x53\x65\x74\x46\x72\x6f\x6d\x50\x61\x72\x61\x6d\x73',
        '\x5f\x75\x70\x64\x61\x74\x65\x41\x6e\x69\x6d\x58',
        '\x63\x72\x65\x61\x74\x65\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x53\x65\x74',
        '\x53\x65\x6e\x64\x4e\x65\x74\x77\x6f\x72\x6b\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e',
        '\x69\x64\x6c\x65\x53\x65\x74',
        '\x69\x73\x49\x6e\x41\x6e\x69\x6d\x58\x41\x63\x74\x69\x6f\x6e',
        '\x63\x6c\x65\x61\x72\x58\x41\x6e\x69\x6d\x50\x61\x72\x74\x73',
        '\x49\x77\x64\x4a\x44',
        '\x48\x4d\x75\x56\x6d',
        '\x6d\x44\x6f\x44\x4c',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x6f\x6e\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x45\x6e\x64',
        '\x70\x4b\x61\x64\x65',
        '\x6b\x52\x76\x4b\x4f',
        '\x64\x61\x73\x68',
        '\x38\x39\x30\x46\x63\x73\x78\x7a\x41',
        '\x57\x45\x50\x6d\x57',
        '\x69\x73\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x49\x73\x50\x72\x65\x6c\x6f\x61\x64\x65\x64',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x42\x62\x52\x6e\x65',
        '\x4a\x6b\x53\x43\x51',
        '\x72\x65\x67\x69\x73\x74\x65\x72\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e',
        '\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x46\x6f\x72\x44\x61\x73\x68\x69\x6e\x67',
        '\x5a\x6c\x78\x71\x6c',
        '\x62\x65\x68\x61\x76',
        '\x49\x74\x4b\x45\x64',
        '\x72\x49\x5a\x69\x64',
        '\x69\x73\x53\x68\x6f\x75\x6c\x64\x57\x61\x69\x74\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e',
        '\x69\x73\x49\x6e\x4d\x6f\x76\x65\x6d\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58',
        '\x61\x64\x64\x4e\x65\x77\x58\x41\x6e\x69\x6d\x50\x61\x72\x74',
        '\x56\x46\x4a\x4f\x47',
        '\x46\x46\x47\x68\x4a',
        '\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58\x50\x72\x6f\x66\x69\x6c\x65',
        '\x61\x6e\x79',
        '\x49\x73\x4e\x65\x74\x77\x6f\x72\x6b\x47\x61\x6d\x65',
        '\x6f\x57\x77\x46\x78',
        '\x57\x48\x79\x4e\x43',
        '\x63\x79\x59\x6d\x4e',
        '\x62\x61\x73\x65',
        '\x77\x5a\x63\x49\x45',
        '\x49\x68\x43\x4b\x45',
        '\x70\x72\x65\x4c\x6f\x61\x64',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x41\x6e\x69\x6d\x61\x41\x63\x74\x69\x6f\x6e\x45\x6e\x64\x42\x65\x68\x61\x76',
        '\x67\x65\x74\x50\x72\x65\x6c\x6f\x61\x64\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x53\x65\x74',
        '\x69\x73\x41\x63\x74\x69\x6f\x6e',
        '\x62\x79\x7a\x71\x42',
        '\x42\x68\x67\x67\x48',
        '\x32\x34\x74\x44\x4b\x73\x53\x50',
        '\x58\x58\x6a\x69\x48',
        '\x61\x6e\x69\x6d\x61\x58\x50\x61\x72\x74\x73',
        '\x6f\x59\x64\x78\x70',
        '\x6b\x66\x42\x75\x5a',
        '\x69\x73\x4c\x6f\x6f\x70',
        '\x75\x6e\x47\x4d\x51',
        '\x63\x72\x65\x61\x74\x65\x58\x41\x6e\x69\x6d\x61\x53\x65\x74\x46\x6f\x72\x4d\x6f\x76\x65',
        '\x69\x73\x49\x6e\x49\x64\x6c\x65\x41\x6e\x69\x6d\x61\x58',
        '\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x4d\x6f\x76\x65\x6d\x65\x6e\x74',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x72\x6f\x62\x65\x78',
        '\x69\x73\x48\x61\x76\x65\x44\x61\x73\x68\x41\x6e\x69\x6d\x61\x58',
        '\x33\x37\x35\x45\x73\x62\x70\x51\x61',
        '\x43\x66\x76\x49\x72',
        '\x38\x70\x53\x57\x66\x71\x6d',
        '\x61\x6e\x69\x6d\x58\x49\x64',
        '\x68\x50\x48\x4d\x4b',
        '\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x65\x49\x64\x6c\x65\x41\x6e\x69\x6d\x61\x58',
        '\x31\x33\x34\x36\x38\x36\x37\x31\x77\x4d\x75\x64\x61\x61',
        '\x46\x69\x59\x69\x4c',
        '\x6d\x6f\x76\x65',
        '\x68\x53\x76\x62\x43',
        '\x69\x73\x49\x6e\x41\x6e\x79\x4d\x6f\x76\x65\x6d\x65\x6e\x74\x41\x6e\x69\x6d\x61\x58',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x41\x6e\x69\x6d\x61\x41\x63\x74\x69\x6f\x6e\x53\x74\x61\x72\x74\x42\x65\x68\x61\x76',
        '\x5f\x78\x41\x6e\x69\x6d\x61\x54\x6f\x49\x64\x6c\x65\x54\x69\x6d\x65\x72',
        '\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x44\x61\x73\x68\x69\x6e\x67',
        '\x77\x6b\x67\x57\x75',
        '\x69\x73\x41\x6e\x69\x6d\x58',
        '\x45\x4d\x53\x75\x49',
        '\x41\x46\x69\x43\x65',
        '\x46\x77\x55\x48\x6e',
        '\x77\x61\x72\x6e',
        '\x72\x65\x67\x69\x73\x74\x65\x72\x41\x6e\x69\x6d\x61\x58\x53\x74\x61\x74\x65',
        '\x6f\x6e\x41\x6e\x69\x6d\x61\x58\x41\x63\x74\x69\x6f\x6e\x53\x74\x61\x72\x74',
        '\x69\x73\x48\x61\x76\x65\x49\x64\x6c\x65\x41\x6e\x69\x6d\x61\x58',
        '\x7a\x7a\x50\x76\x78',
        '\x4a\x4e\x61\x78\x51',
        '\x64\x65\x6c\x65\x74\x65\x41\x6e\x69\x6d\x61\x58',
        '\x70\x75\x73\x68',
        '\x5f\x61\x78\x53\x74\x61\x74\x65',
        '\x5f\x61\x78\x49\x64',
        '\x32\x37\x31\x38\x32\x32\x36\x67\x66\x57\x5a\x4e\x57',
        '\x5f\x5f\x61\x78\x53\x68\x6f\x75\x6c\x64\x52\x65\x6c\x6f\x61\x64\x42\x69\x74\x6d\x61\x70\x73',
        '\x73\x74\x61\x72\x74\x41\x6e\x69\x6d\x61\x58\x43\x75\x73\x74\x6f\x6d\x41\x63\x74\x69\x6f\x6e',
        '\x69\x73\x49\x6e\x44\x61\x73\x68\x69\x6e\x67\x41\x6e\x69\x6d\x61\x58',
        '\x5f\x73\x65\x74\x41\x6e\x69\x6d\x61\x58\x54\x6f\x49\x64\x6c\x65',
        '\x72\x51\x4d\x51\x68',
        '\x67\x65\x74\x58\x41\x6e\x69\x6d\x61\x50\x61\x72\x61\x6d\x73\x46\x6f\x72\x41\x63\x74\x69\x6f\x6e',
        '\x5f\x61\x78\x49\x73\x44\x65\x73\x74\x72\x6f\x79\x65\x64',
        '\x6e\x65\x74\x41\x6e\x69\x6d\x61\x58\x4c\x6f\x63\x61\x6c',
        '\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x69\x6e\x67\x41\x6e\x69\x6d\x58',
        '\x5f\x61\x78\x53\x74\x61\x74\x65\x73',
        '\x61\x63\x74\x69\x6f\x6e\x4e\x61\x6d\x65',
        '\x52\x57\x63\x4f\x47',
        '\x69\x73\x48\x61\x76\x65\x41\x6e\x69\x6d\x61\x58\x53\x74\x61\x74\x65',
        '\x36\x37\x34\x31\x36\x37\x78\x6d\x44\x73\x46\x61'
    ];
    _0x127b = function () {
        return _0x40e76b;
    };
    return _0x127b();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    
    // * Персонаж использует XAnima
    _.isAnimX = function() {
      return false;
    };
    // * ID набора анимаций
    _.animXId = function() {
      return null;
    };
    // * Когда запускается действие
    _.onAnimaXActionStart = function() {};
    // * Когда действие заканчивается
    _.onAnimaXActionEnd = function() {};
    
    // * Находится ли анимация в действии
    _.isInAnimXAction = function() {
      return false;
    };
    // * Находится ли анимация в действии и необходимо ждать завершения
    _.isAnimXIsBusy = function() {
      return this.isAnimX() && this.isInAnimXAction() && this.isShouldWaitAnimaXAction();
    };
    // * Находится ли анимация в движении (имеется в виду moveSet)
    _.isInMovementAnimaX = function() {
      return false;
    };
    // * Надо ли применять анимацию бега на персонаже
    _.isDashingForAnimaX = function() {
      return false;
    };
    // * Находился ли персонаж в какой-либо анимации движения (или бег)
    _.isInAnyMovementAnimaX = function() {
      return false;
    };
    // * Находится ли анимация в Idle
    _.isInIdleAnimaX = function() {
      return false;
    };
    // * Находится ли анимация текущая в состоянии Dashing (Бег)
    _.isInDashingAnimaX = function() {
      return false;
    };
    // * Есть ли Idle анимация у текущего состояния
    _.isHaveIdleAnimaX = function() {
      return false;
    };
    // * Есть ли анимация для состояния
    _.isHaveAnimaXState = function() {
      return false;
    };
    // * Есть ли Dashing (бег) анимация у текущего состояния
    _.isHaveDashAnimaX = function() {
      return false;
    };
    // * Есть ли данное действие у текущей XAnima конфигурации
    _.isHaveAnimaXActionWithName = function() {
      return false;
    };
    // * Должен ли ждать завершения действия
    _.isShouldWaitAnimaXAction = function() {
      return false;
    };
    // * Отключить анимацию
    _.clearAnimaX = function() {};
    // * Действие является стандартным (используется для предзагрузки)
    _.isAnimaXAADefaultAction = function(actionName) {
      return false;
    };
    // * Анимация действия была предзагруженна
    _.isAnimaXActionIsPreloaded = function() {
      return false;
    };
    // * Были ли изменены слои (части) анимации?
    _.isAnimXPartsChanged = function() {
      return false;
    };
  })();
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__erase, ALIAS__setupPage, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__erase = _.erase;
  _.erase = function() {
    if (this.isAnimX()) {
      this.clearXAnimParts();
    }
    ALIAS__erase.call(this);
  };
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this);
    this._isHaveAnimaX = false;
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.setExternalAnimaX = function(name, isForIndependentAction = false) {
    this.__lastEventAnimaXExternProfile = name;
    this.__axShouldResetAnimaXAfterAction = isForIndependentAction === true;
    this.refresh();
    this.refreshAnimaX();
    if (this.__lastEventAnimaXExternProfile == null) {
      this.__axShouldReloadBitmaps = true;
    }
  };
  _.getCurrentAnimaXProfile = function() {
    var animXParameter, list;
    if (this.page() == null) {
      return null;
    }
    if (this.__lastEventAnimaXExternProfile != null) {
      return this.__lastEventAnimaXExternProfile;
    } else {
      list = this.page().list;
      animXParameter = KDCore.Utils.getEventCommentValue('XA:', list);
      if (animXParameter != null) {
        return this._parseAnimaXAParameterForEvent(animXParameter);
      }
    }
    return null;
  };
  _._parseAnimaXAParameterForEvent = function(animXParameter) {
    var id, parts;
    if (animXParameter == null) {
      return;
    }
    parts = animXParameter.split(":");
    id = parts[1];
    return id;
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Follower.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Follower.prototype;
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    var actor;
    actor = this.getBattlerForAnimaX();
    if (actor == null) {
      return null;
    }
    return KDCore.Utils.getValueFromMeta('xAnima', actor.actor());
  };
  _.getBattlerForAnimaX = function() {
    return this.actor();
  };
  _.isDashingForAnimaX = function() {
    return $gamePlayer.isDashing();
  };
})();

// ■ END Game_Follower.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'xAnima') {
      return this._updateXAnimaWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._updateXAnimaWait = function() {
    var waiting;
    waiting = this.xAnimaTarget.isInAnimXAction();
    if (!waiting) {
      this._waitMode = '';
      this.xAnimaTarget = null;
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function(actorId) {
    var actor;
    ALIAS__addActor.call(this, actorId);
    // * Чтобы приминялась анимация с оружием (если была)
    if (this._actors.includes(actorId)) { // * Если был добавлен
      actor = $gameActors.actor(actorId);
      if (actor != null) {
        actor.refresh();
      }
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__refresh, ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima
  // -----------------------------------------------------------------------
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshAnimaX();
  };
  
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (this.isAnimXIsBusy()) {
      // * Дополнительная проверка анимации, т.к. Game_Player перекрывает метод canMove из Character_Base
      return false;
    }
    return ALIAS__canMove.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function(sceneActive) {
    ALIAS__update.call(this, sceneActive);
    if (this.isAnimX()) {
      return this._updateAnimX();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //?[ANIMAX_E]
  // * Система анимации XAnima и ABS
  // -----------------------------------------------------------------------
  _.getCurrentAnimaXProfile = function() {
    var equipAnimaXSet;
    if (this.isAnimX()) {
      equipAnimaXSet = this._getEquipmentAnimaXSet();
      if (String.any(equipAnimaXSet)) {
        return equipAnimaXSet;
      }
    }
    return this.getInitialXProfile();
  };
  _.getInitialXProfile = function() {
    if (String.any($gameSystem.lastPlayerAnimaXExternProfile)) {
      return $gameSystem.lastPlayerAnimaXExternProfile;
    } else {
      if ($gameParty.leader() != null) {
        return KDCore.Utils.getValueFromMeta('xAnima', $gameParty.leader().actor());
      } else {
        return null;
      }
    }
  };
  _.isAnimaXAADefaultAction = function(actionName) {
    return ['Attack', 'Defense', 'Skill'].contains(actionName);
  };
  _.getBattlerForAnimaX = function() {
    return $gameParty.leader();
  };
  _.setExternalAnimaX = function(name, isForIndependentAction = false) {
    $gameSystem.lastPlayerAnimaXExternProfile = name;
    this.__axShouldResetAnimaXAfterAction = isForIndependentAction === true;
    this.refresh();
    this.axExternalAnimaXForNet();
  };
  _.axExternalAnimaXForNet = function() {
    if (PKD_ANIMAX.InLocalMode()) {
      $gameTemp.netAnimaXLocal = null;
      return;
    } else {
      if (PKD_ANIMAX.IsNetworkGame()) {
        PKD_ANIMAX.SendNetworkPlayerExternalAnimaX();
      }
    }
  };
  _.isDashingForAnimaX = function() {
    return this.isDashing();
  };
})();

// ■ END Game_Player.coffee
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
  _.loadAnimaX = function(filename) {
    if (PKD_ANIMAX.IsUseWebp()) {
      return this.loadAnimaXw(filename);
    } else {
      return this.loadBitmap('img/charactersAA/', filename, 0, false);
    }
  };
  _.loadAnimaXw = function(filename) {
    return this.axLoadWepbBitmap('img/charactersAA/', filename, 0, false);
  };
  _.axLoadWepbBitmap = function(folder, filename, hue, smooth) {
    if (KDCore.isMV()) {
      return this._axLoadWepbBitmapMV(...arguments);
    } else {
      return this._axLoadWepbBitmapMZ(folder, filename);
    }
  };
  _.loadAllAnimaX = function(err, list) {
    var e, file, filename, i, len, path;
    try {
      if (err != null) {
        return console.warn(err);
      } else {
        //fileFormat = ".png"
        //fileFormat = ".webp" if PKD_ANIMAX.IsUseWebp()
        console.log("AnimaX, try preload " + list.length + " animation files");
        path = PKD_ANIMAX._basePath;
        for (i = 0, len = list.length; i < len; i++) {
          file = list[i];
          if (!file.contains(".png")) {
            continue;
          }
          filename = file.replace(path, "");
          filename = filename.replace(".png", "");
          filename = filename.replaceAll("\\", "/");
          ImageManager.loadAnimaX(filename);
        }
        /*finalName = 'img/charactersAA/' + filename + fileFormat
        if KDCore.isMV()
            #ImageManager.loadNormalBitmap(
         *    finalName, 0
            #)
            ImageManager.loadAnimaX(filename)
        else
            ImageManager.loadBitmapFromUrl(finalName) */
        return console.log('AnimaX, preload done');
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    this.axPreloadAllAnimationOnMap();
    this.axRefreshForNetwork();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.axPreloadAllAnimationOnMap = function() {
    var e, ev, f, i, j, len, len1, ref, ref1;
    try {
      if ($gamePlayer.isAnimX()) {
        $gamePlayer.getCurrentAnimX().preLoad();
      }
      ref = $gamePlayer.followers()._data;
      for (i = 0, len = ref.length; i < len; i++) {
        f = ref[i];
        if (f.isAnimX()) {
          f.getCurrentAnimX().preLoad();
        }
      }
      ref1 = $gameMap.events();
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        ev = ref1[j];
        if (ev != null ? ev.isAnimX() : void 0) {
          ev.getCurrentAnimX().preLoad();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _.axRefreshForNetwork = function() {
    if (PKD_ANIMAX.IsNetworkGame() && ($gameParty.leader() != null)) {
      return PKD_ANIMAX.SendNetworkFlagAnimaXRefresh($gameParty.leader().actorId());
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Спрайт для анимации слоя (части)
var Sprite_AnimaXPart;

Sprite_AnimaXPart = class Sprite_AnimaXPart extends Sprite {
  constructor(animPart, rootAnimation) {
    super();
    this.animPart = animPart;
    this.animPart.applyRootAnimation(rootAnimation);
    this.visible = !this.animPart.isDisabled();
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.isLowerBodyPart = this.animPart.isLowerBodyPart;
    // * Offset for layer parts
    this.x += this.animPart.dx;
    this.y += this.animPart.dy;
    return;
  }

  refreshPart(frame, dir) {
    this.bitmap = this.animPart.getPartBitmap(dir, frame);
    this.refrshSheetFrame(frame, dir);
  }

  refrshSheetFrame(frame, dir) {
    var e, frameRect;
    try {
      if (!this.animPart.isSpritesheet) {
        return;
      }
      frameRect = this.animPart.getSheetFrame(dir, frame);
      return this.setFrame(...frameRect);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__characterBlockX, ALIAS__characterBlockY, ALIAS__characterPatternX, ALIAS__characterPatternY, ALIAS__isEmptyCharacter, ALIAS__isImageChanged, ALIAS__patternHeight, ALIAS__patternWidth, ALIAS__updateBitmap, ALIAS__updateFrame, ALIAS__updatePosition, ALIAS__updateVisibility, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__isEmptyCharacter = _.isEmptyCharacter;
  _.isEmptyCharacter = function() {
    if (this.isAnimX()) {
      return false;
    } else {
      return ALIAS__isEmptyCharacter.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateBitmap = _.updateBitmap;
  _.updateBitmap = function() {
    if (this.isAnimX()) {
      this._updateBitmapAnimX();
    } else {
      ALIAS__updateBitmap.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__updateVisibility = _.updateVisibility;
  _.updateVisibility = function() {
    if (this.isAnimX()) {
      return this._updateVisibilityAnimX();
    } else {
      return ALIAS__updateVisibility.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__updateFrame = _.updateFrame;
  _.updateFrame = function() {
    ALIAS__updateFrame.call(this);
    if (this.isAnimX()) {
      this._axCntr.updateSheetFrame(this);
      this._axCntr.update(this._character);
      if (this._animaXParts != null) {
        this._updateAnimaXPartsDepth();
        this._updateAnimaXParts();
      }
    }
  };
  //@[ALIAS]
  ALIAS__updatePosition = _.updatePosition;
  _.updatePosition = function() {
    ALIAS__updatePosition.call(this);
    if (this.isAnimX()) {
      this.x += this._axCntr.rootAnimation.dx;
      this.y += this._axCntr.rootAnimation.dy;
    }
  };
  
  //@[ALIAS]
  ALIAS__isImageChanged = _.isImageChanged;
  _.isImageChanged = function() {
    if (this.isAnimX()) {
      return this._animaXSet !== this._character.getCurrentAnimX();
    } else {
      if ((this._character != null) && this._character.__axShouldReloadBitmaps === true) {
        this._character.__axShouldReloadBitmaps = null;
        return true;
      }
      return ALIAS__isImageChanged.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__patternWidth = _.patternWidth;
  _.patternWidth = function() {
    if (this.isAnimX()) {
      return this.bitmap.width;
    } else {
      return ALIAS__patternWidth.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__patternHeight = _.patternHeight;
  _.patternHeight = function() {
    if (this.isAnimX()) {
      
      return this.bitmap.height;
    } else {
      return ALIAS__patternHeight.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__characterBlockX = _.characterBlockX;
  _.characterBlockX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockX.call(this);
  };
  
  //@[ALIAS]
  ALIAS__characterBlockY = _.characterBlockY;
  _.characterBlockY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterBlockY.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternX = _.characterPatternX;
  _.characterPatternX = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternX.call(this);
  };
  //@[ALIAS]
  ALIAS__characterPatternY = _.characterPatternY;
  _.characterPatternY = function() {
    if (this.isAnimX()) {
      return 0;
    }
    return ALIAS__characterPatternY.call(this);
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  (function() {    // * Система анимации XAnima
    // -----------------------------------------------------------------------
    _.isAnimX = function() {
      return this._character.isAnimX();
    };
    _._updateVisibilityAnimX = function() {
      if (KDCore.isMV()) {
        Sprite_Base.prototype.updateVisibility.call(this);
      } else {
        Sprite.prototype.updateVisibility.call(this);
      }
      if (this._character.isTransparent()) {
        this.visible = false;
      } else {
        if (this._character instanceof Game_Follower) {
          this.visible = this._character.isVisible();
        }
      }
    };
    _._updateBitmapAnimX = function() {
      if (this.isImageChanged()) {
        this._animaXSet = this._character.getCurrentAnimX();
        this._refreshAnimXSetController();
        this._createAnimaXParts();
      } else if (this.isXAnimPartsChanged()) {
        this._createAnimaXParts();
      }
      if (this._axCntr.isChanged()) {
        this._refreshAnimaXBitmap();
        this._refreshAnimXPartSprites();
      }
    };
    return _._refreshAnimXSetController = function() {
      this._axCntr = new XAnimaSetController(this._character.direction(), this._animaXSet);
      return this._refreshAnimaXBitmap();
    };
  })();
  (function() {    // * Система анимации XAnima - Части (слои)
    // -----------------------------------------------------------------------
    // * Синхронизируем координаты нижнего слоя
    _._updateAnimaXParts = function() {
      this._animaXPartBelow.x = this.x;
      return this._animaXPartBelow.y = this.y;
    };
    // * Чтобы lower и upper body прозрачность была (в кустах)
    _._updateAnimaXPartsDepth = function() {
      var i, j, len, len1, p, ref, ref1;
      // * Не обновлять, если не изменилась прозрачность
      if (this.__lBushDepth === this._bushDepth) {
        return;
      }
      this.__lBushDepth = this._bushDepth;
      if (this._bushDepth > 0) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          if (p.isLowerBodyPart === true) {
            p.opacity = 128;
          }
        }
      } else {
        ref1 = this.__tAnimxParts;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          p = ref1[j];
          p.opacity = 255;
        }
      }
    };
    _.isXAnimPartsChanged = function() {
      if (this.isAnimX()) {
        return this._character.isAnimXPartsChanged();
      } else {
        return false;
      }
    };
    _._refreshAnimXPartSprites = function() {
      var i, len, part, ref;
      if (this._animaXParts == null) {
        return;
      }
      ref = this.__tAnimxParts;
      for (i = 0, len = ref.length; i < len; i++) {
        part = ref[i];
        part.refreshPart(this._axCntr.cFrame, this._axCntr.cDir);
        this._addPartOnSpriteByDirection(part, this._axCntr.cDir);
      }
    };
    _._refreshAnimaXBitmap = function() {
      this.bitmap = this._axCntr.bitmap();
    };
    _._createAnimaXParts = function() {
      if (this._animaXParts != null) {
        this._destroyAnimaXParts();
      }
      // * Все части которые добавленны
      this.__tAnimxParts = [];
      // * Части над персонажем (стандарт)
      this._animaXParts = new Sprite();
      this._animaXParts.anchor.x = 0.5;
      this._animaXParts.anchor.y = 1;
      // * Части под персонажем
      this._animaXPartBelow = new Sprite();
      this._animaXPartBelow.anchor.x = 0.5;
      this._animaXPartBelow.anchor.y = 1;
      this._animaXPartBelow.z = 1;
      this._addAllAnimaXParts();
      this.addChild(this._animaXParts);
      this.parent.addChild(this._animaXPartBelow);
      this._character.onAnimXPartsRefreshed();
    };
    _._destroyAnimaXParts = function() {
      var i, len, p, ref;
      this._animaXParts.visible = false;
      this._animaXParts.parent.removeChild(this._animaXParts);
      this._animaXParts = null;
      this._animaXPartBelow.visible = false;
      this._animaXPartBelow.parent.removeChild(this._animaXPartBelow);
      this._animaXPartBelow = null;
      if (this.__tAnimxParts != null) {
        ref = this.__tAnimxParts;
        for (i = 0, len = ref.length; i < len; i++) {
          p = ref[i];
          p.parent.removeChild(p);
          p.visible = false;
        }
        this.__tAnimxParts = null;
      }
      this.__lBushDepth = null;
    };
    _._addAllAnimaXParts = function() {
      var animaXPart, i, id, len, part, partData, parts, unsortedParts;
      parts = this._character.animaXParts;
      // * Преобразование в массив
      unsortedParts = [];
      for (id in parts) {
        partData = parts[id];
        unsortedParts.push(partData);
      }
      // * Сортировка
      unsortedParts.sort(function(a, b) {
        if (a.level > b.level) {
          return 1;
        }
        if (a.level === b.level) {
          return 0;
        }
        return -1;
      });
      for (i = 0, len = unsortedParts.length; i < len; i++) {
        part = unsortedParts[i];
        animaXPart = new Sprite_AnimaXPart(part, this._axCntr.rootAnimation);
        this.__tAnimxParts.push(animaXPart);
        this._addPartOnSpriteByDirection(animaXPart, this._axCntr.cDir);
      }
    };
    // * Добаить часть (слой) на персонажа с учётом "уровня" слоя (за или перед)
    _._addPartOnSpriteByDirection = function(part, dir) {
      var level;
      level = part.animPart.isBelowCharacter(dir);
      if (level === true) {
        this._animaXParts.removeChild(part);
        this._animaXPartBelow.addChild(part);
      } else {
        this._animaXPartBelow.removeChild(part);
        this._animaXParts.addChild(part);
      }
    };
  })();
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------
// -----------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Анимация (одна единица анимации, последовательность кадров)

//* STORABLE - значит класс сохраняется в сохранение (т.е. создаётся на игровом объекте)
//@[STORABLE]
var XAnima;

XAnima = class XAnima {
  constructor(framesCount, fileName, isSpritesheet = false) {
    this.framesCount = framesCount;
    this.fileName = fileName;
    this.isSpritesheet = isSpritesheet;
    this.frames = [];
    this._parseFrames();
  }

  // * Хранит только названия картинок кадров
  _parseFrames() {
    var i, j, ref, results;
    if (this.isSpritesheet === true) {
      return this.frames[0] = this.fileName;
    } else {
      results = [];
      for (i = j = 0, ref = this.framesCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        results.push(this.frames.push(this.fileName + "_" + i));
      }
      return results;
    }
  }

  // * Умножить первый кадр times раз
  expandFirstFrame(times) {
    var i, j, ref, results;
    if (this.isSpritesheet) {
      return;
    }
    this.framesCount += times;
    results = [];
    for (i = j = 0, ref = times; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      results.push(this.frames.splice(1, 0, this.frames[0]));
    }
    return results;
  }

  preLoad() {
    var f, j, len, ref;
    ref = this.frames;
    for (j = 0, len = ref.length; j < len; j++) {
      f = ref[j];
      ImageManager.loadAnimaX(f);
    }
  }

  getFrame(index) {
    if (this.isSpritesheet) {
      return ImageManager.loadAnimaX(this.frames[0]);
    } else {
      return ImageManager.loadAnimaX(this.frames[index]);
    }
  }

};


// Generated by CoffeeScript 2.6.1
// * Дополнительный слой анимации

//@[STORABLE]
var XAnimaPart;

XAnimaPart = class XAnimaPart {
  constructor(filename, isLowerBodyPart, level) {
    this.filename = filename;
    this.isLowerBodyPart = isLowerBodyPart;
    this.level = level;
    this.animations = [];
    this.rules = {};
    this.disabledActions = [];
    if (this.isLowerBodyPart == null) {
      this.isLowerBodyPart = false;
    }
    if (this.level == null) {
      this.level = 0;
    }
    // D, L, R, U, DL, DR, UL, UR, noDir
    this.directionsLevels = [false, false, false, false, false, false, false, false, false];
    this._isDisabled = false;
    // * Дополнительное смещение части
    this.dx = 0;
    this.dy = 0;
    this.isSpritesheet = false;
    this.setDefaultRule(true, true);
    return;
  }

  isDisabled() {
    return this._isDisabled === true;
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  // * Тут задаётся стандартное правило
  setDefaultRule(haveDirs, haveFrames, isSpritesheet) {
    return this.rules['Basic'] = [haveDirs, haveFrames, isSpritesheet];
  }

  setRuleForMovement(haveDirs, haveFrames, isSpritesheet) {
    return this.rules['Move'] = [haveDirs, haveFrames, isSpritesheet];
  }

  setRuleForIdle(haveDirs, haveFrames, isSpritesheet) {
    return this.rules['Idle'] = [haveDirs, haveFrames, isSpritesheet];
  }

  setRuleForDashing(haveDirs, haveFrames, isSpritesheet) {
    return this.rules['Dashing'] = [haveDirs, haveFrames, isSpritesheet];
  }

  setRuleForAction(actionName, haveDirs, haveFrames, isSpritesheet, fileName) {
    return this.rules[actionName] = [haveDirs, haveFrames, isSpritesheet, fileName];
  }

  disableForAction(actionName) {
    return this.disabledActions.push(actionName);
  }

  applyRootAnimation(xAnimaSet) {
    var cFileName, frames, isNoDir, isSpritesheet, rule, setName;
    setName = xAnimaSet.getActionName();
    if (this.disabledActions.contains(setName)) {
      this._isDisabled = true;
      return;
    } else {
      this._isDisabled = false;
    }
    rule = this.rules[setName];
    if (rule == null) {
      rule = this.rules['Basic'];
      cFileName = this.filename + setName;
    } else {
      if (String.any(rule[3])) {
        cFileName = this.filename + rule[3];
      } else {
        cFileName = this.filename + setName;
      }
    }
    frames = xAnimaSet.frames;
    if (!rule[1]) {
      frames = 1;
    }
    isNoDir = !rule[0];
    if (String.any(rule[2])) {
      isSpritesheet = rule[2];
    } else {
      isSpritesheet = false;
    }
    this._setupAnimations(frames, cFileName, isNoDir, xAnimaSet.is8Way, frames === 1, isSpritesheet);
  }

  _setupAnimations(frames, cFileName, isNoDir, is8way, isNoFrames, isSpritesheet) {
    this.isOneFrame = isNoFrames;
    this.isNoDirections = isNoDir;
    this.is8Way = is8way;
    this.isSpritesheet = isSpritesheet;
    this._originalFramesCount = frames;
    if (this.isNoDirections === true || this.isSpritesheet === true) {
      this.animations[0] = new XAnima(frames, cFileName, this.isSpritesheet);
    } else {
      this.animations[0] = new XAnima(frames, cFileName + "_D", this.isSpritesheet);
      this.animations[1] = new XAnima(frames, cFileName + "_L", this.isSpritesheet);
      this.animations[2] = new XAnima(frames, cFileName + "_R", this.isSpritesheet);
      this.animations[3] = new XAnima(frames, cFileName + "_U", this.isSpritesheet);
      if (is8way === true) {
        this.animations[4] = new XAnima(frames, cFileName + "_DL", this.isSpritesheet);
        this.animations[5] = new XAnima(frames, cFileName + "_DR", this.isSpritesheet);
        this.animations[6] = new XAnima(frames, cFileName + "_UL", this.isSpritesheet);
        this.animations[7] = new XAnima(frames, cFileName + "_UR", this.isSpritesheet);
      }
    }

    this.preLoad();
    if (this.isSpritesheet) {
      this._loadSheetSizes(cFileName);
    }
  }

  preLoad() {
    var anim, i, len, ref, results;
    ref = this.animations;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      results.push(anim.preLoad());
    }
    return results;
  }

  _loadSheetSizes(cFileName1) {
    var e, image;
    this.cFileName = cFileName1;
    try {
      image = ImageManager.loadAnimaX(this.cFileName);
      if (image.isReady() || image.width > 0) {
        this._loadSheetSizesBody();
      } else {
        image.addLoadListener(this._loadSheetSizesBody.bind(this));
      }
      return this._loadSheetSizesBody();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _loadSheetSizesBody() {
    var e, image, vertSize;
    try {
      image = ImageManager.loadAnimaX(this.cFileName);
      this.sheetFrameWidth = image.width / this._originalFramesCount;
      if (this.isNoDirections === true) {
        vertSize = 1;
      } else {
        if (this.is8WayAnimation()) {
          vertSize = 8;
        } else {
          vertSize = 4;
        }
      }
      return this.sheetFrameHeight = image.height / vertSize;
    } catch (error) {
      //console.log(@sheetFrameWidth + " - " + @sheetFrameHeight)
      e = error;
      return KDCore.warning(e);
    }
  }

  getPartBitmap(dir, frame) {
    if (this.isOneFrame === true) {
      frame = 0;
    }
    return this.getAnimationByDirection(dir).getFrame(frame);
  }

  // * Часть (слой) должна быть под персонажем?
  isBelowCharacter(dir) {
    if (this.isNoDirections === true) {
      // * Отдельная настройка 8 позиция
      return this.directionsLevels[8];
    } else {
      switch (dir) {
        case 8:
          return this.directionsLevels[3];
        case 2:
          return this.directionsLevels[0];
        case 4:
          return this.directionsLevels[1];
        case 6:
          return this.directionsLevels[2];
        case 1: // * DL
          if (this.is8WayAnimation()) {
            return this.animations[4];
          } else {
            return this.animations[1];
          }
          break;
        case 3: // * DR
          if (this.is8WayAnimation()) {
            return this.animations[5];
          } else {
            return this.animations[2];
          }
          break;
        case 7: // * UL
          if (this.is8WayAnimation()) {
            return this.animations[6];
          } else {
            return this.animations[1];
          }
          break;
        case 9: // * UR
          if (this.is8WayAnimation()) {
            return this.animations[7];
          } else {
            return this.animations[2];
          }
      }
      return this.directionsLevels[8];
    }
  }

  getAnimationByDirection(cDir) {
    if (this.isNoDirections === true || this.isSpritesheet === true) {
      return this.animations[0];
    }
    return this.animations[this._covertCharDirecitonToDirectionIndex(cDir)];
  }

  _covertCharDirecitonToDirectionIndex(cDir) {
    return XAnimaTools.covertCharDirecitonToDirectionIndex(cDir, this.is8WayAnimation());
  }

  getSheetFrame(cDir, frameIndex) {
    var dir, e, x, y;
    try {
      dir = this._covertCharDirecitonToDirectionIndex(cDir);
      if (this.isNoDirections === true) {
        y = 0;
      } else {
        y = dir * this.sheetFrameHeight;
      }
      if (this.isOneFrame === true) {
        x = 0;
      } else {
        x = frameIndex * this.sheetFrameWidth;
      }
      return [x, y, this.sheetFrameWidth, this.sheetFrameHeight];
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [0, 0, 48, 48];
  }

};


// Generated by CoffeeScript 2.6.1
// * Набор анимаций для всех направлений

//DIRECTIONS:
// 2 - DOWN
// 8 - UP
// 4 - LEFT
// 6 - RIGHT

//TYPE:
// 0 - movement
// 1 - idle
// 2 - action

//@[STORABLE]
var XAnimaSet;

XAnimaSet = class XAnimaSet {
  constructor(type, filename, frames, speed, isNoDirections, is8Way = false, isSpritesheet = false) {
    this.type = type;
    this.filename = filename;
    this.frames = frames;
    this.speed = speed;
    this.isNoDirections = isNoDirections;
    this.is8Way = is8Way;
    this.isSpritesheet = isSpritesheet;
    this._setupAnimations();
    this.isLoop = false;
    this.actionName = "Action";
    this.moveToIdleDelay = 30;
    this.waitActionEnd = true;
    this._extraFirstFrames = 0;
    this._originalFramesCount = this.frames;
    if (this.isSpritesheet) {
      this._loadSheetSizes();
    }
    return;
  }

  _setupAnimations() {
    this.animations = [];
    if (this.isNoDirections === true || this.isSpritesheet === true) {
      this.animations[0] = new XAnima(this.frames, this.filename, this.isSpritesheet);
    } else {
      this.animations[0] = new XAnima(this.frames, this.filename + "_D", this.isSpritesheet);
      this.animations[1] = new XAnima(this.frames, this.filename + "_L", this.isSpritesheet);
      this.animations[2] = new XAnima(this.frames, this.filename + "_R", this.isSpritesheet);
      this.animations[3] = new XAnima(this.frames, this.filename + "_U", this.isSpritesheet);
      if (this.is8WayAnimation()) {
        this.animations[4] = new XAnima(this.frames, this.filename + "_DL", this.isSpritesheet);
        this.animations[5] = new XAnima(this.frames, this.filename + "_DR", this.isSpritesheet);
        this.animations[6] = new XAnima(this.frames, this.filename + "_UL", this.isSpritesheet);
        this.animations[7] = new XAnima(this.frames, this.filename + "_UR", this.isSpritesheet);
      }
      return;
    }
    this.preLoad();
    this._loadSheetSizesBody();
  }

  _loadSheetSizes() {
    var e, image;
    try {
      image = ImageManager.loadAnimaX(this.filename);
      if (image.isReady() || image.width > 0) {
        this._loadSheetSizesBody();
      } else {
        image.addLoadListener(this._loadSheetSizesBody.bind(this));
      }
      return this._loadSheetSizesBody();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _loadSheetSizesBody() {
    var e, image, vertSize;
    try {
      image = ImageManager.loadAnimaX(this.filename);
      this.sheetFrameWidth = image.width / this._originalFramesCount;
      if (this.isNoDirections === true) {
        vertSize = 1;
      } else {
        if (this.is8WayAnimation()) {
          vertSize = 8;
        } else {
          vertSize = 4;
        }
      }
      return this.sheetFrameHeight = image.height / vertSize;
    } catch (error) {
      //console.log(@sheetFrameWidth + " - " + @sheetFrameHeight)
      e = error;
      return KDCore.warning(e);
    }
  }

  setActionName(actionName) {
    this.actionName = actionName;
  }

  // * Имя действия используется частями, чтобы определять правила и анимации нужные
  getActionName() {
    switch (this.type) {
      case 0:
        return "Move";
      case 1:
        return "Idle";
      case 3:
        return "Dashing";
      default:
        return this.actionName;
    }
  }

  preLoad() {
    var anim, i, len, ref;
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.preLoad();
    }
  }

  isNoFrames() {
    return this.frames === 1;
  }

  isWait() {
    return this.waitActionEnd === true;
  }

  expandFirstFrameTimes(times) {
    var anim, i, len, ref;
    if (this.isSpritesheet) {
      this._extraFirstFrames = times;
    }
    ref = this.animations;
    for (i = 0, len = ref.length; i < len; i++) {
      anim = ref[i];
      anim.expandFirstFrame(times);
    }
    this.frames += times;
  }

  getSheetFrame(cDir, frameIndex) {
    var dir, e, x, y;
    try {
      dir = this._covertCharDirecitonToDirectionIndex(cDir);
      if (this.isNoDirections === true) {
        y = 0;
      } else {
        y = dir * this.sheetFrameHeight;
      }
      if (this._extraFirstFrames > 0) {
        if (frameIndex < this._extraFirstFrames) {
          frameIndex = 0;
        } else {
          frameIndex = frameIndex - this._extraFirstFrames;
        }
      }
      x = frameIndex * this.sheetFrameWidth;
      return [x, y, this.sheetFrameWidth, this.sheetFrameHeight];
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [0, 0, 48, 48];
  }

  _covertCharDirecitonToDirectionIndex(cDir) {
    return XAnimaTools.covertCharDirecitonToDirectionIndex(cDir, this.is8WayAnimation());
  }

  //? Оптимизация заменой метода?
  getAnimationByDirection(cDir) {
    if (this.isNoDirections === true || this.isSpritesheet === true) {
      return this.animations[0];
    }
    return this.animations[this._covertCharDirecitonToDirectionIndex(cDir)];
  }

  is8WayAnimation() {
    return this.is8Way === true;
  }

  isMovement() {
    return this.type === 0;
  }

  isDashing() {
    return this.type === 3;
  }

  isAction() {
    return this.type === 2;
  }

  isIdle() {
    return this.type === 1;
  }

};


// Generated by CoffeeScript 2.6.1
// * Контроллер анимации (смена кадров, направлений)
// * rootAnimation - это XAnimaSet
// * Контроллер хранится в Sprite_Character
var XAnimaSetController;

XAnimaSetController = class XAnimaSetController {
  constructor(startDirection, rootAnimation) {
    this.rootAnimation = rootAnimation;
    this.cFrame = 0;
    this.cDir = startDirection;
    this._timer = 0;
    this._sKoef = 0;
    this._requireRefresh = true;
    this._animPlaying = false;
    this._initialFrame = false;
    this._frameRect = [0, 0, 48, 48];
    return;
  }

  isPlaying() {
    return this._animPlaying === true;
  }

  // * Класс каждый раз получает character, не хранит
  update(character) {
    this._requireRefresh = false;
    this._updateDirection(character);
    return this._updateFrames(character);
  }

  updateSheetFrame(spr) {
    var e, frameRect;
    try {
      if (!this.rootAnimation.isSpritesheet) {
        return;
      }
      frameRect = this.rootAnimation.getSheetFrame(this.cDir, this.cFrame);
      spr.setFrame(...frameRect);
      return spr.setFrame(...frameRect);
    } catch (error) {
      //if @cFrame > 0
      //    console.log("FRAME FOR: " + @cDir + "_" + @cFrame)
      //    console.log(frameRect)
      e = error;
      return KDCore.warning(e);
    }
  }

  _updateDirection(character) {
    var cDir;
    if (this.rootAnimation.is8WayAnimation()) {
      cDir = character._diagonalDir;
      if (cDir == null) {
        //console.warn('You try start 8 way diagonal animation, but game not support 8 way movement')
        cDir = character.direction();
      }
      if (cDir === false) {
        cDir = character.direction();
      }
    } else {
      //console.log(cDir)
      cDir = character.direction();
    }
    if (cDir !== this.cDir) {
      this.requestRefresh();
    }
    this.cDir = cDir;
  }

  _updateFrames(character) {
    // * Используется один и тотже алгоритм смены кадров для Dashing и Movement
    if (this.rootAnimation.isMovement() || this.rootAnimation.isDashing()) {
      if (!this.rootAnimation.isNoFrames()) { // * IDLE AND ACTION SAME WAY
        return this._updateMovement(character);
      }
    } else {
      return this._updateAction(character);
    }
  }

  _updateMovement(c) {
    if (c.isMoving()) {
      this._sKoef = c.realMoveSpeed();
      this._setInitialFrame(1);
      this._animPlaying = true;
      // * Если Dashing, то таймер обычный
      if (c.isInDashingAnimaX()) {
        this._updateTimer(false); // * Если нет Dashing анимации, то немного ускоряем таймер
      } else {
        this._updateTimer(c.isDashing());
      }
      if (this._timer === 0) {
        return this._nextMovementFrame();
      }
    } else {
      this._sKoef = 0;
      this._updateTimer(false);
      if (this._timer === 0) {
        if (this.cFrame !== 0) {
          this.requestRefresh();
        }
        return this.resetAnimation();
      }
    }
  }

  _setInitialFrame(frameIndex) {
    if (this._initialFrame === true) { // * Установка начального кадра
      return;
    }
    this.cFrame = frameIndex;
    this._initialFrame = true;
    this._timer = 0;
    return this.requestRefresh();
  }

  _updateTimer(isFast) {
    this._timer += 1;
    if (isFast) {
      this._timer += 0.5;
    }
    if (this._timer >= this._speed()) {
      return this._timer = 0;
    }
  }

  _speed() {
    return this.rootAnimation.speed - this._sKoef;
  }

  _nextMovementFrame() {
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 1; // * Не 0, 0 - когда стоит
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        // * Если не готов кадр, то назад на 1 кадр (остаёмся на месте)
        this.cFrame--;
      }
      return;
    }
    return this.requestRefresh();
  }

  _isNextFrameBitmapIsReady() {
    var b;
    b = this.bitmap();
    if (!b.isReady() || b.width <= 0) {
      return false;
    } else {
      return true;
    }
  }

  _updateAction(c) {
    if (this._initialFrame === false) {
      this._setInitialFrame(0);
      c.onAnimaXActionStart();
    }
    this._updateTimer(false);
    if (this._timer === 0) {
      return this._nextActionFrame(c);
    }
  }

  _nextActionFrame(c) {
    this._animPlaying = true;
    this.cFrame++;
    if (this.cFrame === this.rootAnimation.frames) {
      this.cFrame = 0;
      if (!this.rootAnimation.isLoop) {
        this.resetAnimation();
        c.resetXAnima();
      }
    }
    if (!this._isNextFrameBitmapIsReady()) {
      if (this.cFrame > 0) {
        this.cFrame--;
      }
    }
    return this.requestRefresh();
  }

  resetAnimation() {
    this._timer = 0;
    this.cFrame = 0;
    this._animPlaying = false;
    return this._initialFrame = false;
  }

  // * Если спрайт должен отрисовать новый кадр, то запрашиваем refresh
  requestRefresh() {
    return this._requireRefresh = true;
  }

  bitmap() {
    return this.rootAnimation.getAnimationByDirection(this.cDir).getFrame(this.cFrame);
  }

  isChanged() {
    return this._requireRefresh;
  }

};


// Generated by CoffeeScript 2.6.1
// * Менеджер для работы с БД анимаций
var XAnimaTools;

XAnimaTools = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ XAnimaTools.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = XAnimaTools;
  _.animationsDB = function() {
    return PKD_ANIMAX.Animations;
  };
  _.animationPartsDB = function() {
    return PKD_ANIMAX.AnimationParts;
  };
  _.covertCharDirecitonToDirectionIndex = function(cDir, is8WaySupported) {
    var e;
    try {
      switch (cDir) {
        case 8:
          return 3;
        case 2:
          return 0;
        case 4:
          return 1;
        case 6:
          return 2;
        case 1: // * DL
          if (is8WaySupported) {
            return 4;
          } else {
            return 1;
          }
          break;
        case 3: // * DR
          if (is8WaySupported) {
            return 5;
          } else {
            return 2;
          }
          break;
        case 7: // * UL
          if (is8WaySupported) {
            return 6;
          } else {
            return 1;
          }
          break;
        case 9: // * UR
          if (is8WaySupported) {
            return 7;
          } else {
            return 2;
          }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  // * Список всех действий анимации
  _.getXAnimaActionList = function(id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return [];
    }
    return data.actions;
  };
  // * Анимация по имени (ID)
  _.getXAnimaSetById = function(id) {
    var data;
    data = this.animationsDB();
    return data != null ? data.find(function(d) {
      return d.id === id;
    }) : void 0;
  };
  // * Настройки анимации для состояния
  _.getXAnimaParamsForState = function(state, id) {
    var data;
    data = this.getXAnimaSetById(id);
    if (data == null) {
      return null;
    }
    return data[state];
  };
  // * Настройки анимации для действия
  _.getXAnimaParamsForAction = function(actionName, setId) {
    var data;
    data = this.getXAnimaActionList(setId);
    return data != null ? data.find(function(a) {
      return a.name === actionName;
    }) : void 0;
  };
  // * Часть анимации (слой) по имени
  _.getXAnimaPartById = function(id) {
    var data;
    data = this.animationPartsDB();
    return data != null ? data.find(function(a) {
      return a.id === id;
    }) : void 0;
  };
  
  // * Конвертировать массив Actions из параметров плагина в более компактный вид
  _.convertActionsFromParameters = function(actions) {
    var action, i, item, len, shrinked;
    shrinked = [];
    for (i = 0, len = actions.length; i < len; i++) {
      action = actions[i];
      item = action.animation;
      item.name = action.name;
      if (action.Behaviour != null) {
        item.behav = {};
        item.behav.seOnStart = action.seOnStart;
        item.behav.seDelay = action.seDelay;
        item.behav.seOnEnd = action.seOnEnd;
        item.behav.scOnStart = action.scOnStart;
        item.behav.scDelay = action.scDelay;
        item.behav.scOnEnd = action.scOnEnd;
      } else {
        item.behav = null;
      }
      shrinked.push(item);
    }
    return shrinked;
  };
  _.createXAnimaSetForAction = function(id, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 2, null, params);
      if ((animaSet != null) && (params.behav != null)) {
        animaSet.behav = params.behav;
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForMove = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 0, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIdle = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 1, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForDashing = function(id, state, params) {
    var animaSet, e;
    try {
      animaSet = this._createXAnimaSetFromParams(id, 3, state, params);
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createXAnimaSetForIndependentAction = function() {
    var animaSet, e;
    try {
      animaSet = new XAnimaSet(0, "", 0, 0, true, false, true);
      return animaSet;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _._createXAnimaSetFromParams = function(id, type, state, params) {
    var animaSet, e, filename, frames, is8Way, isOneDirection, isSpritesheet, speed;
    try {
      ({frames, speed, isOneDirection, is8Way, isSpritesheet} = params);
      if (type === 2) { // * Action
        filename = this.createFilenameForAnimaAction(id, params.name);
      } else {
        filename = this.createFilenameForAnimaState(id, state, type);
      }
      animaSet = new XAnimaSet(type, filename, frames, speed, isOneDirection, is8Way, isSpritesheet);
      animaSet.dx = params.dx || 0;
      animaSet.dy = params.dy || 0;
      if (params.expandFirstFrame > 0) {
        animaSet.expandFirstFrameTimes(params.expandFirstFrame);
      }
      if (type === 2) {
        // * Задать имя действия
        animaSet.setActionName(params.name);
      }
      return animaSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  _.createFilenameForAnimaState = function(id, state, type) {
    var path;
    path = id + "/";
    if (state !== 'base') {
      path += state + "/";
    }
    if (type === 0) {
      path += "Move";
    } else if (type === 1) {
      path += "Idle";
    } else if (type === 3) {
      path += "Dashing";
    }
    return path;
  };
  _.createFilenameForAnimaAction = function(id, name) {
    var path;
    path = id + "/Actions/" + name;
    return path;
  };
  _.createFilenameForAnimaPart = function(id, name, isRelative) {
    var path;
    if (isRelative) {
      path = id + "/Layers/" + name + "/";
    } else {
      path = "CommonLayers/" + name + "/";
    }
    return path;
  };
  _.createXAnimaPart = function(id, partName, isRelative = false) {
    var animaPartSet, e, params;
    try {
      params = this.getXAnimaPartById(partName);
      if (params == null) {
        return null;
      }
      animaPartSet = this._createXAnimaPartFromParams(id, partName, params, isRelative);
      return animaPartSet;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * isRelative - относительно ID анимации, например Harold\Parts\hat
  // * Если isRealtive = false, то будет Parts\hat
  _._createXAnimaPartFromParams = function(axId, partName, params, isRelative = false) {
    var actionRules, animaPart, baseRule, dashRule, e, filename, i, idleRule, isLowerBodyPart, layerRule, len, moveRule, rule, sortingLevel;
    try {
      ({isLowerBodyPart, sortingLevel, baseRule, moveRule, idleRule, dashRule, actionRules, layerRule} = params);
      filename = this.createFilenameForAnimaPart(axId, partName, isRelative);
      animaPart = new XAnimaPart(filename, isLowerBodyPart, sortingLevel);
      animaPart.directionsLevels = this._convertLayerRuleToDirectionLevels(layerRule);
      if (baseRule != null) {
        animaPart.setDefaultRule(baseRule.isHaveDirections, baseRule.isHaveFrames, baseRule.isSpritesheet);
      }
      if (moveRule != null) {
        animaPart.setRuleForMovement(moveRule.isHaveDirections, moveRule.isHaveFrames, moveRule.isSpritesheet);
      }
      if (idleRule != null) {
        animaPart.setRuleForIdle(idleRule.isHaveDirections, idleRule.isHaveFrames, idleRule.isSpritesheet);
      }
      if (dashRule != null) {
        animaPart.setRuleForDashing(dashRule.isHaveDirections, dashRule.isHaveFrames, dashRule.isSpritesheet);
      }
      animaPart.dx = params.dx || 0;
      animaPart.dy = params.dy || 0;
      try {
        for (i = 0, len = actionRules.length; i < len; i++) {
          rule = actionRules[i];
          if (rule == null) {
            continue;
          }
          if (rule.enabled === false) {
            animaPart.disableForAction(rule.actionName);
          } else {
            animaPart.setRuleForAction(rule.actionName, rule.actionRule.isHaveDirections, rule.actionRule.isHaveFrames, rule.actionRule.isSpritesheet, rule.fileName);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return animaPart;
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  // * Преобразовать структуру LAnimaXPartDirLevel в массив directionsLevels для слоя
  _._convertLayerRuleToDirectionLevels = function(layerRule) {
    return [layerRule.dirD, layerRule.dirL, layerRule.dirR, layerRule.dirU, layerRule.dirDL, layerRule.dirDR, layerRule.dirUL, layerRule.dirUR, layerRule.noDir];
  };
})();

// ■ END XAnimaTools.coffee
//---------------------------------------------------------------------------

//Plugin PKD_AnimaX builded by PKD PluginBuilder 2.2 - 09.10.2023