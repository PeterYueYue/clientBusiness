<!--店铺管理/商品管理-->
<template>
	<div class="main">
		<div class="tab_list">
			<div class="top_query">
				<span class="font14">商品类别:</span>
				<el-select v-model="dataform.goodsCategoryId" placeholder="请选择" size="small">
					<el-option
						v-for="item in selectdata"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
				<span class="font14 left10">商品名称:</span>
				<el-input
					v-model="dataform.name"
					@keyup.enter.native="clickquery"
					class="width140_button"
					size="small"
					placeholder="请输入商品名称">
				</el-input>
				<div class="price-choose">
					<span class="font14 left10">价格:</span>
					<input
						v-model="dataform.minPrice"
						class="set_input width_44"
						size="small"
						placeholder="">
					<span class="font14">至</span>
					<el-input
						v-model="dataform.maxPrice"
						class="width62_button"
						@keyup.enter.native="clickquery"
						size="small"
						placeholder="">
					</el-input>
				</div>
				<el-button class="query_button" :disabled="disabled" @click="clickquery" type="primary" size="small">搜 索</el-button>
				<div class="f_r">
					<span class=" line_height_30 font14">门店选择:</span>
					<el-select v-model="dataform.shopInfoIds" @change="getList" placeholder="请选择" size="small" class=" margin_r_10">
						<el-option
							v-for="item in shopselectdata"
							:key="item.id"
							:label="item.shopName"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="goodstool_btn">
				<router-link to="/add">
					<el-button class="goodstool_first_button" type="primary">添加商品 +</el-button>
				</router-link>
				<!--<el-button class="goodstool_first_button left10" type="primary">批量上传图片</el-button>-->
				<el-button class="goodstool_first_button left10" type="primary" @click="openshopkinds">商品类别管理</el-button>
				<el-button class=" left10" type="primary" @click="setallsafeStock">批量安全库存设置</el-button>
				<!--商品类别管理弹窗(1级弹窗)-->
				<el-dialog
					title="商品类别管理"
					v-model="dialogVisible"
					class="kinds_c"
					size="small">
					<div class="lei_main">
						<!--循环展示商品(删除/修改)-->
						<div v-for="item in kindsObjects">
							<div class="goods_lei ">
								<p>{{ item.name }}</p>
								<el-button class="vfor_but border_right" type="text" @click="kinds_detale_btn(item.id)">删除</el-button>
								<span class="fenge">|</span>
								<el-button class="vfor_but" type="text" @click="revisekinds(item)">修改</el-button>
							</div>
						</div>
						<!--添加商品类别-->
						<div class="goods_lei add_goodskinds">
							<el-button class="add_btn" type="text" @click="addkind_jia">+</el-button>
							<br>
							<span>添加商品类别</span>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button class="bottom_button" type="primary" @click="dialogVisible = false">确 定</el-button>
						<el-button class="bottom_button" @click="dialogVisible = false">取 消</el-button>
					</span>
				</el-dialog>
				<!--删除商品类别弹窗(二级弹窗)-->
				<el-dialog
					title="删除商品类别"
					v-model="dialogVisible_delete"
					size="tiny"
					top="25%">
					<p>若分类下存在商品,您必须将商品移至其他类目后才能进行删除操作</p>
					<p class="text_center">确认删除此商品类别?</p>
					<span slot="footer" class="dialog-footer">
						 <el-button class="bottom_button" type="primary"  @click="kinds_detale_true">确 定</el-button>
						 <el-button class="bottom_button" @click="dialogVisible_delete = false">取 消</el-button>
					</span>
				</el-dialog>
				<!--删除商品类别弹窗(二级弹窗)-->
				<el-dialog
					title="批量安全库存设置"
					v-model="dialogVisible_safeStock"
					size="tiny"
					top="25%">
					<el-form ref="safeStockform" :rules="safeStockrule" :model="safeStockform" label-width="120px">
						<el-form-item label="适用商品 : ">
							<el-radio-group v-model="safeSelect">
								<el-radio :label="1">所有商品</el-radio>
								<el-radio :label="2">未设置过安全库存的商品</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="库存值生效方式 : ">
							<el-radio-group v-model="safeValueType">
								<el-radio :label="1">安全库存数具体值</el-radio>
								<el-radio :label="2">安全库存百分比%</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="安全库存值 : " prop="safeStock">
							<el-input size="small" type="number" v-model="safeStockform.safeStock" placeholder="请填写商品安全库存"></el-input>
						</el-form-item>
					</el-form>
					<!-- <div>
						<div>
							<span style="color: #333;font-weight: 600;;">&#X3000;&#X3000;&#X3000;适用商品 : </span>
							<el-radio-group v-model="safeSelect">
								<el-radio :label="1">所有商品</el-radio>
								<el-radio :label="2">未设置过安全库存的商品</el-radio>
							</el-radio-group>
						</div>
						<div style="margin-top: 16px;">
							<span style="color: #333;font-weight: 600;">库存值生效方式 : </span>
							<el-radio-group v-model="safeValueType">
								<el-radio :label="1">安全库存数具体值</el-radio>
								<el-radio :label="2">安全库存百分比%</el-radio>
							</el-radio-group>
						</div>
						<div style="margin-top: 16px;">
							<span style="color: #333;font-weight: 600;">&#X3000;&#X3000;安全库存值 : </span>
							
						</div>
					</div> -->
					<span slot="footer" class="dialog-footer">
						 <el-button class="bottom_button" type="primary"  @click="safeStock_btn_true">确 定</el-button>
						 <el-button class="bottom_button" @click="dialogVisible_safeStock = false">取 消</el-button>
					</span>
				</el-dialog>
				<!--添加商品类别弹窗(二级弹窗)-->
				<el-dialog
					title="添加商品类别"
					v-model="dialogVisible_add"
					size="tiny"
					top="25%">
					<div class="add_main">
						<el-form :model="addkinds" :rules="rules" ref="addkinds" label-width="120px" class="demo-ruleForm">
							<el-form-item label="商品类别名称 :" prop="name">
								<el-input size='small' v-model="addkinds.name"></el-input>
							</el-form-item>
							<el-form-item label="排序码 :"  prop="orderList">
								<el-input size='small' type="number" v-model="addkinds.orderList"></el-input>
							</el-form-item>
							<el-form-item label="适应门店 :" prop="sendshopdata">
									<div>
										<span v-if="addkinds.add_shopsnumber">已选{{addkinds.add_shopsnumber}}家门店</span>
										<!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
										<el-button v-if="addkinds.add_shopsnumber" type="text" @click="add_againchooseshop">重新选择</el-button>
										<el-button v-if="!addkinds.add_shopsnumber" type="text" @click="add_dialogVisible_queryshops = true">选择门店</el-button>
									</div>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" :disabled="addgoodsdisabled" @click="addshopkinds('addkinds')">确 定</el-button>
						<el-button @click="dialogVisible_add = false">取 消</el-button>
					</span>
				</el-dialog>
				<!--修改商品类别弹窗(二级弹窗)-->
				<el-dialog
					title="修改商品类别"
					v-model="dialogVisible_revise"
					size="tiny"
					top="25%">
					<div class="add_main">
						<el-form :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="120px" class="demo-ruleForm">
							<el-form-item class="tool_dialog_name" label="商品类别名称 :" prop="name">
								<el-input size="small" v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item class="tool_dialog_code" label="排序码 :"  prop="number">
								<el-input type="number" size='small' v-model="ruleForm.number"></el-input>
							</el-form-item>
							<el-form-item class="tool_upshop" label="适应门店 :">
								<div>
									<span v-if="shopsnumber">已选{{shopsnumber}}家门店</span>
									<!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
									<el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
									<el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店</el-button>
								</div>
							</el-form-item>
						</el-form>
					</div>
					<span slot="footer" class="dialog-footer">
						<el-button type="primary" @click="xiugaitruebtn">确 定</el-button>
						<el-button @click="dialogVisible_revise = false">取 消</el-button>
				 	</span>
				</el-dialog>
			</div>
			<!--修改商品类别选择门店-->
			<el-dialog
				title="选择适用门店"
				v-model="dialogVisible_queryshops"
				size="small"
				top="20%"
				class="querykinds">
				<div class="kinds_main">
					<div class="shopkinds_list">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
							<div class="check_divbox" v-for="item in Objects1">
								<el-checkbox  :label="item.id" :key="item.id">{{item.shopName}}</el-checkbox>
							</div>
						</el-checkbox-group>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="queryshops_btn">确 定</el-button>
					<el-button @click="dialogVisible_queryshops = false">取 消</el-button>
				</span>
			</el-dialog>
			<!--添加商品类别选择门店-->
			<el-dialog
				title="选择适用门店"
				v-model="add_dialogVisible_queryshops"
				size="small"
				top="20%"
				class="querykinds">
				<div class="kinds_main">
					<div class="shopkinds_list">
						<el-checkbox :indeterminate="add_isIndeterminate" v-model="add_checkAll" @change="add_handleCheckAllChange">全选</el-checkbox>
						<el-checkbox-group v-model="add_checkedshops" @change="add_handleCheckedCitiesChange">
							<div class="check_divbox" v-for="item in add_shopObjects">
								<el-checkbox  :label="item.id" :key="item.id">{{item.shopName}}</el-checkbox>
							</div>
						</el-checkbox-group>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="add_queryshops_btn">确 定</el-button>
					<el-button @click="add_dialogVisible_queryshops = false">取 消</el-button>
				</span>
			</el-dialog>
			<!--商品列表-->
			<div>
				<div class="block">
					<el-table
						:data="tableData"
						style="width: 100%">
						<el-table-column
							prop="num"
							label="序号"
							width="120">
						</el-table-column>
						<el-table-column
							prop="img"
							label="商品图片"
							min-width="180">
							<template scope="scope">
								<img class="goods_img" :src="[scope.row.img]" alt="">
							</template>
						</el-table-column>
						<el-table-column
							prop="goodsName"
							label="商品名称">
						</el-table-column>
						<el-table-column
							prop="categoryName"
							label="商品类别">
						</el-table-column>
						<el-table-column
							prop="price"
							label="商品价格(元)">
						</el-table-column>
						<el-table-column
							prop="safeStock"
							label="安全库存">
						</el-table-column>
						<el-table-column
							label="操作"
							min-width="180">
							<template scope="scope">
								<router-link  :to="{path:'goodscheck',query:{id:scope.row.goodsId}}">
									<el-button  type="text" size="small">查看</el-button>
									<span style="color: #ddd">&nbsp;|</span>
								</router-link>
								<router-link :to="{path:'compile',query:{id:scope.row.goodsId}}">
									<el-button  type="text" size="small">编辑</el-button>
									<span style="color: #ddd">&nbsp;|</span>
								</router-link>
								<el-button v-if="scope.row.isPublish == '上架'" @click="down_btn(scope.row.goodsId)" type="text" size="small">下架</el-button>
								<el-button v-if="scope.row.isPublish == '未上架'" @click="up_btn(scope.row.goodsId)" type="text" size="small">上架</el-button>
								<span style="color: #ddd">&nbsp;|</span>
								<el-button type="text"  @click="clear_btn(scope.row.goodsId)" size="small" class="color_red hover_color">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						@current-change="handleCurrentChange"
						:page-size="10"
						layout="total, prev, pager, next,jumper"
						:total="dataLength"
						class="foot_nav">
					</el-pagination>
				</div>
			</div>
		</div>
		<el-dialog
			title="下架商品"
			v-model="xiajia_dialog"
			size="tiny"
			top="35%">
			<p class="text_center">确认下架此商品?</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="xiajia_true">确 定</el-button>
				<el-button @click="xiajia_dialog = false">取 消</el-button>
			 </span>
		</el-dialog>
		<el-dialog
			title="上架商品"
			v-model="shangjia_dialog"
			size="tiny"
			top="35%">
			<p class="text_center">确认上架此商品?</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="shangjia_true">确 定</el-button>
				<el-button @click="shangjia_dialog = false">取 消</el-button>
			 </span>
		</el-dialog>
		<el-dialog
			title="删除商品"
			v-model="shanchu_dialog"
			size="tiny"
			top="35%">
			<p class="text_center">确认删除此商品?</p>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="clear_true">确 定</el-button>
				<el-button @click="shanchu_dialog = false">取 消</el-button>
			 </span>
		</el-dialog>
	</div>
</template>

<script>
	import {queryLogin} from '../../../api/CommonMethods'
	import {ipAddress} from '../../../service'
	export default {
		data() {
			let validatePass =(rule, value, callback) =>{
                let reg =  /^[1-9]\d*$/;
                if(!reg.test(value)){ 
                    callback(new Error('请正确填写商品安全库存'));
                } else {
                    callback();
                }
            };
			return {
				safeStockrule:{
					safeStock:[
						{ required: true, message: '请填写商品安全库存', trigger: 'blur' },
						{ validator: validatePass, trigger: 'blur' }
					]
				},
				safeStockform:{
					safeStock:'',
				},
				disabled:false,
				addgoodsdisabled:false,
				safeSelect:1,
				safeValueType:1,
				checkList:[],
				wantdowngoodsid:'',
				wantdetalekindsid:'',
				sendkindsdata:'',
				dataform:{
					pageNumber:1,
					pageSize:10,
					name:'',
					minPrice:'',
					maxPrice:'',
					goodsCategoryId:'',
					shopInfoIds:''
				},
				kindsdataform:{
					pageNumber:1,
					pageSize:10000,
					shopInfoIds:'',
					isShow:true
				},
				dataLength:0,
				shopsnumber:'',
				dialogVisible_queryshops:false,
				dialogVisible_safeStock:false,
				isIndeterminate:true,
				checkAll:false,
				checkedshops:[],
				shopsnumber:'',
				Objects1: [],
				hhddatas2:[],

				add_dialogVisible_queryshops:false,
				add_isIndeterminate:true,
				add_checkAll:false,
				add_checkedshops:[],
				add_shopObjects: [],
				add_hhddatas2:[],

				selectdata: [{name:'全部分类',id:''}],
				selectvalue: '1',
				shopselectdata: [],
				selectvalue1: '1',
				addkinds:{
					orderList:'',
					name: "",
					sendshopdata: "",
					add_shopsnumber:""
				},
				ruleForm: {
					name: "",
					number: ""
				},
				rules: {
					name: [
						{required: true, message: '请输入商品类别名称', trigger: 'blur'},
						{min: 0, max: 10, message: '活动名称不得多于10个字符', trigger: 'blur'}
					],
					orderList:[
							{required: true, message: '请输入商品排序码', trigger: 'blur'},
							{max:10, message: '排序码不得多于5位', trigger: 'blur'},
					],
					sendshopdata:[
						{required: true, message: ' ', trigger: 'blur'}
					]
				},
				rules1: {
					name: [
						{required: true, message: '请输入活动名称', trigger: 'change'},
						{min: 0, max: 30, message: '活动名称不得多于30个字符', trigger: 'change'}
					]
				},
				kindsObjects: [],
				tableData: [],
				dialogVisible: false,
				dialogVisible_delete: false,
				dialogVisible_add: false,
				dialogVisible_revise: false,
				xiajia_dialog: false,
				shangjia_dialog:false,
				shanchu_dialog:false,
				xiugaikindsid:'',
				add_checkedshopstrue:[]
			};
		},
		mounted:function(){
			queryLogin();
			this.getkindsList();
			this.getshopList();
		},
		methods: {
			//批量安全库存设置
			setallsafeStock(){
				this.dialogVisible_safeStock = true;
			},
			//批量安全库存设置,弹窗内确定
			safeStock_btn_true(){
				this.$refs["safeStockform"].validate((valid)=>{
					if(valid){
						console.log(this.safeStockform.safeStock);
						console.log(this.safeSelect);
						console.log(this.safeValueType);
						let data = this.qs.stringify({
							safeStock:this.safeStockform.safeStock,
							safeValueType:this.safeValueType,
							safeSelect:this.safeSelect,
						})
						this.$http.post(`${ipAddress}/front/goods!bathSafeStock.action`,data)
							.then(res => {
								console.log(res);
								if (res.data.errorCode == 30005) {
									window.location.href = 'http://b.tingzhijun.com/merchant';
								} else if (res.data.errorCode == 10000) {
									if(res.data.status == 'success'){
										this.$message.success('设置成功');
										this.dialogVisible_safeStock = false;
										this.getList();
									}
								} else {
									this.$message.error(res.data.message);
								}
							})
					}
				})
			},
			//删除商品类别
			kinds_detale_btn(id){
				this.dialogVisible_delete = true;
				this.wantdetalekindsid = id;
			},
			//删除商品类别确定
			kinds_detale_true(){
				queryLogin();
				this.dialogVisible_delete = false;
				let data = this.qs.stringify({
						id:this.wantdetalekindsid
				});
				this.$http.post(`${ipAddress}/front/goods_category!delete.action`,data)
					.then(res => {
						if(res.data.status == "success"){
							this.$message("删除商品类别成功!")
						}else if(res.data.status == "error"){
							this.$message(res.data.message)
						}
						this.getkindsList();
					})
				this.wantdowngoodsid="";
			},
			//删除按钮
			clear_btn(id){
				this.shanchu_dialog = true;
				this.wantdowngoodsid=id;
			},
			//删除确定
			clear_true(){
				queryLogin();
				this.shanchu_dialog = false;
				let data = this.qs.stringify({
						id:this.wantdowngoodsid
				});
				this.$http.post(`${ipAddress}/front/goods!delete.action`,data)
					.then(res=>{
						if(res.data.status == "success"){
							this.$message("删除商品成功!")
						}else if(res.data.status == "error"){
							this.$message("删除商品失败!")
						}
						this.getList();
					})
				this.wantdowngoodsid="";
			},
			//上架按钮
			up_btn(id){
				this.shangjia_dialog = true;
				this.wantdowngoodsid=id;
			},
			//上架确定
			shangjia_true(){
				queryLogin();
				this.shangjia_dialog = false;
				let data = this.qs.stringify({
						id:this.wantdowngoodsid
				});
				this.$http.post(`${ipAddress}/front/goods!publish.action`,data)
					.then(res=>{
						if(res.data.status == "success"){
							this.$message("上架商品成功!")
						}else if(res.data.status == "error"){
							this.$message("上架商品失败!")
						}
						this.getList();
					})
				this.wantdowngoodsid="";
			},
			//下架按钮
			down_btn(id){
				this.xiajia_dialog = true;
				this.wantdowngoodsid=id;
			},
			//下架确定
			xiajia_true(){
				queryLogin();
				this.xiajia_dialog = false;
				let data = this.qs.stringify({
					id:this.wantdowngoodsid
				});
				this.$http.post(`${ipAddress}/front/goods!unPublish.action`,data)
					.then(res=>{
						if(res.data.status == "success"){
							this.$message("下架商品成功!");
						}else if(res.data.status == "error"){
							this.$message("下架商品失败!");
						}
						this.getList();
					})
				this.wantdowngoodsid="";
			},
			//添加分类按钮
			addkind_jia(){
				this.dialogVisible_add = true;
				this.addkinds.orderList = '';
				this.addkinds.name = '';
				this.addkinds.sendshopdata = '';
				this.addkinds.add_shopsnumber = '';
			},
			//获取门店列表
			getshopList(){
				let shopdata = this.qs.stringify({
						pageNumber:1,
						pageSize:10000
				});
				this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`,shopdata)
					.then( res=>{
						this.shopselectdata = res.data.content.resultList;
						this.add_shopObjects = res.data.content.resultList;
						this.Objects1 = res.data.content.resultList;
						this.dataform.shopInfoIds = res.data.content.resultList[0].id;
						this.getList();
					})
			},

			//获取商品类别列表
			getkindsList(){
				queryLogin();
				var data = this.qs.stringify(this.kindsdataform);
				this.$http.post(`${ipAddress}/front/goods_category!getGoodsCategoryPager.action`,data)
					.then(res=>{
						var downdata  = res.data.content.resultList;
						this.selectdata = this.selectdata.concat(downdata);
						this.kindsObjects = res.data.content.resultList;
					})
			},
			//获取商品列表
			getList(){
				queryLogin();
				var data = this.qs.stringify(this.dataform);
				this.$http.post(`${ipAddress}/front/goods!getGoodsPager.action`,data)
					.then(res=>{
						this.disabled = false;
						this.tableData = res.data.content.resultList;
						this.dataLength=res.data.content.totalCount;
					})
			},
			//打开商品类别管理弹窗
			openshopkinds(){
				this.dialogVisible = true;
			},
			//打开修改商品类别弹窗
			revisekinds(item){
				queryLogin();
				this.xiugaikindsid = item.id;
				this.ruleForm.name = item.name;
				this.ruleForm.number = item.sort;
				this.dialogVisible_revise = true;
				let detaildata = this.qs.stringify({
					id:item.id,
				})
				this.$http.post(`${ipAddress}/front/goods_category!getGoodsCategoryById.action`,detaildata)
					.then(res=>{
						this.shopsnumber = res.data.content.shopInfoIds.length;
						this.checkedshopstrue = res.data.content.shopInfoIds;
					})
			},
			//添加商品类别
			addshopkinds(form){
				queryLogin();
				this.$refs[form].validate((valid) => {
					if (valid) {
						let addkindsdata = this.qs.stringify({
								name:this.addkinds.name,
								orderList:this.addkinds.orderList,
								isShow:true,
								shopInfoIds:this.addkinds.sendshopdata
						});
						this.addgoodsdisabled = true;
						this.$http.post(`${ipAddress}/front/goods_category!saveGoodsCategory.action`,addkindsdata)
						.then( res =>{
							this.addgoodsdisabled = false;
							if(res.data.status == "success"){
								this.$message("添加分类成功!");
								this.getkindsList();
								this.dialogVisible_add = false;
							}
						})
					} else {
						this.$message('请重新输入信息！')
						return false;
					}
				});
			},
			//点击查询
			clickquery:function(){
				this.disabled = true;
				this.dataform.pageNumber = 1;
				this.getList();
			},
			handleCheckAllChange(event) {
				this.hhddatas2 = [];
				for(var i = 0;i<this.add_shopObjects.length;i++){
					this.hhddatas2.push(this.add_shopObjects[i].id);
				}
				this.checkedshops = event.target.checked ? this.hhddatas2 : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.Objects1.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
			},
			//修改商品类别  上架门店确定
			queryshops_btn(){
				this.dialogVisible_queryshops = false;
				this.checkedshopstrue = this.checkedshops;
				this.sendkindsdata = this.checkedshopstrue.join();
				this.shopsnumber = this.checkedshopstrue.length;
			},
			//修改类别确定按钮  上传修改
			xiugaitruebtn(){
				queryLogin();
				this.sendkindsdata = this.checkedshopstrue.join();
				let sentdata = this.qs.stringify({
					id:this.xiugaikindsid,
					name:this.ruleForm.name,
					orderList:this.ruleForm.number,
					isShow:true,
					shopInfoIds:this.sendkindsdata
				})
				this.$http.post(`${ipAddress}/front/goods_category!updateGoodsCategory.action`,sentdata)
					.then(res =>{
						if(res.data.status == "success"){
							this.$message("修改成功!");
							this.dialogVisible_revise = false;
							this.getkindsList();
						}else if(res.data.status == "error"){
							this.$message("修改失败!");
						}
					})
			},
			//修改商品类别 重新选择
			againchooseshop(){
				this.dialogVisible_queryshops = true;
				this.checkedshops = this.checkedshopstrue;
			},
			//添加商品类别，选择适用门店，全选按钮
			add_handleCheckAllChange(event) {
				this.add_hhddatas2 = [];
				for(var i = 0;i<this.add_shopObjects.length;i++){
					this.add_hhddatas2.push(this.add_shopObjects[i].id);
				}
				this.add_checkedshops = event.target.checked ? this.add_hhddatas2 : [];
				this.add_isIndeterminate = false;
			},
			//添加商品类别，选择适用门店，点击门店变化时
			add_handleCheckedCitiesChange(value) {
				let add_checkedCount = value.length;
				this.add_checkAll = add_checkedCount === this.add_shopObjects.length;
				this.add_isIndeterminate = add_checkedCount > 0 && add_checkedCount < this.add_hhddatas2.length;
			},
			// 上架门店确定
			add_queryshops_btn(){
				this.add_dialogVisible_queryshops = false;
				this.add_checkedshopstrue = this.add_checkedshops;
				this.addkinds.sendshopdata = this.add_checkedshopstrue.join();
				this.addkinds.add_shopsnumber = this.add_checkedshopstrue.length;
			},
			add_againchooseshop(){
				this.add_dialogVisible_queryshops = true;
				this.add_checkedshops = this.add_checkedshopstrue;
			},
			handleCurrentChange(val) {
				this.dataform.pageNumber = val;
				this.getList();
			},
		},
		created: function () {
			var curRouter = this.$router.currentRoute;
			this.$store.commit("dealData", {
				path: curRouter.path,
				name: curRouter.meta.name
			});
		}


	}
</script>

<style>
.width140_button{
	width: 140px;
}
	.margin_r_10 {
		margin-right: 10px;
	}

	.tool_upshop .el-select, .tool_upshop .el-select .el-input {
		width: 260px;
	}

	.tool-box {
		margin: 16px 18px 0 18px;
	}

	.add_main .el-form-item {
		margin-bottom: 20px;
	}

	.left10 {
		margin-left: 10px !important;
	}

	.goodstool_btn {
		margin: 18px 0px;
	}

	.el-table td, .el-table th.is-leaf {
		height: 56px;
	}

	.foot_nav {
		float: right;
		margin: 20px 10px;
	}

	td {
		text-align: center;
	}

	td div.cell {
		display: inline-block;
	}


	.dialog-footer .el-button {
		width: 72px;
		height: 30px;
		padding: 0px;

	}

	.el-dialog__body {
		padding: 30px 20px 10px 20px;
	}

	.top_query .shop_kinds {
		float: right;
	}

	.goodstool_first_button {
		width: 120px;
	}

	.el-tabs__header {
		padding-left: 10px;
	}

	.el-tabs__item {
		font-size: 14px;
		color: #333;
	}

	.zj-div .el-tabs__item.is-active {
		color: #00a0e9;
	}

	.label_main {
		margin-left: 20px;
		margin-right: 20px;
	}

	.price-choose {
		display: inline-block;
	}
	.zj-div .el-menu-item.is-active{
		border-bottom: 3px solid #20a0ff;
	}

	.el-input3 {
		width: 50px;
	}

	.el-input4 {
		width: 50px;
	}

	.cell {
		text-align: center;
		display: flex;
		align-items: center;
	}

	.goods_img {
		margin-top: 14px;
		width: 44px;
		max-height: 44px;
	}

	.goods_lei {
		background-color: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 0px;
		width: 120px;
		height: 120px;
		margin: 10px 12px;
	}

	.goods_lei:hover {
		box-shadow: 0 0px 2px 2px #ddd;
	}

	.goods_lei .fenge {
		font-size: 14px;
		color: #ddd;
	}

	.goods_lei p {
		font-size: 14px;
		text-align: center;
		line-height: 86px;
		border-bottom: 1px solid #ddd;
	}

	.goods_lei .vfor_but {
		font-size: 12px;
		width: 58px;

	}

	.add_goodskinds:hover {
		box-shadow: 0 0 0 0;
	}

	.lei_main {
		margin-bottom: 20px;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
	}

	.add_goodskinds {
		border: 1px dashed #ddd;
		font-size: 12px;
		text-align: center;
	}

	.add_btn {
		margin-top: 10px;
		font-size: 40px;
	}

	.el-dialog {
		background-color: #f5f5f5;
	}

	.el-dialog__footer {
		text-align: center;
		margin-bottom: 30px;
	}

	.add_main {
		width: 90%;
		margin: 0 auto;
	}

	.goodstool_btn .el-input {
		width: 260px;
	}

	.add_main .el-select .el-input, .add_main .el-select {
		width: 260px;
	}

</style>
