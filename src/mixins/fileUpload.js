import { fileDownload } from "@/utils/fileDownload";
import { videoDownload } from "@/utils/videoDownload";
let fileUpload = {
  data() {
    return {
      deleteAllFiles: false,
    };
  },
  methods: {
    //파일 업로드
    uploadFiles(data) {
      this.channeltuneFiles = data;
    },
    uploadFiles1(data) {
      this.channeltune1Files = data;
    },
    uploadFiles2(data) {
      this.channeltune2Files = data;
    },
    //파일 전체 삭제
    deleteAllChip() {
      this.deleteAllFiles = !this.deleteAllFiles;
    },
    //파일다운로드
    fileDownload(data) {
      fileDownload(data);
    },
    videoDownload(data) {
      videoDownload(data);
    },
  },
};
export default fileUpload;
