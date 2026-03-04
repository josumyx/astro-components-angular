const API_URL = 'http://localhost:3000/api';

async function registrar() {
    const nombreEscuela = document.getElementById('regEscuela').value;
    const correo = document.getElementById('regcorreo').value;
    const clave = document.getElementById('regclave').value;

    if (!nombreEscuela || !correo || !clave) return alert("Llena todos los campos, amor");

    try {
        const res = await fetch(`${API_URL}/registrar-escuela`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreEscuela: nombreEscuela,
                correoEscuela: correo,
                claveEscuela: clave
            })
        });

        const data = await res.json();
        document.getElementById('msg').innerText = data.mensaje || JSON.stringify(data);
    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error de conexión con el servidor");
    }
}

async function entrar() {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: document.getElementById('user').value,
                pass: document.getElementById('pass').value
            })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('miEscuela', data.escuela);
            localStorage.setItem('miRol', data.rol);

            // Redirección dinámica según el rol
            if (data.rol === 'admin') {
                window.location.href = 'historial.html';
            } else {
                window.location.href = 'reportes.html';
            }
        } else {
            alert("Datos incorrectos");
        }
    } catch (error) {
        console.error("Error al entrar:", error);
        alert("Error de conexión con el servidor. Asegúrate de que `node ini.js` esté corriendo.");
    }
}
