var ss = SpreadsheetApp.getActiveSpreadsheet();

function clearAllTabs() {
  //ss.getSheetByName("Queue").getRange("H2").setValue("REPORT BEING RUN");
  
  var checkPerm = ss.getSheetByName("PERMITS");
  var checkSREE = ss.getSheetByName("SR/EEs");
  
  checkPerm.getRange("A:R").clearContent().clearFormat();
  checkSREE.getRange("A:R").clearContent().clearFormat();
}