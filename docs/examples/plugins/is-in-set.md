## Example 1

### Request
```javascript
{
  "token": "YOUR_TOKEN_HERE",
  "config": {
	  "idPath": "mappedObjects[].id",
    "aggregator": { "mean": "*" },
    "plugins": {
      "check-user": {
        "use": "is-in-set-plugin",
        "inputs": [ "object.user", "mappedObjects[].users" ]
      }
    }
  },
  "object": {
    "user": "User A"
  },
  "mappedObjects": [
    { "users": [ "User A", "User B", "User C" ] },
    { "users": [ "No User A", "User B", "User C" ] }
  ]
}
```

### Response
```javascript
{
  "success": true,
  "result": [
    {
      "check-user": 1,
      "id": 1485797427818,
      "total": 1
    },
    {
      "check-user": 0,
      "id": 1485797427819,
      "total": 0
    }
  ]
}
```
