 javascript
////This sample demonstrates how to configure the library for Google APIs, using
//* domain-wide delegation (Service Account flow).
//* https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
// */



var secret = manageSecrets2();
var private_key = secret.private_key;
var client_email = secret.client_email;
var PRIVATE_KEY = private_key;
var CLIENT_EMAIL = client_email;
// Private key and client email of the service account.
Logger.log(CLIENT_EMAIL)
// Email address of the user to impersonate.
var USER_EMAIL = 'sswingle@ampion.co';


function getAllUserDlp() {
    var service3 = getService3();
    var service = getService();
    if (service.hasAccess()) {
        var url = "https://admin.googleapis.com/admin/reports/v1/activity/users/all/applications/rules";
        var response = UrlFetchApp.fetch(url, {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + service.getAccessToken(),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            "muteHttpExceptions": true,
            "followRedirects": true,
            "validateHttpsCertificates": true,
            "contentType": "application/json",
            "payload": JSON.stringify(

            )
        });
        Logger.log(response)

        var data = JSON.parse(response.getContentText());
        var eventsLength = data.items.length

        var resultsArray = [];
        for (var i = 0; i < eventsLength; i++) {
            resultsArray.push(data.items[i].events[0].parameters[3].value)
        }
        var newarray = [];

        var unique = createUniqueSingleArray(resultsArray);
        var uniqueLength = unique.length
        var uniqueShift = unique.shift();
        newarray.concat(unique)

        scriptProperties = PropertiesService.getScriptProperties();
        scriptProperties.setProperty('activeUsers', JSON.stringify(unique));

        Logger.log("this is newarray " + newarray)
        Logger.log("this is unique " + unique)
        Logger.log("This is the result: " + resultsArray)
        Logger.log("This is the length of unique: " + uniqueLength)

        // unique.forEach(setProperty);



    } else {
        Logger.log(service.getLastError());
    }
 return unique    
}

function createUniqueSingleArray(vals) {

    let unique = [...new Set(vals)]; //Make unique
    let uniqueSort = unique.sort() //Sort Array

    return uniqueSort; //Create 2d array for Google Sheets
};


function filterUserList() {
  var users = getAllUserDlp();
  var usersLength = users.length
  var output = [];
    var service = getService();
    if (service.hasAccess()) {
        for (var f = 0; f < usersLength; f++) {
            var url = "https://admin.googleapis.com/admin/reports/v1/activity/users/" + users[f] + "/applications/rules";
            Logger.log(users)
            Logger.log(url)
            var response = UrlFetchApp.fetch(url, {
                "method": "GET",
                "headers": {
                    "Authorization": "Bearer " + service.getAccessToken(),
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "muteHttpExceptions": true,
                "followRedirects": true,
                "validateHttpsCertificates": true,
                "contentType": "application/json",
                "payload": JSON.stringify(

                )
            });

//If response data is undefined then skip to next item of array. If response data IS defined then simply take the name from the array and push it to a new array.
        
var data = JSON.parse(response.getContentText());
var dataLength = data.length;
var dataStringify = JSON.stringify(data);
var dataStringifyLength = JSON.stringify(data).length;

Logger.log("dataLength: " + dataLength)
Logger.log("dataStringify: " + dataStringify)
Logger.log("dataStringifyLength: " + dataStringifyLength)

if (dataStringifyLength < 200){output.push('undefined')

Logger.log("output: " + output)
}

 else {output.push(users[f]);
Logger.log(output)

}

undefinedRemoved = output.filter(function( element ) {
   return element !== "undefined";
});

Logger.log(undefinedRemoved)

}return undefinedRemoved;}

}

/**
 * Authorizes and makes a request to the Google Drive API.
 */
function turnOffAllUserDlp() {
    var scriptProperties = PropertiesService.getScriptProperties();
    //var users = JSON.parse(scriptProperties.getProperty('activeUsers'))
    var users = filterUserList();
    //var users = ["sswingle@ampion.co", "watyourservice@ampion.co", "wlyman@ampion.co"]
    var usersString = JSON.stringify(users)
    Logger.log(users)
    Logger.log("This is users text: " + usersString)
    var usersLength = users.length
    var usersStringLength = usersString.length
    Logger.log(usersStringLength)
    Logger.log(usersLength)

    var service3 = getService3();
    var service = getService();
    if (service.hasAccess()) {
        for (var f = 0; f < usersLength; f++) {
            var url = "https://admin.googleapis.com/admin/reports/v1/activity/users/" + users[f] + "/applications/rules";
            Logger.log(users)
            Logger.log(url)
            var res = UrlFetchApp.fetch(url, {
                "method": "GET",
                "headers": {
                    "Authorization": "Bearer " + service.getAccessToken(),
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                "muteHttpExceptions": true,
                "followRedirects": true,
                "validateHttpsCertificates": true,
                "contentType": "application/json",
                "payload": JSON.stringify(

                )
            });
            Logger.log("this is response: " + res)

            //        Logger.log("access: " + AcessToken)
            var data = JSON.parse(res.getContentText());
            var dataStringify = JSON.stringify(data)
            var eventsLength = data.items.length
            var json = JSON.parse(res)
            Logger.log(JSON.stringify(data, null, 2));

            var resultsArray = [];
            
            for (var i = 0; i < eventsLength; i++) {
                resultsArray.push(data.items[i].events[0].parameters[1].value)
            }
            
            Logger.log(resultsArray)
            if (service3.hasAccess()) {
            var resultsArrayFiltered = createUniqueSingleArray(resultsArray)
            Logger.log("resultsArrayFiltered is: "+resultsArrayFiltered)
                for (var i = 0; i < resultsArrayFiltered.length; i++) {
                    service3 = getService3(users[f]);
                    const url = "https://www.googleapis.com/drive/v3/files/" + resultsArrayFiltered[i];
                    const res = UrlFetchApp.fetch(url, {
                        "method": "patch",
                        "headers": { "authorization": "Bearer " + service3.getAccessToken() },
                        "contentType": "application/json",
                        "muteHttpExceptions": true,
                        "payload": JSON.stringify({ "viewersCanCopyContent": false, "writersCanShare": false }),
                    });
                    console.log(res.getContentText())

                    //DriveApp.createFile(blob)  // This comment line is used for automatically detecting the scope of "https://www.googleapis.com/auth/drive"


                }
            } else {
                Logger.log(service.getLastError());
            }
        }
    } else {
        Logger.log(service.getLastError());
    }
}

 
function turnOffOnwardShares2(value) {
    service3 = getService3();
    const url = "https://www.googleapis.com/drive/v3/files/" + value;
    const res = UrlFetchApp.fetch(url, {
        "method": "patch",
        "headers": { "authorization": "Bearer " + service3.getAccessToken() },
        "contentType": "application/json",
        "muteHttpExceptions": true,
        "payload": JSON.stringify({ "viewersCanCopyContent": false, "writersCanShare": false }),
    });
    console.log(res.getContentText())

    //DriveApp.createFile(blob)  // This comment line is used for automatically detecting the scope of "https://www.googleapis.com/auth/drive"
}
/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
    getService().reset();
}

/**
 * Configures the service.
 */

function getService3(val) {
    return OAuth2.createService('Drive:' + val)
        // Set the endpoint URL.
        .setTokenUrl('https://oauth2.googleapis.com/token')

        // Set the private key and issuer.
        .setPrivateKey(PRIVATE_KEY)
        .setIssuer(CLIENT_EMAIL)

        // Set the name of the user to impersonate. This will only work for
        // Google Apps for Work/EDU accounts whose admin has setup domain-wide
        // delegation:
        // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
        .setSubject(val)

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getScriptProperties())

        // Set the scope. This must match one of the scopes configured during the
        // setup of domain-wide delegation.
        .setScope('https://www.googleapis.com/auth/drive');
}

function getService() {
    return OAuth2.createService('Reports:' + "dlp-test-2@dlp-test-2-326618.iam.gserviceaccount.com")

    //dlp-test-2@dlp-test-2-326618.iam.gserviceaccount.com
        // Set the endpoint URL.
        .setTokenUrl('https://oauth2.googleapis.com/token')

        // Set the private key and issuer.
        .setPrivateKey(PRIVATE_KEY)
        .setIssuer(CLIENT_EMAIL)

        // Set the name of the user to impersonate. This will only work for
        // Google Apps for Work/EDU accounts whose admin has setup domain-wide
        // delegation:
        // https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority
        .setSubject("dlp-test-2@dlp-test-2-326618.iam.gserviceaccount.com")

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getScriptProperties())

        // Set the scope. This must match one of the scopes configured during the
        // setup of domain-wide delegation.
        .setScope('https://www.googleapis.com/auth/admin.reports.audit.readonly');
}


function manageSecrets2() {
    {
        const Url = "https://secretmanager.googleapis.com/v1/projects/880182345598/secrets/DLP_2/versions/1:access"
        const responseSecret = UrlFetchApp.fetch(Url, {

            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + ScriptApp.getOAuthToken(), //change to service.get
                "Accept": "application/json",
                "Content-Type": "application/json",
                "name": "Google_DLP"
            },
            "muteHttpExceptions": true,
            "followRedirects": true,
            "validateHttpsCertificates": true,
            "contentType": "application/json",
        });

        const dataSecretText = JSON.parse(responseSecret.getContentText());
        const dataSecretKey = dataSecretText.payload.data

        // This is the base64 encoded form of "Google グループ"
        var base64data = dataSecretKey;

        // This logs:
        //     [71, 111, 111, 103, 108, 101, 32, -29, -126, -80,
        //      -29, -125, -85, -29, -125, -68, -29, -125, -105]
        var dataSecretKeyDecoded = Utilities.base64Decode(base64data);

        // If we want a String instead of a byte array:
        // This logs the original "Google グループ"
        var dataSecretKeyDecodedString = Utilities.newBlob(dataSecretKeyDecoded).getDataAsString();
        var dataSecretKeyDecoded_text = JSON.parse(dataSecretKeyDecodedString);
        var dataSecretKeyDecoded_Key = dataSecretKeyDecoded_text.private_key;
        var client_email = dataSecretKeyDecoded_text.client_email;
        var client_id = dataSecretKeyDecoded_text.client_id

    }
    return dataSecretKeyDecoded_text;
}