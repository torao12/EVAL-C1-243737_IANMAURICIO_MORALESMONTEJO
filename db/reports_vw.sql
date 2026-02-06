CREATE OR REPLACE VIEW vw_course_performance AS
SELECT 
    c.name AS course_name,
    g.term,
    COUNT(e.id) AS total_students,
    ROUND(AVG(gr.final_grade)::numeric, 2) AS average_grade,
    SUM(CASE WHEN gr.final_grade < 6 THEN 1 ELSE 0 END) AS failed_students 
FROM courses c
JOIN groups g ON c.id = g.course_id
JOIN enrollments e ON g.id = e.group_id
LEFT JOIN grades gr ON e.id = gr.enrollment_id
GROUP BY c.name, g.term;
ALTER VIEW vw_course_performance OWNER TO app_user;

CREATE OR REPLACE VIEW vw_teacher_load AS
SELECT 
    t.name AS teacher_name,
    g.term,
    COUNT(DISTINCT g.id) AS total_groups,
    COUNT(e.id) AS total_students
FROM teachers t
JOIN groups g ON t.id = g.teacher_id
LEFT JOIN enrollments e ON g.id = e.group_id
GROUP BY t.name, g.term
HAVING COUNT(e.id) > 0;
ALTER VIEW vw_teacher_load OWNER TO app_user;

CREATE OR REPLACE VIEW vw_students_at_risk AS
WITH student_stats AS (
    SELECT 
        s.id,
        s.name,
        s.email,
        AVG(gr.final_grade)::numeric as average_grade, 
        COUNT(CASE WHEN a.present = FALSE THEN 1 END) as total_absences 
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    LEFT JOIN grades gr ON e.id = gr.enrollment_id
    LEFT JOIN attendance a ON e.id = a.enrollment_id
    GROUP BY s.id, s.name, s.email
)
SELECT * FROM student_stats 
WHERE average_grade < 7 OR total_absences > 3;
ALTER VIEW vw_students_at_risk OWNER TO app_user;

CREATE OR REPLACE VIEW vw_attendance_by_group AS
SELECT 
    g.id AS group_id,
    c.name AS course_name,
    COALESCE(AVG(CASE WHEN a.present THEN 100 ELSE 0 END), 0) AS attendance_rate 
FROM groups g
JOIN courses c ON g.course_id = c.id
LEFT JOIN enrollments e ON g.id = e.group_id
LEFT JOIN attendance a ON e.id = a.enrollment_id
GROUP BY g.id, c.name;
ALTER VIEW vw_attendance_by_group OWNER TO app_user;

CREATE OR REPLACE VIEW vw_rank_students AS
SELECT 
    s.name AS student_name,
    s.program,
    g.term,
    gr.final_grade,
    RANK() OVER (PARTITION BY s.program, g.term ORDER BY gr.final_grade DESC) AS position 
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN groups g ON e.group_id = g.id
JOIN grades gr ON e.id = gr.enrollment_id;
ALTER VIEW vw_rank_students OWNER TO app_user;