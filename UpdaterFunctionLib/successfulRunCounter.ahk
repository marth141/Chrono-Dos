showSuccessfulCount(successfulRuns)
{
	successfulRuns += 1
	ToolTip % "Successful Updates: " . successfulRuns, 0, 50, 2	
	return successfulRuns
}