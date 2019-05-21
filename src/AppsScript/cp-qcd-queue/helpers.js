/**
 * Adds Sales Layouts
 */
function addSalesLayout() {
  var spreadsheetID = '1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo';

  var queueSheetName = 'Queue';
  var queueHeadersRange = 'B5:O5';
  var queueBodyRange = 'B6:O';

  var SalesLayoutSheetName = 'Sales Layouts Completed';
  var SalesLayoutRawRange = 'A:J';

  // GET QUEUE HEADERS
  var queueHeaders = SpreadsheetApp.openById(spreadsheetID)
    .getSheetByName(queueSheetName)
    .getRange(queueHeadersRange)
    .getValues();
  // GET QUEUE BODY
  var queueBody = SpreadsheetApp.openById(spreadsheetID)
    .getSheetByName(queueSheetName)
    .getRange(queueBodyRange)
    .getValues()
    .filter(function(row) {
      return row[0] !== '';
    });
  // FIND SALES LAYOUT HEADERS
  var salesLayoutRaw = SpreadsheetApp.openById(spreadsheetID)
    .getSheetByName(SalesLayoutSheetName)
    .getRange(SalesLayoutRawRange)
    .getValues();
  // GET SALES LAYOUT BODY
  var salesLayoutHeaders = salesLayoutRaw.filter(function(row) {
    var headers = [
      'Opportunity: Service: Service Name',
      'Project: Project Name',
      'Project: Opportunity',
      'Opportunity: Proposal CAD Type',
      'Service: Regional Operating Center',
      'Opportunity: Office: Office Name',
      'Project: Utility',
      'Project: Contract Type',
      'Sales Layout Completed By: Vivint Employee Name',
      'Sales Layout Completed',
    ];
    var foundHeaders = row.toString() === headers.toString();
    //debugger;

    if (foundHeaders) {
      return row;
    }
  });

  // ISOLATE SALES LAYOUT TABLE
  var isolatedSalesLayoutBody = salesLayoutRaw.filter(function(row) {
    var foundServiceNumbers = row[0].indexOf('S-') > -1;
    if (foundServiceNumbers) {
      return row;
    }
  });

  var salesLayoutHeadersIndexes = {
    serviceName: salesLayoutHeaders[0].indexOf('Opportunity: Service: Service Name'),
    projectName: salesLayoutHeaders[0].indexOf('Project: Project Name'),
    opportunityNumber: salesLayoutHeaders[0].indexOf('Project: Opportunity'),
    salesLayoutType: salesLayoutHeaders[0].indexOf('Opportunity: Proposal CAD Type'),
    ROC: salesLayoutHeaders[0].indexOf('Service: Regional Operating Center'),
    opportunityOffice: salesLayoutHeaders[0].indexOf('Opportunity: Office: Office Name'),
    utility: salesLayoutHeaders[0].indexOf('Project: Utility'),
    contractType: salesLayoutHeaders[0].indexOf('Project: Contract Type'),
    layoutCompletedBy: salesLayoutHeaders[0].indexOf('Sales Layout Completed By: Vivint Employee Name'),
    layoutCompletedDate: salesLayoutHeaders[0].indexOf('Sales Layout Completed')
  };
  // MERGE DATA WITH QUEUE
  var mockBody = [];
  for (var i = 0; i < isolatedSalesLayoutBody.length; i++) {
    queueBody.push([
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.serviceName],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.projectName],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.opportunityNumber],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.salesLayoutType],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.ROC].substring(0, 2),
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.ROC],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.opportunityOffice],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.utility],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.contractType],
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.layoutCompletedBy],
      '',
      isolatedSalesLayoutBody[i][salesLayoutHeadersIndexes.layoutCompletedDate],
      '',
      ''
    ]);
  }
  // debugger;
  // PASTE BACK TO QUEUE
  SpreadsheetApp
    .openById(spreadsheetID)
    .getSheetByName(queueSheetName)
    .getRange(6, 2, queueBody.length, queueBody[0].length)
    .setValues(queueBody);
  SpreadsheetApp.flush();
}
