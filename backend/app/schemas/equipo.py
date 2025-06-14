from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class EquipoBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    ciudad: str = Field(..., max_length=100)
    entrenador: str = Field(..., max_length=100)


class EquipoCreate(EquipoBase):
    pass


class EquipoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    ciudad: Optional[str] = Field(None, max_length=100)
    entrenador: Optional[str] = Field(None, max_length=100)


class EquipoInDB(EquipoBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
