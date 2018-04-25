waitOrangeMsg()
{
   Loop 10 ;loop till orange msg appears, else wait and dismiss
   {
      ;~ MsgBox,,, NOT Orange!, .1
      ;~ MsgBox,,, %color% %x% %y%
      PixelGetColor, color, 959, 137
      if(Color = 0xC1EFF8)  ;   0xBFEDF8
         break
      Sleep, 50
   }
   PixelGetColor, color, 959, 145
   if(Color = 0xC1EFF8) ;loop till orange message disapears
   {
      Loop 120
      {
         ;~ MsgBox,,, Orange, .1
         PixelGetColor, color, 959, 137
         if(Color != 0xC1EFF8)
            return false
         Sleep, 500
      }
      return true ;return true if timedout and orange msg never diasapeard
   }
   Sleep, 100
   return false ;return false if orange msg disapears or was never there.
}