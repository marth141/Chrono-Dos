signIn()
{
   okta = https://vivintsolar.okta.com/app/UserHome
   Run %okta%
   Sleep, 500
   popUp := true
   while(popUp)
   {
      popUp := checkPopUp2(0xCC8400, 839, 600)
      MouseMove, 835, 632
   }
   popUp := true
   while(popUp)
   {
      popUp := checkPopUp2(0xDB9C00, 486, 351)
   }
   
   popUp := true
   while(popUp)
   {
      popUp := checkPopUp2(0xD69A09, 57, 146)
   }
   closeTabs()
   return true
}