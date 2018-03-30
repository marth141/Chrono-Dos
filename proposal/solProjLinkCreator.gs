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

function solProjLinkCreator(masterBacklogs) {
  masterBacklogs = new master_Backlogs(); // Debug starter.
  masterBacklogs = masterBacklogs.Collection; // Debug starter.
  for (var backlog in masterBacklogs) {
    if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
      var propBacklog = masterBacklogs[backlog];
      var dim = getDimensions(propBacklog);
      var backlogArray = getBacklogArray(propBacklog, dim);
      // The above might be a good base function for MANY OTHER FUNCTIONS.
      // For note, the below are necessary for the construction of a link.
      // In other sccripts, they are different but necessary things for completing their process.
      var solProjLink = getMeThatColumn('Project: Solar Project ID', backlogArray, dim);
      var solProjName = getMeThatColumn('Project: Project Name', backlogArray, dim);
      // Now we get to the actual doing of the thing. ZHU LI, DO THE THING!
      var linksBacklog = constructLink(solProjLink, solProjName, backlogArray, dim);
      // This could be a function that updates and deletes.
      propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(linksBacklog);
      propBacklog.deleteColumn(solProjLink + 1);
      SpreadsheetApp.flush();
      return;
    } else if (masterBacklogs[backlog] === null) {
      throw 'The backlog was null in solProjLinkCreator()';
    } else {
      console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
      continue;
    }
  }
}

function constructLink(solProjLink, solProjName, backlogArray, dim) {
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][solProjName] = '=HYPERLINK("https://vivintsolar.my.salesforce.com/' + backlogArray[row][solProjLink] + '", "' + backlogArray[row][solProjName] + '")';
  }
  return backlogArray;
}