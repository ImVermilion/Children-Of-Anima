// Vermilion_Item_Names.js
(() => {
    const pluginName = "Vermilion_Item_Names.js";

    // Guardamos una referencia a la función original
    const _Game_Party_gainItem = Game_Party.prototype.gainItem;

    // Sobreescribimos la función
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        if (item && amount > 0) {
            // Aquí irá nuestra lógica de afijos
            const baseItem = item;
            const itemMeta = baseItem.meta;

            // 1. Parsear los notetags para obtener los posibles afijos
            const affixes = parseAffixesFromNotetags(baseItem.note);
            
            if (affixes.length > 0) {
                // Generar una copia del objeto para no modificar el original de la base de datos
                let newItem = JSON.parse(JSON.stringify(baseItem));

                // 2. Lógica de probabilidad para elegir un afijo
                const chosenAffix = rollForAffix(affixes);

                if (chosenAffix) {
                    // 3. Modificar el nombre y los stats del nuevo objeto
                    applyAffixToItem(newItem, chosenAffix);

                    // 4. Lógica para objetos únicos (no apilables)
                    if (itemMeta.UniqueAffixItem) {
                        // Si es un objeto único, lo añadimos como un arma "falsa" para que no se apile.
                        // Esta es una técnica común para forzar la individualidad.
                        const newId = $dataWeapons.length;
                        $dataWeapons[newId] = newItem;
                        newItem.id = newId;
                        _Game_Party_gainItem.call(this, $dataWeapons[newId], 1, includeEquip);
                    } else {
                        // Para armas y armaduras, que ya son independientes
                        _Game_Party_gainItem.call(this, newItem, 1, includeEquip);
                    }

                    // Si se aplicó un afijo, no continuamos con la función original para evitar duplicados.
                    return;
                }
            }
        }
        
        // Si no se aplicó ningún afijo, llamamos a la función original tal cual.
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
    };

    // --- Funciones de Ayuda ---

    function parseAffixesFromNotetags(notetags) {
        const results = [];
        const regex = /<Affix:\s*(prefix|suffix),\s*(.+?),\s*(\d+),\s*(ATK|DEF|MAT|MDF|AGI|LUK|MHP|MMP),\s*([+-]?\d+)>/gi;
        let match;
        while ((match = regex.exec(notetags)) !== null) {
            results.push({
                type: match[1].toLowerCase(),
                name: match[2],
                chance: parseInt(match[3]),
                stat: match[4].toUpperCase(),
                value: parseInt(match[5])
            });
        }
        return results;
    }

    function rollForAffix(affixes) {
        const totalChance = affixes.reduce((sum, affix) => sum + affix.chance, 0);
        const randomRoll = Math.random() * 100; // Roll de 0 a 100

        if (randomRoll > totalChance) {
            return null; // No se aplica ningún afijo esta vez
        }

        let cumulativeChance = 0;
        for (const affix of affixes) {
            cumulativeChance += affix.chance;
            if (randomRoll <= cumulativeChance) {
                return affix;
            }
        }
        return null;
    }

    function applyAffixToItem(item, affix) {
        // Modificar nombre
        if (affix.type === 'prefix') {
            item.name = `${affix.name} ${item.name}`;
        } else { // suffix
            item.name = `${item.name} ${affix.name}`;
        }

        // Modificar parámetro
        const paramIds = { MHP: 0, MMP: 1, ATK: 2, DEF: 3, MAT: 4, MDF: 5, AGI: 6, LUK: 7 };
        const paramId = paramIds[affix.stat];
        if (paramId !== undefined) {
            item.params[paramId] += affix.value;
        }
    }

})();