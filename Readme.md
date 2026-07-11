# 🚀 HireFlow-AI

> **AI-Powered Recruitment & Applicant Tracking System (ATS)** built
> using the MERN Stack and Google Gemini AI.

## 📖 Overview

HireFlow-AI is a full-stack recruitment platform that enables candidates
to upload resumes, apply for jobs, and receive AI-powered ATS reports
while recruiters can manage jobs, evaluate applicants, and streamline
hiring.

## ✨ Core Features

### Candidate

-   Authentication
-   Resume Upload
-   Resume Snapshot per Application
-   Apply & Withdraw Applications
-   View ATS Reports
-   Track Application Status

### Recruiter

-   Create / Update / Delete Jobs
-   View Applicants
-   Applicant Ranking
-   ATS Report Viewer
-   Hiring Pipeline

### AI

-   ATS Score
-   Matched & Missing Skills
-   Resume Summary
-   Candidate Analysis
-   Resume Review
-   Personalized Interview Questions

## 🛠 Tech Stack

-   React
-   Tailwind CSS
-   Node.js
-   Express.js
-   MongoDB
-   Cloudinary
-   Google Gemini AI

## 🏗 Architecture

``` text
React Frontend
      │
 REST API
      │
Express Backend
 ├── MongoDB
 ├── Cloudinary
 └── Gemini AI
```

## 🚀 Installation

### Clone

``` bash
git clone https://github.com/Adarsh2059/HireFlow-AI.git
```

### Backend

``` bash
cd server
npm install
npm run dev
```

### Frontend

``` bash
cd client
npm install
npm run dev
```

## ⚙ Environment Variables

``` env
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
```

## 👨‍💻 Author

Adarsh Yadav

GitHub: https://github.com/Adarsh2059
