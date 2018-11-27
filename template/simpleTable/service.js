/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     简单table页面的请求
 * @authors:  umi-plugin-tpl-pro生成
 * @date      18/11/15
 */

import request from '@/utils/request';
import { getCrmWebHost } from '@/utils/host';

// 任务查询页面初始化参数
const INIT = '/xx/init/data';
const QUERY = '/xx/list';
const ADD = '/add/xx';
const DEL = '/del/xx'; // 目前缺少
const RUN = '/run/xx';

const options = {
  isSimple: true,
  timeout: 120000,
};

export async function init(data) {
  return request(getCrmWebHost() + INIT, data, options);
}

export async function query(data) {
  return request(getCrmWebHost() + QUERY, data, options);
}

export async function add(data) {
  return request(getCrmWebHost() + ADD, data, { ...options, isSimple: false });
}

export async function del(data) {
  return request(getCrmWebHost() + DEL, data, { ...options, isSimple: false });
}

export async function run(data) {
  return request(getCrmWebHost() + RUN, data, { ...options, isSimple: false });
}
