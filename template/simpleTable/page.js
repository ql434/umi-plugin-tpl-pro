/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     标准查询表格页面
 * @authors:  umi-plugin-tpl-pro生成
 * @date      18/11/15
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  DatePicker,
  Button,
  Divider,
  Input,
  notification,
  Popconfirm,
  Modal
} from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import StandardTable from '@/components/StandardTable';
import styles from './List.less';


// 页面功能配置
const PAGE_CONFIG = {
  selectedRows: [],
  showDel: true,
  showAdd: true,
  title: '这里是标题，不要记得删掉'
};


const { Option } = Select;
const { Group: ButtonGroup } = Button;

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
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

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, loading } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue, form.resetFields);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新增"
      visible={modalVisible}
      confirmLoading={loading}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="输入1">
        {form.getFieldDecorator('input1', {
          rules: [{ required: true, message: '请输入xxx！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="输入2">
        {form.getFieldDecorator('input2', {
          rules: [{ required: true, message: '请输入xxx！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});


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
  del(params, callback) {
    dispatch({
      type: '<%= modelName %>/delItem',
      payload: params,
      callback
    });
  },
  add(params, callback) {
    dispatch({
      type: '<%= modelName %>/addItem',
      payload: params,
      callback
    });
  }
});

@connect(
  ({ loading, <%= modelName %> }) => ({
    listLoading: loading.effects['<%= modelName %>/fetchList'],
    addLoading: loading.effects['<%= modelName %>/addItem'],
    model: <%= modelName %>,
  }),
  mapDispatchToProps
)
@Form.create({})
class <%= name %> extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      // 删掉这行，所有多项操作都会隐藏掉
      selectedRows: PAGE_CONFIG.selectedRows,
      modalVisible: false,
    };
  }

  componentDidMount() {
    // this.props.queryInit();
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
    const { form, queryList } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });
      queryList({
        current: 1,
        pageSize: 10,
        ...fieldsValue,
      });
      // warning,调试参数，调试完成请移除,时间格式为moment，请自行处理
      console.log('搜索参数', {
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
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'col3',
        dataIndex: 'col3',
        key: 'col3',
      },
      {
        title: 'col4',
        dataIndex: 'col4',
        key: 'col4',
      },
      {
        title: 'col5',
        dataIndex: 'col5',
        key: 'col5',
      },
      {
        title: 'col6',
        dataIndex: 'col6',
        key: 'col6',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'id',
        fixed: 'right',
        width: 150,
        render(id) {
          const operateList = [];
          operateList.push(<a style={!PAGE_CONFIG.showDel ? { cursor: "not-allowed" } : null}>详情</a>);
          operateList.push(<Divider type="vertical" />);
          operateList.push(
            <Popconfirm title="确定删除?" onConfirm={() => that.del(id)}>
              <a disabled={!PAGE_CONFIG.showDel}>删除</a>
            </Popconfirm>);
          return operateList;
        },
      },
    ];
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, callback) => {
    const { add } = this.props;
    add(fields, () => {
      notification.success({
        message: '添加成功',
      });
      this.handleModalVisible();
      callback(); // 成功后才清空表单
    })

  };

  // 可以要求后端接口支持批量操作，按，分隔
  del = (id) => {
    const { del, queryList } = this.props;
    const { formValues } = this.state;
    del({ id }, () => {
      notification.success({
        message: '删除成功',
      });
      queryList(formValues);
    })
  };

  bulkDel = () => {
    const { selectedRows } = this.state;
    // 只传id
    this.del(selectedRows.map(({ id }) => id).join(','));
  };

  bulkAction = () => {
    const { selectedRows } = this.state;
    // 只传id
    console.log(selectedRows.map(({ id }) => id).join(','))
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
      model: {
        initData: {
          select = []
        }
      },
      listLoading,
    } = this.props;
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
      <Form onSubmit={this.handleSearch}>
        <Row>
          <Col md={8} sm={24}>
            <FormItem label="下拉列表" {...formItemLayout} required>
              {getFieldDecorator('select', {
                rules: [{ type: 'string', required: true, message: '请选择子项!' }],
              })(
                <Select
                  showSearch
                  placeholder="请选择xxx"
                >
                  {select.map(d => (
                    <Option key={d.value}>{d.label}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="输入项1" {...formItemLayout} required>
              {getFieldDecorator('input1', {
                rules: [{ required: true, message: '请输入xxx' }],
              })(
                <Input placeholder="请输入xxxx" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="输入项2" {...formItemLayout} required>
              {getFieldDecorator('input2', {
                rules: [{ required: true, message: '请输入xxx' }],
              })(
                <Input placeholder="请输入xxxx" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="输入项3" {...formItemLayout} required>
              {getFieldDecorator('input3', {
                rules: [{ required: true, message: '请输入xxx' }],
              })(
                <Input placeholder="请输入xxxx" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem
              {...formItemLayout}
              label="时间"
            >
              {getFieldDecorator('range-time-picker', rangeConfig)(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span style={{ float: 'right' }}>
              <Button type="primary" htmlType="submit" style={{ marginRight: 24 }} loading={listLoading}>
                查询
              </Button>
              <Button onClick={this.resetForm}>
                重置
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
      listLoading,
      addLoading,
  } = this.props;
    const { selectedRows, modalVisible } = this.state;
    const columns = this.defineColumns();
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout title={PAGE_CONFIG.title}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div> {this.renderForm()}</div>
            <Divider />
            {PAGE_CONFIG.showAdd ?
              <Button onClick={() => this.handleModalVisible(true)} type="primary" style={{ marginBottom: 16 }}>
                新增
              </Button> : null}

            {selectedRows ? (
              <ButtonGroup style={{ marginLeft: 16 }}>
                <Button
                  disabled={!selectedRows || !selectedRows.length}
                  onClick={() => {
                    this.bulkDel()
                  }}
                >
                  批量删除
                </Button>
                <Button
                  disabled={!selectedRows || !selectedRows.length}
                  onClick={() => {
                    this.bulkAction()
                  }}
                >
                  自定义批量操作
                </Button>
              </ButtonGroup>
            ) : null}
            <StandardTable
              columns={columns}
              loading={listLoading}
              data={data}
              selectedRows={selectedRows}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              getCheckboxProps={this.disabledChecked}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} loading={addLoading} />
      </PageHeaderLayout>
    );
  }
}

export default <%= name %>;
