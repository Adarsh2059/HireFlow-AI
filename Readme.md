# 🚀 HireFlow-AI

> **AI-Powered Resume Screening & Interview Platform (MERN + Gemini AI)**

HireFlow-AI is a production-ready MERN-based recruitment platform that streamlines the hiring process using Artificial Intelligence. It enables recruiters to post jobs, manage applications, screen resumes with an ATS engine, and generate AI-powered resume insights and interview questions using Google Gemini.

---

# ✨ Features

## 👤 Authentication & Authorization

- JWT Authentication
- Password Hashing (bcrypt)
- Role-based Access Control
- Candidate
- Recruiter
- Admin
- Protected Routes
- Global Error Handling

---

# 💼 Job Management

Recruiters can

- Create Jobs
- Update Jobs
- Delete Jobs
- Close/Open Jobs

Candidates can

- Browse Jobs
- Search Jobs
- Filter Jobs
- Pagination
- Sorting

---

# 📄 Resume Management

Candidates can

- Upload Resume (PDF)
- Replace Resume
- Delete Resume
- View Uploaded Resume

Backend automatically

- Parses PDF
- Cleans Resume Text
- Uploads Resume to Cloudinary
- Stores Resume Metadata
- Stores Extracted Resume Text

---

# 📋 Application Management

Candidates

- Apply for Jobs
- Prevent Duplicate Applications
- Withdraw Applications
- View My Applications

Recruiters

- View Applicants
- Update Application Status
- Track Hiring Pipeline

---

# 🔄 ATS Workflow

Applications follow a controlled state machine.

```
Applied
    │
    ▼
Screening
    │
    ▼
Shortlisted
    │
    ▼
Interview
    │
    ▼
Selected
    │
    ▼
Hired
```

Rejected can occur from any valid stage.

Withdrawn is only allowed by the candidate.

---

# 🤖 AI Resume Analysis Engine

HireFlow-AI includes a rule-based ATS engine that extracts and analyzes resumes before sending structured information to Gemini.

## Resume Parsing

- PDF Parsing
- Resume Cleaning
- Section Detection

---

## Resume Sections

Automatically detects

- Contact
- Profile Summary
- Skills
- Education
- Experience
- Projects
- Certifications
- Achievements

---

## Resume Analysis

Analyzes

- Contact Information
- Skills
- Education
- Experience
- Projects

Extracts

- Technical Skills
- Degree
- Graduation Year
- CGPA
- Projects
- Technologies Used

---

## ATS Engine

Calculates

- Resume Completeness
- Skill Match
- Resume vs Job Match
- Missing Skills
- ATS Score

---

## Resume Feedback

Generates

- Strengths
- Weaknesses
- Suggestions

---

# 🧠 Gemini AI Integration

Gemini is **not** used for scoring resumes.

Instead, HireFlow-AI first performs deterministic ATS analysis and then sends structured data to Gemini.

This architecture ensures:

- Consistent Results
- Explainable ATS Score
- Reduced Hallucinations
- Production-Friendly AI Pipeline

---

## AI Resume Summary

Generates

- Professional Candidate Summary
- Recruiter-friendly Overview

---

## AI Resume Review

Provides

- Overall Resume Rating
- Strengths
- Weaknesses
- Suggestions

---

## AI Interview Question Generator

Generates

- Technical Questions
- Project-Based Questions
- Behavioral Questions
- HR Questions

Questions are personalized using

- Resume
- Skills
- Projects
- Job Description

---

# 🏗️ Architecture

```
                  Resume PDF
                      │
                      ▼
               Resume Parser
                      │
                      ▼
           Resume Text Extraction
                      │
                      ▼
           Rule-Based ATS Engine
          ┌───────────┴────────────┐
          ▼                        ▼
 Resume Analysis            Job Matching
          │                        │
          └───────────┬────────────┘
                      ▼
                ATS Score
                      │
                      ▼
              Gemini AI Layer
      ┌──────────┬─────────────┬──────────────┐
      ▼          ▼             ▼
 Resume      Resume      Interview
 Summary      Review      Questions
```

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication

- JWT
- bcrypt

---

## File Upload

- Multer
- Cloudinary

---

## Resume Parsing

- pdf-parse

---

## AI

- Google Gemini API
- @google/genai

---

## Utilities

- dotenv
- cors
- streamifier

---

# 📂 Folder Structure

```
server
│
├── config
│   ├── db.js
│   ├── cloudinary.js
│   └── gemini.js
│
├── constants
│   ├── applicationStatus.js
│   └── skills.js
│
├── controllers
│   ├── authController.js
│   ├── jobController.js
│   ├── applicationController.js
│   ├── resumeController.js
│   └── atsController.js
│
├── middlewares
│   ├── authMiddleware.js
│   ├── upload.js
│   └── errorHandler.js
│
├── models
│   ├── User.js
│   ├── Job.js
│   └── Application.js
│
├── routes
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   ├── applicationRoutes.js
│   ├── resumeRoutes.js
│   └── atsRoutes.js
│
├── services
│   └── geminiService.js
│
├── utils
│   ├── ats
│   ├── parseResume.js
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── ...
│
├── app.js
├── server.js
└── package.json
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|---------------------------|----------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | User Profile |

---

## Jobs

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/jobs |
| GET | /api/jobs |
| GET | /api/jobs/:id |
| PUT | /api/jobs/:id |
| DELETE | /api/jobs/:id |

---

## Applications

| Method | Endpoint |
|----------|-------------------------------------------|
| POST | /api/applications/apply/:jobId |
| GET | /api/applications/my |
| GET | /api/applications/job/:jobId |
| PUT | /api/applications/status/:applicationId |
| PUT | /api/applications/withdraw/:applicationId |

---

## Resume

| Method | Endpoint |
|----------|---------------------------|
| POST | /api/resume/upload |
| GET | /api/resume |
| DELETE | /api/resume |

---

## ATS

| Method | Endpoint |
|----------|--------------------------------|
| POST | /api/ats/analyze/:jobId |

Returns

- Resume Analysis
- ATS Score
- Resume Review
- Job Match
- AI Resume Summary
- AI Interview Questions

---

# ⚙️ Environment Variables

```
PORT=

MONGODB_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

GEMINI_API_KEY=
```

---

# 🚀 Installation

Clone Repository

```bash
git clone https://github.com/yourusername/HireFlow-AI.git
```

Install Dependencies

```bash
npm install
```

Start Server

```bash
npm run dev
```

---

# ✅ Completed Phases

## Phase 1

Backend Setup

- Express
- MongoDB
- Error Handling

---

## Phase 2

Authentication

- JWT
- bcrypt
- Role-based Access

---

## Phase 3

Jobs

- CRUD
- Search
- Filters
- Pagination

---

## Phase 4

Applications

- Apply
- Withdraw
- Recruiter Workflow
- ATS State Machine

---

## Phase 5

Resume Module

- Cloudinary Upload
- PDF Parsing
- Resume Storage
- Resume Retrieval

---

## Phase 6

AI Engine

### Rule-Based ATS

- Resume Parsing
- Section Extraction
- Skill Extraction
- ATS Score
- Resume Feedback
- Resume vs Job Matching

### Gemini AI

- Resume Summary
- Resume Review
- Interview Question Generation

---

# 📈 Current Status

| Module | Status |
|----------|--------|
| Backend | ✅ Complete |
| Authentication | ✅ Complete |
| Jobs | ✅ Complete |
| Applications | ✅ Complete |
| Resume Module | ✅ Complete |
| ATS Engine | ✅ Complete |
| Gemini AI | ✅ Complete |
| Frontend | 🚧 In Progress |
| Deployment | ⏳ Pending |

---

# 🔮 Future Enhancements

- React Frontend
- Recruiter Dashboard
- Candidate Dashboard
- Analytics Dashboard
- Email Notifications
- Interview Scheduling
- Deployment (Render + Vercel)
- Docker Support
- CI/CD Pipeline

---

# 👨‍💻 Author

**Adarsh Yadav**

Computer Science Engineering Student

VIT Bhopal University

---

# ⭐ Project Highlights

- Production-ready MERN Architecture
- AI-powered Resume Screening
- Rule-Based ATS Engine
- Google Gemini Integration
- Resume Parsing Pipeline
- Recruiter Workflow Management
- Interview Question Generation
- Modular & Scalable Backend Design