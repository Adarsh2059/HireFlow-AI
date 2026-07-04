# 🚀 HireFlow-AI

An AI-powered Resume Screening & Interview Platform built using the MERN Stack. HireFlow-AI streamlines the recruitment process by enabling recruiters to post jobs, candidates to apply with resumes, and preparing resumes for AI-powered analysis such as ATS scoring, skill extraction, and resume-job matching.

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Role-Based Authorization (Candidate & Recruiter)

### Job Management
- Create Job
- Update Job
- Delete Job
- View Jobs
- Search Jobs
- Filter Jobs
- Pagination
- Sorting
- Dashboard Statistics

### Application Management
- Apply for Jobs
- Prevent Duplicate Applications
- View My Applications
- Recruiter View Applicants
- Update Application Status
- Withdraw Application
- Status Transition Validation

### Resume Management
- Upload Resume (PDF)
- Resume Parsing using pdf-parse
- Cloudinary Integration
- Resume Storage
- Resume Replacement
- Resume Deletion
- Resume Metadata Storage
- Resume Text Extraction for AI

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JWT
- bcrypt

## File Upload

- Multer
- Cloudinary
- pdf-parse

## Database

- MongoDB Atlas

---

# 📂 Project Structure

```
server
│
├── config
│   ├── db.js
│   └── cloudinary.js
│
├── constants
│   └── applicationStatus.js
│
├── controllers
│   ├── authController.js
│   ├── jobController.js
│   ├── applicationController.js
│   └── resumeController.js
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
│   └── resumeRoutes.js
│
├── utils
│   ├── ApiError.js
│   └── parseResume.js
│
├── app.js
├── server.js
└── package.json
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Adarsh2059/HireFlow-AI.git
```

Move into the project

```bash
cd HireFlow-AI/server
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

# ▶️ Run the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/profile | User Profile |

---

## Jobs

| Method | Endpoint |
|---------|----------|
| POST | /api/jobs |
| GET | /api/jobs |
| GET | /api/jobs/:id |
| PATCH | /api/jobs/:id |
| DELETE | /api/jobs/:id |

---

## Applications

| Method | Endpoint |
|---------|----------|
| POST | /api/applications/:jobId |
| GET | /api/applications/my |
| GET | /api/applications/job/:jobId |
| PATCH | /api/applications/:applicationId |
| DELETE | /api/applications/:applicationId |

---

## Resume

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/resume/upload | Upload Resume |
| GET | /api/resume | Get Resume |
| DELETE | /api/resume | Delete Resume |

---

# 📄 Resume Upload Workflow

```
Candidate

↓

JWT Authentication

↓

Role Authorization

↓

Multer

↓

PDF Validation

↓

PDF Parsing

↓

Cloudinary Upload

↓

MongoDB Update

↓

Success Response
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Role-Based Access Control
- Protected Routes
- File Type Validation
- File Size Validation
- Global Error Handling

---

# 🚀 Upcoming Features

- AI Resume Analysis
- ATS Score Calculation
- Resume Summarization
- Skill Extraction
- Job-Resume Matching
- AI Interview Question Generator
- Recruiter Analytics Dashboard
- Email Notifications

---

# 📷 Screenshots

_Add screenshots after frontend implementation._

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Adarsh Yadav**

- GitHub: https://github.com/Adarsh2059
- LinkedIn: *(Add your LinkedIn URL)*

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.