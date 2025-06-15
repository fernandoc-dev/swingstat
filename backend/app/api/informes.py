from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Dict, Any
from app.db.base import get_db

router = APIRouter(prefix="/informes", tags=["Informes"])


@router.post("/", response_model=List[Dict[str, Any]])
def generar_informe(
    filtros: Dict[str, Any] = Body(...),
    db: Session = Depends(get_db)
):
    # Construcción dinámica de la consulta SQL acumulativa
    select_fields = [
        "j.id as jugador_id",
        "j.nombre as jugador_nombre",
        "j.apellido as jugador_apellido",
        "e.nombre as equipo_nombre",
        "SUM(est.turnos_bateo) as turnos_bateo",
        "SUM(est.hits) as hits",
        "SUM(est.dobles) as dobles",
        "SUM(est.triples) as triples",
        "SUM(est.home_runs) as home_runs",
        "SUM(est.carreras_anotadas) as carreras_anotadas",
        "SUM(est.carreras_impulsadas) as carreras_impulsadas",
        "SUM(est.bases_por_bola) as bases_por_bola",
        "SUM(est.ponches) as ponches"
    ]
    sql = f"""
        SELECT {', '.join(select_fields)}
        FROM estadisticas est
        JOIN jugadores j ON est.jugador_id = j.id
        LEFT JOIN equipos e ON j.equipo_id = e.id
        JOIN partidos p ON est.partido_id = p.id
        JOIN torneos t ON p.torneo_id = t.id
    """
    where_clauses = []
    params = {}

    # Filtros dinámicos
    if filtros.get("jugador_ids"):
        where_clauses.append("j.id = ANY(:jugador_ids)")
        params["jugador_ids"] = filtros["jugador_ids"]
    if filtros.get("equipo_ids"):
        where_clauses.append("e.id = ANY(:equipo_ids)")
        params["equipo_ids"] = filtros["equipo_ids"]
    if filtros.get("torneo_ids"):
        where_clauses.append("t.id = ANY(:torneo_ids)")
        params["torneo_ids"] = filtros["torneo_ids"]
    if filtros.get("fecha_inicio"):
        where_clauses.append("p.fecha >= :fecha_inicio")
        params["fecha_inicio"] = filtros["fecha_inicio"]
    if filtros.get("fecha_fin"):
        where_clauses.append("p.fecha <= :fecha_fin")
        params["fecha_fin"] = filtros["fecha_fin"]

    if where_clauses:
        sql += " WHERE " + " AND ".join(where_clauses)

    sql += " GROUP BY j.id, j.nombre, j.apellido, e.nombre"

    # Ordenamiento por métrica acumulada
    metrica = filtros.get("metrica", "home_runs")
    if metrica not in [
        "turnos_bateo", "hits", "dobles", "triples", "home_runs", "carreras_anotadas", "carreras_impulsadas", "bases_por_bola", "ponches", "promedio_bateo"
    ]:
        metrica = "home_runs"
    if metrica == "promedio_bateo":
        sql += " ORDER BY (CASE WHEN SUM(est.turnos_bateo) > 0 THEN SUM(est.hits)::float / SUM(est.turnos_bateo) ELSE 0 END) DESC"
    else:
        sql += f" ORDER BY SUM(est.{metrica}) DESC"

    result = db.execute(text(sql), params)
    rows = result.fetchall()
    keys = result.keys()
    # Calcular promedio de bateo acumulado
    resultados = []
    for row in rows:
        row_dict = dict(zip(keys, row))
        turnos = row_dict.get("turnos_bateo") or 0
        hits = row_dict.get("hits") or 0
        row_dict["promedio_bateo"] = round(
            hits / turnos, 3) if turnos > 0 else 0.0
        resultados.append(row_dict)
    return resultados
