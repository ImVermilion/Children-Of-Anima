//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.17] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x18ff=['drawItemData','isOpenAndActive','Icon','Window_ItemList_colSpacing','Scene_Shop_onSellCancel','getItemEffectsAddedStatesBuffsLabel','Scene_Equip_commandEquip','NotConsumable','sellWindowRect','meetsItemConditionsJS','name','ItemsEquipsCore','onMenuImageLoad','resetFontSettings','EFFECT_RECOVER_MP','REPEAT','drawActorParamDifference','drawNewLabelText','EFFECT_GAIN_TP','71824rfqHJL','EFFECT_REMOVE_DEBUFF','FontFace','gainTP','isOpen','ActorResetEquipSlots','CmdIconSell','ATK','Actors','_actor','buttonAssistLargeIncrement','ItemQuantityFontSize','_categoryNameWindow','previousActor','\x5cb%1\x5cb','currentClass','ARRAYEVAL','ParamChangeFontSize','cancel','onTouchSelect','Scene_Equip_create','createBitmap','splice','popScene','_money','drawPossession','equip2','loadCharacter','Scene_Shop_goldWindowRect','width','getItemEffectsMpDamageLabel','FadeLimit','buttonAssistCategory','clearNewLabelFromItem','paramPlus','Width','categoryStyle','itypeId','smoothScrollTo','CannotEquipMarker','drawItemEquipType','SellPriceRate','MP\x20RECOVERY','scrollTo','Scene_Equip_itemWindowRect','buttonAssistKey1','equips','commandNameWindowDrawBackground','onSellCancel','isOptimizeEquipOk','getItemsEquipsCoreBackColor2','getItemSpeedText','hitType','newLabelEnabled','EquipAdjustHpMp','forceChangeEquip','EFFECT_RECOVER_HP','NeverUsable','drawItem','changeBuff','members','Parse_Notetags_Category','getItemDamageAmountTextOriginal','Game_BattlerBase_param','revertGlobalNamespaceVariables','isUseItemsEquipsCoreUpdatedLayout','length','commandSellItemsEquipsCore','BatchShop','effects','createCategoryWindow','ScopeAlliesButUser','hideNewLabelSprites','CmdIconBuy','releaseUnequippableItems','adjustHiddenShownGoods','deactivate','createItemWindow','OffsetY','isNewItem','MP\x20DAMAGE','addEquipCommand','powerUpColor','status','getItemDamageElementLabel','%1%','index','itemWindowRect','MaxWeapons','Nonconsumable','pageup','canShiftRemoveEquipment','mainAreaBottom','drawItemEffectsHpRecovery','initialize','MaxHP','categoryWindowRectItemsEquipsCore','buttonAssistOffset3','CONSUMABLE','value1','AGI','Occasion%1','drawItemDamageElement','drawItemDamage','PurchaseOnly','LUK','initEquips','drawItemEffectsMpDamage','CmdHideDisabled','text','categoryStyleCheck','max','addSellCommand','40493OGZvLB','commandWindowRectItemsEquipsCore','NoChangeMarker','LabelSelfGainTP','isHandled','commandName','meetsItemConditionsNotetags','mainFontSize','drawIcon','getItemScopeText','OffsetX','MaxMP','getItemSpeedLabel','numItems','_dummyWindow','MaxItems','Window_Selectable_setHelpWindowItem','getItemEffectsHpRecoveryText','paramId','changeEquip','drawItemEffectsMpRecovery','_tempActorA','tradeItemWithParty','processDrawIcon','playBuzzerSound','deselect','show','drawRemoveItem','_newLabelOpacityChange','_customItemInfo','addChild','getItemEffectsTpDamageLabel','processCursorSpecialCheckModernControls','_data','RemoveEquipText','statusWidth','Window_ShopBuy_refresh','setTempActor','armorTypes','process_VisuMZ_ItemsEquipsCore_Notetags','createSlotWindow','refreshItemsEquipsCoreNoMenuImage','height','note','isShiftShortcutKeyForRemove','colSpacing','includes','right','Scene_Equip_statusWindowRect','onSlotCancel','ItemScene','FUNC','getItemDamageAmountLabelBattleCore','drawItemEffectsHpDamage','List','1iBoGIn','Window_EquipItem_includes','drawItemEffectsSelfTpGain','translucentOpacity','NUM','Scene_Equip_onActorChange','etypeId','fontFace','_buyWindow','LabelRecoverMP','iconText','pagedown','FontColor','drawUpdatedParamValueDiff','isPressed','Whitelist','isOptimizeCommandEnabled','MDF','cursorLeft','Scene_Shop_onBuyCancel','format','StatusWindow','resetTextColor','create','New','fontSize','_resetFontSize','updateMoneyAmount','calcWindowHeight','maxVisibleItems','ceil','occasion','Scene_Item_categoryWindowRect','RegExp','refresh','currentExt','postCreateItemWindowModernControls','drawItemHitType','initNewLabelSprites','HiddenItemB','Window_ShopBuy_price','Scene_Shop_sellingPrice','helpAreaHeight','itemTextAlign','drawItemEffectsRemovedStatesBuffs','A%1','ADDED\x20EFFECTS','drawItemStyleIcon','armor-%1','isTriggered','categories','ARRAYJSON','Window_Selectable_refresh','_resetFontColor','drawItemOccasion','226JwbEBP','Parse_Notetags_ParamJS','addInnerChild','ParseWeaponNotetags','mhp','isCursorMovable','Window_ItemList_updateHelp','BattleUsable','isClicked','makeCommandList','Text','LabelSpeed','slotWindowRectItemsEquipsCore','process_VisuMZ_ItemsEquipsCore_RegExp','formula','refreshActorEquipSlotsIfUpdated','commandStyleCheck','ActorChangeEquipSlots','placeItemNewLabel','select','HIT\x20TYPE','versionId','flatHP','normalColor','LabelDamageMP','rateMP','onCategoryCancel','Window_ShopSell_isEnabled','\x5cI[%1]%2','CmdStyle','cursorUp','callUpdateHelp','CmdIconOptimize','convertInitEquipsToItems','type','characterName','isArmor','LayoutStyle','wtypeId','adjustItemWidthByStatus','Game_Actor_changeEquip','_itemData','%1-%2','mpRate','createCommandNameWindow','_forcedSlots','uiInputPosition','_numberWindow','setShopStatusWindowMode','playCursorSound','isKeyItem','getItemsEquipsCoreBackColor1','updateCategoryNameWindow','DrawIcons','getMatchingInitEquip','limitedPageUpDownSceneCheck','setupItemDamageTempActors','_newLabelOpacityUpperLimit','MenuPortraits','discardEquip','determineBaseSellingPrice','Window_ItemCategory_initialize','NonRemoveETypes','MAT','DamageType%1','ConvertNumberToString','SpeedNeg2000','uiHelpPosition','createStatusWindow','categoryWindowRect','hide','Scene_Equip_slotWindowRect','push','Scene_Shop_commandSell','Window_Selectable_update','drawTextEx','CoreEngine','HP\x20RECOVERY','currencyUnit','toUpperCase','Step1Start','isDualWield','commandNameWindowDrawText','ScopeRandomAllies','isRepeated','commandStyle','drawNewLabelIcon','170928rPxZYJ','getItemEffectsRemovedStatesBuffsLabel','Slots','_newLabelSprites','contentsBack','_itemWindow','hitIndex','opacity','postCreateCategoryWindowItemsEquipsCore','LabelDamageTP','isUseModernControls','setObject','statusWindowRect','(%1)','setNewItem','allowCreateStatusWindow','isHovered','buttonAssistRemove','onSellOk','makeItemData','Scene_Shop_sellWindowRect','_sellWindow','EFFECT_ADD_DEBUFF','changeEquipById','auto','Speed1000','Scene_Item_createItemWindow','onSlotOkAutoSelect','_tempActor','itemEnableJS','ExtDisplayedParams','SwitchID','_item','getItemColor','Scene_Shop_commandBuy','Scene_Equip_createSlotWindow','DrawItemData','getItemEffectsTpDamageText','onCategoryCancelItemsEquipsCore','drawItemSuccessRate','Parse_Notetags_Prices','ELEMENT','ARRAYNUM','indexOf','gainItem','_equips','_calculatingJSParameters','isWeapon','actorParams','onCategoryOk','ARRAYSTRUCT','setTopRow','fillRect','buy','Scene_Boot_onDatabaseLoaded','createNewLabelSprite','boxWidth','updateNewLabelOpacity','isSellCommandEnabled','HP\x20DAMAGE','optimize','getItemEffectsSelfTpGainText','helpAreaTop','637pyUImI','onSellOkItemsEquipsCore','?????','fill','match','itemAt','IncludeShopItem','playEquip','getInputMultiButtonStrings','Categories','nextActor','ShowShopStatus','commandSell','parameters','checkShiftRemoveShortcut','Consumable','drawParamName','innerWidth','FontSize','_goods','DrawBackRect','SellPriceJS','postCreateItemsEquipsCore','cursorPagedown','Scene_Shop_createCategoryWindow','isEquipCommandAdded','drawItemActorMenuImage','_shopStatusMenuMode','isBottomHelpMode','getItemHitTypeLabel','VisuMZ_0_CoreEngine','trim','smoothSelect','LabelRecoverTP','getItemOccasionText','getItemRepeatsText','modifiedBuyPriceItemsEquipsCore','removeState','commandEquip','Param','ParseArmorNotetags','mainAreaHeight','successRate','buttonAssistKey2','refreshCursor','registerCommand','processTouchModernControls','isEquipped','ShopScene','mainAreaTop','Step3End','maxItemAmount','Game_Actor_tradeItemWithParty','Parse_Notetags_EquipSlots','initNewItemsList','1941VNLstV','drawItemCost','LabelRepeats','Parse_Notetags_Batch','setItemWindow','Scene_Shop_createSellWindow','ARRAYFUNC','getMenuImage','contents','makeDeepCopy','LabelConsume','categoryNameWindowDrawBackground','atypeId','STR','addState','round','_purchaseOnly','isShowNew','getItemEffectsMpRecoveryText','placeNewLabel','Step1End','elementId','Scene_Shop_onSellOk','left','removeStateBuffChanges','CommandAddClear','CmdIconCancel','item','DrawParamJS','drawItemKeyData','value2','_slotId','MaxArmors','textSizeEx','EnableLayout','isClearEquipOk','EFFECT_ADD_BUFF','drawItemNumber','addOptimizeCommand','getItemQuantityText','Scene_Shop_create','HiddenItemA','lineHeight','value','drawItemQuantity','blt','setCategory','MANUAL','commandBuyItemsEquipsCore','prepareNextScene','actor','Scene_Shop_statusWindowRect','Scene_Shop_categoryWindowRect','clearNewItem','updatedLayoutStyle','OCCASION','#%1','numberWindowRect','Speed1','paintOpacity','Enable','494492nSRgAv','floor','replace','playOkSound','removeDebuff','buyWindowRectItemsEquipsCore','Scene_Load_reloadMapIfUpdated','FadeSpeed','commandNameWindowCenter','QUANTITY','Step3Start','getItemConsumableText','meetsItemConditions','_categoryWindow','getDamageStyle','Scene_Shop_onCategoryCancel','prepareItemCustomData','call','AllArmors','Window_ShopCommand_initialize','Parse_Notetags_EnableJS','getItemEffectsMpRecoveryLabel','activateSellWindow','sellingPrice','Game_BattlerBase_meetsItemConditions','ParseAllNotetags','onTouchCancel','move','Scene_Shop_commandWindowRect','CmdIconClear','DEF','_tempActorB','isEnabled','buttonAssistText3','setItem','AllItems','isDrawItemNumber','Game_Actor_discardEquip','iconWidth','map','statusWindowRectItemsEquipsCore','getItemDamageElementText','drawItemDamageAmount','hideDisabledCommands','itemPadding','categoryItemTypes','Scene_Item_create','MaxIcons','category','isPlaytest','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','addCancelCommand','bind','activate','TP\x20RECOVERY','EVAL','onActorChange','consumable','_shopStatusMenuAlly','changePaintOpacity','selfTP','changeTextColor','addStateBuffChanges','CmdIconEquip','VisuMZ_1_MainMenuCore','bitmap','MultiplierStandard','Settings','itemDataFontSize','isMainMenuCoreMenuImageOptionAvailable','Blacklist','code','getItemDamageAmountText','equipAdjustHpMp','description','maxItems','getItemEffectsTpRecoveryText','isShiftRemoveShortcutEnabled','getInputButtonString','drawItemDarkRect','Window_Selectable_initialize','Scene_Shop_activateSellWindow','Window_EquipCommand_initialize','tpGain','buttonAssistSlotWindowShift','damageColor','fontSizeRatio','checkItemConditionsSwitchNotetags','nonOptimizeEtypes','getItemEffectsSelfTpGainLabel','values','drawParamText','drawItemEffectsAddedStatesBuffs','ElementNone','itemWindowRectItemsEquipsCore','weaponTypes','buffIconIndex','windowPadding','dataId','isClearCommandEnabled','drawItemCustomEntries','mainCommandWidth','_doubleTouch','Parse_Notetags_ParamValues','paramchangeTextColor','isCommandEnabled','addItemCategory','_slotWindow','USER\x20TP\x20GAIN','AllWeapons','ConvertParams','onSlotOk','Step2End','onBuyCancelItemsEquipsCore','DAMAGE\x20MULTIPLIER','cursorRight','LabelElement','process_VisuMZ_ItemsEquipsCore_EquipSlots','drawItemEffectsTpDamage','ShiftShortcutKey','canEquip','allowShiftScrolling','weapon-%1','_bypassNewLabel','exit','processHandling','nonRemovableEtypes','Style','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','Scene_Item_createCategoryWindow','drawCurrencyValue','down','drawItemConsumable','getItemEffectsHpDamageLabel','Window_EquipItem_isEnabled','_buyWindowLastIndex','systemColor','split','clear','isCancelled','flatMP','damage','remove','addClearCommand','loadSystem','BorderRegExp','ParseClassNotetags','_newItemsList','mmp','_handlers','drawing','optKeyItemsNumber','LabelSuccessRate','sellPriceRate','isClearCommandAdded','visible','getItemConsumableLabel','drawItemScope','removeBuff','drawParamsItemsEquipsCore','buttonAssistItemListRequirement','isGoodShown','equip','isUseParamNamesWithIcons','processCursorMoveModernControls','Game_Party_initialize','prepareRefreshItemsEquipsCoreLayout','ParamValueFontSize','isItem','drawItemEffects','rateHP','Type','loadFaceImages','addBuyCommand','speed','update','getTextColor','onTouchSelectModern','(+%1)','+%1','getItemSuccessRateLabel','categoryList','paramValueByName','setMp','hpRate','SpeedNeg1999','clearEquipments','smallParamFontSize','cursorDown','Window_ItemCategory_setItemWindow','textColor','ParseItemNotetags','_commandWindow','addWindow','addCommand','EquipParams','canUse','Scene_Shop_numberWindowRect','prepareNewEquipSlotsOnLoad','updateCommandNameWindow','StatusWindowWidth','SPEED','QoL','SCOPE','reloadMapIfUpdated','isOptimizeCommandAdded','getNextAvailableEtypeId','ElementWeapon','Scene_ItemBase_activateItemWindow','uiMenuStyle','textWidth','getColor','loadPicture','setHp','DrawFaceJS','drawItemRepeats','100%','Step2Start','buttonAssistText1','_list','paramJS','sell','constructor','STRUCT','buttonAssistKey3','CmdCancelRename','setHandler','RegularItems','setStatusWindow','Game_Actor_forceChangeEquip','maxCols','ARRAYSTR','drawUpdatedBeforeParamValue','isEquipItem','_goodsCount','sellWindowRectItemsEquipsCore','86GULeqz','gaugeBackColor','possession','iconHeight','getItemEffectsHpDamageText','goldWindowRectItemsEquipsCore','ListWindowCols','keyItem','processShiftRemoveShortcut','equipTypes','CommandAddOptimize','getItemEffectsMpDamageText','onDatabaseLoaded','shouldCommandWindowExist','125548cUYpIL','REMOVED\x20EFFECTS','onBuyCancel','getItemEffectsAddedStatesBuffsText','commandWindowRect','Window_ItemList_drawItem','setHelpWindowItem','addLoadListener','updateHelp','log','onTouchSelectModernControls','drawItemName','drawItemStyleIconText','EquipScene','LabelApply','prepare','defaultItemMax','isHoverEnabled','TP\x20DAMAGE','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','helpWindowRectItemsEquipsCore','postCreateSlotWindowItemsEquipsCore','itemLineRect','\x5cI[%1]','Scene_Item_itemWindowRect','CmdTextAlign','forceChangeEquipSlots','Scene_Shop_prepare','repeats','parse','Translucent','Scene_Equip_onSlotOk','0000','helpWindowRect','buttonAssistText2','icon','prototype','processCursorMove','Scene_Equip_commandWindowRect','price','BackRectColor','KeyItemProtect','buyWindowRect','getItemSuccessRateText','ItemQuantityFmt','getItemEffectsHpRecoveryLabel','filter','LabelRemove','_newLabelOpacity','param','EFFECT_REMOVE_BUFF','+%1%','drawItemEffectsTpRecovery','_scene','isRightInputMode','commandBuy','drawText','DrawEquipData','item-%1','center','VisuMZ_1_BattleCore','iconIndex','equipSlots','getItemDamageAmountLabel','shift','_commandNameWindow','createSellWindow','active','_statusWindow','postCreateSellWindowItemsEquipsCore','Speed2000','cursorPageup','drawItemCustomEntryLine','FieldUsable','_category'];const _0x3551=function(_0xc7a9e0,_0x5efd83){_0xc7a9e0=_0xc7a9e0-0x19f;let _0x18ff2e=_0x18ff[_0xc7a9e0];return _0x18ff2e;};const _0x2be66f=_0x3551;(function(_0x501559,_0x546210){const _0x37cc8c=_0x3551;while(!![]){try{const _0x4028aa=-parseInt(_0x37cc8c(0x235))*parseInt(_0x37cc8c(0x19f))+parseInt(_0x37cc8c(0x26c))*-parseInt(_0x37cc8c(0x395))+-parseInt(_0x37cc8c(0x472))+-parseInt(_0x37cc8c(0x3a3))*parseInt(_0x37cc8c(0x4a9))+parseInt(_0x37cc8c(0x1f6))+-parseInt(_0x37cc8c(0x401))+parseInt(_0x37cc8c(0x2a9));if(_0x4028aa===_0x546210)break;else _0x501559['push'](_0x501559['shift']());}catch(_0x18571c){_0x501559['push'](_0x501559['shift']());}}}(_0x18ff,0x1c7bb));var label=_0x2be66f(0x3f9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2be66f(0x3d1)](function(_0x4adc67){const _0x4eef60=_0x2be66f;return _0x4adc67[_0x4eef60(0x454)]&&_0x4adc67[_0x4eef60(0x2f3)][_0x4eef60(0x4a0)]('['+label+']');})[0x0];VisuMZ[label][_0x2be66f(0x2ec)]=VisuMZ[label][_0x2be66f(0x2ec)]||{},VisuMZ[_0x2be66f(0x317)]=function(_0x1a6867,_0x5ac74a){const _0x216d0a=_0x2be66f;for(const _0x9b85ea in _0x5ac74a){if(_0x9b85ea[_0x216d0a(0x239)](/(.*):(.*)/i)){const _0x15d37b=String(RegExp['$1']),_0x3f4745=String(RegExp['$2'])[_0x216d0a(0x1ee)]()['trim']();let _0x24907b,_0x9b0205,_0x4be61;switch(_0x3f4745){case _0x216d0a(0x4ad):_0x24907b=_0x5ac74a[_0x9b85ea]!==''?Number(_0x5ac74a[_0x9b85ea]):0x0;break;case _0x216d0a(0x220):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205[_0x216d0a(0x2d0)](_0x3e1e4c=>Number(_0x3e1e4c));break;case _0x216d0a(0x2e0):_0x24907b=_0x5ac74a[_0x9b85ea]!==''?eval(_0x5ac74a[_0x9b85ea]):null;break;case _0x216d0a(0x411):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON['parse'](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205[_0x216d0a(0x2d0)](_0x3f13d1=>eval(_0x3f13d1));break;case'JSON':_0x24907b=_0x5ac74a[_0x9b85ea]!==''?JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea]):'';break;case _0x216d0a(0x4dc):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON['parse'](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205['map'](_0x427431=>JSON[_0x216d0a(0x3c0)](_0x427431));break;case _0x216d0a(0x4a5):_0x24907b=_0x5ac74a[_0x9b85ea]!==''?new Function(JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea])):new Function('return\x200');break;case _0x216d0a(0x272):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205[_0x216d0a(0x2d0)](_0x5c506c=>new Function(JSON[_0x216d0a(0x3c0)](_0x5c506c)));break;case _0x216d0a(0x279):_0x24907b=_0x5ac74a[_0x9b85ea]!==''?String(_0x5ac74a[_0x9b85ea]):'';break;case _0x216d0a(0x390):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205[_0x216d0a(0x2d0)](_0x59d047=>String(_0x59d047));break;case _0x216d0a(0x388):_0x4be61=_0x5ac74a[_0x9b85ea]!==''?JSON[_0x216d0a(0x3c0)](_0x5ac74a[_0x9b85ea]):{},_0x1a6867[_0x15d37b]={},VisuMZ[_0x216d0a(0x317)](_0x1a6867[_0x15d37b],_0x4be61);continue;case _0x216d0a(0x228):_0x9b0205=_0x5ac74a[_0x9b85ea]!==''?JSON['parse'](_0x5ac74a[_0x9b85ea]):[],_0x24907b=_0x9b0205[_0x216d0a(0x2d0)](_0x4fa4e8=>VisuMZ[_0x216d0a(0x317)]({},JSON[_0x216d0a(0x3c0)](_0x4fa4e8)));break;default:continue;}_0x1a6867[_0x15d37b]=_0x24907b;}}return _0x1a6867;},(_0x41419a=>{const _0x413f98=_0x2be66f,_0x3ce924=_0x41419a['name'];for(const _0x4f9da9 of dependencies){if(!Imported[_0x4f9da9]){alert(_0x413f98(0x3b6)[_0x413f98(0x4bd)](_0x3ce924,_0x4f9da9)),SceneManager[_0x413f98(0x325)]();break;}}const _0x1382e9=_0x41419a[_0x413f98(0x2f3)];if(_0x1382e9['match'](/\[Version[ ](.*?)\]/i)){const _0x43ef94=Number(RegExp['$1']);_0x43ef94!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x413f98(0x4bd)](_0x3ce924,_0x43ef94)),SceneManager[_0x413f98(0x325)]());}if(_0x1382e9[_0x413f98(0x239)](/\[Tier[ ](\d+)\]/i)){const _0x485b5e=Number(RegExp['$1']);_0x485b5e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x413f98(0x4bd)](_0x3ce924,_0x485b5e,tier)),SceneManager[_0x413f98(0x325)]()):tier=Math[_0x413f98(0x470)](_0x485b5e,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x413f98(0x2ec)],_0x41419a[_0x413f98(0x242)]);})(pluginData),PluginManager[_0x2be66f(0x262)](pluginData['name'],_0x2be66f(0x1b0),_0x397d18=>{const _0x287b45=_0x2be66f;VisuMZ[_0x287b45(0x317)](_0x397d18,_0x397d18);const _0x1507c5=_0x397d18[_0x287b45(0x409)]['map'](_0x9e23e2=>$gameActors[_0x287b45(0x29e)](_0x9e23e2)),_0x2618e4=_0x397d18[_0x287b45(0x1f8)]['map'](_0xc5bb8c=>$dataSystem[_0x287b45(0x39e)][_0x287b45(0x221)](_0xc5bb8c[_0x287b45(0x254)]()));for(const _0x242059 of _0x1507c5){if(!_0x242059)continue;_0x242059[_0x287b45(0x3bd)](_0x2618e4);}}),PluginManager['registerCommand'](pluginData['name'],_0x2be66f(0x406),_0x5b19a0=>{const _0x5732e1=_0x2be66f;VisuMZ['ConvertParams'](_0x5b19a0,_0x5b19a0);const _0x4cb4c8=_0x5b19a0['Actors'][_0x5732e1(0x2d0)](_0x8aa2ca=>$gameActors[_0x5732e1(0x29e)](_0x8aa2ca));for(const _0x3bedfc of _0x4cb4c8){if(!_0x3bedfc)continue;_0x3bedfc['forceResetEquipSlots']();}}),PluginManager[_0x2be66f(0x262)](pluginData['name'],_0x2be66f(0x445),_0x48c7bf=>{const _0x231768=_0x2be66f;VisuMZ['ConvertParams'](_0x48c7bf,_0x48c7bf);const _0x379afd=[],_0x424911=_0x48c7bf[_0x231768(0x2ef)][_0x231768(0x2d0)](_0x1c063e=>_0x1c063e['toUpperCase']()[_0x231768(0x254)]()),_0x315d5b=_0x48c7bf[_0x231768(0x4b8)][_0x231768(0x2d0)](_0x1c7c5a=>_0x1c7c5a[_0x231768(0x1ee)]()[_0x231768(0x254)]()),_0xeee259=_0x48c7bf[_0x231768(0x280)]>=_0x48c7bf[_0x231768(0x1ef)]?_0x48c7bf['Step1Start']:_0x48c7bf[_0x231768(0x280)],_0x29b287=_0x48c7bf[_0x231768(0x280)]>=_0x48c7bf[_0x231768(0x1ef)]?_0x48c7bf[_0x231768(0x280)]:_0x48c7bf['Step1Start'],_0x457442=Array(_0x29b287-_0xeee259+0x1)[_0x231768(0x238)]()[_0x231768(0x2d0)]((_0x4a3fc1,_0x24a1ea)=>_0xeee259+_0x24a1ea);for(const _0x495cb8 of _0x457442){const _0x5cf3c9=$dataItems[_0x495cb8];if(!_0x5cf3c9)continue;if(!VisuMZ[_0x231768(0x3f9)]['IncludeShopItem'](_0x5cf3c9,_0x424911,_0x315d5b))continue;_0x379afd['push']([0x0,_0x495cb8,0x0,_0x5cf3c9['price']]);}const _0x132809=_0x48c7bf[_0x231768(0x319)]>=_0x48c7bf[_0x231768(0x382)]?_0x48c7bf[_0x231768(0x382)]:_0x48c7bf[_0x231768(0x319)],_0x4bbdea=_0x48c7bf[_0x231768(0x319)]>=_0x48c7bf[_0x231768(0x382)]?_0x48c7bf[_0x231768(0x319)]:_0x48c7bf[_0x231768(0x382)],_0x4d44e3=Array(_0x4bbdea-_0x132809+0x1)['fill']()[_0x231768(0x2d0)]((_0x390a21,_0x2b9efa)=>_0x132809+_0x2b9efa);for(const _0x59782e of _0x4d44e3){const _0x5e6009=$dataWeapons[_0x59782e];if(!_0x5e6009)continue;if(!VisuMZ[_0x231768(0x3f9)]['IncludeShopItem'](_0x5e6009,_0x424911,_0x315d5b))continue;_0x379afd[_0x231768(0x1e7)]([0x1,_0x59782e,0x0,_0x5e6009[_0x231768(0x3ca)]]);}const _0x4e0beb=_0x48c7bf[_0x231768(0x267)]>=_0x48c7bf[_0x231768(0x2b3)]?_0x48c7bf[_0x231768(0x2b3)]:_0x48c7bf[_0x231768(0x267)],_0x3a4a37=_0x48c7bf[_0x231768(0x267)]>=_0x48c7bf[_0x231768(0x2b3)]?_0x48c7bf[_0x231768(0x267)]:_0x48c7bf[_0x231768(0x2b3)],_0x12c636=Array(_0x3a4a37-_0x4e0beb+0x1)[_0x231768(0x238)]()['map']((_0x238d7a,_0x57a6b9)=>_0x4e0beb+_0x57a6b9);for(const _0x5b816b of _0x12c636){const _0x5db5a7=$dataArmors[_0x5b816b];if(!_0x5db5a7)continue;if(!VisuMZ[_0x231768(0x3f9)][_0x231768(0x23b)](_0x5db5a7,_0x424911,_0x315d5b))continue;_0x379afd[_0x231768(0x1e7)]([0x2,_0x5b816b,0x0,_0x5db5a7[_0x231768(0x3ca)]]);}SceneManager[_0x231768(0x1e7)](Scene_Shop),SceneManager[_0x231768(0x29d)](_0x379afd,_0x48c7bf[_0x231768(0x469)]);}),VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x23b)]=function(_0x387aac,_0xb95ec,_0x5ba1b9){const _0x148a73=_0x2be66f;if(_0x387aac[_0x148a73(0x3f8)][_0x148a73(0x254)]()==='')return![];if(_0x387aac['name'][_0x148a73(0x239)](/-----/i))return![];const _0x1b55c4=_0x387aac['categories'];if(_0xb95ec['length']>0x0)for(const _0x580e03 of _0xb95ec){if(!_0x580e03)continue;if(_0x1b55c4[_0x148a73(0x4a0)](_0x580e03))return![];}if(_0x5ba1b9['length']>0x0){for(const _0x1e874f of _0x5ba1b9){if(!_0x1e874f)continue;if(_0x1b55c4[_0x148a73(0x4a0)](_0x1e874f))return!![];}return![];}return!![];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x22c)]=Scene_Boot[_0x2be66f(0x3c7)][_0x2be66f(0x3a1)],Scene_Boot[_0x2be66f(0x3c7)][_0x2be66f(0x3a1)]=function(){const _0x4e9c87=_0x2be66f;this[_0x4e9c87(0x1ac)](),VisuMZ[_0x4e9c87(0x3f9)][_0x4e9c87(0x22c)][_0x4e9c87(0x2ba)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot[_0x2be66f(0x3c7)]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x4b6451=_0x2be66f;VisuMZ[_0x4b6451(0x3f9)]['RegExp']={},VisuMZ[_0x4b6451(0x3f9)]['RegExp'][_0x4b6451(0x36c)]=[],VisuMZ['ItemsEquipsCore'][_0x4b6451(0x4ca)][_0x4b6451(0x33a)]=[];const _0x4aa256=[_0x4b6451(0x460),_0x4b6451(0x47d),_0x4b6451(0x408),_0x4b6451(0x2c7),_0x4b6451(0x1de),_0x4b6451(0x4ba),_0x4b6451(0x465),_0x4b6451(0x46a)];for(const _0x19f9ec of _0x4aa256){const _0x23b8d9=_0x4b6451(0x2db)[_0x4b6451(0x4bd)](_0x19f9ec);VisuMZ[_0x4b6451(0x3f9)][_0x4b6451(0x4ca)][_0x4b6451(0x36c)][_0x4b6451(0x1e7)](new RegExp(_0x23b8d9,'i'));const _0x33a363=_0x4b6451(0x40f)[_0x4b6451(0x4bd)](_0x19f9ec);VisuMZ[_0x4b6451(0x3f9)]['RegExp'][_0x4b6451(0x33a)][_0x4b6451(0x1e7)](new RegExp(_0x33a363,'g'));}},Scene_Boot['prototype'][_0x2be66f(0x499)]=function(){const _0x234115=_0x2be66f;if(VisuMZ[_0x234115(0x2c2)])return;this[_0x234115(0x31e)]();const _0x398bbe=[$dataItems,$dataWeapons,$dataArmors];for(const _0x34ed6f of _0x398bbe){for(const _0x2eb604 of _0x34ed6f){if(!_0x2eb604)continue;VisuMZ[_0x234115(0x3f9)][_0x234115(0x43e)](_0x2eb604,_0x34ed6f),VisuMZ[_0x234115(0x3f9)][_0x234115(0x21e)](_0x2eb604,_0x34ed6f),VisuMZ[_0x234115(0x3f9)]['Parse_Notetags_ParamValues'](_0x2eb604,_0x34ed6f),VisuMZ['ItemsEquipsCore'][_0x234115(0x1a0)](_0x2eb604,_0x34ed6f),VisuMZ['ItemsEquipsCore'][_0x234115(0x2bd)](_0x2eb604,_0x34ed6f);}}},Scene_Boot['prototype'][_0x2be66f(0x31e)]=function(){for(const _0x5e3e2a of $dataClasses){if(!_0x5e3e2a)continue;VisuMZ['ItemsEquipsCore']['Parse_Notetags_EquipSlots'](_0x5e3e2a);}},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x33b)]=VisuMZ[_0x2be66f(0x33b)],VisuMZ[_0x2be66f(0x33b)]=function(_0x1faee9){const _0x5521d7=_0x2be66f;VisuMZ[_0x5521d7(0x3f9)]['ParseClassNotetags'][_0x5521d7(0x2ba)](this,_0x1faee9),VisuMZ[_0x5521d7(0x3f9)][_0x5521d7(0x26a)](_0x1faee9);},VisuMZ[_0x2be66f(0x3f9)]['ParseItemNotetags']=VisuMZ[_0x2be66f(0x368)],VisuMZ[_0x2be66f(0x368)]=function(_0x464d16){const _0x46ee26=_0x2be66f;VisuMZ[_0x46ee26(0x3f9)][_0x46ee26(0x368)][_0x46ee26(0x2ba)](this,_0x464d16),VisuMZ[_0x46ee26(0x3f9)][_0x46ee26(0x26f)](_0x464d16,$dataItems);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x1a2)]=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x4fa2a2){const _0x4286d6=_0x2be66f;VisuMZ['ItemsEquipsCore']['ParseWeaponNotetags'][_0x4286d6(0x2ba)](this,_0x4fa2a2),VisuMZ['ItemsEquipsCore'][_0x4286d6(0x26f)](_0x4fa2a2,$dataWeapons);},VisuMZ[_0x2be66f(0x3f9)]['ParseArmorNotetags']=VisuMZ[_0x2be66f(0x25d)],VisuMZ[_0x2be66f(0x25d)]=function(_0x64b4f5){const _0xdcbf6b=_0x2be66f;VisuMZ[_0xdcbf6b(0x3f9)][_0xdcbf6b(0x25d)][_0xdcbf6b(0x2ba)](this,_0x64b4f5),VisuMZ[_0xdcbf6b(0x3f9)][_0xdcbf6b(0x26f)](_0x64b4f5,$dataArmors);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x26a)]=function(_0x1be343){const _0x3c41dd=_0x2be66f;_0x1be343[_0x3c41dd(0x3e1)]=[];if(_0x1be343[_0x3c41dd(0x49d)][_0x3c41dd(0x239)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x500fb1=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x141d7 of _0x500fb1){const _0x966b51=$dataSystem[_0x3c41dd(0x39e)][_0x3c41dd(0x221)](_0x141d7[_0x3c41dd(0x254)]());if(_0x966b51>0x0)_0x1be343[_0x3c41dd(0x3e1)][_0x3c41dd(0x1e7)](_0x966b51);}}else for(const _0xbc6d7d of $dataSystem['equipTypes']){const _0x1ad527=$dataSystem['equipTypes'][_0x3c41dd(0x221)](_0xbc6d7d[_0x3c41dd(0x254)]());if(_0x1ad527>0x0)_0x1be343['equipSlots']['push'](_0x1ad527);}},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x26f)]=function(_0x28a7f3,_0x3110bc){const _0x4a424a=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x4a424a(0x43e)](_0x28a7f3,_0x3110bc),VisuMZ['ItemsEquipsCore'][_0x4a424a(0x21e)](_0x28a7f3,_0x3110bc),VisuMZ['ItemsEquipsCore'][_0x4a424a(0x310)](_0x28a7f3,_0x3110bc),VisuMZ[_0x4a424a(0x3f9)][_0x4a424a(0x1a0)](_0x28a7f3,_0x3110bc),VisuMZ[_0x4a424a(0x3f9)]['Parse_Notetags_EnableJS'](_0x28a7f3,_0x3110bc);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x43e)]=function(_0x2943e6,_0x5e0d95){const _0x596ed3=_0x2be66f;_0x2943e6[_0x596ed3(0x4db)]=[];const _0x519ef3=_0x2943e6[_0x596ed3(0x49d)],_0x2649d2=_0x519ef3['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x2649d2)for(const _0x249654 of _0x2649d2){_0x249654[_0x596ed3(0x239)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x258a8e=String(RegExp['$1'])[_0x596ed3(0x1ee)]()['trim']()[_0x596ed3(0x332)](',');for(const _0x5169d7 of _0x258a8e){_0x2943e6['categories'][_0x596ed3(0x1e7)](_0x5169d7[_0x596ed3(0x254)]());}}if(_0x519ef3['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x42d662=RegExp['$1'][_0x596ed3(0x332)](/[\r\n]+/);for(const _0x48bc09 of _0x42d662){_0x2943e6[_0x596ed3(0x4db)][_0x596ed3(0x1e7)](_0x48bc09[_0x596ed3(0x1ee)]()['trim']());}}},VisuMZ[_0x2be66f(0x3f9)]['Parse_Notetags_Prices']=function(_0x3baf57,_0x2488a8){const _0x1de5c6=_0x2be66f;_0x3baf57['note'][_0x1de5c6(0x239)](/<PRICE:[ ](\d+)>/i)&&(_0x3baf57[_0x1de5c6(0x3ca)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x310)]=function(_0xef4c77,_0x1685d9){const _0x1bef35=_0x2be66f;if(_0x1685d9===$dataItems)return;for(let _0x4aa2d9=0x0;_0x4aa2d9<0x8;_0x4aa2d9++){const _0x396f83=VisuMZ[_0x1bef35(0x3f9)][_0x1bef35(0x4ca)]['EquipParams'][_0x4aa2d9];_0xef4c77['note'][_0x1bef35(0x239)](_0x396f83)&&(_0xef4c77['params'][_0x4aa2d9]=parseInt(RegExp['$1']));}},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x385)]={},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x1a0)]=function(_0x26718b,_0x583aca){const _0x59aaa1=_0x2be66f;if(_0x583aca===$dataItems)return;if(_0x26718b['note'][_0x59aaa1(0x239)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x239175=String(RegExp['$1']),_0x52a053=(_0x583aca===$dataWeapons?'W%1':_0x59aaa1(0x4d6))[_0x59aaa1(0x4bd)](_0x26718b['id']),_0x1e9be5=_0x59aaa1(0x329)['format'](_0x239175);for(let _0x1e58f7=0x0;_0x1e58f7<0x8;_0x1e58f7++){if(_0x239175[_0x59aaa1(0x239)](VisuMZ[_0x59aaa1(0x3f9)]['RegExp'][_0x59aaa1(0x33a)][_0x1e58f7])){const _0x304e40=_0x59aaa1(0x1c9)['format'](_0x52a053,_0x1e58f7);VisuMZ[_0x59aaa1(0x3f9)][_0x59aaa1(0x385)][_0x304e40]=new Function(_0x59aaa1(0x287),_0x59aaa1(0x484),_0x1e9be5);}}}},VisuMZ[_0x2be66f(0x3f9)]['itemEnableJS']={},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2bd)]=function(_0x3453de,_0x546484){const _0x29bcc2=_0x2be66f;if(_0x546484!==$dataItems)return;if(_0x3453de[_0x29bcc2(0x49d)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x59570e=String(RegExp['$1']),_0x43b7e8='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x29bcc2(0x4bd)](_0x59570e);VisuMZ[_0x29bcc2(0x3f9)]['itemEnableJS'][_0x3453de['id']]=new Function(_0x29bcc2(0x287),_0x43b7e8);}},DataManager[_0x2be66f(0x1d1)]=function(_0x2cf3f0){const _0x52e24a=_0x2be66f;return this[_0x52e24a(0x351)](_0x2cf3f0)&&_0x2cf3f0[_0x52e24a(0x426)]===0x2;},DataManager['maxItemAmount']=function(_0x7a707f){const _0x1feef7=_0x2be66f;if(!_0x7a707f)return 0x63;else return _0x7a707f['note'][_0x1feef7(0x239)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x1feef7(0x3b3)](_0x7a707f);},DataManager[_0x2be66f(0x3b3)]=function(_0x3591d1){const _0x5be073=_0x2be66f;if(this['isItem'](_0x3591d1))return VisuMZ[_0x5be073(0x3f9)]['Settings'][_0x5be073(0x4a4)][_0x5be073(0x481)];else{if(this['isWeapon'](_0x3591d1))return VisuMZ[_0x5be073(0x3f9)][_0x5be073(0x2ec)]['ItemScene'][_0x5be073(0x459)];else{if(this[_0x5be073(0x1c3)](_0x3591d1))return VisuMZ[_0x5be073(0x3f9)][_0x5be073(0x2ec)][_0x5be073(0x4a4)][_0x5be073(0x28c)];}}},ColorManager['getItemColor']=function(_0x28c714){const _0x15cbc4=_0x2be66f;if(!_0x28c714)return this['normalColor']();else{if(_0x28c714[_0x15cbc4(0x49d)][_0x15cbc4(0x239)](/<COLOR:[ ](\d+)>/i))return this[_0x15cbc4(0x367)](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x28c714[_0x15cbc4(0x49d)][_0x15cbc4(0x239)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x15cbc4(0x1b6)]();}},ColorManager[_0x2be66f(0x37c)]=function(_0xe50c44){const _0x49559e=_0x2be66f;return _0xe50c44=String(_0xe50c44),_0xe50c44['match'](/#(.*)/i)?_0x49559e(0x2a4)[_0x49559e(0x4bd)](String(RegExp['$1'])):this[_0x49559e(0x367)](Number(_0xe50c44));},Game_Temp[_0x2be66f(0x3c7)][_0x2be66f(0x436)]=function(){const _0x3426ce=_0x2be66f;if(this[_0x3426ce(0x324)])return![];return VisuMZ[_0x3426ce(0x3f9)]['Settings'][_0x3426ce(0x4c1)][_0x3426ce(0x2a8)];},VisuMZ['ShopMenuStatusStandard']=VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2ec)][_0x2be66f(0x4be)][_0x2be66f(0x2eb)],VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x440)]=Game_BattlerBase['prototype'][_0x2be66f(0x3d4)],Game_BattlerBase[_0x2be66f(0x3c7)]['param']=function(_0xb696ab){const _0x42ae09=_0x2be66f;return this[_0x42ae09(0x250)]?this['_shopStatusMenuAlly']?VisuMZ['ShopMenuStatusStandard']:0x1:VisuMZ['ItemsEquipsCore']['Game_BattlerBase_param'][_0x42ae09(0x2ba)](this,_0xb696ab);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2c1)]=Game_BattlerBase[_0x2be66f(0x3c7)][_0x2be66f(0x2b5)],Game_BattlerBase[_0x2be66f(0x3c7)][_0x2be66f(0x2b5)]=function(_0x2e72c1){const _0x2d83f7=_0x2be66f;if(!_0x2e72c1)return![];if(!VisuMZ[_0x2d83f7(0x3f9)][_0x2d83f7(0x2c1)][_0x2d83f7(0x2ba)](this,_0x2e72c1))return![];if(!this[_0x2d83f7(0x478)](_0x2e72c1))return![];if(!this['meetsItemConditionsJS'](_0x2e72c1))return![];return!![];},Game_BattlerBase[_0x2be66f(0x3c7)]['meetsItemConditionsNotetags']=function(_0x32d4ba){const _0x56da1f=_0x2be66f;if(!this[_0x56da1f(0x300)](_0x32d4ba))return![];return!![];},Game_BattlerBase['prototype'][_0x2be66f(0x300)]=function(_0x17991b){const _0x4c111c=_0x2be66f,_0x519897=_0x17991b[_0x4c111c(0x49d)];if(_0x519897[_0x4c111c(0x239)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c6b16=JSON[_0x4c111c(0x3c0)]('['+RegExp['$1'][_0x4c111c(0x239)](/\d+/g)+']');for(const _0x400f66 of _0x2c6b16){if(!$gameSwitches['value'](_0x400f66))return![];}return!![];}if(_0x519897[_0x4c111c(0x239)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5e0322=JSON['parse']('['+RegExp['$1'][_0x4c111c(0x239)](/\d+/g)+']');for(const _0x26a31c of _0x5e0322){if(!$gameSwitches[_0x4c111c(0x297)](_0x26a31c))return![];}return!![];}if(_0x519897[_0x4c111c(0x239)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1efd4b=JSON[_0x4c111c(0x3c0)]('['+RegExp['$1'][_0x4c111c(0x239)](/\d+/g)+']');for(const _0x2da5a6 of _0x1efd4b){if($gameSwitches[_0x4c111c(0x297)](_0x2da5a6))return!![];}return![];}if(_0x519897[_0x4c111c(0x239)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4022c8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x167678 of _0x4022c8){if(!$gameSwitches[_0x4c111c(0x297)](_0x167678))return!![];}return![];}if(_0x519897['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5dadc3=JSON[_0x4c111c(0x3c0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x143f6d of _0x5dadc3){if(!$gameSwitches[_0x4c111c(0x297)](_0x143f6d))return!![];}return![];}if(_0x519897[_0x4c111c(0x239)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x51e537=JSON[_0x4c111c(0x3c0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ab096 of _0x51e537){if($gameSwitches[_0x4c111c(0x297)](_0x2ab096))return![];}return!![];}return!![];},Game_BattlerBase[_0x2be66f(0x3c7)][_0x2be66f(0x3f7)]=function(_0x42bce9){const _0x37cb74=_0x2be66f,_0xf53505=_0x42bce9['note'],_0x466c3a=VisuMZ[_0x37cb74(0x3f9)][_0x37cb74(0x213)];return _0x466c3a[_0x42bce9['id']]?_0x466c3a[_0x42bce9['id']][_0x37cb74(0x2ba)](this,_0x42bce9):!![];},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x46b)]=function(_0x27b4a6){const _0x24fd17=_0x2be66f;_0x27b4a6=this['convertInitEquipsToItems'](_0x27b4a6);const _0x51ec18=this[_0x24fd17(0x3e1)]();this[_0x24fd17(0x223)]=[];for(let _0x452c6e=0x0;_0x452c6e<_0x51ec18[_0x24fd17(0x443)];_0x452c6e++){this[_0x24fd17(0x223)][_0x452c6e]=new Game_Item();}for(let _0x5d989c=0x0;_0x5d989c<_0x51ec18[_0x24fd17(0x443)];_0x5d989c++){const _0x4be471=_0x51ec18[_0x5d989c],_0x4dab23=this[_0x24fd17(0x1d5)](_0x27b4a6,_0x4be471);if(this[_0x24fd17(0x321)](_0x4dab23))this['_equips'][_0x5d989c][_0x24fd17(0x201)](_0x4dab23);}this[_0x24fd17(0x44b)](!![]),this['refresh']();},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x1c0)]=function(_0x34d7a7){const _0x23b6ae=_0x2be66f,_0x56a82e=[];for(let _0x58b1c1=0x0;_0x58b1c1<_0x34d7a7[_0x23b6ae(0x443)];_0x58b1c1++){const _0x2a5250=_0x34d7a7[_0x58b1c1];if(_0x2a5250<=0x0)continue;const _0x47cde3=$dataSystem[_0x23b6ae(0x39e)][_0x58b1c1+0x1];_0x47cde3===$dataSystem[_0x23b6ae(0x39e)][0x1]||_0x58b1c1===0x1&&this[_0x23b6ae(0x1f0)]()?_0x56a82e[_0x23b6ae(0x1e7)]($dataWeapons[_0x2a5250]):_0x56a82e[_0x23b6ae(0x1e7)]($dataArmors[_0x2a5250]);}return _0x56a82e;},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x1d5)]=function(_0x4bebff,_0x47a615){const _0x27363b=_0x2be66f;for(const _0x3ff699 of _0x4bebff){if(!_0x3ff699)continue;if(_0x3ff699[_0x27363b(0x4af)]===_0x47a615)return _0x4bebff['splice'](_0x4bebff[_0x27363b(0x221)](_0x3ff699),0x1),_0x3ff699;}return null;},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x3e1)]=function(){const _0x3a7fbc=_0x2be66f,_0x2fecf4=JsonEx[_0x3a7fbc(0x275)](this[_0x3a7fbc(0x1cc)]||this[_0x3a7fbc(0x410)]()[_0x3a7fbc(0x3e1)]);if(_0x2fecf4[_0x3a7fbc(0x443)]>=0x2&&this[_0x3a7fbc(0x1f0)]())_0x2fecf4[0x1]=0x1;return _0x2fecf4;},Game_Actor[_0x2be66f(0x3c7)]['forceChangeEquipSlots']=function(_0x35052d){const _0x50ab48=_0x2be66f;_0x35052d[_0x50ab48(0x337)](0x0),_0x35052d[_0x50ab48(0x337)](-0x1),this[_0x50ab48(0x1cc)]=_0x35052d,this['refresh']();},Game_Actor[_0x2be66f(0x3c7)]['forceResetEquipSlots']=function(){this['_forcedSlots']=undefined,this['refresh']();},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x36f)]=function(){const _0x2ba66e=_0x2be66f,_0x1a70bd=this[_0x2ba66e(0x3e1)]();for(let _0x5f0a00=0x0;_0x5f0a00<_0x1a70bd[_0x2ba66e(0x443)];_0x5f0a00++){if(!this[_0x2ba66e(0x223)][_0x5f0a00])this[_0x2ba66e(0x223)][_0x5f0a00]=new Game_Item();}this[_0x2ba66e(0x44b)](![]),this['refresh']();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x1c7)]=Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x485)],Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x485)]=function(_0x582efe,_0x577338){const _0x589e33=_0x2be66f;if(!this[_0x589e33(0x212)]){const _0x359b8e=JsonEx[_0x589e33(0x275)](this);_0x359b8e[_0x589e33(0x212)]=!![],VisuMZ[_0x589e33(0x3f9)]['Game_Actor_changeEquip'][_0x589e33(0x2ba)](this,_0x582efe,_0x577338),this[_0x589e33(0x2f2)](_0x359b8e);}else VisuMZ[_0x589e33(0x3f9)][_0x589e33(0x1c7)][_0x589e33(0x2ba)](this,_0x582efe,_0x577338);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x38e)]=Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x438)],Game_Actor['prototype'][_0x2be66f(0x438)]=function(_0x1193ff,_0x327a60){const _0x14089f=_0x2be66f;if(!this['_tempActor']){const _0xb30b4e=JsonEx[_0x14089f(0x275)](this);_0xb30b4e[_0x14089f(0x212)]=!![],VisuMZ[_0x14089f(0x3f9)][_0x14089f(0x38e)][_0x14089f(0x2ba)](this,_0x1193ff,_0x327a60),this[_0x14089f(0x2f2)](_0xb30b4e);}else VisuMZ['ItemsEquipsCore']['Game_Actor_forceChangeEquip']['call'](this,_0x1193ff,_0x327a60);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2ce)]=Game_Actor[_0x2be66f(0x3c7)]['discardEquip'],Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x1da)]=function(_0x39f7c4){const _0x51cfe1=_0x2be66f;if(!this[_0x51cfe1(0x212)]){const _0x51a3e8=JsonEx['makeDeepCopy'](this);_0x51a3e8[_0x51cfe1(0x212)]=!![],VisuMZ[_0x51cfe1(0x3f9)][_0x51cfe1(0x2ce)][_0x51cfe1(0x2ba)](this,_0x39f7c4),this[_0x51cfe1(0x2f2)](_0x51a3e8);}else VisuMZ[_0x51cfe1(0x3f9)][_0x51cfe1(0x2ce)][_0x51cfe1(0x2ba)](this,_0x39f7c4);},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x44b)]=function(_0x2006d7){const _0x430bc8=_0x2be66f;for(;;){const _0x298565=this[_0x430bc8(0x3e1)](),_0x302e44=this[_0x430bc8(0x42f)]();let _0x17360e=![];for(let _0x35c670=0x0;_0x35c670<_0x302e44[_0x430bc8(0x443)];_0x35c670++){const _0x45b69a=_0x302e44[_0x35c670];if(_0x45b69a&&(!this[_0x430bc8(0x321)](_0x45b69a)||_0x45b69a['etypeId']!==_0x298565[_0x35c670])){!_0x2006d7&&this[_0x430bc8(0x488)](null,_0x45b69a);if(!this[_0x430bc8(0x212)]){const _0x392739=JsonEx[_0x430bc8(0x275)](this);_0x392739['_tempActor']=!![],this['_equips'][_0x35c670][_0x430bc8(0x201)](null),this[_0x430bc8(0x2f2)](_0x392739);}else this[_0x430bc8(0x223)][_0x35c670][_0x430bc8(0x201)](null);_0x17360e=!![];}}if(!_0x17360e)break;}},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x2f2)]=function(_0x450d5f){const _0x407efe=_0x2be66f;if(this['_tempActor'])return;if(!VisuMZ[_0x407efe(0x3f9)][_0x407efe(0x2ec)][_0x407efe(0x3b0)][_0x407efe(0x437)])return;const _0x1b5d18=Math[_0x407efe(0x27b)](_0x450d5f[_0x407efe(0x361)]()*this[_0x407efe(0x1a3)]),_0x3fff37=Math[_0x407efe(0x27b)](_0x450d5f[_0x407efe(0x1ca)]()*this[_0x407efe(0x33d)]);if(this['hp']>0x0)this[_0x407efe(0x37e)](_0x1b5d18);if(this['mp']>0x0)this[_0x407efe(0x360)](_0x3fff37);},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x363)]=function(){const _0x2bd1c4=_0x2be66f,_0xa10f62=this[_0x2bd1c4(0x3e1)]()[_0x2bd1c4(0x443)];for(let _0x490925=0x0;_0x490925<_0xa10f62;_0x490925++){if(this[_0x2bd1c4(0x28f)](_0x490925))this['changeEquip'](_0x490925,null);}},Game_Actor[_0x2be66f(0x3c7)]['isClearEquipOk']=function(_0x31c885){const _0x1942be=_0x2be66f;return this[_0x1942be(0x327)]()['includes'](this[_0x1942be(0x3e1)]()[_0x31c885])?![]:this['isEquipChangeOk'](_0x31c885);},Game_Actor['prototype']['nonRemovableEtypes']=function(){const _0x240c88=_0x2be66f;return VisuMZ[_0x240c88(0x3f9)][_0x240c88(0x2ec)][_0x240c88(0x3b0)][_0x240c88(0x1dd)];},Game_Actor[_0x2be66f(0x3c7)]['optimizeEquipments']=function(){const _0x2be304=_0x2be66f,_0x388fb9=this[_0x2be304(0x3e1)]()[_0x2be304(0x443)];for(let _0x18ba34=0x0;_0x18ba34<_0x388fb9;_0x18ba34++){if(this[_0x2be304(0x432)](_0x18ba34))this['changeEquip'](_0x18ba34,null);}for(let _0x119208=0x0;_0x119208<_0x388fb9;_0x119208++){if(this[_0x2be304(0x432)](_0x119208))this[_0x2be304(0x485)](_0x119208,this['bestEquipItem'](_0x119208));}},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x432)]=function(_0x4f329c){const _0x29a3d7=_0x2be66f;return this[_0x29a3d7(0x301)]()['includes'](this[_0x29a3d7(0x3e1)]()[_0x4f329c])?![]:this['isEquipChangeOk'](_0x4f329c);},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x301)]=function(){const _0xde4f05=_0x2be66f;return VisuMZ[_0xde4f05(0x3f9)][_0xde4f05(0x2ec)][_0xde4f05(0x3b0)]['NonOptimizeETypes'];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x269)]=Game_Actor[_0x2be66f(0x3c7)]['tradeItemWithParty'],Game_Actor[_0x2be66f(0x3c7)]['tradeItemWithParty']=function(_0x337aee,_0x17106d){const _0x50d58e=_0x2be66f;if(this['_tempActor'])return![];$gameTemp[_0x50d58e(0x324)]=!![];const _0x3aa81b=VisuMZ[_0x50d58e(0x3f9)][_0x50d58e(0x269)]['call'](this,_0x337aee,_0x17106d);return $gameTemp[_0x50d58e(0x324)]=![],_0x3aa81b;},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x20d)]=function(_0x5c147a,_0x57ee18){const _0x1abbdd=_0x2be66f,_0x433825=this['getNextAvailableEtypeId'](_0x5c147a);if(_0x433825<0x0)return;const _0x18e591=_0x5c147a===0x1?$dataWeapons[_0x57ee18]:$dataArmors[_0x57ee18];this[_0x1abbdd(0x485)](_0x433825,_0x18e591);},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x377)]=function(_0x387079){const _0x186d01=_0x2be66f;let _0x51f4b7=0x0;const _0x449320=this[_0x186d01(0x3e1)](),_0x536631=this[_0x186d01(0x42f)]();for(let _0x2ea8cc=0x0;_0x2ea8cc<_0x449320[_0x186d01(0x443)];_0x2ea8cc++){if(_0x449320[_0x2ea8cc]===_0x387079){_0x51f4b7=_0x2ea8cc;if(!_0x536631[_0x2ea8cc])return _0x51f4b7;}}return _0x51f4b7;},VisuMZ['ItemsEquipsCore']['Game_Actor_paramPlus']=Game_Actor[_0x2be66f(0x3c7)]['paramPlus'],Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x423)]=function(_0x2d974c){const _0x41cdbd=_0x2be66f;let _0x382ccd=VisuMZ[_0x41cdbd(0x3f9)]['Game_Actor_paramPlus'][_0x41cdbd(0x2ba)](this,_0x2d974c);for(const _0x30a919 of this[_0x41cdbd(0x42f)]()){if(_0x30a919)_0x382ccd+=this['paramPlusItemsEquipsCoreCustomJS'](_0x30a919,_0x2d974c);}return _0x382ccd;},Game_Actor[_0x2be66f(0x3c7)]['paramPlusItemsEquipsCoreCustomJS']=function(_0x552c7e,_0x4de9f1){const _0x5de280=_0x2be66f;if(this[_0x5de280(0x224)])return 0x0;const _0x51eeee=(DataManager[_0x5de280(0x225)](_0x552c7e)?'W%1':_0x5de280(0x4d6))['format'](_0x552c7e['id']),_0x48f933=_0x5de280(0x1c9)[_0x5de280(0x4bd)](_0x51eeee,_0x4de9f1);if(VisuMZ[_0x5de280(0x3f9)]['paramJS'][_0x48f933]){this['_calculatingJSParameters']=!![];const _0x544bd4=VisuMZ[_0x5de280(0x3f9)][_0x5de280(0x385)][_0x48f933]['call'](this,_0x552c7e,_0x4de9f1);return this['_calculatingJSParameters']=![],_0x544bd4;}else return 0x0;},Game_Actor[_0x2be66f(0x3c7)][_0x2be66f(0x1cf)]=function(_0x3cb7a6){const _0x598e01=_0x2be66f;this['_shopStatusMenuMode']=!![],this[_0x598e01(0x2e3)]=_0x3cb7a6;},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x34e)]=Game_Party[_0x2be66f(0x3c7)][_0x2be66f(0x45f)],Game_Party['prototype']['initialize']=function(){const _0x17b6e1=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x17b6e1(0x34e)][_0x17b6e1(0x2ba)](this),this[_0x17b6e1(0x26b)]();},Game_Party[_0x2be66f(0x3c7)][_0x2be66f(0x26b)]=function(){const _0x1e3639=_0x2be66f;this[_0x1e3639(0x33c)]=[];},Game_Party[_0x2be66f(0x3c7)]['isNewItem']=function(_0x57a21e){const _0x3d4400=_0x2be66f;if(!$gameTemp[_0x3d4400(0x436)]())return![];if(this['_newItemsList']===undefined)this['initNewItemsList']();let _0x57d156='';if(DataManager[_0x3d4400(0x351)](_0x57a21e))_0x57d156='item-%1'[_0x3d4400(0x4bd)](_0x57a21e['id']);else{if(DataManager[_0x3d4400(0x225)](_0x57a21e))_0x57d156=_0x3d4400(0x323)[_0x3d4400(0x4bd)](_0x57a21e['id']);else{if(DataManager['isArmor'](_0x57a21e))_0x57d156='armor-%1'[_0x3d4400(0x4bd)](_0x57a21e['id']);else return;}}return this[_0x3d4400(0x33c)]['includes'](_0x57d156);},Game_Party[_0x2be66f(0x3c7)]['setNewItem']=function(_0x4366f4){const _0x1aa81d=_0x2be66f;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x1aa81d(0x33c)]===undefined)this[_0x1aa81d(0x26b)]();let _0x8d7e76='';if(DataManager[_0x1aa81d(0x351)](_0x4366f4))_0x8d7e76=_0x1aa81d(0x3dd)['format'](_0x4366f4['id']);else{if(DataManager[_0x1aa81d(0x225)](_0x4366f4))_0x8d7e76='weapon-%1'[_0x1aa81d(0x4bd)](_0x4366f4['id']);else{if(DataManager[_0x1aa81d(0x1c3)](_0x4366f4))_0x8d7e76=_0x1aa81d(0x4d9)[_0x1aa81d(0x4bd)](_0x4366f4['id']);else return;}}if(!this[_0x1aa81d(0x33c)]['includes'](_0x8d7e76))this[_0x1aa81d(0x33c)][_0x1aa81d(0x1e7)](_0x8d7e76);},Game_Party[_0x2be66f(0x3c7)]['clearNewItem']=function(_0x465c04){const _0x225583=_0x2be66f;if(!$gameTemp[_0x225583(0x436)]())return;if(this[_0x225583(0x33c)]===undefined)this[_0x225583(0x26b)]();let _0x297e4c='';if(DataManager[_0x225583(0x351)](_0x465c04))_0x297e4c=_0x225583(0x3dd)[_0x225583(0x4bd)](_0x465c04['id']);else{if(DataManager[_0x225583(0x225)](_0x465c04))_0x297e4c=_0x225583(0x323)[_0x225583(0x4bd)](_0x465c04['id']);else{if(DataManager[_0x225583(0x1c3)](_0x465c04))_0x297e4c=_0x225583(0x4d9)[_0x225583(0x4bd)](_0x465c04['id']);else return;}}this['_newItemsList']['includes'](_0x297e4c)&&this[_0x225583(0x33c)][_0x225583(0x417)](this[_0x225583(0x33c)][_0x225583(0x221)](_0x297e4c),0x1);},VisuMZ[_0x2be66f(0x3f9)]['Game_Party_gainItem']=Game_Party[_0x2be66f(0x3c7)]['gainItem'],Game_Party['prototype'][_0x2be66f(0x222)]=function(_0x5f37e4,_0x442d43,_0x499565){const _0x352052=_0x2be66f,_0xfd6470=this[_0x352052(0x47f)](_0x5f37e4);VisuMZ[_0x352052(0x3f9)]['Game_Party_gainItem']['call'](this,_0x5f37e4,_0x442d43,_0x499565);if(this[_0x352052(0x47f)](_0x5f37e4)>_0xfd6470)this[_0x352052(0x204)](_0x5f37e4);},Game_Party[_0x2be66f(0x3c7)][_0x2be66f(0x2f4)]=function(_0x2d86d7){const _0x4be51e=_0x2be66f;return DataManager[_0x4be51e(0x268)](_0x2d86d7);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x379)]=Scene_ItemBase[_0x2be66f(0x3c7)]['activateItemWindow'],Scene_ItemBase['prototype']['activateItemWindow']=function(){const _0x32bfc8=_0x2be66f;VisuMZ[_0x32bfc8(0x3f9)][_0x32bfc8(0x379)][_0x32bfc8(0x2ba)](this),this[_0x32bfc8(0x1fb)][_0x32bfc8(0x1be)]();},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x251)]=function(){const _0x1da8e4=_0x2be66f;if(ConfigManager[_0x1da8e4(0x37a)]&&ConfigManager[_0x1da8e4(0x1e2)]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x1da8e4(0x442)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else Scene_ItemBase[_0x1da8e4(0x3c7)]['isRightInputMode'][_0x1da8e4(0x2ba)](this);}},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x3d9)]=function(){const _0x536930=_0x2be66f;if(ConfigManager[_0x536930(0x37a)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x536930(0x1cd)];else{if(this[_0x536930(0x442)]())return this[_0x536930(0x2a2)]()['match'](/RIGHT/i);else Scene_ItemBase[_0x536930(0x3c7)][_0x536930(0x3d9)][_0x536930(0x2ba)](this);}},Scene_Item[_0x2be66f(0x3c7)]['updatedLayoutStyle']=function(){const _0x3ecc3d=_0x2be66f;return VisuMZ[_0x3ecc3d(0x3f9)][_0x3ecc3d(0x2ec)]['ItemScene']['LayoutStyle'];},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x200)]=function(){const _0x328168=_0x2be66f;return this[_0x328168(0x2b6)]&&this[_0x328168(0x2b6)][_0x328168(0x200)]();},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x442)]=function(){const _0x5d0246=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x5d0246(0x2ec)]['ItemScene']['EnableLayout'];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2d7)]=Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x4c0)],Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x4c0)]=function(){const _0xe56b2e=_0x2be66f;VisuMZ[_0xe56b2e(0x3f9)]['Scene_Item_create'][_0xe56b2e(0x2ba)](this),this[_0xe56b2e(0x200)]()&&this[_0xe56b2e(0x227)]();},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x3c4)]=function(){const _0x5a3841=_0x2be66f;return this[_0x5a3841(0x442)]()?this['helpWindowRectItemsEquipsCore']():Scene_ItemBase[_0x5a3841(0x3c7)][_0x5a3841(0x3c4)][_0x5a3841(0x2ba)](this);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x3b7)]=function(){const _0x30e38b=_0x2be66f,_0x11a11f=0x0,_0x57ad6f=this[_0x30e38b(0x234)](),_0x6e6521=Graphics[_0x30e38b(0x22e)],_0x3fb686=this[_0x30e38b(0x4d3)]();return new Rectangle(_0x11a11f,_0x57ad6f,_0x6e6521,_0x3fb686);},VisuMZ[_0x2be66f(0x3f9)]['Scene_Item_createCategoryWindow']=Scene_Item['prototype'][_0x2be66f(0x447)],Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x447)]=function(){const _0x43819f=_0x2be66f;VisuMZ[_0x43819f(0x3f9)][_0x43819f(0x32a)][_0x43819f(0x2ba)](this),this['isUseModernControls']()&&this[_0x43819f(0x1fe)]();},Scene_Item[_0x2be66f(0x3c7)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x781443=_0x2be66f;delete this[_0x781443(0x2b6)]['_handlers']['ok'],delete this[_0x781443(0x2b6)][_0x781443(0x33e)][_0x781443(0x413)];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4c9)]=Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x1e4)],Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x1e4)]=function(){const _0x1f4e57=_0x2be66f;return this[_0x1f4e57(0x442)]()?this[_0x1f4e57(0x461)]():VisuMZ[_0x1f4e57(0x3f9)][_0x1f4e57(0x4c9)]['call'](this);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x461)]=function(){const _0x1f8b6b=_0x2be66f,_0x219c04=0x0,_0x18bb0a=this[_0x1f8b6b(0x266)](),_0x15fdab=Graphics[_0x1f8b6b(0x22e)],_0xca6527=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x219c04,_0x18bb0a,_0x15fdab,_0xca6527);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x210)]=Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x44e)],Scene_Item['prototype'][_0x2be66f(0x44e)]=function(){const _0x436fec=_0x2be66f;VisuMZ[_0x436fec(0x3f9)]['Scene_Item_createItemWindow'][_0x436fec(0x2ba)](this),this['isUseModernControls']()&&this[_0x436fec(0x4cd)](),this[_0x436fec(0x205)]()&&this[_0x436fec(0x1e3)]();},VisuMZ[_0x2be66f(0x3f9)]['Scene_Item_itemWindowRect']=Scene_Item[_0x2be66f(0x3c7)]['itemWindowRect'],Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x458)]=function(){const _0x214855=_0x2be66f;if(this[_0x214855(0x442)]())return this[_0x214855(0x307)]();else{const _0x3384f4=VisuMZ[_0x214855(0x3f9)][_0x214855(0x3bb)][_0x214855(0x2ba)](this);return this[_0x214855(0x205)]()&&this['adjustItemWidthByStatus']()&&(_0x3384f4['width']-=this[_0x214855(0x495)]()),_0x3384f4;}},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x307)]=function(){const _0x7ec89c=_0x2be66f,_0x3e490c=this[_0x7ec89c(0x3d9)]()?this[_0x7ec89c(0x495)]():0x0,_0x5d6b29=this[_0x7ec89c(0x2b6)]['y']+this[_0x7ec89c(0x2b6)][_0x7ec89c(0x49c)],_0x12d7df=Graphics[_0x7ec89c(0x22e)]-this['statusWidth'](),_0x489cac=this[_0x7ec89c(0x45d)]()-_0x5d6b29;return new Rectangle(_0x3e490c,_0x5d6b29,_0x12d7df,_0x489cac);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x4cd)]=function(){const _0x63f6c6=_0x2be66f;this[_0x63f6c6(0x1fb)][_0x63f6c6(0x38b)](_0x63f6c6(0x413),this[_0x63f6c6(0x418)]['bind'](this));},Scene_Item[_0x2be66f(0x3c7)]['allowCreateStatusWindow']=function(){const _0x5d2752=_0x2be66f;return this[_0x5d2752(0x442)]()?!![]:VisuMZ[_0x5d2752(0x3f9)][_0x5d2752(0x2ec)][_0x5d2752(0x4a4)][_0x5d2752(0x240)];},Scene_Item['prototype'][_0x2be66f(0x1c6)]=function(){const _0x1e8895=_0x2be66f;return VisuMZ[_0x1e8895(0x3f9)]['Settings'][_0x1e8895(0x4a4)]['ItemSceneAdjustItemList'];},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x1e3)]=function(){const _0x38e7cd=_0x2be66f,_0x5e77d1=this[_0x38e7cd(0x202)]();this[_0x38e7cd(0x3e7)]=new Window_ShopStatus(_0x5e77d1),this[_0x38e7cd(0x36a)](this[_0x38e7cd(0x3e7)]),this['_itemWindow']['setStatusWindow'](this[_0x38e7cd(0x3e7)]);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x202)]=function(){const _0x34e5a2=_0x2be66f;return this[_0x34e5a2(0x442)]()?this[_0x34e5a2(0x2d1)]():VisuMZ[_0x34e5a2(0x3f9)]['Settings'][_0x34e5a2(0x4a4)]['ItemMenuStatusRect'][_0x34e5a2(0x2ba)](this);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x2d1)]=function(){const _0x232d42=_0x2be66f,_0x5e8d95=this['statusWidth'](),_0xf66b36=this[_0x232d42(0x1fb)][_0x232d42(0x49c)],_0x52a946=this[_0x232d42(0x3d9)]()?0x0:Graphics[_0x232d42(0x22e)]-this['statusWidth'](),_0x40ac16=this[_0x232d42(0x1fb)]['y'];return new Rectangle(_0x52a946,_0x40ac16,_0x5e8d95,_0xf66b36);},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x495)]=function(){const _0x2bf1a2=_0x2be66f;return Scene_Shop[_0x2bf1a2(0x3c7)][_0x2bf1a2(0x495)]();},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x349)]=function(){const _0x407482=_0x2be66f;if(!this[_0x407482(0x2a2)]())return![];if(!this[_0x407482(0x200)]())return![];if(!this[_0x407482(0x1fb)])return![];if(!this[_0x407482(0x1fb)][_0x407482(0x3e6)])return![];return this[_0x407482(0x2a2)]()&&this['isUseModernControls']();},Scene_Item[_0x2be66f(0x3c7)][_0x2be66f(0x42e)]=function(){const _0x455086=_0x2be66f;if(this[_0x455086(0x349)]())return this[_0x455086(0x1fb)][_0x455086(0x38f)]()===0x1?TextManager[_0x455086(0x23d)]('left',_0x455086(0x4a1)):TextManager['getInputMultiButtonStrings'](_0x455086(0x45b),_0x455086(0x4b4));return Scene_ItemBase[_0x455086(0x3c7)][_0x455086(0x42e)]['call'](this);},Scene_Item['prototype'][_0x2be66f(0x383)]=function(){const _0x3a3d6a=_0x2be66f;if(this[_0x3a3d6a(0x349)]())return VisuMZ[_0x3a3d6a(0x3f9)]['Settings'][_0x3a3d6a(0x4a4)][_0x3a3d6a(0x421)];return Scene_ItemBase[_0x3a3d6a(0x3c7)]['buttonAssistText1']['call'](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x251)]=function(){const _0x1a9ddf=_0x2be66f;if(ConfigManager[_0x1a9ddf(0x37a)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x1a9ddf(0x1e2)];else{if(this[_0x1a9ddf(0x442)]())return this[_0x1a9ddf(0x2a2)]()[_0x1a9ddf(0x239)](/LOWER/i);else Scene_MenuBase[_0x1a9ddf(0x3c7)][_0x1a9ddf(0x3d9)][_0x1a9ddf(0x2ba)](this);}},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x3d9)]=function(){const _0x4f6b16=_0x2be66f;if(ConfigManager[_0x4f6b16(0x37a)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x4f6b16(0x442)]())return this[_0x4f6b16(0x2a2)]()[_0x4f6b16(0x239)](/RIGHT/i);else Scene_MenuBase['prototype'][_0x4f6b16(0x3d9)][_0x4f6b16(0x2ba)](this);}},Scene_Equip[_0x2be66f(0x3c7)]['updatedLayoutStyle']=function(){const _0x295792=_0x2be66f;return VisuMZ[_0x295792(0x3f9)]['Settings'][_0x295792(0x3b0)][_0x295792(0x1c4)];},Scene_Equip[_0x2be66f(0x3c7)]['isUseModernControls']=function(){const _0x1c3560=_0x2be66f;return this['_commandWindow']&&this[_0x1c3560(0x369)][_0x1c3560(0x200)]();},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x442)]=function(){const _0x31357d=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x31357d(0x2ec)][_0x31357d(0x3b0)][_0x31357d(0x28e)];},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x415)]=Scene_Equip['prototype'][_0x2be66f(0x4c0)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x4c0)]=function(){const _0x10255d=_0x2be66f;VisuMZ[_0x10255d(0x3f9)][_0x10255d(0x415)][_0x10255d(0x2ba)](this),this[_0x10255d(0x200)]()&&this[_0x10255d(0x25b)]();},Scene_Equip['prototype']['helpWindowRect']=function(){const _0x4cbf1d=_0x2be66f;return this[_0x4cbf1d(0x442)]()?this['helpWindowRectItemsEquipsCore']():Scene_MenuBase['prototype'][_0x4cbf1d(0x3c4)]['call'](this);},Scene_Equip[_0x2be66f(0x3c7)]['helpWindowRectItemsEquipsCore']=function(){const _0x12b2d1=_0x2be66f,_0x10d907=0x0,_0x4f0705=this[_0x12b2d1(0x234)](),_0x2fec10=Graphics['boxWidth'],_0x3bad91=this[_0x12b2d1(0x4d3)]();return new Rectangle(_0x10d907,_0x4f0705,_0x2fec10,_0x3bad91);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4a2)]=Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x202)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x202)]=function(){const _0x3504c2=_0x2be66f;return this[_0x3504c2(0x442)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x3504c2(0x3f9)][_0x3504c2(0x4a2)][_0x3504c2(0x2ba)](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x2d1)]=function(){const _0xc77cd6=_0x2be66f,_0xf9917c=this['isRightInputMode']()?0x0:Graphics[_0xc77cd6(0x22e)]-this['statusWidth'](),_0x41a542=this[_0xc77cd6(0x266)](),_0x5c5d6d=this[_0xc77cd6(0x495)](),_0x48704b=this[_0xc77cd6(0x25e)]();return new Rectangle(_0xf9917c,_0x41a542,_0x5c5d6d,_0x48704b);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x3c9)]=Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x3a7)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x3a7)]=function(){const _0x42d61e=_0x2be66f;return this[_0x42d61e(0x442)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x42d61e(0x3f9)][_0x42d61e(0x3c9)][_0x42d61e(0x2ba)](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x3a2)]=function(){const _0x4ae104=_0x2be66f,_0x399663=VisuMZ['ItemsEquipsCore'][_0x4ae104(0x2ec)]['EquipScene'];return _0x399663['CommandAddOptimize']||_0x399663[_0x4ae104(0x285)];},Scene_Equip['prototype'][_0x2be66f(0x473)]=function(){const _0x5e9b5d=_0x2be66f,_0x54375e=this['shouldCommandWindowExist'](),_0x26dd5=this[_0x5e9b5d(0x3d9)]()?this['statusWidth']():0x0,_0x3412d2=this[_0x5e9b5d(0x266)](),_0x340371=Graphics[_0x5e9b5d(0x22e)]-this[_0x5e9b5d(0x495)](),_0x4cadd2=_0x54375e?this['calcWindowHeight'](0x1,!![]):0x0;return new Rectangle(_0x26dd5,_0x3412d2,_0x340371,_0x4cadd2);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x219)]=Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x49a)],Scene_Equip['prototype'][_0x2be66f(0x49a)]=function(){const _0x2c2fe1=_0x2be66f;VisuMZ[_0x2c2fe1(0x3f9)][_0x2c2fe1(0x219)]['call'](this),this['isUseModernControls']()&&this[_0x2c2fe1(0x3b8)]();},VisuMZ[_0x2be66f(0x3f9)]['Scene_Equip_slotWindowRect']=Scene_Equip['prototype']['slotWindowRect'],Scene_Equip[_0x2be66f(0x3c7)]['slotWindowRect']=function(){const _0x484800=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['slotWindowRectItemsEquipsCore']():VisuMZ[_0x484800(0x3f9)][_0x484800(0x1e6)][_0x484800(0x2ba)](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x1ab)]=function(){const _0x46db9a=_0x2be66f,_0xc50e50=this['commandWindowRect'](),_0x266c8b=this['isRightInputMode']()?this['statusWidth']():0x0,_0x4b2f7d=_0xc50e50['y']+_0xc50e50[_0x46db9a(0x49c)],_0x550a5b=Graphics[_0x46db9a(0x22e)]-this['statusWidth'](),_0x589f11=this[_0x46db9a(0x25e)]()-_0xc50e50[_0x46db9a(0x49c)];return new Rectangle(_0x266c8b,_0x4b2f7d,_0x550a5b,_0x589f11);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x42d)]=Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x458)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x458)]=function(){const _0x23751c=_0x2be66f;return this[_0x23751c(0x442)]()?this['slotWindowRect']():VisuMZ[_0x23751c(0x3f9)]['Scene_Equip_itemWindowRect'][_0x23751c(0x2ba)](this);},Scene_Equip[_0x2be66f(0x3c7)]['statusWidth']=function(){const _0x20bbba=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():VisuMZ[_0x20bbba(0x3f9)][_0x20bbba(0x2ec)]['EquipScene'][_0x20bbba(0x371)];},Scene_Equip[_0x2be66f(0x3c7)]['geUpdatedLayoutStatusWidth']=function(){const _0x1c4d9d=_0x2be66f;return Math['floor'](Graphics[_0x1c4d9d(0x22e)]/0x2);},Scene_Equip['prototype'][_0x2be66f(0x3b8)]=function(){const _0x1e887e=_0x2be66f;this[_0x1e887e(0x314)][_0x1e887e(0x38b)]('cancel',this[_0x1e887e(0x418)][_0x1e887e(0x2dd)](this)),this[_0x1e887e(0x314)]['setHandler'](_0x1e887e(0x4b4),this[_0x1e887e(0x23f)][_0x1e887e(0x2dd)](this)),this[_0x1e887e(0x314)][_0x1e887e(0x38b)](_0x1e887e(0x45b),this[_0x1e887e(0x40e)]['bind'](this));},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x3f4)]=Scene_Equip['prototype'][_0x2be66f(0x25b)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x25b)]=function(){const _0x52ccdb=_0x2be66f;this[_0x52ccdb(0x200)]()&&(this['_commandWindow']['deselect'](),this[_0x52ccdb(0x369)][_0x52ccdb(0x44d)]()),VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip']['call'](this);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x3c2)]=Scene_Equip['prototype'][_0x2be66f(0x318)],Scene_Equip[_0x2be66f(0x3c7)]['onSlotOk']=function(){const _0x2fcc68=_0x2be66f;this['_slotWindow'][_0x2fcc68(0x457)]()>=0x0?(VisuMZ[_0x2fcc68(0x3f9)][_0x2fcc68(0x3c2)][_0x2fcc68(0x2ba)](this),this[_0x2fcc68(0x211)]()):(this[_0x2fcc68(0x314)]['smoothSelect'](0x0),this['_slotWindow']['activate']());},Scene_Equip[_0x2be66f(0x3c7)]['onSlotOkAutoSelect']=function(){const _0x2cb5f6=_0x2be66f,_0x4307ae=this['_slotWindow']['item'](),_0x468a8f=this[_0x2cb5f6(0x1fb)][_0x2cb5f6(0x493)][_0x2cb5f6(0x221)](_0x4307ae),_0x984758=Math['floor'](this[_0x2cb5f6(0x1fb)][_0x2cb5f6(0x4c6)]()/0x2)-0x1;this[_0x2cb5f6(0x1fb)][_0x2cb5f6(0x255)](_0x468a8f>=0x0?_0x468a8f:0x0),this[_0x2cb5f6(0x1fb)][_0x2cb5f6(0x229)](this[_0x2cb5f6(0x1fb)][_0x2cb5f6(0x457)]()-_0x984758);},VisuMZ[_0x2be66f(0x3f9)]['Scene_Equip_onSlotCancel']=Scene_Equip['prototype'][_0x2be66f(0x4a3)],Scene_Equip['prototype'][_0x2be66f(0x4a3)]=function(){const _0x499338=_0x2be66f;VisuMZ[_0x499338(0x3f9)]['Scene_Equip_onSlotCancel'][_0x499338(0x2ba)](this),this[_0x499338(0x200)]()&&(this['_commandWindow'][_0x499338(0x255)](0x0),this[_0x499338(0x314)][_0x499338(0x44d)]());},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4ae)]=Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x2e1)],Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x2e1)]=function(){const _0x176fac=_0x2be66f;VisuMZ[_0x176fac(0x3f9)]['Scene_Equip_onActorChange'][_0x176fac(0x2ba)](this),this[_0x176fac(0x200)]()&&(this[_0x176fac(0x369)][_0x176fac(0x44d)](),this['_commandWindow'][_0x176fac(0x48b)](),this[_0x176fac(0x314)][_0x176fac(0x255)](0x0),this[_0x176fac(0x314)][_0x176fac(0x2de)]());},Scene_Equip[_0x2be66f(0x3c7)]['buttonAssistSlotWindowShift']=function(){const _0x4570f4=_0x2be66f;if(!this[_0x4570f4(0x314)])return![];if(!this[_0x4570f4(0x314)]['active'])return![];return this[_0x4570f4(0x314)][_0x4570f4(0x2f6)]();},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x389)]=function(){const _0x30f783=_0x2be66f;if(this[_0x30f783(0x2fd)]())return TextManager[_0x30f783(0x2f7)](_0x30f783(0x3e3));return Scene_MenuBase[_0x30f783(0x3c7)][_0x30f783(0x389)]['call'](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x2ca)]=function(){const _0x407c92=_0x2be66f;if(this[_0x407c92(0x2fd)]())return VisuMZ[_0x407c92(0x3f9)]['Settings'][_0x407c92(0x3b0)][_0x407c92(0x207)];return Scene_MenuBase[_0x407c92(0x3c7)][_0x407c92(0x2ca)][_0x407c92(0x2ba)](this);},Scene_Equip[_0x2be66f(0x3c7)][_0x2be66f(0x462)]=function(){const _0x2bf734=_0x2be66f;if(this[_0x2bf734(0x2fd)]())return this['_buttonAssistWindow'][_0x2bf734(0x41e)]/0x5/-0x3;return Scene_MenuBase[_0x2bf734(0x3c7)][_0x2bf734(0x462)][_0x2bf734(0x2ba)](this);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2af)]=Scene_Load[_0x2be66f(0x3c7)][_0x2be66f(0x375)],Scene_Load[_0x2be66f(0x3c7)][_0x2be66f(0x375)]=function(){const _0x1c0b3d=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x1c0b3d(0x2af)][_0x1c0b3d(0x2ba)](this),this[_0x1c0b3d(0x1ae)]();},Scene_Load[_0x2be66f(0x3c7)][_0x2be66f(0x1ae)]=function(){const _0x2a40e7=_0x2be66f;if($gameSystem[_0x2a40e7(0x1b4)]()!==$dataSystem[_0x2a40e7(0x1b4)])for(const _0xd6cc9b of $gameActors['_data']){if(_0xd6cc9b)_0xd6cc9b[_0x2a40e7(0x36f)]();}},Scene_Shop['prototype'][_0x2be66f(0x251)]=function(){const _0x36bec7=_0x2be66f;if(ConfigManager[_0x36bec7(0x37a)]&&ConfigManager[_0x36bec7(0x1e2)]!==undefined)return ConfigManager[_0x36bec7(0x1e2)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x36bec7(0x2a2)]()[_0x36bec7(0x239)](/LOWER/i);else Scene_MenuBase['prototype'][_0x36bec7(0x3d9)]['call'](this);}},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3d9)]=function(){const _0xcdc68=_0x2be66f;if(ConfigManager[_0xcdc68(0x37a)]&&ConfigManager[_0xcdc68(0x1cd)]!==undefined)return ConfigManager[_0xcdc68(0x1cd)];else{if(this[_0xcdc68(0x442)]())return this[_0xcdc68(0x2a2)]()[_0xcdc68(0x239)](/RIGHT/i);else Scene_MenuBase[_0xcdc68(0x3c7)]['isRightInputMode'][_0xcdc68(0x2ba)](this);}},Scene_Shop['prototype']['updatedLayoutStyle']=function(){const _0x4350aa=_0x2be66f;return VisuMZ[_0x4350aa(0x3f9)][_0x4350aa(0x2ec)][_0x4350aa(0x265)]['LayoutStyle'];},Scene_Shop[_0x2be66f(0x3c7)]['isUseModernControls']=function(){const _0x5f3643=_0x2be66f;return this[_0x5f3643(0x2b6)]&&this[_0x5f3643(0x2b6)][_0x5f3643(0x200)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x442)]=function(){const _0x3f9d2b=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x3f9d2b(0x2ec)]['ShopScene'][_0x3f9d2b(0x28e)];},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x3be)]=Scene_Shop['prototype'][_0x2be66f(0x3b2)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3b2)]=function(_0x568ffd,_0x1fa139){const _0x577652=_0x2be66f;_0x568ffd=JsonEx['makeDeepCopy'](_0x568ffd),VisuMZ[_0x577652(0x3f9)][_0x577652(0x3be)][_0x577652(0x2ba)](this,_0x568ffd,_0x1fa139),this[_0x577652(0x44c)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x44c)]=function(){const _0x5efd05=_0x2be66f;this['_goodsCount']=0x0;for(const _0x57434d of this[_0x5efd05(0x248)]){this['isGoodShown'](_0x57434d)?this['_goodsCount']++:_0x57434d[0x0]=-0x1;}},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x34a)]=function(_0x1ed9a6){const _0x3749ad=_0x2be66f;if(_0x1ed9a6[0x0]>0x2||_0x1ed9a6[0x0]<0x0)return![];const _0x3ff579=[$dataItems,$dataWeapons,$dataArmors][_0x1ed9a6[0x0]][_0x1ed9a6[0x1]];if(!_0x3ff579)return![];const _0x40c3c9=_0x3ff579[_0x3749ad(0x49d)]||'';if(_0x40c3c9[_0x3749ad(0x239)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1dabbb=JSON[_0x3749ad(0x3c0)]('['+RegExp['$1'][_0x3749ad(0x239)](/\d+/g)+']');for(const _0x2f692f of _0x1dabbb){if(!$gameSwitches[_0x3749ad(0x297)](_0x2f692f))return![];}return!![];}if(_0x40c3c9[_0x3749ad(0x239)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ea5ac=JSON[_0x3749ad(0x3c0)]('['+RegExp['$1'][_0x3749ad(0x239)](/\d+/g)+']');for(const _0x1a06a7 of _0x5ea5ac){if(!$gameSwitches[_0x3749ad(0x297)](_0x1a06a7))return![];}return!![];}if(_0x40c3c9[_0x3749ad(0x239)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19adf0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x21cb5b of _0x19adf0){if($gameSwitches[_0x3749ad(0x297)](_0x21cb5b))return!![];}return![];}if(_0x40c3c9[_0x3749ad(0x239)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x430fde=JSON[_0x3749ad(0x3c0)]('['+RegExp['$1'][_0x3749ad(0x239)](/\d+/g)+']');for(const _0x27fafc of _0x430fde){if(!$gameSwitches[_0x3749ad(0x297)](_0x27fafc))return!![];}return![];}if(_0x40c3c9['match'](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21e212=JSON[_0x3749ad(0x3c0)]('['+RegExp['$1'][_0x3749ad(0x239)](/\d+/g)+']');for(const _0x4a589b of _0x21e212){if(!$gameSwitches[_0x3749ad(0x297)](_0x4a589b))return!![];}return![];}if(_0x40c3c9['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2946fc=JSON[_0x3749ad(0x3c0)]('['+RegExp['$1'][_0x3749ad(0x239)](/\d+/g)+']');for(const _0xab59eb of _0x2946fc){if($gameSwitches[_0x3749ad(0x297)](_0xab59eb))return![];}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x294)]=Scene_Shop[_0x2be66f(0x3c7)]['create'],Scene_Shop[_0x2be66f(0x3c7)]['create']=function(){const _0x31e496=_0x2be66f;VisuMZ[_0x31e496(0x3f9)][_0x31e496(0x294)][_0x31e496(0x2ba)](this),this[_0x31e496(0x442)]()&&this[_0x31e496(0x24b)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x24b)]=function(){const _0x40f983=_0x2be66f;this['_dummyWindow']['hide'](),this[_0x40f983(0x4b1)]['show'](),this[_0x40f983(0x4b1)]['deselect'](),this[_0x40f983(0x3e7)]['show']();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3c4)]=function(){const _0x2bf101=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x2bf101(0x3b7)]():Scene_MenuBase[_0x2bf101(0x3c7)][_0x2bf101(0x3c4)]['call'](this);},Scene_Shop[_0x2be66f(0x3c7)]['helpWindowRectItemsEquipsCore']=function(){const _0x45b6e6=_0x2be66f,_0x4e5fcd=0x0,_0x176727=this[_0x45b6e6(0x234)](),_0x269855=Graphics[_0x45b6e6(0x22e)],_0x372ec1=this['helpAreaHeight']();return new Rectangle(_0x4e5fcd,_0x176727,_0x269855,_0x372ec1);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x41d)]=Scene_Shop[_0x2be66f(0x3c7)]['goldWindowRect'],Scene_Shop['prototype']['goldWindowRect']=function(){const _0x4ade20=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4ade20(0x39a)]():VisuMZ[_0x4ade20(0x3f9)][_0x4ade20(0x41d)][_0x4ade20(0x2ba)](this);},Scene_Shop['prototype'][_0x2be66f(0x39a)]=function(){const _0x4f2a2a=_0x2be66f,_0xd5e6b5=this['mainCommandWidth'](),_0x246f9f=this[_0x4f2a2a(0x4c5)](0x1,!![]),_0x31c452=this[_0x4f2a2a(0x3d9)]()?0x0:Graphics['boxWidth']-_0xd5e6b5,_0x237814=this['mainAreaTop']();return new Rectangle(_0x31c452,_0x237814,_0xd5e6b5,_0x246f9f);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2c5)]=Scene_Shop['prototype'][_0x2be66f(0x3a7)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3a7)]=function(){const _0x51ab3b=_0x2be66f;return this[_0x51ab3b(0x442)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x51ab3b(0x3f9)]['Scene_Shop_commandWindowRect'][_0x51ab3b(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x473)]=function(){const _0x50409b=_0x2be66f,_0x173007=this[_0x50409b(0x3d9)]()?this[_0x50409b(0x30e)]():0x0,_0x438790=this['mainAreaTop'](),_0x318bbd=Graphics[_0x50409b(0x22e)]-this['mainCommandWidth'](),_0x10d6bf=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x173007,_0x438790,_0x318bbd,_0x10d6bf);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x36e)]=Scene_Shop['prototype'][_0x2be66f(0x2a5)],Scene_Shop[_0x2be66f(0x3c7)]['numberWindowRect']=function(){const _0xab8d32=_0x2be66f;return this[_0xab8d32(0x442)]()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0xab8d32(0x3f9)][_0xab8d32(0x36e)][_0xab8d32(0x2ba)](this);},Scene_Shop['prototype']['numberWindowRectItemsEquipsCore']=function(){const _0xad7b5c=_0x2be66f,_0x5bd5cc=this[_0xad7b5c(0x369)]['y']+this['_commandWindow'][_0xad7b5c(0x49c)],_0x394a16=Graphics[_0xad7b5c(0x22e)]-this[_0xad7b5c(0x495)](),_0x7e209=this[_0xad7b5c(0x3d9)]()?Graphics[_0xad7b5c(0x22e)]-_0x394a16:0x0,_0x15bef4=this['mainAreaHeight']()-this[_0xad7b5c(0x369)][_0xad7b5c(0x49c)];return new Rectangle(_0x7e209,_0x5bd5cc,_0x394a16,_0x15bef4);},VisuMZ[_0x2be66f(0x3f9)]['Scene_Shop_statusWindowRect']=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x202)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x202)]=function(){const _0x1fc1be=_0x2be66f;return this[_0x1fc1be(0x442)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x1fc1be(0x3f9)][_0x1fc1be(0x29f)][_0x1fc1be(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x2d1)]=function(){const _0x2a4664=_0x2be66f,_0x15c407=this[_0x2a4664(0x495)](),_0x3c9141=this[_0x2a4664(0x25e)]()-this['_commandWindow'][_0x2a4664(0x49c)],_0x1f9ecf=this[_0x2a4664(0x3d9)]()?0x0:Graphics[_0x2a4664(0x22e)]-_0x15c407,_0x9f9213=this[_0x2a4664(0x369)]['y']+this[_0x2a4664(0x369)]['height'];return new Rectangle(_0x1f9ecf,_0x9f9213,_0x15c407,_0x3c9141);},VisuMZ[_0x2be66f(0x3f9)]['Scene_Shop_buyWindowRect']=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3cd)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3cd)]=function(){const _0x4f2628=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['buyWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect'][_0x4f2628(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x2ae)]=function(){const _0x22407f=_0x2be66f,_0x1ac89d=this['_commandWindow']['y']+this[_0x22407f(0x369)]['height'],_0x155740=Graphics[_0x22407f(0x22e)]-this['statusWidth'](),_0x3c9ce0=this[_0x22407f(0x25e)]()-this[_0x22407f(0x369)][_0x22407f(0x49c)],_0x5c1d40=this[_0x22407f(0x3d9)]()?Graphics[_0x22407f(0x22e)]-_0x155740:0x0;return new Rectangle(_0x5c1d40,_0x1ac89d,_0x155740,_0x3c9ce0);},VisuMZ[_0x2be66f(0x3f9)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x447)],Scene_Shop[_0x2be66f(0x3c7)]['createCategoryWindow']=function(){const _0x1dac90=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x1dac90(0x24d)][_0x1dac90(0x2ba)](this),this[_0x1dac90(0x200)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2a0)]=Scene_Shop['prototype']['categoryWindowRect'],Scene_Shop[_0x2be66f(0x3c7)]['categoryWindowRect']=function(){const _0x3d121c=_0x2be66f;return this[_0x3d121c(0x442)]()?this['categoryWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore']['Scene_Shop_categoryWindowRect'][_0x3d121c(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x461)]=function(){const _0x1df0f2=_0x2be66f,_0x2a778d=this[_0x1df0f2(0x369)]['y'],_0x30262b=this[_0x1df0f2(0x369)]['width'],_0x1b5837=this[_0x1df0f2(0x4c5)](0x1,!![]),_0x2aa812=this[_0x1df0f2(0x3d9)]()?Graphics['boxWidth']-_0x30262b:0x0;return new Rectangle(_0x2aa812,_0x2a778d,_0x30262b,_0x1b5837);},Scene_Shop['prototype']['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x56bf0f=_0x2be66f;delete this['_categoryWindow'][_0x56bf0f(0x33e)]['ok'],delete this[_0x56bf0f(0x2b6)][_0x56bf0f(0x33e)][_0x56bf0f(0x413)];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x271)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3e5)],Scene_Shop['prototype'][_0x2be66f(0x3e5)]=function(){const _0x526544=_0x2be66f;VisuMZ[_0x526544(0x3f9)][_0x526544(0x271)][_0x526544(0x2ba)](this),this[_0x526544(0x442)]()&&this[_0x526544(0x3e8)]();},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x20a)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3f6)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3f6)]=function(){const _0x4aeff4=_0x2be66f;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x4aeff4(0x394)]():VisuMZ[_0x4aeff4(0x3f9)][_0x4aeff4(0x20a)]['call'](this);},Scene_Shop[_0x2be66f(0x3c7)]['sellWindowRectItemsEquipsCore']=function(){const _0x5ec1a0=_0x2be66f,_0xed73c9=this['_categoryWindow']['y']+this[_0x5ec1a0(0x2b6)]['height'],_0xe3e104=Graphics[_0x5ec1a0(0x22e)]-this[_0x5ec1a0(0x495)](),_0x1163b8=this[_0x5ec1a0(0x25e)]()-this['_categoryWindow'][_0x5ec1a0(0x49c)],_0x4094a6=this[_0x5ec1a0(0x3d9)]()?Graphics[_0x5ec1a0(0x22e)]-_0xe3e104:0x0;return new Rectangle(_0x4094a6,_0xed73c9,_0xe3e104,_0x1163b8);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3e8)]=function(){const _0x499b87=_0x2be66f;this['_sellWindow'][_0x499b87(0x38d)](this[_0x499b87(0x3e7)]);},Scene_Shop[_0x2be66f(0x3c7)]['statusWidth']=function(){const _0x46bcb4=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x46bcb4(0x2ec)]['StatusWindow'][_0x46bcb4(0x424)];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2fa)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x2bf)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x2bf)]=function(){const _0x5582db=_0x2be66f;VisuMZ[_0x5582db(0x3f9)][_0x5582db(0x2fa)][_0x5582db(0x2ba)](this),this[_0x5582db(0x442)]()&&this[_0x5582db(0x3e7)][_0x5582db(0x48c)]();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x218)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3da)],Scene_Shop['prototype'][_0x2be66f(0x3da)]=function(){const _0x501ece=_0x2be66f;VisuMZ[_0x501ece(0x3f9)][_0x501ece(0x218)][_0x501ece(0x2ba)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x501ece(0x29c)]();},Scene_Shop['prototype']['commandBuyItemsEquipsCore']=function(){const _0x2d52f2=_0x2be66f;this[_0x2d52f2(0x330)]=this[_0x2d52f2(0x330)]||0x0,this[_0x2d52f2(0x4b1)][_0x2d52f2(0x255)](this[_0x2d52f2(0x330)]);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x1e8)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x241)],Scene_Shop['prototype'][_0x2be66f(0x241)]=function(){const _0x40a5a7=_0x2be66f;VisuMZ[_0x40a5a7(0x3f9)]['Scene_Shop_commandSell'][_0x40a5a7(0x2ba)](this),this[_0x40a5a7(0x442)]()&&this['commandSellItemsEquipsCore'](),this[_0x40a5a7(0x200)]()&&(this[_0x40a5a7(0x2b6)][_0x40a5a7(0x255)](0x0),this[_0x40a5a7(0x227)]());},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x444)]=function(){const _0x5b963f=_0x2be66f;this[_0x5b963f(0x4b1)][_0x5b963f(0x1e5)](),this['_commandWindow']['hide']();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4bc)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3a5)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3a5)]=function(){const _0x147931=_0x2be66f;VisuMZ[_0x147931(0x3f9)][_0x147931(0x4bc)][_0x147931(0x2ba)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x147931(0x31a)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x31a)]=function(){const _0x477c2f=_0x2be66f;this[_0x477c2f(0x330)]=this[_0x477c2f(0x4b1)]['index'](),this[_0x477c2f(0x4b1)]['show'](),this[_0x477c2f(0x4b1)][_0x477c2f(0x48b)](),this['_buyWindow'][_0x477c2f(0x427)](0x0,0x0),this['_statusWindow'][_0x477c2f(0x48c)](),this[_0x477c2f(0x480)][_0x477c2f(0x1e5)]();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2b8)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x1b9)],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x1b9)]=function(){const _0x479ee0=_0x2be66f;VisuMZ[_0x479ee0(0x3f9)][_0x479ee0(0x2b8)][_0x479ee0(0x2ba)](this),this[_0x479ee0(0x442)]()&&this[_0x479ee0(0x21c)]();},Scene_Shop['prototype'][_0x2be66f(0x21c)]=function(){const _0x510d65=_0x2be66f;this['_buyWindow']['show'](),this[_0x510d65(0x369)][_0x510d65(0x48c)]();},VisuMZ[_0x2be66f(0x3f9)]['Scene_Shop_onSellOk']=Scene_Shop['prototype']['onSellOk'],Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x208)]=function(){const _0x390fb9=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x390fb9(0x282)][_0x390fb9(0x2ba)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x390fb9(0x236)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x236)]=function(){const _0x5da6b6=_0x2be66f;this[_0x5da6b6(0x2b6)][_0x5da6b6(0x48c)]();},VisuMZ[_0x2be66f(0x3f9)]['Scene_Shop_onSellCancel']=Scene_Shop['prototype']['onSellCancel'],Scene_Shop['prototype'][_0x2be66f(0x431)]=function(){const _0x5265f2=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x5265f2(0x3f2)][_0x5265f2(0x2ba)](this),this['isUseModernControls']()&&this[_0x5265f2(0x1b9)](),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5265f2(0x480)][_0x5265f2(0x1e5)]();},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x4d2)]=Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x2c0)],Scene_Shop['prototype'][_0x2be66f(0x2c0)]=function(){const _0x4fb46f=_0x2be66f;let _0x4886ba=this[_0x4fb46f(0x1db)]();const _0x464b6a=this['_item'];return _0x4886ba=VisuMZ[_0x4fb46f(0x3f9)][_0x4fb46f(0x2ec)][_0x4fb46f(0x265)][_0x4fb46f(0x24a)][_0x4fb46f(0x2ba)](this,_0x464b6a,_0x4886ba),_0x4886ba;},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x1db)]=function(){const _0x1b989e=_0x2be66f;if(!this[_0x1b989e(0x216)])return 0x0;else{if(this['_item'][_0x1b989e(0x49d)][_0x1b989e(0x239)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x214390=String(RegExp['$1']);let _0x21b5e6=this['_item'],_0x288a6b=_0x21b5e6[_0x1b989e(0x3ca)]*this['sellPriceRate']();try{eval(_0x214390);}catch(_0x4d61ad){if($gameTemp[_0x1b989e(0x2da)]())console[_0x1b989e(0x3ac)](_0x4d61ad);}if(isNaN(_0x288a6b))_0x288a6b=0x0;return Math[_0x1b989e(0x2aa)](_0x288a6b);}else return this[_0x1b989e(0x216)][_0x1b989e(0x49d)][_0x1b989e(0x239)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math[_0x1b989e(0x2aa)](this['_item'][_0x1b989e(0x3ca)]*this[_0x1b989e(0x342)]());}},Scene_Shop['prototype'][_0x2be66f(0x342)]=function(){const _0x1ee0db=_0x2be66f;return VisuMZ[_0x1ee0db(0x3f9)]['Settings'][_0x1ee0db(0x265)][_0x1ee0db(0x42a)];},Scene_Shop['prototype'][_0x2be66f(0x349)]=function(){const _0x2c78a5=_0x2be66f;if(!this[_0x2c78a5(0x2a2)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x2c78a5(0x20b)])return![];if(!this[_0x2c78a5(0x20b)]['active'])return![];return this['updatedLayoutStyle']()&&this[_0x2c78a5(0x200)]();},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x42e)]=function(){const _0x12e73a=_0x2be66f;if(this['buttonAssistItemListRequirement']())return this[_0x12e73a(0x20b)][_0x12e73a(0x38f)]()===0x1?TextManager['getInputMultiButtonStrings'](_0x12e73a(0x283),_0x12e73a(0x4a1)):TextManager['getInputMultiButtonStrings'](_0x12e73a(0x45b),'pagedown');else{if(this[_0x12e73a(0x1ce)]&&this[_0x12e73a(0x1ce)][_0x12e73a(0x3e6)])return TextManager[_0x12e73a(0x23d)](_0x12e73a(0x283),'right');}return Scene_MenuBase[_0x12e73a(0x3c7)][_0x12e73a(0x42e)]['call'](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x260)]=function(){const _0x1c11d7=_0x2be66f;if(this[_0x1c11d7(0x1ce)]&&this[_0x1c11d7(0x1ce)][_0x1c11d7(0x3e6)])return TextManager[_0x1c11d7(0x23d)]('up',_0x1c11d7(0x32c));return Scene_MenuBase[_0x1c11d7(0x3c7)][_0x1c11d7(0x260)][_0x1c11d7(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x383)]=function(){const _0x3be881=_0x2be66f;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x3be881(0x3f9)][_0x3be881(0x2ec)][_0x3be881(0x4a4)][_0x3be881(0x421)];else{if(this['_numberWindow']&&this[_0x3be881(0x1ce)][_0x3be881(0x3e6)])return VisuMZ[_0x3be881(0x3f9)]['Settings'][_0x3be881(0x265)]['buttonAssistSmallIncrement'];}return Scene_MenuBase[_0x3be881(0x3c7)][_0x3be881(0x383)][_0x3be881(0x2ba)](this);},Scene_Shop[_0x2be66f(0x3c7)][_0x2be66f(0x3c5)]=function(){const _0x5c2066=_0x2be66f;if(this[_0x5c2066(0x1ce)]&&this[_0x5c2066(0x1ce)]['active'])return VisuMZ[_0x5c2066(0x3f9)]['Settings'][_0x5c2066(0x265)][_0x5c2066(0x40b)];return Scene_MenuBase['prototype'][_0x5c2066(0x3c5)][_0x5c2066(0x2ba)](this);};function Sprite_NewLabel(){this['initialize'](...arguments);}Sprite_NewLabel[_0x2be66f(0x3c7)]=Object[_0x2be66f(0x4c0)](Sprite[_0x2be66f(0x3c7)]),Sprite_NewLabel[_0x2be66f(0x3c7)]['constructor']=Sprite_NewLabel,Sprite_NewLabel[_0x2be66f(0x3c7)][_0x2be66f(0x45f)]=function(){const _0xbcec25=_0x2be66f;Sprite['prototype'][_0xbcec25(0x45f)][_0xbcec25(0x2ba)](this),this[_0xbcec25(0x416)]();},Sprite_NewLabel[_0x2be66f(0x3c7)]['createBitmap']=function(){const _0x4abbc3=_0x2be66f,_0x4825f0=ImageManager[_0x4abbc3(0x2cf)],_0x409895=ImageManager[_0x4abbc3(0x398)];this[_0x4abbc3(0x2ea)]=new Bitmap(_0x4825f0,_0x409895),this[_0x4abbc3(0x1f5)](),this[_0x4abbc3(0x3ff)]();},Sprite_NewLabel[_0x2be66f(0x3c7)][_0x2be66f(0x1f5)]=function(){const _0xf8543b=_0x2be66f,_0x33fd47=VisuMZ[_0xf8543b(0x3f9)]['Settings'][_0xf8543b(0x4c1)][_0xf8543b(0x3f0)];if(_0x33fd47<=0x0)return;const _0x5690c8=ImageManager['loadSystem']('IconSet'),_0x26d1ae=ImageManager[_0xf8543b(0x2cf)],_0xcdfff5=ImageManager[_0xf8543b(0x398)],_0x4047db=_0x33fd47%0x10*_0x26d1ae,_0x13eb4f=Math[_0xf8543b(0x2aa)](_0x33fd47/0x10)*_0xcdfff5;this[_0xf8543b(0x2ea)][_0xf8543b(0x299)](_0x5690c8,_0x4047db,_0x13eb4f,_0x26d1ae,_0xcdfff5,0x0,0x0);},Sprite_NewLabel['prototype']['drawNewLabelText']=function(){const _0x552bfb=_0x2be66f,_0x2d13e5=VisuMZ[_0x552bfb(0x3f9)]['Settings'][_0x552bfb(0x4c1)],_0x148a3d=_0x2d13e5[_0x552bfb(0x1a9)];if(_0x148a3d==='')return;const _0x5a2d3b=ImageManager[_0x552bfb(0x2cf)],_0x3e0559=ImageManager[_0x552bfb(0x398)];this['bitmap'][_0x552bfb(0x4b0)]=_0x2d13e5[_0x552bfb(0x403)]||$gameSystem['mainFontFace'](),this['bitmap'][_0x552bfb(0x367)]=this[_0x552bfb(0x359)](),this[_0x552bfb(0x2ea)][_0x552bfb(0x4c2)]=_0x2d13e5[_0x552bfb(0x247)],this[_0x552bfb(0x2ea)]['drawText'](_0x148a3d,0x0,_0x3e0559/0x2,_0x5a2d3b,_0x3e0559/0x2,_0x552bfb(0x3de));},Sprite_NewLabel['prototype'][_0x2be66f(0x359)]=function(){const _0x326728=_0x2be66f,_0x1570ef=VisuMZ[_0x326728(0x3f9)]['Settings']['New'][_0x326728(0x4b5)];return _0x1570ef[_0x326728(0x239)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x326728(0x367)](_0x1570ef);},Window_Base['prototype'][_0x2be66f(0x3ae)]=function(_0x1ef0ca,_0x58921d,_0x45a6e2,_0x10bf1e){const _0x2d77af=_0x2be66f;if(_0x1ef0ca){const _0x329c0a=_0x45a6e2+(this['lineHeight']()-ImageManager[_0x2d77af(0x398)])/0x2,_0x574402=ImageManager[_0x2d77af(0x2cf)]+0x4,_0x288a3c=Math[_0x2d77af(0x470)](0x0,_0x10bf1e-_0x574402);this[_0x2d77af(0x2e6)](ColorManager[_0x2d77af(0x217)](_0x1ef0ca)),this[_0x2d77af(0x47a)](_0x1ef0ca[_0x2d77af(0x3e0)],_0x58921d,_0x329c0a),this[_0x2d77af(0x3db)](_0x1ef0ca[_0x2d77af(0x3f8)],_0x58921d+_0x574402,_0x45a6e2,_0x288a3c),this[_0x2d77af(0x4bf)]();}},Window_Base[_0x2be66f(0x3c7)]['drawItemNumber']=function(_0x401140,_0x2c9549,_0x956bea,_0x302575){const _0x48a42f=_0x2be66f;if(this[_0x48a42f(0x2cd)](_0x401140)){this[_0x48a42f(0x3fb)]();const _0x27ca16=VisuMZ['ItemsEquipsCore'][_0x48a42f(0x2ec)][_0x48a42f(0x4a4)],_0x5158fb=_0x27ca16[_0x48a42f(0x3cf)],_0x4ce7d7=_0x5158fb['format']($gameParty[_0x48a42f(0x47f)](_0x401140));this['contents'][_0x48a42f(0x4c2)]=_0x27ca16[_0x48a42f(0x40c)],this['drawText'](_0x4ce7d7,_0x2c9549,_0x956bea,_0x302575,'right'),this[_0x48a42f(0x3fb)]();}},Window_Base[_0x2be66f(0x3c7)][_0x2be66f(0x2cd)]=function(_0x2c4f2f){const _0x94d963=_0x2be66f;if(DataManager[_0x94d963(0x1d1)](_0x2c4f2f))return $dataSystem[_0x94d963(0x340)];return!![];},Window_Base[_0x2be66f(0x3c7)][_0x2be66f(0x2f8)]=function(_0x54afee,_0x23b4cd,_0x4d729f,_0x2b3f19,_0x14511a){const _0x1a3eec=_0x2be66f;_0x14511a=Math['max'](_0x14511a||0x1,0x1);while(_0x14511a--){_0x2b3f19=_0x2b3f19||this['lineHeight'](),this[_0x1a3eec(0x1fa)][_0x1a3eec(0x2a7)]=0xa0;const _0x16dffe=ColorManager[_0x1a3eec(0x396)]();this[_0x1a3eec(0x1fa)][_0x1a3eec(0x22a)](_0x54afee+0x1,_0x23b4cd+0x1,_0x4d729f-0x2,_0x2b3f19-0x2,_0x16dffe),this[_0x1a3eec(0x1fa)][_0x1a3eec(0x2a7)]=0xff;}},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x2f9)]=Window_Selectable[_0x2be66f(0x3c7)]['initialize'],Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x45f)]=function(_0x104981){const _0x73e995=_0x2be66f;this[_0x73e995(0x4cf)](),VisuMZ[_0x73e995(0x3f9)]['Window_Selectable_initialize']['call'](this,_0x104981);},Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x4cf)]=function(){const _0x3b3a4e=_0x2be66f;this['_newLabelSprites']={},this[_0x3b3a4e(0x3d3)]=0xff,this[_0x3b3a4e(0x48e)]=VisuMZ[_0x3b3a4e(0x3f9)][_0x3b3a4e(0x2ec)][_0x3b3a4e(0x4c1)][_0x3b3a4e(0x2b0)],this[_0x3b3a4e(0x1d8)]=VisuMZ[_0x3b3a4e(0x3f9)][_0x3b3a4e(0x2ec)]['New'][_0x3b3a4e(0x420)];},Window_Selectable[_0x2be66f(0x3c7)]['isShowNew']=function(){return![];},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x482)]=Window_Selectable['prototype'][_0x2be66f(0x3a9)],Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x3a9)]=function(_0x37470a){const _0xcbf200=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0xcbf200(0x482)]['call'](this,_0x37470a);if(this[_0xcbf200(0x27d)]())this[_0xcbf200(0x422)](_0x37470a);},Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x422)]=function(_0x4bb1a7){const _0x25416c=_0x2be66f;if(!_0x4bb1a7)return;$gameParty[_0x25416c(0x2a1)](_0x4bb1a7);let _0xca4c4e='';if(DataManager[_0x25416c(0x351)](_0x4bb1a7))_0xca4c4e=_0x25416c(0x3dd)[_0x25416c(0x4bd)](_0x4bb1a7['id']);else{if(DataManager[_0x25416c(0x225)](_0x4bb1a7))_0xca4c4e=_0x25416c(0x323)[_0x25416c(0x4bd)](_0x4bb1a7['id']);else{if(DataManager[_0x25416c(0x1c3)](_0x4bb1a7))_0xca4c4e='armor-%1'[_0x25416c(0x4bd)](_0x4bb1a7['id']);else return;}}const _0x3d8088=this[_0x25416c(0x1f9)][_0xca4c4e];if(_0x3d8088)_0x3d8088[_0x25416c(0x1e5)]();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4dd)]=Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x4cb)],Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x4cb)]=function(){const _0x44bdb2=_0x2be66f;this['hideNewLabelSprites'](),VisuMZ['ItemsEquipsCore'][_0x44bdb2(0x4dd)][_0x44bdb2(0x2ba)](this);},Window_Selectable['prototype'][_0x2be66f(0x449)]=function(){const _0x4ada0b=_0x2be66f;for(const _0x2d69f8 of Object[_0x4ada0b(0x303)](this['_newLabelSprites'])){_0x2d69f8[_0x4ada0b(0x1e5)]();}},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x1e9)]=Window_Selectable['prototype'][_0x2be66f(0x358)],Window_Selectable[_0x2be66f(0x3c7)]['update']=function(){const _0x5dcf39=_0x2be66f;this[_0x5dcf39(0x22f)](),VisuMZ['ItemsEquipsCore']['Window_Selectable_update'][_0x5dcf39(0x2ba)](this);},Window_Selectable['prototype'][_0x2be66f(0x22f)]=function(){const _0x55b608=_0x2be66f;if(!this[_0x55b608(0x27d)]())return;const _0x33c0af=this[_0x55b608(0x1d8)];this[_0x55b608(0x3d3)]+=this[_0x55b608(0x48e)];(this['_newLabelOpacity']>=_0x33c0af||this[_0x55b608(0x3d3)]<=0x0)&&(this[_0x55b608(0x48e)]*=-0x1);this[_0x55b608(0x3d3)]=this[_0x55b608(0x3d3)]['clamp'](0x0,_0x33c0af);for(const _0x47e42a of Object[_0x55b608(0x303)](this['_newLabelSprites'])){_0x47e42a[_0x55b608(0x1fd)]=this[_0x55b608(0x3d3)];}},Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x22d)]=function(_0x8a9501){const _0x55e5a4=_0x2be66f,_0x2eef08=this[_0x55e5a4(0x1f9)];if(_0x2eef08[_0x8a9501])return _0x2eef08[_0x8a9501];else{const _0x5f5cc3=new Sprite_NewLabel();return _0x2eef08[_0x8a9501]=_0x5f5cc3,this[_0x55e5a4(0x1a1)](_0x5f5cc3),_0x5f5cc3;}},Window_Selectable[_0x2be66f(0x3c7)][_0x2be66f(0x27f)]=function(_0x2e1b0b,_0x2555c1,_0x55b789){const _0x520a2a=_0x2be66f;let _0x55f062='';if(DataManager[_0x520a2a(0x351)](_0x2e1b0b))_0x55f062=_0x520a2a(0x3dd)[_0x520a2a(0x4bd)](_0x2e1b0b['id']);else{if(DataManager[_0x520a2a(0x225)](_0x2e1b0b))_0x55f062=_0x520a2a(0x323)['format'](_0x2e1b0b['id']);else{if(DataManager[_0x520a2a(0x1c3)](_0x2e1b0b))_0x55f062=_0x520a2a(0x4d9)[_0x520a2a(0x4bd)](_0x2e1b0b['id']);else return;}}const _0x5c48e7=this[_0x520a2a(0x22d)](_0x55f062);_0x5c48e7[_0x520a2a(0x2c4)](_0x2555c1,_0x55b789),_0x5c48e7[_0x520a2a(0x48c)](),_0x5c48e7[_0x520a2a(0x1fd)]=this[_0x520a2a(0x3d3)];},Window_ItemCategory['categoryList']=VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2ec)][_0x2be66f(0x23e)][_0x2be66f(0x4a8)],Window_ItemCategory[_0x2be66f(0x2d6)]=[_0x2be66f(0x295),_0x2be66f(0x4d0),_0x2be66f(0x45a),'Consumable','AlwaysUsable',_0x2be66f(0x1a6),'FieldUsable',_0x2be66f(0x43a)],VisuMZ['ItemsEquipsCore']['Window_ItemCategory_initialize']=Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x45f)],Window_ItemCategory['prototype'][_0x2be66f(0x45f)]=function(_0x10a3bb){const _0x2f4b78=_0x2be66f;VisuMZ[_0x2f4b78(0x3f9)][_0x2f4b78(0x1dc)]['call'](this,_0x10a3bb),this['createCategoryNameWindow'](_0x10a3bb);},Window_ItemCategory['prototype']['createCategoryNameWindow']=function(_0xa769eb){const _0x48634c=_0x2be66f,_0x73ebd4=new Rectangle(0x0,0x0,_0xa769eb[_0x48634c(0x41e)],_0xa769eb[_0x48634c(0x49c)]);this['_categoryNameWindow']=new Window_Base(_0x73ebd4),this[_0x48634c(0x40d)][_0x48634c(0x1fd)]=0x0,this[_0x48634c(0x490)](this[_0x48634c(0x40d)]),this[_0x48634c(0x1d3)]();},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x200)]=function(){const _0x886566=_0x2be66f;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x886566(0x3c7)][_0x886566(0x200)][_0x886566(0x2ba)](this);},Window_ItemCategory['prototype']['processCursorHomeEndTrigger']=function(){},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x2ac)]=function(){const _0x1e268d=_0x2be66f;if(!this[_0x1e268d(0x200)]())Window_HorzCommand['prototype'][_0x1e268d(0x2ac)][_0x1e268d(0x2ba)](this);},Window_ItemCategory[_0x2be66f(0x3c7)]['maxCols']=function(){const _0x2187a9=_0x2be66f;return this[_0x2187a9(0x384)]?this[_0x2187a9(0x2f4)]():0x4;},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x358)]=function(){const _0x46a635=_0x2be66f;Window_HorzCommand['prototype']['update']['call'](this),this[_0x46a635(0x1fb)]&&this['_itemWindow']['setCategory'](this[_0x46a635(0x4cc)]());},Window_ItemCategory[_0x2be66f(0x3c7)]['processCursorMoveModernControls']=function(){const _0x1fb732=_0x2be66f;if(this[_0x1fb732(0x1a4)]()){const _0x30e959=this[_0x1fb732(0x457)]();if(this[_0x1fb732(0x1fb)]&&this[_0x1fb732(0x1fb)][_0x1fb732(0x38f)]()<=0x1)Input['isRepeated'](_0x1fb732(0x4a1))&&this['cursorRight'](Input[_0x1fb732(0x4da)](_0x1fb732(0x4a1))),Input[_0x1fb732(0x1f3)](_0x1fb732(0x283))&&this[_0x1fb732(0x4bb)](Input[_0x1fb732(0x4da)]('left'));else this[_0x1fb732(0x1fb)]&&this['_itemWindow'][_0x1fb732(0x38f)]()>0x1&&(Input['isRepeated'](_0x1fb732(0x4b4))&&!Input['isPressed'](_0x1fb732(0x3e3))&&this[_0x1fb732(0x31c)](Input['isTriggered'](_0x1fb732(0x4b4))),Input[_0x1fb732(0x1f3)](_0x1fb732(0x45b))&&!Input[_0x1fb732(0x4b7)](_0x1fb732(0x3e3))&&this['cursorLeft'](Input[_0x1fb732(0x4da)](_0x1fb732(0x45b))));this[_0x1fb732(0x457)]()!==_0x30e959&&this[_0x1fb732(0x1d0)]();}},Window_ItemCategory['prototype'][_0x2be66f(0x326)]=function(){const _0x4f5034=_0x2be66f;if(this[_0x4f5034(0x200)]())return;Window_HorzCommand[_0x4f5034(0x3c7)][_0x4f5034(0x326)][_0x4f5034(0x2ba)](this);},Window_ItemCategory['prototype'][_0x2be66f(0x3b4)]=function(){const _0x57013b=_0x2be66f;return this[_0x57013b(0x200)]()?![]:Window_HorzCommand[_0x57013b(0x3c7)][_0x57013b(0x3b4)][_0x57013b(0x2ba)](this);},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x263)]=function(){const _0x5c65d9=_0x2be66f;if(this[_0x5c65d9(0x3ef)]()){TouchInput['isTriggered']()&&this[_0x5c65d9(0x414)](!![]);if(TouchInput[_0x5c65d9(0x1a7)]())this['onTouchOk']();else TouchInput[_0x5c65d9(0x334)]()&&this[_0x5c65d9(0x2c3)]();}},Window_ItemCategory[_0x2be66f(0x3c7)]['onTouchSelect']=function(_0xda8e94){const _0x31c928=_0x2be66f;this[_0x31c928(0x200)]()?this[_0x31c928(0x35a)](!![]):Window_HorzCommand['prototype'][_0x31c928(0x414)]['call'](this,_0xda8e94);},Window_ItemCategory[_0x2be66f(0x3c7)]['onTouchSelectModern']=function(_0x352249){const _0x2375b0=_0x2be66f;this[_0x2375b0(0x30f)]=![];if(this[_0x2375b0(0x1a4)]()){const _0xd6d0c0=this[_0x2375b0(0x457)](),_0x7f34f9=this[_0x2375b0(0x1fc)]();_0x7f34f9>=0x0&&_0x7f34f9!==this['index']()&&this[_0x2375b0(0x1b2)](_0x7f34f9),_0x352249&&this[_0x2375b0(0x457)]()!==_0xd6d0c0&&this['playCursorSound']();}},Window_ItemCategory['prototype'][_0x2be66f(0x1a8)]=function(){const _0xa7b439=_0x2be66f;for(const _0x1797d1 of Window_ItemCategory[_0xa7b439(0x35e)]){this[_0xa7b439(0x313)](_0x1797d1);}this[_0xa7b439(0x1b2)](this[_0xa7b439(0x457)]());},Window_ItemCategory[_0x2be66f(0x3c7)]['addItemCategory']=function(_0x4dcfd2){const _0x29b8cc=_0x2be66f,_0x102895=_0x4dcfd2[_0x29b8cc(0x354)],_0x3eccf1=_0x4dcfd2[_0x29b8cc(0x3f0)],_0x487f85=_0x4dcfd2[_0x29b8cc(0x215)]||0x0;if(_0x487f85>0x0&&!$gameSwitches[_0x29b8cc(0x297)](_0x487f85))return;let _0x23155a='',_0x4ccf66=_0x29b8cc(0x2d9),_0x5edcae=_0x102895;if(_0x102895['match'](/Category:(.*)/i))_0x23155a=String(RegExp['$1'])[_0x29b8cc(0x254)]();else{if(Window_ItemCategory[_0x29b8cc(0x2d6)][_0x29b8cc(0x4a0)](_0x102895))_0x23155a=VisuMZ['ItemsEquipsCore'][_0x29b8cc(0x2ec)][_0x29b8cc(0x23e)][_0x102895];else{if([_0x29b8cc(0x2cc),_0x29b8cc(0x38c)][_0x29b8cc(0x4a0)](_0x102895))_0x23155a=TextManager[_0x29b8cc(0x287)];else{if(_0x102895==='KeyItems')_0x23155a=TextManager['keyItem'];else{if(_0x102895===_0x29b8cc(0x316))_0x23155a=TextManager['weapon'];else{if(_0x102895===_0x29b8cc(0x2bb))_0x23155a=TextManager['armor'];else{if(_0x102895[_0x29b8cc(0x239)](/WTYPE:(\d+)/i))_0x23155a=$dataSystem['weaponTypes'][Number(RegExp['$1'])]||'';else{if(_0x102895[_0x29b8cc(0x239)](/ATYPE:(\d+)/i))_0x23155a=$dataSystem['armorTypes'][Number(RegExp['$1'])]||'';else _0x102895[_0x29b8cc(0x239)](/ETYPE:(\d+)/i)&&(_0x23155a=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x3eccf1>0x0&&this[_0x29b8cc(0x425)]()!=='text'&&(_0x23155a=_0x29b8cc(0x1bb)[_0x29b8cc(0x4bd)](_0x3eccf1,_0x23155a)),this[_0x29b8cc(0x36b)](_0x23155a,_0x4ccf66,!![],_0x5edcae);},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x4d4)]=function(){const _0x11ce9c=_0x2be66f;return VisuMZ[_0x11ce9c(0x3f9)][_0x11ce9c(0x2ec)][_0x11ce9c(0x23e)]['TextAlign'];},Window_ItemCategory['prototype'][_0x2be66f(0x43b)]=function(_0x1fefb1){const _0x50c27f=_0x2be66f,_0x2523e5=this[_0x50c27f(0x46f)](_0x1fefb1);if(_0x2523e5===_0x50c27f(0x4b3))this[_0x50c27f(0x3af)](_0x1fefb1);else _0x2523e5===_0x50c27f(0x3c6)?this[_0x50c27f(0x4d8)](_0x1fefb1):Window_HorzCommand['prototype']['drawItem'][_0x50c27f(0x2ba)](this,_0x1fefb1);},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x425)]=function(){const _0x519601=_0x2be66f;return VisuMZ[_0x519601(0x3f9)][_0x519601(0x2ec)]['Categories'][_0x519601(0x328)];},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x46f)]=function(_0x2c4ade){const _0x32d7a5=_0x2be66f;if(_0x2c4ade<0x0)return _0x32d7a5(0x46e);const _0x2ba862=this[_0x32d7a5(0x425)]();if(_0x2ba862!==_0x32d7a5(0x20e))return _0x2ba862;else{const _0x39490=this['commandName'](_0x2c4ade);if(_0x39490[_0x32d7a5(0x239)](/\\I\[(\d+)\]/i)){const _0x12adbf=this[_0x32d7a5(0x3b9)](_0x2c4ade),_0x26aff4=this[_0x32d7a5(0x28d)](_0x39490)[_0x32d7a5(0x41e)];return _0x26aff4<=_0x12adbf[_0x32d7a5(0x41e)]?_0x32d7a5(0x4b3):'icon';}else return _0x32d7a5(0x46e);}},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x3af)]=function(_0x36d65f){const _0x23e07d=_0x2be66f,_0x5b8612=this[_0x23e07d(0x3b9)](_0x36d65f),_0x3bcaaa=this['commandName'](_0x36d65f),_0x4fda29=this[_0x23e07d(0x28d)](_0x3bcaaa)[_0x23e07d(0x41e)];this[_0x23e07d(0x2e4)](this[_0x23e07d(0x312)](_0x36d65f));const _0x5971d5=this[_0x23e07d(0x4d4)]();if(_0x5971d5===_0x23e07d(0x4a1))this[_0x23e07d(0x1ea)](_0x3bcaaa,_0x5b8612['x']+_0x5b8612[_0x23e07d(0x41e)]-_0x4fda29,_0x5b8612['y'],_0x4fda29);else{if(_0x5971d5===_0x23e07d(0x3de)){const _0x1b04c3=_0x5b8612['x']+Math[_0x23e07d(0x2aa)]((_0x5b8612[_0x23e07d(0x41e)]-_0x4fda29)/0x2);this[_0x23e07d(0x1ea)](_0x3bcaaa,_0x1b04c3,_0x5b8612['y'],_0x4fda29);}else this['drawTextEx'](_0x3bcaaa,_0x5b8612['x'],_0x5b8612['y'],_0x4fda29);}},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x4d8)]=function(_0x7f3b8e){const _0x364f81=_0x2be66f,_0x1b143a=this[_0x364f81(0x477)](_0x7f3b8e);if(_0x1b143a[_0x364f81(0x239)](/\\I\[(\d+)\]/i)){const _0x40fc48=Number(RegExp['$1'])||0x0,_0x21fd53=this[_0x364f81(0x3b9)](_0x7f3b8e),_0x4975df=_0x21fd53['x']+Math[_0x364f81(0x2aa)]((_0x21fd53[_0x364f81(0x41e)]-ImageManager[_0x364f81(0x2cf)])/0x2),_0x43a673=_0x21fd53['y']+(_0x21fd53[_0x364f81(0x49c)]-ImageManager[_0x364f81(0x398)])/0x2;this[_0x364f81(0x47a)](_0x40fc48,_0x4975df,_0x43a673);}},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x366)]=Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x270)],Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x270)]=function(_0x5c320c){const _0x537366=_0x2be66f;VisuMZ[_0x537366(0x3f9)]['Window_ItemCategory_setItemWindow'][_0x537366(0x2ba)](this,_0x5c320c),_0x5c320c[_0x537366(0x2b6)]=this;},Window_ItemCategory['prototype'][_0x2be66f(0x1be)]=function(){const _0x262b11=_0x2be66f;Window_HorzCommand[_0x262b11(0x3c7)][_0x262b11(0x1be)][_0x262b11(0x2ba)](this);if(this[_0x262b11(0x40d)])this[_0x262b11(0x1d3)]();},Window_ItemCategory[_0x2be66f(0x3c7)]['updateCategoryNameWindow']=function(){const _0x13b69c=_0x2be66f,_0x3c3db6=this[_0x13b69c(0x40d)];_0x3c3db6[_0x13b69c(0x274)][_0x13b69c(0x333)]();const _0x324b24=this[_0x13b69c(0x46f)](this[_0x13b69c(0x457)]());if(_0x324b24===_0x13b69c(0x3c6)){const _0x38c828=this[_0x13b69c(0x3b9)](this[_0x13b69c(0x457)]());let _0x7c261f=this[_0x13b69c(0x477)](this[_0x13b69c(0x457)]());_0x7c261f=_0x7c261f[_0x13b69c(0x2ab)](/\\I\[(\d+)\]/gi,''),_0x3c3db6[_0x13b69c(0x3fb)](),this[_0x13b69c(0x277)](_0x7c261f,_0x38c828),this['categoryNameWindowDrawText'](_0x7c261f,_0x38c828),this['categoryNameWindowCenter'](_0x7c261f,_0x38c828);}},Window_ItemCategory[_0x2be66f(0x3c7)][_0x2be66f(0x277)]=function(_0x110ac1,_0x1fa096){},Window_ItemCategory[_0x2be66f(0x3c7)]['categoryNameWindowDrawText']=function(_0x9c0166,_0x37f352){const _0x529643=_0x2be66f,_0x467d62=this[_0x529643(0x40d)];_0x467d62[_0x529643(0x3db)](_0x9c0166,0x0,_0x37f352['y'],_0x467d62[_0x529643(0x246)],_0x529643(0x3de));},Window_ItemCategory['prototype']['categoryNameWindowCenter']=function(_0x44de7d,_0x39e301){const _0xcd9054=_0x2be66f,_0x108ae1=this['_categoryNameWindow'],_0x21b421=$gameSystem['windowPadding'](),_0x5f3547=_0x39e301['x']+Math[_0xcd9054(0x2aa)](_0x39e301[_0xcd9054(0x41e)]/0x2)+_0x21b421;_0x108ae1['x']=_0x108ae1['width']/-0x2+_0x5f3547,_0x108ae1['y']=Math['floor'](_0x39e301[_0xcd9054(0x49c)]/0x2);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x34d)]=function(){const _0x4d5638=_0x2be66f;if(this['isCursorMovable']()){const _0xda8629=this[_0x4d5638(0x457)]();if(this[_0x4d5638(0x38f)]()<=0x1)!this[_0x4d5638(0x476)](_0x4d5638(0x4b4))&&Input['isTriggered'](_0x4d5638(0x4b4))&&this['cursorPagedown'](),!this[_0x4d5638(0x476)]('pageup')&&Input[_0x4d5638(0x4da)](_0x4d5638(0x45b))&&this['cursorPageup']();else this[_0x4d5638(0x38f)]()>0x1&&(Input['isRepeated']('right')&&this['cursorRight'](Input[_0x4d5638(0x4da)](_0x4d5638(0x4a1))),Input[_0x4d5638(0x1f3)]('left')&&this[_0x4d5638(0x4bb)](Input['isTriggered']('left')),this['limitedPageUpDownSceneCheck']()?(Input['isTriggered']('pagedown')&&Input['isPressed']('shift')&&this[_0x4d5638(0x24c)](),Input[_0x4d5638(0x4da)]('pageup')&&Input['isPressed']('shift')&&this[_0x4d5638(0x3ea)]()):(Input[_0x4d5638(0x4da)](_0x4d5638(0x4b4))&&this['cursorPagedown'](),Input[_0x4d5638(0x4da)](_0x4d5638(0x45b))&&this[_0x4d5638(0x3ea)]()));Input['isRepeated'](_0x4d5638(0x32c))&&(Input['isPressed']('shift')&&this[_0x4d5638(0x322)]()?this['cursorPagedown']():this[_0x4d5638(0x365)](Input[_0x4d5638(0x4da)](_0x4d5638(0x32c)))),Input['isRepeated']('up')&&(Input['isPressed'](_0x4d5638(0x3e3))&&this['allowShiftScrolling']()?this[_0x4d5638(0x3ea)]():this[_0x4d5638(0x1bd)](Input[_0x4d5638(0x4da)]('up'))),Imported[_0x4d5638(0x253)]&&this['processCursorHomeEndTrigger'](),this[_0x4d5638(0x457)]()!==_0xda8629&&this[_0x4d5638(0x1d0)]();}},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x1d6)]=function(){const _0x1d33b5=_0x2be66f,_0x11f646=SceneManager[_0x1d33b5(0x3d8)],_0x52e123=[Scene_Item,Scene_Shop];return _0x52e123[_0x1d33b5(0x4a0)](_0x11f646[_0x1d33b5(0x387)]);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x2de)]=function(){const _0x104564=_0x2be66f;Window_Selectable[_0x104564(0x3c7)]['activate'][_0x104564(0x2ba)](this),this[_0x104564(0x2b6)]&&this[_0x104564(0x2b6)]['isUseModernControls']()&&this['_categoryWindow'][_0x104564(0x2de)]();},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x44d)]=function(){const _0x1d1fa1=_0x2be66f;Window_Selectable['prototype'][_0x1d1fa1(0x44d)][_0x1d1fa1(0x2ba)](this),this[_0x1d1fa1(0x2b6)]&&this[_0x1d1fa1(0x2b6)]['isUseModernControls']()&&this['_categoryWindow'][_0x1d1fa1(0x44d)]();},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x29a)]=function(_0x7c57c5){const _0x28dde5=_0x2be66f;this['_category']!==_0x7c57c5&&(this['_category']=_0x7c57c5,this[_0x28dde5(0x4cb)](),this[_0x28dde5(0x2b6)]&&this[_0x28dde5(0x2b6)]['isUseModernControls']()?this[_0x28dde5(0x255)](0x0):this[_0x28dde5(0x42c)](0x0,0x0));},VisuMZ[_0x2be66f(0x3f9)]['Window_ItemList_maxCols']=Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x38f)],Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x38f)]=function(){const _0x159c0e=_0x2be66f;if(SceneManager[_0x159c0e(0x3d8)][_0x159c0e(0x387)]===Scene_Battle)return VisuMZ[_0x159c0e(0x3f9)]['Window_ItemList_maxCols']['call'](this);else return SceneManager['_scene'][_0x159c0e(0x387)]===Scene_Map?VisuMZ[_0x159c0e(0x3f9)]['Window_ItemList_maxCols'][_0x159c0e(0x2ba)](this):VisuMZ[_0x159c0e(0x3f9)][_0x159c0e(0x2ec)]['ItemScene'][_0x159c0e(0x39b)];},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x3f1)]=Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x49f)],Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x49f)]=function(){const _0x50a337=_0x2be66f;return this[_0x50a337(0x38f)]()<=0x1?Window_Selectable[_0x50a337(0x3c7)][_0x50a337(0x49f)][_0x50a337(0x2ba)](this):VisuMZ[_0x50a337(0x3f9)][_0x50a337(0x3f1)]['call'](this);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x4a0)]=function(_0x222a6b){const _0x4bb085=_0x2be66f;switch(this[_0x4bb085(0x3ed)]){case _0x4bb085(0x2cc):return DataManager[_0x4bb085(0x351)](_0x222a6b);case _0x4bb085(0x38c):return DataManager[_0x4bb085(0x351)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x426)]===0x1;case'KeyItems':return DataManager[_0x4bb085(0x351)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x426)]===0x2;case _0x4bb085(0x295):return DataManager[_0x4bb085(0x351)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x426)]===0x3;case _0x4bb085(0x4d0):return DataManager[_0x4bb085(0x351)](_0x222a6b)&&_0x222a6b['itypeId']===0x4;case _0x4bb085(0x244):return DataManager['isItem'](_0x222a6b)&&_0x222a6b[_0x4bb085(0x2e2)];case _0x4bb085(0x45a):return DataManager[_0x4bb085(0x351)](_0x222a6b)&&!_0x222a6b[_0x4bb085(0x2e2)];case'AlwaysUsable':return DataManager[_0x4bb085(0x351)](_0x222a6b)&&[0x0]['includes'](_0x222a6b[_0x4bb085(0x4c8)]);case _0x4bb085(0x1a6):return DataManager['isItem'](_0x222a6b)&&[0x0,0x1]['includes'](_0x222a6b[_0x4bb085(0x4c8)]);case _0x4bb085(0x3ec):return DataManager['isItem'](_0x222a6b)&&[0x0,0x2][_0x4bb085(0x4a0)](_0x222a6b[_0x4bb085(0x4c8)]);case _0x4bb085(0x43a):return DataManager[_0x4bb085(0x351)](_0x222a6b)&&[0x3][_0x4bb085(0x4a0)](_0x222a6b[_0x4bb085(0x4c8)]);case'AllWeapons':return DataManager[_0x4bb085(0x225)](_0x222a6b);case _0x4bb085(0x2bb):return DataManager[_0x4bb085(0x1c3)](_0x222a6b);default:if(this[_0x4bb085(0x3ed)][_0x4bb085(0x239)](/WTYPE:(\d+)/i))return DataManager[_0x4bb085(0x225)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x1c5)]===Number(RegExp['$1']);else{if(this[_0x4bb085(0x3ed)][_0x4bb085(0x239)](/WTYPE:(.*)/i)){const _0xf42d72=$dataSystem[_0x4bb085(0x308)][_0x4bb085(0x221)](String(RegExp['$1'])[_0x4bb085(0x254)]());return DataManager[_0x4bb085(0x225)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x1c5)]===_0xf42d72;}else{if(this['_category'][_0x4bb085(0x239)](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x222a6b)&&_0x222a6b['atypeId']===Number(RegExp['$1']);else{if(this['_category'][_0x4bb085(0x239)](/ATYPE:(.*)/i)){const _0xe530ac=$dataSystem[_0x4bb085(0x498)]['indexOf'](String(RegExp['$1'])[_0x4bb085(0x254)]());return DataManager[_0x4bb085(0x1c3)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x278)]===_0xe530ac;}else{if(this[_0x4bb085(0x3ed)][_0x4bb085(0x239)](/ETYPE:(\d+)/i))return!!_0x222a6b&&_0x222a6b[_0x4bb085(0x4af)]===Number(RegExp['$1']);else{if(this['_category'][_0x4bb085(0x239)](/ETYPE:(.*)/i)){const _0x1983af=$dataSystem[_0x4bb085(0x39e)][_0x4bb085(0x221)](String(RegExp['$1'])['trim']());return DataManager[_0x4bb085(0x1c3)](_0x222a6b)&&_0x222a6b[_0x4bb085(0x4af)]===_0x1983af;}else{if(this['_category'][_0x4bb085(0x239)](/Category:(.*)/i))return!!_0x222a6b&&_0x222a6b[_0x4bb085(0x4db)][_0x4bb085(0x4a0)](String(RegExp['$1'])[_0x4bb085(0x1ee)]()[_0x4bb085(0x254)]());}}}}}}}return![];},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x27d)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x3a8)]=Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x43b)],Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x43b)]=function(_0x5afbfb){const _0x20abf4=_0x2be66f;VisuMZ[_0x20abf4(0x3f9)]['Window_ItemList_drawItem'][_0x20abf4(0x2ba)](this,_0x5afbfb),this[_0x20abf4(0x1b1)](_0x5afbfb);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x291)]=function(_0x3522a2,_0x270a53,_0x24b64d,_0x5cdd96){const _0x3d8ab8=_0x2be66f;Window_Selectable[_0x3d8ab8(0x3c7)][_0x3d8ab8(0x291)][_0x3d8ab8(0x2ba)](this,_0x3522a2,_0x270a53,_0x24b64d,_0x5cdd96);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x1b1)]=function(_0x45ae34){const _0x1a7ddb=_0x2be66f,_0x1dc751=this[_0x1a7ddb(0x23a)](_0x45ae34);if(!_0x1dc751||!this[_0x1a7ddb(0x27d)]())return;if(!$gameParty[_0x1a7ddb(0x450)](_0x1dc751))return;const _0x4815ab=this[_0x1a7ddb(0x3b9)](_0x45ae34),_0x1caf09=_0x4815ab['x'],_0x21c530=_0x4815ab['y']+(this[_0x1a7ddb(0x296)]()-ImageManager[_0x1a7ddb(0x398)])/0x2,_0x5f35db=VisuMZ[_0x1a7ddb(0x3f9)]['Settings'][_0x1a7ddb(0x4c1)][_0x1a7ddb(0x47c)],_0x16b932=VisuMZ[_0x1a7ddb(0x3f9)][_0x1a7ddb(0x2ec)]['New'][_0x1a7ddb(0x44f)];this[_0x1a7ddb(0x27f)](_0x1dc751,_0x1caf09+_0x5f35db,_0x21c530+_0x16b932);},Window_ItemList[_0x2be66f(0x3c7)][_0x2be66f(0x38d)]=function(_0x57f6e7){const _0xcb7f82=_0x2be66f;this['_statusWindow']=_0x57f6e7,this[_0xcb7f82(0x1be)]();},VisuMZ[_0x2be66f(0x3f9)]['Window_ItemList_updateHelp']=Window_ItemList[_0x2be66f(0x3c7)]['updateHelp'],Window_ItemList[_0x2be66f(0x3c7)]['updateHelp']=function(){const _0x5c74fe=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x5c74fe(0x1a5)][_0x5c74fe(0x2ba)](this),this['_statusWindow']&&this[_0x5c74fe(0x3e7)][_0x5c74fe(0x387)]===Window_ShopStatus&&this[_0x5c74fe(0x3e7)][_0x5c74fe(0x2cb)](this[_0x5c74fe(0x287)]());},Window_BattleItem[_0x2be66f(0x3c7)][_0x2be66f(0x2c9)]=function(_0x46bac1){const _0xff6c6=_0x2be66f;return BattleManager[_0xff6c6(0x29e)]()?BattleManager['actor']()[_0xff6c6(0x36d)](_0x46bac1):Window_ItemList[_0xff6c6(0x3c7)][_0xff6c6(0x2c9)]['call'](this,_0x46bac1);},Window_EventItem[_0x2be66f(0x3c7)]['isShowNew']=function(){return![];},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x442)]=function(){const _0x53896c=_0x2be66f;return VisuMZ[_0x53896c(0x3f9)][_0x53896c(0x2ec)][_0x53896c(0x3b0)]['EnableLayout'];},VisuMZ[_0x2be66f(0x3f9)]['Window_EquipStatus_refresh']=Window_EquipStatus['prototype']['refresh'],Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4cb)]=function(){const _0x41ed88=_0x2be66f;this['hideAdditionalSprites'](),this[_0x41ed88(0x3fb)]();if(this[_0x41ed88(0x40a)])this[_0x41ed88(0x40a)][_0x41ed88(0x4cb)]();this[_0x41ed88(0x442)]()?this[_0x41ed88(0x34f)]():VisuMZ['ItemsEquipsCore']['Window_EquipStatus_refresh']['call'](this);},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x34f)]=function(){const _0x5bc366=_0x2be66f;this[_0x5bc366(0x274)][_0x5bc366(0x333)]();if(!this[_0x5bc366(0x40a)])return;if(this[_0x5bc366(0x2ee)]()){const _0xd22421=ImageManager[_0x5bc366(0x37d)](this[_0x5bc366(0x40a)]['getMenuImage']());_0xd22421[_0x5bc366(0x3aa)](this[_0x5bc366(0x3fa)][_0x5bc366(0x2dd)](this));}else this[_0x5bc366(0x49b)]();},Window_EquipStatus['prototype']['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x3e9de8=_0x2be66f;return Imported[_0x3e9de8(0x2e9)]&&this['_actor'][_0x3e9de8(0x273)]()!==''&&VisuMZ[_0x3e9de8(0x3f9)]['Settings'][_0x3e9de8(0x3b0)][_0x3e9de8(0x1d9)];},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3fa)]=function(){const _0x57b9b4=_0x2be66f;VisuMZ[_0x57b9b4(0x3f9)]['Settings'][_0x57b9b4(0x3b0)]['DrawPortraitJS'][_0x57b9b4(0x2ba)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x49b)]=function(){const _0x537c20=_0x2be66f;VisuMZ[_0x537c20(0x3f9)]['Settings'][_0x537c20(0x3b0)][_0x537c20(0x37f)][_0x537c20(0x2ba)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus['prototype'][_0x2be66f(0x348)]=function(){const _0x23f628=_0x2be66f;this['resetFontSettings'](),VisuMZ[_0x23f628(0x3f9)][_0x23f628(0x2ec)][_0x23f628(0x3b0)][_0x23f628(0x288)]['call'](this);},Window_EquipStatus['prototype']['drawItemActorMenuImage']=function(_0x216e6f,_0x127bbf,_0x1581a3,_0x49a7ba,_0x4fdf26){const _0x229be6=_0x2be66f,_0x2e53db=ImageManager[_0x229be6(0x37d)](_0x216e6f[_0x229be6(0x273)]()),_0x46e869=this['innerWidth']-_0x2e53db['width'];_0x127bbf+=_0x46e869/0x2;if(_0x46e869<0x0)_0x49a7ba-=_0x46e869;Window_StatusBase[_0x229be6(0x3c7)][_0x229be6(0x24f)][_0x229be6(0x2ba)](this,_0x216e6f,_0x127bbf,_0x1581a3,_0x49a7ba,_0x4fdf26);},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x226)]=function(){const _0x1c3409=_0x2be66f;return Imported[_0x1c3409(0x253)]?VisuMZ[_0x1c3409(0x1eb)][_0x1c3409(0x2ec)][_0x1c3409(0x25c)][_0x1c3409(0x214)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x2be66f(0x3c7)]['paramValueFontSize']=function(){const _0x28052a=_0x2be66f;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x28052a(0x350)];},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x34c)]=function(){const _0x419eb0=_0x2be66f;return Imported[_0x419eb0(0x253)]&&VisuMZ[_0x419eb0(0x1eb)][_0x419eb0(0x2ec)]['Param'][_0x419eb0(0x1d4)];},Window_EquipStatus[_0x2be66f(0x3c7)]['drawUpdatedParamName']=function(_0x162d3d,_0x890a05,_0x42bc7a,_0x5532ff){const _0x1287d0=_0x2be66f,_0x135d8c=this['itemPadding']();Imported[_0x1287d0(0x253)]?this[_0x1287d0(0x304)](_0x890a05+_0x135d8c,_0x42bc7a,_0x5532ff,_0x162d3d,![]):this[_0x1287d0(0x3db)](TextManager[_0x1287d0(0x3d4)](_0x162d3d),_0x890a05+_0x135d8c,_0x42bc7a,_0x5532ff);},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x391)]=function(_0x5c3d90,_0xa14a55,_0x587b4b,_0x54f3c4){const _0x57fd72=_0x2be66f,_0x29b4ef=this[_0x57fd72(0x2d5)]();let _0x4dbc52=0x0;Imported[_0x57fd72(0x253)]?_0x4dbc52=this[_0x57fd72(0x40a)]['paramValueByName'](_0x5c3d90,!![]):_0x4dbc52=this[_0x57fd72(0x40a)][_0x57fd72(0x3d4)](_0x5c3d90);const _0x2fc78f=_0x4dbc52;this[_0x57fd72(0x3db)](_0x4dbc52,_0xa14a55,_0x587b4b,_0x54f3c4-_0x29b4ef,_0x57fd72(0x4a1));},Window_EquipStatus['prototype']['drawUpdatedAfterParamValue']=function(_0xdeb834,_0x24c0cc,_0x4a412f,_0x39b9f9){const _0x288a4c=_0x2be66f,_0x38a0f2=this[_0x288a4c(0x2d5)]();let _0x4073cc=0x0,_0x4b2c6c=0x0,_0x522c33='';if(this[_0x288a4c(0x212)]){Imported['VisuMZ_0_CoreEngine']?(_0x4073cc=this[_0x288a4c(0x40a)][_0x288a4c(0x35f)](_0xdeb834,![]),_0x4b2c6c=this[_0x288a4c(0x212)][_0x288a4c(0x35f)](_0xdeb834,![]),_0x522c33=this[_0x288a4c(0x212)]['paramValueByName'](_0xdeb834,!![])):(_0x4073cc=this['_actor'][_0x288a4c(0x3d4)](_0xdeb834),_0x4b2c6c=this[_0x288a4c(0x212)][_0x288a4c(0x3d4)](_0xdeb834),_0x522c33=this[_0x288a4c(0x212)][_0x288a4c(0x3d4)](_0xdeb834));const _0x116e97=_0x4073cc,_0x1315ee=_0x4b2c6c;diffValue=_0x1315ee-_0x116e97,this[_0x288a4c(0x2e6)](ColorManager['paramchangeTextColor'](diffValue)),this[_0x288a4c(0x3db)](_0x522c33,_0x24c0cc,_0x4a412f,_0x39b9f9-_0x38a0f2,'right');}},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4b6)]=function(_0x398c3c,_0x1c0dc3,_0x429b17,_0x1e835e){const _0x2b8991=_0x2be66f,_0x48ca23=this[_0x2b8991(0x2d5)]();let _0x4d97ac=0x0,_0x23d0c5=0x0,_0x58c14f=![];if(this['_tempActor']){Imported[_0x2b8991(0x253)]?(_0x4d97ac=this[_0x2b8991(0x40a)]['paramValueByName'](_0x398c3c,![]),_0x23d0c5=this['_tempActor']['paramValueByName'](_0x398c3c,![]),_0x58c14f=String(this[_0x2b8991(0x40a)]['paramValueByName'](_0x398c3c,!![]))['match'](/([%％])/i)):(_0x4d97ac=this[_0x2b8991(0x40a)][_0x2b8991(0x3d4)](_0x398c3c),_0x23d0c5=this[_0x2b8991(0x212)][_0x2b8991(0x3d4)](_0x398c3c),_0x58c14f=_0x4d97ac%0x1!==0x0||_0x23d0c5%0x1!==0x0);const _0x1d1118=_0x4d97ac,_0x3a7d9e=_0x23d0c5,_0x44b248=_0x3a7d9e-_0x1d1118;let _0x3e16fe=_0x44b248;if(_0x58c14f)_0x3e16fe=Math[_0x2b8991(0x27b)](_0x44b248*0x64)+'%';_0x44b248!==0x0&&(this['changeTextColor'](ColorManager[_0x2b8991(0x311)](_0x44b248)),_0x3e16fe=(_0x44b248>0x0?_0x2b8991(0x35b):_0x2b8991(0x203))[_0x2b8991(0x4bd)](_0x3e16fe),this['drawText'](_0x3e16fe,_0x1c0dc3+_0x48ca23,_0x429b17,_0x1e835e,'left'));}},Window_EquipStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2f8)]=function(_0x517f54,_0x164e7d,_0x1195a1,_0x14964f,_0x3f5cba){const _0x19d845=_0x2be66f;if(VisuMZ[_0x19d845(0x3f9)][_0x19d845(0x2ec)][_0x19d845(0x3b0)][_0x19d845(0x249)]===![])return;_0x3f5cba=Math[_0x19d845(0x470)](_0x3f5cba||0x1,0x1);while(_0x3f5cba--){_0x14964f=_0x14964f||this[_0x19d845(0x296)](),this[_0x19d845(0x274)][_0x19d845(0x2a7)]=0xa0;const _0x383886=ColorManager[_0x19d845(0x433)]();this[_0x19d845(0x274)][_0x19d845(0x22a)](_0x517f54+0x1,_0x164e7d+0x1,_0x1195a1-0x2,_0x14964f-0x2,_0x383886),this[_0x19d845(0x274)][_0x19d845(0x2a7)]=0xff;}},ColorManager[_0x2be66f(0x433)]=function(){const _0x1bb8ba=_0x2be66f,_0x315e4a=VisuMZ['ItemsEquipsCore'][_0x1bb8ba(0x2ec)][_0x1bb8ba(0x3b0)];let _0x40a28f=_0x315e4a[_0x1bb8ba(0x3cb)]!==undefined?_0x315e4a[_0x1bb8ba(0x3cb)]:0x13;return ColorManager[_0x1bb8ba(0x37c)](_0x40a28f);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2fb)]=Window_EquipCommand['prototype'][_0x2be66f(0x45f)],Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x45f)]=function(_0x27bd96){const _0x2e264b=_0x2be66f;VisuMZ['ItemsEquipsCore'][_0x2e264b(0x2fb)][_0x2e264b(0x2ba)](this,_0x27bd96),this[_0x2e264b(0x1cb)](_0x27bd96);},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1cb)]=function(_0x4ceffb){const _0x4f12bb=_0x2be66f,_0x23ad63=new Rectangle(0x0,0x0,_0x4ceffb[_0x4f12bb(0x41e)],_0x4ceffb['height']);this[_0x4f12bb(0x3e4)]=new Window_Base(_0x23ad63),this[_0x4f12bb(0x3e4)][_0x4f12bb(0x1fd)]=0x0,this[_0x4f12bb(0x490)](this['_commandNameWindow']),this[_0x4f12bb(0x370)]();},Window_EquipCommand[_0x2be66f(0x3c7)]['callUpdateHelp']=function(){const _0x4eb405=_0x2be66f;Window_HorzCommand[_0x4eb405(0x3c7)][_0x4eb405(0x1be)][_0x4eb405(0x2ba)](this);if(this['_commandNameWindow'])this[_0x4eb405(0x370)]();},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x370)]=function(){const _0x3cc796=_0x2be66f,_0x447618=this[_0x3cc796(0x3e4)];_0x447618[_0x3cc796(0x274)][_0x3cc796(0x333)]();const _0x367b8b=this['commandStyleCheck'](this[_0x3cc796(0x457)]());if(_0x367b8b==='icon'){const _0x31a0fe=this[_0x3cc796(0x3b9)](this['index']());let _0x58768e=this['commandName'](this[_0x3cc796(0x457)]());_0x58768e=_0x58768e[_0x3cc796(0x2ab)](/\\I\[(\d+)\]/gi,''),_0x447618[_0x3cc796(0x3fb)](),this[_0x3cc796(0x430)](_0x58768e,_0x31a0fe),this['commandNameWindowDrawText'](_0x58768e,_0x31a0fe),this[_0x3cc796(0x2b1)](_0x58768e,_0x31a0fe);}},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x430)]=function(_0xd602b4,_0xe9ce31){},Window_EquipCommand['prototype'][_0x2be66f(0x1f1)]=function(_0x46196b,_0x2d11b6){const _0x24792e=_0x2be66f,_0x2cb631=this['_commandNameWindow'];_0x2cb631[_0x24792e(0x3db)](_0x46196b,0x0,_0x2d11b6['y'],_0x2cb631[_0x24792e(0x246)],_0x24792e(0x3de));},Window_EquipCommand[_0x2be66f(0x3c7)]['commandNameWindowCenter']=function(_0x6426fc,_0x507f36){const _0x1d9884=_0x2be66f,_0x3a74a2=this[_0x1d9884(0x3e4)],_0x21951c=$gameSystem[_0x1d9884(0x30a)](),_0x512d5e=_0x507f36['x']+Math[_0x1d9884(0x2aa)](_0x507f36[_0x1d9884(0x41e)]/0x2)+_0x21951c;_0x3a74a2['x']=_0x3a74a2[_0x1d9884(0x41e)]/-0x2+_0x512d5e,_0x3a74a2['y']=Math[_0x1d9884(0x2aa)](_0x507f36[_0x1d9884(0x49c)]/0x2);},Window_EquipCommand['prototype']['isUseModernControls']=function(){const _0x2e8d1a=_0x2be66f;return Imported[_0x2e8d1a(0x253)]&&Window_HorzCommand['prototype'][_0x2e8d1a(0x200)][_0x2e8d1a(0x2ba)](this);},Window_EquipCommand['prototype'][_0x2be66f(0x2ac)]=function(){const _0xf2d30=_0x2be66f;if(this['currentSymbol']()===_0xf2d30(0x34b))Window_HorzCommand['prototype']['playOkSound'][_0xf2d30(0x2ba)](this);},Window_EquipCommand['prototype'][_0x2be66f(0x34d)]=function(){const _0x4927bc=_0x2be66f;!this['processCursorSpecialCheckModernControls']()&&Window_HorzCommand[_0x4927bc(0x3c7)]['processCursorMoveModernControls']['call'](this);},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x492)]=function(){const _0x23e7a9=_0x2be66f;if(!this[_0x23e7a9(0x1a4)]())return![];if(SceneManager['_scene']['constructor']!==Scene_Equip)return![];return Input[_0x23e7a9(0x4da)]('down')&&(this[_0x23e7a9(0x1d0)](),SceneManager['_scene'][_0x23e7a9(0x25b)](),SceneManager['_scene'][_0x23e7a9(0x314)][_0x23e7a9(0x255)](-0x1)),![];},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x38f)]=function(){const _0xd9a060=_0x2be66f;return this['_list']?this['_list'][_0xd9a060(0x443)]:0x3;},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x263)]=function(){const _0x30ad33=_0x2be66f;if(this[_0x30ad33(0x405)]()&&this['visible']&&SceneManager[_0x30ad33(0x3d8)][_0x30ad33(0x387)]===Scene_Equip){if(this[_0x30ad33(0x3b4)]()&&TouchInput[_0x30ad33(0x206)]())this[_0x30ad33(0x3ad)](![]);else TouchInput[_0x30ad33(0x4da)]()&&this[_0x30ad33(0x3ad)](!![]);if(TouchInput['isClicked']())this['onTouchOk']();else TouchInput[_0x30ad33(0x334)]()&&this[_0x30ad33(0x2c3)]();}},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x3ad)]=function(_0x1c5a00){const _0x22d760=_0x2be66f;this[_0x22d760(0x30f)]=![];const _0x539dfa=this[_0x22d760(0x457)](),_0x360dd0=this[_0x22d760(0x1fc)](),_0x223062=SceneManager[_0x22d760(0x3d8)][_0x22d760(0x314)];if(_0x223062['isOpen']()&&_0x223062['visible']){if(_0x360dd0>=0x0)_0x360dd0===this[_0x22d760(0x457)]()&&(this['_doubleTouch']=!![]),this[_0x22d760(0x2de)](),this[_0x22d760(0x1b2)](_0x360dd0);else _0x223062[_0x22d760(0x1fc)]()>=0x0&&(this['deactivate'](),this['deselect']());}_0x1c5a00&&this[_0x22d760(0x457)]()!==_0x539dfa&&this[_0x22d760(0x1d0)]();},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1a8)]=function(){const _0x1bc76f=_0x2be66f;this['addEquipCommand'](),this[_0x1bc76f(0x292)](),this[_0x1bc76f(0x338)]();},Window_EquipCommand[_0x2be66f(0x3c7)]['refresh']=function(){const _0x20dc46=_0x2be66f;Window_HorzCommand[_0x20dc46(0x3c7)][_0x20dc46(0x4cb)]['call'](this),this[_0x20dc46(0x261)]();},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x452)]=function(){const _0x351dff=_0x2be66f;if(!this['isEquipCommandAdded']())return;const _0x3223ef=this[_0x351dff(0x1f4)](),_0x378af5=VisuMZ[_0x351dff(0x3f9)][_0x351dff(0x2ec)][_0x351dff(0x3b0)][_0x351dff(0x2e8)],_0x5704fc=_0x3223ef===_0x351dff(0x46e)?TextManager['equip2']:'\x5cI[%1]%2'[_0x351dff(0x4bd)](_0x378af5,TextManager[_0x351dff(0x41b)]),_0xdda004=this['isEquipCommandEnabled']();this[_0x351dff(0x36b)](_0x5704fc,_0x351dff(0x34b),_0xdda004);},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x24e)]=function(){const _0x373133=_0x2be66f;return!this[_0x373133(0x200)]();},Window_EquipCommand[_0x2be66f(0x3c7)]['isEquipCommandEnabled']=function(){return!![];},Window_EquipCommand['prototype'][_0x2be66f(0x292)]=function(){const _0x53be69=_0x2be66f;if(!this['isOptimizeCommandAdded']())return;const _0x20f52d=this[_0x53be69(0x1f4)](),_0x4d2e44=VisuMZ[_0x53be69(0x3f9)]['Settings'][_0x53be69(0x3b0)][_0x53be69(0x1bf)],_0x32093e=_0x20f52d==='text'?TextManager[_0x53be69(0x232)]:'\x5cI[%1]%2'[_0x53be69(0x4bd)](_0x4d2e44,TextManager['optimize']),_0x55b87e=this[_0x53be69(0x4b9)]();this[_0x53be69(0x36b)](_0x32093e,_0x53be69(0x232),_0x55b87e);},Window_EquipCommand['prototype'][_0x2be66f(0x376)]=function(){const _0x241621=_0x2be66f;return VisuMZ[_0x241621(0x3f9)][_0x241621(0x2ec)][_0x241621(0x3b0)]['CommandAddOptimize'];},Window_EquipCommand['prototype'][_0x2be66f(0x4b9)]=function(){return!![];},Window_EquipCommand['prototype'][_0x2be66f(0x338)]=function(){const _0x376c08=_0x2be66f;if(!this['isClearCommandAdded']())return;const _0x4b13c0=this[_0x376c08(0x1f4)](),_0x31518=VisuMZ[_0x376c08(0x3f9)][_0x376c08(0x2ec)][_0x376c08(0x3b0)][_0x376c08(0x2c6)],_0x237500=_0x4b13c0===_0x376c08(0x46e)?TextManager['clear']:'\x5cI[%1]%2'[_0x376c08(0x4bd)](_0x31518,TextManager[_0x376c08(0x333)]),_0x58168f=this[_0x376c08(0x30c)]();this['addCommand'](_0x237500,_0x376c08(0x333),_0x58168f);},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x343)]=function(){const _0x10eee3=_0x2be66f;return VisuMZ[_0x10eee3(0x3f9)][_0x10eee3(0x2ec)][_0x10eee3(0x3b0)][_0x10eee3(0x285)];},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x30c)]=function(){return!![];},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x4d4)]=function(){const _0x37a7e9=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x37a7e9(0x2ec)][_0x37a7e9(0x3b0)][_0x37a7e9(0x3bc)];},Window_EquipCommand[_0x2be66f(0x3c7)]['drawItem']=function(_0x3b7303){const _0x53004f=_0x2be66f,_0x29de33=this[_0x53004f(0x1af)](_0x3b7303);if(_0x29de33===_0x53004f(0x4b3))this[_0x53004f(0x3af)](_0x3b7303);else _0x29de33===_0x53004f(0x3c6)?this['drawItemStyleIcon'](_0x3b7303):Window_HorzCommand[_0x53004f(0x3c7)][_0x53004f(0x43b)][_0x53004f(0x2ba)](this,_0x3b7303);},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1f4)]=function(){const _0x27b4f5=_0x2be66f;return VisuMZ[_0x27b4f5(0x3f9)][_0x27b4f5(0x2ec)][_0x27b4f5(0x3b0)][_0x27b4f5(0x1bc)];},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1af)]=function(_0x39eb76){const _0xc8f3d9=_0x2be66f;if(_0x39eb76<0x0)return _0xc8f3d9(0x46e);const _0x1531b0=this['commandStyle']();if(_0x1531b0!==_0xc8f3d9(0x20e))return _0x1531b0;else{if(this[_0xc8f3d9(0x2f4)]()>0x0){const _0x4f0374=this['commandName'](_0x39eb76);if(_0x4f0374[_0xc8f3d9(0x239)](/\\I\[(\d+)\]/i)){const _0x8530f1=this['itemLineRect'](_0x39eb76),_0x298093=this[_0xc8f3d9(0x28d)](_0x4f0374)[_0xc8f3d9(0x41e)];return _0x298093<=_0x8530f1[_0xc8f3d9(0x41e)]?'iconText':_0xc8f3d9(0x3c6);}}}return'text';},Window_EquipCommand[_0x2be66f(0x3c7)][_0x2be66f(0x3af)]=function(_0x44c91b){const _0x441ba1=_0x2be66f,_0xe36f65=this['itemLineRect'](_0x44c91b),_0x4a5393=this[_0x441ba1(0x477)](_0x44c91b),_0xb5effe=this[_0x441ba1(0x28d)](_0x4a5393)[_0x441ba1(0x41e)];this['changePaintOpacity'](this[_0x441ba1(0x312)](_0x44c91b));const _0x3a1d60=this['itemTextAlign']();if(_0x3a1d60===_0x441ba1(0x4a1))this['drawTextEx'](_0x4a5393,_0xe36f65['x']+_0xe36f65[_0x441ba1(0x41e)]-_0xb5effe,_0xe36f65['y'],_0xb5effe);else{if(_0x3a1d60==='center'){const _0x2f7414=_0xe36f65['x']+Math[_0x441ba1(0x2aa)]((_0xe36f65[_0x441ba1(0x41e)]-_0xb5effe)/0x2);this[_0x441ba1(0x1ea)](_0x4a5393,_0x2f7414,_0xe36f65['y'],_0xb5effe);}else this[_0x441ba1(0x1ea)](_0x4a5393,_0xe36f65['x'],_0xe36f65['y'],_0xb5effe);}},Window_EquipCommand[_0x2be66f(0x3c7)]['drawItemStyleIcon']=function(_0x1edfc3){const _0xb4b103=_0x2be66f;this[_0xb4b103(0x477)](_0x1edfc3)['match'](/\\I\[(\d+)\]/i);const _0x7304bd=Number(RegExp['$1'])||0x0,_0x22d6fc=this[_0xb4b103(0x3b9)](_0x1edfc3),_0x308569=_0x22d6fc['x']+Math[_0xb4b103(0x2aa)]((_0x22d6fc[_0xb4b103(0x41e)]-ImageManager['iconWidth'])/0x2),_0x50185f=_0x22d6fc['y']+(_0x22d6fc[_0xb4b103(0x49c)]-ImageManager['iconHeight'])/0x2;this[_0xb4b103(0x47a)](_0x7304bd,_0x308569,_0x50185f);},Window_EquipSlot['prototype'][_0x2be66f(0x200)]=function(){const _0x1947bc=_0x2be66f;return Imported[_0x1947bc(0x253)]&&Window_HorzCommand[_0x1947bc(0x3c7)][_0x1947bc(0x200)][_0x1947bc(0x2ba)](this);},Window_EquipSlot['prototype']['activate']=function(){const _0x43d9dd=_0x2be66f;Window_StatusBase[_0x43d9dd(0x3c7)][_0x43d9dd(0x2de)][_0x43d9dd(0x2ba)](this),this[_0x43d9dd(0x1be)]();},Window_EquipSlot[_0x2be66f(0x3c7)][_0x2be66f(0x3c8)]=function(){const _0x560085=_0x2be66f;Window_StatusBase[_0x560085(0x3c7)]['processCursorMove'][_0x560085(0x2ba)](this),this[_0x560085(0x243)]();},Window_EquipSlot[_0x2be66f(0x3c7)]['checkShiftRemoveShortcut']=function(){const _0x5b0e8d=_0x2be66f;if(!this[_0x5b0e8d(0x2f6)]())return;if(Input[_0x5b0e8d(0x4da)]('shift')&&this[_0x5b0e8d(0x287)]()){const _0x2ec28f=SceneManager['_scene'][_0x5b0e8d(0x40a)];_0x2ec28f&&(this[_0x5b0e8d(0x45c)](this[_0x5b0e8d(0x457)]())?(this['processShiftRemoveShortcut'](),this['updateHelp']()):this[_0x5b0e8d(0x48a)]());}},Window_EquipSlot[_0x2be66f(0x3c7)][_0x2be66f(0x45c)]=function(_0x3d1f4c){const _0x16d1a3=_0x2be66f,_0x102d0b=SceneManager[_0x16d1a3(0x3d8)][_0x16d1a3(0x40a)];if(!_0x102d0b)return;if(!_0x102d0b['isEquipChangeOk'](this[_0x16d1a3(0x457)]()))return![];const _0x454323=_0x102d0b['equipSlots']()[this[_0x16d1a3(0x457)]()];if(_0x102d0b[_0x16d1a3(0x327)]()['includes'](_0x454323))return![];return!![];;},Window_EquipSlot[_0x2be66f(0x3c7)][_0x2be66f(0x39d)]=function(){const _0x55bc58=_0x2be66f;SoundManager[_0x55bc58(0x23c)]();const _0x5dcfd5=SceneManager['_scene'][_0x55bc58(0x40a)];_0x5dcfd5[_0x55bc58(0x485)](this[_0x55bc58(0x457)](),null),this[_0x55bc58(0x4cb)](),this[_0x55bc58(0x1fb)][_0x55bc58(0x4cb)]();},Window_EquipSlot[_0x2be66f(0x3c7)][_0x2be66f(0x2f6)]=function(){const _0x276212=_0x2be66f;if(!this[_0x276212(0x3e6)])return![];if(!VisuMZ[_0x276212(0x3f9)][_0x276212(0x2ec)][_0x276212(0x3b0)][_0x276212(0x320)])return![];return!![];},Window_EquipSlot[_0x2be66f(0x3c7)]['processCursorMoveModernControls']=function(){const _0xbb03fe=_0x2be66f;!this['processCursorSpecialCheckModernControls']()&&Window_StatusBase['prototype'][_0xbb03fe(0x34d)][_0xbb03fe(0x2ba)](this);},Window_EquipSlot[_0x2be66f(0x3c7)][_0x2be66f(0x492)]=function(){const _0x35b410=_0x2be66f;if(!this[_0x35b410(0x1a4)]())return![];if(SceneManager[_0x35b410(0x3d8)][_0x35b410(0x387)]!==Scene_Equip)return![];if(this['allowCommandWindowCursorUp']())return this[_0x35b410(0x1d0)](),Input[_0x35b410(0x333)](),SceneManager[_0x35b410(0x3d8)][_0x35b410(0x4a3)](),![];else{if(Input['isRepeated'](_0x35b410(0x32c))){const _0x2196a7=this[_0x35b410(0x457)]();return Input[_0x35b410(0x4b7)](_0x35b410(0x3e3))?this['cursorPagedown']():this[_0x35b410(0x365)](Input[_0x35b410(0x4da)](_0x35b410(0x32c))),this[_0x35b410(0x457)]()!==_0x2196a7&&this[_0x35b410(0x1d0)](),!![];}else{if(this[_0x35b410(0x49e)]()&&Input[_0x35b410(0x4da)](_0x35b410(0x3e3)))return!![];}}return![];},Window_EquipSlot[_0x2be66f(0x3c7)]['allowCommandWindowCursorUp']=function(){const _0xa765fc=_0x2be66f;if(this[_0xa765fc(0x457)]()!==0x0)return![];const _0x4e725e=VisuMZ[_0xa765fc(0x3f9)]['Settings'][_0xa765fc(0x3b0)];if(!_0x4e725e[_0xa765fc(0x39f)]&&!_0x4e725e[_0xa765fc(0x285)])return![];return Input[_0xa765fc(0x4da)]('up');},Window_EquipSlot['prototype'][_0x2be66f(0x49e)]=function(){const _0x5dc955=_0x2be66f;return VisuMZ[_0x5dc955(0x3f9)]['Settings']['EquipScene'][_0x5dc955(0x320)];},Window_EquipSlot['prototype'][_0x2be66f(0x263)]=function(){const _0x3b53ab=_0x2be66f;if(this['isOpen']()&&this[_0x3b53ab(0x344)]&&SceneManager[_0x3b53ab(0x3d8)][_0x3b53ab(0x387)]===Scene_Equip){if(this[_0x3b53ab(0x3b4)]()&&TouchInput['isHovered']())this[_0x3b53ab(0x3ad)](![]);else TouchInput[_0x3b53ab(0x4da)]()&&this[_0x3b53ab(0x3ad)](!![]);if(TouchInput[_0x3b53ab(0x1a7)]())this['onTouchOk']();else TouchInput[_0x3b53ab(0x334)]()&&this[_0x3b53ab(0x2c3)]();}},Window_EquipSlot['prototype'][_0x2be66f(0x3ad)]=function(_0x2fe0d9){const _0x296be4=_0x2be66f;this[_0x296be4(0x30f)]=![];const _0xbf0d34=this[_0x296be4(0x457)](),_0x483c13=this[_0x296be4(0x1fc)](),_0xab4018=SceneManager[_0x296be4(0x3d8)][_0x296be4(0x369)];if(_0xab4018[_0x296be4(0x405)]()&&_0xab4018[_0x296be4(0x344)]){if(_0x483c13>=0x0)_0x483c13===this[_0x296be4(0x457)]()&&(this[_0x296be4(0x30f)]=!![]),this['activate'](),this[_0x296be4(0x1b2)](_0x483c13);else _0xab4018[_0x296be4(0x1fc)]()>=0x0&&(this['deactivate'](),this['deselect']());}_0x2fe0d9&&this[_0x296be4(0x457)]()!==_0xbf0d34&&this[_0x296be4(0x1d0)]();},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4aa)]=Window_EquipItem[_0x2be66f(0x3c7)][_0x2be66f(0x4a0)],Window_EquipItem['prototype'][_0x2be66f(0x4a0)]=function(_0x26cc06){const _0x55491b=_0x2be66f;return _0x26cc06===null&&this[_0x55491b(0x327)]()[_0x55491b(0x4a0)](this['etypeId']())?this['_data']['length']>0x0?![]:!![]:VisuMZ['ItemsEquipsCore'][_0x55491b(0x4aa)][_0x55491b(0x2ba)](this,_0x26cc06);},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x32f)]=Window_EquipItem['prototype'][_0x2be66f(0x2c9)],Window_EquipItem[_0x2be66f(0x3c7)][_0x2be66f(0x2c9)]=function(_0x2f2c59){const _0x1f0886=_0x2be66f;return!_0x2f2c59&&this[_0x1f0886(0x327)]()[_0x1f0886(0x4a0)](this['etypeId']())?![]:VisuMZ[_0x1f0886(0x3f9)][_0x1f0886(0x32f)]['call'](this,_0x2f2c59);},Window_EquipItem[_0x2be66f(0x3c7)]['nonRemovableEtypes']=function(){const _0x12ef78=_0x2be66f;return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'][_0x12ef78(0x1dd)];},Window_EquipItem[_0x2be66f(0x3c7)]['drawItem']=function(_0x2d3f2b){const _0x494946=_0x2be66f,_0x3fa44f=this[_0x494946(0x23a)](_0x2d3f2b);_0x3fa44f?Window_ItemList[_0x494946(0x3c7)][_0x494946(0x43b)]['call'](this,_0x2d3f2b):this['drawRemoveItem'](_0x2d3f2b);},Window_EquipItem[_0x2be66f(0x3c7)][_0x2be66f(0x48d)]=function(_0x4b2831){const _0x51b9ca=_0x2be66f;this[_0x51b9ca(0x2e4)](this[_0x51b9ca(0x2c9)](null));const _0x15ddc6=VisuMZ[_0x51b9ca(0x3f9)][_0x51b9ca(0x2ec)][_0x51b9ca(0x3b0)],_0x4a956f=this[_0x51b9ca(0x3b9)](_0x4b2831),_0x5dd337=_0x4a956f['y']+(this['lineHeight']()-ImageManager['iconHeight'])/0x2,_0x29518a=ImageManager[_0x51b9ca(0x2cf)]+0x4,_0x247bb9=Math['max'](0x0,_0x4a956f[_0x51b9ca(0x41e)]-_0x29518a);this[_0x51b9ca(0x4bf)](),this[_0x51b9ca(0x47a)](_0x15ddc6['RemoveEquipIcon'],_0x4a956f['x'],_0x5dd337),this['drawText'](_0x15ddc6[_0x51b9ca(0x494)],_0x4a956f['x']+_0x29518a,_0x4a956f['y'],_0x247bb9),this['changePaintOpacity'](!![]);},Window_EquipItem['prototype'][_0x2be66f(0x3ab)]=function(){const _0x1ecfd0=_0x2be66f;Window_ItemList['prototype'][_0x1ecfd0(0x3ab)][_0x1ecfd0(0x2ba)](this);if(this[_0x1ecfd0(0x40a)]&&this['_statusWindow']&&this[_0x1ecfd0(0x28b)]>=0x0){const _0x15c26d=JsonEx['makeDeepCopy'](this[_0x1ecfd0(0x40a)]);_0x15c26d[_0x1ecfd0(0x212)]=!![],_0x15c26d[_0x1ecfd0(0x438)](this[_0x1ecfd0(0x28b)],this['item']()),this[_0x1ecfd0(0x3e7)][_0x1ecfd0(0x497)](_0x15c26d);}},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x2bc)]=Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x45f)],Window_ShopCommand[_0x2be66f(0x3c7)]['initialize']=function(_0x5711da){const _0x21782d=_0x2be66f;VisuMZ['ItemsEquipsCore']['Window_ShopCommand_initialize'][_0x21782d(0x2ba)](this,_0x5711da),this[_0x21782d(0x1cb)](_0x5711da);},Window_ShopCommand[_0x2be66f(0x3c7)]['createCommandNameWindow']=function(_0x33caa9){const _0x267ee9=_0x2be66f,_0x15408f=new Rectangle(0x0,0x0,_0x33caa9[_0x267ee9(0x41e)],_0x33caa9[_0x267ee9(0x49c)]);this[_0x267ee9(0x3e4)]=new Window_Base(_0x15408f),this['_commandNameWindow'][_0x267ee9(0x1fd)]=0x0,this[_0x267ee9(0x490)](this[_0x267ee9(0x3e4)]),this[_0x267ee9(0x370)]();},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1be)]=function(){const _0x19fc0c=_0x2be66f;Window_HorzCommand[_0x19fc0c(0x3c7)][_0x19fc0c(0x1be)][_0x19fc0c(0x2ba)](this);if(this['_commandNameWindow'])this[_0x19fc0c(0x370)]();},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x370)]=function(){const _0x4125de=_0x2be66f,_0x4dcf12=this[_0x4125de(0x3e4)];_0x4dcf12[_0x4125de(0x274)][_0x4125de(0x333)]();const _0x57bbbc=this[_0x4125de(0x1af)](this[_0x4125de(0x457)]());if(_0x57bbbc===_0x4125de(0x3c6)){const _0x470acb=this[_0x4125de(0x3b9)](this[_0x4125de(0x457)]());let _0x47da7e=this[_0x4125de(0x477)](this[_0x4125de(0x457)]());_0x47da7e=_0x47da7e[_0x4125de(0x2ab)](/\\I\[(\d+)\]/gi,''),_0x4dcf12[_0x4125de(0x3fb)](),this['commandNameWindowDrawBackground'](_0x47da7e,_0x470acb),this[_0x4125de(0x1f1)](_0x47da7e,_0x470acb),this['commandNameWindowCenter'](_0x47da7e,_0x470acb);}},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x430)]=function(_0x31f5bd,_0x6c1b9){},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1f1)]=function(_0x3b4fc1,_0x12e8f9){const _0x424b98=_0x2be66f,_0x3d5531=this[_0x424b98(0x3e4)];_0x3d5531[_0x424b98(0x3db)](_0x3b4fc1,0x0,_0x12e8f9['y'],_0x3d5531[_0x424b98(0x246)],_0x424b98(0x3de));},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x2b1)]=function(_0x3a209a,_0x10f0ab){const _0x2e30c0=_0x2be66f,_0x5ce67f=this[_0x2e30c0(0x3e4)],_0x128fd7=$gameSystem[_0x2e30c0(0x30a)](),_0x4cff9d=_0x10f0ab['x']+Math['floor'](_0x10f0ab['width']/0x2)+_0x128fd7;_0x5ce67f['x']=_0x5ce67f[_0x2e30c0(0x41e)]/-0x2+_0x4cff9d,_0x5ce67f['y']=Math[_0x2e30c0(0x2aa)](_0x10f0ab[_0x2e30c0(0x49c)]/0x2);},Window_ShopCommand[_0x2be66f(0x3c7)]['maxCols']=function(){const _0x12490f=_0x2be66f;return this[_0x12490f(0x384)]?this[_0x12490f(0x384)][_0x12490f(0x443)]:0x3;},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x2d4)]=function(){const _0x53e6e4=_0x2be66f;return VisuMZ[_0x53e6e4(0x3f9)][_0x53e6e4(0x2ec)]['ShopScene'][_0x53e6e4(0x46d)];},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1a8)]=function(){const _0x75710e=_0x2be66f;this['addBuyCommand'](),this[_0x75710e(0x471)](),this['addCancelCommand']();},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x4cb)]=function(){const _0x346d31=_0x2be66f;Window_HorzCommand[_0x346d31(0x3c7)][_0x346d31(0x4cb)][_0x346d31(0x2ba)](this),this[_0x346d31(0x261)]();},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x356)]=function(){const _0xffaf49=_0x2be66f,_0x7a5b44=this[_0xffaf49(0x1f4)](),_0x3fbdc2=VisuMZ[_0xffaf49(0x3f9)][_0xffaf49(0x2ec)][_0xffaf49(0x265)][_0xffaf49(0x44a)],_0x3861c5=_0x7a5b44===_0xffaf49(0x46e)?TextManager[_0xffaf49(0x22b)]:'\x5cI[%1]%2'['format'](_0x3fbdc2,TextManager[_0xffaf49(0x22b)]),_0x4a7741=this['isBuyCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x4a7741)return;this['addCommand'](_0x3861c5,_0xffaf49(0x22b),_0x4a7741);},Window_ShopCommand['prototype']['isBuyCommandEnabled']=function(){const _0x398d26=_0x2be66f;return SceneManager[_0x398d26(0x3d8)][_0x398d26(0x387)]===Scene_Shop?SceneManager[_0x398d26(0x3d8)][_0x398d26(0x393)]>0x0:!![];},Window_ShopCommand[_0x2be66f(0x3c7)]['addSellCommand']=function(){const _0x3becc7=_0x2be66f,_0x27dfd3=this['commandStyle'](),_0x1da3bd=VisuMZ[_0x3becc7(0x3f9)]['Settings'][_0x3becc7(0x265)][_0x3becc7(0x407)],_0x428393=_0x27dfd3===_0x3becc7(0x46e)?TextManager[_0x3becc7(0x386)]:_0x3becc7(0x1bb)[_0x3becc7(0x4bd)](_0x1da3bd,TextManager['sell']),_0x269029=this[_0x3becc7(0x230)]();if(this[_0x3becc7(0x2d4)]()&&!_0x269029)return;this[_0x3becc7(0x36b)](_0x428393,'sell',_0x269029);},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x230)]=function(){const _0x4cc6d6=_0x2be66f;return!this[_0x4cc6d6(0x27c)];},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x2dc)]=function(){const _0x2e4d8e=_0x2be66f,_0x2f7ee2=this['commandStyle'](),_0x48bb76=VisuMZ[_0x2e4d8e(0x3f9)][_0x2e4d8e(0x2ec)][_0x2e4d8e(0x265)][_0x2e4d8e(0x286)],_0x5ba46f=VisuMZ['ItemsEquipsCore']['Settings'][_0x2e4d8e(0x265)][_0x2e4d8e(0x38a)],_0x4ab233=_0x2f7ee2===_0x2e4d8e(0x46e)?_0x5ba46f:_0x2e4d8e(0x1bb)['format'](_0x48bb76,_0x5ba46f);this[_0x2e4d8e(0x36b)](_0x4ab233,'cancel');},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x4d4)]=function(){const _0x17ede2=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x17ede2(0x2ec)][_0x17ede2(0x265)][_0x17ede2(0x3bc)];},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x43b)]=function(_0x6e2950){const _0x46fae5=_0x2be66f,_0x38c519=this['commandStyleCheck'](_0x6e2950);if(_0x38c519===_0x46fae5(0x4b3))this['drawItemStyleIconText'](_0x6e2950);else _0x38c519===_0x46fae5(0x3c6)?this[_0x46fae5(0x4d8)](_0x6e2950):Window_HorzCommand[_0x46fae5(0x3c7)][_0x46fae5(0x43b)][_0x46fae5(0x2ba)](this,_0x6e2950);},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1f4)]=function(){const _0x326529=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x326529(0x2ec)]['ShopScene']['CmdStyle'];},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x1af)]=function(_0x4061b2){const _0x2c0510=_0x2be66f;if(_0x4061b2<0x0)return'text';const _0x34b5c1=this['commandStyle']();if(_0x34b5c1!=='auto')return _0x34b5c1;else{if(this[_0x2c0510(0x2f4)]()>0x0){const _0x558c52=this['commandName'](_0x4061b2);if(_0x558c52[_0x2c0510(0x239)](/\\I\[(\d+)\]/i)){const _0x488fc8=this[_0x2c0510(0x3b9)](_0x4061b2),_0x2be9d4=this[_0x2c0510(0x28d)](_0x558c52)[_0x2c0510(0x41e)];return _0x2be9d4<=_0x488fc8[_0x2c0510(0x41e)]?'iconText':_0x2c0510(0x3c6);}}}return _0x2c0510(0x46e);},Window_ShopCommand['prototype'][_0x2be66f(0x3af)]=function(_0x2a1d61){const _0x2a4dad=_0x2be66f,_0x2526ac=this[_0x2a4dad(0x3b9)](_0x2a1d61),_0x3d23f6=this['commandName'](_0x2a1d61),_0x3086e5=this[_0x2a4dad(0x28d)](_0x3d23f6)[_0x2a4dad(0x41e)];this[_0x2a4dad(0x2e4)](this[_0x2a4dad(0x312)](_0x2a1d61));const _0x51c04a=this[_0x2a4dad(0x4d4)]();if(_0x51c04a===_0x2a4dad(0x4a1))this[_0x2a4dad(0x1ea)](_0x3d23f6,_0x2526ac['x']+_0x2526ac[_0x2a4dad(0x41e)]-_0x3086e5,_0x2526ac['y'],_0x3086e5);else{if(_0x51c04a===_0x2a4dad(0x3de)){const _0x46f416=_0x2526ac['x']+Math[_0x2a4dad(0x2aa)]((_0x2526ac['width']-_0x3086e5)/0x2);this[_0x2a4dad(0x1ea)](_0x3d23f6,_0x46f416,_0x2526ac['y'],_0x3086e5);}else this[_0x2a4dad(0x1ea)](_0x3d23f6,_0x2526ac['x'],_0x2526ac['y'],_0x3086e5);}},Window_ShopCommand[_0x2be66f(0x3c7)][_0x2be66f(0x4d8)]=function(_0x33f33d){const _0x2ab3fc=_0x2be66f;this[_0x2ab3fc(0x477)](_0x33f33d)[_0x2ab3fc(0x239)](/\\I\[(\d+)\]/i);const _0xac4dc2=Number(RegExp['$1'])||0x0,_0xe9f3e5=this[_0x2ab3fc(0x3b9)](_0x33f33d),_0x1af693=_0xe9f3e5['x']+Math[_0x2ab3fc(0x2aa)]((_0xe9f3e5[_0x2ab3fc(0x41e)]-ImageManager[_0x2ab3fc(0x2cf)])/0x2),_0x4f76b=_0xe9f3e5['y']+(_0xe9f3e5['height']-ImageManager['iconHeight'])/0x2;this[_0x2ab3fc(0x47a)](_0xac4dc2,_0x1af693,_0x4f76b);},VisuMZ['ItemsEquipsCore'][_0x2be66f(0x496)]=Window_ShopBuy[_0x2be66f(0x3c7)][_0x2be66f(0x4cb)],Window_ShopBuy['prototype']['refresh']=function(){const _0x2d3810=_0x2be66f;this[_0x2d3810(0x4c4)](),VisuMZ[_0x2d3810(0x3f9)]['Window_ShopBuy_refresh'][_0x2d3810(0x2ba)](this);},Window_ShopBuy[_0x2be66f(0x3c7)][_0x2be66f(0x4c4)]=function(){const _0x553c55=_0x2be66f;SceneManager[_0x553c55(0x3d8)][_0x553c55(0x387)]===Scene_Shop&&(this[_0x553c55(0x419)]=SceneManager['_scene']['money']());},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x4d1)]=Window_ShopBuy[_0x2be66f(0x3c7)]['price'],Window_ShopBuy['prototype']['price']=function(_0x3a3fd7){const _0x203763=_0x2be66f;if(!_0x3a3fd7)return 0x0;const _0x5669c7=VisuMZ[_0x203763(0x3f9)][_0x203763(0x4d1)][_0x203763(0x2ba)](this,_0x3a3fd7);return this[_0x203763(0x259)](_0x3a3fd7,_0x5669c7);},Window_ShopBuy[_0x2be66f(0x3c7)]['modifiedBuyPriceItemsEquipsCore']=function(_0x37bb23,_0x56709e){const _0x32a918=_0x2be66f,_0x5de2f1=_0x37bb23[_0x32a918(0x49d)];if(_0x5de2f1[_0x32a918(0x239)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x3c5827=String(RegExp['$1']);try{eval(_0x3c5827);}catch(_0x157f46){if($gameTemp['isPlaytest']())console[_0x32a918(0x3ac)](_0x157f46);}}_0x56709e=VisuMZ[_0x32a918(0x3f9)][_0x32a918(0x2ec)]['ShopScene']['BuyPriceJS']['call'](this,_0x37bb23,_0x56709e);if(isNaN(_0x56709e))_0x56709e=0x0;return Math[_0x32a918(0x2aa)](_0x56709e);},Window_ShopBuy[_0x2be66f(0x3c7)][_0x2be66f(0x43b)]=function(_0x44cc2d){const _0x3abe62=_0x2be66f;this['resetFontSettings']();const _0x319cc2=this['itemAt'](_0x44cc2d),_0x565280=this['itemLineRect'](_0x44cc2d),_0x5ee1f1=_0x565280[_0x3abe62(0x41e)];this[_0x3abe62(0x2e4)](this[_0x3abe62(0x2c9)](_0x319cc2)),this[_0x3abe62(0x3ae)](_0x319cc2,_0x565280['x'],_0x565280['y'],_0x5ee1f1),this[_0x3abe62(0x26d)](_0x319cc2,_0x565280),this[_0x3abe62(0x2e4)](!![]);},Window_ShopBuy['prototype'][_0x2be66f(0x26d)]=function(_0x476e6d,_0xb96542){const _0x2c916f=_0x2be66f,_0x1cf6e1=this[_0x2c916f(0x3ca)](_0x476e6d);this[_0x2c916f(0x32b)](_0x1cf6e1,TextManager[_0x2c916f(0x1ed)],_0xb96542['x'],_0xb96542['y'],_0xb96542['width']);},Window_ShopSell[_0x2be66f(0x3c7)][_0x2be66f(0x38f)]=function(){const _0xd677cc=_0x2be66f;return SceneManager['_scene'][_0xd677cc(0x442)]()?0x1:0x2;},VisuMZ[_0x2be66f(0x3f9)][_0x2be66f(0x1ba)]=Window_ShopSell[_0x2be66f(0x3c7)][_0x2be66f(0x2c9)],Window_ShopSell['prototype'][_0x2be66f(0x2c9)]=function(_0xb6d558){const _0x5a0394=_0x2be66f;if(!_0xb6d558)return![];const _0x2371e8=_0xb6d558[_0x5a0394(0x49d)];if(_0x2371e8[_0x5a0394(0x239)](/<CANNOT SELL>/i))return![];if(_0x2371e8[_0x5a0394(0x239)](/<CAN SELL>/i))return!![];if(_0x2371e8[_0x5a0394(0x239)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56631c=JSON[_0x5a0394(0x3c0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3c0643 of _0x56631c){if(!$gameSwitches['value'](_0x3c0643))return![];}}if(_0x2371e8['match'](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x554919=JSON[_0x5a0394(0x3c0)]('['+RegExp['$1'][_0x5a0394(0x239)](/\d+/g)+']');for(const _0xcb85f6 of _0x554919){if(!$gameSwitches[_0x5a0394(0x297)](_0xcb85f6))return![];}}if(_0x2371e8[_0x5a0394(0x239)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29743f=JSON[_0x5a0394(0x3c0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ffcde of _0x29743f){if($gameSwitches[_0x5a0394(0x297)](_0x3ffcde))return![];}}return VisuMZ['ItemsEquipsCore']['Window_ShopSell_isEnabled'][_0x5a0394(0x2ba)](this,_0xb6d558);},Window_ShopStatus[_0x2be66f(0x3c7)]['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x355)]=function(){const _0x9909f3=_0x2be66f;Window_StatusBase[_0x9909f3(0x3c7)][_0x9909f3(0x355)][_0x9909f3(0x2ba)](this);for(const _0x6715aa of $gameParty[_0x9909f3(0x43d)]()){ImageManager[_0x9909f3(0x41c)](_0x6715aa[_0x9909f3(0x1c2)]());}},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4ac)]=function(){const _0x531f48=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x531f48(0x2ec)]['StatusWindow'][_0x531f48(0x3c1)];},Window_ShopStatus['prototype'][_0x2be66f(0x4cb)]=function(){const _0x2ec032=_0x2be66f;this[_0x2ec032(0x274)][_0x2ec032(0x333)](),this[_0x2ec032(0x1fa)][_0x2ec032(0x333)](),this['_item']&&(this[_0x2ec032(0x3fb)](),this['changePaintOpacity'](!![]),this['prepareItemCustomData'](),this[_0x2ec032(0x392)]()?this['drawEquipData']():this[_0x2ec032(0x3ee)]());},Window_ShopStatus['prototype'][_0x2be66f(0x41a)]=function(_0x525376,_0x58c6d2){const _0x1fbb88=_0x2be66f;if(!this[_0x1fbb88(0x392)]()&&!DataManager['isItem'](this[_0x1fbb88(0x216)]))return;const _0x27d6c6=this[_0x1fbb88(0x246)]-this[_0x1fbb88(0x2d5)]()-_0x525376,_0x3bde97=this[_0x1fbb88(0x37b)](_0x1fbb88(0x3c3));this[_0x1fbb88(0x2e6)](ColorManager[_0x1fbb88(0x331)]()),this['drawText'](TextManager['possession'],_0x525376+this['itemPadding'](),_0x58c6d2,_0x27d6c6-_0x3bde97),this['resetTextColor'](),this[_0x1fbb88(0x291)](this[_0x1fbb88(0x216)],_0x525376,_0x58c6d2,_0x27d6c6);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2f8)]=function(_0x4ed099,_0x47e799,_0x3db4e0,_0x4be58b,_0x1239f5){const _0x41d3df=_0x2be66f;if(VisuMZ[_0x41d3df(0x3f9)][_0x41d3df(0x2ec)]['StatusWindow'][_0x41d3df(0x249)]===![])return;_0x1239f5=Math[_0x41d3df(0x470)](_0x1239f5||0x1,0x1);while(_0x1239f5--){_0x4be58b=_0x4be58b||this[_0x41d3df(0x296)](),this[_0x41d3df(0x1fa)]['paintOpacity']=0xa0;const _0x53e55b=ColorManager[_0x41d3df(0x1d2)]();this[_0x41d3df(0x1fa)][_0x41d3df(0x22a)](_0x4ed099+0x1,_0x47e799+0x1,_0x3db4e0-0x2,_0x4be58b-0x2,_0x53e55b),this[_0x41d3df(0x1fa)]['paintOpacity']=0xff;}},ColorManager[_0x2be66f(0x1d2)]=function(){const _0x276c23=_0x2be66f,_0x1b43f3=VisuMZ[_0x276c23(0x3f9)][_0x276c23(0x2ec)]['StatusWindow'];let _0x3c5359=_0x1b43f3[_0x276c23(0x3cb)]!==undefined?_0x1b43f3[_0x276c23(0x3cb)]:0x13;return ColorManager['getColor'](_0x3c5359);},Window_ShopStatus['prototype']['drawEquipData']=function(){const _0xa3dceb=_0x2be66f;VisuMZ[_0xa3dceb(0x3f9)][_0xa3dceb(0x2ec)]['StatusWindow'][_0xa3dceb(0x3dc)][_0xa3dceb(0x2ba)](this);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x429)]=function(_0x1b9fc4,_0x55db7d,_0x3fea69){const _0x212077=_0x2be66f;if(!this[_0x212077(0x392)]())return![];const _0x4c0bb5=$dataSystem[_0x212077(0x39e)][this[_0x212077(0x216)][_0x212077(0x4af)]];return this[_0x212077(0x289)](_0x4c0bb5,_0x1b9fc4,_0x55db7d,_0x3fea69,!![]),this['drawItemDarkRect'](_0x1b9fc4,_0x55db7d,_0x3fea69),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemQuantityText']=function(){const _0x90e2be=_0x2be66f,_0x3015c7=VisuMZ[_0x90e2be(0x3f9)]['Settings'][_0x90e2be(0x4a4)][_0x90e2be(0x3cf)];return _0x3015c7[_0x90e2be(0x4bd)]($gameParty[_0x90e2be(0x47f)](this['_item']));},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x226)]=function(){const _0x1807a1=_0x2be66f;return Imported[_0x1807a1(0x253)]?VisuMZ[_0x1807a1(0x1eb)][_0x1807a1(0x2ec)][_0x1807a1(0x25c)][_0x1807a1(0x214)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x2be66f(0x3c7)]['smallParamFontSize']=function(){const _0x2a3a5d=_0x2be66f;return VisuMZ[_0x2a3a5d(0x3f9)][_0x2a3a5d(0x2ec)][_0x2a3a5d(0x4be)][_0x2a3a5d(0x412)];},Window_ShopStatus['prototype'][_0x2be66f(0x245)]=function(_0x3ae810,_0x466817,_0x24e56d,_0x490cf8){const _0x570888=_0x2be66f;this['resetFontSettings'](),this[_0x570888(0x274)][_0x570888(0x4c2)]=this[_0x570888(0x364)]();let _0x2818fa=this[_0x570888(0x37b)](TextManager[_0x570888(0x3d4)](_0x3ae810))+0x4+_0x466817;return Imported['VisuMZ_0_CoreEngine']?(this[_0x570888(0x304)](_0x466817,_0x24e56d,_0x490cf8,_0x3ae810,!![]),VisuMZ[_0x570888(0x1eb)][_0x570888(0x2ec)]['Param'][_0x570888(0x1d4)]&&(_0x2818fa+=ImageManager[_0x570888(0x2cf)]+0x4)):(this[_0x570888(0x2e6)](ColorManager['systemColor']()),this[_0x570888(0x3db)](TextManager[_0x570888(0x3d4)](_0x3ae810),_0x466817,_0x24e56d,_0x490cf8)),this[_0x570888(0x3fb)](),_0x2818fa;},Window_ShopStatus['prototype'][_0x2be66f(0x3fe)]=function(_0x26b38b,_0x1e1453,_0x500da6,_0x984bfd,_0x4ed9b6){const _0x334b43=_0x2be66f;_0x500da6+=this['itemPadding'](),_0x4ed9b6-=this[_0x334b43(0x2d5)]()*0x2;const _0x5bf5a0=VisuMZ[_0x334b43(0x3f9)][_0x334b43(0x2ec)][_0x334b43(0x4be)];this[_0x334b43(0x274)][_0x334b43(0x4c2)]=_0x5bf5a0[_0x334b43(0x412)],this[_0x334b43(0x2e4)](_0x26b38b[_0x334b43(0x321)](this[_0x334b43(0x216)]));if(_0x26b38b[_0x334b43(0x264)](this[_0x334b43(0x216)])){const _0x394da0=_0x5bf5a0['AlreadyEquipMarker'];this[_0x334b43(0x3db)](_0x394da0,_0x500da6,_0x984bfd,_0x4ed9b6,_0x334b43(0x3de));}else{if(_0x26b38b[_0x334b43(0x321)](this['_item'])){const _0x53fa5c=this['currentEquippedItem'](_0x26b38b,this[_0x334b43(0x216)][_0x334b43(0x4af)]),_0x13bdc6=JsonEx[_0x334b43(0x275)](_0x26b38b);_0x13bdc6[_0x334b43(0x212)]=!![];const _0x41c4ec=_0x13bdc6[_0x334b43(0x3e1)]()['indexOf'](this['_item'][_0x334b43(0x4af)]);if(_0x41c4ec>=0x0)_0x13bdc6[_0x334b43(0x438)](_0x41c4ec,this['_item']);let _0x533100=0x0,_0x59ac4b=0x0,_0x5b21a4=0x0;Imported[_0x334b43(0x253)]?(_0x533100=_0x13bdc6[_0x334b43(0x35f)](_0x1e1453),_0x59ac4b=_0x533100-_0x26b38b[_0x334b43(0x35f)](_0x1e1453),this['changeTextColor'](ColorManager[_0x334b43(0x311)](_0x59ac4b)),_0x5b21a4=(_0x59ac4b>=0x0?'+':'')+VisuMZ[_0x334b43(0x1e0)](_0x59ac4b,0x0,_0x1e1453)):(_0x533100=_0x13bdc6[_0x334b43(0x3d4)](_0x1e1453),_0x59ac4b=_0x533100-_0x26b38b[_0x334b43(0x3d4)](_0x1e1453),this[_0x334b43(0x2e6)](ColorManager['paramchangeTextColor'](_0x59ac4b)),_0x5b21a4=(_0x59ac4b>=0x0?'+':'')+_0x59ac4b);if(_0x5b21a4==='+0')_0x5b21a4=_0x5bf5a0[_0x334b43(0x474)];this[_0x334b43(0x3db)](_0x5b21a4,_0x500da6,_0x984bfd,_0x4ed9b6,_0x334b43(0x3de));}else{const _0x14ad66=_0x5bf5a0[_0x334b43(0x428)];this[_0x334b43(0x3db)](_0x14ad66,_0x500da6,_0x984bfd,_0x4ed9b6,_0x334b43(0x3de));}}this['resetFontSettings'](),this[_0x334b43(0x2e4)](!![]);},Window_ShopStatus['prototype'][_0x2be66f(0x3ee)]=function(){const _0x4a3559=_0x2be66f;VisuMZ[_0x4a3559(0x3f9)][_0x4a3559(0x2ec)]['StatusWindow'][_0x4a3559(0x21a)][_0x4a3559(0x2ba)](this);},Window_ShopStatus['prototype'][_0x2be66f(0x2b9)]=function(){const _0x333b78=_0x2be66f;this[_0x333b78(0x48f)]={};if(!this[_0x333b78(0x216)])return;const _0xac885=this['_item']['note'];if(_0xac885[_0x333b78(0x239)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x296f1f=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1984d9 of _0x296f1f){if(_0x1984d9['match'](/(.*):[ ](.*)/i)){const _0x194a4c=String(RegExp['$1'])[_0x333b78(0x1ee)]()[_0x333b78(0x254)](),_0x62ed3d=String(RegExp['$2'])[_0x333b78(0x254)]();this[_0x333b78(0x48f)][_0x194a4c]=_0x62ed3d;}}}},Window_ShopStatus['prototype']['itemDataFontSize']=function(){const _0x338bb7=_0x2be66f;return Math[_0x338bb7(0x470)](0x1,$gameSystem[_0x338bb7(0x479)]()-0x4);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3fb)]=function(){const _0x2f5302=_0x2be66f;Window_StatusBase[_0x2f5302(0x3c7)][_0x2f5302(0x3fb)]['call'](this),this['contents']['fontSize']=this[_0x2f5302(0x4c3)]||this[_0x2f5302(0x274)][_0x2f5302(0x4c2)],this[_0x2f5302(0x274)][_0x2f5302(0x367)]=this[_0x2f5302(0x4de)]||this['contents'][_0x2f5302(0x367)];},Window_ShopStatus[_0x2be66f(0x3c7)]['fontSizeRatio']=function(){const _0x163427=_0x2be66f;return this[_0x163427(0x274)][_0x163427(0x4c2)]/$gameSystem[_0x163427(0x479)]();},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x47a)]=function(_0x1da509,_0xc35ec5,_0x11ae4e){const _0x3e0f03=_0x2be66f,_0x5a95aa=ImageManager[_0x3e0f03(0x339)]('IconSet'),_0x2f1d99=ImageManager[_0x3e0f03(0x2cf)],_0x15dc96=ImageManager[_0x3e0f03(0x398)],_0x1bf1d6=_0x1da509%0x10*_0x2f1d99,_0x4a11c4=Math['floor'](_0x1da509/0x10)*_0x15dc96,_0x38daef=Math[_0x3e0f03(0x4c7)](_0x2f1d99*this['fontSizeRatio']()),_0x2b5cc6=Math[_0x3e0f03(0x4c7)](_0x15dc96*this[_0x3e0f03(0x2ff)]());this[_0x3e0f03(0x274)][_0x3e0f03(0x299)](_0x5a95aa,_0x1bf1d6,_0x4a11c4,_0x2f1d99,_0x15dc96,_0xc35ec5,_0x11ae4e,_0x38daef,_0x2b5cc6);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x489)]=function(_0x1bded4,_0xe27504){const _0x2f47b2=_0x2be66f;_0xe27504[_0x2f47b2(0x33f)]&&this[_0x2f47b2(0x47a)](_0x1bded4,_0xe27504['x'],_0xe27504['y']+0x2);_0xe27504['x']+=Math[_0x2f47b2(0x4c7)](ImageManager[_0x2f47b2(0x2cf)]*this[_0x2f47b2(0x2ff)]());if(this[_0x2f47b2(0x2ff)]()===0x1)_0xe27504['x']+=0x4;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x289)]=function(_0x58fe78,_0x103a30,_0x55fa1e,_0xd488fb,_0x4cf410,_0x1fb81b){const _0x25d991=_0x2be66f;_0x58fe78=_0x58fe78||'',_0x1fb81b=_0x1fb81b||_0x25d991(0x283),this[_0x25d991(0x4c3)]=this[_0x25d991(0x2ed)](),this[_0x25d991(0x4de)]=_0x4cf410?ColorManager[_0x25d991(0x331)]():this[_0x25d991(0x274)][_0x25d991(0x367)],_0x103a30+=this[_0x25d991(0x2d5)](),_0xd488fb-=this['itemPadding']()*0x2;const _0x44c35a=this[_0x25d991(0x28d)](_0x58fe78);if(_0x1fb81b===_0x25d991(0x3de))_0x103a30=_0x103a30+Math[_0x25d991(0x2aa)]((_0xd488fb-_0x44c35a[_0x25d991(0x41e)])/0x2);else _0x1fb81b===_0x25d991(0x4a1)&&(_0x103a30=_0x103a30+_0xd488fb-_0x44c35a[_0x25d991(0x41e)]);_0x55fa1e+=(this[_0x25d991(0x296)]()-_0x44c35a[_0x25d991(0x49c)])/0x2,this[_0x25d991(0x1ea)](_0x58fe78,_0x103a30,_0x55fa1e,_0xd488fb),this[_0x25d991(0x4c3)]=undefined,this[_0x25d991(0x4de)]=undefined,this['resetFontSettings']();},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x32d)]=function(_0x3bc8cd,_0x325e94,_0xff3f5b){const _0x36d2ae=_0x2be66f;if(!DataManager[_0x36d2ae(0x351)](this[_0x36d2ae(0x216)]))return![];const _0x3af58b=this[_0x36d2ae(0x345)]();this[_0x36d2ae(0x289)](_0x3af58b,_0x3bc8cd,_0x325e94,_0xff3f5b,!![]);const _0x59c8b1=this[_0x36d2ae(0x2b4)]();return this['drawItemKeyData'](_0x59c8b1,_0x3bc8cd,_0x325e94,_0xff3f5b,![],'right'),this[_0x36d2ae(0x2f8)](_0x3bc8cd,_0x325e94,_0xff3f5b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemConsumableLabel']=function(){const _0x2d8518=_0x2be66f;return VisuMZ[_0x2d8518(0x3f9)][_0x2d8518(0x2ec)][_0x2d8518(0x4be)][_0x2d8518(0x276)];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2b4)]=function(){const _0x71d5f2=_0x2be66f,_0x45289c=_0x71d5f2(0x463);if(this[_0x71d5f2(0x48f)][_0x45289c])return this[_0x71d5f2(0x48f)][_0x45289c];return this['canConsumeItem']()?VisuMZ[_0x71d5f2(0x3f9)][_0x71d5f2(0x2ec)][_0x71d5f2(0x4be)][_0x71d5f2(0x244)]:VisuMZ[_0x71d5f2(0x3f9)][_0x71d5f2(0x2ec)][_0x71d5f2(0x4be)][_0x71d5f2(0x3f5)];},Window_ShopStatus[_0x2be66f(0x3c7)]['canConsumeItem']=function(){const _0x4fc907=_0x2be66f;return VisuMZ[_0x4fc907(0x1eb)]&&VisuMZ['CoreEngine'][_0x4fc907(0x2ec)][_0x4fc907(0x373)][_0x4fc907(0x3cc)]&&DataManager['isKeyItem'](this['_item'])?![]:this['_item'][_0x4fc907(0x2e2)];},Window_ShopStatus['prototype'][_0x2be66f(0x298)]=function(_0x5f1ea0,_0x24d456,_0xeb0573){const _0x2aeb2d=_0x2be66f;if(!this[_0x2aeb2d(0x392)]()&&!DataManager[_0x2aeb2d(0x351)](this[_0x2aeb2d(0x216)]))return![];if(DataManager[_0x2aeb2d(0x1d1)](this[_0x2aeb2d(0x216)])&&!$dataSystem[_0x2aeb2d(0x340)]){const _0x185d3b=TextManager[_0x2aeb2d(0x39c)];this[_0x2aeb2d(0x289)](_0x185d3b,_0x5f1ea0,_0x24d456,_0xeb0573,!![],_0x2aeb2d(0x3de));}else{const _0x2eb67c=TextManager[_0x2aeb2d(0x397)];this[_0x2aeb2d(0x289)](_0x2eb67c,_0x5f1ea0,_0x24d456,_0xeb0573,!![]);const _0x3c826e=this[_0x2aeb2d(0x293)]();this['drawItemKeyData'](_0x3c826e,_0x5f1ea0,_0x24d456,_0xeb0573,![],_0x2aeb2d(0x4a1));}return this[_0x2aeb2d(0x2f8)](_0x5f1ea0,_0x24d456,_0xeb0573),this[_0x2aeb2d(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x293)]=function(){const _0x15668a=_0x2be66f,_0xe8d767=_0x15668a(0x2b2);if(this['_customItemInfo'][_0xe8d767])return this['_customItemInfo'][_0xe8d767];const _0x37f683=VisuMZ[_0x15668a(0x3f9)][_0x15668a(0x2ec)]['ItemScene'][_0x15668a(0x3cf)];return _0x37f683[_0x15668a(0x4bd)]($gameParty[_0x15668a(0x47f)](this[_0x15668a(0x216)]));},Window_ShopStatus['prototype'][_0x2be66f(0x4df)]=function(_0xa140ca,_0xfaf284,_0x269a06){const _0x4b59ed=_0x2be66f,_0x3a33e7=this['getItemOccasionText']();return this['drawItemKeyData'](_0x3a33e7,_0xa140ca,_0xfaf284,_0x269a06,![],_0x4b59ed(0x3de)),this[_0x4b59ed(0x2f8)](_0xa140ca,_0xfaf284,_0x269a06),this[_0x4b59ed(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x257)]=function(){const _0x3993dd=_0x2be66f,_0x54395f=_0x3993dd(0x2a3);if(this[_0x3993dd(0x48f)][_0x54395f])return this[_0x3993dd(0x48f)][_0x54395f];const _0x1a3122=VisuMZ[_0x3993dd(0x3f9)][_0x3993dd(0x2ec)][_0x3993dd(0x4be)],_0x4be402=_0x3993dd(0x466)[_0x3993dd(0x4bd)](this[_0x3993dd(0x216)]['occasion']);return _0x1a3122[_0x4be402];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x346)]=function(_0x25b52e,_0x56825b,_0x12c950){const _0x4df6fb=_0x2be66f,_0x2fff28=this['getItemScopeText']();return this[_0x4df6fb(0x289)](_0x2fff28,_0x25b52e,_0x56825b,_0x12c950,![],_0x4df6fb(0x3de)),this['drawItemDarkRect'](_0x25b52e,_0x56825b,_0x12c950),this[_0x4df6fb(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x47b)]=function(){const _0x11e3e3=_0x2be66f,_0x25b4e2=_0x11e3e3(0x374);if(this[_0x11e3e3(0x48f)][_0x25b4e2])return this[_0x11e3e3(0x48f)][_0x25b4e2];const _0x36ec78=VisuMZ[_0x11e3e3(0x3f9)]['Settings'][_0x11e3e3(0x4be)];if(Imported[_0x11e3e3(0x3df)]){const _0x337c3d=this[_0x11e3e3(0x216)][_0x11e3e3(0x49d)];if(_0x337c3d[_0x11e3e3(0x239)](/<TARGET:[ ](.*)>/i)){const _0x692f6b=String(RegExp['$1']);if(_0x692f6b[_0x11e3e3(0x239)](/(\d+) RANDOM ANY/i))return _0x36ec78['ScopeRandomAny'][_0x11e3e3(0x4bd)](Number(RegExp['$1']));else{if(_0x692f6b['match'](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x36ec78['ScopeRandomEnemies']['format'](Number(RegExp['$1']));else{if(_0x692f6b[_0x11e3e3(0x239)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x36ec78[_0x11e3e3(0x1f2)]['format'](Number(RegExp['$1']));else{if(_0x692f6b[_0x11e3e3(0x239)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x36ec78[_0x11e3e3(0x448)];}}}}}const _0x96e5af='Scope%1'[_0x11e3e3(0x4bd)](this[_0x11e3e3(0x216)]['scope']);return _0x36ec78[_0x96e5af];},Window_ShopStatus[_0x2be66f(0x3c7)]['drawItemSpeed']=function(_0x344f75,_0x3aee3d,_0x132d31){const _0x462f8c=_0x2be66f,_0x3d4eb7=this[_0x462f8c(0x47e)]();this[_0x462f8c(0x289)](_0x3d4eb7,_0x344f75,_0x3aee3d,_0x132d31,!![]);const _0x38b988=this[_0x462f8c(0x434)]();return this[_0x462f8c(0x289)](_0x38b988,_0x344f75,_0x3aee3d,_0x132d31,![],_0x462f8c(0x4a1)),this['drawItemDarkRect'](_0x344f75,_0x3aee3d,_0x132d31),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x47e)]=function(){const _0x59df82=_0x2be66f;return VisuMZ[_0x59df82(0x3f9)]['Settings'][_0x59df82(0x4be)][_0x59df82(0x1aa)];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x434)]=function(){const _0x31ea98=_0x2be66f,_0x5c2fb0=_0x31ea98(0x372);if(this[_0x31ea98(0x48f)][_0x5c2fb0])return this[_0x31ea98(0x48f)][_0x5c2fb0];const _0x3c61bf=this['_item'][_0x31ea98(0x357)];if(_0x3c61bf>=0x7d0)return VisuMZ[_0x31ea98(0x3f9)][_0x31ea98(0x2ec)][_0x31ea98(0x4be)][_0x31ea98(0x3e9)];else{if(_0x3c61bf>=0x3e8)return VisuMZ['ItemsEquipsCore'][_0x31ea98(0x2ec)][_0x31ea98(0x4be)][_0x31ea98(0x20f)];else{if(_0x3c61bf>0x0)return VisuMZ[_0x31ea98(0x3f9)][_0x31ea98(0x2ec)][_0x31ea98(0x4be)][_0x31ea98(0x2a6)];else{if(_0x3c61bf===0x0)return VisuMZ[_0x31ea98(0x3f9)][_0x31ea98(0x2ec)]['StatusWindow']['Speed0'];else{if(_0x3c61bf>-0x3e8)return VisuMZ[_0x31ea98(0x3f9)][_0x31ea98(0x2ec)][_0x31ea98(0x4be)]['SpeedNeg999'];else{if(_0x3c61bf>-0x7d0)return VisuMZ[_0x31ea98(0x3f9)]['Settings'][_0x31ea98(0x4be)][_0x31ea98(0x362)];else return _0x3c61bf<=-0x7d0?VisuMZ[_0x31ea98(0x3f9)][_0x31ea98(0x2ec)][_0x31ea98(0x4be)][_0x31ea98(0x1e1)]:_0x31ea98(0x237);}}}}}},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x21d)]=function(_0x20aaf2,_0x50154c,_0x440242){const _0x1c7fe0=_0x2be66f,_0x2c7384=this[_0x1c7fe0(0x35d)]();this['drawItemKeyData'](_0x2c7384,_0x20aaf2,_0x50154c,_0x440242,!![]);const _0x4ff6e9=this[_0x1c7fe0(0x3ce)]();return this[_0x1c7fe0(0x289)](_0x4ff6e9,_0x20aaf2,_0x50154c,_0x440242,![],_0x1c7fe0(0x4a1)),this[_0x1c7fe0(0x2f8)](_0x20aaf2,_0x50154c,_0x440242),this[_0x1c7fe0(0x3fb)](),!![];},Window_ShopStatus['prototype'][_0x2be66f(0x35d)]=function(){const _0x2c328b=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x2c328b(0x2ec)][_0x2c328b(0x4be)][_0x2c328b(0x341)];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3ce)]=function(){const _0x3b8f76=_0x2be66f,_0x577920='SUCCESS\x20RATE';if(this[_0x3b8f76(0x48f)][_0x577920])return this[_0x3b8f76(0x48f)][_0x577920];if(Imported[_0x3b8f76(0x3df)]){const _0x515f23=this['_item']['note'];if(_0x515f23[_0x3b8f76(0x239)](/<ALWAYS HIT>/i))return _0x3b8f76(0x381);else{if(_0x515f23[_0x3b8f76(0x239)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x3b8f76(0x456)[_0x3b8f76(0x4bd)](Number(RegExp['$1']));}}return _0x3b8f76(0x456)[_0x3b8f76(0x4bd)](this['_item'][_0x3b8f76(0x25f)]);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x380)]=function(_0x4e15ef,_0x16fd3a,_0x2d8a7f){const _0x23a96a=_0x2be66f,_0x42fe72=this['getItemRepeatsLabel']();this[_0x23a96a(0x289)](_0x42fe72,_0x4e15ef,_0x16fd3a,_0x2d8a7f,!![]);const _0x1be30b=this[_0x23a96a(0x258)]();return this[_0x23a96a(0x289)](_0x1be30b,_0x4e15ef,_0x16fd3a,_0x2d8a7f,![],_0x23a96a(0x4a1)),this[_0x23a96a(0x2f8)](_0x4e15ef,_0x16fd3a,_0x2d8a7f),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemRepeatsLabel']=function(){const _0x2bbd46=_0x2be66f;return VisuMZ['ItemsEquipsCore'][_0x2bbd46(0x2ec)][_0x2bbd46(0x4be)][_0x2bbd46(0x26e)];},Window_ShopStatus['prototype'][_0x2be66f(0x258)]=function(){const _0x5dc1a6=_0x2be66f,_0x2a1f32=_0x5dc1a6(0x3fd);if(this['_customItemInfo'][_0x2a1f32])return this[_0x5dc1a6(0x48f)][_0x2a1f32];const _0x50643e='×%1';return _0x50643e[_0x5dc1a6(0x4bd)](this[_0x5dc1a6(0x216)][_0x5dc1a6(0x3bf)]);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4ce)]=function(_0x3933e8,_0x50dd20,_0x31f48a){const _0x55ae76=_0x2be66f,_0x22c764=this[_0x55ae76(0x252)]();this[_0x55ae76(0x289)](_0x22c764,_0x3933e8,_0x50dd20,_0x31f48a,!![]);const _0x514360=this['getItemHitTypeText']();return this[_0x55ae76(0x289)](_0x514360,_0x3933e8,_0x50dd20,_0x31f48a,![],_0x55ae76(0x4a1)),this['drawItemDarkRect'](_0x3933e8,_0x50dd20,_0x31f48a),this[_0x55ae76(0x3fb)](),!![];},Window_ShopStatus['prototype']['getItemHitTypeLabel']=function(){const _0x4dd685=_0x2be66f;return VisuMZ[_0x4dd685(0x3f9)]['Settings'][_0x4dd685(0x4be)]['LabelHitType'];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemHitTypeText']=function(){const _0x6c8fd3=_0x2be66f,_0x55574f=_0x6c8fd3(0x1b3);if(this['_customItemInfo'][_0x55574f])return this[_0x6c8fd3(0x48f)][_0x55574f];const _0x5a250a=VisuMZ['ItemsEquipsCore'][_0x6c8fd3(0x2ec)][_0x6c8fd3(0x4be)],_0x4cae49='HitType%1'[_0x6c8fd3(0x4bd)](this['_item'][_0x6c8fd3(0x435)]);return _0x5a250a[_0x4cae49];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x468)]=function(_0x2c6432,_0x31fe7f,_0xa3de37){const _0x4fc5c5=_0x2be66f;if(this[_0x4fc5c5(0x216)]['damage'][_0x4fc5c5(0x1c1)]<=0x0)return _0x31fe7f;if(this[_0x4fc5c5(0x467)](_0x2c6432,_0x31fe7f,_0xa3de37))_0x31fe7f+=this[_0x4fc5c5(0x296)]();if(this[_0x4fc5c5(0x2d3)](_0x2c6432,_0x31fe7f,_0xa3de37))_0x31fe7f+=this[_0x4fc5c5(0x296)]();return this[_0x4fc5c5(0x3fb)](),_0x31fe7f;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x467)]=function(_0x30dc41,_0x26cf19,_0x4b8cfc){const _0x27833f=_0x2be66f,_0x375a6f=this['getItemDamageElementLabel']();this[_0x27833f(0x289)](_0x375a6f,_0x30dc41,_0x26cf19,_0x4b8cfc,!![]);const _0xbdcf21=this[_0x27833f(0x2d2)]();return this[_0x27833f(0x289)](_0xbdcf21,_0x30dc41,_0x26cf19,_0x4b8cfc,![],_0x27833f(0x4a1)),this[_0x27833f(0x2f8)](_0x30dc41,_0x26cf19,_0x4b8cfc),this[_0x27833f(0x3fb)](),!![];},Window_ShopStatus['prototype'][_0x2be66f(0x455)]=function(){const _0x37bab1=_0x2be66f;return VisuMZ[_0x37bab1(0x3f9)][_0x37bab1(0x2ec)][_0x37bab1(0x4be)][_0x37bab1(0x31d)];},Window_ShopStatus['prototype'][_0x2be66f(0x2d2)]=function(){const _0x139745=_0x2be66f,_0x1a8c8d=_0x139745(0x21f);if(this[_0x139745(0x48f)][_0x1a8c8d])return this['_customItemInfo'][_0x1a8c8d];if(this[_0x139745(0x216)][_0x139745(0x336)][_0x139745(0x281)]<=-0x1)return VisuMZ['ItemsEquipsCore'][_0x139745(0x2ec)][_0x139745(0x4be)][_0x139745(0x378)];else return this['_item'][_0x139745(0x336)][_0x139745(0x281)]===0x0?VisuMZ[_0x139745(0x3f9)][_0x139745(0x2ec)][_0x139745(0x4be)][_0x139745(0x306)]:$dataSystem['elements'][this[_0x139745(0x216)][_0x139745(0x336)]['elementId']];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2d3)]=function(_0x44b858,_0x1ca3bd,_0x378230){const _0x1cd40b=_0x2be66f,_0x5df629=this[_0x1cd40b(0x3e2)]();this[_0x1cd40b(0x289)](_0x5df629,_0x44b858,_0x1ca3bd,_0x378230,!![]),this[_0x1cd40b(0x1d7)]();const _0x40b88e=this[_0x1cd40b(0x2f1)](),_0x33ea97=ColorManager[_0x1cd40b(0x2fe)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x1cd40b(0x216)]['damage']['type']]);return this[_0x1cd40b(0x2e6)](_0x33ea97),this[_0x1cd40b(0x289)](_0x40b88e,_0x44b858,_0x1ca3bd,_0x378230,![],_0x1cd40b(0x4a1)),this[_0x1cd40b(0x2f8)](_0x44b858,_0x1ca3bd,_0x378230),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3e2)]=function(){const _0x598b30=_0x2be66f;return Imported['VisuMZ_1_BattleCore']&&DataManager[_0x598b30(0x2b7)](this['_item'])!==_0x598b30(0x29b)?this[_0x598b30(0x4a6)]():this['getItemDamageAmountLabelOriginal']();},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemDamageAmountLabelOriginal']=function(){const _0x4a231f=_0x2be66f,_0x55692b=VisuMZ['ItemsEquipsCore'][_0x4a231f(0x2ec)][_0x4a231f(0x4be)],_0x4dd3ba=_0x4a231f(0x1df)[_0x4a231f(0x4bd)](this[_0x4a231f(0x216)]['damage'][_0x4a231f(0x1c1)]),_0x197278=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x4a231f(0x216)][_0x4a231f(0x336)][_0x4a231f(0x1c1)]];return _0x55692b[_0x4dd3ba][_0x4a231f(0x4bd)](_0x197278);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x1d7)]=function(){const _0xb2b7d5=_0x2be66f,_0xf6b848=$gameActors['actor'](0x1);this[_0xb2b7d5(0x487)]=JsonEx['makeDeepCopy'](_0xf6b848),this['_tempActorB']=JsonEx[_0xb2b7d5(0x275)](_0xf6b848);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2f1)]=function(){const _0x36d714=_0x2be66f,_0x58f8dd=_0x36d714(0x31b);if(this[_0x36d714(0x48f)][_0x58f8dd])return this[_0x36d714(0x48f)][_0x58f8dd];return Imported[_0x36d714(0x3df)]&&DataManager[_0x36d714(0x2b7)](this[_0x36d714(0x216)])!==_0x36d714(0x29b)?this['getItemDamageAmountTextBattleCore']():this[_0x36d714(0x43f)]();},Window_ShopStatus['prototype'][_0x2be66f(0x43f)]=function(){const _0x1ae8cf=_0x2be66f;window['a']=this[_0x1ae8cf(0x487)],window['b']=this[_0x1ae8cf(0x2c8)],this[_0x1ae8cf(0x487)][_0x1ae8cf(0x1cf)](!![]),this[_0x1ae8cf(0x2c8)][_0x1ae8cf(0x1cf)]([0x3,0x4][_0x1ae8cf(0x4a0)](this['_item'][_0x1ae8cf(0x336)]['type']));let _0x590475=this['_item'][_0x1ae8cf(0x336)][_0x1ae8cf(0x1ad)];try{const _0x47a046=Math[_0x1ae8cf(0x470)](eval(_0x590475),0x0)/window['a']['atk'];return this[_0x1ae8cf(0x441)](),isNaN(_0x47a046)?'?????':_0x1ae8cf(0x456)[_0x1ae8cf(0x4bd)](Math['round'](_0x47a046*0x64));}catch(_0x1eb359){return $gameTemp['isPlaytest']()&&(console[_0x1ae8cf(0x3ac)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x1ae8cf(0x4bd)](this[_0x1ae8cf(0x216)]['name'])),console[_0x1ae8cf(0x3ac)](_0x1eb359)),this['revertGlobalNamespaceVariables'](),_0x1ae8cf(0x237);}},Window_ShopStatus[_0x2be66f(0x3c7)]['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x352)]=function(_0x33b6b9,_0x3c1313,_0x2435c8){const _0x195eb7=_0x2be66f;if(!this[_0x195eb7(0x209)]())return _0x3c1313;if(this[_0x195eb7(0x45e)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this[_0x195eb7(0x486)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this['lineHeight']();if(this[_0x195eb7(0x3d7)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this[_0x195eb7(0x4a7)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this['lineHeight']();if(this[_0x195eb7(0x46c)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this[_0x195eb7(0x31f)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this['drawItemEffectsSelfTpGain'](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this[_0x195eb7(0x305)](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x33b6b9,_0x3c1313,_0x2435c8))_0x3c1313+=this[_0x195eb7(0x296)]();return this[_0x195eb7(0x3fb)](),_0x3c1313;},Window_ShopStatus['prototype'][_0x2be66f(0x209)]=function(){const _0x1ad890=_0x2be66f;let _0x4326de=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x411762 of this[_0x1ad890(0x216)][_0x1ad890(0x446)]){switch(_0x411762[_0x1ad890(0x2f0)]){case Game_Action[_0x1ad890(0x439)]:this[_0x1ad890(0x1c8)][_0x1ad890(0x353)]+=_0x411762[_0x1ad890(0x464)],this[_0x1ad890(0x1c8)]['flatHP']+=_0x411762[_0x1ad890(0x28a)],_0x4326de=!![];break;case Game_Action[_0x1ad890(0x3fc)]:this[_0x1ad890(0x1c8)][_0x1ad890(0x1b8)]+=_0x411762[_0x1ad890(0x464)],this[_0x1ad890(0x1c8)][_0x1ad890(0x335)]+=_0x411762['value2'],_0x4326de=!![];break;case Game_Action[_0x1ad890(0x400)]:this[_0x1ad890(0x1c8)][_0x1ad890(0x404)]+=_0x411762[_0x1ad890(0x464)],_0x4326de=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x1ad890(0x1c8)][_0x1ad890(0x27a)][_0x1ad890(0x1e7)](_0x411762[_0x1ad890(0x30b)]),_0x4326de=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0x1ad890(0x1c8)][_0x1ad890(0x25a)][_0x1ad890(0x1e7)](_0x411762[_0x1ad890(0x30b)]),this['_itemData'][_0x1ad890(0x284)]=!![],_0x4326de=!![];break;case Game_Action[_0x1ad890(0x290)]:this[_0x1ad890(0x1c8)]['changeBuff'][_0x411762[_0x1ad890(0x30b)]]+=0x1,_0x4326de=!![];break;case Game_Action[_0x1ad890(0x20c)]:this[_0x1ad890(0x1c8)]['changeBuff'][_0x411762['dataId']]-=0x1,_0x4326de=!![];break;case Game_Action[_0x1ad890(0x3d5)]:this['_itemData'][_0x1ad890(0x347)][_0x1ad890(0x1e7)](_0x411762[_0x1ad890(0x30b)]),this['_itemData']['removeStateBuffChanges']=!![],_0x4326de=!![];break;case Game_Action[_0x1ad890(0x402)]:this[_0x1ad890(0x1c8)][_0x1ad890(0x2ad)]['push'](_0x411762['dataId']),this[_0x1ad890(0x1c8)][_0x1ad890(0x284)]=!![],_0x4326de=!![];break;}}if(this['_itemData']['addState'][_0x1ad890(0x443)]>0x0)this['_itemData'][_0x1ad890(0x2e7)]=!![];for(let _0x575c4e=0x0;_0x575c4e<this[_0x1ad890(0x1c8)][_0x1ad890(0x43c)]['length'];_0x575c4e++){if(this[_0x1ad890(0x1c8)][_0x1ad890(0x43c)][_0x575c4e]!==0x0)this[_0x1ad890(0x1c8)][_0x1ad890(0x2e7)]=!![];}this['_item'][_0x1ad890(0x2fc)]!==0x0&&(this['_itemData'][_0x1ad890(0x2e5)]=this['_item'][_0x1ad890(0x2fc)],_0x4326de=!![]);const _0x224078=['HP\x20RECOVERY','MP\x20RECOVERY',_0x1ad890(0x2df),'HP\x20DAMAGE',_0x1ad890(0x451),_0x1ad890(0x3b5),_0x1ad890(0x315),_0x1ad890(0x4d7),_0x1ad890(0x3a4)];for(const _0x58fa8a of _0x224078){if(this[_0x1ad890(0x48f)][_0x58fa8a]){_0x4326de=!![];break;}}return _0x4326de;},Window_ShopStatus['prototype']['drawItemEffectsHpRecovery']=function(_0x37211e,_0x3b70f5,_0x4a0adf){const _0x1579c8=_0x2be66f,_0x1bea99=_0x1579c8(0x1ec);if(this['_itemData'][_0x1579c8(0x353)]<=0x0&&this[_0x1579c8(0x1c8)][_0x1579c8(0x1b5)]<=0x0&&!this['_customItemInfo'][_0x1bea99])return![];const _0x299aba=this[_0x1579c8(0x3d0)]();this['drawItemKeyData'](_0x299aba,_0x37211e,_0x3b70f5,_0x4a0adf,!![]);const _0x4fbbc6=this[_0x1579c8(0x483)]();return this[_0x1579c8(0x2e6)](ColorManager[_0x1579c8(0x2fe)](0x1)),this[_0x1579c8(0x289)](_0x4fbbc6,_0x37211e,_0x3b70f5,_0x4a0adf,![],_0x1579c8(0x4a1)),this[_0x1579c8(0x2f8)](_0x37211e,_0x3b70f5,_0x4a0adf),this[_0x1579c8(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3d0)]=function(){const _0x464bbe=_0x2be66f,_0x10980c=VisuMZ[_0x464bbe(0x3f9)][_0x464bbe(0x2ec)][_0x464bbe(0x4be)]['LabelRecoverHP'];return _0x10980c[_0x464bbe(0x4bd)](TextManager['hp']);},Window_ShopStatus['prototype'][_0x2be66f(0x483)]=function(){const _0x4cbdf2=_0x2be66f,_0x25b010=_0x4cbdf2(0x1ec);if(this[_0x4cbdf2(0x48f)][_0x25b010])return this['_customItemInfo'][_0x25b010];let _0x4d147='';if(this['_itemData'][_0x4cbdf2(0x353)]>0x0)_0x4d147+=_0x4cbdf2(0x3d6)[_0x4cbdf2(0x4bd)](Math[_0x4cbdf2(0x2aa)](this[_0x4cbdf2(0x1c8)][_0x4cbdf2(0x353)]*0x64));if(this[_0x4cbdf2(0x1c8)][_0x4cbdf2(0x353)]>0x0&&this[_0x4cbdf2(0x1c8)][_0x4cbdf2(0x1b5)]>0x0)_0x4d147+='\x20';if(this['_itemData'][_0x4cbdf2(0x1b5)]>0x0)_0x4d147+='+%1'['format'](this['_itemData']['flatHP']);return _0x4d147;},Window_ShopStatus[_0x2be66f(0x3c7)]['drawItemEffectsMpRecovery']=function(_0x4b0bd9,_0x2173e5,_0x234359){const _0x1fd50d=_0x2be66f,_0x40ecf6=_0x1fd50d(0x42b);if(this['_itemData'][_0x1fd50d(0x1b8)]<=0x0&&this[_0x1fd50d(0x1c8)]['flatMP']<=0x0&&!this[_0x1fd50d(0x48f)][_0x40ecf6])return![];const _0x373099=this[_0x1fd50d(0x2be)]();this[_0x1fd50d(0x289)](_0x373099,_0x4b0bd9,_0x2173e5,_0x234359,!![]);const _0x2635cb=this[_0x1fd50d(0x27e)]();return this[_0x1fd50d(0x2e6)](ColorManager[_0x1fd50d(0x2fe)](0x3)),this[_0x1fd50d(0x289)](_0x2635cb,_0x4b0bd9,_0x2173e5,_0x234359,![],'right'),this[_0x1fd50d(0x2f8)](_0x4b0bd9,_0x2173e5,_0x234359),this[_0x1fd50d(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2be)]=function(){const _0x576a5c=_0x2be66f,_0x3b1532=VisuMZ[_0x576a5c(0x3f9)][_0x576a5c(0x2ec)]['StatusWindow'][_0x576a5c(0x4b2)];return _0x3b1532[_0x576a5c(0x4bd)](TextManager['mp']);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x27e)]=function(){const _0x1ad8ff=_0x2be66f,_0x3af656=_0x1ad8ff(0x42b);if(this[_0x1ad8ff(0x48f)][_0x3af656])return this[_0x1ad8ff(0x48f)][_0x3af656];let _0x1a9f21='';if(this[_0x1ad8ff(0x1c8)][_0x1ad8ff(0x1b8)]>0x0)_0x1a9f21+=_0x1ad8ff(0x3d6)[_0x1ad8ff(0x4bd)](Math[_0x1ad8ff(0x2aa)](this['_itemData'][_0x1ad8ff(0x1b8)]*0x64));if(this['_itemData']['rateMP']>0x0&&this[_0x1ad8ff(0x1c8)]['flatMP']>0x0)_0x1a9f21+='\x20';if(this[_0x1ad8ff(0x1c8)][_0x1ad8ff(0x335)]>0x0)_0x1a9f21+=_0x1ad8ff(0x35c)[_0x1ad8ff(0x4bd)](this['_itemData'][_0x1ad8ff(0x335)]);return _0x1a9f21;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3d7)]=function(_0x268ba5,_0x29f78d,_0x5bb8fa){const _0xd752f=_0x2be66f,_0xa3071=_0xd752f(0x2df);if(this[_0xd752f(0x1c8)][_0xd752f(0x404)]<=0x0&&!this[_0xd752f(0x48f)][_0xa3071])return![];const _0x320477=this['getItemEffectsTpRecoveryLabel']();this['drawItemKeyData'](_0x320477,_0x268ba5,_0x29f78d,_0x5bb8fa,!![]);const _0x441de1=this[_0xd752f(0x2f5)]();return this[_0xd752f(0x2e6)](ColorManager[_0xd752f(0x453)]()),this[_0xd752f(0x289)](_0x441de1,_0x268ba5,_0x29f78d,_0x5bb8fa,![],_0xd752f(0x4a1)),this[_0xd752f(0x2f8)](_0x268ba5,_0x29f78d,_0x5bb8fa),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemEffectsTpRecoveryLabel']=function(){const _0x20a669=_0x2be66f,_0x37a345=VisuMZ[_0x20a669(0x3f9)][_0x20a669(0x2ec)][_0x20a669(0x4be)][_0x20a669(0x256)];return _0x37a345[_0x20a669(0x4bd)](TextManager['tp']);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x2f5)]=function(){const _0x21d2bd=_0x2be66f,_0x44c299='TP\x20RECOVERY';if(this['_customItemInfo'][_0x44c299])return this[_0x21d2bd(0x48f)][_0x44c299];let _0x4ede78='';return _0x4ede78+=_0x21d2bd(0x35c)[_0x21d2bd(0x4bd)](this[_0x21d2bd(0x1c8)]['gainTP']),_0x4ede78;},Window_ShopStatus['prototype'][_0x2be66f(0x4ab)]=function(_0x15eae6,_0x4994d5,_0x53881d){const _0x2abc9f=_0x2be66f,_0x876c2=_0x2abc9f(0x315);if(this[_0x2abc9f(0x1c8)][_0x2abc9f(0x2e5)]===0x0&&!this[_0x2abc9f(0x48f)][_0x876c2])return![];const _0xd9e1dc=this['getItemEffectsSelfTpGainLabel']();this[_0x2abc9f(0x289)](_0xd9e1dc,_0x15eae6,_0x4994d5,_0x53881d,!![]);const _0x3258aa=this[_0x2abc9f(0x233)]();return this[_0x2abc9f(0x1c8)][_0x2abc9f(0x2e5)]>0x0?this[_0x2abc9f(0x2e6)](ColorManager[_0x2abc9f(0x453)]()):this['changeTextColor'](ColorManager['powerDownColor']()),this[_0x2abc9f(0x289)](_0x3258aa,_0x15eae6,_0x4994d5,_0x53881d,![],_0x2abc9f(0x4a1)),this['drawItemDarkRect'](_0x15eae6,_0x4994d5,_0x53881d),this[_0x2abc9f(0x3fb)](),!![];},Window_ShopStatus['prototype'][_0x2be66f(0x302)]=function(){const _0x50e9f0=_0x2be66f,_0x198a33=VisuMZ['ItemsEquipsCore'][_0x50e9f0(0x2ec)][_0x50e9f0(0x4be)][_0x50e9f0(0x475)];return _0x198a33[_0x50e9f0(0x4bd)](TextManager['tp']);},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x233)]=function(){const _0x471fac=_0x2be66f,_0x328d87=_0x471fac(0x315);if(this[_0x471fac(0x48f)][_0x328d87])return this['_customItemInfo'][_0x328d87];let _0x2e74e0='';return this[_0x471fac(0x1c8)][_0x471fac(0x2e5)]>0x0?_0x2e74e0+='+%1'['format'](this[_0x471fac(0x1c8)][_0x471fac(0x2e5)]):_0x2e74e0+='%1'[_0x471fac(0x4bd)](this['_itemData'][_0x471fac(0x2e5)]),_0x2e74e0;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4a7)]=function(_0x24eb23,_0x106ff0,_0x2916dc){const _0x373cd8=_0x2be66f,_0x3efd1a=_0x373cd8(0x231);if(this[_0x373cd8(0x1c8)][_0x373cd8(0x353)]>=0x0&&this[_0x373cd8(0x1c8)][_0x373cd8(0x1b5)]>=0x0&&!this[_0x373cd8(0x48f)][_0x3efd1a])return![];const _0x2eb511=this[_0x373cd8(0x32e)]();this['drawItemKeyData'](_0x2eb511,_0x24eb23,_0x106ff0,_0x2916dc,!![]);const _0x5e12d7=this[_0x373cd8(0x399)]();return this[_0x373cd8(0x2e6)](ColorManager[_0x373cd8(0x2fe)](0x0)),this[_0x373cd8(0x289)](_0x5e12d7,_0x24eb23,_0x106ff0,_0x2916dc,![],_0x373cd8(0x4a1)),this[_0x373cd8(0x2f8)](_0x24eb23,_0x106ff0,_0x2916dc),this[_0x373cd8(0x3fb)](),!![];},Window_ShopStatus['prototype'][_0x2be66f(0x32e)]=function(){const _0xc099d3=_0x2be66f,_0x5e418c=VisuMZ[_0xc099d3(0x3f9)][_0xc099d3(0x2ec)][_0xc099d3(0x4be)]['LabelDamageHP'];return _0x5e418c['format'](TextManager['hp']);},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemEffectsHpDamageText']=function(){const _0xf69a89=_0x2be66f,_0x930513=_0xf69a89(0x231);if(this['_customItemInfo'][_0x930513])return this[_0xf69a89(0x48f)][_0x930513];let _0xbae9f4='';if(this[_0xf69a89(0x1c8)][_0xf69a89(0x353)]<0x0)_0xbae9f4+=_0xf69a89(0x456)['format'](Math['floor'](this[_0xf69a89(0x1c8)][_0xf69a89(0x353)]*0x64));if(this[_0xf69a89(0x1c8)][_0xf69a89(0x353)]<0x0&&this[_0xf69a89(0x1c8)][_0xf69a89(0x1b5)]<0x0)_0xbae9f4+='\x20';if(this['_itemData'][_0xf69a89(0x1b5)]<0x0)_0xbae9f4+='%1'[_0xf69a89(0x4bd)](this[_0xf69a89(0x1c8)][_0xf69a89(0x1b5)]);return _0xbae9f4;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x46c)]=function(_0x527480,_0xd532d7,_0x302fbd){const _0x119cac=_0x2be66f,_0x3877c4=_0x119cac(0x451);if(this[_0x119cac(0x1c8)][_0x119cac(0x1b8)]>=0x0&&this[_0x119cac(0x1c8)]['flatMP']>=0x0&&!this['_customItemInfo'][_0x3877c4])return![];const _0x239867=this['getItemEffectsMpDamageLabel']();this[_0x119cac(0x289)](_0x239867,_0x527480,_0xd532d7,_0x302fbd,!![]);const _0x2451f2=this[_0x119cac(0x3a0)]();return this[_0x119cac(0x2e6)](ColorManager[_0x119cac(0x2fe)](0x2)),this['drawItemKeyData'](_0x2451f2,_0x527480,_0xd532d7,_0x302fbd,![],_0x119cac(0x4a1)),this[_0x119cac(0x2f8)](_0x527480,_0xd532d7,_0x302fbd),this[_0x119cac(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x41f)]=function(){const _0x19a5ff=_0x2be66f,_0x19bb0c=VisuMZ[_0x19a5ff(0x3f9)]['Settings'][_0x19a5ff(0x4be)][_0x19a5ff(0x1b7)];return _0x19bb0c[_0x19a5ff(0x4bd)](TextManager['mp']);},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemEffectsMpDamageText']=function(){const _0x762314=_0x2be66f,_0x523d61=_0x762314(0x451);if(this[_0x762314(0x48f)][_0x523d61])return this['_customItemInfo'][_0x523d61];let _0x372545='';if(this[_0x762314(0x1c8)][_0x762314(0x1b8)]<0x0)_0x372545+=_0x762314(0x456)[_0x762314(0x4bd)](Math[_0x762314(0x2aa)](this[_0x762314(0x1c8)][_0x762314(0x1b8)]*0x64));if(this[_0x762314(0x1c8)]['rateMP']<0x0&&this[_0x762314(0x1c8)]['flatMP']<0x0)_0x372545+='\x20';if(this[_0x762314(0x1c8)][_0x762314(0x335)]<0x0)_0x372545+='%1'['format'](this['_itemData'][_0x762314(0x335)]);return _0x372545;},Window_ShopStatus['prototype'][_0x2be66f(0x31f)]=function(_0x107a99,_0x3a10e4,_0x7cddc2){const _0xb31bfe=_0x2be66f,_0xae0f47='TP\x20DAMAGE';if(this[_0xb31bfe(0x1c8)][_0xb31bfe(0x404)]>=0x0&&!this[_0xb31bfe(0x48f)][_0xae0f47])return![];const _0x57d19a=this[_0xb31bfe(0x491)]();this[_0xb31bfe(0x289)](_0x57d19a,_0x107a99,_0x3a10e4,_0x7cddc2,!![]);const _0x2399af=this[_0xb31bfe(0x21b)]();return this[_0xb31bfe(0x2e6)](ColorManager['powerDownColor']()),this['drawItemKeyData'](_0x2399af,_0x107a99,_0x3a10e4,_0x7cddc2,![],_0xb31bfe(0x4a1)),this[_0xb31bfe(0x2f8)](_0x107a99,_0x3a10e4,_0x7cddc2),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemEffectsTpDamageLabel']=function(){const _0x5a54b4=_0x2be66f,_0x3d1f11=VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x5a54b4(0x1ff)];return _0x3d1f11[_0x5a54b4(0x4bd)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsTpDamageText']=function(){const _0x3e9762=_0x2be66f,_0x178950=_0x3e9762(0x3b5);if(this[_0x3e9762(0x48f)][_0x178950])return this[_0x3e9762(0x48f)][_0x178950];let _0x2b6c71='';return _0x2b6c71+='%1'[_0x3e9762(0x4bd)](this['_itemData'][_0x3e9762(0x404)]),_0x2b6c71;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x305)]=function(_0x18fe3d,_0x462927,_0x142e62){const _0x28c8c4=_0x2be66f,_0x2b39d4='ADDED\x20EFFECTS';if(!this['_itemData'][_0x28c8c4(0x2e7)]&&!this[_0x28c8c4(0x48f)][_0x2b39d4])return![];const _0x428ed2=this[_0x28c8c4(0x3f3)]();this[_0x28c8c4(0x289)](_0x428ed2,_0x18fe3d,_0x462927,_0x142e62,!![]);const _0x45cf26=this[_0x28c8c4(0x3a6)]();return this[_0x28c8c4(0x289)](_0x45cf26,_0x18fe3d,_0x462927,_0x142e62,![],_0x28c8c4(0x4a1)),this[_0x28c8c4(0x2f8)](_0x18fe3d,_0x462927,_0x142e62),this[_0x28c8c4(0x3fb)](),!![];},Window_ShopStatus['prototype'][_0x2be66f(0x3f3)]=function(){const _0x4a8da5=_0x2be66f;return VisuMZ[_0x4a8da5(0x3f9)][_0x4a8da5(0x2ec)]['StatusWindow'][_0x4a8da5(0x3b1)];},Window_ShopStatus[_0x2be66f(0x3c7)]['getItemEffectsAddedStatesBuffsText']=function(){const _0xa00f80=_0x2be66f,_0x4e4c61=_0xa00f80(0x4d7);if(this['_customItemInfo'][_0x4e4c61])return this[_0xa00f80(0x48f)][_0x4e4c61];let _0xee100c='',_0x4dcdb3=0x0;const _0x101615=0x8;for(const _0x30312d of this[_0xa00f80(0x1c8)][_0xa00f80(0x27a)]){const _0xc2f011=$dataStates[_0x30312d];if(_0xc2f011&&_0xc2f011['iconIndex']>0x0){_0xee100c+='\x5cI[%1]'[_0xa00f80(0x4bd)](_0xc2f011[_0xa00f80(0x3e0)]),_0x4dcdb3++;if(_0x4dcdb3>=_0x101615)return _0xee100c;}}for(let _0x5dce64=0x0;_0x5dce64<this[_0xa00f80(0x1c8)][_0xa00f80(0x43c)][_0xa00f80(0x443)];_0x5dce64++){const _0x1f0225=this['_itemData'][_0xa00f80(0x43c)][_0x5dce64],_0x483dae=Game_BattlerBase[_0xa00f80(0x3c7)][_0xa00f80(0x309)](_0x1f0225,_0x5dce64);if(_0x483dae>0x0){_0xee100c+='\x5cI[%1]'[_0xa00f80(0x4bd)](_0x483dae),_0x4dcdb3++;if(_0x4dcdb3>=_0x101615)return _0xee100c;}}return _0xee100c;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x4d5)]=function(_0x56fec7,_0x1cd714,_0x4cfb49){const _0x499a89=_0x2be66f,_0x581f18=_0x499a89(0x3a4);if(!this[_0x499a89(0x1c8)][_0x499a89(0x284)]&&!this[_0x499a89(0x48f)][_0x581f18])return![];const _0x29a442=this[_0x499a89(0x1f7)]();this[_0x499a89(0x289)](_0x29a442,_0x56fec7,_0x1cd714,_0x4cfb49,!![]);const _0x3f9087=this['getItemEffectsRemovedStatesBuffsText']();return this[_0x499a89(0x289)](_0x3f9087,_0x56fec7,_0x1cd714,_0x4cfb49,![],_0x499a89(0x4a1)),this[_0x499a89(0x2f8)](_0x56fec7,_0x1cd714,_0x4cfb49),this[_0x499a89(0x3fb)](),!![];},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x1f7)]=function(){const _0x5f03b5=_0x2be66f;return VisuMZ[_0x5f03b5(0x3f9)][_0x5f03b5(0x2ec)][_0x5f03b5(0x4be)][_0x5f03b5(0x3d2)];},Window_ShopStatus['prototype']['getItemEffectsRemovedStatesBuffsText']=function(){const _0x399bfb=_0x2be66f,_0x2c3280='REMOVED\x20EFFECTS';if(this[_0x399bfb(0x48f)][_0x2c3280])return this[_0x399bfb(0x48f)][_0x2c3280];let _0x52df5d='',_0x23096c=0x0;const _0xa97997=VisuMZ['ItemsEquipsCore'][_0x399bfb(0x2ec)][_0x399bfb(0x4be)][_0x399bfb(0x2d8)];for(const _0x557741 of this[_0x399bfb(0x1c8)]['removeState']){const _0x1a3aee=$dataStates[_0x557741];if(_0x1a3aee&&_0x1a3aee[_0x399bfb(0x3e0)]>0x0){_0x52df5d+=_0x399bfb(0x3ba)[_0x399bfb(0x4bd)](_0x1a3aee[_0x399bfb(0x3e0)]),_0x23096c++;if(_0x23096c>=_0xa97997)return _0x52df5d;}}for(let _0x5ca50f=0x0;_0x5ca50f<this['_itemData'][_0x399bfb(0x347)][_0x399bfb(0x443)];_0x5ca50f++){const _0x1c2413=Game_BattlerBase[_0x399bfb(0x3c7)]['buffIconIndex'](0x1,_0x5ca50f);if(_0x1c2413>0x0){_0x52df5d+='\x5cI[%1]'['format'](_0x1c2413),_0x23096c++;if(_0x23096c>=_0xa97997)return _0x52df5d;}}for(let _0x3169e7=0x0;_0x3169e7<this['_itemData'][_0x399bfb(0x2ad)][_0x399bfb(0x443)];_0x3169e7++){const _0x50a3aa=Game_BattlerBase['prototype'][_0x399bfb(0x309)](-0x1,_0x3169e7);if(_0x50a3aa>0x0){_0x52df5d+=_0x399bfb(0x3ba)[_0x399bfb(0x4bd)](_0x50a3aa),_0x23096c++;if(_0x23096c>=_0xa97997)return _0x52df5d;}}return _0x52df5d;},Window_ShopStatus['prototype'][_0x2be66f(0x30d)]=function(_0x3f0919,_0x272cb6,_0x30f692){const _0x576ba6=_0x2be66f;if(this[_0x576ba6(0x216)]['note'][_0x576ba6(0x239)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x190299=String(RegExp['$1'])[_0x576ba6(0x332)](/[\r\n]+/);for(const _0x1636b0 of _0x190299){if(_0x1636b0[_0x576ba6(0x239)](/(.*):[ ](.*)/i)){const _0xe1a0d8=String(RegExp['$1'])['trim'](),_0x5ed88b=String(RegExp['$2'])['trim']();this[_0x576ba6(0x3eb)](_0xe1a0d8,_0x5ed88b,_0x3f0919,_0x272cb6,_0x30f692),_0x272cb6+=this[_0x576ba6(0x296)]();}}}return this[_0x576ba6(0x3fb)](),_0x272cb6;},Window_ShopStatus[_0x2be66f(0x3c7)][_0x2be66f(0x3eb)]=function(_0x51b62d,_0x2b4fca,_0x30fa2d,_0x4ba5f7,_0x2c61ff){const _0x4cce30=_0x2be66f;this['drawItemKeyData'](_0x51b62d,_0x30fa2d,_0x4ba5f7,_0x2c61ff,!![]),this['drawItemKeyData'](_0x2b4fca,_0x30fa2d,_0x4ba5f7,_0x2c61ff,![],_0x4cce30(0x4a1)),this[_0x4cce30(0x2f8)](_0x30fa2d,_0x4ba5f7,_0x2c61ff),this[_0x4cce30(0x3fb)]();};