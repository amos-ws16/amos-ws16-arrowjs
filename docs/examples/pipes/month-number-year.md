### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
    	"idPath": "tasks[].id",
	   	"aggregator": {"mean": "*"},
	   	"plugins": {
		    "compare-month-numbers-equal": {
		      "use": "compare-numbers-plugin",
		      "inputs": ["file.created_at | month-number-of-year", "tasks[].created_at | month-number-of-year"],
		      "params": { "operator": "=" }
		    }
		}
   },
   "file": {
     	"title": "february report",
    	"created_at": 1487013296
   },
   "tasks": [
     {
	    	"id": 1,
	     "title": "february meeting",
	     "created_at": 1486408496,
	  	 "due_date": 1486418496
     },
     {
	    	"id": 2,
	     "title": "january meeting",
	     "created_at": 1484334896,
	  	 "due_date": 1486681296
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
      "compare-month-numbers-equal": 1,
      "id": 1,
      "total": 1
    },
    {
      "compare-month-numbers-equal": 0,
      "id": 2,
      "total": 0
    }
  ],
  "uid": "58a0b5f8d192384b4dcb52bb"
}
  ```
