import { MenuItem } from '../types';
import { menuItems } from '../data/menuItems';
import { useStore } from '../store/useStore';

export function MenuGrid() {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {menuItems.map((item: MenuItem) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-orange-500 font-bold">
                ${item.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(item)}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}