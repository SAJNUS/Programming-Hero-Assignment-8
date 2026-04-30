import PageHeader from "../../components/page-header";

export default function PrivacyPolicyPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <PageHeader
                eyebrow="Legal"
                title="Privacy Policy"
                description="A starter privacy page is included so the footer link points to a real route from the beginning."
            />

            <section className="space-y-6 rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                <div>
                    <h2 className="text-xl font-black text-neutral">
                        What we collect
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-base-content/70">
                        This prototype does not collect user data yet. When
                        authentication or checkout is added, the policy should
                        be updated to explain the exact data being processed.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-black text-neutral">
                        How data will be used
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-base-content/70">
                        Future features may use account data, preferences, and
                        order history to personalize the shopping experience.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-black text-neutral">Contact</h2>
                    <p className="mt-2 text-sm leading-7 text-base-content/70">
                        Questions about this assignment project can be directed
                        to the contact details in the footer.
                    </p>
                </div>
            </section>
        </div>
    );
}
