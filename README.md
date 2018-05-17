# Chrono ONE Documentation
## Brief Description
The Chrono ONE along with is sister backlogs, Chrono NIS and Chrono Dealer, are Google Sheets used to bring all Proposal Department work into one place that is easily viewable and managable by the design department.

* The Chrono ONE will contain all Proposal accounts.
* The Chrono NIS will contain all NIS accounts.
* The Chrono Dealer will contain all Dealer accounts.

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

## Report Sheet Documentation
### Description
The report sheet is where a manager or supervisor will be able to observe all the accounts needing to be worked on, who is assigned to those accounts, and what are the statuses of the accounts listed. It can be edited if need be and some changes can directly influence Ally.

### Report Sheet User Interface
The Chrono ONE, NIS, and Dealer all follow similar structures. Their headers are as so,

| DUE IN: (hh:mm) | DUE STATUS | SERVICE | SOLAR PROJECT | CAD OBJECT | OFFICE | UNIT TYPE | ASSIGNED | PRIORITY | STATUS | NOTES | LAST UPDATE<sup>1</sup> | INITIAL DATE |
|-----------------|------------|---------|---------------|------------|--------|-----------|----------|----------|--------|-------|-------------|--------------|
| A due timer. | Overdue, Due Today, Not Yet Due. | Service Number Salesforce Link. | Solar Project Number Salesforce Link. | CAD Number Salesforce Link (Redesigns only). | Sales office. | GSR, AURORA, OTS GSR, OTS AURORA, SNOW PROP, Part 1, CP RD, or Rejected. **Can be changed manually.** *(See Filter Settings)* | Designer Assigned through Ally or **manually**. | Priority or Blank (Not Priority). **Can be changed manually.** | In Progress, On Hold, Completed, Cancel, Unassign with unassignee's name, or Rejected with rejectee's name. | Should have explanation for rejection, hold, and cancel statuses or any other information the designer feels needs to be shared. | Timestamp for the last time account entry was modified. | Timestamp for first time account entry was modified. |

<sup>1</sup> Last Update will also change colors based on time since the account was last modified.

* <span style="color:Red"><b>Red</b></span> - Last updated over one hour ago, under one day.
* <span style="color:Purple"><b>Purple</b></span> - Last updated over six hours ago, under one day.
* <span style="color:Black"><b>Black</b></span> - Last updated over one day ago.

### Report Sheet Interactions with Ally
The Report Sheet is where Ally will look for and assign new accounts to a designer.

#### Assign Button Interaction
Once the Assign button is pressed, the designer's name will show up in the account's **Assigned column**, the **Status column** will be marked *In Progress*, and the **Last Update and Initial Date columns** will be timestamped.
#### Unassign Button Interaction
Once the Unassign button is pressed, the account's **Status column** will update with **"Unassign: Jane Doe"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.
#### Reject Button (Outsource Only) Interaction
Once the Reject button is pressed, the account's **Status column** will update with **"Reject: Jane Doe"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.
#### On Hold Button Interaction
Once the On Hold button is pressed, the account's **Status column** will update with **"On Hold"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.
#### Cancel Button Interaction
Once the Cancel button is pressed, the account's **Status column** will update with **"Cancel"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.
#### Complete Button Interaction
Once the Complete button is pressed, the account's **Status column** will update with **"Complete"**, **Notes column** will update with notes if any were provided by the designer, and the **Last Update column** will update it's timestamp.

## Filter Settings Sheet Documentation
### Description
The Filter Settings page is where a manager or supervisor will be able to define what their designer's should be working on and will **directly influence what Ally can and cannot assign to a designer.**

### Filter Settings User Interface
| NAME | Email | Salesforce Name | SHIFT | INCLUDE | INCLUDE | GSR | AURORA | SNOW PROP | PART 1 | CP RD | REJECTED | OTS GSR | OTS AURORA | EXCLUDED | INCLUDED |
|------|-------|-----------------|-------|---------|---------|-----|--------|-----------|--------|-------|----------|---------|------------|----------|----------|
| Name of Designer. (**Required**) | Designer's email, must be @vivintsolar.com. (**Required**) | Designer's Salesforce Name. (**Requried**) | AM, MD, or PM. | If NIS, ONE, or Dealer, designer will be permitted to be assigned accounts from that sister Chrono. | If NIS, ONE, or Dealer, designer will be permitted to be assigned accounts from that sister Chrono. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | 0:Off or 1:On. While **1** the designer will be permitted to be assigned accounts of this unit type. | If NIS, ONE, or Dealer, designer will not be permitted to be assigned accounts from that sister Chrono. | If NIS, ONE, or Dealer, designer will not be permitted to be assigned accounts from that sister Chrono. |
## Updater Sheet Documentation
## Analysis Sheet Documentation
## Troubleshooting