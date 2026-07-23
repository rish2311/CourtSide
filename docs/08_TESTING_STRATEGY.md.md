# 08_TESTING_STRATEGY.md

# Testing Strategy

Testing follows the testing pyramid.

```
E2E

Integration

Unit
```

---

# Unit Testing

Framework

Vitest

Test

Utilities

Services

Algorithms

Validation

Business Rules

---

# Integration Testing

Test

API Routes

Authentication

Booking

Payments

MongoDB

Redis

---

# End-to-End Testing

Framework

Playwright

Scenarios

Register

Login

Book Venue

Pay

Chat

Logout

---

# Performance Testing

Framework

k6

Test

100 Users

500 Users

1000 Users

Concurrent Booking

---

# Load Testing

Booking Engine

Goal

Zero Double Booking

---

# Security Testing

Verify

JWT

Rate Limiting

RBAC

Input Validation

Injection Prevention

---

# Manual Testing

Every sprint

Desktop

Tablet

Mobile

Chrome

Firefox

Safari

Edge

---

# Regression Testing

Every release

Authentication

Booking

Payments

Chat

Notifications

---

# Exit Criteria

No critical bugs

No failing tests

Coverage above 80%

Performance acceptable
