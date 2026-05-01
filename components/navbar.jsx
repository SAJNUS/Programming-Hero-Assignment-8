"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { navigationLinks } from "../lib/site-config";
import { clearAuthRedirect, signOut, useSession } from "../lib/auth-client";

function getUserInitials(session) {
    return session?.user?.name
        ? session.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)
        : session?.user?.email?.split("@")[0]?.substring(0, 2)?.toUpperCase() ||
              "SC";
}

function UserAvatar({ session, className = "h-8 w-8 text-xs" }) {
    const initials = getUserInitials(session);
    const image =
        session?.user?.image ||
        session?.user?.picture ||
        session?.user?.avatar ||
        session?.user?.profileImage;

    return (
        <span
            className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent font-black text-white ${className}`}
        >
            {image ? (
                <Image
                    src={image}
                    alt={session?.user?.name || "User profile photo"}
                    className="absolute inset-0 h-full w-full rounded-full object-cover object-center"
                    fill
                    sizes="40px"
                    unoptimized
                />
            ) : (
                <span className="relative z-10">{initials}</span>
            )}
        </span>
    );
}

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);
        clearAuthRedirect();
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    clearAuthRedirect();
                    window.location.replace("/");
                },
                onError: () => {
                    setIsLoggingOut(false);
                },
            },
        });
        setIsLoggingOut(false);
    }

    return (
        <header className="border-b border-base-300/60 bg-base-100/80 backdrop-blur-md">
            <nav className="navbar mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="navbar-start gap-2">
                    <div className="dropdown lg:hidden">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                            aria-label="Open navigation menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content menu-sm mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl"
                        >
                            {navigationLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                            <li className="mt-2 grid grid-cols-2 gap-2">
                                {!session?.user ? (
                                    <>
                                        <Link
                                            href="/login"
                                            className="btn btn-ghost btn-sm"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="btn btn-primary btn-sm"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="btn btn-outline btn-sm"
                                        >
                                            {isLoggingOut
                                                ? "Logging..."
                                                : "Logout"}
                                        </button>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>

                    <Link
                        href="/"
                        className="group inline-flex items-center gap-3 rounded-full px-2 py-1.5"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-black text-white shadow-soft transition group-hover:scale-105">
                            ☼
                        </span>
                        <span className="flex flex-col leading-tight">
                            <span className="text-lg font-black tracking-tight text-neutral">
                                SunCart
                            </span>
                            <span className="hidden text-xs font-medium uppercase tracking-[0.25em] text-secondary sm:block">
                                Summer essentials
                            </span>
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 px-1 text-sm font-semibold">
                        {navigationLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end gap-2 sm:gap-3">
                    {session?.user ? (
                        <>
                            <Link
                                href="/profile"
                                aria-label="Open profile"
                                className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-0 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                <span className="absolute h-12 w-12 rounded-full bg-slate-400/0 shadow-none transition-all duration-200 group-hover:bg-slate-400/25 group-hover:shadow-md group-hover:shadow-slate-400/25" />
                                <UserAvatar
                                    session={session}
                                    className="relative z-10 h-8 w-8 text-xs shadow-sm ring-2 ring-white/80"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="btn btn-outline btn-sm rounded-full px-4 text-sm sm:btn-md"
                            >
                                {isLoggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="btn btn-ghost btn-sm rounded-full px-3 text-sm sm:px-5 sm:btn-md"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-primary btn-sm rounded-full px-3 text-sm shadow-soft sm:px-5 sm:btn-md"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
