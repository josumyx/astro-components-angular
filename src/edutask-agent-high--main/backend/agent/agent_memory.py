import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

class MemoriaEduTask:
    def __init__(self):
        # texto a números
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        # La carpeta donde se guardaran la memoria
        self.db_path = "./backend/memory_db"
        
    def guardar_recuerdo(self, texto_reporte):
        # Guarda un reporte nuevo en la memoria para despues
        vector_db = Chroma.from_texts(
            texts=[texto_reporte], 
            embedding=self.embeddings, 
            persist_directory=self.db_path
        )
        vector_db.persist()

    def buscar_similares(self, consulta):
        # Busca si ya paso algo parecido antes 
        vector_db = Chroma(persist_directory=self.db_path, embedding_function=self.embeddings)
        resultados = vector_db.similarity_search(consulta, k=2)
        return [doc.page_content for doc in resultados]
        
        def __del__(self):
            # Limpia la memoria al finalizar
            if os.path.exists(self.db_path):
                shutil.rmtree(self.db_path)
