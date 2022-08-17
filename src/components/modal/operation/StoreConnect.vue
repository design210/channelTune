<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="v-application header">
        <h2>스토어 연결</h2>
        <div class="btn-group">
          <v-btn small @click="close">닫기</v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <section class="section-box">
          <div class="search-box">
            <input type="text" v-model="searchText" />
            <v-btn small color="primary" dark @click="reload(1)">검색</v-btn>
          </div>
          <div class="tbl-wrap mt20">
            <table class="tbl">
              <caption>
                스토어연결테이블
              </caption>
              <colgroup>
                <col width="200" />
                <col width="300" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>스토어고유코드</th>
                  <th>스토어명</th>
                  <th>스토어업체</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in list"
                  :key="index"
                  @click="send({ companyStoreSid: item.companyStoreSid, companyStoreName: item.companyStoreName })"
                >
                  <td>{{ item.companyStoreSid }}</td>
                  <td>{{ item.companyStoreName }}</td>
                  <td>{{ item.companyStoreCompanyName }}</td>
                </tr>
              </tbody>
              <tfoot v-if="list.length < 1">
                <tr>
                  <td colspan="3">스토어가 없습니다.</td>
                </tr>
              </tfoot>
            </table>
            <div class="text-center mt30">
              <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
            </div>
            <!-- 알럿 -->
            <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
          </div>
        </section>
      </div>
    </template>
    <template slot="footer">
      <!-- <v-btn small @click="close">취소</v-btn> -->
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import alimMixin from "@/mixins/alim.js";
import alim from "@/components/dialog/Alim";
export default {
  components: { modalWrap, alim },
  mixins: [loading, alimMixin],
  data() {
    return {
      size: 15,
      page: 1,
      searchText: "",
      len: null,
      list: [],

      onReadyCode: "SYS21A15B015",
      onServiceCode: "SYS21A15B016",
      containLinkedBridge: "N",
    };
  },
  computed: {
    ...mapGetters("companyStore", ["getCompanyStoreList"]),
  },
  watch: {
    page() {
      this.reload();
    },
  },
  mounted() {
    this.reload(1);
  },
  methods: {
    async reload(num) {
      if (num === 1) {
        this.page = 1;
      }

      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("companyStore/COMPANY_STORE_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
          // 운영준비중, 운영중 2가지 경우
          companyStoreStatusList: [this.onReadyCode, this.onServiceCode],

          // 연결된 스토어 포함여부 = N
          containLinkedBridge: this.containLinkedBridge,
        });
        if (this.getCompanyStoreList.channeltuneApiResult.errorCode == 200) {
          const res = this.getCompanyStoreList.channeltuneApiResult.companyStore;
          this.list = res.data;
          this.len = res.last_page;
        } else {
          this.alim(this.getCompanyStoreList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    send(data) {
      this.$attrs.update(data);
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  & input {
    width: calc(100% - 300px);
    height: 28px;
    border: 1px solid #aaaaaa;
    padding: 5px;
  }

  & button {
    margin-left: 5px;
  }
}
</style>
