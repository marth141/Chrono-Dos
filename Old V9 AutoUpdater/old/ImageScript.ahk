^e::
{
	CoordMode, Screen
	needle = %A_ScriptDir%/images/google-btn-accessdenied.bmp
	
	ImageSearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, %needle%
	If !ErrorLevel
		Msgbox Found at original zoom
	
	scale = 0
	range = 130
	
	Loop, %range%
	{
		; Searches for the image at incremetnal width %scale% with preserved aspect ration "h-1"
		ImageSearch, x, y, 0, 0, A_ScreenWidth, A_ScreenHeight, *w%scale% *h-1 %needle%
		If !ErrorLevel
		{
			MsgBox Found at scale level %scale%
			Break
		}  
		scale += 1
		
		; OPTIONAL: Shows the image at the current zoom level in the loop, just to illustrate how the loop works.
		SplashImage, %A_ScriptDir%/needle.png, Zw%scale% Zh-1  
		SplashImage, off
	}
}