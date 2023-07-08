//=============================================================================
// KRBook.js                                                             
//=============================================================================


/*:
* @author Kino
* @plugindesc Allows you to create books in game
* @param File Name
* @desc The file name where you store your book information 
* @default Book
* 
* @help
* This plugin allows you to create a json file with book information inside of it.
* You have to create a json file that holds your book information.
* 
* Example: Books.json -- this would also be the file name you use. 
* The structure of your json file should look like this:
* Note: All labels are case sensitive.
*
* [{
*  "title": "History Of Estoria",
*  "pages": [
*  { "pageNumber": 1,
*    "pageText": "This is the first page."
*  },  
*  { "pageNumber": 2,
*    "pageText": "This is page 2 of the book"}
*  ]
*}]
*
* Script Functions:
* KR.Helpers.startBookScene(title)
* Takes a string that refers to the title in the file.
* You can call it via event or common event.
* Example: "history of Estoria"; this is not case sensitive.
* 
* Note: You can have as many books as you want inside of
* the json file. There is no page limit either.
* 
* Contact me on the forums: username: Kino.
* Hope this plugin helps, and enjoy!
*/ 

//=============================================================================
// Namespace Intitialization                                                             
//=============================================================================

var KR = KR || {};
KR.Plugins = KR.Plugins || {};
KR.Helpers = KR.Helpers || {};

(function($) {

//=============================================================================
// Plugin Variables                                                             
//=============================================================================
  
  var parameters = PluginManager.parameters("KRBook");
  var fileName = String(parameters["File Name"]) || "Book";

  $.Plugins.KRBook = function() {
//=============================================================================
// Variables                                                             
//=============================================================================
    var bookTitle = "Title";
    var currentBook = null;
    var pageNumber = 0;

//=============================================================================
// Data Manager                                                             
//=============================================================================
    DataManager._databaseFiles.push({name:"$dataBooks", src:fileName + ".json"});

//=============================================================================
// Scene Boot                                                             
//=============================================================================
    var KR_SceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      KR_SceneBoot_start.call(this);
    };
//=============================================================================
// Scene Book                                                             
//=============================================================================
    function Scene_Book() {
      this.initialize.apply(this, arguments);
    }

    Scene_Book.prototype = Object.create(Scene_Base.prototype);
    Scene_Book.prototype.constructor = Scene_Book;

    Scene_Book.prototype.initialize = function() {
      Scene_Base.prototype.initialize.call(this);
      this.book = currentBook;
      pageNumber = 0;
    };

    Scene_Book.prototype.create = function() {
      this.createWindowLayer();
      this.createAllWindows();
    };
    Scene_Book.prototype.createAllWindows = function() {
      this.createTitleWindow();
      this.createSelectPagesWindow();
      this.createContentWindow();
    };

    Scene_Book.prototype.createTitleWindow = function () {
      this.titleWindow = new Window_Title(0, 0, Graphics.width, 75, this.book);
      this.addWindow(this.titleWindow);
    };

    Scene_Book.prototype.createSelectPagesWindow = function () {
      this.pageSelectWindow = new Window_SelectPages(0,75, Graphics.width, 75, this.book);
      this.addWindow(this.pageSelectWindow);
    };

    Scene_Book.prototype.createContentWindow = function() {
      this.contentWindow = new Window_Content(0, 150, Graphics.width, Graphics.height - 150, this.book);
      this.addWindow(this.contentWindow);
    };

    Scene_Book.prototype.update = function() {
      Scene_Base.prototype.update.call(this);
      if(Input.isTriggered('cancel')) {
        this.popScene();
      }
    };

//=============================================================================
// Window Title                                                             
//=============================================================================

    function Window_Title() {
      this.initialize.apply(this, arguments);
    }

    Window_Title.prototype = Object.create(Window_Base.prototype);
    Window_Title.prototype.constructor = Window_Title;

    Window_Title.prototype.initialize = function(x, y, width, height, book) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this.bookTitle = book.title;
    };

    Window_Title.prototype.drawTitle = function() {
      this.contents.fontSize = 36;
      this.drawText(this.bookTitle, ((this.width - this.textWidth(this.bookTitle)) / 2) - 20, 0, this.width);
    };

    Window_Title.prototype.update = function() {
      Window_Base.prototype.update.call(this);
      this.refresh();
    };

    Window_Title.prototype.refresh = function () {
      if (this.contents) {
        this.contents.clear();
        this.drawTitle();
      }
    };

//=============================================================================
// Window Select Pages                                                             
//=============================================================================

    function Window_SelectPages () {
      this.initialize.apply(this, arguments);
    }

    Window_SelectPages.prototype = Object.create(Window_Selectable.prototype);
    Window_SelectPages.prototype.constructor = Window_SelectPages;

    Window_SelectPages.prototype.initialize = function(x, y, width, height, book) {
      Window_Selectable.prototype.initialize.call(this, x, y, width, height);
      this.book = book;
    };

    Window_SelectPages.prototype.drawPageText = function() {
      this.contents.fontSize = 28;
      this.drawText("Flecha Izquierda/Derecha para pasar de página.", ((this.width - this.textWidth(this.bookTitle)) / 2) - 150, 0, this.width);
    };

    Window_SelectPages.prototype.updatePageNumber = function() {
      //Depends on input
      if(Input.isTriggered('right')) {
        if(this.book.pages[pageNumber + 1] !== (null || undefined))
          pageNumber += 1;
      }
      if(Input.isTriggered('left') && pageNumber > 0){
        if(this.book.pages[pageNumber - 1] !== (null || undefined ))
          pageNumber -= 1;
      }
    };

    Window_SelectPages.prototype.update = function() {
      this.drawPageText();
      this.updatePageNumber();
    };

//=============================================================================
// Window Content                                                             
//=============================================================================

    function Window_Content() {
      this.initialize.apply(this, arguments);
    }

    Window_Content.prototype = Object.create(Window_Base.prototype);
    Window_Content.prototype.constructor = Window_Content;

    Window_Content.prototype.initialize = function(x, y, width, height, book) {
      Window_Base.prototype.initialize.call(this, x, y, width, height);
      this.bookContent = book.pages;
    };

    Window_Content.prototype.update = function() {
      Window_Base.prototype.update.call(this);
      this.refresh();
    };

    
    Window_Content.prototype.refresh = function() {
      if (this.contents) {
        this.contents.clear();
        this.drawContent();
      }
    };
    Window_Content.prototype.drawContent = function() {
      this.drawPageText();
      this.drawDivider();
      this.drawPageNumber();
    };
    Window_Content.prototype.drawPageText = function() {
      this.drawTextEx(this.bookContent[pageNumber].pageText, 20, 20);
    };

    Window_Content.prototype.drawPageNumber = function() {
      this.drawText(this.bookContent[pageNumber].pageNumber + " / " + this.bookContent.length, this.width - 125, this.height - 75, 50);
    };

    Window_Content.prototype.drawDivider = function() {
      this.drawHorzLine(this.height - 100);
    };

    Window_Content.prototype.drawHorzLine = function(y) {
      var lineY = y + this.lineHeight() / 2 - 1;
      this.contents.paintOpacity = 175;
      this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
      this.contents.paintOpacity = 255;
    };

    Window_Content.prototype.lineColor = function() {
      return this.normalColor();
    };
//=============================================================================
// Helper Functions                                                             
//=============================================================================
    
    function getBook(title) {
      var titleRe = new RegExp(title, "ig");
      var bookData = null;

      $dataBooks.forEach(function(book){
        if(book.title.match(titleRe) !== null) {
          bookData = book;
        }
        titleRe.lastIndex = 0;
      });

      return bookData;
    }

    function startBookScene(title) {
      currentBook = getBook(title);
      SceneManager.push(Scene_Book);
    }

//=============================================================================
// Returned Objects                                                             
//=============================================================================

    $.Scene_Book = Scene_Book;
    $.Helpers.startBookScene = startBookScene;
  };
  $.Plugins.KRBook();
})(KR);