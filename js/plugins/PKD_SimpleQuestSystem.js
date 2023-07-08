/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
 *
 */

/*:
 * @plugindesc (v.1.4)[PRO] Simple quests system
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/simple-quests-system
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * This plugin add simple quest journal (similar to one in game TES Skyrim)
 * and quest tasks tracking system (on map)
 *
 * Script calls:
 * SQSM.OpenQuestJournal()

 * SQSM.AddQuest(ID)
 *      (all IDs should be in quotes "" )
 * SQSM.ShowDescriptionForQuest(ID, INDEX)
 *      (first quest description visible by default)
 * SQSM.ShowTaskForQuest(ID, INDEX)
 *      (first quest task visible by default)
 * SQSM.ShowAllTasksForQuest(ID)
 * SQSM.CompleteTaskForQuest(ID, INDEX)
 * SQSM.CompletQuest(ID)
 * SQSM.ResetQuest(ID)
        (remove quest from Journal and reset quest progress)
 * 
 * SQSM.SetActiveQuest(ID, true \ false)
 *      activate \ deactivate quest tracking on map
 *
 * SQSM.isQuestComplete(ID) - return true if quest with ID is completed
 * SQSM.isQuestVisible(ID) - return true if quest with ID is added to journal
 * SQSM.isQuestActive(ID) - return true if quest with ID is activated (tracked)
 *
 *
 * SQSM.RefreshMapQuestsList() - refresh quests map task window
 * SQSM.ShowMapQuestsList() - show quests map task window
 * SQSM.HideMapQuestsList() - hide quests map task window
 *
 * Plugin not have plugin commands
 * 
 * Visual style can be customized via Plugin Parameters
 * Image files: img\pSQSystem
 * (don't forget to copy them in deployed project)
 * ---------------------------------------------------------------------------
 *
  *
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon or Boosty!
 * 
 * Boosty page:
 *     https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 *
 * Contains resources designed and drawn
 * by Ekaterina N. Stadnikova (MOSCOW RUSSIA)
 * https://stadnikova-ekaterina.itch.io/
 *
  *
 * 
 * @requiredAssets img/pSQSystem/ActiveHelp
 * @requiredAssets img/pSQSystem/Cat_All_00
 * @requiredAssets img/pSQSystem/Cat_All_01
 * @requiredAssets img/pSQSystem/Cat_All_03
 * @requiredAssets img/pSQSystem/windowFrame
 * @requiredAssets img/pSQSystem/windowOpenButton_00
 * @requiredAssets img/pSQSystem/windowOpenButton_01
 * @requiredAssets img/pSQSystem/headerLine
 * @requiredAssets img/pSQSystem/windowCloseButton_00
 * @requiredAssets img/pSQSystem/windowCloseButton_01
 *

 * @param sqsQuests:structA
 * @text Quests
 * @type struct<Quest>[]
 * @default []
 * @desc Quests
 * 
 * @param sqsPointers:structA
 * @text Pointers
 * @type struct<Pointer>[]
 * @default []
 * @desc Pointers for quests
 * 
 * 
 * @param isUseAutoNavigation:b
 * @text Auto Navigation
 * @type boolean
 * @default false
 * @desc Is use new auto navigation system? 
 * 
 * @param sqsNavigation:structA
 * @parent isUseAutoNavigation:b
 * @text Navigation
 * @type struct<NavigatorPathToMap>[]
 * @default []
 * @desc Links between maps for automatically show path to task goal
 * 
 * @param sqsNavigationIgnore:intA
 * @parent isUseAutoNavigation:b
 * @text Ignore Maps
 * @type number[]
 * @default []
 * @desc Map ID's where auto navigation not able to work
 * 
 * @param sqsQuestsCategories:structA
 * @text Categories
 * @type struct<CategoryButton>[]
 * @default ["{\"position:struct\":\"{\\\"x\\\":\\\"250\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_All_00\\\",\\\"hover\\\":\\\"Cat_All_01\\\",\\\"disabled\\\":\\\"Cat_All_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Main\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Main_00\\\",\\\"hover\\\":\\\"Cat_Main_01\\\",\\\"disabled\\\":\\\"Cat_Main_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"510\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Side\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Side_00\\\",\\\"hover\\\":\\\"Cat_Side_01\\\",\\\"disabled\\\":\\\"Cat_Side_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"630\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Other\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Other_00\\\",\\\"hover\\\":\\\"Cat_Other_01\\\",\\\"disabled\\\":\\\"Cat_Other_03\\\"}\"}"]
 * @desc [PRO] Categories for quests
 * 
 * @param isNeedMenuCommand:b
 * @type boolean
 * @text Command in menu?
 * @on Show
 * @off No
 * @default true
 * @desc Show open quests journal command in game menu?
 * 
 * @param isSortByNew:b
 * @type boolean
 * @text New quests first
 * @on Yes
 * @off No
 * @default false
 * @desc If true - new quests always will be at the top of the list
 * 
 * @param isSortByActive:b
 * @type boolean
 * @text Active quests first
 * @on Yes
 * @off No
 * @default false
 * @desc If true - active quests always will be at the top of the list
 * 
 * @param buttonForOpenJournal
 * @type text
 * @text Open Journal Button
 * @default j
 * @desc Button for open Quest Journal (on Map)
 * 
 * @param buttonForOpenTasksWindow
 * @type text
 * @text Button for Tasks Window
 * @default t
 * @desc Button for open or close on map tasks window
 * 
 * @param menuCommandText
 * @parent isNeedMenuCommand:b
 * @text Command title
 * @default Quests
 * @desc Title for open quests journal menu command
 * 
 * @param autoComplete:b
 * @type boolean
 * @text Auto Complete
 * @default false
 * @desc Is auto complete quest if all tasks is completed?
 * 
 * @param spacer|visualSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettings
 * @text Visual Settings
 * 
 * @param questJournalBackground:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Background Position
 * @default {"x":"(Graphics.width / 2) - 408","y":"(Graphics.height / 2) - 312"}
 * @desc Journal background image (JournalBackground.png) position
 * 
 * @param questJournalLine:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Separate Line Position
 * @default {"x":"234","y":"140"}
 * @desc Separate line (Line.png) between quests lists and description position
 * 
 * @param questsListSettings:struct
 * @parent visualSettings
 * @text Quests List
 * @type struct<QuestsList>
 * @desc Quests List visual settings
 * @default {"position:struct":"{\"x\":\"20\",\"y\":\"176\"}","height:int":"360","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"200\\\",\\\"h\\\":\\\"36\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questsListCursor:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Cursor Margins
 * @default {"x":"186","y":"18"}
 * @desc Cursor (Quest_Selected.png) margins relative list item
 * 
 * @param questsListActive:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Active Icon Margins
 * @default {"x":"186","y":"18"}
 * @desc Active quest icon (Quest_Active.png) margins relative list item
 * 
 * @param questsListNewMark:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text New Quest Mark Margins
 * @default {"x":"2","y":"0"}
 * @desc [PRO] New quest mark (Quest_New.png) margins relative list item
 * 
 * @param questHeaderSettings:struct
 * @text Name Settings
 * @parent visualSettings
 * @type struct<QuestHeader>
 * @desc Quest Header (name) text settings
 * @default {"position:struct":"{\"x\":\"386\",\"y\":\"100\"}","position2:struct":"{\"x\":\"250\",\"y\":\"80\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"256\\\",\\\"h\\\":\\\"84\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questDescSettings:struct
 * @text Description Settings
 * @parent visualSettings
 * @type struct<QuestDesc>
 * @desc Quest Description text settings
 * @default {"position:struct":"{\"x\":\"270\",\"y\":\"160\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"460\\\",\\\"h\\\":\\\"140\\\"}\",\"face:str\":\"\",\"size:int\":\"14\"}"}
 * 
 * @param questTaskHeaderSettings:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Tasks Header
 * @default {"x":"230","y":"300"}
 * @desc Tasks header image position (tasksHeader.png)
 * 
 * @param questGroupButtonA:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group A
 * @default {"x":"30","y":"80"}
 * @desc Currents quests group button position
 * 
 * @param questGroupButtonB:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group B
 * @default {"x":"140","y":"80"}
 * @desc Completed quests group button position
 * 
 * @param questsTasksSettings:struct
 * @parent visualSettings
 * @type struct<QuestTask>
 * @text Tasks texts settings
 * @default {"positions:structA":"[\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"340\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"370\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"400\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"430\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"460\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"490\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"520\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"550\\\"}\"]","position:struct":"{\"x\":\"-24\",\"y\":\"4\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"420\\\",\\\"h\\\":\\\"60\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * @desc Quest tasks texts settings
 * 
 * @param questJournalActiveHelp:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Activate help
 * @default {"x":"36","y":"Graphics.height - 56"}
 * @desc Set active quest help image (ActiveHelp.png) position
 * 
 * @param visualPointers:structA
 * @parent visualSettings
 * @type struct<VPointer>[]
 * @text Map Pointers
 * @default ["{\"image\":\"QuestArrow_A\",\"color:color\":\"#bfcc2f\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#277fc2\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#c7205d\"}"]
 * @desc Pointers for each active quest. (Pro only) -> pointers Count = Max. active quests
 * 
 * @param journalNotifyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Notify settings
 * @default {"x":"Graphics.width / 2 - 200","y":"32"}
 * @desc Notify image (questJournalUpdated.png) position on screen
 * 
 * @param questDifficultyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Difficulty settings
 * @default {"x":"Graphics.width - 104","y":"85"}
 * @desc [PRO] Active quest difficulty image (questDiff_X.png) position
 * 
 * @param spacer|mapTasksList @text‏‏‎ ‎@desc ===============================================
 * 
 * @param tasksListActive:bool
 * @type boolean
 * @text Tasks List?
 * @default true
 * @desc Show tasks list window on Map ?
 * 
 * @param tasksListSettings:struct
 * @parent tasksListActive:bool
 * @type struct<MapTasksList>
 * @text Settings
 * @default {"windowSettings":"","position:s":"{\"x:int\":\"0\",\"y:int\":\"192\"}","closeButtonPosition:s":"{\"x:int\":\"221\",\"y:int\":\"0\"}","closingDirection:str":"left","unhoveredOpacity:i":"160","windowWidth:i":"220","maxQuestsCount:i":"4","questHeight:i":"60","dynamicSize:b":"true","questsSettings":"","emptyListText:str":"No active quests","questInListFontSize:i":"13","beforeTask:str":"-\\}\\}","questsShowMode:str":"active"}
 * @desc Map tasks list window settings
 * 
 * 
 * 
 */
/*:ru
 * @plugindesc (v.1.4)[PRO] Журнал заданий
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/simple-quests-system
 *
 * 
 * @help
 * ---------------------------------------------------------------------------
 * Плагин добавляет простой журнал заданий и систему указателей на цель задания
 *
 * Квесты создаются через параметры плагина, каждый квест должен иметь
 * уникальный ID
 *
 * Вызовы скриптов:
 * SQSM.OpenQuestJournal(); - открыть журнал

 * SQSM.AddQuest(ID); - добавить квест в журнал по ID
 *      (все ID должны быть в кавычках "" )
 * SQSM.ShowDescriptionForQuest(ID, INDEX)
 *      (Отобразить описание для квеста, INDEX - номер описания)
 * SQSM.ShowTaskForQuest(ID, INDEX)
 *      (Отобрзатиь задачу для квеста)
 * SQSM.ShowAllTasksForQuest(ID); - показать все задачи для квеста
 * SQSM.CompleteTaskForQuest(ID, INDEX); - выполнить задачу для квеста
 * SQSM.CompletQuest(ID); - выполнить квест
 * SQSM.Reset(ID); - удалить квест (и сбросить прогресс)
       
 * 
 * SQSM.SetActiveQuest(ID, true \ false)
 *      Сделать квест активным (система указателей будет работать), не активным
 *
 * SQSM.isQuestComplete(ID) - Возвращает истину, если квест ID выполнен
 * SQSM.isQuestVisible(ID) - Возвращает истину, если квест ID добавлен в журнал
 * SQSM.isQuestActive(ID) - Возвращает истину, если квест ID активен
 
 * SQSM.RefreshMapQuestsList() - принудительно обновить список заданий (на карте)
 * SQSM.ShowMapQuestsList() - показать список заданий на карте
 * SQSM.HideMapQuestsList() - скрыть список заданий на карте

 * Команд плагина нет
 * 
 * Визуальные настройки редактируются через параметры плагина
 * Изображения (можно редактировать) тут: img\pSQSystem
 * ---------------------------------------------------------------------------
 *
  *
 * Если Вам нравятся мои плагины и Вы хотите получить ещё больше
 * контента, Вы можете поддержать меня на Boosty
 * 
 * Boosty page:
 *     https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * Плагин содержит графику от Екатерины Стадниковой
 * https://stadnikova-ekaterina.itch.io/
 *
  *
 * 
 * @requiredAssets img/pSQSystem/ActiveHelp
 * @requiredAssets img/pSQSystem/Cat_All_00
 * @requiredAssets img/pSQSystem/Cat_All_01
 * @requiredAssets img/pSQSystem/Cat_All_03
 * @requiredAssets img/pSQSystem/windowFrame
 * @requiredAssets img/pSQSystem/windowOpenButton_00
 * @requiredAssets img/pSQSystem/windowOpenButton_01
 * @requiredAssets img/pSQSystem/headerLine
 * @requiredAssets img/pSQSystem/windowCloseButton_00
 * @requiredAssets img/pSQSystem/windowCloseButton_01
 *

 * @param sqsQuests:structA
 * @text Quests
 * @type struct<Quest>[]
 * @default []
 * @desc Quests
 * 
 * @param sqsPointers:structA
 * @text Pointers
 * @type struct<Pointer>[]
 * @default []
 * @desc Указатели для квестов
 * 
 * 
 * @param isUseAutoNavigation:b
 * @text Auto Navigation
 * @type boolean
 * @default false
 * @desc Исп. авто. навигацию?
 * 
 * @param sqsNavigation:structA
 * @parent isUseAutoNavigation:b
 * @text Navigation
 * @type struct<NavigatorPathToMap>[]
 * @default []
 * @desc Настройки переходов между картами, для автонавигации указателя задачи
 * 
 * @param sqsNavigationIgnore:intA
 * @parent isUseAutoNavigation:b
 * @text Ignore Maps
 * @type number[]
 * @default []
 * @desc ID карт, на который автонавигация не будет работать (исключения)
 * 
 * @param sqsQuestsCategories:structA
 * @text Categories
 * @type struct<CategoryButton>[]
 * @default ["{\"position:struct\":\"{\\\"x\\\":\\\"250\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_All_00\\\",\\\"hover\\\":\\\"Cat_All_01\\\",\\\"disabled\\\":\\\"Cat_All_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Main\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Main_00\\\",\\\"hover\\\":\\\"Cat_Main_01\\\",\\\"disabled\\\":\\\"Cat_Main_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"510\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Side\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Side_00\\\",\\\"hover\\\":\\\"Cat_Side_01\\\",\\\"disabled\\\":\\\"Cat_Side_03\\\"}\"}","{\"position:struct\":\"{\\\"x\\\":\\\"630\\\",\\\"y\\\":\\\"Graphics.height - 56\\\"}\",\"categoryId\":\"Other\",\"buttonImage:struct\":\"{\\\"main\\\":\\\"Cat_Other_00\\\",\\\"hover\\\":\\\"Cat_Other_01\\\",\\\"disabled\\\":\\\"Cat_Other_03\\\"}\"}"]
 * @desc [PRO] Категории квестов
 * 
 * @param isNeedMenuCommand:b
 * @type boolean
 * @text Command in menu?
 * @on Добавить
 * @off Нет
 * @default true
 * @desc Добавить команду открыть журнал в игровое меню?
 * 
 * @param isSortByNew:b
 * @type boolean
 * @text New quests first
 * @on Yes
 * @off No
 * @default false
 * @desc Если ВКЛ. то новые квесты всегда будут вверху списка
 * 
 * @param isSortByActive:b
 * @type boolean
 * @text Active quests first
 * @on Yes
 * @off No
 * @default false
 * @desc Если ВКЛ. то активные квесты всегда будут вверху списка
 * 
 * @param buttonForOpenJournal
 * @type text
 * @text Open Journal Button
 * @default j
 * @desc Кнопка для открытия журнала заданий
 * 
 * @param buttonForOpenTasksWindow
 * @type text
 * @text Button for Tasks Window
 * @default t
 * @desc Кнопка для открытия или закрытия окошка с заданиями (на карте)
 * 
 * @param menuCommandText
 * @parent isNeedMenuCommand:b
 * @text Command title
 * @default Журнал
 * @desc Заголовок команды в меню
 * 
 * @param autoComplete:b
 * @type boolean
 * @text Auto Complete
 * @default false
 * @desc Автоматически помечать квест выполненным, если все задачи выполнены
 * 
 * @param spacer|visualSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettings
 * @text Внешний вид журнала
 * 
 * @param questJournalBackground:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Background Position
 * @default {"x":"(Graphics.width / 2) - 408","y":"(Graphics.height / 2) - 312"}
 * @desc Позиция картинки задника (JournalBackground.png)
 * 
 * @param questJournalLine:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Separate Line Position
 * @default {"x":"234","y":"140"}
 * @desc Позиция линии (Line.png) разделителя
 * 
 * @param questsListSettings:struct
 * @parent visualSettings
 * @text Quests List
 * @type struct<QuestsList>
 * @desc Визуальные настройки списка квестов
 * @default {"position:struct":"{\"x\":\"20\",\"y\":\"176\"}","height:int":"360","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"200\\\",\\\"h\\\":\\\"36\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questsListCursor:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Cursor Margins
 * @default {"x":"186","y":"18"}
 * @desc Смещение курсора (Quest_Selected.png)
 * 
 * @param questsListActive:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text Active Icon Margins
 * @default {"x":"186","y":"18"}
 * @desc Смещение иконки (Quest_Active.png) активного квеста
 * 
 * @param questsListNewMark:struct
 * @parent questsListSettings:struct
 * @type struct<XY2>
 * @text New Quest Mark Margins
 * @default {"x":"2","y":"0"}
 * @desc [PRO] Смещение иконки (Quest_New.png) нового квеста
 * 
 * @param questHeaderSettings:struct
 * @text Name Settings
 * @parent visualSettings
 * @type struct<QuestHeader>
 * @desc Настройки заголовка (названия) квеста
 * @default {"position:struct":"{\"x\":\"386\",\"y\":\"100\"}","position2:struct":"{\"x\":\"250\",\"y\":\"80\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"256\\\",\\\"h\\\":\\\"84\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * 
 * @param questDescSettings:struct
 * @text Description Settings
 * @parent visualSettings
 * @type struct<QuestDesc>
 * @desc Настройки текста описания квеста
 * @default {"position:struct":"{\"x\":\"270\",\"y\":\"160\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"460\\\",\\\"h\\\":\\\"140\\\"}\",\"face:str\":\"\",\"size:int\":\"14\"}"}
 * 
 * @param questTaskHeaderSettings:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Tasks Header
 * @default {"x":"230","y":"300"}
 * @desc Позиция заголовка задач (tasksHeader.png)
 * 
 * @param questGroupButtonA:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group A
 * @default {"x":"30","y":"80"}
 * @desc Позиция кнопки текущих квестов
 * 
 * @param questGroupButtonB:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Button Group B
 * @default {"x":"140","y":"80"}
 * @desc Позиция кнопки выполненных квестов
 * 
 * @param questsTasksSettings:struct
 * @parent visualSettings
 * @type struct<QuestTask>
 * @text Tasks texts settings
 * @default {"positions:structA":"[\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"340\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"370\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"400\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"430\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"460\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"490\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"520\\\"}\",\"{\\\"x\\\":\\\"270\\\",\\\"y\\\":\\\"550\\\"}\"]","position:struct":"{\"x\":\"-24\",\"y\":\"4\"}","textLine:struct":"{\"lineSize:struct\":\"{\\\"w\\\":\\\"420\\\",\\\"h\\\":\\\"60\\\"}\",\"face:str\":\"\",\"size:int\":\"20\"}"}
 * @desc Настройки текста задачи квеста
 * 
 * @param questJournalActiveHelp:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Activate help
 * @default {"x":"36","y":"Graphics.height - 56"}
 * @desc Позация изображения подсказки (ActiveHelp.png) установки активного квеста
 * 
 * @param visualPointers:structA
 * @parent visualSettings
 * @type struct<VPointer>[]
 * @text Map Pointers
 * @default ["{\"image\":\"QuestArrow_A\",\"color:color\":\"#bfcc2f\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#277fc2\"}","{\"image\":\"QuestArrow_A\",\"color:color\":\"#c7205d\"}"]
 * @desc Указатели (Pro only) -> Число указателей = макс. возможному числу активных квестов
 * 
 * @param journalNotifyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Notify settings
 * @default {"x":"Graphics.width / 2 - 200","y":"32"}
 * @desc Позиция изображения уведомления (questJournalUpdated.png)
 * 
 * @param questDifficultyPosition:struct
 * @parent visualSettings
 * @type struct<XY2>
 * @text Difficulty settings
 * @default {"x":"Graphics.width - 104","y":"85"}
 * @desc [PRO] Позиция изображения сложности (questDiff_X.png) квеста
 * 
 * @param spacer|mapTasksList @text‏‏‎ ‎@desc ===============================================
 * 
 * @param tasksListActive:bool
 * @type boolean
 * @text Tasks List?
 * @default true
 * @desc Показывать список активных квестов и заданий на карте?
 * 
 * @param tasksListSettings:struct
 * @parent tasksListActive:bool
 * @type struct<MapTasksList>
 * @text Settings
 * @default {"windowSettings":"","position:s":"{\"x:int\":\"0\",\"y:int\":\"192\"}","closeButtonPosition:s":"{\"x:int\":\"221\",\"y:int\":\"0\"}","closingDirection:str":"left","unhoveredOpacity:i":"160","windowWidth:i":"220","maxQuestsCount:i":"4","questHeight:i":"60","dynamicSize:b":"true","questsSettings":"","emptyListText:str":"No active quests","questInListFontSize:i":"13","beforeTask:str":"-\\}\\}","questsShowMode:str":"active"}
 * @desc Настройки окна со списком заданий
 * 
 * 
 */
/*~struct~Quest:
 * @param id
 * @text ID
 * @default myQuest
 * @desc Unique ID for quest
  
 * @param title
 * @text Name
 * @default New Quest
 * @desc Full quest name for description

 * @param titleForList
 * @text Name for list
 * @default New Quest
 * @desc Quest name for quests list

 * @param titleImage
 * @text Title image
 * @type file
 * @dir img/pSQSystem 
 * @default questTitle
 * @require 1
 * @desc Title image for quest name (in description)

 * @param tasks:strA
 * @text Tasks
 * @type text[]
 * @default ["First task"]
 * @desc Tasks list for quest (should be at least one task)

 * @param descriptions:strA
 * @text Descriptions
 * @type note[]
 * @default ["This is example quest"]
 * @desc Descriptions list for quest (should be at least one)
 *
 * @param priority:int
 * @text Priority
 * @type number
 * @default 0
 * @desc Quest priority in list. More priority value -> more upper in quests list
 
 * @param difficulty:int
 * @text Difficulty
 * @type number
 * @default 0
 * @min 0
 * @desc [PRO] 0 - no difficulty. Value from 1 to X will show difficulty (questDiff_X image from img/pSQSSystem)

 * @param categoryId
 * @text Category ID
 * @default
 * @desc Quest category ID

 * @param onCompleted:int
 * @text On Completed CE
 * @default 0
 * @type common_event
 * @desc Common event called when this quest is completed. 0 - nothing
*/

/*~struct~Pointer:
 * @param questId
 * @text Quest ID
 * @default myQuest
 * @desc Quest ID (for which the Pointer is)

 * @param pointsData:structA
 * @text Tasks Pointers
 * @type struct<TaskPointer>[]
 * @default []
 * @desc Pointers for each quest task (optional per task)
*/

/*~struct~TaskPointer:
* @param taskIndex:int
* @text Task Index
* @type number
* @default 1
* @min 1
* @desc Quest task index (for wich current Pointer is)

* @param points:structA
* @text Map Points
* @type struct<MapPoint>[]
* @default []
* @desc What event should the pointer point for this task on a certain map?
*/

/*~struct~MapPoint:
* @param mapId:int
* @text Map ID
* @type number
* @default 1
* @min 1

* @param evId:int
* @text Event ID
* @type number
* @default 1
* @min 1
* @desc Task goal event on this map
*/

/*~struct~QuestsList:
* @param position:struct
* @type struct<XY2>
* @text Position
* @default {"x":"20","y":"120"}
* @desc Quests list position

* @param height:int
* @text List height
* @type number
* @default 360
* @min 40
* @desc Quests list height in pixels (Width settings see in List Item settings)

* @param textLine:struct
* @type struct<TextLine>
* @text List Item
* @default {"lineSize:struct":"{\"w\":\"200\",\"h\":\"36\"}","face:str":"","size:int":"20"}
* @desc List item (quest name in list) settings
*/

/*~struct~QuestHeader:
* @param position:struct
* @type struct<XY2>
* @text Text Position
* @default {"x":"356","y":"100"}
* @desc Quest Name Position

* @param position2:struct
* @type struct<XY2>
* @text Image Position
* @default {"x":"220","y":"80"}
* @desc Quest title image position

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"256\",\"h\":\"80\"}","face:str":"","size:int":"20"}
* @desc Quest Name text box settings
*/

/*~struct~QuestDesc:
* @param position:struct
* @type struct<XY2>
* @text Text Position
* @default {"x":"240","y":"160"}
* @desc Quest Description Position

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"460\",\"h\":\"140\"}","face:str":"","size:int":"14"}
* @desc Quest Description text box settings
*/

/*~struct~QuestTask:
* @param positions:structA
* @type struct<XY2>[]
* @text Positions
* @default []
* @desc Positions for each task

* @param position:struct
* @type struct<XY2>
* @text Status Icon
* @default {"x":"-22","y":"4"}
* @desc Task status icon position (relative task text)

* @param textLine:struct
* @type struct<TextLine>
* @text Text Settings
* @default {"lineSize:struct":"{\"w\":\"420\",\"h\":\"60\"}","face:str":"","size:int":"20"}
* @desc Task text box settings
*/

/*~struct~TextLine:
* @param lineSize:struct
* @type struct<WH2>
* @text Line Size
* @default {"w":"200","h":"36"}
* @desc Text block size (width and height)

* @param face:str
* @text Font Face
* @default
* @desc Font face from fonts folder (your game should support custom fonts)
*
* @param size:int
* @text Font Size
* @type number
* @default 24
* @min 1
*/

/*~struct~CategoryButton:
* @param position:struct
* @type struct<XY2>
* @text Position
* @default {"x":"0","y":"0"}
* @desc Category button positon

* @param categoryId
* @text Category ID
* @default 
* @desc Category ID for show only quests with same Category ID (empty - all quests)

* @param buttonImage:struct
* @text Image Name
* @type struct<ButtonStates>
* @default {"main":"","hover":"","disabled":""}
* @desc [Required] Images for category button
*/

/*~struct~ButtonStates:
 * @param main
 * @text Main
 * @default
 * @desc Button image
 * @type file
 * @dir img/pSQSystem 
 * @require 1

 * @param hover
 * @text Hovered
 * @default
 * @desc Button image when hovered by cursor
 * @type file
 * @dir img/pSQSystem 
 * @require 1

 * @param disabled
 * @text Selected
 * @default
 * @desc Button image when selected
 * @type file
 * @dir img/pSQSystem 
 * @require 1
*/

 
/*~struct~XY2:
 * @param x
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

/*~struct~WH2:
 * @param w
 * @text W
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param h
 * @text H
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

/*~struct~VPointer:
 * @param image
 * @text Image
 * @default QuestArrow_A
 * @desc Pointer arrow image
 * @type file
 * @dir img/pSQSystem 
 * @require 1
  
 * @param color:color
 * @text Color
 * @default #FFFFFF
 * @desc Arrow blend color (optional) in HEX
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

/*~struct~MapTasksList:

 @param windowSettings
 @text Window settings

 @param position:s
 @parent windowSettings
 @text Position
 @type struct<XY> 
 @desc Tasks list window position on screen
 @default

 @param closeButtonPosition:s
 @parent windowSettings
 @text Button Pos
 @type struct<XY> 
 @desc Close (open) button position relative window
 @default {} 

 @param closingDirection:str
 @parent windowSettings
 @text Close dir
 @type select
 @option left
 @option right
 @desc Closing animation direction
 @default left 

 @param unhoveredOpacity:i
 @parent windowSettings
 @text No focus opacity
 @type number 
 @min 0
 @max 255
 @desc Window opacity when it's not in focuse (not under cursor)
 @default 160 

 @param windowWidth:i
 @parent windowSettings
 @text Width
 @type number 
 @min 0
 @max 100
 @desc Window width (in PX)
 @default 220 

 @param maxQuestsCount:i
 @parent windowSettings
 @text Max visible quests
 @type number 
 @min 1
 @desc Max visible quests before scroll
 @default 4 

 @param questHeight:i
 @parent maxQuestsCount:i
 @text Height
 @type number 
 @desc Quest line height (in PX)
 @default 60 

 @param dynamicSize:b
 @parent maxQuestsCount:i
 @text Is dynamic height?
 @type boolean 
 @on Yes
 @off No
 @desc If true - window will change height dynamically (depends on quests count)
 @default true 

 @param questsSettings
 @text Quests and Tasks

 @param emptyListText:str
 @parent questsSettings
 @text Empty Text
 @type text 
 @desc Text when no any quests in list
 @default No active quests 

 @param questInListFontSize:i
 @parent questsSettings
 @text Font Size
 @type number 
 @min 4
 @desc Font size for quest name text
 @default 13 

 @param beforeTask:str
 @parent questsSettings
 @text Append
 @type text 
 @desc This text will be append before each quests task (supports control characters)
 @default -\}\} 

 @param questsShowMode:str
 @text Mode
 @type select 
 @option active
 @option all
 @desc What quests show in list? Active only or all
 @default active 
*/


/*~struct~NavigatorPathToMap:
* @param mapId:int
* @text Destination Map ID
* @type number
* @default 1
* @min 1

* @param links:structA
* @text Links
* @type struct<LinkFromMap>[]
* @default []
* @desc Maps from which we can get to Destination map
*/

/*~struct~LinkFromMap:
* @param mapId:int
* @text Map ID (From)
* @type number
* @default 1
* @min 1

* @param evId:int
* @text Event ID
* @type number
* @default 1
* @min 1
* @desc Event, that transfer player from this Map to Destination Map
*/


// * MAIN

var Imported = Imported || {};
Imported.PKD_SQS = true;

var PKD_SQS = {};
PKD_SQS.version = 14;

PKD_SQS.link = function (library) {
    this[library.name] = library;
};

// * For parameters
PKD_SQS.PP = {};

window.SQOpenQuestJournal = function() {
    try {
        window.SQSM.OpenQuestJournal();
    } catch (e) {
        console.warn(e);
    }
};

window.SQOpenOrHideTasksWindow = function() {
    try {
        window.SQSM.SwitchOpenedClosedStateOfQuestsList();
    } catch (e) {
        console.warn(e);
    }
};


// * PP to H file

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

//?rev 08.12.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.2';

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
  return Array.prototype.getByField = function(field, value) {
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
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
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

      update() {
        super.update();
        this._updateOpChanger();
        return this.updateTooltip();
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
      if (TouchInput.isTriggered() && this.isMouseIn()) {
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
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
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
      return this.visible = this.params.visible;
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
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
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

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 08.12.2022

(function(){

    //TODO: Вынести в KDCore

    // EXAMPLE:
    //var People = [
    //    {Name:"AAA", Surname:"ZZZ"},
    //    {Name: "Name", Surname: "AAA"}
    //];
    //People.sort(dynamicSort("Surname"));
    //People.sort(dynamicSort("-Surname"));
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }

    KDCore.Utils.dynamicSort = dynamicSort; 

})();

(function(){
    
    PKD_SQS.LoadPluginSettings = () => {

        PKD_SQS.PP._loader = new KDCore.ParamLoader("sqsQuests:structA");

        /*if(KDCore.isMZ())
            RegisterPluginCommnadsMZ();
        else {
            RegisterPluginCommandsMV();
        }*/
        
    };

})();

(function(){
    
    const patch = function(){
        
            if(!Window_SQSQuestsList) return;

            // * В MV в этом методе позиция присваивается
            Window_SQSQuestsList.prototype._refreshCursor = function() {
                if(!KDCore.isMV()) return;
                var pad = this._padding;
                var x = this._cursorRect.x + pad - this.origin.x;
                var y = this._cursorRect.y + pad - this.origin.y;
                var w = this._cursorRect.width;
                var h = this._cursorRect.height;
                var m = 4;
                var x2 = Math.max(x, pad);
                var y2 = Math.max(y, pad);
                var ox = x - x2;
                var oy = y - y2;
                var w2 = Math.min(w, this._width - pad - x2);
                var h2 = Math.min(h, this._height - pad - y2);
                var bitmap = new Bitmap(w2, h2);

                this._windowCursorSprite.bitmap = bitmap;
                this._windowCursorSprite.setFrame(0, 0, w2, h2);
                this._windowCursorSprite.move(x2, y2);
        };

    };

    setTimeout(() => {
        patch();
    }, 100);

})();

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_SQS.LoadPluginSettings();
        _alias_DataManager_loadDatabase.call(this);
    };

})();

(function(){
    
    ImageManager.loadPKDSQS = function (filename) {
        return this.loadBitmap('img/pSQSystem/', filename, 0, false);
    };

})();

// Generated by CoffeeScript 2.5.1
// * Общий класс для всех UI элементов
//? FROM AABSZ (rev 13.10.20), modified
(function() {
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
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
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
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_SQS.Sprite_UIElement) {
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
          if (child instanceof PKD_SQS.Sprite_UIElement) {
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
    Sprite_UIElement.RootImageFolder = "pSQSystem";

    return Sprite_UIElement;

  }).call(this);
  PKD_SQS.link(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_SQS.Sprite_UIElement.prototype;
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
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Plugin Paramters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SQS.PP;
  _.isNeedCommandInMenu = function() {
    return _._loader.getParam("isNeedMenuCommand", true);
  };
  _.isSortByNew = function() {
    return _._loader.getParam("isSortByNew", false);
  };
  _.isSortByActive = function() {
    return _._loader.getParam("isSortByActive", false);
  };
  _.menuCommandText = function() {
    return _._loader.getParam("menuCommandText", "Quests");
  };
  _.getQuestNotifyPosition = function() {
    return _._loader.getParam("journalNotifyPosition", {});
  };
  _.getQuestListWindowSettings = function() {
    return _._loader.getParam("questsListSettings", {});
  };
  _.getQuestHeaderSettings = function() {
    return _._loader.getParam("questHeaderSettings", {});
  };
  _.getQuestDescSettings = function() {
    return _._loader.getParam("questDescSettings", {});
  };
  _.getQuestTasksHeaderSettings = function() {
    return _._loader.getParam("questTaskHeaderSettings", {});
  };
  _.getGroupButtonA = function() {
    return _._loader.getParam("questGroupButtonA", {});
  };
  _.getGroupButtonB = function() {
    return _._loader.getParam("questGroupButtonB", {});
  };
  _.getQuestTasksSettings = function() {
    return _._loader.getParam("questsTasksSettings", {});
  };
  _.getQuestsArrows = function() {
    return _._loader.getParam("visualPointers", []);
  };
  _.getQuestListCursorMargins = function() {
    return _._loader.getParam("questsListCursor", {});
  };
  _.getQuestListActiveIconMargins = function() {
    return _._loader.getParam("questsListActive", {});
  };
  _.getQuestJournalBackImgPosition = function() {
    return _._loader.getParam("questJournalBackground", {});
  };
  _.getQuestActiveHelpImgPosition = function() {
    return _._loader.getParam("questJournalActiveHelp", {});
  };
  _.getQuestJournalSeparateLinePosition = function() {
    return _._loader.getParam("questJournalLine", {});
  };
  _.getQuestListNewMarkMargins = function() {
    return _._loader.getParam("questsListNewMark", {
      x: 2,
      y: 0
    });
  };
  _.getQuestJournalOpenButton = function() {
    return _._loader.getParam("buttonForOpenJournal", "j");
  };
  _.getTasksWindowOpenButton = function() {
    return _._loader.getParam("buttonForOpenTasksWindow", "t");
  };
  _.getDifficultyLevelSettings = function() {
    return _._loader.getParam("questDifficultyPosition", {
      x: "Graphics.width - 104",
      y: 85
    });
  };
  // * Это было добавлено с обновлением, поэтому параметров может и не быть, возвращаем null
  _.getQuestsCategories = function() {
    return _._loader.getParam("sqsQuestsCategories", null);
  };
  _.createAllQuests = function() {
    var i, len, q, quests, questsRaw;
    questsRaw = _._loader.getParam("sqsQuests", []);
    quests = [];
    for (i = 0, len = questsRaw.length; i < len; i++) {
      q = questsRaw[i];
      quests.push(new SQS_Quest(q));
    }
    return quests;
  };
  _.createAllPoints = function() {
    var i, len, p, points, questsPointsRaw;
    questsPointsRaw = _._loader.getParam("sqsPointers", []);
    points = [];
    for (i = 0, len = questsPointsRaw.length; i < len; i++) {
      p = questsPointsRaw[i];
      points.push(new SQS_Points(p));
    }
    return points;
  };
  _.isTasksWindowActive = function() {
    return _._loader.getParam("tasksListActive", true);
  };
  _.tasksListSettings = function() {
    return _._loader.getParam("tasksListSettings", {
      position: {
        x: 0,
        y: 192
      },
      closeButtonPosition: {
        x: 221,
        y: 0
      },
      closingDirection: 'left',
      unhoveredOpacity: 160,
      windowWidth: 220,
      questHeight: 60,
      maxQuestsCount: 4,
      dynamicSize: true,
      emptyListText: "No active quests",
      questInListFontSize: 13,
      beforeTask: "-\\}\\}",
      questsShowMode: "active" // * all
    });
  };
  _.isAutoCompleteQuests = function() {
    return _._loader.getParam("autoComplete", false);
  };
  _.navigationData = function() {
    return _._loader.getParam("sqsNavigation", []);
  };
  _.ignoredAutoNavigationMaps = function() {
    return _._loader.getParam("sqsNavigationIgnore", []);
  };
  _.isUseAutoNavigation = function() {
    return _._loader.getParam("isUseAutoNavigation", false);
  };
})();

// ■ END Plugin Paramters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var FWindow_SQSMapTW;

FWindow_SQSMapTW = class FWindow_SQSMapTW extends KDCore.FloatingWindow {
  constructor(parent, w, h) {
    super(parent, w, h, {
      draggable: false,
      closeButton: true,
      moveToCenter: false,
      alwaysOnTop: true,
      header: false
    });
    this._isHovered = false;
    this._threads = [];
    this._moveDir === 'in';
    this.opacity = 0;
    return;
  }

  isHovered() {
    return this._isHovered === true;
  }

  open() {
    var ref;
    super.open();
    if (this.isHovered()) {
      this.startOpacityShow();
    } else {
      this.startOpacityFade();
    }
    if ((ref = this.sub()) != null) {
      ref.refresh();
    }
  }

  userSettings() {
    return PKD_SQS.PP.tasksListSettings();
  }

  rootImageFolder() {
    return "pSQSystem";
  }

  isUnderMouse() {
    var ref;
    return super.isUnderMouse() || ((ref = this._closeButton) != null ? ref.isUnderMouse() : void 0);
  }

  isInAnimation() {
    return this._moveChangerX != null;
  }

  isInOpenedState() {
    return (this._closeButton != null) && this._closeButton.visible === true;
  }

  closeButtonPosition() {
    return this.userSettings().closeButtonPosition;
  }

  refresh() {
    return this.sub().refresh();
  }

  refreshSize() {
    var itemsCount, s, totalLinesCount;
    s = this.userSettings();
    itemsCount = this.sub().maxItems();
    totalLinesCount = 1;
    if (itemsCount <= 0) {
      totalLinesCount = 1;
    } else if (itemsCount > s.maxQuestsCount) {
      totalLinesCount = s.maxQuestsCount;
    } else {
      totalLinesCount = itemsCount;
    }
    this.height = (totalLinesCount * s.questHeight) + 10;
    this._mainLayer.removeChild(this.wFrame);
    this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.height, this._frameImage);
    this._mainLayer.addChild(this.wFrame);
    //@sub().height = (@sub().itemHeight() + 8) * totalLinesCount
    if (itemsCount > 0) {
      if (KDCore.isMZ()) {
        this.sub().height = this.height + 12;
      } else {
        this.sub().height = this.height + 24;
      }
    } else {
      this.sub().height = this.height * 2;
    }
  }

  moveOut() {
    this._moveDir = 'out';
    return this.movingProcess();
  }

  movingProcess() {
    var direction, moveDest, moveDir;
    if (this._moveDir === 'in') {
      moveDir = 0;
    } else {
      moveDir = 1;
    }
    this._moveSym = "";
    moveDest = 0;
    direction = this.userSettings().closingDirection;
    switch (direction) {
      case "left":
        this._moveSym = "x";
        moveDest = [0, -this.width - 1][moveDir];
        break;
      case "right":
        this._moveSym = "x";
        moveDest = [this.x - this.width - this.closeButtonPosition().x, this.x + this.width + this.closeButtonPosition().x][moveDir];
    }
    this._moveAnimated(this._moveSym, moveDest);
  }

  _moveAnimated(symb, val) {
    var curVal;
    $gameSystem.sqsLastTasksWindowSym = this._moveDir;
    curVal = this[symb];
    if (curVal === val) {
      return;
    }
    this._moveChangerX = new KDCore.Changer(this);
    this._moveChangerX.change(symb).from(curVal).to(val).step(24);
    this._moveChangerX.done(this._onMoveDone.bind(this));
    this._threads[1] = this._moveChangerX;
    this._moveChangerX.start();
  }

  _onMoveDone() {
    this._threads[1] = null;
    this._moveChangerX = null;
    if (this._moveDir === 'out') {
      if (this.userSettings().closingDirection === "left") {
        this[this._moveSym] = -this.width + 2;
      } else {
        this[this._moveSym] = this.x - 2;
      }
      this._changeButtonTo("open");
      this._threads[0] = null;
      this.opacity = 255;
    } else {
      if (this.userSettings().closingDirection === "left") {
        this[this._moveSym] = 0;
      } else {
        this[this._moveSym] = this.userSettings().position.x;
      }
      this._changeButtonTo("close");
    }
  }

  _changeButtonTo(name) {
    if (name === 'open') {
      this._openButton.visible = true;
    } else {
      this._openButton.visible = false;
    }
    this._closeButton.visible = !this._openButton.visible;
  }

  moveIn() {
    this._moveDir = 'in';
    return this.movingProcess();
  }

  _createCustomElements() {
    var r, w;
    r = new Rectangle(-8, -4, this.width + 16, this.height + 6);
    w = new Window_SQSTasksWindowList(r);
    w.refresh();
    setTimeout((function() {
      var e;
      try {
        return w.refresh();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 10);
    this.setSubWindow(w);
    if (this.userSettings().dynamicSize === true) {
      w.setRefreshCallback(this.refreshSize.bind(this));
    }
    this._refreshOpenCloseState();
  }

  _refreshOpenCloseState() {
    if ($gameSystem.sqsLastTasksWindowSym === 'out') {
      this.moveOut();
      this._onMoveDone(); // * instant
    }
  }

  update() {
    var i, len, ref, t;
    super.update();
    if (this.isInOpenedState()) {
      this._updateOpacityOnHover();
    }
    ref = this._threads;
    for (i = 0, len = ref.length; i < len; i++) {
      t = ref[i];
      if (t != null) {
        t.update();
      }
    }
  }

  _updateOpacityOnHover() {
    if (this.isUnderMouse()) {
      if (this.isHovered()) {
        return;
      } else {
        this._isHovered = true;
        this.startOpacityShow();
      }
    } else {
      if (this.isHovered()) {
        this._isHovered = false;
        this.startOpacityFade();
      }
    }
  }

  startOpacityShow() {
    var opacity;
    if (this.userSettings().unhoveredOpacity === 255) {
      return;
    }
    this._opChanger = new KDCore.Changer(this);
    opacity = this.opacity;
    this._opChanger.change('opacity').from(opacity).to(255).step(15).start();
    this._threads[0] = this._opChanger;
  }

  startOpacityFade() {
    var finale, opacity;
    if (this.userSettings().unhoveredOpacity === 255) {
      return;
    }
    this._opChanger = new KDCore.Changer(this);
    opacity = this.opacity;
    finale = this.userSettings().unhoveredOpacity;
    this._opChanger.change('opacity').from(opacity).to(finale).step(10).start();
    this._threads[0] = this._opChanger;
  }

  
    //$[OVER]
  _closeButtonClick() {
    if (this.isInAnimation()) {
      return;
    }
    $gameTemp.kdButtonUnderMouse = null;
    this.callCloseHandler();
    if (this._moveDir === 'out') {
      this.moveIn();
    } else {
      this.moveOut();
    }
  }

  _createCloseButton() {
    super._createCloseButton();
    this._openButton = new KDCore.ButtonM("windowOpenButton", false, this.rootImageFolder());
    this._closeButtonLayer.addChild(this._openButton);
    this._openButton.move(this.closeButtonPosition());
    this._openButton.addClickHandler(this._closeButtonClick.bind(this));
    this._openButton.visible = false;
  }

  _createWindow(img) {
    this._frameImage = img;
    return KDCore.FloatingWindow.prototype._createWindow.call(this, img);
  }

};


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.sqGetQuestsData = function() {
    if (this.sqQData == null) {
      this.sqQData = new SQS_Keep();
    }
    return this.sqQData;
  };
  // * Перенёс в Game_Temp, чтобы пересоздавались после загрузки игры из сохранения
  _.sqGetAllQuests = function() {
    if ($gameTemp.sqQuests == null) {
      $gameTemp.sqQuests = PKD_SQS.PP.createAllQuests();
    }
    return $gameTemp.sqQuests;
  };
  _.sqGetAllPoints = function() {
    if ($gameTemp.sqPoints == null) {
      $gameTemp.sqPoints = PKD_SQS.PP.createAllPoints();
    }
    return $gameTemp.sqPoints;
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    SQSM.init(); //?
    this.loadSQSPoints();
    this.loadSQSOpenButton();
    if (!$gameSystem._sqsIsTaskWindowDisabled) {
      this.loadSQSTasksWindow();
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    return this.updateSQSOpenByButton();
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
  _.loadSQSOpenButton = function() {
    this.sqsOpenButton = PKD_SQS.PP.getQuestJournalOpenButton();
    this.sqsOpenTasksWindow = PKD_SQS.PP.getTasksWindowOpenButton();
    if (String.any(this.sqsOpenButton) || String.any(this.sqsOpenTasksWindow)) {
      this.updateSQSOpenByButton = this.updateSQSOpenByButtonBody;
    }
  };
  //?DYNAMIC
  _.updateSQSOpenByButton = function() {}; // * EMPTY
  _.updateSQSOpenByButtonBody = function() {
    if ($gameMessage.isBusy()) {
      return;
    }
    if ($gameMap.isEventRunning()) {
      return;
    }
    if ((this.sqsOpenButton != null) && Input.isTriggered(this.sqsOpenButton)) {
      SQOpenQuestJournal();
      return;
    }
    if ((this.sqsOpenTasksWindow != null) && Input.isTriggered(this.sqsOpenTasksWindow)) {
      SQOpenOrHideTasksWindow();
      return;
    }
  };
  _.loadSQSPoints = function() {
    var activeQuests, arrowData, arrows, i, len, q, qIndex, questsWithPoints;
    this._spriteset.sqClearQuestNavigator();
    activeQuests = SQSM.getActiveQuests();
    if (activeQuests.length === 0) {
      return;
    }
    questsWithPoints = activeQuests.filter(function(q) {
      return SQSM.isQuestHavePoints(q.id);
    });
    //console.info questsWithPoints
    // * Каждая стрелка имеет свой индекс
    // * Каждому активному квесту соответствует своя стрелка (по индексу)
    arrows = SQSM.getQuestsArrows();
    for (i = 0, len = questsWithPoints.length; i < len; i++) {
      q = questsWithPoints[i];
      qIndex = SQSM.getQuestActiveIndex(q.id);
      if (qIndex >= 0) {
        arrowData = arrows[qIndex];
        if (arrowData != null) {
          this._createSQSArrowsForQuest(q, arrowData);
        }
      }
    }
  };
  _._createSQSArrowsForQuest = function(quest, arrowData) {
    var i, len, point, points, task, tasks;
    points = SQSM.getPointsForQuest(quest.id);
    if (!points.isHaveAnyPoints()) {
      return;
    }
    
    // * Текущие (не выполненные и видимые) задачи квеста, которые имеют точки
    tasks = quest.getTasksForPointers().filter(function(t) {
      return points.isHavePointsOnCurrentMap(t.index);
    });
    for (i = 0, len = tasks.length; i < len; i++) {
      task = tasks[i];
      point = points.getPointOnCurrentMap(task.index);
      this._createSQSArrowForQuestTask(point, arrowData);
    }
  };
  _._createSQSArrowForQuestTask = function(point, arrowData) {
    var plSprite, sq;
    plSprite = this._spriteset.findTargetSprite($gamePlayer);
    sq = new SQSQuestArrow(plSprite, arrowData.image, arrowData.color);
    sq.setTargetEvId(point);
    this._spriteset.sqAddOnQuestNavigator(sq);
  };
  //?{VERSION}
  _.showSQSNotify = function() {};
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
  _.sqIsTaskWindowExists = function() {
    return this._sqTasksWindow != null;
  };
  _.loadSQSTasksWindow = function() {
    var e, h, p, w;
    if (!PKD_SQS.PP.isTasksWindowActive()) {
      return;
    }
    try {
      p = PKD_SQS.PP.tasksListSettings();
      this._sqTasksWindowContainer = new Sprite();
      w = p.windowWidth;
      h = p.questHeight * p.maxQuestsCount;
      this._sqTasksWindow = new FWindow_SQSMapTW(this._sqTasksWindowContainer, w, h);
      this._sqTasksWindow.x = p.position.x;
      this._sqTasksWindow.y = p.position.y;
      this._sqTasksWindow.open();
      this.addChild(this._sqTasksWindowContainer);
      setTimeout((function() {
        return SQSM.RefreshMapQuestsList();
      }), 200);
      this.refreshSQSTaskWindowVisibility();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._sqTasksWindow = null;
    }
  };
  _.refreshSQSTaskWindowVisibility = function() {
    var ref, ref1;
    if ($gameSystem._sqsIsTaskWindowDisabled === true) {
      if ((ref = this._sqTasksWindow) != null) {
        ref.visible = false;
      }
    } else {
      if (!this.sqIsTaskWindowExists()) {
        this.loadSQSTasksWindow();
      }
      if ((ref1 = this._sqTasksWindow) != null) {
        ref1.visible = true;
      }
    }
  };
  _.tryOpenOrCloseSQSTaskWindow = function() {
    var e;
    if (!this.sqIsTaskWindowExists()) {
      return;
    }
    try {
      return this._sqTasksWindow._closeButtonClick();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //TODO:  вызывать после выполнения скриптов на модификацию тасков и квестов
  _.refreshSQSTaskWindow = function() {
    var e;
    if (!this.sqIsTaskWindowExists()) {
      return;
    }
    try {
      this._sqTasksWindow.refresh();
      this.refreshSQSTaskWindowVisibility();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCommandWindow, _;
  //@[DEFINES]
  _ = Scene_Menu.prototype;
  //@[ALIAS]
  ALIAS__createCommandWindow = _.createCommandWindow;
  _.createCommandWindow = function() {
    ALIAS__createCommandWindow.call(this);
    this._commandWindow.setHandler('sqsJournal', SQSM.OpenQuestJournal);
  };
})();

// ■ END Scene_Menu.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
var Scene_SQSJournal;

Scene_SQSJournal = class Scene_SQSJournal extends Scene_MenuBase {
  constructor() {
    super();
  }

  create() {
    super.create();
    this._createBackground();
    this._createSepLine();
    this._createWindows();
    this._createHelpText();
    return this._onGroupClick(0);
  }

  update() {
    super.update();
    this._refreshSelectedQuestInfo();
    return this._updateNavigation();
  }

  stop() {
    this.ql.clearQuestMarks();
    return super.stop();
  }

  setQuestInfo(questData) {
    this._clearQuestInfo();
    this.activeQuestData = questData;
    if (this.activeQuestData != null) {
      this._showActiveQuestData();
    }
  }

  _createBackground() {
    var backSprite, pos, x, y;
    pos = PKD_SQS.PP.getQuestJournalBackImgPosition();
    x = eval(pos.x);
    y = eval(pos.y);
    backSprite = new Sprite(ImageManager.loadPKDSQS("JournalBackground"));
    backSprite.move(x, y);
    return this.addChild(backSprite);
  }

  _createSepLine() {
    var lineSprite, pos, x, y;
    pos = PKD_SQS.PP.getQuestJournalSeparateLinePosition();
    x = eval(pos.x);
    y = eval(pos.y);
    lineSprite = new Sprite(ImageManager.loadPKDSQS("Line"));
    lineSprite.move(x, y);
    return this.addChild(lineSprite);
  }

  _createWindows() {
    this._createCategories(); //?part 2, это группы текущие \ выполненные
    this._createQuestsList();
    this._createQuestMain();
    this._createQuestsCategories(); //?part 3 [PRO only]
  }

  _createQuestsCategories() {} // * EMPTY

  _createQuestsList() {
    var params, rect, textLineSettings, x, y;
    params = PKD_SQS.PP.getQuestListWindowSettings();
    textLineSettings = {
      w: eval(params.textLine.lineSize.w),
      h: eval(params.textLine.lineSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    };
    x = eval(params.position.x);
    y = eval(params.position.y);
    rect = new Rectangle(x, y, textLineSettings.w, params.height);
    this.ql = new Window_SQSQuestsList(rect);
    this.ql.setSettings(textLineSettings);
    this.ql.setHandler('cancel', this.popScene.bind(this));
    this.ql.setHandler('ok', this.changeActiveQuest.bind(this));
    this.ql.refresh();
    this.ql.activate();
    this._refreshEmptyJournalHolder();
    this.addChild(this.ql);
  }

  changeActiveQuest() {
    var q, state;
    if (!this.ql.isCurrentItemEnabled()) {
      return;
    }
    q = this.ql.quest();
    state = SQSM.isQuestActive(q.id);
    SQSM.SetActiveQuest(q.id, !state);
    this.ql.refresh();
    this.ql.activate();
  }

  _refreshSelectedQuestInfo() {
    var newSelectedQuest;
    if (this.ql == null) {
      return;
    }
    newSelectedQuest = this.ql.quest();
    if (this._lastSelectedQuest !== newSelectedQuest) {
      this.setQuestInfo(newSelectedQuest);
      this._lastSelectedQuest = newSelectedQuest;
    }
  }

  _createHelpText() {
    var pos, x, y;
    pos = PKD_SQS.PP.getQuestActiveHelpImgPosition();
    x = eval(pos.x);
    y = eval(pos.y);
    this._activeHelp = new Sprite(ImageManager.loadPKDSQS("ActiveHelp"));
    this._activeHelp.move(x, y);
    this._activeHelp.visible = false;
    return this.addChild(this._activeHelp);
  }

  _updateNavigation() {
    if (Input.isTriggered('left') || Input.isTriggered('right')) {
      this._onSwitchGroup();
    }
  }

  _onSwitchGroup() {
    if (this.groupA.isDisabled()) {
      this._onGroupClick(1);
    } else {
      this._onGroupClick(0);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var SQSQuestArrow;

SQSQuestArrow = class SQSQuestArrow extends Sprite {
  constructor(plSprite, arrowImg, arrowColor) {
    super();
    this.plSprite = plSprite;
    this.bitmap = ImageManager.loadPKDSQS(arrowImg);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.resetAfterTarget();
    if ((arrowColor != null) || String.any(arrowColor)) {
      this.applyArrowColor(arrowColor);
    }
    return;
  }

  setTargetEvId(id) {
    if (id <= 0) {
      this.tarEv = null;
    }
    this.tarEv = $gameMap.event(id);
    this.visible = this.tarEv != null;
    if (this.tarEv != null) {
      this.distThread = new KDCore.TimedUpdate(12, this.updateDistanceToTarget.bind(this));
    } else {
      this.resetAfterTarget();
    }
  }

  resetAfterTarget() {
    this.distThread = null;
    this.resetArrowOpacity();
    return this.visible = false;
  }

  applyArrowColor(arrowColor) {
    //arrowColor = KDCore.Color.FromHex(hexColor)
    this.arrColor = [...arrowColor.ARR];
    this.arrColor[3] = 150;
    this.setBlendColor(this.arrColor);
  }

  resetArrowOpacity() {
    return this.opacity = 120;
  }

  update() {
    super.update();
    if (this.visible === false) {
      return;
    }
    this.move(this.plSprite.x, this.plSprite.y - 24);
    if (this.tarEv == null) {
      return;
    }
    this.updateRotationToTarget();
    return this.distThread.update();
  }

  updateRotationToTarget() {
    if (this._rotTimer == null) {
      this._rotTimer = 2;
    }
    this._rotTimer--;
    if (this._rotTimer <= 0) {
      this.rotation = Math.atan2(this.y - this.tarEv.screenY(), this.x - this.tarEv.screenX());
      this._rotTimer = 2;
    }
  }

  updateDistanceToTarget() {
    var dist;
    dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, this.tarEv.x, this.tarEv.y);
    //console.log(dist)
    if (dist > 24) {
      this.resetArrowOpacity();
      return;
    }
    if (dist <= 1) {
      this.opacity = 0;
      return;
    }
    //@markTarget()
    if (dist < 2) {
      this.opacity = 255;
      return;
    }
    this.resetArrowOpacity();
    this.opacity += 200 / dist;
  }

  //console.log(@opacity)
  markTarget() {
    var original, targetSprite;
    targetSprite = SceneManager._scene._spriteset.findTargetSprite(this.tarEv);
    if (targetSprite == null) {
      return;
    }
    original = targetSprite.getBlendColor();
    targetSprite.setBlendColor(this.arrColor);
    targetSprite._sqBlended = true;
    setTimeout((function() {
      return targetSprite.setBlendColor(original);
    }), 200);
  }

};


// Generated by CoffeeScript 2.5.1
//1:41
var Sprite_SQSNotifyLine;

Sprite_SQSNotifyLine = class Sprite_SQSNotifyLine extends Sprite {
  constructor() {
    super(ImageManager.loadPKDSQS("questJournalUpdated"));
    this.opacity = 0;
    this.fullVisisble = false;
    this.fadeOutTimer = 140;
    this.isDone = false;
    this.moveByParameters();
    return;
  }

  moveByParameters() {
    var params, x, y;
    params = PKD_SQS.PP.getQuestNotifyPosition();
    x = eval(params.x);
    y = eval(params.y);
    return this.move(x, y);
  }

  update() {
    super.update();
    if (this.visible === false) {
      return;
    }
    if (this.fullVisisble === false) {
      return this.updateShowUpOpacity();
    } else {
      return this.updateFadeOutTimer();
    }
  }

  updateShowUpOpacity() {
    this.opacity += 6;
    if (this.opacity >= 255) {
      return this.fullVisisble = true;
    }
  }

  updateFadeOutTimer() {
    this.fadeOutTimer--;
    if (this.fadeOutTimer <= 40) {
      this.opacity -= 8;
    }
    if (this.fadeOutTimer <= 0) {
      this.opacity = 0;
      return this.visible = false;
    }
  }

};


// Generated by CoffeeScript 2.5.1
var Sprite_SQSTaskLine;

Sprite_SQSTaskLine = class Sprite_SQSTaskLine extends Sprite {
  constructor(task) {
    super();
    this.task = task;
    this.params = PKD_SQS.PP.getQuestTasksSettings();
    this._createTaskStatusIcon();
    this._createTaskText();
    return;
  }

  _createTaskStatusIcon() {
    var iconImage, taskIcon, x, y;
    x = eval(this.params.position.x);
    y = eval(this.params.position.y);
    iconImage = "Task_A";
    if (this.task.isComplete()) {
      iconImage = "Task_B";
    }
    taskIcon = new Sprite(ImageManager.loadPKDSQS(iconImage));
    this.addChild(taskIcon);
    taskIcon.move(x, y);
  }

  _createTaskText() {
    var taskText, textSize;
    textSize = this.params.textLine.lineSize;
    taskText = new Sprite_SQSTextLine(this.task.text, {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: this.params.textLine.face,
      fontSize: this.params.textLine.size
    });
    // * Позиция задаётся в массиве поизиций, поэтому нет доп. смещения самого текста
    return this.addChild(taskText);
  }

};


// Generated by CoffeeScript 2.6.1
var Sprite_SQSTextLine;

Sprite_SQSTextLine = class Sprite_SQSTextLine extends Sprite {
  //? settings = {w, h, fontSize, fontFace}
  constructor(text, textSettings) {
    super();
    this.textSettings = textSettings;
    this._createTextBaseWindow();
    this.setText(text);
    return;
  }

  setText(text1) {
    this.text = text1;
    return this.refreshText();
  }

  _createTextBaseWindow() {
    var fontFace, fontSize, h, w;
    ({w, h, fontSize, fontFace} = this.textSettings);
    this.tWindow = new Window_SQSTextBase(new Rectangle(0, 0, w, h), fontSize, fontFace);
    return this.addChild(this.tWindow);
  }

  refreshText() {
    this._refreshText();
    setTimeout((() => {
      return this._refreshText();
    }), 2);
    if (KDCore.isMV()) {
      return setTimeout((() => {
        return this._refreshText();
      }), 10);
    }
  }

  _refreshText() {
    this.tWindow.contents.clear();
    return this.tWindow.drawTextExWithWordWrap(this.text, 0, 0, this.tWindow.width);
  }

};


// Generated by CoffeeScript 2.5.1
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
    ALIAS__createTilemap.call(this);
    return this.sqCreateQuestNavigatorLayer();
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _.sqAddOnQuestNavigator = function(sprite) {
    return this._sqLayer01.addChild(sprite);
  };
  _.sqCreateQuestNavigatorLayer = function() {
    this._sqLayer01 = new Sprite();
    this._sqLayer01.z = 1;
    this._tilemap.addChild(this._sqLayer01);
    // * Чтобы каждый кадр не считать, создадим переменные
    this.__tw = $gameMap.tileWidth();
    this.__tw2 = this.__tw / 2;
    this.__th = $gameMap.tileHeight();
  };
  _.sqClearQuestNavigator = function() {
    var c, i, len, ref;
    ref = this._sqLayer01.children;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c != null) {
        c.visible = false;
      }
      this._sqLayer01.removeChild(c);
    }
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Данный класс отвечает за хранение данных у игрока (сохранение состояний)
var SQS_Keep;

SQS_Keep = class SQS_Keep {
  constructor() {
    this.reset();
  }

  reset() {
    this._completedQuests = [];
    this._visibleQuests = [];
    this._newQuests = [];
    // * ID квеста = массив выполненных задач
    this._questCompleteTasksStatuses = {};
    // * ID квеста = массив видимых задач
    this._questVisibleTasksStatuses = {};
    // * ID квеста = номер видимого описания
    this._questVisibleDescription = {};
    // * ID квестов, которые установленны активными
    // * Статический массив, т.е. работа с индексами
    this._activeQuests = [];
  }

  isAddedQuest(questId) {
    return this._visibleQuests.contains(questId);
  }

  isCompleteQuest(questId) {
    return this._completedQuests.contains(questId);
  }

  isActiveQuest(questId) {
    return this._activeQuests.contains(questId);
  }

  isTaskVisible(questId, index) {
    var data;
    if (index === 0) {
      // * Первая задача всегда видима!
      return true;
    }
    data = this._questVisibleTasksStatuses[questId];
    if (data == null) {
      return false;
    }
    return this._questVisibleTasksStatuses[questId].contains(index);
  }

  isTaskComplete(questId, index) {
    var data;
    data = this._questCompleteTasksStatuses[questId];
    if (data == null) {
      return false;
    }
    return this._questCompleteTasksStatuses[questId].contains(index);
  }

  getQuestDescriptionIndex(questId) {
    if (this._questVisibleDescription[questId] == null) {
      // * Первое описание видно всегда (базовое)
      return 0;
    }
    return this._questVisibleDescription[questId];
  }

  //{VERSION}
  setActiveQuest(questId) {
    if (this.isActiveQuest(questId)) {
      return;
    }
    this._activeQuests[0] = questId;
  }

  removeActiveQuest(questId) {
    var index;
    if (!this.isActiveQuest(questId)) {
      return;
    }
    index = this.getActiveQuestIndex(questId);
    if (index >= 0) {
      this._activeQuests[index] = null;
    }
  }

  getActiveQuestIndex(questId) {
    if (!this.isActiveQuest(questId)) {
      return -1;
    }
    return this._activeQuests.indexOf(questId);
  }

  addQuest(questId) {
    if (!this.isAddedQuest(questId)) {
      this._visibleQuests.push(questId);
      // * Пометка new
      return this.registerMarkForNewQuest(questId);
    }
  }

  registerMarkForNewQuest(questId) {
    if (this._newQuests == null) {
      // * Может и не быть, так как сохранение загруженно
      this._newQuests = [];
    }
    if (!this._newQuests.contains(questId)) {
      this._newQuests.push(questId);
    }
  }

  completeQuest(questId) {
    if (!this.isCompleteQuest(questId)) {
      return this._completedQuests.push(questId);
    }
  }

  setDescriptionForQuest(questId, index) {
    this._questVisibleDescription[questId] = index;
  }

  addVisibleTaskForQuest(questId, index) {
    if (this._questVisibleTasksStatuses[questId] == null) {
      this._questVisibleTasksStatuses[questId] = [];
    }
    if (!this._questVisibleTasksStatuses[questId].contains(index)) {
      this._questVisibleTasksStatuses[questId].push(index);
    }
  }

  completeTaskForQuest(questId, index) {
    if (this._questCompleteTasksStatuses[questId] == null) {
      this._questCompleteTasksStatuses[questId] = [];
    }
    if (!this._questCompleteTasksStatuses[questId].contains(index)) {
      this._questCompleteTasksStatuses[questId].push(index);
    }
  }

  clearMarkForNewQuest(questId) {
    if (this._newQuests == null) {
      return;
    }
    if (this._newQuests.contains(questId)) {
      this._newQuests.delete(questId);
    }
  }

  clearAllMarks() {
    return this._newQuests = [];
  }

  isQuestMarkedAsNew(questId) {
    if (this._newQuests == null) {
      return false;
    }
    return this._newQuests.contains(questId);
  }

};


// Generated by CoffeeScript 2.6.1
// * Главный менеджер квестов
window.SQSM = function() {};

SQSM.init = function() {
  $gamePlayer.sqGetAllQuests();
  $gamePlayer.sqGetQuestsData();
  $gamePlayer.sqGetAllPoints();
};

// * Все все квесты в игре
SQSM.quests = function() {
  return $gamePlayer.sqGetAllQuests();
};

// * Все квесты, которые есть у игрока (добавлены)
SQSM.playerCurrentQuests = function() {
  var e, quests;
  quests = SQSM.quests().filter(function(q) {
    return SQSM.isQuestVisible(q.id) && !SQSM.isQuestComplete(q.id);
  });
  try {
    quests.sort(KDCore.Utils.dynamicSort("-priority"));
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return quests;
};

// * Все квесты, которые есть у игрока (добавленны) в определённой группе
SQSM.playerCurrentQuestsForCategory = function(catId) {
  var quests;
  quests = SQSM.playerCurrentQuests();
  // * Если пусто, без фильтра, все
  if (!String.any(catId)) {
    return quests;
  } else {
    // * Фильтр по группе
    return quests.filter(function(q) {
      return q.catId === catId;
    });
  }
};

// * Все квесты, которые есть у игрока (были выполнены)
SQSM.playerCompletedQuests = function() {
  var e, quests;
  quests = SQSM.quests().filter(function(q) {
    return SQSM.isQuestComplete(q.id);
  });
  try {
    quests.sort(KDCore.Utils.dynamicSort("-priority"));
  } catch (error) {
    e = error;
    console.warn(e);
  }
  return quests;
};

// * Все квесты, которые есть у игрока (были выполнены), в определённо группе
SQSM.playerCompletedQuestsForCategory = function(catId) {
  var quests;
  quests = SQSM.playerCompletedQuests();
  // * Если пусто, без фильтра, все
  if (!String.any(catId)) {
    return quests;
  } else {
    // * Фильтр по группе
    return quests.filter(function(q) {
      return q.catId === catId;
    });
  }
};

SQSM.keep = function() {
  return $gamePlayer.sqGetQuestsData();
};

SQSM.isQuestComplete = function(id) {
  return SQSM.keep().isCompleteQuest(id);
};

SQSM.isQuestVisible = function(id) {
  return SQSM.keep().isAddedQuest(id);
};

SQSM.isQuestActive = function(id) {
  return SQSM.keep().isActiveQuest(id);
};

SQSM.getActiveQuests = function() {
  return SQSM.playerCurrentQuests().filter(function(q) {
    return q.isActive();
  });
};

SQSM.getQuestActiveIndex = function(id) {
  if (SQSM.isQuestActive(id)) {
    return SQSM.keep().getActiveQuestIndex(id);
  } else {
    return -1;
  }
};

SQSM.points = function() {
  return $gamePlayer.sqGetAllPoints();
};

SQSM.getPointsForQuest = function(id) {
  return SQSM.points().find(function(p) {
    return p.questId === id;
  });
};

SQSM.isQuestHavePoints = function(id) {
  var points;
  points = SQSM.getPointsForQuest(id);
  if (points == null) {
    return false;
  }
  return points.isHaveAnyPoints();
};

SQSM.getQuestsArrows = function() {
  return PKD_SQS.PP.getQuestsArrows();
};

SQSM.onAnyQuestProgressChange = function() {
  // * not good way :)
  if (SceneManager._scene instanceof Scene_Map) {
    SceneManager._scene.loadSQSPoints();
    SQSM.showNotify();
  }
};

SQSM.showNotify = function() {
  var e;
  try {
    // * not good way
    if (!(SceneManager._scene instanceof Scene_Map)) {
      return;
    }
    SceneManager._scene.showSQSNotify();
    try {
      SQSM.RefreshMapQuestsList();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

SQSM.clearQuestNewMark = function(id) {
  var e;
  try {
    SQSM.keep().clearMarkForNewQuest(id);
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

SQSM.isQuestHaveNewMark = function(id) {
  var e;
  try {
    return SQSM.keep().isQuestMarkedAsNew(id);
  } catch (error) {
    e = error;
    console.warn(e);
  }
};

// * Список квестов (на карте)
// * ============================================================================
SQSM.RefreshMapQuestsList = function() {
  var e;
  try {
    if (KDCore.Utils.isSceneMap() && PKD_SQS.PP.isTasksWindowActive()) {
      return SceneManager._scene.refreshSQSTaskWindow();
    }
  } catch (error) {
    e = error;
    return KDCore.warning(e);
  }
};

SQSM.HideMapQuestsList = function() {
  var e;
  try {
    $gameSystem._sqsIsTaskWindowDisabled = true;
    if (KDCore.Utils.isSceneMap()) {
      return SceneManager._scene.refreshSQSTaskWindowVisibility();
    }
  } catch (error) {
    e = error;
    return KDCore.warning(e);
  }
};

SQSM.ShowMapQuestsList = function() {
  var e;
  try {
    $gameSystem._sqsIsTaskWindowDisabled = null;
    if (KDCore.Utils.isSceneMap()) {
      return SceneManager._scene.refreshSQSTaskWindowVisibility();
    }
  } catch (error) {
    e = error;
    return KDCore.warning(e);
  }
};

SQSM.SwitchOpenedClosedStateOfQuestsList = function() {
  var e;
  try {
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    return SceneManager._scene.tryOpenOrCloseSQSTaskWindow();
  } catch (error) {
    e = error;
    return KDCore.warning(e);
  }
};

// * Вызовы скриптов
// * ============================================================================

// * Открыть журнал квестов
SQSM.OpenQuestJournal = function() {
  return SceneManager.push(Scene_SQSJournal);
};

// * Открыть (добавить) квест игроку
SQSM.AddQuest = function(id) {
  SQSM.keep().addQuest(id);
  SQSM.showNotify();
};

// * Начинаем с 1, а не с нуля
SQSM.ShowDescriptionForQuest = function(id, index) {
  SQSM.keep().setDescriptionForQuest(id, index - 1);
  SQSM.showNotify();
};

// * Начинаем с 1, а не с нуля
SQSM.ShowTaskForQuest = function(id, index) {
  SQSM.keep().addVisibleTaskForQuest(id, index - 1);
  SQSM.onAnyQuestProgressChange();
};

// * Начинаем с 1, а не с нуля
SQSM.CompleteTaskForQuest = function(id, index) {
  SQSM.keep().completeTaskForQuest(id, index - 1);
  if (SceneManager._scene instanceof Scene_Map) {
    if (SQSM.isQuestActive(id)) {
      SQSM.SetActiveQuest(id, false);
      SQSM.SetActiveQuest(id, true);
    }
  }
  if (SQSM._checkQuestAutoComplete(id)) {
    SQSM.CompletQuest(id);
  } else {
    SQSM.onAnyQuestProgressChange();
  }
};

SQSM._checkQuestAutoComplete = function(id) {
  var e, quest;
  try {
    if (!PKD_SQS.PP.isAutoCompleteQuests()) {
      return false;
    }
    if (this.isQuestComplete(id)) {
      return false;
    }
    if (!this.isQuestVisible(id)) {
      return false;
    }
    quest = SQSM.playerCurrentQuests().find(function(q) {
      return q.id === id;
    });
    if (quest) {
      return quest.isAllTasksCompleted();
    }
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
  return false;
};

// * Добавить квест в группу выполненные квесты
SQSM.CompletQuest = function(id) {
  SQSM.keep().completeQuest(id);
  SQSM.SetActiveQuest(id, false);
  SQSM.onAnyQuestProgressChange();
  SQSM._checkCompletedCallback(id);
};

SQSM._checkCompletedCallback = function(id) {
  var ceId, e, quest;
  try {
    quest = SQSM.playerCompletedQuests().find(function(q) {
      return q.id === id;
    });
    ceId = quest.onCompletedCe;
    if (ceId != null) {
      setTimeout((function() {
        var e;
        try {
          return KDCore.Utils.startCE(ceId);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }), 1);
    }
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

// * Сделать квест активным (если true)
SQSM.SetActiveQuest = function(id, state = true) {
  if (state === true) {
    SQSM.keep().setActiveQuest(id);
  } else {
    SQSM.keep().removeActiveQuest(id);
  }
  SQSM.onAnyQuestProgressChange();
};

// * Удаляет квест (всю информацию, словно и не добавляли)
SQSM.ResetQuest = function(id) {
  var e, keep;
  try {
    if (this.isQuestActive(id)) {
      this.SetActiveQuest(id, false);
    }
    // * Remove all information about tasks
    keep = SQSM.keep();
    if ((keep._questVisibleTasksStatuses != null) && (keep._questVisibleTasksStatuses[id] != null)) {
      delete keep._questVisibleTasksStatuses[id];
    }
    if (keep._questCompleteTasksStatuses != null) {
      delete keep._questCompleteTasksStatuses[id];
    }
    // * Remove from completed
    keep._completedQuests.delete(id);
    // * Remove descriptions
    if (keep._questVisibleDescription != null) {
      delete keep._questVisibleDescription[id];
    }
    // * Remove other
    keep._visibleQuests.delete(id);
    keep._newQuests.delete(id);
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};

// * Показать все задачи для квеста
SQSM.ShowAllTasksForQuest = function(id) {
  var e, i, j, quest, ref;
  try {
    quest = SQSM.quests().find(function(q) {
      return q.id === id;
    });
    for (i = j = 0, ref = quest.tasks.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      SQSM.keep().addVisibleTaskForQuest(id, i);
    }
    SQSM.onAnyQuestProgressChange();
  } catch (error) {
    e = error;
    KDCore.warning(e);
  }
};


// Generated by CoffeeScript 2.6.1
var SQS_Points;

SQS_Points = class SQS_Points {
  constructor(questPointersData) {
    var i, len, ref, task;
    this.questId = questPointersData.questId;
    this.tasksPoints = [];
    ref = questPointersData.pointsData;
    for (i = 0, len = ref.length; i < len; i++) {
      task = ref[i];
      this.tasksPoints[task.taskIndex - 1] = task.points;
    }
    return;
  }

  isHavePointsForTask(taskIndex) {
    return this.tasksPoints[taskIndex] != null;
  }

  isHaveAnyPoints() {
    return this.tasksPoints.length > 0;
  }

  isHavePointsOnMapForTask(taskIndex, mapId) {
    var evId;
    if (this.isHavePointsForTask(taskIndex)) {
      evId = this.getPointOnMap(taskIndex, mapId);
      return evId > 0;
    }
    return false;
  }

  isHavePointsOnCurrentMap(taskIndex) {
    return this.isHavePointsOnMapForTask(taskIndex, $gameMap.mapId());
  }

  getPointOnMap(taskIndex, mapId) {
    var e, evId, goalMapId;
    evId = this._getPointOnMap(taskIndex, mapId);
    if (evId !== 0) {
      return evId;
    } else {
      if (PKD_SQS.PP.isUseAutoNavigation()) {
        try {
          goalMapId = this._getGoalMapIdForTask(taskIndex);
          if (goalMapId !== 0) {
            $gameTemp._pkdGetPointSaferCount = 0;
            return this._getPointOnCurrentMapForMap(goalMapId);
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          return 0;
        }
      } else {
        return 0;
      }
    }
  }

  _getPointOnMap(taskIndex, mapId) {
    var map, maps;
    if (this.isHavePointsForTask(taskIndex)) {
      maps = this.tasksPoints[taskIndex];
      map = maps.find(function(m) {
        return m.mapId === mapId;
      });
      if (map != null) {
        return map.evId;
      } else {
        return 0;
      }
    }
    return 0;
  }

  _getGoalMapIdForTask(taskIndex) {
    if (this.isHavePointsForTask(taskIndex)) {
      return this.tasksPoints[taskIndex][0].mapId;
    } else {
      return 0;
    }
  }

  _getPointOnCurrentMapForMap(goalMapId) {
    var cur, goalData, i, items, j, len, len1, link, ref, ref1, result;
    $gameTemp._pkdGetPointSaferCount++;
    if ($gameTemp._pkdGetPointSaferCount > 999) {
      return 0;
    }
    items = PKD_SQS.PP.navigationData();
    cur = $gameMap.mapId();
    if (PKD_SQS.PP.ignoredAutoNavigationMaps().contains(cur)) {
      return 0;
    }
    goalData = items.find(function(item) {
      return item.mapId === goalMapId;
    });
    if (!goalData) {
      return 0;
    }
    ref = goalData.links;
    for (i = 0, len = ref.length; i < len; i++) {
      link = ref[i];
      if (link.mapId === cur) {
        return link.evId;
      }
    }
    ref1 = goalData.links;
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      link = ref1[j];
      result = this._getPointOnCurrentMapForMap(link.mapId);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  }

  getPointOnCurrentMap(taskIndex) {
    return this.getPointOnMap(taskIndex, $gameMap.mapId());
  }

};


// Generated by CoffeeScript 2.6.1
var SQS_Quest;

SQS_Quest = class SQS_Quest {
  constructor(questData) {
    this.id = questData.id;
    this.title = questData.title;
    this.titleImage = questData.titleImage;
    this.titleForList = questData.titleForList;
    this.priority = questData.priority || 0;
    this.catId = questData.categoryId || "";
    this.difficulty = questData.difficulty || 0;
    this.tasks = [];
    this.onCompletedCe = questData.onCompleted || 0;
    this.createTasks(questData.tasks);
    this.createDescriptions(questData.descriptions);
    return;
  }

  //{VERSION}
  createTasks(tasksData) {
    var i, index, len, task;
    for (index = i = 0, len = tasksData.length; i < len; index = ++i) {
      task = tasksData[index];
      if (index < 4) {
        this.tasks.push(new SQS_Task(this.id, index, task));
      }
    }
  }

  //{VERSION}
  createDescriptions(descriptions) {
    this.descriptions = descriptions;
    if (this.descriptions.length > 4) {
      this.descriptions = this.descriptions.slice(0, 4);
    }
  }

  isComplete() {
    return SQSM.isQuestComplete(this.id);
  }

  isVisible() {
    return SQSM.isQuestVisible(this.id);
  }

  // * Активен в навигаторе (выбран для слежения)
  isActive() {
    return SQSM.isQuestActive(this.id);
  }

  getTask(index = 0) {
    return this.tasks[index];
  }

  getVisibleTasks() {
    return this.tasks.filter(function(t) {
      return t.isVisible();
    });
  }

  isAllTasksCompleted() {
    return this.tasks.every(function(t) {
      return t.isComplete();
    });
  }

  getTasksForPointers() {
    return this.getVisibleTasks().filter(function(t) {
      return !t.isComplete();
    });
  }

  getDescription(index = 0) {
    return this.descriptions[index];
  }

  getActiveDescription() {
    var description, index;
    index = SQSM.keep().getQuestDescriptionIndex(this.id);
    description = this.getDescription(index);
    if (String.any(description)) {
      return description;
    } else {
      return "You should add at least one description to Quest parameters!";
    }
  }

  getDifficulty() {
    return this.difficulty;
  }

};


// Generated by CoffeeScript 2.5.1
var SQS_Task;

SQS_Task = class SQS_Task {
  constructor(qid, index, text) {
    this.qid = qid;
    this.index = index;
    this.text = text;
  }

  isComplete() {
    return SQSM.keep().isTaskComplete(this.qid, this.index);
  }

  isVisible() {
    return SQSM.keep().isTaskVisible(this.qid, this.index);
  }

};


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addOriginalCommands, _;
  //@[DEFINES]
  _ = Window_MenuCommand.prototype;
  //@[ALIAS]
  ALIAS__addOriginalCommands = _.addOriginalCommands;
  _.addOriginalCommands = function() {
    ALIAS__addOriginalCommands.call(this);
    if (PKD_SQS.PP.isNeedCommandInMenu()) {
      this.addCommand(PKD_SQS.PP.menuCommandText(), 'sqsJournal', true);
    }
  };
})();

// ■ END Window_MenuCommand.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Window_SQSQuestsList;

Window_SQSQuestsList = class Window_SQSQuestsList extends Window_Selectable {
  constructor(rect, textLineSettings) {
    super(rect);
    this._group = 0;
    this._category = ""; // * All
    this._data = [];
    this._prepareParams();
    this.setBackgroundType(2);
    this._createExtraCursor();
    return;
  }

  setGroup(_group) {
    this._group = _group;
    this.refresh();
    if (this.maxItems() === 0) {
      return this.select(-1);
    } else {
      return this.select(0);
    }
  }

  setCategory(_category) {
    this._category = _category;
    return this.setGroup(this._group);
  }

  maxItems() {
    if (this._data != null) {
      return this._data.length;
    } else {
      return 0;
    }
  }

  rowSpacing() {
    return 0;
  }

  select(index) {
    super.select(index);
    this._checkMarkViewedForClear(index);
    return this.refresh();
  }

  quest() {
    return this.questAt(this.index());
  }

  questAt(index) {
    if ((this._data != null) && index >= 0) {
      return this._data[index];
    } else {
      return null;
    }
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.quest());
  }

  drawItemBackground(index) {} // * nothing

  
    // * Если мы в текущих заданиях, то используется для проверки можно ли задать квест активным
  // * т.е. если у него путевые точки
  isEnabled(quest) {
    if (quest == null) {
      return false;
    }
    if (this._group === 0) {
      return SQSM.isQuestHavePoints(quest.id);
    } else {
      return false;
    }
  }

  makeItemList() {
    if (this._group === 0) {
      this._data = SQSM.playerCurrentQuestsForCategory(this._category);
    } else {
      this._data = SQSM.playerCompletedQuestsForCategory(this._category);
    }
    this._applySortings();
  }

  drawItem(index) {
    var quest, rect;
    quest = this.questAt(index);
    if (quest == null) {
      return;
    }
    if (this.index() !== index) {
      this.contents.paintOpacity = 120;
    } else {
      this.changePaintOpacity(true); //@isEnabled(quest)
    }
    rect = this.itemRect(index);
    this.drawTextEx(quest.titleForList, rect.x, rect.y, rect.width);
    if (SQSM.isQuestActive(quest.id)) {
      this.drawQuestActiveSymbol(quest, rect);
    }
    if (SQSM.isQuestHaveNewMark(quest.id) && this._group === 0) {
      this.drawQuestNewMark(rect);
    }
  }

  drawQuestActiveSymbol(quest, rect) {
    var actSym, arrow, bc, dx, dy, index;
    dx = rect.x + this._activeQuestMargins.x;
    dy = rect.y + this._activeQuestMargins.y;
    actSym = new Sprite(this._curActBitmap);
    actSym.x = dx;
    actSym.y = dy;
    this.addChild(actSym);
    this._activeSymbols.push(actSym);
    index = SQSM.getQuestActiveIndex(quest.id);
    if (index < 0) {
      return;
    }
    arrow = SQSM.getQuestsArrows()[index];
    bc = [...arrow.color.ARR];
    bc[3] = 150;
    actSym.setBlendColor(bc);
  }

  drawQuestNewMark(rect) {} // * EMPTY, PRO only

  refresh() {
    this._clearActiveFlags();
    this._clearNewMarks();
    this.makeItemList();
    return super.refresh();
  }

  // * Вызывается, когда сцена закрывается (из сцены)
  clearQuestMarks() {
    var i, len, q, ref;
    if (this._questsForClearMarks == null) {
      return;
    }
    ref = this._questsForClearMarks;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      SQSM.clearQuestNewMark(q);
    }
  }

  resetFontSettings() {
    super.resetFontSettings();
    if (this.textLineSettings == null) {
      return;
    }
    if (String.any(this.textLineSettings.fontFace)) {
      this.contents.fontFace = this.textLineSettings.fontFace;
    }
    if (this.textLineSettings.fontSize > 0) {
      this.contents.fontSize = this.textLineSettings.fontSize;
    }
  }

  _refreshCursor() {} // * EMPTY

  _updateCursor() {
    super._updateCursor();
    this._curSpr.visible = this._cursorSprite.visible;
    if (this._curSpr.visible === true) {
      this._curSpr.visible = this.maxItems() > 0;
    }
    this._curSpr.y = this._cursorSprite.y + this._cursorMargins.y;
    this._curSpr.x = this._cursorSprite.x + this._cursorMargins.x;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ Window_SQSQuestsList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = Window_SQSQuestsList.prototype;
  _._prepareParams = function() {
    var _activeQuestMargins, _cursorMargins, _newMarkMargins;
    _cursorMargins = PKD_SQS.PP.getQuestListCursorMargins();
    _activeQuestMargins = PKD_SQS.PP.getQuestListActiveIconMargins();
    _newMarkMargins = PKD_SQS.PP.getQuestListNewMarkMargins();
    this._cursorMargins = {
      x: eval(_cursorMargins.x),
      y: eval(_cursorMargins.y)
    };
    this._activeQuestMargins = {
      x: eval(_activeQuestMargins.x),
      y: eval(_activeQuestMargins.y)
    };
    this._newMarkMargins = {
      x: eval(_newMarkMargins.x),
      y: eval(_newMarkMargins.y)
    };
  };
  _._clearActiveFlags = function() {
    var i, item, len, ref;
    if (this._activeSymbols == null) {
      this._activeSymbols = [];
    }
    ref = this._activeSymbols;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.visible = false;
      this.removeChild(item);
    }
    this._activeSymbols = [];
  };
  _._clearNewMarks = function() {
    var i, item, len, ref;
    if (this._newMarks == null) {
      this._newMarks = [];
    }
    ref = this._newMarks;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.visible = false;
      this.removeChild(item);
    }
    this._newMarks = [];
  };
  _.setSettings = function(textLineSettings1) {
    var h;
    this.textLineSettings = textLineSettings1;
    this.resetFontSettings();
    h = this.textLineSettings.h;
    this.lineHeight = function() {
      return h;
    };
  };
  _._createExtraCursor = function() {
    if (KDCore.isMV()) {
      this._cursorSprite = this._windowCursorSprite;
    }
    this._curActBitmap = ImageManager.loadPKDSQS("Quest_Active");
    this._curMarkNewBitmap = ImageManager.loadPKDSQS("Quest_New");
    this._curMarkNewBitmap.addLoadListener(() => {
      var e;
      try {
        return this.refresh();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    });
    this._curSpr = new Sprite(ImageManager.loadPKDSQS("Quest_Selected"));
    this.addChild(this._curSpr);
  };
  // * Отмечаем, что данный квест был просмотрен, т.е. надо снять с него статус "новый"
  _._checkMarkViewedForClear = function(index) {
    var quest;
    if (index < 0) {
      return;
    }
    quest = this.questAt(index);
    if (quest == null) {
      return;
    }
    if (this._questsForClearMarks == null) {
      this._questsForClearMarks = [];
    }
    this._questsForClearMarks.push(quest.id);
  };
  _._applySortings = function() {
    if (PKD_SQS.PP.isSortByNew()) {
      this._sortByNewQuests();
    }
    if (PKD_SQS.PP.isSortByActive()) {
      this._sortByActiveFirst();
    }
  };
  _._sortByNewQuests = function() {
    var i, j, k, lastAddedQuests, len, len1, len2, newDataPre, q, ref, ref1;
    // * Сортировка (новые сперва вверху)
    lastAddedQuests = [];
    newDataPre = [];
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      if (SQSM.isQuestHaveNewMark(q.id)) {
        lastAddedQuests.push(q);
      }
    }
    for (j = 0, len1 = lastAddedQuests.length; j < len1; j++) {
      q = lastAddedQuests[j];
      newDataPre.push(q);
    }
    ref1 = this._data;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      q = ref1[k];
      if (!newDataPre.contains(q)) {
        newDataPre.push(q);
      }
    }
    this._data = newDataPre;
  };
  _._sortByActiveFirst = function() {
    var activateQuests, i, j, k, len, len1, len2, newData, q, ref, ref1;
    // * Сортировка (aктивные вверху)
    activateQuests = [];
    newData = [];
    ref = this._data;
    for (i = 0, len = ref.length; i < len; i++) {
      q = ref[i];
      if (SQSM.isQuestActive(q.id)) {
        activateQuests.push(q);
      }
    }
    for (j = 0, len1 = activateQuests.length; j < len1; j++) {
      q = activateQuests[j];
      newData.push(q);
    }
    ref1 = this._data;
    for (k = 0, len2 = ref1.length; k < len2; k++) {
      q = ref1[k];
      if (!newData.contains(q)) {
        newData.push(q);
      }
    }
    this._data = newData;
  };
})();

// ■ END Window_SQSQuestsList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Window_SQSTasksWindowList;

Window_SQSTasksWindowList = class Window_SQSTasksWindowList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this._quests = [];
    if (KDCore.isMV()) {
      this.updateForMv = this.updateForMvBody;
    }
    return;
  }

  // * Всегда можно прокручивать, так как окно не будет Active
  //$[OVER]
  isScrollEnabled() {
    return true;
  }

  settings() {
    return PKD_SQS.PP.tasksListSettings();
  }

  itemHeight() {
    return this.settings().questHeight - 8;
  }

  lineHeight() {
    return this.itemHeight() / 2;
  }

  maxCols() {
    return 1;
  }

  setRefreshCallback(_refreshSizeCallback) {
    this._refreshSizeCallback = _refreshSizeCallback;
  }

  drawItemBackground(index) {} // * EMPTY

  drawItem(index) {
    var item, rect;
    item = this._quests[index];
    if (item == null) {
      return;
    }
    rect = this.itemLineRect(index);
    if (item === 1000) {
      this._drawNoQuestsHolder(rect);
    } else {
      this._drawQuestName(rect, item);
      this._drawQuestTask(rect, item);
    }
    this.resetFontSettings();
  }

  _drawNoQuestsHolder(rect) {
    return this.drawTextEx(this.settings().emptyListText, rect.x, rect.y, this.width);
  }

  _drawQuestName(rect, quest) {
    var arrow, color, e, index, text;
    try {
      index = SQSM.getQuestActiveIndex(quest.id);
      if (index < 0) {
        this.contents.textColor = "#FFFFFF";
        text = quest.titleForList;
      } else {
        arrow = SQSM.getQuestsArrows()[index];
        color = arrow.color.HEX;
        text = "\\CHEX[" + color + "]" + quest.titleForList;
      }
      this.drawTextEx(text, rect.x, rect.y, this.width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    this.resetTextColor();
  }

  makeFontBigger() {
    return this.contents.fontSize += 1;
  }

  makeFontSmaller() {
    return this.contents.fontSize -= 1;
  }

  //$[OVER]
  processDrawIcon(iconIndex, textState) {
    var size;
    if (this.__drawTask === true) {
      size = this.settings().questInListFontSize - 1;
    } else {
      size = this.settings().questInListFontSize + 1;
    }
    this.contents.drawIcon(textState.x + 1, textState.y - 1, iconIndex, size);
    textState.x += size - 1;
  }

  _drawQuestTask(rect, quest) {
    var taskText, text;
    this.__drawTask = true;
    taskText = this._getProperTask(quest);
    text = this.settings().beforeTask + taskText;
    this.drawTextExWithWordWrap(text, rect.x - 4, rect.y + 18, this.width + 10, 2);
    this.__drawTask = false;
  }

  _getProperTask(quest) {
    var e, tasks;
    try {
      tasks = quest.getVisibleTasks();
      return tasks.last().text;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return "???";
    }
  }

  //$[OVER]
  resetFontSettings() {
    if (KDCore.isMV()) {
      this.contents.fontFace = this.standardFontFace();
      this.contents.fontSize = this.settings().questInListFontSize;
    } else {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = this.settings().questInListFontSize;
    }
    this.resetTextColor();
  }

  maxItems() {
    if (this._quests != null) {
      return this._quests.length;
    } else {
      return 0;
    }
  }

  refresh() {
    this._prepareQuestsList();
    Window_Selectable.prototype.refresh.call(this);
  }

  _prepareQuestsList() {
    if (this.settings().questsShowMode === "all") {
      this._quests = SQSM.playerCurrentQuestsForCategory("");
    } else {
      this._quests = SQSM.getActiveQuests();
    }
    //console.info @_quests
    if (this._refreshSizeCallback != null) {
      this._refreshSizeCallback();
    }
    //@height = (@itemHeight() + 8) * 4 #@_quests.length #(@lineHeight() + @itemPadding() + 8) * @_quests.length
    //console.log @height
    if (this._quests.length === 0) {
      this._quests.push(1000); //  * No active quests holder
    }
  }

  update() {
    super.update();
    return this.updateForMv();
  }

  //?DYNAMIC
  updateForMv() {} // * EMPTY

  updateForMvBody() {
    return this.processWheelEx();
  }

  processWheelEx() {
    if (TouchInput.wheelY >= 20) {
      if (this.isMousePointerIn()) {
        return this.scrollDown();
      }
    } else if (TouchInput.wheelY <= -20) {
      if (this.isMousePointerIn()) {
        return this.scrollUp();
      }
    }
  }

  isMousePointerIn() {
    var x, y;
    x = this.canvasToLocalX(TouchInput.x);
    y = this.canvasToLocalY(TouchInput.y);
    return this.isContentsArea(x, y);
  }

};


// Generated by CoffeeScript 2.5.1
var Window_SQSTextBase;

Window_SQSTextBase = class Window_SQSTextBase extends Window_Base {
  constructor(rect, fontSize, fontFace) {
    super(rect);
    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.createContents();
    this.setBackgroundType(2);
  }

  updatePadding() {
    return this.padding = 0;
  }

  itemPadding() {
    return 0;
  }

  resetFontSettings() {
    super.resetFontSettings();
    if (String.any(this.fontFace)) {
      this.contents.fontFace = this.fontFace;
    }
    if (this.fontSize > 0) {
      this.contents.fontSize = this.fontSize;
    }
  }

};


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.showSQSNotify = function() {
    // * Если нету спрайта, то создаём
    if (this._sqsNotifyLine == null) {
      this._sqsNotifyLine = new Sprite_SQSNotifyLine();
      this.addChild(this._sqsNotifyLine);
    } else {
      // * Если есть, но видимый, то пропуск
      if (this._sqsNotifyLine.visible === true) {
        return;
      }
      // * Если есть, но невидимый, значит надо пересоздать
      this.removeChild(this._sqsNotifyLine);
      this._sqsNotifyLine = null;
      this.showSQSNotify();
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_SQSJournal.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_SQSJournal.prototype;
  _._clearQuestInfo = function() {
    var ref, ref1;
    this.qiTitleImage.visible = false;
    this.qiTitleText.setText("");
    this.qiDesc.setText("");
    this.qiTasksHeader.visible = false;
    if (this.qiTasks != null) {
      this.removeChild(this.qiTasks);
      this._createQuestTasks(); // * Пересоздаём холдер
    }
    if ((ref = this._activeHelp) != null) {
      ref.visible = false;
    }
    if ((ref1 = this._difficultyLevel) != null) {
      ref1.visible = false;
    }
  };
  _._showActiveQuestData = function() {
    var descText, descrpt, e, e2;
    if (String.any(this.activeQuestData.titleImage)) {
      this.qiTitleImage.visible = true;
      this.qiTitleImage.bitmap = ImageManager.loadPKDSQS(this.activeQuestData.titleImage);
    }
    this.qiTitleText.setText(this.activeQuestData.title);
    descrpt = this.activeQuestData.getActiveDescription();
    try {
      descText = JsonEx.parse(descrpt);
    } catch (error) {
      e = error;
      try {
        descText = JsonEx.parse('"' + descrpt + '"');
      } catch (error) {
        e2 = error;
        descText = "Something wrong with Description text, maybe you lost quotes";
      }
    }
    this.qiDesc.setText(descText);
    this.qiTasksHeader.visible = true;
    this._showActiveTasks();
    this._showQuestDifficulty();
    this._refreshActiveHelp();
  };
  //?VERSION
  _._showQuestDifficulty = function() {}; // * EMPTY
  _._showActiveTasks = function() {
    var i, index, len, params, posArray, task, tasks;
    params = PKD_SQS.PP.getQuestTasksSettings();
    posArray = params.positions.map(function(p) {
      return [eval(p.x), eval(p.y)];
    });
    tasks = this.activeQuestData.getVisibleTasks();
    //TODO: Сортировка по выполненным? Или просто по добавленным
    tasks.reverse();
    for (index = i = 0, len = tasks.length; i < len; index = ++i) {
      task = tasks[index];
      if (index < posArray.length) {
        this._showNextTask(task, posArray[index]);
      }
    }
  };
  _._showNextTask = function(task, pos) {
    var taskItem;
    taskItem = new Sprite_SQSTaskLine(task);
    taskItem.move(pos[0], pos[1]);
    return this.qiTasks.addChild(taskItem);
  };
  _._createQuestMain = function() {
    this._createQuestTitle();
    this._createQuestDescription();
    this._createQuestTasksHeader();
    this._createQuestTasks();
    this._createDifficultyLevel();
    return this._clearQuestInfo();
  };
  _._createQuestTitle = function() {
    var imgX, imgY, params, textSize, x, y;
    params = PKD_SQS.PP.getQuestHeaderSettings();
    this.qiTitleImage = new Sprite();
    imgX = eval(params.position2.x);
    imgY = eval(params.position2.y);
    this.qiTitleImage.move(imgX, imgY);
    this.addChild(this.qiTitleImage);
    textSize = params.textLine.lineSize;
    this.qiTitleText = new Sprite_SQSTextLine("", {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    });
    x = eval(params.position.x);
    y = eval(params.position.y);
    this.qiTitleText.move(x, y);
    this.addChild(this.qiTitleText);
  };
  _._createQuestDescription = function() {
    var params, textSize, x, y;
    params = PKD_SQS.PP.getQuestDescSettings();
    //TODO: Проверял область описания, 140 высоты хватило
    //@xx = KDCore.Sprite.FromBitmap(460, 140)
    //@xx.fillAll()
    //@xx.move 240, 160
    //@addChild @xx
    textSize = params.textLine.lineSize;
    this.qiDesc = new Sprite_SQSTextLine("", {
      w: eval(textSize.w),
      h: eval(textSize.h),
      fontFace: params.textLine.face,
      fontSize: params.textLine.size
    });
    x = eval(params.position.x);
    y = eval(params.position.y);
    this.qiDesc.move(x, y);
    return this.addChild(this.qiDesc);
  };
  _._createQuestTasksHeader = function() {
    var params, x, y;
    params = PKD_SQS.PP.getQuestTasksHeaderSettings();
    this.qiTasksHeader = new Sprite(ImageManager.loadPKDSQS("tasksHeader"));
    x = eval(params.x);
    y = eval(params.y);
    this.qiTasksHeader.move(x, y);
    this.addChild(this.qiTasksHeader);
  };
  _._createQuestTasks = function() {
    this.qiTasks = new Sprite(); // * holder
    this.addChild(this.qiTasks);
  };
  _._createDifficultyLevel = function() {
    var params, x, y;
    this._difficultyLevel = new Sprite();
    params = PKD_SQS.PP.getDifficultyLevelSettings();
    x = eval(params.x);
    y = eval(params.y);
    this._difficultyLevel.move(x, y);
    this.addChild(this._difficultyLevel);
  };
  _._refreshActiveHelp = function() {
    return this._activeHelp.visible = this.ql.isCurrentItemEnabled();
  };
})();

// ■ END Scene_SQSJournal.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_SQSJournal.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_SQSJournal.prototype;
  _._createCategories = function() {
    var paramsA, paramsB, x, y;
    this.groupA = new KDCore.ButtonM("GroupA", true, "pSQSystem");
    this.groupB = new KDCore.ButtonM("GroupB", true, "pSQSystem");
    this.addChild(this.groupA);
    this.addChild(this.groupB);
    this.groupA.addClickHandler(() => {
      return this._onGroupClick(0);
    });
    this.groupB.addClickHandler(() => {
      return this._onGroupClick(1);
    });
    // * По умолчанию включена (выбрана)
    this.groupA.disable();
    paramsA = PKD_SQS.PP.getGroupButtonA();
    x = eval(paramsA.x);
    y = eval(paramsA.y);
    this.groupA.move(x, y);
    paramsB = PKD_SQS.PP.getGroupButtonB();
    x = eval(paramsB.x);
    y = eval(paramsB.y);
    this.groupB.move(x, y);
  };
  _._onGroupClick = function(index) {
    if (index === 0) {
      this.groupA.disable();
      this.groupB.enable();
    } else {
      this.groupB.disable();
      this.groupA.enable();
    }
    this.ql.setGroup(index);
    this._refreshEmptyJournalHolder();
  };
  _._refreshEmptyJournalHolder = function() {
    if (this.ql.maxItems() <= 0) {
      return this._showEmptyJournalHolder();
    } else {
      return this._hideEmptyJournalHolder();
    }
  };
  _._showEmptyJournalHolder = function() {
    var image;
    if (this.emptyJournalHolder == null) {
      this.emptyJournalHolder = new Sprite();
      image = ImageManager.loadPKDSQS("noQuestsHolder");
      image.addLoadListener(() => {
        this.emptyJournalHolder.x = Graphics.width / 2 - image.width / 2;
        return this.emptyJournalHolder.y = Graphics.height / 2 - image.height / 2;
      });
      this.emptyJournalHolder.bitmap = image;
      this.addChild(this.emptyJournalHolder);
    }
    return this.emptyJournalHolder.visible = true;
  };
  _._hideEmptyJournalHolder = function() {
    if (this.emptyJournalHolder == null) {
      return;
    }
    return this.emptyJournalHolder.visible = false;
  };
})();

// ■ END Scene_SQSJournal.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_SQSJournal.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_SQSJournal.prototype;
  _._createQuestsCategories = function() {
    var cat, categories, e, i, len;
    this._categoriesButtons = [];
    try {
      categories = PKD_SQS.PP.getQuestsCategories();
      if (categories == null) {
        return;
      }
      for (i = 0, len = categories.length; i < len; i++) {
        cat = categories[i];
        this._createCategoryButton(cat);
      }
      // * Самая первая категория всегда включена по умолчанию
      this._categoriesButtons[0].disable();
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _._createCategoryButton = function(cat) {
    var catButton, id, x, y;
    catButton = new KDCore.ButtonMU(cat.buttonImage, true, "pSQSystem");
    this.addChild(catButton);
    x = eval(cat.position.x);
    y = eval(cat.position.y);
    catButton.move(x, y);
    this._categoriesButtons.push(catButton);
    id = cat.categoryId;
    catButton.catId = id;
    catButton.addClickHandler(() => {
      return this._onCategoryClick(id);
    });
  };
  _._onCategoryClick = function(catId) {
    var b, btn, i, len, ref;
    ref = this._categoriesButtons;
    for (i = 0, len = ref.length; i < len; i++) {
      b = ref[i];
      b.enable();
    }
    btn = this._categoriesButtons.find(function(b) {
      return b.catId === catId;
    });
    if (btn != null) {
      btn.disable();
    }
    this.ql.setCategory(catId);
  };
  _._showQuestDifficulty = function() {
    var diffLevel;
    if (this.activeQuestData == null) {
      return;
    }
    if (this._difficultyLevel == null) {
      return;
    }
    diffLevel = this.activeQuestData.difficulty;
    if (diffLevel >= 1) {
      this._difficultyLevel.visible = true;
      this._difficultyLevel.bitmap = ImageManager.loadPKDSQS("questDiff_" + diffLevel);
    } else {
      this._difficultyLevel.visible = false;
    }
  };
})();

// ■ END Scene_SQSJournal.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SQS_Keep.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SQS_Keep.prototype;
  _.setActiveQuest = function(questId) {
    var i, index, isAdded, len, q, ref;
    if (this.isActiveQuest(questId)) {
      return;
    }
    isAdded = false;
    ref = this._activeQuests;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      q = ref[index];
      if (q == null) {
        this._activeQuests[index] = questId;
        isAdded = true;
        break;
      }
    }
    if (!isAdded) {
      this._activeQuests.push(questId);
    }
  };
})();

// ■ END SQS_Keep.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SQS_Quest.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = SQS_Quest.prototype;
  _.createTasks = function(tasksData) {
    var i, index, len, task;
    for (index = i = 0, len = tasksData.length; i < len; index = ++i) {
      task = tasksData[index];
      this.tasks.push(new SQS_Task(this.id, index, task));
    }
  };
  _.createDescriptions = function(descriptions) { // * no limits
    this.descriptions = descriptions;
  };
})();

// ■ END SQS_Quest.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SQSQuestsList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_SQSQuestsList.prototype;
  _.drawQuestNewMark = function(rect) {
    /*dx = rect.x + @_newMarkMargins.x
    dy = rect.y + @_newMarkMargins.y
    markSym = new Sprite(@_curMarkNewBitmap)
    markSym.x = dx
    markSym.y = dy
    @addChild markSym
    @_newMarks.push(markSym)*/
    var dx, dy, e;
    if (this._newMarkMargins == null) {
      return;
    }
    try {
      dx = rect.x + this._newMarkMargins.x;
      dy = rect.y + this._newMarkMargins.y;
      this.contents.drawOnMe(this._curMarkNewBitmap, dx, dy);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Window_SQSQuestsList.coffee
//---------------------------------------------------------------------------

//Plugin PKD_SimpleQuestSystem builded by PKD PluginBuilder 2.2 - 26.01.2023