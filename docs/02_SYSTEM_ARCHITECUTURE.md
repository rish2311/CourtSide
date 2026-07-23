# System Architecture

## Architecture Style

Feature-Oriented Modular Monolith

```

```

Client (React)

↓

API Gateway

↓

Express Server

↓

Modules

├── Auth

├── Users

├── Venues

├── Booking

├── Payments

├── Chat

├── Notifications

├── Reviews

↓

MongoDB

↓

Redis

↓

Cloudinary

↓

Socket.io

```

---

# Frontend

React

TypeScript

Vite

TailwindCSS

Shadcn/UI

React Query

React Hook Form

Zod

Zustand

Axios

---

# Backend

Node.js

Express

TypeScript

MongoDB

Mongoose

Redis

JWT

Socket.IO

Cloudinary

---

# Infrastructure

Mongo Atlas

Redis

Docker

GitHub Actions

Render

Vercel

Cloudinary

---

# External Services

Google Maps

Razorpay

Resend

Cloudinary

Firebase Push Notifications

---

# Module Communication

Every feature follows

```

Routes

↓

Controller

↓

Service

↓

Repository

↓

Database

```

Business logic never exists inside controllers.

---

# Future Scalability

The modular monolith architecture allows later extraction into microservices if required.
```
