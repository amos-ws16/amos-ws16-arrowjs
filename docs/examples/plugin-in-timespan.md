## Request

```javascript
{
  "idPath": "mappedObjects[].id",
  "token": "YOUR_TOKEN_HERE",
  "config": {
	  "idPath": "mappedObjects[].id",
    "aggregator": { "mean": "*" },
    "plugins": {
      "check-period": {
        "use": "in-timespan-plugin",
        "inputs": [ "object.time", "mappedObjects[].startDate", "mappedObjects[].stopDate" ]
      }
    }
  },
  "object": {
 	    "time": 1485797427518
  },
  "mappedObjects": [
    {
    	"id": "in-period",
    	"startDate": 1485797427318,
      "stopDate": 1485797427818
    },
    {
    	"id": "not-in-period",
	    "startDate": 1000000000000,
      "stopDate":  1000000000001
    }
  ]
}
```

## Response

```javascript
{
  "success": true,
  "result": [
    {
      "check-period": 1,
      "id": "in-period",
      "total": 1
    },
    {
      "check-period": 0,
      "id": "not-in-period",
      "total": 0
    }
  ]
}
```
