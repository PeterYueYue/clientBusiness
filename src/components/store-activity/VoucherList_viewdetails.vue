<!--代金券券列表/点击查看代金券详细信息-->
<template>
  <div class="main">
    <div class="ticket_show">
      <div>
        <img src="../../assets/images/ticket.png" alt="">
        <span>{{form.amount}}元</span>
        <p>活动时间:{{form.pickStartDate}}至{{form.pickEndDate}}</p>
      </div>
    </div>
    <div class="ticket_rule">
      <span class="ticket_title_all">活动内容</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="标题 :">
          <span>{{form.activeTitle}}</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="券面额 :">
          <span>{{form.amount}}元</span>
        </el-form-item>
        <el-form-item class="code_shop" label="适用门店 :">
          <span>已选 {{form.shopAmount}} 家门店&#X3000;</span>
          <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
          <el-dialog title="适用门店列表" v-model="dialogVisible_shopslist" size="tiny" top="20%">
            <p v-for="item in shops">{{item.name}}</p>
            <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                  </span>
          </el-dialog>
        </el-form-item>
        <el-form-item class="ticket_number" label="数量 :">
          <span v-if="form.quantity==9999">不限制</span>
          <span v-if="form.quantity!=9999">{{form.quantity}}</span>
        </el-form-item>
        <el-form-item label="活动时间 :">
          <span>{{form.pickStartDate}} 至 {{form.pickEndDate}}</span>
        </el-form-item>
        <el-form-item label="使用条件 :">
          <span v-if="form.bindingPoint == 9999">不限制</span>
          <span v-if="form.bindingPoint != 9999">消费满 {{form.send_rule_min_cost}} 元可用</span>
        </el-form-item>
        <el-form-item class="ticket_number" label="券有效期 :">
          <span>领取后 {{form.validToDay}} 日内有效</span>
        </el-form-item>

      </el-form>
      <span class="ticket_title_all">规则设置</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="领取限制 :">
          <span v-if="form.pickLimitNum == 9999">不限制</span>
          <span v-if="form.pickLimitNum != 9999">{{form.pickLimitNum}}</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="每日领取限制 :">
          <span v-if="form.pickLimitTotal == 9999">不限制</span>
          <span v-if="form.pickLimitTotal != 9999">{{form.pickLimitTotal}}</span>
        </el-form-item>
        <el-form-item label="是否需要积分兑换 :">
          <span v-if="form.bindingPoint != 0">是</span>
          <span v-if="form.bindingPoint == 0">否</span>
        </el-form-item>
        <el-form-item v-if="form.bindingPoint != 0" label="兑换所需积分 :">
          <span>{{form.bindingPoint}} 积分</span>
        </el-form-item>
        <el-form-item v-if="form.bindingPoint == 0" class="setways" label="投放渠道 :">

          <div v-for="item in waysdata">
            <span class="margin_r_10">{{item}}</span>
            <a :href="form.url" v-if="item == '二维码投放'" target="_blank">点击打开二维码</a>
            <span v-if="item == '短连接投放'">{{form.shortLinkurl}}</span>
          </div>
          <!--<span  class="margin_r_10">{{wayskinds}}</span>-->
          <!--<a :href="form.url" v-if="wayskinds == '二维码投放'" target="_blank">点击打开二维码</a>-->
          <!--<span  v-if="wayskinds == '短连接投放'">{{form.shortLinkurl}}</span>-->
        </el-form-item>
        <el-form-item  label="领券时间 :">
            <span v-if="form.exchange_time == ''">不限制</span>
            <span v-if="form.exchange_time != ''">每 {{form.exchange_week}} {{form.exchange_time}} 可领取</span>
            
        </el-form-item>
        <el-form-item  label="核销时间 :">
            <span v-if="form.use_week == ''">不限制</span>
            <span v-if="form.use_week != ''">每 {{form.use_week}} {{form.use_time}} 可核销</span>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
          <el-button class="bottom_button" @click="dialogVisible_xiajiasure = true" size="small" type="primary" v-if="form.offlineState == 0">
            下 架
          </el-button>
        </el-form-item>
        <el-dialog title="提示" v-model="dialogVisible_xiajiasure" size="tiny" top="35%">
          <p style="text-align: center;">下架后活动将立即结束,已发出的券在有效期内依然可以使用,是否继续?</p>
                  <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="soldOut">确 定</el-button>
                      <el-button @click="dialogVisible_xiajiasure = false">取 消</el-button>
                  </span>
</el-dialog>
</el-form>
</div>
</div>
</template>

<script>
    import {
        ipAddress
    } from '../../service'
    import {
        queryLogin
    } from '../../api/CommonMethods'
    export default {
        data() {
            return {
                waysdata: [],
                wayskinds: '',
                isFlag: 0,
                dialogVisible_xiajiasure: false,
                camp_id: '',
                tableData: [],
                shops: [],
                dialogVisible_xiajia: false,
                dialogVisible_goodslist: false,
                dialogVisible_shopslist: false,
                form: {}
            }
        },
        mounted: function() {
            queryLogin();
            let data = this.qs.stringify({
                id: this.camp_id
            });
            this.$http.post(`${ipAddress}/front/inner_voucher!getDetailById.action`, data)
                .then(res => {
                    this.form = res.data.content;
                    this.tableData = res.data.content.goods;
                    this.shops = res.data.content.stores;
                    this.wayskinds = res.data.content.publishChannels;
                    this.waysdata = res.data.content.publishChannels.split(",");
                })
        },
        created: function() {
            let id = this.$route.query.id;
            this.camp_id = id;
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        },
        methods: {
            //将字符串的  ,  改为 -    将^改为  ,
            strreplace() {
                var a = '16:00:00,20:00:00^21:00:00,22:00:00^21:00:00,22:00:00^21:00:00,22:00:00';
                var b = a.replace(/\,/g, '-');
                var c = b.replace(/\^/g, '、');
            },
            back() {
                window.history.back();
            },
            soldOut: function() {
                queryLogin();
                this.dialogVisible_xiajiasure = false;
                let data = this.qs.stringify({
                    camp_id: this.form.activeId
                });
                this.$http.post(`${ipAddress}/front/inner_voucher!offline.action`, data)
                    .then(res => {
                        if (res.data.status == "success") {
                            this.$message("下架成功!");
                            this.$router.push('/voucherList');
                        } else if (res.data.status == "error") {
                            this.$message("下架失败!")
                        }
                    })
            }
        }
    }
</script>

<style>
    .dialog_goodslist .el-table__body-wrapper {
        height: 280px;
    }
</style>