import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Breed {
  id: number;
  name: string;
  name_en: string;
  size: string;
  temperament: string;
  energy_level: string;
  grooming_needs: string;
  trainability: string;
  good_with_children: boolean;
  good_with_pets: boolean;
  coat_type: string;
  coat_color: string;
  origin_country: string;
  life_expectancy: string;
  weight_range: string;
  height_range: string;
  description: string;
  photo?: string;
}

const mockBreeds: Breed[] = [
  {
    id: 1,
    name: 'Золотистый ретривер',
    name_en: 'Golden Retriever',
    size: 'Большая',
    temperament: 'Дружелюбный, умный, преданный',
    energy_level: 'Высокая',
    grooming_needs: 'Средний',
    trainability: 'Легко',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Длинная, волнистая',
    coat_color: 'Золотистый',
    origin_country: 'Шотландия',
    life_expectancy: '10-12 лет',
    weight_range: '25-34 кг',
    height_range: '51-61 см',
    description: 'Золотистый ретривер - одна из самых популярных пород в мире. Отличается дружелюбным характером и высоким интеллектом.',
    photo: '🐕'
  },
  {
    id: 2,
    name: 'Немецкая овчарка',
    name_en: 'German Shepherd',
    size: 'Большая',
    temperament: 'Умный, храбрый, уверенный',
    energy_level: 'Очень высокая',
    grooming_needs: 'Средний',
    trainability: 'Легко',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Средняя, густая',
    coat_color: 'Черно-рыжий',
    origin_country: 'Германия',
    life_expectancy: '9-13 лет',
    weight_range: '22-40 кг',
    height_range: '55-65 см',
    description: 'Универсальная служебная собака, известная своей преданностью и обучаемостью.',
    photo: '🐕‍🦺'
  },
  {
    id: 3,
    name: 'Лабрадор',
    name_en: 'Labrador Retriever',
    size: 'Большая',
    temperament: 'Общительный, энергичный, добрый',
    energy_level: 'Очень высокая',
    grooming_needs: 'Минимальный',
    trainability: 'Легко',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Короткая, густая',
    coat_color: 'Черный, палевый, шоколадный',
    origin_country: 'Канада',
    life_expectancy: '10-14 лет',
    weight_range: '25-36 кг',
    height_range: '54-57 см',
    description: 'Самая популярная семейная собака, обожает воду и активные игры.',
    photo: '🦮'
  },
  {
    id: 4,
    name: 'Французский бульдог',
    name_en: 'French Bulldog',
    size: 'Маленькая',
    temperament: 'Игривый, дружелюбный, адаптивный',
    energy_level: 'Средняя',
    grooming_needs: 'Минимальный',
    trainability: 'Средне',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Короткая, гладкая',
    coat_color: 'Тигровый, палевый, белый',
    origin_country: 'Франция',
    life_expectancy: '10-12 лет',
    weight_range: '8-14 кг',
    height_range: '28-33 см',
    description: 'Компактная собака-компаньон с характерной внешностью и веселым нравом.',
    photo: '🐶'
  },
  {
    id: 5,
    name: 'Хаски',
    name_en: 'Siberian Husky',
    size: 'Средняя',
    temperament: 'Дружелюбный, независимый, активный',
    energy_level: 'Очень высокая',
    grooming_needs: 'Высокий',
    trainability: 'Средне',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Густая, двойная',
    coat_color: 'Черно-белый, серо-белый',
    origin_country: 'Сибирь',
    life_expectancy: '12-15 лет',
    weight_range: '16-27 кг',
    height_range: '50-60 см',
    description: 'Ездовая собака с яркой внешностью и невероятной выносливостью.',
    photo: '🐺'
  },
  {
    id: 6,
    name: 'Бигль',
    name_en: 'Beagle',
    size: 'Средняя',
    temperament: 'Любопытный, веселый, дружелюбный',
    energy_level: 'Высокая',
    grooming_needs: 'Минимальный',
    trainability: 'Средне',
    good_with_children: true,
    good_with_pets: true,
    coat_type: 'Короткая, плотная',
    coat_color: 'Триколор',
    origin_country: 'Англия',
    life_expectancy: '12-15 лет',
    weight_range: '9-11 кг',
    height_range: '33-41 см',
    description: 'Охотничья гончая с отличным нюхом и жизнерадостным характером.',
    photo: '🐕'
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedEnergy, setSelectedEnergy] = useState<string>('all');
  const [selectedGrooming, setSelectedGrooming] = useState<string>('all');
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const filteredBreeds = mockBreeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         breed.name_en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = selectedSize === 'all' || breed.size === selectedSize;
    const matchesEnergy = selectedEnergy === 'all' || breed.energy_level === selectedEnergy;
    const matchesGrooming = selectedGrooming === 'all' || breed.grooming_needs === selectedGrooming;
    
    return matchesSearch && matchesSize && matchesEnergy && matchesGrooming;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DOG BREEDS
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button 
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className="font-medium"
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button 
              variant={activeTab === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('catalog')}
              className="font-medium"
            >
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Каталог пород
            </Button>
            <Button 
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('search')}
              className="font-medium"
            >
              <Icon name="Search" size={18} className="mr-2" />
              Поиск
            </Button>
            <Button 
              variant={activeTab === 'compare' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('compare')}
              className="font-medium"
            >
              <Icon name="ArrowLeftRight" size={18} className="mr-2" />
              Сравнение
            </Button>
            <Button 
              variant={activeTab === 'about' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('about')}
              className="font-medium"
            >
              <Icon name="Info" size={18} className="mr-2" />
              О проекте
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-12 text-center">
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h2 className="text-5xl font-heading font-bold text-foreground">
                  Найди идеального четвероногого друга
                </h2>
                <p className="text-xl text-muted-foreground">
                  База данных с подробной информацией о породах собак, их характеристиках и особенностях
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" onClick={() => setActiveTab('catalog')} className="font-semibold">
                    <Icon name="Search" size={20} className="mr-2" />
                    Исследовать породы
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveTab('search')} className="font-semibold">
                    <Icon name="SlidersHorizontal" size={20} className="mr-2" />
                    Подобрать по параметрам
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-heading font-bold">Популярные породы</h3>
                <Button variant="ghost" onClick={() => setActiveTab('catalog')}>
                  Все породы
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBreeds.slice(0, 6).map(breed => (
                  <Card 
                    key={breed.id} 
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedBreed(breed)}
                  >
                    <CardHeader className="pb-4">
                      <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                        {breed.photo}
                      </div>
                      <CardTitle className="font-heading text-xl">{breed.name}</CardTitle>
                      <CardDescription className="text-sm">{breed.name_en}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="font-medium">
                          <Icon name="Ruler" size={14} className="mr-1" />
                          {breed.size}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                          <Icon name="Zap" size={14} className="mr-1" />
                          {breed.energy_level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {breed.description}
                      </p>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon name="Eye" size={16} className="mr-2" />
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">📊</div>
                <h4 className="font-heading font-bold text-xl mb-2">Детальные характеристики</h4>
                <p className="text-muted-foreground">Полная информация о темпераменте, уходе и здоровье</p>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">🖼️</div>
                <h4 className="font-heading font-bold text-xl mb-2">Фотогалереи пород</h4>
                <p className="text-muted-foreground">Множество фотографий каждой породы</p>
              </Card>
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">⭐</div>
                <h4 className="font-heading font-bold text-xl mb-2">Отзывы владельцев</h4>
                <p className="text-muted-foreground">Реальный опыт содержания пород</p>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-2">Каталог пород</h2>
              <p className="text-muted-foreground">Выберите породу для получения подробной информации</p>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <Input
                  placeholder="Поиск по названию породы..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSize('all');
                  setSelectedEnergy('all');
                  setSelectedGrooming('all');
                }}
              >
                <Icon name="X" size={18} className="mr-2" />
                Сбросить фильтры
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map(breed => (
                <Card 
                  key={breed.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setSelectedBreed(breed)}
                >
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                      {breed.photo}
                    </div>
                    <CardTitle className="font-heading">{breed.name}</CardTitle>
                    <CardDescription>{breed.name_en}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Icon name="Ruler" size={14} className="mr-1" />
                        {breed.size}
                      </Badge>
                      <Badge variant="outline">
                        <Icon name="Zap" size={14} className="mr-1" />
                        {breed.energy_level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {breed.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredBreeds.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Породы не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-2">Поиск по характеристикам</h2>
              <p className="text-muted-foreground">Подберите породу по важным для вас параметрам</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Размер породы</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все размеры" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все размеры</SelectItem>
                    <SelectItem value="Маленькая">Маленькая</SelectItem>
                    <SelectItem value="Средняя">Средняя</SelectItem>
                    <SelectItem value="Большая">Большая</SelectItem>
                    <SelectItem value="Гигантская">Гигантская</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Уровень активности</label>
                <Select value={selectedEnergy} onValueChange={setSelectedEnergy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все уровни" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни</SelectItem>
                    <SelectItem value="Низкая">Низкая</SelectItem>
                    <SelectItem value="Средняя">Средняя</SelectItem>
                    <SelectItem value="Высокая">Высокая</SelectItem>
                    <SelectItem value="Очень высокая">Очень высокая</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Потребность в уходе</label>
                <Select value={selectedGrooming} onValueChange={setSelectedGrooming}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все уровни" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни</SelectItem>
                    <SelectItem value="Минимальный">Минимальный</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Высокий">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">
                Найдено пород: <span className="text-primary font-bold">{filteredBreeds.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map(breed => (
                <Card 
                  key={breed.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                  onClick={() => setSelectedBreed(breed)}
                >
                  <CardHeader>
                    <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                      {breed.photo}
                    </div>
                    <CardTitle className="font-heading">{breed.name}</CardTitle>
                    <CardDescription>{breed.name_en}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер:</span>
                        <span className="font-medium">{breed.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Активность:</span>
                        <span className="font-medium">{breed.energy_level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Уход:</span>
                        <span className="font-medium">{breed.grooming_needs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Дрессировка:</span>
                        <span className="font-medium">{breed.trainability}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-2">Сравнение пород</h2>
              <p className="text-muted-foreground">Скоро здесь можно будет сравнить породы между собой</p>
            </div>
            <Card className="p-12 text-center">
              <Icon name="GitCompare" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">Функция в разработке</h3>
              <p className="text-muted-foreground">
                Выберите до 3 пород для детального сравнения характеристик
              </p>
            </Card>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-2">О проекте</h2>
              <p className="text-muted-foreground">База знаний о породах собак</p>
            </div>
            <Card className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">Добро пожаловать!</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Наш проект создан для тех, кто хочет найти идеального четвероногого друга. 
                    Мы собрали подробную информацию о различных породах собак, их характеристиках, 
                    особенностях ухода и содержания.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xl font-heading font-semibold">Возможности портала:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Детальные описания более 100 пород собак</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Фотогалереи с множеством изображений каждой породы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Поиск по характеристикам: размер, уровень активности, уход</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Отзывы реальных владельцев собак</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Сравнение пород для более осознанного выбора</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Выбор собаки - это важное решение. Используйте наши фильтры и характеристики, 
                    чтобы найти породу, которая идеально впишется в ваш образ жизни!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {selectedBreed && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedBreed(null)}
        >
          <Card 
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 bg-card z-10 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-heading mb-2">{selectedBreed.name}</CardTitle>
                  <CardDescription className="text-lg">{selectedBreed.name_en}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedBreed(null)}
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="text-8xl text-center py-6">
                {selectedBreed.photo}
              </div>

              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">Описание</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedBreed.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Основные характеристики</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Размер:</span>
                      <span className="font-medium">{selectedBreed.size}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Страна происхождения:</span>
                      <span className="font-medium">{selectedBreed.origin_country}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Продолжительность жизни:</span>
                      <span className="font-medium">{selectedBreed.life_expectancy}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="font-medium">{selectedBreed.weight_range}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Рост:</span>
                      <span className="font-medium">{selectedBreed.height_range}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Уход и содержание</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Уровень активности:</span>
                      <span className="font-medium">{selectedBreed.energy_level}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Потребность в уходе:</span>
                      <span className="font-medium">{selectedBreed.grooming_needs}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Дрессировка:</span>
                      <span className="font-medium">{selectedBreed.trainability}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Тип шерсти:</span>
                      <span className="font-medium">{selectedBreed.coat_type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Окрас:</span>
                      <span className="font-medium">{selectedBreed.coat_color}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">Темперамент</h4>
                <p className="text-muted-foreground">{selectedBreed.temperament}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name={selectedBreed.good_with_children ? 'Check' : 'X'} 
                          size={18} 
                          className={selectedBreed.good_with_children ? 'text-green-500' : 'text-red-500'} />
                    <span>Подходит для детей</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name={selectedBreed.good_with_pets ? 'Check' : 'X'} 
                          size={18} 
                          className={selectedBreed.good_with_pets ? 'text-green-500' : 'text-red-500'} />
                    <span>Уживается с животными</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" size="lg">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Добавить в избранное
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="border-t mt-16 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>🐾 DOG BREEDS DATABASE — Ваш путеводитель в мире пород собак</p>
          <p className="mt-2">Создано с любовью к четвероногим друзьям</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
