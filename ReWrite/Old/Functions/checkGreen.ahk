checkGreen()
{
   Loop 100
   {
      ;MsgBox,,, NOT Green!, .1
      ;PixelGetColor, color, 24, 106
      needle = %A_WorkingDir%\images\google-newSheetsIcon.bmp
      ImageSearch,,,0,0,A_ScreenWidth,A_ScreenHeight,needle
      if ErrorLevel ; Icon as of Feb 2018
         return false
      Sleep, 50
   }
   Sleep, 100
   return true
}