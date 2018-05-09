/* exported
debugSnowDateCleaner
*/

/* global
ServiceMasterBacklog
getMeThatColumn
timeAddHours
*/

function debugSnowDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  snow_DateCleaner(masterBacklogs.Collection);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 */
function snow_DateCleaner(backlogArray) {

  var assignmentDate = getMeThatColumn("Assignment Finish", backlogArray);
  var customerDate = getMeThatColumn("Opportunity: Customer Preferences Form", backlogArray);
  var dateAdjBacklog = snow_RemoveLateDates(backlogArray, assignmentDate, customerDate);
  
  return dateAdjBacklog;
}

/**
 *
 * 
 * @param {any} backlogArray
 * @param {number} assignmentDateCol
 * @returns
 */
function snow_RemoveLateDates(backlogArray, assignmentDateCol, customerDate) {

  for (var row = 1; row < backlogArray.length; row++) {
    var dateValue1 = new Date(backlogArray[row][assignmentDateCol]);
    var dateValue2 = new Date(backlogArray[row][customerDate]);
    if (dateValue1 > dateValue2)
      backlogArray[row][customerDate] = timeAddHours(dateValue1, 24);
    else
      backlogArray[row][customerDate] = timeAddHours(dateValue2, 24);
  }
  return backlogArray;
}

