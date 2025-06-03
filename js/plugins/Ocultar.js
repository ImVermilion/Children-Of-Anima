/*:
 * @target MZ
 * @plugindesc Oculta ciertos tipos de equipamiento del menú e inventario y los protege de ser cambiados. v1.2 🛡️
 * @author GPT
 */

(() => {
  const hiddenTypes = ["Pelo"]; // Puedes agregar más: ["Pelo", "Guantes", "Cola"]

  // ============ OCULTAR EN MENÚ DE EQUIPO ============
  Window_EquipSlot.prototype.visibleSlots = function() {
    return this._actor.equipSlots().map((slot, index) => index)
      .filter(index => {
        const etypeId = this._actor.equipSlots()[index];
        const etypeName = $dataSystem.equipTypes[etypeId];
        return !hiddenTypes.includes(etypeName);
      });
  };

  Window_EquipSlot.prototype.maxItems = function() {
    return this._actor ? this.visibleSlots().length : 0;
  };

  Window_EquipSlot.prototype.item = function(index) {
    return this._actor.equips()[this.visibleSlots()[index]];
  };

  Window_EquipSlot.prototype.slotName = function(index) {
    const etypeId = this._actor.equipSlots()[index];
    return $dataSystem.equipTypes[etypeId];
  };

  Window_EquipSlot.prototype.drawItem = function(index) {
    const realIndex = this.visibleSlots()[index];
    const rect = this.itemRect(index);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(this.slotName(realIndex), rect.x, rect.y, 138);
    const item = this._actor.equips()[realIndex];
    this.drawItemName(item, rect.x + 138, rect.y, rect.width - 138);
  };

  // ============ OCULTAR EN INVENTARIO ============
  const _Window_ItemList_includes = Window_ItemList.prototype.includes;
  Window_ItemList.prototype.includes = function(item) {
    if (item && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
      const etypeName = $dataSystem.equipTypes[item.etypeId];
      if (hiddenTypes.includes(etypeName)) {
        return false;
      }
    }
    return _Window_ItemList_includes.call(this, item);
  };

  // ============ PROTEGER DE "QUITAR TODO" ============
  Game_Actor.prototype.clearEquipments = function() {
    const equipSlots = this.equipSlots();
    for (let i = 0; i < equipSlots.length; i++) {
      const etypeId = equipSlots[i];
      const etypeName = $dataSystem.equipTypes[etypeId];
      if (!hiddenTypes.includes(etypeName)) {
        this.changeEquip(i, null);
      }
    }
  };

  // ============ PROTEGER DE "OPTIMIZAR" ============
  Game_Actor.prototype.optimizeEquipments = function() {
    this.clearEquipments();
    for (let i = 0; i < this.equipSlots().length; i++) {
      const etypeId = this.equipSlots()[i];
      const etypeName = $dataSystem.equipTypes[etypeId];
      if (hiddenTypes.includes(etypeName)) continue;

      const slot = i;
      const bestItem = this.bestEquipItem(slot);
      if (bestItem) {
        this.changeEquip(slot, bestItem);
      }
    }
  };
})();
