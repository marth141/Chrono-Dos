/* globals
getBacklogName
SpreadsheetApp
updateJSON
*/

/* exported
whoIsUpdating
*/



//Builds updateJSON
function whoIsUpdating(inputSheet) {
  updateJSON.identity = getBacklogName(inputSheet);
  updateJSON.teamKeyChain = team_determiner();
  updateJSON.backlog2Update = getBacklog2Update();
  updateJSON.dev2Update = getdev2Update();

  return updateJSON;
}

function getBacklog2Update() {
  if (updateJSON.teamKeyChain.normPlus === "Normal") {
    //Prod Chrono
    return SpreadsheetApp.openById(updateJSON.teamKeyChain.chrono).getSheetByName(updateJSON.identity.sheetNames.normal);

    //Dev Chrono
    //return SpreadsheetApp.openById(updateJSON.teamKeyChain.devChrono).getSheetByName(updateJSON.identity.sheetNames.normal);
  } else if (updateJSON.teamKeyChain.normPlus === "Plus") {
    //Prod CHrono
    return SpreadsheetApp.openById(updateJSON.teamKeyChain.chrono).getSheetByName(updateJSON.identity.sheetNames.plus);

    //Dev Chrono
    //return SpreadsheetApp.openById(updateJSON.teamKeyChain.devChrono).getSheetByName(updateJSON.identity.sheetNames.plus);
  }
}

function getBacklogName(inputSheet) {
  var backlogPasteID = inputSheet.getRange("C2").getValue();

  //If Solar classic
  if (backlogPasteID.match(/Solar$/g)) {
    var inputIdentity = inputSheet.getRange("A12:A13").getValues();
    inputIdentity = { team: inputIdentity[0][0], sheetNames: { plus: inputIdentity[1][0] + " BACKLOG", normal: inputIdentity[1][0] } };

    //If Solar Console
  } else if (backlogPasteID.match(/Solar Console$/g)) {
    inputIdentity = inputSheet.getRange("A5:A6").getValues().join().replace(",", " ");
    if (inputIdentity.match(/ Help for this Page/i)) {
      inputIdentity = inputIdentity.replace(/ Help for this Page/i, "");
    }
  }
  return inputIdentity;
}

/*
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  REPORT GROUP                    |  STATUS   |  Spreadsheet Prod Link                                                                 |  Dev Todo & Notes                                  |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  CP DIN                          |  Working  |  https://docs.google.com/spreadsheets/d/13NS3RBEC18NZXv-3KLKYE8pW4GCfQKE-vtvsDnrLdO0/  |                                                    |
|  CP QCD                          |  Working  |  https://docs.google.com/spreadsheets/d/1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo/  |                                                    |
|  DOS                             |  Working  |  https://docs.google.com/spreadsheets/d/121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0/  |                                                    |
|  EE                              |  Working  |  https://docs.google.com/spreadsheets/d/15yRzSrRuom5Rtg3aSdhHq6iYKy4dceP71f7bTYHAfmg/  |                                                    |
|  PP DIN                          |  Working  |  https://docs.google.com/spreadsheets/d/1tde_sOJnMHoCWvOSlqJDBt-JpFCXiBZ_JCY4dwU_Oic/  |                                                    |
|  PP QCD                          |  Working  |  https://docs.google.com/spreadsheets/d/1J8CCOMP5XOkusS9NI73wvOBa4D_ZEC0MJq2pEoZL9Fs/  |                                                    |
|  Permits Submitted               |  Working  |  https://docs.google.com/spreadsheets/d/1xU2F9SuyLo49VrwcAAyjo_LcdkXTkJJ0bxTAh45m_ow/  |                                                    |
|  PP Outsource                    |  Working  |  https://docs.google.com/spreadsheets/d/1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE/  |                                                    |
|  QC Pass                         |  Working  |  SpreadsheetLink                                                                       |                                                    |
|  SE                              |  Working  |  SpreadsheetLink                                                                       |                                                    |
|  Dealer                          |  Retired  |  https://docs.google.com/spreadsheets/d/1YIfEfnpL-aWqKQtDM5Pc2n8gzajkq_hudXOxZUBQS6k/  |                                                    |
|  Dept                            |  Retired  |  https://docs.google.com/spreadsheets/d/1lGXtQB23DM9BErKP9Bgk-oOzIOXXirj9fPpOmLnChm8/  |                                                    |
|  NIS                             |  Retired  |  https://docs.google.com/spreadsheets/d/1_qXC4VFhTth_SIaBMs8RGuGvvZVUjWPLmRKH_jxgVYQ/  |                                                    |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

//For building JSON, determines team based on backlog name.
function team_determiner() {
  if (updateJSON.identity.team.match(/CP DIN/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "13NS3RBEC18NZXv-3KLKYE8pW4GCfQKE-vtvsDnrLdO0",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/CP QCD/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1kDYROn2VEwprWRyzS7vk8t8ZKXzsM0FhtICyjpgRpMo",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/DOS/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0",
      devChrono: "1r06cw7MtVKolZY6pXkmuoxcWPUeqtdm8Tu9sc5ljBkg",
      normPlus: "Plus",
    };
  } else if (updateJSON.identity.team.match(/Dealer/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1YIfEfnpL-aWqKQtDM5Pc2n8gzajkq_hudXOxZUBQS6k",
      devChrono: undefined,
      normPlus: "Plus",
    };
  } else if (updateJSON.identity.team.match(/Dept/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1lGXtQB23DM9BErKP9Bgk-oOzIOXXirj9fPpOmLnChm8",
      devChrono: undefined,
      normPlus: "Plus",
    };
  } else if (updateJSON.identity.team.match(/EE/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "15yRzSrRuom5Rtg3aSdhHq6iYKy4dceP71f7bTYHAfmg",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/NIS/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1_qXC4VFhTth_SIaBMs8RGuGvvZVUjWPLmRKH_jxgVYQ",
      devChrono: undefined,
      normPlus: "Plus",
    };
  } else if (updateJSON.identity.team.match(/PP DIN/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1tde_sOJnMHoCWvOSlqJDBt-JpFCXiBZ_JCY4dwU_Oic",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/PP QCD/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1J8CCOMP5XOkusS9NI73wvOBa4D_ZEC0MJq2pEoZL9Fs",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/Permit Outsource/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1J2vOLMlEGc9zoddFTUmA9P7K0yenWFfKKxxK3TAseeE",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/Permits Submitted/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1ONSFtLx8wMzS8-WH9e9zPC3yO2pBL8U9A9znMucHVnM",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/QC Pass/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "1fSR1dYI6pM0jw-4doNndk2zi7zsqcWckM-zIsu2pqy4",
      devChrono: undefined,
      normPlus: "Normal",
    };
  } else if (updateJSON.identity.team.match(/SE/i)) {
    return updateJSON.teamKeyChain = {
      chrono: "15svGQMYJeh9UyRdEHLCbKqf2wgQ-ksLGiKLTPSqJ3Hg",
      devChrono: undefined,
      normPlus: "Normal",
    };
  }
  return;
}