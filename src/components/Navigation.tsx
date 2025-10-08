import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/catalog', label: 'Каталог', icon: 'Grid3x3' },
    { path: '/search', label: 'Поиск', icon: 'Search' },
    { path: '/compare', label: 'Сравнение', icon: 'GitCompare' },
    { path: '/about', label: 'О проекте', icon: 'Info' },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-heading font-bold text-primary">
            <Icon name="Dog" size={32} />
            <span className="hidden sm:inline">DogBase</span>
          </Link>
          <div className="flex gap-1 md:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
