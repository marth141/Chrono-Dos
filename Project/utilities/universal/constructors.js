/* exported
ServiceLock
ServiceMasterBacklog
ServiceOfficeCollection
constructLink
*/

/* global
LockService
SpreadsheetApp
*/
var ServiceMasterBacklog = function (ss) {
  this.Report = ss.getSheetByName("Report");
  this.Proposal = ss.getSheetByName("DEPT PROPOSAL BACKLOG");
  this.SnowProp = ss.getSheetByName("DEPT SNOW PROP BACKLOG");
  this.CPRD = ss.getSheetByName("DEPT CP RD BACKLOG");
  this.PartOne = ss.getSheetByName("DEPT PART 1 BACKLOG");
};

var ServiceOfficeCollection = function () {
  this.GritMovem = ["NJ", "NY", "PA"];
  this.Legion = ["FL", "MD", "SC", "VA"];
  this.NewEnglan = ["CT", "MA", "NH", "RI", "VT"];
  this.NorthCali = ["01", "03", "04", "05", "07", "11", "16", "18", "19", "20", "22", "25", "26", "28", "30"];
  this.SouthCali = ["02", "06", "08", "09", "10", "12", "13", "14", "15", "17", "21", "29", "31", "32", "LA"];
  this.SouthWest = ["AZ", "CO", "HI", "NM", "NV", "TX", "UT"];
  this.Outsource = ["NM", "NV"];
};

var ServiceLock = LockService.getScriptLock();

/**
* This will construct the link and put in the backlog
* array. This array will be pasted back over the
* report page.
*
* @param {number} linkColumn The ID of the CAD Object for link.
* @param {number} linkTextColumn The SP- Name of the Solar Project.
* @param {array} backlogArray The backlog array.
* @returns The backlog array with new SolProj link.
*/
function constructLink(linkColumn, linkTextColumn, backlogArray) {
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row][linkTextColumn] = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/" + backlogArray[row][linkColumn] + "\",\"" + backlogArray[row][linkTextColumn] + "\")";
  }
  return backlogArray;
}