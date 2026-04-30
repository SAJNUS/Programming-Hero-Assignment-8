export default function PageHeader({ eyebrow, title, description }) {
    return (
        <section className="mb-10 space-y-4">
            {eyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                    {eyebrow}
                </p>
            ) : null}
            <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-neutral sm:text-4xl">
                    {title}
                </h1>
                {description ? (
                    <p className="max-w-3xl text-base leading-7 text-base-content/75">
                        {description}
                    </p>
                ) : null}
            </div>
        </section>
    );
}
