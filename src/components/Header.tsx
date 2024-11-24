import { Home, ShoppingBag, History, Receipt, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

const navItems = [
  { icon: Home, label: 'Home', tab: 'home' as const },
  { icon: ShoppingBag, label: 'Orders', tab: 'orders' as const },
  { icon: History, label: 'History', tab: 'history' as const },
  { icon: Receipt, label: 'Bills', tab: 'bills' as const },
];

export function Header() {
  const { currentTab, setCurrentTab } = useStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Modern POS</h1>
          </div>
          
          <nav className="flex space-x-8">
            {navItems.map(({ icon: Icon, label, tab }) => (
              <button
                key={label}
                onClick={() => setCurrentTab(tab)}
                className={cn(
                  'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium',
                  currentTab === tab
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center">
            <button className="p-2 rounded-full bg-gray-100">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}