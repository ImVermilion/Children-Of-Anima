/*:
 * @target MZ
 * @plugindesc Gestiona hambre, sed y sueño con estados, penalizaciones e iconos graduales en el HUD. Versión 2.3.
 * @author Vermilion Games (Modificado por Gemini AI de Google)
 *
 * @help
 * Vermilion_HungerAndSleepSystem.js
 * Version: 2.3
 *
 * Este plugin gestiona las necesidades de hambre, sed y sueño.
 * Los valores disminuyen con el tiempo. Si una necesidad cae por
 * debajo de su umbral, se aplica un estado negativo al personaje.
 *
 * --- FUNCIÓN DEL HUD ---
 * Los iconos para hambre, sed y sueño aparecen en la parte superior
 * central de la pantalla y su opacidad cambia gradualmente.
 * - Necesidad al 100%: Icono transparente.
 * - Necesidad al 0%: Icono opaco.
 *
 * Los iconos utilizados son los definidos en los estados de Hambre,
 * Sed y Sueño. La posición del HUD es siempre centrada horizontalmente.
 *
 * --- REQUISITOS ---
 * Debes configurar tres 'Estados' en la base de datos y poner sus IDs
 * en los parámetros del plugin.
 *
 * @param HungerStateId
 * @text ID del Estado de Hambre
 * @desc El ID del estado que se aplica cuando el hambre es baja.
 * @type state
 * @default 11
 *
 * @param ThirstStateId
 * @text ID del Estado de Sed
 * @desc El ID del estado que se aplica cuando la sed es baja.
 * @type state
 * @default 14
 *
 * @param SleepStateId
 * @text ID del Estado de Sueño
 * @desc El ID del estado que se aplica cuando el sueño es bajo.
 * @type state
 * @default 10
 *
 * @param HungerRate
 * @text Tasa de Hambre
 * @desc La tasa a la que disminuye el hambre por segundo.
 * @type number
 * @decimals 2
 * @default 0.1
 *
 * @param ThirstRate
 * @text Tasa de Sed
 * @desc La tasa a la que disminuye la sed por segundo.
 * @type number
 * @decimals 2
 * @default 0.1
 *
 * @param SleepRate
 * @text Tasa de Sueño
 * @desc La tasa a la que disminuye el sueño por segundo.
 * @type number
 * @decimals 2
 * @default 0.1
 *
 * @param HungerThreshold
 * @text Umbral de Hambre
 * @desc El nivel de hambre por debajo del cual se aplica el estado negativo.
 * @type number
 * @default 20
 *
 * @param ThirstThreshold
 * @text Umbral de Sed
 * @desc El nivel de sed por debajo del cual se aplica el estado negativo.
 * @type number
 * @default 20
 *
 * @param SleepThreshold
 * @text Umbral de Sueño
 * @desc El nivel de sueño por debajo del cual se aplica el estado negativo.
 * @type number
 * @default 20
 *
 * @command adjustHunger
 * @text Ajustar Hambre
 * @desc Ajusta el nivel de hambre del grupo. Usa valores positivos para rellenar.
 * @arg value
 * @text Valor
 * @type number
 * @min -100
 * @default 10
 *
 * @command adjustThirst
 * @text Ajustar Sed
 * @desc Ajusta el nivel de sed del grupo. Usa valores positivos para rellenar.
 * @arg value
 * @text Valor
 * @type number
 * @min -100
 * @default 10
 *
 * @command adjustSleep
 * @text Ajustar Sueño
 * @desc Ajusta el nivel de sueño del grupo. Usa valores positivos para rellenar.
 * @arg value
 * @text Valor
 * @type number
 * @min -100
 * @default 10
 *
 * @param ---Configuración del HUD---
 * @default
 *
 * @param HudY
 * @text Posición Y del HUD
 * @desc La coordenada Y (vertical) en la pantalla para los iconos de necesidad.
 * @type number
 * @default 10
 *
 * @param HudIconSpacing
 * @text Espaciado de Iconos
 * @desc El espacio en píxeles entre cada icono de necesidad.
 * @type number
 * @default 36
 */

(() => {
    const PLUGIN_NAME = 'Vermilion_Hunger and Sleep System';
    const parameters = PluginManager.parameters(PLUGIN_NAME);

    // --- Parámetros de Estados (Respetando la configuración original del usuario) ---
    const hungerStateId = parseInt(parameters['HungerStateId'] || 11);
    const thirstStateId = parseInt(parameters['ThirstStateId'] || 14);
    const sleepStateId = parseInt(parameters['SleepStateId'] || 10);
    
    // --- Parámetros de Tasas ---
    const hungerRate = parseFloat(parameters['HungerRate'] || 0.1);
    const thirstRate = parseFloat(parameters['ThirstRate'] || 0.1);
    const sleepRate = parseFloat(parameters['SleepRate'] || 0.1);

    // --- Parámetros de Umbrales ---
    const hungerThreshold = parseInt(parameters['HungerThreshold'] || 20);
    const thirstThreshold = parseInt(parameters['ThirstThreshold'] || 20);
    const sleepThreshold = parseInt(parameters['SleepThreshold'] || 20);

    // --- Parámetros del HUD ---
    const hudY = parseInt(parameters['HudY'] || 10);
    const hudIconSpacing = parseInt(parameters['HudIconSpacing'] || 36);

    // --- Inicialización de variables del sistema (para persistencia) ---
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.initNeeds();
    };

    Game_System.prototype.initNeeds = function() {
        this._hunger = 100;
        this._thirst = 100;
        this._sleep = 100;
    };
    
    // --- Función principal de actualización ---
    const updateNeeds = () => {
        if ($gameSystem._hunger === undefined) {
            $gameSystem.initNeeds();
        }
        
        if (SceneManager.isSceneChanging() || $gameParty.inBattle() || SceneManager._scene instanceof Scene_MenuBase || $gameMessage.isBusy()) {
            return;
        }

        const deltaTime = 1 / 60.0;
        $gameSystem._hunger = Math.max(0, $gameSystem._hunger - hungerRate * deltaTime);
        $gameSystem._thirst = Math.max(0, $gameSystem._thirst - thirstRate * deltaTime);
        $gameSystem._sleep = Math.max(0, $gameSystem._sleep - sleepRate * deltaTime);

        for (const actor of $gameParty.members()) {
            // Gestión del Hambre
            if ($gameSystem._hunger < hungerThreshold) {
                if (!actor.isStateAffected(hungerStateId)) actor.addState(hungerStateId);
            } else {
                if (actor.isStateAffected(hungerStateId)) actor.removeState(hungerStateId);
            }
            // Gestión de la Sed
            if ($gameSystem._thirst < thirstThreshold) {
                if (!actor.isStateAffected(thirstStateId)) actor.addState(thirstStateId);
            } else {
                if (actor.isStateAffected(thirstStateId)) actor.removeState(thirstStateId);
            }
            // Gestión del Sueño
            if ($gameSystem._sleep < sleepThreshold) {
                if (!actor.isStateAffected(sleepStateId)) actor.addState(sleepStateId);
            } else {
                if (actor.isStateAffected(sleepStateId)) actor.removeState(sleepStateId);
            }
        }
    };

    // --- Actualización en el mapa ---
    const _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_prototype_update.call(this);
        if ($gameParty.members().length > 0) {
            updateNeeds();
        }
    };

    // --- Comandos del Plugin ---
    PluginManager.registerCommand(PLUGIN_NAME, 'adjustHunger', args => {
        const value = parseInt(args.value);
        if ($gameSystem._hunger === undefined) $gameSystem.initNeeds();
        $gameSystem._hunger = ($gameSystem._hunger + value).clamp(0, 100);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'adjustThirst', args => {
        const value = parseInt(args.value);
        if ($gameSystem._thirst === undefined) $gameSystem.initNeeds();
        $gameSystem._thirst = ($gameSystem._thirst + value).clamp(0, 100);
    });

    PluginManager.registerCommand(PLUGIN_NAME, 'adjustSleep', args => {
        const value = parseInt(args.value);
        if ($gameSystem._sleep === undefined) $gameSystem.initNeeds();
        $gameSystem._sleep = ($gameSystem._sleep + value).clamp(0, 100);
    });

    // --- LÓGICA DEL HUD DE NECESIDADES ---

    function Sprite_NeedsHud() {
        this.initialize(...arguments);
    }

    Sprite_NeedsHud.prototype = Object.create(Sprite.prototype);
    Sprite_NeedsHud.prototype.constructor = Sprite_NeedsHud;

    Sprite_NeedsHud.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.y = hudY;
        this._iconBitmap = ImageManager.loadSystem('IconSet');
        this.createIcons();
        this.centerHorizontally();
    };
    
    Sprite_NeedsHud.prototype.centerHorizontally = function() {
        const iconWidth = ImageManager.iconWidth;
        const totalWidth = (2 * hudIconSpacing) + iconWidth;
        this.x = (Graphics.boxWidth - totalWidth) / 2;
    };

    Sprite_NeedsHud.prototype.createIcons = function() {
        // Hambre
        this._hungerIcon = new Sprite(this._iconBitmap);
        const hungerIconIndex = $dataStates[hungerStateId] ? $dataStates[hungerStateId].iconIndex : 0;
        this.drawIcon(this._hungerIcon, hungerIconIndex, 0);
        this.addChild(this._hungerIcon);

        // Sed
        this._thirstIcon = new Sprite(this._iconBitmap);
        const thirstIconIndex = $dataStates[thirstStateId] ? $dataStates[thirstStateId].iconIndex : 0;
        this.drawIcon(this._thirstIcon, thirstIconIndex, 1);
        this.addChild(this._thirstIcon);

        // Sueño
        this._sleepIcon = new Sprite(this._iconBitmap);
        const sleepIconIndex = $dataStates[sleepStateId] ? $dataStates[sleepStateId].iconIndex : 0;
        this.drawIcon(this._sleepIcon, sleepIconIndex, 2);
        this.addChild(this._sleepIcon);
    };
    
    Sprite_NeedsHud.prototype.drawIcon = function(sprite, iconIndex, positionIndex) {
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        sprite.setFrame(sx, sy, pw, ph);
        sprite.x = positionIndex * hudIconSpacing;
    };

    Sprite_NeedsHud.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateVisibility();
        if (this.visible) {
            this.updateOpacity();
        }
    };

    Sprite_NeedsHud.prototype.updateVisibility = function() {
        const isSceneMap = SceneManager._scene instanceof Scene_Map;
        const noMenusOpen = !$gameMessage.isBusy() && !(SceneManager._scene instanceof Scene_MenuBase);
        this.visible = isSceneMap && noMenusOpen && $gameParty.members().length > 0;
    };

    Sprite_NeedsHud.prototype.updateOpacity = function() {
        if ($gameSystem._hunger === undefined) $gameSystem.initNeeds();
        
        const hungerOpacity = 255 * (100 - $gameSystem._hunger) / 100;
        const thirstOpacity = 255 * (100 - $gameSystem._thirst) / 100;
        const sleepOpacity = 255 * (100 - $gameSystem._sleep) / 100;

        this._hungerIcon.opacity = hungerOpacity;
        this._thirstIcon.opacity = thirstOpacity;
        this._sleepIcon.opacity = sleepOpacity;
    };

    // --- Integración con la Escena del Mapa ---
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.call(this);
        this.createNeedsHud();
    };

    Scene_Map.prototype.createNeedsHud = function() {
        this._needsHud = new Sprite_NeedsHud();
        this.addChild(this._needsHud);
    };

})();