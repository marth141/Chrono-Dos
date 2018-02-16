; This script was created using Pulover's Macro Creator
; www.macrocreator.com

#NoEnv
SetWorkingDir %A_ScriptDir%

F3::
Macro1:
Needle := "%CD%\images\google-btn-accessdenied.bmp"
MyFunc(Needle)
Return

MyFunc(NeedleF)
{
Loop
{
CoordMode, Pixel, Screen
ImageSearch, FoundX, FoundY, 0, 0, 1920, 1080, NeedleF
CenterImgSrchCoords(NeedleF, FoundX, FoundY)
If ErrorLevel = 0
	Click, %FoundX%, %FoundY% Left, 1
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
