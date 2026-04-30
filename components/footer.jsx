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
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline btn-sm rounded-full border-white/20 text-white hover:border-accent hover:bg-accent hover:text-neutral"
                                >
                                    {social.label}
                                </a>
                            ))}
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
