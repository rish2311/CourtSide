# API Specification

Base URL

```
/api/v1
```

---

# Authentication

POST

```
/auth/register
```

POST

```
/auth/login
```

POST

```
/auth/logout
```

GET

```
/auth/me
```

PATCH

```
/auth/profile
```

---

# Users

GET

```
/users/:id
```

PATCH

```
/users/:id
```

DELETE

```
/users/:id
```

---

# Venues

GET

```
/venues
```

GET

```
/venues/:id
```

POST

```
/venues
```

PATCH

```
/venues/:id
```

DELETE

```
/venues/:id
```

---

# Courts

GET

```
/courts
```

POST

```
/courts
```

PATCH

```
/courts/:id
```

DELETE

```
/courts/:id
```

---

# Bookings

GET

```
/bookings
```

POST

```
/bookings
```

PATCH

```
/bookings/:id
```

DELETE

```
/bookings/:id
```

---

# Payments

POST

```
/payments/create-order
```

POST

```
/payments/verify
```

GET

```
/payments/history
```

---

# Chat

GET

```
/chat/rooms
```

POST

```
/chat/messages
```

Socket Events

- connect
- disconnect
- join-room
- leave-room
- typing
- stop-typing
- send-message
- receive-message

---

# Notifications

GET

```
/notifications
```

PATCH

```
/notifications/read
```

---

# Admin

GET

```
/admin/dashboard
```

GET

```
/admin/users
```

GET

```
/admin/venues
```

GET

```
/admin/reports
```

---

# Response Format

Every API should return a standardized response.

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {},
  "errors": null
}
```

Every error should follow the same structure.

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    }
  ]
}
```

This standardization keeps the frontend predictable and simplifies error handling across the application.
