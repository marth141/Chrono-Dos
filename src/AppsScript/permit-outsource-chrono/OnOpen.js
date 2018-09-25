function permitOutsource_onOpen()
{ 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var menu = [{name:'Error Que', functionName:'errorQue'}];
  ss.addMenu("SCRIPTS", menu);
}