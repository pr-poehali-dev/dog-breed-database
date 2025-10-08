import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { fetchBreedById, submitReview, type Breed } from '@/lib/api';

export default function BreedDetailPage() {
  const { id } = useParams();
  const [breed, setBreed] = useState<Breed | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadBreed(Number(id));
    }
  }, [id]);

  const loadBreed = async (breedId: number) => {
    try {
      const data = await fetchBreedById(breedId);
      setBreed(data);
    } catch (error) {
      console.error('Ошибка загрузки породы:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!breed || !userName.trim()) return;

    try {
      setSubmitting(true);
      await submitReview({
        breed_id: breed.id,
        user_name: userName,
        rating,
        review_text: reviewText,
      });
      setUserName('');
      setRating(5);
      setReviewText('');
      loadBreed(breed.id);
    } catch (error) {
      console.error('Ошибка отправки отзыва:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!breed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Порода не найдена</h2>
          <Button asChild>
            <Link to="/catalog">Вернуться к каталогу</Link>
          </Button>
        </div>
      </div>
    );
  }

  const photos = breed.photos || [];
  const characteristics = breed.characteristics || [];
  const reviews = breed.reviews || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-8 text-white">
        <div className="container mx-auto px-4">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <Icon name="ArrowLeft" size={20} />
            Назад к каталогу
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{breed.name}</h1>
          <p className="text-xl text-white/90 mt-2 flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            {breed.origin}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              {photos.length > 0 ? (
                <>
                  <div className="mb-4 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={photos[selectedImage].photo_url}
                      alt={breed.name}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {photos.slice(0, 3).map((photo, index) => (
                      <button
                        key={photo.id}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-xl overflow-hidden border-4 transition-all ${
                          selectedImage === index
                            ? 'border-primary scale-105'
                            : 'border-transparent hover:border-primary/50'
                        }`}
                      >
                        <img src={photo.photo_url} alt={`${breed.name} ${index + 1}`} className="w-full h-24 object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl bg-muted h-96 flex items-center justify-center text-8xl">
                  🐕
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Размер:</span>
                    <Badge variant="secondary">{breed.size}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="font-semibold">{breed.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Рост:</span>
                    <span className="font-semibold">{breed.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Продолжительность жизни:</span>
                    <span className="font-semibold">{breed.lifespan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Уровень ухода:</span>
                    <Badge variant="outline">{breed.care_level}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Активность:</span>
                    <Badge>{breed.activity_level}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Описание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{breed.description}</p>
                  <div className="border-t pt-4">
                    <span className="text-sm text-muted-foreground">Характер:</span>
                    <p className="font-semibold">{breed.temperament}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {characteristics.length > 0 && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Характеристики породы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {characteristics.map((char) => (
                    <div key={char.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{char.characteristic_name}</span>
                        <span className="text-muted-foreground">{char.rating}/5</span>
                      </div>
                      <Progress value={char.rating * 20} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Отзывы владельцев ({reviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8 bg-muted/20 rounded-lg p-6">
                <h3 className="text-xl font-heading font-bold mb-4">Оставить отзыв</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input
                      placeholder="Введите ваше имя"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваша оценка</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Icon
                            name={star <= rating ? 'Star' : 'StarOff'}
                            size={32}
                            className={star <= rating ? 'text-accent fill-accent' : 'text-muted'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
                    <Textarea
                      placeholder="Поделитесь своим опытом содержания этой породы..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleSubmitReview}
                    disabled={!userName.trim() || submitting}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    {submitting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="mr-2" size={20} />
                        Отправить отзыв
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{review.user_name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon
                                key={star}
                                name={star <= review.rating ? 'Star' : 'StarOff'}
                                size={14}
                                className={star <= review.rating ? 'text-accent fill-accent' : 'text-muted'}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.review_text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
