
#Persistent
#Include globals.ahk
#Include utilities.ahk
#Include update.ahk
SetTimer, AutoUpdate, 900000
SetTimer, KeepAwake, 600000

AutoUpdate:
{
	SetTitleMatchMode, 2
	chronoOpened:= 0
	checkSQLUpdateFinished()
	checkTimeAfterFive()
	updateEmployeeDB()	
	
	runUpdate(southWestBacklogs)
	runUpdate(legionBacklogs)
	runUpdate(newEngBacklogs)
	runUpdate(gritBacklogs)
	runUpdate(northCaliBacklogs)
	runUpdate(southCaliBacklogs)
	runUpdate(nisBacklogs)
	runUpdate(dealerBacklogs)
	runUpdate(westOldPermitBacklogs)
	runUpdate(centralOldPermitBacklogs)
	runUpdate(atlanticOldPermitBacklogs)
	runUpdate(vrAudit)
	runUpdate(cpQualityConBacklogs)
	runUpdate(permitQualityConBacklogs)
	runUpdate(qualityConPass)
	runUpdate(westCoastPermitBacklogs)
	runUpdate(eastCoastPermitBacklogs)
	
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

runUpdate(urlArray)
{
	issue:= true
	while (missed)
	{		
		for i, backlog in urlArray
		{
			run % urlArray[A_Index]
			if (update())
			{
				issue := true
			}
			else
			{
				issue := false
			}
		}
	}
}

copy()
{
	if (checkSalesforceSignIn() = false)
	{
		Throw, "Please log in."
	}
	else (checkSalesforceSignIn() = true)
	{
		signedIn:= true
	}
	checkChromeStarting()
	While (signedIn = true)
	{
		Send, ^a
		Sleep, 500
		Send, ^c

		searchFor:= "Grand Totals"
		ClipWait, 2
		IfInString, Clipboard, %searchFor%
		{
			break
		}
		else
		{
			Throw "Could not copy full backlog"
			return false
		}
	}
	Sleep, 500
	Send, ^w
	return true
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