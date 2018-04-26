import axios from 'axios';

import {ipAddress} from '../../../service.js';

//获取门店列表
export const getShopLists = () => {
    return axios.get(`${ipAddress}/front/shop_info!getShopInfoPager.action`).then(res => res.data);
};
//单品券列表
export const getProductList = params => {
  return axios.post(`${ipAddress}/front/inner_voucher!getCircleActiveList.action`, params).then(res => res.data)
};
//单品券/代金券查看流水
export const getActiveWater = params => {
    return axios.post(`${ipAddress}/front/inner_voucher!selectVoucherDetails.action`, params).then(res => res.data);
};

/*
//获取门店列表
export const getShopLists = () => {
    return axios.get(`/front/shop_info!getShopInfoPager.action`).then(res => res.data);
};
//单品券列表
export const getProductList = params => {
  return axios.post(`/front/inner_voucher!getCircleActiveList.action`, params).then(res => res.data)
};
//单品券/代金券查看流水
export const getActiveWater = params => {
    return axios.post(`/front/inner_voucher!selectVoucherDetails.action`, params).then(res => res.data);
};
*/
