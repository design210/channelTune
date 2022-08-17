import axios from "axios";
function videoDownload(data) {
  let url = `${process.env.VUE_APP_API}/video/view/${data.id}`;
  if ((data?.transSid || "") !== "") {
    url += `?videoTransSid=${data.transSid}`;
  }

  axios({
    url: url,
    method: "GET",
    responseType: "blob",
  }).then(response => {
    var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");
    fileLink.href = fileUrl;
    fileLink.setAttribute("download", `${data.name}.${data.fileExt}`);
    document.body.appendChild(fileLink);

    fileLink.click();
  });
}
export { videoDownload };
