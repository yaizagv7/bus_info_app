<template>
  <v-app id="inspire">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>

export default {
  data: function () {
    return {
      title: "Bus +Info mApp",
    };
  },
  methods: {
    processParams: function (route) {
      if (route.name === "about") {
      }
    },
    fixHeight: function () {
      let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      let wrapEl = document.getElementsByClassName("application--wrap")[0];
      wrapEl.setAttribute("style", "min-height:" + height + "px");
    },
  },
  created() {
    this.processParams(this.$route);
  },
  mounted() {
    this.fixHeight();
    window.addEventListener("resize", this.fixHeight);
  },
  watch: {
    $route(to, from) {
      this.processParams(to);
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
.v-item-group.v-bottom-nav--fixed {
  z-index: 11;
}
</style>