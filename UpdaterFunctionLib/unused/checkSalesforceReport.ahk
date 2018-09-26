#Include %A_ScriptDir%\UpdaterFunctionLib\imageSearcher.ahk

checkSalesforceReport()
{
	reportComplete = %A_ScriptDir%\Images\reportComplete.bmp
	reportNoResults = %A_ScriptDir%\Images\reportNoResults.bmp
	checkReportComplete := errorImageSearch(reportComplete, false)
	checkReportNoResults := errorImageSearch(reportNoResults, false)
	if (checkReportComplete = true)
	{
		return
	}
	else if (checkReportNoResults = true)
	{
		return
	}
}