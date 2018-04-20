/* exported debugCompare */
function debugCompare() {
  var masterBacklogs = new serviceMasterBacklog();
  var overRide = 1;
  compareBacklogs(masterBacklogs.Collection[overRide]);
  return;
}

function compareBacklogs(stagingBacklog) {
  var stagingName = stagingBacklog.getName();
  var stagingDim = getDimensions(stagingBacklog);
  var updateName = stagingName.replace('staging_', '');
  var updateBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(updateName);
  var toUpdateDim = getDimensions(updateBacklog);
  var oldBacklog = getBacklogArray(stagingBacklog, stagingDim);
  var newBacklog = getBacklogArray(updateBacklog, toUpdateDim);
  console.log('Old Backlog: ' + oldBacklog);
  console.log('new Backlog: ' + newBacklog);
  // Get old backlog array
  // Get new backlog array
  // Get columns to compare
  // Compare Columns
  // Keep Old if conditions met,
  // else add new
}

function getOldBacklog() {

}

function getNewBacklog() {

}

function findOldandNew(masterBacklogs, overRide) {
  var newBacklog;
  var oldBacklog;
  var backlogsFound = false;
  do {
    for (var stagingSheet in masterBacklogs) {
      if (overRide !== undefined) {
        stagingSheet = overRide;
      }
      if (masterBacklogs[stagingSheet].getName() === 'staging_DEPT PROPOSAL BACKLOG') {
        newBacklog = masterBacklogs[stagingSheet];
        for (var oldSheet in masterBacklogs) {
          if (masterBacklogs[oldSheet].getName() === 'DEPT PROPOSAL BACKLOG') {
            oldBacklog = masterBacklogs[oldSheet];
            backlogsFound = true;
          }
        }
      } else if (masterBacklogs[stagingSheet] === null) {
        throw 'The backlog was null in dateOperations()';
      } else {
        console.log('This backlog: ' + masterBacklogs[stagingSheet].getName() + ' is not being worked.');
        continue;
      }
    }
  } while (backlogsFound === false);
}

function otherCompareBacklogs() {
  for (var newRowIndex = 1; newRowIndex < newBacklog.length; newRowIndex++) {
    var found = false;
    var newServiceNumberRow = newBacklog[newRowIndex];
    do {
      for (var oldRowIndex = 1; oldRowIndex < oldBacklog.length; oldRowIndex++) {
        var oldServiceNumberRow = oldBacklog[oldRowIndex];
        if (newServiceNumberRow[0] === oldServiceNumberRow[0]) {
          if (newServiceNumberRow === oldServiceNumberRow)
            found = true;
        }
      }
    } while (found === false);
  }
  return;
}
