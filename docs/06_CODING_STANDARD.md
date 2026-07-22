# 06_CODING_STANDARDS.md

# Coding Standards

This document defines the engineering standards for the CourtSide project.

Every contribution to the repository must follow these conventions.

---

# General Principles

- Write readable code.
- Prefer clarity over cleverness.
- Keep functions small.
- Avoid duplicated logic.
- Use meaningful names.
- Follow Single Responsibility Principle.
- Prefer composition over inheritance.
- Every module should have one responsibility.

---

# Project Architecture

Feature-first architecture.

```
modules/

    auth/

    users/

    venues/

    courts/

    booking/

    payments/

    chat/

    notifications/

    reviews/

shared/

config/

infrastructure/
```

Avoid organizing by technical layers alone.

---

# Backend Standards

Request Flow

```
Route

↓

Controller

↓

Service

↓

Repository

↓

Database
```

Controllers

Responsible for

- Request validation
- Calling services
- Returning responses

Controllers must NOT

- Query database
- Hash passwords
- Generate tokens
- Perform business logic

---

Services

Responsible for

- Business logic
- Validation
- Transactions
- Domain rules

---

Repositories

Responsible for

- Database interaction only

---

# TypeScript

Never use

```
any
```

Prefer

```
unknown

interfaces

types

generics
```

Enable strict mode.

---

# Naming Convention

Variables

```
camelCase
```

Functions

```
camelCase
```

Classes

```
PascalCase
```

Interfaces

```
IUser
```

Enums

```
UserRole
```

Constants

```
UPPER_SNAKE_CASE
```

Files

```
user.service.ts

booking.controller.ts

venue.repository.ts
```

---

# React Standards

Prefer

Functional Components

Hooks

Composition

Memoization when necessary

Avoid

Large Components

Business Logic inside JSX

Deep Prop Drilling

---

# Folder Structure

Every feature should contain

```
api

components

hooks

schemas

types

utils
```

---

# Git Workflow

Never push directly to main.

```
feature/auth

feature/booking

fix/chat

refactor/payment
```

Merge only through Pull Requests.

---

# Commit Convention

```
feat:

fix:

refactor:

docs:

style:

test:

perf:

build:

ci:
```

Examples

```
feat(auth): implement refresh token

fix(chat): resolve socket disconnect

docs: update deployment guide
```

---

# Code Review Checklist

Before merging

- ESLint passes
- TypeScript passes
- Tests pass
- No duplicated code
- No console.log
- No commented code
- README updated
- Feature documented

---

# Pull Request Requirements

Every PR should include

- Description
- Screenshots
- API changes
- Testing notes
- Checklist

---

# Performance

Avoid

N+1 Queries

Repeated API calls

Large components

Unnecessary re-renders

Blocking operations

---

# Security

Never

Commit secrets

Expose JWT

Trust client input

Store passwords in plaintext
