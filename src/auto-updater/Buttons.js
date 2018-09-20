/*
----------------------------------------
|  Team               |  Test Results  |
----------------------------------------
|  CP DIN             |  Working       |
|  CP QCD             |  Working       |
|  DOS                |  Working       |
|  EE                 |  Working       |
|  PP DIN             |  Working       |
|  PP QCD             |  Working       |
|  Permits Submitted  |  Working       |
|  PP Outsource       |  Working       |
|  QC Pass            |  Working       |
|  SE                 |  Working       |
|  DEALER             |  Retired       |
|  DEPT (ONE)         |  Retired       |
|  NIS                |  Retired       |
----------------------------------------
*/

/**
 * Used to send reports to destination backlog
 */
function btn_Main() {
  // Get's the input sheet of the updater.
  var inputSheet = new SourceSheetService().inputSheet;

  // Sets up the pasted sheets identity and destination.
  whoIsUpdating(inputSheet);

  // Gathers up the data and its dimensions.
  dataDimensioning(inputSheet);

  // ---------COULD BE IT'S OWN FUNCTION------------
  // Checks if backlog2Update exists. If not, throw.
  if (updateJSON.backlog2Update === null) {
    throw 'Sheet not found.';
  }

  // Clears the destination space.
  qcd_Clear_Destination();

  // Moves to destination
  move_ToDestination();

  // Starts backlogs builder library.
  hitup_Libraries();

  // Clears the input sheet.
  clear_Source(inputSheet);
}

/**
 * Used to make function calls at destination chrono libraries
 */
function hitup_Libraries() {
  if (
    updateJSON.identity.team.match(/SE/i) &&
    updateJSON.identity.sheetNames.normal.match(/Non Full Process/i)
  ) {
    SREE_Chrono.getAccounts(
      SpreadsheetApp.openById('15svGQMYJeh9UyRdEHLCbKqf2wgQ-ksLGiKLTPSqJ3Hg')
    );
    return;
  } else if (
    updateJSON.identity.team.match(/DOS/i) &&
    updateJSON.identity.sheetNames.normal.match(/Permit RD/i)
  ) {
    DOS_Chrono.callMain(updateJSON.identity.team);
    return;
  } else if (
    updateJSON.identity.team.match(/EE/i) &&
    updateJSON.identity.sheetNames.normal.match(/backlog/i)
  ) {
    EE_Chrono.getAccounts(
      SpreadsheetApp.openById('15yRzSrRuom5Rtg3aSdhHq6iYKy4dceP71f7bTYHAfmg')
    );
    return;
  } else if (
    updateJSON.identity.team.match(/CP QCD/i) &&
    updateJSON.identity.sheetNames.normal.match(/Props Checked/i)
  ) {
    CPQCD_Chrono.main(
      SpreadsheetApp.openById('1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo')
    );
    return;
  } else if (
    updateJSON.identity.team.match(/PP QCD/i) &&
    updateJSON.identity.sheetNames.normal.match(/SR\/EEs Complete/i)
  ) {
    PPQCD_Chrono.arrangeQueue();
    return;
  } else if (
    updateJSON.identity.team.match(/Permit Outsource/i) &&
    updateJSON.identity.sheetNames.normal.match(/CAD\/INS Packet Missing/i)
  ) {
    PP_Outsource_Chrono.errorQue();
    return;
  }
  // todo: add permit qc Permit QCD QUEUE VSLR.arrangeQueue
  console.log("Ain't no library for that.");
}

/**
 * Used to clear the updater
 */
function btn_ClearInputter() {
  var inputSheet = new SourceSheetService().inputSheet;
  inputSheet.clearContents();
  SpreadsheetApp.flush();
}
