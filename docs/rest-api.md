# REST API Reference
This file documents the REST API input and output schemata for the route
`/api/score`.

## Input Schema
All fields are optional unless specified as required.

```json
{
  "file": {
    "name": "(required) string ",
    "filetype": "(required) string png/jpeg",
    "timestamp": "(required) number",
    "user": "(required) id string",
    "description": "string that was sent with the upload",
    "context": {
      "chat": "...",
      "more stuff": "...",
      "to be defined later": "..."
    }
  },
  "tasks": [
    {
      "name": "(required) string",
      "timestamp": "(required) number",
      "due_date": "number",
      "user": "(required) id string",
      "assignees": ["userid1", "userid2", "..."],
      "description": "string",
      "location": "..."
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
