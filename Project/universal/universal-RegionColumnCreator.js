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

/**
* For debugging regionMarker().
*
* @returns void
*/
function debugUniRegMar() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_RegionMarker(masterBacklogs.Collection);
  return;
}

/**
* For setting up variables for region marker.
* Variables will be passed into prop_MarkRegion and
* prop_MarkNatlRegion.
* 
* @param {Sheet} backlog The backlog sheet to be worked on.
* @returns 
*/
function uni_RegionMarker(backlog) {
  var dim = getDimensions(backlog);
  var backlogArray = getBacklogArray(backlog, dim);
  // Above is a set up, below is an action.
  var regOpCenterCol = getMeThatColumn('Service: Regional Operating Center', backlogArray, dim);
  var markedRegions = markRegion(backlog, backlogArray, regOpCenterCol, dim);
  var markedNatOffices = markNatlRegion(backlog, markedRegions, dim);
  // Above is a set up, below is an action.
  backlog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedNatOffices);
  backlog.deleteColumn(regOpCenterCol + 1);
  SpreadsheetApp.flush();
  return;
}

function markRegion(backlogArray, regOpCenterCol, dim) {
  var offices = new ServiceOfficeCollection();
  var region;
  backlogArray[0][dim[1]] = 'Region';
  for (var row = 1; row <= dim[0] - 1; row++) {
    var stateAbrv = backlogArray[row][regOpCenterCol].substr(0, 2);
    if (offices.SouthWest.indexOf(stateAbrv) > -1) {
      region = 'Southwest';
      backlogArray = writeRegion(backlogArray, row, dim, region);
    } else if (stateAbrv === 'CA') {
      backlogArray = markCaliRegion(offices, region, backlogArray, row, regOpCenterCol, dim);
    } else if (offices.NewEnglan.indexOf(stateAbrv) > -1) {
      region = 'New England';
      backlogArray = writeRegion(backlogArray, row, dim, region);
    } else if (offices.Legion.indexOf(stateAbrv) > -1) {
      region = 'Legion';
      backlogArray = writeRegion(backlogArray, row, dim, region);
    } else if (offices.GritMovem.indexOf(stateAbrv) > -1) {
      region = 'Grit Movement';
      backlogArray = writeRegion(backlogArray, row, dim, region);
    }
  }
  return backlogArray;
}

/**
* This is for making California Regions specifically.
* 
* @param {Array} offices A collection of offices for matching regions.
* @param {String} region The region to be filled in to the sheet.
* @param {Array} backlogArray The backlog Array.
* @param {Number} sNumberRow The service number row.
* @param {Number} regOpCenterCol The regional operations center to check. 
* @param {Array} dim The dimensions of the sheet.
* @returns 
*/
function markCaliRegion(offices, region, backlogArray, sNumberRow, regOpCenterCol, dim) {
  var stateAbrv = backlogArray[sNumberRow][regOpCenterCol].substr(3, 2);
  if (offices.SouthCali.indexOf(stateAbrv) > -1) {
    region = 'SoCal';
    backlogArray = writeRegion(backlogArray, sNumberRow, dim, region);
    return backlogArray;
  } else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
    region = 'NorCal';
    backlogArray = writeRegion(backlogArray, sNumberRow, dim, region);
    return backlogArray;
  }
}

function markNatlRegion(markedRegions, dim) {
  var OpproOfficeCol = getMeThatColumn('Opportunity: Office:*', markedRegions, dim);
  var markedNatOffices = markNatlOffice(markedRegions, OpproOfficeCol, dim);
  return markedNatOffices;
}

/**
* Marks National Regions, this would be NIS, Dealer,
* and Retail accounts.
* 
* @param {Array} markedRegions The backlog with non NIS, Dealer, and Retail marked.
* @param {Number} opproOfficeCol The column for Opprotunity office. 
* @param {Array} dim The dimensions of the backlog sheet.
* @returns The backlog with all the marked Natl Offices.
*/
function markNatlOffice(markedRegions, opproOfficeCol, dim) {
  var region;
  for (var row = 1; row <= dim[0] - 1; row++) {
    if (markedRegions[row][opproOfficeCol].match(/NIS/i)) {
      region = 'NIS';
      markedRegions = writeRegion(markedRegions, row, dim, region);
    } else if (markedRegions[row][opproOfficeCol].match(/Dealer/i)) {
      region = 'Dealer';
      markedRegions = writeRegion(markedRegions, row, dim, region);
    } else if (markedRegions[row][opproOfficeCol].match(/Retail/i)) {
      region = 'Retail';
      markedRegions = writeRegion(markedRegions, row, dim, region);
    }
  }
  return markedRegions;
}

/**
* Writes the region into the cells specified at the
* row, col location.
* 
* @param {Array} backlogArray The backlog array to be edited.
* @param {Number} sNumberRow The service number row to be worked.
* @param {Array} dim The dimensions of the backlog sheet.
* @param {String} region The region string to be filled in.
* @returns An edited backlog array with the region filled in.
*/
function writeRegion(backlogArray, sNumberRow, dim, region) {
  backlogArray[sNumberRow][dim[1]] = region;
  return backlogArray;
}