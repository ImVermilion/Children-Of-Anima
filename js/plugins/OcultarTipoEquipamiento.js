/*:
 * @target MZ
 * @plugindesc Oculta ítems de tipo de equipamiento específico como "Pelo" (armaduras, accesorios, etc.) en todo el juego y plugins comunes. v1.3
 * @author GPT
 * 
 * @help
 * Este plugin oculta ítems cuyo tipo de equipamiento coincida con un nombre como "Pelo".
 * No aparecerán en menús, inventario, equipo, estado ni en ventanas de plugins externos.
 * El slot de equipamiento sigue visible, pero nunca muestra el objeto ni permite interactuar con él.
 * Para ocultar otros tipos, edita la lista hiddenTypeNames.
 */

(() => {
  const hiddenTypeNames = ["Pelo"]; // <- Cambia aquí los nombres que quieras ocultar

  let hiddenEtypes = [];

  // Inicializar después de que se haya cargado la base de datos
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    hiddenEtypes = $dataSystem.equipTypes
      .map((name, id) => ({ name, id }))
      .filter(e => hiddenTypeNames.includes(e.name))
      .map(e => e.id);
    _Scene_Boot_start.call(this);
  };

  function isHiddenEquip(item) {
    return item && typeof item.etypeId === "number" && hiddenEtypes.includes(item.etypeId);
  }

  // Ocultar en Game_Party (inventario)
  const _Game_Party_allItems = Game_Party.prototype.allItems;
  Game_Party.prototype.allItems = function() {
    return _Game_Party_allItems.call(this).filter(item => !isHiddenEquip(item));
  };

  // Ocultar en ventana de objetos
  const _Window_ItemList_includes = Window_ItemList.prototype.includes;
  Window_ItemList.prototype.includes = function(item) {
    if (isHiddenEquip(item)) return false;
    return _Window_ItemList_includes.call(this, item);
  };

  // Ocultar en ventana de objetos equipables
  const _Window_EquipItem_includes = Window_EquipItem.prototype.includes;
  Window_EquipItem.prototype.includes = function(item) {
    if (isHiddenEquip(item)) return false;
    return _Window_EquipItem_includes.call(this, item);
  };

  // Ocultar el objeto equipado en el slot si es oculto (pero NO el nombre del slot)
  const _Window_EquipSlot_drawItem = Window_EquipSlot.prototype.drawItem;
  Window_EquipSlot.prototype.drawItem = function(index) {
    const item = this._actor ? this._actor.equips()[index] : null;
    if (isHiddenEquip(item)) {
      // Dibuja el slot como vacío (sin icono ni nombre de objeto)
      const rect = this.itemRectForText(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isEnabled(index));
      this.drawText('', rect.x, rect.y, rect.width, 'left');
      this.changePaintOpacity(true);
      return;
    }
    _Window_EquipSlot_drawItem.call(this, index);
  };

  // Evitar que el objeto oculto sea seleccionable en la ventana de equipamiento
  const _Window_EquipSlot_isEnabled = Window_EquipSlot.prototype.isEnabled;
  Window_EquipSlot.prototype.isEnabled = function(index) {
    const item = this._actor ? this._actor.equips()[index] : null;
    if (isHiddenEquip(item)) return false;
    return _Window_EquipSlot_isEnabled.call(this, index);
  };

  // Bloquear que se equipe con Optimizar o Quitar Todo
  const _Game_Actor_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
  Game_Actor.prototype.optimizeEquipments = function() {
    const slots = this.equipSlots();
    for (let i = 0; i < slots.length; i++) {
      const bestItem = this.bestEquipItem(i);
      if (bestItem && !isHiddenEquip(bestItem)) {
        this.changeEquip(i, bestItem);
      } else if (bestItem && isHiddenEquip(bestItem)) {
        this.changeEquip(i, null);
      }
    }
    // Limpia cualquier equipo oculto que haya quedado
    this.equips().forEach((item, i) => {
      if (isHiddenEquip(item)) this.changeEquip(i, null);
    });
  };

  const _Game_Actor_clearEquipments = Game_Actor.prototype.clearEquipments;
  Game_Actor.prototype.clearEquipments = function() {
    const slots = this.equipSlots();
    for (let i = 0; i < slots.length; i++) {
      const current = this.equips()[i];
      if (current && isHiddenEquip(current)) {
        this.changeEquip(i, null);
      } else if (current && !isHiddenEquip(current)) {
        this.changeEquip(i, null);
      }
    }
  };

  // PKD_MapInventory compatibilidad
  if (window.Game_Party) {
    const _pGetAllItemsByMICategory = Game_Party.prototype.getAllItemsByMICategory;
    if (_pGetAllItemsByMICategory) {
      Game_Party.prototype.getAllItemsByMICategory = function(cat, includeEquipped) {
        const result = _pGetAllItemsByMICategory.call(this, cat, includeEquipped);
        return result.filter(item => !isHiddenEquip(item));
      };
    }

    const _pUserNoteItems = Game_Party.prototype.miGetStuffByUserNote;
    if (_pUserNoteItems) {
      Game_Party.prototype.miGetStuffByUserNote = function(note) {
        return _pUserNoteItems.call(this, note).filter(item => !isHiddenEquip(item));
      };
    }
  }

  // VisuMZ Estado
  if (window.Window_StatusEquip) {
    const _refreshStatusEquip = Window_StatusEquip.prototype.refresh;
    Window_StatusEquip.prototype.refresh = function() {
      _refreshStatusEquip.call(this);
      if (this._data) {
        this._data = this._data.filter(item => !isHiddenEquip(item));
      }
    };
  }

})();