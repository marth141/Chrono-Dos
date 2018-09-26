copy()
{
   ; Defining default color as white.
   color = 0x000000	
   while(color != 0xD49711) ;color != 0xD69A0A || salesforce blue; If white is not white.
   {
      ;~ MsgBox,,, NOT Blue!, .1
      ;~ MsgBox,,, %color% %x% %y% 
      PixelGetColor, color, 55, 136
      if(color = 0xC17D00)
      {
         MsgBox,,, You're not signed in, 2
         missed := signIn()
         return missed
      }
      Sleep, 100
   }
   chromePageWait()
   found := true
   While(found)
   {
      Send, ^a
      Sleep, 800
      Send, ^c
      ClipWait
      search = Grand Totals
      IfInString, Clipboard, %search%
      {
         found := false
         ;MsgBox, Found grand total
      }}
   Sleep, 500
   Send, ^w
   Sleep, 500
   Send, {F5}
   Sleep, 4250
}