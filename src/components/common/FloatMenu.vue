<template>
  <section class="v-speed-dial-wrap">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-inbox-full </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green">
        <v-icon>mdi-cellphone-message</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-email-edit-outline</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-comment-text-outline</v-icon>
      </v-btn>
    </v-speed-dial>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      top: false,
      right: true,
      bottom: true,
      left: false,
      direction: "top",
      hover: false,
      transition: "slide-y-reverse-transition",
    };
  },
};
</script>

<style lang="scss" scoped>
.v-speed-dial-wrap {
  position: fixed;
  bottom: 0px;
  left: 30px;
  z-index: 1000;
}
</style>
