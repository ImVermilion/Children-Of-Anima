/*:
 * @target MZ
 * @plugindesc Menú de creación de personaje visual (v7.1 - Corrección de Bloqueo). © Vermilion Games
 * @author Vermilion Games & Gemini
 *
 * @command Start
 * @text Iniciar creación de personaje
 * @desc Abre el menú de creación de personaje.
 *
 * @param StartCommonEvent
 * @text Evento Común de Actualización
 * @type common_event
 * @desc Evento común que se ejecuta al iniciar y tras cambiar opciones.
 * @default 100
 */

(() => {
  const pluginName = "Vermilion_CharacterCreation";
  const parameters = PluginManager.parameters(pluginName);
  const startCommonEventId = Number(parameters["StartCommonEvent"] || 100);

  // --- CONFIGURACIÓN VISUAL ---
  const CHARACTER_X_OFFSET = 0;
  const CHARACTER_Y_OFFSET = -30;
  const UP_ARROW_ICON = 245;
  const DOWN_ARROW_ICON = 244;

  // --- CONFIGURACIÓN DE FUNCIONALIDAD ---
  const previewCategories = ["Pelo", "Color de Pelo"];
  const confirmationCategories = ["Raza", "Clase", "Historia"];

  // --- DATOS DE CREACIÓN ---
 const raceOptions = [
    { name: "Humano", switchId: 66, desc: "Humano: Una raza versátil y adaptable.", longDesc: "Los Humanos son conocidos por su tenacidad y su\n capacidad para prosperar en casi cualquier entorno.\n Aunque carecen de las afinidades elementales de otras razas,\n su ingenio y espíritu de cooperación los convierten en\nexcelentes aventureros, comerciantes y líderes.\n\n\\c[1]Adaptabilidad Total:\\c[0]\nGanan puntos de habilidad un 10% más rápido." },
    { name: "Elvemir", switchId: 67, desc: "Elvemir: Seres místicos de gran afinidad arcana.", longDesc: "Los Elvemir viven en simbiosis con las corrientes mágicas del mundo.\nSus largas vidas les otorgan una perspectiva única y un profundo\nconocimiento de las artes arcanas. Son cautelosos con los extraños,\npero aliados invaluables.\n\n\\c[1]Afinidad Arcana:\\c[0]\n+15 a la Magia Máxima." },
    { name: "Siverett", switchId: 119, desc: "Siverett: Descendientes del hielo y la luna.", longDesc: "Nacidos de la escarcha y la luz de luna, los Siverett son una raza\nsilenciosa y ágil. Se sienten cómodos en los climas más fríos y son\ncazadores natos, capaces de moverse sin ser vistos ni oídos.\n\n\\c[1]Paso Gélido:\\c[0]\nAumenta la Agilidad y la Evasión en entornos fríos." },
    { name: "Govlard", switchId: 120, desc: "Govlard: Seres verdosos de origen incierto", longDesc: "Los Govlard son un enigma. Con una piel verdosa y una complexión\nrobusta, su origen es un misterio que ni ellos mismos conocen.\nSon pragmáticos, resistentes y desconfían de la magia compleja.\n\n\\c[1]Piel de Corteza:\\c[0]\n+10 a la Defensa física." },
    { name: "Mediano", switchId: 132, desc: "Mediano: Pequeños y astutos, maestros del sigilo.", longDesc: "Los Medianos son conocidos por su agilidad y su capacidad para\nmoverse sin ser detectados. Aunque no son tan fuertes como otras razas,\ncompensan con su astucia y habilidades de evasión.\n\n\\c[1]Sigilo Natural:\\c[0]\n+20 a la Evasión." },
  ];
  const generoOptions = [ { name: "Hombre", switchId: 1 }, { name: "Mujer", switchId: 2 } ];
  const peloOptions = [
    { name: "Pelo 1", switchId: 154 }, { name: "Pelo 2", switchId: 155 },
    { name: "Pelo 3", switchId: 156 }, { name: "Pelo 4", switchId: 157 },
    { name: "Pelo 5", switchId: 158 }, { name: "Pelo 6", switchId: 159 },
    { name: "Pelo 7", switchId: 160 }, { name: "Pelo 8", switchId: 166 },
    { name: "Pelo 9", switchId: 167 }, { name: "Pelo 10", switchId: 168 },
  ];
  const claseOptions = [
    { name: "Guerrero", switchId: 106, desc: "Guerrero: Combatiente cuerpo a cuerpo resistente.", longDesc: "El camino del Guerrero es el del acero y la fuerza. Especializados en el\nuso de armas pesadas y armaduras, son la primera línea de defensa de\ncualquier grupo. Su honor es tan inquebrantable como su guardia.\n\n\\c[1]Habilidad Inicial:\\c[0]\nTajo Poderoso." },
    { name: "Pícaro", switchId: 109, desc: "Pícaro: Astuto, veloz y experto en trampas.", longDesc: "El Pícaro prospera en las sombras. Evita el combate directo,\nprefiriendo la astucia, los ataques por sorpresa y el uso de venenos.\nSon maestros del sigilo y el subterfugio.\n\n\\c[1]Habilidad Inicial:\\c[0]\nAtaque Furtivo." },
    { name: "Arcanista", switchId: 108, desc: "Arcanista: Dominador de los misterios mágicos.", longDesc: "El Arcanista dedica su vida al estudio de las energías que moldean la\nrealidad. Canaliza el poder elemental y cósmico para desatar hechizos\ndevastadores o proteger a sus aliados con barreras místicas.\n\n\\c[1]Habilidad Inicial:\\c[0]\nBola de Fuego." },
  ];
  const historiaOptions = [
    { name: "Inicio Aventurero", switchId: 201, desc: "Has vivido entre mercenarios y vagabundos.", longDesc: "Tu vida ha sido un viaje constante, aprendiendo a sobrevivir en los\ncaminos y a negociar en tabernas ruidosas. Comienzas con algo de\ndinero extra y un mayor conocimiento de los bajos fondos." },
    { name: "Expedición Argéntea", switchId: 202, desc: "Te uniste a una misión de exploración arcana.", longDesc: "Fuiste parte de una expedición para cartografiar ruinas antiguas\nllenas de misterios. Empiezas con un objeto mágico menor y una\nmayor resistencia a los efectos arcanos." },
  ];
    const colorPeloPorRaza = {
    Humano: [
      { name: "Castaño Chocolate", switchId: 6 }, { name: "Rubio Miel", switchId: 7 },
      { name: "Pelirrojo Cobre", switchId: 8 }, { name: "Negro", switchId: 9 },
      { name: "Rubio Ceniza", switchId: 251 }, { name: "Castaño Claro", switchId: 252 },
      { name: "Caoba", switchId: 253 }, { name: "Rubio Platino", switchId: 254 }
    ],
    Elvemir: [
      { name: "Amatista", switchId: 71 }, { name: "Zafiro", switchId: 70 },
      { name: "Esmeralda", switchId: 69 }, { name: "Dorado", switchId: 68 },
      { name: "Verde Musgo", switchId: 257 }, { name: "Cielo Nocturno", switchId: 258 },
      { name: "Flor de Lavanda", switchId: 259 }, { name: "Cuarzo Rosa", switchId: 260 }
    ],
    Siverett: [
      { name: "Blanco Níveo", switchId: 150 }, { name: "Plateado Pulido", switchId: 151 },
      { name: "Hielo Glacial", switchId: 255 }, { name: "Perla Lunar", switchId: 256 }
    ],
    Govlard: [
      { name: "Castaño Chocolate", switchId: 6 }, { name: "Rubio Miel", switchId: 7 },
      { name: "Pelirrojo Cobre", switchId: 8 }, { name: "Negro", switchId: 9 },
      { name: "Rubio Ceniza", switchId: 251 }, { name: "Castaño Claro", switchId: 252 },
      { name: "Caoba", switchId: 253 }, { name: "Rubio Platino", switchId: 254 }
    ],
    Mediano: [
      { name: "Castaño Chocolate", switchId: 6 }, { name: "Rubio Miel", switchId: 7 },
      { name: "Pelirrojo Cobre", switchId: 8 }, { name: "Negro", switchId: 9 },
      { name: "Rubio Ceniza", switchId: 251 }, { name: "Castaño Claro", switchId: 252 },
      { name: "Caoba", switchId: 253 }, { name: "Rubio Platino", switchId: 254 }
    ],
  };
  const creationSections = [
    { name: "Raza", icon: 2569 }, { name: "Género", icon: 2570 },
    { name: "Pelo", icon: 2571 }, { name: "Color de Pelo", icon: 2572 },
    { name: "Clase", icon: 2573 }, { name: "Historia", icon: 2574 },
    { name: "Fin", icon: 2575 }
  ];

  class Scene_CharacterCreation extends Scene_MenuBase {
    async create() {
      super.create();
      this._pendingSelection = null;
      this.createBackground();
      await this.callRefreshCommonEvent();
      this.createAllWindows();
      this.updateDescriptionText();
      this.refreshCharacterSprite();
      this._sectionWindow.activate();
    }
    
    createAllWindows() {
      this._sectionMenuWidth = 320;
      this.createSectionMenu();
      this.createCharacterPreviewWindow();
      this.createOptionWindow();
      this.createDescriptionWindow();
      this.createCharacterSprite();
      this.createConfirmationWindow();
    }
    
    createBackground() {
      this._backgroundSprite = new Sprite(ImageManager.loadPicture("Wood"));
      this.addChildAt(this._backgroundSprite, 0);
    }

    createSectionMenu() {
      const rect = new Rectangle(0, 0, this._sectionMenuWidth, Graphics.boxHeight);
      this._sectionWindow = new Window_Command(rect);
      
      this._sectionWindow.makeCommandList = function () {
        this.clearCommandList();
        creationSections.forEach(section => {
          this.addCommand(section.name, section.name.toLowerCase().replaceAll(" ", "_"), true, section.icon);
        });
      };

      this._sectionWindow.drawItem = function(index) {
          const rect = this.itemLineRect(index);
          const align = "left";
          this.resetTextColor();

          const commandName = this.commandName(index);
          const isComplete = SceneManager._scene.isSectionComplete(commandName);

          if (commandName !== "Fin" && isComplete) {
              this.changeTextColor(ColorManager.powerUpColor());
          }

          this.changePaintOpacity(this.isCommandEnabled(index));
          
          const icon = this._list[index] ? this._list[index].ext : 0;
          this.drawIcon(icon, rect.x, rect.y);
          this.drawText(this.commandName(index), rect.x + 36, rect.y, rect.width - 36, align);
      };
      
      this._sectionWindow.setHandler("raza", this.openRaceOptions.bind(this));
      this._sectionWindow.setHandler("género", this.openGeneroOptions.bind(this));
      this._sectionWindow.setHandler("pelo", this.openPeloOptions.bind(this));
      this._sectionWindow.setHandler("color_de_pelo", this.openColorPeloOptions.bind(this));
      this._sectionWindow.setHandler("clase", this.openClaseOptions.bind(this));
      this._sectionWindow.setHandler("historia", this.openHistoriaOptions.bind(this));
      this._sectionWindow.setHandler("fin", this.onFinishCreation.bind(this));
      this._sectionWindow.setHandler("cancel", () => {
          SoundManager.playBuzzer();
          this._sectionWindow.activate();
      });

      this._sectionWindow.refresh();
      this.addWindow(this._sectionWindow);
    }
    
    createCharacterPreviewWindow() {
        const x = this._sectionMenuWidth;
        const y = 0;
        const width = Graphics.boxWidth - x;
        const height = Math.floor(Graphics.boxHeight * 0.55);
        const rect = new Rectangle(x, y, width, height);
        this._characterPreviewWindow = new Window_Base(rect);
        this._characterPreviewWindow.setBackgroundType(0);
        this.addWindow(this._characterPreviewWindow);
    }
    
    createOptionWindow() {
      const x = this._sectionMenuWidth;
      const y = this._characterPreviewWindow.height;
      const width = Graphics.boxWidth - x;
      const height = 180;
      const rect = new Rectangle(x, y, width, height);
      this._optionWindow = new Window_SubSelection(rect);
      
      this._optionWindow.setHandler("cancel", () => {
        this.returnToSectionMenu();
        SoundManager.playCancel();
      });
      
      this.addWindow(this._optionWindow);
    }

    createDescriptionWindow() {
        const x = this._sectionMenuWidth;
        const y = this._characterPreviewWindow.height + this._optionWindow.height;
        const width = Graphics.boxWidth - x;
        const height = Graphics.boxHeight - y;
        const rect = new Rectangle(x, y, width, height);
        this._descriptionWindow = new Window_Help(rect);
        this.addWindow(this._descriptionWindow);
    }

    createConfirmationWindow() {
        const width = 1020;
        const height = 580;
        const x = (Graphics.boxWidth - width) / 2;
        const y = (Graphics.boxHeight - height) / 2;
        const rect = new Rectangle(x, y, width, height);
        this._confirmationWindow = new Window_Confirmation(rect);
        this._confirmationWindow.setHandler("accept", this.onConfirmationAccept.bind(this));
        this._confirmationWindow.setHandler("cancel", this.onConfirmationCancel.bind(this));
        this._confirmationWindow.hide();
        this._confirmationWindow.deactivate();
        this.addWindow(this._confirmationWindow);
    }
    updateDescriptionText() {
        const selected = (arr) => arr.find(o => $gameSwitches.value(o.switchId));
        const razaDesc = (selected(raceOptions)?.desc || "Raza: Sin seleccionar");
        const claseDesc = (selected(claseOptions)?.desc || "Clase: Sin seleccionar");
        const historiaDesc = "Historia: " + (selected(historiaOptions)?.desc || "Sin seleccionar");
        this._descriptionWindow.setText(razaDesc + "\n" + claseDesc + "\n" + historiaDesc);
    }

    openOptions(optionArray, label) {
      this._characterPreviewWindow.contents.clear();
      this._characterPreviewWindow.drawText(label, 0, 0, this._characterPreviewWindow.width, "center");

      const commands = optionArray.map(opt => ({
        name: opt.name, symbol: opt.name.toLowerCase().replaceAll(" ", "_"),
        action: async () => {
          if (confirmationCategories.includes(label)) {
              this._pendingSelection = {option: opt, array: optionArray, label: label};
              // ===== MEJORA: Usa el texto largo si existe, si no, usa el corto =====
              const textToShow = opt.longDesc || opt.desc;
              this._confirmationWindow.setText(textToShow);
              
              this._confirmationWindow.show();
              this._confirmationWindow.activate();
              this._optionWindow.deactivate();
          } else {
              optionArray.forEach(o => $gameSwitches.setValue(o.switchId, o.name === opt.name));
              if (label === "Raza") {
                Object.values(colorPeloPorRaza).flat().forEach(c => $gameSwitches.setValue(c.switchId, false));
              }
              await this.callRefreshCommonEvent();
              this.refreshCharacterSprite();
              this.updateDescriptionText();
              this._sectionWindow.refresh();

              if (!previewCategories.includes(label)) {
                  this.returnToSectionMenu();
              } else {
                  this._optionWindow.activate();
              }
          }
        }
      }));

      this._optionWindow.setup(commands);
      this._optionWindow.activate();
      this._sectionWindow.deactivate();
    }
    
    returnToSectionMenu() {
        this._optionWindow.deactivate();
        this._sectionWindow.activate();
        this._sectionWindow.refresh();
    }

    async onConfirmationAccept() {
        const { option, array, label } = this._pendingSelection;
        array.forEach(o => $gameSwitches.setValue(o.switchId, o.name === option.name));
        if (label === "Raza") {
            Object.values(colorPeloPorRaza).flat().forEach(c => $gameSwitches.setValue(c.switchId, false));
        }

        await this.callRefreshCommonEvent();
        this.refreshCharacterSprite();
        this.updateDescriptionText();
        
        this._confirmationWindow.hide();
        this._confirmationWindow.deactivate();
        this._pendingSelection = null;
        this.returnToSectionMenu();
    }

    onConfirmationCancel() {
        this._confirmationWindow.hide();
        this._confirmationWindow.deactivate();
        this._pendingSelection = null;
        this._optionWindow.activate();
    }
    
    openRaceOptions() { this.openOptions(raceOptions, "Raza"); }
    openGeneroOptions() { this.openOptions(generoOptions, "Género"); }
    openPeloOptions() { this.openOptions(peloOptions, "Pelo"); }
    openClaseOptions() { this.openOptions(claseOptions, "Clase"); }
    openHistoriaOptions() { this.openOptions(historiaOptions, "Historia"); }
    openColorPeloOptions() {
      const raza = raceOptions.find(r => $gameSwitches.value(r.switchId));
      if (!raza || !colorPeloPorRaza[raza.name]) {
        SoundManager.playBuzzer(); this._sectionWindow.activate(); return;
      }
      this.openOptions(colorPeloPorRaza[raza.name], "Color de Pelo");
    }

    createCharacterSprite() {
      const character = $gamePlayer;
      this._liveCharacterSprite = new Sprite_Character(character);
      
      const xPos = (this._characterPreviewWindow.width / 2) + CHARACTER_X_OFFSET;
      const yPos = (this._characterPreviewWindow.height - 48) + CHARACTER_Y_OFFSET;
      
      this._liveCharacterSprite.x = xPos;
      this._liveCharacterSprite.y = yPos;
      this._liveCharacterSprite.scale.set(4, 4);
      this._liveCharacterSprite.anchor.set(0.5, 1);
      
      this._liveCharacterSprite.updatePosition = function() {};
      
      this._characterPreviewWindow.addChild(this._liveCharacterSprite);
    }

    refreshCharacterSprite() {
      if(this._liveCharacterSprite) { this._liveCharacterSprite.setCharacter($gamePlayer); }
    }
    
    onFinishCreation() {
      const allComplete = creationSections.every(s => s.name === 'Fin' || this.isSectionComplete(s.name));

      if (!allComplete) {
        SoundManager.playBuzzer(); this._sectionWindow.activate(); return;
      }
      SceneManager.goto(Scene_Map);
    }
    
    async callRefreshCommonEvent() {
      if (startCommonEventId > 0 && $dataCommonEvents[startCommonEventId]) {
        const interpreter = new Game_Interpreter();
        interpreter.setup($dataCommonEvents[startCommonEventId].list, 0);
        while (interpreter.isRunning()) {
          interpreter.update(); await new Promise(resolve => setTimeout(resolve, 1));
        }
      }
    }

    isSectionComplete(sectionName) {
        const isSelected = (options) => options.some(opt => $gameSwitches.value(opt.switchId));
        switch(sectionName) {
            case "Raza": return isSelected(raceOptions);
            case "Género": return isSelected(generoOptions);
            case "Pelo": return isSelected(peloOptions);
            case "Clase": return isSelected(claseOptions);
            case "Historia": return isSelected(historiaOptions);
            case "Color de Pelo":
                const raza = raceOptions.find(r => $gameSwitches.value(r.switchId));
                if (!raza) return false;
                const colorOptions = colorPeloPorRaza[raza.name];
                return isSelected(colorOptions);
            default: return false;
        }
    }
  }

  class Window_SubSelection extends Window_Command {
    constructor(rect) {
      super(rect);
      this.clearCommandList();
      this.deselect();
      this.setBackgroundType(0);
      this._createManualArrowIcons();
    }

    _createManualArrowIcons() {
      const bitmap = ImageManager.loadSystem("IconSet");
      const sx_up = (UP_ARROW_ICON % 16) * 32;
      const sy_up = Math.floor(UP_ARROW_ICON / 16) * 32;
      const sx_down = (DOWN_ARROW_ICON % 16) * 32;
      const sy_down = Math.floor(DOWN_ARROW_ICON / 16) * 32;
      this._upArrowIcon = new Sprite(bitmap);
      this._upArrowIcon.setFrame(sx_up, sy_up, 32, 32);
      this._downArrowIcon = new Sprite(bitmap);
      this._downArrowIcon.setFrame(sx_down, sy_down, 32, 32);
      this._upArrowIcon.z = 9;
      this._downArrowIcon.z = 9;
      this.addChild(this._upArrowIcon);
      this.addChild(this._downArrowIcon);
    }

    update() {
        super.update();
        this._updateManualArrowIcons();
    }
    
    _updateManualArrowIcons() {
        this._upArrowIcon.visible = this.topRow() > 0;
        this._downArrowIcon.visible = this.topRow() + this.maxPageRows() < this.maxRows();
        const x = this.width - 40;
        const y_up = 8;
        const y_down = this.height - 40;
        this._upArrowIcon.x = x;
        this._upArrowIcon.y = y_up;
        this._downArrowIcon.x = x;
        this._downArrowIcon.y = y_down;
    }

    setup(commands) {
      this.clearCommandList();
      for (const cmd of commands || []) {
        this.addCommand(cmd.name, cmd.symbol, true);
        this.setHandler(cmd.symbol, cmd.action);
      }
      this.paint();
      this.select(0);
    }
  }

  // ===== NUEVA VENTANA DE CONFIRMACIÓN (VERSIÓN SCROLLABLE) =====
  class Window_Confirmation extends Window_Command {
      constructor(rect) {
          super(rect);
          this.openness = 255;
          this._text = "";
          this.createMessageWindow();
      }

      createMessageWindow() {
          const rect = this.baseTextRect();
          // La sub-ventana ahora es de tipo Window_Scrollable
          this._messageWindow = new Window_Scrollable(rect);
          this._messageWindow.setBackgroundType(2); // Transparente
          this._messageWindow.openness = 255;
          this.addChild(this._messageWindow);
      }
      
      baseTextRect() {
          const width = this.innerWidth;
          const height = this.innerHeight - this.fittingHeight(1) - 8; // Un poco de padding extra
          return new Rectangle(0, 0, width, height);
      }

      setText(text) {
          this._text = text;
          this.refreshMessage();
      }

      refreshMessage() {
          const rect = this.baseTextRect();
          const text = this._text;
          
          this._messageWindow.contents.clear();
          
          // Se usa un método más robusto para calcular la altura del texto sin dibujarlo primero
          const textState = this._messageWindow.createTextState(text, 0, 0, rect.width);
          const height = textState.height;
          
          // Se crea un nuevo lienzo del tamaño exacto necesario
          this._messageWindow.createContents(rect.width, height);
          
          // Se dibuja el texto una sola vez en el lienzo nuevo
          this._messageWindow.drawTextEx(text, 0, 0, rect.width);
          
          // Se resetea la posición del scroll
          this._messageWindow.scrollTo(0, 0);
      }
      
      update() {
          super.update();
          // Activa la ventana de scroll cuando la ventana principal esté activa
          if (this.active) {
              this._messageWindow.activate();
          } else {
              this._messageWindow.deactivate();
          }
      }

      makeCommandList() {
          this.addCommand("Aceptar", "accept");
          this.addCommand("Cancelar", "cancel");
      }
      
      itemRect(index) {
          const rect = super.itemRect(index);
          rect.y += this.innerHeight - this.fittingHeight(1);
          return rect;
      }
      
      maxCols() {
          return 2;
      }
  }

  PluginManager.registerCommand(pluginName, "Start", () => {
    SceneManager.push(Scene_CharacterCreation);
  });
})();