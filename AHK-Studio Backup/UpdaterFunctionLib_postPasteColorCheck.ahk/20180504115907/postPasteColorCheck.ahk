postPasteColorCheck()
{
	redChecks = 0
	while (redChecks != 100)
	{
		ToolTip % "Waiting for red to go away on playbutton", 0, 0
		if (isThereRed() = true)
		{
			Sleep, 10
		}
		else if (isThereRed() = false)
		{
			Break
			return false
		}
		redChecks++
	}
	if(redChecks = 100)
	{		
		return true
	}
}