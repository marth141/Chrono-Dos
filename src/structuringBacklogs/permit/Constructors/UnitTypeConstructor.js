// @flow strict
/**
 *
 * @param {Array[]} backlogArray
 */
function PermitUnitTypeColumns(backlogArray) {
  /** @type Number */
  this.officeCol = getColumnIndex(
    'Service: Regional Operating Center',
    backlogArray
  );
  /** @type Number */
  this.opporTypeCol = getColumnIndex(
    'Opportunity: Type',
    backlogArray
  );
  /** @type Number */
  this.primaryDateCol = getColumnIndex(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  /** @type Number */
  this.srNeededCol = getColumnIndex(
    'Phase: Structural Review Completed',
    backlogArray
  );
}
