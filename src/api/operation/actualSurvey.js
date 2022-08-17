import { createInstanceWithAuth } from "../index";
function getActualSurveyList(data) {
  let param = {
    size: data.size,
    page: data.page,
    searchText: data.searchText,
    searchActualSurveyDate_start: data.searchActualSurveyDate_start,
    searchActualSurveyDate_end: data.searchActualSurveyDate_end,
    searchActualSurveyStatus: data.searchActualSurveyStatus,
  };
  return createInstanceWithAuth("/actualSurvey/list", {}, param, "application/json; charset=utf-8").get();
}
function getActualSurveyDetail(id) {
  return createInstanceWithAuth(`/actualSurvey/${id}`, {}, {}, "application/json; charset=utf-8").get();
}
function getActualSurveyUpdate(data) {
  let paramData = {
    prospectiveCustomerSid: data.prospectiveCustomerSid,
    actualSurveyDate: data.actualSurveyDate,
    actualSurveyName: data.actualSurveyName,
    actualSurveyGlassTypeName: data.actualSurveyGlassTypeName,
    actualSurveyGlassType: data.actualSurveyGlassType,
    actualSurveyStatusName: data.actualSurveyStatusName,
    actualSurveyStatus: data.actualSurveyStatus,
    actualSurveyFilmSize: data.actualSurveyFilmSize,
    actualSurveyOrderFilmSize1: data.actualSurveyOrderFilmSize1,
    actualSurveyOrderFilmCount1: data.actualSurveyOrderFilmCount1,
    actualSurveyOrderFilmTerminal1: data.actualSurveyOrderFilmTerminal1,
    actualSurveyOrderFilmSize2: data.actualSurveyOrderFilmSize2,
    actualSurveyOrderFilmCount2: data.actualSurveyOrderFilmCount2,
    actualSurveyOrderFilmTerminal2: data.actualSurveyOrderFilmTerminal2,
    actualSurveyOrderFilmSize3: data.actualSurveyOrderFilmSize3,
    actualSurveyOrderFilmCount3: data.actualSurveyOrderFilmCount3,
    actualSurveyOrderFilmTerminal3: data.actualSurveyOrderFilmTerminal3,
    actualSurveyOrderFilmSize4: data.actualSurveyOrderFilmSize4,
    actualSurveyOrderFilmCount4: data.actualSurveyOrderFilmCount4,
    actualSurveyOrderFilmTerminal4: data.actualSurveyOrderFilmTerminal4,
    actualSurveySpecialConstruction: data.actualSurveySpecialConstruction,
    actualSurveySpecialConstructionName: data.actualSurveySpecialConstructionName,
    actualSurveyGlassSurface: data.actualSurveyGlassSurface,
    actualSurveyFrameColor: data.actualSurveyFrameColor,
    actualSurveyWindowTintingEqup: data.actualSurveyWindowTintingEqup,
    actualSurveyWindowTintingEqupName: data.actualSurveyWindowTintingEqupName,
    actualSurveySilliconColor: data.actualSurveySilliconColor,
    actualSurveyVideoPreferencias: data.actualSurveyVideoPreferencias,
    actualSurveyVideoPreferenciasName: data.actualSurveyVideoPreferenciasName,
    actualSurveyVideoProjectionArea: data.actualSurveyVideoProjectionArea,
    actualSurveyCeilingHeight: data.actualSurveyCeilingHeight,
    actualSurveyProjectionDistance: data.actualSurveyProjectionDistance,
    actualSurveyProjectModel: data.actualSurveyProjectModel,
    actualSurveyProjectModelName: data.actualSurveyProjectModelName,
    actualSurveyProjectEqupCount: data.actualSurveyProjectEqupCount,
    actualSurveyProjectLensOption: data.actualSurveyProjectLensOption,
    actualSurveyProjectEqupType: data.actualSurveyProjectEqupType,
    actualSurveyCeilingType: data.actualSurveyCeilingType,
    actualSurveyTrafficSensorPosition: data.actualSurveyTrafficSensorPosition,
    actualSurveyCardinalPoints: data.actualSurveyCardinalPoints,
    actualSurveyIntensityIllumination: data.actualSurveyIntensityIllumination,
    actualSurveyWeather: data.actualSurveyWeather,
    actualSurveyVideoFormal: data.actualSurveyVideoFormal,
    actualSurveyVideoFormalName: data.actualSurveyVideoFormalName,
    actualSurveyFilmFinishingsType: data.actualSurveyFilmFinishingsType,
    actualSurveyControllerPosition: data.actualSurveyControllerPosition,
    actualSurveyElectricWiring: data.actualSurveyElectricWiring,
    actualSurveyElectricWiringType: data.actualSurveyElectricWiringType,
    actualSurveyDrivingType: data.actualSurveyDrivingType,
    actualSurveyDrivingTypeOuters: data.actualSurveyDrivingTypeOuters,
    actualSurveySignificantOuters: data.actualSurveySignificantOuters,
    actualSurveyOpinion: data.actualSurveyOpinion,
    actualSurveyCeilingTypeEtc: data.actualSurveyCeilingTypeEtc,
    actualSurveyIntensityIlluminationOut: data.actualSurveyIntensityIlluminationOut,
  };
  return createInstanceWithAuth(`/actualSurvey/${data.actualSurveySid}`, paramData, {}, "application/json; charset=utf-8").put();
}
function getActualSurveyReg(data) {
  let paramData = {
    prospectiveCustomerSid: data.prospectiveCustomerSid,
    actualSurveyName: data.adminUserName,
    actualSurveyDate: data.prospectiveCustomerSurveyDate,
    actualSurveyStatus: data.actualSurveyStatus,
  };
  return createInstanceWithAuth("/actualSurvey", paramData, {}, "application/json; charset=utf-8").post();
}
export { getActualSurveyList, getActualSurveyDetail, getActualSurveyUpdate, getActualSurveyReg };
