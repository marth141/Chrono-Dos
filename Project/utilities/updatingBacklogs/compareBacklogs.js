/* exported
debugCompare
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
getUpdateSheet
*/
function debugCompare() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  compareBacklogs(masterBacklogs.Collection[overRide]);
  return;
}

function compareBacklogs(stagingBacklog) {
  var stagingSheet = stagingBacklog;
  var updateSheet = getUpdateSheet(stagingBacklog);
  var stagingArray = getStagingArray(stagingBacklog);
  var updateArray = getUpdateArray(stagingBacklog);
  compareUnitTypes(stagingArray, updateArray);
}

function compareUnitTypes(stagingArray, updateArray) {
  var stagingUnitTypeCol = getMeThatColumn('Unit Type', stagingArray);
  var updateUnitTypeCol = getMeThatColumn('Unit Type', updateArray);
  actuallyCompare(stagingArray, updateArray, stagingUnitTypeCol, updateUnitTypeCol);
  console.log(stagingArray);
  console.log(updateArray);
  return;
}

function actuallyCompare(stagingArray, updateArray, stagingUnitTypeCol, updateUnitTypeCol) {
  for (var updateRow = 0; updateRow < updateArray.length; updateRow++) {
    for (var stagingRow = 0; stagingRow < stagingArray.length; stagingRow++) {
      if (updateArray[updateRow][0] === stagingArray[stagingRow][0]) {
        if (updateArray[updateRow][updateUnitTypeCol] === stagingArray[stagingRow][stagingUnitTypeCol]){
          updateArray[updateRow][updateUnitTypeCol] = stagingArray[stagingRow][stagingUnitTypeCol];
        } else if (updateArray[updateRow][updateUnitTypeCol] !== stagingArray[stagingRow][stagingUnitTypeCol]) {
          stagingArray[stagingRow][stagingUnitTypeCol] = updateArray[updateRow][updateUnitTypeCol];
        }
      }
    }
  }
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
