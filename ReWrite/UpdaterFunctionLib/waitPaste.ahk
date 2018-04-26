isThereGreen()
{
   green := false
   while (green = false)
   {
      PixelGetColor, color, 1712, 343
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if (color = 0x1D7638)
      {
         green = true
      }
      else
      {
         return false
      }
   }
   return true
}

isThereRed()
{
   red := false
   while (red = false)
   {
      PixelGetColor, color, 1712, 343
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if (color = 0x000099)
      {
         red = true
      }
      else
      {
         return false
      }
   }
   return true
}