postPasteColorCheck()
{
	redChecks = 0
	while (redChecks != 100)
	{
		ToolTip % "Waiting for red to go away on playbutton", 0, 30
		if (isThereRed() = true)
		{
			Sleep, 1000
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