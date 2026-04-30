"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "../../components/page-header";
import { mockLogin, getAndClearAuthRedirect } from "../../lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Simulate a brief delay for realism
            await new Promise((resolve) => setTimeout(resolve, 600));

            // Perform mock login
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
                setError(result.error || "Login failed");
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
                title="Login to SunCart"
                description="Sign in to access exclusive product details and manage your account. For now, any email and password will work."
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                className="input input-bordered w-full rounded-full border-base-300 bg-base-100 px-6 py-3"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
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

                        <Link
                            href="/register"
                            className="btn btn-ghost w-full rounded-full"
                        >
                            Create a new account
                        </Link>
                    </form>
                </section>

                <section className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 shadow-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                        Demo credentials
                    </p>
                    <h3 className="mt-3 text-xl font-black text-neutral">
                        For testing
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-base-content/70">
                        This is a temporary frontend auth system for the
                        assignment. Any email and password combination will
                        work.
                    </p>

                    <div className="mt-6 space-y-3 rounded-2xl border border-base-300/70 bg-base-100 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                            Try:
                        </p>
                        <div className="space-y-2 font-mono text-sm">
                            <p className="text-base-content/75">
                                <span className="font-semibold">Email:</span>{" "}
                                demo@example.com
                            </p>
                            <p className="text-base-content/75">
                                <span className="font-semibold">Password:</span>{" "}
                                password123
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            What happens next
                        </p>
                        <ul className="space-y-2 text-sm leading-6 text-base-content/70">
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>
                                    You'll be redirected back to the product you
                                    were trying to view
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>
                                    Your login state is stored in localStorage
                                    (temporary)
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                                <span>
                                    This will be replaced with BetterAuth later
                                </span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
