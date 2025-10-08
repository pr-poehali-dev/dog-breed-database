import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');

  const breeds = [
    {
      id: 1,
      name: 'Лабрадор ретривер',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
      size: 'Большой',
      temperament: 'Дружелюбный, активный',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Немецкая овчарка',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
      size: 'Большой',
      temperament: 'Умный, преданный',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Золотистый ретривер',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      size: 'Большой',
      temperament: 'Ласковый, дружелюбный',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Бигль',
      image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
      size: 'Средний',
      temperament: 'Веселый, любопытный',
      rating: 4.5,
    },
    {
      id: 5,
      name: 'Пудель',
      image: 'https://images.unsplash.com/photo-1616080285938-07916a547765?w=400',
      size: 'Средний',
      temperament: 'Умный, элегантный',
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Йоркширский терьер',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      size: 'Маленький',
      temperament: 'Смелый, ласковый',
      rating: 4.4,
    },
  ];

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = sizeFilter === 'all' || breed.size === sizeFilter;
    return matchesSearch && matchesSize;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center">
            Каталог пород собак
          </h1>
          <p className="text-xl text-center text-white/90">
            Исследуйте более 300 пород собак со всего мира
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск породы..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger className="w-full md:w-64 h-12 text-lg">
                <SelectValue placeholder="Размер" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все размеры</SelectItem>
                <SelectItem value="Маленький">Маленький</SelectItem>
                <SelectItem value="Средний">Средний</SelectItem>
                <SelectItem value="Большой">Большой</SelectItem>
                <SelectItem value="Гигантский">Гигантский</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <Link
                key={breed.id}
                to={`/breed/${breed.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {breed.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                        <Icon name="Star" size={16} className="text-secondary fill-secondary" />
                        <span className="text-sm font-bold text-secondary">{breed.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{breed.temperament}</p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {breed.size}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredBreeds.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">Породы не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
