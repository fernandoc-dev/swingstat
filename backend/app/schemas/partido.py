from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PartidoBase(BaseModel):
    torneo_id: int
    equipo_local_id: int
    equipo_visitante_id: int
    fecha: datetime
    ubicacion: str = Field(..., max_length=200)
    estado: str = Field(...,
                        pattern="^(programado|en_curso|finalizado|cancelado)$")
    resultado_local: Optional[int] = Field(None, ge=0)
    resultado_visitante: Optional[int] = Field(None, ge=0)
    observaciones: Optional[str] = Field(None, max_length=500)


class PartidoCreate(PartidoBase):
    pass


class PartidoUpdate(BaseModel):
    torneo_id: Optional[int] = None
    equipo_local_id: Optional[int] = None
    equipo_visitante_id: Optional[int] = None
    fecha: Optional[datetime] = None
    ubicacion: Optional[str] = Field(None, max_length=200)
    estado: Optional[str] = Field(
        None, pattern="^(programado|en_curso|finalizado|cancelado)$")
    resultado_local: Optional[int] = Field(None, ge=0)
    resultado_visitante: Optional[int] = Field(None, ge=0)
    observaciones: Optional[str] = Field(None, max_length=500)


class PartidoInDB(PartidoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
