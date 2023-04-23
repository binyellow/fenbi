import { DefaultConfig } from "./config.default";

export default () => {
  const config: DefaultConfig = {};
  config.news = {
    pageSize: 20,
  };

  config.fenbi = {
    cookie:
      "acw_tc=0bd17c6a16820688217995962e75826bbd8501ad734b6cb97e2ac07b1f1dd4; sajssdk_2015_cross_new_user=1; userid=82100358; sess=wNfmjmXUtv8mpVRRtbZ372Otroy+BD8+rPMSwNURKZrCWWIaGW/9etZJyffBqrbmE3pUIi/daTwRBEsrke795PEr+F4twbauFD+QJV3hza0=; sid=1563765; persistent=r4U1V5PgTWm+foltPVvgPrx4L5vsDFjxsQtuLTYbGybF/mQZAC6lHzdSv45sFv8Gtb0u6i8tL08aFwfxJOyH9g==; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2282100358%22%2C%22first_id%22%3A%22187a31d7a437cd-07daf973dd0689-1d525634-1484784-187a31d7a4411fe%22%2C%22props%22%3A%7B%7D%2C%22%24device_id%22%3A%22187a31d7a437cd-07daf973dd0689-1d525634-1484784-187a31d7a4411fe%22%7D",
  };

  config.mongoose = {
    client: {
      url: "mongodb://127.0.0.1/fenbi",
      options: {
        user: "admin",
        pass: "123456",
        authSource: "admin",
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };
  return config;
};
