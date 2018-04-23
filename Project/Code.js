/* exported main */

/**
* This is currently where the code starts.
*
* @returns void
*/
function main() {
  try {
    //Wait my turn for upto 30 seconds.
    serviceLock.waitLock(30000);
  } catch (e) {
    //If I could not get a turn, throw error message to user.
    console.log(e);
    throw 'Could not obtain lock after 30 seconds.';
  }

  var masterBacklogs = new serviceMasterBacklog();

  backlogProcessJunction(masterBacklogs.Collection, undefined);
  findOldandNew(masterBacklogs.Collection);

  //End my turn.
  serviceLock.releaseLock();
  return;
}
