from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.jugador import Jugador
from app.models.equipo import Equipo
from app.schemas.jugador import JugadorCreate, JugadorUpdate
from datetime import datetime


def get_jugadores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Jugador).offset(skip).limit(limit).all()


def get_jugador(db: Session, jugador_id: int):
    return db.query(Jugador).filter(Jugador.id == jugador_id).first()


def create_jugador(db: Session, jugador_in: JugadorCreate):
    # Validar que el equipo exista si se proporciona un equipo_id
    if jugador_in.equipo_id is not None:
        equipo = db.query(Equipo).filter(
            Equipo.id == jugador_in.equipo_id).first()
        if not equipo:
            raise HTTPException(
                status_code=400,
                detail=f"No existe un equipo con el ID {jugador_in.equipo_id}"
            )

    jugador = Jugador(**jugador_in.model_dump())
    db.add(jugador)
    db.commit()
    db.refresh(jugador)
    return jugador


def update_jugador(db: Session, jugador_id: int, jugador_in: JugadorUpdate):
    jugador = get_jugador(db, jugador_id)
    if not jugador:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")

    # Validar que el equipo exista si se proporciona un equipo_id
    if jugador_in.equipo_id is not None:
        equipo = db.query(Equipo).filter(
            Equipo.id == jugador_in.equipo_id).first()
        if not equipo:
            raise HTTPException(
                status_code=400,
                detail=f"No existe un equipo con el ID {jugador_in.equipo_id}"
            )

    for field, value in jugador_in.model_dump(exclude_unset=True).items():
        setattr(jugador, field, value)
    jugador.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(jugador)
    return jugador


def delete_jugador(db: Session, jugador_id: int):
    jugador = get_jugador(db, jugador_id)
    if not jugador:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    db.delete(jugador)
    db.commit()
    return None
