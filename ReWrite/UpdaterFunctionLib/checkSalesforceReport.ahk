#Include %A_ScriptDir%\UpdaterFunctionLib\imageSearcher.ahk

checkSalesforceReport()
{
	reportComplete = %A_ScriptDir%\Images\reportComplete.bmp
	reportNoResults = %A_ScriptDir%\Images\reportNoResults.bmp
	errorImageSearch(reportComplete, false)
	errorImageSearch(reportNoResults, false)
}