import { createInstanceWithAuth } from "../index";
function getVideoView(data) {
  let param = {
    videoTransSid: data.videoTransSid,
  };
  return createInstanceWithAuth(`/video/view/${data.videoSid}`, {}, param, "application/json; charset=utf-8").get();
}

function deleteVideo(id) {
  return createInstanceWithAuth(`/video/${id}`, {}, {}, "application/json; charset=utf-8").delete();
}

export { getVideoView, deleteVideo };
