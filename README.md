# Expense Tracker

A full-stack web application to help users manage their personal finances by tracking income, expenses, and categories. Each user has a secure, personalized dashboard and can manage their own financial data.

## Features

- User registration and login (JWT authentication)
- Individual dashboards for each user
- Add, edit, and delete income and expense entries
- Manage custom categories (add, edit, delete) per user
- Persistent login (session saved across reloads)
- Responsive, modern UI (React)
- RESTful backend API (Node.js, Express)
- MongoDB for data storage

## Technologies Used

- **Frontend:** React, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Token)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install backend dependencies:**

   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```sh
   cd ../frontend
   npm install
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the `backend` folder:
     ```env
     MONGODB_URI=mongodb://localhost:27017/expense-tracker
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

5. **Start the backend server:**

   ```sh
   cd backend
   npm start
   ```

6. **Start the frontend app:**

   ```sh
   cd ../frontend
   npm start
   ```

7. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- Register a new account or log in.
- Add income and expense entries.
- Create, edit, and delete your own categories.
- View your financial summary and recent transactions on your dashboard.
- Log out securely; your session will persist until you log out.

## Folder Structure

```
Expense Tracker/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── ...
│   └── ...
└── README.md
```

## API Endpoints (Backend)

- `POST /api/users/register` — Register a new user
- `POST /api/users/login` — Log in and receive JWT
- `GET /api/incomes` — Get all incomes for logged-in user
- `POST /api/incomes` — Add new income
- `PATCH /api/incomes/:id` — Edit income
- `DELETE /api/incomes/:id` — Delete income
- `GET /api/expenses` — Get all expenses for logged-in user
- `POST /api/expenses` — Add new expense
- `PATCH /api/expenses/:id` — Edit expense
- `DELETE /api/expenses/:id` — Delete expense
- `GET /api/categories` — Get all categories for logged-in user
- `POST /api/categories` — Add new category
- `PATCH /api/categories/:name` — Edit category
- `DELETE /api/categories/:name` — Delete category

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [abubackar.siddiq.stn@gmail.com].
