from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.partido import PartidoCreate, PartidoUpdate, PartidoInDB
from app.services.partido import (
    get_partido,
    get_partidos,
    create_partido,
    update_partido,
    delete_partido,
)
from app.db.base import get_db

router = APIRouter(prefix="/partidos", tags=["Partidos"])


@router.get("/", response_model=List[PartidoInDB])
def list_partidos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_partidos(db, skip=skip, limit=limit)


@router.get("/{partido_id}", response_model=PartidoInDB)
def read_partido(partido_id: int, db: Session = Depends(get_db)):
    partido = get_partido(db, partido_id)
    if not partido:
        raise HTTPException(status_code=404, detail="Partido no encontrado")
    return partido


@router.post("/", response_model=PartidoInDB, status_code=status.HTTP_201_CREATED)
def create_partido_view(partido_in: PartidoCreate, db: Session = Depends(get_db)):
    return create_partido(db, partido_in)


@router.put("/{partido_id}", response_model=PartidoInDB)
def update_partido_view(partido_id: int, partido_in: PartidoUpdate, db: Session = Depends(get_db)):
    return update_partido(db, partido_id, partido_in)


@router.delete("/{partido_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_partido_view(partido_id: int, db: Session = Depends(get_db)):
    delete_partido(db, partido_id)
    return None
