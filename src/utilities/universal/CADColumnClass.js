// @flow
/**
 * Adds the CAD Name Column to backlog
 * @constructor
 * @param {Array[]} backlogArray
 * @param {PermitColumns|RedesignColumns} backlogColumns
 * @return {Array[]}
 */
function BacklogWithCADColumn(backlogArray, backlogColumns) {
  // Create Header for CAD OBJECT column. Always after SP Column
  var cadColumn = new CADNameColumn(backlogArray, backlogColumns);
  // Add CAD Object Field
  cadColumn.headers.splice(
    cadColumn.solarProjectCol,
    cadColumn.columnsToRemove,
    cadColumn.headerToAdd
  );
  // Fill in default CAD data
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    account.splice(
      cadColumn.solarProjectCol,
      cadColumn.columnsToRemove,
      cadColumn.headerToAdd_Data
    );
  }
  return backlogArray;
}

/**
 * Creates the properties of a CAD Name Column
 * @constructor
 * @param {Array[]} backlogArray
 * @param {PermitColumns|RedesignColumns} backlogColumns
 */
function CADNameColumn(backlogArray, backlogColumns) {
  this.headers = backlogArray[0];
  this.solarProjectCol = backlogColumns.solProjID;
  this.columnsToRemove = 0;
  this.headerToAdd = 'CAD OBJECT';
  this.headerToAdd_Data = '-';
}
