/*:
 * @target MZ
 * @plugindesc Menú de creación de personaje visual (v2.5). Con descripciones, imagen de fondo, iconos y encabezado dinámico. © Vermilion Games
 * @author Vermilion Games
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

  const raceOptions = [
    { name: "Humano", switchId: 66, desc: "Una raza versátil y adaptable." },
    { name: "Elvemir", switchId: 67, desc: "Seres élficos de gran afinidad arcana." },
    { name: "Siverett", switchId: 119, desc: "Descendientes del hielo y la luna." },
  ];

  const generoOptions = [
    { name: "Hombre", switchId: 1 },
    { name: "Mujer", switchId: 2 },
  ];

  const peloOptions = [
    { name: "Pelo 1", switchId: 154 },
    { name: "Pelo 2", switchId: 155 },
    { name: "Pelo 3", switchId: 156 },
    { name: "Pelo 4", switchId: 157 },
  ];

  const claseOptions = [
    { name: "Guerrero", switchId: 106, desc: "Combatiente cuerpo a cuerpo resistente." },
    { name: "Pícaro", switchId: 109, desc: "Astuto, veloz y experto en trampas." },
    { name: "Arcanista", switchId: 108, desc: "Dominador de los misterios mágicos." },
  ];

  const historiaOptions = [
    { name: "Inicio Aventurero", switchId: 201, desc: "Has vivido entre mercenarios y vagabundos." },
    { name: "Expedición Argéntea", switchId: 202, desc: "Te uniste a una misión de exploración arcana." },
  ];

  const colorPeloPorRaza = {
    Humano: [
      { name: "Castaño", switchId: 6 },
      { name: "Rubio", switchId: 7 },
      { name: "Rojo", switchId: 8 },
      { name: "Negro", switchId: 9 }
    ],
    Elvemir: [
      { name: "Amatista", switchId: 71 },
      { name: "Zafiro", switchId: 70 },
      { name: "Esmeralda", switchId: 69 },
      { name: "Dorado", switchId: 68 }
    ],
    Siverett: [
      { name: "Blanco", switchId: 150 },
      { name: "Plateado", switchId: 151 }
    ]
  };

  const creationSections = [
    { name: "Raza", icon: 87 },
    { name: "Género", icon: 86 },
    { name: "Pelo", icon: 85 },
    { name: "Color de Pelo", icon: 16 },
    { name: "Clase", icon: 80 },
    { name: "Historia", icon: 82 },
    { name: "Fin", icon: 77 }
  ];

  class Scene_CharacterCreation extends Scene_MenuBase {
    async create() {
  super.create(); // Esto mantiene la ventana funcionando correctamente
  this.createBackground(); // Pero el fondo ahora es personalizado
  await this.callRefreshCommonEvent();
  this.createSectionMenu();
  this.createOptionHeader();
  this.createOptionWindow();
  this.createCharacterSprite();
  this.createInfoWindows();
  this.updateInfoTexts();
}


    createBackground() {
  this._backgroundSprite = new Sprite(ImageManager.loadPicture("Wood"));
  this._backgroundSprite.anchor.set(0, 0);
  this._backgroundSprite.x = 0;
  this._backgroundSprite.y = 0;
  this.addChildAt(this._backgroundSprite, 0); // ¡Asegura que el fondo quede detrás!
}

    createSectionMenu() {
      const width = 200;
      const height = this.calcWindowHeight(creationSections.length, true);
      const rect = new Rectangle(0, 0, width, height);
      this._sectionWindow = new Window_Command(rect);

      this._sectionWindow.makeCommandList = function () {
        this.clearCommandList();
        for (const section of creationSections) {
          this.addCommand(section.name, section.name.toLowerCase().replaceAll(" ", "_"), true, null, section.icon);
        }
      };

      this._sectionWindow.setHandler("raza", this.openRaceOptions.bind(this));
      this._sectionWindow.setHandler("género", this.openGeneroOptions.bind(this));
      this._sectionWindow.setHandler("pelo", this.openPeloOptions.bind(this));
      this._sectionWindow.setHandler("color_de_pelo", this.openColorPeloOptions.bind(this));
      this._sectionWindow.setHandler("clase", this.openClaseOptions.bind(this));
      this._sectionWindow.setHandler("historia", this.openHistoriaOptions.bind(this));
      this._sectionWindow.setHandler("fin", this.onFinishCreation.bind(this));
      this._sectionWindow.setHandler("cancel", this.popScene.bind(this));

      this._sectionWindow.refresh();
      this._sectionWindow.activate();
      this.addWindow(this._sectionWindow);
    }

    createOptionHeader() {
      const rect = new Rectangle(200, 0, Graphics.boxWidth - 200, 48);
      this._headerWindow = new Window_Base(rect);
      this._headerWindow.setBackgroundType(1);
      this._headerWindow.drawText("Opciones", 0, 0, rect.width, "center");
      this.addWindow(this._headerWindow);
    }

    updateOptionHeader(title) {
      this._headerWindow.contents.clear();
      this._headerWindow.drawText(title, 0, 0, this._headerWindow.width, "center");
    }

    createOptionWindow() {
      const rect = new Rectangle(200, 48, Graphics.boxWidth - 200, 180);
      this._optionWindow = new Window_SubSelection(rect);
      this._sectionWindow.setHandler("cancel", () => {
  SoundManager.playBuzzer();
  this._sectionWindow.activate(); // Volver a activar la ventana tras el sonido
});
      this.addWindow(this._optionWindow);
      this._optionWindow.hide();
      this._headerWindow.setBackgroundType(2); // Fondo completamente transparente
    }

    createInfoWindows() {
      const width = Graphics.boxWidth - 220;
      const height = 60;
      const x = 200;
      let y = Graphics.boxHeight - 3 * height - 20;

      this._infoRaza = new Window_Help(1);
      this._infoRaza.move(x, y, width, height);
      this.addWindow(this._infoRaza);

      y += height;
      this._infoClase = new Window_Help(1);
      this._infoClase.move(x, y, width, height);
      this.addWindow(this._infoClase);

      y += height;
      this._infoHistoria = new Window_Help(1);
      this._infoHistoria.move(x, y, width, height);
      this.addWindow(this._infoHistoria);
    }

    updateInfoTexts() {
      const selected = (arr) => arr.find(o => $gameSwitches.value(o.switchId));
      this._infoRaza.setText("Raza: " + (selected(raceOptions)?.desc || ""));
      this._infoClase.setText("Clase: " + (selected(claseOptions)?.desc || ""));
      this._infoHistoria.setText("Inicio: " + (selected(historiaOptions)?.desc || ""));
    }

    openOptions(optionArray, label) {
      this.updateOptionHeader(label);
      const isRaceSelection = (label === "Raza");
      const commands = optionArray.map(opt => ({
        name: opt.name,
        symbol: opt.name.toLowerCase().replaceAll(" ", "_"),
        action: async () => {
          for (const option of optionArray) {
            $gameSwitches.setValue(option.switchId, option.name === opt.name);
          }

          if (isRaceSelection) {
            const actor = $gameActors.actor(1);
            const hairEquipTypeId = 8;
            const slotId = actor.equipSlots().findIndex(slot => slot === hairEquipTypeId);
            if (slotId >= 0) actor.changeEquip(slotId, null);

            Object.values(colorPeloPorRaza).flat().forEach(c => {
              $gameSwitches.setValue(c.switchId, false);
            });
          }

          await this.callRefreshCommonEvent();
          this.closeOptionWindow();
          this.refreshCharacterSprite();
          this.updateInfoTexts();
        }
      }));

      this._optionWindow.setup(commands);
      this._optionWindow.show();
      this._optionWindow.activate();
      this._sectionWindow.deactivate();
    }

    openRaceOptions() { this.openOptions(raceOptions, "Raza"); }
    openGeneroOptions() { this.openOptions(generoOptions, "Género"); }
    openPeloOptions() { this.openOptions(peloOptions, "Pelo"); }
    openClaseOptions() { this.openOptions(claseOptions, "Clase"); }
    openHistoriaOptions() { this.openOptions(historiaOptions, "Historia"); }

    openColorPeloOptions() {
      const raza = raceOptions.find(r => $gameSwitches.value(r.switchId));
      const opcionesColor = raza ? colorPeloPorRaza[raza.name] : null;
      if (!opcionesColor) {
        SoundManager.playBuzzer();
        this._sectionWindow.activate();
        return;
      }
      this.openOptions(opcionesColor, "Color de Pelo");
    }

    closeOptionWindow() {
      this._optionWindow.hide();
      this._sectionWindow.activate();
    }

    async onFinishCreation() {
      const razaSeleccionada = raceOptions.find(r => $gameSwitches.value(r.switchId));
      const colorOptions = razaSeleccionada ? colorPeloPorRaza[razaSeleccionada.name] : [];

      const allRequiredGroups = [
        raceOptions,
        generoOptions,
        peloOptions,
        claseOptions,
        historiaOptions,
        colorOptions
      ];

      const allSelected = allRequiredGroups.every(group =>
        group.some(opt => $gameSwitches.value(opt.switchId))
      );

      if (!allSelected) {
        SoundManager.playBuzzer();
        await this.showMissingSelectionsMessage();
        this._sectionWindow.activate();
        return;
      }

      SceneManager.goto(Scene_Map);
    }

    async showMissingSelectionsMessage() {
  const windowMessage = SceneManager._scene._messageWindow;
  if (windowMessage) {
    $gameMessage.add("\\>\\c[2]Debes completar todas las opciones antes de continuar.");
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!$gameMessage.isBusy()) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  } else {
    SoundManager.playBuzzer();
  }
}

    createCharacterSprite() {
      const character = $gamePlayer;
      this._liveCharacterSprite = new Sprite_Character(character);
      this._liveCharacterSprite.x = Graphics.boxWidth - 100;
      this._liveCharacterSprite.y = Graphics.boxHeight - 50;
      this._liveCharacterSprite.scale.set(2, 2);
      this._liveCharacterSprite.anchor.set(0.5, 1);
      this.addChild(this._liveCharacterSprite);
    }

    refreshCharacterSprite() {
      // Refresca sprite si el evento común lo cambia.
    }

    async callRefreshCommonEvent() {
      if (startCommonEventId > 0) {
        const event = $dataCommonEvents[startCommonEventId];
        if (event) {
          const interpreter = new Game_Interpreter();
          await interpreter.setup(event.list, 0);
          while (interpreter.isRunning()) {
            interpreter.update();
            await new Promise(resolve => setTimeout(resolve, 1));
          }
        }
      }
    }
  }

  class Window_SubSelection extends Window_Command {
    constructor(rect) {
      super(rect);
      this._customCommands = [];
    }

    setup(commands) {
      this._customCommands = commands;
      this.refresh();
    }

    makeCommandList() {
      for (const cmd of this._customCommands || []) {
        this.addCommand(cmd.name, cmd.symbol);
        this.setHandler(cmd.symbol, cmd.action);
      }
    }

    drawItem(index) {
      const rect = this.itemLineRect(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(this.commandName(index), rect.x + 10, rect.y, rect.width, "left");
    }
  }

  PluginManager.registerCommand(pluginName, "Start", () => {
    SceneManager.push(Scene_CharacterCreation);
  });
})();
