/**
* Checks that there is a date under the header
* specified.
*
* @param {String} header to be verified for existance.
* @param {Array} backlogArray where the header will be.
* @param {Array} dim of the Google Sheet. -1 for Array.
* @returns True - If instance of date; False - If not instance of date.
*/
function validateHeader(header, backlogArray, dim) {
  for (var col = 0; col <= dim[1] - 1; col++) {
    if (backlogArray[0][col].match(header)) {
      return true;
    } else if (col === dim[1] - 1) {
      throw 'The column \'' + header + '\' string could not be found.';
    }
  }
}
