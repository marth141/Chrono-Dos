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
			found := true
		}
		else IfInString, Clipboard, %unavailable%
		{
			clipboard = ; Empty the clipboard   
			break
		}
	}
	Sleep, 500
	Send, ^w   
}

paste()
{
	Sleep, 1000
	MouseClick, Left, 93, 257, 1
	Sleep, 1000
	Send, ^v
	Sleep, 1000
	MouseClick, Left, 93, 257, 1
	clipboard = ; Empty the clipboard   
	return
}
