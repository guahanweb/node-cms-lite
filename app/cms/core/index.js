'use strict';

const config = require('../config');
const EventEmitter = require('events').EventEmitter;
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');

// Set up a context we can use as an event bus
class Context extends EventEmitter {}
const context = new Context();

// Core helper classes
const Plugin = require(path.join(config.cms.paths.basepath, 'core/modules/plugin'));

// Core helper variables
let plugins;

// export hoisted methods
module.exports = {
  context: context,
  loadPlugins: loadPlugins,
  initializePlugins: initializePlugins
};

function loadPlugins() {
  const plugin_path = config.cms.paths.plugins;

  plugins = fs.readdirSync(plugin_path)
    .filter(p => !['.', '..'].includes(p)) // ignore file path
    .map(p => require(path.join(plugin_path, p))(Plugin, context)) // grab the plugins
    .filter(p => true); // TODO: filter invalid plugins
}

function initializePlugins() {
  return Promise.all(plugins.map(plugin => plugin.init()));
}
