<!--店铺管理/收银终端管理-->
<template>
  <div class="tab_main">
    <div class="tab_header">
      <el-input class="query_input" size="small" @keyup.enter.native="queryList" v-model="name" placeholder="请输入收银终端编号"></el-input>
      <el-button class="query_button" :disabled="disabled" size="small" type="primary" @click="queryList">搜 索</el-button>
      <el-button class="f_r" @click="click_add_cajas" size="small" type="primary">+ 添加收银终端</el-button>
    </div>
    <div class="tab_list">
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
            prop="number"
            label="终端EN">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="品牌名称">
          </el-table-column>
          <el-table-column
            prop="shopName"
            label="店铺名称">
          </el-table-column>
          <el-table-column
            prop="shopAddr"
            label="店铺地址">
          </el-table-column>
          <el-table-column
            prop="isUse"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="set"
            label="操作">
            <template scope="scope">
              <el-button @click="editCashier(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <!--<span style="color: #ddd">&nbsp;|</span>
              <el-button @click="detale_dialog = true" type="text" size="small">删除</el-button>
              <span style="color: #ddd">&nbsp;</span>-->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next,jumper"
          :total="pageSize"
          class="foot_nav">
        </el-pagination>
      </div>

      <!--编辑-->
      <el-dialog
        title="编辑收银终端"
        v-model="edit_cajas"
        size="small"
        top="20%">

        <el-form class="cashier_add_form" :rules="editrules" ref="editform" :model="editform" label-width="90px">
          <el-form-item class="brandname" label="品牌名称 :" prop="typeId">
              <el-select v-model="editform.typeId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in selectdata1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item class="brandname" label="店铺名称 :" prop="shopInfoId">
            <el-select v-model="editform.shopInfoId" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata"
                :key="item.id"
                :label="item.shopName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端EN :">
            <span>{{editform.number}}</span>
          </el-form-item>
          <el-form-item label="终端描述 :" prop="introduction">
            <el-input
              type="textarea"
              :rows="5"
              resize='none'
              placeholder="请输入终端描述"
              v-model="editform.introduction">
            </el-input>
          </el-form-item>
          <el-form-item label="是否激活 :" prop="isUse">
            <el-radio class="radio" v-model="editform.isUse" label="true">是</el-radio>
            <el-radio class="radio" v-model="editform.isUse" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="changecajasdisabled" @click="changeCashier_btn('editform')">确 认</el-button>
           <el-button @click="edit_cajas = false">取 消</el-button>
        </span>
      </el-dialog>



      <!--添加-->
      <el-dialog
        title="添加收银终端"
        v-model="add_cajas"
        size="small"
        top="20%">
        <el-form class="cashier_add_form" :rules="rules"  ref="form" :model="form" label-width="100px">
          <el-form-item class="brandname" label="品牌名称 :" prop="typeId">
              <el-select v-model="form.typeId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in selectdata1"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="终端EN :" prop="number">
            <el-input size="small" v-model="form.number" placeholder="输入终端EN"></el-input>
          </el-form-item>
          <el-form-item class="brandname" label="店铺名称 :" prop="shopInfoId">
            <el-select v-model="form.shopInfoId" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata"
                :key="item.id"
                :label="item.shopName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端描述 :" prop="introduction">
            <el-input
              type="textarea"
              :rows="5"
              resize='none'
              placeholder="请输入终端描述"
              v-model="form.introduction">
            </el-input>
          </el-form-item>
          <el-form-item label="是否激活 :" prop="isUse">
            <el-radio class="radio" v-model="form.isUse" label="true">是</el-radio>
            <el-radio class="radio" v-model="form.isUse" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary" :disabled="addcajasdisabled" @click="addType_btn('form')">确 认</el-button>
           <el-button @click="add_cajas = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="删除收银终端"
        v-model="detale_dialog"
        size="tiny"
        top="35%">

        <p class="text_center">确认删除此收银终端?</p>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary"  @click="detale_dialog = false">确 定</el-button>
          <el-button @click="detale_dialog = false">取 消</el-button>
       </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service'
  export default {
    data() {
      let validatePass =(rule, value, callback) =>{
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,8}$/;
        if(!reg.test(value)){ 
          callback(new Error('请输入正确 终端EN (数字+字母)'));
        }
        else if (value === '') {
          callback(new Error('请输入终端EN'));
        } else {
          let data = this.qs.stringify({
            number:this.form.number
          });
          this.$http.post(`${ipAddress}/front/terminal!checkNumber.action`,data)
          .then( res => {
            if(res.data.status == false){
              callback(new Error('终端EN已存在'));
            } else{
              callback();
            }
          })
        }
      };
      return {
        disabled:false,
        addcajasdisabled:false,
        changecajasdisabled:false,
        pageval:1,
        tnumber:'',
        tdescribe:'',
        name:'',
        pageSize:0,
        editform: {
          id:'',
          typeId:'',
          isUse: '',
          shopInfoId:'',
          introduction:'',
          number:''
        },
        form: {
          shopInfoId:"",
          number:'',
          introduction: "",
          isUse:'true',
          typeId: "",
        },
        rules: {
          number: [
            {required: true, message: '请输入终端EN', trigger: 'change'},
            {max:8,min:8, message: '请输入8位终端EN', trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' },
          ],
          shopInfoId:[
            {required: true, message: '请选择店铺名称', trigger: 'change'},
          ],
          isUse:[
            {required: true, message: ' ', trigger: 'change'},
          ],
          introduction:[
            {required: true, message: '请输入终端描述', trigger: 'change'},
          ],
          typeId:[
            {required: true, message: '请选择品牌名称', trigger: 'change'},
          ],
        },
        editrules:{
          shopInfoId:[
            {required: true, message: '请选择店铺名称', trigger: 'change'},
          ],
          isUse:[
            {required: true, message: ' ', trigger: 'change'},
          ],
          introduction:[
            {required: true, message: '请输入终端描述', trigger: 'change'},
          ],
          typeId:[
            {required: true, message: '请选择品牌名称', trigger: 'change'},
          ],
        },
        // 添加下拉框数据
        selectdata: [],
        // 编辑下拉框
        selectdata1: [],
        edit_cajas: false,
        add_cajas: false,
        detale_dialog: false,
        tableData: []
      }
    },
    mounted:function () {
      queryLogin();
      let data=this.qs.stringify({
        pageNumber:'1',
        pageSize:'10'
      });
      let page=this.qs.stringify({
          pageNumber:'1',
          pageSize:'10000'
        });
        this.$http.post(`${ipAddress}/front/terminal_type!getTerminalTypePager.action`,page)
          .then(res=>{
            this.selectdata1=res.data.content.resultList;
          });

        this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`,page)
          .then(res=>{
            this.selectdata=res.data.content.resultList;
          });
      this.getList(data)
    },
    methods: {
      //编辑提交
      changeCashier_btn(form){
        queryLogin();
        this.$refs[form].validate((valid)=>{
          if(valid){
            this.changeCashier();
          } else {
              this.$message('输入信息有误！');
              return false;
          }
        })
      },
      // 点击添加收银终端
      click_add_cajas:function(){
        this.add_cajas = true;
        // 重新点击添加的时候,初始化数据
        this.form.shopInfoId = "";
        this.form.number = '';
        this.form.introduction = '';
        this.form.isUse='true';
        this.form.typeId = '';
      },
      //验证(添加)
      addType_btn(form){
        this.$refs[form].validate((valid)=>{
          if(valid){
            this.addType();
          } else {
              this.$message('输入信息有误！');
              return false;
          }
        })
      },
      // 添加收银终端
      addType:function () {
        let data=this.qs.stringify(this.form);
        this.addcajasdisabled = true;
        this.$http.post(`${ipAddress}//front/terminal!saveTerminal.action`,data)
          .then(res=>{
            this.addcajasdisabled = false;
            if(res.data.status == "success"){
              this.add_cajas = false;
              this.$message.success('添加成功!');
              let data1=this.qs.stringify({
                pageNumber:'1',
                pageSize:'10'
              });
              this.getList(data1);
            }else if(res.data.status == "error"){
                this.$message.error(res.data.message);
            }
          });
      },
//      编辑收银员终端
      editCashier:function (index, row) {
        queryLogin();
        this.edit_cajas = true;
        this.editform.id = row.id;
        this.editform.number=row.number;
        this.editform.introduction=row.introduction;
        for(var i = 0;i<this.selectdata.length;i++){
          if(this.selectdata[i].shopName ==row.shopName ){
            this.editform.shopInfoId =this.selectdata[i].id;
          }
        }
        for(var i = 0;i<this.selectdata1.length;i++){
          if(this.selectdata1[i].name ==row.typeName ){
            this.editform.typeId =this.selectdata1[i].id;
          }
        }
        if(row.isUse == '禁用'){
          this.editform.isUse="false";
        }else{
          this.editform.isUse="true";
        }
      },
      //编辑收银终端http请求
      changeCashier:function () {
        queryLogin();
        let datas=this.qs.stringify(this.editform);
        this.changecajasdisabled = true;
        this.$http.post(`${ipAddress}/front/terminal!updateTerminal.action`,datas)
          .then(res=>{
            this.changecajasdisabled  = false;
            if(res.data.status == "success"){
              this.$message("修改成功");
              this.edit_cajas = false;
            }
            let data=this.qs.stringify({
              pageNumber:this.pageval,
              pageSize:'10'
            });
            this.getList(data);
          })
      },
      handleCurrentChange(val) {
        queryLogin();
        this.pageval = val;
        let data=this.qs.stringify({
          pageNumber:val,
          pageSize:'10',
          number:this.name
        });
        this.getList(data)
      },
      queryList:function () {
        queryLogin();
        this.disabled = true;
        let data=this.qs.stringify({
          pageNumber:'1',
          pageSize:'10',
          number:this.name
        });
        this.getList(data)
      },
    //   numberChange:function (data) {
    //     queryLogin();
    //     this.$http.post(`${ipAddress}/front/terminal!checkNumber.action`,data)
    //       .then(function (response){
    //         if(response.data.status == false){
    //           alert('错误了!')
    //         }
    //       })
    //   },
//     进入页面的列表刷新方法
      getList:function (data) {
        this.$http.post(`${ipAddress}/front/terminal!getTerminalPager.action`,data)
          .then( res => {
            this.disabled = false;
            if(res.data.errorCode == 30005){
				      window.location.href = 'http://b.tingzhijun.com/merchant';
            }else{
              this.tableData=res.data.content.resultList;
              this.pageSize=res.data.content.totalCount;
            }
          })
      }
    },
    created: function () {
      let curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    }
  };
</script>

<style>
    .brandname .el-select,.brandname .el-select .el-input{
      width: 290px;
    }
</style>
