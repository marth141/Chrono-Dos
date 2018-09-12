/**
 * Used to get the team announcement
 * @param {String} designerTeam
 * @return {String}
 */
function getTeamStats(designerTeam) {
  var stats;

  var analysisPage = SpreadsheetApp.openById(DEPT_CHRONO)
    .getSheetByName('Analysis');

  switch (designerTeam) {
    case 'CA':
      stats = analysisPage
        .getRange('E32')
        .getValue();
      return stats;
    case 'MANY':
      stats = analysisPage
        .getRange('O32')
        .getValue();
      return stats;
    case 'MDCEN':
      stats = analysisPage
        .getRange('E42')
        .getValue();
      return stats;
    case 'Outsource':
      stats = analysisPage
        .getRange('C17')
        .getValue();
      return stats;
  }
}
