var matchClass = function () {
  this.serviceNumberMatch = function (updateServiceNumber, stagingServiceNumber) {
    if (updateServiceNumber === stagingServiceNumber) {
      return true;
    } else {
      return false;
    }
  };
  this.unitColMatch = function (oldUnitType, newUnitType) {
    if (oldUnitType === newUnitType) {
      return true;
    } else {
      return false;
    }
  };
};
