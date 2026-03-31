# Smart Expense Tracker

A full-stack, secure web application designed to help you track, categorize, and summarize your personal expenses with ease. This version includes integrated Firebase Authentication for secure user management.

## Features

-   **Secure Authentication**: User registration and login powered by **Firebase Authentication**.
-   **Expense Management**: Add, edit, and delete expenses with amount, category, and personal notes.
-   **Data Filtering**: Advanced filtering by category and date range (Start/End dates) to find exactly what you're looking for.
-   **Visual Summary**: A dashboard showing summarized totals grouped by category to help you understand your spending habits.
-   **Protected Routes**: Sensitive data is protected; only authenticated users can access the main dashboard.

## Tech Stack

-   **Frontend**: React, Material-UI (MUI), Axios, Firebase SDK
-   **Backend**: Node.js, Express.js, Firebase Admin SDK
-   **Database**: PostgreSQL
-   **Authentication**: Firebase Auth (with JWT verification on the backend)

---

## Project Structure

```text
├── frontend/             # React application
│   ├── src/config/       # Firebase configuration
│   ├── src/components/   # UI Components (Login, ExpenseForm, etc.)
│   └── src/api.js        # Standardized API client with Auth headers
└── backend/              # Node.js API server
    ├── src/config/       # Firebase Admin setup
    ├── src/controllers/  # Business logic
    ├── src/db/           # Database connection
    └── src/routes/       # API Route definitions
```

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+)
-   [PostgreSQL](https://www.postgresql.org/)
-   A [Firebase Project](https://console.firebase.google.com/)

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables in a `.env` file:
    ```env
    DB_USER=...
    DB_HOST=...
    DB_DATABASE=...
    DB_PASSWORD=...
    DB_PORT=...
    SERVER_PORT=...
    ```
4.  Add your Firebase `serviceAccountKey.json` to `backend/src/config/`.
5.  Start the server:
    ```bash
    node src/server.js
    ```

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your Firebase credentials in `frontend/src/config/firebase.js`.
4.  Start the development server:
    ```bash
    npm start
    ```

---

## Database Schema

Run the following SQL to set up your tables:

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    category VARCHAR(255) NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```