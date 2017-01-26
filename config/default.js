
/**
 * Default config for scoreManager
 *
 * similar-title: compare titles of file and tasks
 * context-file-timestamp-tasks-timestamp: compares timestamps of file and tasks - timeLimit = 600s (default in plugin)
 * context-file-timestamp-tasks-timestamp: compares keywords of file title with keywords of description of tasks
 * context-file-description-task-title: compares keywords of file description with keywords of description of tasks
 * context-file-description-task-description: compares keywords of file description with keywords of description of tasks
*/
var config = {
  idPath: 'tasks[].id',
  aggregator: {'mean': [
    {'mean': [
      {'max': ['context-file-title-task-description', 'similar-file-title-task-description']},
      {'max': ['context-file-description-task-title', 'similar-file-description-task-title']},
      {'max': ['context-file-description-task-description', 'similar-file-description-task-description']}
    ]},
    'similar-file-title-task-title',
    {'mean': [
      'context-file-timestamp-tasks-timestamp',
      'similar-file-title-task-title'
    ]}
  ]},
  /* aggregator: {'mean': [
    {'max': ['context-file-title-task-description', 'similar-file-title-task-description']},
    {'max': ['context-file-description-task-title', 'similar-file-description-task-title']},
    {'max': ['context-file-description-task-description', 'similar-file-description-task-description']},
    'similar-file-title-task-title', 'context-file-timestamp-tasks-timestamp-long'
  ]}, -> 52%
  */
  /* aggregator: {'max': [ { 'mean': ['context-file-timestamp-tasks-timestamp', 'context-file-timestamp-tasks-timestamp-long',
    'context-file-title-task-description', 'context-file-description-task-title', 'context-file-description-task-description',
    'similar-file-title-task-description', 'similar-file-description-task-title', 'similar-file-description-task-description'
  ] }, 'similar-file-title-task-title' ]}, -> 54%
  */
  // aggregator: {'mean': '*'}, ->48%
  plugins: {
    // similar-title-plugin pulls file.title from file and tasks[].title from tasks[] itself
    'similar-file-title-task-title': {
      use: 'similar-text-plugin',
      inputs: ['file.title', 'tasks[].title']
    },
    // timestamp comparison defaults to 600 sec
    'context-file-timestamp-tasks-timestamp': {
      use: 'close-time-plugin',
      inputs: ['file.created_at', 'tasks[].created_at']
    },
    'context-file-timestamp-tasks-timestamp-long': {
      use: 'close-time-plugin',
      inputs: ['file.created_at', 'tasks[].created_at'],
      params: { 'time-limit': 3600 }
    },
    'context-file-title-task-description': {
      use: 'similar-text-plugin',
      inputs: ['file.title', 'tasks[].description'],
      params: { 'extractKeywords': true }
    },
    'context-file-description-task-title': {
      use: 'similar-text-plugin',
      inputs: ['file.description', 'tasks[].title'],
      params: { 'extractKeywords': true }
    },
    'context-file-description-task-description': {
      use: 'similar-text-plugin',
      inputs: ['file.description', 'tasks[].description'],
      params: { 'extractKeywords': true }
    },
    'similar-file-title-task-description': {
      use: 'similar-text-plugin',
      inputs: ['file.title', 'tasks[].description'],
      params: { 'extractKeywords': false }
    },
    'similar-file-description-task-title': {
      use: 'similar-text-plugin',
      inputs: ['file.description', 'tasks[].title'],
      params: { 'extractKeywords': false }
    },
    'similar-file-description-task-description': {
      use: 'similar-text-plugin',
      inputs: ['file.description', 'tasks[].description'],
      params: { 'extractKeywords': false }
    }
  }
}

module.exports = config
