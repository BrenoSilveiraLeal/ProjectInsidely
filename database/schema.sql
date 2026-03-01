-- Ñ faço ideia - Database Schema

-- Users table (both professionals and explorers)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('professional', 'explorer')),
    full_name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(500),
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    region VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    linkedin_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    industry VARCHAR(100),
    description TEXT,
    reputation_score DECIMAL(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professions table
CREATE TABLE professions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    trending_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professional profiles
CREATE TABLE professional_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_id INT REFERENCES companies(id),
    profession_id INT REFERENCES professions(id),
    job_title VARCHAR(255) NOT NULL,
    years_experience INT NOT NULL,
    salary_range_min INT,
    salary_range_max INT,
    job_description TEXT,
    work_environment TEXT,
    manager_relationship TEXT,
    daily_tasks TEXT,
    work_life_balance INT CHECK (work_life_balance BETWEEN 1 AND 5),
    pros TEXT,
    cons TEXT,
    price_per_call DECIMAL(10, 2) NOT NULL,
    communication_types VARCHAR(50)[], -- ['chat', 'voice', 'video']
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INT DEFAULT 0,
    total_calls INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Availability schedule
CREATE TABLE availability (
    id SERIAL PRIMARY KEY,
    professional_id INT REFERENCES professional_profiles(id) ON DELETE CASCADE,
    day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    explorer_id INT REFERENCES users(id),
    professional_id INT REFERENCES professional_profiles(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    communication_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    meeting_link VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id),
    explorer_id INT REFERENCES users(id),
    professional_id INT REFERENCES professional_profiles(id),
    amount DECIMAL(10, 2) NOT NULL,
    stripe_payment_id VARCHAR(255) UNIQUE,
    stripe_payment_intent VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_type VARCHAR(50) DEFAULT 'call_booking',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INT UNIQUE REFERENCES bookings(id),
    explorer_id INT REFERENCES users(id),
    professional_id INT REFERENCES professional_profiles(id),
    honesty_rating INT CHECK (honesty_rating BETWEEN 1 AND 5),
    helpfulness_rating INT CHECK (helpfulness_rating BETWEEN 1 AND 5),
    accuracy_rating INT CHECK (accuracy_rating BETWEEN 1 AND 5),
    overall_rating DECIMAL(3, 2),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    receiver_id INT REFERENCES users(id),
    booking_id INT REFERENCES bookings(id),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved professionals (favorites)
CREATE TABLE saved_professionals (
    id SERIAL PRIMARY KEY,
    explorer_id INT REFERENCES users(id),
    professional_id INT REFERENCES professional_profiles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(explorer_id, professional_id)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_location ON users(location_lat, location_lng);
CREATE INDEX idx_professional_profiles_company ON professional_profiles(company_id);
CREATE INDEX idx_professional_profiles_profession ON professional_profiles(profession_id);
CREATE INDEX idx_professional_profiles_rating ON professional_profiles(average_rating);
CREATE INDEX idx_bookings_dates ON bookings(booking_date, start_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_messages_users ON messages(sender_id, receiver_id);
CREATE INDEX idx_reviews_professional ON reviews(professional_id);

-- Trigger to update average rating
CREATE OR REPLACE FUNCTION update_professional_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE professional_profiles
    SET average_rating = (
        SELECT AVG(overall_rating)
        FROM reviews
        WHERE professional_id = NEW.professional_id
    ),
    total_reviews = (
        SELECT COUNT(*)
        FROM reviews
        WHERE professional_id = NEW.professional_id
    )
    WHERE id = NEW.professional_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_professional_rating();

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_professional_profiles_updated_at
BEFORE UPDATE ON professional_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
