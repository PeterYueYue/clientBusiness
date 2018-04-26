<!--卡位市场item模板-->
<!--我投放的券的列表模板-->
<template>
  <div>
    <div class="pop-busarea-body">
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>券投放日期:</span>
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
          <!--<p style="padding-left: 20px;">代发门店 : 挺之军KTV(娱乐)</p>-->
        </div>
      </div>
      <div class="pop-busarea-main">
        <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 : </span><span> {{message.name}}</span></p>
                  <p><span>活动有效期 : </span><span> {{message.beginDate}} - {{message.endDate}}</span></p>
                  <p><span>佣金金额 : </span><span> {{message.brokerage}} 元/张</span></p>
                  <p><span>活动类型 : </span><span> {{message.type}}</span></p>
                  <p><span>适用门店 : </span><span> {{message.shopNum}} 家门店</span></p>
                  <!--<p><span>隶属商圈 :</span><span>{{message.four}}</span></p>-->
                  <p><span>操作 : </span>
                    <router-link tag="span" class="pop-busarea-span" :to="{path:'couponsActListdetails',query:{id:message.passId}}">
                         查看券详情
                    </router-link>
                    <!--<span class="pop-busarea-span"  @click="clickTo">点击设置</span>-->
                  </p>
                </div>
              </span>
          <span>
                <button @click="preview = !preview;">门店信息</button>
                <button @click="dialogVisible_buy = true">订购</button>
              </span>
        </div>
        <div class="pop-busarea-bottom span_base1" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-qiaquan"></use>
                        </svg>
                        商户名称 : 
                        <span style="font-size: 16px">{{message.merchantName}}</span>
                     </p>
                     <p>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon01"></use>
                        </svg>
                        联系电话 :
                        <span style="font-size: 16px">{{message.merchantMobile}}</span>
                     </p>

                 </div>

              </span>
          <span>
                <button @click="preview = !preview">返回</button>
              </span>
        </div>
        <el-dialog
          title="订购信息"
          v-model="dialogVisible_buy"
          size="tiny"
          class="buy_dia"
          top="20%">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="代发券门店 : ">
                <el-select v-model="form.timelimitselectvalue" class="width180" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in shopselectdata"
                    :key="item.shopId"
                    :label="item.shopName"
                    :value="item.shopId">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付宝账号 : ">
                <el-input v-model="form.code"></el-input>
                <p class="red_tips">提示 : 该账号将用于收取本次订购的代金券佣金</p>
            </el-form-item>
            <el-form-item label="超级密码 : ">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
             <el-button type="primary" @click="queryshops_btn(message.id)">确 定</el-button>
             <el-button @click="dialogVisible_buy = false">取 消</el-button>
          </span>
        </el-dialog>


      </div>

    </div>
  </div>
</template>

<script>
    import {
        ipAddress
    } from '../../service'

    export default {
        props: ["message"],
        data() {
            return {
                shopselectdata: '',
                dialogVisible_buy: false,
                preview: true,
                shopName: '',
                shopAddress: '',
                shopMobile: '',
                form: {
                    timelimitselectvalue: '',
                    code: '',
                    password: ''
                }
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
                    this.shopselectdata = res.data.content.resultList;
                })
        },
        methods: {
            queryshops_btn(getid) {
                if (this.form.timelimitselectvalue == '') {
                    this.$message.warning('请选择代发券门店');
                } else {
                    if (this.form.code == '') {
                        this.$message.warning('请输入支付宝账号');
                    } else {
                        if (this.form.password == '') {
                            this.$message.warning('请输入超级密码');
                        } else {
                            let data = this.qs.stringify({
                                id: getid,
                                shopId: this.form.timelimitselectvalue,
                                aliAccount: this.form.code,
                                password: this.form.password,
                            })
                            this.$http.post(`${ipAddress}/front/ali_pass_order!pullToSend.action`, data)
                                .then(res => {
                                    if (res.data.errorCode == "30005") {
                                        window.location.href = 'http://b.tingzhijun.com/merchant';
                                    } else if (res.data.errorCode == "30002") {
                                        this.$message.error('用户名或密码错误');
                                    } else if (res.data.errorCode == "10000") {
                                        this.$message.success('订购成功');
                                        this.dialogVisible_buy = false;
                                        this.$router.push('/mysendcard')
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                })
                        }
                    }
                }



            },
            getSendShopInfo(getid) {
                this.preview = !this.preview;
                // let data = this.qs.stringify({
                //     id: getid
                // })
                // this.$http.post(`${ipAddress}/front/ali_pass_order!getSendShopInfo.action`, data)
                //     .then(res => {
                //         if (res.data.errorCode == "30005") {
                //             window.location.href = 'http://b.tingzhijun.com/merchant';
                //         } else if (res.data.errorCode == "10000") {
                //             this.shopName = res.data.content.shopName;
                //             this.shopAddress = res.data.content.shopAddress;
                //             this.shopMobile = res.data.content.shopMobile;
                //         } else {
                //             this.$message(res.data.message)
                //         }

                //     })
            }
        }
    }
</script>
<style>
    .buy_dia input {
        width: 180px;
        height: 28px;
    }
    
    .buy_dia .el-form-item {
        margin-bottom: 2px;
    }
    
    .width180 {
        width: 180px !important;
    }
    
    .width180 .el-input {
        width: 180px !important;
    }
</style>