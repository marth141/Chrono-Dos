#Persistent
#Include %A_ScriptDir%\UpdaterFunctionLib

AutoUpdate:
{
	SetTitleMatchMode, 2
	;runSQLUpdate()
	IfWinNotActive, Chrono Inputs - Google Sheets - Google Chrome
	{
		run, %chronoInput%
	}
	else
	{		
		Sleep, 10000		
		Loop
		{
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
			runUpdate(electricalEscalations)
			runUpdate([structrualEscalations, structrualEscalationsNonFullProcess])
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
