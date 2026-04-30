"use client";

import Lottie from "lottie-react";

// Simple sun/summer animation
const sunAnimation = {
    v: "5.7.0",
    meta: { g: "LottieFiles AE", a: "", k: "", d: "", tc: "" },
    fr: 30,
    ip: 0,
    op: 120,
    w: 200,
    h: 200,
    nm: "Sun",
    ddd: 0,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Sun Circle",
            sr: 1,
            ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: {
                    a: 1,
                    k: [
                        {
                            i: { x: [0.667], y: [1] },
                            o: { x: [0.333], y: [0] },
                            t: 0,
                            s: [0],
                        },
                        { t: 120, s: [360] },
                    ],
                    ix: 10,
                },
                p: { a: 0, k: [100, 100, 0], ix: 2 },
                a: { a: 0, k: [0, 0, 0], ix: 1 },
                s: { a: 0, k: [100, 100, 100], ix: 6 },
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            d: 1,
                            ty: "el",
                            s: { a: 0, k: [60, 60], ix: 2 },
                            p: { a: 0, k: [0, 0], ix: 3 },
                            nm: "Sun",
                            mn: "ADBE Vector Shape - Ellipse",
                            hd: false,
                        },
                        {
                            ty: "fl",
                            c: { a: 0, k: [1, 0.8, 0, 1], ix: 4 },
                            o: { a: 0, k: 100, ix: 5 },
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill",
                            hd: false,
                        },
                    ],
                    nm: "Group 1",
                    np: 2,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: "ADBE Vector Group",
                    hd: false,
                },
            ],
            ip: 0,
            op: 120,
            st: 0,
            bm: 0,
        },
    ],
};

export default function AnimatedHero() {
    return (
        <div className="relative rounded-[2rem] border border-base-300/70 bg-gradient-to-br from-yellow-100 to-orange-50 p-8 shadow-sm sm:p-12 overflow-hidden">
            {/* Animated Lottie sun */}
            <div className="absolute -right-12 -top-12 opacity-30">
                <Lottie
                    animationData={sunAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: 300, height: 300 }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-md">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary animate-fade-in">
                    Welcome to SunCart
                </p>
                <h1 className="mt-4 text-4xl font-black text-neutral animate-fade-in-delay">
                    Summer Essentials, Delivered
                </h1>
                <p className="mt-3 text-lg leading-7 text-base-content/70 animate-fade-in-delay-2">
                    Stay cool, stay protected, and enjoy the season with our
                    premium collection of summer must-haves.
                </p>
                <button className="btn btn-primary mt-6 rounded-full px-8 shadow-soft hover:shadow-md transition-shadow">
                    Start shopping
                </button>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInDelay {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInDelay2 {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out;
                }
                .animate-fade-in-delay {
                    animation: fadeInDelay 0.6s ease-out 0.1s both;
                }
                .animate-fade-in-delay-2 {
                    animation: fadeInDelay2 0.6s ease-out 0.2s both;
                }
            `}</style>
        </div>
    );
}
