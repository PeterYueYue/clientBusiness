<!--店铺管理/打印机管理-->
<template>
  <div class="tab_main">
    <div class="tab_header">
      <el-input class="query_input" size="small" placeholder="请输入打印机编号"></el-input>
      <el-button class="query_button" size="small" type="primary">搜 索</el-button>
      <el-button class="f_r" @click="add_cashier = true" size="small" type="primary">+ 添加打印机</el-button>
    </div>
    <div class="tab_list printer">
      <div class="block">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="code"
            label="序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="打印机名称">
          </el-table-column>
          <el-table-column
            prop="number"
            label="打印机编号">
          </el-table-column>
          <el-table-column
            prop="key"
            label="KEY">
          </el-table-column>
          <el-table-column
            prop="kinds"
            label="分类">
          </el-table-column>
          <el-table-column
            prop="terminal"
            label="终端">
          </el-table-column>
          <el-table-column
            prop="set"
            label="操作">
            <template scope="scope">
              <el-button @click="edit_cashier = true" type="text" size="small">编辑</el-button>
              <span style="color: #ddd">&nbsp;|</span>
              <el-button @click="detale_dialog = true" type="text" size="small">删除</el-button>
              <span style="color: #ddd">&nbsp;</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="5"
          layout="total, prev, pager, next,jumper"
          :total="50"
          class="foot_nav">
        </el-pagination>
      </div>
      <el-dialog
        title="编辑收银员信息"
        v-model="edit_cashier"
        size="small"
        top="15%">
        <el-form class="cashier_add_form" ref="form" :model="form" label-width="120px">
          <el-form-item label="名称 :">
            <el-input size="small" v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="编号 :">
            <el-input size="small" v-model="form.name" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="KEY :">
            <el-input size="small" v-model="form.name" placeholder="请输入KEY"></el-input>
          </el-form-item>
          <el-form-item label="分类 :">
            <el-select v-model="selectvalue1" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端 :">
            <el-select v-model="selectvalue2" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">

                                                <el-button type="primary" @click="edit_cashier = false">确 认</el-button>
                                                <el-button @click="edit_cashier = false">取 消</el-button>

                                            </span>
      </el-dialog>
      <el-dialog
        title="编辑收银员信息"
        v-model="add_cashier"
        size="small"
        top="15%">
        <el-form class="cashier_add_form" ref="form" :model="form" label-width="120px">
          <el-form-item label="名称 :">
            <el-input size="small" v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="编号 :">
            <el-input size="small" v-model="form.code" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="KEY :">
            <el-input size="small" v-model="form.key" placeholder="请输入KEY"></el-input>
          </el-form-item>
          <el-form-item label="分类 :">
            <el-select v-model="selectvalue3" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="终端 :">
            <el-select v-model="selectvalue4" placeholder="请选择" size="small">
              <el-option
                v-for="item in selectdata4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                                                <el-button type="primary" @click="add_cashier = false">确 认</el-button>
                                                <el-button @click="add_cashier = false">取 消</el-button>

                                            </span>
      </el-dialog>
      <el-dialog
        title="删除"
        v-model="detale_dialog"
        size="tiny"
        top="35%">
        <p>确认删除打印机设备？</p>
        <span slot="footer" class="dialog-footer">
                                                <el-button type="primary" @click="detale_dialog = false">确 认</el-button>
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
      return {
        selectdata1: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
          {value: '3', label: '选项3'}
        ],
        selectdata2: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
          {value: '3', label: '选项3'}
        ],
        selectdata3: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
          {value: '3', label: '选项3'}
        ],
        selectdata4: [
          {value: '1', label: '选项1'},
          {value: '2', label: '选项2'},
          {value: '3', label: '选项3'}
        ],
        selectvalue1: '',
        selectvalue2: '',
        selectvalue3: '',
        selectvalue4: '',
        radio: '1',
        form: {
          name: '',
          code: '',
          key: '',
          kinds: '',
          terminal: ''
        },
        tableData: [
          {code: "1", name: 'Yx_001', number: 'Yx_001', key: '251516545665', kinds: '飞鸽', terminal: '001'},
          {code: "1", name: 'Yx_001', number: 'Yx_001', key: '251516545665', kinds: '飞鸽', terminal: '001'},
          {code: "1", name: 'Yx_001', number: 'Yx_001', key: '251516545665', kinds: '飞鸽', terminal: '001'},
          {code: "1", name: 'Yx_001', number: 'Yx_001', key: '251516545665', kinds: '飞鸽', terminal: '001'},
          {code: "1", name: 'Yx_001', number: 'Yx_001', key: '251516545665', kinds: '飞鸽', terminal: '001'},
        ],
        edit_cashier: false,
        add_cashier: false,
        detale_dialog: false
      }

    },
    methods: {
      handleCurrentChange(val) {
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
  .cashier_add_form {
    width: 380px;
    margin: 0 auto;
  }

  .printer .el-select {
    width: 260px;
  }

  .printer .el-select .el-input {
    width: 260px;
  }
</style>
