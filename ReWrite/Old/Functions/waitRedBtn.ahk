waitRedBtn()
{
   while(Color != 0x0000FF)
   {
      PixelGetColor, color, 967, 305
      Sleep, 100
   }
   Sleep, 100
}