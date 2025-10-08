import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { fetchBreeds, type Breed } from '@/lib/api';

export default function CatalogPage() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center">
            Каталог пород собак
          </h1>
          <p className="text-xl text-center text-white/90">
            Полная база пород собак с подробной информацией
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск породы..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Загрузка пород...</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                Найдено пород: <span className="font-bold text-foreground">{filteredBreeds.length}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBreeds.map((breed) => (
                  <Link key={breed.id} to={`/breed/${breed.id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        {breed.primary_photo ? (
                          <img
                            src={breed.primary_photo.photo_url}
                            alt={breed.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-6xl">
                            🐕
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{breed.name}</CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {breed.origin}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{breed.description}</p>
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
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name={star <= Math.round(breed.avg_rating) ? 'Star' : 'StarOff'}
                              size={14}
                              className={star <= Math.round(breed.avg_rating) ? 'text-accent fill-accent' : 'text-muted'}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({breed.review_count} отзывов)
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
