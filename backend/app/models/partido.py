from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.db.base_class import Base


class Partido(Base):
    __tablename__ = "partidos"

    id = Column(Integer, primary_key=True, index=True)
    torneo_id = Column(Integer, ForeignKey("torneos.id"), nullable=False)
    equipo_local_id = Column(Integer, ForeignKey("equipos.id"), nullable=False)
    equipo_visitante_id = Column(
        Integer, ForeignKey("equipos.id"), nullable=False)
    fecha = Column(DateTime, nullable=False)
    ubicacion = Column(String(200), nullable=False)
    estado = Column(String(20), nullable=False)
    resultado_local = Column(Integer, nullable=True)
    resultado_visitante = Column(Integer, nullable=True)
    observaciones = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
