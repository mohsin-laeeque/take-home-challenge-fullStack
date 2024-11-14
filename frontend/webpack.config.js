// webpack.config.js
module.exports = {
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // You can customize middlewares here if needed

      // Return the modified middlewares
      return middlewares;
    },
  },
};
