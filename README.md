# Loan Management System – Fullstack Assessment

This project was built as part of a full-stack assessment, with a focus on clean code architecture, role-based access control, and polished UI/UX.

---

## 🔧 Tech Stack

### Backend:
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- File-based data (staff.json, loans.json)
- Morgan (logging), CORS, custom middlewares

### Frontend:
- Vue.js (Composition API)
- Vue Router
- Responsive UI with clean UX
- Token-based login + route guarding

---

## 📁 Project Structure

```
.
├── controllers/       # Business logic handlers
├── data/              # JSON data files (e.g. staff.json, loans.json)
├── frontend/          # Vue frontend app
├── middleware/        # Custom Express middleware
├── node_modules/
├── routes/            # API route handlers
├── .env               # Environment variables
├── app.js             # App entry point
├── package.json
├── package-lock.json
```

---

## 🔐 Backend Features

- `POST /api/login`: Staff login with role-based JWT token
- `POST /api/logout`: Clear session (client side)
- `GET /api/loans`: Fetch all loans (with role-based visibility)
- `GET /api/loans?status=pending|active`: Filter loans by status
- `GET /api/loans/:userEmail/get`: Fetch loans by user email
- `GET /api/loans/expired`: Get loans past maturity date
- `DELETE /api/loan/:loanId/delete`: Only superAdmin can delete

### Role Visibility:
- Staff: Can’t see `applicant.totalLoan`
- Admin / SuperAdmin: Full visibility
- Only SuperAdmin: Can delete loans

---

## 🖥️ Frontend Features

- Responsive Login Form
- Auth state saved in `localStorage`
- Conditional redirection to `/dashboard`
- Dashboard route protected via router guard
- Error messages and loading indicators

---

## 🚀 How to Run Locally

### 🔙 Backend

1. Clone the repo:
   ```bash
   git clone https://github.com/declared-as-ala/loans-app
   cd loans-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add a .env file:
   ```ini
   JWT_SECRET=your_secret_key
   PORT=3000
   ```

4. Run the backend app:
   ```bash
   npm run dev
   ```

### 💻 Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run serve
   ```

4. Access the app at:
   ```arduino
   http://localhost:8080
   ```

ℹ️ Ensure your backend is running on http://localhost:3000 for the frontend to connect properly.

---

## ✅ Demo Credentials

You can use any staff member from `data/staff.json`. Example:

```json
{
  "email": "edwinjohn@example.com",
  "password": "12345Pass"
}
```

---

## 🧠 Author

**Ala Missaoui**  
📧 alamissaoui.dev@gmail.com  

🔗 LinkedIn https://www.linkedin.com/in/ala-missaoui-016a5b25a/
