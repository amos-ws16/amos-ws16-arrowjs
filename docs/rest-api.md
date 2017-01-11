# REST API Reference
This file documents the REST API input and output schemata for the route
`/api/score`.

## Input Schema
All fields are optional unless specified as required.

```json
{
    "file": {
      "title": "(required) string ",
      "type": "(required) string png/jpeg",
      "created_at": "(required) unix timestamp",
      "user": "(required) id string",
      "description": "string that was sent with the upload",
      "context": {
        "chat": [ messages ]
      }
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
        "location": "...",
        "context": {
          "chat": [ messages ]
        }
    },
    "..."]
}
```

### Possible Message Types
We support all message formats that are specified in the Slack API.
A detailed description of possible formats can be found in the
[Basic message formatting section](https://api.slack.com/docs/message-formatting).


## Output Schema
Not yet finished.

```json
{
  "tasks": [
    {
      "name": "string",
      "score": 1.0,
      "subscores": {
        "plugin-a": 1.0,
        "...": "..."
      }
    },
    "..."
  ]
}
```
