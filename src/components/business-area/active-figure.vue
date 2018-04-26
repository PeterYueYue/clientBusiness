<!--店铺商圈/积分抵现-->
<template>
  <div class="busarea_active_main">
    <div class="tab_header busarea-active-title">
      <span>活动状态 : </span>
      <el-select v-model="statuselectvalue" placeholder="请选择" size="small">
        <el-option
          v-for="item in statuselectdata"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="margin_l_20">门店选择 : </span>
      <el-select v-model="shopselectvalue" placeholder="请选择" size="small">
        <el-option
          v-for="item in shopselectdata"
          :key="item.shopId"
          :label="item.shopName"
          :value="item.shopId">
        </el-option>
      </el-select>
      <el-button class="query_button" type="primary" size="small" @click="query">搜 索</el-button>
    </div>
    <div class="pop-busarea-section" v-for="message in messages">
      <detail_item :message="message"></detail_item>
    </div>
    <div class="pop-nomessage" v-if="noData == 0">
      <span>暂无数据</span>
    </div>
  </div>

</template>

<script>
  import Item from "./money.vue"
  import {ipAddress} from '../../service'
  export default {
    data() {
      return {
        noData: '',
        messages: [],
        shopselectdata: [{shopId:'',shopName:'全部门店'}],
        shopselectvalue: '',
        statuselectdata: [
          {value: '0', label: '全部'},
          {value: '1', label: '进行中'},
          {value: '2', label: '已结束'},
          {value: '3', label: '待进行'},
        ],
        statuselectvalue: '',

      }
    },
    mounted: function () {
      this.statuselectvalue = this.statuselectdata[1].value;
//门店获取
      let data = this.qs.stringify({
        pageNumber: '1',
        pageSize: '10000'
      });
      this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
        .then(res => {
          if(res.data.errorCode == "30005"){
            window.location.href='http://b.tingzhijun.com/merchant';
          }
          var downdata = res.data.content.resultList;
          this.shopselectdata = this.shopselectdata.concat(downdata);
        })
//      获取列表
      let message = this.qs.stringify({
        enable: this.statuselectvalue
      });
      this.getList(message);
    },
    methods: {
      getList: function (data) {
        this.$http.post(`${ipAddress}/front/circle_point!integralList.action`, data)
          .then(res => {
            if(res.data.errorCode == "30005"){
              window.location.href='http://b.tingzhijun.com/merchant';
            }
            this.noData = res.data.content.list.length;
            this.messages = res.data.content.list;
          })
      },
      query: function () {
        let data = this.qs.stringify({
          enable: this.statuselectvalue,
          shopId: this.shopselectvalue
        });
        this.getList(data);
      }
    },
    created: function () {
      let curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    },
    components: {
      detail_item: Item
    }
  }
</script>
<style>
  .busarea_active_main {
    color: #333;
    overflow: auto;
    /*background: white;*/
    height: calc(100% - 54px);
  }

  .pop-nomessage {
    height: calc(100% - 60px);
    text-align: center;
    background-color: white;
  }

  .pop-nomessage > span {
    display: inline-block;
    margin-top: 40px;
    color: #5e7382;
    font-size: 12px;
  }
</style>
