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

updateEmployeeDB()
{
	sqlBat = C:\Users\%A_UserName%\Documents\sqldeveloper\sqldeveloper\bin\Employees.bat
	run % sqlBat
	Sleep, 800
	return
}