"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "../../components/page-header";
import { mockLogin, getAndClearAuthRedirect } from "../../lib/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
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
            // Simulate a brief delay for realism
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Perform mock registration (just logs in the user)
            const result = mockLogin(email, password);

            if (result.success) {
                // Get the redirect URL that was stored when the protected route redirected here
                const redirectUrl = getAndClearAuthRedirect();

                // Redirect back to the product they wanted or to home
                if (redirectUrl && redirectUrl.startsWith("/products/")) {
                    router.push(redirectUrl);
                } else {
                    router.push("/");
                }
            } else {
                setError("Registration failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
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
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
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
                                disabled={isLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isLoading ||
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
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="btn btn-ghost w-full rounded-full"
                        >
                            Sign in instead
                        </Link>
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
                            Temporary system
                        </p>
                        <p className="mt-2 text-sm leading-6 text-base-content/70">
                            This registration form uses frontend-only auth for
                            now. Real auth with BetterAuth will be added later.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
