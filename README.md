# Role-Based User Dashboard

A production-ready React 18 + Material UI application with comprehensive authentication, role-based access control (RBAC), and user management capabilities. Built with modern web technologies for a seamless user experience across all devices.

## ✨ Features

- **🔐 Authentication System**: Complete login, signup, and password reset flows with JWT simulation
- **👥 Role-Based Access Control**: Three user roles (Admin, Manager, Viewer) with distinct permissions and dashboards
- **📊 User Management**: Full CRUD operations with search, filter, pagination, and CSV export (Admin only)
- **🎨 Premium UI/UX**: Material UI v7 components with light/dark theme support and smooth animations
- **📱 Responsive Design**: Mobile-first, fully responsive across all devices and screen sizes
- **♿ Accessibility**: WCAG AA compliant with keyboard navigation and ARIA labels
- **⚡ Performance**: Code splitting, lazy loading, and optimized bundle size for fast load times
- **🛡️ Protected Routes**: Route-level access control based on user roles
- **💾 Data Persistence**: LocalStorage-based session management with auto-logout on token expiry

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** 16.x or higher
- **npm** 7.x or higher (comes with Node.js)

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd role-based-user-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Demo Credentials

Use these credentials to test different roles and access levels:

| Role    | Email                  | Password    | Permissions                           |
|---------|------------------------|-------------|---------------------------------------|
| Admin   | admin@example.com      | Admin@123   | Full system access, user management   |
| Manager | manager@example.com    | Manager@123 | Team dashboard, limited management    |
| Viewer  | user@example.com       | User@123    | Personal dashboard, profile access    |

## 📁 Project Structure

```
role-based-user-dashboard/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Auth-related components (ProtectedRoute)
│   │   ├── common/          # Shared components (Loading, ErrorBoundary, etc.)
│   │   ├── dashboard/       # Dashboard widgets and cards
│   │   ├── layout/          # Layout components (AppBar, Sidebar, MainLayout)
│   │   └── users/           # User management components (UserTable, Forms)
│   │
│   ├── pages/               # Page-level components
│   │   ├── auth/            # Login, Signup, ForgotPassword
│   │   ├── dashboards/      # Role-specific dashboard pages
│   │   ├── users/           # User management pages
│   │   └── profile/         # User profile pages
│   │
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   └── ThemeContext.jsx # Theme (light/dark) management
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Hook to access auth context
│   │   └── useTheme.js      # Hook to access theme context
│   │
│   ├── services/            # API and business logic
│   │   ├── authService.js   # Authentication API (JWT simulation)
│   │   ├── userService.js   # User CRUD operations
│   │   ├── apiService.js    # Base API utilities
│   │   └── mockData.js      # Demo users and sample data
│   │
│   ├── routes/              # Routing configuration
│   │   └── routes.jsx       # Route definitions with role-based guards
│   │
│   ├── config/              # App configuration
│   │   └── constants.js     # App-wide constants (roles, routes, etc.)
│   │
│   ├── theme/               # Material UI theme
│   │   └── theme.js         # Custom theme configuration
│   │
│   ├── utils/               # Utility functions
│   │   ├── validation.js    # Form validation helpers
│   │   └── helpers.js       # General helper functions
│   │
│   ├── App.jsx              # Root component with providers
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── docs/                    # Documentation files
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

## 🏗️ Architecture Overview

### Tech Stack

| Category          | Technology         | Version | Purpose                              |
|-------------------|--------------------|---------|--------------------------------------|
| **Framework**     | React              | 19.2    | UI library for building components   |
| **Build Tool**    | Vite               | 7.2     | Fast development server and bundler  |
| **Routing**       | React Router       | 7.12    | Client-side routing and navigation   |
| **UI Library**    | Material UI        | 7.3     | Component library and design system  |
| **Data Grid**     | MUI X Data Grid    | 8.23    | Advanced table with filtering/sorting|
| **Styling**       | Emotion            | 11.14   | CSS-in-JS styling solution           |
| **State Mgmt**    | React Context      | -       | Global state (auth, theme)           |
| **Linting**       | ESLint             | 9.39    | Code quality and consistency         |

### Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Entry                       │
│                        (main.jsx)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Root Component                         │
│                        (App.jsx)                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  ErrorBoundary → ThemeProvider → AuthProvider       │  │
│  │                  → BrowserRouter → Routes            │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐    ┌────────────┐   ┌───────────┐
    │ Public │    │ Protected  │   │ Protected │
    │ Routes │    │   Routes   │   │  Routes   │
    │        │    │  (Admin)   │   │ (Manager/ │
    │ Login  │    │            │   │  Viewer)  │
    │ Signup │    │   Users    │   │           │
    │ Forgot │    │ Management │   │ Dashboard │
    └────────┘    └────────────┘   └───────────┘
```

### Data Flow Architecture

```
┌──────────────┐
│     UI       │  User interactions (login, create user, etc.)
│  Components  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Contexts   │  AuthContext provides: user, token, login(), logout()
│ (Auth/Theme) │  ThemeContext provides: mode, toggleTheme()
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Services   │  authService.login() → Mock JWT generation
│   Layer      │  userService.getUsers() → LocalStorage CRUD
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Mock Data   │  DEMO_USERS array (simulates backend)
│  LocalStorage│  Session persistence
└──────────────┘
```

### Component Hierarchy

```
App (Provider wrapper)
│
├── Public Routes
│   ├── LoginPage
│   ├── SignupPage
│   └── ForgotPasswordPage
│
└── Protected Routes (ProtectedRoute wrapper)
    │
    ├── MainLayout (AppBar + Sidebar + Content)
    │   │
    │   ├── AdminDashboard
    │   │   ├── StatsCard
    │   │   ├── UserGrowthChart
    │   │   └── ActivityTimeline
    │   │
    │   ├── ManagerDashboard
    │   │   ├── TeamMetrics
    │   │   └── PerformanceChart
    │   │
    │   ├── ViewerDashboard
    │   │   ├── TaskOverview
    │   │   └── Achievements
    │   │
    │   ├── UserListPage (Admin only)
    │   │   ├── UserTable (DataGrid)
    │   │   ├── UserFilters
    │   │   └── UserFormDialog
    │   │
    │   └── ProfilePage (All roles)
    │       ├── ProfileHeader
    │       ├── ProfileDetails
    │       └── EditProfileForm
    │
    └── Common Components
        ├── Loading
        ├── ErrorBoundary
        └── UnsavedChangesDialog
```

### Authentication & Authorization Flow

1. **Login Process**:
   - User submits credentials → `authService.login()`
   - Service validates against `DEMO_USERS` in `mockData.js`
   - On success: Generate mock JWT token (base64 encoded JSON)
   - Store token + user data in `localStorage`
   - Update `AuthContext` state → Triggers re-render
   - Redirect to role-specific dashboard

2. **Protected Routes**:
   - `ProtectedRoute` component checks:
     - Is user authenticated? (token exists and valid)
     - Does user have required role?
   - If checks fail → Redirect to login
   - If checks pass → Render child component

3. **Auto-Logout**:
   - Token expiry set to 24 hours (`TOKEN_EXPIRY`)
   - `AuthContext` sets timeout on token expiration
   - Automatically logs out user and clears session

4. **Role-Based Access**:
   - Routes define `allowedRoles` array
   - Admin: Full access (dashboard, user management, profile)
   - Manager: Dashboard + profile
   - Viewer: Dashboard + profile (read-only user list)

### State Management

- **AuthContext**: Manages authentication state globally
  - Provides: `user`, `token`, `login()`, `logout()`, `signup()`, `updateUser()`, `hasRole()`, `isAuthenticated()`
  - Persists session to `localStorage`
  - Handles token validation and expiry

- **ThemeContext**: Manages UI theme (light/dark mode)
  - Provides: `mode`, `toggleTheme()`
  - Persists preference to `localStorage`
  - Integrates with Material UI theme

- **Local Component State**: For form inputs, modals, and UI interactions

## 🔧 Available Scripts

| Script          | Command              | Description                                  |
|-----------------|----------------------|----------------------------------------------|
| **Development** | `npm run dev`        | Start Vite dev server at http://localhost:5173 |
| **Build**       | `npm run build`      | Create optimized production build            |
| **Preview**     | `npm run preview`    | Preview production build locally             |
| **Lint**        | `npm run lint`       | Run ESLint to check code quality             |

## 👤 Features by Role

### 🔑 Admin
- **Full User Management**: Create, view, edit, and delete users
- **Advanced Filtering**: Search by name/email, filter by role/status
- **Bulk Operations**: Select multiple users for batch actions
- **Data Export**: Export user data to CSV format
- **System Analytics**: View user growth, activity timelines, and system stats
- **Role Assignment**: Assign and modify user roles and permissions

### 👔 Manager
- **Team Dashboard**: View team-specific metrics and KPIs
- **Performance Data**: Access team performance charts and analytics
- **Activity Management**: Track and manage team activities
- **Profile Access**: View and edit own profile

### 👤 Viewer (User)
- **Personal Dashboard**: View personal task overview and progress
- **Activity Tracking**: Monitor own activities and achievement history
- **Profile Management**: View and update personal profile
- **User List (Read-only)**: View list of users without edit permissions

## 🎯 Assumptions and Trade-offs

### Design Assumptions

1. **Mock Authentication**
   - **Assumption**: This is a demo/development application
   - **Implementation**: JWT simulation using base64-encoded JSON
   - **Trade-off**: Not production-secure; real apps need server-side JWT signing and verification
   - **Benefit**: No backend dependency, easy to demo and extend

2. **In-Memory Data Storage**
   - **Assumption**: Data persistence not required across browser sessions
   - **Implementation**: `DEMO_USERS` array + localStorage for session
   - **Trade-off**: Data resets on page refresh (except logged-in user)
   - **Benefit**: No database setup required; fast development

3. **Client-Side Security**
   - **Assumption**: Role checks on frontend are sufficient for demo
   - **Implementation**: `ProtectedRoute` component validates roles
   - **Trade-off**: Not secure in production (client-side checks can be bypassed)
   - **Benefit**: Simple implementation; demonstrates RBAC concepts

4. **Three Fixed Roles**
   - **Assumption**: Three roles (Admin, Manager, Viewer) cover most use cases
   - **Implementation**: Hardcoded role constants and route permissions
   - **Trade-off**: Not flexible for dynamic role creation
   - **Benefit**: Simple, clear permission hierarchy

5. **Material UI v7**
   - **Assumption**: Material Design is acceptable for the target audience
   - **Implementation**: Full Material UI component library
   - **Trade-off**: Larger bundle size vs. custom components
   - **Benefit**: Fast development, consistent design, accessibility built-in

### Technical Trade-offs

| Decision                     | Trade-off                                    | Rationale                              |
|------------------------------|----------------------------------------------|----------------------------------------|
| Vite over Create React App   | Less mature ecosystem vs. faster builds      | Better DX, faster HMR, modern tooling  |
| Context API over Redux       | Less scalable vs. simpler setup              | Sufficient for app size, no boilerplate|
| LocalStorage over Cookies    | Less secure vs. simpler to implement         | Good for demo, no cookie config needed |
| Mock API over Real Backend   | Limited functionality vs. no setup required  | Focus on frontend, easy onboarding     |
| Lazy Loading Routes          | Initial load complexity vs. faster page loads| Better performance for larger apps     |
| CSV Export (client-side)     | Memory limits vs. no backend needed          | Works for small datasets, simple impl  |

### Known Limitations

1. **No Server-Side Validation**: All validation is client-side only
2. **No Real-Time Updates**: Changes don't sync across browser tabs
3. **Limited Scalability**: Mock data approach not suitable for large user bases (100k+ users)
4. **No Image Upload**: Profile avatars use placeholder URLs only
5. **No Email Service**: Password reset emails are simulated (no actual emails sent)
6. **No Audit Logging**: User actions are not tracked or logged
7. **Single Tenant**: No support for multiple organizations or workspace isolation

### Future Considerations

If transitioning to production:
- Replace mock services with real REST/GraphQL API
- Implement server-side authentication (OAuth, JWT with refresh tokens)
- Add database (PostgreSQL, MongoDB, etc.) for data persistence
- Implement RBAC on backend with permission-based access control
- Add unit/integration tests (Jest, React Testing Library)
- Set up CI/CD pipeline for automated testing and deployment
- Add error tracking (Sentry, LogRocket)
- Implement proper security headers and HTTPS
- Add rate limiting and CSRF protection
- Consider micro-frontend architecture for scalability

## 📦 Deployment

### Vercel (Recommended)

The app is configured for Vercel deployment with `vercel.json`:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The `vercel.json` ensures all routes redirect to `index.html` for client-side routing.

### Other Platforms

For platforms like Netlify, Render, or traditional hosting:

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** and configure redirects:
   - All routes should redirect to `/index.html` for React Router to work

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, Material UI, and Vite**
