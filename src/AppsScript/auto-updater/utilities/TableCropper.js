/**
 * Used to crop a backlog out from a salesforce paste
 * @param {*} backlogArray
 * @return {*}
 */
function reportTableCropper(backlogArray) {
  for (var row = 0; row < backlogArray.length; row++) {
    if (backlogArray[row][0].match(/Filtered By:/i)) {
      return (backlogArray = backlogArray.slice(row + 1, backlogArray.length - 3));
    } else {
      continue;
    }
  }
  var reportCropErr = 'Where is filtered by?';
  throw reportCropErr;
}
