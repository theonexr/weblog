<template>
  <div class="back">
    <!-- <img src="@/assets/imgs/wallpaper.jpg" alt="" /> -->
    <TabLogin />
    <!-- <popo/> -->
  </div>
</template>

<script>
// import popo from "@/components/Home/popo"
import TabLogin from "@/components/Login/TabLogin";
export default {
  name: "home",
  components: {
    TabLogin,
    // popo
  },
  created(){
    // this.LoginIn()
  },
  methods:{
    // LoginIn(e){
    //   // this.$store.dispatch("UsersLogin", e)
    //   console.log(e);
    // }
  }
};
</script>

<style lang="less" scoped>
.back {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  img {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
}
</style>