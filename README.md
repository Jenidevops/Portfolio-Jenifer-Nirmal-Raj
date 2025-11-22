# 🚀 Full-Stack Portfolio Application

A stunning, modern portfolio web application featuring animated particles, typewriter effects, and a beautiful purple gradient theme.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### Stage 1: MVP Features ✅
- **Project Management (CRUD)**
  - Create, Read, Update, Delete your own projects
  - Each project includes: Title, Description, Tags, GitHub Link, Live Demo Link
  - View all projects (most recent first)
  - Full project details page
  
- **Authentication**
  - Firebase Google Authentication
  - User profiles with bio and social links
  
- **Comments System**
  - Authenticated users can comment on projects
  - Real-time comment display
  
- **Modern UI**
  - Animated particle background
  - Typewriter effects
  - Smooth animations with Framer Motion
  - Mobile-responsive design
  - Purple gradient theme (#c770f0)
  
- **Backend API**
  - RESTful API with Express.js
  - MongoDB for data persistence
  - Proper error handling

### Stage 2: Enhanced Features ✅
- **Search & Filter**
  - Filter projects by tags
  - Search by title/description
  
- **Rating System**
  - Users can rate projects (1-5 stars)
  - Average rating display
  
- **User Profiles**
  - View user bio and their projects
  - Social media links
  
- **Interactions**
  - Like button for projects and blogs
  - Bookmark favorite projects
  
- **Dashboard**
  - Total projects, users, views statistics
  - Most liked project
  - Recent projects feed
  
- **Blog System**
  - Create and publish blogs
  - Blog listing with pagination
  - Like and view count

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Particles** - Animated background
- **Typewriter Effect** - Typing animations
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin** - Authentication
- **Express Validator** - Input validation

### Authentication
- **Firebase Authentication** - Google OAuth

## 📁 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ParticlesBg.js
│   │   │   ├── ProjectCard.js
│   │   │   ├── BlogCard.js
│   │   │   └── TechStack.js
│   │   ├── contexts/      # React contexts
│   │   │   └── AuthContext.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── About.js
│   │   │   ├── Projects.js
│   │   │   ├── ProjectDetails.js
│   │   │   ├── Blogs.js
│   │   │   ├── Resume.js
│   │   │   └── Profile.js
│   │   ├── utils/         # Utilities
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                # Express backend
│   ├── controllers/       # Request handlers
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   ├── commentController.js
│   │   ├── blogController.js
│   │   └── dashboardController.js
│   ├── models/            # MongoDB models
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Comment.js
│   │   └── Blog.js
│   ├── routes/            # API routes
│   │   ├── userRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── blogRoutes.js
│   │   └── dashboardRoutes.js
│   ├── middleware/        # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js          # Entry point
│   └── package.json
│
└── package.json           # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Firebase account

### Installation

1. **Clone the repository**
```bash
cd ~/Desktop/portfolio
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Set up environment variables**

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

Create `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication
   - Download service account key for backend
   - Copy web app config for frontend

5. **Start MongoDB**
```bash
mongod
```

6. **Run the application**
```bash
# Development mode (runs both client and server)
npm run dev

# Or run separately:
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

## 📡 API Endpoints

### Users
- `POST /api/users/auth` - Get or create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/bookmark/:projectId` - Toggle bookmark (protected)
- `GET /api/users/stats/me` - Get user stats (protected)

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/:id/like` - Toggle like (protected)
- `POST /api/projects/:id/rate` - Rate project (protected)
- `GET /api/projects/user/:userId` - Get user's projects

### Comments
- `GET /api/comments/project/:projectId` - Get project comments
- `POST /api/comments/project/:projectId` - Create comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)
- `POST /api/blogs/:id/like` - Toggle like (protected)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🎨 Customization

### Update Personal Information
1. ✅ **Already updated!** Your information from the resume has been integrated
2. Your GitHub username is set to `Jenidevops` for the contribution calendar
3. Your resume is available at `/resume.html` in the public folder
4. Social links point to:
   - GitHub: https://github.com/Jenidevops
   - LinkedIn: https://linkedin.com/in/jenidevops
   - Email: jenidevops@gmail.com

### Update Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#c770f0',      // Main purple
  secondary: '#a24dd3',    // Secondary purple
  dark: '#0a0118',         // Background dark
  darker: '#1b1a2e',       // Card background
  accent: '#e31b6d',       // Accent pink
}
```

### Tech Stack Icons
Edit `client/src/components/TechStack.js` to add/remove technologies

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build the client:
```bash
cd client && npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Backend (Render/Railway)
1. Create account on Render/Railway
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in server `.env`

## 🎯 Learning Outcomes

- ✅ End-to-end CRUD operations
- ✅ RESTful API design
- ✅ Component-driven development with React
- ✅ State management and props
- ✅ Authentication with Firebase
- ✅ Database design with MongoDB
- ✅ Modern UI/UX with Tailwind CSS
- ✅ Animations with Framer Motion
- ✅ Clean code and project structure
- ✅ Deployment & environment configuration

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Jenifer Nirmal Raj**
- GitHub: [@Jenidevops](https://github.com/Jenidevops)
- LinkedIn: [Jenifer Nirmal Raj](https://linkedin.com/in/jenidevops)
- Email: jenidevops@gmail.com
- Location: San Clemente, CA

## 🌟 Show your support

Give a ⭐️ if you like this project!

---

**Built with ❤️ using MERN Stack**
