# Role-Based User Dashboard

A production-ready React 18 + Material UI application with comprehensive authentication, role-based access control (RBAC), and user management capabilities.

## Features

- **Authentication System**: Login, signup, and password reset flows with JWT simulation
- **Role-Based Access Control**: Three user roles (Admin, Manager, User) with distinct permissions
- **User Management**: Complete CRUD operations with search, filter, and export (Admin only)
- **Role-Specific Dashboards**: Customized views for each user role
- **Profile Management**: User profile viewing and editing
- **Premium UI/UX**: Material UI components with light/dark theme support
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Accessibility**: WCAG AA compliant with keyboard navigation and ARIA labels
- **Performance**: Code splitting, lazy loading, and optimized bundle size

## Demo Credentials

Use these credentials to test different roles:

- **Admin**: admin@example.com / Admin@123
- **Manager**: manager@example.com / Manager@123
- **User**: user@example.com / User@123

## Tech Stack

- React 18
- Material UI v7
- React Router v7
- Vite
- DataGrid for user management

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common components (Loading, ErrorBoundary, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (AppBar, Sidebar, MainLayout)
│   └── users/          # User management components
├── pages/              # Page components
│   ├── auth/           # Login, Signup, ForgotPassword
│   ├── dashboards/     # Role-specific dashboards
│   ├── users/          # User management pages
│   └── profile/        # User profile pages
├── contexts/           # React contexts (Auth, Theme)
├── hooks/              # Custom React hooks
├── services/           # API and data services
├── utils/              # Utility functions
├── config/             # Configuration files
├── routes/             # Routing configuration
└── theme/              # Material UI theme configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Features by Role

### Admin
- Full user management (create, read, update, delete)
- User search, filtering, and bulk operations
- Export users to CSV
- View system-wide statistics and analytics
- Manage all user roles and permissions

### Manager
- View team dashboard and metrics
- Access team performance data
- Manage team activities

### User
- Personal dashboard with task overview
- Profile management
- Activity tracking and achievements

## License

MIT
