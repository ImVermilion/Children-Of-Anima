/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/screenshots/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to take screenshots within the game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.4.4
 * ----------------------------------------------------------------------------
 * Description: Lets you take screenshots within the game. Screenshots can
 * capture the game screen and be saved directly to computer or prompted to
 * save at the user's choice location.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The Screenshots folder will automatically be created if it does not exist.
 * For web-hosted games, the game will prompt the user to download the
 * screenshot.
 * ----------------------Background Color Parameter----------------------------
 * By default, some things rendered by the engine are somewhat transparent.
 * Also by default, the HTML of the page has a background color of black. This
 * bg color is not captured by the screenshot as the screenshot captures only
 * what is rendered by the engine. You can add this bg color back in using the
 * background color parameter. If you're not sure, it is suggested to leave it
 * as "black". Set to blank if you want to preserve the transparency.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * - Removed Filesystem Functions (moved to CGMZ Core 1.7.0+)
 *
 * @command Take Screenshot
 * @desc Takes a screenshot of the current game screen
 *
 * @param Automatic Screenshot
 * @type boolean
 * @default true
 * @desc Automatically takes a screenshot of the screen when pressing Print Screen.
 *
 * @param Screenshot Folder
 * @default screenshots
 * @desc The folder (from game project folder root) to save screenshots. Will be created automatically
 *
 * @param Background Color
 * @default black
 * @desc Background color of the screenshot. See documentation.
*/
var Imported = Imported || {};
Imported.CGMZ_Screenshots = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Screenshots"] = "1.0.1";
CGMZ.Screenshots = CGMZ.Screenshots || {};
CGMZ.Screenshots.parameters = PluginManager.parameters('CGMZ_Screenshots');
CGMZ.Screenshots.AutomaticScreenshot = (CGMZ.Screenshots.parameters["Automatic Screenshot"] === 'true');
CGMZ.Screenshots.ScreenshotFolder = CGMZ.Screenshots.parameters["Screenshot Folder"];
CGMZ.Screenshots.BGColor = CGMZ.Screenshots.parameters["Background Color"];
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle plugin command for taking a screenshot and capturing of print screen
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Screenshots_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Screenshots_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Screenshots", "Take Screenshot", this.pluginCommandScreenshotsTakeScreenshot);
};
//-----------------------------------------------------------------------------
// Plugin command for taking screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandScreenshotsTakeScreenshot = function() {
	$cgmzTemp.takeScreenshot();
};
//-----------------------------------------------------------------------------
// 
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createScreenshotSprite = function() {
	const width = Graphics.width;
	const height = Graphics.height;
	const bitmap1 = new Bitmap(width, height);
	const bitmap2 = Bitmap.snap(SceneManager._scene);
	if(CGMZ.Screenshots.BGColor) bitmap1.fillAll(CGMZ.Screenshots.BGColor);
	bitmap1.blt(bitmap2, 0, 0, width, height, 0, 0, width, height);
	return new Sprite(bitmap1);
};
//-----------------------------------------------------------------------------
// Take a screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.takeScreenshot = function() {
	if(Utils.isNwjs()) {
		const data = Graphics.app.renderer.extract.canvas(this.createScreenshotSprite()).toDataURL('image/png');
		this.saveScreenshot(data);
	} else {
		Graphics.app.renderer.extract.canvas(this.createScreenshotSprite()).toBlob(this.promptScreenshotDownload(), 'image/png');
	}
};
//-----------------------------------------------------------------------------
// Save the screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.saveScreenshot = function(data) {
	data = data.replace(/^data:image\/png;base64,/, "");
	const date = new Date();
	const timestamp = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
	const folder = CGMZ.Screenshots.ScreenshotFolder + "/";
	const filename = "Screenshot_" + timestamp;
	const ext = ".png";
	this.saveToLocalFile(folder, filename, ext, data);
};
//-----------------------------------------------------------------------------
// Prompt user to download screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.promptScreenshotDownload = function() {
	return function(file){
		const a = document.createElement('a');
		document.body.append(a);
		const date = new Date();
		const timestamp = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
		a.download = "Screenshot_" + timestamp;
		a.href = URL.createObjectURL(file);
		a.click();
		a.remove();
	};
};
//-----------------------------------------------------------------------------
// Processing on key up
//-----------------------------------------------------------------------------
const alias_CGMZ_Screenshots_refreshForKeysUp = CGMZ_Temp.prototype.refreshForKeysUp;
CGMZ_Temp.prototype.refreshForKeysUp = function() {
	alias_CGMZ_Screenshots_refreshForKeysUp.call(this);
	if(CGMZ.Screenshots.AutomaticScreenshot && this._inputCurrentState.hasOwnProperty("PrintScreen")) {
		this.takeScreenshot();
		delete this._inputCurrentState["PrintScreen"];
	}
};