CenterImgSrchCoords(File, ByRef CoordX, ByRef CoordY)
{
   static LoadedPic
   LastEL := ErrorLevel
   Gui, Pict:Add, Pic, vLoadedPic, %File%
   GuiControlGet, LoadedPic, Pict:Pos
   Gui, Pict:Destroy
   CoordX += LoadedPicW // 2
   CoordY += LoadedPicH // 2
   ErrorLevel := LastEL
}