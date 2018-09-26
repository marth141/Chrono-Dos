checkPopUp2(checkColor, x, y)
{
   Loop 50
   {
      PixelGetColor, color, x, y
      MouseMove, x, y
      ;~ MsgBox,,, %color% %checkColor%, 2
      ;~ MsgBox, %color% %checkColor%
      if(Color = checkColor)
      {
         Sleep, 500
         MouseClick, left, x, y
         Sleep, 500
         return false
      }
      Sleep, 50
   }
   return true
}