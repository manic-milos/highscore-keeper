## highscore-keeper
A small app made on node/express, with exposed api for your game. You can use it as-is, or clone it and make your own highscore keeper. 
MongoDB used for data persistence.

#### Deployed API

A version is deployed on heroku, you can find it here: 
https://highscore-keeper.herokuapp.com/api/game


#### Endpoints

- **GET** */api/version* (public)
  - just an indicator endpoint, to see if the service is alive
- **GET** */api/game* (public)
  - lists all the games available
  - there can be more than one game of a same name, you can discern them by their owner/creator
  - a response from this endpoint is an array of game objects with structure like:
    ```
    [...
    {
        "maxScore": null,
        "_id": "6301d54f4113395f7c4c6cde",
        "name": "tic-tac-toe",
        "description": "well, it's tic-tac-toe",
        "owner": "62fcce9677549e48e87b34f4",
        "createdAt": "2022-08-21T06:48:47.827Z",
        "updatedAt": "2022-08-21T06:48:47.827Z",
        "__v": 0
     })
    ...]
    ```
- **GET** */api/game/:gameId* (public)
  - returns a game object with the id given in the query. 
  - structure of the object is the same as in array returned by  */api/game*
  
    ```
    {
        "maxScore": null,
        "_id": "6301d54f4113395f7c4c6cde",
        "name": "tic-tac-toe",
        "description": "well, it's tic-tac-toe",
        "owner": "62fcce9677549e48e87b34f4",
        "createdAt": "2022-08-21T06:48:47.827Z",
        "updatedAt": "2022-08-21T06:48:47.827Z",
        "__v": 0
     })
    ```
- **GET** */api/highscore/:gameId* (public)
    - returns all highscores for a game with the id given in the query. 
    - objects in the array contain information about who obtained the score, when they are created, and the score itself.
    ```
    {
        "_id": "6301dd48e23c8917b1af49be",
        "score": 15,
        "game": "6301d54f4113395f7c4c6cde",
        "user": "62fcce9677549e48e87b34f4",
        "createdAt": "2022-08-21T07:22:48.669Z",
        "updatedAt": "2022-08-21T07:22:48.669Z",
        "__v": 0
    }
    ```
- **POST** */api/user/auth* (Public)
    - endpoint for user login. 
    - request structure (x-www-form-encoded) should contain email and password (both string).
    - returns an object with user data, along with an jwt authentication token, that can be used for authorization
    ```
    {
        "msg": "User authenticated",
        "user": {
            "_id": "62fcce9677549e48e87b34f4",
            "name": "john",
            "email": "john@doe.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQdsdI2MmZjY2U5Njc3NTQ5ZTQ4ZTg3YjM0ZjQiLCJpYXQiOjE2NjExODIyxxxxV4cCI6MTY2MTE4NTgwOX0.xt7yLVAasdfxhiX_PtkDXaKE-HWFWK7z5ZsNmvjM"
        }
    }
    ```
    - *notice:* jwt token provided in the example is not valid :)
    - 
- **POST** */api/user/* (Public)
    - endpoint for registering a new user
    - request structure (x-www-form-encoded) should contain name, email and password fields(all string)
- **POST** */api/game/* (Private/Authorized)
    - creates a new game
    - authorized through a Bearer token in authorization headers
    - request structure (x-www-form-encoded) should contain:
        - name: string - name of the game
        - description: string - short description/rules if necessary 
        - maxScore : string, optional - a number that represents maximum points in the game.
    - returns a json object that contains user's id, and jwt token for authorization.
    ```
    {
        "_id": "6303ec898ca70ac72a005703",
        "name": "john",
        "email": "john@doe.com",
        "token": "eyJhbGciOiJIUzIYTcwYWM3..."
    }
    ```
- **POST** */api/highscore/:gameId (Private/Authorized)
    - creates a new highscore for the game indicated in url    
    - authorized through a Bearer token in authorization headers
    - request structure (x-www-form-encoded) should contain only the score