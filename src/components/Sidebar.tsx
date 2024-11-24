import { Coffee, UtensilsCrossed, Wine, Sandwich } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: Coffee, label: 'Drinks', active: false },
  { icon: UtensilsCrossed, label: 'Food', active: true },
  { icon: Wine, label: 'Bar', active: false },
  { icon: Sandwich, label: 'Snacks', active: false },
];

export function Sidebar() {
  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      {menuItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={cn(
            'w-full flex flex-col items-center space-y-1 py-2 px-2',
            'hover:bg-orange-50 transition-colors duration-200',
            active && 'text-orange-500'
          )}
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}