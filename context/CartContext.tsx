"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
    ReactNode,
} from "react";

// ── Types ──────────────────────────────────────────────────────────────────
export interface CartProduct {
    id: string;
    name: string;
    subName: string;
    price: string;         // e.g. "₹3,499"
    priceNum: number;      // e.g. 3499
    imageSrc: string;
    color: string;
}

export interface CartState {
    items: { product: CartProduct; qty: number }[];
    couponCode: string;
    couponApplied: boolean;
    freeGiftAdded: boolean;
    isOpen: boolean;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartProduct }
    | { type: "REMOVE_ITEM"; payload: string }         // id
    | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
    | { type: "APPLY_COUPON"; payload: string }
    | { type: "ADD_FREE_GIFT" }
    | { type: "REMOVE_FREE_GIFT" }
    | { type: "OPEN_CART" }
    | { type: "CLOSE_CART" }
    | { type: "CLEAR" }
    | { type: "HYDRATE"; payload: Partial<CartState> };

// ── Reducer ────────────────────────────────────────────────────────────────
const VALID_COUPONS = ["4IN1", "FIRST50", "TEST"];

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (i) => i.product.id === action.payload.id
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.product.id === action.payload.id
                            ? { ...i, qty: i.qty + 1 }
                            : i
                    ),
                    isOpen: true,
                };
            }
            return {
                ...state,
                items: [...state.items, { product: action.payload, qty: 1 }],
                isOpen: true,
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((i) => i.product.id !== action.payload),
            };
        case "UPDATE_QTY":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.product.id === action.payload.id
                        ? { ...i, qty: Math.max(1, action.payload.qty) }
                        : i
                ),
            };
        case "APPLY_COUPON": {
            const code = action.payload.trim().toUpperCase();
            if (VALID_COUPONS.includes(code)) {
                return {
                    ...state,
                    couponCode: code,
                    couponApplied: true,
                };
            }
            return { ...state, couponCode: action.payload, couponApplied: false };
        }
        case "ADD_FREE_GIFT":
            return { ...state, freeGiftAdded: true };
        case "REMOVE_FREE_GIFT":
            return { ...state, freeGiftAdded: false, couponApplied: false, couponCode: "" };
        case "OPEN_CART":
            return { ...state, isOpen: true };
        case "CLOSE_CART":
            return { ...state, isOpen: false };
        case "CLEAR":
            return { ...initialState };
        case "HYDRATE":
            return { ...state, ...action.payload, isOpen: false };
        default:
            return state;
    }
}

const initialState: CartState = {
    items: [],
    couponCode: "",
    couponApplied: false,
    freeGiftAdded: false,
    isOpen: false,
};

// ── Context ────────────────────────────────────────────────────────────────
interface CartContextValue {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    totalItems: number;
    totalPrice: number;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Hydrate strictly on client mount to avoid Next.js hydration mismatch
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("evoniq-cart");
            if (saved) {
                dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
            }
        } catch {
            // ignore
        }
    }, []);

    // Persist to sessionStorage on every state change
    useEffect(() => {
        try {
            const { isOpen: _ignored, ...toSave } = state;
            sessionStorage.setItem("evoniq-cart", JSON.stringify(toSave));
        } catch {
            // ignore
        }
    }, [state]);

    const totalItems = state.items.reduce((acc, i) => acc + i.qty, 0);
    let totalPrice = state.items.reduce(
        (acc, i) => acc + i.product.priceNum * i.qty,
        0
    );

    if (state.couponApplied) {
        if (state.couponCode === "FIRST50") {
            totalPrice = Math.max(0, totalPrice - 500);
        } else if (state.couponCode === "TEST") {
            totalPrice = 0;
        }
    }

    const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
    const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);

    return (
        <CartContext.Provider
            value={{ state, dispatch, totalItems, totalPrice, openCart, closeCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
