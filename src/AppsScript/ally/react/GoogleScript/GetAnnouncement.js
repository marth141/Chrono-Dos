/**
 * Used to get the team announcement
 * @param {String} designerTeam
 * @return {String}
 */
function getTeamAnnouncement(designerTeam) {
  var teamKeys = new TeamKeychain();

  switch (designerTeam) {
    case 'CA':
      var teamChrono = teamKeys.CATeam;
      var message = SpreadsheetApp.openById(teamChrono)
        .getSheetByName('Announcements')
        .getRange('A:A')
        .getValues()
        .filter(function(value) {
          var message = value[0];
          return message !== '';
        });
      return message;
    case 'MANY':
      var teamChrono = teamKeys.MANYTeam;
      var message = SpreadsheetApp.openById(teamChrono)
        .getSheetByName('Announcements')
        .getRange('A:A')
        .getValues()
        .filter(function(value) {
          var message = value[0];
          return message !== '';
        });
      return message;
    case 'MDCEN':
      var teamChrono = teamKeys.MDCENTeam;
      var message = SpreadsheetApp.openById(teamChrono)
        .getSheetByName('Announcements')
        .getRange('A:A')
        .getValues()
        .filter(function(value) {
          var message = value[0];
          return message !== '';
        });
      return message;
    case 'OUTSOURCE':
      var teamChrono = teamKeys.OTSTeam;
      var message = SpreadsheetApp.openById(teamChrono)
        .getSheetByName('Announcements')
        .getRange('A:A')
        .getValues()
        .filter(function(value) {
          var message = value[0];
          return message !== '';
        });
      return message;
  }
}
