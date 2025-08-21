# Article Management API

REST API backend untuk sistem manajemen artikel/blog yang dibangun menggunakan Golang dengan Gin framework, GORM ORM, dan MySQL database.

## 🚀 Tech Stack

- **Go 1.24.6** - Programming language
- **Gin Framework** - High-performance HTTP web framework
- **GORM** - Object-relational mapping library
- **MySQL** - Primary database
- **CORS** - Cross-Origin Resource Sharing support

## 📦 Dependencies

### Core Dependencies
- `github.com/gin-gonic/gin` - HTTP web framework
- `gorm.io/gorm` - ORM library
- `gorm.io/driver/mysql` - MySQL driver untuk GORM
- `github.com/gin-contrib/cors` - CORS middleware

### Additional Libraries
- `github.com/go-playground/validator/v10` - Struct validation
- `github.com/bytedance/sonic` - High-performance JSON library
- `golang.org/x/crypto` - Cryptography packages

## 🛠️ Installation

1. Clone repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
go mod download
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env file sesuai konfigurasi
```

4. Setup database (MySQL atau SQLite)

5. Run the application
```bash
go run main.go
```

Server akan berjalan di `http://localhost:8080`

## 🔧 Configuration

### Environment Variables

Database connection sudah dikonfigurasi untuk development:
```env
# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=article

# Server Configuration
PORT=8080
GIN_MODE=debug                               # release untuk production

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173   # Frontend URL
```

### MySQL Database Setup
```sql
CREATE DATABASE article;
USE article;
```
Table `posts` akan dibuat otomatis melalui GORM AutoMigrate.

## 📁 Project Structure

```
backend/
├── main.go              # Entry point aplikasi
├── go.mod               # Go module dependencies
├── go.sum               # Go module checksums
├── controllers/         # Handler functions untuk routes
├── models/             # Database models (GORM structs)
└── routes/             # Route definitions dan setup
```

## 🗄️ Database

### Database Schema

**Posts Table:**
```go
type Post struct {
    Id          uint      `gorm:"primaryKey;autoIncrement"`
    Title       string    `gorm:"size:200;not null"`
    Content     string    `gorm:"type:text;not null"`
    Category    string    `gorm:"size:100;not null"`
    Status      string    `gorm:"size:100;not null"`
    CreatedDate time.Time `gorm:"autoCreateTime"`
    UpdatedDate time.Time `gorm:"autoUpdateTime"`
}
```

### Database Setup

**MySQL:**
```sql
CREATE DATABASE article;
```

**Auto Migration:**
Table akan dibuat otomatis saat aplikasi pertama kali dijalankan melalui `models.Migrate(db)`.

## 🏗️ Code Structure

### main.go
Entry point aplikasi yang berisi:
- MySQL database connection (`article` database)
- GORM AutoMigrate untuk Post model
- CORS middleware setup untuk frontend (localhost:5173)
- Route initialization
- Server startup di port 8080

### models/
**Post Model:**
```go
type Post struct {
    Id          uint      `gorm:"primaryKey;autoIncrement"`
    Title       string    `gorm:"size:200;not null"`
    Content     string    `gorm:"type:text;not null"`
    Category    string    `gorm:"size:100;not null"`
    Status      string    `gorm:"size:100;not null"`
    CreatedDate time.Time `gorm:"autoCreateTime"`
    UpdatedDate time.Time `gorm:"autoUpdateTime"`
}
```

### controllers/
Handler functions dengan built-in validation:
- `CreatePost()` - Create new article dengan validasi
- `GetPosts()` - Get articles dengan pagination (limit/offset)
- `GetPostById()` - Get single article by ID
- `UpdatePost()` - Update existing article
- `MoveToTrash()` - Soft delete dengan status change ke "thrash"

### routes/
Route definitions untuk article management:
- POST `/article/` - Create
- GET `/articles/:limit/:offset` - List dengan pagination
- GET `/article/:id` - Detail
- PUT `/article/:id` - Update
- POST `/article/:id/trash` - Soft delete

## 🛣️ API Endpoints

### Base URL
```
http://localhost:8080
```

### Article Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/article/` | Create new article |
| GET | `/articles/{limit}/{offset}` | Get articles with pagination |
| GET | `/article/{id}` | Get article by ID |
| PUT | `/article/{id}` | Update article |
| POST | `/article/{id}/trash` | Move article to trash |

### Request/Response Examples

**Create Article:**
```bash
POST /article/
Content-Type: application/json

{
    "title": "My Amazing Article Title Here",
    "content": "This is the content of my article. It must be at least 200 characters long to pass validation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "category": "Technology",
    "status": "draft"
}
```

**Get Articles:**
```bash
GET /articles/10/0
# Returns 10 articles starting from offset 0
```

**Update Article:**
```bash
PUT /article/1
Content-Type: application/json

{
    "title": "Updated Article Title Here",
    "content": "Updated content that is also at least 200 characters long...",
    "category": "Tech News",
    "status": "publish"
}
```

### Validation Rules
- **Title**: Minimum 20 characters
- **Content**: Minimum 200 characters  
- **Category**: Minimum 3 characters
- **Status**: Must be one of: `publish`, `draft`, `thrash`

## 🔒 Security Features

- **CORS Protection** - Configured untuk frontend domain
- **Input Validation** - Menggunakan validator/v10
- **SQL Injection Prevention** - GORM parameter binding
- **JSON Security** - High-performance Sonic JSON library

## 🧪 Testing

```bash
# Run tests
go test ./...

# Run tests dengan coverage
go test -cover ./...

# Run specific test
go test ./controllers -v
```

## 📊 Performance

- **High-performance JSON** - Menggunakan Sonic library
- **Connection Pooling** - GORM database connection pooling
- **Gin Framework** - Minimal overhead HTTP framework
- **Efficient Memory Usage** - Go's garbage collector

## 🚀 Deployment

### Build for Production
```bash
# Build binary
go build -o backend main.go

# Set production mode
export GIN_MODE=release

# Run binary
./backend
```

### Docker (Opsional)
```dockerfile
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o backend main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/backend .
CMD ["./backend"]
```

## 📝 Development Guidelines

1. **Models**: Definisikan struct dengan GORM tags dan validation tags
2. **Controllers**: Pisahkan business logic per endpoint
3. **Routes**: Group routes berdasarkan resource (users, products, etc.)
4. **Error Handling**: Gunakan consistent error response format
5. **Validation**: Implementasikan input validation di controller
6. **Database**: Gunakan GORM AutoMigrate untuk schema management

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Pastikan database server berjalan
- Cek kredensial di .env file
- Verify network connectivity

**CORS Error:**
- Update `CORS_ALLOWED_ORIGINS` di .env
- Pastikan frontend URL sesuai

**Port Already in Use:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

**Happy Coding! 🚀**
