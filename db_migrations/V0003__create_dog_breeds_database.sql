CREATE TABLE IF NOT EXISTS breeds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    origin VARCHAR(255),
    size VARCHAR(50) CHECK (size IN ('Маленький', 'Средний', 'Большой', 'Гигантский')),
    temperament TEXT,
    care_level VARCHAR(50) CHECK (care_level IN ('Низкий', 'Средний', 'Высокий')),
    activity_level VARCHAR(50) CHECK (activity_level IN ('Низкая', 'Средняя', 'Высокая', 'Очень высокая')),
    life_span VARCHAR(50),
    weight_range VARCHAR(50),
    height_range VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS breed_photos (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    photo_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    caption TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS breed_characteristics (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    intelligence INTEGER CHECK (intelligence BETWEEN 1 AND 5),
    trainability INTEGER CHECK (trainability BETWEEN 1 AND 5),
    child_friendly INTEGER CHECK (child_friendly BETWEEN 1 AND 5),
    dog_friendly INTEGER CHECK (dog_friendly BETWEEN 1 AND 5),
    shedding INTEGER CHECK (shedding BETWEEN 1 AND 5),
    grooming_needs INTEGER CHECK (grooming_needs BETWEEN 1 AND 5),
    barking_level INTEGER CHECK (barking_level BETWEEN 1 AND 5),
    adaptability INTEGER CHECK (adaptability BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(breed_id)
);

CREATE TABLE IF NOT EXISTS user_reviews (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER NOT NULL REFERENCES breeds(id),
    user_name VARCHAR(255) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_breeds_size ON breeds(size);
CREATE INDEX IF NOT EXISTS idx_breeds_activity ON breeds(activity_level);
CREATE INDEX IF NOT EXISTS idx_breed_photos_breed ON breed_photos(breed_id);
CREATE INDEX IF NOT EXISTS idx_breed_characteristics_breed ON breed_characteristics(breed_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_breed ON user_reviews(breed_id);
CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON user_reviews(rating);