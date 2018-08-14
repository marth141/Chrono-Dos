// @flow strict
/**
 *
 * @param {Array[]} backlogArray
 */
function PermitUnitTypeColumns(backlogArray) {
  /** @type Number */
  this.officeCol = getMeThatColumnNoValidate(
    'Service: Regional Operating Center',
    backlogArray
  );
  /** @type Number */
  this.opporTypeCol = getMeThatColumnNoValidate(
    'Opportunity: Type',
    backlogArray
  );
  /** @type Number */
  this.primaryDateCol = getMeThatColumnNoValidate(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  /** @type Number */
  this.srNeededCol = getMeThatColumnNoValidate(
    'Phase: Structural Review Completed',
    backlogArray
  );
}
