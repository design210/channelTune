const utcMixin = {
  methods: {
    __convertUtcTime(time) {
      return this.$date(time).utc().format();
    },
    __getLocalTime(time) {
      return this.$date(time).utc().local().format("YYYY-MM-DD HH:mm:ss");
    },
  },
};

export default utcMixin;
