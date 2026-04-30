/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./lib/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                soft: "0 20px 45px -20px rgba(249, 115, 22, 0.35)",
            },
            backgroundImage: {
                "sun-cart-radial":
                    "radial-gradient(circle at top, rgba(253, 224, 71, 0.24), transparent 32%), radial-gradient(circle at bottom right, rgba(45, 212, 191, 0.22), transparent 28%)",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                suncart: {
                    primary: "#F97316",
                    secondary: "#14B8A6",
                    accent: "#F59E0B",
                    neutral: "#1F2937",
                    "base-100": "#FFFDF8",
                    "base-200": "#FFF4E8",
                    "base-300": "#FFE8CC",
                    info: "#38BDF8",
                    success: "#10B981",
                    warning: "#F59E0B",
                    error: "#EF4444",
                },
            },
        ],
    },
};
