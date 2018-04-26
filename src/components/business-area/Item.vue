<!--商圈代金券的列表模板-->
<template>
  <div>
    <div class="pop-busarea-body">
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>活动创建时间:</span>
            <span>{{message.dataStart}}</span>
          </p>
          <!--<p class="pop-t">-->
            <!--<span>活动隶属于商券:</span>-->
            <!--<span>{{message.space}}</span>-->
          <!--</p>-->
          <div class="pop-div">
            <div class="pop-avatar">
              <span></span>
            </div>
            <div class="pop-word">
              <span>200.00</span><span> 元&#160;代金券</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pop-busarea-main">
        <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称:</span><span>{{message.one}}</span></p>
                  <p><span>活动有效期:</span><span>{{message.two}}</span></p>
                  <p><span>活动类型:</span><span>{{message.three}}</span></p>
                  <!--<p><span>积分日消耗上限:</span><span>{{message.four}}</span></p>-->
                  <p><span>适用门店:</span><span>{{message.four}}</span></p>
                  <p><span>活动隶属商圈:</span><span>{{message.four}}</span></p>
                  <!--<p><span>活动详细说明:</span><span>{{message.five}}</span></p>-->
                   <p><span>操作:</span><span class="pop-blue" @click="clickTo">查看详情</span></p>
                </div>
              </span>
          <span>
                <button @click="preview = !preview">查看流水</button>
              </span>
        </div>
        <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p><svg class="icon" aria-hidden="true"> 
              </svg>成交金额: <span>200.00</span></p>
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chengjiaojineshujufenxi"></use>
              </svg>成交笔数: <span>10.00</span></p>
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jine"></use>
              </svg>优惠金额:<span>100.00</span></p>
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
  export default {
    props: ["message"],
    data(){
      return {
        preview: true,
      }
    },
    methods: {
      clickTo: function () {
        this.$router.push({path: "/busareaactivedetails"});
      }
    }
  }
</script>

