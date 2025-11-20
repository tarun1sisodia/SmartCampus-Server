# SmartCampus-Server

A comprehensive Node.js/Express server for SmartCampus with complete authentication, error handling, and API management.

## Features

- ✅ Complete Node.js/Express server setup
- ✅ MongoDB database integration with Mongoose
- ✅ JWT-based authentication (login/register)
- ✅ Secure password hashing with bcryptjs
- ✅ Standardized API response handlers
- ✅ Centralized error handling
- ✅ Async handler wrapper for cleaner code
- ✅ Request validation with express-validator
- ✅ Security best practices (Helmet, CORS, Rate Limiting)
- ✅ Environment-based configuration
- ✅ User roles (student, faculty, admin)

## Project Structure

```
SmartCampus-Server/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   └── authController.js    # Authentication logic
│   ├── middlewares/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── errorHandler.js      # Error handling middleware
│   │   ├── validate.js          # Validation middleware
│   │   └── validators/
│   │       └── authValidator.js # Auth validation rules
│   ├── models/
│   │   └── User.js              # User model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes
│   │   └── index.js             # Route aggregator
│   └── utils/
│       ├── ApiError.js          # Custom error class
│       ├── ApiResponse.js       # Standardized response
│       └── asyncHandler.js      # Async wrapper
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── server.js                    # Entry point

```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SmartCampus-Server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartcampus
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## API Endpoints

### Public Endpoints

#### Health Check
```http
GET /api/health
```

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // optional: student, faculty, admin
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Requires Authentication)

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Success message",
  "data": {
    // response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    // validation errors if any
  ]
}
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable Cross-Origin Resource Sharing
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes per IP)
- **JWT**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Centralized error management

## Error Handling

The server includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors (duplicate keys, validation)
- JWT errors (invalid/expired tokens)
- 404 Not Found
- General server errors

## User Roles

- **student**: Default role for new users
- **faculty**: For teaching staff
- **admin**: For administrative access

## Development

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Add validation rules in `src/middlewares/validators/`
4. Register route in `src/routes/index.js`

### Adding Protected Routes

Use the `protect` middleware:
```javascript
const { protect } = require('../middlewares/auth');

router.get('/protected-route', protect, controller);
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| CORS_ORIGIN | Allowed CORS origin | * |

## Dependencies

### Production
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `dotenv`: Environment configuration
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `cors`: CORS middleware
- `helmet`: Security headers
- `express-rate-limit`: Rate limiting
- `express-validator`: Request validation

### Development
- `nodemon`: Auto-reload during development

## License

ISC
