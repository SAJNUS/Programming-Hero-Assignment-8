# SunCart – Summer Essentials Store

SunCart is a polished summer-themed eCommerce web application built with Next.js App Router. It demonstrates modern frontend architecture, protected authentication flows with BetterAuth, and a responsive premium UI suitable for assignment submission and deployment.

## Purpose of the project

This project was built to deliver a production-style storefront experience for a summer essentials assignment, including:

- secure authentication (Email/Password + Google)
- protected user and product detail routes
- professional responsive design
- clean structure and deployment readiness

## Live URL

Live Demo: <https://sun-cart-rust.vercel.app/>

## Key features

- BetterAuth integration with:
    - Email/Password authentication
    - Google social login
- Protected routes:
    - `/products/[id]` (Product Details)
    - `/profile`
    - `/profile/update`
- Post-login redirect behavior to originally requested protected route
- Premium My Profile UI showing:
    - user name
    - user photo
    - user email
- Update Profile workflow using BetterAuth `updateUser`
    - update name and photo URL
    - loading, success, and error states
    - redirect back to profile after success
- Responsive UI across mobile, tablet, and desktop
- Lottie-powered animated hero section for bonus polish

## Technologies used

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- DaisyUI
- BetterAuth
- Lottie React

## npm packages used

### Dependencies

- `better-auth`
- `lottie-react`
- `next`
- `react`
- `react-dom`

### Dev Dependencies

- `tailwindcss`
- `daisyui`
- `postcss`
- `autoprefixer`
- `eslint`
- `eslint-config-next`

## Environment variables setup

Create a `.env.local` file in the project root and add your local development values:

```
BETTER_AUTH_SECRET=your-secure-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

### Security notes

- Never commit `.env.local`
- Keep all credentials in environment variables only
- Do not paste real secrets into the README
- Use separate production values in Vercel
- Regenerate secrets before production deployment

### Current local setup

This project uses BetterAuth with the following environment keys:

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

For production, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_AUTH_URL` to your deployed domain.

## Local installation steps

1. Clone the repository
2. Install dependencies:
    - `npm install`
3. Configure environment variables:
    - create `.env.local` using the template above
4. Run development server:
    - `npm run dev`
5. Open:
    - `http://localhost:3000`

## Production build and run

- Build: `npm run build`
- Start: `npm run start`

## Deployment notes (Vercel)

- Deploy with Vercel (recommended for Next.js)
- Add these environment variables in Vercel Project Settings:
    - `BETTER_AUTH_SECRET`
    - `BETTER_AUTH_URL`
    - `NEXT_PUBLIC_AUTH_URL`
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`
- Update production URLs to your live domain:
    - `BETTER_AUTH_URL=https://your-domain.com`
    - `NEXT_PUBLIC_AUTH_URL=https://your-domain.com`
- Add production Google OAuth redirect URI:
    - `https://your-domain.com/api/auth/callback/google`

## Submission readiness checklist

- [x] Professional project structure
- [x] Secure env variable setup
- [x] Responsive UI (mobile/tablet/desktop)
- [x] Protected routes functioning
- [x] Production build passing
- [x] Bonus enhancements integrated
