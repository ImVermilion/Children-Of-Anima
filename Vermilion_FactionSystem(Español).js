/*:
 * @plugindesc Plugin para gestionar facciones en el juego. Permite activar y desactivar facciones desde eventos y muestra un menú con las facciones disponibles.
 * 
 * <Vermilion_FactionSystem>
 * @author Vermilion Games
 * 
 * @help Este plugin permite gestionar facciones en el juego. 
 * Puedes activar o desactivar facciones desde eventos y mostrar un menú con las facciones disponibles.
 * Puedes editar o añadir facciones desde el mismo código del plugin de manera sencilla.
 * 
 * Ejemplos de uso:
 * 
 * Llamar al menú de facciones desde un evento:
 *   SceneManager.push(Scene_Factions);
 * 
 * Activar una facción desde un evento:
 *   enableFaction(0); // Cambia el índice al de la facción que deseas activar, 0 sería la primera facción de todas, 1 la segunda...
 * 
 * Desactivar una facción desde un evento:
 *   disableFaction(0); // Cambia el índice al de la facción que deseas desactivar, 0 sería la primera facción de todas, 1 la segunda...
 */

(function() {
    var factionStates = {}; // Objeto para almacenar el estado de descubrimiento de cada facción

    var factions = [
        {
            Name: "Facción 1",
            Description: "Descripción de la fación",
            ReputationVariable: 1,
            IconIndex: 1, // Ejemplo de icono para esta facción
        },
        {
            Name: "Facción 2",
            Description: "Descripción de la fación",
            ReputationVariable: 2,
            IconIndex: 2, // Ejemplo de icono para esta facción
        },
		{
            Name: "Facción 3",
            Description: "Descripción de la fación",
            ReputationVariable: 3,
            IconIndex: 3, // Ejemplo de icono para esta facción
        },
        {
            Name: "Facción 4",
            Description: "Descripción de la fación",
            ReputationVariable: 4,
            IconIndex: 4, // Ejemplo de icono para esta facción
        },
		{
            Name: "Facción 5",
            Description: "Descripción de la fación",
            ReputationVariable: 5,
            IconIndex: 5, // Ejemplo de icono para esta facción
        },
		// Agrega más facciones aquí si es necesario
    ];

    // Función para activar una facción
    function enableFaction(index) {
        if (index >= 0 && index < factions.length) {
            factionStates[index] = true;
            SceneManager._scene._factionsWindow.refresh();
        }
    }

    // Función para desactivar una facción
    function disableFaction(index) {
        if (index >= 0 && index < factions.length) {
            factionStates[index] = false;
            SceneManager._scene._factionsWindow.refresh();
        }
    }

    // Exportar las funciones para que estén disponibles en el ámbito global
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
        // Dibujar el icono de la facción
        var iconX = rect.x + 4;
        var iconY = rect.y + (rect.height - Window_Base._iconHeight) / 2;
        this.drawIcon(faction.IconIndex, iconX, iconY);
        // Ajustar el espacio entre el icono y el texto de la facción
        var textX = iconX + Window_Base._iconWidth + 20; // 20 es el espacio adicional
        // Cambiar el color del texto para cada apartado
        this.changeTextColor('#3366FF'); // Azul claro para "Nombre:"
        this.drawText("Nombre: ", textX, rect.y, rect.width, 'left');
        this.resetTextColor();
        this.drawText(faction.Name, textX + this.textWidth("Nombre: "), rect.y, rect.width, 'left');
        
        this.changeTextColor('#9933CC'); // Morado para "Descripción:"
        this.drawText("Descripción: ", textX, rect.y + this.lineHeight(), rect.width, 'left');
        this.resetTextColor();
        this.drawText(faction.Description, textX + this.textWidth("Descripción: "), rect.y + this.lineHeight(), rect.width, 'left');
        
        this.changeTextColor('#339933'); // Verde para "Reputación:"
        this.drawText("Reputación: ", textX, rect.y + this.lineHeight() * 2, rect.width, 'left');
        this.resetTextColor();
        this.drawText(reputation, textX + this.textWidth("Reputación: "), rect.y + this.lineHeight() * 2, rect.width, 'left');
        
        // Dibujar una línea blanca gruesa entre cada facción
        this.contents.paintOpacity = 48; // Opacidad de la línea
        this.contents.fillRect(rect.x, rect.y + this.lineHeight() * 3 - 2, rect.width, 4, "#FFFFFF"); // Dibujar la línea blanca
        this.contents.paintOpacity = 255; // Restaurar la opacidad predeterminada
    }
};


    window.Scene_Factions = Scene_Factions;
    window.Window_Factions = Window_Factions;

    // Controlador de eventos para la tecla de retroceso
    var _Scene_Factions_update = Scene_Factions.prototype.update;
    Scene_Factions.prototype.update = function() {
        _Scene_Factions_update.call(this);
        if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
            this.popScene();
        }
    };
})();
