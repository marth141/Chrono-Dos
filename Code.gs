/* exported
main
*/

/* global
ServiceMasterBacklog
backlogProcessJunction
*/

function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  backlogProcessJunction(masterBacklogs, undefined);
  return;
}

function callMain(backlogName) {
  if (backlogName.match(/DEPT/i)) {
    var ss = SpreadsheetApp.openById("1lGXtQB23DM9BErKP9Bgk-oOzIOXXirj9fPpOmLnChm8");
  } else {
    throw "Wrong script for this report type";
  }
  var masterBacklogs = new ServiceMasterBacklog(ss);
  backlogProcessJunction(masterBacklogs, undefined);
  return;
}

