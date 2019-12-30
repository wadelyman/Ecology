function myFunction() {
    // Display a dialog box for each field you need information for.
    
    var ui = DocumentApp.getUi();
    //var response = ui.prompt('Enter Name', 'Enter owners person's name', ui.ButtonSet.OK);
    var nameResponse = ui.prompt('Enter sales persons name');
    var client1Response = ui.prompt('Enter classification 1');
    var sales1Response = ui.prompt('Enter owner 1');
    var commissionResponse = ui.prompt('Enter commission');
    var date = new Date();
      
    //Make a copy of the template file
    var documentId = DriveApp.getFileById('<your-template-id>').makeCopy().getId();
        
    //Rename the copied file
    DriveApp.getFileById(documentId).setName(nameResponse.getResponseText() + date + ' Sales Report');  
        
    //Get the document body as a variable
    var body = DocumentApp.openById(documentId).getBody();
      
    //Insert the entries into the document
    body.replaceText('##name##', nameResponse.getResponseText());
    body.replaceText('##classification1##', client1Response.getResponseText());
    body.replaceText('##owner1##', sales1Response.getResponseText()); 
    body.replaceText('##commission##', commissionResponse.getResponseText());   
  }