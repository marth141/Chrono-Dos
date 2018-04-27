errorImageSearch(needleF, clickNeeded:=false)
{
   Loop 1
   {
      CoordMode, Pixel, Screen
      ImageSearch, FoundX, FoundY, 0, 0, A_ScreenWidth, A_ScreenHeight, %needleF%
      CenterImgSrchCoords(NeedleF, FoundX, FoundY)
      If ErrorLevel = 0 && clickNeeded = true ; If found and click needed, click it.
      {
         Click, %FoundX%, %FoundY% Left, 1
         return true
         break
      }
      else If ErrorLevel && clickNeeded = false ; If not found and click not needed.
      {
         Loop 1
         {
            SoundPlay, %A_WorkingDir%\sounds\FFVicShort.mid, 1
            return false
         }
		}
	}
}