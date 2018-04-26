<!--店铺商圈/商圈列表-->
<template>
	<div class="tab_main">
		<div class="tab_header">
			<el-input placeholder="请输入商圈名称" v-model="inputValue" @keyup.enter.native="query" size="small" class="pop-summary-input"></el-input>
			<el-button class="query_button" type="primary" size="small" @click="query">搜 索</el-button>
		</div>
		<div class="tab_list">
			<div class="block">
				<el-table
					:data="tableData2">
					<el-table-column
						type="index"
						width="100"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="shopName"
						label="店铺名称">
					</el-table-column>
					<el-table-column
						prop="name"
						label="商圈名称">
					</el-table-column>
					<el-table-column
						prop="addr"
						label="商圈地址">
					</el-table-column>
					<el-table-column
						prop="linkMan"
						label="联系人">
					</el-table-column>
					<el-table-column
						prop="mobile"
						label="联系电话">
					</el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:page-size="10"
					layout="total, prev, pager, next,jumper"
					:total="totalPage"
					class="foot_nav">
				</el-pagination>
			</div>
		</div>
		<div style="width:200px;">
			<span>只能输入正整数 : </span>
			<el-input size="small" maxlength="7" v-model="input_test" @keyup.native="input_test = input_test.replace(/\D/g,'').replace(/^0+(?=\d)/,'')"></el-input>
			<span>只能输入数字 : </span>
			<el-input size="small" maxlength="7" v-model="input_test" @keyup.native="input_test = input_test.replace(/[^\d]/g,'')"></el-input>
			<span>只能输入数字和英文的 : </span>
			<el-input size="small" maxlength="7" v-model="input_test" @keyup.native="input_test = input_test.replace(/[^\d]/g,'')"></el-input>
		</div>
	</div>
</template>

<script>
	import {ipAddress} from '../../service'
	export default {
		data(){
			return {
				input_test:'',
				inputValue:'',
				totalPage:1,
				tableData2: []
			}
		},
		mounted:function () {
			var data=this.qs.stringify({
				page:'1',
				count:'10',
				businessname:''
			});
			this.getList(data);
		},
		created: function () {
			var curRouter = this.$router.currentRoute;
			this.$store.commit("dealData", {
				path: curRouter.path,
				name: curRouter.meta.name
			});
		},
		methods: {
			keyup_test(i){
				return i.replace(/\D/g,'').replace(/^0+(?=\d)/,'')
			},
			handleCurrentChange(val) {
				var data=this.qs.stringify({
					page:val,
					count:'10',
					businessname:this.inputValue
				});
				this.getList(data);
			},
			query:function () {
				var data=this.qs.stringify({
					page:'1',
					count:'10',
					businessname:this.inputValue
				});
				this.getList(data);
			},
			getList:function (data) {
				this.$http.post(`${ipAddress}/front/business!businesslist.action`,data)
					.then(res =>{
							if(res.data.errorCode == "30005"){
								window.location.href='http://b.tingzhijun.com/merchant';
						}
						this.tableData2=res.data.content.list;
						this.totalPage=res.data.content.num;
					})
			}
		}
	}
</script>