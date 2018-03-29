function main() {
	try {
		lock.waitLock(30000);
	} catch (e) {
		console.log(e);
		throw 'Could not obtain lock after 30 seconds.';
	}
	var masterBacklogs = new master_Backlogs();
	dateOperations(masterBacklogs.Collection);
	regionMarker(masterBacklogs.Collection);
	unitTypeMarker(masterBacklogs.Collection);
	solProjLinkCreator(masterBacklogs.Collection);
	lock.releaseLock();
	return;
}
