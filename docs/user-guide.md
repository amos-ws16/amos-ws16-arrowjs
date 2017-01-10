# User guide for the ARROW API


## 1. Introduction

This user guide explains how to use the ARROW API with the basic configuration. It declares all functions of the API, how to use them and gives examples for requests and their results.

## 2. Requests

The ARROW API is based on REST principles: data resources are accessed via standard HTTP requests in UTF-8 format to an API endpoint. The API is running on a server hosted by amazon AWS. To use this API you have to send a POST request to the following address:

http://ec2-52-212-74-103.eu-west-1.compute.amazonaws.com:4000/api/score

## 3.	Input scheme

All data is received as a JSON object that are based on the following scheme:

```json
{
    "file": {
      "title": "(required) string ",
      "type": "(required) string png/jpeg",
      "created_at": "(required) unix timestamp",
      "user": "(required) id string",
      "description": "string that was sent with the upload"
    },
    "tasks": [
      {
        "title": "(required) string",
        "created_at": "(required) unix timestamp",
        "due_date": "unix timestamp",
        "created_by": "(required) id string",
        "last_updated_by": "id string",
        "last_updated_at": "unix timestamp",
        "assignees": ["userid1", "userid2", "..."],
        "description": "string",
        "location": "..."
    },
    "..."]
}
```

The fields marked with '(required)' are necessary for the comparison. If one or more of these fields are missing the API will return an exception.

## 4. Functions

There are three important concepts that facilitate assigning a score to tasks representing the degree to which they match an uploaded file and its metadata: The Score Manager, one or more Plugins and an Aggregator.

#### 4.1 Plugins

A Plugin is a function that takes two arguments - a file object that contains meta data, for example the filename, size, time of upload and/or the file contents, and a task object that contains meta data related to the task, for example the task name. It returns a floating point numeric score in the range 0.0 to 1.0 which describes the degree in which the file and the task are correlated in the aspect that this plugin is focused on. Currently there are 2 Plugins available:

1. The similar-text Plugin:
This plugin compares different texts like descriptions or titles of files and tasks. If the content of the two texts are similar but have different descriptions, the result would be about 1.0. For information on available parameters take a look at the [source](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/lib/plugins/similar-text-plugin.js).


2. The close-time Plugin:
It checks the time, when both objects were uploaded (or updated) and if the upload times are far away from each other the plugin would return 0.0. Otherwise if the objects are uploaded at the same time the result would be 1.0. For information on available parameters take a look at the [source](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/close-time-plugin.js).


#### 4.2 Score Manager
 The purpose of the Score Manager is to provide the entry point for a scoring request, delegate the data to multiple Plugins, and combine their individual scores using an Aggregator.

## 5. Example

Request:

```json
{
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
```

## 6. Configuration

A configuration consists of plugin configurations and an aggregator configuration. The API has a default configuration.

#### 6.1 Configuration options
The Configuration of this API has 5 different comparison-plugins:

1. Similar Title:
Compares the title of the file with all task titles

2. Context File Timestamp - Tasks Timestamp:
Compares the timestamps of file and tasks with a time limit of 600 seconds

3. Context File Timestamp - Tasks Timestamp (Long):
Compares the timestamps of file and tasks with a time limit of 3600 seconds

4. Context File Description - Task Title:
Compares the description of a file with the title of tasks

5. Context File Description - Task Description:
Compares the description of a file with the description of tasks

#### 6.2 Default Configuration

The default configuration consists mainly of 3 three scores which are aggregated by the `mean` Aggregator:

1. Description components score

 First the maximum of the raw `File Description - Task Description`-Plugin and the keywords only `File Description - Task Description`-Plugin is taken. Respectively this is done for the `File Title - Task Description`-Plugin and for the `File Description - Task Title`-Plugin. After that those 3 maximum values get aggregated with the `mean` Aggregator to form the _Description components score_.

2. Title-Title score

 This score simply consists of the score from the `File Title - Task Title`-Plugin.

3. Timestamp score

 The timestamp score is calculated by taking the mean score of the `File Title - Task Title`-Plugin and the `File Timestamp - Task Timestamp`-Plugin.

#### 6.3 Custom Configuration

There is also the possibility to configure the API by yourself, just by sending an own configuration with the Post Request. An example could look like this:

```json
{
  "aggregator": {"mean": "*"},
  "plugins": {
    "context-file-description-task-description": {
      "use": "similar-text-plugin",
      "inputs": ["file.description | to-lower-case", "tasks[].description"],
      "params": { "extractKeywords": true }
    },
    "context-file-timestamp-tasks-timestamp-long": {
      "use": "close-time-plugin",
      "inputs": ["file.created_at", "tasks[].created_at"]
    }
  }
}
```

This configuration is used to compare the description of file, which is first transformed to lower case, and tasks (`"inputs": ["file.description | to-lower-case", "tasks[].description"]`) by keywords (`"params": { "extractKeywords": true }`) with the similar text (`"use": "similar-text-plugin"`) plugin.

1. The __name__ (`"context-file-description-task-description"`) defines how the plugin is referenced in the configuration.

2. The __use__ (`"similar-context-plugin"`) defined which of the built-in plugins is used to determine the score.

3. The __inputs__ describe the path to the value that should be compared. Additional pipes (`| to-lower-case`) will modify the value before it is passed to the scoring plugin. For a list of all available pipes see [here](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/user-guide.md#9-pipes).

4. The __params__ is an object of parameters that is passed to to used plugin.

Another custom configuration could look like this.

```json
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
  },
 "plugins": {
   "context-file-title-task-title": {
     "use": "similar-text-plugin",
     "inputs": ["file.title", "tasks[].title"],
     "params": { "extractKeywords": true }
   },
   "context-file-timestamp-tasks-timestamp-long": {
     "use": "close-time-plugin",
     "inputs": ["file.created_at", "tasks[].created_at"],
     "params": { "time-limit": 3000 }
   },
   "context-file-title-task-description": {
     "use": "similar-text-plugin",
     "inputs": ["file.title", "tasks[].description"],
     "params": { "extractKeywords": true }
   }
 }
}
 ```

Here we used only 3 plugins. First we took the mean of the score of the long `File Timestamp - Task Timestamp`-Plugin and the score of the keywords only `File Title - Task Description`-Plugin. After that we took the higher value (max) of this mean value and the score of the keywords only `File Title - Task Title`-Plugin.

## 7. Example Request with Configuration
POST Request:

```json
{
    "config": {
        "aggregator": {"mean": "*"},
        "plugins": {
            "context-file-description-task-description": {
                "use": "similar-text-plugin",
                "inputs": ["file.description", "tasks[].description"],
                "params": {
                    "extractKeywords": true
                }
            }
        }
    },
    "file": {
        "title": "Cafe abc",
        "type": "jpeg",
        "created_at": 1479755100,
        "user": "5hj34thtr",
        "description": " Great location for a meeting"
    },
    "tasks": [{
        "title": " find a location",
        "created_at": 1479754800,
        "due_date": 1479766305,
        "created_by": "ikgDG94s",
        "description": "Find a location for the next meeting"
    }, {
        "title": " Check your mails",
        "created_at": 1379754800,
        "due_date": 1454353454,
        "created_by": "dfgj2s334",
        "description": "Check your mails before you leave."
    }]
}
```

Example response for the request:

```json
{
  "success": true,
  "result": [
    {
      "context-file-description-task-description": 0.7878787878787878,
      "total": 0.7878787878787878
    },
    {
      "context-file-description-task-description": 0.06896551724137931,
      "total": 0.06896551724137931
    }
  ]
}
```

## 8. Aggregators

An Aggregator is a policy that combines a set of scores that were previously assigned to a task by multiple Plugins into a single final score value. Aggregators can also be nested. The example above uses a mean aggregator over all plugins.

You can choose from these Aggregators:

| Name          | description                                                                                      |
| ------------- |:-------------------------------------------------------------------------------------------------|
| max           | returns the maximum value                                                                        |
| mean          | calculates mean of all scores                                                                    |
| weigthed mean | calculates weighted mean of all scores <br> requires arrays of the form [weight, value] as input |

Some examples of how to use those aggregators can be found in the Custom Configuration section of this User Guide. They can be combined in any desired way. If you want to apply an aggregator on all plugins you can use the wildcard symbol "\*".

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

## 9. Pipes

You can choose from these Pipes:

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
