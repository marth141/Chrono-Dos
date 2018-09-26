closeTabs()
{
   WinActivate, ahk_class Chrome_WidgetWin_1
   Loop
   {
      WinGetTitle, title, A
      IfInString, title, New Tab
         break
      else
         Send, ^w
      ;~ Sleep, 800
      Loop 20
      {
         PixelGetColor, color, 280, 102
         if(Color = 0xFCFCFC)
         {
            ;MsgBox,,, NOT POP UP!, .1
            Sleep, 500
            MouseClick, left, 277, 106 
            Sleep, 500
            Send, ^w
            break
         }
         Sleep, 50
      }}
   return
}