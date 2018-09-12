/**
 * Used to get the designer's email
 * @return {String}
 */
function getEmail() {
  return Session.getActiveUser().getEmail();
}

/**
 * Used to get the designer's team
 * @param {String} email
 * @return {String}
 */
function findTeam(email) {
  email = 'nathan.casados@vivintsolar.com';
  // Gets for normal designers
  var emailGrab = SpreadsheetApp.openById(MASTER_CHRONO)
    .getSheetByName('Filter Settings')
    .getRange('C3:C')
    .getValues();
  var teamGrab = SpreadsheetApp.openById(MASTER_CHRONO)
    .getSheetByName('Filter Settings')
    .getRange('O3:O')
    .getValues();

  // Gets for outsource designers
  var otsEmailGrab = SpreadsheetApp.openById(OUTSOURCE_CHRONO)
    .getSheetByName('Filter Settings')
    .getRange('C3:C')
    .getValues();
  var otsTeamGrab = SpreadsheetApp.openById(OUTSOURCE_CHRONO)
    .getSheetByName('Filter Settings')
    .getRange('F3:F')
    .getValues();

  // Looks through normal designers for their team.
  for (var row = 0; row < emailGrab.length; row++) {
    var emailToMatch = emailGrab[row][0];
    if (email === emailToMatch) {
      var team = teamGrab[row][0];
      return team;
    } else if (row === emailGrab.length - 1) {
      break;
    }
  }

  // Looks through outsource designers for their team.
  for (var row = 0; row < otsEmailGrab.length; row++) {
    var emailToMatch = otsEmailGrab[row][0];
    if (email === emailToMatch) {
      var team = otsTeamGrab[row][0];
      return team;
    } else if (row === otsEmailGrab.length - 1) {
      break;
    }
  }
}

/**
 * Used to get the team sheets
 */
function TeamKeychain() {
  // PROD: 1g-m4NxFSu8lAIl1W1tSaeKQVwtHHqBU4TPLxFTgjNhM
  // DEV : 1DXShTxRauwrQtaw76b09u8FKCNzPHs0f8B_zQRzitlY
  this.CATeam = '1g-m4NxFSu8lAIl1W1tSaeKQVwtHHqBU4TPLxFTgjNhM';
  // PROD: 1VkWXcyuIcAt-QPl9EjlrGHmPM1pfCH_KelO9lkYFgA8
  // DEV : 1hUWZ2WQtjzwtO-JXLXTXa4Gm6mGY2H0zeTTJi6xfeyE
  this.MANYTeam = '1VkWXcyuIcAt-QPl9EjlrGHmPM1pfCH_KelO9lkYFgA8';
  // PROD: 1bX6a2OrPSuzd6_jy-73lGwWOqAXTCEmKk8GBgB0kMM4
  // DEV : 1_giNe6-rt4oF8hE3a0PEEglUC7cV_CN7RwNlhKR_0WA
  this.MDCENTeam = '1bX6a2OrPSuzd6_jy-73lGwWOqAXTCEmKk8GBgB0kMM4';
  // PROD: 1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE
  // DEV : 10gmeyQD0xPx_MJRyL57NPY860jTMPHeY6IuprMlH7ho
  this.OTSTeam = '1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE';
}
