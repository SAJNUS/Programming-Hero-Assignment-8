import Link from "next/link";
import BrandCard from "../components/brand-card";
import AnimatedHero from "../components/animated-hero";
import ProductCard from "../components/product-card";
import SectionHeading from "../components/section-heading";
import TipCard from "../components/tip-card";
import {
    featuredHighlights,
    summerCareTips,
    topBrands,
} from "../lib/site-config";
import { featuredProducts } from "../lib/catalog";

export default function HomePage() {
    return (
        <div className="space-y-16">
            <AnimatedHero />

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

            <section id="popular-products" className="space-y-6">
                <SectionHeading
                    eyebrow="Popular products"
                    title="Featured picks from the summer catalog"
                    description="These three products are pulled straight from the shared JSON catalog, so the Home page and Products page stay perfectly in sync."
                    action={
                        <Link
                            href="/products"
                            className="btn btn-outline rounded-full px-6 text-sm"
                        >
                            View all products
                        </Link>
                    }
                />

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6 rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-white to-amber-50 p-6 shadow-sm sm:p-8">
                    <SectionHeading
                        eyebrow="Summer care tips"
                        title="Simple habits for hotter days"
                        description="A polished reminder card set for the season, keeping the focus on comfort and practicality."
                    />

                    <div className="grid gap-4">
                        {summerCareTips.map((tip, index) => (
                            <TipCard
                                key={tip.title}
                                tip={tip}
                                index={index + 1}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6 rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                    <SectionHeading
                        eyebrow="Top brands"
                        title="Professional brand cards for the storefront"
                        description="These static cards keep the design premium while giving the page a polished merchandising feel."
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {topBrands.map((brand) => (
                            <BrandCard key={brand.name} brand={brand} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
