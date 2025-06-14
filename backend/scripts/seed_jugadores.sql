-- docker compose exec db psql -U swingstat -d swingstat -f /app/scripts/seed_jugadores.sql

-- Jugadores para Leones del Teide (ID: 1)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Juan', 'González', '1995-05-15', 'pitcher', 10, 1),
('Carlos', 'Rodríguez', '1996-08-22', 'catcher', 2, 1),
('Miguel', 'Hernández', '1997-03-10', 'infield', 4, 1),
('José', 'Martínez', '1998-11-30', 'infield', 6, 1),
('Antonio', 'López', '1996-07-18', 'infield', 8, 1),
('Francisco', 'García', '1997-09-25', 'outfield', 12, 1),
('Manuel', 'Sánchez', '1998-04-05', 'outfield', 14, 1),
('Pedro', 'Fernández', '1996-12-20', 'outfield', 16, 1),
('Luis', 'Díaz', '1997-06-15', 'designated_hitter', 18, 1),
('Javier', 'Moreno', '1998-02-28', 'pitcher', 20, 1);

-- Jugadores para Tigres del Sur (ID: 2)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('David', 'Pérez', '1995-08-12', 'pitcher', 11, 2),
('Daniel', 'Gómez', '1996-11-25', 'catcher', 3, 2),
('Roberto', 'Sánchez', '1997-04-18', 'infield', 5, 2),
('Alberto', 'Martín', '1998-09-30', 'infield', 7, 2),
('Fernando', 'Jiménez', '1996-01-15', 'infield', 9, 2),
('Ricardo', 'Ruiz', '1997-07-22', 'outfield', 13, 2),
('Sergio', 'Torres', '1998-03-08', 'outfield', 15, 2),
('Eduardo', 'Vargas', '1996-10-17', 'outfield', 17, 2),
('Gabriel', 'Mendoza', '1997-05-24', 'designated_hitter', 19, 2),
('Héctor', 'Castro', '1998-12-01', 'pitcher', 21, 2);

-- Jugadores para Águilas del Norte (ID: 3)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Alejandro', 'Morales', '1995-09-20', 'pitcher', 22, 3),
('Andrés', 'Reyes', '1996-12-15', 'catcher', 24, 3),
('Arturo', 'Soto', '1997-05-28', 'infield', 26, 3),
('Benjamín', 'Cruz', '1998-08-03', 'infield', 28, 3),
('César', 'Ortega', '1996-02-14', 'infield', 30, 3),
('Diego', 'Ramírez', '1997-06-27', 'outfield', 32, 3),
('Efraín', 'Vega', '1998-01-09', 'outfield', 34, 3),
('Felipe', 'Medina', '1996-07-16', 'outfield', 36, 3),
('Gerardo', 'Ríos', '1997-03-23', 'designated_hitter', 38, 3),
('Hugo', 'Méndez', '1998-10-07', 'pitcher', 40, 3);

-- Jugadores para Halcones de Güímar (ID: 4)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Ignacio', 'Paredes', '1995-11-30', 'pitcher', 42, 4),
('Jaime', 'Quiroz', '1996-04-12', 'catcher', 44, 4),
('Jorge', 'Valdez', '1997-09-25', 'infield', 46, 4),
('José Luis', 'Zúñiga', '1998-02-18', 'infield', 48, 4),
('Juan Carlos', 'Yáñez', '1996-08-05', 'infield', 50, 4),
('Julio', 'Ximénez', '1997-12-20', 'outfield', 52, 4),
('Lorenzo', 'Wong', '1998-05-15', 'outfield', 54, 4),
('Marcelo', 'Villanueva', '1996-10-28', 'outfield', 56, 4),
('Nicolás', 'Uribe', '1997-07-03', 'designated_hitter', 58, 4),
('Omar', 'Tapia', '1998-03-17', 'pitcher', 60, 4);

-- Jugadores para Estrellas de Las Palmas (ID: 5)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Pablo', 'Soria', '1995-06-22', 'pitcher', 62, 5),
('Patricio', 'Rojas', '1996-09-14', 'catcher', 64, 5),
('Rafael', 'Ponce', '1997-02-27', 'infield', 66, 5),
('Ramón', 'Núñez', '1998-07-11', 'infield', 68, 5),
('René', 'Molina', '1996-11-24', 'infield', 70, 5),
('Rodrigo', 'López', '1997-04-08', 'outfield', 72, 5),
('Rubén', 'Klein', '1998-10-01', 'outfield', 74, 5),
('Salvador', 'Jara', '1996-05-16', 'outfield', 76, 5),
('Samuel', 'Ibarra', '1997-08-29', 'designated_hitter', 78, 5),
('Santiago', 'Herrera', '1998-01-13', 'pitcher', 80, 5);

-- Jugadores para Diamantes del Sur (ID: 6)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Tomás', 'Guzmán', '1995-03-26', 'pitcher', 82, 6),
('Ulises', 'Fuentes', '1996-06-19', 'catcher', 84, 6),
('Valentín', 'Espinoza', '1997-11-02', 'infield', 86, 6),
('Víctor', 'Díaz', '1998-04-15', 'infield', 88, 6),
('Wilfredo', 'Cortés', '1996-12-28', 'infield', 90, 6),
('Xavier', 'Bustos', '1997-05-11', 'outfield', 92, 6),
('Yahir', 'Aguilar', '1998-09-24', 'outfield', 94, 6),
('Zacarías', 'Acosta', '1996-07-07', 'outfield', 96, 6),
('Abel', 'Zúñiga', '1997-10-20', 'designated_hitter', 98, 6),
('Adrián', 'Yáñez', '1998-02-03', 'pitcher', 1, 6);

-- Jugadores para Rayos del Norte (ID: 7)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Bruno', 'Ximénez', '1995-08-16', 'pitcher', 3, 7),
('Camilo', 'Wong', '1996-11-29', 'catcher', 5, 7),
('Dante', 'Villanueva', '1997-04-12', 'infield', 7, 7),
('Emanuel', 'Uribe', '1998-09-25', 'infield', 9, 7),
('Fabián', 'Tapia', '1996-01-08', 'infield', 11, 7),
('Gael', 'Soria', '1997-06-21', 'outfield', 13, 7),
('Héctor', 'Rojas', '1998-12-04', 'outfield', 15, 7),
('Iván', 'Ponce', '1996-05-17', 'outfield', 17, 7),
('Joaquín', 'Núñez', '1997-10-30', 'designated_hitter', 19, 7),
('Kevin', 'Molina', '1998-03-13', 'pitcher', 21, 7);

-- Jugadores para Pequeños Campeones (ID: 8)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Leonardo', 'López', '1995-07-26', 'pitcher', 23, 8),
('Manuel', 'Klein', '1996-10-09', 'catcher', 25, 8),
('Néstor', 'Jara', '1997-03-22', 'infield', 27, 8),
('Oscar', 'Ibarra', '1998-08-05', 'infield', 29, 8),
('Pablo', 'Herrera', '1996-12-18', 'infield', 31, 8),
('Quirino', 'Guzmán', '1997-05-01', 'outfield', 33, 8),
('Rafael', 'Fuentes', '1998-09-14', 'outfield', 35, 8),
('Salvador', 'Espinoza', '1996-04-27', 'outfield', 37, 8),
('Tomás', 'Díaz', '1997-11-10', 'designated_hitter', 39, 8),
('Ulises', 'Cortés', '1998-06-23', 'pitcher', 41, 8);

-- Jugadores para Estrellitas del Sur (ID: 9)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Valentín', 'Bustos', '1995-09-17', 'pitcher', 43, 9),
('Wilfredo', 'Aguilar', '1996-12-30', 'catcher', 45, 9),
('Xavier', 'Acosta', '1997-05-13', 'infield', 47, 9),
('Yahir', 'Zúñiga', '1998-10-26', 'infield', 49, 9),
('Zacarías', 'Yáñez', '1996-02-09', 'infield', 51, 9),
('Abel', 'Ximénez', '1997-07-22', 'outfield', 53, 9),
('Adrián', 'Wong', '1998-01-05', 'outfield', 55, 9),
('Bruno', 'Villanueva', '1996-08-18', 'outfield', 57, 9),
('Camilo', 'Uribe', '1997-03-31', 'designated_hitter', 59, 9),
('Dante', 'Tapia', '1998-11-14', 'pitcher', 61, 9);

-- Jugadores para Futuros Talentos (ID: 10)
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero, equipo_id) VALUES
('Emanuel', 'Soria', '1995-04-28', 'pitcher', 63, 10),
('Fabián', 'Rojas', '1996-07-11', 'catcher', 65, 10),
('Gael', 'Ponce', '1997-12-24', 'infield', 67, 10),
('Héctor', 'Núñez', '1998-05-07', 'infield', 69, 10),
('Iván', 'Molina', '1996-09-20', 'infield', 71, 10),
('Joaquín', 'López', '1997-02-03', 'outfield', 73, 10),
('Kevin', 'Klein', '1998-08-16', 'outfield', 75, 10),
('Leonardo', 'Jara', '1996-01-29', 'outfield', 77, 10),
('Manuel', 'Ibarra', '1997-06-12', 'designated_hitter', 79, 10),
('Néstor', 'Herrera', '1998-11-25', 'pitcher', 81, 10); 