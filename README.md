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
* What accounts haven't had any new progress in a while.<sup>1</sup>
* What and who is still working on an account.
* Notes regarding the account, as submitted by the assignee.
* The status of the account.<sup>2</sup>

## User Interface Description

The Chrono ONE, NIS, and Dealer, all follow similar structures. Their headers are as so,

| DUE IN: (hh:mm) | DUE STATUS | SERVICE | SOLAR PROJECT | CAD OBJECT | OFFICE | UNIT TYPE | ASSIGNED | PRIORITY | STATUS<sup>2</sup> | NOTES | LAST UPDATE<sup>1</sup> | INITIAL DATE |
|-----------------|------------|---------|---------------|------------|--------|-----------|----------|----------|--------|-------|-------------|--------------|
| A due timer. | Overdue, Due Today, Not Yet Due. | Service Number Salesforce Link. | Solar Project Number Salesforce Link. | CAD Number Salesforce Link (Redesigns only). | Sales office. | GSR, AURORA, OTS GSR, OTS AURORA, SNOW PROP, Part 1, CP RD, or Rejected. | Designer Assigned through Ally. | Priority or Blank (Not Priority). | In Progress, On Hold, Completed, Cancel, or Reject with rejectee's name. | Should have explaination of rejection or hold statuses. | Timestamp for the last time account entry was modified. | Timestamp for first time account entry was modified. |