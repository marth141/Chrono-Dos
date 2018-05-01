/* exported
getStagingArray
getUpdateArray
getUpdateSheet
*/

/* global
SpreadsheetApp
getBacklogArray
getDimensions
*/

function getStagingArray(stagingBacklog) {
  var stagingDim = getDimensions(stagingBacklog);
  var stagingArray = getBacklogArray(stagingBacklog, stagingDim);
  return stagingArray;
}

function getUpdateSheet(stagingBacklog) {
  var updateName = stagingBacklog.getName().replace('staging_', '');
  var updateBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(updateName);
  return updateBacklog;
}

function getUpdateArray(stagingBacklog) {
  var updateName = stagingBacklog.getName().replace('staging_', '');
  var updateBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(updateName);
  var updateDim = getDimensions(updateBacklog);
  var backlogArray = getBacklogArray(updateBacklog, updateDim);
  return backlogArray;
}
