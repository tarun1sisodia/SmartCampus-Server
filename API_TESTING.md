# SmartCampus Server - API Testing Guide

## Prerequisites

You need to have MongoDB running locally or provide a MongoDB connection string in `.env` file.

## Testing with cURL

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

Expected Response:
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "createdAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully",
  "success": true
}
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Get Current User (Protected Route)
```bash
# Replace YOUR_TOKEN with the token received from login/register
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Testing with Postman/Thunder Client

Import the following collection:

### Collection: SmartCampus API

#### 1. Health Check
- Method: GET
- URL: `http://localhost:5000/api/health`

#### 2. Register
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Headers:
  - Content-Type: application/json
- Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### 3. Login
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Headers:
  - Content-Type: application/json
- Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 4. Get Me (Protected)
- Method: GET
- URL: `http://localhost:5000/api/auth/me`
- Headers:
  - Authorization: Bearer YOUR_JWT_TOKEN

## Error Scenarios

### Validation Errors
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email",
    "password": "123"
  }'
```

Response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 2 and 50 characters"
    },
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Duplicate Email
```bash
# Try registering with the same email twice
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

### Invalid Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

Response:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Unauthorized Access
```bash
curl http://localhost:5000/api/auth/me
```

Response:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```bash
curl http://localhost:5000/api/nonexistent
```

Response:
```json
{
  "success": false,
  "message": "Route /api/nonexistent not found"
}
```

## Testing Flow

1. Start the server: `npm run dev`
2. Check server health: GET `/api/health`
3. Register a new user: POST `/api/auth/register`
4. Copy the token from the response
5. Use the token to access protected routes: GET `/api/auth/me`
6. Test login: POST `/api/auth/login`
7. Test various error scenarios

## Notes

- All API responses follow a consistent format
- Protected routes require JWT token in Authorization header
- Tokens expire based on JWT_EXPIRE setting in .env (default: 7 days)
- Rate limiting: 100 requests per 15 minutes per IP
- Request body size limit: 10MB
