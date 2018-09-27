/**
 * find account in chrono and update status
 * @param {*} acccuntInfo
 * @return {*}
 */
function statusUpdate(acccuntInfo) {
  console.log('Update Account Status Info: ' + JSON.stringify(acccuntInfo));

  var keyId,
    running = false;
  var region = acccuntInfo.region;
  var serviceNumber = acccuntInfo.serviceNumber;
  var designer = acccuntInfo.designer;
  var notes = acccuntInfo.notes;
  var unitType = acccuntInfo.unitType;
  var status = acccuntInfo.status;

  if (region.toUpperCase() === 'PERMIT' || region.toUpperCase() === 'TEST PP') var dept = 'PP';
  else var dept = 'CP';
  keyId = getChronoId(region, dept)[1]; // returns array => ["region", "keyId"]
  var ss = SpreadsheetApp.openById(keyId);
  var chrono_report = ss.getSheetByName('Report');
  var dummy_page = ss.getSheetByName('Dummy Page');

  //  If the report is running place in que to wait finished update
  // Running Report
  var reportRunning = chrono_report.getRange('H1').getValue();
  if (reportRunning != '') {
    //  If the report is running place in que to wait finished update
    var data = dummy_page
      .getRange('AA:AD')
      .getValues()
      .filter(function(value) {
        return value[0] != '';
      });
    // Add row with service number, status, notes
    data.push([serviceNumber, status, notes, new Date()]);
    dummy_page.getRange('AA:AD').clearContent();
    if (data.length > 0) dummy_page.getRange(1, 27, data.length, data[0].length).setValues(data);
    SpreadsheetApp.flush();
    running = true;
    console.log('Report Runing Update Status: ' + JSON.stringify(acccuntInfo));
  } else {
    var header = chrono_report.getRange('2:2').getValues(),
      serviceCol = header[0].indexOf('SERVICE'),
      assignedCol = header[0].indexOf('ASSIGNED'),
      unitTypeCol = header[0].indexOf('UNIT TYPE'),
      statusCol = header[0].indexOf('STATUS'),
      notesCol = header[0].indexOf('NOTES'),
      lastUpdateCol = header[0].indexOf('LAST UPDATE'),
      initialDateCol = header[0].indexOf('INITIAL DATE'),
      row;
    var data = chrono_report
      .getRange(3, serviceCol + 1, chrono_report.getLastRow(), 1)
      .getValues()
      .some(function(value, index) {
        // Column of "Service Numbers"
        if (serviceNumber === value[0]) {
          row = index + 3;
          return true;
        }
      });
    // If service number not found return false
    if (!data) {
      console.log('Service Number Not Found Update Status: ' + acccuntInfo);
      return { 'value': false, 'type': status, 'running': running };
    }

    // If just updating notes
    if (status == 'notes') {
      // Set notes
      chrono_report.getRange(row, notesCol + 1).setValue(notes);
      // set the upadted time to now
      chrono_report.getRange(row, lastUpdateCol + 1).setValue(new Date());
      SpreadsheetApp.flush();
      console.log('Update Notes Success: ' + JSON.stringify(acccuntInfo));
      return { 'value': true, 'type': status, 'running': running };
    }
    // Set all values to found row
    // Set the status
    chrono_report.getRange(row, statusCol + 1).setValue(status);
    // set the upadted time to now
    chrono_report.getRange(row, lastUpdateCol + 1).setValue(new Date());
    if (status == 'Unassign') {
      // If new status unassign remove name from assigend column
      // Set assigned name to blank
      chrono_report.getRange(row, assignedCol + 1).setValue('');
      // Reset status with name of unassigned by
      chrono_report.getRange(row, statusCol + 1).setValue(status + ': ' + designer);
      // set the initial date to blank
      chrono_report.getRange(row, initialDateCol + 1).setValue('');
    } else if (status == 'Reject') {
      // Set assigned name to blank
      chrono_report.getRange(row, assignedCol + 1).setValue('');
      // Reset status with name of unassigned by
      chrono_report.getRange(row, statusCol + 1).setValue(status + ': ' + designer);
      // set the initial date to blank
      chrono_report.getRange(row, initialDateCol + 1).setValue('');
      if (dept === 'PP') {
        // Unit Type to "PERMIT"
        chrono_report.getRange(row, unitTypeCol + 1).setValue('PERMIT');
      } else {
        // Unit Type to "GSR" or "AURORA"
        chrono_report.getRange(row, unitTypeCol + 1).setValue('REJECTED');
      }
    }

    SpreadsheetApp.flush();
  }

  console.log('Return Update Account Status: ' + JSON.stringify(acccuntInfo));
  return { 'value': true, 'type': status, 'running': running };
}
