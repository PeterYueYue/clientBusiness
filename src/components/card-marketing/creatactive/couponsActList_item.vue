<!--单品券列表的列表模板-->
<template>
  <div>
    <div class="pop-busarea-body">
      <!--<div class="pop-end" v-if="message.offlineState == 1"></div>-->
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>创建时间:</span>
            <span>{{message.createDate}}</span>
          </p>

          <div class="pop-div">
            <div class="pop-avatar">
              <span></span>
            </div>
            <div class="pop-word pop-m-word">
              <span>{{message.money}}</span><span> 元&#160;满减券</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-busarea-main">
        <div class="pop-busarea-tops">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 : </span><span> {{message.name}}</span></p>
                  <p><span>活动有效期 : </span><span> {{message.beginDate}} - {{message.endDate}}</span></p>
                  <p><span>活动类型 : </span><span> {{message.type}}</span></p>
                  <p><span>适用门店 : </span><span> {{message.num}} 家门店</span></p>
                  <p><span>操作 : </span>
                    <router-link tag="span" class="pop-busarea-span"
                                 :to="{path:'couponsActListdetails',query:{id:message.id}}">
                         查看详情
                    </router-link>
                  </p>
                </div>
              </span>
          <span>
                <button @click="toufang_btn(message.id,message.quantity)">投 放</button>
              </span>
        </div>
      </div>
      <el-dialog
        title="投放设置"
        v-model="dialogVisible_toufang"
        size="small"
        top="20%">
        <div class="toufang_dialog_main">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="卡位佣金 : ">
              <el-input v-model="form.number" @change="inputChange"></el-input>
              <p class="red_tips">提示 : 投放该券的商户每发出一张券可获得的佣金</p>
            </el-form-item>
            <el-form-item label="佣金预计总金额 : ">
              <span class="yongjing">{{form.money}} <span class="yuan_text">元</span></span>
              <p class="red_tips">提示 : 拥金预计金额为发券数量 * 卡位佣金</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="paySure">确认投放并支付</el-button>
            </el-form-item>
          </el-form>
          <div class="pay_main">
            <p>扫描二维码,支付佣金保证金</p>
            <div class="zj-img">
              <img v-if="imgUrl" :src="imgUrl" alt="">
            </div>
          </div>

        </div>
        <div class="toufang_dialog_shuoming">
          <span>佣金说明</span>
          <p>预付佣金将冻结在商券通支付宝账号 , 待活动结束后 , 商券通平台统一结算 , 如有结余直接退款至支付佣金的支付宝账号</p>
          <p>如有疑问请联系商券通客服中心 , 联系电话 : 15996602085</p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {
        ipAddress
    } from '../../../service'

    export default {
        props: ["message"],
        data() {
            return {
                marketId: '',
                paymentSn: '',
                Time: 1,
                quantityNumber: '',
                imgUrl: '',
                idNumber: '',
                dialogVisible_toufang: false,
                form: {
                    number: '',
                    money: '0'
                }
            }
        },
        methods: {
            toufang_btn(id, quantity) {
                this.dialogVisible_toufang = true;
                this.idNumber = id;
                this.quantityNumber = quantity;
            },
            inputChange: function() {
                this.form.money = (this.form.number * this.quantityNumber).toFixed(2);
            },
            paySure: function() {
                let data = this.qs.stringify({
                    id: this.idNumber,
                    commission: this.form.number
                });

                this.$http.post(`${ipAddress}/front/ali_pass_market!pushToMarket.action`, data)
                    .then(res => {
                        this.paymentSn = res.data.content.paymentSn;
                        if (res.data.errorCode == 10000) {
                            this.imgUrl = res.data.content.qrImg;
                            var time = setInterval(() => {
                                let data = this.qs.stringify({
                                    paymentSn: this.paymentSn
                                });
                                this.$http.post(`${ipAddress}/front/ali_pass_market!queryCommissionPayStatus.action`, data)
                                    .then(res => {
                                        this.marketId = res.data.content.marketId;
                                        if (res.data.errorCode == 50004 || res.data.errorCode == 50001) {
                                            this.queryState(this.marketId);
                                        } else if (res.data.errorCode == 10000) {
                                            this.Time = 2;
                                            if (this.Time == 2) {
                                                clearInterval(time);
                                                this.$message(res.data.message);
                                            }
                                            this.$router.push('/myputcard');
                                        }
                                    })
                            }, 2000);
                        } else if (res.data.errorCode == 30005) {
                          window.clearInterval();
                          window.location.href = 'http://b.tingzhijun.com/merchant';
                        }else if(res.data.errorCode == 70009){
                          this.$message.error(res.data.message);
                          window.clearInterval();
                        }
                    })
            },
            queryState: function(message) {
                let data = this.qs.stringify({
                    id: message
                });
                this.$http.post(`${ipAddress}/front/ali_pass_market!refreshPayQr.action`, data)
                    .then(res => {
                        this.paymentSn = res.data.content.paymentSn;
                        this.imgUrl = res.data.content.qrImg;
                    })

            }

        }
    }
</script>
<style>
    .toufang_dialog_main .el-form {
        width: 400px;
        float: left;
    }

    .zj-img {
        /*outline:1px solid red;*/
        height: 220px;
    }

    .red_tips {
        color: red;
        font-size: 12px;
    }

    .yongjing {
        color: #00a0e9;
        font-size: 36px;
        font-weight: 600;
        line-height: 28px;
    }

    .yongjing .yuan_text {
        font-size: 20px;
        vertical-align: middle;
    }

    .pay_main {
        display: inline-block;
        width: 350px;
        text-align: center;
    }

    .pay_main p {
        font-size: 12px;
    }

    .pay_main img {
        width: 180px;
        margin-top: 26px;
    }

    .toufang_dialog_shuoming {
        border-top: 2px solid #ddd;
        margin-top: 20px;
        padding: 10px 0;
    }

    .toufang_dialog_shuoming span {
        font-size: 14px;
        font-weight: 600;
    }

    .toufang_dialog_shuoming p {
        font-size: 12px;
        padding-top: 8px;
    }
</style>
