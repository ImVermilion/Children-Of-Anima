/*:
 * @target MZ
 * @plugindesc Un filtro para aplicar un mapa de gradiente a un sprite.
 * @author Tu Asistente de IA
 *
 * @help
 * Este plugin proporciona un filtro PIXI para mapear la luminancia de un sprite
 * a un gradiente entre dos colores (sombra y luz).
 */

class GradientMapFilter extends PIXI.Filter {
  constructor(shadowColor = [0, 0, 0], highlightColor = [255, 255, 255]) {
    const fragmentSrc = `
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;

      uniform vec3 uShadowColor;
      uniform vec3 uHighlightColor;

      void main(void) {
        vec4 originalColor = texture2D(uSampler, vTextureCoord);
        
        // Usamos el canal rojo como luminancia (ya que la imagen es escala de grises)
        float luma = originalColor.r;

        // Mezclamos linealmente entre el color de sombra y el de luz basándonos en la luminancia
        vec3 finalColor = mix(uShadowColor, uHighlightColor, luma);

        // Multiplicamos el color final por el alfa original para mantener la transparencia.
        gl_FragColor = vec4(finalColor * originalColor.a, originalColor.a);
      }
    `;

    super(null, fragmentSrc);

    this.shadowColor = shadowColor;
    this.highlightColor = highlightColor;
  }

  get shadowColor() {
    return this.uniforms.uShadowColor.map(c => c * 255);
  }

  set shadowColor(value) {
    this.uniforms.uShadowColor = [value[0] / 255, value[1] / 255, value[2] / 255];
  }

  get highlightColor() {
    return this.uniforms.uHighlightColor.map(c => c * 255);
  }

  set highlightColor(value) {
    this.uniforms.uHighlightColor = [value[0] / 255, value[1] / 255, value[2] / 255];
  }
}