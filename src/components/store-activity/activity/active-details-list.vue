<template>
  <div class="main">
    <div class="zj-div">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">单品券列表</el-menu-item>
        <el-menu-item index="2">代金券列表</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex2: '1',
        defaults: 1
      }
    },
    mounted: function () {
      this.routerChange();
    },
    methods: {
      handleSelect: function (key, keyPath) {
        if(key == 1){
          this.$router.push({name: '/insideticketList'});
        }else if(key == 2){
          this.$router.push({name: '/voucherList'});
        }
      },
      routerChange(){
        if(this.$route.path == "/insideticketList"){
            this.activeIndex2 ='1'
        }
        if(this.$route.path == "/voucherList"){
            this.activeIndex2 ='2'
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
