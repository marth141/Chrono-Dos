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
