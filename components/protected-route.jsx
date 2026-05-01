"use client";

import { useEffect } from "react";
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

    useEffect(() => {
        if (!isPending && !session?.user) {
            setAuthRedirect(pathname);
            router.replace("/login?from=protected");
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

    // If authenticated, render protected content
    if (session?.user) {
        return children;
    }

    // Redirect in progress
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center space-y-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-base-300 border-t-primary" />
                <p className="text-sm text-base-content/70">
                    Redirecting to login...
                </p>
            </div>
        </div>
    );
}
