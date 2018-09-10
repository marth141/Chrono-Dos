var clientID = "308056381116-ctehjr18liam8e5hkt51bsjv1vrf6je9.apps.googleusercontent.com";
var clientSecret = "GGYJp6j7-Z2VX7fOpV4HNAc0";

function doGet(e){
  var temp;
  console.log('Parameters: ' + e.parameter);
  switch(e.parameter) {
    case '':
      temp = HtmlService.createTemplateFromFile('index.html');
  }
  
  return HtmlService.createTemplateFromFile('index.html').evaluate();
    
//  return HtmlService.createHtmlOutputFromFile('index.html');
}


function getMarketsMasterData(){
  
  Logger.log('Get Markets Master Data')
  var ss = SpreadsheetApp.openById("18V8FIJYTJY_KlHORXcsTbVq1QB018jaUpdel6vxxdz4").getSheetByName("Sheet1");
  var lastRow = ss.getLastRow();
  var data = ss.getRange("B2:AL"+lastRow).getValues();
//  Logger.log(data);
  return data; 
}

function getUtilityRateData(){
  
  Logger.log('Get Utility Rate Data')
  var ss = SpreadsheetApp.openById("13bJaWiBKjn4WHWt2HgEcTSUVKQpdWZGQqUs3nJ8JbO0").getSheetByName("Utility Rates Summary");
  var lastRow = ss.getLastRow();
  var data = ss.getRange("A1:C"+lastRow).getValues();
//  Logger.log(data);
  return data; 
}


function getJurisdictionDatabase(){
  
  Logger.log('Get Jurisdiction Database')
  var ss = SpreadsheetApp.openById("14HXP3IVccq1Y8nLSdvDd8fAD68yAhDuLd4v1DkO5J30").getSheetByName("Jurisdiction Database");
  var lastRow = ss.getLastRow();
  //remove all columns not needed
  var data = ss.getRange("A4:G"+lastRow).getValues().filter(function(value){ value.splice(2, 4); return true; });
  return data; 
}


function getUtilityDatabase(){
  
  Logger.log('Get Utility Database')
  var ss = SpreadsheetApp.openById("14HXP3IVccq1Y8nLSdvDd8fAD68yAhDuLd4v1DkO5J30").getSheetByName("Utility Database");
  var lastRow = ss.getLastRow();
  //remove all columns not needed
  var data = ss.getRange("A3:O"+lastRow).getValues().filter(function(value){ value.splice(1, 13); return true; });
  return data; 
}

function getFieldOfficeDatabase(){
  
  Logger.log('Get Field Office Database')
  var ss = SpreadsheetApp.openById("14HXP3IVccq1Y8nLSdvDd8fAD68yAhDuLd4v1DkO5J30").getSheetByName("Field Office Database");
  var lastRow = ss.getLastRow();
  //remove all columns not needed
  var data = ss.getRange("A3:D"+lastRow).getValues();
  return data; 
}

function getContent(filename) {
 
  var return1= HtmlService.createTemplateFromFile(filename).getRawContent();
  return return1;
}
