//=============================================================================
// Yanfly Engine Plugins - Core Engine
// YEP_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CoreEngine = true;

var Yanfly = Yanfly || {};
Yanfly.Core = Yanfly.Core || {};

//=============================================================================
/*:
 * @plugindesc Warning! This plugin was modified (see Window_MenuStatus) for Dystopian project's "Claire's Quest" 
 * v1.15 Needed for the majority of Yanfly Engine Scripts. Also
 * contains bug fixes found inherently in RPG Maker.
 * @author Yanfly Engine Plugins
 *
 * @param ---Screen---
 * @default
 *
 * @param Screen Width
 * @desc Adjusts the width of the screen.
 * Default: 816
 * @default 816
 *
 * @param Screen Height
 * @desc Adjusts the height of the screen.
 * Default: 624
 * @default 624
 *
 * @param Scale Battlebacks
 * @desc Do you wish to scale battlebacks to resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param Scale Title
 * @desc Do you wish to scale the title screen to resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param Scale Game Over
 * @desc Do you wish to scale the game over screen to resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param Open Console
 * @desc For testing and debug purposes, this opens up the console.
 * Don't Open - false     Open - true
 * @default false
 *
 * @param Reposition Battlers
 * @desc Allow the plugin to reposition battlers to resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param GameFont Load Timer
 * @desc This allows you to set the timer for loading the GameFont.
 * Set to 0 for unlimited time. Default: 20000
 * @default 0
 *
 * @param ---Gold---
 * @desc
 *
 * @param Gold Max
 * @desc The maximum amount of gold the player can have.
 * Default: 99999999
 * @default 99999999
 *
 * @param Gold Font Size
 * @desc The font size used to display gold.
 * Default: 28
 * @default 20
 *
 * @param Gold Icon
 * @desc This will be the icon used to represent gold in the gold
 * window. If left at 0, no icon will be displayed.
 * @default 313
 *
 * @param Gold Overlap
 * @desc This will be what's displayed when the gold number
 * exceeds the allocated area's content size.
 * @default A lotta
 *
 * @param ---Items---
 * @desc
 *
 * @param Default Max
 * @desc This is the maximum number of items a player can hold.
 * Default: 99
 * @default 99
 *
 * @param Quantity Text Size
 * @desc This is the text's font size used for the item quantity.
 * Default: 28
 * @default 20
 *
 * @param ---Stats---
 * @default
 *
 * @param Max Level
 * @desc Adjusts the maximum level limit for actors.
 * Default: 99
 * @default 99
 *
 * @param Actor MaxHP
 * @desc Adjusts the maximum HP limit for actors.
 * Default: 9999
 * @default 9999
 *
 * @param Actor MaxMP
 * @desc Adjusts the maximum MP limit for actors.
 * Default: 9999
 * @default 9999
 *
 * @param Actor Parameter
 * @desc Adjusts the maximum parameter limit for actors.
 * Default: 999
 * @default 999
 *
 * @param Enemy MaxHP
 * @desc Adjusts the maximum HP limit for enemies.
 * Default: 999999
 * @default 999999
 *
 * @param Enemy MaxMP
 * @desc Adjusts the maximum MP limit for enemies.
 * Default: 9999
 * @default 9999
 *
 * @param Enemy Parameter
 * @desc Adjusts the maximum parameter limit for enemies.
 * Default: 999
 * @default 999
 *
 * @param ---Battle---
 * @desc
 *
 * @param Animation Rate
 * @desc Adjusts the rate of battle animations. Lower for faster.
 * Default: 4
 * @default 4
 *
 * @param Flash Target
 * @desc If an enemy is targeted, it flashes or it can whiten.
 * OFF - false     ON - true
 * @default false
 *
 * @param ---Font---
 * @desc
 *
 * @param Chinese Font
 * @desc Default font(s) used for a Chinese RPG.
 * Default: SimHei, Heiti TC, sans-serif
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @desc Default font(s) used for a Korean RPG.
 * Default: Dotum, AppleGothic, sans-serif
 * @default Dotum, AppleGothic, sans-serif
 *
 * @param Default Font
 * @desc Default font(s) used for everything else.
 * Default: GameFont
 * @default GameFont, Verdana, Arial, Courier New
 *
 * @param Font Size
 * @desc Default font size used for windows.
 * Default: 28
 * @default 28
 *
 * @param Text Align
 * @desc How to align the text for command windows.
 * left     center     right
 * @default left
 *
 * @param ---Windows---
 * @default
 *
 * @param Digit Grouping
 * @desc Groups together digits with a comma.
 * false - OFF     true - ON
 * @default true
 *
 * @param Line Height
 * @desc Adjusts universal line height used in Windows.
 * Default: 36
 * @default 36
 *
 * @param Icon Width
 * @desc Adjusts the width of your icons.
 * Default: 32
 * @default 32
 *
 * @param Icon Height
 * @desc Adjusts the height of your icons.
 * Default: 32
 * @default 32
 *
 * @param Face Width
 * @desc Adjusts the width of actors' faces.
 * Default: 144
 * @default 144
 *
 * @param Face Height
 * @desc Adjusts the height of actors' faces.
 * Default: 144
 * @default 144
 *
 * @param Window Padding
 * @desc Adjusts the padding for all standard windows.
 * Default: 18
 * @default 18
 *
 * @param Text Padding
 * @desc Adjusts the padding for text inside of windows.
 * Default: 6
 * @default 6
 *
 * @param Window Opacity
 * @desc Adjusts the background opacity for windows.
 * Default: 192
 * @default 192
 *
 * @param Gauge Outline
 * @desc Enable outlines for gauges.
 * false - OFF     true - ON
 * @default true
 *
 * @param Gauge Height
 * @desc Sets the height for gauges.
 * Default: 6
 * @default 18
 *
 * @param Menu TP Bar
 * @desc Draws a TP bar in the menu status for actors.
 * false - OFF     true - ON
 * @default true
 *
 * @param ---Window Colors---
 * @default
 *
 * @param Color: Normal
 * @desc Changes the text color for Windows.
 * Default: 0
 * @default 0
 *
 * @param Color: System
 * @desc Changes the text color for Windows.
 * Default: 16
 * @default 16
 *
 * @param Color: Crisis
 * @desc Changes the text color for Windows.
 * Default: 17
 * @default 17
 *
 * @param Color: Death
 * @desc Changes the text color for Windows.
 * Default: 18
 * @default 18
 *
 * @param Color: Gauge Back
 * @desc Changes the text color for Windows.
 * Default: 19
 * @default 19
 *
 * @param Color: HP Gauge 1
 * @desc Changes the text color for Windows.
 * Default: 20
 * @default 20
 *
 * @param Color: HP Gauge 2
 * @desc Changes the text color for Windows.
 * Default: 21
 * @default 21
 *
 * @param Color: MP Gauge 1
 * @desc Changes the text color for Windows.
 * Default: 22
 * @default 22
 *
 * @param Color: MP Gauge 2
 * @desc Changes the text color for Windows.
 * Default: 23
 * @default 23
 *
 * @param Color: MP Cost
 * @desc Changes the text color for Windows.
 * Default: 23
 * @default 23
 *
 * @param Color: Power Up
 * @desc Changes the text color for Windows.
 * Default: 24
 * @default 24
 *
 * @param Color: Power Down
 * @desc Changes the text color for Windows.
 * Default: 25
 * @default 25
 *
 * @param Color: TP Gauge 1
 * @desc Changes the text color for Windows.
 * Default: 28
 * @default 28
 *
 * @param Color: TP Gauge 2
 * @desc Changes the text color for Windows.
 * Default: 29
 * @default 29
 *
 * @param Color: TP Cost Color
 * @desc Changes the text color for Windows.
 * Default: 29
 * @default 29
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Yanfly Engine Plugins - Core Engine is made for RPG Maker MV. This plugin
 * functions primarily to fix bugs and to allow the user more control over RPG
 * Maker MV's various features, such as the screen resolution, font, window
 * colors, and more.
 *
 * Just place this on top of all the other Yanfly Engine Plugins.
 * Adjust any parameters as you see fit.
 *
 * ============================================================================
 * Bug Fixes
 * ============================================================================
 *
 * This plugin fixes a few bugs found present within RPG Maker MV. Of them are
 * the following:
 *
 * Animation Overlay
 *   When a skill/item that targets multiple enemies at once using a fullscreen
 *   animation, it will overlay multiple times causing the image to look
 *   distorted by a series of overlayed effects. The plugin fixes this issue by
 *   having only one animation played over the group instead of every one.
 *
 * Event Movement Speed
 *   The movement speed of events are slightly slower than what they should be
 *   due a small error in the source code. The plugin fixes this issue and they
 *   move at the properly speed.
 *
 * Event Movement Queue
 *   If an event were to move through an event command, changing a condition
 *   that would set the event to change to a different page would cause that
 *   event's move route to halt in its tracks. The plugin fixes this issue and
 *   the event's move route will finish.
 *
 * Event Colliding
 *   Events cannot move over other events with a Below Player setting. This
 *   makes it difficult for certain types of puzzles or events to exist. This
 *   plugin fixes this issue by making the collision check only apply to events
 *   of "Same as Characters" priority. Any event that's above or below the
 *   characters will no longer collide with other events.
 *
 * Screen Tearing
 *   When moving slowly, the tiles on the screen tear. While it's not
 *   noticeable on all systems, slower computers will definitely show it. The
 *   plugin will fix this issue and synch the tiles to keep up to pace with
 *   the screen's camera movement properly.
 *
 * Sprite Distortion
 *   Because of JavaScript's strange mathematical behavior, sometimes values
 *   with decimal places cause spritesheets to end up looking distorted. The
 *   plugin will get rid of the decimal places and have sprite sheets take out
 *   frames properly by using integer values only.
 *
 * ============================================================================
 * Gold
 * ============================================================================
 *
 * You can use the plugin commands to add or remove gold more than the
 * editor's 9,999,999 limit. You can also place notetags into items, weapons,
 * and armors to over the 999,999 cost limit.
 *
 * Plugin Command:
 *   GainGold 1234567890       # Party gains 1234567890 gold.
 *   LoseGold 9876543210       # Party loses 9876543210 gold.
 *
 * Item, Weapon, Armor Notetags
 *   <Price: x>
 *   Changes the price of the item to x. This notetag allows you to bypass the
 *   editor's 999,999 gold cost limit.
 *
 * Enemy Notetag
 *   <Gold: x>
 *   Changes the gold drop value of enemies to x. This notetag allows you to
 *   bypass the editor's 9,999,999 gold drop limit.
 *
 * ============================================================================
 * Items
 * ============================================================================
 *
 * Change the parameters to reflect the maximum number of items a player can
 * hold per item. If you wish to make individual items have different max
 * values, use the following notetag:
 *
 * Item, Weapon, Armor Notetag:
 *   <Max Item: x>
 *   This changes the maximum amount of the item to x.
 *
 * ============================================================================
 * Stats
 * ============================================================================
 *
 * Even with the parameter limits raised, the editor is still confined to RPG
 * Maker MV's default limits. To break past them, use the following notetags
 * to allow further control over the individual aspects for the parameters.
 *
 * Actor Notetag
 *   <Initial Level: x>
 *   Changes the actor's initial level to x. This allows you to bypass the
 *   editor's level 99 limit.
 *
 *   <Max Level: x>
 *   Changes the actor's max level to x. This allows you to bypass the editor's
 *   level 99 limit.
 *
 * Class Skill Learn Notetag
 *   <Learn at Level: x>
 *   When placed inside a class's "Skills to Learn" notetag, this will cause
 *   the class to learn the skill at level x.
 *
 * Weapon and Armor Notetags
 *   <stat: +x>
 *   <stat: -x>
 *   Allows the piece of weapon or armor to gain or lose x amount of stat.
 *   Replace "stat" with "hp", "mp", "atk", "def", "mat", "mdf", "agi", or
 *   "luk" to alter that specific stat. This allows the piece of equipment
 *   to go past the editor's default limitation so long as the maximum value
 *   allows for it.
 *
 * Enemy Notetags
 *   <stat: x>
 *   This changes the enemy's stat to x amount. Replace "stat" with "hp",
 *   "mp", "atk", "def", "mat", "mdf", "agi", or "luk" to alter that
 *   specific stat. This allows the piece of equipment to go past the
 *   editor's default limitation.
 *
 *   <exp: x>
 *   This changes the enemy's exp given out to x amount. This allows the
 *   enemy give out more exp than the editor's default 9,999,999 limit.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.15:
 * - Window's are now set to have only widths and heights of whole numbers. No
 * longer is it possible for them to have decimal values. This is to reduce any
 * and all clipping issues caused by non-whole numbers.
 *
 * Version 1.14:
 * - Optimization update for RPG Maker MV itself by replacing more memory
 * intensive loops in commonly used functions with more efficient loops.
 *
 * Version 1.13:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.12:
 * - Fixed a bug with a notetag: <Learn at Level: x>. Now, the notetag works
 * with both <Learn at Level: x> and <Learn Level: x>
 *
 * Version 1.11:
 * - Made fixes to the MV Source Code where FaceWidth was using a hard-coded
 * 144 value regardless of what was changed for the Face Width parameter.
 * - Fixed a notetag that wasn't working with the enemy EXP values.
 * - Updated battler repositioning to no longer clash when entering-exiting the
 * scene with Row Formation.
 *
 * Version 1.10:
 * - Removed an MV bugfix that was applied through MV's newes tupdate.
 *
 * Version 1.09:
 * - Changed minimum display width for status drawing to accomodate Party
 * Formation defaults.
 *
 * Version 1.08:
 * - Fixed a bug within the MV Source with changing classes and maintaining
 * levels, even though the feature to maintain the levels has been removed.
 *
 * Version 1.07:
 * - Fixed an issue with the gauges drawing outlines thicker than normal at odd
 * intervals when windows are scaled irregularly.
 *
 * Version 1.06:
 * - Removed event frequency bug fix since it's now included in the source.
 *
 * Version 1.05:
 * - Added 'Scale Game Over' parameter to plugin settings.
 *
 * Version 1.04:
 * - Reworked math for calculating scaled battleback locations.
 * - Fixed a bug where if the party failed to escape from battle, states that
 * would be removed by battle still get removed. *Fixed by Emjenoeg*
 *
 * Version 1.03:
 * - Fixed a strange bug that made scaled battlebacks shift after one battle.
 *
 * Version 1.02:
 * - Fixed a bug that made screen fading on mobile devices work incorrectly.
 * - Added 'Scale Battlebacks' and 'Scale Title' parameters.
 *
 * Version 1.01:
 * - Fixed a bug that where if button sprites had different anchors, they would
 * not be properly clickable. *Fixed by Zalerinian*
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CoreEngine');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.ScaleBattleback = String(Yanfly.Parameters['Scale Battlebacks']);
Yanfly.Param.ScaleTitle = String(Yanfly.Parameters['Scale Title']);
Yanfly.Param.ScaleGameOver = String(Yanfly.Parameters['Scale Game Over']);
Yanfly.Param.OpenConsole = String(Yanfly.Parameters['Open Console']);
Yanfly.Param.DigitGroup = String(Yanfly.Parameters['Digit Grouping']);
Yanfly.Param.MaxItem = Number(Yanfly.Parameters['Default Max']);
Yanfly.Param.MaxLevel = Number(Yanfly.Parameters['Max Level']);
Yanfly.Param.AnimationRate = Number(Yanfly.Parameters['Animation Rate']);
Yanfly.Param.FlashTarget = String(Yanfly.Parameters['Flash Target']);
Yanfly.Param.ReposBattlers = String(Yanfly.Parameters['Reposition Battlers']);
Yanfly.Param.EnemyMaxHp = Number(Yanfly.Parameters['Enemy MaxHP']);
Yanfly.Param.EnemyMaxMp = Number(Yanfly.Parameters['Enemy MaxMP']);
Yanfly.Param.EnemyParam = Number(Yanfly.Parameters['Enemy Parameter']);
Yanfly.Param.ActorMaxHp = Number(Yanfly.Parameters['Actor MaxHP']);
Yanfly.Param.ActorMaxMp = Number(Yanfly.Parameters['Actor MaxMP']);
Yanfly.Param.ActorParam = Number(Yanfly.Parameters['Actor Parameter']);
Yanfly.Param.MaxGold = String(Yanfly.Parameters['Gold Max']);
Yanfly.Param.ChineseFont = String(Yanfly.Parameters['Chinese Font']);
Yanfly.Param.KoreanFont = String(Yanfly.Parameters['Korean Font']);
Yanfly.Param.DefaultFont = String(Yanfly.Parameters['Default Font']);
Yanfly.Param.FontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.TextAlign = String(Yanfly.Parameters['Text Align']);
Yanfly.Param.LineHeight = Number(Yanfly.Parameters['Line Height']);
Yanfly.Param.GaugeOutline = String(Yanfly.Parameters['Gauge Outline']);
Yanfly.Param.GaugeHeight = Number(Yanfly.Parameters['Gauge Height']);
Yanfly.Param.WindowPadding = Number(Yanfly.Parameters['Window Padding']);
Yanfly.Param.TextPadding = Number(Yanfly.Parameters['Text Padding']);
Yanfly.Param.WindowOpacity = Number(Yanfly.Parameters['Window Opacity']);
Yanfly.Param.MenuTpGauge = String(Yanfly.Parameters['Menu TP Bar']);
Yanfly.Param.ColorNormal = Number(Yanfly.Parameters['Color: Normal']);
Yanfly.Param.ColorSystem = Number(Yanfly.Parameters['Color: System']);
Yanfly.Param.ColorCrisis = Number(Yanfly.Parameters['Color: Crisis']);
Yanfly.Param.ColorDeath = Number(Yanfly.Parameters['Color: Death']);
Yanfly.Param.ColorGaugeBack = Number(Yanfly.Parameters['Color: Gauge Back']);
//Yanfly.Param.ColorHpGauge1 = Number(Yanfly.Parameters['Color: HP Gauge 1']);
//Yanfly.Param.ColorHpGauge2 = Number(Yanfly.Parameters['Color: HP Gauge 2']);
//Yanfly.Param.ColorMpGauge1 = Number(Yanfly.Parameters['Color: MP Gauge 1']);
//Yanfly.Param.ColorMpGauge2 = Number(Yanfly.Parameters['Color: MP Gauge 2']);

// TODO: Change Gauge color
Yanfly.Param.ColorHpGauge1 = 10;
Yanfly.Param.ColorHpGauge2 = 10;
Yanfly.Param.ColorMpGauge1 = 26;
Yanfly.Param.ColorMpGauge2 = 26;

Yanfly.Param.ColorMpCost = Number(Yanfly.Parameters['Color: MP Cost']);
Yanfly.Param.ColorPowerUp = Number(Yanfly.Parameters['Color: Power Up']);
Yanfly.Param.ColorPowerDown = Number(Yanfly.Parameters['Color: Power Down']);
Yanfly.Param.ColorTpGauge1 = Number(Yanfly.Parameters['Color: TP Gauge 1']);
Yanfly.Param.ColorTpGauge2 = Number(Yanfly.Parameters['Color: TP Gauge 2']);
Yanfly.Param.ColorTpCost = Number(Yanfly.Parameters['Color: TP Cost Color']);
Yanfly.Param.GoldFontSize = Number(Yanfly.Parameters['Gold Font Size']);
Yanfly.Icon.Gold = Number(Yanfly.Parameters['Gold Icon']);
Yanfly.Param.GoldOverlap = String(Yanfly.Parameters['Gold Overlap']);
Yanfly.Param.ItemQuantitySize = Number(Yanfly.Parameters['Quantity Text Size']);
Yanfly.Param.GameFontTimer = Number(Yanfly.Parameters['GameFont Load Timer']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Core.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Yanfly.Core.Bitmap_initialize.call(this, width, height);
  this.fontFace = Yanfly.Param.DefaultFont;
};

Yanfly.Core.Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Yanfly.Core.Bitmap_blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
};

Yanfly.Core.Bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function(x, y, w, h, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    Yanfly.Core.Bitmap_fillRect.call(this, x, y, w, h, c);
};

Yanfly.Core.Bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function(x, y, w, h, c1, c2, ve) {
    Yanfly.Core.Bitmap_gradientFillRect.call(this, x, y, w, h, c1, c2, ve);
};

Yanfly.Core.Bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function(x, y, r, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    Yanfly.Core.Bitmap_drawCircle.call(this, x, y, r, c);
};

Yanfly.Core.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, mW, l, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    mW = Math.floor(mW);
    l = Math.floor(l);
    Yanfly.Core.Bitmap_drawText.call(this, text, x, y, mW, l, align);
};

//=============================================================================
// ScreenSprite
//=============================================================================

Yanfly.Core.ScreenSprite_initialize = ScreenSprite.prototype.initialize;
ScreenSprite.prototype.initialize = function() {
    Yanfly.Core.ScreenSprite_initialize.call(this);
    this.scale.x = Graphics.boxWidth * 10;
    this.scale.y = Graphics.boxHeight * 10;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.x = 0;
    this.y = 0;
};

//=============================================================================
// Window
//=============================================================================

Yanfly.Core.Window_refreshAllParts = Window.prototype._refreshAllParts;
Window.prototype._refreshAllParts = function() {
    this._roundWhUp();
    Yanfly.Core.Window_refreshAllParts.call(this);
};

Window.prototype._roundWhUp = function() {
    this._width = Math.ceil(this._width);
    this._height = Math.ceil(this._height);
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Core.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Core.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_YEP_CoreEngine) {
      this.processCORENotetags1($dataItems);
      this.processCORENotetags1($dataWeapons);
      this.processCORENotetags1($dataArmors);
      this.processCORENotetags2($dataEnemies);
      this.processCORENotetags3($dataActors);
      this.processCORENotetags4($dataClasses);
      Yanfly._loaded_YEP_CoreEngine = true;
    }
    return true;
};

DataManager.processCORENotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxItem = Yanfly.Param.MaxItem;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRICE):[ ](\d+)>/i)) {
        obj.price = parseInt(RegExp.$1);
      } else if (line.match(/<(?:MAX ITEM):[ ](\d+)>/i)) {
        obj.maxItem = Math.max(1, parseInt(RegExp.$1));
      } else if (line.match(/<(.*):[ ]([\+\-]\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:GOLD):[ ](\d+)>/i)) {
        obj.gold = parseInt(RegExp.$1);
      } else if (line.match(/<(.*):[ ](\d+)>/i)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT':
          case 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
          case 'EXP':
          case 'XP':
            obj.exp = value;
            break;
        }
      }
    }
  }
};

DataManager.processCORENotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.maxLevel = Yanfly.Param.MaxLevel;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:MAX LEVEL):[ ](\d+)>/i)) {
        obj.maxLevel = parseInt(RegExp.$1);
        if (obj.maxLevel < 1) obj.maxLevel = 1;
      } else if (line.match(/<(?:INITIAL LEVEL):[ ](\d+)>/i)) {
        obj.initialLevel = parseInt(RegExp.$1);
        if (obj.initialLevel < 1) obj.initialLevel = 1;
      }
    }
  }
};

DataManager.processCORENotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.learnings.forEach(function(learning) {
      if (learning.note.match(/<(?:LEARN LEVEL|LEARN AT LEVEL):[ ](\d+)>/i)) {
        learning.level = parseInt(RegExp.$1);
        if (learning.level < 1) obj.maxLevel = 1;
      }
    }, this);
  }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager._screenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._screenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
SceneManager._boxWidth     = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._boxHeight    = Number(Yanfly.Parameters['Screen Height'] || 624);

Yanfly.Core.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Yanfly.Core.SceneManager_run.call(this, sceneClass);
    if (!Utils.isNwjs()) return;
    var resizeWidth = Graphics.boxWidth - window.innerWidth;
    var resizeHeight = Graphics.boxHeight - window.innerHeight;
    if (eval(Yanfly.Param.OpenConsole)) this.openConsole();
    if (!Imported.ScreenResolution) {
      window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
      window.resizeBy(resizeWidth, resizeHeight);
    }
};

SceneManager.openConsole = function() {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var _debugWindow = require('nw.gui').Window.get().showDevTools();
      _debugWindow.moveTo(0, 0);
      window.focus();
    }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Core.BattleManager_displayStartMessages =
    BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
  Yanfly.Core.BattleManager_displayStartMessages.call(this);
  $gameTroop.members().forEach(function(enemy) {
      enemy.recoverAll();
  });
};

BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if (success) {
        $gameParty.removeBattleStates();
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
    return success;
};

//=============================================================================
// Scene_Boot
//=============================================================================

Scene_Boot.prototype.isGameFontLoaded = function() {
  if (Graphics.isFontLoaded('GameFont')) {
    return true;
  } else if (Yanfly.Param.GameFontTimer <= 0) {
    return false;
  } else {
    var elapsed = Date.now() - this._startDate;
    if (elapsed >= Yanfly.Param.GameFontTimer) {
      throw new Error('Failed to load GameFont');
    } else {
      return false;
    }
  }
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Core.Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    Yanfly.Core.Scene_Title_start.call(this);
    if (eval(Yanfly.Param.ScaleTitle)) this.rescaleTitle();
};

Scene_Title.prototype.rescaleTitle = function() {
    this.rescaleTitleSprite(this._backSprite1);
    this.rescaleTitleSprite(this._backSprite2);
};

Scene_Title.prototype.rescaleTitleSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

//=============================================================================
// Scene_Gameover
//=============================================================================

Yanfly.Core.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    Yanfly.Core.Scene_Gameover_start.call(this);
    if (eval(Yanfly.Param.ScaleGameOver)) this.rescaleBackground();
};

Scene_Gameover.prototype.rescaleBackground = function() {
    this.rescaleImageSprite(this._backSprite);
};

Scene_Gameover.prototype.rescaleImageSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

Scene_Gameover.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Sprite_Animation.prototype.setupRate = function() {
  this._rate = Yanfly.Param.AnimationRate;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (!eval(Yanfly.Param.FlashTarget)) {

Yanfly.Core.Sprite_Battler_updateSelectionEffect =
    Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Yanfly.Core.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) this.startEffect('whiten');
    }
};

};

//=============================================================================
// Sprite_Actor
//=============================================================================

if (eval(Yanfly.Param.ReposBattlers)) {
  Yanfly.Core.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
      Yanfly.Core.Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
  };
};

Sprite_Actor.prototype.retreat = function() {
    this.startMove(1200, 0, 120);
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

if (eval(Yanfly.Param.ReposBattlers)) {
  Yanfly.Core.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
      Yanfly.Core.Sprite_Enemy_setBattler.call(this, battler);
      if (!this._enemy._alteredScreenY) {
        this._homeY += Graphics.boxHeight - 624;
        this._enemy._screenY = this._homeY;
        this._enemy._alteredScreenY = true;
      }
      if ($gameSystem.isSideView()) return;
      if (!this._enemy._alteredScreenX) {
        this._homeX += (Graphics.boxWidth - 816) / 2;
        this._enemy._screenX = this._homeX;
        this._enemy._alteredScreenX = true;
      }
  };
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Number(Yanfly.Parameters['Icon Width'] || 32);;
Sprite_StateIcon._iconHeight = Number(Yanfly.Parameters['Icon Height'] || 32);;

//=============================================================================
// Sprite_Button
//=============================================================================

Sprite_Button.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

if (eval(Yanfly.Param.ScaleBattleback)) {

Yanfly.Core.Spriteset_Battle_locateBattleback =
    Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
    var sprite1 = this._back1Sprite;
    var sprite2 = this._back2Sprite;
    if (sprite1.bitmap.width <= 0) return;
    if (sprite2.bitmap.width <= 0) return;
    if (this._rescaledBattlebackSprite) return;
    this._rescaledBattlebackSprite = true;
    Yanfly.Core.Spriteset_Battle_locateBattleback.call(this);
    this.rescaleBattlebacks();
};

Spriteset_Battle.prototype.rescaleBattlebacks = function() {
    this.rescaleBattlebackSprite(this._back1Sprite);
    this.rescaleBattlebackSprite(this._back2Sprite);
};

Spriteset_Battle.prototype.rescaleBattlebackSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) {
    sprite.scale.x = ratioX;
    sprite.anchor.x = 0.5;
    sprite.x = width / 2;
  }
  if (ratioY > 1.0) {
    sprite.scale.y = ratioY;
    sprite.origin.y = 0;
    sprite.y = 0;
  }
};

}; // Yanfly.Param.ScaleBattleback

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.paramMax = function(paramId) {
    if (paramId === 0) {
        return Yanfly.Param.EnemyMaxHp;
    } else if (paramId === 1) {
        return Yanfly.Param.EnemyMaxMp;
    } else {
        return Yanfly.Param.EnemyParam;
    }
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Core.Game_Actor_isMaxLevel = Game_Actor.prototype.isMaxLevel;
Game_Actor.prototype.isMaxLevel = function() {
    if (this.maxLevel() === 0) return false;
    return Yanfly.Core.Game_Actor_isMaxLevel.call(this);
};

Game_Actor.prototype.paramMax = function(paramId) {
  if (paramId === 0) {
      return Yanfly.Param.ActorMaxHp;
  } else if (paramId === 1) {
      return Yanfly.Param.ActorMaxMp;
  } else {
      return Yanfly.Param.ActorParam;
  }
};

Yanfly.Core.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    if (this.level > 99) {
      var i = this.currentClass().params[paramId][99];
      var j = this.currentClass().params[paramId][98];
      i += (i - j) * (this.level - 99);
      return i;
    }
    return Yanfly.Core.Game_Actor_paramBase.call(this, paramId);
};

Game_Actor.prototype.changeClass = function(classId, keepExp) {
    if (keepExp) {
        this._exp[classId] = this._exp[this._classId];
    }
    this._classId = classId;
    this.changeExp(this._exp[this._classId] || 0, false);
    this.refresh();
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.maxGold = function() {
    return eval(Yanfly.Param.MaxGold);
};

Game_Party.prototype.maxItems = function(item) {
    if (!item) return 1;
    return item.maxItem;
};

Game_Party.prototype.onPlayerWalk = function() {
    var group = this.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var actor = group[i];
      if (actor) actor.onPlayerWalk();
    }
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.displayX = function() {
    return parseFloat(Math.floor(this._displayX *
      this.tileWidth())) / this.tileWidth();
};

Game_Map.prototype.displayY = function() {
    return parseFloat(Math.floor(this._displayY *
      this.tileHeight())) / this.tileHeight();
};

Game_Map.prototype.adjustX = function(x) {
    if (this.isLoopHorizontal() && x < this.displayX() -
            (this.width() - this.screenTileX()) / 2) {
        return x - this.displayX() + $dataMap.width;
    } else {
        return x - this.displayX();
    }
};

Game_Map.prototype.adjustY = function(y) {
    if (this.isLoopVertical() && y < this.displayY() -
            (this.height() - this.screenTileY()) / 2) {
        return y - this.displayY() + $dataMap.height;
    } else {
        return y - this.displayY();
    }
};

Game_Map.prototype.updateEvents = function() {
    var group = this.events();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
    var group = this._commonEvents;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var ev = group[i];
      if (ev) ev.update();
    }
};

Game_Map.prototype.updateVehicles = function() {
    var group = this._vehicles;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var vehicle = group[i];
      if (vehicle) vehicle.update();
    }
};

//=============================================================================
// Game_Character
//=============================================================================

Game_Character.prototype.queueMoveRoute = function(moveRoute) {
    this._originalMoveRoute = moveRoute;
    this._originalMoveRouteIndex = 0;
};

Yanfly.Core.Game_Event_setMoveRoute =
    Game_Event.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
    if (!this._moveRouteForcing) {
        Yanfly.Core.Game_Event_setMoveRoute.call(this, moveRoute);
    } else {
        this.queueMoveRoute(moveRoute);
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isCollidedWithEvents = function(x, y) {
  var events = $gameMap.eventsXyNt(x, y).filter(function(ev) {
    return ev.isNormalPriority();
  });
  if (events.length <= 0) return false;
  return this.isNormalPriority();
};

//=============================================================================
// Game_Screen
//=============================================================================

Game_Screen.prototype.updatePictures = function() {
    var group = this._pictures;
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var picture = group[i];
      if (picture) picture.update();
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Core.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Core.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GainGold') {
        $gameParty.gainGold(parseInt(args[0]));
    }
    if (command === 'LoseGold') {
        $gameParty.loseGold(parseInt(args[0]));
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base._iconWidth   = Number(Yanfly.Parameters['Icon Width'] || 32);
Window_Base._iconHeight  = Number(Yanfly.Parameters['Icon Height'] || 32);
Window_Base._faceWidth   = Number(Yanfly.Parameters['Face Width'] || 144);
Window_Base._faceHeight  = Number(Yanfly.Parameters['Face Height'] || 144);

Window_Base.prototype.lineHeight = function() {
  return Yanfly.Param.LineHeight;
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
    return Yanfly.Param.ChineseFont;
    } else if ($gameSystem.isKorean()) {
    return Yanfly.Param.KoreanFont;
    } else {
    return Yanfly.Param.DefaultFont;
    }
};

Window_Base.prototype.standardFontSize = function() {
    return Yanfly.Param.FontSize;
};

Window_Base.prototype.standardPadding = function() {
    return Yanfly.Param.WindowPadding;
};

Window_Base.prototype.textPadding = function() {
    return Yanfly.Param.TextPadding;
};

Window_Base.prototype.standardBackOpacity = function() {
    return Yanfly.Param.WindowOpacity;
};

Window_Base.prototype.normalColor = function() {
  return this.textColor(Yanfly.Param.ColorNormal);
};
Window_Base.prototype.systemColor = function() {
    return this.textColor(Yanfly.Param.ColorSystem);
};

Window_Base.prototype.crisisColor = function() {
    return this.textColor(Yanfly.Param.ColorCrisis);
};

Window_Base.prototype.deathColor = function() {
    return this.textColor(Yanfly.Param.ColorDeath);
};

Window_Base.prototype.gaugeBackColor = function() {
    return this.textColor(Yanfly.Param.ColorGaugeBack);
};

Window_Base.prototype.hpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge1);
};

Window_Base.prototype.hpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorHpGauge2);
};

Window_Base.prototype.mpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge1);
};

Window_Base.prototype.mpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorMpGauge2);
};

Window_Base.prototype.mpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorMpCost);
};

Window_Base.prototype.powerUpColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerUp);
};

Window_Base.prototype.powerDownColor = function() {
    return this.textColor(Yanfly.Param.ColorPowerDown);
};

Window_Base.prototype.tpGaugeColor1 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge1);
};

Window_Base.prototype.tpGaugeColor2 = function() {
    return this.textColor(Yanfly.Param.ColorTpGauge2);
};

Window_Base.prototype.tpCostColor = function() {
    return this.textColor(Yanfly.Param.ColorTpCost);
};

Window_Base.prototype.drawGauge = function(dx, dy, dw, rate, color1, color2) {
  var color3 = this.gaugeBackColor();
  var fillW = Math.floor(dw * rate).clamp(0, dw);
  var gaugeH = this.gaugeHeight();
  var gaugeY = dy + this.lineHeight() - gaugeH - 2;
  if (eval(Yanfly.Param.GaugeOutline)) {
    color3.paintOpacity = this.translucentOpacity();
    this.contents.fillRect(dx, gaugeY - 1, dw, gaugeH, color3);
    fillW = Math.max(fillW - 2, 0);
    gaugeH -= 2;
    dx += 1;
  } else {
    var fillW = Math.floor(dw * rate);
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
  }
  this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

Window_Base.prototype.gaugeHeight = function() {
    return Yanfly.Param.GaugeHeight;
};

Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    var dw1 = this.textWidth(TextManager.levelA);
    this.drawText(TextManager.levelA, x, y, dw1);
    this.resetTextColor();
    var level = Yanfly.Util.toGroup(actor.level);
    var dw2 = this.textWidth(Yanfly.Util.toGroup(actor.maxLevel()));
    this.drawText(level, x + dw1, y, dw2, 'right');
};

Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x3, y, valueWidth,
          'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(Yanfly.Util.toGroup(max), x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth,
          'right');
    }
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(this.tpColor(actor));
    this.drawText(Yanfly.Util.toGroup(actor.tp), x + width - 64, y, 64,
      'right');
};

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
    var x2 = x + xpad;
    var width2 = Math.max(180, width - xpad - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorClass(actor, x2, y, width2);
    this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
    this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    if (eval(Yanfly.Param.MenuTpGauge)) {
      this.drawActorTp(actor, x2, y + lineHeight * 3, width2);
    }
};

// Draws just the Text - MiNT
//Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
//   // this.resetTextColor();
//   // this.contents.fontSize = Yanfly.Param.GoldFontSize;
//   // if (this.usingGoldIcon(unit)) {
//   //   var cx = Window_Base._iconWidth;
//   // } else {
//   //   var cx = this.textWidth(unit);
//   // }
//   // var text = Yanfly.Util.toGroup(value);
//   // if (this.textWidth(text) > ww - cx) {
//   //   text = Yanfly.Param.GoldOverlap;
//   // }
//   // this.drawText(text, wx, wy, ww - cx - 4, 'right');
//   // if (this.usingGoldIcon(unit)) {
//   //   this.drawIcon(Yanfly.Icon.Gold, wx + ww - Window_Base._iconWidth, wy + 2);
//   // } else {
//   //   this.changeTextColor(this.systemColor());
//   //   this.drawText(unit, wx, wy, ww, 'right');
//   // }
//   // this.resetFontSettings();
//};

Window_Base.prototype.usingGoldIcon = function(unit) {
    if (unit !== TextManager.currencyUnit) return false;
    return Yanfly.Icon.Gold > 0;
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + padding, y + padding);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.itemTextAlign = function() {
    return Yanfly.Param.TextAlign;
};

//=============================================================================
// Window_MenuStatus
//=============================================================================

//Sets custom gloabal variable for outfit
var CustomVariabeInitialization = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	CustomVariabeInitialization.call(this);
	this._ClaireOutfit = this._ClaireOutfit || 'Default';
}


//====================== CUSTOM CODE!!!! =====================================
Window_MenuStatus.prototype.drawItemImage = function(index) {
	this.padding = 5;
	this.contents.resize(this._width, this._height);
  var actor = $gameParty.members()[index];
  var name = actor._name;
  var rect = this.itemRect(index);
  this.changePaintOpacity(actor.isBattleMember());
  var fw = Window_Base._faceWidth;
	// Default
	var x = 1; // 1
	var y = 1; // 1
  //this.drawActorFace(actor, rect.x + x, rect.y + y, fw, rect.height - 2);
	var s = "Stat_Por_Nu";
	this.drawPNG(s, 0, 0, 260, 470, 10, -10);
  // Mood Portrait
  	if(name == 'Claire')
  	{

  			//Checks stats to set portrait
  		var atk = $gameActors.actor(1).atk;
  		var agi = $gameActors.actor(1).agi;
  		var def = $gameActors.actor(1).def;
  		var luk = $gameActors.actor(1).luk;
  		var mmp = $gameActors.actor(1).mmp;
  		var counter = 0;
  		var max = Math.max(atk, agi, def, luk);

  		if(atk == max)
  		{
  			counter++;
  			s = 'Defiance';
  		}
  		if(agi == max)
  		{
  			counter ++;
  			s = 'Intrigue';
  		}
  		if(def == max)
  		{
  			counter ++;
  			s = 'Depravity';
  		}
  		if(luk == max)
  		{
  			counter++;
  			s = 'Seduction';
  		}
  		if(counter > 1)
  			s = 'Neutral';

  		if(!StorageManager.checkFileExistence(s + '_' + $gameSystem._ClaireOutfit))
		{
			//if there is no file for such outfit then sets default outfit 
			console.log("!File " + s + '_' + $gameSystem._ClaireOutfit + ".png " + "not found!");
			$gameSystem._ClaireOutfit = 'Default';
		}
		s = s + '_' + $gameSystem._ClaireOutfit;
			
    	this.drawPortrait(s, 0, 0, 215, 420);

		

		s = "Stat_Name";
		this.drawPNG(s, 0, 0, 225, 75, 265, 0);
		//this.changePaintOpacity(true);
	}
	else
	{
		s = name;
		this.drawPortrait(s, 0, 0, 215, 420);
		s = "Stat_Name_" + name;
		this.drawPNG(s, 0, 0, 225, 75, 265, 0); 
	}
	if($gameSystem.currentBuff && $gameSystem.currentBuff.enabled)
	{
		s = "Stat_Por_Fx";
		//this.drawPNG(s, 0, 0, 260, 470, 10, -10);
		this.drawBlessing(s, 10, -9);
	}
	s = "Stat_Por_Fr";			
		//this.drawPNG(s, 0, 0, 260, 470, 10, -10);
	this.drawFrame(s, 10, -9);
		
};

Window_MenuStatus.prototype.drawBlessing = function(imageName, x, y)
{
	if(!this._bless)
	{
		var bitmap = ImageManager.loadBitmap("img/ui/", imageName, 0 ,0);
		this._bless = new FlashSprite(bitmap);
		this._bless.x = x;
		this._bless.y = y;
		this.addChild(this._bless);
	}
	this._bless.startFlashAnimation(35, 100, 120, 0);
}

Window_MenuStatus.prototype.drawFrame = function(imageName, x, y)
{
	
	var bitmap = ImageManager.loadBitmap("img/ui/", imageName, 0 ,0);	
	this._frame = new Sprite();	
	this._frame.x = x;
	this._frame.y = y;	
	this.addChild(this._frame);
	this._frame.bitmap = new Bitmap(bitmap.width, bitmap.height);
	//due to wierd bitmap behaviour we doing blt
	this._frame.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);		
	if($gameSystem.currentBuff && $gameSystem.currentBuff.enabled)
	{
		var color = 'rgb(255, 153, 0)';
		this._frame.bitmap.fontSize  = 18;
		this._frame.bitmap.textColor = color;
		this._frame.bitmap.drawText('Blessing: ' + ($gameSystem.currentBuff.buffStepLimit - $gameSystem.currentBuff.stepCounter) + ' Steps Left', 0 , 30, 260, 40, 'center');
	}
}

var WindowMenuStatus_Refresh = Window_MenuStatus.prototype.refresh;
Window_MenuStatus.prototype.refresh = function()
{
	if(this._frame)
	{
		//this._frame.bitmap._context.clearRect(0, 0, this._frame.bitmap.width, this._frame.bitmap);
		this._frame.bitmap.clear();
		this.removeChild(this._frame);
		delete this._frame;
	}
	if(this._bless && this._bless.bitmap)
	{
		//this._bless.bitmap.clear();
		this.removeChild(this._bless);
		delete this._bless;
	}
	WindowMenuStatus_Refresh.call(this);
}

class FlashSprite extends Sprite
{
	initialize(bitmap)
	{
		Sprite.prototype.initialize.call(this);
		this.createBitmap(bitmap);
		this.setDefault();
	};

	update()
	{
		Sprite.prototype.update.call(this);
		this.updateAnimation();
	};

	createBitmap(bitmap)
	{
		this.bitmap = bitmap;
	};

	stopAnimation()
	{
		this.opacity = 0;
		this.setDefault();
	};

	startFlashAnimation(min, max, time, smooth)
	{
		this._isActive = true;
		this._timer = Number(time);
		this._min = Number(min);
		this._max = Number(max);
		this._direction = 1;
		this._smooth = smooth;
		this.opacity = this.getValue(0, 255, min);
	};

	updateAnimation()
	{
		if(!this._isActive)
			return;
		if(this._direction == 1)
		{
			this._timeCounter++;
			if(this._timeCounter >= this._timer)
				this._direction = 0;
		}
		else
		{
			this._timeCounter--;
			if(this._timeCounter <= 0)
				this._direction = 1;
		}
		//console.log(this._smooth);
		var percents = this.smoothStop(this.getPercent(0, this._timer, this._timeCounter), this._smooth);
		//var percents = this.getPercent(0, this._timer, this._timeCounter);
		this.opacity = this.getValue(this.getValue(0, 255, this._min), this.getValue(0, 255, this._max), percents);

	};

	getPercent(min, max, value)
	{
		if(value < min)
			value = min;
		if(value > max)
			value = max;
		var percent = (max - min)/100;
		return Math.round(value / percent);
	};

	getValue(min, max, percents)
	{
		if(percents < 0)
			percents = 0;
		if(percents > 100)
			percents = 100;
		var percent = (max - min)/100;
		return Math.round(min + percents * percent);
	};

	setDefault()
	{
		this._timeCounter = 0;
		this._isActive = false;
		this._timer = 0;
		this._min = 0;
		this._max = 100;
		this._direction = 0;
		this._smooth = 2;
		this.opacity = 0;
	};

	smoothStop(t, n)
	{
		t = t/100;
		var x = 0;
		if(n <= 2)
			return x = (1 - (1 - t) * (1 - t)) * 100;
		x = 1 - t;
		for(var i = 1; i < n; i++)
		{
			x *= 1 - t;
		}
		return Math.round((1 - x) * 100);
	}
}

//Checks if Claire has drunk state
Window_MenuStatus.prototype.isDrunk = function(states)
{
	if(!states.length || states.length == 0)
		return false;

	for(var i = 0; i < states.length; i++)
	{
		if(states[i].id == 2)
			return true;
	}
	return false;
}

Window_MenuStatus.prototype.getStateOfChar = function(states)
{
	if(!states.length || states.length == 0)
		return -1;

	for(var i = 0; i < states.length; i++)
	{
		return states[i].id;
	}
	return -1;
}

// Сhecks if img file exists
StorageManager.checkFileExistence = function(fileName)
{
	try
	{
		var path = require('path');
		var base = path.dirname(process.mainModule.filename);
		var fs = require('fs');
		var filePath = path.join(base, 'img\\ui\\Portraits\\' + fileName + '.png')
		return fs.existsSync(filePath);
	}
	catch(e)
	{
		console.error(e);
		return false;
	}
}

Window_MenuStatus.prototype.drawItemStatus = function(index) {

    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
    var x = rect.x + xpad;

    if (!eval(Yanfly.Param.MenuTpGauge)) {
      var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    } else {
      var y = rect.y;
    }
    var width = rect.width - x - this.textPadding();
   // this.drawActorSimpleStatus(actor, x, y, width);

   //============ This method set in rpg_windows.js !!! ==============
   this.drawCustomStatus(actor, x - 40, 470, width);
};


//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.numberWidth = function() {
    return this.textWidth('\u00d70,000');
};

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (!this.needsNumber()) return;
    var numItems = Yanfly.Util.toGroup($gameParty.numItems(item));
    this.contents.fontSize = Yanfly.Param.ItemQuantitySize;
    this.drawText('\u00d7' + numItems, x, y, width, 'right');
    this.resetFontSettings();
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Window_SkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;

        if (!eval(Yanfly.Param.MenuTpGauge)) {
          var y = h / 2 - this.lineHeight() * 1.5;
        } else {
          var y = 0;
        }
        var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
    }
};

Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillTpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        var skillcost = Yanfly.Util.toGroup(this._actor.skillMpCost(skill));
        this.drawText(skillcost, x, y, width, 'right');
    }
};

//=============================================================================
// Window_EquipStatus
//=============================================================================

Window_EquipStatus.prototype.drawCurrentParam = function(x, y, paramId) {
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, 48, 'right');
};

Window_EquipStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, 48, 'right');
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b){return a-b});
        skillTypes.forEach(function(stypeId) {
            var name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, 'skill', true, stypeId);
        }, this);
    }
};

//=============================================================================
// Window_ActorCommand
//=============================================================================

Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b){return a-b});
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        this.addCommand(name, 'skill', true, stypeId);
    }, this);
};

//=============================================================================
// Window_Status
//=============================================================================

Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y2, 160);
      this.resetTextColor();
      var actorParam = Yanfly.Util.toGroup(this._actor.param(paramId));
      var dw = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i + 2)));
      this.drawText(actorParam, x + 160, y2, dw, 'right');
    }
};

Window_Status.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    } else {
      value1 = Yanfly.Util.toGroup(value1);
      value2 = Yanfly.Util.toGroup(value2);
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width);
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    var itemPrice = Yanfly.Util.toGroup(this.price(item));
    this.drawText(itemPrice, rect.x, rect.y, rect.width, 'right');
    this.changePaintOpacity(true);
    this.resetFontSettings();
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.drawNumber = function() {
    var x = this.cursorX();
    var y = this.itemY();
    var width = this.cursorWidth() - this.textPadding();
    this.resetTextColor();
    var itemNumber = Yanfly.Util.toGroup(this._number);
    this.drawText(itemNumber, x, y, width, 'right');
};

//=============================================================================
// Window_NameEdit
//=============================================================================

Window_NameEdit.prototype.faceWidth = function() {
    return Window_Base._faceWidth;
};

//=============================================================================
// Window_BattleStatus
//=============================================================================

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return this.width / 2 + this.standardPadding();
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    var minIconArea = Window_Base._iconWidth * 2;
    var nameLength = this.textWidth('0') * 16 + 6;
    var iconWidth = Math.max(rect.width - nameLength, minIconArea);
    var nameWidth = rect.width - iconWidth;
    this.drawActorName(actor, rect.x + 0, rect.y, nameWidth);
    this.drawActorIcons(actor, rect.x + nameWidth, rect.y, iconWidth);
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 30;
    var hpW = parseInt(totalArea * 108 / 300);
    var otW = parseInt(totalArea * 96 / 300);
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15, rect.y, otW);
    this.drawActorTp(actor, rect.x + hpW + otW + 30, rect.y, otW);
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    var totalArea = this.gaugeAreaWidth() - 15;
    var hpW = parseInt(totalArea * 201 / 315);
    var otW = parseInt(totalArea * 114 / 315);
    this.drawActorHp(actor, rect.x + 0, rect.y, hpW);
    this.drawActorMp(actor, rect.x + hpW + 15,  rect.y, otW);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
      if (animation.position === 3) {
        targets.forEach(function(target) {
            target.startAnimation(animationId, mirror, 0);
        });
      } else {
          var delay = this.animationBaseDelay();
          var nextDelay = this.animationNextDelay();
          targets.forEach(function(target) {
              target.startAnimation(animationId, mirror, delay);
              delay += nextDelay;
          });
      }
    }
};

//=============================================================================
// New Function
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.toGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  if (!eval(Yanfly.Param.DigitGroup)) return inVal;
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

//=============================================================================
// End of File
//=============================================================================
