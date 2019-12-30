function fncOpenMyDialog() {
    //Open a dialog
    var htmlDlg = HtmlService.createHtmlOutputFromFile('HTML_myHtml')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setWidth(200)
        .setHeight(150);
    DocumentApp.getUi()
        .showModalDialog(htmlDlg, 'A Title Goes Here');
  };