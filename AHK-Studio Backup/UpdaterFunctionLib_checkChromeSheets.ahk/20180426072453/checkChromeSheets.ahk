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
		Sleep, 30000
		IfWinActive, Untitled - Google Chrome
		{
			Send, ^w   
			clipboard = ; Empty the clipboard 
			return
		}
	}
}