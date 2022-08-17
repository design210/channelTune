<template>
  <div>
    <div class="progress" v-if="toggle">
      <div class="p_container">
        <v-progress-linear color="#f15c5c" v-model="percent" background-color="#F7F7F7" :indeterminate="loading" height="20"
          ><span v-if="!loading">{{ percent }}%</span></v-progress-linear
        >
      </div>
    </div>

    <div class="modal-wrap">
      <div @click="close" class="close"><v-icon>mdi-close-thick</v-icon></div>
      <slot name="head"></slot>
      <div class="line" v-if="hideLine === false"></div>
      <div class="body">
        <slot name="body"></slot>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // 라인 감추기위한 props...
  props: {
    hideLine: {
      default: false,
      type: Boolean,
    },
    toggle: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      percent: 0,
      loading: false,
    };
  },
  computed: {
    percentageState() {
      return this.$store.getters["common/percentage"];
    },
  },
  watch: {
    percentageState(val) {
      this.percent = val;
      if (val === 100) {
        this.loading = true;
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  padding: 30px;
  max-height: 850px !important;
}
.close {
  position: absolute;
  right: 26px;
  top: 33px;
  cursor: pointer;
  z-index: 999;
}
.subject {
  margin-bottom: 5px;
}
.body {
  padding: 20px 0 0 0;
}
.line {
  border-top: 1px solid #ccc;
  margin-top: 10px;
}
.progress {
  z-index: 9999;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);

  & .p_container {
    position: absolute;
    width: 40%;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
