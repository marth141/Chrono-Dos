/* globals
BacklogSnagger
*/

/* exported
dimensionsJSON
snagger
updateJSON
*/

var snagger = new BacklogSnagger();

var updateJSON = {
  identity: {
    team: undefined,
    sheetNames: {
      plus: undefined,
      normal: undefined,
    }
  },
  teamKeyChain: {
    chrono: undefined,
    devChrono: undefined,
    normPlus: undefined,
  },
  backlog2Update: undefined,
  dev2Update: undefined,
};

var dimensionsJSON = {
  source: {
    data: undefined,
    arrayDimensions: undefined,
    sheetDimensions: undefined,
  },
  destination: {
    arrayDimensions: undefined,
    sheetDimensions: undefined,
  }
};

function getdev2Update() {
  if (updateJSON.teamKeyChain.devChrono !== undefined) {
    if (updateJSON.teamKeyChain.normPlus === "Normal") {
      //Prod Chrono
      //return SpreadsheetApp.openById(updateJSON.teamKeyChain.chrono).getSheetByName(updateJSON.identity.sheetNames.normal);
      
      //Dev Chrono
      return SpreadsheetApp.openById(updateJSON.teamKeyChain.devChrono).getSheetByName(updateJSON.identity.sheetNames.normal);
    } else if (updateJSON.teamKeyChain.normPlus === "Plus") {
      //Prod CHrono
      //return SpreadsheetApp.openById(updateJSON.teamKeyChain.chrono).getSheetByName(updateJSON.identity.sheetNames.plus);
      
      //Dev Chrono
      return SpreadsheetApp.openById(updateJSON.teamKeyChain.devChrono).getSheetByName(updateJSON.identity.sheetNames.plus);
    }
  } else {
    console.log('Dev key undefined');
  }
}