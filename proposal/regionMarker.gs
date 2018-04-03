/**
 * For debugging regionMarker().
 * 
 * @returns void
 */
function debugRegMar() {
  var masterBacklogs = new master_Backlogs();
  prop_RegionMarker(masterBacklogs.Collection);
  return;
}

/**
 * For setting up variables for region marker.
 * Variables will be passed into prop_MarkRegion and
 * prop_MarkNatlRegion.
 * 
 * @param {Sheet} propBacklog The backlog sheet to be worked on.
 * @returns 
 */
function prop_RegionMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // Above is a set up, below is an action.
  var regOpCenterCol = getMeThatColumn('Service: Regional Operating Center', backlogArray, dim);
  var markedRegions = prop_MarkRegion(propBacklog, backlogArray, regOpCenterCol, dim);
  var markedNatOffices = prop_MarkNatlRegion(propBacklog, markedRegions, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedNatOffices);
  propBacklog.deleteColumn(regOpCenterCol + 1);
  SpreadsheetApp.flush();
  return;
}

/**
 * Used for filling in regions for non-california
 * states. The california states will need to go
 * through their own checking process.
 * 
 * @param {Sheet} backlogSheet The backlog sheet to be worked on.
 * @param {Array} backlogArray The backlog sheet as an array.
 * @param {Number} regOpCenterCol The column for regional ops centers.
 * @param {Array} dim The dimensions of the backlog sheet.
 * @returns The backlog array after marking regions.
 */
function prop_MarkRegion(backlogSheet, backlogArray, regOpCenterCol, dim) {
  var offices = new office_Collection();
  var region;
  backlogArray[0][dim[1]] = 'Region';
  for (var row = 1; row <= dim[0] - 1; row++) {
    var stateAbrv = backlogArray[row][regOpCenterCol].substr(0, 2);
    if (offices.SouthWest.indexOf(stateAbrv) > -1) {
      region = 'Southwest';
      backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    } else if (stateAbrv === 'CA') {
      backlogArray = prop_MarkCaliRegion(offices, region, backlogArray, row, regOpCenterCol, dim);
    } else if (offices.NewEnglan.indexOf(stateAbrv) > -1) {
      region = 'New England';
      backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    } else if (offices.Legion.indexOf(stateAbrv) > -1) {
      region = 'Legion';
      backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    } else if (offices.GritMovem.indexOf(stateAbrv) > -1) {
      region = 'Grit Movement';
      backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
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
function prop_MarkCaliRegion(offices, region, backlogArray, sNumberRow, regOpCenterCol, dim) {
  var stateAbrv = backlogArray[sNumberRow][regOpCenterCol].substr(3, 2);
  if (offices.SouthCali.indexOf(stateAbrv) > -1) {
    region = 'SoCal';
    backlogArray = prop_WriteRegion(backlogArray, sNumberRow, dim, region);
    return backlogArray;
  } else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
    region = 'NorCal';
    backlogArray = prop_WriteRegion(backlogArray, sNumberRow, dim, region);
    return backlogArray;
  }
}

/**
 * Marks National Regions, this would be NIS, Dealer,
 * and Retail accounts.
 * 
 * @param {Sheet} backlogSheet The sheet to be examined.
 * @param {Array} markedRegions The regions that were already marked.
 * @param {Array} dim The dimensions of the sheet. Should be 1 bigger.
 * @returns A completed backlog with Retail, Dealer, and NIS marked.
 */
function prop_MarkNatlRegion(backlogSheet, markedRegions, dim) {
  var OpproOfficeCol = getMeThatColumn('Opportunity: Office: Office Name', markedRegions, dim);
  var markedNatOffices = prop_MarkNatlOffice(markedRegions, OpproOfficeCol, dim);
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
function prop_MarkNatlOffice(markedRegions, opproOfficeCol, dim) {
  var region;
  for (var row = 1; row <= dim[0] - 1; row++) {
    if (markedRegions[row][opproOfficeCol].match(/NIS/i)) {
      region = 'NIS';
      markedRegions = prop_WriteRegion(markedRegions, row, dim, region);
    } else if (markedRegions[row][opproOfficeCol].match(/Dealer/i)) {
      region = 'Dealer';
      markedRegions = prop_WriteRegion(markedRegions, row, dim, region);
    } else if (markedRegions[row][opproOfficeCol].match(/Retail/i)) {
      region = 'Retail';
      markedRegions = prop_WriteRegion(markedRegions, row, dim, region);
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
function prop_WriteRegion(backlogArray, sNumberRow, dim, region) {
  backlogArray[sNumberRow][dim[1]] = region;
  return backlogArray;
}