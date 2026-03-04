import os, re, json
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from .memory import MemoriaAgente # Importante el punto para importación relativa

load_dotenv()

class AgenteEduTask:
    def __init__(self):
        # 2.5-flash para evitar errores de v1beta no se que
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash", 
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.1
        )
        self.memoria = MemoriaAgente()

    async def razonar_y_aprender(self, titulo, descripcion):
        try:
            #  El agente busca si esto ya pasó
            antecedentes = self.memoria.buscar_antecedentes(f"{titulo} {descripcion}")
            recuerdos = "\n".join(antecedentes) if antecedentes else "Sin antecedentes previos."

            # prompt aqui es donde la IA "estudia" el pasado
            prompt_sistema = f"""Eres un Agente de Mantenimiento Escolar Autónomo. 
            CONTEXTO HISTÓRICO: {recuerdos}
            
            Tu misión es analizar el reporte actual. 
            IMPORTANTE: Si en el 'CONTEXTO HISTÓRICO' hay reportes similares, 
            menciónalo en tu 'razon' para que el administrador sepa que es un problema recurrente.
            
            Responde ÚNICAMENTE en formato JSON: {{"prioridad": "Alta/Media/Baja", "razon": "..."}}"""

            # Mensajes para la IA
            mensajes = [
                SystemMessage(content=prompt_sistema),
                HumanMessage(content=f"Reporte: {titulo} - Detalle: {descripcion}")
            ]

            # Invocación
            respuesta = self.llm.invoke(mensajes) 
            
            # El agente guarda este nuevo reporte en la carpeta faiss_index
            self.memoria.aprender_de_reporte(f"Reporte: {titulo}. Detalle: {descripcion}. Resultado IA: {respuesta.content}")
            
            return respuesta.content
        except Exception as e:
            print(f"Error interno en el agente: {e}")
            return json.dumps({"prioridad": "Baja", "razon": f"Fallo en razonamiento: {str(e)}"})