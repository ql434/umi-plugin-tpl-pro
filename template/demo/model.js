/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     demo-model
 * @authors:  umi-plugin-tpl-pro 生成
 * @date      18/11/15
 */
import { init, query, add, del, run } from '@/services/<%= servicePath%>';

export default {
  namespace: '<%= name %>',
  state: {
    formValues: {},
    data: {
      list: [],
      pagination: {},
    },
    initData: {},
  },
  effects: {
    * updateForm({ payload }, { put }) {
      yield put({
        type: 'saveForm',
        payload,
      });
    },
    * fetchInit({ payload }, { call, put }) {
      const response = yield call(init, payload);
      yield put({
        type: 'saveInit',
        payload: response,
      });
    },
    * fetchList({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    * addOffer({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      const { code, data } = response;
      if (code === 0) {
        callback(data);
      }
    },
    * delOffer({ payload, callback }, { call }) {
      const response = yield call(del, payload);
      const { code, data } = response;
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

