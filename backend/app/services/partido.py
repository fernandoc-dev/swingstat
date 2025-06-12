from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.partido import Partido
from app.schemas.partido import PartidoCreate, PartidoUpdate
from datetime import datetime


def get_partidos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Partido).offset(skip).limit(limit).all()


def get_partido(db: Session, partido_id: int):
    return db.query(Partido).filter(Partido.id == partido_id).first()


def create_partido(db: Session, partido_in: PartidoCreate):
    partido = Partido(**partido_in.model_dump())
    db.add(partido)
    db.commit()
    db.refresh(partido)
    return partido


def update_partido(db: Session, partido_id: int, partido_in: PartidoUpdate):
    partido = get_partido(db, partido_id)
    if not partido:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    for field, value in partido_in.model_dump(exclude_unset=True).items():
        setattr(partido, field, value)
    partido.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(partido)
    return partido


def delete_partido(db: Session, partido_id: int):
    partido = get_partido(db, partido_id)
    if not partido:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    db.delete(partido)
    db.commit()
    return None
