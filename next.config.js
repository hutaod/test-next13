// const withLess = require("./next-with-less.js");
const withAntdLess = require('next-plugin-antd-less');  

// const path = require('node:path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,  
  // less配置  
  ...withAntdLess({})  
  // webpack(config, options) {
  //   // disable css-module in Next.js
  //   config.module.rules.forEach((rule) => {
  //     const { oneOf } = rule;
  //     if (oneOf) {
  //       oneOf.forEach((one) => {
  //         if (!`${one.issuer?.and}`.includes('_app')) return;
  //         one.issuer.and = [path.resolve(__dirname)];
  //       });
  //     }
  //   })

  //   return config;
  // }
}

module.exports = nextConfig
