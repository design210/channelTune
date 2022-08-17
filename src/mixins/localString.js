let localeString = {
  methods: {
    __localeString(num) {
      const val = num === undefined || num === null ? 0 : num.toLocaleString();
      return val;
    },
  },
};
export default localeString;
