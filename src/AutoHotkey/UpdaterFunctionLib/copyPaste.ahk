copy()
{
	found := false
	While(found = false)
	{
		grandTotals := "Grand Totals"
		unavailable := "Data Not Available"
		salesforceError := "Unable to Process"
		Sleep, 2000
		SendInput, ^a
		Sleep, 1000
		SendInput, ^c
		ClipWait, 2
		IfInString, Clipboard, %grandTotals%
		{
			ToolTip % "Found Grand Totals!", 0, 30
			found := true
		}
		else IfInString, Clipboard, %unavailable%
		{
			ToolTip % "You don't have permission for this report. Skipping.", 0, 30
			Sleep, 1000
			clipboard = ; Empty the clipboard
			break
		}
		else IfInString, Clipboard, %salesforceError%
		{
			ToolTip % "Something went wrong. Skipping.", 0, 30
			Sleep, 1000
			clipboard = ; Empty the clipboard
			break
		}
	}
	ToolTip % "Closing Salesforce", 0, 30
	Sleep, 500
	SendInput, ^w
	return
}

paste()
{
	Sleep, 1000
	MouseClick, Left, 93, 265, 1
	MouseMove, 93, 265
	Sleep, 2000
	SendInput, ^v
	ToolTip % "Pasted the backlog", 0, 30
	Sleep, 4000
	MouseClick, Left, 93, 265, 1
	MouseMove, 93, 265
	clipboard = ; Empty the clipboard
}
