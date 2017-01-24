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
    'similar-file-title-task-title': 0.13333333333333333,
    'context-file-timestamp-tasks-timestamp': 0.5,
    'context-file-timestamp-tasks-timestamp-long': 0.9,
    'context-file-title-task-description': 0.09523809523809523,
    'context-file-description-task-title': 0.5925925925925926,
    'context-file-description-task-description': 0.7878787878787878,
    'similar-file-title-task-description': 0.07142857142857142,
    'similar-file-description-task-title': 0.5517241379310345,
    'similar-file-description-task-description': 0.7142857142857143,
    'total': 0.4829423591875699
  },
  {
    'similar-file-title-task-title': 0,
    'context-file-timestamp-tasks-timestamp': 0,
    'context-file-timestamp-tasks-timestamp-long': 0,
    'context-file-title-task-description': 0,
    'context-file-description-task-title': 0,
    'context-file-description-task-description': 0.06896551724137931,
    'similar-file-title-task-description': 0,
    'similar-file-description-task-title': 0,
    'similar-file-description-task-description': 0.19047619047619047,
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

| Name          | Description                                                   | Input       | Additional Parameters | Source                                          |
| ------------- |:--------------------------------------------------------------|:------------|:----------------------|:------------------------------------------------|
| close-time    | calculates a score based on the difference of time            | timestamps  | 'time-limit'          | [Source](../lib/plugins/close-time-plugin.js)   |
| similar-text  | calculates a score based on the similarity of two texts       | strings     | 'extractKeywords'     | [Source](../lib/plugins/similar-text-plugin.js) |

1. The similar-text plugin:
This plugin compares different texts like descriptions or titles of files and tasks. If the content of the two texts are similar but have different descriptions, the result would be about 1.0. For information on available parameters take a look at the [source](../lib/plugins/similar-text-plugin.js).


2. The close-time plugin:
It checks the time, when both objects were uploaded (or updated) and if the upload times are far away from each other the plugin would return 0.0. Otherwise if the objects are uploaded at the same time the result would be 1.0. For information on available parameters take a look at the [source](../lib/plugins/close-time-plugin.js).


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

#### 3.3.2 Aggregators

An aggregator is a policy that combines a set of scores that were previously assigned to a task by multiple Plugins into a single final score value. Aggregators can be nested.

##### 3.3.2.1 Types

You can choose from these aggregators:

| Name          | Description                                                                                      |
| ------------- | :----------------------------------------------------------------------------------------------- |
| max           | returns the maximum value                                                                        |
| mean          | calculates mean of all scores                                                                    |
| weigthed mean | calculates weighted mean of all scores <br> requires arrays of the form [weight, value] as input |
| and           | calculates the generalized logical and (see below)                                               |
| or            | calculates the generalized logical or (see below)                                                |
| nand          | calculates the generalized logical nand (see below)                                              |
| not           | calculates the generalized logical not (see below)                                               |

They can be combined in any desired way. If you want to apply an aggregator on all plugins you can use the wildcard symbol "\*".

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

| Name               | for Type       |
| -------------------|:-------------: |
| to-lower-case      | string         |
| to-upper-case      | string         |
| trim               | string         |
| trim-left          | string         |
| trim-right         | string         |
| day-of-month       | timestamp      |
| day-of-week        | timestamp      |
| hour-of-day        | timestamp      |
| years-since-epoch  | timestamp      |
| months-since-epoch | timestamp      |
| weeks-since-epoch  | timestamp      |
| days-since-epoch   | timestamp      |
| hours-since-epoch  | timestamp      |

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

The API supports IDs that will be returned for each score in the response. There are 3 different possibilites how to use the IDs and you can specify your own ID field that will be returned:

1. Use Default Configuration

 The Default Configuration specifies the ID field (idPath) as follows:
 ```javascript
var config = {
  idPath: 'tasks[].id',
  aggregator: { ... },
  plugins: { ... }
}
```
 This means that if you provide this field in your tasks, the corresponding score will also return the ID. If you, don't insert the ID, then the API will generate and return a random ID:

 Request:
  ```javascript
{ "token": "yourTokenHere",
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

 In case you will provide your own configuration. Then you can specify your own ID field so that it will match your own data structure. As we map one object against an array of objects, your ID has to be specified somewhere in the array. The following example explains how to use it with your own configuration:
 
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

 It is not necessary to specify an idPath in your own configuration. Then you will not receive an ID in the response. The order of the result scores will be the same as in the request
