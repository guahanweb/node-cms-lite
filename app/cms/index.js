const config = require('./config');
const logger = require('./logger');

const Core = require('./core');
const context = Core.context;

listen();
bootstrap();
initialize();

/**
 * Set up any global system listeners
 */
function listen() {
  context.on('load', () => {
    logger.info('[CORE] loaded');
  });

  context.on('init', () => {
    logger.info('[CORE] initialized');
  });
}

/**
 * Load in any components, taxonomies or plugins we need
 */
function bootstrap() {
  Core.loadPlugins();
  context.emit('load');
}

/**
 * Initialize all the different pieces of the system
 */
function initialize() {
  Core.initializePlugins()
    .then(() => {
      context.emit('init');
    }, err => {
      logger.error(`[ERROR] ${err}`);
    });
}
