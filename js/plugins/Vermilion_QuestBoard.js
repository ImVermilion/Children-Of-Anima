/*:
 * @target MZ
 * @plugindesc Simula un tablón de anuncios con múltiples misiones y permite aceptar misiones para obtener ítems.
 * @help
 * El plugin carga las misiones desde un archivo JSON en la carpeta 'data'.
 */

(() => {
    const pluginName = 'Vermilion_QuestBoard';
    const jsonPath = 'data/QuestBoards.json';

    let questBoards = [];

    function loadQuestBoards() {
        const xhr = new XMLHttpRequest();
        const url = jsonPath;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = () => {
            if (xhr.status < 400) {
                questBoards = JSON.parse(xhr.responseText);
                console.log(`${pluginName}: Quest boards loaded successfully.`);
                console.log(questBoards);
            } else {
                console.error(`${pluginName}: No se pudo cargar ${url}`);
            }
        };
        xhr.onerror = () => {
            console.error(`${pluginName}: No se pudo cargar ${url}`);
        };
        xhr.send();
    }

    loadQuestBoards();

    function getQuestBoardById(boardId) {
        const board = questBoards.find(board => board.id === boardId);
        console.log(`${pluginName}: Getting quest board with ID ${boardId}.`);
        console.log(board);
        return board;
    }

    function Scene_QuestBoard() {
        this.initialize.apply(this, arguments);
    }

    Scene_QuestBoard.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_QuestBoard.prototype.constructor = Scene_QuestBoard;

    Scene_QuestBoard.prototype.initialize = function(boardId) {
        this._boardId = boardId;
        const board = getQuestBoardById(boardId);
        if (board) {
            this._quests = board.quests;
        } else {
            this._quests = [];
            console.error(`${pluginName}: Quest board with ID ${boardId} not found.`);
        }
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_QuestBoard.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createQuestsWindow();
    };

    Scene_QuestBoard.prototype.createQuestsWindow = function() {
        const width = Graphics.boxWidth * 0.8;
        const height = Graphics.boxHeight * 0.8;
        const x = (Graphics.boxWidth - width) / 2;
        const y = (Graphics.boxHeight - height) / 2;
        const activeQuests = this.visibleQuests();
        this._questsWindow = new Window_Quests(x, y, width, height, activeQuests);
        this._questsWindow.setHandler('cancel', this.popScene.bind(this));
        this._questsWindow.setHandler('ok', this.onQuestOk.bind(this));
        this.addWindow(this._questsWindow);
    };

    Scene_QuestBoard.prototype.onQuestOk = function() {
        const index = this._questsWindow.index();
        const activeQuests = this.visibleQuests();
        if (activeQuests.length > index) {
            const quest = activeQuests[index];
            SceneManager.push(Scene_QuestDetails.bind(this, quest));
        } else {
            SoundManager.playBuzzer();
            this._questsWindow.activate();
        }
    };

    Scene_QuestBoard.prototype.visibleQuests = function() {
        return this._quests.filter(quest => $gameSwitches.value(quest.SwitchId));
    };

    function Scene_QuestDetails() {
        this.initialize.apply(this, arguments);
    }

    Scene_QuestDetails.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_QuestDetails.prototype.constructor = Scene_QuestDetails;

    Scene_QuestDetails.prototype.initialize = function(quest) {
        this._quest = quest;
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_QuestDetails.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createQuestDetailsWindow();
    };

    Scene_QuestDetails.prototype.createQuestDetailsWindow = function() {
        const quest = this._quest;
        const width = Graphics.boxWidth * 0.8;
        const x = (Graphics.boxWidth - width) / 2;
        const y = (Graphics.boxHeight - 400) / 2;
        const height = 400;
        this._questDetailsWindow = new Window_Base(x, y, width, height);
        this._questDetailsWindow.drawIcon(quest.IconIndex, (width - Window_Base._iconWidth) / 2, 20);
        this._questDetailsWindow.changeTextColor('#3366FF');
        this._questDetailsWindow.drawText(quest.Title, 0, 60, width, 'center');
        this._questDetailsWindow.resetTextColor();
        const description = quest.LongDescription || quest.Description;
        this._questDetailsWindow.drawTextEx(description, 20, 110, width - 40);

        this.addWindow(this._questDetailsWindow);
    };

    Scene_QuestDetails.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('ok')) {
            this.processAcceptQuest();
        } else if (Input.isTriggered('cancel')) {
            this.processCancel();
        }
    };

    Scene_QuestDetails.prototype.processAcceptQuest = function() {
        const quest = this._quest;
        SceneManager.pop();
        SceneManager.pop();
        $gameParty.gainItem($dataItems[quest.ItemId], 1);
        $gameSwitches.setValue(quest.SwitchId, false);
    };

    Scene_QuestDetails.prototype.processCancel = function() {
        SceneManager.pop();
    };

    function Window_Quests() {
        this.initialize.apply(this, arguments);
    }

    Window_Quests.prototype = Object.create(Window_Selectable.prototype);
    Window_Quests.prototype.constructor = Window_Quests;

    Window_Quests.prototype.initialize = function(x, y, width, height, quests) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this._quests = quests;
        this.refresh();
        this.select(0);
        this.activate();
    };

    Window_Quests.prototype.maxCols = function() {
        return 2;
    };

    Window_Quests.prototype.maxItems = function() {
        return this._quests.filter(quest => $gameSwitches.value(quest.SwitchId)).length;
    };

    Window_Quests.prototype.isEnabled = function(index) {
        return this._quests[index] && $gameSwitches.value(this._quests[index].SwitchId);
    };

    Window_Quests.prototype.itemHeight = function() {
        return this.lineHeight() * 3;
    };

    Window_Quests.prototype.drawItem = function(index) {
        const rect = this.itemRect(index);
        const quest = this._quests[index];
        if (quest && $gameSwitches.value(quest.SwitchId)) {
            this.drawQuest(quest, rect.x, rect.y, rect.width);
        }
    };

    Window_Quests.prototype.drawQuest = function(quest, x, y, width) {
        const lineHeight = this.lineHeight();
        this.drawIcon(quest.IconIndex, x + 4, y + (lineHeight - Window_Base._iconHeight) / 2);
        const textX = x + Window_Base._iconWidth + 8;
        const textWidth = width - Window_Base._iconWidth - 8;
        this.drawTextEx(quest.Title, textX, y, textWidth);
        this.drawTextEx(quest.Description, textX, y + lineHeight, textWidth);
    };

    SceneManager.prepareNextScene = function(boardId) {
        SceneManager._nextScene = new Scene_QuestBoard(boardId);
    };

    window.Scene_QuestBoard = Scene_QuestBoard;
    window.Scene_QuestDetails = Scene_QuestDetails;
    window.Window_Quests = Window_Quests;
})();
