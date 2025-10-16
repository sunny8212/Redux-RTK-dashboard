# 🧑‍💻 User Management Dashboard

Live URL: https://redux-rtk-dashboard.vercel.app/
A fully responsive, dynamic, and theme-aware **User Management Dashboard** built using **React.js**, **Redux Toolkit**, **RTK Query**, and **Material UI (MUI)**.  
This project demonstrates CRUD operations (Create, Read, Update, Delete) with real-time API integration, interactive UI, and persistent light/dark mode — all designed with clean code and scalability in mind.

---

## 🚀 Features

### 🧩 Core Functionalities
- ✅ **Fetch & display users** from a public API using RTK Query
- ✅ **Add new user** through a responsive dialog form
- ✅ **Edit user** with instant updates and live UI sync
- ✅ **Delete user** with confirmation popup
- ✅ **Search bar** for instant filtering by name or username
- ✅ **Real-time updates** with optimistic UI and cache invalidation
- ✅ **Error handling & loading states** for a professional experience

---

### 🎨 UI / UX Highlights
- 🌗 **Global theme toggle (Dark/Light)** — works across the entire app
- 🧱 Built with **Material UI 6** for modern responsive design
- ✨ **Hover animations & transitions** for smooth interactions
- 📱 **Fully responsive layout** — optimized for laptop, tablet, and mobile
- 💾 **LocalStorage persistence** for theme preference
- 🧠 **Custom MUI theme** with consistent typography and colors

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js (Vite + pnpm) |
| **State Management** | Redux Toolkit + RTK Query |
| **UI Framework** | Material UI (MUI v6) |
| **Animations** | Framer Motion |
| **Package Manager** | pnpm |
| **API Source** | JSONPlaceholder (mock REST API) |

---

## 📂 Project Structure
```bash
src/
├── app/
│     ├── store.ts
│
├── components/
│    ├── TopBar.tsx
│
├── features/
│    └── users/
│       ├── UserTable.tsx
│       ├── AddUserDialog.tsx
│       ├── EditUserDialog.tsx
│       ├── usersApi.ts
│
├── features/ui/
│       └── uiSlice.ts
│
├── App.tsx
└── main.tsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone [https://github.com/sunny8212/user-dashboard.git](https://github.com/sunny8212/Redux-RTK-dashboard.git)
cd user-dashboard
### 2️⃣ Install dependencies

pnpm install

### 3️⃣ Run the development server

pnpm dev






