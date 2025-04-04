
# Task Mnager Case Study

A simple web application that allows users to Add,Update,Delete and View individual tasks by simply loging in.


## Tech Stack

**Client:** React, Tailwind CSS

**Server:** Node, Express , PostgreSQL, Typescript,Prisma ORM,


## Features

 Authentication
Secure JWT-based Login & Signup system for user authentication.

 Task Management
Users can Create, Edit, Delete, and View tasks seamlessly.

 RESTful API
Built using Express.js, providing clean and scalable API endpoints.

 Dockerized Architecture
Entire project is containerized with Docker, including:

Frontend (React)

Backend (Express + Prisma)

PostgreSQL database

 PostgreSQL + Prisma ORM
Robust data management with Prisma ORM and PostgreSQL.

 Modular Codebase
Organized project structure for maintainability and scalability.

 Frontend with React
Clean and responsive UI built using React and TailwindCSS.

## Backend Apis

Auth

Post - api/auth/login 
Post - api/auth/register

Task 

Post- api/task
Get - api/task
Put - api/task/{id}
Delete - api/task/{id}

Swagger Api Docs - /api-docs

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Server side env

`PORT`

`JWT_SECRET`

`DATABASE_URL`

## Run Locally

Clone the project

```bash
  git clone (https://github.com/rahul-6-ramachandran/Task-manager.git)
```

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Docker Setup

Prerequisites

- Docker installed on your system.

- Docker Compose (included with Docker Desktop).

Create .env files (optional but recommended)

```bash
  DATABASE_URL=postgresql://admin_user:mysecretpassword@db:5432/mydatabase
```

Run Docker Compose

```bash
docker-compose up --build
```

This command will:

 - Build and start the frontend (React) on port 3000.

 - Build and start the backend (Express) on port 7070.

 - Start the PostgreSQL database on port 5432.

Access the App

Service	            URL

Frontend	      http://localhost:3000
Backend API	    http://localhost:7070
PostgreSQL	    Accessible internally via Docker network

Stop and Clean Up

```bash
docker-compose down
```






