/**
 *
 */
function MasterColumns() {
  /**
   * All of the columns in the permit backlog
   * @param {Array<String>[]} backlogArray
   */
  this.permitBacklogColumns = function(backlogArray) {
    var headers = backlogArray[0];
    for (var header = 0; header < headers.length; header++) {

    }
    this.projectName = getMeThatColumnNoValidate(
      'Project: Project Name',
      backlogArray
    );
    this.solarProjectID = getMeThatColumnNoValidate(
      'Project: Solar Project ID',
      backlogArray
    );
    this.serviceRegOpCenter = getMeThatColumnNoValidate(
      'Service: Regional Operating Center',
      backlogArray
    );
    this.siteSurveyFinishedDate = getMeThatColumnNoValidate(
      'Project: Site Survey Completed',
      backlogArray
    );
    this.welcomeCallDate = getMeThatColumnNoValidate(
      'Opportunity: Welcome Call Completed Date',
      backlogArray
    );
    this.applicationSigned = getMeThatColumnNoValidate(
      'Primary Contract: Application Signed',
      backlogArray
    );
    this.customerAgreeDate = getMeThatColumnNoValidate(
      'Primary Contract: Customer Agreement Approved',
      backlogArray
    );
    this.leaseApprovedDate = getMeThatColumnNoValidate(
      'Primary Contract: Lease Approved',
      backlogArray
    );
    this.proposalApprovedDate = getMeThatColumnNoValidate(
      'Proposal CAD: Proposal Customer Approved',
      backlogArray
    );
    this.contractType = getMeThatColumnNoValidate(
      'Project: Contract Type',
      backlogArray
    );
    this.utility = getMeThatColumnNoValidate('Project: Utility', backlogArray);
    this.opportunityType = getMeThatColumnNoValidate(
      'Opportunity: Type',
      backlogArray
    );
    this.designCompletedBy = getMeThatColumnNoValidate(
      'Phase: PV Design Completed By',
      backlogArray
    );
    this.permitQAFinishedDate = getMeThatColumnNoValidate(
      'Primary CAD: Permit Packet QA Completed',
      backlogArray
    );
    this.structuralReviewFinishedDate = getMeThatColumnNoValidate(
      'Phase: Structural Review Completed',
      backlogArray
    );
  };
}
