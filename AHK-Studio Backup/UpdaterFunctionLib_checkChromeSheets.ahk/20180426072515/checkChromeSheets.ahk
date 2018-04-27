chromeSheetCheck()
{
	Loop
	{
		IfWinActive, Chrono Inputs - Google Sheets - Google Chrome
		{
			break
		}
		else IfWinNotActive, Chrono Inputs - Google Sheets - Google Chrome
		{
			try
			{
				WinActivate, Chrono Inputs - Google Sheets - Google Chrome
				break
			}
			catch e
			{
				
				run, %chronoInput%
				Continue
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
			ToolTip % "Salesforce never loaded. Skipping.", 0, 0
			Send, ^w   
			clipboard = ; Empty the clipboard 
			return
		}
	}
}