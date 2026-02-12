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
('Diana Prince', 'd.prince@outlook.com', 'Derecho'),
('Peter Parker', 'p.parker@dailybugle.com', 'Sistemas'),
('Clark Kent', 'c.kent@dailyplanet.com', 'Derecho'),
('Bruce Wayne', 'b.wayne@wayne.ent', 'Mecatrónica'),
('Selina Kyle', 's.kyle@cat.com', 'Historia'),
('Barry Allen', 'b.allen@starlabs.com', 'Sistemas'),
('Hal Jordan', 'h.jordan@ferris.com', 'Mecatrónica'),
('Arthur Curry', 'a.curry@atlantis.gov', 'Historia'),
('Victor Stone', 'v.stone@cyborg.tech', 'Sistemas'),
('Wanda Maximoff', 'w.maximoff@avengers.org', 'Derecho'),
('Steve Rogers', 's.rogers@shield.gov', 'Historia'),
('Natasha Romanoff', 'n.romanoff@blackwidow.com', 'Derecho'),
('Tony Stark', 't.stark@stark.ind', 'Mecatrónica'),
('Sam Wilson', 's.wilson@falcon.gov', 'Historia'),
('Bucky Barnes', 'b.barnes@winter.com', 'Sistemas'),
('Clint Barton', 'c.barton@hawkeye.com', 'Mecatrónica'),
('Scott Lang', 's.lang@antman.com', 'Sistemas'),
('Hope Pym', 'h.pym@wasp.com', 'Mecatrónica'),
('Carol Danvers', 'c.danvers@marvel.com', 'Sistemas'),
('TChalla Udaku', 't.challa@wakanda.af', 'Mecatrónica'),
('Shuri Udaku', 's.shuri@wakanda.af', 'Sistemas'),
('Thor Odinson', 't.thor@asgard.com', 'Historia'),
('Loki Laufeyson', 'l.loki@asgard.com', 'Derecho'),
('Erik Lehnsherr', 'e.magneto@xmen.com', 'Mecatrónica'),
('Charles Xavier', 'c.xavier@xmen.com', 'Derecho'),
('Jean Grey', 'j.grey@phoenix.com', 'Sistemas'),
('Logan Howlett', 'l.logan@wolverine.ca', 'Historia'),
('Ororo Munroe', 'o.storm@weather.com', 'Mecatrónica'),
('Scott Summers', 's.cyclops@xmen.com', 'Sistemas'),
('Remy LeBeau', 'r.gambit@cajun.com', 'Historia'),
('Anna Marie', 'a.rogue@xmen.com', 'Derecho');

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
SELECT id, 1 FROM students WHERE id <= 25;

INSERT INTO enrollments (student_id, group_id) 
SELECT id, 3 FROM students WHERE id BETWEEN 26 AND 50;

INSERT INTO grades (enrollment_id, partial1, partial2, final_grade) 
SELECT id, 
       (RANDOM() * 10), 
       (RANDOM() * 10), 
       (RANDOM() * 5 + 4)
FROM enrollments; 

UPDATE grades SET final_grade = 5.2 WHERE enrollment_id IN (1, 5, 12, 18, 22, 30, 35, 42);

INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-01', (RANDOM() > 0.15) FROM enrollments;

INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-02', (RANDOM() > 0.20) FROM enrollments;

INSERT INTO attendance (enrollment_id, date, present)
SELECT id, '2024-03-03', (RANDOM() > 0.10) FROM enrollments;

UPDATE attendance SET present = FALSE WHERE enrollment_id IN (8, 15, 27, 33, 48);