from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.torneo import Torneo
from app.schemas.torneo import TorneoCreate, TorneoUpdate
from datetime import datetime


def get_torneos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Torneo).offset(skip).limit(limit).all()


def get_torneo(db: Session, torneo_id: int):
    return db.query(Torneo).filter(Torneo.id == torneo_id).first()


def create_torneo(db: Session, torneo_in: TorneoCreate):
    torneo = Torneo(**torneo_in.model_dump())
    db.add(torneo)
    db.commit()
    db.refresh(torneo)
    return torneo


def update_torneo(db: Session, torneo_id: int, torneo_in: TorneoUpdate):
    torneo = get_torneo(db, torneo_id)
    if not torneo:
        raise HTTPException(status_code=404, detail="Torneo no encontrado")
    for field, value in torneo_in.model_dump(exclude_unset=True).items():
        setattr(torneo, field, value)
    torneo.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(torneo)
    return torneo


def delete_torneo(db: Session, torneo_id: int):
    torneo = get_torneo(db, torneo_id)
    if not torneo:
        raise HTTPException(status_code=404, detail="Torneo no encontrado")
    db.delete(torneo)
    db.commit()
    return None
