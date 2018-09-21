/**
 * MAIN
 *
 *
 */
function errorQue() {
  var completeBacklog = [];
  var reportSheets = new MasterSheetReference();
  
  for(var sheet in reportSheets) {
    if(reportSheets[sheet].getName() === "Audit Report") { continue; }
    var backlog = getBacklog(reportSheets[sheet]);
    completeBacklog = uni_AddToCompleteBacklog(backlog, completeBacklog);
  }
  setCompleteBacklog(completeBacklog, reportSheets.Report);
  return;
}

/**
 *
 *
 */
function getBacklog(sheet) {

  var dim = getDimensions(sheet);
  var backlogArray = getBacklogArray(sheet, dim);
  backlogArray = uni_LinkCreator(backlogArray);
  backlogArray = uni_MarkErrorType(sheet.getName(), backlogArray);
  backlogArray = uni_CleanUpColumns(backlogArray);
  return backlogArray;
}


/**
 *
 *
 */
var MasterSheetReference = function () {
    this.MissingCadIns = SpreadsheetApp.openById("1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE").getSheetByName('CAD/INS Packet Missing');
    this.MissingPlacard = SpreadsheetApp.openById("1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE").getSheetByName('Placard Missing');
    this.ShadingMismatch = SpreadsheetApp.openById("1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE").getSheetByName('Shading Mismatch');
    this.Report = SpreadsheetApp.openById("1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE").getSheetByName('Audit Report');
};


/**
 *
 *
 */
function uni_MarkErrorType(sheetName, backlogArray) {
  backlogArray[0].push("ERROR");
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row].push(sheetName);
  }
  return backlogArray;
}

/**
 *
 *
 */
function uni_AddToCompleteBacklog(backlogArray, completeBacklog) {

  for(var row = 1; row < backlogArray.length; row++)
    completeBacklog.unshift(backlogArray[row]);
  return completeBacklog;
}

/**
 *
 * 
 * @param {any} completeBacklog
 * @returns 
 */
function setCompleteBacklog(completeBacklog, Report) {
  Report.getRange("B7:G").clearContent();
  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    Report.getRange(7, 2, rowNeeded, colNeeded).setValues(completeBacklog);
    SpreadsheetApp.flush();
  }
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 * @returns 
 */
function uni_LinkCreator(backlogArray) {
  // 
  var solProjLinkCol = getMeThatColumnNoValidate("Project: Solar Project ID", backlogArray);
  if (solProjLinkCol === -1) {
    solProjLinkCol = getMeThatColumn("Solar Project ID", backlogArray);
  }
  var solProjNameCol = getMeThatColumnNoValidate("Project: Project Name", backlogArray);
  if (solProjNameCol === -1) {
    solProjNameCol = getMeThatColumn("Project Name", backlogArray);
  }
  var cadNameCol = getMeThatColumnNoValidate("CAD Name", backlogArray);
  if (cadNameCol === -1) {
    cadNameCol = getMeThatColumn("Project: Primary CAD", backlogArray);
  }
  var cadLinkCol = getMeThatColumnNoValidate("Solar CAD ID", backlogArray);
  if (cadLinkCol === -1) {
    cadLinkCol = getMeThatColumn("Primary CAD: Solar CAD ID", backlogArray);
  }
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  backlogArray = constructLink(solProjLinkCol, solProjNameCol, backlogArray);
  backlogArray = constructLink(cadLinkCol, cadNameCol, backlogArray);

  return backlogArray;
}

/**
* This will construct the link and put in the backlog
* array. This array will be pasted back over the
* report page.
*
* @param {number} linkColumn The ID of the CAD Object for link.
* @param {number} linkTextColumn The SP- Name of the Solar Project.
* @param {array} backlogArray The backlog array.
* @returns The backlog array with new SolProj link.
*/
function constructLink(linkColumn, linkTextColumn, backlogArray) {
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row][linkTextColumn] = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/" + backlogArray[row][linkColumn] + "\",\"" + backlogArray[row][linkTextColumn] + "\")";
  }
  return backlogArray;
}

/**
 *
 *
 * @param {RegExp|String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatColumn(columnName, backlogArray) {
  validateHeader(columnName, backlogArray);
  return backlogArray[0].indexOf(columnName);
}

/**
 *
 *
 * @param {RegExp|String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatColumnNoValidate(columnName, backlogArray) {
  return backlogArray[0].indexOf(columnName);
}

/**
 *
 *
 * @param {string} header
 * @param {array} backlogArray
 * @returns
 */
function validateHeader(searchString, backlogArray) {
  if (backlogArray[0].indexOf(searchString) > -1) {
    return true;
  } else {
    throw "The column \"" + searchString + "\" string could not be found.";
  }
}

/**
 *
 *
 * @param {any} sheet
 * @returns 
 */
function getDimensions(sheet) {
  if (sheet !== null) {
    var dimensions = [];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    dimensions.push(lastRow);
    dimensions.push(lastCol);
    return dimensions;
  } else {
    throw "getDimensions() has a null; backlogSheet: " + sheet;
  }
}


/**
 *
 *
 * @param {any} sheet
 * @param {array} dimensions
 * @returns 
 */
function getBacklogArray(sheet, dimensions) {
  if (sheet !== null) {
    var backlogData = sheet.getRange(1, 1, dimensions[0], dimensions[1]).getValues().filter(function (value) {
      return value[0].match(/^S-[0-9]/i) ||
        value[0].match(/^Service:/i) ||
        value[0].match(/^Project:/i) ||
        value[0].match(/^Opportunity:/i);
    });
    return backlogData;
  } else {
    throw "getBacklogArray() has a null; backlogSheet: " + sheet;
  }
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @returns backlogArray
 */
function uni_CleanUpColumns(backlogArray) {
  
  var solProjLinkCol = getMeThatColumnNoValidate("Project: Solar Project ID", backlogArray);
  if (solProjLinkCol === -1) {
    solProjLinkCol = getMeThatColumn("Solar Project ID", backlogArray);
  }
  var cadLinkCol = getMeThatColumnNoValidate("Solar CAD ID", backlogArray);
  if (cadLinkCol === -1) {
    cadLinkCol = getMeThatColumn("Primary CAD: Solar CAD ID", backlogArray);
  }
  // Put index"s to remove in array and sort to insure order, remove from end (right to left) to not interupt index's
  var removeValFromIndex = [solProjLinkCol, cadLinkCol].sort(function(a,b){ return b - a; });
  
  var cleanBacklogArray = uni_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns backlogArray
 */
function uni_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row = 0; row < backlogArray.length; row++) {
    for (var index = 0; index < removeValFromIndex.length; index++) {
      backlogArray[row].splice(removeValFromIndex[index],1);
    }
  }
  return backlogArray;
}