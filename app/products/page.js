import PageHeader from "../../components/page-header";
import ProductCard from "../../components/product-card";
import { featuredProducts } from "../../lib/site-config";

export default function ProductsPage() {
    return (
        <div>
            <PageHeader
                eyebrow="Products"
                title="A summer catalog with room to grow"
                description="This page is intentionally UI-only for now, giving you a polished product listing layout before shopping logic is added."
            />

            <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </section>
        </div>
    );
}
