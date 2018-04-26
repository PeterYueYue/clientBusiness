<!--我的卡位/我投放的券-->
<template>
  <div class="busarea_active_main">
    <div class="mycard_header sendcard_header">
        <span >活动状态 : </span>
        <el-select v-model="statuselectvalue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <span class="margin_l_30">门店选择 : </span>
        <el-select v-model="shopselectvalue" placeholder="请选择">
            <el-option
              v-for="item in shopselectdata"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId">
            </el-option>
          </el-select>
          <span class="margin_l_30">订购状态 : </span>
          <el-select v-model="buyvalue" placeholder="请选择">
            <el-option
              v-for="item in dinggouoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="margin_l_30" @click="querydata" type="primary">搜 索</el-button>
      </div>
      <div class="pop-busarea-section" v-for="message in productList">
        <detail_item :message="message"></detail_item>
      </div>
      <div class="pop-nomessage" v-if="noData == 0">
        <span>暂无数据</span>
       </div>
  </div>
</template>

<script>
    import {
        ipAddress
    } from '../../../service'
    import List_item from "./myputcard_item.vue";
    export default {
        data() {
            return {
                shopselectdata: [{
                    shopName: '全部门店',
                    shopId: ''
                }],
                options: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '0',
                    label: '未开始'
                }, {
                    value: '1',
                    label: '进行中'
                }, {
                    value: '2',
                    label: '已结束'
                }, {
                    value: '3',
                    label: '已下架'
                }, ],
                dinggouoptions: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '0',
                    label: '未上架'
                }, {
                    value: '1',
                    label: '已上架'
                }, {
                    value: '2',
                    label: '已被领取'
                }, ],
                statuselectvalue: '',
                shopselectvalue: '',
                buyvalue: '',
                productList: '',
                noData: '',
                messages: '',
            }
        },
        mounted: function() {
            //门店获取
            let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
                .then(res => {
                    if (res.data.errorCode == "30005") {
                        window.location.href = 'http://b.tingzhijun.com/merchant';
                    }
                    var downdata = res.data.content.resultList;
                    this.shopselectdata = this.shopselectdata.concat(downdata);
                })
            this.getData();

        },
        methods: {
            querydata() {
                this.getData()
            },
            getData() {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000',
                    shopId: this.shopselectvalue,
                    status: this.buyvalue,
                    passStatus: this.statuselectvalue,
                })
                this.$http.post(`${ipAddress}/front/ali_pass_market!getMyPushPassPager.action`, data)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        }
                        this.productList = res.data.content.resultList;
                        this.noData = res.data.content.totalCount;
                    })
            }
        },
        created: function() {
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        },
        components: {
            detail_item: List_item
        } 
    }
</script>
<style>

</style>