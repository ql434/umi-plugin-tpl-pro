/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     简单table页面的model
 * @authors:  umi-plugin-tpl-pro 生成
 * @date      18/11/15
 */
import { init, query, add, del } from '@/services/<%= servicePath%>';

export default {
  namespace: '<%= name %>',
  state: {
    formValues: {},
    data: {
      list: [
        // 模拟数据，请删除
        {
          name: 'name1',
          id: 1
        },
        {
          name: 'name2',
          id: 2
        }
      ],
      pagination: {},
    },
    initData: {
      // 模拟数据，请删除
      select: [
        {
          label: '下拉项1',
          value: 'select1',
        }, {
          label: '下拉项2',
          value: 'select2',
        }
      ]
    },
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
    * addItem({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      const { code, data } = response;
      if (code === 0) {
        callback(data);
      }
    },
    * delItem({ payload, callback }, { call }) {
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

