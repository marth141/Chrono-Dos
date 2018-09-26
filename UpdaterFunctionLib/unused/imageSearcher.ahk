debug:
{
	reportComplete = %A_ScriptDir%\Images\reportComplete.bmp
	errorImageSearch(reportComplete, false)
}

errorImageSearch(image, clickNeeded:=false)
{
	found := false
	while (found = false)
	{
		CoordMode, Pixel, Screen				
		ImageSearch, FoundX, FoundY, 0, 0, 1920, 1080, %image%
		if (ErrorLevel = 0)
		{
			MsgBox,,Found!,Found!
		}
		scale = %A_ScreenWidth%
		max_loops = %A_ScreenWidth%
		loop, %max_loops%
		{
			ImageSearch, FoundX, FoundY, 0, 0, 1920, 1080, *w%scale% *h-1 %image%
			if (ErrorLevel = 0)
			{
				break
			}
			scale -= 1
		}
		FindImageDimensions(image, FoundX, FoundY)
		If (ErrorLevel = 0 && clickNeeded = true) ;If found and click needed, click it.
		{
			TrayTip,,Found Image!
			Click, %centerX%, %centerY%
			found = true
		}
		else If (ErrorLevel = 0 && clickNeeded = false) ;If not found and click not needed.
		{
			TrayTip,,Found Image!
			CoordMode, Mouse, Screen		
			MouseMove, %centerX%, %centerY%
			SoundPlay, -1, Wait
			found = true
		}
		else if (ErrorLevel = 1)
		{
			SoundPlay, *32, Wait
		}
		else if (ErrorLevel = 2)
		{
			SoundPlay, *16, Wait
		}
	}
	return found
}

FindImageDimensions(File, ByRef CoordX, ByRef CoordY)
{
	static LoadedPic
	LastEL := ErrorLevel
	Gui, Pict:Add, Pic, vLoadedPic, %File%
	GuiControlGet, LoadedPic, Pict:Pos
	Gui, Pict:Destroy
	CoordX += LoadedPicW
	CoordY += LoadedPicH
	ErrorLevel := LastEL
}
