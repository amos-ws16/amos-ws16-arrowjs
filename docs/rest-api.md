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
The following subset of slack messages can be given to the API:

Basic message:
```json
{
    "type": "message",
    "channel": "C2147483705", /* not required */
    "user": "U2147483697",
    "text": "Hello, world!",
    "ts": "1355517523.000005",
    "edited": { /* not required */
        "user": "U2147483697",
        "ts": "1355517536.000001"
    }
}
```

A message was changed:
```json
{
    "type": "message",
    "subtype": "message_changed",
    "hidden": true,
    "channel": "C2147483705",
    "ts": "1358878755.000001",
    "message": {
        "type": "message",
        "user": "U2147483697",
        "text": "Hello, world!",
        "ts": "1355517523.000005",
        "edited": {
            "user": "U2147483697",
            "ts": "1358878755.000001"
        }
    }
}
```

A message was deleted:
```json
{
    "type": "message",
    "subtype": "message_deleted",
    "hidden": true,
    "channel": "C2147483705",
    "ts": "1358878755.000001",
    "deleted_ts": "1358878749.000002"
}
```

A file was shared:
```json
{
    "type": "message",
    "subtype": "file_share",
    "ts": "1358877455.000010",
    "text": "<@cal> uploaded a file: <https:...7.png|7.png>",
    "file": {...},
    "user": "U2147483697",
    "upload": true
}
```

A file was mentioned in a message:
```json
{
    "type": "message",
    "subtype": "file_mention",
    "ts": "1358877455.000010",
    "text": "<@cal> mentioned a file: <https:...7.png|7.png>",
    "file": {...},
    "user": "U2147483697"
}
```

A file was commented:
```json
{
    "type": "message",
    "subtype": "file_comment",
    "ts": "1361482916.000003",
    "text": "<@cal> commented on a file: ...",
    "file": {},
    "comment": {}
}
```

A message that describes the status of the user:
```json
{
    "type": "message",
    "subtype": "me_message",
    "channel": "C2147483705",
    "user": "U2147483697",
    "text": "is doing that thing",
    "ts": "1355517523.000005"
}
```

Bot message:
```json
{
    "type": "message",
    "subtype": "bot_message",
    "ts": "1358877455.000010",
    "text": "Pushing is the answer",
    "bot_id": "BB12033",
    "username": "github",
    "icons": {}
}
```

Purpose of the channel changed:
```json
{
    "type": "message",
    "subtype": "channel_purpose",
    "ts": "1358877455.000010",
    "user": "U2147483828",
    "purpose": "whatever",
    "text": "<@U2147483828|cal> set the channel purpose: whatever"
}
```

Channel topic changed:
```json
{
    "type": "message",
    "subtype": "channel_topic",
    "ts": "1358877455.000010",
    "user": "U2147483828",
    "topic": "hello world",
    "text": "<@U2147483828|cal> set the channel topic: hello world"
}
```

A file can be given in the following format:

```json
{
    "id" : "F2147483862",
    "created" : 1356032811,
    "timestamp" : 1356032811,
    "name" : "file.htm",
    "title" : "My HTML file",
    "mimetype" : "text\/plain",
    "filetype" : "text",
    "pretty_type": "Text",
    "user" : "U2147483697",
    "mode" : "hosted",
    "editable" : true,
    "is_external": false,
    "external_type": "",
    "username": "",
    "size" : 12345,
    "url_private": "https:\/\/slack.com\/files-pri\/T024BE7LD-F024BERPE\/1.png",
    "url_private_download": "https:\/\/slack.com\/files-pri\/T024BE7LD-F024BERPE\/download\/1.png",
    "thumb_64": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_64.png",
    "thumb_80": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_80.png",
    "thumb_360": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_360.png",
    "thumb_360_gif": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_360.gif",
    "thumb_360_w": 100,
    "thumb_360_h": 100,
    "thumb_480": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_480.png",
    "thumb_480_w": 480,
    "thumb_480_h": 480,
    "thumb_160": "https:\/\/slack-files.com\/files-tmb\/T024BE7LD-F024BERPE-c66246\/1_160.png",
    "permalink": "https:\/\/tinyspeck.slack.com\/files\/cal\/F024BERPE\/1.png",
    "permalink_public" : "https:\/\/tinyspeck.slack.com\/T024BE7LD-F024BERPE-3f9216b62c",
    "edit_link": "https:\/\/tinyspeck.slack.com\/files\/cal\/F024BERPE\/1.png/edit",
    "preview": "&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;meta charset='utf-8'&gt;",
    "preview_highlight": "&lt;div class=\"sssh-code\"&gt;&lt;div class=\"sssh-line\"&gt;&lt;pre&gt;&lt;!DOCTYPE html...",
    "lines": 123,
    "lines_more": 118,
    "is_public": true,
    "public_url_shared": false,
    "display_as_bot" : false,
    "channels": ["C024BE7LT", ...],
    "groups": ["G12345", ...],
    "ims": ["D12345", ...],
    "initial_comment": {
        "id": "Fc2RRU1X2P",
        "created": 1476967054,
        "timestamp": 1476967054,
        "user": "U2RSYQFMW",
        "is_intro": true,
        "comment": "Erkennt ihr das AMOS? xD",
        "channel": ""
    }
    "num_stars": 7,
    "is_starred": true,
    "pinned_to": ["C024BE7LT", ...],
    "reactions": [
    {
        "name": "astonished",
        "count": 3,
        "users": [ "U1", "U2", "U3" ]
    },
    {
        "name": "facepalm",
        "count": 1034,
        "users": [ "U1", "U2", "U3", "U4", "U5" ]
    }
    ],
    "comments_count": 1
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
