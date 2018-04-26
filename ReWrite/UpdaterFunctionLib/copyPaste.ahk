copy()
{
   found := false
   While(found = false)
   {
      Send, ^a
      Sleep, 800
      Send, ^c
      ClipWait, 2
      IfInString, Clipboard, Grand Totals
      {
         found := true
      }
      else IfInString, Clipboard, Data Not Available
      {
         clipboard = ; Empty the clipboard   
         break
      }
   }
   Sleep, 500
   Send, ^w   
}

paste()
{
   Sleep, 1000
   MouseClick, Left, 93, 257, 1
   Sleep, 1000
   Send, ^v
   Sleep, 1000
   MouseClick, Left, 93, 257, 1
   clipboard = ; Empty the clipboard   
   return
}
