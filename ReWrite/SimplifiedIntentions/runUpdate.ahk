#Include %A_ScriptDir%\SimplifiedIntentions\copy.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\paste.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\clickPlayButton.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\imageSearcher.ahk
runUpdate(urlArray)
{
	reportComplete = %A_WorkingDir%\Images\reportComplete.bmp
	reportNoResults = %A_WorkingDir%\Images\reportNoResults.bmp

	for i, salesforceLink in urlArray
	{
		openURL(urlArray[A_Index])
		errorImageSearch(reportComplete, false)
		copy()
		paste()
		clickPlayButton()
	}
}

openURL(urlToOpen)
{
	run, %urlToOpen%
}