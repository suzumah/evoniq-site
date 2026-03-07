import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "EVONIQ | Executive Workspace Redefined",
    description:
        "The EVONIQ 4-in-1 Wireless Charging Laptop Sleeve — seamless power delivery, precision-crafted workspace, and premium protection in one refined form.",
    keywords: [
        "laptop sleeve",
        "wireless charging",
        "executive workspace",
        "premium accessories",
        "EVONIQ",
        "desk mat",
        "ergonomic",
    ],
    openGraph: {
        title: "EVONIQ | Executive Workspace Redefined",
        description:
            "Seamless power delivery, precision-crafted workspace, and premium protection in one refined form.",
        type: "website",
        locale: "en_US",
        siteName: "EVONIQ",
    },
    twitter: {
        card: "summary_large_image",
        title: "EVONIQ | Executive Workspace Redefined",
        description:
            "Seamless power delivery. Precision workspace. Premium protection.",
    },
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
            <body className="font-inter">
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    );
}
