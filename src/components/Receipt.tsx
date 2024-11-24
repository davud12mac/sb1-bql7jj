import { format } from 'date-fns';
import { Order } from '../types';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
}

export function Receipt({ order, onClose }: ReceiptProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-t-lg shadow-xl animate-receipt-print">
        <div className="p-6 space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">Modern POS</h2>
            <p className="text-sm text-gray-500">
              {format(new Date(order.date), 'MMM dd, yyyy HH:mm')}
            </p>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>

          <div className="border-t border-b border-dashed py-4 space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Thank you for your purchase!</p>
            <p>Please come again</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-orange-500 text-white rounded-b-lg hover:bg-orange-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}