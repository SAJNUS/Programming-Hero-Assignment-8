export default function ProductCard({ product }) {
    return (
        <article className="card overflow-hidden border border-base-300/80 bg-base-100 shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`h-44 bg-gradient-to-br ${product.gradient} p-4`}>
                <div className="flex h-full items-start justify-between">
                    <span className="badge badge-primary badge-outline border-white/50 bg-white/70 text-primary">
                        {product.category}
                    </span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-neutral shadow-sm">
                        New season
                    </span>
                </div>
            </div>

            <div className="card-body gap-4">
                <div className="space-y-2">
                    <h3 className="card-title text-xl text-neutral">
                        {product.name}
                    </h3>
                    <p className="text-sm leading-6 text-base-content/70">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-neutral">
                        {product.price}
                    </span>
                    <button className="btn btn-primary btn-sm rounded-full px-5 shadow-soft">
                        View details
                    </button>
                </div>
            </div>
        </article>
    );
}
