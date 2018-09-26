# AutoUpdater Documentation
## Brief Description

The AutoUpdater, is a platform developted in AutoHotkey used for the updating the ChronoONE, Dealer, NIS, Quality Control, Structural, Electrical, and DIN backlogs. This provides a constant queue of design work for these departments.

## Technical Description

The AutoUpdater will perform this routine:

* Opens the Chrono Updater Google Sheet.
* Opens a Salesforce report.
* Copies the report.
* Closes the report.
* Pastes the report into the Chrono Updater Google Sheet.
* Clicks a play button that will send the report to it's appropriate backlog.
* At the end of a cycle, it will refresh the Google Sheet to avoid sheet related issues.

A process status message and successful update counter will be displayed in the top-left corner of the screen during its process. The tool is designed to run perpetually. To accomplish this, it performs a few "escapes" for when it gets stuck doing something. At this time, all the known places where it would get stuck have been addressed. The highest update counter seen is ~13,000.

## How to Interact with AutoUpdater

The AutoUpdater is designed not to need interaction, however when it needs to be stopped for any reason, these hotkeys will work:

* **ctrl + esc** : Will force-stop or emergency-stop the AutoUpdater all together. It will need to be reopened to start running again.
* **ctrl + p** : Will pause the AutoUpdater. A pop-up message will appear and the updater will continue once the pop-up message has been "Ok'd".

## Troubleshooting
On occasion the AutoUpdater may need to be reset. In the event that it needs to be reset, follow these steps:

* At the machine running the AutoUpdater, press **ctrl + esc** to completely stop the AutoUpdater.
* Close the Google Chrome browser entirely.
* Press the AutoUpdater icon in the bottom screen bar.
* The AutoUpdater will open up the ChronoONE Updater and after 10 seconds, will open the first Salesforce report.
* **Please wait**, the first Salesforce report may require signing into Salesforce. Please wait for this and press the sign-in button on Salesforce. The updater will be able to continue after.
