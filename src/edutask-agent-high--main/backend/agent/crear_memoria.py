import os
#si hay algun error va decir que va faltar 
try:
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings import HuggingFaceEmbeddings
except ImportError as e:
    print(f"❌ Falta instalar algo: {e}")
    exit()

print("⏳ Cargando modelo de lenguaje local...")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

ruta = os.path.join(os.path.dirname(__file__), "faiss_index")
#crea la tipo db donde se guardara la informacion
print(f"📁 Intentando crear la base de datos en: {ruta}")

try:
    # solo recrea uno de base para que se generen los demas
    texto_inicial = "Reporte inicial de sistema: Memoria activada."
    vector_db = FAISS.from_texts([texto_inicial], embeddings)
    
    # Guarda ya lo creado sobre los archivos
    vector_db.save_local(ruta)
    print("EXITO Revisa tu VS Code, la carpeta faiss_index ya debe estar ahi.")
except Exception as e:
    print(f" ERROR CRÍTICO al crear: {e}")