/* exported serviceMasterBacklog, serviceOfficeCollection, serviceLock */
function serviceMasterBacklog() {
  this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
}

function stagingBacklogs() {
  this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
}

function serviceOfficeCollection() {
  this.GritMovem = ['NJ', 'NY', 'PA'];
  this.Legion = ['FL', 'MD', 'SC', 'VA'];
  this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
  this.NorthCali = ['01', '03', '04', '05', '07', '11', '16', '18', '19', '20', '22', '25', '26', '28', '30'];
  this.SouthCali = ['02', '06', '08', '09', '10', '12', '13', '14', '15', '17', '21', '29', '31', '32', 'LA'];
  this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
}

var serviceLock = LockService.getScriptLock();
