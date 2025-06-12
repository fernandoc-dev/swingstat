from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class EstadisticaBase(BaseModel):
    jugador_id: int
    partido_id: int
    turnos_bateo: int = Field(..., ge=0)
    hits: int = Field(..., ge=0)
    dobles: int = Field(..., ge=0)
    triples: int = Field(..., ge=0)
    home_runs: int = Field(..., ge=0)
    carreras_anotadas: int = Field(..., ge=0)
    carreras_impulsadas: int = Field(..., ge=0)
    bases_por_bola: int = Field(..., ge=0)
    ponches: int = Field(..., ge=0)
    promedio_bateo: float = Field(..., ge=0, le=1)
    observaciones: Optional[str] = Field(None, max_length=500)


class EstadisticaCreate(EstadisticaBase):
    pass


class EstadisticaUpdate(BaseModel):
    jugador_id: Optional[int] = None
    partido_id: Optional[int] = None
    turnos_bateo: Optional[int] = Field(None, ge=0)
    hits: Optional[int] = Field(None, ge=0)
    dobles: Optional[int] = Field(None, ge=0)
    triples: Optional[int] = Field(None, ge=0)
    home_runs: Optional[int] = Field(None, ge=0)
    carreras_anotadas: Optional[int] = Field(None, ge=0)
    carreras_impulsadas: Optional[int] = Field(None, ge=0)
    bases_por_bola: Optional[int] = Field(None, ge=0)
    ponches: Optional[int] = Field(None, ge=0)
    promedio_bateo: Optional[float] = Field(None, ge=0, le=1)
    observaciones: Optional[str] = Field(None, max_length=500)


class EstadisticaInDB(EstadisticaBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
