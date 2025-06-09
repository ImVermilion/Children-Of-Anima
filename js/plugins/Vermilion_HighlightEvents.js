/*:
 * @target MZ
 * @plugindesc Dibuja un contorno blanco en eventos con <highlight> al acercarse o pasar el mouse encima.
 * @Vermilion Games
 *
 * @help
 * Coloca el comentario <highlight> en un evento para que reciba un contorno blanco.
 */

(() => {
  const HIGHLIGHT_RANGE = 1;
  const GlowFilter = PIXI.filters.GlowFilter;

  // Marca eventos con <highlight>
  const _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function () {
    _Game_Event_setupPage.call(this);
    this._highlight = false;
    if (this.page()) {
      for (const command of this.list()) {
        if ((command.code === 108 || command.code === 408) && command.parameters[0].includes("<highlight>")) {
          this._highlight = true;
          break;
        }
      }
    }
  };

  // Actualización del sprite con animación suave
  const _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    _Sprite_Character_update.call(this);
    if (this._character instanceof Game_Event && this._character._highlight) {
      this.updateHighlight();
    } else {
      this.removeHighlight();
    }
  };

  Sprite_Character.prototype.updateHighlight = function () {
    const isNear = this.isNearPlayer();
    const isHover = this.isMouseOver();

    if (isNear || isHover) {
      if (!this._highlightFilter) {
        this._highlightFilter = new GlowFilter({
          distance: 1,
          outerStrength: 2.5,
          innerStrength: 1,
          color: 0xffffff,
          quality: 1.5
        });
        this._highlightTime = 0;
        this.filters = [this._highlightFilter];
      }

      // Animación de respiración (parpadeo suave)
      this._highlightTime += 0.1;
      const pulse = 1.2 + Math.sin(this._highlightTime) * 0.8;
      this._highlightFilter.outerStrength = pulse;

    } else {
      this.removeHighlight();
    }
  };

  Sprite_Character.prototype.isNearPlayer = function () {
    const dx = Math.abs($gamePlayer.x - this._character.x);
    const dy = Math.abs($gamePlayer.y - this._character.y);
    return dx <= HIGHLIGHT_RANGE && dy <= HIGHLIGHT_RANGE;
  };

  Sprite_Character.prototype.isMouseOver = function () {
    const tw = $gameMap.tileWidth();
    const th = $gameMap.tileHeight();
    const x = this._character.screenX();
    const y = this._character.screenY() - this.height / 2;

    const mx = TouchInput.x;
    const my = TouchInput.y;

    return mx >= x - tw / 2 && mx <= x + tw / 2 && my >= y - th && my <= y;
  };

  Sprite_Character.prototype.removeHighlight = function () {
    if (this._highlightFilter) {
      this.filters = null;
      this._highlightFilter = null;
      this._highlightTime = 0;
    }
  };
})();