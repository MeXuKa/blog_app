# 📝 Blog App

An early version of a backend-only **Blog App**, built with **Express**, **TypeScript**, **MongoDB**. The app provides basic **CRUD** operations for posts and user management.

---

## ⚙️ Technologies Used

- **Express**
- **TypeScript**
- **MongoDB/Mongoose**
- **Mocha/Chai**
- **Winston**
- **JsonWebToken**

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/MeXuKa/blog_app.git
cd blog_app
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file based on the .env.example:

```env
PORT=3000
MONGODB_URI="mongodb://localhost:27017/blog-db"
SECRET_SIGN="secret_sign"
```

4. Run the development server:

```bash
npm run dev
```

---

## 🧪 Testing

Unit and integration tests are located in the **test/** directory.

- Run tests with:

```bash
npm test
```

---

## 🔁 CI/CD

This project includes a **CI/CD pipeline** (GitHub Actions) that automatically:

- builds the app
- deploys the app to Heroku (You need to set **HEROKU_API_KEY**, **HEROKU_APP_NAME** and **HEROKU_EMAIL** in your repository)

---

## 📓 Logging

The app uses a **logging system** (Winston). You can check app events and errors in **logs/** directory.

---

## 📌 Project Status (Early-stage / Experimental)

Currently under **active development**. Core functionality is being implemented and tested.

---

## 📃 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**MeXuKa**
GitHub: [https://github.com/mexuka](https://github.com/mexuka)

---