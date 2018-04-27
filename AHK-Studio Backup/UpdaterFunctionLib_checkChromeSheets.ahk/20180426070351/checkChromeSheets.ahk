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
				MsgBox, , error, Please open the Chrono Input's page then press okay
			}
		}
	}
}