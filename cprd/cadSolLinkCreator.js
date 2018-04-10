/**
 * For debugging dateOperations().
 * 
 * @returns void
 */
function debugCpRdCadName() {
  var masterBacklogs = new master_Backlogs();
  cprd_LinkCreator(masterBacklogs.Collection);
  return;
}

/**
 * Creates the CAD Name Column. Currently it all is created
 * as blank. At a later point, when redesigns are added,
 * the blanks will be replaced with CAD names.
 * 
 * @param {Sheet} propBacklog The backlog sheet to gain information.
 * @returns 
 */
function cprd_LinkCreator(propBacklog) {
  // propBacklog = propBacklog[3]; // For debugging
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // The above might be a good base function for MANY OTHER FUNCTIONS.
  // For note, the below are necessary for the construction of a link.
  // In other sccripts, they are different but necessary things for completing their process.
  var cadLink = getMeThatColumn('Solar CAD ID', backlogArray, dim);
  var cadNumber = getMeThatColumn('CAD Name', backlogArray, dim);
  var solProjLink = getMeThatColumn('Solar Project ID', backlogArray, dim);
  var solProjName = getMeThatColumn('Project Name', backlogArray, dim);
  // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
  var linksBacklog = constructLink(solProjLink, solProjName, backlogArray, dim);
  linksBacklog = constructLink(cadLink, cadNumber, linksBacklog, dim);
  // This could be a function that updates and deletes.
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(linksBacklog);
  propBacklog.deleteColumn(cadLink + 1);
  propBacklog.deleteColumn(solProjLink + 1);
  SpreadsheetApp.flush();
  return;
}

/**
 * This will construct the link and put in the backlog
 * array. This array will be pasted back over the
 * report page.
 * 
 * @param {String} cadLink The ID of the CAD Object for link.
 * @param {String} cadNumber The SP- Name of the Solar Project.
 * @param {Array} backlogArray The backlog array.
 * @param {Array} dim The dimensions of the backlog sheet.
 * @returns The backlog array with new SolProj link.
 */
function constructLink(cadLink, cadNumber, backlogArray, dim) {
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][cadNumber] = '=HYPERLINK("https://vivintsolar.my.salesforce.com/' + backlogArray[row][cadLink] + '", "' + backlogArray[row][cadNumber] + '")';
  }
  return backlogArray;
}
