/*:
 * @target MZ
 * @plugindesc Refresca y reordena automáticamente el sprite del jugador para evitar errores visuales tras matar enemigos en Alpha ABS Z. Optimizado.
 * @author ChatGPT
 * @help
 * Este plugin verifica si el sprite del jugador está visualmente por encima
 * de tiles altos (como árboles) y, si lo está, lo reinserta en la capa de
 * render para forzar el orden correcto.
 * 
 * No requiere configuración. Cargar debajo de Alpha_ABSZ.js.
 */

(function() {
  let refreshTimer = 0;

  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    refreshTimer++;
    if (refreshTimer < 30) return; // cada 0.5 segundos
    refreshTimer = 0;

    const spriteset = this._spriteset;
    const player = $gamePlayer;
    const tilemap = spriteset._tilemap;

    const sprite = spriteset._characterSprites.find(s => s._character === player);
    if (!sprite) return;

    const playerX = player._realX;
    const playerY = player._realY;

    // Verificar si el tile actual tiene prioridad por encima del jugador (tipo A2 árboles)
    const tileId = $gameMap.tileId(Math.floor(playerX), Math.floor(playerY), 1);
    const flags = $gameMap.tilesetFlags();
    const tileIsAbove = (flags[tileId] & 0x10) !== 0; // Flag 0x10 = "Por encima del jugador"

    if (tileIsAbove || sprite.z !== 3 || sprite.y !== player.screenY()) {
      // Refrescar sprite del jugador si algo está desincronizado
      sprite.z = 3;
      sprite.y = player.screenY();

      // Reinsertar sprite al final de la lista para forzar orden de dibujo correcto
      const index = spriteset._characterSprites.indexOf(sprite);
      if (index > -1) {
        spriteset._characterSprites.splice(index, 1);
        spriteset._characterSprites.push(sprite);
        spriteset.sortChildren(); // Asegurar orden visual correcto
      }
    }
  };
})();
