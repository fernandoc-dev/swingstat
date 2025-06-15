from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text
from sqlalchemy.sql import func
from app.db.base_class import Base
from sqlalchemy.orm import relationship


class Estadistica(Base):
    __tablename__ = "estadisticas"

    id = Column(Integer, primary_key=True, index=True)
    jugador_id = Column(Integer, ForeignKey("jugadores.id"), nullable=False)
    partido_id = Column(Integer, ForeignKey("partidos.id"), nullable=False)
    turnos_bateo = Column(Integer, nullable=False)
    hits = Column(Integer, nullable=False)
    dobles = Column(Integer, nullable=False)
    triples = Column(Integer, nullable=False)
    home_runs = Column(Integer, nullable=False)
    carreras_anotadas = Column(Integer, nullable=False)
    carreras_impulsadas = Column(Integer, nullable=False)
    bases_por_bola = Column(Integer, nullable=False)
    ponches = Column(Integer, nullable=False)
    promedio_bateo = Column(Float, nullable=False)
    observaciones = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    jugador = relationship("Jugador", backref="estadisticas")
    partido = relationship("Partido", backref="estadisticas")
