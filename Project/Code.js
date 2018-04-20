/**
* This is currently where the code starts.
*
* @returns To end the function.
*/
/* exported main */
function main() {
  try {
    //Wait my turn for upto 30 seconds.
    serviceLock.waitLock(30000);
  } catch (e) {
    //If I could not get a turn, throw error message to user.
    console.log(e);
    throw 'Could not obtain lock after 30 seconds.';
  }

  //On my turn...
  var masterBacklogs = new serviceMasterBacklog();

  //Go to Junction.js, for each backlog
  //perform creation and formatting jobs.
  //Helps perform unique operations for
  //unique backlogs.
  backlogProcessJunction(masterBacklogs.Collection, undefined);
  findOldandNew(masterBacklogs.Collection);

  //End my turn.
  serviceLock.releaseLock();
  return;
}
