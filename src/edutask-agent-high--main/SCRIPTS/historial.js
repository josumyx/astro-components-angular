const API_URL = 'http://localhost:3000/api';
const escuela = localStorage.getItem('miEscuela');
const rol = localStorage.getItem('miRol');

let reportesCargados = []; // Para guardar los datos localmente y no re-consultar al abrir modal

if (!escuela) window.location.href = 'inicio.html';

function volver() { window.location.href = 'reportes.html'; }
function cerrar() { localStorage.clear(); window.location.href = 'inicio.html'; }

// Configuración inicial de la vista
document.addEventListener('DOMContentLoaded', () => {
    if (rol === 'admin') {
        const navDer = document.querySelector('.nav-der');
        if (navDer) {
            const btnAreas = document.createElement('button');
            btnAreas.className = 'btn-nav';
            btnAreas.style.background = '#0732e0'; // Azul para destacar
            btnAreas.innerHTML = 'Gestionar Áreas 🏫';
            btnAreas.onclick = () => window.location.href = 'areas.html';
            navDer.prepend(btnAreas); // Ponerlo antes de los otros botones
        }
    }
});

async function cargarTerminado() {
    try {
        const res = await fetch(`${API_URL}/${escuela}/reportes?v=${Date.now()}`);
        reportesCargados = await res.json();

        // Mostrar filtro de estado para todos los usuarios (transparencia)
        const filtroEstadoCont = document.getElementById('filtroEstadoContainer');
        if (filtroEstadoCont) filtroEstadoCont.style.display = 'block';

        // Actualizar contadores (KPIs) basándose en TODOS los reportes
        const elContadorGrande = document.getElementById('contador');
        if (elContadorGrande) elContadorGrande.innerText = reportesCargados.filter(r => r.estado === 'Terminado').length;

        const elCriticos = document.getElementById('contadorCriticos');
        const elRelevantes = document.getElementById('contadorRelevantes');
        const elPoco = document.getElementById('contadorPocoImportantes');

        if (elCriticos) elCriticos.innerText = reportesCargados.filter(r => r.prioridad === 'Alta').length;
        if (elRelevantes) elRelevantes.innerText = reportesCargados.filter(r => r.prioridad === 'Media').length;
        if (elPoco) elPoco.innerText = reportesCargados.filter(r => r.prioridad === 'Baja').length;

        aplicarFiltros();

    } catch (error) {
        console.error("Error cargando historial:", error);
    }
}

function aplicarFiltros() {
    const texto = document.getElementById('filtroTexto').value.toLowerCase();
    const prioridad = document.getElementById('filtroPrioridad').value;
    const estado = document.getElementById('filtroEstado').value;
    const orden = document.getElementById('ordenarPor').value;

    // 1. FILTRADO (Todos los usuarios ven todos los reportes ahora)
    let filtrados = reportesCargados.filter(r => {
        // Filtro por Texto
        const coincideTexto = r.titulo.toLowerCase().includes(texto) || r.salon.toLowerCase().includes(texto);
        if (!coincideTexto) return false;

        // Filtro por Prioridad
        if (prioridad !== 'Todas' && r.prioridad !== prioridad) return false;

        // Filtro por Estado
        if (estado !== 'Todos' && r.estado !== estado) return false;

        return true;
    });

    // 2. ORDENAMIENTO
    if (orden === 'reciente') {
        filtrados.sort((a, b) => b.id - a.id);
    } else if (orden === 'antiguo') {
        filtrados.sort((a, b) => a.id - b.id);
    } else if (orden === 'prioridad') {
        const pMap = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
        filtrados.sort((a, b) => (pMap[a.prioridad] || 4) - (pMap[b.prioridad] || 4));
    }

    // 3. RENDERIZADO
    const contenedor = document.getElementById('listaTerminado');
    if (!contenedor) return;

    const tituloLista = document.getElementById('tituloLista');
    if (tituloLista) {
        tituloLista.innerText = rol === 'admin' ? "Gestión de Reportes (Admin)" : "Buzón de Reportes Escolar 📋";
    }

    if (filtrados.length === 0) {
        contenedor.innerHTML = '<div style="text-align:center; padding:20px;"><h3>Sin resultados 🔍</h3></div>';
        return;
    }

    contenedor.innerHTML = filtrados.map(r => {
        const esTerminado = r.estado === 'Terminado';
        // Azul para terminados, si no, color por prioridad (Alta: Rojo, Media: Amarillo, Baja: Verde)
        const colorTarjeta = esTerminado ? '#0732e0' : (r.prioridad === 'Alta' ? '#f10f0f' : (r.prioridad === 'Media' ? '#eeff00' : '#26e60d'));

        return `
        <div class="reporte-card" style="border-left: 5px solid ${colorTarjeta}; background: #fffcf0; margin-bottom: 10px; padding: 15px; border-radius: 8px;">
            <div style="float:right; text-align:right;">
                <strong style="color:${esTerminado ? '#0ff140' : '#636e72'};">${esTerminado ? '✅ Terminado' : '⏳ ' + r.estado}</strong><br>
                ${rol === 'admin' ? `<button onclick="abrirModal(${r.id})" style="margin-top:5px; cursor:pointer; background:#0732e0; width: 80px; height: 33px; color:white; border:none; padding:4px 8px; border-radius:4px;">Editar ✏️</button>` : ''}
            </div>
            <strong style="color:#2d3436; font-size: 1.1em;">${r.titulo}</strong> <br>
            <span style="font-size: 0.9em; color: #636e72;">📍 ${r.salon}</span>
            <p style="margin: 10px 0; color: #2d3436;">${r.descripcion}</p>
            ${rol === 'admin' ? `
            <div style="background:#f0f0f0; width: 80%; padding:8px; border-radius:5px; font-size:12px; margin-bottom:5px;">
                <b>🤖 Análisis IA:</b> ${r.motivo_ia || 'Sin datos'}
            </div>` : ''}
            <small style="color:#999;">📅 ${r.fecha} | Prioridad: <b>${r.prioridad}</b></small>
        </div>
    `}).join('');
}

// FUNCIONES DEL MODAL
function abrirModal(id) {
    const r = reportesCargados.find(rep => rep.id == id);
    if (!r) return;

    document.getElementById('editId').value = r.id;
    document.getElementById('editTitulo').textContent = r.titulo;
    document.getElementById('editDesc').textContent = r.descripcion;
    document.getElementById('editSalon').value = r.salon;
    document.getElementById('editPrioridad').value = r.prioridad;
    document.getElementById('editEstado').value = r.estado || "Pendiente";

    document.getElementById('modalEdicion').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modalEdicion').style.display = 'none';
}

async function actualizarReporte() {
    const id = document.getElementById('editId').value;
    const data = {
        titulo: document.getElementById('editTitulo').value,
        descripcion: document.getElementById('editDesc').value,
        prioridad: document.getElementById('editPrioridad').value,
        estado: document.getElementById('editEstado').value
    };

    try {
        const res = await fetch(`${API_URL}/${escuela}/reportes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("Reporte actualizado con éxito");
            cerrarModal();
            cargarTerminado();
        } else {
            alert("Error al actualizar");
        }
    } catch (e) {
        alert("Error de conexión");
    }
}

document.addEventListener('DOMContentLoaded', cargarTerminado);
