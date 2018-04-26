<!--店铺管理/店铺管理-->
<template>
  <div  class="tab_main">
    <div class="tab_header">
      <el-input size="small" placeholder="请输入店铺名称"  @keyup.enter.native="queryList" v-model="name"></el-input>
      <el-button class="query_button" size="small" type="primary" :disabled="disabled" @click="queryList">搜 索</el-button>
      <el-button class="f_r" title="点击将同步刷新口碑门店状态" size="small" type="primary" @click="shangjia_dialog = true">获取最新商户数据</el-button>
    </div>
    <el-dialog
      title="获取最新商户数据"
      v-model="shangjia_dialog"
      size="tiny"
      top="35%">
      <p class="text_center">是否获取最新商户数据?</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="refresh">确 定</el-button>
        <el-button @click="shangjia_dialog = false">取 消</el-button>
       </span>
    </el-dialog>
    <el-dialog
      title="商户二维码"
      v-model="erweima_dialog"
      size="tiny"
      top="15%">
        <div class="pop-img-main img_qr_main">
          <img class="img_qr" :src="imgurl" alt="">
        </div>
    </el-dialog>
    <div class="tab_list">
      <div class="block">
        <el-table
          :data="tableDatas">
          <el-table-column
            prop="num"
            label="序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="shopName"
            label="店铺名称">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="店铺类型">
          </el-table-column>
          <el-table-column
            prop="shopAddr"
            label="店铺地址">
          </el-table-column>
          <el-table-column
            prop="isOnline"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作">
            <template scope="scope">
              <div>
                <el-button @click="QRcode(scope.row.shopId)"  type="text" size="small">二维码</el-button>
                <el-button @click="dowloadImg(scope.row.shopId)"  type="text" size="small">下载</el-button>
              </div>
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
</template>

<script>
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service';

  export default {
    data() {
      return {
        disabled:false,
        shangjia_dialog: false,
        erweima_dialog:false,
        tableDatas: [],
        dataLength: 0,
        name: '',
        imgurl:'',
      }
    },
    mounted: function () {
      queryLogin();
      let data = this.qs.stringify({
        pageNumber: '1',
        pageSize: '10'
      });
      this.getList(data);
//      let url=`${datat}/cunpons/font/login`;
//      alert(url);
    },
    methods: {
      //根据shopId查询二维码图片url
      queryurl(shopid){
        let data = this.qs.stringify({
         'id': shopid
       });
       this.$http.post(`${ipAddress}/front/shop_info!getShopQr.action`, data)
         .then(res => {
            this.imgurl = res.data.content;
         });
      },
      //下载二维码
      dowloadImg: function (data) {
        this.queryurl(data);
        window.open(this.imgurl);
      },
      //展示二维码
      QRcode(data){
        this.queryurl(data);
        this.erweima_dialog = true;
      },
      handleCurrentChange(val) {
        let data = this.qs.stringify({
          pageNumber: val,
          pageSize: '10',
          name: this.name
        });
        this.getList(data);
      },
//      刷新
      refresh: function () {
        this.shangjia_dialog = false
        this.$http.post(`${ipAddress}/front/shop_info!refreshShopInfo.action`)
          .then(res=> {
            if (res.data.status == 'success' && res.data.errorCode == 10000) {
              this.$message('已获取最新商户数据!');
              let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10',
                name: this.name
              });
              this.getList(data);
            }
          })
      },
      getList(data) {
        //post请求
        this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
          .then(res=> {
            this.tableDatas = res.data.content.resultList;
            this.dataLength = res.data.content.totalCount;
          })
      },
      queryList: function () {
        queryLogin();
        let data = this.qs.stringify({
          pageNumber: '1',
          pageSize: '10',
          name: this.name
        });
        this.disabled = true;
        //alert('搜索');
        this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
          .then(res=> {
            this.disabled = false;
            this.tableDatas = res.data.content.resultList;
            this.dataLength = res.data.content.totalCount;
          })
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
  .img_qr{
        width: 300px !important;
        height: 300px !important;
        margin-bottom: 20px;
  }
  .img_qr_main{
    height: 400px !important;
  }
</style>



