/*:
 * @target MZ
 * @plugindesc Individual enemy respawn system with customizable timers and switches - by Vermilion Games
 * @author Vermilion Games
 * @help
 * 
 * This plugin manages individual respawn timers for events (enemies, plants, phases, etc.) even if you are not on the same map.
 * 
 * Usage:
 * 1. When an event "dies" or changes phase, call from event script:
 *      RespawnManager.markAsDeadForRespawn(mapId, eventId, options);
 *    where options is an optional object with:
 *      - time: respawn time in milliseconds (default 60000)
 *      - activateSwitches: array of local switches to activate immediately (default ['A'])
 *      - onRespawnDeactivate: array of local switches to deactivate when timer ends (default ['A'])
 *      - onRespawnActivate: array of local switches to activate when timer ends (default [])
 * 
 * 2. Use local switches in event pages to represent different states (alive, dead, growing phases, etc.)
 * 3. The plugin will automatically handle timers and switch changes globally.
 * 
 * Spanish:
 * 
 * Este plugin gestiona timers de reaparición individuales para eventos (enemigos, plantas, fases, etc.) incluso si no estás en el mismo mapa.
 * 
 * Uso:
 * 1. Cuando un evento "muere" o cambia de fase, llama desde el script del evento:
 *      RespawnManager.markAsDeadForRespawn(mapId, eventId, opciones);
 *    donde opciones es un objeto opcional con:
 *      - time: tiempo en milisegundos para reaparecer (por defecto 60000)
 *      - activateSwitches: array de interruptores locales a activar inmediatamente (por defecto ['A'])
 *      - onRespawnDeactivate: array de interruptores locales a desactivar cuando termine el tiempo (por defecto ['A'])
 *      - onRespawnActivate: array de interruptores locales a activar cuando termine el tiempo (por defecto [])
 * 
 * 2. Usa interruptores locales en las páginas del evento para representar diferentes estados (vivo, muerto, fases de crecimiento, etc.)
 * 3. El plugin manejará automáticamente los timers y cambios de interruptores a nivel global.
 */

(() => {
  const RespawnManager = {
    _deadEvents: {},

      markAsDeadForRespawn(mapId, eventId, options = {}) {
      // opciones por defecto
      const defaults = {
        time: 60000, // ms
        activateSwitches: ['A'], // interruptores locales a activar al morir
        onRespawnActivate: [],    // interruptores a activar al respawnear
        onRespawnDeactivate: ['A'], // interruptores a desactivar al respawnear
      };
      const config = Object.assign({}, defaults, options);

      const key = `${mapId}_${eventId}`;
      this._deadEvents[key] = {
        startTime: performance.now(),
        respawnTime: config.time,
        activateSwitches: config.activateSwitches,
        onRespawnActivate: config.onRespawnActivate,
        onRespawnDeactivate: config.onRespawnDeactivate,
      };

      config.activateSwitches.forEach(sw => {
        $gameSelfSwitches.setValue([mapId, eventId, sw], true);
      });
    },
   
    shouldRespawn(deadData) {
      return performance.now() - deadData.startTime >= deadData.respawnTime;
    },
    
    update() {
      for (const key in this._deadEvents) {
        const [mapIdStr, eventIdStr] = key.split('_');
        const mapId = Number(mapIdStr);
        const eventId = Number(eventIdStr);
        const data = this._deadEvents[key];
        if (this.shouldRespawn(data)) {
          // Desactiva interruptores al respawnear
          data.onRespawnDeactivate.forEach(sw => {
            $gameSelfSwitches.setValue([mapId, eventId, sw], false);
          });
          // Activa interruptores al respawnear
          data.onRespawnActivate.forEach(sw => {
            $gameSelfSwitches.setValue([mapId, eventId, sw], true);
          });
          delete this._deadEvents[key];
        }
      }
    }
  };
  window.RespawnManager = RespawnManager;

  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    RespawnManager.update();
  };
})();
