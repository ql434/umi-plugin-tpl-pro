/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     demo页面
 * @authors:  umi-plugin-tpl-pro生成
 * @date      18/11/15
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {  Card } from 'antd';
import styles from './<%= name %>.less';

const mapDispatchToProps = dispatch => ({
  queryInit() {
    dispatch({
      type: '<%= modelName %>/fetchInit',
    });
  },
  queryList(params) {
    dispatch({
      type: '<%= modelName %>/fetchList',
      payload: params,
    });
  },
});

@connect(
  state => ({
    loading: state.loading.models.<%= modelName %>,
    model: state.<%= modelName %>,
  }),
  mapDispatchToProps
)
@Form.create({})
class <%= name %> extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  componentDidMount() {
    this.props.queryInit();
  }

  render() {
    const {
      model: { data },
      loading,
    } = this.props;
    const columns = this.defineColumns();
    return (<Card bordered={false} title="<%= name %>">
        <div className={styles.bg}>
          demo页面
        </div>
      </Card>
    );
  }
}

export default <%= name %>;
