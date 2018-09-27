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

			;Tested to work
			clearAtStart()
			successfulRuns := runUpdateONE(chronoDOS, successfulRuns)
			successfulRuns := runUpdateONE(CPQCD, successfulRuns)
			successfulRuns := runUpdateONE(PPQCD, successfulRuns)
			successfulRuns := runUpdateONE(PPSubmitted, successfulRuns)
			successfulRuns := runUpdateONE(CP_and_PP_DIN, successfulRuns)
			successfulRuns := runUpdateONE(electricalEscalations, successfulRuns)
			successfulRuns := runUpdateONE(Permit_Outsource, successfulRuns)
			successfulRuns := runUpdateONE(qualityConPass, successfulRuns)
			successfulRuns := runUpdateONE(structrualEscalationsReports, successfulRuns)
			successfulRuns := runUpdateONE(electricalEscalations, successfulRuns)

			;Broken in Google
			;None right now

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
