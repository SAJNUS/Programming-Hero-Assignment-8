import Link from "next/link";
import { contactDetails, socialLinks } from "../lib/site-config";

export default function Footer() {
    return (
        <footer className="mt-16 border-t border-base-300/60 bg-neutral text-neutral-content">
            <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-3">
                    <div className="space-y-4">
                        <div>
                            <p className="text-2xl font-black tracking-tight text-white">
                                SunCart
                            </p>
                            <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-content/75">
                                A bright, modern storefront concept for
                                summer-ready essentials, built to feel polished
                                from day one.
                            </p>
                        </div>
                        <Link
                            href="/privacy-policy"
                            className="link-hover text-sm font-semibold text-white"
                        >
                            Privacy Policy
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
                            Contact
                        </p>
                        <ul className="space-y-2 text-sm text-neutral-content/80">
                            <li>
                                <span className="font-semibold text-white">
                                    Email:
                                </span>{" "}
                                {contactDetails.email}
                            </li>
                            <li>
                                <span className="font-semibold text-white">
                                    Phone:
                                </span>{" "}
                                {contactDetails.phone}
                            </li>
                            <li>
                                <span className="font-semibold text-white">
                                    Address:
                                </span>{" "}
                                {contactDetails.address}
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">
                            Follow
                        </p>
                        <div className="flex flex-wrap gap-2 items-center">
                            {/* Facebook (icon-only, no border) */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                title="Facebook"
                                className="rounded-full p-1.5 hover:bg-accent/10 transition-colors flex items-center justify-center"
                            >
                                <img
                                    src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/facebook.svg"
                                    alt="Facebook"
                                    className="w-[1.15rem] h-[1.15rem] filter invert brightness-200"
                                />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                title="Instagram"
                                className="rounded-full p-1.5 hover:bg-accent/10 transition-colors flex items-center justify-center"
                            >
                                <img
                                    src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/instagram.svg"
                                    alt="Instagram"
                                    className="w-[1.15rem] h-[1.15rem] filter invert brightness-200"
                                />
                            </a>

                            {/* X (Twitter) */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                title="X"
                                className="rounded-full p-1.5 hover:bg-accent/10 transition-colors flex items-center justify-center"
                            >
                                <img
                                    src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg"
                                    alt="X"
                                    className="w-[1.15rem] h-[1.15rem] filter invert brightness-200"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-neutral-content/65 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 SunCart. All rights reserved.</p>
                    <p>Built for a polished summer eCommerce experience.</p>
                </div>
            </div>
        </footer>
    );
}
