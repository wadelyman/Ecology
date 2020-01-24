//function conditional_contents() {
//  var contents = itemResponse.getResponse();
//if(contents.indexOf("Undefined")>-1){do something };
//else if(contents.indexOf("Public")>-1){do something};
//else if(contents.indexOf("Internal")>-1){do something};
//else if(contents.indexOf("Confidential")>-1){do something};
//else if(contents.indexOf("Secret")>-1){do something}; ,
function onInstall(e){onOpen(e)}


function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  // Or SpreadsheetApp or FormApp.
  ui.createMenu("Ampion Document Control")
    .addItem("Check for Document Compliance", "CheckCompliance")
    .addItem("Add Control Page", "AddControlPage")
  .addSeparator()
  .addItem("Ampion Document Wizard", "showSidebarIntro")
    .addToUi();
}

//var documentProperties = PropertiesService.getDocumentProperties();
function AddValuesFromModal(selectValue) {
  var documentId = SpreadsheetApp.getActiveSpreadsheet().getId();
  console.log("Getting document log...");
 var infoSheet = SpreadsheetApp.getActive().getSheetByName('Information Control')
  console.log("Got document!");
  console.log("Selected value: " + selectValue);
  console.log("Start setting value....");
  infoSheet.getRange('C4').setValue(selectValue);
  console.log("Value has been set!");
}

function myFunk() {
  // Display a dialog box for each field you need information for.
  var documentProperties = PropertiesService.getDocumentProperties();
  var ui = SpreadsheetApp.getUi();
  //var response = ui.prompt('Enter Name', 'Enter owners person's name', ui.ButtonSet.OK);
  var nameResponse = ui.prompt("Enter the name of the document OWNER");
  var salesperson = nameResponse.getResponseText();
  var documentProperties = PropertiesService.getDocumentProperties();
  var infoSheet = SpreadsheetApp.getActive().getSheetByName('Information Control')
  var date = new Date();
  var htmlDlg = HtmlService.createHtmlOutputFromFile("HTML_myHtml")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setWidth(200)
    .setHeight(150);

  var modal = SpreadsheetApp.getUi();
  modal.showModalDialog(htmlDlg, "Document Classification");

  //Get Current Document ID
  var documentId = SpreadsheetApp.getActiveSpreadsheet().getId();
  console.log(documentId);

  //Get the document body as a variable
  var body = SpreadsheetApp.openById(documentId).getDataRange().getValues();
  console.log(body);

  //Insert the entries into the document
  infoSheet.getRange('C5').setValue(salesperson);
  infoSheet.getRange('C8').setValue(date);



  //AddValuesFromModal();
}

function AddControlSheet() {
 var source = SpreadsheetApp.openById("17rIBAgyEX3lKA7CYP_uK2UJkVRBULOS0N1dRSZyivRI");
 var sheet = source.getSheets()[0];
 var destination = SpreadsheetApp.getActiveSpreadsheet();
 sheet.copyTo(destination);
 var infoSheet = SpreadsheetApp.getActive().getSheetByName('Copy of Information Control')
 infoSheet.setName("Information Control");
  myFunk();
}



function CheckCompliance() {
  var infoSheet = SpreadsheetApp.getActive().getSheetByName('Information Control');
   if (!infoSheet) {
          var ui = SpreadsheetApp.getUi(); // Same variations.
    var result = ui.alert(
      "This Sheet needs a Control Page",
      "Please proceed through the following steps to establish proper document control.",
      ui.ButtonSet.OK
    );
     AddControlSheet();}
     
  else if (infoSheet){
     var Owner = infoSheet.getRange('C5').getValue();
     var Class = infoSheet.getRange('C4').getValue();
     var ui = SpreadsheetApp.getUi(); // Same variations.

 if (Class == "UNDEFINED") {
    var result = ui.alert(
      "The Following Document is Undefined",
      "Please wait a few moments for processing and then proceed through the following steps to establish proper document control.",
      ui.ButtonSet.OK
    );
    myFunk();
  } else if (
    Class == "PUBLIC"
  ) {
    var result = ui.alert(
      "The Following Document is Public",
      "Which means that it contains information that can be shared outside the company.",
      ui.ButtonSet.OK
    );
  } else if (
    Class == "INTERNAL"
  ) {
    var result = ui.alert(
      "The Following Document is Internal",
      "Which means that it contains information that can be freely shared inside the company.",
      ui.ButtonSet.OK
    );
  } else if (
    Class == "CONFIDENTIAL"
  ) {
    var result = ui.alert(
      "The Following Document is Confidential",
      "This means that it contains sensitive information that needs to be restricted to named individuals on a need-to-know basis, where unauthorized disclosure may affect the reputation of Ampion or be harmful in some way.",
      ui.ButtonSet.OK
    );
  } else if (
    Class == "SECRET"
  ) {
    var result = ui.alert(
      "The Following Document is Secret",
      "The means that it contains information at the highest level for which unauthorized disclosure may cause considerable harm to Ampion.",
      ui.ButtonSet.OK
    );
  } else {
    var result = ui.alert(
      "The following document does not contain proper classification",
      "Please select Add Control Sheet.",
      ui.ButtonSet.OK
    );
  }
     }
}
  



function AddControlPage() {
  //here you need to get document id from url (Example, 1oWyVMa-8fzQ4leCrn2kIk70GT5O9pqsXsT88ZjYE_z8)
  var FileTemplateFileId = "1WJLaDRXvn5Trq4D525A8RFhfaukVZk8hQKCdtuGQ1x0"; //Browser.inputBox("ID der Serienbriefvorlage (aus Dokumentenlink kopieren):");
  var doc = SpreadsheetApp.openById(FileTemplateFileId);
  var DocName = doc.getName();

  //Create copy of the template document and open it
  var docCopy = SpreadsheetApp.getActiveSpreadsheet();
  var cursor = docCopy.getCursor();
  var totalParagraphs = doc.getBody().getParagraphs(); // get the total number of paragraphs elements
  Logger.log(totalParagraphs);
  var totalElements = doc.getNumChildren();
  var elements = [];
  for (var j = 0; j < totalElements; ++j) {
    var body = docCopy.getBody();
    var element = doc.getChild(j).copy();
    var type = element.getType();
    if (type == SpreadsheetApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type == SpreadsheetApp.ElementType.TABLE) {
      body.appendTable(element);
    } else if (type == SpreadsheetApp.ElementType.LIST_ITEM) {
      body.appendListItem(element);
    }
    //    ...add other conditions (headers, footers...
  }
  Logger.log(element.editAsText().getText());
  elements.push(element); // store paragraphs in an array
  Logger.log(element.editAsText().getText());
  for (var el = 0; el < elements.length; el++) {
    var paragraph = elements[el].copy();
    docCopy.getBody().appendParagraph(paragraph);
  }
  docCopy.getBody().appendPageBreak();
  CheckCompliance();
}

function AddTable() {
  var date = new Date();
  var activeCell = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  activeCell.setValue(date);

}

function AddParagraph() {
  var date = new Date();
  var activeCell = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  activeCell.setValue(date);
}

function AddList() {
  var date = new Date();
  var activeCell = SpreadsheetApp.getActiveSpreadsheet().getActiveRange();
  activeCell.setValue(date);
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("SO_sideBar_Example")
    .setTitle("Document Variable Control")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

function showSidebarIntro() {
  var html = HtmlService.createHtmlOutputFromFile("Info Page")
    .setTitle("Ampion Document Control")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

function showControlPages() {
  var html = HtmlService.createHtmlOutputFromFile("Document Control")
    .setTitle("Document Control Pages")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

function showBigQueryPage() {
  var html = HtmlService.createHtmlOutputFromFile("BigQueryHTML")
    .setTitle("Big Query Page")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

function addSheetComponents() {
  var html = HtmlService.createHtmlOutputFromFile("Document Components")
    .setTitle("Document Components")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

function addIndexMatchComponents() {
  var html = HtmlService.createHtmlOutputFromFile("indexMatch Page")
    .setTitle("Index Match Tool")
    .setWidth(100);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Sets the value of A1 cell to value entered in the input field in the side bar!
function enterName(name) {
  var doc = SpreadsheetApp.getActive();
  var document = dd.getActiveSpreadsheet();
}

function getVariables() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var str = doc.getDataRange().getValues()
  var testStrings = getCellValuesAsArray(str);
Logger.log(testStrings.filter(function(element) { return /{.*?}/g.test(element); }))
  
  
  
 // var doc = SpreadsheetApp.getActiveSpreadsheet();
//  var str = doc.getDataRange().getValues().toString(); //get the text of the document
//  var result = str.search(/{.*?}/g) ;
//  Logger.log(result);
 // {
  //  return result.replace(/[\])}[{(]/g, "");
    //return val.replace(/(^.*\[|\].*$)/g,'');
 // };

  //The purpose of sort_unique is to find one of every value or string represented in an array
//  function sort_unique(arr) {
//    if (result.length === 0) return arr;
 //   arr = arr.sort();
//    var ret = [arr[0]];
//    for (var i = 1; i < arr.length; i++) {
//      if (arr[i - 1] !== arr[i]) {
//        ret.push(arr[i]);
//      }
//    }

 //   for (var index = 0; index < ret.length; index++) {
 //     Logger.log(ret[index]);
 //   }

 //   return ret;
  }
 // result = sort_unique(result);

 // Logger.log("Getting final result for front end....");
 // Logger.log(result);

 // return result;
//}

function pushPlaceholders(values) {
  Logger.log("Got placeholder values!");
  Logger.log(values);

  const documentId = SpreadsheetApp.getActiveSpreadsheet().getId();
  const body = SpreadsheetApp.openById(documentId).getBody();

  /**
   {
     oldValue: newValue
   }
   */
  for (var key in values) {
    body.replaceText('{' + key + '}', values[key]);
  }
}