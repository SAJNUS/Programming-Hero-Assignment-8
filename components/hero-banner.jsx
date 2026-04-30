import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="overflow-hidden rounded-[2.25rem] border border-base-300/70 bg-gradient-to-br from-[#fff9eb] via-white to-[#e8fffb] shadow-soft">
            <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        Hot Deals 🔥
                    </div>

                    <div className="space-y-5">
                        <div className="inline-flex rounded-2xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-black uppercase tracking-[0.3em] text-white shadow-soft">
                            Summer Sale 50% OFF
                        </div>
                        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-neutral sm:text-5xl lg:text-6xl">
                            Bright summer essentials for every sunny plan,
                            packed into one premium storefront.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-base-content/75 sm:text-lg">
                            Explore a polished catalog of warm-weather picks,
                            curated with a clean layout, modern typography, and
                            a calm coastal palette.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/products"
                            className="btn btn-primary rounded-full px-8 text-base shadow-soft"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="#popular-products"
                            className="btn btn-ghost rounded-full px-8 text-base"
                        >
                            See Popular Picks
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {[
                            ["Free shipping", "On sunny season orders"],
                            ["Premium look", "Built for a polished brand"],
                            ["Fast browsing", "Responsive by design"],
                        ].map(([title, label]) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-base-300/70 bg-white/80 p-4 shadow-sm backdrop-blur"
                            >
                                <p className="text-lg font-black text-neutral">
                                    {title}
                                </p>
                                <p className="mt-1 text-sm text-base-content/65">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative self-center">
                    <div className="absolute -left-4 top-10 hidden h-28 w-28 rounded-full bg-accent/20 blur-3xl lg:block" />
                    <div className="absolute right-0 top-0 hidden h-32 w-32 rounded-full bg-secondary/20 blur-3xl lg:block" />

                    <div className="grid gap-4 rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-xl backdrop-blur">
                        <div className="rounded-[1.5rem] bg-gradient-to-br from-primary to-accent p-6 text-white shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85">
                                Summer spotlight
                            </p>
                            <p className="mt-3 text-3xl font-black leading-tight">
                                Seasonal essentials with a premium finish.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            <div className="rounded-[1.5rem] border border-base-300/70 bg-base-100 p-5 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                                    Warm palette
                                </p>
                                <p className="mt-2 text-lg font-black text-neutral">
                                    Soft sunrise tones
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-base-300/70 bg-base-100 p-5 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                                    Clean layout
                                </p>
                                <p className="mt-2 text-lg font-black text-neutral">
                                    Focused shopping flow
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
