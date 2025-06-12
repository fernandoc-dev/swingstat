from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.equipo import Equipo
from app.schemas.equipo import EquipoCreate, EquipoUpdate
from datetime import datetime


def get_equipos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Equipo).offset(skip).limit(limit).all()


def get_equipo(db: Session, equipo_id: int):
    return db.query(Equipo).filter(Equipo.id == equipo_id).first()


def create_equipo(db: Session, equipo_in: EquipoCreate):
    equipo = Equipo(**equipo_in.model_dump())
    db.add(equipo)
    db.commit()
    db.refresh(equipo)
    return equipo


def update_equipo(db: Session, equipo_id: int, equipo_in: EquipoUpdate):
    equipo = get_equipo(db, equipo_id)
    if not equipo:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")
    for field, value in equipo_in.model_dump(exclude_unset=True).items():
        setattr(equipo, field, value)
    equipo.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(equipo)
    return equipo


def delete_equipo(db: Session, equipo_id: int):
    equipo = get_equipo(db, equipo_id)
    if not equipo:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")
    db.delete(equipo)
    db.commit()
    return None
