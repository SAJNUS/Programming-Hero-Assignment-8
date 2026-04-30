export default function BrandCard({ brand }) {
    return (
        <article className="group rounded-[1.75rem] border border-base-300/70 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${brand.accent} text-xl font-black text-white shadow-soft`}
            >
                {brand.shortName}
            </div>
            <div className="mt-5 space-y-2">
                <h3 className="text-xl font-black text-neutral">
                    {brand.name}
                </h3>
                <p className="text-sm leading-6 text-base-content/70">
                    {brand.description}
                </p>
            </div>
            <div className="mt-5 inline-flex rounded-full bg-base-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                {brand.tag}
            </div>
        </article>
    );
}
