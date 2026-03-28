# Smart Expense Tracker

A full-stack web application designed to help you track, categorize, and summarize your personal expenses easily.

## Features
- **Add Expenses**: Quickly log your spending with amount, category, and notes.
- **View & Manage**: See a list of all your records, with the ability to edit or delete any expense.
- **Data Filtering**: Filter your expenses by specific categories or date ranges (Start and End dates).
- **Summary Dashboard**: Instantly view summarized totals grouped by category to see where you spend the most.

## Tech Stack
- **Frontend**: React, Material-UI (MUI), Axios
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (`pg` library)

## Project Structure
The repository is split into two main sections:
- `/frontend` - Contains the React application.
- `/backend` - Contains the Node.js API server and database configuration.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [PostgreSQL](https://www.postgresql.org/) database set up and running

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with your PostgreSQL connection details:
   ```env
   DB_USER=...
   DB_HOST=...
   DB_DATABASE=...
   DB_PASSWORD=...
   DB_PORT=...
   SERVER_PORT=...
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *(The server will run on port 5000 by default.)*

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *(The application will be accessible at http://localhost:3000.)*

## Database Schema
To run this application, you will need an `expenses` table in your PostgreSQL database with the following structure:
```sql
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    category VARCHAR(255) NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
