// @flow
/**
 * Used to create CAD and Solar Project Links in a backlog
 * @param {Array[]} backlog
 * @param {ReportPageColumns|RedesignColumns|PermitColumns} backlogColumns
 */
function BacklogWithLinks() {
  /**
   * @param {Array[]} redesignBacklog
   * @param {RedesignColumns} redesignColumns
   * @return {Array[]}
   */
  this.redesignCADLinks = function(redesignBacklog, redesignColumns) {
    redesignBacklog = constructLink(
      redesignColumns.cadID,
      redesignColumns.cadName,
      redesignBacklog
    );
    redesignBacklog = constructLink(
      redesignColumns.solProjID,
      redesignColumns.solProjName,
      redesignBacklog
    );
    return redesignBacklog;
  };
  /**
   * @param {Array[]} permitBacklog
   * @param {PermitColumns} permitColumns
   * @return {Array[]}
   */
  this.permitSolLinks = function(permitBacklog, permitColumns) {
    permitBacklog = constructLink(
      permitColumns.solProjID,
      permitColumns.solProjName,
      permitBacklog
    );
    return permitBacklog;
  };
}
