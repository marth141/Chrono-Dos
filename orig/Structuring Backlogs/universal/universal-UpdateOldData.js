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
function uni_UpdateOldData(FilterSettings, backlogArray, oldData) {
  var serviceCol = getMeThatColumnNoValidate("Project: Service", backlogArray);
  if (serviceCol === -1) {
    serviceCol = getMeThatColumnNoValidate("Service: Service Name", backlogArray);
  }
  var assignCol = getMeThatColumnNoValidate("Phase: PV Design Completed By", backlogArray);
  if (assignCol === -1) {
    assignCol = getMeThatColumnNoValidate("Redesign Completed By: Vivint Employee Name", backlogArray);
  }
  var backlogDateCol = getMeThatColumn("BACKLOG DATE", backlogArray);
  var dueDateCol = getMeThatColumn("DUE DATE", backlogArray);
  var unitTypeCol = getMeThatColumn("UNIT TYPE", backlogArray);
  var statusCol = getMeThatColumn("STATUS", backlogArray);
  var priorityCol = getMeThatColumn("PRIORITY", backlogArray);
  var notesCol = getMeThatColumn("NOTES", backlogArray);
  var lastUpdateCol = getMeThatColumn("LAST UPDATE", backlogArray);
  var initialUpdateCol = getMeThatColumn("INITIAL DATE", backlogArray);

  var updatedBacklog = replaceOldInfo(FilterSettings, backlogArray, oldData, serviceCol, backlogDateCol, dueDateCol, unitTypeCol, assignCol, statusCol, priorityCol, notesCol, lastUpdateCol, initialUpdateCol);
  return updatedBacklog;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} oldData
 * @returns backlogArray
 */
function replaceOldInfo(FilterSettings, backlogArray, oldData, serviceCol, backlogDateCol, dueDateCol, unitTypeCol, assignCol, statusCol, priorityCol, notesCol, lastUpdateCol, initialUpdateCol) {
  var checkServiceNumber = "S-5954011";
  // Remove all index"s in removeValFromIndex from each row
  for (var oldRow = 0; oldRow < oldData.length; oldRow++) {
    for (var newRow = 0; newRow < backlogArray.length; newRow++) {
      if (!checkServiceNumbers(oldData[oldRow][serviceCol], backlogArray[newRow][serviceCol])) { //Check service numbers are the same, if not continue
        continue;
      }
      var thisOldRow = oldData[oldRow];
      var thisNewRow = backlogArray[newRow];
      
      // DEBUGGER
      if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
        console.error('Here it is @ update start!');
        console.log(backlogArray[newRow]);
        console.log(backlogArray[oldRow]);
      }
      // DEBUGGER
      
      if (checkUnitType(oldData[oldRow][unitTypeCol], backlogArray[newRow][unitTypeCol])) { //Check unit type
        if(backlogArray[newRow][unitTypeCol] === "SR") {
          oldData[oldRow][unitTypeCol] = "SR";
          // DEBUGGER
          if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
            console.error('Here it is @ update Check Unit Type SR!');
            console.log(backlogArray[newRow]);
            console.log(backlogArray[oldRow]);
          }
          // DEBUGGER
        }
        // DEBUGGER
        if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
          console.error('Here it is @ update Check Unit Type post SR!');
          console.log(backlogArray[newRow]);
          console.log(backlogArray[oldRow]);
        }
        // DEBUGGER
        backlogArray[newRow][unitTypeCol] = oldData[oldRow][unitTypeCol];
        // DEBUGGER
        if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
          console.error('Here it is @ update Check Unit Type post SR After assignment!');
          console.log(backlogArray[newRow]);
          console.log(backlogArray[oldRow]);
        }
        // DEBUGGER
      }
      // If the Unit types don"t match continue
      if (oldData[oldRow][unitTypeCol] !== "" && oldData[oldRow][unitTypeCol] !== backlogArray[newRow][unitTypeCol]) {
        continue;
      }
      backlogArray[newRow][backlogDateCol] = oldData[oldRow][backlogDateCol];  // Get old backlog date
      backlogArray[newRow][dueDateCol] = oldData[oldRow][dueDateCol];  // Get old due date
      backlogArray[newRow][notesCol] = oldData[oldRow][notesCol];  // Get old notes and place them when the service numbers match
      backlogArray[newRow][lastUpdateCol] = oldData[oldRow][lastUpdateCol];  // Get old Last update and update to new sheet
      backlogArray[newRow][initialUpdateCol] = oldData[oldRow][initialUpdateCol];  // Get old initial update and update to new sheet
      if(checkSRAssigned(backlogArray[newRow][unitTypeCol], backlogArray[newRow][assignCol], FilterSettings)) {        
        if(checkSRAssigned(backlogArray[newRow][unitTypeCol], oldData[oldRow][assignCol], FilterSettings)) {
      
          // DEBUGGER
          if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
            console.error('Here it is @ SR in Update!');
            console.log(backlogArray[newRow]);
            console.log(backlogArray[oldRow]);
          }
          // DEBUGGER
          
          backlogArray[newRow][assignCol] = "";
          backlogArray[newRow][statusCol] = "";
          backlogArray[newRow][initialUpdateCol] = "";
          oldData[oldRow][statusCol] = "";
          oldData[oldRow][initialUpdateCol] = "";
        }
        else {
          // DEBUGGER
          if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
            console.error('Here it is @ SR Else in update!');
            console.log(backlogArray[newRow]);
            console.log(backlogArray[oldRow]);
          }
          // DEBUGGER
          backlogArray[newRow][assignCol] = oldData[oldRow][assignCol];
        }
          
      }
      else if (checkAssigned(oldData[oldRow][assignCol], backlogArray[newRow][assignCol])) // Check If there was an old assignment
        backlogArray[newRow][assignCol] = oldData[oldRow][assignCol];   // Replace with the old assignment
      if (checkStatus(oldData[oldRow][statusCol], backlogArray[newRow][statusCol]))
        backlogArray[newRow][statusCol] = oldData[oldRow][statusCol];  // Get old Status and update
      if (checkStatus(oldData[oldRow][priorityCol], backlogArray[newRow][priorityCol]))
        backlogArray[newRow][priorityCol] = oldData[oldRow][priorityCol];  // Get old Priority status and update
      
      // DEBUGGER
      if(checkServiceNumber === backlogArray[newRow][serviceCol]) {
        console.error('Here it is @ update end!');
        console.log(backlogArray[newRow]);
        console.log(backlogArray[oldRow]);
      }
      // DEBUGGER
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

  if (currentUnitType === "SR" && oldUnitType !== "PERMIT RD" && oldUnitType !== "DE RD") {
    return true;
  }
    
  var check1 = ["PERMIT RD", "DE RD", "CP MATCH", "SR"].some(function (value) { return currentUnitType.indexOf(value) > -1 });
  var check2 = ["PERMIT RD", "DE RD", "CP MATCH", "SR"].some(function (value) { return oldUnitType.indexOf(value) > -1 });
  return (oldUnitType !== currentUnitType &&
    oldUnitType !== "" &&
    !(check1 || check2));
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
function checkSRAssigned(unitType, assigned, FilterSettings) {
  
  if(unitType === "SR") {
    var foundUser = getUsers(FilterSettings).some(function(user) { return user[0] === assigned || user[2] === assigned });
    if(!foundUser) {
      return true;
    }
  }
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