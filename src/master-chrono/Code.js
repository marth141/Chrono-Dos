/**
 * Used for the update button
 */
function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  var alertTitle = 'Alert';

  var alertMessage = 'Updating Master.';
  toastThis(alertMessage, alertTitle, 60);
  backlogProcessJunction(masterBacklogs, undefined);

  alertMessage = 'Updating views.';
  toastThis(alertMessage, alertTitle, 60);
  updateViews();

  alertMessage = 'Done updating.';
  toastThis(alertMessage, alertTitle, null);
  return;
}

/**
 * Used to update the backlog from external script calls.
 * @param {*} backlogName
 */
function callMain(backlogName) {
  var lock = LockService.getDocumentLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    var errorMsg_Lock =
      'Could not acquire lock. Someone else is updating the backlog, please wait.';
    throw errorMsg_Lock;
  }
  if (lock.hasLock()) {
    if (backlogName.match(/DOS/i)) {
      var ss = SpreadsheetApp.openById(
        '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
      );
    } else {
      var errorMsg_NoScript = 'Wrong script for this report type';
      throw errorMsg_NoScript;
    }
    var masterBacklogs = new ServiceMasterBacklog(ss);
    var alertTitle = 'Auto-Updater';

    var alertMessage = 'Updating Master.';
    toastThis(alertMessage, alertTitle, null);
    backlogProcessJunction(masterBacklogs, undefined);

    alertMessage = 'Updating Views.';
    toastThis(alertMessage, alertTitle, null);
    updateViews();

    alertMessage = 'Done Updating.';
    toastThis(alertMessage, alertTitle, null);
  } else {
    var errorMsg_LockLost =
      'The lock was somehow lost. Someone else is updating the backlog, please wait.';
    throw errorMsg_LockLost;
  }
  return;
}

/**
 * Used to update the view Chronos
 */
function updateViews() {
  permitoutsourceviewscript.getReport();
  permitmanyviewscript.getReport();
  permitmdcenviewscript.getReport();
  permitcaviewscript.getReport();
}

/**
 * Used to display toaster messages
 * @param {String} alertMessage
 * @param {String} title
 * @param {Number} lifespan
 */
function toastThis(alertMessage, title, lifespan) {
  SpreadsheetApp.openById('121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0').toast(
    alertMessage,
    title,
    lifespan
  );
}
