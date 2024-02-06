/*:
 * @plugindesc Plugin for managing factions in the game. Allows enabling and disabling factions from events and displays a menu with available factions.
 * 
 * <Vermilion_FactionSystem>
 * @author Vermilion Games
 * 
 * @help This plugin allows managing factions in the game. 
 * You can enable or disable factions from events and display a menu with available factions.
 * You can edit or add factions directly from the plugin code easily.
 * 
 * Usage Examples:
 * 
 * Call the factions menu from an event:
 *   SceneManager.push(Scene_Factions);
 * 
 * Enable a faction from an event:
 *   enableFaction(0); // Change the index to the faction you want to enable
 * 
 * Disable a faction from an event:
 *   disableFaction(0); // Change the index to the faction you want to disable
 */

(function() {
    var factionStates = {}; // Object to store the discovery state of each faction

    var factions = [
        {
            Name: "Heroes Brotherhood of Arresven",
            Description: "An old guild of adventurers going through tough times",
            ReputationVariable: 1,
            IconIndex: 1, // Example icon for this faction
        },
        {
            Name: "Bandits of Arresven",
            Description: "A band of bandits operating in Arresven",
            ReputationVariable: 2,
            IconIndex: 2, // Example icon for this faction
        },
		// Add more factions here if needed
    ];

    // Function to enable a faction
    function enableFaction(index) {
        if (index >= 0 && index < factions.length) {
            factionStates[index] = true;
            SceneManager._scene._factionsWindow.refresh();
        }
    }

    // Function to disable a faction
    function disableFaction(index) {
        if (index >= 0 && index < factions.length) {
            factionStates[index] = false;
            SceneManager._scene._factionsWindow.refresh();
        }
    }

    // Export the functions to be available in the global scope
    window.enableFaction = enableFaction;
    window.disableFaction = disableFaction;

    function Scene_Factions() {
        this.initialize.apply(this, arguments);
    }

    Scene_Factions.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Factions.prototype.constructor = Scene_Factions;

    Scene_Factions.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Factions.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createFactionsWindow();
    };

    Scene_Factions.prototype.createFactionsWindow = function() {
        this._factionsWindow = new Window_Factions(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._factionsWindow.setHandler('cancel', this.popScene.bind(this));
        this.addWindow(this._factionsWindow);
    };

    function Window_Factions() {
        this.initialize.apply(this, arguments);
    }

    Window_Factions.prototype = Object.create(Window_Selectable.prototype);
    Window_Factions.prototype.constructor = Window_Factions;

    Window_Factions.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_Factions.prototype.maxItems = function() {
        return factions.length;
    };

    Window_Factions.prototype.itemHeight = function() {
        return this.lineHeight() * 3;
    };

    Window_Factions.prototype.drawItem = function(index) {
    var rect = this.itemRect(index);
    var discoveredFactions = factions.filter((faction, i) => factionStates[i]);
    var faction = discoveredFactions[index];
    if (faction) {
        var reputation = $gameVariables.value(faction.ReputationVariable);
        // Draw the faction icon
        var iconX = rect.x + 4;
        var iconY = rect.y + (rect.height - Window_Base._iconHeight) / 2;
        this.drawIcon(faction.IconIndex, iconX, iconY);
        // Adjust the space between the icon and the faction text
        var textX = iconX + Window_Base._iconWidth + 20; // 20 is the additional space
        // Change text color for each section
        this.changeTextColor('#3366FF'); // Light blue for "Name:"
        this.drawText("Name: ", textX, rect.y, rect.width, 'left');
        this.resetTextColor();
        this.drawText(faction.Name, textX + this.textWidth("Name: "), rect.y, rect.width, 'left');
        
        this.changeTextColor('#9933CC'); // Purple for "Description:"
        this.drawText("Description: ", textX, rect.y + this.lineHeight(), rect.width, 'left');
        this.resetTextColor();
        this.drawText(faction.Description, textX + this.textWidth("Description: "), rect.y + this.lineHeight(), rect.width, 'left');
        
        this.changeTextColor('#339933'); // Green for "Reputation:"
        this.drawText("Reputation: ", textX, rect.y + this.lineHeight() * 2, rect.width, 'left');
        this.resetTextColor();
        this.drawText(reputation, textX + this.textWidth("Reputation: "), rect.y + this.lineHeight() * 2, rect.width, 'left');
        
        // Draw a thick white line between each faction
        this.contents.paintOpacity = 48; // Line opacity
        this.contents.fillRect(rect.x, rect.y + this.lineHeight() * 3 - 2, rect.width, 4, "#FFFFFF"); // Draw the white line
        this.contents.paintOpacity = 255; // Restore default opacity
    }
};


    window.Scene_Factions = Scene_Factions;
    window.Window_Factions = Window_Factions;

    // Event handler for the back key
    var _Scene_Factions_update = Scene_Factions.prototype.update;
    Scene_Factions.prototype.update = function() {
        _Scene_Factions_update.call(this);
        if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
            this.popScene();
        }
    };
})();
