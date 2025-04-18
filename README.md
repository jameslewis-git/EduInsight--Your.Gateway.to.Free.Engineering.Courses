# EduInsight

EduInsight is a platform that aggregates courses from various providers, helping users find the best learning opportunities on any subject.

Live site: [EduInsight Project](https://eduinsight-project.netlify.app/)

## Project Overview

EduInsight brings together courses from many educational platforms to help learners find the best courses in one place. The platform features:

- Course discovery across multiple providers
- Subject-based browsing
- User authentication and personalization
- Course comparison and filtering
- Responsive dashboard for tracking learning progress

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **UI Components**: Shadcn/UI, Tailwind CSS, Lucide Icons
- **Authentication**: Supabase Auth
- **Data Visualization**: Recharts
- **Deployment**: Netlify

## Completed Features

- ✅ Homepage with featured courses and navigation
- ✅ Subject browsing interface
- ✅ Course listings with filtering
- ✅ Authentication flow (login, signup, callback)
- ✅ Dashboard with course progress tracking
- ✅ User profile and settings
- ✅ Report page with data visualization
- ✅ Articles section with full-content modals
- ✅ Mobile responsive design
- ✅ Dark/light mode theming

## Deployment Solutions

Several challenges were overcome for successful deployment:

- ✅ Fixed useSearchParams compatibility with Next.js 15 static export
- ✅ Implemented Suspense boundaries for client-side components
- ✅ Created route segment configs for dynamic pages
- ✅ Configured Netlify redirects for dynamic routes
- ✅ Optimized memory usage for build process

## Pending Features

- 🔄 Backend API integration for real course data
- 🔄 User reviews and ratings system
- 🔄 Course recommendation engine
- 🔄 Advanced search with filters
- 🔄 Saved courses and learning paths
- 🔄 Progress tracking across providers
- 🔄 Notifications system
- 🔄 Social sharing features
- 🔄 Instructor profiles

## Development Notes

### Static Export with Dynamic Routes

The project uses Next.js static export (`output: 'export'`) while supporting dynamic routes with client-side data fetching. This required special configuration:

1. Route segment configs for dynamic pages:
   - `/src/app/auth/callback/config.js`
   - `/src/app/signup-confirmation/config.js`
   - `/src/app/courses/config.js`

2. Suspense boundaries around components using client hooks like `useSearchParams()`

3. Netlify redirects for dynamic routes in `netlify.toml`

### Authentication Flow

The authentication flow integrates with Supabase and includes:
- Login/Signup pages
- Email confirmation
- Auth callback handling
- Session management

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Future Roadmap

1. **Q2 2025**: Integration with real course APIs
2. **Q3 2025**: Personalized recommendation engine
3. **Q4 2025**: Social features and community
4. **Q1 2026**: Mobile app development

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

[MIT License](LICENSE)
