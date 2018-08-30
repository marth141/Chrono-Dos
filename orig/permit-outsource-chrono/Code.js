function gatherData() {
  var overDue=0, dueToday=0, notYetDue=0, total=0;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var RP = ss.getSheetByName("Dept. Report");
  var C = ss.getSheetByName("Capture");
  
  var data = RP.getRange("E3:E").getValues();
  var serviceData = RP.getRange("K3:K").getValues();
  
  for(d in data)
  {
    var sNum = serviceData[d][0];
    if(sNum.indexOf("S-")>-1)
    {
      total++;
      switch(data[d][0])
      {
        case 'Overdue':
          overDue++;
          break;
        case 'Due Today':
          dueToday++;
          break;
        case 'Not Yet Due':
          notYetDue++;
          break;
      }
    }
  }
  var output = [new Date(), overDue, dueToday, notYetDue, total]
  var last = C.getLastRow() + 1;
  C.getRange("A"+last+":E"+last).setValues([output]);
  
}
