/**
 * On edit function that updates the last updated.
 * @param {*} e
 */
function onEdit(e) {
  // POPULATES THE APPROPRIATE ACCOUNT INFORMATION
  // WHEN THE SERVICE NUMBER IS CHANGED IN REQUIREMENTS!C2
  if (e.source.getActiveSheet().getName() == 'Report') {
    var ss = SpreadsheetApp.getActiveSheet();
    var r = e.range;
    var column = r.getColumn();
    if (column == 12 || column == 13 || column == 14) {
      var col = 15;
      ss.getRange(r.getRow(), col).setValue(new Date());
      if (column == 12) {
        col = 13;
        ss.getRange(r.getRow(), col).setValue('In Progress');
      }
    }
  }
}
