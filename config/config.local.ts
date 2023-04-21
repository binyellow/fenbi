import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {};
  config.news = {
    pageSize: 20,
  };

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/fenbi",
      options: {
        user: 'admin',
        pass: '123456',
        authSource: 'admin',
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };
  return config;
};
