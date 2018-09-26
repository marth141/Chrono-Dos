﻿; This script was created using Pulover's Macro Creator
; www.macrocreator.com

#NoEnv
SetWorkingDir %A_ScriptDir%

F3::
Macro1:
; Needle := "%CD%\images\google-btn-accessdenied.bmp"
Needle = %A_WorkingDir%\images\google-btn-accessdenied.bmp
MyFunc(Needle)
Return

MyFunc(NeedleF)
{
Loop
{
CoordMode, Screen
ImageSearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, *w%scale% *h-1 %NeedleF%
CenterImgSrchCoords(NeedleF, x, y)
If ErrorLevel = 0
	Click, %x%, %y% Left, 1
If ErrorLevel
	Loop, 2
		SoundBeep
}
Until ErrorLevel = 0
}


CenterImgSrchCoords(File, ByRef CoordX, ByRef CoordY)
{
	static LoadedPic
	LastEL := ErrorLevel
	Gui, Pict:Add, Pic, vLoadedPic, %File%
	GuiControlGet, LoadedPic, Pict:Pos
	Gui, Pict:Destroy
	CoordX += LoadedPicW // 2
	CoordY += LoadedPicH // 2
	ErrorLevel := LastEL
}
