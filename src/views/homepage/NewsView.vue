<template>
  <section class="container">
    <div class="title-wrap">
      <h1>보도자료</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <table class="read-tbl">
            <caption>
              보도자료 읽기 테이블
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>작성일</td>
                <td>{{ __getLocalTime(created_at) }}</td>
                <td>수정일</td>
                <td>{{ __getLocalTime(updated_at) }}</td>
              </tr>
              <tr>
                <td>상단공지</td>
                <td colspan="3" v-if="modify === false">{{ boardNewsTopFlag }}</td>
                <td colspan="3" v-else>
                  <div class="radio">
                    <v-radio-group v-model="boardNewsTopFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td colspan="3">{{ boardNewsTitle }}</td>
              </tr>
              <tr class="ql-snow">
                <td>내용</td>
                <td colspan="3" v-html="boardNewsDescription" class="ql-editor"></td>
              </tr>
              <tr class="ql-snow">
                <td>URL</td>
                <td colspan="3" v-if="modify === false">{{ boardNewsURL }}</td>
                <td colspan="3" v-else><input type="text" v-model="boardNewsURL" /></td>
              </tr>
              <tr>
                <td>사진</td>
                <td colspan="3">
                  <img :src="boardNewsImageURL" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20" v-if="modify === false">
        <v-btn small color="warning" @click="modifyset" class="btn-search">수정</v-btn>
        <v-btn small color="error" @click="confirm" class="btn-search">삭제</v-btn>
        <v-btn small @click="linkList" class="btn-search">목록</v-btn>
      </section>

      <section class="btn-group mt20" v-else>
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="cancel" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </section>
</template>

<script>
import loading from "@/mixins/loading";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import responseMixin from "@/mixins/response";
import utcTimeMixin from "@/mixins/utcTime";
import bus from "@/utils/bus";
export default {
  components: { alim, confirm },
  mixins: [loading, alimMixin, deleteMixin, responseMixin, utcTimeMixin],
  data() {
    return {
      modify: false,

      boardNewsSid: 9,
      boardNewsDescription: "",
      boardNewsImageURL: "",
      boardNewsTitle: "",
      boardNewsTopFlag: "",
      boardNewsURL: "",
      created_at: "",
      updated_at: "",
    };
  },
  mounted() {
    this.reload();
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/news/list");
    },

    // detail
    async reload() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/DETAIL_NEWS", this.$route.params.id);
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        const data = res.boardNews;
        this.boardNewsSid = data.boardNewsSid;
        this.boardNewsDescription = data.boardNewsDescription;
        this.boardNewsImageURL = data.boardNewsImageURL;
        this.boardNewsTitle = data.boardNewsTitle;
        this.boardNewsTopFlag = data.boardNewsTopFlag;
        this.boardNewsURL = data.boardNewsURL;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // update
    async save() {
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/UPDATE_NEWS", {
          boardNewsSid: this.boardNewsSid,
          boardNewsTopFlag: this.boardNewsTopFlag,
          boardNewsURL: this.boardNewsURL,
        });

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim("정상적으로 수정되었습니다.", this.successColor);
        await this.reload();
        this.cancel();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },

    // set modify
    modifyset() {
      this.modify = true;
    },
    cancel() {
      this.modify = false;
    },

    // delete
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            const res = await this.__getResponse("common/DELETE_NEWS", this.boardNewsSid);
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            this.linkList();
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  text-align: center;
  & button {
    margin: 0 2px;
  }
}
.download-wrap {
  display: flex;
  flex-direction: column;
  & .download {
    cursor: pointer;
    margin-bottom: 3px;
    &:hover {
      color: rgb(73, 126, 196);
    }
  }
}
</style>
