/**
 *
 * @param {*} backlogArray
 * @param {*} completeBacklog
 * @return {*} completedBacklog
 */
function uni_AddToCompleteBacklog(backlogArray, completeBacklog) {
  for (var row = 1; row < backlogArray.length; row++) {
    completeBacklog.unshift(backlogArray[row]);
  }
  return completeBacklog;
}
