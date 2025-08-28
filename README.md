# Expense Tracker

A modern, full-stack web application for tracking your expenses, incomes, and categories. Built with React (frontend) and Node.js/Express (backend), and hosted on Render.

---

## 🌐 Live Demo

Access the website here: [https://expense-tracker-fmms.onrender.com](https://expense-tracker-fmms.onrender.com)

---

## Features

- **User Authentication**: Secure login and registration.
- **Dashboard**: Visual summary of your finances.
- **Add/Edit/Delete Expenses & Incomes**: Manage your transactions easily.
- **Category Management**: Create and organize custom categories.
- **Responsive Design**: Works on desktop and mobile.
- **Data Security**: All sensitive data is securely stored and transmitted.

---

## Technologies Used

### Frontend

- React
- CSS
- Context API

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- CORS

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas (or local MongoDB)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/abubackar-siddiq-s/Expense_Tracker.git
cd Expense_Tracker
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `backend/` with:
  ```env
  PORT=5000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  FRONTEND_URL=http://localhost:3000
  ```
- Start the backend:
  ```bash
  npm start
  ```

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Create a `.env` file in `frontend/` with:
  ```env
  REACT_APP_API_URL=http://localhost:5000
  ```
- Start the frontend:
  ```bash
  npm start
  ```

---

## Deployment

Both frontend and backend are hosted separately on Render.

- **Frontend**: [https://expense-tracker-fmms.onrender.com](https://expense-tracker-fmms.onrender.com)
- **Backend**: Hosted on Render (set API URL in frontend `.env` to backend Render URL)

---

## Environment Variables

### Backend

- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `FRONTEND_URL`: Allowed CORS origin

### Frontend

- `REACT_APP_API_URL`: Backend API base URL

---

## Folder Structure

```
Expense_Tracker/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## Screenshots

> Add screenshots here to showcase the dashboard, forms, and mobile view.

---

## License

This project is licensed under the MIT License.

---

## Author

- [abubackar-siddiq-s](https://github.com/abubackar-siddiq-s)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions or feedback, please open an issue or contact via GitHub.
