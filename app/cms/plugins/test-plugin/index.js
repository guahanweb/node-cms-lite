'use strict';

const PLUGIN_NAME = 'test-plugin';

function invoke(Plugin, context) {
  class TestPlugin extends Plugin {
    listen() {
      // attach any additional event listeners
      console.info(`[PLUGIN:${this.name}] listening`);
    }
  }

  const plugin = new TestPlugin({ name: PLUGIN_NAME }, context);
  plugin.on('init', () => {
    plugin.listen();
  });

  return plugin;
}

module.exports = invoke;
