-- Seed data for development

-- Insert sample companies
INSERT INTO companies (name, logo_url, industry, reputation_score) VALUES
('Google', 'https://logo.clearbit.com/google.com', 'Technology', 4.5),
('Amazon', 'https://logo.clearbit.com/amazon.com', 'E-commerce', 4.2),
('Microsoft', 'https://logo.clearbit.com/microsoft.com', 'Technology', 4.6),
('Meta', 'https://logo.clearbit.com/meta.com', 'Social Media', 4.1),
('Apple', 'https://logo.clearbit.com/apple.com', 'Technology', 4.7),
('Netflix', 'https://logo.clearbit.com/netflix.com', 'Entertainment', 4.3),
('Tesla', 'https://logo.clearbit.com/tesla.com', 'Automotive', 4.0),
('SpaceX', 'https://logo.clearbit.com/spacex.com', 'Aerospace', 4.8);

-- Insert sample professions
INSERT INTO professions (title, category, trending_score) VALUES
('Software Engineer', 'Technology', 95),
('Product Manager', 'Management', 88),
('Data Scientist', 'Technology', 92),
('UX Designer', 'Design', 85),
('DevOps Engineer', 'Technology', 87),
('Marketing Manager', 'Marketing', 78),
('Sales Representative', 'Sales', 75),
('HR Manager', 'Human Resources', 70),
('Financial Analyst', 'Finance', 82),
('Content Writer', 'Marketing', 68);
