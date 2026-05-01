/**
 * BetterAuth Server Configuration
 * Configures BetterAuth with email/password and Google OAuth authentication
 *
 * This is the server-side auth configuration for SunCart.
 * For client-side session management, see auth-client.js
 */

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: undefined, // BetterAuth uses in-memory storage by default for demo
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL:
        process.env.BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_AUTH_URL ||
        "http://localhost:3000",
    basePath: "/api/auth",

    // Enable email and password authentication
    emailAndPassword: {
        enabled: true,
    },

    // Configure OAuth providers
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            scope: ["email", "profile"],
            overrideUserInfoOnSignIn: true,
            getUserInfo: async (tokens) => {
                const response = await fetch(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokens.accessToken}`,
                        },
                    },
                );

                const profile = await response.json();

                return {
                    user: {
                        id: profile.id,
                        name: profile.name,
                        email: profile.email,
                        image: profile.picture,
                        emailVerified: profile.verified_email,
                    },
                    data: profile,
                };
            },
        },
    },

    // Use Next.js cookies plugin for session management
    plugins: [nextCookies()],

    // Session configuration
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // Update session every 24 hours
    },

    // Email configuration (optional - for email verification)
    // Not implemented per assignment requirements
});

// Utility function to store intended redirect URL before auth redirect
const AUTH_REDIRECT_KEY = "suncart_auth_redirect";

export function setAuthRedirect(url) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(AUTH_REDIRECT_KEY, url);
    } catch (err) {
        console.error("Failed to set auth redirect:", err);
    }
}

export function getAndClearAuthRedirect() {
    if (typeof window === "undefined") return null;
    try {
        const redirect = localStorage.getItem(AUTH_REDIRECT_KEY);
        if (redirect) {
            localStorage.removeItem(AUTH_REDIRECT_KEY);
        }
        return redirect;
    } catch (err) {
        console.error("Failed to get auth redirect:", err);
    }
    return null;
}
