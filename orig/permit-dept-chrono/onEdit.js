function onEdit(e) { //POPULATES THE APPROPRIATE ACCOUNT INFORMATION WHEN THE SERVICE NUMBER IS CHANGED IN REQUIREMENTS!C2
  var ss = e.source.getActiveSheet();
  var sheetName = ss.getName();
  if (sheetName === "On Hold" || sheetName === "Report")
  {
    var range = e.range;
    var column = range.getColumn();
    var row = range.getRow();
    if(e.value === undefined) {
      e.value = ss.getRange(row, column).getValue();
    }
    if(column >= 15 && column <= 19  && row > 2)
    {
      var header = ss.getRange("2:2").getValues()[0];
      var servicenNumCol = header.indexOf("SERVICE") +1;
      var unitTypeCol = header.indexOf("UNIT TYPE") +1;
      var regionCol = header.indexOf("REGION") +1;
      var lastUpdateCol = header.indexOf("LAST UPDATE") +1;
      var serviceNumber = ss.getRange(row, servicenNumCol).getValue();
      var unitType = ss.getRange(row, unitTypeCol).getValue();
      var region = ss.getRange(row, regionCol).getValue();
      if(serviceNumber === "") {
//        Browser.msgBox("Value sent" +  e.value);
        return;
      }
      var pass = makeEdits(serviceNumber, servicenNumCol, unitType, lastUpdateCol, column, e.value);
      if(!pass) {
        return;
      }
      ss.getRange(row, lastUpdateCol).setValue(new Date());
    }
    else {
      Browser.msgBox("Can't edit those columns");
    }
  }
}



function makeEdits(serviceNumber, servicenNumCol, unitType, lastUpdateCol, column, value) {
  var foundRow;
  var ssReport = SpreadsheetApp.openById("121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0").getSheetByName("Report");
  var test = ssReport.getRange(3, servicenNumCol, ssReport.getLastRow()-1, lastUpdateCol).getValues().some(function(row, index) { 
    if(row[0] === serviceNumber && row[8] === unitType) { 
      foundRow = index + 2;
      return true;
    } 
  }); 
  
  if(foundRow === undefined) {
    Browser.msgBox("Can't find service number in chrono " + servicenNumCol);
    return false;
  }
  
  ssReport.getRange(foundRow+1, column).setValue(value);
  ssReport.getRange(foundRow+1, lastUpdateCol).setValue(new Date());
}

function test() {
  makeEdits("S-5962801", 7, "OUTSOURCE", 17, 20, "PRIORITY");
}