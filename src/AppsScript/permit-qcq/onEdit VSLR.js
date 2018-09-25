function onEdit(callerId) 
{ 
  Logger.log("On Edit");
  var ss = SpreadsheetApp.getActiveSheet();
  var sheetName = ss.getSheetName();
  var cell = ss.getActiveCell();
  var col = cell.getColumn();
  var ro = cell.getRow();
  var celldata = ss.getActiveCell().getValue();
  
  if(col == 21 && ro > 5 && celldata != "" && sheetName == "Queue"){
    var row = cell.getRow(); 
    col = 22;
    
    ss.getRange(row, col).setValue("In Progress");
    reSort(ss);
  }
  else if((col == 21 || col == 22) && ro > 5 && sheetName == "Queue")
  {
    reSort(ss);
  }
}

function reSort(ss){

  var properties = PropertiesService.getScriptProperties();
  var row = Number(properties.getProperty('row'))+5;
  
  Logger.log("Resort");
  Logger.log(row);
  var sortRange = ss.getRange("B6:X"+row);
  sortRange.sort([{column: 21, ascending: true},{column: 24, ascending: true},{column: 23, ascending: false},{column: 15, ascending: false}]);
}