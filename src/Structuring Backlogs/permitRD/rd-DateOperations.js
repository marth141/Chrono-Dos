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
  serviceCol = getMeThatColumn('Service: Service Name', backlogArray);
  redesignReqCol = getMeThatColumn('Redesign Requested', backlogArray);
  customerApprovedCol = getMeThatColumn(
    'Proposal Customer Approved',
    backlogArray
  );
  recordTypeCol = getMeThatColumn('Record Type', backlogArray);
  var dateAdjBacklog = rd_RemoveLateDates(
    backlogArray,
    oldData,
    serviceCol,
    redesignReqCol,
    customerApprovedCol,
    recordTypeCol
  );

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
function rd_RemoveLateDates(
  backlogArray,
  oldData,
  serviceCol,
  redesignReqCol,
  customerApprovedCol,
  recordTypeCol
) {
  // Remove column in header
  backlogArray[0].splice(redesignReqCol, 2, 'BACKLOG DATE', 'DUE DATE');
  for (var row = 1; row < backlogArray.length; row++) {
    var serviceNumber = backlogArray[row][serviceCol];
    var redesignReq = new Date(backlogArray[row][redesignReqCol]);
    var customerApproved = new Date(backlogArray[row][customerApprovedCol]);
    redesignReq = invalidFix(redesignReq);
    customerApproved = invalidFix(customerApproved);
    // If record type proposal, set customer approved date as Initial and due date
    if (backlogArray[row][recordTypeCol].match(/proposal/i)) {
      redesignReq = new Date(1970, 1, 1, 0, 0, 0, 0);
    }
    backlogArray = rd_CompareDates(
      backlogArray,
      oldData,
      serviceNumber,
      redesignReq,
      customerApproved,
      row,
      redesignReqCol,
      customerApprovedCol
    );
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
  if (dateValue.toString() === 'Invalid Date') {
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
 * @param {Date} redesignReq
 * @param {Date} customerApproved
 * @param {Date} dateValue3
 * @param {number} row
 * @param {number} opPropCompCol
 * @param {string} stateAbrv
 * @returns
 */
function rd_CompareDates(
  backlogArray,
  oldData,
  serviceNumber,
  redesignReq,
  customerApproved,
  row,
  redesignReqCol,
  customerApprovedCol
) {
  var addHours = 24;
  var now = new Date();
  if (backlogArray[row][0] === "S-5884143") {
      var x = "Hello"
      debugger;
  }
  if (customerApproved <= redesignReq) {
    if (checkHibernated(oldData, serviceNumber, redesignReq)) {
      redesignReq = new Date();
      backlogArray[row][redesignReqCol] = 'CHRONO STAMP';
    }
    // ----------------------------------------------- If Sat or Sun then due monday -----------------------------------------------
    if (redesignReq.getDay() === 0) {
      addHours = 24;
      redesignReq = timeAddHours(redesignReq, addHours);
    } else if (redesignReq.getDay() === 6) {
      addHours = 48;
      redesignReq = timeAddHours(redesignReq, addHours);
    } else if (redesignReq.getHours() >= 12) {
      //add 1 day if backlog date is after 3pm
      addHours = 24;
      redesignReq = timeAddHours(redesignReq, addHours);
    }
    //set due date to 6pm
    if (now.getHours() >= 12) {
      backlogArray[row][customerApprovedCol] = new Date(
        redesignReq.setHours(18, 00, 00, 00)
      );
      backlogArray[row][customerApprovedCol] = new Date(backlogArray[row][customerApprovedCol]);
      var checkThis = backlogArray[row];
      debugger;
    } else if (now.getHours() < 12) {
      backlogArray[row][customerApprovedCol] = new Date().setHours(
        18,
        00,
        00,
        00
      );
      backlogArray[row][customerApprovedCol] = new Date(backlogArray[row][customerApprovedCol]);
      checkThis = backlogArray[row];
      debugger;
    }
    checkThis = backlogArray[row];
    return backlogArray;
  } else if (redesignReq <= customerApproved) {
    if (checkHibernated(oldData, serviceNumber, customerApproved)) {
      customerApproved = new Date();
      backlogArray[row][customerApprovedCol] = 'CHRONO STAMP';
    }
    // ----------------------------------------------- If Sat or Sun then due monday -----------------------------------------------
    if (customerApproved.getDay() === 0) {
      addHours = 24;
      customerApproved = timeAddHours(customerApproved, addHours);
    } else if (customerApproved.getDay() === 6) {
      addHours = 48;
      customerApproved = timeAddHours(customerApproved, addHours);
    } else if (customerApproved.getHours() >= 12) {
      //add 1 day if backlog date is after 3pm
      addHours = 24;
      customerApproved = timeAddHours(customerApproved, addHours);
    }
    backlogArray[row][redesignReqCol] = backlogArray[row][customerApprovedCol];
    //set due date to 6pm
    if (now.getHours() >= 12) {
      backlogArray[row][customerApprovedCol] = new Date(
        customerApproved.setHours(18, 00, 00, 00)
      );
      backlogArray[row][customerApprovedCol] = new Date(backlogArray[row][customerApprovedCol]);
      var checkThis2 = backlogArray[row];
      debugger;
    } else if (now.getHours() < 12) {
      backlogArray[row][customerApprovedCol] = new Date().setHours(
        18,
        00,
        00,
        00
      );
      backlogArray[row][customerApprovedCol] = new Date(backlogArray[row][customerApprovedCol]);
      checkThis2 = backlogArray[row];
      debugger;
    }    
    checkThis2 = backlogArray[row];
    return backlogArray;
  } else throw 'PERMIT RD DATE ERROR';
}
