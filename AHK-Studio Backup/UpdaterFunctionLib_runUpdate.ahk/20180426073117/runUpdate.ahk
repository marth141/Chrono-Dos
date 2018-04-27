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
		chromeTabLoading()
		
		ToolTip % "Copying Salesforce Report", 0, 0
		copy()
		
		ToolTip % "Checking if in Google Sheet", 0, 0
		chromeSheetCheck()		
		Sleep, 2000
		
		if (isThereGreen() = true)
		{
			ToolTip % "Clearing Updater", 0, 0
			MouseClick, Left, 1226, 314, 1
		}
		if (Clipboard != "")
		{
			paste()
			Sleep, 5000
			while (isThereGreen() = false)
			{
				Sleep, 10
			}
			clickPlayButton()
			break
		}
	}
}

openURL(urlToOpen)
{
	run, %urlToOpen%
}