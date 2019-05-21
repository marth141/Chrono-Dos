/**
 * Main function
 * @param {*} ss
 */
function main(ss) {
  ss = SpreadsheetApp.openById('1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo');
  var QSheet = ss.getSheetByName('Queue');
  var reportInputSheet = ss.getSheetByName('Report Input');

  var newbies = [],
    oldies = [];

  // COPY QUEUE TO THE DUMMY TAB
  ss.getRange('Dummy Page!A6:N').clearContent();
  // COPY ALL QUEUE CONTENTS BEFORE RUNNING IN ORDER TO REMEMBER THE ASSIGNED AND STATUS INFO
  var oldValues = ss
    .getRange('Queue!B6:O')
    .getValues()
    .filter(function(value) {
      return value[0].indexOf('S-') > -1;
    });
  if (oldValues.length > 1) {
    ss.getSheetByName('Dummy Page')
      .getRange(5, 1, oldValues.length, oldValues[0].length)
      .setValues(oldValues);
  }
  // *********************************
  var oldValues = oldValues.filter(function(value) {
    return value[12] != '' || value[13] != '';
  });
  var listNewbies = ss
    .getRange('Controls!B6:B')
    .getValues()
    .filter(function(value) {
      return value[0] != '';
    });

  // COPY REPORT INPUT
  var inputData = ss
    .getRange('Report Input!A:P')
    .getValues()
    .filter(function(value) {
      if (value[0].indexOf('S-') > -1) {
        var concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[1] +
          '","' +
          value[0] +
          '")';
        value.splice(0, 2, concat);

        var concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[2] +
          '","' +
          value[1] +
          '")';
        value.splice(1, 2, concat);

        var concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[3] +
          '","' +
          value[2] +
          '")';
        value.splice(2, 2, concat);

        var concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[4] +
          '","' +
          value[3] +
          '")';
        value.splice(3, 2, concat);

        // This removes the dash and Solar on NIS accounts
        value[5] = value[5].replace(' - Solar', '');
        // This removes Solar from Office
        value[5] = value[5].replace(' Solar', '');
        // This removes Solar from the ROC
        value[6] = value[6].replace(' Solar', '');

        if (value[10] === 'Ratan Singh (9500079)') {
          value[9] = 'DIM I';
        }

        oldies.push(value);

        return true;
      }
    });
  // **********************************

  QSheet.getRange('B6:O').clearContent();

  var row = oldies.length;

  if (row > 0) {
    var col = oldies[0].length;
    QSheet.getRange(6, 2, row, col).setValues(oldies);
  }

  var list = QSheet.getRange('B5:G')
    .getValues()
    .filter(function(value) {
      return value[0].indexOf('S-') > -1;
    });
  var queueInfo = list.map(function(value) {
    var sNum = value[0];
    var cadObject = value[3];
    var index = oldValues.filter(function(x) {
      return x[0] == sNum && x[3] == cadObject;
    });
    if (index.length > 0) return [index[0][12], index[0][13]];
    else return ['', ''];
  });

  if (queueInfo.length > 0) {
    QSheet.getRange(6, 14, queueInfo.length, queueInfo[0].length).setValues(
      queueInfo
    );
  }
  SpreadsheetApp.flush();
  addSalesLayout();
  Utilities.sleep(1000);
  // Add Sales Layout CREATE FUNCTION
  reSort(QSheet);

  // THE CODE BELOW TIME STAMPS WHEN THE Report WAS LAST PULLED
  var timeZone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(new Date(), timeZone, 'MM/dd/yy hh:mm a');
  QSheet.getRange('B2').setValue(date);
  // Erases the "Report Being Run" text
  QSheet.getRange('H2').setValue('');
  // debugger;
}

/**
 * Used to arrange the queue by calling main.
 */
function arrangeQueue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  main(ss);
}
