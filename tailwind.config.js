/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["var(--font-montserrat)", "sans-serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            colors: {
                evoniq: {
                    copper: "#B87333",
                    bronze: "#CD7F32",
                    "copper-dark": "#8B5E3C",
                    suede: "#E8E0D4",
                    "suede-light": "#F0E8DC",
                    "suede-dark": "#DDD5C8",
                    cream: "#F5EDE1",
                    text: "#2A2420",
                    "text-muted": "#5C524A",
                    "text-faint": "#8A7F75",
                },
            },
            animation: {
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "fade-up": "fade-up 0.6s ease-out forwards",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(184,115,51,0.2)" },
                    "50%": { boxShadow: "0 0 40px rgba(184,115,51,0.4)" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};
