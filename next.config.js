const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes the multiple lockfile/outputFileTracingRoot warning
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = nextConfig;