<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>광고 캠페인 리스트</h2>
    </template>
    <template slot="body">
      <div class="v-application">
        <div>
          <div class="header right">
            <div class="search">
              <input type="text" placeholder="캠페인명을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              광고 캠페인 리스트
            </caption>
            <colgroup>
              <col width="100" />
              <col width="*" />
              <col width="120" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>캠페인 고유코드</th>
                <th class="left">캠페인 명</th>
                <th>캠페인 형식</th>
                <th>캠페인 슬롯 수</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="compaignDetail(item)">
                <td>{{ item.organizeCampaignSid }}</td>
                <td class="left">{{ item.organizeCampaignTitle }}</td>
                <td>{{ item.organizeCampaignTypeName }}</td>
                <td>{{ item.organizeCampaignSlot }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="4">캠페인 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>

          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
          <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
        </div>
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
import alim from "@/components/dialog/Alim";
import loading from "@/mixins/loading";
import alimMixin from "@/mixins/alim";
import bus from "@/utils/bus";
export default {
  components: {
    modalWrap,
    alim,
  },
  mixins: [loading, alimMixin],
  data() {
    return {
      page: 1,
      size: 15,
      len: null,
      list: [],

      searchText: "",
    };
  },
  computed: {
    ...mapGetters("campaign", ["getCampaignList"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    compaignDetail(data) {
      this.$attrs.update(data);
      this.$emit("close");
    },
    async reload(num) {
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("campaign/GET_CAMPAIGN_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });
        const res = this.getCampaignList.channeltuneApiResult;
        if (res.errorCode === 200) {
          const campaignList = res.organizeCampaign;
          this.list = campaignList.data;
          this.len = campaignList.last_page;
        } else {
          this.alim(res.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
