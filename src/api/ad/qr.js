import { createInstanceWithAuth } from "../index";

const QrGenerator = data => {
  let param = {
    organizeCampaignSid: data.organizeCampaignSid,
    eventQrLinkUrl: data.eventQrLinkUrl,
    eventQrTitle: data.eventQrTitle,
    eventQrStatus: data.eventQrStatus,
  };
  return createInstanceWithAuth("/OrganizeCampaign/qr", param, {}, "application/json; charset=utf-8").post();
};

const downLoadQr = id => {
  return createInstanceWithAuth(`/OrganizeCampaign/qrdown/${id}`, {}, {}, "application/json; charset=utf-8").get();
};

const QrEventLog = data => {
  let param = {
    startDate: data.startDate,
    ednDate: data.ednDate,
  };
  return createInstanceWithAuth(`/OrganizeCampaign/qrlog/${data.eventQrSid}`, param, {}, "application/json; charset=utf-8").get();
};
export { QrGenerator, downLoadQr, QrEventLog };
