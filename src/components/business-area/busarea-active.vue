<!--店铺商圈/商圈代价券-->
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
</template>

<script>

  import Item from "./Item.vue"
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service'
  export default {
    data(){
      return {
        messages: [
          {
            id: '1',
            dataStart: '2017/2/12',
            space:'第二家',
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
            space:'第二家',
            money: '30.00',
            one: '哈哈哈哈',
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
            space:'第二家',
            money: '20.00',
            one: '哈哈哈哈',
            two: '呵呵呵',
            three: '斤斤计较军',
            four: '哟哟哟',
            five: '看见我就会IQ未婚妻',
            clinchMoney: '200.00',
            clinchNumber: '10.00',
            preferential: '20.00'
          }
        ],
        shopselectdata: [
          {value: 'value1', label: '选择1'},
          {value: 'value2', label: '选择2'},
          {value: 'value3', label: '选择3'},
        ],
        shopselectvalue: '',
        statuselectdata: [
          {value: 'value1', label: '全部'},
          {value: 'value2', label: '进行中'},
          {value: 'value3', label: '已结束'},
        ],
        statuselectvalue: '',

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
      detail_item: Item
    }
  }
</script>
<style>

</style>
