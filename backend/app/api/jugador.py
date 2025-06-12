from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.jugador import JugadorCreate, JugadorUpdate, JugadorInDB
from app.services.jugador import (
    get_jugador,
    get_jugadores,
    create_jugador,
    update_jugador,
    delete_jugador,
)
from app.db.base import get_db

router = APIRouter(prefix="/jugadores", tags=["Jugadores"])


@router.get("/", response_model=List[JugadorInDB])
def list_jugadores(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_jugadores(db, skip=skip, limit=limit)


@router.get("/{jugador_id}", response_model=JugadorInDB)
def read_jugador(jugador_id: int, db: Session = Depends(get_db)):
    jugador = get_jugador(db, jugador_id)
    if not jugador:
        raise HTTPException(status_code=404, detail="Jugador no encontrado")
    return jugador


@router.post("/", response_model=JugadorInDB, status_code=status.HTTP_201_CREATED)
def create_jugador_view(jugador_in: JugadorCreate, db: Session = Depends(get_db)):
    return create_jugador(db, jugador_in)


@router.put("/{jugador_id}", response_model=JugadorInDB)
def update_jugador_view(jugador_id: int, jugador_in: JugadorUpdate, db: Session = Depends(get_db)):
    return update_jugador(db, jugador_id, jugador_in)


@router.delete("/{jugador_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_jugador_view(jugador_id: int, db: Session = Depends(get_db)):
    delete_jugador(db, jugador_id)
    return None
