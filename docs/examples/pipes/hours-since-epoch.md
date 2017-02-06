### Request

```javascript
{
  "token": "YOUR_TOKEN_HERE",
  "config": {
      "idPath": "mappedObjects[].id",
      "aggregator": { "mean": "*" },
      "plugins": {
        "check-time": {
          "use": "compare-numbers-plugin",
          "inputs": [ "mappedObjects[].time | hours-since-epoch", "object.time | hours-since-epoch" ],
          "params": { "operator": "=" }
        }
      }
  },
  "object": {
    "time": 12323232332
  },
  "mappedObjects": [
    { "time": 12393483459 },
    { "time": 12323232332 }
  ]
}
```

### Response

```javascript
{
  "success": true,
  "result": [
    {
      "check-time": 0,
      "id": 1486127980567,
      "total": 0
    },
    {
      "check-time": 1,
      "id": 1486127980568,
      "total": 1
    }
  ]
}
```
