/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
}