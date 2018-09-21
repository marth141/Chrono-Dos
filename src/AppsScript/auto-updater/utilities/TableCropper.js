/* globals

*/

/* exported
reportTableCropper
*/

function reportTableCropper(backlogArray) {
  for (var row = 0; row < backlogArray.length; row++) {
    if (backlogArray[row][0].match(/Filtered By:/i)) {
      return backlogArray = backlogArray.slice(row + 1, backlogArray.length - 3);
    } else {
      continue;
    }
  }
  throw "Where is filtered by?";
}