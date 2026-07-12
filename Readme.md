<div align="center">

# 🚀 HireFlow-AI

### AI-Powered Recruitment & Applicant Tracking System

*Streamlining hiring with intelligent resume analysis, ATS scoring, and a seamless recruiter-candidate experience.*

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-informational?style=for-the-badge&logo=mongodb&logoColor=white&color=47A248)](#-tech-stack)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-informational?style=for-the-badge&logo=google&logoColor=white&color=4285F4)](#-tech-stack)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#-license)
[![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](#)

[Live Demo](#) · [Report Bug](https://github.com/Adarsh2059/HireFlow-AI/issues) · [Request Feature](https://github.com/Adarsh2059/HireFlow-AI/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [How the AI Pipeline Works](#-how-the-ai-pipeline-works)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Overview](#-api-overview)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Author](#-author)
- [License](#-license)

---

## 📌 About the Project

**HireFlow-AI** is a full-stack recruitment platform that reimagines the traditional hiring workflow by combining a modern **MERN stack** application with **Google Gemini AI**. It gives candidates a smooth way to discover jobs, submit tailored applications, and instantly understand how well their resume matches a role — while giving recruiters an intelligent dashboard to rank, filter, and evaluate applicants without manually reading every resume.

Instead of a generic "apply and wait" flow, HireFlow-AI generates a real **ATS (Applicant Tracking System) report** for every application — scoring resumes against the job description, surfacing matched/missing skills, and even preparing **personalized interview questions** for recruiters to use.

> Built to demonstrate practical, production-style use of AI in a real business workflow — not just a chatbot wrapper.

---

## ✨ Core Features

### 👤 Candidate Portal
| Feature | Description |
|---|---|
| 🔐 Authentication | Secure JWT-based signup/login |
| 📄 Resume Upload | Upload resumes via Cloudinary storage |
| 🧾 Resume Snapshot | Each application stores a snapshot of the resume used, preserving history even if the resume is later updated |
| 📥 Apply & Withdraw | Apply to jobs or withdraw applications anytime |
| 📊 ATS Report Access | View AI-generated match score, skill gaps, and resume feedback |
| 🔄 Application Tracking | Real-time status updates (Applied → Shortlisted → Interview → Hired/Rejected) |

### 🧑‍💼 Recruiter Portal
| Feature | Description |
|---|---|
| 🛠 Job Management | Create, update, and delete job postings |
| 📋 Applicant Dashboard | View all applicants for a job in one place |
| 🏆 Applicant Ranking | Candidates auto-ranked by AI-generated ATS score |
| 📈 ATS Report Viewer | Deep-dive into each candidate's skill match and analysis |
| 🔁 Hiring Pipeline | Visual pipeline to move candidates through hiring stages |

### 🤖 AI Engine (Google Gemini)
| Capability | Description |
|---|---|
| 🎯 ATS Score | Quantifies resume-to-job-description match |
| ✅ Matched Skills | Highlights skills from the JD found in the resume |
| ⚠️ Missing Skills | Flags key skills absent from the resume |
| 📝 Resume Summary | Auto-generates a concise professional summary |
| 🔍 Candidate Analysis | AI-driven strengths/weaknesses breakdown |
| 💡 Resume Review | Actionable suggestions to improve the resume |
| 🎤 Interview Questions | Personalized questions generated per candidate & role |

---

## 🛠 Tech Stack

**Frontend**
- ⚛️ React
- 🎨 Tailwind CSS

**Backend**
- 🟢 Node.js
- 🚂 Express.js

**Database & Storage**
- 🍃 MongoDB
- ☁️ Cloudinary (resume/file storage)

**AI**
- ✨ Google Gemini AI

**Auth**
- 🔑 JWT (JSON Web Tokens)

---

## 🏗 System Architecture

```
                       ┌──────────────────────┐
                       │   React Frontend      │
                       │  (Candidate/Recruiter)│
                       └──────────┬───────────┘
                                  │ REST API (Axios)
                                  ▼
                       ┌──────────────────────┐
                       │  Express.js Backend   │
                       │  (Auth · Jobs · Apps) │
                       └──────────┬───────────┘
                 ┌────────────────┼──────────────────┐
                 ▼                ▼                  ▼
        ┌────────────────┐ ┌──────────────┐  ┌───────────────┐
        │    MongoDB      │ │  Cloudinary  │  │  Gemini AI API │
        │ (Users, Jobs,   │ │  (Resumes/   │  │ (ATS Scoring,  │
        │ Applications)   │ │   Files)     │  │  Analysis, Qs) │
        └────────────────┘ └──────────────┘  └───────────────┘
```

---

## 🔄 How the AI Pipeline Works

1. **Candidate uploads a resume** → file is stored securely in Cloudinary, and a snapshot reference is saved with the application.
2. **Candidate applies to a job** → backend fetches the job description and resume content.
3. **Gemini AI is invoked** with a structured prompt containing the JD + resume text.
4. **AI returns structured output**: ATS score, matched skills, missing skills, resume summary, and improvement suggestions.
5. **Report is stored & displayed** to both candidate (self-view) and recruiter (comparative ranking view).
6. **Recruiter requests interview questions** → Gemini generates role- and candidate-specific questions on demand.

---

## 📁 Project Structure

```
HireFlow-AI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Candidate & Recruiter pages
│   │   ├── context/        # Auth/global state
│   │   └── services/       # API calls (Axios)
│   └── package.json
│
├── server/                  # Express backend
│   ├── controllers/         # Route logic (auth, jobs, applications, AI)
│   ├── models/               # MongoDB schemas
│   ├── routes/                # API route definitions
│   ├── middleware/           # Auth guards, error handling
│   ├── utils/                  # Gemini AI + Cloudinary helpers
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- A Cloudinary account
- A Google Gemini API key

### Clone the Repository
```bash
git clone https://github.com/Adarsh2059/HireFlow-AI.git
cd HireFlow-AI
```

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The app should now be running with the client on its dev port and the API served by the Express backend.

---

## ⚙ Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new candidate/recruiter |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT |
| `POST` | `/api/jobs` | Recruiter creates a new job posting |
| `GET` | `/api/jobs` | Fetch all available jobs |
| `PUT` | `/api/jobs/:id` | Update a job posting |
| `DELETE` | `/api/jobs/:id` | Delete a job posting |
| `POST` | `/api/applications` | Candidate applies to a job |
| `DELETE` | `/api/applications/:id` | Withdraw an application |
| `GET` | `/api/applications/:id/ats-report` | Fetch AI-generated ATS report |
| `GET` | `/api/applications/job/:jobId` | Recruiter views ranked applicants for a job |
| `POST` | `/api/ai/interview-questions/:applicationId` | Generate personalized interview questions |

---

## 🗺 Roadmap

- [ ] Email notifications on application status change
- [ ] Bulk resume upload for recruiters
- [ ] Resume builder integrated with ATS scoring
- [ ] Multi-language resume support
- [ ] Analytics dashboard for recruiters

---

## 👨‍💻 Author

**Adarsh Yadav**

[![GitHub](https://img.shields.io/badge/GitHub-Adarsh2059-181717?style=for-the-badge&logo=github)](https://github.com/Adarsh2059)

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and build upon it.

---

<div align="center">

⭐ **If you found this project interesting, consider giving it a star on GitHub!** ⭐

</div>
