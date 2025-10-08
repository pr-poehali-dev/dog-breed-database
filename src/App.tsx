import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Breed {
  id: number;
  name: string;
  description: string;
  origin: string;
  size: string;
  temperament: string;
  care_level: string;
  activity_level: string;
  lifespan: string;
  weight: string;
  height: string;
}

interface BreedPhoto {
  id: number;
  breed_id: number;
  photo_url: string;
  is_primary: boolean;
  caption: string;
}

interface BreedCharacteristic {
  id: number;
  breed_id: number;
  characteristic_name: string;
  rating: number;
  description: string;
}

interface BreedReview {
  id: number;
  breed_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');
  const [selectedCare, setSelectedCare] = useState<string>('all');
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [photos, setPhotos] = useState<BreedPhoto[]>([]);
  const [characteristics, setCharacteristics] = useState<BreedCharacteristic[]>([]);
  const [reviews, setReviews] = useState<BreedReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedsQuery = `SELECT * FROM t_p79480865_dog_breed_database.breeds ORDER BY name`;
        const photosQuery = `SELECT * FROM t_p79480865_dog_breed_database.breed_photos ORDER BY breed_id, is_primary DESC`;
        const charsQuery = `SELECT * FROM t_p79480865_dog_breed_database.breed_characteristics ORDER BY breed_id`;
        const reviewsQuery = `SELECT * FROM t_p79480865_dog_breed_database.breed_reviews ORDER BY breed_id, created_at DESC`;

        const [breedsRes, photosRes, charsRes, reviewsRes] = await Promise.all([
          fetch('/api/db/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: breedsQuery })
          }),
          fetch('/api/db/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: photosQuery })
          }),
          fetch('/api/db/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: charsQuery })
          }),
          fetch('/api/db/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: reviewsQuery })
          })
        ]);

        const [breedsData, photosData, charsData, reviewsData] = await Promise.all([
          breedsRes.json(),
          photosRes.json(),
          charsRes.json(),
          reviewsRes.json()
        ]);

        setBreeds(breedsData);
        setPhotos(photosData);
        setCharacteristics(charsData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBreeds = breeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = selectedSize === 'all' || breed.size === selectedSize;
    const matchesActivity = selectedActivity === 'all' || breed.activity_level === selectedActivity;
    const matchesCare = selectedCare === 'all' || breed.care_level === selectedCare;
    
    return matchesSearch && matchesSize && matchesActivity && matchesCare;
  });

  const getBreedPhoto = (breedId: number, primary: boolean = true) => {
    const photo = photos.find(p => p.breed_id === breedId && p.is_primary === primary);
    return photo?.photo_url || '';
  };

  const getBreedPhotos = (breedId: number) => {
    return photos.filter(p => p.breed_id === breedId);
  };

  const getBreedCharacteristics = (breedId: number) => {
    return characteristics.filter(c => c.breed_id === breedId);
  };

  const getBreedReviews = (breedId: number) => {
    return reviews.filter(r => r.breed_id === breedId);
  };

  const getAverageRating = (breedId: number) => {
    const breedReviews = getBreedReviews(breedId);
    if (breedReviews.length === 0) return 0;
    const sum = breedReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / breedReviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse">🐾</div>
          <p className="text-muted-foreground">Загрузка данных о породах...</p>
        </div>
      </div>
    );
  }

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
                {breeds.slice(0, 6).map(breed => {
                  const photoUrl = getBreedPhoto(breed.id);
                  const avgRating = getAverageRating(breed.id);
                  
                  return (
                    <Card 
                      key={breed.id} 
                      className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
                      onClick={() => setSelectedBreed(breed)}
                    >
                      <CardHeader className="pb-4">
                        {photoUrl && (
                          <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                            <img 
                              src={photoUrl} 
                              alt={breed.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardTitle className="font-heading text-xl">{breed.name}</CardTitle>
                        <CardDescription className="text-sm">{breed.origin}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="font-medium">
                            <Icon name="Ruler" size={14} className="mr-1" />
                            {breed.size}
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            <Icon name="Zap" size={14} className="mr-1" />
                            {breed.activity_level}
                          </Badge>
                          {avgRating > 0 && (
                            <Badge variant="outline" className="font-medium">
                              <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                              {avgRating}
                            </Badge>
                          )}
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
                  );
                })}
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
                  setSelectedActivity('all');
                  setSelectedCare('all');
                }}
              >
                <Icon name="X" size={18} className="mr-2" />
                Сбросить фильтры
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map(breed => {
                const photoUrl = getBreedPhoto(breed.id);
                const avgRating = getAverageRating(breed.id);
                
                return (
                  <Card 
                    key={breed.id}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedBreed(breed)}
                  >
                    <CardHeader>
                      {photoUrl && (
                        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                          <img 
                            src={photoUrl} 
                            alt={breed.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardTitle className="font-heading">{breed.name}</CardTitle>
                      <CardDescription>{breed.origin}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <Icon name="Ruler" size={14} className="mr-1" />
                          {breed.size}
                        </Badge>
                        <Badge variant="outline">
                          <Icon name="Zap" size={14} className="mr-1" />
                          {breed.activity_level}
                        </Badge>
                        {avgRating > 0 && (
                          <Badge variant="outline">
                            <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                            {avgRating}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {breed.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
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
                    <SelectItem value="маленькая">Маленькая</SelectItem>
                    <SelectItem value="средняя">Средняя</SelectItem>
                    <SelectItem value="большая">Большая</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Уровень активности</label>
                <Select value={selectedActivity} onValueChange={setSelectedActivity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все уровни" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни</SelectItem>
                    <SelectItem value="низкая">Низкая</SelectItem>
                    <SelectItem value="средняя">Средняя</SelectItem>
                    <SelectItem value="высокая">Высокая</SelectItem>
                    <SelectItem value="очень высокая">Очень высокая</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Потребность в уходе</label>
                <Select value={selectedCare} onValueChange={setSelectedCare}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все уровни" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни</SelectItem>
                    <SelectItem value="низкий">Низкий</SelectItem>
                    <SelectItem value="средний">Средний</SelectItem>
                    <SelectItem value="высокий">Высокий</SelectItem>
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
              {filteredBreeds.map(breed => {
                const photoUrl = getBreedPhoto(breed.id);
                
                return (
                  <Card 
                    key={breed.id}
                    className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedBreed(breed)}
                  >
                    <CardHeader>
                      {photoUrl && (
                        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                          <img 
                            src={photoUrl} 
                            alt={breed.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardTitle className="font-heading">{breed.name}</CardTitle>
                      <CardDescription>{breed.origin}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Размер:</span>
                          <span className="font-medium">{breed.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Активность:</span>
                          <span className="font-medium">{breed.activity_level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Уход:</span>
                          <span className="font-medium">{breed.care_level}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
                      <span>Детальные описания пород собак с реальными фотографиями</span>
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
                      <span>Отзывы реальных владельцев собак с оценками</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon name="Check" size={20} className="text-primary mt-1 shrink-0" />
                      <span>Детальные характеристики каждой породы</span>
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
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="sticky top-0 bg-card z-10 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-heading mb-2">{selectedBreed.name}</CardTitle>
                  <CardDescription className="text-lg">{selectedBreed.origin}</CardDescription>
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
              <div className="grid md:grid-cols-2 gap-4">
                {getBreedPhotos(selectedBreed.id).slice(0, 4).map((photo, idx) => (
                  <div key={photo.id} className={idx === 0 ? "md:col-span-2" : ""}>
                    <div className={`w-full overflow-hidden rounded-lg ${idx === 0 ? 'h-80' : 'h-48'}`}>
                      <img 
                        src={photo.photo_url} 
                        alt={photo.caption}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{photo.caption}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-heading font-semibold text-lg mb-3">Описание</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedBreed.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Основные характеристики</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Размер:</span>
                      <span className="font-medium">{selectedBreed.size}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Продолжительность жизни:</span>
                      <span className="font-medium">{selectedBreed.lifespan}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="font-medium">{selectedBreed.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Рост:</span>
                      <span className="font-medium">{selectedBreed.height}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-semibold text-lg">Уход и содержание</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Уровень активности:</span>
                      <span className="font-medium">{selectedBreed.activity_level}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Потребность в уходе:</span>
                      <span className="font-medium">{selectedBreed.care_level}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Темперамент:</span>
                      <span className="font-medium">{selectedBreed.temperament}</span>
                    </div>
                  </div>
                </div>
              </div>

              {getBreedCharacteristics(selectedBreed.id).length > 0 && (
                <div>
                  <h4 className="font-heading font-semibold text-lg mb-3">Детальные характеристики</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {getBreedCharacteristics(selectedBreed.id).map(char => (
                      <div key={char.id} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{char.characteristic_name}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < char.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{char.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getBreedReviews(selectedBreed.id).length > 0 && (
                <div>
                  <h4 className="font-heading font-semibold text-lg mb-3">
                    Отзывы владельцев ({getBreedReviews(selectedBreed.id).length})
                  </h4>
                  <div className="space-y-4">
                    {getBreedReviews(selectedBreed.id).slice(0, 3).map(review => (
                      <Card key={review.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{review.user_name}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

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
