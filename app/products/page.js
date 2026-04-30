import PageHeader from "../../components/page-header";
import ProductCard from "../../components/product-card";
import SectionHeading from "../../components/section-heading";
import { allProducts } from "../../lib/catalog";

export default function ProductsPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow="Products"
                title="Full summer catalog"
                description="Every product is powered by the shared JSON catalog so the storefront stays easy to maintain and ready for future data changes."
            />

            <section className="rounded-[2rem] border border-base-300/70 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        ["6", "Summer essentials"],
                        ["JSON", "Shared source of truth"],
                        ["Responsive", "Grid that adapts cleanly"],
                    ].map(([value, label]) => (
                        <div
                            key={value}
                            className="rounded-3xl border border-base-300/70 bg-base-100 p-5"
                        >
                            <p className="text-3xl font-black text-neutral">
                                {value}
                            </p>
                            <p className="mt-2 text-sm text-base-content/65">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <SectionHeading
                eyebrow="All products"
                title="Browse the full collection"
                description="Reusable product cards keep the catalog consistent across the Home page and the Products page."
            />

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </div>
    );
}
