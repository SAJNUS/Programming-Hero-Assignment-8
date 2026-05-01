"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "../../components/page-header";
import {
    clearAuthRedirect,
    signUp,
    signIn,
    signOut,
} from "../../lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleEmailRegister(e) {
        e.preventDefault();
        setError("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            await signUp.email(
                {
                    email,
                    password,
                    name,
                    image: image || undefined, // Only include if provided
                },
                {
                    onSuccess: () => {
                        // After successful registration, make sure the user is not
                        // auto-logged in. Clear any temporary session first, then
                        // send them to the login page to sign in manually.
                        clearAuthRedirect();
                        signOut({
                            fetchOptions: {
                                onSuccess: () => {},
                                onError: () => {},
                            },
                        }).finally(() => {
                            router.replace("/login");
                        });
                    },
                    onError: (error) => {
                        setError(
                            error.message ||
                                "Registration failed. Please try again.",
                        );
                    },
                },
            );
        } catch (err) {
            setError(
                "An error occurred during registration. Please try again.",
            );
            console.error("Registration error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleSignUp() {
        setError("");
        setIsGoogleLoading(true);

        try {
            const requiredRedirectUri = `${window.location.origin}/api/auth/callback/google`;
            const callbackURL = `${window.location.origin}/`;

            await signIn.social(
                { provider: "google", callbackURL },
                {
                    onSuccess: () => {
                        // For Google OAuth signup, redirect to home
                        router.push("/");
                    },
                    onError: (error) => {
                        setError(
                            error.message ||
                                `Google registration failed. Please add this Authorized Redirect URI in Google Console: ${requiredRedirectUri}`,
                        );
                    },
                },
            );
        } catch (err) {
            const requiredRedirectUri = `${window.location.origin}/api/auth/callback/google`;
            setError(
                `An error occurred during Google registration. Ensure this Authorized Redirect URI is configured in Google Console: ${requiredRedirectUri}`,
            );
            console.error("Google registration error:", err);
        } finally {
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-3xl">
            <PageHeader
                eyebrow="Authentication"
                title="Create your SunCart account"
                description="Join SunCart to access exclusive product details, manage your profile, and stay updated on seasonal picks."
            />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <section className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                    <form onSubmit={handleEmailRegister} className="space-y-6">
                        {error && (
                            <div className="rounded-2xl border border-error/30 bg-error/10 p-4">
                                <p className="text-sm font-semibold text-error">
                                    {error}
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-neutral"
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

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
                                htmlFor="image"
                                className="text-sm font-semibold text-neutral"
                            >
                                Photo URL{" "}
                                <span className="text-base-content/50">
                                    (optional)
                                </span>
                            </label>
                            <input
                                id="image"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading || isGoogleLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-semibold text-neutral"
                            >
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
                                !password ||
                                !confirmPassword ||
                                !name
                            }
                            className="btn btn-primary w-full rounded-full shadow-soft disabled:btn-disabled"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Creating account...
                                </span>
                            ) : (
                                "Create account"
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-base-100 px-3 text-base-content/65">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
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
                                    Sign up with Google
                                </>
                            )}
                        </button>

                        <div className="pt-2 text-center">
                            <p className="text-sm text-base-content/70">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-primary hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </section>

                <section className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-primary/10 to-secondary/10 p-6 shadow-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                        Why join SunCart
                    </p>
                    <h3 className="mt-3 text-xl font-black text-neutral">
                        Benefits of your account
                    </h3>

                    <ul className="mt-6 space-y-4 text-sm leading-6">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="text-base-content/75">
                                Access exclusive product details and updates
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="text-base-content/75">
                                Manage your saved items and preferences
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="text-base-content/75">
                                Fast checkout with saved addresses
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-secondary shrink-0" />
                            <span className="text-base-content/75">
                                Track your seasonal purchases
                            </span>
                        </li>
                    </ul>

                    <div className="mt-6 rounded-2xl border border-base-300/70 bg-base-100 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                            Powered by BetterAuth
                        </p>
                        <p className="mt-2 text-sm leading-6 text-base-content/70">
                            Your account is secure with industry-standard
                            authentication and encryption.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
