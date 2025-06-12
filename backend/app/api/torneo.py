from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.torneo import TorneoCreate, TorneoUpdate, TorneoInDB
from app.services.torneo import (
    get_torneo,
    get_torneos,
    create_torneo,
    update_torneo,
    delete_torneo,
)
from app.db.base import get_db

router = APIRouter(prefix="/torneos", tags=["Torneos"])


@router.get("/", response_model=List[TorneoInDB])
def list_torneos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_torneos(db, skip=skip, limit=limit)


@router.get("/{torneo_id}", response_model=TorneoInDB)
def read_torneo(torneo_id: int, db: Session = Depends(get_db)):
    torneo = get_torneo(db, torneo_id)
    if not torneo:
        raise HTTPException(status_code=404, detail="Torneo no encontrado")
    return torneo


@router.post("/", response_model=TorneoInDB, status_code=status.HTTP_201_CREATED)
def create_torneo_view(torneo_in: TorneoCreate, db: Session = Depends(get_db)):
    return create_torneo(db, torneo_in)


@router.put("/{torneo_id}", response_model=TorneoInDB)
def update_torneo_view(torneo_id: int, torneo_in: TorneoUpdate, db: Session = Depends(get_db)):
    return update_torneo(db, torneo_id, torneo_in)


@router.delete("/{torneo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_torneo_view(torneo_id: int, db: Session = Depends(get_db)):
    delete_torneo(db, torneo_id)
    return None
