<template>
  <div class="v-application">
    <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="date" persistent width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="date" v-on="on" @click="hangleDelete"></v-text-field>
      </template>
      <v-date-picker v-model="date" scrollable locale="ko" :picker-date.sync="pickerDate">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="dateModal = false">취소</v-btn>
        <v-btn color="primary" @click="timeModal = true">확인</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog ref="dialog2" v-model="timeModal" :return-value.sync="time" persistent width="290px">
      <v-time-picker v-if="timeModal" v-model="time" format="24hr">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="timeModal = false">취소</v-btn>
        <v-btn color="primary" @click="set()">확인</v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DateTimePicker",
  props: ["current", "clear"],
  data: () => ({
    date: "",
    dateModal: false,
    time: "",
    timeModal: false,
    pickerDate: null,
  }),
  watch: {
    date(date) {
      this.$emit("date", date);
    },
    pickerDate() {
      this.hangleDelete();
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
  },
  methods: {
    set() {
      this.date = this.date + " " + this.time;
      this.$refs.dialog.save(this.date);
      this.$refs.dialog2.save(this.time);
    },
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
