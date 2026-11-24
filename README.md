# Osta

A full-stack MERN blog where an admin writes posts and readers can sign up, comment and like comments.

## Live demo

[osta-uo2r.onrender.com](https://osta-uo2r.onrender.com/)

The demo runs on a free Render instance, so the first load can take a while.

## Features

- Sign up and sign in with email and password (passwords hashed with bcryptjs).
- Google sign-in through Firebase Authentication.
- JWT stored in an `access_token` cookie protects private API routes.
- Rich text post editor (React Quill) with a title, category and cover image.
- Cover images and profile pictures upload to Firebase Storage with a progress bar.
- Each post gets a URL slug (`/post/:postSlug`).
- Search page that filters posts by search term, category and sort order.
- Comments on posts, with edit, delete and like.
- Light and dark theme toggle, saved with Redux Persist.
- User dashboard with a profile page (update details or delete the account).
- Admin-only dashboard pages:
  - overview with total and last-month counts for users, posts and comments
  - create, edit and delete posts
  - list and delete users
  - list and delete comments
- Static pages: Home, About and Projects.

## Tech stack

**Frontend (`client/`)**

- React 18 with Vite
- React Router 6
- Redux Toolkit, React Redux and Redux Persist
- Tailwind CSS and Flowbite React
- React Quill, React Icons, React Hot Toast, Moment
- Firebase (Auth and Storage)

**Backend (`api/`)**

- Node.js and Express
- MongoDB with Mongoose
- JSON Web Token, bcryptjs, cookie-parser, dotenv

## Getting started

Requirements: Node.js and a MongoDB Atlas database.

```bash
# from the repo root
npm install
npm install --prefix client
```

Create a `.env` file in the repo root for the API:

- `DB_USER_NAME`
- `DB_USER_PASSWORD`
- `JWT_SECRET_KEY`

The MongoDB cluster host is set in `api/index.js`. Change it to point at your own cluster.

Create `client/.env` for Firebase:

- `VITE_apiKey`
- `VITE_authDomain`
- `VITE_projectId`
- `VITE_storageBucket`
- `VITE_messagingSenderId`
- `VITE_appId`

Run in development (two terminals):

```bash
npm run dev            # API on http://localhost:3000 (nodemon)
npm run dev --prefix client   # Vite dev server, proxies /api/v1 to port 3000
```

Note: `nodemon` is not listed in `package.json`, so install it globally or use `npm start` instead.

Production build:

```bash
npm run build   # installs dependencies and builds the client into client/dist
npm start       # Express serves the API and client/dist on port 3000
```

## API overview

All routes are under `/api/v1`.

- `auth`: `POST /signup`, `POST /signin`, `POST /google`
- `user`: `PUT /update/:userId`, `DELETE /delete/:userId`, `POST /signout`, `GET /getusers`, `GET /:userId`
- `post`: `POST /create`, `GET /getposts`, `PUT /updatepost/:postId/:userId`, `DELETE /deletepost/:postId/:userId`
- `comment`: `POST /create`, `GET /getpostcomment/:postId`, `PUT /likecomment/:commentId`, `PUT /editcomment/:commentId`, `DELETE /deletecomment/:commentId`, `GET /getcomments`

## Project structure

```
Osta/
├── api/
│   ├── controllers/   # auth, user, post, comment logic
│   ├── models/        # Mongoose models: User, Post, Comment
│   ├── routes/        # Express routers
│   ├── utils/         # error helper, JWT check
│   └── index.js       # Express app entry
├── client/
│   ├── src/
│   │   ├── components/   # Header, PostCard, CommentSection, Search...
│   │   ├── pages/        # Home, PostPage, CreatePost, Dashboard/...
│   │   ├── redux/        # store, user and theme slices
│   │   ├── routes/       # router, private and admin routes
│   │   └── Firebase/     # Firebase config
│   └── vite.config.js
└── package.json        # server scripts
```

## Author

Built by [Sakebul Islam](https://sakebul.com) · [LinkedIn](https://www.linkedin.com/in/sakebul-islam)
