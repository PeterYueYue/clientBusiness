<!--商品管理/编辑商品-->
<template>
  <div class="main">
    <div class="details form_rule_bottom_22">
      <el-form ref="form" :model="form" :rules="addrules" label-width="150px">
        <el-form-item class="goodsname" label="商品名称 : " prop="name">
          <el-input size="small" v-model="form.name" placeholder="输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="所属分类 : " prop="kindsshow">
          <span v-if="form.kindsshow">{{form.kindsshow}}</span>
          <el-button v-if="form.kindsshow" type="text" @click="againchoose">重新选择</el-button>
          <el-button v-if="!form.kindsshow" type="text" @click="dialogVisible_querykinds = true">选择分类</el-button>
        </el-form-item>
        <el-form-item class="goodsnumber" label="商品数量 : " prop="number" >
          <el-input size="small" type="number" v-model="form.number"  placeholder="输入商品数量"></el-input>
        </el-form-item>
        <el-form-item class="goodsnumber" label="商品价格 : " prop="price">
          <el-input size="small" type="number" v-model="form.price" placeholder="输入商品价格"></el-input>
        </el-form-item>
        <el-form-item class="add_goods_img" label="商品图片 : " prop ="goodsimgurl" >
          <img :src="form.imgStore" alt="">
          <el-upload
            class="avatar-uploader"
            action="/front/file!fileUpload.action"
            :data="shopid"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="goodscode" label="商品编码 : " prop="goodsSn">
          <input class="code_input"  maxlength="50" v-model="form.goodsSn" onKeyUp="value=value.replace(/[\W]/g,'')" placeholder="输入商品编码"/>
        </el-form-item>
        <el-form-item class="goodscode" label="商品安全库存 : " >
          <input class="code_input"  maxlength="50" v-model="form.safeStock"  placeholder="输入商品编码"/>
        </el-form-item>
        <el-form-item class="goodsdes" label="商品介绍 : ">
          <el-input
            v-model="form.des"
            type="textarea"
            :rows="4"
            resize='none'
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item  label="上架门店 : " prop="sendshopdata" >
            <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
            <!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
            <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
            <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店</el-button>
        </el-form-item>
        <!--选择商品类别弹窗-->
        <el-dialog
          title="商品类别管理"
          v-model="dialogVisible_querykinds"
          size="tiny"
          top="20%"
          class="querykinds">
          <div class="kinds_main">
            <div>
              <el-input
                v-model="kindsqueryname"
                size="small"
                placeholder="请输入要搜索的分类名称">
              </el-input>
              <el-button size="small" @click="getkindsList" type="primary">搜 索</el-button>

              <el-button class="add_kinds" size="small" @click="addkinds_btn">添加分类</el-button>
            </div>
            <div class="kinds_list">
              <el-checkbox-group v-model="checkList">
                  <el-radio-group v-model="radio">
                    <div class="check_divbox" v-for="item in kindsObjects">
                      <el-radio :label="item.id" :key="item.id">{{item.name}}</el-radio>
                    </div>
                  </el-radio-group>
              </el-checkbox-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="truechoose">确 定</el-button>
             <el-button @click="dialogVisible_querykinds = false">取 消</el-button>

          </span>
        </el-dialog>
        <!--选择适用门店弹窗(添加分类里面的)-->
                <el-dialog
                  title="选择适用门店"
                  v-model="kinds_dialogVisible_queryshops"
                  size="small"
                  top="20%"
                  class="querykinds">
                  <div class="kinds_main">
                    <div class="shopkinds_list">
                      <el-checkbox :indeterminate="kinds_isIndeterminate" v-model="kinds_checkAll" @change="kinds_handleCheckAllChange">全选</el-checkbox>
                      <el-checkbox-group v-model="kinds_checkedshops" @change="kinds_handleCheckedCitiesChange">
                        <div class="check_divbox" v-for="item in kinds_Objects">
                          <el-checkbox  :label="item.id" :key="item.id">{{item.shopName}}</el-checkbox>
                        </div>

                      </el-checkbox-group>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                     <el-button type="primary" @click="kinds_queryshops_btn">确 定</el-button>
                    <el-button @click="kinds_dialogVisible_queryshops = false">取 消</el-button>

                  </span>
                </el-dialog>
        <!--选择类别里面的添加分类弹窗-->
        <el-dialog
          title="添加类别管理"
          v-model="dialogVisible_add"
          size="tiny"
          top="25%">
          <div class="add_main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <el-form-item label="商品类别名称 :" prop="name">
                <el-input size='small' v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="排序码 :" prop="number">
                <el-input type="number" size='small' v-model="ruleForm.number"></el-input>
              </el-form-item>
              <el-form-item label="适应门店 :" prop="sendshopdata">
                <div>
                  <span v-if="ruleForm.kinds_shopsnumber">已选择{{ruleForm.kinds_shopsnumber}}家门店</span>
                  <!--<el-button v-if="this.kinds_shopsnumber" type="text" @click="kinds_dialogVisible_queryshops = true">点击查看</el-button>-->
                  <el-button v-if="ruleForm.kinds_shopsnumber" type="text" @click="kinds_againchooseshop">重新选择</el-button>
                  <el-button v-if="!ruleForm.kinds_shopsnumber" type="text" @click="kinds_dialogVisible_queryshops = true">选择门店</el-button>
                </div>

              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="addkinds_c('ruleForm')">确 定</el-button>
                            <el-button @click="dialogVisible_add = false">取 消</el-button>
                        </span>
        </el-dialog>
        <!--选择上架门店弹窗-->
        <el-dialog
          title="选择上架门店"
          v-model="dialogVisible_queryshops"
          size="small"
          top="20%"
          class="querykinds">
          <div class="kinds_main">
            <div class="shopkinds_list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                <div class="check_divbox" v-for="item in shopObjects">
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
        <el-form-item class="goods_add_bottom">

          <el-button class="bottom_button" @click="addgoods('form')" size="small" type="primary">提 交</el-button>
          <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  import {queryLogin} from '../../../api/CommonMethods'
  import {ipAddress} from '../../../service'
  export default {

    data() {
      var validatePass=(rule, value, callback) => {
        if (value <0) {
          callback(new Error('商品数量大于等于0'));
        }
          callback();
      };
      var pricevalidate=(rule, value, callback) => {
        if (value <0) {
          callback(new Error('商品价格大于等于0'));
        }
          callback();
      };
      var shopdatavalidate=(rule, value, callback) => {
        if (value ==="") {
          callback(new Error('请选择上架门店'));
        }
          callback();
      };
      return {
        shopid:{id:'',source:'goods'},
        kindsqueryname:'',
        goodsid_q:'',

        shopsnumber:'',
        kinds_shopnumber:'',
        isIndeterminate:true,
        kinds_isIndeterminate:true,
        checkAll:false,
        kinds_shopsnumber:0,
        kinds_checkAll:false,
        kinds_checkedshops:[],
        checkedshops:[],

        //添加商品表单的验证
        addrules:{
          number:[{ required: true, message: '请输入商品数量', trigger: 'blur' },
                 {validator: validatePass, trigger: 'change'}],
          name:[{ required: true, message: '请输入商品名称', trigger: 'blur' },
                { max:10,message:'商品名称在10个字符以内',target:'change'}],
          kindsshow:[{required: true, message: ' ', trigger: 'change' }],
          price:[{required: true, message: '请输入商品价格', trigger: 'blur' },
              {validator: pricevalidate, trigger: 'change'}],
          goodsimgurl:[{required: true, message: ' ', trigger: 'change' }],
          goodsSn:[{required: true,message:'请填写商品编码',trigger:'change'}],
          sendshopdata:[{ required: true, message: ' ', trigger: 'change'}],
        },
        rules:{
          name:[
            {required: true, message: '请输入商品类别', trigger: 'blur'},
            {max:10,message:'商品类别名称不能超过10个字符',trigger:'change'}
          ],
          number:[
             {required: true, message: '排序码不能为空', trigger: 'blur'},
             {max:10, message: '排序码不得多于5位', trigger: 'blur'},
          ],
          sendshopdata:[
            {required:true,message:' ',trigger: 'blur'}
          ]
        },

        radio:'',
        imageUrl: '',
        dialogVisible: false,
        dialogVisible_add: false,
        ruleForm: {
          kinds_shopsnumber:'',
          name: "",
          number: "",
          sendshopdata:'',
        },
        checkList: [],
        checkedshopstrue:[],
        kinds_checkedshopstrue:[],
        shopObjects: [],
        kindsObjects:[],
        kinds_Objects: [],
        fileList2: [],
        hhddatas2:[],
        kinds_hhddatas2:[],
        form: {
          imgStore:'',
          kindsshow:'',
          name: '',
          number:'',
          goodsSn:'',
          des:'',
          price:'',
          goodsimgurl:'',
          sendshopdata:'',
          safeStock:'',
        },
        kinds: [{kind: "aaaa"}, {kind: "bbbb"}, {kind: "cccc"}],
        dialogVisible_querykinds: false,
        dialogVisible_queryshops:false,
        kinds_dialogVisible_queryshops:false
      }
    },
    mounted:function () {
        queryLogin();
        this.cookie();
      //获取店铺列表
        this.getshopList();
        //获取分类列表
        this.getkindsList();
        //获取当前商品的详情信息
        this.getgoodsdetail();
    },
    methods: {
      cookie(){
        function getCookie(cookieName) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split("; ");
            for(var i = 0; i < arrCookie.length; i++){
                var arr = arrCookie[i].split("=");
                if(cookieName == arr[0]){
                    return arr[1];
                }
            }
            return "";
        }
        var user_id  = getCookie("ENTITY_ID");
        this.shopid.id = user_id ;
      },
      //获取当前商品的详情信息
      getgoodsdetail(){
        let data = this.qs.stringify({
          id:this.goodsid_q,
        })
        this.$http.post(`${ipAddress}/front/goods!getGoodsById.action`,data)
                .then(res => {
                  this.form.name = res.data.content.name;
                  this.form.goodsSn = res.data.content.goodsSn;
                  this.form.number = res.data.content.quantity.toString();
                  this.form.price = res.data.content.price.toString();
                  this.form.goodsimgurl = res.data.content.imgStore.toString();
                  this.imageUrl = res.data.content.imgStore;
                  this.form.kindsshow = res.data.content.goodsCategoryName;
                  this.form.des = res.data.content.introduction;
                  this.form.safeStock = res.data.content.safeStock;
                  this.checkedshopstrue = res.data.content.shopInfoIds;
                  this.form.sendshopdata = this.checkedshopstrue.join();
                  this.radio = res.data.content.goodsCategoryId;
                  this.shopsnumber = res.data.content.shopInfoIds.length;
                  this.handleAvatarSuccess();
                })
      },
      //添加分类按钮
      addkinds_btn(){
        this.dialogVisible_add = true;
        this.ruleForm.name = '';
        this.ruleForm.number = '';
        this.ruleForm.sendshopdata = '';
        this.ruleForm.kinds_shopsnumber = '';
      },
      //弹框里面的增加分类
      addkinds_c(form){
        queryLogin();
        this.$refs[form].validate((valid) => {
          if (valid) {
              let data = this.qs.stringify({
                name:this.ruleForm.name,
                orderList:this.ruleForm.number,
                isShow:true,
                shopInfoIds:this.ruleForm.sendshopdata
              })
              this.$http.post(`${ipAddress}/front/goods_category!saveGoodsCategory.action`,data)
                .then( res => {
                  this.dialogVisible_add = false;
                  this.getkindsList();
                })
              } else {
            return false;
          }
        });
      },
      //添加商品接口
      addgoods(form){
        queryLogin();
        this.$refs[form].validate((valid) => {
          if (valid) {
              var goodsdata = {
                  id:this.goodsid_q,
                  name:this.form.name,
                  introduction:this.form.des,
                  quantity:this.form.number,
                  imgStore:this.form.goodsimgurl,
                  goodsSn:this.form.goodsSn,
                  price:this.form.price,
                  safeStock:this.form.safeStock,
                  isPublish:true,
                  goodsCategoryId:this.radio,
                  shopInfoIds:this.form.sendshopdata
              };
              let data=this.qs.stringify(goodsdata);
              this.$http.post(`${ipAddress}/front/goods!updateGoods.action`,data)
                .then(res => {
                  if(res.data.status == "success"){
                    this.$message.success('编辑成功!');
                    this.$router.push({path: "/goodstool"})
                  }else if(res.data.status == "error"){
                    this.$message.error('编辑失败!');
                  }
                })
          } else {
            this.$message.error('商品信息填写不完整，请重新填写！')
            return false;
          }
        });
      },
      //获取门店列表
      getshopList(){
        let data = this.qs.stringify({
          pageNumber:'1',
          pageSize:'1000'
        });
       this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`,data)
          .then( res => {
            this.shopObjects = res.data.content.resultList;
            this.kinds_Objects = res.data.content.resultList;
          })
      },
      //获取分类列表
      getkindsList(){
        queryLogin();
        let data = this.qs.stringify({
          pageNumber:'1',
          pageSize:'10000',
          name:this.kindsqueryname
        })
        this.$http.post(`${ipAddress}/front/goods_category!getGoodsCategoryPager.action`,data)
          .then( res => {
            this.kindsObjects = res.data.content.resultList;
          })
      },
      //上架门店重新选择
      againchooseshop(){
        this.dialogVisible_queryshops = true;
        this.checkedshops = this.checkedshopstrue;
      },
      //选择类别里面的添加分类弹窗()重新选择按钮
      kinds_againchooseshop(){
        this.kinds_dialogVisible_queryshops = true;
        this.kinds_checkedshops = this.kinds_checkedshopstrue;
      },
      // 上架门店确定
      queryshops_btn(){
        this.dialogVisible_queryshops = false;
        this.checkedshopstrue = this.checkedshops;
        for(var i = 0;i<this.checkedshopstrue.length;i++){
          this.form.sendshopdata = this.form.sendshopdata + this.checkedshopstrue[i]+','
        }
        this.form.sendshopdata=this.form.sendshopdata.substring(0,this.form.sendshopdata.length-1);
        this.shopsnumber = this.checkedshopstrue.length;
      },
      //选择适用门店弹窗(选择分类里面的)确定按钮
      kinds_queryshops_btn(){
        this.kinds_dialogVisible_queryshops = false;
        this.kinds_checkedshopstrue = this.kinds_checkedshops;
        for(var i = 0;i<this.kinds_checkedshopstrue.length;i++){
          this.ruleForm.sendshopdata = this.ruleForm.sendshopdata + this.kinds_checkedshopstrue[i]+','
        }
        this.ruleForm.sendshopdata=this.ruleForm.sendshopdata.substring(0,this.ruleForm.sendshopdata.length-1);
        this.ruleForm.kinds_shopsnumber = this.kinds_checkedshopstrue.length;
      },

      //上架门店全选
      handleCheckAllChange(event) {
        this.hhddatas2 = [];
        for(var i = 0;i<this.shopObjects.length;i++){
          this.hhddatas2.push(this.shopObjects[i].id);
        }
        this.checkedshops = event.target.checked ? this.hhddatas2 : [];
        this.isIndeterminate = false;
      },
      //上架门店全选(上架门店选择改变时)
      kinds_handleCheckAllChange(event) {
        this.kinds_hhddatas2 = [];
        for(var i = 0;i<this.kinds_Objects.length;i++){
          this.kinds_hhddatas2.push(this.kinds_Objects[i].id);
        }
        this.kinds_checkedshops = event.target.checked ? this.kinds_hhddatas2 : [];
        this.kinds_isIndeterminate = false;
      },
      //上架门店选择改变时
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.shopObjects.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
      },
      //上架门店选择改变时(上架门店选择改变时)
      kinds_handleCheckedCitiesChange(value) {
        let kinds_checkedCount = value.length;
        this.kinds_checkAll = kinds_checkedCount === this.kinds_Objects.length;
        this.kinds_isIndeterminate = kinds_checkedCount > 0 && kinds_checkedCount < this.kinds_hhddatas2.length;
      },
      //重新选择所属分类
      againchoose(){
        this.dialogVisible_querykinds = true;
        for(var i=0 ;i<this.kindsObjects.length;i++){
          if(this.kindsObjects[i].name == this.form.kindsshow){
            this.radio = this.kindsObjects[i].id;
          }
        }
      },
      //选择所属分类弹框确定按钮
      truechoose(){
        for(var i=0 ;i<this.kindsObjects.length;i++){
          if(this.kindsObjects[i].id == this.radio){
            this.form.kindsshow = this.kindsObjects[i].name;
          }
        }
        this.dialogVisible_querykinds = false;
      },
      //返回
      back(){
        this.$router.go(-1);
      },
      //上传图片成功之后
      handleAvatarSuccess(response, file, fileList){
        if(response.error == 0){
          this.imageUrl = file.url;
          this.$message('上传成功!');
          this.form.goodsimgurl = response.url;
        }else if(response.error == 1){
          this.$message('上传失败,请重新上传!');
        }
      },
      beforeAvatarUpload(file) {
        queryLogin();
        this.$message('正在上传商品图片!');
      }
    },
    created: function () {
      var id = this.$route.query.id;
      this.goodsid_q = id;
      var curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    }
  }
</script>

<style>

</style>
