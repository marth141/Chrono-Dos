#Persistent
#Include %A_ScriptDir%\UpdaterFunctionLib\globals.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\runUpdate.ahk

AutoUpdate:
{
	SetTitleMatchMode, 2
	CoordMode, Mouse, Screen
	CoordMode, Pixel, Screen
	CoordMode, ToolTip, Screen
	;ToolTip % "Running SQL", 0, 0
	;runSQLUpdate()		
	successfulRuns = 0
	ToolTip % "Checking if in Chrono Inputter", 0, 0
	WinActivate, Chrono Inputs
	IfWinNotActive, Chrono Inputs
	{
		ToolTip % "Opening Chrono Inputter", 0, 0
		run, %chronoInput%
		Sleep, 10000
	}
	IfWinActive, Chrono Inputs
	{		
		Loop
		{
			ToolTip % "Running Updates", 0, 0			
			runUpdate(southWestBacklogs, successfulRuns)
			runUpdate(legionBacklogs, successfulRuns)
			runUpdate(newEngBacklogs, successfulRuns)
			runUpdate(gritBacklogs, successfulRuns)
			runUpdate(northCaliBacklogs, successfulRuns)
			runUpdate(southCaliBacklogs, successfulRuns)
			runUpdate(nisBacklogs, successfulRuns)
			runUpdate(dealerBacklogs, successfulRuns)
			;runUpdate(westOldPermitBacklogs)
			;runUpdate(centralOldPermitBacklogs)
			;runUpdate(atlanticOldPermitBacklogs)
			runUpdate(vrAudit, successfulRuns)
			runUpdate(cpQualityConBacklogs, successfulRuns)
			runUpdate(permitQualityConBacklogs, successfulRuns)
			runUpdate(qualityConPass, successfulRuns)
			runUpdate(westCoastPermitBacklogs, successfulRuns)
			runUpdate(eastCoastPermitBacklogs, successfulRuns)
			runUpdate(structrualEscalations, successfulRuns)
			runUpdate(structrualEscalationsNonFullProcess, successfulRuns)
			runUpdate(electricalEscalations, successfulRuns)						
		}
	}
}

^p::
{
	MsgBox, PAUSE
	return
}

^Esc::
{
	ExitApp
	Return
}
