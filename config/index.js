const aggregator = require('../lib/score-aggregator')

const config = {}
/**
 * Default config for scoreManager
 *
 * similar-title: compare titles if file and tasks
 * context-file-timestamp-tasks-timestamp: compares timestamps of file and tasks - timeLimit = 600s (default in plugin)
 * context-file-timestamp-tasks-timestamp: compares keywords of file title with keywords of description of tasks
 * context-file-description-task-title: compares keywords of file description with keywords of description of tasks
 * context-file-description-task-description: compares keywords of file description with keywords of description of tasks
*/
config.scoreManager = {
  aggregator: new aggregator.Mean(),
  plugins: {
    // similar-title-plugin pulls file.name from file and tasks[].name from tasks[] itself
    'similar-title': {
      use: 'similar-title-plugin',
      inputs: ['file', 'tasks[]']
    },
    // timestamp comparison defaults to 600 sec
    'context-file-timestamp-tasks-timestamp': {
      use: 'close-timestamp-plugin',
      inputs: ['file.created_at', 'tasks[].created_at']
    },
    'context-file-title-task-description': {
      use: 'similar-context-plugin',
      inputs: ['file.name', 'tasks[].description'],
      params: { 'extractKeywords': true }
    },
    'context-file-description-task-title': {
      use: 'similar-context-plugin',
      inputs: ['file.description', 'tasks[].name'],
      params: { 'extractKeywords': true }
    },
    'context-file-description-task-description': {
      use: 'similar-context-plugin',
      inputs: ['file.description', 'tasks[].description'],
      params: { 'extractKeywords': true }
    }
  }
}
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
