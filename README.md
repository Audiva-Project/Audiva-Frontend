# Melodies - Music Streaming App

A modern music streaming application built with React, Vite, TypeScript, and Zustand, featuring a beautiful dark theme interface.

## 🎵 Features

- **Modern UI/UX** - Dark theme with beautiful gradients and animations
- **Music Player** - Full-featured player with controls and progress tracking
- **Song Discovery** - Weekly top songs, new releases, and trending tracks
- **User Authentication** - Login and signup functionality
- **Responsive Design** - Works perfectly on desktop and mobile
- **State Management** - Efficient state handling with Zustand
- **TypeScript** - Full type safety throughout the application

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Fast build tool and development server
- **TypeScript** - Type safety and better developer experience
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS Custom Properties** - Modern styling with CSS variables

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Header, Player)
│   ├── sections/        # Page sections (Hero, WeeklyTop, etc.)
│   └── ui/              # Reusable UI components
├── pages/               # Page components
├── stores/              # Zustand stores
├── types/               # TypeScript type definitions
├── data/                # Mock data
└── styles/              # Global styles
\`\`\`

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd melodies
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Features Overview

### 🏠 Home Page
- **Hero Section** - "All the Best Songs in One Place" with call-to-action buttons
- **Weekly Top Songs** - Grid of popular tracks with hover effects
- **New Release Songs** - Latest music releases
- **Trending Songs** - Table view with rankings and detailed information

### 🎵 Music Player
- **Play/Pause Controls** - Full playback control
- **Progress Bar** - Visual progress tracking
- **Volume Control** - Adjustable volume slider
- **Track Information** - Current song details with album art

### 👤 User System
- **Authentication** - Login and signup pages
- **User Profiles** - Personal music preferences
- **Playlists** - Create and manage custom playlists

### 📱 Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Adaptive Layout** - Sidebar collapses on smaller screens
- **Touch-Friendly** - Large touch targets for mobile interaction

## 🎨 Design System

### Colors
- **Background**: Deep blacks and dark grays
- **Accent**: Blue (#2e77d0) and Green (#1db954)
- **Text**: White primary, gray secondary

### Typography
- **Font**: Inter font family
- **Sizes**: Responsive typography scale
- **Weights**: 300-800 range for different emphasis

### Components
- **Cards**: Rounded corners with hover effects
- **Buttons**: Multiple variants (primary, secondary)
- **Forms**: Consistent styling with focus states

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### Layout Components
- **Sidebar** - Navigation with music library sections
- **Header** - Search bar and user authentication
- **Player** - Bottom music player with full controls

### UI Components
- **SongCard** - Individual song display with play button
- **TrendingRow** - Table row for trending songs list
- **Button** - Reusable button with multiple variants

### State Management
- **Player Store** - Music playback state and controls
- **User Store** - Authentication and user preferences

## 🚀 Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy the `dist` folder** to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for music lovers everywhere**
