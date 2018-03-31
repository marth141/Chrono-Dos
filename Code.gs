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
