<!--公告活动设置-->
<template>
    <div class="busarea_active_main">
        <el-form label-width="100px" class="announcement">
            <el-form-item label="公告 : " >
                <el-input size="small" placeholder="请填写公告" v-model="announcement"></el-input>
            </el-form-item>
            <el-form-item label="活动与服务 : " >
                <div v-for="(item,index) in deslist" style="margin-bottom: 10px;">
                    <el-input size="small" placeholder="请填写" v-model="item.des"></el-input>
                    <el-button v-if="deslist.length >1" type="text" size="small" @click="removeDomain(item)">删除</el-button>
                </div>
                <el-button v-if="deslist.length<3" type="text" size="small" @click="addDomain">添加</el-button>
            </el-form-item>
            <el-form-item label="营业时间 : " >
                <el-time-picker
                    class="el-time-picker_sq"
                    is-range
                    size="small"
                    format="HH:mm"
                    v-model="business_times"
                    placeholder="选择时间范围,例 9:00 ~ 21:00">
                </el-time-picker>
            </el-form-item>
            <el-form-item label="店铺介绍 : ">
                <el-input resize="none" :rows=row5 type="textarea"  placeholder="请填写店铺介绍" v-model="store_introduction"></el-input>
            </el-form-item>
            <el-form-item>
                <p style="color:red;font-size: 12px;">提示 : 上述设置内容将在顾客点菜页面展示</p>
                <el-button class="bottom_button" size="small" type="primary">提 交</el-button>
                <!--<el-button  type="primary">修 改</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                row5:5,
                announcement:'',
                business_times:'',
                store_introduction:'',
                deslist:[
                    {des:'1'}
                ],
            }
        },
        mounted: function () {

        },
        methods: {
            addDomain(){
                this.deslist.push(
                    {des:''}
                )
            },
            removeDomain(item){
                var index = this.deslist.indexOf(item)
                if (index !== -1) {
                    this.deslist.splice(index, 1)
                }
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
    .announcement{
        width: 500px;
        margin: 0 auto;
        margin-top: 20px;
    }
    .announcement .el-textarea,.announcement .el-input{
        width:300px;
    }
    .announcement .el-form-item {
        margin-bottom: 18px;
    }
    .el-time-spinner__item {
        position: relative;
        top: -9px;
    }
    .has-seconds .el-time-spinner__item {
        position: relative;
        top: 0px;
    }
</style>