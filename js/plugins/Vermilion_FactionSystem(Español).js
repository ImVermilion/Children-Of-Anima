(function() {
    var factionStates = {}; // Objeto para almacenar el estado de descubrimiento de cada facción

    var factions = [
        {
            Name: "Hermandad héroes Arresven",
            Description: "Un viejo gremio de aventureros que no pasa por su mejor momento.",
            LongDescription: "La Hermandad de los Héroes de Arresven solía \n ser la mayor fuerza en la región. Sin embargo, los tiempos han cambiado y el gremio se enfrenta a desafíos internos y externos. A pesar de sus problemas, siguen siendo una fuerza a tener en cuenta para aquellos que buscan aventuras.",
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
            Description: "Una tranquila ciudad entre montañas y que vive \n    de la pesca del río.",
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

    Scene_Factions.prototype.onFactionOk = function() {
        var index = this._factionsWindow.index();
        if (factionStates[index]) {
            var faction = factions[index];
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
        var x = (Graphics.boxWidth - 600) / 2; // Ajustar el ancho de la ventana
        var y = (Graphics.boxHeight - 400) / 2; // Ajustar la altura de la ventana
        var width = 600; // Ajustar el ancho de la ventana
        var height = 400; // Ajustar la altura de la ventana
        this._factionDetailsWindow = new Window_Base(x, y, width, height);
        this._factionDetailsWindow.drawIcon(faction.IconIndex, (width - Window_Base._iconWidth) / 2, 20); // Dibujar el icono centrado arriba
        this._factionDetailsWindow.changeTextColor('#3366FF'); // Cambiar el color del texto a azul claro
        this._factionDetailsWindow.drawText(faction.Name, 0, 100, width, 'center'); // Dibujar el nombre centrado
        this._factionDetailsWindow.resetTextColor(); // Restaurar el color del texto al predeterminado
        var description = faction.LongDescription || faction.Description;
        var textHeight = this.calcDescriptionHeight(description);
        this._factionDetailsWindow.drawTextEx(description, 0, 140, width, textHeight); // Dibujar la descripción larga o corta
        var lineHeight = this._factionDetailsWindow.lineHeight();
        this._factionDetailsWindow.drawText("Reputación: " + $gameVariables.value(faction.ReputationVariable), 0, (height - lineHeight) / 2, width, 'center'); // Dibujar la reputación centrada verticalmente
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
            SceneManager.goto(Scene_Factions);
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
        if (faction && factionStates[index]) {
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
            this.drawTextEx(faction.Description, textX + this.textWidth("Descripción: "), rect.y + this.lineHeight(), rect.width); // Modificado para evitar cortes
            
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
            this.popScene();
        }
    };
})();
