/* exported
debugCPRDDateCleaner
cprd_RemoveDoubleDate
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getMeThatColumn
timeAddHours
*/

function debugRDDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  masterBacklogs = masterBacklogs.Collection;
  rd_DateCleaner(masterBacklogs[3]);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 * @returns
 */
function rd_DateCleaner(backlogArray, oldData) {

  var serviceCol, customerApprovedCol, redesignReqCol, recordTypeCol;
  serviceCol = getMeThatColumnNoValidate("Service: Service Name", backlogArray);
  redesignReqCol = getMeThatColumnNoValidate("Redesign Requested", backlogArray);
  customerApprovedCol = getMeThatColumnNoValidate("Proposal Customer Approved", backlogArray);
  recordTypeCol = getMeThatColumnNoValidate("Record Type", backlogArray);
  var dateAdjBacklog = rd_RemoveLateDates(backlogArray, oldData, serviceCol, redesignReqCol, customerApprovedCol, recordTypeCol);
  
  return dateAdjBacklog;
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @param {array} dim
 * @param {number} opPropCompCol
 * @param {number} initPropCompCol
 * @param {number} redesReqCol
 * @param {number} stateOfficeCol
 * @returns 
 */
function rd_RemoveLateDates(backlogArray, oldData, serviceCol, redesignReqCol, customerApprovedCol, recordTypeCol) {
  // Remove column in header
  backlogArray[0].splice(redesignReqCol, 2, "BACKLOG DATE", "DUE DATE");
  for (var row = 1; row < backlogArray.length; row++) {
    var serviceNumber = backlogArray[row][serviceCol];
    var dateValue1 = new Date(backlogArray[row][redesignReqCol]);
    var dateValue2 = new Date(backlogArray[row][customerApprovedCol]);
    dateValue1 = invalidFix(dateValue1);
    dateValue2 = invalidFix(dateValue2);
    // If record type proposal, set customer approved date as Initial and due date
    if(backlogArray[row][recordTypeCol].match(/proposal/i)) {
      dateValue1 = new Date(1970, 1, 1, 0, 0, 0, 0);
    }
    backlogArray = rd_CompareDates(backlogArray, oldData, serviceNumber, dateValue1, dateValue2, row, redesignReqCol, customerApprovedCol);
  }
  return backlogArray;
}

/**
 *
 * 
 * @param {Date} dateValue
 * @returns 
 */
function invalidFix(dateValue) {
  if (dateValue.toString() === "Invalid Date") {
    dateValue = new Date(1970, 1, 1, 0, 0, 0, 0);
    return dateValue;
  } else {
    return dateValue;
  }
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {Date} dateValue3
 * @param {number} row
 * @param {number} opPropCompCol
 * @param {string} stateAbrv
 * @returns 
 */
function rd_CompareDates(backlogArray, oldData, serviceNumber, dateValue1, dateValue2, row, redesignReqCol, customerApprovedCol) {
  var addHours = 24;
  if (dateValue2 <= dateValue1) {
    if(checkHibernated(oldData, serviceNumber, dateValue1)) {
      dateValue1 = new Date();
      backlogArray[row][redesignReqCol] = "CHRONO STAMP";
    }
    if(dateValue1.getDay() === 5) {
      addHours = 72;
      dateValue1 = timeAddHours(dateValue1, addHours);
    }
    else if(dateValue1.getDay() === 6) {
      addHours = 48;
      dateValue1 = timeAddHours(dateValue1, addHours);
    }
    else if(dateValue1.getHours() >= 15) {
      //add 1 day if backlog date is after 3pm
      addHours = 24;
      dateValue1 = timeAddHours(dateValue1, addHours);
    }
    //set due date to 6pm
    backlogArray[row][customerApprovedCol] = new Date(dateValue1.setHours(18, 00, 00, 00));
    
    return backlogArray;
  } else if (dateValue1 <= dateValue2) {
    if(checkHibernated(oldData, serviceNumber, dateValue2)) {
      dateValue2 = new Date();
      backlogArray[row][customerApprovedCol] = "CHRONO STAMP";
    }
    if(dateValue2.getDay() === 5) {
      addHours = 72;
      dateValue2 = timeAddHours(dateValue2, addHours);
    }
    else if(dateValue2.getDay() === 6) {
      addHours = 48;
      dateValue2 = timeAddHours(dateValue2, addHours);
    }
    else if(dateValue2.getHours() >= 15) {
      //add 1 day if backlog date is after 3pm
      addHours = 24;
      dateValue2 = timeAddHours(dateValue2, addHours);
    }
    backlogArray[row][redesignReqCol] = backlogArray[row][customerApprovedCol];
    //set due date to 6pm
    backlogArray[row][customerApprovedCol] = new Date(dateValue2.setHours(18, 00, 00, 00));
    return backlogArray;
  }
  else
    throw "PERMIT RD DATE ERROR"

}


