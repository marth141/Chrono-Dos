needle = %A_ScriptDir%/images/google-btn-accessdenied.bmp

^e::
{	
	errorImageSearch(needle)
}

errorImageSearch(needle)
{
	CoordMode, Screen
	
	ImageSearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, %needle%
	If !ErrorLevel
		Msgbox Found at original zoom
	
	scale = 0
	range = 130
	
	Loop, %range%
	{
		; Searches for the image at incremetnal width %scale% with preserved aspect ratio "h-1"
		ImageSearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, *w%scale% *h-1 %needle%
		; CenterImgSrchCoords(needle, FoundX, FoundY)
		If !ErrorLevel
		{
			
			MsgBox Found at scale level %scale% FoundX: %FoundX% FoundY: %FoundY% w: %w% h: %h%
			Break
			
			;Click, %FoundX%, %FoundY% Left, 1
		}  
		scale += 1

		; OPTIONAL: Shows the image at the current zoom level in the loop, just to illustrate how the loop works.
		SplashImage, %A_ScriptDir%/needle.png, Zw%scale% Zh-1
		SplashImage, off
	}
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