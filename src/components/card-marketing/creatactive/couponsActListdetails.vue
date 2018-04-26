<!--卡位营销/券活动列表/点击查看-->
<template>
  <div class="main">
    <div class="kawei_ticket_show">
      <div class="div1">
        <img class="img1" src="../../../assets/manjianimg.jpg" alt="">
        <p class="g_name">商券通满减券</p>
        <img class="g_img" :src="form.strip" alt="">
        <section class="g_div1">
          <span class="g_title">消费满 {{form.verfyLeast}} 元 , 可减</span><br>
          <span class="g_des">{{form.money}} 元</span>
        </section>
        <section class="g_div2">
          <span class="g_title">有效期至</span><br>
          <span v-if="form.verifyDateType == 1" class="g_des">领取后 {{form.verfyToDay}} 日内有效</span>
          <span v-if="form.verifyDateType == 0" class="g_des">{{form.verfyBeginTime}} 至 {{form.verfyEndTime}} 有效</span>
        </section>
      </div>
    </div>
    <div class="ticket_rule">
		<span class="ticket_title_all">活动内容</span>
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item class="ticket_title" label="活动标题 :">
				<span>{{form.name}}</span>
			</el-form-item>
			<el-form-item class="ticket_downtype" label="类型 :">
				<span>满减券</span>
			</el-form-item>
			<el-form-item class="ticket_downtype" label="发放规则 :">
				<span>消费满 {{form.sendLeast}} 元,发放该卡券</span>
			</el-form-item>
			<el-form-item class="ticket_downtype" label="核销条件 :">
				<span>消费满 {{form.verfyLeast}} 元,可使用该卡券</span>
			</el-form-item>
			<el-form-item class="ticket_downtype" label="满减金额 :">
				<span>{{form.money}} 元</span>
			</el-form-item>
			<el-form-item class="code_shop" label="适用门店 :">
				<span>已选 {{numlist}} 家门店&#X3000;</span>
				<el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
				<el-dialog
					title="适用门店列表"
					v-model="dialogVisible_shopslist"
					size="tiny"
					top="20%">
						<p v-for="item in shops">{{item.name}}</p>
				</el-dialog>
			</el-form-item>
			<el-form-item class="ticket_number" label="发券数量 :">
				<span v-if="form.quantity==0">不限制</span>
				<span v-if="form.quantity!=0">{{form.quantity}} 张</span>
			</el-form-item>
			<el-form-item label="活动介绍 :">
				<span class="width_400"> {{form.useDesc}}</span>
			</el-form-item>
		</el-form>
		<span class="ticket_title_all">规则设置</span>
		<el-form ref="form" :model="form" label-width="140px">
			<el-form-item label="活动时间 :">
				<span>{{form.sendBeginTime}} 至 {{form.sendEndTime}}</span>
			</el-form-item>
			<el-form-item class="ticket_title" label="核销限制 :">
				<span v-if="form.isVerifyLimit   == 0">不限制</span>
				<span v-if="form.isVerifyLimit   == 1">每 {{form.verifyWeekLimit}} {{form.verifyTimeLimit}} 可使用</span>
			</el-form-item>
        <el-form-item class="ticket_title" label="领取限制 :">
			<span v-if="form.pickLimitTotal == -1">不限制</span>
			<span v-if="form.pickLimitTotal != -1">{{form.pickLimitTotal}} 张/人</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="每日领取限制 :">
			<span v-if="form.pickLimitNumDay == -1">不限制</span>
			<span v-if="form.pickLimitNumDay != -1 ">{{form.pickLimitNumDay}} 张/人</span>
        </el-form-item>
        <el-form-item class="ticket_number" label="券有效期 :">
			<span v-if="form.verifyDateType == 1">领取后 {{form.verfyToDay}} 日内有效</span>
			<span v-if="form.verifyDateType == 0">{{form.verfyBeginTime}} 至 {{form.verfyEndTime}} 有效</span>
        </el-form-item>
        <el-form-item>
			<el-button class="bottom_button" @click="back" size="small">返 回</el-button>
			<el-button class="bottom_button" @click="dialogVisible_xiajiasure = true" size="small" type="primary" v-if="form.isCanUnpublish == 1">
            下 架
          	</el-button>
        </el-form-item>
        <el-dialog
			title="提示"
			v-model="dialogVisible_xiajiasure"
			size="tiny"
			top="35%">
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
    import { ipAddress } from '../../../service'
    export default {
        data() {
            return {
                numlist: '',
                waysdata: [],
                wayskinds: '',
                isFlag: 0,
                dialogVisible_xiajiasure: false,
                camp_id: '',
                tableData: [],
                shops: [],
                dialogVisible_xiajia: false,
                dialogVisible_shopslist: false,
                form: {}
            }
        },
        mounted: function() {
            let data = this.qs.stringify({
                id: this.camp_id
            });
            this.$http.post(`${ipAddress}/front/ali_pass!getAliPassById.action`, data)
                .then(res => {
                    if (res.data.errorCode == "30005") {
                        window.location.href = 'http://b.tingzhijun.com/merchant';
                    } else {
                        this.form = res.data.content;
                        this.numlist = res.data.content.shopInfoList.length;
                        //门店
                        this.shops = res.data.content.shopInfoList;
                    }
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
            back() {
                window.history.back();
            },
            soldOut: function() {
                this.dialogVisible_xiajiasure = false;
                let data = this.qs.stringify({
                    id: this.$route.query.id
                });
                this.$http.post(`${ipAddress}/front/ali_pass_market!unPublish.action`, data)
                .then(res => {
                    if (res.data.errorCode == "30005") {
                        window.location.href = 'http://b.tingzhijun.com/merchant';
                    } else if (res.data.errorCode == "10000") {
                        if (res.data.status == 'error') {
                            this.$message.error("下架失败!")
                        } else if (res.data.status == 'success') {
                            this.$message.success("下架成功!")
                            this.$router.push('/myputcard')
                        }
                    }
                })
            }
        }
    }
</script>

<style>
    .width_400 {
        display: inline-block;
        width: 400px;
    }
</style>