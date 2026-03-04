const API_URL = 'http://localhost:3000/api';
const AI_URL = 'http://localhost:8000/analizar-prioridad';
const escuela = localStorage.getItem('miEscuela');
const rol = localStorage.getItem('miRol');

// 1. FUNCIONES (Definidas antes de usarse) 

function configurarVistaPorRol() {
    const cuadroForm = document.getElementById('cuadroFormulario');
    const navTools = document.getElementById('navAdminTools');
    const contenedorLista = document.getElementById('contenedorLista');

    if (rol === 'admin') {
        if (cuadroForm) cuadroForm.style.display = 'none';
        if (navTools) {
            navTools.innerHTML = `
                <button class="btn-nav" onclick="window.location.href='areas.html'">Áreas 📍</button>
                <button class="btn-nav" onclick="window.location.href='historial.html'">Historial</button>
                <button class="btn-cerrar-nav" onclick="cerrar()">Cerrar Sesión 🚪</button>
            `;
        }
    } else {
        // Alumno
        if (contenedorLista) contenedorLista.style.display = 'none';
        if (navTools) {
            navTools.innerHTML = `
                <button class="btn-nav" onclick="window.location.href='historial.html'">Ver Historial 📋</button>
                <button class="btn-cerrar-nav" onclick="cerrar()">Cerrar Sesión 🚪</button>
            `;
        }
    }
}

async function cargarAreas() {
    try {
        const res = await fetch(`${API_URL}/${escuela}/areas?v=${Date.now()}`);
        const areas = await res.json();
        const select = document.getElementById('salon');
        if (select) {
            select.innerHTML = areas.map(a => `<option value="${a}">${a}</option>`).join('');
        }
        cargar(); // Cargar los reportes después de las áreas
    } catch (error) {
        console.error("Error al obtener áreas:", error);
    }
}

async function guardar() {
    const t = document.getElementById('titulo').value;
    const d = document.getElementById('desc').value;
    const s = document.getElementById('salon').value;
    const btnGuardar = document.querySelector("button[onclick='guardar()']");

    if (!t || !d) return alert("Llena los campos");

    try {
        if (btnGuardar) {
            btnGuardar.disabled = true;
            btnGuardar.innerText = "IA Analizando... 🧠";
        }

        // Llamada a Python (IA)
        let prioridadFinal = "Baja";
        let razonIA = "IA Offline";

        try {
            const aiRes = await fetch(AI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo: t, descripcion: d })
            });
            const aiData = await aiRes.json();
            prioridadFinal = aiData.prioridad || "Baja";
            razonIA = aiData.razon || razonIA;
        } catch (e) { console.warn("IA no responde"); }

        // Guardado en Node.js
        await fetch(`${API_URL}/${escuela}/reportes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                titulo: t, descripcion: d, salon: s,
                prioridad: prioridadFinal, motivo_ia: razonIA,
                fecha: new Date().toLocaleDateString(), estado: "Pendiente"
            })
        });

        alert("Reporte enviado con éxito");
        location.reload();
    } catch (error) {
        alert("Error al conectar con el servidor");
        if (btnGuardar) { btnGuardar.disabled = false; btnGuardar.innerText = "Agregar Reporte"; }
    }
}

async function cargar() {
    try {
        const res = await fetch(`${API_URL}/${escuela}/reportes?v=${Date.now()}`);
        const datos = await res.json();
        const contenedor = document.getElementById('lista');
        if (!contenedor) return;

        const priorityMap = { 'Alta': 1, 'Media': 2, 'Baja': 3 };
        datos.sort((a, b) => (priorityMap[a.prioridad] || 3) - (priorityMap[b.prioridad] || 3));

        contenedor.innerHTML = datos.map(r => {
            let colorP = r.prioridad === "Alta" ? "#ff7675" : (r.prioridad === "Media" ? "#fdcb6e" : "#55efc4");
            return `
            <div class="reporte-card" style="border-left: 8px solid ${colorP}; margin-bottom:15px; padding:15px; background:white; border-radius:8px;">
                <strong>${r.titulo} | 📍 ${r.salon}</strong>
                <p>${r.descripcion}</p>
                <div style="background:#f0f0f0; padding:8px; border-radius:5px; font-size:12px;">
                    <b>🤖 IA dice:</b> ${r.motivo_ia || 'Sin análisis'}
                </div>
            </div>`;
        }).join('');
    } catch (e) { console.error("Error cargar reportes:", e); }
}

function cerrar() { localStorage.clear(); window.location.href = 'inicio.html'; }

// --- 2. INICIO ---
document.addEventListener('DOMContentLoaded', () => {
    if (!escuela) window.location.href = 'inicio.html';
    const saludo = document.getElementById('saludo');
    if (saludo) saludo.innerText = "Reportes - " + escuela;
    configurarVistaPorRol();
    cargarAreas();
});