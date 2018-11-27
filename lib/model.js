'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     写入model
 * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
 * @date      18/11/26
 */
exports.default = function (api) {
  var paths = api.paths,
      config = api.config;

  var absTemplatePath = (0, _path.join)(__dirname, '../template/simpleTable');
  return class Generator extends api.Generator {
    writing() {
      if (config.routes) {
        api.log.error('\u5B9A\u5236\u5316\u8DEF\u7531\uFF0C\u65E0\u6CD5\u81EA\u52A8\u6CE8\u5165\u5230\u8DEF\u7531\u4E2D\uFF0C\u8BF7\u77E5\u6653');
      }
      var models = config.singular ? 'model' : 'models';
      var name = this.args[0].toString();
      (0, _assert2.default)(!name.includes('.'), 'path should not contains /, bug got ' + name);
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'page.js'), (0, _path.join)(paths.absPagesPath, path + '.js'), {
        name: name
      });
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'page.css'), (0, _path.join)(paths.absPagesPath, path + '.css'), {
        color: randomColor().hexString()
      });
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'model.js'), (0, _path.join)(paths.absSrcPath, 'models', name + '.js'), {
        name: name
      });
    }
  };
};