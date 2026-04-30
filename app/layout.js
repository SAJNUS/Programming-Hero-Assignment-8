import { Manrope } from "next/font/google";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
    title: "SunCart – Summer Essentials Store",
    description:
        "A modern summer-themed eCommerce storefront built with Next.js App Router, Tailwind CSS, and DaisyUI.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="suncart">
            <body className={manrope.className}>
                <div className="flex min-h-screen flex-col bg-sun-cart-radial">
                    <Navbar />
                    <main className="flex-1">
                        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                            {children}
                        </div>
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
