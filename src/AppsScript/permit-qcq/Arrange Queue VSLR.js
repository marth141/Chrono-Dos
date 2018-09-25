function arrangeQueue() {
  var ss = SpreadsheetApp.openById("1J8CCOMP5XOkusS9NI73wvOBa4D_ZEC0MJq2pEoZL9Fs");
  main(ss);
}
function main(ss) {
  
  var QSheet = ss.getSheetByName("Queue");
  var reportInputSheet = ss.getSheetByName("Report Input");
  
  var newbies = [], oldies = [];
  
  //******************************************************************************************************************************************************************************************
  //               COPY QUEUE TO THE DUMMY TAB                ********************************************************************************************************************************
  //******************************************************************************************************************************************************************************************
  ss.getRange("Dummy Page!A7:T").clearContent();  //COPY ALL QUEUE CONTENTS BEFORE RUNNING IN ORDER TO REMEMBER THE ASSIGNED AND STATUS INFO
  var oldValues = ss.getRange("Queue!B6:V").getValues().filter(function(value){ return (value[0].indexOf("S-") > -1); });
  if(oldValues.length > 0)
    ss.getSheetByName('Dummy Page').getRange(7,1,oldValues.length,oldValues[0].length).setValues(oldValues);
  SpreadsheetApp.flush();
  //******************************************************************************************************************************************************************************************
  
  var oldValues = oldValues.filter(function(value){ return (value[18] != "" || value[19] != ""); }); //Only get the old data that had assigned or status info
  
  //******************************************************************************************************************************************************************************************
  //                    COPY PERMIT REPORT INPUT                     ********************************************************************************************************************************
  //******************************************************************************************************************************************************************************************  
  var permitData = ss.getRange('PERMITS!A:R').getValues().filter(function(value){
    if(value[0].indexOf("S-") > -1)
    {
      var completedDate = new Date(value[15]);
      var initalDate = new Date(value[16]);
      value.splice(16, 1);
      
      //Concatenate the links together
      var concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[1]+"\",\""+value[0]+"\")";
      value.splice(0, 2, concat);
      
      concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[2]+"\",\""+value[1]+"\")";
      value.splice(1, 2, concat);

      concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[3]+"\",\""+value[2]+"\")";
      value.splice(2, 2, concat);
      
      concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[4]+"\",\""+value[3]+"\")";
      value.splice(3, 2, concat);
      
      //add space for case
      value.splice(4, 0, "");
      
      value[7] = value[7].replace(" - Solar",""); //This removes the dash and Solar on NIS accounts
      value[7] = value[7].replace(" Solar","");   //This removes Solar from Office
      value[8] = value[8].replace(" Solar","");   //This removes Solar from the ROC
      
      //Filter through the old accounts that have assigned/status info and match with the report 
      var index = oldValues.filter(function(x){
        if(value[0].indexOf(x[0]) > -1){
          //Repopulate the existing assigned/status info to accounts already assigned
          value[18] = x[19];
          value[19] = x[20];
          return true;
        }
      });
      
      if(index.length < 1)
      {
        value[18] = "";
        value[19] = "";
      }
      
      //Add the extra columns for SR/EE techs and case closed
      value[14] = "";
      value[15] = "";
      value[16] = "";
      value[17] = "";
      
      
      // Check if redesign
      if(checkDates(completedDate, initalDate)) {
        value.splice(5, 0, "PERMIT");
      }
      else {
        value.splice(5, 0, "REDESIGN");
      }
      
      return true;
    }     
  }); 

  //******************************************************************************************************************************************************************************************
  //                    COPY SR/EE REPORT INPUT                     ********************************************************************************************************************************
  //******************************************************************************************************************************************************************************************  
  var SREEData = ss.getRange('SR/EEs!A:W').getValues().filter(function(value){
    if(value[0].indexOf("S-") > -1)
    {
      //concat service/case links
      var concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[1]+"\",\""+value[0]+"\")";
      value.splice(0, 2, concat);
      
      concat = "=HYPERLINK(\"https://vivintsolar.my.salesforce.com/"+value[2]+"\",\""+value[1]+"\")";
      value.splice(1, 2, concat);
      
      //find the matching account
      var notFound = permitData.some(function(x){ 
        //add the SR/EE data to the Permit Data, else mark not found
        if(x[0] == value[0]){ 
          //add the case number to permit data
          x[4] = value[1];
          
          //check if sr tech vs ee tech check
          if(value[4].toLowerCase().indexOf("sr") > -1 || value[4].toLowerCase().indexOf("structural") > -1)
          {
            //add the tech and closed date to SR Tech/Case Closed
            x[15] = value[2];
            x[16] = value[3];
          }
          else
          {
            //add the tech and closed date to EE Tech/Case Closed
            x[17] = value[2];
            x[18] = value[3];
          }
          return true;
        } 
      });
      if(!notFound)
      {
        //check if sr tech vs ee tech check
        if(value[4].toLowerCase().indexOf("sr") > -1 || value[4].toLowerCase().indexOf("structural") > -1)
        {
          //add the tech and closed date to SR Tech/Case Closed
          value[15] = value[2];
          value[16] = value[3];
          value[2] = "";
          value[3] = "";
        }
        else
        {
          //add the tech and closed date to EE Tech/Case Closed
          value[17] = value[2];
          value[18] = value[3];
          value[2] = "";
          value[3] = "";
        }
        value[4] = value[1];
        value[1] = "";
        
        //Add the missing SR/EE data to the end of the Permit Data
        permitData.push(value);
        
        //Filter through the old accounts that have assigned/status info and match with the report 
        var index = oldValues.filter(function(x){
          if(value[0].indexOf(x[0]) > -1){
            //Repopulate the existing assigned/status info to accounts already assigned
            value[19] = x[19];
            value[20] = x[20];
            return true;
          }
        });
        
        
        
        return true; //return true if the account was not found in the permit data
      }
      if(value.length < 21)
          var x = 0;
      return false; //Returns false if the account is found in the permit data
    }     
  }); 
  //******************************************************************************************************************************************************************************************
     
  QSheet.getRange('B6:S').clearContent();

  var row = permitData.length;
  if (row > 0) 
  {
    var col = permitData[0].length;  
    QSheet.getRange(6,2,row,col).setValues(permitData);
    var properties = PropertiesService.getScriptProperties();
    properties.setProperty('row', row);
  }

  SpreadsheetApp.flush();
  Utilities.sleep(1000);
  reSort(QSheet);
  
  //******************************************************************************************************************************************************************************************
  //THE CODE BELOW TIME STAMPS WHEN THE Report WAS LAST PULLED********************************************************************************************************************************
  //******************************************************************************************************************************************************************************************
  var timeZone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(new Date(), timeZone, "MM/dd/yy hh:mm a");
  QSheet.getRange('B2').setValue(date);
  QSheet.getRange('K2').setValue(""); //Erases the "Report Being Run" text
  //******************************************************************************************************************************************************************************************
}



function checkDates(completedDate, initalDate) {
  if(initalDate instanceof Date && isNaN(initalDate))
    return true;
  var timeDiff = Math.abs(completedDate.getTime() - initalDate.getTime());
  var diffHour = Math.ceil(timeDiff / (1000 * 3600)); 
  
  return diffHour = 0;
}
