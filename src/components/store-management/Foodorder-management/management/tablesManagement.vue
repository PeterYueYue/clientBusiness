<!--餐台管理-->
<template>
    <div class="busarea_active_main">
        <div class="tab_header">
            <span class="line_height_30 font14">门店 : </span>
            <el-select v-model="shopvalue" placeholder="请选择" @change="shopchange()" size="small"  class=" margin_r_10">
                <el-option
                    v-for="item in shoplist"
                    :key="item.id"
                    :label="item.shopName"
                    :value="item.id">
                </el-option>
            </el-select>
            <span class="line_height_30 font14">用餐区域 : </span>
            <el-select v-model="dinnerareavalue" placeholder="请选择用餐区域" size="small" class=" margin_r_10">
                <el-option 
                    v-for="item in showTableArealist" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                </el-option>
            </el-select>
            <span class="line_height_30 font14">桌台名称 : </span>
            <el-input v-model="querytablename" placeholder="请填写" size="small" class="width_160"></el-input>
            <el-button type="primary" size="small" class="query_button" @click="gettablelist">搜 索</el-button>
            <!--<el-button size="small" class="query_button" @click="Emptydata">置 空</el-button>-->
            <div class="margin_t_16 btn_to_choose_a">
                <el-button type="primary"  @click="addtable_btn()">添加桌台</el-button>
                <el-button type="primary" v-on:mouseenter.native="informshow()" v-on:mouseleave.native="informhide()">下载桌码 <i style="position: relative;top:1px;" class="el-icon-arrow-down"></i>
                <div v-if ="is_show == true" class="select_show">
                    <div>下载选中桌码</div>
                    <div>下载全部桌码</div>
                </div>
                </el-button>
                <el-button type="primary"  @click="settingarea_btn()">用餐区域管理</el-button>
                
            </div>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange">
                    <el-table-column
                        class="allchoose_after" 
                        type="selection" 
                        value="全选"
                        width="60">
                    </el-table-column>
                    <el-table-column
                        prop="tableName"
                        label="桌台名称">
                    </el-table-column>
                    <el-table-column
                        prop="sitNum"
                        label="人数">
                    </el-table-column>
                    <el-table-column
                        prop="areaName"
                        label="用餐区域">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作">
                        <template scope="scope">
                            <el-button @click="download_tablecode" type="text" size="small">下载桌码</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="change_tablecode(scope.row)" type="text" size="small">修改</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="detale_tablecode(scope.row.id)" style="color:red;" type="text" size="small">删除</el-button>
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
        <!--添加桌台弹窗-->
        <el-dialog
            title="添加桌台"
            v-model="addtable_dialog"
            size="tiny"
            top="25%">
            <el-form label-width="100px" class="addtable_form" :rules="addtablerules"  ref="addtableform" :model="addtableform">
                <el-form-item label="门店 : " >
                    <span>{{showshopname}}</span>
                </el-form-item>
                <el-form-item label="用餐区域 : " prop="addtable_location">
                    <el-select v-model="addtableform.addtable_location" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in TableArealist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="桌台名称 : " prop="addtable_name">
                    <el-input size="small" placeholder="请填写桌台名称" v-model="addtableform.addtable_name"></el-input>
                </el-form-item>
                <el-form-item label="人数 : " prop="addtable_number">
                    <el-input size="small" placeholder="请填写1~100的整数" type="number" v-model="addtableform.addtable_number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addtable_true_btn">确 定</el-button>
                <el-button @click="addtable_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--用餐区域管理弹窗-->
        <el-dialog
            title="用餐区域管理"
            v-model="settingarea_dialog"
            size="small"
            top="15%">
            <div>
                <p>门店 : {{showshopname}}</p>
                <div class="area_list">
                    <div class="area_item" v-for="item in TableArealist">
                        <div class="item_top">
                            <div> 
                                <p>{{item.name}}<br>
                                <p><span style="color: #ff5b05;">{{item.num}} </span>张桌台</p>
                            </div>
                        </div>
                        <div class="item_bottom">
                            <el-button type="text" @click="removearea_btn(item.id,item.num)">删除</el-button>
                            <span style="color: #ddd;font-size: 16px;">|</span>
                            <el-button type="text" @click="revisearea_btn(item.id,item.name)">修改</el-button>
                        </div>
                    </div>
                    <div @click="addarea_btn" class="add_area_box">
                        <p>+</p>
                        <p>添加用餐区域</p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="clicktoaddtable" class="font_5_btn">去添加桌台</el-button>
                <el-button @click="settingarea_dialog = false">关闭</el-button>
            </span>
        </el-dialog>
        <!--添加用餐区域弹窗-->
        <el-dialog
            title="添加用餐区域"
            v-model="addarea_dialog"
            size="tiny"
            top="25%">
            <el-form label-width="100px" class="addtable_form">
                <el-form-item label="门店 : " >
                    <span>{{showshopname}}</span>
                </el-form-item>
                <el-form-item label="用餐区域名称 : " required >
                    <el-input size="small" placeholder="请填写桌台名称" v-model="addarea_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addarea_true_btn">添 加</el-button>
                <el-button @click="addarea_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--修改用餐区域-->
        <el-dialog
            title="修改用餐区域"
            v-model="revisearea_dialog"
            size="tiny"
            top="25%">
            <el-form label-width="100px" class="addtable_form">
                <el-form-item label="门店 : " >
                    <span>{{showshopname}}</span>
                </el-form-item>
                <el-form-item label="用餐区域名称 : " required>
                    <el-input size="small" placeholder="请填写桌台名称" v-model="revisearea_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="revisearea_true_btn">确 定</el-button>
                <el-button @click="revisearea_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--删除用餐区域-->
        <el-dialog
            title="删除用餐区域"
            v-model="removearea_dialog"
            size="tiny"
            top="30%">
            <p style="display:inline-block;padding: 10px;">删除该用餐区域将同时删除区域内的 {{tablenum}} 张桌台，并且该操作不可恢复，您确认要删除用餐区域吗？</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="removearea_true_btn">确 定</el-button>
                <el-button @click="removearea_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--table  修改桌台-->
        <el-dialog
            title="修改桌台"
            v-model="changetable_dialog"
            size="tiny"
            top="30%">
            <el-form label-width="100px" class="addtable_form" :rules="changetablerules"  ref="changetableform" :model="changetableform">
                <el-form-item label="门店 : " >
                    <span>{{showshopname}}</span>
                </el-form-item>
                <el-form-item label="用餐区域 : " prop="changetable_location">
                    <el-select v-model="changetableform.changetable_location" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in TableArealist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="桌台名称 : " prop="changetable_name">
                    <el-input size="small" placeholder="请填写桌台名称" v-model="changetableform.changetable_name"></el-input>
                </el-form-item>
                <el-form-item label="人数 : " prop="changetable_number">
                    <el-input size="small" type="number" placeholder="请填写1~100的整数" v-model="changetableform.changetable_number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changetable_true_btn">确 定</el-button>
                <el-button @click="changetable_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--table 删除桌台-->
        <el-dialog
            title="删除桌台"
            v-model="removetable_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 10px;text-align: center;">删除后,将清除该桌台的用餐区域,人数等信息</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="removetable_true_btn">确 定</el-button>
                <el-button @click="removetable_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {ipAddress} from '../../../../service.js'  
    export default {
        data() {
            let validatePass =(rule, value, callback) =>{
                let reg = /^(?:1|[1-9][0-9]?|100)$/;
                if(!reg.test(value)){ 
                    callback(new Error('请填写1~100的正整数'));
                } else {
                    callback();
                }
            };
            return {
                showshopname:'',
                addarea_name:'',
                revisearea_name:'',
                dinnerareavalue:'',
                tableclickid:'',
                czremoveareaid:'',
                pageNumber:1,
                querytablename:'',
                tablenum:'',
                dataLength:0,
                is_show:false,
                shopvalue:'',
                TableArealist:[],
                showTableArealist:[{
                    name: '全部区域',
                    id: ''
                }],
                shoplist:[],
                tableData:[],
                multipleSelection:[],
                addtable_dialog:false,      //添加桌台
                addtableform:{
                    addtable_name:'',
                    addtable_number:'',
                    addtable_location:'',
                },
                addtablerules:{
                    addtable_name:[
                        {required: true, message: '请填写桌台名称', trigger: 'blur'},
                    ],
                    addtable_number:[
                        {required: true, message: '请填写人数', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' },
                    ],
                    addtable_location:[
                        {required: true, message: '请选择用餐区域', trigger: 'change'},
                        
                    ]
                },
                changetablerules:{
                    changetable_name:[
                        {required: true, message: '请填写桌台名称', trigger: 'change'},
                    ],
                    changetable_number:[
                        {required: true, message: '请填写人数', trigger: 'change'},
                        { validator: validatePass, trigger: 'blur' },
                    ],
                    changetable_location:[
                        {required: true, message: '请选择用餐区域', trigger: 'change'},
                    ]
                },
                changetableform:{
                    changetable_name:'',
                    changetable_number:'',
                    changetable_location:'',
                },
                location_list:[],
                settingarea_dialog:false,       //用餐区域管理
                area_list:[
                    {name:'区域一'},
                    {name:'区域一'},
                ],
                addarea_dialog:false,       //添加用餐区域
                revisearea_dialog:false,        //修改用餐区域
                removearea_dialog:false,        //删除用餐区域
                changetable_dialog:false,       //修改桌台
                removetable_dialog:false,       //删除桌台
            }
        },
        mounted: function () {
            this.getshopList();
        },
        methods: {
            //获取用餐区域
            getarealist(){
                this.showTableArealist = [{
                    name: '全部区域',
                    id: ''
                }];
                let data = this.qs.stringify({
                    pageNumber:1,
                    pageSize:10000,
                    tableName:'',
                    tableAreaId:'',
                    shopInfoIds:this.shopvalue,
                })
                this.$http.post(`${ipAddress}/front/dish!getTableAreaPager.action`,data)
                .then(res => {
                    if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.TableArealist = res.data.content.resultList;
                            this.showTableArealist = this.showTableArealist.concat(this.TableArealist);
                            this.gettablelist();
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            },
            //获取门店列表
            getshopList(){
                let data = this.qs.stringify({
                    pageNumber:1,
                    pageSize:10000,
                });
                this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`,data)
                .then(res => {
                    this.shoplist = res.data.content.resultList;
                    this.shopvalue = res.data.content.resultList[0].id;
                    this.showshopname = res.data.content.resultList[0].shopName;
                    this.getarealist();
                })
            },
            //获取桌台列表
            gettablelist(){
                let data = this.qs.stringify({
                    pageNumber:this.pageNumber,
                    pageSize:10,
                    tableName:this.querytablename,
                    tableAreaId:this.dinnerareavalue,
                    shopInfoIds:this.shopvalue,
                })
                this.$http.post(`${ipAddress}/front/dish!getTablePager.action`,data)
                .then(res => {
                    if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.tableData = res.data.content.resultList;
                            this.dataLength = res.data.content.totalCount;
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            },
            //门店改变时
            shopchange(){
                for(let i = 0;i<this.shoplist.length;i++){
                    if(this.shopvalue == this.shoplist[i].id){
                        this.showshopname = this.shoplist[i].shopName;
                    }
                }
            },
            informhide(){
                this.is_show = false;
            },
            informshow(){
                this.is_show = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //添加桌台,打开弹窗
            addtable_btn(){
                this.addtable_dialog = true;
                this.$refs["addtableform"].resetFields();
            },
            //添加桌台弹窗确定按钮
            addtable_true_btn(){
                this.$refs["addtableform"].validate((valid)=>{
                    if(valid){
                        let data = this.qs.stringify({
                            tableAreaId:this.addtableform.addtable_location,
                            tableName:this.addtableform.addtable_name,
                            sitNum:this.addtableform.addtable_number,
                            shopInfoIds:this.shopvalue,
                        });
                        this.$http.post(`${ipAddress}/front/dish!saveTable.action`,data)
                        .then(res => {
                            if(res.data.errorCode == '10000'){
                                if(res.data.status == 'success'){
                                    this.$message.success("添加成功");
                                    this.addtable_dialog = false;
                                    this.gettablelist();
                                }else if(res.data.status == 'error'){
                                    this.$message.error(res.data.message);
                                }
                            }else if(res.data.errorCode == '30005'){
                                window.location.href='http://b.tingzhijun.com/merchant';
                            }else{
                                this.$message.error(res.data.message);
                            }
                        })
                    }
                })
            },
            //用餐区域管理,打开弹窗
            settingarea_btn(){
                this.settingarea_dialog = true;
            },
            //用餐区域管理弹窗内,点击去添加桌台
            clicktoaddtable(){
                this.settingarea_dialog = false;
                this.addtable_dialog = true;
            },
            //添加用餐区域,打开弹窗
            addarea_btn(){
                this.addarea_dialog = true;
            },
            //添加用餐区域弹窗内,点击添加
            addarea_true_btn(){
                if(this.addarea_name == ''){
                    this.$message.warning('')
                }
                let data = this.qs.stringify({
                    areaName:this.addarea_name,
                    shopInfoIds:this.shopvalue,
                });
                this.$http.post(`${ipAddress}/front/dish!saveTableArea.action`,data)
                .then(res => {
                    if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.$message.success('添加成功');
                            this.addarea_dialog = false;
                            this.getarealist();
                            this.addarea_name = '';
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                
            },
            //修改用餐区域,打开弹窗
            revisearea_btn(id,name){
                this.czremoveareaid = id;
                this.revisearea_name = name;
                this.revisearea_dialog = true;
            },  
            //修改用餐区域弹窗内,点击确定
            revisearea_true_btn(){
                if(this.revisearea_name == ''){
                    this.$message.warning('用餐区域名称不能为空');
                    return;
                }
                let data = this.qs.stringify({
                    id:this.czremoveareaid,
                    areaName:this.revisearea_name,
                    shopInfoIds:this.shopvalue,
                });
                this.$http.post(`${ipAddress}/front/dish!updateTableArea.action`,data)
                .then(res => {
                    if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.$message.success('修改成功');
                            this.revisearea_dialog =false;
                            this.getarealist();
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                this.czremoveareaid = '';
            },
            //删除用餐区域,打开弹窗
            removearea_btn(id,num){
                this.czremoveareaid = id;
                this.tablenum = num;
                this.removearea_dialog = true;
            },
            //删除用餐区域弹窗内,点击确定
            removearea_true_btn(){
                let data = this.qs.stringify({
                    id:this.czremoveareaid,
                });
                this.$http.post(`${ipAddress}/front/dish!delTableArea.action`,data)
                .then(res => {
                    if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.$message.success('删除成功');
                            this.removearea_dialog = false;
                            this.getarealist();
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }
                })
                this.czremoveareaid = '';
            },
            //点击下载桌码
            download_tablecode(){

            },
            //修改
            change_tablecode(data){
                this.changetable_dialog = true;
                for(let i = 0;i <this.TableArealist.length;i++ ){
                    if(this.TableArealist[i].name == data.areaName){
                        this.changetableform.changetable_location = this.TableArealist[i].id;
                    }
                }
                this.changetableform.changetable_name = data.tableName;
                this.changetableform.changetable_number = String(data.sitNum);
                this.changetable_id = data.id;
            },
            //删除
            detale_tablecode(id){
                this.tableclickid = id;
                this.removetable_dialog = true;
            },
            //修改桌台,确定按钮
            changetable_true_btn(){
                this.$refs["changetableform"].validate((valid)=>{
                    if(valid){
                        let data = this.qs.stringify({
                            id:this.changetable_id,
                            tableAreaId:this.changetableform.changetable_location,
                            tableName:this.changetableform.changetable_name,
                            sitNum:this.changetableform.changetable_number,
                            shopInfoIds:this.shopvalue,
                        })
                        this.$http.post(`${ipAddress}/front/dish!updateTable.action`,data)
                        .then(res => {
                            if(res.data.errorCode == '10000'){
                                if(res.data.status == 'success'){
                                    this.$message.success('修改成功');
                                    this.changetable_dialog = false;
                                    this.gettablelist();
                                }else if(res.data.status == 'error'){
                                    this.$message.error(res.data.message);
                                }
                            }else if(res.data.errorCode == '30005'){
                                window.location.href='http://b.tingzhijun.com/merchant';
                            }else{
                                this.$message.error(res.data.message);
                            }
                        })
                    }
                })
            },  
            //删除确定
            removetable_true_btn(){
                let data = this.qs.stringify({
                    id:this.tableclickid,
                })
                this.$http.post(`${ipAddress}/front/dish!delTable.action`,data)
                .then(res => {
                    if(res.data.errorCode == '10000'){
                        if(res.data.status == 'success'){
                            this.$message.success('删除成功');
                            this.removetable_dialog = false;
                            this.gettablelist();
                        }else if(res.data.status == 'error'){
                            this.$message.error(res.data.message);
                        }
                    }else if(res.data.errorCode == '30005'){
                        window.location.href='http://b.tingzhijun.com/merchant';
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                this.tableclickid = '';
            },
            handleCurrentChange(val){
                this.pageNumber = val;
                this.gettablelist();
            },
        },
        created: function () {
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        }
    }
</script>

<style>
    .width_160 input{
        width: 160px;
    }
    .width_160{
        width: 160px !important;
    }
    .margin_t_16{
        margin-top: 16px;
    }
    .addtable_form {
        width: 380px;
        margin: 0 auto;
    }
    .addtable_form .el-form-item{
        margin-bottom: 18px;
    }
    .font_5_btn {
        width: 90px !important;
    }
    .area_list .area_item{
        width: 140px;
        height:140px;
        border:1px solid #ddd;
        border-radius: 6px;
        margin: 16px;
    }
    .area_list .item_top{
        height:107px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .area_list .item_top p:nth-of-type(2){
        margin-top: 8px;
    }
    .area_list .item_bottom{
        border-top:1px solid #ddd;
        font-size: 0px;
    }
    .area_list .item_bottom .el-button{
        width: 66px;
    }
    .area_list{
        max-height:400px;
        overflow: auto;
        width: 720px;
        margin: 0 auto;
        display: flex;
        flex-wrap:wrap;
    }
    .add_area_box{
        border:2px dashed #ddd;
        width: 138px;
        height:138px;
        text-align: center;
        margin: 16px;
        cursor: pointer;
        border-radius: 6px;
    }
    .add_area_box p:nth-of-type(1){
        line-height:90px;
        font-size: 50px; 
    }
    .add_area_box p:nth-of-type(2){
        color:#888888;
    }
    .btn_to_choose_a{
        position: relative;
    }
    .select_show{
        position: absolute;
        top: 36px;
        left: 103px;
        z-index: 4;
    }
    .select_show{
        border:1px solid #ddd;
        border-radius:4px;
        background: #fff;
    }
    .select_show div{
        font-size: 14px;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 36px;
        cursor: pointer;
        color: #333;
    }
    .select_show div:nth-of-type(1){
        border-bottom: 1px solid #ddd;
    }
    .select_show div:hover{
        background-color: #f5f5f5;
    }
</style>
