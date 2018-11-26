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
  console.log(absTemplatePath)
  return class Generator extends api.Generator {
    writing() {
      if (config.routes) {
        throw new Error(`umi g page does not work when config.routes exists`);
      }

      const models = config.singular ? 'model' : 'models';
      const name = this.args[0].toString();
      assert(
        !name.includes('/'),
        `model name should not contains /, bug got ${name}`,
      );

      this.fs.copyTpl(
        join(absTemplatePath, 'model.js'),
        join(paths.absSrcPath, 'model', `${name}.js`),
        {
          name,
        },
      );
    }
  };
};
