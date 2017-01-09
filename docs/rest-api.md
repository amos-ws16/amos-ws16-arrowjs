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
        "chat": [
          {
            "type": "message",
            "user": "(required) string",
            "text": "(required )string",
            "ts": "(required) 1483953616.000002"
          }, "..."
        ]
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
          "chat": [ "..." ]
        }
    },
    "..."]
}
```

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
