<!--代金券列表的列表模板-->
<template>
  <div>
    <div class="pop-busarea-body">
      <div class="pop-end" v-if="message.offline == 1"></div>
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>活动创建时间:</span>
            <span>{{message.create_date}}</span>
          </p>

          <div class="pop-div ">
            <div class="pop-avatar">
              <span></span>
            </div>
            <div class="pop-word pop-m-word">
              <span>{{message.amount}}</span><span> 元&#160;代金券</span>
              <p class="pop-download"><span @click="QRcode(message.url)" v-if="message.url !=''">二维码</span><span @click="dowloadImg(message.url)"
                  v-if="message.url !=''">下载</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-busarea-main">
        <div class="pop-busarea-tops" v-show="preview">
          <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
          <p><span>活动名称 : </span><span> {{message.active_title}}</span></p>
          <p><span>活动有效期 : </span><span> {{message.valid_start_date}} - {{message.valid_end_date}}</span></p>
          <p><span>活动类型 : </span><span> {{message.voucher_type}}</span></p>
          <p><span>适用门店 : </span><span> {{message.count}} 家门店</span></p>
          <p><span>操作 : </span>
            <router-link tag="span" class="pop-busarea-span" :to="{path:'VoucherList_viewdetails',query:{id:message.voucher_id}}">
              点击设置
            </router-link>
          </p>
        </div>
        </span>
        <span>
                <button @click="waterTo(message.activityId)">查看流水</button>
              </span>
      </div>
      <div class="pop-busarea-bottom" v-show="!preview">
        <span>
                 <div class="pop-busarea-ps">
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiaquan"></use>
              </svg>券领取数 : <span>{{sum.receiveNum}}</span></p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jiangquanhexiao"></use>
          </svg>券核销数 : <span>{{sum.afterNum}}</span></p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon01"></use>
          </svg>优惠金额 : <span>{{sum.voucherDiscount}}</span></p>
      </div>

      </span>
      <span>
                <button @click="preview = !preview">返回</button>
              </span>
    </div>
  </div>
  <div class="pop-busarea-mains">

  </div>
  <el-dialog title="二维码" :visible.sync="dialogVisible" size="tiny">
    <div class="pop-img-main">
      <img :src="imgurl" alt="">
    </div>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
  </div>
  </div>
</template>

<script>
import {getActiveWater} from '../business-area/list/api'
  export default {
    props: ["message"],
    data() {
      return {
        dialogVisible: false,
        preview: true,
        imgurl: '',
        sum:''
      }
    },
    methods: {
      QRcode: function (data) {
        if (data) {
        }
        this.dialogVisible = true;
        this.imgurl = data;
      },
      dowloadImg: function (data) {
        window.open(data);
      },
      waterTo: function (data) {
                this.preview = !this.preview;
                let message = this.qs.stringify({
                    agencyId: data
                });
                getActiveWater(message).then(res => {
                    if(res.errorCode == "30005"){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else {
                        this.sum = res.content;
                    }

                })
            }
    }
  }
</script>
<style>
  .pop-m-word {
    display: inline-block;
    /*margin-top: 15px;*/
  }

  .pop-img-main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pop-img-main img {
    display: inline-block;
    width: 400px;
    height: 400px;
  }
</style>