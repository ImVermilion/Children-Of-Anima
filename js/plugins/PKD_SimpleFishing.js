/*
 * Copyright (c) 2024 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial
 */


/*:
 * @plugindesc (v.1.2)[PRO] Simple Fishing
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/simple-fishing
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * GUIDE:
 * https://gist.github.com/KageDesu/388693e5ec2d0e2716c08fabaf10fb8c
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
 * @param PKD_SimpleFishing
 * @text Simple Fishing Settings
 * 
 * 

 * 
 *  @param gameEventsData:s
 *  @text Game Events
 *          @type struct<EventsData> 
 *  @desc Game process events handlers
 *          @default {}
 * 
 * 
 * 

 * 
 * 
 * @param variablesData:s
 * @text Variables (Rod and bait)
 * @type struct<Variables> 
 * @desc Player variables
 * @default {"baitVariableId:i":"0","rodVariableId:i":"0"}
 * 
 * 

 * 
 * 
 * @param rodsData:structA
 * @text Rods
 * @type struct<RodSettings>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"rod1\",\"progressBarTimerMod:i\":\"1.0\",\"redBarShrinkSpeed:i\":\"10\",\"gameZoneFillSpeed:i\":\"1\",\"redBarMinWidth:i\":\"60\",\"redBarMaxWidth:i\":\"120\",\"whiteCursorMoveSpeed:i\":\"3\",\"badClickProgressPenalty:i\":\"20\",\"goodClickProgressAdd:i\":\"0\"}"]
 * 
 * 

 * 
 * 
 * @param baitsData:structA
 * @text Baits
 * @type struct<BaitData>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"worm\"}"]
 * 
 * 

 * 
 * 
 * @param regionsData:structA
 * @text Fishing Regions
 * @type struct<RegionData>[]
 * @default []
 * 
 * 

 * 
 * 
 * @param showFishCaughtMessage:b
 * @text Show Fish Caught Message
 * @type boolean
 * @default true
 * 
 * 

 * 
 * 
 * @param autoRestart:b
 * @text Auto Restart
 * @type boolean
 * @default false
 * @desc Auto restart fishing mini game after game over (catch or loose fish)
 * 
 * 

 * 
 * 
 * @param ignoreParametersCheck:b
 * @text Ignore Parameters Check
 * @type boolean
 * @default false
 * @desc Ignore parameters check on plugin load
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*:ru
 * @plugindesc (v.1.2)[PRO] Simple Fishing
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/simple-fishing
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * РУКОВОДСТВО:
 * https://gist.github.com/KageDesu/388693e5ec2d0e2716c08fabaf10fb8c
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
 * @param PKD_SimpleFishing
 * @text Simple Fishing Settings
 * 
 * 

 * 
 *  @param gameEventsData:s
 *      @text Игровые события
 *      @type struct<EventsData> 
 *      @desc Обработчики игровых событий
 *      @default {}
 * 
 * 
 * 

 * 
 * 
 * @param variablesData:s
 * @text Переменные (Удочка)
 * @type struct<Variables> 
 * @desc Переменные игрока
 * @default {"baitVariableId:i":"0","rodVariableId:i":"0"}
 * 
 * 

 * 
 * 
 * @param rodsData:structA
 * @text Удочки
 * @type struct<RodSettings>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"rod1\",\"progressBarTimerMod:i\":\"1.0\",\"redBarShrinkSpeed:i\":\"10\",\"gameZoneFillSpeed:i\":\"1\",\"redBarMinWidth:i\":\"60\",\"redBarMaxWidth:i\":\"120\",\"whiteCursorMoveSpeed:i\":\"3\",\"badClickProgressPenalty:i\":\"20\",\"goodClickProgressAdd:i\":\"0\"}"]
 * 
 * 

 * 
 * 
 * @param baitsData:structA
 * @text Приманки
 * @type struct<BaitData>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"worm\"}"]
 * 
 * 

 * 
 * 
 * @param regionsData:structA
 * @text Рыболовные регионы
 * @type struct<RegionData>[]
 * @default []
 * 
 * 

 * 
 * 
 * @param showFishCaughtMessage:b
 * @text Показывать сообщение о пойманной рыбе
 * @type boolean
 * @default true
 * 
 * 

 * 
 * 
 * @param autoRestart:b
 * @text Автоматический рестарт
 * @type boolean
 * @default false
 * @desc Автоматический рестарт мини-игры после окончания (поймана или потеряна рыба)
 * 
 * 

 * 
 * 
 * @param ignoreParametersCheck:b
 * @text Игнорировать проверку параметров
 * @type boolean
 * @default false
 * @desc Игнорировать проверку параметров при загрузке плагина
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*:zh-cn
 * @plugindesc (v.1.2)[PRO] Simple Fishing
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/simple-fishing
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 
 *
 * 指南:
 * https://gist.github.com/KageDesu/388693e5ec2d0e2716c08fabaf10fb8c
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
 * @param PKD_SimpleFishing
 * @text Simple Fishing Settings
 * 
 * 

 * 
 *  @param gameEventsData:s
 *          @text 游戏事件
 *  @type struct<EventsData> 
 *          @desc 游戏过程事件处理程序
 *  @default {}
 * 
 * 
 * 

 * 
 * 
 * @param variablesData:s
 * @text 变量 (钓竿 和 鱼饵)
 * @type struct<Variables> 
 * @desc 玩家变量
 * @default {"baitVariableId:i":"0","rodVariableId:i":"0"}
 * 
 * 

 * 
 * 
 * @param rodsData:structA
 * @text 钓竿
 * @type struct<RodSettings>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"rod1\",\"progressBarTimerMod:i\":\"1.0\",\"redBarShrinkSpeed:i\":\"10\",\"gameZoneFillSpeed:i\":\"1\",\"redBarMinWidth:i\":\"60\",\"redBarMaxWidth:i\":\"120\",\"whiteCursorMoveSpeed:i\":\"3\",\"badClickProgressPenalty:i\":\"20\",\"goodClickProgressAdd:i\":\"0\"}"]
 * 
 * 

 * 
 * 
 * @param baitsData:structA
 * @text 鱼饵
 * @type struct<BaitData>[]
 * @default ["{\"id:i\":\"1\",\"iconName:str\":\"worm\"}"]
 * 
 * 

 * 
 * 
 * @param regionsData:structA
 * @text 钓鱼区域
 * @type struct<RegionData>[]
 * @default []
 * 
 * 

 * 
 * 
 * @param showFishCaughtMessage:b
 * @text 显示捕获的鱼消息
 * @type boolean
 * @default true
 * 
 * 

 * 
 * 
 * @param autoRestart:b
 * @text 自动重新启动
 * @type boolean
 * @default false
 * @desc 在游戏结束后自动重新启动钓鱼小游戏（捕获或失去鱼）
 * 
 * 

 * 
 * 
 * @param ignoreParametersCheck:b
 * @text 忽略参数检查
 * @type boolean
 * @default false
 * @desc 在加载插件时忽略参数检查
 * 
 * 

 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================`;
 * 

 */
/*~struct~EventsData:

 @param onGameInitedCommonEventId:i
 @text On Inited
   @type common_event
 @desc Called after fishing interface appeared, but before game started
   @default 1 




 @param onGameStartedCommonEventId:i
 @text On Started
         @type common_event
 @desc Called after fishing game is started
         @default 2 




 @param onGameEndCommonEventId:i
 @text On End
         @type common_event
 @desc Called after fishing game is ended
         @default 3 




 @param onPlayerClickGood:i
 @text On Click Good
      @type common_event
 @desc Called when player made click in game zone
         @default 4 




 @param onPlayerCatchFish:i
 @text On Catch Fish
             @type common_event
 @desc Called when fish progress bar is filled 100%
         @default 5 




 @param onPlayerClickBad:i
 @text On Click Bad
             @type common_event
 @desc Called when player made click outer game zone (wrong)
         @default 6 




 @param onPlayerLoseFish:i
 @text On Lost Fish
             @type common_event
 @desc Callend when player lost fish (progress bar is below 0%)
         @default 7 




 @param onNoAnyFishInRegion:i
 @text On No Fish
             @type common_event
 @desc Called when no any fish in region
         @default 8

*/


/*~struct~Variables:

    @param baitVariableId:i
    @text Bait Variable
            @type variable
    @default 1
    @desc Required! Variable where you set current player's bait ID
        



    @param rodVariableId:i
    @text Rod Variable
            @type variable
    @default 2
    @desc Required! Variable where you set current player's rod ID
        
*/

/*~struct~RodSettings:
 @param id:i
 @text Rod ID
      @type number 
 @min 1
 @desc Unique Rod ID, you should set this value to Rod Variable for use this Rod
             @default 1 




 @param iconName:str
 @text Image
             @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
 @desc Rod image on game UI
            



 @param progressBarTimerMod:i
 @text Progress Bar Multiplayer
      @type number 
 @min 0.1
 @decimals 1
 @desc Catching fish progress bar fill speed multiplayer. Total speed will be MULT by this value. 1 - no changes.
             
 @default 1




 @param redBarShrinkSpeed:i
 @text Timer Delay
             @type number 
 @min 1
 @desc Game Zone timer delay before shrink (in frames)
             @default 10




 @param gameZoneFillSpeed:i
 @parent redBarShrinkSpeed:i
 @text Shrink step
             @type number 
 @min 1
 @desc Game Zone shrink step in PX per timer tick
             @default 1 




 @param redBarMinWidth:i
 @parent redBarShrinkSpeed:i
 @text Min Width
             @type number 
 @min 10
 @desc Min width of game zone in PX
             @default 60 




 @param redBarMaxWidth:i
 @parent redBarShrinkSpeed:i
 @text Max Width
             @type number 
 @min 20
 @desc Max width of game zone in PX
             @default 120 




 @param whiteCursorMoveSpeed:i
 @text Cursor Step
             @type number 
 @min 1
 @desc Cursor move step in PX for each frame. More value => faster move speed.
             @default 3 




 @param badClickProgressPenalty:i
 @parent whiteCursorMoveSpeed:i
 @text Penalty %
             @type number 
 @min 0
 @max 99
 @desc Penalty in % (-) to progress bar when player miss click
             @default 20 




 @param goodClickProgressAdd:i
 @parent whiteCursorMoveSpeed:i
 @text Bonus %
             @type number 
 @min 0
 @max 99
 @desc Bonus in % (+) to progress bar when player click in game zone
             @default 0 

*/

/*~struct~BaitData:
 @param id:i
 @text Bait ID
      @type number 
 @min 1
 @desc You should set this value to variable Bait Variable for use this Bait
             @default 1 




 @param iconName:str
 @text Image
             @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
 @desc Bait image on game UI
            */

/*~struct~RegionData:

 @param region:i
 @text Region Number
         @type number 
 @min 1
 @max 255
 @desc The region for which these settings will be used
         @default 1 




 @param fishes:structA
 @text Fishes
         @type struct<FishData>[] 
 @desc Settings of fish that can be caught in this region
         @default []

*/

/*~struct~FishData:

 @param id:i
 @text Fish Item
      @type item 
 @desc Player will receive this item (x1) when caught this fish
            



 @param appearChance:i
 @text Chance %
             @type number 
 @min 0
 @max 100
 @desc Basic chance (without any Baits) for that fish will appear in region.
             @default 20




 @param progressBarFillSpeed:i
 @text Speed
             @type number 
 @min 1
 @max 1000
 @desc Catch fish progress bar fill speed. Less value = more quick filling.
             @default 1 




 @param goodClickProgressAdd:i
 @text Click Bonus
             @type number 
 @min 0
 @max 100
 @desc Bonus in % to progress bar fill when player made right click (in game zone)
             @default 10




 @param baits:structA
 @text Baits
             @type struct<FishPerBait>[]
 @default []




 @param appearSwitchId:int
   @text Switch ID
                  @type switch
   @desc If this switch is ON, fish will appear in region.
                  @default 0




   @param appearConditionScript
   @text Condition Script
                  @desc If this script return true, fish will appear in region.
                  @default


   

*/

/*~struct~FishPerBait:

 @param id:i
 @text Bait ID
      @type number 
 @min 1
 @desc Bait ID (number)
             @default 1




 @param addToChance:i
 @text Chance in %
             @type number 
 @min 0
 @max 100
 @desc The chance that this fish will appear for this bait
             @default 40

*/


/*~struct~EventsData:ru

 @param onGameInitedCommonEventId:i
  @text При инициализации
  @type common_event
  @desc Вызывается после появления интерфейса рыбалки, но до начала игры
  @default 1 




 @param onGameStartedCommonEventId:i
     @text При начале
     @type common_event
     @desc Вызывается после начала игры в рыбалку
     @default 2 




 @param onGameEndCommonEventId:i
     @text При окончании
     @type common_event
     @desc Вызывается после окончания игры в рыбалку
     @default 3 




 @param onPlayerClickGood:i
  @text При правильном клике
     @type common_event
     @desc Вызывается, когда игрок сделал клик в игровой зоне
     @default 4 




 @param onPlayerCatchFish:i
     @text При пойманной рыбе
         @type common_event
     @desc Вызывается, когда полоса прогресса рыбы заполнена на 100%
     @default 5 




 @param onPlayerClickBad:i
     @text При неправильном клике
         @type common_event
     @desc Вызывается, когда игрок сделал клик вне игровой зоны (неправильно)
     @default 6 




 @param onPlayerLoseFish:i
     @text При потере рыбы
         @type common_event
     @desc Вызывается, когда игрок потерял рыбу (полоса прогресса ниже 0%)
     @default 7 




 @param onNoAnyFishInRegion:i
     @text При отсутствии рыбы
         @type common_event
     @desc Вызывается, когда в регионе нет ни одной рыбы
     @default 8

*/


/*~struct~Variables:ru

    @param baitVariableId:i
        @text Переменная наживки
        @type variable
    @default 1
        @desc Обязательно! Переменная, в которой вы устанавливаете текущий ID наживки игрока
    



    @param rodVariableId:i
        @text Переменная удилища
        @type variable
    @default 2
        @desc Обязательно! Переменная, в которой вы устанавливаете текущий ID удочки игрока
    
*/

/*~struct~RodSettings:ru
 @param id:i
  @text ID Удилища
     @type number 
 @min 1
     @desc Уникальный ID удилища, вы должны установить это значение в переменную удилища для использования этого удилища
         @default 1 




 @param iconName:str
     @text Изображение
         @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
     @desc Изображение удилища на игровом интерфейсе
        



 @param progressBarTimerMod:i
  @text Множитель прогресс бара
     @type number 
 @min 0.1
 @decimals 1
     @desc Скорость заполнения полосы прогресса ловли рыбы умножается на это значение. Общая скорость будет умножена на это значение. 1 - без изменений.
         
 @default 1




 @param redBarShrinkSpeed:i
     @text Задержка таймера
         @type number 
 @min 1
     @desc Задержка таймера игровой зоны перед уменьшением (в кадрах)
         @default 10




 @param gameZoneFillSpeed:i
 @parent redBarShrinkSpeed:i
     @text Шаг уменьшения
         @type number 
 @min 1
     @desc Шаг уменьшения игровой зоны в PX за тик таймера
         @default 1 




 @param redBarMinWidth:i
 @parent redBarShrinkSpeed:i
     @text Минимальная ширина
         @type number 
 @min 10
     @desc Минимальная ширина игровой зоны в PX
         @default 60 




 @param redBarMaxWidth:i
 @parent redBarShrinkSpeed:i
     @text Максимальная ширина
         @type number 
 @min 20
     @desc Максимальная ширина игровой зоны в PX
         @default 120 




 @param whiteCursorMoveSpeed:i
     @text Шаг курсора
         @type number 
 @min 1
     @desc Шаг перемещения курсора в PX за каждый кадр. Больше значение => быстрее скорость движения.
         @default 3 




 @param badClickProgressPenalty:i
 @parent whiteCursorMoveSpeed:i
     @text Штраф %
         @type number 
 @min 0
 @max 99
     @desc Штраф в % (-) к полосе прогресса, когда игрок промахивается
         @default 20 




 @param goodClickProgressAdd:i
 @parent whiteCursorMoveSpeed:i
     @text Бонус %
         @type number 
 @min 0
 @max 99
     @desc Бонус в % (+) к полосе прогресса, когда игрок кликает в игровой зоне
         @default 0 

*/

/*~struct~BaitData:ru
 @param id:i
  @text ID приманки
     @type number 
 @min 1
     @desc Вы должны установить это значение в переменную Bait Variable для использования этой приманки
         @default 1 




 @param iconName:str
     @text Изображение
         @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
     @desc Изображение приманки на игровом интерфейсе
        */

/*~struct~RegionData:ru

 @param region:i
     @text Номер региона
     @type number 
 @min 1
 @max 255
     @desc Регион, для которого будут использованы эти настройки
     @default 1 




 @param fishes:structA
     @text Рыбы
     @type struct<FishData>[] 
     @desc Настройки рыб, которых можно поймать в этом регионе
     @default []

*/

/*~struct~FishData:ru

 @param id:i
  @text Предмет рыбы
     @type item 
     @desc Игрок получит этот предмет (x1), когда поймает эту рыбу
        



 @param appearChance:i
     @text Шанс %
         @type number 
 @min 0
 @max 100
     @desc Базовый шанс (без приманок) того, что рыба появится в регионе.
         @default 20




 @param progressBarFillSpeed:i
     @text Скорость
         @type number 
 @min 1
 @max 1000
     @desc Скорость заполнения полосы прогресса рыбы. Меньшее значение = более быстрое заполнение.
         @default 1 




 @param goodClickProgressAdd:i
     @text Бонус за клик
         @type number 
 @min 0
 @max 100
     @desc Бонус в % к заполнению полосы прогресса, когда игрок сделал правильный клик (в игровой зоне)
         @default 10




 @param baits:structA
     @text Приманки
         @type struct<FishPerBait>[]
 @default []




 @param appearSwitchId:int
         @text ID Переключателя
            @type switch
         @desc Если этот переключатель ВКЛ, рыба появится в регионе.
            @default 0




   @param appearConditionScript
         @text Скрипт условия
                  @desc Если этот скрипт вернет true, рыба появится в регионе.
            @default


   

*/

/*~struct~FishPerBait:ru

 @param id:i
  @text ID приманки
     @type number 
 @min 1
     @desc ID приманки (число)
         @default 1




 @param addToChance:i
 @text Шанс в %
    @text Шанс в %
         @type number 
 @min 0
 @max 100
     @desc Шанс, что эта рыба появится для этой приманки
         @default 40

*/


/*~struct~EventsData:zh-ch

 @param onGameInitedCommonEventId:i
   @text 初始化时
 @type common_event
   @desc 在钓鱼游戏界面出现后调用，但游戏尚未开始
 @default 1 




 @param onGameStartedCommonEventId:i
         @text 在开始时
 @type common_event
         @desc 在开始钓鱼游戏后调用
 @default 2 




 @param onGameEndCommonEventId:i
         @text 在结束时
 @type common_event
         @desc 在结束钓鱼游戏后调用
 @default 3 




 @param onPlayerClickGood:i
      @text 在正确点击时
 @type common_event
         @desc 当玩家在游戏区域内点击时调用
 @default 4 




 @param onPlayerCatchFish:i
             @text 在捕获鱼时
 @type common_event
         @desc 当鱼的进度条填满100％时调用
 @default 5 




 @param onPlayerClickBad:i
             @text 在错误点击时
 @type common_event
         @desc 当玩家在游戏区域外点击时调用（错误）
 @default 6 




 @param onPlayerLoseFish:i
             @text 在失去鱼时
 @type common_event
         @desc 当玩家失去鱼时调用（进度条低于0％）
 @default 7 




 @param onNoAnyFishInRegion:i
             @text 在没有鱼时
 @type common_event
         @desc 当区域中没有任何鱼时调用
 @default 8

*/


/*~struct~Variables:zh-ch

    @param baitVariableId:i
            @text 鱼饵变量
    @type variable
    @default 1
            @desc 必需！您设置当前玩家鱼饵ID的变量




    @param rodVariableId:i
            @text 钓竿变量
    @type variable
    @default 2
            @desc 必需！您设置当前玩家钓竿ID的变量

*/

/*~struct~RodSettings:zh-ch
 @param id:i
      @text 钓竿ID
 @type number 
 @min 1
             @desc 唯一的钓竿ID，您应该将此值设置为钓竿变量，以使用此钓竿
 @default 1 




 @param iconName:str
             @text 图片
 @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
             @desc 游戏UI上的钓竿图像




 @param progressBarTimerMod:i
      @text 进度条乘数
 @type number 
 @min 0.1
 @decimals 1
             @desc 捕鱼进度条填充速度乘数。 总速度将乘以此值。 1-没有变化。
 
 @default 1




 @param redBarShrinkSpeed:i
             @text 计时器延迟
 @type number 
 @min 1
             @desc 游戏区域在缩小之前的计时器延迟（以帧为单位）
 @default 10




 @param gameZoneFillSpeed:i
 @parent redBarShrinkSpeed:i
             @text 缩小步骤
 @type number 
 @min 1
             @desc 游戏区域每个计时器滴答的缩小步骤
 @default 1 




 @param redBarMinWidth:i
 @parent redBarShrinkSpeed:i
             @text 最小宽度
 @type number 
 @min 10
             @desc 游戏区域的最小宽度（PX）
 @default 60 




 @param redBarMaxWidth:i
 @parent redBarShrinkSpeed:i
             @text 最大宽度
 @type number 
 @min 20
             @desc 游戏区域的最大宽度（PX）
 @default 120 




 @param whiteCursorMoveSpeed:i
             @text 光标步骤
 @type number 
 @min 1
             @desc 每帧的光标移动步长（PX）。 更大的值=>更快的移动速度。
 @default 3 




 @param badClickProgressPenalty:i
 @parent whiteCursorMoveSpeed:i
             @text 罚款 %
 @type number 
 @min 0
 @max 99
             @desc 玩家错过点击时对进度条的惩罚（-）
 @default 20 




 @param goodClickProgressAdd:i
 @parent whiteCursorMoveSpeed:i
             @text 奖金 %
 @type number 
 @min 0
 @max 99
             @desc 玩家在游戏区域内点击时对进度条的奖励（+）
 @default 0 

*/

/*~struct~BaitData:zh-ch
 @param id:i
      @text 鱼饵ID
 @type number 
 @min 1
             @desc 您应该将此值设置为变量鱼饵变量，以使用此鱼饵
 @default 1 




 @param iconName:str
             @text 图片
 @type file
 @dir img/pSimpleFishing/
 @require 1
 @default
             @desc 游戏UI上的鱼饵图像
*/

/*~struct~RegionData:zh-ch

 @param region:i
         @text 区域编号
 @type number 
 @min 1
 @max 255
         @desc 将使用这些设置的区域
 @default 1 




 @param fishes:structA
         @text 鱼
 @type struct<FishData>[] 
         @desc 可以在此区域捕获的鱼的设置
 @default []

*/

/*~struct~FishData:zh-ch

 @param id:i
      @text 鱼物品
 @type item 
             @desc 玩家捕捉到这条鱼时将获得此物品（x1）




 @param appearChance:i
             @text 机会 %
 @type number 
 @min 0
 @max 100
             @desc 该鱼在该区域出现的基本机会（不包括任何鱼饵）。
 @default 20




 @param progressBarFillSpeed:i
             @text 速度
 @type number 
 @min 1
 @max 1000
             @desc 捕鱼进度条填充速度。较小的值=填充速度更快。
 @default 1 




 @param goodClickProgressAdd:i
             @text 点击奖励
 @type number 
 @min 0
 @max 100
             @desc 玩家在游戏区域内进行正确点击时，进度条填充的百分比奖励
 @default 10




 @param baits:structA
             @text 鱼饵
 @type struct<FishPerBait>[]
 @default []




 @param appearSwitchId:int
                  @text 开关ID
   @type switch
                  @desc 如果此开关为ON，则鱼将出现在该区域。
   @default 0




   @param appearConditionScript
                  @text 条件脚本
                  @desc 如果此脚本返回true，则鱼将出现在该区域。
   @default


   

*/

/*~struct~FishPerBait:zh-ch

 @param id:i
      @text 鱼饵ID
 @type number 
 @min 1
             @desc 鱼饵ID（数字）
 @default 1




 @param addToChance:i
 @text 机会 %
            @text 机会 %
 @type number 
 @min 0
 @max 100
             @desc 这种鱼出现的机会
 @default 40

*/





var Imported;
(function (Imported) {
    Imported.PKD_SimpleFishing = true;
})(Imported || (Imported = {}));
//%[IDEA] Сделать универсальный Notify из Sprite_FishCatchNotifyText, чтобы можно было показывать любой текск
var PKD_SimpleFishing;
(function (PKD_SimpleFishing) {
    PKD_SimpleFishing.Version = "1.2";
    /**
     * Get NUI file from plugin
     * @param {string} name - Name of file
     * @returns {any} - File content
    */
    function GetNUIFile(name) {
        return window["$PKD_SimpleFishing_" + name];
    }
    PKD_SimpleFishing.GetNUIFile = GetNUIFile;
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
                PKD_SimpleFishing[name] = obj;
            }
            else {
                let _name = obj.name;
                if ((_name === null || _name === void 0 ? void 0 : _name.length) > 0) {
                    PKD_SimpleFishing[obj.name] = obj;
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
    PKD_SimpleFishing.Link = Link;
})(PKD_SimpleFishing || (PKD_SimpleFishing = {}));
window["PKD_SimpleFishing"] = PKD_SimpleFishing;


(function(){



//build: 4 
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






var PP;
(function (PP) {
    let _loader;
    /**
        * Load plugin settings
    */
    function LoadPluginSettings() {
        _loader = new KDX.ParamLoader("PKD_SimpleFishing");
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
    function getGameEventsData() {
        return getLoaderParam('gameEventsData', {
            onGameInitedCommonEventId: 0,
            onGameStartedCommonEventId: 0,
            onGameEndCommonEventId: 0,
            onPlayerClickGood: 0,
            onPlayerCatchFish: 0,
            onPlayerClickBad: 0,
            onPlayerLoseFish: 0
        });
    }
    PP.getGameEventsData = getGameEventsData;
    function CheckParameters() {
        if (isIgnoreParametersCheck()) {
            return;
        }
        let variablesData = getGameVariablesData();
        if (variablesData['baitVariableId'] == undefined || variablesData['rodVariableId'] == undefined) {
            console.warn("PKD_SimpleFishing: Bait or Rod variable id is undefined! Please, set correct variable id in plugin parameters!");
            window.alert("PKD_SimpleFishing: Bait or Rod variable id is undefined! Please, set correct variable id in plugin parameters!");
        }
        if (variablesData.baitVariableId == 0 || variablesData.rodVariableId == 0) {
            console.warn("PKD_SimpleFishing: Bait or Rod variable id is zero! Please, set correct variable id in plugin parameters!");
            window.alert("PKD_SimpleFishing: Bait or Rod variable id is zero! Please, set correct variable id in plugin parameters!");
        }
        ;
        let rodsData = getRodsData();
        if (rodsData.length == 0) {
            console.warn("PKD_SimpleFishing: Rods data is empty! Please, set correct data in plugin parameters!");
            window.alert("PKD_SimpleFishing: Rods data is empty! Please, set correct data in plugin parameters!");
        }
        ;
        let baitsData = getBaitsData();
        if (baitsData.length == 0) {
            console.warn("PKD_SimpleFishing: Baits data is empty! Please, set correct data in plugin parameters!");
            window.alert("PKD_SimpleFishing: Baits data is empty! Please, set correct data in plugin parameters!");
        }
        ;
        let regionsData = getRegionsData();
        if (regionsData.length == 0) {
            console.warn("PKD_SimpleFishing: Regions data is empty! Please, set correct data in plugin parameters!");
            window.alert("PKD_SimpleFishing: Regions data is empty! Please, set correct data in plugin parameters!");
        }
        ;
    }
    PP.CheckParameters = CheckParameters;
    function getGameVariablesData() {
        return getLoaderParam('variablesData', {
            baitVariableId: 0,
            rodVariableId: 0
        });
    }
    PP.getGameVariablesData = getGameVariablesData;
    function getRodsData() {
        return getLoaderParam('rodsData', []);
    }
    PP.getRodsData = getRodsData;
    function getBaitsData() {
        return getLoaderParam('baitsData', []);
    }
    PP.getBaitsData = getBaitsData;
    function getRegionsData() {
        return getLoaderParam('regionsData', []);
    }
    PP.getRegionsData = getRegionsData;
    function getRodDataById(id) {
        return getRodsData().find(r => r.id == id);
    }
    PP.getRodDataById = getRodDataById;
    function getBaitDataById(id) {
        return getBaitsData().find(b => b.id == id);
    }
    PP.getBaitDataById = getBaitDataById;
    function getRegionDataById(region) {
        return getRegionsData().find(r => r.region == region);
    }
    PP.getRegionDataById = getRegionDataById;
    function isAutorestartFishingGame() {
        return getLoaderParam('autoRestart', false);
    }
    PP.isAutorestartFishingGame = isAutorestartFishingGame;
    function isIgnoreParametersCheck() {
        return getLoaderParam('ignoreParametersCheck', false);
    }
    PP.isIgnoreParametersCheck = isIgnoreParametersCheck;
    function isShowFishCaughtMessage() {
        return getLoaderParam('showFishCaughtMessage', true);
    }
    PP.isShowFishCaughtMessage = isShowFishCaughtMessage;
})(PP || (PP = {}));


class Sprite_FishingGameMain extends KNSprite {
    static Instance() {
        return this._instance;
    }
    static Create() {
        if (!this._instance) {
            new Sprite_FishingGameMain();
        }
        SceneManager._scene.addChild(this._instance);
    }
    static Destroy() {
        if (this._instance) {
            this._instance.stop();
            this._instance = null;
        }
    }
    get gameProgressBar() {
        return this._gameProgressBar;
    }
    get gameZone() {
        return this._gameZone;
    }
    get gameCursor() {
        return this._gameCursor;
    }
    rodImage() {
        return this._gameLogic.getRodImage();
    }
    baitImage() {
        return this._gameLogic.getBaitImage();
    }
    fishImage() {
        if (this._gameLogic.isGameInProgress()) {
            return this._gameLogic.getFishImage();
        }
        else {
            return "unknownFish";
        }
    }
    refresh() {
        var _a, _b, _c;
        (_a = this._rodIcon) === null || _a === void 0 ? void 0 : _a.refreshBindings(this);
        (_b = this._baitIcon) === null || _b === void 0 ? void 0 : _b.refreshBindings(this);
        (_c = this._fishIcon) === null || _c === void 0 ? void 0 : _c.refreshBindings(this);
    }
    //%[MAIN]
    startFishingGame() {
        this._gameLogic.start();
        this.gameCursor.visible = true;
        this.gameZone.visible = true;
    }
    pause() {
        this._gameLogic.pause();
        this.gameCursor.pause();
        this.gameZone.pause();
        this.gameProgressBar.pause();
        this.gameCursor.visible = false;
        this.gameZone.visible = false;
    }
    clear() {
        this.pause();
        this._gameLogic.clear();
        this.gameCursor.clear();
        this.gameZone.clear();
        this.gameProgressBar.clear();
        this.refresh();
    }
    isPlaying() {
        return this._gameLogic.isGameInProgress();
    }
    stop() {
        try {
            this.visible = false;
            this.terminate();
            this.removeFromParent();
        }
        catch (error) {
            console.warn(error);
        }
    }
    terminate() {
        try {
            FishingUtils.callCommonEvent(PP.getGameEventsData().onGameEndCommonEventId);
        }
        catch (error) {
            console.warn(error);
        }
    }
    update() {
        super.update();
        this._gameLogic.update();
    }
    destroy(options) {
        Sprite_FishingGameMain._instance = null;
        super.destroy(options);
    }
    constructor() {
        super();
        this._initGameLogic();
        this._createVisuals();
        Sprite_FishingGameMain._instance = this;
    }
    _initGameLogic() {
        this._gameLogic = new FishingGameLogic(this);
    }
    _createVisuals() {
        KDNUI.FromScheme(this._scheme(), this);
        this._createDynamicZone();
        this._createGameProgressBar();
        this._createMovingCursor();
    }
    _createDynamicZone() {
        let zoneColor = this.uiConstant("zoneColor");
        let zoneOpacity = this.uiConstant("zoneOpacity");
        let zonePadding = this.uiConstant("zonePadding");
        let zoneWidth = this._gameBarMainImage.realWidth() - zonePadding.x * 2;
        let zoneHeight = this._gameBarMainImage.realHeight() - zonePadding.y * 2;
        this._gameZone = new Sprite_DynamicZone(zoneColor, zoneOpacity, zoneWidth, zoneHeight);
        this._gameZone.move(zonePadding.x, zonePadding.y);
        this._gameZone.setIsVertical(this.uiConstant("isZoneIsVertical"));
        this._gameZone.setEndThreshold(this.uiConstant("zoneMinSize"));
        this._gameProccessGaugeContainer.addChild(this._gameZone);
        this._gameZone.visible = false;
    }
    _createMovingCursor() {
        this._gameCursor = new Sprite_MovingCursor();
        let isVertical = this.uiConstant("isZoneIsVertical");
        let maxDistance = this._gameCursorContainer.realWidth();
        if (isVertical) {
            maxDistance = this._gameCursorContainer.realHeight();
        }
        this._gameCursor.setMaxMovingDistance(maxDistance);
        this._gameCursor.setIsVertical(isVertical);
        this._gameProccessGaugeContainer.addChild(this._gameCursor);
        if (isVertical) {
            this._gameCursor.setPosition("center", this._gameCursorContainer.y);
        }
        else {
            this._gameCursor.setPosition(this._gameCursorContainer.x, "center");
        }
        this._gameCursor.visible = false;
    }
    _createGameProgressBar() {
        this._gameProgressBar = new Sprite_GameProgressBar();
        this._gameProgressGaugeContainer.addChild(this._gameProgressBar);
    }
    _scheme() {
        return PKD_SimpleFishing.GetNUIFile("NUI_GameUI");
    }
}
PKD_SimpleFishing.Link(Sprite_FishingGameMain, "Sprite_FishingGameMain");


const InitFishingGame = (withStart = false) => {
    try {
        if (KUtils.IsMapScene()) {
            FishingGameManager.initFishingGame();
            if (withStart === true) {
                setTimeout(() => {
                    StartFishingGame();
                }, 100);
            }
        }
    }
    catch (e) {
        console.warn(e);
    }
};
const IsInFishingGame = () => {
    try {
        return FishingGameManager.isInFishing();
    }
    catch (e) {
        console.warn(e);
    }
    return false;
};
const IsFishingGameInited = () => {
    try {
        if (KUtils.IsMapScene()) {
            return FishingGameManager.isFishingGameExists();
        }
    }
    catch (e) {
        console.warn(e);
    }
    return false;
};
const StartFishingGame = () => {
    try {
        FishingGameManager.startFishingGame();
    }
    catch (e) {
        console.warn(e);
    }
};
const PauseFishingGame = () => {
    try {
        FishingGameManager.pauseFishingGame();
    }
    catch (e) {
        console.warn(e);
    }
};
const StopFishingGame = () => {
    try {
        FishingGameManager.stopFishingGame();
    }
    catch (e) {
        console.warn(e);
    }
};
const GetCaughtFishId = () => {
    try {
        return FishingGameLogic.lastCaughtFishId;
    }
    catch (e) {
        console.warn(e);
    }
};
const GetMissedFishId = () => {
    try {
        return FishingGameLogic.lastDroppedFishId;
    }
    catch (e) {
        console.warn(e);
    }
};
const CurrentFishId = () => {
    try {
        return FishingGameLogic.currentFishId;
    }
    catch (e) {
        console.warn(e);
    }
};
const ShowCaughtFishNotify = (fishId) => {
    try {
        const fishData = { id: fishId };
        Sprite_FishCatchNotifyText.Show(fishData);
    }
    catch (e) {
        console.warn(e);
    }
};
const ShowNotifyMessage = (message = "") => {
    try {
        Sprite_NotifyMessage.Show(message);
    }
    catch (e) {
        console.warn(e);
    }
};
window['InitFishingGame'] = InitFishingGame;
window['IsInFishingGame'] = IsInFishingGame;
window['IsFishingGameInited'] = IsFishingGameInited;
window['StartFishingGame'] = StartFishingGame;
window['PauseFishingGame'] = PauseFishingGame;
window['StopFishingGame'] = StopFishingGame;
window['GetCaughtFishId'] = GetCaughtFishId;
window['GetMissedFishId'] = GetMissedFishId;
window['CurrentFishId'] = CurrentFishId;
window['ShowCaughtFishNotify'] = ShowCaughtFishNotify;
window['ShowNotifyMessage'] = ShowNotifyMessage;


var FishingGameStates;
(function (FishingGameStates) {
    FishingGameStates[FishingGameStates["Initialize"] = 0] = "Initialize";
    FishingGameStates[FishingGameStates["Paused"] = 1] = "Paused";
    FishingGameStates[FishingGameStates["Playing"] = 2] = "Playing";
    FishingGameStates[FishingGameStates["End"] = 3] = "End";
})(FishingGameStates || (FishingGameStates = {}));
class FishingGameLogic {
    constructor(_gameUI) {
        this._gameUI = _gameUI;
        this._goodClickBonus = 0;
        this._badClickPenalty = 0;
        this._gameState = FishingGameStates.Initialize;
        FishingGameLogic.lastCaughtFishId = 0;
        FishingGameLogic.lastDroppedFishId = 0;
        FishingGameLogic.currentFishId = 0;
        this._gameEvents = PP.getGameEventsData();
        this._gameVariables = PP.getGameVariablesData();
        this._currentRod = this._loadPlayerRod();
        this._currentBait = this._loadPlayerBait();
        FishingUtils.callCommonEvent(this._gameEvents.onGameInitedCommonEventId);
    }
    pause() {
        this._gameState = FishingGameStates.Paused;
    }
    clear() {
        this._gameState = FishingGameStates.End;
    }
    isGameInProgress() {
        return this._gameState === FishingGameStates.Playing;
    }
    getRodImage() {
        return this._currentRod.iconName;
    }
    getBaitImage() {
        return this._currentBait.iconName;
    }
    update() {
        if (this.isGameInProgress()) {
            this._updatePlayerInputs();
            this._updateGameLogic();
        }
        if (KInput.IsCancel()) {
            this._gameUI.pause();
            this._gameUI.clear();
            Input.clear();
            StopFishingGame();
        }
    }
    getFishImage() {
        return FishingUtils.getFishIcon(this._currentFish.id);
    }
    start() {
        this._goodClickBonus = 0;
        this._badClickPenalty = 0;
        this._currentFish = this._getRandomFish();
        if (this._isCanStartFishingGame()) {
            this._applyFishData();
            this._applyRodData();
            this._gameState = FishingGameStates.Playing;
            this._gameUI.refresh();
            this._gameUI.gameCursor.start();
            this._gameUI.gameZone.start();
            this._gameUI.gameProgressBar.start();
            FishingUtils.callCommonEvent(this._gameEvents.onGameStartedCommonEventId);
        }
        else {
            FishingUtils.callCommonEvent(this._gameEvents.onNoAnyFishInRegion);
            FishingGameLogic.currentFishId = 0;
            StopFishingGame();
        }
    }
    _loadPlayerRod() {
        let rodId = $gameVariables.value(this._gameVariables.rodVariableId);
        let rodData = PP.getRodDataById(rodId);
        if (!rodData) {
            console.warn("Rod with id " + rodId + " not found!");
            rodData = {
                id: 1000,
                iconName: "notFound",
                progressBarTimerMod: 1,
                gameZoneFillSpeed: 1,
                redBarShrinkSpeed: 10,
                whiteCursorMoveSpeed: 3,
                redBarMinWidth: 60,
                redBarMaxWidth: 120,
                badClickProgressPenalty: 20,
                goodClickProgressAdd: 0
            };
        }
        return rodData;
    }
    _loadPlayerBait() {
        let baitId = $gameVariables.value(this._gameVariables.baitVariableId);
        let baitData = PP.getBaitDataById(baitId);
        if (!baitData) {
            console.warn("Bait with id " + baitId + " not found!");
            baitData = {
                id: 1000,
                iconName: "notFound",
            };
        }
        return baitData;
    }
    _getRandomFish() {
        let regionId = FishingUtils.getRegionIdPlayerFacing();
        let fish = FishingUtils.getRandomFishFromRegionId(regionId, this._currentBait);
        if (FishingUtils.isFishAppearConditionsValid(fish)) {
            return fish;
        }
        else {
            return null;
        }
    }
    _isCanStartFishingGame() {
        // * If not have bait or fish or rod - can't start fishing
        return KDX.any(this._currentRod) && KDX.any(this._currentBait) && KDX.any(this._currentFish);
    }
    _applyFishData() {
        FishingGameLogic.currentFishId = this._currentFish.id;
        this._goodClickBonus = this._currentFish.goodClickProgressAdd / 100;
        this._gameUI.gameProgressBar.setTimerSpeed(this._currentFish.progressBarFillSpeed);
    }
    _applyRodData() {
        this._goodClickBonus += this._currentRod.goodClickProgressAdd / 100;
        this._badClickPenalty = this._currentRod.badClickProgressPenalty / 100;
        this._gameUI.gameProgressBar.modTimerSpeed(this._currentRod.progressBarTimerMod);
        this._gameUI.gameCursor.setMovingSpeed(this._currentRod.whiteCursorMoveSpeed);
        this._gameUI.gameZone.setShrinkingSpeed(this._currentRod.gameZoneFillSpeed);
        this._gameUI.gameZone.setShrinkTime(this._currentRod.redBarShrinkSpeed);
        this._gameUI.gameZone.setMaxSize(this._currentRod.redBarMaxWidth);
        this._gameUI.gameZone.setMinSize(this._currentRod.redBarMinWidth);
    }
    _updatePlayerInputs() {
        if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
            if (this._gameUI.gameZone.isPointInsideZone(this._gameUI.gameCursor.cursorPosition())) {
                this._gameUI.gameProgressBar.addProgressValue(this._goodClickBonus);
                FishingUtils.callCommonEvent(this._gameEvents.onPlayerClickGood);
            }
            else {
                this._onBadClick();
            }
            this._gameUI.gameZone.restart();
        }
    }
    _onBadClick() {
        this._gameUI.gameProgressBar.addProgressValue(-this._badClickPenalty);
        if (!this._gameUI.gameProgressBar.isBadEnd()) {
            FishingUtils.callCommonEvent(this._gameEvents.onPlayerClickBad);
        }
    }
    _updateGameLogic() {
        if (this._gameUI.gameProgressBar.isGoodEnd()) {
            FishingGameLogic.lastCaughtFishId = FishingGameLogic.currentFishId;
            FishingUtils.callCommonEvent(this._gameEvents.onPlayerCatchFish);
            this._gainFishToPlayer();
            if (PP.isShowFishCaughtMessage()) {
                Sprite_FishCatchNotifyText.Show(this._currentFish);
            }
            this._endFishingGame();
        }
        else if (this._gameUI.gameProgressBar.isBadEnd()) {
            FishingGameLogic.lastDroppedFishId = FishingGameLogic.currentFishId;
            FishingUtils.callCommonEvent(this._gameEvents.onPlayerLoseFish);
            this._endFishingGame();
        }
        else {
            if (this._gameUI.gameZone.isShrinkFinished()) {
                this._onBadClick();
                this._gameUI.gameZone.restart();
            }
        }
    }
    _gainFishToPlayer() {
        let fishItem = $dataItems[FishingGameLogic.currentFishId];
        if (fishItem) {
            setTimeout(() => {
                $gameParty.gainItem(fishItem, 1, true);
            }, 600);
        }
    }
    _endFishingGame() {
        this._gameUI.pause();
        this._gameUI.clear();
        if (PP.isAutorestartFishingGame()) {
            setTimeout(() => {
                StartFishingGame();
            }, 1000);
        }
    }
}
FishingGameLogic.lastCaughtFishId = 0;
FishingGameLogic.lastDroppedFishId = 0;
FishingGameLogic.currentFishId = 0;
PKD_SimpleFishing.Link(FishingGameLogic, "FishingGameLogic");


var FishingGameManager;
(function (FishingGameManager) {
    function isFishingGameExists() {
        return KDX.any(Sprite_FishingGameMain.Instance());
    }
    FishingGameManager.isFishingGameExists = isFishingGameExists;
    function initFishingGame() {
        Sprite_FishingGameMain.Destroy();
        Sprite_FishingGameMain.Create();
    }
    FishingGameManager.initFishingGame = initFishingGame;
    function startFishingGame() {
        if (isFishingGameExists()) {
            Sprite_FishingGameMain.Instance().startFishingGame();
        }
        else {
            console.warn("You should call InitFishingGame() first!");
        }
    }
    FishingGameManager.startFishingGame = startFishingGame;
    function pauseFishingGame() {
        if (isFishingGameExists()) {
            Sprite_FishingGameMain.Instance().pause();
        }
    }
    FishingGameManager.pauseFishingGame = pauseFishingGame;
    function stopFishingGame() {
        Sprite_FishingGameMain.Destroy();
    }
    FishingGameManager.stopFishingGame = stopFishingGame;
    function isInFishing() {
        return isFishingGameExists();
    }
    FishingGameManager.isInFishing = isInFishing;
})(FishingGameManager || (FishingGameManager = {}));
window["FishingGameManager"] = FishingGameManager;


var FishingUtils;
(function (FishingUtils) {
    function getRegionIdPlayerFacing() {
        const regionId = $gamePlayer.regionId();
        if (regionId > 0) {
            return regionId;
        }
        else {
            let direction = $gamePlayer.direction();
            let x = $gamePlayer.x;
            let y = $gamePlayer.y;
            switch (direction) {
                case 2:
                    y++;
                    break;
                case 4:
                    x--;
                    break;
                case 6:
                    x++;
                    break;
                case 8:
                    y--;
                    break;
            }
            return $gameMap.regionId(x, y);
        }
    }
    FishingUtils.getRegionIdPlayerFacing = getRegionIdPlayerFacing;
    function getFishIcon(fishId) {
        try {
            let fishItem = $dataItems[fishId];
            if (fishItem) {
                if (fishItem.meta && KString.any(fishItem.meta['fishIcon'])) {
                    return fishItem.meta['fishIcon'];
                }
                return fishItem.iconIndex;
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    FishingUtils.getFishIcon = getFishIcon;
    function getChanceForFishDependsOnBait(fish, bait) {
        try {
            let baseChance = fish.appearChance / 100;
            if (!bait) {
                let baitForFish = fish.baits.find(b => b.id === bait.id);
                if (baitForFish) {
                    baseChance += baitForFish.addToChance / 100;
                }
            }
            return baseChance;
        }
        catch (error) {
            console.warn(error);
            return 0;
        }
    }
    function getRandomFishFromRegionId(regionId, bait) {
        let regionData = PP.getRegionDataById(regionId);
        if (regionData) {
            // * Collect chances for each fish
            let fishIdChance = {};
            let fishes = regionData.fishes;
            for (let fish of fishes) {
                let chance = getChanceForFishDependsOnBait(fish, bait);
                fishIdChance[fish.id] = chance;
            }
            // * Check if fish passed
            let passedFishes = [];
            for (let fishId in fishIdChance) {
                let chance = fishIdChance[fishId];
                if (Math.random() <= chance) {
                    passedFishes.push(Number(fishId));
                }
            }
            let fishId = 0;
            if (passedFishes.length == 0) {
                // * Select fish with highest chance from all
                let highestChance = Math.max(...Object.values(fishIdChance));
                fishId = Number(Object.keys(fishIdChance).find(key => fishIdChance[key] === highestChance));
            }
            else {
                // * Select random fish from passed
                fishId = passedFishes[Math.floor(Math.random() * passedFishes.length)];
            }
            let resultFish = fishes.find(f => f.id === fishId);
            if (resultFish) {
                return resultFish;
            }
            else {
                if (regionData.fishes[0]) {
                    return regionData.fishes[0];
                }
                else {
                    return null;
                }
            }
        }
        else {
            let message = "Fishing Data for Region with id " + regionId + " not found!";
            console.warn(message);
            return null;
        }
    }
    FishingUtils.getRandomFishFromRegionId = getRandomFishFromRegionId;
    function isFishAppearConditionsValid(fish) {
        if (!fish) {
            return false;
        }
        let canAppearBySwitch = true;
        let canAppearByScript = true;
        try {
            if (fish.appearSwitchId > 0) {
                canAppearBySwitch = $gameSwitches.value(fish.appearSwitchId);
            }
            if (KString.any(fish.appearConditionScript)) {
                try {
                    canAppearByScript = eval(fish.appearConditionScript);
                }
                catch (error) {
                    console.warn(error);
                    canAppearByScript = false;
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
        return canAppearBySwitch && canAppearByScript;
    }
    FishingUtils.isFishAppearConditionsValid = isFishAppearConditionsValid;
    function callCommonEvent(eventId) {
        try {
            if (KDX.any(eventId) && eventId > 0) {
                $gameTemp.reserveCommonEvent(eventId);
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    FishingUtils.callCommonEvent = callCommonEvent;
})(FishingUtils || (FishingUtils = {}));


class Sprite_DynamicZone extends KNSprite {
    constructor(fillColor = "#ad189a", fillOpacity = 125, maxWidth = 300, maxHeight = 100) {
        super();
        this._maxSize = 100;
        this._minSize = 10;
        this._shrinkingSpeed = 1;
        this._endThreshold = 6;
        this._isActive = false;
        this._shrinkTime = 10;
        this._isVertical = false;
        this._timer = 0;
        this._zoneFillColor = "#ffffff";
        this._zoneFillOpacity = 255;
        this._maxWidth = 0;
        this._maxHeight = 0;
        this._zoneFillColor = fillColor;
        this._zoneFillOpacity = fillOpacity;
        this._maxWidth = maxWidth;
        this._maxHeight = maxHeight;
        this._create();
    }
    isShrinkFinished() {
        if (this._isVertical) {
            return this._isActive && this._zoneSprite.bitmap.height <= this._endThreshold;
        }
        else
            return this._isActive && this._zoneSprite.bitmap.width <= this._endThreshold;
    }
    start() {
        this._isActive = true;
        this._restartZone();
    }
    pause() {
        this._isActive = false;
    }
    setMaxSize(value) {
        this._maxSize = value;
    }
    setMinSize(value) {
        this._minSize = value;
    }
    setShrinkingSpeed(value) {
        this._shrinkingSpeed = value;
    }
    setShrinkTime(value) {
        this._shrinkTime = value;
    }
    setEndThreshold(value) {
        this._endThreshold = value;
    }
    setIsVertical(value) {
        this._isVertical = value;
    }
    isPointInsideZone(point) {
        if (!this._zoneSprite.visible)
            return false;
        let zone = this._zoneSprite;
        let zonePosition = zone.position;
        let zoneWidth = zone.bitmap.width;
        let zoneHeight = zone.bitmap.height;
        return point.x >= zonePosition.x && point.x <= zonePosition.x + zoneWidth
            && point.y >= zonePosition.y && point.y <= zonePosition.y + zoneHeight;
    }
    clear() {
        this._timer = 0;
        this._zoneSprite.visible = false;
    }
    restart() {
        this._restartZone();
    }
    update() {
        super.update();
        if (this._isActive) {
            this._updateZone();
        }
    }
    _create() {
        this._zoneSprite = new Sprite(new Bitmap(100, 100));
        this._zoneSprite.opacity = this._zoneFillOpacity;
        this.addChild(this._zoneSprite);
        this._createNewZone();
    }
    _createNewZone() {
        let size = Math.floor(this._minSize + Math.random() * (this._maxSize - this._minSize));
        let x = 0;
        let y = 0;
        if (this._isVertical) {
            this._zoneSprite.bitmap = new Bitmap(this._maxWidth, size);
            y = Math.random() * (this._maxHeight - size - 1);
        }
        else {
            this._zoneSprite.bitmap = new Bitmap(size, this._maxHeight);
            x = Math.random() * (this._maxWidth - size - 1);
        }
        this._zoneSprite.move(x, y);
        this._zoneSprite.bitmap.fillAll(this._zoneFillColor);
        this._zoneSprite.visible = true;
    }
    _restartZone() {
        this.clear();
        setTimeout(() => {
            this._createNewZone();
        }, 500);
    }
    _updateZone() {
        this._timer++;
        if (this._timer >= this._shrinkTime) {
            this._timer = 0;
            this._onShrinkStep();
        }
    }
    _onShrinkStep() {
        if (!this._zoneSprite.visible)
            return;
        if (!this.isShrinkFinished()) {
            this._shrinkZone();
        }
    }
    _shrinkZone() {
        // * Decrease width (or height) by shrinking speed
        // * Move by X or Y (by shrinking speed) to keep the center
        let zone = this._zoneSprite;
        let bitmap = zone.bitmap;
        let zonePosition = zone.position;
        let shrinkingSpeed = this._shrinkingSpeed;
        let isVertical = this._isVertical;
        if (isVertical) {
            this._zoneSprite.bitmap = new Bitmap(bitmap.width, bitmap.height - shrinkingSpeed * 2);
            zonePosition.y += shrinkingSpeed;
        }
        else {
            this._zoneSprite.bitmap = new Bitmap(bitmap.width - shrinkingSpeed * 2, bitmap.height);
            zonePosition.x += shrinkingSpeed;
        }
        this._zoneSprite.bitmap.fillAll(this._zoneFillColor);
    }
}
PKD_SimpleFishing.Link(Sprite_DynamicZone, "Sprite_DynamicZone");


class Sprite_GameProgressBar extends KNSprite {
    constructor() {
        super();
        this._timer = 0;
        this._progressStepTime = 10;
        this._isPaused = true;
        this._isFinished = false;
        this._isReturing = false;
        this._currentProgress = 0;
        this._create();
        this.clear();
    }
    addProgressValue(value) {
        this._currentProgress += value;
        this._refreshProgressBar();
        if (this._currentProgress <= 0) {
            this._isReturing = true;
            this._isFinished = false;
        }
        else if (this._currentProgress >= 1.0) {
            this._isFinished = true;
            this._isReturing = false;
        }
    }
    isGoodEnd() {
        return this._isFinished;
    }
    isBadEnd() {
        return this._isReturing;
    }
    isAnyEnd() {
        return this.isGoodEnd() || this.isBadEnd();
    }
    start() {
        this._isPaused = false;
    }
    pause() {
        this._isPaused = true;
    }
    update() {
        super.update();
        try {
            if (this._isPaused)
                return;
            this._timer++;
            if (this._timer >= this._progressStepTime) {
                this._timer = 0;
                if (!this.isAnyEnd()) {
                    this._onProgressTimerTick();
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    setTimerSpeed(speed) {
        this._progressStepTime = speed;
    }
    modTimerSpeed(value) {
        this.setTimerSpeed(this._progressStepTime * value);
    }
    clear() {
        this._currentProgress = 0;
        this._timer = 0;
        this._isFinished = false;
        this._isReturing = false;
        this._refreshProgressBar();
    }
    _onProgressTimerTick() {
        try {
            this._currentProgress += 0.01;
            this._refreshProgressBar();
            if (this._currentProgress >= 1.0) {
                this._isFinished = true;
                this._isReturing = false;
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    _refreshProgressBar() {
        var _a;
        try {
            if (this._currentProgress > 1.0) {
                this._currentProgress = 1.0;
            }
            else if (this._currentProgress < 0) {
                this._currentProgress = 0;
            }
            (_a = this._progressBar) === null || _a === void 0 ? void 0 : _a.draw(this._currentProgress);
        }
        catch (error) {
            console.warn(error);
        }
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
    }
    _scheme() {
        return PKD_SimpleFishing.GetNUIFile("NUI_GameProgressBar");
    }
}
PKD_SimpleFishing.Link(Sprite_GameProgressBar, "Sprite_GameProgressBar");


class Sprite_MovingCursor extends KNSprite {
    constructor() {
        super();
        this._maxMovingDistance = 100;
        this._movingSpeed = 3;
        this._isVertical = false;
        this._isActive = false;
        this._isMovingForward = true;
        this._create();
    }
    start() {
        this._isActive = true;
    }
    pause() {
        this._isActive = false;
    }
    clear() {
        this._isActive = false;
        this._cursorImage.setPosition(0, 0);
    }
    cursorPosition() {
        return this._cursorImage.position;
    }
    setMaxMovingDistance(value) {
        this._maxMovingDistance = value;
    }
    setMovingSpeed(value) {
        this._movingSpeed = value;
    }
    setIsVertical(value) {
        this._isVertical = value;
        this._refreshAnchor();
    }
    update() {
        super.update();
        this._updateCursorMovement();
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
        this._refreshAnchor();
    }
    _refreshAnchor() {
        if (this._isVertical) {
            this._cursorImage.setCommonAnchor(0, 0.5);
        }
        else {
            this._cursorImage.setCommonAnchor(0.5, 0);
        }
    }
    _scheme() {
        return PKD_SimpleFishing.GetNUIFile("NUI_GameMovingCursor");
    }
    // * Move from left to right or from bottom to top
    _updateCursorMovement() {
        if (this._isActive) {
            let cursor = this._cursorImage;
            let cursorPosition = cursor.position;
            let cursorSpeed = this._movingSpeed;
            let cursorMaxDistance = this._maxMovingDistance;
            let isVertical = this._isVertical;
            let isMovingForward = this._isMovingForward;
            if (isVertical) {
                if (isMovingForward) {
                    cursorPosition.y += cursorSpeed;
                    if (cursorPosition.y >= cursorMaxDistance) {
                        cursorPosition.y = cursorMaxDistance;
                        this._isMovingForward = false;
                    }
                }
                else {
                    cursorPosition.y -= cursorSpeed;
                    if (cursorPosition.y <= 0) {
                        cursorPosition.y = 0;
                        this._isMovingForward = true;
                    }
                }
            }
            else {
                if (isMovingForward) {
                    cursorPosition.x += cursorSpeed;
                    if (cursorPosition.x >= cursorMaxDistance) {
                        cursorPosition.x = cursorMaxDistance;
                        this._isMovingForward = false;
                    }
                }
                else {
                    cursorPosition.x -= cursorSpeed;
                    if (cursorPosition.x <= 0) {
                        cursorPosition.x = 0;
                        this._isMovingForward = true;
                    }
                }
            }
            cursor.position = cursorPosition;
        }
    }
}
PKD_SimpleFishing.Link(Sprite_MovingCursor, "Sprite_MovingCursor");


class Sprite_FishCatchNotifyText extends KNSprite {
    static Show(fishData) {
        SceneManager._scene.addChild(new Sprite_FishCatchNotifyText(fishData));
    }
    constructor(_fishData) {
        super();
        this._fishData = _fishData;
        this._create();
        try {
            const aliveTime = this.uiConstant('aliveTime');
            this._aliveTimer = new KDX.TimedUpdate(aliveTime * 60, () => {
                this.visible = false;
                this.removeFromParent();
                this.destroy();
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
    }
    update() {
        var _a;
        super.update();
        (_a = this._aliveTimer) === null || _a === void 0 ? void 0 : _a.update();
    }
    fishItem() {
        return $dataItems[this._fishData.id];
    }
    fishName() {
        var _a;
        try {
            return (_a = this.fishItem()) === null || _a === void 0 ? void 0 : _a.name;
        }
        catch (error) {
            console.warn(error);
        }
        return "";
    }
    fishIcon() {
        try {
            if (this.fishItem()) {
                return FishingUtils.getFishIcon(this._fishData.id);
            }
        }
        catch (error) {
            console.warn(error);
        }
        return 0;
    }
    _scheme() {
        return PKD_SimpleFishing.GetNUIFile("NUI_CaughtFishNotifyMessage");
    }
}


class Sprite_NotifyMessage extends KNSprite {
    static Show(message) {
        SceneManager._scene.addChild(new Sprite_NotifyMessage(message));
    }
    constructor(_message) {
        super();
        this._message = _message;
        this._create();
        try {
            const aliveTime = this.uiConstant('aliveTime');
            this._aliveTimer = new KDX.TimedUpdate(aliveTime * 60, () => {
                this.visible = false;
                this.removeFromParent();
                this.destroy();
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    _create() {
        KDNUI.FromScheme(this._scheme(), this);
    }
    update() {
        var _a;
        super.update();
        (_a = this._aliveTimer) === null || _a === void 0 ? void 0 : _a.update();
    }
    notifyMessage() {
        return this._message;
    }
    _scheme() {
        return PKD_SimpleFishing.GetNUIFile("NUI_NotifyMessage");
    }
}
PKD_SimpleFishing.Link(Sprite_NotifyMessage, 'Sprite_NotifyMessage');


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    /**
     * Register NUI file for load with Database
     * @param {string} filnename - NUI file name WITHOUT extension
     */
    function pkdRegisterLocalNUIFile(filnename) {
        KDNUI.RegisterNUIFile("PKD_SimpleFishing", filnename);
    }
    pkdRegisterLocalNUIFile("NUI_GameProgressBar");
    pkdRegisterLocalNUIFile("NUI_GameMovingCursor");
    pkdRegisterLocalNUIFile("NUI_GameUI");
    pkdRegisterLocalNUIFile("NUI_CaughtFishNotifyMessage");
    pkdRegisterLocalNUIFile("NUI_NotifyMessage");
    //@[ALIAS]
    const ALIAS__loadDataFile = DataManager.loadDataFile;
    DataManager.loadDataFile = function (name, src) {
        if (src.includes("PKD_SimpleFishing")) {
            src = src.replace("Test_", "");
        }
        ALIAS__loadDataFile.call(this, name, src);
    };
})();
// ■ END DataManager.ts
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
var FSH_Sprite_AnimatedSpotIcon;

FSH_Sprite_AnimatedSpotIcon = class FSH_Sprite_AnimatedSpotIcon extends KSprite {
  constructor(iconImageName, maxFramesCount) {
    super();
    this.iconImageName = iconImageName;
    this.maxFramesCount = maxFramesCount;
    this.setDefaultImage();
    this._frameIndex = 0;
    this._frameTimer = 0;
    this._frames = [];
    if (this._framesCount() > 0) {
      this._createSeq();
    }
    return;
  }

  restart() {
    this._frameIndex = 0;
    this._frameTimer = 0;
    this.setNextFrame();
  }

  // * FOR changing
  _defaultBitmap() {
    return ImageManager.loadPictureForFSHplugin(this.iconImageName + "_0");
  }

  _frameSpeed() {
    return 10;
  }

  _framesCount() {
    return this.maxFramesCount;
  }

  _imageName() {
    return this.iconImageName + "_";
  }

  _loadPictureMethod(filename, index) {
    return ImageManager.loadPictureForFSHplugin(filename + index);
  }

  // * --- --- -- -- --
  setDefaultImage() {
    return this.bitmap = this._defaultBitmap();
  }

  _createSeq() {
    var i, j, ref;
    for (i = j = 0, ref = this._framesCount(); (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      this._frames.push(this._loadPictureMethod(this._imageName(), i));
    }
    return this.setNextFrame();
  }

  update() {
    super.update();
    this.visible = !window.IsFishingGameInited();
    if (this._frames.length === 0) {
      return;
    }
    this._frameTimer++;
    if (this._frameTimer > this._frameSpeed()) {
      this._frameIndex++;
      this._frameTimer = 0;
      if (this._frameIndex > (this._framesCount() - 1)) {
        this._frameIndex = 0;
      }
      this.setNextFrame();
    }
  }

  setNextFrame() {
    var e;
    try {
      return this.bitmap = this._frames[this._frameIndex];
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  }

};

PKD_SimpleFishing.Link(FSH_Sprite_AnimatedSpotIcon, "FSH_Sprite_AnimatedSpotIcon");


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setupPage, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__setupPage = _.setupPage;
  _.setupPage = function() {
    ALIAS__setupPage.call(this, ...arguments);
    this._fshCheckForFishingSpotComment();
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.fshGetFishingSpotIconData = function() {
    return this._fshSpotIconData;
  };
  _._fshCheckForFishingSpotComment = function() {
    var data, e, parts, ref;
    this._fshSpotIconData = null;
    try {
      if (this.page() != null) {
        data = KGameEvents.GetCommentLine('fishingSpot', this);
        if (!KString.any(data)) {
          return;
        }
        parts = data.split(':');
        parts = (ref = parts[1]) != null ? ref.split(",") : void 0;
        if (parts == null) {
          return;
        }
        return this._fshSpotIconData = {
          name: parts[0].trim(),
          frames: parseInt(parts[1].trim())
        };
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Game_Event.coffee
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
        if (IsInFishingGame())
            return true;
        return ALIAS__isEventRunning.call(this);
    };
})();
// ■ END Game_Map.ts
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForFSHplugin = function(filename) {
    return this.loadBitmap('img/pSimpleFishing/', filename);
  };
})();

// ■ END ImageManager.coffee
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
        PP.CheckParameters();
    };
})();
// ■ END Scene_Boot.ts
//---------------------------------------------------------------------------


//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.ts
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(() => {
    //@[DEFINES]
    const _ = Scene_Map.prototype;
    //@[ALIAS]
    const ALIAS__stop = _.stop;
    _.stop = function () {
        Sprite_FishingGameMain.Destroy();
        ALIAS__stop.call(this);
    };
})();
// ■ END Scene_Map.ts
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setCharacter, ALIAS__updateOther, _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  //@[ALIAS]
  ALIAS__setCharacter = _.setCharacter;
  _.setCharacter = function(char) {
    ALIAS__setCharacter.call(this, char);
    if ((char != null) && char instanceof Game_Event) {
      this._fshSpotIconThread = new KDX.TimedUpdate(10, this._fshRefreshFishingSpotIcon.bind(this));
    } else {
      this._fshSpotIconThread = null;
    }
  };
  //@[ALIAS]
  ALIAS__updateOther = _.updateOther;
  _.updateOther = function() {
    ALIAS__updateOther.call(this, ...arguments);
    return this._fshUpdateFishingSpotIcon();
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  _._fshUpdateFishingSpotIcon = function() {
    var ref, ref1;
    if ((ref = this._fshSpotIconThread) != null) {
      ref.update();
    }
    if ((ref1 = this._fshFishingSpotSpr) != null) {
      ref1.move(this.x, this.y);
    }
  };
  _._fshRefreshFishingSpotIcon = function() {
    var e, fishingSpotIcon, frames, name;
    try {
      if ((this._character != null) && this._character instanceof Game_Event) {
        fishingSpotIcon = this._character.fshGetFishingSpotIconData();
        if (fishingSpotIcon != null) {
          ({name, frames} = fishingSpotIcon);
          if (this._fshLastFSIName !== name) {
            this._fshCreateFisingSpotIcon(name, frames);
            return this._fshLastFSIName = name;
          }
        } else {
          return this._fshDestroyFishingSpotIcon();
        }
      } else {
        return this._fshDestroyFishingSpotIcon();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _._fshCreateFisingSpotIcon = function(name, frames) {
    var e;
    try {
      this._fshFishingSpotSpr = new FSH_Sprite_AnimatedSpotIcon(name, frames);
      this._fshFishingSpotSpr.z = 3;
      this._fshFishingSpotSpr.anchor.x = 0.5;
      this._fshFishingSpotSpr.anchor.y = 1;
      return this.parent.addChild(this._fshFishingSpotSpr);
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _._fshDestroyFishingSpotIcon = function() {
    var e;
    try {
      this._fshLastFSIName = null;
      if (this._fshFishingSpotSpr == null) {
        return;
      }
      this._fshFishingSpotSpr.visible = false;
      this._fshFishingSpotSpr.removeFromParent();
      return this._fshFishingSpotSpr = null;
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.7.0
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createTilemap, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createTilemap = _.createTilemap;
  _.createTilemap = function() {
    ALIAS__createTilemap.call(this, ...arguments);
    this._fshFishingSpotsLayer = new Sprite();
    this._fshFishingSpotsLayer.z = 5;
    this._tilemap.addChild(this._fshFishingSpotsLayer);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


})();