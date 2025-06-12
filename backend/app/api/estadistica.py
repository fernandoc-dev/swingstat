from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.estadistica import EstadisticaCreate, EstadisticaUpdate, EstadisticaInDB
from app.services.estadistica import (
    get_estadistica,
    get_estadisticas,
    create_estadistica,
    update_estadistica,
    delete_estadistica,
)
from app.db.base import get_db

router = APIRouter(prefix="/estadisticas", tags=["Estadisticas"])


@router.get("/", response_model=List[EstadisticaInDB])
def list_estadisticas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_estadisticas(db, skip=skip, limit=limit)


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
