<!--创建券活动/券活动列表-->
<template>
  <div class="">
    <div class="pop-busarea-section" v-for="message in messages">
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
    import List_item from "./couponsActList_item.vue";

    export default {
        data() {
            return {
                messages: '',
                noData: ''
            }
        },
        mounted: function() {
            this.queryList();
        },
        methods: {
            //列表查询
            queryList() {
                let data = this.qs.stringify({
                    pageNumber: 1,
                    pageSize: 10000
                });
                this.$http.post(`${ipAddress}/front/ali_pass!getAliPassPager.action`, data)
                    .then(res => {
                        if (res.data.errorCode == 10000) {
                            this.messages = res.data.content.resultList;
                            this.noData = res.data.content.totalCount;
                        } else if (res.data.errorCode == 30005) {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        }
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