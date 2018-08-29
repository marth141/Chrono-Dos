function getReport() {
  var ssThis = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Report");
  // Dev: 1r06cw7MtVKolZY6pXkmuoxcWPUeqtdm8Tu9sc5ljBkg
  // Prod: 121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0
  var ssReport = SpreadsheetApp.openById("121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0").getSheetByName("Report");
  var completeBacklog = [];
  
  var header = ssReport.getRange("2:2").getValues()[0];
  var dueInCol = header.indexOf("DUE IN: (hh:mm)");
  var solarProjectCol = header.indexOf("SOLAR PROJECT") -dueInCol;
  var cadObjCol = header.indexOf("CAD OBJECT") -dueInCol;
  var officeCol = header.indexOf("OFFICE") -dueInCol;
  var statusCol = header.indexOf("STATUS") -dueInCol;
  var redesignCol = header.indexOf("REDESIGN ASSIGNMENT") -dueInCol;
  var lastRow = ssReport.getLastRow()-1;
  var range = ssReport.getRange(3, dueInCol+1, lastRow, redesignCol+1);
  var formulas = range.getFormulas();
  completeBacklog = range.getValues().filter(function(row,index) { 
    var foundStateBool = ["ca-"].some(function(state) { return row[officeCol].toLowerCase().indexOf(state) > -1 });
    var onHoldBool = row[statusCol].match(/on hold/i);
    if(foundStateBool && !onHoldBool) {
      row[solarProjectCol] = formulas[index][solarProjectCol];
      row[cadObjCol] = formulas[index][cadObjCol];
      return true;
    }
    else {
      return false;
    }
  });
  
  lastRow = ssThis.getLastRow()-1;
  var lastCol = ssThis.getLastColumn();
  ssThis.getRange(3, 4, lastRow, lastCol-3).clearContent();
    
  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    ssThis.getRange(3, 4, rowNeeded, colNeeded).setValues(completeBacklog);
  }
  return;
}
