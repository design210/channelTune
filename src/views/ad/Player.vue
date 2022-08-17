<template>
  <section class="container">
    <div class="title-wrap">
      <h1>플레이어 관리</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2></h2>
            <div class="search">
              <input type="text" class="searchText" v-model="searchText" placeholder="플레이어 명 검색" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <caption>
              플레이어 리스트 테이블
            </caption>
            <colgroup>
              <col width="100" />
              <col width="100" />
              <col width="100" />
              <col width="*" />
              <col width="80" />
              <col width="80" />
              <col width="90" />
              <col width="80" />
            </colgroup>
            <thead>
              <tr>
                <th>고유 코드</th>
                <th>플레이어 명</th>
                <th>스토어 고유코드</th>
                <th>스토어 명</th>
                <th>앱 고유코드</th>
                <th>앱 동작여부</th>
                <th>동작 최종시간</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="detail(item.addtunePlayerSid)">
                <td>{{ item.addtunePlayerSid }}</td>
                <td class="left">{{ item.addtunePlayerName }}</td>
                <td>{{ item.companyStoreSid }}</td>
                <td class="left">{{ item.companyStoreName }}</td>
                <td class="left">{{ item.addtunePlayerAppCode }}</td>
                <td>{{ item.addtunePlayerLifeFlag }}</td>
                <td>6</td>
                <td>{{ item.addtunePlayerStatusName }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="8">플레이어 리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
      <section class="init-wrap section-box border-outside">
        <div class="border">
          <section class="d-flex justify-space-between right-header">
            <ul class="tab-wrap">
              <li :class="tabActive === 'playerStatus' ? 'active' : ''" @click="view('playerStatus')">플레이어 상태</li>
              <li :class="tabActive === 'playList' ? 'active' : ''" @click="view('playList')">재생 리스트</li>
              <li :class="tabActive === 'used' ? 'active' : ''" @click="view('used')">자원 사용량</li>
            </ul>
            <div>
              <v-btn small color="primary" dark @click="view('set')">설정</v-btn>
            </div>
            <div class="status-light-wrap">
              동작여부 :
              <span
                class="status-light"
                :class="{
                  normal: addtunePlayerStatus === 'SYS22811B008',
                  warning: addtunePlayerStatus === 'SYS22811B010',
                  error: addtunePlayerStatus === 'SYS22811B009',
                  ready: addtunePlayerStatus === 'SYS22811B011' || addtunePlayerStatus === '',
                }"
              >
              </span>
            </div>
          </section>
          <!-- 초기상태 -->
          <section v-if="tabActive === ''" class="basic">리스트를 선택해 주세요.</section>
          <!-- 플레이어 상태 -->
          <section v-if="tabActive === 'playerStatus'">
            <Status />
          </section>
          <!-- 재생 리스트 -->
          <section v-if="tabActive === 'playList'">
            <PlayList />
          </section>
          <!-- 자원 사용량 -->
          <section v-if="tabActive === 'used'">
            <Resource />
          </section>
          <!-- 설정 -->
          <section v-if="tabActive === 'set'">
            <Set :reset="clear" @listReload="reload" />
          </section>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import loading from "@/mixins/loading";
import bus from "@/utils/bus";

import Status from "@/components/player/Status";
import Resource from "@/components/player/Resource";
import PlayList from "@/components/player/PlayList";
import Set from "@/components/player/Set";
export default {
  components: { Status, Resource, PlayList, Set },
  mixins: [loading],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      tabActive: "",
      clear: false,
      addtunePlayerStatus: "",
    };
  },
  computed: {
    ...mapGetters("player", ["cmsPlayerList", "cmsPlayerDetail"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear = !this.clear;
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/GET_CMS_PLAYER_LIST", {
          size: this.size,
          page: this.page,
          searchText: this.searchText,
        });

        if (this.cmsPlayerList.channeltuneApiResult.errorCode === 200) {
          const playerList = this.cmsPlayerList.channeltuneApiResult.cmsPlayer;
          this.list = playerList.data;
          this.len = playerList.last_page;
        } else {
          this.alim(this.cmsPlayerList.channeltuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //탭 뷰
    view(name) {
      this.tabActive = name;
    },
    async detail(id) {
      this.$store.commit("player/selectPlayerId", id);
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("player/GET_CMS_PLAYER_DETAIL", id);
        if (this.cmsPlayerDetail.channeltuneApiResult.errorCode === 200) {
          const res = this.cmsPlayerDetail.channeltuneApiResult.cmsPlayer;
          this.addtunePlayerStatus = res.addtunePlayerStatus;
        } else {
          this.alim(this.cmsPlayerDetail.channeltuneApiResult.errorMessage, this.errorColor);
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

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 60% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
  & .section-box {
    width: calc(40% - 20px);
    & .border {
      & .field {
        & .required {
          font-weight: 700;
        }
      }
    }
  }
}
.searchText {
  border: 1px solid #ccc;
  height: 30px;
  padding: 0 10px;
  width: 250px;
}
.right-header {
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  & .status-light-wrap {
    position: absolute;
    top: 8px;
    left: 310px;
    & .status-light {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-left: 3px;
      &.normal {
        background-color: #2bf72b;
      }
      &.warning {
        background-color: #f7d32b;
      }
      &.error {
        background-color: #f63b17;
      }
      &.ready {
        background-color: #dddddd;
      }
    }
  }

  & .tab-wrap {
    display: flex;
    & > li {
      border-top: 1px solid #dfdfdf;
      border-right: 1px solid #dfdfdf;
      border-left: 1px solid #dfdfdf;
      padding: 5px 15px;
      margin-right: 5px;
      border-radius: 3px 3px 0 0;
      cursor: pointer;
      font-size: 1.3rem;
      position: relative;
      color: #333;
      &.active {
        background: #23b395;
        border-color: #23b395;
        color: #fff;
      }
    }
  }
}
.basic {
  text-align: center;
  padding-top: 70px;
}
</style>
