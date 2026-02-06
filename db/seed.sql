INSERT INTO teachers (name, email) VALUES
('Dr. Armando Bronca', 'armando.b@campus.edu'),
('Dra. Elena Nito', 'elena.n@campus.edu'),
('Ing. Alan Brito', 'alan.b@campus.edu'),
('Lic. Zoila Cerda', 'zoila.c@campus.edu'),
('Mtro. Aquiles Brinco', 'aquiles.b@campus.edu'),
('Dra. Debora Dora', 'debora.d@campus.edu'),
('Ing. Elvia Rosas', 'elvia.r@campus.edu'),
('Lic. Mario Neta', 'mario.n@campus.edu'),
('Mtra. Lola Mento', 'lola.m@campus.edu'),
('Dr. Esteban Dido', 'esteban.d@campus.edu');

INSERT INTO students (name, email, program) VALUES
('Juan Pérez', 'juan.p@gmail.com', 'Sistemas'),
('María García', 'm.garcia@outlook.com', 'Sistemas'),
('Carlos López', 'c.lopez@gmail.com', 'Mecatrónica'),
('Ana Martínez', 'ana.mtz@yahoo.com', 'Mecatrónica'),
('Luis Rodríguez', 'luis.rod@campus.edu', 'Derecho'),
('Sofía Hernández', 'sofia.h@gmail.com', 'Derecho'),
('Diego Flores', 'd.flores@campus.edu', 'Historia'),
('Lucía Morales', 'l.morales@gmail.com', 'Sistemas'),
('Javier Ortiz', 'j.ortiz@outlook.com', 'Mecatrónica'),
('Elena Vargas', 'e.vargas@gmail.com', 'Derecho'),
('Roberto Ruiz', 'r.ruiz@campus.edu', 'Historia'),
('Carmen Soria', 'c.soria@gmail.com', 'Sistemas'),
('Oscar Mena', 'o.mena@outlook.com', 'Mecatrónica'),
('Paola Ríos', 'p.rios@gmail.com', 'Derecho'),
('Hugo Castro', 'h.castro@campus.edu', 'Historia'),
('Sara Peña', 's.pena@gmail.com', 'Sistemas'),
('Raúl Silva', 'r.silva@outlook.com', 'Mecatrónica'),
('Julia León', 'j.leon@gmail.com', 'Derecho'),
('Bruno Díaz', 'b.diaz@campus.edu', 'Sistemas'),
('Diana Prince', 'd.prince@outlook.com', 'Derecho');

INSERT INTO courses (name, credits) VALUES
('Bases de Datos I', 5),
('Programación Web', 6),
('Cálculo Integral', 4),
('Derecho Romano', 3),
('Historia de México', 3),
('Circuitos Lógicos', 5),
('Ética Profesional', 2),
('Inteligencia Artificial', 6);

INSERT INTO groups (course_id, teacher_id, term) VALUES
(1, 1, '2024-1'), (1, 1, '2024-2'),
(2, 3, '2024-1'), (2, 7, '2024-2'),
(3, 5, '2024-1'), (4, 4, '2024-1'),
(5, 9, '2024-2'), (6, 3, '2024-1'),
(7, 2, '2024-1'), (8, 10, '2024-2');

INSERT INTO enrollments (student_id, group_id) 
SELECT id, 1 FROM students WHERE id <= 10;

INSERT INTO enrollments (student_id, group_id) 
SELECT id, 3 FROM students WHERE id BETWEEN 5 AND 15;

INSERT INTO grades (enrollment_id, partial1, partial2, final_grade) 
SELECT id, (RANDOM() * 10), (RANDOM() * 10), (RANDOM() * 5 + 5) FROM enrollments; 

UPDATE grades SET final_grade = 5.2 WHERE enrollment_id IN (1, 5, 12);

INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-01', (RANDOM() > 0.2) FROM enrollments;
INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-02', (RANDOM() > 0.2) FROM enrollments;
INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-03', (RANDOM() > 0.2) FROM enrollments;

UPDATE attendance SET present = FALSE WHERE enrollment_id = 8;