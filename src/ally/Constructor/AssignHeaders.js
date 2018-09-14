/**
 * Set's up a header object for assignments
 * @param {Array[]} header
 * @param {Number} dueInColOffset
 */
function HeaderCollection(header, dueInColOffset) {
  this.dueInCol = header.indexOf('DUE IN: (hh:mm)'); // => header
  this.dueStatusCol = header.indexOf('DUE STATUS') - dueInColOffset; // => header
  this.officeCol = header.indexOf('OFFICE') - dueInColOffset; // => header
  this.backlogDateCol = header.indexOf('BACKLOG DATE') - dueInColOffset; // => header
  this.dueDateCol = header.indexOf('DUE DATE') - dueInColOffset; // => header
  this.regionCol = header.indexOf('REGION') - dueInColOffset; // => header
  this.utilityCol = header.indexOf('UTILITY COMPANY') - dueInColOffset; // => header
  this.unitTypeCol = header.indexOf('UNIT TYPE') - dueInColOffset; // => header
  this.priorityCol = header.indexOf('PRIORITY') - dueInColOffset; // => header
  this.serviceCol = header.indexOf('SERVICE') - dueInColOffset; // => header
  this.spCol = header.indexOf('SOLAR PROJECT') - dueInColOffset; // => header
  this.assignedCol = header.indexOf('ASSIGNED') - dueInColOffset; // => header
  this.notesCol = header.indexOf('NOTES') - dueInColOffset; // => header
  this.statusCol = header.indexOf('STATUS') - dueInColOffset; // => header
  this.lastUpdateCol = header.indexOf('LAST UPDATE') - dueInColOffset; // => header
  this.redesignCol = header.indexOf('REDESIGN ASSIGNMENT') - dueInColOffset; // => header
  this.percentCol = header.indexOf('PERCENT') - dueInColOffset; // => header
}
