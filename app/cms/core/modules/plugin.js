'use strict';

const EventEmitter = require('events').EventEmitter;
const Promise = require('bluebird');

/**
 * Plugin Object Definition
 * All custom plugins must extend this object
 */
class Plugin extends EventEmitter {
  constructor(config, context) {
    super();
    this.config = config;
    this.context = context;
    this.name = config.name || __filename;
  }

  init() {
    // initialization may be async
    return new Promise((resolve, reject) => {
      this.emit('init');
      resolve();
    });
  }
}

module.exports = Plugin;
