(function() {
  
  // Definir la clase para la plantilla de Hermandad
  function GuildTemplate(name, ranks) {
    this.name = name;
    this.ranks = ranks;
  }
  
  // Lista de hermandades y sus detalles
  var guilds = [
    new GuildTemplate('Hermandad de Arresven', ['Rango A', 'Rango B', 'Rango C']),
    new GuildTemplate('Hermandad de Rivelet', ['Rango D', 'Rango E', 'Rango F']),
    new GuildTemplate('Hermandad 3', ['Rango G', 'Rango H', 'Rango I'])
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
    
    // Dibujar retrato en la esquina superior izquierda
    var xPortrait = 0;
    var yPortrait = 0;
    this.drawActorFace(actor, xPortrait, yPortrait);
    
    // Obtener datos de la hermandad actual
    var guildIndex = $gameTemp.guildIndex || 0; // Si no hay índice, usar 0 por defecto
    var rankIndex = $gameTemp.rankIndex || 0; // Si no hay índice, usar 0 por defecto
    var guild = guilds[guildIndex];
    var rank = guild.ranks[rankIndex];
    
    // Mostrar el nombre de la Hermandad centrado arriba de la ventana
    var guildName = guild.name;
    var textWidth = this.textWidth(guildName); // Obtener el ancho del texto
    var textX = (this.contentsWidth() - textWidth) / 2; // Centrar el texto horizontalmente
    this.drawText(guildName, textX, 0, this.contentsWidth(), 'left');
    
    // Mostrar el nombre del jugador y el rango justo debajo del retrato
    var playerName = "Nombre: " + actor.name(); // Obtener el nombre del jugador
    var rankText = "Rango: " + rank;
    var textY = yPortrait + ImageManager.faceHeight + 10; // Ajustar posición vertical
    
    this.drawText(playerName, 0, textY, this.contents.width - 10);
    this.drawText(rankText, 0, textY + this.lineHeight(), this.contents.width - 10);
  };
  
})();
