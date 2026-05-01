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
        <section className="relative h-[380px] overflow-hidden rounded-[2rem] shadow-lg sm:h-[450px] md:h-[520px] lg:h-[540px]">
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
            <div className="pointer-events-none absolute -right-12 -top-12 opacity-20 sm:-right-16 sm:-top-16 sm:opacity-25 md:-right-20 md:-top-20 md:opacity-30 lg:opacity-25 z-20">
                <Lottie
                    animationData={sunAnimation}
                    loop={true}
                    autoplay={true}
                    className="h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80 lg:h-96 lg:w-96"
                />
            </div>

            {/* Content container - centered */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-3 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12">
                <div className="flex flex-col items-center justify-center w-full max-w-3xl text-center">
                    {/* Badge section */}
                    <div className="animate-fade-in mb-3 flex flex-wrap justify-center gap-2 sm:mb-4 sm:gap-3">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-primary shadow-lg backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-xs md:px-6 md:py-3 md:text-sm">
                            Summer Sale 50% OFF
                        </span>
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-secondary shadow-lg backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-xs md:px-6 md:py-3 md:text-sm">
                            Hot Deals 🔥
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1 className="animate-fade-in-delay text-2xl font-black leading-tight text-white drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)] sm:text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
                        Summer Essentials, Delivered
                    </h1>

                    {/* Description */}
                    <p className="animate-fade-in-delay-2 mx-auto mt-2 max-w-xl text-xs leading-relaxed text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] sm:mt-3 sm:text-sm md:mt-4 md:text-base lg:text-xl">
                        Stay cool, stay protected, and enjoy the season with our
                        premium collection of summer must-haves.
                    </p>

                    {/* Promo box */}
                    <div className="animate-fade-in-delay-2 mx-auto mt-3 w-full max-w-lg rounded-2xl border border-white/40 bg-white/20 px-3 py-2.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md sm:mt-4 sm:px-5 sm:py-3.5 sm:text-xs md:mt-5 md:px-6 md:py-4 md:text-sm lg:mt-7 lg:text-base">
                        Strong summer promotional banner: Limited-time picks,
                        premium quality, and fresh seasonal prices.
                    </div>

                    {/* CTA buttons */}
                    <div className="animate-fade-in-delay-2 mt-4 flex flex-col items-center gap-2.5 sm:mt-5 sm:flex-row sm:justify-center sm:gap-3 md:mt-6 lg:mt-9 lg:gap-4">
                        <Link
                            href="/products"
                            className="btn btn-primary btn-sm rounded-full sm:btn-md md:btn-lg font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            Shop Now
                        </Link>
                        <Link
                            href="/profile"
                            className="btn btn-ghost btn-sm rounded-full border-2 border-white/80 text-white hover:bg-white/20 transition-all hover:shadow-lg sm:btn-md md:btn-lg font-bold"
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
