checkSQLUpdateFinished()
{
	Loop
	{
		IfWinNotActive, cmd
		{
			break
		}
	}
}

checkTimeAfterFive()
{
	if (A_hour < 5)
	{
		Throw "Don't run before 5AM."
	}
	else
	{
		return
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
		chronoOpened:= ++chronoOpened
	}
}

checkIfEverMaximized()
{
	if (maximizeCount = 0)
	{
		WinMaximize, A
		maximizeCount := ++maximizeCount
		Return
	}
	else
	{
		Return
	}
}

checkChromeStarting()
{
	Loop 20
	{
		if(A_Cursor = "AppStarting")
		{
			while (A_Cursor = "AppStarting")
			{
				Sleep, 100
			}
		}
	}
	Sleep, 500
	Return
}

checkForImage(image, clickNeeded:=false)
{
	Loop 1
	{
		CoordMode, Pixel, Screen
		ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, %image%
		CenterImgSrchCoords(image, FoundX, FoundY)
		if (ErrorLevel = 2)
		{
			Throw "Could not conduct search"
		}
		else if (ErrorLevel = 1)
		{
			Throw "Could not find image"
		}
		else if (ErrorLevel = 0 && clickNeeded = true)
		{
			Click, %FoundX%, %FoundY% Left, 1
			return true
		}
		else if (ErrorLevel = 0 && clickNeeded = false)
		{
			return true
		}
		else
		{
			Throw "Not sure what went wrong with Image search"
		}
	}
}

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

checkSalesforceSignIn()
{
	signOnImage = %A_WorkingDir%\images\salesforce-sign-on-image.bmp
	if (checkForImage(signOnImage, false) = true)
	{
		MsgBox, You must be signed in.
		return false
	}
	else if (checkForImage(signOnImage, false) = false)
	{
		return true
	}
}