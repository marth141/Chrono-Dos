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
  updateBacklog(masterBacklogs.Collection[overRide]);
  return;
}

function updateBacklog(stagingBacklog) {
  var stagingSheet = stagingBacklog;
  var updateSheet = getUpdateSheet(stagingBacklog);
  var stagingArray = getStagingArray(stagingBacklog);
  var updateArray = getUpdateArray(stagingBacklog);
  compareBacklogs(stagingArray, updateArray);
}

function compareBacklogs(stagingArray, updateArray) {
  var stagingUnitTypeCol = getMeThatColumn('Unit Type', stagingArray);
  var updateUnitTypeCol = getMeThatColumn('Unit Type', updateArray);
  compareUnitTypes(stagingArray, updateArray, stagingUnitTypeCol, updateUnitTypeCol);
  console.log(stagingArray);
  console.log(updateArray);
  return;
}

var UnitTypeCompareClass = function () {
  this.serviceNumberMatch = function (updateServiceNumber, stagingServiceNumber) {
    if (updateServiceNumber === stagingServiceNumber) {
      return true;
    }
  };
  this.unitColMatch = function (updateUnitType, stagingUnitType) {
    if (updateUnitType === stagingUnitType) {
      return true;
    } else {
      return false;
    }
  };
};

var UnitTypeReplaceClass = function () {
  this.replaceUpdateWithStaging = function (updateUnitType, stagingUnitType) {
    updateUnitType = stagingUnitType;
  };
  this.replaceStagingWithUpdate = function (stagingUnitType, updateUnitType) {
    stagingUnitType = updateUnitType;
  };
};

function compareUnitTypes(stagingArray, updateArray, stagingUnitTypeCol, updateUnitTypeCol) {
  var CheckThat = new UnitTypeCompareClass();
  var DoThis = new UnitTypeReplaceClass();
  for (var updateRow = 0; updateRow < updateArray.length; updateRow++) {
    for (var stagingRow = 0; stagingRow < stagingArray.length; stagingRow++) {
      var updateServiceNumber = updateArray[updateRow][0];
      var stagingServiceNumber = stagingArray[stagingRow][0];
      var updateUnitType = updateArray[updateRow][updateUnitTypeCol];
      var stagingUnitType = stagingArray[stagingRow][stagingUnitTypeCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        if (CheckThat.unitColMatch(updateUnitType, stagingUnitType) === true) {
          DoThis.replaceUpdateWithStaging(updateUnitType, stagingUnitType);
        } else if (CheckThat.unitColMatch(updateUnitType, stagingUnitType) !== true) {
          DoThis.replaceStagingWithUpdate(stagingUnitType, updateUnitType);
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
