/*:
 * @plugindesc Muestra un grimorio editable por el jugador. (Versión 2)
 * @author TuNombre
 * @target MZ
 * @version 2.0
 *
 * @param addEntryCommonEventId
 * @text ID del Evento Común para Añadir
 * @desc El ID del Evento Común que se ejecuta para que el jugador introduzca el título y texto de una nueva entrada.
 * @type common_event
 * @default 1
 *
 * @param titleVariableId
 * @text ID Variable para el Título
 * @desc La variable del juego donde se guardará temporalmente el título de la nueva entrada.
 * @type variable
 * @default 1
 *
 * @param contentVariableId
 * @text ID Variable para el Contenido
 * @desc La variable del juego donde se guardará temporalmente el contenido de la nueva entrada.
 * @type variable
 * @default 2
 *
 * @param categoryVariableId
 * @text ID Variable para la Categoría
 * @desc La variable donde se guardará el nombre de la categoría seleccionada para añadir una entrada.
 * @type variable
 * @default 3
 *
 * @command openGrimoire
 * @text Abrir Grimorio
 * @desc Abre la pantalla del grimorio.
 *
 * @command savePlayerEntry
 * @text Guardar Entrada del Jugador
 * @desc Guarda en el grimorio la información de las variables (Título, Contenido, Categoría). Usar en el Evento Común.
 *
 * @help
 * MiGrimorio_v2.js
 *
 * --- CÓMO CONFIGURARLO (IMPORTANTE) ---
 *
 * 1. **Categorías Predefinidas:**
 * Para cambiar las categorías, edita la lista "PREDEFINED_CATEGORIES"
 * justo al principio del código de este plugin.
 *
 * 2. **Parámetros del Plugin:**
 * - Configura el ID del Evento Común que usarás para añadir entradas.
 * - Asigna 3 Variables de Juego diferentes para el Título, el Contenido
 * y la Categoría. No las uses para nada más.
 *
 * 3. **Crea el Evento Común:**
 * - Ve a la Base de Datos -> Eventos Comunes y crea uno nuevo con el ID
 * que pusiste en los parámetros.
 * - Dentro de este evento, tienes que:
 * a) Pedir el TÍTULO: Usa el comando "Procesamiento de Introducción de
 * Nombre", selecciona la variable del Título y pon 12 caracteres máx.
 * b) Pedir el CONTENIDO: Usa de nuevo "Procesamiento de Introducción de
 * Nombre", selecciona la variable del Contenido y pon 12 caracteres.
 * (Para más texto, deberás pedir varias líneas y unirlas con un script).
 * c) GUARDAR: Usa el Comando de Plugin "Guardar Entrada del Jugador".
 *
 * 4. **Fondo del Grimorio:**
 * Crea una imagen de 816x624px llamada "GrimoireBackground.png" y
 * ponla en la carpeta /img/system/.
 */

(() => {
    const pluginName = "MiGrimorio_v2";
    const params = PluginManager.parameters(pluginName);
    
    const ADD_ENTRY_COMMON_EVENT_ID = parseInt(params.addEntryCommonEventId);
    const TITLE_VARIABLE_ID = parseInt(params.titleVariableId);
    const CONTENT_VARIABLE_ID = parseInt(params.contentVariableId);
    const CATEGORY_VARIABLE_ID = parseInt(params.categoryVariableId);
    
    // ----- ¡EDITA AQUÍ TUS CATEGORÍAS! -----
    const PREDEFINED_CATEGORIES = [
        "Personajes",
        "Bestiario",
        "Lugares",
        "Misiones",
        "Notas Personales"
    ];
    // -----------------------------------------

    // --- Gestión de Datos ---
    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.call(this);
        $gameSystem.initGrimoire();
    };

    Game_System.prototype.initGrimoire = function() {
        if (!this._grimoire) {
            this._grimoire = [];
            PREDEFINED_CATEGORIES.forEach(catName => {
                this._grimoire.push({ title: catName, entries: [] });
            });
        }
    };

    Game_System.prototype.getGrimoire = function() {
        if (!this._grimoire) this.initGrimoire();
        return this._grimoire;
    };
    
    Game_System.prototype.addPlayerGrimoireEntry = function() {
        const categoryName = $gameVariables.value(CATEGORY_VARIABLE_ID);
        const title = $gameVariables.value(TITLE_VARIABLE_ID);
        const content = $gameVariables.value(CONTENT_VARIABLE_ID);

        if (!categoryName || !title || !content) {
            console.error("Grimorio: Faltan datos (Categoría, Título o Contenido) en las variables.");
            return;
        }

        const category = this.getGrimoire().find(cat => cat.title === categoryName);
        if (category) {
            category.entries.push({ title: title, pages: [{ text: content }] });
        }
    };

    // --- Plugin Commands ---
    PluginManager.registerCommand(pluginName, "openGrimoire", () => {
        SceneManager.push(Scene_Grimoire);
    });

    PluginManager.registerCommand(pluginName, "savePlayerEntry", () => {
        $gameSystem.addPlayerGrimoireEntry();
    });

    // --- Scene_Grimoire ---
    function Scene_Grimoire() {
        this.initialize(...arguments);
    }

    Scene_Grimoire.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Grimoire.prototype.constructor = Scene_Grimoire;

    Scene_Grimoire.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createBackground();
        this.createIndexWindow();
        this.createContentWindow();
        // Sincronizar las ventanas DESPUÉS de crearlas
        this._indexWindow.setContentWindow(this._contentWindow);
    };

    Scene_Grimoire.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite(ImageManager.loadSystem('GrimoireBackground'));
        this.addChild(this._backgroundSprite);
    };

    Scene_Grimoire.prototype.createIndexWindow = function() {
        const rect = new Rectangle(0, 0, Math.floor(Graphics.boxWidth / 2), Graphics.boxHeight);
        this._indexWindow = new Window_GrimoireIndex(rect);
        this._indexWindow.setHandler("cancel", this.popScene.bind(this));
        this._indexWindow.setHandler("add_entry", this.onAddEntry.bind(this));
        this.addWindow(this._indexWindow);
    };

    Scene_Grimoire.prototype.createContentWindow = function() {
        const rect = new Rectangle(this._indexWindow.width, 0, Graphics.boxWidth - this._indexWindow.width, Graphics.boxHeight);
        this._contentWindow = new Window_GrimoireContent(rect);
        this.addWindow(this._contentWindow);
    };
    
    Scene_Grimoire.prototype.onAddEntry = function() {
        const category = this._indexWindow.currentCategory();
        if (category) {
            $gameVariables.setValue(CATEGORY_VARIABLE_ID, category.title);
            $gameTemp.reserveCommonEvent(ADD_ENTRY_COMMON_EVENT_ID);
            this.popScene(); // Salir de la escena para ejecutar el evento común
        } else {
            this._indexWindow.activate();
        }
    };

    // --- Window_GrimoireIndex ---
    function Window_GrimoireIndex() {
        this.initialize(...arguments);
    }

    Window_GrimoireIndex.prototype = Object.create(Window_Command.prototype);
    Window_GrimoireIndex.prototype.constructor = Window_GrimoireIndex;

    Window_GrimoireIndex.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this._contentWindow = null;
    };

    Window_GrimoireIndex.prototype.setContentWindow = function(contentWindow) {
        this._contentWindow = contentWindow;
        this.update();
    };
    
    Window_GrimoireIndex.prototype.makeCommandList = function() {
        const grimoireData = $gameSystem.getGrimoire();
        grimoireData.forEach(category => {
            this.addCommand(category.title, "category", true, category);
            category.entries.forEach(entry => {
                this.addCommand("  " + entry.title, "entry", true, entry);
            });
            // Añadir opción para crear entrada nueva
            this.addCommand("  [+ Añadir Entrada]", "add_entry", true, category);
        });
    };

    Window_GrimoireIndex.prototype.update = function() {
        Window_Command.prototype.update.call(this);
        if (this._contentWindow) {
            const currentData = this.currentExt();
            const symbol = this.currentSymbol();
            if (symbol === 'entry') {
                this._contentWindow.setEntry(currentData);
            } else {
                this._contentWindow.setEntry(null);
            }
        }
    };

    Window_GrimoireIndex.prototype.currentCategory = function() {
        if(this.currentSymbol() === 'add_entry' || this.currentSymbol() === 'category') {
            return this.currentExt();
        }
        return null;
    };

    // --- Window_GrimoireContent ---
    function Window_GrimoireContent() {
        this.initialize(...arguments);
    }

    Window_GrimoireContent.prototype = Object.create(Window_Base.prototype);
    Window_GrimoireContent.prototype.constructor = Window_GrimoireContent;
    
    Window_GrimoireContent.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._entry = null;
    };

    Window_GrimoireContent.prototype.setEntry = function(entry) {
        if (this._entry !== entry) {
            this._entry = entry;
            this.refresh();
        }
    };

    Window_GrimoireContent.prototype.refresh = function() {
        this.contents.clear();
        if (this._entry) {
            const page = this._entry.pages[0]; // Simplificado a una página por ahora
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(this._entry.title, 0, 0, this.contentsWidth(), 'center');
            
            this.resetTextColor();
            this.drawTextEx(page.text, this.padding, this.lineHeight() * 2);
        } else {
            this.drawText("Selecciona una entrada para ver su contenido.", 0, 0, this.contentsWidth(), "center");
        }
    };
})();