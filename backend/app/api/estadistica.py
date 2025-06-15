from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Dict, Any
from sqlalchemy import and_

from app.schemas.estadistica import EstadisticaCreate, EstadisticaUpdate, EstadisticaInDB, EstadisticaWithRelations, EstadisticaWithFullRelations
from app.services.estadistica import (
    get_estadistica,
    get_estadisticas,
    create_estadistica,
    update_estadistica,
    delete_estadistica,
)
from app.db.base import get_db
from app.models.estadistica import Estadistica
from app.models.jugador import Jugador
from app.models.partido import Partido

router = APIRouter(prefix="/estadisticas", tags=["Estadisticas"])


@router.get("/", response_model=Dict[str, Any])
def list_estadisticas(
    skip: int = 0,
    limit: int = 100,
    sort: str = 'asc',
    equipo_id: int = None,
    jugador_id: int = None,
    partido_id: int = None,
    fecha: str = None,
    db: Session = Depends(get_db)
):
    total_query = db.query(Estadistica)
    query = db.query(Estadistica)
    if equipo_id:
        total_query = total_query.join(Estadistica.jugador).filter(
            Jugador.equipo_id == equipo_id)
        query = query.join(Estadistica.jugador).filter(
            Jugador.equipo_id == equipo_id)
    if jugador_id:
        total_query = total_query.filter(Estadistica.jugador_id == jugador_id)
        query = query.filter(Estadistica.jugador_id == jugador_id)
    if partido_id:
        total_query = total_query.filter(Estadistica.partido_id == partido_id)
        query = query.filter(Estadistica.partido_id == partido_id)
    if fecha:
        query = query.join(Estadistica.partido).filter(Partido.fecha.cast(
            db.bind.dialect.type_descriptor(Partido.fecha.type)).like(f"{fecha}%"))
        total_query = total_query.join(Estadistica.partido).filter(Partido.fecha.cast(
            db.bind.dialect.type_descriptor(Partido.fecha.type)).like(f"{fecha}%"))
    if sort == 'desc':
        query = query.order_by(Estadistica.id.desc())
    else:
        query = query.order_by(Estadistica.id.asc())
    total = total_query.count()
    estadisticas = (
        query
        .options(
            joinedload(Estadistica.jugador).joinedload(Jugador.equipo),
            joinedload(Estadistica.partido).joinedload(Partido.equipo_local),
            joinedload(Estadistica.partido).joinedload(
                Partido.equipo_visitante)
        )
        .offset(skip)
        .limit(limit)
        .all()
    )
    items = [EstadisticaWithFullRelations.model_validate(
        e, from_attributes=True) for e in estadisticas]
    return {"items": items, "total": total}


@router.get("/{estadistica_id}", response_model=EstadisticaInDB)
def read_estadistica(estadistica_id: int, db: Session = Depends(get_db)):
    estadistica = get_estadistica(db, estadistica_id)
    if not estadistica:
        raise HTTPException(
            status_code=404, detail="Estadistica no encontrada")
    return estadistica


@router.post("/", response_model=EstadisticaInDB, status_code=status.HTTP_201_CREATED)
def create_estadistica_view(estadistica_in: EstadisticaCreate, db: Session = Depends(get_db)):
    return create_estadistica(db, estadistica_in)


@router.put("/{estadistica_id}", response_model=EstadisticaInDB)
def update_estadistica_view(estadistica_id: int, estadistica_in: EstadisticaUpdate, db: Session = Depends(get_db)):
    return update_estadistica(db, estadistica_id, estadistica_in)


@router.delete("/{estadistica_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_estadistica_view(estadistica_id: int, db: Session = Depends(get_db)):
    delete_estadistica(db, estadistica_id)
    return None
