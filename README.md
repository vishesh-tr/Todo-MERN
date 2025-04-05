## 📝 Simple Todo App

A minimal full-stack Todo application with separate **Backend** and **Frontend** repositories.

### 🛠 Tech Stack

**Frontend**  
- Framework: React 
- Styling: CSS / Tailwind / Bootstrap
- API Communication: Axios / Fetch

**Backend**  
- Framework: Node.js with Express 
- Database: MongoDB 
- REST API: CRUD operations

---

## 📂 Repositories

- 🔗 **Frontend**: git@github.com:vishesh-tr/Todo-MERN.git
- 🔗 **Backend**: git@github.com:vishesh-tr/Todo-MERN.git

---

## 🚀 Getting Started

### 1. Clone the Repositories

```bash
# Clone Frontend
git clone https://github.com/vishesh-tr/Todo-MERN.git

# Clone Backend
git clone https://github.com/vishesh-tr/Todo-MERN.git
```

### 2. Setup Backend

```bash
cd todo-backend
npm install
# Create .env file and add DB connection details
npm run dev
```

### 3. Setup Frontend

```bash
cd todo-frontend
npm install
# Create .env file and add backend API URL
npm run dev 
```

---

## 🔧 Features

- Add a new Todo
- Mark Todo as completed
- Delete a Todo
- Filter by completed/incomplete
- Responsive UI

---

## 📦 API Endpoints (Backend)

```
GET    /api/todos         -> http://localhost:4001/todo/fetch 
POST   /api/todos         -> http://localhost:4001/todo/create  
PUT    /api/todos/:id     -> http://localhost:4001/todo/update/${id} 
DELETE /api/todos/:id     -> http://localhost:4001/todo/delete/${id}
```

---

## 📸 Screenshots

_Add screenshots of the UI here if available._

---

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---
