chromeTabLoading(backlogLink)
{
	IfWinActive, Untitled - Google Chrome
	{
		ToolTip % "Is Salesforce loading? I'll wait 30 seconds.", 0, 30
		Sleep, 30000
		IfWinActive, Untitled - Google Chrome
		{
			ToolTip % "Salesforce never loaded, skipping.", 0, 30
			Send, ^w   
			clipboard = ; Empty the clipboard 
			return false
		}
		else IfWinActive, Salesforce - Unlimited Edition - %backlogLink%
		{
			ToolTip % "Salesforce loaded!.", 0, 30
			return true
		}
	}
}