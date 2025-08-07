# Accountability Buddy Platform Documentation

## Overview

Accountability Buddy is a comprehensive web application designed to help users achieve their goals through accountability partnerships. The platform connects users with like-minded partners, enables goal setting and tracking, and provides tools for communication and progress monitoring.

## Brand Identity

### Logo & Name
- **Name**: Accountability Buddy
- **Logo**: Two blue human figures representing partnership and mutual support
- **Color Scheme**: Primary blue (#1E88E6) with supporting colors
- **Typography**: Clean, modern sans-serif fonts

### Brand Values
- **Partnership**: Two people working together toward common goals
- **Accountability**: Mutual responsibility and support
- **Progress**: Continuous improvement and growth
- **Community**: Building connections and relationships

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Features](#features)
3. [User Journey](#user-journey)
4. [Technical Stack](#technical-stack)
5. [Component Structure](#component-structure)
6. [API Integration Points](#api-integration-points)
7. [Deployment Guide](#deployment-guide)
8. [Development Setup](#development-setup)

## Architecture Overview

The application follows a modern React-based architecture with the following key principles:

- **Component-Based Design**: Reusable UI components built with shadcn/ui
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: React hooks and context for local state
- **Routing**: Next.js App Router for file-based routing
- **Authentication Ready**: Prepared for Firebase/Supabase integration
- **Real-time Capabilities**: Structured for live updates and notifications

## Features

### Core Features

#### 1. User Authentication
- **Sign Up/Login**: Email and Google OAuth integration
- **Onboarding Flow**: 4-step guided setup process
- **Profile Management**: Comprehensive user settings and preferences

#### 2. Goal Management
- **Goal Creation**: Set weekly commitments with motivation notes
- **Progress Tracking**: Daily check-ins and completion status
- **Goal Categories**: Productivity, Health, Learning, Creative, Career
- **Archive System**: Manage completed or inactive goals

#### 3. Accountability Partnership
- **Smart Matching**: Algorithm-based partner pairing
- **Communication Tools**: Text, voice, and video call integration
- **Check-in Scheduling**: Automated reminders and countdown timers
- **Anonymous Options**: Privacy-focused pairing available

#### 4. Progress Analytics
- **Calendar Heatmap**: Year-long activity visualization
- **Streak Tracking**: Daily consistency monitoring
- **Weekly Summaries**: Goal completion statistics
- **Badge System**: Achievement recognition and gamification

#### 5. Admin Panel
- **User Management**: View and manage all registered users
- **Match Creation**: Manual partner pairing capabilities
- **Analytics Dashboard**: Platform usage statistics
- **Data Export**: CSV export functionality

### Advanced Features

#### 1. Notification System
- **Toast Notifications**: Real-time feedback for user actions
- **Email Reminders**: Goal and check-in notifications
- **Push Notifications**: Browser-based alerts (ready for implementation)

#### 2. Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Sidebar Navigation**: Collapsible menu with shadcn/ui components
- **Touch-Friendly**: Mobile gesture support

#### 3. Accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes

## User Journey

### 1. Registration & Onboarding
\`\`\`
Landing Page → Sign Up → Email Verification → Onboarding Flow → Dashboard
\`\`\`

**Onboarding Steps:**
1. **Personal Info**: Name and timezone
2. **Preferences**: Availability and communication method
3. **Goal Focus**: Category selection and privacy settings
4. **Profile Preview**: Review and confirmation

### 2. Goal Setting & Management
\`\`\`
Dashboard → Goals Page → Create Goal → Set Frequency → Add Motivation → Save
\`\`\`

### 3. Partner Matching
\`\`\`
Complete Onboarding → Matching Algorithm → Partner Assignment → First Contact
\`\`\`

### 4. Daily Workflow
\`\`\`
Login → Dashboard → Check Goals → Mark Complete → View Progress → Buddy Check-in
\`\`\`

### 5. Progress Tracking
\`\`\`
Progress Page → View Heatmap → Filter by Goal → Check Streaks → Review Analytics
\`\`\`

## Technical Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useContext)

### Backend Integration Points
- **Authentication**: Firebase Auth or Supabase Auth
- **Database**: Supabase PostgreSQL or Firebase Firestore
- **Real-time**: Supabase Realtime or Firebase Realtime Database
- **Storage**: Vercel Blob or Supabase Storage
- **Email**: Resend or SendGrid

### Development Tools
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript compiler

## Component Structure

### Layout Components
\`\`\`
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Landing page
├── auth/
│   ├── login/page.tsx        # Login page
│   └── signup/page.tsx       # Sign up page
├── onboarding/page.tsx       # Onboarding flow
├── dashboard/
│   ├── layout.tsx            # Dashboard layout with sidebar
│   └── page.tsx              # Main dashboard
├── goals/
│   ├── layout.tsx            # Goals layout
│   └── page.tsx              # Goal management
├── progress/
│   ├── layout.tsx            # Progress layout
│   └── page.tsx              # Progress tracking
├── buddy/
│   ├── layout.tsx            # Buddy layout
│   └── page.tsx              # Buddy information
├── badges/
│   ├── layout.tsx            # Badges layout
│   └── page.tsx              # Achievement badges
├── admin/
│   ├── layout.tsx            # Admin layout
│   └── page.tsx              # Admin panel
└── settings/
    ├── layout.tsx            # Settings layout
    └── page.tsx              # User settings
\`\`\`

### Reusable Components
\`\`\`
components/
├── logo.tsx                  # Brand logo component
├── app-sidebar.tsx           # Main navigation sidebar
├── ui/                       # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── sidebar.tsx
│   └── ...
└── custom/                   # Custom components
    ├── goal-card.tsx
    ├── progress-chart.tsx
    ├── buddy-widget.tsx
    └── badge-grid.tsx
\`\`\`

## API Integration Points

### Authentication Endpoints
\`\`\`typescript
// User registration
POST /api/auth/register
{
  name: string
  email: string
  password: string
}

// User login
POST /api/auth/login
{
  email: string
  password: string
}

// OAuth callback
GET /api/auth/callback/google
\`\`\`

### User Management
\`\`\`typescript
// Get user profile
GET /api/users/profile

// Update user profile
PUT /api/users/profile
{
  name?: string
  timezone?: string
  preferences?: UserPreferences
}

// Complete onboarding
POST /api/users/onboarding
{
  personalInfo: PersonalInfo
  preferences: Preferences
  goalFocus: GoalFocus
}
\`\`\`

### Goal Management
\`\`\`typescript
// Create goal
POST /api/goals
{
  title: string
  frequency: string
  motivation?: string
  category: string
}

// Update goal
PUT /api/goals/:id
{
  title?: string
  frequency?: string
  motivation?: string
}

// Mark goal complete
POST /api/goals/:id/complete
{
  date: string
  completed: boolean
}

// Get user goals
GET /api/goals?status=active|archived
\`\`\`

### Buddy System
\`\`\`typescript
// Get buddy information
GET /api/buddy

// Update communication preferences
PUT /api/buddy/preferences
{
  communicationMethod: string
  preferredTime: string
  availability: string[]
}

// Log check-in
POST /api/buddy/checkin
{
  type: string
  duration: number
  notes?: string
}
\`\`\`

### Progress Tracking
\`\`\`typescript
// Get progress data
GET /api/progress?period=week|month|year

// Get streak information
GET /api/progress/streaks

// Get badge progress
GET /api/badges
\`\`\`

### Admin Endpoints
\`\`\`typescript
// Get all users
GET /api/admin/users?page=1&limit=50&filter=matched|unmatched

// Create manual match
POST /api/admin/matches
{
  user1Id: string
  user2Id: string
}

// Export user data
GET /api/admin/export?format=csv
\`\`\`

## Data Models

### User Model
\`\`\`typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  timezone: string
  createdAt: Date
  lastActive: Date
  status: 'active' | 'inactive'
  preferences: UserPreferences
  onboardingCompleted: boolean
}

interface UserPreferences {
  goalCategory: string
  communicationMethod: 'text' | 'call' | 'video'
  availability: string[]
  preferredTime: string
  anonymousMode: boolean
  notifications: NotificationSettings
}
\`\`\`

### Goal Model
\`\`\`typescript
interface Goal {
  id: string
  userId: string
  title: string
  frequency: string
  motivation?: string
  category: string
  isActive: boolean
  createdAt: Date
  completions: GoalCompletion[]
}

interface GoalCompletion {
  id: string
  goalId: string
  date: Date
  completed: boolean
  notes?: string
}
\`\`\`

### Buddy Match Model
\`\`\`typescript
interface BuddyMatch {
  id: string
  user1Id: string
  user2Id: string
  matchedAt: Date
  status: 'active' | 'inactive'
  sharedCategory: string
  checkins: CheckIn[]
}

interface CheckIn {
  id: string
  matchId: string
  date: Date
  type: 'text' | 'call' | 'video'
  duration: number
  status: 'completed' | 'missed'
  notes?: string
}
\`\`\`

### Badge Model
\`\`\`typescript
interface Badge {
  id: string
  name: string
  description: string
  category: 'streak' | 'goal' | 'social' | 'elite'
  requirement: string
  icon: string
  color: string
}

interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: Date
}
\`\`\`

## Deployment Guide

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (recommended)
- Database setup (Supabase/Firebase)

### Environment Variables
\`\`\`bash
# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# Database
DATABASE_URL=your-database-connection-string

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email
RESEND_API_KEY=your-resend-api-key

# Storage
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

### Deployment Steps

#### 1. Vercel Deployment (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
\`\`\`

#### 2. Manual Deployment
\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

#### 3. Database Setup
\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  avatar_url VARCHAR,
  timezone VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  frequency VARCHAR NOT NULL,
  motivation TEXT,
  category VARCHAR NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Additional tables for completions, matches, badges, etc.
\`\`\`

## Development Setup

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/your-org/accountability-buddy-platform.git
cd accountability-buddy-platform
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup
\`\`\`bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local
\`\`\`

### 4. Database Setup
\`\`\`bash
# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed
\`\`\`

### 5. Start Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

### 6. Access Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## Testing Strategy

### Unit Testing
\`\`\`bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage
\`\`\`

### Integration Testing
\`\`\`bash
# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
\`\`\`

### Testing Structure
\`\`\`
__tests__/
├── components/           # Component tests
├── pages/               # Page tests
├── api/                 # API endpoint tests
├── utils/               # Utility function tests
└── e2e/                 # End-to-end tests
\`\`\`

## Performance Optimization

### Code Splitting
- Automatic route-based code splitting with Next.js
- Dynamic imports for heavy components
- Lazy loading for non-critical features

### Image Optimization
- Next.js Image component for automatic optimization
- WebP format support
- Responsive image loading

### Caching Strategy
- Static generation for public pages
- ISR (Incremental Static Regeneration) for dynamic content
- Client-side caching with SWR/React Query

## Security Considerations

### Authentication Security
- JWT token management
- Secure cookie handling
- OAuth 2.0 implementation
- Password hashing with bcrypt

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF token implementation

### Privacy Features
- Anonymous mode support
- Data encryption at rest
- GDPR compliance ready
- User data export/deletion

## Monitoring & Analytics

### Error Tracking
- Sentry integration for error monitoring
- Custom error boundaries
- API error logging

### Performance Monitoring
- Core Web Vitals tracking
- API response time monitoring
- Database query optimization

### User Analytics
- Goal completion rates
- User engagement metrics
- Feature usage statistics
- A/B testing framework ready

## Contributing Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit pull request with description

### Development Workflow
\`\`\`bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
\`\`\`

## Troubleshooting

### Common Issues

#### 1. Sidebar Context Error
\`\`\`
Error: useSidebar must be used within a SidebarProvider
\`\`\`
**Solution**: Ensure all dashboard routes have proper layout files with SidebarProvider wrapper.

#### 2. Build Errors
\`\`\`
Type error: Cannot find module '@/components/ui/...'
\`\`\`
**Solution**: Check component imports and ensure all shadcn/ui components are properly installed.

#### 3. Database Connection Issues
\`\`\`
Error: Connection refused
\`\`\`
**Solution**: Verify database URL and credentials in environment variables.

### Debug Mode
\`\`\`bash
# Enable debug logging
DEBUG=* npm run dev

# Database query logging
DATABASE_LOGGING=true npm run dev
\`\`\`

## Future Enhancements

### Planned Features
- [ ] Mobile app (React Native)
- [ ] Real-time chat system
- [ ] Video call integration
- [ ] Advanced analytics dashboard
- [ ] Team accountability features
- [ ] Integration with fitness trackers
- [ ] AI-powered goal suggestions
- [ ] Habit tracking expansion

### Technical Improvements
- [ ] GraphQL API implementation
- [ ] Redis caching layer
- [ ] Microservices architecture
- [ ] Advanced search functionality
- [ ] Offline support with PWA
- [ ] Multi-language support (i18n)

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Community
- GitHub Issues for bug reports
- Discord server for community support
- Weekly development updates
- Contribution guidelines

### Contact
- **Email**: support@accountabilitybuddy.com
- **GitHub**: https://github.com/your-org/accountability-buddy-platform
- **Documentation**: https://docs.accountabilitybuddy.com

---

*This documentation is maintained by the Accountability Buddy development team and is updated regularly to reflect the latest features and best practices.*
