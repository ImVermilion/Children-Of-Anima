//=============================================================================
// Vermilion_GuildMemberCard.js
//=============================================================================

/*:
 * @plugindesc Plugin para mostrar la tarjeta de miembro del gremio.
 * @target MZ
 * @url https://vermiliongames.itch.io/
 * @author Vermilion Games
 * @version 1.1.0
 *
 * @param Show Background
 * @text Mostrar Fondo
 * @desc Mostrar un fondo detrás de la ventana de la tarjeta de miembro.
 * @type boolean
 * @default true
 *
 * @param Background Image
 * @text Imagen de Fondo
 * @desc Nombre del archivo de imagen de fondo en la carpeta img/system.
 * @default GuildMemberCardBackground
 *
 * @help Vermilion_GuildMemberCard.js
 *
 * Este plugin permite mostrar una tarjeta de miembro del gremio en el juego.
 * Puedes llamar a esta tarjeta desde un evento del juego para mostrar 
 * información sobre el jugador y su pertenencia a un gremio, incluido su 
 * nombre, retrato y rango.
 *
 * Para llamar a la tarjeta de miembro del gremio desde un evento, utiliza el
 * siguiente script de evento:
 *
 *    showGuildMemberCard(guildIndex, rankIndex);
 *
 * Donde guildIndex es el índice de la hermandad que quieres mostrar y
 * rankIndex es el índice del rango dentro de esa hermandad.
 *
 * Ejemplos:
 *    showGuildMemberCard(0, 0); // Muestra el primer rango del primer gremio
 *    showGuildMemberCard(1, 2); // Muestra el tercer rango del segundo gremio
 *
 * Para activar o desactivar el fondo de la ventana de la tarjeta de miembro
 * del gremio y especificar la imagen de fondo, puedes modificar los
 * parámetros en la configuración del plugin.
 * 
 * Para especificar la imagen de fondo, asegúrate de colocar la imagen en la
 * carpeta img/system de tu proyecto y luego especifica el nombre de archivo
 * en el parámetro "Imagen de Fondo" del plugin.
 */

(function() {
  
  var parameters = PluginManager.parameters('Vermilion_GuildMemberCard');
  var showBackground = JSON.parse(parameters['Show Background'] || 'true');
  var backgroundImage = parameters['Background Image'] || 'GuildMemberCardBackground';
  
  // Definir la clase para la plantilla de Hermandad
  function GuildTemplate(name, description, ranks) {
    this.name = name;
    this.description = description; // Nuevo campo para la descripción
    this.ranks = ranks;
  }
  
  // Lista de hermandades y sus detalles
  var guilds = [
    new GuildTemplate('Hermandad de Arresven', 'Un viejo gremio de aventureros\n no pasa por su mejor momento',
	['F', 'E', 'D', 'C', 'B', 'A']),
    new GuildTemplate('Guild 2', 'Descripción de la Hermandad 2', ['Rank D', 'Rank E', 'Rank F']),
    new GuildTemplate('Guild 3', 'Descripción de la Hermandad 3', ['Rank G', 'Rank H', 'Rank I'])
  ];
  
  // Definir la escena para mostrar la tarjeta de miembro
  function Scene_GuildMemberCard() {
    this.initialize.apply(this, arguments);
  }
  
  Scene_GuildMemberCard.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_GuildMemberCard.prototype.constructor = Scene_GuildMemberCard;
  
  Scene_GuildMemberCard.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };
  
  Scene_GuildMemberCard.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createGuildMemberCard();
  };
  
  Scene_GuildMemberCard.prototype.createGuildMemberCard = function() {
    var width = Graphics.boxWidth / 2; // Ancho ajustado a la mitad de la pantalla
    var height = Graphics.boxHeight / 2 - 100; // Reducir la altura en 100 unidades
    var x = (Graphics.boxWidth - width) / 2; // Centrar horizontalmente
    var y = (Graphics.boxHeight - height) / 2; // Centrar verticalmente
    this._guildMemberCardWindow = new Window_GuildMemberCard(x, y, width, height);
    this.addWindow(this._guildMemberCardWindow);
  };

  // Método de script para llamar la tarjeta de miembro del gremio desde un evento
  window.showGuildMemberCard = function(guildIndex, rankIndex) {
    SceneManager.push(Scene_GuildMemberCard);
    $gameTemp.guildIndex = guildIndex;
    $gameTemp.rankIndex = rankIndex;
  };

  // Subclase de Window_Base para la ventana de la tarjeta de miembro
  function Window_GuildMemberCard() {
    this.initialize.apply(this, arguments);
  }

  Window_GuildMemberCard.prototype = Object.create(Window_Base.prototype);
  Window_GuildMemberCard.prototype.constructor = Window_GuildMemberCard;

  Window_GuildMemberCard.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._refreshed = false;
    this.refresh();
  };

  Window_GuildMemberCard.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._refreshed && this.isOpen()) {
      this.refresh();
      this._refreshed = true;
    }
    if (this.isOpen() && (Input.isTriggered('cancel') || TouchInput.isCancelled())) {
      this.processCancel();
    }
  };

  Window_GuildMemberCard.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.close();
    SceneManager.pop();
  };

  Window_GuildMemberCard.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gameParty.leader(); // Obtener el actor actual en el equipo
    
    // Dibujar el fondo si se especifica
    if (showBackground) {
      this.drawBackground();
    }
    
    // Dibujar retrato en la esquina superior izquierda
    var xPortrait = 0;
    var yPortrait = 0;
    this.drawActorFace(actor, xPortrait, yPortrait);
    
    // Obtener datos de la hermandad actual
    var guildIndex = $gameTemp.guildIndex || 0; // Si no hay índice, usar 0 por defecto
    var rankIndex = $gameTemp.rankIndex || 0; // Si no hay índice, usar 0 por defecto
    var guild = guilds[guildIndex];
    var rank = guild.ranks[rankIndex];
    
    // Mostrar el nombre y la descripción de la Hermandad centrado arriba de la ventana
    var guildName = guild.name;
    var guildDescription = guild.description; // Nueva línea para obtener la descripción
    var textWidth = this.textWidth(guildName); // Obtener el ancho del texto
    var textX = (this.contentsWidth() - textWidth) / 2; // Centrar el texto horizontalmente
    var lineHeight = this.lineHeight(); // Obtener la altura de línea para el espaciado
    
    this.changeTextColor(this.textColor(20)); // Cambiar color del texto del nombre de la hermandad a naranja
    this.drawText(guildName, textX, 0, this.contentsWidth(), 'left');
    
    // Ajustar posición vertical de la descripción
    var descriptionX = xPortrait + ImageManager.faceWidth + 10;
    var descriptionY = yPortrait + lineHeight; // Incrementar la posición vertical
    
    this.drawTextEx(guildDescription, descriptionX, descriptionY);
    
    // Mostrar el nombre del jugador y el rango justo debajo del retrato
    var playerName = "Nombre: " + actor.name(); // Obtener el nombre del jugador
    var rankText = "Rango: " + rank;
    var textY = yPortrait + ImageManager.faceHeight + 10; // Ajustar posición vertical
    
    // Cambiar color del texto del nombre del jugador y del rango a negro
    this.resetTextColor(); // Restaurar color del texto al predeterminado
    this.drawText(playerName, 0, textY, this.contents.width - 10);
    this.drawText(rankText, 0, textY + lineHeight, this.contents.width - 10);
  };

  Window_GuildMemberCard.prototype.drawBackground = function() {
    var bgBitmap = ImageManager.loadSystem(backgroundImage); // Cambia 'GuildMemberCardBackground' al nombre de tu imagen de fondo
    this.contents.blt(bgBitmap, 0, 0, bgBitmap.width, bgBitmap.height, 0, 0, this.contents.width, this.contents.height);
  };
  
})();
