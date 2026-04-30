import Link from "next/link";
import PageHeader from "../../components/page-header";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow="Account"
                title="My Profile"
                description="This route exists as a polished placeholder while authentication and account features are built later."
            />

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-black text-white">
                            SC
                        </div>
                        <div>
                            <p className="text-xl font-black text-neutral">
                                Summer Shopper
                            </p>
                            <p className="text-sm text-base-content/65">
                                Profile details will connect to auth later.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-base-content/75">
                        <p>
                            <span className="font-semibold text-neutral">
                                Member since:
                            </span>{" "}
                            Spring 2026
                        </p>
                        <p>
                            <span className="font-semibold text-neutral">
                                Favorite category:
                            </span>{" "}
                            Outdoor essentials
                        </p>
                        <p>
                            <span className="font-semibold text-neutral">
                                Status:
                            </span>{" "}
                            Guest mode
                        </p>
                    </div>
                </article>

                <article className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-secondary/10 to-primary/10 p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        What comes next
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-neutral">
                        Your account area is ready for future profile data.
                    </h2>
                    <ul className="mt-5 space-y-3 text-sm leading-6 text-base-content/75">
                        <li>• Order history and saved items</li>
                        <li>• Address and preferences</li>
                        <li>• Login / register experience</li>
                        <li>• Purchase activity and updates</li>
                    </ul>

                    <Link
                        href="/register"
                        className="btn btn-primary mt-6 rounded-full px-6 shadow-soft"
                    >
                        Create an account
                    </Link>
                </article>
            </section>
        </div>
    );
}
