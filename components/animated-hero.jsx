"use client";

import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import heroBannerImage from "../assets/hero section image.png";

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
        <section className="relative h-[400px] overflow-hidden rounded-[2rem] shadow-lg sm:h-[480px] lg:h-[540px]">
            {/* Background Image */}
            <Image
                src={heroBannerImage}
                alt="Premium summer essentials banner featuring sunglasses, sunscreen lotion, beach accessories and summer fashion items"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40" />

            {/* Animated Lottie sun - positioned absolutely */}
            <div className="pointer-events-none absolute -right-16 -top-16 opacity-25 sm:-right-20 sm:-top-20 sm:opacity-30 lg:opacity-25 z-20">
                <Lottie
                    animationData={sunAnimation}
                    loop={true}
                    autoplay={true}
                    className="h-48 w-48 sm:h-72 sm:w-72 lg:h-96 lg:w-96"
                />
            </div>

            {/* Content container - centered */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12">
                <div className="w-full max-w-2xl text-center">
                    {/* Badge section */}
                    <div className="animate-fade-in mb-6 flex flex-wrap justify-center gap-3 sm:gap-4">
                        <span className="rounded-full bg-white/90 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-primary shadow-lg backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm">
                            Summer Sale 50% OFF
                        </span>
                        <span className="rounded-full bg-white/90 px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] text-secondary shadow-lg backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm">
                            Hot Deals 🔥
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1 className="animate-fade-in-delay text-3xl font-black leading-tight text-white drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
                        Summer Essentials, Delivered
                    </h1>

                    {/* Description */}
                    <p className="animate-fade-in-delay-2 mx-auto mt-4 max-w-xl text-base leading-relaxed text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] sm:mt-5 sm:text-lg lg:text-xl">
                        Stay cool, stay protected, and enjoy the season with our
                        premium collection of summer must-haves.
                    </p>

                    {/* Promo box */}
                    <div className="animate-fade-in-delay-2 mx-auto mt-5 w-full max-w-lg rounded-2xl border border-white/40 bg-white/20 px-5 py-4 text-sm font-semibold text-white shadow-lg backdrop-blur-md sm:mt-6 sm:px-6 sm:py-5 sm:text-base lg:mt-7">
                        Strong summer promotional banner: Limited-time picks,
                        premium quality, and fresh seasonal prices.
                    </div>

                    {/* CTA buttons */}
                    <div className="animate-fade-in-delay-2 mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:mt-9 lg:gap-4">
                        <Link
                            href="/products"
                            className="btn btn-primary rounded-full px-10 py-3 font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 sm:px-12 lg:px-14"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="/profile"
                            className="btn btn-ghost rounded-full border-2 border-white/80 px-10 py-3 font-bold text-white hover:bg-white/20 transition-all hover:shadow-lg sm:px-12 lg:px-14"
                        >
                            My Account
                        </Link>
                    </div>
                </div>
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
                    animation: fadeInDelay 0.6s ease-out 0.15s both;
                }
                .animate-fade-in-delay-2 {
                    animation: fadeInDelay2 0.6s ease-out 0.3s both;
                }
            `}</style>
        </section>
    );
}
