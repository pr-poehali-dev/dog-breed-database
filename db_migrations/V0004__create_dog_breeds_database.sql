-- Таблица пород собак
CREATE TABLE IF NOT EXISTS breeds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    name_en VARCHAR(255),
    origin_country VARCHAR(100),
    size VARCHAR(50) CHECK (size IN ('Маленькая', 'Средняя', 'Большая', 'Гигантская')),
    weight_min INTEGER,
    weight_max INTEGER,
    height_min INTEGER,
    height_max INTEGER,
    lifespan_min INTEGER,
    lifespan_max INTEGER,
    temperament TEXT,
    description TEXT,
    care_level VARCHAR(50) CHECK (care_level IN ('Низкий', 'Средний', 'Высокий')),
    activity_level VARCHAR(50) CHECK (activity_level IN ('Низкая', 'Средняя', 'Высокая', 'Очень высокая')),
    good_with_children BOOLEAN DEFAULT true,
    good_with_pets BOOLEAN DEFAULT true,
    shedding_level VARCHAR(50) CHECK (shedding_level IN ('Минимальная', 'Умеренная', 'Высокая')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица фотографий пород
CREATE TABLE IF NOT EXISTS breed_photos (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    photo_url TEXT NOT NULL,
    caption VARCHAR(500),
    is_primary BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица отзывов и оценок
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица характеристик (для расширенной фильтрации)
CREATE TABLE IF NOT EXISTS breed_characteristics (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    intelligence INTEGER CHECK (intelligence >= 1 AND intelligence <= 5),
    trainability INTEGER CHECK (trainability >= 1 AND trainability <= 5),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
    barking_level INTEGER CHECK (barking_level >= 1 AND barking_level <= 5),
    protectiveness INTEGER CHECK (protectiveness >= 1 AND protectiveness <= 5),
    adaptability INTEGER CHECK (adaptability >= 1 AND adaptability <= 5),
    UNIQUE(breed_id)
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_breeds_size ON breeds(size);
CREATE INDEX IF NOT EXISTS idx_breeds_activity ON breeds(activity_level);
CREATE INDEX IF NOT EXISTS idx_breeds_care ON breeds(care_level);
CREATE INDEX IF NOT EXISTS idx_breed_photos_breed ON breed_photos(breed_id);
CREATE INDEX IF NOT EXISTS idx_reviews_breed ON reviews(breed_id);
CREATE INDEX IF NOT EXISTS idx_characteristics_breed ON breed_characteristics(breed_id);