// Event object matches Apps Script documentation for edit sheet event

/**
 * Used to update the master
 * @param {Object} e
 * @param {GoogleAppsScript.Script.AuthMode} e.authMode
 * @param {*} e.oldValue
 * @param {GoogleAppsScript.Spreadsheet.Range} e.range
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} e.source
 * @param {Number} e.triggerUid
 * @param {String} e.user
 * @param {*} e.value
 */
function onEdit(e) {
  // POPULATES THE APPROPRIATE ACCOUNT INFORMATION WHEN THE SERVICE NUMBER IS CHANGED IN
  // REQUIREMENTS!C2
  var editedSheet = e.source.getActiveSheet();
  var sheetName = editedSheet.getName();
  if (sheetName === 'On Hold' || sheetName === 'Report') {
    var range = e.range;
    var column = range.getColumn();
    var row = range.getRow();
    if (e.value === undefined) {
      e.value = editedSheet.getRange(row, column).getValue();
    }
    if (column >= 15 && column <= 19 && row > 2) {
      var header = editedSheet.getRange('2:2').getValues()[0];
      var servicenNumCol = header.indexOf('SERVICE') + 1;
      var unitTypeCol = header.indexOf('UNIT TYPE') + 1;
      var regionCol = header.indexOf('REGION') + 1;
      var lastUpdateCol = header.indexOf('LAST UPDATE') + 1;
      var serviceNumber = editedSheet.getRange(row, servicenNumCol).getValue();
      var unitType = editedSheet.getRange(row, unitTypeCol).getValue();
      var region = editedSheet.getRange(row, regionCol).getValue();
      if (serviceNumber === '') {
        //        Browser.msgBox("Value sent" +  e.value);
        return;
      }
      var pass = makeEdits(
        serviceNumber,
        servicenNumCol,
        unitType,
        lastUpdateCol,
        column,
        e.value
      );
      if (!pass) {
        return;
      }
      editedSheet.getRange(row, lastUpdateCol).setValue(new Date());
    } else {
      Browser.msgBox("Can't edit those columns");
    }
  }
}

function makeEdits(
  serviceNumber,
  servicenNumCol,
  unitType,
  lastUpdateCol,
  column,
  value
) {
  var foundRow;
  var ssReport = SpreadsheetApp.openById(
    '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
  ).getSheetByName('Report');
  var test = ssReport
    .getRange(3, servicenNumCol, ssReport.getLastRow() - 1, lastUpdateCol)
    .getValues()
    .some(function(row, index) {
      if (row[0] === serviceNumber && row[8] === unitType) {
        foundRow = index + 2;
        return true;
      }
    });

  if (foundRow === undefined) {
    getReport();
    return false;
  }

  ssReport.getRange(foundRow + 1, column).setValue(value);
  ssReport.getRange(foundRow + 1, lastUpdateCol).setValue(new Date());
}

function test() {
  makeEdits('S-5962801', 7, 'OUTSOURCE', 17, 20, 'PRIORITY');
}
