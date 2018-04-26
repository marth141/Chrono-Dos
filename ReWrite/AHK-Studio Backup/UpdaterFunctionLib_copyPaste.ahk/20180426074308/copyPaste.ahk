copy()
{
	found := false
	While(found = false)
	{
		grandTotals = Grand Totals
		unavailable = Data Not Available
		Sleep, 2000
		Send, ^a
		Sleep, 1000
		Send, ^c
		ClipWait, 2		
		IfInString, Clipboard, %grandTotals%
		{
			ToolTip % "Found Grand Totals!", 0, 0
			found := true
		}
		else IfInString, Clipboard, %unavailable%
		{
			ToolTip % "You don't have permission for this report. Skipping.", 0, 0
			clipboard = ; Empty the clipboard   
			break
		}
	}
	ToolTip % "Closing Salesforce", 0, 0
	Sleep, 500
	Send, ^w   
}

paste()
{
	Sleep, 1000
	MouseClick, Left, 93, 257, 1
	Sleep, 2000
	Send, ^v
	Sleep, 4000
	MouseClick, Left, 93, 257, 1
	clipboard = ; Empty the clipboard   
}
