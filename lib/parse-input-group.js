/**
 * Transform inputGroups to plugins
 *
 * @param plugins - object whose keys are plugin names and values are plugin
 *                  configurations with the properties 'use' and 'inputs'
 *                  if 'inputs' is not given, there is an 'inputGroup' which is transformed
 *
 * @return a modified configuration
 */
function parseInputGroups (config) {
  let plugins = config.plugins
  // TODO: Add changes in aggregator
  let aggregator = config.aggregator

  const parsedPlugins = {}
  Object.keys(plugins).forEach((key) => {
    let plugin = plugins[key]
    if (!plugin.inputGroup) {
      parsedPlugins[key] = plugin
    } else {
      // Combine the two last arrays
      let last = plugin.inputGroup.pop()
      let secondLast = plugin.inputGroup.pop()
      let current = combineArrays(secondLast, last)

      while (plugin.inputGroup.length > 0) {
        let last = plugin.inputGroup.pop()
        current = combineArrays(last, current)
      }

      for (let idx in current) {
        let pluginInput = current[idx]

        for (let partialIdx in pluginInput) {
          pluginInput[partialIdx] = replaceAll(pluginInput[partialIdx], ', ', '", "')
        }

        let pluginName = key
        for (let inputPathIdx in pluginInput) {
          let inputPath = pluginInput[inputPathIdx]
          pluginName = `${pluginName}-${inputPath}`
        }
        pluginName = replaceAll(replaceAll(pluginName, '[]', ''), '", "', '-')

        // Build new plugin
        parsedPlugins[pluginName] = {
          use: plugin.use,
          input: pluginInput
        }
        // Add params if needed
        if (plugin.params) {
          parsedPlugins[pluginName].params = plugin.params
        }
      }
    }
  })

  // Rebuild config
  config.aggregator = aggregator
  config.plugins = parsedPlugins
  return config
}

/**
 * Replaces all occurences of a string in a string
 *
 * @param str - the string that is under construction
 * @param find - the string that should be replaced
 * @param replace - the string which is 'find' replaced with
 *
 * @return a string
 */
function replaceAll (str, find, replace) {
  return str.split(find).join(replace)
}

/**
 * Combine two arrays into one by combining each value of one array with each value of the other array
 *
 * @param arr1 - an array of strings
 * @param arr2 - an array of strings
 *
 * @return an array containing arrays with all combinations
*/
function combineArrays (arr1, arr2) {
  let combined = []
  for (let idx1 in arr1) {
    if (Array.isArray(arr1[idx1])) {
      arr1[idx1] = arr1[idx1].join(', ')
    }
    for (let idx2 in arr2) {
      if (Array.isArray(arr2[idx2])) {
        arr2[idx2] = arr2[idx2].join(', ')
      }
      combined.push([arr1[idx1], arr2[idx2]])
    }
  }
  return combined
}

module.exports = { parseInputGroups, combineArrays }
