# Chrono ONE Documentation
## Brief Description
The Chrono ONE along with is sister backlogs, Chrono NIS and Chrono Dealer, are Google Sheets used to bring all Proposal Department work into one place that is easily viewable and managable by the design department.

The Chrono ONE will contain all Proposal Department accounts.
The Chrono NIS will contain all NIS Department accounts.
The Chrono Dealer will contain all Dealer Department accounts.

The Chrono ONE will provide information to the view based CP Outsource Chrono. This prevents the Outsouce Chrono from being able to have changes applied to it. **All changes must be made at the Chrono ONE, NIS, or Dealer Sheets.**

## Technical Description
The Chrono ONE provided the core code for its sister backlogs NIS and Dealer, however these two are now independant projects due to the unique needs of NIS and Dealer. These projects can be found at these links,

* Place holder
* Place holder

The Chrono ONE will perform these actions:

* Will recieve a new backlog from the Chrono ONE Updater.
* Once the "Part One" or "Part 1" backlog has been applied, the Chrono ONE Sheet will perform it's update action.
* This update action will structure the Proposal, Snow Proposal, Redesign, and Part One backlogs in the code and paste them into the Report sheet.

In the Report sheet, a manager or supervisor will be able to review:

* What accounts need a design to be compeleted.
* What account designs are over due.
* What accounts haven't had any new progress in a while.
* What and who is still working on an account.
* Notes regarding the account, as submitted by the assignee.
* The status of the account.

## Report Sheet User Interface Description
The Chrono ONE, NIS, and Dealer, all follow similar structures. Their headers are as so,

| DUE IN: (hh:mm) | DUE STATUS | SERVICE | SOLAR PROJECT | CAD OBJECT | OFFICE | UNIT TYPE | ASSIGNED | PRIORITY | STATUS | NOTES | LAST UPDATE<sup>1</sup> | INITIAL DATE |
|-----------------|------------|---------|---------------|------------|--------|-----------|----------|----------|--------|-------|-------------|--------------|
| A due timer. | Overdue, Due Today, Not Yet Due. | Service Number Salesforce Link. | Solar Project Number Salesforce Link. | CAD Number Salesforce Link (Redesigns only). | Sales office. | GSR, AURORA, OTS GSR, OTS AURORA, SNOW PROP, Part 1, CP RD, or Rejected. | Designer Assigned through Ally. | Priority or Blank (Not Priority). | In Progress, On Hold, Completed, Cancel, Unassign with unassignee's name or Reject with rejectee's name. | Should have explaination of rejection or hold statuses. | Timestamp for the last time account entry was modified. | Timestamp for first time account entry was modified. |

<sup>1</sup> Last Update will also change colors based on time since the account was last modified.

* **Black** - Overdue by one day.
* <span style="color:Purple"><b>Purple</b></span> - Over six hours, under one day.
* <span style="color:Red"><b>Red</b></span> - Over one hour, under one day.

### Report Sheet Interactions with Ally
The Report Sheet is where Ally will look for and assign new accounts to a designer.
#### Assign Button
Once the Assign button is pressed, the designer will show up in the account's **Assigned column**, the **Status column** will be marked *In Progress*, and the **Last Update and Initial Date columns** will be timestamped.

#### Unassign Button
Once the Unassign button is pressed, the account's **Status column** will update with **"Unassign: Jane Doe"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.

#### Reject Button (Outsource Only)
Once the Reject button is pressed, the account's **Status column** will update with **"Reject: Jane Doe"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.

#### On Hold Button
Once the On Hold button is pressed, the account's **Status column** will update with **"On Hold"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.

#### Cancel Button
Once the Cancel button is pressed, the account's **Status column** will update with **"Cancel"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.

#### Complete Button
Once the Complete button is pressed, the account's **Status column** will update with **"Complete"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.