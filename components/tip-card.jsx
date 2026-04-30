export default function TipCard({ tip, index }) {
    return (
        <article className="rounded-[1.5rem] border border-base-300/70 bg-base-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-lg font-black text-white shadow-soft">
                    {index}
                </div>
                <div>
                    <h3 className="text-lg font-black text-neutral">
                        {tip.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-base-content/70">
                        {tip.description}
                    </p>
                </div>
            </div>
        </article>
    );
}
