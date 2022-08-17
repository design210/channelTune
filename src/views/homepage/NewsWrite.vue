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
              보도자료 쓰기 테이블
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>상단공지</td>
                <td colspan="3">
                  <div class="radio">
                    <v-radio-group v-model="boardNewsTopFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>URL</td>
                <td colspan="3"><input type="text" v-model="boardNewsURL" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20">
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="linkList" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import alim from "@/components/dialog/Alim.vue";
import alimMixin from "@/mixins/alim.js";
import responseMixin from "@/mixins/response";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { alim },
  mixins: [alimMixin, responseMixin, loading],
  data() {
    return {
      boardNewsTopFlag: "N",
      boardNewsURL: "",
    };
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/news/list");
    },
    async save() {
      if (this.boardNewsURL === "") {
        this.alim("URL을 입력해주세요.", this.errorColor);
        return false;
      }
      try {
        bus.$emit("start:spinner");
        const res = await this.__getResponse("common/ADD_NEWS", {
          boardNewsTopFlag: this.boardNewsTopFlag,
          boardNewsURL: this.boardNewsURL,
        });

        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim("등록 되었습니다.", this.successColor);
        this.linkList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
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
</style>
