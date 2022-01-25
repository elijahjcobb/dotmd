/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  optimizeFonts: false,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    swSrc: "/service-worker.js"
  },
})