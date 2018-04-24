/* exported
validateHeader
*/

/* global
*/

/**
* used to validate headers if the data below is
* something to be validated. Can be expanded.
* 
* @param {String} header A column head to be found in the backlog.
* @param {Array} backlogArray The backlog data to be searched through.
* @param {Array} dim The dimensions of the backlog sheet, not the array.
* @returns True - Header has valid data; False - Header is corrupted.
*/
function validateHeader(header, backlogArray, dim) {
  if (validateDates(header, backlogArray, dim)) {
    return true;
  } else {
    throw 'validateHeader cannot find: ' + header;
  }
}

/**
* Checks that there is a date under the header
* specified.
* 
* @param {String} searchString 
* @param {Array} backlogArray 
* @param {Array} dim 
* @returns True - If instance of date; False - If not instance of date.
*/
function validateDates(searchString, backlogArray, dim) {
  for (var col = 0; col <= dim[1] - 1; col++) {
    if (backlogArray[0][col].match(searchString)) {
      if (backlogArray[1][col] instanceof Date) {
        return true;
      } else {
        throw 'The backlog has a date column but no date in first row. Is it corrupted?';
      }
    } else if (col === dim[1] - 1) {
      throw 'The column \'' + searchString + '\' string could not be found.';
    }
  }
}
