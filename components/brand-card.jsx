function BrandLogo({ shortName }) {
    // Minimal, premium SVG marks for each fictional brand
    switch (shortName) {
        case "CA":
            return (
                <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    aria-hidden
                >
                    <defs>
                        <linearGradient id="g1" x1="0%" x2="100%">
                            <stop
                                offset="0%"
                                stopColor="rgba(255,255,255,0.95)"
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(255,255,255,0.85)"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        d="M6 30 C14 18, 22 18, 30 26 C36 32, 42 34, 42 22"
                        fill="none"
                        stroke="url(#g1)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <circle cx="12" cy="18" r="2" fill="url(#g1)" />
                </svg>
            );
        case "ST":
            return (
                <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    aria-hidden
                >
                    <path
                        d="M8 30 C14 20, 22 16, 30 18 C36 20, 40 26, 40 32"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    <path
                        d="M18 14 L26 22"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        case "SG":
            return (
                <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    aria-hidden
                >
                    <path
                        d="M24 6 L34 10 V20 C34 30, 28 36, 24 38 C20 36,14 30,14 20 V10 Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.95"
                    />
                    <circle cx="24" cy="18" r="4" fill="white" opacity="0.95" />
                </svg>
            );
        case "TC":
            return (
                <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    aria-hidden
                >
                    <rect
                        x="8"
                        y="14"
                        width="32"
                        height="22"
                        rx="3"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        opacity="0.95"
                    />
                    <path
                        d="M14 14 V10 A2 2 0 0 1 16 8 H32 A2 2 0 0 1 34 10 V14"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );
        default:
            return (
                <span className="text-xl font-black text-white">
                    {shortName}
                </span>
            );
    }
}

export default function BrandCard({ brand }) {
    return (
        <article className="group rounded-[1.75rem] border border-base-300/70 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${brand.accent} text-xl font-black text-white shadow-soft`}
                aria-hidden
            >
                {/* Replace initials with a premium SVG mark while keeping layout */}
                <BrandLogo shortName={brand.shortName} />
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
