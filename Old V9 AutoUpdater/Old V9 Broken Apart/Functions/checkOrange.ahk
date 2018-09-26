checkOrange()
{
   Loop 100
   {
      ;MsgBox,,, NOT Orange!, .1
      PixelGetColor, color, 965, 142
      if(Color = 0xC1EFF8)  ; 0xBEEDF9
         break
      Sleep, 10
   }
   Sleep, 500
   Loop 600
   {
      ;MsgBox,,, NOT Orange!, .1
      PixelGetColor, color, 965, 142
      if(Color != 0xC1EFF8)  ; 0xBEEDF9
         return false
      Sleep, 50
   }
   return true
}