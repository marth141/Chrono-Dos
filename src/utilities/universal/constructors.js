// @flow strict
var ServiceOfficeCollection = function() {
  this.GritMovem = ['NJ', 'NY', 'PA'];
  this.Legion = ['FL', 'MD', 'SC', 'VA'];
  this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
  this.NorthCali = [
    '01',
    '03',
    '04',
    '05',
    '07',
    '11',
    '16',
    '18',
    '19',
    '20',
    '22',
    '25',
    '26',
    '28',
    '30'
  ];
  this.SouthCali = [
    '02',
    '06',
    '08',
    '09',
    '10',
    '12',
    '13',
    '14',
    '15',
    '17',
    '21',
    '29',
    '31',
    '32',
    'LA'
  ];
  this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
  this.Outsource = ['NM', 'NV'];
};

/**
 * This will construct the link and put in the backlog
 * array. This array will be pasted back over the
 * report page.
 *
 * @param {Number} linkIDColumn
 * @param {Number} linkNameColumn This column will be replaced by link
 * @param {Array[]} backlogArray
 * @return {Array[]}
 */
function constructLink(linkIDColumn, linkNameColumn, backlogArray) {
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row][linkNameColumn] =
      '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
      backlogArray[row][linkIDColumn] +
      '","' +
      backlogArray[row][linkNameColumn] +
      '")';
  }
  return backlogArray;
}
