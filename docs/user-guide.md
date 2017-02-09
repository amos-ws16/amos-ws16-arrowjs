# User Guide - Arrow.js

This user guide explains how to use the Arrow.js Engine.

## 1. Content

 1. [Content](#content)
 2. [Installation](#installation)
 3. [Usage](#usage)
  1. [Example](#example)
  2. [Score Manager](#score-Manager)
  3. [Configuration](#configuration)

## 2. Installation

```sh
$ npm install https://github.com/amos-ws16/amos-ws16-arrowjs.git
```

## 3. Usage


### 3.1 Example
Here you can see a short example on how to use Arrow.js. Every component of this example is described below.

```javascript
// Include Arrow.js
const arrow = require('arrow')

// Create a configuration ...
let config = {
  ...
}
// ... or use the default configuration
config = require('arrow/config/default')

// Create a score manager with the previously defined configuration
let scoreManager = arrow.create(config)

// Create an object that we want to get a score for
let obj = {
  "file": {
    "title": "Cafe abc",
    "type": "jpeg",
    "created_at": 1479755100,
    "user": "5hj34thtr",
    "description": " Great location for a meeting"
  },
  "tasks": [
    {
      "title": " find a location",
      "created_at": 1479754800,
      "due_date": 1479766305,
      "created_by": "ikgDG94s",
      "description": "Find a location for the next meeting"
    },
    {
      "title": " Check your mails",
      "created_at": 1379754800,
      "due_date": 1454353454,
      "created_by": "dfgj2s334",
      "description": "Check your mails before you leave."
    }
  ]
}

// Calculate scores
let score = scoreManager.score(obj)

```

### 3.2 Score Manager

The purpose of the score manager is to provide the entry point for a scoring request, delegate the data to multiple Plugins, and combine their individual scores using an aggregator.

To get a score for an object, the object needs to be passed to the `score` function of the score manager. The result could look like this:

```javascript
[
  {
    'id': 1485792981600,
    'similar-file-title-task-title': 0.13333333333333333,
    'context-file-timestamp-tasks-timestamp': 0.5,
    ...,
    'total': 0.4829423591875699
  },
  {
    'id': 1485792981601,
    'similar-file-title-task-title': 0,
    'context-file-timestamp-tasks-timestamp': 0,
    '...',
    'total': 0.028826856413063307
  }
]
```

The result contains each score for the configured plugins and one aggregated score for each task.

### 3.3 Configuration

The configuration consists of the **plugin configuration** and the **aggregator configuration**.

```javascript
{
  "aggregator": {},
  "plugins": {}
}
```

#### 3.3.1 Plugins

A plugin is a function that takes two arguments - a file object that contains meta data, for example the filename, size, time of upload and/or the file contents, and a task object that contains meta data related to the task, for example the task name. It returns a floating point numeric score in the range 0.0 to 1.0 which describes the degree in which the file and the task are correlated in the aspect that this plugin is focused on.

##### 3.3.1.1 Types

  You can choose from these plugins:

  1. __similar-text-plugin__:

     This plugin compares different texts like descriptions or titles of files and tasks. If the content of the two texts are similar but have different descriptions, the result would be about 1.0.
     - Input: _text_ (string), _text_ (string)
     - Parameters:
       1. _extractKeywords_ (boolean, default: false): defines if only keywords should be compared from the strings.
     - Returns: [0.0, 1.0]
     - [Example](examples/plugins/similar-text.md), [Source](../lib/plugins/similar-text-plugin.js)

  2. __is-in-set-plugin__:

     This plugin checks if a given object is included in a given set (array). The score evaluates to 1.0 if it is included, otherwise 0.0.
     - Input: _variable_ (no specified type), _set_ (array)
     - Parameters: none
     - Returns: {0.0, 1.0}
     - [Example](examples/plugins/is-in-set.md), [Source](../lib/plugins/is-in-set.js)

  3. __in-timespan-plugin__:

     This plugin checks if a given timestamp ('time') is in a given period ('start', 'end') of time.
     - Input: _time_ (timestamp), _start_ (timestamp), _end_ (timestamp)
     - Parameters: none
     - Returns: {0.0, 1.0}
     - [Example](examples/plugins/in-timespan.md), [Source](../lib/plugins/in-timespan-plugin.js)

  4. __close-time-plugin__:

     It checks the time, when both objects were uploaded (or updated) and if the upload times are far away from each other the plugin would return 0.0. Otherwise if the objects are uploaded at the same time the result would be 1.0.
     - Input: _time1_ (timestamp), _time2_ (timestamp)
     - Parameters:
       1. _time-limit_: defines the maximum time in seconds. Everything larger that this time will be scored 0.0.
     - Returns: [0.0, 1.0]
     - [Example](examples/plugins/close-time.md), [Source](../lib/plugins/close-time-plugin.js)

  5. __chat-text-plugin__:

     This plugin scores the similarity of a given string (e.g title, name, or description of a file) and a set of texts (like a chat). It is necessary to have the chat as an array where each element is an objects with a key named 'text'. ([Click for more information](examples/plugins/chat-text.md))
     - Input: _chat_array_ (array of objects with key 'text'), _text_ (string)
     - Parameters: none
     - Returns: [0.0, 1.0]
     - [Example](examples/plugins/chat-text.md), [Source](../lib/plugins/chat-text-plugin.js)

  6. __compare-numbers-plugin__:

      This plugin compares two numbers with the operator: '<', '<=', '=', '>=', '>'. Therefore, the operator must
      be specified as parameter of the plugin
      - Input: _number_, _number_
      - Parameters:
        1. _operator_: defines the operator which is used to compare the numbers. This can be: '<', '<=', '=', '>=', '>'.
      - Returns: {0.0, 1.0}
      - [Example](examples/plugins/compare-numbers.md), [Source](../lib/plugins/compare-numbers-plugin.js)


##### 3.3.1.2 Configuration

Plugins can be configured using the additional parameters. How this is done can be seen in the following example.

```javascript
  {
  "plugins": {
    "context-file-description-task-description": {
      "use": "similar-text-plugin",
      "inputs": ["file.description", "tasks[].description"],
      "params": { "extractKeywords": true }
    },
    "context-file-timestamp-tasks-timestamp-long": {
      "use": "close-time-plugin",
      "inputs": ["file.created_at", "tasks[].created_at"]
    }
  }
}
```

This configuration is used to compare the description of file and tasks (`"inputs": ["file.description | to-lower-case", "tasks[].description"]`) by keywords (`"params": { "extractKeywords": true }`) with the similar text (`"use": "similar-text-plugin"`) plugin.

1. The __name__ (`"context-file-description-task-description"`) defines how the plugin is referenced in the configuration.

2. The __use__ (`"similar-context-plugin"`) defined which of the built-in plugins is used to determine the score.

3. The __inputs__ describe the path to the value that should be compared.

4. The __params__ is an object of parameters that is passed to used plugin.

5. The __inputGroup__ is an optional parameter. Its use and usage is described below.

##### inputGroup

If you dont want to configure multiple plugins that use the same __use__ function and the same __params__ but use different __inputs__, you can use __inputGroup__ instead. An __inputGroup__ looks like this

```js
"inputGroup": [ ["file.description"], ["tasks[].description", "tasks[].title"]]
```

and is used instead of __inputs__. This will automatically generate plugins for you that use each combination of the entries as __inputs__. For example, this __inputGroup__ would create two plugins.
The first one would compare `file.description` and `tasks[].description` and the second one `file.description` and `tasks[].title`. You can still use __params__. They will apply for all generated plugins.
[Example of inputGroup](examples/input-groups.md)

#### 3.3.2 Aggregators

An aggregator is a policy that combines a set of scores that were previously assigned to a task by multiple Plugins into a single final score value. Aggregators can be nested.

##### 3.3.2.1 Types

You can choose from these aggregators:

| Name          | Description                                                                                      |                                                  |
| ------------- | :----------------------------------------------------------------------------------------------- |--------------------------------------------------|
| max           | returns the maximum value                                                                        |[Example](examples/aggregators/max.md)            |
| mean          | calculates mean of all scores                                                                    |[Example](examples/aggregators/mean.md)           |
| weigthed-mean | calculates weighted mean of all scores <br> requires arrays of the form [weight, value] as input |[Example](examples/aggregators/weighted-mean.md)  |
| and           | calculates the generalized logical and (see below)                                               |[Example](examples/aggregators/and.md)            |
| or            | calculates the generalized logical or (see below)                                                |[Example](examples/aggregators/or.md)             |
| nand          | calculates the generalized logical nand (see below)                                              |[Example](examples/aggregators/nand.md)           |
| not           | calculates the generalized logical not (see below)                                               |[Example](examples/aggregators/not.md)            |

They can be combined in any desired way. If you want to apply an aggregator on all plugins you can use the wildcard symbol "\*".
A combination of multiple aggregators is show here: [Example](examples/advanced-aggregators.md).


__ATTENTION__: When using the wildcard symbol with certain aggregators like e.g. `mean` and some plugins can't return a value (e.g. because of missing optional values in the input), the returned mean value gets calculated only based on the returned values.  
On the other hand if the wildcard is not used, missing values will be treated as a score of 0.0 in the aggregators.  
Examples:

 1. mean(\*) with 5 plugins but only __2__ plugins returned values [0, 1]:

  (0 + 1) / __2__ = 0.5  
  This leads to a total score of 0.5.

 2. mean(\*) with 5 plugins and all 5 plugins returned values [0, 1, 1, 1, 1]:

  (0 + 1 + 1 + 1 + 1) / 5 = 0.8  
  This leads to a total score of 0.8.

 3. mean(...) with __5__ plugins listed in (...) but only 2 plugins returned values [0, 1]:

  (0 + 1) / __5__ = 0.2  
  This leads to a total score of 0.2.

 4. mean(...) with 5 plugins listed in (...) and all 5 plugins returned values [0, 1, 1, 1, 1]:

  (0 + 1 + 1 + 1 + 1) / 5 = 0.8  
  This leads to a total score of 0.8.   

This holds similarly for the other aggregators.


##### 3.3.2.2 Logical Aggregators

In addition to the statistical reduction aggregators `mean`, `weighted mean`, and `max`, there are the logical aggregators `and`, `or`, `not`, and `nand`. These are modelled after the logical operations with the same name in that, in the case of 0.0 (false) and 1.0 (true) score values, they reproduce the same results. For example:
```
config.aggregator = {
  'and': ['plugin-a', 'plugin-b']
}
// Assume the plugins 'plugin-a' and 'plugin-b' score this data with 1.0 and 0.0 respectively
let data = ...
let result = scoreManager.score(data)
// result.total === 0.0
// because (true AND false) <=> false
```
More specifically the following table shows the outputs for scores 1.0 and 0.0:

| A   | B   | and: [A, B] | or: [A, B] | nand: [A, B] | not: A |
| --- | --- | ----------- | ---------- | ------------ | ------ |
| 0.0 | 0.0 | 0.0         | 0.0        | 1.0          | 1.0    |
| 0.0 | 1.0 | 0.0         | 1.0        | 1.0          | 1.0    |
| 1.0 | 0.0 | 0.0         | 1.0        | 1.0          | 0.0    |
| 1.0 | 1.0 | 1.0         | 1.0        | 0.0          | 0.0    |


However, the logical aggregators generalize the logical operations so they are valid for floating point score values in [0.0,1.0]. For example, if you AND two values that are close to 1.0, you will get a value close to 1.0. If you AND a small value with a big value, you will get a small value. OR will give a big value if one of the inputs is big and NOT will produce a big value only if the input value was small.

##### 3.3.2.3 Configuration

An aggregator configuration could look like this:

```javascript
{
  "aggregator": {
    "max": [
      { "mean": [
        "context-file-timestamp-tasks-timestamp-long",
        "context-file-title-task-description"
        ]
      },
     "similar-file-title-task-title"
    ]
  }
}
```

Here we use only 3 plugins. First we take the mean of the score of the long `File Timestamp - Task Timestamp`-Plugin and the score of the keywords only `File Title - Task Description`-Plugin. After that we take the highest value (max) of this mean value and the score of the keywords only `File Title - Task Title`-Plugin.

#### 3.3.3 Pipes

Pipes can be used to manipulate the input for plugins.

##### 3.3.3.1 Types

You can choose from these pipes:

| Name               | for Type       | Description                                                          |                                                |
| -------------------|:-------------: |----------------------------------------------------------------------|------------------------------------------------|
| to-lower-case      | string         | Only lower cases in string (i.e. 'TeXt' => 'text')                   |[Example](examples/pipes/to-lower-case.md)      |
| to-upper-case      | string         | Only upper cases in string (i.e. 'tExT' => 'TEXT')                   |[Example](examples/pipes/to-upper-case.md)      |
| trim               | string         | Removes whitespaces on both sides (i.e. ' text ' => 'text')          |[Example](examples/pipes/trim.md)               |
| trim-left          | string         | Removes whitespaces on left side  (i.e. ' text ' => 'text ')         |[Example](examples/pipes/trim-left.md)          |
| trim-right         | string         | Removes whitespaces on right side (i.e. ' text ' => ' text')         |[Example](examples/pipes/trim-right.md)         |
| basename           | string         | Removes a dot-extension (i.e. 'file.ext' => 'file')                  |[Example](examples/pipes/basename.md)           |
| day-of-month       | timestamp      | Extracts the day of the month (1 - 31)                               |[Example](examples/pipes/day-of-month.md)       |
| day-name-of-week        | timestamp      | Extracts the day of the week (i.e. Thursday)                         |[Example](examples/pipes/day-name-week.md)  |
| day-number-of-week        | timestamp      | Extracts the day of the week (i.e. 4(Thursday))                         |[Example](examples/pipes/day-number-week.md)|
| month-name-of-year        | timestamp      | Extracts the month of the year (i.e. March)                         |[Example](examples/pipes/month-name-year.md)  |
| month-number-of-year        | timestamp      | Extracts the month of the year (i.e. 3(March))                         |[Example](examples/pipes/month-number-year.md)|
| hour-of-day        | timestamp      | Extracts the hour of the day (0 - 24)                                |[Example](examples/pipes/hour-of-day.md)        |
| years-since-epoch  | timestamp      | Extracts the passed amount of years since 1970                       |[Example](examples/pipes/years-since-epoch.md)  |
| months-since-epoch | timestamp      | Extracts the passed amount of months since 1970                      |[Example](examples/pipes/months-since-epoch.md) |
| weeks-since-epoch  | timestamp      | Extracts the passed amount of weeks since 1970                       |[Example](examples/pipes/weeks-since-epoch.md)  |
| days-since-epoch   | timestamp      | Extracts the passed amount of days since 1970                        |[Example](examples/pipes/days-since-epoch.md)   |
| hours-since-epoch  | timestamp      | Extracts the passed amount of hours since 1970                       |[Example](examples/pipes/hours-since-epoch.md)  |
| chat               | [object]       | Extracts all keywords out of an array of [chat messages](rest-api.md)|[Example](examples/pipes/chat.md)               |

##### 3.3.3.2 Usage

Since pipes are used by a plugin, they are added to the plugin configuration.

```javascript
"plugins": {
    "context-file-description-task-description": {
      "use": "similar-text-plugin",
      "inputs": ["file.description | to-lower-case", "tasks[].description"], // Use to-lower-case pipe
      "params": { "extractKeywords": true }
    },
    "context-file-timestamp-tasks-timestamp-long": {
      "use": "close-time-plugin",
      "inputs": ["file.created_at", "tasks[].created_at"]
    }
}
```

Pipes can be chained with additional `|`'s.

#### 3.3.4 Default Configuration

The default configuration consists mainly of 3 three scores which are aggregated by the `mean` Aggregator:

1. Description components score

 First the maximum of the raw `File Description - Task Description`-Plugin and the keywords only `File Description - Task Description`-Plugin is taken. Respectively this is done for the `File Title - Task Description`-Plugin and for the `File Description - Task Title`-Plugin. After that those 3 maximum values get aggregated with the `mean` Aggregator to form the _Description components score_.

2. Title-Title score

 This score simply consists of the score from the `File Title - Task Title`-Plugin.

3. Timestamp score

 The timestamp score is calculated by taking the mean score of the `File Title - Task Title`-Plugin and the `File Timestamp - Task Timestamp`-Plugin.

 The default configuration can be found [here](../config/default.js).

#### 3.3.5 Identify Scores with IDs

The API supports IDs that will be returned for each score in the response. There are 3 different possibilites how to use IDs and you can specify an ID field (idPath) to match your data structure:

1. Use Default Configuration

 The Default Configuration specifies the ID field (idPath) as follows:
 ```javascript
 {
     idPath: 'tasks[].id',
     aggregator: { ... },
     plugins: { ... }
 }
 ```
 This means that if you provide this field in your tasks array, the corresponding score will also return the ID. If you don't insert an ID in a task, then the API will generate and return a random ID:

 Request:
 ```javascript
 {
     "token": "yourTokenHere",
     "file": { "title": "hello" },
     "tasks": [
        { "title": "taskWithID", "id": "YOUROWNID" },
        { "title": "taskWithoutID" }
     ]
 }
 ```

 Response:
 ```javascript
 {
  "success": true,
  "result": [
      {
          "similar-file-title-task-title": 0,
          ...
          "id": "YOUROWNID",
          "total": 0
      },
      {
          "similar-file-title-task-title": 0,
          ...
          "id": 1485300049420,
          "total": 0
      }
   ]
}
```

2. Specify your own ID field

 In case you will provide your own configuration. Then you can specify your own ID field so that it will match your own data structure. As we map one object against an array of objects, your ID has to be specified somewhere in an array. The following example shows how to use IDs with your own configuration.

 Request:
 ```javascript
 {
     "token": "yourTokenHere",
     "config": {
         "idPath": "myObjects[].id.idIWantToReceive",
         "aggregator": {"mean": [ "my-plugin" ] },
         "plugins": {
             "my-plugin": {
                 "use": "similar-text-plugin",
                 "inputs": ["myObject.name", "myObjects[].name"]
             }
          }
     },
     "myObject": { "name": "hello" },
     "myObjects": [
         { "name": "taskWithID", "id": { "idIWantToReceive": "YOUROWNID" } },
         { "name": "taskWithoutID" }
     ]
 }
 ```

 Response:
 ```javascript
 {
     "success": true,
     "result": [
         {
             "my-plugin": 0,
             "id": "YOUROWNID",
             "total": 0
         },
         {
             "my-plugin": 0,
             "id": 1485301111119,
             "total": 0
         }
     ]
 }
 ```

3. Don't use IDs

 It is not necessary to specify an idPath in the configuration. Then you will not receive an ID in the response. The order of the result scores will be the same as in the request.
