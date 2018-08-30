/* exported
addLastColumns
debugAddLastColumns
debugAddToCompleteBacklog
uni_AddToCompleteBacklog
*/

/* global
ServiceMasterBacklog
uni_addLastColumns
*/
function debugAddToCompleteBacklog() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 1;
  uni_addLastColumns(masterBacklogs.Collection[overRide]);
  return;
}

/**
 *
 * 
 * @param {any} backlogArray 
 */
function uni_AddToCompleteBacklog(backlogArray, completeBacklog) {

  for(var row = 1; row < backlogArray.length; row++)
    completeBacklog.unshift(backlogArray[row]);
  return completeBacklog;
}
