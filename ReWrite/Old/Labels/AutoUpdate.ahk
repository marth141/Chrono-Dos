AutoUpdate:
{
   /*
   MAIN
   */
   SetTitleMatchMode, 2
   
   ; To set the chrono to reupdate when the script is automatically restarting.
   chronoOpened:=0
   
   ; Sets up a variable for a script that accesses a SQL database.
   sqlBat = C:\Users\%A_UserName%\Documents\sqldeveloper\sqldeveloper\bin\Employees.bat
   run % sqlBat
   
   ; Waits until the SQL script is done before continuing.
   Sleep, 800
   Loop ;wait till cmd prompt is closed
   {
      IfWinNotActive, cmd
         break
   }
   
   ; Only runs between 5am-12pm Monday-Friday
   ;if(A_hour < 5)
   ;   Return
   ;run the report numbers at 1
   ;~ if(A_hour = 1 and A_Min < 32) and (A_WDay != 1 and A_WDay != 7)
   ;~ {
   ;~ Run updateReports.ahk
   ;~ }
   
   /*
   This is a large collection of variables necessary for using the Chrono Auto updating script.
   Each one is a link to a report for the relevant team. Necessary for updating the chrono.
   */
   ;******************************************************************************************************
   swChrono = https://docs.google.com/spreadsheets/d/1uwIrt34qsNnXqX0Mxh941vOh7_le3kzoHylS7KXq_w8/edit
   
   swB1 = https://vivintsolar.my.salesforce.com/00O41000007nqcL
   swB2 = https://vivintsolar.my.salesforce.com/00O41000007nqca
   swB3 = https://vivintsolar.my.salesforce.com/00O41000007nqck
   swB4 = https://vivintsolar.my.salesforce.com/00O41000007nqd4
   swB5 = https://vivintsolar.my.salesforce.com/00O41000007najD
   ;******************************************************************************************************
   ;******************************************************************************************************
   legionChrono = https://docs.google.com/spreadsheets/d/16kDxFpm3QcEGEr_8OSyVRvlBzpZXsoycaQZtXSaC5sM/edit#gid=371052260
   
   legionB1 = https://vivintsolar.my.salesforce.com/00O41000007nqdY
   legionB2 = https://vivintsolar.my.salesforce.com/00O41000007nqdi
   legionB3 = https://vivintsolar.my.salesforce.com/00O41000007nqdx
   legionB4 = https://vivintsolar.my.salesforce.com/00O41000007nqe2
   legionB5 = https://vivintsolar.my.salesforce.com/00O41000007nald
   ;******************************************************************************************************			
   ;******************************************************************************************************
   newEngChrono = https://docs.google.com/spreadsheets/d/1Rxl9n_kxBZxghPJgHO8P5k1qiKFR48cNJH6ucZujzj8/edit#gid=371052260
   
   newEngB1 = https://vivintsolar.my.salesforce.com/00O41000007nqeM
   newEngB2 = https://vivintsolar.my.salesforce.com/00O41000007nqeW
   newEngB3 = https://vivintsolar.my.salesforce.com/00O41000007nqeg
   newEngB4 = https://vivintsolar.my.salesforce.com/00O41000007nqeq
   newEngB5 = https://vivintsolar.my.salesforce.com/00O41000007namq
   ;******************************************************************************************************
   ;******************************************************************************************************
   gritChrono = https://docs.google.com/spreadsheets/d/1wMbpZ8Enm_ATgkv2JQ0Nu4GG0d6Juz6xeDwxktGmV_M/edit
   
   gritB1 = https://vivintsolar.my.salesforce.com/00O41000007nqfA
   gritB2 = https://vivintsolar.my.salesforce.com/00O41000007nqfF
   gritB3 = https://vivintsolar.my.salesforce.com/00O41000007nqfK
   gritB4 = https://vivintsolar.my.salesforce.com/00O41000007nqfU
   gritB5 = https://vivintsolar.my.salesforce.com/00O41000007nanU
   ;******************************************************************************************************
   ;******************************************************************************************************
   noChrono = https://docs.google.com/spreadsheets/d/1pK5wwlXkEM9BkDl_0sRKMU6kEed8ivdyL9sg3UPABns/edit#gid=371052260
   
   noB1 = https://vivintsolar.my.salesforce.com/00O41000007nqfZ
   noB2 = https://vivintsolar.my.salesforce.com/00O41000007nqfe
   noB3 = https://vivintsolar.my.salesforce.com/00O41000007nqfj
   noB4 = https://vivintsolar.my.salesforce.com/00O41000007nqfo
   noB5 = https://vivintsolar.my.salesforce.com/00O41000007naoD
   ;******************************************************************************************************
   ;******************************************************************************************************
   soChrono = https://docs.google.com/spreadsheets/d/1AAc1IXIi4jIEwkFOIEeHGjO_XlXbpj3k6Jv9ZY7RQbw/edit#gid=371052260
   
   soB1 = https://vivintsolar.my.salesforce.com/00O41000007nqg8
   soB2 = https://vivintsolar.my.salesforce.com/00O41000007nqgD
   soB3 = https://vivintsolar.my.salesforce.com/00O41000007nqgI
   soB4 = https://vivintsolar.my.salesforce.com/00O41000007nqgN
   soB5 = https://vivintsolar.my.salesforce.com/00O41000007naow
   ;******************************************************************************************************
   ;******************************************************************************************************
   nisChrono = https://docs.google.com/spreadsheets/d/1ITtsDxcp8hnYVTlBk2YpzfoDMd-mqbO_U9gXqh6BMuQ/edit#gid=371052260
   
   nisB1 = https://vivintsolar.my.salesforce.com/00O41000007ns2U
   nisB2 = https://vivintsolar.my.salesforce.com/00O41000007ns3I
   nisB3 = https://vivintsolar.my.salesforce.com/00O41000007ns2o
   nisB4 = https://vivintsolar.my.salesforce.com/00O41000007ns33
   nisB5 = https://vivintsolar.my.salesforce.com/00O41000007nakk
   ;******************************************************************************************************
   ;******************************************************************************************************
   dChrono = https://docs.google.com/spreadsheets/d/1SnsymujZI0dTpBkI67vS6BDxNjiNE4JKG4Y2ApDJqgM/edit#gid=371052260
   
   dB1 = https://vivintsolar.my.salesforce.com/00O41000008G94E
   dB2 = https://vivintsolar.my.salesforce.com/00O41000008G95R
   dB3 = https://vivintsolar.my.salesforce.com/00O41000008G96A
   dB4 = https://vivintsolar.my.salesforce.com/00O41000008G96F
   dB5 = https://vivintsolar.my.salesforce.com/00O41000008G96K
   ;******************************************************************************************************
   ;******************************************************************************************************
   westChrono = https://docs.google.com/spreadsheets/d/1PDGOdbTNQYox2siTwWcLzMcw35kN1p_C1YK47zTgVUE/edit#gid=371052260
   
   ;westB1 = https://vivintsolar.my.salesforce.com/00O41000007nyBp
   westB2 = https://vivintsolar.my.salesforce.com/00O41000008Ev95
   ;******************************************************************************************************
   centralChrono = https://docs.google.com/spreadsheets/d/1pAFnb9wz9m_b53I0CaudcisH8aNLhBCMYVpIJJMKT1s/edit#gid=371052260
   
   centralB1 = https://vivintsolar.my.salesforce.com/00O41000007nyBu
   centralB2 = https://vivintsolar.my.salesforce.com/00O41000008Ev8l
   ;******************************************************************************************************
   atlanticChrono = https://docs.google.com/spreadsheets/d/1OifSIpL1cD2uLDuAfS8QeX6c--2KKsJPwPDNz-jaHAU/edit#gid=371052260
   
   atlanticB1 = https://vivintsolar.my.salesforce.com/00O41000007nyBz
   atlanticB2 = https://vivintsolar.my.salesforce.com/00O41000008Ev8W
   ;******************************************************************************************************
   vrAudit = https://vivintsolar.my.salesforce.com/00O41000008DpjH
   ;******************************************************************************************************
   cpQC = https://vivintsolar.my.salesforce.com/00O41000008DmPD
   cpQCCompleted = https://vivintsolar.my.salesforce.com/00O41000008Dn1X
   cpQCChecked = https://vivintsolar.my.salesforce.com/00O41000008Dq1z
   ;******************************************************************************************************
   ppQCPool = https://vivintsolar.my.salesforce.com/00O41000008Efa8
   ppQCSREEPool = https://vivintsolar.my.salesforce.com/00O41000008ECAe
   ppQCCadObjWChecks = https://vivintsolar.my.salesforce.com/00O41000008E7Nn
   ppQCCadCompleted = https://vivintsolar.my.salesforce.com/00O41000008E7Ni
   ppQCSREEWChecks = https://vivintsolar.my.salesforce.com/00O41000008EDJr
   ppQCSREECompleted = https://vivintsolar.my.salesforce.com/00O41000008EDLd
   ;******************************************************************************************************
   chronoInput = https://docs.google.com/spreadsheets/d/1-bML_DrE8eNiJ2kUw4ppZRXvb5vrexITu0356WEcRoE/edit#gid=0
   ;******************************************************************************************************
   qcPass = https://vivintsolar.my.salesforce.com/00O41000008E3nf
   ;******************************************************************************************************
   ;******************************************************************************************************
   westCoastChrono = https://docs.google.com/spreadsheets/d/1_0JIh4_mh8tvJBHy2Sg5rZcMT5sqYMe0G1taQU5OnYY/edit#gid=371052260
   
   wB1 = https://vivintsolar.my.salesforce.com/00O41000008GHt8
   wB2 = https://vivintsolar.my.salesforce.com/00O41000008GHtI
   ;******************************************************************************************************
   eastCoastChrono = https://docs.google.com/spreadsheets/d/1kNJibprJFDrRmMtGpcOoWsDQOt7oA2v6fqx92282lmo/edit
   
   eB1 = https://vivintsolar.my.salesforce.com/00O41000008GHth
   eB2 = https://vivintsolar.my.salesforce.com/00O41000008GHtr
   
   ;******************************************************************************************************
   
   structrualEscalations = https://vivintsolar.my.salesforce.com/00O41000008pQux
   structrualEscalationsNonFullProcess = https://vivintsolar.my.salesforce.com/00O41000008pQui
   ;******************************************************************************************************
   
   electricalEscalations = https://vivintsolar.my.salesforce.com/00O41000008pj5I
   ;******************************************************************************************************
   
   /*
   Now that the variables have been put in place, we'll run chronoInput.
   Will try seeing if keeping only one chrono input page open would help.
   Should only open the chrono input once.
   */
   if (chronoOpened = 0)
   {
      run % chronoInput
      sleep, 200
      send, {F6}{F6}
      chronoOpened := ++chronoOpened
   }
   
   ;~ ; Comment these below to stop chrono update for that team
   runUpdate([wB1, wB2])
   runUpdate([eB1, eB2])
   ;runUpdate([westB1, westB2])
   ;runUpdate([centralB1, centralB2])
   ;runUpdate([atlanticB1, atlanticB2])
   runUpdate([noB1, noB2, noB3, noB4, noB5])
   runUpdate([soB1, soB2, soB3, soB4, soB5])
   runUpdate([swB1, swB2, swB3, swB4, swB5])
   runUpdate([gritB1, gritB2, gritB3, gritB4, gritB5])
   runUpdate([newEngB1, newEngB2, newEngB3, newEngB4, newEngB5])
   runUpdate([legionB1, legionB2, legionB3, legionB4, legionB5])
   runUpdate([nisB1, nisB2, nisB3, nisB4, nisB5])
   runUpdate([dB1, dB2, dB3, dB4, dB5])
   runUpdate([electricalEscalations])
   runUpdate([structrualEscalations, structrualEscalationsNonFullProcess])
   runUpdate([qcPass])
   runUpdate([cpQC, cpQCCompleted, cpQCChecked])
   runUpdate([ppQCPool, ppQCSREEPool, ppQCCadObjWChecks, ppQCCadCompleted, ppQCSREEWChecks, ppQCSREECompleted])
   runUpdate([vrAudit])
   
   
   
   send, ^w
   
   return
}