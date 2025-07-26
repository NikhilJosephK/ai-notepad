# AI Notepad

A modern, AI-powered note-taking application with a beautiful animated interface and intelligent chat assistant.

## Overview

AI Notepad is a full-stack web application that combines traditional note-taking functionality with AI-powered assistance. Users can create, edit, and manage notes while leveraging an integrated AI chat feature that can understand and answer questions about their notes content.

## ✨ Features

- **User Authentication**: Secure login and signup using Supabase Auth
- **Note Management**: Create, read, update, and delete personal notes
- **AI-Powered Chat**: Ask questions about your notes and get intelligent responses using Groq API
- **Beautiful Animations**: Stunning visual effects including:
  - Animated orb on the homepage
  - Lightning effects on login page
  - Aurora background in chat interface
  - Decrypted text animations
  - Custom cursor animations
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Real-time Updates**: Instant note synchronization

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.5**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Three.js & React Three Fiber**: 3D graphics and effects
- **GSAP**: Advanced animations
- **OGL**: WebGL library for custom effects

### Backend
- **Supabase**: Authentication and backend services
- **PostgreSQL**: Database (via Supabase)
- **Drizzle ORM**: Type-safe database queries
- **Groq API**: AI chat completions

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **TSX**: TypeScript execution

## 📁 Project Structure

```
ai-notepad/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── actions/           # Server actions
│   │   ├── components/        # Shared components
│   │   ├── contexts/          # React contexts
│   │   ├── login/            # Authentication pages
│   │   ├── notes/            # Notes management
│   │   └── page.tsx          # Homepage
│   ├── db/                    # Database schema and config
│   ├── reactbits/             # Custom animation components
│   │   ├── animations/        # Interactive animations
│   │   ├── backgrounds/       # Animated backgrounds
│   │   └── text-animations/   # Text effects
│   └── utils/                 # Utility functions
├── drizzle/                   # Database migrations
├── public/                    # Static assets
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (via Supabase)
- Groq API key

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_url

# Groq AI
GROQ_API_KEY=your_groq_api_key
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-notepad
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run database migrations:
```bash
npm run db:migrate
# or
yarn db:migrate
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Database Schema

The application uses two main tables:

- **users**: Stores user information (id, userId, name, email, createdAt)
- **user_notes**: Stores notes (id, userId, title, content, createdAt)

## 🎨 Custom Components

### Animated Backgrounds
- **Orb**: Interactive 3D orb with hover effects
- **Lightning**: WebGL-powered lightning effects
- **Aurora**: Colorful aurora borealis animation
- **Silk**: Smooth silk-like visual effect
- **RippleGrid**: Grid-based ripple animations

### Text Animations
- **DecryptedText**: Reveals text with a decryption effect

### Interactive Elements
- **TargetCursor**: Custom cursor with animation effects

## 🔒 Security

- Authentication handled by Supabase Auth
- Row-level security for database operations
- Environment variables for sensitive data
- Middleware protection for authenticated routes

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. Please contact the repository owner for contribution guidelines.
