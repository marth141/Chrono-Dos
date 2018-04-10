/**
* Instantiates the Master Backlog sheets to be
* a function like variable.
*
* Example:
*
* var masterBacklogSheetAccess = new serviceMasterBacklog();
*
* var backlogSheet = masterBacklogSheetAccess.Collection;
*
* backlogSheet[1,2,3,4,5,...] = Sheet;
*
* @constructs serviceMasterBacklog
* @property {Sheet[]} Collection with an index starting at 1.
*/
var serviceMasterBacklog = function () {
  this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
};

/**
* Instantiates the department offices globally.
* 
* @constructs serviceOfficeCollection
* @property {Array} GritMovem offices.
* @property {Array} Legion offices.
* @property {Array} NewEnglan offices.
* @property {Array} NorthCali offices.
* @property {Array} SouthCali offices.
* @property {Array} SouthWest states.
*/
var serviceOfficeCollection = function () {
  this.GritMovem = ['NJ', 'NY', 'PA'];
  this.Legion = ['FL', 'MD', 'SC', 'VA'];
  this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
  this.NorthCali = ['01', '03', '04', '05', '07', '11', '16', '18', '19', '20', '22', '25', '26', '28', '30'];
  this.SouthCali = ['02', '06', '08', '09', '10', '12', '13', '14', '15', '17', '21', '29', '31', '32', 'LA'];
  this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
};

/**
* Used to start the LockService with Google.
* This should prevent concurrency issues.
*
* Lock Service Documentation
* https://developers.google.com/apps-script/reference/lock/
* Example:
* https://stackoverflow.com/questions/43223774/how-to-understand-lockservice-and-implement-it-correctly
*/
var serviceLock = LockService.getScriptLock();
