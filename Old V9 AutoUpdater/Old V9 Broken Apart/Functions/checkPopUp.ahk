checkPopUp(checkColor, x, y)
{
   Loop 50
   {
      PixelGetColor, color, x, y
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%, .5
      if(Color = checkColor)
      {
         ;~ Sleep, 5000
         MouseClick, left, x, y
         Sleep, 500
         return true
      }
      Sleep, 50
   }
   return false
}