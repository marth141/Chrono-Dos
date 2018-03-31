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

function prop_RegionMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // Above is a set up, below is an action.
  var col = getMeThatColumn('Service: Regional Operating Center', backlogArray, dim);
  var markedRegions = prop_MarkRegion(propBacklog, backlogArray, col, dim);
  var markedNatOffices = prop_MarkNatlRegion(propBacklog, markedRegions, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedNatOffices);
  propBacklog.deleteColumn(col + 1);
  SpreadsheetApp.flush();
  return;
}

function prop_MarkRegion(backlogSheet, backlogArray, col, dim) {
  var offices = new office_Collection();
  var region;
  backlogArray[0][dim[1]] = 'Region';
  for (var row = 1; row <= dim[0] - 1; row++) {
    var stateAbrv = backlogArray[row][col].substr(0, 2);
    if (offices.SouthWest.indexOf(stateAbrv) > -1) {
      region = 'Southwest';
      backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    } else if (stateAbrv === 'CA') {
      backlogArray = prop_MarkCaliRegion(offices, region, backlogArray, row, col, dim);
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

function prop_MarkCaliRegion(offices, region, backlogArray, row, col, dim) {
  var stateAbrv = backlogArray[row][col].substr(3, 2);
  if (offices.SouthCali.indexOf(stateAbrv) > -1) {
    region = 'SoCal';
    backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    return backlogArray;
  } else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
    region = 'NorCal';
    backlogArray = prop_WriteRegion(backlogArray, row, dim, region);
    return backlogArray;
  }
}

function prop_MarkNatlRegion(backlogSheet, firstMark, dim) {
  var col = getMeThatColumn('Opportunity: Office: Office Name', firstMark, dim);
  var markedNatOffices = prop_MarkNatlOffice(firstMark, col, dim);
  return markedNatOffices;
}

function prop_MarkNatlOffice(firstMark, col, dim) {
  var region;
  for (var row = 1; row <= dim[0] - 1; row++) {
    if (firstMark[row][col].match(/NIS/i)) {
      region = 'NIS';
      firstMark = prop_WriteRegion(firstMark, row, dim, region);
    } else if (firstMark[row][col].match(/Dealer/i)) {
      region = 'Dealer';
      firstMark = prop_WriteRegion(firstMark, row, dim, region);
    } else if (firstMark[row][col].match(/Retail/i)) {
      region = 'Retail';
      firstMark = prop_WriteRegion(firstMark, row, dim, region);
    }
  }
  return firstMark;
}

function prop_WriteRegion(backlogArray, row, dim, region) {
  backlogArray[row][dim[1]] = region;
  return backlogArray;
}