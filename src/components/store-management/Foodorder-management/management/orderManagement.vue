<!--点餐管理-->
<template>
    <div class="busarea_active_main">
        <div class="tab_header">
            <span class="line_height_30 font14">用餐区域 : </span>
            <el-select v-model="dinnerareavalue" placeholder="请选择用餐区域" size="small" class=" margin_r_10">
                <el-option 
                    v-for="item in dinnerareadata" 
                    :key="item.activeId" 
                    :label="item.activeName" 
                    :value="item.activeId">
                </el-option>
            </el-select>
            <span class="line_height_30 font14">桌号 : </span>
            <el-input placeholder="请填写" size="small" class="width_160"></el-input>
            <el-button type="primary" size="small" class="query_button" @click="querydata">搜 索</el-button>
        </div>
        <div class="table_list">
            <div v-for="item in table_list_data" class="table_item">
                <div class="table_list_title">大厅1桌</div>
                <div class="table_list_content">
                    <p>8坐 / 6人</p>
                    <el-button type="text"  @click="changetable_btn">换桌</el-button>
                    <p>下单时间 : 15:30</p>
                </div>
                <div class="table_list_bottom">
                    <el-button type="text" @click="leartable_btn">清理桌台</el-button>
                    <span style="color: #ddd;font-size: 16px;">|</span>
                    <el-button type="text" @click="menudetails_btn">菜单详情</el-button>
                </div>
            </div>
        </div>
        <!--换桌-->
        <el-dialog
            title="请输入换桌后的桌号"
            v-model="changetable_dialog"
            size="tiny"
            top="30%">
            <div style="text-align: center;">
                <div class="selet_box">
                    <span>用餐区域选择 : </span><br>
                    <el-select v-model="changetable_chooseareavalue" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in changetable_chooseareadata"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span style="font-size: 32px;">-</span>
                <div class="selet_box">
                    <span>桌号选择 : </span><br>
                    <el-select v-model="changetable_choosetablevalue" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in changetable_choosetabledata"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="changetable_true_btn">确 定</el-button>
                <el-button @click="changetable_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--清理桌台-->
        <el-dialog
            title="清理桌台"
            v-model="cleartable_dialog"
            size="tiny"
            top="30%">
            <p style="text-align: center;line-height: 24px;">确定清理餐桌?清理后将不可恢复!</p>
            <p style="text-align: center;line-height: 24px;">请尽快安排服务员清理桌台</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="leartable_true_btn">确 定</el-button>
                <el-button @click="cleartable_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--菜单详情-->
        <el-dialog
            title="菜单详情"
            v-model="menudetails_dialog"
            size="small"
            class="menudetails_style"
            top="10%">
            <div>
                <span class="menudetails_alltitle">大厅1桌</span>
                <span class="f_table_all">共计 : <span>100.00</span> 元</span>
            </div>
            <div v-for="item in menudetails_list" class="details_list_item">
                <div class="block">
                    <el-table
                        :data="item.tableData">
                        <el-table-column
                            label="序号"
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="data1"
                            label="商品名称">
                        </el-table-column>
                        <el-table-column
                            prop="data6"
                            label="商品类别">
                        </el-table-column>
                        <el-table-column
                            prop="data7"
                            label="商品价格">
                        </el-table-column>
                        <el-table-column
                            prop="data8"
                            label="数量">
                        </el-table-column>
                    </el-table>
                </div>
                <span class="menudetails_title">顾客备注 : 不要辣</span>
                <span class="f_table_all">小计 : <span>10.00</span> 元</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="menudetails_true_btn">确 定</el-button>
                <el-button @click="menudetails_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                changetable_choosetablevalue:'',
                changetable_choosetabledata:'',
                changetable_chooseareavalue:'',
                changetable_chooseareadata:'',
                dinnerareavalue:'',
                dinnerareadata:[],
                menudetails_list:[
                    {tableData:[
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                    ]},
                    {tableData:[
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                        {data1:'名称',data6:'时蔬',data7:'10.00',data8:'1'},
                    ]},
                ],
                table_list_data:[
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                    {name:'1'},
                ],
                changetable_dialog:false,
                cleartable_dialog:false,
                menudetails_dialog:false,
            }
        },
        mounted: function () {

        },
        methods: {
            //搜索
            querydata(){

            },
            // 换桌弹窗,点击打开
            changetable_btn(){
                this.changetable_dialog = true;
            },
            //换桌弹窗内确定按钮
            changetable_true_btn(){
                this.changetable_dialog = false;
            },
            //清理桌台,打开弹窗
            leartable_btn(){
                this.cleartable_dialog = true;
            },
            //清理桌台弹窗内.点击确认
            leartable_true_btn(){
                this.cleartable_dialog = false;
            },
            menudetails_btn(){
                this.menudetails_dialog = true;
            },
            menudetails_true_btn(){
                this.menudetails_dialog = false;
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
    .table_list{
        display: flex;
        flex-wrap:wrap;
    }
    .table_item{
        width: 170px;
        height:167px;
        border:1px solid #ddd;
        border-radius:6px;
        margin: 15px;
    }
    .table_item .table_list_title{
        border-bottom: 1px solid #ddd;
        background-color: #f5f5f5;
        color:#333;
        font-size:14px;
        font-weight: 600;
        text-align: center;
        line-height: 30px;
        height: 30px;
    }
    .table_item .table_list_content{
        height: 102px;
        text-align: center;
    }
    .table_item .table_list_content p:nth-of-type(1){
        font-size: 12px;
        padding-top:16px;
        line-height: 20px;
    }
    .table_item .table_list_content p:nth-of-type(2){
        font-size: 12px;
    }
    .table_item .table_list_bottom{
        font-size: 0px;
        border-top:1px solid #ddd;
    }
    .table_item .table_list_bottom .el-button{
        width: 81px;
    }
    .selet_box{
        display: inline-block;
        margin: 16px 25px;
    }
    .selet_box span{
        display: inline-block;
        margin-bottom: 10px;
    }
    .menudetails_alltitle{
        font-size: 16px;
        font-weight: 600;
        color: #333;
        
    }
    .menudetails_style .el-dialog__body{
        padding: 20px;
    }   
    .details_list_item{
        margin-top: 26px;
        margin-bottom:26px;
    }
    .f_table_all{
        float: right;
        color: #333;
    }
    .f_table_all span{
        color:red;
        font-size: 24px;
    }
    .menudetails_title{
        color:#888;
        font-size: 16px;
        display: inline-block;
        margin-top: 6px;
    }
    .menudetails_style .el-table td,.menudetails_style .el-table th.is-leaf {
         height: 38px; 
    }
</style>
