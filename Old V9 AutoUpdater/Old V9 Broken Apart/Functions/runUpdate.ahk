runUpdate(urlArray)
{
   missed := true ;Switch on and off for these reports
   while(missed) ;Filters the switch and also repeats failures
   {
      if(urlArray = %cpQC%)
      {
         Sleep, 60000
      }
      
      Loop % urlArray.Length()
      {
         run % urlArray[A_Index]
         if(update())
            missed := true
         else
            missed := false
      }
  }
}