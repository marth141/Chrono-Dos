/* exported
debugCPRDCadName
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
constructLink
*/

function debugCPRDCadName() {
  var masterBacklogs = new ServiceMasterBacklog();
  cprd_LinkCreator(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns
 */
function cprd_LinkCreator(propBacklog) {
  // propBacklog = propBacklog[3]; // For debugging
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // The above might be a good base function for MANY OTHER FUNCTIONS.
  // For note, the below are necessary for the construction of a link.
  // In other sccripts, they are different but necessary things for completing their process.
  var cadLink = getMeThatColumn('Solar CAD ID', backlogArray);
  var cadNumber = getMeThatColumn('CAD Name', backlogArray);
  var solProjLinkCol = getMeThatColumn('Solar Project ID', backlogArray);
  var solProjNameCol = getMeThatColumn('Project Name', backlogArray);
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  var linksBacklog = constructLink(solProjLinkCol, solProjNameCol, backlogArray, dim);
  linksBacklog = constructLink(cadLink, cadNumber, linksBacklog, dim);
  // This could be a function that updates and deletes.
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(linksBacklog);
  propBacklog.deleteColumn(cadLink + 1);
  propBacklog.deleteColumn(solProjLinkCol + 1);
  SpreadsheetApp.flush();
  return;
}
