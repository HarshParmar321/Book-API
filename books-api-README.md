
# Books API

A RESTful API for managing books and reviews with secure user authentication.

---

## 🚀 Features

- User Signup & Login with JWT authentication
- Get book details with average ratings and paginated reviews
- Add one review per user per book
- Update/Delete your own reviews
- Search books by title or author (partial, case-insensitive)

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Atlas)
- **ORM**: Mongoose
- **Auth**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Dev Tools**: nodemon, dotenv

---

## 📂 Project Structure

```
books-api/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
├── app.js
├── server.js
├── .env
└── README.md
```

---

## 🧪 Getting Started

### 📥 Install Dependencies

```bash
npm install
```

### ⚙️ Setup Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/booksdb?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret
```

---

### ▶️ Run the Server

```bash
npm run dev
```

---

## 📬 API Endpoints

### 🔐 Auth

#### POST `/auth/signup`
```json
{
  "name": "Harsh Parmar",
  "email": "harsh@example.com",
  "password": "test123"
}

```

#### POST `/auth/login`
```json
{
  "email": "harsh@example.com",
  "password": "test123"
}
```

---

### 📚 Books

#### GET `/books/:id?page=1`  
→ Book info + average rating + paginated reviews

#### GET `/books/search?query=atomic`  
→ Returns matched books

---

### 📝 Reviews (Auth Required)

#### POST `/books/:id/reviews`
```json
{
  "rating": 5,
  "reviewText": "Loved it!"
}
```

#### PUT `/reviews/:id`
```json
{
  "rating": 4,
  "reviewText": "Updated review"
}
```

#### DELETE `/reviews/:id`

---

## 🧠 Design Notes

- One review per user per book (unique index enforced)
- Token-based auth using JWT
- Modular route/controller structure
- Clear environment separation via `.env`

---

## ✅ Submission

1. Push to GitHub
2. Submit the public repo link in the Airtable form

---

## 🙌 Author

**Harsh Parmar**  
