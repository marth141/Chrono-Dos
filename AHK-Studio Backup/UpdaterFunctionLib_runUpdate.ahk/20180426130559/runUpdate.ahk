;#Include %A_ScriptDir%\UpdaterFunctionLib\checkSalesforceReport.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\checkChromeSheets.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\waitPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\copyPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\clickPlayButton.ahk

runUpdate(urlArray)
{
	for i, salesforceLink in urlArray
	{
		ToolTip % "Opening " . urlArray[A_Index], 0, 0
		openURL(urlArray[A_Index])
		Sleep, 10000
		
		ToolTip % "Checking Salesforce Tab Status", 0, 0
		chromeTabLoading(urlArray[A_Index])
		
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
		}
		Sleep, 2000
		if (Clipboard != "")
		{
			ToolTip % "Pasting data", 0, 0
			paste()
			Sleep, 5000
			while (isThereRed() = true)
			{
				ToolTip % "Waiting for red to go away on playbutton", 0, 0
				Sleep, 10
			}
			ToolTip % "Sending backlog!", 0, 0
			clickPlayButton()
			Continue
		}
	}
	return
}

openURL(urlToOpen)
{
	run, %urlToOpen%
	return
}