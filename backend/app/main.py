from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import torneo, jugador, equipo, partido, estadistica

app = FastAPI(
    title="Swingstat API",
    description="API para el seguimiento de rendimiento de jugadores de béisbol",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registro de routers
app.include_router(torneo.router)
app.include_router(jugador.router)
app.include_router(equipo.router)
app.include_router(partido.router)
app.include_router(estadistica.router)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Swingstat"}
