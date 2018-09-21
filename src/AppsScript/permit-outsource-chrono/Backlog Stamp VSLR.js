function backlogStamp() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var chronoInfo = ss.getSheetByName("Dept. Report").getRange('A1:AC').getValues();
  var target = SpreadsheetApp.openById('1lxi71MumvCo1aiSoL52yRkHN6vCUI8doFO66VPDF2Wc');
  
  var timeZone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(new Date(), timeZone, "MM/dd/yy hh:mm a");
  var sheetNameofWhereToPasteChronoSnapshot;
  var currentDayOfWeek = target.getSheetByName("Count of Queued Accounts").getRange('B2').getValue();
  if(currentDayOfWeek == "Monday")
  {
    target.getSheetByName('MON Snapshot').getRange('A1:AC').clearContent();
    target.getSheetByName('TUE Snapshot').getRange('A1:AC').clearContent();
    target.getSheetByName('WED Snapshot').getRange('A1:AC').clearContent();
    target.getSheetByName('THU Snapshot').getRange('A1:AC').clearContent();
    target.getSheetByName('FRI Snapshot').getRange('A1:AC').clearContent();
    target.getSheetByName('SAT Snapshot').getRange('A1:AC').clearContent();
    sheetNameofWhereToPasteChronoSnapshot = 'MON Snapshot';
  }
  if(currentDayOfWeek == "Tuesday")
    sheetNameofWhereToPasteChronoSnapshot = 'TUE Snapshot';
  if(currentDayOfWeek == "Wednesday")
    sheetNameofWhereToPasteChronoSnapshot = 'WED Snapshot';
  if(currentDayOfWeek == "Thursday")
    sheetNameofWhereToPasteChronoSnapshot = 'THU Snapshot';
  if(currentDayOfWeek == "Friday")
    sheetNameofWhereToPasteChronoSnapshot = 'FRI Snapshot';
  if(currentDayOfWeek == "Saturday")
    sheetNameofWhereToPasteChronoSnapshot = 'SAT Snapshot';
  
  target.getSheetByName(sheetNameofWhereToPasteChronoSnapshot).getRange('A1:AC').setValues(chronoInfo);   
  target.getSheetByName(sheetNameofWhereToPasteChronoSnapshot).getRange('H1').setValue(date);

}

