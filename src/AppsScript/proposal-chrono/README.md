<<<<<<< HEAD
# Chrono Code Collection
This is a collection of the code required in the Chrono system. The Chrono system is a way of managing work flow asynchronously from Salesforce through Google Sheets.

How this works is there is an automated scraper in AHK which will get Salesforce reports by opening to their pages, then paste them into the Auto Updater. This updater will identify the Salesforce report by Team Name and Sheet by naming the report appropriately. i.e. "DOS: Permit" where DOS stands for the Permit Team and Permit stands for the Permit backlog page in their Google Sheet.

Once the Report is moved to it's destination, the destination Chrono will format the Salesforce report information into a Google Sheet page generally known as "The Report Page" where supervisors and leads will be able to work on it. Here the needs of the Team are addressed where the Salesforce report information can become oragnized by dates to be able to work the earliest accounts first down to the latest accounts, see who was and is assigned to anyone account and what information the designer needs to convey back to supervisors and leads.

A final tool known as Ally acts as the interface and assignment tool for the Designer to the Chrono. Ally presents the means for a designer to assign themselves work from the Chrono Report Page. Then the designer can update statuses about how the account is being worked back to the Chrono Report with buttons such as "Reject", "On Hold", and "Complete". There is a field in Ally as well for designers to be able to input Notes about an account. This is used to be able to provide leads and supervisors with information as to any hold ups with an account. i.e. "The account cannot be completed because not all of the information needed is there."

This system sought to fix previous issues with how designers received work. The before process was to go to the Report in Salesforce directly, open the record, and assign it to yourself. On occasion the designer would have collisions with a co-worker where they both assigned themselves the same account and eventually find out about it several minutes up to an hour into the account.

Supervisors and leads were not able to assess the status of any particular account with this system and would have to reach out to their designers directly to be able to know where any account is, why it wasn't completed, or what is taking it so long to get done. This problem was inconflict with some of the other responsibilities of leads and supervisors where the greater majority of their job is communictaing with Sales teams and other management. The ability for designers to be able to place notes on an account to assess the status of it saves the supervisors and leads more time, provides more autonomy to the designer, and more work can be done in other areas.

Some of the other big benefits of this system was the removal of "Cherry Picking" where before, designers would look at the next account that needed to be done and would assess if it was an account that they really wanted to deal with. This would lead to some designers constantly picking easy work while other members of their team would be left the hard jobs or hard jobs would just not end up completed until they are overdue. Ally, does not provide the designer with the means to see their upcoming accounts and thus they cannot assess if the next account is easy or hard. That shouldn't matter and the account should just get done.

Other features of the Chrono and Ally relationship include that for supervisors and leads they can set filters for how Ally assigns accounts to designers. This feature saves a lot of time in areas where there are constantly shifting policies on the work being done. i.e. "We need to prevent this team from doing accounts in this area due to a policy change." or "We need all teams to do these areas because of a high volume of work."

Another time saving feature of the Chrono and Ally is supervisors and leads can set accounts as priority where needed to be able to ensure that those accounts are worked before any other account. Before, a supervisor or lead would need to manually assign out these accounts to designers on their team. This process usually involved asking for who was available and assigning it. Although this may still happen, if the account is Priority it will be assigned first to the next designer grabbing an assignment in Ally.
=======
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
| Name of Designer. (**Required**) | Designer's email, must be @vivintsolar.com. (**Required**) | Designer's Salesforce Name. (**Requried**) | AM, MD, or PM. | If NIS, ONE, or Dealer, designer will be permitted to be assigned accounts from that sister Chrono. | If NIS, ONE, or Dealer, designer will be permitted to be assigned accounts from that sister Chrono. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | 0 or 1 (Off or On). While **1** the designer will be permitted to be assigned accounts of this unit type. | If NIS, ONE, or Dealer, designer will not be permitted to be assigned accounts from that sister Chrono. | If NIS, ONE, or Dealer, designer will not be permitted to be assigned accounts from that sister Chrono. |

## Updater Sheet Documentation
### Description
The Updater sheet is used to be able to manually update the Chrono when a manual update is needed. In the Updater sheet, several Salesforce links are shown.

| PROPOSAL | SNOW PROP | CP RD | PART 1 |
|----------|-----------|-------|--------|

There will also be a right-facing arrow, a play button, used to send a pasted backlog into it's hidden staging zone.

### Performing a Manual Update
When a manual update is necessary, follow this proceedure,

* Start with Proposal,
* The manager or supervisor will need to open, copy, and paste the 4 Salesforce links into the Updater sheet at cell **"A1"**.
* Press the Play button.
* Continue this process through Snow Prop, CP RD, and Part 1 in order.
* Once Part 1 has been sent, the Chrono will Update.

## Analysis Sheet Documentation
### Description
This page is used to display analytical data about the current state of the Chrono's report sheet. This sheet will display the following information,

* Total count of each unit type in the Report sheet.
* Total count of claimed accounts in the Report sheet.
* Total count of unclaimed accounts in the Report sheet.
* Number of accounts due today and unclaimed divided by West Coast and East Coast.
* Four graphs, divided by East and West coast, displaying the Not Yet Due, Due Today, and Overdue accounts. A breakdown by state is included.

## Troubleshooting
### A designer is not being assigned an account
A designer not being assigned an account is a regular issue due to the constantly changing filters within the design department. If the designer is not being assigned an account, check for your situation and follow the guides available.

#### Ally says, Queue is Empty
* Double-check that the queue is empty.
* If the queue is not empty,
  * Make sure the designer is in the Filter Settings sheet's **Name column** and **Salesforce Name column**.
  * Make sure the designer's email is listed and that it is **@vivintsolar.com.**
  * Make sure the designer's **Shift**, and **Include(s)** are correct.
  * Ensure that the designer's unit type filters are correct.
* If **all** of these *are not* in error and the queue *is not* empty, then ensure that your designers aren't suppose to recieve this kind of account due to unique team position.
  * E.g. Being an **Outsource designer**, and not recieving priority accounts. This is normal as **Outsource** is not allowed to be assigned priority accounts. If this changes in the future, regard this an example.
* If this account type is suppose to be being assigned, please contact your supervisor.
* When making contact, please press the F12 key and take a screenshot of the Ally screen and send that to your supervisor.
* If your supervisor is not available, please contact Nathan Casados, Eric Van Wagoner , or Codie Wright.

#### Ally is only showing the spinning circle and has not assigned an account
* Make sure the designer is in the Filter Settings sheet's **Name column** and **Salesforce Name column**.
* Make sure the designer's email is listed and that it is **@vivintsolar.com.**
* Make sure the designer's **Shift**, and **Include(s)** are correct.
* Ensure that the designer's filters are correct.
* If **all** of these *are not* in error and the queue *is not* empty, then ensure that your designers aren't suppose to recieve this kind of account due to unique team position.
  * E.g. Being an **Outsource designer**, and not recieving priority accounts. This is normal as **Outsource** is not allowed to be assigned priority accounts. If this changes in the future, regard this an example.
* If this account type is suppose to be being assigned, please contact your supervisor.
* When making contact, please press the F12 key an7 take a screenshot of the Ally screen and send that to your supervisor.
* If your supervisor is not available, please contact Eric Van Wagoner, Nathan Casados, or Codie Wright.

#### My issue is not listed
* Please contact your supervisor and discuss with them what is happening. They should verify that the issue is an unknown issue.
* If an issue is verifiably unknown, please contact Nathan Casados, Eric Van Wagoner, or Codie Wright.
>>>>>>> one/development
