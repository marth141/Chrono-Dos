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
	ToolTip % "Checking if in Chrono Inputter", 0, 30
	WinActivate, Chrono Lite
	IfWinNotActive, Chrono Lite
	{
		ToolTip % "Opening Chrono Inputter", 0, 30
		run, %chronoInput%
		Sleep, 10000
	}
	IfWinActive, Chrono Lite
	{		
		Loop
		{
			ToolTip % "Running Updates", 0, 0			
			successfulRuns := runUpdate(departmentProposalReport, successfulRuns)
			successfulRuns := runUpdate(departmentSnowPropReport, successfulRuns)
			successfulRuns := runUpdate(departmentPropReDeReport, successfulRuns)
			successfulRuns := runUpdate(departmentPart1DesReport, successfulRuns)
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
