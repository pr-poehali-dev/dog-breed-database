import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function SearchPage() {
  const [size, setSize] = useState('all');
  const [activityLevel, setActivityLevel] = useState('all');
  const [careLevel, setCareLevel] = useState('all');
  const [intelligence, setIntelligence] = useState([3]);
  const [childFriendly, setChildFriendly] = useState([3]);

  const searchResults = [
    {
      id: 1,
      name: 'Лабрадор ретривер',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
      size: 'Большой',
      activityLevel: 'Высокая',
      careLevel: 'Средний',
      intelligence: 5,
      childFriendly: 5,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Золотистый ретривер',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      size: 'Большой',
      activityLevel: 'Высокая',
      careLevel: 'Средний',
      intelligence: 5,
      childFriendly: 5,
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Бигль',
      image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400',
      size: 'Средний',
      activityLevel: 'Высокая',
      careLevel: 'Низкий',
      intelligence: 4,
      childFriendly: 5,
      rating: 4.5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center">
            Поиск по характеристикам
          </h1>
          <p className="text-xl text-center text-white/90">
            Найдите идеальную породу для вашего образа жизни
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-md sticky top-24">
                <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <Icon name="Filter" size={24} className="text-primary" />
                  Фильтры
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Размер</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любой</SelectItem>
                        <SelectItem value="Маленький">Маленький</SelectItem>
                        <SelectItem value="Средний">Средний</SelectItem>
                        <SelectItem value="Большой">Большой</SelectItem>
                        <SelectItem value="Гигантский">Гигантский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Уровень активности</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любой</SelectItem>
                        <SelectItem value="Низкая">Низкая</SelectItem>
                        <SelectItem value="Средняя">Средняя</SelectItem>
                        <SelectItem value="Высокая">Высокая</SelectItem>
                        <SelectItem value="Очень высокая">Очень высокая</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Уровень ухода</Label>
                    <Select value={careLevel} onValueChange={setCareLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любой</SelectItem>
                        <SelectItem value="Низкий">Низкий</SelectItem>
                        <SelectItem value="Средний">Средний</SelectItem>
                        <SelectItem value="Высокий">Высокий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Интеллект: {intelligence[0]}/5
                    </Label>
                    <Slider
                      value={intelligence}
                      onValueChange={setIntelligence}
                      min={1}
                      max={5}
                      step={1}
                      className="mb-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Дружелюбие к детям: {childFriendly[0]}/5
                    </Label>
                    <Slider
                      value={childFriendly}
                      onValueChange={setChildFriendly}
                      min={1}
                      max={5}
                      step={1}
                      className="mb-2"
                    />
                  </div>

                  <Button className="w-full" variant="outline">
                    <Icon name="RotateCcw" className="mr-2" size={18} />
                    Сбросить фильтры
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  Найдено: <span className="text-primary">{searchResults.length}</span> пород
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((breed) => (
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
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-heading font-bold text-foreground">
                            {breed.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                            <Icon name="Star" size={16} className="text-secondary fill-secondary" />
                            <span className="text-sm font-bold text-secondary">{breed.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Размер:</span>
                            <p className="font-semibold">{breed.size}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Активность:</span>
                            <p className="font-semibold">{breed.activityLevel}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Уход:</span>
                            <p className="font-semibold">{breed.careLevel}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Интеллект:</span>
                            <p className="font-semibold">{breed.intelligence}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
