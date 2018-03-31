function backlogProcessJunction(masterBacklogs) {
  for (var backlog in masterBacklogs) {
    if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
      var propBacklog = masterBacklogs[backlog];
      prop_DateCleaner(propBacklog);
      prop_RegionMarker(propBacklog);
      prop_UnitTypeMarker(propBacklog);
      prop_SolProjLinkCreator(propBacklog);
      prop_CadNameColCreator(propBacklog);
    } else if (masterBacklogs[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
      continue;
    }
  }
}