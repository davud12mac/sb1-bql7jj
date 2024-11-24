import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MenuGrid } from './components/MenuGrid';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { useStore } from './store/useStore';

function App() {
  const currentTab = useStore((state) => state.currentTab);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'home' && <MenuGrid />}
          {currentTab === 'orders' && <Orders />}
        </main>
        <Cart />
      </div>
    </div>
  );
}