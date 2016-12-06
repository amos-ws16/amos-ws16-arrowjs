# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/amos-ws16/amos-ws16-arrowjs/compare/midproject-release...dev)

## [1.3.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/midproject-release) - 2016-12-01

## Added
- Default [configuration](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/config/index.js)
- [Exclude plugins](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/37) from the scoreing if they throw an exception
- [Getting started](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.pdf)


## Changed
- Adjuste the [input schema](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/rest-api.md) of the API

## [1.2.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-05-release) - 2016-11-24

### Added
- Error detection and graceful failure in Plugins and reporting to user ([PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/25))
- Documentation of REST [input schema](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/rest-api.md)
- Validation of successful deployment ([PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/26))
- Scoring Plugin by [similar context](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/similar-context-plugin.js)

## [1.1.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-04-release) - 2016-11-17

### Added
- [Changelog](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/CHANGELOG.md)
- [ScoreManager](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/score-aggregator.js) and [ScoreAggregator](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/score-aggregator.js)
- Automatic deployment with TravisCI ([documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/aws-codedeploy.md))
- [Example](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/14) of testing with stubs ([Documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/development-guide.md#mockingstubbing-dependencies-in-tests))
- Scoring Plugins:
  - by [Time](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/close-time-plugin.js)
  - by [same](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/same-title-plugin.js) or [similar](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/similar-title-plugin.js) title of task and file

### Changed
- Converted initial draft of title comparison into a [plugin](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/18) for the ScoreManager

## [1.0.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-03-release) - 2016-11-10

### Added
- Deployment Scripts for AWS ([incl.](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/aws-codedeploy.md) [documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/aws-server-setup.md))
- Added basic API
  - Endpoint for "Hello World"
  - Endpoint returning a hard-coded token
- Automatic Testsuit for new commits ([documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/development-guide.md#tests))
- `NODE_ENV` variable to start server in `development` or `production` mode ([documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/development-guide.md#development-vs-production))
- ES6 support
- Initial draft to compare strings
