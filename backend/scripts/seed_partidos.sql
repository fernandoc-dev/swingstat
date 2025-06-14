-- docker compose exec db psql -U swingstat -d swingstat -f /app/scripts/seed_partidos.sql

-- Partidos para Liga Canaria de Softball 2024 (ID: 1)
INSERT INTO partidos (torneo_id, equipo_local_id, equipo_visitante_id, fecha, ubicacion, resultado_local, resultado_visitante, observaciones) VALUES
-- Partidos con resultados
(1, 1, 2, '2024-03-02 16:00:00', 'Complejo Deportivo Insular de Tenerife', 5, 3, 'Partido inaugural de la temporada'),
(1, 3, 4, '2024-03-09 16:00:00', 'Complejo Deportivo Insular de Tenerife', 2, 4, 'Victoria contundente de los Halcones'),
(1, 5, 6, '2024-03-16 16:00:00', 'Estadio Municipal de Las Palmas', 3, 3, 'Empate en tiempo extra'),
(1, 7, 8, '2024-03-23 16:00:00', 'Estadio Municipal de Las Palmas', 4, 1, 'Dominio local'),
(1, 9, 10, '2024-03-30 16:00:00', 'Complejo Deportivo de Fuerteventura', 2, 5, 'Sorpresa visitante'),
(1, 2, 3, '2024-04-06 16:00:00', 'Complejo Deportivo Insular de Tenerife', 2, 1, 'Partido muy disputado'),
(1, 4, 5, '2024-04-13 16:00:00', 'Complejo Deportivo Insular de Tenerife', 3, 2, 'Lucha por el liderato'),
(1, 6, 7, '2024-04-20 16:00:00', 'Estadio Municipal de Las Palmas', 1, 4, 'Clásico regional'),
(1, 8, 9, '2024-04-27 16:00:00', 'Estadio Municipal de Las Palmas', 3, 2, 'Partido de media tabla'),
(1, 10, 1, '2024-05-04 16:00:00', 'Complejo Deportivo de Fuerteventura', 2, 3, 'Última jornada de la primera vuelta');

-- Partidos para Copa Interinsular de Softball (ID: 2)
INSERT INTO partidos (torneo_id, equipo_local_id, equipo_visitante_id, fecha, ubicacion, resultado_local, resultado_visitante, observaciones) VALUES
-- Partidos con resultados
(2, 1, 5, '2024-04-16 17:00:00', 'Complejo Deportivo Insular de Tenerife', 4, 2, 'Victoria local en octavos'),
(2, 2, 6, '2024-04-17 17:00:00', 'Complejo Deportivo Insular de Tenerife', 1, 3, 'Sorpresa en octavos'),
(2, 3, 7, '2024-04-18 17:00:00', 'Estadio Municipal de Las Palmas', 2, 2, 'Empate en cuartos, definición por penales'),
(2, 4, 8, '2024-04-19 17:00:00', 'Estadio Municipal de Las Palmas', 3, 1, 'Victoria contundente en cuartos'),
(2, 5, 3, '2024-04-23 17:00:00', 'Complejo Deportivo Insular de Tenerife', 2, 1, 'Semifinal 1'),
(2, 6, 4, '2024-04-24 17:00:00', 'Estadio Municipal de Las Palmas', 1, 2, 'Semifinal 2'),
(2, 3, 4, '2024-04-30 17:00:00', 'Complejo Deportivo Insular de Tenerife', 3, 2, 'Final de la Copa'),
(2, 1, 2, '2024-05-01 17:00:00', 'Estadio Municipal de Las Palmas', 2, 1, 'Partido de consolación'),
(2, 5, 6, '2024-05-02 17:00:00', 'Complejo Deportivo de Fuerteventura', 4, 3, 'Partido amistoso'),
(2, 7, 8, '2024-05-03 17:00:00', 'Complejo Deportivo de La Palma', 1, 1, 'Partido de exhibición'); 