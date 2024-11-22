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

#### Sign Up

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

```text
User registered successfully.
```

#### Sign In

**POST** `/api/auth/sign-in`

- **Description:** Authenticate a customer then response with the dashboard data containing an api key based on their role.
- **Request Body:**

```json
{
    "email": "jdoe@mail.com",
    "password": "john2234"
}
```

- **Response:**
  - For User Dashboard

```json
{
    "status": "success",
    "message": "user authenticated successfully",
    "timestamp": "2024-11-18T15:42:30.123",
    "data": {
        "user": {
          "id": 2,
          "name": "John Doe",
          "email": "jdoe@mail.com",
          "regisDate": "2024-11-10",
          "isActive": false,
          "role": "ROLE_USER"
        },
        "apiKey": {
          "header": "API-HEADER",
          "token": "API-TOKEN"
        },
        "transactions": [
          {
            "id": 2,
            "amount": 10.0,
            "createdDate": "2024-11-16T12:30:4.212",
            "fromAccountId": 1,
            "toAccountId": null,
            "type": "WITHDRAWAL"
          }
        ],
        "accounts": [
          {
            "id": 1,
            "balance": 90.0,
            "createdDate": "2024-11-10",
            "customerId": 2,
            "type": "SAVING"
          }
        ]
    }
}
```

  - For Admin Dashboard

```json
{
    "status": "success",
    "message": "user authenticated successfully",
    "timestamp": "2024-11-18T15:42:30.123",
    "data": {
      "admin": {
        "id": 2,
        "name": "John Doe",
        "email": "jdoe@mail.com",
        "regisDate": "2024-11-10",
        "isActive": true,
        "role": "ROLE_ADMIN"
      },
      "apiKey": {
        "header": "API-HEADER",
        "token": "API-TOKEN"
      },
      "transactions": [
        {
            "id": 15,
            "amount": 300.0,
            "createdDate": "2024-11-16T18:45:30.567",
            "fromAccountId": 2,
            "toAccountId": 1,
            "type": "TRANSFER"
        },
        {
            "id": 14,
            "amount": 20.0,
            "createdDate": "2024-11-16T17:30:15.432",
            "fromAccountId": 1,
            "toAccountId": null,
            "type": "WITHDRAWAL"
        },
        /*...*/
        {
            "id": 6,
            "amount": 150.0,
            "createdDate": "2024-11-16T12:40:00.123",
            "fromAccountId": null,
            "toAccountId": 1,
            "type": "DEPOSIT"
        }
      ]
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

```text
User authorization is working properly!
```

#### Test Admin Authentication API

**GET** `/api/test/admin`

- **Description:** Check if the authentication system is working by testing
  access to a admin secured endpoint using admin's API Key.
- **Headers:**

  - `<admin_header>: <admin_token>`

- **Response:**

```text
Admin authorization is working properly!
```

---

## User Basic Functions

### Overview

Users are provided with functions to open accounts, making transactions using their accounts, and manage their transactions.

### Endpoints

#### Open New Account

**POST** `/api/users/{id}/accounts`

- **Description:** Open an account with predefined types (`TRANSACTION, SAVING, EMERGENCY`) for user with specified id.
- **Headers:**

  - `<user_header>: <user_token>`

- **Request Body:**

```json
{
  "email": "jdoe@mail.com",
  "password": "john2234",
  "pin": "122333",
  "type": "saving"
}
```

- **Response:**

```json
{
    "status": "created",
    "message": "your account has been created",
    "timestamp": "2024-11-10T9:13:30.23",
    "data": {
      "id": 1,
      "balance": 0.0,
      "createdDate": "2024-11-10",
      "customerId": 2,
      "type": "SAVING"
    }
}
```

#### Making Transaction

**POST** `/api/transactions`

- **Description:** Using account(s) to make transaction with predefined types (`DEPOSIT, WITHDRAWAL, TRANSFER`)

- **Headers:**

  - `<user_header>: <user_token>`

- **Request Body:**

```json
{
  "amount": 100.0,
  "fromAccountId": null,
  "toAccountId": 1,
  "type": "deposit",
  "pin": "122333"
}
```

- **Response:** 

```json
{
    "status": "success",
    "message": "your transaction is made",
    "timestamp": "2024-11-10T9:13:23.220",
    "data": {
      "id": 1,
      "amount": 100.0,
      "createdDate": "2024-11-10T13:23:16.220",
      "fromAccountId": null,
      "toAccountId": 1,
      "type": "DEPOSIT"
    }
}
```

#### Manage Transactions

**GET** `/api/users/{id}/transactions`

- **Description:** Get all transaction made by user in descendant order of created date.

- **Query Parameters:**

  - `page` (optional, default = 0, `int`): The index of the page of transactions.
  - `size` (optional, default = 10, `int`): The maximum size of each page.

- **Example Request:**

```http
GET /api/users/2/transactions?page=0&size=3
```

- **Response:**

```json
{
  "status": "success",
  "message": "page 0 of size 3 is retrieved",
  "timestamp": "2024-11-18T14:5:13.130",
  "data": [
    {
      "id": 5,
      "amount": 111.0,
      "createdDate": "2024-11-10T14:27:35.270",
      "fromAccountId": null,
      "toAccountId": 1,
      "type": "DEPOSIT"
    }, 
    {
      "id": 4,
      "amount": 11.0,
      "createdDate": "2024-11-10T14:13:6.240",
      "fromAccountId": 1,
      "toAccountId": null,
      "type": "WITHDRAWAL"
    }, 
    {
      "id": 3,
      "amount": 110.0,
      "createdDate": "2024-11-10T13:30:6.20",
      "fromAccountId": null,
      "toAccountId": 1,
      "type": "DEPOSIT"
    }
  ]
}
```

---
## Admin Basic Functions

### Overview

System admins are provided with endpoints to manage users' transactions with suitable censorship.

### Endpoints

#### Get All Transactions in Form of Page

**GET** `/api/transactions`

- **Description:** Return a page of transactions made by all users using the system.
- **Headers:**

  - `<admin_header>: <admin_token>`

- **Query Parameters:**

  - `page` (optional, default = 0, `int`): The index of the page of transactions.
  - `size` (optional, default = 10, `int`): The maximum size of each page.

- **Example Request:**

```http
GET `/api/transactions?page=1&size=10`
```

- **Response:**

```json
{
  "status": "found",
  "message": "page 1 of size 10 is retrieved",
  "timestamp": "2024-11-18T16:21:20.13",
  "data": [
    {
        "id": 5,
        "amount": 75.0,
        "createdDate": "2024-11-16T12:35:20.654",
        "fromAccountId": 1,
        "toAccountId": 3,
        "type": "TRANSFER"
    },
    {
        "id": 4,
        "amount": 20.0,
        "createdDate": "2024-11-16T12:30:15.123",
        "fromAccountId": 1,
        "toAccountId": null,
        "type": "WITHDRAWAL"
    },
    {
        "id": 3,
        "amount": 500.0,
        "createdDate": "2024-11-16T12:25:30.321",
        "fromAccountId": null,
        "toAccountId": 1,
        "type": "DEPOSIT"
    },
    {
        "id": 2,
        "amount": 10.0,
        "createdDate": "2024-11-16T12:20:45.456",
        "fromAccountId": 1,
        "toAccountId": null,
        "type": "WITHDRAWAL"
    },
    {
        "id": 1,
        "amount": 100.0,
        "createdDate": "2024-11-16T12:15:10.789",
        "fromAccountId": 1,
        "toAccountId": 2,
        "type": "TRANSFER"
    }
  ]
}
```

### Get Transaction Details 

**GET** `/api/transactions/{id}`

- **Description:** Return most of information related to the transaction with proper censorship.
- **Headers:**

  - `<admin_header>: <admin_token>`

- **Response:**

```json
{
  "status": "found",
  "message": "details for specified transaction is found",
  "timestamp": "2024-11-16T12:17:14.612",
  "data": {
    "transactionMaker": {
      "id": 2,
      "name": "John Doe",
      "email": "jdoe@mail.com",
      "regisDate": "2024-11-10",
      "isActive": false,
      "role": "ROLE_USER"
    },
    "fromAccount": null,
    "toAccount": {
      "id": 1,
      "createdDate": "2024-11-10",
      "customerId": 2,
      "type": "SAVING"
    },
  }
}
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
