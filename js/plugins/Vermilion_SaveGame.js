/*:
 * @target MZ
 * @plugindesc [v7.2] Sistema de guardado avanzado con renderizado de capas, colores y ocultación.
 * @author Vermilion Games
 * @orderAfter Vermilion_Visual_Equipment
 * @help
 * Vermilion_SaveGame.js (v7.2 - Corrección de renderizado de capas)
 *
 * Requiere Vermilion_Core.js y Vermilion_Visual_Equipment.js
 *
 * [v7.2]
 * - Corregido un error por el que las capas no se dibujaban correctamente si
 * su archivo de imagen no tenía las dimensiones de una hoja de sprites
 * estándar. Ahora, el tamaño del frame se basa en el sprite del personaje
 * base, igual que en el juego, garantizando consistencia visual.
 *
 * [v7.1]
 * - Se ha modificado para usar la nueva función de Vermilion_Core para procesar
 * y ordenar las capas.
 *
 * @param ---Configuración---
 * @param Background Image @text Imagen de Fondo @type file @dir img/pictures/ @default
 * @param Max Savefiles @text Máximo de Archivos @type number @min 1 @default 20
 * @param ---Diseño de la Ventana---
 * @param Window X @type number @default 100
 * @param Window Y @type number @default 120
 * @param Window Width @type number @default 1080
 * @param Window Height @type number @default 540
 * @param Visible Slots Per Page @type number @min 1 @default 4
 */
(() => {
    if (typeof Vermilion === 'undefined' || !Vermilion.Core || typeof VisualEquipmentManager === 'undefined' || typeof Vermilion.Core.processAndSortLayersForRender === 'undefined') {
        throw new Error("Vermilion_SaveGame.js requiere una versión actualizada de Vermilion_Core.js (v4.1+) y Vermilion_Visual_Equipment.js.");
    }
    const pluginName = "Vermilion_SaveGame";
    const params = PluginManager.parameters(pluginName);
    const P_BACKGROUND_IMAGE = params["Background Image"] || '';
    const P_MAX_SAVEFILES = Number(params["Max Savefiles"] || 20);
    const P_WINDOW_X = Number(params["Window X"] || 100);
    const P_WINDOW_Y = Number(params["Window Y"] || 120);
    const P_WINDOW_WIDTH = Number(params["Window Width"] || 1080);
    const P_WINDOW_HEIGHT = Number(params["Window Height"] || 540);
    const P_VISIBLE_ROWS = Number(params["Visible Slots Per Page"] || 4);

    const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = _DataManager_makeSavefileInfo.call(this);
        const members = $gameParty.battleMembers();
        info.visualEquipment = members.map(actor => {
            return actor.equips().map(item => VisualEquipmentManager.parseItemNotetags(item)).filter(Boolean);
        });
        info.hairColorSwitchId = Vermilion.Core.getActiveHairColorSwitch();
        info.hideSets = members.map(actor => Array.from(VisualEquipmentManager.getHideSet(actor)));
        return info;
    };
    DataManager.maxSavefiles = function() { return P_MAX_SAVEFILES; };

    const _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() { _Scene_File_create.call(this); if (this._listWindow) { this._listWindow.paint(); } };
    Scene_File.prototype.createListWindow = function() { const rect = new Rectangle(P_WINDOW_X, P_WINDOW_Y, P_WINDOW_WIDTH, P_WINDOW_HEIGHT); this._listWindow = new Window_CustomSavefileList(rect); this._listWindow.setHandler("ok", this.onSavefileOk.bind(this)); this._listWindow.setHandler("cancel", this.popScene.bind(this)); this._listWindow.selectSavefile(this.firstSavefileId()); this.addWindow(this._listWindow); };
    Scene_File.prototype.createHelpWindow = function() { const rect = new Rectangle(0, 0, 0, 0); this._helpWindow = new Window_Help(rect); this._helpWindow.hide(); this.addWindow(this._helpWindow); };
    const _Scene_File_createBackground = Scene_File.prototype.createBackground;
    Scene_File.prototype.createBackground = function() { _Scene_File_createBackground.call(this); if (P_BACKGROUND_IMAGE) { this._customBackgroundSprite = new Sprite(); this._customBackgroundSprite.bitmap = ImageManager.loadPicture(P_BACKGROUND_IMAGE); this.addChild(this._customBackgroundSprite); } };

    class Window_CustomSavefileList extends Window_SavefileList {
        constructor(rect) {
            super(rect);
            this._characterContainers = {};
        }
        maxCols() { return 2; }
        numVisibleRows() { return P_VISIBLE_ROWS; }

        drawItem(index) {
            const savefileId = this.indexToSavefileId(index);
            const info = DataManager.savefileInfo(savefileId);
            const rect = this.itemRectWithPadding(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.clearCharacterContainer(index);
            
            const bitmapsToLoad = this.collectBitmapsForInfo(info);
            
            if (this.areBitmapsReady(bitmapsToLoad)) {
                this.drawItemContent(index, savefileId, info, rect);
            } else {
                this.drawItemLoading(rect);
                this.loadBitmapsAndRedraw(bitmapsToLoad, index);
            }
        }
        
        drawItemContent(index, savefileId, info, rect) {
             const latestId = DataManager.latestSavefileId();
            if (savefileId > 0 && savefileId === latestId) {
                this.drawRect(rect.x - 1, rect.y - 1, rect.width + 2, rect.height + 2, "#FFFFFF", 0.2);
            }
            if (info) {
                this.drawContents(info, rect, savefileId, index);
            } else {
                this.drawEmptyItem(rect);
            }
        }

        collectBitmapsForInfo(info) {
            if (!info || !info.characters) return [];
            const bitmaps = [];
            const characters = info.characters;
            const visualEquips = info.visualEquipment || [];
            for (let i = 0; i < characters.length; i++) {
                const baseCharacter = characters[i];
                const equipmentData = visualEquips[i] || [];
                bitmaps.push(ImageManager.loadCharacter(baseCharacter[0]));
                equipmentData.forEach(data => {
                    const filename = this.getLayerFilename(data, baseCharacter[0]);
                    const folder = this.getLayerFolder();
                    bitmaps.push(ImageManager.loadBitmap(folder, filename));
                });
            }
            return bitmaps;
        }

        areBitmapsReady(bitmaps) {
            return bitmaps.every(b => b.isReady());
        }

        drawItemLoading(rect) {
            this.changePaintOpacity(true);
            this.drawText("Cargando...", rect.x, rect.y + rect.height / 2 - this.lineHeight() / 2, rect.width, 'center');
        }

        loadBitmapsAndRedraw(bitmaps, index) {
            const notReadyBitmaps = bitmaps.filter(b => !b.isReady());
            if (notReadyBitmaps.length === 0) {
                this.redrawItem(index);
                return;
            }
            let loadedCount = 0;
            const totalToLoad = notReadyBitmaps.length;
            notReadyBitmaps.forEach(bitmap => {
                bitmap.addLoadListener(() => {
                    loadedCount++;
                    if (loadedCount === totalToLoad) {
                        this.redrawItem(index);
                    }
                });
            });
        }
        
        clearAllCharacterContainers() { for(const key in this._characterContainers) { if (this._characterContainers[key]) { this._contentsSprite.removeChild(this._characterContainers[key]); } } this._characterContainers = {}; }
        clearCharacterContainer(index) { if (this._characterContainers[index]) { this._contentsSprite.removeChild(this._characterContainers[index]); this._characterContainers[index] = null; } }
        getLayerFolder() { return VisualEquipmentManager.getImageFolder(); }
        getLayerFilename(data, baseCharacterName) { let baseName = baseCharacterName.replace(/^[$!]/, ''); if (VisualEquipmentManager.aliases[baseName]) { baseName = VisualEquipmentManager.aliases[baseName]; } return `${baseName}_${data.identifier}`; }
        drawRect(x, y, width, height, color, opacity = 1) { const originalOpacity = this.contents.paintOpacity; this.contents.paintOpacity = opacity * 255; this.contents.fillRect(x, y, width, height, color); this.contents.paintOpacity = originalOpacity; }

        drawContents(info, rect, savefileId, cacheIndex) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(`Archivo ${savefileId}`, rect.x, rect.y, rect.width, 'center');
            this.drawLayeredCharacters(info, rect, cacheIndex);
            this.resetFontSettings();
            this.drawText(info.playtime, rect.x, rect.y + rect.height - this.lineHeight(), rect.width, 'center');
        }

        drawEmptyItem(rect) { this.changePaintOpacity(false); this.drawText("Vacío...", rect.x, rect.y + rect.height / 2 - this.lineHeight() / 2, rect.width, 'center'); this.changePaintOpacity(true); }
        
        drawLayeredCharacters(info, rect, cacheIndex) {
            if (!info.characters || !info.visualEquipment) return;
            const mainContainer = new Sprite();
            mainContainer.x = rect.x; mainContainer.y = rect.y;
            this._contentsSprite.addChild(mainContainer);
            this._characterContainers[cacheIndex] = mainContainer;
            const characters = info.characters;
            const visualEquips = info.visualEquipment;
            const partySize = characters.length;
            const totalCharacterWidth = partySize * 48;
            let startX = (rect.width - totalCharacterWidth) / 2 + 24;
            const startY = rect.height / 2 + 12;

            for (let i = 0; i < partySize; i++) {
                const baseCharacter = characters[i];
                const equipmentData = visualEquips[i];
                if (!baseCharacter || !equipmentData) continue;

                // --- INICIO DE LA CORRECCIÓN ---
                // 1. Cargar el bitmap del personaje base para obtener las dimensiones correctas del frame.
                const baseBitmap = ImageManager.loadCharacter(baseCharacter[0]);
                if (!baseBitmap.isReady()) {
                    // Si el bitmap base no está listo (no debería pasar por la pre-carga), se reintenta.
                    baseBitmap.addLoadListener(() => this.redrawItem(cacheIndex));
                    continue; 
                }
                const big = ImageManager.isBigCharacter(baseCharacter[0]);
                const pw = baseBitmap.width / (big ? 3 : 12);
                const ph = baseBitmap.height / (big ? 4 : 8);
                // --- FIN DE LA CORRECCIÓN ---

                const hideSetData = info.hideSets ? info.hideSets[i] : [];
                const { layersBehind, layersAbove } = Vermilion.Core.processAndSortLayersForRender(equipmentData, hideSetData);

                [...layersBehind, "BASE", ...layersAbove].forEach(item => {
                    const isBase = item === "BASE";
                    const data = isBase ? null : item;
                    const sprite = new Sprite();
                    sprite.anchor.set(0.5, 1);
                    sprite.x = startX; sprite.y = startY;
                    const filename = isBase ? baseCharacter[0] : this.getLayerFilename(data, baseCharacter[0]);
                    const bitmap = isBase ? ImageManager.loadCharacter(filename) : ImageManager.loadBitmap(this.getLayerFolder(), filename);
                    sprite.bitmap = bitmap;
                    if (sprite.bitmap.isReady()) {
                        // 2. Pasar las dimensiones correctas (pw, ph) a la función que dibuja el frame.
                        this.setupSpriteFrame(sprite, isBase, baseCharacter, isBase ? baseCharacter[1] : 0, data, info, pw, ph);
                    }
                    mainContainer.addChild(sprite);
                });
                startX += 48;
            }
        }

        // 3. Modificar la función para que acepte y use las dimensiones del frame (pw, ph).
        setupSpriteFrame(sprite, isBase, baseCharacter, index, data, info, pw, ph) {
            let sx, sy;
            if (isBase) {
                // El personaje base usa sus propias dimensiones (que ya son las correctas).
                const big = ImageManager.isBigCharacter(baseCharacter[0]);
                const own_pw = sprite.bitmap.width / (big ? 3 : 12);
                const own_ph = sprite.bitmap.height / (big ? 4 : 8);
                sx = ((index % 4) * 3 + 1) * own_pw;
                sy = (Math.floor(index / 4) * 4) * own_ph;
                sprite.setFrame(sx, sy, own_pw, own_ph);
            } else {
                // Las capas usan las dimensiones (pw, ph) del personaje base que le pasamos.
                sx = pw; // Frame del medio (personaje mirando hacia abajo)
                sy = 0;  // Fila superior
                sprite.setFrame(sx, sy, pw, ph);
            }

            if (!isBase && data.identifier.toLowerCase().includes("pelo")) {
                const hairColor = info.hairColorSwitchId ? Vermilion.Core.hairColorMap[info.hairColorSwitchId] : null;
                if (hairColor && typeof GradientMapFilter !== 'undefined') {
                    sprite.filters = [new GradientMapFilter(hairColor.shadow, hairColor.highlight)];
                }
            }
        }
    }
})();