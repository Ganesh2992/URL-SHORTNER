 URL Shortener
 
## 🧱 Tech Stack Overview

| Category        | Technology       | Purpose                              |
|-----------------|------------------|--------------------------------------|
| Backend         | Node.js + Express| REST API development                 |
| Database        | PostgreSQL       | Relational data store                |
| ORM             | Drizzle ORM      | Type-safe database queries and schema|
| Containerization| Docker + Compose | Local PostgreSQL instance            |
| Authentication  | JWT              | Securing private routes              |
| Testing Tool    | Postman          | Manual API testing                   |

## 🔐 Auth Routes

| Method | Endpoint | Description            | Auth Required |
|--------|----------|------------------------|---------------|
| POST   | /signup  | Register a new user    | ❌            |
| POST   | /login   | Login and receive token| ❌            |

---

## 🔗 URL Routes

| Method | Endpoint   | Description                                   | Auth Required |
|--------|------------|-----------------------------------------------|---------------|
| POST   | /shorten   | Create a short URL from a long one            | ✅            |
| GET    | /:shortCode| Redirect to the original URL                  | ❌            |
| GET    | /urls      | Get all URLs created by the logged-in user    | ✅            |
| DELETE | /urls/:id  | Delete a short URL (if it belongs to the user)| ✅            |

