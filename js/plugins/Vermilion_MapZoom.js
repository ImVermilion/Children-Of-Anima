/*:
 * @plugindesc [v1.3] Zoom por mapa, con persistencia inteligente y compatible con HUD y luces.
 * @author Vermilion Games
 * @target MZ
 * @url https://google.com
 * @help Vermilion_MapZoom.js
 *
 * [v1.3] por Gemini
 * - La persistencia de zoom ahora es inteligente. Si sales de un mapa con zoom
 * forzado, se restaurará el zoom que tenías antes de entrar, en lugar de
 * mantener el zoom forzado.
 *
 * [v1.2] por Gemini
 * - Corregido un error que afectaba a elementos del HUD (minimapas, etc.).
 * - El zoom ahora solo se aplica a la capa del mapa y a la de OcRam_Lights.
 *
 * [v1.1] por Gemini
 * - Solucionada incompatibilidad con plugins de luces (ej. OcRam_Lights).
 * - Añadido parámetro 'persistZoom' para mantener el zoom entre mapas.
 *
 * Este plugin permite al jugador acercar la vista en el mapa
 * usando la rueda del ratón. El zoom no afecta a los elementos del HUD.
 *
 * Para forzar un zoom específico en un mapa, añade la siguiente etiqueta
 * en el campo de "Notas" de las propiedades de ese mapa:
 *
 * <MapZoom: X>
 *
 * @param maxZoom
 * @text Zoom Máximo
 * @desc El nivel máximo de zoom que se puede alcanzar.
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
 *
 * @param persistZoom
 * @text Persistencia del Zoom
 * @desc Mantener el nivel de zoom actual al cambiar de mapa.
 * @type boolean
 * @default false
 */

(() => {
    const pluginName = "Vermilion_MapZoom";
    const parameters = PluginManager.parameters(pluginName);
    const maxZoom = Number(parameters['maxZoom'] || 3);
    const zoomSpeed = Number(parameters['zoomSpeed'] || 0.125);
    const persistZoom = parameters['persistZoom'] === 'true';
    const minZoom = 1.0;

    let currentZoom = 1.0;
    let userPersistedZoom = 1.0; // NUEVA VARIABLE: Guarda el zoom del usuario.
    let forcedMapZoom = 0;

    // --- DataManager ---
    // MODIFICADO: Lógica de carga de zoom mejorada.
    const _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, object);
        if (object === $dataMap) {
            const note = $dataMap.note.match(/<MapZoom:\s*(\d+\.?\d*)>/i);
            forcedMapZoom = note ? parseFloat(note[1]) : 0;

            if (forcedMapZoom > 0) {
                // Si el mapa tiene un zoom forzado, lo aplicamos.
                currentZoom = forcedMapZoom;
            } else {
                // Si no hay zoom forzado, decidimos cuál restaurar.
                if (persistZoom) {
                    // Restauramos el zoom que el usuario había establecido.
                    currentZoom = userPersistedZoom;
                } else {
                    // O restablecemos el zoom por defecto.
                    currentZoom = 1.0;
                }
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
            // Lógica para cambiar el zoom con la rueda del ratón
            if (forcedMapZoom <= 0 && TouchInput.wheelY !== 0) {
                const wheelY = TouchInput.wheelY;
                if (wheelY < 0) {
                    currentZoom += zoomSpeed;
                } else {
                    currentZoom -= zoomSpeed;
                }
                currentZoom = currentZoom.clamp(minZoom, maxZoom);

                // MODIFICADO: Actualizamos la memoria del zoom del usuario solo cuando lo cambia manualmente.
                userPersistedZoom = currentZoom;
            }

            const targetX = -((($gamePlayer.screenX()) * (currentZoom - 1)));
            const targetY = -((($gamePlayer.screenY()) * (currentZoom - 1)));

            // Aplicar escala y posición al contenedor principal del mapa (_baseSprite)
            this._baseSprite.scale.x = currentZoom;
            this._baseSprite.scale.y = currentZoom;
            this._baseSprite.x = targetX;
            this._baseSprite.y = targetY;

            // Si la capa de OcRam_Lights existe, aplicarle LA MISMA transformación.
            if (this._lights) {
                this._lights.scale.x = currentZoom;
                this._lights.scale.y = currentZoom;
                this._lights.x = targetX;
                this._lights.y = targetY;
            }
        }
    };
})();