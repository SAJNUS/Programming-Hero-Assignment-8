import Link from "next/link";
import PageHeader from "../../components/page-header";

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <PageHeader
                eyebrow="Authentication"
                title="Register"
                description="The registration route exists now so you can connect auth later without changing the shared layout or navigation."
            />

            <section className="rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm sm:p-8">
                <div className="space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        Placeholder experience
                    </p>
                    <h2 className="text-2xl font-black text-neutral">
                        A future sign-up form will slot in here cleanly.
                    </h2>
                    <p className="leading-7 text-base-content/70">
                        Use this page as the anchor for account creation logic
                        when you are ready to add it.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    {[
                        ["Profile info", "Name and email"],
                        ["Security", "Password setup later"],
                        ["Welcome flow", "Future onboarding"],
                    ].map(([title, copy]) => (
                        <div
                            key={title}
                            className="rounded-3xl border border-base-300/70 bg-base-100 p-4"
                        >
                            <p className="font-bold text-neutral">{title}</p>
                            <p className="mt-1 text-sm text-base-content/70">
                                {copy}
                            </p>
                        </div>
                    ))}
                </div>

                <Link
                    href="/login"
                    className="btn btn-outline mt-8 rounded-full px-6"
                >
                    Already have an account? Login
                </Link>
            </section>
        </div>
    );
}
