#Persistent
;#Include %A_ScriptDir%\SimplifiedIntentions\runSQLUpdate.ahk
#Include %A_ScriptDir%\globals.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\runUpdate.ahk

AutoUpdate:
{
	SetTitleMatchMode, 2
	;runSQLUpdate()
	run, %chronoInput%
	
	runUpdate(southWestBacklogs)
	runUpdate(legionBacklogs)
	runUpdate(newEngBacklogs)
	runUpdate(gritBacklogs)
	runUpdate(northCaliBacklogs)
	runUpdate(southCaliBacklogs)
	runUpdate(nisBacklogs)
	runUpdate(dealerBacklogs)
	runUpdate(westOldPermitBacklogs)
	runUpdate(centralOldPermitBacklogs)
	runUpdate(atlanticOldPermitBacklogs)
	runUpdate(vrAudit)
	runUpdate(cpQualityConBacklogs)
	runUpdate(permitQualityConBacklogs)
	runUpdate(qualityConPass)
	runUpdate(westCoastPermitBacklogs)
	runUpdate(eastCoastPermitBacklogs)
	
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
