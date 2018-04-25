#Include %A_ScriptDir%\UpdaterFunctionLib\copyPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\clickPlayButton.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\imageSearcher.ahk

runUpdate(urlArray)
{
	reportComplete = %A_ScriptDir%\Images\reportComplete.bmp
	reportNoResults = %A_ScriptDir%\Images\reportNoResults.bmp

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