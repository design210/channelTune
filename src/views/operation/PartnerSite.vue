<template>
  <section class="container">
    <div class="title-wrap">
      <h1>협력업체 사이트</h1>
    </div>
    <section>
      <div v-for="item in list" :key="item.sysCodeSid" class="partner mt30">
        <h1>{{ item.sysCodeName }}</h1>
        <div class="mt10">
          <span class="subject"><v-icon class="internet">mdi-web-box</v-icon>{{ item.sysCodeValName }}</span>
          <span class="contents"
            ><a :href="item.sysCodeVal" target="_blank">{{ item.sysCodeVal }}</a></span
          >
        </div>
        <div class="mt8">
          <span class="subject"><v-icon class="key">mdi-key-plus</v-icon>{{ item.sysCodeVal1Name }}</span>
          <span class="contents">{{ item.sysCodeVal1 }}</span>
        </div>
        <div class="mt8">
          <span class="subject"><v-icon class="doc">mdi-text-box-outline</v-icon>{{ item.sysCodeVal2Name }}</span>
          <span class="contents">{{ item.sysCodeVal2 }}</span>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  mixins: [loading],
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters("systemCode", ["getCode"]),
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("systemCode/GET_CODE", "SYS22407B001");
      if (this.getCode.channeltuneApiResult.errorCode === 200) {
        this.list = this.getCode.channeltuneApiResult.sysCodeList;
      } else {
        alert(this.getCode.channeltuneApiResult.errorMessage);
      }
    } catch (error) {
      this.alim(error, this.errorColor);
    } finally {
      bus.$emit("end:spinner");
    }
  },
};
</script>

<style lang="scss" scoped>
.partner {
  margin-bottom: 70px;
  padding: 0 20px;
  & h1 {
    font-size: 1.6rem;
    color: #333333;
    position: relative;
    padding-left: 15px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #9e9e9e;
    }
    padding-bottom: 3px;
    border-bottom: 1px dashed #ccc;
  }
  & .subject {
    width: 100px;
    font-size: 1.3rem;
    & .internet {
      font-size: 1.7rem;
      margin-right: 3px;
      vertical-align: -2px;
    }
    & .key {
      font-size: 1.7rem;
      margin-right: 3px;
      vertical-align: -2px;
    }
    & .doc {
      font-size: 1.7rem;
      margin-right: 3px;
      vertical-align: -2px;
    }
  }
  & .contents {
    font-size: 1.4rem;
  }
}
</style>
