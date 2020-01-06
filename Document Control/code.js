//function conditional_contents() {
//  var contents = itemResponse.getResponse();
//if(contents.indexOf("Undefined")>-1){do something };
//else if(contents.indexOf("Public")>-1){do something};
//else if(contents.indexOf("Internal")>-1){do something};
//else if(contents.indexOf("Confidential")>-1){do something};
//else if(contents.indexOf("Secret")>-1){do something};

function onOpen() {
  var ui = DocumentApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu("Ampion Document Control")
    .addItem("Check for Document Compliance", "CheckCompliance")
    .addItem("Add Control Page", "AddControlPage")
  .addItem("Find Document Variables", "showSidebarIntro")
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu("Standard Doc Components")
        .addItem("Add Table", "AddTable")
        .addItem("Add Paragraph", "AddParagraph")
        .addItem("Add Item List", "AddList")
    )
    .addToUi();
}

var documentProperties = PropertiesService.getDocumentProperties();
function AddValuesFromModal(selectValue) {
  var documentId = DocumentApp.getActiveDocument().getId();
  var footerSection = DocumentApp.getActiveDocument().getFooter();
  console.log("Getting document log...");
  var body2 = DocumentApp.openById(documentId).getBody();
  console.log("Got document!");
  console.log("Selected value: " + selectValue);
  console.log("Start setting value....");
  body2.replaceText("##UNDEFINED##", selectValue);
  footerSection.appendParagraph("Document Classification: " + selectValue);
  console.log("Value has been set!");
}

function myFunk() {
  // Display a dialog box for each field you need information for.
  var documentProperties = PropertiesService.getDocumentProperties();
  var ui = DocumentApp.getUi();
  //var response = ui.prompt('Enter Name', 'Enter owners person's name', ui.ButtonSet.OK);
  var nameResponse = ui.prompt("Enter the name of the document OWNER");
  var salesperson = nameResponse.getResponseText();
  var documentProperties = PropertiesService.getDocumentProperties();
  var date = new Date();
  var htmlDlg = HtmlService.createHtmlOutputFromFile("HTML_myHtml")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setWidth(200)
    .setHeight(150);

  var modal = DocumentApp.getUi();
  modal.showModalDialog(htmlDlg, "Document Classification");

  //Get Current Document ID
  var documentId = DocumentApp.getActiveDocument().getId();
  console.log(documentId);

  //Get the document body as a variable
  var body = DocumentApp.openById(documentId).getBody();
  console.log(body);

  //Insert the entries into the document
  body.replaceText("##OWNER##", nameResponse.getResponseText());

  //AddValuesFromModal();
}

function CheckCompliance() {
  var doc = DocumentApp.getActiveDocument();
  var contents = doc.getText();
  var ui = DocumentApp.getUi(); // Same variations.
  Logger.log(doc.getText());

  if (contents.toString().indexOf("##UNDEFINED##") > -1) {
    var result = ui.alert(
      "The Following Document is Undefined",
      "Please proceed through the following steps to establish proper document control.",
      ui.ButtonSet.OK
    );
    myFunk();
  } else if (
    contents.toString().indexOf("Document Classification: PUBLIC") > -1
  ) {
    var result = ui.alert(
      "The Following Document is Public",
      "Which means that it contains information that can be shared outside the company",
      ui.ButtonSet.OK
    );
  } else if (
    contents.toString().indexOf("Document Classification: INTERNAL") > -1
  ) {
    var result = ui.alert(
      "The Following Document is Internal",
      "Which means that it contains information that can be freely shared inside the company",
      ui.ButtonSet.OK
    );
  } else if (
    contents.toString().indexOf("Document Classification: CONFIDENTIAL") > -1
  ) {
    var result = ui.alert(
      "The Following Document is Confidential",
      "This means that it contains sensitive information that needs to be restricted to named individuals on a need-to-know basis, where unauthorized disclosure may affect the reputation of Ampion or be harmful in some way",
      ui.ButtonSet.OK
    );
  } else if (
    contents.toString().indexOf("Document Classification: SECRET") > -1
  ) {
    var result = ui.alert(
      "The Following Document is Secret",
      "The means that it contains information at the highest level for which unauthorized disclosure may cause considerable harm to Ampion",
      ui.ButtonSet.OK
    );
  } else {
    var result = ui.alert(
      "The following document does not contain proper classification",
      "Please present to the security forum for proper evaluation",
      ui.ButtonSet.OK
    );
  }
}

function AddControlPage() {
  //here you need to get document id from url (Example, 1oWyVMa-8fzQ4leCrn2kIk70GT5O9pqsXsT88ZjYE_z8)
  var FileTemplateFileId = "1N10s33MJS8yF6IUjB-A2j4iw9Wytu6KdaVNogEo8JLc"; //Browser.inputBox("ID der Serienbriefvorlage (aus Dokumentenlink kopieren):");
  var doc = DocumentApp.openById(FileTemplateFileId);
  var DocName = doc.getName();

  //Create copy of the template document and open it
  var docCopy = DocumentApp.getActiveDocument();
  var totalParagraphs = doc.getBody().getParagraphs(); // get the total number of paragraphs elements
  Logger.log(totalParagraphs);
  var totalElements = doc.getNumChildren();
  var elements = [];
  for (var j = 0; j < totalElements; ++j) {
    var body = docCopy.getBody();
    var element = doc.getChild(j).copy();
    var type = element.getType();
    if (type == DocumentApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      body.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
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
  //here you need to get document id from url (Example, 1oWyVMa-8fzQ4leCrn2kIk70GT5O9pqsXsT88ZjYE_z8)
  var FileTemplateFileId = "1MFG06knf__tcwHWdybaBk124Ia_Mb0gBE0Gk8e0URAM"; //Browser.inputBox("ID der Serienbriefvorlage (aus Dokumentenlink kopieren):");
  var doc = DocumentApp.openById(FileTemplateFileId);
  var DocName = doc.getName();

  //Create copy of the template document and open it
  var docCopy = DocumentApp.getActiveDocument();
  var totalParagraphs = doc.getBody().getParagraphs(); // get the total number of paragraphs elements
  Logger.log(totalParagraphs);
  var totalElements = doc.getNumChildren();
  var elements = [];
  for (var j = 0; j < totalElements; ++j) {
    var body = docCopy.getBody();
    var element = doc.getChild(j).copy();
    var type = element.getType();
    if (type == DocumentApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      body.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
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
}

function AddParagraph() {
  //here you need to get document id from url (Example, 1oWyVMa-8fzQ4leCrn2kIk70GT5O9pqsXsT88ZjYE_z8)
  var FileTemplateFileId = "1CHTbmyd-Z3ACs-I8RHxx7_pXEmvxrYefAfZ5O5mM9zg"; //Browser.inputBox("ID der Serienbriefvorlage (aus Dokumentenlink kopieren):");
  var doc = DocumentApp.openById(FileTemplateFileId);
  var DocName = doc.getName();

  //Create copy of the template document and open it
  var docCopy = DocumentApp.getActiveDocument();
  var totalParagraphs = doc.getBody().getParagraphs(); // get the total number of paragraphs elements
  Logger.log(totalParagraphs);
  var totalElements = doc.getNumChildren();
  var elements = [];
  for (var j = 0; j < totalElements; ++j) {
    var body = docCopy.getBody();
    var element = doc.getChild(j).copy();
    var type = element.getType();
    if (type == DocumentApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      body.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
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
}

function AddList() {
  //here you need to get document id from url (Example, 1oWyVMa-8fzQ4leCrn2kIk70GT5O9pqsXsT88ZjYE_z8)
  var FileTemplateFileId = "1V4-BdCwlm-qcvDLgjC2JTKJsKTFvBeBae7_C90AHo-o"; //Browser.inputBox("ID der Serienbriefvorlage (aus Dokumentenlink kopieren):");
  var doc = DocumentApp.openById(FileTemplateFileId);
  var DocName = doc.getName();

  //Create copy of the template document and open it
  var docCopy = DocumentApp.getActiveDocument();
  var totalParagraphs = doc.getBody().getParagraphs(); // get the total number of paragraphs elements
  Logger.log(totalParagraphs);
  var totalElements = doc.getNumChildren();
  var elements = [];
  for (var j = 0; j < totalElements; ++j) {
    var body = docCopy.getBody();
    var element = doc.getChild(j).copy();
    var type = element.getType();
    if (type == DocumentApp.ElementType.PARAGRAPH) {
      body.appendParagraph(element);
    } else if (type == DocumentApp.ElementType.TABLE) {
      body.appendTable(element);
    } else if (type == DocumentApp.ElementType.LIST_ITEM) {
      body.appendListItem(element);
    }
    //    ...add other conditions (headers, footers...
  }
  Logger.log(element.editAsText().getText());
  elements.push(element); // store paragraphs in an array
  Logger.log(element.editAsText().getText());
  for (var el = 0; el < elements.length; el++) {
    var paragraph = elements[el].copy();
    var cursor = DocumentApp.getActiveDocument().getCursor();
    docCopy.getBody().appendParagraph(paragraph);
  }
  docCopy.getBody().appendPageBreak();
}

function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile("SO_sideBar_Example")
    .setTitle("Document Variable Control")
    .setWidth(100);
  DocumentApp.getUi().showSidebar(html);
}

function showSidebarIntro() {
  var html = HtmlService.createHtmlOutputFromFile("Info Page")
    .setTitle("Document Variable Control")
    .setWidth(100);
  DocumentApp.getUi().showSidebar(html);
}

// Sets the value of A1 cell to value entered in the input field in the side bar!
function enterName(name) {
  var doc = DocumentApp.getActive();
  var document = dd.getActiveDocument();
}

function getVariables() {
  var doc = DocumentApp.getActiveDocument();
  var str = doc.getText(); //get the text of the document
  var result = str.match(/{.*?}/g).map(function(val) {
    return val.replace(/[\])}[{(]/g, "");
    //return val.replace(/(^.*\[|\].*$)/g,'');
  });

  //The purpose of sort_unique is to find one of every value or string represented in an array
  function sort_unique(arr) {
    if (result.length === 0) return arr;
    arr = arr.sort(function(a, b) {
      return a * 1 - b * 1;
    });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i - 1] !== arr[i]) {
        ret.push(arr[i]);
      }
    }

    for (var index = 0; index < ret.length; index++) {
      Logger.log(ret[index]);
    }

    return ret;
  }
  result = sort_unique(result);

  Logger.log("Getting final result for front end....");
  Logger.log(result);

  return result;
}

function pushPlaceholders(values) {
  Logger.log("Got placeholder values!");
  Logger.log(values);

  const documentId = DocumentApp.getActiveDocument().getId();
  const body = DocumentApp.openById(documentId).getBody();

  /**
   {
     oldValue: newValue
   }
   */
  for (var key in values) {
    body.replaceText('{' + key + '}', values[key]);
  }
}