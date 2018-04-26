isThereGreen()
{
   green := false
   while (green = false)
   {
      PixelGetColor, color, 1712, 343
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if (color = 0x1D7638 || 0x29782F)
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
      if (color = 0x000099 || 0x00079B)
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