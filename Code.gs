/* exported
main
*/

/* global
ServiceMasterBacklog
backlogProcessJunction
*/

function main() {
  var masterBacklogs = new ServiceMasterBacklog();
  backlogProcessJunction(masterBacklogs.Collection, undefined);
  return;
}

function callMain(ss) {
  var masterBacklogs = new CallServiceMasterBacklog(ss);
  backlogProcessJunction(masterBacklogs.Collection, undefined);
  return;
}

