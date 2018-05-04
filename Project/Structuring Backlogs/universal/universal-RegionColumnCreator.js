// Staged for removal, possibly.
/* exported
debugUniRegMar
*/

/* global
ServiceMasterBacklog
ServiceOfficeCollection
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
*/

function debugUniRegMar() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_RegionMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} backlog
 * @returns 
 */
function uni_RegionMarker(backlog) {
  var sheetDim = getDimensions(backlog);
  var backlogArray = getBacklogArray(backlog, sheetDim);
  // Above is a set up, below is an action.
  var regOpCenterCol = getMeThatColumn('Service: Regional Operating Center', backlogArray);
  var markedRegions = markRegion(backlogArray, regOpCenterCol, sheetDim);
  var markedNatOffices = markNatlRegion(markedRegions, sheetDim);
  // Above is a set up, below is an action.
  backlog.getRange(1, 1, sheetDim[0], sheetDim[1] + 1).setValues(markedNatOffices); // pastes updated regions array
  backlog.deleteColumn(regOpCenterCol + 1); // deletes unnecessary columns
  SpreadsheetApp.flush();
  return;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {number} regOpCenterCol
 * @param {array} sheetDim
 * @returns 
 */
function markRegion(backlogArray, regOpCenterCol, sheetDim) {
  var offices = new ServiceOfficeCollection();
  var region;
  backlogArray[0][sheetDim[1]] = 'Region';
  for (var row = 1; row < backlogArray.length; row++) {
    var stateAbrv = backlogArray[row][regOpCenterCol].substr(0, 2);
    if (offices.SouthWest.indexOf(stateAbrv) > -1) {
      region = 'Southwest';
      backlogArray = writeRegion(backlogArray, row, sheetDim, region);
    } else if (stateAbrv === 'CA') {
      backlogArray = markCaliRegion(offices, region, backlogArray, row, regOpCenterCol, sheetDim);
    } else if (offices.NewEnglan.indexOf(stateAbrv) > -1) {
      region = 'New England';
      backlogArray = writeRegion(backlogArray, row, sheetDim, region);
    } else if (offices.Legion.indexOf(stateAbrv) > -1) {
      region = 'Legion';
      backlogArray = writeRegion(backlogArray, row, sheetDim, region);
    } else if (offices.GritMovem.indexOf(stateAbrv) > -1) {
      region = 'Grit Movement';
      backlogArray = writeRegion(backlogArray, row, sheetDim, region);
    }
  }
  return backlogArray;
}

/**
 *
 * 
 * @param {any} offices
 * @param {string} region
 * @param {array} backlogArray
 * @param {number} sNumberRow
 * @param {number} regOpCenterCol
 * @param {array} sheetDim
 * @returns
 */
function markCaliRegion(offices, region, backlogArray, sNumberRow, regOpCenterCol, sheetDim) {
  var stateAbrv = backlogArray[sNumberRow][regOpCenterCol].substr(3, 2);
  if (offices.SouthCali.indexOf(stateAbrv) > -1) {
    region = 'SoCal';
    backlogArray = writeRegion(backlogArray, sNumberRow, sheetDim, region);
    return backlogArray;
  } else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
    region = 'NorCal';
    backlogArray = writeRegion(backlogArray, sNumberRow, sheetDim, region);
    return backlogArray;
  }
}

/**
 *
 * 
 * @param {array} markedRegionsArray
 * @param {array} sheetDim
 * @returns
 */
function markNatlRegion(markedRegionsArray, sheetDim) {
  var OpproOfficeCol = getMeThatColumn('Opportunity: Office:*', markedRegionsArray);
  var markedNatOffices = markNatlOffice(markedRegionsArray, OpproOfficeCol, sheetDim);
  return markedNatOffices;
}

/**
 *
 * 
 * @param {array} markedRegionsArray
 * @param {number} opproOfficeCol
 * @param {array} sheetDim
 * @returns 
 */
function markNatlOffice(markedRegionsArray, opproOfficeCol, sheetDim) {
  var region;
  for (var row = 1; row < markedRegionsArray.length; row++) {
    if (markedRegionsArray[row][opproOfficeCol].match(/NIS/i)) {
      region = 'NIS';
      markedRegionsArray = writeRegion(markedRegionsArray, row, sheetDim, region);
    } else if (markedRegionsArray[row][opproOfficeCol].match(/Dealer/i)) {
      region = 'Dealer';
      markedRegionsArray = writeRegion(markedRegionsArray, row, sheetDim, region);
    } else if (markedRegionsArray[row][opproOfficeCol].match(/Retail/i)) {
      region = 'Retail';
      markedRegionsArray = writeRegion(markedRegionsArray, row, sheetDim, region);
    }
  }
  return markedRegionsArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {number} sNumberRow
 * @param {array} sheetDim
 * @param {string} region
 * @returns 
 */
function writeRegion(backlogArray, sNumberRow, sheetDim, region) {
  backlogArray[sNumberRow][sheetDim[1]] = region;
  return backlogArray;
}