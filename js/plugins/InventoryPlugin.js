/*:
 * @plugindesc This plugin can save multiple inventory state using ID and load it back in using the ID asigned with the inventory. There is also a command to clear the full inventory.
 * @author Samuel Chabot
 * 
 * @help 
 * --------------------------------------------------------------
 * TERMS OF USE
 * --------------------------------------------------------------
 * 
 * This plugin MAY be used freely for any commercial or non-commercial 
 * RPG Maker MZ project.
 * 
 * This plugin MAY be modified freely for use in any commercial or 
 * non-commercial RPG Maker MZ project.
 * 
 * Please consider providing credit to the author.
 * 
 * Thank you for using this plugin in your project!
 * 
 * 
 * @command saveInventory
 * @text Save Inventory
 * @desc Saves the current inventory to a file.
 * @arg inventoryId
 * @text Inventory ID
 * @desc ID of the inventory to save.
 * @type number
 *
 * @command loadInventory
 * @text Load Inventory
 * @desc Loads the inventory from a file.
 * @arg inventoryId
 * @text Inventory ID
 * @desc ID of the inventory to load.
 * @type number
 *
 * @command clearInventory
 * @text Clear Inventory
 * @desc Clears the inventory.
 * 
 * 
 * @command saveMoney
 * @text Save Money
 * @desc Saves the current money to a file.
 * @arg moneyID
 * @text money ID
 * @desc ID of the money to save.
 * @type number
 * 
 * @command loadMoney
 * @text Load Monoey
 * @desc Loads the money from a file.
 * @arg moneyID
 * @text money ID
 * @desc ID of the money to load.
 * @type number
 * 
 * @command clearMoney
 * @text Clear Money
 * @desc Clears the Money.
 * 
 */

const fs = require('fs');
const path = require('path');

function getLocalFilePath(saveFileId, inventoryId) {
    return path.join(path.dirname(process.mainModule.filename), 'save', 'inventory', `inventory${saveFileId}_${inventoryId}.json`);
}

PluginManager.registerCommand('InventoryPlugin', 'saveInventory', args => {
    const saveFileId = $gameSystem.savefileId();
    const inventoryId = args.inventoryId;
    const dir = path.join(path.dirname(process.mainModule.filename), 'save', 'inventory');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const inventory = [];

    $dataItems.forEach((item, index) => {
        if (item && $gameParty.numItems(item) > 0) {
            inventory.push({ id: index, type: 'item', quantity: $gameParty.numItems(item) });
        }
    });

    $dataWeapons.forEach((weapon, index) => {
        if (weapon && $gameParty.numItems(weapon) > 0) {
            inventory.push({ id: index, type: 'weapon', quantity: $gameParty.numItems(weapon) });
        }
    });

    $dataArmors.forEach((armor, index) => {
        if (armor && $gameParty.numItems(armor) > 0) {
            inventory.push({ id: index, type: 'armor', quantity: $gameParty.numItems(armor) });
        }
    });

    const json = JSON.stringify(inventory);
    fs.writeFileSync(getLocalFilePath(saveFileId, inventoryId), json);
});

PluginManager.registerCommand('InventoryPlugin', 'loadInventory', args => {
    const saveFileId = $gameSystem.savefileId();
    const inventoryId = args.inventoryId;
    const localFilePath = getLocalFilePath(saveFileId, inventoryId);

    if (fs.existsSync(localFilePath)) {
        const json = fs.readFileSync(localFilePath, { encoding: 'utf8' });
        const inventory = JSON.parse(json);

        $dataItems.forEach((item, index) => {
            if (item) $gameParty.loseItem(item, $gameParty.numItems(item));
        });
        $dataWeapons.forEach((weapon, index) => {
            if (weapon) $gameParty.loseItem(weapon, $gameParty.numItems(weapon));
        });
        $dataArmors.forEach((armor, index) => {
            if (armor) $gameParty.loseItem(armor, $gameParty.numItems(armor));
        });

        inventory.forEach(itemData => {
            let item;
            if (itemData.type === 'item') item = $dataItems[itemData.id];
            if (itemData.type === 'weapon') item = $dataWeapons[itemData.id];
            if (itemData.type === 'armor') item = $dataArmors[itemData.id];
            if (item) $gameParty.gainItem(item, itemData.quantity);
        });
    }
});


PluginManager.registerCommand('InventoryPlugin', 'clearInventory', args => {
    $dataItems.forEach((item, index) => {
        if (item) $gameParty.loseItem(item, $gameParty.numItems(item));
    });
    $dataWeapons.forEach((weapon, index) => {
        if (weapon) $gameParty.loseItem(weapon, $gameParty.numItems(weapon));
    });
    $dataArmors.forEach((armor, index) => {
        if (armor) $gameParty.loseItem(armor, $gameParty.numItems(armor));
    });
});


function getMoneyFilePath(saveFileId, moneyId) {
    return path.join(path.dirname(process.mainModule.filename), 'save', 'inventory', 'money', `money${saveFileId}_${moneyId}.json`);
}

PluginManager.registerCommand('InventoryPlugin', 'clearMoney', args => {
    $gameParty.loseGold($gameParty.gold());
});

PluginManager.registerCommand('InventoryPlugin', 'saveMoney', args => {
    const saveFileId = $gameSystem.savefileId();
    const moneyId = args.moneyID;

    const dir = path.join(path.dirname(process.mainModule.filename), 'save', 'inventory', 'money');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const money = $gameParty.gold();
    const json = JSON.stringify(money);
    fs.writeFileSync(getMoneyFilePath(saveFileId, moneyId), json);
});

PluginManager.registerCommand('InventoryPlugin', 'loadMoney', args => {
    const saveFileId = $gameSystem.savefileId();
    const moneyId = args.moneyID;
    const moneyFilePath = getMoneyFilePath(saveFileId, moneyId);

    if (fs.existsSync(moneyFilePath)) {
        const json = fs.readFileSync(moneyFilePath, { encoding: 'utf8' });
        const money = JSON.parse(json);

        $gameParty.loseGold($gameParty.gold());
        $gameParty.gainGold(money);
    }
});

