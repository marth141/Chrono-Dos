var exports = exports || {};
var module = module || { exports: exports };
function geoCoder(inputs) {
    var geocoder = Maps.newGeocoder().setRegion("us");
    var geocoderResponse = geocoder.geocode(inputs.address);
    console.info(geocoderResponse);
    var geocodeJSON = getGeocodeData(geocoderResponse);
    // Deprecated due to USGS API being down.
    var usgsJSON = geoCoder_getUSGSData(geocodeJSON.latitude, geocodeJSON.longitude);
    console.log(usgsJSON);
    var viabilityTestDataJSON = {
        slope: inputs.slope,
        state: geocodeJSON.state,
        sdc: usgsJSON.response.data.sdc,
        sds: usgsJSON.response.data.sds
    };
    console.log(viabilityTestDataJSON);
    var mpv_Result = calculate_mpv(viabilityTestDataJSON.sdc, viabilityTestDataJSON.sds);
    var offsetCollection = {
        mpv: mpv_Result,
        offset1: {
            raw: mpv_Result * 0.5,
            inch: Math.round(mpv_Result * 0.5),
            foot: (mpv_Result * 0.5) - ((mpv_Result * 0.5) % 1) //Not used rn
        },
        offset2: {
            raw: mpv_Result,
            inch: Math.round(mpv_Result),
            foot: (mpv_Result) - ((mpv_Result) % 1) //Not used rn
        },
        offset3: {
            raw: mpv_Result,
            inch: Math.round(mpv_Result),
            foot: (mpv_Result) - ((mpv_Result) % 1) //Not used rn
        },
        offset4: {
            raw: mpv_Result * 1.5,
            inch: Math.round(mpv_Result * 1.5),
            foot: (mpv_Result * 1.5) - ((mpv_Result * 1.5) % 1) //Not used rn
        }
    };
    var stateTestResults = stateTest(viabilityTestDataJSON.state);
    var sdcSlopeTestResult = sdcSlopeTest(viabilityTestDataJSON.slope, viabilityTestDataJSON.sdc);
    var viabilityResults = {
        stateResults: stateTestResults,
        sdcSlopeResults: sdcSlopeTestResult,
        sdc: viabilityTestDataJSON.sdc,
        ss: usgsJSON.response.data.ss,
        offsets: offsetCollection
    };
    return viabilityResults;
}
function geoCoder_getUSGSData(lat, lng) {
    console.log(lat);
    console.log(lng);
    var parameters = {
        latitude: lat,
        longitude: lng,
        riskCategory: "II",
        siteClass: "D",
        title: "VivintSolar"
    };
    var url = "https://earthquake.usgs.gov/ws/designmaps/asce7-10.json"
        + "?latitude=" + parameters.latitude
        + "&longitude=" + parameters.longitude
        + "&riskCategory=" + parameters.riskCategory
        + "&siteClass=" + parameters.siteClass
        + "&title=" + parameters.title;
    console.log(url);
    var usgsResponse = UrlFetchApp.fetch(url);
    var usgsDataJSON = JSON.parse(usgsResponse);
    console.info(usgsDataJSON);
    return usgsDataJSON;
}
function getGeocodeData(geocoderResponse) {
    if (geocoderResponse.status == "OK") {
        var geocodeData = {
            longitude: geocoderResponse.results[0].geometry.location.lng,
            latitude: geocoderResponse.results[0].geometry.location.lat,
            state: getGeocodeData_State(geocoderResponse.results[0].address_components)
        };
    }
    return geocodeData;
}
function getGeocodeData_State(address_components) {
    for (var index = 0; index < address_components.length; index++) {
        if (address_components[index].types[0] === "administrative_area_level_1") {
            return address_components[index].short_name;
        }
    }
}
