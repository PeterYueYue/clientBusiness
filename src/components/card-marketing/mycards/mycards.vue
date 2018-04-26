<!--我的卡位Tab切换-->
<template>
  <div class="main">
    <div class="zj-div">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">我代发的券</el-menu-item>
        <el-menu-item index="2">我投放的券</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex: '1',
      }
    },
    mounted: function () {
      this.routerChange();
    },
    methods: {
      handleSelect: function (key, keyPath) {
        if(key == 1){
          this.$router.push({name: '/mysendcard'});
        }else if(key == 2){
          this.$router.push({name: '/myputcard'});
        }
      },
      routerChange(){
        if(this.$route.path == "/mysendcard"){
            this.activeIndex ='1'
        }
        if(this.$route.path == "/myputcard"){
            this.activeIndex ='2'
        }
      }
    },
    watch:{
      "$route":"routerChange"
    },
    created: function () {
      let curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    }
  }
</script>
<style>

</style>
