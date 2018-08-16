// @flow
/**
 *
 * @param {Array[]} backlog
 * @param {ReportPageColumns|RedesignColumns|PermitColumns} backlogColumns
 */
function LinkCreator() {
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

/**
 * Creates hyperlink sheets forumla
 * @param {GoogleAppsScript.Spreadsheet.Sheet} propBacklog
 * @return {Array[]}
 */
function uni_LinkCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  if (propBacklog.getName().match(/PERMIT RD/i)) {
    var cadName = getMeThatColumnNoValidate('CAD Name', backlogArray);
    var cadLink = getMeThatColumnNoValidate('Solar CAD ID', backlogArray);
    backlogArray = constructLink(cadLink, cadName, backlogArray, dim);
  }
  /**
   * The above might be a good base function for MANY OTHER FUNCTIONS.
   * For note, the below are necessary for the construction of a link.
   * In other sccripts, they are different but necessary things for completing their process.
   */
  var solProjLink = getMeThatColumnNoValidate(
    'Project: Solar Project ID',
    backlogArray
  );
  if (solProjLink === -1) {
    solProjLink = getMeThatColumnNoValidate('Solar Project ID', backlogArray);
  }
  var solProjName = getMeThatColumnNoValidate(
    'Project: Project Name',
    backlogArray
  );
  if (solProjName === -1) {
    solProjName = getMeThatColumnNoValidate('Project Name', backlogArray);
  }
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  backlogArray = constructLink(solProjLink, solProjName, backlogArray, dim);
  return backlogArray;
}
