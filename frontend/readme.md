# Frontend Project

Sebuah aplikasi web modern yang dibangun menggunakan React, Vite, dan TailwindCSS dengan arsitektur state management Redux Toolkit.

## 🚀 Tech Stack

- **React 18** - Library JavaScript untuk membangun user interface
- **Vite** - Build tool yang cepat dan modern
- **Redux Toolkit** - State management yang efisien
- **React Router DOM** - Routing untuk aplikasi React
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Component library untuk TailwindCSS
- **Axios** - HTTP client untuk API calls

## 📦 Dependencies

### Core Dependencies
- `react` & `react-dom` - Framework utama
- `@reduxjs/toolkit` & `react-redux` - State management
- `react-router-dom` - Routing system
- `axios` - HTTP requests
- `react-icons` - Icon library
- `react-toastify` - Toast notifications

### Development Dependencies
- `vite` - Build tool dan dev server
- `@vitejs/plugin-react` - Vite plugin untuk React
- `tailwindcss`, `postcss`, `autoprefixer` - Styling tools
- `daisyui` - UI components
- `eslint` - Code linting

## 🛠️ Installation

1. Clone repository ini
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

## 🚀 Available Scripts

- **Development Server**
  ```bash
  npm run dev
  ```
  Menjalankan aplikasi dalam mode development di `http://localhost:5173`

- **Build Production**
  ```bash
  npm run build
  ```
  Membuat build optimized untuk production

- **Lint Code**
  ```bash
  npm run lint
  ```
  Menjalankan ESLint untuk memeriksa kualitas code

- **Preview Production Build**
  ```bash
  npm run preview
  ```
  Preview hasil build production secara lokal

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── store/         # Redux store configuration
├── services/      # API services
├── hooks/         # Custom hooks
├── utils/         # Utility functions
└── styles/        # Global styles
```

## 🎨 Styling

Proyek ini menggunakan:
- **TailwindCSS** untuk utility classes
- **DaisyUI** untuk pre-built components
- **React Icons** untuk ikon

## 🔧 Configuration

- **Vite Configuration**: `vite.config.js`
- **TailwindCSS Configuration**: `tailwind.config.js`
- **PostCSS Configuration**: `postcss.config.js`
- **ESLint Configuration**: `.eslintrc.cjs`

## 📝 Development Guidelines

1. Gunakan ESLint untuk menjaga kualitas code
2. Ikuti konvensi penamaan komponen React (PascalCase)
3. Gunakan Redux Toolkit untuk state management
4. Manfaatkan TailwindCSS untuk styling
5. Gunakan React Router untuk navigasi

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

**Happy Coding! 🎉**
