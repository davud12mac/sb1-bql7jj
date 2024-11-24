export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}