<!--单品券列表的列表模板-->
<template>
    <div class="pop-busarea-body">
      <div class="pop-busarea-title">
        <div class="pop-busarea-top">
          <p class="pop-p">
            <span>活动创建时间:</span>
            <span>{{message.dataStart}}</span>
          </p>
          <div class="pop-div">
            <div class="pop-avatar">
              <span></span>
            </div>
            <div class="pop-words">
              <span>200.00</span><span> 元&#160;满减券</span>
              <p class="pop-active-p"><span>二维码</span><span>下载</span></p>
            </div>
          </div>
        </div>

      </div>
      <div class="pop-busarea-main">
        <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span>使用说明:</span></p>
                  <p><span>活动名称:</span><span>{{message.one}}</span></p>
                  <p><span>活动有效期:</span><span>{{message.two}}</span></p>
                  <p><span>活动类型:</span><span>{{message.three}}</span></p>
                  <p><span>适用门店:</span><span>{{message.four}}</span></p>
                  <p><span>操作:</span><span class="pop-busarea-spans"><div @click="clickTo">活动设置</div></span></p>
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
                <use xlink:href="#icon-fangkuanbishu"></use>
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
        this.$router.push({path: "/viewdetails"});
      }
    }
  }
</script>
<style>
  .pop-busarea-spans {
    color: #00a0ea;
    display: flex;
  }

  .pop-busarea-spans:hover {
    cursor: pointer;
  }
  .pop-busarea-spans div{
    display: inline-block;
  }
  .pop-active-p span{
    font-size: 14px!important;
    color: #05a4e6!important;
  }
  .pop-active-p>span:nth-child(1){
    margin-left: 10px;
  }
  .pop-active-p>span:nth-child(2){
    margin-left: 6px;
  }
  .pop-active-p span:hover{
    cursor: pointer;
  }
</style>

