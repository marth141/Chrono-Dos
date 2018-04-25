#Include %A_ScriptDir%\SimplifiedIntentions\copy.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\paste.ahk
#Include %A_ScriptDir%\SimplifiedIntentions\clickPlayButton.ahk
runUpdate(urlArray)
{
	for i, salesforceLink in urlArray
	{
		openURL(urlArray[A_Index])
		copy()
		paste()
		clickPlayButton()
	}
}

openURL(urlToOpen)
{
	run, %urlToOpen%
}