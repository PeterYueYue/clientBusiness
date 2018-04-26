<template>
  <div class="main">
    <div class="zj-div">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">单品券活动</el-menu-item>
        <el-menu-item index="2">代金券活动</el-menu-item>
        <el-menu-item index="3">积分抵现活动</el-menu-item>
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
          this.$router.push({name: '/stampsList'});
        }else if(key == 2){
          this.$router.push({name: '/voucherLists'});
        }else if(key == 3){
          this.$router.push({name: '/integralList'});
        }
      },
      routerChange(){
        if(this.$route.path == "/stampsList"){
            this.activeIndex2 ='1'
        }
        if(this.$route.path == "/voucherLists"){
            this.activeIndex2 ='2'
        }
        if(this.$route.path == "/integralList"){
            this.activeIndex2 ='3'
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
