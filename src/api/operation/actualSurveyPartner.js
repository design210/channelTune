import { createInstanceWithAuth } from "../index";
function getActualSurveyPartnerList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchActualSurveyPartnerDate_start: data.searchActualSurveyPartnerDate_start,
    searchActualSurveyPartnerDate_end: data.searchActualSurveyPartnerDate_end,
    searchActualSurveyPartnerStatus: data.searchActualSurveyPartnerStatus,
  };
  return createInstanceWithAuth("/actualSurveyPartner/list", {}, param, "application/json; charset=utf-8").get();
}
function getActualSurveyParnterDetail(id) {
  return createInstanceWithAuth(`/actualSurveyPartner/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function actualSurveyParnterStatus(data) {
  let paramData = {
    actualSurveyPartnerStatus: data.actualSurveyPartnerStatus,
  };
  return createInstanceWithAuth(`/actualSurveyPartner/status/${data.actualSurveyPartnerSid}`, paramData, {}, "application/json; charset=utf-8").put();
}
function actualSurveyParnterCustomer(id) {
  return createInstanceWithAuth(`/actualSurveyPartner/transfer/${id}`, {}, {}, "application/json; charset=utf-8").put();
}

function getActualSurveyParnterUpdate(data) {
  let paramData = {
    actualSurveyPartnerUserDate: data.actualSurveyPartnerUserDate,
    actualSurveyPartnerUserName: data.actualSurveyPartnerUserName,
    actualSurveyPartnerUserCompanyName: data.actualSurveyPartnerUserCompanyName,
    actualSurveyPartnerUserEmail: data.actualSurveyPartnerUserEmail,
    actualSurveyPartnerUserHp: data.actualSurveyPartnerUserHp,
    actualSurveyPartnerInstallDate: data.actualSurveyPartnerInstallDate,
    actualSurveyPartnerLeasePeriod: data.actualSurveyPartnerLeasePeriod,
    actualSurveyPartnerInstallTime: data.actualSurveyPartnerInstallTime,
    actualSurveyPartnerZipCode: data.actualSurveyPartnerZipCode,
    actualSurveyPartnerUserAddress1: data.actualSurveyPartnerUserAddress1,
    actualSurveyPartnerUserAddress2: data.actualSurveyPartnerUserAddress2,
    actualSurveyPartnerAnalyzeVolume: data.actualSurveyPartnerAnalyzeVolume,
    actualSurveyPartnerAnalyzeLocation: data.actualSurveyPartnerAnalyzeLocation,
    actualSurveyPartnerFloatingPopulation: data.actualSurveyPartnerFloatingPopulation,
    actualSurveyPartnerProduct: data.actualSurveyPartnerProduct,
    actualSurveyPartnerGlassType: data.actualSurveyPartnerGlassType,
    actualSurveyPartnerVideoPreferencias: data.actualSurveyPartnerVideoPreferencias,
    actualSurveyPartnerTrafficSensorPosition: data.actualSurveyPartnerTrafficSensorPosition,
    actualSurveyPartnerSpecialConstruction: data.actualSurveyPartnerSpecialConstruction,
    actualSurveyPartnerFilmSize: data.actualSurveyPartnerFilmSize,
    actualSurveyPartnerIntensityIlluminationIn: data.actualSurveyPartnerIntensityIlluminationIn,
    actualSurveyPartnerIntensityIlluminationOut: data.actualSurveyPartnerIntensityIlluminationOut,
    actualSurveyPartnerWindowTintingEqup: data.actualSurveyPartnerWindowTintingEqup,
    actualSurveyPartnerVideoFormal: data.actualSurveyPartnerVideoFormal,
    actualSurveyPartnerGlassSurface: data.actualSurveyPartnerGlassSurface,
    actualSurveyPartnerDrivingType: data.actualSurveyPartnerDrivingType,
    actualSurveyPartnerProjectionDistance: data.actualSurveyPartnerProjectionDistance,
    actualSurveyPartnerCeilingType: data.actualSurveyPartnerCeilingType,
    actualSurveyPartnerVideoProjectionArea: data.actualSurveyPartnerVideoProjectionArea,
    actualSurveyPartnerCardinalPoints: data.actualSurveyPartnerCardinalPoints,
    actualSurveyPartnerLightSource: data.actualSurveyPartnerLightSource,
    actualSurveyPartnerControllerPosition: data.actualSurveyPartnerControllerPosition,
    actualSurveyPartnerProjectEqupType: data.actualSurveyPartnerProjectEqupType,
    actualSurveyPartnerPartnerConsultation: data.actualSurveyPartnerPartnerConsultation,
    actualSurveyPartnerProjectBracketType: data.actualSurveyPartnerProjectBracketType,
    actualSurveyPartnerSignificantOuters: data.actualSurveyPartnerSignificantOuters,
    actualSurveyPartnerDate: data.actualSurveyPartnerDate,
    actualSurveyPartnerStatus: data.actualSurveyPartnerStatus,
    actualSurveyPartnerWeather: data.actualSurveyPartnerWeather,
    actualSurveyPartnerOrderFilmTerminal: data.actualSurveyPartnerOrderFilmTerminal,
    actualSurveyPartnerCeilingTypeEtc: data.actualSurveyPartnerCeilingTypeEtc,
    actualSurveyPartnerCeilingHeight: data.actualSurveyPartnerCeilingHeight,
    actualSurveyPartnerSilliconColor: data.actualSurveyPartnerSilliconColor,
  };
  return createInstanceWithAuth(`/actualSurveyPartner/${data.actualSurveyPartnerSid}`, paramData, {}, "application/json; charset=utf-8").put();
}

export { getActualSurveyPartnerList, getActualSurveyParnterDetail, actualSurveyParnterStatus, actualSurveyParnterCustomer, getActualSurveyParnterUpdate };
