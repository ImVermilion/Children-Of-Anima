/*:
 * @target MZ
 * @plugindesc [v4.1] Núcleo para Vermilion Games. Gestiona colores, compatibilidad y lógica de capas.
 * @author Vermilion Games
 * @help
 * Vermilion_Core.js
 *
 * Este plugin es la base para otros plugins de Vermilion.
 * Contiene la base de datos de colores de pelo, el filtro de gradiente y
 * lógica de renderizado centralizada para que otros plugins la usen.
 *
 * [v4.1]
 * - Añadida la función 'processAndSortLayersForRender' para centralizar la
 * lógica de ordenamiento y filtrado de capas visuales, asegurando
 * consistencia entre el juego y la pantalla de guardado.
 *
 * No requiere configuración.
 */

//=============================================================================
// GradientMapFilter
//=============================================================================
class GradientMapFilter extends PIXI.Filter {
  constructor(shadowColor = [0, 0, 0], highlightColor = [255, 255, 255]) {
    const fragmentSrc = `
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      uniform vec3 uShadowColor;
      uniform vec3 uHighlightColor;

      void main(void) {
        vec4 originalColor = texture2D(uSampler, vTextureCoord);
        float luma = originalColor.r;
        vec3 finalColor = mix(uShadowColor, uHighlightColor, luma);
        gl_FragColor = vec4(finalColor * originalColor.a, originalColor.a);
      }
    `;
    super(null, fragmentSrc);
    this.shadowColor = shadowColor;
    this.highlightColor = highlightColor;
  }

  get shadowColor() { return this.uniforms.uShadowColor.map(c => c * 255); }
  set shadowColor(value) { this.uniforms.uShadowColor = [value[0] / 255, value[1] / 255, value[2] / 255]; }
  get highlightColor() { return this.uniforms.uHighlightColor.map(c => c * 255); }
  set highlightColor(value) { this.uniforms.uHighlightColor = [value[0] / 255, value[1] / 255, value[2] / 255]; }
}
window.GradientMapFilter = GradientMapFilter; // Hacemos la clase global

//=============================================================================
// Vermilion Core Logic
//=============================================================================
var Vermilion = Vermilion || {};
Vermilion.Core = {};

(() => {
    Vermilion.Core.hairColorMap = {
        6:   { shadow: [48, 43, 88],   highlight: [149, 94, 64] },
        7:   { shadow: [100, 56, 45],  highlight: [247, 233, 167] },
        8:   { shadow: [191, 0, 0],    highlight: [113, 15, 88] },
        9:   { shadow: [0, 0, 0],      highlight: [90, 90, 90] },
        251: { shadow: [95, 90, 85],   highlight: [225, 220, 205] },
        252: { shadow: [70, 55, 45],   highlight: [200, 160, 120] },
        253: { shadow: [65, 30, 35],   highlight: [180, 80, 80] },
        254: { shadow: [160, 160, 175],highlight: [255, 250, 245] },
        150: { shadow: [200, 210, 220],highlight: [255, 255, 255] },
        151: { shadow: [90, 100, 115], highlight: [220, 225, 230] },
        255: { shadow: [129, 39, 79],  highlight: [136, 192, 255] },
        256: { shadow: [95, 80, 110],  highlight: [245, 220, 230] },
        71:  { shadow: [40, 24, 88],   highlight: [227, 148, 243] },
        70:  { shadow: [129, 39, 79],  highlight: [136, 192, 255] },
        69:  { shadow: [30, 40, 90],   highlight: [100, 240, 160] },
        68:  { shadow: [14, 60, 89],   highlight: [255, 238, 137] },
        257: { shadow: [45, 70, 50],   highlight: [130, 170, 100] },
        258: { shadow: [10, 10, 40],   highlight: [90, 90, 200] },
        259: { shadow: [100, 85, 115], highlight: [215, 190, 230] },
        260: { shadow: [150, 80, 95],  highlight: [255, 190, 200] }
    };

    Vermilion.Core.getActiveHairColorSwitch = function() {
        for (const switchId in this.hairColorMap) {
            if ($gameSwitches.value(Number(switchId))) {
                return Number(switchId);
            }
        }
        return null;
    };
    
    /**
     * Procesa y ordena las capas visuales a partir de los datos de un archivo de guardado.
     * Esto centraliza la lógica para asegurar consistencia.
     * @param {Array} equipmentData - El array de datos visuales del equipo (info.visualEquipment[i]).
     * @param {Array} hideSetData - El array de IDs a ocultar (info.hideSets[i]).
     * @returns {{layersBehind: Array, layersAbove: Array}} Un objeto con las capas separadas y ordenadas.
     */
    Vermilion.Core.processAndSortLayersForRender = function(equipmentData, hideSetData) {
        if (!equipmentData) {
            return { layersBehind: [], layersAbove: [] };
        }

        const hideSet = new Set(hideSetData || []);
        
        // Primero, filtra las capas que están explícitamente ocultas
        const visibleLayers = equipmentData.filter(data => !data.displayId || !hideSet.has(data.displayId));

        // Luego, separa y ordena cada grupo por su Z-index, igual que en Visual_Equipment.
        const layersBehind = visibleLayers.filter(d => d.z < 0).sort((a, b) => a.z - b.z);
        const layersAbove = visibleLayers.filter(d => d.z >= 0).sort((a, b) => a.z - b.z);
        
        return { layersBehind, layersAbove };
    };

})();