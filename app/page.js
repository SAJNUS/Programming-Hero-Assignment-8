import Link from "next/link";
import ProductCard from "../components/product-card";
import { featuredHighlights, featuredProducts } from "../lib/site-config";

export default function HomePage() {
    return (
        <div className="space-y-16">
            <section className="overflow-hidden rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-white via-base-100 to-amber-50 shadow-soft">
                <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
                    <div className="space-y-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                            Fresh summer collection
                        </span>

                        <div className="space-y-5">
                            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-neutral sm:text-5xl lg:text-6xl">
                                SunCart keeps your summer essentials bright,
                                breezy, and beautifully organized.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-base-content/75 sm:text-lg">
                                A polished eCommerce starting point with a warm
                                seasonal palette, responsive components, and a
                                shared layout ready for future product and auth
                                features.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/products"
                                className="btn btn-primary rounded-full px-7 shadow-soft"
                            >
                                Browse products
                            </Link>
                            <Link
                                href="/profile"
                                className="btn btn-ghost rounded-full px-7"
                            >
                                View my profile
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                ["Seasonal", "Bundles & essentials"],
                                ["Responsive", "Phone to desktop"],
                                ["Reusable", "Shared components"],
                            ].map(([value, label]) => (
                                <div
                                    key={value}
                                    className="rounded-3xl border border-base-300/70 bg-base-100/80 p-4 shadow-sm backdrop-blur"
                                >
                                    <p className="text-xl font-black text-neutral">
                                        {value}
                                    </p>
                                    <p className="mt-1 text-sm text-base-content/65">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 self-center">
                        <div className="rounded-[1.75rem] bg-gradient-to-br from-primary to-accent p-6 text-white shadow-soft">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85">
                                Summer spotlight
                            </p>
                            <p className="mt-3 text-3xl font-black leading-tight">
                                Everything you need for sunny days in one calm
                                storefront.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                            <div className="rounded-[1.5rem] border border-base-300/70 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1 xl:col-span-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                                    Design direction
                                </p>
                                <p className="mt-3 text-lg font-bold text-neutral">
                                    Warm gradients, glassy surfaces, and soft
                                    depth.
                                </p>
                                <p className="mt-2 text-sm leading-6 text-base-content/70">
                                    Built to feel premium without looking like a
                                    generic template.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] border border-base-300/70 bg-base-100 p-5 shadow-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                                    Launch-ready
                                </p>
                                <p className="mt-3 text-lg font-bold text-neutral">
                                    Auth later, style now.
                                </p>
                                <p className="mt-2 text-sm leading-6 text-base-content/70">
                                    Login and register routes are already in
                                    place.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {featuredHighlights.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-[1.75rem] border border-base-300/70 bg-base-100 p-6 shadow-sm"
                    >
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                            Why SunCart
                        </p>
                        <h2 className="mt-3 text-xl font-black text-neutral">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-base-content/70">
                            {item.description}
                        </p>
                    </article>
                ))}
            </section>

            <section className="space-y-6">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                            Featured products
                        </p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral">
                            Summer picks that feel easy to shop
                        </h2>
                    </div>
                    <Link
                        href="/products"
                        className="link link-hover hidden font-semibold text-primary sm:inline-flex"
                    >
                        See all products →
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </div>
            </section>

            <section className="overflow-hidden rounded-[2rem] border border-base-300/70 bg-gradient-to-r from-secondary/10 via-white to-primary/10 p-8 shadow-soft sm:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">
                            Next step
                        </p>
                        <h2 className="text-3xl font-black tracking-tight text-neutral">
                            Ready to wire in products, carts, and authentication
                            later.
                        </h2>
                        <p className="text-base leading-7 text-base-content/70">
                            This starter already gives you the structure,
                            styling foundation, and shared navigation you need
                            for the assignment.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/register"
                            className="btn btn-primary rounded-full px-7 shadow-soft"
                        >
                            Create account
                        </Link>
                        <Link
                            href="/privacy-policy"
                            className="btn btn-outline rounded-full px-7"
                        >
                            Read policy
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
