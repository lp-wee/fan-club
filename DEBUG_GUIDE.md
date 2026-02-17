## Frontend Debugging Guide

### If You See Hydration Errors

**Error message**: "Hydration failed because the server rendered text didn't match the client"

**Root causes**:
1. `toLocaleString()` formatting differences between server and client
2. `Math.random()` or `Date.now()` in render logic
3. Date formatting without explicit locale
4. Using `typeof window !== 'undefined'` checks at render time

**Fixed instances**:
- ✅ app/page.tsx - Removed `.toLocaleString()` from salary display
- ✅ app/vacancies/[id]/page.tsx - Same fix
- ✅ app/company/[id]/page.tsx - Same fix

### If You See Import Errors

**Error**: "Cannot find module '@/...' or its corresponding type declarations"

**Solution**:
1. Check that the file exists in `/vercel/share/v0-project/`
2. Verify the import path matches file location
3. For UI components, they should be in `components/ui/`

**Fixed instances**:
- ✅ Added `INDUSTRIES` constant to `lib/utils/constants.ts`

### If Routes Don't Work

**Error**: Page not found when clicking navigation

**Check**:
1. Verify route in `lib/utils/constants.ts` ROUTES object
2. Ensure page file exists at the path (e.g., `/employer` needs `/app/employer/page.tsx`)

**Fixed instances**:
- ✅ `/employer` route corrected
- ✅ `/admin` route corrected

### If Filtering Doesn't Work

**Error**: Filters aren't filtering results

**Solution**:
Check that field names match between:
1. Filter component state
2. Mock data field names
3. Filter logic comparisons

**Fixed instances**:
- ✅ Changed `employment_type` field name in filter logic
- ✅ Changed `level` field name in filter logic

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (frontend only)
next dev

# Start development server (frontend + backend)
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Database setup
pnpm db:migrate
```

## File Structure

```
/vercel/share/v0-project/
├── app/                    # Next.js pages and layouts
│   ├── (auth)/            # Auth pages (login, register)
│   ├── cabinet/           # Job seeker dashboard
│   ├── employer/          # Employer dashboard
│   ├── admin/             # Admin dashboard
│   ├── company/           # Company profiles
│   ├── vacancies/         # Job listings
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   ├── jobs/              # Job-related components (VacancyCard, VacancyFilters)
│   ├── ui/                # shadcn/ui components
│   └── applications/      # Application components
├── lib/                   # Utilities and hooks
│   ├── api-client.ts      # API client for backend calls
│   ├── mock-data.ts       # Mock data for development
│   ├── types.ts           # TypeScript type definitions
│   └── utils/
│       ├── constants.ts   # App constants and routes
│       └── validators.ts  # Input validation functions
├── hooks/                 # React hooks
│   ├── useAuth.ts         # Authentication hook
│   └── useAPI.ts          # API calls hook
├── server/                # Express backend (optional)
└── scripts/               # Database scripts
```

## Common Issues & Solutions

### Issue: "Cannot find Button component"
- **Solution**: Check `/components/ui/button.tsx` exists

### Issue: "INDUSTRIES is not defined"
- **Solution**: Import from `@/lib/utils/constants` or add to constants file

### Issue: "mockVacancies is undefined"
- **Solution**: Import from `@/lib/mock-data`

### Issue: "Layout shift or content jumps on load"
- **Solution**: Check for missing `suppressHydrationWarning` on HTML elements
- Add `suppressHydrationWarning` to `<html>` tag in layout if needed

## Testing the App

1. Open http://localhost:3000
2. Try browsing jobs at `/vacancies`
3. Click on a job to see details
4. Try filtering jobs by location/salary
5. Try the search bar
6. View company profiles by clicking company name

All interactive features should work without errors!
