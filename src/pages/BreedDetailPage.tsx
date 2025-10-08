import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function BreedDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const breed = {
    id: Number(id),
    name: 'Лабрадор ретривер',
    origin: 'Канада',
    size: 'Большой',
    temperament: 'Дружелюбный, активный, общительный, добрый',
    careLevel: 'Средний',
    activityLevel: 'Высокая',
    lifeSpan: '10-12 лет',
    weightRange: '25-36 кг',
    heightRange: '54-57 см',
    description:
      'Лабрадор-ретривер — одна из самых популярных пород собак в мире. Это умные, дружелюбные и энергичные собаки, которые отлично подходят для семей с детьми. Лабрадоры изначально были выведены как помощники рыбаков, и их водоотталкивающая шерсть и перепончатые лапы делают их отличными пловцами.',
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    ],
    characteristics: {
      intelligence: 5,
      trainability: 5,
      childFriendly: 5,
      dogFriendly: 4,
      shedding: 4,
      groomingNeeds: 2,
      barkingLevel: 3,
      adaptability: 5,
    },
    reviews: [
      {
        id: 1,
        userName: 'Мария К.',
        rating: 5,
        reviewText: 'Замечательная порода! Наш лабрадор - член семьи. Очень умный и ласковый.',
        helpfulCount: 12,
      },
      {
        id: 2,
        userName: 'Алексей П.',
        rating: 5,
        reviewText: 'Лучшая собака для семьи с детьми. Терпеливая и игривая.',
        helpfulCount: 8,
      },
    ],
  };

  const characteristics = [
    { name: 'Интеллект', value: breed.characteristics.intelligence },
    { name: 'Обучаемость', value: breed.characteristics.trainability },
    { name: 'Дружелюбие к детям', value: breed.characteristics.childFriendly },
    { name: 'Дружелюбие к собакам', value: breed.characteristics.dogFriendly },
    { name: 'Линька', value: breed.characteristics.shedding },
    { name: 'Уход', value: breed.characteristics.groomingNeeds },
    { name: 'Склонность к лаю', value: breed.characteristics.barkingLevel },
    { name: 'Адаптивность', value: breed.characteristics.adaptability },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-8 text-white">
        <div className="container mx-auto px-4">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4">
            <Icon name="ArrowLeft" size={20} />
            Назад к каталогу
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">{breed.name}</h1>
          <p className="text-xl text-white/90 mt-2">{breed.origin}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="mb-4 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={breed.images[selectedImage]}
                  alt={breed.name}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {breed.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage === index
                        ? 'border-primary scale-105'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img src={image} alt={`${breed.name} ${index + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-card rounded-2xl p-6 shadow-md mb-6">
                <h2 className="text-2xl font-heading font-bold mb-4">Основная информация</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Размер:</span>
                    <span className="font-semibold">{breed.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="font-semibold">{breed.weightRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Рост:</span>
                    <span className="font-semibold">{breed.heightRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Продолжительность жизни:</span>
                    <span className="font-semibold">{breed.lifeSpan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Уровень ухода:</span>
                    <span className="font-semibold">{breed.careLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Активность:</span>
                    <span className="font-semibold">{breed.activityLevel}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-md">
                <h2 className="text-2xl font-heading font-bold mb-4">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">{breed.description}</p>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">Характер:</span>
                  <p className="font-semibold">{breed.temperament}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-md mb-12">
            <h2 className="text-2xl font-heading font-bold mb-6">Характеристики породы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {characteristics.map((char) => (
                <div key={char.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{char.name}</span>
                    <span className="text-muted-foreground">{char.value}/5</span>
                  </div>
                  <Progress value={char.value * 20} className="h-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-md mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6">Отзывы владельцев</h2>
            <div className="space-y-6 mb-8">
              {breed.reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <span className="font-semibold">{review.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={16}
                          className={i < review.rating ? 'text-secondary fill-secondary' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">{review.reviewText}</p>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Icon name="ThumbsUp" size={14} />
                    Полезно ({review.helpfulCount})
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-heading font-bold mb-4">Оставить отзыв</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Ваше имя"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium mb-2">Ваша оценка:</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setRating(i + 1)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={32}
                          className={i < rating ? 'text-secondary fill-secondary' : 'text-muted'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  placeholder="Ваш отзыв о породе..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
                <Button className="w-full md:w-auto" size="lg">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить отзыв
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
