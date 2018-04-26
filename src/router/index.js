import Vue from 'vue';
import Router from 'vue-router';
//首页
import Home from '@/components/home/Home';

//店铺列表
import Myshop from '@/components/store-management/Myshop';
//扫码点餐
import Foodorder from '@/components/store-management/Foodorder-management/Foodorder';
import activitySettings from '@/components/store-management/Foodorder-management/management/activitySettings';
import billStatistics from '@/components/store-management/Foodorder-management/management/billStatistics';
import orderManagement from '@/components/store-management/Foodorder-management/management/orderManagement';
import tablesManagement from '@/components/store-management/Foodorder-management/management/tablesManagement';

//商品管理
import Goodstool from '@/components/store-management/commodity-management/Goodstool';
//添加商品
import Goodsadd from '@/components/store-management/commodity-management/Goodsadd';
//查看商品
import Goodscheck from '@/components/store-management/commodity-management/Goodscheck';
//编辑商品
import Goodscompile from '@/components/store-management/commodity-management/Goodscompile';
//收银员管理
import Cashier from '@/components/store-management/Cashier';
//收银终端管理
import Cajas from '@/components/store-management/Cajas';
//打印机管理
import Printer from '@/components/store-management/Printer';

//单品营销
// import Outsideticket from '@/components/store-activity/drainage-ticket/Outsideticket';
// import AlreadyScreens from '@/components/store-activity/drainage-ticket/AlreadyScreens';
// import ScreensMarket from '@/components/store-activity/drainage-ticket/ScreensMarket';
// import ActivityList from '@/components/store-activity/drainage-ticket/ActivityList';
// import MyScreen from '@/components/store-activity/drainage-ticket/MyScreen';
// import ScreenWate from '@/components/store-activity/drainage-ticket/ScreenWate';
//列表
import ActiveList from '@/components/store-activity/activity/active-list';
//列表数据
import ActiveDetailsList from '@/components/store-activity/activity/active-details-list';
//代金券创建
import ChitCreation from '@/components/store-activity/activity/ChitCreation';
// 单品券
import Insideticket from '@/components/store-activity/Insideticket';
//单品券列表
import InsideticketList from '@/components/store-activity/InsideticketList';
//代金券列表
import VoucherList from '@/components/store-activity/VoucherList';
//单品券列表查看详情
import Viewdetails from '@/components/store-activity/viewdetails';
//代金券列表查看详情
import VoucherList_viewdetails from '@/components/store-activity/VoucherList_viewdetails';

// 会员管理
import Member from '@/components/member-marketing/Member';
//会员卡管理
import Membercard from '@/components/member-marketing/Membercard';

//卡位营销
//创建券活动tab
import Creatactive from '@/components/card-marketing/creatactive/creatactive';
//创建券活动
import Createcoupons from '@/components/card-marketing/creatactive/createcoupons';
//券活动列表
import CouponsActList from '@/components/card-marketing/creatactive/couponsActList';
//卡券详情
import CouponsActListdetails from '@/components/card-marketing/creatactive/couponsActListdetails';

//我的卡位tab
import Mycards from '@/components/card-marketing/mycards/mycards';
//我代发的券
import Mysendcard from '@/components/card-marketing/mycards/mysendcard';
//我投放的券
import Myputcard from '@/components/card-marketing/mycards/myputcard';

//卡位市场
import CardshopList from '@/components/card-marketing/cardshopList';




// 交易明细
import Dealdetails from '@/components/story-statistics/deal-details';
//退款明细
import Refunddetails from '@/components/story-statistics/refund-details';
//交易汇总
import Summarysheet from '@/components/story-statistics/summary-sheet/summary-sheet';

//商圈代金券
import Busareaactive from '@/components/business-area/busarea-active';
//商圈代金券/查看详情
import Busareaactivedetails from '@/components/business-area/busareaactivedetails';
//营销流水
import Marketinglist from '@/components/business-area/marketinglist';
//商圈活动列表
import List from '@/components/business-area/list/list';
import StampsList from '@/components/business-area/list/stampsList';
import VoucherLists from '@/components/business-area/list/voucherLists';
import IntegralList from '@/components/business-area/list/integralList';
import Details from '@/components/business-area/list/details';
//积分抵现
import Activefigure from '@/components/business-area/active-figure';
//积分抵现/查看详情
import Activefiguredetails from '@/components/business-area/activefiguredetails';
//商圈列表
import Arealist from '@/components/business-area/arealist';


//支付宝现金红包
import Redpacket from '@/components/store-activity/redpacket/redpacket';
import Packettype from '@/components/store-activity/redpacket/packettype';
import Packetnumberdetail from '@/components/store-activity/redpacket/packetnumberdetail';
import Packetactivelist from '@/components/store-activity/redpacket/packetactivelist';

import Payreturn from '@/components/store-activity/redpacket/createpacket/payreturn';
import Pointgive from '@/components/store-activity/redpacket/createpacket/pointgive';


Vue.use(Router)

export default new Router({
  routes: [
    {
      //数据看板
      path: '/',
      component: Home,
      meta: {
        name: '数据看板'
      }
    },
    {
      //我的店铺
      path: '/shop',
      component: Myshop,
      meta: {
        name: '店铺管理'
      }
    },
    {
      //商品管理
      path: '/goodstool',
      component: Goodstool,
      meta: {
        name: '商品管理'
      }
    },
    {
      //商圈代金券
      path: '/busareaactive',
      component: Busareaactive,
      meta: {
        name: '商圈代金券'
      }
    },
    {
      //商圈代金券/查看详情
      path: '/busareaactivedetails',
      component: Busareaactivedetails,
      meta: {
        name: '商圈代金券 > 查看详情'
      }
    },
    {
      //营销流水
      path: '/marketinglist',
      component: Marketinglist,
      meta: {
        name: '营销流水'
      }
    },
    {
      //积分抵现
      path: '/list',
      component: List,
      meta: {
        name: '积分抵现'
      },
      redirect: '/stampsList',
      children: [
        {name: '/stampsList', path: '/stampsList', component: StampsList, meta: {name: '单品券活动'}},
        {name: '/voucherLists', path: '/voucherLists', component: VoucherLists, meta: {name: '代金券活动'}},
        {name: '/integralList', path: '/integralList', component: IntegralList, meta: {name: '积分抵现活动'}},
        {name: '/details', path: '/details', component: Details, meta: {name: '查看详情'}},
      ]
    },
    {
      //积分抵现/查看详情
      path: '/activefiguredetails',
      component: Activefiguredetails,
      meta: {
        name: '积分抵现 > 查看详情'
      }

    },
    {
      //商圈列表
      path: '/Arealist',
      component: Arealist,
      meta: {
        name: '商圈列表'
      }
    },

    {
      //收银员管理
      path: '/cashier',
      component: Cashier,
      meta: {
        name: '收银员管理'
      }
    },
    {
      //交易明细
      path: '/dealdetails',
      component: Dealdetails,
      meta: {
        name: '交易明细'
      }
    },
    {
      //收银员终端管理
      path: '/cajas',
      component: Cajas,
      meta: {
        name: '收银终端管理'
      }
    },
    {
      //扫码点餐
      path: "/foodorder",
      component: Foodorder,
      meta: {
        name: '扫码点餐'
      },
      redirect: '/tablesManagement',
      children: [
        {name:'/tablesManagement',path: '/tablesManagement',component:tablesManagement,meta: {name: '扫码点餐 > 桌台管理'}},
        {name:'/orderManagement',path: '/orderManagement',component:orderManagement,meta: {name: '扫码点餐 > 点餐管理'}},
        {name:'/billStatistics',path: '/billStatistics',component:billStatistics,meta: {name: '扫码点餐 > 账单流水'}},
        {name:'/activitySettings',path: '/activitySettings',component:activitySettings,meta: {name: '扫码点餐 > 公告活动设置'}},
      ]
    },
    {
    //打印机管理
      path: '/printer',
      component: Printer,
      meta: {
        name: '打印机管理'
      }
    },
    {
      //添加商品
      path: '/add',
      component: Goodsadd,
      meta: {
        name: '商品管理 > 添加商品'
      }
    },
    {
      //查看商品
      path: '/goodscheck',
      component: Goodscheck,
      meta: {
        name: '商品管理 > 商品详情'
      }
    },
    {
      //查看商品
      path: '/compile',
      component: Goodscompile,
      meta: {
        name: '商品管理 > 编辑商品'
      }
    },
    {
      //单品券(外部券)
      path: '/active',
      component: ActiveList,
      meta: {
        name: '券活动创建'
      },
      redirect: '/insideticket',
      children: [
        {name: '/insideticket', path: '/insideticket', component: Insideticket, meta: {name: '单品券创建'}},
        {name: '/chitCreation', path: '/chitCreation', component: ChitCreation, meta: {name: '代金券创建'}},
      ]
    },
    {
      //单品券列表
      path: '/activeDetailsList',
      component: ActiveDetailsList,
      meta: {
        name: '单品券列表'
      },
      redirect: '/insideticketList',
      children: [
        {name: '/insideticketList', path: '/insideticketList', component: InsideticketList, meta: {name: '单品券列表'}},
        {name: '/voucherList', path: '/voucherList', component: VoucherList, meta: {name: '代金券列表'}},
      ]
    },
    {
      //单品券列表查看详情
      path: '/VoucherList_viewdetails',
      component: VoucherList_viewdetails,
      meta: {
        name: '代金券列表 > 查看详情'
      }
    }
    ,
    {
      //单品券列表查看详情
      path: '/viewdetails',
      component: Viewdetails,
      meta: {
        name: '单品券列表 > 查看详情'
      }
    }
    ,
    {
      //退款明细
      path: '/refunddetails',
      component: Refunddetails,
      meta: {
        name: '退款明细'
      }
    },

    {
      //交易汇总
      path: '/summarysheet',
      component: Summarysheet,
      meta: {
        name: '交易汇总'
      }
    },
    // {
    //引流券(外部券)
    //   path: '/outsideticket',
    //   component: Outsideticket,
    //   meta: {
    //     name: '引流券(外部券)'
    //   },
    //   children: [{
    //     path: '',
    //     redirect: 'alreadyScreens',
    //     meta: {
    //       hidden: true
    //     }
    //   }, {
    //     path: 'alreadyScreens',
    //     component: AlreadyScreens,
    //     meta: {
    //       name: '引流券/已购卡位'
    //     }
    //   }, {
    //     path: 'screensMarket',
    //     component: ScreensMarket,
    //     meta: {
    //       name: '引流券/卡位市场'
    //     }
    //   }, {
    //     path: 'activityList',
    //     component: ActivityList,
    //     meta: {
    //       name: '引流券/活动列表'
    //     }
    //   }, {
    //     path: 'myScreen',
    //     component: MyScreen,
    //     meta: {
    //       name: '引流券/我的卡位'
    //     }
    //   }, {
    //     path: 'screenWate',
    //     component: ScreenWate,
    //     meta: {
    //       name: '引流券/卡券流水'
    //     }
    //   }

    //   ]
    // },
    {
      //会员管理
      path: '/member',
      component: Member,
      meta: {
        name: '会员管理'
      }
    },
    {
      //会员卡管理
      path: '/membercard',
      component: Membercard,
      meta: {
        name: '会员卡管理'
      }
    },
    {
      //引流券创建
      path: '/creatactive',
      component: Creatactive,
      meta: {
        name: '引流券创建'
      },
      redirect:"/createcoupons",
      children: [
        { name:'/createcoupons',path: '/createcoupons', component: Createcoupons, meta: {name: '引流券创建'}},
        { name:'/couponsActList',path: '/couponsActList', component: CouponsActList, meta: {name: '券活动列表'}}
      ]
    },
    {
      //我的引流券
      path: '/mycards',
      component: Mycards,
      meta: {
        name: '我的引流券'
      },
      redirect:"/mysendcard",
      children: [
        { name: '/mysendcard',path: '/mysendcard', component: Mysendcard, meta: {name: '我代发的券'}},
        { name: '/myputcard', path: '/myputcard', component: Myputcard, meta: {name: '我投放的券'}}
      ]
    },
    {
      //引流券市场
      path: '/cardshopList',
      component: CardshopList,
      meta: {
        name: '引流券市场'
      }
    },
    {
      //卡券详情
      path: '/couponsActListdetails',
      component: CouponsActListdetails,
      meta: {
        name: '卡券详情'
      }
    },
    {
      //支付宝现金红包
      path: '/redPacket',
      component: Redpacket,
      meta: {
        name: '现金红包'
      },
      redirect:'/packettype',
      children: [
        { name:'/packettype',path: '/packettype', component: Packettype, meta: {name: '红包活动类型'}},
        { name:'/packetactivelist',path: '/packetactivelist', component: Packetactivelist, meta: {name: '红活动列表'}}
      ]
    },
    {
      //消费返还
      path: '/payreturn',name:'payreturn',component: Payreturn,meta: {name: '红包活动创建 - 消费返还'}
    },

    {
      //红包用户领取详情
      path: '/pointgive',component: Pointgive,meta: {name: '红包用户领取详情'}
    },
    {
      //红包领取详情
      path: '/packetnumberdetail',component: Packetnumberdetail,meta: {name: '红包领取详情'}
    },
  ]
})
