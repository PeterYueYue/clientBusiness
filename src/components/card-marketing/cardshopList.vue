<!--卡位市场-->
<template>
  <div class="main">
    <div class="mycard_header">
      <div class="query_div">
        <span>门店名称 : </span>
        <el-input size="small" placeholder="请输入门店名称" @keyup.enter.native="querydata" v-model="mendian"></el-input>
        <span class="margin_l_20">活动时间 : </span>
        <el-date-picker
          v-model="activetime"
          :editable="editable"
          type="daterange"
          placeholder="请选择日期范围">
        </el-date-picker>
        <el-button @click="querydata" class="bottom_button" size="small" type="primary">搜 索</el-button>
      </div>
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
    import List_item from "./cardshopList_item.vue";
    import {
        formateDate
    } from '../../api/CommonMethods'
    import {
        ipAddress
    } from '../../service'

    export default {
        data() {
            return {
                editable: false,
                mendian: '',
                activetime: [],
                productList: '',
                noData: '',
                beginDate: '',
                endDate: '',
                messages: '',
            }
        },
        mounted: function() {
            this.getdata();
        },
        methods: {
            querydata() {
                this.getdata();
            },
            getdata() {
                if (this.activetime[0]) {
                    this.beginDate = formateDate(this.activetime[0]);
                    this.endDate = formateDate(this.activetime[1]);
                } else {
                    this.beginDate = '';
                    this.endDate = '';
                }
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000',
                    shopName: this.mendian,
                    beginDate: this.beginDate,
                    endDate: this.endDate,
                });
                this.$http.post(`${ipAddress}/front/ali_pass_market!getPassMarketPager.action`, data)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        }
                        this.productList = res.data.content.resultList;
                        this.noData = res.data.content.totalCount;
                    });

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
    .mycard_header {
        padding: 10px;
        border-bottom: 3px solid #f4f4f4;
    }
    
    .mycard_header .place_choose {
        line-height: 30px;
        display: inline-block;
        border-left: 10px solid #00a0e9;
        padding-left: 10px;
        font-size: 15px;
        font-weight: 600;
    }
    
    .mycard_header .el-input {
        width: 200px;
        height: 28px;
    }
    
    .mycard_header .el-select {
        height: 28px;
    }
    
    .mycard_header input {
        height: 28px;
    }
    
    .mycard_header .this_title {
        /*border-bottom: 1px solid #ddd;*/
        padding: 10px 0;
    }
    
    .query_div span {
        line-height: 30px;
        font-size: 14px;
    }
    
    .query_div input {
        height: 28px !important;
    }
    
    .query_div {
        padding-top: 10px;
    }
    
    .query_div .el-button {
        margin-left: 20px;
    }
    
    .query_div .el-button span {
        line-height: 12px;
    }
</style>