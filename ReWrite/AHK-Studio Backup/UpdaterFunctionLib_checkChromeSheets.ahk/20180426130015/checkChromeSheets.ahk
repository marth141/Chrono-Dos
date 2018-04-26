chromeSheetCheck()
{
	IfWinActive, Chrono Inputs - Google Sheets - Google Chrome
	{
		ToolTip % "In Chrono Inputs.", 0, 0
		return
	}
	else
	{		
		while((IfWinNotActive, Chrono Inputs - Google Sheets - Google Chrome) = true)
		{					
			ToolTip % "Going to try activating Chrono Input", 0, 0
			try
			{
				ToolTip % "Activating CHrono Inputs", 0, 0
				WinActivate, Chrono Inputs - Google Sheets - Google Chrome
				Break
			}
			catch e
			{
				ToolTip % "Reopening Chrono Inputs", 0, 0
				run, %chronoInput%
				Break
			}			
		}
		return
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
		else IfWinActive, Salesforce - Unlimited Edition - 
		{
			ToolTip % "Salesforce loaded!.", 0, 0
			return
		}
	}
}