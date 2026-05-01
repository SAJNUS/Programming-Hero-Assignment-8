"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "../../components/page-header";
import { clearAuthRedirect, useSession, signOut } from "../../lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    async function handleLogout() {
        clearAuthRedirect();
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    clearAuthRedirect();
                    window.location.replace("/");
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

    const userImage =
        user.image || user.picture || user.avatar || user.profileImage;

    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow="Account"
                title="My Profile"
                description="Welcome back! Manage your SunCart account and preferences."
            />

            {/* Main Profile Card */}
            <article className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-base-100 to-base-100 p-6 shadow-sm sm:p-8 overflow-hidden relative">
                {/* Decorative gradient background */}
                <div className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />

                <div className="relative z-10">
                    {/* Profile Header with Photo and Basic Info */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 pb-6 border-b border-base-300/50">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            {userImage ? (
                                <div className="h-24 w-24 overflow-hidden rounded-3xl ring-4 ring-primary/20 shadow-md">
                                    <img
                                        src={userImage}
                                        alt={user.name || "User profile"}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-4xl font-black text-white ring-4 ring-primary/20 shadow-md">
                                    {userInitials}
                                </div>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-neutral">
                                {user.name || "SunCart User"}
                            </h2>
                            <p className="mt-2 text-base-content/70">
                                {user.email}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                                    ✓ Verified
                                </span>
                                <span className="inline-block px-3 py-1 rounded-full bg-info/10 text-info text-xs font-semibold">
                                    Active Member
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Information Section */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl bg-base-100/50 border border-base-300/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                                Email Address
                            </p>
                            <p className="mt-2 text-sm font-semibold text-neutral break-all">
                                {user.email}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-base-100/50 border border-base-300/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                                Member Since
                            </p>
                            <p className="mt-2 text-sm font-semibold text-neutral">
                                {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    },
                                )}
                            </p>
                        </div>
                        <div className="rounded-2xl bg-base-100/50 border border-base-300/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-wider text-base-content/60">
                                Account Status
                            </p>
                            <p className="mt-2 text-sm font-semibold text-success">
                                Active & Protected
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => router.push("/profile/update")}
                            className="btn btn-primary rounded-full px-8 shadow-soft hover:shadow-md transition-shadow"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline rounded-full px-8"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </article>

            {/* Features Grid */}
            <section className="grid gap-6 lg:grid-cols-2">
                {/* Product Features */}
                <article className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        Available Now
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-neutral">
                        Explore Product Details
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-base-content/70">
                        Now that you&apos;re logged in, you can view full
                        product details for any item in our catalog.
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
                        Browse Products
                    </Link>
                </article>

                {/* Quick Stats */}
                <article className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                        Account Stats
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-neutral">
                        Your Profile
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-base-300/30">
                            <span className="text-base-content/70">
                                Account Age
                            </span>
                            <span className="font-semibold text-neutral">
                                {Math.floor(
                                    (new Date() - new Date(user.createdAt)) /
                                        (1000 * 60 * 60 * 24),
                                )}{" "}
                                days
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-base-300/30">
                            <span className="text-base-content/70">
                                Account Type
                            </span>
                            <span className="font-semibold text-success">
                                Premium
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-base-content/70">
                                Verification
                            </span>
                            <span className="font-semibold text-success">
                                Verified
                            </span>
                        </div>
                    </div>
                </article>
            </section>

            {/* Coming Soon Features */}
            <article className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                    Coming Soon
                </p>
                <h3 className="mt-3 text-xl font-black text-neutral">
                    Future Profile Features
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
                            className="rounded-2xl border border-base-300/70 bg-base-100 p-4 hover:border-base-300 transition-colors"
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
