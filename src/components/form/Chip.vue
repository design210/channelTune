<template>
  <ul class="chip-container">
    <li v-for="item in array" :key="item.key" @click="chipClick(item)">
      {{ item.value }}
      <div class="close-btn" @click.stop="deleteChip(item.value)"><v-icon size="19" right color="#848484">mdi-close-circle-outline</v-icon></div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["array"],

  methods: {
    deleteChip(item) {
      console.log("딜리트");
      //value 삭제
      this.$emit("chipDelete", item);
    },
    chipClick(item) {
      console.log("클릭");
      this.$emit("chipSelect", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.chip-container {
  display: flex;
  list-style: none;
  & li:not(:last-child) {
    margin-right: 10px;
  }
  & li {
    position: relative;
    background-color: #e1e1e1;
    border-radius: 16px;
    padding: 3px 16px 3px 10px;
    cursor: pointer;

    & .close-btn {
      position: absolute;
      top: -5px;
      right: -5px;
      cursor: pointer;
      display: none;

      & i {
        background-color: white;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    &:hover {
      background-color: #ff4d56;
      color: white;

      & .close-btn {
        display: block;
      }
    }
  }
}
</style>
