<!--营销活动/外部券-->
<template>
  <div class="main">
    <div>
      <ul class="pop-head">
            <span>
              <li @click="add(data.isActive)" v-bind:class="{underline :isActive == data.isActive}"
                  v-for=" data in menu">
                <span>{{data.name}}</span>
              </li>
            </span>
      </ul>
      <div class="pop-datail">
        <!--<transition name="bounce">-->
        <router-view></router-view>
        <!--</transition>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        menu: [
          {isActive: '1', name: "已购卡位"},
          {isActive: '2', name: "卡位市场"},
          {isActive: '3', name: "活动列表"},
          {isActive: '4', name: "我的卡位"},
          {isActive: '5', name: "卡位流水"}
        ],
        isActive: '1'
      }
    },
    created: function () {
      var curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    },
    methods: {
      add: function (event) {
        this.isActive = event;
        if (event == 1) {
          this.$router.push({path: "/outsideticket/alreadyScreens"});
        }
        if (event == 2) {
          this.$router.push({path: "/outsideticket/screensMarket"});
        }
        if (event == 3) {
          this.$router.push({path: "/outsideticket/activityList"});
        }
        if (event == 4) {
          this.$router.push({path: "/outsideticket/myScreen"});
        }
        if (event == 5) {
          this.$router.push({path: "/outsideticket/screenWate"});
        }

      }
    }
  }
</script>

<style scoped>
  .pop-main {
    margin-left: 16px;
    margin-top: 15px;
    background: white;
  }

  .pop-head {
    display: flex;
    height: 42px;
    align-items: center;
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

  .pop-datail {
    /*outline:1px solid red;*/
    margin-top: 8px;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-out .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
