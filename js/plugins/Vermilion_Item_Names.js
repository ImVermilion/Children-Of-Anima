// Vermilion_Item_Names.js (Versión Final para RPG Maker MZ)
(() => {
    const pluginName = "Vermilion_Item_Names.js";

    // Guardamos una referencia a la función original
    const _Game_Party_gainItem = Game_Party.prototype.gainItem;

    // Sobreescribimos la función
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        // Guardamos si el objeto es un arma o armadura ANTES de hacer cualquier otra cosa.
        const isWeapon = DataManager.isWeapon(item);
        const isArmor = DataManager.isArmor(item);

        if (item && amount > 0 && (isWeapon || isArmor)) {
            const baseItem = item;
            const affixes = parseAffixesFromNotetags(baseItem.note);
            
            if (affixes.length > 0) {
                for (let i = 0; i < amount; i++) {
                    const chosenAffix = rollForAffix(affixes);

                    if (chosenAffix) {
                        // Creamos la copia. Aunque pierda su "identidad", ya no nos importa.
                        let newItem = JSON.parse(JSON.stringify(baseItem));
                        applyAffixToItem(newItem, chosenAffix);

                        // Usamos el resultado que guardamos al principio para decidir el array correcto.
                        let dataArray;
                        if (isWeapon) {
                            dataArray = $dataWeapons;
                        } else if (isArmor) {
                            dataArray = $dataArmors;
                        }
                        
                        // Este bloque ahora debería funcionar siempre.
                        if (dataArray) {
                            const newId = dataArray.length;
                            newItem.id = newId;
                            dataArray[newId] = newItem;
                            _Game_Party_gainItem.call(this, dataArray[newId], 1, includeEquip);
                        }
                    } else {
                        // Si no hay afijo, se añade el item normal
                        _Game_Party_gainItem.call(this, baseItem, 1, includeEquip);
                    }
                }
                // Salimos de la función porque ya hemos gestionado la entrega de objetos.
                return;
            }
        }
        
        // Si no se cumplió ninguna condición, se ejecuta la función original sin cambios.
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
    };

    // --- Funciones de Ayuda ---

    function parseAffixesFromNotetags(notetags) {
        const results = [];
        const regex = /<Affix:\s*(prefix|suffix),\s*(.+?),\s*(\d+),\s*(MHP|MMP|ATK|DEF|MAT|MDF|AGI|LUK),\s*([+-]?\d+)>/gi;
        let match;
        while ((match = regex.exec(notetags)) !== null) {
            results.push({
                type: match[1].toLowerCase(),
                name: match[2].trim(),
                chance: parseInt(match[3]),
                stat: match[4].toUpperCase(),
                value: parseInt(match[5])
            });
        }
        return results;
    }

    function rollForAffix(affixes) {
        const roll = Math.random() * 100;
        let cumulativeChance = 0;
        for (const affix of affixes) {
            cumulativeChance += affix.chance;
            if (roll < cumulativeChance) {
                return affix;
            }
        }
        return null;
    }

    function applyAffixToItem(item, affix) {
        if (affix.type === 'prefix') {
            item.name = `${affix.name} ${item.name}`;
        } else { // suffix
            item.name = `${item.name} ${affix.name}`;
        }
        const paramIds = { MHP: 0, MMP: 1, ATK: 2, DEF: 3, MAT: 4, MDF: 5, AGI: 6, LUK: 7 };
        const paramId = paramIds[affix.stat];
        if (paramId !== undefined) {
            if (!item.params) item.params = [0,0,0,0,0,0,0,0];
            item.params[paramId] += affix.value;
        }
        item.note += `\n<AffixApplied: ${affix.name}>`;
    }

})();