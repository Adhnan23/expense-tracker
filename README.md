# Expense Tracker API

A RESTful API built with Node.js, Express, and MongoDB for tracking personal expenses and income.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Category Management**: Create and manage categories for income and expenses.
- **Transaction Tracking**: Record and monitor financial transactions.
- **Data Validation**: Robust input validation using `express-validator`.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_super_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` (or the port defined in your `.env`).
