'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
  console.log(absTemplatePath);
  return function (_api$Generator) {
    _inherits(Generator, _api$Generator);

    function Generator() {
      _classCallCheck(this, Generator);

      return _possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).apply(this, arguments));
    }

    _createClass(Generator, [{
      key: 'writing',
      value: function writing() {
        if (config.routes) {
          throw new Error('umi g page does not work when config.routes exists');
        }

        var models = config.singular ? 'model' : 'models';
        var name = this.args[0].toString();
        (0, _assert2.default)(!name.includes('/'), 'model name should not contains /, bug got ' + name);

        this.fs.copyTpl((0, _path.join)(absTemplatePath, 'model.js'), (0, _path.join)(paths.absSrcPath, 'model', name + '.js'), {
          name: name
        });
      }
    }]);

    return Generator;
  }(api.Generator);
};