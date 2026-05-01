/**
 * BetterAuth Client Utilities
 * Client-side session and auth state management
 */

import { createAuthClient } from "better-auth/react";

function getAuthBaseURL() {
    // In browser, always use the currently active origin/port
    // so local OAuth works on the active localhost port (now 3000).
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
const AUTH_REDIRECT_MAX_AGE_MS = 10 * 60 * 1000;

function isValidProtectedRedirectPath(path) {
    return typeof path === "string" && /^\/products\/[^\s]+$/.test(path);
}

function normalizeRedirectPayload(payload) {
    if (!payload || typeof payload !== "object") return null;

    const { path, source, createdAt } = payload;
    if (!isValidProtectedRedirectPath(path)) return null;
    if (source !== "protected-route") return null;
    if (typeof createdAt !== "number") return null;
    if (Date.now() - createdAt > AUTH_REDIRECT_MAX_AGE_MS) return null;

    return { path, source, createdAt };
}

export function setAuthRedirect(url) {
    if (typeof window === "undefined") return;

    if (!isValidProtectedRedirectPath(url)) return;

    try {
        localStorage.setItem(
            AUTH_REDIRECT_KEY,
            JSON.stringify({
                path: url,
                source: "protected-route",
                createdAt: Date.now(),
            }),
        );
    } catch (err) {
        console.error("Failed to set auth redirect:", err);
    }
}

export function clearAuthRedirect() {
    if (typeof window === "undefined") return;

    try {
        localStorage.removeItem(AUTH_REDIRECT_KEY);
    } catch (err) {
        console.error("Failed to clear auth redirect:", err);
    }
}

export function getAuthRedirect() {
    if (typeof window === "undefined") return null;

    try {
        const raw = localStorage.getItem(AUTH_REDIRECT_KEY);
        if (!raw) return null;

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch {
            // Backward compatibility with old string value format
            if (isValidProtectedRedirectPath(raw)) {
                return raw;
            }
            clearAuthRedirect();
            return null;
        }

        const normalized = normalizeRedirectPayload(parsed);
        if (!normalized) {
            clearAuthRedirect();
            return null;
        }

        return normalized.path;
    } catch (err) {
        console.error("Failed to get auth redirect:", err);
    }

    return null;
}

export function getAndClearAuthRedirect() {
    const redirect = getAuthRedirect();
    clearAuthRedirect();
    return redirect;
}
