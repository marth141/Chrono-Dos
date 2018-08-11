/**
 * Uni_LinkCreator
 * @param {Sheet} salesforceSheet
 * @return {Array} salesforceArray
 */
function uni_LinkCreator(salesforceSheet) {
  var dim = getDimensions(salesforceSheet);
  var salesforceSheetName = salesforceSheet.getName();
  var salesforceArray = getBacklogArray(salesforceSheet, dim);

  if (salesforceSheetName.match(/PERMIT RD/i)) {
    var rdCADName;
    var rdCADLink;

    [rdCADName, rdCADLink] = [
      getMeThatColumnNoValidate('CAD Name', salesforceArray),
      getMeThatColumnNoValidate('Solar CAD ID', salesforceArray)
    ];

    salesforceArray = constructLink(rdCADLink, rdCADName, salesforceArray);
  } else if (salesforceSheetName.match(/PERMIT/i)) {
    var perSolProjLink;
    var perSolProjName;

    [perSolProjLink, perSolProjName] = [
      getMeThatColumnNoValidate('Project: Solar Project ID', salesforceArray),
      getMeThatColumnNoValidate('Project: Project Name', salesforceArray)
    ];

    if (perSolProjLink === -1) {
      solProjLink = getMeThatColumnNoValidate(
        'Solar Project ID',
        salesforceArray
      );
    }

    if (perSolProjName === -1) {
      solProjName = getMeThatColumn('Project Name', salesforceArray);
    }

    salesforceArray = constructLink(
      perSolProjLink,
      perSolProjName,
      salesforceArray
    );
  }
  return salesforceArray;
}

/**
 * This will construct the link and put in the backlog
 * array. This array will be pasted back over the
 * report page.
 *
 * @param {number} linkColumn The ID of the CAD Object for link.
 * @param {number} linkTextColumn The SP- Name of the Solar Project.
 * @param {array} backlogArray The backlog array.
 * @return {Array} backlogArray The backlog array with new SolProj link.
 */
function constructLink(linkColumn, linkTextColumn, backlogArray) {
  for (var row = 1; row < backlogArray.length; row++) {
    var linkFormulaStart;
    var linkEnd;
    var linkDisplayEnd;

    [linkFormulaStart, linkEnd, linkDisplayEnd] = [
      '=HYPERLINK("https://vivintsolar.my.salesforce.com/',
      backlogArray[row][linkColumn] + '","',
      backlogArray[row][linkTextColumn] + '")'
    ];

    backlogArray[row][linkTextColumn] =
      linkFormulaStart + linkEnd + linkDisplayEnd;
  }
  return backlogArray;
}
