### Request

```javascript
{
  "token": "YOUR_TOKE_HERE",
  "config": {
      "idPath": "mappedObjects[].id",
      "aggregator": { "mean": "*" },
      "plugins": {
        "check-time": {
          "use": "compare-numbers-plugin",
          "inputs": [ "mappedObjects[].y", "object.x" ],
          "params": { "operator": "=" }
        }
      }
  },
  "object": {
    "x": 12323232332
  },
  "mappedObjects": [
    { "y": 12393483459 },
    { "y": 12323232332 }
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
      "id": 1486127292843,
      "total": 0
    },
    {
      "check-time": 1,
      "id": 1486127292844,
      "total": 1
    }
  ]
}
```
