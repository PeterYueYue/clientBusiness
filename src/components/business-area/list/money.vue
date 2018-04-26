<!--积分抵现的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.boolean == false"></div>
            <div class="pop-busarea-title">
                <div class="pop-busarea-top">
                    <p class="pop-p">
                        <span>活动创建时间:</span>
                        <span>{{message.createDate}}</span>
                    </p>
                    <div class="pop-div">
                        <div class="pop-avatar pop-avatars">
                            <span></span>
                        </div>
                        <div class="pop-word pop-m-word">
                            <span>{{message.cost}}</span><span>积分抵</span><span
                                class="pop-first-span">{{message.gain}}</span><span class="pop-two-span">元</span>
                            <!--<p class="pop-download"><span>二维码</span><span>下载</span></p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-busarea-main">
                <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 : </span><span>{{message.pointName}}</span></p>
                  <p><span>活动有效期 : </span><span>{{message.startDate}}至{{message.endDate}}</span></p>
                  <p><span>积分池上限 : </span><span>{{message.totalPoint}}</span></p>
                  <p><span>适用门店 : </span><span>{{message.shopNum}}家门店</span></p>
                  <p><span>活动隶属商圈 : </span><span>{{message.circleName}}</span></p>
                  <p><span>操作 : </span>
                      <router-link tag="span" class="pop-blue"
                                   :to="{path:'activefiguredetails',query:{id:message.shopPiontId}}">
                          查看详情
                      </router-link>
                  </p>
                </div>
              </span>
                    <span>
                <button @click="clickTo(message.shopPiontId)">查看流水</button>
              </span>
                </div>
                <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p>
                         <svg class="icon" aria-hidden="true">
                             <use xlink:href="#icon-yichengjiao"></use>
                         </svg>
                         成交笔数 : <span> {{datas.counts}} 笔</span>
                     </p>
                     <p>
                          <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-jifen"></use>
                          </svg>
                         积分消耗总计 : <span>{{datas.total}} 积分</span>
                     </p>
                     <p>
                         <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-jine1"></use>
                         </svg>
                         抵扣金额总计 : <span> {{datas.totalDiscount}} 元</span>
                     </p>
                 </div>
              </span>
                    <span>
                <button @click="preview = !preview">返回</button>
              </span>
                </div>
            </div>
            <div class="pop-busarea-mains">
            </div>
        </div>
    </div>

</template>
<script>
    import {
        getActiveWater
    } from './api'
    import {
        ipAddress
    } from '../../../service'

    export default {
        props: ["message"],
        data() {
            return {
                sum: '',
                preview: true,
                datas: ''
            }
        },
        methods: {
            clickTo: function(data) {
                this.preview = !this.preview;
                let message = this.qs.stringify({
                    shopPiontId: data
                });
                this.$http.post(`${ipAddress}/front/circle_point!waterlist.action`, message)
                    .then(res => {
                        if (res.data.errorCode == "30005") {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        }
                        this.datas = res.data.content;
                    })
            }
        }
    }
</script>
<style>
    .pop-first-span {
        font-size: 30px;
        color: #f4333c;
    }
    
    .pop-two-span {
        font-size: 16px;
        color: #f4333c;
    }
    
    .pop-t {
        margin-left: 20px;
        margin-top: -8px;
    }
    
    .pop-avatars>span {
        background: url("../../../../src/assets/images/integral.png") 50% 50% no-repeat;
        background-size: contain;
    }
    
    .pop-m-word {
        display: inline-block;
        /*margin-top: 10px;*/
    }
    
    .pop-download span {
        font-size: 12px !important;
        color: #05a4e6 !important;
    }
    
    .pop-download span:nth-child(1) {
        margin-left: 30px;
    }
    
    .pop-download span:nth-child(2) {
        margin-left: 20px;
    }
    
    .pop-download span:hover,
    .pop-blue:hover {
        cursor: pointer;
    }
    
    .pop-blue {
        color: #05a4e6;
    }
</style>