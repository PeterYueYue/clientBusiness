<!--店铺管理/扫码点餐-->
<template>
  <div class="main">
    <div class="zj-div">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">&#X3000;餐台管理&#X3000;</el-menu-item>
        <el-menu-item index="2">&#X3000;点餐管理&#X3000;</el-menu-item>
        <el-menu-item index="3">&#X3000;账单流水&#X3000;</el-menu-item>
        <el-menu-item index="4">公告活动设置</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex2: '1'
      };
    },
    mounted: function () {
      this.routerChange();
    },
    methods: {
     handleSelect: function (key, keyPath) {
        if (key == 1) {
          this.$router.push({name: "/tablesManagement"});
        }
        if (key == 2) {
          this.$router.push({name: "/orderManagement"});
        }
        if (key == 3) {
          this.$router.push({name: "/billStatistics"});
        }
        if (key == 4) {
          this.$router.push({name: "/activitySettings"});
        }
      },
      routerChange(){
        if(this.$route.path == "/tablesManagement"){
            this.activeIndex2 ='1'
        }
        if(this.$route.path == "/orderManagement"){
            this.activeIndex2 ='2'
        }
        if(this.$route.path == "/billStatistics"){
            this.activeIndex2 ='3'
        }
        if(this.$route.path == "/activitySettings"){
            this.activeIndex2 ='4'
        }
      }

    }
  };
</script>

<style>
  .pop-main {
    margin-left: 16px;
    margin-top: 15px;
    background: white;
  }

  .pop-head {
    display: flex;
    height: 42px;
    align-items: center;
    background-color: white;
    font-size: 14px;
    border-bottom: 2px solid #ebebeb;
  }

  .pop-head span {
    width: 105px;
    height: 42px;
    display: flex;
  }

  .pop-head li {
    display: inline-block;
    /*outline:1px solid red;*/
  }

  .pop-head li:hover {
    cursor: pointer;
  }

  .pop-head li span {
    display: inline-block;
    height: 42px;
    padding-top: 12px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }

  .pop-head span:nth-child(1) {
    margin-left: 12px;
  }

  .pop-head-li {
    color: black !important;
  }

  .underline {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: 2px solid #00a0e9;
    color: #00abea;
  }

  .pop-datails {
    /*outline:1px solid red;*/
    margin-top: 0px;
    background-color: white;
  }
</style>
