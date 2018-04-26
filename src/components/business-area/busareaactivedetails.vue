<!--单品券列表/积分抵现/查看详情-->

<template>
  <div class="main">
    <div class="ticket_show">
      <div>
        <img src="../../assets/images/ticket.png" alt="">
        <span>{{form.price}}元</span>
        <p>活动时间:2017-09-12至2018-12-12</p>
      </div>

    </div>
    <div class="ticket_rule">
      <span class="ticket_title_all">活动内容</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="标题 :">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="券面额 :">
          <span>{{form.price}} 元</span>
        </el-form-item>
        <el-form-item class="code_shop" label="适用门店 :">
          <span>已选 {{form.shopnumber}} 家门店&#X3000;</span>
          <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
        </el-form-item>
        <el-dialog
            title="适用门店列表"
            v-model="dialogVisible_shopslist"
            size="tiny"
            top="20%">
            <p v-for="item in shops">{{item.value}}</p>
            <span slot="footer" class="dialog-footer">

                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                  </span>
        </el-dialog>
        <el-form-item class="ticket_number" label="数量 :">
          <span>{{form.numberlimit}}</span>
        </el-form-item>
        <el-form-item label="活动时间 :">
          <span>{{form.time}}</span>
        </el-form-item>
        <el-form-item label="使用条件 :">
          <span>消费满 {{form.condition}} 元可用</span>
        </el-form-item>
        <el-dialog
          class="dialog_goodslist"
          title="适用商品列表"
          v-model="dialogVisible_goodslist"
          size="small"
          top="15%">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="code"
              label="商品序号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="kinds"
              label="商品分类">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品价格">
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">

                      <el-button type="primary" @click="dialogVisible_goodslist = false">确 定</el-button>
                      <el-button @click=" dialogVisible_goodslist = false">取 消</el-button>
                  </span>
        </el-dialog>
      </el-form>
      <span class="ticket_title_all">规则设置</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="领取限制 :">
          <span>{{form.getlimit}}</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="每日领取限制 :">
          <span>{{form.dategetlimit}}</span>
        </el-form-item>
        <el-form-item class="ticket_number" label="券有效期 :">
          <span>领取后 {{form.timelimit}} 日内有效</span>
        </el-form-item>
        <el-form-item label="是否需要积分兑换 :">
          <span v-if="form.code_radio == 1">是</span>
          <span v-if="form.code_radio == 2">否</span>
        </el-form-item>
        <el-form-item v-if="form.code_radio == 1" label="兑换所需积分 :">
          <span>{{form.needcode}} 积分</span>
        </el-form-item>
        <el-form-item v-if="form.code_radio == 2"  class="setways" label="投放渠道 :">
          <span v-for="item in wayskinds" class="margin_r_10">{{item.label}}</span>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {queryLogin} from '../../api/CommonMethods'
  import {ipAddress} from '../../service'
  export default {
    data(){
      return {
        wayskinds:[
          {value: '选项1',label: '二维码'},
          {value: '选项2',label: '短链接'},
          {value: '选项3',label: '店铺主页'},
          {value: '选项4',label: '支付成功页'},
          {value: '选项5',label: '口令送'},
        ],
        tableData: [
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
          {code: '1', name: '可口可乐', kinds: '饮料', price: '5.00'},
        ],
        shops: [
          {value: '门店1'},
          {value: '门店2'},
          {value: '门店3'},
          {value: '门店4'},
          {value: '门店5'},
        ],
        dialogVisible_goodslist: false,
        dialogVisible_shopslist: false,
        form: {
          name: '商券通活动',
          price:'20.00',
          shopnumber: '3',
          numberlimit: '不限制',
          time: '2017-05-12 - 2017-05-19',
          condition: '8',
          getlimit: '不限制',
          dategetlimit: '不限制',
          timelimit: '45',
          needcode: '50',
          code_radio:'2',

        }
      }
    },
    methods: {
      back(){
        window.history.back();
      }
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
  .dialog_goodslist .el-table__body-wrapper {
    height: 280px;
  }
</style>
