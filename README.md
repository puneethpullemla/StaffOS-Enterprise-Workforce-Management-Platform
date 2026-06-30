# 🚀 StaffOS – Enterprise Workforce Management Platform

A production-ready Enterprise Workforce Management Platform built with **FastAPI**, **React (TypeScript)**, **PostgreSQL**, **Docker**, **Nginx**, and **AWS EC2**. StaffOS streamlines employee management, attendance tracking, leave requests, payroll processing, and department administration through a modern web interface.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)
![License](https://img.shields.io/badge/License-MIT-success)

---

## 🌐 Live Demo

**Application:** http://34.201.2.195/

---

# ✨ Features

### Authentication
- JWT Authentication
- Role-Based Access Control (Admin, HR, Manager, Employee)
- Secure Password Hashing

### Employee Management
- Add, Edit & Delete Employees
- Employee Profiles
- Department Assignment
- Employee Search

### Department Management
- Create Departments
- Update Departments
- Department Statistics

### Attendance
- Mark Attendance
- Attendance Dashboard
- Attendance Analytics

### Leave Management
- Leave Requests
- Leave Approval Workflow
- Leave Status Tracking

### Payroll
- Payroll Generation
- Salary Management
- Bonus & Deduction Support
- Payroll Dashboard

### Dashboard
- Employee Statistics
- Attendance Charts
- Payroll Overview
- Department Insights

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Axios
- Tailwind CSS
- Recharts

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT Authentication
- Passlib

## Database

- PostgreSQL

## DevOps

- Docker
- Docker Compose
- Nginx
- AWS EC2
- GitHub Actions (CI/CD)

---

# 🏗 Project Architecture

```
                   Internet
                        │
                        ▼
                 Nginx (Port 80)
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
 React Frontend                    FastAPI Backend
                                           │
                                           ▼
                                     PostgreSQL
```

---

# 📁 Project Structure

```
StaffOS
│
├── backend/
│   ├── app/
│   ├── migrations/
│   ├── tests/
│   ├── requirements.txt
│   └── alembic.ini
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker/
│   ├── Dockerfile
│   └── .dockerignore
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Deployment

The application is deployed on **AWS EC2** using Docker containers.

### Infrastructure

- Ubuntu Server
- Docker
- Docker Compose
- PostgreSQL
- Nginx Reverse Proxy
- FastAPI
- React
- GitHub Actions CI/CD

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/puneethpullemla/StaffOS-Enterprise-Workforce-Management-Platform.git

cd StaffOS-Enterprise-Workforce-Management-Platform
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows
venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
```

Run migrations

```bash
alembic upgrade head
```

Run server

```bash
uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🐳 Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up -d
```

Run migrations

```bash
docker exec -it staffos-backend alembic upgrade head
```

---

# 🔐 Environment Variables

Backend

```env
APP_NAME=StaffOS
APP_VERSION=1.0.0

DEBUG=False

DATABASE_URL=postgresql://postgres:postgres@postgres:5432/staffos

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

REDIS_URL=redis://localhost:6379
```

---

# 📊 API Documentation

Swagger UI

```
http://YOUR_PUBLIC_IP:8000/docs
```

---

# 🧪 Testing

Backend

```bash
pytest
```

Frontend

```bash
npm run build
```

---

# 🔄 CI/CD

GitHub Actions automatically

- Builds the application
- Runs backend tests
- Builds frontend
- Deploys to AWS EC2
- Restarts Docker containers
- Updates Nginx deployment

---

# 🎯 Future Improvements

- Redis Caching
- Email Notifications
- Docker Swarm / Kubernetes
- Multi-Tenant Architecture
- Audit Logs
- File Storage (AWS S3)
- PDF Payroll Export
- REST API Versioning

---

# 👨‍💻 Author

**Puneeth Pullemla**

LinkedIn: https://www.linkedin.com/in/puneeth-pullemla/

Portfolio: https://puneethpullemla-portfolio.netlify.app/

GitHub: https://github.com/puneethpullemla

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
