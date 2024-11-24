import { create } from 'zustand';
import { CartItem, MenuItem, Order } from '../types';
import { format } from 'date-fns';

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  currentTab: 'home' | 'orders' | 'history' | 'bills';
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  completeOrder: () => void;
  setCurrentTab: (tab: 'home' | 'orders' | 'history' | 'bills') => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  orders: [],
  currentTab: 'home',
  addToCart: (item: MenuItem) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  removeFromCart: (itemId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  completeOrder: () => {
    const { cart } = get();
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9),
      items: [...cart],
      subtotal,
      tax,
      total,
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      status: 'completed',
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      cart: [],
    }));

    // Play success sound
    const audio = new Audio('/success.mp3');
    audio.play();
  },
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));