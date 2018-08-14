/* exported
debugUniSolProj
*/

/* global
getMeThatColumnNoValidate
ServiceMasterBacklog
constructLink
getBacklogArray
getDimensions
getMeThatColumn
*/

function debugUniSolProj() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_LinkCreator(masterBacklogs.Collection);
  return;
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} propBacklog
 * @return {Array[]}
 */
function uni_LinkCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  if (propBacklog.getName().match(/PERMIT RD/i)) {
    var cadName = getMeThatColumn('CAD Name', backlogArray);
    var cadLink = getMeThatColumn('Solar CAD ID', backlogArray);
    backlogArray = constructLink(cadLink, cadName, backlogArray, dim);
  }
  // The above might be a good base function for MANY OTHER FUNCTIONS.
  // For note, the below are necessary for the construction of a link.
  // In other sccripts, they are different but necessary things for completing their process.
  var solProjLink = getMeThatColumnNoValidate(
    'Project: Solar Project ID',
    backlogArray
  );
  if (solProjLink === -1) {
    solProjLink = getMeThatColumn('Solar Project ID', backlogArray);
  }
  var solProjName = getMeThatColumnNoValidate(
    'Project: Project Name',
    backlogArray
  );
  if (solProjName === -1) {
    solProjName = getMeThatColumn('Project Name', backlogArray);
  }
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  backlogArray = constructLink(solProjLink, solProjName, backlogArray, dim);
  return backlogArray;
}
