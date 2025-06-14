-- docker compose exec db psql -U swingstat -d swingstat -f /app/scripts/seed_estadisticas.sql

-- Estadísticas del Partido 1: Leones del Teide (5) vs Tigres del Sur (3)
-- Jugadores Leones del Teide (ID: 1)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(1, 1, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(2, 1, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Excelente trabajo defensivo'),
-- Infielders
(3, 1, 4, 1, 1, 0, 0, 1, 1, 1, 1, 0.250, 'Doble importante en el 3er inning'),
(4, 1, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(5, 1, 4, 2, 0, 0, 0, 1, 1, 0, 0, 0.500, 'Dos hits importantes'),
-- Outfielders
(6, 1, 3, 1, 0, 0, 0, 0, 1, 1, 1, 0.333, 'Buen trabajo en el jardín'),
(7, 1, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0.250, 'Carrera anotada en el 7mo inning'),
(8, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Designated Hitter
(9, 1, 4, 2, 0, 0, 1, 1, 1, 0, 1, 0.500, 'Home run en el 5to inning'),
-- Pitcher
(10, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Tigres del Sur (ID: 2)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(11, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(12, 1, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 4to inning'),
-- Infielders
(13, 1, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(14, 1, 4, 2, 1, 0, 0, 1, 1, 0, 1, 0.500, 'Doble importante en el 6to inning'),
(15, 1, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(16, 1, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0.250, 'Carrera anotada en el 2do inning'),
(17, 1, 3, 1, 0, 0, 0, 0, 1, 1, 1, 0.333, 'Buen trabajo en el jardín'),
(18, 1, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Día difícil en el plato'),
-- Designated Hitter
(19, 1, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(20, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Estadísticas del Partido 2: Águilas del Norte (2) vs Halcones de Güímar (4)
-- Jugadores Águilas del Norte (ID: 3)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(21, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(22, 2, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 3er inning'),
-- Infielders
(23, 2, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(24, 2, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Día difícil en el plato'),
(25, 2, 3, 1, 0, 0, 0, 1, 0, 0, 1, 0.333, 'Carrera anotada en el 5to inning'),
-- Outfielders
(26, 2, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(27, 2, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(28, 2, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 7mo inning'),
-- Designated Hitter
(29, 2, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Día difícil en el plato'),
-- Pitcher
(30, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Halcones de Güímar (ID: 4)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(31, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Excelente trabajo en el montículo'),
-- Catcher
(32, 2, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Carrera importante en el 2do inning'),
-- Infielders
(33, 2, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(34, 2, 4, 2, 1, 0, 0, 1, 1, 0, 1, 0.500, 'Doble importante en el 4to inning'),
(35, 2, 3, 1, 0, 0, 0, 1, 1, 0, 1, 0.333, 'Carrera anotada en el 6to inning'),
-- Outfielders
(36, 2, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(37, 2, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(38, 2, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 8vo inning'),
-- Designated Hitter
(39, 2, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(40, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Estadísticas del Partido 3: Estrellas de Las Palmas (3) vs Diamantes del Sur (3)
-- Jugadores Estrellas de Las Palmas (ID: 5)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(41, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(42, 3, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 2do inning'),
-- Infielders
(43, 3, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Carrera anotada en el 4to inning'),
(44, 3, 4, 2, 1, 0, 0, 1, 1, 0, 1, 0.500, 'Doble importante en el 6to inning'),
(45, 3, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(46, 3, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0.250, 'Carrera anotada en el 8vo inning'),
(47, 3, 3, 1, 0, 0, 0, 0, 1, 1, 1, 0.333, 'Buen trabajo en el jardín'),
(48, 3, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Buen trabajo defensivo'),
-- Designated Hitter
(49, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Hit importante en el 9no inning'),
-- Pitcher
(50, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Diamantes del Sur (ID: 6)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(51, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Excelente trabajo en el montículo'),
-- Catcher
(52, 3, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Carrera importante en el 3er inning'),
-- Infielders
(53, 3, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(54, 3, 4, 1, 0, 0, 0, 1, 1, 0, 2, 0.250, 'Carrera anotada en el 5to inning'),
(55, 3, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(56, 3, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(57, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Hit importante en el 7mo inning'),
(58, 3, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0.250, 'Carrera anotada en el 9no inning'),
-- Designated Hitter
(59, 3, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(60, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Estadísticas del Partido 4: Rayos del Norte (4) vs Pequeños Campeones (1)
-- Jugadores Rayos del Norte (ID: 7)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(61, 4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Excelente trabajo en el montículo'),
-- Catcher
(62, 4, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Carrera importante en el 1er inning'),
-- Infielders
(63, 4, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(64, 4, 4, 2, 1, 0, 0, 1, 1, 0, 1, 0.500, 'Doble importante en el 3er inning'),
(65, 4, 3, 1, 0, 0, 0, 1, 1, 0, 1, 0.333, 'Carrera anotada en el 5to inning'),
-- Outfielders
(66, 4, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(67, 4, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(68, 4, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 7mo inning'),
-- Designated Hitter
(69, 4, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(70, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Pequeños Campeones (ID: 8)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(71, 4, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(72, 4, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 4to inning'),
-- Infielders
(73, 4, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(74, 4, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Día difícil en el plato'),
(75, 4, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(76, 4, 4, 1, 0, 0, 0, 0, 0, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(77, 4, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(78, 4, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 6to inning'),
-- Designated Hitter
(79, 4, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Día difícil en el plato'),
-- Pitcher
(80, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Estadísticas del Partido 5: Estrellitas del Sur (2) vs Futuros Talentos (5)
-- Jugadores Estrellitas del Sur (ID: 9)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(81, 5, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(82, 5, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 2do inning'),
-- Infielders
(83, 5, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(84, 5, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Día difícil en el plato'),
(85, 5, 3, 1, 0, 0, 0, 1, 0, 0, 1, 0.333, 'Carrera anotada en el 4to inning'),
-- Outfielders
(86, 5, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(87, 5, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(88, 5, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 6to inning'),
-- Designated Hitter
(89, 5, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Día difícil en el plato'),
-- Pitcher
(90, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Futuros Talentos (ID: 10)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(91, 5, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Excelente trabajo en el montículo'),
-- Catcher
(92, 5, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Carrera importante en el 1er inning'),
-- Infielders
(93, 5, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(94, 5, 4, 2, 1, 0, 0, 1, 1, 0, 1, 0.500, 'Doble importante en el 3er inning'),
(95, 5, 3, 1, 0, 0, 0, 1, 1, 0, 1, 0.333, 'Carrera anotada en el 5to inning'),
-- Outfielders
(96, 5, 4, 1, 0, 0, 0, 1, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(97, 5, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Carrera anotada en el 7mo inning'),
(98, 5, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Buen trabajo defensivo'),
-- Designated Hitter
(99, 5, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(100, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Estadísticas del Partido 6: Leones del Teide (3) vs Águilas del Norte (2)
-- Jugadores Leones del Teide (ID: 1)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(1, 6, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Excelente trabajo en el montículo'),
-- Catcher
(2, 6, 4, 2, 0, 0, 0, 1, 1, 0, 1, 0.500, 'Carrera importante en el 1er inning'),
-- Infielders
(3, 6, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(4, 6, 4, 1, 0, 0, 0, 1, 1, 0, 2, 0.250, 'Carrera anotada en el 3er inning'),
(5, 6, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(6, 6, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(7, 6, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Hit importante en el 5to inning'),
(8, 6, 4, 0, 0, 0, 0, 0, 0, 1, 3, 0.000, 'Buen trabajo defensivo'),
-- Designated Hitter
(9, 6, 3, 1, 0, 0, 0, 0, 0, 1, 1, 0.333, 'Buen trabajo ofensivo'),
-- Pitcher
(10, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó');

-- Jugadores Águilas del Norte (ID: 2)
INSERT INTO estadisticas (jugador_id, partido_id, turnos_bateo, hits, dobles, triples, home_runs, carreras_anotadas, carreras_impulsadas, bases_por_bola, ponches, promedio_bateo, observaciones) VALUES
-- Pitcher
(11, 6, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 'Buen trabajo en el montículo'),
-- Catcher
(12, 6, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Carrera impulsada en el 2do inning'),
-- Infielders
(13, 6, 3, 1, 0, 0, 0, 1, 0, 1, 1, 0.333, 'Buen trabajo defensivo'),
(14, 6, 4, 1, 0, 0, 0, 1, 0, 0, 2, 0.250, 'Carrera anotada en el 4to inning'),
(15, 6, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
-- Outfielders
(16, 6, 4, 1, 0, 0, 0, 0, 1, 0, 2, 0.250, 'Buen trabajo en el jardín'),
(17, 6, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Buen trabajo defensivo'),
(18, 6, 4, 1, 0, 0, 0, 0, 0, 1, 1, 0.250, 'Hit importante en el 6to inning'),
-- Designated Hitter
(19, 6, 3, 0, 0, 0, 0, 0, 0, 1, 2, 0.000, 'Día difícil en el plato'),
-- Pitcher
(20, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 'No bateó'); 