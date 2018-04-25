waitPaste(checkColor, x, y)
{
   Loop 400
   {
      send, {Home}
      PixelGetColor, color, x, y
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if(Color = checkColor)
         return true
      Sleep, 50
   }
   return false
}