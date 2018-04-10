/**
* For debugging solProjCreator().
* 
* @returns void
*/
function debugSolProj() {
  var masterBacklogs = new master_Backlogs();
  solProjLinkCreator(masterBacklogs.Collection);
  return;
}

/**
* This one will get the variables for the Solar
* project link creator. This allows the Solar Project
* entries to be vivintsolar links.
* 
* @param {Sheet} propBacklog 
* @returns 
*/
function solProjLinkCreator(propBacklog) {
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

/**
* This will construct the link and put in the backlog
* array. This array will be pasted back over the
* report page.
* 
* @param {String} solProjLink The ID of the CAD Object for link.
* @param {String} solProjName The SP- Name of the Solar Project.
* @param {Array} backlogArray The backlog array.
* @param {Array} dim The dimensions of the backlog sheet.
* @returns The backlog array with new SolProj link.
*/
function constructLink(solProjLink, solProjName, backlogArray, dim) {
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][solProjName] = '=HYPERLINK("https://vivintsolar.my.salesforce.com/' + backlogArray[row][solProjLink] + '", "' + backlogArray[row][solProjName] + '")';
  }
  return backlogArray;
}
