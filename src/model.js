/**
 * Copyright(c) Alibaba Group Holding Limited.
 *
 * @file:     写入model
 * @authors:  qiankun <chuck.ql@alibaba-inc.com> (https://work.alibaba-inc.com/work/u/85053)
 * @date      18/11/26
 */
import { join } from 'path';
import assert from 'assert';

export default api => {
  const { paths, config } = api;
  const absTemplatePath = join(__dirname, '../template/simpleTable');
  return class Generator extends api.Generator {
    writing() {
      if (config.routes) {
        api.log.error(`定制化路由，无法自动注入到路由中，请知晓`);
      }
      const models = config.singular ? 'model' : 'models';
      const name = this.args[0].toString();
      assert(
        !name.includes('.'),
        `path should not contains /, bug got ${name}`,
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'page.js'),
        join(paths.absPagesPath, `${path}.js`),
        {
          name,
        },
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'page.css'),
        join(paths.absPagesPath, `${path}.css`),
        {
          color: randomColor().hexString(),
        },
      );
      this.fs.copyTpl(
        join(absTemplatePath, 'model.js'),
        join(paths.absSrcPath, 'models', `${name}.js`),
        {
          name,
        },
      );
    }
  };
};
