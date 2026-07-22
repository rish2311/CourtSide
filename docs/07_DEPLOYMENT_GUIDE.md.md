# 07_DEPLOYMENT_GUIDE.md

# Deployment Guide

CourtSide uses a modern cloud deployment architecture.

---

# Frontend

Platform

Vercel

Environment

```
VITE_API_URL

VITE_SOCKET_URL

VITE_GOOGLE_MAPS_KEY
```

Deployment

```
main

↓

GitHub Actions

↓

Vercel

↓

Production
```

---

# Backend

Platform

Render

Environment

```
PORT

DATABASE_URL

JWT_SECRET

REDIS_URL

RAZORPAY_KEY

RAZORPAY_SECRET

CLOUDINARY_API_KEY
```

---

# Database

MongoDB Atlas

Production Cluster

Indexes

Automatic Backups

---

# Redis

Redis Cloud

Used for

- Cache
- Booking Locks
- Rate Limiting

---

# Cloudinary

Used for

Images

Avatars

Venue Photos

---

# CI/CD

GitHub Actions

Pipeline

```
Install

↓

Lint

↓

Test

↓

Build

↓

Deploy
```

---

# Health Checks

Backend

```
GET /health
```

Returns

```
{
    "status":"ok"
}
```

---

# Monitoring

Future Integrations

Sentry

Better Stack

Grafana

Prometheus

---

# Rollback Strategy

Every deployment creates

Git Tag

GitHub Release

Deployment Version

Rollback to previous release if deployment fails.
