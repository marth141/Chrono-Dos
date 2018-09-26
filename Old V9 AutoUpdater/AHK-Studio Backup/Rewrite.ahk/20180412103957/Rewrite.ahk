
#Persistent
chronoOpened = 0
maxmizeCount = 0
SetTimer, AutoUpdate, 900000
SetTimer, KeepAwake, 600000

checkCmdRunning()
{
	Loop
	{
		IfWinNotActive, cmd
			break
	}
}

dontRunBeforeFiveAM()
{
	if (A_hour < 5) {
		Throw "Don't run before 5AM."
	} else {
		continue
	}
}

updateEmployeeDB()
{
	sqlBat = C:\Users\%A_UserName%\Documents\sqldeveloper\sqldeveloper\bin\Employees.bat
	run % sqlBat
	Sleep, 800
	return
}

checkIfChronoAlreadyOpen(chronoOpened)
{
	if (chronoOpened = 0)
	{
		run % chronoInput
		sleep, 200
		send, {F6}{F6}
		chronoOpened := ++chronoOpened
	}
}

global southWestBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqcL
, https://vivintsolar.my.salesforce.com/00O41000007nqca
, https://vivintsolar.my.salesforce.com/00O41000007nqck
, https://vivintsolar.my.salesforce.com/00O41000007nqd4
, https://vivintsolar.my.salesforce.com/00O41000007najD)

global legionBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqdY
, https://vivintsolar.my.salesforce.com/00O41000007nqdi
, https://vivintsolar.my.salesforce.com/00O41000007nqdx
, https://vivintsolar.my.salesforce.com/00O41000007nqe2
, https://vivintsolar.my.salesforce.com/00O41000007nald)

global newEngBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqeM
, https://vivintsolar.my.salesforce.com/00O41000007nqeW
, https://vivintsolar.my.salesforce.com/00O41000007nqeg
, https://vivintsolar.my.salesforce.com/00O41000007nqeq
, https://vivintsolar.my.salesforce.com/00O41000007namq)

global gritBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqfA
, https://vivintsolar.my.salesforce.com/00O41000007nqfF
, https://vivintsolar.my.salesforce.com/00O41000007nqfK
, https://vivintsolar.my.salesforce.com/00O41000007nqfU
, https://vivintsolar.my.salesforce.com/00O41000007nanU)

global northCaliBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqfZ
, https://vivintsolar.my.salesforce.com/00O41000007nqfe
, https://vivintsolar.my.salesforce.com/00O41000007nqfj
, https://vivintsolar.my.salesforce.com/00O41000007nqfo
, https://vivintsolar.my.salesforce.com/00O41000007naoD)

global southCaliBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nqg8
, https://vivintsolar.my.salesforce.com/00O41000007nqgD
, https://vivintsolar.my.salesforce.com/00O41000007nqgI
, https://vivintsolar.my.salesforce.com/00O41000007nqgN
, https://vivintsolar.my.salesforce.com/00O41000007naow)

global nisBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007ns2U
, https://vivintsolar.my.salesforce.com/00O41000007ns3I
, https://vivintsolar.my.salesforce.com/00O41000007ns2o
, https://vivintsolar.my.salesforce.com/00O41000007ns33
, https://vivintsolar.my.salesforce.com/00O41000007nakk)

global dealerBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000008G94E
, https://vivintsolar.my.salesforce.com/00O41000008G95R
, https://vivintsolar.my.salesforce.com/00O41000008G96A
, https://vivintsolar.my.salesforce.com/00O41000008G96F
, https://vivintsolar.my.salesforce.com/00O41000008G96K)

global westPermitBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nyBp
, https://vivintsolar.my.salesforce.com/00O41000008Ev95)

global centralPermitBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nyBu
, https://vivintsolar.my.salesforce.com/00O41000008Ev8l)

global atlanticPermitBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000007nyBz
, https://vivintsolar.my.salesforce.com/00O41000008Ev8W)

global vrAudit:= Array(https://vivintsolar.my.salesforce.com/00O41000008DpjH)

global cpQualityConBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000008DmPD
, https://vivintsolar.my.salesforce.com/00O41000008Dn1X
, https://vivintsolar.my.salesforce.com/00O41000008Dq1z)

global permitQualityConBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000008Efa8
, https://vivintsolar.my.salesforce.com/00O41000008ECAe
, https://vivintsolar.my.salesforce.com/00O41000008E7Nn
, https://vivintsolar.my.salesforce.com/00O41000008E7Ni
, https://vivintsolar.my.salesforce.com/00O41000008EDJr
, https://vivintsolar.my.salesforce.com/00O41000008EDLd)

global qualityConPass:= Array(https://vivintsolar.my.salesforce.com/00O41000008E3nf)

global westCoastBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000008GHt8
, https://vivintsolar.my.salesforce.com/00O41000008GHtI)

global eastCoastBacklogs:= Array(https://vivintsolar.my.salesforce.com/00O41000008GHth
, https://vivintsolar.my.salesforce.com/00O41000008GHtr)

AutoUpdate:
{
	SetTitleMatchMode, 2
	chronoOpened:= 0
	checkCmdRunning()
	dontRunBeforeFiveAM()
	updateEmployeeDB()	
	southWestChrono = "https://docs.google.com/spreadsheets/d/1uwIrt34qsNnXqX0Mxh941vOh7_le3kzoHylS7KXq_w8/edit#"	
	legionChrono = "https://docs.google.com/spreadsheets/d/16kDxFpm3QcEGEr_8OSyVRvlBzpZXsoycaQZtXSaC5sM/edit#"	
	newEngChrono = "https://docs.google.com/spreadsheets/d/1Rxl9n_kxBZxghPJgHO8P5k1qiKFR48cNJH6ucZujzj8/edit#"	
	gritMoveChrono = "https://docs.google.com/spreadsheets/d/1wMbpZ8Enm_ATgkv2JQ0Nu4GG0d6Juz6xeDwxktGmV_M/edit#"	
	northCaliChrono = "https://docs.google.com/spreadsheets/d/1pK5wwlXkEM9BkDl_0sRKMU6kEed8ivdyL9sg3UPABns/edit#"	
	southCaliChrono = "https://docs.google.com/spreadsheets/d/1AAc1IXIi4jIEwkFOIEeHGjO_XlXbpj3k6Jv9ZY7RQbw/edit#"	
	nisChrono = "https://docs.google.com/spreadsheets/d/1ITtsDxcp8hnYVTlBk2YpzfoDMd-mqbO_U9gXqh6BMuQ/edit#"	
	dealerChrono = "https://docs.google.com/spreadsheets/d/1SnsymujZI0dTpBkI67vS6BDxNjiNE4JKG4Y2ApDJqgM/edit#"	
	westPermitChrono = "https://docs.google.com/spreadsheets/d/1PDGOdbTNQYox2siTwWcLzMcw35kN1p_C1YK47zTgVUE/edit#"	
	centralPermitChrono = "https://docs.google.com/spreadsheets/d/1pAFnb9wz9m_b53I0CaudcisH8aNLhBCMYVpIJJMKT1s/edit#"	
	atlanticPermitChrono = "https://docs.google.com/spreadsheets/d/1OifSIpL1cD2uLDuAfS8QeX6c--2KKsJPwPDNz-jaHAU/edit#"	
	chronoInput = "https://docs.google.com/spreadsheets/d/1-bML_DrE8eNiJ2kUw4ppZRXvb5vrexITu0356WEcRoE/edit#"	
	westPermitCoastChrono = "https://docs.google.com/spreadsheets/d/1_0JIh4_mh8tvJBHy2Sg5rZcMT5sqYMe0G1taQU5OnYY/edit#"	
	eastPermitCoastChrono = "https://docs.google.com/spreadsheets/d/1kNJibprJFDrRmMtGpcOoWsDQOt7oA2v6fqx92282lmo/edit#"
	
	/*
		Updates the backlogs specified
	*/
	runUpdate(southWestBacklogs)
	runUpdate(legionBacklogs)
	runUpdate(newEngBacklogs)
	runUpdate(gritBacklogs)
	runUpdate(northCaliBacklogs)
	runUpdate(southCaliBacklogs)
	runUpdate(nisBacklogs)
	runUpdate(dealerBacklogs)
	runUpdate(westPermitBacklogs)
	runUpdate(centralPermitBacklogs)
	runUpdate(atlanticPermitBacklogs)
	runUpdate(vrAudit)
	runUpdate(cpQualityConBacklogs)
	runUpdate(permitQualityConBacklogs)
	runUpdate(qualityConPass)
	runUpdate(westCoastBacklogs)
	runUpdate(eastCoastBacklogs)
	
	send, ^w
	return
}

KeepAwake:
{
	MouseMove, 100, 1011
	sleep, 1000
	MouseMove, 20, 1011
	return
}

/* Functions Section
	
	/$$$$$$$$                              /$$     /$$                              
	| $$_____/                             | $$    |__/                              
	| $$    /$$   /$$ /$$$$$$$   /$$$$$$$ /$$$$$$   /$$  /$$$$$$  /$$$$$$$   /$$$$$$$
	| $$$$$| $$  | $$| $$__  $$ /$$_____/|_  $$_/  | $$ /$$__  $$| $$__  $$ /$$_____/
	| $$__/| $$  | $$| $$  \ $$| $$        | $$    | $$| $$  \ $$| $$  \ $$|  $$$$$$ 
	| $$   | $$  | $$| $$  | $$| $$        | $$ /$$| $$| $$  | $$| $$  | $$ \____  $$
	| $$   |  $$$$$$/| $$  | $$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$ /$$$$$$$/
	|__/    \______/ |__/  |__/ \_______/   \___/  |__/ \______/ |__/  |__/|_______/ 
	
	
	
*/

/* runUpdate() Explanation
	
	Updates the arrays of links used in autoUpdate:
*/
runUpdate(urlArray)
{
	missed := true ;Switch on and off for these reports
	while(missed) ;Filters the switch and also repeats failures
	{
		if(urlArray = %cpQC%)
		{
			Sleep, 60000
		}
		
		Loop % urlArray.Length()
		{
			run % urlArray[A_Index]
			if(update())
				missed := true
			else
				missed := false
}}}

/* update() Explanation
	
	First few if and while statements will loop until all conditions have been met.
	Primarily, it is double-checking that it is on a Salesforce page, the Chrono Input is open,
and that there are no errors with the Chrono Input. If there are errors, it'll continue looping
	until they're resolved. This can get the chrono stuck if Google Sheet's "Running Script" and other
	diagnostics messages do not come up.
	
	After all of the automated troubleshooting is completed, it'll run paste(), which will lead into the rest of the
	updating routine to happen. After pasting, it'll click the "Play" button then wait for the Google "Orange messages"
	to disappear. It'll check for a red message with waitRedMsg() and an orange message waitOrgMsg(), and will loop until they aren't found.
	These must return true to continue, meaning that the red or orange message have been dismissed or disappeared.
*/
update()
{
	accessDeniedImg = %A_WorkingDir%\images\google-btn-accessdenied.bmp
	accessChangedImg = %A_WorkingDir%\images\google-msg-AccessChanged.bmp
	rowErrorImg = %A_WorkingDir%\images\google-msg-RowError.bmp
	runningScriptCancel = %A_WorkingDir%\images\google-msg-RunningScriptWCancel.bmp
	runningScriptNoCancel	= %A_WorkingDir%\images\google-msg-RunningScriptWOCancel.bmp
	savingTimeout = %A_WorkingDir%\images\google-msg-SavingTimeout.bmp
	serviceError = %A_WorkingDir%\images\google-msg-ServiceError.bmp
	leaveButton = %A_WorkingDir%\images\google-btn-leave.bmp
	sheetsIcon = %A_WorkingDir%\images\google-newSheetsIcon.bmp
	dismissMsg = %A_WorkingDir%\images\google-msg-DismissRed.bmp
	
	sleep, 800
	if (maximizeCount = 0)
	{
		WinMaximize, A
		maximizeCount := ++maximizeCount
	}
	chromePageWait()
	missed := copy()
	
	/*
		If missed is truthy, proceed. Truthy, is anything not false, 0, NaN, undefined, null, or empty.
			This should be true after signIn() has been ran. It will return to the update() beginning, then run copy() again.
	*/
	if(missed)
	{
		return missed
	}      
	
	while(errorImageSearch(sheetsIcon, false)) ;check if spreadsheet open by green box
		Send, {F5}
	
	while(checkOrange()) ;wait till orange message gone, else ctrl+z run button again
	{
		send, ^z
		sleep, 800
		MouseClick, left, 1506, 324  ;Click play button
		sleep, 500
		MouseClick, left, 986, 134  ;Click cancel button
	}
	
	if(!checkColor(0x00079B, 1340, 310)) ;check if green-go box is red, if the box is red, clear the page  0x000099
	{
		loop 10
		{
			checkPopUp(0x0913CD, 1125, 304)  ;click clear red button 0x0808CB
			sleep, 800
			if(checkColor(0xF98D4B, 716, 604)) ; check for pop up missing script
			{
				send, {esc}
				continue
			}else  if(waitRedMsg())
			{
				send, {F5}
				sleep, 800
				chromePageWait()
				waitOrangeMsg()
				continue
			}
			else
				break
		}
		waitOrangeMsg()
	}
	
	/*
		End of checking for Salesforce and Chrono Input being ready.
	*/
	
	paste() ; Will just paste and return to continue down.
	
	if(!waitPaste(0x29782F, 1340, 310)) ;check if green-go box is green, else restart  0x1D7638
		return true
	Sleep, 500
	Loop
	{
		MouseClick, left, 1506, 324  ;Click play button
		if(waitRedMsg())
		{
			MsgBox,,, Error, .5
			send, {F5}
			sleep, 800
			chromePageWait()
			waitOrangeMsg()
			sleep, 2000
			MsgBox,,, here, 1
			continue
		}
		if(waitOrangeMsg())
		{
			MsgBox,,, Timed Out, 1
			Send, {F5}
			sleep, 800
			return true
		}
		else
			break
	}      
	
	errorImageSearch(leaveButton, true)
	errorImageSearch(accessDeniedImg, true)
	errorImageSearch(dismissMsg, true)
	
	return false
}

/* copy() Explanation
	
	This checks if you're logged into Salesforce or not.
	If updater not working, look here and use the debugger.
		While statement checks if color is not D49711 (Hex Color).
			Color is defined as white, so this is true, the loop will run.
	The statements marked with ;~ in this loop are for debugging and finding the color value for the While loop.
	At a specific coodinate, it'll check for the color C17D00. This is to make sure you're logged in.
	If you're not, it'll run the signIn function which will take you to okta to sign in.
		This is done by returning the missed variable as the signIn() back to update() then running through signIn() which will return true.
	The update() function should restart after this and redo copy().
	
	If it was not loaded properly, or not finding the right color, it'll loop and no pages will be copied.
		Once it has been found, a variable "found" gets set to true and a new loop starts.
	This second loop, white(found), will copy the salesforce page then search for "Grand Totals"
	if that is found, it closes the tab to the Google sheet Input.
*/
copy()
{
; Defining default color as white.
	color = 0x000000	
	while(color != 0xD49711) ;color != 0xD69A0A || salesforce blue; If white is not white.
	{
;~ MsgBox,,, NOT Blue!, .1
;~ MsgBox,,, %color% %x% %y% 
		PixelGetColor, color, 55, 136
		if(color = 0xC17D00)
		{
			MsgBox,,, You're not signed in, 2
			missed := signIn()
			return missed
		}
		Sleep, 100
	}
	chromePageWait()
	found := true
	While(found)
	{
		Send, ^a
		Sleep, 800
		Send, ^c
		ClipWait
		search = Grand Totals
		IfInString, Clipboard, %search%
		{
			found := false
;MsgBox, Found grand total
	}}
	Sleep, 500
	Send, ^w
}

/* paste() Explanation
		
	Simply pastes clipboard contents, then returns.
*/
paste()
{
	Send, ^v
	Sleep, 500
	clipboard = ; Empty the clipboard
	
	return
}

/* chromePageWait() Explanation
	
	Waits for Chrome to be open.
	
	while (A_Cursor != "Wait")
	{
		MsgBox, here
		continue
	}
*/
chromePageWait()
{
	Loop 20
	{
		if(A_Cursor = "AppStarting")
		{
			while (A_Cursor = "AppStarting")
			{
				Sleep, 100
			}
			return
		}
		Sleep, 50
	}
	Sleep, 500
}

/* waitRedBtn() Explanation
	
	Looks for a Red button somewhere in the middle of the page, not sure why.
*/
waitRedBtn()
{
	while(Color != 0x0000FF)
	{
		PixelGetColor, color, 967, 305
		Sleep, 100
	}
	Sleep, 100
}

/* waitOrangeMsg() Explanation
	
	Returns true if timeout on orange msg
	return false if orange msg disappeared or was never there
*/
waitOrangeMsg()
{
	Loop 10 ;loop till orange msg appears, else wait and dismiss
	{
;~ MsgBox,,, NOT Orange!, .1
;~ MsgBox,,, %color% %x% %y%
		PixelGetColor, color, 959, 137
		if(Color = 0xC1EFF8)  ;   0xBFEDF8
			break
		Sleep, 50
	}
	PixelGetColor, color, 959, 145
	if(Color = 0xC1EFF8) ;loop till orange message disapears
	{
		Loop 120
		{
;~ MsgBox,,, Orange, .1
			PixelGetColor, color, 959, 137
			if(Color != 0xC1EFF8)
				return false
			Sleep, 500
		}
		return true ;return true if timedout and orange msg never diasapeard
	}
	Sleep, 100
	return false ;return false if orange msg disapears or was never there.
}

/* waitRedMsg() Explanation
	
	Returns true if red msg found
	return false if no red msg found
*/
waitRedMsg()
{
	Loop 5 ;loop till orange msg appears, else wait and dismiss
	{
;~ MsgBox,,, RED, .5
		PixelGetColor, color, 959, 137
		if(Color = 0x394AD7)
			return true
		Sleep, 100
	}
	return false ;return false if orange msg disapears or was never there.
}

/* checkGreen() Explanation
	
	Checks for green coloring in the Chrono Input tab at a specific pixel location.
	This is specifically looking for the green of the Sheet page in the top left corner.
	When it is green, it'll return true and update() will continue. On false, it'll loop.
	
	Update Feb 2018
	Now looks for Google Sheets icon to be able to tell if Google Sheets.
*/
checkGreen()
{
	Loop 100
	{
;MsgBox,,, NOT Green!, .1
;PixelGetColor, color, 24, 106
		needle = %A_WorkingDir%\images\google-newSheetsIcon.bmp
		ImageSearch,,,0,0,A_ScreenWidth,A_ScreenHeight,needle
		if ErrorLevel ; Icon as of Feb 2018
			return false
		Sleep, 50
	}
	Sleep, 100
	return true
}

/* checkOrange() Explanation
	
	Will check at a specific coodinate if a color exists.
	I think it's looking for the Google "Running Script" message.
	If it does, it'll loop until it does not. When true, it'll undo what it did,
		clear the chrono input, and try again.
	On return false, the update() function will continue.
*/
checkOrange()
{
	Loop 100
	{
;MsgBox,,, NOT Orange!, .1
		PixelGetColor, color, 965, 142
		if(Color = 0xC1EFF8)  ; 0xBEEDF9
			break
		Sleep, 10
	}
	Sleep, 500
	Loop 600
	{
;MsgBox,,, NOT Orange!, .1
		PixelGetColor, color, 965, 142
		if(Color != 0xC1EFF8)  ; 0xBEEDF9
			return false
		Sleep, 50
	}
	return true
}

/* checkColor() Explanation
	
	Takes a color input at a specified location.
	It then checks if the color is that color at that location.
	It will return true or false.
	On false, it'll clear the Chrono Input and loop again.
*/
checkColor(checkColor, x, y)
{
	Loop 100
	{
		PixelGetColor, color, x, y
;~ MsgBox,,, %color% %x% %y%`, %checkColor%
		if(Color = checkColor)
			return true
		Sleep, 10
	}
	return false
}

/* checkColorWait() Explanation
	
	Takes a color input at a coordinate then checks if that color exists.
	This one waits a little longer than checkColor()
*/
checkColorWait(checkColor, x, y)
{
	Loop 200
	{
		PixelGetColor, color, x, y
;~ MsgBox,,, %color% %x% %y%`, %checkColor%
		if(Color = checkColor)
			return true
		Sleep, 50
	}
	return false
}

/* waitPaste() Explanation
	
	Waits for a color at a location before pasting.
*/
waitPaste(checkColor, x, y)
{
	Loop 400
	{
		send, {Home}
		PixelGetColor, color, x, y
;~ MsgBox,,, %color% %x% %y%`, %checkColor%
		if(Color = checkColor)
			return true
		Sleep, 50
	}
	return false
}

/* checkPopUp() Explanation
	
	Checks for a color in a popup. If the color is there, it'll click to resolve the popup.
	The returns are vestigial. When this function is called, the returns do not matter other than being there for safety.
*/
checkPopUp(checkColor, x, y)
{
	Loop 50
	{
		PixelGetColor, color, x, y
;~ MsgBox,,, %color% %x% %y%`, %checkColor%, .5
		if(Color = checkColor)
		{
;~ Sleep, 5000
			MouseClick, left, x, y
			Sleep, 500
			return true
		}
		Sleep, 50
	}
	return false
}

/* signIn() Explanation
	
	Signs in to okta
*/
signIn()
{
	okta = https://vivintsolar.okta.com/app/UserHome
	Run %okta%
	Sleep, 500
	popUp := true
	while(popUp)
	{
		popUp := checkPopUp2(0xCC8400, 839, 600)
		MouseMove, 835, 632
	}
	popUp := true
	while(popUp)
	{
		popUp := checkPopUp2(0xDB9C00, 486, 351)
	}
	
	popUp := true
	while(popUp)
	{
		popUp := checkPopUp2(0xD69A09, 57, 146)
	}
	closeTabs()
	return true
}

/* checkPopUp2() Explanation
	
	A sleepier checkPopUp function.
	Checks for a color in a popup. If the color is there, it'll click to resolve the popup.
	The returns are vestigial. When this function is called, the returns do not matter other than being there for safety.
*/
checkPopUp2(checkColor, x, y)
{
	Loop 50
	{
		PixelGetColor, color, x, y
		MouseMove, x, y
;~ MsgBox,,, %color% %checkColor%, 2
;~ MsgBox, %color% %checkColor%
		if(Color = checkColor)
		{
			Sleep, 500
			MouseClick, left, x, y
			Sleep, 500
			return false
		}
		Sleep, 50
	}
	return true
}

/* closeTabs() Explanation
	
	Closes tabs.
*/
closeTabs()
{
	WinActivate, ahk_class Chrome_WidgetWin_1
	Loop
	{
		WinGetTitle, title, A
		IfInString, title, New Tab
		break
		else
			Send, ^w
;~ Sleep, 800
		Loop 20
		{
			PixelGetColor, color, 280, 102
			if(Color = 0xFCFCFC)
			{
;MsgBox,,, NOT POP UP!, .1
				Sleep, 500
				MouseClick, left, 277, 106 
				Sleep, 500
				Send, ^w
				break
			}
			Sleep, 50
	}}
	return
}

/* errorImageSearch() Explanation
	An attempt at fixing a Google Sheet error.
*/
errorImageSearch(needleF, clickNeeded:=false)
{
	Loop 1
	{
		CoordMode, Pixel, Screen
		ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, %needleF%
		CenterImgSrchCoords(NeedleF, FoundX, FoundY)
		If ErrorLevel = 0 && clickNeeded = true ; If found and click needed, click it.
		{
			Click, %FoundX%, %FoundY% Left, 1
			return true
			break
		}
		else If ErrorLevel && clickNeeded = false ; If not found and click not needed.
		{
			Loop 1
			{
				SoundPlay, %A_WorkingDir%\sounds\FFVicShort.mid, 1
				return false
}}}}

/* CenterImgSrchCoords() Explanation
	Needed by errorImageSearch()
*/
CenterImgSrchCoords(File, ByRef CoordX, ByRef CoordY)
{
	static LoadedPic
	LastEL := ErrorLevel
	Gui, Pict:Add, Pic, vLoadedPic, %File%
	GuiControlGet, LoadedPic, Pict:Pos
	Gui, Pict:Destroy
	CoordX += LoadedPicW // 2
	CoordY += LoadedPicH // 2
	ErrorLevel := LastEL
}

/* Hotkeys Section
	
	/$$   /$$             /$$     /$$                                    
	| $$  | $$            | $$    | $$                                    
	| $$  | $$  /$$$$$$  /$$$$$$  | $$   /$$  /$$$$$$  /$$   /$$  /$$$$$$$
	| $$$$$$$$ /$$__  $$|_  $$_/  | $$  /$$/ /$$__  $$| $$  | $$ /$$_____/
	| $$__  $$| $$  \ $$  | $$    | $$$$$$/ | $$$$$$$$| $$  | $$|  $$$$$$ 
	| $$  | $$| $$  | $$  | $$ /$$| $$_  $$ | $$_____/| $$  | $$ \____  $$
	| $$  | $$|  $$$$$$/  |  $$$$/| $$ \  $$|  $$$$$$$|  $$$$$$$ /$$$$$$$/
	|__/  |__/ \______/    \___/  |__/  \__/ \_______/ \____  $$|_______/ 
	/$$  | $$          
	|  $$$$$$/          
	\______/           
*/

/* Pause Script Explanation
	
	Pauses the script during it's execution with ctrl+p
*/
^p::
{
	MsgBox, PAUSE
	return
}

/* Shutdown Script Explanation
	
	Closes the script entirely when ctrl+esc is pressed.
*/
^Esc::
{
	ExitApp
	Return
}

/* Archived Code
	
	/$$$$$$                      /$$       /$$                           /$$        /$$$$$$                  /$$          
	/$$__  $$                    | $$      |__/                          | $$       /$$__  $$                | $$          
	| $$  \ $$  /$$$$$$   /$$$$$$$| $$$$$$$  /$$ /$$    /$$ /$$$$$$   /$$$$$$$      | $$  \__/  /$$$$$$   /$$$$$$$  /$$$$$$ 
	| $$$$$$$$ /$$__  $$ /$$_____/| $$__  $$| $$|  $$  /$$//$$__  $$ /$$__  $$      | $$       /$$__  $$ /$$__  $$ /$$__  $$
	| $$__  $$| $$  \__/| $$      | $$  \ $$| $$ \  $$/$$/| $$$$$$$$| $$  | $$      | $$      | $$  \ $$| $$  | $$| $$$$$$$$
	| $$  | $$| $$      | $$      | $$  | $$| $$  \  $$$/ | $$_____/| $$  | $$      | $$    $$| $$  | $$| $$  | $$| $$_____/
	| $$  | $$| $$      |  $$$$$$$| $$  | $$| $$   \  $/  |  $$$$$$$|  $$$$$$$      |  $$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$
	|__/  |__/|__/       \_______/|__/  |__/|__/    \_/    \_______/ \_______/       \______/  \______/  \_______/ \_______/
	
	
	
	Discovery the mystery of this code!
	
	
;~ ;******************************************************************************************************
;~ /*
;~ Individual 
;~ */
;~ ^1::
;~ {
;~ openTabs(swChrono, sw1, sw2, sw3, sw4, swB1, swB2, swB3, swB4)
;~ update()
;~ Return
;~ }
;~ ^2::
;~ {
;~ openTabs(e3Chrono, e31, e32, e33, e34, e3B1, e3B2, e3B3, e3B4)
;~ update()
;~ Return
;~ }
;~ ^3::
;~ {
;~ openTabs(e2Chrono, e21, e22, e23, e24, e2B1, e2B2, e2B3, e2B4)
;~ update()
;~ Return
;~ }
;~ ^4::
;~ {
;~ openTabs(e1Chrono, e11, e12, e13, e14, e1B1, e1B2, e1B3, e1B4)
;~ update()
;~ Return
;~ }
;~ ^5::
;~ {
;~ openTabs(noChrono, no1, no2, no3, no4, noB1, noB2, noB3, noB4)
;~ update()
;~ Return
;~ }
;~ ^6::
;~ {
;~ openTabs(so1Chrono, so1, so2, so3, so4, soB1, soB2, soB3, soB4)
;~ update()
;~ Return
;~ }
*/