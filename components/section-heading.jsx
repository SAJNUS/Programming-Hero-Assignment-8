export default function SectionHeading({
    eyebrow,
    title,
    description,
    action,
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
                {eyebrow ? (
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                        {eyebrow}
                    </p>
                ) : null}
                <h2 className="text-3xl font-black tracking-tight text-neutral">
                    {title}
                </h2>
                {description ? (
                    <p className="max-w-3xl text-sm leading-7 text-base-content/70">
                        {description}
                    </p>
                ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}
