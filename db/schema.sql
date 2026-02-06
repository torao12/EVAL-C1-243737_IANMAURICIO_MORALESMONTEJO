CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    program VARCHAR(50) NOT NULL,
    enrollment_year INT DEFAULT 2024
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10),
    name VARCHAR(100) NOT NULL,
    credits INT CHECK (credits > 0)
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id),
    teacher_id INT REFERENCES teachers(id),
    term VARCHAR(10) NOT NULL
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    group_id INT REFERENCES groups(id),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, group_id)
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(id) ON DELETE CASCADE,
    partial1 DECIMAL(4,2) DEFAULT 0 CHECK (partial1 >= 0 AND partial1 <= 10),
    partial2 DECIMAL(4,2) DEFAULT 0 CHECK (partial2 >= 0 AND partial2 <= 10),
    final_grade DECIMAL(4,2) DEFAULT 0 CHECK (final_grade >= 0 AND final_grade <= 10)
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    present BOOLEAN NOT NULL DEFAULT FALSE
);