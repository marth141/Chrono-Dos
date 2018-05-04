#Persistent
#Include %A_ScriptDir%\UpdaterFunctionLib\globals.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\runUpdate.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\refreshGoogleSheets.ahk

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
			successfulRuns := runUpdate(westCoastPermitBacklogs, successfulRuns)
			successfulRuns := runUpdate(eastCoastPermitBacklogs, successfulRuns)
			successfulRuns := runUpdate(northCaliBacklogs, successfulRuns)
			successfulRuns := runUpdate(southCaliBacklogs, successfulRuns)
			successfulRuns := runUpdate(southWestBacklogs, successfulRuns)
			successfulRuns := runUpdate(gritBacklogs, successfulRuns)
			successfulRuns := runUpdate(newEngBacklogs, successfulRuns)
			successfulRuns := runUpdate(legionBacklogs, successfulRuns)
			successfulRuns := runUpdate(nisBacklogs, successfulRuns)
			successfulRuns := runUpdate(dealerBacklogs, successfulRuns)
			successfulRuns := runUpdate(vrAudit, successfulRuns)
			successfulRuns := runUpdate(cpQualityConBacklogs, successfulRuns)
			successfulRuns := runUpdate(permitQualityConBacklogs, successfulRuns)
			successfulRuns := runUpdate(qualityConPass, successfulRuns)
			successfulRuns := runUpdate(structrualEscalations, successfulRuns)
			successfulRuns := runUpdate(structrualEscalationsNonFullProcess, successfulRuns)
			successfulRuns := runUpdate(electricalEscalations, successfulRuns)	
			successfulRuns := runUpdate(DINCPnPPProd, successfulRuns)
			successfulRuns := runUpdate(PPSubmitted, successfulRuns)
			Send, ^{F5}
			Sleep, 6000
			Send, +{F5}
			Sleep, 6000
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
