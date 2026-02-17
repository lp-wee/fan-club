-- Create enum types
CREATE TYPE user_role AS ENUM ('job_seeker', 'employer', 'admin');
CREATE TYPE application_status AS ENUM ('pending', 'reviewing', 'accepted', 'rejected');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'freelance', 'internship');
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'lead');

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'job_seeker',
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo VARCHAR(255),
  website VARCHAR(255),
  location VARCHAR(255),
  industry VARCHAR(100),
  employee_count INT,
  rating DECIMAL(3,1) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Job Seekers table
CREATE TABLE job_seekers (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  title VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  experience_years INT,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Vacancies table
CREATE TABLE vacancies (
  id SERIAL PRIMARY KEY,
  company_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  salary_min INT,
  salary_max INT,
  currency VARCHAR(3) DEFAULT 'USD',
  employment_type employment_type NOT NULL,
  experience_level experience_level NOT NULL,
  location VARCHAR(255),
  industry VARCHAR(100),
  skills_required TEXT[] DEFAULT '{}',
  applications_count INT DEFAULT 0,
  views_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

-- Resumes table
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  job_seeker_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(id) ON DELETE CASCADE
);

-- Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  vacancy_id INT NOT NULL,
  job_seeker_id INT NOT NULL,
  resume_id INT,
  status application_status DEFAULT 'pending',
  cover_letter TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE,
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(id) ON DELETE CASCADE,
  FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL
);

-- Saved Jobs table
CREATE TABLE saved_jobs (
  id SERIAL PRIMARY KEY,
  job_seeker_id INT NOT NULL,
  vacancy_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(id) ON DELETE CASCADE,
  FOREIGN KEY (vacancy_id) REFERENCES vacancies(id) ON DELETE CASCADE,
  UNIQUE(job_seeker_id, vacancy_id)
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  title VARCHAR(255),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  company_id INT,
  job_seeker_id INT,
  reviewer_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vacancies_company_id ON vacancies(company_id);
CREATE INDEX idx_vacancies_is_active ON vacancies(is_active);
CREATE INDEX idx_applications_vacancy_id ON applications(vacancy_id);
CREATE INDEX idx_applications_job_seeker_id ON applications(job_seeker_id);
CREATE INDEX idx_saved_jobs_job_seeker_id ON saved_jobs(job_seeker_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_job_seekers_user_id ON job_seekers(user_id);
