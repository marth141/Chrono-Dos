function addLastColumns(stagingBacklog) {
  var dim = getDimensions(stagingBacklog);
  var columnsToAdd = ['Assigned', 'Priority', 'Status'];
  var toAddIndex = 0;
  for (var end = dim[1] + 1; end <= dim[1] + 3; end++) {
    stagingBacklog.getRange(0, end).setValue(columnsToAdd[toAddIndex]);
    toAddIndex++;
  }
}