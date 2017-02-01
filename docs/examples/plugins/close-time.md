### Request

```javascript
{
  "token": "YOUR_TOKEN_HERE",
  "config": {
  	  "idPath": "mappedObjects[].id",
      "aggregator": { "mean": "*" },
      "plugins": {
        "close-time": {
          "use": "close-time-plugin",
          "inputs": [ "object.time", "mappedObjects[].time" ],
          "params": { "time-limit": 500 }
        }
      }
    },
    "object": {
   	    "time": 1485797427518
    },
    "mappedObjects": [
    	  {
      		"id": "exact-time",
      		"time": 1485797427518
      	},
      	{
      		"id": "close-time",
      		"time": 1485797427318
        },
      	{
	      	"id": "more-than-time-limit",
			    "time": 1000000000000
	      }
    ]
}
```

### Response

```javascript
{
  "success": true,
  "result": [
    {
      "close-time": 1,
      "id": "exact-time",
      "total": 1
    },
    {
      "close-time": 0.6,
      "id": "close-time",
      "total": 0.6
    },
    {
      "close-time": 0,
      "id": "more-than-time-limit",
      "total": 0
    }
  ]
}
```
