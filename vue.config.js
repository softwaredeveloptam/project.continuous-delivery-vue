module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: "http://localhost:9000",
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
