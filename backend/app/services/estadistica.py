from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.estadistica import Estadistica
from app.schemas.estadistica import EstadisticaCreate, EstadisticaUpdate
from datetime import datetime


def get_estadisticas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Estadistica).offset(skip).limit(limit).all()


def get_estadistica(db: Session, estadistica_id: int):
    return db.query(Estadistica).filter(Estadistica.id == estadistica_id).first()


def create_estadistica(db: Session, estadistica_in: EstadisticaCreate):
    estadistica = Estadistica(**estadistica_in.model_dump())
    db.add(estadistica)
    db.commit()
    db.refresh(estadistica)
    return estadistica


def update_estadistica(db: Session, estadistica_id: int, estadistica_in: EstadisticaUpdate):
    estadistica = get_estadistica(db, estadistica_id)
    if not estadistica:
        raise HTTPException(
            status_code=404, detail="Estadistica no encontrada")
    for field, value in estadistica_in.model_dump(exclude_unset=True).items():
        setattr(estadistica, field, value)
    estadistica.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(estadistica)
    return estadistica


def delete_estadistica(db: Session, estadistica_id: int):
    estadistica = get_estadistica(db, estadistica_id)
    if not estadistica:
        raise HTTPException(
            status_code=404, detail="Estadistica no encontrada")
    db.delete(estadistica)
    db.commit()
    return None
