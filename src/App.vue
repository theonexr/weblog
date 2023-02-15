<template>
  <div id="app">
    <router-view />
    <!-- <bird/> -->
  </div>
</template>
<script>
import bird from '../src/components/Demo/bird.vue'
export default {
  components: { bird },
  data() {
    return {

    };
  },

  created() {
  },
  methods: {

  },
};
</script>

<style lang="less">
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-family: "Courier New", Courier, monospace;
  // text-align: center;
}
</style>
