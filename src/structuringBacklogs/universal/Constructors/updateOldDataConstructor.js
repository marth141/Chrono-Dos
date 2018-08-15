/**
 *
 * @param {Array[]} backlogArray
 */
function UpdateDataColumns(backlogArray) {
  this.serviceCol = function() {
    var permitServiceColNames = {
      permit: 'Project: Service',
      redesign: 'Service: Service Name'
    };
    for (var category in permitServiceColNames) {
      var index = getMeThatColumnNoValidate(category, backlogArray);
      if (index > -1) {
        return index;
      }
    }
  };
  this.assignCol = function() {
    var permitAssignColNames = {
      permit: 'Phase: PV Design Completed By',
      redesign: 'Redesign Completed By: Vivint Employee Name'
    };
    for (var category in permitAssignColNames) {
      var index = getMeThatColumnNoValidate(category, backlogArray);
      if (index > -1) {
        return index;
      }
    }
  };
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
  this.serviceNumber = backlog[serviceCol];
  /** @type String */
  this.assigned = backlog[assignCol];
  /** @type String | Date */
  this.backlogDate = backlog[backlogDateCol];
  /** @type Date */
  this.dueDate = backlog[dueDateCol];
  /** @type String */
  this.unitType = backlog[unitTypeCol];
  /** @type String */
  this.status = backlog[statusCol];
  /** @type String */
  this.priority = backlog[priorityCol];
  /** @type String */
  this.notes = backlog[notesCol];
  /** @type Date */
  this.lastUpdate = backlog[lastUpdateCol];
  /** @type Date */
  this.initialUpdate = backlog[initialUpdateCol];
}
