function updateReportData(backlogSheetArray, override) {

  reportRunning(backlogSheetArray.Report);
  var backlogArray = getLiveReportBacklog(backlogSheetArray.Report);
  
  var completeBacklog = pp_underTweleveHours(backlogArray, backlogSheetArray.Report);
  return;
  reportRunning(backlogSheetArray.Report);
  setCompleteBacklog(completeBacklog, backlogSheetArray.Report);
  updateLastRefresh(backlogSheetArray.Report);
  removeReportRunning(backlogSheetArray.Report);
  
  return;
}
