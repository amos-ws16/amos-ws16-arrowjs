# Change Log
All notable changes to this project will be documented in this file.

## [2.0.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/final-release) - 2017-02-15

## Changed
- Several bug fixes and small improvements

## [1.10.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-13-release) - 2017-02-09

## Added
- Several new pipes [(click here)](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/87)
- Support for array inputs [(click here)](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/88)
- Compare-plugin [(click here)](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/86)

## Changed
- Chat-text plugin [(click here)](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/90)
- Return a uid [(click here)](https://github.com/amos-ws16/amos-ws16-arrowjs-server/pull/31)

## [1.9.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-12-release) - 2017-02-02

## Added
- new chat pipe
- new chat plugin
- example requests in documentation


## [1.8.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-11-release) - 2017-01-26

## Added
- Pipe for base names
- Assignees Plugin
- Automatic iput ids
- Exception handling for configuration
- Inputgroups

## [1.7.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-10-release) - 2017-01-19

## Added
- Plugin 'is-assignes' Added
- Documentation for logic aggregators

## Changed
- Fix for logic aggregators

## [1.6.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-09-release) - 2017-01-12

## Added
- Added a Website for this project [(click here)](https://amos-ws16.github.io/amos-ws16-arrowjs/)
- Added logical aggregators (and, or, not, nand) [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/64)
- Added `in-timespan-plugin` to give a relation, whether a time stamp is in a time range [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/62)
- Added multiple pipes for time events, checkout the [documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md) for more information [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/65)
- Plugins can now take an arbitrary number of arguments [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/62)
- Added exception handling for scoring the relation with missing input fields [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/63)
- Added Engine and Server Version for the welcome page [PR](https://github.com/amos-ws16/amos-ws16-arrowjs-server/pull/7)

## Changed
- Fixed aggregators missing scores: max, weighted-mean and mean now interpret missing scores as 0.0.
- Improvements of default configuration (considering aggregators) to get besser scoring results
- Updated [Getting Started](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md) with npm installation guide [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/71) and chat inputschema (especially for Slack chats) [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/69)

## [1.5.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-08-release) - 2016-12-15

## Added
- Nested Aggregators allow the combination of scores into one score. Nested Aggregators can be configured
- New aggregator concepts to manage scores [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/52)
- Testcases can be evaluated seperately to unit tests [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/55) -> moved to [arrowjs-server](https://github.com/amos-ws16/amos-ws16-arrowjs-server)
- Pipes can be used to modify input before scoring [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/57)

## Changed
- Failure of one plugin does not affect other plugins. User will get the scoring of any successful plugins and an error report for all failed plugins [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/51)
- rename `similar-context-plugin` to `similar-text-plugin`
- update [Getting Started](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md): removed `same-title-plugin` and renamed `similar-text-plugin`, added description for pipes, added description for nested aggregators
- seperate engine from server and make available as npm package [PR](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/58) + [PR](https://github.com/amos-ws16/amos-ws16-arrowjs-server/pull/2)

## Removed
- unneeded files from git repository
- server files removed to create npm package

## [1.4.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-07-release) - 2016-12-08

## Changed
- Updated [Getting Started](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md) to include custom configurations

## Removed
- `similar-title-plugin` and `same-title-plugin` and refactored the functionality into the `similar-context-plugin`

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
