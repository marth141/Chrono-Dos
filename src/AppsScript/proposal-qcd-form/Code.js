/**
 * The main function
 */
function cpQCD_onFormSubmit() {
  var ss = SpreadsheetApp.getActive().getSheetByName('Form Responses 1');
  var flag = ss.getLastRow();

  if (flag > 2000) {
    ss.deleteRows(2, 1000);
    flag = ss.getLastRow();
  }
  var rangeToSearch = flag + ':' + flag;
  var searchData = ss.getRange(rangeToSearch).getValues();

  var search = ss.getRange('1:1').getValues();

  var emailLoc = search[0].indexOf('Email Address');
  var sNumLoc = search[0].indexOf('What\'s the service number?');
  var designerLoc = search[0].indexOf('Who is the designer?');

  var email = searchData[0][emailLoc];
  var sNum = searchData[0][sNumLoc];
  var designer = searchData[0][designerLoc];

  var errors = {};
  var notes = [];

  for (var i = sNumLoc + 1; i < search[0].length; i++) {
    if (searchData[0][i] != '' && search[0][i].toLowerCase().indexOf('error') > -1) {
      notes.push(searchData[0][i]);
    } else if (
      searchData[0][i] === '' &&
      search[0][i].toLowerCase().indexOf('error') > -1 &&
      errors.length > notes.length
    ) {
      notes.push('');
    } else if (
      searchData[0][i] != '' &&
      search[0][i].toLowerCase().indexOf('who is the designer') == -1
    ) {
      errors[search[0][i]] = searchData[0][i];
    }
  }

  // If no errors then don't send email
  if (Object.keys(errors).length <= 0) {
    return;
  }
  var ssEmp = SpreadsheetApp.openById(
    '1PXK8X9gSPU76Q1wqGIanljxcVe7i6Fso2SXKn4UR1nQ'
  ).getSheetByName('CP');
  var ids = ssEmp
    .getRange('A2:C')
    .getValues()
    .filter(function(element) {
      return element[0] != '';
    });

  var emailAddress = getEmail(designer, ids);
  email += ', ' + emailAddress[0] + ', ' + emailAddress[1];

  var subject = 'QCD Review Summary for ' + sNum;

  var body =
    'Here are the description notes for ' +
    sNum +
    '<br>Description Notes:<br>Design Completed By: ' +
    designer +
    '<br><br>';
  body += '<ul style=\'list-style-type:circle\'>';
  var k = 0;
  for (var key in errors) {
    body += '<dl><dt>' + key + '</dt><dd>' + errors[key] + '</dd>';
    body += '<dd>- ' + notes[k] + '</dd></dl>';
    k++;
  }
  body +=
    '</ul>Please fill out this <a href=\'https://docs.google.com/forms/d/e/1FAIpQLSfMPKb5q9OIVZCpZpKJFcc5znCjiFG6R2TXSiHHco1vaK2nPg/viewform?usp=pp_url&entry.979780390=' +
    sNum +
    '&entry.268153607=Yes&entry.841170452\'>Error Acknowledgement form</a> to acknowledge the error(s)<br><br>';
  debugger;
  sendEmail(email, subject, body);

  return;
}

/**
 * Used to send emails
 * @param {*} email
 * @param {*} subject
 * @param {*} body
 */
function sendEmail(email, subject, body) {
  MailApp.sendEmail({
    'to': email,
    'cc': 'qcdesign1@vivintsolar.com',
    'subject': subject,
    'htmlBody': body,
    'noReply': true
  });
}

/**
 * Used to get email addresses
 * @param {*} value
 * @param {*} ids
 * @return {*}
 */
function getEmail(value, ids) {
  var l = ids.length;
  var emails;
  var regExp = /\(([^)]+)\)/;
  if (value == '') return ['', ''];

  try {
    if (typeof value == 'string') value = regExp.exec(value)[1];
  } catch (err) {
    return ['', ''];
  }
  var match = parseInt(value);

  var index = binarySearch(ids, match);
  if (index == -1) emails = ['', ''];
  else emails = [ids[index][1], ids[index][2]];

  return emails;
}

/**
 * Does a search on things
 * @param {*} items
 * @param {*} value
 * @return {*}
 */
function binarySearch(items, value) {
  var startIndex = 0,
    check,
    middle,
    stopIndex = items.length - 1;

  while (startIndex <= stopIndex) {
    middle = Math.floor(startIndex + (stopIndex - startIndex) / 2);
    check = items[middle][0];
    if (items[middle][0] == value) return middle;

    // adjust search area
    if (items[middle][0] < value) {
      startIndex = middle + 1;
    } else {
      stopIndex = middle - 1;
    }
  }

  return -1;
}
