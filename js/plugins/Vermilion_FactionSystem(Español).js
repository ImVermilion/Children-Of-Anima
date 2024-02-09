/*:
 * @plugindesc Plugin para gestionar facciones en el juego. Permite activar y desactivar facciones desde eventos y muestra un menú con las facciones disponibles.
 * 
 * <Vermilion_FactionSystem>
 * @author Vermilion Games
 * 
 * @help Este plugin permite gestionar facciones en el juego.
 * Puedes activar o desactivar facciones desde eventos y mostrar un menú 
 * con las facciones disponibles.
 * Puedes editar o añadir facciones directamente desde el código del plugin 
 *fácilmente.
 * 
 * Ejemplos de uso:
 * 
 * Llamar al menú de facciones desde un evento:
 *   SceneManager.push(Scene_Factions);
 * 
 * Activar una facción desde un evento:
 *   enableFaction(0); 
 * // Cambia el índice por el de la facción que quieras activar
 * 
 * Desactivar una facción desde un evento:
 *   disableFaction(0); 
 * // Cambia el índice por el de la facción que quieras desactivar
 */

(function() {
    var factionStates = {}; // Objeto para almacenar el estado de descubrimiento de cada facción

    var factions = [
        {
            Name: "Hermandad héroes Arresven",
		Description: "Un viejo gremio de aventureros que no pasa por su mejor momento.",
		LongDescription: "La Hermandad de los Héroes de Arresven solía\n" +
                     "ser la mayor fuerza en la región.\n" + 
					 "Sin embargo, los tiempos han cambiado y el gremio\n" +
					 "se enfrenta a desafíos internos y externos." ,
		ReputationVariable: 120,
		IconIndex: 76, // Ejemplo de icono para esta facción
        },
        {
            Name: "Bandidos de Arresven",
            Description: "Una banda de bandidos que actua por Arresven.",
            ReputationVariable: 119,
            IconIndex: 298, // Ejemplo de icono para esta facción
        },
        {
            Name: "Ciudad de Arresven",
            Description: "Una tranquila ciudad entre montañas y que vive de la pesca del río.",
			LongDescription: "La ciudad de Arresven se encuentra al norte\n" +
							"del cruce comerciál, esto lo hace un buen\n" +
							"para el comercio y la venta de sus productos",
            ReputationVariable: 118,
            IconIndex: 2560, // Ejemplo de icono para esta facción
        },
        {
            Name: "Mercenarios puño de ira",
            Description: "Un grupo de mercenarios duros y peligrosos.",
            ReputationVariable: 117,
            IconIndex: 15, // Ejemplo de icono para esta facción
        },
        {
            Name: "La Logia del Plenilunio",
            Description: "Un grupo de famosos investigadores arcanos.",
            ReputationVariable: 116,
            IconIndex: 1776, // Ejemplo de icono para esta facción
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
        this._factionsTextWindow = new Window_Base(0, 0, Graphics.boxWidth, this.calcTextLineHeight());
        var text = "\\C[4]Facciones conocidas\\C[0]";
        var x = (Graphics.boxWidth - this._factionsTextWindow.textWidth(text)) / 2;
        this._factionsTextWindow.drawTextEx(text, x, 0);
        this.addWindow(this._factionsTextWindow);
        
        var y = this.calcWindowY();
        this._factionsWindow = new Window_Factions(0, y, Graphics.boxWidth, Graphics.boxHeight - y);
        this._factionsWindow.setHandler('cancel', this.popScene.bind(this));
        this._factionsWindow.setHandler('ok', this.onFactionOk.bind(this));
        this.addWindow(this._factionsWindow);
    };

    Scene_Factions.prototype.calcWindowY = function() {
        var windowTopPadding = 8;
        var lineHeight = this.calcTextLineHeight();
        return windowTopPadding + lineHeight;
    };

    Scene_Factions.prototype.calcTextLineHeight = function() {
        if (this._factionsTextWindow) {
            return this._factionsTextWindow.lineHeight();
        }
        return 0;
    };

    // Reemplaza la función onFactionOk existente con esta
    Scene_Factions.prototype.onFactionOk = function() {
        var index = this._factionsWindow.index();
        var discoveredIndices = Object.keys(factionStates).filter(function(key) {
            return factionStates[key];
        });
        
        // Ahora ordenamos los índices de las facciones descubiertas en el orden que se descubrieron
        discoveredIndices.sort(function(a, b) {
            return a - b;
        });

        if (discoveredIndices.length > index) {
            var factionIndex = discoveredIndices[index];
            var faction = factions[factionIndex];
            SceneManager.push(Scene_FactionDetails.bind(null, faction));
        }
    };

    function Scene_FactionDetails(faction) {
        this._faction = faction;
        this.initialize.apply(this, arguments);
    }

    Scene_FactionDetails.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_FactionDetails.prototype.constructor = Scene_FactionDetails;

    Scene_FactionDetails.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_FactionDetails.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createFactionDetailsWindow();
    };

    Scene_FactionDetails.prototype.createFactionDetailsWindow = function() {
        var faction = this._faction;
        var x = (Graphics.boxWidth - 700) / 2; // Ajustar el ancho de la ventana
        var y = (Graphics.boxHeight - 400) / 2; // Ajustar la altura de la ventana
        var width = 700; // Ajustar el ancho de la ventana
        var height = 400; // Ajustar la altura de la ventana
        this._factionDetailsWindow = new Window_Base(x, y, width, height);
        this._factionDetailsWindow.drawIcon(faction.IconIndex, (width - Window_Base._iconWidth) / 2, 20); // Dibujar el icono centrado arriba
        this._factionDetailsWindow.changeTextColor('#3366FF'); // Cambiar el color del texto a azul claro
        this._factionDetailsWindow.drawText(faction.Name, 0, 60, width, 'center'); // Dibujar el nombre centrado
        this._factionDetailsWindow.resetTextColor(); // Restaurar el color del texto al predeterminado
        var description = faction.LongDescription || faction.Description;
        var textHeight = this.calcDescriptionHeight(description);
        this._factionDetailsWindow.drawTextEx(description, 20, 110, width, textHeight); // Dibujar la descripción larga o corta
        var lineHeight = this._factionDetailsWindow.lineHeight();
        var reputationY = (height - lineHeight) / 2 + lineHeight * 4; // Ajuste vertical para la reputación
        this._factionDetailsWindow.drawText("Reputación: " + $gameVariables.value(faction.ReputationVariable), 0, reputationY, width, 'center'); // Dibujar la reputación centrada verticalmente
        this.addWindow(this._factionDetailsWindow);
    };

    Scene_FactionDetails.prototype.calcDescriptionHeight = function(text) {
        var tempWindow = new Window_Base(0, 0, 1, 1);
        var height = tempWindow.textSizeEx(text).height;
        tempWindow = null;
        return height;
    };

    Scene_FactionDetails.prototype.update = function() {
		Scene_MenuBase.prototype.update.call(this);
		if (Input.isTriggered('cancel')) {
			SoundManager.playCancel(); // Reproducir sonido de cancelación
			SceneManager.goto(Scene_Factions); // Cambiar aquí para ir directamente a Scene_Factions
		}
	};

    function Window_Factions() {
        this.initialize.apply(this, arguments);
    }

    Window_Factions.prototype = Object.create(Window_Selectable.prototype);
    Window_Factions.prototype.constructor = Window_Factions;

    Window_Factions.prototype.initialize = function(x, y, width, height) {
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
        this.select(0);
        this.activate();
    };

    Window_Factions.prototype.maxItems = function() {
        return factions.length;
    };

    Window_Factions.prototype.itemHeight = function() {
        return this.lineHeight() * 3;
    };

    Window_Factions.prototype.drawItem = function(index) {
        var rect = this.itemRect(index);
        var faction = factions[index];
        var reputation = $gameVariables.value(faction.ReputationVariable);
        
        if (factionStates[index]) {
            // Dibujar el contenido de la facción si está descubierta
            this.changeTextColor(this.normalColor());
            this.drawIcon(faction.IconIndex, rect.x + 4, rect.y + (rect.height - Window_Base._iconHeight) / 2);
            var textX = rect.x + Window_Base._iconWidth + 8; // Ajuste horizontal
            var lineHeight = this.lineHeight();
            this.changeTextColor(this.systemColor());
            this.drawText("Nombre: ", textX, rect.y, rect.width - Window_Base._iconWidth - 8, 'left');
            this.resetTextColor();
            this.drawTextEx(faction.Name, textX + this.textWidth("Nombre: "), rect.y, rect.width - Window_Base._iconWidth - 8); // Modificado para evitar cortes
            
            this.changeTextColor(this.systemColor());
            this.drawText("Descripción: ", textX, rect.y + lineHeight, rect.width - Window_Base._iconWidth - 8, 'left');
            this.resetTextColor();
            this.drawTextEx(faction.Description, textX + this.textWidth("Descripción: "), rect.y + lineHeight, rect.width - Window_Base._iconWidth - 8); // Modificado para evitar cortes
            
            this.changeTextColor(this.systemColor());
            this.drawText("Reputación: ", textX, rect.y + lineHeight * 2, rect.width - Window_Base._iconWidth - 8, 'left');
            this.resetTextColor();
            this.drawText(reputation, textX + this.textWidth("Reputación: "), rect.y + lineHeight * 2, rect.width - Window_Base._iconWidth - 8, 'left');
            
            // Dibujar una línea blanca gruesa entre cada facción
            this.contents.paintOpacity = 48; // Opacidad de la línea
            this.contents.fillRect(rect.x, rect.y + this.lineHeight() * 3 - 2, rect.width, 4, "#FFFFFF"); // Dibujar la línea blanca
            this.contents.paintOpacity = 255; // Restaurar la opacidad predeterminada
        } else {
            // Dibujar "Facción todavía por descubrir" si la facción no está descubierta
            this.contents.fontSize = 30; // Tamaño de fuente más grande para hacerlo más llamativo
            this.changeTextColor('#FF0000'); // Color rojo
            var text = "Facción todavía por descubrir";
            var textWidth = this.textWidth(text);
            var textX = rect.x + (rect.width - textWidth) / 2;
            var textY = rect.y + (rect.height - this.lineHeight()) / 2;
            this.drawText(text, textX, textY, rect.width, 'left');
            this.resetFontSettings(); // Restaurar la configuración de la fuente
        }
    };

    Window_Factions.prototype.isCurrentItemEnabled = function() {
        var index = this.index();
        return factionStates[index];
    };

    window.Scene_Factions = Scene_Factions;
    window.Window_Factions = Window_Factions;

    // Controlador de eventos para la tecla de retroceso
    var _Scene_Factions_update = Scene_Factions.prototype.update;
	Scene_Factions.prototype.update = function() {
		_Scene_Factions_update.call(this);
		if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
			SoundManager.playCancel(); // Reproducir sonido de cancelación
			this.popScene();
		}
	};
})();
