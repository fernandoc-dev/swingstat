from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime


class JugadorBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    apellido: str = Field(..., min_length=2, max_length=100)
    fecha_nacimiento: date
    posicion: str = Field(...,
                          pattern="^(pitcher|catcher|infield|outfield|designated_hitter)$")
    numero: int = Field(..., ge=0, le=99)
    equipo_id: Optional[int] = None


class JugadorCreate(JugadorBase):
    pass


class JugadorUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    apellido: Optional[str] = Field(None, min_length=2, max_length=100)
    fecha_nacimiento: Optional[date] = None
    posicion: Optional[str] = Field(
        None, pattern="^(pitcher|catcher|infield|outfield|designated_hitter)$")
    numero: Optional[int] = Field(None, ge=0, le=99)
    equipo_id: Optional[int] = None


class JugadorInDB(JugadorBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
