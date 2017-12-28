'use strict';

const path = require('path');

let config = {};

// Logging
config.log = {
  filename: path.resolve(__dirname, '../logs/app.cms.log'),
  level: getLogLevel()
};

config.cms = {
  paths: getCmsPaths(),

  // activated plugins
  plugins: ['test-plugin']
};

module.exports = config;

function getLogLevel() {
  // add any custom logic around log level normalization
  let level = process.env.LOG_LEVEL || 'info';
  return level;
}

function getCmsPaths() {
  let paths = {};
  paths.basepath = path.resolve(__dirname);
  paths.themes = path.join(paths.basepath, 'themes');
  paths.plugins = path.join(paths.basepath, 'plugins');
  return paths;
}
