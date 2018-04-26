#Persistent
#Include %A_ScriptDir%\UpdaterFunctionLib\globals.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\runUpdate.ahk

AutoUpdate:
{
	SetTitleMatchMode, 2
	CoordMode, Mouse, Screen
	CoordMode, Pixel, Screen
	CoordMode, ToolTip, Screen
	SendMode, Play
	;ToolTip % "Running SQL", 0, 0
	;runSQLUpdate()
	ToolTip % "Checking if in Chrono Inputter", 0, 0
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
			runUpdate(legionBacklogs)
			runUpdate(newEngBacklogs)
			runUpdate(gritBacklogs)
			runUpdate(northCaliBacklogs)
			runUpdate(southCaliBacklogs)
			runUpdate(nisBacklogs)
			runUpdate(dealerBacklogs)
			;runUpdate(westOldPermitBacklogs)
			;runUpdate(centralOldPermitBacklogs)
			;runUpdate(atlanticOldPermitBacklogs)
			runUpdate(vrAudit)
			runUpdate(cpQualityConBacklogs)
			runUpdate(permitQualityConBacklogs)
			runUpdate(qualityConPass)
			runUpdate(westCoastPermitBacklogs)
			runUpdate(eastCoastPermitBacklogs)
			runUpdate(structrualEscalations)
			runUpdate(structrualEscalationsNonFullProcess)
			runUpdate(electricalEscalations)						
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
