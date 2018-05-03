;#Include %A_ScriptDir%\UpdaterFunctionLib\checkSalesforceReport.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\checkChromeStatus.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\checkColors.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\copyPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\clickPlayButton.ahk

runUpdate(urlArray, successfulRuns)
{
	for i, salesforceLink in urlArray
	{
		ToolTip % "Opening " . urlArray[A_Index], 0, 0
		openURL(urlArray[A_Index])
		Sleep, 10000
		
		ToolTip % "Checking Salesforce Tab Status", 0, 0
		if((chromeTabLoading(urlArray[A_Index])) = false)
		{
			ToolTip % urlArray[A_Index] . " took too long to load", 0, 0
			Continue
		}
		
		ToolTip % "Copying Salesforce Report " . urlArray[A_Index], 0, 0
		copy()
		
		ToolTip % "Checking if in Google Sheet", 0, 0
		chromeSheetCheck()		
		Sleep, 2000
		
		ToolTip % "Checking if updater needs to be cleared", 0, 0
		if (isThereGreen() = true)
		{
			ToolTip % "Clearing Updater, old data got stuck.", 0, 0
			MouseClick, Left, 1226, 314, 1
			;MouseMove, 1226, 314
		}
		Sleep, 2000
		if (Clipboard != "")
		{
			ToolTip % "Pasting data", 0, 0
			paste()
			Sleep, 5000
			redChecks = 0
			while (isThereRed() = true || redChecks != 100)
			{
				ToolTip % "Waiting for red to go away on playbutton", 0, 0
				Sleep, 10
				redChecks++
			}
			if(redChecks = 100)
			{
				ToolTip % "AutoUpdater got stuck. Ejecting this check.", 0, 0
			}
			ToolTip % "Sending backlog!", 0, 0
			Sleep, 500
			clickPlayButton()		
			successfulRuns := showSuccessfulCount(successfulRuns)
			Continue
		}
	}
	return successfulRuns
}

openURL(urlToOpen)
{
	run, %urlToOpen%
	return
}

showSuccessfulCount(successfulRuns)
{
	successfulRuns += 1
	ToolTip % "Successful Updates: " . successfulRuns, 0, 50, 2	
	return successfulRuns
}