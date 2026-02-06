ALTER TABLE students 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';

CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);

UPDATE students 
SET status = 'pending' 
WHERE id NOT IN (SELECT student_id FROM enrollments);