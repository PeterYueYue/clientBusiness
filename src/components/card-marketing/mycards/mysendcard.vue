<!--我的卡位/我代发的券-->
<template>
  <div class="busarea_active_main">
      <div class="mycard_header sendcard_header">
        <span >活动状态 : </span>
        <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <span class="margin_l_30">门店选择 : </span>
        <el-select v-model="shopselectdatavalue" placeholder="请选择">
            <el-option
              v-for="item in shopselectdata"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId">
            </el-option>
          </el-select>
          <el-button @click="Querydata" class="margin_l_30" type="primary">搜 索</el-button>
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

    import List_item from "./mysendcard_item.vue";
    export default {
        data() {
            return {
                shopselectdata: [{
                    shopName: '全部门店',
                    shopId: ''
                }],
                shopselectdatavalue: '',
                productList: '',
                noData: '',
                status: '',
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
                value: '',
                messages: ''
            }
        },
        mounted: function() {
            this.status = this.options[0].value;
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
            getData() {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: "10000",
                    shopId: this.shopselectdatavalue,
                    status: this.status
                })
                this.$http.post(`${ipAddress}/front/ali_pass_order!getMyPullPassPager.action`, data)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        }
                        this.productList = res.data.content.resultList;
                        this.noData = res.data.content.totalCount;
                    })
            },
            Querydata() {
                this.getData();
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
    .sendcard_header {
        line-height: 28px;
        font-size: 14px;
    }
    
    .margin_l_30 {
        margin-left: 30px;
    }
    
    .sendcard_header .el-button {
        padding: 6px 12px;
    }
</style>