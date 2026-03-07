export interface Product {
    id: string;
    name: string;
    subName: string;
    price: string;
    description: string;
    folderPath: string;
    frameCount: number;
    frameExtension: string;
    themeColor: string;
    gradient: string;
    features: string[];
    stats: { label: string; val: string }[];
    section1: { title: string; subtitle: string };
    section2: { title: string; subtitle: string };
    section3: { title: string; subtitle: string };
    section4: { title: string; subtitle: string };
    detailsSection: {
        title: string;
        description: string;
        imageAlt: string;
    };
    freshnessSection: {
        title: string;
        description: string;
    };
    buyNowSection: {
        price: string;
        unit: string;
        processingParams: string[];
        deliveryPromise: string;
        returnPolicy: string;
    };
    swatchColor: string;
    productImages: {
        hero: string;
        highlights: string;
        detail: string;
        open: string;
        charging: string;
    };
}

export const products: Product[] = [
    {
        id: "black",
        name: "EVONIQ 4-in-1 Wireless Charging Laptop Sleeve",
        subName: "Engineered for the executive workflow.",
        price: "₹2,499",
        description:
            "Premium leather finish • Dual wireless charging • Foldable workspace • Integrated device management",
        folderPath: "/images/black",
        frameCount: 240,
        frameExtension: "jpg",
        themeColor: "#121212",
        gradient: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)",
        features: [
            "Premium leather finish",
            "Dual wireless charging",
            "Kinetic fold workspace",
            "Integrated device slots",
        ],
        stats: [
            { label: "Weight", val: "400g" },
            { label: "Dimensions", val: "50 × 1 × 28 cm" },
            { label: "Charging", val: "Phone + earbuds" },
        ],
        section1: { title: "EVONIQ.", subtitle: "Workspace. Redefined." },
        section2: {
            title: "One sleeve. Four functions.",
            subtitle:
                "Carry, unfold, organize, and charge — a seamless transition from transit to productivity.",
        },
        section3: {
            title: "Seamless power delivery.",
            subtitle:
                "Dual wireless charging pads eliminate cable clutter from your workflow entirely.",
        },
        section4: {
            title: "360° precision protection.",
            subtitle:
                "Engineered to absorb impact and maintain form through daily use.",
        },
        detailsSection: {
            title: "Minimal form. Maximum function.",
            description:
                "Every surface is intentional: precision-stitched leather exterior, magnetically aligned device bays, and a kinetic fold mechanism that transforms from sleeve to workstation in a single motion. Nothing is extraneous.",
            imageAlt: "EVONIQ Black Details",
        },
        freshnessSection: {
            title: "Precision-crafted utility",
            description:
                "Clean geometries, stable fold architecture, and a surface that maintains its finish through extended use. Refined enough for boardrooms, resilient enough for daily carry.",
        },
        buyNowSection: {
            price: "₹2,499",
            unit: "per sleeve",
            processingParams: [
                "Premium leather finish",
                "Kinetic fold design",
                "Dual charging pads",
            ],
            deliveryPromise:
                "Ships within 3–5 business days. Protective packaging ensures pristine arrival.",
            returnPolicy:
                "48-hour return window. Effortless resolution, no questions asked.",
        },
        swatchColor: "#1a1a1a",
        productImages: {
            hero: "/images/black/product/hero.webp",
            highlights: "/images/black/product/highlights.webp",
            detail: "/images/black/product/detail.webp",
            open: "/images/black/product/open.webp",
            charging: "/images/black/product/protection.webp",
        },
    },
    {
        id: "grey",
        name: "EVONIQ 4-in-1 Wireless Charging Laptop Sleeve",
        subName: "Understated precision.",
        price: "₹2,499",
        description:
            "Modern grey finish • Dual wireless charging • Foldable workspace • Integrated device management",
        folderPath: "/images/grey",
        frameCount: 240,
        frameExtension: "jpg",
        themeColor: "#6B7280",
        gradient: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)",
        features: [
            "Modern grey finish",
            "Dual wireless charging",
            "Kinetic fold workspace",
            "Integrated device slots",
        ],
        stats: [
            { label: "Weight", val: "400g" },
            { label: "Dimensions", val: "50 × 1 × 28 cm" },
            { label: "Setup", val: "Unfold + work" },
        ],
        section1: { title: "EVONIQ.", subtitle: "Deploy your workspace. Instantly." },
        section2: {
            title: "From transit to workflow.",
            subtitle:
                "Unfold into a defined workspace in seconds — calibrated for cafés, studios, and executive suites.",
        },
        section3: {
            title: "Continuous power delivery.",
            subtitle:
                "No searching for outlets — maintain device charge throughout your workflow.",
        },
        section4: {
            title: "Organized by architecture.",
            subtitle:
                "Precision-aligned slots keep every device exactly where it belongs.",
        },
        detailsSection: {
            title: "Designed for operational speed",
            description:
                "The grey variant delivers understated authority — engineered for professional environments. The kinetic fold maintains consistent device placement: laptop, phone, earbuds — always positioned for immediate access.",
            imageAlt: "EVONIQ Grey Details",
        },
        freshnessSection: {
            title: "Effortless maintenance",
            description:
                "A smooth, wipe-clean surface paired with structural integrity that holds form. Engineered to maintain its premium appearance with minimal attention.",
        },
        buyNowSection: {
            price: "₹2,499",
            unit: "per sleeve",
            processingParams: [
                "Minimalist finish",
                "Kinetic fold design",
                "Dual charging pads",
            ],
            deliveryPromise: "Ships within 3–5 business days. Reliable doorstep delivery.",
            returnPolicy:
                "48-hour return window. Hassle-free resolution if needed.",
        },
        swatchColor: "#6B7280",
        productImages: {
            hero: "/images/grey/product/hero.webp",
            highlights: "/images/grey/product/highlights.webp",
            detail: "/images/grey/product/detail.webp",
            open: "/images/grey/product/open.webp",
            charging: "/images/grey/product/charging.webp",
        },
    },
    {
        id: "brown",
        name: "EVONIQ 4-in-1 Wireless Charging Laptop Sleeve",
        subName: "Warm authority.",
        price: "₹2,499",
        description:
            "Classic brown leather • Dual wireless charging • Foldable workspace • Integrated device management",
        folderPath: "/images/brown",
        frameCount: 240,
        frameExtension: "jpg",
        themeColor: "#B45309",
        gradient: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)",
        features: [
            "Heritage leather tone",
            "Dual wireless charging",
            "Kinetic fold workspace",
            "Integrated device slots",
        ],
        stats: [
            { label: "Weight", val: "400g" },
            { label: "Dimensions", val: "50 × 1 × 28 cm" },
            { label: "Heritage", val: "Classic" },
        ],
        section1: { title: "EVONIQ.", subtitle: "Carry with purpose. Present with authority." },
        section2: {
            title: "The executive upgrade.",
            subtitle:
                "A warm leather tone that elevates every workspace it unfolds into.",
        },
        section3: {
            title: "Power, streamlined.",
            subtitle:
                "Phone and earbuds charge beside your laptop — a clean, integrated power ecosystem.",
        },
        section4: {
            title: "Protection in transit.",
            subtitle:
                "Structured architecture designed to shield your devices from daily impact.",
        },
        detailsSection: {
            title: "Heritage exterior, modern core",
            description:
                "Brown leather brings timeless authority — while the interior delivers modern precision: dedicated device bays, a stable kinetic workspace, and a charging-first architecture that eliminates cable chaos entirely.",
            imageAlt: "EVONIQ Brown Details",
        },
        freshnessSection: {
            title: "Built for daily excellence",
            description:
                "From executive meetings to extended travel — this sleeve maintains organizational clarity and device readiness. The kind of utility that becomes indispensable.",
        },
        buyNowSection: {
            price: "₹2,499",
            unit: "per sleeve",
            processingParams: [
                "Heritage leather finish",
                "Kinetic fold design",
                "Dual charging pads",
            ],
            deliveryPromise:
                "Ships within 3–5 business days. Packed to protect edges and surface.",
            returnPolicy:
                "48-hour return window. Swift resolution for any concern.",
        },
        swatchColor: "#92400E",
        productImages: {
            hero: "/images/brown/product/hero.webp",
            highlights: "/images/brown/product/highlights.webp",
            detail: "/images/brown/product/detail.webp",
            open: "/images/brown/product/open.webp",
            charging: "/images/brown/product/charging.webp",
        },
    },
];
