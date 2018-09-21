chronoInputsCheck()
{
	IfWinActive, Chrono Inputs
	{
		ToolTip % "In Chrono Inputs.", 0, 30
		return
	}
	else
	{		
		while((IfWinNotActive, Chrono Inputs) = true)
		{					
			ToolTip % "Going to try activating Chrono Input", 0, 30
			try
			{
				ToolTip % "Activating CHrono Inputs", 0, 30
				WinActivate, Chrono Inputs
				Break
			}
			catch e
			{
				ToolTip % "Reopening Chrono Inputs", 0, 30
				run, %chronoInput%
				Break
			}			
		}
		return
	}
}
