/**
 *
 * @param {*} backlogSheetArray
 */
function NotesCache(backlogSheetArray) {
  var headers = getHeader(backlogSheetArray.Report);
  var oldData = uni_GetOldData(backlogSheetArray.Report);
  var serviceCol = getMeThatColumnNoValidate('SERVICE', headers);
  var assignedCol = getMeThatColumn('ASSIGNED', header) - serviceCol;
  var statusCol = getMeThatColumn('STATUS', header) - serviceCol;
  var notesCol = getMeThatColumn('NOTES', header) - serviceCol;
}
