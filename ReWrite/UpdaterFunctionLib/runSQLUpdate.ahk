runSQLUpdate()
{
	sqlBat = C:\Users\%A_UserName%\Documents\sqldeveloper\sqldeveloper\bin\Employees.bat
	run % sqlBat	
	while WinActive, cmd
	{
		Sleep, 10
	}
	until IfWinNotExist, cmd
	return
}