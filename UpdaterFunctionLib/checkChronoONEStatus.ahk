chronoONECheck()
{
	IfWinActive, Chrono ONE Updater
	{
		ToolTip % "In Chrono Inputs.", 0, 30
		return
	}
	else
	{		
		while((IfWinNotActive, Chrono ONE Updater) = true)
		{					
			ToolTip % "Going to try activating Chrono Input", 0, 30
			try
			{
				ToolTip % "Activating CHrono Inputs", 0, 30
				WinActivate, Chrono ONE Updater
				Break
			}
			catch e
			{
				ToolTip % "Reopening Chrono Inputs", 0, 30
				run, %chronoONEUpdater%
				Break
			}			
		}
		return
	}
}
