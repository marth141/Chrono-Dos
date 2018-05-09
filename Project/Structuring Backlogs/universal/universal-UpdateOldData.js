/* exported
addLastColumns
debugAddLastColumns
debugUpdateOldData
uni_UpdateOldData
*/

/* global
ServiceMasterBacklog
getMeThatColumnNoValidate
getMeThatColumn
*/
function debugUpdateOldData() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 1;
  uni_addLastColumns(masterBacklogs.Collection[overRide]);
  return;
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @returns backlogArray
 */
function uni_UpdateOldData(backlogArray, oldData) {
  
  var serviceCol = getMeThatColumnNoValidate("Opportunity: Service: Service Name", backlogArray);
  if(serviceCol === -1) {
    serviceCol = getMeThatColumnNoValidate("Service: Service Name", backlogArray);
    if(serviceCol === -1)
      serviceCol = getMeThatColumn("Project: Service", backlogArray);
  }
  var assignCol = getMeThatColumnNoValidate("Phase: CAD Design Completed By", backlogArray);
  if(assignCol === -1) {
    assignCol = getMeThatColumnNoValidate("CAD Design Completed By: Vivint Employee Name", backlogArray);
    if(assignCol === -1)
      assignCol = getMeThatColumn("Redesign Completed By: Vivint Employee Name", backlogArray);
  }
  var unitTypeCol = getMeThatColumn("Unit Type", backlogArray);
  var statusCol = getMeThatColumn("STATUS", backlogArray);
  var priorityCol = getMeThatColumn("PRIORITY", backlogArray);
  var notesCol = getMeThatColumn("NOTES", backlogArray);
  var lastUpdateCol = getMeThatColumn("LAST UPDATE", backlogArray);
  
  var updatedBacklog = replaceOldInfo(backlogArray, oldData, serviceCol, unitTypeCol, assignCol, statusCol, priorityCol, notesCol, lastUpdateCol);
  return updatedBacklog;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} oldData
 * @returns backlogArray
 */
function replaceOldInfo(backlogArray, oldData, serviceCol, unitTypeCol, assignCol, statusCol, priorityCol, notesCol, lastUpdateCol) {
  // Remove all index"s in removeValFromIndex from each row
  for (var oldRow in oldData) {
    for (var newRow in backlogArray) {
      if (!checkServiceNumbers(oldData[oldRow][serviceCol], backlogArray[newRow][serviceCol])) //Check service numbers are the same, if not continue
        continue;
      if(checkUnitType(oldData[oldRow][unitTypeCol], backlogArray[newRow][unitTypeCol])) //Check unit type
        backlogArray[newRow][unitTypeCol] = oldData[oldRow][unitTypeCol];
      // If the Unit types don"t match continue  
      if(oldData[oldRow][unitTypeCol] != backlogArray[newRow][unitTypeCol])
        continue;
        
      backlogArray[newRow][notesCol] = oldData[oldRow][notesCol];  // Get old notes and place them when the service numbers match
      backlogArray[newRow][lastUpdateCol] = oldData[oldRow][lastUpdateCol];  // Get old Last update and update to new sheet
      if (checkAssigned(oldData[oldRow][assignCol], backlogArray[newRow][assignCol])) // Check If there was an old assignment 
        backlogArray[newRow][assignCol] = oldData[oldRow][assignCol];   // Replace with the old assignment
      if (checkStatus(oldData[oldRow][statusCol], backlogArray[newRow][statusCol]))
        backlogArray[newRow][statusCol] = oldData[oldRow][statusCol];  // Get old Status and update
      if (checkStatus(oldData[oldRow][priorityCol], backlogArray[newRow][priorityCol]))
        backlogArray[newRow][priorityCol] = oldData[oldRow][priorityCol];  // Get old Priority status and update
    }
  }
  return backlogArray;
}

/**
 *
 * 
 * @param {any} oldServiceNumber
 * @param {number} currentServiceNumber
 * @returns {boolean} service numbers match
 */
function checkServiceNumbers(oldServiceNumber, currentServiceNumber) {
  return oldServiceNumber === currentServiceNumber;
}

/**
 *
 * 
 * @param {any} oldServiceNumber
 * @param {number} currentServiceNumber
 * @returns {boolean} service numbers match
 */
function checkUnitType(oldUnitType, currentUnitType) {

  if(oldUnitType === "REJECTED")
    return true;
  
  var check1 = currentUnitType.match(/GSR/i);
  var check2 = oldUnitType.match(/GSR/i);
  var check3 = currentUnitType.match(/AURORA/i);
  var check4 = oldUnitType.match(/AURORA/i);
  return (oldUnitType !== currentUnitType && 
    oldUnitType !== "" && 
    ((check1 && check2) || 
    (check3 && check4)) );
}

/**
 *
 * 
 * @param {any} oldServiceNumber
 * @param {number} currentServiceNumber
 * @returns {boolean} service numbers match
 */
function checkAssigned(oldAssigned, currentAssigned) {
  return oldAssigned !== "" && currentAssigned === "";
}

/**
 *
 * 
 * @param {any} oldServiceNumber
 * @param {number} currentServiceNumber
 * @returns {boolean} service numbers match
 */
function checkStatus(oldStatus, currentStatus) {
  return oldStatus !== currentStatus && oldStatus !== "";
}