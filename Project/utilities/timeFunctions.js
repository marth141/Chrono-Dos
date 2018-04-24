/* exported
timeAddHours
timeStateOffset
*/

/* global
*/

/**
* Adds hours to a date value.
*
* @param {Date} date
* @param {Number} hours
* @returns The date with hours adjusted.
*/
function timeAddHours(date, hours) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000); return date;
}

/**
* Will determine 1700 hour offset to MST
* by matching the state abreviation with
* the cases listed.
*
* @param {String} stateAbrv
* @returns 1700 (5:00PM) from a matching state but adjusted for MST.
*/
function timeStateOffset(stateAbrv) {
  switch (stateAbrv) {
    case 'HI':
      return 4;
    case 'WA':
    case 'OR':
    case 'CA':
    case 'NV':
      return 1;
    case 'AZ':
    case 'MT':
    case 'ID':
    case 'WY':
    case 'UT':
    case 'CO':
    case 'NM':
      return 0;
    case 'AL':
    case 'AR':
    case 'IL':
    case 'IA':
    case 'KS':
    case 'KY':
    case 'LA':
    case 'MN':
    case 'MS':
    case 'MO':
    case 'NE':
    case 'ND':
    case 'OK':
    case 'SD':
    case 'TN':
    case 'TX':
    case 'WI':
      return -1;
    case 'CT':
    case 'DE':
    case 'FL':
    case 'GA':
    case 'IN':
    case 'ME':
    case 'MD':
    case 'MA':
    case 'MI':
    case 'NH':
    case 'NJ':
    case 'NY':
    case 'NC':
    case 'OH':
    case 'PA':
    case 'RI':
    case 'SC':
    case 'VT':
    case 'VA':
    case 'DC':
    case 'WV':
      return -2;
  }
}
