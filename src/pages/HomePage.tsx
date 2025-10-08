import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function HomePage() {
  const popularBreeds = [
    {
      id: 1,
      name: 'Лабрадор ретривер',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
      size: 'Большой',
      temperament: 'Дружелюбный',
    },
    {
      id: 2,
      name: 'Немецкая овчарка',
      image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400',
      size: 'Большой',
      temperament: 'Умный',
    },
    {
      id: 3,
      name: 'Золотистый ретривер',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400',
      size: 'Большой',
      temperament: 'Ласковый',
    },
  ];

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
            {popularBreeds.map((breed) => (
              <Link
                key={breed.id}
                to={`/breed/${breed.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                      {breed.name}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {breed.size}
                      </span>
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                        {breed.temperament}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
