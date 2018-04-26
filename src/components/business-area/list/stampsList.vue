<template>
    <div class="busarea_active_main">
      <div class="tab_header busarea-active-title">
        <span>活动状态 : </span>
        <el-select v-model="statuselectvalues" placeholder="请选择" size="small">
          <el-option
            v-for="item in statuselectdatas"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="margin_l_20">门店选择 : </span>
        <el-select v-model="shopValues" placeholder="请选择" size="small">
          <el-option
            v-for="item in shopselectdatas"
            :key="item.id"
            :label="item.shopName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button class="query_button" type="primary" size="small" @click="productQuery">搜 索</el-button>
      </div>
      <div class="pop-busarea-section" v-for="message in productList">
        <detail_iteme :message="message"></detail_iteme>
      </div>
       <div class="pop-nomessage" v-if="noData == 0">
        <span>暂无数据</span>
       </div>
    </div>
   
</template>
<script>
  import stamps from './Stamps';
  import {getTicketList, getShopLists, getLoginStatus, getGoldList, getProductList} from './api';

  export default {
    data() {
      return {
        noData:'',
        productList: '',
        shopValues: '',
        shopselectdatas: [{shopName: '全部门店', id: ''}],
        shopselectvalues: '',
        statuselectdatas: [
          {value: '0', label: '全部'},
          {value: '1', label: '进行中'},
          {value: '2', label: '已结束'},
          {value: '3', label: '待进行'}
        ],
        statuselectvalues: '',
      }
    },
    mounted: function () {
      let message = this.qs.stringify({
        pageNumber: '1',
        pageSize: '10000'
      });
      getShopLists(message).then(res => {
          if(res.errorCode == "30005"){
            window.location.href='http://b.tingzhijun.com/merchant';
          }
          let downdata = res.content.resultList;
          this.shopselectdatas = this.shopselectdatas.concat(downdata);
      });
//            列表获取
      this.statuselectvalues = this.statuselectdatas[0].value;
      let datas = this.qs.stringify({
        listType: 1,
        voucherStatus: 0
      });

      this.getProductLists(datas);
    },
    methods: {
      productQuery: function () {
        let data = this.qs.stringify({
          listType: 1,
          shopId: this.shopValues,
          voucherStatus: this.statuselectvalues
        });
        this.getProductLists(data);
      },
      getProductLists: function (data) {
        getProductList(data)
          .then(res => {
            if(res.errorCode == "30005"){
              window.location.href='http://b.tingzhijun.com/merchant';
            }else{
            this.productList = res.content.resultList;
            this.noData=this.productList.length;
            }
          })
      }
    },
    components: {
      detail_iteme: stamps
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

</style>
