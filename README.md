# EventTrackerProject


## Overview

## How to return
TODO Link to deployed app, login info if applicable

## REST api

| # | HTTP Method | Resource URI | Request Body | Returns |
|---|---------|--------------|--------------|---------|
| 1 |GET         | api/runs	   |              | Gets all runs|
| 2 |GET         | api/runs/{id} |   | 	Get one run by id |
|	3 |POST        | api/runs |	new run's json | Creates a new run |
| 4 | PUT         | api/runs/{id}	| | Replaces an existing run by id |
|	5 |DELETE      | api/runs/{id}	| | Deletes an existing run by id |



sample json for #3 create request body:
{
    "raceTitle": "Chicago Marathon",
    "location": "Chicago, Il.",
    "hours": 3,
    "minutes": 35,
    "seconds": 12,
    "distance": 26.2,
    "distanceUnit": "miles",
    "notes": "The crowds were unbelievable.  I had a great race and was very happy to see Amanda at the finish line.",
    "user": {
        "id": 2
    }
}

sample json for #4 update request body:
{
    "minutes": 42,
    "notes": "I saw THE CUTEST dog on my run today."
}


Note about #5 delete:
The delete is a soft delete, but it's made to look like a hard delete.  When a user tries to 'delete' a run that has already been deleted the browser will display a 404 Bad Request Error.
