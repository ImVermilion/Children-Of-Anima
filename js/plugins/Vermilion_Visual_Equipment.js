/*:
 * @target MZ
 * @plugindesc [v2.0] Displays visual equipment on the character sprite using notetags.
 * @author Vermilion Games
 * @orderAfter Vermilion_Core
 * @version 2.0
 *
 * @help
 * Vermilion Visual Equipment - v2.0
 * ----------------------------------------------------------------------------
 * AHORA REQUIERE Vermilion_Core.js
 *
 * La lógica de colores de pelo ha sido movida al Core para centralizarla.
 * Este plugin ahora consulta al Core para saber qué color aplicar.
 * ----------------------------------------------------------------------------
 *
 * @param imageFolder
 * @text Equipment Image Folder
 * @type string
 * @default img/Vermilion_VE/
 * @desc Path to the folder where the equipment images are stored.
 */
(function () {
    "use strict";
     if (typeof Vermilion === 'undefined' || !Vermilion.Core) {
        throw new Error("Vermilion_Visual_Equipment.js requiere Vermilion_Core.js.");
    }

    const pluginName = "Vermilion_Visual_Equipment";
    window.VisualEquipmentManager = {
        parameters: PluginManager.parameters(pluginName),
        getImageFolder: function() { /* ...código sin cambios... */ },
        aliases: { "BasePJ2": "BasePJ" },
        
        // --- LÓGICA DE COLOR ELIMINADA DE AQUÍ ---

        parseItemNotetags: function(item) { /* ...código sin cambios... */ },
        getHideSet: function(actor) { /* ...código sin cambios... */ }
    };
    // Pego el código sin cambios aquí para acortar, usa el que ya tienes.
    VisualEquipmentManager.getImageFolder = function() {
        const path = this.parameters['imageFolder'] || 'img/Vermilion_VE/';
        return path.endsWith('/') ? path : path + '/';
    };
    VisualEquipmentManager.parseItemNotetags = function(item) {
        if (!item || !item.meta || !item.meta['equipment image']) return null;
        const data = { identifier: item.meta['equipment image'].trim(), offsetX: 0, offsetY: 0, z: 0, identifierB: null, offsetXB: null, offsetYB: null, zB: null, displayId: null };
        const note = item.note;
        if (item.meta['equipment offset']) { const match = item.meta['equipment offset'].match(/(-?\d+)\s*,\s*(-?\d+)/); if (match) { data.offsetX = Number(match[1]); data.offsetY = Number(match[2]); } }
        if (item.meta['equipment z']) { data.z = Number(item.meta['equipment z']); }
        const imageBMatch = note.match(/<equipment imageB:\s*([^>]+)>/i); if (imageBMatch) data.identifierB = imageBMatch[1].trim();
        const offsetBMatch = note.match(/<equipment offsetB:\s*(-?\d+)\s*,\s*(-?\d+)>/i); if (offsetBMatch) { data.offsetXB = Number(offsetBMatch[1]); data.offsetYB = Number(offsetBMatch[2]); }
        const zBMatch = note.match(/<equipment zB:\s*(-?\d+)>/i); if (zBMatch) data.zB = Number(zBMatch[1]);
        if (data.identifierB) { if (data.offsetXB === null) data.offsetXB = data.offsetX; if (data.offsetYB === null) data.offsetYB = data.offsetY; if (data.zB === null) data.zB = data.z; }
        const idMatch = note.match(/<DisplayId:\s*([\w\s]+)>/i); if (idMatch) data.displayId = idMatch[1].trim();
        return data;
    };
    VisualEquipmentManager.getHideSet = function(actor) {
        const hideIds = new Set();
        actor.equips().filter(Boolean).forEach(item => {
            if (!item.note) return;
            const matches = item.note.match(/<Hide:\s*([\w\s]+)>/gi);
            if (matches) { matches.forEach(match => { const tag = match.match(/<Hide:\s*([\w\s]+)>/i)[1].trim(); hideIds.add(tag); }); }
        });
        return hideIds;
    };

    // --- EL RESTO DEL PLUGIN (CON LA MODIFICACIÓN IMPORTANTE) ---
    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.call(this, character);
        if (character instanceof Game_Player) { this._visualLayers = []; this._lastVisualData = null; this._lastCharacterName = ""; this._needsVisualSort = false; }
    };
    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.call(this);
        if (this._character instanceof Game_Player) { this.updateVisualLayers(); }
    };
    Sprite_Character.prototype.updateVisualLayers = function() {
        const actor = $gameParty.leader(); if (!actor) { this.clearVisualLayers(); return; }
        const characterName = this._character.characterName();
        const equippedData = this.collectEquippedData(actor);
        if (this.needsFullRedraw(characterName, equippedData)) { this._lastCharacterName = characterName; this._lastVisualData = JSON.stringify(equippedData); this.rebuildSpriteLayers(equippedData); }
        this.updateAllLayerFrames();
        if (this._needsVisualSort) { this.sortChildren(); this._needsVisualSort = false; }
    };
    Sprite_Character.prototype.collectEquippedData = function(actor) { return actor.equips().map(item => VisualEquipmentManager.parseItemNotetags(item)).filter(Boolean).sort((a, b) => a.z - b.z); };
    Sprite_Character.prototype.needsFullRedraw = function(characterName, newData) { if (this._lastCharacterName !== characterName) return true; return JSON.stringify(newData) !== this._lastVisualData; };
    Sprite_Character.prototype.clearVisualLayers = function() { if (this._visualLayers && this._visualLayers.length > 0) { this._visualLayers.forEach(layer => this.removeChild(layer)); this._visualLayers = []; this._lastVisualData = null; this._lastCharacterName = ""; } };
    Sprite_Character.prototype.rebuildSpriteLayers = function(equippedData) { this.clearVisualLayers(); this._visualLayers = equippedData.map(data => this.createLayerSprite(data)); this.sortChildren(); };
    Sprite_Character.prototype.createLayerSprite = function(data) {
        const sprite = new Sprite(); sprite.anchor.set(0.5, 1); sprite.visualData = data; sprite._currentIdentifier = null;
        if (data.identifier.toLowerCase().includes("pelo")) {
            if (typeof GradientMapFilter !== 'undefined') { sprite.gradientFilter = new GradientMapFilter(); sprite.filters = [sprite.gradientFilter]; }
        }
        this.addChild(sprite); return sprite;
    };
    Sprite_Character.prototype.updateAllLayerFrames = function() {
        const actor = $gameParty.leader(); if (!actor || !this._visualLayers) return;
        const hideSet = VisualEquipmentManager.getHideSet(actor);
        
        // --- CAMBIO IMPORTANTE: AHORA CONSULTA AL CORE ---
        const activeColorSwitch = Vermilion.Core.getActiveHairColorSwitch();
        const hairColor = activeColorSwitch ? Vermilion.Core.hairColorMap[activeColorSwitch] : null;
        
        const direction = this._character.direction();
        this._visualLayers.forEach(layer => {
            const data = layer.visualData;
            const isFacingUp = direction === 8;
            const useBackImage = isFacingUp && data.identifierB;
            const activeIdentifier = useBackImage ? data.identifierB : data.identifier;
            const activeOffsetX = useBackImage ? data.offsetXB : data.offsetX;
            const activeOffsetY = useBackImage ? data.offsetYB : data.offsetY;
            const activeZ = useBackImage ? data.zB : data.z;
            if (layer.z !== activeZ) { layer.z = activeZ; this._needsVisualSort = true; }
            if (layer._currentIdentifier !== activeIdentifier) {
                layer._currentIdentifier = activeIdentifier;
                let baseName = this._character.characterName().replace(/^[$!]/, '');
                if (VisualEquipmentManager.aliases[baseName]) { baseName = VisualEquipmentManager.aliases[baseName]; }
                const folder = VisualEquipmentManager.getImageFolder(); const finalImageName = `${baseName}_${activeIdentifier}`;
                layer.bitmap = ImageManager.loadBitmap(folder, finalImageName);
            }
            const isHair = data.identifier.toLowerCase().includes("pelo");
            if (isHair && layer.gradientFilter) {
                const color = hairColor || { shadow: [0, 0, 0], highlight: [255, 255, 255] };
                layer.gradientFilter.shadowColor = color.shadow; layer.gradientFilter.highlightColor = color.highlight;
            }
            const shouldHide = data.displayId && hideSet.has(data.displayId);
            layer.visible = !shouldHide && layer.bitmap && layer.bitmap.isReady();
            if (layer.visible) { this.updateLayerFrame(layer, activeOffsetX, activeOffsetY); }
        });
    };
    Sprite_Character.prototype.updateLayerFrame = function(sprite, offsetX, offsetY) {
        sprite.x = offsetX; sprite.y = offsetY;
        const pw = this.patternWidth(); const ph = this.patternHeight(); const sx = this.characterPatternX() * pw; const sy = this.characterPatternY() * ph;
        sprite.setFrame(sx, sy, pw, ph);
    };
    const _Sprite_Character_sortChildren = Sprite.prototype.sortChildren;
    Sprite_Character.prototype.sortChildren = function() { _Sprite_Character_sortChildren.call(this); };
    const _Sprite_prototype_render = Sprite.prototype.render;
    Sprite.prototype.render = function(renderer) { /* ...código sin cambios... */ };
    Sprite.prototype.render = function(renderer) {
        if (this instanceof Sprite_Character && this._character instanceof Game_Player && this._visualLayers) {
            if (!this.visible || this.worldAlpha <= 0 || !this.renderable) return;
            const layersBelow = [], layersAbove = [];
            for (const child of this.children) { if (child.z < 0) layersBelow.push(child); else layersAbove.push(child); }
            layersBelow.sort((a, b) => a.z - b.z); layersAbove.sort((a, b) => a.z - b.z);
            for (const child of layersBelow) child.render(renderer);
            this._render(renderer);
            for (const child of layersAbove) child.render(renderer);
        } else { _Sprite_prototype_render.call(this, renderer); }
    };
})();