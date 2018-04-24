/* exported
main
*/

/* global
ServiceLock
ServiceMasterBacklog
backlogProcessJunction
*/

function main() {
  try {
    //Wait my turn for upto 30 seconds.
    ServiceLock.waitLock(30000);
  } catch (e) {
    //If I could not get a turn, throw error message to user.
    console.log(e);
    throw 'Could not obtain lock after 30 seconds.';
  }
  
  var masterBacklogs = new ServiceMasterBacklog();
  
  backlogProcessJunction(masterBacklogs.Collection, undefined);
  
  //End my turn.
  ServiceLock.releaseLock();
  return;
}
