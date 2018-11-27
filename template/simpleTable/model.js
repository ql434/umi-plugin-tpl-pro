/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     简单table页面的model
 * @authors:  umi-plugin-tpl-pro 生成
 * @date      18/11/15
 */

import { init, query, add, del, download, settle } from '@/services/xx/xxx';

export default {
  namespace: '<%= name %>',

  state: {
    formValues: {},
    data: {
      list: [],
      pagination: {},
    },
    initData: {
      carrierList: [],
      dataTypeList: [],
      dataLevelList: [],
      offerNameTypeList: [],
      payTypeList: [],
    },
  },

  effects: {
    *updateForm({ payload }, { put }) {
      yield put({
        type: 'saveForm',
        payload,
      });
    },
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(init, payload);
      yield put({
        type: 'saveInit',
        payload: response,
      });
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *addOffer({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      const { code, data } = response;
      if (code === 0) {
        callback(data);
      }
    },
    *downloadList({ payload, callback }, { call }) {
      const response = yield call(download, payload);
      const { code, data } = response;
      console.log(response);
      if (code === 0) {
        callback(data);
      }
    },
    *delOffer({ payload, callback }, { call }) {
      const response = yield call(del, payload);
      if (response) {
        callback(response);
      }
    },
    *settleSupplier({ payload, callback }, { call }) {
      const response = yield call(settle, payload);
      const { code, data } = response;
      console.log(response);
      if (code === 0) {
        callback(data);
      }
    },
  },

  reducers: {
    saveForm(state, action) {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    },
    saveList(state, action) {
      return {
        ...state,
        data: action.payload || {
          list: [],
          pagination: {},
        },
      };
    },
    saveInit(state, action) {
      return {
        ...state,
        initData: action.payload || {},
      };
    },
  },
};

