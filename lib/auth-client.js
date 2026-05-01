/**
 * BetterAuth Client Utilities
 * Client-side session and auth state management
 */

import { createAuthClient } from "better-auth/react";

function getAuthBaseURL() {
    // In browser, always use the currently active origin/port
    // so local OAuth works even if dev server runs on 3001/3002/3003.
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    // Fallback for non-browser contexts
    return (
        process.env.NEXT_PUBLIC_AUTH_URL ||
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000"
    );
}

export const authClient = createAuthClient({
    baseURL: getAuthBaseURL(),
});

// Export auth methods for use in components
export const { signIn, signUp, signOut, useSession } = authClient;

// Export updateUser method for profile updates
export const updateUser = authClient.updateUser;

// Utility to store intended redirect URL before auth redirect
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
