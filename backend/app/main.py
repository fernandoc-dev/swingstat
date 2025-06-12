from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import torneo

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

app.include_router(torneo.router)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Swingstat"}
