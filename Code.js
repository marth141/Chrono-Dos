/**
 * This is currently where the code starts.
 * The code will get a "lock" after 30 seconds.
 * Documentation: 
 * https://developers.google.com/apps-script/reference/lock/
 * Example:
 * https://stackoverflow.com/questions/43223774/how-to-understand-lockservice-and-implement-it-correctly
 * 
 * This is to prevent concurrent running from
 * being problematic. Kind of like everyone has
 * to take their turn. It'll then gather every
 * backlog as "masterBacklogs", a constructor.
 * It'll then work with all the backlog sheets
 * that are contained in "Collection".
 * Once it is done, it'll release the lock
 * and stop (return).
 * 
 * @returns To end the function.
 */
function main() {
  try {
    lock.waitLock(30000);
  } catch (e) {
    console.log(e);
    throw 'Could not obtain lock after 30 seconds.';
  }
  var masterBacklogs = new master_Backlogs();
  backlogProcessJunction(masterBacklogs.Collection);
  lock.releaseLock();
  return;
}
