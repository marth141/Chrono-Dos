/* exported
debugCompare
*/

/* global
ServiceMasterBacklog
getStagingArray
getUpdateArray
getUpdateSheet
*/
function debugCompare() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 1;
  compareBacklogs(masterBacklogs.Collection[overRide]);
  return;
}

function compareBacklogs(stagingBacklog) {
  var updateSheet = getUpdateSheet(stagingBacklog);
  var updateArray = getUpdateArray(stagingBacklog);
  var stagingArray = getStagingArray(stagingBacklog);
}

function findOldandNew(masterBacklogs, overRide) {
  var backlogsFound = false;
  do {
    backlogsFound = matchBacklogs(masterBacklogs, overRide);
  } while (backlogsFound === false);
}

function matchBacklogs(masterBacklogs, overRide) {
  for (var stagingSheet in masterBacklogs) {
    if (overRide !== undefined) {
      stagingSheet = overRide;
    }
    if (masterBacklogs[stagingSheet].getName() === 'staging_DEPT PROPOSAL BACKLOG') {
      newBacklog = masterBacklogs[stagingSheet];
      for (var oldSheet in masterBacklogs) {
        if (masterBacklogs[oldSheet].getName() === 'DEPT PROPOSAL BACKLOG') {
          return oldBacklog = masterBacklogs[oldSheet];
        }
      }
    } else if (masterBacklogs[stagingSheet] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + masterBacklogs[stagingSheet].getName() + ' is not being worked.');
      continue;
    }
  }
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
