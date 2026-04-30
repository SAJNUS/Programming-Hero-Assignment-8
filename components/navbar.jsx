"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigationLinks } from "../lib/site-config";
import { getAuthState } from "../lib/auth";

export default function Navbar() {
    const [authState, setAuthState] = useState(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setAuthState(getAuthState());
        setIsHydrated(true);
    }, []);

    const userInitials =
        authState?.user?.email?.split("@")[0]?.substring(0, 2)?.toUpperCase() ||
        "SC";

    return (
        <header className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/80 backdrop-blur-md">
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
                            {isHydrated && (
                                <li className="mt-2 grid grid-cols-2 gap-2">
                                    {!authState?.isLoggedIn ? (
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
                                        <Link
                                            href="/profile"
                                            className="btn btn-primary btn-sm col-span-2"
                                        >
                                            My Profile
                                        </Link>
                                    )}
                                </li>
                            )}
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
                            <span className="text-xs font-medium uppercase tracking-[0.25em] text-secondary">
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

                <div className="navbar-end gap-2">
                    {isHydrated ? (
                        authState?.isLoggedIn ? (
                            <Link
                                href="/profile"
                                className="btn btn-ghost btn-circle tooltip tooltip-bottom"
                                data-tip={authState?.user?.email}
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-black text-white">
                                    {userInitials}
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="btn btn-ghost btn-sm rounded-full px-5 text-sm sm:btn-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn btn-primary btn-sm rounded-full px-5 text-sm shadow-soft sm:btn-md"
                                >
                                    Register
                                </Link>
                            </>
                        )
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="btn btn-ghost btn-sm rounded-full px-5 text-sm sm:btn-md"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-primary btn-sm rounded-full px-5 text-sm shadow-soft sm:btn-md"
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
