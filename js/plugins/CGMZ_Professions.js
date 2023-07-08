/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/professions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Creates a profession system for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Creates a profession system for your game. Discover
 * professions, gain experience, and level up. Profession data is easily
 * accessed and can be used for things like restricting the player from 
 * harvesting resources if their level is not high enough, or many other
 * uses.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Colors support either hex format (ex. #ffffff) or rgb format 
 * (ex. rgb(255, 255, 255))
 * -------------------------------JavaScript-----------------------------------
 * The JS to call the scene is: SceneManager.push(CGMZ_Scene_Professions);
 * -------------------------------Note Tags------------------------------------
 * • Temporary Buff Note Tag (Items):
 * <cgmzprofbuff:profName,buffAmount,frameCount,stackable>
 * - profName should be the profession's name (case sensitive)
 * - buffAmount should be a number that will be added to the profession's level
 * - frameCount should be a number which is how many frames the buff will last
 *   (60f = 1 sec)
 * - stackable should be either "true" or "false" and determines if the buff
 *   will stack with other buffs or not
 * 
 * An example notetag may be:
 * <cgmzprofbuff:Mining,5,3600,true>
 *
 * You can also combine multiple buffs using the & character.
 * An example combined notetag may look like this:
 * <cgmzprofbuff:Mining,5,3600,true&Fishing,5,3600,true>
 * This example would buff both Mining and Fishing by 5 for 3600 frames (1min)
 *
 * • Permanent buff (while equipped) note tag (Weapon, Armor):
 * <cgmzprofbuff:profName,buffAmount>
 * - profName should be the profession's name (case sensitive)
 * - buffAmount should be a number that will be added to the profession's level
 *
 * An example notetag may be:
 * <cgmzprofbuff:Mining,5>
 * This would provide a buff of 5 skill levels to Mining.
 *
 * You can also combine multiple buffs using the & character.
 * An example combined notetag may look like this:
 * <cgmzprofbuff:Mining,5&Fishing,5>
 * This example would buff both Mining and Fishing by 5 levels
 *
 * These buffs on Weapon & Armor are permanent while equipped, and stack.
 * ----------------------------Plugin Commands---------------------------------
 * • Call Scene
 * Calls the profession scene.
 *
 * • Reinitialize
 * This will reinitialize all profession data as if you had started a new game.
 * Use for saved game testing.
 *
 * • Discover Profession
 * This will discover (or undiscover) a given profession.
 *
 * • Change Description
 * Allows you to set a profession's description.
 *
 * • Change Exp
 * Allows you to set, add, or subtract experience from the provided profession.
 *
 * • Change Level
 * Allows you to set, add, or subtract levels from the provided profession.
 *
 * • Get Profession Level
 * Allows you to store the profession's level in a variable.
 * 
 * • Get Buffed Level
 * Allows you to store the profession's level + any buffs in a variable.
 *
 * • Add Buff
 * Use this to add a temporary buff to a profession's level.
 *
 * • Remove Buff
 * Usually buffs expire automatically, but if you need to manually remove one
 * you can use this plugin command.
 * ------------------------------Saved Games-----------------------------------
 * This plugin partially supports saved games.
 *
 * ✓ You can add the plugin and add professions which will show up
 * ✓ You can remove the plugin with no issue to saved data
 * ✘ You cannot modify existing professions in saved games
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Professions.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * - Added a plugin command to get the profession level
 *
 * Version 1.0.2:
 * - Added option to display a toast window on discovery of profession
 *
 * Version 1.1.0:
 * - Added temporary buffs (or debuffs) when using items or plugin command
 * - Added ability to use text codes in profession descriptions
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to change label text color
 * - Added option to use transparent windows
 * - Added option to use a custom scene background image
 * - Added plugin command to change description
 * - New professions are now loaded automatically in saved games without
 *   needing to use reinitialize plugin command
 *
 * Version 1.1.1:
 * - Change to profession buffs to make them more efficient for other plugins
 *
 * Version 1.1.2:
 * - Fix bug with level up toast having an extra ":" in the string
 *
 * Version 1.2.0:
 * - Added customization option for display window, now you can drag + drop a
 *   parameter to determine what displays and what order it displays in
 * - Added ability for worn equipment to provide a buff to profession levels
 * - Documentation update
 *
 * @command Reinitialize
 * @desc Reinitializes all profession data. Use this if your saved game does not recognize new profession data.
 *
 * @command Call Scene
 * @desc Calls the Profession scene
 *
 * @command discover
 * @text Discover Profession
 * @desc Discovers a profession (or undiscovers a profession)
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to discover
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Discovers the profession if true. Undiscovers the profession if false.
 * @default true
 *
 * @command changeExp
 * @text Change Experience
 * @desc Manipulate a profession's experience
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change exp for
 *
 * @arg mode
 * @type select
 * @text Mode
 * @option =
 * @option +
 * @option -
 * @desc Whether to set, add, or subtract exp
 * @default =
 *
 * @arg amount
 * @type number
 * @text Amount
 * @desc Amount of experience to set, add, or subtract
 * @default 0
 * @min 0
 *
 * @command changeLevel
 * @text Change Level
 * @desc Manipulate a profession's level
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change level for
 *
 * @arg mode
 * @type select
 * @text Mode
 * @option =
 * @option +
 * @option -
 * @desc Whether to set, add, or subtract levels
 * @default =
 *
 * @arg amount
 * @type number
 * @text Amount
 * @desc Amount of levels to set, add, or subtract
 * @default 1
 * @min 0
 *
 * @command getLevel
 * @text Get Profession Level
 * @desc Get the profession's level in a variable
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to set to the profession level
 *
 * @command Get Buffed Level
 * @desc Get the profession's level (including buffs) in a variable
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @default 0
 * @desc The variable to set to the profession level
 *
 * @command Add Buff
 * @desc Add a temporary buff to a profession
 *
 * @arg buffId
 * @text Buff ID
 * @desc Unique ID used to refer to this buff
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to buff
 *
 * @arg amount
 * @text Amount
 * @type number
 * @default 0
 * @desc The amount of levels to add to the profession's level
 *
 * @arg frameCount
 * @text Frame Count
 * @type number
 * @default 3600
 * @min 1
 * @desc The amount of frames the buff will last (60f = 1sec)
 *
 * @arg stackable
 * @text Can Stack?
 * @type boolean
 * @default true
 * @desc Allow this buff to stack with other buffs?
 *
 * @command Remove Buff
 * @desc Remove a temporary buff to a profession
 *
 * @arg buffId
 * @text Buff ID
 * @desc Unique ID used to refer to the buff
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to remove the buff from
 *
 * @command Change Description
 * @desc Change a profession's description
 *
 * @arg name
 * @text Profession Name
 * @desc The name of the profession to change description
 *
 * @arg description
 * @text Description
 * @type note
 * @default ""
 * @desc The new description
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc Set up different professions here
 *
 * @param Window Options
 *
 * @param Display Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @value Name
 * @option Image
 * @value Image
 * @option Level
 * @value Level
 * @option Exp
 * @value Exp
 * @option Exp To Level
 * @value Exp To Level
 * @option Description
 * @value Description
 * @option Blank Line
 * @value Blank Line
 * @desc Info to display and order to display it
 * @default ["Name","Image","Level","Exp","Exp To Level","Description"]
 *
 * @param Transparent Windows
 * @parent Window Options
 * @type boolean
 * @desc Whether the profession scene windows are transparent or not
 * @default false
 *
 * @param Background Image
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc Image to show in the background of the scene. Default blurry map used if none provided.
 *
 * @param Total Level Text
 * @parent Window Options
 * @desc Text to show describing the total level shown at bottom of scene
 * @default Total Level: 
 *
 * @param ScrollSpeed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Text Options
 *
 * @param Label Color
 * @parent Text Options
 * @type number
 * @min 0
 * @desc Color to draw label text in.
 * @default 16
 *
 * @param Description Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the description text.
 * @default left
 *
 * @param Level Text
 * @parent Text Options
 * @default Level: 
 * @desc Text to describe level
 *
 * @param Exp Text
 * @parent Text Options
 * @default Experience: 
 * @desc Text to describe current experience
 *
 * @param Exp To Level Text
 * @parent Text Options
 * @default Experience To Level: 
 * @desc Text to describe experience needed to level
 *
 * @param Description Text
 * @parent Text Options
 * @default Description: 
 * @desc Text to describe the profession description
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Level Up Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon level up (requires CGMZ Toast)
 *
 * @param Level Up Text
 * @parent Other CGMZ Plugin Options
 * @default has leveled up!
 * @desc Text to describe a level up in the toast window (requires CGMZ Toast)
 *
 * @param Show Discover Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window upon profession discover (requires CGMZ Toast)
 *
 * @param Discover Text
 * @parent Other CGMZ Plugin Options
 * @default Discovered Profession
 * @desc Text to describe a discovered profession in the toast window (requires CGMZ Toast)
*/
/*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession.
 * 
 * @param Discovered
 * @type boolean
 * @default true
 * @desc Determine whether the profession is discovered at the start of the game.
 * 
 * @param Level
 * @type number
 * @min 1
 * @default 1
 * @desc The level the profession begins at.
 *
 * @param Max level
 * @type number
 * @min 1
 * @default 99
 * @desc The maximum level the profession can be.
 *
 * @param Use Experience Curve?
 * @type boolean
 * @default true
 * @desc Determine whether to generate an experience curve or to use hard-coded values
 *
 * @param Experience Curve
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc Experience Curve to use. If using experience curve, generates exp curve using same formula for actor levels. Otherwise, each value is amount of exp needed for each level.
 *
 * @param Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the profession. Set to -1 to not use
 *
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc The image to use for the profession in place of the big icon (recommended size: 64x64). Leave blank to not use.
 *
 * @param Color
 * @type text
 * @default #ffffff
 * @desc rgb or hex values accepted. Hex format: #ffffff RGB format: rgb(255, 255, 255)
 *
 * @param Description
 * @type note
 * @default ""
 * @desc Profession description
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for the profession. Requires CGMZ Toast
 */
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/professions/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc 专业技能系统（设置可以升级的专业技能，可以关联合成插件，或作为变量使用。）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】 1.2.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * 【插件描述】
 * 1、建立一个专业技能和等级的系统。
 * 2、使玩家的队伍可以学习专业技能，获得经验和提升专业等级。
 * 3、当专业等级不够时，可以限制玩家获得某些资源，或其他用途。
 * 4、如果关联作者的【Crafting】合成插件，可以作为合成条件之一，
 *    以及通过合成获得经验和升级。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 * 一、呼出专业技能清单的脚本指令：SceneManager.push(CGMZ_Scene_Professions)
 *
 * 二、颜色设置：支持格式 #ffffff 或 rgb(255, 255, 255).
 * 
 * 三、制作一个能暂时提高专业技能等级的物品。在备注栏输入以下指令：
 * <cgmzprofbuff:专业名称,强化数值,持续时间,叠加>
 * 1、专业名称 - 文本。是你设置的专业的名称。区分大小写。
 * 2、强化数值 - 数值。设置你的专业技能可以暂时提高多少个等级。
 * 3、持续时间 - 数值。效果持续多久后消失。单位：帧，60帧=1秒。
 * 4、叠加 - 选择。是否与其他专业的提升效果同时存在。是True/否False。
 * 
 * 举例1：锻造专业提升5个等级，持续60秒，可以叠加。<cgmzprofbuff:锻造,5,3600,true>
 * 举例2：可以用&符号来同时添加多个强化效果，如：<cgmzprofbuff:锻造,5,3600,true&钓鱼,5,3600,true>
 * 
 * 四、插件指令
 * 本插件可以通过事件设置使用以下插件指令：
 * 呼出菜单：呼出专业技能清单的界面。
 * 重置：重置所有专业技能数据，恢复到新游戏开始的状态。（游戏测试用指令）
 * 获得专业：习得或失去专业技能。
 * 修改描述：更改某个专业技能的描述。
 * 修改经验：指定、增加或减少某个专业技能的经验值。
 * 修改等级：指定、增加或减少某个专业技能的等级。
 * 变量获取当前等级：将某个专业技能当前的等级赋值到一个变量中。
 * 变量获取增幅等级：将某个专业技能当前的等级加上效果增益的总值赋值到变量中。
 * 增加增幅效果：为某个专业增加一个临时的等级增幅效果。
 * 移除增幅效果：移除某个专业的临时等级增幅效果。
 *               使增幅效果不需等待到持续时间结束就可以移除
 *
 * 【版本历史】:
 * V 1.0.0 - Initial Release
 *
 * V 1.0.1:
 * - Added a plugin command to get the profession level
 *
 * Version 1.0.2:
 * - Added option to display a toast window on discovery of profession
 *
 * Version 1.1.0:
 * - Added temporary buffs (or debuffs) when using items or plugin command
 * - Added ability to use text codes in profession descriptions
 * - Added ability to use custom icon image in place of big icon in display
 *   window
 * - Added option to change label text color
 * - Added option to use transparent windows
 * - Added option to use a custom scene background image
 * - Added plugin command to change description
 * - New professions are now loaded automatically in saved games without
 *   needing to use reinitialize plugin command
 *
 * Version 1.1.1:
 * - Change to profession buffs to make them more efficient for other plugins
 *
 * Version 1.1.2:
 * - Fix bug with level up toast having an extra ":" in the string
 *
 * Version 1.2.0:
 * - Added customization option for display window, now you can drag + drop a
 *   parameter to determine what displays and what order it displays in
 * - Added ability for worn equipment to provide a buff to profession levels
 * - Documentation update
 *
 * @command Reinitialize
 * @text 重置
 * @desc 重新初始化所有职业数据。 如果您保存的游戏无法识别新的职业数据，请使用此选项。
 *
 * @command Call Scene
 * @text 呼出专业界面
 * @desc 呼出专业技能的菜单界面。
 *
 * @command discover
 * @text 获得专业技能
 * @desc 获得或失去一个专业技能
 *
 * @arg name
 * @text 专业技能
 * @desc 获得的专业技能的名称。
 *
 * @arg discover
 * @type boolean
 * @text 获得/失去
 * @desc True - 获得，False - 失去。
 * @default true
 *
 * @command changeExp
 * @text 修改经验值
 * @desc 修改专业技能的经验值。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改经验值的专业技能的名称。
 *
 * @arg mode
 * @type select
 * @text 修改方式
 * @option =
 * @option +
 * @option -
 * @desc = 指定经验值，+ 增加经验值，- 减少经验值。
 * @default =
 *
 * @arg amount
 * @type number
 * @text 经验数值
 * @desc 需要修改的经验值的数值。
 * @default 0
 * @min 0
 *
 * @command changeLevel
 * @text 修改等级
 * @desc 修改专业技能的等级。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改等级的专业技能名称。
 *
 * @arg mode
 * @type select
 * @text 修改方式
 * @option =
 * @option +
 * @option -
 * @desc = 指定等级，+ 增加等级，- 减少等级。
 * @default =
 *
 * @arg amount
 * @type number
 * @text 等级数值
 * @desc 需要修改的等级的数值。
 * @default 1
 * @min 0
 *
 * @command getLevel
 * @text 获取实际等级
 * @desc 获取某个专业技能的实际等级为变量。
 *
 * @arg name
 * @text 专业技能
 * @desc 专业技能的名称。
 *
 * @arg variable
 * @text 变量
 * @type variable
 * @default 0
 * @desc 指定一个变量ID来获取专业技能的实际等级。
 *
 * @command Get Buffed Level
 * @text 获取强化等级
 * @desc 获取某个专业技能经过强化提高后的等级为变量。
 *
 * @arg name
 * @text 专业技能
 * @desc 专业技能的名称。
 *
 * @arg variable
 * @text 变量
 * @type variable
 * @default 0
 * @desc 指定一个变量ID来获取专业技能经过强化后的等级。
 *
 * @command Add Buff
 * @text 强化效果
 * @desc 获得一个暂时提高专业技能等级的增益效果。
 *
 * @arg buffId
 * @text 强化效果ID
 * @desc 设置一个强化效果的ID。
 *
 * @arg name
 * @text 专业技能
 * @desc 强化效果所提升的专业技能的名称。
 *
 * @arg amount
 * @text 强化数值
 * @type number
 * @default 0
 * @desc 专业技能暂时提升等级的数值。
 *
 * @arg frameCount
 * @text 持续时间
 * @type number
 * @default 3600
 * @min 1
 * @desc 设置增益效果的持续时间。单位：帧，60帧=1秒。
 *
 * @arg stackable
 * @text 强化效果叠加
 * @type boolean
 * @default true
 * @desc 是否允许这个强化效果与其他增益效果叠加？
 *
 * @command Remove Buff
 * @text 移除强化效果
 * @desc 移除一个专业技能的强化效果。
 *
 * @arg buffId
 * @text 强化效果ID
 * @desc 需要移除的强化效果的ID。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要移除强化效果的专业技能的名称。
 *
 * @command Change Description
 * @text 修改描述
 * @desc 修改一个专业技能的描述。
 *
 * @arg name
 * @text 专业技能
 * @desc 需要修改描述的专业技能的名称。
 *
 * @arg description
 * @text 描述
 * @type note
 * @default ""
 * @desc 输入新的专业技能描述。
 *
 * @param Professions
 * @text 设置专业技能
 * @type struct<Profession>[]
 * @default []
 * @desc 在这里设置你想要的专业技能。
 *
 * @param Window Options
 * @text 窗口设置
 *
 * @param Display Info
 * @parent Window Options
 * @type select[]
 * @option Name
 * @value Name
 * @option Image
 * @value Image
 * @option Level
 * @value Level
 * @option Exp
 * @value Exp
 * @option Exp To Level
 * @value Exp To Level
 * @option Description
 * @value Description
 * @option Blank Line
 * @value Blank Line
 * @desc Info to display and order to display it
 * @default ["Name","Image","Level","Exp","Exp To Level","Description"]
 *
 * @param Transparent Windows
 * @text 透明窗口边框
 * @parent Window Options
 * @type boolean
 * @desc 是否将专业技能菜单界面的边框透明化。
 * @default false
 *
 * @param Background Image
 * @text 背景图片
 * @parent Window Options
 * @type file
 * @dir img/pictures
 * @desc 设置一张图片作为界面的背景图。不设置则模糊化处理。
 *
 * @param Total Level Text
 * @text 总等级的描述
 * @parent Window Options
 * @desc 关于在底部显示专业技能总等级的文本描述。
 * @default 全专业技能等级合计: 
 *
 * @param ScrollSpeed
 * @text 滚动速度
 * @parent Window Options
 * @type number
 * @min 0
 * @desc 显示窗口滚动的速度（如果需要）
 * @default 1
 *
 * @param ScrollWait
 * @text 滚动等待
 * @parent Window Options
 * @type number
 * @min 0
 * @desc 开始滚动前等待的时间。单位：帧，60帧=1秒。
 * @default 300
 *
 * @param Scroll Deceleration
 * @text 滚动描述
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @text 自动滚动
 * @parent Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Text Options
 * @text 文本设置
 *
 * @param Label Color
 * @text 专业标签颜色
 * @parent Text Options
 * @type number
 * @min 0
 * @desc 专业标签在菜单界面内的颜色。（如等级、经验、描述等标签）
 * @default 16
 *
 * @param Description Alignment
 * @text 备注位置
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc 设置备注文本靠左/居中/靠右。
 * @default left
 *
 * @param Level Text
 * @text 等级的标签
 * @parent Text Options
 * @default 专业等级： 
 * @desc 设置当前等级的描述文字标签。
 *
 * @param Exp Text
 * @text 经验的标签
 * @parent Text Options
 * @default 当前经验: 
 * @desc 设置当前经验值的描述文职标签。
 *
 * @param Exp To Level Text
 * @text 升级需要经验的标签
 * @parent Text Options
 * @default 升级所需经验: 
 * @desc 设置还需要多少经验才能升级的描述文字标签。
 *
 * @param Description Text
 * @text 专业描述的描述
 * @parent Text Options
 * @default 专业简介：
 * @desc 设置介绍专业技能的描述文字标签。
 *
 * @param Other CGMZ Plugin Options
 * @text 关联插件的描述
 *
 * @param Show Level Up Toast
 * @text 升级提示弹窗
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc 显示专业技能升级的弹窗。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Level Up Text
 * @text 升级提示的描述
 * @parent Other CGMZ Plugin Options
 * @default 专业技能升级了!
 * @desc 设置专业技能升级弹窗的文本描述。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Show Discover Toast
 * @text 获得专业弹窗
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default false
 * @desc 显示获得专业技能的弹窗。（需要使用CGMZ Toast Manager插件，否则会报错）
 *
 * @param Discover Text
 * @text 获得专业技能的描述
 * @parent Other CGMZ Plugin Options
 * @default 学会专业技能
 * @desc 设置获得专业技能弹窗的文本描述。（需要使用CGMZ Toast Manager插件，否则会报错）
*/
/*~struct~Profession:zh-CN
 * @param Name
 * @text 专业技能
 * @type text
 * @desc 设置专业技能的名称。
 * 
 * @param Discovered
 * @text 是否学会技能
 * @type boolean
 * @default true
 * @desc 设置在新游戏开始时是否默认已学会该专业技能。
 * 
 * @param Level
 * @text 初始等级
 * @type number
 * @min 1
 * @default 1
 * @desc 设置该专业技能时的初始等级。
 *
 * @param Max level
 * @text 最高等级
 * @type number
 * @min 1
 * @default 99
 * @desc 设置该专业技能可以到达的最高等级。
 *
 * @param Use Experience Curve?
 * @text 是否使用经验曲线
 * @type boolean
 * @default true
 * @desc Ture-使用与角色职业相同的等级经验曲线。False-使用自定义经验曲线。
 *
 * @param Experience Curve
 * @text 自定义经验曲线
 * @type number[]
 * @default ["30","20","30","30"]
 * @desc 自定义专业等级经验曲线。
 *
 * @param Icon
 * @text 小图标
 * @type number
 * @default 0
 * @min -1
 * @desc 指定IconSet的一个图标ID作为专业技能标签前的图标。-1为不使用图标。
 *
 * @param Picture
 * @text 大图标
 * @type file
 * @dir img/pictures
 * @desc 指定一张图片作为专业技能明细里的大图标 (建议尺寸: 64x64). 空白为使用放大的小图标。
 *
 * @param Color
 * @text 颜色
 * @type text
 * @default #ffffff
 * @desc 设置专业技能标签的颜色。颜色格式可以是#ffffff 或 rgb(255, 255, 255)
 *
 * @param Description
 * @text 描述内容
 * @type note
 * @default ""
 * @desc 设置一个专业技能简介的描述。
 *
 * @param Toast Sound Effect
 * @text 弹窗音效
 * @type file
 * @dir audio/se
 * @desc 指定一个音效作为弹窗提示的音效。（需要使用CGMZ Toast Manager插件）
*/
var Imported = Imported || {};
Imported.CGMZ_Professions = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Professions"] = "1.2.0";
CGMZ.Professions = CGMZ.Professions || {};
CGMZ.Professions.parameters = PluginManager.parameters('CGMZ_Professions');
CGMZ.Professions.Entries = JSON.parse(CGMZ.Professions.parameters["Professions"]);
CGMZ.Professions.SceneTitle = CGMZ.Professions.parameters["Scene Title"];
CGMZ.Professions.TotalLevelText = CGMZ.Professions.parameters["Total Level Text"];
CGMZ.Professions.ScrollSpeed = Number(CGMZ.Professions.parameters["ScrollSpeed"]);
CGMZ.Professions.ScrollWait = Number(CGMZ.Professions.parameters["ScrollWait"]);
CGMZ.Professions.ScrollDeceleration = parseFloat(CGMZ.Professions.parameters["Scroll Deceleration"]);
CGMZ.Professions.AutoScroll = (CGMZ.Professions.parameters["Auto Scroll"] === "true");
CGMZ.Professions.LevelText = CGMZ.Professions.parameters["Level Text"];
CGMZ.Professions.ExpText = CGMZ.Professions.parameters["Exp Text"];
CGMZ.Professions.ExpToLevelText = CGMZ.Professions.parameters["Exp To Level Text"];
CGMZ.Professions.DescriptionText = CGMZ.Professions.parameters["Description Text"];
CGMZ.Professions.ShowLevelUpToast = (CGMZ.Professions.parameters["Show Level Up Toast"] === "true");
CGMZ.Professions.LevelUpText = CGMZ.Professions.parameters["Level Up Text"];
CGMZ.Professions.ShowDiscoverToast = (CGMZ.Professions.parameters["Show Discover Toast"] === "true");
CGMZ.Professions.DiscoverText = CGMZ.Professions.parameters["Discover Text"];
CGMZ.Professions.LabelColor = Number(CGMZ.Professions.parameters["Label Color"]);
CGMZ.Professions.DescriptionAlignment = CGMZ.Professions.parameters["Description Alignment"];
CGMZ.Professions.WindowTransparency = (CGMZ.Professions.parameters["Transparent Windows"] === "true");
CGMZ.Professions.SceneBackgroundImage = CGMZ.Professions.parameters["Background Image"];
CGMZ.Professions.DisplayInfo = JSON.parse(CGMZ.Professions.parameters["Display Info"]);
//=============================================================================
// CGMZ_Profession
//-----------------------------------------------------------------------------
// Store and manage profession data
//=============================================================================
function CGMZ_Profession() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Profession
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.initialize = function(profession) {
	this._name = profession.Name;
	this._discovered = (profession.Discovered === 'true');
	this._maxLevel = Number(profession["Max level"]);
	this._level = Number(profession.Level);
	this._usingExpCurve = (profession["Use Experience Curve?"] === 'true');
	this._iconIndex = Number(profession.Icon);
	this._image = profession.Picture;
	this._description = JSON.parse(profession.Description);
	this._color = profession.Color;
	this._expArray = JSON.parse(profession["Experience Curve"]);
	for(let i = 0; i < this._expArray.length; i++) {
		this._expArray[i] = Number(this._expArray[i]);
	}
	this._exp = 0;
	this._toastSE = profession["Toast Sound Effect"];
	this._buffs = {};
	this._needRefreshForBuff = false;
};
//-----------------------------------------------------------------------------
// Get experience required for level
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expForLevel = function(level) {
	if(level <= 1) return 0;
	if(level > this._maxLevel) return this.expForLevel(this._maxLevel);
	if(!this._usingExpCurve) return this._expArray[level - 2]; // level - 2 since 0 not level and 1 lowest level possible
	const basis = this._expArray[0];
    const extra = this._expArray[1];
    const acc_a = this._expArray[2];
    const acc_b = this._expArray[3];
	if(acc_b === 0) acc_b = 1;
    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
};
//-----------------------------------------------------------------------------
// Get experience required for level taking into account current exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expNeeded = function(level) {
	return this.expForLevel(level) - this._exp;
};
//-----------------------------------------------------------------------------
// Get experience required for next level taking into account current exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.expNeededToNextLevel = function() {
	if(this._level >= this._maxLevel) return 0;
	return this.expForLevel(this._level + 1) - this._exp;
};
//-----------------------------------------------------------------------------
// Set new description
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setDescription = function(description) {
	this._description = JSON.parse(description);
};
//-----------------------------------------------------------------------------
// Changed discovery status
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
	if(discovered && CGMZ.Professions.ShowDiscoverToast) {
		this.setupDiscoverToast();
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose experience
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeExp = function(mode, amount) {
	switch(mode) {
		case '=': this._exp = amount; break;
		case '+': this._exp += amount; break;
		case '-': this._exp -= amount; break;
		default:
			const script = "CGMZ Professions";
			const error = "Malformed 'Experience' command received";
			const suggestion = "Check for proper plugin command usage in events";
			$cgmzTemp.reportError(error, script, suggestion);
	}
	if(this._exp < 0) this._exp = 0;
	this.checkProfessionForLevel();
};
//-----------------------------------------------------------------------------
// Check profession for level up/down. Always call this to level up/down.
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.checkProfessionForLevel = function() {
	while(this._level < this._maxLevel && this._exp >= this.expForLevel(this._level+1)) {
		this.levelUp();
	}
	while(this._level > 1 && this._exp < this.expForLevel(this._level)) {
		this.levelDown();
	}
};
//-----------------------------------------------------------------------------
// Level Up
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.levelUp = function() {
	this._level++;
	if(CGMZ.Professions.ShowLevelUpToast && Imported.CGMZ_ToastManager) {
		this.setupLevelUpToast();
	}
	if(Imported.CGMZ_Achievements && CGMZ.Versions["Achievements"] !== 1.0) {
		$cgmz.checkAchievementProfessionCriteria();
	}
};
//-----------------------------------------------------------------------------
// Level Down
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.levelDown = function() {
	this._level--;
};
//-----------------------------------------------------------------------------
// Change Level
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.changeLevel = function(mode, amount) {
	let levelExp = this._exp;
	switch(mode) {
		case '=': 
			if(amount > this._maxLevel) amount = this._maxLevel;
			if(amount < 1) amount = 1;
			levelExp = this.expForLevel(amount);
			break;
		case '+':
			var totalLevel = this._level + amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			levelExp = this.expForLevel(totalLevel);
			break;
		case '-':
			var totalLevel = this._level - amount;
			if(totalLevel > this._maxLevel) totalLevel = this._maxLevel;
			if(totalLevel < 1) totalLevel = 1;
			levelExp = this.expForLevel(totalLevel);
			break;
		default:
			const script = "CGMZ Professions";
			const error = "Malformed 'Level' command received";
			const suggestion = "Check for proper plugin command usage in events";
			$cgmzTemp.reportError(error, script, suggestion);
	}
	const neededExp = levelExp - this._exp;
	this.gainExp(neededExp);
};
//-----------------------------------------------------------------------------
// Gain Exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.gainExp = function(amount) {
	this.changeExp('+', amount);
};
//-----------------------------------------------------------------------------
// Lose Exp
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.loseExp = function(amount) {
	this.changeExp('-', amount);
};
//-----------------------------------------------------------------------------
// Add a buff to the profession (or overwrite existing buff)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.addBuff = function(buffId, amount, frameCount, stackable = false) {
	const buff = {amount: amount, stackable: stackable, frameCount: Graphics.frameCount + frameCount};
	this._buffs[buffId] = buff;
	const funcArgs = {profName: this._name, buffId: buffId};
	const timer = new CGMZ_Timer(frameCount, buffId, "removeProfessionBuff", funcArgs);
	$cgmz.requestNewTimer(timer);
};
//-----------------------------------------------------------------------------
// Remove a buff from the profession, set flag for refresh as needed
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.removeBuff = function(buffId) {
	delete this._buffs[buffId];
	this._needRefreshForBuff = true;
	$cgmzTemp._professionBuffRemoved = true;
};
//-----------------------------------------------------------------------------
// Determine if the profession has active buffs
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.hasBuffs = function() {
	return Object.keys(this._buffs).length > 0;
};
//-----------------------------------------------------------------------------
// Get the total level of the profession including buffs
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getBuffedLevel = function() {
	const baseLevel = this._level;
	const unstackableLevels = this.getUnstackableBuffLevels();
	const stackableLevels = this.getStackableBuffLevels();
	const equipmentLevels = this.getEquipmentBuffLevels();
	return baseLevel + unstackableLevels + stackableLevels + equipmentLevels;
};
//-----------------------------------------------------------------------------
// Returns the highest unstackable buff level (if any)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getUnstackableBuffLevels = function() {
	let buffLevel = 0;
	for(const buff in this._buffs) {
		if(!this._buffs[buff].stackable && this._buffs[buff].amount > buffLevel) {
			buffLevel = this._buffs[buff].amount;
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Returns the highest unstackable buff level (if any)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getStackableBuffLevels = function() {
	let buffLevel = 0;
	for(const buff in this._buffs) {
		if(this._buffs[buff].stackable) {
			buffLevel += this._buffs[buff].amount;
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Returns the total amount of buff levels from any party actor's equipment
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.getEquipmentBuffLevels = function() {
	let buffLevel = 0;
	for(const actor of $gameParty.allMembers()) {
		for(const equip of actor.equips()) {
			if(equip && equip.meta && equip.meta.cgmzprofbuff) {
				const buffs = equip.meta.cgmzprofbuff.split("&");
				for(const buffMeta of buffs) {
					const buff = buffMeta.split(","); // [Name, amount]
					if(buff[0] === this._name) {
						buffLevel += Number(buff[1]);
					}
				}
			}
		}
	}
	return buffLevel;
};
//-----------------------------------------------------------------------------
// Set up level up toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupLevelUpToast = function() {
	let toast = {};
	toast.CGMZProfessionToast = true;
	toast.color = this._color;
	toast.name = this._name;
	toast.level = this._level;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Set up discover toast (Requires CGMZ Toast)
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.setupDiscoverToast = function() {
	let toast = {};
	toast.CGMZProfessionToastDiscover = true;
	toast.color = this._color;
	toast.name = this._name;
	if(this._toastSE !== "") toast.SE = {name: this._toastSE, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Processing after game load, add buff object if not exists
//-----------------------------------------------------------------------------
CGMZ_Profession.prototype.onAfterLoad = function() {
	if(!this._buffs) this._buffs = {};
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage profession data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize profession data
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Professions_createPluginData.call(this);
	this.initializeProfessionData(false);
};
//-----------------------------------------------------------------------------
// Initialize profession data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeProfessionData = function(reinitialize) {
	if(!this._professions || reinitialize) {
		this.setupProfessionVariables();
	}
	for(let i = 0; i < CGMZ.Professions.Entries.length; i++) {
		const prof = new CGMZ_Profession(JSON.parse(CGMZ.Professions.Entries[i]));
		if(!this.getProfession(prof._name)) this._professions.push(prof);
	}
};
//-----------------------------------------------------------------------------
// Initialize profession variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupProfessionVariables = function() {
	this._professions = [];
};
//-----------------------------------------------------------------------------
// Alias. Check for new professions after loading saved game
// Also perform recipe maintenance after load
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Professions_onAfterLoad.call(this);
	this.initializeProfessionData(false);
	for(const profession of this._professions) {
		profession.onAfterLoad();
	}
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllProfessions = function() {
	return this._professions;
};
//-----------------------------------------------------------------------------
// Returns array of all professions
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredProfessions = function() {
	let discoveredProfs = [];
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) discoveredProfs.push(this._professions[i]);
	}
	return discoveredProfs;
};
//-----------------------------------------------------------------------------
// Get profession by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getProfession = function(name) {
	for(let i = 0; i < this._professions.length; i++) {
		if(name == this._professions[i]._name) return this._professions[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverProfession = function(name, discovered) {
	let profession = this.getProfession(name);
	if(profession) {
		(discovered === "false") ? discovered = false : discovered = true;
		profession.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose exp for profession
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionExp = function(name, mode, amount) {
	let profession = this.getProfession(name);
	if(profession) {
		profession.changeExp(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Change profession level
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeProfessionLevel = function(name, mode, amount) {
	let profession = this.getProfession(name);
	if(profession) {
		profession.changeLevel(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevels = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarned = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		total += this._professions[i]._level;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels available (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.totalProfessionLevelsDiscovered = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._maxLevel;
	}
	return total;
};
//-----------------------------------------------------------------------------
// Calculate total profession levels earned (if discovered profession)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.professionLevelsEarnedDiscovered = function() {
	let total = 0;
	for(let i = 0; i < this._professions.length; i++) {
		if(this._professions[i]._discovered) total += this._professions[i]._level;
	}
	return total;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// To be overridden by CGMZ plugins
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Professions_CGMZ_Temp_createPluginData.call(this);
	this._professionBuffRemoved = false;
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Professions_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Professions", "Call Scene", this.pluginCommandProfessionsCallScene);
	PluginManager.registerCommand("CGMZ_Professions", "Reinitialize", this.pluginCommandProfessionsReinitialize);
	PluginManager.registerCommand("CGMZ_Professions", "discover", this.pluginCommandProfessionsDiscover);
	PluginManager.registerCommand("CGMZ_Professions", "changeExp", this.pluginCommandProfessionsChangeExp);
	PluginManager.registerCommand("CGMZ_Professions", "changeLevel", this.pluginCommandProfessionsChangeLevel);
	PluginManager.registerCommand("CGMZ_Professions", "getLevel", this.pluginCommandProfessionsGetLevel);
	PluginManager.registerCommand("CGMZ_Professions", "Get Buffed Level", this.pluginCommandProfessionsGetBuffedLevel);
	PluginManager.registerCommand("CGMZ_Professions", "Add Buff", this.pluginCommandProfessionsAddBuff);
	PluginManager.registerCommand("CGMZ_Professions", "Remove Buff", this.pluginCommandProfessionsRemoveBuff);
	PluginManager.registerCommand("CGMZ_Professions", "Change Description", this.pluginCommandProfessionsChangeDescription);
};
//-----------------------------------------------------------------------------
// Call profession scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsCallScene = function() {
	SceneManager.push(CGMZ_Scene_Professions);
};
//-----------------------------------------------------------------------------
// Reinitialize the profession data (for saved games)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsReinitialize = function() {
	$cgmz.initializeProfessionData(true);
};
//-----------------------------------------------------------------------------
// Set the discover status of a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsDiscover = function(args) {
	$cgmz.discoverProfession(args.name, args.discover);
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's exp
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeExp = function(args) {
	$cgmz.changeProfessionExp(args.name, args.mode, Number(args.amount));
};
//-----------------------------------------------------------------------------
// Plugin command to change the profession's level
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeLevel = function(args) {
	$cgmz.changeProfessionLevel(args.name, args.mode, Number(args.amount));
};
//-----------------------------------------------------------------------------
// Plugin command to get the profession's unbuffed level into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsGetLevel = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		$gameVariables.setValue(Number(args.variable), profession._level);
	}
};
//-----------------------------------------------------------------------------
// Plugin command to get the profession's level + buff level into a variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsGetBuffedLevel = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		$gameVariables.setValue(Number(args.variable), profession.getBuffedLevel());
	}
};
//-----------------------------------------------------------------------------
// Plugin command to add a buff to a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsAddBuff = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		profession.addBuff(args.buffId, Number(args.amount), Number(args.frameCount), args.stackable === "true");
	}
};
//-----------------------------------------------------------------------------
// Plugin command to remove a buff from a profession
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsRemoveBuff = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		profession.removeBuff(args.buffId);
	}
};
//-----------------------------------------------------------------------------
// Plugin command to change profession description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandProfessionsChangeDescription = function(args) {
	const profession = $cgmz.getProfession(args.name);
	if(profession) {
		profession.setDescription(args.description);
	}
};
//-----------------------------------------------------------------------------
// Alias. Create mapped functions
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_createMappedFunctions = CGMZ_Temp.prototype.createMappedFunctions;
CGMZ_Temp.prototype.createMappedFunctions = function() {
	alias_CGMZ_Professions_createMappedFunctions.call(this);
	this._mappedFunctions["removeProfessionBuff"] = this.removeProfessionBuff.bind(this);
};
//-----------------------------------------------------------------------------
// Remove a profession's buff
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.removeProfessionBuff = function(args) {
	const profession = $cgmz.getProfession(args.profName);
	if(profession) {
		profession.removeBuff(args.buffId);
	}
};
//-----------------------------------------------------------------------------
// When an item is used, check if it should apply a temporary buff
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.checkItemForProfessionBuff = function(item) {
	if(item && item.meta && item.meta.cgmzprofbuff) {
		const buffs = item.meta.cgmzprofbuff.split("&");
		for(const buff of buffs) {
			const data = buff.split(","); // [Name, amount, frames, stackable]
			const profession = $cgmz.getProfession(data[0]);
			if(profession) {
				profession.addBuff(item.name + "-" + data[0], Number(data[1]), Number(data[2]), data[3] === "true");
			}
		}
	}
};
//=============================================================================
// CGMZ_Scene_Professions
//-----------------------------------------------------------------------------
// Handle the professions scene
//=============================================================================
function CGMZ_Scene_Professions() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Professions.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Professions.prototype.constructor = CGMZ_Scene_Professions;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create profession windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createTotalWindow();
	this.createListWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create total window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createTotalWindow = function() {
	const rect = this.totalWindowRect();
    this._totalWindow = new CGMZ_Window_ProfessionTotal(rect);
	this._totalWindow.refresh();
    this.addWindow(this._totalWindow);
};
//-----------------------------------------------------------------------------
// Get total window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.totalWindowRect = function() {
	const x = 0;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, false);
	const y = Graphics.boxHeight - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_ProfessionList(rect);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.refresh();
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.listWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const width = Graphics.boxWidth / 3;
	const height = Graphics.boxHeight - y - this._totalWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect()
    this._displayWindow = new CGMZ_Window_ProfessionDisplay(rect);
	this._displayWindow.refresh();
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth * 2 / 3;
	const height = this._listWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.onDisplayCancel = function() {
	this._displayWindow.deactivate();
	this._listWindow.activate();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_Professions.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.Professions.SceneBackgroundImage) {
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadPicture(CGMZ.Professions.SceneBackgroundImage);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_ProfessionTotal
//-----------------------------------------------------------------------------
// Shows total level for all professions
//=============================================================================
function CGMZ_Window_ProfessionTotal(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionTotal.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_ProfessionTotal.prototype.constructor = CGMZ_Window_ProfessionTotal;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.refresh = function() {
	this.contents.clear();
	this.drawTotalLevel();
};
//-----------------------------------------------------------------------------
// Draw total level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionTotal.prototype.drawTotalLevel = function() {
	let totalLevels = $cgmz.totalProfessionLevelsDiscovered();
	let earnedLevels = $cgmz.professionLevelsEarnedDiscovered();
	let descriptor = CGMZ.Professions.TotalLevelText;
	this.changeTextColor(ColorManager.textColor(CGMZ.Professions.LabelColor));
	this.drawText(descriptor, 0, 0, this.contents.width, 'left');
	let x = this.textWidth(descriptor);
	descriptor = earnedLevels + " / " + totalLevels;
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor, x, 0, this.contents.width-x, 'left');
};
//=============================================================================
// CGMZ_Window_ProfessionList
//-----------------------------------------------------------------------------
// Selectable window for choosing a profession in a list.
//=============================================================================
function CGMZ_Window_ProfessionList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_ProfessionList.prototype.constructor = CGMZ_Window_ProfessionList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this.select(0);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.makeItemList = function() {
    this._data = $cgmz.getAllDiscoveredProfessions();
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.changeTextColor(item._color);
	let iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
    this.drawText(item._name, rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_ProfessionDisplay
//-----------------------------------------------------------------------------
// Window displaying profession information
//=============================================================================
function CGMZ_Window_ProfessionDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ProfessionDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_ProfessionDisplay.prototype.constructor = CGMZ_Window_ProfessionDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Professions.ScrollWait, CGMZ.Professions.ScrollSpeed, CGMZ.Professions.AutoScroll, CGMZ.Professions.ScrollDeceleration);
	this.setBackgroundType(2 * (CGMZ.Professions.WindowTransparency));
	this._profession = null;
	this._imageOffsetInfo = {x:0, y:0, width:0, height:0};
	this._largeIconWidth = ImageManager.iconWidth*2.2;
	this._largeIconHeight = ImageManager.iconHeight*2.2;
	this._iconBitmap = ImageManager.loadSystem("IconSet");
	this._iconSprite = new Sprite();
	this.addInnerChild(this._iconSprite);
};
//-----------------------------------------------------------------------------
// Update. Check if a buff falls off and refresh accordingly
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.update = function() {
	CGMZ_Window_Scrollable.prototype.update.call(this);
	if(this._profession && this._profession._needRefreshForBuff) {
		this.refresh();
		this._profession._needRefreshForBuff = false;
	}
};
//-----------------------------------------------------------------------------
// Set the profession to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.setItem = function(profession) {
	this._profession = profession;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.refresh = function() {
	if(!this._profession) return;
	this.setupWindowForNewEntry();
	this._imageOffsetInfo = {x:0, y:0, width:0, height:0};
	this._iconSprite.hide();
	if(this._profession._image) {
		this.loadProfessionImage();
	} else {
		this.drawProfessionInfo();
	}
};
//-----------------------------------------------------------------------------
// Draw Profession Info - performed after all images are loaded
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionInfo = function() {
	for(const infoType of CGMZ.Professions.DisplayInfo) {
		switch(infoType) {
			case "Name":
				this.drawProfessionName();
				this._neededHeight += this.lineHeight();
				break;
			case "Image":
				if(this._profession._image) {
					this.displayProfessionImage();
				} else {
					this.drawLargeIcon();
				}
				break;
			case "Level":
				this.drawProfessionLevel();
				this._neededHeight += this.lineHeight();
				break;
			case "Exp":
				this.drawProfessionExperience();
				this._neededHeight += this.lineHeight();
				break;
			case "Exp To Level":
				this.drawProfessionExperienceToLevel();
				this._neededHeight += this.lineHeight();
				break;
			case "Description":
				this._neededHeight += this.drawProfessionDescription();
				break;
			case "Blank Line": this._neededHeight += this.lineHeight();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Name of profession
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionName = function() {
	this.contents.fontBold = true;
	this.drawText(this._profession._name, 0, this._neededHeight, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Load profession custom image
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.loadProfessionImage = function() {
	this._iconSprite.bitmap = ImageManager.loadPicture(this._profession._image);
	this._iconSprite.bitmap.addLoadListener(this.drawProfessionInfo.bind(this));
};
//-----------------------------------------------------------------------------
// Display profession custom image after load
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.displayProfessionImage = function() {
	this._iconSprite.y = this._neededHeight + 4;
	this._iconSprite.x = 0;
	this._imageOffsetInfo.y = this._iconSprite.y;
	this._imageOffsetInfo.width = this._iconSprite.width + 4;
	this._imageOffsetInfo.height = this._iconSprite.height;
	this._iconSprite.show();
};
//-----------------------------------------------------------------------------
// Draw profession level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionLevel = function() {
	const profession = this._profession;
	const buffLevel = (profession.getBuffedLevel() - profession._level);
	const buffLevelString = (buffLevel > 0) ? " + " + buffLevel : "";
	const descriptor1 = CGMZ.Professions.LevelText;
	const descriptor2 = profession._level + buffLevelString + " / " + profession._maxLevel;
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperience = function() {
	const profession = this._profession;
	const exp = profession._exp;
	const descriptor1 = CGMZ.Professions.ExpText;
	const descriptor2 = $cgmzTemp.numberSplit(exp);
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession experience to next level
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionExperienceToLevel = function() {
	const profession = this._profession;
	const descriptor1 = CGMZ.Professions.ExpToLevelText;
	const descriptor2 = $cgmzTemp.numberSplit(profession.expNeededToNextLevel());
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(descriptor1, descriptor2, x, this.contents.width-x);
};
//-----------------------------------------------------------------------------
// Draw profession description - returns height of drawn text
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionDescription = function() {
	const width = this.contents.width;
	const x = this._imageOffsetInfo.width * this.needsOffset();
	this.drawProfessionStandardLine(CGMZ.Professions.DescriptionText, "", x, width);
	const firstLineXOffset = this.textWidth(CGMZ.Professions.DescriptionText);
	const returnY = this.CGMZ_drawText(this._profession._description, x, firstLineXOffset, this._neededHeight, width, CGMZ.Professions.DescriptionAlignment);
	return returnY;
};
//-----------------------------------------------------------------------------
// Draws a standard line (blue system text: white text)
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawProfessionStandardLine = function(descriptor1, descriptor2, x, width) {
	this.changeTextColor(ColorManager.textColor(CGMZ.Professions.LabelColor));
	this.drawText(descriptor1, x, this._neededHeight, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor2, x, this._neededHeight, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw Large icon
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.drawLargeIcon = function() {
	const iconIndex = this._profession._iconIndex;
	let bitmap = this._iconBitmap;
	const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
	const dw = this._largeIconWidth;
	const dh = this._largeIconHeight;
	const x = 0;
	const y = this._neededHeight;
	this._imageOffsetInfo.y = y;
	this._imageOffsetInfo.width = dw + 4;
	this._imageOffsetInfo.height = dh;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Determine if offset is needed due to image
//-----------------------------------------------------------------------------
CGMZ_Window_ProfessionDisplay.prototype.needsOffset = function() {
	const imageOffsetTotalSpace = this._imageOffsetInfo.y + this._imageOffsetInfo.height;
	const neededArea = this._neededHeight + this.lineHeight();
	return (
		neededArea >= this._imageOffsetInfo.y &&
		this._neededHeight <= imageOffsetTotalSpace &&
		imageOffsetTotalSpace > 0
	);
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Profession Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_Professions_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_Professions_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZProfessionToast')) {
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, 0, this.contents.width, 'left');
		this.changeTextColor(ColorManager.normalColor());
		var x = this.textWidth(toastObject.name + " ");
		this.drawText(CGMZ.Professions.LevelUpText, x, 0, this.contents.width-x, 'left');
		this.drawText(CGMZ.Professions.LevelText + toastObject.level, 0, this.lineHeight(), this.contents.width, 'center');
	}
	if(toastObject.hasOwnProperty('CGMZProfessionToastDiscover')) {
		this.drawText(CGMZ.Professions.DiscoverText, 0, 0, this.contents.width, 'center');
		this.changeTextColor(toastObject.color);
		this.drawText(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
		this.changeTextColor(ColorManager.normalColor());
	}
};
}
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Use buff item processing
//=============================================================================
//-----------------------------------------------------------------------------
// Item use may cause temporary profession buff
//-----------------------------------------------------------------------------
const alias_CGMZ_Professions_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
	alias_CGMZ_Professions_useItem.call(this, item);
	if(DataManager.isItem(item)) {
        $cgmzTemp.checkItemForProfessionBuff(item);
    }
};