/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     写入model
 * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
 * @date      18/11/26
 */
import { join } from 'path';
import assert from 'assert';
import camelcase from 'camelcase';

export default api => {
  const { paths, config } = api;
  const absTemplatePath = join(__dirname, '../template/simpleTable');
  return class Generator extends api.Generator {
    writing() {
      if (config.routes) {
        api.log.error(`定制化路由，无法自动注入到路由中，请知晓`);
      }
      const name = this.args[0].toString();
      const pathList = name.split('/');
      const modelName = camelcase(pathList.join('_'));
      const modName = pathList.pop();
      // pages路径统一规范为大写
      const targetPagePath = pathList.map(i => camelcase(i, { pascalCase: true }));
      const targetServicePath = pathList.map(i => i.toLocaleLowerCase());
      const pageName = camelcase(modName, { pascalCase: true });
      const serviceName = modName.toLocaleLowerCase();
      assert(
        !name.includes('.'),
        `path should not contains /, bug got ${name}`,
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'page.js'),
        join(paths.absPagesPath, targetPagePath.join('/'), `${pageName}.js`),
        {
          name: pageName,
          modelName:modelName,
        },
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'page.less'),
        join(paths.absPagesPath, targetPagePath.join('/'), `${pageName}.less`),
        {
          color: "red",
        },
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'model.js'),
        join(paths.absPagesPath, pathList[0], 'models', `${modelName}.js`),
        {
          name: modelName,
          servicePath: targetServicePath.join('/') + '/' + serviceName,
        },
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'service.js'),
        join(paths.absSrcPath, 'services', targetServicePath.join('/'), `${serviceName}.js`)
      );
    }
  };
};
