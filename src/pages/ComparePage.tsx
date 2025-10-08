import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function ComparePage() {
  const [breed1, setBreed1] = useState('1');
  const [breed2, setBreed2] = useState('2');

  const breeds = [
    {
      id: '1',
      name: 'Лабрадор ретривер',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
      size: 'Большой',
      weight: '25-36 кг',
      height: '54-57 см',
      lifeSpan: '10-12 лет',
      activityLevel: 'Высокая',
      careLevel: 'Средний',
      characteristics: {
        intelligence: 5,
        trainability: 5,
        childFriendly: 5,
        dogFriendly: 4,
        shedding: 4,
        groomingNeeds: 2,
      },
    },
    {
      id: '2',
      name: 'Немецкая овчарка',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
      size: 'Большой',
      weight: '30-40 кг',
      height: '55-65 см',
      lifeSpan: '9-13 лет',
      activityLevel: 'Очень высокая',
      careLevel: 'Средний',
      characteristics: {
        intelligence: 5,
        trainability: 5,
        childFriendly: 4,
        dogFriendly: 3,
        shedding: 4,
        groomingNeeds: 3,
      },
    },
    {
      id: '3',
      name: 'Золотистый ретривер',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      size: 'Большой',
      weight: '25-34 кг',
      height: '51-61 см',
      lifeSpan: '10-12 лет',
      activityLevel: 'Высокая',
      careLevel: 'Высокий',
      characteristics: {
        intelligence: 5,
        trainability: 5,
        childFriendly: 5,
        dogFriendly: 5,
        shedding: 4,
        groomingNeeds: 3,
      },
    },
  ];

  const selectedBreed1 = breeds.find((b) => b.id === breed1);
  const selectedBreed2 = breeds.find((b) => b.id === breed2);

  const characteristicLabels = {
    intelligence: 'Интеллект',
    trainability: 'Обучаемость',
    childFriendly: 'Дружелюбие к детям',
    dogFriendly: 'Дружелюбие к собакам',
    shedding: 'Линька',
    groomingNeeds: 'Потребность в уходе',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center">
            Сравнение пород
          </h1>
          <p className="text-xl text-center text-white/90">
            Сравните характеристики разных пород собак
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Первая порода</label>
                <Select value={breed1} onValueChange={setBreed1}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((breed) => (
                      <SelectItem key={breed.id} value={breed.id}>
                        {breed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Вторая порода</label>
                <Select value={breed2} onValueChange={setBreed2}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((breed) => (
                      <SelectItem key={breed.id} value={breed.id}>
                        {breed.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedBreed1 && selectedBreed2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedBreed1.image}
                    alt={selectedBreed1.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-heading font-bold mb-4">{selectedBreed1.name}</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер:</span>
                        <span className="font-semibold">{selectedBreed1.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Вес:</span>
                        <span className="font-semibold">{selectedBreed1.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Рост:</span>
                        <span className="font-semibold">{selectedBreed1.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Продолжительность жизни:</span>
                        <span className="font-semibold">{selectedBreed1.lifeSpan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Активность:</span>
                        <span className="font-semibold">{selectedBreed1.activityLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Уход:</span>
                        <span className="font-semibold">{selectedBreed1.careLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={selectedBreed2.image}
                    alt={selectedBreed2.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-heading font-bold mb-4">{selectedBreed2.name}</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер:</span>
                        <span className="font-semibold">{selectedBreed2.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Вес:</span>
                        <span className="font-semibold">{selectedBreed2.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Рост:</span>
                        <span className="font-semibold">{selectedBreed2.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Продолжительность жизни:</span>
                        <span className="font-semibold">{selectedBreed2.lifeSpan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Активность:</span>
                        <span className="font-semibold">{selectedBreed2.activityLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Уход:</span>
                        <span className="font-semibold">{selectedBreed2.careLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-heading font-bold mb-6">Сравнение характеристик</h3>
                <div className="space-y-6">
                  {Object.entries(characteristicLabels).map(([key, label]) => {
                    const value1 = selectedBreed1.characteristics[key as keyof typeof selectedBreed1.characteristics];
                    const value2 = selectedBreed2.characteristics[key as keyof typeof selectedBreed2.characteristics];
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{label}</span>
                          <div className="flex gap-4 text-sm">
                            <span className="text-primary font-bold">{value1}/5</span>
                            <span className="text-accent font-bold">{value2}/5</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Progress value={value1 * 20} className="h-3" />
                          <Progress value={value2 * 20} className="h-3" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button asChild>
                  <a href={`/breed/${breed1}`}>
                    <Icon name="Eye" className="mr-2" size={20} />
                    Подробнее о {selectedBreed1.name}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`/breed/${breed2}`}>
                    <Icon name="Eye" className="mr-2" size={20} />
                    Подробнее о {selectedBreed2.name}
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
