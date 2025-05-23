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
  - ✅ Direct login after signup (no email verification required)
  - ✅ Google Authentication integration
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

### Authentication System Updates

The authentication system has been streamlined for better user experience:

- **Direct Login**: Users are now automatically redirected to the homepage after successful signup without requiring email verification
- **Google Authentication**: Added social login option with Google for one-click authentication
- **Simplified Flow**: Removed email verification step to reduce friction in the user onboarding process

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
- Login/Signup pages with password-based authentication
- Google social login integration
- Direct redirect to homepage after signup (no email verification)
- Auth callback handling
- Session management

## Deploying to Netlify

When deploying to Netlify, follow these steps to ensure authentication works correctly:

### 1. Configure Supabase Authentication Settings

1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to **Authentication** > **URL Configuration**
4. Update the following settings:
   - **Site URL**: Set this to your Netlify domain (e.g., `https://your-app.netlify.app`)
   - **Redirect URLs**: Add your Netlify domain callback URL: `https://your-app.netlify.app/auth/callback`

### 2. Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 3. Redeploy Your Application

After making these changes, trigger a new deployment to apply the changes.

## Troubleshooting Authentication Issues

If authentication redirects to localhost after deployment:

1. Make sure your Supabase URL Configuration is correctly set to your Netlify domain
2. Verify that your application is using `window.location.origin` for redirect URLs
3. Check browser console for any redirect-related errors
4. Ensure your Netlify toml file has the proper redirect configuration for auth callback

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
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
