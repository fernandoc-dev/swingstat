from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class EquipoBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    ciudad: str = Field(..., max_length=100)
    estado: str = Field(..., max_length=100)
    categoria: str = Field(..., pattern="^(infantil|juvenil|adulto)$")
    division: str = Field(..., pattern="^(A|B|C|D)$")
    entrenador: str = Field(..., max_length=100)
    email_contacto: Optional[str] = Field(None, max_length=100)
    telefono_contacto: Optional[str] = Field(None, pattern="^\+?[0-9]{10,15}$")


class EquipoCreate(EquipoBase):
    pass


class EquipoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    ciudad: Optional[str] = Field(None, max_length=100)
    estado: Optional[str] = Field(None, max_length=100)
    categoria: Optional[str] = Field(
        None, pattern="^(infantil|juvenil|adulto)$")
    division: Optional[str] = Field(None, pattern="^(A|B|C|D)$")
    entrenador: Optional[str] = Field(None, max_length=100)
    email_contacto: Optional[str] = Field(None, max_length=100)
    telefono_contacto: Optional[str] = Field(None, pattern="^\+?[0-9]{10,15}$")


class EquipoInDB(EquipoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
