/**
 * Used for marking priority on accounts, indiscriminent to unit type
 * @param {Array[]} completeBacklog
 * @return {Array[]} completeBacklog
 */
function uni_priorityMarker(completeBacklog) {
  var headers = new CompletedBacklogHeaders();
  for (var record = 0; record < completeBacklog.length; record++) {
    var account = completeBacklog[record];

    var accountIsNJ = account[headers.Office].match(/nj-/i) !== null;
    var accountIsPA = account[headers.Office].match(/pa-/i) !== null;
    var accountIsIL = account[headers.Office].match(/il-/i) !== null;
    var accountIsRedesign = account[headers.UnitType].match(/RD/i) !== null;
    var accountIsOutsource =
      account[headers.UnitType].match(/outsource/i) !== null ||
      account[headers.UnitType].match(/OTS/i) !== null;

    if ((accountIsNJ || accountIsPA || accountIsIL) && !accountIsRedesign) {
      completeBacklog[record][headers.Priority] = 'Priority';
      if (accountIsOutsource) {
        completeBacklog[record][headers.UnitType] = 'PERMIT';
      }
    } else {
      continue;
    }
  }

  return completeBacklog;
}

/**
 * Used to get the headers of a completed backlog
 */
function CompletedBacklogHeaders() {
  this.Service = 0;
  this.SolarProject = 1;
  this.CADObject = 2;
  this.Office = 3;
  this.BacklogDate = 4;
  this.DueDate = 5;
  this.ContractType = 6;
  this.UtilityCompany = 7;
  this.UnitType = 8;
  this.Assigned = 9;
  this.Priority = 10;
  this.Status = 11;
  this.Notes = 12;
  this.LastUpdate = 13;
  this.InitialDate = 14;
}

// !!! Example of a complete backlog record
// completeBacklog = [
//   [
//     'S-5967115',
//     '=HYPERLINK("https://vivintsolar.my.salesforce.com/a1n1M000002QWDb","SP-4388480")',
//     '=HYPERLINK("https://vivintsolar.my.salesforce.com/a2J1M000001eXUS","CAD-870225")',
//     'NV-01 Las Vegas East Solar',
//     'CHRONO STAMP',
//     Date('Sat Aug 25 2018 18:00:00 GMT-0600 (MDT)'),
//     'PPA',
//     'NV Energy',
//     'PERMIT RD',
//     'Maurice Velasquez (202428)',
//     'Priority',
//     'In Progress',
//     'Notes bb',
//     Date('Sat Aug 25 2018 09:40:00 GMT-0600 (MDT)'),
//     Date('Sat Aug 25 2018 09:39:43 GMT-0600 (MDT)')
//   ]
// ];
