# BizInsight - Business Intelligence Dashboard

A fully functional and visually appealing Business Intelligence (BI) tool with user authentication, data visualization, and a dashboard displaying meaningful business metrics. This project demonstrates skills in frontend development, UI/UX design, state management, and deployment.

## 🚀 Live Demo

Visit the live demo: [BizInsight Dashboard](https://bidtask.netlify.app/)

## ✨ Features

### User Authentication
- **Login/Registration**: Secure email and password authentication
- **Session Management**: "Keep me logged in" option with auto-logout after 1 minute of inactivity
- **Protected Routes**: Restricted access to dashboard for authenticated users only

### Dashboard 
- **Metrics Summary**: Display of key business metrics (Total Users, Active Sessions, Sales Revenue, New Users)
- **Interactive Charts**: Visualize sales trends, user growth, and category distribution
- **Sortable & Filterable Data Tables**: Easily analyze and explore your data
- **Responsive Design**: Works beautifully on mobile, tablet, and desktop devices

### Additional Features
- **Dark Mode**: Toggle between light and dark themes
- **Mock API Integration**: Simulated backend for development and demo purposes
- **Auto-Logout**: Security feature that logs out inactive users

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **API Mocking**: Mock Service Worker (MSW)
- **State Management**: React Context API & Hooks
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ricardoblinks/business-intelligence-dashboard.git
   cd business-intelligence-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Test Credentials

For testing the application, use the following credentials:

- **Email**: hr@branddrive.co
- **Password**: password123

## 📝 Project Structure

```
business-intelligence-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── mocks/           # Mock Service Worker setup
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # Node.js dependencies
├── postcss.config.js    # PostCSS configuration
├── README.md            # Project documentation
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🎨 Design Considerations

### UI/UX Design
- **Clean Interface**: Minimalist design focused on data visualization
- **Consistent Layout**: Uniform spacing, typography, and color scheme
- **Responsive Components**: All elements scale and reposition for different screen sizes
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Loading States**: Skeleton loaders provide visual feedback during data fetching

### Architecture Decisions
- **Context API**: For global state management (auth, theme)
- **Custom Hooks**: Encapsulating reusable logic like authentication and inactivity timers
- **Component Composition**: Building complex UI from smaller, reusable pieces
- **Mock Service Worker**: Intercepting network requests for development without a backend
- **Middleware Protection**: Route protection implemented at the Next.js middleware level

## 🚧 Future Enhancements
- Real-time data updates using WebSockets
- Advanced filtering options for charts and tables
- Export functionality for reports (PDF, CSV)
- User profile management and settings
- Multi-language support
- Team collaboration features

## 👤 Author
Richard James Odinakachukwu - (https://github.com/ricardoblinks)

---

This project was created as part of a frontend development exercise to demonstrate skills in building modern web applications.