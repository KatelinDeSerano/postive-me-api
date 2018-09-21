Server API for PositiveMe client.

Create - Create Journal Entry

Read - Get a list of all Journal Entries for logged in User

Update - Update Journal Entry

Delete - Delete Journal Entry


Built With

Back End

-Node.js

-Mongo

-Mongoose

-Express

-JWT Authentication


DevOps

-Heroku

-TravisCI


Using the API

Authentication / Login


POST    	/api/auth/login

Bearer Authentication with JSON Web Token

Must supply valid Username and Password in request header
If authentication succeeds, a valid 7d expiry JWT will be provided in response body


Register New User

POST    	/api/users

Must supply First name, Last name, Username and Password in request body

If successful, a valid 7d expiry JWT will be provided in response body


Get All Journal Entries

GET    	/api/positive-me/{USER}

This endpoint retrieves all journal entries from user database
Must supply valid JWT via Bearer Authentication
If authentication succeeds, all properties will be returned


Create Journal Entry

POST       /api/positive-me/{JOURNAL-ENTRY-ID}

This endpoint adds a single journal entry to user database
Supply property object in request body
Must supply valid JWT via Bearer Authentication


Update Journal Entry

PUT       /api/positive-me/{JOURNAL-ENTRY-ID}

This endpoint updates a journal entry in user database
Supply journal entry ID as route parameter
Supply journal entry object in request body
Must supply valid JWT via Bearer Authentication


Delete Journal Entry

DELETE       /api/positive-me/{JOURNAL-ENTRY-ID}

This endpoint deletes a journal entry from user database
Supply journal entry ID as route parameter
Must supply valid JWT via Bearer Authentication

