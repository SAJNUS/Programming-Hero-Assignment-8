"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProtectedRoute from "../../../components/protected-route";
import { getProductById } from "../../../lib/catalog";

function formatPrice(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

function renderStars(rating) {
    const filledStars = Math.round(rating);

    return Array.from({ length: 5 }, (_, index) => (
        <span
            key={`star-${index}`}
            className={index < filledStars ? "text-amber-400" : "text-base-300"}
        >
            ★
        </span>
    ));
}

function getStockStatus(stock) {
    if (stock > 20) return { label: "In Stock", color: "badge-success" };
    if (stock > 5) return { label: "Low Stock", color: "badge-warning" };
    if (stock > 0) return { label: "Very Low Stock", color: "badge-error" };
    return { label: "Out of Stock", color: "badge-ghost" };
}

function ProductDetailsContent() {
    const params = useParams();
    const productId = params.id;
    const product = getProductById(productId);

    if (!product) {
        return (
            <div className="mx-auto max-w-7xl space-y-8 py-20">
                <div className="text-center space-y-6">
                    <div className="text-6xl font-black text-base-300">404</div>
                    <h1 className="text-3xl font-black text-neutral">
                        Product not found
                    </h1>
                    <p className="max-w-2xl text-base text-base-content/70">
                        The product you&apos;re looking for doesn&apos;t exist
                        in our catalog. Let&apos;s get you back on track.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/products"
                            className="btn btn-primary rounded-full px-8 shadow-soft"
                        >
                            Back to catalog
                        </Link>
                        <Link
                            href="/"
                            className="btn btn-ghost rounded-full px-8"
                        >
                            Go home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const stockStatus = getStockStatus(product.stock);

    return (
        <div className="mx-auto max-w-7xl space-y-12 py-8 sm:py-12">
            <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
                <span>← Back to products</span>
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-[#fff4d7] via-[#fffdfa] to-[#dffaf4] p-8 shadow-soft">
                        <div className="relative h-72 sm:h-96 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/50 p-0 shadow-inner backdrop-blur-sm">
                            {/* Use object-cover and rounded corners to match product card style */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={600}
                                height={500}
                                className="h-full w-full object-cover rounded-[1.25rem]"
                                priority
                            />
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-soft">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            Product highlights
                        </p>
                        <ul className="space-y-3 text-sm leading-7 text-base-content/75">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span>Premium quality materials</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span>Designed for summer durability</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span>Responsive customer support</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                <span>30-day satisfaction guarantee</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                                {product.brand}
                            </p>
                            <h1 className="text-4xl font-black leading-tight tracking-tight text-neutral sm:text-5xl">
                                {product.name}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-amber-400">
                                {renderStars(product.rating)}
                            </span>
                            <span className="text-sm font-semibold text-base-content/75">
                                {product.rating.toFixed(1)} out of 5
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            Price
                        </p>
                        <p className="text-5xl font-black text-neutral">
                            {formatPrice(product.price)}
                        </p>
                        <p className="text-sm leading-6 text-base-content/70">
                            Includes free shipping on summer orders.
                        </p>
                    </div>

                    <div className="space-y-4 rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-soft">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                                Availability
                            </p>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`badge ${stockStatus.color} badge-lg`}
                                >
                                    {stockStatus.label}
                                </span>
                                <span className="text-sm font-semibold text-base-content/75">
                                    {product.stock} units available
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-base-300 pt-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                                Category
                            </p>
                            <p className="mt-2 text-lg font-black text-neutral">
                                {product.category}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            Description
                        </p>
                        <p className="text-base leading-7 text-base-content/75">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            disabled={product.stock === 0}
                            className="btn btn-primary rounded-full px-8 text-base shadow-soft disabled:btn-disabled"
                        >
                            Buy Now
                        </button>
                        <button className="btn btn-outline rounded-full px-8 text-base">
                            Add to Cart
                        </button>
                    </div>

                    <div className="rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-soft">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                            Need help?
                        </p>
                        <p className="mt-3 text-sm leading-6 text-base-content/75">
                            Contact our support team at{" "}
                            <a
                                href="mailto:hello@suncart.com"
                                className="font-semibold text-primary hover:underline"
                            >
                                hello@suncart.com
                            </a>{" "}
                            or call{" "}
                            <a
                                href="tel:+15550142026"
                                className="font-semibold text-primary hover:underline"
                            >
                                +1 (555) 014-2026
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Product Details Page with Protected Route.
 * Requires authentication before viewing.
 */
export default function ProductDetailsPage() {
    return (
        <ProtectedRoute>
            <ProductDetailsContent />
        </ProtectedRoute>
    );
}
