function stateTest(state) {
  var approvedBallastRegions = [
    "CA", "AZ", "NV", "NM", "TX",
    "SC", "VA", "NJ", "PA", "UT"
  ];

  if (approvedBallastRegions.indexOf(state) !== -1) {
    console.info(state + " Passes State Test");
    return true;
  } else {
    console.info(state + " Failed State Test");
    return false;
  }
}

function sdcSlopeTest(slope, sdc) {
  if (sdc === "E" || sdc === "F") {
    console.info("E and F Seismic Design Category not allowed.");
    return 1;
  } else if (sdc === "A" || sdc === "B") {
    if (slope < 1.2 || slope > 7) {
      console.info("Slope AB: " + slope);
      return 2;
    } else if (slope >= 1.2 || slope <= 7) {
      console.info("Passes SDC and Slope Test");
      return 0;
    }
  } else if (sdc === "C" || sdc === "D") {
    if (slope < 1.2 || slope > 3) {
      console.info("Slope CD: " + slope);
      return 3;
    } else if (slope >= 1.2 || slope <= 7) {
      console.info("Passes SDC and Slope Test");
      return 0;
    }
  }
}

function calculate_mpv(sdc, sds) {
  if (sdc === "A" || sdc === "B") {
    return 6;
  } else {
    var mpv = ((sds - 0.4) * (sds - 0.4)) * 60;
    console.info("MPV: " + mpv);
    return mpv;
  }
}