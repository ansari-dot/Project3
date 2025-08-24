# Get Involved Forms API Documentation

This document describes the RESTful APIs for the three forms in the "Get Involved" page: Volunteer Registration, Sponsorship Interest, and Partnership Inquiry.

## Base URL
```
http://localhost:4000/api
```

## Authentication
- **Public Forms**: No authentication required for form submissions
- **Admin Access**: JWT token required for viewing and managing submissions

## 1. Volunteer Registration

### Create Volunteer Application
**POST** `/volunteer/add`

**Request Body:**
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "areasOfInterest": ["string"] (required - array),
  "availability": "string (required)",
  "timeCommitment": "string (optional)",
  "whyJoin": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Volunteer registered successfully",
  "data": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "areasOfInterest": ["string"],
    "availability": "string",
    "timeCommitment": "string",
    "whyJoin": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get All Volunteers (Admin Only)
**GET** `/volunteer/get`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "areasOfInterest": ["string"],
      "availability": "string",
      "timeCommitment": "string",
      "whyJoin": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Delete Volunteer (Admin Only)
**DELETE** `/volunteer/delete/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Volunteer deleted successfully"
}
```

## 2. Sponsorship Interest

### Create Sponsorship Application
**POST** `/sponsorship/add`

**Request Body:**
```json
{
  "organizationName": "string (required)",
  "contactPerson": "string (optional)",
  "email": "string (required)",
  "phone": "string (optional)",
  "programsOfInterest": ["string"] (required - array),
  "sponsorshipLevel": "string (optional)",
  "duration": "string (optional)",
  "additionalInfo": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sponsorship created successfully",
  "data": {
    "_id": "string",
    "organizationName": "string",
    "contactPerson": "string",
    "email": "string",
    "phone": "string",
    "programsOfInterest": ["string"],
    "sponsorshipLevel": "string",
    "duration": "string",
    "additionalInfo": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get All Sponsorships (Admin Only)
**GET** `/sponsorship/get`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "organizationName": "string",
      "contactPerson": "string",
      "email": "string",
      "phone": "string",
      "programsOfInterest": ["string"],
      "sponsorshipLevel": "string",
      "duration": "string",
      "additionalInfo": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Delete Sponsorship (Admin Only)
**DELETE** `/sponsorship/delete/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Sponsorship deleted successfully"
}
```

## 3. Partnership Inquiry

### Create Partnership Application
**POST** `/partnership/add`

**Request Body:**
```json
{
  "organizationName": "string (required)",
  "organizationType": "string (optional)",
  "contactPerson": "string (required)",
  "position": "string (optional)",
  "email": "string (required)",
  "phone": "string (optional)",
  "partnershipTypes": ["string"] (required - array),
  "description": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Partnership created successfully",
  "data": {
    "_id": "string",
    "organizationName": "string",
    "organizationType": "string",
    "contactPerson": "string",
    "position": "string",
    "email": "string",
    "phone": "string",
    "partnershipTypes": ["string"],
    "description": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get All Partnerships (Admin Only)
**GET** `/partnership/get`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "organizationName": "string",
      "organizationType": "string",
      "contactPerson": "string",
      "position": "string",
      "email": "string",
      "phone": "string",
      "partnershipTypes": ["string"],
      "description": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Delete Partnership (Admin Only)
**DELETE** `/partnership/delete/:id`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Partnership deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "error": "Error details"
}
```

### 401 Unauthorized
```json
{
  "message": "Please login first"
}
```

### 403 Forbidden
```json
{
  "message": "Only admin can view all submissions"
}
```

### 404 Not Found
```json
{
  "message": "Submission not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details"
}
```

## Frontend Integration

The frontend forms are located in `client/src/pages/GetInvolvedPage.jsx` and include:

1. **Form State Management**: Each form has its own state using React useState
2. **API Integration**: Forms submit data to the backend using axios
3. **Validation**: Required fields are validated on both frontend and backend
4. **User Feedback**: Toast notifications for success/error messages
5. **Form Reset**: Forms are cleared after successful submission

## Admin Panel

The admin panel for managing submissions is located in `client/src/Admin/GetInvolved.jsx` and includes:

1. **Tabbed Interface**: Separate tabs for each form type
2. **Submission List**: View all submissions with key information
3. **Detailed View**: Modal to view complete submission details
4. **Delete Functionality**: Remove submissions (admin only)
5. **Real-time Updates**: Refresh data functionality

## Database Schema

### Volunteer Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required),
  phone: String (optional),
  areasOfInterest: [String] (required),
  availability: String (required),
  timeCommitment: String (optional),
  whyJoin: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Sponsorship Schema
```javascript
{
  organizationName: String (required),
  contactPerson: String (optional),
  email: String (required),
  phone: String (optional),
  programsOfInterest: [String] (required),
  sponsorshipLevel: String (optional),
  duration: String (optional),
  additionalInfo: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Partnership Schema
```javascript
{
  organizationName: String (required),
  organizationType: String (optional),
  contactPerson: String (required),
  position: String (optional),
  email: String (required),
  phone: String (optional),
  partnershipTypes: [String] (required),
  description: String (required),
  createdAt: Date,
  updatedAt: Date
}
```
