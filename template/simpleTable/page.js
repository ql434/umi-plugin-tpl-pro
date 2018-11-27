/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     标准查询表格页面
 * @authors:  umi-plugin-tpl-pro生成
 * @date      18/11/15
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Select, Button, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './<%= name %>.css';

const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const mapDispatchToProps = dispatch => ({
  queryInit() {
    dispatch({
      type: '<%= modelName %>/queryInit',
    });
  },
  queryList(params) {
    dispatch({
      type: '<%= modelName %>/queryList',
      payload: params,
    });
  },
});

@connect(
  state => ({
    loading: state.loading.models['<%= modelName %>'],
    model: state['<%= modelName %>'],
  }),
  mapDispatchToProps
)
@Form.create({})
class CreateSupplier extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  componentDidMount() {
    this.props.queryInit();
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      ...formValues,
      ...filters,
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.props.queryList(params);
    this.setState({
      formValues: params,
    });
  };
  handleSearch = e => {
    if (e) {
      e.preventDefault();
    }
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });
      this.props.queryList({
        current: 1,
        pageSize: 10,
        ...fieldsValue,
      });
    });
  };
  resetForm = () => {
    this.props.form.resetFields();
  };
  /**
   * 定义列
   */
  defineColumns = () => {
    const that = this;
    return [
      {
        title: 'ID',
        dataIndex: 'supplierName',
        key: 'supplierName',
      },
      {
        title: 'Name',
        dataIndex: 'supplierCustId',
        key: 'supplierCustId',
      },
      {
        title: 'col3',
        dataIndex: 'billId',
        key: 'billId',
      },
      {
        title: 'col4',
        dataIndex: 'billId',
        key: 'billId',
      },
      {
        title: 'col5',
        dataIndex: 'billId',
        key: 'billId',
      },
      {
        title: 'col6',
        dataIndex: 'billId',
        key: 'billId',
      },
      {
        title: '操作',
        dataIndex: 'supplierBillId',
        key: 'supplierBillId',
        render(row, record) {
          const operateList = [];
          operateList.push(<a href="#">详情</a>);
          return operateList;
        },
      },
    ];
  };

  renderForm() {
    const {
      form: { getFieldDecorator, getFieldValue },
      model: { prodModel, vendor },
    } = this.props;
    const { prodModel: selectedProdModel } = this.state;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col md={8} sm={24}>
            <FormItem label="产品形态" {...formItemLayout} required>
              {getFieldDecorator('prodModel', {
                initialValue: selectedProdModel,
                rules: [{ type: 'string', required: true, message: '请选择产品形态!' }],
              })(
                <Select
                  disabled
                  showSearch
                  style={{ width: 150 }}
                  placeholder="请选择产品形态"
                  optionFilterProp="children"
                >
                  {prodModel.map(d => (
                    <Option key={d.value}>{d.label}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="供应商" {...formItemLayout} required>
              {getFieldDecorator('vendor', {
                rules: [{ required: true, message: '请选择供应商!' }],
              })(
                <Select prodModel={getFieldValue('prodModel')}>
                  {vendor.map(d => (
                    <Option key={d.value}>{d.label}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span style={{ float: 'right' }}>
              <Button onClick={this.resetForm} style={{ marginRight: 24 }}>
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      model: { data },
      loading,
    } = this.props;
    const columns = this.defineColumns();
    return (<Card bordered={false} title="新建供应商">
        <div className={styles.tableList}>
          <div> {this.renderForm()}</div>
          <Divider />
          <div className={styles.tableListOperator}>
          </div>
          <StandardTable
            columns={columns}
            loading={loading}
            data={data}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
            getCheckboxProps={this.disabledChecked}
          />
        </div>
      </Card>
    );
  }
}

export default CreateSupplier;
