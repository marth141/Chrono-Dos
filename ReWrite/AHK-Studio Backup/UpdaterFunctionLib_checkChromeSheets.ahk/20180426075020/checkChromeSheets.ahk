chromeSheetCheck()
{
	while(IfWinNotActive, Chrono Inputs - Google Sheets - Google Chrome = true)
		IfWinActive, Chrono Inputs - Google Sheets - Google Chrome
		{
			ToolTip % "In Chrono Inputs.", 0, 0
			return
		}
	else IfWinNotActive, Chrono Inputs - Google Sheets - Google Chrome
	{
		ToolTip % "Going to try activating Chrono Input", 0, 0
		try
		{
			ToolTip % "Activating CHrono Inputs", 0, 0
			WinActivate, Chrono Inputs - Google Sheets - Google Chrome
			return
		}
		catch e
		{
			ToolTip % "Reopening Chrono Inputs", 0, 0
			run, %chronoInput%
			return
		}
	}
}
}

chromeTabLoading()
{
	IfWinActive, Untitled - Google Chrome
	{
		ToolTip % "Is Salesforce loading? I'll wait 30 seconds.", 0, 0
		Sleep, 30000
		IfWinActive, Untitled - Google Chrome
		{
			ToolTip % "Salesforce never loaded, skipping.", 0, 0
			Send, ^w   
			clipboard = ; Empty the clipboard 
			return
		}
		else
		{
			ToolTip % "Salesforce loaded!.", 0, 0
			return
		}
	}
}