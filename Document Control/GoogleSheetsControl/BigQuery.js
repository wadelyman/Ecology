/**
 * Runs a BigQuery query and logs the results in a spreadsheet.
 */
function onOpen() {
    var spreadsheet = SpreadsheetApp.getActive();
    var menuItems = [
      {name: 'Update data', functionName: 'runQuery'}
    ];
    spreadsheet.addMenu('BigQueryIntegration', menuItems);
  }
  
  function runQuery() {
      htmlApp("","");
    // Replace this value with the project ID listed in the Google
    // Cloud Platform project.
    var projectId = 'bizsys';
    var sheetName = 'All Accounts';
  
    var request = {
      query: 'select * from bizsys.public.v_all_accounts',
      useLegacySql: false
    };
    var queryResults = BigQuery.Jobs.query(request, projectId);
    var jobId = queryResults.jobReference.jobId;
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var currentSheet = ss.getSheetByName(sheetName);
      if (currentSheet === null) {
        currentSheet = ss.insertSheet(99);
        ss.renameActiveSheet(sheetName);
      } else {
        currentSheet.clear();
      }
    // Check on status of the Query Job.
    var sleepTimeMs = 500;
    while (!queryResults.jobComplete) {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
    }
  
    // Get all the rows of results.
    var rows = queryResults.rows;
    while (queryResults.pageToken) {
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
        pageToken: queryResults.pageToken
      });
      rows = rows.concat(queryResults.rows);
    }
  
    if (rows) {
      var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = spreadsheet.getSheetByName(sheetName);
  
      // Append the headers.
      var headers = queryResults.schema.fields.map(function(field) {
        return field.name;
      });
      sheet.appendRow(headers);
  
      // Append the results.
      var data = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].f;
        data[i] = new Array(cols.length);
        for (var j = 0; j < cols.length; j++) {
          data[i][j] = cols[j].v;
        }
      }
      
  
      sheet.getRange(2, 1, rows.length, headers.length).setValues(data);
  
      Logger.log('Results spreadsheet created: %s',
          spreadsheet.getUrl());
    } else {
      Logger.log('No rows returned.');
    }
    
    Utilities.sleep(3000); // change this value to show the "Running script, please wait.." HTML window for longer time.
  
    htmlApp("Finished!",""); 
  
    Utilities.sleep(3000);  // change this value to show the "Finished! This window will close automatically. HTML window for longer time.
  
    htmlApp("","close"); // Automatically closes the HTML window.
    var documentProperties = PropertiesService.getDocumentProperties();
    var accountUpdateTime = documentProperties.getProperty('Latest Accounts Update');
    var date1 = Date();
  Logger.log(accountUpdateTime);
  documentProperties.setProperty('Latest Accounts Update', date1);
  showBigQueryPage();
  }
  
  function runQuerySites() {
      htmlApp("","");
    // Replace this value with the project ID listed in the Google
    // Cloud Platform project.
    var projectId = 'bizsys';
    var sheetName = 'All Sites';
  
    var request = {
      query: 'select * from bizsys.tips.sites where _PARTITIONDATE=CURRENT_DATE()',
      useLegacySql: false
    };
    var queryResults = BigQuery.Jobs.query(request, projectId);
    var jobId = queryResults.jobReference.jobId;
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var currentSheet = ss.getSheetByName(sheetName);
      if (currentSheet === null) {
        currentSheet = ss.insertSheet(99);
        ss.renameActiveSheet(sheetName);
      } else {
        currentSheet.clear();
      }
    // Check on status of the Query Job.
    var sleepTimeMs = 500;
    while (!queryResults.jobComplete) {
      Utilities.sleep(sleepTimeMs);
      sleepTimeMs *= 2;
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
    }
  
    // Get all the rows of results.
    var rows = queryResults.rows;
    while (queryResults.pageToken) {
      queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId, {
        pageToken: queryResults.pageToken
      });
      rows = rows.concat(queryResults.rows);
    }
  
    if (rows) {
      var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = spreadsheet.getSheetByName(sheetName);
  
      // Append the headers.
      var headers = queryResults.schema.fields.map(function(field) {
        return field.name;
      });
      sheet.appendRow(headers);
  
      // Append the results.
      var data = new Array(rows.length);
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].f;
        data[i] = new Array(cols.length);
        for (var j = 0; j < cols.length; j++) {
          data[i][j] = cols[j].v;
        }
      }
      
  
      sheet.getRange(2, 1, rows.length, headers.length).setValues(data);
  
      Logger.log('Results spreadsheet created: %s',
          spreadsheet.getUrl());
    } else {
      Logger.log('No rows returned.');
    }
    
    Utilities.sleep(3000); // change this value to show the "Running script, please wait.." HTML window for longer time.
  
    htmlApp("Finished!",""); 
  
    Utilities.sleep(3000);  // change this value to show the "Finished! This window will close automatically. HTML window for longer time.
  
    htmlApp("","close"); // Automatically closes the HTML window.
    var documentProperties = PropertiesService.getDocumentProperties();
    var sitesUpdateTime = documentProperties.getProperty('Latest Sites Update');
    var date2 = Date();
  Logger.log(sitesUpdateTime);
  documentProperties.setProperty('Latest Sites Update', date2);
  showBigQueryPage();
  }
  
   function htmlApp (status,close) {
       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var htmlApp = HtmlService.createTemplateFromFile("html");     
        htmlApp.data = status;
        htmlApp.close = close;
        ss.show(htmlApp.evaluate()
       .setWidth(300)
       .setHeight(75));
  }
  
  function BQaccountsUpdate () {  
    var documentProperties = PropertiesService.getDocumentProperties();
  var accountUpdateTime = documentProperties.getProperty('Latest Accounts Update');
  Logger.log(accountUpdateTime);
  return accountUpdateTime}
  
  function BQsitesUpdate () {  
    var documentProperties = PropertiesService.getDocumentProperties();
  var sitesUpdateTime = documentProperties.getProperty('Latest Sites Update');
  Logger.log(sitesUpdateTime);
  return sitesUpdateTime}