/**
 * Used to get backlog
 */
var BacklogSnagger = function() {
  this.toBlankFilteredArray = function(inputSheet) {
    return inputSheet
      .getRange(1, 1, inputSheet.getLastRow(), inputSheet.getLastColumn())
      .getValues()
      .filter(function(slicedRange) {
        return slicedRange[0] !== '';
      });
  };
  this.toUnfilteredArray = function(inputSheet) {
    return inputSheet
      .getRange(1, 1, inputSheet.getLastRow(), inputSheet.getLastColumn())
      .getValues();
  };
  this.activeSheetToBacklog = function(slice1, slice2) {
    return SpreadsheetApp.getActiveSheet()
      .getRange('A:Z')
      .getValues()
      .slice(slice1 + 1)
      .filter(function(slicedRange) {
        return slicedRange[0] !== '';
      })
      .slice(0, slice2);
  };
};
