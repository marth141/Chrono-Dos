update()
{
	accessDeniedImg = %A_WorkingDir%\images\google-btn-accessdenied.bmp
	accessChangedImg = %A_WorkingDir%\images\google-msg-AccessChanged.bmp
	rowErrorImg = %A_WorkingDir%\images\google-msg-RowError.bmp
	runningScriptCancel = %A_WorkingDir%\images\google-msg-RunningScriptWCancel.bmp
	runningScriptNoCancel	= %A_WorkingDir%\images\google-msg-RunningScriptWOCancel.bmp
	savingTimeout = %A_WorkingDir%\images\google-msg-SavingTimeout.bmp
	serviceError = %A_WorkingDir%\images\google-msg-ServiceError.bmp
	leaveButton = %A_WorkingDir%\images\google-btn-leave.bmp
	sheetsIcon = %A_WorkingDir%\images\google-newSheetsIcon.bmp
	dismissMsg = %A_WorkingDir%\images\google-msg-DismissRed.bmp
	
	sleep, 800
	checkIfEverMaximized()
	checkChromeStarting()
	copyResults:= copy()

	if(copyResults)
	{
		return missed
	}      
	
	while(checkForImage(sheetsIcon, false)) ;check if spreadsheet open by green box
		Send, {F5}
	
	while(checkOrange()) ;wait till orange message gone, else ctrl+z run button again
	{
		send, ^z
		sleep, 800
		MouseClick, left, 1506, 324  ;Click play button
		sleep, 500
		MouseClick, left, 986, 134  ;Click cancel button
	}
	
	if(!checkColor(0x00079B, 1340, 310)) ;check if green-go box is red, if the box is red, clear the page  0x000099
	{
		loop 10
		{
			checkPopUp(0x0913CD, 1125, 304)  ;click clear red button 0x0808CB
			sleep, 800
			if(checkColor(0xF98D4B, 716, 604)) ; check for pop up missing script
			{
				send, {esc}
				continue
			}else  if(waitRedMsg())
			{
				send, {F5}
				sleep, 800
				checkChromeStarting()
				waitOrangeMsg()
				continue
			}
			else
				break
		}
		waitOrangeMsg()
	}
	
	/*
		End of checking for Salesforce and Chrono Input being ready.
	*/
	
	paste() ; Will just paste and return to continue down.
	
	if(!waitPaste(0x29782F, 1340, 310)) ;check if green-go box is green, else restart  0x1D7638
		return true
	Sleep, 500
	Loop
	{
		MouseClick, left, 1506, 324  ;Click play button
		if(waitRedMsg())
		{
			MsgBox,,, Error, .5
			send, {F5}
			sleep, 800
			checkChromeStarting()
			waitOrangeMsg()
			sleep, 2000
			MsgBox,,, here, 1
			continue
		}
		if(waitOrangeMsg())
		{
			MsgBox,,, Timed Out, 1
			Send, {F5}
			sleep, 800
			return true
		}
		else
			break
	}      
	
	checkForImage(leaveButton, true)
	checkForImage(accessDeniedImg, true)
	checkForImage(dismissMsg, true)
	
	return false
}