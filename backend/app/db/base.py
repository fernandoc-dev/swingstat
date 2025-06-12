# app/db/base.py
from app.models.estadistica import Estadistica
from app.models.partido import Partido
from app.models.equipo import Equipo
from app.models.jugador import Jugador
from app.models.torneo import Torneo
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.db.base_class import Base

# Motor de la base de datos: se llama al método para obtener la URL
engine = create_engine(settings.get_database_url)

# Sesión local para dependencias
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Importar todos los modelos aquí para que Alembic los detecte

# Dependency
def get_db():
    """Genera una sesión de base de datos para dependencias."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
