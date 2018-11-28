'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (api) {
  var paths = api.paths,
      config = api.config;

  var absTemplatePath = (0, _path.join)(__dirname, '../template/demo');
  return class Generator extends api.Generator {
    writing() {
      if (config.routes) {
        api.log.error('\u5B9A\u5236\u5316\u8DEF\u7531\uFF0C\u65E0\u6CD5\u81EA\u52A8\u6CE8\u5165\u5230\u8DEF\u7531\u4E2D\uFF0C\u8BF7\u77E5\u6653');
      }
      var name = this.args[0].toString();
      var pathList = name.split('/');
      var modelName = (0, _camelcase2.default)(pathList.join('_'));
      var modName = pathList.pop();
      // pages路径统一规范为大写
      var targetPagePath = pathList.map(function (i) {
        return (0, _camelcase2.default)(i, { pascalCase: true });
      });
      var targetServicePath = pathList.map(function (i) {
        return i.toLocaleLowerCase();
      });
      var pageName = (0, _camelcase2.default)(modName, { pascalCase: true });
      var serviceName = modName.toLocaleLowerCase();
      (0, _assert2.default)(!name.includes('.'), 'path should not contains /, bug got ' + name);
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'page.js'), (0, _path.join)(paths.absPagesPath, targetPagePath.join('/'), pageName + '.js'), {
        name: pageName,
        modelName: modelName
      });
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'page.less'), (0, _path.join)(paths.absPagesPath, targetPagePath.join('/'), pageName + '.less'), {
        color: "red"
      });
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'model.js'), (0, _path.join)(paths.absPagesPath, pathList[0], 'models', modelName + '.js'), {
        name: modelName,
        servicePath: targetServicePath.join('/') + '/' + serviceName
      });
      this.fs.copyTpl((0, _path.join)(absTemplatePath, 'service.js'), (0, _path.join)(paths.absSrcPath, 'services', targetServicePath.join('/'), serviceName + '.js'));
    }
  };
}; /**
    * Copyright(c) Alibaba Group Holding Limited.
    *
    * @file:     写入model
    * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
    * @date      18/11/26
    */