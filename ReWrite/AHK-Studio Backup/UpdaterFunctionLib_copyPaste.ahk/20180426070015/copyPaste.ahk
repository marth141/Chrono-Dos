copy()
{
	found := false
	While(found = false)
	{
		chromeTabLoading()
		Send, ^a
		Sleep, 800
		Send, ^c
		ClipWait, 2
		grandTotals = Grand Totals
		unavailable = Data Not Available
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

chromeTabLoading()
{
	IfWinActive, Untitled - Google Chrome
	{
		Sleep, 30000
		IfWinActive, Untitled - Google Chrome
		{
			Send, ^w   
		}
	}
}

closePage:
{
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
