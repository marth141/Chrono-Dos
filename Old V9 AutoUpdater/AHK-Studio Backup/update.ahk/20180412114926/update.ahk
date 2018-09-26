checkSQLUpdateFinished()
{
	Loop
	{
		IfWinNotActive, cmd
		{
			break
		}
	}
}

dontRunBeforeFiveAM()
{
	if (A_hour < 5)
	{
		Throw "Don't run before 5AM."
	}
	else
	{
		continue
	}
}

updateEmployeeDB()
{
	sqlBat = C:\Users\%A_UserName%\Documents\sqldeveloper\sqldeveloper\bin\Employees.bat
	run % sqlBat
	Sleep, 800
	return
}

checkIfChronoAlreadyOpen(chronoOpened)
{
	if (chronoOpened = 0)
	{
		run % chronoInput
		sleep, 200
		send, {F6}{F6}
		chronoOpened:= ++chronoOpened
	}
}

checkIfEverMaximized()
{
	if (maximizeCount = 0)
	{
		WinMaximize, A
		maximizeCount := ++maximizeCount
		Return
	}
	else
	{
		Return
	}	
}