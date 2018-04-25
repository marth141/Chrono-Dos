waitRedMsg()
{
   Loop 5 ;loop till orange msg appears, else wait and dismiss
   {
      ;~ MsgBox,,, RED, .5
      PixelGetColor, color, 959, 137
      if(Color = 0x394AD7)
         return true
      Sleep, 100
   }
   return false ;return false if orange msg disapears or was never there.
}