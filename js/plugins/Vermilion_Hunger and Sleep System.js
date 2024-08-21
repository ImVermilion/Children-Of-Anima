/*:
 * @target MZ
 * @plugindesc Plugin para gestionar hambre, sed y sueño en RPG Maker MZ con efectos negativos. 
 * @author Vermilion Games
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
 * @desc El nivel de hambre por debajo del cual se muestra el icono y se aplica el efecto negativo.
 * @type number
 * @default 20
 *
 * @param ThirstThreshold
 * @text Umbral de Sed
 * @desc El nivel de sed por debajo del cual se muestra el icono y se aplica el efecto negativo.
 * @type number
 * @default 20
 *
 * @param SleepThreshold
 * @text Umbral de Sueño
 * @desc El nivel de sueño por debajo del cual se muestra el icono y se aplica el efecto negativo.
 * @type number
 * @default 20
 *
 * @param HungerIcon
 * @text Icono de Hambre
 * @desc Icono que se muestra cuando el hambre es baja.
 * @type number
 * @default 64
 *
 * @param ThirstIcon
 * @text Icono de Sed
 * @desc Icono que se muestra cuando la sed es baja.
 * @type number
 * @default 65
 *
 * @param SleepIcon
 * @text Icono de Sueño
 * @desc Icono que se muestra cuando el sueño es bajo.
 * @type number
 * @default 66
 *
 * @param HungerHpReduction
 * @text Reducción de Vida por Hambre
 * @desc El porcentaje de reducción de vida máxima cuando el hambre es baja.
 * @type number
 * @default 10
 *
 * @param ThirstHitRateReduction
 * @text Reducción de Tasa de Golpe por Sed
 * @desc El porcentaje de reducción de la tasa de golpe cuando la sed es baja.
 * @type number
 * @default 10
 *
 * @help
 * Este plugin gestiona las necesidades de hambre, sed y sueño de los personajes.
 * Las variables disminuyen con el paso del tiempo. 
 * Si alguna de las necesidades es baja, se muestra un icono en la pantalla y se aplican efectos negativos.
 *
 * @command adjustHunger
 * @text Ajustar Hambre
 * @desc Ajusta el nivel de hambre del jugador.
 * @arg value
 * @type number
 * @default 10
 *
 * @command adjustThirst
 * @text Ajustar Sed
 * @desc Ajusta el nivel de sed del jugador.
 * @arg value
 * @type number
 * @default 10
 *
 * @command adjustSleep
 * @text Ajustar Sueño
 * @desc Ajusta el nivel de sueño del jugador.
 * @arg value
 * @type number
 * @default 10
 */

(() => {
    const parameters = PluginManager.parameters('Vermilion_Hunger and Sleep System');
    const hungerRate = parseFloat(parameters['HungerRate'] || 0.1);
    const thirstRate = parseFloat(parameters['ThirstRate'] || 0.1);
    const sleepRate = parseFloat(parameters['SleepRate'] || 0.1);
    const hungerThreshold = parseInt(parameters['HungerThreshold'] || 20);
    const thirstThreshold = parseInt(parameters['ThirstThreshold'] || 20);
    const sleepThreshold = parseInt(parameters['SleepThreshold'] || 20);
    const hungerIcon = parseInt(parameters['HungerIcon'] || 64);
    const thirstIcon = parseInt(parameters['ThirstIcon'] || 65);
    const sleepIcon = parseInt(parameters['SleepIcon'] || 66);
    const hungerHpReduction = parseFloat(parameters['HungerHpReduction'] || 10);
    const thirstHitRateReduction = parseFloat(parameters['ThirstHitRateReduction'] || 10);

    let hunger = 100;
    let thirst = 100;
    let sleep = 100;

    const updateNeeds = () => {
        const deltaTime = 1 / 60;
        hunger = Math.max(hunger - hungerRate * deltaTime, 0);
        thirst = Math.max(thirst - thirstRate * deltaTime, 0);
        sleep = Math.max(sleep - sleepRate * deltaTime, 0);

        $gameParty.members().forEach(actor => {
            if (hunger < hungerThreshold) {
                actor.addState(11); // ID de estado negativo de hambre
                actor._paramPlus[0] -= (actor.paramBase(0) * (hungerHpReduction / 100));
            } else {
                actor.removeState(11);
                actor._paramPlus[0] = 0; // Resetear la reducción de HP
            }
            if (thirst < thirstThreshold) {
                actor.addState(14); // ID de estado negativo de sed
                actor._hitRate = 1 - (thirstHitRateReduction / 100);
            } else {
                actor.removeState(14);
                actor._hitRate = 1; // Resetear la tasa de golpe
            }
            if (sleep < sleepThreshold) {
                actor.addState(10); // ID de estado negativo de sueño
                $gamePlayer.setMoveSpeed(3); // Velocidad reducida
            } else {
                actor.removeState(10);
                $gamePlayer.setMoveSpeed(4); // Velocidad normal
            }
        });
    };

    const _Scene_Map_prototype_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_prototype_update.call(this);
        updateNeeds();
        this.updateNeedsIcons();
    };

    Scene_Map.prototype.updateNeedsIcons = function() {
        const icons = [];
        if (hunger < hungerThreshold) {
            icons.push(hungerIcon);
        }
        if (thirst < thirstThreshold) {
            icons.push(thirstIcon);
        }
        if (sleep < sleepThreshold) {
            icons.push(sleepIcon);
        }

        this.clearIcons();
        icons.forEach((icon, index) => {
            const x = Graphics.width / 2 + index * 40 - (icons.length - 1) * 20;
            const y = 20;
            this.showIcon(x, y, icon);
        });
    };

    Scene_Map.prototype.showIcon = function(x, y, iconIndex) {
        const bitmap = ImageManager.loadSystem('IconSet');
        const pw = 32;
        const ph = 32;
        const sx = iconIndex % 16 * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        const iconSprite = new Sprite();
        iconSprite.bitmap = new Bitmap(pw, ph);
        iconSprite.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
        iconSprite.x = x;
        iconSprite.y = y;
        this.addChild(iconSprite);
        this._needIcons = this._needIcons || [];
        this._needIcons.push(iconSprite);
    };

    Scene_Map.prototype.clearIcons = function() {
        if (this._needIcons) {
            this._needIcons.forEach(icon => {
                this.removeChild(icon);
            });
        }
        this._needIcons = [];
    };

    PluginManager.registerCommand('Vermilion_Hunger and Sleep System', 'adjustHunger', args => {
        hunger = Math.min(hunger + parseInt(args.value), 100);
    });

    PluginManager.registerCommand('Vermilion_Hunger and Sleep System', 'adjustThirst', args => {
        thirst = Math.min(thirst + parseInt(args.value), 100);
    });

    PluginManager.registerCommand('Vermilion_Hunger and Sleep System', 'adjustSleep', args => {
        sleep = Math.min(sleep + parseInt(args.value), 100);
    });
})();
