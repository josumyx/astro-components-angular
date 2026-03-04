const API_URL = 'http://localhost:3000/api';
const escuela = localStorage.getItem('miEscuela');
const rol = localStorage.getItem('miRol');

// Seguridad
if (!escuela) window.location.href = 'inicio.html';
if (rol !== 'admin') {
    alert("Solo los administradores pueden estar aquí");
    window.location.href = 'reportes.html';
}

function volver() { window.location.href = 'historial.html'; }
function cerrar() { localStorage.clear(); window.location.href = 'inicio.html'; }

// --- 1. CARGAR Y MOSTRAR ÁREAS ---
async function cargarLista() {
    try {
        const res = await fetch(`${API_URL}/${escuela}/areas`);
        const areas = await res.json();
        const contenedor = document.getElementById('listaAreasContainer');

        if (areas.length === 0) {
            contenedor.innerHTML = '<p style="text-align:center;">No hay áreas registradas aún.</p>';
            return;
        }

        let html = '<ul style="list-style:none; padding:0;">';
        areas.forEach(area => {
            html += `
                <li class="AREA_CARD" style="font-size:1.3vw;">📍 ${area}
                    <button onclick="eliminarArea('${area}')" class="Area_Btn">Eliminar 🗑️</button>
                </li>
            `;
        });
        html += '</ul>';
        contenedor.innerHTML = html;
    } catch (error) {
        console.error("Error cargando áreas:", error);
        document.getElementById('listaAreasContainer').innerHTML = '<p style="color:red">Error de conexión</p>';
    }
}

// --- 2. GUARDAR NUEVA ÁREA ---
async function guardarArea() {
    const input = document.getElementById('nuevaAreaInput');
    const valor = input.value.trim();

    if (!valor) return alert("Escribe un nombre primero.");

    try {
        const res = await fetch(`${API_URL}/${escuela}/areas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevaArea: valor })
        });

        if (res.ok) {
            input.value = '';
            cargarLista();
        } else {
            alert("Esa área ya existe o hubo un error.");
        }
    } catch (error) {
        console.error("Error guardando área:", error);
    }
}

// --- 3. ELIMINAR ÁREA ---
async function eliminarArea(nombreArea) {
    if (!confirm(`¿Seguro que quieres borrar "${nombreArea}"?`)) return;

    try {
        await fetch(`${API_URL}/${escuela}/areas`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ areaBorrar: nombreArea })
        });
        cargarLista();
    } catch (error) {
        console.error("Error eliminando área:", error);
    }
}

// Iniciar
document.addEventListener('DOMContentLoaded', cargarLista);
