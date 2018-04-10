/**
* Instantiates the backlog sheets globally.
* 
* @constructs master_Backlogs
* @property {Sheet[]} Collection - All of the sheets in the backlog.
*/
var master_Backlogs = function () {
 /** @typedef Sheet[]*/
 this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
};

/**
* Instantiates the department offices globally.
* 
* @constructs office_Collection
* @property {Array} SouthWest All of the SouthWest states.
* @property {Array} SouthCali All of the South California offices.
* @property {Array} NorthCali All of the North California offices.
* @property {Array} NewEnglan All of the New England offices.
* @property {Array} Legion All of the Legion offices.
* @property {Array} GritMovem All of the Grit Movement offices.
*/
var office_Collection = function () {
 this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
 this.SouthCali = ['02', '06', '08', '09', '10', '12', '13', '14', '15', '17', '21', '29', '31', '32', 'LA'];
 this.NorthCali = ['01', '03', '04', '05', '07', '11', '16', '18', '19', '20', '22', '25', '26', '28', '30'];
 this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
 this.Legion = ['FL', 'MD', 'SC', 'VA'];
 this.GritMovem = ['NJ', 'NY', 'PA'];
};

/**
* Instantiates the script LockService globally.
*/
var lock = LockService.getScriptLock();
