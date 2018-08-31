/* globals

*/

/* exported
onEdit
*/

function onEdit(e) { //POPULATES THE APPROPRIATE ACCOUNT INFORMATION WHEN THE SERVICE NUMBER IS CHANGED IN REQUIREMENTS!C2
  if (e.source.getActiveSheet().getName() == "Report")
  {
    var ss = e.source.getActiveSheet();
    var r = e.range;
    var column = r.getColumn();
    var row = r.getRow();
    if((column == 16 || column == 17 || column == 18 || column == 19) && row > 2 && ss.getName() === "Report")
    {
      column = 20;
      ss.getRange(row, column).setValue(new Date());
    }
  }
}