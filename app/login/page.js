import Link from "next/link";
import PageHeader from "../../components/page-header";

export default function LoginPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <PageHeader
                eyebrow="Authentication"
                title="Login"
                description="Authentication logic is intentionally not wired up yet. This page acts as a polished placeholder for the assignment structure."
            />

            <section className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        Coming soon
                    </p>
                    <h2 className="text-2xl font-black text-neutral">
                        A real sign-in flow will live here later.
                    </h2>
                    <p className="leading-7 text-base-content/70">
                        For now, keep the UI focused on layout and visual polish
                        so the project remains clean and ready for future work.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                        ["Email field", "Prepared for validation later"],
                        ["Password field", "Secure auth to follow"],
                        ["Submit action", "Disabled until backend exists"],
                        ["Remember me", "Optional future enhancement"],
                    ].map(([title, copy]) => (
                        <div
                            key={title}
                            className="rounded-3xl border border-base-300/70 bg-base-200/60 p-4"
                        >
                            <p className="font-bold text-neutral">{title}</p>
                            <p className="mt-1 text-sm text-base-content/70">
                                {copy}
                            </p>
                        </div>
                    ))}
                </div>

                <Link
                    href="/register"
                    className="btn btn-primary mt-8 rounded-full px-6 shadow-soft"
                >
                    Need an account? Register
                </Link>
            </section>
        </div>
    );
}
