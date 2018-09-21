checkColor(checkColor, x, y)
{
   Loop 100
   {
      PixelGetColor, color, x, y
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if(Color = checkColor)
         return true
      Sleep, 10
   }
   return false
}