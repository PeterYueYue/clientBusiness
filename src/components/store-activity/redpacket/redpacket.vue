<!--支付宝红包页面-->
<template>
  <div class="main mained">
    <div class="zj-div">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">红包活动类型</el-menu-item>
        <el-menu-item index="2">红包活动列表</el-menu-item>
      </el-menu>
      <div style="width:100%">
        &#x3000;
        <span @click="dialogVisible = true" style="margin-top:1px;">帮助</span>&#x3000;
        <span @click="dialogVisible = true" style="margin-right:8px;margin-top:1px;"></span>
      </div>
    </div>

    <el-dialog title="帮助" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose" class="zj-dialog">
      <!--<span>这是一段信息</span>-->
      <p style="font-size: 12px;">1.创建支付宝活动,商家需要先签约支付宝"营销活动送红包"产品</p>
      <p style="font-size: 12px;">2.签约地址:
        <span style="color: deepskyblue;">https://b.alipay.com</span>
      </p>
      <p style="font-size: 14px;margin-top: 5px;">支付宝红包提示:</p>
      <div class="list">
        <span class="number">1</span>
        <span>登录支付宝商家中心</span>
        <span class="rate"></span>
        <span class="number">2</span>
        <span>进入产品中心</span>
        <span class="rate"></span>
        <span class="number">3</span>
        <span>选择营销活动送红包</span>
      </div>
      <!--<span slot="footer" class="dialog-footer"></span>-->
    </el-dialog>
    <router-view></router-view>
  </div>
</template>
<style scoped>
.mained {
  /* outline: 1px solid red; */
  overflow-y: hidden;
}

.zj-dialog {
  margin-top: 150px;
}

.list {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
}

.zj-div span {
  /* width: 400px; */
  position: relative;
  top: -30px;
  right: 20px;
  margin-top: -10px;
  line-height: 15px;
  /* outline: 1px solid red; */
}

.rate {
  width: 30px;
  height: 10px;
  margin: 0 4px;
  /*outline: 1px solid red;*/
  margin-top: 4px;
  background: url("../../../assets/images/toLeft.png") no-repeat;
  /*background-size: contain;*/
  background-size: 100% 100%;
}

.number {
  margin: 2px 2px;
  display: inline-block;
  width: 15px;
  text-align: center;
  line-height: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00a0e9;
  color: #fff;
}

.zj-div div span:nth-child(2) {
  float: right;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("../../../assets/images/help.png");
  background-size: contain;
}

.zj-div div span:nth-child(1) {
  font-size: 12px;
  float: right;
}
</style>
<script>

export default {
  data() {
    return {
      dialogVisible: false,
      activeIndex2: '1',
      defaults: 1
    }
  },
  mounted: function() {
    this.routerChange();
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleSelect: function(key, keyPath) {
      if (key == 1) {
        this.$router.push({ name: '/packettype' });
      } else if (key == 2) {
        this.$router.push({ name: '/packetactivelist' });
      }
    },
    routerChange() {
      if (this.$route.path == "/packettype") {
        this.activeIndex2 = '1'
      }
      if (this.$route.path == "/packetactivelist") {
        this.activeIndex2 = '2'
      }
    }
  },
  watch: {
    "$route": "routerChange"
  },
  created: function() {
    let curRouter = this.$router.currentRoute;
    this.$store.commit("dealData", {
      path: curRouter.path,
      name: curRouter.meta.name
    });
  }
}
</script>
