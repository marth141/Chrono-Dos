#Include %A_ScriptDir%\UpdaterFunctionLib\checkChronoONEStatus.ahk

runUpdateONE(urlArray, successfulRuns)
{
	for i, salesforceLink in urlArray
	{
		ToolTip % "Opening " . urlArray[A_Index], 0, 30
		openURL(urlArray[A_Index])
		Sleep, 10000

		ToolTip % "Checking Salesforce Tab Status", 0, 30
		Sleep, 500
		if((chromeTabLoading(urlArray[A_Index])) = false)
		{
			ToolTip % urlArray[A_Index] . " took too long to load", 0, 30
			Sleep, 1000
			Continue
		}
		
		ToolTip % "Copying Salesforce Report " . urlArray[A_Index], 0, 30
		copy()

		ToolTip % "Checking if in Google Sheet", 0, 30
		Sleep, 500
		chronoONECheck()		
		Sleep, 2000

		ToolTip % "Checking if updater needs to be cleared", 0, 30
		Sleep, 500
		checkForClear()
		Sleep, 2000

		if (Clipboard != "")
		{
			ToolTip % "Pasting data", 0, 30
			paste()
			Sleep, 5000

			stuckStatus := postPasteColorCheck()

			if(stuckStatus = true)
			{
				ToolTip % "AutoUpdater got stuck. Ejecting this check.", 0, 30
				Sleep, 1000
				Continue
			}

			Sleep, 10000
			ToolTip % "Sending backlog!", 0, 30
			Sleep, 500
			clickPlayButton()
			Sleep, 17000
			successfulRuns := showSuccessfulCount(successfulRuns)
			Continue
		}
	}
	return successfulRuns
}
