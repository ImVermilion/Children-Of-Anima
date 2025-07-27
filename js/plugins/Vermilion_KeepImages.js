/*:
 * @plugindesc Asegura la inclusión de archivos y carpetas durante el despliegiegue con la opción "Excluir archivos no utilizados".
 * @author Vermilion
 * @version 2.0
 * @help
 * Este plugin te permite forzar la inclusión de recursos para que no sean
 * eliminados por la herramienta de despliegue.
 *
 * CÓMO USAR:
 * Tienes dos parámetros para configurar:
 *
 * 1. Archivos Individuales:
 * - Es la opción 100% segura y recomendada.
 * - Añade aquí, uno por uno, los archivos que se cargan por código.
 * - La herramienta de despliegue SIEMPRE los incluirá.
 *
 * 2. Carpetas Completas:
 * - Es la opción nueva y más cómoda.
 * - Escribe la ruta de la carpeta que quieres incluir, partiendo
 * desde la carpeta 'img/'.
 * - Ejemplo 1: pMapInventory/
 * - Ejemplo 2: characters/monsters/
 *
 * ADVERTENCIA: La opción de 'Carpetas Completas' puede no ser reconocida
 * por todas las versiones de RPG Maker. Es una conveniencia, pero el método
 * de 'Archivos Individuales' es el único garantizado.
 *
 * @param Archivos Individuales
 * @desc Lista de archivos que deben ser incluidos. (Opción 100% segura)
 * @type file[]
 * @dir img/
 * @default []
 *
 * @param Carpetas Completas
 * @desc (Experimental) Lista de carpetas a incluir. Escribe la ruta desde 'img/'.
 * @type string[]
 * @default []
 */

// Este plugin no necesita código funcional. Su único propósito es
// usar los parámetros para que la herramienta de despliegue de RPG Maker
// reconozca y empaquete los archivos y carpetas listados.