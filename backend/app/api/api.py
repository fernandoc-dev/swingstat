from fastapi import APIRouter
from app.api import torneo, equipo, jugador, partido, estadistica, dashboard

api_router = APIRouter()

api_router.include_router(torneo.router)
api_router.include_router(equipo.router)
api_router.include_router(jugador.router)
api_router.include_router(partido.router)
api_router.include_router(estadistica.router)
api_router.include_router(dashboard.router)
