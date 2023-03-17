const withTM = require("next-transpile-modules")(["ejs"]);

module.exports = withTM({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.ejs$/,
      use: [
        {
          loader: "ejs-webpack-loader",
          options: {
            data: "data",
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      ],
    });

    return config;
  },
});
