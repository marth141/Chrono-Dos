checkForClear()
{
	if (isThereGreen() = true)
	{
		ToolTip % "Clearing Updater, old data got stuck.", 0, 30
		MouseClick, Left, 1226, 314, 1
			;MouseMove, 1226, 314
	}
}

clearAtStart()
{
	ToolTip % "Clearing Updater.", 0, 30
	MouseClick, Left, 1226, 314, 1
		;MouseMove, 1226, 314
}