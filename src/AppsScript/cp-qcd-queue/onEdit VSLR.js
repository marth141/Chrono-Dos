/**
 * Used on edit
 * @param {*} callerId
 */
function onEdit(callerId) {
  Logger.log(new Date());
  var ss = SpreadsheetApp.getActiveSheet();
  var sheetName = ss.getSheetName();
  var cell = ss.getActiveCell();
  var col = cell.getColumn();
  var ro = cell.getRow();
  var celldata = ss.getActiveCell().getValue();

  if (col == 14 && ro > 3 && celldata !== '' && sheetName == 'Queue') {
    var row = cell.getRow();
    col = 15;

    ss.getRange(row, col).setValue('In Progress');
    reSort(ss);
  } else if (col == 14 && ro > 3 && celldata === '' && sheetName == 'Queue') {
    reSort(ss);
  }
}

/**
 * Used to resort
 * @param {*} ss
 */
function reSort(ss) {
  var service = ss
    .getRange('B6:B')
    .getValues()
    .filter(function(value) {
      return value[0].match(/s-/i);
    });
  var sortRange = ss.getRange('B6:P' + (service.length + 5));
  var whatis = sortRange.getA1Notation();
  sortRange.sort([
    { column: 14, ascending: true },
    { column: 16, ascending: false },
    { column: 13, ascending: false }
  ]);
}
