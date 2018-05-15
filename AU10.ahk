#Persistent
#Include %A_ScriptDir%\UpdaterFunctionLib\globals.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\runUpdateONE.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\runUpdateQCSREE.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\checkColors.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\copyPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\clickPlayButton.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\checkForClear.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\postPasteColorCheck.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\salesforceLoading.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\urlOpener.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\successfulRunCounter.ahk

AutoUpdate:
{
	SetTitleMatchMode, 2
	CoordMode, Mouse, Screen
	CoordMode, Pixel, Screen
	CoordMode, ToolTip, Screen
	;ToolTip % "Running SQL", 0, 0
	;runSQLUpdate()		
	successfulRuns = 0
	ToolTip % "Checking if in Chrono Inputter", 0, 30
	WinActivate, Chrono ONE Updater
	IfWinNotActive, Chrono ONE Updater
	{
		ToolTip % "Opening Chrono Inputter", 0, 30
		run, %chronoONEUpdater%
		Sleep, 10000
	}
	IfWinActive, Chrono ONE Updater
	{		
		Loop
		{
			ToolTip % "Running Updates", 0, 0			
			successfulRuns := runUpdateONE(departmentProposalReport, successfulRuns)
			successfulRuns := runUpdateONE(departmentSnowPropReport, successfulRuns)
			successfulRuns := runUpdateONE(departmentPropReDeReport, successfulRuns)
			successfulRuns := runUpdateONE(departmentPart1DesReport, successfulRuns)
			
			successfulRuns := runUpdateONE(nisProposalReport, successfulRuns)
			successfulRuns := runUpdateONE(nisSnowPropReport, successfulRuns)
			successfulRuns := runUpdateONE(nisPropReDeReport, successfulRuns)
			successfulRuns := runUpdateONE(nisPart1DesReport, successfulRuns)
			
			successfulRuns := runUpdateONE(dealerProposalReport, successfulRuns)
			successfulRuns := runUpdateONE(dealerSnowPropReport, successfulRuns)
			successfulRuns := runUpdateONE(dealerPropReDeReport, successfulRuns)
			successfulRuns := runUpdateONE(dealerPart1DesReport, successfulRuns)
			Sleep, 6000
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
