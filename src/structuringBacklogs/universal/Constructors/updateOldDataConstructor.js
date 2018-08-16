/**
 *
 * @param {Array[]} backlogArray
 */
function UpdateDataColumns(backlogArray) {
  var permitServiceCol = getMeThatColumnNoValidate(
    'Project: Service',
    backlogArray
  );
  var redesignServiceCol = getMeThatColumnNoValidate(
    'Service: Service Name',
    backlogArray
  );
  if (permitServiceCol > -1) {
    var serviceColResult = permitServiceCol;
  } else if (redesignServiceCol > -1) {
    serviceColResult = redesignServiceCol;
  }
  var permitAssignCol = getMeThatColumnNoValidate(
    'Phase: PV Design Completed By',
    backlogArray
  );
  var redesignAssignCol = getMeThatColumnNoValidate(
    'Redesign Completed By: Vivint Employee Name',
    backlogArray
  );
  if (permitAssignCol > -1) {
    var assignColResult = permitAssignCol;
  } else if (redesignAssignCol > -1) {
    assignColResult = redesignAssignCol;
  }
  this.serviceCol = serviceColResult;
  this.assignCol = assignColResult;
  this.backlogDateCol = getMeThatColumnNoValidate('BACKLOG DATE', backlogArray);
  this.dueDateCol = getMeThatColumnNoValidate('DUE DATE', backlogArray);
  this.unitTypeCol = getMeThatColumnNoValidate('UNIT TYPE', backlogArray);
  this.statusCol = getMeThatColumnNoValidate('STATUS', backlogArray);
  this.priorityCol = getMeThatColumnNoValidate('PRIORITY', backlogArray);
  this.notesCol = getMeThatColumnNoValidate('NOTES', backlogArray);
  this.lastUpdateCol = getMeThatColumnNoValidate('LAST UPDATE', backlogArray);
  this.initialUpdateCol = getMeThatColumnNoValidate(
    'INITIAL DATE',
    backlogArray
  );
}

/**
 *
 * @param {Array[]} backlog
 * @param {Number} loopIndex
 * @param {UpdateDataColumns} columns
 */
function AccountRecord(backlog, loopIndex, columns) {
  var serviceCol = columns.serviceCol,
    assignCol = columns.assignCol,
    backlogDateCol = columns.backlogDateCol,
    dueDateCol = columns.dueDateCol,
    unitTypeCol = columns.unitTypeCol,
    statusCol = columns.statusCol,
    priorityCol = columns.priorityCol,
    notesCol = columns.notesCol,
    lastUpdateCol = columns.lastUpdateCol,
    initialUpdateCol = columns.initialUpdateCol;
  /** @type String */
  this.serviceNumber = backlog[loopIndex][serviceCol];
  /** @type String */
  this.assigned = backlog[loopIndex][assignCol];
  /** @type String | Date */
  this.backlogDate = backlog[loopIndex][backlogDateCol];
  /** @type Date */
  this.dueDate = backlog[loopIndex][dueDateCol];
  /** @type String */
  this.unitType = backlog[loopIndex][unitTypeCol];
  /** @type String */
  this.status = backlog[loopIndex][statusCol];
  /** @type String */
  this.priority = backlog[loopIndex][priorityCol];
  /** @type String */
  this.notes = backlog[loopIndex][notesCol];
  /** @type Date */
  this.lastUpdate = backlog[loopIndex][lastUpdateCol];
  /** @type Date */
  this.initialUpdate = backlog[loopIndex][initialUpdateCol];
  debugger;
}
