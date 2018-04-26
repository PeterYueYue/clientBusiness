<!--数据看板-->
<template>
    <div class="main pop-main">
        <div class="home">
            <span class=" line_height_30 font14">门店选择 :&nbsp;</span>
            <el-select v-model="shopId" class="select_input_width_200" @change="selectdatachange" placeholder="请选择" size="small">
                <el-option
                    v-for="item in selectdata"
                    :key="item.shopId"
                    :label="item.shopName"
                    :value="item.shopId">
                </el-option>
            </el-select>
            <!--第二行-->
            <div class="pop-head">
                <div class="pop-section">
                    <div class="pop-first pop-business">
                        <img src="../../../src/assets/images/1.png" alt="">
                    </div>
                    <div class="pop-section-body">
                        <p>今日营收</p>
                        <p>{{todayformdata.money}}</p>
                        <div class="pop-number">
                            <p class="zuoriys">昨日营收 : {{yestodayformdata.money}}</p>
                        </div>
                    </div>
                </div>
                <div class="pop-section">
                    <div class="pop-first pop-clinch">
                        <img src="../../../src/assets/images/2.png" alt="">
                    </div>
                    <div class="pop-section-body">
                        <p>今日成交笔数</p>
                        <p>{{todayformdata.amount}}</p>
                        <div class="pop-number">
                            <p class="zuoriys">昨日成交笔数 : {{yestodayformdata.amount}}</p>
                        </div>
                    </div>
                </div>
                <div class="pop-section">
                    <div class="pop-first pop-price">
                        <img src="../../../src/assets/images/3.png" alt="">
                    </div>
                    <div class="pop-section-body">
                        <p>今日成交笔单价</p>
                        <p>{{todayformdata.average_price}}</p>
                        <div class="pop-number">
                            <p class="zuoriys">昨日成交笔单价 : {{yestodayformdata.average_price}}</p>
                        </div>
                    </div>
                </div>
                <div class="pop-section">
                    <div class="pop-first pop-deal">
                        <img src="../../../src/assets/images/4.png" alt="">
                    </div>
                    <div class="pop-section-body">
                        <p>今日活动成交笔数占比</p>
                        <p>{{todayformdata.activity_num}}</p>
                        <div class="pop-number">
                            <p class="zuoriys">昨日活动成交笔数占比 : {{yestodayformdata.activity_num}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--第一排图表-->
            <div class="pop-chart-first">
                <div class="pop-chart-number">
                    <p>营业数据分析</p>
                    <div class="pop-chart-tab" style="font-size: 0;">
                        <span :class="{active: isActive == 1}" @click="changeBorder">成交金额</span>
                        <span :class="{active: isActive == 2}" @click="changeBorders">成交笔数</span>
                    </div>
                    <div class="day-week-month">
                        <span :class="{active_yinye: ischangedwm == 1}" @click="changeDay">今日</span>
                        <span :class="{active_yinye: ischangedwm == 2}" @click="changeWeek">本周</span>
                        <span :class="{active_yinye: ischangedwm == 3}" @click="changeMonth">本月</span>
                    </div>
                    <div v-loading.body="loading" element-loading-text="加载中" id="chartss">
                        <div  id="mains" :style="{width:'100%',height:'294px'}"></div>
                    </div>
                </div>
                <div class="pop-chart-overview">
                    <p>收银渠道概览</p>
                    <div class="pop-charts-top">
                        <div class="pop-top-head">
                            <span :class="{active: isChange == 1}" @click="changeZ">支付宝</span>
                            <span :class="{active: isChange == 2}" @click="changeY">微信</span>
                            <span :class="{active: isChange == 3}" @click="changeW">现金</span>
                            <span :class="{active: isChange == 4}" @click="changeX">银联</span>
                        </div>
                        <p><span>当日金额流水:</span> <span>{{showmoney}}</span></p>
                    </div>
                    <div class="pop-top-charts">
                        <table border="1">
                            <thead>
                                <tr>
                                    <th class="table_l">收银渠道</th>
                                    <th class="table_r">占比</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="meonsy in money">
                                    <td>{{meonsy.name}}</td>
                                    <td>
                                        <span>
                                            <el-progress :percentage="Number(meonsy.length)"></el-progress>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--第二张-->
            <div class="pop-chart-first">
                <div class="pop-chart-number" style="position: relative;">
                    <p>[引流券]领取/核销数据</p>
                    <!--<div class="pop-chart-tab">
                        <div class="block pop-block">
                        <el-date-picker
                            :editable="editable"
                            v-model="value7"
                            type="daterange"
                            align="right"
                            size="small"
                            placeholder="选择日期范围">
                        </el-date-picker>
                        </div>
                    </div>-->
                    <span  style="color:#666;font-weight: 600;font-size: 18px;letter-spacing: 2px;position: absolute;top: 48%;left:45%;">敬请期待...</span>
                    <div class="moban" id="chartsn">
                        <div id="mainn" :style="{width:'100%',height:'320px'}"></div>
                    </div>
                </div>
                <div class="pop-chart-overview">
                    <p>会员动态</p>
                    <div class="memberdata">
                        <div class="dataitem">
                            <div>会员总数(人)</div>
                            <span>{{memberdata.memberCount}}</span>
                        </div>
                        <div class="dataitem">
                            <div>本周活跃会员数(人)</div>
                                <span>{{memberdata.memberLivenNum}}</span>
                                <span class="float_l-a">上周活跃会员数 : {{memberdata.memberLivenNumLast}}</span>
                            </div>
                            <div class="dataitem">
                                <div>本周新增会员数(人)</div>
                                    <span>{{memberdata.memberAddNum}}</span>
                                    <span  class="float_l-a">上周活跃会员数 : {{memberdata.memberAddNumLast}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './home.css'
    import {ipAddress} from '../../service.js'
    var echarts = require('echarts');
    export default {
        name: "home",
        computed: {
            breadcrumbList: function() {
                return this.$store.state.breadcrumbList;
            }
        },
        created: function() {
            var curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        },
        data() {
            return {
                loading:false,
                showmoney:'',
                todayformdata:{
                    activity_num:'0',
                    amount:'0',
                    average_price:'0',
                    money:'0',
                    ali_money:'0',
                    wei_money:'0',
                    case_money:'0',
                    union_money:'0',
                    ali_percent:'0',
                    wei_percent:'0',
                    case_percent:'0',
                    union_percent:'0',
                },
                yestodayformdata:{
                    activity_num:'0',
                    amount:'0',
                    average_price:'0',
                    money:'0',
                },
                clickitem:1,
                yingyeshujuoption:{
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0:00','0:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00','7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30']
                    },
                    yAxis: {
                        type: 'value',
                        show:true,
                        name:'金额/元',
                        axisLabel: {
                            formatter: '{value} '
                        }
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        }
                    ],
                    series: [{
                            name: '成交金额',
                            type: 'line',
                            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        },
                    ]
                },
                shopId:'',
                editable: false,
                selectdata: [],
                isChange: 1,
                isActive: 1,
                ischangedwm: 1,
                value7: '',
                memberdata:{
                    memberCount:'0',
                    memberAddNum:'0',
                    memberLivenNum:'0',
                    memberAddNumLast:'0',
                    memberLivenNumLast:'0',
                },
                //支付途径
                money: [{
                    id: 1,
                    name: '支付宝',
                    value: '0',
                    length: 0
                }, {
                    id: 2,
                    name: '微信',
                    value: '0',
                    length: 0
                }, {
                    id: 3,
                    name: '现金',
                    value: '0',
                    length: 0
                }, {
                    id: 4,
                    name: '银联',
                    value: '0',
                    length: 0
                }],
                createdataformonthvalue:[],
                createdataformonthvalue_detail:[],
            };
        },
        mounted() {
            this.getmemberdata();
            this.getbusinessdata();
            this.yingliuquan();
            this.createdataformonth();
            this.gettodaydata();
            this.getyestodaydata();
            this.getShop();
            // window.onresize = function(){
            //     myChartn.resize(); 
            //     myCharts.resize();
            // };
        },
        methods: {
            //查询今天即时累积数据
            gettodaydata(){
                let data=this.qs.stringify({
                    shopId:this.shopId,
                });
                this.$http.post(`${ipAddress}/front/data_kanban!showToday.action`,data)
                .then(res=>{
                    if(res.data.content.resultList.length != 0){
                        this.todayformdata = res.data.content.resultList[0];
                        this.showmoney = Number(this.todayformdata.ali_money).toFixed(2);
                        this.todayformdata.money = Number(res.data.content.resultList[0].money).toFixed(2);
                        this.todayformdata.average_price = Number(res.data.content.resultList[0].average_price).toFixed(2);
                        this.money[0].value = this.todayformdata.ali_percent;
                        this.money[0].length = this.todayformdata.ali_percent;
                        this.money[1].value = this.todayformdata.wei_percent;
                        this.money[1].length = this.todayformdata.wei_percent;
                        this.money[2].value = this.todayformdata.case_percent;
                        this.money[2].length = this.todayformdata.case_percent;
                        this.money[3].value = this.todayformdata.union_percent;
                        this.money[3].length = this.todayformdata.union_percent;
                    }
                    
                })
            },
            //查询昨天即时累积数据
            getyestodaydata(){
                let data=this.qs.stringify({
                    shopId:this.shopId,
                });
                this.$http.post(`${ipAddress}/front/data_kanban!showYesterday.action`,data)
                .then(res=>{
                    if(res.data.content.resultList.length != 0){
                        this.yestodayformdata = res.data.content.resultList[0];
                        if(res.data.content.resultList[0].money){
                            this.yestodayformdata.money = Number(res.data.content.resultList[0].money).toFixed(2);
                        }
                        if(res.data.content.resultList[0].average_price){
                            this.yestodayformdata.average_price = Number(res.data.content.resultList[0].average_price).toFixed(2);
                        }
                    }
                   })
            },
            //本月的数据1-31号数据生成
            createdataformonth(){
                var newdata = new Date();
                var a = new Date(newdata.getFullYear(), (newdata.getMonth()+1), 0).getDate();
                var b = newdata.getMonth()+1;
                for(let i = 0;i<a;i++){
                    let d = b +'-'+(i+1);
                    this.createdataformonthvalue.push(d);
                    this.createdataformonthvalue_detail.push(0);
                }
            },
            //获取会员动态数据
            getmemberdata(){
                 this.$http.post(`${ipAddress}/front/member_add!getMember.action`)
                .then(res=>{
                    this.memberdata = res.data.content;
                })
            },
            //获取营业数据分析 数据
            //默认今日数据
            getbusinessdata(){
                // this.loading = true;
                let data=this.qs.stringify({
                    shopId:this.shopId,
                });
                //当天
                this.$http.post(`${ipAddress}/front/data_kanban!showHalfHourRevenue.action`,data)
                .then(res =>{
                    this.daydata_yuan= res.data.content;
                    if(this.isActive == 1){
                        for(let i = 0;i<res.data.content.resultList.length;i++){
                            var a = res.data.content.resultList[i].revenue_time;
                            this.yingyeshujuoption.series[0].data[a] = res.data.content.resultList[i].money;
                        }
                    }
                    if(this.isActive == 2){
                        for(let i = 0;i<this.daydata_yuan.resultList.length;i++){
                            let a = res.data.content.resultList[i].revenue_time;
                            this.yingyeshujuoption.series[0].data[a] = res.data.content.resultList[i].amount;
                        }
                    }
                    this.setyingyeshuju();
                })
            },
            //营业数据分析数据初始化
            setyingyeshuju(){
                //营业数据分析
                var myCharts = echarts.init(document.getElementById('mains'));
                myCharts.setOption(this.yingyeshujuoption);
            },

            yingliuquan(){
                //[引流券]领取/核销数据
                var myChartn = echarts.init(document.getElementById('mainn'));
                myChartn.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['领取数', '核销数']
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: '领取数',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, ],
                        markPoint: {
                            data: [{
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }]
                        }
                    }, {
                        name: '核销数',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
                        markPoint: {
                            data: [{
                                name: '年最高',
                                value: 182.2,
                                xAxis: 7,
                                yAxis: 183
                            }, {
                                name: '年最低',
                                value: 2.3,
                                xAxis: 11,
                                yAxis: 3
                            }]
                        }
                    }]
                });
            },
            //营业数据分析>成交金额
            changeBorder: function() {
                this.isActive = 1;
                this.yingyeshujuoption.series[0].name = '成交金额';
                this.yingyeshujuoption.yAxis.name = '金额/元';
                if(this.ischangedwm == 1){
                    for(let i = 0;i<this.daydata_yuan.resultList.length;i++){
                        let a = this.daydata_yuan.resultList[i].revenue_time;
                        this.yingyeshujuoption.series[0].data[a] = this.daydata_yuan.resultList[i].money;
                    }
                }
                if(this.ischangedwm == 2){
                    for(let i = 0;i<this.weekdata_yuan.resultList.length;i++){
                        let a = this.weekdata_yuan.resultList[i].revenue_date;
                        switch (a) {
                            case 1 :this.yingyeshujuoption.series[0].data[0] = this.weekdata_yuan.resultList[i].money; break; 
                            case 2 :this.yingyeshujuoption.series[0].data[1] = this.weekdata_yuan.resultList[i].money; break; 
                            case 3 :this.yingyeshujuoption.series[0].data[2] = this.weekdata_yuan.resultList[i].money; break; 
                            case 4 :this.yingyeshujuoption.series[0].data[3] = this.weekdata_yuan.resultList[i].money; break; 
                            case 5 :this.yingyeshujuoption.series[0].data[4] = this.weekdata_yuan.resultList[i].money; break; 
                            case 6 :this.yingyeshujuoption.series[0].data[5] = this.weekdata_yuan.resultList[i].money; break; 
                            case 0 :this.yingyeshujuoption.series[0].data[6] = this.weekdata_yuan.resultList[i].money; break; 
                        }
                    }
                }
                if(this.ischangedwm == 3){
                    for(let i=0;i<this.monthdata_yuan.resultList.length;i++){
                        let a = this.monthdata_yuan.resultList[i].revenue_date;
                        let b = Number(a);
                        this.yingyeshujuoption.series[0].data[b-1] = this.monthdata_yuan.resultList[i].money;
                    }
                }
                this.setyingyeshuju();
            },
            //营业数据分析>成交笔数
            changeBorders: function() {
                this.isActive = 2;
                this.yingyeshujuoption.series[0].name = '成交笔数';
                this.yingyeshujuoption.yAxis.name = '笔数/笔';
                if(this.ischangedwm == 1){
                    for(let i = 0;i<this.daydata_yuan.resultList.length;i++){
                        let a = this.daydata_yuan.resultList[i].revenue_time;
                        this.yingyeshujuoption.series[0].data[a] = this.daydata_yuan.resultList[i].amount;
                    }
                }
                if(this.ischangedwm == 2){
                    for(let i = 0;i<this.weekdata_yuan.resultList.length;i++){
                        let a = this.weekdata_yuan.resultList[i].revenue_date;
                        switch (a) {
                            case 1 :this.yingyeshujuoption.series[0].data[0] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 2 :this.yingyeshujuoption.series[0].data[1] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 3 :this.yingyeshujuoption.series[0].data[2] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 4 :this.yingyeshujuoption.series[0].data[3] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 5 :this.yingyeshujuoption.series[0].data[4] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 6 :this.yingyeshujuoption.series[0].data[5] = this.weekdata_yuan.resultList[i].amount; break; 
                            case 0 :this.yingyeshujuoption.series[0].data[6] = this.weekdata_yuan.resultList[i].amount; break; 
                        }
                    }
                }
                if(this.ischangedwm == 3){
                    for(let i=0;i<this.monthdata_yuan.resultList.length;i++){
                        let a = this.monthdata_yuan.resultList[i].revenue_date;
                        let b = Number(a);
                        this.yingyeshujuoption.series[0].data[b-1] = this.monthdata_yuan.resultList[i].amount;
                    }
                }
                this.setyingyeshuju();
            },
            //今日
            changeDay:function(){
                this.ischangedwm = 1;
                this.yingyeshujuoption.xAxis.data = ['0:00','0:30','1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30','5:00','5:30','6:00','6:30','7:00','7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30','23:00','23:30'];
                this.yingyeshujuoption.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                this.getbusinessdata();
            },
            //本周
            changeWeek:function(){
                this.ischangedwm = 2;
                // this.loading = true;
                this.yingyeshujuoption.xAxis.data=['周一','周二','周三','周四','周五','周六','周日'];
                this.yingyeshujuoption.series[0].data=[0,0,0,0,0,0,0];
                let data=this.qs.stringify({
                    shopId:this.shopId,
                });
                //本周
                this.$http.post(`${ipAddress}/front/data_kanban!showWeekRevenue.action`,data)
                .then(res =>{
                    this.weekdata_yuan = res.data.content;
                    if(this.isActive == 1){
                        for(let i = 0;i<res.data.content.resultList.length;i++){
                            var a = res.data.content.resultList[i].revenue_date;
                            switch (a) {
                                case 1 :this.yingyeshujuoption.series[0].data[0] = res.data.content.resultList[i].money; break; 
                                case 2 :this.yingyeshujuoption.series[0].data[1] = res.data.content.resultList[i].money; break; 
                                case 3 :this.yingyeshujuoption.series[0].data[2] = res.data.content.resultList[i].money; break; 
                                case 4 :this.yingyeshujuoption.series[0].data[3] = res.data.content.resultList[i].money; break; 
                                case 5 :this.yingyeshujuoption.series[0].data[4] = res.data.content.resultList[i].money; break; 
                                case 6 :this.yingyeshujuoption.series[0].data[5] = res.data.content.resultList[i].money; break; 
                                case 0 :this.yingyeshujuoption.series[0].data[6] = res.data.content.resultList[i].money; break; 
                            }
                        }
                    }
                    if(this.isActive == 2){
                        for(let i = 0;i<res.data.content.resultList.length;i++){
                            var a = res.data.content.resultList[i].revenue_date;
                            switch (a) {
                                case 1 :this.yingyeshujuoption.series[0].data[0] = res.data.content.resultList[i].amount; break; 
                                case 2 :this.yingyeshujuoption.series[0].data[1] = res.data.content.resultList[i].amount; break; 
                                case 3 :this.yingyeshujuoption.series[0].data[2] = res.data.content.resultList[i].amount; break; 
                                case 4 :this.yingyeshujuoption.series[0].data[3] = res.data.content.resultList[i].amount; break; 
                                case 5 :this.yingyeshujuoption.series[0].data[4] = res.data.content.resultList[i].amount; break; 
                                case 6 :this.yingyeshujuoption.series[0].data[5] = res.data.content.resultList[i].amount; break; 
                                case 0 :this.yingyeshujuoption.series[0].data[6] = res.data.content.resultList[i].amount; break; 
                            }
                        }
                    }
                    
                    this.setyingyeshuju();
                    // this.loading = false;
                })
            }, 
            //本月
            changeMonth:function(){
                this.ischangedwm = 3;
                // this.loading = true;
                this.yingyeshujuoption.xAxis.data = this.createdataformonthvalue;
                this.yingyeshujuoption.series[0].data = this.createdataformonthvalue_detail;
                let data=this.qs.stringify({
                    shopId:this.shopId,
                });
                //本月
                this.$http.post(`${ipAddress}/front/data_kanban!showMonthRevenue.action`,data)
                .then(res =>{
                    this.monthdata_yuan = res.data.content;
                    if(this.isActive == 1){
                        for(let i=0;i<res.data.content.resultList.length;i++){
                            let a = res.data.content.resultList[i].revenue_date;
                            let b = Number(a);
                            this.yingyeshujuoption.series[0].data[b-1] = res.data.content.resultList[i].money;
                        }
                    }
                    if(this.isActive == 2){
                        for(let i=0;i<res.data.content.resultList.length;i++){
                            let a = res.data.content.resultList[i].revenue_date;
                            let b = Number(a);
                            this.yingyeshujuoption.series[0].data[b-1] = res.data.content.resultList[i].amount;
                        }
                    }
                    this.setyingyeshuju();
                    // this.loading = false;
                })
            },
            //收银渠道概览>支付宝
            changeZ: function() {
                this.isChange = 1;
                this.showmoney = this.todayformdata.ali_money.toFixed(2);
            },
            //收银渠道概览>微信
            changeY: function() {
                this.isChange = 2;
                this.showmoney = this.todayformdata.wei_money.toFixed(2);
            },
            //收银渠道概览>现金
            changeW: function() {
                this.isChange = 3;
                this.showmoney = this.todayformdata.case_money.toFixed(2);
            },
            //收银渠道概览>银联
            changeX: function() {
                this.isChange = 4;
                this.showmoney = this.todayformdata.union_money.toFixed(2);
            },
            changeOption: function() {
            },
            //获取门店
            getShop: function() {
                this.$http.get(`${ipAddress}/front/shop_info!getAllShopList.action`)
                    .then(res => {
                        let data = res.data.content.resultList;
                        data.unshift({
                            shopId: '',
                            shopName: '全部门店'
                        });
                        this.selectdata = res.data.content.resultList;
                    })
            },
            //门店改变时调用
            selectdatachange(){
                this.changeDay();
                this.gettodaydata();
                this.getyestodaydata();
            },
            
        }

    };
</script>

<style scoped>
    .pop-number .icon {
        color: #00a0ea;
    }
    
    .pop-main {
        background-color: #F5F5F5;
    }
    
    .active {
        border: 1px solid #48a9ee;
        color: #48a9ee;
    }
    
    .block {
        display: inline-block;
        margin-left: 28px;
    }
    
    .pop-head {
        width: 100%;
        height: 100%;
        margin-top: 16px;
        background-color: #F5F5F5;
        border: none !important;
    }
    
    .pop-head>div:nth-child(2),
    .pop-head>div:nth-child(3),
    .pop-head>div:nth-child(4) {
        margin-left: 2%;
    }
    
    .pop-section {
        display: flex;
        width: 23.25%;
        height: 90px;
        background-color: white;
    }
    
    .pop-first {
        height: 90px;
        margin-left: 2%;
        text-align: center;
    }
    
    .pop-section-body {
        width: 160px;
        height: 90px;
        margin-left: 5%;
    }
    
    .pop-business {
        width: 79px !important;
        height: 100%;
        /*background: url(../../../src/assets/images/1.png) 50% 50% no-repeat;*/
        background-size: 70% 70%;
    }
    
    .pop-clinch {
        width: 79px !important;
        /*background: url(../../../src/assets/images/2.png) 50% 50% no-repeat;*/
        background-size: 70% 70%;
    }
    
    .pop-price {
        width: 79px !important;
        /*background: url(../../../src/assets/images/3.png) 50% 50% no-repeat;*/
        background-size: 70% 70%;
    }
    
    .pop-deal {
        width: 79px !important;
        /*background: url(../../../src/assets/images/4.png) 50% 50% no-repeat;*/
        background-size: 70% 70%;
    }
    
    .pop-section-body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    
    .pop-section-body>p:nth-child(1) {
        width: 150px;
        /*margin-top: 14px;*/
        color: #888;
        font-size: 10px;
        /*outline:1px solid blue;*/
        position: relative;
        top: 10px;
    }
    .zuoriys{
        color: #888;
    }
    
    .pop-section-body>p:nth-child(2) {
        width: 150px;
        height: 26px;
        font-size: 18px;
        color: #00a0e9;
        font-weight: 600;
        line-height: 26px;
        margin-top: 2px;
        /*outline:1px solid yellow;*/
    }
    
    .pop-number {
        display: flex;
        /*outline:1px solid blue;*/
        position: relative;
        top: -10px;
    }
    
    .pop-number svg {
        margin-top: 2px;
    }
    
    .pop-number p {
        display: inline-block;
    }
    
    
    .pop-number p:nth-of-type(1) {
        font-size: 12px;
    }
    
    .pop-number p:nth-of-type(2) {
        font-size: 12px;
    }
    .pop-chart-first {
        width: 100%;
        margin-top: 20px;
        display: flex;
    }
    
    .pop-chart-number {
        width: 62%;
        height: 380px;
        background-color: white;
    }
    
    .pop-chart-overview {
        width: 35%;
        height: 380px;
        background-color: white;
        margin-left: 2%;
        text-align: center;
    }
    .memberdata_box{
        width: 35%;
        height: 360px;
        background-color: white;
        margin-left: 2%;
    }
    .pop-chart-number p,
    .pop-chart-overview p {
        display: inline-block;
        width: 100%;
        height: 46px;
        color: #333;
        font-size: 16px;
        line-height: 46px;
        text-align: left;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-left: 10px;
        font-weight: 600;
        border-bottom: 2px solid #f4f4f4;
    }
    
    .pop-chart-overview>p>span {
        float: right;
        margin-right: 10px;
        color: #00a0e8;
        font-size: 10px;
        font-weight: 400;
    }
    
    #main canvas {
        margin: 0 auto;
    }
    
    .pop-main {
        background-color: none;
    }
    .icon-xiajiang{
        color:red !important;
    }
    .moban{
        opacity: 0.18;
    }
</style>