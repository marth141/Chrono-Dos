/**
 * Used to alert if updater is late.
 */
function alertEmailer() {
  var cellB2Time = SpreadsheetApp.openById('1J8CCOMP5XOkusS9NI73wvOBa4D_ZEC0MJq2pEoZL9Fs')
    .getSheetByName('Queue')
    .getRange('B2')
    .getValue().getTime();
  var currentTime = new Date().getTime();
  var timeDifference = (currentTime - cellB2Time) / 1000;
  timeDifference /= 60;
  timeDifference = Math.round(timeDifference);
  if (timeDifference > 60) {
    MailApp.sendEmail(
      'nathan.casados@vivintsolar.com',
      'Chrono is late updating',
      'Chrono was late to update @ PP QCQ, please check it.'
    );
  }
}
