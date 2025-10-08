import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary via-accent to-secondary py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-center">
            О проекте
          </h1>
          <p className="text-xl text-center text-white/90">
            Энциклопедия пород собак для любителей четвероногих друзей
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-3xl font-heading font-bold mb-6">Наша миссия</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Мы создали этот портал, чтобы помочь людям найти идеальную породу собак для их образа
              жизни. Наша миссия — предоставить полную, достоверную и актуальную информацию о
              различных породах собак, чтобы будущие владельцы могли принять осознанное решение.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы верим, что каждая собака заслуживает любящего дома, а каждая семья — идеального
              четвероногого друга. Правильный выбор породы — это первый шаг к долгим годам счастья
              и дружбы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-2xl p-6 shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Database" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">300+</h3>
              <p className="text-muted-foreground">Пород собак в базе</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Users" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">5000+</h3>
              <p className="text-muted-foreground">Отзывов владельцев</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                <Icon name="Image" size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">10000+</h3>
              <p className="text-muted-foreground">Фотографий пород</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-3xl font-heading font-bold mb-6">Что мы предлагаем</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Детальные профили пород</h4>
                  <p className="text-muted-foreground">
                    Полная информация о каждой породе: история, характер, здоровье, уход
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Умный поиск</h4>
                  <p className="text-muted-foreground">
                    Найдите породу по размеру, темпераменту, уровню активности и другим параметрам
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Сравнение пород</h4>
                  <p className="text-muted-foreground">
                    Сравните до двух пород одновременно по всем характеристикам
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Отзывы владельцев</h4>
                  <p className="text-muted-foreground">
                    Реальный опыт от людей, которые уже живут с этими породами
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-heading font-bold mb-4">Присоединяйтесь к нам!</h2>
            <p className="text-lg mb-6 text-white/90">
              Поделитесь своим опытом и помогите другим найти идеального питомца
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-semibold transition-colors">
                Написать отзыв
              </button>
              <button className="bg-white/10 border-2 border-white text-white hover:bg-white/20 px-8 py-3 rounded-lg font-semibold transition-colors">
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
