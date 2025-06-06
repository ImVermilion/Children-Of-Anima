/*
 * Copyright (c) 2024 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from https://ko-fi.com/pheonixkagedesu/shop
* or https://boosty.to/kagedesu).

 */

/*:
 * @plugindesc (v.2.9)[PRO] Visual Map Inventory
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/map-inventory
 *
 * @help
 * ---------------------------------------------------------------------------
 * Guides and extra resources you can find at:
 * http://kdworkshop.net/map-inventory/
 * 
 * Special Thanks: SMO_Valadorn, Zee, Fiquei, Carlos Ferreira, Raffle
 *
 * You can modify next files for customize look of Map Inventory
 *
 *      img \ pMapInventory folder
 *      data \ PKD_MapInventorySettings.json
 *      data \ PKD_UserChestSettings.json
 *      data \ PKD_MapChestSettings.json
 *
 * === Plugin have Plugin Commands
 *
 * Plugin commands list for PRG Maker MV
    - OpenMapInventory - open map inventory

    ---- ALL BELOW - PRO ONLY ----

    - MapUserChest - open map player storage chest
    - VisualChest NAME ICON - open visual chest,
        where NAME - chest name
        ICON - custom icon image name from img\pMapInventory folder
        NAME and ICON - optionals

        Examples:
        VisualChest SomeChest
        VisualChest SomeChest MyIcon

    - VisualChestStored NAME - open visual chest and keep items

    - VisaulChestStored NAME TYPE - open visual chest that can keep only specific items types
        VisaulChestStored Ammunition Ammo|Grenade (for example)
        You can use multiple types, separating them by | (no spaces)
        Use Note <aItemType:TYPE> to set TYPE for Item

    - VisaulChestStored NAME TYPE ICON

    - VisualChestIcon ICON - set custom icon for chest
        ICON - custom icon image name from img\pMapInventory folder

    - SetStoredChestLimit LIMIT - set cells limit for next visual chest
        LIMIT - available (open) cells count
        Call this plugin command before VisualChestStored command

    - InventoryButton Move X Y
    - InventoryButton Reset - reset settings and position
    - InventoryButton Show
    - InventoryButton Hide
    - InventoryButton Disable
    - InventoryButton Enable
 * ---------------------------------------------------------------------------
 * === Plugin script calls
 *
 *      - OpenMapInventory()
 *      - CloseMapInventory()
 *      - DisableMapInventory()
 *      - EnableMapInventory()
 *      - IsInventoryAllowed() - return true of false
 *      - OpenOrCloseMapInventory()
 *      - HideMapInventoryUI()
 *      - ShowMapInventoryUI()
 
    ---- ALL BELOW - PRO ONLY ----

    - OpenMapUserChest()
    - CloseMapUserChest()

    - MIOpenVisualChest(NAME) - open visual chest, where NAME - chest name
        Example: MIOpenVisualChest("Chest");

    - MIOpenVisualChestStored(NAME, TYPE) - open visual chest that can keep only specific items types
        MIOpenVisualChestStored("Ammunition", "Ammo|Grenade"); (for example)
        You can use multiple types, separating them by | (no spaces)
        Use Note <aItemType:TYPE> to set TYPE for Item

    - MIOpenVisualChestStoredForTrade(NAME, TYPE) - same as open visual chest, but this
        chest also will be available for Trade Script Calls (by chest NAME)
        Example: MIOpenVisualChestStoredForTrade("For Sell", "Misc")

    - MISetIconForChest(ICON_PIC_NAME) - set custom icon for visual chest
        Call this script call before MIOpenVisualChest | MIOpenVisualChestStored
        ICON_PIC_NAME - image name from img\pMapInventory folder

    - ClearAllStoredChests() - clear from all maps, all chests
    - ClearStoredChestsOnMap() - clear all stored chests on current map
    - ClearStoredChestsOnMap(ID) - clear all stored chests from map with ID
 
    - AddWeaponInPlayerStorage(ID, COUNT) - add weapon with ID to player storage
    - AddArmorInPlayerStorage(ID, COUNT) - add armor with ID  to player storage
    - AddItemInPlayerStorage(ID, COUNT) - add item with ID to player storage (not key items!)
    - MoveAllItemsToStorage() - move all items from inventory to player storage (not key items!)
    - MoveEquipedItemsToStorage() - move all equipped items to player storage (only party leader!)
    - ClearPlayerStorage() - delete all from player storage(warning!can 't be undone)
    - TakeAllFromContainer() - take all items from opened chest (or user chest) (same as Take All button)
     
    == Screen Button:
    - MIButtonMove(x, y)
    - MIButtonVisibility(state), where true - visible, false - hidden
    - MIButtonState(state), where true - enabled, false - disabled
    - MIButtonReset() - reset UI button settings (and position) to default 

    == Weight system:
    - GetMaxWeight() - return max carrying weight weight
    - GetCurrentWeight() - return current weight
    - IsOverWeight() - return true if overload (current items weight > max weight)
    - RefreshWeightSystem() - refrsh party weight
    - ModifyInventoryMaxWeight(value) - permanently add value to Party Max Weight(value should be > 0)
    
    == Limited Cells System:
    - IsHaveFreeSlotsForItems() - return true if player have free inventory slots for new items
    - IsHaveFreeSlotsForWeapons() - return true if player have free inventory slots for new weapons
    - IsHaveFreeSlotsForArmors() - return true if player have free inventory slots for new armors
    - MISetStoredChestLimit(limit) - set cells limit for next Visual Chest

    == Trade System:
    - MIPriceForItemsInTradeChest(NAME, VAR_ID) - return total price of all items in trade chest with NAME
        and also set total price to VAR_ID (if VAR_ID > 0) (NOT delete items from trade chest)
    - MIClearTradeChest(NAME) - delete all items from trade chest (NOT gain gold for items)
    - MITradeItemsFromChest(NAME) - return total price of all items in trade chest with NAME
        and also GAIN gold to party (DELETE all items)

 * ---------------------------------------------------------------------------
 *
 * === Database Note's
 * Items\Equipments\Weapons NOTES:
 *      <aItemType: CUSTOM_TYPE>
 *      <aItemType: CUSTOM_TYPE|CUSTOM_TYPE> (can be many types for one item)
 *      <aItemTypeColor: HEX_COLOR>
 *      <itemRare: QUALITY_LEVEL>
 *      <notForHotCell> (this item CAN'T be dragged to Hot Cell)
 *      <invDescBackImg:NAME>
 *      <weight: ITEM_WEIGHT>
 *      <weightStore: ADD_TO_MAX_WEIGHT>
 *      <iImg: NAME> - image as item icon (should be in img\pMapInventory\Icons\)
 * 
 *  Example:
 *      <aItemType:Ammunition>
 *      <aItemType:Weapon|Tool>
 *      <aItemTypeColor:#ba9059>
 *      <itemRare:2>
 *      <weight:6>
 *      <weightStore:20>
 *      <iImg:potion>
 *      <invDescBackImg:customBackground>
 *      <notForHotCell>
 * ---------------------------------------------------------------------------
 *  [PRO only] How add drop chance to item in visual chest:
 * 
 *  Add comment "chance:X" before Change Items event command
 *      where X - chance to drop in percent, 10, 20, 50 etc...
 * 
 *      Example: chance:50 - 50% drop chance to next item (weapon, equipment)
 *
 *  Extended chance:
 *      Comment "chance:X|V" - means chance to put item will be from variable ID X
 *         (value of variable X = chance value)
 *      Comment "chance:X|S" - means chance to put item will be from switch ID X
 *         (if switch X is ON -> 100 *)
 *  
 * ---------------------------------------------------------------------------
 * Since update 2.1 you can put items in chest based on variables
 * 
 *
 *   Add comment "put:TYPE:ID:COUNT" AFTER script call for open visual chest
 *      and BEFORE any gain item (weapon, armor) event command (REQUIRED at least one)
 *   Where: TYPE can be: item, weapon, armor
 *          ID - item ID from database (7) or variable ID (with item ID) (18|V)
 *          COUNT - count (1) or variable ID (with count value) (100|V)
 *
 *   Example:
 *      chance:50
 *      put:item:7:1 - Item with ID 7 (count 1)
 *      chance:10
 *      put:weapon:10|V:1 - Weapon with ID from variable 10 (count 1)
 *      put:item:8:4|V - Item with ID 8 (count from variable 4)
 *
 *  For more information and examples see: http://kdworkshop.net/map-inventory-random-items/
 * ---------------------------------------------------------------------------
 * Since update 2.3 you can select not only Items from Inventory
 *  via Select Item event command, but weapons or armor
 *
 * Use next script calls right before Select Item event command:
 *  - MI_SetSelectModeW();  // for select weapon
 *  - MI_SetSelectModeA(); // for select equipment (armor)
 *
 * After selecting done or invenroty closed select mode will be returned
 *  to default - Items
 * ---------------------------------------------------------------------------
 * Since update 2.3 you can create  items \ weapons\ equipment only for certain
 * actor usage
 *
 * Add <iOnlyForActor:X> to item\weapon\armor Note section, where X - Actor ID
 * only who can use this item \ equip this weapon or armor
 * ---------------------------------------------------------------------------
 * New Notetags since update 2.4:
 *
 * For equipments only:
 * <lvReq:X> - equip level requirements
 * For all items and equipments:
 * <invDescH:X> - change description window height (in px) for this item
 * <invDescW:X> - change description window width for this item
 * ---------------------------------------------------------------------------
 * Since update 2.5 you can switch hot cells groups
 * For create hot cells group see Plugin Parameter: Extra Groups
 * For switch, use script call: MI_SwitchHotCellsGroup(index)
 * Where 0 - default hot cells, from 1 - from Extra Groups
 *
 *
 * You can start Map Inventory in selection mode. When player click on any item
 * inventory will store item ID to variable.
 *
 * Use next script calls:
 * MISelectItemToVariable(type, variableId, commonEventId);
 *      Where type one of: "item", "keyItem", "weapon", "armor"
 *              variableId - variable ID where to store selected item ID
 *              commonEventId - common event ID to start after player select item
 *              (common event is optional, 0 - if you not need any)
 *
 *  Example: MISelectItemToVariable("item", 100, 24);
 *
 * MICloseSelectWindow(isCallCommonEvent); - force close selection item process (without selecting any)
 *      Where isCallCommonEvent true or false
 *      (if true, commonEvent will be called anyway, if you setup any in MISelectItemToVariable script call)
 * ---------------------------------------------------------------------------
 * Since update 2.8 you can show description window for any item anywhere via script calls
 *
 * For show description window use next script call:
 *  PKD_MI.showExternalItemDescriptionWindowFor(ITEM, X, Y, APPEAR_SPEED);
 *
 * Where ITEM - item object, X, Y - screen coordinates
 *      APPEAR_SPEED - null or 0 - instant, any number appears from transparency speed
 *
 * Example:  PKD_MI.showExternalItemDescriptionWindowFor($dataItems[11], 100, 200, 25);
 *
 *
 * For close (destroy window), use script call: PKD_MI.closeExternalDescriptionWindow();
 *
 *
 * Added script calls for control forbidden actors (for party selector) during game
 * (See Plugin Parameter Forbidden Actors)
 *
 * PKD_MI.addForbiddenActorForPartySelector(ACTOR_ID);
 * PKD_MI.removeForbiddenActorForPartySelector(ACTOR_ID);
 *
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 
 
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from https://ko-fi.com/pheonixkagedesu/shop
* or https://boosty.to/kagedesu).

 * 

 * @param OpenMapInventoryKey
 * @text Open Inventory Key
 * @type string
 * @default i
 * @desc
 * 
 * @param ceOnInvOpen:int
 * @parent OpenMapInventoryKey
 * @text Open CE
 * @type common_event
 * @default 0
 * @desc Common Event called when player open inventory
 * 
 * @param ceOnInvClose:int
 * @parent OpenMapInventoryKey
 * @text Close CE
 * @type common_event
 * @default 0
 * @desc Common Event called when player close inventory
 * 
 * @param seOnInvOpen
 * @parent OpenMapInventoryKey
 * @text Open SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default 
 * @desc Sound effect SE when player open inventory
 * 
 * @param seOnInvClose
 * @parent OpenMapInventoryKey
 * @text Close SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default
 * @desc Sound effect SE when player close inventory
 * 
 * @param isCloseOnlyByButton:b
 * @text Is Not close on ESC?
 * @parent OpenMapInventoryKey
 * @type boolean
 * @on Only button
 * @off ESC and button
 * @default false
 * @desc Should Map Inventory closes only when you click close button? If false - also closes by ESC key (or right click)
 * 
 * @param isPauseGameWhenInvOpen:b
 * @text Pause game on open?
 * @parent OpenMapInventoryKey
 * @type boolean
 * @on Pause
 * @off No
 * @default false
 * @desc [Experemental] Pause game when Inventory is opened
 * 
 * @param TakeAllChestKey
 * @text Take All From Chest Key
 * @type string
 * @default t
 * @desc
 * 
 * @param isCloseInventoryWithTakeAll:b
 * @text Close Inventory with Take All?
 * @parent TakeAllChestKey
 * @type boolean
 * @default false
 * @desc Close inventory after Take All items from chest?
 * 
 * @param useGamepad:b
 * @text Is Use Gamepad?
 * @type boolean
 * @default false
 * @desc Activate Map Inventory gamepad controls? (when Gamepad connected)
 * 
 * @param gpOpenKey
 * @parent useGamepad:b
 * @text Open Inventory Key
 * @type select
 * @option A
 * @option B
 * @option X
 * @option Y
 * @option Start
 * @option Back
 * @option LB
 * @option RB
 * @option LTrigger
 * @option RTrigger
 * @option LStick
 * @option RStick
 * @option dLeft
 * @option dRight
 * @option dUp
 * @option dDown
 * @default Back
 * @desc Gamepad key to open Map Inventory from Map Scene
 * 
 * @param spacer|inventorySettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerInventorySettings
 * @text Inventory settings
 * 
 * @param isSelectItemToEvent:bool
 * @parent headerInventorySettings
 * @text Is use for Select Item?
 * @type boolean
 * @default true
 * @desc Allow pick up item from Inventory for Select Item event command?
 * 
 * @param ShowEquipedItemsInInventory
 * @parent headerInventorySettings
 * @text Show Equipped items?
 * @type boolean
 * @default true
 * @desc Show already equiped items (armor, weapon) in inventory?
 * 
 * @param MapInventoryDrag
 * @parent headerInventorySettings
 * @text Allow Drag?
 * @type boolean
 * @default true
 * @desc Allow drag inventory window by mouse?
 * 
 * @param MapInventorySortEquip
 * @parent headerInventorySettings
 * @text Sort Equipments?
 * @type boolean
 * @default true
 * @desc Equipped items (armors, weapon) show first in inventory
 * 
 * @param MapInventorySortItems
 * @parent headerInventorySettings
 * @text Sort Items?
 * @type boolean
 * @default true
 * @desc Usable items show first in inventory
 * 
 * @param AllowAutoRefreshUsable
 * @parent headerInventorySettings
 * @text Auto Inventory Refresh?
 * @type boolean
 * @default true
 * @desc May cause lower game performance if inventory have many items
 * 
 * @param UseSlider
 * @parent headerInventorySettings
 * @text Use division slider?
 * @type boolean
 * @default true
 * @desc If true, you can divide item count when transferring items from one storage to another
 * 
 * @param AllowPartySelect
 * @parent headerInventorySettings
 * @text Allow Party Selector?
 * @type boolean
 * @default true
 * @desc Allow opens party selector when player want use item
 * 
 * @param seOnPartySelectorAppears
 * @parent AllowPartySelect
 * @text Open SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default
 * @desc Party selector appears SE
 * 
 * @param partySelectorVisualsSettings:j
 * @parent AllowPartySelect
 * @text Visual Settings
 * @type note
 * @default "\"actorFaceSize\": 46\n\"actorFaceMargins\": { \"x\": 6, \"y\": 6 }\n\"equipIconSize\": 20\n\"moveDistance\": 50\n\"moveSpeed\": 10\n\"fadeOutSpeed\": 25\n\"fadeInSpeed\": 50\n\"backgroundLayerSize\": { \"w\": -1, \"h\": -1 }\n\"backgroundLayerOpacity\": 200"
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * 
 * @param partySelectorFilter:intA
 * @parent AllowPartySelect
 * @text Forbidden Actors
 * @type actor[]
 * @default []
 * @desc Actors that will not appear in the Party Selector
 * 
 * @param AllowNonBattlePartyMembers
 * @parent headerInventorySettings
 * @text Allow > 4 party members?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can apply items from inventory to all party members
 * 
 * @param StaticDescPosition:b
 * @parent headerInventorySettings
 * @text Description static position?
 * @type boolean
 * @default false
 * @desc If true, description will be always in X, Y coordinates you set, not near the cursor  
 * 
 * @param StaticDescPosXY:struct
 * @parent StaticDescPosition:b
 * @text Description static XY
 * @type struct<XY2>
 * @default {"x:e":"0","y:e":"0"}
 * @desc X and Y coordinates for description window static position  
 * 
 * @param customHelpWinBack
 * @parent headerInventorySettings
 * @text Description background
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @default
 * @desc [Optional] Custom image for descrption window background
 * 
 * @param showUseOnlyImagePerActor:b
 * @parent headerInventorySettings
 * @text Show Use Only Actors?
 * @type boolean
 * @default false
 * @desc Who can equip image in desc. Require UseOnlyActor_ID.png and <iOnlyForActor:ID> note
 * 
 * @param useOnlyImagePerActorPos:struct
 * @parent showUseOnlyImagePerActor:b
 * @text Image position
 * @type struct<XY>
 * @default {"x:int":"196","y:int":"120"}
 * @desc X and Y coordinates  
 * 
 * @param showWhoEquipThisItem:b
 * @parent headerInventorySettings
 * @text Show Who is Equip?
 * @type boolean
 * @default false
 * @desc Show image of actor that equipped that item. Require InventorySlotB_Actor_ID.png
 * 
 * @param whoEquipImagePos:struct
 * @parent showWhoEquipThisItem:b
 * @text Image position
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc X and Y coordinates  
 * 
 * @param spacer|chestsSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerChestsSettings
 * @text Chests settings
 * 
 * @param AllowStoreInChest
 * @parent headerChestsSettings
 * @text Store items in chest?
 * @type boolean
 * @default true
 * @desc If true, you can move items from inventory to any stored chest
 * 
 * @param GoldItem:i
 * @parent headerChestsSettings
 * @text Gold Item
 * @type item
 * @default 0
 * @desc Item template for gold in visual chest, if 0 - just receive gold directly
 * 
 * @param chestTakeAllDelay:i
 * @parent headerChestsSettings
 * @text Take All Delay
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * @desc The delay (in frames) between taking each item when you Take All items from chest. 0 - not delay.
 * 
 * 
 * @param spacer|weightSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseWSystem
 * @text Use items weight system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can set weights to different items and should carry about inventory overloading
 * 
 * 
 * @param wSystemVariableId
 * @parent UseWSystem
 * @text Maximum Weight Var ID
 * @type variable
 * @default 1
 * @desc Set the maximum weight of the party in this variable
 * 
 * @param wSystemAutoStateId
 * @parent UseWSystem
 * @text Overweight Auto State ID
 * @type state
 * @default 0
 * @desc When there is an overweight, this state is applied automatically(it is removed itself too)
 * 
 * @param wSystemAllowSlowDown
 * @parent UseWSystem
 * @text Slowdown player when overweight?
 * @type boolean
 * @default false
 * @desc If true, player will moving slowly when inventoy is overweighted
 * 
 * @param wSystemEquipmentsIncluded:b
 * @parent UseWSystem
 * @text Equipped items still have weight
 * @type boolean
 * @default false
 * @desc If false, item weight don't counts if someone equipped this item
 * 
 * 
 * @param spacer|limitedSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseLimitedCellsSystem:b
 * @text Use limited cells system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can limit available inventory and stored chest cells
 * 
 * @param lcVariableItems:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Items
 * @type variable
 * @default 1
 * @desc Set open cells count for items category in this variable
 * 
 * @param lcVariableWeapons:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Weapons
 * @type variable
 * @default 1
 * @desc Set open cells count for weapons category in this variable
 * 
 * @param lcVariableArmors:int
 * @parent UseLimitedCellsSystem:b
 * @text Cells count for Armors
 * @type variable
 * @default 1
 * @desc Set open cells count for armor category in this variable
 * 
 * @param lsIgnoreLimitByGainItems:b
 * @parent UseLimitedCellsSystem:b
 * @text Limit item gain only from chests?
 * @type boolean
 * @default true
 * @desc If true, items will be added in inventory via Change Items event command anyway (if no free slots too)
 * 
 * @param spacer|screenButton @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseScreenButton
 * @text Button on Screen?
 * @type boolean
 * @default true
 * @desc [PRO] If true, you can open or close inventory using button on game screen
 * 
 * @param spacer|rareItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowRareItemSystem
 * @text Allow Item Quality System?
 * @type boolean
 * @default true
 * @desc If true, you can set quality level to items, using Note command
 * 
 * @param QualitySystemColor:b
 * @parent AllowRareItemSystem
 * @text Items names with quality colors?
 * @type boolean
 * @default false
 * @desc If true, item name color in Map Inventory will be same as item quality level color
 * 
 * @param QualitySystemColorWindows:b
 * @parent QualitySystemColor:b
 * @text In default windows as well?
 * @type boolean
 * @default false
 * @desc If true, item name color in default windows will be same as item quality level color
 * 
 * @param qualityIconsPerTier:b
 * @parent QualitySystemColor:b
 * @text Quality Icon per Tier?
 * @type boolean
 * @default false
 * @desc If true, will be used separate item per quality level.
 * 
 * @param qualityLevelBelowIcon:b
 * @parent QualitySystemColor:b
 * @text Quality image below?
 * @type boolean
 * @default false
 * @desc If true, quality level image will be BELOW icon
 * 
 * @param spacer|equipStatsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowEquipsStats
 * @text Allow Equipments stats?
 * @type boolean
 * @default true
 * @desc If true, you can see extra information (mouse scroll)
 * 
 * @param ShowFullEquipedStats
 * @parent AllowEquipsStats
 * @text Show full stats when equipped?
 * @type boolean
 * @default false
 * @desc If false, when item is equipped you can see only gained stats (without actor ones)
 * 
 * @param useShortStatsText
 * @parent AllowEquipsStats
 * @text Show short stats text?
 * @type boolean
 * @default false
 * @desc If true, you always will see only item stats (without actor ones)
 * 
 * @param ExtraDescriptionsForStats:structA
 * @parent AllowEquipsStats
 * @text Extra Descriptions
 * @type struct<LExtraDescData>[]
 * @default []
 * @desc Extra description page for weapon or equipment (mouse scroll)
 * 
 * @param IsUseAltDescsForStats:b
 * @parent AllowEquipsStats
 * @text Alternative Descriptions
 * @type boolean
 * @default false
 * @desc Alternative descriptions that contains all stats (without switching)
 * 
 * @param altDescSettings:struct
 * @parent IsUseAltDescsForStats:b
 * @text Settings
 * @type struct<LAltDescSettings>
 * @default {"isShowDefDescription:b":"false","isShowExtraDesription:b":"true","extraDescTitleText:str":"Description","extraDescTitleTextColor:str":"#b40dde","extraDescTitleStartY:i":"138","extraDescTextStartY:i":"114","isShowBasicStats:b":"true","isShowExtraStats:b":"false","extraStatsStartY:i":"200","helpersStartY:i":"128","descWindowNewHeight:i":"240"}
 * @desc Settings for alternative description mode
 * 
 * @param altDescDynamic:b
 * @parent AllowEquipsStats
 * @text Dynamic Stats
 * @type boolean
 * @default false
 * @desc Alternative way to show item stats (show only stats gains that item have)
 * 
 * @param altDescDynamicPositions:struct
 * @parent altDescDynamic:b
 * @text Stats Positions
 * @type struct<LDynStatsPositions>
 * @default {"position1:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":0}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":0}\"","position2:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":20}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":20}\"","position3:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":40}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":40}\"","position4:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":60}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":60}\"","position5:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":0}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":0}\"","position6:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":20}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":20}\"","position7:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":40}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":40}\"","position8:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":60}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":60}\""}
 * @desc Positions for stats
 * 
 * 
 * @param spacer|outerItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowOuterItems
 * @text Allow HotItems?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can see and use extra hot items cells on UI
 *  *
 * 
 * @param OIHotKeyText:struct
 * @parent AllowOuterItems
 * @text Hot Key Text Settings
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"22\",\"h:int\":\"20\"}","margins:struct":"{\"x:int\":\"10\",\"y:int\":\"18\"}","alignment:str":"right","outline:struct":"{\"color:css\":\"\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"Consolas\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#F9E159"}
 * 
 * @param OIHotKeyEnable:bool
 * @parent AllowOuterItems
 * @text Hot Keys Enabled?
 * @type boolean
 * @default true
 * @desc Can player use hot keys to activate hot items?
 * 
 * @param OIHotCells:structA
 * @parent AllowOuterItems
 * @text Screen Hot Cells
 * @type struct<LHotCell>[]
 * @default ["{\"key:str\":\"1\",\"pos:struct\":\"{\\\"x:int\\\":\\\"40\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"2\",\"pos:struct\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"3\",\"pos:struct\":\"{\\\"x:int\\\":\\\"120\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"f\",\"pos:struct\":\"{\\\"x:int\\\":\\\"160\\\",\\\"y:int\\\":\\\"560\\\"}\"}"]
 * @desc Hot cells for inventory items on screen
 * 
 * @param notUseExtraImgIconInHotCell:b
 * @parent OIHotCells:structA
 * @text Only IconSet icon?
 * @type boolean
 * @default false
 * @desc If true - item icon in hot cell always be from IconSet, not from <iImg:X> notetag
 * 
 * @param hotCellCustomIconSize:i
 * @parent OIHotCells:structA
 * @text Custom Hot Cell Icon Size
 * @type number
 * @min 0
 * @default 0
 * @desc [Optional] Custom icon size for Hot Cell. 0 - use same as Inventory cell
 * 
 * @param OIHotCellsEx:structA
 * @parent AllowOuterItems
 * @text Extra Groups
 * @type struct<OIHotCellsExGroup>[]
 * @default []
 * @desc Extra Hot cells groups, change groups by script call: MI_SwitchHotCellsGroup(index)
 * 
 * @param OIHotCellsShowDesc:bool
 * @parent AllowOuterItems
 * @text Show Description?
 * @type boolean
 * @default true
 * @desc Show description of hot cell item when hover by mouse?
 * 
 * @param hotCellRemoveItemAtZero:bool
 * @parent AllowOuterItems
 * @text Is auto remove?
 * @type boolean
 * @default false
 * @desc To delete an item from a cell if it is over (zero count)?
 * 
 * @param isAllowAssignHotCellsByHotKeys:b
 * @parent AllowOuterItems
 * @text Allows key assign?
 * @type boolean
 * @default false
 * @desc Assign an item from the inventory to the hot cell when the cell hot key is pressed
 * 
 * @param spacer|cellsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerCellsSettings
 * @text Inventory Cells Settings
 * 
 * @param UseImageIconsInWindows:b
 * @parent headerCellsSettings
 * @text Icons images in Windows?
 * @type boolean
 * @default true
 * @desc Use images as icons (iImg) in default windows?
 * 
 * @param UseCustomCellsSize:b
 * @parent headerCellsSettings
 * @text Use custom size of cells?
 * @type boolean
 * @default false
 * @desc If true, you can change size and count per page of inventory cells
 * 
 * @param CustomCellSettings:struct
 * @parent UseCustomCellsSize:b
 * @text Custom Cells Settings
 * @type struct<LCustomCell>
 * @default {"iconSize:i":"30","columnsPerPage:i":"5","rowsPerPage:i":"5","iconMode:i":"1"}
 * @desc Custom Cells Settings
 * 
 * @param userDisabledCellImage
 * @parent headerCellsSettings
 * @text Disabled image
 * @type file
 * @required 1
 * @dir img/pMapInventory/
 * @default
 * @desc [Optional] Image for disabled cell (added above cell when cell is disabled)
 * 
 * @param disabledCellClickSe:b
 * @parent headerCellsSettings
 * @text Disabled Cell SE
 * @type file
 * @required 1
 * @dir audio/se
 * @default
 * @desc [Optional] Play SE when you click on disabled cell
 * 
 * @param spacer|extraDescriptions @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 * @param ExtraDescriptions:structA
 * @text Extra Descriptions
 * @type struct<LBigInfoData>[]
 * @default []
 * @desc Description text for item when you press left mouse button on it
 * 
 * @param spacer|altDescriptionGroup @text‏‏‎ ‎@desc ===============================================
 * 
 * @param altDescriptionsList:structA
 * @text Alternative Descriptions
 * @type struct<LAltDescItemData>[]
 * @default []
 * @desc Alternative description windows for items
 * 
 * @param spacer|throwOutSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowThrowOutSystem:b
 * @text Allow Items Throw Out?
 * @type boolean
 * @default true
 * @desc [PRO] If true, you can throw out items from inventory
 * 
 * @param dropOutCommonEvent
 * @parent AllowThrowOutSystem:b
 * @text Drop Out CE
 * @type common_event
 * @default 0
 * @desc Common Event called when you drop out something. Use script MI_DroppedId() to get dropped item ID
 * 
 * @param ThrowOutSettings:struct
 * @parent AllowThrowOutSystem:b
 * @type struct<LThrowOutSettings>
 * @text Throw Out Settings
 * @desc Items throw out feature configuration 
 * @default {"margins:struct":"{\"x:int\":\"15\",\"y:int\":\"350\"}","startOpacity:int":"175","fadeOutSpeed:int":"5","throwOutSE":"Wind7"}
 * 
 * @param isShowDropOutSlider:b
 * @parent AllowThrowOutSystem:b
 * @text Is show slider?
 * @type boolean
 * @default false
 * @desc Show a slider to select the number of items? (if > 1)
 * 
 * @param isDropOutToGround:b
 * @parent AllowThrowOutSystem:b
 * @text Is drop out to Ground?
 * @type boolean
 * @default false
 * @desc [Extended Loot required] Throw an item to the ground if you drag it from the inventory
 * 
 * @param isDropOutViaThrowOutBox:b
 * @parent AllowThrowOutSystem:b
 * @text Is drop out from Throw Box?
 * @type boolean
 * @default false
 * @desc [Extended Loot required] Throw an item to the ground if you drag it on Throw Box
 * 
 * 
 * @param spacer|newCatSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isNewCatSys:b
 * @text Use new categories system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can setup own inventory categories
 * 
 * @param newCatSysButtons:struct
 * @parent isNewCatSys:b
 * @text Button images
 * @type struct<LUserCategoryButton>
 * @default {"main":"inventoryCategoryBtn_00","hovered":"inventoryCategoryBtn_01","selected":"inventoryCategoryBtn_03"}
 * @desc Images for categories buttons
 * 
 * @param newCatSysItems:structA
 * @parent isNewCatSys:b
 * @text Categories
 * @type struct<LUserCategory>[]
 * @default ["{\"name\":\"Items\",\"type\":\"items\",\"note\":\"\",\"icon\":\"inventoryCategory_iconItems\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"73\\\",\\\"y:int\\\":\\\"17\\\"}\"}","{\"name\":\"Weapons\",\"type\":\"weapons\",\"note\":\"\",\"icon\":\"inventoryCategory_iconWeapons\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"99\\\",\\\"y:int\\\":\\\"17\\\"}\"}","{\"name\":\"Armors\",\"type\":\"armors\",\"note\":\"\",\"icon\":\"inventoryCategory_iconArmor\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"125\\\",\\\"y:int\\\":\\\"17\\\"}\"}"]
 * @desc Inventory categories
 * 
 * @param spacer|extraOptionsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isUseExtraOptionsMenu:b
 * @text Use extra options?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can create extra options menu
 * 
 * @param getExtraMIOptions:structA
 * @parent isUseExtraOptionsMenu:b
 * @text Menu Items
 * @type struct<LExtraOption>[]
 * @default []
 * @desc Extra options (menu items) for Inventory
 * 
 * @param spacer|reqLevelSystemGroup @text‏‏‎ ‎@desc ===============================================
 * 
 * @param levelReqSystem:b
 * @text Use level requirements?
 * @type boolean
 * @default true
 * @desc You can set level requirements for equipment by <lvReq:X> notetag
 * 
 * @param levelReqSystemTf
 * @parent levelReqSystem:b
 * @text Text
 * @default [Level %1]
 * @desc Text in equipment description window, where %1 replaced by required level
 * 
 * @param lvReqTextSettings:struct
 * @text Settings
 * @parent levelReqSystem:b
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"40\",\"h:int\":\"16\"}","margins:struct":"{\"x:int\":\"224\",\"y:int\":\"130\"}","alignment:str":"right","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#18afd9"}
 * @desc Text settings
 * 
 * @param spacer|otherExtraOptions @text‏‏‎ ‎@desc ===============================================
 * 
 * @param extendedLootPluginAddons
 * @text Plugin: Extended Loot
 * @desc [Optional] Extended Loot Plugin addons. If you not have Extended Loot plugin
 * 
 * @param extendedLootListShowDesc:b
 * @parent extendedLootPluginAddons
 * @text Show desc for Loot List?
 * @type boolean
 * @default true
 * @desc Show descriptions for items in Loot List for Extended Loot Plugin
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command MI_VisualChest
 * @text Visual Chest
 * @desc Open Visual Chest
 * 
 * @arg name
 * @text Name
 * @desc Chest Title
 * @type text
 * @default CHEST
 * 
 * @arg image
 * @text Custom Icon
 * @desc Custom Icon image for this chest. Leave empty for default one
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @command MI_VisualChestStored
 * @text Stored Visual Chest
 * @desc Open Stored Visual Chest
 * 
 * @arg name
 * @text Name
 * @desc Chest Title
 * @type text
 * @default STORED
 * 
 * @arg types
 * @text Types
 * @desc You can store in chest only this types, example: Potions (for multiple types, use | -> Keys|Potions)
 * @type text
 * 
 * @arg limit
 * @text Limit
 * @type number
 * @min 0
 * @desc Cells limit in this chest (only if parameter Use limited cells system? is ON) 0 - no limit
 * @default 0
 * 
 * @arg image
 * @text Custom Icon
 * @desc Custom Icon image for this chest. Leave empty for default one
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @arg forTrade
 * @text Is trade chest?
 * @type boolean
 * @desc [Require unique chest Name] This chest will be available for trade script calls.
 * @default false
 * 
 * @command MI_UserChestOpen
 * @text Player Storage: Open
 * @desc Open User (Player) Storage
 * 
 * @command MI_Inventory_State
 * @text Inventory: State
 * @desc Set Inventory State (Enable or Disable)
 * 
 * @arg state
 * @text Enable (Active)
 * @desc Set ON (true) to allow open inventory or OFF (false) to disallow
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Move
 * @text Button: Move
 * @desc Move UI Button X, Y
 * 
 * @arg X
 * @desc In pixels
 * @type number
 * @default 0
 * 
 * @arg Y
 * @desc In pixels
 * @type number
 * @default 0
 * 
 * @command MI_Button_Visibility
 * @text Button: Visible
 * @desc Set UI Button Visibility
 * 
 * @arg state
 * @text Visible
 * @desc Set ON (true) to set button visible or OFF (false) to hide button
 * @type boolean
 * @default true
 * 
 * @command MI_Button_State
 * @text Button: State
 * @desc Set UI Button State (Enable or Disable)
 * 
 * @arg state
 * @text Enable (Active)
 * @desc Set ON (true) to set button active or OFF (false) to disable button
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Reset
 * @text Button: Reset
 * @desc Reset UI Button position and settings to default
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.2.9)[PRO] Инвентарь
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/map-inventory
 *
 * @help
 * ---------------------------------------------------------------------------
 * Доп. гайды и ресурсы можно найти тут:
 * http://kdworkshop.net/map-inventory/
 * 
 * Спасибо: SMO_Valadorn, Zee, Fiquei, Carlos Ferreira, Raffle
 *
 * Изменить внешний вид инвентаря и его частей можно
 * редактируя следующие файлы:
 *
 *      изображения в папке img \ pMapInventory
 *      data \ PKD_MapInventorySettings.json
 *      data \ PKD_UserChestSettings.json
 *      data \ PKD_MapChestSettings.json
 *
 * === Плагин имеет команды плагина
 *
 * Список команд плагина для PRG Maker MV
    - OpenMapInventory - открыть инвентарь

    ---- КОМАНДЫ НИЖЕ ТОЛЬКО ДЛЯ [PRO] ВЕРСИИ ----

    - MapUserChest - открыть хранилище сундука
    - VisualChest NAME ICON - открыть сунудк,
        где NAME - название (заголовок)
        ICON - изображение иконки из папки img\pMapInventory
        NAME и ICON - эти параметры опциональны

        Примеры:
        VisualChest SomeChest
        VisualChest SomeChest MyIcon

    - VisualChestStored NAME - открыть сундук (который будет сохранять вещи)

    - VisaulChestStored NAME TYPE - открыть сундук только для специальных типов
        VisaulChestStored Ammunition Ammo|Grenade (пример)
        Можно использовать несколько типов, разделяя их символом | (без пробелов)
        Чтобы задать тип предмету, исп. заметку <aItemType:TYPE>

    - VisaulChestStored NAME TYPE ICON

    - VisualChestIcon ICON - задать пользовательскую иконку для сундука
        ICON - изображение иконки из папки img\pMapInventory
         * Вызывайте эту команду плагина перед командой VisualChestStored

    - SetStoredChestLimit LIMIT - установить лимит свободных ячеек для сундука
        LIMIT - количество открытых ячеек
        * Вызывайте эту команду плагина перед командой VisualChestStored

    - InventoryButton Move X Y
    - InventoryButton Reset - сбросить позицию и настройки
    - InventoryButton Show
    - InventoryButton Hide
    - InventoryButton Disable
    - InventoryButton Enable
 * ---------------------------------------------------------------------------
 * === Вызовы скриптов
 *
 *      - OpenMapInventory()
 *      - CloseMapInventory()
 *      - DisableMapInventory()
 *      - EnableMapInventory()
 *      - IsInventoryAllowed() - возвращает true или false
 *      - OpenOrCloseMapInventory()
 *      - HideMapInventoryUI()
 *      - ShowMapInventoryUI()
 
    ---- КОМАНДЫ НИЖЕ ТОЛЬКО ДЛЯ [PRO] ВЕРСИИ ----

    - OpenMapUserChest()
    - CloseMapUserChest()

    - MIOpenVisualChest(NAME) - открыть сундук, где NAME - имя сундука (заголовок)
        Пример: MIOpenVisualChest("Сундук");

    - MIOpenVisualChestStored(NAME, TYPE) - открыть сундук только для специальных типов
        MIOpenVisualChestStored("Ammunition", "Ammo|Grenade"); (для примера)
        Можно использовать несколько типов, разделяя их символом | (без пробелов)
        Чтобы задать тип предмету, исп. заметку <aItemType:TYPE>

    - MIOpenVisualChestStoredForTrade(NAME, TYPE) - аналогичная команда, только
        данный сундук будет доступен для продажи вещей из него (по имени)
        Example: MIOpenVisualChestStoredForTrade("For Sell", "Misc")
        Команды для продажи вещей см. ниже

    - MISetIconForChest(ICON_PIC_NAME) - задать пользовательскую иконку для сундука
        Call this script call before MIOpenVisualChest | MIOpenVisualChestStored
        ICON_PIC_NAME - изображение иконки из папки img\pMapInventory
        * Используйте перед скриптом MIOpenVisualChest и MIOpenVisualChestStored

    - ClearAllStoredChests() - очистить состояние всех сундуков на всех картах
    - ClearStoredChestsOnMap() - очистить состояние всех сундуков на ТЕКУЩЕЙ карте
    - ClearStoredChestsOnMap(ID) - очистить состояние всех сундуков на карте с номером = ID
 
    - AddWeaponInPlayerStorage(ID, COUNT) - добавить оружие (номер = ID) в хранилище игрока (COUNT - количество)
    - AddArmorInPlayerStorage(ID, COUNT) - добавить броню (номер = ID) в хранилище игрока (COUNT - количество)
    - AddItemInPlayerStorage(ID, COUNT) - добавить предмет (номер = ID) в хранилище игрока (COUNT - количество)
        * Квестовые предметы (Key Items) нельзя добавить в хранилище
    
    - MoveAllItemsToStorage() - переместить всё содержимое инвентаря в хранилище (кроме квестовых предметов)
    - MoveEquipedItemsToStorage() - переместить все экипированные вещи в хранилище (только с персонажа игрока)
    - ClearPlayerStorage() - очистить хранилище игрока (операция необратима)
    - TakeAllFromContainer() - забрать всё из открытого на данный момент сундука (хранилища)
     
    == Кнопка на экране:
    - MIButtonMove(x, y) - изменить позицию
    - MIButtonVisibility(state) - изменить видимость
    - MIButtonState(state) - изменить состояние (true - активна, false - деактивировать)
    - MIButtonReset() - сбросить все настройки кнопки (и позицию) по умолчанию

    == Система веса:
    - GetMaxWeight() - максимально возможный переносимый вес
    - GetCurrentWeight() - текущий вес всех вещей в инвентаре
    - IsOverWeight() - возвращает true если есть превышение веса
    - RefreshWeightSystem() - пересчитать текущий вес
    - ModifyInventoryMaxWeight(value) - добавить значение value к максимально возможному весу


    == Система ограничения количества открытых ячеек:
    - IsHaveFreeSlotsForItems() - возвращает true, если игрок имеет место для новых предметов (есть свободные ячейки)
    - IsHaveFreeSlotsForWeapons() - возвращает true, если игрок имеет место для нового оружия
    - IsHaveFreeSlotsForArmors() - возвращает true, если игрок имеет место для новой брони
    - MISetStoredChestLimit(limit) - установить количество (limit) открытых ячеек для сундука

    == Торговля (сундук):
    - MIPriceForItemsInTradeChest(NAME, VAR_ID) - вернуть общую стоимость предметов в сундуке (NAME)
        также (опционально) установить значение в переменную (VAR_ID) (не удаляет предметы из сундука)

    - MIClearTradeChest(NAME) - удалить все вещи из торгового сундука (просто удалить, без оплаты)

    - MITradeItemsFromChest(NAME) - вернуть общую стоимость предметов в сундуке (NAME)
        и дать золото игроку (удаляет предметы из сундука)

 * ---------------------------------------------------------------------------
 *
 * === Заметки для Базы данных
 * Предметы\Оружие\Броня:
 *      <aItemType: CUSTOM_TYPE> \\ Тип
 *      <aItemType: CUSTOM_TYPE|CUSTOM_TYPE> \\ может быть несколько, через |
 *      <aItemTypeColor: HEX_COLOR> \\ Цвет названия типа
 *      <itemRare: QUALITY_LEVEL> \\ Уровень качества
 *      <notForHotCell> \\ данный предмет нельзя поместить в ячейку быстрого доступа (Hot Cell)
 *      <invDescBackImg:NAME> \\ изображения для фона окна описания
 *      <weight: ITEM_WEIGHT> \\ вес предмета
 *      <weightStore: ADD_TO_MAX_WEIGHT> \\ добавляет к макс. переносимому весу
 *      <iImg: NAME> \\ картинка заместо иконки (из папки img\pMapInventory\Icons\)
 * 
 *  Примеры всех заметок:
 *      <aItemType:Аммуниция>
 *      <aItemType:Оружие|Инструмент>
 *      <aItemTypeColor:#ba9059>
 *      <itemRare:2>
 *      <weight:6>
 *      <weightStore:20>
 *      <iImg:potion>
 * ---------------------------------------------------------------------------
 *  [Только для PRO] Как добавить шанс появляения вещи в сунудке:
 * 
 *  Добавьте комментарий "chance:X" перед командой события на добавление вещи
 *      где X - шанс выпадения вещи в %, 10, 20, 50 и т.д...
 * 
 *      Пример: chance:50 - 50% шанс выпадения след. предмета (оружия, брони)
 *
 *  Расширенное значение шанса:
 *      Комментарий "chance:X|V" - означает что шанс будет взят из переменной с номером X
 *
 *      Комментарий "chance:X|S" - шанс будет взят из переключателя с номером X
 *         (если переключатель Х ВКЛ. -> 100 *)
 *  
 * ---------------------------------------------------------------------------
 * Начиная с обновления 2.1 появились расширенные комментарии для
 * добавления предметов в сундук с учётом разных условий и шанса
 * 
 *
 *   Комментарий "put:TYPE:ID:COUNT" ПОСЛЕ вызова скрипта открытия сундука
 *      и ДО любой команды события на получения предмета (оружия, брони) (НЕОБХОДИМА хотя бы одна)
 *   Где: TYPE принимает одно из значений: item (для предметов), weapon (для оружия), armor (для брони)
 *          ID - Номер предмета из базы данных (7) или номер переменной (18|V)
 *          COUNT - количество (1) или номер переменной (100|V)
 *
 *   Примеры:
 *      chance:50
 *      put:item:7:1 \\ Предмет (item) с номером 7, количество 1
 *      chance:10
 *      put:weapon:10|V:1 - Оружие с номером из переменной 10, количество 1
 *      put:item:8:4|V - Предмет с номером 8 (количество из переменной 4)
 *
 *  Подробный гайд тут: http://kdworkshop.net/map-inventory-random-items/
 * ---------------------------------------------------------------------------
 * Начиная с обновления 2.3 можно выбирать из инвентаря не только предметы
 *  но и оружие и экипировку (для команды события Выбор предмета)
 *
 * Исп. след. вызовы скриптов прям перед коммандой Выбрать предмет:
 *  - MI_SetSelectModeW();  // для выбора оружия
 *  - MI_SetSelectModeA(); // для выбора экипировки
 *
 * Когда выбор сделал (или инвентарь закрыт), режим выбора
 *  вернётся обратно на Предмет автоматически
 * ---------------------------------------------------------------------------
 *  Начиная с обновления 2.3 вы можете сделать чтобы предмет \ оружие или
 * доспех мог использовать только конкретный персонаж
 *
 * Добавьте <iOnlyForActor:X> к предмету в заметки, где Х - номер персонажа
 * который может использовать данный предмет (и только он)
 *
 * Add <iOnlyForActor:X> to item\weapon\armor Note section, where X - Actor ID
 * only who can use this item \ equip this weapon or armor
 * ---------------------------------------------------------------------------
 * Новые заметки в обновлении 2.4:
 *
 * Для экипировки:
 * <lvReq:X> - требование к уровню персонажа (Х - уровень)
 * Для предметов и экипировки:
 * <invDescH:X> - новая высота (в пикселях) для окна описания этого предмета
 * <invDescW:X> - новая ширина (в пикселях) для окна описания этого предмета
 * ---------------------------------------------------------------------------
 * Начиная с обновления 2.5 можно переключать вкладки быстрых ячеек
 *
 * Для создания вкладки (группы), см. параметр плагина: Extra Groups
 * Скрипт для переключения вкладки: MI_SwitchHotCellsGroup(index)
 * Где 0 - стандартная группа, начиная с 1 - доп-ные группы
 *
 *
 * Альтернативный режим выбора предмета
 *
 * Вызовы скриптов:
 * MISelectItemToVariable(type, variableId, commonEventId);
 *      Где type один из: "item" (предмет), "keyItem" (ключевой предмет),
 *                          "weapon" (оружие), "armor" (элемент экипировки)
 *              variableId - номер переменной где будет хранится ID выбранного предмета
 *              commonEventId - общее событие, которое будет вызванно после выбора
 *                  (0 - если не нужно)
 *
 *  Пример: MISelectItemToVariable("item", 100, 24);
 *
 * MICloseSelectWindow(isCallCommonEvent); - отменить режим выбора предмета
 *      Где isCallCommonEvent true или false
 *      (если true (истинна), то общее событие будет вызванно в любом случае, даже если предмет не выбран)
 * ---------------------------------------------------------------------------
 * Начиная с обновления 2.8 можно открыть окно описания предмета где угодно
 *
 * Используйте следующий вызов скрипта:
 *  PKD_MI.showExternalItemDescriptionWindowFor(ITEM, X, Y, APPEAR_SPEED);
 *
 * Где ITEM - объект предмета, X, Y - координаты на экране
 *      APPEAR_SPEED - ничего или 0 - появится сразу, любое число - скорость появления
 *
 * Пример:  PKD_MI.showExternalItemDescriptionWindowFor($dataItems[11], 100, 200, 25);
 *
 *
 * Чтобы закрыть (уничтожить) окно, исп. вызов скрипта: PKD_MI.closeExternalDescriptionWindow();
 *
 * Добавлены скрипты чтобы управлять списокм запрещённых пересонажей (для выбора из группы)
 * (см. Параметр плагина: Запрещённые персонажи)
 *
 * PKD_MI.addForbiddenActorForPartySelector(ACTOR_ID);
 * PKD_MI.removeForbiddenActorForPartySelector(ACTOR_ID);
 *
 * ---------------------------------------------------------------------------
 * Получить PRO версию, а также поддержать меня Вы можете на Boosty
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 
 
* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

* Вы можете использовать плагин в коммерческих проектах на единственном
* условие, что этот плагин был приобретен на законных основаниях
* (через покупку на сайте https://boosty.to/kagedesu).

 * 

 * @param OpenMapInventoryKey
 * @text Кнопка: открыть инвентарь
 * @type string
 * @default i
 * @desc
 * 
 * @param ceOnInvOpen:int
 * @parent OpenMapInventoryKey
 * @text Open CE
 * @type common_event
 * @default 0
 * @desc Общее событие, когда игрок открывает инвентарь
 * 
 * @param ceOnInvClose:int
 * @parent OpenMapInventoryKey
 * @text Close CE
 * @type common_event
 * @default 0
 * @desc Общее событие, когда игрок закрывает инвентарь
 * 
 * @param seOnInvOpen
 * @parent OpenMapInventoryKey
 * @text Open SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default 
 * @desc Звуковой эффект, когда игрок открывает инвентарь
 * 
 * @param seOnInvClose
 * @parent OpenMapInventoryKey
 * @text Close SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default
 * @desc Звуковой эффект, когда игрок закрывает инвентарь
 * 
 * @param isCloseOnlyByButton:b
 * @text Закрывать на ESC?
 * @parent OpenMapInventoryKey
 * @type boolean
 * @on Нет, кнопкой
 * @off ESC и кнопка
 * @default false
 * @desc Закрывать инвентарь при нажатии ESC (правой кнопки мыши) или только при нажатии на кнопку закрыть?
 * 
 * @param TakeAllChestKey
 * @text Кнопка: взять всё
 * @type string
 * @default t
 * @desc
 * 
 * @param isCloseInventoryWithTakeAll:b
 * @text Закрывать инвентарь?
 * @parent TakeAllChestKey
 * @type boolean
 * @default false
 * @desc Закрывать инвентарь после нажатия кнопки Взять всё?
 * 
 * @param useGamepad:b
 * @text Исп. геймпад?
 * @type boolean
 * @default false
 * @desc Активировать режим управления инвентарём при помощи геймпада (должен быть подключён)
 * 
 * @param gpOpenKey
 * @parent useGamepad:b
 * @text Кнопка: открыть инвентарь
 * @type select
 * @option A
 * @option B
 * @option X
 * @option Y
 * @option Start
 * @option Back
 * @option LB
 * @option RB
 * @option LTrigger
 * @option RTrigger
 * @option LStick
 * @option RStick
 * @option dLeft
 * @option dRight
 * @option dUp
 * @option dDown
 * @default Back
 * @desc Кнопка на геймпдае чтобы открыть \ закрыть инвентарь
 * 
 * @param spacer|inventorySettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerInventorySettings
 * @text Основные настройки
 * 
 * @param isSelectItemToEvent:bool
 * @parent headerInventorySettings
 * @text Исп. в выборе предметов?
 * @type boolean
 * @default true
 * @desc Исп. выбор предмета из инвентаря в режиме выбора предметов в сообщениях?
 * 
 * 
 * @param ShowEquipedItemsInInventory
 * @parent headerInventorySettings
 * @text Показывать экип.?
 * @type boolean
 * @default true
 * @desc Показывать экипированные предметы в инвентаре?
 * 
 * @param MapInventoryDrag
 * @parent headerInventorySettings
 * @text Перетаскивание?
 * @type boolean
 * @default true
 * @desc Разрешить перетаскивание окна инвентаря с помощью мышки? (зажать и перетаскивать)
 * 
 * @param MapInventorySortEquip
 * @parent headerInventorySettings
 * @text Сортировка экип.?
 * @type boolean
 * @default true
 * @desc Экипированные предметы будут всегда впереди списка предметов
 * 
 * @param MapInventorySortItems
 * @parent headerInventorySettings
 * @text Сортировка предметов
 * @type boolean
 * @default true
 * @desc Предметы, которые можно исп. в данный момент, всегда будут впереди списка предметов
 * 
 * @param AllowAutoRefreshUsable
 * @parent headerInventorySettings
 * @text Авто. обновление?
 * @type boolean
 * @default true
 * @desc Обновлять статус предметов автоматически (можно исп. или нет) пока инвентарь открыт. Влияет на производительность.
 * 
 * @param UseSlider
 * @parent headerInventorySettings
 * @text Исп. слайдер?
 * @type boolean
 * @default true
 * @desc Если ВКЛ. то при перемещении предмета вы сможете указать количество при помощи слайдера
 * 
 * @param AllowPartySelect
 * @parent headerInventorySettings
 * @text Выбор члена партии?
 * @type boolean
 * @default true
 * @desc Будет ли показано доп. меню для выбора сопартийца при исп. предмета?
 * 
 * @param seOnPartySelectorAppears
 * @parent AllowPartySelect
 * @text Open SE
 * @type file
 * @dir audio/se
 * @require 1
 * @default
 * @desc Звуковой эффект появления меню выбора сопартийцев
 * 
 * @param partySelectorVisualsSettings:j
 * @parent AllowPartySelect
 * @text Visual Settings
 * @type note
 * @default "\"actorFaceSize\": 46\n\"actorFaceMargins\": { \"x\": 6, \"y\": 6 }\n\"equipIconSize\": 20\n\"moveDistance\": 50\n\"moveSpeed\": 10\n\"fadeOutSpeed\": 25\n\"fadeInSpeed\": 50\n\"backgroundLayerSize\": { \"w\": -1, \"h\": -1 }\n\"backgroundLayerOpacity\": 200"
 * @desc Настройки в формате [имя параметра]:[значение]. Только значение после : можно менять
 * 
 * @param partySelectorFilter:intA
 * @parent AllowPartySelect
 * @text Запрещённые персонажи
 * @type actor[]
 * @default []
 * @desc Список персонажей, которые не будут появляться в списке выбора сопартийца
 * 
 * @param AllowNonBattlePartyMembers
 * @parent headerInventorySettings
 * @text Более 4 сопартийвец?
 * @type boolean
 * @default false
 * @desc [PRO] Вы можете применять предметы на всех членов партии (если их более 4х)
 * 
 * @param StaticDescPosition:b
 * @parent headerInventorySettings
 * @text Статичная позиция описания?
 * @type boolean
 * @default false
 * @desc Если ВКЛ. окно описания всегда будет в одной позиции, которую вы задали, а не рядом с курсором 
 * 
 * @param StaticDescPosXY:struct
 * @parent StaticDescPosition:b
 * @text Позиция
 * @type struct<XY2>
 * @default {"x:e":"0","y:e":"0"}
 * @desc Позиция на экране для параметра  Статичная позиция описания
 * 
 * @param customHelpWinBack
 * @parent headerInventorySettings
 * @text Description background
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @default
 * @desc [Опционально] Изображение для фона окна описания предметов
 * 
 * 
 * @param spacer|chestsSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerChestsSettings
 * @text Настройки сундука
 * 
 * @param AllowStoreInChest
 * @parent headerChestsSettings
 * @text Можно хранить предметы в сундуках?
 * @type boolean
 * @default true
 * @desc Если да, то можно переместить предметы из инвентаря в сундук (VisualChestStored)
 * 
 * @param GoldItem:i
 * @parent headerChestsSettings
 * @text Золото
 * @type item
 * @default 0
 * @desc Предмет для отображения золота в сундуках, если 0 - то игрок будет получать золото сразу
 * 
 * @param chestTakeAllDelay:i
 * @parent headerChestsSettings
 * @text Задержка (Take All)
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * @desc Задержка (в кадрах) между подбором каждого предмета при нажатии кнопки Взять всё. 0 - нет задержки, все сразу берутся.
 * 
 * 
 * @param spacer|weightSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseWSystem
 * @text Исп. систему веса?
 * @type boolean
 * @default false
 * @desc [PRO] Если ВКЛ., то учитывается вес каждого одетого предмета (вес необходимо задать для каждого предмета в заметке)
 * 
 * 
 * @param wSystemVariableId
 * @parent UseWSystem
 * @text Макс. вес переменная
 * @type variable
 * @default 1
 * @desc Установите макс. возможный переносимый вес в эту переменную
 * 
 * @param wSystemAutoStateId
 * @parent UseWSystem
 * @text Состояние перевеса
 * @type state
 * @default 0
 * @desc Когда у игрока (группы) перевес, это состаяние будет накладыватся автоматически (и сниматься тоже)
 * 
 * @param wSystemAllowSlowDown
 * @parent UseWSystem
 * @text Замедление?
 * @type boolean
 * @default false
 * @desc Вкл. замедление движения игрока когда у него перевес?
 * 
 * @param wSystemEquipmentsIncluded:b
 * @parent UseWSystem
 * @text Учёт экипированных вещей
 * @type boolean
 * @default false
 * @desc Если ВЫКЛ., то вес экипированных вещей не учитывается
 * 
 * @param spacer|limitedSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseLimitedCellsSystem:b
 * @text Исп. систему ограниченных ячеек?
 * @type boolean
 * @default false
 * @desc [PRO] Если ВКЛ. можно установить сколько конкретно ячеек открыто в инвентаре для хранения предметов
 * 
 * @param lcVariableItems:int
 * @parent UseLimitedCellsSystem:b
 * @text Кол-во ячеек для предметов
 * @type variable
 * @default 1
 * @desc Задайте в эту ПЕРЕМЕННУЮ количество открытых ячеек для предметов
 * 
 * @param lcVariableWeapons:int
 * @parent UseLimitedCellsSystem:b
 * @text Кол-во ячеек для оружия
 * @type variable
 * @default 1
 * @desc Задайте в эту ПЕРЕМЕННУЮ количество открытых ячеек для оружия
 * 
 * @param lcVariableArmors:int
 * @parent UseLimitedCellsSystem:b
 * @text Кол-во ячеек для экипировки
 * @type variable
 * @default 1
 * @desc Задайте в эту ПЕРЕМЕННУЮ количество открытых ячеек для экипировки
 * 
 * @param lsIgnoreLimitByGainItems:b
 * @parent UseLimitedCellsSystem:b
 * @text Исп. лимит только в сунудках?
 * @type boolean
 * @default true
 * @desc Если ВКЛ., то предмет можно будет дать игроку через команду события даже если НЕТ свободных ячеек.
 * 
 * @param spacer|screenButton @text‏‏‎ ‎@desc ===============================================
 * 
 * @param UseScreenButton
 * @text Кнопка на экране?
 * @type boolean
 * @default true
 * @desc [PRO] Если ВКЛ., на экране будет доп. кнопка чтобы открыть или закрыть инвентарь
 * 
 * @param spacer|rareItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowRareItemSystem
 * @text Allow Item Quality System?
 * @type boolean
 * @default true
 * @desc If true, you can set quality level to items, using Note command
 * 
 * @param QualitySystemColor:b
 * @parent AllowRareItemSystem
 * @text Items names with quality colors?
 * @type boolean
 * @default false
 * @desc If true, item name color in Map Inventory will be same as item quality level color
 * 
 * @param QualitySystemColorWindows:b
 * @parent QualitySystemColor:b
 * @text In default windows as well?
 * @type boolean
 * @default false
 * @desc If true, item name color in default windows will be same as item quality level color
 * 
 * @param qualityIconsPerTier:b
 * @parent QualitySystemColor:b
 * @text Quality Icon per Tier?
 * @type boolean
 * @default false
 * @desc Если ВКЛ, то будет использоваться своя иконка для каждого уровня качества
 * 
 * @param qualityLevelBelowIcon:b
 * @parent QualitySystemColor:b
 * @text Quality image below?
 * @type boolean
 * @default false
 * @desc Если ВКЛ, то изображения качестве предмета будет ПОД иконкой предмета
 * 
 * @param showUseOnlyImagePerActor:b
 * @parent headerInventorySettings
 * @text Show Use Only Actors?
 * @type boolean
 * @default false
 * @desc Кто может экип. предмет. (в описании) Нужно UseOnlyActor_ID.png и заметка <iOnlyForActor:ID>
 * 
 * @param useOnlyImagePerActorPos:struct
 * @parent showUseOnlyImagePerActor:b
 * @text Image position
 * @type struct<XY>
 * @default {"x:int":"196","y:int":"120"}
 * @desc Координаты X и Y  
 * 
 * @param showWhoEquipThisItem:b
 * @parent headerInventorySettings
 * @text Show Who is Equip?
 * @type boolean
 * @default false
 * @desc Показывать на ком экипирован предмет. Нужен файл InventorySlotB_Actor_ID.png
 * 
 * @param whoEquipImagePos:struct
 * @parent showWhoEquipThisItem:b
 * @text Image position
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Координаты X и Y   
 * 
 * @param spacer|equipStatsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowEquipsStats
 * @text Allow Equipments stats?
 * @type boolean
 * @default true
 * @desc If true, you can see extra information (mouse scroll)
 * 
 * @param ShowFullEquipedStats
 * @parent AllowEquipsStats
 * @text Show full stats when equipped?
 * @type boolean
 * @default false
 * @desc If false, when item is equipped you can see only gained stats (without actor ones)
 * 
 * @param useShortStatsText
 * @parent AllowEquipsStats
 * @text Show short stats text?
 * @type boolean
 * @default false
 * @desc Если ВКЛ, то всегда будут показываться только хар-ки предмета
 * 
 * @param ExtraDescriptionsForStats:structA
 * @parent AllowEquipsStats
 * @text Extra Descriptions
 * @type struct<LExtraDescData>[]
 * @default []
 * @desc Extra description page for weapon or equipment (mouse scroll)
 * 
 * @param IsUseAltDescsForStats:b
 * @parent AllowEquipsStats
 * @text Alternative Descriptions
 * @type boolean
 * @default false
 * @desc Алтернативный режим окна описания. Содержит все параметры сразу.
 * 
 * @param altDescSettings:struct
 * @parent IsUseAltDescsForStats:b
 * @text Settings
 * @type struct<LAltDescSettings>
 * @default {"isShowDefDescription:b":"false","isShowExtraDesription:b":"true","extraDescTitleText:str":"Description","extraDescTitleTextColor:str":"#b40dde","extraDescTitleStartY:i":"138","extraDescTextStartY:i":"114","isShowBasicStats:b":"true","isShowExtraStats:b":"false","extraStatsStartY:i":"200","helpersStartY:i":"128","descWindowNewHeight:i":"240"}
 * @desc Настройки алтернативного режима
 * 
 * @param altDescDynamic:b
 * @parent AllowEquipsStats
 * @text Dynamic Stats
 * @type boolean
 * @default false
 * @desc Алтернативный режим отображения статов (только те, которые изменяются)
 * 
 * @param altDescDynamicPositions:struct
 * @parent altDescDynamic:b
 * @text Stats Positions
 * @type struct<LDynStatsPositions>
 * @default {"position1:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":0}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":0}\"","position2:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":20}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":20}\"","position3:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":40}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":40}\"","position4:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":2,\\\"y\\\":60}\\n\\\"statTextPosition\\\":{\\\"x\\\":60,\\\"y\\\":60}\"","position5:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":0}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":0}\"","position6:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":20}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":20}\"","position7:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":40}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":40}\"","position8:j":"\"\\\"statIconPosition\\\":{\\\"x\\\":130,\\\"y\\\":60}\\n\\\"statTextPosition\\\":{\\\"x\\\":184,\\\"y\\\":60}\""}
 * @desc Позиции для статов
 * 
 * 
 * @param spacer|outerItemsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowOuterItems
 * @text Allow HotItems?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can see and use extra hot items cells on UI
 *  *
 * @param OIHotKeyText:struct
 * @parent AllowOuterItems
 * @text Hot Key Text Settings
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"22\",\"h:int\":\"20\"}","margins:struct":"{\"x:int\":\"10\",\"y:int\":\"18\"}","alignment:str":"right","outline:struct":"{\"color:css\":\"\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"Consolas\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#F9E159"}
 * 
 * @param OIHotKeyEnable:bool
 * @parent AllowOuterItems
 * @text Hot Keys Enabled?
 * @type boolean
 * @default true
 * @desc Разрешить использование горячих клавишь для активации горячих ячеек?
 * 
 * @param OIHotCells:structA
 * @parent AllowOuterItems
 * @text Screen Hot Cells
 * @type struct<LHotCell>[]
 * @default ["{\"key:str\":\"1\",\"pos:struct\":\"{\\\"x:int\\\":\\\"40\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"2\",\"pos:struct\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"3\",\"pos:struct\":\"{\\\"x:int\\\":\\\"120\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"f\",\"pos:struct\":\"{\\\"x:int\\\":\\\"160\\\",\\\"y:int\\\":\\\"560\\\"}\"}"]
 * @desc Hot cells for inventory items on screen
 * 
 * @param notUseExtraImgIconInHotCell:b
 * @parent OIHotCells:structA
 * @text Only IconSet icon?
 * @type boolean
 * @default false
 * @desc Если ВКЛ - то иконка будет всегда из IconSet, а не из <iImg:X>
 * 
 * @param hotCellCustomIconSize:i
 * @parent OIHotCells:structA
 * @text Custom Hot Cell Icon Size
 * @type number
 * @min 0
 * @default 0
 * @desc [Опционально] Размер иконок для Hot Cell. 0 - по умолчанию (как в инвентаре)
 * 
 * @param OIHotCellsEx:structA
 * @parent AllowOuterItems
 * @text Extra Groups
 * @type struct<OIHotCellsExGroup>[]
 * @default []
 * @desc Extra Hot cells groups, change groups by script call: MI_SwitchHotCellsGroup(index)
 * 
 * @param OIHotCellsShowDesc:bool
 * @parent AllowOuterItems
 * @text Show Description?
 * @type boolean
 * @default true
 * @desc Show description of hot cell item when hover by mouse?
 * 
 * @param hotCellRemoveItemAtZero:bool
 * @parent AllowOuterItems
 * @text Is auto remove?
 * @type boolean
 * @default false
 * @desc Удалять предмет из ячейки, если он закончился (кол-во = 0)?
 * 
 * @param isAllowAssignHotCellsByHotKeys:b
 * @parent AllowOuterItems
 * @text Allows key assign?
 * @type boolean
 * @default false
 * @desc Назначать выделенный предмет из инвентаря в ячейку, если нажать кнопку ячейки
 * 
 * 
 * @param spacer|cellsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param headerCellsSettings
 * @text Inventory Cells Settings
 * 
 * @param UseImageIconsInWindows:b
 * @parent headerCellsSettings
 * @text Icons images in Windows?
 * @type boolean
 * @default true
 * @desc Use images as icons (iImg) in default windows?
 * 
 * @param UseCustomCellsSize:b
 * @parent headerCellsSettings
 * @text Use custom size of cells?
 * @type boolean
 * @default false
 * @desc Использовать свой размер ячеек?
 * 
 * @param CustomCellSettings:struct
 * @parent UseCustomCellsSize:b
 * @text Custom Cells Settings
 * @type struct<LCustomCell>
 * @default {"iconSize:i":"30","columnsPerPage:i":"5","rowsPerPage:i":"5","iconMode:i":"1"}
 * @desc Кастомные настройки для ячеек (размер, кол-во на стринице)
 * 
 * @param userDisabledCellImage
 * @parent headerCellsSettings
 * @text Disabled image
 * @type file
 * @required 1
 * @dir img/pMapInventory/
 * @default
 * @desc [Опционально] Изображение для ячейки, которая недоступна (накладывается поверх)
 * 
 * @param disabledCellClickSe:b
 * @parent headerCellsSettings
 * @text Disabled Cell SE
 * @type file
 * @required 1
 * @dir audio/se
 * @default
 * @desc [Опционально] Звук при нажатии на закрытую (недоступную) ячейку инвентаря
 * 
 * @param spacer|extraDescriptions @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 * @param ExtraDescriptions:structA
 * @text Extra Descriptions
 * @type struct<LBigInfoData>[]
 * @default []
 * @desc Description text for item when you press left mouse button on it
 * 
 * 
 * @param spacer|throwOutSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param AllowThrowOutSystem:b
 * @text Allow Items Throw Out?
 * @type boolean
 * @default true
 * @desc [PRO] Система выброса вещей из инвентаря
 * 
 * @param dropOutCommonEvent
 * @parent AllowThrowOutSystem:b
 * @text Drop Out CE
 * @type common_event
 * @default 0
 * @desc Общее событие, когды игрок выкидывает какой-либо предмет. Исп. скрипт MI_DroppedId() чтобы получить ID выброшенного предмета
 * 
 * @param ThrowOutSettings:struct
 * @parent AllowThrowOutSystem:b
 * @type struct<LThrowOutSettings>
 * @text Throw Out Settings
 * @desc Настройки
 * @default {"margins:struct":"{\"x:int\":\"15\",\"y:int\":\"350\"}","startOpacity:int":"175","fadeOutSpeed:int":"5","throwOutSE":"Wind7"}
 * 
 * @param isShowDropOutSlider:b
 * @parent AllowThrowOutSystem:b
 * @text Is show slider?
 * @type boolean
 * @default false
 * @desc [PRO] Показывать слайдер для выбора кол-ва предметов?
 * 
 * @param isDropOutToGround:b
 * @parent AllowThrowOutSystem:b
 * @text Is drop out to Ground?
 * @type boolean
 * @default false
 * @desc [Нужен Extended Loot] Выбрасывать предмет на землю если перетащить его из инвентаря
 * 
 * @param isDropOutViaThrowOutBox:b
 * @parent AllowThrowOutSystem:b
 * @text Is drop out from Throw Box?
 * @type boolean
 * @default false
 * @desc [Нужен Extended Loot] Выбрасывать предмет на землю если перетащить его на Throw Out Box
 * 
 * 
 * 
 * @param spacer|newCatSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isNewCatSys:b
 * @text Use new categories system?
 * @type boolean
 * @default false
 * @desc [PRO] If true, you can setup own inventory categories
 * 
 * @param newCatSysButtons:struct
 * @parent isNewCatSys:b
 * @text Button images
 * @type struct<LUserCategoryButton>
 * @default {"main":"inventoryCategoryBtn_00","hovered":"inventoryCategoryBtn_01","selected":"inventoryCategoryBtn_03"}
 * @desc Images for categories buttons
 * 
 * @param newCatSysItems:structA
 * @parent isNewCatSys:b
 * @text Categories
 * @type struct<LUserCategory>[]
 * @default ["{\"name\":\"Items\",\"type\":\"items\",\"note\":\"\",\"icon\":\"inventoryCategory_iconItems\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"73\\\",\\\"y:int\\\":\\\"17\\\"}\"}","{\"name\":\"Weapons\",\"type\":\"weapons\",\"note\":\"\",\"icon\":\"inventoryCategory_iconWeapons\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"99\\\",\\\"y:int\\\":\\\"17\\\"}\"}","{\"name\":\"Armors\",\"type\":\"armors\",\"note\":\"\",\"icon\":\"inventoryCategory_iconArmor\",\"iconMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"position:struct\":\"{\\\"x:int\\\":\\\"125\\\",\\\"y:int\\\":\\\"17\\\"}\"}"]
 * @desc Inventory categories
 * 
 * @param spacer|extraOptionsSystem @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isUseExtraOptionsMenu:b
 * @text Исп. доп. опции?
 * @type boolean
 * @default false
 * @desc [PRO] Если ВКЛ., вы можете создать доп. кнопки (меню) рядом с окном инвентаря
 * 
 * @param getExtraMIOptions:structA
 * @parent isUseExtraOptionsMenu:b
 * @text Доп. кнопки
 * @type struct<LExtraOption>[]
 * @default []
 * @desc
 * 
 * @param spacer|reqLevelSystemGroup @text‏‏‎ ‎@desc ===============================================
 * 
 * @param levelReqSystem:b
 * @text Use level requirements?
 * @type boolean
 * @default true
 * @desc You can set level requirements for equipment by <lvReq:X> notetag
 * 
 * @param levelReqSystemTf
 * @parent levelReqSystem:b
 * @text Text
 * @default [Level %1]
 * @desc Text in equipment description window, where %1 replaced by required level
 * 
 * @param lvReqTextSettings:struct
 * @text Settings
 * @parent levelReqSystem:b
 * @type struct<CText>
 * @default {"visible:bool":"true","size:struct":"{\"w:int\":\"40\",\"h:int\":\"16\"}","margins:struct":"{\"x:int\":\"224\",\"y:int\":\"130\"}","alignment:str":"right","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"2\"}","font:struct":"{\"face:str\":\"\",\"size:int\":\"14\",\"italic:bool\":\"false\"}","textColor:css":"#18afd9"}
 * @desc Text settings
 * 
 * @param spacer|otherExtraOptions @text‏‏‎ ‎@desc ===============================================
 * 
 * @param extendedLootPluginAddons
 * @text Plugin: Extended Loot
 * @desc [Optional] Extended Loot Plugin addons. If you not have Extended Loot plugin
 * 
 * @param extendedLootListShowDesc:b
 * @parent extendedLootPluginAddons
 * @text Show desc for Loot List?
 * @type boolean
 * @default true
 * @desc Show descriptions for items in Loot List for Extended Loot Plugin
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command MI_VisualChest
 * @text Visual Chest
 * @desc Открыть сундук
 * 
 * @arg name
 * @text Имя
 * @desc Заголовок сундука
 * @type text
 * @default СУНДУК
 * 
 * @arg image
 * @text Иконка
 * @desc Имя иконки для сундука. Пусто - стандартная
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @command MI_VisualChestStored
 * @text Stored Visual Chest
 * @desc Открыть сундук с возможностью хранить в нём вещи
 * 
 * @arg name
 * @text Имя
 * @desc Заголовок сундука
 * @type text
 * @default СУНДУК
 * 
 * @arg types
 * @text Типы
 * @desc Можно будет хранить только эти типы, пример: Зелья (чтобы указать несколько типов, исп. | -> Ключи|Зелья)
 * @type text
 * 
 * @arg limit
 * @text Лимит
 * @type number
 * @min 0
 * @desc Лимит ячеек в данном сунудке (Толькое если ВКЛ. соотв. параметр плагина) 0 - нет лимита
 * @default 0
 * 
 * @arg image
 * @text Иконка
 * @desc Имя иконки для сундука. Пусто - стандартная
 * @type file
 * @require 1
 * @dir img\pMapInventory
 * @default
 * 
 * @arg forTrade
 * @text Для продажи?
 * @type boolean
 * @desc [ТРЕБУЕТСЯ уникальное Имя] Этот сундук будет доступен для скриптов системы Торговля вещами из сундуков
 * @default false
 * 
 * @command MI_UserChestOpen
 * @text Хранилище
 * @desc Открыть хранилище игрока
 * 
 * @command MI_Inventory_State
 * @text Инвентарь: состояние
 * @desc Установить состояние инвентаря (активировать или отключить)
 * 
 * @arg state
 * @text Активен?
 * @desc ВКЛ. и можно будет октрывать инвентарь. ВЫКЛ. - инвентарь не будет открываться
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Move
 * @text Кнопка: Позиция
 * @desc Изменить позицию кнопки открытия инвентаря на экране
 * 
 * @arg X
 * @desc В пикселях
 * @type number
 * @default 0
 * 
 * @arg Y
 * @desc В пикселях
 * @type number
 * @default 0
 * 
 * @command MI_Button_Visibility
 * @text Кнопка: Видимость
 * @desc Изменить видимость кнопки открытия инвентаря на экране
 * 
 * @arg state
 * @text Видима?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command MI_Button_State
 * @text Кнопка: Состояние
 * @desc Изменить состояние кнопки открытия инвентаря на экране
 * 
 * @arg state
 * @text Активна?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command MI_Button_Reset
 * @text Кнопка: Сброс
 * @desc Сбросить все настройки кнопки открытия инвентаря до стандартных
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LCustomCell:
 * @param iconSize:i
 * @text Cell Size
 * @type number
 * @min 1
 * @default 30
 * @desc Cell size in px
 * 
 * @param columnsPerPage:i
 * @text Columns
 * @type number
 * @min 1
 * @default 5
 * @desc Columns count per page
 * 
 * @param rowsPerPage:i
 * @text Rows
 * @type number
 * @min 1
 * @default 5
 * @desc Rows count per page
 * 
 * @param iconMode:i
 * @text Icon Draw Mode
 * @type select
 * @option Center
 * @value 0
 * @option Stretch
 * @value 1
 * @default 1
 * @desc How icons will draw in cell
 */
/*~struct~LHotCell:
 * @param key:str
 * @text Hot Key
 * @type string
 * @default
 * @desc Keyboard key to use hot cell item
 *
 * @param pos:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Hot cell position on screen
 */
/*~struct~CText:
 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param textColor:css
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type string
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */
/*~struct~LBigInfoPicture:
 * @param imgName
 * @text Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Image filename
 * 
 * @param size:struct
 * @text Image Size
 * @type struct<WH>
 * @default
 * @desc Image size
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Description image position
 */
/*~struct~LBigInfoText:
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 * @param text
 * @text Text
 * @type note
 * @default This is \C[3] some example \C[0] description
 * @desc Description text, supports escape-characters and auto words wrapping
 * 
 * @param size:struct
 * @text Window Size
 * @type struct<WH>
 * @default
 * @desc Description text window size
 * 
 * @param position:struct
 * @text Position
 * @type struct<XY2>
 * @default
 * @desc Description text window position
 */
/*~struct~LBigInfoData:
 * @param itemId:int
 * @text Item
 * @type item
 * @default 1
 * @desc The item to be described [Only]
 * 
 * @param weaponId:int
 * @text Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to be described [Only]
 * 
 * @param armorId:int
 * @text Armor
 * @type armor
 * @default 0
 * @desc The armor to be described [Only]
 * 
 * @param picture:struct
 * @text Image
 * @type struct<LBigInfoPicture>
 * @default
 * @desc Image for item description [Optional]
 * 
 * @param info:struct
 * @text Desctiption
 * @type struct<LBigInfoText>
 * @default
 * @desc Description text
*/
/*~struct~LThrowOutSettings:

  * @param margins:struct
  * @text Margin
  * @type struct<XY>
  * @default
  * @desc Position of throw out box relative to Map Invenotry position

    * @param startOpacity:int
    * @type number
    * @min 0
    * @max 255
    * @text Start Opacity
    * @default 125
    * @desc from 0 to 255, 0 - transparent, 255 - opaque
    * 
    * 
    * @param fadeOutSpeed:int
    * @type number
    * @min 1
    * @max 255
    * @text Fade Out Speed
    * @default 5
    * @desc How fast throw out box will be active to throw item (opaque)
    * 
    * 
    * @param throwOutSE
    * @text SE
    * @type file
    * @dir audio/se
    * @require 1
    * @desc Sound effect when item been thowed out
*/

/*~struct~LExtraDescData:
 * @param weaponId:int
 * @text Weapon
 * @type weapon
 * @default 0
 * @desc The weapon to be described [Only]
 * 
 * @param armorId:int
 * @text Armor
 * @type armor
 * @default 0
 * @desc The armor to be described [Only]
 * 
 * @param info:struct
 * @text Desctiption
 * @type struct<LExtraDescInfoText>
 * @default {"font:struct":"{\"face:str\":\"\",\"size:int\":\"11\",\"italic:bool\":\"false\"}","text":"\"\\\\C[4]New Skill:     \\\\I[64]\\\\C[2]Fire II\\n\\n\\\\C[3]+Dragon Slayer\\\\C[0] - Grants you a 4 turn attack buff after hitting a dragon monster.\\n\"","size:struct":"{\"w:int\":\"260\",\"h:int\":\"160\"}"}
 * @desc Description text
*/

/*~struct~LExtraDescInfoText:
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default {"face:str":"","size:int":"11","italic:bool":"false"}
 * @desc Text font settings
 * 
 * @param text
 * @text Text
 * @type note
 * @default This is \C[3] some example \C[0] description
 * @desc Description text, supports escape-characters and auto words wrapping
 * 
 * @param size:struct
 * @text Description Size
 * @type struct<WH>
 * @default {"w:int":"260","h:int":"160"}
 * @desc Description text zone size
 */

 /*~struct~LUserCategory:
 * @param name
 * @text Category
 * @type string
 * @default User1
 * @desc Category name
 *
 * @param type
 * @text Type
 * @type select
 * @option items
 * @option weapons
 * @option armors
 * @option note
 * @default note
 * @desc For custom category type use note
 *
 * @param note
 * @parent type
 * @text Note text
 * @type string
 * @default user1
 * @desc Only if Type == note. Add to item\weapon\armor note's: <iCat:VALUE> (VALUE - this parameter value)
 *
 * @param icon
 * @text Icon
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @desc Icon image for category. Optional
 *
 * @param iconMargins:struct
 * @parent icon
 * @text Margins
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Icon margins relative button
 *
 * @param position:struct
 * @text Position
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Category button (icon) position relative inventory header

 * @param unlockedCellsVarId:int
 * @text Unlocked Cells Count
 * @type variable
 * @default 0
 * @desc Only for Type == note! Variable ID with unlocked cells in this category if you using Limited Cells System
 */

  /*~struct~LUserCategoryButton:
 * @param main
 * @text Image
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @desc Category button image
 *
  * @param hovered
 * @text Hovered
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @desc Category button image when hovered by mouse
 *
  * @param selected
 * @text Selected
 * @type file
 * @dir img/pMapInventory/
 * @require 1
 * @desc Category button image when selected (active)
 */

 /*~struct~LExtraOptionButton:
  @param main:str
  @text Image
  @type file
  @dir img/pMapInventory/
  @require 1
  @desc Option button image
  @default

  @param hover:str
  @text Hovered
  @type file
  @dir img/pMapInventory/
  @require 1
  @desc Option button image when hovered by mouse

  @param disabled:str
  @text Disabled
  @type file
  @dir img/pMapInventory/
  @require 1
  @desc Option button image when disabled
*/

/*~struct~LExtraOption:
  @param title:str
  @text Title
  @desc You can see this text in inventory window when hover option button
  @default My Option

  @param margins:s
  @text Offset
  @type struct<XY>
  @desc Offset relative inventory window
  @default {}

  @param images:s
  @text Images
  @type struct<LExtraOptionButton> 
  @desc Button state images
  @default {} 

  @param commonEvent:i
  @text Common Event
  @type common_event 
  @desc Starts this common event when click on option
  @default 0

  @param isEnabled:str
  @text Condition
  @desc Script call, if return false - button will be DISABLED. Leave empty - always enabled
  @default 

  @param gpCursorOffset:s
  @text Gamepad Cursor
  @type struct<XY>
  @desc Gamepad Cursor offset relative this option (when this option is selected)
  @default {"x:int":"0","y:int":"0"}
*/

/*~struct~LAltDescSettings:
 @param isShowDefDescription:b
 @text Is Show Default desc?
 @type boolean 
 @on Yes
 @off No
 @desc Show default item description? From database
 @default false

 @param isShowExtraDesription:b
 @text Is Show Extra desc?
 @type boolean 
 @on Yes
 @off No
 @desc Description text for this item from Extra Descriptions parameter
 @default true 

 @param extraDescTitleText:str
 @parent isShowExtraDesription:b
 @text Title text
 @type text 
 @desc 
 @default Description 

 @param extraDescTitleTextColor:str
 @parent isShowExtraDesription:b
 @text Title color
 @type text 
 @desc Color in HEX format (#FFFFFF)
 @default #b40dde 

 @param extraDescTitleStartY:i
 @parent isShowExtraDesription:b
 @text Title Start Y pos
 @type number 
 @desc 
 @default 138 

 @param extraDescTextStartY:i
 @parent isShowExtraDesription:b
 @text Desc text start Y pos
 @type number
 @desc 
 @default 114 

 @param isShowBasicStats:b
 @text Is Show Basic Stats?
 @type boolean 
 @on Yes
 @off No
 @desc 
 @default true 

 @param isShowExtraStats:b
 @text Is Show Extra Stats?
 @type boolean 
 @on Yes
 @off No
 @desc
 @default false 

 @param extraStatsStartY:i
 @parent isShowExtraStats:b
 @text Start Y pos
 @type number 
 @desc 
 @default 200 

 @param helpersStartY:i
 @text Action Icons Y
 @type number 
 @desc Action icons new Y position
 @default 128 

 @param descWindowNewHeight:i
 @text New Height
 @type number 
 @desc 
 @default 240 
*/

/*~struct~OIHotCellsExGroup:
  @param OIHotCells:structA
  @text Hot Cells Group
  @type struct<LHotCell>[]
  @default ["{\"key:str\":\"1\",\"pos:struct\":\"{\\\"x:int\\\":\\\"40\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"2\",\"pos:struct\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"3\",\"pos:struct\":\"{\\\"x:int\\\":\\\"120\\\",\\\"y:int\\\":\\\"560\\\"}\"}", "{\"key:str\":\"f\",\"pos:struct\":\"{\\\"x:int\\\":\\\"160\\\",\\\"y:int\\\":\\\"560\\\"}\"}"]
  @desc Hot cells group
*/

/*~struct~LDynStatsPositions:

  @param position1:j
  @text Position 1
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position2:j
  @text Position 2
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position3:j
  @text Position 3
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position4:j
  @text Position 4
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position5:j
  @text Position 5
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position6:j
  @text Position 6
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position7:j
  @text Position 7
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

  @param position8:j
  @text Position 8
  @type note
  @default "\"statIconPosition\":{\"x\":0,\"y\":0}\n\"statTextPosition\":{\"x\":0,\"y\":0}"
  @desc Edit values after X and Y. Value should be Number (without quotes)

*/


/*~struct~LAltDescItemData:

  @param itemId:i
  @text Item
  @type item
  @default 7
  @desc This description will be for the specified item

  @param background
  @text Image
  @type file
  @require 1
  @dir img/pMapInventory
  @desc Background image for description window

  @param marginX:i
  @parent background
  @text Margin X
  @type number
  @default 24
  @desc How many pixels from Cursor Point or Cell to description Window

  @param marginY:i
  @parent background
  @text Margin Y
  @type number
  @default 24
  @desc How many pixels from Cursor Point or Cell to description Window

  @param dataGroup
  @text Description Data

  @param specialTitle
  @parent dataGroup
  @text Name
  @desc [Optional] Special name for item, leave empty for use from DB

  @param specialIconIndex
  @parent dataGroup
  @text Icon
  @desc [Optional] Special icon for item, leave empty for use from DB

  @param extraDescription
  @parent dataGroup
  @text Description
  @desc [Optional] Special description for item, leave empty for use from DB

  @param visualGroup
  @text Visual Settings

  @param titleTextSettings:j
  @parent visualGroup
  @text Title settings
  @type note
  @desc Edit values after X and Y. Value should be Number (without quotes)
  @default "\"visible\": true\n\"size\": { \"w\": 190, \"h\": 36 }\n\"alignment\": \"center\"\n\"font\": { \"face\": \"\", \"size\": 14, \"italic\": false }\n\"margins\": { \"x\": 0, \"y\": 4 }\n\"outline\": { \"color\": \"#000000\", \"width\": 2 }\n\"textColor\": \"#FFFFFF\""

  @param iconSettings:j
  @parent visualGroup
  @text Icon settings
  @type note
  @desc Edit values after X and Y. Value should be Number (without quotes)
  @default "\"visible\": true\n\"size\": 32\n\"margins\": { \"x\": 78, \"y\": 43 }\n"

  @param descriptionSettings:j
  @parent visualGroup
  @text Description settings
  @type note
  @desc Edit values after X and Y. Value should be Number (without quotes)
  @default "\"visible\": true\n\"size\": { \"w\": 146, \"h\": 196 }\n\"font\": { \"face\": \"\", \"size\": 12, \"italic\": false }\n\"margins\": { \"x\": 24, \"y\": 98 }\n"

*/


var Imported = Imported || {};
Imported.PKD_MapInventory = true;

var PKD_MI = {};
PKD_MI.LIBS = {};

PKD_MI.register = function (library) {
    this.LIBS[library.name] = library;
};

PKD_MI.warning = function(warnMsg, error) {
    console.warn(warnMsg);
    if (error) {
        console.warn(error);
    }
};

// * Since update 2.0 MI not get more PUBLIC updates
PKD_MI.isPro = function() {
    return true;
};

PKD_MI.Version = 290;

DataManager._databaseFiles.push({
    name: '$PKD_MapInventorySettings',
    src: 'PKD_MapInventorySettings.json'
});

DataManager._databaseFiles.push({
    name: '$PKD_MapChestSettings',
    src: 'PKD_MapChestSettings.json'
});

DataManager._databaseFiles.push({
    name: '$PKD_UserChestSettings',
    src: 'PKD_UserChestSettings.json'
});

ImageManager.loadPKDMI = function (filename) {
    return this.loadBitmap('img/pMapInventory/', filename, 0, true);
};

ImageManager.loadPKDMI_Icon = function (filename) {
    return this.loadBitmap('img/pMapInventory/icons/', filename, 0, true);
};

// * from ALPHA ABS, NOT ABS MAP
PKD_MI.isMap = function() {
    return false;
};

PKD_MI.getUIMapInventorySettings = function() {
    return $PKD_MapInventorySettings;
};

PKD_MI.getUIMapUserChestSettings = function() {
    return $PKD_UserChestSettings;
};

PKD_MI.getUIMapChestSettings = function () {
    return $PKD_MapChestSettings;
};


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



/*!
 * pixi-filters - v4.2.0
 * Compiled Fri, 05 Aug 2022 19:51:27 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,n,t,r,o,i,l,a){"use strict";var s=function(e,n){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,n){e.__proto__=n}||function(e,n){for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])})(e,n)};function u(e,n){function t(){this.constructor=e}s(e,n),e.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}var f=function(){return(f=Object.assign||function(e){for(var n,t=arguments,r=1,o=arguments.length;r<o;r++)for(var i in n=t[r])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};Object.create;Object.create;var c="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",m=function(e){function n(n){var t=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n")||this;return t.gamma=1,t.saturation=1,t.contrast=1,t.brightness=1,t.red=1,t.green=1,t.blue=1,t.alpha=1,Object.assign(t,n),t}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},n}(n.Filter),p=function(e){function n(n){void 0===n&&(n=.5);var t=e.call(this,c,"\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n")||this;return t.threshold=n,t}return u(n,e),Object.defineProperty(n.prototype,"threshold",{get:function(){return this.uniforms.threshold},set:function(e){this.uniforms.threshold=e},enumerable:!1,configurable:!0}),n}(n.Filter),d=function(e){function n(n,r,o){void 0===n&&(n=4),void 0===r&&(r=3),void 0===o&&(o=!1);var i=e.call(this,c,o?"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n":"\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}")||this;return i._kernels=[],i._blur=4,i._quality=3,i.uniforms.uOffset=new Float32Array(2),i._pixelSize=new t.Point,i.pixelSize=1,i._clamp=o,Array.isArray(n)?i.kernels=n:(i._blur=n,i.quality=r),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i=this._pixelSize.x/n._frame.width,l=this._pixelSize.y/n._frame.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,n,t,r);else{for(var a=e.getFilterTexture(),s=n,u=a,f=void 0,c=this._quality-1,m=0;m<c;m++)o=this._kernels[m]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,u,1),f=s,s=u,u=f;o=this._kernels[c]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,s,t,r),e.returnFilterTexture(a)}},n.prototype._updatePadding=function(){this.padding=Math.ceil(this._kernels.reduce((function(e,n){return e+n+.5}),0))},n.prototype._generateKernels=function(){var e=this._blur,n=this._quality,t=[e];if(e>0)for(var r=e,o=e/n,i=1;i<n;i++)r-=o,t.push(r);this._kernels=t,this._updatePadding()},Object.defineProperty(n.prototype,"kernels",{get:function(){return this._kernels},set:function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"clamp",{get:function(){return this._clamp},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._pixelSize},set:function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._quality},set:function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blur},set:function(e){this._blur=e,this._generateKernels()},enumerable:!1,configurable:!0}),n}(n.Filter),h=function(e){function n(t){var o=e.call(this,c,"uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n")||this;o.bloomScale=1,o.brightness=1,o._resolution=r.settings.FILTER_RESOLUTION,"number"==typeof t&&(t={threshold:t});var i=Object.assign(n.defaults,t);o.bloomScale=i.bloomScale,o.brightness=i.brightness;var l=i.kernels,a=i.blur,s=i.quality,u=i.pixelSize,f=i.resolution;return o._extractFilter=new p(i.threshold),o._extractFilter.resolution=f,o._blurFilter=l?new d(l):new d(a,s),o.pixelSize=u,o.resolution=f,o}return u(n,e),n.prototype.apply=function(e,n,t,r,o){var i=e.getFilterTexture();this._extractFilter.apply(e,n,i,1,o);var l=e.getFilterTexture();this._blurFilter.apply(e,i,l,1),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,n,t,r),e.returnFilterTexture(l),e.returnFilterTexture(i)},Object.defineProperty(n.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"threshold",{get:function(){return this._extractFilter.threshold},set:function(e){this._extractFilter.threshold=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),n.defaults={threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},n}(n.Filter),g=function(e){function n(n){void 0===n&&(n=8);var t=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.pixelSize},set:function(e){this.uniforms.pixelSize=e},enumerable:!1,configurable:!0}),n}(n.Filter),v=function(e){function n(n){var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n")||this;return t._thickness=2,t._angle=0,t.uniforms.lightColor=new Float32Array(3),t.uniforms.shadowColor=new Float32Array(3),Object.assign(t,{rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},n),t.padding=1,t}return u(n,e),n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},Object.defineProperty(n.prototype,"rotation",{get:function(){return this._angle/t.DEG_TO_RAD},set:function(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this._updateTransform()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightColor",{get:function(){return o.rgb2hex(this.uniforms.lightColor)},set:function(e){o.hex2rgb(e,this.uniforms.lightColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lightAlpha",{get:function(){return this.uniforms.lightAlpha},set:function(e){this.uniforms.lightAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowColor",{get:function(){return o.rgb2hex(this.uniforms.shadowColor)},set:function(e){o.hex2rgb(e,this.uniforms.shadowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shadowAlpha",{get:function(){return this.uniforms.shadowAlpha},set:function(e){this.uniforms.shadowAlpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),y=function(e){function n(n,o,s,u){void 0===n&&(n=2),void 0===o&&(o=4),void 0===s&&(s=r.settings.FILTER_RESOLUTION),void 0===u&&(u=5);var f,c,m=e.call(this)||this;return"number"==typeof n?(f=n,c=n):n instanceof t.Point?(f=n.x,c=n.y):Array.isArray(n)&&(f=n[0],c=n[1]),m.blurXFilter=new a.BlurFilterPass(!0,f,o,s,u),m.blurYFilter=new a.BlurFilterPass(!1,c,o,s,u),m.blurYFilter.blendMode=i.BLEND_MODES.SCREEN,m.defaultFilter=new l.AlphaFilter,m}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.defaultFilter.apply(e,n,t,r),this.blurXFilter.apply(e,n,o,1),this.blurYFilter.apply(e,o,t,0),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurX",{get:function(){return this.blurXFilter.blur},set:function(e){this.blurXFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blurY",{get:function(){return this.blurYFilter.blur},set:function(e){this.blurYFilter.blur=e},enumerable:!1,configurable:!0}),n}(n.Filter),b=function(e){function n(t){var r=e.call(this,c,"uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n")||this;return r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),n.defaults={center:[.5,.5],radius:100,strength:1},n}(n.Filter),x=function(e){function t(n,t,r){void 0===t&&(t=!1),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}")||this;return o.mix=1,o._size=0,o._sliceSize=0,o._slicePixelSize=0,o._sliceInnerSize=0,o._nearest=!1,o._scaleMode=null,o._colorMap=null,o._scaleMode=null,o.nearest=t,o.mix=r,o.colorMap=n,o}return u(t,e),t.prototype.apply=function(e,n,t,r){this.uniforms._mix=this.mix,e.applyFilter(this,n,t,r)},Object.defineProperty(t.prototype,"colorSize",{get:function(){return this._size},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"colorMap",{get:function(){return this._colorMap},set:function(e){var t;e&&(e instanceof n.Texture||(e=n.Texture.from(e)),(null===(t=e)||void 0===t?void 0:t.baseTexture)&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=i.MIPMAP_MODES.OFF,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nearest",{get:function(){return this._nearest},set:function(e){this._nearest=e,this._scaleMode=e?i.SCALE_MODES.NEAREST:i.SCALE_MODES.LINEAR;var n=this._colorMap;n&&n.baseTexture&&(n.baseTexture._glTextures={},n.baseTexture.scaleMode=this._scaleMode,n.baseTexture.mipmap=i.MIPMAP_MODES.OFF,n._updateID++,n.baseTexture.emit("update",n.baseTexture))},enumerable:!1,configurable:!0}),t.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},t.prototype.destroy=function(n){void 0===n&&(n=!1),this._colorMap&&this._colorMap.destroy(n),e.prototype.destroy.call(this)},t}(n.Filter),_=function(e){function n(n,t){void 0===n&&(n=0),void 0===t&&(t=1);var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n")||this;return r._color=0,r._alpha=1,r.uniforms.color=new Float32Array(3),r.color=n,r.alpha=t,r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.color;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this._alpha},set:function(e){this.uniforms.alpha=e,this._alpha=e},enumerable:!1,configurable:!0}),n}(n.Filter),C=function(e){function n(n,t,r){void 0===n&&(n=16711680),void 0===t&&(t=0),void 0===r&&(r=.4);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n")||this;return o._originalColor=16711680,o._newColor=0,o.uniforms.originalColor=new Float32Array(3),o.uniforms.newColor=new Float32Array(3),o.originalColor=n,o.newColor=t,o.epsilon=r,o}return u(n,e),Object.defineProperty(n.prototype,"originalColor",{get:function(){return this._originalColor},set:function(e){var n=this.uniforms.originalColor;"number"==typeof e?(o.hex2rgb(e,n),this._originalColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._originalColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"newColor",{get:function(){return this._newColor},set:function(e){var n=this.uniforms.newColor;"number"==typeof e?(o.hex2rgb(e,n),this._newColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._newColor=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),S=function(e){function n(n,t,r){void 0===t&&(t=200),void 0===r&&(r=200);var o=e.call(this,c,"precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n")||this;return o.uniforms.texelSize=new Float32Array(2),o.uniforms.matrix=new Float32Array(9),void 0!==n&&(o.matrix=n),o.width=t,o.height=r,o}return u(n,e),Object.defineProperty(n.prototype,"matrix",{get:function(){return this.uniforms.matrix},set:function(e){var n=this;e.forEach((function(e,t){n.uniforms.matrix[t]=e}))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"width",{get:function(){return 1/this.uniforms.texelSize[0]},set:function(e){this.uniforms.texelSize[0]=1/e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return 1/this.uniforms.texelSize[1]},set:function(e){this.uniforms.texelSize[1]=1/e},enumerable:!1,configurable:!0}),n}(n.Filter),F=function(e){function n(){return e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")||this}return u(n,e),n}(n.Filter),z=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n")||this;return r.time=0,r.seed=0,r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"curvature",{get:function(){return this.uniforms.curvature},set:function(e){this.uniforms.curvature=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineWidth",{get:function(){return this.uniforms.lineWidth},set:function(e){this.uniforms.lineWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lineContrast",{get:function(){return this.uniforms.lineContrast},set:function(e){this.uniforms.lineContrast=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"verticalLine",{get:function(){return this.uniforms.verticalLine},set:function(e){this.uniforms.verticalLine=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},n}(n.Filter),O=function(e){function n(n,t){void 0===n&&(n=1),void 0===t&&(t=5);var r=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n")||this;return r.scale=n,r.angle=t,r}return u(n,e),Object.defineProperty(n.prototype,"scale",{get:function(){return this.uniforms.scale},set:function(e){this.uniforms.scale=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n}(n.Filter),P=function(e){function i(o){var l=e.call(this)||this;l.angle=45,l._distance=5,l._resolution=r.settings.FILTER_RESOLUTION;var a=o?f(f({},i.defaults),o):i.defaults,s=a.kernels,u=a.blur,m=a.quality,p=a.pixelSize,h=a.resolution;l._tintFilter=new n.Filter(c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}"),l._tintFilter.uniforms.color=new Float32Array(4),l._tintFilter.uniforms.shift=new t.Point,l._tintFilter.resolution=h,l._blurFilter=s?new d(s):new d(u,m),l.pixelSize=p,l.resolution=h;var g=a.shadowOnly,v=a.rotation,y=a.distance,b=a.alpha,x=a.color;return l.shadowOnly=g,l.rotation=v,l.distance=y,l.alpha=b,l.color=x,l._updatePadding(),l}return u(i,e),i.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this._tintFilter.apply(e,n,o,1),this._blurFilter.apply(e,o,t,r),!0!==this.shadowOnly&&e.applyFilter(this,n,t,0),e.returnFilterTexture(o)},i.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},i.prototype._updateShift=function(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))},Object.defineProperty(i.prototype,"resolution",{get:function(){return this._resolution},set:function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"distance",{get:function(){return this._distance},set:function(e){this._distance=e,this._updatePadding(),this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"rotation",{get:function(){return this.angle/t.DEG_TO_RAD},set:function(e){this.angle=e*t.DEG_TO_RAD,this._updateShift()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"alpha",{get:function(){return this._tintFilter.uniforms.alpha},set:function(e){this._tintFilter.uniforms.alpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"color",{get:function(){return o.rgb2hex(this._tintFilter.uniforms.color)},set:function(e){o.hex2rgb(e,this._tintFilter.uniforms.color)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"kernels",{get:function(){return this._blurFilter.kernels},set:function(e){this._blurFilter.kernels=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"blur",{get:function(){return this._blurFilter.blur},set:function(e){this._blurFilter.blur=e,this._updatePadding()},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"quality",{get:function(){return this._blurFilter.quality},set:function(e){this._blurFilter.quality=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"pixelSize",{get:function(){return this._blurFilter.pixelSize},set:function(e){this._blurFilter.pixelSize=e},enumerable:!1,configurable:!0}),i.defaults={rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:r.settings.FILTER_RESOLUTION},i}(n.Filter),A=function(e){function n(n){void 0===n&&(n=5);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n")||this;return t.strength=n,t}return u(n,e),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.strength},set:function(e){this.uniforms.strength=e},enumerable:!1,configurable:!0}),n}(n.Filter),T=function(e){function r(t){var o=e.call(this,c,"// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n")||this;return o.offset=100,o.fillMode=r.TRANSPARENT,o.average=!1,o.seed=0,o.minSize=8,o.sampleSize=512,o._slices=0,o._offsets=new Float32Array(1),o._sizes=new Float32Array(1),o._direction=-1,o.uniforms.dimensions=new Float32Array(2),o._canvas=document.createElement("canvas"),o._canvas.width=4,o._canvas.height=o.sampleSize,o.texture=n.Texture.from(o._canvas,{scaleMode:i.SCALE_MODES.NEAREST}),Object.assign(o,r.defaults,t),o}return u(r,e),r.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,n,t,r)},r.prototype._randomizeSizes=function(){var e=this._sizes,n=this._slices-1,t=this.sampleSize,r=Math.min(this.minSize/t,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<n;l++){var a=i/(o-l),s=Math.max(a*(1-.6*Math.random()),r);e[l]=s,i-=s}e[n]=i}else{i=1;var u=Math.sqrt(1/this._slices);for(l=0;l<n;l++){s=Math.max(u*i*Math.random(),r);e[l]=s,i-=s}e[n]=i}this.shuffle()},r.prototype.shuffle=function(){for(var e=this._sizes,n=this._slices-1;n>0;n--){var t=Math.random()*n>>0,r=e[n];e[n]=e[t],e[t]=r}},r.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},r.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},r.prototype.redraw=function(){var e,n=this.sampleSize,t=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,n);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*n,a=e>0?e:0,s=e<0?-e:0;r.fillStyle="rgba("+a+", "+s+", 0, 1)",r.fillRect(0,o>>0,n,l+1>>0),o+=l}t.baseTexture.update(),this.uniforms.displacementMap=t},Object.defineProperty(r.prototype,"sizes",{get:function(){return this._sizes},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._sizes[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"offsets",{get:function(){return this._offsets},set:function(e){for(var n=Math.min(this._slices,e.length),t=0;t<n;t++)this._offsets[t]=e[t]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"slices",{get:function(){return this._slices},set:function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"direction",{get:function(){return this._direction},set:function(e){if(this._direction!==e){this._direction=e;var n=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(n),this.uniforms.cosDir=Math.cos(n)}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),r.prototype.destroy=function(){var e;null===(e=this.texture)||void 0===e||e.destroy(!0),this.texture=this._canvas=this.red=this.green=this.blue=this._sizes=this._offsets=null},r.defaults={slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},r.TRANSPARENT=0,r.ORIGINAL=1,r.LOOP=2,r.CLAMP=3,r.MIRROR=4,r}(n.Filter),w=function(e){function n(t){var r=this,o=Object.assign({},n.defaults,t),i=o.outerStrength,l=o.innerStrength,a=o.color,s=o.knockout,u=o.quality,f=Math.round(o.distance);return(r=e.call(this,c,"varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n".replace(/__ANGLE_STEP_SIZE__/gi,""+(1/u/f).toFixed(7)).replace(/__DIST__/gi,f.toFixed(0)+".0"))||this).uniforms.glowColor=new Float32Array([0,0,0,1]),Object.assign(r,{color:a,outerStrength:i,innerStrength:l,padding:f,knockout:s}),r}return u(n,e),Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.glowColor)},set:function(e){o.hex2rgb(e,this.uniforms.glowColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"outerStrength",{get:function(){return this.uniforms.outerStrength},set:function(e){this.uniforms.outerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerStrength",{get:function(){return this.uniforms.innerStrength},set:function(e){this.uniforms.innerStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"knockout",{get:function(){return this.uniforms.knockout},set:function(e){this.uniforms.knockout=e},enumerable:!1,configurable:!0}),n.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1},n}(n.Filter),D=function(e){function n(r){var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n".replace("${perlin}","vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n"))||this;o.parallel=!0,o.time=0,o._angle=0,o.uniforms.dimensions=new Float32Array(2);var i=Object.assign(n.defaults,r);return o._angleLight=new t.Point,o.angle=i.angle,o.gain=i.gain,o.lacunarity=i.lacunarity,o.alpha=i.alpha,o.parallel=i.parallel,o.center=i.center,o.time=i.time,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=n.filterFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,this.uniforms.alpha=this.alpha,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e;var n=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(n),this._angleLight.y=Math.sin(n)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gain",{get:function(){return this.uniforms.gain},set:function(e){this.uniforms.gain=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"lacunarity",{get:function(){return this.uniforms.lacunarity},set:function(e){this.uniforms.lacunarity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha=e},enumerable:!1,configurable:!0}),n.defaults={angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],alpha:1},n}(n.Filter),j=function(e){function n(n,r,o){void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i.kernelSize=5,i.uniforms.uVelocity=new Float32Array(2),i._velocity=new t.ObservablePoint(i.velocityChanged,i),i.setVelocity(n),i.kernelSize=r,i.offset=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"velocity",{get:function(){return this._velocity},set:function(e){this.setVelocity(e)},enumerable:!1,configurable:!0}),n.prototype.setVelocity=function(e){if(Array.isArray(e)){var n=e[0],t=e[1];this._velocity.set(n,t)}else this._velocity.copyFrom(e)},n.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y,this.padding=1+(Math.max(Math.abs(this._velocity.x),Math.abs(this._velocity.y))>>0)},Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.uOffset},set:function(e){this.uniforms.uOffset=e},enumerable:!1,configurable:!0}),n}(n.Filter),M=function(e){function n(n,t,r){void 0===t&&(t=.05),void 0===r&&(r=n.length);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n".replace(/%maxColors%/g,r.toFixed(0)))||this;return o._replacements=[],o._maxColors=0,o.epsilon=t,o._maxColors=r,o.uniforms.originalColors=new Float32Array(3*r),o.uniforms.targetColors=new Float32Array(3*r),o.replacements=n,o}return u(n,e),Object.defineProperty(n.prototype,"replacements",{get:function(){return this._replacements},set:function(e){var n=this.uniforms.originalColors,t=this.uniforms.targetColors,r=e.length;if(r>this._maxColors)throw new Error("Length of replacements ("+r+") exceeds the maximum colors length ("+this._maxColors+")");n[3*r]=-1;for(var i=0;i<r;i++){var l=e[i],a=l[0];"number"==typeof a?a=o.hex2rgb(a):l[0]=o.rgb2hex(a),n[3*i]=a[0],n[3*i+1]=a[1],n[3*i+2]=a[2];var s=l[1];"number"==typeof s?s=o.hex2rgb(s):l[1]=o.rgb2hex(s),t[3*i]=s[0],t[3*i+1]=s[1],t[3*i+2]=s[2]}this._replacements=e},enumerable:!1,configurable:!0}),n.prototype.refresh=function(){this.replacements=this._replacements},Object.defineProperty(n.prototype,"maxColors",{get:function(){return this._maxColors},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"epsilon",{get:function(){return this.uniforms.epsilon},set:function(e){this.uniforms.epsilon=e},enumerable:!1,configurable:!0}),n}(n.Filter),R=function(e){function n(t,r){void 0===r&&(r=0);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n")||this;return o.seed=0,o.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(o.seed=t,t=void 0):o.seed=r,Object.assign(o,n.defaults,t),o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.seed=this.seed,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"sepia",{get:function(){return this.uniforms.sepia},set:function(e){this.uniforms.sepia=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noise",{get:function(){return this.uniforms.noise},set:function(e){this.uniforms.noise=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"noiseSize",{get:function(){return this.uniforms.noiseSize},set:function(e){this.uniforms.noiseSize=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratch",{get:function(){return this.uniforms.scratch},set:function(e){this.uniforms.scratch=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchDensity",{get:function(){return this.uniforms.scratchDensity},set:function(e){this.uniforms.scratchDensity=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"scratchWidth",{get:function(){return this.uniforms.scratchWidth},set:function(e){this.uniforms.scratchWidth=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignetting",{get:function(){return this.uniforms.vignetting},set:function(e){this.uniforms.vignetting=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingAlpha",{get:function(){return this.uniforms.vignettingAlpha},set:function(e){this.uniforms.vignettingAlpha=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"vignettingBlur",{get:function(){return this.uniforms.vignettingBlur},set:function(e){this.uniforms.vignettingBlur=e},enumerable:!1,configurable:!0}),n.defaults={sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},n}(n.Filter),E=function(e){function n(t,r,o){void 0===t&&(t=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n".replace(/\$\{angleStep\}/,n.getAngleStep(o)))||this;return i._thickness=1,i.uniforms.thickness=new Float32Array([0,0]),i.uniforms.outlineColor=new Float32Array([0,0,0,1]),Object.assign(i,{thickness:t,color:r,quality:o}),i}return u(n,e),n.getAngleStep=function(e){var t=Math.max(e*n.MAX_SAMPLES,n.MIN_SAMPLES);return(2*Math.PI/t).toFixed(7)},n.prototype.apply=function(e,n,t,r){this.uniforms.thickness[0]=this._thickness/n._frame.width,this.uniforms.thickness[1]=this._thickness/n._frame.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"color",{get:function(){return o.rgb2hex(this.uniforms.outlineColor)},set:function(e){o.hex2rgb(e,this.uniforms.outlineColor)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"thickness",{get:function(){return this._thickness},set:function(e){this._thickness=e,this.padding=e},enumerable:!1,configurable:!0}),n.MIN_SAMPLES=1,n.MAX_SAMPLES=100,n}(n.Filter),I=function(e){function n(n){void 0===n&&(n=10);var t=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n")||this;return t.size=n,t}return u(n,e),Object.defineProperty(n.prototype,"size",{get:function(){return this.uniforms.size},set:function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},enumerable:!1,configurable:!0}),n}(n.Filter),k=function(e){function n(n,t,r,o){void 0===n&&(n=0),void 0===t&&(t=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n")||this;return i._angle=0,i.angle=n,i.center=t,i.kernelSize=r,i.radius=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"angle",{get:function(){return this._angle},set:function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n}(n.Filter),L=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n")||this;return r.time=0,r.uniforms.amplitude=new Float32Array(2),r.uniforms.waveLength=new Float32Array(2),r.uniforms.alpha=new Float32Array(2),r.uniforms.dimensions=new Float32Array(2),Object.assign(r,n.defaults,t),r}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"mirror",{get:function(){return this.uniforms.mirror},set:function(e){this.uniforms.mirror=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"boundary",{get:function(){return this.uniforms.boundary},set:function(e){this.uniforms.boundary=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"waveLength",{get:function(){return this.uniforms.waveLength},set:function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.alpha},set:function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},enumerable:!1,configurable:!0}),n.defaults={mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},n}(n.Filter),N=function(e){function n(n,t,r){void 0===n&&(n=[-10,0]),void 0===t&&(t=[0,10]),void 0===r&&(r=[0,0]);var o=e.call(this,c,"precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n")||this;return o.red=n,o.green=t,o.blue=r,o}return u(n,e),Object.defineProperty(n.prototype,"red",{get:function(){return this.uniforms.red},set:function(e){this.uniforms.red=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"green",{get:function(){return this.uniforms.green},set:function(e){this.uniforms.green=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"blue",{get:function(){return this.uniforms.blue},set:function(e){this.uniforms.blue=e},enumerable:!1,configurable:!0}),n}(n.Filter),X=function(e){function n(t,r,o){void 0===t&&(t=[0,0]),void 0===o&&(o=0);var i=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n")||this;return i.center=t,Object.assign(i,n.defaults,r),i.time=o,i}return u(n,e),n.prototype.apply=function(e,n,t,r){this.uniforms.time=this.time,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.center},set:function(e){this.uniforms.center=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"amplitude",{get:function(){return this.uniforms.amplitude},set:function(e){this.uniforms.amplitude=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"wavelength",{get:function(){return this.uniforms.wavelength},set:function(e){this.uniforms.wavelength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"brightness",{get:function(){return this.uniforms.brightness},set:function(e){this.uniforms.brightness=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"speed",{get:function(){return this.uniforms.speed},set:function(e){this.uniforms.speed=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),n.defaults={amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n}(n.Filter),B=function(e){function n(n,t,r){void 0===t&&(t=0),void 0===r&&(r=1);var o=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n")||this;return o._color=0,o.uniforms.dimensions=new Float32Array(2),o.uniforms.ambientColor=new Float32Array([0,0,0,r]),o.texture=n,o.color=t,o}return u(n,e),n.prototype.apply=function(e,n,t,r){var o,i;this.uniforms.dimensions[0]=null===(o=n.filterFrame)||void 0===o?void 0:o.width,this.uniforms.dimensions[1]=null===(i=n.filterFrame)||void 0===i?void 0:i.height,e.applyFilter(this,n,t,r)},Object.defineProperty(n.prototype,"texture",{get:function(){return this.uniforms.uLightmap},set:function(e){this.uniforms.uLightmap=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"color",{get:function(){return this._color},set:function(e){var n=this.uniforms.ambientColor;"number"==typeof e?(o.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],this._color=o.rgb2hex(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"alpha",{get:function(){return this.uniforms.ambientColor[3]},set:function(e){this.uniforms.ambientColor[3]=e},enumerable:!1,configurable:!0}),n}(n.Filter),G=function(e){function n(n,r,o,i){void 0===n&&(n=100),void 0===r&&(r=600);var l=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n")||this;return l.uniforms.blur=n,l.uniforms.gradientBlur=r,l.uniforms.start=o||new t.Point(0,window.innerHeight/2),l.uniforms.end=i||new t.Point(600,window.innerHeight/2),l.uniforms.delta=new t.Point(30,30),l.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),l.updateDelta(),l}return u(n,e),n.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},Object.defineProperty(n.prototype,"blur",{get:function(){return this.uniforms.blur},set:function(e){this.uniforms.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.uniforms.gradientBlur},set:function(e){this.uniforms.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.uniforms.start},set:function(e){this.uniforms.start=e,this.updateDelta()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.uniforms.end},set:function(e){this.uniforms.end=e,this.updateDelta()},enumerable:!1,configurable:!0}),n}(n.Filter),K=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=e/t,this.uniforms.delta.y=n/t},n}(G),q=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return u(n,e),n.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,n=this.uniforms.end.y-this.uniforms.start.y,t=Math.sqrt(e*e+n*n);this.uniforms.delta.x=-n/t,this.uniforms.delta.y=e/t},n}(G),W=function(e){function n(n,t,r,o){void 0===n&&(n=100),void 0===t&&(t=600);var i=e.call(this)||this;return i.tiltShiftXFilter=new K(n,t,r,o),i.tiltShiftYFilter=new q(n,t,r,o),i}return u(n,e),n.prototype.apply=function(e,n,t,r){var o=e.getFilterTexture();this.tiltShiftXFilter.apply(e,n,o,1),this.tiltShiftYFilter.apply(e,o,t,r),e.returnFilterTexture(o)},Object.defineProperty(n.prototype,"blur",{get:function(){return this.tiltShiftXFilter.blur},set:function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"gradientBlur",{get:function(){return this.tiltShiftXFilter.gradientBlur},set:function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"start",{get:function(){return this.tiltShiftXFilter.start},set:function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"end",{get:function(){return this.tiltShiftXFilter.end},set:function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},enumerable:!1,configurable:!0}),n}(n.Filter),Y=function(e){function n(t){var r=e.call(this,c,"varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n")||this;return Object.assign(r,n.defaults,t),r}return u(n,e),Object.defineProperty(n.prototype,"offset",{get:function(){return this.uniforms.offset},set:function(e){this.uniforms.offset=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.radius},set:function(e){this.uniforms.radius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"angle",{get:function(){return this.uniforms.angle},set:function(e){this.uniforms.angle=e},enumerable:!1,configurable:!0}),n.defaults={radius:200,angle:4,padding:20,offset:new t.Point},n}(n.Filter),Z=function(e){function n(t){var r,o=Object.assign(n.defaults,t),i=o.maxKernelSize,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t}(o,["maxKernelSize"]);return r=e.call(this,c,"varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n".replace("${maxKernelSize}",i.toFixed(1)))||this,Object.assign(r,l),r}return u(n,e),Object.defineProperty(n.prototype,"center",{get:function(){return this.uniforms.uCenter},set:function(e){this.uniforms.uCenter=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"strength",{get:function(){return this.uniforms.uStrength},set:function(e){this.uniforms.uStrength=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"innerRadius",{get:function(){return this.uniforms.uInnerRadius},set:function(e){this.uniforms.uInnerRadius=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"radius",{get:function(){return this.uniforms.uRadius},set:function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},enumerable:!1,configurable:!0}),n.defaults={strength:.1,center:[0,0],innerRadius:0,radius:-1,maxKernelSize:32},n}(n.Filter);return e.AdjustmentFilter=m,e.AdvancedBloomFilter=h,e.AsciiFilter=g,e.BevelFilter=v,e.BloomFilter=y,e.BulgePinchFilter=b,e.CRTFilter=z,e.ColorMapFilter=x,e.ColorOverlayFilter=_,e.ColorReplaceFilter=C,e.ConvolutionFilter=S,e.CrossHatchFilter=F,e.DotFilter=O,e.DropShadowFilter=P,e.EmbossFilter=A,e.GlitchFilter=T,e.GlowFilter=w,e.GodrayFilter=D,e.KawaseBlurFilter=d,e.MotionBlurFilter=j,e.MultiColorReplaceFilter=M,e.OldFilmFilter=R,e.OutlineFilter=E,e.PixelateFilter=I,e.RGBSplitFilter=N,e.RadialBlurFilter=k,e.ReflectionFilter=L,e.ShockwaveFilter=X,e.SimpleLightmapFilter=B,e.TiltShiftAxisFilter=G,e.TiltShiftFilter=W,e.TiltShiftXFilter=K,e.TiltShiftYFilter=q,e.TwistFilter=Y,e.ZoomBlurFilter=Z,Object.defineProperty(e,"__esModule",{value:!0}),e}({},PIXI,PIXI,PIXI,PIXI.utils,PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=pixi-filters.js.map


// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 20.02.24
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.3.3';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__select, _;
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    //@[ALIAS]
    ALIAS__select = _.select;
    _.select = function(index) {
      var e;
      ALIAS__select.call(this, ...arguments);
      try {
        return this._pOnSelectionChanged(index);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._pOnSelectionChanged = function(newIndex) {
      var e;
      try {
        if (this._pkdLastSelectedIndex == null) {
          this._pkdLastSelectedIndex = newIndex;
          return this.pOnSelectionChanged();
        } else {
          if (this._pkdLastSelectedIndex !== newIndex) {
            this._pkdLastSelectedIndex = newIndex;
            return this.pOnSelectionChanged();
          }
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.safeSelect = function(index = 0) {
      var e;
      try {
        if (this.maxItems() > index) {
          return this.select(index);
        } else {
          return this.select(-1);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    
    // * Called only when new (different) index is selected
    _.pOnSelectionChanged = function() {};
  })();
});

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.MapAnchorPoint = class MapAnchorPoint {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this._realX = this.x;
      this._realY = this.y;
    }

    shiftY() {
      return 0;
    }

    jumpHeight() {
      return 0;
    }

    scrolledX() {
      return Game_CharacterBase.prototype.scrolledX.call(this);
    }

    scrolledY() {
      return Game_CharacterBase.prototype.scrolledY.call(this);
    }

    screenX() {
      return Game_CharacterBase.prototype.screenX.call(this);
    }

    screenY() {
      return Game_CharacterBase.prototype.screenY.call(this);
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        KDCore.__ppNameToParseNext = key;
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    writeDetailedError() {
      var e;
      try {
        if (!String.any(KDCore.__ppNameToParseNext)) {
          return;
        }
        return console.warn("Please, check Plugin Parameter " + KDCore.__ppNameToParseNext + " in plugin " + this.pluginName);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
            this.writeDetailedError();
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        this.writeDetailedError();
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.writeDetailedError();
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
        this.pHandledIndex = 0;
        return;
      }

      pIsSupportKeyboardHandle() {
        return false;
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        if (this.updateMovingAnimation != null) {
          this.updateMovingAnimation();
        }
        if (this.pIsHandlerActive()) {
          this._pHandleKeyboardInputs();
        }
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add() {
        return this.addChild(...arguments);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      activateHandlerManagment() {
        var e;
        try {
          this.handleUpAction = this.selectPreviousHandlerItem;
          this.handleDownAction = this.selectNextHandlerItem;
          return this._handleManagerActive = true;
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      deactivateHandlerManagment() {
        var ref;
        this._handleManagerActive = false;
        this.handleUpAction = function() {}; // * EMPTY
        this.handleDownAction = function() {}; // * EMPTY
        if ((ref = $gameTemp.__pkdActiveKeyboardHandler) != null) {
          ref.pDeactivateHandler();
        }
        $gameTemp.__pkdActiveKeyboardHandler = null;
      }

      addChild(item) {
        var c, handlers;
        c = super.addChild(...arguments);
        if (item instanceof KDCore.Sprite && (item.pIsSupportKeyboardHandle != null) && item.pIsSupportKeyboardHandle()) {
          handlers = this._pGetAllHandlers();
          item.pHandledIndex = handlers.length - 1;
        }
        return c;
      }

      pIsAnyHandlerSelected() {
        return $gameTemp.__pkdActiveKeyboardHandler != null;
      }

      selectPreviousHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() - 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _selectedHandlerIndex() {
        return $gameTemp.__pkdActiveKeyboardHandler.pHandledIndex;
      }

      _trySelectHandler(index) {
        var e, handlerItemToSelect;
        try {
          handlerItemToSelect = this._pGetAllHandlers().find(function(i) {
            return i.pHandledIndex === index;
          });
          if (handlerItemToSelect != null) {
            handlerItemToSelect.pActivateHandler();
          }
          return this._pOnHandled();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pGetAllHandlers() {
        return this.children.filter(function(i) {
          return i instanceof KDCore.Sprite && (i.pIsSupportKeyboardHandle != null) && i.pIsSupportKeyboardHandle();
        });
      }

      selectNextHandlerItem() {
        var e;
        try {
          if (!this.pIsAnyHandlerSelected()) {
            return this._trySelectHandler(0);
          } else {
            return this._trySelectHandler(this._selectedHandlerIndex() + 1);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      activeItemFilterOptions() {
        return {
          distance: 15,
          outerStrength: 4
        };
      }

      pIsHandlerActive() {
        return this._handleManagerActive === true || this._handlerActive === true;
      }

      destroy() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        return super.destroy();
      }

      _pOnHandled() {
        return Input.clear();
      }

      _pHandleKeyL() {
        var e;
        try {
          if (this.handleLeftAction != null) {
            this.handleLeftAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyR() {
        var e;
        try {
          if (this.handleRightAction != null) {
            this.handleRightAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyU() {
        var e;
        try {
          if (this.handleUpAction != null) {
            this.handleUpAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyD() {
        var e;
        try {
          if (this.handleDownAction != null) {
            this.handleDownAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      _pHandleKeyOK() {
        var e;
        try {
          if (this.handleOKAction != null) {
            this.handleOKAction();
            return this._pOnHandled();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pActivateHandler() {
        if (!this.pIsSupportKeyboardHandle()) {
          return;
        }
        if (($gameTemp.__pkdActiveKeyboardHandler != null) && $gameTemp.__pkdActiveKeyboardHandler !== this) {
          $gameTemp.__pkdActiveKeyboardHandler.pDeactivateHandler();
        }
        this._handlerActive = true;
        this._activateHandlerVisually();
        $gameTemp.__pkdActiveKeyboardHandler = this;
      }

      _activateHandlerVisually() {
        var e;
        try {
          //@filters = [new PIXI.filters.OutlineFilter(0.8, 0x99ff99, 0.5)]
          //@filters = [new PIXI.filters.GlowFilter(2, 0.8, 0, 0x09f9, 0.5)]
          return this.filters = [new PIXI.filters.GlowFilter(this.activeItemFilterOptions())];
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      pDeactivateHandler() {
        if ($gameTemp.__pkdActiveKeyboardHandler === this) {
          $gameTemp.__pkdActiveKeyboardHandler = null;
        }
        this._handlerActive = false;
        this.filters = [];
      }

      _pHandleKeyboardInputs() {
        var e;
        try {
          if (Input.isTriggered('left')) {
            return this._pHandleKeyL();
          } else if (Input.isTriggered('right')) {
            return this._pHandleKeyR();
          } else if (Input.isTriggered('up')) {
            return this._pHandleKeyU();
          } else if (Input.isTriggered('down')) {
            return this._pHandleKeyD();
          } else if (Input.isTriggered('ok')) {
            return this._pHandleKeyOK();
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ItemsList;
  // * Класс который позволяет сделать список (на основе Window_Selectable), но из Sprite элементов, а не Draw на Bitmap

    //rev 08.02.24

    //TODO: Dynamic items height, controls handlers support
  Sprite_ItemsList = class Sprite_ItemsList extends Window_Selectable {
    constructor(r) {
      if (KDCore.isMV()) {
        super(r.x, r.y, r.width, r.height);
      } else {
        super(r);
      }
      this._prevSelectedIndex = -1;
      this._createItemsContainer();
      this._createWindowContentMask();
      this._setupBackgroundType();
      return;
    }

    activate(index) {
      var e;
      try {
        this.refresh();
        if (index != null) {
          this.safeSelect(index);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return super.activate();
    }

    maxItems() {
      return this.getAllItems().length;
    }

    getAllItems() {
      return this.itemsSet || [];
    }

    setItems(itemsSet, singleItemHeight = null) {
      this.itemsSet = itemsSet;
      this.singleItemHeight = singleItemHeight;
      this._clearPreviousItems();
      if (this.singleItemHeight == null) {
        this._adjustAutoItemsHeight(this.itemsSet[0]);
      }
      this.refresh();
      this._drawNewItems();
    }

    itemAt(index) {
      return this.getAllItems()[index];
    }

    isNeedScaleItemsW() {
      return false;
    }

    isNeedScaleItemsH() {
      return false;
    }

    lineHeight() {
      return this.singleItemHeight || 36;
    }

    isDrawWindowDefaultItemsBack() {
      return false;
    }

    //$[OVER]
    _updateCursor() {
      return this._cursorSprite.visible = false;
    }

    update() {
      super.update();
      this._itemsContainer.y = -this._scrollY;
      return this._updateItemsSelectionState();
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ItemsList.prototype;
    _._createItemsContainer = function() {
      if (!this.isDrawWindowDefaultItemsBack()) {
        this._contentsBackSprite.visible = false;
      }
      this._windowItemsContentLayer = new Sprite();
      this._windowItemsContentLayer.move(this._padding, this._padding);
      this.addChild(this._windowItemsContentLayer);
      this._itemsContainer = new KDCore.Sprite();
      this._windowItemsContentLayer.addChild(this._itemsContainer);
      this.addChild(this._downArrowSprite);
      return this.addChild(this._upArrowSprite);
    };
    _._setupBackgroundType = function() {
      return this.setBackgroundType(2);
    };
    _._createWindowContentMask = function() {
      var e, m, maskBitmap;
      try {
        maskBitmap = new Bitmap(this.width - this._padding * 2, this.height - this._padding * 2);
        maskBitmap.fillAll("#FFF");
        m = new Sprite(maskBitmap);
        this._windowItemsContentLayer.mask = m;
        return this._windowItemsContentLayer.addChild(m);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustAutoItemsHeight = function(item) {
      var e;
      try {
        if (item == null) {
          this.singleItemHeight = 36;
          return;
        }
        if (item.realHeight != null) {
          this.singleItemHeight = item.realHeight();
        } else {
          if (item.height > 0) {
            this.singleItemHeight = item.height;
          }
        }
        if (this.singleItemHeight === 0 || !this.singleItemHeight) {
          return this.singleItemHeight = 36;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._clearPreviousItems = function() {
      var c, e, i, j, len, len1, ref, results, toRemove;
      try {
        toRemove = [];
        ref = this._itemsContainer.children;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          toRemove.push(c);
        }
        results = [];
        for (j = 0, len1 = toRemove.length; j < len1; j++) {
          c = toRemove[j];
          results.push(c.removeFromParent());
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._drawNewItems = function() {
      var e, i, index, item, len, ref, results;
      try {
        ref = this.getAllItems();
        results = [];
        for (index = i = 0, len = ref.length; i < len; index = ++i) {
          item = ref[index];
          results.push(this._addNewItemToList(item, index));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._addNewItemToList = function(item, index) {
      var e, rect;
      try {
        if (item == null) {
          return;
        }
        rect = this.itemRect(index);
        item.x = rect.x;
        item.y = rect.y;
        this._adjustItemWidthAndHeight(item);
        return this._itemsContainer.addChild(item);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._adjustItemWidthAndHeight = function(item) {
      var e, scaleFactor;
      try {
        if (item == null) {
          return;
        }
        if (this.isNeedScaleItemsW()) {
          scaleFactor = this._defaultItemWidth() / this._getItemWidth(item);
          item.scale.x = scaleFactor;
        }
        if (this.isNeedScaleItemsH()) {
          scaleFactor = this.lineHeight() / this._getItemHeight(item);
          return item.scale.y = scaleFactor;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getItemWidth = function(item) {
      var e, v;
      v = this._defaultItemWidth();
      try {
        if (item == null) {
          return v;
        }
        if (item.realWidth != null) {
          v = item.realWidth();
        } else {
          if (item.width > 0) {
            v = item.width;
          }
        }
        if (v === 0 || !v) {
          v = this._defaultItemWidth();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._defaultItemWidth = function() {
      return this.width - this._padding * 2;
    };
    _._getItemHeight = function(item) {
      var e, v;
      v = 36;
      try {
        if (item == null) {
          return v;
        }
        if (item.realHeight != null) {
          v = item.realHeight();
        } else {
          if (item.height > 0) {
            v = item.height;
          }
        }
        if (v === 0 || !v) {
          v = 36;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return v;
    };
    _._updateItemsSelectionState = function() {
      var e;
      try {
        if (!this.active || this.index() < 0 || !this.cursorVisible) {
          this._disableSelectionForAll();
          return;
        }
        return this._selectItemAtIndex(this.index());
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._disableSelectionForAll = function() {
      var e, i, item, len, ref, results;
      try {
        this._prevSelectedIndex = -1;
        ref = this.getAllItems();
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          results.push(this._deselectItem(item));
        }
        return results;
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if ((this._prevSelectedIndex != null) && this._prevSelectedIndex >= 0) {
          this._deselectItem(this.itemAt(this._prevSelectedIndex));
        }
        if (item.activateInList != null) {
          return item.activateInList();
        } else {
          return this._selectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        return item.filters = [
          new PIXI.filters.GlowFilter({
            distance: 15,
            outerStrength: 4
          })
        ];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItem = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        if (item.deactivateInList != null) {
          return item.deactivateInList();
        } else {
          return this._deselectItemVisually(item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._deselectItemVisually = function(item) {
      var e;
      try {
        if (item == null) {
          return;
        }
        return item.filters = [];
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._selectItemAtIndex = function(index) {
      var e, item;
      try {
        if (this._prevSelectedIndex !== index) {
          item = this.itemAt(index);
          if (item == null) {
            return;
          }
          this._selectItem(item);
          return this._prevSelectedIndex = index;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ItemsList = Sprite_ItemsList;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 07.02.2024
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      //@params = @defaultParams() unless @params?
      this.params = Object.assign({}, this.defaultParams(), this.params);
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF",
          shadow: {
            color: "#000",
            opacity: 0,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.initReactComponents = function(withBabel = true) {
      var e;
      try {
        if (withBabel) {
          this._loadBabel();
        }
        return this._loadReact();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadBabel = function() {
      var e;
      try {
        return this._loadScript('https://unpkg.com/babel-standalone@6/babel.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadReact = function() {
      var e;
      try {
        this._loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
        return this._loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._loadScript = function(src, isReact = false) {
      var e, script;
      try {
        script = document.createElement("script");
        if (isReact === true) {
          script.type = "text/babel";
        } else {
          script.type = "text/javascript";
          script.crossorigin = true;
        }
        script.src = src;
        script.async = false;
        script.defer = true;
        script.onerror = function(e) {
          KDCore.warning('HUI: Failed to load script');
          return KDCore.warning(e);
        };
        document.body.appendChild(script);
        if (isReact === true) {
          return window.dispatchEvent(new Event('DOMContentLoaded'));
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.loadReactComponent = function(componentName, folder = 'data/uiComponents') {
      var e, src;
      try {
        src = folder + "/" + componentName + ".js";
        return this._loadScript(src, true);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addReactComponent = function(componentName, props, uniqueId = null) {
      var e, element, reactElement, root;
      try {
        if (window[componentName] == null) {
          KDCore.warning("Cant find " + componentName + ", make sure to load it first");
          return null;
        }
        if (uniqueId == null) {
          uniqueId = componentName;
        }
        // * Создаём отдельный DIV для каждого элемента (чтобы можно было удалять)
        element = this._getElementForReactComponent(uniqueId);
        root = ReactDOM.createRoot(element);
        reactElement = React.createElement(window[componentName], props);
        root.render(reactElement);
        return KDCore.HUI.getElement(uniqueId);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    // * Simple React Component (without JSX!)
    _.loadReactComponentFromFile = function(filename, props, uniqueId, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".js";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element;
          eval(xhr.responseText);
          element = KDCore.HUI.addReactComponent(filename, props, uniqueId);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _._getElementForReactComponent = function(componentId) {
      var e, element;
      try {
        this.removeElementById(componentId);
        element = this.addElement(componentId, '', null);
        return element;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return null;
    };
    _.loadElementFromFile = function(filename, handler, folder = "data/uiComponents") {
      var e, url, xhr;
      try {
        xhr = new XMLHttpRequest();
        url = folder + "/" + filename + ".html";
        xhr.open("GET", url);
        xhr.overrideMimeType("plain/text");
        xhr.onload = function() {
          var e, element, htmlElementText;
          // * Хотел отдельные данные передавать и заменять в HTML текст
          // * Но если у нас есть React компоненты, то это не надо
          //htmlElementText = @convertDataKeys(xhr.responseText, dataKeys)
          htmlElementText = xhr.responseText;
          element = KDCore.HUI.addElement(filename, htmlElementText, null);
          try {
            if (handler != null) {
              return handler(element, filename);
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        return xhr.send();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    _.appendElement = function(element) {
      var e;
      try {
        return this._parent.appendChild(element);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 20.02.2024

// * FOR MV

(function () {

    if (KDCore.isMZ()) return;

    if (!DataManager.onXhrLoad)
        DataManager.onXhrLoad = function (xhr, name, src, url) {
            if (xhr.status < 400) {
                window[name] = JSON.parse(xhr.responseText);
                DataManager.onLoad(window[name]);
            } else {

            }
        };


    Window.prototype._setRectPartsGeometry = function (sprite, srect, drect, m) {
        const sx = srect.x;
        const sy = srect.y;
        const sw = srect.width;
        const sh = srect.height;
        const dx = drect.x;
        const dy = drect.y;
        const dw = drect.width;
        const dh = drect.height;
        const smw = sw - m * 2;
        const smh = sh - m * 2;
        const dmw = dw - m * 2;
        const dmh = dh - m * 2;
        const children = sprite.children;
        sprite.setFrame(0, 0, dw, dh);
        sprite.move(dx, dy);
        // corner
        children[0].setFrame(sx, sy, m, m);
        children[1].setFrame(sx + sw - m, sy, m, m);
        children[2].setFrame(sx, sy + sw - m, m, m);
        children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
        children[0].move(0, 0);
        children[1].move(dw - m, 0);
        children[2].move(0, dh - m);
        children[3].move(dw - m, dh - m);
        // edge
        children[4].move(m, 0);
        children[5].move(m, dh - m);
        children[6].move(0, m);
        children[7].move(dw - m, m);
        children[4].setFrame(sx + m, sy, smw, m);
        children[5].setFrame(sx + m, sy + sw - m, smw, m);
        children[6].setFrame(sx, sy + m, m, smh);
        children[7].setFrame(sx + sw - m, sy + m, m, smh);
        children[4].scale.x = dmw / smw;
        children[5].scale.x = dmw / smw;
        children[6].scale.y = dmh / smh;
        children[7].scale.y = dmh / smh;
        // center
        if (children[8]) {
            children[8].setFrame(sx + m, sy + m, smw, smh);
            children[8].move(m, m);
            children[8].scale.x = dmw / smw;
            children[8].scale.y = dmh / smh;
        }
        for (const child of children) {
            child.visible = dw > 0 && dh > 0;
        }
    };
})();

(function(){
    
    if (KDCore.isMZ()) return;

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'OpenMapInventory') {
            try {
                OpenMapInventory();
            } catch (e) {
                console.warn(e);
            }
        } else if (command === "VisualChest") {
            if (PKD_MI.isPro()) {
                try {
                    this._aaPrepareVisualChest();
                    if (args[0]) {
                        PKD_MI.setChestName(args[0]);
                    }
                    if (args[1]) {
                        MISetIconForChest(args[1]);
                    }
                } catch (e) {
                    PKD_MI.warning('VisualChest plugin command', e);
                }
            }
        } else if (command === "VisualChestStored") {
            if (PKD_MI.isPro()) {
                try {
                    $gameTemp._visualChestRestrictionTypes = [];
                    if (args[0]) {
                        PKD_MI.setChestName(args[0]);
                    }
                    if (args[1]) {
                        PKD_MI.setChestItemTypeLimit(args[1]);
                    }
                    if (args[2]) {
                        MISetIconForChest(args[2]);
                    }
                    this._aaPrepareVisualChestStored();
                } catch (e) {
                    PKD_MI.warning('VisualChestStored plugin command', e);
                }
            }
        } else if (command === "MapUserChest") {
            if (PKD_MI.isPro()) {
                try {
                    this.setWaitMode('chest');
                    PKD_MI.openUserChest();
                } catch (e) {
                    PKD_MI.warning('UserChest plugin command', e);
                }
            } //?UPDX
        } else if (command === "InventoryButton") {
            if (!PKD_MI.isPro()) return;
            switch (args[0]) {
                case "Move":
                    var x = 0;
                    var y = 0;
                    try {
                        x = parseInt(args[1]);
                        y = parseInt(args[2]);
                        $gameSystem.getPKIButtonSettings().position = [x, y];
                    } catch (e) {
                        PKD_MI.warning('InventoryButton Move plugin command', e);
                    }
                    break;
                case "Reset":
                    $gameSystem.pkmiButtonSettings = null;
                    break;
                case "Show":
                    $gameSystem.getPKIButtonSettings().visibility = true;
                    break;
                case "Hide":
                    $gameSystem.getPKIButtonSettings().visibility = false;
                    break;
                case "Disable":
                    $gameSystem.getPKIButtonSettings().disable = true;
                    break;
                case "Enable":
                    $gameSystem.getPKIButtonSettings().disable = false;
                    break;
                default:
                    break;
            }
            PKD_MI.refreshInventoryButton();
        } else if (command === "VisualChestIcon") {
            if (!PKD_MI.isPro()) return;
            MISetIconForChest(args[0]);
        } else if (command === "SetStoredChestLimit") {
            if (!PKD_MI.isPro()) return;
            MISetStoredChestLimit(parseInt(args[0]));
        }
    };

})();

(function(){


    if (KDCore.isMZ()) {

        PluginManager.registerCommand("PKD_MapInventory", 'MI_VisualChest', args => {
            try {
                if (PKD_MI.isPro()) {
                    PKD_MI.setChestName(args.name);
                    $gameMap._interpreter._aaPrepareVisualChest();
                    if(String.any(args.image)) {
                        MISetIconForChest(args.image);
                    }
                    // * NO limit for Visual Chest (no stored)
                    $gameTemp.__aaVisualChestLimitCount = null;
                } else {
                    window.alert("Map Inventory: Visual Chests works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MapInventory", 'MI_VisualChestStored', args => {
            try {
                if (PKD_MI.isPro()) {
                    PKD_MI.setChestName(args.name);
                    if(Boolean(args.forTrade) == true) {
                        $gameTemp.__pkdMiTradeChestId = args.name;
                    } else {
                        $gameTemp.__pkdMiTradeChestId = null;
                    }
                    $gameTemp._visualChestRestrictionTypes = [];
                    $gameMap._interpreter._aaPrepareVisualChestStored();
                    if (args.types && args.types != "")
                        PKD_MI.setChestItemTypeLimit(args.types);
                    if(String.any(args.image)) {
                        MISetIconForChest(args.image);
                    }
                    let limit = parseInt(args.limit);
                    if(limit > 0) {
                        $gameTemp.__aaVisualChestLimitCount = limit;
                    } else {
                        $gameTemp.__aaVisualChestLimitCount = null;
                    }
                } else {
                    window.alert("Map Inventory: Visual Chests works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MapInventory", 'MI_Inventory_State', args => {
            try {
                let state = eval(args.state);
                if(state == true) {
                    EnableMapInventory();
                } else {
                    DisableMapInventory();
                }
            } catch (e) {
                console.warn(e);
            }
        }); 

        PluginManager.registerCommand("PKD_MapInventory", 'MI_UserChestOpen', args => {
            try {
                OpenMapUserChest();
            } catch (e) {
                console.warn(e);
            }
        }); 

        PluginManager.registerCommand("PKD_MapInventory", 'MI_Button_Move', args => {
            try {
                if (PKD_MI.isPro()) {
                        let x = parseInt(args.X);
                        let y = parseInt(args.Y);
                        $gameSystem.getPKIButtonSettings().position = [x, y];
                        PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MapInventory", 'MI_Button_Visibility', args => {
            try {
                if (PKD_MI.isPro()) {
                    let state = eval(args.state);
                    $gameSystem.getPKIButtonSettings().visibility = state;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

        PluginManager.registerCommand("PKD_MapInventory", 'MI_Button_State', args => {
            try {
                if (PKD_MI.isPro()) {
                    let state = eval(args.state);
                    $gameSystem.getPKIButtonSettings().disable = !state;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        }); 
        
        PluginManager.registerCommand("PKD_MapInventory", 'MI_Button_Reset', args => {
            try {
                if (PKD_MI.isPro()) {
                    $gameSystem.pkmiButtonSettings = null;
                    PKD_MI.refreshInventoryButton();
                } else {
                    window.alert("Map Inventory: UI Button works only in PRO version");
                }
            } catch (e) {
                console.warn(e);
            }
        });

    }

})();

(function(){

    ImageManager.loadPKDMI('background');

    isInMousePosition = function (sprite, dx, dy) {
        function inRect(point, rect) {
            var x2, y2;
            try {
                x2 = rect.x + rect.width;
                y2 = rect.y + rect.height;
                return point.x > rect.x && point.x < x2 && point.y < y2 && point.y > rect.y;
            } catch (error) {
                
            }
        }
        if (dx === undefined)
            dx = 0;
        if (dy === undefined)
            dy = 0;
        var rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(sprite, 'x');
        ry = KDCore.SDK.toGlobalCoord(sprite, 'y');
        rect = new Rectangle(rx - dx, ry - dy, sprite.width + (dx * 2), sprite.height + (dy * 2));
        return inRect(TouchInput, rect);
    };

    function Sprite_NumberSlider() {
        this.initialize.apply(this, arguments);
    }

    Sprite_NumberSlider.prototype = Object.create(Sprite.prototype);
    Sprite_NumberSlider.prototype.constructor = Sprite_NumberSlider;

    Sprite_NumberSlider.prototype.initialize = function (callback, valueChangeCallback) {
        Sprite.prototype.initialize.call(this);
        this.afterLoadCallback = callback;
        this.valueChangeCallback = valueChangeCallback;
        this._create();
    };

    //?[NEW]
    Sprite_NumberSlider.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateSliderMoveByMouse();
    };

    PKD_MI.register(Sprite_NumberSlider);

    //@[IMPLEMENTATION]
    (function () {

        //@[DEFINES]
        var _ = Sprite_NumberSlider.prototype;
        var __ = null; //@[PRE]

        _.terminate = function() {
            this.visible = false;
            if(this.parent)
                this.parent.removeChild(this);
            if(KDCore.isMV())
                this.destroy();
        };

        //?[NEW]
        _._create = function () {
            __ = PKD_MI.getUIMapInventorySettings().itemSliderSettings;
            this._loadSliderResources();
            this.bitmap = ImageManager.loadPKDMI('background');
            if(this.bitmap.isReady()) {
                this._createAfterLoad();
            } else
                this.bitmap.addLoadListener(_._createAfterLoad.bind(this));
        };

        //?[NEW]
        _._loadSliderResources = function () {
            ImageManager.loadPKDMI('background');
            ImageManager.loadPKDMI('fill');
            ImageManager.loadPKDMI('slider');
        };

        //?[NEW]
        _._createAfterLoad = function () {
            if (!this.bitmap.width) return;
            this._ww = this.bitmap.width;
            //this._createIcon();
            this._createFill();
            this._mouseZone = new Sprite(new Bitmap(this.width + 20, this.height + (__.zoneDY * 2)));
            this._mouseZone.move(-10, -__.zoneDY);
            this.addChild(this._mouseZone);
            if(this.afterLoadCallback)
                this.afterLoadCallback();
        };

        //?[NEW]
        _._createFill = function () {
            var fillBitmap = ImageManager.loadPKDMI('fill');
            var fillImg = new Sprite(fillBitmap);
            fillBitmap.addLoadListener(function () {
                var sliderFill = new Sprite(new Bitmap(fillBitmap.width, fillBitmap.height));
                this.sliderFill = sliderFill;
                this.addChild(this.sliderFill);
                this._createSlider();
            }.bind(this));
            this.fillImg = fillImg;
        };

        //?[NEW]
        _._createSlider = function () {
            this.sliderSprite = new Sprite(ImageManager.loadPKDMI('slider'));
            this.sliderSprite.anchor.x = 0.5;
            this.sliderSprite.move(__.sliderMarginX, __.sliderMarginY);
            this.addChild(this.sliderSprite);

            function applyS() {
                this.setPercent(1);
            }

            setTimeout(applyS.bind(this), 20);
            setTimeout(applyS.bind(this), 50);
            setTimeout(applyS.bind(this), 100);
        };

        //?[NEW]
        _.setPercent = function (percent) {
            try {
                if (!this.sliderFill)
                    return;
                if (!this.fillImg)
                    return;
                if (percent === undefined)
                    percent = 1;
                if (percent > 1)
                    percent = 1;
                var w = this.fillImg.width * percent;
                this._fillSliderBy(w);
            } catch (e) {
                console.warn(e);
            }
        };

        //?[NEW]
        _._fillSliderBy = function (w) {
            //"fill0".p(w);
            this.sliderFill.bitmap.clear();
            this.sliderFill.bitmap.blt(this.fillImg.bitmap, 0, 0, w, this.fillImg.height, 0, 0);
            this.sliderSprite.move(__.sliderMarginX + w - __.sliderDX, __.sliderMarginY);
        };

        //?[NEW]
        _._applyValueSettings = function (w) {
            var percent = (w / this.fillImg.width);
            percent = ~~(percent * 100);
            if (percent < 0)
                percent = 0;
            if (percent > 99)
                percent = 100;
            //PKD_MI.onSliderValueChanged(percent);
            this.valueChangeCallback(percent);
            this.setPercent(percent / 100);
        };

        _.isInMousePositionAll = function() {
            return isInMousePosition(this._mouseZone, 0, 0);
        };

        _.isInMousePositionHandler = function() {
            return isInMousePosition(this.sliderSprite, 5, 5);
        };

        //?[NEW]
        _.updateSliderMoveByMouse = function () {
            if (!this.sliderSprite)
                return;
            if (!this._mouseZone)
                return;
            if (this.isInMousePositionHandler()) {
                this._canMoveSlider = true;
            }
            if (!this.isInMousePositionAll()) {
                this._canMoveSlider = false;
            } else {
                if (TouchInput.isTriggered() && this._canMoveSlider == false) {
                    this._moveSliderByMouse();
                }
            }

            if (this._canMoveSlider) {
                if (TouchInput.isPressed()) {
                    this._moveSliderByMouse();
                }
            }
        };

        //?[NEW]
        _._moveSliderByMouse = function () {
            var localMPX = KDCore.SDK.canvasToLocalX(this, TouchInput.x);
            if (localMPX <= this.fillImg.width) {
                this._fillSliderBy(localMPX);
                this._applyValueSettings(localMPX);
            }
        };

    })();
    // ===============================================================================
})();

// Generated by CoffeeScript 2.6.1
(function() {
  var _addRawItemInPlayerStorage;
  window.OpenMapInventory = function() {
    return PKD_MI.openInventory();
  };
  window.CloseMapInventory = function() {
    return PKD_MI.closeInventory();
  };
  window.OpenOrCloseMapInventory = function() {
    return PKD_MI.openOrCloseInventory();
  };
  window.OpenMapUserChest = function() {
    return PKD_MI.openUserChest();
  };
  window.CloseMapUserChest = function() {
    return PKD_MI.closeUserChest();
  };
  window.IsInventoryAllowed = function() {
    return $gamePlayer._absInvOffByUAPI !== true;
  };
  window.DisableMapInventory = function() {
    $gameTemp.__miNotCloseSE = true;
    $gamePlayer._absInvOffByUAPI = true;
    CloseMapInventory();
  };
  window.EnableMapInventory = function() {
    return $gamePlayer._absInvOffByUAPI = null;
  };
  window.ClearAllStoredChests = function() {
    return $gamePlayer._aaChestStorages = {};
  };
  window.ClearStoredChestsOnMap = function(mapId) {
    var e;
    try {
      if (mapId == null) {
        mapId = $gameMap.mapId();
      }
      return $gamePlayer.aaClearStoredChestOnMap(mapId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.ModifyInventoryMaxWeight = function(value) {
    var e;
    try {
      if ((value != null) && value > 0) {
        $gamePlayer.modifyPlayerStaticWeight(value);
      }
      return PKD_MI.refreshInventory();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.MIOpenVisualChest = function(name) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        if (name != null) {
          PKD_MI.setChestName(name);
        }
        return $gameMap._interpreter._aaPrepareVisualChest();
      } else {
        return window.alert("Map Inventory: Visual Chests works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIOpenVisualChestStored = function(name, types) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        if (name != null) {
          PKD_MI.setChestName(name);
        }
        $gameTemp._visualChestRestrictionTypes = [];
        $gameMap._interpreter._aaPrepareVisualChestStored();
        if ((types != null) && types !== "") {
          return PKD_MI.setChestItemTypeLimit(types);
        }
      } else {
        return window.alert("Map Inventory: Visual Chests works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonMove = function(x, y) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().position = [x, y];
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonVisibility = function(state) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().visibility = state;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonState = function(state) {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.getPKIButtonSettings().disable = !state;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MIButtonReset = function() {
    var e;
    try {
      if (PKD_MI.isPro()) {
        $gameSystem.pkmiButtonSettings = null;
        return PKD_MI.refreshInventoryButton();
      } else {
        return window.alert("Map Inventory: UI Button works only in PRO version");
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  window.MI_SetSelectModeW = function() {
    return $gameTemp._miESM = 1;
  };
  window.MI_SetSelectModeA = function() {
    return $gameTemp._miESM = 2;
  };
  //u24
  window.MI_SetThrowOut = function(state) {
    return $gamePlayer._mi_totfDisable = !state;
  };
  //u24
  //?Nullable
  window.MI_DroppedId = function() {
    return $gameTemp.miDroppedOutItemId;
  };
  //u25
  window.MI_SwitchHotCellsGroup = function(index = 0) {
    var e;
    try {
      $gamePlayer.miSwitchHotCellsGroup(index);
      return PKD_MI.eUI.switchHotCellsGroup();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.AddWeaponInPlayerStorage = function(id, count = 1) {
    var e;
    try {
      return _addRawItemInPlayerStorage(id, $dataWeapons, count);
    } catch (error) {
      e = error;
      return PKD_MI.warning('addWeaponInPlayerStorage', e);
    }
  };
  window.AddItemInPlayerStorage = function(id, count = 1) {
    var e, item;
    try {
      item = $dataItems[id];
      if (item == null) {
        return;
      }
      if (item.itypeId === 1) { // * Только не ключи
        return _addRawItemInPlayerStorage(id, $dataItems, count);
      }
    } catch (error) {
      e = error;
      return PKD_MI.warning('addItemInPlayerStorage', e);
    }
  };
  _addRawItemInPlayerStorage = function(id, data, count = 1) {
    var item;
    item = data[id];
    if ((item != null) && count > 0) {
      $gamePlayer.addPutItemToPlayerChest(item, count);
      PKD_MI.refreshUserChest();
    }
  };
  window.AddArmorInPlayerStorage = function(id, count = 1) {
    var e;
    try {
      return _addRawItemInPlayerStorage(id, $dataArmors, count);
    } catch (error) {
      e = error;
      return PKD_MI.warning('addArmorInPlayerStorage', e);
    }
  };
  window.MoveAllItemsToStorage = function() {
    var e;
    try {
      return $gameParty.moveAllItemsToAAStorage();
    } catch (error) {
      e = error;
      return PKD_MI.warning('moveAllItemsToStorage', e);
    }
  };
  window.MoveEquipedItemsToStorage = function() {
    var e;
    try {
      return $gameParty.moveEquipedItemsToStorage();
    } catch (error) {
      e = error;
      return PKD_MI.warning('moveEquipedItemsToStorage', e);
    }
  };
  window.ClearPlayerStorage = function() {
    var e;
    try {
      $gamePlayer.initAAPlayerChestStorage();
      return PKD_MI.refreshUserChest();
    } catch (error) {
      e = error;
      return PKD_MI.warning('clearPlayerStorage', e);
    }
  };
  window.GetMaxWeight = function() {
    var e;
    try {
      return $gameParty.getMaxWeightCapacity();
    } catch (error) {
      e = error;
      PKD_MI.warning('GetMaxWeight', e);
      return 0;
    }
  };
  window.GetCurrentWeight = function() {
    var e;
    try {
      return $gameParty.getCurrentWeight();
    } catch (error) {
      e = error;
      PKD_MI.warning('GetCurrentWeight', e);
      return 0;
    }
  };
  //u20
  window.IsOverWeight = function() {
    if ($gameTemp._miMaxWeightCapacity == null) {
      return false;
    }
    return GetCurrentWeight() > GetMaxWeight();
  };
  window.RefreshWeightSystem = function() {
    var e;
    try {
      $gameParty._refreshInventoryWAutoState();
      $gamePlayer.refreshInventoryWSpeedDebuff();
      return $gameParty.requestWeightCapacityRefresh();
    } catch (error) {
      e = error;
      return PKD_MI.warning('RefreshWeightSystem', e);
    }
  };
  window.TakeAllFromContainer = function() {
    var e;
    try {
      return PKD_MI.takeAllFromChest();
    } catch (error) {
      e = error;
      PKD_MI.warning('TakeAllFromContainer', e);
    }
  };
  //u19
  window.IsHaveFreeSlotsForItems = function() {
    return $gameParty.isHaveFreeSlotInCategory(0);
  };
  window.IsHaveFreeSlotsForWeapons = function() {
    return $gameParty.isHaveFreeSlotInCategory(1);
  };
  window.IsHaveFreeSlotsForArmors = function() {
    return $gameParty.isHaveFreeSlotInCategory(2);
  };
  window.MISetStoredChestLimit = function(limit) {
    return $gameTemp.__aaVisualChestLimitCount = limit;
  };
  window.MISetIconForChest = function(imageName) {
    return $gameTemp.__nextVisualChestExtraIcon = imageName;
  };
  //u20
  window.HideMapInventoryUI = function() {
    return typeof PKD_MI !== "undefined" && PKD_MI !== null ? PKD_MI.hideUI() : void 0;
  };
  window.ShowMapInventoryUI = function() {
    return typeof PKD_MI !== "undefined" && PKD_MI !== null ? PKD_MI.showUI() : void 0;
  };
  //u21
  window.MIOpenVisualChestStoredForTrade = function(name, types) {
    $gameTemp.__pkdMiTradeChestId = name;
    MIOpenVisualChestStored(name, types);
  };
  window.MIClearTradeChest = function(name) {
    var e;
    try {
      return $gamePlayer.miClearItemsInTradeChest(name);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.MIPriceForItemsInTradeChest = function(name, variableId) {
    var e, price;
    try {
      price = $gamePlayer.miGetPriceForItemsInTradeChest(name);
      if (variableId > 0) {
        $gameVariables.setValue(variableId, price);
      }
      return price;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.MITradeItemsFromChest = function(name) {
    var e, price;
    try {
      price = MIPriceForItemsInTradeChest(name, 0);
      $gameParty.gainGold(price);
      MIClearTradeChest(name);
      return price;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //u25
  window.MICloseSelectWindow = function(isCallCommonEvent = true) {
    var e;
    try {
      if (!isCallCommonEvent) {
        $gameTemp._miESM_selectionDoneCE = 0;
      }
      if ($gameTemp._miInvenotryPickActive === true) {
        $gameTemp._miESM = null;
        return PKD_MI.eUI.inventory._onItemPickUpDone(0);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.MISelectItemToVariable = function(type, varId, selectedCE = 0) {
    var e;
    try {
      switch (type) {
        case "item":
        case "keyItem":
          $gameTemp._miESM = 3; // * Items (without $gameMessage)
          break;
        case "armor":
          $gameTemp._miESM = 2;
          break;
        case "weapon":
          $gameTemp._miESM = 1;
          break;
        default:
          $gameTemp._miESM = 3;
      }
      $gameTemp._miInvenotryPickActive = true;
      $gameTemp._miESM_varId = varId;
      $gameTemp._miESM_itemTypeId = 1;
      if (type === "keyItem") {
        $gameTemp._miESM_itemTypeId = 2;
      }
      $gameTemp._miESM_selectionDoneCE = selectedCE;
      return PKD_MI.startItemSelect($gameTemp._miESM_itemTypeId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_INV_UI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI;
  //?UPDX
  // * Для registerCommand MZ
  _.PluginName = "PKD_MapInventory";
  _.setUI = function(eUI) {
    this.eUI = eUI;
  };
  //u24
  _.isGameShouldBePaused = function() {
    if (!PKD_MI.Parameters.getIsPauseGameOnInvIsOpened()) {
      return false;
    }
    return this.isInventoryOpened() || this.isChestIsOpen() || this.isUserChestIsOpen();
  };
  //UPD20
  _.isProcessEUITouch = function() {
    if (this.eUI == null) {
      return false;
    }
    return this.eUI.visible === true && (this.eUI.isMouseInInventory() || this.eUI.isMouseInIButton());
  };
  _.openInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openInventory() : void 0;
  };
  //UPD20
  _.hideUI = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.visible = false : void 0;
  };
  //UPD20
  _.showUI = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.visible = true : void 0;
  };
  _.closeInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.closeInventory() : void 0;
  };
  _.openOrCloseInventory = function() {
    if (this.isInventoryOpened()) {
      return this.closeInventory();
    } else {
      return this.openInventory();
    }
  };
  _.isInventoryOpened = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isInventoryOpen() : void 0;
  };
  _.invShowNextPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showNextInvPage() : void 0;
  };
  _.invShowPrevPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showPrevInvPage() : void 0;
  };
  //UPD20
  _.onInvCellClick = function(index) {
    var ref, ref1;
    if (((ref = this.eUI) != null ? ref.visible : void 0) === true) {
      return (ref1 = this.eUI) != null ? ref1.clickInvItem(index) : void 0;
    }
  };
  _.invShowCategoryItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(0) : void 0;
  };
  _.invShowCategoryWeapons = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(1) : void 0;
  };
  _.invShowCategoryArmors = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(2) : void 0;
  };
  _.invShowCategoryKeyItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openCategory(3) : void 0;
  };
  _.refreshInventory = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.refreshInventory() : void 0;
  };
  // * =========================  CHEST ===============================
  _.onChestCellClick = function(index) {
    var ref;
    if (_.isChestIsOpen()) {
      if ((ref = this.eUI) != null) {
        ref.clickChestItem(index);
      }
    } else if (_.isUserChestIsOpen()) {
      this.eUI.clickUserChestItem(index);
    }
  };
  _.openChest = function() {
    var ref;
    if (PKD_MI.isPro()) {
      return (ref = this.eUI) != null ? ref.openMapChest() : void 0;
    }
  };
  _.closeChest = function() {
    var e, ref, ref1, ref2;
    if ((ref = this.eUI) != null) {
      ref.closeMapChest();
    }
    try {
      if (this.isInventoryOpened() && ((ref1 = this.eUI) != null ? ref1.inventory.isSomeItemFocused() : void 0)) {
        return (ref2 = this.eUI) != null ? ref2.inventory.clearFocus() : void 0;
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.setChestName = function(name) {
    return $gameTemp.__aaChestName = name;
  };
  _.setChestLootIcon = function() {
    return $gameTemp.__aaChestIsLoot = true;
  };
  _.resetChestName = function() {
    return $gameTemp.__aaChestName = null;
  };
  _.isChestIsOpen = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isChestOpen() : void 0;
  };
  _.takeAllFromChest = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.takeAllFromChest() : void 0;
  };
  _.chestShowNextPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showNextChestPage() : void 0;
  };
  _.chestShowPrevPage = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.showPrevChestPage() : void 0;
  };
  // * ========================= USER CHEST ===========================
  _.openUserChest = function() {
    var ref;
    if (!PKD_MI.isPro()) {
      return;
    }
    if (!_.isUserChestIsOpen()) {
      return (ref = this.eUI) != null ? ref.openUserChest() : void 0;
    }
  };
  _.closeUserChest = function() {
    var e, ref, ref1, ref2;
    if ((ref = this.eUI) != null) {
      ref.closeUserChest();
    }
    try {
      if (this.isInventoryOpened() && ((ref1 = this.eUI) != null ? ref1.inventory.isSomeItemFocused() : void 0)) {
        return (ref2 = this.eUI) != null ? ref2.inventory.clearFocus() : void 0;
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  _.isUserChestIsOpen = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.isUserChestOpen() : void 0;
  };
  _.refreshUserChest = function() {
    var ref;
    if (_.isUserChestIsOpen()) {
      if ((ref = this.eUI) != null) {
        ref.refreshUserChest();
      }
    }
  };
  _.userChestShowCategoryWeapons = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(1) : void 0;
  };
  _.userChestShowCategoryArmors = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(2) : void 0;
  };
  _.userChestShowCategoryItems = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.openUserChestCategory(0) : void 0;
  };
  // * =========================== COMMON =============================
  _.isSomeIsOpen = function() {
    return this.isInventoryOpened() || this.isUserChestIsOpen();
  };
  _.closeSome = function() {
    if (this.isUserChestIsOpen()) {
      this.closeUserChest();
    } else if (this.isInventoryOpened()) {
      this.closeInventory();
    }
  };
  // * ============================ UPDATE 1.1 =========================
  _.onInvCellFocusedClick = function(index) {
    var ref;
    return (ref = this.eUI) != null ? ref.clickInvFocusedItem(index) : void 0;
  };
  _.onInvPartyCellClick = function(actor) {
    var ref;
    return (ref = this.eUI) != null ? ref.clickInvPartyActor(actor) : void 0;
  };
  
  //u20
  _.isPartyInventoryAllowed = function() {
    if (this.IsNETZM()) {
      return false;
    } else {
      return PKD_MI.Parameters.get_MapInventoryAllowPartySelect() === true && PKD_MI.partyGroup().length > 1;
    }
  };
  _.isStoredChestIsOpen = function() {
    if (PKD_MI.Parameters.get_AllowUseStoredChestLikeStorage() === true) {
      return PKD_MI.isChestIsOpen() && $gameTemp.__isStoredVisualChestShouldOpened === true;
    } else {
      return false;
    }
  };
  _.refreshStoredChest = function() {
    var ref;
    if (_.isStoredChestIsOpen()) {
      return (ref = this.eUI) != null ? ref.refreshStoredChest() : void 0;
    }
  };
  // * ============================ UPDATE 1.2 =========================
  //u20, u23
  _.partyGroup = function() {
    var filter, j, len, m, members, newMembers;
    if (this.IsNETZM()) {
      return [$gameParty.leader()];
    } else {
      if (PKD_MI.Parameters.get_Allow8()) {
        members = $gameParty.allMembers();
      } else {
        members = $gameParty.battleMembers();
      }
      // * Фильтр, чтобы убирать из Selector запрещённых в параметрах персонажей
      filter = this._getForbiddenActorsForPartySelector();
      if (filter.length > 0) {
        newMembers = [];
        for (j = 0, len = members.length; j < len; j++) {
          m = members[j];
          if (filter.contains(m.actorId())) {
            continue;
          } else {
            newMembers.push(m);
          }
        }
        return newMembers;
      } else {
        return members;
      }
    }
  };
  _._getForbiddenActorsForPartySelector = function() {
    var actorId, dinamicAllowed, dinamicForbidden, e, forbidden, fromParameters, j, k, l, len, len1, len2;
    try {
      forbidden = [];
      fromParameters = PKD_MI.Parameters.getForbiddenActorsForPartySelector();
      dinamicForbidden = $gamePlayer.miGetForbiddenActorsForPartySelector();
      dinamicAllowed = $gamePlayer.miGetAllowedActorsForPartySelector();
      for (j = 0, len = fromParameters.length; j < len; j++) {
        actorId = fromParameters[j];
        forbidden.push(actorId);
      }
      for (k = 0, len1 = dinamicForbidden.length; k < len1; k++) {
        actorId = dinamicForbidden[k];
        if (!forbidden.contains(actorId)) {
          forbidden.push(actorId);
        }
      }
      for (l = 0, len2 = dinamicAllowed.length; l < len2; l++) {
        actorId = dinamicAllowed[l];
        forbidden.delete(actorId);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return forbidden;
  };
  _.closeInventoryByClick = function() {
    if (this.eUI == null) {
      return;
    }
    if (this.eUI.inventory == null) {
      return;
    }
    if (this.eUI.inventory.isSomeItemFocused()) {
      return;
    }
    return this.eUI.closeInventory();
  };
  // * ============================ UPDATE 1.3 =========================
  _.onSliderValueChanged = function(valuePercent) {
    return _.eUI.inventory.onSliderValueChanged(valuePercent);
  };
  _.onSliderChestValueChanged = function(valuePercent) {
    var ref;
    if (_.isUserChestIsOpen()) {
      return _.eUI.userChest.onSliderValueChanged(valuePercent);
    } else {
      return (ref = _.eUI.chest) != null ? ref.onSliderValueChanged(valuePercent) : void 0;
    }
  };
  _.onSliderOkClick = function() {
    if (_.isInventoryOpened()) {
      _.eUI.inventory.onSliderOkClick();
    }
  };
  _.onSliderChestOkClick = function() {
    var ref;
    if (_.isUserChestIsOpen()) {
      _.eUI.userChest.onSliderOkClick();
    } else {
      if ((ref = _.eUI.chest) != null) {
        ref.onSliderOkClick();
      }
    }
  };
  _.isUseSlider = function() {
    return PKD_MI.isPro() && PKD_MI.Parameters.get_UseSlider() === true;
  };
  // * ============================ UPDATE 1.4 =========================
  _.requestWeigthNotify = function() {
    var ref, ref1;
    if (this.isInventoryOpened()) {
      return (ref = this.eUI) != null ? (ref1 = ref.inventory) != null ? ref1._executeNoWeightNotify() : void 0 : void 0;
    }
  };
  _.getInventoryScreenButton = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.getMIButton() : void 0;
  };
  _.refreshInventoryButton = function() {
    var ref;
    return (ref = this.eUI) != null ? ref.applyMIButtonSettings() : void 0;
  };
  //?UPDX
  _.registerExtraMethods = function() {
    if (PKD_MI.Parameters.get_IsWSSlowDown() === true) {
      $gamePlayer.refreshInventoryWSpeedDebuff();
      Game_Player.prototype.realMoveSpeed = Game_Player.prototype.invRealMoveSpeed;
    }
    if (PKD_MI.Parameters.get_WSAutoState() <= 0) {
      Game_Party.prototype._refreshInventoryWAutoState = function() {}; // * EMTPY
      Game_Actor.prototype._updateInventoryWeightAutoState = function() {}; // * EMPTY
    }
    if (!PKD_MI.Parameters.isOuterItemsHotKeysEnabled()) {
      Spriteset_InvUI.prototype._updateOuterHotKeys = function() {}; // * EMPTY
    }
    if (PKD_MI.Parameters.isIconImagesInDefaultWindows() && PKD_MI.isPro()) {
      return this.registerDrawImageIconMethods();
    }
  };
  
  // * ============================ UPDATE 1.5 =========================
  _.setChestItemTypeLimit = function(typesRaw) {
    var j, len, t, types;
    $gameTemp._visualChestRestrictionTypesRaw = typesRaw;
    types = typesRaw.split("|");
    for (j = 0, len = types.length; j < len; j++) {
      t = types[j];
      $gameTemp._visualChestRestrictionTypes.push(t);
    }
  };
  _.isHaveSomeTypeLimit = function() {
    var ref;
    if (PKD_MI.isStoredChestIsOpen() && ((ref = $gameTemp._visualChestRestrictionTypes) != null ? ref.length : void 0) > 0) {
      return true;
    }
    return false;
  };
  //?u19
  _.isProperItemForTypeLimit = function(item) {
    var j, len, ref, subType, subTypes;
    if (item == null) {
      return false;
    }
    if (((ref = item.meta) != null ? ref.aItemType : void 0) == null) {
      return false;
    }
    // * multi types
    if (item.meta.aItemType.contains("|")) {
      subTypes = item.meta.aItemType.split("|");
      for (j = 0, len = subTypes.length; j < len; j++) {
        subType = subTypes[j];
        if ($gameTemp._visualChestRestrictionTypes.some(function(t) {
          return t === subType;
        })) {
          return true;
        }
      }
    }
    // * single type
    return $gameTemp._visualChestRestrictionTypes.some(function(t) {
      return t === item.meta.aItemType;
    });
  };
  // * ============================ UPDATE 1.6 =========================

  //?UPDX
  _.startMoveCell = function(item) {
    var ref;
    if (PKD_MI.isPro()) {
      return (ref = this.eUI) != null ? ref.startMoveCellItem(item) : void 0;
    }
  };
  //?UPDX
  _.onMapHotCellClick = function(index) {
    var ref;
    return (ref = this.eUI) != null ? ref.callHotCellItem(index) : void 0;
  };
  // * ============================ UPDATE 1.7 =========================
  _.registerDrawImageIconMethods = function() {
    var _alias_Window_Base_drawIcon, _alias_Window_Base_drawItemName;
    _alias_Window_Base_drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
      var _iconIndex;
      if (item == null) {
        return;
      }
      if (String.any(DataManager.getItemInvImage(item))) {
        // * field swapping
        _iconIndex = item.iconIndex;
        item.iconIndex = ImageManager.loadPKDMI_Icon(item.iImg);
        _alias_Window_Base_drawItemName.call(this, item, x, y, width);
        item.iconIndex = _iconIndex;
      } else {
        _alias_Window_Base_drawItemName.call(this, item, x, y, width);
      }
    };
    _alias_Window_Base_drawIcon = Window_Base.prototype.drawIcon;
    Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
      if (iconIndex instanceof Bitmap) {
        return this.contents.drawIcon(x, y, iconIndex, 32);
      } else {
        return _alias_Window_Base_drawIcon.call(this, iconIndex, x, y);
      }
    };
  };
  _.isGoldItem = function(item) {
    if (item == null) {
      return false;
    }
    if (PKD_MI.Parameters.getGoldItemId() > 0) {
      return item.id === PKD_MI.Parameters.getGoldItemId();
    } else {
      return false;
    }
  };
  //?UPD18 (all below)
  // * ============================ UPDATE 1.8 =========================
  _.isCellUnderRightClick = function() {
    var cellUnderMouse, openedIntances;
    if (this.eUI == null) {
      //#return true
      return false;
    }
    if (this.eUI.isMouseInInventory()) {
      openedIntances = this.eUI.allOpenedInstances();
      cellUnderMouse = openedIntances.find(function(i) {
        return i.isSomeCellUnderMouse();
      });
      return cellUnderMouse != null;
    }
    return false;
  };
  //return false
  /*if @isInventoryOpened()
      return @eUI?.inventory.isSomeCellUnderMouse()
  else
      return false*/
  _.IsHaveExtraInfo = function(item) {
    return this.GetExtraInfo(item) != null;
  };
  _.GetExtraInfo = function(item) {
    var data, infoItem, j, len, searchField;
    data = PKD_MI.Parameters.getExtraInfoData();
    if (data.length === 0) {
      return null;
    }
    searchField = "itemId";
    if (DataManager.isWeapon(item)) {
      searchField = "weaponId";
    } else if (DataManager.isArmor(item)) {
      searchField = "armorId";
    }
    for (j = 0, len = data.length; j < len; j++) {
      infoItem = data[j];
      if (infoItem[searchField] === item.id) {
        return infoItem;
      }
    }
    return null;
  };
  _.FromImgI = function(filename) {
    return KDCore.Sprite.FromImg(filename, 'pMapInventory');
  };
  //?u19, u23
  // * ============================ UPDATE 1.9 =========================
  _.ApplyPluginsExtensions = function() {
    var __alias_GI_MOG_RP;
    if (Imported.PKD_ExtendedLoot === true) {
      PKD_MI.LoadExt_ExtendedLoot();
    }
    if (Imported.MOG_TreasurePopup === true) {
      __alias_GI_MOG_RP = Game_Interpreter.prototype.checkTreasurePopup;
      return Game_Interpreter.prototype.checkTreasurePopup = function(type, params) {
        if ((this._params != null) || (params != null)) {
          return __alias_GI_MOG_RP.call(this, type, params); // * NOTHING
        } else {

        }
      };
    }
  };
  
  //?u20
  // * ============================ UPDATE 2.0 =========================
  _.GetColorForQuealityLevel = function(qualityLevel) {
    var e, levelData, settings;
    try {
      settings = PKD_MI.getUIMapInventorySettings();
      if (settings.QualitySystem == null) {
        return "rgba(255,255,255,1)";
      }
      levelData = settings.QualitySystem.Levels[qualityLevel];
      if (levelData == null) {
        return KDCore.Color.WHITE.CSS;
      }
      return KDCore.Color.FromHex(levelData[1]).CSS;
    } catch (error) {
      e = error;
      console.warn(e);
      return "rgba(255,255,255,1)";
    }
  };
  // * Плагин ANETZ подключён
  _.IsNETZ = function() {
    return Imported.Alpha_NETZ === true;
  };
  // * Сетевая игра
  _.IsNETZM = function() {
    var e;
    try {
      return this.IsNETZ() && window.ANNetwork.isConnected();
    } catch (error) {
      e = error;
      console.warn(e);
      return false;
    }
  };
  _.IsGamepad = function() {
    return PKD_MI.Parameters.isGamepadSupport() && KDGamepad.isExists();
  };
  _.IsABSItem = function(item) {
    if (item == null) {
      return false;
    }
    if (Imported.Alpha_ABSZ !== true) {
      return false;
    }
    return AA.Utils.isAAObject(item);
  };
  //?u22
  // * ============================ UPDATE 2.2 =========================
  _.invShowNewCategory = function(tag, index) {
    var e;
    try {
      if (this.eUI == null) {
        return;
      }
      if (tag === "inventory") {
        this.eUI.openCategory(index);
      } else {
        this.eUI.openUserChestCategory(index);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.isNewCatsSys = function() {
    return PKD_MI.Parameters.isUseNewCategoriesSystem();
  };
  _.getNewCategories = function() {
    return PKD_MI.Parameters.getNewCategories();
  };
  _.getNewCatgoriesSize = function() {
    return this.getNewCategories().length;
  };
  //?u23
  // * ============================ UPDATE 2.3 =========================
  _._removeEscapeChars = function(text) {
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1bV\[(\d+)\]/gi, "");
    text = text.replace(/\x1bI\[(\d+)\]/gi, "");
    text = text.replace(/\x1bC\[(\d+)\]/gi, "");
    return text;
  };
  _.getItemOnlyActorIdUsecase = function(item) {
    var e;
    if (item == null) {
      return 0;
    }
    if (item.meta == null) {
      return 0;
    }
    if (!item.meta.iOnlyForActor) {
      return 0;
    }
    try {
      return parseInt(item.meta.iOnlyForActor);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 0;
    }
  };
  _.isHaveActorIdInParty = function(actorId) {
    var actor, e;
    try {
      actor = $gameParty.allMembers().find(function(a) {
        return a.actorId() === actorId;
      });
      return actor != null;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.showExternalHelpWindow = function(cell) {
    var e, ref;
    try {
      return (ref = this.eUI) != null ? ref._createHelpWindow(cell, false) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.closeExternalHelpWindow = function() {
    var e, ref;
    try {
      return (ref = this.eUI) != null ? ref._hideHelp() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?u25
  // * ============================ UPDATE 2.5 =========================
  _.startItemSelect = function(itemTypeId = 1) {
    if (PKD_MI.isInventoryOpened()) {
      PKD_MI.refreshInventory();
    } else {
      PKD_MI.openInventory();
    }
    // * Выбираем соответствующую категорию (если не кастомные)
    if (!PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      if (itemTypeId === 2) {
        PKD_MI.invShowCategoryKeyItems();
      } else {
        PKD_MI.invShowCategoryItems();
      }
    }
  };
  //?u26
  // * ============================ UPDATE 2.6 =========================
  _.isItemHaveAlterDescription = function(item) {
    var e;
    if (item == null) {
      return false;
    }
    try {
      return this.getAlternativeDescSettingsForItem(item) != null;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.getAlternativeDescSettingsForItem = function(item) {
    var e, list;
    try {
      list = PKD_MI.Parameters.get_AlternativeDescriptionsList();
      return list.find(function(i) {
        return i.itemId === item.id;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  //?u28
  // * ============================ UPDATE 2.8 =========================
  _.showExternalItemDescriptionWindowFor = function(item, x, y, appearSpeed = 0) {
    var _itemDescWindow, cell, e, isEqupItem;
    try {
      if ($gameTemp.__extDescriptionWindow != null) {
        PKD_MI.closeExternalDescriptionWindow();
      }
      isEqupItem = DataManager.isArmor(item) || DataManager.isWeapon(item);
      cell = {
        x: x,
        y: y,
        item: item,
        _isChestItem: true,
        isCanBeUnEquiped: function() {
          return isEqupItem === true;
        },
        isEnabled: function() {
          return true;
        }
      };
      if (PKD_MI.isItemHaveAlterDescription(cell.item)) {
        _itemDescWindow = new Sprite_MI_AlternativeDescription(cell, false);
      } else {
        _itemDescWindow = new PKD_MI.LIBS.Sprite_MapInvHelp();
        _itemDescWindow.setup(cell);
        _itemDescWindow.refreshPlacement(false);
      }
      if (appearSpeed > 0) {
        _itemDescWindow.appear(appearSpeed);
      }
      SceneManager._scene.addChild(_itemDescWindow);
      $gameTemp.__extDescriptionWindow = _itemDescWindow;
      return _itemDescWindow;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.closeExternalDescriptionWindow = function() {
    var e;
    try {
      if ($gameTemp.__extDescriptionWindow == null) {
        return;
      }
      $gameTemp.__extDescriptionWindow.visible = false;
      $gameTemp.__extDescriptionWindow.removeFromParent();
      $gameTemp.__extDescriptionWindow = null;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      $gameTemp.__extDescriptionWindow = null;
    }
  };
  _.addForbiddenActorForPartySelector = function(actorId) {
    var e;
    try {
      return $gamePlayer.miAddForbiddenActorForPartySelectorList(actorId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.removeForbiddenActorForPartySelector = function(actorId) {
    var e;
    try {
      return $gamePlayer.miRemoveForbiddenActorForPartySelectorList(actorId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.onSliderDropOutOkClick = function() {
    if (_.isInventoryOpened()) {
      _.eUI.inventory.onSliderDropOkClick();
    }
  };
  _.onSliderDropOutValueChanged = function(valuePercent) {
    return _.eUI.inventory.onSliderValueChanged(valuePercent);
  };
})();

// ■ END PKD_INV_UI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, _;
  //@[DEFINES]
  _ = DataManager;
  //UPD20
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(n, s) {
    if (s.contains("Test_") && (s.contains("PKD_MapInventorySettings") || s.contains("PKD_MapChestSettings") || s.contains("PKD_UserChestSettings"))) {
      this.onXhrLoad({
        responseText: "{}",
        status: 100
      }, n, s, "null");
      return;
    }
    ALIAS__loadDataFile.call(this, n, s);
  };
  _.isItemHaveHPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 11);
  };
  _.isItemHaveMPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 12);
  };
  _.isItemHaveTPEffect = function(item) {
    return _.isItemHaveEffectWithCode(item, 13);
  };
  _.isItemHaveEffectWithCode = function(item, effectCode) {
    return _.isItem(item) && item.effects.some(function(e) {
      return e.code === effectCode;
    });
  };
  _.getItemWeight = function(item) {
    var e, w;
    if (item.weight != null) {
      return item.weight;
    } else {
      w = KDCore.Utils.getValueFromMeta("weight", item);
      if (w == null) {
        if (DataManager.isItem(item) && item.itypeId === 2) {
          item.weight = 0;
        } else {
          item.weight = 1;
        }
      } else {
        try {
          item.weight = Number(w);
        } catch (error) {
          e = error;
          console.warn(e);
          item.weight = 1;
        }
      }
      return _.getItemWeight(item);
    }
  };
  _.getItemInvImage = function(item) {
    var img;
    if (!PKD_MI.isPro()) {
      return null;
    }
    if (item.iImg != null) {
      return item.iImg;
    } else {
      img = KDCore.Utils.getValueFromMeta("iImg", item);
      if (img == null) {
        item.iImg = "";
      } else {
        item.iImg = img;
      }
      return item.iImg;
    }
  };
  _.getItemQualityLevel = function(item) {
    var e, q;
    if (item.qLevel != null) {
      return item.qLevel;
    } else {
      q = KDCore.Utils.getValueFromMeta("itemRare", item);
      if (q == null) {
        item.qLevel = 0;
      } else {
        try {
          item.qLevel = Number(q);
        } catch (error) {
          e = error;
          console.warn(e);
          item.qLevel = 0;
        }
      }
      return _.getItemQualityLevel(item);
    }
  };
  _.getItemLevelRequirements = function(item) {
    var e, lvl;
    if (item == null) {
      return 0;
    }
    if (DataManager.isItem(item)) {
      return 0;
    }
    try {
      if (item.lvReq != null) {
        return item.lvReq;
      } else {
        lvl = KDCore.Utils.getValueFromMeta("lvReq", item);
        if (lvl == null) {
          item.lvReq = 0;
        } else {
          try {
            item.lvReq = Number(lvl);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            item.lvReq = 0;
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return _.getItemLevelRequirements(item);
  };
  //u19
  _.getMIIItemCategoryIndex = function(item) {
    if (this.isItem(item)) {
      if (item.itypeId === 2) {
        return 3;
      } else {
        return 0;
      }
    } else if (this.isArmor(item)) {
      return 2;
    } else if (this.isWeapon(item)) {
      return 1;
    }
    return -1;
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canEquip, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    $gameParty.requestWeightCapacityRefresh();
    $gamePlayer.refreshInventoryWSpeedDebuff();
    return this._updateInventoryWeightAutoState();
  };
  _._updateInventoryWeightAutoState = function() {
    var stateId;
    if (!PKD_MI.isPro()) {
      return;
    }
    stateId = PKD_MI.Parameters.get_WSAutoState();
    if (stateId <= 0) {
      return;
    }
    if (IsOverWeight()) {
      return this.addState(stateId);
    } else {
      return this.removeState(stateId);
    }
  };
  
  //@[ALIAS]
  ALIAS__canEquip = _.canEquip;
  _.canEquip = function(item) {
    var e, lvReq, result;
    result = ALIAS__canEquip.call(this, ...arguments);
    try {
      if (result === true && PKD_MI.Parameters.getIsUseLevelReqSystem()) {
        lvReq = DataManager.getItemLevelRequirements(item);
        if (lvReq > 0) {
          result = this.level >= Number(lvReq);
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return result;
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__command125, ALIAS__command126, ALIAS__command127, ALIAS__command128, ALIAS__command129, ALIAS__updateWaitMode, _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__command125 = _.command125;
  _.command125 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = this.operateValue(this._params[0], this._params[1], this._params[2]);
          // * Если предмет для золота задан, то будет визуально
          if (PKD_MI.Parameters.getGoldItemId() > 0) {
            // * Если значение больше 0, но золота ещё не было, то создаём предмет золота
            if (value > 0 && $gameTemp.__visualChestGoldCount === 0) {
              $gameTemp.__aaItemsForChest.push([$dataItems[PKD_MI.Parameters.getGoldItemId()], 1]);
            }
            $gameTemp.__visualChestGoldCount += value; // * Иначе просто даём золото группе
          } else {
            $gameParty.gainGold(value);
          }
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command125.call(this, params);
    }
  };
  
  //@[ALIAS]
  ALIAS__command126 = _.command126;
  _.command126 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataItems[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command126.call(this, params);
    }
  };
  //@[ALIAS]
  ALIAS__command127 = _.command127;
  _.command127 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataWeapons[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command127.call(this, params);
    }
  };
  
  //@[ALIAS]
  ALIAS__command128 = _.command128;
  _.command128 = function(params) {
    var value;
    if (this.isAAVisualChest()) {
      if (this._isAAStoredChest === false) {
        if (this._params == null) {
          this._params = params; // * MV PATCH
        }
        if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

        } else {
          // * NOTHING
          value = Math.abs(this.operateValue(this._params[1], this._params[2], this._params[3]));
          $gameTemp.__aaItemsForChest.push([$dataArmors[this._params[0]], value]);
        }
      }
      this._params = null;
      this._chestItemChance = 1;
      return this._checkNextAAVisualChestCommand();
    } else {
      return ALIAS__command128.call(this, params);
    }
  };
  _.isAAVisualChest = function() {
    return this._isAAChestMode === true;
  };
  _._checkNextAAVisualChestCommand = function() {
    if (!this._isNextCommandForChest()) {
      this._index++; // * Переходим к следующей команде
      this._aaShowVisualChest();
      return false;
    }
    return true;
  };
  _._aaShowVisualChest = function() {
    this.setWaitMode('chest');
    PKD_MI.openChest();
    return this._isAAChestMode = false;
  };
  _._aaPrepareVisualChest = function() {
    this._chestItemChance = 1;
    $gameTemp.__visualChestGoldCell = null;
    $gameTemp.__visualChestGoldCount = 0;
    $gameTemp.__isStoredVisualChestShouldOpened = false;
    this._isAAStoredChest = false;
    $gameTemp.__aaItemsForChest = [];
    if (this._isNextCommandForChest()) {
      return this._isAAChestMode = true;
    }
  };
  //u21
  _._aaPrepareVisualChestStored = function() {
    var chestData;
    this._aaPrepareVisualChest();
    if (this._isAAChestMode === true || !this._isNextCommandForChest()) {
      $gameTemp.__isStoredVisualChestShouldOpened = true;
      $gameTemp.__storedVisualChestId = [$gameMap.mapId(), this.eventId()];
      if (String.any($gameTemp.__pkdMiTradeChestId)) {
        $gamePlayer.miAddTradeChest($gameTemp.__pkdMiTradeChestId, $gameTemp.__storedVisualChestId);
        $gameTemp.__pkdMiTradeChestId = null;
      }
      chestData = $gamePlayer.getItemsForStoredChest($gameMap.mapId(), this.eventId());
      this._isAAStoredChest = chestData != null;
      if (this._isAAStoredChest === true) {
        $gameTemp.__aaItemsForChest = chestData.getAllItems();
      }
      this._isAAChestMode = true;
      if (!this._isNextCommandForChest()) {
        return this._aaShowVisualChest();
      }
    }
  };
  // * Параметы команды плагина тоже имеет свою команду
  _._isNextCommandForChest = function() {
    return [125, 126, 127, 128].contains(this.nextEventCodeWithoutArgs());
  };
  //u21
  _.nextEventCodeWithoutArgs = function() {
    var command, i;
    i = 1;
    command = this._list[this._index + i];
    while ((command != null) && (command.code === 657 || command.code === 108)) {
      if (command.code === 108) {
        if (this._isAAStoredChest === false) {
          this.checkChestChanceItem(command);
          this.checkChestGainItemCode(command);
        }
      }
      command = this._list[this._index + ++i];
    }
    if (command != null) {
      return command.code;
    } else {
      return 0;
    }
  };
  
  //u21
  _.checkChestChanceItem = function(command) {
    var e, value;
    try {
      if (!command.parameters[0].contains("chance")) {
        return;
      }
      value = command.parameters[0].split(":")[1];
      this._chestItemChance = this._operandChestCommandValue(value) / 100;
    } catch (error) {
      e = error;
      console.warn(e);
      this._chestItemChance = 1;
    }
  };
  //u21
  _._operandChestCommandValue = function(value) {
    var output, switchId, variableId;
    output = 0;
    if (value.contains("|V")) {
      variableId = parseInt(value);
      output = $gameVariables.value(variableId);
    } else if (value.contains("|S")) {
      switchId = parseInt(value);
      if ($gameSwitches.value(switchId)) {
        output = 100; // * S используется только в Chance, поэтому сразу 100, т.к. деление
      } else {
        output = 0;
      }
    } else {
      output = parseInt(value);
    }
    return output;
  };
  //u21
  //put:Z:X[|V]:Y[|V]
  // where Z: item, armor, weapon
  //put:item:X|V:Y|V
  // |V from variable
  _.checkChestGainItemCode = function(command) {
    var dataDB, e, id, keywords, type, value;
    try {
      if (!command.parameters[0].contains("put")) {
        return;
      }
      keywords = command.parameters[0].split(":");
      if (keywords.length < 4) {
        return;
      }
      type = keywords[1];
      id = this._operandChestCommandValue(keywords[2]);
      value = this._operandChestCommandValue(keywords[3]);
      dataDB = $dataItems;
      if (type === "weapon") {
        dataDB = $dataWeapons;
      } else if (type === "armor") {
        dataDB = $dataArmors;
      }
      if (this._chestItemChance !== 1 && this._chestItemChance < Math.random()) {

      } else {
        // * NOTHING
        $gameTemp.__aaItemsForChest.push([dataDB[id], value]);
      }
      // * Сброс шанса
      this._chestItemChance = 1;
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'chest') {
      return this._aaUpdateChestWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
  _._aaUpdateChestWait = function() {
    var waiting;
    waiting = PKD_MI.isChestIsOpen() || PKD_MI.isUserChestIsOpen();
    if (!waiting) {
      this._waitMode = '';
    }
    return waiting;
  };
  
  //@[ALIAS]
  // * Change Party member
  ALIAS__command129 = _.command129;
  _.command129 = function(params) {
    var r, shouldOpen;
    shouldOpen = PKD_MI.isInventoryOpened();
    PKD_MI.closeInventory();
    r = ALIAS__command129.call(this, params);
    if (shouldOpen === true) {
      PKD_MI.openInventory();
    }
    return r;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__gainItem, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //u19
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    if (PKD_MI.Parameters.isCellLockSystemAllowed()) {
      // * Если выключен игнор стандартной команды, то идёт проверка на свободные ячейки тоже
      if (!PKD_MI.Parameters.isIgnoreLimitByGainItem()) {
        if (!this.isCanAddNewItem(item)) {
          return;
        }
      }
    }
    ALIAS__gainItem.call(this, ...arguments);
    PKD_MI.refreshInventory();
  };
  
  //u19
  _.moveAllItemsToAAStorage = function() {
    var count, item, items, j, len;
    items = this.getInventoryNoKeyItems(); //line
    for (j = 0, len = items.length; j < len; j++) {
      item = items[j];
      count = this.numItems(item);
      $gameParty.gainItem(item, -count);
      $gamePlayer.addPutItemToPlayerChest(item, count);
    }
    PKD_MI.refreshUserChest();
  };
  //u19
  _.getInventoryNoKeyItems = function() {
    return this.items().filter(function(item) {
      return item.itypeId === 1;
    });
  };
  //u19
  _.getInventoryWeapons = function(includeEquipped) {
    var weapons;
    weapons = $gameParty.weapons();
    if (includeEquipped === true) {
      weapons = weapons.concat($gameParty.getAllEquippedItems(DataManager.isWeapon));
    }
    return weapons;
  };
  //u19
  _.getInventoryArmors = function(includeEquipped) {
    var armors;
    armors = $gameParty.armors();
    if (includeEquipped === true) {
      armors = armors.concat($gameParty.getAllEquippedItems(DataManager.isArmor));
    }
    return armors;
  };
  //u19
  _.getInventoryKeyItems = function() {
    return this.items().filter(function(i) {
      return i.itypeId === 2;
    });
  };
  _.moveEquipedItemsToStorage = function() {
    var item, j, len, pl, ref;
    pl = this.leader();
    if (pl == null) {
      return;
    }
    ref = pl.equips();
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      if (item == null) {
        continue;
      }
      $gamePlayer.addPutItemToPlayerChest(item, 1);
      pl.discardEquip(item);
      $gameParty.gainItem(item, -1);
    }
    PKD_MI.refreshUserChest();
  };
  _.getAllEquippedItems = function(itemTypeMethod) {
    var actor, equiped, items, j, len, ref;
    equiped = [];
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      items = actor.equips().filter(function(i) {
        return (i != null) && itemTypeMethod(i);
      });
      equiped.push(...items);
    }
    return equiped;
  };
  _.canAnyEquip = function(item) {
    var actor, j, len, ref;
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      if (actor.canEquip(item)) {
        return true;
      }
    }
    return false;
  };
  //u27
  _.miGetWhoIsEquipped = function(item) {
    var actor, e, items, j, len, ref;
    try {
      if (item == null) {
        return 0;
      }
      ref = this.members();
      for (j = 0, len = ref.length; j < len; j++) {
        actor = ref[j];
        if (actor == null) {
          continue;
        }
        items = actor.equips().filter(function(i) {
          return i === item;
        });
        if (items.length > 0) {
          return actor.actorId();
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  //u20
  _.getMaxWeightCapacity = function() {
    return $gameTemp._miMaxWeightCapacity || 0;
  };
  //u20
  _.refreshMaxWeightCapacity = function() {
    var varValue;
    varValue = KDCore.Utils.getVar(PKD_MI.Parameters.get_partyMaxWeighVar());
    varValue += this._collectWeightCapacityFromEquipment();
    varValue += $gamePlayer.getPlayerStaticWeight();
    $gameTemp._miMaxWeightCapacity = varValue;
  };
  _.isShouldRefreshWeightCapacity = function() {
    return !(this._isRefreshedCapacity != null);
  };
  _.requestWeightCapacityRefresh = function() {
    return this._isRefreshedCapacity = null;
  };
  _.getCurrentWeight = function() {
    var f, items, w;
    if (!PKD_MI.Parameters.get_UsedWSystem()) {
      // * Если система веса отключена, то текущий вес всегда 0
      return 0;
    }
    items = this.allItems();
    f = function(a, b) {
      return a + (DataManager.getItemWeight(b) * $gameParty.numItems(b));
    };
    w = items.reduce(f, 0);
    if (PKD_MI.Parameters.get_IsEquippedWeightIncluded() === true) {
      w += this._collectWeightFromEquipments();
    }
    return w;
  };
  _._collectWeightCapacityFromEquipment = function() {
    var actor, e, item, j, k, len, len1, ref, ref1;
    if (this.isShouldRefreshWeightCapacity()) {
      this._lastCapacityValue = 0;
      ref = PKD_MI.partyGroup();
      for (j = 0, len = ref.length; j < len; j++) {
        actor = ref[j];
        if (actor == null) {
          continue;
        }
        ref1 = actor.equips();
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          item = ref1[k];
          if (item == null) {
            continue;
          }
          try {
            if ((item.meta != null) && (item.meta.weightStore != null)) {
              this._lastCapacityValue += Number(item.meta.weightStore);
            }
          } catch (error) {
            e = error;
            PKD_MI.warning(e);
          }
        }
      }
      this._isRefreshedCapacity = true;
      this._refreshInventoryWAutoState();
    }
    return this._lastCapacityValue;
  };
  _._collectWeightFromEquipments = function() {
    var actor, e, item, j, k, len, len1, ref, ref1, w;
    w = 0;
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      if (actor == null) {
        continue;
      }
      ref1 = actor.equips();
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        item = ref1[k];
        if (item == null) {
          continue;
        }
        try {
          w += DataManager.getItemWeight(item);
        } catch (error) {
          e = error;
          PKD_MI.warning(e);
        }
      }
    }
    return w;
  };
  _._refreshInventoryWAutoState = function() {
    var actor, j, len, ref;
    if (!PKD_MI.isPro()) {
      return;
    }
    ref = PKD_MI.partyGroup();
    for (j = 0, len = ref.length; j < len; j++) {
      actor = ref[j];
      if (actor == null) {
        continue;
      }
      actor._updateInventoryWeightAutoState();
    }
  };
  //u19
  // * Можно ли добавить предмет в инвентарь (с учётом открытых ячеек)
  _.isCanAddNewItem = function(item) {
    var catIndex, e;
    try {
      if (!PKD_MI.isPro()) {
        return true;
      }
      if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
        return true;
      }
      if (this.numItems(item) > 0) {
        // * If player already have item, we can add to same slot
        return true;
      }
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        catIndex = this.miTryGetItemNewCategoryIndex(item);
      } else {
        catIndex = DataManager.getMIIItemCategoryIndex(item);
      }
      return this.isHaveFreeSlotInCategory(catIndex);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //u23
  _.miTryGetItemNewCategoryIndex = function(item) {
    var c, categories, i, j, k, len, len1, type;
    categories = PKD_MI.Parameters.getNewCategories();
    if ((item.meta != null) && (item.meta.iCat != null)) {
      for (i = j = 0, len = categories.length; j < len; i = ++j) {
        c = categories[i];
        if (c.type === "note" && c.note === item.meta.iCat) {
          return i;
        }
      }
    } else {
      type = "items";
      if (DataManager.isWeapon(item)) {
        type = "weapons";
      } else if (DataManager.isArmor(item)) {
        type = "armors";
      }
      for (i = k = 0, len1 = categories.length; k < len1; i = ++k) {
        c = categories[i];
        if (c.type === type) {
          return i;
        }
      }
      return 0;
    }
  };
  //u22
  _.isHaveFreeSlotInCategory = function(catIndex) {
    var itemsCount;
    if (catIndex == null) {
      return true;
    }
    if (catIndex < 0) {
      return true;
    }
    if (!PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      if (catIndex === 3) {
        // * Key items allowed always
        return true;
      }
    }
    if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      itemsCount = this.miGetStuffByUserCategory(catIndex).length;
    } else {
      itemsCount = this.getAllItemsByMICategory(catIndex, true).length;
    }
    return $gamePlayer.getMapInventoryUnlockedCount(catIndex) > itemsCount;
  };
  //u19
  _.getAllItemsByMICategory = function(catIndex, includeEquipped = false) {
    switch (catIndex) {
      case 0:
        return this.getInventoryNoKeyItems();
      case 1:
        return this.getInventoryWeapons(includeEquipped);
      case 2:
        return this.getInventoryArmors(includeEquipped);
      case 3:
        return this.getInventoryKeyItems();
    }
    return [];
  };
  
  //u22
  _.miGetStuffByUserCategory = function(catIndex) {
    var allItems, categories, categoryData, e, equiped;
    try {
      categories = PKD_MI.Parameters.getNewCategories();
      categoryData = categories[catIndex];
      equiped = PKD_MI.Parameters.get_ShowEquipedItemsInInventory();
      // * Если предмет имеет пользовательскую категорию, то его не добавляем в стандартные
      switch (categoryData.type) {
        case "items":
          allItems = this.getInventoryNoKeyItems().concat(this.getInventoryKeyItems());
          allItems = allItems.filter(function(item) {
            return (item != null) && !item.meta.iCat;
          });
          return allItems;
        case "armors":
          allItems = this.getInventoryArmors(equiped);
          allItems = allItems.filter(function(item) {
            return (item != null) && !item.meta.iCat;
          });
          return allItems;
        case "weapons":
          allItems = this.getInventoryWeapons(equiped);
          allItems = allItems.filter(function(item) {
            return (item != null) && !item.meta.iCat;
          });
          return allItems;
        default:
          return this.miGetStuffByUserNote(categoryData.note);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  //u22
  _.miGetStuffByUserNote = function(note) {
    var allStuff, e, equiped;
    try {
      equiped = PKD_MI.Parameters.get_ShowEquipedItemsInInventory();
      allStuff = this.getInventoryNoKeyItems().concat(this.getInventoryKeyItems()).concat(this.getInventoryArmors(equiped)).concat(this.getInventoryWeapons(equiped));
      if (String.any(note)) {
        allStuff = allStuff.filter(function(item) {
          return (item != null) && (item.meta.iCat != null) && item.meta.iCat === note;
        });
      }
      return allStuff;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.initMapInventoryScreenButtonData = function() {
    if (this.pkmiButtonSettings != null) {
      return;
    }
    return this.pkmiButtonSettings = {
      "position": null,
      "visibility": true,
      "disable": false
    };
  };
  _.getPKIButtonSettings = function() {
    this.initMapInventoryScreenButtonData();
    return this.pkmiButtonSettings;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//u23
PKD_MI.LoadExt_ExtendedLoot = function() {
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PELWindow_LootList.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__prepareNew, ALIAS__refresh, ALIAS__select, ALIAS__update, _;
    
    //@[DEFINES]
    _ = PELWindow_LootList.prototype;
    
    //@[ALIAS]
    ALIAS__prepareNew = _.prepareNew;
    _.prepareNew = function() {
      this.__secondRefreshForcedForLoadIconMI = null;
      ALIAS__prepareNew.call(this, ...arguments);
      if (!PKD_MI.Parameters.getIsShowEXTDesc()) {
        this._miUpdateMIHints = function() {}; // * EMTPY
      }
    };
    //@[ALIAS]
    ALIAS__select = _.select;
    _.select = function(index) {
      ALIAS__select.call(this, ...arguments);
      this._miHideHint();
      this.__miShowHintDelay = 10;
    };
    //@[ALIAS]
    ALIAS__refresh = _.refresh;
    _.refresh = function() {
      this._miHideHint();
      ALIAS__refresh.call(this, ...arguments);
      this._miForceLoadIcons();
    };
    _._miForceLoadIcons = function() {
      if (this.__secondRefreshForcedForLoadIconMI == null) {
        setTimeout((() => {
          var e;
          try {
            if (!this.isBusy()) {
              return this.refresh();
            }
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), 100);
        return this.__secondRefreshForcedForLoadIconMI = true;
      }
    };
    //@[ALIAS]
    ALIAS__update = _.update;
    _.update = function() {
      ALIAS__update.call(this, ...arguments);
      return this._miUpdateMIHints();
    };
    _._miUpdateMIHints = function() {
      var itemCell, selectedItem;
      if (this.__miShowHintDelay > 0) {
        this.__miShowHintDelay--;
      }
      if (this.isBusy()) {
        return this._miHideHint();
      } else {
        selectedItem = this._miGetSelectedItem();
        if (selectedItem === this.__miLastSelectedItem) {

        } else {
          this._miHideHint();
          if ((selectedItem != null) && this.__miShowHintDelay <= 0) {
            this.__miLastSelectedItem = selectedItem;
            //rect = @itemLineRect(@index())
            itemCell = {
              x: TouchInput.x,
              y: TouchInput.y,
              item: selectedItem,
              _isChestItem: true,
              isEnabled: function() {
                return true;
              }
            };
            PKD_MI.showExternalHelpWindow(itemCell);
          }
        }
      }
    };
    _._miHideHint = function() {
      if (this.__miLastSelectedItem == null) {
        return;
      }
      //"HIDE HINT".p()
      this.__miLastSelectedItem = null;
      PKD_MI.closeExternalHelpWindow();
    };
    _._miGetSelectedItem = function() {
      var item;
      if (this.index() <= 0) { // * -1 and Take All
        return null;
      } else {
        item = this._items[this.index()];
        if (item != null) {
          item = item[0];
          if (PKD_ExtendedLoot.IsGoldItem(item)) {
            return null; // * NO HINT FOR GOLD
          } else {
            return item;
          }
        }
      }
      return null;
    };
  })();
  if (!KDCore.Sprite.prototype._updateOpChanger) {
    KDCore.Sprite.prototype._updateOpChanger = function() {};
  }
};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ CStoredItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var CStoredItems;
  CStoredItems = class CStoredItems {
    constructor() {
      this.items = [];
    }

    putItem(item, count) {
      var exI, existsIndex, typeId;
      typeId = this._getItemTypeId(item);
      existsIndex = this._getIndexOfItem(item.id, typeId);
      if (existsIndex >= 0) {
        exI = this.items[existsIndex];
        return exI[1] = exI[1] + count;
      } else {
        return this.items.push([item.id, count, typeId]);
      }
    }

    _getIndexOfItem(itemId, typeId) {
      var i, id, index, j, len, ref, t;
      ref = this.items;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
        i = ref[index];
        id = i[0];
        t = i[2];
        if (id === itemId && typeId === t) {
          return index;
        }
      }
      return -1;
    }

    _getItemTypeId(item) {
      var typeId;
      typeId = 0;
      if (DataManager.isWeapon(item)) {
        typeId = 1;
      } else if (DataManager.isArmor(item)) {
        typeId = 2;
      }
      return typeId;
    }

    removeType(typeId) {
      var i, item, j, ref;
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        item = this.items[i];
        if (item == null) {
          continue;
        }
        if (item[2] === typeId) {
          this.items[i] = null;
        }
      }
      this.items.delete(null);
    }

    removeItem(item, count) {
      var i, j, ref, typeId, x;
      typeId = this._getItemTypeId(item);
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        x = this.items[i];
        if (x[0] === item.id && x[2] === typeId) {
          x[1] = x[1] - count;
          if (x[1] <= 0) {
            this.items.splice(i, 1);
          }
          return;
        }
      }
    }

    getAllItems() {
      var i, j, len, ref, result;
      result = [];
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i[2] === 0) {
          result.push([$dataItems[i[0]], i[1]]);
        } else if (i[2] === 1) {
          result.push([$dataWeapons[i[0]], i[1]]);
        } else if (i[2] === 2) {
          result.push([$dataArmors[i[0]], i[1]]);
        }
      }
      return result;
    }

    static ConvertToMVItem(storedItem) {
      if (storedItem[2] === 0) {
        return $dataItems[storedItem[0]];
      } else if (storedItem[2] === 1) {
        return $dataItems[storedItem[0]];
      } else if (storedItem[2] === 2) {
        return $dataArmors[storedItem[0]];
      }
      return $dataItems[storedItem[0]];
    }

    getOnlyItems() {
      return this._getOnlyTypeId(0);
    }

    _getOnlyTypeId(typeId) {
      var i, j, len, ref, result, type;
      result = [];
      type = $dataItems;
      if (typeId === 1) {
        type = $dataWeapons;
      }
      if (typeId === 2) {
        type = $dataArmors;
      }
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i[2] === typeId) {
          result.push([type[i[0]], i[1]]);
        }
      }
      return result;
    }

    getOnlyWeapons() {
      return this._getOnlyTypeId(1);
    }

    getOnlyArmors() {
      return this._getOnlyTypeId(2);
    }

    static FromRawItems(items) {
      var c;
      c = new CStoredItems();
      c.items = items;
      return c;
    }

    static FromChestItems(items) {
      var c, i, j, len;
      c = new CStoredItems();
      for (j = 0, len = items.length; j < len; j++) {
        i = items[j];
        c.putItem(i[0], i[1]);
      }
      return c;
    }

  };
  PKD_MI.register(CStoredItems);
})();

// ■ END CStoredItems.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (PKD_MI.isGameShouldBePaused()) {
      return;
    }
    return ALIAS__update.call(this, ...arguments);
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  _.miMakePlayerVisualDrop = function(item, count) {
    var data;
    if (!Imported.PKD_ExtendedLoot) {
      return;
    }
    if (item == null) {
      return;
    }
    if (count <= 0) {
      return;
    }
    if (!KDCore.Utils.isSceneMap()) {
      return;
    }
    data = [$gamePlayer.x, $gamePlayer.y + 1, KDCore.Utils.getItemTypeId(item), item.id, count];
    SceneManager._scene.pMakeVisualDropNow(data);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__executeMove, ALIAS__initMembers, ALIAS__moveByInput, ALIAS__realMoveSpeed, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__executeMove = _.executeMove;
  _.executeMove = function() {
    if (PKD_MI.isGameShouldBePaused()) {
      return;
    }
    return ALIAS__executeMove.call(this, ...arguments);
  };
  //u20 #u22
  //@[ALIAS]
  ALIAS__moveByInput = _.moveByInput;
  _.moveByInput = function() {
    this.miUpdateOpenCloseInventoryKeyPress();
    return ALIAS__moveByInput.call(this);
  };
  
  //?UPDX
  //@[ALIAS]
  ALIAS__initMembers = _.initMembers;
  _.initMembers = function() {
    ALIAS__initMembers.call(this);
    this.initAAChestStorage();
    this.initAAPlayerChestStorage();
    return this.initAAHotCells(); //?line
  };
  
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this);
    return this.refreshInventoryWSpeedDebuff();
  };
  //@[ALIAS]
  ALIAS__realMoveSpeed = _.realMoveSpeed;
  _.invRealMoveSpeed = function() {
    var speed;
    speed = ALIAS__realMoveSpeed.call(this);
    speed -= this._miwsdb;
    return speed;
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.initAAChestStorage = function() {
    return this._aaChestStorages = {};
  };
  _.initAAPlayerChestStorage = function() {
    return this._aaUserChestStorage = [];
  };
  _.aaRegisterStoredChest = function(mapId, eventId, storeItems) {
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] == null) {
      this._aaChestStorages[mapId] = {};
    }
    return this._aaChestStorages[mapId][eventId] = storeItems.items;
  };
  _.getItemsForStoredChest = function(mapId, eventId) {
    var itemsRaw;
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] != null) {
      if (this._aaChestStorages[mapId][eventId] != null) {
        itemsRaw = this._aaChestStorages[mapId][eventId];
        return PKD_MI.LIBS.CStoredItems.FromRawItems(itemsRaw);
      }
    }
    return null;
  };
  _.aaClearStoredChestOnMap = function(mapId) {
    if (this._aaChestStorages == null) {
      this.initAAChestStorage();
    }
    if (this._aaChestStorages[mapId] != null) {
      this._aaChestStorages[mapId] = {};
      delete this._aaChestStorages[mapId];
    }
  };
  _.aaGetPlayerChestStoredItems = function() {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    return sStored;
  };
  _.__getConvertedStoredItems = function() {
    return PKD_MI.LIBS.CStoredItems.FromRawItems(this._aaUserChestStorage);
  };
  _.addPutItemToPlayerChest = function(item, count) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.putItem(item, count);
    PKD_MI.refreshUserChest();
  };
  _.removeItemFromChestStorage = function(item, count) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.removeItem(item, count);
    this._aaUserChestStorage = sStored.items;
    PKD_MI.refreshUserChest();
  };
  _.removeFullTypeFromChestStorage = function(typeId) {
    var sStored;
    if (this._aaUserChestStorage == null) {
      this.initAAPlayerChestStorage();
    }
    sStored = this.__getConvertedStoredItems();
    sStored.removeType(typeId);
    this._aaUserChestStorage = sStored.items;
    PKD_MI.refreshUserChest();
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  // ========================== UPDATE 1.6 ===============================

  //?UPDX
  _.aaGetPlayerHotCellsData = function() {
    if (this._aaUserHotCellsData == null) {
      this.initAAHotCells();
    }
    return this._aaUserHotCellsData;
  };
  //?UPDX
  _.initAAHotCells = function() {
    this._aaUserHotCellsData = [];
    this._aaUserHotCellsDataEx = [];
  };
  //u20
  //*Nullable
  //?UPDX
  _.aaPutItemToHotCell = function(item, cellIndex) {
    var typeId;
    this.aaGetPlayerHotCellsData(); // * for null avoid
    if (item != null) {
      typeId = KDCore.Utils.getItemTypeId(item);
      this._miGetHotCellsGroup()[cellIndex] = [item.id, typeId];
    } else {
      this._miGetHotCellsGroup()[cellIndex] = null;
    }
  };
  //u20
  //?UPDX
  _.addGetItemForHotCell = function(cellIndex) {
    var e, item, itemData;
    this.aaGetPlayerHotCellsData(); // * for null avoid
    itemData = this._miGetHotCellsGroup()[cellIndex];
    if (itemData != null) {
      try {
        item = KDCore.Utils.getItemByType(...itemData);
        return item;
      } catch (error) {
        e = error;
        console.warning(e);
        return null;
      }
    }
    return null;
  };
  
  //u25
  _.miSwitchHotCellsGroup = function(_aaUserHotCellsGroupIndex) {
    this._aaUserHotCellsGroupIndex = _aaUserHotCellsGroupIndex;
    if (this._aaUserHotCellsGroupIndex <= 0) {
      return this._aaUserHotCellsGroupIndex = null;
    }
  };
  //u25
  _._miGetHotCellsGroup = function() {
    if (this._aaUserHotCellsGroupIndex != null) {
      if (this._aaUserHotCellsDataEx == null) {
        this._aaUserHotCellsDataEx = [];
      }
      if (this._aaUserHotCellsDataEx[this._aaUserHotCellsGroupIndex] == null) {
        this._aaUserHotCellsDataEx[this._aaUserHotCellsGroupIndex] = [];
      }
      return this._aaUserHotCellsDataEx[this._aaUserHotCellsGroupIndex];
    } else {
      return this._aaUserHotCellsData;
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  
  //u22
  _.miUpdateOpenCloseInventoryKeyPress = function() {
    var key;
    key = PKD_MI.Parameters.get_InventoryOpenKey();
    if (Input.isTriggered(key) || this.miIsGamepadOpenKeyTriggered()) {
      if (PKD_MI.isUserChestIsOpen()) {
        PKD_MI.openInventory(); // * temp solution
        return;
      }
      if (PKD_MI.isInventoryOpened()) {
        this.onPKDInventoryKey();
      } else {
        if (PKD_MI.isChestIsOpen() || PKD_MI.isUserChestIsOpen()) {
          this.onPKDInventoryKey();
        } else {
          if (this.canMove()) {
            this.onPKDInventoryKey();
          }
        }
      }
    }
  };
  //u20
  _.miIsGamepadOpenKeyTriggered = function() {
    if (PKD_MI.IsGamepad()) {
      return KDGamepad.isKey(PKD_MI.Parameters.gpOpenCloseKey());
    }
    return false;
  };
  _.onPKDInventoryKey = function() {
    if (!this.isPKDInventoryAllowed()) {
      return;
    }
    return PKD_MI.openOrCloseInventory();
  };
  _.isPKDInventoryAllowed = function() {
    return this._absInvOffByUAPI == null;
  };
  // =========================================================================
  _.getPlayerStaticWeight = function() {
    if (this._staticPSW == null) {
      this._staticPSW = 0;
    }
    return this._staticPSW;
  };
  _.modifyPlayerStaticWeight = function(value) {
    this.getPlayerStaticWeight();
    this._staticPSW += value;
  };
  _.refreshInventoryWSpeedDebuff = function() {
    this._miwsdb = 0;
    if (!PKD_MI.isPro()) {
      return;
    }
    if (IsOverWeight()) {
      return this._miwsdb = 1;
    }
  };
  //?UPD18 (ALL BELOW)
  // ========================== UPDATE 1.8 ===============================

  //TODO: Магазин?
  //u19
  _.getMapInventoryUnlockedCount = function(categoryIndex) {
    var db;
    if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      return this.miGetLockSystemForNewCats(categoryIndex);
    } else {
      db = this.miGetLockSystem();
      return db[categoryIndex];
    }
  };
  //u19
  _.miGetLockSystem = function() {
    var i, j, len, v, values;
    values = [PKD_MI.Parameters.getCellLockVariableForItems(), PKD_MI.Parameters.getCellLockVariableForWeapons(), PKD_MI.Parameters.getCellLockVariableForArmors()];
    for (i = j = 0, len = values.length; j < len; i = ++j) {
      v = values[i];
      values[i] = $gameVariables.value(v);
    }
    return values;
  };
  //u23
  _.miGetLockSystemForNewCats = function(categoryIndex) {
    var cats, e, selectedCat, type;
    try {
      cats = PKD_MI.Parameters.getNewCategories();
      selectedCat = cats[categoryIndex];
      if (selectedCat == null) {
        return 0;
      } else {
        type = selectedCat.type;
        switch (type) {
          case "items":
            return $gameVariables.value(PKD_MI.Parameters.getCellLockVariableForItems());
          case "armors":
            return $gameVariables.value(PKD_MI.Parameters.getCellLockVariableForArmors());
          case "weapons":
            return $gameVariables.value(PKD_MI.Parameters.getCellLockVariableForWeapons());
          default:
            if ((selectedCat.unlockedCellsVarId != null) && selectedCat.unlockedCellsVarId > 0) {
              return $gameVariables.value(selectedCat.unlockedCellsVarId);
            } else {
              return 1000;
            }
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return 0;
    }
  };
  //?UPD21 (ALL BELOW)
  // ========================== UPDATE 2.1 ===============================
  _.miGetChestTradeDB = function() {
    if (this._miChestsIdsForTrade == null) {
      this._miChestsIdsForTrade = {};
    }
    return this._miChestsIdsForTrade;
  };
  _.miAddTradeChest = function(chestName, chestId) {
    var db, e;
    try {
      db = this.miGetChestTradeDB();
      return db[chestName] = chestId;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.miGetPriceForItemsInTradeChest = function(chestName) {
    var allItems, chestItems, db, e, item, j, len, price;
    try {
      price = 0;
      db = this.miGetChestTradeDB();
      if (db[chestName] != null) {
        chestItems = this.getItemsForStoredChest(...db[chestName]);
        if (chestItems != null) {
          allItems = PKD_MI.LIBS.CStoredItems.FromRawItems(chestItems.items);
          allItems = allItems.getAllItems();
          for (j = 0, len = allItems.length; j < len; j++) {
            item = allItems[j];
            price += item[0].price * item[1];
          }
        }
      }
      return price;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.miClearItemsInTradeChest = function(chestName) {
    var db, e;
    try {
      db = this.miGetChestTradeDB();
      if (db[chestName] != null) {
        // * Не удаляем, а обнуляем (пустые предметы)
        this.aaRegisterStoredChest(...db[chestName], {
          items: []
        });
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?UPD28 (ALL BELOW)
  // ========================== UPDATE 2.8 ===============================

  // * Используется два массива, чтобы статичный параметр плагина модифицировать!!!
  // * Немного больше кода, но проще, чем пользователю объяснять...
  _.miInitForbiddenActorsForPartySelectorList = function() {
    var e;
    try {
      if (this._miForbiddenActorsList == null) {
        this._miForbiddenActorsList = [];
      }
      if (this._miAllowedActorsList == null) {
        return this._miAllowedActorsList = [];
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.miGetForbiddenActorsForPartySelector = function() {
    var e;
    try {
      this.miInitForbiddenActorsForPartySelectorList();
      return this._miForbiddenActorsList;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _.miGetAllowedActorsForPartySelector = function() {
    var e;
    try {
      this.miInitForbiddenActorsForPartySelectorList();
      return this._miAllowedActorsList;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return [];
  };
  _.miAddForbiddenActorForPartySelectorList = function(actorId) {
    var e;
    try {
      if (actorId == null) {
        return;
      }
      this.miInitForbiddenActorsForPartySelectorList();
      if (!this._miForbiddenActorsList.contains(actorId)) {
        this._miForbiddenActorsList.push(actorId);
      }
      this._miAllowedActorsList.delete(actorId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.miRemoveForbiddenActorForPartySelectorList = function(actorId) {
    var e;
    try {
      if (actorId == null) {
        return;
      }
      this.miInitForbiddenActorsForPartySelectorList();
      if (!this._miAllowedActorsList.contains(actorId)) {
        this._miAllowedActorsList.push(actorId);
      }
      this._miForbiddenActorsList.delete(actorId);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapInvController;
  MapInvController = class MapInvController {
    constructor(invSprite, layer) {
      var params;
      this.invSprite = invSprite;
      this.layer = layer;
      this.MAX = 25;
      if (PKD_MI.Parameters.isCustomSizeCells()) {
        params = PKD_MI.Parameters.getCustomSizeCellsParameters();
        this.MAX = params.columnsPerPage * params.rowsPerPage;
      }
      this._wallMargin = PKD_MI.getUIMapInventorySettings().screenOutSafeMargin;
      this.__pressTimer = 0;
      this.invSprite.visible = false;
      this.refreshTitle = new KDCore.TimedUpdate(3, this._onTitleTick.bind(this));
      this.goldRefreshThread = new KDCore.TimedUpdate(10, this._onGoldTick.bind(this));
      this._categoryLastPage = {};
      this._config();
      this._preload();
      return;
    }

    _config() {
      this._moveToLastPos();
      if (!PKD_MI.Parameters.get_MapInventoryAllowDrag()) {
        return this._updateInvDrag = function() {};
      }
    }

    _preload() {
      var img;
      img = PKD_MI.Parameters.get_CustomHelpWindowBackground();
      if (String.any(img)) {
        ImageManager.loadPKDMI(img);
      }
    }

    _moveToLastPos() {
      if ($gameTemp.__lastInventoryDragPos != null) {
        return this.invSprite.move($gameTemp.__lastInventoryDragPos);
      }
    }

    isInventoryActive() {
      return this.invSprite.visible === true;
    }

    //u20
    open() {
      if (this.isInventoryActive()) {
        return;
      }
      this.invSprite.createMain();
      this.content = this.invSprite._content;
      this._onGoldTick();
      this.invSprite.visible = true;
      this.invSprite.playStartSE();
      this._prepareGamepad(); //_upd20
    }

    //u20
    close() {
      var ref;
      if (!this.isInventoryActive()) {
        return;
      }
      this._hideHelp();
      if ((ref = this.partyController) != null) {
        ref.close();
      }
      this.invSprite.visible = false;
      this.content = null;
      this.invSprite.destroyMain();
      if ($gameTemp.pkdDraggableInstance === this) {
        $gameTemp.pkdDraggableInstance = null;
      }
      this._cancelGamepad(); //_upd20
    }

    showNextPage() {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      if (this._currentPage === (this._maxPages - 1)) {
        return;
      }
      return this._loadPage(this._currentPage + 1);
    }

    showPrevPage() {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      if (this._currentPage === 0) {
        return;
      }
      return this._loadPage(this._currentPage - 1);
    }

    _loadPage(pageIndex) {
      var e;
      try {
        if (pageIndex <= 0) {
          this._currentPage = 0;
          this.loadItemsInCategory(this._loadedCatIndex);
        } else {
          if (this._loadedItems == null) {
            return;
          }
          this.content.clearAllItems();
          this._hideHelp();
          this._currentPage = pageIndex;
          this._showItemsGroup(pageIndex);
          this._refreshPageInfo();
        }
      } catch (error) {
        e = error;
        PKD_MI.warning('inventory:loadPage', e);
      }
    }

    //u22
    loadItemsInCategory(catIndex = 0) {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      this._hideHelp();
      this._onNewCategoryWillLoad();
      this._loadedCatIndex = catIndex;
      this.content.clearAllItems();
      this.content.prepareForCategory(catIndex);
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        this.showUserCategoriItems();
      } else {
        switch (catIndex) {
          case 0:
            this.showItems();
            break;
          case 1:
            this.showWeapons();
            break;
          case 2:
            this.showArmors();
            break;
          case 3:
            this.showKeys();
        }
      }
      this._onNewCategoryLoaded();
    }

    //u22
    showUserCategoriItems() {
      var e;
      try {
        $gameTemp._equipmentWeapCandidates = {};
        $gameTemp._equipmentArmrCandidates = {};
        this._loadedItems = $gameParty.miGetStuffByUserCategory(this._loadedCatIndex);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this._loadedItems = [];
      }
      this._setPages();
      return this._showItemsGroup(0);
    }

    _onNewCategoryWillLoad() {
      if (this._loadedCatIndex == null) {
        return;
      }
      if (this._maxPages === 1) {
        return;
      }
      // * Сохраняем
      return this._categoryLastPage[this._loadedCatIndex] = this._currentPage;
    }

    //u19
    showItems() {
      this._loadedItems = $gameParty.getAllItemsByMICategory(0);
      this._sortByUsable();
      this._setPages();
      return this._showItemsGroup(0);
    }

    _sortByUsable() {
      var sortMethod, sortMethod2;
      if (!PKD_MI.Parameters.get_MapInventorySortItems()) {
        return;
      }
      sortMethod = null;
      sortMethod = function(a, b) {
        if (a.occasion === 2 || a.occasion === 0) {
          return -1;
        } else {
          return 1;
        }
      };
      sortMethod2 = function(a, b) {
        if (a.id < b.id) {
          return -1;
        } else {
          return 1;
        }
      };
      this._loadedItems.sort(sortMethod2);
      this._loadedItems.sort(sortMethod);
    }

    _setPages() {
      this._currentPage = 0;
      this._maxPages = 1;
      if (this._loadedItems.length <= this.MAX) {
        this._maxPages = 1;
      } else {
        this._maxPages = Math.ceil(this._loadedItems.length / this.MAX);
      }
      this._refreshPageInfo();
    }

    _refreshPageInfo() {
      var t;
      t = this.invSprite._footer;
      t.disableArrows();
      t.drawPagesCount(this._currentPage + 1, this._maxPages);
      if (this._maxPages > 1) {
        t._arrowR.enable();
        t._arrowL.enable();
        if (this._currentPage === 0) {
          t._arrowL.disable();
        }
        if (this._currentPage === (this._maxPages - 1)) {
          return t._arrowR.disable();
        }
      }
    }

    _showItemsGroup(pageIndex = 0) {
      var cell, cellIndex, e, i, item, j, ref, ref1, s;
      cellIndex = 0;
      s = pageIndex * this.MAX;
      e = s + this.MAX;
      for (i = j = ref = s, ref1 = e; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
        item = this._loadedItems[i];
        cell = this.content.getCellAt(cellIndex++);
        this._setItemToCell(cell, item);
      }
    }

    _setItemToCell(cell, item) {
      return cell.setItem(item);
    }

    showWeapons() {
      var equiped, items;
      $gameTemp._equipmentWeapCandidates = {};
      items = $gameParty.weapons();
      equiped = [];
      if (PKD_MI.Parameters.get_ShowEquipedItemsInInventory() === true) {
        equiped = $gameParty.getAllEquippedItems(DataManager.isWeapon);
      }
      items.sort(function(a, b) {
        if ($gameParty.canAnyEquip(a)) {
          return -1;
        } else {
          return 1;
        }
      });
      this._loadedItems = equiped.concat(items);
      this._sortByEquiped(DataManager.isWeapon);
      this._setPages();
      return this._showItemsGroup(0);
    }

    _sortByEquiped(itemTypeMethod) {
      var equiped;
      if (!PKD_MI.Parameters.get_MapInventorySortEquips()) {
        return;
      }
      equiped = $gameParty.getAllEquippedItems(itemTypeMethod);
      this._loadedItems.sort(function(a, b) {
        if (equiped.contains(a)) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    showArmors() {
      var equiped, items;
      $gameTemp._equipmentArmrCandidates = {};
      items = $gameParty.armors();
      equiped = [];
      if (PKD_MI.Parameters.get_ShowEquipedItemsInInventory() === true) {
        equiped = $gameParty.getAllEquippedItems(DataManager.isArmor);
      }
      items.sort(function(a, b) {
        if ($gameParty.canAnyEquip(a)) {
          return -1;
        } else {
          return 1;
        }
      });
      this._loadedItems = equiped.concat(items);
      this._sortByEquiped(DataManager.isArmor);
      this._setPages();
      return this._showItemsGroup(0);
    }

    //u19
    showKeys() {
      var items;
      items = $gameParty.getAllItemsByMICategory(3);
      this._loadedItems = items;
      this._setPages();
      return this._showItemsGroup(0);
    }

    _onNewCategoryLoaded() {
      var pageIndex;
      this._refreshCategoryButtons();
      pageIndex = this._categoryLastPage[this._loadedCatIndex];
      if (pageIndex > 0 && pageIndex < this._maxPages) {
        return this._loadPage(pageIndex);
      }
    }

    _refreshCategoryButtons() {
      var ref;
      this.invSprite._header.enableAllButtons();
      return (ref = this.invSprite._header.categoryBtns[this._loadedCatIndex]) != null ? ref.disable() : void 0;
    }

    update() {
      if (this.isInventoryActive()) {
        return this.updateWhenOpen();
      } else {
        return this._hideHelp();
      }
    }

    updateWhenOpen() {
      var ref, ref1;
      this.refreshTitle.update();
      if ((ref = this.goldRefreshThread) != null) {
        ref.update();
      }
      this._updateInvDrag();
      this._updateHelp(); //?{PART}
      if (this.isSomeItemFocused()) {
        this.updateClearFocusClick();
        if ((ref1 = this.partyController) != null) {
          ref1.update();
        }
      }
      this._updateGamepadControl();
    }

    clickAt(index) {
      var cell, e;
      try {
        cell = this.content.getCellAt(index);
        if (cell == null) {
          return;
        }
        if (cell.item == null) {
          return;
        }
        return this._onAction(cell);
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _onAction(cell) {
      var e;
      try {
        if ($gameTemp._miInvenotryPickActive === true) {
          this._onPickItemAction(cell);
          return;
        }
        if (PKD_MI.isUserChestIsOpen() || PKD_MI.isStoredChestIsOpen()) {
          return this._onStoreItem(cell);
        } else {
          return this._onActionItem(cell);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning('inventory:_onAction', e);
      }
    }

    
      // * Выбор предмета для события
    //u22, u23
    _onPickItemAction(cell) {
      var e;
      try {
        if ($gameTemp._miESM == null) {
          return this._onPickItemActionForItem(cell.item);
        } else if ($gameTemp._miESM === 1) {
          return this._onPickItemActionForWeapon(cell);
        } else if ($gameTemp._miESM === 2) {
          return this._onPickItemActionForArmor(cell);
        } else if ($gameTemp._miESM === 3) {
          return this._onPickItemActionForItem(cell.item);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //u23
    _onPickItemActionForItem(item) {
      var itypeId;
      if ($gameTemp._miESM === 3) {
        itypeId = 1;
      } else {
        itypeId = $gameMessage.itemChoiceItypeId();
      }
      if ((item != null) && DataManager.isItem(item) && item.itypeId === itypeId) {
        SoundManager.playCursor();
        this._onItemPickUpDone(item.id);
        return PKD_MI.closeInventory();
      } else {
        return SoundManager.playBuzzer();
      }
    }

    //u23
    _onPickItemActionForWeapon(cell) {
      var item;
      item = cell.item;
      if ((item != null) && DataManager.isWeapon(item) && !cell._inSpecialState) {
        SoundManager.playCursor();
        this._onItemPickUpDone(item.id);
        return PKD_MI.closeInventory();
      } else {
        return SoundManager.playBuzzer();
      }
    }

    //u23
    _onPickItemActionForArmor(cell) {
      var item;
      item = cell.item;
      if ((item != null) && DataManager.isArmor(item) && !cell._inSpecialState) {
        SoundManager.playCursor();
        this._onItemPickUpDone(item.id);
        return PKD_MI.closeInventory();
      } else {
        return SoundManager.playBuzzer();
      }
    }

    _onItemPickUpDone(itemId) {
      var ref, varId;
      if ($gameTemp._miESM === 3) {
        varId = $gameTemp._miESM_varId || 0;
      } else {
        varId = $gameMessage.itemChoiceVariableId();
      }
      if (varId > 0) {
        $gameVariables.setValue(varId, itemId);
      }
      $gameTemp._miInvenotryPickActive = null;
      if ((ref = $gameTemp._miMsgWinRef) != null) {
        ref.terminateMessage();
      }
      $gameTemp._miMsgWinRef = null;
      $gameTemp._miESM = null;
      if ($gameTemp._miESM_selectionDoneCE > 0) {
        $gameTemp.reserveCommonEvent($gameTemp._miESM_selectionDoneCE);
      }
    }

    //u22
    _onStoreItem(cell) {
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        return this._onStoreItemNewCat(cell);
      } else {
        if (this._loadedCatIndex === 3) {
          // * Нельзя квестовые предметы передавать в сундук
          SoundManager.playBuzzer();
          return;
        }
        if (this._loadedCatIndex === 2 || this._loadedCatIndex === 1) {
          // * Нельзя экиперованные предметы передавать в сундук
          if (cell.isCanBeUnEquiped()) {
            SoundManager.playBuzzer();
            return;
          }
        }
        return this._onStoreItemProcess(cell);
      }
    }

    //u22
    _onStoreItemNewCat(cell) {
      // * Нельзя экиперованные предметы передавать в сундук
      if (cell.isCanBeUnEquiped()) {
        SoundManager.playBuzzer();
        return;
      }
      this._onStoreItemProcess(cell);
    }

    //u22
    _onActionItem(cell) {
      var se;
      if (!cell.isEnabled()) {
        se = PKD_MI.Parameters.get_DisabledCellClickSE();
        if (String.any(se)) {
          KDCore.Utils.playSE(se);
        }
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        if (DataManager.isItem(cell.item)) {
          this._onActionOnGameItem(cell);
        } else {
          this._onActionOnEquipItem(cell);
        }
      } else {
        switch (this._loadedCatIndex) {
          case 0:
          case 3: // * ITEMS
            this._onActionOnGameItem(cell);
            break;
          case 1:
          case 2: // * EQUIPMENT
            this._onActionOnEquipItem(cell);
        }
      }
    }

    //u20
    _equipFromInv(actor, etypeId, item) {
      var slotId;
      slotId = actor.equipSlots().indexOf(etypeId);
      if (slotId >= 0) {
        if (actor.isEquipChangeOk(slotId)) {
          if (item == null) {
            // * Отключаем Notify для ABS Z
            $gameTemp.aaNotNeedItemPopUpNotify = true;
          }
          actor.changeEquip(slotId, item);
          SoundManager.playEquip();
          // * Включаем (если отключали)
          if ($gameTemp.aaNotNeedItemPopUpNotify === true) {
            $gameTemp.aaNotNeedItemPopUpNotify = null;
          }
        } else {
          SoundManager.playBuzzer();
        }
      }
    }

    terminate() {
      $gameTemp._tempItemForParty = null;
      if (this.isInventoryActive()) {
        return this.close();
      }
    }

    
      //u23
    _onTitleTick() {
      var cellUnderMouse;
      cellUnderMouse = this.content.getHoveredCell();
      if ((cellUnderMouse != null) && (cellUnderMouse.item != null)) {
        return this.content.drawItemName(cellUnderMouse.item.name);
      } else if (cellUnderMouse != null) {
        return this.content.drawItemName("");
      } else {
        if (($gameTemp.kdButtonUnderMouse != null) && String.any($gameTemp.kdButtonUnderMouse.miExTitle)) {
          this.content.drawItemName($gameTemp.kdButtonUnderMouse.miExTitle);
          return;
        }
        cellUnderMouse = this.invSprite._header.getHoveredIndex();
        if (cellUnderMouse != null) {
          return this.content.drawItemName(this._getCategoryTitle(cellUnderMouse));
        } else {
          return this.content.drawItemName(this._getCategoryTitle(this._loadedCatIndex));
        }
      }
    }

    //u22
    _getCategoryTitle(index) {
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        return this._getCategoryTitleNew(index);
      } else {
        switch (index) {
          case 0:
            return TextManager.item;
          case 1:
            return TextManager.weapon;
          case 2:
            return TextManager.armor;
          case 3:
            return TextManager.keyItem;
        }
      }
      return "";
    }

    //u22
    _getCategoryTitleNew(index) {
      var categories, e;
      try {
        categories = PKD_MI.Parameters.getNewCategories();
        return categories[index].name;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "";
      }
    }

    _onGoldTick() {
      this.invSprite._footer.drawGold($gameParty.gold());
      return this._refreshWeight();
    }

    _refreshWeight() {
      var fixPoint, isOver, twc, wa, wc;
      if (!PKD_MI.Parameters.get_UsedWSystem()) {
        return;
      }
      wc = $gameParty.getCurrentWeight();
      wa = $gameParty.getMaxWeightCapacity();
      isOver = wc > wa;
      if (wc % 1 === 0) {
        fixPoint = 0;
      } else {
        fixPoint = 1;
      }
      twc = wc.toFixed(fixPoint);
      return this.invSprite._footer.drawWeight(twc + "/" + wa, isOver);
    }

    //?UPD18
    //?UPD20
    _updateInvDrag() {
      var pos, x;
      if ($gameTemp._pkdMICellMoving === true) { //?line
        return;
      }
      if ($gameTemp.pkdDraggableInstance != null) {
        if ($gameTemp.pkdDraggableInstance !== this) {
          return;
        }
      }
      if (TouchInput.isPressed()) {
        x = this.invSprite._header;
        pos = TouchInput;
        if (x.isMouseIn()) {
          $gameTemp.pkdDraggableInstance = this;
          this.__pressTimer++;
          if (!(this.__pressTimer > 5)) {
            return;
          }
          if (this.__dragOffset == null) {
            this.__dragOffset = [];
            this.__dragOffset[0] = this.invSprite.x - pos.x;
            this.__dragOffset[1] = this.invSprite.y - pos.y;
          }
        }
        if ((this.__dragOffset != null) && this._isProperMouseCursorPos(pos)) {
          this.invSprite.move(pos.x + this.__dragOffset[0], pos.y + this.__dragOffset[1]);
        }
      } else {
        this.__pressTimer = 0;
        if ($gameTemp.pkdDraggableInstance === this) {
          $gameTemp.pkdDraggableInstance = null;
        }
        if (this.__dragOffset != null) {
          this._saveLastDragPos();
          this.__dragOffset = null;
        }
      }
    }

    _isProperMouseCursorPos(pos) {
      var maxH, maxW, wall;
      if (this._wallMargin === 0) {
        return true;
      }
      maxW = Graphics.width;
      maxH = Graphics.height;
      wall = this._wallMargin;
      if (pos.x < wall) {
        return false;
      }
      if (pos.x > (maxW - wall)) {
        return false;
      }
      if (pos.y < wall) {
        return false;
      }
      if (pos.y > (maxH - wall)) {
        return false;
      }
      return true;
    }

    _saveLastDragPos() {
      return $gameTemp.__lastInventoryDragPos = [this.invSprite.x, this.invSprite.y];
    }

    //u22
    placeItemToPanel(index) {
      var cellUnderMouse, e;
      cellUnderMouse = this.content.getHoveredCell();
      if (cellUnderMouse == null) {
        return false;
      }
      if (!cellUnderMouse.isEnabled()) {
        return false;
      }
      if ((cellUnderMouse.item != null) && !DataManager.isWeapon(cellUnderMouse.item)) {
        try {
          $gameParty.leader().setItemOnPanel(cellUnderMouse.item.id, index - 1);
          SoundManager.playEquip();
          this._refreshCellItem(cellUnderMouse);
          return true;
        } catch (error) {
          e = error;
          PKD_MI.warning(e);
        }
      }
      return false;
    }

    _refreshCellItem(cell) {
      //item = cell.item
      //cell.clear()
      //76cell.setItem(item)
      this._loadPage(this._currentPage);
    }

    //u22
    placeWeaponToFavorite(index) {
      var cellUnderMouse, e;
      cellUnderMouse = this.content.getHoveredCell();
      if (cellUnderMouse == null) {
        return false;
      }
      if (!cellUnderMouse.isEnabled()) {
        return false;
      }
      if ((cellUnderMouse.item != null) && DataManager.isWeapon(cellUnderMouse.item)) {
        try {
          $gameParty.leader().setFavWeap(cellUnderMouse.item, index);
          SoundManager.playEquip();
          this._refreshCellItem(cellUnderMouse);
          return true;
        } catch (error) {
          e = error;
          PKD_MI.warning(e);
        }
      }
      return false;
    }

    //?UPDX
    onHotCellItemAction(cell) {
      var type;
      if (!cell.isEnabled()) {
        return;
      }
      if (cell.item == null) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      type = KDCore.Utils.getItemTypeId(cell.item);
      if (type === 0) {
        this._onActionOnGameItem(cell);
      } else {
        this._onActionOnEquipItem(cell);
      }
      cell.refreshHotCell();
    }

    //?UPD18
    isSomeCellUnderMouse() {
      return this.content.getHoveredCell() != null;
    }

  };
  PKD_MI.register(MapInvController);
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvPartySelectCntrl.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapInvPartySelectCntrl;
  MapInvPartySelectCntrl = class MapInvPartySelectCntrl {
    constructor(contentSprite, partyUseCases) {
      this.contentSprite = contentSprite;
      this.partyUseCases = partyUseCases;
      this._actors = this.contentSprite.createPartyActors();
      this._checkEnabled();
      this.open();
    }

    _checkEnabled() {
      var i, j, k, len, ref, results;
      ref = this.partyUseCases;
      results = [];
      for (j = k = 0, len = ref.length; k < len; j = ++k) {
        i = ref[j];
        if (!i) {
          results.push(this._actors[j].disable());
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    open() {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
      if ((ref = this._actors[0]) != null) {
        ref.moveLeft();
      }
      if ((ref1 = this._actors[1]) != null) {
        ref1.moveRight();
      }
      if ((ref2 = this._actors[2]) != null) {
        ref2.moveDown();
      }
      if ((ref3 = this._actors[3]) != null) {
        ref3.moveUp();
      }
      if ((ref4 = this._actors[4]) != null) {
        ref4.moveLeftAndUp();
      }
      if ((ref5 = this._actors[5]) != null) {
        ref5.moveRightAndUp();
      }
      if ((ref6 = this._actors[6]) != null) {
        ref6.moveLeftAndDown();
      }
      if ((ref7 = this._actors[7]) != null) {
        ref7.moveRightAndDown();
      }
      this._playAppearsSound();
    }

    _playAppearsSound() {
      var e, se;
      try {
        se = PKD_MI.Parameters.getPartySelectorOpenSE();
        if (String.any(se)) {
          return KDCore.Utils.playSE(se);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    close() {
      var i, k, len, ref;
      ref = this._actors;
      for (k = 0, len = ref.length; k < len; k++) {
        i = ref[k];
        i.close();
      }
      return this.terminate();
    }

    //setTimeout @terminate.bind(@), 200
    update() {}

    terminate() {
      var e, ref, ref1;
      try {
        if ((ref = this.contentSprite) != null) {
          ref.destroyPartyActors();
        }
        return (ref1 = this.contentSprite) != null ? ref1.clearFocus() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

  };
  PKD_MI.register(MapInvPartySelectCntrl);
})();

// ■ END MapInvPartySelectCntrl.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var Parameters;
  Parameters = (function() {
    
      //?UPDX
    class Parameters extends KDCore.ParametersManager {
      constructor() {
        super("MapInventoryDrag");
        this.newParser = new KDCore.ParamLoader("MapInventoryDrag"); //?line
        if (this.isGamepadSupport()) {
          Input.activateExtendedKDGamepad();
        }
        return;
      }

      
        //?UPDX
      getCellItemHotKeyText() {
        return this.newParser.getParam('OIHotKeyText', {
          visible: true,
          size: {
            w: 22,
            h: 20
          },
          alignment: "right",
          font: {
            face: "Consolas",
            size: 14,
            italic: false
          },
          margins: {
            x: 10,
            y: 18
          },
          outline: {
            color: "",
            width: 2
          },
          textColor: "#F9E159".toCss()
        });
      }

      //?UPDX
      getHotCells() {
        return this.newParser.getParam('OIHotCells', []);
      }

      //?UPDX
      isOuterItemsHotKeysEnabled() {
        return this.newParser.getParam('OIHotKeyEnable', true);
      }

      isCustomSizeCells() {
        return this.newParser.getParam('UseCustomCellsSize', false);
      }

      isIconImagesInDefaultWindows() {
        return this.newParser.getParam('UseImageIconsInWindows', true);
      }

      // 0 - center , 1 - stretch
      getCustomSizeCellsParameters() {
        return this.newParser.getParam('CustomCellSettings', {
          iconSize: 30,
          columnsPerPage: 5,
          rowsPerPage: 5,
          iconMode: 1
        });
      }

      getGoldItemId() {
        return this.newParser.getParam('GoldItem', 0);
      }

      //?UPD18
      getExtraInfoData() {
        return this.newParser.getParam('ExtraDescriptions', []);
      }

      //?UPD18
      isThrowOutEnabled() {
        return this.newParser.getParam('AllowThrowOutSystem', true);
      }

      //?UPD18
      getThrowOutSettings() {
        return this.newParser.getParam('ThrowOutSettings', {
          enabled: true,
          margins: {
            x: 15,
            y: 350
          },
          startOpacity: 175,
          fadeOutSpeed: 5,
          throwOutSE: "Wind7"
        });
      }

      //u19
      isStaticDescPosition() {
        return this.newParser.getParam('StaticDescPosition', false);
      }

      //u19
      getStaticDescPosition() {
        return this.newParser.getParam('StaticDescPosXY', null);
      }

      //u19
      isCellLockSystemAllowed() {
        return this.newParser.getParam('UseLimitedCellsSystem', false);
      }

      //u19
      getCellLockVariableForItems() {
        return this.newParser.getParam('lcVariableItems', 1);
      }

      //u19
      getCellLockVariableForWeapons() {
        return this.newParser.getParam('lcVariableWeapons', 1);
      }

      //u19
      getCellLockVariableForArmors() {
        return this.newParser.getParam('lcVariableArmors', 1);
      }

      //u19
      isIgnoreLimitByGainItem() {
        return this.newParser.getParam('lsIgnoreLimitByGainItems', true);
      }

      //u20
      isShowItemNameWithQualityColor() {
        return this.newParser.getParam('QualitySystemColor', false);
      }

      
        //u20
      isShowItemNameWithQualityColorInWindows() {
        return this.newParser.getParam('QualitySystemColorWindows', false);
      }

      //u20
      isGamepadSupport() {
        return this.newParser.getParam('useGamepad', false);
      }

      //u20
      gpOpenCloseKey() {
        return this.newParser.getParam('gpOpenKey', 'Back');
      }

      //u20
      getExtraDescriptions() {
        return this.newParser.getParam('ExtraDescriptionsForStats', []);
      }

      //u21
      getTakeAllDelay() {
        return this.newParser.getParam('chestTakeAllDelay', 5);
      }

      //u22
      isUseNewCategoriesSystem() {
        return this.newParser.getParam('isNewCatSys', false);
      }

      //u22
      getNewCategoriesButtonImages() {
        return this.newParser.getParam('newCatSysButtons', {
          main: "inventoryCategoryBtn_00",
          hovered: "inventoryCategoryBtn_01",
          selected: "inventoryCategoryBtn_03"
        });
      }

      //u22
      getNewCategories() {
        return this.newParser.getParam('newCatSysItems', [
          {
            name: "Items",
            type: "items", //items, weapons, armors, note
            note: "", //any <iCat:CATEGORY>
            icon: "inventoryCategory_iconItems", //icon from img/pMapInventory
            iconMargins: {
              x: 0,
              y: 0
            },
            position: {
              x: 83,
              y: 17
            }
          },
          {
            name: "Weapons",
            type: "weapons", //items, weapons, armors, note
            note: "", //any <iCat:CATEGORY>
            icon: "inventoryCategory_iconWeapons", //icon from img/pMapInventory
            iconMargins: {
              x: 0,
              y: 0
            },
            position: {
              x: 109,
              y: 17
            }
          },
          {
            name: "Armors",
            type: "armors", //items, weapons, armors, note
            note: "", //any <iCat:CATEGORY>
            icon: "inventoryCategory_iconArmor", //icon from img/pMapInventory
            iconMargins: {
              x: 0,
              y: 0
            },
            position: {
              x: 135,
              y: 17
            }
          }
        ]);
      }

      //u22
      isNewItemSelectMode() {
        return this.newParser.getParam('isSelectItemToEvent', true);
      }

      //u23
      getForbiddenActorsForPartySelector() {
        return this.newParser.getParam('partySelectorFilter', []);
      }

      //u23
      isStrictUsecaseOnly() {
        return true; // * Пока всегда TRUE
      }

      //@newParser.getParam('partySelectorStrictItems', true)

        //u23
      isUseExtraOptionsMenu() {
        return this.newParser.getParam('isUseExtraOptionsMenu', false);
      }

      //u23
      getExtraOptions() {
        return this.newParser.getParam('getExtraMIOptions', []);
      }

      //u23
      getIsShowOuterItemsDesc() {
        return this.newParser.getParam('OIHotCellsShowDesc', true);
      }

      //u23
      getIsShowEXTDesc() {
        return this.newParser.getParam('extendedLootListShowDesc', true);
      }

      //u24
      isCloseOnlyByButton() {
        return this.newParser.getParam('isCloseOnlyByButton', false);
      }

      //u24
      getDropOutCommonEvent() {
        return this.newParser.getParam('dropOutCommonEvent', 0);
      }

      //u24
      isUseAltDescForStats() {
        return this.newParser.getParam('IsUseAltDescsForStats', false);
      }

      //u24
      getAltStatsSettings() {
        return this.newParser.getParam('altDescSettings', {
          isShowDefDescription: false,
          isShowExtraDesription: true,
          extraDescTitleText: "Description",
          extraDescTitleTextColor: "#b40dde",
          extraDescTitleStartY: 138,
          extraDescTextStartY: 114,
          isShowBasicStats: true,
          isShowExtraStats: false,
          extraStatsStartY: 200,
          helpersStartY: 128,
          descWindowNewHeight: 300
        });
      }

      //u24
      getOpenInvCE() {
        return this.newParser.getParam('ceOnInvOpen', 0);
      }

      //u24
      getCloseInvCE() {
        return this.newParser.getParam('ceOnInvClose', 0);
      }

      //u24
      getIsPauseGameOnInvIsOpened() {
        return this.newParser.getParam('isPauseGameWhenInvOpen', false);
      }

      //u24
      getIsUseLevelReqSystem() {
        return this.newParser.getParam('levelReqSystem', true);
      }

      //u24
      getLevelReqTextFormat() {
        return this.newParser.getParam('levelReqSystemTf', '[Level %1]');
      }

      //u24
      getLevelReqTextSettings() {
        return this.newParser.getParam('lvReqTextSettings', {
          visible: true,
          size: {
            w: 40,
            h: 16
          },
          alignment: "left",
          font: {
            face: "Arial",
            size: 14,
            italic: false
          },
          margins: {
            x: 224,
            y: 130
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#18afd9"
        });
      }

      //u25
      getHotCellsEx(index) {
        var group, hotCells;
        if (index <= 0 || (index == null)) {
          return this.getHotCells();
        }
        hotCells = this.newParser.getParam('OIHotCellsEx', []);
        group = hotCells[index - 1];
        if (group != null) {
          return group.OIHotCells;
        } else {
          return this.getHotCells();
        }
      }

      //?u25
      get_isDynamicStats() {
        return this.newParser.getParam('altDescDynamic', false);
      }

      //?u25
      get_DynamicStatsPosTable() {
        return this.newParser.getParam('altDescDynamicPositions', {
          position1: {
            statIconPosition: {
              x: 2,
              y: 0
            },
            statTextPosition: {
              x: 60,
              y: 0
            }
          },
          position2: {
            statIconPosition: {
              x: 2,
              y: 20
            },
            statTextPosition: {
              x: 60,
              y: 20
            }
          },
          position3: {
            statIconPosition: {
              x: 2,
              y: 40
            },
            statTextPosition: {
              x: 60,
              y: 40
            }
          },
          position4: {
            statIconPosition: {
              x: 2,
              y: 60
            },
            statTextPosition: {
              x: 60,
              y: 60
            }
          },
          position5: {
            statIconPosition: {
              x: 130,
              y: 0
            },
            statTextPosition: {
              x: 184,
              y: 0
            }
          },
          position6: {
            statIconPosition: {
              x: 130,
              y: 20
            },
            statTextPosition: {
              x: 184,
              y: 20
            }
          },
          position7: {
            statIconPosition: {
              x: 130,
              y: 40
            },
            statTextPosition: {
              x: 184,
              y: 40
            }
          },
          position8: {
            statIconPosition: {
              x: 130,
              y: 60
            },
            statTextPosition: {
              x: 184,
              y: 60
            }
          }
        });
      }

      //u26
      get_AlternativeDescriptionsList() {
        return this.newParser.getParam("altDescriptionsList", []);
      }

      //u26
      get_UserDisabledCellImage() {
        return this.newParser.getParam("userDisabledCellImage", "");
      }

      //u27
      get_IsEquippedWeightIncluded() {
        return this.newParser.getParam("wSystemEquipmentsIncluded", false);
      }

      //u27
      get_ShortStatsText() {
        return this.newParser.getParam("useShortStatsText", false);
      }

      //u27
      get_CustomHelpWindowBackground() {
        return this.newParser.getParam("customHelpWinBack", "");
      }

      //u27
      get_DisabledCellClickSE() {
        return this.newParser.getParam("disabledCellClickSe", "");
      }

      //u27
      get_IsUseQualityIconsPerTier() {
        return this.newParser.getParam("qualityIconsPerTier", false);
      }

      //u27
      get_IsShowQualityLevelImageBelowIcon() {
        return this.newParser.getParam("qualityLevelBelowIcon", false);
      }

      //u27
      get_IsShowUseOnlyImagePerActor() {
        return this.newParser.getParam("showUseOnlyImagePerActor", false);
      }

      //u27
      get_UseOnleImagePosition() {
        return this.newParser.getParam("useOnlyImagePerActorPos", {
          x: 196,
          y: 120
        });
      }

      //u27
      get_IsShowWhoEquipImage() {
        return this.newParser.getParam("showWhoEquipThisItem", false);
      }

      //u27
      get_WhoEquipImagePosition() {
        return this.newParser.getParam("whoEquipImagePos", {
          x: 0,
          y: 0
        });
      }

      //u27
      get_PartySelectorSettings() {
        return this.newParser.getParam("partySelectorVisualsSettings", {
          actorFaceSize: 46,
          actorFaceMargins: {
            x: 6,
            y: 6
          },
          equipIconSize: 20,
          moveDistance: 50,
          moveSpeed: 10,
          fadeOutSpeed: 25,
          fadeInSpeed: 50,
          backgroundLayerSize: {
            w: -1,
            h: -1
          },
          backgroundLayerOpacity: 200
        });
      }

      //u27
      get_HotCellsCustomIconSize() {
        return this.newParser.getParam("hotCellCustomIconSize", 0);
      }

      //u27
      get_IsNotUseExtraImgInHotCell() {
        return this.newParser.getParam("notUseExtraImgIconInHotCell", false);
      }

    };

    PKD_MI.register(Parameters);

    return Parameters;

  }).call(this);
})();

(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Parameters.prototype;
  _.get_MapInventoryAllowDrag = function() {
    return this.getBooleanFromCacheWithDefault('MapInventoryDrag', true);
  };
  _.get_MapInventorySortItems = function() {
    return this.getBooleanFromCacheWithDefault('MapInventorySortItems', true);
  };
  _.get_MapInventorySortEquips = function() {
    return this.getBooleanFromCacheWithDefault('MapInventorySortEquip', true);
  };
  _.get_ShowEquipedItemsInInventory = function() {
    return this.getBooleanFromCacheWithDefault('ShowEquipedItemsInInventory', true);
  };
  _.get_InventoryOpenKey = function() {
    return this.getStringFromCacheWithDefault('OpenMapInventoryKey', 'i');
  };
  _.get_ChestTakeAllKey = function() {
    return this.getStringFromCacheWithDefault('TakeAllChestKey', 't');
  };
  _.get_MapInventoryAllowPartySelect = function() {
    return this.getBooleanFromCacheWithDefault('AllowPartySelect', true);
  };
  _.get_AutoRefreshItems = function() {
    return this.getBooleanFromCacheWithDefault('AllowAutoRefreshUsable', true);
  };
  _.get_AllowUseStoredChestLikeStorage = function() {
    return this.getBooleanFromCacheWithDefault('AllowStoreInChest', true);
  };
  _.get_UseSlider = function() {
    return this.getBooleanFromCacheWithDefault('UseSlider', true);
  };
  _.get_UsedWSystem = function() {
    if (!PKD_MI.isPro()) {
      return false;
    } else {
      return this.getBooleanFromCacheWithDefault('UseWSystem', false);
    }
  };
  _.get_partyMaxWeighVar = function() {
    return this.getNumberFromCacheWithDefault('wSystemVariableId', 1);
  };
  _.get_WSAutoState = function() {
    return this.getNumberFromCacheWithDefault('wSystemAutoStateId', 0);
  };
  _.get_IsWSSlowDown = function() {
    return this.getBooleanFromCacheWithDefault('wSystemAllowSlowDown', true);
  };
  _.get_UseScreenButton = function() {
    return this.getBooleanFromCacheWithDefault('UseScreenButton', true);
  };
  _.get_AllowRareSystem = function() {
    return this.getBooleanFromCacheWithDefault('AllowRareItemSystem', true);
  };
  _.get_Allow8 = function() {
    return this.getBooleanFromCacheWithDefault('AllowNonBattlePartyMembers', false);
  };
  _.get_AllowEquipStats = function() {
    return this.getBooleanFromCacheWithDefault('AllowEquipsStats', true);
  };
  _.get_AllowFullStats = function() {
    return this.getBooleanFromCacheWithDefault('ShowFullEquipedStats', false);
  };
  //?UPDX
  _.get_UseOuterItems = function() {
    return this.getBooleanFromCacheWithDefault('AllowOuterItems', false);
  };
})();

PKD_MI.Parameters = new PKD_MI.LIBS.Parameters();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_MI.Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * PLUGIN PARAMETERS FOR VERSION 2.8 and above!

  //@[DEFINES]
  _ = PKD_MI.LIBS.Parameters.prototype;
  _.getOpenInvSE = function() {
    return this.newParser.getParam("seOnInvOpen", "");
  };
  _.getCloseInvSE = function() {
    return this.newParser.getParam("seOnInvClose", "");
  };
  _.getPartySelectorOpenSE = function() {
    return this.newParser.getParam("seOnPartySelectorAppears", "");
  };
  _.isRemoveHotCellItemIfZero = function() {
    return this.newParser.getParam("hotCellRemoveItemAtZero", false);
  };
  _.isShowDropOutSlider = function() {
    return this.newParser.getParam("isShowDropOutSlider", false);
  };
  _.isAllowAssignHotCellsByHotKeys = function() {
    return this.newParser.getParam("isAllowAssignHotCellsByHotKeys", false);
  };
  _.isDropOutToGround = function() {
    return this.newParser.getParam("isDropOutToGround", false);
  };
  _.isDropOutViaThrowOutBox = function() {
    return this.newParser.getParam("isDropOutViaThrowOutBox", false);
  };
  _.isCloseInventoryWithTakeAll = function() {
    return this.newParser.getParam("isCloseInventoryWithTakeAll", false);
  };
})();

// ■ END PKD_MI.Parameters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //u19
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    // * Не успевают eval выполнить
    PKD_MI.Parameters = new PKD_MI.LIBS.Parameters();
    return PKD_MI.ApplyPluginsExtensions();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__isMenuCalled, ALIAS__onMapLoaded, ALIAS__processMapTouch, ALIAS__stop, ALIAS__update, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    this._createInvUILayer();
    PKD_MI.registerExtraMethods();
    if (PKD_MI.isPro()) {
      return RefreshWeightSystem();
    }
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    var e, ref;
    ALIAS__stop.call(this);
    PKD_MI.closeExternalDescriptionWindow();
    try {
      if ((ref = this._spritesetIUI) != null) {
        ref.terminate();
      }
      this.removeChild(this._spritesetIUI);
      PKD_MI.setUI(null);
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
  //u20
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    this._miWeightCheckTimer = 30;
  };
  
  //@[ALIAS]
  ALIAS__processMapTouch = _.processMapTouch;
  _.processMapTouch = function() {
    if (PKD_MI.isProcessEUITouch()) {
      return;
    }
    return ALIAS__processMapTouch.call(this);
  };
  
  //?UPD18, 26
  //@[ALIAS]
  ALIAS__isMenuCalled = _.isMenuCalled;
  _.isMenuCalled = function() {
    if (Input.isTriggered('menu')) {
      if (PKD_MI.isSomeIsOpen() && !PKD_MI.Parameters.isCloseOnlyByButton()) {
        PKD_MI.closeSome();
        return false;
      }
    }
    if (TouchInput.isCancelled()) {
      if (PKD_MI.isCellUnderRightClick()) {
        return false;
      } else if (PKD_MI.isSomeIsOpen() && !PKD_MI.Parameters.isCloseOnlyByButton()) {
        PKD_MI.closeSome();
        return false;
      }
    }
    return ALIAS__isMenuCalled.call(this);
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    return this._updateMIWSystemTimer();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _._createInvUILayer = function() {
    var e;
    try {
      this._spritesetIUI = new Spriteset_InvUI();
      PKD_MI.setUI(this._spritesetIUI);
      this.addChild(this._spritesetIUI);
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
  
  //u20
  _._updateMIWSystemTimer = function() {
    this._miWeightCheckTimer--;
    if (PKD_MI.isInventoryOpened()) {
      this._miWeightCheckTimer -= 2;
    }
    if (this._miWeightCheckTimer <= 0) {
      this._miWeightCheckTimer = 120;
      return $gameParty.refreshMaxWeightCapacity();
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Title.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__create, _;
  //@[DEFINES]
  _ = Scene_Title.prototype;
  //@[ALIAS]
  ALIAS__create = _.create;
  _.create = function() {
    var e;
    try {
      PKD_MI.setUI(null);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return ALIAS__create.call(this, ...arguments);
  };
})();

// ■ END Scene_Title.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SliderController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SliderController;
  SliderController = class SliderController {
    constructor(contentSprite, type) {
      var mA, mB;
      this.contentSprite = contentSprite;
      if (type === 0) {
        mA = PKD_MI.onSliderOkClick;
        mB = PKD_MI.onSliderValueChanged;
      } else if (type === 1) {
        mA = PKD_MI.onSliderChestOkClick;
        mB = PKD_MI.onSliderChestValueChanged;
      } else if (type === 2) {
        mA = PKD_MI.onSliderDropOutOkClick;
        mB = PKD_MI.onSliderDropOutValueChanged;
      }
      this.contentSprite.createSlider(mA, mB);
    }

    close() {
      return this.terminate();
    }

    terminate() {
      var e, ref, ref1;
      try {
        if ((ref = this.contentSprite) != null) {
          ref.destroySlider();
        }
        return (ref1 = this.contentSprite) != null ? ref1.clearFocus() : void 0;
      } catch (error) {
        e = error;
        return console.warn(e);
      }
    }

  };
  PKD_MI.register(SliderController);
})();

// ■ END SliderController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ColorGauge.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_ColorGauge;
  Sprite_ColorGauge = class Sprite_ColorGauge extends KDCore.Sprite {
    constructor(settings) {
      super();
      this.settings = settings;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._createFill();
      this._createForeground();
      return this.visible = this.settings.visible;
    }

    _loadSettings() {
      return this.moveByJson(this.settings);
    }

    _createBackground() {
      this.bitmap = new Bitmap(this.settings.width, this.settings.height);
      this._background = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this._background.fillAll(KDCore.Color.FromHex(this.settings.backgroundColor));
      this._background.opacity = this.settings.backgroundOpacity;
      return this.add(this._background);
    }

    _createFill() {
      this._fillImg = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this._fillImg.b().fillAll(KDCore.Color.FromHex(this.settings.fillColor));
      this._fill = KDCore.Sprite.FromBitmap(this.settings.width, this.settings.height);
      this.add(this._fill);
      return this.drawGauge();
    }

    drawGauge(percent = 1) {
      var w;
      if (this._fill == null) {
        return;
      }
      this._fill.clear();
      w = this.settings.width * percent;
      return this._fill.b().blt(this._fillImg.b(), 0, 0, w, this.settings.height, 0, 0);
    }

    _createForeground() {
      if (this.settings.foregroundImg != null) {
        this._foreground = PKD_MI.FromImgI(this.settings.foregroundImg);
        return this.add(this._foreground);
      }
    }

  };
  PKD_MI.register(Sprite_ColorGauge);
})();

// ■ END Sprite_ColorGauge.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ GSprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var GSprite;
  GSprite = class GSprite extends KDCore.Sprite {
    constructor() {
      super(...arguments);
    }

  };
  PKD_MI.register(GSprite);
})();

(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.GSprite.prototype;
  // * ==============================================

  // * Исчезнуть
  _.fadeIn = function(sp) {
    this._fadeMode = 0;
    this._fadeStep = sp;
    return this._fadeTimer = new KDCore.TimedUpdate(2, this._onFadeTick.bind(this));
  };
  // * Появление
  _.fadeOut = function(sp) {
    this._fadeMode = 1;
    this._fadeStep = sp;
    return this._fadeTimer = new KDCore.TimedUpdate(2, this._onFadeTick.bind(this));
  };
  _._onFadeTick = function() {
    if (this._fadeMode === 0) {
      this.opacity -= this._fadeStep;
      if (this.opacity <= 0) {
        return this._fadeTimer.stop();
      }
    } else {
      this.opacity += this._fadeStep;
      if (this.opacity >= 255) {
        return this._fadeTimer.stop();
      }
    }
  };
  // * ==============================================

  // * Движение
  _.startMove = function(direction, speed, distance) {
    this._moveDirection = direction;
    this._moveSpeed = speed;
    this._moveDistance = distance;
    return this._moveTimer = new KDCore.TimedUpdate(2, this._onMoveTick.bind(this));
  };
  _._onMoveTick = function() {
    switch (this._moveDirection) {
      case 0: // * LEFT
        this.x -= this._moveSpeed;
        break;
      case 1: // * UP
        this.y -= this._moveSpeed;
        break;
      case 2: // * RIGHT
        this.x += this._moveSpeed;
        break;
      case 3: // * DOWN
        this.y += this._moveSpeed;
        break;
      case 4: // * LEFT AND UP
        this.x -= this._moveSpeed;
        this.y -= this._moveSpeed;
        break;
      case 5: // * LEFT AND DOWN
        this.x -= this._moveSpeed;
        this.y += this._moveSpeed;
        break;
      case 6: // * RIGHT AND UP
        this.x += this._moveSpeed;
        this.y -= this._moveSpeed;
        break;
      case 7: // * RIGHT AND DOWN
        this.x += this._moveSpeed;
        this.y += this._moveSpeed;
    }
    this._moveDistance -= this._moveSpeed;
    if (this.isOutOfDistance()) {
      return this._moveTimer.stop();
    }
  };
  _.isOutOfDistance = function() {
    return this._moveDistance <= 0;
  };
  // * ==============================================
  _.update = function() {
    Sprite.prototype.update.call(this);
    if (this._fadeTimer != null) {
      this._fadeTimer.update();
    }
    if (this._moveTimer != null) {
      //@_shakeTimer.update() if @_shakeTimer?
      //@_shakeTimer2.update() if @_shakeTimer2?
      return this._moveTimer.update();
    }
  };
})();

// ■ END GSprite.coffee
//---------------------------------------------------------------------------
//@_pulseTimer.update() if @_pulseTimer?


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ItemExtraInfo.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_ItemExtraInfo;
  Sprite_ItemExtraInfo = class Sprite_ItemExtraInfo extends KDCore.Sprite {
    constructor(extraInfo) {
      super();
      this.extraInfo = extraInfo;
      this._extraInfoText = this._prepareDescriptionText(this.extraInfo.info.text);
      this._createContent();
    }

    _prepareDescriptionText(text) {
      text = text.replaceAll("\"", "");
      text = text.replaceAll("\\\\", "\\");
      text = text.replace(/\\n+/g, ' ');
      return text;
    }

    _createContent() {
      this._createInfoBlock();
      if (String.any(this.extraInfo.picture.imgName)) {
        return this._creactePictureBlock();
      }
    }

    _createInfoBlock() {
      var s;
      s = this.extraInfo.info;
      this.textBack = new PKD_MI.LIBS.Sprite_TilingFrame(s.size.w, s.size.h, 'ExtraInfoFrame');
      this.addChild(this.textBack);
      this.textBack.move(s.position);
      this._createText();
      return this._drawText();
    }

    _createText() {
      var resetFont, s;
      s = this.extraInfo.info;
      if (KDCore.isMV()) {
        this._description = new Window_Base(0, 0, s.size.w, s.size.h);
      } else {
        this._description = new Window_Base(new PIXI.Rectangle(0, 0, s.size.w, s.size.h));
      }
      resetFont = function() {
        if (String.any(s.font.face)) {
          this.contents.fontFace = s.font.face;
        }
        this.contents.fontSize = s.font.size;
        this.contents.fontItalic = s.font.italic;
        this.resetTextColor();
      };
      this._description.resetFontSettings = resetFont.bind(this._description);
      this._description.setBackgroundType(2);
      return this.textBack.addChild(this._description);
    }

    _drawText() {
      this._description.contents.clear();
      this._description.resetFontSettings();
      return this._description.drawTextExWithWordWrap(this._extraInfoText, 0, 0, this.extraInfo.info.size.w - 10);
    }

    _creactePictureBlock() {
      var s;
      s = this.extraInfo.picture;
      this.picBack = new PKD_MI.LIBS.Sprite_TilingFrame(s.size.w, s.size.h, 'ExtraInfoFrame');
      this.addChild(this.picBack);
      this.picBack.move(s.position);
      return KDCore.Utils.loadImageAsync('pictures', s.imgName).then(this._drawPicture.bind(this));
    }

    _drawPicture(sBitmap) {
      var imgSpr, s;
      s = this.extraInfo.picture.size;
      imgSpr = KDCore.Sprite.FromBitmap(s.w, s.h);
      imgSpr.bitmap.drawOnMe(sBitmap, 4, 4, s.w - 8, s.h - 8);
      this.picBack.content.addChild(imgSpr);
    }

  };
  PKD_MI.register(Sprite_ItemExtraInfo);
})();

// ■ END Sprite_ItemExtraInfo.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryActorCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryActorCell;
  Sprite_MapInventoryActorCell = class Sprite_MapInventoryActorCell extends PKD_MI.LIBS.GSprite {
    constructor() {
      super();
      this._init();
      this._create();
      if (!PKD_MI.Parameters.isCustomSizeCells()) {
        this.move(-11, -11);
      }
      this.opacity = 0;
    }

    _mySettings() {
      return PKD_MI.Parameters.get_PartySelectorSettings();
    }

    _init() {
      var s;
      s = this._mySettings();
      this._moveDistance = s.moveDistance;
      this._moveSpeed = s.moveSpeed;
      this._fadeOutSpeed = s.fadeOutSpeed;
      return this._fadeInSpeed = s.fadeInSpeed;
    }

    _create() {
      this._loadSettings();
      this._loadImages();
      this._createCell();
      this._createActorFaceSpr();
      return this._createDisableLayer();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _loadImages() {
      return this._imgs0 = [ImageManager.loadPKDMI("partySlot_00"), ImageManager.loadPKDMI("partySlot_01"), ImageManager.loadPKDMI("partySlot_00"), ImageManager.loadPKDMI("partySlot_00")];
    }

    _createCell() {
      this._cell = new KDCore.Button();
      this._cell.setButtonImages(...this._imgs0);
      return this.add(this._cell);
    }

    _createActorFaceSpr() {
      var actorFaceMargins, actorFaceSize;
      ({actorFaceSize, actorFaceMargins} = this._mySettings());
      this.actorFaceSpr = KDCore.Sprite.FromBitmap(actorFaceSize, actorFaceSize);
      this.actorFaceSpr.move(actorFaceMargins.x, actorFaceMargins.y);
      //@actorFaceSpr.bitmap.fillAll KDCore.Color.RED
      return this.addChild(this.actorFaceSpr);
    }

    _createDisableLayer() {
      var actorFaceMargins, actorFaceSize;
      ({actorFaceSize, actorFaceMargins} = this._mySettings());
      this.disableLayer = KDCore.Sprite.FromBitmap(actorFaceSize, actorFaceSize);
      this.disableLayer.bitmap.fillAll(KDCore.Color.BLACK);
      this.disableLayer.opacity = 200;
      this.disableLayer.move(actorFaceMargins.x, actorFaceMargins.y);
      this.disableLayer.visible = false;
      return this.addChild(this.disableLayer);
    }

    disable() {
      var ref;
      this.disableLayer.visible = true;
      //@actorFaceSpr.opacity = 200
      this._cell._clickHandlers = [];
      this._cell.addClickHandler(function() {
        return SoundManager.playBuzzer();
      });
      return (ref = this.iconSpr) != null ? ref.visible = false : void 0;
    }

    //g.visible = false for g in @gaugeitems

      //u20
    isDisabled() {
      return this.disableLayer.visible === true;
    }

    setActor(actor1) {
      var item;
      this.actor = actor1;
      this.drawActorFace();
      this.registerClick();
      item = $gameTemp._tempItemForParty;
      if (item == null) {
        return;
      }
      if (DataManager.isItem(item)) {
        return this.drawGauges(item);
      } else if (!DataManager.isSkill(item)) {
        return this.drawEquipedIcon(item);
      }
    }

    drawActorFace() {
      var fIndex, tBitmap;
      tBitmap = ImageManager.loadFace(this.actor.faceName());
      fIndex = this.actor.faceIndex();
      tBitmap.addLoadListener(() => {
        var ph, pw, sx, sy;
        if (KDCore.isMV()) {
          pw = Window_Base._faceWidth;
          ph = Window_Base._faceHeight;
        } else {
          pw = ImageManager.faceWidth;
          ph = ImageManager.faceHeight;
        }
        sx = fIndex % 4 * pw;
        sy = Math.floor(fIndex / 4) * ph;
        return this.actorFaceSpr.bitmap.blt(tBitmap, sx, sy, pw, ph, 0, 0, this.actorFaceSpr.width, this.actorFaceSpr.height);
      });
    }

    drawGauges(item) {
      return this.gaugeitems = [];
    }

    drawEquipedIcon(item) {
      var e, equippedOne, etype, extraIcon, i, len, ref;
      try {
        etype = item.etypeId;
        equippedOne = null;
        ref = this.actor.equips();
        for (i = 0, len = ref.length; i < len; i++) {
          e = ref[i];
          if ((e != null) && e.etypeId === item.etypeId) {
            equippedOne = e;
            break;
          }
        }
        if (equippedOne != null) {
          extraIcon = DataManager.getItemInvImage(equippedOne);
          if (String.any(extraIcon)) {
            return this._drawEquipIcon(ImageManager.loadPKDMI_Icon(extraIcon), true);
          } else {
            return this._drawEquipIcon(equippedOne.iconIndex);
          }
        } else {
          return this._drawEquipIcon(this.settings.partySelectorEquipIcons.nothingEquippedIcon);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _drawEquipIcon(iconIndex, withBack) {
      var equipIconSize, s;
      s = this.settings.partySelectorEquipIcons;
      ({equipIconSize} = this._mySettings());
      this.iconSpr = KDCore.Sprite.FromBitmap(equipIconSize);
      if (withBack === true) {
        this.iconSpr.drawIcon(0, 0, s.nothingEquippedIcon, equipIconSize);
      }
      this.iconSpr.drawIcon(0, 0, iconIndex, equipIconSize);
      this.iconSpr.move(s.marginX, s.marginY);
      //if @actor == $gameParty.leader()
      //    @iconSpr.move 0, s.marginY
      return this.addChild(this.iconSpr);
    }

    moveUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(1, this._moveSpeed, this._moveDistance);
    }

    moveLeft() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(0, this._moveSpeed, this._moveDistance);
    }

    moveRight() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(2, this._moveSpeed, this._moveDistance);
    }

    moveDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(3, this._moveSpeed, this._moveDistance);
    }

    moveLeftAndUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(4, this._moveSpeed, this._moveDistance + 1);
    }

    moveLeftAndDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(5, this._moveSpeed, this._moveDistance + 1);
    }

    moveRightAndUp() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(6, this._moveSpeed, this._moveDistance + 1);
    }

    moveRightAndDown() {
      this.fadeOut(this._fadeOutSpeed);
      return this.startMove(7, this._moveSpeed, this._moveDistance + 1);
    }

    close() {
      return this.fadeIn(this._fadeInSpeed);
    }

    registerClick() {
      var actor;
      this._cell._clickHandlers = [];
      actor = this.actor;
      this._cell.addClickHandler(function() {
        return PKD_MI.onInvPartyCellClick(actor);
      });
    }

    isHovered() {
      return this._cell.isMouseInButton();
    }

  };
  PKD_MI.register(Sprite_MapInventoryActorCell);
})();

// ■ END Sprite_MapInventoryActorCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvCell;
  //?u20
  //?UPD18
  Sprite_MapInvCell = class Sprite_MapInvCell extends KDCore.Sprite {
    constructor(index1, isLockSupportType = false) {
      super();
      this.index = index1;
      this.isLockSupportType = isLockSupportType;
      this._inSpecialState = false;
      this._isEquipedItem = false;
      this._isFavWeapon = false;
      this._isChestItem = false;
      this._pressTimer = 0; //?line
      this.isHotCell = false; //?line
      this.gpIndex = -1; //u20
      this._create();
    }

    //?UPD18
    isLocked() {
      var ref;
      return ((ref = this._lockCellSpr) != null ? ref.visible : void 0) === true;
    }

    //?UPD18
    _create() {
      this._loadSettings();
      this._iconSprPlace = new Sprite();
      this._loadImages();
      this._createCell();
      this.add(this._iconSprPlace);
      //@_createIconSpr()
      this._createQualityLevelSpr();
      this._createSpecial();
      this._createCountText();
      this._createLockCellSprite();
      return this._createFader();
    }

    _loadSettings() {
      this.settings = this._settingsJSON();
      this.customCellParams = null;
      if (PKD_MI.Parameters.isCustomSizeCells()) {
        this.customCellParams = PKD_MI.Parameters.getCustomSizeCellsParameters();
      }
    }

    _loadImages() {
      // * Нужен для размеров
      this.slotBitmap = ImageManager.loadPKDMI("InventorySlot_00");
      this.slotBitmap.addLoadListener(this._createIconSpr.bind(this));
      this._imgs0 = [this.slotBitmap, ImageManager.loadPKDMI("InventorySlot_01"), ImageManager.loadPKDMI("InventorySlot_00"), ImageManager.loadPKDMI("InventorySlot_00")]; // * Default
      this._imgs2 = [ImageManager.loadPKDMI("InventorySlotB_00"), ImageManager.loadPKDMI("InventorySlotB_01"), ImageManager.loadPKDMI("InventorySlotB_00"), ImageManager.loadPKDMI("InventorySlotB_00")]; // * Equipment state
      this._imgs3 = [ImageManager.loadPKDMI("InventorySlotC_00"), ImageManager.loadPKDMI("InventorySlotC_01"), ImageManager.loadPKDMI("InventorySlotC_00"), ImageManager.loadPKDMI("InventorySlotC_00")]; // * FOCUS (and gamepad)
    }

    _createCell() {
      this._cell = new KDCore.Button();
      this._cell.setButtonImages(...this._imgs0);
      return this.add(this._cell);
    }

    _createIconSpr() {
      if (this.customCellParams != null) {
        this._iconSpr = this._createCustomIconSpr();
      } else {
        this._iconSpr = KDCore.Sprite.FromBitmap(30, 30);
        this._iconSpr.move(4, 4);
      }
      this._iconSprPlace.addChild(this._iconSpr);
      if (this.item != null) {
        return this.drawIconExt(this.item.iconIndex);
      }
    }

    _createCustomIconSpr() {
      var h, iconSpr, w;
      if (this.customCellParams.iconMode === 0) {
        iconSpr = KDCore.Sprite.FromBitmap(32);
        w = this.slotBitmap.width;
        h = this.slotBitmap.height;
        iconSpr.anchor.x = 0.5;
        iconSpr.anchor.y = 0.5;
        iconSpr.x = w / 2;
        iconSpr.y = h / 2;
      } else {
        iconSpr = KDCore.Sprite.FromBitmap(this.customCellParams.iconSize);
        iconSpr.move(4, 4);
      }
      return iconSpr;
    }

    _createQualityLevelSpr() {
      if (!PKD_MI.Parameters.get_AllowRareSystem()) {
        return;
      }
      this._rareSpr = new Sprite();
      if (PKD_MI.Parameters.get_IsShowQualityLevelImageBelowIcon()) {
        this._iconSprPlace.addChildAt(this._rareSpr, 0);
      } else {
        this.add(this._rareSpr);
      }
    }

    _createSpecial() {
      this._createSpecialSpr();
      this._createSpecialText();
      if (PKD_MI.Parameters.get_IsShowWhoEquipImage()) {
        this._createSpecialActorWhoEquips();
      }
    }

    _createSpecialSpr() {
      this._specialSpr = PKD_MI.FromImgI("InventorySlotA");
      this._specialSpr.move(KDCore.Utils.jsonPos(this.settings.invCellCornerPosition));
      this._specialSpr.visible = false;
      return this.add(this._specialSpr);
    }

    _createSpecialText() {
      this._specialSprText = KDCore.Sprite.FromBitmap(this.settings.cellItemSpecialText.textBoxWidth, this.settings.cellItemSpecialText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._specialSprText, this.settings.cellItemSpecialText);
      this._specialSpr.add(this._specialSprText);
    }

    _createSpecialActorWhoEquips() {
      var e, pos;
      try {
        this._specialActorWhoEquipsSpr = new Sprite();
        pos = PKD_MI.Parameters.get_WhoEquipImagePosition();
        this._specialActorWhoEquipsSpr.move(pos);
        this._specialActorWhoEquipsSpr.visible = false;
        return this.add(this._specialActorWhoEquipsSpr);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createCountText() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.cellItemCountText.textBoxWidth, this.settings.cellItemCountText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.cellItemCountText);
      this.add(this._textSpr);
    }

    //?UPD18
    //?u20
    //@drawCount 4
    setItem(item1) {
      this.item = item1;
      if ((this.item != null) && !this.isLocked()) {
        this.drawIconExt();
        this.drawQualityLevel(DataManager.getItemQualityLevel(this.item));
        this.drawCount($gameParty.numItems(this.item));
        this.refreshSpecialState();
        this.registerClick();
      } else {
        this.clear();
      }
      if (PKD_MI.IsGamepad()) {
        this.refreshGPState();
      }
    }

    drawIconExt() {
      var extraImg;
      extraImg = DataManager.getItemInvImage(this.item);
      if (String.any(extraImg)) {
        this.drawIcon(ImageManager.loadPKDMI_Icon(extraImg));
      } else {
        this.drawIcon(this.item.iconIndex);
      }
    }

    //u22
    refreshSpecialState() {
      if (this.item == null) {
        return;
      }
      this._checkUsableThread = null;
      if ($gameTemp._miInvenotryPickActive === true) {
        this._onCheckUsabelOnItemPickToEvent();
        return;
      }
      if (DataManager.isItem(this.item)) {
        return this._refreshItemState();
      } else {
        return this._refreshEquipmentState();
      }
    }

    //?UPD18
    _refreshItemState() {
      var notAllowedOccasion;
      if (this.isLocked()) {
        this.disableItem();
      }
      notAllowedOccasion = 1; // * BATTLE SCREEN
      if (this.item.occasion === notAllowedOccasion) {
        this.disableItem();
      }
      if (this.isEnabled()) {
        return this._checkUsable();
      }
    }

    setGPIndex(_gx, _gy) {
      this._gx = _gx;
      this._gy = _gy;
    }

    //u20
    refreshGPState() {
      var c, params, r;
      if (this._gx == null) {
        return;
      }
      if (this._gy == null) {
        return;
      }
      params = PKD_MI.Parameters.getCustomSizeCellsParameters();
      r = params.rowsPerPage;
      c = params.columnsPerPage;
      //TODO: Тут возможно надо r
      this.gpIndex = this._gy * c + this._gx;
      if (this.gpIndex === this.index) {
        this._applyItemSpecialStateGP();
      }
    }

    disableItem() {
      return this._fader.visible = true;
    }

    //u20
    _applyItemSpecialStateGP() {
      this._inSpecialStateGP = true;
      this.drawFocusFrame(); // * same as focused
    }

    _refreshEquipmentState() {
      var actor, canEquip, e, equippedAlready, equips, i, j, k, len, ref, results;
      try {
        if (PKD_MI.isPartyInventoryAllowed()) {
          // * Чтобы одна и таже вещь на разных показывалась
          this.whoCanEquip = [];
          this.whoCanUnEquip = [];
          ref = PKD_MI.partyGroup();
          for (k = 0, len = ref.length; k < len; k++) {
            actor = ref[k];
            if (this.whoCanUnEquip.length === 0) {
              this._refreshEquipmentStateForActor(actor);
            }
          }
          if (this.whoCanEquip.length === 0 && this.whoCanUnEquip.length === 0) {
            // * Если предмет не экиперован и никто не может экиперовать, отключить
            this.disableItem();
          }
          if (this.isEnabled()) { // * Метод из версии 1.0
            return this._checkEquipmentsUsable();
          }
        } else {
          // * DISABLE IF CANNOT EQUIP
          canEquip = $gameParty.leader().canEquip(this.item);
          if (!canEquip) {
            this.disableItem();
          }
          equips = $gameParty.leader().equips();
          results = [];
          for (i in equips) {
            j = equips[i];
            if (j === this.item) {
              equippedAlready = this._getUnequipCandidtaes()[this.item.id];
              if (equippedAlready != null) {
                continue;
              }
              this._setCandidateForUnequip($gameParty.leader().actorId());
              this._isEquipedItem = true;
              results.push(this._applyEquipmenSpecialState());
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _applyEquipmenSpecialState() {
      this._applyEquipmentSpecialCellState();
      this._specialSprText.clear();
      this._specialSprText.drawTextFull(this.settings.cellEquipmentSymbol, this.settings.cellItemSpecialText.position);
      if (this._inSpecialState) {
        return this.drawCount(1);
      } else {
        return this.drawCount($gameParty.numItems(this.item));
      }
    }

    _applyEquipmentSpecialCellState() {
      this._inSpecialState = true;
      this._cell.setButtonImages(...this._imgs2);
      this._specialSpr.bitmap = ImageManager.loadPKDMI('InventorySlotB');
      this._specialSpr.visible = true;
      if (PKD_MI.Parameters.get_IsShowWhoEquipImage()) {
        this._applyActorEquippedStateImage();
      }
    }

    _applyActorEquippedStateImage() {
      var actorId, imageName;
      imageName = "InventorySlotB_Actor_";
      actorId = $gameParty.miGetWhoIsEquipped(this.item);
      if (actorId <= 0) {
        return;
      }
      this._specialActorWhoEquipsSpr.bitmap = ImageManager.loadPKDMI(imageName + actorId);
      this._specialActorWhoEquipsSpr.visible = true;
    }

    registerClick() {
      var index;
      //if @isEnabled()
      this._cell._clickHandlers = [];
      index = this.index;
      this._cell.addClickHandler(function() {
        return PKD_MI.onInvCellClick(index);
      });
    }

    //else
    //    @_cell._clickHandlers = []
    clear() {
      this.item = null;
      this._checkUsableThread = null;
      this._isEquipedItem = false;
      this._isFavWeapon = false;
      this._fader.visible = false;
      this._isChestItem = false;
      this._cell._clickHandlers = [];
      this._clearSpeacialState();
      this.drawCount(0);
      this.drawIcon(0);
      this.drawQualityLevel(-1);
    }

    //u20
    _clearSpeacialState() {
      var ref;
      if (this._inSpecialState === true || this._inSpecialStateGP === true) {
        this._cell.setButtonImages(...this._imgs0);
        this._specialSpr.visible = false;
        if ((ref = this._specialActorWhoEquipsSpr) != null) {
          ref.visible = false;
        }
      }
      this._inSpecialState = false;
      this._inSpecialStateGP = false;
    }

    drawCount(count) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      //@_textSpr.bitmap.fillAll KDCore.Color.RED
      if (count > 1) {
        return this._textSpr.drawTextFull(count, this.settings.cellItemCountText.position);
      }
    }

    drawIcon(iconIndex) {
      if (this._iconSpr == null) {
        return;
      }
      this._iconSpr.clear();
      if (iconIndex instanceof Bitmap || iconIndex > 0) {
        if (iconIndex instanceof Bitmap && !iconIndex.isReady()) {
          iconIndex.addLoadListener(() => {
            return this.drawIcon(iconIndex);
          });
        }
        this._drawIconBody(iconIndex);
      }
    }

    _drawIconBody(iconIndex) {
      var e;
      try {
        if (this.customCellParams != null) {
          if (this.customCellParams.iconMode === 0) {
            return this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, 32);
          } else {
            return this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, this.slotBitmap.width - 8);
          }
        } else {
          return this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, 30);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    drawQualityLevel(level) {
      if (this._rareSpr == null) {
        return;
      }
      if (level < 0) {
        this._rareSpr.bitmap = new Bitmap(1, 1);
        return;
      }
      this._rareSpr.bitmap = ImageManager.loadPKDMI('QualityLevel_' + level);
    }

    //u20
    isHovered() {
      return this._cell.isMouseInButton() || this.gpIndex === this.index;
    }

    isEnabled() {
      return this._fader.visible === false;
    }

    _createFader() {
      var faderImageName;
      if (String.any(PKD_MI.Parameters.get_UserDisabledCellImage())) {
        faderImageName = PKD_MI.Parameters.get_UserDisabledCellImage();
        this._fader = new KDCore.Sprite(ImageManager.loadPKDMI(faderImageName));
      } else {
        if (this.customCellParams != null) {
          this._fader = KDCore.Sprite.FromBitmap(this.customCellParams.iconSize);
        } else {
          this._fader = KDCore.Sprite.FromBitmap(30, 30);
        }
        this._fader.bitmap.fillAll(KDCore.Color.BLACK);
        this._fader.opacity = 120;
        this._fader.move(4, 4);
      }
      this._fader.visible = false;
      return this.add(this._fader);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    isCanBeUnEquiped() {
      return this._inSpecialState === true && this._isEquipedItem === true;
    }

    
      //u20
    setChestItem(item) {
      var iCount;
      if (PKD_MI.IsGamepad()) {
        this.refreshGPState();
      }
      if (item == null) {
        return;
      }
      this.item = item[0];
      if (PKD_MI.isGoldItem(this.item)) {
        iCount = $gameTemp.__visualChestGoldCount;
        $gameTemp.__visualChestGoldCell = this;
      } else {
        iCount = item[1];
      }
      if ((this.item != null) && (iCount != null)) {
        this.drawIconExt();
        this.drawCount(iCount);
        this.drawQualityLevel(DataManager.getItemQualityLevel(this.item));
        this.registerClickForChest();
        this._isChestItem = true;
      } else {
        this.clear();
      }
    }

    registerClickForChest() {
      var index;
      index = this.index;
      return this._cell.addClickHandler(function() {
        return PKD_MI.onChestCellClick(index);
      });
    }

    
      //?UPDX
    update() {
      var ref;
      KDCore.Sprite.prototype.update.call(this);
      if ((ref = this._checkUsableThread) != null) {
        ref.update();
      }
      if ($gameTemp._pkdMICellMoving === true) {
        return;
      }
      if (TouchInput.isPressed() && this.isHovered()) {
        if (this.item == null) {
          return;
        }
        this._pressTimer++;
        if (this._pressTimer >= 10) {
          return this.startMovingCell();
        }
      } else {
        return this._pressTimer = 0;
      }
    }

    //?UPDX, #?UPD18 #?UPD21
    startMovingCell() {
      if (this._isChestItem === true) {
        return;
      }
      // * Теперь перетаскивание работает если подключён плагин ABSZ (даже если опции отключены)
      if (Imported.Alpha_ABSZ !== true) {
        if (!PKD_MI.Parameters.get_UseOuterItems() && !PKD_MI.Parameters.isThrowOutEnabled()) {
          return;
        }
      }
      if ($gameTemp._pkdMICellFocused === true) {
        return;
      }
      $gameTemp._pkdMIHotCellMoving = -1;
      $gameTemp._pkdMIMovedCellRef = this;
      return PKD_MI.startMoveCell(this.item);
    }

    _createLockCellSprite() {
      this._lockCellSpr = new Sprite(ImageManager.loadPKDMI("InventorySlot_locked"));
      this._lockCellSpr.visible = false;
      return this.addChild(this._lockCellSpr);
    }

    //?u19
    //?VERSION
    prepareForCategory(categoryIndex) { // * NOTHING
      this.categoryIndex = categoryIndex;
    }

  };
  PKD_MI.register(Sprite_MapInvCell);
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryStatText.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryStatText;
  Sprite_MapInventoryStatText = class Sprite_MapInventoryStatText extends KDCore.Sprite {
    constructor(statId, cell) {
      super();
      this.statId = statId;
      this.cell = cell;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createContent();
      return this._drawValues();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createContent() {
      this.baseTextLine = KDCore.Sprite.FromTextSettings(this.settings.EquipmentStats.statText);
      //@baseTextLine.fillAll(KDCore.Color.RED)
      return this.addChild(this.baseTextLine);
    }

    _drawValues() {
      var actor, item;
      item = this.cell.item;
      if (PKD_MI.partyGroup().length === 1 || !PKD_MI.isPartyInventoryAllowed()) {
        return this._drawStateValueForActor($gameParty.leader());
      } else {
        if (this.isEquipped() && (this.cell.whoCanEquip.last() != null)) {
          actor = $gameActors.actor(this.cell.whoCanEquip.last());
          return this._drawStateValueForActor(actor);
        } else {
          if (this.cell.whoCanEquip != null) {
            actor = $gameActors.actor(this.cell.whoCanEquip.first());
            if (actor != null) {
              return this._drawStateValueForActor(actor);
            } else {
              return this._drawEquipValue();
            }
          } else {
            return this._drawEquipValue(); // * CHESTS
          }
        }
      }
    }

    _drawStateValueForActor(actor) {
      if (this.isEquipped()) {
        if (PKD_MI.Parameters.get_AllowFullStats()) {
          return this._drawStateValue(actor[this.statId], 'normal');
        } else {
          return this._drawEquipValue();
        }
      } else {
        return this._drawStateDiffValue(actor);
      }
    }

    _drawStateValue(value, colorType) {
      this.baseTextLine.b().textColor = this.getColorHex(colorType);
      return this.baseTextLine.drawTextFull(value, 'center');
    }

    _drawEquipValue() {
      var paramId, type, value;
      paramId = this.paramValueId();
      if (paramId >= 0) {
        value = this.cell.item.params[paramId];
      } else {
        value = 0;
      }
      type = 'normal';
      //if value < 0
      //    type = 'lower'
      //else if value > 0
      //    type = 'hight'
      //    value = "+" + value
      this.baseTextLine.b().textColor = this.getColorHex(type);
      this.baseTextLine.drawTextFull(value, 'center');
    }

    _drawStateDiffValue(actor) {
      var actorCurrentParam, actorParamBase, eq, equippedValue, head, newValue, paramId, paramValue, t, tail, type;
      paramId = this.paramValueId();
      if (paramId >= 0) {
        paramValue = this.cell.item.params[paramId];
      } else {
        paramValue = 0;
      }
      eq = this._equipedOne(actor, this.cell.item);
      if (eq != null) {
        equippedValue = eq.params[paramId];
      } else {
        equippedValue = 0;
      }
      actorParamBase = actor[this.statId] - equippedValue;
      actorCurrentParam = actor[this.statId];
      newValue = actorParamBase + paramValue;
      if (newValue === actorCurrentParam) {
        type = 'normal';
      } else if (newValue > actorCurrentParam) {
        type = 'hight';
      } else {
        type = 'lower';
      }
      if (type === 'normal') {
        if (PKD_MI.Parameters.get_ShortStatsText()) {
          t = equippedValue;
        } else {
          t = newValue;
        }
        this._drawStateValue(t, 'normal');
      } else {
        t = "";
        if (type === 'lower') {
          head = newValue;
          tail = "-" + (actorCurrentParam - newValue);
        } else if (type === 'hight') {
          head = newValue;
          tail = "+" + (newValue - actorCurrentParam);
        }
        if (PKD_MI.Parameters.get_ShortStatsText()) {
          t = tail;
        } else {
          t = head + "(" + tail + ")";
        }
        this.baseTextLine.b().textColor = this.getColorHex(type);
        this.baseTextLine.drawTextFull(t, 'center');
      }
    }

    _equipedOne(actor, item) {
      item = actor.equips()[item.etypeId - 1];
      //console.info item
      return item;
    }

    paramValueId() {
      switch (this.statId) {
        case "mhp":
          return 0;
        case "mmp":
          return 1;
        case 'atk':
          return 2;
        case 'def':
          return 3;
        case 'mat':
          return 4;
        case 'mdf':
          return 5;
        case 'agi':
          return 6;
        case 'luk':
          return 7;
        default:
          return -1;
      }
    }

    isOnlyleader() {
      return PKD_MI.partyGroup().length === 1;
    }

    isEquipped() {
      return this.cell._isEquipedItem === true && this.cell._inSpecialState === true;
    }

    getColorHex(colorType) {
      switch (colorType) {
        case 'normal':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statTextColor).CSS;
        case 'lower':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statLowerColor).CSS;
        case 'hight':
          return KDCore.Color.FromHex(this.settings.EquipmentStats.statHightColor).CSS;
        default:
          return KDCore.Color.WHITE.CSS;
      }
    }

  };
  PKD_MI.register(Sprite_MapInventoryStatText);
})();

// ■ END Sprite_MapInventoryStatText.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvFooter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvFooter;
  Sprite_MapInvFooter = class Sprite_MapInvFooter extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createContent();
      return this._createSectionControl();
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createContent() {
      this._createGoldIcon();
      this._createGoldTextSpr();
      return this._createWeightSystem();
    }

    _createWeightSystem() {
      if (PKD_MI.Parameters.get_UsedWSystem()) {
        this._createWeightTextSpr();
        return this._createWeightIcon();
      }
    }

    _createGoldIcon() {
      this.goldIcon = PKD_MI.FromImgI(this.settings.goldIcon);
      this.goldIcon.move(KDCore.Utils.jsonPos(this.settings.goldIconPosition));
      return this.add(this.goldIcon);
    }

    _createGoldTextSpr() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.goldText.textBoxWidth, this.settings.goldText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.goldText);
      return this.add(this._textSpr);
    }

    //@drawGold "3444"
    drawGold(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      //@_textSpr.bitmap.fillAll KDCore.Color.RED
      return this._textSpr.drawTextFull(text, this.settings.goldText.position);
    }

    _createWeightIcon() {
      var icon;
      icon = PKD_MI.FromImgI(this.settings.weightIcon);
      icon.move(KDCore.Utils.jsonPos(this.settings.weightIconPosition));
      return this.add(icon);
    }

    _createWeightTextSpr() {
      var extraFooter;
      extraFooter = PKD_MI.FromImgI(this.settings.extraFooter);
      extraFooter.move(KDCore.Utils.jsonPos(this.settings.extraFooterPosition));
      this.add(extraFooter);
      this._textSpr3 = KDCore.Sprite.FromBitmap(this.settings.weightText.textBoxWidth, this.settings.weightText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr3, this.settings.weightText);
      return this.add(this._textSpr3);
    }

    //@drawWeight "344/444", false
    drawWeight(text, isOver) {
      var tc;
      if (this._textSpr3 == null) {
        return;
      }
      this._textSpr3.clear();
      if (this.settings.weightText.backgroundFill != null) {
        this._textSpr3.bitmap.fillAll(KDCore.Color.FromHex(this.settings.weightText.backgroundFill));
      }
      tc = KDCore.Color.FromHex(this.settings.weightText.textColor).CSS;
      if (isOver) {
        tc = KDCore.Color.FromHex(this.settings.weightText.textColor2).CSS;
      }
      this._textSpr3.bitmap.textColor = tc;
      return this._textSpr3.drawTextFull(text, this.settings.weightText.position);
    }

    _createSectionControl() {
      this._createArrows();
      return this._createPageText();
    }

    _createArrows() {
      var img0, img1, img3;
      this._arrowL = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryArrowLeft_00");
      img1 = ImageManager.loadPKDMI("inventoryArrowLeft_01");
      img3 = ImageManager.loadPKDMI("inventoryArrowLeft_03");
      this._arrowL.setButtonImages(img0, img1, img0, img3);
      this._arrowL.move(KDCore.Utils.jsonPos(this.settings.pageArrowLeftInSectionPos));
      this._arrowL.disable();
      this._arrowL.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.invShowPrevPage();
      });
      this.add(this._arrowL);
      this._arrowR = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryArrowRight_00");
      img1 = ImageManager.loadPKDMI("inventoryArrowRight_01");
      img3 = ImageManager.loadPKDMI("inventoryArrowRight_03");
      this._arrowR.setButtonImages(img0, img1, img0, img3);
      this._arrowR.move(KDCore.Utils.jsonPos(this.settings.pageArrowRightInSectionPos));
      this._arrowR.disable();
      this._arrowR.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.invShowNextPage();
      });
      this.add(this._arrowR);
    }

    _createPageText() {
      this._textSpr2 = KDCore.Sprite.FromBitmap(this.settings.pageText.textBoxWidth, this.settings.pageText.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr2, this.settings.pageText);
      this.add(this._textSpr2);
      return this.drawPagesCount(1, 1);
    }

    drawPagesCount(current, max) {
      var text;
      if (this._textSpr2 == null) {
        return;
      }
      this._textSpr2.clear();
      //@_textSpr2.bitmap.fillAll KDCore.Color.RED
      text = current + "/" + max;
      return this._textSpr2.drawTextFull(text, this.settings.pageText.position);
    }

    //@[ALIAS]
    update() {
      super.update();
      if (this._wPulseThread != null) {
        this._wPulseThread.update();
      }
    }

    pulseWeightText() {
      if (this._textSpr3 == null) {
        return;
      }
      if (this._wPulseThread != null) {
        this._textSpr3.opacity = 255;
      }
      this._pulseCount = 3;
      this._pulseTimer = 0;
      return this._wPulseThread = new KDCore.TimedUpdate(10, this._onPulseThread.bind(this));
    }

    _onPulseThread() {
      this._textSpr3.opacity = Math.abs(Math.sin(this._pulseTimer)) * 255;
      this._pulseTimer += 10;
      //console.log(@_pulseTimer)
      if (this._pulseTimer >= 30) {
        this._pulseTimer = 0;
        this._pulseCount--;
      }
      //console.log(@_pulseCount)
      if (this._pulseCount <= 0) {
        this._wPulseThread = null;
        this._textSpr3.opacity = 255;
      }
    }

    disableArrows() {
      this._arrowL.disable();
      return this._arrowR.disable();
    }

  };
  PKD_MI.register(Sprite_MapInvFooter);
})();

// ■ END Sprite_MapInvFooter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvHeader;
  Sprite_MapInvHeader = class Sprite_MapInvHeader extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._drawIcon();
      this._createContent();
      return this._createCloseButton();
    }

    _createBackground() {
      this._background = PKD_MI.FromImgI(this.settings.headerBackImg);
      return this.add(this._background);
    }

    _drawIcon() {
      var icon;
      if (this.settings.icon == null) {
        return;
      }
      icon = PKD_MI.FromImgI(this.settings.icon);
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    //u22
    _createContent() {
      this._content = new Sprite();
      this.categoryBtns = [];
      if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
        this._createCategoriesNew();
      } else {
        this._createCategories();
      }
      this.add(this._content);
    }

    //u22
    _createCategories() {
      var addedCount, availableCatList, img0, img1, img3;
      availableCatList = this.settings.availableCategories;
      addedCount = 0;
      //? this is must be above items! here...
      img0 = ImageManager.loadPKDMI(this.settings.categoryButtonImg);
      img1 = ImageManager.loadPKDMI(this.settings.categoryButtonHoverImg);
      img3 = ImageManager.loadPKDMI(this.settings.categoryButtonSelectedImg);
      if (availableCatList.items === true) {
        this.category1 = new KDCore.Button();
        this.category1.setButtonImages(img0, img1, img0, img3);
        this.category1.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryItems();
        });
        this._content.addChild(this.category1);
        this.categoryBtns.push(this.category1);
        addedCount++;
      } else {
        this.category1 = null;
        this.categoryBtns.push(null);
      }
      if (availableCatList.weapons === true) {
        this.category2 = new KDCore.Button();
        this.category2.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category2.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category2.move(0, 0); //?line
        }
        this.category2.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryWeapons();
        });
        this._content.addChild(this.category2);
        this.categoryBtns.push(this.category2);
        addedCount++;
      } else {
        this.categoryBtns.push(null);
      }
      if (availableCatList.armors === true) {
        this.category3 = new KDCore.Button();
        this.category3.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category3.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category3.move(0, 0); //?line
        }
        this.category3.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryArmors();
        });
        this._content.addChild(this.category3);
        this.categoryBtns.push(this.category3);
        addedCount++;
      } else {
        this.categoryBtns.push(null);
      }
      if (availableCatList.keyItems === true) {
        this.category4 = new KDCore.Button();
        this.category4.setButtonImages(img0, img1, img0, img3);
        if (addedCount !== 0) {
          this.category4.move(this.settings.categoryButtonMarginBetween * addedCount, 0);
        } else {
          this.category4.move(0, 0); //?line
        }
        this.category4.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.invShowCategoryKeyItems();
        });
        this._content.addChild(this.category4);
        this.categoryBtns.push(this.category4);
      } else {
        this.categoryBtns.push(null);
      }
      this._content.move(this.settings.categoryButtonsMarginX, this.settings.categoryButtonsMarginY);
      this._createCategoryIcons();
    }

    _createCategoryIcons() {
      var i, icon, j, ref, ref1, results;
      results = [];
      for (i = j = 0, ref = this.categoryBtns.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        icon = PKD_MI.FromImgI(this.settings.categoriesIcons[i]);
        results.push((ref1 = this.categoryBtns[i]) != null ? ref1.addChild(icon) : void 0);
      }
      return results;
    }

    _createCloseButton() {
      var img0, img1;
      if (this.settings.isCloseButtonVisible !== true) {
        return;
      }
      this.closeBtn = new KDCore.Button();
      img0 = ImageManager.loadPKDMI(this.settings.closeButtonImg);
      img1 = ImageManager.loadPKDMI(this.settings.closeButtonHoverImg);
      this.closeBtn.setButtonImages(img0, img1, img0, img0);
      this.closeBtn.move(this.settings.closeButtonMarginX, this.settings.closeButtonMarginY);
      this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeInventoryByClick();
      });
      return this.add(this.closeBtn);
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    enableAllButtons() {
      var btn, j, len, ref, results;
      ref = this.categoryBtns;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        btn = ref[j];
        results.push(btn != null ? btn.enable() : void 0);
      }
      return results;
    }

    getHoveredIndex() {
      var btn, i, j, ref;
      for (i = j = 0, ref = this.categoryBtns.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        btn = this.categoryBtns[i];
        if (btn != null ? btn.isMouseInButton() : void 0) {
          return i;
        }
      }
      return null;
    }

    isMouseIn() {
      var pos, rx, ry;
      pos = TouchInput;
      rx = KDCore.SDK.canvasToLocalX(this._background, pos.x);
      ry = KDCore.SDK.canvasToLocalY(this._background, pos.y);
      return rx >= 0 && ry >= 0 && rx <= this._background.width && ry <= this._background.height;
    }

    //u22
    _createCategoriesNew() {
      var c, category, cats, icon, images, img0, img1, img3, index, j, len;
      cats = PKD_MI.Parameters.getNewCategories();
      if (cats == null) {
        return;
      }
      if (cats.length === 0) {
        return;
      }
      // * button images
      images = PKD_MI.Parameters.getNewCategoriesButtonImages();
      img0 = ImageManager.loadPKDMI(images.main);
      img1 = ImageManager.loadPKDMI(images.hovered);
      img3 = ImageManager.loadPKDMI(images.selected);
// * create categories buttons
      for (index = j = 0, len = cats.length; j < len; index = ++j) {
        c = cats[index];
        category = new KDCore.Button();
        category.setButtonImages(img0, img1, img0, img3);
        //category._catItemData = c
        category._catItemIndex = index;
        category._catTag = this._currentCategoryTag(); // * inventory category button
        category.move(c.position);
        category.addClickHandler((function() {
          SoundManager.playCursor();
          return PKD_MI.invShowNewCategory(this._catTag, this._catItemIndex);
        }).bind(category));
        this._content.addChild(category);
        this.categoryBtns.push(category);
        if (String.any(c.icon)) {
          icon = PKD_MI.FromImgI(c.icon);
          category.addChild(icon);
          icon.move(c.iconMargins);
        }
      }
    }

    //u22
    _currentCategoryTag() {
      return "inventory";
    }

  };
  PKD_MI.register(Sprite_MapInvHeader);
})();

// ■ END Sprite_MapInvHeader.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHelp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvHelp;
  Sprite_MapInvHelp = class Sprite_MapInvHelp extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createCommonBackground();
      this._decideForCreateBackground(this.settings.width, this.settings.height);
      this._createContent();
      return this._createCorner();
    }

    _decideForCreateBackground(w, h) {
      var customBackground, e;
      try {
        customBackground = PKD_MI.Parameters.get_CustomHelpWindowBackground();
        if (String.any(customBackground)) {
          return this._createCustomBackground(customBackground);
        } else {
          return this._createBackground(w, h);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _loadSettings() {
      this.basicSettings = this._settingsJSON();
      return this.settings = this.basicSettings.helpWindow;
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createCommonBackground() {
      if (this._background == null) {
        this._background = new KDCore.Sprite();
        this.add(this._background);
      }
    }

    _createBackground(w, h) {
      this._background.bitmap = new Bitmap(w, h);
      this._background.bitmap.fillAll(KDCore.Color.FromHex(this.settings.backgroundColor));
      this._background.opacity = this.settings.backgroundOpacity;
      this._usedCustomBackground = false;
    }

    _createCustomBackground(img) {
      var e;
      try {
        if (!String.any(img)) {
          return;
        }
        this._usedCustomBackground = true;
        return this._background.bitmap = ImageManager.loadPKDMI(img);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _createCorner() {
      this._corner = PKD_MI.FromImgI('inventoryHintCorner');
      return this._background.add(this._corner);
    }

    _createContent() {
      this.content = new Sprite();
      this._createCost();
      this._createName();
      this._creatType();
      if (PKD_MI.Parameters.isUseAltDescForStats()) {
        this._createDescriptionHeader();
      }
      this._createDescription();
      this._createWeight();
      this._createQLevel();
      this._createStats();
      if (PKD_MI.Parameters.getIsUseLevelReqSystem()) {
        this._createLvReq();
      }
      return this._background.add(this.content);
    }

    _createCost() {
      this._textCostSpr = KDCore.Sprite.FromTextSettings(this.settings.itemCostText);
      this.content.addChild(this._textCostSpr);
      this.goldIcon = PKD_MI.FromImgI(this.basicSettings.goldIcon);
      this.goldIcon.move(KDCore.Utils.jsonPos(this.settings.goldIconPosition));
      return this.content.addChild(this.goldIcon);
    }

    _createName() {
      this._textNameSpr = KDCore.Sprite.FromTextSettings(this.settings.itemNameText);
      return this.content.addChild(this._textNameSpr);
    }

    _creatType() {
      this._textTypeSpr = KDCore.Sprite.FromTextSettings(this.settings.itemTypeText);
      return this.content.addChild(this._textTypeSpr);
    }

    _createDescriptionHeader() {
      this.__textDescHeader = KDCore.Sprite.FromTextSettings(this.settings.itemTypeText);
      return this.content.addChild(this.__textDescHeader);
    }

    _createDescription() {
      var ffFace, ffSize, fontProcess, p;
      p = this.settings.descriptionWindow;
      //console.info @settings.descriptionWindow
      if (KDCore.isMV()) {
        this._description = new Window_Base(p.x, p.y, p.width, p.height);
      } else {
        this._description = new Window_Base(new PIXI.Rectangle(p.x, p.y, p.width, p.height));
      }
      this._description.setBackgroundType(2);
      this.content.addChild(this._description);
      if (KDCore.isMV()) {
        this._description.standardFontSize = function() {
          return p.fontSize;
        };
        this._description.lineHeight = function() {
          return 12;
        };
        this._description.standardPadding = function() {
          return 6;
        };
        if (p.fontFace != null) {
          return this._description.standardFontFace = function() {
            return p.fontFace;
          };
        }
      } else {
        ffFace = p.fontFace;
        ffSize = p.fontSize;
        fontProcess = function() {
          if (ffFace != null) {
            this.contents.fontFace = ffFace;
          } else {
            this.contents.fontFace = $gameSystem.mainFontFace();
          }
          this.contents.fontSize = ffSize;
          return this.resetTextColor();
        };
        this._description.resetFontSettings = fontProcess.bind(this._description);
      }
    }

    _createWeight() {
      var wIcon;
      if (!PKD_MI.Parameters.get_UsedWSystem()) {
        return;
      }
      this._textWeightSpr = KDCore.Sprite.FromTextSettings(this.settings.itemWeightText);
      this.content.addChild(this._textWeightSpr);
      wIcon = PKD_MI.FromImgI(this.basicSettings.weightIcon);
      wIcon.move(KDCore.Utils.jsonPos(this.settings.weighIconPosition));
      return this.content.addChild(wIcon);
    }

    _createQLevel() {
      var marginX, marginY, wIcon;
      if (!PKD_MI.Parameters.get_AllowRareSystem()) {
        return;
      }
      this._textQLevelSpr = KDCore.Sprite.FromTextSettings(this.settings.itemQualityText);
      ({marginX, marginY} = this.settings.itemQualityText);
      this._textQLevelSpr.move(marginX, marginY);
      if (this.basicSettings.QualitySystem.qualityIcon != null) {
        if (PKD_MI.Parameters.get_IsUseQualityIconsPerTier()) {

        } else {
          // * Will be drawn in Setup method
          wIcon = PKD_MI.FromImgI(this.basicSettings.QualitySystem.qualityIcon);
          wIcon.move(KDCore.Utils.jsonPos(this.settings.qualityIconPosition));
          this.content.addChild(wIcon);
        }
      }
      return this.content.addChild(this._textQLevelSpr);
    }

    _createLvReq() {
      var p;
      p = PKD_MI.Parameters.getLevelReqTextSettings();
      this._textLvReq = new KDCore.UI.Sprite_UIText(p);
      return this.content.addChild(this._textLvReq);
    }

    delay() {
      return this.settings.showDelay;
    }

    //u20
    setup(cell) {
      this.cell = cell;
      this._isStatsAllowed = false;
      this._statsIndex = 0;
      if (this.cell == null) {
        return;
      }
      this.drawCost();
      this.drawName();
      this.drawType();
      this.drawLevReq();
      this.drawDesc();
      this.showActionHelp();
      if (PKD_MI.Parameters.get_UsedWSystem()) {
        this.drawWeight();
      }
      if (PKD_MI.Parameters.get_AllowRareSystem()) {
        this.drawQLevel();
      }
      if (PKD_MI.Parameters.get_AllowEquipStats()) {
        this.prepareStats();
      }
      if (PKD_MI.Parameters.get_IsShowUseOnlyImagePerActor()) {
        this.drawUseOnlyActorInfo();
      }
      this.refreshBackgroundHeight();
      this.refreshCustomBackgroundImage();
    }

    drawCost() {
      var ref, text;
      text = this.cell.item.price;
      //@_textCostSpr.fillAll()
      return (ref = this._textCostSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    //u20
    drawName() {
      var text;
      if (this._textNameSpr == null) {
        return;
      }
      text = this.cell.item.name;
      if (String.any(text)) {
        text = PKD_MI._removeEscapeChars(text);
      }
      this._textNameSpr.drawTextWithSettings(text);
      if (!PKD_MI.Parameters.isShowItemNameWithQualityColor()) {
        return;
      }
      this._drawNameWithQualityColor(text);
    }

    //u20
    _drawNameWithQualityColor(name) {
      var quality;
      quality = DataManager.getItemQualityLevel(this.cell.item);
      if (quality < 0) {
        return;
      }
      this._textNameSpr.clear();
      this._textNameSpr.bitmap.textColor = PKD_MI.GetColorForQuealityLevel(quality);
      return this._textNameSpr.drawTextFull(name, this.settings.itemNameText.position);
    }

    drawType() {
      var ref, text, type;
      type = this._getTypeText(this.cell.item);
      text = type.text;
      this._textTypeSpr.bitmap.textColor = KDCore.Color.FromHex(type.color).CSS;
      //@_textTypeSpr.fillAll()
      return (ref = this._textTypeSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    //u24
    drawLevReq() {
      var reqLevel, textFormat;
      if (!PKD_MI.Parameters.getIsUseLevelReqSystem()) {
        return;
      }
      reqLevel = DataManager.getItemLevelRequirements(this.cell.item);
      if (reqLevel <= 0) {
        this._textLvReq.drawText(""); // * Nothing (for items)
      } else {
        textFormat = PKD_MI.Parameters.getLevelReqTextFormat();
        this._textLvReq.drawTextWithFormat(textFormat, reqLevel);
      }
    }

    _getTypeText(item) {
      var color, e, specialColor, specialText, text;
      color = null;
      text = null;
      try {
        if (DataManager.isItem(item)) {
          if (item.itypeId === 1) { // * NORMAL
            if (item.consumable === true) {
              text = this.settings.consumableTypeText;
              color = this.settings.defaultTypeColors.consumableItem;
            } else {
              text = TextManager.item;
              color = this.settings.defaultTypeColors.normalItem; // * KEY
            }
          } else {
            text = TextManager.keyItem;
            color = this.settings.defaultTypeColors.keyItem;
          }
        } else {
          if (DataManager.isWeapon(item)) {
            text = $dataSystem.weaponTypes[item.wtypeId];
            color = this.settings.defaultTypeColors.weapon;
          } else if (DataManager.isArmor(item)) {
            text = $dataSystem.armorTypes[item.atypeId];
            color = this.settings.defaultTypeColors.armor;
          }
        }
      } catch (error) {
        e = error;
        PKD_MI.warning('_getTypeText', e);
      }
      specialText = this._getItemSpecialTypeText(item);
      if (specialText != null) {
        text = specialText.trim();
      }
      specialColor = this._getItemSpecialTypeColor(item);
      if (specialColor != null) {
        color = specialColor.trim();
      }
      if (text == null) {
        text = "Unknown";
      }
      if (color == null) {
        color = "#FFFFFF";
      }
      return {text, color};
    }

    //u19
    _getItemSpecialTypeText(item) {
      var text;
      if (item.meta == null) {
        return null;
      }
      text = item.meta.aItemType;
      if (String.any(text)) {
        text = text.replaceAll("|", ", ");
      }
      return text;
    }

    _getItemSpecialTypeColor(item) {
      if (item.meta == null) {
        return null;
      }
      return item.meta.aItemTypeColor;
    }

    drawDesc() {
      var text;
      this._description.contents.clear();
      if (PKD_MI.Parameters.isUseAltDescForStats() && !DataManager.isItem(this.cell.item)) {
        if (PKD_MI.Parameters.getAltStatsSettings().isShowDefDescription === false) {
          return;
        }
      }
      text = this.cell.item.description;
      // * why + 150 ???
      this._description.drawTextExWithWordWrap(text, 0, 0, this.settings.descriptionWindow.width + 150);
      this._description.contents.clear();
      return this._description.drawTextExWithWordWrap(text, 0, 0, this.settings.descriptionWindow.width - 10);
    }

    //@_description.drawTextEx text, 0, 0, @settings.descriptionWindow.width + 150

      //u23
    showActionHelp() {
      var item, name, text;
      if ((PKD_MI.isUserChestIsOpen() || PKD_MI.isStoredChestIsOpen()) && this.cell._isChestItem === false) {
        text = PKD_MI.getUIMapUserChestSettings().putInHelpText;
        this._drawActionHelpText(text);
        return;
      }
      if (!this.cell.isEnabled()) {
        return;
      }
      if (this.cell._isChestItem === true) {
        text = this._getwActionHelpTextChestItem();
      } else {
        item = this.cell.item;
        text = "";
        if (DataManager.isItem(item)) {
          text = this.settings.helpUseItemText;
          text = this._applyStrictUsecase(text, item);
        } else {
          if (this.cell.isCanBeUnEquiped()) {
            text = this.settings.helpUnEquipItemText;
            if (PKD_MI.isPartyInventoryAllowed()) {
              name = this.cell._getSpecialStateActorName();
              if (name != null) {
                text += " [" + name + "]";
              }
            }
          } else {
            if (PKD_MI.isPartyInventoryAllowed()) {
              text = this.settings.helpEquipItemText;
              if (PKD_MI.getItemOnlyActorIdUsecase(item) > 0) {
                text = this._applyStrictUsecase(text, item);
              } else {
                if (this.cell.whoCanEquip == null) {
                  this.cell.whoCanEquip = [];
                }
                if (this.cell.whoCanEquip.length === 1) {
                  name = $gameActors.actor(this.cell.whoCanEquip[0]).name();
                  if (name != null) {
                    text += " [" + name + "]";
                  }
                } else if (this.cell.whoCanEquip.length > 1) {
                  text += " [*]";
                }
              }
            } else {
              text = this.settings.helpEquipItemText;
              text = this._applyStrictUsecase(text, item);
            }
          }
        }
      }
      this._drawActionHelpText(text);
    }

    _applyStrictUsecase(text, item) {
      var e, name, ref, usecaseOnlyFor;
      try {
        usecaseOnlyFor = PKD_MI.getItemOnlyActorIdUsecase(item);
        if (usecaseOnlyFor > 0) {
          name = (ref = $gameActors.actor(usecaseOnlyFor)) != null ? ref.name() : void 0;
          if (name != null) {
            text += " [" + name + "]";
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return text;
    }

    _getwActionHelpTextChestItem() {
      return PKD_MI.getUIMapChestSettings().helpWindow.helpTakeItemText;
    }

    //u20
    _drawActionHelpText(text) {
      var actionHelpSpr, helpIcon;
      if ((text != null) && text !== "") {
        actionHelpSpr = KDCore.Sprite.FromTextSettings(this.settings.clickHelpText);
        actionHelpSpr.drawTextWithSettings(text);
        this.__helpSprText = actionHelpSpr;
        this.content.addChild(actionHelpSpr);
        if (PKD_MI.IsGamepad()) {
          helpIcon = PKD_MI.FromImgI("inventoryClickHelpGP");
        } else {
          helpIcon = PKD_MI.FromImgI("inventoryClickHelp");
        }
        helpIcon.move(KDCore.Utils.jsonPos(this.settings.helpIconPosition));
        this.__helpSprIcon = helpIcon;
        this.content.addChild(helpIcon);
      }
    }

    drawWeight() {
      var ref, text;
      text = DataManager.getItemWeight(this.cell.item);
      return (ref = this._textWeightSpr) != null ? ref.drawTextWithSettings(text) : void 0;
    }

    drawQLevel() {
      var color, marginX, marginY, qualityLevel;
      qualityLevel = DataManager.getItemQualityLevel(this.cell.item);
      color = this._getColorForQualityLevel(qualityLevel);
      if (this._textQLevelSpr != null) {
        this._textQLevelSpr.b().textColor = color;
        this._textQLevelSpr.drawTextWithSettings(this._getTextForQualityLevel(qualityLevel));
        ({marginX, marginY} = this.settings.itemQualityText);
        this._textQLevelSpr.move(marginX, marginY);
      }
      if (PKD_MI.Parameters.get_IsUseQualityIconsPerTier()) {
        return this._drawQLevelIcon(qualityLevel);
      }
    }

    _getTextForQualityLevel(qualityLevel) {
      var levelData;
      levelData = this.basicSettings.QualitySystem.Levels[qualityLevel];
      if (levelData == null) {
        return "";
      }
      return levelData[0];
    }

    _drawQLevelIcon(qualityLevel) {
      var defaultName, e, wIcon, wIconName;
      try {
        defaultName = this.basicSettings.QualitySystem.qualityIcon;
        if (!String.any(defaultName)) {
          return;
        }
        wIconName = defaultName + "_" + qualityLevel;
        wIcon = PKD_MI.FromImgI(wIconName);
        wIcon.move(KDCore.Utils.jsonPos(this.settings.qualityIconPosition));
        return this.content.addChild(wIcon);
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //u20
    _getColorForQualityLevel(qualityLevel) {
      return PKD_MI.GetColorForQuealityLevel(qualityLevel);
    }

    //u19, u23
    refreshPlacement(isFromInventory = true) {
      if (isFromInventory && PKD_MI.Parameters.isStaticDescPosition() === true && (PKD_MI.Parameters.getStaticDescPosition() != null)) {
        this._setStaticPosition();
      } else {
        this._setDynamicPosition();
      }
    }

    //u26
    _setDynamicPosition() {
      var dx, dy, pos;
      pos = this.getSourcePos();
      this.move(pos.x + this.settings.marginX, pos.y + this.settings.marginY);
      dx = dy = 0;
      if (this._background.bitmap.width + this.x + 5 > Graphics.boxWidth) {
        dx = 1;
        this.x -= this.settings.marginX;
      }
      if (this._background.bitmap.height + this.y + 5 > Graphics.boxHeight) {
        dy = 1;
        this.y -= this.settings.marginY;
      }
      this._background.setStaticAnchor(dx, dy);
      this._refreshCornerPlacement(dx, dy);
    }

    //u19
    _setStaticPosition() {
      var pos, ref;
      pos = PKD_MI.Parameters.getStaticDescPosition();
      if (pos != null) {
        this.move(pos.x, pos.y);
      }
      // * В данном случае corner скрываем
      if ((ref = this._corner) != null) {
        ref.visible = false;
      }
    }

    getSourcePos() {
      var x, y;
      if (this.cell != null) {
        x = KDCore.SDK.toGlobalCoord(this.cell, "x");
        y = KDCore.SDK.toGlobalCoord(this.cell, "y");
        return new KDCore.Point(x, y);
      } else {
        return TouchInput;
      }
    }

    _refreshCornerPlacement(dx, dy) {
      var pos;
      this._corner.scale.x = 1;
      this._corner.scale.y = 1;
      if (dx === 1 && dy === 0) {
        pos = this.settings.cornerPositions.topRight;
      }
      if (dx === 0 && dy === 0) {
        pos = this.settings.cornerPositions.topLeft;
        this._corner.scale.x = -1;
      }
      if (dx === 1 && dy === 1) {
        pos = this.settings.cornerPositions.downRight;
        this._corner.scale.y = -1;
      }
      if (dx === 0 && dy === 1) {
        pos = this.settings.cornerPositions.downLeft;
        this._corner.scale.x = -1;
        this._corner.scale.y = -1;
      }
      this._corner.move(KDCore.Utils.jsonPos(pos));
    }

    //u24
    refreshBackgroundHeight() {
      var e, h, w;
      if (this.cell == null) {
        return;
      }
      if (this.cell.item == null) {
        return;
      }
      if (this._usedCustomBackground === true) {
        return;
      }
      try {
        h = KDCore.Utils.getValueFromMeta("invDescH", this.cell.item);
        w = KDCore.Utils.getValueFromMeta("invDescW", this.cell.item);
        if ((h != null) || (w != null)) {
          if (h == null) {
            h = this.settings.height;
          }
          if (w == null) {
            w = this.settings.width;
          }
          return this._createBackground(w, h);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //u27
    refreshCustomBackgroundImage() {
      var customBackgroundImage;
      customBackgroundImage = KDCore.Utils.getValueFromMeta("invDescBackImg", this.cell.item);
      if (String.any(customBackgroundImage)) {
        this._createCustomBackground(customBackgroundImage);
      }
    }

    //u27
    drawUseOnlyActorInfo() {
      var e, image, pos, useOnlyActorId, useOnlySpr;
      try {
        if (this.cell == null) {
          return;
        }
        if (this.cell.item == null) {
          return;
        }
        useOnlyActorId = KDCore.Utils.getValueFromMeta("iOnlyForActor", this.cell.item);
        // * Только если оружие ещё не экипировано
        if (String.any(useOnlyActorId) && !this.cell.isCanBeUnEquiped()) {
          image = "UseOnlyActor_" + useOnlyActorId;
          useOnlySpr = PKD_MI.FromImgI(image);
          pos = PKD_MI.Parameters.get_UseOnleImagePosition();
          useOnlySpr.move(pos);
          return this.content.addChild(useOnlySpr);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

  };
  PKD_MI.register(Sprite_MapInvHelp);
})();

// ■ END Sprite_MapInvHelp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MainInvItems;
  Sprite_MainInvItems = class Sprite_MainInvItems extends KDCore.Sprite {
    constructor(isLockable = false) {
      super();
      this.isLockable = isLockable;
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createItemNameLine();
      return this._createContent();
    }

    _createItemNameLine() {
      this._textSpr = KDCore.Sprite.FromBitmap(this.settings.itemName.textBoxWidth, this.settings.itemName.textBoxHeight);
      this.applyTextSettingsByExtraSettings(this._textSpr, this.settings.itemName);
      return this.add(this._textSpr);
    }

    //@drawItemName "Apple"
    drawItemName(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (String.any(text)) {
        //@_textSpr.bitmap.fillAll KDCore.Color.RED
        text = PKD_MI._removeEscapeChars(text);
      }
      return this._textSpr.drawTextFull(text, this.settings.itemName.position);
    }

    _createContent() {
      this.content = new Sprite();
      this._createCells();
      this.content.move(KDCore.Utils.jsonPos(this.settings.invCellStartPosition));
      this.add(this.content);
    }

    _createCells() {
      var c, cell, i, index, j, k, params, r, ref, results;
      this._cells = [];
      index = 0;
      r = 5;
      c = 5;
      if (PKD_MI.Parameters.isCustomSizeCells() === true) {
        params = PKD_MI.Parameters.getCustomSizeCellsParameters();
        r = params.rowsPerPage;
        c = params.columnsPerPage;
      }
      results = [];
      for (i = k = 0, ref = r; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
        results.push((function() {
          var l, ref1, results1;
          results1 = [];
          for (j = l = 0, ref1 = c; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
            cell = this._createCell(index++);
            this._cells.push(cell);
            results1.push(this._placeCell(i, j, cell));
          }
          return results1;
        }).call(this));
      }
      return results;
    }

    //?UPD18
    _createCell(index) {
      var cell;
      cell = new PKD_MI.LIBS.Sprite_MapInvCell(index, this._isCellsCanBeLocked());
      this.content.addChild(cell);
      return cell;
    }

    //?UPD18
    _isCellsCanBeLocked() {
      return this.isLockable === true;
    }

    _placeCell(i, j, cell) {
      return cell.move(this.settings.invCellMarginX * j, this.settings.invCellMarginY * i);
    }

    _loadSettings() {
      return this.settings = this._settingsJSON();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    getCellAt(index) {
      return this._cells[index];
    }

    getHoveredCell() {
      var cell, k, len, ref;
      if (this.focusedCell != null) {
        //return @focusedCell if @focusedCell.isHovered()
        return null;
      }
      ref = this._cells;
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        if (cell.isHovered()) {
          return cell;
        }
      }
      return null;
    }

    clearAllItems() {
      var cell, k, len, ref, results;
      this.clearFocus();
      ref = this._cells;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        results.push(cell.clear());
      }
      return results;
    }

    //?UPD18
    prepareForCategory(catIndex) {
      var cell, k, len, ref, results;
      ref = this._cells;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        cell = ref[k];
        results.push(cell.prepareForCategory(catIndex));
      }
      return results;
    }

  };
  PKD_MI.register(Sprite_MainInvItems);
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AA_MInvMainSprite.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInvMain;
  Sprite_MapInvMain = class Sprite_MapInvMain extends KDCore.Sprite {
    constructor() {
      super();
      this._create();
    }

    _create() {
      this._loadSettings();
      this._createBackground();
      this._main = new Sprite();
      return this.add(this._main);
    }

    _loadSettings() {
      this.settings = this._settingsJSON();
      this.moveByJson(this.settings);
      return this.visible = this.settings.visible;
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createBackground() {
      this._background = PKD_MI.FromImgI(this.settings.backgroundImg);
      return this.add(this._background);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapInvHeader();
      return this._main.addChild(this._header);
    }

    //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(PKD_MI.isPro());
      return this._main.addChild(this._content);
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapInvFooter();
      return this._main.addChild(this._footer);
    }

    isMouseIn() {
      var pos, rx, ry;
      if (this._content._isSomePartyActorIsHovered()) {
        return true;
      }
      pos = TouchInput;
      rx = KDCore.SDK.canvasToLocalX(this._background, pos.x);
      ry = KDCore.SDK.canvasToLocalY(this._background, pos.y);
      return rx >= 0 && ry >= 0 && rx <= this._background.width && ry <= this._background.height;
    }

    //u23
    createMain() {
      this._createHeader();
      this._createContent();
      this._createFooter();
      if (PKD_MI.isPro()) {
        this._createExtraOptions();
      }
    }

    destroyMain() {
      this._main.removeChild(this._header);
      this._main.removeChild(this._footer);
      this._main.removeChild(this._content);
      this._header.destroy();
      this._footer.destroy();
      this._content.destroy();
      this._header = null;
      this._content = null;
      this._footer = null;
      if (PKD_MI.isPro()) {
        this._destroyExtraOptions();
      }
    }

    playStartSE() {
      var e, se;
      try {
        se = PKD_MI.Parameters.getOpenInvSE();
        if (String.any(se)) {
          return KDCore.Utils.playSE(se);
        } else {
          return KDCore.Utils.playSE(this.settings.openInventorySE);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    update() {
      super.update();
      return this._updateExtraOptions();
    }

    //?VERSION
    _createExtraOptions() {} // * EMPTY

    
      //?VERSION
    _updateExtraOptions() {} // * EMPTY

    
      //?VERSION
    _destroyExtraOptions() {} // * EMPTY

  };
  PKD_MI.register(Sprite_MapInvMain);
})();

// ■ END AA_MInvMainSprite.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ zSprite_MapUserChestMain_PRO.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapUserChestMain;
  Sprite_MapUserChestMain = class Sprite_MapUserChestMain extends PKD_MI.LIBS.Sprite_MapInvMain {
    constructor() {
      super();
    }

    //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(false);
      return this._main.addChild(this._content);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapUserChestHeader();
      this._main.addChild(this._header);
      return this.moveByJson(PKD_MI.getUIMapUserChestSettings());
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapChestFooter();
      return this._main.addChild(this._footer);
    }

    playStartSE() {
      return KDCore.Utils.playSE(this.settings.openChestSE);
    }

    _createExtraOptions() {} // * NOTHING

  };
  PKD_MI.register(Sprite_MapUserChestMain);
})();

// ■ END zSprite_MapUserChestMain_PRO.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Sprite_MI_AlternativeDescription;

Sprite_MI_AlternativeDescription = class Sprite_MI_AlternativeDescription extends KDCore.Sprite {
  constructor(cell, _isFromInventoryParam) {
    super();
    this.cell = cell;
    this._isFromInventoryParam = _isFromInventoryParam;
    this.settings = PKD_MI.getAlternativeDescSettingsForItem(this.cell.item);
    this._loadImage();
  }

  s() {
    return this.settings;
  }

  isLoaded() {
    return this._background != null;
  }

  _loadImage() {
    var b;
    b = ImageManager.loadPKDMI(this.s().background);
    this._backBitmap = b;
    if (b.isReady()) {
      return this._create();
    } else {
      return b.addLoadListener(this._create.bind(this));
    }
  }

  _create() {
    if (this._backBitmap == null) {
      return;
    }
    this._createBackground();
    this._createContent();
    return this.refreshPlacement(this._isFromInventoryParam);
  }

  _createBackground() {
    this._background = new KDCore.Sprite(this._backBitmap);
    return this.add(this._background);
  }

  _createContent() {
    this.content = new KDCore.Sprite();
    this._createName();
    this._createIcon();
    this._createDescription();
    this._background.add(this.content);
  }

  _createName() {
    var e, name, settings;
    try {
      settings = this.s().titleTextSettings;
      this.sprName = new KDCore.UI.Sprite_UIText(settings);
      name = this.cell.item.name;
      if (String.any(this.s().specialTitle)) {
        name = this.s().specialTitle;
      }
      this.sprName.draw(name);
      return this.content.add(this.sprName);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createIcon() {
    var e, extraImg, icon, settings, specialIconIndex, x, y;
    try {
      settings = this.s().iconSettings;
      icon = this.cell.item.iconIndex;
      extraImg = DataManager.getItemInvImage(this.cell.item);
      if (String.any(extraImg)) {
        icon = ImageManager.loadPKDMI_Icon(extraImg);
      }
      ({specialIconIndex} = this.s().iconSettings);
      if (String.any(specialIconIndex) || specialIconIndex > 0) {
        icon = specialIconIndex;
      }
      this.sprIcon = new KDCore.UI.Sprite_UIIcon({
        ...settings,
        index: icon
      });
      ({x, y} = settings.margins);
      this.sprIcon.move(x, y);
      return this.content.add(this.sprIcon);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createDescription() {
    var e, text;
    try {
      this.sprDesc = new KDCore.UI.Sprite_UITextExt(this.s().descriptionSettings);
      if (String.any(this.s().extraDescription)) {
        text = this.s().extraDescription;
      } else {
        text = this.cell.item.description;
      }
      this.sprDesc.draw(text);
      this.sprDesc.draw(text); // * this is not error, better call two times a row for MV
      return this.content.add(this.sprDesc);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  // * ==============     FROM Sprite_MapInvHelp =======================
  showItemStats() {} // * EMPTY

  delay() {
    return 20; //return PKD_MI.LIBS.Sprite_MapInvHelp::delay.call(@, ...arguments)
  }

  refreshPlacement(isFromInventory = true) {
    var e;
    try {
      return PKD_MI.LIBS.Sprite_MapInvHelp.prototype.refreshPlacement.call(this, ...arguments);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _refreshCornerPlacement() {} // * EMPTY

  _setDynamicPosition() {
    var e, x, y;
    try {
      ({x, y} = this.getSourcePos());
      if (x > Graphics.width / 2) {
        this.x = x - this._background.bitmap.width - this.s().marginX;
      } else {
        this.x = x + (this.s().marginX * 2);
      }
      this.y = Graphics.height / 2 - this._background.bitmap.height / 2;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.x = 0;
      this.y = 0;
    }
  }

  _setStaticPosition() {
    var e;
    try {
      return PKD_MI.LIBS.Sprite_MapInvHelp.prototype._setStaticPosition.call(this, ...arguments);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  getSourcePos() {
    return PKD_MI.LIBS.Sprite_MapInvHelp.prototype.getSourcePos.call(this, ...arguments);
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SpriteThrowOutBox.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var SpriteThrowOutBox;
  SpriteThrowOutBox = class SpriteThrowOutBox extends KDCore.Sprite {
    constructor(params, x, y) {
      super();
      this.params = params;
      this.x = x;
      this.y = y;
      this._create();
      this.x += this.params.margins.x;
      this.y += this.params.margins.y;
      return;
    }

    isReadyToThrow() {
      return this.isUnderMouse() && this.opacity >= 255;
    }

    update() {
      if (this.isUnderMouse()) {
        this.opacity += this.params.fadeOutSpeed;
      } else {
        this.opacity = this.params.startOpacity;
      }
      this.foreImage.visible = this.opacity < 255;
      this.foreImage2.visible = !this.foreImage.visible;
    }

    _create() {
      this.bitmap = ImageManager.loadPKDMI('dropOutZoneBack');
      this.foreImage = new Sprite(ImageManager.loadPKDMI('dropOutZoneFore'));
      this.foreImage2 = new Sprite(ImageManager.loadPKDMI('dropOutZoneFore2'));
      this.addChild(this.foreImage);
      this.addChild(this.foreImage2);
    }

  };
  PKD_MI.register(SpriteThrowOutBox);
})();

// ■ END SpriteThrowOutBox.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_TilingFrame.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(_width, _height, skin) {
      super();
      this._width = _width;
      this._height = _height;
      this._createParts();
      this.skinBitmap = ImageManager.loadPKDMI(skin);
      this.skinBitmap.addLoadListener(() => {
        return this._refreshAll();
      });
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      //@backSprite.addChild(new TilingSprite())
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this.frame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this.frame.addChild(new Sprite());
      }
      return this.addChild(this.frame);
    }

    _refreshAll() {
      this._refreshBack();
      //@_refreshFrame()
      return this._refreshTFrame();
    }

    _refreshBack() {
      var h, m, sprite, w;
      m = 2; // * Отступ, чтобы за рамку не выходить
      w = Math.max(0, this._width - m * 2);
      h = Math.max(0, this._height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      sprite.setFrame(0, 0, 96, 96);
      sprite.move(m, m);
      sprite.scale.x = w / 96;
      return sprite.scale.y = h / 96;
    }

    // * Координаты заливки фона из картинки
    //tilingSprite = sprite.children[0]
    //tilingSprite.bitmap = @skinBitmap
    //tilingSprite.setFrame(0, 96, 96, 96)
    //tilingSprite.move(0, 0, w, h)
    //tilingSprite.scale.x = 96 / w
    //tilingSprite.scale.y = 96 / h
    //sprite.setColorTone(@_colorTone)
    _refreshTFrame() {
      var drect, j, len, m, ref, spr, srect;
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this._width,
        height: this._height
      };
      // * Координаты рамки на картинке
      srect = {
        x: 96,
        y: 0,
        width: 96,
        height: 96
      };
      m = 12; // * Толщина
      ref = this.frame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      return Window.prototype._setRectPartsGeometry.call(this, this.frame, srect, drect, m);
    }

  };
  PKD_MI.register(Sprite_TilingFrame);
})();

// ■ END Sprite_TilingFrame.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_ExtraUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

//@[GLOBAL]
var Spriteset_InvUI;

Spriteset_InvUI = class Spriteset_InvUI extends Sprite {
  constructor() {
    super();
    this._initEU();
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  //?UPDX
  _._initEU = function() {
    this._inventorySprite = new PKD_MI.LIBS.Sprite_MapInvMain();
    this.inventory = new PKD_MI.LIBS.MapInvController(this._inventorySprite, this);
    this.uiExtraCells = [];
    this.addChild(this._inventorySprite);
    if (PKD_MI.Parameters.get_UseScreenButton() === true && PKD_MI.isPro()) {
      this._createMIButton();
    }
    if (PKD_MI.Parameters.get_UseOuterItems() === true && PKD_MI.isPro()) { //?line
      this._createOUTItems();
    }
  };
  //?UPDX
  _.isMouseInInventory = function() {
    if (this.isAnyOuterCellUnderMouse()) {
      return true;
    }
    if (this.isInventoryOpen()) {
      if (this._inventorySprite.isMouseIn()) {
        return true;
      }
    }
    if (this.isChestOpen()) {
      if (this._chestSprite.isMouseIn()) {
        return true;
      }
    } else if (this.isUserChestOpen()) {
      if (this._userChestSprite.isMouseIn()) {
        return true;
      }
    }
    return false;
  };
  //?UPD18
  _.allOpenedInstances = function() {
    var instances;
    instances = [];
    if (this.isInventoryOpen()) {
      instances.push(this.inventory);
    }
    if (this.isChestOpen()) {
      instances.push(this.chest);
    }
    if (this.isUserChestOpen()) {
      instances.push(this.userChest);
    }
    return instances;
  };
  _.openInventory = function() {
    var ce;
    ce = PKD_MI.Parameters.getOpenInvCE();
    if (ce > 0) {
      $gameTemp.reserveCommonEvent(ce);
    }
    // * Sound inside open method
    this.inventory.open();
    this.openCategory($gameTemp._lastInvCategory);
  };
  _.closeInventory = function() {
    var ce, se;
    if ($gameTemp._miInvenotryPickActive === true) {
      $gameTemp._miESM = null;
      this.inventory._onItemPickUpDone(0);
    }
    if (!$gameTemp.__miNotCloseSE) {
      se = PKD_MI.Parameters.getCloseInvSE();
      if (String.any(se)) {
        KDCore.Utils.playSE(se);
      } else {
        SoundManager.playCursor();
      }
      $gameTemp.__miNotCloseSE = null;
    }
    this.inventory.close();
    ce = PKD_MI.Parameters.getCloseInvCE();
    if (ce > 0) {
      $gameTemp.reserveCommonEvent(ce);
    }
  };
  _.isInventoryOpen = function() {
    return this.inventory.isInventoryActive();
  };
  _.openCategory = function(catId) {
    if (this.inventory.isSomeItemFocused()) {
      return;
    }
    if (catId == null) {
      catId = 0;
    }
    catId = this._checkAvailableCategory(catId);
    $gameTemp._lastInvCategory = catId;
    return this.inventory.loadItemsInCategory(catId);
  };
  //u22
  _._checkAvailableCategory = function(catId) {
    var avail, nextCatId;
    if (PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      // * Без проверок если новая система категорий
      return catId;
    }
    if (this._availCats == null) {
      avail = PKD_MI.getUIMapInventorySettings().availableCategories;
      if (!this._availCats) {
        this._availCats = [];
      }
      if (avail.items === true) {
        this._availCats.push(0);
      }
      if (avail.weapons === true) {
        this._availCats.push(1);
      }
      if (avail.armors === true) {
        this._availCats.push(2);
      }
      if (avail.keyItems === true) {
        this._availCats.push(3);
      }
      return this._checkAvailableCategory(catId);
    } else {
      if (this._availCats.contains(catId)) {
        return catId;
      } else {
        nextCatId = catId + 1;
        if (nextCatId >= 4) {
          nextCatId = 0;
        }
        return this._checkAvailableCategory(nextCatId);
      }
    }
  };
  //?UPDX
  _.refreshInventory = function() {
    var e;
    try {
      $gameParty.requestWeightCapacityRefresh();
      $gameParty._refreshInventoryWAutoState();
      $gamePlayer.refreshInventoryWSpeedDebuff();
      if (this.isInventoryOpen()) {
        this.openCategory($gameTemp._lastInvCategory);
      }
      return setTimeout((() => {
        var e;
        try {
          return this.refreshMapHotCells();
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }), 50);
    } catch (error) {
      e = error;
      return PKD_MI.warning(e);
    }
  };
  _.showNextInvPage = function() {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.showNextPage();
  };
  _.showPrevInvPage = function() {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.showPrevPage();
  };
  _.showNextChestPage = function() {
    var ref, ref1;
    if ((ref = this.chest) != null) {
      ref.showNextPage();
    }
    return (ref1 = this.userChest) != null ? ref1.showNextPage() : void 0;
  };
  _.showPrevChestPage = function() {
    var ref, ref1;
    if ((ref = this.chest) != null) {
      ref.showPrevPage();
    }
    return (ref1 = this.userChest) != null ? ref1.showPrevPage() : void 0;
  };
  //?UPDX
  _.clickInvItem = function(index) {
    if ($gameTemp._pkdMICellMoving === true) { //?line
      return;
    }
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAt(index);
  };
  _.activateHotKey = function(index) {};
  //return false unless @isInventoryOpen()
  //return false unless PKD_MI.isABS()
  //return @inventory.placeItemToPanel(index)
  _.activateFavKey = function(index) {};
  //return false unless @isInventoryOpen()
  //return false unless PKD_MI.isABS()
  //return @inventory.placeWeaponToFavorite(index)

  //?UPDX
  _.update = function() {
    var ref, ref1;
    Sprite.prototype.update.call(this);
    this.inventory.update();
    if ((ref = this.chest) != null) {
      ref.update();
    }
    if ((ref1 = this.userChest) != null) {
      ref1.update();
    }
    if ((this.chest != null) || (this.userChest != null)) {
      this._updateChestClose();
    }
    this._updateOuterCells(); //?line
    return this._updateExHelpWindow();
  };
  //?UPDX, PRO
  _._updateOuterCells = function() {}; //*EMPTY
  _.terminate = function() {
    var ref, ref1;
    this.inventory.terminate();
    if ((ref = this.chest) != null) {
      ref.terminate();
    }
    return (ref1 = this.userChest) != null ? ref1.terminate() : void 0;
  };
  // * ============= CHEST ==============================
  _.openMapChest = function() {
    if (this.isUserChestOpen()) {
      this.closeUserChest();
    }
    this._chestSprite = new PKD_MI.LIBS.Sprite_MapChestMain();
    this.chest = new PKD_MI.LIBS.MapChestController(this._chestSprite, this);
    this.chest.open();
    if ($gameTemp.__aaItemsForChest != null) {
      this.chest.loadItemsInCategory();
    }
    this.chest._moveToLastPos();
    this.addChild(this._chestSprite);
  };
  //u21
  _.closeMapChest = function() {
    var ref, ref1;
    if ((ref = this.chest) != null ? ref.isTakeAllDelayedProcess() : void 0) { //line21
      return;
    }
    if ((ref1 = this.chest) != null) {
      ref1.close();
    }
    this.saveStoredChest();
    if (this._chestSprite != null) {
      this.removeChild(this._chestSprite);
    }
    this.chest = null;
  };
  _.saveStoredChest = function() {
    var e, itemsToStore, key;
    try {
      if ($gameTemp.__isStoredVisualChestShouldOpened !== true) {
        return;
      }
      itemsToStore = PKD_MI.LIBS.CStoredItems.FromChestItems($gameTemp.__aaItemsForChest);
      key = $gameTemp.__storedVisualChestId;
      $gamePlayer.aaRegisterStoredChest(key[0], key[1], itemsToStore);
      $gameTemp.__storedVisualChestId = null;
      $gameTemp.__aaItemsForChest = [];
      $gameTemp.__isStoredVisualChestShouldOpened = false;
    } catch (error) {
      e = error;
      PKD_MI.warning('saveStoredChest', e);
    }
  };
  _.takeAllFromChest = function() {
    var ref, ref1;
    // * Два одновременно не могут быть открыты
    if ((ref = this.chest) != null) {
      ref.takeAll();
    }
    return (ref1 = this.userChest) != null ? ref1.takeAll() : void 0;
  };
  _.isChestOpen = function() {
    return this.chest != null;
  };
  _.clickChestItem = function(index) {
    var ref;
    return (ref = this.chest) != null ? ref.clickAt(index) : void 0;
  };
  //?UPD18
  _._updateChestClose = function() {
    if (Input.isCancel()) {
      if (PKD_MI.isCellUnderRightClick()) {

      } else {
        // * NOTHING
        this.closeMapChest();
        this.closeUserChest();
        Input.clear();
        TouchInput.clear();
      }
    }
  };
  // * ======================== USER CHEST ==============
  _.openUserChest = function() {
    if (this.isChestOpen()) {
      this.closeMapChest();
    }
    this._userChestSprite = new PKD_MI.LIBS.Sprite_MapUserChestMain();
    this.userChest = new PKD_MI.LIBS.MapUserChestController(this._userChestSprite, this);
    this.userChest.open();
    this.userChest._moveToLastPos();
    this.userChest.loadItemsInCategory();
    this.addChild(this._userChestSprite);
    this.refreshUserChest();
  };
  _.isUserChestOpen = function() {
    return this.userChest != null;
  };
  _.closeUserChest = function() {
    var ref;
    if ((ref = this.userChest) != null) {
      ref.close();
    }
    if (this._userChestSprite != null) {
      this.removeChild(this._userChestSprite);
    }
    this._userChestSprite = null;
    this.userChest = null;
  };
  _.refreshUserChest = function() {
    if (this.isUserChestOpen()) {
      return this.openUserChestCategory($gameTemp._newUserChestCat);
    }
  };
  _.openUserChestCategory = function(catId) {
    if (catId == null) {
      catId = 0;
    }
    catId = this._checkAvailableCategory(catId);
    this.userChest.loadItemsInCategory(catId);
    if (PKD_MI.getUIMapUserChestSettings().isLinkedCategories === true) {
      if (this.isInventoryOpen()) {
        return this.openCategory(catId);
      }
    }
  };
  _.clickUserChestItem = function(index) {
    var ref;
    return (ref = this.userChest) != null ? ref.clickAt(index) : void 0;
  };
  // * ============================ UPDATE 1.1 =========================
  _.clickInvFocusedItem = function(index) {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAtFocusItem(index);
  };
  _.clickInvPartyActor = function(actor) {
    if (!this.isInventoryOpen()) {
      return;
    }
    return this.inventory.clickAtPartyActor(actor);
  };
  _.refreshStoredChest = function() {
    var ref;
    return (ref = this.chest) != null ? ref.loadItemsInCategory() : void 0;
  };
  // * ============================ UPDATE 1.4 =========================
  _.getMIButton = function() {
    return this._button;
  };
  _.isMouseInIButton = function() {
    if ((this._button != null) && this._button.visible === true) {
      return this._button.cursorInButton();
    } else {
      return false;
    }
  };
  // * ============================ UPDATE 1.6 =========================

  //?UPDX
  _.isAnyOuterCellUnderMouse = function() {
    var c, i, len, ref;
    if (!PKD_MI.isPro()) {
      return false;
    }
    if (this.uiExtraCells == null) {
      return false;
    }
    ref = this.uiExtraCells;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c.isHovered()) {
        return true;
      }
    }
    return false;
  };
})();

// ■ END Spriteset_ExtraUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawItemName, ALIAS__resetTextColor, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__drawItemName = _.drawItemName;
  _.drawItemName = function(item, x, y, width) {
    var color, qualityLevel;
    this.__pkdMiRequestedSpecialColor = null;
    if (PKD_MI.Parameters.isShowItemNameWithQualityColorInWindows() && (item != null)) {
      qualityLevel = DataManager.getItemQualityLevel(item);
      if (qualityLevel >= 0) {
        color = PKD_MI.GetColorForQuealityLevel(qualityLevel);
        this.__pkdMiRequestedSpecialColor = color;
      }
    }
    ALIAS__drawItemName.call(this, item, x, y, width);
  };
  //@[ALIAS]
  ALIAS__resetTextColor = _.resetTextColor;
  _.resetTextColor = function() {
    ALIAS__resetTextColor.call(this);
    if (this.__pkdMiRequestedSpecialColor != null) {
      this.changeTextColor(this.__pkdMiRequestedSpecialColor);
      this.__pkdMiRequestedSpecialColor = null;
    }
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Window_ExtendedTextLine;

Window_ExtendedTextLine = class Window_ExtendedTextLine extends Window_Base {
  constructor(x, y, w, h, fontSize, fontFace) {
    super(x, y, w, h);
    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.createContents();
    this.setBackgroundType(2);
  }

  updatePadding() {
    return this.padding = 0;
  }

  itemPadding() {
    return 0;
  }

  drawTextFull(text) {
    this.contents.clear();
    return this.drawTextEx(text, 0, 0);
  }

  // * Дорабатываем метод Move, чтобы работал как и у Sprite (два параметра)
  move(val1, val2, height) {
    if (val1 instanceof Array) {
      this.x = val1[0];
      this.y = val1[1];
    } else if (val1.x != null) {
      this.x = val1.x;
      this.y = val1.y;
    } else if (height == null) {
      this.x = val1;
      this.y = val2;
    } else {
      super.move(...arguments);
    }
  }

  resetFontSettings() {
    super.resetFontSettings();
    if (String.any(this.fontFace)) {
      this.contents.fontFace = this.fontFace;
    }
    if (this.fontSize > 0) {
      this.contents.fontSize = this.fontSize;
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isAnySubWindowActive, ALIAS__startInput, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startInput = _.startInput;
  _.startInput = function() {
    if (PKD_MI.Parameters.isNewItemSelectMode() && $gameMessage.isItemChoice()) {
      // * Специальный флаг, что в режиме выбора предметов
      $gameTemp._miInvenotryPickActive = true;
      $gameTemp._miMsgWinRef = this;
      PKD_MI.startItemSelect($gameMessage.itemChoiceItypeId());
      return true;
    } else {
      return ALIAS__startInput.call(this);
    }
  };
  
  //@[ALIAS]
  ALIAS__isAnySubWindowActive = _.isAnySubWindowActive;
  _.isAnySubWindowActive = function() {
    return ALIAS__isAnySubWindowActive.call(this) || $gameTemp._miInvenotryPickActive === true;
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ShopBuy.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__isEnabled, _;
  //@[DEFINES]
  _ = Window_ShopBuy.prototype;
  //@[ALIAS]
  ALIAS__isEnabled = _.isEnabled;
  _.isEnabled = function(item) {
    return ALIAS__isEnabled.call(this, item) && $gameParty.isCanAddNewItem(item);
  };
})();

// ■ END Window_ShopBuy.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapChestController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapChestController;
  MapChestController = class MapChestController extends PKD_MI.LIBS.MapInvController {
    constructor() {
      super(...arguments);
      this.goldRefreshThread = null;
      this._isTakeAllDelayed = false; //u21 line
      return;
    }

    _onGoldTick() {} // * EMPTY

    
      //u21
    isTakeAllDelayedProcess() {
      return this._isTakeAllDelayed === true;
    }

    //u19
    //u21
    close() {
      if (this.isTakeAllDelayedProcess()) { //u21 line
        return;
      }
      PKD_MI.LIBS.MapInvController.prototype.close.call(this);
      $gameTemp.__aaVisualChestLimitCount = null;
      $gameTemp.__visualChestGoldCell = null;
    }

    //u20
    //u21
    updateWhenOpen() {
      var key, ref, ref1;
      // * Инвентарь "зависает" пока идёт анимация забора предметов
      this._updateTakeAllDelayed(); //u21 line
      if (this.isTakeAllDelayedProcess()) { //u21 line
        return;
      }
      this.refreshTitle.update();
      this._updateInvDrag();
      this._updateHelp(); //?{PART}
      if (this.isSomeItemFocused()) {
        this.updateClearFocusClick();
      }
      key = PKD_MI.Parameters.get_ChestTakeAllKey();
      if (Input.isTriggered(key)) {
        this.takeAll();
      }
      if ((ref = this._autoCloseThread) != null) {
        ref.update();
      }
      if ((ref1 = $gameTemp.__visualChestGoldCell) != null) {
        ref1.drawCount($gameTemp.__visualChestGoldCount);
      }
      this._updateGamepadControl();
    }

    _onTitleTick() {
      var cellUnderMouse;
      cellUnderMouse = this.content.getHoveredCell();
      if ((cellUnderMouse != null) && (cellUnderMouse.item != null)) {
        return this.content.drawItemName(cellUnderMouse.item.name);
      } else {
        if (PKD_MI.isHaveSomeTypeLimit()) {
          return this.content.drawItemName($gameTemp._visualChestRestrictionTypesRaw);
        } else {
          return this.content.drawItemName("");
        }
      }
    }

    _moveToLastPos() {
      if ($gameTemp.__lastVChestDragPos != null) {
        return this.invSprite.move($gameTemp.__lastVChestDragPos);
      }
    }

    _saveLastDragPos() {
      return $gameTemp.__lastVChestDragPos = [this.invSprite.x, this.invSprite.y];
    }

    //u19
    //u22
    loadItemsInCategory(catIndex = 9999) {
      if (!this.isInventoryActive()) {
        return;
      }
      if (this.isSomeItemFocused()) {
        return;
      }
      this._hideHelp();
      this._onNewCategoryWillLoad();
      this._loadedCatIndex = 9999; // * 9999 - CHEST
      this.content.clearAllItems();
      this.showAllChestItems();
      if ($gameTemp.__aaVisualChestLimitCount != null) {
        this.content.prepareForCategory(this._loadedCatIndex);
      }
      return this._onNewCategoryLoaded();
    }

    //u21
    showAllChestItems() {
      if (PKD_MI.Parameters.isCellLockSystemAllowed()) {
        if (($gameTemp.__aaVisualChestLimitCount != null) && $gameTemp.__aaVisualChestLimitCount > 0) {
          $gameTemp.__aaItemsForChest = $gameTemp.__aaItemsForChest.slice(0, $gameTemp.__aaVisualChestLimitCount);
        }
      }
      this._loadedItems = $gameTemp.__aaItemsForChest;
      this._loadedItems.delete(null);
      this._prepareLoadItems(); //line
      this._concatItems();
      this._setPages();
      return this._showItemsGroup(0);
    }

    //u21
    _prepareLoadItems() {
      var actualItem, count, item, j, k, l, len, ref, ref1, splendidItems;
      if (Imported.YEP_ItemCore !== true) {
        return;
      }
      if (Imported.DreamX_RandomPrefixSuffix !== true) {
        return;
      }
      splendidItems = [];
      ref = this._loadedItems;
      for (k = 0, len = ref.length; k < len; k++) {
        item = ref[k];
        if (item == null) {
          continue;
        }
        count = item[1];
        if (count > 1 && !DataManager.isItem(item[0])) {
          for (j = l = 0, ref1 = count; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
            actualItem = DreamX.RandomPrefixSuffix.makeItem(item[0]);
            splendidItems.push([actualItem, 1]);
          }
        } else {
          if (!DataManager.isItem(item[0])) {
            actualItem = DreamX.RandomPrefixSuffix.makeItem(item[0]);
            splendidItems.push([actualItem, 1]);
          } else {
            splendidItems.push(item);
          }
        }
      }
      this._loadedItems = splendidItems;
      $gameTemp.__aaItemsForChest = splendidItems;
    }

    _concatItems() {
      var i, j, k, l, ref, ref1, ref2;
      if (this._loadedItems.length <= 1) {
        return;
      }
      for (i = k = 0, ref = this._loadedItems.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
        for (j = l = ref1 = i, ref2 = this._loadedItems.length; (ref1 <= ref2 ? l < ref2 : l > ref2); j = ref1 <= ref2 ? ++l : --l) {
          if (i === j) {
            continue;
          }
          if (this._loadedItems[i][0] === this._loadedItems[j][0]) {
            this._loadedItems[i][1] += this._loadedItems[j][1];
            this._loadedItems.splice(j, 1);
            this._concatItems();
            return;
          }
        }
      }
    }

    _setItemToCell(cell, item) {
      return cell.setChestItem(item);
    }

    _refreshCategoryButtons() {} // * EMPTY

    clickAt(index) {
      if (this._loadedCatIndex !== 9999) {
        return;
      }
      return this._onChestAction(index + (this._currentPage * this.MAX));
    }

    //u21
    _onChestAction(index) {
      var e, itemData;
      if (this.isSomeItemFocused()) {
        return;
      }
      if (this.isTakeAllDelayedProcess()) {
        return;
      }
      itemData = this._loadedItems[index];
      if (itemData == null) {
        return;
      }
      try {
        if (PKD_MI.isGoldItem(itemData[0])) {
          return this._onGainGoldItem(index);
        } else {
          return this._onGainItem(index, itemData);
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning('When try take item from visual chest', e);
      }
    }

    //u19
    _onGainGoldItem(index) {
      this._onGainGoldItemProcess(index);
      this.loadItemsInCategory(this._loadedCatIndex);
      this._checkToAutoClose();
      SoundManager.playCursor();
    }

    //u19
    _onGainGoldItemProcess(index) {
      var count;
      count = $gameTemp.__visualChestGoldCount;
      $gameParty.gainGold(count);
      $gameTemp.__aaItemsForChest[index] = null;
      $gameTemp.__visualChestGoldCount = 0;
    }

    //u19
    _onGainItem(index, itemData, fast = false) {
      var item, realCount, resultCount;
      resultCount = itemData[1];
      item = itemData[0];
      realCount = this._getItemCountToReturn(resultCount, item);
      if (realCount <= 0) {
        SoundManager.playBuzzer();
        return;
      }
      if (!$gameParty.isCanAddNewItem(itemData[0])) {
        SoundManager.playBuzzer();
        return;
      }
      if (realCount === 1 || fast === true || !PKD_MI.isUseSlider()) {
        this._onGainItemFinal(index, itemData, realCount);
        if (fast === false) { // * Если множественный, то в другом месте перезагрузка
          this.loadItemsInCategory(this._loadedCatIndex);
          this._checkToAutoClose();
          SoundManager.playCursor();
        }
      } else {
        this._onGainItemWithSlider(index, itemData, realCount);
      }
    }

    _onGainItemWithSlider(index, itemData, realCount) {
      var cell;
      cell = this.content.getCellAt(index);
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, itemData[1]);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 1);
      this._tempSliderIndex = index;
      this._tempSliderItem = itemData;
      this._tempSliderMaxValue = realCount;
      return this.content.refreshSlider(realCount, this._isSliderNewValueIsAllowed(realCount));
    }

    _onGainItemFinal(index, itemData, realCount) {
      $gameParty.gainItem(itemData[0], realCount);
      $gameTemp.__aaItemsForChest[index][1] = itemData[1] - realCount;
      if ($gameTemp.__aaItemsForChest[index][1] <= 0) {
        return $gameTemp.__aaItemsForChest[index] = null;
      }
    }

    
      //$[OVER BASE]
    onSliderOkClick() {
      if (!this.isSomeItemFocused()) {
        return;
      }
      this.clearFocus();
      this._onGainItemFinal(this._tempSliderIndex, this._tempSliderItem, this.content.getSliderValue());
      this._tempSliderItem = null;
      this._tempSliderIndex = 0;
      this.loadItemsInCategory(this._loadedCatIndex);
      this._checkToAutoClose();
      return SoundManager.playCursor();
    }

    //$[OVER BASE]
    getMaxValueForSlider() {
      return this._tempSliderMaxValue;
    }

    //21
    takeAll() {
      var e;
      try {
        if (this.isTakeAllDelayedProcess()) {
          return;
        }
        this._takeAllDelay = PKD_MI.Parameters.getTakeAllDelay();
        if (this._takeAllDelay > 0) {
          this._takeAllDelayed();
        } else {
          this._takeAllNormal();
        }
      } catch (error) {
        e = error;
        PKD_MI.warning('When try take ALL from visual chest', e);
      }
    }

    //21
    _takeAllDelayed() {
      this.clearFocus();
      SoundManager.playCursor();
      this._isTakeAllDelayed = true;
    }

    //21
    _updateTakeAllDelayed() {
      var itemData;
      if (!this.isTakeAllDelayedProcess()) {
        return;
      }
      if ($gameTemp.__aaItemsForChest.length === 0) {
        this._isTakeAllDelayed = false;
        this.loadItemsInCategory(this._loadedCatIndex);
        this._checkToAutoClose();
        return;
      }
      this._takeAllDelay--;
      if (this._takeAllDelay <= 0) {
        this._takeAllDelay = PKD_MI.Parameters.getTakeAllDelay();
        itemData = $gameTemp.__aaItemsForChest[0];
        if (itemData != null) {
          if (PKD_MI.isGoldItem(itemData[0])) {
            this._onGainGoldItemProcess(0);
          } else {
            this._onGainItem(0, itemData, true);
          }
        }
        $gameTemp.__aaItemsForChest.delete(null);
        this.loadItemsInCategory(this._loadedCatIndex);
      }
    }

    //21
    _takeAllNormal() {
      var e, index, itemData, k, len, ref;
      try {
        this.clearFocus();
        ref = $gameTemp.__aaItemsForChest;
        for (index = k = 0, len = ref.length; k < len; index = ++k) {
          itemData = ref[index];
          if (PKD_MI.isGoldItem(itemData[0])) {
            this._onGainGoldItemProcess(index);
          } else {
            if (itemData != null) {
              this._onGainItem(index, itemData, true);
            }
          }
        }
        SoundManager.playCursor();
      } catch (error) {
        e = error;
        PKD_MI.warning('When try take ALL (normal) from visual chest', e);
      }
      this.loadItemsInCategory(this._loadedCatIndex);
      this._checkToAutoClose();
    }

    _checkToAutoClose() {
      if (this._loadedItems.length === 0) {
        this._autoCloseThread = new KDCore.TimedUpdate(20, this.__onAutoCloseTick.bind(this));
        return this._autoCloseThread.once();
      }
    }

    __onAutoCloseTick() {
      var e;
      try {
        PKD_MI.closeChest();
        if (PKD_MI.Parameters.isCloseInventoryWithTakeAll()) {
          return PKD_MI.closeInventory();
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    //u20
    _onGPPrevCategory() {} // * EMPTY

    _onGPNextCategory() {} // * EMPTY

    
      //u20
    _onGPRefreshAfterChangeIndex() {
      return this.loadItemsInCategory(9999);
    }

    //u20
    _onGPKeyIsOk() {
      var cell;
      if (this.inSliderMode()) {
        this.onSliderOkClick();
      } else {
        if (this.isSomeItemFocused() || this.isTakeAllDelayedProcess()) { //u21

        } else {
          // * NOTHING
          cell = this._getGPSelectedCell();
          if (cell == null) {
            return;
          }
          PKD_MI.onChestCellClick(cell.index);
        }
      }
    }

    //u20
    _onGPKeyClose() {
      return PKD_MI.closeChest();
    }

    //u20
    _onGPExtraKey() {
      return PKD_MI.takeAllFromChest();
    }

  };
  PKD_MI.register(MapChestController);
})();

// ■ END MapChestController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  //?UPD18, u23
  _._updateHelp = function() {
    var haveExtraInfo, hovered;
    if (this._itemDescShowTimer != null) {
      this._itemDescShowTimer.update();
    }
    hovered = this.content.getHoveredCell();
    if (PKD_MI.IsGamepad() && !this.isInventoryWindowInFocus()) {
      hovered = null;
    }
    haveExtraInfo = this._isCellHaveExtraInfo(hovered);
    if ((hovered != null) && (hovered.item != null) && haveExtraInfo === false) {
      this._hideExtraInfo();
      this._showHelp(hovered);
    } else {
      this._hideHelp();
      if (haveExtraInfo === true) {
        this._showExtraInfo(hovered);
      } else {
        this._hideExtraInfo();
      }
    }
  };
  //u23
  _._showHelp = function(cell) {
    if (this.__lastHelpItem === cell) {
      return;
    } else {
      this._hideHelp();
      this.__lastHelpItem = cell;
      this.layer._createHelpWindow(cell, true);
    }
  };
  //u23
  _._hideHelp = function() {
    if (this.__lastHelpItem == null) {
      return;
    }
    this.__lastHelpItem = null;
    this.layer._hideHelp();
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  //?u20
  _._aaOnABSItemAction = function(item) {
    var e;
    try {
      if (item != null) {
        //TODO: refresh inventory after skill USE (in ABS)
        $gamePlayer.aaTryPerformSkill(item.idA);
      }
      return setTimeout((function() {
        var e;
        try {
          return PKD_MI.refreshInventory();
        } catch (error) {
          e = error;
        }
      }), 100);
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
  //?UPDX
  //?u20, u23
  _._onActionOnGameItem = function(cell) {
    var item, usecaseOnlyFor;
    //TODO: Можно вынести как расширение, а не каждый раз проверять
    if (PKD_MI.IsABSItem(cell.item)) {
      // * ABS предмет (Alpha ABS Z)
      if (AA.isABSActive()) {
        // * Если АБС активна то используем как АБС предмет (не нужен выбор группы)
        this._aaOnABSItemAction(cell.item); // * Выход из метода
        return;
      }
    }
    
    //TODO: Это надо удалять ???
    if (cell._inSpecialState === true) {

    } else {
      // * THIS IS FOR ABS only
      //indexOnPanel = $gameParty.leader().skillIndexOnUI(cell.item.id, true)
      //$gamePlayer.touchSkillAt(indexOnPanel + 1) if indexOnPanel >= 0
      item = cell.item;
      usecaseOnlyFor = PKD_MI.getItemOnlyActorIdUsecase(item);
      if (usecaseOnlyFor > 0) {
        if (PKD_MI.isHaveActorIdInParty(usecaseOnlyFor)) {
          this.useInventoryItem($gameActors.actor(usecaseOnlyFor), item);
        } else {
          SoundManager.playBuzzer();
        }
        return;
      }
      // * Если нет цели, если использовать в меню или всегда, то выполнять сразу
      if ((item != null) && item.scope === 0 && (item.occasion === 0 || item.occasion === 2)) {
        this.useInventoryItem($gameParty.leader(), cell.item);
        return;
      }
      if (PKD_MI.isPartyInventoryAllowed() && !cell.isHotCell) { //?line
        this._tempItemForParty = cell.item;
        $gameTemp._tempItemForParty = cell.item;
        this._onPartySelectItemClick(cell);
      } else {
        //$gamePlayer.startSimpleItemFromInventory(cell.item)
        this.useInventoryItem($gameParty.leader(), cell.item);
      }
    }
  };
  _._onPartySelectItemClick = function(cell) {
    //@invSprite.setFocusedMode(cell)
    this.content.showFocusLayer();
    this.content.showFocusedItem(cell, $gameParty.numItems(cell.item));
    return this.partyController = new PKD_MI.LIBS.MapInvPartySelectCntrl(this.content, cell.partyUsecases);
  };
  _.isSomeItemFocused = function() {
    var ref;
    return (ref = this.content) != null ? ref.isFocused() : void 0;
  };
  _.clickAtFocusItem = function(index) {
    return this.clearFocus();
  };
  _.clearFocus = function() {
    var ref, ref1;
    if ((ref = this.partyController) != null) {
      ref.close();
    }
    if ((ref1 = this.sliderController) != null) {
      ref1.close();
    }
    this.sliderController = null;
    this.content.clearFocus();
    this.loadItemsInCategory(this._loadedCatIndex);
    return $gameTemp._pkdMICellFocused = false;
  };
  _.updateClearFocusClick = function() {
    if (TouchInput.isTriggered()) {
      if (this.content.isMouseInFocusZone()) {
        return this.clearFocus();
      }
    }
  };
  _.clickAtPartyActor = function(actor) {
    this.partyController.close();
    if (DataManager.isItem(this._tempItemForParty)) {
      return this.useInventoryItem(actor, this._tempItemForParty);
    } else {
      return this._equipInventoryItemOnActor(actor, this._tempItemForParty);
    }
  };
  //u23
  _.useInventoryItem = function(actor, item) {
    var actorIndex, e;
    if (item == null) {
      return;
    }
    try {
      actorIndex = PKD_MI.partyGroup().indexOf(actor);
      if (actorIndex < 0) {
        return;
      }
      SoundManager.playUseItem();
      $gameParty.setLastItem(item);
      actor.useItem(item);
      this.item = function() {
        return item;
      };
      this.user = function() {
        return actor;
      };
      this._actorWindow = {};
      this._actorWindow.index = function() {
        return actorIndex;
      };
      this.itemTargetActors = function() {
        return Scene_Item.prototype.itemTargetActors.call(this);
      };
      Scene_Item.prototype.applyItem.call(this);
      //Scene_Item::checkCommonEvent.call(@)
      Scene_Item.prototype.checkGameover.call(this);
      delete this._actorWindow;
      delete this.item;
      delete this.user;
      delete this.itemTargetActors;
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
    }
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //?UPD18 all

  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _._isCellHaveExtraInfo = function(cell) {
    if (!TouchInput.kdIsPressed2()) {
      return false;
    }
    if (cell == null) {
      return false;
    }
    if (cell.item == null) {
      return false;
    }
    return PKD_MI.IsHaveExtraInfo(cell.item);
  };
  _._hideExtraInfo = function() {
    if (this.__lastExtraInfoCell == null) {
      return;
    }
    this._destroyExtraHelpWindow();
    return this.__lastExtraInfoCell = null;
  };
  _._showExtraInfo = function(cell) {
    var info;
    if (this.__lastExtraInfoCell === cell) {

    } else {
      this._hideExtraInfo();
      this.__lastExtraInfoCell = cell;
      info = PKD_MI.GetExtraInfo(cell.item);
      if (info != null) {
        return this._createExtraHelpWindow(info);
      }
    }
  };
  _._createExtraHelpWindow = function(info) {
    this._itemExtraHelpWindow = new PKD_MI.LIBS.Sprite_ItemExtraInfo(info);
    return this.layer.addChild(this._itemExtraHelpWindow);
  };
  _._destroyExtraHelpWindow = function() {
    if (this._itemExtraHelpWindow == null) {
      return;
    }
    this.layer.removeChild(this._itemExtraHelpWindow);
    this._itemExtraHelpWindow.visible = false;
    return this._itemExtraHelpWindow = null;
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _._onActionOnEquipItem = function(cell) {
    var etype;
    etype = cell.item.etypeId;
    if (cell._inSpecialState === false) {
      this.equipInventoryItem(cell);
    } else {
      if (cell.isCanBeUnEquiped()) {
        this._unEquipItem(cell);
      } else {
        SoundManager.playBuzzer();
        return;
      }
    }
    return this.loadItemsInCategory(this._loadedCatIndex);
  };
  _._unEquipItem = function(cell) {
    var actor, etype;
    etype = cell.item.etypeId;
    actor = cell._getEquipmentActor();
    return this._equipFromInv(actor, etype, null);
  };
  
  //?UPDX, u23
  _.equipInventoryItem = function(cell) {
    var usecaseOnlyFor;
    usecaseOnlyFor = PKD_MI.getItemOnlyActorIdUsecase(cell.item);
    if (usecaseOnlyFor > 0) {
      if (PKD_MI.isHaveActorIdInParty(usecaseOnlyFor)) {
        this._equipInventoryItemOnActor($gameActors.actor(usecaseOnlyFor), cell.item);
      } else {
        SoundManager.playBuzzer();
      }
      return;
    }
    if (PKD_MI.isPartyInventoryAllowed() && !cell.isHotCell) { //?line
      this._tempItemForParty = cell.item;
      $gameTemp._tempItemForParty = cell.item;
      this._onPartySelectItemClick(cell);
    } else {
      this._equipInventoryItemOnActor($gameParty.leader(), cell.item);
    }
  };
  _._equipInventoryItemOnActor = function(actor, item) {
    var etype;
    etype = item.etypeId;
    if (actor.isEquipTypeLocked(etype)) {
      SoundManager.playBuzzer();
    } else {
      this._equipFromInv(actor, etype, item);
      this.loadItemsInCategory(this._loadedCatIndex);
    }
  };
  _._getItemCountToReturn = function(resultCount, item) {
    var c;
    c = this._getItemCountByMaxLimit(resultCount, item);
    if (c > 0 && PKD_MI.Parameters.get_UsedWSystem()) {
      c = this._getItemCountByWeight(c, item);
    }
    return c;
  };
  _._getItemCountByMaxLimit = function(resultCount, item) {
    var haveCount, maxCount, newCount;
    haveCount = $gameParty.numItems(item);
    maxCount = $gameParty.maxItems(item);
    if (resultCount <= (maxCount - haveCount)) {
      // * Предметы вмещаются
      return resultCount; // * Предметы не вмещаются
    } else {
      newCount = maxCount - haveCount;
      return newCount;
    }
  };
  _._getItemCountByWeight = function(resultCount, item) {
    var finalW, freeW, w;
    freeW = $gameParty.getMaxWeightCapacity() - $gameParty.getCurrentWeight();
    w = DataManager.getItemWeight(item);
    if (w === 0) {
      return resultCount;
    }
    finalW = resultCount * w;
    if (finalW <= freeW) {
      return resultCount;
    } else {
      if (w > freeW) { // * Даже один нельзя
        this._requestNoWeightNotify();
        return 0;
      } else {
        this._requestNoWeightNotify();
        return Math.floor(freeW / w);
      }
    }
  };
  _._requestNoWeightNotify = function() {
    return PKD_MI.requestWeigthNotify();
  };
  _._executeNoWeightNotify = function() {
    return this.invSprite._footer.pulseWeightText();
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //?UPD20 all

  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _._updateGamepadControl = function() {
    if (!this.isInventoryActive()) {
      return;
    }
    if (!PKD_MI.IsGamepad()) {
      return;
    }
    // * Данное окно в фокусе
    if (!this.isInventoryWindowInFocus()) {
      return;
    }
    if (KDGamepad.isKey("B")) {
      if (this.isSomeItemFocused() || this.inSliderMode()) {
        this.clearFocus();
      } else {
        this._onGPKeyClose();
        KDGamepad.clear(); // * Not for another window
      }
      return;
    } else if (KDGamepad.isKey("A")) {
      this._onGPKeyIsOk();
      return;
    } else if (KDGamepad.isKey("Y")) {
      this._onGPExtraKey();
    } else if (KDGamepad.isKey("X")) {
      if (this.layer._itemDescWindow != null) {
        this.layer._itemDescWindow.showItemStats();
      }
    } else if (KDGamepad.isKey("Start")) {
      this._onGPChangeFocus();
      KDGamepad.clear(); // * Not for another window
    } else if (KDGamepad.isKey("dUp")) {
      if (this.inSliderMode()) {
        this._gpMoveSlider(2); // * MAX VALUE
      } else if (this.isSomeItemFocused()) {
        this._gpSelectParty(3); // * up
      } else {
        this._gpInvIndexY -= 1;
        if (this._gpInvIndexY < 0) {
          this._gpInvIndexY = this._gpColumns - 1;
        }
        this._onGPKeyIsPressed();
      }
    } else if (KDGamepad.isKey("dDown")) {
      if (this.inSliderMode()) {
        this._gpMoveSlider(0); // * MIN VALUE
      } else if (this.isSomeItemFocused()) {
        this._gpSelectParty(2); // * down
      } else {
        this._gpInvIndexY += 1;
        if (this._gpInvIndexY >= this._gpColumns) {
          this._gpInvIndexY = 0;
        }
        this._onGPKeyIsPressed();
      }
    } else if (KDGamepad.isKey("dLeft")) {
      if (this.inSliderMode()) {
        this._gpMoveSlider(-1);
      } else if (this.isSomeItemFocused()) {
        this._gpSelectParty(0); // * left
      } else {
        this._gpInvIndexX -= 1;
        if (this._gpInvIndexX < 0) {
          this._gpInvIndexX = this._gpRows - 1;
        }
        this._onGPKeyIsPressed();
      }
    } else if (KDGamepad.isKey("dRight")) {
      if (this.inSliderMode()) {
        this._gpMoveSlider(1);
      } else if (this.isSomeItemFocused()) {
        this._gpSelectParty(1); // * right
      } else {
        this._gpInvIndexX += 1;
        if (this._gpInvIndexX >= this._gpRows) {
          this._gpInvIndexX = 0;
        }
        this._onGPKeyIsPressed();
      }
    } else if (KDGamepad.isKey("LB")) {
      this._onGPPrevCategory();
    } else if (KDGamepad.isKey("RB")) {
      this._onGPNextCategory();
    } else if (KDGamepad.isKey("LTrigger")) {
      this.showPrevPage();
    } else if (KDGamepad.isKey("RTrigger")) {
      this.showNextPage();
    }
  };
  
  //u22
  _._onGPPrevCategory = function() {
    var index;
    this._gpInvIndexY = 0;
    this._gpInvIndexX = 0;
    if (PKD_MI.isNewCatsSys()) {
      if (this._loadedCatIndex <= 0) {
        index = PKD_MI.getNewCatgoriesSize() - 1;
      } else {
        index = this._loadedCatIndex - 1;
      }
    } else {
      if (this._loadedCatIndex <= 0) {
        index = 3;
      } else {
        index = this._loadedCatIndex - 1;
      }
    }
    PKD_MI.eUI.openCategory(index);
    return this._onGPKeyIsPressed();
  };
  //u22
  _._onGPNextCategory = function() {
    var next;
    this._gpInvIndexY = 0;
    this._gpInvIndexX = 0;
    next = this._loadedCatIndex + 1;
    if (PKD_MI.isNewCatsSys()) {
      if (PKD_MI.getNewCatgoriesSize() <= next) {
        next = 0;
      }
    }
    PKD_MI.eUI.openCategory(next);
    return this._onGPKeyIsPressed();
  };
  _._onGPKeyIsPressed = function() {
    var cell, i, len, ref;
    ref = this._getAllCells();
    for (i = 0, len = ref.length; i < len; i++) {
      cell = ref[i];
      if (cell != null) {
        cell.setGPIndex(this._gpInvIndexX, this._gpInvIndexY);
      }
    }
    this._onGPRefreshAfterChangeIndex();
  };
  _._onGPRefreshAfterChangeIndex = function() {
    return PKD_MI.refreshInventory();
  };
  _._onGPKeyClose = function() {
    return PKD_MI.closeInventory();
  };
  _._onGPExtraKey = function() {}; // * NOTHING (Y)
  _._onGPChangeFocus = function() {
    if ($gameTemp._miFocusMainController == null) {
      return;
    }
    if ($gameTemp._miFocusMainController.length > 1) {
      $gameTemp._miFocusMainController[1]._requestWindowFocus();
    }
  };
  _._onGPKeyIsOk = function() {
    var cell;
    if (this.inSliderMode()) {
      this.onSliderOkClick();
    } else {
      if (this.isSomeItemFocused()) {

      } else {
        // * NOTHING
        cell = this._getGPSelectedCell();
        if (cell == null) {
          return;
        }
        PKD_MI.onInvCellClick(cell.index);
      }
    }
  };
  //TODO: Визуально слайдер не двигается (но это потом)
  _._gpMoveSlider = function(value) {
    var newValue;
    switch (value) {
      case 0:
        this.content.refreshSlider(1, true);
        break;
      case 2:
        this.content.refreshSlider(this.getMaxValueForSlider(), true);
        break;
      case 1:
        value = this.content.getSliderValue();
        newValue = value + 1;
        if (newValue <= this.getMaxValueForSlider()) {
          this.content.refreshSlider(newValue, true);
        }
        break;
      case -1:
        value = this.content.getSliderValue();
        newValue = value - 1;
        if (newValue >= 1) {
          this.content.refreshSlider(newValue, true);
        }
    }
  };
  _._gpSelectParty = function(index) {
    var actor, actorSpr;
    actorSpr = this.partyController._actors[index];
    if (actorSpr == null) {
      SoundManager.playBuzzer();
    } else {
      if (actorSpr.isDisabled()) {
        SoundManager.playBuzzer();
      } else {
        actor = actorSpr.actor;
        if (actor != null) {
          PKD_MI.onInvPartyCellClick(actor);
        }
      }
    }
  };
  _._prepareGamepad = function() {
    var params;
    if (!PKD_MI.IsGamepad()) {
      return;
    }
    params = PKD_MI.Parameters.getCustomSizeCellsParameters();
    this._gpColumns = params.columnsPerPage;
    this._gpRows = params.rowsPerPage;
    this._gpInvIndexX = 0;
    this._gpInvIndexY = 0;
    if ($gameTemp._miFocusMainController == null) {
      $gameTemp._miFocusMainController = [];
    }
    if ($gameTemp._miFocusMainController.length === 0) {
      $gameTemp._miFocusMainController = [this];
    } else {
      $gameTemp._miFocusMainController.unshift(this);
      $gameTemp._miFocusMainController[1]._clearGPFocus();
    }
    // * always
    //KDGamepad.setNoDPadMovingMode(true)
    KDGamepad.stopDefaultGamepad();
    if (this.isInventoryWindowInFocus()) {
      // * Выбрать ячейку сразу
      setTimeout((() => {
        var e;
        try {
          return this._onGPFocus();
        } catch (error) {
          e = error;
          return console.warn(e);
        }
      }), 100);
    }
  };
  _._cancelGamepad = function() {
    if (!PKD_MI.IsGamepad()) {
      return;
    }
    // * Если Gamepad был подключён пока инвентарь открыт и затем закрыт
    if ($gameTemp._miFocusMainController == null) {
      KDGamepad.resumeDefaultGamepad();
      return;
    }
    $gameTemp._miFocusMainController.delete(this);
    // * if last window closed
    if ($gameTemp._miFocusMainController.length === 0) {
      //KDGamepad.setNoDPadMovingMode(false)
      KDGamepad.resumeDefaultGamepad();
    } else {
      $gameTemp._miFocusMainController[0]._onGPFocus();
    }
  };
  _.isInventoryWindowInFocus = function() {
    if ($gameTemp._miFocusMainController != null) {
      return $gameTemp._miFocusMainController[0] === this;
    }
    return false;
  };
  _._requestWindowFocus = function() {
    var temp;
    if ($gameTemp._miFocusMainController == null) {
      return;
    }
    if ($gameTemp._miFocusMainController[0] != null) {
      temp = $gameTemp._miFocusMainController[0];
      $gameTemp._miFocusMainController[0] = this;
      $gameTemp._miFocusMainController[1] = temp;
      this._onGPFocus();
      temp._clearGPFocus();
    }
  };
  _._onGPFocus = function() {
    this._gpInvIndexX = 0;
    this._gpInvIndexY = 0;
    this._onGPKeyIsPressed();
  };
  _._clearGPFocus = function() {
    this._gpInvIndexX = -1;
    this._gpInvIndexY = -1;
    this._onGPKeyIsPressed();
  };
  // * Получить все спрайты ячеек
  _._getAllCells = function() {
    return this.invSprite._content._cells;
  };
  // * Получить выбранную через геймпад ячейку
  _._getGPSelectedCell = function() {
    return this._getAllCells().find(function(c) {
      return c.gpIndex === c.index;
    });
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  //u29
  _._onThrowUpSlider = function(cell) {
    var count, item;
    if (this.isSomeItemFocused()) {
      return;
    }
    item = cell.item;
    count = $gameParty.numItems(item);
    this.content.showFocusLayer();
    this.content.showFocusedItem(cell, count);
    this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 2);
    this._tempSliderItem = item;
    this.content.refreshSlider(count, true);
  };
  _.onSliderDropOkClick = function() {
    var count, e, item, ref;
    try {
      if (!this.isSomeItemFocused()) {
        return;
      }
      this.clearFocus();
      item = this._tempSliderItem;
      count = this.content.getSliderValue();
      this._tempSliderItem = null;
      return (ref = PKD_MI.eUI) != null ? ref._onDropOutItem(item, count) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.tryHotKeyHotCellAssign = function() {
    var cellUnderMouse, e;
    try {
      if (this.isSomeItemFocused()) {
        return null;
      }
      cellUnderMouse = this.content.getHoveredCell();
      if ((cellUnderMouse != null) && (cellUnderMouse.item != null)) {
        return cellUnderMouse.item;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapInvController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.MapInvController.prototype;
  _.onSliderOkClick = function() {
    if (!this.isSomeItemFocused()) {
      return;
    }
    this.clearFocus();
    this._onStoreItemFinal(this._tempSliderItem, this.content.getSliderValue());
    return this._tempSliderItem = null;
  };
  //u20
  _.onSliderValueChanged = function(percent) {
    var isAllowed, max, value;
    max = this.getMaxValueForSlider();
    value = Math.round(max * percent / 100);
    if (value <= 0) {
      value = 1;
    }
    if (value > max) {
      value = max;
    }
    // * Из инвентаря всегда можно убрать
    isAllowed = this._isSliderNewValueIsAllowed(value);
    return this.content.refreshSlider(value, isAllowed);
  };
  // * FOR OVERRIDE
  _.getMaxValueForSlider = function() {
    return $gameParty.numItems(this._tempSliderItem);
  };
  // * FOR OVERRIDE
  _._isSliderNewValueIsAllowed = function(value) {
    return true;
  };
  //u19
  _._onStoreItemProcess = function(cell) {
    var count, item;
    if (this.isSomeItemFocused()) {
      return;
    }
    if (!this.isCanPutItemWithChestLimit(cell.item)) {
      SoundManager.playBuzzer();
      return;
    }
    item = cell.item;
    if (PKD_MI.isHaveSomeTypeLimit()) {
      if (!PKD_MI.isProperItemForTypeLimit(item)) {
        SoundManager.playBuzzer();
        return;
      }
    }
    count = $gameParty.numItems(item);
    if (count === 1 || !PKD_MI.isUseSlider()) {
      this._onStoreItemFinal(item, count);
    } else {
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, count);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 0);
      this._tempSliderItem = item;
      this.content.refreshSlider(count, true);
    }
  };
  //u19
  _.isCanPutItemWithChestLimit = function(item) {
    var i, items, len, ref;
    if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
      return true;
    }
    if ($gameTemp.__aaVisualChestLimitCount == null) {
      return true;
    }
    ref = $gameTemp.__aaItemsForChest;
    // * Если уже есть, увеличиваем количество
    for (i = 0, len = ref.length; i < len; i++) {
      items = ref[i];
      if (items[0] === item) {
        return true;
      }
    }
    return $gameTemp.__aaVisualChestLimitCount > $gameTemp.__aaItemsForChest.length;
  };
  //u19
  _._onStoreItemFinal = function(item, count) {
    var i, inStack, index, items, len, ref;
    $gameParty.loseItem(item, count, true);
    SoundManager.playCursor();
    this.loadItemsInCategory(this._loadedCatIndex);
    if (PKD_MI.isUserChestIsOpen()) {
      $gameTemp._newUserChestCat = this._loadedCatIndex;
      return $gamePlayer.addPutItemToPlayerChest(item, count);
    } else if (PKD_MI.isStoredChestIsOpen()) {
      inStack = false;
      ref = $gameTemp.__aaItemsForChest;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        items = ref[index];
        if (items[0] === item) {
          items[1] += count;
          inStack = true;
          break;
        }
      }
      if (inStack === false) {
        $gameTemp.__aaItemsForChest.push([item, count]);
      }
      return PKD_MI.refreshStoredChest();
    }
  };
  _.inSliderMode = function() {
    return (this.sliderController != null) && this.isSomeItemFocused();
  };
})();

// ■ END MapInvController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MapUserChestController.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var MapUserChestController;
  MapUserChestController = class MapUserChestController extends PKD_MI.LIBS.MapInvController {
    constructor() {
      super(...arguments);
      this.goldRefreshThread = null;
    }

    _onGoldTick() {} // * EMPTY

    _moveToLastPos() {
      if ($gameTemp.__lastUserChestDragPos != null) {
        return this.invSprite.move($gameTemp.__lastUserChestDragPos);
      }
    }

    _saveLastDragPos() {
      return $gameTemp.__lastUserChestDragPos = [this.invSprite.x, this.invSprite.y];
    }

    updateWhenOpen() {
      var key, key2, ref;
      super.updateWhenOpen();
      if ((ref = this._autoCloseThread) != null) {
        ref.update();
      }
      key = PKD_MI.Parameters.get_ChestTakeAllKey();
      if (Input.isTriggered(key)) {
        this.takeAll();
      }
      key2 = PKD_MI.Parameters.get_InventoryOpenKey();
      if (Input.isTriggered(key2)) {
        $gamePlayer.onPKDInventoryKey();
      }
    }

    showItems() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyItems();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showWeapons() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyWeapons();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showArmors() {
      this._loadedItems = $gamePlayer.aaGetPlayerChestStoredItems().getOnlyArmors();
      this._setPages();
      return this._showItemsGroup(0);
    }

    showKeys() {
      this._loadedItems = [];
      this._setPages();
      return this._showItemsGroup(0);
    }

    //u22
    //$[OVER]
    // * Все предметы (нет категорий)
    showUserCategoriItems() {
      var allItems, e;
      try {
        allItems = $gamePlayer.aaGetPlayerChestStoredItems();
        this._loadedItems = allItems.getOnlyItems();
        this._loadedItems = this._loadedItems.concat(allItems.getOnlyWeapons());
        this._loadedItems = this._loadedItems.concat(allItems.getOnlyArmors());
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this._loadedItems = [];
      }
      this._setPages();
      return this._showItemsGroup(0);
    }

    clickAt(index) {
      var e;
      try {
        this._onReturnItem(index + (this._currentPage * this.MAX));
        if (PKD_MI.isInventoryOpened()) {
          return PKD_MI.refreshInventory();
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _onReturnItem(index) {
      var itemData;
      itemData = this._loadedItems[index];
      if (itemData == null) {
        return;
      }
      this._onReturnItemWithCheck(index, itemData);
    }

    _onReturnItemWithCheck(index, itemData, fast = false) {
      var cell, item, realCount, resultCount;
      resultCount = itemData[1];
      item = itemData[0];
      realCount = this._getItemCountToReturn(resultCount, item);
      if (realCount <= 0) {
        SoundManager.playBuzzer();
        return;
      }
      if (!$gameParty.isCanAddNewItem(itemData[0])) {
        SoundManager.playBuzzer();
        return;
      }
      if (realCount === 1 || fast === true || !PKD_MI.isUseSlider()) {
        this._onStoreItemFinal(itemData, realCount);
        if (fast === false) { // * Если множественный, то в другом месте перезагрузка
          SoundManager.playCursor();
          this.loadItemsInCategory(this._loadedCatIndex);
        }
      } else {
        //cell = @content.getCellAt(index)
        //@_checkToAutoClose()
        cell = this.content.getCellByItem(itemData[0]);
        this._onReturnItemWithSlider(cell, itemData, realCount);
      }
    }

    //$[OVER BASE]
    onSliderOkClick() {
      if (!this.isSomeItemFocused()) {
        return;
      }
      this.clearFocus();
      this._onStoreItemFinal(this._tempSliderItem, this.content.getSliderValue());
      this._tempSliderItem = null;
      this.loadItemsInCategory(this._loadedCatIndex);
      //@_checkToAutoClose()
      return SoundManager.playCursor();
    }

    _onReturnItemWithSlider(cell, itemData, realCount) {
      this.content.showFocusLayer();
      this.content.showFocusedItem(cell, itemData[1]);
      this.sliderController = new PKD_MI.LIBS.SliderController(this.content, 1);
      this._tempSliderItem = itemData;
      this._tempSliderMaxValue = realCount;
      return this.content.refreshSlider(realCount, this._isSliderNewValueIsAllowed(realCount));
    }

    //$[OVER BASE]
    getMaxValueForSlider() {
      return this._tempSliderMaxValue;
    }

    //$[OVER BASE]
    _onStoreItemFinal(itemData, count) {
      var item;
      $gameTemp._newUserChestCat = this._loadedCatIndex;
      item = itemData[0];
      $gamePlayer.removeItemFromChestStorage(item, count);
      //* Прятать всплывающее, если инвентарь открыт
      $gameParty._noNotifyABS = PKD_MI.isInventoryOpened();
      $gameParty.gainItem(itemData[0], count);
      $gameParty._noNotifyABS = false;
    }

    _setItemToCell(cell, item) {
      return cell.setChestItem(item);
    }

    takeAll() {
      var e;
      // * Забирает все вещи с текущей категории
      //"TAKE ALL".p()
      this.clearFocus();
      try {
        this._returnAllItemsOfCategory();
        if (PKD_MI.isInventoryOpened()) {
          //$gamePlayer.removeFullTypeFromChestStorage(@_loadedCatIndex)
          PKD_MI.refreshInventory();
        }
        SoundManager.playCursor();
      } catch (error) {
        e = error;
        PKD_MI.warning('When try take ALL from User storage chest', e);
      }
      this.loadItemsInCategory(this._loadedCatIndex);
      return this._checkToAutoClose();
    }

    _returnAllItemsOfCategory() {
      var i, itemData, j, l, ref;
      $gameParty._noNotifyABS = PKD_MI.isInventoryOpened();
      l = this._loadedItems.length;
      for (i = j = 0, ref = l; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        itemData = this._loadedItems[i];
        if (itemData == null) {
          continue;
        }
        //$gameParty.gainItem(itemData[0], itemData[1])
        this._onReturnItemWithCheck(i, itemData, true);
        if (l !== this._loadedItems.length) {
          this._returnAllItemsOfCategory();
          return;
        }
      }
      $gameParty._noNotifyABS = false;
    }

    // * Если нету вообще ничего (а не только в текущей категории)
    _checkToAutoClose() {
      if ($gamePlayer.aaGetPlayerChestStoredItems().items.length === 0) {
        this._autoCloseThread = new KDCore.TimedUpdate(20, this.__onAutoCloseTick.bind(this));
        return this._autoCloseThread.once();
      }
    }

    __onAutoCloseTick() {
      return PKD_MI.closeUserChest();
    }

    //u20 all down
    //======================

      //u20
    _onGPPrevCategory() {
      var index;
      this._gpInvIndexY = 0;
      this._gpInvIndexX = 0;
      if (PKD_MI.isNewCatsSys()) {
        if (this._loadedCatIndex <= 0) {
          index = PKD_MI.getNewCatgoriesSize() - 1;
        } else {
          index = this._loadedCatIndex - 1;
        }
      } else {
        if (this._loadedCatIndex <= 0) {
          index = 2;
        } else {
          index = this._loadedCatIndex - 1;
        }
      }
      PKD_MI.eUI.openUserChestCategory(index);
      return this._onGPKeyIsPressed();
    }

    _onGPNextCategory() {
      var nextValue;
      this._gpInvIndexY = 0;
      this._gpInvIndexX = 0;
      if (PKD_MI.isNewCatsSys()) {
        nextValue = this._loadedCatIndex + 1;
        if (PKD_MI.getNewCatgoriesSize() >= nextValue) {
          nextValue = 0;
        }
      } else {
        nextValue = this._loadedCatIndex + 1;
        if (nextValue > 2) {
          nextValue = 0;
        }
      }
      PKD_MI.eUI.openUserChestCategory(nextValue);
      return this._onGPKeyIsPressed();
    }

    //u20
    _onGPRefreshAfterChangeIndex() {
      return this.loadItemsInCategory(this._loadedCatIndex);
    }

    //u20
    _onGPKeyIsOk() {
      var cell;
      if (this.inSliderMode()) {
        this.onSliderOkClick();
      } else {
        if (this.isSomeItemFocused()) {

        } else {
          // * NOTHING
          cell = this._getGPSelectedCell();
          if (cell == null) {
            return;
          }
          PKD_MI.onChestCellClick(cell.index);
        }
      }
    }

    //u20
    _onGPKeyClose() {
      return PKD_MI.closeUserChest();
    }

    //u20
    _onGPExtraKey() {
      return PKD_MI.takeAllFromChest();
    }

  };
  //=======================
  PKD_MI.register(MapUserChestController);
})();

// ■ END MapUserChestController.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapChestFooter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestFooter;
  Sprite_MapChestFooter = class Sprite_MapChestFooter extends PKD_MI.LIBS.Sprite_MapInvFooter {
    constructor() {
      super();
    }

    _createContent() {
      this._createTakeAllBtn();
      return this._createTakeText();
    }

    _createTakeAllBtn() {
      var img0, img1;
      this.takeBtn = new KDCore.Button();
      img0 = ImageManager.loadPKDMI("inventoryChestTakeAllButton_00");
      img1 = ImageManager.loadPKDMI("inventoryChestTakeAllButton_01");
      this.takeBtn.setButtonImages(img0, img1, img0, img0);
      this.takeBtn.move(KDCore.Utils.jsonPos(this.settings.takeAllButtonPosition));
      this.takeBtn.addClickHandler(function() {
        return PKD_MI.takeAllFromChest();
      });
      return this.add(this.takeBtn);
    }

    _createTakeText() {
      var text, textSpr;
      textSpr = KDCore.Sprite.FromTextSettings(this.settings.takeTextSettings);
      //textSpr.fillAll()
      text = this.settings.takeDefaultText;
      textSpr.drawTextWithSettings(text);
      return this.add(textSpr);
    }

    _createArrows() {
      PKD_MI.LIBS.Sprite_MapInvFooter.prototype._createArrows.call(this);
      this._arrowL.clearClickHandlers();
      this._arrowR.clearClickHandlers();
      this._arrowL.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.chestShowPrevPage();
      });
      return this._arrowR.addClickHandler(function() {
        SoundManager.playCursor();
        PKD_MI.chestShowNextPage();
      });
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

  };
  PKD_MI.register(Sprite_MapChestFooter);
})();

// ■ END Sprite_MapChestFooter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapChestHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestHeader;
  Sprite_MapChestHeader = class Sprite_MapChestHeader extends PKD_MI.LIBS.Sprite_MapInvHeader {
    constructor() {
      super();
    }

    _createContent() {
      var text;
      text = $gameTemp.__aaChestName;
      if (text == null) {
        text = this.settings.defaultChestName;
      }
      this._content = KDCore.Sprite.FromTextSettings(this.settings.chestName);
      this._content.drawTextWithSettings(text);
      this.add(this._content);
      return $gameTemp.__aaChestName = null;
    }

    //u19
    _drawIcon() {
      if (String.any($gameTemp.__nextVisualChestExtraIcon)) {
        this._drawCustomIcon($gameTemp.__nextVisualChestExtraIcon);
        return $gameTemp.__nextVisualChestExtraIcon = null;
      } else {
        return this._drawSettingsIcon();
      }
    }

    //u19
    _drawCustomIcon(customImage) {
      var icon;
      icon = PKD_MI.FromImgI(customImage);
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    //u19
    _drawSettingsIcon() {
      var icon;
      if (this.settings.icon == null) {
        return;
      }
      if ($gameTemp.__aaChestIsLoot === true) {
        icon = PKD_MI.FromImgI("InventoryIconLoot");
        $gameTemp.__aaChestIsLoot = null;
      } else {
        icon = PKD_MI.FromImgI(this.settings.icon);
      }
      icon.move(this.settings.iconMarginX, this.settings.iconMarginY);
      return this.add(icon);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

    _createCloseButton() {
      super._createCloseButton();
      this.closeBtn.clearClickHandlers();
      return this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeChest();
      });
    }

  };
  PKD_MI.register(Sprite_MapChestHeader);
})();

// ■ END Sprite_MapChestHeader.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ zSprite_MapChestMain_PRO.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapChestMain;
  Sprite_MapChestMain = class Sprite_MapChestMain extends PKD_MI.LIBS.Sprite_MapInvMain {
    constructor() {
      super();
    }

    _settingsJSON() {
      return PKD_MI.getUIMapChestSettings();
    }

    
      //?UPD18
    _createContent() {
      this._content = new PKD_MI.LIBS.Sprite_MainInvItems(true);
      return this._main.addChild(this._content);
    }

    _createHeader() {
      this._header = new PKD_MI.LIBS.Sprite_MapChestHeader();
      return this._main.addChild(this._header);
    }

    _createFooter() {
      this._footer = new PKD_MI.LIBS.Sprite_MapChestFooter();
      return this._main.addChild(this._footer);
    }

    _createExtraOptions() {} // * NOTHING

    playStartSE() {
      return KDCore.Utils.playSE(this.settings.openChestSE);
    }

  };
  PKD_MI.register(Sprite_MapChestMain);
})();

// ■ END zSprite_MapChestMain_PRO.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryActorCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInventoryActorCell.prototype;
  //$[OVER BASE]
  _.drawGauges = function(item) {
    var gauge;
    this.gaugeitems = [];
    if (DataManager.isItemHaveHPEffect(item)) {
      gauge = this.drawHpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
    if (DataManager.isItemHaveMPEffect(item)) {
      gauge = this.drawMpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
    if (DataManager.isItemHaveTPEffect(item)) {
      gauge = this.drawTpGauge();
      if (gauge.visible) {
        this.gaugeitems.push(gauge);
      }
    }
  };
  _.drawHpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorHpGauge, this.actor.hpRate());
  };
  _.drawMpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorMpGauge, this.actor.mpRate());
  };
  _.drawTpGauge = function() {
    return this._drawIGauge(this.settings.partySelectorTpGauge, this.actor.tpRate());
  };
  _._drawIGauge = function(gaugeSettings, value) {
    var gauge, i, item, len, ref;
    gauge = new PKD_MI.LIBS.Sprite_ColorGauge(gaugeSettings);
    gauge.drawGauge(value);
    this.addChild(gauge);
    if (this.gaugeitems.length > 0) {
      ref = this.gaugeitems;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        gauge.y += item.height - 1;
      }
    }
    return gauge;
  };
})();

// ■ END Sprite_MapInventoryActorCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  _.setFocusItem = function(item1, count) {
    this.item = item1;
    this.drawIconExt();
    this.drawCount(count);
    this.registerFocusClick();
    return this.drawFocusFrame();
  };
  _.registerFocusClick = function() {
    var index;
    this._cell._clickHandlers = [];
    index = this.index;
    return this._cell.addClickHandler(function() {
      return PKD_MI.onInvCellFocusedClick(index);
    });
  };
  _.drawFocusFrame = function() {
    return this._cell.setButtonImages(...this._imgs3);
  };
  _._checkUsable = function() {
    this.partyUsecases = [];
    if (PKD_MI.Parameters.get_AutoRefreshItems() === true) {
      this._onCheckUsableTick();
      return this._checkUsableThread = new KDCore.TimedUpdate(20, this._onCheckUsableTick.bind(this));
    } else {
      return this._onCheckUsableTick();
    }
  };
  //?UPDX
  _._onCheckUsableTick = function() {
    var canUse, e, i, itemUsable, j, k, len, ref, usable, usecaseOnlyFor;
    if ($gameTemp._miInvenotryPickActive === true) {
      this._onCheckUsabelOnItemPickToEvent();
      return;
    }
    
    // * Если "строгий" выбор персонажа под вещь, то нельзя вообще использовать если персонажа нет в группе
    if (PKD_MI.Parameters.isStrictUsecaseOnly()) {
      usecaseOnlyFor = PKD_MI.getItemOnlyActorIdUsecase(this.item);
      if (usecaseOnlyFor > 0 && !PKD_MI.isHaveActorIdInParty(usecaseOnlyFor)) {
        this.disableItem();
        return;
      }
    }
    if (PKD_MI.IsABSItem(this.item)) {
      if (AA.isABSActive()) {
        //TODO: Это может влиять на производительность
        usable = $gameParty.leader().getUsableAASkills();
        itemUsable = usable.getByField("idA", this.item.idA);
        if (itemUsable != null) {
          this.enableItem();
        } else {
          this.disableItem();
        }
        return;
      } else {
        // * Если АБС не активирован и есть флаг (не использовать вне АБС) - то нельзя
        if (this.item.AASkill.hideOutsideABS === 1) {
          this.disableItem();
          return;
        }
      }
    }
    //else - как обычный предмет (не АБС предмет)

    //"CHECK USABLE FOR ITEM".p(@item.name)
    if (this.item.occasion === 1) { // * battle screen
      this.disableItem();
      return false;
    }
    if (this.item.scope === 0 && (this.item.occasion === 2 || this.item.occasion === 0)) {
      this.enableItem();
      return true;
    }
    canUse = true;
    try {
      if (PKD_MI.isPartyInventoryAllowed() && !this.isHotCell) { //?line
        ref = PKD_MI.partyGroup();
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
          i = ref[j];
          this.partyUsecases[j] = this._canActorUseItem(i);
        }
        canUse = this.partyUsecases.some(function(i) {
          return i === true;
        });
      } else {
        canUse = this._canActorUseItem($gameParty.leader());
      }
      if (!canUse) {
        return this.disableItem();
      } else {
        return this.enableItem();
      }
    } catch (error) {
      e = error;
      PKD_MI.warning(e);
      return this.disableItem();
    }
  };
  _._onCheckUsabelOnItemPickToEvent = function() {
    var itypeId;
    if ($gameTemp._miESM == null) {
      itypeId = $gameMessage.itemChoiceItypeId();
      if ((this.item != null) && DataManager.isItem(this.item) && this.item.itypeId === itypeId) {
        this.enableItem();
      } else {
        this.disableItem();
      }
    } else if ($gameTemp._miESM === 3) {
      if ((this.item != null) && DataManager.isItem(this.item) && this.item.itypeId === 1) {
        this.enableItem();
      } else {
        this.disableItem();
      }
    } else if ($gameTemp._miESM === 1) {
      if ((this.item != null) && DataManager.isWeapon(this.item) && !this._inSpecialState) {
        this.enableItem();
      } else {
        this.disableItem();
      }
    } else if ($gameTemp._miESM === 2) {
      if ((this.item != null) && DataManager.isArmor(this.item) && !this._inSpecialState) {
        this.enableItem();
      } else {
        this.disableItem();
      }
    }
  };
  _._canActorUseItem = function(actor) {
    var _S, actorIndex, item, result;
    _S = Scene_Item.prototype; //?line
    this.user = function() {
      return actor;
    };
    item = this.item;
    this.item = function() {
      return item;
    };
    this.isItemEffectsValid = function() {
      return _S.isItemEffectsValid.call(this);
    };
    this._actorWindow = {};
    actorIndex = PKD_MI.partyGroup().indexOf(actor);
    this._actorWindow.index = function() {
      return actorIndex;
    };
    this.itemTargetActors = function() {
      return _S.itemTargetActors.call(this);
    };
    result = _S.canUse.call(this);
    this.item = item;
    return result;
  };
  _.enableItem = function() {
    return this._fader.visible = false;
  };
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  _._refreshEquipmentStateForActor = function(actor) {
    var canEquip, candidates, e, equips, i, j, ref, results;
    try {
      canEquip = actor.canEquip(this.item);
      if (canEquip === true) {
        this.whoCanEquip.push(actor.actorId());
        candidates = this._getUnequipCandidtaes();
        if ((ref = candidates[this.item.id]) != null ? ref.contains(actor.actorId()) : void 0) {
          return;
        }
        equips = actor.equips();
        results = [];
        for (i in equips) {
          j = equips[i];
          if (j === this.item) {
            this._isEquipedItem = true;
            this._applyEquipmenSpecialState();
            this.whoCanUnEquip.push(actor.actorId());
            results.push(this._setCandidateForUnequip(actor.actorId()));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    } catch (error) {
      e = error;
      return PKD_MI.warning(e);
    }
  };
  // * Имя, кто будет унЭкиперовать
  _._getSpecialStateActorName = function() {
    var actor;
    actor = this._getEquipmentActor();
    if (actor != null) {
      return actor.name();
    }
    return "";
  };
  _._setCandidateForUnequip = function(actorId) {
    var candidates;
    candidates = $gameTemp._equipmentArmrCandidates;
    if (DataManager.isWeapon(this.item)) {
      candidates = $gameTemp._equipmentWeapCandidates;
    }
    if (candidates[this.item.id] != null) {
      return candidates[this.item.id].push(actorId);
    } else {
      return candidates[this.item.id] = [actorId];
    }
  };
  _._getUnequipCandidtaes = function() {
    if (DataManager.isWeapon(this.item)) {
      return $gameTemp._equipmentWeapCandidates;
    } else {
      return $gameTemp._equipmentArmrCandidates;
    }
  };
  //?UPDX
  _._getEquipmentActor = function() {
    var actor;
    actor = $gameParty.leader();
    if (PKD_MI.isPartyInventoryAllowed() && !this.isHotCell) {
      if (this.whoCanUnEquip != null) {
        actor = $gameActors.actor(this.whoCanUnEquip[0]);
      }
    }
    return actor;
  };
  _._checkEquipmentsUsable = function() {
    var actor, index, k, len, ref, result;
    if (this._inSpecialState === true) { // * Если экиперовано, то нет смысла
      return;
    }
    this.partyUsecases = [];
    ref = PKD_MI.partyGroup();
    for (index = k = 0, len = ref.length; k < len; index = ++k) {
      actor = ref[index];
      result = this.whoCanEquip.contains(actor.actorId());
      this.partyUsecases[index] = result;
    }
  };
})();

// ■ END Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_MI_LIBS.Sprite_MapInvCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;
  //u19
  //u22
  _.prepareForCategory = function(categoryIndex) {
    this.categoryIndex = categoryIndex;
    this._lockCellSpr.visible = false;
    this._iconSprPlace.visible = true;
    // * KEY ITEMS CAN'T BE LOCKED
    //console.log(@categoryIndex)
    if (!PKD_MI.Parameters.isUseNewCategoriesSystem()) {
      if (this.categoryIndex === 3) {
        return;
      }
    }
    if (this.categoryIndex < 0) {
      return;
    }
    if (this.isLockSupportType !== true) {
      return;
    }
    if (!PKD_MI.Parameters.isCellLockSystemAllowed()) {
      return;
    }
    if (this.categoryIndex !== 9999) {
      this._checkLockedState();
    } else {
      this._checkLockedStateForChest();
    }
  };
  //u19
  _._checkLockedState = function() {
    if (this.index < $gamePlayer.getMapInventoryUnlockedCount(this.categoryIndex)) {
      return;
    }
    this._lockCellSpr.visible = true;
    this._iconSprPlace.visible = false;
  };
  //u19
  _._checkLockedStateForChest = function() {
    if (!this._isOutOfRangeIndex()) {
      return;
    }
    this._lockCellSpr.visible = true;
    this._iconSprPlace.visible = false;
  };
  //u19
  _._isOutOfRangeIndex = function() {
    if ($gameTemp.__aaVisualChestLimitCount == null) {
      return false;
    }
    if ($gameTemp.__aaVisualChestLimitCount < 0) {
      return false;
    }
    return this.index >= $gameTemp.__aaVisualChestLimitCount;
  };
})();

// ■ END PKD_MI_LIBS.Sprite_MapInvCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHelp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //u20 ALL THIS

  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvHelp.prototype;
  _._getExtraDescForCurrentItem = function() {
    var cellItem, cellItemId, e, fieldName, i, item, len, params;
    if (this.cell.item == null) {
      return null;
    }
    params = PKD_MI.Parameters.getExtraDescriptions();
    fieldName = "weaponId";
    if (DataManager.isArmor(this.cell.item)) {
      fieldName = "armorId";
    }
    try {
      for (i = 0, len = params.length; i < len; i++) {
        item = params[i];
        cellItem = this.cell.item;
        // * For YEP_ItemCore (don't like this plugin btw...)
        if (cellItem.baseItemId != null) {
          cellItemId = cellItem.baseItemId;
        } else {
          cellItemId = cellItem.id;
        }
        if (item[fieldName] === cellItemId) {
          return item.info;
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return null;
  };
})();

// ■ END Sprite_MapInvHelp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHelp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //u20 ALL THIS

  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvHelp.prototype;
  _.prepareStats = function() {
    this.setupStats();
    if (PKD_MI.Parameters.isUseAltDescForStats()) {
      return this.applyAltStatsView();
    } else {
      return this.showStatsHelp();
    }
  };
  _.applyAltStatsView = function() {
    var dy, ref, ref1, ref2, tc;
    if (!this._isStatsAllowed) {
      return;
    }
    this._exStatsSettings = PKD_MI.Parameters.getAltStatsSettings();
    if (this._exStatsSettings == null) {
      return;
    }
    this._decideForCreateBackground(this.settings.width, this._exStatsSettings.descWindowNewHeight);
    // * default from 1
    this._statsAll[1].visible = this._exStatsSettings.isShowBasicStats;
    if (this.__textDescHeader != null) {
      tc = this._exStatsSettings.extraDescTitleTextColor;
      this.__textDescHeader.bitmap.textColor = tc;
      this.__textDescHeader.drawTextWithSettings(this._exStatsSettings.extraDescTitleText);
      this.__textDescHeader.y = this._exStatsSettings.extraDescTitleStartY;
    }
    
    // * extra description
    if (this._exStatsSettings.isShowExtraDesription === true && (this._statsC != null)) {
      this._statsC.visible = true;
      this._statsC.y = this._exStatsSettings.extraDescTextStartY;
    }
    // * extra description
    if (this._exStatsSettings.isShowExtraStats === true && (this._statsB != null)) {
      this._statsB.visible = true;
      this._statsB.y = this._exStatsSettings.extraStatsStartY;
    }
    
    // * MOVE DEFAULTS
    dy = this._exStatsSettings.helpersStartY;
    if ((ref = this._textQLevelSpr) != null) {
      ref.y += dy;
    }
    if ((ref1 = this.__helpSprText) != null) {
      ref1.y += dy;
    }
    if ((ref2 = this.__helpSprIcon) != null) {
      ref2.y += dy;
    }
  };
  // * When Create window
  _._createStats = function() {
    this._statsAll = [];
    this._statsAll.push(this._description); // * По умолчанию всегда
    if (!PKD_MI.Parameters.get_AllowEquipStats()) {
      return;
    }
    this._statsBase = new Sprite(); // * container
    this._statsBase.move(this.basicSettings.EquipmentStats.position);
    this.content.addChild(this._statsBase);
  };
  // * Equip stats (basic)
  _._createEqStatsA = function() {
    if (this.isDynamicStatsUsed()) {
      // * No backgorund image
      this._stats = new Sprite();
    } else {
      this._stats = PKD_MI.FromImgI(this.basicSettings.EquipmentStats.statsBackImage);
    }
    this._stats.visible = false;
    this._statsBase.addChild(this._stats);
    this._statsAll.push(this._stats);
  };
  //u25
  _.isDynamicStatsUsed = function() {
    return PKD_MI.Parameters.get_isDynamicStats() === true && (PKD_MI.Parameters.get_DynamicStatsPosTable() != null);
  };
  // * When press button to show
  _.showItemStats = function(isUp) {
    var i, len, ref, s;
    if (PKD_MI.Parameters.isUseAltDescForStats()) {
      return;
    }
    if (this._stats == null) {
      return;
    }
    if (!this._isStatsAllowed) {
      return;
    }
    ref = this._statsAll;
    for (i = 0, len = ref.length; i < len; i++) {
      s = ref[i];
      s.visible = false;
    }
    if (isUp === true) {
      this._statsIndex--;
    } else {
      this._statsIndex++;
    }
    if (this._statsIndex >= this._statsAll.length) {
      this._statsIndex = 0;
    } else {
      if (this._statsIndex < 0) {
        this._statsIndex = this._statsAll.length - 1;
      }
    }
    this._statsAll[this._statsIndex].visible = true;
  };
  
  // * When setup ITEM
  _.setupStats = function() {
    var item;
    item = this.cell.item;
    if (DataManager.isItem(item)) {
      return this._isStatsAllowed = false;
    } else {
      this._createAllStatesInfo();
      return this._isStatsAllowed = true;
    }
  };
  // * Show (draw) help icon
  _.showStatsHelp = function() {
    var actionHelpSpr, helpIcon, s;
    if (!this._isStatsAllowed) {
      return;
    }
    s = this.basicSettings.EquipmentStats;
    actionHelpSpr = KDCore.Sprite.FromTextSettings(s.statsHelpText);
    actionHelpSpr.drawTextWithSettings(s.helpIconText);
    this.content.addChild(actionHelpSpr);
    if (PKD_MI.IsGamepad()) {
      helpIcon = PKD_MI.FromImgI("inventoryScrollHelpGP");
    } else {
      helpIcon = PKD_MI.FromImgI("inventoryScrollHelp");
    }
    helpIcon.move(KDCore.Utils.jsonPos(s.helpIconPosition));
    return this.content.addChild(helpIcon);
  };
  _._createAllStatesInfo = function() {
    this._createEqStatsA();
    if (PKD_MI.isPro()) {
      this._createEqStatsB(); //?PART
      this._createEqExtraC(); //?PART
    }
    this._createStatesParamsValues();
  };
  _._createStatesParamsValues = function() {
    var s, sp;
    if (this.isDynamicStatsUsed()) {
      return this._createDymanicStatsForItem(PKD_MI.Parameters.get_DynamicStatsPosTable());
    } else {
      s = this.basicSettings.EquipmentStats.stats;
      if (s.atk.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("atk", this.cell);
        sp.move(s.atk.position);
        this._stats.addChild(sp);
      }
      if (s.def.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("def", this.cell);
        sp.move(s.def.position);
        this._stats.addChild(sp);
      }
      if (s.agi.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("agi", this.cell);
        sp.move(s.agi.position);
        this._stats.addChild(sp);
      }
      if (s.mat.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("mat", this.cell);
        sp.move(s.mat.position);
        this._stats.addChild(sp);
      }
      if (s.mdf.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("mdf", this.cell);
        sp.move(s.mdf.position);
        this._stats.addChild(sp);
      }
      if (s.luk.visible === true) {
        sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText("luk", this.cell);
        sp.move(s.luk.position);
        return this._stats.addChild(sp);
      }
    }
  };
  _._createDymanicStatsForItem = function(positionsTable) {
    var e, i, paramId, positionIndex, results, sp, tablePositionItem, value;
    try {
      positionIndex = 1;
      results = [];
      for (paramId = i = 0; i < 8; paramId = ++i) {
        value = this.cell.item.params[paramId];
        if (value !== 0) {
          sp = new PKD_MI.LIBS.Sprite_MapInventoryStatText(this._inverseParam(paramId), this.cell);
          tablePositionItem = positionsTable["position" + positionIndex];
          this._addDynamicStatIcon(tablePositionItem.statIconPosition, paramId);
          sp.move(tablePositionItem.statTextPosition);
          this._stats.addChild(sp);
          results.push(positionIndex++);
        } else {
          results.push(void 0);
        }
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._inverseParam = function(paramId) {
    switch (paramId) {
      case 0:
        return "mhp";
      case 1:
        return "mmp";
      case 2:
        return 'atk';
      case 3:
        return 'def';
      case 4:
        return 'mat';
      case 5:
        return 'mdf';
      case 6:
        return 'agi';
      case 7:
        return 'luk';
      default:
        return "unknown";
    }
  };
  _._addDynamicStatIcon = function(position, paramId) {
    var iconName, spr;
    iconName = "SingleStat_" + paramId;
    spr = new Sprite(ImageManager.loadPKDMI(iconName));
    spr.move(position);
    return this._stats.addChild(spr);
  };
})();

// ■ END Sprite_MapInvHelp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvHelp.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //u20 ALL THIS

  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvHelp.prototype;
  //TODO: Из параметров? Пользователь сам определяет какие (название) и позиции
  // * Сейчас сделано что все доступны, но выводятся только отредактированные
  _.getStatsBTable = function() {
    return [
      {
        // * PARAMS
        "statText": "Max HP",
        "dataId": 0,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Max SP",
        "dataId": 1,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Attack",
        "dataId": 2,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Defense",
        "dataId": 3,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Mat. Atk",
        "dataId": 4,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Mat. Defense",
        "dataId": 5,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Agility",
        "dataId": 6,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Luck",
        "dataId": 7,
        "traitId": 21,
        "position": [0,
      0]
      },
      {
        "statText": "Hit Rate",
        "dataId": 0, // * HIT
        "traitId": 22, // * XParam
        "position": [0,
      0]
      },
      {
        "statText": "Evasion Rate",
        "dataId": 1,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "Crit. Rate",
        "dataId": 2,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "Crit. Evasion",
        "dataId": 3,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "Magic Evasion",
        "dataId": 4,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "Magic Reflect.",
        "dataId": 5,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "Counter Attack",
        "dataId": 6,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "HP Regen",
        "dataId": 7,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "MP Regen",
        "dataId": 8,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        "statText": "TP Regen",
        "dataId": 9,
        "traitId": 22,
        "position": [0,
      0]
      },
      {
        // * SPARAMS
        "statText": "Target Rate",
        "dataId": 0,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Guard Effect",
        "dataId": 1,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Recovery Effect",
        "dataId": 2,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Pharmacology",
        "dataId": 3,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "MP Cost Rate",
        "dataId": 4,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "TP Charge Rate",
        "dataId": 5,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Physical Damage",
        "dataId": 6,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Magic Damage",
        "dataId": 7,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Floor Damage",
        "dataId": 8,
        "traitId": 23,
        "position": [0,
      0]
      },
      {
        "statText": "Experience",
        "dataId": 9,
        "traitId": 23,
        "position": [0,
      0]
      }
    ];
  };
  _.getStatsExtraC = function() {
    var e, info, text;
    info = this._getExtraDescForCurrentItem();
    if (info == null) {
      return null;
    }
    try {
      text = JsonEx.parse(info.text);
    } catch (error) {
      e = error;
      text = info.text;
    }
    return text;
  };
  //"\\C[4]New Skill:     \\I[64]\\C[2]Fire II\n\n\\C[3]+Dragon Slayer\\C[0] - Grants you a 4 turn attack buff after hitting a dragon monster."
  _.getXSStatValueByStat = function(statObj) {
    var dataId, e, i, item, len, ref, t, traitId;
    try {
      if (statObj == null) {
        return 0;
      }
      dataId = statObj.dataId;
      traitId = statObj.traitId;
      if (this.cell == null) {
        return 0;
      }
      item = this.cell.item;
      if (item == null) {
        return 0;
      }
      ref = item.traits;
      for (i = 0, len = ref.length; i < len; i++) {
        t = ref[i];
        if ((t != null) && t.code === traitId && t.dataId === dataId) {
          return t.value;
        }
      }
      // * Если нет, возвращаем стандартные параметры, чтобы фильтр не пропустил
      if (traitId === Game_BattlerBase.TRAIT_XPARAM) {
        return 0;
      } else {
        return 1;
      }
    } catch (error) {
      e = error;
      console.warn(e);
      return 0;
    }
  };
  // * Убираем статы с default знаением
  // * Сейчас работает фильтр, так как нет параметров плагина
  _.filterStatsBTable = function(table) {
    var i, len, statObj, table2, value;
    table2 = [];
    for (i = 0, len = table.length; i < len; i++) {
      statObj = table[i];
      value = this.getXSStatValueByStat(statObj);
      if (statObj.traitId === Game_BattlerBase.TRAIT_XPARAM) {
        if (value !== 0) {
          // * 0% пропускаем
          table2.push(statObj);
        }
      } else {
        if (value !== 1) {
          // * SPARAM, 100% пропускаем
          table2.push(statObj);
        }
      }
    }
    return table2;
  };
  _._createEqStatsB = function() {
    var i, index, len, t, table;
    table = this.getStatsBTable();
    table = this.filterStatsBTable(table);
    if (table.length === 0) {
      return;
    }
    if (table.length > 8) {
      table = table.slice(0, 8);
    }
    //TODO: background image?
    this._statsB = new Sprite();
    for (index = i = 0, len = table.length; i < len; index = ++i) {
      t = table[index];
      this._createXSStateText(t, index);
    }
    // * register
    this._statsB.visible = false;
    this._statsBase.addChild(this._statsB);
    this._statsAll.push(this._statsB);
  };
  _._getStatXLineParameters = function() {
    return {
      width: 140,
      height: 30,
      fontSize: 11,
      fontFace: null
    };
  };
  _._getStatXLinePositionByIndex = function(index) {
    return [[2, 0], [2, 20], [2, 40], [2, 60], [138, 0], [138, 20], [138, 40], [138, 60]][index];
  };
  _._getStatXColorCode = function(isUp) {
    if (isUp == null) {
      return "";
    }
    if (isUp === true) {
      return "\\C[3]"; // * GREEN
    } else {
      return "\\C[2]"; // * RED
    }
  };
  _._getStatSTitleColor = function() {
    return "\\C[6]";
  };
  _._createXSStateText = function(statObj, index) {
    var colorCode, p, pos, sign, text, textLineItem, value, valueIsUp;
    p = this._getStatXLineParameters();
    if (KDCore.isMZ()) {
      textLineItem = new Window_ExtendedTextLine(new Rectangle(0, 0, p.width, p.height), 0, 0, 0, p.fontSize, p.fontFace);
    } else {
      textLineItem = new Window_ExtendedTextLine(0, 0, p.width + 20, p.height + 20, p.fontSize, p.fontFace);
    }
    pos = this._getStatXLinePositionByIndex(index);
    this._statsB.addChild(textLineItem);
    textLineItem.move(pos);
    //TODO: pattern support
    // $NAME $SIGN $VALUE % - pattern
    value = this.getXSStatValueByStat(statObj);
    value *= 100; // * from .0 to percents
    value = Math.round(value);
    sign = " ";
    valueIsUp = null;
    if (statObj.traitId === Game_BattlerBase.TRAIT_XPARAM) {
      // * Ноля может и не быть (если фильтр)
      valueIsUp = value > 0;
      if (valueIsUp === true) {
        sign = " +";
      } else if (valueIsUp === false) {
        sign = " -";
      }
    } else {
      valueIsUp = value > 100;
    }
    colorCode = this._getStatXColorCode(valueIsUp);
    if (statObj.traitId === Game_BattlerBase.TRAIT_XPARAM) {

    } else {
      // * CONVERT TO < 100 values
      // * NOTHING
      value = value - 100;
      if (value > 0) {
        sign = " +";
      }
    }
    text = this._getStatSTitleColor() + statObj.statText + colorCode + sign + value + " %";
    textLineItem.drawTextFull(text);
  };
  _._getStatExtraNoteZoneParameters = function() {
    var info;
    info = this._getExtraDescForCurrentItem();
    if (info == null) {
      return {
        width: 260,
        height: 160,
        fontSize: 11,
        fontFace: null
      };
    } else {
      return {
        width: eval(info.size.w),
        height: eval(info.size.h),
        fontSize: info.font.size,
        fontFace: info.font.face
      };
    }
  };
  _._createEqExtraC = function() {
    var p, text, textZone;
    text = this.getStatsExtraC();
    if (!String.any(text)) {
      return;
    }
    this._statsC = new Sprite();
    //TODO: Это надо брать из параметров плагина
    p = this._getStatExtraNoteZoneParameters();
    if (KDCore.isMZ()) {
      textZone = new Window_ExtendedTextLine(new Rectangle(0, 0, p.width, p.height), 0, 0, 0, p.fontSize, p.fontFace);
    } else {
      textZone = new Window_ExtendedTextLine(0, 0, p.width + 20, p.height + 20, p.fontSize, p.fontFace);
    }
    this._statsC.addChild(textZone);
    // * register
    this._statsC.visible = false;
    this._statsBase.addChild(this._statsC);
    this._statsAll.push(this._statsC);
    textZone.drawTextExWithWordWrap(text, 0, 0);
  };
})();

// ■ END Sprite_MapInvHelp.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInventoryHotItemCell.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapInventoryHotItemCell;
  //?UPD18
  Sprite_MapInventoryHotItemCell = class Sprite_MapInventoryHotItemCell extends PKD_MI.LIBS.Sprite_MapInvCell {
    constructor(index) {
      super(index, false);
      this._isNoMoreItems = false;
    }

    update() {
      super.update();
      if ((this.item != null) && !DataManager.isItem(this.item) && PKD_MI.Parameters.isRemoveHotCellItemIfZero()) {
        if ($gameParty.numItems(this.item) === 0) {
          this._refreshEquipmentState();
          if (this._isEquipedItem === false) {
            this.removeThisItemFromHotCell();
          }
        }
      }
    }

    setHotKey(hotKey) {
      this.hotKey = hotKey;
      return this._drawHotKey();
    }

    setHotCellItem(item) {
      this.isHotCell = true;
      this.setItem(item);
      this._checkHotItemExists();
      this._drawHotKey();
    }

    isHotKeyTriggered() {
      if (this.hotKey == null) {
        return false;
      }
      if (!this.isEnabled()) {
        return false;
      }
      return Input.isTriggered(this.hotKey.toLowerCase());
    }

    //u27
    drawIconExt() {
      if (PKD_MI.Parameters.get_IsNotUseExtraImgInHotCell()) {
        // * Always draw IconIndex
        return this.drawIcon(this.item.iconIndex);
      } else {
        return PKD_MI.LIBS.Sprite_MapInvCell.prototype.drawIconExt.call(this);
      }
    }

    //u27
    _drawIconBody(iconIndex) {
      var e, size;
      if (PKD_MI.Parameters.get_HotCellsCustomIconSize() > 0) {
        try {
          size = PKD_MI.Parameters.get_HotCellsCustomIconSize();
          this._iconSpr.bitmap.drawIcon(0, 0, iconIndex, size);
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      } else {
        PKD_MI.LIBS.Sprite_MapInvCell.prototype._drawIconBody.call(this, iconIndex);
      }
    }

    _drawHotKey() {
      if (this.hotKey == null) {
        return;
      }
      this._textSprHK.bitmap.clear();
      return this._textSprHK.drawTextFull(this.hotKey);
    }

    _create() {
      super._create();
      return this._createHotKeyText();
    }

    _createHotKeyText() {
      this._textSprHK = KDCore.Sprite.FromParams(PKD_MI.Parameters.getCellItemHotKeyText());
      return this.add(this._textSprHK);
    }

    refreshHotCell() {
      this._clearSpeacialState();
      this.setHotCellItem(this.item);
      if (this.item != null) {
        return this._refreshItemState();
      }
    }

    registerClick() {
      var index;
      this._cell._clickHandlers = [];
      index = this.index;
      this._cell.addClickHandler(function() {
        return PKD_MI.onMapHotCellClick(index);
      });
    }

    _refreshItemState() {
      super._refreshItemState();
      this.enableItem();
      this._checkHotItemExists();
      this._checkUsable();
      if ((this.item != null) && !DataManager.isItem(this.item)) {
        this._refreshEquipmentState();
      }
    }

    _checkHotItemExists() {
      var count;
      if (!this.isHotCell) {
        return;
      }
      if (this._isEquipedItem === false) {
        count = $gameParty.numItems(this.item);
        if (!DataManager.isItem(this.item)) {
          return;
        }
        if (count === 0) {
          this._isNoMoreItems = true;
          if (PKD_MI.Parameters.isRemoveHotCellItemIfZero()) {
            this.removeThisItemFromHotCell();
            return;
          } else {
            this.drawZeroCount();
            this.disableItem();
          }
        } else {
          if (this._isNoMoreItems === true) {
            this._isNoMoreItems = false;
            this.enableItem();
            this._onCheckUsableTick();
          }
        }
      }
    }

    removeThisItemFromHotCell() {
      var e;
      try {
        return this.clear();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }

    _onCheckUsableTick() {
      super._onCheckUsableTick();
      return this._checkHotItemExists();
    }

    drawZeroCount() {
      var __color;
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      __color = this._textSpr.bitmap.textColor;
      this._textSpr.bitmap.textColor = KDCore.Color.RED.CSS;
      this._textSpr.drawTextFull("0", this.settings.cellItemCountText.position);
      this._textSpr.bitmap.textColor = __color;
    }

    startMovingCell() {
      super.startMovingCell();
      return $gameTemp._pkdMIHotCellMoving = this.index;
    }

    _refreshEquipmentState() {
      var canEquip, e, equips, i, j;
      try {
        this._isEquipedItem = false;
        canEquip = $gameParty.leader().canEquip(this.item);
        if (!canEquip) {
          this.disableItem();
        }
        equips = $gameParty.leader().equips();
        for (i in equips) {
          j = equips[i];
          if (j === this.item) {
            this._isEquipedItem = true;
            this._applyEquipmenSpecialState();
            return;
          }
        }
      } catch (error) {
        e = error;
        return PKD_MI.warning(e);
      }
    }

    _checkUsable() {
      if (DataManager.isItem(this.item)) {
        this.partyUsecases = [];
        // * ALWAYS
        this._onCheckUsableTick();
        if (this._checkUsableThread == null) {
          this._checkUsableThread = new KDCore.TimedUpdate(5, this._onCheckUsableTick.bind(this));
        }
      } else {
        this._checkUsableThread = null;
      }
    }

  };
  PKD_MI.register(Sprite_MapInventoryHotItemCell);
})();

// ■ END Sprite_MapInventoryHotItemCell.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MainInvItems.prototype;
  //u27 mod
  _.showFocusLayer = function() {
    var h, settings, w;
    settings = PKD_MI.Parameters.get_PartySelectorSettings();
    if (settings.backgroundLayerSize.w < 0) {
      w = this.settings.invCellMarginX * 5;
    } else {
      w = settings.backgroundLayerSize.w;
    }
    if (settings.backgroundLayerSize.h < 0) {
      h = this.settings.invCellMarginY * 5;
    } else {
      h = settings.backgroundLayerSize.h;
    }
    this._focusLayer = KDCore.Sprite.FromBitmap(w, h);
    //@_focusLayer.move -1, -1
    this._focusLayer.bitmap.fillAll(KDCore.Color.BLACK);
    this._focusLayer.opacity = settings.backgroundLayerOpacity;
    this.content.addChild(this._focusLayer);
    return $gameTemp._pkdMICellFocused = true;
  };
  _.showFocusedItem = function(cell, itemCount) {
    this.focusedCell = new PKD_MI.LIBS.Sprite_MapInvCell(cell.index);
    this.focusedCell.move(cell.x, cell.y);
    this.focusedCell.setFocusItem(cell.item, itemCount);
    return this._focusLayer.addChild(this.focusedCell);
  };
  _.isFocused = function() {
    return this._focusLayer != null;
  };
  _.clearFocus = function() {
    if (!this.isFocused()) {
      return;
    }
    this.content.removeChild(this._focusLayer);
    this._focusLayer.visible = false;
    this._focusLayer.destroy();
    this._focusLayer = null;
    //@focusedCell?.destroy()
    this.focusedCell = null;
    return $gameTemp._pkdMICellFocused = false;
  };
  _.isMouseInFocusZone = function() {
    var pos, rx, ry;
    if (this.focusedCell.isHovered()) {
      return false;
    }
    if (this._isSomePartyActorIsHovered()) {
      return false;
    }
    if (this._isSliderIsHovered()) {
      return false;
    }
    pos = TouchInput;
    rx = KDCore.SDK.canvasToLocalX(this._focusLayer, pos.x);
    ry = KDCore.SDK.canvasToLocalY(this._focusLayer, pos.y);
    return rx >= 0 && ry >= 0 && rx <= this._focusLayer.width && ry <= this._focusLayer.height;
  };
  _.createPartyActors = function() {
    var i, j, len, ref, spr;
    this.partyFaces = [];
    this._focusGroup = new Sprite();
    this.content.addChild(this._focusGroup);
    this._focusGroup.move(this.focusedCell.x, this.focusedCell.y);
    ref = PKD_MI.partyGroup();
    //?line
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      spr = new PKD_MI.LIBS.Sprite_MapInventoryActorCell();
      spr.setActor(i);
      this.partyFaces.push(spr);
      this._focusGroup.addChild(spr);
    }
    return this.partyFaces;
  };
  _._isSomePartyActorIsHovered = function() {
    var i, j, len, ref;
    if (this.partyFaces == null) {
      return false;
    }
    ref = this.partyFaces;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (i.isHovered()) {
        return true;
      }
    }
    return false;
  };
  _.destroyPartyActors = function() {
    this.partyFaces = null;
    return this._destroyFocusGroup();
  };
  _._destroyFocusGroup = function() {
    var ref;
    this.removeChild(this._focusGroup);
    if ((ref = this._focusGroup) != null) {
      ref.destroy();
    }
    return this._focusGroup = null;
  };
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MainInvItems.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MainInvItems.prototype;
  _.createSlider = function(methodA, methodB) {
    //"SHOW SLIDER".p()
    this._focusGroup = new Sprite();
    this.content.addChild(this._focusGroup);
    this._focusGroup.move(this.focusedCell.x, this.focusedCell.y);
    this._sliderItem = new PKD_MI.LIBS.Sprite_NumberSlider(this._onSliderLoaded.bind(this), methodB);
    this._sliderItem.visible = false;
    this._focusGroup.addChild(this._sliderItem);
    this._sliderOkBtn = this._createSliderOkBtn(methodA);
    this._sliderOkBtn.visible = false;
    this._focusGroup.addChild(this._sliderOkBtn);
    this._createSlidedItemRealCountText();
    this._onSliderLoaded();
  };
  _.refreshSlider = function(value, isAllowed) {
    this._lastSliderValue = value;
    this._slierItemCountText.clear();
    //@_slierItemCountText.bitmap.fillAll KDCore.Color.RED
    if (isAllowed) {
      this._slierItemCountText.bitmap.textColor = KDCore.Color.FromHex(this.settings.cellItemSliderCountText.textColor).CSS;
      this._sliderOkBtn.enable();
    } else {
      this._slierItemCountText.bitmap.textColor = KDCore.Color.FromHex(this.settings.cellItemSliderCountText.textColor2).CSS;
      this._sliderOkBtn.disable();
    }
    return this._slierItemCountText.drawTextFull(value, this.settings.cellItemSliderCountText.position);
  };
  _.getSliderValue = function() {
    return this._lastSliderValue;
  };
  _._createSlidedItemRealCountText = function() {
    this._slierItemCountText = KDCore.Sprite.FromBitmap(this.settings.cellItemSliderCountText.textBoxWidth, this.settings.cellItemSliderCountText.textBoxHeight);
    this.applyTextSettingsByExtraSettings(this._slierItemCountText, this.settings.cellItemSliderCountText);
    return this._focusGroup.addChild(this._slierItemCountText);
  };
  _._createSliderOkBtn = function(methodA) {
    var btn, btn1, btn2;
    this._sliderOkBtn = new KDCore.Button();
    btn = ImageManager.loadPKDMI('slider_button_ok_00');
    btn1 = ImageManager.loadPKDMI('slider_button_ok_01');
    btn2 = ImageManager.loadPKDMI('slider_button_ok_03');
    this._sliderOkBtn.setButtonImages(btn, btn1, btn, btn2);
    this._sliderOkBtn.x = this.settings.itemSliderSettings.sliderOkButtonMarginX;
    this._sliderOkBtn.y = this.settings.itemSliderSettings.sliderOkButtonMarginY;
    this._sliderOkBtn.addClickHandler(function() {
      return methodA();
    });
    return this._sliderOkBtn;
  };
  _._onSliderLoaded = function() {
    //"AFTER LOAD".p()
    if (this._sliderItem == null) {
      return;
    }
    this._sliderItem.x = this.settings.itemSliderSettings.sliderCellMarginX;
    this._sliderItem.y = this.settings.itemSliderSettings.sliderCellMarginY;
    this._sliderItem.visible = true;
    return this._sliderOkBtn.visible = true;
  };
  _.destroySlider = function() {
    var ref;
    if ((ref = this._sliderItem) != null) {
      ref.terminate();
    }
    this._destroyFocusGroup();
    return this._sliderItem = null;
  };
  _._isSliderIsHovered = function() {
    if (this._sliderItem == null) {
      return false;
    }
    if (this._sliderOkBtn.isMouseInButton()) {
      return true;
    }
    if (this._sliderItem.isInMousePositionAll()) {
      return true;
    }
  };
  _.getCellByItem = function(item) {
    var c, i, len, ref;
    ref = this._cells;
    for (i = 0, len = ref.length; i < len; i++) {
      c = ref[i];
      if (c.item === item) {
        return c;
      }
    }
    return null;
  };
})();

// ■ END Sprite_MainInvItems.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapInvMain.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  // * ТОЛЬКО ДЛЯ ИНВЕНТАРЯ (не сундук и не хранилище)

  //@[DEFINES]
  _ = PKD_MI.LIBS.Sprite_MapInvMain.prototype;
  _._createExtraOptions = function() {
    var e, i, len, option, options;
    try {
      if (!PKD_MI.Parameters.isUseExtraOptionsMenu()) {
        return;
      }
      options = PKD_MI.Parameters.getExtraOptions();
      if (options.length === 0) {
        return;
      }
      this._exOptions = [];
      for (i = 0, len = options.length; i < len; i++) {
        option = options[i];
        this._createExtraOption(option);
      }
      if (this._exOptions.length > 0) {
        this._extraOptionGpIndex = 0;
        this._updateExtraOptions = this._updateExtraOptionsMain;
        return this._createExtraOptionsEnableCheckThread();
      } else {
        return this._exOptions = null;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createExtraOption = function(option) {
    var button, commonEventId, e, gamePadOptionCursor;
    try {
      if (option == null) {
        return;
      }
      button = new KDCore.ButtonMU(option.images, true, 'pMapInventory');
      this._exOptions.push(button);
      this.addChild(button);
      // * Confgurate
      commonEventId = option.commonEvent;
      if (commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
        button.addClickHandler(function() {
          var e;
          try {
            MICloseSelectWindow();
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
          return $gameTemp.reserveCommonEvent(commonEventId);
        });
      }
      button.miExEnableCondition = option.isEnabled;
      button.move(option.margins);
      button.miExTitle = option.title;
      gamePadOptionCursor = this._createGpExtraOptionCursor(option.gpCursorOffset);
      button.addChild(gamePadOptionCursor);
      return button._gpCursor = gamePadOptionCursor;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createExtraOptionsEnableCheckThread = function() {
    this.exOpThread = new KDCore.TimedUpdate(10, this._extraOptionEnableCheck.bind(this));
  };
  _._extraOptionEnableCheck = function() {
    var b, e, enableCondition, i, len, ref, results;
    try {
      ref = this._exOptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        b = ref[i];
        enableCondition = b.miExEnableCondition;
        if (!String.any(enableCondition)) {
          continue;
        }
        results.push(b.refreshState(eval(b.miExEnableCondition) === true));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._updateExtraOptions = function() {}; // * DUMMY
  _._updateExtraOptionsMain = function() {
    this.exOpThread.update();
    this._updateGamepadKeys();
  };
  _._updateGamepadKeys = function() {
    var b, button, i, index, len, ref;
    if (!PKD_MI.isInventoryOpened()) {
      return;
    }
    if (!PKD_MI.IsGamepad()) {
      return;
    }
    if (KDGamepad.isKey("LTrigger")) {
      if (this._extraOptionGpIndex > 0) {
        this._extraOptionGpIndex--;
      }
    } else if (KDGamepad.isKey("RTrigger")) {
      if (this._extraOptionGpIndex < (this._exOptions.length - 1)) {
        this._extraOptionGpIndex++;
      }
    }
    ref = this._exOptions;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      b = ref[index];
      b._gpCursor.visible = index === this._extraOptionGpIndex;
    }
    if (KDGamepad.isKey("Y")) {
      button = this._exOptions[this._extraOptionGpIndex];
      if ((button != null) && button.isEnabled()) {
        button.click();
      } else {
        SoundManager.playBuzzer();
      }
    }
  };
  _._destroyExtraOptions = function() {
    var b, e, i, len, ref;
    if (this._exOptions == null) {
      return;
    }
    try {
      ref = this._exOptions;
      for (i = 0, len = ref.length; i < len; i++) {
        b = ref[i];
        this.removeChild(b);
        b.visible = false;
        // * На всякий случай
        if ($gameTemp.kdButtonUnderMouse === b) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
      this._exOptions = null;
      this.exOpThread = null;
      this._updateExtraOptions = function() {}; // * EMPTY
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._createGpExtraOptionCursor = function(offset) {
    var e, s;
    try {
      s = new Sprite(ImageManager.loadPKDMI("extraOptionsMenuGamepadCursor"));
      s.visible = false;
      try {
        if ((offset == null) || (offset.x == null)) {
          offset = {
            x: -6,
            y: -6
          };
        }
        s.move(offset);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        s.move(0, 0);
      }
      return s;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return new Sprite();
    }
  };
})();

// ■ END Sprite_MapInvMain.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_MapUserChestHeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_MapUserChestHeader;
  Sprite_MapUserChestHeader = class Sprite_MapUserChestHeader extends PKD_MI.LIBS.Sprite_MapInvHeader {
    constructor() {
      super();
    }

    _drawIcon() {
      var icon, tempSettings;
      tempSettings = PKD_MI.getUIMapUserChestSettings();
      if (tempSettings.icon == null) {
        return;
      }
      icon = PKD_MI.FromImgI(tempSettings.icon);
      icon.move(tempSettings.iconMarginX, tempSettings.iconMarginY);
      return this.add(icon);
    }

    _settingsJSON() {
      return PKD_MI.getUIMapInventorySettings();
    }

    _createCloseButton() {
      var ref, tempSettings;
      super._createCloseButton();
      this.closeBtn.clearClickHandlers();
      this.closeBtn.addClickHandler(function() {
        return PKD_MI.closeUserChest();
      });
      if ((ref = this.category4) != null) {
        ref.visible = false;
      }
      tempSettings = PKD_MI.getUIMapUserChestSettings();
      this._content.move(tempSettings.categoryButtonsMarginX, tempSettings.categoryButtonsMarginY);
      if (this.category1 != null) {
        this.category1.clearClickHandlers();
        this.category1.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryItems();
        });
      }
      if (this.category2 != null) {
        this.category2.clearClickHandlers();
        this.category2.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryWeapons();
        });
      }
      if (this.category3 != null) {
        this.category3.clearClickHandlers();
        this.category3.addClickHandler(function() {
          SoundManager.playCursor();
          PKD_MI.userChestShowCategoryArmors();
        });
      }
      if (this.category4 != null) {
        this.category4.clearClickHandlers();
      }
    }

    //u22
    //$[OVER]
    _currentCategoryTag() {
      return "userChest";
    }

    //u22
    //$[OVER]
    _createCategoriesNew() {} // * NOTHING

  };
  PKD_MI.register(Sprite_MapUserChestHeader);
})();

// ■ END Sprite_MapUserChestHeader.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  //u19
  _._createMIButton = function() {
    var img0, img1, img2, img3, settings;
    this._button = new KDCore.Button();
    settings = $PKD_MapInventorySettings.ScreenButtonSettings;
    this._button.move(KDCore.Utils.jsonPos(settings.position));
    img0 = ImageManager.loadPKDMI(settings.mainImg);
    img1 = ImageManager.loadPKDMI(settings.hoverImg);
    img2 = ImageManager.loadPKDMI(settings.pressedImg);
    img3 = ImageManager.loadPKDMI(settings.disabledImg);
    this._button.setButtonImages(img0, img1, img2, img3);
    this._button.setAlphaMode();
    if (settings.labelText != null) {
      this._button.setHelpText(settings.labelText[0], settings.labelText[1]);
      this._button.setTextPosition(settings.labelText[2]);
    }
    this._button.addClickHandler(function() {
      SoundManager.playCursor();
      if ($gamePlayer.isPKDInventoryAllowed()) { //line
        return PKD_MI.openOrCloseInventory(); //line
      }
    });
    this.addChild(this._button);
    this.applyMIButtonSettings();
  };
  _.applyMIButtonSettings = function() {
    var settings;
    settings = $gameSystem.getPKIButtonSettings();
    if (settings == null) {
      return;
    }
    if (settings.position != null) {
      this._button.move(settings.position);
    } else {
      this._button.move(KDCore.Utils.jsonPos($PKD_MapInventorySettings.ScreenButtonSettings.position));
    }
    this._button.visible = settings.visibility;
    if (settings.disable === true) {
      this._button.disable();
    } else {
      this._button.enable();
    }
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //u23 ALL

  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  //?DYNAMIC
  _._updateExHelpWindow = function() {}; // * EMPTY
  _._updateExHelpWindowMain = function() {
    var ref;
    if ((ref = this._itemDescShowTimer) != null) {
      ref.update();
    }
    this._updateEquipStatShow();
  };
  _._createHelpWindow = function(cell, isFromInventory = true) {
    if (PKD_MI.isItemHaveAlterDescription(cell.item)) {
      this._itemDescWindow = new Sprite_MI_AlternativeDescription(cell, isFromInventory);
    } else {
      this._itemDescWindow = new PKD_MI.LIBS.Sprite_MapInvHelp();
      this._itemDescWindow.setup(cell);
      this._itemDescWindow.refreshPlacement(isFromInventory);
    }
    this._waitTime = this._itemDescWindow.delay();
    this._itemDescShowTimer = new KDCore.TimedUpdate(1, this._onShowTimeTick.bind(this));
    this._updateExHelpWindow = this._updateExHelpWindowMain;
    this._itemDescWindow.opacity = 0;
    SceneManager._scene.addChild(this._itemDescWindow);
  };
  _._onShowTimeTick = function() {
    if (this._waitTime > 0) {
      return this._waitTime--;
    } else {
      if (this._itemDescWindow.opacity < 255) {
        return this._itemDescWindow.opacity += 25;
      } else {
        return this._itemDescShowTimer = null;
      }
    }
  };
  _._hideHelp = function() {
    if (this._itemDescWindow == null) {
      return;
    }
    this._destroyHelpWindow();
  };
  _._destroyHelpWindow = function() {
    var parent;
    this._itemDescShowTimer = null;
    if (this._itemDescWindow == null) {
      return;
    }
    parent = this._itemDescWindow.parent;
    if (parent != null) {
      parent.removeChild(this._itemDescWindow);
    }
    this._itemDescWindow.visible = false;
    this._itemDescWindow = null;
    return this._updateExHelpWindow = function() {}; // * EMPTY
  };
  _._updateEquipStatShow = function() {
    if (TouchInput.wheelY >= 20) {
      this._itemDescWindow.showItemStats();
    } else if (TouchInput.wheelY <= -20) {
      this._itemDescWindow.showItemStats(true);
    }
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  // * ============================== UPDATE 1.6 ============================================

  //?UPDX, u23
  _._createOUTItems = function() {
    var c, cells, i, j, len;
    this._hotCellsContainer = new Sprite();
    this.addChild(this._hotCellsContainer);
    cells = this._getProperCellsGroup();
    this.uiExtraCells = [];
// * Индекс нужен чтобы Click обрабатывать
    for (i = j = 0, len = cells.length; j < len; i = ++j) {
      c = cells[i];
      this.uiExtraCells.push(this._createAndAddOUTItemToUI(c, i));
    }
    if (!PKD_MI.Parameters.getIsShowOuterItemsDesc()) {
      this._updateOuterHoverHelp = function() {}; // * EMTPY
    }
  };
  //u25
  _._getProperCellsGroup = function() {
    if ($gamePlayer._aaUserHotCellsGroupIndex != null) {
      return PKD_MI.Parameters.getHotCellsEx($gamePlayer._aaUserHotCellsGroupIndex);
    } else {
      return PKD_MI.Parameters.getHotCells();
    }
  };
  //?UPDX
  _._createAndAddOUTItemToUI = function(cellData, index) {
    var cell, item;
    cell = new PKD_MI.LIBS.Sprite_MapInventoryHotItemCell(index);
    item = $gamePlayer.addGetItemForHotCell(index);
    if (item != null) {
      this.setItemToOuterCell(cell, item);
    }
    // * сохранять по индексу
    cell.move(cellData.pos.x, cellData.pos.y);
    if (PKD_MI.Parameters.isOuterItemsHotKeysEnabled()) {
      cell.setHotKey(cellData.key);
    }
    this._hotCellsContainer.addChild(cell);
    return cell;
  };
  //?UPDX, u23
  _.startMoveCellItem = function(item) {
    var extraImg, iconSize;
    this._dragItem = item;
    $gameTemp._pkdMICellMoving = true;
    iconSize = 32;
    if (PKD_MI.Parameters.isCustomSizeCells()) {
      iconSize = PKD_MI.Parameters.getCustomSizeCellsParameters().iconSize;
    }
    this._movingItemSprite = new Sprite(new Bitmap(iconSize, iconSize));
    extraImg = DataManager.getItemInvImage(item);
    if (String.any(extraImg)) {
      this._movingItemSprite.bitmap.drawIcon(0, 0, ImageManager.loadPKDMI_Icon(extraImg), iconSize);
    } else {
      this._movingItemSprite.bitmap.drawIcon(0, 0, item.iconIndex, iconSize);
    }
    SceneManager._scene.addChild(this._movingItemSprite);
    this._showThrowOutBox(); //TO
    this._resetOuterItemHoverHelp();
  };
  
  //?UPDX
  _._updateOuterCells = function() {
    if ($gameTemp._pkdMICellMoving === true) {
      this._updateDrag();
    } else {
      this._updateOuterHotKeys();
      this._updateOuterHoverHelp();
    }
  };
  //?UPDX
  _._updateOuterHotKeys = function() {
    var c, j, len, ref;
    ref = this.uiExtraCells;
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c.isHotKeyTriggered()) {
        if (PKD_MI.Parameters.isAllowAssignHotCellsByHotKeys()) {
          if (this._isAssignedItemFromInventoryToHotCell(c)) {
            return;
          } else {
            PKD_MI.onMapHotCellClick(c.index);
          }
        } else {
          PKD_MI.onMapHotCellClick(c.index);
        }
        return;
      }
    }
  };
  _._isAssignedItemFromInventoryToHotCell = function(hotCell) {
    var existsOne, item;
    if (!PKD_MI.isInventoryOpened()) {
      return false;
    }
    item = PKD_MI.eUI.inventory.tryHotKeyHotCellAssign();
    if (item == null) {
      return false;
    }
    existsOne = this.uiExtraCells.find(function(c) {
      return c.item === item;
    });
    if (existsOne != null) {
      this.setItemToOuterCell(existsOne, null);
    }
    this.setItemToOuterCell(hotCell, item);
    return true;
  };
  //?UPDX
  _._updateDrag = function() {
    // * drag is end
    this._movingItemSprite.move(TouchInput.x, TouchInput.y);
    this._updateThrowOutBox(); //TO
    if (TouchInput.isCancelled()) {
      this._clearMovingItemSprite();
      return;
    }
    if (!TouchInput.isPressed()) {
      this._onRelaseDragginCell();
      this._cancelThrowOutBox(); //TO
      return this._clearMovingItemSprite();
    }
  };
  //?UPDX, UPD18
  _._onRelaseDragginCell = function() {
    var cell, count;
    if (this.isAnyOuterCellUnderMouse()) {
      cell = this.uiExtraCells.find(function(c) {
        return c.isHovered();
      });
      if (cell == null) {
        return;
      }
      if ($gameTemp._pkdMIHotCellMoving >= 0) {
        return this.swapItemInOuterCells(this.uiExtraCells[$gameTemp._pkdMIHotCellMoving], cell, this._dragItem);
      } else {
        return this.setItemToOuterCell(cell, this._dragItem);
      }
    } else {
      if (this.isThrowOutBoxIsReadyToThrow()) { //TO
        return this.throwOutItem(); //TO
      } else {
        if (PKD_MI.Parameters.isDropOutToGround() && $gameTemp._pkdMIHotCellMoving < 0 && (this._dragItem != null)) {
          if (DataManager.isItem(this._dragItem)) {
            count = $gameParty.numItems(this._dragItem);
          } else {
            count = 1;
          }
          return this._onDropOutItem(this._dragItem, count, true);
        } else {
          if ($gameTemp._pkdMIHotCellMoving >= 0) {
            cell = this.uiExtraCells[$gameTemp._pkdMIHotCellMoving];
            if (cell != null) {
              return this.setItemToOuterCell(cell, null);
            }
          } else {
            return SoundManager.playBuzzer();
          }
        }
      }
    }
  };
  //?UPD25
  _.swapItemInOuterCells = function(cellA, cellB, item) {
    var e;
    try {
      this.setItemToOuterCell(cellA, cellB.item);
      return this.setItemToOuterCell(cellB, item);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?UPDX, UPD18
  _._clearMovingItemSprite = function() {
    this._movingItemSprite.removeFromParent();
    this._movingItemSprite.visible = false;
    this._movingItemSprite = null;
    $gameTemp._pkdMICellMoving = false;
    $gameTemp._pkdMIHotCellMoving = -1;
    this._dragItem = null;
    this._cancelThrowOutBox(); //TO
  };
  //?UPDX
  _.setItemToOuterCell = function(outerCell, item) {
    if (!this.isItemCanBeUsedInHotCell(item)) {
      SoundManager.playBuzzer();
      return;
    }
    outerCell.setHotCellItem(item);
    $gamePlayer.aaPutItemToHotCell(item, outerCell.index);
    return setTimeout((() => {
      var e;
      try {
        return this.refreshMapHotCells();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 50);
  };
  _.isItemCanBeUsedInHotCell = function(item) {
    return !KDCore.Utils.hasMeta("notForHotCell", item);
  };
  //?UPDX
  _.refreshMapHotCells = function() {
    return this.uiExtraCells.forEach(function(c) {
      return c.refreshHotCell();
    });
  };
  //?UPDX
  _.callHotCellItem = function(index) {
    var cell, ref;
    if ($gameTemp._pkdMICellMoving === true) {
      return;
    }
    cell = this.uiExtraCells[index];
    if ((cell != null) && (cell.item != null)) {
      if ((ref = this.inventory) != null) {
        ref.onHotCellItemAction(cell);
      }
    }
    setTimeout((() => {
      var e;
      try {
        return this.refreshMapHotCells();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 50);
  };
  //u23
  _._updateOuterHoverHelp = function() {
    var cell, e;
    if (this.isAnyOuterCellUnderMouse()) {
      cell = this.uiExtraCells.find(function(c) {
        return c.isHovered() && (c.item != null);
      });
      if (this.__hoveredOuterCell === cell) {
        return;
      } else {
        this._hideHelp();
        if (cell != null) {
          try {
            this._createHelpWindow(cell, true);
            this.__hoveredOuterCell = cell;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            this._resetOuterItemHoverHelp();
          }
        } else {
          if (this.__hoveredOuterCell != null) {
            this._resetOuterItemHoverHelp();
          }
        }
      }
    } else {
      this._resetOuterItemHoverHelp();
    }
  };
  //u23
  _._resetOuterItemHoverHelp = function() {
    if (this.__hoveredOuterCell != null) {
      this.__hoveredOuterCell = null;
      return this._hideHelp();
    }
  };
  //u25
  _.switchHotCellsGroup = function() {
    var e;
    try {
      if ($gameTemp._pkdMICellMoving === true) {
        return;
      }
      this._hotCellsContainer.removeFromParent();
      return this._createOUTItems();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_InvUI.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //?UPD18 ALL

  //@[DEFINES]
  _ = Spriteset_InvUI.prototype;
  _._showThrowOutBox = function() {
    var params;
    if ($gamePlayer._mi_totfDisable === true) {
      return;
    }
    if (!PKD_MI.Parameters.isThrowOutEnabled()) {
      return;
    }
    if (this._dragItem == null) {
      return;
    }
    if ((this._dragItem.itypeId != null) && this._dragItem.itypeId === 2) {
      return;
    }
    params = PKD_MI.Parameters.getThrowOutSettings();
    this._toSprite = new PKD_MI.LIBS.SpriteThrowOutBox(params, this._inventorySprite.x, this._inventorySprite.y);
    return this.addChild(this._toSprite);
  };
  _.isThrowOutBoxIsReadyToThrow = function() {
    var ref;
    return (ref = this._toSprite) != null ? ref.isReadyToThrow() : void 0;
  };
  _.throwOutItem = function() {
    var removeCount;
    if (PKD_MI.Parameters.isShowDropOutSlider() && $gameParty.numItems(this._dragItem) > 1) {
      this._showTrowOutSlider();
      return;
    }
    removeCount = 1;
    if (Input.isPressed('shift')) {
      removeCount = $gameParty.maxItems();
    }
    this._onDropOutItem(this._dragItem, removeCount);
  };
  _._onDropOutItem = function(item, count, isForceVisualDrop = false) {
    var cme, e, params;
    try {
      params = PKD_MI.Parameters.getThrowOutSettings();
      KDCore.Utils.playSE(params.throwOutSE);
      $gameParty.loseItem(item, count, true);
      try {
        $gameTemp.miDroppedOutItemId = item.id;
        cme = PKD_MI.Parameters.getDropOutCommonEvent();
        if ((cme != null) && cme > 0) {
          $gameTemp.reserveCommonEvent(cme);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      if (isForceVisualDrop === true) {
        return $gameMap.miMakePlayerVisualDrop(item, count);
      } else {
        // * Visual drop will be made
        if (Imported.PKD_ExtendedLoot === true && PKD_MI.Parameters.isDropOutViaThrowOutBox()) {
          return $gameMap.miMakePlayerVisualDrop(item, count);
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._showTrowOutSlider = function() {
    var cell, e;
    try {
      cell = $gameTemp._pkdMIMovedCellRef;
      this.inventory._onThrowUpSlider(cell);
      return $gameTemp._pkdMIMovedCellRef = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._updateThrowOutBox = function() {
    if (this._toSprite == null) {
      return;
    }
    if (!this.isInventoryOpen()) {
      return this._cancelThrowOutBox();
    }
  };
  _._cancelThrowOutBox = function() {
    if (this._toSprite == null) {
      return;
    }
    this._toSprite.visible = false;
    this.removeChild(this._toSprite);
    return this._toSprite = null;
  };
})();

// ■ END Spriteset_InvUI.coffee
//---------------------------------------------------------------------------

//Plugin PKD_MapInventory builded by PKD PluginBuilder 2.2.1 - 27.06.2024