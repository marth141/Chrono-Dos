function getOnHold() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssOnHold = ss.getSheetByName("On Hold");
  var ssReport = SpreadsheetApp.openById("121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0").getSheetByName("Report");
  var completeBacklog = [];
  
  var header = ssReport.getRange("2:2").getValues()[0];
  var dueInCol = header.indexOf("DUE IN: (hh:mm)");
  var officeCol = header.indexOf("OFFICE") -dueInCol;
  var statusCol = header.indexOf("STATUS") -dueInCol;
  var redesignCol = header.indexOf("REDESIGN ASSIGNMENT") -dueInCol;
  var lastRow = ssReport.getLastRow()-1;
  var test = redesignCol - dueInCol;
  completeBacklog = ssReport.getRange(3, dueInCol+1, lastRow, redesignCol+1).getValues().filter(function(row) { return row[statusCol].match(/on hold/i) });  // 3,dueInCol,stageCol,lastRow
  
  lastRow = ssOnHold.getLastRow()-1;
  var lastCol = ssOnHold.getLastColumn();
  ssOnHold.getRange(3, 4, lastRow, lastCol-3).clearContent();
    
  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    ssOnHold.getRange(3, 4, rowNeeded, colNeeded).setValues(completeBacklog);
  }
  return;
}
