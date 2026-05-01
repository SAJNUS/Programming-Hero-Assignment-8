import Image from "next/image";
import Link from "next/link";

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
            key={`${rating}-${index}`}
            className={index < filledStars ? "text-amber-400" : "text-base-300"}
        >
            ★
        </span>
    ));
}

export default function ProductCard({ product }) {
    return (
        <article
            id={product.id}
            className="group overflow-hidden rounded-[1.75rem] border border-base-300/70 bg-base-100 shadow-soft transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#fff4d7] via-[#fffdfa] to-[#dffaf4] p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.14),transparent_30%)]" />
                <div className="relative flex items-start justify-between">
                    <span className="badge badge-primary badge-outline border-white/60 bg-white/80 text-primary">
                        {product.category}
                    </span>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-neutral shadow-sm">
                        {product.stock} in stock
                    </span>
                </div>

                <div className="relative mt-4 w-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/55 p-3 shadow-inner backdrop-blur-sm">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded-[1.25rem] object-contain object-center p-2 transition duration-300 group-hover:scale-105"
                    />
                </div>
            </div>

            <div className="space-y-4 p-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                            {product.brand}
                        </p>
                        <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold text-base-content/70">
                            {product.category}
                        </span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-neutral">
                        {product.name}
                    </h3>
                    <p className="text-sm leading-6 text-base-content/70">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-neutral">
                    <span className="flex items-center gap-1 text-amber-400">
                        {renderStars(product.rating)}
                    </span>
                    <span className="text-base-content/70">
                        {product.rating.toFixed(1)}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                            Price
                        </p>
                        <span className="text-xl font-black text-neutral">
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <Link
                        href={`/products/${product.id}`}
                        className="btn btn-primary rounded-full px-5 shadow-soft"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </article>
    );
}
