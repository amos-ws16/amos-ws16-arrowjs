/**
 * Throw an error if pluginId is not valid.
 */
function ensureValidPluginId (pluginId) {
  if (pluginId === '') {
    throw new Error(`Plugin name missing`)
  }
  if (pluginId.indexOf('/') !== -1) {
    throw new Error(`Invalid plugin name '${pluginId}'`)
  }
}

/**
 * Load and return the plugin stored in  /lib/plugins/pluginId.js.
 */
function loadPlugin (pluginId) {
  ensureValidPluginId(pluginId)

  try {
    return require('./plugins/' + pluginId)
  } catch (err) {
    throw new Error(`Cannot find plugin '${pluginId}'`)
  }
}

module.exports = loadPlugin
