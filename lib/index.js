'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (api) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var paths = api.paths,
      cwd = api.cwd,
      compatDirname = api.compatDirname,
      winPath = api.winPath;

  var isDev = process.env.NODE_ENV === 'development';
  var isProduction = process.env.NODE_ENV === 'production';
  // 监听插件配置变化
  api.onOptionChange(function (newOpts) {
    opts = newOpts;
    api.rebuildTmpFiles();
  });
  api.log.debug(api.registerGenerator);
  api.registerGenerator('pro:table', {
    Generator: require('./model').default(api),
    resolved: (0, _path.join)(__dirname, './model')
  });
};

var _fs = require('fs');

var _path = require('path');

var _umiUtils = require('umi-utils');