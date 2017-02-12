In this example the file was created on a monday and 2 tasks were created on a monday and on a wednesday, respectively. With the "compare-numbers-plugin" in combination with the "day-number-of-week"-pipe the tasks get a score of 1 if they were created on the same day as the file, 0 otherwise.

### Request

  ```javascript
  {
    "token": "YOUR_TOKEN_HERE",
    "config": {
    	"idPath": "tasks[].id",
	   	"aggregator": {"mean": "*"},
	   	"plugins": {
		    "compare-day-numbers-equal": {
		      "use": "compare-numbers-plugin",
		      "inputs": ["file.created_at | day-number-of-week", "tasks[].created_at | day-number-of-week"],
		      "params": { "operator": "=" }
		    }
		}
   },
   "file": {
     	"title": "monday report",
    	"created_at": 1487013296
   },
   "tasks": [
     {
	    	"id": 1,
	     "title": "monday meeting",
	     "created_at": 1486408496,
	  	 "due_date": 1486418496
     },
     {
	    	"id": 2,
	     "title": "wednesday meeting",
	     "created_at": 1486581296,
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
      "compare-day-numbers-equal": 1,
      "id": 1,
      "total": 1
    },
    {
      "compare-day-numbers-equal": 0,
      "id": 2,
      "total": 0
    }
  ],
  "uid": "58a0b599d192384b4dcb52ba"
}
  ```
