"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "../../components/page-header";
import {
    signIn,
    clearAuthRedirect,
    getAuthRedirect,
    getAndClearAuthRedirect,
    useSession,
} from "../../lib/auth-client";

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending: isSessionPending } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const [pendingRedirect, setPendingRedirect] = useState(null);
    const cameFromProtectedRoute = searchParams.get("from") === "protected";

    // After successful email login, wait for session to update before redirecting
    useEffect(() => {
        if (!isSessionPending && session?.user && pendingRedirect) {
            router.push(pendingRedirect);
            setPendingRedirect(null);
        }
    }, [isSessionPending, session?.user, pendingRedirect, router]);

    async function handleEmailLogin(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn.email(
                { email, password },
                {
                    onSuccess: () => {
                        let redirectUrl = null;

                        if (cameFromProtectedRoute) {
                            redirectUrl = getAndClearAuthRedirect();
                        } else {
                            clearAuthRedirect();
                        }

                        // Determine where to redirect
                        let destination = "/";
                        if (
                            redirectUrl &&
                            redirectUrl.startsWith("/products/")
                        ) {
                            destination = redirectUrl;
                        }

                        // Don't redirect immediately - wait for session to update
                        // This ensures ProtectedRoute won't reject the user
                        setPendingRedirect(destination);
                    },
                    onError: (error) => {
                        setError(
                            error.message ||
                                "Login failed. Please check your credentials.",
                        );
                    },
                },
            );
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleLogin() {
        setError("");
        setIsGoogleLoading(true);

        try {
            const requiredRedirectUri = `${window.location.origin}/api/auth/callback/google`;

            // Determine redirect URL based on where user came from
            let redirectUrl = "/";

            if (cameFromProtectedRoute) {
                // User came from protected route - consume the saved redirect
                const protectedRedirect = getAndClearAuthRedirect();
                if (
                    protectedRedirect &&
                    protectedRedirect.startsWith("/products/")
                ) {
                    redirectUrl = protectedRedirect;
                } else {
                    // Invalid or missing redirect - ensure it's cleared and use home
                    clearAuthRedirect();
                }
            } else {
                // Normal login - always clear any stale redirects and go to home
                clearAuthRedirect();
                redirectUrl = "/";
            }

            const callbackURL = window.location.origin + redirectUrl;

            await signIn.social(
                { provider: "google", callbackURL },
                {
                    onSuccess: () => {
                        clearAuthRedirect();
                        // After successful social login, navigate to the intended URL
                        router.push(redirectUrl);
                    },
                    onError: (error) => {
                        setError(
                            error.message ||
                                `Google login failed. Please add this Authorized Redirect URI in Google Console: ${requiredRedirectUri}`,
                        );
                    },
                },
            );
        } catch (err) {
            const requiredRedirectUri = `${window.location.origin}/api/auth/callback/google`;
            setError(
                `An error occurred during Google login. Ensure this Authorized Redirect URI is configured in Google Console: ${requiredRedirectUri}`,
            );
            console.error("Google login error:", err);
        } finally {
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl">
            <PageHeader
                eyebrow="Authentication"
                title="Login to SunCart"
                description="Sign in to access exclusive product details and manage your account."
            />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        {error && (
                            <div className="rounded-2xl border border-error/30 bg-error/10 p-4">
                                <p className="text-sm font-semibold text-error">
                                    {error}
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-neutral"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-neutral"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isLoading ||
                                isGoogleLoading ||
                                !email ||
                                !password
                            }
                            className="btn btn-primary w-full rounded-full shadow-soft disabled:btn-disabled"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-base-100 px-3 text-base-content/65">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading || isGoogleLoading}
                            className="btn btn-outline w-full rounded-full"
                        >
                            {isGoogleLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                    Connecting...
                                </span>
                            ) : (
                                <>
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Sign in with Google
                                </>
                            )}
                        </button>

                        <div className="pt-2 text-center">
                            <p className="text-sm text-base-content/70">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-primary hover:underline"
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </form>
                </section>

                <section className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 shadow-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                        Getting started
                    </p>
                    <h3 className="mt-3 text-xl font-black text-neutral">
                        New to SunCart?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-base-content/70">
                        Create an account to save your preferences and access
                        exclusive features.
                    </p>

                    <div className="mt-6 space-y-3 rounded-2xl border border-base-300/70 bg-base-100 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                            Benefits:
                        </p>
                        <ul className="space-y-2 text-sm text-base-content/70">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>View product details</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>Manage your profile</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>Quick checkout</span>
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/register"
                        className="btn btn-primary w-full rounded-full shadow-soft mt-6"
                    >
                        Create Account
                    </Link>
                </section>
            </div>
        </div>
    );
}
