// vue.config.js
module.exports = {
    // options...
    // devServer: { port: 3001, proxy: "http://localhost/api" } 
    devServer: {
          proxy: 'http://localhost:3001/',
      }
  }