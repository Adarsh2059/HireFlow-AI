# 🚀 HireFlow-AI

An AI-powered Applicant Tracking System (ATS) built using the MERN Stack.

HireFlow-AI helps recruiters streamline the hiring process by managing job postings, candidate applications, resume processing, and AI-powered resume screening.

> **Current Progress:** ✅ Phase 4 Completed

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Current Logged-in User API
- Protected Routes
- Role-Based Authorization
- Admin Authorization

---

# 👥 User Roles

### Candidate

- Browse Jobs
- Search Jobs
- Apply for Jobs
- View Applied Jobs
- Withdraw Applications

### Recruiter

- Create Jobs
- Update Jobs
- Delete Jobs
- View Applicants
- Update Application Status

### Admin

- Full Access
- Manage Jobs
- Manage Applications

---

# 💼 Job Management

- Create Job
- Update Job
- Delete Job
- View All Jobs
- View Single Job

---

# 🔎 Advanced Job APIs

- Search by Title
- Search by Company
- Filter by Location
- Filter by Experience
- Filter by Employment Type
- Pagination
- Sorting
- Dashboard Statistics

---

# 📄 Application Management

### Candidate

- Apply for Job
- Prevent Duplicate Applications
- View My Applications
- Withdraw Application

### Recruiter

- View Applicants
- Update Application Status

---

# 🔄 Application Workflow

```

Applied

↓

Screening

↓

Shortlisted

↓

Interview

↓

Selected

↓

Hired

```

Candidates may withdraw before the hiring process is completed.

Recruiters may reject candidates during any intermediate stage.

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Tailwind CSS *(Upcoming)*

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## Authentication

- JWT
- bcrypt

---

## File Handling

- Multer *(Phase 5)*
- Cloudinary *(Phase 5)*
- pdf-parse *(Phase 5)*

---

# 📂 Folder Structure

```
HireFlow-AI/

│── client/

│── server/

│
├── config/

├── constants/
│     └── applicationStatus.js

├── controllers/
│     ├── authController.js
│     ├── jobController.js
│     └── applicationController.js

├── middlewares/

├── models/
│     ├── User.js
│     ├── Job.js
│     └── Application.js

├── routes/

├── utils/

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
├── description
├── location
├── salary
├── experience
├── employmentType
├── requirements
├── recruiter
├── status
├── createdAt
└── updatedAt
```

---

## Applications

```
Application

├── candidate
├── job
├── status
├── resume
├── createdAt
└── updatedAt
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|---------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |
| GET | /api/auth/admin |

---

## Jobs

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/jobs |
| GET | /api/jobs |
| GET | /api/jobs/:id |
| PATCH | /api/jobs/:id |
| DELETE | /api/jobs/:id |
| GET | /api/jobs/dashboard/stats |

---

## Applications

| Method | Endpoint |
|----------|--------------------------------------------|
| POST | /api/applications/:jobId |
| GET | /api/applications/my-applications |
| GET | /api/applications/job/:jobId |
| PATCH | /api/applications/:applicationId/status |
| PATCH | /api/applications/:applicationId/withdraw |

---

# 🔍 Search

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

```
GET /api/jobs?sort=latest
```

```
GET /api/jobs?sort=salary_desc
```

```
GET /api/jobs?sort=salary_asc
```

---

# 📊 Dashboard

```
GET /api/jobs/dashboard/stats
```

Returns

- Total Jobs
- Open Jobs
- Closed Jobs
- Recent Jobs

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Ownership Authorization
- Duplicate Application Prevention
- Closed Job Validation
- Application State Machine
- Global Error Handling

---

# 📚 Concepts Implemented

- Express Routing
- MVC Architecture
- REST APIs
- MongoDB Relationships
- Mongoose Populate
- Nested Populate
- JWT Authentication
- Role-Based Authorization
- State Machine
- Query Parameters
- Search
- Filtering
- Pagination
- Sorting
- Dashboard APIs

---

# 🧪 API Testing

All APIs tested successfully using Postman.

---

# 🚀 Upcoming Features

## Phase 5

- Resume Upload
- Resume Preview
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

- React Frontend
- Candidate Dashboard
- Recruiter Dashboard
- Admin Dashboard

---

## Phase 8

- Deployment
- Docker
- CI/CD
- Production Security

---

# 👨‍💻 Author

**Adarsh Yadav**

GitHub: https://github.com/Adarsh2059/HireFlow-AI