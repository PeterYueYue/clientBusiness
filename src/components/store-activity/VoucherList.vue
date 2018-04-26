<!--代金券列表-->
<template>
  <div class="busarea_active_main">
    <div class="tab_header busarea-active-title">
      <span>活动状态 : </span>
      <el-select v-model="valuez" placeholder="请选择" size="small">
        <el-option
          v-for="item in states"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="margin_l_20">门店选择 : </span>
      <el-select v-model="valuem" placeholder="请选择" size="small">
        <el-option
          v-for="item in stores"
          :key="item.shopId"
          :label="item.shopName"
          :value="item.shopId">
        </el-option>
      </el-select>
      <el-button class="query_button" :disabled="disabled" type="primary" size="small" @click="query">搜 索</el-button>
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

  import Vouchers from "./VoucherList_item.vue"
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service'
  export default {
    data() {
      return {
        noData:'',
        disabled:false,
        states: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '进行中'
        }, {
          value: '2',
          label: '已结束'
        },{
          value:'3',
          label:'待进行'
        }],
        valuez: '',
        stores: [{shopId:'',shopName:'全部门店'}],
        valuem: '',
        messages: [],
        datas: {
          shopId: '',
          voucherStatus: '0' 
        }
      }
    },
    mounted: function () {
      queryLogin();
      this.valuez = this.states[0].value;
//        获取门店列表
      let data = this.qs.stringify({
        pageNumber: '1',
        pageSize: '10000'
      });
      this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
        .then(res => {
          var downdata = res.data.content.resultList;
          this.stores = this.stores.concat(downdata);
        });
//      获取券列表
      let message = this.qs.stringify(this.datas);
      this.getList(message);
    },
    methods: {
//      列表
      getList: function (data) {
        queryLogin();
        this.$http.post(`${ipAddress}/front/inner_voucher!getAllVoucherList.action`, data)
          .then(res => {
            this.disabled = false;
            this.noData = res.data.content.resultList.length;
            this.messages = res.data.content.resultList;
          })
      },
//      搜索
      query: function () {
        queryLogin();
        if (this.valuez) {
          this.datas.voucherStatus = this.valuez;
        }
        if (this.valuem) {
          this.datas.shopId = this.valuem;
        }
        let message = this.qs.stringify(this.datas);
        this.disabled = true;
        this.getList(message);
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
      detail_item: Vouchers
    }
  }
</script>


<style>

  .margin_l_20 {
    display: inline-block;
    margin-left: 20px;
  }


  .pop-busarea-head {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #f4f4f4;
  }

  .pop-busarea-head span {
    margin-left: 20px;
  }
 
  .pop-busarea-section {
    position: relative;
  }

  .pop-main > div:nth-last-type(1) {
    outline: 10px solid red;
  }

  .pop-busarea-top {
    width: 100%;
    height: 35px;
    font-size: 12px !important;
  }

  .pop-p {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .pop-p span:nth-child(1) {
    display: inline-block;
    margin-left: 20px;
  }



  .pop-avatar span {
    /*width: 52px;*/
    /*height: 36px;*/
    /*background: url("../../../src/assets/images/logos.png") 50% 50% no-repeat;*/
  }

  .pop-word {
    width: 70%;
    display: flex;
    align-items: center;
  }




  .pop-busarea-body {
    display: flex;
    width: 100%;
    height: 150px;
    background-color: white;
  }

  .pop-end {
    width: 150px;
    height: 150px;
    margin-left: 220px;
    position: absolute;
    top: 0;
    background: url("../../assets/images/end.png") 50% 50% no-repeat;
  }

  .pop-busarea-title {
    width: 30%;
    height: 100%;
    display: flex;
  }

  .pop-busarea-title > span:nth-child(1) {
    width: 36%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pop-busarea-title > span:nth-child(1) > div {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }

  .pop-busarea-title > span:nth-child(2) {
    width: 64%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .pop-busarea-span > div {
    display: inline-block;
    width: 100%;
  }

  .pop-busarea-span > div > p:nth-child(1) {
    font-size: 16px;
  }

  .pop-busarea-span > div > p:nth-child(2) {
    font-size: 20px;
    margin-top: 20px;
    color: #f4333c;
  }

  .pop-busarea-main {
    width: 70%;
    border-left: 1px dashed #ddd;
  }

  .pop-busarea-tops {
    width: 100%;
    height: 100%;
    display: flex;
  }

  /*-----------------------------左边距离-------------------------------*/
  .pop-busarea-tops span:nth-child(1) {
    margin-left: 30px;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .pop-busarea-p > p {
    display: flex;
    margin-top: 4px;
    font-size: 12px !important;
  }

  .pop-busarea-p > p:nth-child(1) > span:nth-child(1) {
    text-align: left;
  }

  .pop-busarea-p > p > span:nth-child(1) {
    display: inline-block;
    width: 100px;
    text-align: right;
  }

  .pop-busarea-p > p > span:nth-child(2) {
    /*width: 400px;*/
    display: inline-block;
  }

  .pop-busarea-tops span:nth-child(2) {
    /*width: 30%;
    height: 100%;
    position: relative;*/
  }

  .pop-busarea-tops span:nth-child(2) > button,
  .pop-busarea-bottom span:nth-child(2) > button {
    position: absolute;
    right: 30px;
    width: 80px;
    height: 30px;
    color: white;
    line-height: 30px;
    background-color: #05a4e6;
    border-radius: 4px;
  }

  .pop-busarea-bottom {
    width: 100%;
    height: 100%;
    display: flex;
    float: left !important;
    background-color: #f5f5f5;
  }

  .pop-busarea-bottom span:nth-child(1) {
    margin-left: 100px;
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .pop-busarea-ps p {
    font-size: 16px;
    position: relative;
  }

  .pop-busarea-bottom span:nth-child(2) {
    width: 30%;
    height: 100%;
    position: relative;
  }

  .pop-busarea-ps .icon {
    color: #00a0ea;
    margin-right: 10px;
  }

  .pop-busarea-ps > p > span {
    font-size: 24px ;
    color: #f4333c;
    position: absolute;
    top: 2px;
  }

  .pop-busarea-span {
    color: #00a0ea;
  }

  .pop-busarea-span:hover {
    cursor: pointer;
  }

</style>
