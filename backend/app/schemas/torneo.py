from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TorneoBase(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)
    fecha_inicio: datetime
    fecha_fin: datetime
    ubicacion: str = Field(..., max_length=200)


class TorneoCreate(TorneoBase):
    pass


class TorneoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=3, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)
    fecha_inicio: Optional[datetime] = None
    fecha_fin: Optional[datetime] = None
    ubicacion: Optional[str] = Field(None, max_length=200)


class TorneoInDB(TorneoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
