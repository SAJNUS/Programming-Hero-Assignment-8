"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthState, setAuthRedirect } from "../lib/auth";

/**
 * ProtectedRoute wrapper component.
 * Checks if user is authenticated. If not, redirects to login with a stored redirect URL.
 *
 * Usage:
 *   <ProtectedRoute>
 *     <MyProtectedComponent />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const authState = getAuthState();

        if (authState.isLoggedIn) {
            setIsAuthorized(true);
            setIsChecking(false);
        } else {
            // Store the current URL so we can redirect back after login
            setAuthRedirect(pathname);
            setIsChecking(false);
            // Redirect to login
            router.push("/login");
        }
    }, [pathname, router]);

    // While checking auth, show a loading state
    if (isChecking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-base-300 border-t-primary" />
                    <p className="text-sm text-base-content/70">
                        Checking access...
                    </p>
                </div>
            </div>
        );
    }

    // If authorized, render the protected content
    if (isAuthorized) {
        return children;
    }

    // Redirect in progress, show minimal fallback
    return null;
}
