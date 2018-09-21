/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @return {Array[]}
 */
function rd_DateCleaner(backlogArray, oldData) {
  var serviceCol = getMeThatColumn('Service: Service Name', backlogArray),
    customerApprovedCol = getMeThatColumn(
      'Proposal Customer Approved',
      backlogArray
    ),
    redesignReqCol = getMeThatColumn('Redesign Requested', backlogArray),
    recordTypeCol = getMeThatColumn('Record Type', backlogArray);

  var backlogWithDatesFiguredOut = rd_FigureOutDates(
    backlogArray,
    oldData,
    serviceCol,
    redesignReqCol,
    customerApprovedCol,
    recordTypeCol
  );

  return backlogWithDatesFiguredOut;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} serviceCol
 * @param {*} redesignReqCol
 * @param {*} customerApprovedCol
 * @param {*} recordTypeCol
 * @return {Array[]}
 */
function rd_FigureOutDates(
  backlogArray,
  oldData,
  serviceCol,
  redesignReqCol,
  customerApprovedCol,
  recordTypeCol
) {
  // * Insert columns after redesignReqCol
  var headers = backlogArray[0];
  var toDelete = 2;
  var insert_backlogDate = 'BACKLOG DATE';
  var insert_dueDate = 'DUE DATE';
  headers.splice(redesignReqCol, toDelete, insert_backlogDate, insert_dueDate);

  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    var serviceNumber = account[serviceCol];
    var backlogDate = new Date(account[redesignReqCol]);
    var dueDate = new Date(account[customerApprovedCol]);

    backlogDate = invalidFix(backlogDate);
    dueDate = invalidFix(dueDate);

    // If record type proposal, set customer approved date as Initial and due date
    if (account[recordTypeCol].match(/proposal/i)) {
      backlogDate = new Date(1970, 1, 1, 0, 0, 0, 0);
    }
    backlogArray = rd_CompareDates(
      backlogArray,
      account,
      oldData,
      serviceNumber,
      backlogDate,
      dueDate,
      row,
      redesignReqCol,
      customerApprovedCol
    );
  }
  return backlogArray;
}

/**
 *
 * @param {Date} dateValue
 * @return {Date}
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
 * @param {*} account
 * @param {*} oldData
 * @param {*} serviceNumber
 * @param {Date} backlogDate
 * @param {Date} dueDate
 * @param {number} row
 * @param {number} redesignReqCol
 * @param {string} customerApprovedCol
 * @return {*}
 */
function rd_CompareDates(
  backlogArray, // TODO: Change all backlogArray[row] to account
  account,
  oldData,
  serviceNumber,
  backlogDate,
  dueDate,
  row,
  redesignReqCol,
  customerApprovedCol
) {
  var addHours = 24;
  var now = new Date();
  if (account[0] === 'S-5884143') {
    var x = 'Hello';
    //debugger;
  }
  if (dueDate <= backlogDate) {
    if (checkHibernated(oldData, serviceNumber, backlogDate)) {
      backlogDate = new Date();
      account[redesignReqCol] = 'CHRONO STAMP';
    }
    // -------------------- If Sat or Sun then due monday --------------------
    if (backlogDate.getDay() === 0) {
      addHours = 24;
      backlogDate = timeAddHours(backlogDate, addHours);
    } else if (backlogDate.getDay() === 6) {
      addHours = 48;
      backlogDate = timeAddHours(backlogDate, addHours);
    } else if (backlogDate.getHours() >= 12) {
      // add 1 day if backlog date is after 3pm
      addHours = 24;
      backlogDate = timeAddHours(backlogDate, addHours);
    }
    // set due date to 6pm
    if (now.getHours() >= 12) {
      account[customerApprovedCol] = new Date(
        backlogDate.setHours(18, 00, 00, 00)
      );
      account[customerApprovedCol] = new Date(account[customerApprovedCol]);
      var checkThis = account;
      //debugger;
    } else if (now.getHours() < 12) {
      account[customerApprovedCol] = new Date().setHours(18, 00, 00, 00);
      account[customerApprovedCol] = new Date(account[customerApprovedCol]);
      checkThis = account;
      //debugger;
    }
    checkThis = account;
    return backlogArray;
  } else if (backlogDate <= dueDate) {
    if (checkHibernated(oldData, serviceNumber, dueDate)) {
      dueDate = new Date();
      account[customerApprovedCol] = 'CHRONO STAMP';
    }
    // ------------------- If Sat or Sun then due monday --------------------
    if (dueDate.getDay() === 0) {
      addHours = 24;
      dueDate = timeAddHours(dueDate, addHours);
    } else if (dueDate.getDay() === 6) {
      addHours = 48;
      dueDate = timeAddHours(dueDate, addHours);
    } else if (dueDate.getHours() >= 12) {
      // add 1 day if backlog date is after 3pm
      addHours = 24;
      dueDate = timeAddHours(dueDate, addHours);
    }
    account[redesignReqCol] = account[customerApprovedCol];
    // set due date to 6pm
    if (now.getHours() >= 12) {
      account[customerApprovedCol] = new Date(dueDate.setHours(18, 00, 00, 00));
      account[customerApprovedCol] = new Date(account[customerApprovedCol]);
      var checkThis2 = account;
      //debugger;
    } else if (now.getHours() < 12) {
      account[customerApprovedCol] = new Date().setHours(18, 00, 00, 00);
      account[customerApprovedCol] = new Date(account[customerApprovedCol]);
      checkThis2 = account;
      //debugger;
    }
    checkThis2 = account;
    return backlogArray;
  } else {
    var errorMessage = 'PERMIT RD DATE ERROR';
    throw errorMessage;
  }
}
