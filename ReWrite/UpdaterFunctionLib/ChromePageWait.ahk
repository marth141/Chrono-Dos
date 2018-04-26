chromePageWait()
{
   Loop 20
   {
      if(A_Cursor = "AppStarting")
      {
         while (A_Cursor = "AppStarting")
         {
            Sleep, 100
         }
         return
      }
      Sleep, 50
   }
   Sleep, 500
}