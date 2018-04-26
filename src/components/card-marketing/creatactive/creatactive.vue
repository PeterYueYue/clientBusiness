<!--创建券活动Tab切换-->
<template>
  <div class="main">
    <div class="zj-div">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">引流券创建</el-menu-item>
        <el-menu-item index="2">券活动列表</el-menu-item>
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
          this.$router.push({name: '/createcoupons'});
        }else if(key == 2){
          this.$router.push({name: '/couponsActList'});
        }
      },
      routerChange(){
        if(this.$route.path == "/createcoupons"){
            this.activeIndex ='1'
        }
        if(this.$route.path == "/couponsActList"){
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
  .el-menu-demo {
    background-color: white;
  }


  .dStyle {
    border-bottom: 2px solid #20a0ff;
    color: #20a0ff;
  }

  .zj-div {
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #f5f5f5;
  }

  .zj-div > span:nth-child(1) {
    margin-left: 20px;
  }

  .zj-span:hover {
    cursor: pointer;
  }

  .zj-span {
    display: inline-block;
    width: 100px;
    height: 100%;
    line-height: 50px;
    text-align: center;
  }
</style>
