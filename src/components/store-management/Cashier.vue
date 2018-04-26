<!--店铺管理/收银员管理-->
<template>
  <div class="tab_main">
    <div class="tab_header">
      <el-input class="query_input" size="small" @keyup.enter.native="queryList" placeholder="请输入收银员名称/电话" v-model="name"></el-input>
      <el-button class="query_button" size="small" :disabled="disabled" type="primary" @click="queryList">搜 索</el-button>
      <el-button class="f_r" @click="click_add_cashier" size="small" type="primary">+ 添加收银员</el-button>
    </div>
    <div class="tab_list">
      <div class="block">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="realname"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="number"
            label="收银员编号">
          </el-table-column>
          <el-table-column
            prop="terminalNumber"
            label="收银终端号">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="isAccountEnabled"
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
          :total="pageLength"
          class="foot_nav">
        </el-pagination>
      </div>
      <!--编辑收银员弹窗-->
      <el-dialog
        title="编辑收银员信息"
        v-model="edit_cashier"
        size="small"
        top="15%">
        <el-form class="cashier_add_form"
          :rules="editrules"
          ref="editruleform"
          :model="editruleform"
          label-width="120px">
          <el-form-item label="手机号 :">
            <span v-model="editruleform.mobile">{{editruleform.mobile}}</span>
            <!--<el-input size="small" v-model="editruleform.mobile" placeholder="输入登录密码" type="password"></el-input>-->
          </el-form-item>
          <el-form-item label="密码 :" prop="password">
            <el-input size="small" v-model="editruleform.password" placeholder="输入登录密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="password_true">
            <el-input size="small"  v-model="editruleform.password_true" placeholder="确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名 :" prop="realname">
            <el-input size="small" v-model="editruleform.realname" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="收银编号 :" prop="number">
            <el-input size="small" v-model="editruleform.number" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item class="zhongduan" label="收银终端号 :" prop="terminalId">
            <el-select v-model="editruleform.terminalId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in selectdata1"
                  :key="item.value"
                  :label="item.number"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否激活 :" prop="isAccountEnabled()">
            <el-radio class="radio" v-model="editruleform.isAccountEnabled" label="true">是</el-radio>
            <el-radio class="radio" v-model="editruleform.isAccountEnabled" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="changeCashierdisabled" @click="changeCashier_btn('editruleform')">确 认</el-button>
          <el-button @click="edit_cashier = false">取 消</el-button>
        </span>
      </el-dialog>
      <!--添加收银员弹窗-->
      <el-dialog
        title="添加收银员"
        v-model="add_cashier"
        size="small"
        top="15%">
        <el-form
          class="cashier_add_form"
          :rules="addrules"
          ref="addruleform"
          :model="addruleform"
          label-width="120px">
          <el-form-item label="手机号 :" prop="mobile">
            <el-input size="small" v-model="addruleform.mobile" type="number"  placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码 :" prop="password">
            <el-input size="small" v-model="addruleform.password" placeholder="输入登录密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="password_true">
            <el-input size="small" v-model="addruleform.password_true" placeholder="确认密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名 :" prop="realname">
            <el-input size="small" v-model="addruleform.realname" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="收银员编号 :" prop="number">
            <el-input size="small" v-model="addruleform.number" @change="numberChange(addruleform.number)" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item class="zhongduan" label="收银终端号 :" prop="terminalId">
            <el-select v-model="addruleform.terminalId" placeholder="请选择" size="small">
                <el-option
                  v-for="item in selectdata1"
                  :key="item.value"
                  :label="item.number"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否激活 :" prop="isAccountEnabled">
            <el-radio class="radio" v-model="addruleform.isAccountEnabled" label="true">是</el-radio>
            <el-radio class="radio" v-model="addruleform.isAccountEnabled" label="false">否</el-radio>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="addcashierdisabled" @click="addCashier_btn('addruleform')">提 交</el-button>
            <el-button @click="add_cashier = false">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="删除收银员"
        v-model="detale_dialog"
        size="tiny"
        top="35%">
        <p class="text_center">确认删除此收银员?</p>
        <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="detale_dialog = false">确 定</el-button>
           <el-button @click="detale_dialog = false">取 消</el-button>
         </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service'
  import { Loading } from 'element-ui';
  export default {

    data() {
      //添加验证确认密码
      let validatePass = (rule, value, callback) => {
        if (this.addruleform.password_true !== this.addruleform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //编辑验证确认密码
      let edit_validatePass = (rule, value, callback) => {
        if (this.editruleform.password_true !== this.editruleform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //验证收银编号
      let checknumber=(rule, value, callback)=>{
        let code = this.qs.stringify({
              number:value,
            });
            this.$http.post(`${ipAddress}/front/cashier!checkNumber.action`,code)
            .then(res => {
              if(res.data.status == false){
                callback(new Error('收银员编号已存在'));
              } else{
                callback();
              }
            })
      };
      //验证手机号
      let CashierPhone=(rule, value, callback)=>{

          if (/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
            let phone = this.qs.stringify({
              mobile:value,
            });
            this.$http.post(`${ipAddress}/front/cashier!checkMobile.action`,phone)
            .then( res => {
              if(res.data.status == false){
                callback(new Error('手机号码已存在'));
              } else{
                callback();
              }
            })
          }
          else{
            callback(new Error('请输入正确的手机号码格式'));
          }

      };
      return {
        pageval:1,
        disabled:false,
        changeCashierdisabled:false,
        addcashierdisabled:false,
        radio:'',
        name:'',
        pageLength:0,
        addruleform: {
          password_true:'',
          mobile: '',
          password: '',
          realname: '',
          number:'',
          isAccountEnabled:"true",
          terminalId:''
        },
        editruleform: {
          mobile:'',
          password: '',
          password_true:'',
          realname: '',
          number:'',
          isAccountEnabled: '',
          terminalId:''
        },
        // 编辑下拉框数据
        selectdata: [
          {value: '1', label: '1'},
          {value: '2', label: '选项2'},
          {value: '3', label: '选项3'}
        ],
        // 添加下拉框数据
        selectdata1: [],
        addrules: {
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {max: 11, min: 11, message: '请输入正确的手机号码', trigger: 'blur'},
            {validator:CashierPhone , trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入登陆密码', trigger: 'blur'},
            {max: 20, min: 6, message: '密码长度为6-20位', trigger: 'blur'}
          ],
          password_true: [
            {required: true, message: '请再次输入登陆密码', trigger: 'blur'},
            {validator:validatePass , trigger: 'blur'},
          ],
          realname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          number: [
            {required: true, message: '请输入收银员编号', trigger: 'blur'},
            {validator:checknumber , trigger: 'blur'},
          ],
          terminalId: [
            {required: true, message: '请选择收银终端编号', trigger: 'change'},
          ],
          isAccountEnabled:[
            {required: true, message: ' ', trigger: 'change'},
          ]
        },
        editrules: {
          password: [
            {max: 20, min: 6, message: '密码长度为6-20位', trigger: 'blur'}
          ],
          password_true: [
            {validator:edit_validatePass , trigger: 'blur'},
          ],
          realname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          number: [
            {required: true, message: '请输入收银员编号', trigger: 'blur'},
          ],
          terminalId: [
            {required: true, message: '请选择终端号', trigger: 'blur'},
          ],
          isAccountEnabled:[
            {required: true, message: ' ', trigger: 'change'},
          ]
        },
        tableData: [],
        edit_cashier: false,
        add_cashier: false,
        detale_dialog: false
      }

    },
    mounted:function () {
      queryLogin();
      let data=this.qs.stringify({
        pageNumber:'1',
        pageSize:'10'
      });
      this.getList(data);
//      let loadingInstance1 = Loading.service({ fullscreen: true });
    },
    methods:{
      //点击添加收银员的提交按钮
      addCashier_btn(form){
        queryLogin();
        this.$refs[form].validate((valid)=>{
          if(valid){
            this.addCashier();
          } else {
              this.$message('输入信息有误！')
              return false;
          }
        })
      },

//      收银编号是否存在
      numberChange:function (number) {
        queryLogin();
        this.$http.post(`${ipAddress}/front/cashier!checkNumber.action`,number)
          .then(res=>{
            if(res.data.status == false){
            }
          })
      },
//      编辑收银员进入
    editCashier:function(index, row){
      queryLogin();
       this.edit_cashier = true;
       let　iddata = this.qs.stringify({
         id:row.id
       })
       this.$http.post(`${ipAddress}/front/cashier!getCashierById.action`,iddata)
       .then(res => {
         this.editruleform = res.data.content;
         if(res.data.content.isAccountEnabled == '正常'){
           this.editruleform.isAccountEnabled = 'true';
         }else if(res.data.content.isAccountEnabled == '禁用'){
           this.editruleform.isAccountEnabled = 'false';
         }
       })
      },
      //编辑时的验证
      changeCashier_btn(form){
         this.$refs[form].validate((valid)=>{
          if(valid){
            this.changeCashier();
          } else {
              this.$message('输入信息有误！')
              return false;
          }
        })
      },
      //编辑提交
      changeCashier:function () {
        queryLogin();
        let matdata=this.qs.stringify(this.editruleform);
        this.changeCashierdisabled = true;
        this.$http.post(`${ipAddress}/front/cashier!updateCashier.action`,matdata)
          .then(res=>{
            this.changeCashierdisabled = false;
            if(res.data.status == "success"){
              this.$message('编辑成功!');
              this.edit_cashier = false;
            }else if(res.data.status == "error"){
              this.$message('编辑失败!');
            }
          });
        let dataed=this.qs.stringify({
          pageNumber:this.pageval,
          pageSize:'10'
        });
        this.getList(dataed);
      },
      // 点击添加收银员按钮
      click_add_cashier:function(){
        queryLogin();
          this.addruleform.mobile= '';
          this.addruleform.password='';
          this.addruleform.password_true='';
          this.addruleform.realname= '';
          this.addruleform.number='';
          this.addruleform.isAccountEnabled="true";
          this.addruleform.terminalId='';
          this.add_cashier = true;
      },
//      提交添加收银员
      addCashier:function () {
        queryLogin();
        let datae=this.qs.stringify(this.addruleform);
        this.addcashierdisabled = true;
        this.$http.post(`${ipAddress}/front/cashier!saveCashier.action`,datae)
          .then(res=>{
            this.addcashierdisabled = false;
            if(res.data.status == "success"){
              this.$message("收银员添加成功!");
              this.add_cashier = false;
              let datae=this.qs.stringify({
                pageNumber:'1',
                pageSize:'10'
              });
              this.getList(datae);
            }
            else if(res.data.status == "error"){
              this.$message.error("收银员添加失败,请重新填写!");
            }
          })
        let dataP=this.qs.stringify({
          pageNumber:'1',
          pageSize:'10'
        });
        this.getList(dataP);
      },
      handleCurrentChange(val) {
        queryLogin();
        this.pageval=val;
        let data=this.qs.stringify({
          pageNumber:val,
          pageSize:'10',
          realname:this.name
        });
        this.getList(data)
      },
      queryList:function () {
        queryLogin();
        let data=this.qs.stringify({
          pageNumber:'1',
          pageSize:'10',
          realname:this.name
        });
        this.disabled = true;
        this.getList(data);
      },
      getList:function (data) {
        queryLogin();
        this.$http.post(`${ipAddress}/front/cashier!getCashierPager.action`,data)
          .then(res =>{
            this.disabled = false;
            this.tableData=res.data.content.resultList;
            this.pageLength=res.data.content.totalCount;
          })
        this.$http.post(`${ipAddress}/front/terminal!getTerminalPager.action`,data)
          .then(res=>{
            this.selectdata1=res.data.content.resultList;
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
  }
</script>

<style>
  .zhongduan .el-select,.zhongduan .el-select .el-input{
      width: 260px;
    }
  .cashier_add_form {
    width: 380px;
    margin: 0 auto;
  }

  .cashier_add_form .el-form-item {
    margin-bottom: 20px;
  }
</style>
