# BetterAuth Implementation for SunCart

Your SunCart project now uses **BetterAuth** for real authentication with email/password and Google OAuth.

## Setup Instructions

### 1. Generate BetterAuth Secret

Replace the placeholder secret in `.env.local`:

```bash
# Generate a secure random string (min 32 characters)
# On Windows PowerShell:
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# On macOS/Linux:
openssl rand -base64 32
```

Copy the generated value to `.env.local`:

```
BETTER_AUTH_SECRET=<your-generated-secret-here>
```

### 2. Configure Google OAuth

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or use existing):
    - Project name: "SunCart"
    - Click "Create"

3. **Enable Google+ API**:
    - Search for "Google+ API" in the search bar
    - Click "Google+ API"
    - Click "Enable"

4. **Create OAuth Credentials**:
    - Go to "Credentials" (left sidebar)
    - Click "Create Credentials"
    - Select "OAuth client ID"
    - Choose "Web application"
    - Add authorized redirect URIs:
        - `http://localhost:3000/api/auth/callback/google` (development)
        - `http://localhost:3000` (development)
        - `https://yourdomain.com/api/auth/callback/google` (production)
        - `https://yourdomain.com` (production)
    - Click "Create"

5. **Copy credentials** to `.env.local`:

    ```
    GOOGLE_CLIENT_ID=<your-client-id-here>
    GOOGLE_CLIENT_SECRET=<your-client-secret-here>
    ```

6. **For production**, update the URLs:
    ```
    BETTER_AUTH_URL=https://yourdomain.com
    NEXT_PUBLIC_AUTH_URL=https://yourdomain.com
    ```

### 3. Your `.env.local` file should look like:

```env
BETTER_AUTH_SECRET=your-secure-random-secret-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

## File Structure

```
app/
├── api/auth/[...auth]/
│   └── route.js              # BetterAuth API endpoints
├── login/page.js             # Email + Google login
├── register/page.js          # Email registration + Google signup
├── profile/page.js           # User profile (protected)
└── products/[id]/page.js     # Product details (protected)

lib/
├── auth.js                   # BetterAuth server config
└── auth-client.js            # BetterAuth client utilities

components/
├── protected-route.jsx       # Auth guard wrapper
└── navbar.jsx                # Dynamic auth UI
```

## Key Features Implemented

✅ **Email + Password Authentication**

- Secure password validation
- Email field required
- Min 6 character passwords

✅ **Google Social Login**

- One-click login/signup
- Automatic profile data from Google
- Seamless integration

✅ **Protected Routes**

- `/products/[id]` - Product details page
- `/profile` - User profile page
- Automatic redirect to login for unauthorized access
- Redirect back to original page after login

✅ **User Profile**

- Display user name, email, photo
- Account creation date
- Logout functionality
- Professional UI

✅ **Navbar Auth UI**

- Shows user avatar when logged in
- Shows Login/Register buttons when logged out
- User initials in colored circle

✅ **Error Handling**

- Login/register error messages
- Proper loading states
- Loading spinners during auth

## How Authentication Works

### Login Flow

1. User clicks "View Details" on product → redirects to protected page
2. Protected route checks auth → redirects to `/login`
3. User enters email/password or clicks "Sign in with Google"
4. BetterAuth validates credentials
5. Session created and stored in cookies
6. User redirected back to product details page

### Registration Flow

1. User fills form (name, email, password, optional photo URL)
2. Clicks "Create account"
3. Account created in BetterAuth
4. User redirected to login page
5. OR clicks "Sign up with Google"
6. Google handles signup → redirected to home

### Session Management

- BetterAuth handles sessions via HTTP-only cookies
- Sessions expire in 7 days
- Updated daily

## API Endpoints

All auth endpoints are at `/api/auth/*`:

- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-in/email` - Login
- `GET /api/auth/sign-in/google` - Google OAuth
- `GET /api/auth/callback/google` - Google callback
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session

## Development Server

```bash
npm run dev
# App runs on http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
# Build validates all auth pages compile correctly
```

## Important Security Notes

⚠️ **Never commit `.env.local`** - it contains secrets

- Already in `.gitignore`
- Generate new secrets for production

✅ **Passwords are hashed** - never stored as plain text
✅ **Sessions use HTTP-only cookies** - protected from XSS
✅ **Environment variables are secure** - not exposed to client (except NEXT*PUBLIC*\*)

## Environment Variables Explained

| Variable               | Visibility      | Purpose                      |
| ---------------------- | --------------- | ---------------------------- |
| `BETTER_AUTH_SECRET`   | Server only     | Encrypts sessions and tokens |
| `BETTER_AUTH_URL`      | Server only     | Base URL for OAuth callbacks |
| `NEXT_PUBLIC_AUTH_URL` | Client + Server | Public auth URL              |
| `GOOGLE_CLIENT_ID`     | Server only     | Google OAuth client ID       |
| `GOOGLE_CLIENT_SECRET` | Server only     | Google OAuth client secret   |

## Testing the Auth Flow

### With Email/Password:

1. Go to `http://localhost:3000/register`
2. Fill form (any email, password min 6 chars)
3. Register
4. Go to `/login`
5. Use same email and password
6. Should see profile page with user info

### With Google:

1. Go to `http://localhost:3000/register`
2. Click "Sign up with Google"
3. Choose Google account
4. Redirected to home (already logged in)
5. Click profile avatar in navbar
6. See your Google profile data

### Protected Routes:

1. Go to `/products`
2. Click "View Details" on any product
3. If not logged in → redirected to login
4. Login → redirected back to product details
5. See full product information

## Troubleshooting

**Error: "Google login failed"**

- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env.local`
- Verify redirect URIs match in Google Cloud Console
- Restart dev server after env changes

**Error: "Cannot find module"**

- Run `npm install better-auth`
- Delete `.next` folder
- Run `npm run build` again

**Sessions not persisting**

- Clear browser cookies
- Restart dev server
- Check BETTER_AUTH_SECRET is set

**Email signup not working**

- Check password is min 6 characters
- Verify email format is valid
- Check `.env.local` has BETTER_AUTH_SECRET

## Next Steps

After setting up OAuth:

1. **Test the auth flow** (see Testing section above)
2. **Add to production** domain in Google Cloud Console
3. **Update env vars** for production
4. **Deploy to hosting** (Vercel recommended for Next.js)

## Support

For BetterAuth documentation: https://docs.better-auth.com/
For Next.js App Router: https://nextjs.org/docs/app
