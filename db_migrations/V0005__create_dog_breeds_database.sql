-- Создание таблицы пород собак
CREATE TABLE IF NOT EXISTS breeds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255),
    size VARCHAR(50) CHECK (size IN ('Маленькая', 'Средняя', 'Большая', 'Гигантская')),
    temperament TEXT,
    care_level VARCHAR(50) CHECK (care_level IN ('Низкий', 'Средний', 'Высокий')),
    activity_level VARCHAR(50) CHECK (activity_level IN ('Низкая', 'Средняя', 'Высокая', 'Очень высокая')),
    lifespan VARCHAR(50),
    weight_range VARCHAR(100),
    height_range VARCHAR(100),
    description TEXT,
    main_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы фотографий пород
CREATE TABLE IF NOT EXISTS breed_photos (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    photo_url TEXT NOT NULL,
    caption TEXT,
    is_main BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы характеристик пород
CREATE TABLE IF NOT EXISTS breed_characteristics (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    characteristic_name VARCHAR(255) NOT NULL,
    characteristic_value INTEGER CHECK (characteristic_value BETWEEN 1 AND 5),
    UNIQUE(breed_id, characteristic_name)
);

-- Создание таблицы отзывов пользователей
CREATE TABLE IF NOT EXISTS breed_reviews (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации поиска
CREATE INDEX IF NOT EXISTS idx_breeds_size ON breeds(size);
CREATE INDEX IF NOT EXISTS idx_breeds_activity ON breeds(activity_level);
CREATE INDEX IF NOT EXISTS idx_breeds_care ON breeds(care_level);
CREATE INDEX IF NOT EXISTS idx_breed_photos_breed_id ON breed_photos(breed_id);
CREATE INDEX IF NOT EXISTS idx_breed_characteristics_breed_id ON breed_characteristics(breed_id);
CREATE INDEX IF NOT EXISTS idx_breed_reviews_breed_id ON breed_reviews(breed_id);