# 👕 WTWR – What To Wear

**WTWR (What to Wear)** is a full stack weather-based outfit suggestion app built during the TripleTen Software Engineering Bootcamp. Users can view real-time weather data, browse a shared virtual closet, and save items to their personal profile. Authenticated users can also add, like, or delete clothing items and update their profile details.

---

## 🚀 Live Demo

**Frontend:** [https://dancarlton.github.io/se_project_react](https://dancarlton.github.io/se_project_react)  
**Backend:** [https://api.dancarltonwtwr.students.nomoredomainssbs.ru](https://api.dancarltonwtwr.students.nomoredomainssbs.ru)

---

## 📦 Stack

- **Frontend:** React.js, CSS, BEM Methodology  
- **Backend:** Node.js, Express  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT  
- **Validation:** Celebrate + Joi  
- **API Requests:** RESTful architecture  

---

## ✨ Features

- 🌦 Real-time weather based on geolocation  
- 👕 Shareable clothing items with images, names, and weather tags  
- 💾 User sign-up, login, and profile editing  
- 🧺 Save favorite items to your profile  
- ➕ Add and delete items (authenticated users only)  
- 🛡 JWT-auth protected API routes  

---

## 🧠 Project Structure

### Frontend Repo  
```
https://github.com/dancarlton/wtwr_frontend
```

### Backend Repo  
```
https://github.com/dancarlton/wtwr_backend
```

---

## 🛠 Setup Instructions

### Backend

1. Clone the repo:  
   ```
   git clone https://github.com/dancarlton/wtwr_backend.git
   ```

2. Navigate into the folder and install dependencies:  
   ```
   cd wtwr_backend 
   npm install
   ```
3. Create a `.env` file with the following:
    ```
    PORT=3001
    MONGO_URI=your_mongo_connection
    JWT_SECRET=your_jwt_secret
    ```
4. Start the server:  
    ```
    npm run start
    ```

---

### Frontend

1. Clone the repo:  
    ```
    git clone https://github.com/dancarlton/wtwr_frontend.git
    ```

2. Navigate into the folder and install dependencies:  
    ```
    cd wtwr_frontend  
    npm install
    ```

3. Start the frontend:  
    ```
    npm start
    ```

---

## 📁 Folder Highlights

- `/controllers` – Logic for auth, users, items  
- `/models` – Mongoose schemas  
- `/routes` – API endpoints  
- `/middlewares` – Auth, validation, error handling  

---

## ✅ API Endpoints

| Method | Endpoint            | Description                      |
|--------|---------------------|----------------------------------|
| POST   | `/signup`           | Register a new user              |
| POST   | `/signin`           | Login and receive JWT            |
| GET    | `/users/me`         | Get current user profile         |
| PATCH  | `/users/me`         | Update user profile              |
| GET    | `/clothingItems`            | Get all clothing items           |
| POST   | `/clothingItems`            | Add new item (auth required)     |
| DELETE | `/clothingItems/:id`        | Delete item (owner only)         |
| PUT    | `/clothingItems/:id/likes`  | Like an item                     |
| DELETE | `/clothingItems/:id/likes`  | Unlike an item                   |

---

## 🔐 Validation & Error Handling

- All routes use **Celebrate + Joi** for request validation  
- Centralized error handler for clean JSON responses  
- Custom error classes: `400`, `401`, `403`, `404`, `409`, `500`

---

## 👨‍🎓 Author

Built by **Daniel Carlton** as part of the TripleTen Software Engineering Bootcamp  
🌐 [dancarlton.com](https://dancarlton.com)
