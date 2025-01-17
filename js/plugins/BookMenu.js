(() => {
    class Scene_CustomBookMenu extends Scene_Base {
        create() {
            super.create();
            this.createBackground();
            this.createLeftPage();
            this.createRightPage();
            this._activePage = "left"; // Página activa inicial
            this._usingMouse = false; // Indica si el usuario está usando el ratón
        }

        start() {
            super.start();
            this._leftPage.refresh();
            this._rightPage.refresh();
            this.activateLeftPage(); // Activar la página izquierda por defecto
        }

        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture("BookBackground");
            this.addChild(this._backgroundSprite);
        }

        createLeftPage() {
            const rect = this.leftPageRect();
            this._leftPage = new Window_BookPage(rect, "left");
            this._leftPage.setHandler("character", this.openCharacter.bind(this));
            this._leftPage.setHandler("skills", this.openSkills.bind(this));
            this._leftPage.setHandler("notes", this.openNotes.bind(this));
            this._leftPage.setHandler("cancel", this.popScene.bind(this));
            this.addChild(this._leftPage);
        }

        createRightPage() {
            const rect = this.rightPageRect();
            this._rightPage = new Window_BookPage(rect, "right");
            this._rightPage.setHandler("factions", this.openFactions.bind(this));
            this._rightPage.setHandler("save", this.commandSave.bind(this));
            this._rightPage.setHandler("options", this.commandOptions.bind(this));
            this._rightPage.setHandler("cancel", this.popScene.bind(this));
            this.addChild(this._rightPage);
        }

        leftPageRect() {
            const x = 50;
            const y = 50;
            const width = Graphics.boxWidth / 2 - 75;
            const height = Graphics.boxHeight - 100;
            return new Rectangle(x, y, width, height);
        }

        rightPageRect() {
            const x = Graphics.boxWidth / 2 + 25;
            const y = 50;
            const width = Graphics.boxWidth / 2 - 75;
            const height = Graphics.boxHeight - 100;
            return new Rectangle(x, y, width, height);
        }

        activateLeftPage() {
            this._leftPage.activate();
            this._leftPage.select(0);
            this._rightPage.deactivate();
            this._rightPage.deselect();
            this._activePage = "left";
        }

        activateRightPage() {
            this._rightPage.activate();
            this._rightPage.select(0);
            this._leftPage.deactivate();
            this._leftPage.deselect();
            this._activePage = "right";
        }

        update() {
            super.update();
            this.checkMouseInput();
            this.checkKeyboardInput();
        }

        checkMouseInput() {
            if (TouchInput.isMoved()) {
                this._usingMouse = true; // El ratón toma control
            }

            if (this._usingMouse) {
                if (this._leftPage.isMouseInside() && !this._leftPage.active) {
                    this.activateLeftPage();
                }
                if (this._rightPage.isMouseInside() && !this._rightPage.active) {
                    this.activateRightPage();
                }
            }
        }

        checkKeyboardInput() {
            if (this.isKeyInputActive()) {
                this._usingMouse = false; // El teclado toma control
            }

            if (!this._usingMouse) {
                if (this._activePage === "left" && Input.isRepeated("right")) {
                    this.activateRightPage(); // Pasar a la página derecha
                } else if (this._activePage === "right" && Input.isRepeated("left")) {
                    this.activateLeftPage(); // Pasar a la página izquierda
                }
            }
        }

        isKeyInputActive() {
            return (
                Input.isRepeated("up") ||
                Input.isRepeated("down") ||
                Input.isRepeated("left") ||
                Input.isRepeated("right") ||
                Input.isPressed("ok") ||
                Input.isPressed("cancel")
            );
        }

        openCharacter() {
            console.log("Abrir datos del personaje");
        }

        openSkills() {
            console.log("Abrir árbol de habilidades");
        }

        openNotes() {
            console.log("Abrir notas");
        }

        openFactions() {
            console.log("Abrir facciones");
        }

        commandSave() {
            SceneManager.push(Scene_Save);
        }

        commandOptions() {
            SceneManager.push(Scene_Options);
        }
    }

    class Window_BookPage extends Window_Command {
        constructor(rect, side) {
            super(rect);
            this._side = side;
            this.refresh();
        }

        makeCommandList() {
            if (this._side === "left") {
                this.addCommand("Personaje", "character");
                this.addCommand("Árbol de habilidades", "skills");
                this.addCommand("Notas", "notes");
            } else if (this._side === "right") {
                this.addCommand("Facciones", "factions");
                this.addCommand("Guardar", "save");
                this.addCommand("Opciones", "options");
            }
        }

        drawItem(index) {
            const rect = this.itemLineRect(index);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(this.commandName(index), rect.x, rect.y, rect.width, "center");
        }

        refreshCursor() {
            if (this.active) {
                super.refreshCursor();
            } else {
                this.setCursorRect(0, 0, 0, 0);
            }
        }

        isMouseInside() {
            const x = TouchInput.x;
            const y = TouchInput.y;
            return (
                x >= this.x &&
                x <= this.x + this.width &&
                y >= this.y &&
                y <= this.y + this.height
            );
        }
    }

    const openCustomBookMenu = () => {
        SceneManager.push(Scene_CustomBookMenu);
    };

    window.openCustomBookMenu = openCustomBookMenu;
})();
