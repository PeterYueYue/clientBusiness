<!--单品券列表-->
<template>
  <div class="pop-active-main">
    <div class="busarea_active_main ">
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
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="query_button" type="primary" size="small">搜 索</el-button>
      </div>
      <div class="pop-busarea-section" v-for="message in messages">
        <detail_item :message="message"></detail_item>
      </div>
    </div>
  </div>
</template>

<script>

  import Vouchers from "./Voucher.vue"

  export default {
    data(){
      return {
        states: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '进行中'
        }, {
          value: '选项3',
          label: '已结束'
        }, {
          value: '选项4',
          label: '计划中'
        }],
        valuez: '',
        stores: [{
          value: '选项1',
          label: '门店1'
        }, {
          value: '选项2',
          label: '门店2'
        }, {
          value: '选项3',
          label: '门店3'
        }, {
          value: '选项4',
          label: '门店4'
        }, {
          value: '选项5',
          label: '门店5'
        }],
        valuem: '',
        messages: [
          {
            id: '1',
            dataStart: '2017/2/12',
            money: '20.00',
            one: '消费者凭此券,支付金额抵押20..00元',
            two: '券有效期为2017/3/12至2017/12/2',
            three: '实时立减',
            four: '无',
            five: 'xxxxxxxxxxxxxxxxxxxxxxx',
            clinchMoney: '200.00',
            clinchNumber: '10.00',
            preferential: '20.00'
          },
          {
            id: '2',
            dataStart: '2017/2/12',
            money: '30.00',
            one: '消费者凭此券,支付金额抵押10.00',
            two: '呵呵呵',
            three: '斤斤计较军',
            four: '哟哟哟',
            five: '看见我就会IQ未婚妻',
            clinchMoney: '200.00',
            clinchNumber: '10.00',
            preferential: '20.00'
          },
          {
            id: '3',
            dataStart: '2017/2/12',
            money: '20.00',
            one: '消费者凭此券,支付金额抵押30.00',
            two: '呵呵呵',
            three: '斤斤计较军',
            four: '哟哟哟',
            five: '看见我就会IQ未婚妻',
            clinchMoney: '200.00',
            clinchNumber: '10.00',
            preferential: '20.00'
          }
        ]
      }
    },
    created: function () {
      var curRouter = this.$router.currentRoute;
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


<style >
  .pop-active-main {
    width: 100%;
    height: 100%;
  }



  .margin_l_20 {
    display: inline-block;
    margin-left: 20px;
  }

  .busarea-active-title {
    height:48px;
  }

  .pop-busarea-head {
  height: 60px;
  line-height: 60px;
  background-color: #F5F5F5;
  border-bottom: 1px solid #f4f4f4;
  }

  .pop-busarea-head span {
    margin-left: 20px;
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
    /*line-height: 40px;*/
  }

  .pop-p span:nth-child(1) {
    display: inline-block;
    margin-left: 20px;
  }


  .pop-avatar span {
    /*width: 52px;*/
    /*height: 36px;*/
  }

  .pop-words {
    width: 70%;
    margin-top: 10px;
  }

  .pop-words span:nth-child(1) {
    color: #f4333c;
    font-size: 30px;
  }


  .pop-busarea-body {
    display: flex;
    width: 100%;
    height: 150px;
    background-color: white;
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
    display: inline-block;
    font-size: 24px ;
    color: #f4333c;
    position: absolute;
    top: 2px;
  }


</style>
