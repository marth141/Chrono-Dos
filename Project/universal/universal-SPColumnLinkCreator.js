/* exported
debugUniSolProj
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
*/

function debugUniSolProj() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_SolProjLinkCreator(masterBacklogs.Collection);
  return;
}

function uni_SolProjLinkCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // The above might be a good base function for MANY OTHER FUNCTIONS.
  // For note, the below are necessary for the construction of a link.
  // In other sccripts, they are different but necessary things for completing their process.
  var solProjLink = getMeThatColumn('Solar Project ID', backlogArray, dim);
  var solProjName = getMeThatColumn('Project Name', backlogArray, dim);
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  var linksBacklog = constructLink(solProjLink, solProjName, backlogArray, dim);
  // This could be a function that updates and deletes.
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(linksBacklog);
  propBacklog.deleteColumn(solProjLink + 1);
  SpreadsheetApp.flush();
  return;
}
