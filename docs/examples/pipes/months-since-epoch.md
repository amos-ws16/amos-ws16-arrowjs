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
          "inputs": [ "mappedObjects[].time | months-since-epoch", "object.time | months-since-epoch" ],
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
      "id": 1486127882445,
      "total": 0
    },
    {
      "check-time": 1,
      "id": 1486127882446,
      "total": 1
    }
  ]
}
```
