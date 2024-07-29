API Endpoints
Authentication
Register User

Endpoint: POST /api/auth/signup
Body:
json
Copy code
{
  "username": "user",
  "password": "password"
}
Response:
json
Copy code
{
  "token": "your_jwt_token"
}
Login User

Endpoint: POST /api/auth/login
Body:
json
Copy code
{
  "username": "user",
  "password": "password"
}
Response:
json
Copy code
{
  "token": "your_jwt_token"
}
Books
Get All Books

Endpoint: GET /api/books
Query Parameters: page (number) and limit (number) for pagination.
Response:
json
Copy code
[
  {
    "title": "Book Title",
    "author": "Author ID",
    "publicationYear": 2020,
    "genre": "Genre"
  }
]
Add a New Book

Endpoint: POST /api/books
Body:
json
Copy code
{
  "title": "Book Title",
  "author": "Author ID",
  "publicationYear": 2020,
  "genre": "Genre"
}
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "title": "Book Title",
  "author": "Author ID",
  "publicationYear": 2020,
  "genre": "Genre"
}
Update a Book

Endpoint: PUT /api/books/:id
Body:
json
Copy code
{
  "title": "Updated Title",
  "author": "Updated Author ID",
  "publicationYear": 2021,
  "genre": "Updated Genre"
}
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "title": "Updated Title",
  "author": "Updated Author ID",
  "publicationYear": 2021,
  "genre": "Updated Genre"
}
Delete a Book

Endpoint: DELETE /api/books/:id
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "message": "Book deleted"
}
Authors
Get All Authors

Endpoint: GET /api/authors
Response:
json
Copy code
[
  {
    "name": "Author Name"
  }
]
Add a New Author

Endpoint: POST /api/authors
Body:
json
Copy code
{
  "name": "Author Name"
}
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "name": "Author Name"
}
Update an Author

Endpoint: PUT /api/authors/:id
Body:
json
Copy code
{
  "name": "Updated Author Name"
}
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "name": "Updated Author Name"
}
Delete an Author

Endpoint: DELETE /api/authors/:id
Headers: { "x-auth-token": "your_jwt_token" }
Response:
json
Copy code
{
  "message": "Author deleted"
}
Protected Routes
Admin Route
Endpoint: GET /api/admin
Headers: { "x-auth-token": "your_jwt_token" }
Roles Required: Admin
Response:
json
Copy code
{
  "message": "Admin route accessed"
}
Security Practices
Password Storage
Hashing Passwords: Passwords are hashed using bcryptjs before storing them in the database to protect against unauthorized access.
Salting: bcrypt automatically adds a salt to passwords to ensure unique hashes for identical passwords.
JWT (JSON Web Tokens)
Generating JWT:

Payload: Contains user information and claims.
Signing: Tokens are signed using a secret key to create a secure token.
Expiration: Tokens are set to expire after a specified duration (e.g., 1 hour).
Example Code:

javascript
Copy code
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
Validating JWT:

Extract Token: Retrieve the JWT from the request.
Verify Token: Use the secret key to validate the token’s authenticity and decode it.
Example Code:

javascript
Copy code
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
