import { format } from 'date-fns';
import { useStore } from '../store/useStore';

export function Orders() {
  const orders = useStore((state) => state.orders);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.date), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-orange-500">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}