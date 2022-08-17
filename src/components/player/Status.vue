<template>
  <div>플레이어상태</div>
</template>

<script>
export default {
  created() {
    this.$socket.on("monitoring", data => {
      console.log(data);
    });
  },
};
</script>

<style scoped></style>
