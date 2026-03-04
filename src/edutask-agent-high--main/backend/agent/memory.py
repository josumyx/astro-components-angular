import os
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

class MemoriaAgente:
    def __init__(self):
        #se supone que es local y rapido 
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.persist_directory = os.path.join(os.path.dirname(__file__), "faiss_index")

    def aprender_de_reporte(self, texto):
        try:
            if os.path.exists(self.persist_directory):
                vector_db = FAISS.load_local(
                    self.persist_directory, 
                    self.embeddings, 
                    allow_dangerous_deserialization=True
                )
                vector_db.add_texts([texto])
                
            else:
                print(f"--- Creando carpeta de memoria LOCAL en: {self.persist_directory} ---")
                vector_db = FAISS.from_texts([texto], self.embeddings)
            
            vector_db.save_local(self.persist_directory)
            print("✅ ¡ÉXITO! Carpeta faiss_index creada (Memoria Local).")
        except Exception as e:
            print(f"❌ Error crítico en memoria: {e}")

    def buscar_antecedentes(self, consulta):
        if not os.path.exists(self.persist_directory):
            return []
        try:
            vector_db = FAISS.load_local(
                self.persist_directory, 
                self.embeddings, 
                allow_dangerous_deserialization=True
            )
            docs = vector_db.similarity_search(consulta, k=2)
            return [d.page_content for d in docs]
        except Exception as e:
            print(f"Error al buscar: {e}")
            return []