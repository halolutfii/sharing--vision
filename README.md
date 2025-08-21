# Article Management System

Full-stack web application untuk sistem manajemen artikel/blog yang dibangun menggunakan React frontend dan Golang backend API.

## 🏗️ Architecture

```
┌─────────────────┐      HTTP/JSON      ┌─────────────────┐
│   React Frontend │ ◄─────────────────► │  Golang Backend │
│                 │                     │                 │
│ • Redux Toolkit │                     │ • Gin Framework │
│ • TailwindCSS   │                     │ • GORM ORM      │
│ • DaisyUI       │                     │ • MySQL DB      │
│ • Axios         │                     │ • CORS Support  │
└─────────────────┘                     └─────────────────┘
        :5173                                   :8080
```

## 🚀 Tech Stack

### Frontend
- **React 18** - Library JavaScript untuk UI
- **Vite** - Build tool yang cepat dan modern
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Axios** - HTTP client untuk API calls
- **React Toastify** - Toast notifications

### Backend
- **Go 1.24.6** - Programming language
- **Gin Framework** - High-performance HTTP web framework
- **GORM** - Object-relational mapping library
- **MySQL** - Database
- **CORS** - Cross-Origin Resource Sharing support

## 📁 Project Structure

```
project-root/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── store/             # Redux store configuration
│   │   ├── services/          # API services
│   │   └── styles/            # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Golang API
│   ├── controllers/            # Handler functions
│   ├── models/                # Database models
│   ├── routes/                # Route definitions
│   ├── main.go                # Entry point
│   ├── go.mod
│   └── go.sum
│
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Go** (1.24.6)
- **MySQL** server
- **npm** atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd project-root
```

### 2. Backend Setup

```bash
cd backend
```

**Database Setup:**
```sql
CREATE DATABASE article;
```

**Install Dependencies:**
```bash
go mod download
```

**Start Backend Server:**
```bash
go run main.go
```
Backend akan berjalan di `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
```

**Install Dependencies:**
```bash
npm install
```

**Environment Variables:**
Buat file `.env` di folder frontend:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Article Management System
```

**Start Development Server:**
```bash
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`

## 🗄️ Database Schema

**Posts Table:**
```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🛣️ API Endpoints

### Base URL: `http://localhost:8080`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/article/` | Create new article |
| GET | `/articles/{limit}/{offset}` | Get articles with pagination |
| GET | `/article/{id}` | Get article by ID |
| PUT | `/article/{id}` | Update article |
| POST | `/article/{id}/trash` | Move article to trash |

### Request Examples

**Create Article:**
```json
POST /article/
{
    "title": "My Amazing Article Title Here (min 20 chars)",
    "content": "Article content must be at least 200 characters long. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    "category": "Technology",
    "status": "draft"
}
```

**Get Articles with Pagination:**
```bash
GET /articles/10/0  # Get 10 articles, starting from offset 0
```

### Validation Rules
- **Title**: Minimum 20 characters
- **Content**: Minimum 200 characters
- **Category**: Minimum 3 characters
- **Status**: Must be `publish`, `draft`, or `thrash`

## 🎨 Frontend Features

- ✅ **Article List** - Paginated view dengan search dan filter
- ✅ **Create Article** - Form dengan validation
- ✅ **Edit Article** - Update existing articles
- ✅ **Article Detail** - View single article
- ✅ **Trash Management** - Soft delete functionality
- ✅ **Responsive Design** - Mobile-friendly UI
- ✅ **Toast Notifications** - User feedback untuk actions
- ✅ **Loading States** - Better UX dengan loading indicators

## 🚀 Available Scripts

### Frontend Scripts
```bash
cd frontend

npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts
```bash
cd backend

go run main.go   # Start development server
go build         # Build binary untuk production
go test ./...    # Run tests
```

## 🔧 Configuration

### Frontend Configuration
- **Vite**: `vite.config.js`
- **TailwindCSS**: `tailwind.config.js`
- **ESLint**: `.eslintrc.cjs`

### Backend Configuration
Database connection di `main.go`:
```go
dsn := "root@tcp(127.0.0.1:3306)/article?charset=utf8mb4&parseTime=True&loc=Local"
```

CORS setup untuk frontend:
```go
AllowOrigins: []string{"http://localhost:5173"}
```

## 🔒 Security Features

- **CORS Protection** - Configured untuk frontend domain
- **Input Validation** - Client dan server-side validation
- **SQL Injection Prevention** - GORM parameter binding
- **XSS Protection** - Sanitized input handling

## 🚀 Production Deployment

### Backend Deployment
```bash
cd backend
go build -o article-api main.go

# Set production mode
export GIN_MODE=release

# Run binary
./article-api
```

### Frontend Deployment
```bash
cd frontend
npm run build

# Deploy dist/ folder ke static hosting
# (Vercel, Netlify, atau web server)
```

### Environment Variables untuk Production
**Frontend (.env.production):**
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=Article Management System
```

**Backend:**
```env
GIN_MODE=release
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
```

## 📊 Development Workflow

1. **Start Backend Server** - `go run main.go` di terminal pertama
2. **Start Frontend Dev** - `npm run dev` di terminal kedua
3. **Database Migration** - Otomatis via GORM AutoMigrate
4. **API Testing** - Gunakan Postman atau Thunder Client
5. **Frontend Testing** - Test di browser dengan hot reload

## 🐛 Troubleshooting

### Common Issues

**CORS Error:**
```
Access to fetch at 'http://localhost:8080' from origin 'http://localhost:5173' has been blocked
```
**Solution:** Pastikan backend CORS middleware sudah include frontend URL.

**Database Connection Error:**
```
failed to connect database
```
**Solution:** 
- Pastikan MySQL server running
- Cek database `article` sudah dibuat
- Verify connection string di main.go

**Frontend API Error:**
```
Network Error / 404
```
**Solution:**
- Pastikan backend server running di port 8080
- Cek VITE_API_BASE_URL di .env file

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome-feature`)
5. Open Pull Request

### Development Guidelines
- Follow REST API conventions
- Use consistent error handling
- Implement proper validation
- Write meaningful commit messages
- Test both frontend dan backend changes

**Happy Coding! 🚀**
