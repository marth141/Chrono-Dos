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
			runUpdate(southWestBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(legionBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(newEngBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(gritBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(northCaliBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(southCaliBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(nisBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(dealerBacklogs)
			showSuccessfulCount(successfulRuns)
			;runUpdate(westOldPermitBacklogs)
			;runUpdate(centralOldPermitBacklogs)
			;runUpdate(atlanticOldPermitBacklogs)
			runUpdate(vrAudit)
			showSuccessfulCount(successfulRuns)
			runUpdate(cpQualityConBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(permitQualityConBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(qualityConPass)
			showSuccessfulCount(successfulRuns)
			runUpdate(westCoastPermitBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(eastCoastPermitBacklogs)
			showSuccessfulCount(successfulRuns)
			runUpdate(structrualEscalations)
			showSuccessfulCount(successfulRuns)
			runUpdate(structrualEscalationsNonFullProcess)
			showSuccessfulCount(successfulRuns)
			runUpdate(electricalEscalations)						
			showSuccessfulCount(successfulRuns)
		}
	}
}

showSuccessfulCount(successfulRuns)
{
	successfulRuns += 1
	ToolTip % successfulRuns, 0, 50, 2	
	return
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
