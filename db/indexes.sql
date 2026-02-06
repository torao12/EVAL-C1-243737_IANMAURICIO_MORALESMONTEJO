CREATE INDEX idx_students_search ON students(name, email);
CREATE INDEX idx_enrollments_group ON enrollments(group_id);
CREATE INDEX idx_groups_term ON groups(term);