# 🚀 HireFlow-AI

An AI-powered Applicant Tracking System (ATS) built using the MERN Stack. HireFlow-AI helps recruiters manage job postings, screen resumes, and automate candidate evaluation using AI.

> **Current Status:** Phase 2 Completed ✅ (Authentication & Role-Based Authorization)

---

# 📌 Features Completed

### Authentication
- ✅ User Registration
- ✅ User Login
- ✅ Password Hashing using bcrypt
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Current Logged-in User API
- ✅ Role-Based Authorization
- ✅ Global Error Handling
- ✅ Standard API Response Structure

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS *(Coming Soon)*

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication
- JWT (JSON Web Token)
- bcrypt

## Tools
- Postman
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
HireFlow-AI/

│── client/
│
│── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

# 🗄 Database

Current Collection

```
users
```

User Schema

```
User

├── name
├── email
├── password
├── role
├── avatar
├── isVerified
├── createdAt
└── updatedAt
```

---

# 🔐 Authentication Flow

```
Register

↓

Validate User

↓

Hash Password

↓

Save User

↓

Generate JWT

↓

Login

↓

Verify Password

↓

Generate JWT

↓

Protected Routes

↓

Authentication Middleware

↓

Authorization Middleware
```

---

# 📡 API Endpoints

## Register

```
POST /api/auth/register
```

Request

```json
{
    "name":"Adarsh",
    "email":"adarsh@gmail.com",
    "password":"Adarsh@123",
    "role":"candidate"
}
```

---

## Login

```
POST /api/auth/login
```

Request

```json
{
    "email":"adarsh@gmail.com",
    "password":"Adarsh@123"
}
```

---

## Current User

```
GET /api/auth/me
```

Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Admin Route

```
GET /api/auth/admin
```

Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🔑 Roles

| Role | Permissions |
|------|-------------|
| Candidate | Register, Login, View Profile |
| Recruiter | Coming Soon |
| Admin | Access Admin Routes |

---

# 🔒 Security Features

- Password hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Global Error Handling
- Standard API Responses
- Password removed from API responses

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Adarsh2059/HireFlow-AI.git
```

Move into project

```bash
cd HireFlow-AI
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🧪 API Testing

The APIs were tested using **Postman**.

Authentication endpoints tested:

- Register User
- Login User
- Get Current User
- Admin Route
- Invalid Credentials
- Missing Token
- Invalid Token

---

# 📖 Concepts Implemented

- REST APIs
- Express Routing
- Controllers
- Middleware
- JWT Authentication
- Role-Based Authorization (RBAC)
- MongoDB Models
- Password Hashing
- API Error Handling
- API Response Standardization

---

# 🚧 Upcoming Features (Phase 3)

- Recruiter Dashboard
- Candidate Dashboard
- Job CRUD APIs
- Job Applications
- Resume Upload
- PDF Parsing
- Resume Management

---

# 🤖 Upcoming AI Features

- Resume Parsing
- ATS Score Calculation
- Resume Ranking
- AI Resume Feedback
- Interview Question Generation
- Candidate Skill Analysis

---

# 📈 Project Roadmap

- ✅ Phase 1 – Project Setup
- ✅ Phase 2 – Authentication & Authorization
- 🔄 Phase 3 – Job Management
- ⏳ Phase 4 – Resume Upload
- ⏳ Phase 5 – AI Resume Screening
- ⏳ Phase 6 – Interview Module
- ⏳ Phase 7 – Deployment

---

# 👨‍💻 Author

**Adarsh Yadav**

GitHub: https://github.com/Adarsh2059

---

## ⭐ If you find this project useful, don't forget to star the repository!