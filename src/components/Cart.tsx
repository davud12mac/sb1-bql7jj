import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Receipt } from './Receipt';

export function Cart() {
  const [showReceipt, setShowReceipt] = useState(false);
  const { cart, updateQuantity, removeFromCart, completeOrder, orders } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePayNow = () => {
    if (cart.length === 0) return;
    completeOrder();
    setShowReceipt(true);
  };

  return (
    <>
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Current Order</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-start space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm text-orange-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-md hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-md hover:bg-gray-100 ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>Total</span>
            <span className="text-orange-500">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePayNow}
            disabled={cart.length === 0}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
        </div>
      </div>

      {showReceipt && orders.length > 0 && (
        <Receipt order={orders[0]} onClose={() => setShowReceipt(false)} />
      )}
    </>
  );
}