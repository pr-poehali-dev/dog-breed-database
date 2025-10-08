import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';
import { fetchBreeds, type Breed } from '@/lib/api';

export default function HomePage() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBreeds();
  }, []);

  const loadBreeds = async () => {
    try {
      const data = await fetchBreeds();
      setBreeds(data.breeds);
    } catch (error) {
      console.error('Ошибка загрузки пород:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-accent to-secondary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              Энциклопедия пород собак
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Узнайте всё о породах собак: характеристики, особенности ухода и отзывы владельцев
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                <Link to="/catalog">
                  <Icon name="Search" className="mr-2" size={20} />
                  Каталог пород
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-2 border-white text-white hover:bg-white/20 text-lg px-8">
                <Link to="/search">
                  <Icon name="Filter" className="mr-2" size={20} />
                  Поиск по характеристикам
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Популярные породы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : (
              breeds.slice(0, 6).map((breed) => (
                <Link
                  key={breed.id}
                  to={`/breed/${breed.id}`}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      {breed.primary_photo ? (
                        <img
                          src={breed.primary_photo.photo_url}
                          alt={breed.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-6xl">
                          🐕
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{breed.name}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {breed.origin}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">
                          <Icon name="Ruler" size={12} className="mr-1" />
                          {breed.size}
                        </Badge>
                        <Badge variant="outline">
                          <Icon name="Zap" size={12} className="mr-1" />
                          {breed.activity_level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name={star <= Math.round(breed.avg_rating) ? 'Star' : 'StarOff'}
                            size={14}
                            className={star <= Math.round(breed.avg_rating) ? 'text-accent fill-accent' : 'text-muted'}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({breed.review_count})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/catalog">
                Смотреть все породы
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
              Возможности портала
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="BookOpen" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Подробные описания
                </h3>
                <p className="text-muted-foreground">
                  Полная информация о каждой породе: характер, здоровье, уход
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Image" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Фотогалереи
                </h3>
                <p className="text-muted-foreground">
                  Множество качественных фотографий каждой породы
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name="Star" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Отзывы владельцев
                </h3>
                <p className="text-muted-foreground">
                  Реальные отзывы и оценки от владельцев собак
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}