from google import genai
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn
import re

print("INICIANDO EL SERVIDOR NUEVO CON GOOGLEai")

API_KEY = "AIzaSyC1HOxYQtb69T-Qe63Pdqk0Zq7oSKCflD0"
client = genai.Client(api_key=API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reporte(BaseModel):
    titulo: str
    descripcion: str

@app.post("/analizar-prioridad")
async def analizar(reporte: Reporte):
    try:
        response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=f"Responde solo en JSON la prioridad (Alta, Media, Baja) y razon: {reporte.titulo} - {reporte.descripcion}"
)
        match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return {"prioridad": "Baja", "razon": "Error de formato"}
    except Exception as e:
        print(f"Error: {e}")
        return {"prioridad": "Baja", "razon": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)