# Library API

## Description
A simple library management API with user authentication and role-based access control. The API allows users to register, log in, and manage books and authors, with access restrictions based on user roles.

## Features
- **User Authentication**: Register and log in users using JSON Web Tokens (JWT).
- **Protected Routes**: Access restricted endpoints based on user roles.
- **Role-Based Access Control**: Different access levels for users and admins.
- **CRUD Operations**: Manage books and authors in the library system.
- **Pagination**: List books with pagination support.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. [Download Node.js](https://nodejs.org/).
- **MongoDB**: Ensure you have MongoDB installed and running. [Download MongoDB](https://www.mongodb.com/try/download/community).

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd library-api


2. **Install Dependencies**
   ```bash
   npm install

3. **Create a .env file and include secret variables**
    MONGO_URI=???
    JWT_SECRET=qUiWUnhmyq
    PORT=5000

4. **Seed the Database (Optional)**
    ```bash
    npm run seed

5.  **Start the server**
     ```bash
     npm run dev






## API Endpoints
 ## Authentication
 ### Register User

 Endpoint: POST /api/auth/signup
Body:

{
  "username": "user",
  "password": "password"
}

Response:
{
  "token": "your_jwt_token"
}

### Login User

Endpoint: POST /api/auth/login
Body:
{
  "username": "user",
  "password": "password"
}

Response:

{
  "token": "your_jwt_token"
}

### Books
### Get All Books

Endpoint: GET /api/books
Query Parameters: page (number) and limit (number) for pagination.
Response:
[
  {
    "title": "Book Title",
    "author": "Author ID",
    "publicationYear": 2020,
    "genre": "Genre"
  }
]

### Add a New Book

Endpoint: POST /api/books
Body:
{
  "title": "Book Title",
  "author": "Author ID",
  "publicationYear": 2020,
  "genre": "Genre"
}
Headers: { "x-auth-token": "your_jwt_token" }

Response:
{
  "title": "Book Title",
  "author": "Author ID",
  "publicationYear": 2020,
  "genre": "Genre"
}

### Update a Book

Endpoint: PUT /api/books/:id
Body:
json

code
{
  "title": "Updated Title",
  "author": "Updated Author ID",
  "publicationYear": 2021,
  "genre": "Updated Genre"
}
Headers: { "x-auth-token": "your_jwt_token" }

Response:

code
{
  "title": "Updated Title",
  "author": "Updated Author ID",
  "publicationYear": 2021,
  "genre": "Updated Genre"
}

### Delete a Book

Endpoint: DELETE /api/books/:id
Headers: { "x-auth-token": "your_jwt_token" }
Response:

json
code
{
  "message": "Book deleted"
}

## Authors
### Get All Authors

Endpoint: GET /api/authors
Response:
json
code
[
  {
    "name": "Author Name"
  }
]

### Add a New Author

Endpoint: POST /api/authors
Body:
json
code
{
  "name": "Author Name"
}
Headers: { "x-auth-token": "your_jwt_token" }
Response:

{
  "name": "Author Name"
}

### Update an Author

Endpoint: PUT /api/authors/:id
Body:
json
{
  "name": "Updated Author Name"
}

Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
{
  "name": "Updated Author Name"
}

### Delete an Author

Endpoint: DELETE /api/authors/:id
Headers: { "x-auth-token": "your_jwt_token" }
Response:
{
  "message": "Author deleted"
}



# Security Practices

## Password Storage
 
 ### Hashing Passwords: 
 Passwords are hashed using bcryptjs before storing them in the database to protect against unauthorized access.
### Salting: 
bcrypt automatically adds a salt to passwords to ensure unique hashes for identical passwords.

## JWT (JSON Web Tokens)
 ### Generating JWT:

Payload: Contains user information and claims.
Signing: Tokens are signed using a secret key to create a secure token.
Expiration: Tokens are set to expire after a specified duration (e.g., 1 hour).
Example Code:

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
Validating JWT:

Extract Token: Retrieve the JWT from the request.
Verify Token: Use the secret key to validate the token’s authenticity and decode it.
Example Code:

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  req.user = decoded.user;
  next();
});

Role-Based Access Control (RBAC)
Define Roles: Assign roles (e.g., user, admin) to users based on their permissions.

Role Checking Middleware: Create middleware to check the user’s role before granting access to specific routes.

Example Middleware:

javascript
Copy code
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}
Example Route Usage:

javascript
Copy code
app.get('/api/admin', authMiddleware, checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});
