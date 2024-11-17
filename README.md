# Split Expenses Backend

A backend for an expense-sharing application built with Node.js, Express, Sequelize, and MySQL2. This server powers an application that allows users to easily track shared expenses among group members, calculate each person's share, and view balances to settle debts at the end of a trip or event.

## Table of Contents

- Getting Started
- Features
- Project Structure
- API Endpoints
- Technologies Used
- License

## Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MySQL** (set up a local or remote MySQL server)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shahin-behzadrad/split-expenses-backend.git
   cd split-expenses-backend
   ```

2. **Navigate to the project directory:**

   ```bash
   cd split-expenses-backend
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Configure environment variables:**

   Create a .env file in the root directory and define the following variables:

   ```bash
   DATABASE_URL=your_supabase_database_url
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port
   ```

5. **Run database migrations:**

   Create a .env file in the root directory and define the following variables:

   ```bash
   DATABASE_URL=your_supabase_database_url
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port
   ```

6. **Start the development server:**

   Create a .env file in the root directory and define the following variables:

   ```bash
   DATABASE_URL=your_supabase_database_url
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port
   ```

## API Endpoints

1.  **Authentication**

- POST /api/auth/signup: Register a new user.
- POST /api/auth/login: Log in an existing user.

2.  **Groups**

- POST /api/groups: Create a new expense group.
- GET /api/groups: Get all groups for the logged-in user.
- GET /api/groups/:groupId: Get a group by it's id.
- PATCH /api/groups/:groupId: Get all groups for the logged-in user.
- DELETE /api/groups/:groupId: Get all groups for the logged-in user.

3.  **Expenses**

- POST /api/groups/:groupId/expenses: Add a new expense to a group.
- GET /api/groups/:groupId/expenses: Retrieve all expenses for a specific group.
- GET /api/groups/:groupId/expenses/expenseId: Get a group by it's id for a specific group.
- PATCH /api/groups/:groupId/expenses/expenseId: Retrieve all expenses for a specific group.
- DELETE /api/groups/:groupId/expenses/expenseId: Retrieve all expenses for a specific group.

## Contributing

Contributions are welcome! To contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure they are properly tested.
- Commit your changes and push them to your fork.
- Submit a pull request with a clear description of your changes.

- ## Contact

  For questions or support, feel free to reach out:

  - Shahin Behzadrad: [LinkedIn](https://www.linkedin.com/in/shahin-behzadrad) - [Email](shahinbzr2267@gmail.com)

## Project Evolution

Initially, this backend was designed as a decoupled Node.js and Express.js application. However, after completing the project, we decided to integrate the backend functionality directly into the **Next.js frontend** using its **API Routes**. This approach simplified the deployment process and improved maintainability by consolidating the codebase into a single project.

The Next.js implementation can be found in my peer’s repository:  
[Split Expenses with Next.js](https://github.com/amirsorayaei/split-expenses)

This repository remains as an example of the standalone backend implementation.
