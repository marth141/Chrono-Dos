/**
 * Get's a designer's filter settings
 * @param {*} email
 * @return {*}
 */
function getFilterSettings(email) {
  console.log('GET Filter Settings Email: ' + email);
  var cpDesigner = true;
  var filterSettingsIDs = [
    '1lGXtQB23DM9BErKP9Bgk-oOzIOXXirj9fPpOmLnChm8',
    '15Dw4ZzmBXP6sRk3GMlETyEkBp6V8H6P7x2cXbG6pJRM',
    '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0',
    '1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE'
  ]; // [ChronoOneID, cpOutsourceID, ChronoDosID, ppOutsourceID]
  var filterHeader, filterSheet, filterSheetLastRow, filterSheetLastColumn, designerRow, designer;
  var allDesigners = { 'name': [], 'sfName': [] };

  // For testing/troubleshooting other designers filter settings
  if (email == 'eric.vanwagoner@vivintsolar.com' && true) {
    email = SpreadsheetApp.openById(filterSettingsIDs[2])
      .getSheetByName('Filter Settings')
      .getRange('B1')
      .getValue(); // "anil.kumar@vivintsolar.com";
    if (email === '') {
      email = 'eric.vanwagoner@vivintsolar.com';
    }
  }
  // Go through each chrono filter settings until email is found
  for (var keyID in filterSettingsIDs) {
    filterSheet = SpreadsheetApp.openById(filterSettingsIDs[keyID]).getSheetByName(
      'Filter Settings'
    );
    filterHeader = filterSheet.getRange('B3:3').getValues()[0];
    designerRow = searchFilterSettings(filterSheet, filterHeader, email);

    // If designer found break loop and get header from Filter Settings Sheet
    if (designerRow) {
      // if found after the first 2 key id's then mark cpDesigner false
      if (keyID > 1) {
        cpDesigner = false;
      }
      break;
    }
  }
  // If email not found return false
  if (designerRow === false) {
    console.log('Can not find Email: ' + email);
    return false;
  }

  if (cpDesigner) {
    designer = new designerCP(filterHeader, designerRow);
  } else {
    designer = new designerPP(filterHeader, designerRow);
  }
  // If LEAD Overview
  var teamCol = filterHeader.indexOf('TEAM');
  if (teamCol > -1 && designerRow[teamCol].match(/overview/i)) {
    filterSheet
      .getRange('B4:D')
      .getValues()
      .filter(function(row) {
        if (row[0] === '') return false;
        allDesigners.name.push(row[0]);
        allDesigners.sfName.push(row[2]);
        return;
      });
    // Add additional keys for LEAD Overview
    designer.allNames = allDesigners.name;
    designer.allsfNames = allDesigners.sfName;
    designer.team = 'Outsource';
    designer.master = true;
  }

  console.log('Return Filter Settings Desginer: ' + JSON.stringify(designer));
  return designer;
}

/**
 * Search Filter Settings for designer by Email
 * @param {*} ss
 * @param {*} filterHeader
 * @param {*} email
 * @return {*} row of designer found or false if not found
 */
function searchFilterSettings(ss, filterHeader, email) {
  var emailCol = filterHeader.indexOf('EMAIL');
  var lastRow = ss.getLastRow();
  var lastColumn = ss.getLastColumn();
  var array = ss.getRange(4, 2, lastRow - 3, lastColumn).getValues();
  var designerRow = ss
    .getRange(4, 2, lastRow - 3, lastColumn)
    .getValues()
    .filter(function(row) {
      return row[emailCol] == email;
    })[0];

  // If email not found return false
  if (designerRow === undefined || designerRow.length < 1) {
    return false;
  } else {
    return designerRow;
  }
}

/**
 * Get Filter settings header
 * @param {*} ss
 * @return {*}
 */
function getFilterSettingsHeader(ss) {
  // returns header row
  return ss.getRange('B3:3').getValues()[0];
}

/**
 * CP Designer Object
 * @param {*} filterHeaders
 * @param {*} designerRow
 */
var designerCP = function(filterHeaders, designerRow) {
  var nameCol = filterHeaders.indexOf('NAME');
  var emailCol = filterHeaders.indexOf('EMAIL');
  var sfNameCol = filterHeaders.indexOf('SALESFORCE NAME');
  var teamCol = filterHeaders.indexOf('TEAM');
  var region1Col = filterHeaders.indexOf('INCLUDE REGION 1');
  var region2Col = filterHeaders.indexOf('INCLUDE REGION 2');
  var gsrCol = filterHeaders.indexOf('GSR');
  var auroraCol = filterHeaders.indexOf('AURORA');
  var snowPropCol = filterHeaders.indexOf('SNOW PROP');
  var part1Col = filterHeaders.indexOf('PART 1');
  var cprdCol = filterHeaders.indexOf('CP RD');
  var rejectedCol = filterHeaders.indexOf('REJECTED');
  var otsgsrCol = filterHeaders.indexOf('OTS GSR');
  var otsauroraCol = filterHeaders.indexOf('OTS AURORA');
  var excludeCol = filterHeaders.indexOf('EXCLUDED');
  var includeCol = filterHeaders.indexOf('INCLUDED');

  this.dept = 'CP';
  this.name = designerRow[nameCol];
  this.email = designerRow[emailCol];
  this.sfName = designerRow[sfNameCol];
  this.master = false;
  if (teamCol === -1) {
    this.team = 'CP';
  } else {
    this.team = designerRow[teamCol];
  }
  this.regions = [designerRow[region1Col], designerRow[region2Col], 'ONE'].filter(function(region) {
    return region != '';
  });
  if (designerRow[region1Col].match(/test/i) || designerRow[region2Col].match(/test/i)) {
    this.regions.splice(-1, 1);
  }

  // Acocunt types
  this.settings = {
    'GSR': designerRow[gsrCol],
    'AURORA': designerRow[auroraCol],
    'SNOW PROP': designerRow[snowPropCol],
    'PART 1': designerRow[part1Col],
    'CP RD': designerRow[cprdCol],
    'OTS GSR': designerRow[otsgsrCol],
    'OTS AURORA': designerRow[otsauroraCol],
    'REJECTED': designerRow[rejectedCol]
  };

  this.filterRegions = {
    'exclude': false,
    'include': false,
    'excludeOffices': [],
    'includeOffices': []
  };
  if (designerRow[excludeCol] !== '') {
    this.filterRegions.excludeOffices = designerRow[excludeCol].replace(/\s/g, '').split(',');
    this.filterRegions.exclude = true;
  }
  if (designerRow[includeCol] !== '') {
    this.filterRegions.includeOffices = designerRow[includeCol].replace(/\s/g, '').split(',');
    this.filterRegions.include = true;
  }
};

/**
 * PP Designer Object
 * @param {*} header
 * @param {*} filterSettings
 */
var designerPP = function(header, filterSettings) {
  var nameCol = header.indexOf('NAME');
  var emailCol = header.indexOf('EMAIL');
  var sfNameCol = header.indexOf('SALESFORCE NAME');
  var teamCol = header.indexOf('TEAM');
  var includeRegionCol = header.indexOf('INCLUDE OWN REGION?');
  var region1Col = header.indexOf('INCLUDE REGION 1');
  var region2Col = header.indexOf('INCLUDE REGION 2');
  var permitCol = header.indexOf('PERMIT');
  var SRCol = header.indexOf('SR');
  var cpMatchCol = header.indexOf('CP MATCH');
  var permitRDCol = header.indexOf('PERMIT RD');
  var deRDCol = header.indexOf('DE RD');
  var outsourceCol = header.indexOf('OUTSOURCE');
  var otsCol = header.indexOf('OTS');
  var excludeCol = header.indexOf('EXCLUDED');
  var includeCol = header.indexOf('INCLUDED');

  this.dept = 'PP';
  this.name = filterSettings[nameCol];
  this.email = filterSettings[emailCol];
  this.sfName = filterSettings[sfNameCol];
  this.master = false;

  if (teamCol > -1) {
    this.team = filterSettings[teamCol];
  } else {
    this.team = 'PP';
  }
  this.regions = ['PERMIT'];

  // Acocunt types
  this.settings = {
    'PERMIT': filterSettings[permitCol],
    'CP MATCH': filterSettings[cpMatchCol],
    'PERMIT RD': filterSettings[permitRDCol],
    'DE RD': filterSettings[deRDCol],
    'OUTSOURCE': filterSettings[outsourceCol],
    'OTS': filterSettings[otsCol],
    'SR': filterSettings[SRCol]
  };

  this.filterRegions = {
    'exclude': false,
    'include': false,
    'excludeOffices': [],
    'includeOffices': []
  };
  if (filterSettings[excludeCol] !== '') {
    this.filterRegions.excludeOffices = filterSettings[excludeCol].replace(/\s/g, '').split(',');
    this.filterRegions.exclude = true;
  }
  if (filterSettings[includeCol] !== '') {
    this.filterRegions.includeOffices = filterSettings[includeCol].replace(/\s/g, '').split(',');
    this.filterRegions.include = true;
  }
};
