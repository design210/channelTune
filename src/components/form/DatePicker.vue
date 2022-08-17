<template>
  <v-menu v-model="visible" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" :nudge-left="nudge">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        v-bind="attrs"
        v-on="on"
        class="date"
        @click="hangleDelete"
        autocomplete="no"
        :readonly="readOnly === true"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="visible = false"
      locale="ko"
      :picker-date.sync="pickerDate"
      autocomplete="no"
      :readonly="readOnly === true"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: ["propdate", "clear", "current", "readOnly", "defaultValue", "nudge"],
  data() {
    return {
      date: "",
      visible: false,
      pickerDate: null,
    };
  },
  watch: {
    date(value) {
      this.$emit("updateDate", value);
    },
    pickerDate() {
      this.hangleDelete();
    },
    propdate(val) {
      this.date = val;
    },
    current(val) {
      if (val !== "") {
        this.date = val;
      }
    },
    clear(o, n) {
      if (o !== n) {
        this.date = "";
      }
    },
    defaultValue(n) {
      this.date = n;
    },
  },
  mounted() {
    //초기 값을 보여주고 싶은 값이 있다면
    this.$nextTick(function () {
      if (this.defaultValue !== null || this.defaultValue !== "") {
        this.date = this.defaultValue;
      }
    });
  },

  methods: {
    //'일' 제거
    hangleDelete() {
      let time = setTimeout(function () {
        const day = document.querySelectorAll(".v-date-picker-table .v-btn__content");
        day.forEach(ele => {
          ele.textContent = ele.textContent.replace("일", "");
        });
        clearInterval(time);
      }, 100);
    },
  },
};
</script>
