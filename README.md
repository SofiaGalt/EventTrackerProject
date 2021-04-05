# EventTrackerProject

For my EventTrackerProject I decided to create something centered around running!  I love running and it's been an awesome part of my family's life. ZetaCircuit, named after my super fast sister, is a personal use app for tracking runs.  A user can keep track of race entries, times, locations, distances, and their notes from each run via RESTFully invoked CRUD operations.  

Link:  http://3.141.108.154:8080/ZetaCircuit/   

## Overview
The objective of this project was to create a RESTful application.  Below I included the current RESTful path mappings that have been defined, as well as any notes I had about them.

## REST api

| # | HTTP Method | Resource URI | Request Body | Returns |
|---|---------|--------------|--------------|---------|
| 1 |GET         | api/runs	   |              | Gets all runs|
| 2 |GET         | api/runs/{id} |   | 	Get one run by id |
|	3 |POST        | api/runs |	new run's json | Creates a new run |
| 4 | PUT         | api/runs/{id}	| updated fields for the run as Json | Updates an existing run by id |
|	5 |DELETE      | api/runs/{id}	| | Deletes an existing run by id |


### #3 Create
#### sample json for #3 create's request body:
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

#### Notes about #3 create:
For every 201 Created response, the header includes the following key value pair:
  Key: Location, Value: path to see the newly created Run.

### #4 update
sample json for #4 update's request body:
{
    "minutes": 42,
    "notes": "I saw THE CUTEST dog on my run today."
}

#### Notes about #4 update:
When a user tries to update a run that has already been deleted (soft delete) or that doesn't exist, the browser will display a 404 Bad Request Error.

### #5 delete
Note about #5 delete:
The delete is a soft delete, but it's made to look like a hard delete.  When a user tries to 'delete' a run that has already been deleted the browser will display a 404 Bad Request Error.  They will also see this error if they try to delete a nonexistant run.

## Topics and Technologies Used

This project uses a relational databases for persistence.
It follows the separation of concerns design pattern.
Database to entity mappings were tested with JUnit Jupiter.
This is a Gradle application which includes a JPA project and complimentary Spring Boot project.

This project uses interfaces that extend JpaRepository<E, K>, which made the interactions with the database ridiculously simple and unbelievably quick to implement.

This application is deployed to an AWS EC2 instance.

## What I learned this week

I learned about Spring Boot's generic class JpaRepository; it takes a type parameter of an Entity's type, along that Entity's primary key's type, and when you create an extending interface it does basically every database thing for you.  You don't have to write an implementing class with method bodies.  It can take abstract method names and use Spring magic to perform filters, sorts, counts and more.  It's like a case of, "What if it could just... ?" actually came true.

We learned about RESTful services.  (The kind that comes up in interviews :) )
REST is used for client side resource management. It provides many benefits like Client-Server separation of concerns, stateless interactions, and a uniform interface.  It creates an organized portal for data transfer.
We learned the basic verb Http method -> noun based uri form of RESTful requests.  We also got a brief introduction to HATEOAS.

We got an introduction to JavaScript too.  Dynamic Typing, truthy values, global scope - It all sound very unstructured and uncomfortable for people who started with Java.  But the differences between Java and JS cause both to have their own strengths.  I have fun learning/working with both of them.
