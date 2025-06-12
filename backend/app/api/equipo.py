from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.equipo import EquipoCreate, EquipoUpdate, EquipoInDB
from app.services.equipo import (
    get_equipo,
    get_equipos,
    create_equipo,
    update_equipo,
    delete_equipo,
)
from app.db.base import get_db

router = APIRouter(prefix="/equipos", tags=["Equipos"])


@router.get("/", response_model=List[EquipoInDB])
def list_equipos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_equipos(db, skip=skip, limit=limit)


@router.get("/{equipo_id}", response_model=EquipoInDB)
def read_equipo(equipo_id: int, db: Session = Depends(get_db)):
    equipo = get_equipo(db, equipo_id)
    if not equipo:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")
    return equipo


@router.post("/", response_model=EquipoInDB, status_code=status.HTTP_201_CREATED)
def create_equipo_view(equipo_in: EquipoCreate, db: Session = Depends(get_db)):
    return create_equipo(db, equipo_in)


@router.put("/{equipo_id}", response_model=EquipoInDB)
def update_equipo_view(equipo_id: int, equipo_in: EquipoUpdate, db: Session = Depends(get_db)):
    return update_equipo(db, equipo_id, equipo_in)


@router.delete("/{equipo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_equipo_view(equipo_id: int, db: Session = Depends(get_db)):
    delete_equipo(db, equipo_id)
    return None
