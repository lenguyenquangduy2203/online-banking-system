# Online Banking System API Documentation

## Introduction

The APIs aim to provide an secure processing of transaction's information. These
APIs are designed to be used by developers working on the banking system.

## Base URL

The APIs base URL is: `http://localhost:8080`

---

## Authentication and Authorization

### Overview

The system employs two authentication mechanisms:

- Username-password authentication
- API Key authentication

The system utilize Http for fast response so there is no need for log out end
point. Instead, every API call need to be authorized using API Key after signing
in.

### Endpoints

#### Sign up

**POST** `/api/auth/sign-up`

- **Description:** Authorize a user.
- **Request Body:**

```json
{
    "name": "John Doe",
    "email": "jdoe@mail.com",
    "password": "john2234"
}
```

- **Response:**

```json
User registered successfully.
```

#### Sign in

**POST** `/api/auth/sign-in`

- **Description:** Authenticate a user or admin.
- **Request Body:**

```json
{
    "email": "jdoe@mail.com",
    "password": "john2234"
}
```

- **Response:**

```json
{
    "status": "success",
    "message": "user authenticated successfully",
    "timestamp": "2024-11-18T15:42:30.123",
    "data": {
        "header": "ROLE-BASED-HEADER",
        "token": "ROLE-BASED-TOKEN"
    }
}
```

### Tets Authentication and Authorization APIs

#### Test User Authentication API

**GET** `/api/test/user`

- **Description:** Check if the authentication system is working by testing
  access to a user secured endpoint using user's API Key.
- **Headers:**

  - `<user_header>: <user_token>`

- **Response:**

```json
User authorization is working properly!
```

#### Test Admin Authentication API

**GET** `/api/test/admin`

- **Description:** Check if the authentication system is working by testing
  access to a admin secured endpoint using admin's API Key.
- **Headers:**

  - `<admin_header>: <admin_token>`

- **Response:**

```json
Admin authorization is working properly!
```

---

## Appendix

### API Version

`v1.0.0`

### Technology Used

- Spring Boot (Backend)
- React.js (Frontend)
- MySQL (Database)

### Prerequisites

Before running the backend, ensure the following steps are completed:

1. Install Java Development Kit (JDK)
   - Version: Java 21 or higher
   - [Download JDK 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
2. Install MySQL
   - Version: MySQL 8.x
   - Set up your own database.
3. Environment Variables
   - Copy the file `resources/.env.example` and change its name into
     `resource/.env`.
   - Fill in all the missing variables needed for this backend.
4. Maven Installation
   - Ensure Apache Maven is installed for dependency management and building the
     project.
