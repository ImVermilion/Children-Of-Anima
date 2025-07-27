/*:
 * @plugindesc [v1.0] Zoom por mapa, solo acercar y sin afectar al HUD.
 * @author Vermilion Games
 * @target MZ
 * @url https://google.com
 * @help Vermilion_MapZoom.js
 *
 * Este plugin permite al jugador acercar la vista en el mapa
 * usando la rueda del ratón. El zoom no afecta a los elementos del HUD.
 *
 * Para forzar un zoom específico en un mapa, añade la siguiente etiqueta
 * en el campo de "Notas" de las propiedades de ese mapa:
 *
 * <MapZoom: X>
 *
 * Reemplaza X por el nivel de zoom que desees (ej. <MapZoom: 2.5>).
 * En los mapas con esta etiqueta, la rueda del ratón se desactivará.
 *
 * @param maxZoom
 * @text Zoom Máximo
 * @desc El nivel máximo de zoom que se puede alcanzar (un número más alto significa más cerca).
 * @type number
 * @default 3
 * @min 1
 *
 * @param zoomSpeed
 * @text Velocidad de Zoom
 * @desc La velocidad a la que cambia el zoom con cada movimiento de la rueda.
 * @type number
 * @default 0.125
 * @min 0.01
 * @decimals 3
 */

(() => {
    const pluginName = "Vermilion_MapZoom";
    const parameters = PluginManager.parameters(pluginName);
    const maxZoom = Number(parameters['maxZoom'] || 3);
    const zoomSpeed = Number(parameters['zoomSpeed'] || 0.125);
    const minZoom = 1.0;

    let currentZoom = 1.0;
    let forcedMapZoom = 0; 

    // --- DataManager ---
    const _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataMap) {
            const note = $dataMap.note.match(/<MapZoom:\s*(\d+\.?\d*)>/i);
            forcedMapZoom = note ? parseFloat(note[1]) : 0;
            if (forcedMapZoom > 0) {
                currentZoom = forcedMapZoom;
            } else {
                currentZoom = 1.0; 
            }
        }
    };

    // --- Spriteset_Map ---
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updateVermilionZoom();
    };

    Spriteset_Map.prototype.updateVermilionZoom = function() {
        if (SceneManager._scene instanceof Scene_Map) {
            if (forcedMapZoom <= 0 && TouchInput.wheelY !== 0) {
                const wheelY = TouchInput.wheelY;
                if (wheelY < 0) {
                    currentZoom += zoomSpeed;
                } else {
                    currentZoom -= zoomSpeed;
                }
                currentZoom = currentZoom.clamp(minZoom, maxZoom);
            }

            this._baseSprite.scale.x = currentZoom;
            this._baseSprite.scale.y = currentZoom;

            const player = $gamePlayer;
            this._baseSprite.x = -((player.screenX() * (currentZoom - 1)));
            this._baseSprite.y = -((player.screenY() * (currentZoom - 1)));
        }
    };

    // --- Game_Player ---
    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        if (this.isTransferring()) {
            
        }
        _Game_Player_performTransfer.call(this);
    };

})();