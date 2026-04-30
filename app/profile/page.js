"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageHeader from "../../components/page-header";
import { useSession, signOut } from "../../lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    async function handleLogout() {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    }

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-base-300 border-t-primary" />
                    <p className="text-sm text-base-content/70">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="space-y-8">
                <PageHeader
                    eyebrow="Account"
                    title="My Profile"
                    description="You're not logged in yet. Sign in or create an account to access your profile."
                />

                <section className="rounded-[2rem] border border-base-300/70 bg-base-100 p-8 shadow-sm">
                    <div className="text-center space-y-6">
                        <p className="text-lg text-base-content/70">
                            Profile features are only available to logged-in
                            users.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/login"
                                className="btn btn-primary rounded-full px-8 shadow-soft"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-outline rounded-full px-8"
                            >
                                Create account
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    const user = session.user;
    const userInitials = user.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)
        : user.email?.split("@")[0]?.substring(0, 2)?.toUpperCase() || "SC";

    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow="Account"
                title="My Profile"
                description="Welcome back! Manage your SunCart account and preferences."
            />

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        {user.image ? (
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                                <Image
                                    src={user.image}
                                    alt={user.name || "User profile"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-black text-white shrink-0">
                                {userInitials}
                            </div>
                        )}
                        <div>
                            <p className="text-xl font-black text-neutral">
                                {user.name || user.email}
                            </p>
                            <p className="text-sm text-base-content/65">
                                Verified account
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-base-content/75">
                        <p>
                            <span className="font-semibold text-neutral">
                                Email:
                            </span>{" "}
                            {user.email}
                        </p>
                        <p>
                            <span className="font-semibold text-neutral">
                                Member since:
                            </span>{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <span className="font-semibold text-neutral">
                                Status:
                            </span>{" "}
                            <span className="inline-block px-2 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                                Active
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline mt-6 w-full rounded-full"
                    >
                        Sign out
                    </button>
                </article>

                <article className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        Available now
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-neutral">
                        Explore product details
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-base-content/70">
                        Now that you're logged in, you can view full product
                        details for any item in our catalog.
                    </p>

                    <ul className="mt-5 space-y-3 text-sm leading-6 text-base-content/75">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                            <span>Full product information</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                            <span>Detailed pricing & availability</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                            <span>Add to cart (coming soon)</span>
                        </li>
                    </ul>

                    <Link
                        href="/products"
                        className="btn btn-primary mt-6 rounded-full px-6 shadow-soft"
                    >
                        Browse products
                    </Link>
                </article>
            </section>

            <article className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                    Coming soon
                </p>
                <h3 className="mt-3 text-xl font-black text-neutral">
                    Future profile features
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                        [
                            "Order History",
                            "View your past purchases and reorder quickly",
                        ],
                        ["Saved Items", "Create wishlists and save favorites"],
                        [
                            "Preferences",
                            "Customize your notifications and recommendations",
                        ],
                        ["Addresses", "Manage multiple shipping addresses"],
                    ].map(([title, desc]) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-base-300/70 bg-base-100 p-4"
                        >
                            <p className="font-bold text-neutral">{title}</p>
                            <p className="mt-2 text-sm text-base-content/70">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}
