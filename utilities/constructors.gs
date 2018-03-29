var master_Backlogs = function () {
	this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
};

var office_Collection = function () {
	this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
	this.SouthCali = ['02', '06', '08', '09', '10', '12', '13', '14', '15', '17', '21', '29', '31', '32', 'LA'];
	this.NorthCali = ['01', '03', '04', '05', '07', '11', '16', '18', '19', '20', '22', '25', '26', '28', '30'];
	this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
	this.Legion = ['FL', 'MD', 'SC', 'VA'];
	this.GritMovem = ['NJ', 'NY', 'PA'];
};

var lock = LockService.getScriptLock();