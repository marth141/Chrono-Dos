var getInputSheet = function() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
}

var getInputLabels = function(input_sheet) {
  return input_sheet.getRange("A14:A15").getValues();
}

var getCPQCDLabelKey = function() {
  return {
    label: "CPQCD",
    id: "1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo",
    reportInput: [["CP QCD"],["Report Input"]],
    propsComplete: [["CP QCD"],["Props Complete"]],
    propsChecked: [["CP QCD"],["Props Checked"]],
    salesLayout: [["CP QCD"],["Sales Layouts Completed"]]
  };
}

var matchLabel = function(input_label) {
  switch(input_label[0][0]) {
    case "CP QCD":
      return getCPQCDLabelKey();
  }
}

var getDestinationSheet = function(label_key, input_label) {
  return SpreadsheetApp.openById(label_key.id).getSheetByName(input_label[1][0]);
}

var getInputEnds = function(input_sheet) {
  var rowEnd = input_sheet.getLastRow();
  var colEnd = input_sheet.getLastColumn();
  return {rowEnd: rowEnd, colEnd: colEnd};
}

var getInputData = function(input_sheet, input_Ends) {
  return input_sheet.getRange(1,1,input_Ends.rowEnd,input_Ends.colEnd).getValues();
}

var pasteInput = function(destination, input_data, input_Ends) {
  var pastePoint = destination.getRange(1,1,input_Ends.rowEnd,input_Ends.colEnd)
  try {
    pastePoint.setValues(input_data);
    return true;
  } catch (e) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Error occured while pasting input");
  }
}

var libraryTap = function(label_key, input_label) {
  switch(label_key.label) {
    case "CPQCD":
      switch(input_label[1][0]) {
        case "Sales Layouts Completed":
          CPQCD_Chrono.main(SpreadsheetApp.openById('1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo'));
      }
  }
}

function Main() {
  var input_sheet = getInputSheet();
  var input_label = getInputLabels(input_sheet);
  var label_key = matchLabel(input_label);
  var input_Ends = getInputEnds(input_sheet);
  var input_data = getInputData(input_sheet, input_Ends);
  var destination = getDestinationSheet(label_key, input_label);
  pasteInput(destination, input_data, input_Ends);
  libraryTap(label_key, input_label);
  clear_Source(input_sheet);
}