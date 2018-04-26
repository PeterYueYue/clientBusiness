<!--商品管理/查看商品-->
<template>
  <div class="main">
    <div class="details">
      <el-form ref="form" label-width="150px">
        <el-form-item label="商品名称 : ">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="商品所属分类 : ">
          <span>{{form.goodsCategoryName}}</span>
        </el-form-item>
        <el-form-item label="商品价格 : ">
          <span>{{form.price}}</span>
        </el-form-item>
        <el-form-item label="商品数量 : ">
          <span>{{form.quantity}}</span>
        </el-form-item>
        <el-form-item class="goodscheck_img" label="商品图片 : ">
          <img :src="form.imgStore" alt="">
        </el-form-item>
        <el-form-item label="商品编码 : ">
          <span>{{form.goodsSn}}</span>
        </el-form-item>
        <el-form-item label="商品安全库存 : ">
          <span>{{form.safeStock}}</span>
        </el-form-item>
        <el-form-item label="商品介绍 : ">
          <span>{{form.introduction}}</span>
        </el-form-item>
        <el-form-item label="上架门店 : ">
          <span>已上架{{shopsnumber}}家门店&nbsp; </span>
           <el-button v-if="this.shopsnumber"  type="text" @click="xiajia_dialog = true"> 点击查看</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button" size="small" @click="back" type="primary">返 回</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        title="上架门店"
        v-model="xiajia_dialog"
        size="tiny"
        top="35%">
        <p v-for="item in shopArray">{{item}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="xiajia_dialog = false">确 定</el-button>
          <el-button @click="xiajia_dialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {queryLogin} from '../../../api/CommonMethods'
  import {ipAddress} from '../../../service'
  export default {
    data(){
      return{
        goodsid:'',
        form:[],
        shopsnumber:0,
        xiajia_dialog:false,
        shopArray:[],
      }
    },
    mounted:function(){
      queryLogin();
      this.getdata();
    },
    methods: {

      getdata(){
        let data =this.qs.stringify({
          id:this.goodsid
        })
        this.$http.post(`${ipAddress}/front/goods!getGoodsById.action`,data)
          .then( res => {
            this.form = res.data.content;
            this.shopsnumber = res.data.content.shopInfoNames.length;
            this.shopArray = res.data.content.shopInfoNames;
          })
      },
      back(){
        this.$router.go(-1);
      }
    },
    created:function () {
      var curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
      var id = this.$route.query.id;
//      this.getData(id);
      this.goodsid = id;

    }
  }
</script>

<style>
  .details {
    width: 500px;
    margin: 20px auto;
  }

  .goodssize span {
    margin-right: 50px;
    display: inline-block;
    width: 50px;
  }

  .goodssize li {
    height: 28px;
  }

  .goodssize ul {
    margin-bottom: 10px;
  }

  .goodssize ul li.title1 span {
    color: #888;
  }



  .goodscheck_img img {
    border: 1px solid #ddd;
    border-radius: 4px;
    display: inline-block;
    width: 200px;
    max-height: 200px;
  }
</style>
