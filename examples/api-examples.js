// Example usage of the SmartCampus Server API
// This file demonstrates how to interact with the API using JavaScript/Node.js

const baseUrl = 'http://localhost:5000';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, config);
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Example 1: Register a new user
async function registerUser() {
  console.log('\n=== Register User ===');
  
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'student',
  };

  const result = await apiCall('/api/auth/register', 'POST', userData);
  console.log('Status:', result.status);
  console.log('Response:', JSON.stringify(result.data, null, 2));
  
  return result.data.data.token;
}

// Example 2: Login user
async function loginUser() {
  console.log('\n=== Login User ===');
  
  const credentials = {
    email: 'john@example.com',
    password: 'password123',
  };

  const result = await apiCall('/api/auth/login', 'POST', credentials);
  console.log('Status:', result.status);
  console.log('Response:', JSON.stringify(result.data, null, 2));
  
  return result.data.data.token;
}

// Example 3: Get current user (protected route)
async function getCurrentUser(token) {
  console.log('\n=== Get Current User ===');
  
  const result = await apiCall('/api/auth/me', 'GET', null, token);
  console.log('Status:', result.status);
  console.log('Response:', JSON.stringify(result.data, null, 2));
}

// Example 4: Test validation errors
async function testValidationErrors() {
  console.log('\n=== Test Validation Errors ===');
  
  const invalidData = {
    name: 'A', // Too short
    email: 'invalid-email', // Invalid format
    password: '123', // Too short
  };

  const result = await apiCall('/api/auth/register', 'POST', invalidData);
  console.log('Status:', result.status);
  console.log('Response:', JSON.stringify(result.data, null, 2));
}

// Example 5: Test unauthorized access
async function testUnauthorizedAccess() {
  console.log('\n=== Test Unauthorized Access ===');
  
  const result = await apiCall('/api/auth/me', 'GET');
  console.log('Status:', result.status);
  console.log('Response:', JSON.stringify(result.data, null, 2));
}

// Main execution flow
async function main() {
  try {
    console.log('SmartCampus Server API Examples');
    console.log('================================');
    
    // Test 1: Register
    const registerToken = await registerUser();
    
    // Test 2: Login
    const loginToken = await loginUser();
    
    // Test 3: Get current user
    await getCurrentUser(loginToken);
    
    // Test 4: Validation errors
    await testValidationErrors();
    
    // Test 5: Unauthorized access
    await testUnauthorizedAccess();
    
    console.log('\n=== All Examples Completed ===\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Uncomment to run (requires server to be running and fetch API or node-fetch)
// main();

module.exports = {
  apiCall,
  registerUser,
  loginUser,
  getCurrentUser,
  testValidationErrors,
  testUnauthorizedAccess,
};
