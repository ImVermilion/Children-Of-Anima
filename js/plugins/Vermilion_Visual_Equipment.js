/*:
 * @target MZ
 * @plugindesc Displays visual equipment on the character sprite using notetags. Allows for different graphics when facing up.
 * @author Vermilion Games (modified by user request)
 * @url https://vermiliongames.itch.io/
 * @version 1.2.5 (Patched)
 *
 * @help
 * Vermilion Visual Equipment - v1.2.5
 * ----------------------------------------------------------------------------
 * This plugin for RPG Maker MZ allows you to easily display equipment pieces
 * on the player's sprite using notetags. You can add helmets, armor,
 * capes, and more, with customization options.
 *
 * This version includes a patch to correctly handle negative z-indices,
 * allowing equipment to be drawn behind the character sprite using a safe
 * rendering method.
 * ----------------------------------------------------------------------------
 * HOW TO USE:
 *
 * - Make sure this file is named "Vermilion_Visual_Equipment.js".
 * - Add notetags to equipment in the database:
 *
 * <equipment image: filename>
 * The 'filename' will be combined with the character's name.
 * Ex: If the character is "BasePJ" and the notetag is <equipment image: Helmet>,
 * the plugin will look for the file "BasePJ_Helmet.png".
 * * You can also add an "alias" in the 'aliases' section, like "BasePJ2": "BasePJ", 
 * to have different character bases while reusing armors.
 *
 * <equipment offset: x, y>
 * Adjusts the image's position. Ex: <equipment offset: 0, -10>
 *
 * <equipment z: number>
 * Defines the layer order. The character sprite is at z=0.
 * A negative value (e.g., -1) will be drawn BEHIND the character.
 * A positive value (e.g., 1) will be drawn ON TOP of the character.
 *
 * --- NEW: Back-facing Graphics (v1.1.0) ---
 * You can now specify a different image and properties for when the
 * character is facing UP (direction 8).
 *
 * <equipment imageB: filename_back>
 * Image to use when the character is facing up.
 *
 * <equipment offsetB: x, y>
 * Offset for the back-facing image.
 *
 * <equipment zB: number>
 * Z-index for the back-facing image.
 *
 * Example: A cape that is behind the player (z: -1) but its back part
 * should be drawn on top (zB: 1) when facing up.
 *
 * <equipment image: CapeFront>
 * <equipment z: -1>
 * <equipment imageB: CapeBack>
 * <equipment zB: 1>
 *
 * --- Other Notetags ---
 *
 * <DisplayId: Unique_ID>
 * Assigns an identifier to a piece. Ex: <DisplayId: Helmet>
 *
 * <Hide: Unique_ID>
 * Hides a piece with the corresponding DisplayId.
 * Ex: A hairstyle could have <Hide: Helmet> to hide the hair.
 *
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

    const pluginName = "Vermilion_Visual_Equipment";
    const VisualEquipmentManager = {
        parameters: PluginManager.parameters(pluginName),
        
        getImageFolder: function() {
            const path = this.parameters['imageFolder'] || 'img/Vermilion_VE/';
            return path.endsWith('/') ? path : path + '/';
        },

        aliases: {
            "BasePJ2": "BasePJ",
        },

        hairColorMap: {
            // === Humans & Govlards: Tones based on your examples ===
            6:   { shadow: [48, 43, 88],   highlight: [149, 94, 64] },   // Brown
            7:   { shadow: [100, 56, 45],  highlight: [247, 233, 167] }, // Blond
            8:   { shadow: [191, 0, 0],    highlight: [113, 15, 88] },   // Redhead
            9:   { shadow: [0, 0, 0],      highlight: [90, 90, 90] },     // Black
            251: { shadow: [95, 90, 85],   highlight: [225, 220, 205] }, // Ash Blond (Cool and desaturated)
            252: { shadow: [70, 55, 45],   highlight: [200, 160, 120] }, // Light Brown (Natural wood tone)
            253: { shadow: [65, 30, 35],   highlight: [180, 80, 80] },   // Mahogany (Deep, dark red)
            254: { shadow: [160, 160, 175],highlight: [255, 250, 245] }, // Platinum Blond (Almost white with a cool shadow)

            // === Siverett: Ethereal and Metallic Tones ===
            150: { shadow: [200, 210, 220],highlight: [255, 255, 255] }, // Snowy White (Pure white with a light blue shadow)
            151: { shadow: [90, 100, 115], highlight: [220, 225, 230] }, // Polished Silver (Metallic gray with high contrast)
            255: { shadow: [129, 39, 79],  highlight: [136, 192, 255] }, // Glacial Ice
            256: { shadow: [95, 80, 110],  highlight: [245, 220, 230] }, // Moon Pearl (Iridescent pinkish tone)

            // === Elvemir: Mystical and Gem Tones ===
            71:  { shadow: [40, 24, 88],   highlight: [227, 148, 243] }, // Amethyst
            70:  { shadow: [129, 39, 79],  highlight: [136, 192, 255] }, // Sapphire
            69:  { shadow: [30, 40, 90],   highlight: [100, 240, 160] }, // Emerald
            68:  { shadow: [14, 60, 89],   highlight: [255, 238, 137] }, // Gold
            257: { shadow: [45, 70, 50],   highlight: [130, 170, 100] }, // Moss Green (Enchanted forest tones)
            258: { shadow: [10, 10, 40],   highlight: [90, 90, 200] },   // Night Sky
            259: { shadow: [100, 85, 115], highlight: [215, 190, 230] }, // Lavender Flower
            260: { shadow: [150, 80, 95],  highlight: [255, 190, 200] }  // Rose Quartz
        },

        getActiveHairColor: function() {
            for (const switchId in this.hairColorMap) {
                if ($gameSwitches.value(Number(switchId))) {
                    return this.hairColorMap[switchId];
                }
            }
            return null;
        },
        
        parseItemNotetags: function(item) {
            if (!item || !item.meta || !item.meta['equipment image']) {
                return null;
            }

            const data = {
                // Default ("A") values
                identifier: item.meta['equipment image'].trim(),
                offsetX: 0,
                offsetY: 0,
                z: 0,
                // Back-facing ("B") values
                identifierB: null,
                offsetXB: null,
                offsetYB: null,
                zB: null,
                // Common data
                displayId: null
            };

            const note = item.note;

            // Parse default values
            if (item.meta['equipment offset']) {
                const offsetMatch = item.meta['equipment offset'].match(/(-?\d+)\s*,\s*(-?\d+)/);
                if (offsetMatch) {
                    data.offsetX = Number(offsetMatch[1]);
                    data.offsetY = Number(offsetMatch[2]);
                }
            }
            if (item.meta['equipment z']) {
                data.z = Number(item.meta['equipment z']);
            }

            // Parse back-facing ("B") values from the full notebox
            const imageBMatch = note.match(/<equipment imageB:\s*([^>]+)>/i);
            if (imageBMatch) {
                data.identifierB = imageBMatch[1].trim();
            }

            const offsetBMatch = note.match(/<equipment offsetB:\s*(-?\d+)\s*,\s*(-?\d+)>/i);
            if (offsetBMatch) {
                data.offsetXB = Number(offsetBMatch[1]);
                data.offsetYB = Number(offsetBMatch[2]);
            }
            
            const zBMatch = note.match(/<equipment zB:\s*(-?\d+)>/i);
            if (zBMatch) {
                data.zB = Number(zBMatch[1]);
            }
            
            // If some "B" values are missing, copy them from default "A" values
            if (data.identifierB) {
                if (data.offsetXB === null) data.offsetXB = data.offsetX;
                if (data.offsetYB === null) data.offsetYB = data.offsetY;
                if (data.zB === null) data.zB = data.z;
            }

            const idMatch = note.match(/<DisplayId:\s*([\w\s]+)>/i);
            if (idMatch) {
                data.displayId = idMatch[1].trim();
            }
            
            return data;
        },

        getHideSet: function(actor) {
            const hideIds = new Set();
            actor.equips().filter(Boolean).forEach(item => {
                if (!item.note) return;
                const matches = item.note.match(/<Hide:\s*([\w\s]+)>/gi);
                if (matches) {
                    matches.forEach(match => {
                        const tag = match.match(/<Hide:\s*([\w\s]+)>/i)[1].trim();
                        hideIds.add(tag);
                    });
                }
            });
            return hideIds;
        }
    };

    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.call(this, character);
        if (character instanceof Game_Player) {
            this._visualLayers = [];
            this._lastVisualData = null;
            this._lastCharacterName = "";
            this._needsVisualSort = false;
        }
    };

    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.call(this);
        if (this._character instanceof Game_Player) {
            this.updateVisualLayers();
        }
    };

    Sprite_Character.prototype.updateVisualLayers = function() {
        const actor = $gameParty.leader();
        if (!actor) {
            this.clearVisualLayers();
            return;
        }

        const characterName = this._character.characterName();
        const equippedData = this.collectEquippedData(actor);

        if (this.needsFullRedraw(characterName, equippedData)) {
            this._lastCharacterName = characterName;
            this._lastVisualData = JSON.stringify(equippedData);
            this.rebuildSpriteLayers(equippedData);
        }

        this.updateAllLayerFrames();
        
        if (this._needsVisualSort) {
            this.sortChildren();
            this._needsVisualSort = false;
        }
    };
    
    Sprite_Character.prototype.collectEquippedData = function(actor) {
        return actor.equips()
            .map(item => VisualEquipmentManager.parseItemNotetags(item))
            .filter(Boolean)
            .sort((a, b) => a.z - b.z); // Initial sort by default z
    };

    Sprite_Character.prototype.needsFullRedraw = function(characterName, newData) {
        if (this._lastCharacterName !== characterName) return true;
        return JSON.stringify(newData) !== this._lastVisualData;
    };
    
    Sprite_Character.prototype.clearVisualLayers = function() {
        if (this._visualLayers && this._visualLayers.length > 0) {
            this._visualLayers.forEach(layer => this.removeChild(layer));
            this._visualLayers = [];
            this._lastVisualData = null;
            this._lastCharacterName = "";
        }
    };

    Sprite_Character.prototype.rebuildSpriteLayers = function(equippedData) {
        this.clearVisualLayers();
        this._visualLayers = equippedData.map(data => this.createLayerSprite(data));
        this.sortChildren();
    };
    
    Sprite_Character.prototype.createLayerSprite = function(data) {
        const sprite = new Sprite();
        sprite.anchor.set(0.5, 1);
        sprite.visualData = data; 
        sprite._currentIdentifier = null; // Will be set on first update

        if (data.identifier.toLowerCase().includes("pelo")) {
            if (typeof GradientMapFilter !== 'undefined') {
                sprite.gradientFilter = new GradientMapFilter();
                sprite.filters = [sprite.gradientFilter];
            }
        }
        
        this.addChild(sprite);
        return sprite;
    };

    Sprite_Character.prototype.updateAllLayerFrames = function() {
        const actor = $gameParty.leader();
        if (!actor || !this._visualLayers) return;
        
        const hideSet = VisualEquipmentManager.getHideSet(actor);
        const hairColor = VisualEquipmentManager.getActiveHairColor();
        const direction = this._character.direction();
        
        this._visualLayers.forEach(layer => {
            const data = layer.visualData;
            
            // Determine which set of data to use (A or B)
            const isFacingUp = direction === 8;
            const useBackImage = isFacingUp && data.identifierB;

            const activeIdentifier = useBackImage ? data.identifierB : data.identifier;
            const activeOffsetX = useBackImage ? data.offsetXB : data.offsetX;
            const activeOffsetY = useBackImage ? data.offsetYB : data.offsetY;
            const activeZ = useBackImage ? data.zB : data.z;

            // Update Z-index and flag for re-sorting if it changed
            if (layer.z !== activeZ) {
                layer.z = activeZ;
                this._needsVisualSort = true;
            }
            
            // Update bitmap if identifier changed
            if (layer._currentIdentifier !== activeIdentifier) {
                layer._currentIdentifier = activeIdentifier;
                let baseName = this._character.characterName().replace(/^[$!]/, '');
                if (VisualEquipmentManager.aliases[baseName]) {
                    baseName = VisualEquipmentManager.aliases[baseName];
                }
                const folder = VisualEquipmentManager.getImageFolder();
                const finalImageName = `${baseName}_${activeIdentifier}`;
                layer.bitmap = ImageManager.loadBitmap(folder, finalImageName);
            }

            // Hair color logic (no changes needed here)
            const isHair = data.identifier.toLowerCase().includes("pelo");
            if (isHair && layer.gradientFilter) {
                const color = hairColor || { shadow: [0, 0, 0], highlight: [255, 255, 255] };
                layer.gradientFilter.shadowColor = color.shadow;
                layer.gradientFilter.highlightColor = color.highlight;
            }

            // Update visibility
            const shouldHide = data.displayId && hideSet.has(data.displayId);
            layer.visible = !shouldHide && layer.bitmap && layer.bitmap.isReady();

            if (layer.visible) {
                this.updateLayerFrame(layer, activeOffsetX, activeOffsetY);
            }
        });
    };

    Sprite_Character.prototype.updateLayerFrame = function(sprite, offsetX, offsetY) {
        sprite.x = offsetX;
        sprite.y = offsetY;

        const pw = this.patternWidth();
        const ph = this.patternHeight();
        const sx = this.characterPatternX() * pw;
        const sy = this.characterPatternY() * ph;

        sprite.setFrame(sx, sy, pw, ph);
    };

    const _Sprite_Character_sortChildren = Sprite.prototype.sortChildren;
    Sprite_Character.prototype.sortChildren = function() {
        _Sprite_Character_sortChildren.call(this);
    };

    // --- Z-INDEX PATCH - NEW APPROACH ---
    const _Sprite_prototype_render = Sprite.prototype.render;
    Sprite.prototype.render = function(renderer) {
        if (this instanceof Sprite_Character && this._character instanceof Game_Player && this._visualLayers) {
            
            if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
                return;
            }

            const layersBelow = [];
            const layersAbove = [];

            // 1. Separate layers into two groups
            for (const child of this.children) {
                if (child.z < 0) {
                    layersBelow.push(child);
                } else {
                    layersAbove.push(child);
                }
            }
            
            // 2. Sort each group explicitly at render time to ensure correct order
            layersBelow.sort((a, b) => a.z - b.z);
            layersAbove.sort((a, b) => a.z - b.z);

            // 3. Render in the new, guaranteed correct order
            for (const child of layersBelow) {
                child.render(renderer);
            }

            this._render(renderer); // Render base character

            for (const child of layersAbove) {
                child.render(renderer);
            }
            
        } else {
            _Sprite_prototype_render.call(this, renderer);
        }
    };
})();