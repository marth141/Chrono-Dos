#Include %A_ScriptDir%\UpdaterFunctionLib\checkSalesforceReport.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\copyPaste.ahk
#Include %A_ScriptDir%\UpdaterFunctionLib\clickPlayButton.ahk

runUpdate(urlArray)
{
	for i, salesforceLink in urlArray
	{
		openURL(urlArray[A_Index])
		checkSalesforceReport()
		copy()
		paste()
		clickPlayButton()
	}
}

openURL(urlToOpen)
{
	run, %urlToOpen%
}