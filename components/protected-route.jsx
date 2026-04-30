"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "../lib/auth-client";
import { setAuthRedirect } from "../lib/auth-client";

/**
 * ProtectedRoute wrapper component.
 * Checks if user is authenticated using BetterAuth. If not, redirects to login.
 *
 * Usage:
 *   <ProtectedRoute>
 *     <MyProtectedComponent />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // While session is being checked, don't redirect yet
        if (isPending) {
            return;
        }

        // If user is authenticated, allow access
        if (session?.user) {
            setIsAuthorized(true);
        } else {
            // Store the current URL so we can redirect back after login
            setAuthRedirect(pathname);
            // Redirect to login
            router.push("/login");
        }
    }, [session, isPending, pathname, router]);

    // While checking auth, show a loading state
    if (isPending) {
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
