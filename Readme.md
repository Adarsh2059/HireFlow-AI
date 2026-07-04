# 🚀 HireFlow-AI

An AI-powered Applicant Tracking System (ATS) built using the MERN Stack. HireFlow-AI streamlines the recruitment process by allowing recruiters to post jobs, manage applications, and leverage AI for resume screening and interview preparation.

> **Current Status:** ✅ Phase 3 Completed (Professional Job Management APIs)

---

# ✨ Features Implemented

## 🔐 Authentication & Authorization

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Current Logged-in User API
- Role-Based Authorization
- Admin-only Routes

---

## 💼 Job Management

### Recruiter/Admin

- Create Job
- Update Job
- Delete Job

### Public APIs

- View All Jobs
- View Job Details

---

## 🔍 Advanced Job APIs

- Search Jobs
- Filter by Location
- Filter by Employment Type
- Filter by Experience
- Pagination
- Sorting
- Recruiter Dashboard Statistics

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS *(Frontend Coming Soon)*

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcrypt

## File Handling

- Multer *(Upcoming)*
- Cloudinary *(Upcoming)*
- pdf-parse *(Upcoming)*

---

# 📂 Project Structure

```
HireFlow-AI/

│── client/

│── server/
│
├── config/
├── controllers/
│     ├── authController.js
│     └── jobController.js
│
├── middlewares/
│     ├── authMiddleware.js
│     ├── authorize.js
│     └── errorHandler.js
│
├── models/
│     ├── User.js
│     └── Job.js
│
├── routes/
│     ├── authRoutes.js
│     └── jobRoutes.js
│
├── utils/
│
├── app.js
├── server.js
└── .env
```

---

# 🗄 Database Collections

## Users

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

## Jobs

```
Job

├── title
├── company
├── location
├── description
├── requirements
├── salary
├── employmentType
├── experience
├── status
├── recruiter
├── createdAt
└── updatedAt
```

---

# 🔐 Authentication Flow

```
Register

↓

Hash Password

↓

Store User

↓

Login

↓

Verify Password

↓

Generate JWT

↓

Authentication Middleware

↓

Authorization Middleware

↓

Protected Routes
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|--------------------|---------------------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Current Logged-in User |
| GET | /api/auth/admin | Admin Route |

---

## Jobs

| Method | Endpoint | Description |
|----------|--------------------------|-----------------------------|
| POST | /api/jobs | Create Job |
| GET | /api/jobs | Get All Jobs |
| GET | /api/jobs/:id | Get Single Job |
| PATCH | /api/jobs/:id | Update Job |
| DELETE | /api/jobs/:id | Delete Job |
| GET | /api/jobs/dashboard/stats | Dashboard Statistics |

---

# 🔎 Search API

Example

```
GET /api/jobs?search=react
```

---

# 📍 Filters

```
GET /api/jobs?location=Remote
```

```
GET /api/jobs?employmentType=Internship
```

```
GET /api/jobs?experience=Fresher
```

---

# 📄 Pagination

```
GET /api/jobs?page=1&limit=10
```

---

# ↕ Sorting

Latest

```
GET /api/jobs?sort=latest
```

Highest Salary

```
GET /api/jobs?sort=salary_desc
```

Lowest Salary

```
GET /api/jobs?sort=salary_asc
```

---

# 📊 Dashboard API

```
GET /api/jobs/dashboard/stats
```

Returns

- Total Jobs
- Open Jobs
- Closed Jobs
- Recent Jobs

---

# 🔑 Roles

| Role | Permissions |
|--------|----------------------------------------|
| Candidate | View Jobs |
| Recruiter | Manage Jobs |
| Admin | Manage Everything |

---

# 🛡 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Ownership Authorization
- Global Error Handling
- Standard API Responses

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Adarsh2059/HireFlow-AI.git
```

Move into the project

```bash
cd HireFlow-AI
```

---

## Backend

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=your_connection_string

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# 📚 Concepts Implemented

- Express Routing
- Controllers
- Middleware
- MongoDB Relationships
- Mongoose Populate
- JWT Authentication
- Role-Based Authorization
- Ownership Authorization
- Search using Regex
- Query Parameters
- Pagination
- Sorting
- Dashboard Statistics
- REST APIs

---

# 🧪 API Testing

Tested using Postman

- Register
- Login
- Create Job
- Get Jobs
- Search Jobs
- Filter Jobs
- Pagination
- Sorting
- Update Job
- Delete Job
- Dashboard Statistics

---

# 🚀 Upcoming Features

## Phase 4

- Candidate Applications
- Prevent Duplicate Applications
- Application Status
- Recruiter Applicant Management

---

## Phase 5

- Resume Upload
- Cloudinary Integration
- PDF Parsing

---

## Phase 6

- AI Resume Screening
- ATS Score
- Resume Ranking
- Skill Gap Analysis
- AI Interview Questions

---

## Phase 7

- React Dashboard
- Candidate Dashboard
- Recruiter Dashboard

---

## Phase 8

- Deployment
- Docker
- CI/CD
- Production Security

---

# 👨‍💻 Author

**Adarsh Yadav**

GitHub: https://github.com/Adarsh2059

---

⭐ If you like this project, consider giving it a star!