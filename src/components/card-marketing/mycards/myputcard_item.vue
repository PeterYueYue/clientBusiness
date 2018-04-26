<!--我投放的券的列表模板-->
<template>
  <div>
    <div class="pop-busarea-body">
      <div class="pop-end" v-if="message.status == 2 || message.status == 3"></div>
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>券投放时间 :</span>
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
        <div class="pop-busarea-tops" v-show="preview && preview_a">
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
                         点击设置
                    </router-link>
                    <!--<span class="pop-busarea-span"  @click="clickTo">点击设置</span>-->
                  </p>
                </div>
              </span>
          <span>
                <button v-if="message.pullStatus == 2" @click="getSendShopInfo(message.id)" class="dinggou">订购详情</button>
                <button v-if="message.pullStatus == 2" @click="getMarketingData(message.id)">营销统计</button>
              </span>
        </div>
        <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiaquan"></use>
              </svg>券发放数 : <span>{{sendQuantity}}</span></p>
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiangquanhexiao"></use>
              </svg>券核销数 : <span>{{verfyQuantity}}</span></p>
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon01"></use>
              </svg>预计支付佣金 : <span>{{commission}}</span> 元</p>

                 </div>

              </span>
          <span>
                <button @click="preview = !preview">返回</button>
              </span>
        </div>
        <div class="pop-busarea-bottom span_base1" v-show="!preview_a">
               <span>
                 <div class="pop-busarea-ps">
                     <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qiaquan"></use>
                    </svg>订购门店 : <span style="font-size: 16px">{{shopName}}</span></p>
                     <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiangquanhexiao"></use>
                    </svg>门店地址 : <span style="font-size: 16px">{{shopAddress}}</span></p>
                     <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon01"></use>
                    </svg>联系电话 :<span style="font-size: 16px">{{shopMobile}}</span></p>
                    <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiangquanhexiao"></use>
                    </svg>订购时间 : <span style="font-size: 16px">{{pullDate}}</span></p>
                 </div>
              </span>
              <span>
                <button @click="preview_a = !preview_a">返回</button>
              </span>
        </div>
      </div>

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
                preview: true,
                preview_a: true,
                sendQuantity: '',
                verfyQuantity: '',
                commission: '',

                shopName: '',
                shopAddress: '',
                shopMobile: '',
                pullDate:'',
            }
        },
        methods: {
            getSendShopInfo(getid) {
                this.preview_a = !this.preview_a;
                let data = this.qs.stringify({
                    id: getid
                })
                this.$http.post(`${ipAddress}/front/ali_pass_order!getSendShopInfo.action`, data)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else if (res.data.errorCode == "10000") {
                            this.shopName = res.data.content.shopName;
                            this.shopAddress = res.data.content.shopAddress;
                            this.shopMobile = res.data.content.shopMobile;
                            this.pullDate = res.data.content.pullDate;
                        } else {
                            this.$message.error(res.data.message)
                        }

                    })
            },
            getMarketingData(getid) {
                this.preview = !this.preview;
                let data = this.qs.stringify({
                    id: getid
                })
                this.$http.post(`${ipAddress}/front/ali_pass_market!getMarketingData.action`, data)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else if (res.data.errorCode == "10000") {
                            this.sendQuantity = res.data.content.sendQuantity;
                            this.verfyQuantity = res.data.content.verfyQuantity;
                            this.commission = res.data.content.commission;
                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
            }
        }
    }
</script>
<style>
    .dinggou {
        right: 130px !important;
    }
    
    .span_base1 span {
        color: #333 !important;
    }
    
    .span_base1 p {
        padding-top: 6px;
    }
</style>