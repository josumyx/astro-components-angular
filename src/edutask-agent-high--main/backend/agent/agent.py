import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import SystemMessage, HumanMessage

load_dotenv()

class AgenteEscolar:
    def __init__(self):
        # Configuramos el modelo para que sea un agent
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )
        
        # Instrucciones maestras 
        self.instrucciones = """
        Eres un Agente de Mantenimiento Escolar Autónomo. 
        Tu misión es analizar reportes y decidir su prioridad (Alta, Media, Baja).
        
        REGLAS DE ORO:
        1. Si el reporte implica peligro (fuego, cables, gas), es SIEMPRE Alta.
        2. No repitas la descripción del usuario.
        3. Responde estrictamente en formato JSON: {"prioridad": "...", "razon": "..."}
        """

    async def razonar(self, titulo, descripcion):
        # El agente recibe el mensaje y "piensa" antes de responder
        mensajes = [
            SystemMessage(content=self.instrucciones),
            HumanMessage(content=f"Reporte nuevo: {titulo}. Detalle: {descripcion}")
        ]
        
        respuesta = await self.llm.ainvoke(mensajes)
        return respuesta.content