waitPaste(checkColor, x, y)
{
   Loop 400
   {
      send, {Home}
      PixelGetColor, color, 1612, 343
      ;~ MsgBox,,, %color% %x% %y%`, %checkColor%
      if(Color = #38761D)
         break
      
   }
   Sleep, 50
}