/*:
 * @target MZ
 * @plugindesc Automatically display equipped equipments on player
 * @author Sang Hendrix
 * @url https://sanghendrix.itch.io/
 * 
 * @help
 * Version 1.0.0
 * ----------------------------------------------------------------------------
 * This RPG Maker MZ plugin allows you to display equipment on player easily,
 * either automatically or manually, your choice.
 * ----------------------------------------------------------------------------
 * FEATURES
 * - Incredibly user-friendly, offering two options: Automatic or Manual
 * - Method Automatic: Equip items to the player with a single notetag: <fashion image: filename>  
 * - Method Manual: Equip items to the player via plugin parameters  
 * - Automatic mode detects the correct filename based on the player’s current graphic  
 * - Customize offsets for any equipment piece  
 * - Compatible with all platforms: Desktop, Web, and Mobile  
 * - An awesome developer to support you nearly 24/7
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ■ AUTOMATIC METHOD
 * 1. Add notetag to your equipment in database:
 * <fashion image: filename without extension>
 * <fashion offset: x, y>. No offset if not assigned this notetag
 * 
 * Example 
 * <fashion image: Hat> 
 * -> Automatically find filename: Player filename + Hat.png
 * -> If player filename is $Hero.png then it'll find: $Hero_Hat.png or Hero_Hat.png
 * 2. Put your Hero_Hat.png file to Fashion Image Folder (assign via parameter)
 * 
 * ■ MANUAL METHOD
 * - Equipment Name: Name of equipment in database. When you equip an equipment
 * with this name, it'll display your setting
 * - Conditional Images: If player graphic is file A then it'll display file B
 * onto the player
 * - Prefix: An advanced feature, not recommened unless you're very pro.
 * Usage: If prefix is 'red', conditional image if written as Name_prefix_Name
 * will be understood as Name_red_Name
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * Accquiring this plugin legally grants you the permission to use this plugin
 * in both free and commercial game projects without giving credit.
 * ----------------------------------------------------------------------------
 * SUPPORTS
 * Discord: https://discord.gg/YKPscqHV8b
 * Patreon: https://www.patreon.com/SangHendrix
 * 
 * @param a
 * @text -------------------
 * @default ------------------
 * @param aa
 * @text ■ AUTOMATIC METHOD
 * @param b
 * @text -------------------
 * @default ------------------
 * 
 * @param imageFolder
 * @text Fashion Image Folder
 * @type string
 * @default img/pictures/Equipment/
 * @desc Folder path for notetag fashion images
 * 
 * @param ax
 * @text -------------------
 * @default ------------------
 * @param aax
 * @text ■ MANUAL METHOD
 * @param bx
 * @text -------------------
 * @default ------------------
 *
 * @param armorList
 * @text Fashion Set
 * @type struct<ArmorSet>[]
 * @desc List of equipment sets that can be applied to the player
 */

/*~struct~ArmorSet:
 * @param name
 * @text Equipment Name
 * @type text
 * @desc Equipment with this name in database will display this fashion set
 *
 * @param conditionalStateImages
 * @text Conditional Images
 * @type struct<ConditionalStateImage>[]
 * @desc Select the image to display when the player's sprite matches the filename.
 * 
 * @param cxcxcxcxx
 * @text ---------------------
 * 
 * @param offsetX
 * @text Offset X
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc Horizontal offset for this fashion set
 *
 * @param offsetY
 * @text Offset Y
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc Vertical offset for this fashion set
 * 
 * @param cxcxcxcx
 * @text ---------------------
 * 
 * @param prefix
 * @text Prefix
 * @type string
 * @desc E.g., prefix: 'red'. Conditional Image Name_prefix_Name -> Name_red_Name. Only recommened for experienced users
 */

/*~struct~ConditionalStateImage:
 * @param filename
 * @text Player Sprite Filename
 * @type file
 * @dir img/characters/
 * @desc Select the character sprite file to match
 *
 * @param conditionalImage
 * @text Conditional Image
 * @type file
 * @dir img/pictures/
 * @desc Select the image to display when the player's sprite matches the filename. Use prefix here if want
 */

var Imported = Imported || {};
Imported.Hendrix_Display_Equipment = true;
const HAIR_COLOR_MAP = {
  // === Humanos y Govlards: Tonos basados en tus ejemplos ===
  6:  { shadow: [48, 43, 88],  highlight: [149, 94, 64] },  // Castaño (Extraído de tu imagen $RJX3KW4.png)
  7:  { shadow: [100, 56, 45],  highlight: [247, 233, 167] },  // Rubio (Extraído de tu imagen $R7F1875.png)
  8:  { shadow: [191, 0, 0],   highlight: [113, 15, 88] },  // Pelirrojo (Extraído de tu imagen $RNVVUWZ.png)
  9:  { shadow: [0, 0, 0],      highlight: [90, 90, 90] },      // Negro (Tono oscuro que conserva detalle)
  251:{ shadow: [95, 90, 85],   highlight: [225, 220, 205] },  // Rubio Ceniza (Frío y desaturado)
  252:{ shadow: [70, 55, 45],   highlight: [200, 160, 120] },  // Castaño Claro (Tono de madera natural)
  253:{ shadow: [65, 30, 35],   highlight: [180, 80, 80] },    // Caoba (Rojo oscuro y profundo)
  254:{ shadow: [160, 160, 175],highlight: [255, 250, 245] },  // Rubio Platino (Casi blanco con sombra fría)

  // === Siverett: Tonos Etéreos y Metálicos ===
  150:{ shadow: [200, 210, 220],highlight: [255, 255, 255] },  // Blanco Níveo (Blanco puro con sombra celeste)
  151:{ shadow: [90, 100, 115], highlight: [220, 225, 230] },  // Plateado Pulido (Gris metálico con alto contraste)
  255:{ shadow: [129, 39, 79],  highlight: [136, 192, 255] },  // Hielo Glacial (Extraído de tu imagen $R8464C3.png)
  256:{ shadow: [95, 80, 110],  highlight: [245, 220, 230] },  // Perla Lunar (Tono rosado iridiscente)

  // === Elvemir: Tonos Místicos y de Joya ===
  71: { shadow: [40, 24, 88],   highlight: [227, 148, 243] },  // Amatista (Extraído de tu imagen $RDZ96FH.png)
  70: { shadow: [129, 39, 79],  highlight: [136, 192, 255] },  // Zafiro (Replicando el estilo de $R8464C3.png)
  69: { shadow: [30, 40, 90],   highlight: [100, 240, 160] },  // Esmeralda (Verde vibrante con sombra índigo)
  68: { shadow: [14, 60, 89],   highlight: [255, 238, 137] },  // Dorado (Extraído de tu imagen $RCS8OFB.png)
  257:{ shadow: [45, 70, 50],   highlight: [130, 170, 100] },  // Verde Musgo (Tonos de bosque encantado)
  258:{ shadow: [10, 10, 40],   highlight: [90, 90, 200] },    // Cielo Nocturno (Azul profundo con reflejos)
  259:{ shadow: [100, 85, 115], highlight: [215, 190, 230] },  // Flor de Lavanda (Púrpura pálido y suave)
  260:{ shadow: [150, 80, 95],  highlight: [255, 190, 200] }   // Cuarzo Rosa (Rosa suave con sombra magenta)
};

function getActiveHairColor() {
  for (const switchId in HAIR_COLOR_MAP) {
    if ($gameSwitches.value(Number(switchId))) {
      // En cuanto encuentra un interruptor activo, devuelve su color y termina.
      return HAIR_COLOR_MAP[switchId];
    }
  }
  // Si termina el bucle y no encontró ninguno, no devuelve ningún color.
  return null;
}

(function () {
    // ========================================================================
    // DICCIONARIO DE ALIAS DE PERSONAJES
    // Aquí puedes definir qué gráficos de personaje deben usar los mismos
    // archivos de equipamiento.
    // "Personaje_Nuevo": "Personaje_Original_Con_Graficos"
    // ========================================================================
    const CHARACTER_GRAPHIC_ALIASES = {
        "BasePJ2": "BasePJ",
        // "BasePJ3": "BasePJ", // <-- Ejemplo: si tuvieras un tercero.
        // "HeroeElfo": "HeroeHumano" // <-- Otro ejemplo
    };
    const pluginName = "Hendrix_Display_Equipment";
    const parameters = PluginManager.parameters(pluginName);
    const armorList = JSON.parse(parameters['armorList'] || '[]').map(set => JSON.parse(set));

    const ConditionalImageCache = new Map();

    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function (character) {
        _Sprite_Character_initialize.call(this, character);
        if (character === $gamePlayer) {
            this.createArmorSprites();
            this._fashionSprites = [];
            this._lastEquippedFashion = [];
            this._lastNotetagCharacterName = '';
        }
    };

    Sprite_Character.prototype.createArmorSprites = function () {
        this._armorSprites = armorList.map(set => {
            if (set.prefix === undefined) {
                set.prefix = '';
            }
            let parsedConditionalImages = getParsedConditionalImages(set.conditionalStateImages, set.prefix);
            return createArmorSet(set, parsedConditionalImages, this);
        });
    };

    function getParsedConditionalImages(conditionalStateImages, prefix) {
        const cacheKey = JSON.stringify({ images: conditionalStateImages, prefix: prefix });
        if (ConditionalImageCache.has(cacheKey)) {
            return ConditionalImageCache.get(cacheKey);
        }
        const parsed = parseConditionalImages(conditionalStateImages, prefix);
        ConditionalImageCache.set(cacheKey, parsed);
        return parsed;
    }

    function parseConditionalImages(conditionalStateImages, prefix) {
        try {
            return JSON.parse(conditionalStateImages || '[]').map(item => {
                const parsedItem = typeof item === 'string' ? JSON.parse(item) : item;
                parsedItem.conditionalImage = parsedItem.conditionalImage.replace(/{prefix}/g, prefix);
                return parsedItem;
            });
        } catch (e) {
            return [];
        }
    }

    function createArmorSet(set, parsedConditionalImages, context) {
        return {
            name: set.name,
            prefix: set.prefix || '',
            conditionalStateImages: parsedConditionalImages.map(csi => ({
                filename: csi.filename,
                sprite: context.createArmorSprite(csi.conditionalImage),
                changeRequested: false
            })),
            offsetX: Number(set.offsetX || 0),
            offsetY: Number(set.offsetY || 0),
            lastCharacterName: '',
            isActive: false
        };
    }

    Sprite_Character.prototype.createArmorSprite = function (imageName) {
    const sprite = new Sprite();
    sprite.bitmap = ImageManager.loadPicture(imageName);
    sprite.anchor.set(0.5, 1);
    sprite.visible = false;
    sprite.z = 3; // Asegura que quede encima del personaje, pero por debajo de overhead tiles
    sprite._isArmorSprite = true; // Opcional para debug o lógica futura
    this.addChild(sprite);
    return sprite;
};

    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        _Sprite_Character_update.call(this);
        if (this._character === $gamePlayer) {
            this.updateArmorSprites();
            this.updateNotetagFashionSprites();
        }
    };

    Sprite_Character.prototype.updateArmorSprites = function () {
        if (!this._armorSprites || this._armorSprites.length === 0) return;

        const currentCharacterName = this._character.characterName();
        const direction = this._character.direction();

        this._armorSprites.forEach(set => {
            set.isActive = this.isArmorSetActive(set);

            if (set.isActive) {
                const conditionalSprite = this.findMatchingConditionalSprite(set, currentCharacterName);
                if (conditionalSprite) {
                    this.showConditionalSprite(set, conditionalSprite, direction);
                } else {
                    this.hideAllArmorSprites(set);
                }
            } else {
                this.hideAllArmorSprites(set);
            }
        });
    };

    Sprite_Character.prototype.showConditionalSprite = function (set, conditionalSprite, direction) {
        this.hideAllArmorSprites(set);
        conditionalSprite.sprite.visible = true;
        this.updateActiveSpriteFrame(conditionalSprite.sprite, set.offsetX, set.offsetY, direction);
    };

    Sprite_Character.prototype.findMatchingConditionalSprite = function (set, currentCharacterName) {
        if (set.lastCharacterName !== currentCharacterName) {
            set.lastCharacterName = currentCharacterName;

            const matchingCsi = set.conditionalStateImages.find(csi => currentCharacterName.endsWith(csi.filename));

            if (matchingCsi) {
                set.conditionalStateImages.forEach(csi => {
                    csi.changeRequested = csi === matchingCsi;
                });
                return matchingCsi;
            } else {
                set.conditionalStateImages.forEach(csi => {
                    csi.changeRequested = false;
                });
            }
        }

        return set.conditionalStateImages.find(csi => csi.changeRequested) || false;
    };

    Sprite_Character.prototype.updateActiveSpriteFrame = function (activeSprite, offsetX, offsetY, direction) {
        activeSprite.x = offsetX;
        activeSprite.y = offsetY;
        activeSprite.scale.x = 1; //this.scale.x;
        activeSprite.scale.y = 1; //this.scale.y;

        const pattern = this.characterPatternX();
        const directionIndex = (direction / 2) - 1;

        activeSprite.setFrame(
            pattern * this.patternWidth(),
            directionIndex * this.patternHeight(),
            this.patternWidth(),
            this.patternHeight()
        );
    };

    Sprite_Character.prototype.hideAllArmorSprites = function (set) {
        set.conditionalStateImages.forEach(csi => {
            csi.sprite.visible = false;
        });
    };

    Sprite_Character.prototype.isArmorSetActive = function (set) {
        const actor = $gameParty.leader();
        const equipmentName = set.name;

        // Check equipped weapons and armors
        const equips = actor.equips();
        for (let i = 0; i < equips.length; i++) {
            if (equips[i] && equips[i].name === equipmentName) {
                return true;
            }
        }

        return false;
    };

    //=============================================================================
    // NOTETAG FASHION SYSTEM
    //=============================================================================

    const imageFolder = parameters['imageFolder'] || 'img/pictures/Equipment/';
    const NotetagImageCache = {};

    Sprite_Character.prototype.updateNotetagFashionSprites = function () {
        const actor = $gameParty.leader();
        if (!actor) return;
        const currentCharacterName = this._character.characterName();
        const currentEquipment = actor.equips().filter(Boolean);
        const fashionItems = [];

        currentEquipment.forEach(item => {
    if (item.meta && item.meta['fashion image']) {
        let offsetX = 0;
        let offsetY = 0;
        let z = 0; // Valor por defecto

        if (item.meta['fashion offset']) {
            const offsetMatch = item.meta['fashion offset'].match(/(-?\d+)\s*,\s*(-?\d+)/);
            if (offsetMatch) {
                offsetX = Number(offsetMatch[1]);
                offsetY = Number(offsetMatch[2]);
            }
        }
        if (item.meta['fashion z']) {
            z = Number(item.meta['fashion z']);
        }

        let displayId = null;
            if (item.note) {
                const idMatch = item.note.match(/<DisplayId:\s*([\w\s]+)>/i);
                if (idMatch) {
                    displayId = idMatch[1].trim();
                }
            }

            fashionItems.push({
            identifier: item.meta['fashion image'].trim(),
            displayId: displayId,
            offsetX: offsetX,
            offsetY: offsetY,
            z: z
        });
    }
});

// Ordena por z antes de crear los sprites (menor z = más abajo)
fashionItems.sort((a, b) => a.z - b.z);

        const fashionChanged = this.hasNotetagFashionChanged(fashionItems);
        const characterChanged = (this._lastNotetagCharacterName !== currentCharacterName);

        if (fashionChanged || characterChanged) {
            this._lastNotetagCharacterName = currentCharacterName;
            this._lastEquippedFashion = fashionItems;

            this.clearNotetagFashionSprites();

            this._fashionSprites = []; // <-- Añade esto antes del forEach
fashionItems.forEach(item => {
    const sprite = this.createNotetagFashionSprite(item.identifier, item.offsetX, item.offsetY, item.displayId);
    if (sprite) this._fashionSprites.push(sprite); // <-- Añade cada sprite al array
});
        }

        this.updateAllNotetagFashionSprites();
    };

    Sprite_Character.prototype.hasNotetagFashionChanged = function (fashionItems) {
        if (fashionItems.length !== this._lastEquippedFashion.length) return true;

        for (let i = 0; i < fashionItems.length; i++) {
            const curr = fashionItems[i];
            const prev = this._lastEquippedFashion[i];

            if (curr.identifier !== prev.identifier ||
                curr.offsetX !== prev.offsetX ||
                curr.offsetY !== prev.offsetY ||
                curr.z !== prev.z) {
                return true;
            }
        }

        return false;
    };

    Sprite_Character.prototype.clearNotetagFashionSprites = function () {
        this._fashionSprites.forEach(sprite => {
            this.removeChild(sprite);
            sprite.destroy();
        });
this._fashionSprites = [];
    };

    Sprite_Character.prototype.createNotetagFashionSprite = function (identifier, offsetX, offsetY, displayId = null) {
        const characterName = this._character.characterName();
const charNameParts = characterName.split('/');
let baseName = charNameParts[charNameParts.length - 1].replace(/^[$]/, '');

// ¡NUEVA LÓGICA! Comprobamos si el personaje actual tiene un alias definido.
if (CHARACTER_GRAPHIC_ALIASES[baseName]) {
    // Si lo tiene (ej: "BasePJ2"), usamos el valor del alias (ej: "BasePJ").
    baseName = CHARACTER_GRAPHIC_ALIASES[baseName];
}

const playerSpecificName = `${baseName}_${identifier}`;
        const imageOptions = [playerSpecificName, `$${playerSpecificName}`, identifier];
        let finalImageName = null;

        for (const imgName of imageOptions) {
            try {
                // Esta es una forma segura de comprobar si el archivo existe sin crashear
                const bitmap = ImageManager.loadBitmap(imageFolder, imgName);
                if (bitmap) {
                    finalImageName = imgName;
                    break;
                }
            } catch (e) { /* El archivo no existe, continúa */ }
        }

        if (!finalImageName) return null;

        const sprite = new Sprite(ImageManager.loadBitmap(imageFolder, finalImageName));
        sprite.anchor.set(0.5, 1);
        sprite.identifier = identifier;
        sprite.offsetX = offsetX;
        sprite.offsetY = offsetY;
        sprite._displayId = displayId;
        sprite.visible = false;
        
        // APLICAMOS NUESTRO FILTRO PERSONALIZADO
        if (identifier.toLowerCase().includes("pelo")) {
            sprite.gradientFilter = new GradientMapFilter();
            sprite.filters = [sprite.gradientFilter];
        }

        this.addChild(sprite);
        return sprite;
    };

   Sprite_Character.prototype.updateAllNotetagFashionSprites = function () {
    const direction = this._character.direction();
    const actor = $gameParty.leader();
    if (!actor) return;

    const equippedItems = actor.equips().filter(Boolean);
    const hideIds = new Set();
    equippedItems.forEach(item => {
        if (!item || !item.note) return;
        const matches = item.note.match(/<Hide:\s*([\w\s]+)>/gi);
        if (matches) {
            matches.forEach(match => {
                const tag = match.match(/<Hide:\s*([\w\s]+)>/i)[1].trim();
                hideIds.add(tag);
            });
        }
    });

    const activeColor = getActiveHairColor();

    this._fashionSprites.forEach(sprite => {
        const isHair = sprite.identifier && sprite.identifier.toLowerCase().includes("pelo");

        // Aplicamos nuestra lógica de coloreado con el filtro
        if (isHair && sprite.gradientFilter) {
            if (activeColor) {
                // Si hay un color activo, actualizamos los colores del filtro
                sprite.gradientFilter.shadowColor = activeColor.shadow;
                // LÍNEA CORREGIDA: 'active' ha sido cambiado a 'activeColor'
                sprite.gradientFilter.highlightColor = activeColor.highlight;
            } else {
                // Si no hay color, lo dejamos en escala de grises
                sprite.gradientFilter.shadowColor = [0, 0, 0];
                sprite.gradientFilter.highlightColor = [255, 255, 255];
            }
        }

        const shouldHide = sprite._displayId && hideIds.has(sprite._displayId);
        if (!shouldHide && sprite.bitmap.isReady()) {
            this.updateActiveSpriteFrame(sprite, sprite.offsetX, sprite.offsetY, direction);
            sprite.visible = true;
        } else {
            sprite.visible = false;
        }
    });
};
})();