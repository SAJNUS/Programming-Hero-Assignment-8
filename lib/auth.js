/**
 * Temporary frontend auth utilities for the SunCart assignment.
 * This will be replaced with BetterAuth integration later.
 *
 * NOTE: This is NOT production auth. It's a temporary mock for development.
 */

const AUTH_STATE_KEY = "suncart_auth_state";
const AUTH_REDIRECT_KEY = "suncart_auth_redirect";

/**
 * Get the current auth state from localStorage.
 * For now, simulates user login state.
 */
export function getAuthState() {
    if (typeof window === "undefined") {
        return { isLoggedIn: false, user: null };
    }

    try {
        const stored = localStorage.getItem(AUTH_STATE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (err) {
        console.error("Failed to parse auth state:", err);
    }

    return { isLoggedIn: false, user: null };
}

/**
 * Set the auth state and store in localStorage.
 * For now, this is a mock that simulates user login.
 */
export function setAuthState(isLoggedIn, user = null) {
    if (typeof window === "undefined") return;

    const state = { isLoggedIn, user };
    try {
        localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(state));
    } catch (err) {
        console.error("Failed to set auth state:", err);
    }
}

/**
 * Simulate a login action. In real app, this would call BetterAuth.
 */
export function mockLogin(email, password) {
    // This is a temporary mock — no real validation
    if (email && password) {
        const user = {
            id: "user-1",
            email,
            name: email.split("@")[0],
        };
        setAuthState(true, user);
        return { success: true, user };
    }
    return { success: false, error: "Invalid credentials" };
}

/**
 * Simulate a logout action.
 */
export function mockLogout() {
    setAuthState(false, null);
    if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_REDIRECT_KEY);
    }
}

/**
 * Store the intended redirect URL (e.g., the product details page the user wanted to view).
 */
export function setAuthRedirect(url) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(AUTH_REDIRECT_KEY, url);
    } catch (err) {
        console.error("Failed to set auth redirect:", err);
    }
}

/**
 * Get and clear the stored redirect URL.
 */
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
