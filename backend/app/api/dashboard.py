from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.torneo import Torneo
from app.models.partido import Partido
from app.models.jugador import Jugador
from app.models.estadistica import Estadistica

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Get counts from each table
    torneos_count = db.query(Torneo).count()
    partidos_count = db.query(Partido).count()
    jugadores_count = db.query(Jugador).count()
    performances_count = db.query(Estadistica).count()

    return {
        "torneos_count": torneos_count,
        "partidos_count": partidos_count,
        "jugadores_count": jugadores_count,
        "performances_count": performances_count
    }
